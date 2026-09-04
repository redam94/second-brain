---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-09-04
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: **factor copulas** (Oh & Patton 2012, for $d = 100+$) and **vine copulas** (Aas et al. 2009, for flexible pairwise modelling at $d \leq 30$), plus a head-to-head architectural comparison.
> - Need the factor copula motivation and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the factor copula estimation method (SMM, no closed-form likelihood)? → [[SMM Estimation of Factor Copulas]]
> - Need the factor copula empirical results or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need vine copula motivation, pair-copula construction, or the general framework? → [[Vine Copulas - Overview]]
> - Need C-vine vs D-vine tree structures and density formulas? → [[Vine Copula Structures - C-vine and D-vine]]
> - Need vine copula estimation, model selection, or software (VineCopula, pyvinecopulib)? → [[Vine Copula Estimation]]
> - Need to choose between copula architectures (factor vs vine vs Gaussian/t vs Archimedean)? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula framework | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | $\binom{d}{2}$ pair-copula decomposition; exact density; flexible per-pair family choice; Bedford-Cooke R-vine |
| C-vine & D-vine structures | [[Vine Copula Structures - C-vine and D-vine]] | concept | Vine Copulas - Overview | C-vine: star trees (one dominant variable); D-vine: path trees (ordered sequence); density formulas for both |
| Vine estimation & software | [[Vine Copula Estimation]] | concept | Vine Structures | Sequential MLE tree-by-tree; structure selection via max-spanning tree of $\|\hat\tau\|$; VineCopula/pyvinecopulib |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Copulas - Overview, Factor Copulas - Overview | Decision table: factor copula for $d\geq50$; vine for $d\leq30$ with heterogeneous pairwise; Gaussian/t as baselines |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: PCC definition, R-vine definition, simplifying assumption, C-vine vs D-vine vs factor copula comparison table, trivariate worked example, h-function recursion.
- [[Vine Copula Structures - C-vine and D-vine]] — CONTAINS: D-vine density formula, C-vine density formula, $d=4$ worked examples for both, C/D/R-vine comparison table, truncated vines, natural use cases.
- [[Vine Copula Estimation]] — CONTAINS: two-stage IFM, structure selection (max-spanning tree), sequential MLE, full MLE, mBICV, GOF tests, R code (VineCopula/rvinecopulib), Python code (pyvinecopulib).
- [[Copula Architecture Comparison]] — CONTAINS: architecture decision table (Gaussian/t vs Archimedean vs vine vs factor), when each wins, Gaussian copula failure in 2007-08 crisis, 10-asset portfolio worked example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/vine-copulas-sources.md]] — Sources log for vine copula notes (Aas et al. 2009, Bedford & Cooke 2002, Nagler 2024). PDFs exist at free URLs but could not be downloaded due to egress proxy policy; see log for URLs.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
