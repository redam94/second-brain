---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-08-05
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: **factor copulas** (Oh & Patton 2012/2017: latent common factor, scales to $d = 100+$, SMM estimation) and **vine copulas** (Aas et al. 2009: pair-copula constructions, heterogeneous pair-level families, MLE, scales to $d \approx 20$).
>
> **Factor copula cluster:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copula cluster (new 2026-08-05):**
> - Need the vine overview (Bedford-Cooke framework, C-vine vs D-vine vs R-vine)? → [[Vine Copulas - Overview]]
> - Need the exact density factorization, h-functions, and simplifying assumption? → [[Pair-Copula Construction]]
> - Need estimation (sequential MLE, AIC family selection, VineCopula R package)? → [[Vine Structure Selection and Sequential MLE]]
> - Need to choose between copula architectures (vine vs factor vs Gaussian vs $t$)? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution (factor) | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Factor Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Factor Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Factor Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation (factor) | [[SMM Estimation of Factor Copulas]] | theorem | Factor Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | Factor SMM, Tail Dep, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine overview | [[Vine Copulas - Overview]] | overview | — | Pair-copula construction (PCC): $d(d-1)/2$ bivariate copulas in nested trees; C-vine, D-vine, R-vine |
| PCC density & h-functions | [[Pair-Copula Construction]] | definition | Vine Overview | C/D-vine density formulas; h-function $h(u\|v;\theta)=\partial C/\partial v$; recursive conditional CDF evaluation |
| Sequential MLE (vine) | [[Vine Structure Selection and Sequential MLE]] | concept | Vine Overview, PCC | Tree-by-tree MLE; Dißmann MST structure; AIC/BIC family selection; VineCopula + rvinecopulib |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | Decision table: vine for $d\leq 20$ + heterogeneous pairs; factor for $d\geq 20$ + common-factor interpretation |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: Joe (1996) / Bedford-Cooke (2001/2002) history, R-vine tree definition (proximity condition), C-vine star structure (root conditioning), D-vine path structure (Markov-like), simplifying assumption, Norwegian financial data example (4-var C-vine).
- [[Pair-Copula Construction]] — CONTAINS: general PCC density theorem (R-vine), explicit C-vine density formula (4- and $d$-variable), explicit D-vine density formula, h-function definition and table (Gaussian, $t$, Clayton), recursive conditional CDF evaluation, 3-variable worked example, simplifying assumption consequences.
- [[Vine Structure Selection and Sequential MLE]] — CONTAINS: sequential MLE algorithm (step-by-step, full vs. sequential), Dißmann et al. (2013) MST structure selection, pair-copula family menu (30+ families with tail-dependence properties), AIC/BIC selection, truncated vines, VineCopula R code, rvinecopulib R code.
- [[Copula Architecture Comparison]] — CONTAINS: architecture comparison table (Gaussian/$t$/HAC/vine/factor copulas: params, likelihood, tail dep, asymmetry, max $d$), when-to-prefer-vine conditions, when-to-prefer-factor conditions, equidependence model comparison table, HAC definition, two applied examples (S&P 100 factor vs vine; 5 currencies vine vs Gaussian/$t$).

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012/2017), "Modelling Dependence in High Dimensions with Factor Copulas". 51 pp. JEL C31, C32, C51.
- [[raw/Aas-2009-Czado-2019-Vine-Copulas-Survey.md]] — Synthesis survey (created 2026-08-05) covering Aas, Czado, Frigessi & Bakken (2009) "Pair-copula constructions of multiple dependence" (*Insurance: Mathematics and Economics*, 44, 182–198); Bedford & Cooke (2001/2002); Czado (2019) *Analyzing Dependent Data with Vine Copulas*, Springer. Direct PDF downloads blocked by session network policy.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family used for factor copula estimation).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial; contrasting estimation paradigm; Gaussian copula = all-Gaussian vine.
- [[../_Index|Econometrics]]
