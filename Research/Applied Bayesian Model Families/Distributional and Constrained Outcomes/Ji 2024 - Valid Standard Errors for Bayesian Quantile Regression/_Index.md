---
title: "Index: Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression"
tags:
  - type/index
  - source/ingested
  - topic/distributional-regression
parent: "[[../_Index|Distributional and Constrained Outcomes]]"
date_updated: 2026-11-08
concept_count: 5
---

# Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression

> [!abstract] Routing Summary
> Captures Ji, Lee and Rabe-Hesketh (2024), *Valid standard errors for Bayesian quantile regression with clustered and independent data* (arXiv 2407.09772v4, 50 pp.), which reviews and tests the Yang-Wang-He (2016) AL-posterior adjustment and proposes infinitesimal-jackknife SEs. Includes a concept note on Gibbs posteriors and learning-rate calibration. 5 notes plus overview. Motivating PyMC example: E83 (quantile regression, "when it lies").
> - Need the one-page summary and source map? -> [[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]]
> - Need check loss, AL density, scale-mixture, role of $\sigma$? -> [[Ji 2024 - Asymmetric Laplace Working Likelihood]]
> - Need the asymptotic posterior, sandwich, Yang adjustment, Sriram two-step? -> [[Ji 2024 - Yang-Wang-He Sandwich Adjustment]]
> - Need IJ definition, clustered IJ, code? -> [[Ji 2024 - Infinitesimal Jackknife Standard Errors]]
> - Need simulation designs, coverage findings, Engel and Project STAR results? -> [[Ji 2024 - Simulation Results and Applications]]
> - Need Gibbs posterior / learning-rate calibration? -> [[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Check loss | [[Ji 2024 - Asymmetric Laplace Working Likelihood]] | definition | - | $\rho_\tau(u)=u\{\tau-I(u<0)\}$ |
| Asymmetric Laplace | [[Ji 2024 - Asymmetric Laplace Working Likelihood]] | definition | check loss | mode = KB estimator; spread $\propto\sigma$ |
| Asymptotic AL posterior | [[Ji 2024 - Yang-Wang-He Sandwich Adjustment]] | theorem | AL | $N(\hat\beta,\sigma D_1^{-1}/n)$ |
| Sandwich covariance | [[Ji 2024 - Yang-Wang-He Sandwich Adjustment]] | theorem | quantile regression | $\tau(1-\tau)D_1^{-1}D_0D_1^{-1}/n$ |
| Yang adjustment | [[Ji 2024 - Yang-Wang-He Sandwich Adjustment]] | definition | both | $\tau(1-\tau)\sigma^{-2}\hat\Sigma X'X\hat\Sigma$ |
| IJ SE | [[Ji 2024 - Infinitesimal Jackknife Standard Errors]] | definition | MCMC draws | $I_i=n\,\mathrm{cov}[\theta,\ell_i]$ |
| Clustered IJ | [[Ji 2024 - Infinitesimal Jackknife Standard Errors]] | definition | IJ | sum over cluster |
| Coverage findings | [[Ji 2024 - Simulation Results and Applications]] | example | all | ALD up to 300% off |
| Gibbs posterior | [[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]] | concept | AL | $\omega=1/\sigma$ calibrated |

## Notes

- [[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]] — CONTAINS: question, contribution, E83 link, source map.
- [[Ji 2024 - Asymmetric Laplace Working Likelihood]] — CONTAINS: Defs. check loss, ALD, scale mixture; priors on $\sigma$; units trap; Python.
- [[Ji 2024 - Yang-Wang-He Sandwich Adjustment]] — CONTAINS: Thms. Eqs. 1-2; Def. Eq. 3; Sriram two-step; finite-sample caveat; Python.
- [[Ji 2024 - Infinitesimal Jackknife Standard Errors]] — CONTAINS: weights, linear approximation theorem, IJ and clustered IJ, Python.
- [[Ji 2024 - Simulation Results and Applications]] — CONTAINS: DGPs, metrics, findings, cluster design, Engel, Project STAR.
- [[Ji 2024 - Gibbs Posterior and Learning-Rate Calibration]] — CONTAINS: Gibbs posterior definition, calibration algorithm, Python (concept note).

## Sources

- [[raw/Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression.pdf]] — Ji F, Lee J, Rabe-Hesketh S (2024), arXiv:2407.09772v4. Substitute for the paywalled Yang, Wang and He (2016), Int. Stat. Rev.

## See Also

- [[Quantile Regression]], [[Conformalized Quantile Regression]], [[Stasinopoulos 2007 - GAMLSS in R - Overview]]
