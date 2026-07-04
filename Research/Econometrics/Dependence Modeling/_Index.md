---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-04
concept_count: 9
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major copula architectures: **factor copulas** (Oh & Patton 2012 — latent factor model, SMM estimation, $d \geq 50$) and **vine copulas** (Aas et al. 2009; Bedford & Cooke 2002 — pair-copula construction, sequential MLE, $d \leq 30$ typical).
> - Need the big picture for factor copulas? → [[Factor Copulas - Overview]]
> - Need the latent factor model? → [[Factor Copula Construction]]
> - Need tail-dependence theory (EVT, correlated crashes)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors / industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need factor copula estimation (SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical S&P 100 application? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need what vine copulas are and how they compare to factor copulas? → [[Vine Copulas - Overview]]
> - Need the C-vine / D-vine structure definitions and density formulas? → [[C-Vine and D-Vine Structures]]
> - Need sequential MLE, Dissmann structure selection, VineCopula/pyvinecopulib? → [[Vine Copula Estimation and Model Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution (factor) | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation (factor) | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | Factor Copulas Overview, Dependence Measures | Pair-copula decomposition; $d(d-1)/2$ pair copulas; C/D-vine special cases; architecture comparison table |
| C-vine & D-vine structures | [[C-Vine and D-Vine Structures]] | definition | Vine Overview | C-vine = star (hub root); D-vine = path (consecutive pairs); explicit 4-variable density formulas |
| Vine estimation & selection | [[Vine Copula Estimation and Model Selection]] | concept | Vine Overview, C/D-Vine | Sequential MLE; AIC/BIC family selection; Dissmann MST algorithm; truncated vines; R/Python code |

## Notes

### Factor Copulas (Oh & Patton 2012)

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copulas (Aas et al. 2009; Bedford & Cooke 2002)

- [[Vine Copulas - Overview]] — CONTAINS: pair-copula decomposition formula, regular vine definition, h-function definition, simplifying assumption, architecture comparison table (factor vs vine vs Normal/t), links to C/D-vine and estimation notes.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine definition (star, root ordering), D-vine definition (path, consecutive pairs), explicit 4-variable density formulas for both, h-function recursion example, R-vine matrix representation, comparison table (when to use which).
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: sequential MLE algorithm (5 steps), pair copula family table (Gaussian/t/Clayton/Gumbel/Frank/BB1...), AIC/BIC family selection, Dissmann MST structure selection algorithm, truncated vine definition, rvinecopulib R code, pyvinecopulib Python code.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copula-Aas-Czado-Survey.md]] — Synthesis survey of Aas, Czado, Frigessi & Bakken (2009); Bedford & Cooke (2002); Czado & Nagler (2022). Created 2026-07-04; source PDFs blocked by network policy.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
