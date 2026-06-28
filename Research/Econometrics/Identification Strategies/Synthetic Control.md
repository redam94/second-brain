---
title: "Synthetic Control"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/concept
  - method/python
  - method/scipy
  - method/sklearn
  - doc/tutorial
source: "[[raw/15 - Synthetic Control — Causal Inference for the Brave and True]]"
source_location: "Full tutorial — Synthetic Control chapter of Python Causality Handbook"
date_ingested: 2026-04-11
folder: "Econometrics/Identification Strategies"
doc_type: tutorial
depends_on:
  - "[[Differences-in-Differences]]"
  - "[[The Selection Problem]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Counterfactual Inference]]"
  - "[[Randomization Inference - Overview]]"
aliases:
  - synthetic controls
  - Abadie-Diamond-Hainmueller
---

# Synthetic Control

> [!summary]
> Synthetic control is a causal inference method for single-treated-unit settings with aggregated panel data. Instead of finding one control unit, it builds a "synthetic" counterfactual as a convex combination (weighted average) of multiple untreated units, chosen to match the treated unit in the pre-treatment period. Called "the most important innovation in the policy evaluation literature in the last few years." Inference uses Fisher's Exact Test (permutation over placebo treatments).

## Overview

**The problem**: [[Differences-in-Differences]] requires disaggregated data and needs the parallel trends assumption. When we only have aggregated (city-level, state-level) panel data on a single treated unit, DiD has undefined standard errors (degrees of freedom issue) and may have no appropriate control unit.

**The solution**: Construct a *synthetic control* — a weighted combination of untreated units calibrated to match the treated unit's pre-treatment trajectory. Then compare the treated unit's post-treatment outcome to the synthetic control's.

## Formal Setup

> [!definition] Synthetic Control Estimator
> Suppose we have $J+1$ units. Unit 1 is treated; units $j = 2, \ldots, J+1$ form the **donor pool**. We observe outcomes $Y_{jt}$ for $T$ time periods, with $T_0$ periods before treatment.
>
> The **treatment effect** at time $t > T_0$ for the treated unit is:
> $$\tau_{1t} = Y_{1t}^I - Y_{1t}^N$$
>
> Since $Y_{1t}^I$ is observed but $Y_{1t}^N$ is not, we estimate:
> $$\hat{Y}_{1t}^N = \sum_{j=2}^{J+1} w_j Y_{jt}$$
>
> The weights $W = (w_2, \ldots, w_{J+1})$ are chosen so the synthetic control matches the treated unit in the pre-treatment period.
^def-synthetic-control

## Method 1: OLS / Unconstrained Regression

Treat the problem as an "upside-down" linear regression: instead of predicting an outcome from variables, we predict the treated unit from other units.

**Setup**: Pivot the data so each unit is a column and each time-period+feature combination is a row. Let $y$ = treated unit's values, $X$ = donor pool matrix.

Fit OLS to get weights:
```python
from sklearn.linear_model import LinearRegression

weights_lr = LinearRegression(fit_intercept=False).fit(X, y).coef_
```

**Problem**: With 38 states in the donor pool, OLS has 38 free parameters, leading to **overfitting** in the pre-treatment period (perfect fit) and wild extrapolation post-treatment. Negative and large positive weights create implausible "synthetic" units outside the data range.

## Method 2: Constrained Optimization (Convex Combination)

> [!definition] Constrained Synthetic Control
> The canonical synthetic control restricts weights to be a **convex combination**:
> $$w_j \geq 0, \quad \sum_{j=2}^{J+1} w_j = 1$$
>
> The optimal weights minimize:
> $$\|X_1 - X_0 W\| = \left(\sum_{h=1}^k v_h \left(X_{h1} - \sum_{j=2}^{J+1} w_j X_{hj}\right)^2\right)^{1/2}$$
>
> subject to $w_j \geq 0$, $\sum_j w_j = 1$, where $v_h$ reflect the importance of each predictor variable.
>
> **Why convex?** This restricts the synthetic control to **interpolation** (within the convex hull of control units) rather than extrapolation, producing more credible counterfactuals.
^def-constrained-synth

> [!example] California Cigarette Taxation (Proposition 99)
> **Setup**: California passed Proposition 99 in 1988 (25 cent/pack cigarette tax). We want to estimate the effect on cigarette sales. Data: 1970–2000, 39 US states. California is treated; 38 others form the donor pool.
>
> **Features**: `cigsale` (per-capita cigarette sales in packs) and `retprice` (retail price).
>
> ```python
> from scipy.optimize import fmin_slsqp
> from functools import partial
>
> def loss_w(W, X, y) -> float:
>     return np.sqrt(np.mean((y - X.dot(W))**2))
>
> def get_w(X, y):
>     w_start = [1/X.shape[1]] * X.shape[1]
>     weights = fmin_slsqp(
>         partial(loss_w, X=X, y=y),
>         np.array(w_start),
>         f_eqcons=lambda x: np.sum(x) - 1,  # sum to 1
>         bounds=[(0.0, 1.0)] * len(w_start),  # non-negative
>         disp=False
>     )
>     return weights
>
> # Pivot data: columns = states, rows = (feature × year)
> inverted = (cigar.query("~after_treatment")
>             .pivot(index='state', columns="year")[features]
>             .T)
>
> y = inverted[3].values      # California = state 3
> X = inverted.drop(columns=3).values  # donor pool
> calif_weights = get_w(X, y)
> ```
>
> **Result**: Only 5 states get non-zero weight (sparse solution). Synthetic control closely tracks California pre-1988 without overfitting. Post-1988: the synthetic control is ~25 packs/year higher than actual California by 2000.
>
> **Interpretation**: Proposition 99 reduced cigarette consumption by approximately 25 packs per capita per year by 2000, and the effect grew over time.
^ex-california-prop99

### Why the Convex Constraint Helps

The convex constraint prevents extrapolation. The synthetic control is projected onto the **convex hull** of control units. This:
- Produces smoother, more credible post-treatment trajectories
- Creates **sparse** weights (many zeros) — only a few states matter
- Does NOT achieve perfect pre-treatment fit (by design — not overfitting)

## Inference: Fisher's Exact Test

Standard errors are not well-defined for $n=1$ treated unit. Instead, use **permutation inference**:

> [!definition] Fisher's Exact Test for Synthetic Control
> 1. For each control state $j \in \{2, \ldots, J+1\}$, pretend it is the treated unit and compute its synthetic control using the remaining states as the donor pool.
> 2. Compute the **placebo treatment effect** for each state: $\hat{\tau}_{jt} = Y_{jt} - \hat{Y}_{jt}^N$
> 3. Compute the P-value:
> $$\text{PV} = \frac{1}{N}\sum_{j} \mathbf{1}\{\hat{\tau}_\text{Calif} > \hat{\tau}_j\}$$
>
> **Intuition**: If no state was actually treated, the estimated effect should be near zero for all states. If the California effect is extreme relative to these "placebo" effects, it is statistically significant.
^def-fishers-exact-synth

> [!example] Inference for Proposition 99
> ```python
> from joblib import Parallel, delayed
>
> def synthetic_control(state: int, data: pd.DataFrame) -> pd.DataFrame:
>     """Compute synthetic control for a given state and return outcome + synthetic."""
>     inverted = (data.query("~after_treatment")
>                 .pivot(index='state', columns="year")[features].T)
>     y = inverted[state].values
>     X = inverted.drop(columns=state).values
>     weights = get_w(X, y)
>     synthetic = (data.query(f"~(state=={state})")
>                  .pivot(index='year', columns="state")["cigsale"]
>                  .values.dot(weights))
>     return (data.query(f"state=={state}")[["state","year","cigsale","after_treatment"]]
>             .assign(synthetic=synthetic))
>
> # Parallel computation for all 39 states
> control_pool = cigar["state"].unique()
> synthetic_states = Parallel(n_jobs=8)(
>     delayed(partial(synthetic_control, data=cigar))(state)
>     for state in control_pool
> )
>
> # Pre-treatment MSE filter (remove poorly fitted states)
> def pre_treatment_error(state):
>     pre = state.query("~after_treatment")
>     return ((pre["cigsale"] - pre["synthetic"]) ** 2).mean()
>
> # P-value: proportion of placebo effects more extreme than California's
> effects = [state.query("year==2000").iloc[0]["cigsale"]
>            - state.query("year==2000").iloc[0]["synthetic"]
>            for state in synthetic_states
>            if pre_treatment_error(state) < 80]
>
> calif_effect = cigar.query("california & year==2000").iloc[0]["cigsale"] - calif_synth[-1]
> # calif_effect ≈ -24.83
>
> p_value = np.mean(np.array(effects) < calif_effect)
> # p_value ≈ 0.029 (1 in 35 placebos more extreme)
> ```
>
> **Conclusion**: California's treatment effect of −24.83 packs is more extreme than 34 of 35 placebo effects. P-value ≈ 0.029 — statistically significant at 5%.

## Comparison: Synthetic Control vs. DiD

| Aspect | Difference-in-Differences | Synthetic Control |
|--------|--------------------------|-------------------|
| Number of treated units | Multiple (or few) | Ideally one |
| Data level | Disaggregated OK | Often aggregated |
| Control selection | Pre-specified | Data-driven weighted combination |
| Key assumption | Parallel trends | Pre-treatment fit |
| Inference | Standard errors | Fisher's Exact Test (permutation) |
| Overfitting concern | Lower | High (use convex constraint) |

## Key Ideas

1. **Single-unit treatment** with aggregated panel data → standard DiD fails
2. **Synthetic control** = weighted average of donor pool, weights chosen to match pre-treatment trajectory
3. **OLS** → overfits; **constrained optimization** (convex combination) → sparser, more credible weights
4. **Inference via permutation**: pretend each control unit was treated, build its synthetic control, see how extreme the true effect is relative to placebo effects
5. **Pre-treatment fit quality**: remove units with high pre-treatment error before the permutation test

## Connections

- [[Differences-in-Differences]] — The predecessor method; synthetic control extends DiD to aggregated data settings
- [[The Selection Problem]] — Synthetic control is another solution to the problem of unobservable counterfactuals
- [[Counterfactual Inference]] — Bayesian perspective on estimating counterfactual trajectories
- [[Bayesian Difference in Differences]] — Bayesian approach to similar problem; posterior over treatment effect
- [[Abadie 2021 - Overview]] — methodological overview and guidance on when synthetic control is appropriate
- [[Generalized Synthetic Control Method]] — extends synthetic control to multiple treated units via interactive fixed effects

## See Also

- [[Differences-in-Differences]] — DiD for panel data with multiple units
- [[Bayesian Difference in Differences]] — PyMC-based Bayesian DiD with explicit counterfactual
- [[The Experimental Ideal]] — Why causal inference requires explicitly modeling the counterfactual
- [[Synthetic Control Requirements]] — formal conditions a valid synthetic control application must satisfy
- [[Synthetic Control Bias Theory]] — bias sources and formal properties of the synthetic control estimator
- [[Synthetic Control Extensions]] — extensions including penalized synthetic control and matrix completion
- [[Synthetic Control Inference and Diagnostics]] — inference methods and diagnostic plots beyond the basic Fisher test
- [[Generalized Synthetic Control Method]] — interactive fixed effects generalization for multiple treated units
- [[Abadie 2021 - Overview]] — Abadie's methodological overview and best-practices guidance
- [[Randomization Inference - Overview]] — the general theory behind the placebo/permutation inference used here
