---
title: "Simulation-Based Estimation - Overview"
tags:
  - source/ingested
  - topic/econometrics
  - topic/simulation-estimation
  - type/overview
  - doc/paper
source: "[[raw/tdb136.pdf]], [[raw/Oh_Patton_SMM_copulas_nov11.pdf]]"
source_location: "Liesenfeld & Breitung (1998), full paper; Oh & Patton (2011), full paper"
date_ingested: 2026-04-11
folder: "Econometrics/Extensions/Simulation-Based Estimation"
doc_type: paper
depends_on:
  - "[[Standard Errors and Clustering]]"
  - "[[Copula Estimation]]"
used_by:
  - "[[Method of Simulated Moments]]"
  - "[[Indirect Inference]]"
  - "[[Efficient Method of Moments]]"
  - "[[SMM Estimator for Copulas]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
aliases:
  - Simulation-Based Inference
  - Simulation Estimation
---

# Simulation-Based Estimation - Overview

> [!summary]
> Simulation-based estimation methods replace analytically intractable criterion functions (likelihoods or moment conditions) with Monte Carlo approximations computed from simulated data. The three main approaches — the Method of Simulated Moments (MSM), Indirect Inference, and the Efficient Method of Moments (EMM) — are all consistent and asymptotically normal, but differ in how they construct the criterion function and in their efficiency properties. These methods are essential when the model's likelihood or moment conditions cannot be evaluated in closed form, which is common in financial econometrics (stochastic volatility, copula models, continuous-time processes).

## Overview

The estimation of unknown parameters in econometric models generally involves optimizing a criterion function based on the likelihood function or a set of moment restrictions. For many models of interest — particularly in financial econometrics — neither the likelihood function nor the relevant moment restrictions have a tractable analytical form. This arises when:

1. **Unobservable variables** enter the model nonlinearly, creating multiple integrals in the likelihood that cannot be evaluated by standard numerical methods (e.g., stochastic volatility models)
2. **Continuous-time processes** are observed only at discrete intervals, and the transition density has no closed-form expression (e.g., diffusion models for interest rates)
3. **Complex dependence structures** make the copula likelihood unavailable or computationally infeasible (e.g., factor copula models)

> [!definition] Definition: Simulation-Based Estimator
> A **simulation-based estimator** replaces an analytically intractable quantity — such as a likelihood, moment condition, or score — with its Monte Carlo approximation computed from $R$ simulated paths $\{y_t^{(r)}(\theta)\}_{r=1}^{R}$ drawn from the model at parameter value $\theta$. The estimator is obtained by optimizing the simulated criterion function over $\theta \in \Theta$.
^def-simulation-estimator

## The Three Main Approaches

### 1. Method of Simulated Moments (MSM/SMM)

The MSM replaces analytical moment conditions with simulated counterparts. The estimator minimizes the distance between sample moments and their simulated analogues:

$$\hat{\theta}_{MSM}^R = \arg\min_\theta \left[\frac{1}{T}\sum_{t=1}^T f_R(y_t, z_t; \theta)\right]' A \left[\frac{1}{T}\sum_{t=1}^T f_R(y_t, z_t; \theta)\right]$$

where $f_R$ incorporates simulated estimates of the theoretical moments. Introduced by McFadden (1989) and Pakes and Pollard (1989).

**Key properties:**
- Consistent for any fixed $R \geq 1$ as $T \to \infty$
- Asymptotic variance contains an additional $(1/R)$ component from simulation noise
- Equivalent to GMM as $R \to \infty$
- Efficiency depends on the choice of moment conditions

See [[Method of Simulated Moments]] for full treatment.

### 2. Indirect Inference

Indirect inference uses an **auxiliary model** — a possibly misspecified but tractable model — as an intermediary. The structural parameters are chosen so that simulated data from the structural model, when fit with the auxiliary model, produce parameter estimates close to those from the real data.

Two asymptotically equivalent formulations:
- **Minimum distance**: match auxiliary parameter estimates
- **Score-based**: match the score of the auxiliary model evaluated at the real-data estimates

Introduced by Gouriéroux, Monfort, and Renault (1993) and Smith (1993).

See [[Indirect Inference]] for full treatment.

### 3. Efficient Method of Moments (EMM)

EMM combines indirect inference with a flexible, data-dependent auxiliary model — specifically the semi-nonparametric (SNP) density of Gallant and Nychka (1987). By increasing the flexibility of the auxiliary model with the sample size, EMM can achieve asymptotic efficiency equal to MLE.

Introduced by Gallant and Tauchen (1996a).

See [[Efficient Method of Moments]] for full treatment.

## Comparison of Methods

| Feature | MSM | Indirect Inference | EMM |
|---------|-----|--------------------|-----|
| Criterion | Moment conditions | Auxiliary model parameters/scores | SNP model scores |
| Moment choice | User-specified | Implied by auxiliary model | Data-driven via SNP |
| Efficiency | Depends on moments | Depends on auxiliary model | Asymptotically efficient |
| Requires auxiliary model | No | Yes | Yes (SNP) |
| Computational cost | Low-moderate | Moderate-high (nested optimization) | High |
| Consistency | $R \geq 1$ fixed | $R \geq 1$ fixed | $R \geq 1$ fixed |
| Simulation variance | $(1 + 1/R)$ factor | $(1 + 1/R)$ factor | $(1 + 1/R)$ factor |

## Asymptotic Variance Structure

All three estimators share a common asymptotic variance structure:

$$\text{avar}(\hat{\theta}) = \left(1 + \frac{1}{R}\right) V_{\text{GMM}}$$

where $V_{\text{GMM}}$ is the asymptotic variance of the corresponding (infeasible) GMM estimator and $R$ is the number of simulation replications. The factor $(1 + 1/R)$ reflects the additional Monte Carlo sampling variance. As $R \to \infty$, the simulation-based estimator attains the same efficiency as the analytical counterpart.

## Motivating Examples

### Discrete-Time Stochastic Volatility (SV) Model

$$y_t = \exp(w_t^*/2) u_t, \qquad w_t^* = \gamma + \delta w_{t-1}^* + \nu \eta_t$$

The latent log-volatility $w_t^*$ makes the marginal likelihood a $T$-dimensional integral — analytically and numerically intractable. However, simulating paths from the model is straightforward via path simulations.

### Continuous-Time Diffusion Models

$$dv_t = a(v_t, \theta) dt + b(v_t, \theta) dW_t$$

Observed at discrete intervals $\Delta$, the transition density generally has no closed form. The Cox-Ingersoll-Ross model $dv_t = (\alpha_0 + \alpha_1 v_t)dt + \beta_0 \sqrt{v_t} dW_t$ is a special case where $h(y_t | y_{t-1}; \theta)$ is non-central $\chi^2$, but more general specifications require simulation.

### Copula-Based Multivariate Models

For copula models where the likelihood is not known in closed form (e.g., factor copulas), or where the researcher wants to match specific dependence features rather than the full likelihood, simulation-based methods using rank dependence measures provide a tractable estimation approach. See [[SMM Estimator for Copulas]].

## Connections

- Generalizes [[Standard Errors and Clustering|GMM estimation]] to settings where moment conditions are analytically intractable
- Applied to [[Copula Estimation|copula models]] via the SMM approach of Oh and Patton (2011)
- [[Dependence Measures for Copulas]] provides the "moments" used in SMM for copulas
- [[Practical Issues in Simulation Estimation]] covers implementation details common to all three methods

## See Also

- [[Method of Simulated Moments]] — core MSM/SMM framework and theory
- [[Indirect Inference]] — auxiliary model approach
- [[Efficient Method of Moments]] — SNP-based asymptotically efficient procedure
- [[SMM Estimator for Copulas]] — application of SMM to copula estimation
- [[Practical Issues in Simulation Estimation]] — variance reduction, common random numbers

## Sources

- [[raw/tdb136.pdf]] — Liesenfeld & Breitung (1998), "Simulation Based Methods of Moments in Empirical Finance"
- [[raw/Oh_Patton_SMM_copulas_nov11.pdf]] — Oh & Patton (2011), "Simulated Method of Moments Estimation for Copula-Based Multivariate Models"
