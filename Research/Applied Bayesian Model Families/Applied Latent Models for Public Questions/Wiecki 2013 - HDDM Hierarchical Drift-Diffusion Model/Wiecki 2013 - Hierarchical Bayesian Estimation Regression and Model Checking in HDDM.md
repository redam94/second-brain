---
title: "Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/concept
  - doc/paper
source: "[[raw/Wiecki 2013 - HDDM Hierarchical Bayesian Drift-Diffusion Model in Python.pdf]]"
source_location: "Methods 'Hierarchical Bayesian estimation' p. 3; Results pp. 4-8; Figures 2-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model"
doc_type: paper
depends_on:
  - "[[Wiecki 2013 - Drift-Diffusion Model and Wiener First-Passage Likelihood]]"
used_by:
  - "[[Wiecki 2013 - Parameter Recovery Simulations and Detection Power]]"
  - "[[Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model - Overview]]"
aliases:
  - "HDDM priors and workflow"
  - "hierarchical drift-diffusion estimation"
  - "HDDMRegressor"
---

# Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM

> [!summary]
> HDDM places group-level priors on subject DDM parameters, shrinking sparse subjects toward the group, and samples the joint posterior by MCMC. It supplies `depends_on` (condition-wise parameters), `HDDMRegressor` (trial-wise covariates on any parameter), Gelman-Rubin convergence checks, DIC model comparison and direct posterior probability statements such as $P(v_{WW}>v_{LL})$.

## Overview

Two classical extremes are rejected: fitting each subject independently (ignores shared structure) and fitting an "average subject" (cannot fit any individual). The hierarchical model lets the group variance be estimated per parameter, so a parameter that is similar across subjects (e.g. non-decision time) is strongly pooled while a variable one (threshold) is not.

## Main Content

> [!definition] The HDDM hierarchical model (Figure 2, p. 3)
> For subject $j$ with trials $i$ and group means/SDs $(\mu,\sigma)$:
> $$\begin{aligned}
> \mu_a&\sim\Gamma(1.5,0.75), & \sigma_a&\sim HN(0.1), & a_j&\sim\Gamma(\mu_a,\sigma_a^2)\\
> \mu_v&\sim N(2,3), & \sigma_v&\sim HN(2), & v_j&\sim N(\mu_v,\sigma_v^2)\\
> \mu_z&\sim N(0.5,0.5), & \sigma_z&\sim HN(0.05), & z_j&\sim \text{invlogit}\big(N(\mu_z,\sigma_z^2)\big)\\
> \mu_t&\sim\Gamma(0.4,0.2), & \sigma_t&\sim HN(1), & t_j&\sim N(\mu_t,\sigma_t^2)\\
> s_v&\sim HN(2), & s_t&\sim HN(0.3), & s_z&\sim B(1,3)
> \end{aligned}$$
> and $x_{i,j}\sim F(a_j,z_j,v_j,t_j,s_v,s_t,s_z)$, the full-DDM likelihood of Navarro and Fuss (2009). $N$ is parameterized by mean and SD, $HN$ is half-normal (SD), $\Gamma$ by mean and rate, $B$ by $(\alpha,\beta)$. Inter-trial variabilities $s_v,s_t,s_z$ are **group-only**: they have too small an influence on the likelihood to be estimable per subject. A non-informative-prior variant also exists, but informative priors are recommended because they keep estimates in the literature's plausible range, reduce parameter collinearity and improve recovery with few trials.
^def-hddm-model

**Workflow (Results, pp. 4-7).** Data are a CSV with required columns `subj_idx`, `rt`, `response` plus experiment columns (here `theta` EEG power, `dbs`, `stim`, `conf`). The reward-learning task (Cavanagh et al. 2011) has win-win (WW), lose-lose (LL) and win-lose (WL) trials; WW and LL are high conflict (HC), WL low conflict (LC). The hypothesis: conflict raises the decision threshold, with frontal theta tracking trial-wise threshold and subthalamic stimulation (DBS) interrupting that link.

1. `m = hddm.HDDM(data)`; `m.find_starting_values()` (MAP by gradient ascent); `m.sample(2000, burn=20)`. Recommended 2,000-10,000 samples, thinning only if memory matters.
2. Convergence: trace, autocorrelation and marginal posterior plots (`plot_posteriors`), and Gelman-Rubin $\hat R$ across five models; values should be near 1 and not above 1.02 (example output a: 1.000, a_std: 1.001, t: 1.000).
3. Summary: `print_stats()` gives mean, SD and quantiles; example threshold posterior mean $a=2.058$ (SD $0.103$, 95% interval $[1.862,2.261]$), group SD $0.379$.
4. Condition effects: `depends_on={'v':'stim'}` builds separate group distributions per level; also usable between groups (e.g. drug vs placebo on $a$).
5. Posterior inference: compare traces directly, $P(v_{WW}>v_{LL})=0.347$ and $P(v_{LL}>v_{WL})=0.0$, so WL drift is clearly higher.
6. Model comparison by DIC: lumped model 10960.57 vs stimulus-specific drift 10775.62 (lower is better). The paper warns DIC favours complexity and suggests simulating data from the alternatives to calibrate DIC differences; Bayes factors (Savage-Dickey; Wagenmakers et al. 2010) are an alternative.

> [!definition] HDDMRegressor (trial-wise covariates)
> A parameter (here $a$) is replaced by a linear predictor given as a Patsy formula, e.g. `"a ~ theta:C(conf, Treatment('LC'))"`, with `depends_on={'v':'stim'}`. This fits an intercept and one slope of theta on threshold per conflict level, relative to the LC treatment level, instead of one static threshold per subject: $a_{ij}=\beta_0+\beta_{1}\,\theta_{ij}\cdot\mathbb 1[\text{conf}]$ with hierarchical priors on the coefficients.
^def-hddm-regressor

**Finding.** In DBS-off participants theta power has a positive effect on threshold in HC trials; with DBS on, the coefficient reverses (Figure 5), supporting the hypothesised role of the subthalamic nucleus. The supplement (not captured) covers within-subject effects and the outlier mixture.

## Examples

> [!example] Interpreting the DIC and posterior contrast
> DIC drops by 185 when drift is allowed to vary by stimulus (10960.6 to 10775.6) and $P(v_{LL}>v_{WL})=0$: all posterior mass of LL drift is below WL drift. WW vs LL is unresolved ($0.35$). A reader should therefore claim "WL is easier" but not an ordering of WW and LL.
^ex-hddm-dic

**PyMC-style sketch of the regression (untested pseudocode).**
```python
with pm.Model() as hddm_reg:
    mu_b = pm.Normal("mu_b", 2, 1, shape=2)           # intercept, theta slope
    sd_b = pm.HalfNormal("sd_b", 1, shape=2)
    b = pm.Normal("b", mu_b, sd_b, shape=(n_subj, 2))  # partial pooling
    a_trial = pm.math.exp(b[subj, 0] + b[subj, 1] * theta)   # positive threshold
    pm.CustomDist("y", v[subj], a_trial, z[subj], t[subj], logp=wfpt_logp, observed=Y)
```

## Connections
- Partial pooling theory: [[Hierarchical Models]]; centred vs non-centred parameterizations: [[Efficient MCMC]].
- Posterior predictive checks of RT quantiles: [[Posterior Predictive Checking]]. Priors checked by [[Prior Predictive Checking]].
- DIC and alternatives: [[Model Comparison]].

## See Also
[[Wiecki 2013 - Drift-Diffusion Model and Wiener First-Passage Likelihood]], [[Wiecki 2013 - Parameter Recovery Simulations and Detection Power]]
