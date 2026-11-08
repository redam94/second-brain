---
title: "Index: Stasinopoulos 2007 - GAMLSS in R"
tags:
  - type/index
  - source/ingested
  - topic/distributional-regression
parent: "[[../_Index|Distributional and Constrained Outcomes]]"
date_updated: 2026-11-08
concept_count: 7
---

# Stasinopoulos 2007 - GAMLSS in R

> [!abstract] Routing Summary
> This folder captures Stasinopoulos and Rigby (2007), *Generalized Additive Models for Location, Scale and Shape (GAMLSS) in R* (J. Stat. Softw. 23(7)): the model class, distribution and smoother catalogue, RS/CG algorithms, GAIC/VGD selection, four worked examples and the LMS/BCT growth-centile methodology. 7 notes. Motivating PyMC example: E41 (growth centile charts).
> - Need the paper in one page and the section-to-note map? -> [[Stasinopoulos 2007 - GAMLSS in R - Overview]]
> - Need the formal GAMLSS definition, links, penalized likelihood, censoring, mixtures? -> [[Stasinopoulos 2007 - GAMLSS Model Framework]]
> - Need the list of distributions (BCCG, BCT, SHASH, NBI, ZIP...) or the P-spline definition? -> [[Stasinopoulos 2007 - Distributions and Additive Terms]]
> - Need RS vs CG, GAIC, validation deviance, stepwise selection? -> [[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]]
> - Need the lice / CD4 / insurance-claims numbers? -> [[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]]
> - Need LMS, BCT centile formula, worm plots, Q statistics, head-circumference tables? -> [[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]]
> - Need a PyMC model with P-splines for each distribution parameter? -> [[Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| GAMLSS model | [[Stasinopoulos 2007 - GAMLSS Model Framework]] | definition | [[Generalized Linear Models]] | $g_k(\theta_k)=X_k\beta_k+\sum_j Z_{jk}\gamma_{jk}$ for $\mu,\sigma,\nu,\tau$ |
| Penalized likelihood | [[Stasinopoulos 2007 - GAMLSS Model Framework]] | definition | GAMLSS model | $\ell_p=\ell-\tfrac12\sum\lambda\gamma^\top G\gamma$ |
| Family catalogue | [[Stasinopoulos 2007 - Distributions and Additive Terms]] | concept | Framework | BCCG = LMS; BCT adds kurtosis |
| P-spline term | [[Stasinopoulos 2007 - Distributions and Additive Terms]] | definition | B-splines | $D\gamma\sim N(0,\lambda^{-1}I)$ |
| RS / CG algorithms | [[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]] | algorithm | Penalized likelihood | RS ignores cross derivatives |
| GAIC, VGD | [[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]] | definition | likelihood | penalty $\#$ is a tuning choice |
| Lice, CD4, claims | [[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]] | example | Algorithms | Sichel AIC 4646.2; smooth $\sigma$ simplifies $\mu$ |
| LMS / BCT centile | [[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]] | theorem | Family catalogue | $y_\alpha=\mu\{1+\nu\sigma t_{\tau,\alpha}\}^{1/\nu}$ |
| Worm plot, Q statistics | [[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]] | definition | Quantile residuals | BCT 0 violations vs LMS 16 |
| Bayesian P-splines | [[Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC]] | concept | Penalized likelihood | RW2 prior per parameter |

## Notes

- [[Stasinopoulos 2007 - GAMLSS in R - Overview]] — CONTAINS: question, contribution, key result, motivating PyMC examples, source map.
- [[Stasinopoulos 2007 - GAMLSS Model Framework]] — CONTAINS: Def. GAMLSS (Eq. 1), sub-models (Eqs. 2-5), Def. penalized likelihood (Eq. 6), censoring, mixtures, CD4 example.
- [[Stasinopoulos 2007 - Distributions and Additive Terms]] — CONTAINS: Tables 1-3 (selected rows with links), parameterisations, Def. P-spline, backfitting conventions.
- [[Stasinopoulos 2007 - Fitting Algorithms and Model Selection]] — CONTAINS: Def. CG, RS, GAIC, VGD; package map; stepwise selection; caveats; penalty-choice example.
- [[Stasinopoulos 2007 - Lice, CD4 and Claims Examples]] — CONTAINS: AIC table for count families; CD4 mean/variance smoothing comparison; claims term selection.
- [[Stasinopoulos 2007 - Centile Curves, LMS and Residual Diagnostics]] — CONTAINS: Def. LMS/BCT, Thm. centile formula, Eq. 10 model, hyperparameter table, worm plot, Q statistics table, Python.
- [[Stasinopoulos 2007 - Bayesian P-Splines and Distributional Regression in PyMC]] — CONTAINS: Bayesian reading of Eq. 6, RW2 P-spline definition, untested PyMC sketch for E41.

## Sources

- Stasinopoulos 2007 - GAMLSS in R — Stasinopoulos DM, Rigby RA (2007), J. Stat. Softw. 23(7), 46 pp. Open access.

## See Also

- [[Generalized Linear Models]], [[Quantile Regression]], [[Hilbert Space Gaussian Processes]], [[Hierarchical Models]]
- [[Ji 2024 - Valid Standard Errors for Bayesian Quantile Regression - Overview]] — quantile alternative to modelling the full distribution.
