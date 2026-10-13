---
title: "Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/interpretability
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "Statistics and Computing 31, 82 (2021); arXiv:1905.03151v2, pp. 1, 5"
citation: "Hooker, G., Mentch, L. & Zhou, S. (2021). Unrestricted permutation forces extrapolation: Variable importance requires at least one more model, or there is no free variable importance. Statistics and Computing, 31, 82."
date_ingested: 2026-10-13
folder: "Model Validation/Feature Importance"
doc_type: paper
depends_on:
  - "[[Strobl et al 2008 - Conditional Variable Importance]]"
  - "[[Breiman 2001 - Statistical Modeling The Two Cultures]]"
used_by:
  - "[[Kumar et al 2020 - Problems with Shapley-Value Explanations]]"
  - "[[Janzing et al 2020 - Feature Relevance Is a Causal Problem]]"
  - "[[Fisher et al 2019 - Model Class Reliance]]"
aliases:
  - "Hooker 2021"
  - "There is no free variable importance"
  - "Permute-and-predict extrapolation"
---

# Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation

> [!summary]
> Hooker, Mentch & Zhou argue that **permute-and-predict** diagnostics — permutation importance, partial dependence, ICE plots and some Shapley implementations — evaluate a fitted model at feature combinations that never occur in the data whenever features are dependent, so the result reflects how the learner **extrapolates**, not the data. Reliable importance requires fitting at least one more model (conditional simulation or refitting); for validators, importance computed by permuting a single trained model on correlated drivers is not trustworthy evidence.

## Overview

*Hooker, G., Mentch, L. & Zhou, S. (2021). Statistics and Computing 31, 82. [arXiv:1905.03151v2]*

The paper examines the most widely used model-agnostic interpretation tools. Their common structure is to take a trained model $\hat f$, replace feature $X_j$ by values drawn independently of the other features (by permutation or by averaging over its marginal), and look at how predictions or loss change. The question is what this measures when the features are statistically dependent.

## Main Content

### The extrapolation mechanism

If $X_1$ and $X_2$ are strongly correlated, the observed data lie near a low-dimensional manifold (e.g. near the diagonal). Permuting $X_1$ independently of $X_2$ produces points such as (high $X_1$, low $X_2$) that have **no training support**. Flexible learners — random forests, boosted trees, neural networks — are essentially unconstrained there, so the change in prediction at those points is an artefact of the learner's off-manifold behaviour.

> [!definition] Permute-and-predict (PaP) importance
> For a trained model $\hat f$ and loss $L$,
> $$\mathrm{VI}^{\text{PaP}}_j = \frac{1}{n}\sum_{i=1}^{n} L\big(y_i, \hat f(x_{i,-j}, x_{\pi(i),j})\big) - \frac{1}{n}\sum_{i=1}^{n} L\big(y_i, \hat f(x_i)\big),$$
> where $\pi$ is a random permutation. The permuted rows $(x_{i,-j}, x_{\pi(i),j})$ are draws from the product of marginals $P(X_{-j})P(X_j)$, not from the joint $P(X)$.
^def-permute-and-predict

For a linear model $\hat f(x) = \sum_k \beta_k x_k$ and squared-error loss, the expected PaP importance is $2\beta_j^2\,\mathrm{Var}(X_j)$, ignoring dependence; if $X_j$ were instead redrawn from its **conditional** distribution given $X_{-j}$, it becomes $2\beta_j^2\,\mathbb{E}[\mathrm{Var}(X_j \mid X_{-j})]$, which shrinks as $X_j$ becomes predictable from the other features. For nonlinear learners the gap between the two can be much larger and of either sign, because the off-manifold predictions are arbitrary.

### Simulation findings

In simulations where the true regression function is simple and additive but some features are correlated, permutation importance from random forests and neural networks systematically **over-credits correlated features** relative to their true contribution, and the distortion grows with the correlation. Partial-dependence curves are distorted in the same regions.

### "No free variable importance": alternatives

> [!definition] Importance via at least one more model
> - **Condition-and-predict / conditional permutation:** draw $X_j$ from an estimate of $P(X_j \mid X_{-j})$ (requires a model of the feature distribution), so evaluations stay on the data manifold — cf. [[Strobl et al 2008 - Conditional Variable Importance]].
> - **Drop-and-relearn (leave-one-covariate-out):** refit the learner without $X_j$ and compare held-out loss.
> - **Permute-and-relearn:** refit the learner on data with $X_j$ permuted and compare held-out loss.
>
> Each requires fitting a second model (of the features or of the response), hence the title. Relearning-based measures answer "how much worse can we predict without the information in $X_j$?", which, with correlated features, can be small even for a feature the original model used heavily.
^def-no-free-importance

## Key Passages

> "When features in the training set exhibit statistical dependence, permute-and-predict methods can be highly misleading when applied to the original model." — Hooker, Mentch & Zhou (2021), p. 1

> "Some implementations of Shapley values exhibit the same permutation structure that we critique here and can be similarly misleading" — Hooker et al. (2021), p. 5

## Implications for Model Validation

- For models of correlated drivers (co-flighted media, price and promotion, seasonal covariates), treat permutation importance and partial-dependence plots computed on the original model as **suspect** until checked against a refit or conditional method.
- Interventional / marginal SHAP values evaluate the model on the same kind of off-manifold points; the critique applies to SHAP-based rankings too.
- A validation check: compare PaP importance with drop-and-relearn importance on held-out data; large disagreements flag extrapolation artefacts.
- Response curves read off a flexible model in regions of the feature space without data (e.g. spend levels never observed together) are extrapolations, not estimates.

## Connections

- Complements [[Strobl et al 2008 - Conditional Variable Importance]], which proposes the conditional permutation fix for forests.
- The same tension appears in Shapley explanations: [[Kumar et al 2020 - Problems with Shapley-Value Explanations]] (both value functions have problems) versus [[Janzing et al 2020 - Feature Relevance Is a Causal Problem]] (interventional is the right one *for describing the model*).
- [[Fisher et al 2019 - Model Class Reliance]] addresses a different gap: even a correct importance for one model need not hold for other equally good models.

## See Also

- [[Strobl et al 2007 - Bias in Random Forest Variable Importance]] — earlier bias in forest importance
- [[Kumar et al 2020 - Problems with Shapley-Value Explanations]] — Shapley-based explanations' failure modes
- [[Dillon et al - SHAP Predictive Models and Causal Insights]] — why importance is not a policy lever
- [[Model Checking]] — checking a model against the data it was fitted to
