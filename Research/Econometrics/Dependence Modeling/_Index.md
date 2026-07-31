---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-31
concept_count: 9
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two architectures: **factor copulas** (Oh & Patton 2012, scales to d=100+) and **vine copulas** / pair-copula constructions (Aas et al. 2009, maximum local flexibility for d≤30).
> - Need factor copula big picture? → [[Factor Copulas - Overview]]
> - Need the factor copula latent-variable model? → [[Factor Copula Construction]]
> - Need analytical tail-dependence theory? → [[Tail Dependence in Factor Copulas]]
> - Need multi-factor or block-dependence extensions? → [[Multi-Factor and Block Dependence Structures]]
> - Need factor copula estimation (rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical application? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need vine copula overview and architecture comparison? → [[Vine Copulas - Overview]]
> - Need C-vine/D-vine density formulas and h-function? → [[Pair-Copula Constructions and Vine Structures]]
> - Need vine estimation (sequential MLE, MST, software)? → [[Vine Copula Estimation and Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula architecture | [[Vine Copulas - Overview]] | overview | — | $d(d-1)/2$ pair copulas in vine trees; C-vine=star, D-vine=path, R-vine=general; flexible but $O(d^2)$ params |
| C-vine/D-vine density formulas | [[Pair-Copula Constructions and Vine Structures]] | definition | Vine Overview | Bedford & Cooke density thm; d=4 C-vine and D-vine examples; h-function for conditional CDFs |
| Vine estimation & comparison | [[Vine Copula Estimation and Architecture Comparison]] | concept | PCC, Vine Overview | Dißmann MST structure selection; sequential MLE; truncated vines; vine vs factor copula decision table |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: pair-copula construction idea (Joe 1997), Bedford & Cooke vine definition, C-vine/D-vine/R-vine informal definitions, simplifying assumption, historical timeline, position vs factor copulas (interpretability and scaling arguments).
- [[Pair-Copula Constructions and Vine Structures]] — CONTAINS: R-vine formal definition (Bedford & Cooke 2002 Thm 4.2), h-function definition with closed-form table (Gaussian/$t$/Clayton/Gumbel/Frank), d=4 C-vine and D-vine density formulas with annotated tree diagrams, parameter count table by $d$.
- [[Vine Copula Estimation and Architecture Comparison]] — CONTAINS: Dißmann MST structure selection algorithm, pair copula family selection table (tail dependence and symmetry properties), sequential MLE definition, truncated vine definition, R/Python software code examples, vine vs factor copula systematic comparison table.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Synthesis-Survey.md]] — Synthesis survey of vine copula foundational literature: Bedford & Cooke (2001, 2002), Aas et al. (2009), Dißmann et al. (2013), Czado (2019). Source PDFs freely available but blocked by network policy; content from training knowledge.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
