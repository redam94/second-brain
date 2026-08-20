---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-08-20
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary approaches: **factor copulas** (Oh & Patton 2012, $n \leq 500$) and **vine copulas** (Aas et al. 2009, $n \lesssim 30$).
>
> **Factor copulas (Oh & Patton 2012):**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas / pair-copula construction (Aas et al. 2009):**
> - Need motivation and comparison with factor copulas? → [[Vine Copulas - Overview]]
> - Need the factorisation theorem, h-function, and simplifying assumption? → [[Pair-Copula Construction]]
> - Need C-vine vs D-vine vs R-vine graphical structures? → [[C-vine and D-vine Structures]]
> - Need the sequential MLE pipeline, family selection, and R/Python software? → [[Vine Copula Estimation and Model Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Factor copula motivation | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation (factor) | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | $\binom{n}{2}$ pair copulas; per-pair family flexibility; limited to $n \lesssim 30$ |
| Pair-copula factorisation | [[Pair-Copula Construction]] | definition | Vine Overview | h-function recursion; density = product of marginals × pair copula densities; simplifying assumption |
| C-vine & D-vine | [[C-vine and D-vine Structures]] | definition | Pair-Copula Construction | C-vine: star trees (one root hub); D-vine: path trees (sequential ordering); R-vine: general |
| Vine estimation & selection | [[Vine Copula Estimation and Model Selection]] | concept | C-vine & D-vine | Sequential MLE; MST structure selection; AIC family selection; `VineCopula` / `pyvinecopulib` |

## Notes

### Factor Copulas (Oh & Patton 2012)
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copulas / PCC (Aas et al. 2009; Bedford & Cooke 2002)
- [[Vine Copulas - Overview]] — CONTAINS: curse of dimensionality in copula modelling, historical development (Joe 1996 → Bedford & Cooke → Aas et al.), copula landscape comparison table (Gaussian/$t$/Archimedean/vine/factor), 4-variable worked example.
- [[Pair-Copula Construction]] — CONTAINS: vine density factorisation theorem, $n=3$ and $n=4$ D-vine decompositions, h-function definition and closed-form expressions per family (Gaussian/$t$/Clayton/Gumbel), simplifying assumption definition and conditions.
- [[C-vine and D-vine Structures]] — CONTAINS: regular vine definition (proximity condition, conditioned/conditioning sets), C-vine (star trees, root selection, 4-variable example), D-vine (path trees, ordering, 4-variable example), R-vine (max spanning tree algorithm, Dißmann 2013), comparison table.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: three-stage pipeline (marginals→structure→pair copulas), pseudo-observations (IFM), MST structure selection algorithm, sequential MLE (tree-by-tree), full MLE vs sequential comparison, AIC/BIC family selection, vine truncation, software table (VineCopula/CDVine/vinecopulib/pyvinecopulib), 5-variable worked example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-Czado-Frigessi-Bakken-2009-Vine-Copulas.md]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2): 182–198. Also covers Bedford & Cooke (2002) vine graphical theory. Source PDFs blocked by network policy; note contains comprehensive summary from literature knowledge.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
