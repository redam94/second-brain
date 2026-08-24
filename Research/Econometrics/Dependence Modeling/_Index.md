---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-08-24
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major copula architectures: **factor copulas** (Oh & Patton 2017, latent-factor structure for 50-100+ variables) and **vine copulas / pair-copula constructions** (Aas et al. 2009, flexible bivariate-building-block approach for 5–30 variables).
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas / pair-copula constructions:**
> - Need the motivation, position relative to factor copulas, and key references? → [[Vine Copulas - Overview]]
> - Need the mathematical machinery (h-functions, density factorization, $d=4$ examples)? → [[Pair Copula Decompositions]]
> - Need C-vine vs. D-vine vs. R-vine structure, graphical representation? → [[C-Vine and D-Vine Structures]]
> - Need sequential MLE, structure selection (Dissmann), R/Python packages? → [[Vine Copula Estimation]]
>
> **Comparison:**
> - Need to choose between factor copula, vine, Gaussian/t, Archimedean? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution (factor) | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation (factor) | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula motivation & literature | [[Vine Copulas - Overview]] | overview | — | PCC: $d(d-1)/2$ bivariate copulas on $d-1$ trees; Aas et al. (2009); C-vine, D-vine, R-vine |
| h-function & density factorization | [[Pair Copula Decompositions]] | theorem/definition | Vine Overview | h-function: $h(u\|v)=\partial C/\partial v$; full density = product of marginals × product of pair-copula densities; worked $d=3,4$ examples |
| C-vine, D-vine, R-vine structures | [[C-Vine and D-Vine Structures]] | definition | Pair Decompositions | C-vine: star trees (hub variable); D-vine: path trees (sequential); R-vine: general (proximity condition) |
| Sequential MLE, structure selection | [[Vine Copula Estimation]] | concept | C/D-vine, Pair Decompositions | Dissmann max-spanning-tree; sequential h-function MLE; AIC/BIC family selection; VineCopula R, pyvinecopulib |
| Copula architecture comparison | [[Copula Architecture Comparison]] | concept | All above | Factor: parsimonious, scalable, SMM; Vine: flexible, MLE, $d\leq30$; Gaussian/t: simple; Archimedean: 1-parameter |

## Notes

### Factor Copulas (Oh & Patton 2017)

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copulas / Pair-Copula Constructions (Aas et al. 2009)

- [[Vine Copulas - Overview]] — CONTAINS: Bedford-Cooke history, PCC definition, simplifying assumption, vine-vs-factor comparison, why vine copulas were needed (limitations of Gaussian/t/Archimedean).
- [[Pair Copula Decompositions]] — CONTAINS: h-function definition and table (Gaussian/$t$/Clayton/Gumbel), density factorization for $d=3$ and $d=4$ (D-vine and C-vine examples), non-uniqueness of factorization.
- [[C-Vine and D-Vine Structures]] — CONTAINS: R-vine definition (proximity condition), C-vine (star/hub, when to use, $d=5$ example), D-vine (path/chain, when to use, $d=5$ example), R-vine matrix encoding, dimension threshold table.
- [[Vine Copula Estimation]] — CONTAINS: pseudo-observations, Dissmann structure-selection algorithm, pair-copula family AIC/BIC table, sequential MLE theorem, full joint MLE, GOF tests, VineCopula R and pyvinecopulib Python code examples.

### Cross-Architecture Comparison

- [[Copula Architecture Comparison]] — CONTAINS: feature-by-feature table (5 architectures × 8 dimensions), tail-dependence coefficient table, factor vs. vine trade-off callout, practical dimension thresholds, financial application guidance, Oh & Patton's critique of vine copulas.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012/2017), "Modelling Dependence in High Dimensions with Factor Copulas", *JBES* 35(1). 51 pp. JEL C31, C32, C51.
- [[raw/Aas-2009-vine-copulas-source-notes.md]] — Source notes for: Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2), 182-198; Bedford & Cooke (2002), "Vines: A new graphical model for dependent random variables", *Annals of Statistics* 30(4), 1031-1068; Brechmann & Schepsmeier (2013), "Modeling dependence with C- and D-vine copulas: The R package CDVine", *Journal of Statistical Software* 52(3). (PDFs blocked by network policy in this session.)

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
