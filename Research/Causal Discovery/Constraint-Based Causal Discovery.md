---
title: "Constraint-Based Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch-buhlmann-2007-pc-algorithm.md]]"
source_location: "§2 Background + §3 PC-Algorithm, pp. 614–620"
date_ingested: 2026-10-04
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "constraint-based structure learning"
  - "independence-based causal discovery"
  - "SGS algorithm"
---

# Constraint-Based Causal Discovery

> [!summary]
> **Constraint-based** (also called *independence-based*) causal discovery learns DAG structure
> by testing which pairs of variables are conditionally independent given various subsets of other
> variables. The core idea: under the **Causal Markov Condition** and **Faithfulness**, every
> conditional independence in the data corresponds to a d-separation in the true DAG, so CI tests
> directly constrain the possible DAG structures. The **PC algorithm** (Spirtes & Glymour, 1991)
> is the canonical constraint-based method; it efficiently recovers the CPDAG of the true DAG.
> Contrast with **score-based** methods ([[GES Algorithm]]) and **continuous optimization**
> ([[NOTEARS - Overview]]).

## Overview

Constraint-based causal discovery sits at the intersection of probabilistic graphical models and
causal inference. The key insight (due to Spirtes, Glymour & Scheines 1993/2000 and Pearl 1988)
is that under two assumptions — the Causal Markov Condition and Faithfulness — the set of
conditional independences in the joint distribution $\mathbb{P}$ is *exactly* the set of
d-separations in the true DAG $G^*$. This creates a mapping from statistical facts (CI tests on
data) to structural facts (edges and v-structures in the DAG).

## Main Content

### The identifying assumptions

> [!definition] Definition: Causal Markov Condition (CMC)
> A DAG $G$ on variables $\mathbf{V}$ satisfies the **Causal Markov Condition** with respect to
> a joint distribution $\mathbb{P}$ if:
> $$\text{for every } X \in \mathbf{V}: X \perp_{\mathbb{P}} \text{Non-descendants}(X) \mid \text{Parents}(X)$$
> i.e., each variable is conditionally independent of its non-descendants given its parents.
>
> Equivalently, by the factorization theorem:
> $$p(\mathbf{V}) = \prod_{X \in \mathbf{V}} p\bigl(X \mid \text{Parents}_G(X)\bigr).$$
^def-cmc

> [!definition] Definition: Causal Faithfulness Assumption (CFA)
> A distribution $\mathbb{P}$ is **faithful** to a DAG $G$ if every conditional independence
> in $\mathbb{P}$ is entailed by a d-separation in $G$:
> $$X \perp_{\mathbb{P}} Y \mid Z \implies X \perp_G Y \mid Z \quad \text{for all } X, Y, Z \subseteq \mathbf{V}.$$
>
> Faithfulness excludes "accidental" cancellations: it means the CI structure of $\mathbb{P}$
> is *not richer* than the d-separation structure of $G$. Violations occur when, e.g., two paths
> have equal and opposite effects that exactly cancel.
^def-faithfulness

> [!definition] Definition: Causal Sufficiency
> **Causal sufficiency** holds when there are no unmeasured common causes (latent confounders)
> of any pair of observed variables. Under causal sufficiency, all relevant variables are in the
> observed set $\mathbf{V}$.
>
> **Without** causal sufficiency, the PC algorithm can incorrectly orient edges (latent confounders
> can create spurious conditional dependences). The **FCI** (Fast Causal Inference) algorithm
> relaxes this assumption by allowing latent variables, returning an acyclic directed mixed graph
> (ADMG) / PAG instead of a CPDAG.
^def-causal-sufficiency

### The core identification result

> [!theorem] Theorem: Identifiability Under Faithfulness (Spirtes et al. 2000; Pearl 1988)
> Under the Causal Markov Condition and Faithfulness:
> $$X \perp_{\mathbb{P}} Y \mid Z \iff X \perp_{G^*} Y \mid Z \quad \text{for all } X, Y, Z.$$
>
> Corollary: the true skeleton and all true v-structures are **identifiable** from the
> conditional independence structure of $\mathbb{P}$, and hence from data (given enough samples).
> The CPDAG of $G^*$ is therefore identifiable, and it is the maximum identifiable structure
> under purely observational data with causal sufficiency.
^thm-identifiability

### What constraint-based methods do

Constraint-based algorithms operate in three logical steps:

1. **Skeleton recovery**: Test all pairs $(X_i, X_j)$ for conditional independence given various
   conditioning sets $Z \subseteq \mathbf{V} \setminus \{X_i, X_j\}$. An edge $X_i - X_j$ exists
   in the skeleton iff $X_i$ and $X_j$ are *not* d-separated by any $Z$.
   
2. **V-structure orientation**: For each unshielded triple $X_i - X_k - X_j$ (with $X_i \not\sim X_j$),
   orient as $X_i \to X_k \leftarrow X_j$ iff $X_k \notin \text{SepSet}(X_i, X_j)$.
   
3. **Meek propagation**: Apply Meek's four rules ([[Markov Equivalence and CPDAGs]]) to orient
   remaining undirected edges without creating new v-structures or directed cycles.

The output is the **CPDAG** — the unique representative of the Markov equivalence class
containing the true DAG $G^*$.

### Contrast with score-based and continuous methods

| Property | Constraint-based (PC) | Score-based (GES) | Continuous (NOTEARS) |
|----------|-----------------------|-------------------|----------------------|
| Output | CPDAG | CPDAG | Weighted DAG $W$ |
| Core object | CI tests | Score function (BIC) | Least-squares loss |
| Assumptions | CMC + Faithfulness + Sufficiency | CMC + Faithfulness + Score consistency | Linear SEM, no faithfulness needed |
| High-$p$ scaling | O$(p^{q+2})$, $q$ = max nbhd size | O$(p^4)$ for dense | O$(d^3)$ per step |
| Sensitivity | Errors compound (CI test errors propagate) | More robust (global score) | Gradient-based, may find local optima |

> [!note] Why faithfulness can be fragile
> In practice, "near-faithfulness" violations (very small but non-zero effect that nearly
> cancels) are more common than exact violations. When the true effect of path $A \to B \to C$
> is nearly exactly cancelled by the direct effect $A \to C$, the CI test for $A \perp C \mid B$
> may incorrectly pass, leading to a missing edge in the skeleton. This is one reason
> [[GES Algorithm]] (which doesn't rely on CI tests) can be more accurate in some settings.

## See Also
- [[Markov Equivalence and CPDAGs]] — what CPDAGs represent and why the algorithm targets them
- [[PC Algorithm]] — the canonical constraint-based algorithm
- [[GES Algorithm]] — the canonical score-based alternative
- [[NOTEARS - Overview]] — continuous optimization approach (different paradigm)
- [[Directed Acyclic Graphs]] — d-separation and do-calculus background
