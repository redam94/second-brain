---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-08-21
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two main approaches: **factor copulas** (Oh & Patton 2012 — latent factor structure, SMM estimation, analytical tail-dependence theory) and **vine copulas** (Aas et al. 2009 — pair-copula constructions, analytical likelihood, pair-specific bivariate families).
> - Need the factor copula motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the factor copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need SMM estimation of factor copulas (no closed-form likelihood)? → [[SMM Estimation of Factor Copulas]]
> - Need the factor copula empirical results (S&P 100, systemic risk)? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need vine copulas: motivation, PCC, comparison with factor copulas? → [[Vine Copulas - Overview]]
> - Need the PCC density decomposition and $h$-functions? → [[Pair-Copula Construction]]
> - Need C-vine vs D-vine structures and when to use each? → [[C-Vine and D-Vine Structures]]
> - Need vine estimation, family selection, MST structure selection, truncation? → [[Vine Copula Estimation and Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Factor copula: motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Factor copula: latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copulas: overview & comparison | [[Vine Copulas - Overview]] | overview | Dependence Measures | PCC decomposes joint density into $d(d-1)/2$ bivariate copulas; analytical likelihood; contrast with factor copulas |
| PCC density decomposition & $h$-functions | [[Pair-Copula Construction]] | definition | Vine Copulas - Overview | Product-form density; $h$-function is $\partial C/\partial v$; simplifying assumption enables tractable likelihood |
| C-vine, D-vine, R-vine structures | [[C-Vine and D-Vine Structures]] | definition | Pair-Copula Construction | C-vine = star (central driver); D-vine = path (sequential/time series); MST R-vine = empirically selected |
| Vine estimation, selection, truncation | [[Vine Copula Estimation and Selection]] | theorem | C-Vine and D-Vine Structures | Sequential tree-by-tree MLE; family selection by AIC/BIC; MST structure selection; $K$-truncation |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: PCC motivation (flexible bivariate-level control), comparison table with factor copulas (density form, estimation, tail dependence, scalability), three-variable C-vine illustration.
- [[Pair-Copula Construction]] — CONTAINS: density factorisation via conditioning, $h$-function definition and closed forms for Gaussian/Student-$t$/Clayton/Gumbel, simplifying assumption (when it holds, how to test it), D-vine 3-variable worked example.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine star structure (root ordering, pair table for $d=4$), D-vine path structure (pair table for $d=4$, general pattern), R-vine proximity condition, when to use C vs D vs MST R-vine, equity-returns and time-series examples.
- [[Vine Copula Estimation and Selection]] — CONTAINS: sequential tree-by-tree MLE theorem, bivariate copula family menu (Gaussian/Student-$t$/Clayton/Gumbel/Frank/Joe/BB1 with tail-dependence characterisation), MST structure selection algorithm (Dissmann et al. 2013), truncation AIC/BIC choice, software table (`VineCopula`, `rvinecopulib`, `pyvinecopulib`).

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copula-Synthesis-Survey.md]] — Synthesis survey (2026-08-21) from Aas et al. (2009), Bedford & Cooke (2001, 2002), Czado (2019), Czado & Nagler (2022), Dissmann et al. (2013). PDFs blocked by egress policy; survey created from training knowledge.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
