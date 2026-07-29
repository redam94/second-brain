---
title: "Iterative Model Improvement"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/BayesWorkflow.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Workflow"
doc_type: concept
source_location: "Bayesian Workflow paper"
depends_on:
  - "[[Evaluating Fitted Models]]"
  - "[[Choosing and Building Models]]"
  - "[[Hierarchical Models]]"
  - "[[Bayesian Workflow - Overview]]"
  - "[[raw/BayesWorkflow.pdf]]"
used_by:
  - "[[Modeling as Software Development]]"
  - "[[Model Comparison]]"
  - "[[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]"
aliases:
  - model iteration
  - Bayesian model refinement
  - modifying models
---

> [!summary]
> Sections 7--8 of Gelman et al. (2020) cover the iterative heart of Bayesian workflow: modifying models in response to data, failures, and new understanding, then comparing and combining multiple models. The goal is not to find the single "best" model but to understand how inferences change across a topology of related models.

## Modifying a Model (Section 7)

Model expansion is triggered by:

- New data requiring additional structure (e.g., new groups in a [[Hierarchical Models|hierarchical model]])
- Failures of fit revealed by [[Evaluating Fitted Models|posterior predictive checks]]
- Computational struggles with existing fitting procedures

### Constructing a Model for the Data

The data model is often more important than its distributional form. Key considerations include how the data are linked to underlying parameters of interest, handling nonsampling error, and allowing for systematic measurement bias. Any generative model is necessarily an approximation.

### Incorporating Additional Data

Adding data can be as simple as adding predictors, or as complex as integrating multiple data sources (e.g., direct measurements combined with population summary statistics). When more parameters are added, not all can have large effects -- this motivates hierarchical priors and regularization.

### Working with Prior Distributions

Priors exist on a **ladder of informativeness**:

| Prior Type | Example |
|------------|---------|
| Improper flat | Uniform on $\mathbb{R}$ |
| Super-vague but proper | $\text{normal}^+(0, 1000)$ |
| Weakly informative | $\text{normal}^+(0, 1)$ |
| Generic weakly informative | Default regularizing priors |
| Specific informative | $\text{normal}^+(0, 0.1)$ based on domain knowledge |

> [!warning] Information Budget
> As models grow more complex, the "information budget" must be divided among more parameters. Priors often need to become *tighter* as models expand, to avoid destabilizing estimates. Prior predictive checking ([[Choosing and Building Models]]) helps calibrate this.

Priors should be understood as **constraints** -- choosing a prior is choosing how much subject-matter information to include. The joint prior over all parameters matters more than individual marginals, especially in high dimensions.

### A Topology of Models

Models in a given framework (e.g., ARMA, linear regression with variable selection) form a **partial ordering** or topology. For example, AR(1) is simpler than AR(2), which is simpler than ARMA(2,1). Navigating this topology -- understanding connections between parameters across models -- is central to workflow.

## Understanding and Comparing Multiple Models (Section 8)

### Why Fit Multiple Models?

- Hard to fit a big model directly; build up incrementally
- Coding errors and conceptual mistakes require iterative correction
- New data motivate model expansion
- Comparing inferences across models reveals what drives conclusions

### Multiverse Analysis

Instead of selecting one model, perform a **multiverse analysis**: fit all plausible model variants and see how conclusions change. If conclusions are robust across models, the choice of "best" model matters less. See [[Model Comparison]].

### Cross Validation and Stacking

When comparing models via LOO-CV, do not simply pick the model with the best score if there is non-negligible uncertainty in the comparison. Instead, use **stacking** to combine predictive distributions:

$$p_{\text{stack}}(y|\text{data}) = \sum_{k=1}^{K} w_k \, p_k(y|\text{data})$$

where weights $w_k$ are chosen to minimize cross-validation error. Stacking can be viewed as pointwise model selection and fills the gap between independent-error ML validation and grouped/structured data. It outperforms traditional Bayesian model averaging, which is sensitive to prior specification on parameters that do not affect predictions.

### Projection Predictive Variable Selection

For large model spaces, projection predictive selection (Piironen and Vehtari, 2017) finds smaller submodels with comparable predictive performance to the full expanded model, avoiding the overfitting that comes from searching through many models independently.

## See Also

- [[Evaluating Fitted Models]] — posterior predictive checks that trigger model modification
- [[Modeling as Software Development]] — the software engineering analogy for workflow
- [[Model Comparison]] — LOO-CV, WAIC, Bayes factors, and stacking for choosing between models
- [[Hierarchical Models]] — the go-to expansion when group structure is present
- [[Choosing and Building Models]] — the prior model-building step before iteration
- [[Overfitting and Information Criteria]] — the bias-variance tradeoff underlying model selection
