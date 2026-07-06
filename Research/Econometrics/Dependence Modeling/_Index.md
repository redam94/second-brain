---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-06
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling. Covers two major architectures: **factor copulas** (Oh & Patton 2012 — latent factor model, SMM estimation, S&P 100 application) and **vine copulas** (Aas et al. 2009; Dissmann et al. 2013 — pair-copula construction, C/D/R-vine structures, sequential MLE, data-adaptive structure selection). A comparison note helps choose between them.
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas:**
> - Need the motivation and overview of vine types? → [[Vine Copulas - Overview]]
> - Need the density factorization formula and h-function? → [[Pair-Copula Construction]]
> - Need C-vine (star trees) and D-vine (path trees) explicitly? → [[C-Vine and D-Vine Structures]]
> - Need general R-vine structure selection (Dissmann et al. algorithm)? → [[R-Vine Structure Selection]]
>
> **Architecture choice:**
> - Need to choose between Gaussian, $t$, Archimedean, factor, and vine copulas? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copulas overview | [[Vine Copulas - Overview]] | overview | — | Pair-copula decomposition into $d(d-1)/2$ bivariate copulas via vine tree; C-vine/D-vine/R-vine types; position vs factor/elliptical/Archimedean |
| Pair-copula construction | [[Pair-Copula Construction]] | definition | Vine Overview | Density factorization theorem; h-function $h(u_1\|u_2)=\partial C/\partial u_2$; sequential tree-by-tree MLE; simplifying assumption |
| C-vine and D-vine | [[C-Vine and D-Vine Structures]] | definition | PCC | C-vine density (star trees, root-driven); D-vine density (path trees, ordered variables); sampling via inverse h-function |
| R-vine structure selection | [[R-Vine Structure Selection]] | definition | C/D-vine | Max spanning tree on Kendall's $\hat{\tau}$; AIC family selection; proximity condition; truncation; VineCopula R package |
| Copula architecture comparison | [[Copula Architecture Comparison]] | concept | All above | Decision guide: Gaussian (no tail dep), $t$ (symmetric), Archimedean (exchangeable), factor ($O(d)$ params, common factor), vine ($O(d^2)$, idiosyncratic) |

## Notes

### Factor Copula Notes (Oh & Patton 2012)

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copula Notes (Aas et al. 2009; Dissmann et al. 2013; Czado & Nagler 2022)

- [[Vine Copulas - Overview]] — CONTAINS: pair-copula decomposition principle, simplifying assumption, vine types (C/D/R-vine overview), position vs factor/elliptical/Archimedean copulas, software table.
- [[Pair-Copula Construction]] — CONTAINS: density factorization theorem (Bedford & Cooke), h-function definition and examples (Gaussian, $t$ copula), sequential tree-by-tree MLE algorithm, AIC family selection, simplifying assumption formal statement.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine definition (star trees), C-vine density formula, D-vine definition (path trees), D-vine density formula, explicit $d=4$ examples, simulation via inverse h-function, when to use C- vs D-vine.
- [[R-Vine Structure Selection]] — CONTAINS: R-vine definition and proximity condition, R-vine matrix encoding, Dissmann et al. greedy max spanning tree algorithm, AIC family selection per edge, truncated vines, VineCopula R code example.
- [[Copula Architecture Comparison]] — CONTAINS: taxonomy of 5 copula families, systematic comparison table (tail dep, asymmetry, heterogeneity, scalability, estimation), decision guide, S&P 100 empirical evidence from Oh & Patton.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Aas-Dissmann-Czado-Synthesis.md]] — Synthesis survey (created 2026-07-06) from training knowledge of: Aas et al. (2009), Dissmann et al. (2013), Czado & Nagler (2022), Bedford & Cooke (2002). PDFs unavailable via session network policy.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
