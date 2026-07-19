---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-19
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two major copula architectures are now covered: **factor copulas** (Oh & Patton 2012, for $N=100$+) and **vine/pair copulas** (Aas et al. 2009; Bedford & Cooke 2002, for $N\le 30$). A systematic comparison across all architectures is in [[Copula Architecture Comparison]].
>
> **Factor copulas** (Oh & Patton 2012):
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas** (Aas et al. 2009; Bedford & Cooke 2002) — *added 2026-07-19*:
> - Need the motivation and comparison with factor copulas? → [[Vine Copulas - Overview]]
> - Need the formal density and h-function machinery? → [[Pair Copula Construction]]
> - Need C-vine vs D-vine tree structures? → [[C-Vine and D-Vine Structures]]
> - Need estimation (sequential MLE), family selection, VineCopula/pyvinecopulib code? → [[Vine Copula Estimation and Selection]]
>
> **Choosing between architectures**:
> - Need a systematic comparison (dimension, tail dependence, estimation, best for)? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula motivation | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | $N(N-1)/2$ bivariate pair copulas; per-pair family flexibility; best for $N\le 30$ |
| Pair copula construction | [[Pair Copula Construction]] | definition | Vine Copulas - Overview | h-function $h(u,v;\theta)=\partial C/\partial v$ chains conditional CDFs through vine trees; closed-form likelihood |
| C-vine & D-vine | [[C-Vine and D-Vine Structures]] | definition | Pair Copula Construction | Star trees (C-vine: hub variable) vs path trees (D-vine: natural ordering); R-vine = general case |
| Vine estimation & selection | [[Vine Copula Estimation and Selection]] | theorem | C-Vine and D-Vine | Sequential MLE tree by tree; AIC family selection; MST structure selection (Dißmann et al. 2013); VineCopula R + pyvinecopulib Python |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Copulas - Overview, Factor Copulas - Overview | Dimension × parsimony × tail-dep × exchangeability × estimation: factor best for $N>30$, vine best for per-pair flexibility at $N\le 30$ |

## Notes

**Factor Copulas (Oh & Patton 2012):**
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

**Vine Copulas (Aas et al. 2009; Bedford & Cooke 2002) — added 2026-07-19:**
- [[Vine Copulas - Overview]] — CONTAINS: curse-of-dimensionality motivation, Sklar's theorem, PCC idea, regular vine definition (Bedford & Cooke 2002), simplifying assumption, parameter count, comparison with factor copulas.
- [[Pair Copula Construction]] — CONTAINS: PCC density (general form), 3-variable example (Joe 1996), 4-variable D-vine example, h-function definition, h-function table for 6 families (Gaussian, Student-$t$, Clayton, Gumbel, Frank, independence), recursive h-function computation algorithm, tail-dependence per family.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine structure and density (star trees, hub variable), D-vine structure and density (path trees, sequential ordering), R-vine proximity condition, C-vine market-factor example, D-vine yield-curve example, C-vine vs D-vine vs R-vine decision table, Aas et al. (2009) FX data example.
- [[Vine Copula Estimation and Selection]] — CONTAINS: sequential MLE algorithm (tree-by-tree), consistency theorem, AIC family selection, Kendall's $\tau$ pre-filter, Vuong test, independence truncation, MST structure selection (Dißmann et al. 2013), VineCopula R code (5 key functions), pyvinecopulib Python code, marginal estimation strategies.
- [[Copula Architecture Comparison]] — CONTAINS: Gaussian/Student-$t$ copula definitions, Archimedean copulas, factor copula recap, vine copula recap, systematic 7-column comparison table (parameter count, tail dep., exchangeability, estimation, max $N$, weakness, best for), decision rules per architecture, 7-variable portfolio AIC example, $N=100$ S&P 100 discussion.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copula-Survey.md]] — Synthesis survey (2026-07-19) from training knowledge of: Aas, Czado, Frigessi & Bakken (2009) [LMU Munich preprint]; Bedford & Cooke (2002) [*Annals of Statistics*]; Czado (2010) [TU Munich mediaTUM preprint]; Dißmann et al. (2013). External PDFs were proxy-blocked; survey created following the PSM (gap #1) precedent.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
