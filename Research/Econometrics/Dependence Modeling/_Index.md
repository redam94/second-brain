---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-22
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: **factor copulas** (Oh & Patton 2012, $N=100$+, parsimony via latent factor structure, SMM estimation) and **vine copulas** (Aas et al. 2009, $N \lesssim 20$, pair-level flexibility, sequential MLE).
>
> **Factor Copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine Copulas:**
> - Need the motivation and position vs. other architectures? → [[Vine Copulas - Overview]]
> - Need the density decomposition and h-functions? → [[Pair Copula Constructions]]
> - Need C-vine, D-vine, R-vine tree structures? → [[Regular Vine Structures]]
> - Need structure selection and sequential MLE (VineCopula R package)? → [[Vine Copula Estimation]]
> - Need a head-to-head comparison of all architectures? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution (factor) | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation (factor) | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | PCC framework: $N(N-1)/2$ pair copulas, each freely chosen; flexible for $N \lesssim 20$ |
| Pair copula density decomposition | [[Pair Copula Constructions]] | theorem | Vine Overview | Joint density = product of $N(N-1)/2$ bivariate pair-copula densities; h-function is key computational tool |
| C-vine, D-vine, R-vine | [[Regular Vine Structures]] | definition | Pair Copula Constructions | Tree-sequence graphical models; C-vine=star (hub variable); D-vine=path (ordered data); R-vine=general |
| Vine estimation & structure selection | [[Vine Copula Estimation]] | theorem | Regular Vine, Dependence Measures | Sequential MLE tree-by-tree; Dißmann max-spanning-tree selects structure by $\|\hat{\tau}\|$ |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | all above | Factor copula wins $N\ge30$; vine wins $N\le20$ pair-specific; Gaussian/t for simpler settings |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: failure modes of Gaussian/$t$/Archimedean copulas; PCC motivation; Bedford & Cooke (2002) / Aas et al. (2009) / Dißmann et al. (2013) key papers; factor vs vine scalability.
- [[Pair Copula Constructions]] — CONTAINS: trivariate factorisation (Joe 1996); $N$-dimensional vine density theorem (Bedford & Cooke 2002); h-function definition and closed forms for Gaussian/$t$/Clayton/Gumbel/Frank; simplifying assumption; 4-variable D-vine worked example.
- [[Regular Vine Structures]] — CONTAINS: R-vine proximity condition; C-vine star structure + density formula; D-vine path structure + density formula; edge label notation; C-vine vs D-vine vs R-vine comparison table.
- [[Vine Copula Estimation]] — CONTAINS: pseudo-observation construction; Dißmann et al. (2013) greedy max-spanning-tree algorithm; pair-copula family selection by AIC; sequential ML vs joint ML; vine truncation; full VineCopula R workflow.
- [[Copula Architecture Comparison]] — CONTAINS: full 6-row architecture table (Gaussian/$t$/Archimedean/vine/factor); vine strengths & limits; factor strengths & limits; decision guide table; Oh & Patton's critique of vine in high dimensions; financial application example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copula-Survey-Synthesis.md]] — Survey synthesis (2026-07-22): Aas et al. (2009), Bedford & Cooke (2002), Dißmann et al. (2013), Czado (2010), Joe (1996). Vine copula framework, pair copula constructions, h-functions, structure selection, software. PDFs unavailable due to session network policy; content from training knowledge.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
