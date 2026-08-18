---
title: "Index: Computational Workflow"
tags:
  - type/index
  - source/ingested
parent: "[[Research/Bayesian Statistics/Workflow/_Index|Bayesian Workflow]]"
date_updated: 2026-08-18
concept_count: 16
---

# Computational Workflow

> [!abstract] Routing Summary
> Chapters 11–13 and 15 of [[Bayesian Workflow Book - Overview|Gelman, Vehtari & McElreath (2026)]]: what HMC is actually doing, how to read its diagnostics, the catalogue of failure modes and their fixes, the approximate-inference ladder, and modeling as software development. 16 notes.
> - Need to know **what the sampler is exploring**? → [[The Typical Set and the Log Posterior Density]]
> - Need **initialization / warmup / adaptation**? → [[Initial Values, Adaptation, and Warmup]]
> - Need to read **$\hat{R}$ and ESS**? → [[Chains, Iterations, and Effective Sample Size]]
> - Need **MCSE and how many digits to report**? → [[Effective Sample Size and Monte Carlo Standard Error]], [[How Many Digits to Report]]
> - Need the **fail-fast development loop**? → [[Fit Fast, Fail Fast]]
> - Need the **catalogue of failure modes** (funnels, aliasing, multimodality, divergences)? → [[Failure Modes and Steps Forward]]
> - Need to **fix computation by changing the model**? → [[Modeling Ideas to Address Computing Problems]]
> - Need the **diagnostic ladder for non-convergence**? → [[What to Do About Convergence Problems]]
> - Need **approximate inference**? → [[Approximate Algorithms and Approximate Models]], [[Variational Inference and Pathfinder]], [[Approximations Based on Joint and Conditional Posterior Modes]]
> - Need **amortized / divide-and-conquer methods**? → [[Simulation-Based and Amortized Inference]], [[Divide-and-Conquer Algorithms]]
> - Need **engineering practice for models**? → [[Statistical Modeling as Software Development]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Typical set | [[The Typical Set and the Log Posterior Density]] | definition | — | High-dimensional mass is in a thin shell, not at the mode |
| Initialization and warmup | [[Initial Values, Adaptation, and Warmup]] | concept | [[The Typical Set and the Log Posterior Density]] | There is no universal default initial point |
| $\hat{R}$ and ESS | [[Chains, Iterations, and Effective Sample Size]] | definition | [[Initial Values, Adaptation, and Warmup]] | $\hat R < 1.01$ comfortable; $\hat R > 2$ means not mixing |
| MCSE | [[Effective Sample Size and Monte Carlo Standard Error]] | theorem | [[Chains, Iterations, and Effective Sample Size]] | Eq. 11.1–11.2; MCSE $= \text{sd}/\sqrt{\text{ESS}}$ |
| Reporting precision | [[How Many Digits to Report]] | concept | [[Effective Sample Size and Monte Carlo Standard Error]] | Report only digits MCSE supports |
| Fail-fast loop | [[Fit Fast, Fail Fast]] | concept | — | Short runs and approximations to detect problems early |
| Failure modes | [[Failure Modes and Steps Forward]] | concept | [[Fit Fast, Fail Fast]] | Figures 12.4–12.12; funnels, aliasing, multimodality, the folk theorem |
| Model changes as computational fixes | [[Modeling Ideas to Address Computing Problems]] | concept | [[Failure Modes and Steps Forward]] | Figures 12.13–12.15; reparameterization, constraints, stronger priors |
| Convergence remedies | [[What to Do About Convergence Problems]] | concept | [[Failure Modes and Steps Forward]] | The ordered diagnostic ladder |
| Approximation ladder | [[Approximate Algorithms and Approximate Models]] | concept | [[Fit Fast, Fail Fast]] | Figure 13.1; approximating the algorithm vs. the model |
| Modal approximations | [[Approximations Based on Joint and Conditional Posterior Modes]] | concept | [[Approximate Algorithms and Approximate Models]] | Laplace; the joint mode's pole at $\sigma = 0$ |
| VI and Pathfinder | [[Variational Inference and Pathfinder]] | definition | [[Approximate Algorithms and Approximate Models]] | Eq. 13.1–13.2; L-BFGS path, KL-best normal, importance resampling |
| Amortized inference | [[Simulation-Based and Amortized Inference]] | concept | [[Approximate Algorithms and Approximate Models]] | Train once, infer many times |
| Divide and conquer | [[Divide-and-Conquer Algorithms]] | concept | [[Approximate Algorithms and Approximate Models]] | Partition data, combine posteriors |
| Simpler models for computation | [[Fitting Simpler Models for Computational Purposes]] | concept | [[Approximate Algorithms and Approximate Models]] | Simplify to diagnose, then restore |
| Software practice | [[Statistical Modeling as Software Development]] | concept | — | Version control, modularity, testing, reproducibility |

## Notes

- [[The Typical Set and the Log Posterior Density]] — CONTAINS: the typical set; `lp__` as a diagnostic; Figure 11.1; Ch. 11 intro, 11.1
- [[Initial Values, Adaptation, and Warmup]] — CONTAINS: Stan's default init, when to override; Ch. 11.2–11.3
- [[Chains, Iterations, and Effective Sample Size]] — CONTAINS: $\hat{R}$, bulk/tail ESS, thresholds; Figure 11.2; Ch. 11.4
- [[Effective Sample Size and Monte Carlo Standard Error]] — CONTAINS: Eq. 11.1–11.2; Ch. 11.5
- [[How Many Digits to Report]] — CONTAINS: reporting rules; Figure 11.3; Ch. 11.6–11.8
- [[Fit Fast, Fail Fast]] — CONTAINS: the development loop; Figures 12.1–12.3; Ch. 12.1–12.2
- [[Failure Modes and Steps Forward]] — CONTAINS: the funnel, additive and multiplicative aliasing, label switching, the folk theorem; Figures 12.4–12.12; Ch. 12.3
- [[Modeling Ideas to Address Computing Problems]] — CONTAINS: reparameterization, sum-to-zero constraints, informative hyperpriors; Figures 12.13–12.15; Ch. 12.4
- [[What to Do About Convergence Problems]] — CONTAINS: the diagnostic order; Ch. 12.5–12.6
- [[Approximate Algorithms and Approximate Models]] — CONTAINS: Figure 13.1; the taxonomy; Ch. 13 intro, 13.6
- [[Approximations Based on Joint and Conditional Posterior Modes]] — CONTAINS: Laplace, marginal vs. joint mode; Ch. 13.1
- [[Variational Inference and Pathfinder]] — CONTAINS: ADVI, Pathfinder, multi-Pathfinder, Pareto $\hat{k}$ validation; Eq. 13.1–13.2; Ch. 13.2
- [[Simulation-Based and Amortized Inference]] — CONTAINS: neural posterior estimation; Ch. 13.3
- [[Divide-and-Conquer Algorithms]] — CONTAINS: data partitioning and posterior combination; Ch. 13.4
- [[Fitting Simpler Models for Computational Purposes]] — CONTAINS: simplify-to-diagnose; Ch. 13.5
- [[Statistical Modeling as Software Development]] — CONTAINS: version control, modularity, testing, reproducibility; Ch. 15

## Sources
- [[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]] — Chapters 11–13, 15, pp. 193–260

## See Also
- [[Research/Bayesian Statistics/Workflow/Simulation-Based Calibration/_Index|Simulation-Based Calibration]] — validating that the computation is correct, not just converged
- [[Research/Bayesian Statistics/Workflow/Evaluating and Comparing/_Index|Evaluating and Comparing]] — checking the model rather than the computation
- [[Sampling Problems with Latent Variables - No Vehicles in the Park]] — the aliasing and parameterization case study
- [[Challenge of Multimodality - Differential Equation for Planetary Motion]] — the multimodality and Pathfinder case study
- [[Debugging a Model - World Cup Football]] — a debugging session end to end
