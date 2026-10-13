---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-13
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major architectures: **factor copulas** (Oh & Patton 2012, for 50–1000 variables) and **vine/pair copulas** (Aas et al. 2009; Dissmann et al. 2013, for 5–50 variables).
> - Need the factor copula motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the factor copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the factor copula estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the factor copula empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need an introduction to vine copulas (what they are, C-vine vs D-vine intuition)? → [[Vine Copulas - Overview]]
> - Need the formal pair-copula density, h-function recursion, ML estimation? → [[Pair Copula Construction]]
> - Need the R-vine structure, data-driven tree selection, or truncated vines? → [[R-Vine and Structure Selection]]
> - Need to choose between factor copula and vine copula for your application? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution (factor) | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula motivation & C/D-vine intuition | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | PCC builds joint density from $\binom{n}{2}$ bivariate copulas in nested trees; simplifying assumption makes it tractable |
| Pair copula density & h-function | [[Pair Copula Construction]] | definition | Vine Copulas - Overview | C-vine: star topology per tree; D-vine: path topology; h-function $= \partial C/\partial v$ recursively gives conditional CDFs |
| R-vine structure selection | [[R-Vine and Structure Selection]] | definition | Pair Copula Construction | General R-vine density; Dissmann et al. greedy max-spanning-tree algorithm using $|\hat\tau|$; truncated vine for parsimony |
| Copula architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Copulas - Overview, Factor Copulas - Overview | Factor copula: $N>50$, parsimony, economic interpretation; vine: $N\leq50$, heterogeneous pairwise dependence |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: PCC idea, Joe/Bedford & Cooke/Aas et al. history, C-vine vs D-vine topology, simplifying assumption, 4-variable density examples, software (VineCopula, pyvinecopulib).
- [[Pair Copula Construction]] — CONTAINS: h-function definition with Gaussian example, C-vine density formula (general $n$ and $n=4$ example), D-vine density formula (general $n$ and $n=4$), recursive conditional-CDF computation, sequential ML estimation tree-by-tree, trivariate financial returns example.
- [[R-Vine and Structure Selection]] — CONTAINS: Bedford & Cooke R-vine definition (proximity condition), general R-vine density (Dissmann et al.), maximum-spanning-tree algorithm (5 steps), copula-family menu with tail-dependence classification, truncated vine for parsimony.
- [[Copula Architecture Comparison]] — CONTAINS: four-family taxonomy table (elliptical, Archimedean, factor, vine), factor copula strengths/weaknesses, vine copula strengths/weaknesses, decision guide table (dimension, structure, interpretability), S&P 100 vs 5-asset example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-2009-Pair-Copula-Constructions-stub.md]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", Insurance: Mathematics and Economics 44(2), pp. 182–198. Free preprint: SFB 386 Paper 487 (LMU Munich). (PDF download blocked by proxy at ingest — metadata stub only.)
- [[raw/Dissmann-2013-Regular-Vine-Selection-stub.md]] — Dissmann, Brechmann, Czado & Kurowicka (2013), "Selecting and estimating regular vine copulae", Computational Statistics & Data Analysis 59(1), pp. 52–69. arXiv:1202.2002. (PDF download blocked by proxy at ingest — metadata stub only.)

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
