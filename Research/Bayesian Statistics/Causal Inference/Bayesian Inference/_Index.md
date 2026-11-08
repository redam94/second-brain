---
title: "Index: Bayesian Causal Inference Methods"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Causal Inference]]"
date_updated: 2026-04-10
concept_count: 3
---

# Bayesian Causal Inference Methods

> [!abstract] Routing Summary
> This folder covers the Bayesian approach to causal inference: the likelihood factorization, prior independence assumption, outcome model specification, and the role of the propensity score. Contains 3 notes.
> - Need the core Bayesian CI factorization, prior independence (Assumption 3.2), SATE vs. MATE? → [[General Structure of Bayesian CI]]
> - Need BART, Gaussian Process, BCF, regularization-induced confounding? → [[Bayesian Outcome Models]]
> - Need the three strategies for the propensity score in Bayesian analysis? → [[Propensity Score in Bayesian CI]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Full-data likelihood factorization | [[General Structure of Bayesian CI]] | definition | Potential Outcomes Framework | Three terms: assignment, outcome, covariate |
| Prior independence (Assumption 3.2) | [[General Structure of Bayesian CI]] | definition | — | $p(\theta_Z,\theta_Y,\theta_X)$ factorizes; propensity score ignorable |
| Prior dogmatism | [[General Structure of Bayesian CI]] | concept | Prior independence | In high-$p$, Assumption 3.2 acts as strongly informative prior |
| Bayesian identifiability | [[General Structure of Bayesian CI]] | concept | — | All parameters have posteriors; transparent parametrization needed |
| BART outcome model | [[Bayesian Outcome Models]] | definition | General Structure | S/T-learner; outperforms random forests empirically |
| Bayesian Causal Forest (BCF) | [[Bayesian Outcome Models]] | definition | BART | Separates prognostic + treatment effect functions |
| Regularization-induced confounding | [[Bayesian Outcome Models]] | concept | Prior independence | Standard regularization priors bias causal estimates in high-$p$ |
| Propensity score as covariate | [[Propensity Score in Bayesian CI]] | concept | General Structure | Double robustness; BCF strategy |
| Dependent priors | [[Propensity Score in Bayesian CI]] | concept | General Structure | Joint prior links $\theta_Z$ and $\theta_Y$ |
| Posterior predictive p-value | [[Propensity Score in Bayesian CI]] | concept | General Structure | Plug posterior draws into doubly-robust estimator |

## Notes

- [[General Structure of Bayesian CI]] — CONTAINS: full-data likelihood factorization (definition), prior independence Assumption 3.2 (definition), propensity score ignorability, Bayesian identifiability, data augmentation for SATE, Example 3.1 (bivariate normal covariate adjustment), Bayesian bootstrap note
- [[Bayesian Outcome Models]] — CONTAINS: linear/BART/GP/BCF outcome model definitions, Example 4.1 (priors and overlap for CATE estimation), regularization-induced confounding warning, high-dimensional challenges
- [[Propensity Score in Bayesian CI]] — CONTAINS: three strategies (covariate, dependent priors, PPP), feedback problem explanation, Hájek IPW connection, summary comparison table

## Sources

- [[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]] — §3–5, pp. 5–13

## See Also
- [[Foundations/_Index|Foundations]] — prerequisite potential outcomes framework
- [[Sensitivity and Complex Mechanisms/_Index|Sensitivity and Complex Mechanisms]] — extensions to non-ideal settings
- [[Bayesian Propensity Score Weighting]] — existing vault note on Bayesian IPW (Heiss blog)
- [[Nonparametric Causal Inference]] — existing vault note on BART/non-parametric causal methods
