---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-08-07
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major architectures: (1) **Factor copulas** (Oh & Patton 2017): latent-factor approach scaling to 100+ variables via SMM estimation; (2) **Vine copulas** (Aas et al. 2009; Bedford & Cooke 2002): pair-copula construction (PCC) giving per-pair flexibility via sequential MLE.
> - Need the big picture / architecture comparison? → [[Copula Architecture Comparison]]
> - Need the factor copula motivation and overview? → [[Factor Copulas - Overview]]
> - Need the latent factor model? → [[Factor Copula Construction]]
> - Need analytical tail-dependence for factor copulas? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors / block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need SMM estimation of factor copulas? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical study / systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need the vine copula overview (C-vine, D-vine, R-vine)? → [[Vine Copulas - Overview]]
> - Need vine density formulas and h-functions? → [[Vine Copula Construction and Density Factorization]]
> - Need vine structure/family selection and software? → [[Vine Copula Estimation and Model Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Factor & Vine Overviews | Elliptical/Archimedean/Factor/Vine trade-offs; decision table by dimension and flexibility |
| Factor copula overview | [[Factor Copulas - Overview]] | overview | — | High-dim copula for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Factor Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero $\tau^U, \tau^L$; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (16 params) → heterogeneous dependence |
| SMM estimation (factor) | [[SMM Estimation of Factor Copulas]] | theorem | Construction | Match rank corr + quantile dependence; consistent & asym. normal |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dep., Multi-Factor | Skew $t$-$t$ block copula fits best; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | Factor Overview | Bedford & Cooke (2002) tree structure; C-vine (hub), D-vine (path), R-vine (general) |
| Vine density & h-function | [[Vine Copula Construction and Density Factorization]] | definition | Vine Overview | General PCC factorization; C/D-vine density formulas; h-function; simplifying assumption |
| Vine estimation & selection | [[Vine Copula Estimation and Model Selection]] | concept | Vine Construction | Sequential MLE; Dissmann (2013) max-spanning-tree structure selection; AIC family selection; VineCopula / pyvinecopulib |

## Notes

### Factor Copula Cluster (Oh & Patton 2017)
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance, $J$-test.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copula Cluster (Aas et al. 2009; Bedford & Cooke 2002) — ingested 2026-08-07
- [[Vine Copulas - Overview]] — CONTAINS: pair-copula construction (PCC) motivation; C-vine (star topology), D-vine (path topology), R-vine (general); proximity condition; 3-variable density example; comparison with factor copula at high level.
- [[Vine Copula Construction and Density Factorization]] — CONTAINS: h-function definition & closed forms (Gaussian, $t$, Clayton, Gumbel); general Bedford-Cooke density factorization theorem; C-vine density formula (eq. 4 Aas et al.); D-vine density formula (eq. 3 Aas et al.); simplifying assumption and its failure modes; recursive h-function computation; 4-dimensional D-vine worked example.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: pseudo-observations; sequential MLE algorithm (Aas et al.); joint MLE; Dissmann et al. (2013) maximum-spanning-tree structure selection; AIC family selection; truncation; software guide (VineCopula R, rvinecopulib, pyvinecopulib); 5-dimensional D-vine workflow example.

### Cross-Architecture
- [[Copula Architecture Comparison]] — CONTAINS: taxonomy table (elliptical/Archimedean/factor/vine) by parameters, tail dependence, asymmetry, exchangeability, max tractable $n$; factor copula vs vine copula detailed comparison; decision framework table.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012/2017), "Modelling Dependence in High Dimensions with Factor Copulas". 51 pp.
- [[raw/vine-copulas-compiled-sources.md]] — Compiled from accessible sources (GitHub repositories, search results) for Aas et al. (2009), Bedford & Cooke (2002), Czado & Nagler (2022). Direct PDF downloads blocked by network policy; see file for canonical citations.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
