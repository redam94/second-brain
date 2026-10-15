---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-15
concept_count: 9
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two architectures: (1) **Factor copulas** (Oh & Patton 2012) — latent factor structure, SMM estimation, best for $d=100+$; (2) **Vine/pair copulas** (Aas et al. 2009) — cascade of bivariate copulas on a tree sequence, sequential MLE, best for moderate $d$ with heterogeneous pairwise dependence.
> - Need the factor copula motivation and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the factor copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the factor copula estimation method (SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need vine/pair copula motivation and comparison with factor copulas? → [[Vine Copulas - Overview]]
> - Need C-vine, D-vine, R-vine formal definitions and structure? → [[Regular Vine Structures]]
> - Need the h-function, vine density, sequential MLE, or Dißmann algorithm? → [[Vine Copula Density and Inference]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| **Vine copula motivation** | [[Vine Copulas - Overview]] | overview | Factor Copulas | Pair-copula construction; any bivariate family per pair; contrast with factor structure; D-vine/C-vine types |
| **C-vine, D-vine, R-vine** | [[Regular Vine Structures]] | definition | Vine Overview | Proximity condition; C-vine = star trees; D-vine = path trees; $d(d-1)/2$ pairs in $d-1$ trees |
| **H-function, density, estimation** | [[Vine Copula Density and Inference]] | concept | Vine Structure | H-function = $\partial C_{12}/\partial u_2$; R-vine density formula; sequential MLE (Aas 2009); Dißmann MST selection |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: motivation (alternatives to factor copulas), pair-copula construction (PCC) core idea, factor vs. vine comparison table, D-vine 4-variable example, cross-references to adjacent architecture notes.
- [[Regular Vine Structures]] — CONTAINS: vine (informal) definition, R-vine formal definition (proximity condition), C-vine (star trees, density formula), D-vine (path trees, density formula), comparison table, edge notation (conditioned/conditioning sets), 4-variable D-vine vs. C-vine worked example.
- [[Vine Copula Density and Inference]] — CONTAINS: h-function definition, closed-form h-functions for Gaussian/$t$/Clayton/Gumbel, R-vine density formula, log-likelihood, simplifying assumption, sequential MLE algorithm, Dißmann greedy MST algorithm with AIC family selection, truncation, software (VineCopula, rvinecopulib, pyvinecopulib).

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- Aas, Czado, Frigessi & Bakken (2009) — "Pair-copula constructions of multiple dependence," *Insurance: Mathematics and Economics*, 44(2), 182–198. Working paper version: LMU Munich SFB 386 Paper 487 (2006). [PDF not downloadable in this session due to proxy policy; notes written from training knowledge.]
- Bedford & Cooke (2001, 2002) — "Probability density decomposition for conditionally dependent random variables modeled by vines" (*Ann. Math. AI*); "Vines — a new graphical model for dependent random variables" (*Ann. Statistics*). Mathematical foundations.
- Dißmann, Brechmann, Czado & Kurowicka (2013) — "Selecting and estimating regular vine copulae and application to financial returns," *Computational Statistics & Data Analysis*, 59, 52–69. Greedy MST selection algorithm.
- Czado (2019) — *Analyzing Dependent Data with Vine Copulas: A Practical Guide with R*, Springer.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
