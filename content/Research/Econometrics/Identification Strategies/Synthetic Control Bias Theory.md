---
title: "Synthetic Control Bias Theory"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - topic/synthetic-control
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Abadie 2021 - Using Synthetic Controls.pdf]]"
source_location: "Abadie (2021), Sections 3.1–3.4, pp. 394–403"
date_ingested: 2026-04-10
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Synthetic Control]]"
  - "[[Differences-in-Differences]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Synthetic Control Inference and Diagnostics]]"
  - "[[Synthetic Control Requirements]]"
  - "[[Synthetic Control Extensions]]"
aliases:
  - "linear factor model synthetic control"
  - "synthetic control bias bound"
---

# Synthetic Control Bias Theory

> [!summary]
> The formal justification for synthetic controls rests on the **linear factor model** — a generalization of difference-in-differences that allows unobserved confounders to have time-varying loadings. Under this model, Abadie, Diamond, and Hainmueller (2010) derive a **bias bound**: the bias of the synthetic control estimator is inversely proportional to the number of pre-treatment periods $T_0$, provided the synthetic control closely tracks the treated unit's pre-treatment trajectory. Variable selection (via the V matrix and cross-validation) is the mechanism that enforces this fit.

## Overview

The basic synthetic control estimator in [[Synthetic Control]] is intuitive — find a weighted combination of donor units that matches the treated unit before the intervention, then attribute post-treatment divergence to the treatment. But *why* is this a valid identification strategy? The answer is the linear factor model.

The key insight: a synthetic control that reproduces the treated unit's pre-treatment outcomes implicitly matches on the **unobserved common factors** $\mu_j$ — exactly those confounders that would bias a regression estimator. The more pre-treatment periods available, the more constraints the matching imposes, and the better the identification.

## The Linear Factor Model

> [!definition] Definition: Linear Factor Model (Abadie et al. 2010, Eq. 10)
> The potential outcome without treatment for unit $j$ at time $t$ follows:
> $$Y_{jt}^N = \delta_t + \boldsymbol{\theta}_t \mathbf{Z}_j + \boldsymbol{\lambda}_t \boldsymbol{\mu}_j + \varepsilon_{jt}$$
> where:
> - $\delta_t$ = common time trend (constant factor loading)
> - $\mathbf{Z}_j$ = observed covariates (time-invariant or unaffected by treatment), with time-varying coefficients $\boldsymbol{\theta}_t$
> - $\boldsymbol{\mu}_j$ = vector of **unobserved** unit-specific factors
> - $\boldsymbol{\lambda}_t$ = vector of **time-varying** factor loadings (common factors)
> - $\varepsilon_{jt}$ = zero-mean idiosyncratic shocks
^def-linear-factor-model

This model generalizes the standard panel data fixed-effects model. The difference-in-differences / fixed-effects restriction $\lambda_t = \lambda$ (constant over time) is obtained by restricting $\boldsymbol{\lambda}_t$ to be time-invariant. The linear factor model allows $\boldsymbol{\lambda}_t$ to change over time, so the "parallel trends" assumption of DiD is a special case.

> [!note] Connection to DiD
> DiD assumes $\boldsymbol{\lambda}_t = \boldsymbol{\lambda}$ (constant factor loadings), so unobserved confounders affect all units equally across time. The linear factor model relaxes this: each unit $j$ has its own loading $\boldsymbol{\mu}_j$ on common factors $\boldsymbol{\lambda}_t$ that may drift over time. Synthetic control handles this by matching on the trajectory, not just the level.

## The Bias Bound

> [!theorem] Theorem: Bias Bound for Synthetic Controls (Abadie, Diamond, and Hainmueller 2010)
> Under the linear factor model, suppose a synthetic control with weights $W^* = (w_2^*, \ldots, w_{J+1}^*)'$ reproduces the characteristics of the treated unit:
> $$\mathbf{X}_1 \approx \mathbf{X}_0 \mathbf{W}^*$$
> where $\mathbf{X}_1$ and $\mathbf{X}_0$ include pre-intervention outcomes and predictors. Then for $t > T_0$, the bias of $\hat{\tau}_{1t}$ is bounded by a function that is:
> - **Inversely proportional to $T_0$** (the number of pre-treatment periods)
> - **Increasing in $J$** (the size of the donor pool)
> - **Controlled by the quality of fit**: $\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}^*$
>
> **Implication**: A large $T_0$ alone does not guarantee low bias — the synthetic control must also achieve a close pre-treatment fit. Conversely, a close fit with small $T_0$ may still produce substantial bias if the idiosyncratic transitory shocks $\varepsilon_{jt}$ are large.
^thm-bias-bound

**Key practical implications of the bias bound:**
1. **Long pre-treatment windows are valuable.** More pre-treatment periods impose more matching constraints on $\boldsymbol{\mu}_j$.
2. **Imperfect fit is a warning sign.** If $\mathbf{X}_1 \neq \mathbf{X}_0 \mathbf{W}^*$, Abadie, Diamond, and Hainmueller (2010) advise against using synthetic controls.
3. **Large donor pools can increase bias.** A large $J$ gives more flexibility to fit the pre-treatment data but may introduce interpolation biases between the treated unit and distant donor units.

## Sparsity: The Geometry of Synthetic Controls

One of synthetic control's most important properties is **sparsity** — typically, only a small number of donor units receive nonzero weight.

> [!theorem] Theorem: Sparsity of Synthetic Controls (Abadie 2021, Section 3.2)
> When $\mathbf{X}_1$ falls outside the convex hull of the columns of $\mathbf{X}_0$, and the columns of $\mathbf{X}_0$ are in general quadratic position, the synthetic control is **unique** and **sparse** — with the number of nonzero weights bounded by $k$ (the number of predictors in $\mathbf{X}_1$).
>
> **Geometric interpretation**: The synthetic control is the projection of $\mathbf{X}_1$ onto the convex hull of $\mathbf{X}_0$. Since $\mathbf{X}_1$ is typically outside this hull (curse of dimensionality), the projection touches the hull at a face with at most $k$ vertices.
^thm-sparsity

Sparsity is a feature, not a bug:
- **Interpretability**: The synthetic counterfactual is a named weighted average of specific donor units (e.g., 42% Austria + 22% United States + ...)
- **Transparency**: The contribution of each donor unit is explicit, allowing subject-matter evaluation of the counterfactual's plausibility
- **Contrast with regression**: Regression weights are dense (all units contribute), unrestricted (can be negative), and allow extrapolation — obscuring potential biases

## The V Matrix and Variable Selection

The synthetic control optimization (Eq. 7 in Abadie 2021) requires choosing a $k \times k$ positive definite matrix $\mathbf{V} = \text{diag}(v_1, \ldots, v_k)$ that weights the relative importance of each predictor:

$$\min_{\mathbf{W}} \|\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}\| = \left(\sum_{h=1}^k v_h \left(X_{h1} - \sum_{j=2}^{J+1} w_j X_{hj}\right)^2\right)^{1/2}$$

> [!definition] Definition: Cross-Validation for V Matrix Selection
> Split the pre-intervention periods $t = 1, \ldots, T_0$ into a **training period** $t = 1, \ldots, t_0$ and a **validation period** $t = t_0+1, \ldots, T_0$ (with $t_0 = T_0/2$ as a default). Then:
> 1. For each candidate $\mathbf{V}$, compute weights $\tilde{\mathbf{W}}(\mathbf{V})$ using training period data only
> 2. Evaluate the MSPE of the resulting synthetic control on the **validation period**:
> $$\sum_{t=t_0+1}^{T_0}\left(Y_{1t} - w_2(\mathbf{V})Y_{2t} - \cdots - w_{J+1}(\mathbf{V})Y_{J+1,t}\right)^2$$
> 3. Select $\mathbf{V}^*$ that minimizes the validation-period MSPE
> 4. Use $\mathbf{W}^* = \mathbf{W}(\mathbf{V}^*)$ for estimation
^def-v-selection

**Simple alternatives to cross-validation:**
- $v_h = 1/\text{Var}(X_{h1}, \ldots, X_{hJ+1})$: rescale all predictors to unit variance (equivalent to standardizing)
- Equal weights $v_h = 1/k$: appropriate when predictors are on similar scales

> [!warning] Pre-Intervention Outcomes as Predictors
> Including **pre-intervention outcome values** of $Y_{jt}$ in $\mathbf{X}_1$ and $\mathbf{X}_0$ is often the single most important variable selection decision. Pre-treatment outcomes are powerful predictors of post-treatment outcomes (via the factor model), and they are automatically absorbed into $\boldsymbol{\mu}_j$ in the factor model framework. However, including many individual time-period outcomes (rather than summary measures) can lead to overfitting during the training period. Use aggregate summaries (means, subperiod averages) as default.

## Contrast: Synthetic Control vs. Regression

| Property | Synthetic Control | Regression |
|----------|------------------|-----------|
| Weight constraints | $w_j \geq 0$, $\sum w_j = 1$ | Unconstrained |
| Extrapolation | Precluded by convex combination | Allowed (negative weights) |
| Sparsity | Yes (bounded by $k$) | No (dense weights) |
| Fit transparency | Explicit: $\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}^*$ | Hidden: regression forces $\mathbf{X}_0 \mathbf{W}^{reg} = \mathbf{X}_1$ exactly |
| Bias when units dissimilar | Visible in large $\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}^*$ | Hidden by extrapolation |
| Pre-analysis plan | Weights registerable before outcomes observed | Cannot preregister |

The regression estimator forces a perfect fit of the covariates ($\bar{\mathbf{X}}_0 \mathbf{W}^{reg} = \bar{\mathbf{X}}_1$) even when the untreated units are completely dissimilar to the treated unit, allowing extrapolation. Regression weights in table 3 of Abadie (2021) include negative values for four OECD countries in the German reunification example — synthetic control weights in table 2 are all nonnegative.

## See Also

- [[Synthetic Control]] — basic estimator, California Prop 99 example, constrained optimization
- [[Synthetic Control Inference and Diagnostics]] — how bias theory informs the RMSPE test statistic
- [[Synthetic Control Requirements]] — the convex hull condition and contextual requirements derived from this theory
- [[Differences-in-Differences]] — the linear factor model nests DiD as a special case ($\lambda_t = $ constant)
- [[Abadie 2021 - Overview]] — full paper overview
