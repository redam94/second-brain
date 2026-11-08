---
title: "Index: Dahabreh 2020 - Extending Inferences from Trial to Target Population"
tags:
  - type/index
  - source/ingested
  - topic/causal-transportability
parent: "[[../_Index|Causal Transportability]]"
date_updated: 2026-11-08
concept_count: 14
---

# Dahabreh 2020 - Extending Inferences from a Randomized Trial to a New Target Population

> [!abstract] Routing Summary
> This folder fully captures Dahabreh, Robertson, Steingrimsson, Stuart & Hernán (2020), *Extending inferences from a randomized trial to a new target population* (Statistics in Medicine 39(14); arXiv:1805.00550v3 tutorial): generalizability vs transportability, five identification conditions, outcome-model / inverse-odds-weighting / doubly robust estimators, the 36-scenario simulation (Tables 2-3), the CASS application (Tables 4-5), and practical diagnostics. The Appendix cited in the paper is absent from the PDF and is not captured.
> - Need the paper on one page or the section-to-note map? -> [[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]]
> - Need generalizability vs transportability, nested vs non-nested designs, Table 1 data structure? -> [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]]
> - Need the five identification conditions or the transport formula for $E[Y^a \mid S=0]$? -> [[Dahabreh 2020 - Identifiability Conditions and Identification]]
> - Need formulas for OM, IOW1/IOW2, DR1-DR3, double robustness, inference? -> [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]
> - Need the simulation design and bias/variance tables, or a Python replication? -> [[Dahabreh 2020 - Simulation Study of Estimators]]
> - Need the CASS covariate and results tables? -> [[Dahabreh 2020 - CASS Coronary Surgery Application]]
> - Need sensitivity analysis, covariate selection, positivity diagnostic, or the paper's recommendations? -> [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Trial participation process | [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]] | definition | none | eligible -> invited -> participant |
| Generalizability vs transportability | [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]] | definition | participation process | target within vs beyond trial-eligible population |
| Nested / non-nested design | [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]] | definition | none | cohort-wide ATE not identified in non-nested |
| Table 1 data structure | [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]] | example | designs | outcome missing by design for $S=0$ |
| Identifiability conditions (1)-(5) | [[Dahabreh 2020 - Identifiability Conditions and Identification]] | definition | estimands | exchangeability over $S$ untestable |
| Identification theorem | [[Dahabreh 2020 - Identifiability Conditions and Identification]] | theorem | conditions | $E[Y^a\mid S=0]=E\{E[Y\mid X,S=1,A=a]\mid S=0\}$ |
| OM estimator | [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]] | definition | identification | average outcome-model predictions over target X |
| IO weights and IOW1/IOW2 | [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]] | definition | identification | weights $(1-p)/(p e_a)$; normalize |
| DR1-DR3 and double robustness | [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]] | theorem | OM, IOW | consistent if either model correct |
| Simulation Tables 2-3 | [[Dahabreh 2020 - Simulation Study of Estimators]] | example | estimators | trial-only bias 0.66-0.89; OM lowest variance |
| CASS Tables 4-5 | [[Dahabreh 2020 - CASS Coronary Surgery Application]] | example | estimators | RD -1.3% to -1.9% vs trial -3.0% |
| Sensitivity, covariate selection | [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]] | concept | conditions | effect modifiers suffice for ATE |
| Positivity diagnostic | [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]] | definition | weights | summed inverse odds $\approx n_{obs}$ |
| Recommendation | [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]] | concept | simulation | prefer DR with normalized weights |

## Notes

- [[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]] — CONTAINS: research question, contributions, headline numbers, full Source Map, marketing relevance.
- [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]] — CONTAINS: Sec. 1-3; participation process; generalizability vs transportability; nested vs non-nested designs; Table 1; target estimand.
- [[Dahabreh 2020 - Identifiability Conditions and Identification]] — CONTAINS: Sec. 4; conditions (1)-(5); identification theorem with proof sketch; weaker identification in measure.
- [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]] — CONTAINS: Sec. 5; eqs. 1-6; why IOW is unbiased; double robustness; special cases; inference; runnable Python.
- [[Dahabreh 2020 - Simulation Study of Estimators]] — CONTAINS: Sec. 6; data generation; Tables 2 and 3 reproduced; interpretation; independent Python replication.
- [[Dahabreh 2020 - CASS Coronary Surgery Application]] — CONTAINS: Sec. 7; models; Table 4; Table 5; Figure 1 diagnostics; interpretation.
- [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]] — CONTAINS: Sec. 8-9; sensitivity analysis; covariate selection; flexible models and cross-fitting; positivity diagnostic; recommendations; lift-study checklist.

## Sources
- [[raw/Dahabreh 2020 - Extending Inferences from a Randomized Trial to a New Target Population.pdf]] — Dahabreh IJ, Robertson SE, Steingrimsson JA, Stuart EA, Hernán MA (2020), Statistics in Medicine 39(14); arXiv:1805.00550v3, 21 pp. (main text and references; Appendix not included).

## See Also
- [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]] — empirical test of the same exchangeability condition at site level.
- [[Bayesian Inverse Probability Weighting]], [[Doubly-Robust Estimands for ATT(g,t)]] — weighting and DR machinery elsewhere in the vault.
- [[Geo-Experiment Methodology - Overview]], [[Conversion Lift Studies on Ad Platforms]] — marketing experiments to which transportability applies.
