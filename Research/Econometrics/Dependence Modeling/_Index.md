---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-11-03
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major architectures: **factor copulas** (Oh & Patton 2012) — latent factor structure, SMM estimation, scalable to N=100+ — and **vine copulas** (Aas et al. 2009; Bedford & Cooke 2001) — pair-copula decomposition, sequential MLE, flexible per-pair families.
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas:**
> - Need the motivation and factor-vs-vine comparison? → [[Vine Copulas - Overview]]
> - Need the pair-copula density decomposition and h-function? → [[Pair-Copula Decomposition]]
> - Need the C-vine vs D-vine tree structures? → [[C-Vine and D-Vine Structures]]
> - Need estimation (sequential MLE), tree selection, and software? → [[Vine Copula Estimation and Selection]]

## Concept Map

### Factor Copulas (Oh & Patton 2012)

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |

### Vine Copulas (Aas et al. 2009; Bedford & Cooke 2001)

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & architecture comparison | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | d(d-1)/2 bivariate building blocks; flexible per-pair families; contrast with factor structure |
| Density decomposition & h-functions | [[Pair-Copula Decomposition]] | theorem | Vine Copulas - Overview | Joint density = product of marginals × pair-copula densities; h-function: $h(x|v,θ) = ∂C_{XV}/∂F(v)$ |
| C-vine and D-vine tree structures | [[C-Vine and D-Vine Structures]] | definition | Pair-Copula Decomposition | C-vine: star trees (key variable); D-vine: path trees (serial ordering); R-vine: general MST |
| Sequential estimation & selection | [[Vine Copula Estimation and Selection]] | concept | C-Vine and D-Vine, Pair-Copula Decomposition | Sequential MLE tree-by-tree; MST structure selection; VineCopula/pyvinecopulib |

## Notes

### Factor Copula Notes
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copula Notes (added 2026-11-03)
- [[Vine Copulas - Overview]] — CONTAINS: curse of dimensionality motivation; factor vs vine architecture comparison table; Joe (1996) / Bedford-Cooke origin; 3-variable decomposition example.
- [[Pair-Copula Decomposition]] — CONTAINS: general density decomposition theorem; h-function definition (Rosenblatt transform); D-vine density formula (eq. 4 of Aas et al.); C-vine density formula (eq. 3); simplifying assumption; h-function examples for Gaussian and Clayton copulas; simulation algorithm.
- [[C-Vine and D-Vine Structures]] — CONTAINS: regular vine definition (proximity condition); C-vine star structure; D-vine path structure; 4-dimensional C-vine and D-vine example with all 6 pair-copulas listed; R-vine overview; comparison table; application examples (market factor C-vine; temporal D-vine).
- [[Vine Copula Estimation and Selection]] — CONTAINS: three-layer specification (marginals, structure, families); empirical PIT pseudo-observations; maximum spanning tree (MST) algorithm (Dißmann et al. 2013); sequential MLE tree-by-tree; independence pruning; VineCopula R package; pyvinecopulib Python package; vine MLE vs factor SMM comparison table.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-Czado-Frigessi-Bakken-2009-Pair-Copula-Constructions.md]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2), 182–198. [Citation stub; PDF not downloadable from this session due to network policy blocking academic domains.]
- [[raw/Czado-2010-Pair-Copula-Constructions-Survey.md]] — Czado (2010), "Pair-copula constructions of multivariate copulas", in *Dependence Modeling: Vine Copula Handbook*; and Czado (2019), *Analyzing Dependent Data with Vine Copulas*, Springer. [Citation stub.]

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
