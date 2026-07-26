---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-26
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major architectural approaches: **factor copulas** (Oh & Patton 2012 — latent factor, scales to n=100, EVT tail dependence) and **vine copulas** (Aas et al. 2009; Bedford & Cooke 2002 — pair copula construction, maximum per-pair flexibility, best for n≤30).
> - Need the factor-copula big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model? → [[Factor Copula Construction]]
> - Need tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need factor copula estimation (rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical S&P 100 application? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need vine copula motivation and copula architecture comparison? → [[Vine Copulas - Overview]]
> - Need the PCC density formula and h-function? → [[Pair Copula Construction and Vine Density]]
> - Need C-vine vs D-vine tree structures and simulation? → [[C-Vine and D-Vine Structures]]
> - Need the Bedford-Cooke R-vine theory and R-vine matrix? → [[Regular Vine Theory]]
> - Need vine estimation (sequential MLE, Dissmann algorithm, software)? → [[Vine Copula Estimation and Model Selection]]

## Concept Map

### Factor Copulas (Oh & Patton 2012)

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |

### Vine Copulas (Aas et al. 2009; Bedford & Cooke 2002)

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & architecture comparison | [[Vine Copulas - Overview]] | overview | — | PCC: $n(n-1)/2$ pair copulas, any bivariate family; best for $n \le 30$; contrast with factor, Archimedean, Gaussian |
| PCC density formula & h-function | [[Pair Copula Construction and Vine Density]] | definition | Vine Overview | $f(\mathbf{x}) = \prod f_k \cdot \prod_{e} c_e(F_{j\|D}, F_{k\|D})$; h-function $= \partial C/\partial v$; simplifying assumption |
| C-vine and D-vine structures | [[C-Vine and D-Vine Structures]] | definition | PCC density | Stars (C-vine, one root per tree) vs paths (D-vine, natural ordering); simulation via inverse h-functions |
| Regular vine theory | [[Regular Vine Theory]] | theorem | PCC density, C/D-vine | Bedford-Cooke theorem; proximity condition; R-vine matrix; $\|\mathcal{R}_n\| = (n!/2)\prod\binom{n-k}{2}$; truncated R-vine |
| Estimation & model selection | [[Vine Copula Estimation and Model Selection]] | concept | All vine notes | Sequential MLE (tree-by-tree); full MLE; Dissmann MST algorithm; AIC family selection; VineCopula / pyvinecopulib |

## Notes

### Factor Copula notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copula notes

- [[Vine Copulas - Overview]] — CONTAINS: motivation for PCC, bivariate copula family table (Gaussian/t/Clayton/Gumbel/Frank/Joe + tail dependence), copula landscape comparison table (Gaussian/t/Archimedean/factor/vine), sector-vs-sector example of Archimedean failure.
- [[Pair Copula Construction and Vine Density]] — CONTAINS: trivariate PCC example (two valid factorisations), h-function definition & closed forms (Gaussian, Clayton, Gumbel), general vine density formula (R-vine product form), simplifying assumption (SA), four-variable D-vine worked density with nested h-functions.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine definition (star trees, root selection), C-vine simulation algorithm, D-vine definition (path trees, path ordering), D-vine simulation algorithm, C-vine vs D-vine comparison table (structure/use case/domain examples/factor analogy).
- [[Regular Vine Theory]] — CONTAINS: vine and regular vine definition, proximity condition, Bedford-Cooke theorem (valid density), R-vine matrix encoding, structure count formula $|\mathcal{R}_n|$, truncated R-vine definition and rationale, proximity condition worked check.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: margin estimation & pseudo-observations (rescaled empirical CDF, GARCH pre-filtering), sequential tree-by-tree MLE (Aas et al. 2009), full MLE, Dissmann MST structure selection algorithm, AIC pair-copula family selection, VineCopula (R) and pyvinecopulib (Python) code, factor vs vine comparison example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-Czado-2009-Vine-Copulas-Survey.md]] — Synthesis survey compiled from Aas, Czado, Frigessi & Bakken (2009); Bedford & Cooke (2002); Czado (2019); Czado & Nagler (2022); Dissmann et al. (2013). Covers vine copula theory, C/D/R-vine structures, h-function, estimation, and model selection.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
