---
title: "Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/example
  - doc/paper
source: "[[raw/Rosenman 2020 - Combining Observational and Experimental Datasets Using Shrinkage Estimators.pdf]]"
source_location: "Synthesis of Sec. 3-5 (bias xi_k, lambda_opt, implied Gamma); concept note, PyMC code untested and not from the paper"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Rosenman 2020 - Combining Observational and Experimental Datasets"
doc_type: paper
depends_on:
  - "[[Rosenman 2020 - Setup Assumptions and Bias Structure]]"
  - "[[Rosenman 2020 - Unbiased Risk Estimate and Common Shrinkage]]"
used_by: []
aliases:
  - hierarchical bias model calibration
  - few holdouts many campaigns
  - Bayesian data fusion of RCT and propensity estimates
  - marginal bias model integrating out effects
---

# Rosenman 2020 - Hierarchical Bias Model Sketch for Few Holdouts

> [!summary]
> The paper's per-stratum bias $\xi_k$ and its estimated shrinkage have a direct Bayesian reading: put a hierarchical prior on the bias, $\xi_c\sim N(X_c\gamma,\tau_\xi^2)$, observe the bias only where a holdout exists, and use the posterior of $(\gamma,\tau_\xi)$ to correct the propensity estimate in campaigns **without** a holdout. With $\gamma=0$ the posterior weight on the RCT equals the paper's $1-\lambda_{opt}$ with $\xi^2$ replaced by $\tau_\xi^2$. This note records that equivalence and a PyMC sketch for the E103 setting. *Synthesis; code is untested.*

## Overview

**Setting (E103-style).** $C$ campaigns, each with an observational (propensity-adjusted) lift estimate $\hat\tau_{o,c}$ (large sample, small variance) but only $H<C$ with a randomised ghost-ad/holdout estimate $\hat\tau_{r,c}$ (small sample, large variance). The question: how much to trust $\hat\tau_{o,c}$ in the campaigns with no holdout.

**Mapping to the paper.** Strata $k\leftrightarrow$ campaigns; Assumption 2 (common effect) $\leftrightarrow$ the same $\tau_c$ estimated both ways; the unknown stratum bias $\xi_k$ of the observational estimate $\leftrightarrow$ the bias that the hierarchical model learns; $\Sigma_r,\Sigma_o$ $\leftrightarrow$ the sampling variances (treated as known from standard errors).

## Main Content

### Model
For campaign $c$ with covariates $X_c$ (targeting breadth, reach, audience type, ...):
$$
\hat\tau_{o,c}\sim N(\tau_c+\xi_c,\ s_{o,c}^2),\qquad\xi_c\sim N(X_c^T\gamma,\ \tau_\xi^2),
$$
$$
\hat\tau_{r,c}\sim N(\tau_c,\ s_{r,c}^2)\ \text{ for }c\in\mathcal H\ (\text{holdouts only}),\qquad\tau_c\sim N(\mu_\tau,\sigma_\tau^2).
$$
The bias is assumed to be **additive** on the effect scale (the paper's $\hat\tau_{ok}=\tau_k+\xi_k+\text{noise}$); if the bias is multiplicative, work on the log scale or model $\hat\tau_o/\tau$.

### Marginal model (effects integrated out)
For holdout campaigns, subtracting the two estimates removes $\tau_c$:
$$
\hat\tau_{o,c}-\hat\tau_{r,c}\sim N\!\left(X_c^T\gamma,\ s_{o,c}^2+s_{r,c}^2+\tau_\xi^2\right).
$$
This is identified from the holdouts alone and has no funnel in $\tau_c$: sample $(\gamma,\tau_\xi)$ in this marginal form, then recover $\tau_c$ and $\xi_c$ afterwards (the centred form with $\xi_c$ sampled directly has the usual funnel as $\tau_\xi\to0$; use a non-centred parameterisation $\xi_c=X_c^T\gamma+\tau_\xi z_c$ if sampling them jointly).

> [!theorem] Posterior weight equals the paper's shrinkage weight (when $\gamma=0$)
> Conditional on $\tau_\xi$ and with a flat prior on $\tau_c$, the posterior mean of $\tau_c$ for a holdout campaign is
> $$
> \hat\tau_c=\frac{\hat\tau_{r,c}/s_{r,c}^2+\hat\tau_{o,c}/(s_{o,c}^2+\tau_\xi^2)}{1/s_{r,c}^2+1/(s_{o,c}^2+\tau_\xi^2)}=\hat\tau_{r,c}-\lambda_c(\hat\tau_{r,c}-\hat\tau_{o,c}),\quad\lambda_c=\frac{s_{r,c}^2}{s_{r,c}^2+s_{o,c}^2+\tau_\xi^2}.
> $$
> Compare the oracle $\lambda_{opt}=\text{Tr}(\Sigma_rD)/\{\text{Tr}(\Sigma_rD)+\text{Tr}(\Sigma_oD)+\xi^TD^2\xi\}$: the bias second moment $\xi_k^2$ is replaced by the prior bias variance $\tau_\xi^2$, and $\tau_\xi$ is learned from the holdouts (empirical Bayes in $\kappa_1$ via the discrepancy $(\hat\tau_o-\hat\tau_r)^TD(\hat\tau_o-\hat\tau_r)$; fully Bayesian here). Weights are per-campaign, i.e. closer to variance-weighted $\kappa_2$ than to the common-factor $\kappa_1$.
^thm-posterior-weight

For a campaign without a holdout, $\tau_c$ is predicted from the observational estimate and the posterior predictive of the bias:
$$
\tau_c\mid\hat\tau_{o,c},\text{data}\sim N\!\left(\hat\tau_{o,c}-X_c^T\hat\gamma,\ s_{o,c}^2+\tau_\xi^2+\text{Var}(X_c^T\gamma)\right)
$$
(plug-in sketch; the full posterior integrates over $(\gamma,\tau_\xi)$). Uncertainty is dominated by $\tau_\xi$ when $s_{o,c}$ is small - a few holdouts cannot tell much about $\tau_\xi$ (very weakly identified with $H$ small), so its prior matters (use a half-normal with scale set by plausible bias, and report prior sensitivity).

### PyMC 5 sketch (untested)
```python
import numpy as np, pymc as pm

def bias_model(tau_o, se_o, X, holdout_idx, tau_r, se_r):
    """tau_o, se_o: observational estimate and SE for all C campaigns; X: C x p campaign covariates (standardised);
    holdout_idx: indices with a holdout; tau_r, se_r: holdout estimates and SEs for those campaigns."""
    C, p = X.shape
    with pm.Model() as m:
        gamma = pm.Normal("gamma", 0, 0.5, shape=p)               # covariates of the bias
        mu_bias = pm.Normal("mu_bias", 0, 0.5)                     # average bias
        tau_xi = pm.HalfNormal("tau_xi", 0.3)                      # bias heterogeneity; weakly identified with few holdouts
        # marginal likelihood for holdout campaigns (tau_c integrated out)
        d = tau_o[holdout_idx] - tau_r
        sd = pm.math.sqrt(se_o[holdout_idx]**2 + se_r**2 + tau_xi**2)
        pm.Normal("d_obs", mu_bias + pm.math.dot(X[holdout_idx], gamma), sd, observed=d)
        # posterior predictive bias for every campaign (non-centred)
        z = pm.Normal("z", 0, 1, shape=C)
        xi = pm.Deterministic("xi", mu_bias + pm.math.dot(X, gamma) + tau_xi*z)
        # bias-corrected effect for non-holdout campaigns: observational estimate minus predicted bias
        pm.Deterministic("tau_corrected", tau_o - xi)
        idata = pm.sample(2000, tune=2000, chains=4, target_accept=0.95, random_seed=0)
    return m, idata
```
Caveat: `z` for holdout campaigns is also informed by the likelihood only through the marginal model; for those campaigns, use the closed-form posterior mean above (or add the joint $(\tau_c,\xi_c)$ likelihood in non-centred form). Check the prior-predictive of the bias against known experiments before fitting.

## Examples

> [!example] Numbers: three holdouts, five campaigns
> Observational SEs 0.01, holdout SEs 0.04, estimated $\tau_\xi=0.03$, $\gamma=0$ (average bias $\mu_{bias}=+0.02$). The weight moved toward the observational estimate is $s_r^2/(s_r^2+s_o^2+\tau_\xi^2)$ i.e. $\lambda=0.0016/(0.0016+0.0001+0.0009)=0.615$. So a holdout showing 0.10 lift and an observational estimate of 0.14 combine (after removing the average bias, so 0.12) to $0.10-0.615(0.10-0.12)=0.112$. For a campaign with no holdout and observational estimate 0.14, the bias-corrected prediction is $0.14-0.02=0.12$ with SD $\sqrt{0.0001+0.0009}=0.032$. (Illustrative numbers.)

## Connections

- Equivalent in spirit to the lift-calibration of MMM priors with experiments in [[Bayesian Estimation and Priors for MMM]]; hierarchy and partial pooling: [[Hierarchical Models]], [[Partial Pooling as Multiple Comparisons Correction]].
- Bias as the object to be estimated, instead of postulated: contrast with [[Franks 2019 - Calibrating Sensitivity Parameters]] and [[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]].
- Prior predictive checks for the bias: [[Prior Predictive Checking]]; when the answer depends on an unidentified quantity: [[Unidentified Parameters - Partial Identification and Bayesian Updating]].

## See Also

[[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]]
