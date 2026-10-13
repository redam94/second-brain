---
title: "Index: Interpretability and Causality"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Model Validation]]"
date_updated: 2026-10-13
concept_count: 4
---

# Interpretability and Causality

> [!abstract] Routing Summary
> This folder covers why model attributions (SHAP, Shapley) describe the model rather than what to change, and how optimising proxies backfires. Contains 4 reference notes.
> - Need can SHAP tell me what to manipulate? → [[Dillon et al - SHAP Predictive Models and Causal Insights]]
> - Need mathematical + human problems with Shapley explanations? → [[Kumar et al 2020 - Problems with Shapley-Value Explanations]]
> - Need conditional vs interventional SHAP? → [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]]
> - Need Goodhart's law variants? → [[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]]

## Concept Map

| Note | Type | Key Result |
|------|------|------------|
| [[Dillon et al - SHAP Predictive Models and Causal Insights]] | definition | Predictive attribution ≠ causal effect unless features are experimentally varied |
| [[Kumar et al 2020 - Problems with Shapley-Value Explanations]] | definition | Influence on the model does not imply changing the feature helps |
| [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]] | definition | Interventional value function $E[Y\mid do(\tilde X_S=x_S)]$ = marginal expectation |
| [[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]] | definition | Regressional, extremal, causal, adversarial Goodhart |

## Notes

- [[Dillon et al - SHAP Predictive Models and Causal Insights]] — CONTAINS: Retention example; four confounding cases; DAG + double ML remedies
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations]] — CONTAINS: Shapley value + axioms; conditional vs interventional value functions; stakeholder over-trust
- [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]] — CONTAINS: Causal model separating world X from model inputs X̃
- [[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]] — CONTAINS: Four variant definitions; optimiser's curse

## Sources
- [[Research/Model Validation/raw/model-validation-references.md|Model validation references]] — bibliography and verified quotations

## See Also
- [[../_Index|Model Validation]] — parent topic
