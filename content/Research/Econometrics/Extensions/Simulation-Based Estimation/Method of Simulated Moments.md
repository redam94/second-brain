---
title: "Method of Simulated Moments"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/tdb136.pdf]]"
source_location: "Liesenfeld & Breitung (1998), Sections 1-3, pp. 1-8"
date_ingested: 2026-04-11
date_updated: 2026-06-22
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: paper
depends_on:
  - "[[Simulation-Based Estimation - Overview]]"
  - "[[Standard Errors and Clustering]]"
used_by:
  - "[[SMM Estimator for Copulas]]"
  - "[[Indirect Inference]]"
  - "[[Practical Issues in Simulation Estimation]]"
  - "[[SMM Weighting Matrix and Inference]]"
  - "[[SMM Python Implementation]]"
  - "[[Q - Using SMM to Calibrate Agent Based Models]]"
  - "[[BLP Demand Estimation - Overview]]"
aliases:
  - MSM
  - SMM
  - Simulated Method of Moments
  - Method of Simulated Moments Estimator
---

# Method of Simulated Moments

> [!summary]
> The Method of Simulated Moments (MSM) is a simulation-based extension of GMM that replaces analytically intractable moment conditions with Monte Carlo approximations. Introduced by McFadden (1989) and Pakes and Pollard (1989), the MSM estimator is consistent for any fixed number of simulations $R \geq 1$ and asymptotically normal with an inflated variance of $(1 + 1/R)$ times the GMM variance. The key advantage is that the model only needs to be simulable, not solvable in closed form.

## Overview

The MSM addresses the fundamental estimation problem: we want to estimate $\theta_0 \in \Theta \subset \mathbb{R}^p$ from data $\{y_t\}_{t=1}^T$, but the moment conditions $\sigma(z_t; \theta) = E_\theta[s(y_t, z_t) | z_t]$ cannot be computed analytically because the conditional density $h(y_t | z_t; \theta)$ is intractable.

The central insight is that even when we cannot *evaluate* $\sigma(z_t; \theta)$, we can often *simulate* from the model $h(y_t | z_t; \theta)$ for any given $\theta$, producing simulated values $y_t^{(r)}(\theta)$ that can substitute for the analytical moments.

## General Setup

Let $y_t \in \mathbb{R}^n$ ($t = 1, \ldots, T$) be observable dependent variables and $z_t = [y_{t-1}', \ldots, y_1', y_0, x_t', \ldots, x_1']'$ be the vector of conditioning variables. The model is characterized by:

$$
h_0(y_t | z_t) = h(y_t | z_t; \theta_0)
$$

where $\theta_0$ is the true $p$-dimensional parameter vector.

> [!definition] Definition: Moment Function
> The $m$-dimensional moment function of the MSM is:
> $$
> \varphi(y_t, z_t; \theta) = s(y_t, z_t) - \sigma(z_t; \theta)
> $$
> where $s(y_t, z_t)$ is a function of the data and $\sigma(z_t; \theta) = E_\theta[s(y_t, z_t) | z_t]$ is the theoretical counterpart. We require $m \geq p$ for identification.
>
> The population moment condition is:
> $$
> E[\varphi(y_t, z_t; \theta_0) | z_t] = 0 \quad \text{for all } t
> $$
^def-moment-function

## Conditional vs. Unconditional Moments

### Conditional Moments (Dynamic Models with Reduced Form)

When the model admits a well-defined **reduced form** $y_t = \varrho(z_t, \varepsilon_t; \theta)$ — where $\varepsilon_t$ is independent of $z_t$ with known distribution — conditional simulations are possible:

1. Draw $\varepsilon_t^{(r)}$ from the known distribution of $\varepsilon_t$
2. Compute $y_t^{(r)}(\theta) = \varrho(z_t, \varepsilon_t^{(r)}; \theta)$ for observed $z_t$

These are **conditional simulations**: simulated values of $y_t$ given the *observed* conditioning variables.

### Unconditional Moments (Models without Reduced Form)

For models with unobservable variables entering nonlinearly (e.g., the SV model), a reduced form in terms of lagged endogenous variables is generally unavailable. In such cases, use **path simulations**:

1. Generate entire simulated paths $y_1^{(r)}(\theta), \ldots, y_T^{(r)}(\theta)$ by recursion
2. Use unconditional moment restrictions $E[f(y_t, z_t; \theta_0)] = 0$

These include moments like $E[|y_t|]$, $E[y_t^2]$, and cross-order moments $E[y_t y_{t-l}']$.

## The MSM Estimator

> [!definition] Definition: MSM Estimator (Conditional Moments)
> Given $R$ simulation replications, the **natural unbiased estimator** of $\sigma(z_t; \theta)$ is:
> $$
> \hat{\sigma}_R(z_t; \theta) = \frac{1}{R} \sum_{r=1}^{R} s[y_t^{(r)}(\theta), z_t]
> $$
> where $y_t^{(r)}(\theta)$ are drawn from $h(y_t | z_t; \theta)$.
>
> The MSM estimator based on conditional moments is:
> $$
> \hat{\theta}_{MSM}^R = \arg\min_\theta \left[\sum_{t=1}^T f_R(y_t, z_t; \theta)\right]' A \left[\sum_{t=1}^T f_R(y_t, z_t; \theta)\right]
> $$
> where $f_R(y_t, z_t; \theta) = B(z_t)'\left[s(y_t, z_t) - \hat{\sigma}_R(z_t; \theta)\right]$, $B(z_t)$ is a nonlinear matrix function, and $A$ is a positive definite weight matrix.
^def-msm-estimator

> [!definition] Definition: MSM Estimator (Unconditional Moments)
> For models estimated using unconditional moments via path simulations, the estimator uses the *mean* of $\hat{\sigma}_R(z_t; \theta)$ across $t$:
> $$
> \hat{\theta}_{MSM}^R = \arg\min_\theta \left[\frac{1}{T}\sum_{t=1}^T s(y_t, \ldots, y_{t-l}) - \frac{1}{R}\sum_{r=1}^R \frac{1}{T}\sum_{t=1}^T s(y_t^{(r)}(\theta), \ldots, y_{t-l}^{(r)}(\theta))\right]' A [\cdots]
> $$
> where different random draws are used across $t$ (i.e., each simulated path uses an independent set of random numbers).
^def-msm-unconditional

## Consistency

> [!theorem] Theorem: Consistency of the MSM Estimator (McFadden, 1989)
> As the sample size $T \to \infty$, the MSM estimator $\hat{\theta}_{MSM}^R$ is **consistent for any fixed** $R \geq 1$:
> $$
> \hat{\theta}_{MSM}^R \xrightarrow{p} \theta_0 \quad \text{as } T \to \infty
> $$
>
> **Key insight:** Consistency holds because the simulation error is "averaged out" by using the *mean* of $\hat{\sigma}_R(z_t; \theta)$ across $t = 1, \ldots, T$, with different random draws used for each $t$. The fact that the MSM estimator is consistent for any $R \geq 1$ should not be taken as an indication that $R$ is irrelevant for the asymptotic properties — it affects the asymptotic variance.
^thm-msm-consistency

## Asymptotic Normality

> [!theorem] Theorem: Asymptotic Distribution of the MSM Estimator
> Under standard regularity conditions, the MSM estimator is asymptotically normal:
> $$
> T^{1/2}(\hat{\theta}_{MSM}^R - \theta_0) \xrightarrow{d} N(0, \text{avar}(\hat{\theta}_{MSM}^R))
> $$
>
> The asymptotic covariance matrix is:
> $$
> \text{avar}(\hat{\theta}_{MSM}^R) = \Sigma_1^{-1} \Sigma_2 \Sigma_1^{-1} + \frac{1}{R} \Sigma_1^{-1} D' A \, \text{var}[f(y_t^{(r)}(\theta_0), z_t; \theta_0)] \, A D \Sigma_1^{-1}
> $$
>
> where:
> - $D = E\left[B(z_t) \frac{\partial \sigma(z_t; \theta_0)}{\partial \theta'}\right]$
> - $\Sigma_1 = D' A D$
> - $\Sigma_2 = D' A \, \text{var}[f(y_t, z_t; \theta_0)] \, A D$
>
> The first term is the asymptotic variance of the corresponding GMM estimator. The second term is the **Monte Carlo sampling variance** due to simulation, which vanishes as $R \to \infty$.
^thm-msm-normality

## Optimal Weight Matrix

> [!theorem] Theorem: Optimal Weight Matrix for MSM
> The asymptotic optimal weight matrix that minimizes the asymptotic covariance is:
> $$
> A_0 = \left(\text{var}[f(y_t, z_t; \theta_0)] + \frac{1}{R} \text{var}[f(y_t^{(r)}(\theta_0), z_t; \theta_0)]\right)^{-1}
> $$
>
> For this optimal choice, the asymptotic covariance simplifies to:
> $$
> \text{avar}(\hat{\theta}_{MSM}^R) = [D' A_0 D]^{-1}
> $$
>
> In practice, $A_0$ can be estimated by its sample analogue using preliminary consistent estimates.
^thm-msm-optimal-weight

## Efficiency Properties

The MSM estimator's efficiency relative to MLE and GMM depends on two factors:

1. **Moment selection**: The choice of moment conditions $s(y_t, z_t)$ determines the "information content" — poorly chosen moments yield inefficient estimates regardless of $R$.

2. **Number of simulations**: The $(1 + 1/R)$ inflation factor means:
   - $R = 1$: variance is doubled relative to analytical GMM
   - $R = 5$: variance inflated by 20%
   - $R = 20$: variance inflated by 5%
   - $R \to \infty$: MSM equals GMM

> [!important] Efficiency Bound
> In a fully parametric model, one can expect that MSM, just as GMM, is inefficient relative to MLE. The inefficiency comes from two sources: (1) the arbitrary choice of moment restrictions (inherent to GMM), and (2) the Monte Carlo simulation noise (specific to MSM). The first is irreducible for a given set of moments; the second is controlled by $R$.

## Example: Stochastic Volatility Model

The standard discrete-time SV model:

$$
y_t = \exp(w_t^*/2) u_t, \qquad w_t^* = \gamma + \delta w_{t-1}^* + \nu \eta_t
$$

where $u_t$ and $\eta_t$ are mutually and serially independent with known distributions, and $w_t^*$ is the unobservable log volatility.

**Why MSM is needed:** The marginal likelihood integrates over the entire latent volatility path:

$$
L_T(\theta) = \int \cdots \int \prod_{t=1}^T h(y_t | w_t^*; \theta) h(w_t^* | w_{t-1}^*; \theta) \, dw_1^* \cdots dw_T^*
$$

This $T$-dimensional integral has no closed-form solution. Standard GMM using unconditional moments like $E[|y_t|]$, $E[y_t^2]$, or $E[y_t^2 y_{t-1}^2]$ is feasible but relatively inefficient, especially when $\delta$ is close to one.

**MSM approach:** Simulate paths via $w_t^{*(r)} = \gamma + \delta w_{t-1}^{*(r)} + \nu \eta_t^{(r)}$ and $y_t^{(r)} = \exp(w_t^{*(r)}/2) u_t^{(r)}$, then match unconditional moments between simulated and observed data.

## Connections

- Extends [[Standard Errors and Clustering|GMM estimation]] to settings with intractable moments
- Foundation for [[SMM Estimator for Copulas]] which applies MSM using rank dependence measures
- [[Indirect Inference]] provides an alternative simulation-based approach using auxiliary models
- [[Efficient Method of Moments]] achieves MLE-equivalent efficiency through flexible auxiliary models
- [[Practical Issues in Simulation Estimation]] covers common random numbers and variance reduction techniques critical for MSM implementation

## See Also

- [[Simulation-Based Estimation - Overview]] — comparison of all three simulation-based methods
- [[SMM Estimator for Copulas]] — application to copula estimation (Oh & Patton, 2011)
- [[Indirect Inference]] — auxiliary model approach
- [[Practical Issues in Simulation Estimation]] — implementation details
- [[Brock-Mirman Model - SMM Estimation Exercise]] — full worked structural estimation example using MSM in Python
- [[SMM Estimation of Factor Copulas]] — high-dimensional application of rank-based SMM to a 100-asset factor copula model
- [[BLP Demand Estimation - Overview]] — BLP estimation via integrated/simulated moments over random coefficients

## Sources

- [[raw/tdb136.pdf]] — Liesenfeld & Breitung (1998), Sections 1-3
- McFadden, D. (1989), "A Method of Simulated Moments for Estimation of Discrete Response Models without Numerical Integration," *Econometrica* 57, 995-1026
- Pakes, A. and D. Pollard (1989), "Simulation and the Asymptotics of Optimization Estimators," *Econometrica* 57, 1027-1057
- Newey, W.K. and D. McFadden (1994), "Large Sample Estimation and Hypothesis Testing," *Handbook of Econometrics* 4, 2111-2245
- Duffie, D. and K.J. Singleton (1993), "Simulated Moments Estimation of Markov Models of Asset Prices," *Econometrica* 61, 929-952
