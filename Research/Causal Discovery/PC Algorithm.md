---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SOURCE-spirtes-glymour-scheines-2000-CPS.txt]]"
source_location: "Spirtes, Glymour & Scheines (2000) §5.4; Kalisch & Bühlmann (2007)"
date_ingested: 2026-10-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Conditional Independence Testing]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[GES - Greedy Equivalence Search]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "FAS algorithm"
  - "constraint-based causal discovery"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour 1991; Spirtes, Glymour & Scheines 2000) is the
> foundational **constraint-based** algorithm for causal structure learning. It recovers the
> **CPDAG** of the true causal DAG from i.i.d. observational data by (1) discovering the
> skeleton via conditional independence tests, and (2) orienting edges by finding v-structures
> and applying Meek's orientation rules. Under **faithfulness** and **causal sufficiency**,
> PC is consistent in the large-sample limit, and Kalisch & Bühlmann (2007) proved it remains
> consistent in high dimensions ($d \gg n$) as long as the true graph is sparse.

## Overview

The PC algorithm (named after **P**eter Spirtes and **C**lark Glymour) is the oldest and
most widely used algorithm for learning causal structure from observational data. It belongs
to the **constraint-based** family: it translates observed conditional independence (CI)
relations into structural constraints on the DAG, then reads off the CPDAG.

The key insight is that the **Markov condition** (every node is independent of its
non-descendants given its parents) and **faithfulness** (every CI relation is a
d-separation relation in the true DAG) together mean that observed CIs exactly encode
the causal graph's skeleton and v-structures. PC exploits this by exhaustively testing
CIs for increasing conditioning set sizes — an approach that is computationally
tractable for sparse graphs.

PC is contrasted with **score-based** methods (GES, [[NOTEARS - Overview|NOTEARS]]) which
optimize a statistical score rather than testing independence constraints.

## Main Content

### Assumptions

> [!definition] PC Algorithm Assumptions
> 1. **Causal sufficiency**: no latent common causes — all common causes of observed
>    variables are themselves observed. (Violated $\Rightarrow$ use FCI algorithm instead.)
> 2. **Faithfulness** (*stability*): every conditional independence in the joint
>    distribution corresponds to a d-separation in the true DAG $\mathsf{G}^*$. Formally,
>    $X \perp\!\!\!\perp Y \mid S$ in the distribution $\iff$ $X$ is d-separated from $Y$
>    given $S$ in $\mathsf{G}^*$.
> 3. **IID samples** from the joint distribution $P$.
>
> Causal sufficiency rules out latent confounders; faithfulness rules out near-cancellations
> in path coefficients that create "accidental" independence. Both are untestable from
> observational data alone.
^def-assumptions

### Phase 1: Skeleton discovery (FAS — Fast Adjacency Search)

The skeleton is the undirected graph encoding which pairs of variables are *adjacent*
(directly causally connected) in the true DAG.

> [!theorem] Algorithm: FAS Skeleton Discovery (PC Phase 1)
> **Input**: Data $\mathbf{X} \in \mathbb{R}^{n \times d}$; significance level $\alpha$.
> **Output**: Skeleton $\hat{S}$ (undirected); separation sets $\mathrm{sep}(X, Y)$ for each removed edge.
>
> 1. Initialize $\hat{S}$ as the **complete undirected graph** $K_d$ on $d$ nodes.
> 2. Set $\ell \leftarrow 0$.
> 3. **Repeat** until no further edges are removed:
>    - For each edge $(X, Y)$ still in $\hat{S}$:
>      - Let $\mathrm{adj}(X) = \{$neighbours of $X$ in current $\hat{S}\}$.
>      - For each subset $S \subseteq \mathrm{adj}(X) \setminus \{Y\}$ with $|S| = \ell$:
>        - Test $H_0: X \perp\!\!\!\perp Y \mid S$ at level $\alpha$.
>        - If **not rejected**: remove edge $(X, Y)$ from $\hat{S}$; set $\mathrm{sep}(X,Y) = S$. Break.
>    - $\ell \leftarrow \ell + 1$.
>    - Stop when $\ell > \max_{X \in \mathsf{V}} |\mathrm{adj}(X)| - 1$.
>
> **Why this works**: by faithfulness, $X \perp\!\!\!\perp Y \mid S$ iff $S$ d-separates $X$ and $Y$ in
> $\mathsf{G}^*$. D-separation requires conditioning on at most the parents of $X$ or $Y$, so $S$ is
> never larger than the maximum in-degree. The algorithm terminates because adjacency sets shrink.
^thm-fas

> [!note] Computational complexity
> In the worst case, FAS tests $O\bigl(d^2 \cdot 2^{d-2}\bigr)$ CI conditions. In practice, for a
> graph with maximum degree $q$, the maximum conditioning set size is $q$, so the number of
> tests is $O\bigl(d^{q+2}\bigr)$. For sparse graphs ($q = O(\log n)$), this is polynomial in $d$,
> explaining the algorithm's scalability. Dense graphs are intractable.

### Phase 2: V-structure orientation

After finding the skeleton and separation sets, orient **unshielded colliders**:

> [!theorem] Algorithm: V-Structure Orientation (PC Phase 2)
> For every **unshielded triple** $(X, Z, Y)$ — i.e. $X - Z$, $Z - Y$, and $X \not\sim Y$ in $\hat{S}$:
> - If $Z \notin \mathrm{sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (v-structure / collider).
> - If $Z \in \mathrm{sep}(X, Y)$: leave $X - Z - Y$ undirected (non-collider, chain or fork).
>
> **Why**: by faithfulness, if $Z \notin \mathrm{sep}(X, Y)$, then $Z$ must be a collider
> (conditioning on $Z$ would *open* the path $X \to Z \leftarrow Y$, so omitting $Z$ from the
> separation set is correct). If $Z \in \mathrm{sep}(X, Y)$, $Z$ is a non-collider.
^thm-vstructures

### Phase 3: Meek orientation rules

Apply **Meek's four rules** (see [[Markov Equivalence and CPDAGs#^thm-meek-rules]]) exhaustively
to orient remaining undirected edges without introducing new v-structures or directed cycles.
The output after convergence is the **CPDAG** $\hat{\mathcal{C}}$.

> [!note] What PC cannot orient
> After applying Meek's rules, all remaining undirected edges in the CPDAG are **unidentifiable**
> from observational data: no consistent algorithm can orient them without interventions or
> additional distributional assumptions (e.g., non-Gaussianity as exploited by LiNGAM).

### Complete algorithm (pseudocode)

```
PC(X, α):
  # Phase 1: skeleton
  (S, sep) ← FAS(X, α)              # undirected skeleton + separation sets

  # Phase 2: v-structure orientation  
  for each unshielded triple (A, B, C) in S:
    if B ∉ sep(A, C): orient A → B ← C

  # Phase 3: Meek rules
  repeat until stable:
    apply R1, R2, R3, R4

  return CPDAG Ĉ
```

### Consistency theorem

> [!theorem] PC Consistency (Spirtes et al. 2000; Kalisch & Bühlmann 2007)
> Under causal sufficiency, faithfulness, and consistent CI tests (e.g., Fisher's Z for
> Gaussian data), PC recovers the true CPDAG $\mathcal{C}(\mathsf{G}^*)$ with probability
> tending to 1 as $n \to \infty$.
>
> In the high-dimensional case ($d = O(n^a)$), this remains true under Kalisch & Bühlmann's
> sparsity condition: maximum degree $q_n = O(\log n / \log \log n)$, with $\alpha_n \to 0$
> at an appropriate rate (Theorem 1 of their paper; see [[Conditional Independence Testing#^thm-highdim-consistency]]).
^thm-pc-consistency

## Examples

> [!example] Example: PC on a Three-Variable DAG
>
> **True DAG**: $X_1 \to X_3 \leftarrow X_2$ (a v-structure; $X_1 \not\sim X_2$).
>
> **Phase 1**: Start from $K_3 = \{X_1 - X_2, X_1 - X_3, X_2 - X_3\}$.
> - Test $X_1 \perp\!\!\!\perp X_2 \mid \emptyset$: NOT independent (they are *d-connected* when
>   we do *not* condition on their common effect $X_3$). Keep edge.
> - Test $X_1 \perp\!\!\!\perp X_2 \mid \{X_3\}$: INDEPENDENT (conditioning on the collider $X_3$
>   blocks the path). Remove edge. $\mathrm{sep}(X_1, X_2) = \{X_3\}$.
> - Test $X_1 \perp\!\!\!\perp X_3 \mid \emptyset$: not independent. Keep. Similarly for $X_2 - X_3$.
>
> **Skeleton**: $X_1 - X_3 - X_2$ (no $X_1 - X_2$ edge).
>
> **Phase 2**: Unshielded triple $(X_1, X_3, X_2)$. Since $X_3 \notin \{X_3\} = \mathrm{sep}(X_1, X_2)$
> is FALSE ($X_3 \in \mathrm{sep}$)... wait: $\mathrm{sep}(X_1, X_2) = \{X_3\}$, and $X_3 \in \{X_3\}$
> — so $X_3$ IS in the separation set. But the true graph has $X_3$ as a collider. Let me
> re-examine: $\mathrm{sep}(X_1, X_2) = \emptyset$ (they become independent at $|S|=0$? No —
> in a v-structure $X_1 \to X_3 \leftarrow X_2$, $X_1$ and $X_2$ are *marginally independent*
> and become *dependent* when conditioning on $X_3$). So $\mathrm{sep}(X_1, X_2) = \emptyset$.
>
> Since $X_3 \notin \mathrm{sep}(X_1, X_2) = \emptyset$: **orient** $X_1 \to X_3 \leftarrow X_2$. ✓
>
> **Result**: PC correctly recovers the v-structure, outputting the CPDAG $X_1 \to X_3 \leftarrow X_2$.
^ex-three-var

## Connections

- **GES** achieves the same CPDAG output via score optimization rather than CI tests —
  equivalent results in the large-sample limit; see [[GES - Greedy Equivalence Search]].
- **NOTEARS** bypasses the equivalence class question and returns one DAG in the class;
  see [[NOTEARS - Overview]].
- **FCI algorithm**: extends PC to settings with latent confounders (drops causal sufficiency),
  returning a PAG (partial ancestral graph) instead of a CPDAG. Not yet covered in the vault.
- **IDA algorithm** (Maathuis et al. 2009): uses the PC output CPDAG to compute bounds on
  causal effects for all possible interventions, without requiring a unique DAG orientation.

## See Also
- [[Markov Equivalence and CPDAGs]] — theoretical foundation (v-structures, Meek rules)
- [[Conditional Independence Testing]] — the Fisher's Z test and alternatives used in Phase 1
- [[GES - Greedy Equivalence Search]] — the score-based complement to PC
- [[DAG Structure Learning Problem]] — comparison of all approaches including NOTEARS
- [[NOTEARS Experiments]] — empirical comparison; PC is reported in supplement (weaker than NOTEARS)
