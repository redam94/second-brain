---
title: Vine Model Selection
tags:
  - source/ingested
  - topic/econometrics
  - topic/dependence-modeling
  - type/concept
  - doc/paper
source: "[[raw/Vine-PairCopula-Survey.md]]"
source_location: "Czado (2019) Ch. 8; Dissmann et al. (2013); Aas et al. (2009) §5"
date_ingested: 2026-10-20
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction]]"
  - "[[C-Vine and D-Vine Structures]]"
used_by:
  - "[[Factor Copulas - Overview]]"
  - "[[SMM Estimation of Factor Copulas]]"
aliases:
  - Dissmann algorithm
  - vine copula model selection
  - copula family selection AIC
  - VineCopula R package
  - pyvinecopulib
---

# Vine Model Selection

> [!summary]
> Fitting a vine copula requires three nested choices: (1) **vine structure** — which tree sequence to use (C-vine, D-vine, or R-vine); (2) **copula family** — which bivariate copula family at each edge; (3) **parameters** — estimated by sequential MLE. The Dissmann et al. (2013) maximum-spanning-tree algorithm handles structure selection greedily. Family selection uses AIC/BIC after fitting each candidate family. The resulting vine is the one that best captures the data's heterogeneous tail dependence at minimum cost.

## Overview

A vine copula has three layers of model choice, each more granular than the last:

| Layer | What to choose | Method |
|---|---|---|
| **Structure** | Which tree sequence $T_1,\ldots,T_{d-1}$ | Maximum spanning tree (Dissmann 2013) |
| **Family** | Copula family at each of $d(d-1)/2$ edges | AIC/BIC over candidate set |
| **Parameters** | $\boldsymbol{\theta}_e$ at each edge | Sequential MLE ([[Pair Copula Construction#^thm-sequential-mle]]) |

These choices interact: the tree structure determines which pairs appear at which conditioning level, which in turn affects which families are appropriate (e.g. deeper trees near independence → Gaussian/Independence copula is adequate).

## Main Content

> [!definition] Structure selection: Dissmann et al. (2013) algorithm
> **Greedy maximum-spanning-tree (MST) algorithm:**
>
> **At each tree level $k = 1, \ldots, d-1$:**
> 1. Compute edge weights: for each admissible edge $(a,b|D)$ that satisfies the proximity condition, compute the empirical conditional Kendall's $\tau$:
>    $$w_{ab|D} = |\hat\tau_{ab|D}|$$
>    where $\hat\tau_{ab|D}$ is estimated from the pseudo-observations at level $k$.
> 2. Build the **maximum spanning tree** $T_k$: select the set of $d-k$ edges with maximum total weight $\sum_e w_e$ subject to the tree constraint (no cycles, connectivity).
>
> **Rationale:** The MST places the strongest pairwise dependencies in $T_1$ (unconditioned), capturing most of the dependence with the first set of pair copulas. Higher trees handle weaker residual dependences, often well-approximated by the Gaussian or independence copula.
>
> **Implementation:** Maximum spanning tree = negated Kruskal's/Prim's minimum spanning tree. At most $d-1$ runs of Kruskal's algorithm for the full vine.
^def-dissmann-algorithm

> [!definition] Copula family selection at each edge
> For each edge $e = (a,b|D)$ after fixing tree structure:
>
> 1. Gather pseudo-observations $(v_{ia|D}, v_{ib|D})$ from the sequential h-function computations.
> 2. Fit a set of candidate families $\mathcal{F} = \{\text{Gaussian}, t, \text{Clayton}, \text{Gumbel}, \text{Frank}, \text{Joe}, \text{BB1}, \ldots\}$ and their survival (rotated) versions.
> 3. Select the family minimising AIC:
>    $$\text{AIC}_e(F) = -2\sum_{i=1}^n \ln c_F(v_{ia|D},v_{ib|D};\hat\theta_F) + 2 p_F$$
>    where $p_F$ is the number of parameters (typically 1 or 2 for standard families).
>
> **Practical shortcuts:**
> - Pre-screen with the empirical Kendall's $\tau$: if $\hat\tau \approx 0$ use the Independence copula (0 parameters).
> - Check tail dependence coefficients (see [[Dependence Measures for Copulas]]): $\hat\tau^L > 0 \Rightarrow$ include lower-tail families (Clayton, BB1); $\hat\tau^U > 0 \Rightarrow$ include upper-tail families (Gumbel, BB7).
^def-family-selection

> [!definition] Truncated vine (parsimonious approximation)
> For deep trees, residual dependence is often negligible. A **truncated vine of order $m$** replaces all pair copulas at levels $k > m$ with the **Independence copula**:
>
> $$c_{ab|D} \equiv 1 \quad\text{for } k > m$$
>
> This reduces the vine to $m(d - (m+1)/2)$ active pair copulas instead of $d(d-1)/2$.
>
> **Truncation test:** Compare log-likelihoods with and without the $T_{m+1}$ level using a likelihood-ratio test. The Vuong (1989) test is used when comparing non-nested models (different families).
>
> **Typical finding:** For $d=10$ financial returns, truncating at $m=3$ or $m=4$ often loses negligible log-likelihood, drastically reducing parameters.
^def-truncated-vine

> [!definition] Goodness-of-fit for vine copulas
>
> | Test | What it checks |
> |---|---|
> | **Rosenblatt transform + KS/AD test** | Transforms all observations to i.i.d. $U[0,1]$ via the fitted vine; tests uniformity |
> | **Vuong test** | Compares log-likelihoods of two non-nested models (different families at same edge) |
> | **Simplifying assumption test** | Tests whether $c_{ab|D}$ depends on the conditioning values $\mathbf{x}_D$ (Acar et al. 2012) |
> | **AIC/BIC comparison** | Compare full vine vs truncated vine vs alternative copula models |
^def-gof

### Software

> [!definition] VineCopula R package and pyvinecopulib
>
> **VineCopula (R, Schepsmeier et al.):**
> - `RVineStructureSelect()`: runs the Dissmann MST algorithm for full R-vine structure and family selection.
> - `RVineMLE()`: full (joint) MLE over all trees simultaneously.
> - `RVineMatrix()`: stores the vine structure as an upper-triangular matrix.
> - `RVineSim()`: simulates from a fitted vine.
> - `RVineGofTest()`: Rosenblatt GOF test.
>
> **pyvinecopulib (Python):**
> - `Vinecop` class: structure selection, family selection, and estimation.
> - `FitControlsVinecop(family_set=...)`: control candidate families.
> - `Vinecop.simulate(n)`: simulation.
>
> Both implement the Dissmann algorithm, parametric families with h-functions, and AIC/BIC family selection. pyvinecopulib additionally supports non-parametric and kernel-smoothed pair copulas.
^def-software

## Examples

> [!example] Dissmann algorithm trace — 4 variables
>
> **$T_1$ construction:**
> Compute $|\hat\tau|$ for all $\binom{4}{2}=6$ possible pairs: $(12), (13), (14), (23), (24), (34)$.
> Suppose: $|\hat\tau_{12}|=0.55$, $|\hat\tau_{23}|=0.48$, $|\hat\tau_{34}|=0.40$, $|\hat\tau_{13}|=0.22$, $|\hat\tau_{24}|=0.18$, $|\hat\tau_{14}|=0.10$.
> Maximum spanning tree: edges $\{12, 23, 34\}$ (total weight 1.43) — a path graph $1-2-3-4$.
> → This gives a **D-vine** with natural ordering.
>
> **$T_2$ construction:**
> Compute h-functions from $T_1$ pair copulas → pseudo-observations $(v_{i1|2}, v_{i3|2})$ and $(v_{i2|3}, v_{i4|3})$.
> Compute $|\hat\tau_{13|2}|$ and $|\hat\tau_{24|3}|$. Only two admissible edges by proximity: both are chosen.
>
> **$T_3$:**
> Single remaining admissible edge: $(1,4|2,3)$. Always selected.

> [!example] Comparing vine vs factor copula — JBES S&P 100 application
>
> Oh & Patton (2017) explicitly compare their factor copula to vine alternatives ([[Factor Copulas - Overview#^literature]]):
>
> | Model | Params | Log-likelihood | Notes |
> |---|---|---|---|
> | Gaussian copula | 4950 | baseline | IIA / zero tail dep |
> | Factor copula (skew $t$-$t$) | 16 (block) | best | $>100$ vars, SMM |
> | D-vine (SML) | 4950 families + params | good | infeasible at $d=100$ |
>
> **Conclusion:** At $d=100$ vines are practically infeasible (4950 pair copulas, sequential estimation over 99 trees). The factor copula sacrifices flexibility for scalability and interpretability (the common factor = systematic risk).

## Connections

- [[C-Vine and D-Vine Structures]] — the structure choice is the first step; C-vine, D-vine, or R-vine.
- [[Pair Copula Construction]] — the sequential estimation algorithm this note selects over.
- [[Factor Copulas - Overview]] — at high $d$ ($\geq 30$), the factor copula is preferred: 16 vs 435 parameters for $d=30$.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence inform both tree-structure selection and copula-family pre-screening.
- [[SMM Estimation of Factor Copulas]] — the competing estimation strategy for high-dimensional copulas; vine uses SML on pseudo-observations, factor copula uses SMM on rank statistics.

## See Also

- [[Vine Copulas - Overview]] — foundations
- [[C-Vine and D-Vine Structures]] — structural taxonomy
- [[Pair Copula Construction]] — the estimation algorithm
