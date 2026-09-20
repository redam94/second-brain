---
title: "Bayesian Non-parametric Causal Inference"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/nonparametric
  - method/pymc
  - method/bart
  - type/concept
  - doc/tutorial
aliases:
  - Bayesian BART Causal
  - Propensity Score Bayesian
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Advanced Models"
source: "[[raw/Bayesian Non-parametric Causal Inference]]"
doc_type: concept
source_location: "raw/Bayesian Non-parametric Causal Inference"
depends_on:
  - "[[Nonparametric Models Overview]]"
  - "[[Counterfactual Inference]]"
  - "[[Data Collection Models]]"
  - "[[Bayesian Linear Regression]]"
used_by:
  - "[[Moderation Analysis]]"
---

# Bayesian Non-parametric Causal Inference

> [!abstract] Summary
> Non-parametric Bayesian methods (especially BART) offer flexible causal inference without strong functional form assumptions. They combine propensity score models with outcome models to estimate average treatment effects (ATE) and average treatment effects on the treated (ATT).

## The Problem with Parametric Causal Models

Standard causal inference approaches (e.g., regression adjustment) assume a particular functional form for the relationship between confounders, treatment, and outcome. Misspecification of this form leads to biased treatment effect estimates. Non-parametric approaches avoid this by letting the data determine the functional form.

## Propensity Scores

The **propensity score** $e(X) = P(T=1 \mid X)$ is the probability of receiving treatment given observed covariates $X$. Key results:

- **Balancing property**: conditioning on $e(X)$ balances the covariate distributions between treatment and control groups
- **Rosenbaum-Rubin theorem**: if $(Y_0, Y_1) \perp T \mid X$, then $(Y_0, Y_1) \perp T \mid e(X)$

Practically, the propensity score reduces a high-dimensional covariate adjustment problem to a single dimension.

> [!warning] Strong ignorability assumption
> Non-parametric methods still require the **no unmeasured confounders** (strong ignorability) assumption: all variables affecting both treatment and outcome must be measured and included in $X$.

## BART for Causal Inference

**Bayesian Additive Regression Trees (BART)** fit the outcome model as a sum of shallow decision trees with Bayesian regularization priors. In PyMC, this is implemented via `pymc-bart`.

### Two-Model Approach

```python
import pymc_bart as pmb

# Step 1: Model the outcome under treatment/control
with pm.Model() as outcome_model:
    mu = pmb.BART("mu", X=X_with_treatment, Y=y, m=50)
    sigma = pm.HalfNormal("sigma", 1)
    pm.Normal("obs", mu=mu, sigma=sigma, observed=y)

# Step 2: Predict counterfactuals
# Predict Y(1) for all units, then Y(0) for all units
X_treat = X.copy(); X_treat["T"] = 1
X_ctrl  = X.copy(); X_ctrl["T"]  = 0
```

### Treatment Effect Estimation

$$\widehat{\text{ATE}} = \frac{1}{n}\sum_{i=1}^n \left[\hat{Y}(X_i, T=1) - \hat{Y}(X_i, T=0)\right]$$

$$\widehat{\text{ATT}} = \frac{1}{\sum T_i}\sum_{i: T_i=1} \left[\hat{Y}(X_i, T=1) - \hat{Y}(X_i, T=0)\right]$$

Because BART is Bayesian, these estimates come with full posterior distributions.

## Comparison with Parametric Alternatives

| Method | Functional Form | Uncertainty | Confounders |
|--------|----------------|-------------|-------------|
| OLS regression adjustment | Linear | Frequentist CIs | Full covariate control |
| Propensity score matching | None for outcome | Limited | Balances covariates |
| BART (non-parametric Bayes) | Flexible trees | Full posterior | Full covariate control |
| [[Differences-in-Differences|DiD]] | Linear trends | Posterior | Parallel trends assumption |

## Connections

- Compare with [[Differences-in-Differences]] (quasi-experimental, requires parallel trends)
- Compare with [[Counterfactual Inference]] (linear model for excess deaths)
- Non-parametric priors: see [[Nonparametric Models Overview]] (Dirichlet processes, GPs)
- Related to [[The Experimental Ideal]] and [[The Selection Problem]] in econometrics
- Compare with [[Bayesian Inverse Probability Weighting]] — IPW-based Bayesian ATE using Liao-Zigler; BART here is fully Bayesian alternative
- Design-stage balance: [[Propensity Score Matching - Overview]] — frequentist matching before outcome modeling
- Causal structure: [[General Structure of Bayesian CI]] — formal Bayesian factorization framework this fits within

## Source

- [[raw/Bayesian Non-parametric Causal Inference]] — PyMC example: BART + propensity scores for ATE/ATT estimation
