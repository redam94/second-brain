---
title: "Bayesian Workflow - Overview"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
source: "[[raw/BayesWorkflow.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Workflow"
---

> [!summary]
> Bayesian workflow extends far beyond Bayesian inference ($p(\theta|y) \propto p(\theta)p(y|\theta)$). It encompasses the full iterative cycle of model building, fitting, checking, and revision that characterizes real applied Bayesian data analysis. This paper by Gelman, Vehtari, Simpson, Margossian, Carpenter, Yao, Kennedy, Gabry, Burkner, and Modrak (2020) codifies the tacit knowledge practitioners need.

## Workflow vs. Inference

**Bayesian inference** is the computation of conditional probabilities or posterior densities. **Bayesian workflow** includes the three steps of model building, inference, and model checking/improvement, along with the comparison of different models -- not just for model choice but to better understand each model's behavior.

The authors emphasize that in practice we fit *many* models for any given problem, and even poor models serve as unavoidable steps along the way toward fitting useful ones.

## Why a Workflow Is Needed

1. **Computation is hard** -- we must work through various steps including simpler models and approximate computation to reach trustworthy inferences.
2. **We rarely know the final model ahead of time** -- models expand as we gather data and ask more detailed questions.
3. **Data are often not fixed** -- new data require model extensions and re-evaluation.
4. **Understanding requires comparison** -- models are best understood by comparing inferences across a series of related models.

## The Iterative Cycle

The workflow follows a non-linear path (see Figure 1 of the paper):

1. **Pick an initial model** ([[Choosing and Building Models]])
2. **Prior predictive check** to validate priors against domain knowledge
3. **Fit the model** ([[Fitting and Validating Computation]])
4. **Validate computation** -- convergence diagnostics, fake-data simulation, SBC
5. **Address computational issues** if needed ([[Computational Troubleshooting]])
6. **Evaluate and use the model** ([[Evaluating Fitted Models]])
7. **Modify the model** ([[Iterative Model Improvement]])
8. **Compare models** across the topology of fitted models

## Connection to Statistical Methodology

The paper frames methodology development as a progression: Example -> Case study -> Workflow -> Method -> Theory. Workflows are more general than examples but less precisely specified than formal methods, filling an important gap in the literature.

## Related Notes

- [[Choosing and Building Models]]
- [[Fitting and Validating Computation]]
- [[Computational Troubleshooting]]
- [[Evaluating Fitted Models]]
- [[Iterative Model Improvement]]
- [[Modeling as Software Development]]
- [[Model Checking]] | [[Model Comparison]] | [[MCMC Basics]]
