---
title: "Bayesian Difference in Differences"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/difference-in-differences
  - method/pymc
  - method/bayesian
  - type/concept
  - doc/textbook
aliases:
  - Bayesian DiD
date_ingested: 2026-04-09
doc_type: tutorial
source_location: "PyMC Difference in Differences example (Benjamin T. Vincent, 2022)"
depends_on:
  - "[[Differences-in-Differences]]"
  - "[[The Selection Problem]]"
  - "[[The Experimental Ideal]]"
  - "[[Regression and the CEF]]"
used_by:
  - "[[Observational vs Experimental Methods in Advertising]]"
---

# Bayesian Difference in Differences

> [!abstract] Summary
> Difference in differences (DiD) is re-framed as a Bayesian linear model, yielding a full posterior distribution over the treatment effect $\Delta$ and enabling principled counterfactual prediction. The core assumptions (parallel trends, no spillovers) are unchanged; the Bayesian approach adds uncertainty quantification and natural counterfactual inference.

## When to Use DiD

See the frequentist treatment at [[Differences-in-Differences]]. DiD is appropriate when:

- You have **pre/post** measurements
- You have **treatment and control groups** (quasi-experimental — not randomised)
- The **parallel trends assumption** holds: absent treatment, both groups would have evolved similarly

## The Model

Expected outcome for observation $i$:
$$\mu_i = \beta_c + (\beta_\Delta \cdot \text{group}_i) + (\text{trend} \cdot t_i) + (\Delta \cdot \text{treated}_i \cdot \text{group}_i)$$

| Parameter | Meaning |
|-----------|---------|
| $\beta_c$ | Control group intercept |
| $\beta_\Delta$ | Treatment group intercept offset from control |
| $\text{trend}$ | Common time trend (parallel trends assumption embodied here) |
| $\Delta$ | **Causal impact of treatment** (the quantity of interest) |

> [!important] Parallel trends assumption
> The model forces a **single shared slope** for both groups. This is the parallel trends assumption in parametric form. If trends differ by group, the model is misspecified and $\Delta$ is biased.

Note: `treated` is a binary variable that is 1 *only* for the treatment group *after* the intervention — it equals `(t > t_intervention) * group`.

## PyMC Implementation

```python
with pm.Model() as model:
    t       = pm.MutableData("t",       df["t"].values)
    treated = pm.MutableData("treated", df["treated"].values)
    group   = pm.MutableData("group",   df["group"].values)

    control_intercept     = pm.Normal("control_intercept", 0, 5)
    treat_intercept_delta = pm.Normal("treat_intercept_delta", 0, 1)
    trend                 = pm.Normal("trend", 0, 5)
    Δ                     = pm.Normal("Δ", 0, 1)
    sigma                 = pm.HalfNormal("sigma", 1)

    mu = control_intercept + (treat_intercept_delta * group) \
       + (trend * t) + (Δ * treated * group)
    pm.Normal("obs", mu, sigma, observed=df["y"])
```

## Counterfactual Inference

A key advantage of the Bayesian approach: **explicit counterfactual predictions**.

```python
# Counterfactual: treatment group NOT treated after intervention
with model:
    pm.set_data({
        "t":       t_post,
        "group":   [1]*len(t_post),
        "treated": [0]*len(t_post),   # <-- the counterfactual intervention
    })
    ppc_counterfactual = pm.sample_posterior_predictive(idata, var_names=["mu"])
```

The gap between the counterfactual prediction and observed post-treatment outcomes is $\Delta$, now expressed as a full posterior distribution.

## Posterior of the Treatment Effect

```python
az.plot_posterior(idata.posterior["Δ"], ref_val=true_delta)
```

Unlike the frequentist approach (which gives only a point estimate + CI), the Bayesian $\hat{\Delta}$ posterior can be used directly:
- Probability that $\Delta > 0$
- Decision-theoretic loss functions
- Full propagation into downstream calculations

## Classic Application: Card & Krueger (1992)

New Jersey raised minimum wage; Pennsylvania did not. DiD estimates:

$$\hat{\Delta}_\text{DiD} = (\bar{y}_\text{NJ,post} - \bar{y}_\text{NJ,pre}) - (\bar{y}_\text{PA,post} - \bar{y}_\text{PA,pre})$$

The Bayesian version gives a posterior over the employment effect, propagating uncertainty from both pre/post estimates.

## Connections

- Frequentist DiD: [[Differences-in-Differences]] — fixed effects, common trends, classical CI
- [[Counterfactual Inference]] — related counterfactual framework (pre/post, same group, no control)
- [[Bayesian Non-parametric Causal Inference]] — non-parametric alternative when parallel trends is implausible
- [[The Experimental Ideal]] and [[The Selection Problem]] — why we need quasi-experimental designs

## Source

- [[raw/Difference in differences]] — PyMC example by Benjamin T. Vincent (2022); Card & Krueger minimum wage example
- Recommended textbooks: *The Effect* (Huntington-Klein) and *Causal Inference: The Mixtape* (Cunningham)
