---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-24
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major copula architectures for large $n$: **factor copulas** (Oh & Patton 2012, simulation-based SMM estimation, $n=100$) and **vine/pair copulas** (Bedford & Cooke 2002; Aas et al. 2009, closed-form likelihood, $n \lesssim 50$).
> - Need the factor-copula big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model? → [[Factor Copula Construction]]
> - Need tail-dependence coefficients for factor copulas? → [[Tail Dependence in Factor Copulas]]
> - Need multi-factor / block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the factor-copula estimation method (SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the factor-copula empirical study? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need the vine-copula big picture and architecture comparison? → [[Vine Copulas - Overview]]
> - Need the PCC density formula and h-function? → [[Pair Copula Construction]]
> - Need C-vine vs D-vine structure and density formulas? → [[C-vine and D-vine Structures]]
> - Need vine estimation (sequential/MLE) and model selection? → [[Vine Copula Estimation and Model Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution (factor) | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation (factor) | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview & comparison | [[Vine Copulas - Overview]] | overview | Factor Overview | Vine vs factor: vine closed-form density for $n \lesssim 50$; per-edge copula family choice; Bedford & Cooke (2002), Aas et al. (2009) |
| PCC density & h-function | [[Pair Copula Construction]] | definition/theorem | Vine Overview | PCC density = $\prod f_k \cdot \prod c_{ij|\mathcal{D}}$; h-function $= \partial C/\partial v$ propagates conditioning; Bedford & Cooke completeness |
| C-vine and D-vine structures | [[C-vine and D-vine Structures]] | definition | PCC | C-vine: star trees (hub variable); D-vine: path trees (ordered variables); explicit density formulas; $n(n-1)/2$ pair copulas |
| Vine estimation & selection | [[Vine Copula Estimation and Model Selection]] | concept/theorem | C-vine, D-vine, PCC | Sequential (tree-by-tree) and full MLE; structure selection (max spanning tree); per-edge family selection (AIC); VineCopula / pyvinecopulib |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: vine vs factor architecture comparison table, the vine programme (3-step), Bedford & Cooke completeness result, motivation (curse of dimensionality for standard copulas).
- [[Pair Copula Construction]] — CONTAINS: conditional pair copula definition, h-function formula and closed forms (Gaussian/Clayton/Student-$t$), PCC density theorem (Bedford & Cooke 2002), vine structure definition + proximity condition, 3-variable worked example, h-function recursion example.
- [[C-vine and D-vine Structures]] — CONTAINS: C-vine structure and density formula (Aas eq. 4), D-vine structure and density formula (Aas eq. 3), h-function recursion for C-vine, C vs D vs R-vine comparison table, $n=4$ worked examples, Norwegian financial data application.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: marginal estimation (GARCH/empirical), sequential estimation algorithm, full MLE theorem, structure selection (greedy root/ordering, max spanning tree), copula family table (Gaussian/t/Clayton/Gumbel/Frank/Joe/BB1) and AIC selection, goodness-of-fit tests (Vuong, Rosenblatt), software (VineCopula, pyvinecopulib), sequential vs MLE numerical comparison.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-Czado-2009-Pair-Copula-Constructions.txt]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2), 182–198. Free working paper version: LMU Munich SFB386 Paper 487 (2006).
- [[raw/Bedford-Cooke-2002-Vines-AnnStat.txt]] — Bedford & Cooke (2002), "Vines — a new graphical model for dependent random variables", *Annals of Statistics* 30(4), 1031–1068. Open Access on Project Euclid.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
