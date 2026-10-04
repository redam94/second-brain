---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch-buhlmann-2007-pc-algorithm.md]]"
source_location: "§3 PC-Algorithm + §4 Main Results, pp. 616–628"
date_ingested: 2026-10-04
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Constraint-Based Causal Discovery]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[GES Algorithm]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "PC-algorithm"
  - "Peter-Clark algorithm"
  - "Spirtes Glymour 1991"
  - "skeleton-plus-orientation"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Peter Spirtes & Clark Glymour, 1991; formalized in Spirtes, Glymour &
> Scheines 2000) is the canonical **constraint-based** algorithm for learning DAG structure from
> data. It recovers the **CPDAG** of the true DAG under faithfulness, causal Markov, and causal
> sufficiency. The algorithm runs in two phases: **skeleton discovery** (using conditional
> independence tests to prune edges from the complete graph) and **orientation** (v-structures
> + Meek's rules). Kalisch & Bühlmann (2007) proved PC is uniformly consistent in high dimensions
> ($p = O(n^a)$ for any $a$) whenever the graph is sparse ($q = O(\log n)$).

## Overview

"PC" stands for Peter (Spirtes) and Clark (Glymour), co-inventors of the algorithm. It became
the reference implementation for constraint-based structure learning and underpins many later
algorithms (FCI, RFCI, PCMCI, etc.). The algorithm is computationally feasible when the true
graph is **sparse**: the number of CI tests is $O(p^{q+2})$ where $q$ is the maximum
neighborhood size, so it is fast for low-$q$ graphs even when $p$ is large.

The R package `pcalg` (Kalisch et al., 2012, JOSS) provides a production-quality implementation.

## Main Content

### Phase 1 — Skeleton Discovery

The skeleton is the undirected graph obtained by removing all arrow directions from the true DAG.

> [!definition] Algorithm: PC Skeleton Discovery (Phase 1)
> **Input:** data matrix $\mathbf{X}$ ($n \times p$), significance level $\alpha$  
> **Output:** skeleton $\hat{C}$ (undirected graph) + separation sets $\text{SepSet}(i,j)$ for each non-edge
>
> 1. Initialize $C$ = complete undirected graph on $p$ nodes; $\ell \leftarrow -1$.
> 2. Repeat:
>    a. $\ell \leftarrow \ell + 1$
>    b. For each adjacent pair $(i,j)$ in $C$:
>       — Let $\text{adj}(C, i) \setminus \{j\}$ be the current neighbours of $i$ excluding $j$.  
>       — For each subset $S \subseteq \text{adj}(C, i) \setminus \{j\}$ with $|S| = \ell$:  
>         &ensp; Test $H_0: i \perp j \mid S$ at level $\alpha$.  
>         &ensp; If not rejected (i.e., accept conditional independence):  
>         &ensp;&ensp; Remove edge $(i,j)$ from $C$; set $\text{SepSet}(i,j) = \text{SepSet}(j,i) = S$; break.  
> 3. Until no adjacent pair in $C$ has $|\text{adj}(C, i) \setminus \{j\}| \geq \ell$.
> 4. Return $(\hat{C}, \text{SepSet})$.
^alg-pc-skeleton

> [!note] Key efficiency property
> The key to PC's efficiency: **edges are removed early** as soon as a separating set is found,
> so later iterations work on a sparser graph. For a true DAG with maximum degree $q$, the
> algorithm only tests conditioning sets of size $\leq q$, giving $O(p^{q+2})$ total tests.
> When $q$ is small (sparse graph), this is polynomial even for large $p$.

**Conditional independence tests used in practice:**

| Data type | Test | Statistic |
|-----------|------|-----------|
| Gaussian / linear | **Fisher's Z test** for partial correlation $\rho_{ij\cdot S}$ | $z = \frac{1}{2}\ln\frac{1+\hat{\rho}}{1-\hat{\rho}} \cdot \sqrt{n - |S| - 3}$; $z \sim \mathcal{N}(0,1)$ |
| Discrete / categorical | **Pearson chi-square** or G-test on conditional frequency table | $\chi^2_{(r_i-1)(r_j-1)}$ |
| Non-parametric | **Kernel CI test** (Zhang et al. 2012), **CMI estimator** | $p$-value via permutation |

The Fisher Z test is the default for continuous data; it is exact under Gaussian data and
asymptotically valid otherwise.

### Phase 2 — V-Structure Orientation

V-structures are the only edge patterns uniquely identifiable from observational data
(see [[Markov Equivalence and CPDAGs]]).

> [!definition] Algorithm: V-Structure Orientation (Phase 2)
> For each unshielded triple $(i, k, j)$ — meaning $i \sim k$, $j \sim k$, $i \not\sim j$ in skeleton:  
> - If $k \notin \text{SepSet}(i,j)$: orient $i \to k \leftarrow j$ (it's a v-structure).  
> - If $k \in \text{SepSet}(i,j)$: leave as undirected (it's a chain or fork, direction unknown).
^alg-pc-vstructure

The logic: if $k$ is a collider $i \to k \leftarrow j$, then marginalizing over $k$ blocks the
path $i - k - j$, so $i$ and $j$ are dependent given $k$. Hence $k \notin \text{SepSet}(i,j)$
identifies the collider. Conversely, if $k$ is in the sep set, the path $i - k - j$ is a
chain or fork, and $k$ blocks it — consistent with $i \leftarrow k \to j$ or $i \to k \to j$.

### Phase 3 — Meek Propagation

After orienting v-structures, apply Meek's four rules (see [[Markov Equivalence and CPDAGs]])
iteratively until no more edges can be oriented:

> [!definition] Algorithm: Meek Propagation (Phase 3)
> Repeat until no change:
> - **R1**: If $a \to b - c$ and $a \not\sim c$, orient $b \to c$.
> - **R2**: If $a \to c \to b$ and $a - b$, orient $a \to b$.
> - **R3**: If $a - c_1 \to b$, $a - c_2 \to b$, $c_1 \not\sim c_2$, $a - b$, orient $a \to b$.
> - **R4**: If $a - c \to d \to b$, $a \sim d$, $a - b$, $c \not\sim b$, orient $a \to b$.
^alg-meek

R1–R4 preserve the equivalence class: they never create a new v-structure and never create a
directed cycle. The output is the CPDAG of $G^*$.

### Consistency theorem

> [!theorem] Theorem: High-Dimensional Consistency (Kalisch & Bühlmann, 2007, Thm. 3.1)
> Assume:
> 1. (CMC + Faithfulness) $\mathbb{P}$ is faithful to the true DAG $G^*$.
> 2. (Causal sufficiency) No latent confounders.
> 3. (Sparsity) Maximum neighborhood size $q = O(\log n)$.
> 4. (Gaussian) Observations are i.i.d. Gaussian; Fisher Z test at level $\alpha_n \to 0$.
>
> Then the PC algorithm is **uniformly consistent**: as $n \to \infty$ with $p = O(n^a)$ for any
> $a \in [0,\infty)$,
> $$\mathbb{P}\bigl(\hat{\mathcal{C}}_n = \mathcal{C}(G^*)\bigr) \to 1,$$
> where $\hat{\mathcal{C}}_n$ is the estimated CPDAG and $\mathcal{C}(G^*)$ is the true CPDAG.
^thm-consistency

This is a remarkable result: it allows $p \gg n$ (high-dimensional regime) as long as the
true graph is sparse. The key condition is that $\alpha_n$ shrinks at an appropriate rate with
$n$ — Kalisch & Bühlmann recommend $\alpha_n = \Phi^{-1}(1 - c\log n / n)$ for a constant $c$.

### Order-dependence and PC-stable

A known limitation of the original PC algorithm: the output can depend on the **ordering of
the variables** used during skeleton discovery (different orderings yield different sep sets
for ties, leading to different orientation outcomes).

> [!definition] PC-stable Algorithm (Colombo & Maathuis, 2014)
> **PC-stable** modifies Phase 1 so that edge deletions within a given order-$\ell$ pass are
> only applied *after* all tests at that level complete, rather than on-the-fly. This makes the
> skeleton **order-independent** (the same skeleton regardless of variable ordering).
>
> v-structure orientation can still be order-dependent in PC-stable. The `pcalg` R package
> uses PC-stable by default.
^def-pcstable

## Examples

> [!example] Example: Four-Variable Skeleton Discovery
> Consider four variables $X_1, X_2, X_3, X_4$ from a linear Gaussian DAG
> $X_1 \to X_3$, $X_2 \to X_3$, $X_3 \to X_4$.
>
> **Phase 1, $\ell = 0$:** Test all pairs unconditionally.
> - $X_1 \not\perp X_3$: keep edge; $X_2 \not\perp X_3$: keep edge; $X_3 \not\perp X_4$: keep edge.
> - $X_1 \not\perp X_2$ (both influence $X_3$, which is a collider, so don't condition yet): keep.
> - $X_1 \perp X_4$ (after accounting for $X_3$): wait for $\ell=1$.
>
> **Phase 1, $\ell = 1$:** Test pairs conditioning on one neighbour.
> - $X_1 \perp X_4 \mid X_3$? Yes (path blocked). Remove edge $X_1 - X_4$; SepSet$(X_1,X_4) = \{X_3\}$.
> - $X_2 \perp X_4 \mid X_3$? Yes. Remove; SepSet$(X_2,X_4) = \{X_3\}$.
> - $X_1 \perp X_2 \mid X_3$? No (conditioning on collider opens path). Keep edge.
>
> **Phase 2 (v-structures):** Unshielded triple $X_1 - X_3 - X_2$ with $X_1 \not\sim X_2$.
> $X_3 \notin$ SepSet$(X_1, X_2) = \emptyset$ → orient $X_1 \to X_3 \leftarrow X_2$. ✓
>
> **Phase 3 (Meek R1):** $X_1 \to X_3 - X_4$, $X_1 \not\sim X_4$ → orient $X_3 \to X_4$. ✓
>
> Output CPDAG: $X_1 \to X_3 \leftarrow X_2$, $X_3 \to X_4$. This matches the true CPDAG.
^ex-four-var

## Connections

- **NOTEARS comparison**: Both PC and NOTEARS target the same input (observational data, linear
  SEM) but with different paradigms. [[NOTEARS Experiments]] shows NOTEARS outperforms PC and GES
  on dense graphs; the PC algorithm is preferred when graph sparsity is known and CI tests are
  accurate.
- **FCI for latent variables**: When causal sufficiency fails (latent confounders present), FCI
  (Fast Causal Inference, Spirtes et al. 2000) extends PC by allowing bidirected edges, returning
  a PAG (Partial Ancestral Graph) instead of a CPDAG.
- **LiNGAM**: Under non-Gaussian linear SEM, the full DAG (not just CPDAG) is identifiable.
  LiNGAM (Shimizu et al. 2006) uses ICA rather than CI tests. [[NOTEARS Experiments]] also
  compares with LiNGAM.
- **ABM structure learning**: The gap description in [[Dream/_Index|Dream Index]] notes that
  ABM outputs can serve as observational data for structure learning — PC would apply directly to
  simulated ABM trajectories.

## See Also
- [[Constraint-Based Causal Discovery]] — the paradigm PC instantiates
- [[Markov Equivalence and CPDAGs]] — what PC outputs and why
- [[GES Algorithm]] — the score-based alternative; same target (CPDAG) but different approach
- [[NOTEARS - Overview]] — continuous optimization alternative
- [[DAG Structure Learning Problem]] — problem setup and landscape of methods
- [[Directed Acyclic Graphs]] — d-separation and causal interpretation of DAGs
