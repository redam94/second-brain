---
title: "Three Steps of Bayesian Data Analysis"
aliases:
  - "three steps"
  - "Bayesian workflow"
tags:
  - concept/framework
  - topic/bayesian-statistics
  - topic/methodology
created: 2026-04-09
---

# Three Steps of Bayesian Data Analysis

## The Framework

> [!abstract] The Three Steps (BDA3 Section 1.1)
>
> 1. **Set up a full probability model** -- a joint probability distribution $p(\theta, y)$ for all observable and unobservable quantities, consistent with scientific knowledge and the data collection process.
>
> 2. **Condition on observed data** -- compute the [[Posterior Distribution|posterior distribution]] $p(\theta|y)$ via [[Bayes' Theorem]].
>
> 3. **Evaluate the model fit** -- assess whether the model fits the data, whether conclusions are reasonable, and how sensitive results are to modeling assumptions. If needed, alter or expand the model and repeat.

## The Iterative Nature

The three steps form an **iterative cycle**:

```
Step 1: Model → Step 2: Posterior → Step 3: Check
    ↑                                      |
    └──────── Revise if needed ←───────────┘
```

This iterative process is a key theme throughout BDA3 and modern Bayesian practice.

## Step Details

### Step 1: Model Specification
- Requires choosing a [[Prior Distribution]] and a sampling distribution (likelihood)
- This remains a major practical challenge
- See [[BDA3 - Ch02 - Single-Parameter Models]] through [[BDA3 - Ch05 - Hierarchical Models]] for model families

### Step 2: Posterior Computation
- Analytical solutions exist for conjugate models
- Computational methods: [[MCMC]], [[Hamiltonian Monte Carlo]], variational inference
- See [[BDA3 - Ch10 - Introduction to Bayesian Computation]] onward

### Step 3: Model Evaluation
- [[Posterior Predictive Checking]]
- Cross-validation and information criteria
- Sensitivity analysis
- See [[BDA3 - Ch06 - Model Checking]] and [[BDA3 - Ch07 - Evaluating, Comparing, and Expanding Models]]

## References

- [[BDA3 - S1.1 - Three Steps of Bayesian Data Analysis]] -- original presentation
