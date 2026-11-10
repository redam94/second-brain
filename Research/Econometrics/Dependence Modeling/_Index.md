---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-11-10
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: **factor copulas** (Oh & Patton 2012/2017, parsimonious, latent-factor structure, SMM estimation) and **vine copulas** (Bedford & Cooke 2002; Aas et al. 2009, flexible pair-copula constructions, MLE estimation).
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas (pair-copula constructions):**
> - Need the overview and comparison between copula architectures? → [[Vine Copulas - Overview]]
> - Need the PCC density formula, h-functions, and sequential estimation? → [[Pair-Copula Constructions]]
> - Need the graph-theoretic vine structure definitions (C-vine, D-vine, R-vine)? → [[Regular Vine Structures]]
> - Need the Dißmann structure-selection algorithm and R packages? → [[Vine Copula Estimation and Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula architectures | [[Vine Copulas - Overview]] | overview | Factor Copulas | C-vine/D-vine/R-vine vs factor copula: flexibility vs parsimony trade-off; $d(d-1)/2$ pair copulas |
| PCC density & h-function | [[Pair-Copula Constructions]] | definition | Vine Overview | Density = product of $d(d-1)/2$ bivariate conditional copulas; h-function $= \partial C/\partial v$ propagates conditional CDFs |
| Vine structure (graph theory) | [[Regular Vine Structures]] | definition | PCC | Bedford & Cooke proximity condition; star=C-vine, path=D-vine, general=R-vine |
| Vine structure selection & estimation | [[Vine Copula Estimation and Selection]] | concept | Regular Vine, PCC | Dißmann MST algorithm on $|\hat\tau|$; sequential MLE; AIC/BIC family selection; truncation; VineCopula / rvinecopulib R |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: PCC motivation, Sklar's theorem, C-vine/D-vine/R-vine types, copula architecture comparison table (Gaussian/$t$/factor/vine), simplifying assumption, 3-dim C-vine example.
- [[Pair-Copula Constructions]] — CONTAINS: h-function definition, h-functions for Gaussian/Clayton/Gumbel/$t$, D-vine density formula (Aas 2009 Eq. 10), C-vine density formula (Eq. 11), h-function recursion, sequential MLE, 4-dim D-vine worked example, simulation via inverse Rosenblatt.
- [[Regular Vine Structures]] — CONTAINS: Bedford & Cooke vine definition, proximity condition, R-vine definition, C-vine (star) definition, D-vine (path) definition, R-vine matrix encoding, C/D/R-vine comparison table, $d=4$ and $d=5$ examples.
- [[Vine Copula Estimation and Selection]] — CONTAINS: Dißmann greedy MST algorithm, pair copula family selection (AIC/BIC), truncation at level $m$, estimation strategies table (sequential/full MLE/IFM/CML), VineCopula and rvinecopulib R code, GoF diagnostics, Vuong test.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- Aas, Czado, Frigessi & Bakken (2009) — "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2), 182–198. (PDF not downloaded: host blocked by network policy)
- Bedford & Cooke (2002) — "Vines — a new graphical model for dependent random variables", *Annals of Statistics* 30(4), 1031–1068. Open access at Project Euclid. (PDF not downloaded: host blocked)
- Dißmann, Brechmann, Czado & Kurowicka (2013) — "Selecting and estimating regular vine copulae and application to financial returns", *CSDA* 59(1), 52–69. arXiv:1202.2002. (PDF not downloaded: host blocked)
- Czado (2019) — *Analyzing Dependent Data with Vine Copulas*, Springer Lecture Notes in Statistics 222.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
