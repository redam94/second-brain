---
title: "Evaluating Fitted Models"
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
  - "[[Fitting and Validating Computation]]"
  - "[[Computational Troubleshooting]]"
  - "[[Hierarchical Models]]"
  - "[[Bayesian Workflow - Overview]]"
  - "[[raw/BayesWorkflow.pdf]]"
used_by:
  - "[[Iterative Model Improvement]]"
  - "[[Modeling as Software Development]]"
  - "[[Model Checking]]"
  - "[[Model Comparison]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
expanded_by:
  - "[[Posterior Predictive Checking]]"
  - "[[Cross Validation Checking]]"
  - "[[Model Selection Using Predictive Performance]]"
  - "[[Visualizing High-Dimensional Inference]]"
---

> [!info] Expanded in the 2026 textbook
> The 2020 paper's model-evaluation material becomes the 16 notes of [[Research/Bayesian Statistics/Workflow/Evaluating and Comparing/_Index|Evaluating and Comparing]] in Gelman, Vehtari & McElreath (2026), *Bayesian Workflow*.
>
> **Closest book counterparts:**
> - [[Posterior Predictive Checking]] — the full graphical repertoire
> - [[Cross Validation Checking]] — PSIS-LOO, Pareto $\hat{k}$, LOO-PIT-ECDF, K-fold
> - [[Influence of Individual Data Points]] and [[Influence of Likelihood and Prior]] — sensitivity analysis
> - [[Model Selection Using Predictive Performance]] and [[Model Selection and Overfitting]]
> - [[Stacking and Predictive Model Averaging]] — the recommended alternative to selection
> - [[Visualizing High-Dimensional Inference]] — reading a fit you cannot plot directly


# Evaluating Fitted Models

> [!summary]
> Section 6 of Gelman et al. (2020) covers how to evaluate a fitted Bayesian model through posterior predictive checks, cross validation, sensitivity analysis of priors, and graphical exploration. The goal is not just to assess fit but to understand what the model captures and misses, guiding the next iteration of [[Iterative Model Improvement]].

## Posterior Predictive Checking

Posterior predictive checking (Box, 1980; Gelman et al., 1996) generates replicated datasets $y^{\text{rep}}$ from the posterior predictive distribution:

$$
y^{\text{rep}} \sim p(y^{\text{rep}}|y) = \int p(y^{\text{rep}}|\theta)\,p(\theta|y)\,d\theta
$$

Compare $y^{\text{rep}}$ to observed data $y$ using summary statistics or visual checks. If the observed data look unrepresentative of the posterior predictive distribution, the model fails to capture some aspect of the data. See [[Model Checking]] for foundational discussion.

> [!tip] Choosing What to Check
> There is no general rule for which checks to perform. Focus on **severe tests** (Mayo, 2018) -- checks that are likely to fail if the model would give misleading answers to the questions you care most about.

Types of checks implemented in `bayesplot`:

- **Density overlays** -- compare distribution of $y$ vs. $y^{\text{rep}}$
- **Statistic checks** -- compare test statistics (e.g., sd, max) between $y$ and $y^{\text{rep}}$
- **Grouped checks** -- compare $y$ vs. $y^{\text{rep}}$ by subgroups not in the model

## Cross Validation and Influence of Data Points

Posterior predictive checking uses the same data for fitting and evaluation, which can be overly optimistic. **Leave-one-out cross validation** (LOO-CV) addresses this by evaluating predictive performance on held-out observations.

Three diagnostic uses of LOO-CV:

1. **Calibration checks** using the LOO predictive distribution (LOO-PIT values should be uniform under good calibration)
2. **Identifying hard-to-predict observations** -- which data points have poor LOO scores?
3. **Assessing observation influence** -- how much do individual points affect inferences?

Efficient LOO-CV via Pareto-smoothed importance sampling (PSIS; Vehtari et al., 2017) avoids refitting the model for each held-out point. See [[Model Comparison]] for use in model selection.

## Influence of Prior Information

Understanding how priors affect the posterior is essential:

- **Sensitivity analysis**: refit with alternative priors (e.g., $\text{normal}(0, 0.5)$ vs. $\text{normal}(0, 2)$) or use importance sampling to approximate the effect
- **Prior-to-posterior shrinkage**: compare prior and posterior standard deviations; if the prior is informative for a parameter, shrinkage toward the prior should be visible
- **Static sensitivity analysis**: plot posterior simulations of a quantity of interest against individual parameters to visualize dependence without refitting (Gelman, Bois, and Jiang, 1996)

## Summarizing Inference and Propagating Uncertainty

Bayesian inference naturally handles **uncertainty propagation** through [[Hierarchical Models]] and latent variables. However, standard summaries (point estimates, intervals) often fail to capture the multiple levels of variation in complex models. Graphical exploration -- plotting data alongside model-based estimates -- is essential for understanding model behavior.

Gabry et al. (2019) advocate for graphics in Bayesian workflow, implemented in tools like `bayesplot` and `ArviZ`.

## See Also

- [[Fitting and Validating Computation]] — upstream step: ensures the sampler is working before evaluating fit
- [[Iterative Model Improvement]] — downstream step: use evaluation failures to guide the next model iteration
- [[Model Checking]] — foundational posterior predictive check methodology
- [[Model Comparison]] — LOO-CV as a model selection criterion (extends evaluation to cross-model comparison)
- [[Hierarchical Models]] — uncertainty propagation across levels is a key focus of evaluation
- [[Overfitting and Information Criteria]] — WAIC and LOO as information-theoretic alternatives to LOO-CV
- [[Bayesian Workflow - Overview]] — situates evaluation in the full iterative workflow
