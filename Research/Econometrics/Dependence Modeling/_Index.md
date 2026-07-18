---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-18
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: **factor copulas** (Oh & Patton 2012, 6 notes) for very high dimensions and **vine copulas** (Aas et al. 2009; Bedford & Cooke 2002, 4 notes) for moderate dimensions with heterogeneous pairwise dependence. The [[Copula Architecture Comparison]] note guides architecture selection.
>
> **Factor copula cluster:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copula cluster:**
> - Need the PCC idea, the h-function, and a 3-variable illustration? → [[Vine Copulas - Overview]]
> - Need C-vine vs D-vine tree structures and the proximity condition? → [[C-Vine and D-Vine Structures]]
> - Need bivariate copula families, sequential MLE, or AIC selection? → [[Pair Copula Selection and Estimation]]
> - Need to choose between factor, vine, Gaussian/t, and Archimedean copulas? → [[Copula Architecture Comparison]]

## Concept Map

### Factor Copula Cluster (Oh & Patton 2012)

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |

### Vine Copula Cluster (Aas et al. 2009; Bedford & Cooke 2002)

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| PCC idea & h-function | [[Vine Copulas - Overview]] | overview | — | Joint density = product of marginals × $n(n-1)/2$ bivariate copula densities indexed by a vine |
| C-vine, D-vine, R-vine trees | [[C-Vine and D-Vine Structures]] | definition | Vine Overview | Proximity condition; C-vine: star (one dominant var); D-vine: chain (natural ordering); R-vine: general |
| Bivariate families & sequential MLE | [[Pair Copula Selection and Estimation]] | concept | C-vine and D-vine Structures | Sequential MLE tree-by-tree; h-function propagates conditioning; AIC family selection per pair |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | Factor: 100+ dims, SMM, parsimonious; Vine: 5–40 dims, MLE, heterogeneous; decision framework |

## Notes

### Factor Copula Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copula Notes (added 2026-07-18)

- [[Vine Copulas - Overview]] — CONTAINS: PCC idea (pair-copula factorisation), Sklar at each tree level, 3-variable C-vine and D-vine examples, h-function definition, Norwegian financial data example, position vs factor/Gaussian/Archimedean copulas.
- [[C-Vine and D-Vine Structures]] — CONTAINS: regular vine definition (Bedford & Cooke 2002), proximity condition, C-vine general density formula (star topology), D-vine general density formula (chain topology), R-vine structure matrix, maximum-spanning-tree structure selection, 4-variable C-vine and D-vine edge listing.
- [[Pair Copula Selection and Estimation]] — CONTAINS: sequential MLE algorithm (5 steps), h-function formula and Clayton example, simplifying assumption (definition and testability), bivariate copula family table (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, BB1, BB7, survival rotations, independence), AIC/BIC family selection, VineCopula R code, 3-variable D-vine worked example.
- [[Copula Architecture Comparison]] — CONTAINS: architecture comparison table (dimension, parameters, heterogeneity, density, tail dep, asymmetry, estimation, software), factor copula architecture definition, vine copula architecture definition, decision framework (dimension/factor story/density requirements), S&P 100 factor copula example, Norwegian D-vine example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Aas2009-Bedford2002-Czado2019-Synthesis.md]] — Synthesis survey: Aas et al. (2009) "Pair-copula constructions of multiple dependence" (*Insur.: Math. Econ.*, 44(2):182–198); Bedford & Cooke (2002) "Vines — a new graphical model" (*Ann. Statist.*, 30(4):1031–1068); Czado (2019) *Analyzing Dependent Data with Vine Copulas* (Springer). Created 2026-07-18 (academic PDF domains blocked by session network policy).

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
