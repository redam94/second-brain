---
title: "Synthetic Control Extensions"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - topic/synthetic-control
  - type/concept
  - doc/paper
source: "[[raw/Abadie 2021 - Using Synthetic Controls.pdf]]"
source_location: "Abadie (2021), Section 8, pp. 415–422"
date_ingested: 2026-04-10
date_updated: 2026-08-03
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Synthetic Control]]"
  - "[[Synthetic Control Bias Theory]]"
  - "[[Synthetic Control Inference and Diagnostics]]"
used_by:
  - "[[Differences-in-Differences]]"
  - "[[Generalized Synthetic Control Method]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - The Common Structure of Doubly-Robust Estimators]]"
aliases:
  - "Abadie L'Hour synthetic control"
  - "penalized synthetic control"
  - "matrix completion synthetic control"
---

# Synthetic Control Extensions

> [!summary]
> Section 8 of Abadie (2021) surveys recent extensions to the canonical synthetic control estimator. The most practically important is the **penalized synthetic control** (Abadie and L'Hour 2019) for multiple treated units, which ensures unique and sparse weights while controlling interpolation biases. Other extensions include bias-corrected estimators, regression-based methods that allow extrapolation (Doudchenko and Imbens 2016), and matrix completion methods (Amjad et al. 2018; Athey et al. 2020) that handle missing data and high-dimensional settings.

## Overview

The canonical synthetic control (one treated unit, convex combination, permutation inference) is well-suited for comparative case studies with a single treated aggregate unit. Recent years have seen substantial methodological development extending the framework to: (i) multiple simultaneously treated units, (ii) settings where the convex hull condition fails, (iii) regression-based generalizations, and (iv) matrix completion methods for high-dimensional panel data.

## Multiple Treated Units: Penalized Synthetic Control

When $I > 1$ units are treated simultaneously, fitting a separate synthetic control for each treated unit is straightforward but creates new challenges: the minimizer of the weight optimization may not be unique (especially when $k$ is moderate), and each treated unit may be matched to donors that are far away in the predictor space.

> [!definition] Definition: Penalized Synthetic Control Estimator (Abadie and L'Hour 2019, Eq. 13)
> With $I$ treated units ($j = 1, \ldots, I$) and $J$ untreated units ($j = I+1, \ldots, I+J$), the penalized synthetic control minimizes for each treated unit $i$:
> $$
> \|\mathbf{X}_i - \mathbf{X}_0 \mathbf{W}\|^2 + \lambda \sum_{j=I+1}^{I+J} w_j \|\mathbf{X}_i - \mathbf{X}_j\|^2
> $$
> subject to weights nonneg. and summing to 1.
>
> The **first term** is the aggregate discrepancy between the treated unit and its synthetic control.
> The **second term** penalizes the **pairwise matching discrepancy** — the distance between the treated unit and each donor weighted by that donor's contribution.
>
> As $\lambda \to \infty$: converges to one-to-one matching (nearest neighbor)
> As $\lambda \to 0$: reduces to the unpenalized synthetic control
^def-penalized-sc

> [!theorem] Theorem: Uniqueness and Sparsity (Abadie and L'Hour 2019)
> If $\lambda > 0$ and the columns of $\mathbf{X}_0$ are in general quadratic position, the minimizer of the penalized objective is **unique and sparse** — resolving the non-uniqueness problem that arises with multiple treated units in the canonical formulation.
^thm-penalized-uniqueness

The treatment effect for each treated unit $i$ at $t > T_0$ is:
$$
\hat{\tau}_{it} = Y_{it} - \sum_{j=I+1}^{I+J} w_{ij}^* Y_{jt}
$$

And the average treatment effect across treated units:
$$
\hat{\tau}_t = \frac{1}{I}\sum_{i=1}^I \hat{\tau}_{it}
$$

**Cross-validation** techniques in Abadie and L'Hour (2019) select the penalty parameter $\lambda$.

## Bias-Corrected Synthetic Control

When the synthetic control cannot perfectly reproduce the treated unit's predictor values (large $\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}^*$), regression adjustments can attenuate the resulting bias.

> [!definition] Definition: Bias-Corrected Synthetic Control (Ben-Michael et al. 2020, Eq. 15–16)
> Let $\hat{\mu}_{0t}(\cdot)$ be a (parametric or nonparametric) regression of untreated outcomes $Y_{I+1,t}, \ldots, Y_{I+J,t}$ on predictor values for the untreated units. The bias-corrected estimator is:
> $$
> \hat{\tau}_{it} = \left(Y_{it} - \hat{\mu}_{0t}(\mathbf{X}_i)\right) - \sum_{j=I+1}^{I+J} w_{ij}^*\left(Y_{jt} - \hat{\mu}_{0t}(\mathbf{X}_j)\right)
> $$
>
> Equivalently: the standard synthetic control estimator applied to **regression residuals** rather than raw outcomes.
^def-bias-corrected-sc

This is closely related to the **augmented synthetic control** (Ben-Michael, Feller, and Rothstein 2020) and connects to the doubly-robust approach in [[Local Average Treatment Effects]] and causal inference more broadly. The bias correction is most valuable when the treated unit falls outside the convex hull of the donor pool.

## Regression-Based Methods and Extrapolation

Doudchenko and Imbens (2016) generalize synthetic controls by relaxing the convex combination constraint, allowing extrapolation:

> [!definition] Definition: Elastic Net Synthetic Control (Doudchenko and Imbens 2016, Eq. 17–18)
> Minimize over $(\alpha, w_2, \ldots, w_{J+1}) \in \mathbb{R}^{J+1}$:
> $$
> \sum_{t=1}^{T_0}\left(Y_{1t} - \alpha - \sum_{j=2}^{J+1} w_j Y_{jt}\right)^2 + \lambda_1\left(\frac{1-\lambda_2}{2}\sum_{j=2}^{J+1}w_j^2 + \lambda_2\sum_{j=2}^{J+1}|w_j|\right)
> $$
> where $\lambda_1 \geq 0$, $0 \leq \lambda_2 \leq 1$ are regularization parameters.
>
> The **intercept $\alpha$** allows a constant shift between $\mathbf{X}_1$ and $\mathbf{X}_0$, handling cases where the treated unit's level of the outcome differs from any convex combination of donor units.
>
> Parameters selected by cross-validation.
^def-elastic-net-sc

The counterfactual estimate is $\hat{Y}_{1t}^N = \hat{\alpha} + \sum_{j=2}^{J+1}\hat{w}_j Y_{jt}$.

**Trade-off with canonical SC**:
- Elastic net allows extrapolation → useful when convex hull condition fails
- But: allowing negative weights makes the counterfactual less interpretable and may hide interpolation biases
- Canonical SC's non-negativity constraint makes the counterfactual transparent and limits extrapolation

## Matrix Completion Methods

For panel data with many units and time periods (including settings with missing outcomes), matrix completion methods offer a flexible alternative.

> [!definition] Definition: Matrix Completion for Synthetic Control (Amjad et al. 2018; Athey et al. 2020)
> Model the matrix of untreated potential outcomes $\{Y_{jt}^N\}$ as generated by a **nonlinear factor structure**:
> $$
> Y_{jt}^N = f(\boldsymbol{\mu}_j, \boldsymbol{\lambda}_t) + \varepsilon_{jt}
> $$
> where $f$ is unknown. Assume the matrix $\{M_{jt}\} = \{f(\boldsymbol{\mu}_j, \boldsymbol{\lambda}_t)\}$ is **low-rank**.
>
> Estimate $\{M_{jt}\}$ via matrix completion (e.g., singular value thresholding). Use $\{\hat{M}_{jt}\}$ to:
> 1. Impute missing potential outcomes
> 2. Estimate untreated potential outcomes for treated units in post-intervention periods
> 3. Compute synthetic controls as linear combinations of $\hat{M}_{jt}$ values
^def-matrix-completion-sc

**Extensions**:
- **Amjad et al. (2019)**: incorporates additional covariates $\mathbf{Z}_j$ alongside outcomes
- **Athey et al. (2020)**: postulates $Y_{jt}^N = M_{jt} + \varepsilon_{jt}$ with low-rank $\{M_{jt}\}$; handles missing entries via matrix estimation; naturally accommodates multiple treated units in post-intervention periods

**Advantage over canonical SC**: Handles settings with many units and time periods, including high-dimensional micro-data panels. Does not require the treated unit to be an aggregate entity.

**Limitation**: The low-rank assumption is less transparent than the linear factor model; model validity is harder to assess.

## Inference Extensions

**Hahn and Shi (2017)**: Propose applying the end-of-sample instability test (Andrews 2003) as an inferential procedure for synthetic controls with stationary data and large $T_0$. Related to the backdating diagnostic.

**Chernozhukov, Wüthrich, and Zhu (2019a, 2019b)**: Devise a sampling-based inferential procedure using permutations of regression residuals in the time dimension. Provides valid inference without the linear factor model assumption. Propose bias-corrected synthetic control with confidence intervals centered on the K-fold cross-fitted estimate.

**Cattaneo, Feng, and Titiunik (2021)**: Predictive intervals for $\hat{\tau}_{it}$ that take into account both estimation uncertainty in the untreated potential outcome model and irreducible uncertainty from the unobserved random error $u_t$.

## Connections

- **[[Synthetic Control Bias Theory]]**: The penalized estimator addresses the non-uniqueness that arises in the canonical estimator when $k$ is large
- **[[Differences-in-Differences]]**: Elastic net and matrix completion methods blur the boundary between DiD (regression on panel data) and synthetic control (matching on pre-treatment trajectory)
- **[[Nonparametric Causal Inference]]**: Matrix completion via BART offers a related approach to panel counterfactual estimation from the Bayesian nonparametric perspective
- **[[Bayesian Difference in Differences]]**: PyMC implementation of Bayesian counterfactual inference for aggregate time-series; complementary to synthetic control for the same setting

## Generalized Synthetic Control (Xu 2017)

The [[Generalized Synthetic Control Method]] (GSC) is the primary practical recommendation for multiple treated units. It directly estimates the [[Synthetic Control Bias Theory#^def-linear-factor-model|linear factor model]] on control group data, then projects treated units' pre-treatment outcomes onto the estimated factor space. Unlike the penalized SC above, GSC:
- Produces frequentist SEs and CIs via parametric bootstrap (not permutation inference)
- Selects the number of factors via built-in cross-validation
- Is implemented in the `gsynth` R package

See [[Generalized Synthetic Control Method]] for the full treatment.

## See Also

- [[Synthetic Control]] — the canonical estimator
- [[Generalized Synthetic Control Method]] — the primary extension for multiple treated units (Xu 2017)
- [[Synthetic Control Bias Theory]] — the formal theory motivating the penalized estimator
- [[Synthetic Control Inference and Diagnostics]] — permutation inference, generalized to multiple units
- [[Differences-in-Differences]] — panel regression methods that matrix completion bridges to
- [[Abadie 2021 - Overview]] — full paper overview
- [[The Selection Problem]] — the fundamental challenge that synthetic control (and these extensions) addresses by constructing a credible counterfactual
