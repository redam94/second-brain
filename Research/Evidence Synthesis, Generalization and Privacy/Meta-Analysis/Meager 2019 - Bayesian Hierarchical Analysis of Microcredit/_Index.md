---
title: "Index: Meager 2019 - Bayesian Hierarchical Analysis of Microcredit"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/index
  - doc/paper
source: "[[raw/Meager 2019 - Understanding the Average Impact of Microcredit Expansions.pdf]]"
parent: "[[../_Index|Meta-Analysis]]"
date_updated: 2026-11-08
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Meager 2019 - Bayesian Hierarchical Analysis of Microcredit"
doc_type: paper
concept_count: 10
aliases:
  - "Meager 2019 - Bayesian Hierarchical Analysis of Microcredit index"
---
# Meager 2019 - Bayesian Hierarchical Analysis of Microcredit

> [!abstract] Routing Summary
> This folder fully captures Meager (2019): Bayesian hierarchical aggregation of seven microcredit RCTs - models, priors, pooling metrics, average effects, heterogeneity, and covariate analyses. It contains 9 notes covering Sections I-VI, Appendix A, Tables 1-5 and Figures 1-10.
> - Need the paper on one page, headline results, or the section-to-note map? -> [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]]
> - Need the seven studies, Table 1, outcome construction, or why ITT? -> [[Meager 2019 - Studies, Data and Outcomes]]
> - Need eq. 1-4 (Rubin model, full-data model, interactions, site covariates) or exchangeability? -> [[Meager 2019 - Hierarchical Model Specifications]]
> - Need priors (eq. 5), LKJ, HMC/Stan, or why Bayesian? -> [[Meager 2019 - Bayesian Estimation, Priors and Computation]]
> - Need pooling factors omega, omega-breve, lambda (eq. 6-8) or a runnable Rubin example? -> [[Meager 2019 - Pooling Factors and Measuring External Validity]]
> - Need Table 2 (average effects) or the OLS-vs-BHM comparison? -> [[Meager 2019 - Average Treatment Effects - Results]]
> - Need Tables 3-4, the 60 percent result, or predictive distributions of the next site? -> [[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]]
> - Need prior-business subgroups, Table 5 or the ridge regression? -> [[Meager 2019 - Covariates - Prior Business Experience and Site-Level Ridge]]
> - Need the conclusion, limitations or the marketing mapping? -> [[Meager 2019 - Conclusion, Limitations and Marketing Analogues]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Studies and outcomes | [[Meager 2019 - Studies, Data and Outcomes]] | concept | - | 7 RCTs; USD PPP per fortnight; ITT of access |
| Rubin model (eq. 1) | [[Meager 2019 - Hierarchical Model Specifications]] | definition | - | $\hat\tau_k\sim N(\tau_k,se_k^2)$, $\tau_k\sim N(\tau,\sigma_\tau^2)$ |
| Full-data and covariate models (eq. 2-4) | [[Meager 2019 - Hierarchical Model Specifications]] | definition | eq. 1 | control means, subgroup and site covariates |
| Exchangeability | [[Meager 2019 - Hierarchical Model Specifications]] | definition | eq. 1 | $\tau_{K+1}$ applies only to exchangeable sites |
| Priors (eq. 5), HMC | [[Meager 2019 - Bayesian Estimation, Priors and Computation]] | concept | eq. 2 | LKJ(3) correlation, half-Cauchy(0,10) scale; $\hat R<1.1$ |
| Pooling factors (eq. 6-8) | [[Meager 2019 - Pooling Factors and Measuring External Validity]] | definition | eq. 1 | omega, omega-breve, lambda in [0,1] |
| Table 2 average effects | [[Meager 2019 - Average Treatment Effects - Results]] | example | eq. 2 | profit 6.8, revenues 14.5; all 95% intervals include 0 |
| Tables 3-4; predictive | [[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]] | example | eq. 6-8 | about 60% sampling variation; 25% adverse sign |
| Covariates and ridge | [[Meager 2019 - Covariates - Prior Business Experience and Site-Level Ridge]] | example | eq. 3-4 | prior business: larger, more heterogeneous; APR, loan size, women |
| Conclusion and marketing mapping | [[Meager 2019 - Conclusion, Limitations and Marketing Analogues]] | concept | all | moderate external validity |

## Notes

- [[Meager 2019 - Bayesian Hierarchical Analysis of Microcredit - Overview]] - CONTAINS: question, key results, Source Map, notation.
- [[Meager 2019 - Studies, Data and Outcomes]] - CONTAINS: inclusion criteria, Table 1, outcome construction, ITT rationale, vote-counting critique.
- [[Meager 2019 - Hierarchical Model Specifications]] - CONTAINS: eq. 1-4 with all symbols, nesting theorem, partial pooling, exchangeability, example.
- [[Meager 2019 - Bayesian Estimation, Priors and Computation]] - CONTAINS: arguments for Bayes, eq. 5 priors, Appendix A posterior (A1), HMC/NUTS, diagnostics.
- [[Meager 2019 - Pooling Factors and Measuring External Validity]] - CONTAINS: external validity, eq. 6-8, conjugate shrinkage identity, hypothetical Rubin example and Python.
- [[Meager 2019 - Average Treatment Effects - Results]] - CONTAINS: Table 2 in full, p-values, Fig 1-4 summary, magnitude interpretation, why more mass near zero.
- [[Meager 2019 - Heterogeneity, Pooling Results and Predictive Distributions]] - CONTAINS: Tables 3-4, 60 percent arithmetic, predictive distributions (Figs 5-6), profit example.
- [[Meager 2019 - Covariates - Prior Business Experience and Site-Level Ridge]] - CONTAINS: prior-business model and findings (Figs 7-9), Table 5, ridge findings (Fig 10), hypothetical ridge Python.
- [[Meager 2019 - Conclusion, Limitations and Marketing Analogues]] - CONTAINS: conclusion, limitations, marketing mapping table and geo-combination example.

## Sources

- Meager (2019), AEJ: Applied Economics 11(1):57-91, doi:10.1257/app.20170299 - [[raw/Meager 2019 - Understanding the Average Impact of Microcredit Expansions.pdf]] (LSE Research Online published version).

## See Also

- [[Andrews Kasy 2019 - Identification of and Correction for Publication Bias - Overview]]
- [[Sterne 2011 - Funnel Plot Asymmetry - Overview]]
- [[Hierarchical Models]]
- [[Geo-Experiment Methodology - Overview]]
