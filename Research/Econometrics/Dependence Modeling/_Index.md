---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-29
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two major architectures are now documented: (1) **Factor copulas** (Oh & Patton 2012/2017): $O(d)$ parameters, SMM estimation, feasible for $d \geq 100$; (2) **Vine copulas** (Aas et al. 2009, Bedford & Cooke 2002): $O(d^2)$ pair copulas, sequential MLE, flexible bivariate structure, practical for $d \leq 50$. See [[Copula Architecture Comparison]] for the head-to-head trade-off.
>
> **Factor copula cluster:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copula cluster (new — ingested 2026-07-29):**
> - Need the vine copula framework, pair-copula decomposition, and architecture overview? → [[Vine Copulas - Overview]]
> - Need the h-function definition and pair-copula density recursion? → [[Pair-Copula Construction]]
> - Need C-vine vs D-vine tree structures, R-vine matrix, sampling formulas? → [[C-Vine and D-Vine Structures]]
> - Need structure selection (Dißmann) and sequential MLE estimation? → [[Vine Copula Estimation and Selection]]
> - Need to choose between vine, factor, Gaussian, or Archimedean copula? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula framework | [[Vine Copulas - Overview]] | overview | — | Pair-copula construction with $d(d-1)/2$ bivariate copulas; C-vine, D-vine, R-vine; flexibility in tail dependence per pair |
| h-function & PCC density | [[Pair-Copula Construction]] | definition | Vine Overview | $h_{1\|2}=\partial C_{12}/\partial u_2$; key recursion for density, sampling, and sequential MLE |
| C-vine & D-vine structures | [[C-Vine and D-Vine Structures]] | concept | Pair-Copula | Star = C-vine (central driver); path = D-vine (sequential ordering); R-vine matrix representation |
| Estimation & selection | [[Vine Copula Estimation and Selection]] | concept | Pair-Copula, C/D-Vine | Dißmann max-spanning-tree algorithm; sequential MLE; truncated vine; VineCopula/rvinecopulib |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | Factor copula for $d \geq 50$ (O(d) params, SMM); vine for $d \leq 50$ (O(d²), seq. MLE, per-pair flexibility) |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: motivation (Gaussian/Archimedean limitations), Sklar decomposition for PCCs, C-vine/D-vine definition, R-vine existence/uniqueness, d=4 D-vine example, position relative to factor copulas.
- [[Pair-Copula Construction]] — CONTAINS: h-function definition and table for Gaussian/t/Clayton/Gumbel, conditional distribution recursion, simplifying assumption, $d=3$ D-vine density formula, $d=4$ sequential h-function computation example, sampling algorithm.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine definition (star topology) and $d=4$ example, D-vine definition (path topology) and $d=4$ example, R-vine matrix representation, software table (VineCopula, rvinecopulib, pyvinecopulib).
- [[Vine Copula Estimation and Selection]] — CONTAINS: PIT/empirical-rank preprocessing, Dißmann maximum-spanning-tree algorithm (Tree 1–$k$), AIC family selection, sequential MLE consistency theorem, truncated vine definition, VineCopula R and pyvinecopulib Python code examples.
- [[Copula Architecture Comparison]] — CONTAINS: four-architecture taxonomy (Gaussian, Archimedean, factor, vine), factor-vs-vine comparison table (params/estimation/tail/scale/software), decision guide (when to use each), S&P 100 ($d=100$) example showing vine infeasibility, $d=10$ commodity vine example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Synthesis-Survey.md]] — Synthesis survey from training knowledge of: Aas et al. (2009) pair-copula constructions; Bedford & Cooke (2002) regular vines; Czado (2010) book chapter; Dißmann et al. (2013) structure selection; Aas (2016) review; Czado & Nagler (2022) annual review. External PDFs freely available but blocked by session network policy (proxy 403); synthesised 2026-07-29.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
