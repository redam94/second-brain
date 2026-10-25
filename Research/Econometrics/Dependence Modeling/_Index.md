---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-25
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two architectures: (1) **factor copulas** (Oh & Patton 2012) — parsimonious latent-factor structure, SMM estimation, for $n \geq 50$; (2) **vine copulas** (Aas et al. 2009) — flexible pair-copula constructions, MLE, for $n \leq 30$. The two sections are complementary; the Overview note compares them.
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas (added 2026-10-25):**
> - Need the architecture overview and comparison with factor copulas? → [[Vine Copulas - Overview]]
> - Need the regular vine tree structure and h-function recursion theorem? → [[Pair Copula Construction and Vine Trees]]
> - Need the explicit C-vine and D-vine density formulas? → [[C-vine and D-vine Density Formulas]]
> - Need sequential estimation, joint MLE, model selection, and software? → [[Vine Copula Estimation and Model Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| **Vine architecture & comparison** | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | $\binom{n}{2}$ bivariate copulae; more flexible than factor, but $O(n^2)$ params limit to $n \leq 30$; density available in closed form |
| R-vine trees & h-functions | [[Pair Copula Construction and Vine Trees]] | theorem | Vine Overview | Bedford-Cooke density factorization; h-function recursion computes conditional CDFs tree by tree |
| C-vine / D-vine formulas | [[C-vine and D-vine Density Formulas]] | theorem | Vine Trees | Explicit density products for star (C) and path (D) tree structures; conditioning sets and h-function arguments |
| Vine estimation & selection | [[Vine Copula Estimation and Model Selection]] | concept | C/D-vine Formulas | Sequential MLE (tree-by-tree), joint MLE; AIC/BIC family selection; Dissmann structure selection; VineCopula R / pyvinecopulib |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: PCC motivation, regular vine definition, C-vine vs D-vine overview, architecture comparison table (Gaussian/t/Archimedean/factor/vine), position vs. factor copulas in high dimensions.
- [[Pair Copula Construction and Vine Trees]] — CONTAINS: Bedford-Cooke density factorization theorem (with full formula), separating set / conditioned set definitions, h-function definition and closed-form table (Gaussian/$t$/Clayton/Gumbel/Frank), recursive conditional CDF computation theorem, 3-variable worked example.
- [[C-vine and D-vine Density Formulas]] — CONTAINS: C-vine star structure definition, C-vine density formula (full expansion for $n=4$), C-vine h-function recursion; D-vine path structure definition, D-vine density formula (full expansion for $n=4$), D-vine h-function recursion; C-vine market-index example; D-vine term-structure example.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: pseudo-observations / IFM setup, sequential (tree-by-tree) MLE algorithm, joint MLE, copula family selection (AIC/BIC/Vuong, tail dependence guide), Dissmann structure selection algorithm, truncated vine / independence test, VineCopula R and pyvinecopulib software, 4-asset D-vine worked example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-et-al-2009-pair-copula-constructions.txt]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2), 182-198. (PDF unavailable due to proxy policy; source info logged in .txt file. Free preprint at LMU Munich: https://epub.ub.uni-muenchen.de/1855/1/paper_487.pdf) Also draws on Bedford & Cooke (2001, 2002) regular vine theory and Brechmann & Schepsmeier (2013) JSS CDVine paper.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
