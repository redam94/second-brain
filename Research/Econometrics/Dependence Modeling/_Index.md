---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-20
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: **factor copulas** (Oh & Patton 2017 — parsimonious latent-factor approach, scalable to $d=100$) and **vine copulas** (Aas et al. 2009 — pair-copula constructions, $d(d-1)/2$ bivariate building blocks, closed-form density, flexible for $d \leq 20$).
> - Need the motivation and big picture for factor copulas? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the factor copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need SMM estimation of factor copulas? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical study and systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need the vine copula framework (pair-copula constructions, R-vine)? → [[Vine Copulas - Overview]]
> - Need C-vine and D-vine tree structures with density formulas? → [[C-vine and D-vine Structures]]
> - Need vine likelihood, sequential MLE, and model selection? → [[Vine Copula Density and Estimation]]
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
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | Pair-copula construction: $d(d-1)/2$ bivariate building blocks in nested tree (R-vine); closed-form density; flexible for $d \leq 20$–50 |
| C-vine and D-vine | [[C-vine and D-vine Structures]] | definition | Vine Overview | C-vine: star trees (dominant variable); D-vine: path trees (ordered/sequential data); $h$-function recursion for sampling and density evaluation |
| Vine estimation | [[Vine Copula Density and Estimation]] | concept | C/D-vine Structures | Sequential MLE (one tree at a time via $h$-functions); Dissmann max-spanning-tree structure selection; AIC/BIC family selection; `rvinecopulib` / `pyvinecopulib` |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | Decision guide: vine copulas for $d \leq 20$ (full flexibility); factor copulas for $d \geq 50$ (parsimony); Gaussian/t for large $d$ with symmetric assumptions |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: dimensionality problem in high-dim copulas, Sklar decomposition, pair-copula construction idea (Joe 1996), R-vine definition (Bedford & Cooke 2002), proximity condition, simplifying assumption, C-vine and D-vine as special cases; position vs Gaussian/$t$/Archimedean/factor copulas.
- [[C-vine and D-vine Structures]] — CONTAINS: C-vine star-tree structure, C-vine density formula, D-vine path-tree structure, D-vine density formula, $h$-function definition, D-vine and C-vine sampling algorithms, worked $d=4$ examples for both types.
- [[Vine Copula Density and Estimation]] — CONTAINS: vine log-likelihood formula, sequential MLE algorithm (Aas et al. 2009), full MLE, AIC/BIC family selection, Dissmann max-spanning-tree structure selection, truncated vines, R (`VineCopula`, `rvinecopulib`) and Python (`pyvinecopulib`) code, worked financial returns example.
- [[Copula Architecture Comparison]] — CONTAINS: architecture comparison table (Gaussian, $t$, Archimedean, vine, factor), elliptical copula properties, Archimedean generator table (Clayton/Gumbel/Frank), vine vs factor strengths/weaknesses, decision guide by dimensionality and data structure.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Survey.md]] — Synthesis survey (2026-07-20) covering Aas, Czado, Frigessi & Bakken (2009), Bedford & Cooke (2002), Joe (1996), Dissmann et al. (2013), Czado (2019), Czado & Nagler (2022). Network policy prevented direct PDF download; synthesis from training knowledge.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
