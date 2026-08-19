---
title: "Index: Copula SMM"
tags:
  - type/index
  - source/ingested
parent: "[[../Extensions/_Index|Extensions]]"
date_updated: 2026-04-11
concept_count: 5
doc_type: index
---

# Copula SMM

> [!abstract] Routing Summary
> This folder covers the Oh & Patton (2011) research program: SMM estimation for copula-based multivariate models using rank dependence measures as moments. Contains 5 notes.
> - Need rank/tail dependence measures used as SMM moments? → [[Dependence Measures for Copulas]]
> - Need the Oh-Patton SMM estimator definition and two-stage setup? → [[SMM Estimator for Copulas]]
> - Need asymptotic theory (Propositions 1–3: consistency, normality, variance)? → [[SMM Copula Asymptotic Theory]]
> - Need J-test for copula specification testing? → [[SMM Copula Specification Testing]]
> - Need Monte Carlo results and 7-firm financial application? → [[SMM Copula Simulation and Application]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Spearman's ρ, quantile dependence, tail dependence — pure copula functionals | [[Dependence Measures for Copulas]] | definition | [[Copula Estimation]] | Invariant to marginals; used as SMM moments in Oh & Patton |
| Oh-Patton DGP, two-stage estimation, rank dependence moments | [[SMM Estimator for Copulas]] | concept | [[Method of Simulated Moments]], [[Dependence Measures for Copulas]] | SMM for copulas when likelihood is unavailable |
| Assumptions 1–4, Propositions 1–3 (consistency, normality, variance) | [[SMM Copula Asymptotic Theory]] | theorem | [[SMM Estimator for Copulas]] | First-stage estimation error does not affect copula estimator |
| J-test, over-identifying restrictions, simulated critical values | [[SMM Copula Specification Testing]] | theorem | [[SMM Copula Asymptotic Theory]] | $\chi^2_{m-p}$ with efficient weight; simulated CVs otherwise |
| Monte Carlo study + 7-firm financial dependence (2001–2010) | [[SMM Copula Simulation and Application]] | example | [[SMM Copula Asymptotic Theory]], [[SMM Copula Specification Testing]] | ~20–40% efficiency loss vs. MLE; significant tail dependence in financials |

## Notes

- [[Dependence Measures for Copulas]] — CONTAINS: Spearman's rank correlation, quantile dependence, tail dependence coefficients, asymmetry measures, pure copula functionals invariant to marginals
- [[SMM Estimator for Copulas]] — CONTAINS: Oh-Patton DGP, two-stage estimation, rank dependence moments, SMM estimator definition, factor copula model, nesting of GMM/MM
- [[SMM Copula Asymptotic Theory]] — CONTAINS: Assumptions 1–4, Proposition 1 (consistency), Proposition 2 (asymptotic normality with 3 rate cases), Proposition 3 (variance estimation via bootstrap + numerical derivatives)
- [[SMM Copula Specification Testing]] — CONTAINS: Proposition 4 (J-test), chi-squared with efficient weight, simulated critical values for general weight, simulation procedure
- [[SMM Copula Simulation and Application]] — CONTAINS: Monte Carlo for Clayton/Normal/factor copulas, iid and AR-GARCH data, step-size sensitivity, 7 financial firms (2001–2010), tail dependence and asymmetry findings

## Sources

- [[raw/Oh_Patton_SMM_copulas_nov11.pdf]] — Oh & Patton (2011), "Simulated Method of Moments Estimation for Copula-Based Multivariate Models"

## See Also

- [[Simulation-Based Estimation/_Index|Simulation-Based Estimation]] — the general MSM/SMM theory these notes apply
- [[Copula Estimation]] — Bayesian approach to copula estimation (complementary)
- [[SMM Weighting Matrix and Inference]] — weighting matrix strategies used in the copula SMM context
