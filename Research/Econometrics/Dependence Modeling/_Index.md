---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-09-18
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two competing architectures: **factor copulas** (Oh & Patton 2012, $O(d)$ params, SMM estimation) and **vine copulas** (Aas et al. 2009, $O(d^2)$ params, MLE via h-functions). The factor-copula cluster covers construction, EVT tail dependence, multi-factor/block extensions, and the S&P 100 application. The vine-copula cluster covers PCC theory, R-vine/C-vine/D-vine structures, estimation and model selection, and a cross-architecture comparison.
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas (new 2026-09-18):**
> - Need the PCC motivation and overview? → [[Vine Copulas - Overview]]
> - Need the tree structures (C-vine, D-vine, R-vine, R-vine matrix)? → [[Regular Vine C-vine and D-vine Structures]]
> - Need the density formula, h-function, and simulation recursion? → [[Pair Copula Construction]]
> - Need sequential MLE, Dißmann structure selection, AIC/BIC family selection? → [[Vine Copula Estimation and Model Selection]]
> - Need to decide between factor copula vs vine copula vs Gaussian/t? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | PCCs: $d(d-1)/2$ bivariate copulas; any family mix; simplifying assumption; Bedford & Cooke (2001, 2002) + Aas et al. (2009) |
| R-vine / C-vine / D-vine | [[Regular Vine C-vine and D-vine Structures]] | definition | Vine Overview | Proximity condition; star tree (C-vine) vs path tree (D-vine); R-vine matrix (Dißmann 2013) |
| H-function & PCC density | [[Pair Copula Construction]] | concept | R-vine Structures | Density recursion; h-function = conditional CDF; closed-form h for Gaussian/$t$/Clayton/Gumbel; simulation by h-inverse |
| Vine estimation & selection | [[Vine Copula Estimation and Model Selection]] | concept | PCC, R-vine | Sequential MLE; Dißmann greedy max-spanning-tree; AIC/BIC family selection; truncation; VineCopula + pyvinecopulib |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | 5-architecture table: Gaussian/$t$/Archimedean/factor/vine; when to use each; S&P 100 vs exchange-rate examples |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: PCC motivation, vine density formula, simplifying assumption, h-function concept, historical development (Joe 1996 → Bedford & Cooke 2001/2002 → Aas et al. 2009 → Dißmann et al. 2013), trivariate D-vine example.
- [[Regular Vine C-vine and D-vine Structures]] — CONTAINS: R-vine definition (proximity condition), C-vine definition (star tree, root sequence), D-vine definition (path tree, lag structure), R-vine matrix, 4-variable C-vine/D-vine examples, guidance for choosing structure type.
- [[Pair Copula Construction]] — CONTAINS: D-vine density formula, h-function definition and closed-form expressions (Gaussian/$t$/Clayton/Gumbel), h-function recursion algorithm, inverse h-function for simulation, trivariate worked example.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: sequential MLE algorithm, Dißmann greedy max-spanning-tree, family selection via AIC/BIC, truncated R-vines, R (VineCopula) and Python (pyvinecopulib) code examples.
- [[Copula Architecture Comparison]] — CONTAINS: 5-architecture comparison table (Gaussian/$t$/Archimedean/factor/vine), Gaussian tail-dependence failure, factor copula strengths/limits, vine copula strengths/limits, decision guide table, S&P 100 and exchange-rate worked examples.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/VineCopula-R-Package-README.md]] — VineCopula R package README (Nagler et al.); includes full bivariate family table and references to Aas et al. (2009), Bedford & Cooke (2001, 2002), Dißmann et al. (2013), Brechmann & Schepsmeier (2013). Downloaded from GitHub 2026-09-18.
- [[raw/pyvinecopulib-README.md]] — pyvinecopulib Python library README; includes usage examples and references to Bedford & Cooke (2002), Aas et al. (2009). Downloaded from GitHub 2026-09-18.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
