---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-09
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional copula modelling for economic/financial variables. Two main architectures covered: **factor copulas** (Oh & Patton 2012 — latent factor structure, scalable to $d=100$+, SMM estimation, analytical EVT tail dependence) and **vine copulas** (Aas et al. 2009 — pair copula constructions, C-vine/D-vine, flexible bivariate building blocks, sequential MLE, best for $d \leq 50$). A comparison note synthesises when to use each.
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the SMM estimation method? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical application or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas (pair copula constructions):**
> - Need the overview, history, and motivation? → [[Vine Copulas - Overview]]
> - Need the formal PCC definition, R-vine, h-function, simplifying assumption? → [[Pair Copula Construction]]
> - Need the C-vine and D-vine tree structures with worked examples? → [[C-vine and D-vine Structures]]
> - Need estimation (sequential MLE, Dissmann algorithm, software)? → [[Vine Copula Estimation and Model Selection]]
>
> **Architecture comparison:**
> - Need to choose between Normal/$t$/Archimedean/Vine/Factor copulas? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | PCC builds $d$-dim dependence from $d(d-1)/2$ bivariate copulas; Joe (1996), Bedford-Cooke (2001/2), Aas et al. (2009) |
| Pair copula construction | [[Pair Copula Construction]] | definition | Vine Overview | R-vine definition; density factorization; h-function recursion; simplifying assumption |
| C-vine & D-vine | [[C-vine and D-vine Structures]] | concept | PCC | C-vine = star trees (hub variable); D-vine = path trees (sequential ordering); full $d=4$ examples |
| Vine estimation | [[Vine Copula Estimation and Model Selection]] | concept | PCC, C/D-vine | Sequential MLE (IFM); Dissmann algorithm; truncated vines; VineCopula / rvinecopulib |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | Normal: zero tail; $t$: symmetric tail; Archimedean: 1 param; Vine: flexible, $d\leq50$; Factor: parsimonious, $d>50$ |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: history (Joe 1996, Bedford-Cooke 2001/2, Aas 2009, Czado 2019), PCC concept, C/D/R-vine special cases, position relative to factor and other copula architectures.
- [[Pair Copula Construction]] — CONTAINS: PCC density factorization (Eq), R-vine definition (proximity condition), simplifying assumption, h-function definition and examples for Gaussian/Clayton/Gumbel, trivariate worked example, pair copula families table.
- [[C-vine and D-vine Structures]] — CONTAINS: formal C-vine and D-vine definitions; complete $d=4$ tree structure for each with all pair copulas listed; comparison table; root/ordering selection heuristics.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: pseudo-observation marginals, Dissmann greedy structure-selection algorithm, sequential MLE (IFM) algorithm, full MLE, pair family selection by AIC/BIC, truncated vines, software (VineCopula/rvinecopulib/pyvinecopulib) with R code example.
- [[Copula Architecture Comparison]] — CONTAINS: Normal copula definition, $t$-copula comparison, Archimedean families (Clayton/Gumbel/Frank/Joe), comprehensive comparison table (5 architectures × 8 properties), decision guide, Oh & Patton (2012) S&P 100 horse-race findings.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-PCC-Survey.md]] — Synthesis survey from training knowledge of Aas et al. (2009), Bedford & Cooke (2001, 2002), Czado (2019), Czado & Nagler (2022), Dissmann et al. (2013). PDFs unavailable due to network policy.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
