---
title: Vine Copula Estimation and Model Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/SOURCES-vine-copulas.md]]"
source_location: "Aas et al. (2009), §3–4; Dissmann et al. (2013), §2–3; Czado & Nagler (2022), §3–4"
date_ingested: 2026-08-01
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction and Regular Vines]]"
  - "[[C-vines and D-vines]]"
used_by:
  - "[[Factor Copula Application - S&P 100 and Systemic Risk]]"
aliases:
  - vine copula MLE
  - sequential vine estimation
  - Dissmann algorithm
  - VineCopula R package
  - vine model selection
---

# Vine Copula Estimation and Model Selection

> [!summary]
> Vine copula estimation proceeds in two steps: (1) **model selection** — which vine structure and which bivariate copula family at each edge; (2) **parameter estimation** — sequential MLE tree-by-tree (Aas et al. 2009) or full joint MLE. The key computational tool is the **h-function** (conditional distribution from a bivariate copula), which maps raw data into pseudo-observations for higher tree levels. The Dissmann et al. (2013) greedy maximum spanning tree algorithm is the standard approach for R-vine structure selection; C- and D-vines additionally require ordering the variables. All methods are implemented in the `VineCopula` R package.

## Overview

Estimating a vine copula model for $n$ variables involves three nested choices:
1. **Vine structure** — which of the $(n-1)!/2$ regular vine trees (or which ordering for C/D-vines) to use.
2. **Bivariate copula families** — which parametric family (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, etc.) at each of the $n(n-1)/2$ edges.
3. **Bivariate copula parameters** — the parameters within each chosen family.

A fully joint approach — selecting structure, families, and parameters simultaneously by maximising the vine log-likelihood — is computationally intractable for $n > 5$. The standard solution is a **greedy sequential approach** that treats each tree level independently, choosing the best structure and family at that level before moving to the next.

## Main Content

### Step 1: Marginal Estimation

> [!definition] Marginal estimation (IFM / pseudo-MLE)
> Vine copulas separate marginal and dependence modelling via Sklar's theorem. Standard practice uses the **inference functions for margins (IFM)** approach or its semi-parametric variant:
>
> 1. **Parametric IFM:** Fit each marginal $F_k$ separately (e.g. ARMA-GARCH for financial returns, as in [[Factor Copula Application - S&P 100 and Systemic Risk]]) and extract standardised residuals $\hat{u}_k = \hat{F}_k(x_k)$.
> 2. **Non-parametric (pseudo-MLE):** Use empirical CDFs $\hat{F}_k(x_k) = \text{rank}(x_k)/(n+1)$ — robust to marginal mis-specification.
>
> The resulting $\hat{u}_k \in (0,1)$ are the **uniform pseudo-observations** on which the copula is estimated. This separation enables multi-stage estimation: marginals and the copula are estimated independently, then combined.
^def-ifm

### Step 2: Tree-by-Tree Structure Selection (Dissmann Algorithm)

> [!definition] Dissmann et al. (2013) greedy R-vine structure selection
> For each tree $T_j$ ($j = 1, \ldots, n-1$):
>
> 1. **Compute edge weights:** For all eligible pairs $(a, b \mid D)$ satisfying the proximity condition (see [[Pair Copula Construction and Regular Vines]]), compute $|\hat{\tau}_{a,b|D}|$ — the absolute empirical Kendall's $\tau$ between the pseudo-observations for the conditioned pair at conditioning level $D$.
>
> 2. **Maximum spanning tree:** Select $T_j$ as the **maximum spanning tree** (MST) of the complete graph on eligible nodes with edge weights $|\hat{\tau}|$. This maximises the total absolute dependence captured at this tree level. Standard MST algorithms (Prim's, Kruskal's) apply.
>
> 3. **Copula family selection at each edge:** For each selected edge $(a,b|D)$ in $T_j$, choose the bivariate copula family by **AIC** (or BIC) over candidate families (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, and their 90°/180°/270° rotations for lower/upper tail dependence). Fit each candidate family by MLE; pick the one with lowest AIC. The independence copula $c \equiv 1$ is included as a candidate.
>
> 4. **Compute h-function pseudo-observations:** Using the fitted bivariate copulas from $T_j$, compute $\hat{F}(x_a | \mathbf{x}_D)$ and $\hat{F}(x_b | \mathbf{x}_D)$ via the h-function for each edge. These become the pseudo-observations for $T_{j+1}$.
>
> 5. **Truncation criterion:** If all selected edges in $T_j$ prefer the independence copula, set all higher trees ($T_{j+1}, \ldots$) to independence and stop.
>
> **Complexity:** $O(n^3)$ per tree level for the MST; $O(n^2)$ edges per tree × number of copula families considered ≈ $O(n^2 \times K)$ for $K$ candidate families.
^def-dissmann

### Step 3: Parameter Estimation

> [!definition] Sequential MLE (Aas et al. 2009)
> Given a fixed vine structure and copula families, estimate parameters tree-by-tree:
>
> **Tree 1** ($j=1$, unconditional pairs):
> $$\hat{\boldsymbol{\theta}}_e = \arg\max_{\boldsymbol{\theta}} \sum_{t=1}^T \log c_{a(e),b(e)}\!\left(\hat{u}_{a,t},\, \hat{u}_{b,t};\, \boldsymbol{\theta}\right) \quad \forall\, e \in E_1$$
>
> **Tree 2** ($j=2$, conditional pairs): Use the h-function with $\hat{\boldsymbol{\theta}}_e$ from Tree 1 to form pseudo-observations $\hat{v}_{a,t} = h(\hat{u}_{a,t} | \hat{u}_{b,t}; \hat{\boldsymbol{\theta}}_{e_1})$ for each edge $e_1$ in $T_1$. Then maximise the bivariate copula likelihood for each $T_2$ edge using these pseudo-observations.
>
> **Recursion:** Continue up the vine, using h-functions from the previous tree to generate pseudo-observations for the current tree.
>
> **Properties:** Computationally fast (one optimisation per edge). **Consistent** and **asymptotically normal** (Joe 2005), but **not fully efficient**: ignores cross-tree parameter dependencies. Useful as starting values for full MLE.
^def-sequential-mle

> [!definition] Full MLE
> Maximise the complete vine log-likelihood jointly over all parameters:
>
> $$\hat{\boldsymbol{\theta}}_{\text{full}} = \arg\max_{\boldsymbol{\theta}} \sum_{t=1}^T \log f\!\left(x_{1,t},\ldots,x_{n,t};\, \boldsymbol{\theta}\right)$$
>
> where $f$ is the vine density from [[Pair Copula Construction and Regular Vines]]. For $n$ large, the log-likelihood is a product of pair-copula densities evaluated at h-function transforms of the data, computed recursively.
>
> **Properties:** **Asymptotically efficient** (achieves Cramér-Rao bound under correct specification). Computationally expensive for large $n$: the full gradient requires differentiating through recursive h-function evaluations. In practice, sequential MLE is used as initialisation and full MLE is run from there. For $n > 20$, full MLE is often skipped in favour of sequential.
^def-full-mle

### Goodness of Fit and Diagnostics

> [!definition] Model diagnostics for vine copulas
> After fitting, standard diagnostics include:
>
> - **Rosenblatt probability-integral transform (PIT):** Apply the vine's conditional CDFs recursively to transform the data to an iid Uniform$(0,1)^n$ sample. Kolmogorov-Smirnov or Anderson-Darling tests on each component check marginal calibration; scatter plots of pairs check for remaining dependence.
> - **Pair-copula diagnostics:** For each edge, plot the Kendall's $\tau$ implied by the fitted bivariate copula vs. the empirical $\tau$ from the pseudo-observations. Systematic discrepancies reveal mis-specified families.
> - **Test of simplifying assumption:** Regress the pseudo-observations' empirical Kendall's $\tau$ on the conditioning values. Non-constant $\tau$ suggests the simplifying assumption fails at that edge (Acar et al. 2012).
> - **Likelihood ratio / AIC:** Compare vine models of different structures or different bivariate family choices via standard information criteria.
^def-diagnostics

### Software: VineCopula R Package

> [!definition] VineCopula R package (Schepsmeier et al.)
> The `VineCopula` package is the standard implementation of vine copulas in R:
>
> ```r
> library(VineCopula)
>
> # Step 1: Compute pseudo-observations (non-parametric marginals)
> u <- pobs(data)           # empirical CDFs, (n_obs × n_vars) matrix
>
> # Step 2: Select structure and families (Dissmann algorithm)
> RVM <- RVineStructureSelect(
>   data = u,
>   familyset = NA,         # NA = all families; or e.g. c(1,3,4) for Gauss/Clayton/Gumbel
>   type = 0,               # 0 = R-vine; 1 = C-vine; 2 = D-vine
>   selectioncrit = "AIC",
>   indeptest = TRUE,       # test each pair for independence; set to independence copula if not rejected
>   level = 0.05
> )
>
> # Step 3: Estimate parameters (sequential MLE)
> RVM <- RVineMLE(data = u, RVM = RVM)
>
> # Simulation
> sim <- RVineSim(N = 1000, RVM = RVM)
>
> # Goodness of fit
> gof <- RVineGofTest(data = u, RVM = RVM, method = "Rosenblatt")
> ```
>
> **Key objects:** `RVineMatrix` stores the vine structure as an upper-triangular matrix. Row $i$, column $j$ (with $i < j$) gives the conditioning variable for the pair at level $i$, column $j$.
>
> **Related packages:**
> - `CDVine`: older package for C- and D-vines only (superseded by `VineCopula`).
> - `rvinecopulib` (Nagler & Vatter): C++ backend via `vinecopulib`, faster for large $n$.
> - `pyvinecopulib`: Python bindings for `vinecopulib`.
^def-software

## Examples

> [!example] Sequential MLE on a 4-variable vine
> **Data:** $n=4$ variables, $T=500$ observations. Pseudo-observations $\hat{\mathbf{u}} \in (0,1)^{4}$ from empirical CDFs.
>
> **Tree 1:** Compute all $\binom{4}{2} = 6$ pairwise $|\hat{\tau}|$ values. Maximum spanning tree selects 3 edges — e.g. $(1,2), (2,3), (3,4)$ (a D-vine path if the ordering 1-2-3-4 has the highest total $|\tau|$).
>
> **Family selection $T_1$:** For edge $(1,2)$ — AIC selects Clayton ($\hat{\theta} = 1.8$, lower tail dependence). For $(2,3)$ — AIC selects Gaussian ($\hat{\rho} = 0.45$). For $(3,4)$ — AIC selects Gumbel ($\hat{\theta} = 1.6$, upper tail dependence).
>
> **h-function pseudo-observations for $T_2$:**
> - $\hat{v}_{1,t} = h(\hat{u}_{1,t} | \hat{u}_{2,t}; \text{Clayton}(1.8))$ — conditional CDF of $X_1$ given $X_2$.
> - $\hat{v}_{3|2,t} = h(\hat{u}_{3,t} | \hat{u}_{2,t}; \text{Gaussian}(0.45))$, etc.
>
> **Tree 2:** MST on pseudo-obs selects $(1,3|2)$ and $(2,4|3)$ — families Gaussian and $t(0.3, 6)$.
>
> **Tree 3:** Pseudo-obs from $T_2$ yield edge $(1,4|2,3)$ — selected family: independence (AIC rejects all dependence). Vine truncated at level 2.
>
> **Result:** A truncated D-vine with 5 active pair-copulas (3 in $T_1$, 2 in $T_2$, 0 in $T_3$). Full log-likelihood evaluation: $\sum_{t} [\log c_{12} + \log c_{23} + \log c_{34} + \log c_{13|2} + \log c_{24|3}]$ evaluated at appropriate h-function transforms of the data.

## Connections

- [[Vine Copulas - Overview]] — motivation; comparison with factor copulas (SMM-estimated, no closed-form density).
- [[Pair Copula Construction and Regular Vines]] — the density factorization that makes sequential MLE tractable.
- [[C-vines and D-vines]] — the h-function defined there is the workhorse for sequential pseudo-observation generation here.
- [[SMM Estimation of Factor Copulas]] — the competing estimation approach: factor copulas have no density, so SMM (matching simulated rank correlations and quantile dependences) replaces MLE. Vine copulas avoid this by having an explicit density.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used both as the MST edge weight in structure selection and as a post-fit diagnostic.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — the S&P 100 application uses AR(1)-GJR-GARCH marginals before copula estimation; vine copulas would face the same marginal pre-processing, but the 4950 pair-copulas needed make them infeasible at $n=100$.

## See Also

- [[../_Index|Dependence Modeling]]
