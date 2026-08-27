---
title: "Sequential Estimation for Vine Copulas"
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - method/r-vinecopula
  - doc/paper
source: "[[raw/Aas-et-al-2009-Vine-Copula-Survey.md]]"
source_location: "Aas et al. (2009) §3, pp. 190–193"
date_ingested: 2026-08-27
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Pair Copula Construction]]"
  - "[[C-Vine and D-Vine Structures]]"
used_by: []
aliases:
  - Vine copula MLE
  - h-function vine
  - Sequential vine estimation
---

# Sequential Estimation for Vine Copulas

> [!summary]
> Aas et al. (2009) provide a sequential MLE procedure for vine copulas: fit each tree level by maximum likelihood, transform pseudo-observations using the **h-function** (conditional CDF), and pass them to the next tree. This avoids joint MLE over all $\binom{n}{2}$ copulas simultaneously, at some efficiency loss. The h-function $h(u|v,\boldsymbol{\theta}) = \partial C(u,v;\boldsymbol{\theta})/\partial v$ is analytically available for all major parametric copula families. An inverse h-function enables fast vine copula simulation.

## Overview

The vine density factorization [[Pair Copula Construction]]^thm-rvine-density contains $\binom{n}{2}$ pair copulas. In principle one can maximize the joint log-likelihood over all parameters simultaneously (joint MLE). In practice this is:
- High-dimensional (many parameters, complex landscape).
- Slow when the vine structure is also being selected.

Aas et al. (2009) instead use a **sequential (tree-by-tree) MLE** that exploits the vine's hierarchical structure: fit $T_1$, transform, fit $T_2$, transform, etc. The transformation step uses the **h-function**.

## Main Content

### The h-function

> [!definition] h-function (conditional CDF)
> For a bivariate copula $C(u,v;\boldsymbol{\theta})$ with density $c$, define:
>
> $$h(u \mid v, \boldsymbol{\theta}) \;=\; P(U_1 \leq u \mid U_2 = v) \;=\; \frac{\partial C(u,v;\boldsymbol{\theta})}{\partial v}$$
>
> This is the conditional CDF of $U_1$ given $U_2 = v$. It maps the pair $(u,v) \in [0,1]^2$ to $[0,1]$ and is used to compute transformed pseudo-observations at each tree level.
^def-hfunc

**Closed-form h-functions for common copulas:**

| Copula | Parameters | $h(u \mid v, \boldsymbol{\theta})$ |
|---|---|---|
| Gaussian | $\rho \in (-1,1)$ | $\Phi\!\left(\dfrac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
| Student $t$ | $\rho, \nu$ | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{(1-\rho^2)(\nu + (t_\nu^{-1}(v))^2)/(\nu+1)}}\right)$ |
| Clayton | $\theta > 0$ | $v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1-1/\theta}$ |
| Gumbel | $\theta \geq 1$ | $\dfrac{C(u,v;\theta)}{v}\cdot\dfrac{(-\ln v)^{\theta-1}}{(-\ln u)^\theta + (-\ln v)^\theta)^{1-1/\theta} \cdot (-\ln C)}$ |
| Frank | $\theta \neq 0$ | $\dfrac{e^{-\theta v}(e^{-\theta u}-1)}{(e^{-\theta u}-1)(e^{-\theta v}-1)+(e^{-\theta}-1)}$ |

The **inverse h-function** $h^{-1}(p|v,\boldsymbol{\theta})$ is the value of $u$ satisfying $h(u|v,\boldsymbol{\theta}) = p$. For Gaussian and $t$ copulas it is analytic; for Archimedean copulas a one-dimensional numerical root-finding is needed.

### Sequential estimation algorithm

> [!definition] Sequential MLE for a D-vine (Algorithm 1, Aas et al. 2009)
>
> **Input:** Observed pseudo-observations $\hat{u}_{it} = \hat{F}_i(x_{it})$ for $i=1,\ldots,n$; $t=1,\ldots,T$.
>
> **Step 0 (Marginals):** Fit marginal CDFs $\hat{F}_i$ (parametrically or empirically); compute $\hat{u}_{it}$.
>
> **Step 1 (Tree $T_1$):** For each adjacent pair $(i, i+1)$, $i=1,\ldots,n-1$:
> 1. Select copula family $c_{i,i+1}$ by AIC over a library of bivariate copulas.
> 2. Estimate $\hat{\boldsymbol{\theta}}_{i,i+1}$ by MLE on $(\hat{u}_{it}, \hat{u}_{i+1,t})_{t=1}^T$.
> 3. Compute transformed observations: $\hat{v}_{i+1|i,t} = h(\hat{u}_{i+1,t} | \hat{u}_{i,t}, \hat{\boldsymbol{\theta}}_{i,i+1})$.
>
> **Step 2 (Tree $T_2$):** For each pair two steps apart, conditioned on middle:
> - Use $(\hat{v}_{i|i+1}, \hat{v}_{i+2|i+1})$ as inputs.
> - Select, estimate, and compute further $\hat{v}$ transformations.
>
> **Step $k$ (Tree $T_k$):** Use the transformed observations from Step $k-1$ as inputs to fit conditional pair copulas $c_{i,i+k|i+1,\ldots,i+k-1}$.
>
> **Output:** $\binom{n}{2}$ fitted copula families and parameters.
^alg-sequential-mle

For a **C-vine** rooted at variable 1, the tree structure changes but the principle is identical: $T_1$ fits pairs $(1, j)$ for $j=2,\ldots,n$; transforms are $h(\hat{u}_j | \hat{u}_1, \hat{\boldsymbol{\theta}}_{1j})$; $T_2$ fits $(2, j|1)$ using these transforms.

### Copula family selection

At each edge, family selection is by:
- **AIC** (standard): $\text{AIC} = -2\ell + 2k$ where $\ell$ is the maximized log-likelihood and $k$ the number of parameters. Choose the family minimizing AIC.
- Candidate families: Gaussian, $t$, Clayton, Gumbel, Frank, Joe, BB1, BB7, and their survival/rotation variants (e.g., 90°-rotated Clayton captures upper tail dependence).

> [!example] Copula family selection for tail asymmetry
> Suppose pair $(X_1, X_2)$ exhibits strong lower tail dependence (co-crashes) but near-independence in the upper tail. The AIC selects a Clayton copula (or rotated Gumbel at 180°) rather than Gaussian or $t$ — these would impose symmetric tail dependence. The vine framework enables such asymmetric choices independently at every edge, a key advantage over the factor copula (which requires global distributional assumptions on the factor).

### Simulation

Simulation from a fitted vine reverses the h-function recursion:

> [!definition] Vine simulation algorithm (D-vine)
>
> 1. Draw $w_1, w_2, \ldots, w_n \overset{\text{iid}}{\sim} \text{Uniform}(0,1)$.
> 2. Set $u_1 = w_1$, $v_{2|1} = w_2$.
> 3. Compute $u_2 = h^{-1}(v_{2|1} | u_1, \hat{\boldsymbol{\theta}}_{12})$.
> 4. For each subsequent variable, apply the inverse h-function recursion backwards through the tree levels.
> 5. The output $(u_1, \ldots, u_n)$ are uniform marginals on the fitted vine copula; transform by $\hat{F}_i^{-1}$ to recover $(x_1, \ldots, x_n)$.
^alg-simulation

### Efficiency: sequential vs. joint MLE

The sequential estimator is **consistent** under standard regularity conditions. It is not fully efficient (joint MLE is more efficient), but the loss is typically small. Joe (2014) shows the sequential estimator is asymptotically normal with a sandwich-type covariance estimator for inference.

### Vine copula software

- **R:** `VineCopula` package (Nagler, Schepsmeier, Stöber et al.) — full R-vine, C-vine, D-vine; automatic structure selection (Dissmann et al. 2013), family selection, simulation, density evaluation.
- **Python:** `pyvinecopulib` — same functionality; C++ backend for speed.
- Both packages implement: `RVineStructureSelect()` / `vinecop()` for automated fitting; `RVineSim()` / `rvine.simulate()` for simulation; conditional density and CDF evaluation.

## Connections

- [[Pair Copula Construction]]^def-h-function — definition of the h-function in the density context.
- [[C-Vine and D-Vine Structures]] — the tree structures that determine which pairs are fitted at each step.
- [[Vine Copulas - Overview]] — overview and comparison with factor copulas.
- [[SMM Estimation of Factor Copulas]] — contrast: factor copulas need SMM because there is no closed-form likelihood; vine copulas allow sequential MLE.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used in structure selection (Dissmann algorithm).

## See Also

- [[../_Index|Econometrics]]
