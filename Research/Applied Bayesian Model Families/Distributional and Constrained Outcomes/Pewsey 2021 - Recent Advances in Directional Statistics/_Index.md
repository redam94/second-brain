---
title: "Index: Pewsey 2021 - Recent Advances in Directional Statistics"
tags:
  - type/index
  - source/ingested
  - topic/distributional-regression
parent: "[[../_Index|Distributional and Constrained Outcomes]]"
date_updated: 2026-11-08
concept_count: 5
---

# Pewsey 2021 - Recent Advances in Directional Statistics

> [!abstract] Routing Summary
> Captures Pewsey and García-Portugués (2021), *Recent advances in directional statistics* (TEST 30; arXiv 2005.06889, 61 pp.): circular, toroidal, cylindrical and spherical models, inference and uniformity tests, regression and time-series for angular data, KDE, PCA, classification, spatial models, software. 5 notes plus overview. Motivating PyMC example: E81 (circular data: wind, times of day, seasons).
> - Need the one-page summary and source map? -> [[Pewsey 2021 - Directional Statistics - Overview]]
> - Need von Mises, wrapped, projected, cardioid, sine-skewed, Jones-Pewsey, Kato-Jones, mixtures? -> [[Pewsey 2021 - Circular Distributions and Constructions]]
> - Need estimation, Bayesian methods, score matching, smeariness, Rayleigh/Sobolev uniformity tests? -> [[Pewsey 2021 - Inference, Uniformity Tests and Smeariness]]
> - Need tan-half link, projected normal regression, harmonic regression, KDE/NW, circular AR? -> [[Pewsey 2021 - Circular Regression and Serial Dependence]]
> - Need torus/cylinder/sphere models, circulas, PCA, spatial processes, software? -> [[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]]
> - Need PyMC patterns (von Mises with harmonics, wrapped-prior pitfalls)? -> [[Pewsey 2021 - Circular Models in PyMC]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Von Mises | [[Pewsey 2021 - Circular Distributions and Constructions]] | definition | - | $\propto\exp\{\kappa\cos(\theta-\mu)\}$; ML = moments |
| Wrapping, projection, perturbation | [[Pewsey 2021 - Circular Distributions and Constructions]] | definition | vM | WC closed form; sine-skew |
| Jones-Pewsey, Kato-Jones | [[Pewsey 2021 - Circular Distributions and Constructions]] | definition | vM, WC | flexible unimodal |
| Smeariness | [[Pewsey 2021 - Inference, Uniformity Tests and Smeariness]] | definition | intrinsic mean | rate slower than $n^{-1/2}$ |
| Sobolev uniformity tests | [[Pewsey 2021 - Inference, Uniformity Tests and Smeariness]] | theorem | - | Rayleigh ($j=1$), Bingham ($j=2$) |
| Tan-half link, projected-normal regression | [[Pewsey 2021 - Circular Regression and Serial Dependence]] | definition | vM | link ML is hard |
| Circular AR / linked ARMA | [[Pewsey 2021 - Circular Regression and Serial Dependence]] | definition | vM | CAR conditional vM |
| Bivariate vM, circulas | [[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]] | definition | vM | binding density, copula link |
| vMF, Fisher-Bingham | [[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]] | definition | vM | $S^d$ analogues |
| Harmonic vM in PyMC | [[Pewsey 2021 - Circular Models in PyMC]] | concept | vM, regression | canonical $(\kappa\cos\mu,\kappa\sin\mu)$ |

## Notes

- [[Pewsey 2021 - Directional Statistics - Overview]] — CONTAINS: question, contribution, E81 link, full source map.
- [[Pewsey 2021 - Circular Distributions and Constructions]] — CONTAINS: Defs. vM, wrapping, projection, perturbation, flexible families, mixtures, generalized vM; exploratory plots; Python MLE.
- [[Pewsey 2021 - Inference, Uniformity Tests and Smeariness]] — CONTAINS: likelihood/moment/score-matching/Bayesian inference; smeariness; Thm. Sobolev (Eq. 15); Rayleigh Python.
- [[Pewsey 2021 - Circular Regression and Serial Dependence]] — CONTAINS: Eq. 16, tan-half link, projected-normal regression, harmonic regression, spherical responses, KDE/NW, circular time series.
- [[Pewsey 2021 - Directional Statistics - Spherical, Toroidal and Other Topics]] — CONTAINS: Eqs. 8-14, circulas, cylindrical, vMF/Fisher-Bingham, PCA, classification, spatial, compositional link, software.
- [[Pewsey 2021 - Circular Models in PyMC]] — CONTAINS: resultant vector, harmonic vM, projected-normal scaffold, wrapped-prior pitfalls.

## Sources

- [[raw/Pewsey 2021 - Recent Advances in Directional Statistics.pdf]] — Pewsey A, García-Portugués E (2021), TEST 30 (2021); arXiv:2005.06889.

## See Also

- [[Generalized Linear Models]], [[Hilbert Space Gaussian Processes]], [[Local Linear Trend and Seasonality]], [[Factor Copulas - Overview]]
