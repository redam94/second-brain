---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-30
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two complementary approaches: (1) **Factor copulas** (Oh & Patton 2012) — parsimony via a latent factor structure, estimated by SMM; and (2) **Vine copulas** (Bedford & Cooke 2002; Aas et al. 2009) — flexibility via bivariate pair-copula building blocks on a graphical tree structure, estimated by sequential MLE.
>
> **Factor copulas (Oh & Patton 2012):**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas (Bedford & Cooke 2002; Aas et al. 2009):**
> - Need the motivation and comparison with factor copulas? → [[Vine Copulas - Overview]]
> - Need the tree structure (R-vine, C-vine, D-vine, proximity condition)? → [[Regular Vine Structures]]
> - Need the density formula and h-function recursion? → [[Pair Copula Construction]]
> - Need estimation, family selection, and R/Python code? → [[Vine Copula Estimation and Model Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| **Vine copulas** | | | | |
| Vine copula motivation & comparison | [[Vine Copulas - Overview]] | overview | Factor Copulas Overview | PCC decomposes $d$-dim copula into $d(d-1)/2$ bivariate pieces; any family per edge; simplifying assumption; comparison with factor copulas |
| R-vine/C-vine/D-vine structures | [[Regular Vine Structures]] | definition | Vine Copulas Overview | Proximity condition; star (C-vine) vs path (D-vine) vs general (R-vine); edge labels = conditioned + conditioning sets |
| Density formula & h-functions | [[Pair Copula Construction]] | theorem | Regular Vine Structures | PCC density = product of bivariate copulas at conditional CDFs; h-function $= \partial C/\partial v$; recursive computation |
| Estimation, family selection, software | [[Vine Copula Estimation and Model Selection]] | concept | Pair Copula Construction | Sequential MLE; greedy MST structure selection; AIC/BIC family per edge; `rvinecopulib` R/Python |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: PCC density formula, simplifying assumption, factor-vs-vine comparison table, trivariate example.
- [[Regular Vine Structures]] — CONTAINS: vine definition, proximity condition, edge-label notation (conditioned/conditioning sets), C-vine (star) and D-vine (path) definitions, R-vine (general), vine count table for small $d$.
- [[Pair Copula Construction]] — CONTAINS: h-function definition and table for 5 copula families, PCC density theorem, h-function recursion, sampling algorithm, four-variable D-vine example.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: sequential MLE algorithm (Aas et al.), full MLE, MST structure selection (Dißmann et al.), AIC/BIC family selection, truncated vines, `rvinecopulib` and `VineCopula` R code with function reference.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/vine-copula-references.md]] — Bedford & Cooke (2002), Aas et al. (2009), and related vine copula references. PDFs were located at open-access URLs (Project Euclid, LMU Munich working-paper repository) but domain access was blocked by session network policy.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
