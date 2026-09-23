---
title: "Index: Building Models"
tags:
  - type/index
  - source/ingested
parent: "[[Research/Bayesian Statistics/Workflow/_Index|Bayesian Workflow]]"
date_updated: 2026-08-18
concept_count: 19
---

# Building Models

> [!abstract] Routing Summary
> Part 2 (Chapters 5–7) of [[Bayesian Workflow Book - Overview|Gelman, Vehtari & McElreath (2026)]]: choosing and specifying a model, every prior-choice rule the book states, simulation as a modeling tool, and the extension from inference to generalization, causal inference, and decision. 19 notes.
> - Need **where to start**? → [[Choosing an Initial Model]]
> - Need to translate **subject-matter assumptions into a model**? → [[Relating a Model to Subject-Matter Assumptions]]
> - Need the **formal specification** of a Bayesian model? → [[Expressing a Bayesian Model with Probability Distributions]]
> - Need **why the data model is more than a likelihood**? → [[A Data Model Is Not Just a Likelihood]]
> - Need **prior choice rules**? → [[Prior Distributions]] (general), [[Constructing Priors for Effect Sizes]] (scaling), [[Joint Priors and Covariance Matrices]] (LKJ, horseshoe, R2D2)
> - Need to **check a prior before seeing data**? → [[Prior Predictive Checking]]
> - Need **what happens when prior and likelihood disagree**? → [[Tail Behavior and Prior-Likelihood Conflict]]
> - Need **simulation as a modeling tool**? → [[Simulation to Express Uncertainty]], [[Designing Simulated-Data Experiments]]
> - Need **generalization to a new population**? → [[Poststratification]]
> - Need **causal inference**? → [[Causal Inference as Generalization]]
> - Need **decision analysis**? → [[From Inference to Decision]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Where to start a model | [[Choosing an Initial Model]] | concept | [[Four Modeling Scenarios]] | Start simple enough to fit, complex enough to be relevant |
| Assumptions → model | [[Relating a Model to Subject-Matter Assumptions]] | concept | [[Choosing an Initial Model]] | Model structure should encode substantive claims |
| Formal specification | [[Expressing a Bayesian Model with Probability Distributions]] | definition | — | Joint $p(y,\theta) = p(y\mid\theta)p(\theta)$ and its decomposition |
| Data model ≠ likelihood | [[A Data Model Is Not Just a Likelihood]] | concept | [[Expressing a Bayesian Model with Probability Distributions]] | The same $p(y\mid\theta)$ plays two roles |
| Generative vs. partially generative | [[Generative and Partially Generative Models]] | definition | [[A Data Model Is Not Just a Likelihood]] | Only fully generative models support prior predictive simulation |
| Prior choice | [[Prior Distributions]] | concept | [[Expressing a Bayesian Model with Probability Distributions]] | Weakly informative as default; the flat prior is not neutral |
| Effect-size scaling | [[Constructing Priors for Effect Sizes]] | concept | [[Prior Distributions]] | Standardize, then place the prior on an interpretable scale |
| Joint priors | [[Joint Priors and Covariance Matrices]] | definition | [[Prior Distributions]] | LKJ for correlation matrices; horseshoe and R2D2 for coefficient vectors |
| Data model + prior together | [[Specifying the Data Model and the Prior]] | concept | [[Prior Distributions]] | The pair, not either alone, defines the model |
| Modeled vs. unmodeled data | [[Modeled and Unmodeled Data]] | definition | [[Expressing a Bayesian Model with Probability Distributions]] | What you condition on vs. what you model |
| Prior predictive checking | [[Prior Predictive Checking]] | concept | [[Generative and Partially Generative Models]] | Simulate from the prior; look at the implied data |
| Prior-likelihood conflict | [[Tail Behavior and Prior-Likelihood Conflict]] | theorem | [[Prior Predictive Checking]] | Tail behavior determines which source wins under conflict |
| Simulation for uncertainty | [[Simulation to Express Uncertainty]] | concept | — | Propagate draws rather than combining standard errors |
| Point estimates | [[Point Estimates and Uncertainties]] | concept | [[Simulation to Express Uncertainty]] | When a summary is enough and when it misleads |
| Simulated-data experiments | [[Designing Simulated-Data Experiments]] | concept | [[Simulation to Express Uncertainty]] | Design the experiment, not just the simulation |
| Full-pipeline simulation | [[Simulating an Underlying Process, Data Collection, and Inference]] | example | [[Designing Simulated-Data Experiments]] | Simulate process, collection, and inference together |
| Poststratification | [[Poststratification]] | definition | [[Simulation to Express Uncertainty]] | MRP: model at the cell level, reweight to the population |
| Causal inference | [[Causal Inference as Generalization]] | concept | [[Poststratification]] | SATE/PATE as prediction under counterfactual predictors |
| Decision | [[From Inference to Decision]] | concept | [[Causal Inference as Generalization]] | Expected utility averaged over the posterior |

## Notes

- [[Choosing an Initial Model]] — CONTAINS: the starting-point criteria; Figure 5.1; Ch. 5 intro, 5.1
- [[Relating a Model to Subject-Matter Assumptions]] — CONTAINS: Figure 5.2; Ch. 5.2
- [[Expressing a Bayesian Model with Probability Distributions]] — CONTAINS: the joint-distribution formalism; Ch. 5.3
- [[A Data Model Is Not Just a Likelihood]] — CONTAINS: the two readings of $p(y\mid\theta)$; Ch. 5.4
- [[Generative and Partially Generative Models]] — CONTAINS: the definition and what each supports; Ch. 5.5
- [[Prior Distributions]] — CONTAINS: weakly informative priors, the flat-prior critique, prior scaling rules; Ch. 5.6
- [[Constructing Priors for Effect Sizes]] — CONTAINS: Figures 5.3, 5.4; standardization conventions; Ch. 5.6
- [[Joint Priors and Covariance Matrices]] — CONTAINS: Eq. 5.3; LKJ, regularized horseshoe, R2D2; Ch. 5.6
- [[Specifying the Data Model and the Prior]] — CONTAINS: the joint specification workflow; Ch. 5.7
- [[Modeled and Unmodeled Data]] — CONTAINS: the distinction in Stan terms; Ch. 5.8
- [[Prior Predictive Checking]] — CONTAINS: Figures 5.5–5.8; the full procedure; Ch. 5.9
- [[Tail Behavior and Prior-Likelihood Conflict]] — CONTAINS: Figures 5.9–5.13; which tail dominates; Ch. 5.10
- [[Simulation to Express Uncertainty]] — CONTAINS: Figure 6.1; Ch. 6.1
- [[Point Estimates and Uncertainties]] — CONTAINS: Figure 6.2; Ch. 6.2
- [[Designing Simulated-Data Experiments]] — CONTAINS: Figure 6.3; design principles for fake-data experiments; Ch. 6.3
- [[Simulating an Underlying Process, Data Collection, and Inference]] — CONTAINS: Figures 6.4–6.6; Ch. 6.4–6.5
- [[Poststratification]] — CONTAINS: Eq. 7.1–7.2; Figures 7.1–7.6; MRP; Ch. 7 intro, 7.1
- [[Causal Inference as Generalization]] — CONTAINS: Figures 7.7, 7.8; SATE and PATE; Ch. 7.2
- [[From Inference to Decision]] — CONTAINS: Figure 7.9; expected utility; Ch. 7.3–7.4

## Sources
- Gelman Vehtari McElreath 2026 - Bayesian Workflow (book) — Chapters 5–7, pp. 63–134

## See Also
- [[Foundations/_Index|Foundations]] — the framing these chapters build on
- [[Research/Bayesian Statistics/Workflow/Evaluating and Comparing/_Index|Evaluating and Comparing]] — what to do once the model is fit
- [[Prior Specification for Regression Models - Sleep Study]] — the case study for Chapter 5's prior material
- [[Models for Regression Coefficients - Student Grades]] — R2D2 and horseshoe priors in practice
- [[Using a Fitted Model for Decision Analysis - Classification Competition]] — the case study for Chapter 7's decision material
