---
title: Vine Copula Estimation and Model Selection
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Vine-Copulas-Survey-Aas2009-BedfordCooke-Czado]]"
source_location: "Aas et al. (2009), §4; Czado (2019), Ch. 5–8; Dissmann et al. (2013)"
date_ingested: 2026-08-16
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Constructions and Vine Structure]]"
used_by:
  - "[[Copula Architecture Comparison]]"
aliases:
  - sequential MLE vine
  - Dissmann algorithm
  - vine structure selection
  - VineCopula R
---

# Vine Copula Estimation and Model Selection

> [!summary]
> Fitting a vine copula model to data requires three interleaved decisions: (1) **vine structure** — which pairs appear in which tree; (2) **copula family** — which bivariate copula governs each edge; (3) **copula parameters** — the numeric parameters of each family. The dominant approach is **sequential maximum likelihood** (Aas et al. 2009) for parameters, combined with the **Dissmann greedy tree-selection algorithm** (Dissmann et al. 2013) for structure and AIC/BIC for family selection. The `VineCopula` and `rvinecopulib` R packages implement these as defaults.

## Overview

In the vine copula setting the joint log-likelihood decomposes by the vine factorisation into a sum over pair copulas:

$$\ell(\boldsymbol{\Theta}) = \sum_{k=1}^{d-1}\sum_{e\in\mathcal{E}_k} \sum_{t=1}^{T} \log c_{j(e),k(e)\mid\mathcal{D}(e)}\!\left(\hat{v}_{j(e),t}^{(k)}, \hat{v}_{k(e),t}^{(k)}; \boldsymbol{\theta}_e\right)$$

where $\hat{v}_{j,t}^{(k)}$ are the pseudo-observations for tree $T_k$ (computed via the h-function from the estimated parameters of earlier trees). Because the conditional pseudo-observations $\hat{v}^{(k)}$ depend on the parameters of trees $T_1, \ldots, T_{k-1}$, full MLE requires simultaneous optimisation over all parameters — expensive for $d > 8$.

## Main Content

### Sequential maximum likelihood

> [!definition] Sequential MLE algorithm (Aas et al. 2009, §4.2)
> **Input:** Pseudo-observations $\hat{u}_{1,t}, \ldots, \hat{u}_{d,t}$ for $t = 1,\ldots,T$ (rank-transformed data); a vine structure.
>
> **For $k = 1, 2, \ldots, d-1$ (tree by tree):**
>
> 1. For each edge $e \in \mathcal{E}_k$ with conditioned variables $(j,m)$ and conditioning set $\mathcal{D}$:
>    - Compute the edge pseudo-observations $\hat{v}_{j,t}^{(k)}$ and $\hat{v}_{m,t}^{(k)}$ from the already-estimated h-functions of earlier trees
>    - Select a bivariate copula family $\mathcal{F}_e$ for this edge (by AIC/BIC over a candidate library)
>    - Estimate parameters: $\hat{\boldsymbol{\theta}}_e = \arg\max_{\boldsymbol{\theta}} \sum_t \log c_e(\hat{v}_{j,t}^{(k)}, \hat{v}_{m,t}^{(k)}; \boldsymbol{\theta})$
>
> 2. Compute the next-tree pseudo-observations for all affected nodes:
>    $$\hat{v}_{j\mid\mathcal{D}\cup\{m\},t}^{(k+1)} = h\!\left(\hat{v}_{j,t}^{(k)},\; \hat{v}_{m,t}^{(k)};\; \hat{\boldsymbol{\theta}}_e\right)$$
>
> **Output:** Estimated parameters $\{\hat{\boldsymbol{\theta}}_e\}_{e}$ for all edges; vine structure.
>
> **Properties:** Consistent and asymptotically normal (Haff 2013) when the vine structure is correctly specified. Ignores parameter uncertainty from earlier trees; the resulting standard errors are slightly too small, correctable by sandwich or bootstrap.
^def-sequential-mle

### Structure selection: Dissmann algorithm

> [!definition] Dissmann greedy tree selection (Dissmann et al. 2013)
> **Objective:** Select the vine structure (i.e., the sequence of spanning trees $T_1, \ldots, T_{d-1}$) to maximise overall pairwise dependence, prioritising the strongest associations in the first trees where they remain unconditional.
>
> **Algorithm:**
>
> 1. **Tree $T_1$:** Compute Kendall's $\hat{\tau}_{ij}$ for all $\binom{d}{2}$ pairs. Find the maximum spanning tree:
>    $$\hat{T}_1 = \arg\max_{T_1 \text{ spanning}} \sum_{(i,j)\in\mathcal{E}_1} |\hat{\tau}_{ij}|$$
>    This is solvable in $O(d^2 \log d)$ by Prim's or Kruskal's algorithm with edge weights $|\hat{\tau}_{ij}|$.
>
> 2. **Tree $T_k$ for $k \geq 2$:** After estimating all edges in $T_{k-1}$:
>    - Compute transformed pseudo-observations via the h-function
>    - Compute Kendall's $\hat{\tau}$ for all allowed pairs (satisfying the proximity condition)
>    - Find the maximum spanning tree among allowed pairs: $\hat{T}_k = \arg\max_{T_k} \sum_e |\hat{\tau}(e)|$
>
> 3. **Termination:** Stop after $T_{d-1}$ or truncate when residual dependence falls below a threshold.
>
> **Rationale:** Variables with the strongest dependence are modeled in $T_1$ using unconditional pair copulas (most flexible). Weaker residual dependencies appear in later trees, which can often be set to independence copulas (**truncated vine**), reducing the model to a parsimonious subclass.
^def-dissmann

### Copula family selection per edge

For each edge, a library of bivariate copula families is tested. The library typically includes:

| Family | Tail dependence | Parameters | Rotation available |
|--------|----------------|-----------|-------------------|
| Gaussian | None (both tails zero) | 1 ($\rho$) | — |
| Student-$t$ | Symmetric ($\tau^U = \tau^L$) | 2 ($\rho, \nu$) | — |
| Clayton | Lower tail only | 1 ($\kappa > 0$) | Yes (90°, 180°, 270°) |
| Gumbel | Upper tail only | 1 ($\delta \geq 1$) | Yes |
| Frank | Neither tail | 1 ($\alpha$) | — |
| Joe | Upper tail only | 1 ($\delta \geq 1$) | Yes |
| BB1 | Both tails | 2 ($\kappa, \delta$) | Yes |
| BB7 | Both tails | 2 ($\delta, \gamma$) | Yes |
| Independence | Neither | 0 | — |

Selection criterion for edge $e$:

$$\hat{\mathcal{F}}_e = \arg\min_{\mathcal{F} \in \text{library}} \text{AIC}(\mathcal{F}, e) = \arg\min_{\mathcal{F}} \left(-2\hat{\ell}_e(\mathcal{F}) + 2k_\mathcal{F}\right)$$

BIC ($\log T$ penalty) is preferred for large samples since it more aggressively selects independence copulas in later trees.

> [!example] Rotation for negative dependence
> The Clayton copula has support only for positive dependence ($\kappa > 0$). For a pair with negative Kendall's $\tau < 0$, one uses the 180°-rotated Clayton (= "survival Clayton"), whose lower tail becomes an upper tail. In the `VineCopula` package, family code 13 denotes the 90° rotation and 23 the 270° rotation; family 14 is the 180° rotation (survival).

### Full MLE and standard errors

> [!theorem] Full MLE consistency (Joe & Xu 1996; Chen & Fan 2006)
> Under regularity conditions, the full MLE $\hat{\boldsymbol{\Theta}}_{\text{MLE}} = \arg\max_{\boldsymbol{\Theta}} \ell(\boldsymbol{\Theta})$ is consistent and achieves the semiparametric efficiency bound for the IFM (inference functions for margins) approach, where marginals are estimated separately. It is preferred over sequential MLE when $d \leq 8$; for $d > 8$ it is typically prohibitive due to the $O(d^2)$ parameter space.
^thm-full-mle

### Truncated vines

> [!definition] Truncated vine ($k$-truncation)
> A vine is **$k$-truncated** if all pair copulas in trees $T_{k+1}, \ldots, T_{d-1}$ are set to the independence copula ($c = 1$). This reduces the parameter count from $d(d-1)/2$ copula parameters to those in the first $k$ trees:
>
> $$k\text{-truncation parameter count:} \quad (d-1) + (d-2) + \ldots + (d-k) = kd - \frac{k(k+1)}{2}$$
>
> For $k = 1$: a single tree of $d-1$ unconditional pair copulas — equivalent to Markov tree structure. For $k = d-1$: full vine (no truncation). BIC-optimal $k$ is typically 2–4 for financial returns with $d \leq 20$.
^def-truncation

### Software

| Package | Language | Backend | Features |
|---------|----------|---------|---------|
| `VineCopula` (Nagler, Schepsmeier) | R | R/C | Full vine library, Dissmann, sequential/full MLE, goodness-of-fit |
| `rvinecopulib` (Nagler, Vatter) | R/Python | C++ (vinecopulib) | Fast, truncation, Bayesian, time-varying |
| `pyvinecopulib` | Python | C++ (vinecopulib) | Python interface to rvinecopulib |
| `CDvine` (Brechmann, Schepsmeier) | R | R | Earlier, C-vine/D-vine specific |

## Connections

- [[Pair Copula Constructions and Vine Structure]] — the h-function and density formulas that the estimation algorithm evaluates.
- [[Vine Copulas - Overview]] — motivation and structure definitions; the simplifying assumption that makes sequential MLE valid.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ drives the Dissmann structure selection; quantile dependence is a diagnostic.
- [[SMM Estimation of Factor Copulas]] — contrast: factor copulas use SMM (no tractable likelihood) while vine copulas use sequential MLE.
- [[Copula Architecture Comparison]] — estimation complexity is a key differentiator across architectures.

## See Also

- [[raw/Vine-Copulas-Survey-Aas2009-BedfordCooke-Czado]] — source survey covering estimation chapters.
- [[../_Index|Econometrics]]
