---
title: "Index: Model Assessment"
tags:
  - type/index
  - source/ingested
parent: "[[Research/Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-04-09
concept_count: 5
---

# Model Assessment

> [!abstract] Routing Summary
> This folder covers tools for evaluating Bayesian models from BDA3 Part II and Statistical Rethinking Chapter 6. Contains 5 notes.
> - Need posterior predictive checks? -> [[Model Checking]]
> - Need WAIC, LOO-CV, or Bayes factors? -> [[Model Comparison]]
> - Need missing data mechanisms or survey design? -> [[Data Collection Models]]
> - Need loss functions or utility theory? -> [[Decision Analysis]]
> - Need overfitting intuition or AIC/WAIC derivation? -> [[Overfitting and Information Criteria]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Posterior predictive checks, Bayesian p-values, graphical diagnostics | [[Model Checking]] | concept | [[Probability and Bayesian Inference]], [[Bayesian Linear Regression]], [[Hierarchical Models]] | Compare replicated data to observed data |
| WAIC, LOO-CV, PSIS, Bayes factors, ELPD | [[Model Comparison]] | concept | [[Model Checking]], [[Bayesian Linear Regression]], [[Hierarchical Models]] | LOO-CV via PSIS is the recommended approach |
| Ignorability, missing data mechanisms, surveys, experiments | [[Data Collection Models]] | concept | [[Probability and Bayesian Inference]], [[Model Checking]], [[Bayesian Linear Regression]] | Ignorability determines when data collection can be ignored |
| Bayesian decision theory, loss functions, utility | [[Decision Analysis]] | concept | [[Probability and Bayesian Inference]], [[Hierarchical Models]], [[Model Comparison]], [[Overfitting and Information Criteria]] | Optimal decisions minimize expected posterior loss |
| Bias-variance tradeoff, KL divergence, AIC/DIC/WAIC, regularizing priors | [[Overfitting and Information Criteria]] | concept | [[Linear Models in Statistical Rethinking]], [[Model Comparison]], [[Bayesian Linear Regression]] | Regularizing priors reduce overfitting naturally |

## Notes
- [[Model Checking]] — CONTAINS: Posterior predictive checks, Bayesian p-values, graphical diagnostics, test quantities
- [[Model Comparison]] — CONTAINS: WAIC, LOO-CV, PSIS, Bayes factors, ELPD, stacking weights
- [[Data Collection Models]] — CONTAINS: Ignorability conditions, MCAR/MAR/MNAR, survey design, experimental design in Bayesian framework
- [[Decision Analysis]] — CONTAINS: Bayesian decision theory, loss functions, utility functions, optimal actions
- [[Overfitting and Information Criteria]] — CONTAINS: Bias-variance tradeoff, KL divergence, AIC/DIC/WAIC derivations, regularizing priors as overfitting solution

## Sources

- BDA3 — Bayesian Data Analysis, 3rd Edition (Gelman et al.), Part II (pp. 139-258)
- StatRethink-Bayes — Statistical Rethinking (McElreath, 2015), Chapter 6
