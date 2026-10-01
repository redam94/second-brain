---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-01
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two competing architectures: the **factor copula** (Oh & Patton 2012, scales to $d=100+$, analytical tail dependence, SMM estimation) and the **vine / pair-copula construction** (Aas et al. 2009; Bedford & Cooke 2002, maximum flexibility via bivariate building blocks, sequential ML, for $d \lesssim 50$).
> - Need the factor copula motivation and overview? → [[Factor Copulas - Overview]]
> - Need the latent factor model? → [[Factor Copula Construction]]
> - Need analytical tail dependence (EVT, Propositions 1–3)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need factor copula estimation (rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical application or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need the vine copula overview and motivation? → [[Vine Copulas - Overview]]
> - Need the PCC density formula and h-function recursion? → [[Pair Copula Constructions - PCC]]
> - Need C-vine vs D-vine graph structures and structure selection? → [[C-vine and D-vine Structures]]
> - Need a comparison of vine vs factor copula architectures? → [[Vine vs Factor Copula Architectures]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution (factor) | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation (factor) | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | Decomposes joint density into $d(d-1)/2$ bivariate pair copulas; two architectures (vine vs factor) with distinct scalability/flexibility trade-offs |
| PCC density & h-function | [[Pair Copula Constructions - PCC]] | definition | Vine Copulas - Overview | General PCC density product; h-function recursion; sequential ML estimator; simplifying assumption |
| C-vine and D-vine structures | [[C-vine and D-vine Structures]] | definition | Vine Copulas - Overview, PCC | C-vine = star trees (hub variable); D-vine = path trees (sequential order); R-vine = general; Dißmann max-spanning-tree selection |
| Architecture comparison | [[Vine vs Factor Copula Architectures]] | concept | all above | Factor preferred for $d>30$; vine preferred for moderate $d$ with heterogeneous tail structure |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: vine copula programme (Bedford & Cooke 2002; Aas et al. 2009), bivariate decomposition, vine graphical structure definition, D-vine 4-variable example, historical table, architecture comparison table vs factor copulas.
- [[Pair Copula Constructions - PCC]] — CONTAINS: general R-vine PCC density formula, C-vine density formula (indexed by root nodes), D-vine density formula, h-function definition with closed-form table (Gaussian/$t$/Clayton/Gumbel), simplifying assumption, sequential ML algorithm (Steps 1–$j$), full-MLE note.
- [[C-vine and D-vine Structures]] — CONTAINS: R-vine formal definition (proximity condition), C-vine definition (star trees), D-vine definition (path trees), R-vine vs C-vine vs D-vine structural table, vine structure selection (Dißmann et al. 2013 greedy algorithm), truncated vine definition, market-factor C-vine example, time-series D-vine example.
- [[Vine vs Factor Copula Architectures]] — CONTAINS: full architecture comparison table (8 dimensions), when-to-prefer-vine criteria, when-to-prefer-factor criteria, hybrid approaches (factor vine, sparse vine, truncated C-vine), tail-dependence comparison, S&P 100 scalability example, insurance portfolio flexibility example.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-Czado-Frigessi-Bakken-2009-Pair-Copula.txt]] — Aas, Czado, Frigessi & Bakken (2009), "Pair-copula constructions of multiple dependence", Insurance: Mathematics and Economics 44(2):182–198. [PDF identified at epub.ub.uni-muenchen.de; proxy-blocked at ingest time]
- [[raw/Bedford-Cooke-2002-Vines-Graphical-Model.txt]] — Bedford & Cooke (2002), "Vines — a new graphical model for dependent random variables", Annals of Statistics 30(4):1031–1068. Open access at Project Euclid. [proxy-blocked at ingest time]

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
