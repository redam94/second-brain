---
title: SDID Estimator - Unit and Time Weights
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/panel-data
  - topic/synthetic-control
  - type/method
  - doc/paper
source: "[[raw/Arkhangelsky 2021 - Synthetic Difference in Differences.pdf]]"
source_location: "§2.1 (eqs. 2.1-2.5, Algorithm 1), pp. 5-11; §4.1 (eq. 4.3), p. 21; Appendix §7.2 (weight tables), pp. 44-45; Appendix §8, pp. 46-47"
date_ingested: 2026-09-18
folder: "Econometrics/Identification Strategies/Synthetic Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Synthetic Difference-in-Differences - Overview]]"
  - "[[Synthetic Control]]"
  - "[[Differences-in-Differences]]"
  - "[[Fixed-Effects Model]]"
used_by:
  - "[[SDID vs DiD vs Synthetic Control]]"
  - "[[SDID Inference - Bootstrap, Jackknife and Placebo]]"
  - "[[SDID for Geo Experiments and Marketing Panels]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
aliases:
  - SDID weights
  - SDID unit weights
  - SDID time weights
  - SDID Algorithm 1
  - weighted double-differencing estimator
---

# SDID Estimator - Unit and Time Weights

> [!summary]
> SDID is computed in four steps (Algorithm 1): (1) set a ridge penalty $\zeta$ from the scale of one-period outcome changes; (2) solve a penalised, intercept-augmented synthetic-control problem for **unit weights** $\hat\omega$ on the simplex; (3) solve the transposed problem — regress each control unit's *post-period average* on its *pre-period outcomes* — for **time weights** $\hat\lambda$ on the simplex; (4) run TWFE DiD weighted by $\hat\omega_i\hat\lambda_t$. Equivalently, $\hat\tau^{sdid}$ is a **weighted double difference** $\hat\tau(\omega,\lambda)$ of the four blocks of $Y$. The intercepts are what distinguish SDID weights from SC weights: they only need to make trends *parallel*, not *identical*, because the fixed effects absorb level gaps.

## Overview

Partition the outcome matrix by control/treated rows and pre/post columns:

$$
Y = \begin{pmatrix} Y_{co,pre} & Y_{co,post} \\ Y_{tr,pre} & Y_{tr,post} \end{pmatrix}
$$

SC uses $Y_{co,pre}$ to learn how to combine *rows* (units) to mimic the treated rows. SDID does that **and** uses $Y_{co,pre}, Y_{co,post}$ to learn how to combine *columns* (pre-periods) to mimic the post-period columns. The symmetry is the key idea: unit weights are a "vertical regression", time weights are a "horizontal regression", and both are fit only on cells that are never treated.

## Main Content

> [!definition] Unit weights (eq. 2.1) ^def-sdid-unit-weights
> $$
> (\hat\omega_0, \hat\omega^{sdid}) = \arg\min_{\omega_0\in\mathbb R,\ \omega\in\Omega}\ \sum_{t=1}^{T_{pre}} \left(\omega_0 + \sum_{i=1}^{N_{co}} \omega_i Y_{it} - \frac{1}{N_{tr}}\sum_{i=N_{co}+1}^{N} Y_{it}\right)^2 + \zeta^2\, T_{pre}\, \lVert\omega\rVert_2^2
> $$
> $$
> \Omega = \left\{\omega\in\mathbb R_+^N : \sum_{i=1}^{N_{co}}\omega_i = 1,\ \ \omega_i = N_{tr}^{-1}\ \text{for } i > N_{co}\right\}
> $$
> Two differences from Abadie–Diamond–Hainmueller weights: (a) the **intercept $\omega_0$** — the weighted controls need only be *parallel* to the treated average, since $\alpha_i$ in the final regression absorbs constant gaps; (b) the **ridge penalty**, following Doudchenko & Imbens (2016), which disperses the weights and makes them unique. With $\omega_0 = 0$ and $\zeta = 0$, (2.1) is exactly an ADH weight choice for $N_{tr}=1$.

> [!definition] Regularisation parameter (eq. 2.2) ^def-sdid-zeta
> $$
> \zeta = (N_{tr}T_{post})^{1/4}\,\hat\sigma, \qquad \hat\sigma^2 = \frac{1}{N_{co}(T_{pre}-1)}\sum_{i=1}^{N_{co}}\sum_{t=1}^{T_{pre}-1}\left(\Delta_{it}-\bar\Delta\right)^2, \qquad \Delta_{it} = Y_{i(t+1)} - Y_{it}
> $$
> $\hat\sigma$ is the standard deviation of first differences among controls in the pre-period — "the size of a typical one-period outcome change" — and $(N_{tr}T_{post})^{1/4}$ is a theoretically motivated scaling (Theorem 1 requires $(N_{tr}T_{post})^{1/2}\log N_{co} = o(\zeta^2)$). No cross-validation is involved.

> [!definition] Time weights (eq. 2.3) ^def-sdid-time-weights
> $$
> (\hat\lambda_0, \hat\lambda^{sdid}) = \arg\min_{\lambda_0\in\mathbb R,\ \lambda\in\Lambda}\ \sum_{i=1}^{N_{co}} \left(\lambda_0 + \sum_{t=1}^{T_{pre}} \lambda_t Y_{it} - \frac{1}{T_{post}}\sum_{t=T_{pre}+1}^{T} Y_{it}\right)^2
> $$
> $$
> \Lambda = \left\{\lambda\in\mathbb R_+^T : \sum_{t=1}^{T_{pre}}\lambda_t = 1,\ \ \lambda_t = T_{post}^{-1}\ \text{for } t > T_{pre}\right\}
> $$
> **No ridge penalty** here (only a numerical $\zeta = 10^{-6}\hat\sigma$ for uniqueness, fn. 3). The asymmetry "reflects the fact we allow for correlated observations within time periods for the same unit, but not across units within a time period" beyond the factor structure (p. 7). Interpretation: the weighted average of a control unit's history should predict its post-period average *up to a constant* $\lambda_0$.

> [!algorithm] Algorithm 1 — SDID ^alg-sdid
> **Input:** $Y$, $W$. **Output:** $\hat\tau^{sdid}$.
> 1. Compute $\zeta$ via (2.2).
> 2. Compute unit weights $\hat\omega^{sdid}$ via (2.1).
> 3. Compute time weights $\hat\lambda^{sdid}$ via (2.3).
> 4. Solve the weighted TWFE regression
> $$
> (\hat\tau^{sdid},\hat\mu,\hat\alpha,\hat\beta) = \arg\min \sum_{i,t} (Y_{it}-\mu-\alpha_i-\beta_t-W_{it}\tau)^2\,\hat\omega_i^{sdid}\hat\lambda_t^{sdid}
> $$
> **Covariates** (fn. 4): apply SDID to residuals $Y^{res}_{it} = Y_{it} - X_{it}\hat\beta$ from a regression of $Y_{it}$ on time-varying exogenous $X_{it}$.

> [!theorem] Weighted double-differencing representation (eqs. 2.4-2.5, 4.3) ^thm-sdid-double-diff
> For any $\omega\in\Omega$, $\lambda\in\Lambda$ define
> $$
> \hat\tau(\omega,\lambda) = \omega_{tr}^\top Y_{tr,post}\lambda_{post} - \omega_{co}^\top Y_{co,post}\lambda_{post} - \omega_{tr}^\top Y_{tr,pre}\lambda_{pre} + \omega_{co}^\top Y_{co,pre}\lambda_{pre}
> $$
> Then $\hat\tau^{did} = \hat\tau(\text{uniform},\text{uniform})$ and $\hat\tau^{sdid} = \hat\tau(\hat\omega^{sdid},\hat\lambda^{sdid})$. Equivalently, every estimator in the family is
> $$
> \hat\tau = \hat\delta_{tr} - \sum_{i=1}^{N_{co}}\hat\omega_i\hat\delta_i, \qquad \hat\delta_{tr} = \frac{1}{N_{tr}}\sum_{i>N_{co}}\hat\delta_i
> $$
> with unit-level "adjusted outcomes"
> $$
> \hat\delta_i^{sc} = \frac{1}{T_{post}}\sum_{t>T_{pre}} Y_{it}, \qquad
> \hat\delta_i^{did} = \frac{1}{T_{post}}\sum_{t>T_{pre}} Y_{it} - \frac{1}{T_{pre}}\sum_{t\le T_{pre}} Y_{it}, \qquad
> \hat\delta_i^{sdid} = \frac{1}{T_{post}}\sum_{t>T_{pre}} Y_{it} - \sum_{t\le T_{pre}}\hat\lambda_t^{sdid} Y_{it}
> $$
> So the final regression never has to be run as a regression: SDID is four weighted block means.

### What the intercepts and fixed effects buy: invariance

Because of $\omega_0$, $\lambda_0$ and the two-way fixed effects, $\hat\tau^{sdid}$ is unchanged if $L_{it}\leftarrow L_{it}+\alpha_i+\beta_t$ for *any* $\alpha_i,\beta_t$ (§4, p. 20). DiD shares this invariance; SC is invariant to $\beta_t$ shifts only (fn. 8). This is why SDID does not require the treated unit to lie in the convex hull of control *levels* — a classic SC failure mode discussed in [[Synthetic Control Requirements]].

### What the time weights do

Contrast three conventions for the pre-period baseline (p. 9):

- **DiD:** all pre-periods equally, $\lambda_t = 1/T_{pre}$.
- **Event studies:** only the last pre-period ($\lambda_{-1} = 1$), since coefficients are normalised to $\ell=-1$ — see [[Event Study Designs and Dynamic Treatment Effects]].
- **SDID:** data-driven. Periods are chosen so that "the weighted average of historical outcomes predict average treatment period outcomes for control units, up to a constant."

With serially correlated noise, the oracle time weights shrink not toward zero but toward the autoregression vector $\psi = \Sigma_{pre,pre}^{-1}\Sigma_{pre,post}\lambda_{post}$ (eq. 4.9) — the population coefficient from regressing the post-period average error on pre-period errors. This is why SDID can be **more precise than DiD even when TWFE is correctly specified**: it differences out the predictable part of the post-period noise.

### Staggered adoption (Appendix §8)

"With staggered adoption the weighted DID regression approach in SDID does not work directly." The paper's fix: for each adoption date $a$, form a block-assignment sub-panel of the never-treated units plus the cohort adopting at $a$; run SDID on each; average the estimates with weights equal to each sub-panel's share of treated unit-period cells. (Alternatively split by time periods.) This mirrors the cohort-by-cohort logic of [[Group-Time Average Treatment Effects]].

## Examples

**The California weights (Appendix §7.2).** Time weights put all mass on the last three pre-years:

| Year | DID $\lambda_t$ | SDID $\hat\lambda_t$ |
|---|---|---|
| 1988 | 0.053 | **0.427** |
| 1987 | 0.053 | **0.206** |
| 1986 | 0.053 | **0.366** |
| 1970–1985 | 0.053 each | 0.000 |

Unit weights: SC is sparse — Utah 0.396, Montana 0.232, Nevada 0.204, Connecticut 0.104, New Hampshire 0.045, Colorado 0.013, Delaware 0.004, everything else 0. SDID spreads mass across roughly 30 of 38 states (largest: Nevada 0.124, New Hampshire 0.105, Connecticut 0.078, Delaware 0.070), a consequence of the ridge penalty and the intercept. Figure 1 shows that under DiD and SC a single state (New Hampshire) has very high influence $\hat\omega_i(\hat\delta_{tr}-\hat\delta_i)$, whereas "SDID does not give any state particularly high influence."

**Code sketch** (NumPy/CVXPY; the double-difference form avoids fitting the regression):

```python
import numpy as np, cvxpy as cp

def sdid(Y, N0, T0):
    N, T = Y.shape; N1, T1 = N - N0, T - T0
    d = np.diff(Y[:N0, :T0], axis=1)
    sigma = d.std()                               # eq. (2.2): divisor N_co (T_pre - 1)
    zeta = (N1 * T1) ** 0.25 * sigma

    # unit weights: rows = pre-periods, cols = control units
    w, w0 = cp.Variable(N0, nonneg=True), cp.Variable()
    target = Y[N0:, :T0].mean(axis=0)
    cp.Problem(cp.Minimize(cp.sum_squares(w0 + Y[:N0, :T0].T @ w - target)
                           + zeta**2 * T0 * cp.sum_squares(w)),
               [cp.sum(w) == 1]).solve()

    # time weights: rows = control units, cols = pre-periods
    l, l0 = cp.Variable(T0, nonneg=True), cp.Variable()
    target_t = Y[:N0, T0:].mean(axis=1)
    cp.Problem(cp.Minimize(cp.sum_squares(l0 + Y[:N0, :T0] @ l - target_t)
                           + (1e-6 * sigma)**2 * N0 * cp.sum_squares(l)),
               [cp.sum(l) == 1]).solve()

    omega = np.r_[-w.value, np.ones(N1) / N1]     # signed unit contrast
    lam   = np.r_[-l.value, np.ones(T1) / T1]     # signed time contrast
    return omega @ Y @ lam, w.value, l.value      # eq. (4.3)
```

## Connections

- [[Synthetic Control]] — the $\omega_0=0,\ \zeta=0$ special case of the unit-weight problem.
- [[Synthetic Control Requirements]] — convex-hull and fit requirements that the intercept relaxes.
- [[Synthetic Control Extensions]] — penalised SC and augmented SC; with a linear outcome model $\hat m(Y_{i,pre}) = \hat\lambda_0 + Y_{i,pre}\hat\lambda_{pre}$ constrained to the simplex, augmented SC equals SDID-without-intercept (§6, eq. 6.1).
- [[Fixed-Effects Model]] — step 4 is a weighted TWFE regression.
- [[Covariate Balance and Matching Diagnostics]] — SDID weights are *balancing weights*, but for unobserved factors $\Gamma,\Upsilon$ rather than observed covariates (§6, p. 34).

## See Also

- [[SDID vs DiD vs Synthetic Control]]
- [[SDID Inference - Bootstrap, Jackknife and Placebo]]
- [[Generalized Synthetic Control Method]]
- [[Differences-in-Differences]]
