---
title: "Index: Time Series Causal Inference"
tags:
  - type/index
  - source/ingested
parent: "[[../Causal Inference/_Index|Bayesian Causal Inference]]"
date_updated: 2026-06-28
concept_count: 7
---

# Time Series Causal Inference

> [!abstract] Routing Summary
> This folder covers Bayesian structural time-series models (BSTS) for inferring causal impact of interventions on time-series outcomes — the CausalImpact framework (Brodersen et al., Ann. Applied Stats. 2015). Contains 7 notes plus a State-Space and Kalman Filter sub-topic (the general filtering/smoothing machinery underlying BSTS).
> - Need the core state-space model specification? → [[Bayesian Structural Time-Series Model]]
> - Need the general Kalman filter / RTS smoother machinery (predict-update, smoothing, likelihood)? → [[Research/Bayesian Statistics/Causal Inference/Time Series Causal Inference/State-Space and Kalman Filter/_Index|State-Space and Kalman Filter]]
> - Need trend and seasonality components? → [[Local Linear Trend and Seasonality]]
> - Need automatic covariate selection (spike-and-slab)? → [[Spike-and-Slab Prior for Covariate Selection]]
> - Need the MCMC / Gibbs sampler details? → [[MCMC Inference for CausalImpact]]
> - Need pointwise / cumulative / running average impact formulas? → [[Counterfactual Impact Estimation]]
> - Need the advertising application with placebo test? → [[CausalImpact Empirical Application]]

## Sub-topics

| Sub-topic | Notes | Covers |
|-----------|-------|--------|
| [[Research/Bayesian Statistics/Causal Inference/Time Series Causal Inference/State-Space and Kalman Filter/_Index\|State-Space and Kalman Filter]] | 5 | Linear-Gaussian state-space models, the Kalman filter (predict-update recursion), the RTS smoother, and the marginal likelihood via the prediction-error decomposition — Särkkä (2013). The general machinery underlying BSTS. |

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| BSTS state-space model | [[Bayesian Structural Time-Series Model]] | definition | — | Eqs (2.1), (2.2): $y_t = Z_t^\top \alpha_t + \varepsilon_t$; modular state components |
| Local linear trend + seasonality | [[Local Linear Trend and Seasonality]] | definition | [[Bayesian Structural Time-Series Model]] | Eqs (2.3)-(2.5): stochastic level + slope; sum-to-zero seasonal |
| Spike-and-slab prior | [[Spike-and-Slab Prior for Covariate Selection]] | definition | [[Bayesian Structural Time-Series Model]] | Eqs (2.8)-(2.12); automatic selection from $J$ controls |
| MCMC inference | [[MCMC Inference for CausalImpact]] | concept | [[Local Linear Trend and Seasonality]], [[Spike-and-Slab Prior for Covariate Selection]] | Gibbs + Durbin-Koopman smoother; linear in $m$, < 30s |
| Counterfactual impact | [[Counterfactual Impact Estimation]] | definition | [[MCMC Inference for CausalImpact]] | Eqs (2.15)-(2.17): $\phi_t = y_t - \tilde{y}_t$; cumulative; running average |
| Empirical application | [[CausalImpact Empirical Application]] | example | [[Counterfactual Impact Estimation]] | 22% lift [13%, 30%]; observational ≈ randomized; placebo = null |

## Concept Dependency Chain

```
Bayesian Structural Time-Series Model
  ├── Local Linear Trend and Seasonality (state components)
  │     └── trend: (2.3)-(2.4), seasonality: (2.5)
  ├── Spike-and-Slab Prior for Covariate Selection (variable selection)
  │     └── spike: (2.8)-(2.9), slab: (2.10)-(2.12), Zellner g-prior
  └── MCMC Inference for CausalImpact (Gibbs sampler)
        ├── Durbin-Koopman simulation smoother (state step)
        ├── Conjugate Gamma draws (variance step)
        └── Spike-slab Gibbs (variable selection step)
              └── Counterfactual Impact Estimation
                    ├── Pointwise impact: φ_t = y_t - ỹ_t (Eq 2.15)
                    ├── Cumulative impact: Σ φ_t (Eq 2.16)
                    └── Running average: (1/t-n) Σ φ_t (Eq 2.17)
                          └── CausalImpact Empirical Application
                                (advertising: 22% lift; placebo: null)
```

## Notes

- [[Brodersen 2015 - Overview]] — CONTAINS: paper overview; 28-page Ann. Applied Stats.; comparison table (DiD, SC, ARIMA); key simulation and empirical results
- [[Bayesian Structural Time-Series Model]] — CONTAINS: observation equation (2.1), state equation (2.2); all dimensions defined; static/dynamic regression components
- [[Local Linear Trend and Seasonality]] — CONTAINS: local linear trend (2.3), AR(1) slope variant (2.4), seasonal model (2.5); block-diagonal assembly
- [[Spike-and-Slab Prior for Covariate Selection]] — CONTAINS: spike-slab factorization (2.8)-(2.9), Gaussian slab (2.10), Zellner g-prior (2.12), sufficient statistics (2.13)
- [[MCMC Inference for CausalImpact]] — CONTAINS: two Gibbs steps (state simulation + parameter simulation); Durbin-Koopman smoother; posterior predictive distribution (2.14)
- [[Counterfactual Impact Estimation]] — CONTAINS: pointwise impact (2.15), cumulative (2.16), running average (2.17); calibration properties; DiD connection
- [[CausalImpact Empirical Application]] — CONTAINS: Google advertising campaign; Analysis 1 (randomized: 22%), Analysis 2 (observational: 21%), Analysis 3 (placebo: null); model priors

## Sources

- [[raw/Brodersen - 2015 - Inferring causal impact using Bayesian structural time-series models.pdf]] — Brodersen KH, Gallusser F, Koehler J, Remy N, Scott SL. 2015. *Ann. Appl. Stat.* 9(1): 247–274.

## Cross-Links to Existing Vault Notes

- [[Differences-in-Differences]] — CausalImpact generalizes DiD to time series (DD = special case with zero-variance local level, static regression, OLS)
- [[Counterfactual Inference]] — existing note on BART-based counterfactuals; CausalImpact is the time-series analog
- [[MCMC Basics]] — foundational MCMC concepts (Gibbs sampler)
- [[Synthetic Control]] — CausalImpact also generalizes SC by adding trend/seasonality and allowing negative weights
