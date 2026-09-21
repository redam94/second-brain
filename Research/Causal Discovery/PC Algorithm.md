---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch07a-PC-citation.md]]"
source_location: "Kalisch & Bühlmann 2007; Spirtes, Glymour & Scheines 2000, Ch. 5–6; Colombo & Maathuis 2014"
date_ingested: 2026-09-21
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Conditional Independence Testing for Causal Discovery]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Causal Structure Learning - Methods Overview]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "constraint-based structure learning"
  - "PC-stable"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1991; Spirtes, Glymour & Scheines 2000)
> is the canonical **constraint-based causal discovery** method. Starting from a complete
> undirected graph, it removes edges by repeated **conditional independence (CI) tests**, then
> orients v-structures, then propagates orientations via **Meek's four rules**. Under faithfulness,
> causal Markov, and causal sufficiency, PC consistently recovers the **CPDAG** of the true DAG.
> Kalisch & Bühlmann (2007) extend this to high-dimensional sparse DAGs with $p \gg n$.

## Overview

The PC algorithm is the canonical **constraint-based** algorithm for DAG structure learning.
"Constraint-based" means it learns structure by testing which conditional independence (CI)
constraints hold in the data — edges that are "explained away" by a conditioning set are removed,
and what remains defines the skeleton. The algorithm then orients edges as far as the data allow,
stopping at the CPDAG — the identifiability limit of observational data (see
[[Markov Equivalence Classes and CPDAGs]]).

The algorithm is named for its inventors' first names: **P**eter Spirtes and **C**lark Glymour.
It is implemented in the `pcalg` R package (Kalisch et al. 2012) and `causal-learn` Python package.

## Assumptions

> [!definition] Definition: Three core assumptions of PC
>
> 1. **Causal Markov Condition (CMC):** Each variable $X_i$ is conditionally independent of
>    its non-descendants given its parents: $X_i \perp\!\!\!\perp \mathsf{NonDesc}(i) \mid \mathsf{pa}(i)$.
>    Equivalently, the distribution $\mathbb{P}(X)$ is Markov with respect to $\mathcal{G}^*$.
>
> 2. **Causal Faithfulness:** Every conditional independence in $\mathbb{P}(X)$ is **entailed**
>    by $\mathcal{G}^*$ via d-separation (no "accidental" independences from path cancellation).
>    Formally: $X_i \perp\!\!\!\perp X_j \mid S$ in $\mathbb{P}(X) \implies i$ and $j$ are d-separated
>    by $S$ in $\mathcal{G}^*$.
>
> 3. **Causal Sufficiency:** All common causes of any pair of observed variables are themselves
>    observed — no latent confounders. (Relaxed by FCI.)
^def-pc-assumptions

## Main Content

### Phase 1: Skeleton discovery

> [!definition] Definition: Skeleton phase (PC Step 1)
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n\times p}$, CI test, significance level $\alpha$.
>
> **Initialize:** Complete undirected graph $\mathcal{C}^0$ on $p$ nodes.
>
> **For** $l = 0, 1, 2, \ldots$:
> &nbsp;&nbsp;**For** each adjacent pair $(i, j)$ in current graph $\mathcal{C}^l$:
> &nbsp;&nbsp;&nbsp;&nbsp;**For** each subset $S \subseteq \mathsf{adj}(\mathcal{C}^l, i) \setminus \{j\}$
>             with $|S| = l$:
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;**If** CI test accepts $X_i \perp\!\!\!\perp X_j \mid X_S$:
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Remove edge $i-j$ from $\mathcal{C}^l$
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Record $\mathsf{sepset}(i,j) \leftarrow S$
> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Break (move to next pair)
>
> &nbsp;&nbsp;Stop if no pair has $|\mathsf{adj}(\mathcal{C}^l, i) \setminus \{j\}| \geq l$ for any adjacent $(i,j)$.
>
> **Output:** Skeleton $\mathcal{C}$ and separation sets $\{\mathsf{sepset}(i,j)\}$.
^def-skeleton-phase

The skeleton phase tests conditioning sets of **increasing size** $l = 0, 1, 2, \ldots$
The intuition: if $i$ and $j$ are independent given some small set, we find it first and
stop. The maximum $l$ reached equals the **maximum in-degree** $q$ of the true DAG
(under faithfulness), so the algorithm terminates in at most $O(p^{q+2} \cdot \binom{p}{q})$
CI tests.

**Key invariant:** By faithfulness, the algorithm is sound — if edge $i-j$ is removed, the
true graph has no edge between $i$ and $j$ (the removed edge is truly absent). The separating
set $\mathsf{sepset}(i,j)$ is a true d-separating set.

### Phase 2: V-structure orientation

> [!definition] Definition: V-structure orientation (PC Step 2)
> **For** each non-adjacent pair $(i, k)$ with common neighbor $j$ (i.e. $i - j - k$
> in the skeleton with $i \not\sim k$):
>
> &nbsp;&nbsp;**If** $j \notin \mathsf{sepset}(i, k)$:
> &nbsp;&nbsp;&nbsp;&nbsp;Orient $i \to j \leftarrow k$ (v-structure / collider).
>
> All other triples $i - j - k$ remain unoriented at this stage.
^def-vstructure-phase

The logic: if $i \perp\!\!\!\perp k \mid S$ for some $S$ not containing $j$, then in the true
DAG $j$ is *not* a collider on $i - j - k$, because conditioning on a non-collider blocks
the path whereas conditioning on a collider opens it. Conversely, if no separating set of
$i,k$ contains $j$, then $j$ must be the collider (v-structure).

### Phase 3: Meek's orientation rules

After v-structure orientation, some edges remain undirected. **Meek (1995)** showed that four
rules can propagate orientations without creating new v-structures or directed cycles,
completing the CPDAG:

> [!theorem] Meek's four orientation rules (Meek 1995)
> Apply repeatedly until no more edges can be oriented:
>
> **R1 (Tail of arrow):** $a \to b - c$ and $a \not\sim c$ $\implies$ orient $b \to c$.
> *(Orienting $c \to b$ would create a new v-structure $a \to b \leftarrow c$.)*
>
> **R2 (Acyclicity):** $a - b$, and there exists $a \to c \to b$ $\implies$ orient $a \to b$.
> *(Orienting $b \to a$ would create a cycle $a \to c \to b \to a$.)*
>
> **R3 (Ambiguous fork):** $a - b$, and $a - c_1 \to b$ and $a - c_2 \to b$ with
> $c_1 \not\sim c_2$ $\implies$ orient $a \to b$.
> *(Orienting $b \to a$ would create a v-structure at either $c_1$ or $c_2$.)*
>
> **R4 (Directed path):** $a - b$, and $a - c$ and $c \to d \to b$ with $c \not\sim b$
> $\implies$ orient $a \to b$.
>
> **Output:** CPDAG $\mathcal{C}$ — the unique maximally oriented PDAG with the same skeleton
> and v-structures as $\mathcal{G}^*$.
^thm-meek-rules

### Full algorithm summary

```
PC(X, α):
  1. skeleton, sepsets  ← skeleton_phase(X, α)        # CI tests at levels l=0,1,2,...
  2. pdag              ← orient_vstructures(skeleton, sepsets)
  3. cpdag             ← meek_rules(pdag)              # R1–R4 until convergence
  return cpdag
```

### Correctness and complexity

> [!theorem] Correctness of PC (Spirtes, Glymour & Scheines 2000; Kalisch & Bühlmann 2007)
> Under CMC, Faithfulness, and Causal Sufficiency:
>
> 1. **Population-level correctness (SG 2000):** Given an oracle CI test, PC returns the CPDAG of
>    $\mathcal{G}^*$.
>
> 2. **High-dimensional consistency (Kalisch & Bühlmann 2007):** Using the Fisher Z test
>    at level $\alpha_n \to 0$ with $\sqrt{n} \alpha_n \to \infty$, if the true DAG has
>    max in-degree $q$ and all non-zero partial correlations among adjacent nodes exceed
>    $c\sqrt{(\log p)/n}$ for some $c > 0$, then PC consistently recovers the skeleton and
>    CPDAG even when $p = O(n^a)$ for any $a > 0$.
^thm-pc-correctness

**Complexity:** For fixed maximum in-degree $q$, the number of CI tests is
$O(p^2 \cdot p^q / q!) = O(p^{q+2})$, polynomial in $p$. This makes PC tractable for sparse
graphs even when $p$ is large. Dense graphs (large $q$) can be computationally intractable
due to exponentially many conditioning sets.

### Limitations

| Limitation | Explanation |
|-----------|-------------|
| Faithfulness violations | Acyclical cancellations → false edge deletions |
| Latent confounders | Causal sufficiency violated → spurious v-structures; use FCI instead |
| Dense graphs | Exponential conditioning sets for large $q$ |
| Sample-size sensitivity | With finite $n$, small partial correlations may not be detected |
| Order-dependence (original PC) | Edge removal order affects output; use PC-stable |

## Examples

> [!example] Example: Three-node chain
> **True graph:** $X_1 \to X_2 \to X_3$ (a chain).
>
> **Skeleton phase (l=0):** All pairs are dependent marginally, so no edges removed at $l=0$.
> At $l=1$: test $X_1 \perp X_3 \mid X_2$. Under faithfulness this holds (mediator structure),
> so edge $1-3$ is removed. $\mathsf{sepset}(1,3) = \{2\}$.
>
> **V-structure phase:** Non-adjacent pair $(1,3)$ has common neighbor $2$.
> $2 \in \mathsf{sepset}(1,3) = \{2\}$, so $2$ is **not** a collider. Edge $1-2-3$ remains
> unoriented.
>
> **Meek's rules:** No rule fires. Output CPDAG: $1 - 2 - 3$ (undirected). This is correct —
> the chain $1 \to 2 \to 3$ and the reverse chain $1 \leftarrow 2 \leftarrow 3$ are Markov
> equivalent (same CI structure).

> [!example] Example: V-structure (fork with non-adjacent parents)
> **True graph:** $X_1 \to X_2 \leftarrow X_3$ (v-structure, $X_1 \not\sim X_3$).
>
> **Skeleton phase:** At $l=0$: $X_1 \not\perp X_3$ marginally (Berkson's paradox — they
> become dependent when $X_2$ is observed, but marginally independent if $X_2$ is not
> conditioned on and they have no other paths). More precisely: in a v-structure, parent
> nodes $X_1, X_3$ ARE marginally independent (no active path between them) but become
> dependent when conditioning on $X_2$. So at $l=0$: accept $X_1 \perp X_3 \mid \emptyset$
> → remove edge $1-3$. $\mathsf{sepset}(1,3) = \emptyset$.
>
> **V-structure phase:** Non-adjacent pair $(1,3)$ has common neighbor $2$.
> $2 \notin \mathsf{sepset}(1,3) = \emptyset$ → orient $1 \to 2 \leftarrow 3$. ✓

## Connections

- **NOTEARS comparison**: NOTEARS ([[NOTEARS - Overview]]) treats structure learning as a
  continuous optimization, avoiding CI tests entirely. The [[DAG Structure Learning Problem]]
  note records the "Constraint-based" row in NOTEARS's prior-method comparison table.
- **GES comparison**: [[GES Algorithm]] is score-based (no CI tests). GES tends to outperform
  PC in finite samples when the distributional assumption (Gaussian, BIC) is well-specified.
  PC can be applied without distributional assumptions using non-parametric CI tests.
- **FCI extension**: Fast Causal Inference (FCI, Spirtes et al. 2000) relaxes causal
  sufficiency, producing a PAG (Partial Ancestral Graph). FCI adds an extra phase identifying
  latent-confounder edges $X_i \circlearrowleft\!\!\!-\!\!\!\to X_j$.
- **PCMCI**: extension for time-series causal discovery (Runge et al. 2019).

## See Also
- [[Markov Equivalence Classes and CPDAGs]] — the identifiability target (CPDAG)
- [[Conditional Independence Testing for Causal Discovery]] — the CI tests PC calls
- [[GES Algorithm]] — score-based alternative for the same output
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[DAG Structure Learning Problem]] — the common framing for all three methods
- [[Causal Structure Learning - Methods Overview]] — comparison of all families
