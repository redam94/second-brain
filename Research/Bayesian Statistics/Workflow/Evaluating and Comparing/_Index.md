---
title: "Index: Evaluating and Comparing"
tags:
  - type/index
  - source/ingested
parent: "[[Workflow/_Index|Bayesian Workflow]]"
date_updated: 2026-08-18
concept_count: 16
---

# Evaluating and Comparing

> [!abstract] Routing Summary
> Chapters 8–10 of [[Bayesian Workflow Book - Overview|Gelman, Vehtari & McElreath (2026)]]: checking a fitted model, measuring sensitivity, comparing models by predictive performance, expanding rather than selecting, and the scientific context that makes iterated analysis defensible. 16 notes.
> - Need to **look at a fit you cannot plot directly**? → [[Visualizing High-Dimensional Inference]]
> - Need **graphical checks against the data**? → [[Posterior Predictive Checking]]
> - Need **PSIS-LOO, Pareto $\hat{k}$, LOO-PIT-ECDF, K-fold**? → [[Cross Validation Checking]]
> - Need to find **which observations drive the fit**? → [[Influence of Individual Data Points]]
> - Need **prior sensitivity / power-scaling**? → [[Influence of Likelihood and Prior]]
> - Need the **space of models** a workflow moves through? → [[Topology of Models]]
> - Need to **compare models numerically**? → [[Model Selection Using Predictive Performance]]
> - Need to know **when selection overfits**? → [[Model Selection and Overfitting]]
> - Need the **alternative to selecting one model**? → [[Stacking and Predictive Model Averaging]]
> - Need **how to expand a model safely**? → [[Model Expansion - Predictive Consistency and Coherence]]
> - Need the **replication-crisis framing**? → [[The Replication Crisis and Multiple Levels of Variation]], [[Simulated-Data Experimentation as Virtual Replication]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Visualizing a high-dimensional posterior | [[Visualizing High-Dimensional Inference]] | concept | — | Marginals mislead under collinearity; look at joints and derived quantities |
| Posterior predictive checking | [[Posterior Predictive Checking]] | concept | [[Prior Predictive Checking]] | Compare $y^{\text{rep}}$ to $y$ graphically, not by $p$-value |
| Cross validation | [[Cross Validation Checking]] | theorem | [[Posterior Predictive Checking]] | PSIS-LOO with Pareto $\hat{k}$; $\hat k > 0.7$ flags failure |
| Pointwise influence | [[Influence of Individual Data Points]] | concept | [[Cross Validation Checking]] | Figure 8.10; which points move the fit |
| Prior/likelihood sensitivity | [[Influence of Likelihood and Prior]] | concept | [[Cross Validation Checking]] | Power-scaling with `priorsense`; Figures 8.11–8.13 |
| Big data need big models | [[Big Data Need Big Models]] | concept | — | More data exposes more model misfit, not less |
| Model topology | [[Topology of Models]] | definition | [[Big Data Need Big Models]] | Models exist in relation to each other |
| Visual model comparison | [[Comparing Models Visually]] | concept | [[Topology of Models]] | Figures 9.1, 9.2 |
| Predictive model comparison | [[Model Selection Using Predictive Performance]] | theorem | [[Cross Validation Checking]] | Eq. 9.1–9.5; elpd differences and their standard errors |
| Selection overfitting | [[Model Selection and Overfitting]] | concept | [[Model Selection Using Predictive Performance]] | The search itself overfits noisy CV estimates |
| Stacking | [[Stacking and Predictive Model Averaging]] | definition | [[Model Selection Using Predictive Performance]] | Weight by predictive performance, not posterior probability |
| Predictive consistency | [[Model Expansion - Predictive Consistency and Coherence]] | definition | [[Topology of Models]] | Expansion should not inflate the prior predictive |
| Statistical vs. scientific inference | [[Statistical and Scientific Inference]] | concept | — | Figures 10.1, 10.2 |
| Tooling | [[Software Assisted Workflow]] | concept | [[Statistical and Scientific Inference]] | What automation should and should not do |
| Replication | [[The Replication Crisis and Multiple Levels of Variation]] | concept | [[Statistical and Scientific Inference]] | Variation exists at several levels; most designs measure one |
| Virtual replication | [[Simulated-Data Experimentation as Virtual Replication]] | concept | [[The Replication Crisis and Multiple Levels of Variation]] | Figures 10.3–10.6; the answer to forking-paths objections |

## Notes

- [[Visualizing High-Dimensional Inference]] — CONTAINS: Figures 8.1–8.4; Ch. 8 intro, 8.1
- [[Posterior Predictive Checking]] — CONTAINS: Figures 8.5–8.8; the graphical repertoire; Ch. 8.2
- [[Cross Validation Checking]] — CONTAINS: PSIS-LOO, Pareto $\hat{k}$ thresholds, `p_loo`, moment matching, K-fold, LOO-PIT-ECDF; Figure 8.9; Ch. 8.3
- [[Influence of Individual Data Points]] — CONTAINS: Figure 8.10; Ch. 8.4
- [[Influence of Likelihood and Prior]] — CONTAINS: power-scaling sensitivity, `priorsense`; Figures 8.11–8.13; Ch. 8.5–8.6
- [[Big Data Need Big Models]] — CONTAINS: the argument that scale demands structure; Ch. 9 intro, 9.1
- [[Topology of Models]] — CONTAINS: the model-space framing; Ch. 9.2
- [[Comparing Models Visually]] — CONTAINS: Figures 9.1, 9.2; Ch. 9.3
- [[Model Selection Using Predictive Performance]] — CONTAINS: Eq. 9.1–9.5; elpd, `elpd_diff`, `se_diff`; Jacobian corrections; Ch. 9.4
- [[Model Selection and Overfitting]] — CONTAINS: why search overfits CV noise; Ch. 9.5
- [[Stacking and Predictive Model Averaging]] — CONTAINS: the stacking weights and when to prefer them; Ch. 9.6
- [[Model Expansion - Predictive Consistency and Coherence]] — CONTAINS: predictive consistency, coherence under expansion; Ch. 9.7–9.8
- [[Statistical and Scientific Inference]] — CONTAINS: Figures 10.1, 10.2; Ch. 10 intro, 10.1–10.2
- [[Software Assisted Workflow]] — CONTAINS: what tooling should do; Ch. 10.3
- [[The Replication Crisis and Multiple Levels of Variation]] — CONTAINS: the multi-level variation argument; Ch. 10.4
- [[Simulated-Data Experimentation as Virtual Replication]] — CONTAINS: Figures 10.3–10.6; Ch. 10.5–10.6

## Sources
- [[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]] — Chapters 8–10, pp. 137–190

## See Also
- [[Building Models/_Index|Building Models]] — what is being evaluated
- [[Computational Workflow/_Index|Computational Workflow]] — checking the computation rather than the model
- [[LOO Model Checking and Comparison - Roaches]] — the case study for Chapter 8–9's CV material
- [[Predictive Model Checking and Comparison - Clinical Trial]] — predictive comparison in practice
- [[Posterior Predictive Checking - Stochastic Learning in Dogs]] — graphical checks in practice
