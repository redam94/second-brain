---
title: "Index: Synthetic Likelihood"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Bayesian Statistics]]"
date_updated: 2026-06-27
concept_count: 4
---

# Synthetic Likelihood

> [!abstract] Routing Summary
> **Synthetic likelihood** (Wood 2010, *Nature*) — a simulation-based / likelihood-free method for inference on noisy nonlinear dynamic models in the chaotic and near-chaotic regimes, where conventional likelihood collapses. Reduce data to phase-insensitive summary statistics, simulate to estimate their mean & covariance, and score fit with a multivariate-normal "synthetic likelihood" explored by MCMC. Contains 4 notes.
> - New here / the big picture? → [[Synthetic Likelihood - Overview]]
> - Why conventional likelihood fails; the Ricker map; choosing statistics? → [[Chaos and Phase-Insensitive Statistics]]
> - The estimator $l_s(\theta)$, its properties, MCMC, MLE, diagnostics? → [[Synthetic Likelihood Construction]]
> - Worked application (Nicholson's blowflies, limit cycles)? → [[Nicholson's Blowfly Application]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Synthetic likelihood method; blowfly conclusion | [[Synthetic Likelihood - Overview]] | overview | [[Synthetic Likelihood Construction]] | Likelihood-free inference for chaotic dynamics via summary statistics |
| Likelihood collapse; phase-insensitive statistics; Ricker map | [[Chaos and Phase-Insensitive Statistics]] | concept | [[Synthetic Likelihood - Overview]] | $f_\theta(\mathbf{y},\mathbf{e})$ is intractable/irregular; judge fit on dynamic features, not local phase |
| MVN synthetic likelihood; estimation; MCMC; diagnostics | [[Synthetic Likelihood Construction]] | theorem | [[Chaos and Phase-Insensitive Statistics]], [[MCMC Basics]] | $l_s(\theta) = -\tfrac12(\mathbf{s}-\hat\mu_\theta)^\top\hat\Sigma_\theta^{-1}(\mathbf{s}-\hat\mu_\theta) - \tfrac12\log\lvert\hat\Sigma_\theta\rvert$ |
| Gurney–Nisbet blowfly model; full vs demographic-only; stability | [[Nicholson's Blowfly Application]] | example | [[Synthetic Likelihood Construction]] | Limit cycles perturbed by noise (ΔAIC > 1800 for full model) |

## Notes

- [[Synthetic Likelihood - Overview]] — CONTAINS: research question, one-line method, the four why-it-works properties, blowfly headline result, section/note map.
- [[Chaos and Phase-Insensitive Statistics]] — CONTAINS: scaled Ricker map (Eq. 1); likelihood-collapse argument (Fig. 1b-c); local-phase philosophy; design of summary statistics (autocovariances, AR/regression coefficients).
- [[Synthetic Likelihood Construction]] — CONTAINS: MVN approximation (Eq. 2); 4-step evaluation algorithm + $l_s(\theta)$ formula; properties (smoothness, invariance, robustness, $N_r\to\infty$); Metropolis–Hastings MCMC; MLE via quadratic regression; AIC/GLRT; $\chi^2_{\dim(\mathbf{s})}$ checking diagnostic.
- [[Nicholson's Blowfly Application]] — CONTAINS: Gurney–Nisbet model (Eqs. 3-4) + stochastic discretization; blowfly summary statistics; full-vs-demographic $\chi^2$/AIC comparison (Fig. 3); stability-diagram analysis (Fig. 4) → intrinsic limit cycles.

## Sources
- [[raw/Wood 2010 - Statistical Inference for Noisy Nonlinear Ecological Dynamic Systems]] — Wood, S.N. (2010), *Statistical inference for noisy nonlinear ecological dynamic systems*, **Nature** 466(7310):1102–1104. DOI:10.1038/nature09319.

## See Also
- [[Approximate Bayesian Computation for ABMs]] — the closest likelihood-free relative (acceptance-threshold vs. MVN likelihood)
- [[Method of Simulated Moments]] / [[Indirect Inference]] / [[Simulated Moments Estimation - Overview]] — summary-statistic / moment matching by simulation
- [[MCMC Basics]] — the sampler used to explore $l_s$
- [[Model Comparison]] — AIC / likelihood-ratio model selection
