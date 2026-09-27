---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-09-27
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two complementary architectures: **factor copulas** (Oh & Patton 2012 — latent factor, parsimonious, excellent for $d \gg 20$) and **vine copulas** (Bedford & Cooke 2001/2002; Aas et al. 2009 — pair-copula constructions, flexible, suited for $d \leq 20$–30).
> - Need an architecture decision (vine vs factor vs Gaussian vs Archimedean)? → [[Copula Architecture Comparison]]
> - Need the vine copula framework? → [[Vine Copulas - Overview]]
> - Need the vine density formula and estimation (h-functions, sequential MLE)? → [[Pair-Copula Constructions]]
> - Need D-vine, C-vine, R-vine tree structures? → [[C-Vine and D-Vine Structures]]
> - Need the factor copula motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the factor copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the factor copula estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Architecture comparison | [[Copula Architecture Comparison]] | concept | All below | Vine (flexible, $d \leq 20$) vs factor (parsimonious, $d \gg 20$) vs Gaussian/Archimedean |
| Vine copula overview | [[Vine Copulas - Overview]] | overview | — | Bedford & Cooke 2001/2002; Aas et al. 2009; $d(d-1)/2$ bivariate copulas; D-vine / C-vine / R-vine |
| Pair-copula construction | [[Pair-Copula Constructions]] | theorem | Vine Overview | Density = product of $d$ marginals × $d(d-1)/2$ bivariate copulas; $h$-function; sequential MLE |
| C-vine and D-vine | [[C-Vine and D-Vine Structures]] | definition | PCC | D-vine: path in $T_1$ (ordered data); C-vine: star (hub variable); R-vine: general tree; Dissmann's greedy algorithm |
| Factor copula motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Factor Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Factor Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Factor Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Factor Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |

## Notes

### Vine Copulas (Aas et al. 2009; Bedford & Cooke 2001/2002)

- [[Vine Copulas - Overview]] — CONTAINS: vine copula motivation (flexibility), historical milestones (Bedford & Cooke 2001/2002, Aas 2009, Dissmann 2013), core idea ($d(d-1)/2$ pair copulas + $d-1$ trees), vine types (D/C/R-vine), simplifying assumption, key properties.
- [[Pair-Copula Constructions]] — CONTAINS: density factorisation theorem (Prop. 1 of Aas et al.), 3-variable and 4-variable D-vine examples, $h$-function definition (with closed-form expressions for Gaussian/Clayton/$t$), sequential MLE procedure, full MLE, pair copula family selection by AIC/BIC.
- [[C-Vine and D-Vine Structures]] — CONTAINS: R-vine definition (proximity condition), node/constraint set definitions, D-vine definition + 4-variable ASCII diagram, C-vine definition + 4-variable diagram, vine type comparison table, Dissmann's greedy max-spanning-tree algorithm, vine truncation, software (VineCopula / rvinecopulib / pyvinecopulib).

### Architecture Comparison

- [[Copula Architecture Comparison]] — CONTAINS: 5-architecture comparison table (Gaussian, $t$, Archimedean, vine, factor), architecture details with tail dependence formulas, "when vine dominates" / "when factor dominates" decision rules, factor vs vine example ($d=10$), model selection workflow.

### Factor Copulas (Oh & Patton 2012)

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/vine-copula-sources.md]] — Bibliographic summary of vine copula sources: Aas et al. (2009), Bedford & Cooke (2001/2002), Dissmann et al. (2013), Czado (2019). PDFs not downloaded (network proxy blocks all academic domains in this session).

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
