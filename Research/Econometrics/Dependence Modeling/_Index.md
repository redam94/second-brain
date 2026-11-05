---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-11-05
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: **factor copulas** (Oh & Patton 2012 — parsimonious, latent-factor, scales to $N=100$) and **vine copulas** (Aas et al. 2009 — flexible pair-copula constructions for moderate $d$, C-vine and D-vine). A comparison note guides architecture selection.
> - Need the factor copula motivation and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model? → [[Factor Copula Construction]]
> - Need tail-dependence coefficients for factor copulas? → [[Tail Dependence in Factor Copulas]]
> - Need multi-factor/industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need factor copula estimation (rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical application? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need vine/pair-copula constructions (C-vine, D-vine)? → [[Vine Copulas - Overview]]
> - Need C-vine and D-vine density formulas and h-functions? → [[Vine Copula Structure and Tree Representation]]
> - Need vine estimation (sequential MLE, AIC selection, CDVine/VineCopula packages)? → [[Vine Copula Estimation and Model Selection]]
> - Need to choose between copula architectures? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula introduction | [[Vine Copulas - Overview]] | overview | — | Pair-copula construction via Bedford & Cooke vines; C-vine (star topology) vs D-vine (path topology); flexibility vs parsimony vs factor copula |
| C-vine/D-vine structure | [[Vine Copula Structure and Tree Representation]] | definition | Vine Copulas - Overview | Formal density decompositions; h-function $h(u|v;\theta)=\partial C/\partial v$ for recursive conditional CDF computation |
| Vine estimation & model selection | [[Vine Copula Estimation and Model Selection]] | concept | Vine structure | Sequential tree-by-tree MLE; AIC/BIC family selection; Dißmann structure selection; VineCopula/pyvinecopulib |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | All above | Decision table: elliptical, Archimedean, vine, factor; tail dependence, exchangeability, scalability, when to use each |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: Bedford & Cooke vine theory, C-vine vs D-vine overview, pair-copula key insight, factor-vs-vine comparison table (parameters, estimation, interpretability, scalability), literature position.
- [[Vine Copula Structure and Tree Representation]] — CONTAINS: D-vine tree structure (Def), D-vine density formula (Eq), 4-var D-vine worked example, C-vine tree structure (Def), C-vine density formula (Eq), 4-var C-vine worked example, h-function definition and formulas for Gaussian/Clayton/Frank copulas.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: two-stage semiparametric estimation, sequential tree-by-tree MLE algorithm (D-vine), full joint log-likelihood, AIC/BIC pair copula family selection, Dißmann structure selection, vine truncation, CDVine/VineCopula/pyvinecopulib software.
- [[Copula Architecture Comparison]] — CONTAINS: architecture taxonomy table (elliptical, Archimedean, vine, factor), tail dependence coefficient comparison table, exchangeability and heterogeneous dependence, scalability/parameter-count table, when-to-prefer guidance, simulation comparison example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-Czado-2009-Pair-Copula-Constructions]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2): 182–198. Free working paper: https://epub.ub.uni-muenchen.de/1855/1/paper_487.pdf (PDF blocked by session network policy at ingest; reference stub only).
- [[raw/Brechmann-Schepsmeier-2013-CDVine]] — Brechmann & Schepsmeier (2013), "Modeling Dependence with C- and D-Vine Copulas: The R Package CDVine", *Journal of Statistical Software* 52(3): 1–27. Open access: https://jstatsoft.org/v52/i03 (PDF blocked by session network policy at ingest; reference stub only).

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
