---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-11-07
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: (1) **factor copulas** (Oh & Patton 2012) — latent-factor structure, scales to $d=100+$, estimated by SMM; (2) **vine copulas** (Bedford & Cooke 2001/2002; Aas et al. 2009) — cascade of bivariate pair copulas in a tree, $d(d-1)/2$ pair copulas, estimated by sequential/joint MLE.
> - Need the factor copula motivation and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the factor copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (factor copula)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the SMM estimation for factor copulas (no closed-form density)? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical results and systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need vine copulas (the flexible alternative architecture)? → [[Vine Copulas - Overview]]
> - Need the pair-copula density decomposition and h-function recursion? → [[Pair-Copula Constructions]]
> - Need C-vine and D-vine density formulas (special vine structures)? → [[C-Vine and D-Vine Structures]]
> - Need vine structure selection (Dißmann algorithm) and sequential MLE? → [[Vine Copula Structure Selection and Estimation]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | PCC decomposes joint density into $d(d-1)/2$ pair copulas; each can have distinct family; flexible tail dep; comparison with factor copulas |
| Pair-copula decomposition | [[Pair-Copula Constructions]] | theorem | Vine Overview | Density = marginals × product of bivariate copula densities at conditional CDFs; h-function recursion; simplifying assumption |
| C-vine and D-vine | [[C-Vine and D-Vine Structures]] | definition | PCC | C-vine: star trees (root variable conditions all); D-vine: path trees (chain ordering); explicit density products; $(d-1)!/2$ orderings each |
| Structure selection & estimation | [[Vine Copula Structure Selection and Estimation]] | theorem | C/D-Vine, PCC | Dißmann max-spanning-tree algorithm; sequential MLE; AIC pair-copula family selection; truncated vines; VineCopula/pyvinecopulib |

## Notes

### Factor Copulas (Oh & Patton 2012)
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine Copulas (Bedford & Cooke 2001/2002; Aas et al. 2009)
- [[Vine Copulas - Overview]] — CONTAINS: motivation for vine copulas vs Gaussian/$t$/Archimedean/factor copulas, Sklar decomposition, PCC definition, simplifying assumption, table comparing architectures, bivariate $d=3$ example, Norwegian financial data application.
- [[Pair-Copula Constructions]] — CONTAINS: density decomposition theorem, h-function definition (with closed forms for Gaussian/$t$/Clayton), recursive conditional CDF theorem, simplifying assumption definition, $d=4$ D-vine h-function recursion example.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine definition (star trees), C-vine density formula ($d$-dimensional), D-vine definition (path trees), D-vine density formula, $d=4$ explicit tree diagrams, counting vine orderings ($(d-1)!/2$ each).
- [[Vine Copula Structure Selection and Estimation]] — CONTAINS: sequential MLE algorithm (tree-by-tree), pair-copula family selection (AIC, rotated copulas, independence test), Dißmann et al. 2013 max-spanning-tree R-vine selection, truncated vines as conditional independence, VineCopula R / pyvinecopulib Python.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-et-al-2009-Pair-Copula-Constructions-reference.md]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2), 182–198. Free working-paper PDF blocked by session network policy; URL recorded in stub file.
- [[raw/Bedford-Cooke-2002-Vines-reference.md]] — Bedford & Cooke (2002), "Vines — a new graphical model for dependent random variables", *Annals of Statistics* 30(4), 1031–1068. Free draft blocked by session network policy; URL recorded in stub file.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
