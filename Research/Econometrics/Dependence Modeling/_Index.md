---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-07-10
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Two major copula architectures are covered: (1) **factor copulas** (Oh & Patton 2012) — latent factor structure, scales to d=100+, estimated by SMM; and (2) **vine copulas / pair copula constructions** (Aas et al. 2009; Dissmann et al. 2013) — d(d-1)/2 bivariate building blocks in a tree structure, flexible pair-specific dependence, estimated by sequential MLE.
> - Need the factor copula motivation and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the factor copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the factor copula estimation method (rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the factor copula empirical results and systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
> - Need the vine copula motivation and architecture overview? → [[Vine Copulas - Overview]]
> - Need the formal PCC density, h-functions, and sequential MLE? → [[Pair Copula Construction and h-Functions]]
> - Need C-vine and D-vine density formulas and use cases? → [[C-Vine and D-Vine Structures]]
> - Need R-vine generalisation and greedy structure selection (Dissmann algorithm)? → [[Regular Vine Copulae and Structure Selection]]
> - Need to choose between vine, factor, Gaussian, or Archimedean copulas? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Factor copula motivation | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC factors, 16 params) → heterogeneous dependence |
| SMM estimation (factor) | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal; bootstrap covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | $d(d-1)/2$ pair copulas in vine tree; each pair gets own family; flexible heterogeneous dependence |
| h-functions & sequential MLE | [[Pair Copula Construction and h-Functions]] | definition | Vine Overview | $h(u_i\|u_j)=\partial C/\partial u_j$; recursive pseudo-obs; tree-by-tree MLE; mixed families |
| C-vine and D-vine | [[C-Vine and D-Vine Structures]] | definition | PCC | C-vine: star (hub variable); D-vine: path (ordered sequence); explicit density formulas |
| R-vine & Dissmann algorithm | [[Regular Vine Copulae and Structure Selection]] | definition | C/D-vine | Proximity condition; vine matrix; greedy MST selection of tree structure by Kendall $\tau$ |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine, Factor | Vine (d≤20, heterogeneous pairs) vs factor (d≥50, common shock) vs Gaussian/t/Archimedean |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: PCC idea (pair copulas in vine tree), motivating d=3 factorisation, simplifying assumption, vine types (D/C/R), position vs factor/Gaussian/t/Archimedean copulas.
- [[Pair Copula Construction and h-Functions]] — CONTAINS: formal h-function definition (partial derivative of bivariate copula), closed-form $h$ for Normal/Student-t/Clayton, recursive pseudo-observation computation, sequential MLE procedure, AIC pair copula family selection, copula family table (Gaussian, t, Clayton, Gumbel, Frank, Joe, BB1, BB7).
- [[C-Vine and D-Vine Structures]] — CONTAINS: D-vine path topology and explicit density formula, C-vine star topology and density formula, d=3/d=4 comparison, number of valid orderings, when to use C-vine vs D-vine.
- [[Regular Vine Copulae and Structure Selection]] — CONTAINS: R-vine formal definition (proximity condition), vine matrix representation, Dissmann et al. (2013) greedy MST algorithm with $|\tau|$ edge weights, truncated R-vines and order selection, AIC-based pair copula family selection, 5-variable financial returns application.
- [[Copula Architecture Comparison]] — CONTAINS: architecture comparison matrix (Gaussian/t/Archimedean/vine/factor), dimension and scalability analysis, tail dependence by architecture, economic interpretation (network vs latent factor), practical decision guide by dimension.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copula-Synthesis-Survey.md]] — Synthesis survey from training knowledge: Aas et al. (2009) "Pair-Copula Constructions of Multiple Dependence" (*Ins. Math. Econ.* 44:182–198); Dissmann et al. (2013) "Selecting and Estimating Regular Vine Copulae" (*CSDA* 59:52–69; arXiv:1202.2002); Czado & Nagler (2022) "Vine Copula Based Modeling" (*Ann. Rev. Stat.* 9:453–477); Bedford & Cooke (2002) "Vines" (*Ann. Stat.* 30:1031–1068). PDFs freely available but blocked by session egress policy (2026-07-10).

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
