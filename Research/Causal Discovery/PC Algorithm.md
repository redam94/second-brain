---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-CPS-reference.md]]"
source_location: "Spirtes et al. 2000, Ch. 5–6; Kalisch & Bühlmann 2007 §2"
date_ingested: 2026-10-19
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[CPDAG and Markov Equivalence]]"
  - "[[Conditional Independence Testing for Causal Discovery]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[Greedy Equivalence Search (GES)]]"
  - "[[NOTEARS Experiments]]"
aliases:
  - "Peter-Clark algorithm"
  - "Spirtes-Glymour algorithm"
  - "constraint-based causal discovery"
  - "PC-stable"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (named after its inventors **P**eter Spirtes and **C**lark Glymour, 1991;
> refined in Spirtes, Glymour & Scheines 2000) is the canonical **constraint-based** method for
> causal structure learning. It recovers the **CPDAG** of the true DAG by (Phase I) learning the
> skeleton via marginal and conditional independence tests of increasing order, and (Phase II)
> orienting edges using v-structure detection and Meek's rules. Under faithfulness and causal
> sufficiency, PC is **consistent** — it recovers the true CPDAG in the large-sample limit.
> In high dimensions ($d \gg n$), the PC-stable variant (Kalisch & Bühlmann 2007) is uniformly
> consistent under a sparsity condition.

## Overview

PC is *constraint-based*: it derives the graph structure from observed CI constraints, rather than
maximizing a score. The core idea is that under faithfulness, every missing edge corresponds to a
**separating set** — a conditioning set $\mathbf{S}$ such that $X_i \perp\!\!\!\perp X_j \mid
\mathbf{S}$ — and the adjacency structure can be recovered by finding these sets.

The algorithm has two distinct phases:

| Phase | Goal | Method |
|-------|------|--------|
| **Phase I: Skeleton** | Learn which pairs are adjacent (no separating set exists) | Iterative CI tests with conditioning sets of increasing size |
| **Phase II: Orientation** | Orient edges as v-structures, then Meek rules | Non-parametric reasoning about colliders |

**Assumptions:**
1. **Causal Markov condition:** the distribution satisfies the Markov property for the true DAG.
2. **Faithfulness:** no "accidental" CI (all CI is d-separation). See [[CPDAG and Markov Equivalence#^def-faithfulness]].
3. **Causal sufficiency:** no unmeasured common causes (no latent confounders). [*FCI algorithm relaxes this.*]
4. **No selection bias**.
5. **A reliable CI test** (with controlled type-I/II error rates).

## Main Content

### Phase I: Skeleton Identification

> [!definition] Definition: Skeleton
> The **skeleton** of a DAG $\mathcal{G}$ is the undirected graph obtained by replacing every
> directed edge $X \to Y$ with an undirected edge $X - Y$. Equivalently, the skeleton records
> which pairs of variables are *adjacent* (connected by some direct causal path).
^def-skeleton

**Algorithm I — Skeleton phase:**

```
Input:  data X, significance level α
Output: skeleton H, separating sets sep(i,j) for each non-adjacent pair

1.  Start with the complete undirected graph H on all d variables.
2.  Set l ← 0.
3.  Repeat:
    For each adjacent pair (X_i, X_j) in H:
        For each subset S ⊆ Adj(X_i) \ {X_j} with |S| = l:
            Test X_i ⊥⊥ X_j | S at level α.
            If the test does not reject:
                Remove edge X_i - X_j from H.
                Set sep(i, j) ← S.
                Break (move to next pair).
    Increment l ← l + 1.
4.  Until no adjacent pairs have |Adj(X_i) \ {X_j}| ≥ l.
```

> [!note] Complexity and the key insight
> The algorithm exploits **Markov blanket sparsity**: it only tests conditioning sets drawn from
> the *current* adjacency set. As edges are removed, adjacency sets shrink, dramatically pruning
> the search. For Gaussian data with maximum degree $q_{\max}$, the number of CI tests is at most
> $O(d^2 \binom{q_{\max}}{l})$ at level $l$ — polynomial in $d$ when $q_{\max}$ is bounded.
> Without sparsity, the worst case is exponential (all $2^{d-2}$ conditioning subsets).

> [!note] PC-stable variant (Kalisch & Bühlmann 2007)
> The original PC algorithm has an **order-dependence** problem: the skeleton can change if the
> variable ordering changes, because removing an edge changes adjacency sets used in later tests.
> The **PC-stable** fix: save all edges to remove at level $l$ before removing any of them.
> This makes Phase I order-independent and enables the consistency result in high dimensions.
^note-pc-stable

### Phase II: Edge Orientation

Given the skeleton $H$ and separating sets $\{\text{sep}(i,j)\}$, orientation proceeds in two steps:

**Step 2a — V-structure detection:**

> [!theorem] V-structure detection rule (Spirtes et al. 2000, Lemma 5.1)
> For each unshielded triple $X_i - X_k - X_j$ in $H$ (i.e., $X_i$ and $X_j$ are *non-adjacent*):
> - If $X_k \notin \text{sep}(i, j)$: orient $X_i \to X_k \leftarrow X_j$ (v-structure / collider).
> - If $X_k \in \text{sep}(i, j)$: the triple is a non-collider (chain or fork); leave undirected.
>
> **Rationale:** $X_k$ is a collider on the path $X_i - X_k - X_j$ if and only if conditioning on
> $X_k$ *opens* the path — i.e., $X_k$ should *not* be in the separating set for $X_i \perp\!\!\!\perp X_j$.
^thm-vstructure-rule

**Step 2b — Meek's rules (R1–R4):**

Apply Meek's four orientation rules (see [[CPDAG and Markov Equivalence#^thm-meek-rules]])
until no further edges can be oriented. The result is the **CPDAG** of the true DAG.

### Consistency Result

> [!theorem] Theorem: Consistency of PC (Spirtes et al. 2000; Kalisch & Bühlmann 2007)
> Let $\mathcal{G}^*$ be the true DAG, $\mathbb{P}$ faithful to $\mathcal{G}^*$, and causal
> sufficiency hold. Suppose CI tests are used with a sequence of significance levels
> $\alpha_n \to 0$ with $\alpha_n = o(n^{-1/2})$.
>
> **Fixed $d$:** As $n \to \infty$, the PC algorithm returns the CPDAG of $\mathcal{G}^*$ with
> probability $\to 1$.
>
> **High dimensions (Kalisch & Bühlmann 2007):** Under the **sparse** condition that the maximum
> degree $q_{\max}$ satisfies $q_{\max}^4 \log(d) = o(n)$, the PC-stable algorithm is **uniformly
> consistent** for the skeleton and equivalence class as $n, d \to \infty$ jointly.
^thm-pc-consistency

**Key implication:** $d$ can grow *polynomially* or even *exponentially* faster than $n$, as long
as the graph remains sparse. This makes PC-stable suitable for genomic and neuroimaging applications
where $d \sim 10^4$ but $n \sim 10^2$.

### Runtime

- Phase I: $O(d^2 \cdot \text{#CI tests})$ where #CI tests depends on sparsity.
  For Gaussian, each CI test is a partial correlation test: $O(d^3)$ per test in the naive
  implementation; dominated by the matrix inversion for conditioning sets.
- Phase II: $O(d^3)$ worst case for Meek's rules.
- Total practical complexity for sparse graphs: roughly $O(d^2 q_{\max}^2)$ CI tests,
  each costing $O(q_{\max}^3)$ — giving $O(d^2 q_{\max}^5)$.

## Examples

> [!example] Example: Causal discovery from gene expression data (Kalisch & Bühlmann 2007)
> Applied to a microarray dataset with $d = 8000$ genes and $n = 63$ observations. PC-stable
> recovers a sparse graph ($\bar{q} < 3$ mean degree) consistent with known regulatory
> relationships. Classical pairwise correlation tests would find $\binom{8000}{2} \approx 32M$
> pairs significant; PC-stable finds ~300 adjacencies after conditional testing, dramatically
> reducing false positives.

## Connections

- **Score-based alternative**: GES ([[Greedy Equivalence Search (GES)]]) maximizes a score
  rather than testing CI constraints, and is often more accurate in finite samples — but
  requires a parametric score (Gaussian BIC, BDe for discrete).
- **Latent confounders**: the **FCI algorithm** (Fast Causal Inference; Spirtes et al. 2000)
  relaxes causal sufficiency, producing a **PAG** (Partial Ancestral Graph) instead of a CPDAG.
- **Continuous optimization**: NOTEARS ([[NOTEARS - Overview]]) bypasses CI testing entirely,
  working with a continuous score. PC is listed as a baseline in NOTEARS's experiments
  ([[NOTEARS Experiments]]).
- **Software**: The `pcalg` R package (Kalisch, Mächler, Colombo & Maathuis 2012) implements
  PC, PC-stable, FCI, and GES. Python: `causal-learn` (formerly `Causal Discovery Toolbox`)
  and `pgmpy`.

## See Also
- [[CPDAG and Markov Equivalence]] — the output object PC produces
- [[Conditional Independence Testing for Causal Discovery]] — the statistical tests used in Phase I
- [[Greedy Equivalence Search (GES)]] — the score-based complement to PC
- [[DAG Structure Learning Problem]] — NP-hardness, landscape of approaches
- [[NOTEARS Experiments]] — empirical comparison that benchmarks PC
- [[Directed Acyclic Graphs]] — d-separation semantics underlying the faithfulness assumption
