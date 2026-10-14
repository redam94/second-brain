---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-14
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major architectures: (1) **factor copulas** (Oh & Patton 2012) — latent-factor construction for $d \geq 50$, SMM estimation; (2) **vine copulas** (Aas et al. 2009; Bedford & Cooke 2002) — pair-copula constructions for flexible, heterogeneous dependence, closed-form likelihood, $d \leq 30$ typical.
>
> **Factor copulas (Oh & Patton 2012):**
> - Need the motivation, contribution, and big picture? -> [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? -> [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? -> [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? -> [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? -> [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? -> [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas (Aas et al. 2009; Bedford & Cooke 2002):**
> - Need the big picture and factor vs. vine comparison? -> [[Vine Copulas - Overview]]
> - Need the density formula, h-function, and recursive algorithm? -> [[Pair-Copula Construction]]
> - Need tree structure definitions (star vs. path topologies)? -> [[C-vine and D-vine Tree Structures]]
> - Need the general R-vine and Dißmann structure selection? -> [[R-vine Models and Structure Selection]]
> - Need sequential/joint MLE, family selection, and software (VineCopula/rvinecopulib)? -> [[Vine Copula Estimation]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution (factor) | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview & comparison | [[Vine Copulas - Overview]] | overview | — | Mix-and-match bivariate families; closed-form density; best for $d \leq 30$ heterogeneous dependence |
| PCC density & h-function | [[Pair-Copula Construction]] | definition | Vine Overview | Product of $d(d-1)/2$ bivariate copulas; h-function = $\partial C/\partial v$ gives conditional CDFs recursively |
| C-vine & D-vine structures | [[C-vine and D-vine Tree Structures]] | definition | PCC, Vine Overview | C-vine: star topology (one root per tree); D-vine: path topology; differ in conditioning hierarchy |
| R-vine & structure selection | [[R-vine Models and Structure Selection]] | theorem | C/D-vine | General regular vine; Dißmann MST algorithm selects trees greedily by max Kendall's $|\tau|$ |
| Vine estimation & software | [[Vine Copula Estimation]] | theorem | R-vine | Sequential + joint MLE; AIC family selection; VineCopula / rvinecopulib / pyvinecopulib |

## Notes

**Factor copula notes (Oh & Patton 2012):**
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

**Vine copula notes (Aas et al. 2009; Bedford & Cooke 2002; Dißmann et al. 2013):**
- [[Vine Copulas - Overview]] — CONTAINS: motivation, C/D/R-vine vs. factor copula comparison table, simplifying assumption definition, advantage of mix-and-match family selection.
- [[Pair-Copula Construction]] — CONTAINS: general PCC density formula, D-vine density (explicit), C-vine density (explicit), h-function definition (Gaussian/Clayton/Gumbel closed forms), recursive conditional CDF algorithm, parameter count.
- [[C-vine and D-vine Tree Structures]] — CONTAINS: C-vine formal definition (star per tree, root ordering), D-vine formal definition (path topology, variable ordering), structural comparison table, 5-dim C-vine and 4-dim D-vine examples.
- [[R-vine Models and Structure Selection]] — CONTAINS: R-vine formal definition and proximity condition, density factorization theorem (Bedford & Cooke 2002), count of valid R-vines, Dißmann MST greedy algorithm, truncation and mBIC level selection, R-vine matrix representation.
- [[Vine Copula Estimation]] — CONTAINS: IFM two-stage estimation, sequential MLE algorithm, joint MLE, AIC/BIC family selection, rotation families, Rosenblatt PIT diagnostics, software table (VineCopula / rvinecopulib / pyvinecopulib), pyvinecopulib code example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/vine-copula-sources-reference.md]] — Bibliographic reference for vine copula notes (Aas et al. 2009; Bedford & Cooke 2001/2002; Brechmann & Schepsmeier 2013; Czado & Nagler 2022; Dißmann et al. 2013). PDFs confirmed freely available but not downloadable in this session due to egress proxy policy.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
