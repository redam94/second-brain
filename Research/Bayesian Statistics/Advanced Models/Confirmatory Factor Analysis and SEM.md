---
title: "Confirmatory Factor Analysis and Structural Equation Models"
tags:
  - source/ingested
  - topic/factor-analysis
  - topic/psychometrics
  - topic/latent-variables
  - method/pymc
  - type/concept
  - doc/tutorial
aliases:
  - CFA
  - SEM
  - Structural Equation Model
date_ingested: 2026-04-09
folder: "Bayesian Statistics/Advanced Models"
doc_type: concept
source: "[[raw/Confirmatory Factor Analysis and Structural Equation Models in Psychometrics.md]]"
source_location: "raw/Confirmatory Factor Analysis and Structural Equation Models in Psychometrics"
depends_on:
  - "[[Factor Analysis and PPCA]]"
  - "[[Hierarchical Models]]"
  - "[[Spurious Association and Confounds]]"
  - "[[Nonparametric Models Overview]]"
used_by:
  - "[[Social Network Models]]"
---

# Confirmatory Factor Analysis and Structural Equation Models

> [!abstract] Summary
> CFA and SEM are latent variable models developed for psychometrics. CFA posits that observed survey indicators are caused by unobserved (latent) constructs; SEM adds structural (regression) paths between the latent constructs. Both are implemented as constrained Bayesian models in PyMC.

## Motivation: Measuring Latent Constructs

Psychological constructs (intelligence, anxiety, political attitudes) are not directly observable. Instead, researchers design survey items that *indicate* the latent construct. CFA formalises this:

- **Indicators** $y_1, \ldots, y_p$ are observed
- **Latent factor(s)** $\eta$ are unobserved
- **Factor loadings** $\lambda$ connect indicators to factors

> [!quote] Pearl (motivation)
> "The notions of relevance and dependence are far more basic to human reasoning than the numerical values attached to probability judgments — the language used for representing probabilistic information should allow assertions about dependency relationships to be expressed qualitatively, directly, and explicitly."

## CFA: The Measurement Model

For a single factor:
$$y_i = \mu_i + \lambda_i \eta + \varepsilon_i, \quad \varepsilon_i \sim N(0, \psi_i^2)$$

- $\mu_i$: item intercept (mean when $\eta = 0$)
- $\lambda_i$: **factor loading** (sensitivity of item $i$ to the latent factor)
- $\eta \sim N(0, 1)$: standardised latent factor
- $\psi_i^2$: unique (item-specific) variance

**Identifiability constraints** are essential:
- Fix one loading to 1.0 (marker variable), or standardise the factor $\eta \sim N(0,1)$
- Without constraints, the model is not identified (rotation problem, as in [[Factor Analysis and PPCA]])

### PyMC implementation sketch

```python
with pm.Model() as cfa_model:
    eta = pm.Normal("eta", 0, 1, shape=n)          # latent factor scores

    # Loadings (first one fixed to 1 for identification)
    lam = pm.Normal("lambda", 0, 1, shape=p - 1)
    loadings = pt.concatenate([[1.0], lam])

    mu_items = pm.Normal("mu", 0, 5, shape=p)
    psi = pm.HalfNormal("psi", 1, shape=p)         # unique variances

    y_hat = mu_items + loadings * eta[:, None]
    pm.Normal("y", mu=y_hat, sigma=psi, observed=Y)
```

## SEM: Adding Structural Paths

SEM extends CFA by allowing **regression among latent variables**:

$$\eta_2 = \gamma \eta_1 + \zeta, \quad \zeta \sim N(0, \sigma_\zeta^2)$$

This enables testing hypotheses about causal relationships between latent constructs (e.g., "latent anxiety predicts latent avoidance"), not just their measurement.

### CFA vs. EFA

| | Exploratory FA (EFA) | Confirmatory FA (CFA) |
|--|--|--|
| Loadings | Unconstrained | Theory-specified (many fixed to 0) |
| Goal | Discover factor structure | Test a hypothesised structure |
| Identifiability | Rotation ambiguity | Resolved by constraints |
| See also | [[Factor Analysis and PPCA]] | This note |

## Model Fit in Psychometrics

Bayesian CFA/SEM uses posterior predictive checks (PPCs) and model comparison (WAIC/LOO) rather than classical fit indices (CFI, RMSEA). However, the spirit is the same: does the restricted factor model reproduce the observed correlation matrix?

## Connections

- [[Factor Analysis and PPCA]] — exploratory factor analysis and PPCA; identifiability via constrained $W$
- [[Hierarchical Models]] — latent factors as hierarchical random effects
- [[Spurious Association and Confounds]] — causal thinking about latent ↔ indicator relationships
- [[Nonparametric Models Overview]] — for factor models with non-Gaussian priors

## Source

- [[raw/Confirmatory Factor Analysis and Structural Equation Models in Psychometrics]] — PyMC case study; draws on Levy & Mislevy, *Bayesian Psychometric Modeling*
