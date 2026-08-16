---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-08-16
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major architectures: (A) **Factor copulas** (Oh & Patton 2012/2017) for very high dimensions ($d \geq 50$) — latent factor construction, EVT tail dependence, multi-factor/block extensions, SMM estimation, S&P 100 application; and (B) **Vine copulas** (Aas et al. 2009; Bedford & Cooke 2002) for moderate dimensions ($d \leq 20$) — pair-copula constructions, h-functions, sequential MLE, Dissmann structure selection. A comparison note helps practitioners choose.
>
> **Factor copulas (Oh & Patton):**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas (Aas et al. / Bedford & Cooke):**
> - Need the big picture — what is a vine copula and why? → [[Vine Copulas - Overview]]
> - Need density formulas, h-functions, C-vine vs D-vine trees? → [[Pair Copula Constructions and Vine Structure]]
> - Need sequential MLE, Dissmann structure selection, family selection? → [[Vine Copula Estimation and Model Selection]]
>
> **Architecture comparison:**
> - Which copula architecture should I use? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copulas: motivation & types | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | PCC decomposes $d$-dim copula into $d(d-1)/2$ bivariate pair copulas; C-vine (star), D-vine (path), R-vine (general) |
| h-function & density formulas | [[Pair Copula Constructions and Vine Structure]] | definition | Vine Copulas - Overview | $h(u,v;\theta)=\partial C/\partial v$; explicit C-vine/D-vine density products for $d=3,4$ |
| Sequential MLE & structure selection | [[Vine Copula Estimation and Model Selection]] | concept | Pair Copula Constructions | Tree-by-tree MLE; Dissmann algorithm maximises $\sum|\hat\tau|$; AIC/BIC family selection |
| Architecture comparison | [[Copula Architecture Comparison]] | overview | Vine Overview, Factor Overview | Factor for $d\geq 50$; vine for $d\leq 20$; elliptical for symmetric tail; Archimedean exchangeable only |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: PCC definition, regular vine/C-vine/D-vine definitions (with block IDs), simplifying assumption, trivariate worked examples for C-vine and D-vine, connections to factor copulas.
- [[Pair Copula Constructions and Vine Structure]] — CONTAINS: h-function definition with closed-form table (Normal/Clayton/Gumbel/Frank), C-vine density formula (Aas eq. 4), D-vine density formula (Aas eq. 6), explicit $d=4$ expansions for both, R-vine vine matrix.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: sequential MLE algorithm (tree-by-tree), Dissmann structure selection (maximum spanning tree on $|\hat\tau|$), bivariate family library with tail dependence table, rotation for negative dependence, full MLE theorem, $k$-truncation, software table.
- [[Copula Architecture Comparison]] — CONTAINS: head-to-head table across elliptical/Archimedean/vine/factor, Archimedean tail dependence table, vine vs factor decision criteria, practical decision flowchart, mixed architecture notes.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Survey-Aas2009-BedfordCooke-Czado]] — Survey covering: Bedford & Cooke (2002) Annals of Statistics; Aas, Czado, Frigessi & Bakken (2009) Insurance Mathematics and Economics; Czado (2019) Lecture Notes in Statistics 222. Ingested 2026-08-16.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
