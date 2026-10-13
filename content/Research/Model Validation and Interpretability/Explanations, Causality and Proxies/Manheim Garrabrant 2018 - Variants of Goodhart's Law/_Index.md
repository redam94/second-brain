---
title: "Index: Manheim Garrabrant 2018 - Variants of Goodhart's Law"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/goodhart
parent: "[[../_Index|Explanations, Causality and Proxies]]"
date_updated: 2026-10-13
concept_count: 7
---

# Manheim Garrabrant 2018 - Variants of Goodhart's Law

> [!abstract] Routing Summary
> This folder fully captures Manheim & Garrabrant, "Categorizing Variants of Goodhart's Law" (arXiv:1803.04585v4, 10 pp.). The paper is a taxonomy of how optimizing a proxy metric breaks its link to the true goal. The folder has 7 notes covering the formal regulator/goal/proxy setup, the four categories (regressional, extremal, causal, adversarial), their nine sub-cases with toy models (eq. 1-9), the non-causal look-alikes in causal systems, and an applied note with simulations and a validation audit. It is the vault's owner for the **Goodhart taxonomy**.
> - Need the definition of a Goodhart effect, the $S, A, G, M, c$ setup, or the history (Goodhart, Campbell, Lucas, cobra)? → [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]]
> - Need why selecting the best-scoring option overstates its true value (tails come apart, winner's curse)? → [[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]]
> - Need extrapolation failure: underfitting, saturation curves beyond observed spend, regime boundaries? → [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]]
> - Need why intervening on a predictive driver breaks the metric (shared cause, intermediary, metric manipulation)? → [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]]
> - Need what happens when the causal model is wrong but you only select (ignored shared cause / intermediary / additional cause)? → [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]]
> - Need gaming by other agents: Campbell's law, cobra effects, incentive design, reward hacking? → [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]]
> - Need simulations, a practice-to-variant table, or a Goodhart audit checklist for model validation? → [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]]
> - Need the paper map, the taxonomy table and the source map? → [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]]
^routing-summary

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Goodhart effect; regulator, goal, proxy, threshold | [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]] | definition | — | $A=\{s: M(s)\ge c\}$; collapse of the $G$-$M$ relationship under optimization |
| Regressional Goodhart | [[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]] | definition/theorem | Setup | $M=G+N(\mu,\sigma^2)$; $E[G\mid M]$ shrinks by $\lambda=\tau^2/(\tau^2+\sigma^2)$; unavoidable |
| Extremal: model insufficiency | [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] | definition | Setup | $M=G(s)+G'(s)$; underfit polynomials fail in the optimized region |
| Extremal: change in regime | [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] | definition | Setup | $G=M+x$ ($M\le a$), $M+y$ ($M>a$) |
| Causal: shared cause / intermediary / metric manipulation | [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]] | definition | DAGs | Intervention makes $M\perp G$; no uncertainty required |
| Ignored shared cause / intermediary / additional cause | [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]] | definition/theorem | Regressional, Extremal, Causal | Causal mistakes plus selection give worse regressional or extremal Goodhart |
| Adversarial misalignment, Campbell's law | [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]] | definition/theorem | All above | $M_R=G_R+X$, $M_A=G_A X$: corr 0 overall (if $\mu=0$), positive on the selected set |
| Normal / non-causal cobra effect | [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]] | definition | Causal, Ignored additional cause | $G_{AR}=G_{A0}+M_R$ |
| Applied audit and simulations | [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]] | application | All above | Best-of-$K$ overstatement; extrapolation; 9-step audit |

## Notes

- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] — CONTAINS: research question, contribution, taxonomy table (9 sub-cases with equations), ordering logic, key claims, full Source Map, reference list, model-selection worked example.
- [[Manheim Garrabrant - Goodhart Setup with Regulator, Goal and Proxy]] — CONTAINS: Goodhart-effect definition, formal setup ($S$, $s$, $A$, $G$, $M$, $c$), measure vs metric (fn 2), forms of selection pressure (fn 3), Goodhart's 1975 wording and related laws (fn 1), target domains, marketing instantiation example.
- [[Manheim Garrabrant - Regressional Goodhart and Tails Coming Apart]] — CONTAINS: definition, eq. (1), unavoidability claim, Gaussian shrinkage theorem with proof sketch (vault), interpretation (bias vs selection, shrinkage cure, optimization power), best-of-$K$ and Type M examples.
- [[Manheim Garrabrant - Extremal Goodhart, Model Insufficiency and Regime Change]] — CONTAINS: definition, two routes, model insufficiency with eq. (2) (notation $s_i$/$G'$ glossed) and policy/polynomial examples, change in regime with eq. (3), two-routes definition (systematic regional measurement error vs different generating process) and wind-instrument / boundary-layer examples, bridge to causal Goodhart, underfit-polynomial simulation table, saturation-curve example.
- [[Manheim Garrabrant - Causal Goodhart via Shared Cause, Intermediary and Metric Manipulation]] — CONTAINS: definition, no-uncertainty claim, windmill example, DAG figure (mermaid, incl. dashed alternative Goal placements in metric manipulation), shared-cause / intermediary / metric-manipulation definitions and simple models, two-tests and grade-changing examples, fn 4, linear-SCM table, sources of causal Goodhart, branded-search and seasonality examples.
- [[Manheim Garrabrant - Non-Causal Goodhart Effects in Causal Systems]] — CONTAINS: figures (mermaid, with dashed-true / dotted-assumed / solid edge labels verified against the PDF) with a note on the source's "three cases" and "No Figure provided" inconsistencies, ignored shared cause with eq. (4) and correlation gloss, ignored intermediary, ignored additional cause with eq. (5)-(6), classification theorem (regressional / model insufficiency / regime change), range-restriction and attribution-coverage examples.
- [[Manheim Garrabrant - Adversarial Goodhart, Campbell's Law and Cobra Effects]] — CONTAINS: two adversarial families, adversarial misalignment definition, Campbell's original law (fn 5), Campbell's law model eq. (7) and fn 6, correlation check showing the $\mu=0$ condition with simulation table, cobra anecdote, normal cobra effect with figure and eq. (8), non-causal cobra effect eq. (9), the paper's conclusion, marketing / governance / RLHF examples.
- [[Manheim Garrabrant - Goodhart Variants in Marketing Measurement and Model Validation]] — CONTAINS: practice-to-variant diagnostic table, full NumPy simulation code, four simulation result tables (regressional, extremal, shared cause, Campbell), 9-step Goodhart audit algorithm.

## Sources
- Manheim and Garrabrant 2018 - Categorizing Variants of Goodhart's Law — Manheim & Garrabrant, arXiv:1803.04585v4 (24 Feb 2019), 10 pp.

## See Also
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] — explanations used as proxies for model validity
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — interventional vs observational relevance (causal Goodhart's technical core)
- [[Dillon et al - SHAP and Causal Insights - Overview]] — practice guide for not acting on predictive drivers
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] — analytic flexibility as regressional Goodhart on findings
- [[SR 11-7 - Model Risk Management Guidance - Overview]] — effective challenge against adversarial Goodhart
- [[Researcher Degrees of Freedom]] — the analyst's own selection pressure
