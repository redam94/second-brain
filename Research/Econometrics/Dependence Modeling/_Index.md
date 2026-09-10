---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-09-10
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two main architectures: (A) **factor copulas** (Oh & Patton 2012) — parsimonious, SMM-estimated, for $d > 50$; (B) **vine copulas** (Aas et al. 2009; Bedford & Cooke 2002) — flexible pair-copula constructions, ML-estimated, for $d \leq 30$. A comparison note helps practitioners choose.
>
> **Factor copula cluster:**
> - Need the motivation, contribution, and big picture? -> [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? -> [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? -> [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? -> [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? -> [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? -> [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copula cluster (added 2026-09-10):**
> - Need the pair-copula construction idea and vine overview? -> [[Vine Copulas - Overview]]
> - Need the formal R-vine definition (Bedford & Cooke) and proximity condition? -> [[Regular Vine Structure]]
> - Need C-vine / D-vine density formulas and the h-function? -> [[C-Vine and D-Vine]]
> - Need structure selection (Dissmann), family selection, sequential ML, truncation? -> [[Vine Copula Estimation and Selection]]
> - Need to choose between vine, factor, Gaussian, and t architectures? -> [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula overview & PCC | [[Vine Copulas - Overview]] | overview | — | Any joint density = product of marginals × $d(d-1)/2$ bivariate conditional pair-copulas; vine = tree sequence |
| R-vine formal definition | [[Regular Vine Structure]] | definition | Vine Overview | Proximity condition; constraint sets; $d(d-1)/2$ pair-copulas; C-vine and D-vine are special cases |
| C-vine & D-vine density | [[C-Vine and D-Vine]] | definition | Regular Vine | D-vine density (Aas Eq. 3); C-vine density (Aas Eq. 4); h-function recursion for conditional CDFs |
| Vine estimation & selection | [[Vine Copula Estimation and Selection]] | theorem | C/D-vine, Regular Vine | Sequential ML (tree-by-tree); Dissmann MST structure selection; AIC/BIC family selection; truncated vines |
| Copula architecture guide | [[Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | Vine for $d\leq30$ (flexible, ML); factor for $d>50$ (parsimonious, SMM); Gaussian/t for $d>100$ baseline |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: pair-copula construction (PCC) definition, simplifying assumption, vine types table (D/C/R-vine vs factor/Gaussian/t), 3-variable D-vine density example, literature position.
- [[Regular Vine Structure]] — CONTAINS: Bedford & Cooke (2002) R-vine definition, proximity condition, constraint set $D(e)$, full R-vine density formula, parameter count ($d(d-1)/2$), number of distinct structures, 4-variable worked example.
- [[C-Vine and D-Vine]] — CONTAINS: D-vine structure & density (Aas Eq. 3), C-vine structure & density (Aas Eq. 4), 4-variable examples for both, h-function table (Gaussian/t/Clayton/Gumbel/Frank), h-function recursion theorem.
- [[Vine Copula Estimation and Selection]] — CONTAINS: sequential ML theorem (tree-by-tree), full ML, AIC/BIC family selection, Dissmann MST structure algorithm, truncated vine definition, 5-variable sequential ML example.
- [[Copula Architecture Comparison]] — CONTAINS: full architecture comparison table (Gaussian/t/grouped-t/vine/factor), scalability analysis, tail-dependence mechanism comparison, decision guide table, S&P 100 and Norwegian returns examples.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Source-Extract.md]] — Key mathematical content extracted from: Aas et al. (2009) *Insurance: Mathematics and Economics*; Bedford & Cooke (2001, 2002) *AoMaAI / AoS*; Czado & Nagler (2022) *Annual Review of Statistics*; Dissmann et al. (2013) *CSDA*. (Direct PDF download was blocked by the network proxy; content drawn from training knowledge of these papers.)

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
