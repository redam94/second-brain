---
title: "Synthetic Control"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/concept
  - doc/tutorial
source: "[[raw/15 - Synthetic Control — Causal Inference for the Brave and True]]"
source_location: "Causal Inference for the Brave and True, Chapter 15"
date_ingested: 2026-04-10
folder: "Econometrics/Identification Strategies"
doc_type: tutorial
depends_on:
  - "[[Differences-in-Differences]]"
  - "[[The Selection Problem]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Instrumental Variables]]"
aliases:
  - synthetic controls
  - synthetic control method
---

# Synthetic Control

> [!summary]
> Synthetic control constructs a weighted combination of untreated units ("donor pool") that mimics the pre-treatment trajectory of the treated unit, then estimates the treatment effect as the divergence between treated and synthetic paths post-treatment. It is especially powerful when only a single treated unit (an aggregate like a state or country) is available, making standard DiD inference infeasible.

## Overview

[[Differences-in-Differences|Difference-in-differences]] requires multiple observations and a plausible control group. When data is aggregated to a single treated unit—a state, country, or city—the sample size collapses to 4 (2 groups × 2 periods), making standard errors undefined. Moreover, there may be no single untreated unit that is convincingly comparable to the treated one.

Synthetic control solves this by constructing a **synthetic** (fake) control unit as a convex combination of untreated units. It was described as *"the most important innovation in the policy evaluation literature in the last few years"* (Athey & Imbens, 2017). The method is intuitive enough that its application to California's Proposition 99 (1988 cigarette tax) appeared in the *Washington Post*.

## Formal Setup

> [!definition] Synthetic Control Setup
> Let $J+1$ units be observed over $T$ periods, with $T_0 < T$ pre-treatment periods. Unit $j=1$ is treated; units $j=2,\ldots,J+1$ are the **donor pool**. For each unit $j$ and period $t$, define:
> - $Y_{jt}^N$ = potential outcome without treatment
> - $Y_{jt}^I$ = potential outcome with treatment
>
> The treatment effect for unit 1 at time $t > T_0$ is:
> $$\tau_{1t} = Y_{1t}^I - Y_{1t}^N$$
> Since $Y_{1t}^I$ is observed but $Y_{1t}^N$ is counterfactual, we estimate $Y_{1t}^N$ from the donor pool.
^def-synth-setup

> [!definition] Synthetic Control Estimator
> A **synthetic control** is a weighted average of donor pool outcomes:
> $$\hat{Y}_{1t}^N = \sum_{j=2}^{J+1} w_j Y_{jt}$$
> where weights $W = (w_2,\ldots,w_{J+1})$ are chosen to minimise pre-treatment distance between treated unit and synthetic control.
^def-synth-estimator

## Two Approaches to Finding Weights

### 1. OLS (Unconstrained) — Overfits

When weights are found by ordinary least squares (no constraints), the synthetic control can match the pre-treatment period **perfectly** but typically overfits. With $J=38$ donor states, there are 38 free parameters, giving far too much flexibility. Post-treatment the synthetic control becomes erratic (high variance).

```python
from sklearn.linear_model import LinearRegression

# inverted: rows = time-feature pairs, columns = states
y = inverted[3].values          # California
X = inverted.drop(columns=3).values  # donor pool

weights_lr = LinearRegression(fit_intercept=False).fit(X, y).coef_
```

The OLS solution can assign negative weights and weights greater than 1—extrapolating outside the support of the data.

### 2. Constrained Optimisation (Convex Combination) — Preferred

To prevent extrapolation, restrict weights to be **non-negative and sum to one** (a convex combination). This forces the synthetic control to interpolate within the convex hull of the donor pool.

> [!definition] Constrained Synthetic Control
> Choose $W = (w_2,\ldots,w_{J+1})$ to minimise:
> $$\left\|X_1 - X_0 W\right\| = \left(\sum_{h=1}^{k} v_h \left(X_{h1} - \sum_{j=2}^{J+1} w_j X_{hj}\right)^2\right)^{1/2}$$
> subject to: $w_j \geq 0$ for all $j$, and $\sum_j w_j = 1$.
>
> Here $v_h$ weights the importance of each feature $h$. Setting all $v_h$ equal is common when features are on similar scales.
^def-constrained-synth

```python
from scipy.optimize import fmin_slsqp
from toolz import partial
import numpy as np

def loss_w(W, X, y) -> float:
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

Key properties of the constrained solution:
- **Sparse**: most weights are exactly 0; a few donor units carry all the weight.
- **Imperfect pre-treatment fit**: doesn't overfit, leaving a non-zero pre-treatment residual.
- **Smooth post-treatment trajectory**: synthetic control follows plausible counterfactual paths.

## Estimating the Treatment Effect

Once weights are found, the point estimate of the treatment effect at each post-treatment period is:

$$\hat{\tau}_{1t} = Y_{1t}^I - \hat{Y}_{1t}^N = Y_{1t}^I - \sum_{j=2}^{J+1} w_j Y_{jt}$$

For California's Proposition 99, by 2000 the estimated effect is approximately **−25 packs per capita**, meaning the tax reduced cigarette consumption by ~25 packs.

```python
calif_weights = get_w(X, y)
# california = state 3
calif_synth = (cigar.query("~california")
               .pivot(index='year', columns="state")["cigsale"]
               .values.dot(calif_weights))

# Treatment effect
effect = cigar.query("california")["cigsale"].values - calif_synth
```

## Inference via Placebo Tests (Fisher's Exact Test)

With small $J$ (~39 states), asymptotic inference is unavailable. **Placebo/permutation testing** provides a nonparametric alternative:

1. For each unit $j$ in the donor pool, pretend unit $j$ was treated and estimate a synthetic control.
2. Compute the "placebo effect" for each unit.
3. Compute the p-value as the fraction of placebo effects more extreme than the true effect:

$$PV = \frac{1}{N} \sum_j \mathbf{1}\{\hat{\tau}_{j,t^*} \leq \hat{\tau}_{\text{Calif},t^*}\}$$

**Quality filter**: units with high pre-treatment MSE are excluded before computing the p-value, since a poorly-fitted synthetic control tells us little. A typical threshold is $\text{MSE} < 80$.

```python
def pre_treatment_error(state):
    pre = state.query("~after_treatment")
    return ((pre["cigsale"] - pre["synthetic"])**2).mean()

# p-value (one-sided, lower tail)
effects_2000 = [
    state.query("year==2000").iloc[0]["cigsale"] 
    - state.query("year==2000").iloc[0]["synthetic"]
    for state in synthetic_states
    if pre_treatment_error(state) < 80
]
p_value = np.mean(np.array(effects_2000) < calif_effect)
# p_value ≈ 0.029 (1 of 35 placebo effects more extreme)
```

## Worked Example: California Proposition 99

> [!example] California Proposition 99 (1988 Cigarette Tax)
> **Setup**: California passed a 25-cent per pack cigarette tax in 1988. Data: 39 US states, 1970–2000. Features: `cigsale` (per-capita packs sold) and `retprice` (retail price). State 3 = California.
>
> **Synthetic control composition**: Only 5 of 38 donor states receive nonzero weight (sparse). States: 4 (8.5%), 19 (11.3%), 20 (10.5%), 21 (45.7%), 33 (24.0%).
>
> **Result**: The synthetic control closely tracks California pre-1988, then diverges post-1988. By 2000, California's consumption is ~25 packs/capita below the synthetic control.
>
> **Inference**: Placebo test p-value ≈ 0.029. Only 1 of 35 placebo states achieves an effect as large as California's, suggesting the result is statistically significant.
>
> **Interpretation**: Proposition 99 causally reduced cigarette consumption. The effect grew over time, consistent with a demand response to persistent higher prices.

## Connections

- **[[Differences-in-Differences]]**: Synthetic control is a generalization of DiD for aggregate data with a single treated unit. DiD assumes parallel trends; synthetic control explicitly constructs a comparison unit.
- **[[The Selection Problem]]**: Synthetic control addresses selection into treatment by constructing a unit with similar pre-treatment characteristics, analogous to matching.
- **Regression as synthetic control**: The OLS formulation shows that synthetic control is literally a regression of the treated unit on donor pool units, with the time dimension as observations. Constraining to non-negative weights summing to 1 prevents extrapolation.
- **[[Bayesian Difference in Differences]]**: Bayesian DiD provides a full posterior over the treatment effect; synthetic control uses permutation inference. For aggregate time-series, [[Counterfactual Inference]] via BART offers a related Bayesian approach.

## See Also

- [[Differences-in-Differences]] — the classical panel DiD estimator
- [[Bayesian Difference in Differences]] — Bayesian DiD with posterior over treatment effect
- [[Instrumental Variables]] — alternative identification when parallel trends fails
- [[Regression Discontinuity Designs]] — threshold-based identification
- [[Counterfactual Inference]] — Bayesian counterfactual prediction (COVID excess deaths)
- [[Nonparametric Causal Inference]] — BART-based Bayesian approach to counterfactual estimation; comparable goal but cross-sectional rather than aggregate time-series
- [[Directed Acyclic Graphs]] — the parallel trends assumption can be stated as a DAG restriction on the time-by-treatment interaction
