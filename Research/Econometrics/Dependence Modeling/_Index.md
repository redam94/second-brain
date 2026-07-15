---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-15
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major architectures: **factor copulas** (Oh & Patton 2012, latent factor structure, SMM estimation, analytical tail dependence) and **vine copulas** (Aas et al. 2009, pair-copula constructions, C-vine/D-vine/R-vine, sequential MLE). Includes a direct comparison of architectures.
> - Need the motivation and big picture of factor copulas? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need factor copula estimation (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical results or systemic risk measurement? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need the vine copula idea and density decomposition? → [[Vine Copulas - Overview]]
> - Need C-vine or D-vine tree structures and h-functions? → [[C-Vine and D-Vine Structures]]
> - Need R-vine structure selection (Dissmann et al. 2013 greedy algorithm)? → [[Regular Vine Copulas and R-Vine Selection]]
> - Need guidance on choosing between vine and factor copulas? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution (factor) | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview (PCC) | [[Vine Copulas - Overview]] | overview | [[Copula Estimation]], [[Dependence Measures for Copulas]] | $d(d-1)/2$ pair-copulas in nested trees; h-function recursion; simplifying assumption |
| C-vine & D-vine structures | [[C-Vine and D-Vine Structures]] | concept | [[Vine Copulas - Overview]] | Star topology (C-vine) vs. path topology (D-vine); 4-variable density formulas; h-function recursion |
| R-vine & structure selection | [[Regular Vine Copulas and R-Vine Selection]] | theorem | [[C-Vine and D-Vine Structures]] | Proximity condition; Dissmann et al. (2013) max-spanning-tree greedy selector; AIC family selection; vine truncation |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Both clusters | Vine: $O(d^2)$ params, sequential MLE, flexible per-pair tail; Factor: $O(Kd)$ params, SMM, analytical global tail; dimension threshold $d\approx 20$–$30$ |

## Notes

### Factor Copulas (Oh & Patton 2012)

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copulas (Aas et al. 2009, Bedford & Cooke 2001/2002, Dissmann et al. 2013)

- [[Vine Copulas - Overview]] — CONTAINS: pair-copula construction idea, density decomposition formula, h-function definition (Gaussian/Clayton/Student-$t$ examples), simplifying assumption, trivariate PCC example, parameter-count example.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine star topology (star trees, root ordering), D-vine path topology, 4-variable density formulas for both, h-function recursion for both, when to prefer C-vine vs D-vine, 5-variable parameter count example, `rvinecopulib` R code.
- [[Regular Vine Copulas and R-Vine Selection]] — CONTAINS: R-vine definition (V1–V3 proximity condition), R-vine density formula, Dissmann et al. (2013) greedy max-spanning-tree selection algorithm, AIC family selection, consistency theorem, vine truncation at tree $M$, `rvinecopulib` and `pyvinecopulib` code.
- [[Copula Architecture Comparison]] — CONTAINS: 10-dimension comparison table (parameter count, closed-form, estimation, tail dependence, scalability, interpretability), when-to-use-vine vs when-to-use-factor guidance, tail-dependence under each architecture (per-pair for vine, analytical EVT for factor), dimension scaling table ($d=10,20,50,100$).

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Survey-Aas-Czado-Bedford-Cooke.md]] — Synthesis survey: Bedford & Cooke (2001, 2002) Annals of Statistics; Aas, Czado, Frigessi & Bakken (2009) Insurance: Mathematics and Economics 44:182–198; Dissmann, Brechmann, Czado & Kurowicka (2013) Computational Statistics and Data Analysis 59:52–69; Czado & Nagler (2022) Annual Review of Statistics and Its Application 9:453–477. (PDF downloads unavailable due to session network policy; content from training knowledge.)

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
