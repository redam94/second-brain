---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-02
concept_count: 9
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two complementary frameworks: **factor copulas** (Oh & Patton 2012, for $d \geq 50$) and **vine/pair copulas** (Aas et al. 2009, for $d \leq 20$–$30$). Contains 9 notes.
> - Need the motivation, contribution, and big picture of factor copulas? -> [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? -> [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? -> [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? -> [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? -> [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? -> [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need the vine copula / pair copula construction (PCC) framework? -> [[Vine Copulas - Overview]]
> - Need C-vine vs D-vine tree topologies, h-functions, or sequential estimation? -> [[C-Vine and D-Vine Structures]]
> - Need to choose between copula architectures (factor vs vine vs Normal vs Archimedean)? -> [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine / PCC framework | [[Vine Copulas - Overview]] | overview | Factor Copulas Overview, Dependence Measures | $f(\mathbf{x}) = \prod f_k(x_k)\cdot\prod c_{ab\|D}(F(x_a\|x_D), F(x_b\|x_D))$; $d(d-1)/2$ pair copulas; simplifying assumption |
| C-vine & D-vine topologies | [[C-Vine and D-Vine Structures]] | concept | Vine Overview | C-vine: star trees (hub); D-vine: path trees (ordered); h-function $h(u\|w;\theta)=\partial C/\partial w$; sequential MLE |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | Factor copulas: $d\geq50$, parsimonious; vine copulas: $d\leq20$, pair-flexible; Normal: no tail dep.; Archimedean: $d\leq5$ |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: pair copula construction (PCC) framework, regular vine (R-vine) definition (Bedford & Cooke 2001/2002), pair copula density decomposition formula, simplifying assumption, $d=3$ example.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine (star topology) and D-vine (path topology) definitions, h-function with closed-form expressions for Gaussian/$t$/Clayton/Gumbel, sequential estimation algorithm ($d=4$ worked example), vine structure selection (Kendall's $\tau$ heuristic, Dißmann MST).
- [[Copula Architecture Comparison]] — CONTAINS: dimension–flexibility trade-off table (Normal/$t$/Archimedean/factor/vine), parameter-count comparison, when-to-use decision guide, Oh & Patton critique of vine copulas for high $d$, factor-vine complementarity by dimension regime.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copula-Aas-Czado-Survey.md]] — Synthesis survey: Aas, Czado, Frigessi & Bakken (2009) *Insurance: Mathematics and Economics*; Bedford & Cooke (2001, 2002); Joe (1996). Covers vine/pair copula construction, C/D-vine tree structures, h-functions, sequential estimation. Source PDFs paywalled; content from training knowledge.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
