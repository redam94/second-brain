---
title: "Franks 2019 - Discussion Limits and Bayesian Sketch"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/concept
  - doc/paper
source: "[[raw/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis Without Observable Implications.pdf]]"
source_location: "Sec. 7, pp. 28-29 (discussion); synthesis for PyMC/marketing use, not a paper section"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Franks 2019 - NHANES and Job Training Applications]]"
used_by: []
aliases:
  - outcome overlap limits Tukey
  - post-hoc sensitivity weighting step
  - hidden targeting sign of bias
---

# Franks 2019 - Discussion Limits and Bayesian Sketch

> [!summary]
> The framework's strengths are clean separation of identified and unidentified parts, one fit of the observed model, and calibration to selection on observables. Limits: the outcome-overlap condition (the missing distribution must live inside the observed support, and tails of the observed density matter when the shift is large), sensitivity parameters independent of covariates, binary treatment only, no individual-level estimands. This note also sketches how the recipe maps onto PyMC for ad-delivery / hidden-targeting questions (E102-E103 style). *The sketch is untested and is not from the paper.*

## Overview

**Advantages listed in Sec. 7.** (1) Cleanly separates identified and unidentified parts, so sensitivity parameters are guaranteed unidentified, in contrast to many latent-confounder models, and model checking is decoupled from sensitivity analysis. (2) The data are fit once, enabling post-hoc sensitivity analysis for models that previously assumed unconfoundedness. (3) Parameterisations can be calibrated to selection on observed covariates.

**Workflow fit.** In two-stage workflows (fit a flexible observed-data model by cross-validation/stacking, then plug predictions into an estimator tailored to the estimand: van der Laan & Rose 2011; Chernozhukov et al. 2016; Xu et al. 2018), sensitivity "could be implemented by adding a weighting step, parameterized by sensitivity parameters, between the first and second stages", without constraining the first-stage model.

## Main Content

### Limitations and open questions
1. **Outcome overlap (Condition 2).** Even when technically satisfied, the inferred missing density can depend on the estimated tails of the observed density if the observed and missing distributions are far apart; from the importance-weight view $f(T{=}1{-}t|Y)/f(T{=}t|Y)$ grows in regions where the missing density is far from the observed density, so tail assumptions (e.g. normality) drive the answer. Overlap is also less plausible when covariates explain most of the variance of $Y(t)$: a small unobserved confounder could then violate it.
2. **Covariate-independent parameters.** The paper uses $\gamma_t$ not varying with $X$; extension $\gamma_t(X)$ (Jung et al. 2018) adds parameters and calibration/reporting challenges.
3. **Multiple or multi-level treatments** need a generalised factorization (Imai & van Dyk 2004); latent-factor treatment models (Wang & Blei 2018; D'Amour 2019) may allow more parsimonious versions.
4. **Missing data plus confounding:** combine dropout approaches (Daniels & Hogan 2000; Scharfstein et al. 2003) with the observational factorization.
5. **Non-marginal estimands** (unit-level effects, optimal regimes) need a copula (see [[Franks 2019 - Tukey Factorization and Marginal Contrast Estimands]]).

### Bayesian implementation sketch for marketing (E102-E103 style)
Setting: users have outcomes $Y(0)$ (conversion without the ad) and exposure $T$; delivery targets high-propensity users (retargeting) or low-propensity ones (prospecting / suppression lists). The sign pattern from [[Franks 2019 - Calibrating Sensitivity Parameters]] says which way the naive estimate is biased:
- *Retargeting*: high baseline $Y(0)$ users more likely exposed, so $\gamma_0>0$ (single-arm confounding, Example 7 analogue): naive lift overstated, moderately sensitive.
- *Prospecting / suppression* of likely converters: $\gamma_0<0$, bias reverses sign.
- Both $\gamma_0$ and $\gamma_1$ non-zero with the same sign: ATE moves fast.

```python
# PyMC 5 sketch (UNTESTED): fit observed arms once, then push posterior draws through exponential tilts
import numpy as np, pymc as pm

def fit_observed(X, y, t):
    with pm.Model() as m:
        b = pm.Normal("b", 0, 1, shape=(2, X.shape[1]))              # arm-specific linear predictors
        a = pm.Normal("a", 0, 2, shape=2)
        p = pm.math.invlogit(a[t] + (X * b[t]).sum(-1))              # binary outcome (conversion)
        pm.Bernoulli("y", p, observed=y)
        idata = pm.sample(1000, tune=1000, chains=4, random_seed=0)
    return idata

def ate_grid(idata, X, t, gammas0, gammas1, rng=np.random.default_rng(0)):
    """Binary-outcome tilt (Example 2): missing log-odds = observed log-odds -/+ gamma (strict sign: arm1 -gamma1, arm0 +gamma0)."""
    P = idata.posterior.stack(s=("chain", "draw"))
    out = np.zeros((len(gammas0), len(gammas1), P.sizes["s"]))
    for k in range(P.sizes["s"]):
        a, b = P.a.values[:, k], P.b.values[:, :, k]
        lo = [a[j] + X @ b[j] for j in (0, 1)]                       # logit mu_j(x_i) for all units
        for i, g0 in enumerate(gammas0):
            for j, g1 in enumerate(gammas1):
                f = lambda z: 1/(1+np.exp(-z))
                y1_obs, y1_mis = f(lo[1]), f(lo[1] - g1)             # Y(1) for treated (obs) and untreated (missing)
                y0_obs, y0_mis = f(lo[0]), f(lo[0] + g0)
                E1 = np.where(t == 1, y1_obs, y1_mis).mean()
                E0 = np.where(t == 0, y0_obs, y0_mis).mean()
                out[i, j, k] = E1 - E0
    return out        # posterior over ATE at each (gamma0, gamma1); calibrate the grid with Eq. 18
```

Reading: report the grid as a heatmap of posterior mean and 95% interval (as in Fig. 2a) and mark the calibrated radius from [[Franks 2019 - Calibrating Sensitivity Parameters]]. For unidentified sensitivity parameters, putting a prior on $\gamma$ only reproduces that prior in the posterior of $\gamma$ (see [[Unidentified Parameters - Partial Identification and Bayesian Updating]]).

## Examples

> [!example] Which way does the bias go?
> A retargeting campaign delivers ads mainly to users with high baseline conversion. The naive treated-minus-control difference then overstates the lift: high $Y(0)$ is over-represented among exposed users. In the Tukey view this is $\gamma_0>0$ with $\gamma_1\approx0$: only the control-arm complete-data mean is biased ($\hat E[Y(0)]$ too low), producing a moderate overstatement. If the exposure rule instead suppresses likely converters, $\gamma_0<0$ and the naive lift is understated.

## Connections

- Compare with randomised-calibration of observational estimates in [[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]]: there the bias is estimated from the experiment, here it is postulated and calibrated.
- Propensity framework context: [[Propensity Score in Bayesian CI]], [[Propensity Score and the Balancing Property]]; experiments as benchmark: [[Experimental Benchmarks for Observational Ad Measurement]].

## See Also

[[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]], [[Sensitivity Analysis in Observational Studies]]
