---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-08-06
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two complementary architectures are covered: **factor copulas** (Oh & Patton 2012) using a shared latent factor — parsimonious and scalable to $n=100{+}$; and **vine copulas** (Bedford & Cooke 2001/2002; Aas et al. 2009) using bivariate pair-copulas in a tree structure — fully heterogeneous but $O(n^2)$ parameters.
>
> **Factor copula cluster:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copula cluster:**
> - Need the motivation, PCC factorization, R-vine definition? → [[Vine Copulas - Overview]]
> - Need h-functions, IFM sequential estimation, tree-selection algorithm? → [[Pair-Copula Construction]]
> - Need C-vine vs D-vine tree structures and truncated vines? → [[C-Vine and D-Vine Structures]]
> - Need to decide between vine and factor copula for your application? → [[Vine Copula vs Factor Copula]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| PCC factorization & R-vine | [[Vine Copulas - Overview]] | overview | — | Bedford-Cooke (2002) vine = nested tree sequence; $\binom{n}{2}$ pair-copulas; simplifying assumption |
| h-function & IFM estimation | [[Pair-Copula Construction]] | definition | Vine Overview | Conditional CDF via partial derivative; sequential tree-by-tree IFM; Dißmann max-spanning-tree selection |
| C-vine & D-vine structures | [[C-Vine and D-Vine Structures]] | definition | PCC, Vine Overview | Star trees (hub var) vs path trees (ordered vars); truncated vines for large $n$ |
| Architecture comparison | [[Vine Copula vs Factor Copula]] | concept | Vine Overview, Factor Overview | Factor: parsimonious, scalable, EVT-friendly; Vine: heterogeneous, closed-form likelihood, $O(n^2)$ params |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: PCC factorization (Joe 1996), R-vine definition (Bedford & Cooke 2002), simplifying assumption, practical scope (n=5–30 or truncated to 100+), contrast with factor copulas.
- [[Pair-Copula Construction]] — CONTAINS: h-function definition (Gaussian/t/Clayton/Gumbel closed forms), sequential IFM estimation algorithm, copula family selection table (tail dependence by family), Dißmann tree-selection algorithm.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine definition (star trees, hub variable), D-vine definition (path trees, ordered variables), $n=4$ worked examples for both, structure-selection guidance table, truncated vines.
- [[Vine Copula vs Factor Copula]] — CONTAINS: architecture comparison table (params, dimension, tail dep, estimation, software), when-to-prefer-factor vs when-to-prefer-vine guidelines, $n=100$ equities worked example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Aas-Czado-Survey.md]] — Synthesis survey compiled from training knowledge of Bedford & Cooke (2001/2002), Aas, Czado, Frigessi & Bakken (2009), and Dißmann et al. (2013). PDF downloads blocked by session network policy (403 on all external academic hosts).

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
