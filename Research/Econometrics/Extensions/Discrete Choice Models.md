---
title: "Discrete Choice Models"
source: "https://www.pymc.io/projects/examples/en/latest/generalized_linear_models/GLM-discrete-choice_models.html"
tags:
  - source/ingested
  - topic/econometrics
  - topic/bayesian
  - method/discrete-choice
  - method/random-utility
  - type/concept
  - doc/textbook
date_ingested: 2026-04-09
raw: "[[raw/Discrete Choice and Random Utility Models]]"
folder: "Econometrics/Extensions"
doc_type: tutorial
source_location: "PyMC Discrete Choice and Random Utility Models tutorial"
depends_on:
  - "[[Regression and the CEF]]"
  - "[[Instrumental Variables]]"
  - "[[Quantile Regression]]"
used_by:
  - "[[Mostly Harmless Econometrics - Overview]]"
aliases:
  - "Random utility model"
  - "Multinomial logit"
  - "RUM"
---

# Discrete Choice Models

> [!abstract] Summary
> Discrete choice models operationalize the theory that agents choose the option that maximises subjective utility. Utility is modelled as a latent linear function of observable alternative attributes, and the Gumbel-distributed error assumption yields the softmax (multinomial logit) likelihood. Pioneered by Daniel McFadden (1970s) for transport demand forecasting; widely used in marketing, economics, and policy.

## Core Idea: Random Utility Theory

Each alternative $j \in \text{Alt}$ is assigned a latent utility $U_j$. A decision-maker chooses the alternative with the highest utility. Utility is decomposed into a deterministic component (a linear function of observable attributes) plus an unobserved stochastic component:

$$U_j = \mathbf{x}_j^\top \boldsymbol{\beta} + \varepsilon_j$$

Assuming $\varepsilon_j \sim \text{Gumbel}$, the probability of choosing alternative $j$ is given by the **softmax** (multinomial logit) transform:

$$P(\text{choose } j) = \text{softmax}(u)_j = \frac{\exp(u_j)}{\sum_{q=1}^{J} \exp(u_q)}$$

This arises because differences of Gumbel random variables follow a logistic distribution.

> [!note] Identification
> Only utility *differences* are identified. The utility of one alternative (the "outside good" or pivot alternative) is fixed at 0 to achieve parameter identification, especially when alternative-specific intercepts are included.

## Model Variants

### 1. Basic Conditional Logit (CL)

Utility driven entirely by alternative-specific attributes (e.g. installation cost, operating cost) with globally shared coefficients:

$$u_j = \beta_{ic} \cdot \text{ic}_j + \beta_{oc} \cdot \text{oc}_j$$

```python
with pm.Model(coords=coords) as model_1:
    beta_ic = pm.Normal("beta_ic", 0, 1)
    beta_oc = pm.Normal("beta_oc", 0, 1)
    s = pm.math.stack([beta_ic * ic_j + beta_oc * oc_j for j in alts]).T
    p_ = pm.Deterministic("p", pm.math.softmax(s, axis=1), dims=("obs", "alts_probs"))
    choice_obs = pm.Categorical("y_cat", p=p_, observed=observed, dims="obs")
```

*Limitation*: With only cost coefficients and no alternative-specific intercepts, the model fails to capture average preference differences across alternatives — posterior predictive checks reveal poor fit.

### 2. With Alternative-Specific Intercepts

Adding an intercept per alternative (except the pivot) absorbs systematic preference heterogeneity:

$$u_j = \alpha_j + \beta_{ic} \cdot \text{ic}_j + \beta_{oc} \cdot \text{oc}_j \quad (u_{\text{hp}} = \beta_{ic} \cdot \text{ic}_{\text{hp}} + \beta_{oc} \cdot \text{oc}_{\text{hp}})$$

This is the standard **multinomial logit** and substantially improves PPC performance.

### 3. Correlated Intercepts (MvNormal Prior)

Placing a multivariate normal prior on the intercepts (via [[Hierarchical Models|LKJ Cholesky]] decomposition) captures correlation structure among alternatives. Useful for understanding substitution patterns, though it does not always improve predictive metrics:

```python
chol, corr, stds = pm.LKJCholeskyCov("chol", n=5, eta=2.0, sd_dist=pm.Exponential.dist(1.0, shape=5))
alphas = pm.MvNormal("alpha", mu=0, chol=chol, dims="alts_probs")
```

## Marginal Rate of Substitution

The ratio of coefficients in the utility function is economically interpretable even though utility itself is latent. For a utility of the form $U = \beta_{oc} \cdot oc + \beta_{ic} \cdot ic$:

$$-\frac{dic}{doc}\bigg|_{dU=0} = \frac{\beta_{oc}}{\beta_{ic}}$$

This gives the rate at which one-time installation costs substitute for recurring operating costs at constant utility. In Bayesian analysis, we obtain a full posterior over this quantity.

## Data Format

Discrete choice data can be structured in either **wide format** (one row per decision-maker, cost columns per alternative) or **long format** (one row per decision-maker × alternative, with a binary `choice` flag). Long format makes matrix operations more natural, especially in Stan or `pylogit`.

## Model Assessment

- **Posterior predictive checks (PPC)**: Compare predicted market shares (mean and 95% CI) against observed shares.
- **WAIC / LOO**: Penalise added complexity from additional parameters (e.g. correlation structure).
- **Marginal rate of substitution**: Posterior distribution over economically meaningful derived quantities.

## Applications

- **Transport demand**: McFadden's original BART study — predicting market share for new transit options.
- **Marketing**: Consumer brand choice from product attributes (e.g. cracker brands).
- **Energy economics**: Household choice among heating systems.

## Implementation Notes

- Uses `pm.Categorical` likelihood with `pm.math.softmax`.
- Categorical encoding of the outcome must match the ordering of stacked utility vectors.
- `pm.MutableData` containers allow post-fit counterfactual inference (e.g. policy-price simulations).

## See Also

- [[Generalized Linear Models]] — Logistic regression as a special (binary) case
- [[Instrumental Variables]] — Handling endogeneity in choice attribute prices
- [[Hierarchical Linear Models]] — Mixed logit / random-coefficient extensions
- [[raw/Discrete Choice and Random Utility Models]] — Full PyMC tutorial with code
- [[Market Share Models]] — MCI and MNL choice models applied in marketing science; same logit foundation used for brand-level market share estimation
