---
title: "PC Algorithm - Skeleton Phase"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000); Kalisch & Bühlmann (2007)"
source_location: "SGS (2000) Ch. 5; Kalisch & Bühlmann (2007) §2.1–2.3"
date_ingested: 2026-08-22
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm - Overview]]"
used_by:
  - "[[PC Algorithm - Orientation Phase]]"
aliases:
  - "skeleton learning"
  - "adjacency phase PC"
  - "conditional independence testing structure learning"
---

# PC Algorithm - Skeleton Phase

> [!summary]
> The first phase of the PC algorithm converts a complete undirected graph into a **skeleton**
> (the undirected adjacency structure of the true DAG) by systematically removing edges whose
> endpoints are **conditionally independent** given some subset of their neighbors. The procedure
> increases the conditioning set size $|S| = 0, 1, 2, \ldots$ at each pass, stopping when no
> edge can be removed. It also records the **separation sets** $\text{sep}(i,j)$ needed for
> the orientation phase.

## Overview

The skeleton phase exploits a key consequence of the Markov + faithfulness assumptions:

> [!theorem] CI ↔ d-separation (under faithfulness)
> Variables $X_i$ and $X_j$ satisfy $X_i \perp\!\!\!\perp X_j \mid S$ in the distribution
> **if and only if** $X_i$ and $X_j$ are **d-separated** by $S$ in the true DAG $\mathcal{G}^*$.
> Hence: a CI test rejection keeps the edge; acceptance removes it.
^thm-faith-ci

This lets CI tests act as a reliable "edge filter" — any pair $(X_i, X_j)$ that is independent
given some $S \subseteq \text{adj}(X_i)\setminus\{X_j\}$ has **no direct edge** in $\mathcal{G}^*$.

## Procedure

> [!definition] Skeleton Learning (PC Algorithm, Stage 1)
> **Input:** $n$ i.i.d. samples, significance level $\alpha$.
> **Initialization:** $\hat{\mathcal{G}} \leftarrow K_d$ (complete undirected graph on $d$ nodes).
>
> **For** $k = 0, 1, 2, \ldots$ **do:**
> - **For** each ordered adjacent pair $(i, j)$ in the current $\hat{\mathcal{G}}$ **do:**
>   - Let $A_{ij} = \text{adj}(i) \setminus \{j\}$ (neighbors of $i$ excluding $j$)
>   - **For** each subset $S \subseteq A_{ij}$ with $|S| = k$ **do:**
>     - Test $H_0: X_i \perp\!\!\!\perp X_j \mid X_S$ at level $\alpha$
>     - **If** $H_0$ is not rejected:
>       - Remove edge $i - j$ from $\hat{\mathcal{G}}$
>       - Record $\text{sep}(i,j) \leftarrow S$ and $\text{sep}(j,i) \leftarrow S$
>       - **Break** (move to next pair)
> - **If** no edges removed in pass $k$, **stop**
>
> **Output:** skeleton $\hat{\mathcal{G}}$, separation sets $\text{sep}(\cdot,\cdot)$.
^def-skeleton-phase

### Why increasing $k$?

Starting with $k=0$ tests marginal independence ($S = \emptyset$). Pairs made independent
by conditioning on a single variable are caught at $k=1$, etc. This "grow the conditioning
set" strategy is **computationally crucial**: once an edge is removed, it shrinks the
available conditioning sets for remaining pairs, accelerating the algorithm on sparse graphs.
Without this ordering, one would need to check all $2^{d-2}$ subsets per pair.

## Conditional independence tests

The key subroutine is a statistical test $H_0: X_i \perp\!\!\!\perp X_j \mid X_S$.
The choice of test depends on data type:

| Data type | Standard CI test | Implementation |
|-----------|-----------------|----------------|
| Multivariate Gaussian | **Fisher's z-test** on partial correlations | `pcalg::gaussCItest` |
| Discrete / categorical | **G²-test** (log-likelihood ratio) or $\chi^2$ | `pcalg::disCItest` |
| Non-parametric / continuous | **KCI** (kernel CI test, Zhang et al. 2012) | `causal-learn` |
| General / robust | **HSIC-based** permutation test | `causal-learn` |

> [!example] Fisher's z-test (Gaussian case)
> For multivariate Gaussian data, the **partial correlation** between $X_i$ and $X_j$ given $X_S$ is:
> $$\rho_{ij \mid S} = -\frac{[\boldsymbol{\Sigma}_{S \cup \{i,j\}}^{-1}]_{ij}}{\sqrt{[\boldsymbol{\Sigma}_{S \cup \{i,j\}}^{-1}]_{ii}[\boldsymbol{\Sigma}_{S \cup \{i,j\}}^{-1}]_{jj}}},$$
> where $\boldsymbol{\Sigma}_{S\cup\{i,j\}}$ is the covariance sub-matrix. The test statistic is:
> $$z_{ij\mid S} = \frac{1}{2}\log\frac{1+\hat\rho_{ij\mid S}}{1-\hat\rho_{ij\mid S}} \cdot \sqrt{n - |S| - 3},$$
> which is approximately $\mathcal{N}(0,1)$ under $H_0$ for large $n$. Reject $H_0$ if
> $|z_{ij\mid S}| > z_{1-\alpha/2}$.
^ex-fisher-z

This closed-form test makes PC fast in the Gaussian case — each test costs $O(|S|^3)$ for the
matrix inverse.

## Complexity

The cost of skeleton learning is dominated by the number of CI tests performed. In the worst case,
each pair requires testing all subsets up to size $q$ (the maximum graph degree), giving
$O(d^{q+2})$ tests. However:

- On **sparse graphs** (bounded degree $q$), the total number of tests is $O(d^{q+2})$ — polynomial in $d$.
- In practice, the algorithm self-prunes: removed edges shrink adjacency sets, so later passes cost less.
- Kalisch & Bühlmann (2007) establish that even when $d \gg n$, consistency holds if the true graph is sparse.

> [!note] High-dimensional consistency (Kalisch & Bühlmann 2007)
> Let the true graph have max in-degree $q$ and let $p$ grow with $n$ such that $\log p = O(n^\gamma)$
> for some $\gamma \in (0,1)$. Then PC with Fisher's z-test at level $\alpha_n \to 0$ (slowly)
> consistently recovers the true skeleton. The key condition is **sparse** true graphs — PC breaks
> down when hub nodes have many neighbors ($q$ large) because the number of CI tests explodes.

## Separation sets

A critical byproduct of skeleton learning is the **separation sets**:

> [!definition] Separation set $\text{sep}(i,j)$
> When the edge $X_i - X_j$ is removed because $X_i \perp\!\!\!\perp X_j \mid X_S$,
> the set $S$ is stored as $\text{sep}(i,j) = \text{sep}(j,i) = S$.
> Used in the orientation phase: $X_k$ is a **collider** on the path $X_i - X_k - X_j$
> iff $X_k \notin \text{sep}(i,j)$.
^def-sep-set

## Connections

- **[[PC Algorithm - Orientation Phase]]** — uses the skeleton and sep-sets to orient edges
- **[[PC Algorithm - Overview]]** — overall algorithm and consistency guarantees
- **[[DAG Structure Learning Problem]]** — the problem setup (SEM, combinatorial constraint)
- **[[Directed Acyclic Graphs]]** — d-separation, the graph-theoretic basis of CI testing

## See Also
- [[PC Algorithm - Orientation Phase]] — how the skeleton gets oriented into a CPDAG
- [[GES - Overview]] — score-based alternative that avoids CI testing entirely
- [[Causal Discovery/_Index|Causal Discovery Index]]
