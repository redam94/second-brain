---
title: "Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/example
  - doc/paper
source: "[[raw/Cinelli Hazlett 2020 - Making Sense of Sensitivity.pdf]]"
source_location: "Synthesis note: applies Sec. 4-5 formulas (Eqs. 13, 18, 22); concept note on PyMC use, not a paper section"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Cinelli Hazlett 2020 - Making Sense of Sensitivity"
doc_type: paper
depends_on:
  - "[[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]]"
  - "[[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]]"
  - "[[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]]"
used_by: []
aliases:
  - planted confounder check
  - Bayesian partial R2 sensitivity
---

# Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch

> [!summary]
> The OVB formula is an exact algebraic identity, so it can be verified by **planting** a synthetic confounder of known partial $R^2$ values and comparing the formula's predicted adjusted estimate with the regression that includes it. Putting priors on the two partial $R^2$ turns the identity into a Bayesian sensitivity analysis (a posterior over $\tau$ given a prior over confounder strength). This note records the check, a PyMC sketch (untested), and how the idea maps to the job-training and ad-targeting examples.

## Overview

*This is a synthesis note (concept note) built on the paper's formulas; the simulation and code are this vault's own and the PyMC model is untested.*

## Main Content

### Planting a confounder of exact strength (E107 pattern)
Procedure for a benchmark with a known answer (for instance an experiment or a hidden measured covariate):
1. Run the restricted regression to get $\hat\tau_{res}$, $\text{se}$, $df$ and the residuals $D^{\perp X}$, $Y^{\perp X,D}$.
2. Construct a synthetic $Z$ whose *residualised* version has target correlations $\rho_{DZ}$ with $D^{\perp X}$ and $\rho_{YZ}$ with $Y^{\perp X,D}$ (e.g. $Z=a\,D^{\perp X}+b\,Y^{\perp X,D}+c\,\varepsilon$, then solve for coefficients).
3. Refit with $Z$ included; compare $\hat\tau_{res}-\hat\tau$ with the formula $\sqrt{R^2_{Y\sim Z|D,X}R^2_{D\sim Z|X}/(1-R^2_{D\sim Z|X})}\cdot\text{sd}(Y^{\perp X,D})/\text{sd}(D^{\perp X})$.

> [!example] Simulation check
> Data: $X,Z\sim N(0,1)$, $D=0.8Z+0.5X+\varepsilon$, $Y=0.6Z+0.4X+0\cdot D+\varepsilon$, $n=5000$, true effect 0.
> Restricted $\hat\tau_{res}=0.2927$. Realised $R^2_{D\sim Z|X}=0.4130$, $R^2_{Y\sim Z|D,X}=0.1904$. Formula bias $=0.310343509$; actual $\hat\tau_{res}-\hat\tau=0.310343509$ (agree to 15 digits). The identity holds because it is algebra, not a model.
^ex-planted-check

### Robustness value as a pre-registered benchmark
For a job-training or lift regression, compute $RV$ and $R^2_{Y\sim D|X}$ first, then ask which *observed* covariate has comparable partial $R^2$ values. A recurring check in observational benchmarks against experiments (LaLonde NSW vs CPS; see also [[Experimental Benchmarks for Observational Ad Measurement]]): hide a measured covariate, compute the bound with $k=1$, then verify the true shift stays inside it. By [[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates#^thm-formal-bounds|the bounding theorem]] the shift of the hidden-covariate estimate is bounded by the formal $(R^2_{D\sim Z|X},R^2_{Y\sim Z|D,X})$ evaluated at $k_D=k_Y=1$.

### Bayesian version: a prior over confounder strength
Treat $(R^2_{Y\sim Z|D,X},R^2_{D\sim Z|X})=(a,b)$ as unknown sensitivity parameters with priors, and $\tau$ as
$$\tau=\tau_{res}-\text{sign}\cdot\sqrt{\tfrac{a\,b}{1-b}}\;\sqrt{df}\;\text{se}_{res}.$$
Given a posterior $\tau_{res}\sim N(\hat\tau_{res},\text{se}_{res}^2)$ (or a full Bayesian regression's posterior), the induced posterior for $\tau$ is a *prior-dependent* sensitivity analysis. Because $(a,b)$ are not identified by the data, their posterior equals their prior; only the *resulting* distribution of $\tau$ changes. This is the logic (and the honesty requirement) of the "unidentified parameters" discussion in [[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]].

```python
# PyMC 5 sketch (untested): prior over confounder strength -> posterior over tau.
import numpy as np, pymc as pm
tau_hat, se, df = 0.097, 0.023, 783
with pm.Model() as m:
    tau_res = pm.Normal("tau_res", tau_hat, se)             # stand-in for regression posterior
    # priors encode "no stronger than k x Female": Beta mass below the bound, here (0.12, 0.01)
    r2_y = pm.Beta("r2_y", 2, 14)                           # mean ~ 0.125
    r2_d = pm.Beta("r2_d", 1.5, 148)                        # mean ~ 0.01
    direction = pm.Bernoulli("harmful", 0.5)                # does Z hurt or help the estimate?
    bias = pm.math.sqrt(r2_y*r2_d/(1-r2_d))*np.sqrt(df)*se
    tau = pm.Deterministic("tau", tau_res - (2*direction-1)*bias)
    pm.Deterministic("prob_tau_gt0", tau > 0)
    idata = pm.sample(2000, tune=1000, chains=4, random_seed=0)
```

### Marketing reading
- **Ad lift / propensity estimates (E101-E103):** the omitted "hidden targeting" variable is a confounder of exposure and conversion; partial $R^2$ values answer "how much of the outcome and of delivery would targeting have to explain".
- **MMM:** omitted drivers (seasonality shifts, distribution, promotions) of both spend and sales; the multi-confounder bound summarises them in one number. Experiments (lift tests) provide the benchmark for how large $R^2_{Y\sim Z|D,X}$ can plausibly be, similar in spirit to [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]].

## Examples

See the simulation above and the Darfur reproduction in [[Cinelli Hazlett 2020 - Darfur Application and Reporting]].

## Connections

- [[Propensity Score in Bayesian CI]]: Bayesian propensity analyses where $U$ can be given a prior.
- [[Sensitivity Analysis in Observational Studies]]: E-value, Rosenbaum bounds, copula approaches.
- [[Bayesian Estimation and Priors for MMM]]: priors that act as sensitivity assumptions.

## See Also

[[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]], [[Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods]]
