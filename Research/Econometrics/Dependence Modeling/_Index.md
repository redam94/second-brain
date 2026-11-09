---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-11-09
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: (1) **factor copulas** (Oh & Patton 2012) — parsimonious latent-factor structure, estimated by SMM; (2) **vine/pair copulas** (Aas et al. 2009) — fully flexible sequential bivariate construction, estimated tree-by-tree by MLE.
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine / pair copulas:**
> - Need the vine copula motivation and architecture comparison vs factor copulas? → [[Vine Copulas - Overview]]
> - Need the Bedford-Cooke R-vine framework, h-function, copula families? → [[Pair Copula Constructions and Regular Vines]]
> - Need C-vine and D-vine explicit density formulas? → [[C-Vine and D-Vine Density]]
> - Need the sequential ML algorithm, family selection, truncation, software? → [[Vine Copula Estimation]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula motivation & architecture | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | Vine = $d(d-1)/2$ free bivariate copulas; factor = $O(K)$ params; vine more flexible but needs truncation in high $d$ |
| Bedford-Cooke R-vine, h-function | [[Pair Copula Constructions and Regular Vines]] | theorem | Vine Overview | R-vine density = product of $d(d-1)/2$ pair-copula densities; h-function $= \partial C/\partial v$; closed forms for Gaussian/$t$/Clayton/Gumbel |
| C-vine and D-vine densities | [[C-Vine and D-Vine Density]] | theorem | Pair Copula Constructions | C-vine: star trees, root variable dominates; D-vine: path trees, sequential ordering; both: $d(d-1)/2$ pair copulas |
| Sequential ML, family selection, truncation | [[Vine Copula Estimation]] | concept | C-Vine and D-Vine Density | Tree-by-tree MLE using h-functions; AIC/BIC family selection; $K$-truncation sets deep trees to independence; CDVine/rvinecopulib/pyvinecopulib |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: pair-copula construction motivation, factor vs vine architecture comparison table, the simplifying assumption.
- [[Pair Copula Constructions and Regular Vines]] — CONTAINS: Bedford-Cooke R-vine definition (tree sequence, proximity condition), R-vine density theorem, h-function definition and closed forms (Gaussian, Student-$t$, Clayton, Frank), trivariate C/D-vine example, copula family table with tail-dependence and rotation info.
- [[C-Vine and D-Vine Density]] — CONTAINS: C-vine structure definition, C-vine density formula (Eq. 8), 4-variable C-vine worked example; D-vine structure definition, D-vine density formula (Eq. 9), 4-variable D-vine worked example; structural comparison table.
- [[Vine Copula Estimation]] — CONTAINS: sequential ML algorithm (tree-by-tree MLE), h-function recursion worked example (4-variable D-vine), pair-copula family selection (AIC/BIC, Kendall $\tau$ initialisation), vine truncation at level $K$, R (`CDVine`, `VineCopula`, `rvinecopulib`) and Python (`pyvinecopulib`) software.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- Aas, Czado, Frigessi & Bakken (2009) — "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2), 182–198. Working paper at epub.ub.uni-muenchen.de/1855/1/paper_487.pdf (download blocked by session network policy; note content written from training knowledge).
- Brechmann & Schepsmeier (2013) — "Modeling Dependence with C- and D-Vine Copulas: The R Package CDVine", *Journal of Statistical Software* 52(3), 1–27.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
