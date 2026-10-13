---
title: "Dillon et al - SHAP Predictive Models and Causal Insights"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/causal-inference
  - type/concept
  - doc/reference
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "SHAP documentation, shap.readthedocs.io (accessed 11 Oct 2026); opening, §Observed confounding, §Summary"
citation: "Dillon, E., LaRiviere, J., Lundberg, S., Roth, J. & Syrgkanis, V. Be careful when interpreting predictive models in search of causal insights. SHAP documentation, shap.readthedocs.io."
date_ingested: 2026-10-13
folder: "Model Validation/Interpretability and Causality"
doc_type: reference
depends_on:
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations]]"
  - "[[Strobl et al 2008 - Conditional Variable Importance]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]]"
  - "[[Gordon et al 2019 - Advertising Measurement at Facebook]]"
aliases:
  - "Dillon et al SHAP"
  - "Be careful when interpreting predictive models in search of causal insights"
  - "SHAP causal caveats"
---

# Dillon et al - SHAP Predictive Models and Causal Insights

> [!summary]
> In an article in the official SHAP documentation, Dillon, LaRiviere, Lundberg (the author of SHAP), Roth & Syrgkanis show with a synthetic example of known ground truth that SHAP values from a well-fitting predictive model can **credit non-causal features and even get the sign of causal effects wrong**, because regularised learners exploit correlation, not causation. Unless features come from experimental variation, SHAP rankings describe the model's predictions and should not be used to decide what to change.

## Overview

*Dillon, E., LaRiviere, J., Lundberg, S., Roth, J. & Syrgkanis, V. "Be careful when interpreting predictive models in search of causal insights." SHAP documentation (shap.readthedocs.io), accessed 11 Oct 2026.*

The piece is written for practitioners who build a predictive model, explain it with SHAP, and then read the explanation as a guide to action ("which levers should we pull?"). It is notable because it comes from the SHAP project itself.

## Main Content

### The worked example

The article simulates a subscription-retention problem with a **known causal graph**. A gradient-boosted tree model (XGBoost) predicts whether customers renew from features such as sales calls, interactions, economy, last upgrade, discount, monthly usage, ad spend and bugs reported. Because the data-generating process is known, SHAP dependence plots can be compared with the true causal effects. The model predicts well, yet:

- **Independent features** (no confounding, not influenced by other features) are the case where SHAP dependence approximately tracks the true causal effect.
- **Observed confounding / redundancy.** A feature with *no* causal effect (ad spend) is correlated with features that do matter; the regularised model may use it in their place, so it receives SHAP credit (see Key Passages). Strongly redundant features (e.g. sales calls versus total interactions) split or swap credit arbitrarily.
- **Unobserved confounding.** A feature (discount) is targeted at customers with an unmeasured characteristic that also drives renewal; its SHAP relationship reflects that selection and can have the **wrong sign** relative to its causal effect.
- **Features that are outcomes of other drivers.** A variable that is itself caused by an important driver (e.g. bugs reported rising with usage) appears predictive in a direction that does not reflect what intervening on it would do.

> [!definition] Predictive attribution versus causal effect
> A SHAP value $\phi_j(x)$ decomposes the model's prediction $\hat f(x)$ into additive feature contributions (see [[Kumar et al 2020 - Problems with Shapley-Value Explanations]]). A causal effect is a contrast between outcomes under interventions, e.g. $\mathbb E[Y \mid do(X_j = a)] - \mathbb E[Y \mid do(X_j = b)]$. The two coincide only when the fitted model's dependence on $X_j$ equals the interventional dependence of $Y$ on $X_j$ — which requires, among other things, no unadjusted confounding and no use of $X_j$ as a proxy.
^def-attribution-vs-causal-effect

### Recommended practice

- Draw the assumed causal graph ([[Directed Acyclic Graphs]]) before interpreting a model.
- For **observed confounding**, use causal-effect estimators that adjust for confounders explicitly, such as double/debiased machine learning (e.g. via the EconML library), rather than reading effects off a predictive model.
- For **redundant features**, recognise that predictive models cannot apportion credit among them; causal questions about them require design or structural assumptions.
- For **unobserved confounding**, no amount of modelling on observational data fixes the problem; experiments or instruments are needed.

## Key Passages

> "It is tempting to take this analysis one step further and assume that interpretation tools can also identify what features decision makers should manipulate if they want to change outcomes in the future. However, in this article, we discuss how using predictive models to guide this kind of policy choice can often be misleading." — Dillon et al., SHAP docs, opening

> "But this means that if Ad Spend is highly correlated with both Last Upgrade and Monthly Usage, XGBoost may use Ad Spend instead of the causal features! This property of XGBoost (or any other machine learning model with regularization) is very useful for generating robust predictions of future retention, but not good for understanding which features we should manipulate if we want to increase retention." — Dillon et al., SHAP docs, §"Observed confounding"

> "Unless features in a model are the result of experimental variation, applying SHAP to predictive models without considering confounding is generally not an appropriate tool to measure causal impacts used to inform policy." — Dillon et al., §Summary

## Implications for Model Validation

- A SHAP ranking of drivers in a KPI model is a description of the model; presenting it as "what moves the KPI" is a causal claim that needs separate evidence.
- Marketing variables are often targeted (spend follows demand, discounts follow churn risk), the textbook unobserved-confounding case — SHAP signs on such variables can be inverted.
- Validation should ask, for each driver communicated to decision makers, what design (experiment, natural experiment, explicit adjustment) supports a causal reading.
- High predictive accuracy is not evidence that attributions are causal; the example's model predicts well while misattributing.

## Connections

- Formal background on Shapley values and their limits: [[Kumar et al 2020 - Problems with Shapley-Value Explanations]], [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]].
- Proxy credit among correlated features: [[Strobl et al 2008 - Conditional Variable Importance]], [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]].
- Interpreting every coefficient of a predictive model causally is the [[Table 2 Fallacy]]; confounding mechanics in [[Spurious Association and Confounds]] and [[Omitted Variables Bias]].
- Targeted exposure as confounder in advertising: [[Activity Bias in Advertising]], [[Gordon et al 2019 - Advertising Measurement at Facebook]].
- Optimising a proxy that is not causal: [[Manheim and Garrabrant 2018 - Variants of Goodhart's Law]] (causal Goodhart).

## See Also

- [[Kumar et al 2020 - Problems with Shapley-Value Explanations]] — mathematical and human-centric problems with Shapley explanations
- [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]] — what SHAP should condition on
- [[Fisher et al 2019 - Model Class Reliance]] — reliance is a property of a model
- [[Potential Outcomes Framework]] — the formal language of causal effects
- [[Observational vs Experimental Methods in Advertising]] — why observational estimates of ad effects mislead
