---
title: Vine Copula Estimation and Model Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
  - method/r
  - method/python
source: "[[raw/Vine-Copula-Aas-Czado-Survey.md]]"
source_location: "Aas et al. (2009) §3-4; Dissmann et al. (2013); Czado & Nagler (2022) §3-5"
date_ingested: 2026-07-04
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[C-Vine and D-Vine Structures]]"
used_by: []
aliases:
  - vine copula MLE
  - sequential vine estimation
  - Dissmann algorithm
  - vine copula model selection
  - pyvinecopulib
  - VineCopula R
---

# Vine Copula Estimation and Model Selection

> [!summary]
> Vine copula estimation follows a **sequential tree-by-tree maximum likelihood** procedure (Aas et al. 2009): estimate marginals, fit tree $T_1$ copulas, compute h-functions to obtain pseudo-observations for tree $T_2$, then continue. The vine structure is selected greedily by the **Dissmann (2013) algorithm**, which picks edges with the highest pairwise Kendall's $\tau$ at each tree level. **Truncated vines** reduce parameters by assuming independence above tree level $m$. Software: VineCopula (R) and pyvinecopulib (Python).

## Overview

With a vine structure fixed and the simplifying assumption invoked (see [[Vine Copulas - Overview]]), estimation decomposes into a sequence of $d(d-1)/2$ bivariate copula fitting problems. Aas et al. (2009) formalise the sequential approach that makes this tractable; Dissmann et al. (2013) add an automatic structure-selection algorithm so researchers need not specify the vine topology by hand.

## Main Content

### Sequential Maximum Likelihood (Aas et al. 2009)

> [!definition] Sequential MLE Algorithm
> **Input:** $n$ observations $(x_1^{(t)}, \ldots, x_d^{(t)})$, $t=1,\ldots,n$; a vine structure $\mathcal{V}$.
>
> **Step 1 — Marginals:** Transform each variable to the uniform margin. Either:
> - *Parametric*: Fit $\hat{F}_k$ to each marginal, then $\hat{u}_{kt} = \hat{F}_k(x_{kt})$.
> - *Non-parametric*: $\hat{u}_{kt} = \text{rank}(x_{kt})/(n+1)$ — pseudo-observations (rescaled ranks), the standard choice for financial data.
>
> **Step 2 — Tree $T_1$:** For each edge $(i,j) \in T_1$, select a bivariate copula family and estimate parameters $\hat{\boldsymbol{\theta}}_{ij}$ by MLE on $(\hat{u}_{it}, \hat{u}_{jt})$.
>
> **Step 3 — H-functions:** For each edge in $T_1$, compute the conditional pseudo-observations for tree $T_2$:
> $$\hat{v}_{i|j,t} = \hat{h}_{ij}(\hat{u}_{it} | \hat{u}_{jt}; \hat{\boldsymbol{\theta}}_{ij})$$
>
> **Step 4 — Tree $T_2$:** For each edge $(i,j|k) \in T_2$, select a family and estimate by MLE on $(\hat{v}_{i|k,t}, \hat{v}_{j|k,t})$.
>
> **Step 5 — Continue:** Repeat h-function computation and tree fitting until tree $T_{d-1}$.
>
> **Efficiency:** Sequential MLE is **consistent** and **asymptotically normal** under the simplifying assumption (Haff 2013). It is not joint MLE (which simultaneously fits all pair copulas) and carries a small efficiency penalty. In practice the difference is negligible for $n \geq 200$.
^def-sequential-mle

### Pair Copula Family Selection

At each edge, the researcher selects a bivariate copula family. Standard practice uses **AIC or BIC** at each pair, comparing:

| Family | Tail dependence | Parameters | Notes |
|--------|----------------|------------|-------|
| Gaussian | None | 1 ($\rho$) | Symmetric, baseline |
| Student's $t$ | Symmetric (upper = lower) | 2 ($\rho$, $\nu$) | Allows tail co-movement |
| Clayton | Lower only | 1 ($\theta$) | Joint crashes |
| Gumbel | Upper only | 1 ($\theta$) | Joint booms |
| Frank | None (symmetric) | 1 ($\theta$) | Negative dependence possible |
| Joe | Upper only | 1 ($\theta$) | Stronger upper tail than Gumbel |
| BB1 | Both (lower+upper) | 2 ($\theta$, $\delta$) | Flexible both tails |
| BB7 | Both | 2 ($\theta$, $\delta$) | Another two-parameter family |
| Rotated Clayton (180°) | Upper only | 1 | = Survival Clayton |
| Rotated Gumbel (180°) | Lower only | 1 | Joint crash alternative to Clayton |

**Independence copula** (no parameters) is a valid choice for near-independent pairs, especially in higher trees.

> [!definition] AIC/BIC Family Selection
> For each edge, fit all candidate families and select by:
> $$\text{AIC} = -2\ell(\hat{\boldsymbol{\theta}}) + 2k, \quad \text{BIC} = -2\ell(\hat{\boldsymbol{\theta}}) + k \log n$$
> where $\ell(\hat{\boldsymbol{\theta}})$ is the maximised log-likelihood of the pair copula and $k$ is the number of parameters. BIC is preferred for larger samples; AIC for small $n$ where parsimony is less critical. Some software (rvinecopulib, VineCopula) supports automated family selection via AIC/BIC by default.
^def-aic-selection

### Structure Selection: The Dissmann Algorithm

> [!definition] Dissmann et al. (2013) Greedy Structure Selection
> The **Dissmann algorithm** selects the vine structure greedily, one tree at a time, by maximising the sum of absolute pairwise dependence:
>
> **Tree $T_1$:** Compute Kendall's $\hat{\tau}_{ij}$ for all $\binom{d}{2}$ pairs. Select the **maximum spanning tree** (MST) on the complete graph with edge weights $|\hat{\tau}_{ij}|$. The MST can be found in $O(d^2)$ using Prim's or Kruskal's algorithm.
>
> **Tree $T_2$:** The nodes of $T_2$ are the edges of $T_1$. For each eligible pair of $T_1$ edges (those sharing a node, satisfying the proximity condition), compute Kendall's $\hat{\tau}$ on the h-function pseudo-observations. Select the MST over eligible pairs.
>
> **Continue** for trees $T_3, \ldots, T_{d-1}$.
>
> **Property:** This greedy approach places the most dependent pairs at the lowest tree level (earliest conditioning), where pair-copula flexibility has the largest impact on the joint likelihood. Simulation studies show that the greedy approach performs close to exhaustive search for $d \leq 20$.
^def-dissmann

### Truncated Vines

> [!definition] Truncated Vine (Brechmann, Czado & Aas 2012)
> A vine **truncated at level $m$** sets all pair copulas in trees $T_{m+1}, \ldots, T_{d-1}$ to the **independence copula** ($C(u,v) = uv$). This reduces the number of free pair copulas from $d(d-1)/2$ to:
> $$m(d-1) - \frac{m(m-1)}{2}$$
>
> **Rationale:** In higher trees, all pairs are conditioned on many other variables. Under the simplifying assumption, if conditioning removes most dependence, the conditional copula is approximately the independence copula. A truncation point of $m=1$ or $m=2$ often suffices for financial data (Brechmann et al. 2012).
>
> **Selection:** Choose $m$ by sequential likelihood ratio tests comparing the fitted pair copula in tree $T_{m+1}$ against the independence copula, or by cross-validated likelihood.
^def-truncated

## Software Implementation

> [!example] R: rvinecopulib (Recommended)
> ```r
> library(rvinecopulib)
>
> # 1. Transform to pseudo-observations (ranks)
> u <- pseudo_obs(data)
>
> # 2. Fit vine copula with automatic structure + family selection
> fit <- vinecop(u, family_set = "parametric", selcrit = "aic")
>
> # 3. Inspect structure
> plot(fit)               # draw the vine tree sequence
> summary(fit)            # pair copula families and parameters
>
> # 4. Simulate from fitted vine
> sim <- rvinecop(1000, fit)
>
> # 5. Evaluate log-likelihood
> logLik(fit)
>
> # 6. Compute conditional distribution (h-function)
> hbicop(u[, 1:2], cond_var = 2, family = fit$pair_copulas[[1]][[1]])
> ```
> The `family_set` argument accepts `"all"`, `"parametric"`, `"elliptical"`, `"archimedean"`, or specific family names. The `selcrit` argument accepts `"aic"`, `"bic"`, or `"mbic"`.

> [!example] Python: pyvinecopulib
> ```python
> import pyvinecopulib as pv
> import numpy as np
>
> # 1. Pseudo-observations
> u = pv.to_pseudo_obs(data)  # (n, d) array
>
> # 2. Fit vine copula
> controls = pv.FitControlsVinecop(family_set=pv.parametric, select_trunc_lvl=True)
> fit = pv.Vinecop(u, controls=controls)
>
> # 3. Inspect
> print(fit)              # tree structures and pair copulas
>
> # 4. Simulate
> sim = fit.simulate(1000)
>
> # 5. Log-likelihood
> fit.loglik(u)
>
> # 6. Access structure matrix
> print(fit.matrix)       # R-vine matrix representation
> ```
> `pv.parametric` selects from all parametric families with AIC. Set `select_trunc_lvl=True` to automatically truncate the vine. `fit.matrix` returns the R-vine matrix encoding the tree structure.

## Connections

- [[Vine Copulas - Overview]] — the pair-copula decomposition, simplifying assumption, and architecture comparison.
- [[C-Vine and D-Vine Structures]] — the canonical vine structures; this note provides the estimation machinery that operates on them.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used as the weight in the Dissmann MST algorithm.
- [[SMM Estimation of Factor Copulas]] — factor copula estimation by method of simulated moments; contrast with vine's sequential MLE; both avoid requiring a closed-form joint likelihood.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — the factor copula beats the vine copula in very high dimensions ($d=100$) due to parameter parsimony; vine copulas are competitive for smaller $d$.
- [[Copula Estimation]] — Bayesian Gaussian copula estimation (PyMC tutorial); a Bayesian vine extension would use HMC in Stan with priors on pair copula parameters.

## See Also

- Brechmann, Czado & Aas (2012) — "Truncated Regular Vines in High Dimensions with Application to Financial Data" (*Canadian Journal of Statistics* 40: 68-85) — truncation criterion.
- Dissmann, Brechmann, Czado & Kurowicka (2013) — "Selecting and Estimating Regular Vine Copulae and Application to Financial Returns" (*Computational Statistics & Data Analysis* 59: 52-69) — the structure selection algorithm.
- [[../_Index|Dependence Modeling]]
