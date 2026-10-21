---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-21
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional copula modelling for economic/financial variables. Two major architectures: **factor copulas** (Oh & Patton 2012 — latent factor structure, SMM estimation, $d=100+$) and **vine copulas** (Aas et al. 2009; Bedford & Cooke 2002; Dißmann et al. 2013 — pair-copula construction, ML estimation, flexible). Covers construction, tail-dependence theory, multi-factor/block extensions, SMM estimation, S&P 100 application, vine structure selection, and architecture comparison.
> - Need the factor copula motivation and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the factor copula? → [[Factor Copula Construction]]
> - Need tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the SMM estimation method (no closed-form likelihood)? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical results or systemic risk measures? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need vine copula overview and motivation? → [[Vine Copulas - Overview]]
> - Need the pair-copula density formula and h-function? → [[Pair Copula Construction]]
> - Need C-vine vs D-vine structures and density formulas? → [[C-vine and D-vine Structures]]
> - Need data-driven vine structure selection (R-vine, greedy MST)? → [[R-vine Structures and Model Selection]]
> - Need to choose between copula architectures? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | $d(d-1)/2$ pair copulas in vine tree; any bivariate family per pair; ML estimated; flexible alternative to factor copulas |
| Pair copula construction | [[Pair Copula Construction]] | concept | Vine Overview | H-function recursion; sequential ML; general R-vine density as product of marginals × pair copula densities |
| C-vine and D-vine | [[C-vine and D-vine Structures]] | concept | PCC | C-vine (star, hub variable); D-vine (path, temporal ordering); explicit density formulas; $d(d-1)/2$ pair copulas |
| R-vine selection | [[R-vine Structures and Model Selection]] | concept | C/D-vine | Bedford-Cooke proximity condition; Dißmann greedy MST algorithm; truncated vines; VineCopula R package |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | All copula notes | Factor vs vine vs Gaussian/t/Archimedean; dimension-specific recommendations; factor for $d=100+$, vine for $d=10$–$50$ |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: PCC principle (Sklar applied recursively), vine as graphical structure (Bedford & Cooke), h-function definition, 3-variable worked example; positions vine vs factor copula architecture.
- [[Pair Copula Construction]] — CONTAINS: h-function definition and Gaussian/Clayton formulas, general vine density theorem, h-function recursion theorem, simplified vine assumption, sequential ML estimation procedure.
- [[C-vine and D-vine Structures]] — CONTAINS: C-vine definition (star, root ordering), C-vine density formula (Eq. 4), D-vine definition (path), D-vine density formula (Eq. 6), C-vine vs D-vine comparison table, 4-variable worked examples.
- [[R-vine Structures and Model Selection]] — CONTAINS: R-vine definition (proximity condition), R-vine matrix encoding, greedy MST selection algorithm (Dißmann et al. 2013), truncated vine copula, VineCopula/pyvinecopulib software, 16-dimensional application.
- [[Copula Architecture Comparison]] — CONTAINS: architecture table (Gaussian/$t$/grouped-$t$/Archimedean/factor/C-D-vine/R-vine), factor vs vine trade-off analysis, dimension-indexed recommendation table, S&P 100 and 16-dim application examples.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-et-al-2009-Pair-Copula-Constructions]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics*, 44(2), 182–198. (Reference stub; PDF blocked by proxy.)
- [[raw/Bedford-Cooke-2002-Vines-Graphical-Model]] — Bedford & Cooke (2002), "Vines: A new graphical model for dependent random variables", *Annals of Statistics*, 30(4), 1031–1068. Open access on Project Euclid. (Reference stub; PDF blocked by proxy.)
- [[raw/Dissmann-et-al-2013-RVine-Selection-Estimation]] — Dißmann, Brechmann, Czado & Kurowicka (2013), "Selecting and estimating regular vine copulae", *Computational Statistics & Data Analysis*, 59(1), 52–69. arXiv:1202.2002. (Reference stub; PDF blocked by proxy.)

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
