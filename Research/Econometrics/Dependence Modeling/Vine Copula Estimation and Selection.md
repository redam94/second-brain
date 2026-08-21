---
title: Vine Copula Estimation and Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/Vine-Copula-Synthesis-Survey.md]]"
source_location: "§5"
date_ingested: 2026-08-21
date_updated: 2026-08-21
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Construction]]"
  - "[[C-Vine and D-Vine Structures]]"
used_by: []
aliases:
  - vine copula MLE
  - MST structure selection
  - truncated vine
  - rvinecopulib
  - VineCopula R
---

# Vine Copula Estimation and Selection

> [!summary]
> Vine copula estimation consists of three nested choices: (1) **vine structure** — which pairs appear in which trees; (2) **bivariate copula families** — one per edge, selected from a menu of parametric families by AIC/BIC; (3) **copula parameters** — estimated by sequential (tree-by-tree) or joint MLE. The sequential estimator of Aas et al. (2009) is computationally efficient and widely used. Structure selection typically uses the Maximum Spanning Tree (MST) algorithm of Dissmann et al. (2013), which greedily maximises pairwise dependence at each tree level. **Truncation** (setting higher-tree copulas to independence) reduces parameter count and often improves out-of-sample fit.

## Overview

Vine copula estimation is a multi-step procedure that separates the three modelling decisions:

1. **Vine structure:** which tree topology to use (C-vine, D-vine, or general R-vine with MST selection).
2. **Family selection:** for each edge in the vine, which bivariate copula family best captures the local dependence.
3. **Parameter estimation:** given the structure and families, estimate the copula parameters.

The decisions are typically made sequentially: structure selection first (tree by tree), then family selection within each tree, then parameter estimation — all using the same sequential logic. This tree-by-tree approach is tractable even for $d = 50+$ and is the standard workflow in `VineCopula` and `rvinecopulib`.

## Main Content

> [!theorem] Sequential (tree-by-tree) MLE — Aas et al. (2009)
> Under the simplifying assumption (see [[Pair-Copula Construction#^def-simplifying]]), the vine copula log-likelihood factorises across edges:
> $$\ell(\boldsymbol{\Theta}) = \sum_{k=1}^{d-1} \sum_{e \in E_k} \sum_{t=1}^{T} \ln c_{i_e,j_e|\mathbf{D}_e}\!\left(\hat{u}_{i_e|\mathbf{D}_e,t},\; \hat{u}_{j_e|\mathbf{D}_e,t};\; \boldsymbol{\theta}_{i_e,j_e|\mathbf{D}_e}\right)$$
> where $\hat{u}_{i|\mathbf{D},t}$ are empirical conditional CDFs (pseudo-observations via $h$-functions).
>
> **Sequential algorithm:**
> 1. **Tree 1:** Estimate $\{\boldsymbol{\theta}_{ij}\}_{(i,j)\in E_1}$ by maximising the tree-1 contribution to $\ell$. Compute pseudo-observations $\hat{u}_{i|j}$ and $\hat{u}_{j|i}$ for all edges via $h$-functions.
> 2. **Tree 2:** Using $\hat{u}_{i|\mathbf{D}_e}$ from tree 1 as inputs, estimate $\{\boldsymbol{\theta}_{ij|\mathbf{D}_e}\}_{e \in E_2}$. Propagate $h$-functions upward.
> 3. **Repeat** for trees 3 through $d-1$.
>
> **Properties:** Consistent and asymptotically normal (under regularity conditions); ignores estimation error in lower-tree $h$-functions, making it slightly less efficient than joint MLE. Computationally: $O(d^2)$ bivariate optimisations of small parameter dimension.
>
> **Joint MLE:** Optimise $\ell(\boldsymbol{\Theta})$ jointly over all parameters simultaneously (implemented as an option in `rvinecopulib`). Asymptotically efficient but computationally expensive for large $d$.
^thm-sequential

> [!definition] Bivariate copula family menu
> Each vine edge gets one bivariate copula from a standard menu. Common choices:
>
> | Family | Parameters | Tail dependence | Rotation variants |
> |---|---|---|---|
> | Gaussian | $\rho \in (-1,1)$ | None | — |
> | Student-$t$ | $\rho, \nu > 2$ | Upper = Lower | — |
> | Clayton | $\theta > 0$ | Lower only | 90°, 180°, 270° |
> | Gumbel | $\theta \geq 1$ | Upper only | 90°, 180°, 270° |
> | Frank | $\theta \neq 0$ | None | — |
> | Joe | $\theta \geq 1$ | Upper only | 90°, 180°, 270° |
> | BB1 | $\theta, \delta$ | Both | 90°, 180°, 270° |
> | Independence | — | None | — |
>
> **Rotation variants** (90°, 270°) of Clayton/Gumbel/Joe produce **negative dependence** or **upper-only / lower-only** tail dependence in the opposite tail.
>
> **Selection criterion:** AIC or BIC for each edge independently. Preliminary screening using the independence test (based on Kendall's $\tau$) sets an edge to the independence copula when dependence is not significant, saving parameters. The `rvinecopulib` function `bicop()` fits all families and returns the best by AIC/BIC.
^def-family

> [!definition] Vine structure selection: Maximum Spanning Tree (Dissmann et al. 2013)
> For a general R-vine, the **MST algorithm** greedily selects the vine structure:
>
> **For tree $T_1$:**
> 1. Compute pairwise Kendall's $\tau$ (or absolute Pearson/Spearman correlation) for all $d(d-1)/2$ unconditional pairs.
> 2. Find the **maximum spanning tree** of the complete graph with edge weights $= |\hat{\tau}_{ij}|$. This tree $T_1$ concentrates the strongest unconditional dependencies in the first tree (which is estimated most precisely).
>
> **For tree $T_k$ (given $T_{k-1}$):**
> 1. Identify all pairs $(i,j|\mathbf{D})$ that are **admissible** given the proximity condition (see [[C-Vine and D-Vine Structures#^def-proximity]]).
> 2. Compute conditional Kendall's $\tau$ for each admissible pair using pseudo-observations from tree $T_{k-1}$.
> 3. Find the maximum spanning tree of admissible pairs with conditional $|\hat{\tau}|$ as edge weights.
>
> **Rationale:** Dependencies not captured in lower trees are weaker (conditional) and closer to independence — their copula families are close to the independence copula. Concentrating strong dependencies early in the vine reduces approximation error from truncation.
^def-mst

> [!definition] Truncated vine copulas
> A **$K$-truncated vine** sets all pair-copulas in trees $T_{K+1}, \ldots, T_{d-1}$ to the **independence copula** ($c = 1$):
> $$c_{ij|\mathbf{D}} \equiv 1 \quad \text{for all edges with } |\mathbf{D}| \geq K$$
>
> The number of free copula parameters reduces from $O(d^2)$ to $O(Kd)$. The truncation level $K$ is chosen by:
> - **AIC/BIC** of the sequential log-likelihood across truncation levels.
> - **Sequential likelihood-ratio tests** (Joe 2011): stop at level $K$ if the increment to log-likelihood from tree $K+1$ is not significant.
> - **Practical rule:** $K \in \{2, 3, 4\}$ often suffices; the MST algorithm concentrates strong dependence in early trees, so higher-level pairs are typically near-independent.
^def-truncation

> [!definition] Vine copula software
> | Package | Language | Key features |
> |---|---|---|
> | `VineCopula` | R (CRAN) | Sequential MLE, MST selection, simulation, GOF tests (Genest et al.) |
> | `rvinecopulib` | R (CRAN + Python via `pyvinecopulib`) | C++ backend (fast), joint MLE, parallel estimation, richer family set, truncation |
> | `pyvinecopulib` | Python | Python bindings for `rvinecopulib`; scikit-learn-style API |
> | `vinecopulib` | C++ | Core library; the engine underlying `rvinecopulib` |
> | `vinereg` | R | D-vine quantile regression (Kraus & Czado 2017) |
>
> **Typical `rvinecopulib` workflow:**
> ```r
> library(rvinecopulib)
> # u: T×d matrix of pseudo-observations (probability integral transforms of marginals)
> vc <- vinecop(u, family_set = "all", selcrit = "aic", trunc_lvl = 3)
> summary(vc)          # vine structure, families, parameters
> simulate(vc, n = 1000) # simulate from the fitted vine
> ```
^def-software

## Examples

> [!example] Sequential MLE on five financial returns (stylised)
> **Setup:** $d=5$ equity returns; pseudo-observations computed from AR(1)-GJR-GARCH marginals (as in [[Factor Copula Application - S&P 100 and Systemic Risk]]). Run MST R-vine with AIC family selection and truncation at $K=2$.
>
> **Step 1 (Tree 1):** MST selects the four strongest unconditional pairs (e.g. $(1,2), (2,3), (3,4), (4,5)$ forming a path — effectively a D-vine in this example). Each pair gets a bivariate copula: pairs with strong lower tail dependence get rotated-Clayton or Student-$t$; symmetric pairs get Gaussian.
>
> **Step 2 (Tree 2):** Three conditional pairs: $(1,3|2), (2,4|3), (3,5|4)$. Conditional $\tau$ values are smaller; families tend toward Gaussian or independence.
>
> **Truncation at $K=2$:** Trees 3 and 4 set to independence. Log-likelihood AIC is compared for $K=1,2,3$ — $K=2$ offers the best AIC here.
>
> **Interpretation:** Most dependence in these returns is captured by adjacent pairs (tree 1) and one step of conditioning (tree 2). Higher-order conditional dependencies are negligible.

## Connections

- [[Vine Copulas - Overview]] — the overall framework motivating estimation.
- [[Pair-Copula Construction]] — the sequential MLE uses $h$-functions tree by tree; the log-likelihood formula is the product-form PCC density.
- [[C-Vine and D-Vine Structures]] — C/D-vine structure selection is a restriction of the MST R-vine; the MST algorithm is the general alternative.
- [[SMM Estimation of Factor Copulas]] — contrast: factor copulas use SMM (rank-based moment matching, no likelihood); vine copulas use MLE with an analytical likelihood.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — uses GARCH-filtered marginal pseudo-observations as the pre-processing step before copula estimation — the same starting point for vine copula estimation.

## See Also

- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence used in MST structure selection and as specification checks.
- [[Overfitting and Information Criteria]] — AIC/BIC model selection logic that governs bivariate family selection and truncation level choice.
- [[../_Index|Dependence Modeling]]
