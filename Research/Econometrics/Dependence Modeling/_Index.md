---
title: "Index: Dependence Modeling"
tags: [type/index, source/ingested]
parent: "[[../_Index|Econometrics]]"
date_updated: 2026-09-25
concept_count: 9
---

# Dependence Modeling

> [!abstract] Routing Summary
> High-dimensional dependence (copula) modelling for economic/financial variables. Covers two architectures: (1) **factor copulas** (Oh & Patton 2012) — latent-factor, ultra-parsimonious, scalable to $d=100$, estimated by SMM; (2) **vine/pair-copula constructions** (Aas et al. 2009) — product of bivariate copulas, very flexible, $O(d^2)$ params, estimated by sequential MLE.
>
> **Factor copula path:**
> - Need the motivation, contribution, and big picture? → [[Factor Copulas - Overview]]
> - Need the latent factor model defining the copula? → [[Factor Copula Construction]]
> - Need analytical tail-dependence coefficients (correlated crashes/booms)? → [[Tail Dependence in Factor Copulas]]
> - Need multiple factors, heterogeneous or industry-block dependence? → [[Multi-Factor and Block Dependence Structures]]
> - Need the estimation method (no closed-form likelihood, rank-based SMM)? → [[SMM Estimation of Factor Copulas]]
> - Need the empirical results, asymmetric dependence, or systemic risk? → [[Factor Copula Application - S&P 100 and Systemic Risk]]
>
> **Vine copula path:**
> - Need the vine architecture (C-vine, D-vine, R-vine)? → [[Vine Copulas - Overview]]
> - Need the h-function recursion, likelihood, and estimation? → [[Pair-Copula Construction]]
> - Need to choose between factor vs. vine vs. Archimedean? → [[Copula Architecture Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Motivation & contribution | [[Factor Copulas - Overview]] | overview | — | High-dim copula class for 50+ vars; fat-tailed/asymmetric common factor captures correlated crashes |
| Latent factor model | [[Factor Copula Construction]] | definition | Overview | $X_i=\beta_i Z+\varepsilon_i$; copula of $\mathbf{X}$ used, marginals discarded; closed form only if all-Gaussian (equicorrelation) |
| Tail dependence (EVT) | [[Tail Dependence in Factor Copulas]] | theorem | Construction | Props 1-3: regularly-varying tails → non-zero tail dependence; skew factor → $\tau^U\neq\tau^L$ |
| Multi-factor & block | [[Multi-Factor and Block Dependence Structures]] | concept | Construction | $K$-factor + block equidependence (market + 7 SIC industry factors, 16 params) → heterogeneous dependence |
| SMM estimation | [[SMM Estimation of Factor Copulas]] | theorem | Construction, Multi-Factor | Match rank correlation + quantile dependence; consistent & asym. normal ($S/T\to\infty$); GMM sandwich, bootstrap + numerical-derivative covariance |
| S&P 100 & systemic risk | [[Factor Copula Application - S&P 100 and Systemic Risk]] | example | SMM, Tail Dependence, Multi-Factor | Skew $t$-$t$ block copula fits best; crashes more correlated than booms; superior MES/$kES$ estimates |
| Vine copula architecture | [[Vine Copulas - Overview]] | overview | Factor Copulas Overview | C-vine (star), D-vine (path), R-vine (general); $d(d-1)/2$ pair-copulas; Bedford & Cooke proximity condition |
| H-function & likelihood | [[Pair-Copula Construction]] | definition | Vine Copulas Overview | h-function = ∂C/∂v; sequential MLE tree-by-tree; closed-form h for Gaussian/t/Clayton/Gumbel |
| Architecture comparison | [[Copula Architecture Comparison]] | concept | Vine Overview, Factor Overview | Factor: $O(K)$ params, $d=100+$, SMM; Vine: $O(d^2)$ params, $d\leq50$, MLE; Archimedean: 1 param, exchangeable |

## Notes

- [[Factor Copulas - Overview]] — CONTAINS: 2007-08 crisis motivation, Sklar decomposition, two contributions, position vs Normal/$t$/grouped-$t$/Archimedean/vine copulas, Figure 1 illustration.
- [[Factor Copula Construction]] — CONTAINS: simple/equidependence model, Gaussian closed-form & equicorrelation, flexible-weight single-factor, non-linear nesting table (Normal/$t$/skew $t$/gen-hyperbolic/Clayton/Gumbel).
- [[Tail Dependence in Factor Copulas]] — CONTAINS: tail-dependence definitions, regular variation, Proposition 1 (single factor, full cases a-d), boundary case, Proposition 2 (skew $t$-$t$ constants), Proposition 3 (multi-factor), Appendix-A proof sketch, quantile dependence.
- [[Multi-Factor and Block Dependence Structures]] — CONTAINS: $K$-factor model, conditional-independence/frailty interpretation, flexible weights, empirical 8-factor block model (16 params), block dependence-matrix averaging.
- [[SMM Estimation of Factor Copulas]] — CONTAINS: semiparametric DGP, SMM objective $Q_{T,S}$, rank-correlation & quantile-dependence moments, moment-count reduction, consistency/normality theorem, bootstrap + numerical-derivative covariance and step-size condition, $J$-test, MLE/GMM/SMM efficiency comparison.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — CONTAINS: Monte Carlo design & results (Tables 1-5), AR(1)-GJR-GARCH marginals, equidependence & block estimates (Tables 8-10), asymmetric/fat-tail findings, MES & $kES$ systemic-risk measures (Table 11).
- [[Vine Copulas - Overview]] — CONTAINS: Bedford & Cooke factorisation theorem, C-vine (star, root-node structure), D-vine (path, lag ordering), R-vine (general, proximity condition), $d=4$ examples for both C- and D-vine.
- [[Pair-Copula Construction]] — CONTAINS: h-function definition & closed-form table (Gaussian/t/Clayton/Gumbel/Independence), h-function recursion for computing conditional CDFs, vine copula log-likelihood, sequential IFM estimator, pair-copula family selection by AIC.
- [[Copula Architecture Comparison]] — CONTAINS: architecture taxonomy table (Gaussian/t/grouped-t/Archimedean/factor/vine), factor vs. vine strengths & limitations, decision guide by dimensionality and use case, S&P 100 and exchange-rate examples.

## Sources

- [[raw/Oh-Patton-2012-Factor-Copulas.pdf]] — Oh & Patton (2012), "Modelling Dependence in High Dimensions with Factor Copulas", Duke University. 51 pp. JEL C31, C32, C51.
- [[raw/Vine-Copulas-Aas2009-Survey.md]] — Synthesis document covering Aas, Czado, Frigessi & Bakken (2009); Bedford & Cooke (2001, 2002); Czado (2010); Dißmann et al. (2013); Czado & Nagler (2022). PDF download was attempted for LMU Munich preprint (epub.ub.uni-muenchen.de), TUM mediaTUM, and arXiv (1202.2002) but all were blocked by session egress proxy; synthesis written from training knowledge.

## See Also

- [[../Extensions/Copula SMM/_Index|Copula SMM]] — companion Oh & Patton (2011) paper: the SMM estimator and asymptotic theory this paper applies.
- [[../Extensions/Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — MSM, indirect inference, EMM, SMM (the methodological family).
- [[Bayesian copula estimation Describing correlated joint distributions]] — Bayesian (PyMC) Gaussian-copula tutorial, contrasting estimation paradigm.
- [[../_Index|Econometrics]]
