---
title: "Index: Bayesian Workflow"
tags:
  - type/index
  - source/ingested
parent: "[[Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-06-17
concept_count: 13
doc_type: index
---

# Bayesian Workflow

> [!abstract] Routing Summary
> This folder covers the iterative Bayesian modeling cycle from the Bayesian Workflow paper (Gelman et al. 2020) plus a deep treatment of Simulation-Based Calibration (Talts et al. 2018). Contains 13 notes.
> - Need the full workflow overview / Figure 1? -> [[Bayesian Workflow - Overview]]
> - Need prior predictive checking or model building? -> [[Choosing and Building Models]]
> - Need the SBC method / fake-data validation at a glance? -> [[Simulation-Based Calibration - Overview]]
> - Need the SBC foundational identity (prior = data-averaged posterior)? -> [[Data-Averaged Posterior Self-Consistency]]
> - Need the rank statistic + uniformity theorem? -> [[Rank Statistics and Uniformity]]
> - Need the step-by-step SBC recipe (Algorithm 1 & 2)? -> [[The SBC Algorithm]]
> - Need to read SBC histogram shapes (∪/∩/sloped) or handle autocorrelation? -> [[Interpreting SBC Histograms]]
> - Need worked SBC examples (HMC/ADVI/INLA, 8-schools)? -> [[SBC Case Studies]]
> - Need SBC in the broader workflow context? -> [[Fitting and Validating Computation]]
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
| SBC method, validates correct posterior sampling, generalizes Cook-Gelman-Rubin (2006) | [[Simulation-Based Calibration - Overview]] | overview | [[Data-Averaged Posterior Self-Consistency]], [[Bayesian Workflow - Overview]] | SBC checks computation, complements PPCs |
| Prior = average of exact posteriors over joint-distribution data (Eq. 1) | [[Data-Averaged Posterior Self-Consistency]] | theorem | — | Data-averaged posterior equals the prior |
| Rank of prior draw in posterior sample ~ discrete Uniform[0,L] (Theorem 1) | [[Rank Statistics and Uniformity]] | theorem | [[Data-Averaged Posterior Self-Consistency]] | Ranks uniform iff sampling is exact & independent |
| SBC procedure: sample θ~prior, y~likelihood, fit, rank; Algorithm 1 & 2 (thinning) | [[The SBC Algorithm]] | concept | [[Rank Statistics and Uniformity]], [[Data-Averaged Posterior Self-Consistency]] | N parallel fits, L draws → rank histogram |
| Histogram shapes: ∪=under-dispersed, ∩=over-dispersed, sloped=biased; autocorrelation/thinning; ECDF | [[Interpreting SBC Histograms]] | concept | [[The SBC Algorithm]], [[Rank Statistics and Uniformity]] | Deviation shape diagnoses the failure mode |
| Worked SBC experiments: misspecified prior, centered 8-schools HMC bias, ADVI, INLA spatial | [[SBC Case Studies]] | example | [[The SBC Algorithm]], [[Interpreting SBC Histograms]] | SBC catches distinct real failure modes |

## Notes
- [[Bayesian Workflow - Overview]] — CONTAINS: Full workflow diagram (Figure 1), workflow vs inference distinction, iterative cycle overview
- [[Choosing and Building Models]] — CONTAINS: Initial model selection, modular construction, prior predictive checking, domain expertise integration
- [[Fitting and Validating Computation]] — CONTAINS: MCMC warmup, convergence checks, fake-data simulation, simulation-based calibration (SBC)
- [[Computational Troubleshooting]] — CONTAINS: Folk theorem of statistical computing, reparameterization strategies, multimodality diagnosis
- [[Evaluating Fitted Models]] — CONTAINS: Posterior predictive checks, cross-validation, sensitivity to priors, residual analysis
- [[Iterative Model Improvement]] — CONTAINS: Model expansion, topology of model space, Bayesian stacking, when to stop iterating
- [[Modeling as Software Development]] — CONTAINS: Version control for models, unit testing, reproducibility practices, documentation
- [[Simulation-Based Calibration - Overview]] — CONTAINS: What SBC validates (correct posterior sampling), naive single-dataset check counterexample, relation to Geweke (2004) and Cook-Gelman-Rubin (2006), complement to posterior predictive checks, place in the workflow
- [[Data-Averaged Posterior Self-Consistency]] — CONTAINS: Eq. 1 self-consistency identity (prior = data-averaged posterior), full statement + notation + proof sketch, data-averaged posterior definition
- [[Rank Statistics and Uniformity]] — CONTAINS: Rank statistic construction (Eq. 4.1), Theorem 1 uniformity statement + conditions (independence, exact sampling), Appendix B proof sketch, why ranks beat CDF values
- [[The SBC Algorithm]] — CONTAINS: Algorithm 1 (ideal) and Algorithm 2 (thinned MCMC) step by step, choice of N and L, 99% Binomial confidence band, re-binning, effective-sample-size thinning
- [[Interpreting SBC Histograms]] — CONTAINS: Uniform/∪/∩/sloped shape catalogue and meanings, autocorrelation boundary spikes + thinning correction (N_eff, CLT), ECDF and ECDF-difference for small deviations
- [[SBC Case Studies]] — CONTAINS: Misspecified-prior ∪-shape (6.1), centered 8-schools HMC bias + non-centered autocorrelation (6.2), ADVI gross slope bias (6.3), INLA subtle spatial bias via ECDF (6.4), Stan Listings 1-4

## Sources

- [[raw/BayesWorkflow.pdf]] — Gelman et al. (2020), arXiv:2011.01808
- [[raw/1804.06788-Talts-SBC.pdf]] — Talts, Betancourt, Simpson, Vehtari & Gelman (2018), "Validating Bayesian Inference Algorithms with Simulation-Based Calibration", arXiv:1804.06788 (shares authors with the Bayesian Workflow paper and BDA3)
