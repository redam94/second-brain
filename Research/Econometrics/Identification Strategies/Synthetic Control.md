---
title: Synthetic Control Method
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/tutorial
  - method/python
source: "[[raw/15 - Synthetic Control — Causal Inference for the Brave and True]]"
source_location: "Causal Inference for the Brave and True, Chapter 15"
date_ingested: 2026-04-10
folder: "Econometrics/Identification Strategies"
doc_type: tutorial
depends_on:
  - "[[Differences-in-Differences]]"
  - "[[The Selection Problem]]"
  - "[[Counterfactual Inference]]"
used_by:
  - "[[Bayesian Difference in Differences]]"
aliases:
  - synthetic control
  - synth
---

# Synthetic Control Method

> [!summary]
> The synthetic control method constructs a weighted combination of untreated units (the "donor pool") to serve as a counterfactual for a single treated unit. It is "the most important innovation in the policy evaluation literature in the last few years" and excels when [[Differences-in-Differences]] fails due to small aggregate samples or weak natural control groups.

## Overview

When data are aggregated at the unit level (e.g., a single state or country), [[Differences-in-Differences]] becomes unreliable because the sample size may equal the number of parameters, leaving standard errors undefined. Additionally, it can be hard to justify that any single untreated unit is a valid counterfactual.

Synthetic control solves this by **forging a custom control unit** as a convex combination of many untreated units in a "donor pool," using pre-treatment outcome data to calibrate the weights. The method is powerful precisely because it does not require assuming any single unit is comparable to the treated unit.

**Canonical example**: Evaluating California's 1988 Proposition 99 (a 25¢/pack tobacco tax) using 38 other US states as the donor pool.

## Main Content

### Setup and Notation

> [!definition] Synthetic Control Setup
> Suppose we observe $J+1$ units over $T$ time periods, with $T_0 < T$ periods before the intervention. Unit $j=1$ is treated; units $j = 2, \ldots, J+1$ form the **donor pool**. For unit $j$ at time $t$, define:
> - $Y_{jt}^I$ — potential outcome **with** the intervention
> - $Y_{jt}^N$ — potential outcome **without** the intervention
>
> For the treated unit post-intervention, $Y_{1t}^I$ is observed but $Y_{1t}^N$ is the unobserved counterfactual. The **treatment effect** at each post-treatment period $t > T_0$ is:
> $$\tau_{1t} = Y_{1t}^I - Y_{1t}^N$$

^def-synth-setup

> [!definition] Synthetic Control Estimator
> A **synthetic control** is a weighted average of the donor pool units:
> $$\hat{Y}_{1t}^N = \sum_{j=2}^{J+1} w_j Y_{jt}$$
> where weights $W = (w_2, \ldots, w_{J+1})$ are chosen to minimize the pre-treatment discrepancy between unit 1 and the synthetic composite.

^def-synth-estimator

### Synthetic Control as Linear Regression

An intuitive way to view synthetic control: it is **transposed regression**. In ordinary regression, time periods are rows and units are variables. In synthetic control, we flip the matrix — units become columns and time periods become rows — so we "predict" the treated unit's pre-treatment outcomes using the donor units.

**Unconstrained OLS approach** (not recommended in practice):

```python
from sklearn.linear_model import LinearRegression
weights_lr = LinearRegression(fit_intercept=False).fit(X, y).coef_
```

With many donor units (large $J$), unconstrained OLS overfits the pre-treatment period perfectly but produces wildly extrapolated and volatile post-treatment estimates. Negative weights create "fake" states with impossible values.

### Constrained Weights: The Simplex Constraint

> [!definition] Convex Combination Constraint
> To prevent extrapolation, we restrict the weights to lie in the **probability simplex**:
> $$w_j \geq 0 \quad \text{and} \quad \sum_{j=2}^{J+1} w_j = 1$$
> The optimal weights minimize the pre-treatment fit loss:
> $$\hat{W} = \arg\min_W \left\| X_1 - X_0 W \right\|_V = \arg\min_W \left( \sum_{h=1}^{k} v_h \left( X_{h1} - \sum_{j=2}^{J+1} w_j X_{hj} \right)^2 \right)^{1/2}$$
> subject to $w_j \geq 0$, $\sum_j w_j = 1$.
> Here $v_h$ reflects the importance of predictor $h$; common choices are equal weights ($v_h = 1/k$) or weights that maximize pre-treatment predictive accuracy.

^def-simplex-constraint

**Key properties of constrained weights:**
- **Sparse**: the solution projects the treated unit onto the convex hull of donor units, touching only a few "walls" → most $w_j = 0$
- **No extrapolation**: the synthetic control stays within the range of observed data
- **Imperfect pre-treatment fit** (by design): underfitting in-sample is a feature, not a bug — it signals we are not overfitting

**Python implementation** using `scipy.optimize.fmin_slsqp`:

```python
from scipy.optimize import fmin_slsqp
from functools import partial
import numpy as np

def loss_w(W, X, y):
    return np.sqrt(np.mean((y - X.dot(W))**2))

def get_w(X, y):
    w_start = [1/X.shape[1]] * X.shape[1]
    weights = fmin_slsqp(
        partial(loss_w, X=X, y=y),
        np.array(w_start),
        f_eqcons=lambda x: np.sum(x) - 1,
        bounds=[(0.0, 1.0)] * len(w_start),
        disp=False
    )
    return weights
```

### Estimating the Treatment Effect

Once the synthetic control is built from the pre-treatment period, the estimated **treatment effect at each post-treatment period** is:

$$\hat{\tau}_{1t} = Y_{1t}^I - \hat{Y}_{1t}^N = Y_{1t} - \sum_{j=2}^{J+1} \hat{w}_j Y_{jt}, \quad t > T_0$$

In the Proposition 99 example, the gap between California and its synthetic control grows to approximately **25 fewer packs per capita** by year 2000, suggesting the tobacco tax substantially reduced consumption.

### Inference: Permutation / Placebo Tests

With small $N$ (e.g., 39 states), classical asymptotic inference is invalid. Synthetic control uses **Fisher-style permutation inference**:

1. For each donor unit $j$ in the pool, pretend it is the "treated" unit while all others (including California) are controls.
2. Estimate a synthetic control and compute the placebo treatment effect path.
3. The p-value for California's effect is the fraction of placebo effects at least as large.

> [!example] Placebo Test for Proposition 99
> **Setup**: 39 states; California is unit 3 (treated after 1988).
> **Method**: Apply `synthetic_control(state, data)` to each of the 39 states using parallel computation.
> **Result**: California's post-1988 gap (≈ −25 packs) is far outside the distribution of placebo gaps, providing strong evidence that the effect is not due to chance.

```python
from joblib import Parallel, delayed

def synthetic_control(state, data):
    features = ["cigsale", "retprice"]
    inverted = (data.query("~after_treatment")
                .pivot(index='state', columns="year")[features].T)
    y = inverted[state].values
    X = inverted.drop(columns=state).values
    weights = get_w(X, y)
    synthetic = (data.query(f"~(state=={state})")
                 .pivot(index='year', columns="state")["cigsale"]
                 .values.dot(weights))
    return (data.query(f"state=={state}")[["state","year","cigsale","after_treatment"]]
            .assign(synthetic=synthetic))

control_pool = cigar["state"].unique()
synthetic_states = Parallel(n_jobs=8)(
    delayed(synthetic_control)(state, cigar) for state in control_pool
)
```

## Comparison to Difference-in-Differences

| Aspect | DiD | Synthetic Control |
|--------|-----|------------------|
| Number of treated units | Many preferred | Works with $N=1$ |
| Data granularity | Disaggregated | Works with aggregated data |
| Control selection | Single comparison group | Convex combination of many units |
| Inference | Standard SEs / clustering | Permutation / placebo tests |
| Extrapolation | No formal constraint | Constrained by simplex (no extrapolation) |
| Transparency | Parallel trends assumption | Pre-treatment fit is directly visible |

## Connections

- **[[Differences-in-Differences]]**: Synthetic control generalizes DiD to the single-treated-unit case and replaces the parallel trends assumption with an explicit pre-treatment fit criterion.
- **[[Counterfactual Inference]]**: Both frame causal inference as estimating unobserved potential outcomes; synthetic control makes the counterfactual trajectory explicit.
- **[[The Selection Problem]]**: Synthetic control attacks the selection problem by constructing a data-driven control rather than assuming one exists naturally.
- **[[Bayesian Difference in Differences]]**: Bayesian approaches can place a prior over the post-treatment gap, complementing synthetic control's frequentist permutation inference.
- **[[Regression and the CEF]]**: The weight estimation is equivalent to constrained regression, making the link between regression and synthetic control precise.

## See Also

- [[Differences-in-Differences]] — the simpler predecessor method; use when many treated units or disaggregated data are available
- [[Counterfactual Inference]] — Bayesian approach to estimating counterfactual trajectories
- [[Bayesian Difference in Differences]] — Bayesian posterior over treatment effect; analogous goal via different means
- [[Instrumental Variables]] — alternative identification strategy when selection into treatment is endogenous
