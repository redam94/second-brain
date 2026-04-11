---
title: "SMM Copula Specification Testing"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - topic/copulas
  - type/theorem
  - doc/paper
source: "[[raw/Oh_Patton_SMM_copulas_nov11.pdf]]"
source_location: "Oh & Patton (2011), Section 2.5, pp. 13-14"
date_ingested: 2026-04-11
folder: "Econometrics/Extensions/Copula SMM"
doc_type: paper
depends_on:
  - "[[SMM Copula Asymptotic Theory]]"
  - "[[SMM Estimator for Copulas]]"
used_by:
  - "[[SMM Copula Simulation and Application]]"
aliases:
  - J-Test for Copulas
  - Over-Identifying Restrictions Test (Copula)
  - SMM Copula Goodness-of-Fit
---

# SMM Copula Specification Testing

> [!summary]
> When the number of moment conditions ($m$) exceeds the number of copula parameters ($p$), the over-identifying restrictions can be tested via a J-test statistic (Proposition 4). With the efficient weight matrix $\hat{\mathbf{W}}_T = \hat{\boldsymbol{\Sigma}}_{T,B}^{-1}$, this statistic has a standard $\chi^2_{m-p}$ limiting distribution. With any other weight matrix, the limiting distribution is non-standard but can be simulated easily. This test provides a simple goodness-of-fit check for the copula specification.

## Overview

In the [[SMM Estimator for Copulas|Oh-Patton framework]], the researcher typically uses $m = 5$ dependence measures (Spearman's rank correlation + 4 quantile dependence measures) to estimate $p$ copula parameters. When $m > p$, the model is **over-identified** and the remaining $m - p$ restrictions can be tested — a poor fit indicates the copula model cannot simultaneously match all the targeted dependence features.

## Proposition 4: Over-Identifying Restrictions Test

> [!theorem] Theorem: Over-Identifying Restrictions Test (Oh & Patton, Proposition 4)
> **Suppose that all assumptions of Proposition 2 are satisfied** and that the number of moments $m$ is greater than the number of copula parameters $p$. Then the test statistic:
> $$J_{T,S} \equiv \min(T,S) \, \mathbf{g}_{T,S}(\hat{\boldsymbol{\theta}}_{T,S})' \hat{\mathbf{W}}_T \mathbf{g}_{T,S}(\hat{\boldsymbol{\theta}}_{T,S})$$
>
> has the limiting distribution:
> $$J_{T,S} \xrightarrow{d} \mathbf{u}' \mathbf{A}_0' \mathbf{A}_0 \mathbf{u} \quad \text{as } T, S \to \infty$$
>
> where $\mathbf{u} \sim N(\mathbf{0}, \mathbf{I})$ and:
> $$\mathbf{A}_0 = \mathbf{W}_0^{1/2} \boldsymbol{\Sigma}_0^{1/2} \mathbf{R}_0$$
> $$\mathbf{R}_0 = \mathbf{I} - \boldsymbol{\Sigma}_0^{-1/2} \mathbf{G}_0 (\mathbf{G}_0' \mathbf{W}_0 \mathbf{G}_0)^{-1} \mathbf{G}_0' \mathbf{W}_0 \boldsymbol{\Sigma}_0^{1/2}$$
>
> **Special case — efficient weight matrix:** If $\hat{\mathbf{W}}_T = \hat{\boldsymbol{\Sigma}}_{T,B}^{-1}$, then:
> $$J_{T,S} \xrightarrow{d} \chi^2_{m-p} \quad \text{as usual}$$
>
> **General case — identity or other weight matrix:** If $\hat{\mathbf{W}}_T \neq \hat{\boldsymbol{\Sigma}}_{T,B}^{-1}$, the test statistic has a **non-standard** limiting distribution that depends on the sample-specific matrix $\hat{\mathbf{R}}$.
^prop-4-j-test

## Simulating Critical Values

When the efficient weight matrix is not used (e.g., when using the identity matrix $\hat{\mathbf{W}}_T = \mathbf{I}$), critical values are obtained via simulation:

> [!example] Example: Simulating Critical Values for the J-Test
> **Procedure:**
> 1. Compute $\hat{\mathbf{R}}$ using $\hat{\mathbf{G}}_{T,S}$, $\hat{\mathbf{W}}_T$, and $\hat{\boldsymbol{\Sigma}}_{T,B}$
> 2. Simulate $\mathbf{u}^{(k)} \sim iid \; N(\mathbf{0}, \mathbf{I})$ for $k = 1, 2, \ldots, K$ (with $K$ large)
> 3. For each simulation, compute: $J_{T,S}^{(k)} = \mathbf{u}^{(k)\prime} \hat{\mathbf{R}}' \hat{\boldsymbol{\Sigma}}_{T,B}^{1/2\prime} \hat{\mathbf{W}}_T \hat{\boldsymbol{\Sigma}}_{T,B}^{1/2} \hat{\mathbf{R}} \mathbf{u}^{(k)}$
> 4. The sample $(1 - \alpha)$ quantile of $\{J_{T,S}^{(k)}\}_{k=1}^K$ is the critical value
>
> **Key advantages:**
> - $\mathbf{u}^{(k)}$ is a simple standard normal — no optimization is required
> - $\hat{\mathbf{R}}$ need only be computed once
> - The procedure is fast even for $K = 10{,}000$
>
> Oh and Patton use $K = 10{,}000$ in their application.
^example-critical-values

## Practical Considerations

### Choosing $\hat{\mathbf{W}}_T$

| Weight Matrix | J-Test Distribution | Advantage | Disadvantage |
|---------------|-------------------|-----------|--------------|
| $\hat{\boldsymbol{\Sigma}}_{T,B}^{-1}$ (efficient) | $\chi^2_{m-p}$ | Standard critical values | Requires inverting estimated covariance; may be unstable |
| $\mathbf{I}$ (identity) | Non-standard | Simple; numerically stable | Requires simulated critical values |

Oh and Patton use the identity weight matrix in their main results, noting that "corresponding results based on the efficient weight matrix are comparable."

### Dependence of Critical Values on $\hat{\mathbf{G}}_{T,S}$

When using the identity weight matrix, the limiting distribution depends on $\hat{\mathbf{G}}_{T,S}$, which in turn depends on the step size $\varepsilon_{T,S}$. However, the Monte Carlo study in [[SMM Copula Simulation and Application]] shows that rejection rates are close to nominal (95%) across all three copula models and all step sizes tested.

## Connections

- Uses asymptotic results from [[SMM Copula Asymptotic Theory]] (Propositions 1-3)
- Applied in [[SMM Copula Simulation and Application]] to test Clayton, Normal, and factor copula models
- Analogous to the standard J-test in GMM — see [[Standard Errors and Clustering]]
- Extends [[SMM Estimator for Copulas]] from estimation to model evaluation

## See Also

- [[SMM Copula Asymptotic Theory]] — underlying asymptotic results
- [[SMM Copula Simulation and Application]] — Monte Carlo and empirical test results
- [[SMM Estimator for Copulas]] — the estimator being tested

## Sources

- [[raw/Oh_Patton_SMM_copulas_nov11.pdf]] — Oh & Patton (2011), Section 2.5
