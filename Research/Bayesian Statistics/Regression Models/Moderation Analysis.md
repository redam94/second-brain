---
title: "Bayesian Moderation Analysis"
tags:
  - source/ingested
  - topic/regression
  - topic/interaction-effects
  - topic/moderation
  - method/pymc
  - type/concept
  - doc/tutorial
aliases:
  - Moderation Analysis
  - Interaction Effects Bayesian
date_ingested: 2026-04-09
doc_type: concept
source_location: "raw/Bayesian moderation analysis"
depends_on:
  - "[[Spurious Association and Confounds]]"
  - "[[Bayesian Linear Regression]]"
  - "[[Generalized Linear Models]]"
used_by:
  - "[[Nonparametric Causal Inference]]"
---

# Bayesian Moderation Analysis

> [!abstract] Summary
> Moderation analysis tests whether the relationship between a predictor $x$ and outcome $y$ changes as a function of a third variable $m$ (the moderator). It is implemented as multiple regression with an interaction term. The Bayesian approach yields a posterior over the moderation coefficient $\beta_2$, enabling probabilistic statements about the moderation effect.

## What is Moderation?

A **moderator** $m$ changes the *slope* of $x$ on $y$ — not the mean level of $y$ (that would be a main effect). Schematically:

```
m ──→ [x → y]   (m moderates the x-y relationship)
```

> [!warning] Moderation vs. Mediation
> - **Moderation**: $m$ changes the *strength* of the $x \to y$ relationship. No causal path $x \to m \to y$ implied.
> - **Mediation**: $x$ affects $y$ (partly) *through* $m$. Requires causal DAG reasoning.
>
> See the PyMC mediation analysis example for contrast.

## The Model

$$y_i \sim \mathcal{N}(\mu_i, \sigma^2)$$
$$\mu_i = \beta_0 + \beta_1 x_i + \beta_2 (x_i \cdot m_i) + \beta_3 m_i$$

**Interpretation of parameters:**

| Parameter | Interpretation |
|-----------|---------------|
| $\beta_0$ | Intercept (value of $y$ when $x=0$, $m=0$) |
| $\beta_1$ | Effect of $x$ on $y$ when $m=0$ |
| $\beta_2$ | **Moderation coefficient**: how much the slope $\beta_1$ changes per unit of $m$ |
| $\beta_3$ | Main effect of $m$ on $y$ (controlling for $x$) |
| $\sigma$ | Residual SD |

The total effect of $x$ on $y$ at a given level of moderator $m$ is:
$$f(m) = \beta_1 + \beta_2 \cdot m$$

## PyMC Implementation

```python
with pm.Model() as model:
    x = pm.ConstantData("x", training_hours)
    m = pm.ConstantData("m", age)

    β0 = pm.Normal("β0", mu=0, sigma=10)
    β1 = pm.Normal("β1", mu=0, sigma=10)
    β2 = pm.Normal("β2", mu=0, sigma=10)
    β3 = pm.Normal("β3", mu=0, sigma=10)
    σ  = pm.HalfCauchy("σ", 1)

    mu = β0 + β1*x + β2*x*m + β3*m
    pm.Normal("y", mu=mu, sigma=σ, observed=muscle_pct)
```

## Visualisation: Spotlight Graph

The spotlight graph plots $f(m) = \beta_1 + \beta_2 \cdot m$ as a function of $m$, at selected percentiles of the moderator. This directly visualises how the slope changes:

- If $\beta_2 < 0$: slope decreases as $m$ increases (training less effective with age)
- If $\beta_2 \approx 0$: no moderation — the $x$-$y$ relationship is constant across $m$

```python
# Posterior estimate of the moderation effect
xi = np.linspace(min(age), max(age), 20)
rate = posterior.β1 + posterior.β2 * xi  # how β1 varies with m
```

## Multicollinearity and the Interaction Term

Including $x \cdot m$ alongside $x$ and $m$ introduces **multicollinearity** — the interaction term is correlated with its component variables. Options:

- **Mean-centering** $x$ and $m$ before computing the product reduces multicollinearity
- Despite common concern, multicollinearity in the interaction term does not bias estimates of the moderation effect $\beta_2$ — it only increases uncertainty (widens credible intervals)
- McClelland et al. (2017): multicollinearity is a "red herring in the search for moderator variables"

## Applied Example: Training × Age on Muscle Mass

- $x$ = weekly training hours
- $m$ = age (moderator)
- $y$ = muscle percentage

Finding: $\beta_2 < 0$ (credibly), meaning training becomes less effective at building muscle mass in older individuals.

## Connections

- [[Spurious Association and Confounds]] — interaction effects and multivariate regression
- [[Bayesian Linear Regression]] — priors as regularization for correlated predictors
- [[Generalized Linear Models]] — moderation extends naturally to logistic/Poisson regression
- [[Bayesian Non-parametric Causal Inference]] — non-parametric alternative when the interaction form is unknown

## Source

- [[raw/Bayesian moderation analysis]] — PyMC example by Benjamin T. Vincent (2021–2023)
- Hayes (2017): *Introduction to Mediation, Moderation, and Conditional Process Analysis*
