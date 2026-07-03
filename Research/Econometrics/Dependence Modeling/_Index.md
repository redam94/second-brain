---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-03
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: **factor copulas** (Oh & Patton 2012, $n\geq50$, parsimonious latent-factor structure) and **vine copulas** (Aas et al. 2009; Bedford & Cooke 2002, $n\lesssim20$, flexible pair-copula constructions). Includes tail-dependence theory, SMM/sequential-MLE estimation, the S&P 100 application, and an architecture comparison.
> - Need the big picture of factor copulas? → [[Factor Copulas - Overview]]
> - Need the latent factor model? → [[Factor Copula Construction]]
> - Need tail-dependence formulas (crashes more correlated than booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need factor copula SMM estimation? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical results or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need the vine copula idea and landscape? → [[Vine Copulas - Overview]]
> - Need the pair-copula density factorization and h-function? → [[Pair-Copula Construction]]
> - Need C-vine, D-vine, or R-vine tree structures? → [[C-Vine and D-Vine Structures]]
> - Need vine estimation (sequential MLE, AIC, truncation) and R/Python code? → [[Vine Copula Estimation and Software]]
> - Need to decide between vine, factor, and elliptical copulas? → [[High-Dimensional Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution (factor) | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation (factor) | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); $J$-test |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | Pair-copula construction for $n\lesssim20$: $n(n-1)/2$ bivariate copulas, freely chosen family per pair |
| Pair-copula factorization & h-function | [[Pair-Copula Construction]] | definition + theorem | Vine Overview | Bedford-Cooke theorem: joint density = product of pair copulas on conditional CDFs; h-function is $\partial C/\partial v$ |
| C-vine, D-vine, R-vine structures | [[C-Vine and D-Vine Structures]] | definition | Pair-Copula Construction | C-vine: star root; D-vine: path; R-vine: MST each level; R-vine matrix encodes all |
| Vine estimation & software | [[Vine Copula Estimation and Software]] | concept | C/D/R-vine Structures | Sequential MLE tree-by-tree; AIC family selection; truncation; VineCopula R + pyvinecopulib Python |
| Architecture comparison | [[High-Dimensional Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | Vine for $n\lesssim20$; factor for $n\geq50$; Gaussian for quick benchmark; decision flowchart |

## Notes

### Factor Copulas (Oh & Patton 2012)

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copulas (Aas et al. 2009; Bedford & Cooke 2002)

- [[Vine Copulas - Overview]] — CONTAINS: pair-copula construction concept; vine vs factor vs elliptical vs Archimedean landscape table; simplifying assumption; trivariate example.
- [[Pair-Copula Construction]] — CONTAINS: Bedford-Cooke density factorization theorem; h-function definition with closed-form Gaussian/$t$/Clayton cases; trivariate C-vine and D-vine density formulas; simplifying assumption definition.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine (star graph, root conditioning) definition; D-vine (path graph) definition; R-vine (general MST) definition; R-vine matrix; 4-variable C-vine vs D-vine pair-copula table; equidependence as a special case.
- [[Vine Copula Estimation and Software]] — CONTAINS: sequential MLE algorithm (5 steps); copula family table (Gaussian/$t$/Clayton/Gumbel/Frank/Joe/BB1); AIC/BIC family selection; independence pre-test; truncation procedure; VineCopula R code; pyvinecopulib Python code; 5-variable D-vine worked example.
- [[High-Dimensional Copula Architecture Comparison]] — CONTAINS: 6-row architecture summary table; when-to-use-vine criteria; when-to-use-factor criteria; when-to-use-elliptical criteria; practical decision flowchart; S&P 100 example (factor wins, $n=100$); FX example (vine wins, $n=5$).

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Aas-BedfordCooke-Survey.md]] — Survey synthesis: Aas et al. (2009) Insurance: Math. & Econ. 44:182-198; Bedford & Cooke (2002) Ann. Stat. 30:1031-1068; Czado (2010) Springer LNS 198; Dißmann et al. (2013) CSDA 59:52-69. Free PDFs located at LMU ePub, Project Euclid, TUM Mediatum, arXiv:1202.2002; downloads blocked by session network policy.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
