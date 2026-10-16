---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-16
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major copula architectures: **factor copulas** (Oh & Patton 2012 — parsimonious, latent-factor-based, designed for $n \geq 50$) and **vine copulas** (Aas et al. 2009; Bedford & Cooke 2002 — flexible pairwise structure, $O(n^2)$ pair-copulas, suited for $n \leq 20$–$30$).
>
> **Factor copulas:**
> - Motivation, contribution, and big picture → [[Factor Copulas - Overview]]
> - Latent factor model defining the copula → [[Factor Copula Construction]]
> - Analytical tail-dependence coefficients (correlated crashes/booms) → [[Tail Dependence in Factor Copulas]]
> - Multiple factors, heterogeneous or industry-block dependence → [[Multi-Factor and Block Dependence Structures]]
> - Estimation method (no closed-form likelihood, rank-based SMM) → [[SMM Estimation of Factor Copulas]]
> - Empirical results, asymmetric dependence, systemic risk → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas (new — 2026-10-16):**
> - Overview: what vine copulas are and why they exist → [[Vine Copulas - Overview]]
> - The formal density factorisation (PCC framework, h-functions) → [[Pair-Copula Construction Framework]]
> - C-vine vs D-vine structures, tree diagrams, structure selection → [[C-Vine and D-Vine Structures]]
> - Sequential and joint MLE estimation; software → [[Vine Copula Estimation]]
>
> **Choosing between architectures:**
> - Vine vs factor copulas — when to use which → [[Vine vs Factor Copulas - Architecture Comparison]]

## Concept Map

### Factor Copulas

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |

### Vine Copulas (added 2026-10-16)

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Vine overview | [[Vine Copulas - Overview]] | overview | — | Bedford & Cooke (2002) vines + Aas et al. (2009) estimation; density = product of bivariate copula densities; h-function enables recursion |
| PCC density factorisation | [[Pair-Copula Construction Framework]] | definition | Vine Overview | C-vine and D-vine density formulae; h-function table for Gaussian, $t$, Clayton, Gumbel; 4-variable D-vine worked example |
| C-vine and D-vine structures | [[C-Vine and D-Vine Structures]] | concept | Overview, PCC | C-vine: star-of-stars (hub variable); D-vine: path-of-paths (ordered variables); R-vine: max spanning tree for general case |
| Estimation | [[Vine Copula Estimation]] | theorem | C/D-vine, PCC | Sequential MLE (tree-by-tree), full joint MLE, AIC/BIC family selection, vine truncation; `pyvinecopulib` Python |
| Architecture comparison | [[Vine vs Factor Copulas - Architecture Comparison]] | concept | Both overviews | Vine: flexible, $O(n^2)$ params, best for $n \leq 20$; Factor: parsimonious $O(K)$, best for $n \geq 50$; tail-dependence trade-off |

## Notes

### Factor Copulas
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copulas (added 2026-10-16)
- [[Vine Copulas - Overview]] — CONTAINS: motivation (curse of dimensionality for parametric copulas), Sklar decomposition recap, vine definition (Bedford & Cooke 2002), pair-copula concept, h-function definition, position vs Gaussian/$t$/Archimedean/factor copulas, literature pointers.
- [[Pair-Copula Construction Framework]] — CONTAINS: C-vine density formula, D-vine density formula, R-vine density, h-function table (Gaussian, $t$, Clayton, Gumbel), conditional CDF recursion, parameter-count table, 4-variable D-vine worked example with explicit factorisation.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine definition (star-of-stars), D-vine definition (path-of-paths), 4-variable worked examples with tree diagrams, R-vine definition, max-spanning-tree structure-selection algorithm, heuristic table for when to use each.
- [[Vine Copula Estimation]] — CONTAINS: PIT marginal estimation, sequential estimation algorithm (tree-by-tree MLE + h-function propagation), full joint MLE, h-function table for standard families, AIC/BIC family selection, vine truncation, `pyvinecopulib` / `VineCopula` / `rvinecopulib` software, 3-variable D-vine worked example.
- [[Vine vs Factor Copulas - Architecture Comparison]] — CONTAINS: side-by-side comparison table (construction, parameters, scalability, tail dependence, estimation, software), scalability trade-off analysis, tail dependence profiles, estimation comparison table, worked examples (commodities → vine; equities $n=100$ → factor).

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-2009-Pair-Copula-Constructions-source.md]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2). LMU working paper #487 confirmed free; PDF unavailable from this environment (proxy restriction, 2026-10-16).
- [[raw/Bedford-Cooke-2002-Vines-source.md]] — Bedford & Cooke (2002), "Vines — a new graphical model for dependent random variables", *Annals of Statistics* 30(4). Open access on Project Euclid; PDF unavailable from this environment (proxy restriction, 2026-10-16).

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
