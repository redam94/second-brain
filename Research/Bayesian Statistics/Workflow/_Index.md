---
title: "Index: Bayesian Workflow"
tags:
  - type/index
  - source/ingested
parent: "[[Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-04-09
concept_count: 7
doc_type: index
---

# Bayesian Workflow

> [!abstract] Routing Summary
> This folder covers the iterative Bayesian modeling cycle from the Bayesian Workflow paper (Gelman et al. 2020). Contains 7 notes.
> - Need the full workflow overview / Figure 1? -> [[Bayesian Workflow - Overview]]
> - Need prior predictive checking or model building? -> [[Choosing and Building Models]]
> - Need SBC or fake-data simulation? -> [[Fitting and Validating Computation]]
> - Need to debug divergences or multimodality? -> [[Computational Troubleshooting]]
> - Need version control for models? -> [[Modeling as Software Development]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Full workflow vs mere Bayesian inference, Figure 1 | [[Bayesian Workflow - Overview]] | overview | [[Probability and Bayesian Inference]], [[MCMC Basics]], [[Hierarchical Models]] | Workflow = iterative cycle, not just fitting |
| Model selection, modular construction, prior predictive | [[Choosing and Building Models]] | concept | [[Bayesian Workflow - Overview]], [[Hierarchical Models]], [[Probability and Bayesian Inference]] | Build models modularly, check priors first |
| Warmup, convergence, fake-data simulation, SBC | [[Fitting and Validating Computation]] | concept | [[Choosing and Building Models]], [[MCMC Basics]], [[Efficient MCMC]], [[Bayesian Workflow - Overview]] | SBC validates the full inference pipeline |
| Folk theorem, reparameterization, multimodality | [[Computational Troubleshooting]] | concept | [[Fitting and Validating Computation]], [[MCMC Basics]], [[Efficient MCMC]], [[Hierarchical Models]] | Computational problems often signal model problems |
| Posterior predictive checks, cross-validation, prior influence | [[Evaluating Fitted Models]] | concept | [[Fitting and Validating Computation]], [[Computational Troubleshooting]], [[Hierarchical Models]], [[Bayesian Workflow - Overview]] | Evaluate models against data and domain knowledge |
| Model modification, topology of models, stacking | [[Iterative Model Improvement]] | concept | [[Evaluating Fitted Models]], [[Choosing and Building Models]], [[Hierarchical Models]], [[Bayesian Workflow - Overview]] | Expand or modify models based on evaluation |
| Version control, testing, reproducibility | [[Modeling as Software Development]] | concept | [[Bayesian Workflow - Overview]], [[Fitting and Validating Computation]], [[Choosing and Building Models]], [[Evaluating Fitted Models]] | Treat model code like software |

## Notes
- [[Bayesian Workflow - Overview]] — CONTAINS: Full workflow diagram (Figure 1), workflow vs inference distinction, iterative cycle overview
- [[Choosing and Building Models]] — CONTAINS: Initial model selection, modular construction, prior predictive checking, domain expertise integration
- [[Fitting and Validating Computation]] — CONTAINS: MCMC warmup, convergence checks, fake-data simulation, simulation-based calibration (SBC)
- [[Computational Troubleshooting]] — CONTAINS: Folk theorem of statistical computing, reparameterization strategies, multimodality diagnosis
- [[Evaluating Fitted Models]] — CONTAINS: Posterior predictive checks, cross-validation, sensitivity to priors, residual analysis
- [[Iterative Model Improvement]] — CONTAINS: Model expansion, topology of model space, Bayesian stacking, when to stop iterating
- [[Modeling as Software Development]] — CONTAINS: Version control for models, unit testing, reproducibility practices, documentation

## Sources

- [[raw/BayesWorkflow.pdf]] — Gelman et al. (2020), arXiv:2011.01808
