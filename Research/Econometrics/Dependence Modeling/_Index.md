---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-08-11
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers both **factor copulas** (Oh & Patton 2012/2017: latent-variable approach, scalable to N=100+, SMM estimation) and **vine copulas** (Aas, Czado, Frigessi & Bakken 2009: pair copula constructions, C-vine/D-vine architectures, MLE estimation, heterogeneous pair-wise dependence).
> - Need the motivation and big picture for factor copulas? -> [[Factor Copulas - Overview]]
> - Need the latent factor model defining the factor copula? -> [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms) for factor copulas? -> [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? -> [[Multi-Factor and Block Dependence Structures]]
> - Need factor copula SMM estimation (no closed-form likelihood)? -> [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical results or systemic risk application? -> [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need vine copula overview and motivation? -> [[Vine Copulas - Overview]]
> - Need the pair copula construction (PCC) density factorisation and h-functions? -> [[Pair Copula Constructions]]
> - Need C-vine (star) vs D-vine (path) tree architectures? -> [[C-Vine and D-Vine Architectures]]
> - Need to choose between vine and factor copula architectures? -> [[Vine vs Factor Copula Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution (factor) | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview & motivation | [[Vine Copulas - Overview]] | overview | — | Vine = $N(N-1)/2$ pair copulas via graphical trees; flexible but $N\lesssim 30$; Aas et al. 2009 |
| PCC density factorisation & h-functions | [[Pair Copula Constructions]] | definition | Vine Overview | Joint density = product of bivariate copula densities; h-function recursion enables sequential MLE |
| C-vine & D-vine tree structures | [[C-Vine and D-Vine Architectures]] | definition | PCC, Vine Overview | C-vine = star (root drives all); D-vine = path (adjacent pairs at Tree 1); truncated vine for $N > 30$ |
| Architecture comparison | [[Vine vs Factor Copula Comparison]] | concept | Vine Overview, Factor Overview | Factor: parsimonious/scalable/homogeneous tails; Vine: flexible/heterogeneous/MLE-tractable; factor = degenerate C-vine with latent root |

## Notes

**Factor Copula Cluster (Oh & Patton 2012/2017):**
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

**Vine Copula Cluster (Aas, Czado, Frigessi & Bakken 2009):**
- [[Vine Copulas - Overview]] — CONTAINS: motivation vs. Archimedean/Gaussian/factor alternatives, PCC definition, R-vine definition, h-function definition, simplifying assumption, 4-variable D-vine example.
- [[Pair Copula Constructions]] — CONTAINS: PCC density factorisation theorem, h-function definition and closed-form table for Gaussian/$t$/Clayton/Gumbel, sequential MLE algorithm (tree-by-tree), AIC/BIC copula-family selection, full pair copula family table with tail dependence coefficients, 3-variable PCC example.
- [[C-Vine and D-Vine Architectures]] — CONTAINS: C-vine star-structure definition and density, D-vine path-structure definition and density, D-vine Markov interpretation for time series, C-vine vs D-vine comparison table, general R-vine, truncated vine, 4-variable examples for both.
- [[Vine vs Factor Copula Comparison]] — CONTAINS: full architecture comparison table (parameters, scalability, tail homogeneity, estimation, conditional independence), when-to-use guidance for each, factor-copula as degenerate C-vine with latent root conceptual note.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Aas-Czado-Survey.md]] — Synthesis survey (2026-08-11): Aas, Czado, Frigessi & Bakken (2009) IME; Bedford & Cooke (2001, 2002); Joe (1996); Czado (2010, 2019). Covers PCC density decomposition, h-function recursion, C-vine/D-vine structures, pair copula families with tail dependence, sequential MLE, vine vs. factor comparison.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
