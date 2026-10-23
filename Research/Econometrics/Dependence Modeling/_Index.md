---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-23
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional copula modelling for economic/financial variables. Two complementary model families are covered: **factor copulas** (Oh & Patton 2012; $n = 100$+, common-factor structure, SMM estimation) and **vine copulas** (Bedford & Cooke 2002; Aas et al. 2009; Dissmann et al. 2013; $n \leq 30$, pair-by-pair flexibility, sequential ML).
>
> **Factor copula track:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copula track:**
> - Need the overview and factor vs. vine comparison? → [[Vine Copulas - Overview]]
> - Need the PCC density formula and h-function recursion? → [[Pair Copula Construction and PCC Density]]
> - Need C-vine, D-vine, R-vine definitions and the proximity condition? → [[Regular Vine Structures - C-vine D-vine R-vine]]
> - Need MST structure selection, family selection, and software? → [[Vine Copula Model Selection and Estimation]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | Flexible high-dim copula from cascade of bivariate copulas; C-vine, D-vine, R-vine; suited for $n \leq 30$ |
| PCC density & h-function | [[Pair Copula Construction and PCC Density]] | concept | Vine Overview | $f(\mathbf{x}) = \prod f_k \cdot \prod c_{j,k\vert D}(F(x_j\vert\mathbf{x}_D), F(x_k\vert\mathbf{x}_D))$; h-function enables recursive conditional CDF computation |
| C/D/R-vine structures | [[Regular Vine Structures - C-vine D-vine R-vine]] | definition | Vine Overview, PCC | Proximity condition; C-vine = star; D-vine = path; R-vine = general; R-vine matrix |
| Vine model selection | [[Vine Copula Model Selection and Estimation]] | concept | C/D/R-vine, PCC | MST structure selection on $\vert\hat\tau\vert$; AIC family selection; truncated vines; VineCopula + pyvinecopulib |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: vine motivation, informal PCC definition, factor vs. vine comparison table, historical development timeline (Joe 1996 → Bedford & Cooke 2002 → Aas 2009 → Dissmann 2013 → Czado 2019).
- [[Pair Copula Construction and PCC Density]] — CONTAINS: 3-variable PCC density example, general PCC formula, h-function definition and closed forms (Gaussian, Student-$t$, Clayton, Gumbel, Frank), recursive evaluation algorithm, sequential ML estimator, simplifying assumption.
- [[Regular Vine Structures - C-vine D-vine R-vine]] — CONTAINS: regular vine definition (proximity condition), C-vine (star) and D-vine (path) definitions, 4-variable worked example for both, R-vine matrix representation, truncated vine definition, vine structure count table.
- [[Vine Copula Model Selection and Estimation]] — CONTAINS: MST structure-selection algorithm (Dissmann 2013), AIC family selection, candidate family table (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, BB1, rotations), sequential vs. full ML asymptotic properties, truncation level selection, VineCopula (R) and pyvinecopulib (Python) code snippets, factor vs. vine estimation comparison table.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/vine-copulas-sources.md]] — Bedford & Cooke (2002), Aas et al. (2009), Dissmann et al. (2013) citation survey. Source PDFs unavailable in this session (network policy); content drawn from comprehensive literature coverage.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
