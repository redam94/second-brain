---
title: "Unidentified Parameters - Keeping the Answer on the Question"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/concept
  - doc/concept
source: "concept note, no raw source (literature cited: Betancourt 2018 workflow case study; Vehtari, Gelman & Gabry 2017; Chan & Perry 2017; Gustafson 2015; Heath et al. 2015 in the vault)"
source_location: "Concept note for the PyMC example E62 'When the model cannot answer': general principles only; no claims about that example's specific results"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Unidentified Parameters and Question Contracts (concept)"
doc_type: concept
depends_on:
  - "[[Unidentified Parameters - Partial Identification and Bayesian Updating]]"
used_by: []
aliases:
  - question contract
  - prior swapping vs posterior contraction
  - baseline versus media non-identifiability
  - decisions robust across models
  - when the model cannot answer
---

# Unidentified Parameters - Keeping the Answer on the Question

> [!summary]
> When part of a model cannot be identified, keep the *answer* tied to a stated question: write the estimand and decision first, check which parts of the model the data can inform (prior swaps and posterior contraction), do not let predictive criteria such as LOO adjudicate between causal decompositions that predict equally well, test recovery on fake data, add the experiment that identifies the missing piece, and prefer decisions that survive across the plausible models. *Concept note for E62; the numbers below are this vault's own small calculations, not that example's results.*

## Overview

Motivating example (https://redam94.github.io/pymc-challenges/examples.html): **E62** "When the model cannot answer: unidentified parts, intractable models, and keeping the answer on the question". Its listed datasets are a US apparel MMM (147 weeks, Google + Meta), Capital Bikeshare hourly rentals (17,379 hours) and the ACTG 175 HIV trial (2,139 patients), and its listed techniques include question contracts, prior swapping vs contraction, ridge posteriors, baseline-vs-media non-identifiability that LOO cannot settle, fake-data recovery and the value of a lift test, decisions robust across models, and timing one gradient. This note gives the general logic of those techniques; see [[Unidentified Parameters - Partial Identification and Bayesian Updating]] for the theorem behind them.

## Main Content

### 1. Question contract
Before fitting, write down in a few lines:
- **Estimand**: e.g. "incremental weekly sales from Meta over the next quarter at current spend", with population, horizon and scale.
- **Decision**: the action the estimate informs (re-allocate budget? keep spend?), and what accuracy would change it.
- **What must be identified**: the model components the estimand depends on (the media response, not the full baseline).
- **What may stay unidentified**: components the estimand does not depend on; a model can leave these loose without harming the answer.
- **Evidence that would change the answer**: e.g. a lift test.

A model that cannot answer the question should say so, rather than return a precise-looking number whose width comes from a prior.

### 2. Prior swapping vs posterior contraction
Two diagnostics for "did the data inform this parameter?":
- **Prior swap**: refit under materially different priors for the parameter (e.g. SD 1, 2, 5). Answers that move with the prior are prior-driven. In the ridge example ([[Unidentified Parameters - Partial Identification and Bayesian Updating#^ex-ridge|ridge table]]) the posterior SD of $a$ was 0.71, 1.42, 3.54 for prior SD 1, 2, 5.
- **Contraction**: $1-\text{Var}_{post}/\text{Var}_{prior}$ (Betancourt 2018 workflow case study), near 1 when the data dominate and near 0 when they do not. Report it per parameter *that the question depends on*.
Both are cheap; neither requires a refit if you have prior and posterior draws (contraction), and prior swaps can reuse the same code.

### 3. Baseline vs media: a non-identification that LOO cannot settle
In an MMM, sales = baseline (trend, seasonality) + media response. If spend is collinear with the baseline (campaigns timed with growth or seasonality), many decompositions fit equally well. Leave-one-out predictive scores (PSIS-LOO; Vehtari, Gelman & Gabry 2017) assess predictive accuracy of $y$ given $x$; models that differ only in how they split a fitted total between baseline and media predict equally well and are indistinguishable by LOO, so a better LOO does not select the right causal split (see Chan & Perry 2017 on the difficulty of MMM identification; model comparison tools in [[LOO Model Checking and Comparison - Roaches]]).

> [!example] How collinearity widens the media coefficient and what a lift test buys
> $n=104$ weeks, $y_t=\alpha+\gamma t+\beta x_t+\varepsilon_t$, $\varepsilon\sim N(0,1)$, $x_t$ standardised spend with correlation $r$ to the time trend. Posterior SD of $\beta$ (flat or $N(0,10^2)$ priors, so essentially least squares), and with an independent lift-test measurement of $\beta$ with SD 0.1:
>
> | corr($x$, trend) | SD of $\beta$ without lift test | with lift test (SD 0.1) |
> |---|---|---|
> | 0.0 | 0.098 | 0.070 |
> | 0.894 | 0.219 | 0.091 |
> | 0.988 | 0.632 | 0.099 |
>
> Under strong collinearity the lift test turns an uninformative coefficient into one nearly as precise as the lift test itself; under no collinearity it adds little. (Illustrative calculation; real MMMs add adstock, saturation and seasonality.)
^ex-lift-test-value

```python
import numpy as np
rng = np.random.default_rng(2); n = 104; t = np.arange(n)/n
def sd_beta(rho, lift_sd=None):
    z = rng.normal(size=n); x = rho*(t-t.mean())/t.std() + np.sqrt(1-rho**2)*z; x = (x-x.mean())/x.std()
    A = np.column_stack([np.ones(n), t, x]); prec = A.T @ A + np.eye(3)/100
    if lift_sd: prec[2, 2] += 1/lift_sd**2
    return np.sqrt(np.linalg.inv(prec)[2, 2])
print([round(sd_beta(r), 3) for r in (0, .9, .99)], [round(sd_beta(r, .1), 3) for r in (0, .9, .99)])
```

### 4. Fake-data recovery
Simulate data from the model at known parameters (including the unidentified direction), fit the same code, and ask whether the *estimand* is recovered with calibrated intervals across many truths (simulation-based calibration; Talts et al. 2018), not whether every parameter is. Variation in the unidentified direction should show a wide posterior that still covers the truth. This is the Bayesian version of the "planted confounder" check in [[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]].

### 5. Decisions robust across models
Compute the *decision* (not only the estimate) under each plausible model or prior; if the optimal action is the same, the unidentified part does not matter for the question. If it changes, the expected value of resolving the uncertainty can be bounded (value of information; [[Heath 2015 - Review of Expected Value of Information Methods - Overview]]), which prices the lift test or experiment.

### 6. Intractable models: time one gradient first
For models that may be too slow (e.g. a cubic-cost Gaussian process), time a single log-density gradient before committing. NUTS performs up to $2^{\text{treedepth}}-1$ gradient evaluations per iteration (default maximum treedepth 10 gives up to 1023), so the cost of one gradient times a few hundred typical leapfrog steps times draws and chains forecasts the run time; if it is hopeless, switch to an approximation (inducing points, Vecchia, HSGP) rather than wait.

## Examples

> [!example] A question contract for a Meta halo claim
> *Estimand*: expected incremental weekly new customers if Meta spend is cut by 20% for 8 weeks, in the US. *Decision*: cut vs hold. *Must be identified*: Meta's marginal response at current spend (needs lift test or exogenous variation). *May stay loose*: the exact baseline seasonality shape. *Evidence that would change the answer*: a geo holdout. With strongly collinear spend and trend the model "cannot answer" the contract on its own; report the prior-driven interval and what the experiment would add.

## Connections

- Sensitivity analyses as explicit statements of the unidentified part: [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]], [[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]], [[Imai 2010 - Causal Mediation Analysis - Overview]].
- Combining observational estimates with experiments: [[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]].
- MMM priors: [[Bayesian Estimation and Priors for MMM]], [[Jin 2017 MMM - Prior Sensitivity Experiments on Beta and Half-Saturation]].

## See Also

[[Prior Predictive Checking]], [[Unidentified Parameters - Partial Identification and Bayesian Updating]]
