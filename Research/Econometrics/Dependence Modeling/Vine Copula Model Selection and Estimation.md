---
title: Vine Copula Model Selection and Estimation
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/concept
  - method/r
  - doc/paper
source: "[[raw/vine-copulas-sources.md]]"
source_location: "Dissmann et al. (2013), Secs. 2–4; Aas et al. (2009), Sec. 4"
date_ingested: 2026-10-23
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction and PCC Density]]"
  - "[[Regular Vine Structures - C-vine D-vine R-vine]]"
used_by: []
aliases:
  - vine copula estimation
  - R-vine model selection
  - VineCopula package
  - pyvinecopulib
---

# Vine Copula Model Selection and Estimation

> [!summary]
> Vine copula model selection involves choosing: (1) the **vine structure** (which spanning tree at each level), and (2) the **pair copula families** for all $\binom{n}{2}$ edges. Dissmann et al. (2013) propose a greedy sequential algorithm: use the **maximum spanning tree** (edges weighted by $|\hat\tau|$) for structure, and AIC/BIC for family selection, tree by tree. This procedure is implemented in the **VineCopula** R package (Schepsmeier et al.) and **pyvinecopulib** Python package (Nagler & Vatter).

## Overview

A vine copula model $\mathcal{M} = (\mathcal{V}, \mathcal{F}, \boldsymbol{\theta})$ has three components:
- $\mathcal{V}$: a regular vine structure (which spanning tree at each level)
- $\mathcal{F} = \{F_{j,k|D} : e = (j,k|D) \in \mathcal{E}\}$: pair copula families for each edge
- $\boldsymbol{\theta} = \{\theta_{j,k|D}\}$: parameters of each pair copula

Selecting $\mathcal{V}$ and $\mathcal{F}$ jointly from data is a combinatorial problem. For $n \geq 6$ the search space is astronomically large (see [[Regular Vine Structures - C-vine D-vine R-vine]]), so greedy sequential selection is standard.

## Main Content

### Structure selection: maximum spanning tree

> [!theorem] MST Algorithm for R-vine Structure (Dissmann et al. 2013, Alg. 1)
> **Input:** Pseudo-observations $\hat{u}_{kt} = \hat{F}_k(x_{kt})$ for $k = 1,\ldots,n$ and $t = 1,\ldots,T$.
>
> **Tree $T_1$:**
> 1. Compute pairwise Kendall's $\hat\tau_{jk}$ for all $\binom{n}{2}$ pairs.
> 2. Build a complete weighted graph $G_1$ with nodes $\{1,\ldots,n\}$ and edge weights $|\hat\tau_{jk}|$.
> 3. Find the **maximum spanning tree** (MST) of $G_1$ — the spanning tree maximising the sum of edge weights. This defines the structure of $T_1$.
>
> **Tree $T_\ell$ for $\ell \geq 2$:**
> 1. For each candidate edge $(j,k|D)$ satisfying the proximity condition, compute $\hat\tau$ from pseudo-observations $\hat{u}_{j|D,t}$ and $\hat{u}_{k|D,t}$ obtained via the h-function.
> 2. Build graph $G_\ell$ with nodes $N_\ell = E_{\ell-1}$ and weights $|\hat\tau_{j,k|D}|$ for allowed edges.
> 3. Find the MST of $G_\ell$ subject to the proximity condition.
>
> **Rationale:** Higher-dependence pairs are linked in lower-level trees, where the pair copula is exact (not subject to the simplifying assumption approximation propagating from lower trees). This minimizes the error introduced by the simplifying assumption at higher tree levels.
^thm-mst-algorithm

### Pair copula family selection

After fixing the vine structure, each pair copula family is selected independently:

> [!theorem] AIC Family Selection (Dissmann et al. 2013, Sec. 3)
> For edge $e = (j,k|D) \in E_\ell$, select the pair copula family $\hat{F}_{j,k|D}$ by:
> 1. Fit each candidate family $F \in \mathcal{C}$ (see table below) via MLE: $\hat\theta_F = \arg\max \sum_t \log c_F(\hat{u}_{j|D,t}, \hat{u}_{k|D,t}; \theta)$.
> 2. Select $\hat{F}_{j,k|D} = \arg\min_{F \in \mathcal{C}} \text{AIC}_F = -2\hat\ell_F + 2\,\text{df}(F)$.
>
> The independence copula (df = 0) is always in the candidate set; if selected, it is equivalent to truncating the vine at level $\ell - 1$.
^thm-family-selection

**Standard candidate family set:**

| Family | Tail dependence | Parameters | Notes |
|---|---|---|---|
| Gaussian | None | $\rho \in (-1,1)$ | Symmetric; zero tail dep. |
| Student-$t$ | Symmetric ($\tau^U = \tau^L$) | $\rho, \nu > 0$ | 2 params; symmetric tails |
| Clayton | Lower tail only | $\theta > 0$ | Asymmetric; $\tau^L > 0$, $\tau^U = 0$ |
| Gumbel | Upper tail only | $\theta \geq 1$ | Asymmetric; $\tau^U > 0$, $\tau^L = 0$ |
| Frank | None | $\theta \in \mathbb{R}\setminus\{0\}$ | Symmetric; no tail dep. |
| Joe | Upper tail | $\theta \geq 1$ | Stronger upper tail than Gumbel |
| BB1 | Both tails | $\theta > 0, \delta \geq 1$ | Clayton–Gumbel mixture |
| Survival Clayton | Upper tail | $\theta > 0$ | Rotated 180° |
| Survival Gumbel | Lower tail | $\theta \geq 1$ | Rotated 180° |
| Independence | None | 0 | $C(u,v) = uv$ |

### Sequential vs. full maximum likelihood

**Sequential ML** (Aas et al. 2009): Estimate each tree's pair copulas using pseudo-observations from the previous tree (h-function outputs). Fast; $\binom{n}{2}$ separate bivariate optimizations.

**Full ML**: Maximize the complete vine log-likelihood over all parameters jointly, using sequential estimates as starting values. More efficient but slower; gradient computation requires differentiating through h-function recursion.

> [!theorem] Asymptotic Properties (Aas et al. 2009, Sec. 4.2)
> Under regularity conditions and the simplifying assumption, both the sequential and full ML estimators are:
> - **Consistent**: $\hat{\boldsymbol\theta} \xrightarrow{p} \boldsymbol\theta_0$ as $T \to \infty$.
> - **Asymptotically normal**: $\sqrt{T}(\hat{\boldsymbol\theta} - \boldsymbol\theta_0) \xrightarrow{d} N(0, \Sigma)$, where $\Sigma$ is the sandwich variance.
>
> Sequential ML is less efficient than full ML but substantially faster, making it the default for large $n$.
^thm-asymptotic-properties

### Truncation level selection

> [!definition] Truncation Level Selection
> Select the truncation level $K$ by testing each tree $T_\ell$ ($\ell = K+1, K+2, \ldots$) for whether all pair copulas are significantly different from independence. Two approaches:
> 1. **Likelihood ratio test** (Brechmann et al. 2012): For tree $T_\ell$, test $H_0$: all pair copulas in $T_\ell$ are independence. Truncate at $K = \ell - 1$ if not rejected.
> 2. **Information criterion**: Select $K$ minimising total AIC/BIC across all trees $T_1, \ldots, T_K$ (adding independence copulas at levels $> K$ costs nothing).
>
> In practice, truncation at $K = 1$ or $K = 2$ often captures most dependence; higher-order trees frequently select independence copulas.
^def-truncation-selection

### Software

**VineCopula (R)**:
```r
library(VineCopula)
# Fit R-vine with automatic structure and family selection
fit <- RVineStructureSelect(data, familyset = NA, type = 0)  # 0 = R-vine
summary(fit)
# Compute log-likelihood
logLik(fit)
# Simulate from fitted model
sim <- RVineSim(n = 1000, RVM = fit)
```

**pyvinecopulib (Python)**:
```python
import pyvinecopulib as pv
import numpy as np

# Fit a vine copula with automatic structure and family selection
controls = pv.FitControlsVinecop(family_set=[pv.BicopFamily.gaussian,
                                              pv.BicopFamily.student,
                                              pv.BicopFamily.clayton,
                                              pv.BicopFamily.gumbel])
cop = pv.Vinecop(data, controls=controls)
print(cop)
# Log-likelihood
cop.loglik(data)
# Simulate
samples = cop.simulate(n=1000)
```

Both packages use the R-vine matrix representation internally (see [[Regular Vine Structures - C-vine D-vine R-vine]]).

### Comparison with factor copula estimation

| Aspect | Vine copula (Dissmann 2013) | Factor copula (Oh & Patton 2012) |
|---|---|---|
| Estimation | Sequential ML or full ML (h-function) | SMM (no closed form); see [[SMM Estimation of Factor Copulas]] |
| Structure selection | MST greedy; AIC family selection | Factor number + family choice |
| Scalability | $n \leq 20$–30 in practice | $n = 100$+ demonstrated |
| Inference | Sandwich SE; bootstrap | Bootstrap + numerical derivative (see [[SMM Estimation of Factor Copulas]]) |
| Goodness of fit | Vuong test; Rosenblatt PIT test | J-test (over-identification) |

## Connections

- [[Vine Copulas - Overview]] — motivation and comparison with factor copulas.
- [[Pair Copula Construction and PCC Density]] — the h-function recursion that computes pseudo-observations at each tree level.
- [[Regular Vine Structures - C-vine D-vine R-vine]] — vine structures whose MST is selected here.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is the edge weight for MST structure selection.
- [[SMM Estimation of Factor Copulas]] — contrasting estimation approach (simulation-based) for the factor copula.

## See Also

- [[raw/vine-copulas-sources.md]] — Dissmann et al. (2013) formal statements
