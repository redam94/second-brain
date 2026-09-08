---
title: "PC Algorithm - Skeleton Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/textbook
source: "Spirtes, Glymour & Scheines (2000), Causation, Prediction, and Search, 2nd Ed., MIT Press (https://mitpress.mit.edu/9780262194402/)"
source_location: "Ch. 5, Algorithm 5.4.1 (PC); Colombo & Maathuis (2014) for PC-stable"
date_ingested: 2026-09-08
folder: "Causal Discovery"
doc_type: textbook
depends_on:
  - "[[PC Algorithm - Overview]]"
  - "[[Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm - Orientation Rules]]"
aliases:
  - "PC skeleton phase"
  - "adjacency phase PC"
  - "constraint-based skeleton learning"
---

# PC Algorithm - Skeleton Discovery

> [!summary]
> The **skeleton discovery phase** of the PC algorithm (Phase 1) starts from the
> complete undirected graph $K_p$ and removes edges by finding **conditional
> independence** witnesses: if $X \perp\!\!\!\perp Y \mid S$ for some subset $S$ of the
> other observed variables, then $X$ and $Y$ are not adjacent in the true DAG
> and the edge $X-Y$ is removed. The algorithm grows the conditioning set size
> $k = 0, 1, 2, \ldots$ incrementally — testing marginal independencies first,
> then conditioning on one variable, then two — stopping for each pair when
> a separating set is found or all subsets of the current adjacency set have
> been exhausted. The phase terminates with the estimated **skeleton** $\hat{G}$
> (undirected) and a stored **sepset** for each removed edge.

## Overview

The key insight of constraint-based structure learning is the **Markov condition**:
if two variables $X$ and $Y$ are not adjacent in the true DAG $G$, then they are
d-separated — and hence conditionally independent in the distribution $P$ — given
*some* subset $S \subseteq \text{Adj}(X) \setminus \{Y\}$ (or $\text{Adj}(Y) \setminus \{X\}$).
This is Lemma 2.3 in Spirtes et al.: under faithfulness, the **minimal separating set**
is always a subset of the adjacency of either endpoint. The PC algorithm exploits this
to efficiently prune the graph by restricting conditioning sets to neighbours.

## Main Content

### Algorithm 1: Skeleton Discovery

> [!definition] Algorithm: PC Skeleton Discovery (Phase 1)
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times p}$, significance level $\alpha$  
> **Output:** Skeleton $\hat{G}$ (undirected), separating sets $\widehat{\text{sep}}(i,j)$ for all removed edges
>
> 1. Start with $\hat{G} \leftarrow K_p$ (complete undirected graph on $p$ nodes).
> 2. Set $k \leftarrow 0$.
> 3. **Repeat** while any adjacent pair $(i,j)$ has $|\text{Adj}_{\hat{G}}(i) \setminus \{j\}| \geq k$:
>    - For each adjacent pair $(i,j)$ in $\hat{G}$:
>      - For each subset $S \subseteq \text{Adj}_{\hat{G}}(i) \setminus \{j\}$ with $|S| = k$:
>        - Test $H_0: X_i \perp\!\!\!\perp X_j \mid \mathbf{X}_S$ at level $\alpha$.
>        - If not rejected ($p > \alpha$):
>          - Remove edge $i - j$ from $\hat{G}$.
>          - Set $\widehat{\text{sep}}(i,j) \leftarrow S$ and $\widehat{\text{sep}}(j,i) \leftarrow S$.
>          - Break inner loop (move to next pair).
>    - Increment $k \leftarrow k + 1$.
> 4. **Return** $\hat{G}$, $\{\widehat{\text{sep}}(i,j)\}$.
^alg-pc-skeleton

**Key design choices:**
- Growing $k$ from 0 upward: cheap tests (marginal) first, expensive tests (large $|S|$) last.
- Adjacency restriction: only condition on *current neighbours* of $i$ (not all $p-2$ other variables). This prunes $O(2^p)$ possible sets to $O(2^{q})$ where $q = \max_i |\text{Adj}(i)|$.
- Stop as soon as one separating set found — no need to find the unique minimal sepset.

### Conditional Independence Tests

The choice of CI test depends on data type and distributional assumptions:

| Data type | Test | Statistic | Notes |
|-----------|------|-----------|-------|
| Continuous, Gaussian | **Fisher's Z-test** (partial correlation) | $z = \frac{1}{2}\log\frac{1+\hat{r}}{1-\hat{r}} \cdot \sqrt{n - |S| - 3}$ | Most common; fast; requires Gaussianity |
| Continuous, non-Gaussian | **Kernel CI test** (KCIT) | Hilbert-Schmidt independence criterion | Distribution-free; slow for large $n$ |
| Discrete (categorical) | **$\chi^2$ test** / $G^2$ test | $G^2 = 2\sum_i O_i \ln(O_i/E_i)$ | Requires sufficient cell counts; sparse tables problematic |
| Mixed (continuous + discrete) | **CMIknn** (mutual information) | $k$-NN mutual information estimator | Non-parametric |

**Fisher's Z-test** (Gaussian, linear case): Given partial correlation $\hat{r}_{XY|S}$
between $X$ and $Y$ partialling out $S$, the test statistic is

$$Z_{XY|S} = \frac{1}{2}\log\!\left(\frac{1+\hat{\rho}_{XY|S}}{1-\hat{\rho}_{XY|S}}\right)\cdot\sqrt{n - |S| - 3}$$

which is asymptotically $\mathcal{N}(0,1)$ under the null $\rho_{XY|S} = 0$. Compare
to $z_{\alpha/2}$ to determine significance.

The partial correlation $\hat{\rho}_{XY|S}$ is obtained by regressing $X$ and $Y$ on
$S$ and computing the correlation of the residuals (equivalently, the $(X,Y)$ entry
of the inverse of the correlation submatrix $\Sigma_{(X \cup Y \cup S)}$).

### Order-Dependence and PC-stable

The original PC algorithm is **order-dependent**: the skeleton depends on the order
in which variable pairs are visited, because edges removed early alter the adjacency
sets used to form conditioning sets for later pairs.

> [!definition] PC-stable (Colombo & Maathuis, 2014)
> **PC-stable** resolves order-dependence by separating the *discovery* of potential
> separating sets from *applying* edge removals:
>
> At conditioning-set size $k$:
> 1. Compute CI tests for all pairs $(i,j)$ using the adjacency sets from the
>    *beginning* of this $k$-level (not updated within the level).
> 2. After all pairs tested at level $k$, apply all edge removals simultaneously.
>
> This makes the skeleton **order-independent**: the same edges are removed regardless
> of the order variable pairs are visited.
^def-pc-stable

PC-stable is the recommended variant for reproducible research and is the default
in modern implementations (`pcalg::pc` with `skel.method = "stable"`).

### Why Conditioning on Neighbours Suffices

The correctness of the adjacency restriction relies on a key lemma:

> [!theorem] Lemma (Spirtes et al. 2000, Lemma 3.2): Adjacency Restriction
> Under the Causal Markov condition and faithfulness, if $X$ and $Y$ are not adjacent
> in $G$, then $X$ and $Y$ are d-separated by some subset $S$ of $\text{Adj}_G(X)$ or
> by some subset $S'$ of $\text{Adj}_G(Y)$.
^lem-adj-restriction

**Proof sketch:** In any DAG, the minimal d-separating set between non-adjacent
$X$ and $Y$ is contained in the parents of $X$, the parents of $Y$, or some mix.
Since all parents are adjacent, the claim follows. Under faithfulness, d-separation
coincides with CI in $P$.

This lemma justifies limiting the conditioning sets to current adjacencies (not all
$p-2$ remaining variables), reducing the worst-case number of tests from $O(2^p)$
to $O(p^{q+2})$ where $q = \max_i |\text{Adj}(i)|$.

### Separating Sets and Their Role in Orientation

The stored separating sets $\widehat{\text{sep}}(i,j)$ are critical for Phase 2
(see [[PC Algorithm - Orientation Rules]]). For a non-adjacent pair $(i,j)$ with
a shared neighbour $k$:

- If $k \in \widehat{\text{sep}}(i,j)$: the triple $i - k - j$ is **NOT** a v-structure —
  conditioning on $k$ removes the dependence, so $k$ "blocks" the path.
- If $k \notin \widehat{\text{sep}}(i,j)$: the triple is a **v-structure** $i \to k \leftarrow j$ —
  $k$ is a collider on the path.

This sepset-based criterion is what allows Phase 2 to orient v-structures without
additional CI tests.

## Examples

> [!example] Example: Skeleton Discovery on 4 Variables
> True DAG: $X_1 \to X_2 \to X_4$, $X_3 \to X_2$, with no edge $X_1 - X_3$.
>
> **$k=0$ (marginal tests):**
> - $X_1 \perp\!\!\!\perp X_3$? Yes (they are d-separated by $\emptyset$ since no path
>   connects them marginally). Remove $X_1 - X_3$, $\widehat{\text{sep}}(1,3) = \emptyset$.
> - All other marginal pairs: dependent. No further removals at $k=0$.
>
> **$k=1$ (conditioning on 1 variable):**
> - $X_1 \perp\!\!\!\perp X_4 \mid X_2$? Yes ($X_2$ blocks $X_1 \to X_2 \to X_4$). Remove $X_1 - X_4$,
>   $\widehat{\text{sep}}(1,4) = \{X_2\}$.
> - $X_3 \perp\!\!\!\perp X_4 \mid X_2$? Yes ($X_2$ blocks $X_3 \to X_2 \to X_4$). Remove $X_3 - X_4$,
>   $\widehat{\text{sep}}(3,4) = \{X_2\}$.
>
> **Resulting skeleton:** $X_1 - X_2 - X_4$, $X_3 - X_2$ (no edges to $X_4$ from $X_1$ or $X_3$).
>
> **Sepsets recorded:** $\widehat{\text{sep}}(1,3)=\emptyset$, $\widehat{\text{sep}}(1,4)=\{X_2\}$,
> $\widehat{\text{sep}}(3,4)=\{X_2\}$.
>
> In Phase 2: since $X_2 \in \widehat{\text{sep}}(1,4)$, the triple $X_1 - X_2 - X_4$ is *not* a
> v-structure. Since $X_2 \in \widehat{\text{sep}}(3,4)$, $X_3 - X_2 - X_4$ is also not a v-structure.
> Both triples are chains/forks — the direction of $X_2 - X_4$ remains ambiguous.

## Connections

- **[[PC Algorithm - Orientation Rules]]** — Phase 2 uses the stored sepsets to orient edges.
- **[[Equivalence Classes and CPDAGs]]** — V-structures found in Phase 2 determine the CPDAG.
- **[[PC Algorithm - Overview]]** — The full algorithm context, variants, and guarantees.
- **[[DAG Structure Learning Problem]]** — Formal problem setup, score function alternatives.
- **[[GES - Overview]]** — Score-based alternative that avoids explicit CI tests.

## See Also
- [[PC Algorithm - Orientation Rules]] — Phase 2: sepset-based v-structure detection and Meek rules
- [[PC Algorithm - Overview]] — Full algorithm context
- [[GES - Overview]] — Score-based complement
