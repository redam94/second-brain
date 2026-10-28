---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-28
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: **factor copulas** (Oh & Patton 2012 — $d>100$, latent common shock, SMM estimation) and **vine copulas / pair-copula constructions** (Aas et al. 2009; Dissmann et al. 2013 — flexible pair-by-pair dependence, $d \le 30$, sequential MLE).
>
> **Factor Copulas:**
> - Motivation, contribution, and big picture → [[Factor Copulas - Overview]]
> - Latent factor model defining the copula → [[Factor Copula Construction]]
> - Analytical tail-dependence coefficients → [[Tail Dependence in Factor Copulas]]
> - Multiple factors, industry-block dependence → [[Multi-Factor and Block Dependence Structures]]
> - SMM estimation (no closed-form likelihood) → [[SMM Estimation of Factor Copulas]]
> - Empirical results, asymmetric dependence, systemic risk → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine Copulas (added 2026-10-28):**
> - What vine copulas are, why, contrast with factor copulas → [[Vine Copulas - Overview]]
> - The h-function recursion and density factorization → [[Pair-Copula Construction]]
> - C-vine (star) and D-vine (path) density formulas → [[C-Vine and D-Vine Structures]]
> - General R-vine matrix, truncated vines → [[R-Vine Matrices and Truncated Vines]]
> - Structure/family selection (Dissmann algorithm), sequential MLE, VineCopula R → [[Vine Copula Estimation and Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Factor copula motivation | [[Factor Copulas - Overview]] | overview | — | High-dim copula for 50+ vars; fat-tailed/asymmetric common factor |
| Factor copula construction | [[Factor Copula Construction]] | definition | Factor overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$; Gaussian closed-form gives equicorrelation |
| Factor tail dependence | [[Tail Dependence in Factor Copulas]] | theorem | Factor construction | Props 1-3: reg. varying tails → tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Factor construction | $K$-factor + block equidependence (16 params) → heterogeneous dependence |
| Factor SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Factor construction | Rank-moment SMM; consistent, asym. normal; $J$-test |
| Factor application | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | Factor SMM | Skew $t$-$t$ block copula best; crashes > booms; MES/$kES$ |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | PCC: $\binom{d}{2}$ bivariate copulas; arbitrary families; D-vine, C-vine, R-vine |
| h-function & density | [[Pair-Copula Construction]] | definition | Vine overview | $h(x\|v)=\partial C/\partial F(v)$; recursive conditional CDF; trivariate worked example |
| C-vine & D-vine | [[C-Vine and D-Vine Structures]] | definition | PCC | D-vine = path; C-vine = star; density formulas; 4-variable examples |
| R-vine matrix | [[R-Vine Matrices and Truncated Vines]] | definition | C/D-vine | Lower-triangular matrix encodes any vine; $K$-truncation for large $d$ |
| Vine estimation | [[Vine Copula Estimation and Selection]] | concept | R-vine matrix | Dissmann greedy algorithm (max spanning tree on $\|\hat\tau\|$); AIC/BIC family selection; sequential MLE |

## Notes

**Factor Copulas (Oh & Patton 2012):**
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table.
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Propositions 1-3, proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, empirical 8-factor block model (16 params).
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, consistency/normality theorem, bootstrap covariance, $J$-test.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo results (Tables 1-5), AR(1)-GJR-GARCH marginals, block estimates (Tables 8-10), MES & $kES$ systemic-risk measures (Table 11).

**Vine Copulas (Aas et al. 2009; Dissmann et al. 2013 — added 2026-10-28):**
- [[Vine Copulas - Overview]] — CONTAINS: PCC motivation, Joe/Bedford-Cooke lineage, contrast table vs factor copula and Gaussian/t copula.
- [[Pair-Copula Construction]] — CONTAINS: h-function definition, closed-form h-functions (Gaussian/$t$/Clayton/Gumbel), h-function recursion formula, trivariate worked example, simulation via $h^{-1}$.
- [[C-Vine and D-Vine Structures]] — CONTAINS: D-vine definition (path) and density formula, C-vine definition (star) and density formula, 4-variable worked examples for both, comparison table.
- [[R-Vine Matrices and Truncated Vines]] — CONTAINS: regular vine definition (Bedford & Cooke), vine matrix definition and encoding, density evaluation algorithm, $K$-truncated vine, C/D-vine as special-case matrices.
- [[Vine Copula Estimation and Selection]] — CONTAINS: pseudo-observation transform, Dissmann greedy algorithm (max spanning tree on $|\hat\tau|$), AIC/BIC family selection, sequential MLE, VineCopula R package, goodness-of-fit tests.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp.
- [[raw/aas2009-pair-copula-constructions.md]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence," *Insurance: Mathematics and Economics*, 44(2), 182–198. (PDF unreachable from session; free preprint at epub.ub.uni-muenchen.de)
- [[raw/dissmann2013-selecting-regular-vine-copulas.md]] — Dissmann, Brechmann, Czado & Kurowicka (2013), "Selecting and estimating regular vine copulae and application to financial returns," *CSDA*, 59(1), 52–69. arXiv:1202.2002. (PDF unreachable from session)

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory the factor copula paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
