---
title: "Index: Tsagris 2018 - Dirichlet Regression with Zeros"
tags:
  - type/index
  - source/ingested
  - topic/distributional-regression
parent: "[[../_Index|Distributional and Constrained Outcomes]]"
date_updated: 2026-11-08
concept_count: 4
---

# Tsagris 2018 - Dirichlet Regression with Zeros

> [!abstract] Routing Summary
> Captures Tsagris and Stewart (2018), *A Dirichlet Regression Model for Compositional Data with Zeros* (arXiv 1410.5011v6): mean-precision Dirichlet regression, zero-adjusted Dirichlet regression (ZADR), four data examples, a simulation study, and limitations. 4 notes plus overview. Motivating PyMC example: E70.
> - Need the one-page summary and source map? -> [[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]]
> - Need Dirichlet regression formulas, link, log-likelihood, variable precision? -> [[Tsagris 2018 - Dirichlet Regression with Zeros - Dirichlet Regression]]
> - Need the zero-pattern mixture, selection matrices, ZADR likelihood, algorithm? -> [[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]]
> - Need the Florida / glass / foraminifera / Arctic lake tables and simulation? -> [[Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results]]
> - Need limitations and comparison with Bear-Billheimer, Scealy-Welsh? -> [[Tsagris 2018 - Dirichlet Regression with Zeros - Discussion and Alternatives]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Dirichlet mean-precision | [[Tsagris 2018 - Dirichlet Regression with Zeros - Dirichlet Regression]] | definition | - | $\alpha_i=\phi a_i^*$ |
| Multinomial-logit link | [[Tsagris 2018 - Dirichlet Regression with Zeros - Dirichlet Regression]] | definition | Dirichlet | $d(p+1)+1$ parameters |
| Zero-pattern mixture | [[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]] | definition | Dirichlet regression | $\hat\theta_b=n_b/n$ |
| Simple ZADR / ZADR | [[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]] | theorem | zero-pattern mixture | shared $\beta,\phi$ via $Q_b$ |
| Empirical comparison | [[Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results]] | example | ZADR | foraminifera KL 3.126 vs 3.556 |
| Limitations | [[Tsagris 2018 - Dirichlet Regression with Zeros - Discussion and Alternatives]] | concept | all | negative correlations only |

## Notes

- [[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]] — CONTAINS: question, contribution, source map, E70 link.
- [[Tsagris 2018 - Dirichlet Regression with Zeros - Dirichlet Regression]] — CONTAINS: Defs. mean-precision Dirichlet, logit link, varying precision; Thm. log-likelihood.
- [[Tsagris 2018 - Dirichlet Regression with Zeros - Zero Adjusted Dirichlet Regression]] — CONTAINS: Defs. zero mixture, ZADR; Thm. full likelihood; 4-step algorithm; Python.
- [[Tsagris 2018 - Dirichlet Regression with Zeros - Examples and Simulation Results]] — CONTAINS: Tables 1-6, Florida, glass, foraminifera, Arctic lake, simulation design and results, Python.
- [[Tsagris 2018 - Dirichlet Regression with Zeros - Discussion and Alternatives]] — CONTAINS: common-parameter assumption, Dirichlet limitations, comparison of alternatives.

## Sources

- [[raw/Tsagris 2018 - Dirichlet Regression Model for Compositional Data with Zeros.pdf]] — Tsagris M, Stewart C (2018), arXiv:1410.5011v6, 18 pp.

## See Also

- [[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]], [[Generalized Linear Models]]
