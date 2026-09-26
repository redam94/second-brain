---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-09-26
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two complementary architectures: the **factor copula** (Oh & Patton 2012 — parsimonious, $N=100$, SMM estimation) and the **vine copula** (Aas et al. 2009; Bedford & Cooke 2001/2002 — flexible pair-specific structure, sequential MLE).
> - Need the factor-copula motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the factor copula estimation method (SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the factor copula empirical results and systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need vine copula motivation and comparison across copula architectures? → [[Vine Copulas - Overview]]
> - Need the PCC density formula and h-function? → [[Pair Copula Construction]]
> - Need C-vine vs D-vine tree structures and when to use each? → [[C-Vine and D-Vine Structures]]
> - Need the general R-vine, vine matrix, and MST selection algorithm? → [[Regular Vines and the R-Vine Matrix]]
> - Need sequential/joint MLE, family selection, and software? → [[Vine Copula Estimation and Model Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Factor copula motivation | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Factor Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Factor Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Factor Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) |
| Factor SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Factor Construction | Match rank corr. + quantile dep.; consistent & asym. normal; GMM sandwich covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dep., Multi-Factor | Skew $t$-$t$ block fits best; crashes more correlated than booms; superior MES/$kES$ |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | $d(d-1)/2$ pair copulas; pair-specific families; encompasses factor copula as special case |
| PCC and h-function | [[Pair Copula Construction]] | definition | Vine Overview | Density factorises into bivariate copulas; $h(u\|v;\theta)=\partial C/\partial v$ gives conditional CDFs |
| C-vine and D-vine | [[C-Vine and D-Vine Structures]] | definition | PCC | C-vine = star (hub variable); D-vine = path (sequential ordering); both have $d(d-1)/2$ pair copulas |
| R-vine and vine matrix | [[Regular Vines and the R-Vine Matrix]] | definition | C/D-vine | Proximity condition; upper-triangular matrix; MST selection (Dissmann 2013); truncation |
| Vine estimation | [[Vine Copula Estimation and Model Selection]] | theorem | R-vine, PCC | Sequential MLE (consistent, fast); joint MLE (efficient); AIC family selection; `VineCopula` / `rvinecopulib` |

## Notes

### Factor Copulas (Oh & Patton 2012)

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table.
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Propositions 1-3, Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence interpretation, empirical 8-factor block model (16 params).
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective, rank-correlation & quantile-dependence moments, consistency/normality theorem, $J$-test.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo results, AR(1)-GJR-GARCH marginals, equidependence & block estimates, MES & $kES$ systemic-risk measures.

### Vine Copulas (Aas et al. 2009; Bedford & Cooke 2001/2002; Dissmann et al. 2013)

- [[Vine Copulas - Overview]] — CONTAINS: motivation, copula-landscape comparison table (Normal/$t$/Archimedean/factor/vine), Joe-Bedford-Cooke-Aas history, simplifying assumption.
- [[Pair Copula Construction]] — CONTAINS: bivariate building block, h-function definition and table (Gaussian/$t$/Clayton/Gumbel), trivariate PCC explicit construction, general $d$-dimensional PCC formula, parameter counting.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine definition (star topology, root sequence), D-vine definition (path topology, ordering), $4$-variable density formulas, structure counting, C-vine vs D-vine comparison table.
- [[Regular Vines and the R-Vine Matrix]] — CONTAINS: Bedford-Cooke proximity condition, R-vine tree sequence, vine matrix definition, $4$-variable C-vine and D-vine matrix examples, MST selection algorithm (Dissmann 2013), truncated vines, VineCopula/rvinecopulib software.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: sequential MLE (consistency, asymptotic normality), joint MLE, AIC/BIC truncation, bivariate family selection, simulation algorithm, comparison with factor copula.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas". 51 pp.
- Aas, Czado, Frigessi & Bakken (2009) — "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics*, 44(2):182–198. PDF unavailable for download (proxy policy); notes written from training knowledge.
- Bedford & Cooke (2001, 2002) — "Probability density decomposition for conditionally dependent random variables modeled by vines" (*Ann. Math. AI*); "Vines — A new graphical model for dependent random variables" (*Ann. Stat.*).
- Dissmann, Brechmann, Czado & Kurowicka (2013) — "Selecting and estimating regular vine copulae and application to financial returns", *Comput. Stat. Data Anal.* [arXiv:1202.2002]. PDF blocked by proxy.
- Czado & Nagler (2022) — "Vine Copula Based Modeling", *Ann. Rev. Stat. Appl.*, 9:453–477.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: SMM estimator asymptotic theory.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM methodological family.
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
