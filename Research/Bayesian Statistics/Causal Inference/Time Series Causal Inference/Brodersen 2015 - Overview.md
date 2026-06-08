---
title: "Brodersen 2015 - Overview"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/time-series
  - topic/bayesian-statistics
  - type/overview
  - doc/paper
source: "[[raw/Brodersen - 2015 - Inferring causal impact using Bayesian structural time-series models.pdf]]"
source_location: "pp. 247-274"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Time Series Causal Inference"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Differences-in-Differences]]"
used_by:
  - "[[Bayesian Structural Time-Series Model]]"
  - "[[Counterfactual Impact Estimation]]"
aliases:
  - Brodersen 2015
  - CausalImpact paper
---

# Brodersen 2015 - Overview

> [!summary]
> Brodersen, Gallusser, Koehler, Remy & Scott (2015) propose a Bayesian state-space model for inferring the causal impact of a market intervention on a time series outcome. By modeling a counterfactual prediction (what would have happened without the intervention), the approach generalizes DiD to handle temporal correlation, multiple covariates, local trends, and seasonality. Implemented in the **CausalImpact** R package.

## Research Question and Contribution

**Problem:** Estimating causal effects of interventions (e.g., ad campaigns) on time-series outcomes. Classical DiD assumes i.i.d. data and only two time points; it is too restrictive for time-series settings.

**Contribution:**
1. A **diffusion-regression state-space model** combining local trend, seasonality, and a synthetic control component
2. **Fully Bayesian inference** via MCMC (Gibbs sampler), producing credible intervals for the causal effect
3. **Spike-and-slab prior** for automatic covariate selection among many potential control series
4. Three quantities of interest: pointwise impact $\phi_t$, cumulative impact $\sum \phi_t$, running average impact
5. **CausalImpact** R package for practical application

**Published:** *Annals of Applied Statistics*, 2015, Vol. 9, No. 1, pp. 247–274. DOI: 10.1214/14-AOAS788

## Paper Structure

| Section | Content |
|---------|---------|
| §1 Introduction | Problem, related work (DiD, synthetic control), approach overview |
| §2 Model | State-space equations; local linear trend; seasonality; static/dynamic regression; priors; inference (MCMC) |
| §3 Simulated data | Sensitivity, specificity, power, interval coverage; estimation accuracy |
| §4 Empirical application | Google advertising campaign; 3 analyses (randomized controls, observational, placebo) |
| §5 Discussion | Comparison to DiD, synthetic control, AR/MA; limitations |

## Key Results

- **Advertising campaign (empirical):** 22% cumulative lift [13%, 30%] using randomized controls; 21% [12%, 30%] using observational keyword searches as controls — nearly identical, validating the observational approach
- **Placebo test:** Causal effect of 2% [-6%, 10%] in untreated regions — not significant, as expected
- **Power (simulation):** 25% true effect detected correctly in >90% of cases; <1% effect missed in ~90% of cases
- **Interval coverage:** Central 95% PI contains truth in ~95% of simulations across campaign lengths

## Relationship to Other Methods

| Method | Relationship |
|--------|-------------|
| Difference-in-Differences | Special case: DiD = state-space model with zero-variance local level, static regression, OLS |
| Synthetic Control | Special case: CausalImpact generalizes SC by adding trend, seasonality, and allowing negative weights |
| ARIMA/AR/MA | Special case: CausalImpact = state-space model with specific parameter restrictions |
| Multiple linear regression | Special case: zero-variance local level, no local trend, static coefficients |

## See Also

- [[Bayesian Structural Time-Series Model]] — the core model specification
- [[Local Linear Trend and Seasonality]] — state components
- [[Spike-and-Slab Prior for Covariate Selection]] — variable selection mechanism
- [[MCMC Inference for CausalImpact]] — posterior inference algorithm
- [[Counterfactual Impact Estimation]] — how causal effects are computed
- [[CausalImpact Empirical Application]] — advertising campaign case study
- [[Differences-in-Differences]] — classical approach that CausalImpact generalizes
- [[Synthetic Control]] — Abadie-style synthetic control that CausalImpact extends with trend, seasonality, and Bayesian inference
- [[Advertising and Promotion Effects]] — the primary empirical application domain for CausalImpact in marketing
