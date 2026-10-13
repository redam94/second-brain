---
title: Dillon et al - Prediction Tasks vs Causal Tasks
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/causal-inference
  - type/concept
  - type/definition
  - method/shap
  - doc/tutorial
source: "[[raw/Dillon et al - Be Careful When Interpreting Predictive Models in Search of Causal Insights (SHAP docs).md]]"
source_location: "Introduction (raw lines 1-7) and section 'Prediction tasks versus causal tasks' (raw lines 169-189)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Explanations, Causality and Proxies/Dillon et al - SHAP and Causal Insights"
doc_type: tutorial
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Dillon et al - SHAP Plots vs True Causal Effects]]"
  - "[[Dillon et al - Summary, Limitations and Marketing Implications]]"
aliases:
  - Prediction Task vs Causal Task (Dillon et al)
  - Dillon Prediction vs Causal Tasks
---

# Dillon et al - Prediction Tasks vs Causal Tasks

> [!summary]
> The notebook's framing device. A **prediction task** only needs `model(X)` to be close to `Y` on data distributed like the training set, so any stable correlation helps. A **causal task** asks how *changing* `X` in the world changes `Y`, so a correlation that only reflects the data-generating context is useless or harmful. A single fitted model and its SHAP explanation can serve the first well and mislead the second. Whether the model's counterintuitive signs are a problem "depends on what our goal is!"
^summary-tasks

## Overview

The introduction sets out the temptation. SHAP-style tools are useful "for explaining what the model is doing, getting stakeholder buy-in, and diagnosing potential problems", and "it is tempting to take this analysis one step further and assume that interpretation tools can also identify what features decision makers should manipulate if they want to change outcomes in the future" (raw line 5). The article's bolded thesis follows: "in this article, we discuss how using predictive models to guide this kind of policy choice can often be misleading."

The reason given is the gap between correlation and causation (line 7):

> "SHAP makes transparent the correlations picked up by predictive ML models. But making correlations transparent does not make them causal! All predictive models implicitly assume that everyone will keep behaving the same way in the future, and therefore correlation patterns will stay constant. To understand what happens if someone starts behaving differently, we need to build causal models, which requires making assumptions and using the tools of causal analysis."

## Main Content

### The puzzle that motivates the distinction (raw lines 171-181)

After fitting XGBoost and plotting SHAP dependence plots ([[Dillon et al - SHAP Plots vs True Causal Effects]]), the authors list two "surprising findings":
- "Users who report more bugs are more likely to renew!"
- "Users with larger discounts are less likely to renew!"

They "triple-check our code and data pipelines to rule out a bug". Business partners then supply the mechanism:
- "Users with high usage who value the product are more likely to report bugs and to renew their subscriptions."
- "The sales force tends to give high discounts to customers they think are less likely to be interested in the product, and these customers have higher churn."

Both explanations name an **unmeasured common cause**, product need, which is formalized in [[Dillon et al - Subscriber Retention Data-Generating Process]].

### The two task types

> [!definition] Definition: Prediction task (section "Prediction tasks versus causal tasks", raw line 185)
> "In a prediction task, the goal is to predict an outcome `Y` (e.g. renewals) given a set of features `X`. A key component of a prediction exercise is that we only care that the prediction `model(X)` is close to `Y` in data distributions similar to our training set. A simple correlation between `X` and `Y` can be helpful for these types of predictions."
>
> Formally, the target is a functional of the observational joint distribution $P(X, Y)$, for example $\mathbb E[Y \mid X = x]$, and performance is judged on draws from the same $P$.
^def-prediction-task

> [!quote] The second team (raw line 187, complete)
> "However, suppose a second team picks up our prediction model with the new goal of determining what actions our company can take to retain more customers. This team cares a lot about how each `X` feature relates to `Y`, not just in our training distribution, but the counterfactual scenario produced when the world changes. In that use case, it is no longer sufficient to identify a stable correlation between variables; this team wants to know whether manipulating feature `X` will cause a change in `Y`. Picture the face of the chief of engineering when you tell him that you want him to introduce new bugs to increase customer renewals!"
>
> This paragraph sets up the core contrast. The **model artifact is the same**; only the **question** changes. The prediction team needs a *stable correlation*. The second team needs to know the result of *manipulating* $X$.
^quote-second-team

> [!definition] Definition: Causal task (raw lines 187-189)
> "In a causal task, we want to know how changing an aspect of the world X (e.g bugs reported) affects an outcome `Y` (renewals). In this case, it's critical to know whether changing `X` causes an increase in `Y`, or whether the relationship in the data is merely correlational."
>
> The team doing the causal task "cares a lot about how each `X` feature relates to `Y`, not just in our training distribution, but the counterfactual scenario produced when the world changes". The target is an interventional quantity such as $\mathbb E[Y \mid do(X_j = x)]$ or $\mathbb E[Y(x)]$ in [[Potential Outcomes Framework|potential-outcomes]] notation. (This notation is the vault's gloss; the source states it in words.)
^def-causal-task

> [!theorem] Claim: The same model can be right for one task and wrong for the other (raw line 183)
> For the forecasting use (e.g. "estimating future revenue for financial planning"): "Since users reporting more bugs are in fact more likely to renew, capturing this relationship in the model is helpful for prediction. As long as our model has good fit out-of-sample, we should be able to provide finance with a good prediction, and therefore shouldn't worry about the direction of this relationship in the model."
>
> For the intervention use: "Picture the face of the chief of engineering when you tell him that you want him to introduce new bugs to increase customer renewals!" (line 187).
>
> **Why.** In the simulated world, $\mathbb E[\text{renew} \mid \text{bugs reported}]$ rises with bugs reported, because bugs reported is a proxy for product need. $\mathbb E[\text{renew} \mid do(\text{bugs reported})]$, however, is flat: reported bugs are not a parent of renewal. The two quantities coincide only when there is no open back-door path ([[DAGs and Causal Identification]]).
^claim-same-model-two-tasks

### Out-of-sample validation does not resolve the difference

The prediction-task criterion is good out-of-sample fit, which is the subject of [[Cross Validation Checking]] and [[Model Selection and Overfitting]]. That criterion is *silent* on causal validity. Held-out data come from the same observational $P$, so a model that uses Ad spend as a proxy for its causes, or Bugs reported as a proxy for product need, scores just as well. A causal claim needs either knowledge of the causal graph (domain assumptions) or variation that the analyst controls ([[The Experimental Ideal]]).

## Examples

> [!example] Example: one forecast model, two consumers
> **Setup.** A retention forecaster is trained on last year's customers and used (a) by finance to project next quarter's renewals and (b) by a growth team to decide whom to give discounts to.
>
> **(a)** Discount policy and customer mix stay as they were, so the negative discount–renewal association remains predictive. Using it is correct.
>
> **(b)** The growth team changes the discount policy. That breaks the assignment rule ("high discounts to customers they think are less likely to be interested"), so the learned association no longer describes what happens. The model says discounts hurt, but the causal effect in the DGP is positive ([[Dillon et al - Unobserved Confounding and Quasi-Experimental Remedies]]).
>
> **Interpretation.** The task, not the model, decides whether a sign is a bug.
^ex-two-consumers

## Connections

- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — the algorithmic-modeling culture optimizes for the prediction task. This article warns against importing its outputs into a data-modeling (inference) question.
- [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] — using a predictive correlate as a policy lever is the causal variant of Goodhart's law.
- [[The Selection Problem]] and [[Conditional Independence Assumption]] — the econometric statement of when observational contrasts are causal.
- [[Counterfactual Inference]] — interventional vs observational prediction in Bayesian regression.

## See Also

- [[Dillon et al - SHAP and Causal Insights - Overview]] — source map.
- [[Dillon et al - SHAP Plots vs True Causal Effects]] — the plots that triggered the puzzle.
- [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] — the model output is a property of the system, not of the external world.
