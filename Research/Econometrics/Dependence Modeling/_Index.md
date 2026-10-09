---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-10-09
concept_count: 11
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two main copula architectures — **factor copulas** (Oh & Patton 2012) and **vine copulas** (Aas et al. 2009) — plus their estimation methods and a comparative framework.
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
> - Need the pair-copula decomposition framework and what a vine is? → [[Vine Copulas - Overview]]
> - Need C-vine (star) vs D-vine (path) tree structures and density formulas? → [[C-vine and D-vine Structures]]
> - Need h-functions, sequential MLE, or Dißmann structure selection? → [[Vine Copula Estimation and Selection]]
>
> **Architecture comparison:**
> - Choosing between Normal, $t$, Archimedean, factor, and vine copulas? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula framework | [[Vine Copulas - Overview]] | overview | — | Bedford-Cooke representation: any $n$-dim distribution = product of $n(n-1)/2$ bivariate (conditional) copulas; simplifying assumption; C/D/R-vine hierarchy |
| C-vine and D-vine structures | [[C-vine and D-vine Structures]] | definition | Vine Overview | C-vine = star trees (root ordering); D-vine = path trees (variable ordering); density formulas; h-function recursion |
| Vine estimation & selection | [[Vine Copula Estimation and Selection]] | concept | C/D-vine, Dependence Measures | h-function definition + closed forms; sequential MLE (tree-by-tree); Dißmann max-spanning-tree structure selection; AIC family selection; truncation |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | All copula notes | Normal/t/Archimedean/factor/vine tradeoffs: parameters, tail dependence, structural assumptions, scale limits |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: Bedford-Cooke (2001/2002) representation theorem; pair-copula decomposition (PCC) density formula; simplifying assumption; R-vine definition (proximity condition); vine count ($n(n-1)/2$ pair copulas); C-vine and D-vine introduction; contrast with factor copulas.
- [[C-vine and D-vine Structures]] — CONTAINS: C-vine star structure, root ordering, density formula, $n=4$ worked example; D-vine path structure, variable ordering, density formula, $n=4$ worked example; structural comparison table (C vs D vs R-vine); when-to-use guidance.
- [[Vine Copula Estimation and Selection]] — CONTAINS: h-function definition (conditional CDF from bivariate copula) with closed forms for Normal/$t$/Clayton/Gumbel; sequential MLE algorithm (tree-by-tree); joint MLE; AIC-based bivariate family selection table; Dißmann et al. (2013) greedy max-spanning-tree structure algorithm; vine truncation; worked D-vine example on financial returns.
- [[Copula Architecture Comparison]] — CONTAINS: elliptical/Archimedean/factor/vine formal definitions; quantitative comparison table (parameters, tail dependence, structural assumptions, max practical $n$); decision flowchart for architecture selection.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/vine-copula-sources.md]] — Bibliography for vine copula notes (2026-10-09 ingest): Aas et al. (2009), Bedford & Cooke (2001/2002), Dißmann et al. (2013), Brechmann & Schepsmeier (2013), Czado (2019). PDFs blocked by network policy; free versions exist at arXiv:1202.2002 and JSS 52(3).

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
