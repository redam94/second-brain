---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-09-09
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two major copula architectures: **factor copulas** (Oh & Patton 2012 — latent-factor construction, tail dependence via EVT, SMM estimation, S&P 100 application) and **vine/pair copulas** (Bedford-Cooke framework, PCC density decomposition, C-vine/D-vine/R-vine structures, sequential MLE, VineCopula R / pyvinecopulib Python).
>
> **Factor copulas (Oh & Patton 2012):**
> - Need the motivation and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model? → [[Factor Copula Construction]]
> - Need tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the SMM estimation method? → [[SMM Estimation of Factor Copulas]]
> - Need the S&P 100 empirical results? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine / pair copulas (Aas et al. 2009; Bedford & Cooke 2001/2002):**
> - Need the overview and factor-vs-vine comparison? → [[Vine Copulas - Overview]]
> - Need the PCC density formula and h-functions? → [[Pair Copula Decomposition]]
> - Need C-vine (star) vs D-vine (path) tree topologies? → [[C-Vine and D-Vine Structures]]
> - Need automatic R-vine structure selection (Dissmann MST algorithm)? → [[R-Vine Structure Selection]]
> - Need sequential MLE, family selection, VineCopula R / pyvinecopulib Python? → [[Vine Copula Estimation and Software]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Factor copula motivation | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Factor copula construction | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian |
| Factor tail dependence | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) |
| SMM estimation (factor) | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$) |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula framework | [[Vine Copulas - Overview]] | overview | — | $d$-dim density = $d$ marginals × $\binom{d}{2}$ pair copulas; vine is sequence of $d-1$ trees; simplifying assumption |
| PCC density & h-functions | [[Pair Copula Decomposition]] | theorem | Vine Copulas - Overview | $h(v|u;\theta)=\partial C/\partial u$; h-functions compute pseudo-obs for next tree; closed forms for Gaussian/t/Clayton/Gumbel |
| C-vine & D-vine | [[C-Vine and D-Vine Structures]] | definition | Vine, PCC | C-vine: star topology (dominant variable); D-vine: path topology (sequential order) |
| R-vine & structure selection | [[R-Vine Structure Selection]] | concept | C/D-vine, PCC | Dissmann 2013 MST algorithm: sequential max-weight spanning tree on $|\hat\tau|$; truncated vines |
| Estimation & software | [[Vine Copula Estimation and Software]] | concept | All vine notes | Sequential MLE tree-by-tree; AIC/BIC family selection; VineCopula R; pyvinecopulib Python |

## Notes

**Factor copulas:**
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

**Vine / pair copulas:**
- [[Vine Copulas - Overview]] — CONTAINS: vine structure definition (proximity condition), vine density decomposition theorem, simplifying assumption, comparison with factor copulas (parsimony vs flexibility trade-off), trivariate worked example.
- [[Pair Copula Decomposition]] — CONTAINS: PCC density factorization theorem (Bedford & Cooke 2001), h-function definition and closed-form table (Gaussian, $t$, Clayton, Gumbel), h-function recursion for D-vine, trivariate PCC worked example.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine star topology definition, D-vine path topology definition, density formula for both, structural comparison table, 4-dimensional worked examples for each.
- [[R-Vine Structure Selection]] — CONTAINS: R-vine general definition, proximity condition, R-vine matrix encoding, Dissmann MST algorithm (full statement with complexity), truncated vine definition and selection criterion, AIC/BIC family selection procedure.
- [[Vine Copula Estimation and Software]] — CONTAINS: sequential MLE procedure (4 steps), GoF via Rosenblatt transform, simulation from fitted vine, VineCopula R function reference (RVineStructureSelect, RVineCopSelect, BiCopSelect, family integer codes), pyvinecopulib Python API, C-vine/D-vine/R-vine practitioner choice guide, vine vs factor copula comparison table.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Literature-Survey.md]] — Synthesis survey of: Bedford & Cooke (2001, 2002) vine graphical model; Aas et al. (2009) PCC paper; Dissmann et al. (2013) structure selection; Czado (2019) practitioner reference. PDFs blocked by egress proxy; content from training coverage.
- [[raw/VineCopula-R-Package-README.md]] — VineCopula R package README (Schepsmeier, Nagler et al.). Retrieved from GitHub 2026-09-09.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory the factor copula paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family underlying factor copula estimation).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
