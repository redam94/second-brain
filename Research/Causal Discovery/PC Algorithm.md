---
title: "PC Algorithm"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-PC-algorithm-source.md]]"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5; Kalisch & Bühlmann (2007), §2"
date_ingested: 2026-11-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
  - "[[Directed Acyclic Graphs]]"
  - "[[Conditional Independence Testing for Structure Learning]]"
used_by:
  - "[[Causal Structure Learning - Overview]]"
  - "[[BN Construction Methods Comparison]]"
aliases:
  - "Peter-Clark algorithm"
  - "PC-algorithm"
  - "constraint-based structure learning"
  - "skeleton discovery"
---

# PC Algorithm

> [!summary]
> The **PC algorithm** (Spirtes & Glymour, named for **P**eter Spirtes and **C**lark Glymour) is
> the canonical *constraint-based* method for learning DAG structure from observational data. It
> works in two stages: (1) **skeleton discovery** — remove edges between pairs of variables
> whenever a conditional independence test passes; (2) **orientation** — v-structure detection
> + Meek's rules → output the CPDAG. Under faithfulness and causal sufficiency, PC is *consistent*:
> it recovers the correct Markov equivalence class as $n \to \infty$. Kalisch & Bühlmann (2007)
> extend consistency to the high-dimensional ($p \gg n$) sparse regime.

## Overview

The PC algorithm is the most widely used *constraint-based* causal structure learning method.
It belongs to the family of algorithms that treat conditional independence (CI) statements as
constraints on the DAG structure — an edge $X - Y$ is retained only if no conditioning set
$\mathbf{S}$ exists such that $X \perp\!\!\!\perp Y \mid \mathbf{S}$.

The algorithm is named after its authors **P**eter Spirtes and **C**lark Glymour (from the SGS
book, *Causation, Prediction, and Search*, 2000). It improves the earlier *SGS algorithm*
(Spirtes, Glymour & Scheines) by exploiting the *adjacency structure* discovered so far to limit
the set of potential conditioning sets, reducing the number of CI tests from exponential to
polynomial (in sparse graphs).

## Main Content

### Assumptions

> [!definition] PC Algorithm Assumptions
> The PC algorithm is correct under three assumptions:
>
> 1. **Acyclicity:** The true data-generating process is a DAG (no feedback loops).
>
> 2. **Causal Markov condition:** Each variable is conditionally independent of its
>    non-descendants given its parents in $G^*$: $X \perp\!\!\!\perp \text{NonDesc}(X) \mid \text{pa}(X)$.
>
> 3. **Faithfulness (Frydenberg 1990; Spirtes et al. 1993):** Every CI relation in the
>    distribution $P$ is entailed by d-separation in $G^*$ — there are no "accidental"
>    independencies beyond those implied by the graph structure.
>    $$X \perp\!\!\!\perp Y \mid \mathbf{S} \text{ in } P \implies X \perp\!\!\!\perp Y \mid \mathbf{S} \text{ in } G^* \text{ (d-sep)}$$
>    Faithfulness fails (with probability zero in the Lebesgue measure on parameters) when
>    path coefficients cancel exactly. The assumption is called **adjacency faithfulness** in
>    its weakened form — only requiring that adjacent nodes be d-connected given some set.
>
> 4. **Causal sufficiency:** No unmeasured common causes (latent confounders) — all common
>    causes of observed variables are themselves observed. Violated if there are hidden variables.
>    The FCI algorithm relaxes this assumption.

^def-pc-assumptions

### The Algorithm

The PC algorithm has two main stages:

#### Stage 1: Skeleton Discovery

> [!definition] PC Skeleton Discovery (Spirtes et al. 2000; Kalisch & Bühlmann 2007)
> **Input:** Data $\mathbf{X} \in \mathbb{R}^{n \times p}$, significance level $\alpha$.
> **Output:** Skeleton $\hat{G}$ (undirected graph), separation sets $\text{sep}(X,Y)$.
>
> **Algorithm:**
> 1. Start with the complete undirected graph on $p$ nodes.
> 2. For $\ell = 0, 1, 2, \ldots$:
>    - For each adjacent pair $(X, Y)$ in the current graph:
>      - Let $\text{adj}(X) \setminus \{Y\}$ be the current neighbours of $X$ (excluding $Y$).
>      - For each subset $\mathbf{S} \subseteq \text{adj}(X) \setminus \{Y\}$ with $|\mathbf{S}| = \ell$:
>        - Test $H_0: X \perp\!\!\!\perp Y \mid \mathbf{S}$ at significance level $\alpha$.
>        - If the test does not reject $H_0$: remove edge $X - Y$, store $\text{sep}(X, Y) := \mathbf{S}$, break inner loop.
>    - Stop when $|\text{adj}(X) \setminus \{Y\}| < \ell$ for all remaining adjacent pairs.
>
> **Key efficiency gain over SGS:** SGS tests all subsets of $\mathbf{V} \setminus \{X, Y\}$.
> PC restricts to subsets of *current neighbours* $\text{adj}(X)$, which shrinks as edges
> are removed. For sparse graphs with maximum degree $q$, the total number of CI tests is
> $O(p^2 \cdot \binom{p}{q}) = O(p^{q+2})$ — polynomial in $p$ for fixed $q$.
>
> **Gaussian data:** Use Fisher's z-test on partial correlations. See
> [[Conditional Independence Testing for Structure Learning]].
> **Discrete data:** Use the G-test (likelihood ratio) or $\chi^2$ test.

^def-skeleton-discovery

#### Stage 2: Edge Orientation

> [!definition] PC Orientation Stage
> **Input:** Skeleton $\hat{G}$, separation sets $\{\text{sep}(X, Y)\}$.
> **Output:** CPDAG $\hat{\mathcal{E}}$.
>
> **Step 2a — V-structure orientation:**
> For every *unshielded triple* $X - Z - Y$ (i.e., $X \not\sim Y$):
> - If $Z \notin \text{sep}(X, Y)$: orient as $X \to Z \leftarrow Y$ (v-structure / collider).
> - If $Z \in \text{sep}(X, Y)$: leave $X - Z - Y$ undirected (non-collider).
>
> **Step 2b — Meek's rules:**
> Apply Meek's orientation rules R1–R4 iteratively until no more edges can be oriented.
> See [[Markov Equivalence and CPDAGs#thm-meek-rules]].

^def-pc-orientation

### Pseudocode

```
Algorithm: PC
Input:  Data X (n × p), significance level α
Output: CPDAG Ê

1. Initialize complete undirected graph G on p nodes.
2. Initialize sep(Xi, Xj) := ∅ for all i ≠ j.
3. For ℓ = 0, 1, 2, ...:
   adj_pairs ← {(Xi, Xj) : Xi ~ Xj in G}
   For (Xi, Xj) in adj_pairs:
     For S ⊆ adj(Xi, G) \ {Xj} with |S| = ℓ:
       If CI_test(Xi, Xj | S, α) fails to reject independence:
         G ← G with edge Xi-Xj removed
         sep(Xi, Xj) ← S
         Break (move to next pair)
   If no pair had |adj(Xi, G) \ {Xj}| ≥ ℓ: Stop.
4. For each unshielded triple Xi - Xk - Xj in G:
   If Xk ∉ sep(Xi, Xj): orient Xi → Xk ← Xj.
5. Apply Meek rules R1–R4 until stable.
6. Return G as CPDAG Ê.
```

### Consistency Result (Kalisch & Bühlmann 2007)

> [!theorem] PC Consistency (Kalisch & Bühlmann 2007, Theorem 3)
> Assume the data are generated by a DAG $G^*$ with $p$ nodes satisfying:
> (a) faithfulness, (b) causal sufficiency, (c) the maximum *neighbourhood size* (degree) is
> $q < \infty$, and (d) joint Gaussianity.
>
> Use Fisher's z-test at level $\alpha_n \to 0$ with $\alpha_n = o(n^{-1/2})$ (e.g.,
> $\alpha_n = n^{-1/2} / \log n$). Then:
> $$\Pr\!\left(\hat{\mathcal{E}}_n = \mathcal{E}^*\right) \to 1 \quad \text{as } n \to \infty,$$
> even when $p = p_n \to \infty$, as long as $p_n = O(n^a)$ for some $a > 0$ and the graph
> remains sparse (degree $\leq q$ fixed).
>
> **Key implication:** The number of variables can grow polynomially in $n$ — making PC
> practically useful for genomics (hundreds of genes, reasonable $n$) and other
> high-dimensional sparse settings.

^thm-pc-consistency

### Computational Complexity

- **Worst case (dense graph):** $O(p^{q+2})$ CI tests, each taking $O(n)$ for Fisher's z or
  $O(n \cdot |\mathbf{S}|)$ for general partial correlation inversions.
- **Skeleton step bottleneck:** Conditioning set sizes up to $q$ (max degree); for dense graphs
  this can be exponential in $q$.
- **PC-stable** (Colombo & Maathuis 2014): An order-independent version of PC that avoids
  dependence on the ordering of edges/nodes in the skeleton phase, improving stability.

## Examples

> [!example] Example: PC on Gaussian Data (Sachs Protein Network)
> Kalisch et al. (2005) / Sachs et al. (2003): 11 protein signaling variables, $n = 853$
> observational samples. PC with Fisher's z-test at $\alpha = 0.01$ recovers the known
> network skeleton well, but the direction of many edges requires interventional data
> (which Sachs et al. provide separately). This is a canonical benchmark in causal discovery.
> The NOTEARS paper ([[NOTEARS Experiments]]) also reports results on the Sachs network.

## Connections

- **Compared to GES ([[Greedy Equivalence Search]]):** PC is constraint-based (uses CI tests);
  GES is score-based (uses BIC). PC's accuracy depends on the CI test quality; GES depends on
  the score. For Gaussian linear models both converge to the correct MEC asymptotically.
- **Compared to NOTEARS ([[NOTEARS - Overview]]):** NOTEARS returns a single DAG, not the full
  MEC. It requires a linear SEM assumption; PC only requires faithfulness + causal sufficiency.
  The [[NOTEARS Experiments]] note explicitly benchmarks NOTEARS against PC.
- **FCI algorithm:** Extends PC to handle latent confounders (drops causal sufficiency assumption)
  by returning a PAG (Partial Ancestral Graph) instead of a CPDAG.
- **Causal Bayesian Networks** ([[BN Construction Methods Comparison]]): PC is one approach to
  automated BN structure learning; expert elicitation ([[LLM Expert Elicitation for Bayesian Networks]])
  is the alternative.
- **ABM structure learning:** ABM simulation outputs can be used as observational data for
  structure learning — applying PC to [[Approximate Bayesian Computation for ABMs]] outputs
  could recover causal structure in the simulation.

## See Also
- [[Markov Equivalence and CPDAGs]] — background on CPDAGs and why only the MEC is recoverable
- [[Conditional Independence Testing for Structure Learning]] — Fisher's z, G-test, kernel CI tests
- [[Greedy Equivalence Search]] — the score-based alternative to PC
- [[NOTEARS - Overview]] — continuous optimization approach; benchmarked against PC
- [[DAG Structure Learning Problem]] — formal problem definition PC is solving
- [[Directed Acyclic Graphs]] — d-separation, the graphical independence criterion PC exploits
