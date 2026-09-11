---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-09-11
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major architectures: (1) **Factor copulas** (Oh & Patton 2012) — parsimonious latent-factor approach for $d\geq50$ variables; (2) **Vine/pair-copula constructions** (Bedford & Cooke 2001/2002; Aas et al. 2009) — flexible architecture for $d\lesssim50$ assigning different bivariate copulas to every pair.
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine / pair-copula constructions:**
> - Need the vine motivation, Bedford-Cooke framework, and vine types? → [[Vine Copulas - Overview]]
> - Need the h-function recursion and density factorization? → [[Pair Copula Construction]]
> - Need C-vine and D-vine density formulas and tree diagrams? → [[C-Vine and D-Vine Structures]]
> - Need structure selection (Dißmann) and sequential MLE? → [[Vine Copula Estimation]]
> - Need to choose between Gaussian, t, Archimedean, factor, or vine? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine motivation & architecture | [[Vine Copulas - Overview]] | overview | — | Bedford-Cooke R-vine; product of $d(d-1)/2$ pair-copulas; simplifying assumption; C/D/R-vine types |
| h-function & density factorization | [[Pair Copula Construction]] | definition | Vine Overview | $f = \prod f_k \cdot \prod c_{j,k\|D}$; h-function $= \partial C/\partial v$; recursive conditional CDF computation |
| C-vine and D-vine | [[C-Vine and D-Vine Structures]] | definition | Pair Copula Construction | C-vine: star trees (root mediates all); D-vine: path trees (neighbour ordering); explicit density formulas |
| Structure selection & sequential MLE | [[Vine Copula Estimation]] | concept | C-Vine/D-Vine, Pair Copula Construction | Dißmann's MST algorithm; per-edge AIC family selection; h-function propagation; `pyvinecopulib` code |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | Factor vs vine trade-off table; tail dependence by architecture; practical guidance for $d=5$ to $d=100$ |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: motivation (limitation of Gaussian/$t$/Archimedean/factor), Bedford-Cooke framework, vine types overview (R/C/D), key references, density factorization formula, simplifying assumption.
- [[Pair Copula Construction]] — CONTAINS: bivariate copula & Sklar recap, h-function definition with closed-form examples (Gaussian, $t$, Clayton, Gumbel), recursive conditional CDF theorem, Bedford-Cooke factorization theorem, pseudo-observations, 3-variable worked example.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine structure (star trees) & density formula, D-vine structure (path trees) & density formula, when-to-use guidance table, 4-variable D-vine worked example, 4-variable C-vine worked example.
- [[Vine Copula Estimation]] — CONTAINS: Dißmann's algorithm (sequential MST structure selection), log-likelihood formula, copula family selection by AIC table, truncated/sparse vines, `pyvinecopulib` code example, 5-variable estimation walkthrough.
- [[Copula Architecture Comparison]] — CONTAINS: 5-architecture comparison table (Gaussian/$t$/Archimedean/factor/vine), curse of dimensionality for $d=100$, tail-dependence comparison table, practical guidance by use case, S&P 100 factor-vs-vine case study.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/vine-copulas-sources.md]] — Source reference for vine/PCC notes: Bedford & Cooke (2001/2002), Aas et al. (2009), Dißmann et al. (2013), Czado (2019), Joe (1997). PDFs unavailable due to network restrictions in ingest session; notes written from training knowledge.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
