---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-08-01
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major copula architectures: **factor copulas** (Oh & Patton 2012 — latent factor structure, SMM estimation, analytical tail dependence, scales to $n=100$) and **vine copulas** (Aas et al. 2009; Bedford & Cooke 2002 — pair-copula decomposition, closed-form density, sequential MLE, best for moderate $n$ with heterogeneous pairwise structure).
> - Need the high-level comparison of copula architectures? → [[Vine Copulas - Overview]]
> - Need the factor copula motivation and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model $X_i=\beta_i Z+\varepsilon_i$? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (factor copulas, via EVT)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the SMM estimation method for factor copulas? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 / systemic risk application? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need the Bedford-Cooke pair-copula decomposition framework? → [[Pair Copula Construction and Regular Vines]]
> - Need C-vine (star trees) or D-vine (path trees) density formulas and h-functions? → [[C-vines and D-vines]]
> - Need vine structure selection (Dissmann algorithm) or sequential MLE? → [[Vine Copula Estimation and Model Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Copula architecture comparison | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | Factor vs vine: interpretability vs flexibility; SMM vs MLE; 16 params vs $n(n-1)/2$ pair-copulas |
| Pair-copula decomposition | [[Pair Copula Construction and Regular Vines]] | definition/theorem | Vine Overview | PCC density = $\prod f_k \cdot \prod c_{a,b\|D}(F(x_a\|x_D),F(x_b\|x_D))$; proximity condition for regular vines |
| C-vines and D-vines | [[C-vines and D-vines]] | definition | PCC | C-vine: star trees (root variable); D-vine: path trees (ordered variables); explicit density formulas; h-function recursion |
| Vine estimation & selection | [[Vine Copula Estimation and Model Selection]] | concept | C-vines and D-vines | Dissmann MST algorithm; sequential MLE tree-by-tree; AIC/BIC for copula family; VineCopula R package |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: copula landscape table (Gaussian/t/Archimedean/factor/vine), key properties of vine copulas (PCC flexibility, closed-form density, asymmetry, simplifying assumption, scalability), factor vs vine comparison table (params, density, estimation, tail structure, scale).
- [[Pair Copula Construction and Regular Vines]] — CONTAINS: regular vine definition (proximity condition, conditioned/conditioning sets), PCC density factorization theorem, simplifying assumption, parameter-count analysis, truncated vines, 3-variable worked example (C-vine vs D-vine constructions).
- [[C-vines and D-vines]] — CONTAINS: C-vine structure (star trees, root variable, density formula), D-vine structure (path trees, ordered variables, density formula), h-function (conditional distribution from bivariate copula), closed-form h-functions for Gaussian/$t$/Clayton/Gumbel, inverse h-function for simulation, 3-variable equity example.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: IFM / pseudo-MLE for marginals, Dissmann MST algorithm (edge weights $|\hat\tau|$, family selection by AIC, independence truncation), sequential MLE (tree-by-tree, consistency, not efficient), full MLE (efficient, expensive), Rosenblatt PIT diagnostics, VineCopula R package code, 4-variable sequential MLE worked example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/SOURCES-vine-copulas.md]] — Identified free sources for vine copula notes: Aas et al. (2009) [LMU Munich preprint], Bedford & Cooke (2002) [Project Euclid], Czado & Nagler (2022) [SSRN preprint], Dissmann et al. (2013) [TUM preprint]. Direct download blocked by session network policy; notes written from established mathematical content of these papers.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
