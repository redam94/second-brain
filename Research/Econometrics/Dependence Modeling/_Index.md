---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-08-27
concept_count: 10
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two competing architectures: (1) **Factor copulas** from Oh & Patton (2012) — for very high dimensions ($n > 50$), no closed-form likelihood, SMM estimation; (2) **Vine / pair copulas** from Bedford & Cooke (2002) and Aas et al. (2009) — for moderate dimensions ($n \leq 20$–50), fully heterogeneous pairwise copulas, closed-form likelihood, sequential MLE.
>
> **Factor copulas:**
> - Need the motivation, contribution, and big picture? -> [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? -> [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? -> [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? -> [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? -> [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? -> [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine / pair copulas:**
> - Need the overview and architecture comparison? -> [[Vine Copulas - Overview]]
> - Need the Bedford-Cooke R-vine density factorization? -> [[Pair Copula Construction]]
> - Need C-vine vs D-vine structures and when to use each? -> [[C-Vine and D-Vine Structures]]
> - Need the h-function sequential MLE procedure? -> [[Sequential Estimation for Vine Copulas]]

## Concept Map

### Factor Copulas (Oh & Patton 2012)

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |

### Vine / Pair Copulas (Bedford & Cooke 2002; Aas et al. 2009)

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Overview & architecture comparison | [[Vine Copulas - Overview]] | overview | Factor Copulas Overview | Vine = $\binom{n}{2}$ pair copulas on graphical vine; MLE tractable; scales to $n\approx20$–50; compare with factor copula |
| R-vine density factorization | [[Pair Copula Construction]] | theorem | Vine Overview | Bedford-Cooke decomposition; simplifying assumption; $\binom{n}{2}$ pair copulas; h-function $=\partial C/\partial v$ |
| C-vine and D-vine | [[C-Vine and D-Vine Structures]] | concept | Pair Copula Construction | C-vine (star) for dominant variable; D-vine (path) for time series; truncation for $n>20$ |
| Sequential MLE | [[Sequential Estimation for Vine Copulas]] | concept | C-Vine and D-Vine | h-function recursion; tree-by-tree MLE; family selection by AIC; inverse-h simulation |

## Notes

### Factor Copula notes
- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).

### Vine / Pair Copula notes (added 2026-08-27)
- [[Vine Copulas - Overview]] — CONTAINS: motivation and gap from factor copulas, 3-variable decomposition illustration, advantages (flexibility, closed-form likelihood), limitations (simplifying assumption, dimension, structure selection), copula architecture comparison table.
- [[Pair Copula Construction]] — CONTAINS: Bedford & Cooke (2002) R-vine definition, proximity condition, general density factorization theorem (formal statement), simplifying assumption definition, counting R-vine structures, conditional CDF / h-function definition.
- [[C-Vine and D-Vine Structures]] — CONTAINS: C-vine definition (star topology, root selection), C-vine density formula, 4-variable C-vine example; D-vine definition (path topology), D-vine density formula, 4-variable D-vine example; Dissmann structure selection algorithm; truncated vine definition; when-to-use guidance.
- [[Sequential Estimation for Vine Copulas]] — CONTAINS: h-function definition and closed-form table (Gaussian, $t$, Clayton, Gumbel, Frank); sequential MLE algorithm (Step 0–$k$); copula family selection by AIC; vine simulation via inverse h-function; sequential vs. joint MLE efficiency comparison; software (`VineCopula` R, `pyvinecopulib` Python).

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Aas-et-al-2009-Vine-Copula-Survey.md]] — Survey note synthesizing Bedford & Cooke (2002, Ann. Stat.) and Aas, Czado, Frigessi & Bakken (2009, Ins. Math. Econ.); source PDFs blocked by network proxy.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
