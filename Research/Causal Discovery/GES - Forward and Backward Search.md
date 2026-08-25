---
title: "GES - Forward and Backward Search"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-canonical-references.md]]"
source_location: "Chickering (2002) §3 (operators), §4 (algorithm); Hauser & Bühlmann (2012) §3 (Turn)"
date_ingested: 2026-08-25
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[GES - Overview]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[NOTEARS Experiments]]"
aliases:
  - "GES operators"
  - "Insert Delete Turn operators"
  - "Forward Equivalence Search"
  - "Backward Equivalence Search"
  - "FES BES GES"
---

# GES - Forward and Backward Search

> [!summary]
> This note gives the formal definitions of GES's three operators — **Insert**, **Delete**,
> and **Turn** — together with their **score-change formulas** and the structure of the
> FES and BES phases. Each operator maps one CPDAG to a neighbouring CPDAG by adding,
> removing, or reversing exactly one edge. The score change decomposes locally (touching
> only two nodes and a small neighbourhood), enabling efficient greedy search without
> re-scoring the entire graph. The Turning phase (Hauser & Bühlmann 2012) makes GES
> globally score-optimal over all CPDAGs.

## Overview

For the conceptual overview, assumptions, and comparison with PC, see [[GES - Overview]].
This note focuses on the three operators used in the search. The notation follows
Chickering (2002) and the causal-learn implementation.

Throughout, $\mathcal{C}$ is the current CPDAG; $X$ and $Y$ are nodes; $T$ is a subset
of nodes involved in the local neighbourhood; $S(\cdot)$ is the BIC score.

## Main Content

### The Insert operator (FES phase)

> [!definition] Definition: Insert$(X, Y, T)$ Operator (Chickering 2002, Def. 13)
> Let $X$ and $Y$ be non-adjacent in $\mathcal{C}$, and let
> $T \subseteq \mathrm{Adj}(Y) \setminus \mathrm{Adj}(X)$.
>
> **Insert$(X, Y, T)$** adds the directed edge $X \to Y$ to $\mathcal{C}$ and turns all
> edges in $T$ (which are undirected edges incident to $Y$) into directed edges toward $Y$:
> $$T \text{ edges } \{Z - Y : Z \in T\} \;\longmapsto\; \{Z \to Y : Z \in T\}.$$
>
> The resulting graph is updated to a valid CPDAG by applying Meek rules.
>
> **Validity condition:** Insert$(X, Y, T)$ is **valid** iff:
> 1. $T$ is a clique in $\mathcal{C}$ (i.e., all nodes in $T$ are pairwise adjacent)
> 2. Every undirected path from $X$ to $Y$ in $\mathcal{C}$ has at least one node in $T$
>    (so the new v-structures are exactly those mandated by $T$)
^def-insert-operator

> [!theorem] Score-change formula for Insert (Chickering 2002, Lemma 5)
> Let $\mathrm{pa}_\mathcal{C}(Y)$ be the current directed parents of $Y$ and $T_Y = T \cup \mathrm{pa}_\mathcal{C}(Y)$.
> The BIC score change from Insert$(X, Y, T)$ is:
> $$\Delta S_{\text{Insert}}(X, Y, T) = s\!\left(Y,\; T_Y \cup \{X\}\right) - s\!\left(Y,\; T_Y\right),$$
> where $s(Y, \mathbf{P}) = -\frac{n}{2}\log\hat{\sigma}^2_{Y|\mathbf{P}} - \frac{|\mathbf{P}|+1}{2}\log n$
> is the local BIC score of $Y$ given parent set $\mathbf{P}$.
>
> **Interpretation:** Insert$(X, Y, T)$ changes the parent set of $Y$ from $T_Y$ to
> $T_Y \cup \{X\}$; all other nodes' parent sets are unchanged. The score change is
> purely local to node $Y$.
^thm-insert-score

### The Delete operator (BES phase)

> [!definition] Definition: Delete$(X, Y, H)$ Operator (Chickering 2002, Def. 14)
> Let $X$ and $Y$ be adjacent in $\mathcal{C}$ (either $X \to Y$ or $X - Y$), and let
> $H \subseteq \mathrm{Adj}(X) \cap \mathrm{Adj}(Y)$.
>
> **Delete$(X, Y, H)$** removes the edge between $X$ and $Y$ in $\mathcal{C}$ and
> turns all edges incident to $X$ within $H$ from directed-toward-$X$ to undirected:
> $$H \text{ edges } \{Z \to X : Z \in H\} \;\longmapsto\; \{Z - X : Z \in H\}.$$
>
> The resulting graph is updated to a valid CPDAG by applying Meek rules.
>
> **Validity condition:** Delete$(X, Y, H)$ is **valid** iff:
> 1. $H$ is a clique in $\mathcal{C}$
> 2. $H$ is a subset of the neighbours of $Y$ (undirected adjacents)
^def-delete-operator

> [!theorem] Score-change formula for Delete (Chickering 2002, Lemma 7)
> Let $H_X = H \cup (\mathrm{pa}_\mathcal{C}(X) \setminus \{Y\})$. The score change is:
> $$\Delta S_{\text{Delete}}(X, Y, H) = s(Y, H_X) - s\!\left(Y,\; H_X \cup \{X\}\right).$$
> Again, only node $Y$'s local score changes.
^thm-delete-score

### The Turn operator (Hauser & Bühlmann 2012)

> [!definition] Definition: Turn$(X, Y, C)$ Operator (Hauser & Bühlmann 2012, Def. 3)
> Let $X - Y$ be an undirected edge in $\mathcal{C}$ (or $X \to Y$ directed), and let
> $C \subseteq \mathrm{Adj}(Y) \setminus \mathrm{Adj}(X)$.
>
> **Turn$(X, Y, C)$** reverses the edge to $X \leftarrow Y$ (or orients $X - Y$ as $Y \to X$),
> updating the CPDAG neighbourhood accordingly.
>
> **Purpose:** Turn operators explore edge reversals within an equivalence class that
> cannot be reached by FES+BES alone. Adding the Turning phase after BES makes GES
> find the **global BIC optimum** over all CPDAGs (not just a local optimum of the
> two-phase procedure).
^def-turn-operator

### FES phase: algorithm

The **Forward Equivalence Search** starts from the empty CPDAG and greedily adds edges:

> [!theorem] FES Procedure
> **Initialize:** $\mathcal{C} \leftarrow$ empty CPDAG (no edges), $\Delta^* \leftarrow 0$.
>
> **Repeat:**
> 1. For every non-adjacent pair $(X, Y)$ and every valid subset $T$:
>    - Compute $\Delta S_{\text{Insert}}(X, Y, T)$.
> 2. If $\max_{X,Y,T} \Delta S_{\text{Insert}}(X, Y, T) > 0$:
>    - Apply the operator $(X^*, Y^*, T^*)$ achieving the maximum.
>    - Update $\mathcal{C}$ via Insert$(X^*, Y^*, T^*)$ + Meek rules.
> 3. Else: **stop** (local maximum of $S$ under Insert operators).
>
> **Key property (Chickering 2002, Thm. 13):** FES starting from the empty graph is
> **complete** — every edge in the true skeleton is included in $\mathcal{C}_\text{FES}$.
> In other words, FES never has false negatives (missing edges) in large samples.
^alg-fes

**Why start from the empty graph?** The empty CPDAG scores every Insert as adding
one directed edge to an otherwise empty graph. From there, each Insert adds exactly
one parent to some node $Y$, and the score change is simply the difference between
the local BIC with and without $X$ in $Y$'s parent set. Starting from the complete
graph (as BES would) is equivalent but computationally worse.

### BES phase: algorithm

The **Backward Equivalence Search** starts where FES ended and removes spurious edges:

> [!theorem] BES Procedure
> **Initialize:** $\mathcal{C} \leftarrow \mathcal{C}_\text{FES}$.
>
> **Repeat:**
> 1. For every adjacent pair $(X, Y)$ and every valid subset $H$:
>    - Compute $\Delta S_{\text{Delete}}(X, Y, H)$.
> 2. If $\max_{X,Y,H} \Delta S_{\text{Delete}}(X, Y, H) > 0$:
>    - Apply the operator $(X^*, Y^*, H^*)$ achieving the maximum.
>    - Update $\mathcal{C}$ via Delete$(X^*, Y^*, H^*)$ + Meek rules.
> 3. Else: **stop** (local maximum of $S$ under Delete operators).
>
> **Key property (Chickering 2002, Thm. 14):** BES starting from $\mathcal{C}_\text{FES}$ is
> **sound** — it removes exactly the false-positive edges added by FES, leaving only
> true-skeleton edges in large samples.
^alg-bes

**Why do we need BES after FES?** FES can add *too many* edges (false positives):
starting from empty, the BIC gain from a spurious $X \to Y$ may be positive in finite
samples even when the true graph lacks that edge. The BIC penalty $\log n / 2$ per
parameter is designed to eliminate false positives asymptotically — but in finite
samples, BES does the clean-up.

### Score-change computation: causal-learn

In the causal-learn Python implementation, the GES score change for Insert is computed as:

```python
# For Insert(X, Y, T) with parents_Y = T ∪ pa_C(Y):
delta_score = (local_score(Y, parents_Y + [X]) - local_score(Y, parents_Y))
# local_score = -n/2 * log(residual_var) - (|parents| + 1)/2 * log(n)
```

The local score uses OLS regression: fit $X_Y \sim X_{\text{parents}}$ and compute
residual variance $\hat{\sigma}^2$. The BIC penalty is `lambda_value * log(n) * (|parents| + 1)`.

## Examples

> [!example] Example: FES on a 3-Variable V-structure
> **True DAG:** $A \to C \leftarrow B$; true CPDAG: $A \to C \leftarrow B$ (v-structure, fully oriented).
>
> **FES, step 1:**
> - Try Insert$(A, C, \emptyset)$: $\Delta S = s(C, \{A\}) - s(C, \emptyset) > 0$ if $A$ causes $C$.
>   Apply: CPDAG has $A \to C$.
>
> **FES, step 2:**
> - Try Insert$(B, C, \emptyset)$: $\Delta S = s(C, \{A,B\}) - s(C, \{A\}) > 0$.
>   Apply: adds $B \to C$. Now CPDAG has $A \to C \leftarrow B$ (v-structure, Meek R1 kicks in).
>
> **FES, step 3:**
> - Try Insert$(A, B, \emptyset)$ and Insert$(B, A, \emptyset)$: $\Delta S \leq 0$ (A and B independent).
>   Stop.
>
> **BES:** No Delete improves score. Final CPDAG: $A \to C \leftarrow B$. ✓

> [!example] Example: Why BES is needed
> **True DAG:** $A \to B$, $C$ independent. Sample size small.
>
> **FES** might insert $A \to C$ (spurious) if the finite-sample correlation between $A$
> and $C$ is non-negligible. CPDAG after FES: $A \to B$, $A \to C$ (one false edge).
>
> **BES:** Tries Delete$(A, C, \emptyset)$: removes $A \to C$, score improves (BIC penalizes
> the extra parameter once more data is seen). Final CPDAG: $A \to B$, $C$ isolated. ✓
>
> **Asymptotically:** the BIC penalty $\frac{\log n}{2}$ grows without bound, so for large
> enough $n$ FES never adds the spurious edge.

## Connections

- **PC comparison**: PC's Phase 1 (skeleton discovery) is analogous to BES — it removes
  non-edges via CI tests. PC's Phases 2–3 (v-structure + Meek) are analogous to the
  CPDAG reconstruction step after each GES operator. The difference: PC uses CI tests
  directly; GES uses score changes.
- **NOTEARS**: NOTEARS (see [[NOTEARS Algorithm]]) operates on the continuous space
  $\mathbb{R}^{d\times d}$, updating the entire weight matrix $W$ at each gradient
  step. GES updates one edge at a time; NOTEARS does a global update. The
  [[NOTEARS Experiments]] show NOTEARS beats GES on dense graphs.
- **Decomposability is essential**: the Insert/Delete score formulas are local precisely
  because the BIC decomposes over nodes. Non-decomposable scores (e.g., cross-validated
  likelihood without decomposability) cannot use these efficient formulas.
- **fGES**: The fast GES variant (Ramsey et al. 2017) parallelizes the operator search
  and prunes the candidate set using sparse prior knowledge, scaling to $d > 1000$.

## See Also

- [[GES - Overview]] — conceptual overview, BIC score-equivalence, consistency theorem
- [[PC Algorithm - Overview]] — constraint-based alternative
- [[PC Algorithm - Skeleton and Orientation]] — Meek rules (used implicitly here after operators)
- [[DAG Structure Learning Problem]] — the combinatorial program GES is solving
- [[NOTEARS Algorithm]] — continuous-optimization alternative
- [[NOTEARS Experiments]] — empirical comparison benchmarking both GES and PC
