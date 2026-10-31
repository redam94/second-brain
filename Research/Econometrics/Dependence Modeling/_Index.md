---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-31
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two complementary approaches: (1) **Factor copulas** (Oh & Patton 2012) — parsimonious common-factor models for 50+ variables; (2) **Vine copulas** (Aas et al. 2009; Bedford & Cooke 2002) — flexible pair-wise constructions for moderate dimensions. See the comparison table in [[Vine Copulas - Overview]].
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model? → [[Factor Copula Construction]]
> - Need tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the SMM estimation method? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical study? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine / pair copula constructions:**
> - Need the overview and factor-vs-vine comparison? → [[Vine Copulas - Overview]]
> - Need the vine graph structure and proximity condition? → [[Regular Vine Graphs]]
> - Need the density formula and $h$-function? → [[Pair Copula Construction]]
> - Need C-vine or D-vine density formulas? → [[C-Vines and D-Vines]]
> - Need estimation algorithms, family selection, or software? → [[Vine Copula Estimation and Selection]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | Factor Copulas - Overview | PCC: any joint density = product of bivariate copulas; vine organises the $n(n-1)/2$ pairs; factor vs vine trade-off table |
| Vine graph structure | [[Regular Vine Graphs]] | definition | Vine Overview | Regular vine: $n{-}1$ trees; proximity condition; edge labels $(j,k\|D)$; Bedford & Cooke (2002) |
| PCC density & $h$-function | [[Pair Copula Construction]] | definition | Vine Overview, Regular Vine Graphs | $h(u\|v;\theta)=\partial C/\partial v$; closed forms for Normal/$t$/Clayton/Gumbel; recursive conditional CDF computation |
| C-vine & D-vine | [[C-Vines and D-Vines]] | definition | Regular Vine Graphs, PCC | D-vine: path structure; C-vine: star structure; $n!/2$ of each; explicit 4-var density formulas |
| Estimation & selection | [[Vine Copula Estimation and Selection]] | concept | C-Vines and D-Vines, PCC | Sequential MLE (tree-by-tree); MST structure selection ($|\hat{\tau}|$ weights); AIC family selection; truncated vines; VineCopula R, pyvinecopulib |

## Notes

**Factor copulas (Oh & Patton 2012):**
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

**Vine / pair copula constructions (Aas et al. 2009; Bedford & Cooke 2002):**
- [[Vine Copulas - Overview]] — CONTAINS: motivation for vines vs factor/Normal/$t$ copulas, Sklar decomposition, vine idea, factor-vs-vine comparison table, 3-variable PCC example, C-vine and D-vine overview.
- [[Regular Vine Graphs]] — CONTAINS: vine definition (nested trees $T_1,\dots,T_{n-1}$), proximity condition, edge labels (conditioned/conditioning sets), density factorisation theorem, vine count formula, 4-variable example.
- [[Pair Copula Construction]] — CONTAINS: PCC density formula, $h$-function definition, $h$-function closed forms for Normal/$t$/Clayton/Gumbel, simulation algorithm sketch, 3-variable and 4-variable step-by-step examples.
- [[C-Vines and D-Vines]] — CONTAINS: D-vine path structure and density, C-vine star structure and density, structural comparison table, 4-variable density examples for both, $h$-function recursion for D-vine simulation.
- [[Vine Copula Estimation and Selection]] — CONTAINS: sequential MLE algorithm, full MLE, pair copula family menu with AIC selection, MST structure selection (Dißmann et al. 2013), truncated vines and level selection, dimension comparison table (vine vs factor), software (VineCopula R, pyvinecopulib).

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- Aas, Czado, Frigessi & Bakken (2009) — "Pair-copula constructions of multiple dependence", *Insurance: Mathematics and Economics* 44(2):182–198. (PDF unavailable — epub.ub.uni-muenchen.de blocked by network policy)
- Bedford & Cooke (2002) — "Vines — a new graphical model for dependent random variables", *Annals of Statistics* 30(4):1031–1068. (PDF unavailable — network policy)
- Dißmann, Brechmann, Czado & Kurowicka (2013) — "Selecting and estimating regular vine copulae and application to financial returns", *Computational Statistics & Data Analysis* 59:52–69.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
