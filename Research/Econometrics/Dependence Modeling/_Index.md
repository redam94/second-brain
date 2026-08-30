---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-08-30
concept_count: 13
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major copula architectures: (1) **Factor copulas** (Oh & Patton 2012) — latent-variable construction, scalable to d > 100 via SMM; (2) **Vine copulas** (Aas et al. 2009; Czado 2019) — pair-copula constructions (C-vine, D-vine, R-vine), modular and flexible for d ≤ 50. For architecture choice, see [[Copula Architecture Comparison]].
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
> - Need the big picture of vine copulas and where they fit? → [[Vine Copulas - Overview]]
> - Need the pair-copula factorization and h-function recursion? → [[Pair-Copula Decomposition]]
> - Need C-vine and D-vine tree structures and density formulas? → [[C-Vine and D-Vine Structures]]
> - Need R-vine, vine matrix, and Dissmann structure selection? → [[Regular Vines and Structure Selection]]
> - Need estimation (sequential IFM, MLE, family selection)? → [[Vine Copula Estimation]]
>
> **Architecture selection:**
> - Need to choose between vine, factor, Gaussian, or Archimedean copulas? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Factor copula motivation | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula motivation | [[Vine Copulas - Overview]] | overview | — | Pair-copula construction for flexible $d\leq 50$ dependence; any bivariate family per pair; C/D/R-vine structures |
| Bedford-Cooke factorization | [[Pair-Copula Decomposition]] | theorem | Vine Overview | Density = product of bivariate pair copula densities; h-function recursion for conditional CDFs |
| C-vine and D-vine | [[C-Vine and D-Vine Structures]] | definition | Pair-Copula Decomp | C-vine: star trees (root dominates); D-vine: path trees (ordered variables); both have $d(d-1)/2$ pair copulas |
| R-vine and structure selection | [[Regular Vines and Structure Selection]] | concept | C/D-Vine | General vine; vine matrix (RVM); Dissmann greedy max-span-tree; truncation to order $m$ |
| Vine estimation | [[Vine Copula Estimation]] | concept | R-Vine, C/D-Vine | Sequential IFM + joint MLE; per-pair family selection (AIC/BIC); h-function pseudo-obs |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | All above | Factor vs vine vs Gaussian/t vs Archimedean: dimension, tail, estimation, choice criteria |

## Notes

**Factor copulas (Oh & Patton 2012):**
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

**Vine copulas (Aas et al. 2009; Czado 2019; Brechmann & Schepsmeier 2013):**
- [[Vine Copulas - Overview]] — CONTAINS: motivation, Sklar factorization, vine density formula, simplifying assumption, comparison table (vine vs factor vs Gaussian vs Archimedean), dimension table.
- [[Pair-Copula Decomposition]] — CONTAINS: Bedford-Cooke factorization theorem, h-function definition and closed-form formulas (Normal/$t$/Clayton/Gumbel/Frank), conditional CDF recursion, 3D example.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine star-tree definition (density formula), D-vine path-tree definition (density formula), comparison table, 4D tree diagrams, h-function recursion per structure, application heuristics.
- [[Regular Vines and Structure Selection]] — CONTAINS: R-vine proximity condition, vine matrix (RVM) notation, Dissmann greedy max-span-tree algorithm, pair copula family selection with AIC/BIC, vine truncation formula, R code example (rvinecopulib).
- [[Vine Copula Estimation]] — CONTAINS: vine log-likelihood, sequential IFM algorithm, h-function pseudo-observation update, per-family tail-dependence table, marginal estimation options (parametric/semi-parametric/rank-based), asymptotic properties.
- [[Copula Architecture Comparison]] — CONTAINS: full architecture taxonomy table, tail-dependence comparison, dimension-scaling analysis, when-to-choose decision guide, factor vs vine synthesis (Oh & Patton perspective), three application examples.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-2009-Pair-Copula-Constructions.md]] — Aas et al. (2009), "Pair-copula constructions of multiple dependence." *Insurance: Mathematics and Economics*, 44(2):182–198. (Reference file; PDF freely available at epub.ub.uni-muenchen.de/1855/1/paper_487.pdf but blocked by proxy at ingest.)
- [[raw/Brechmann-Schepsmeier-2013-CDVine.md]] — Brechmann & Schepsmeier (2013), "Modeling Dependence with C- and D-Vine Copulas: The R Package CDVine." *Journal of Statistical Software*, 52(3). (Open access; blocked by proxy at ingest.)
- [[raw/Czado-2019-Vine-Copulas.md]] — Czado (2019), *Analyzing Dependent Data with Vine Copulas: A Practical Guide With R*. Springer. (Open access; blocked by proxy at ingest.)

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
