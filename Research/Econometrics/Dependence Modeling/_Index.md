---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-13
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two architectures covered: **factor copulas** (Oh & Patton 2012 — parsimonious, SMM-estimated, scales to $N=100+$) and **vine copulas / pair-copula constructions** (Bedford & Cooke 2002; Aas et al. 2009 — flexible, MLE-estimated, $N \leq 30$ without truncation).
> - Need the motivation and contribution of factor copulas? -> [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? -> [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? -> [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? -> [[Multi-Factor and Block Dependence Structures]]
> - Need the factor copula estimation method (rank-based SMM)? -> [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? -> [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need vine copulas / pair-copula constructions (Bedford-Cooke, PCC)? -> [[Vine Copulas - Overview]]
> - Need C-vine and D-vine tree structures, or the h-function recursion? -> [[C-Vine and D-Vine Structures]]
> - Need vine estimation (sequential MLE, Dissmann structure selection, rvinecopulib)? -> [[Vine Copula Estimation and Selection]]
> - Need to choose between factor and vine copula architectures? -> [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine graphical model | [[Vine Copulas - Overview]] | overview | — | Bedford-Cooke vine: $n(n-1)/2$ bivariate copulas over tree sequence; any bivariate copula family per edge |
| C-vine and D-vine | [[C-Vine and D-Vine Structures]] | definition | Vine Overview | C-vine: star structure; D-vine: path structure; h-function recursion for conditional CDFs |
| Vine estimation | [[Vine Copula Estimation and Selection]] | concept | Vine Overview, C/D-Vine | Sequential MLE; Dissmann max-spanning-tree structure; AIC/BIC family selection; truncation; rvinecopulib |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Factor Copulas Overview, Vine Overview | Factor = parsimonious, SMM, scales to $N=100$; Vine = flexible, MLE, $N \leq 30$ without truncation |

## Notes

### Factor Copulas (Oh & Patton 2012)
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copulas / Pair-Copula Constructions (Bedford & Cooke 2002; Aas et al. 2009)
- [[Vine Copulas - Overview]] — CONTAINS: vine graphical model (Bedford & Cooke 2002), density factorization theorem, four-variable D-vine example, simplifying assumption, position vs Gaussian/$t$/Archimedean/factor copulas.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine star structure (explicit $n$-variable density formula), D-vine path structure (explicit $n$-variable density formula), C-vine vs D-vine choice table, h-function definition and closed forms for Gaussian/Clayton/$t$ copulas, conditional CDF recursion algorithm.
- [[Vine Copula Estimation and Selection]] — CONTAINS: sequential MLE algorithm (tree-by-tree, h-function pseudo-observations), joint MLE, Dissmann (2013) max-spanning-tree structure selection, bivariate family menu (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, BB1, BB7), AIC/BIC selection, independence truncation test, rvinecopulib + VineCopula R code example.
- [[Copula Architecture Comparison]] — CONTAINS: 9-dimension comparison table (structure, parameters, density form, estimation, tail dependence, interpretation, scalability, model selection, software), when-to-use-factor and when-to-use-vine guidelines, tail-dependence comparison (global vs pair-specific), S&P 100 and 5-stock illustrative examples.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-Czado-2009-Vine-Copula-Survey.md]] — Synthesis survey: Aas, Czado, Frigessi & Bakken (2009) Insurance: Mathematics and Economics 44:182-198; Bedford & Cooke (2002) Annals of Statistics 30:1031-1068; Dissmann et al. (2013) Computational Statistics & Data Analysis 59:52-69. (Source PDFs unavailable due to session network policy; synthesised from training knowledge.)

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
