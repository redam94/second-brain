---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-11-04
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: **factor copulas** (Oh & Patton 2012 — parsimonious latent-factor construction, scales to $d=100$) and **vine copulas** / pair-copula constructions (Aas et al. 2009 — flexible $O(d^2)$ bivariate building blocks, best for $d \lesssim 50$ with heterogeneous pairwise dependence).
>
> **Factor copula notes:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copula notes:**
> - Need the vine copula motivation and historical overview (Joe 1996 → Bedford & Cooke → Aas et al. 2009)? → [[Vine Copulas - Overview]]
> - Need the formal PCC density factorisation and the h-function recursion? → [[Pair-Copula Construction]]
> - Need C-vine vs D-vine density formulas with 4-variable examples? → [[C-Vine and D-Vine Structures]]
> - Need sequential ML estimation, AIC family selection, Dißmann algorithm? → [[Vine Copula Estimation and Model Selection]]
> - Need a head-to-head comparison of all copula architectures? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview & history | [[Vine Copulas - Overview]] | overview | — | PCC decomposes joint density into $d(d-1)/2$ bivariate copulas; Joe 1996 → Bedford & Cooke 2001-2 → Aas et al. 2009 |
| Pair-copula density & h-function | [[Pair-Copula Construction]] | definition | Vine Overview | Vine density formula; h-function $h(u|v;\theta)=\partial C/\partial v$; simplifying assumption |
| C-vine and D-vine structures | [[C-Vine and D-Vine Structures]] | definition | PCC | C-vine: star topology per tree; D-vine: path topology; both use $d(d-1)/2$ copulas; explicit 4-var formulas |
| Vine estimation & model selection | [[Vine Copula Estimation and Model Selection]] | theorem | C/D-Vine | Sequential MLE (tree-by-tree); joint MLE; AIC family selection; Dißmann MST algorithm; truncated vines |
| Copula architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | Factor vs vine vs elliptical vs Archimedean: scalability, tail dep., asymmetry, parameter count, estimation |

## Notes

### Factor Copula Notes (Oh & Patton 2012)
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copula Notes (Aas et al. 2009; Brechmann & Schepsmeier 2013; Czado & Nagler 2022)
- [[Vine Copulas - Overview]] — CONTAINS: motivation vs factor/elliptical/Archimedean copulas, PCC definition, regular vine definition (proximity condition), historical development (Joe 1996, Bedford & Cooke, Aas 2009, Dißmann 2013, rvinecopulib).
- [[Pair-Copula Construction]] — CONTAINS: h-function definition and table for Gaussian/$t$/Clayton/Gumbel, general vine density formula, simplifying assumption, $d=4$ D-vine worked example, log-likelihood formula.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine definition (star trees) and density formula, D-vine definition (path trees) and density formula, parameter-count table ($d(d-1)/2$), $d=4$ C-vine and D-vine explicit worked examples with guidance on which to prefer.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: pseudo-observation construction, sequential MLE algorithm (tree-by-tree), joint MLE, bivariate family selection (AIC/BIC, Vuong, rotation conventions), Dißmann MST algorithm, truncated vines, R code example (rvinecopulib), computational comparison with factor copula SMM.
- [[Copula Architecture Comparison]] — CONTAINS: comparison table (scalability, params, tail dep., asymmetry, estimation, interpretability), guidance on when to use each architecture, tail-dependence formula comparison, $d=5$ portfolio worked example, hybrid factor-vine copula note.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Sources.md]] — Source stub for vine copula notes (PDF downloads blocked by network proxy). Lists: Aas et al. (2009) *Ins. Math. Econ.*; Brechmann & Schepsmeier (2013) *JSS* (open-access); Czado & Nagler (2022) *ARSA*; Bedford & Cooke (2002) *AoS*; Joe (1996).

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
