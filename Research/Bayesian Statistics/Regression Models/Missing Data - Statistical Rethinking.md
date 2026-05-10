---
title: "Missing Data — Statistical Rethinking (Lecture 18)"
tags:
  - source/ingested
  - topic/missing-data
  - topic/imputation
  - method/pymc
  - source/statistical-rethinking
  - type/concept
  - doc/tutorial
aliases:
  - Missing Data SR
  - Bayesian Imputation SR
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Regression Models"
doc_type: concept
source: "[[raw/Missing Data.md]]"
source_location: "PyMC tutorial: Missing Data (Statistical Rethinking Lecture 18)"
depends_on:
  - "[[Missing Data Models]]"
  - "[[Spurious Association and Confounds]]"
  - "[[Data Collection Models]]"
  - "[[Counterfactual Inference]]"
used_by:
  - "[[Social Network Models]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
---

# Missing Data — Statistical Rethinking (Lecture 18)

> [!abstract] Summary
> Richard McElreath's Statistical Rethinking treatment of missing data, framed through the lens of causal DAGs. The key insight: whether and how to handle missingness depends on the *mechanism* generating the missing values, which is encoded in the DAG.

## Three Mechanisms of Missingness

The taxonomy (from Rubin 1976) determines what analyses are valid:

| Mechanism | Formal Definition | Implication |
|-----------|------------------|-------------|
| **MCAR** — Missing Completely At Random | $P(R \mid X, Y) = P(R)$ | Missingness unrelated to any data; complete-case analysis unbiased |
| **MAR** — Missing At Random | $P(R \mid X, Y) = P(R \mid X_\text{obs})$ | Missingness depends only on observed data; imputation valid |
| **MNAR** — Missing Not At Random | $P(R \mid X, Y)$ depends on $Y_\text{miss}$ | Missingness depends on the missing values themselves; selection model needed |

> [!warning] DAG diagnosis
> McElreath emphasises drawing a causal DAG with the **missingness indicator $R$** as a node. Paths from $R$ to $Y$ determine the mechanism. Conditioning on $R=1$ (complete cases) opens collider paths that can induce bias even under MAR.

## The Bayesian Approach to Imputation

Treat missing values as **latent variables** and place a prior on them, jointly with the model parameters. The likelihood marginalises over the missing values:

$$P(Y_\text{obs}, \theta) = \int P(Y_\text{obs}, Y_\text{miss}, \theta)\, dY_\text{miss}$$

In PyMC, missing values in a pandas array are automatically handled via `pm.MutableData` with `NaN` entries or explicit `pm.Normal.dist()` imputation priors.

```python
# Example: impute missing predictor
with pm.Model() as model:
    # Prior over missing values
    x_imputed = pm.Normal("x_imputed", mu=0, sigma=1,
                          shape=n_missing)
    x = pt.set_subtensor(x_obs[missing_idx], x_imputed)

    # Rest of model uses x (now complete)
    beta = pm.Normal("beta", 0, 1)
    mu = alpha + beta * x
    pm.Normal("y", mu=mu, sigma=sigma, observed=y_obs)
```

## Dog Eating Homework: Illustrative Example

McElreath uses the "dogs eat homework" metaphor: if a student's grade predicts whether their homework is missing (the dog eats the homework of students who do poorly), then the missingness is **MNAR** with respect to the true homework quality. Complete-case analysis would overestimate average quality.

The DAG makes this explicit:

```
Grade → R (missing indicator) → [missing homework]
Grade → Homework quality
```

Conditioning on observed homework ($R=0$) blocks the path through $R$ but induces selection bias on `Grade`.

## Key Takeaways

1. **Always draw the DAG** with $R$ included before choosing a missing data strategy
2. **MCAR** is rare in practice; assuming it when MAR/MNAR holds introduces bias
3. **Bayesian imputation** is coherent: uncertainty in imputed values propagates through to parameter posteriors
4. **MNAR** requires modelling the missingness mechanism explicitly (a selection model)

## Connections

- Builds on [[Missing Data Models]] (BDA3 / Rubin's rules for multiple imputation)
- Causal DAG reasoning: see [[Spurious Association and Confounds]] and [[Data Collection Models]]
- [[Counterfactual Inference]] also uses causal reasoning about unobservable quantities

## Source

- [[raw/Missing Data]] — PyMC port of Statistical Rethinking 2023, Lecture 18 (McElreath)
- Video: [Lecture 18 — Missing Data](https://youtu.be/Oeq6GChHOzc)
