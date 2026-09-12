---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-09-12
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two main architectural clusters: **factor copulas** (Oh & Patton 2012, the original 6 notes) covering the factor-copula construction, tail-dependence via EVT, multi-factor/block extensions, SMM estimation, and the S&P 100 application; and **vine copulas** (Aas et al. 2009, 5 new notes) covering pair-copula constructions, C-vine/D-vine structures, sequential MLE, and architecture comparison.
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copulas:**
> - Need the vine copula overview, pair-copula decomposition concept? → [[Vine Copulas - Overview]]
> - Need the $h$-function machinery and explicit density formulas? → [[Pair Copula Constructions]]
> - Need the C-vine/D-vine/R-vine structure definitions and when to use each? → [[C-Vine and D-Vine Structures]]
> - Need sequential MLE, structure selection, and family selection algorithms? → [[Vine Copula Estimation]]
> - Need to choose between factor copulas, vine copulas, Gaussian, and Archimedean? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | PCC decomposes $n$-dim density into $\binom{n}{2}$ pair copulas; Bedford-Cooke vine framework; simplifying assumption |
| $h$-function & PCC | [[Pair Copula Constructions]] | definition | Vine Copulas - Overview | $h(u\mid v;\theta)=\partial C(u,v)/\partial v$; enables sequential density evaluation and estimation |
| C-vine / D-vine / R-vine | [[C-Vine and D-Vine Structures]] | definition | Pair Copula Constructions | D-vine: path structure for ordered vars; C-vine: star with dominant root; R-vine: general proximity-condition tree |
| Sequential & joint MLE | [[Vine Copula Estimation]] | theorem | C-Vine and D-Vine Structures | Tree-by-tree MLE via $h$-functions; consistent & asymp. normal under simplifying assumption; greedy MST structure selection |
| Architecture tradeoffs | [[Copula Architecture Comparison]] | concept | All above | Vine: flexible, $n\leq 30$; Factor: parsimonious, $n\geq 30$; Gaussian: scalable, zero tail dep.; Archimedean: 1-param, exchangeable |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: Bedford-Cooke vine framework, PCC factorisation theorem, simplifying assumption, vine vs. factor vs. Archimedean vs. elliptical overview table, 4-variable D-vine example density.
- [[Pair Copula Constructions]] — CONTAINS: $h$-function definition, $h$-function formulas for Gaussian/Student-$t$/Clayton/Gumbel, 4-variable D-vine density (explicit with $h$-function tree), 4-variable C-vine density, conditional density theorem.
- [[C-Vine and D-Vine Structures]] — CONTAINS: R-vine proximity condition definition, D-vine path structure (5-var example table), C-vine star structure (5-var example table), R-vine general definition, truncated vine, structure selection heuristics table.
- [[Vine Copula Estimation]] — CONTAINS: marginal estimation strategies (parametric/ECDF/kernel/IFM), sequential MLE algorithm (D-vine, explicit), consistency/asymptotic normality theorem, greedy MST structure selection (Dißmann 2013), pair copula family selection table, 3-variable concrete estimation example.
- [[Copula Architecture Comparison]] — CONTAINS: full 10-row comparison table (Gaussian/$t$/grouped-$t$/Clayton/Gumbel/Frank/D-vine/C-vine/R-vine/factor equidep./factor block), elliptical copula properties, Archimedean generator table, vine strengths/weaknesses, factor copula strengths/weaknesses, decision guide table, Oh & Patton (2012) head-to-head finding for $n=100$.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Aas-Czado-Survey.md]] — Survey of vine copula foundational literature: Aas et al. (2009) Insurance:ME; Bedford & Cooke (2001, 2002); Czado (2019). PDFs inaccessible via egress proxy; content from literature knowledge.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
