---
title: "Index: Dillon et al - SHAP and Causal Insights"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
parent: "[[../_Index|Explanations, Causality and Proxies]]"
date_updated: 2026-10-13
concept_count: 9
---

# Dillon et al - SHAP and Causal Insights

> [!abstract] Routing Summary
> This folder covers the SHAP-documentation case study by Dillon, LaRiviere, Lundberg, Roth and Syrgkanis on why SHAP explanations of predictive models are not causal effects. It has 9 notes covering prediction vs causal tasks, a simulated subscriber-retention DGP with a known DAG, SHAP vs true-effect overlays, the independence condition, observed confounding with double ML (econML `LinearDML`), non-confounding redundancy (mediators), unobserved confounding, and IV/DiD/RD remedies. All 13 notebook cells are reproduced verbatim.
> - Need the one-page summary and a section map? → [[Dillon et al - SHAP and Causal Insights - Overview]]
> - Need the prediction-vs-causal distinction? → [[Dillon et al - Prediction Tasks vs Causal Tasks]]
> - Need the simulation code, structural equations, causal graph or do-operator? → [[Dillon et al - Subscriber Retention Data-Generating Process]]
> - Need the SHAP plots and how they diverge from the truth? → [[Dillon et al - SHAP Plots vs True Causal Effects]]
> - Need to know when SHAP *is* causal, or how to read the redundancy dendrogram? → [[Dillon et al - When SHAP Recovers Causal Effects]]
> - Need the double-ML recipe and code? → [[Dillon et al - Observed Confounding and Double ML for Ad Spend]]
> - Need mediator / bad-control guidance? → [[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]]
> - Need what to do when confounders are unmeasured? → [[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]]
> - Need limitations and marketing-measurement applications? → [[Dillon et al - Summary, Limitations and Marketing Implications]]
^routing-summary

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Prediction vs causal task | [[Dillon et al - Prediction Tasks vs Causal Tasks]] | definition | [[Potential Outcomes Framework]] | out-of-sample fit is silent on causal validity |
| Retention SCM and `FixableDataFrame` do-operator | [[Dillon et al - Subscriber Retention Data-Generating Process]] | definition / example | [[Directed Acyclic Graphs]] | Ad spend coefficient 0; Discount effect positive; Bugs reported not a parent |
| `marginal_effects` true-effect overlay | [[Dillon et al - SHAP Plots vs True Causal Effects]] | algorithm | DGP note | SHAP flips Discount and Bugs reported and inflates Ad spend |
| Independence condition; redundancy dendrogram | [[Dillon et al - When SHAP Recovers Causal Effects]] | theorem / procedure | [[Conditional Independence Assumption]] | Economy recovered; the dendrogram detects only *observed* redundancy |
| Observed confounder; double ML | [[Dillon et al - Observed Confounding and Double ML for Ad Spend]] | definition / algorithm | [[Regularization Bias and the Partially Linear Model]] | LinearDML: no Ad spend effect, $p = 0.85$ |
| Non-confounding redundancy; control-or-drop rule | [[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]] | definition / rule | [[Causal Estimands]] | controlling for a mediator gives the direct effect only; "controlling ... the safer option" |
| Unobserved confounding; IV/DiD/RD | [[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]] | definition / result | [[The Experimental Ideal]] | DML gets the Discount sign wrong; randomization is required |
| Limitations and marketing checklist | [[Dillon et al - Summary, Limitations and Marketing Implications]] | synthesis | all of the above | a SHAP channel ranking is not an ROI ranking |

## Notes

- [[Dillon et al - SHAP and Causal Insights - Overview]] — CONTAINS: research question, contribution list, key-findings table, Source Map (section → note, raw line ranges), figure and cell map, argument flow.
- [[Dillon et al - Prediction Tasks vs Causal Tasks]] — CONTAINS: introduction thesis, surprising findings and business-partner explanations, Def. prediction task, Def. causal task, claim that one model can be right for one task and wrong for the other, example of one forecast with two consumers; complete quote of the second-team paragraph (raw line 187).
- [[Dillon et al - Subscriber Retention Data-Generating Process]] — CONTAINS: full structural-equation table, logit renewal equation, 17-edge causal graph, training pipeline algorithm, `FixableDataFrame` do-operator definition, verbatim cells [1], [2], [5], code-quirk table, vault table of true interventional effects and correlations; complete quotes of the example opening (line 11) and the causal-graph framing (line 193).
- [[Dillon et al - SHAP Plots vs True Causal Effects]] — CONTAINS: cells [3], [4], [6], Figs. 1, 2, 4; `marginal_effects` algorithm; Findings 1-3 (Bugs reported, Discount, Ad spend; line 290 quoted in full); Fig. 1 bar values against true effects (ranking close to inverted); Fig. 2 panel-by-panel table; eight-row Fig. 4 overlay table.
- [[Dillon et al - When SHAP Recovers Causal Effects]] — CONTAINS: independence condition (Economy), Def. redundancy clustering, two-part causal-readiness procedure, cell [7], Fig. 5, experiment example, per-feature check table.
- [[Dillon et al - Observed Confounding and Double ML for Ad Spend]] — CONTAINS: Def. observed confounder, regularization-redundancy mechanism, three-step DML algorithm with PLR formalization, Fig. 7 value reading (slope about -0.009, band covering 0), verbatim cell [8] and cell [9] (`RegressionWrapper`, `double_ml`, `plot_effect`), code walk-through, Fig. 7, $p = 0.85$ result, all-confounders proviso, vault linear replication.
- [[Dillon et al - Non-Confounding Redundancy and the Control-or-Drop Rule]] — CONTAINS: Def. non-confounding redundancy (downstream and upstream), credit-splitting result, adjustment-choice table for DML, control-or-drop rule with caveats, cells [10]-[11], Figs. 8-9, root-node explanation, vault replication, branded-search analogue; Fig. 9 value-by-value reading cross-checked against the +0.78 true total effect (about 73% recovered).
- [[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]] — CONTAINS: Def. unobserved confounding, DML-fails result for Discount, cells [12]-[13], Figs. 10-11 (Fig. 11 value reading: slope about -1.05 vs true +0.06), randomization claim, IV/DiD/RD table, vault replication, randomized discount-test design, advertising analogue.
- [[Dillon et al - Summary, Limitations and Marketing Implications]] — CONTAINS: five summary points, consolidated decision table, seven limitations, weekly-media driver example, example of choosing among model fits by SHAP mass.

## Sources

- Dillon et al - Be Careful When Interpreting Predictive Models in Search of Causal Insights (SHAP docs) — SHAP documentation notebook by E. Dillon, J. LaRiviere, S. Lundberg, J. Roth and V. Syrgkanis (Microsoft).

## See Also

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] — Shapley/SHAP definitions and their limits.
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — interventional vs observational feature relevance.
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] — causal Goodhart.
- [[Causal Machine Learning - Overview]] — DML and causal forests in the econometrics cluster.
- [[Experimental Benchmarks for Observational Ad Measurement]] — real-world DML vs RCT comparisons for ads.
