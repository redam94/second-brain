---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-16
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major copula architectures: **factor copulas** (Oh & Patton 2012, parsimonious, $N=100+$) and **vine copulas** (Aas et al. 2009, flexible, $N\le50$).
>
> **Factor copulas (Oh & Patton 2012):**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors / industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results / systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas (Aas et al. 2009; Bedford & Cooke 2002):**
> - Need the overview and motivation? → [[Vine Copulas - Overview]]
> - Need the density formula and h-function recursion? → [[Pair-Copula Decomposition]]
> - Need C-vine vs D-vine details? → [[C-vine and D-vine Structures]]
> - Need the general R-vine framework (Bedford-Cooke)? → [[Regular Vine Copulas]]
> - Need estimation (sequential MLE, structure/family selection, software)? → [[Vine Copula Estimation and Model Selection]]
>
> **Architecture comparison:**
> - Need to choose between factor copula and vine copula? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | Pair-copula constructions decompose $N$-dim density into $N(N-1)/2$ bivariate copulas via h-function cascade |
| H-function & density decomposition | [[Pair-Copula Decomposition]] | theorem | Vine Copulas - Overview | Joe (1996) / Aas (2009): $f = \prod f_k \cdot \prod c_{jk\|D}(h(\cdot),h(\cdot))$; h-function is $\partial C/\partial u_2$ |
| C-vine & D-vine | [[C-vine and D-vine Structures]] | definition | Pair-Copula Decomposition | D-vine = chain; C-vine = hub; select ordering by max spanning tree on $\|\hat\tau\|$ |
| Regular vine (R-vine) | [[Regular Vine Copulas]] | definition | C-vine and D-vine Structures | Bedford-Cooke vine via nested spanning trees; R-vine matrix encodes structure; C/D-vine are special cases |
| Vine estimation & selection | [[Vine Copula Estimation and Model Selection]] | concept | Regular Vine Copulas | Sequential tree-by-tree MLE via h-functions; Dißmann greedy spanning tree; AIC family selection; VineCopula/pyvinecopulib |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Factor Copulas - Overview, Vine Copulas - Overview | Factor copula: parsimonious, $N=100+$, analytic tail; Vine: flexible, $N\le50$, heterogeneous families |

## Notes

**Factor Copulas (Oh & Patton 2012):**
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

**Vine Copulas (Aas et al. 2009; Bedford & Cooke 2002):**
- [[Vine Copulas - Overview]] — CONTAINS: pair-copula construction overview, simplifying assumption, three-variable D-vine example, position in copula literature.
- [[Pair-Copula Decomposition]] — CONTAINS: full PCC density theorem (Joe 1996 / Aas 2009), h-function definition and closed forms for Gaussian/Clayton/Gumbel/$t$/Frank, h-function recursion, three-variable example comparing orderings.
- [[C-vine and D-vine Structures]] — CONTAINS: formal D-vine and C-vine definitions, tree-by-tree structure, 4-variable worked examples (both), comparison table, ordering selection heuristic (max spanning tree on $|\hat\tau|$).
- [[Regular Vine Copulas]] — CONTAINS: vine definition (proximity condition), conditioned/conditioning sets, R-vine structure matrix (4-variable C-vine and D-vine examples), Bedford-Cooke density theorem with proof sketch, count of valid R-vine structures.
- [[Vine Copula Estimation and Model Selection]] — CONTAINS: Stage 1 pseudo-observations, Stage 2 structure selection (Dißmann greedy spanning tree), Stage 3 family selection (AIC over bivariate library), sequential vs joint MLE, truncation, `VineCopula` R / `pyvinecopulib` Python API with code example.
- [[Copula Architecture Comparison]] — CONTAINS: full comparison table (Gaussian/$t$/factor/vine), when to use factor vs vine copula, tail dependence comparison, the Gaussian copula failure and its lessons, S&P 100 and weather-station application examples.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp.
- [[raw/Vine-Copula-Synthesis-Survey.md]] — Synthesis survey from training knowledge of Aas et al. (2009), Bedford & Cooke (2002), Dißmann et al. (2013), Joe (1996), Czado (2019). Created 2026-07-16; PDF downloads blocked by session network policy (arxiv.org and institutional repos).

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
