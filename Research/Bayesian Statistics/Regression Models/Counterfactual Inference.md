---
title: "Counterfactual Inference"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/counterfactual
  - topic/time-series
  - method/pymc
  - type/concept
  - doc/tutorial
aliases:
  - Excess Deaths
  - Bayesian Counterfactual
date_ingested: 2026-04-09
doc_type: concept
source_location: "raw/Counterfactual inference calculating excess deaths due to COVID-19"
depends_on:
  - "[[Bayesian Linear Regression]]"
  - "[[Generalized Linear Models]]"
  - "[[Model Checking]]"
  - "[[Spurious Association and Confounds]]"
used_by:
  - "[[Nonparametric Causal Inference]]"
  - "[[Decision Analysis]]"
---

# Counterfactual Inference

> [!abstract] Summary
> Counterfactual inference asks "what would have happened under an alternative scenario?" It requires building a model on pre-intervention data, then using posterior predictive sampling under the counterfactual conditions. Applied here to excess death estimation during COVID-19 in England and Wales.

## The Core Formula

$$\text{Excess deaths} = \underbrace{\text{Reported Deaths}}_{\text{observable}} - \underbrace{\text{Expected Deaths}}_{\text{counterfactual (unobservable)}}$$

Expected deaths is a **counterfactual**: deaths that would have occurred *if nothing had changed*. It can never be observed because we cannot simultaneously experience both the actual and counterfactual timeline.

## Strategy

1. **Build a model on pre-intervention data** — fit on pre-COVID deaths data (2006–2019) using predictors: month, linear time trend, average temperature
2. **Retrodict** — check that the model fits the pre-intervention period (posterior predictive check)
3. **Counterfactual forecast** — use `pm.set_data()` with post-COVID predictors but the same *pre-COVID posterior* to generate predictions of "what would have happened"
4. **Compute excess** — subtract counterfactual predictions from reported deaths

> [!note] The do-operator
> Formally, this is the **do-calculus** applied to time: we *intervene* to set the world to pre-COVID conditions (no pandemic). Practically, this is implemented by running posterior predictive sampling on out-of-sample (post-COVID) predictor values.

## Model Structure

```python
with pm.Model(coords={"month": month_strings}) as model:
    month = pm.MutableData("month", pre["month"].to_numpy())
    time  = pm.MutableData("time",  pre["t"].to_numpy())
    temp  = pm.MutableData("temp",  pre["temp"].to_numpy())

    intercept    = pm.Normal("intercept", 40_000, 10_000)
    month_mu     = ZeroSumNormal("month mu", sigma=3000, dims="month")  # seasonal effects
    linear_trend = pm.TruncatedNormal("linear trend", 0, 50, lower=0)  # increasing baseline
    temp_coeff   = pm.Normal("temp coeff", 0, 200)  # ~-764 deaths/°C

    mu = intercept + (linear_trend * time) + month_mu[month - 1] + (temp_coeff * temp)
    sigma = pm.HalfNormal("sigma", 2_000)
    pm.TruncatedNormal("obs", mu=mu, sigma=sigma, lower=0, observed=deaths)
```

**ZeroSumNormal**: monthly deflections constrained to sum to zero (removes one degree of freedom, aids identifiability).

## Counterfactual Sampling

```python
# Update data to post-COVID predictors
with model:
    pm.set_data({"month": post["month"], "time": post["t"], "temp": post["temp"]})
    counterfactual = pm.sample_posterior_predictive(idata, var_names=["obs"])

# Excess deaths
excess = post_deaths - counterfactual.posterior_predictive["obs"]
cumulative_excess = excess.cumsum(dim="t")
```

The result is a **posterior distribution over excess deaths** — not just a point estimate, giving uncertainty bands.

## Causal Caveats

- The model assumes no unmodelled confounders changed between pre and post periods (other than COVID)
- Many other things changed in 2020 (policy, healthcare access, behaviour) — strong causal claims require accounting for these
- Excess deaths captures *all-cause* excess mortality, not just direct COVID deaths

## Connections

- Compare with [[Bayesian Non-parametric Causal Inference]] (non-parametric approach to causal estimation)
- [[Differences-in-Differences]] — quasi-experimental strategy (compare treated vs. control across time); DiD is the parametric version of the same counterfactual logic
- [[Data Collection Models]] — both approaches rely on ignorability: the pre-intervention model must capture all confounders
- ZeroSumNormal constraint: related to sum-to-zero constraints in [[Generalized Linear Models]]
- Related to Google's **CausalImpact** framework (Bayesian structural time-series for intervention analysis)

## Source

- [[raw/Counterfactual inference calculating excess deaths due to COVID-19]] — PyMC example by Benjamin T. Vincent (2022)
