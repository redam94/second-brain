---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-09-13
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two architectures: **factor copulas** (Oh & Patton 2012 — low-rank latent structure, SMM estimation, scales to $N=100$+) and **vine/pair copulas** (Aas et al. 2009 — hierarchical bivariate decomposition, sequential MLE, flexible for $n\leq 20$).
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
> - Need the motivation, pair copula idea, and comparison with factor copulas? → [[Vine Copulas - Overview]]
> - Need the formal density factorization and the h-function? → [[Pair Copula Decomposition]]
> - Need C-vine vs D-vine tree structures and when to use each? → [[C-vine and D-vine Structures]]
> - Need sequential MLE, family selection (AIC/BIC), and software? → [[Vine Copula Estimation and Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula motivation | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | Pair copula decomposition; $O(n^2)$ pair copulas; flexible but harder to scale than factor copulas |
| Density factorization & h-function | [[Pair Copula Decomposition]] | theorem | Vine Overview | $f = \prod f_k \cdot \prod c_{jk\|D}$; h-function $h(u\|v) = \partial C/\partial v$ propagates conditional CDFs between tree levels |
| C-vine and D-vine | [[C-vine and D-vine Structures]] | definition | Pair Copula Decomposition | C-vine: star topology, common driver; D-vine: path topology, sequential ordering; both use $\binom{n}{2}$ pair copulas |
| Estimation & selection | [[Vine Copula Estimation and Selection]] | theorem | C/D-vine, h-function | Sequential MLE tree by tree; AIC/BIC family selection; maximum spanning tree structure selection |

## Notes

### Factor Copulas (Oh & Patton 2012)

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine / Pair Copulas (Aas et al. 2009)

- [[Vine Copulas - Overview]] — CONTAINS: pair copula idea (Bedford & Cooke 2001/2002), regular vine structure, simplifying assumption, comparison table (factor vs vine copulas), key literature.
- [[Pair Copula Decomposition]] — CONTAINS: factorization theorem ($f = \prod f_k \cdot \prod c_{jk|D}$), h-function definition and formula for Gaussian/$t$/Clayton/Gumbel families, recursive computation algorithm, 3-variable C-vine worked example.
- [[C-vine and D-vine Structures]] — CONTAINS: C-vine definition (star topology, root variable), D-vine definition (path topology), 4-variable tree diagrams, C-vine vs D-vine comparison table, truncated vine definition, practical use-case guidance.
- [[Vine Copula Estimation and Selection]] — CONTAINS: sequential MLE theorem (consistency, asymptotic normality, sandwich variance), full joint MLE, pair copula family selection (AIC/BIC, copula rotations), vine structure selection (maximum spanning tree on Kendall's $\tau$), software table (VineCopula R, pyvinecopulib Python), 4-variable D-vine estimation walkthrough.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-2009-Pair-Copula-Constructions.md]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2), 182–198. [PDF not downloaded — egress policy; reference file created.]

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
