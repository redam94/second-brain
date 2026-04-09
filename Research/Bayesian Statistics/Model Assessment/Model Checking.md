---
title: "Model Checking"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/model-checking
  - topic/posterior-predictive
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Model Assessment"
aliases:
  - "Posterior predictive checks"
  - "Bayesian p-value"
---

# Model Checking

> [!summary]
> Chapter 6 of BDA3 presents posterior predictive checking as the primary tool for assessing Bayesian model fit. The core idea: simulate replicated data from the fitted model and compare to the observed data.

## Posterior Predictive Checking

Generate replicated datasets $y^{\text{rep}}$ from the posterior predictive distribution:

$$p(y^{\text{rep}} \mid y) = \int p(y^{\text{rep}} \mid \theta)\, p(\theta \mid y)\, d\theta$$

If the model fits well, $y^{\text{rep}}$ should "look like" the observed data $y$.

## Test Quantities and Bayesian p-values

Define a test quantity $T(y, \theta)$ — any scalar summary of data and parameters. The **posterior predictive p-value** is:

$$p_B = \Pr(T(y^{\text{rep}}, \theta) \geq T(y, \theta) \mid y)$$

Values near 0 or 1 indicate model misfit. Unlike classical p-values, this accounts for parameter uncertainty.

## Graphical Checks

- Compare histograms/density plots of $y$ vs. $y^{\text{rep}}$
- Overlay multiple $y^{\text{rep}}$ datasets on the observed data
- **Residual plots**: Bayesian residuals use a single posterior draw of $\theta$, not a point estimate
- **Binned residual plots**: useful for discrete data where raw residuals are hard to interpret

## Key Principles

- Model checking is about understanding where the model fails, not binary accept/reject
- Checking is iterative: identify misfit → expand the model → check again (see [[Bayesian Workflow - Overview]])
- Sensitivity analysis: assess how conclusions change under alternative models or priors

## See Also

- [[Model Comparison]] — quantitative model comparison using predictive accuracy
- [[Evaluating Fitted Models]] — workflow perspective on model evaluation
- [[Hierarchical Models]] — model checking for the eight schools example
