---
title: "Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/theorem
  - doc/paper
source: "[[raw/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method.pdf]]"
source_location: "Sec. 4, pp. 16-26; Eqs. 20-24; Figures 3-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method"
doc_type: paper
depends_on:
  - "[[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]]"
  - "[[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]]"
used_by:
  - "[[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]]"
  - "[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]"
aliases:
  - "increasing nonsmoothness Lee-Carter"
  - "Lee-Carter age profile fanning out"
  - "quadratic smoothness measure forecast"
---

# Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles

> [!summary]
> Lee-Carter and RWD forecasts are linear in time, so age-group lines fan out: any quadratic nonsmoothness $\tilde\mu_t'W\tilde\mu_t=\gamma_t^2\beta'W\beta\propto\gamma_t^2$ attains a minimum when $\gamma_t=0$ and then grows without bound, forecasting forward or backward. This is a property of the model, not the data, and applies for first or second differences, any n-th derivative, or deviation from any fixed baseline age profile.

## Main Content

> [!definition] Nonsmoothness measure (Eq. 21)
> $$\text{Nonsmoothness}(\mu_t)=\frac1{A-1}\sum_{a=2}^A(\mu_{at}-\mu_{a-1,t})^2.$$ Related to the variance of the profile. Second differences are indifferent to level and slope shifts ("swoosh rotation"). Generalisation: any quadratic form $\tilde\mu_t'W\tilde\mu_t$ with $W\succeq0$; for first differences $W$ is the tridiagonal matrix with ones on the diagonal (ends handled) and $-1$ on the adjacent bands.
^def-nonsmooth

> [!theorem] Universal increasing nonsmoothness (Eqs. 20-24)
> Let $\mu_{at}-\mu_{at_0}=(\gamma_t-\gamma_{t_0})\beta_a$ (Eq. 20) and $\tilde\mu_t=\gamma_t\beta$ the mean-adjusted profile. Then
> $$\text{Nonsmoothness}(\tilde\mu_t)=\tilde\mu_t'W\tilde\mu_t=\gamma_t^2\,\beta'W\beta\ \propto\ \gamma_t^2.$$ If $\gamma_t$ is monotone in $t$, nonsmoothness decreases until $\gamma_t=0$ and thereafter increases for ever; "no feature of the data or forecasting method for projecting the $\gamma_t$'s can make it stop". Because $\|\beta\|=1$, Rayleigh's characterisation gives the lower bound $\beta'W\beta\ge\lambda_1$ (first non-zero eigenvalue of $W$), so $\text{Nonsmoothness}\ge\lambda_1\gamma_t^2$ independent of the shape of $\beta$.
>
> *Proof sketch.* Quadratic form is homogeneous of degree 2 in the scalar $\gamma_t$; monotone $\gamma_t$ crosses zero at most once and $|\gamma_t|\to\infty$ along the linear forecast. $\square$
^thm-nonsmooth

**Why.** Mixed derivative $\partial^2\mu_{at}/\partial t\,\partial a=\gamma_t'\beta_a'$. With monotone $\gamma_t$, the sign of age-slope change is the sign of the derivative of $\beta_a$ in age; $\beta_a$ is rarely monotone in age (not one instance found), so some neighbouring ages move in opposite directions.

**Empirical patterns (Figures 3-4, 6 data sets).** Lines fan out: all-cause male New Zealand and Hungary, digestive disease (f) Hungary; lines converge, cross, then fan out: U.S. male suicide (age-profile inversion); near-parallel exception: Portugal male transport accidents. Implausible results: New Zealand 20-year-olds dying more than 40-year-olds; U.K. cervix cancer age profile loses biological plausibility. **Figure 5** shows the U-shaped nonsmoothness curve for forecasts (to 2060) and backcasts (to 1900) against in-sample data (U.S. female cardiovascular, Hungary male all-cause, U.S. male all-cause, Norway female cardiovascular, where one component explains only 29%).

**Consequences.** Cannot be used to study age-profile flattening (Lee and Miller 2001); cannot model convergence to a model life table (subtract baseline and nonsmoothness still grows); exaggerates differences in spending allocation; conflicts with insurers' graduation practice. Acceptable only with external knowledge that the profile should become less smooth.

## Examples

> [!example] U-shaped nonsmoothness in a synthetic Lee-Carter forecast
> Setup: synthetic 17-age, 50-year data as in the estimation note. Compute $\mu=\gamma\hat\beta$ at forecast horizons $-100..100$ in steps of 25 using first-difference $W$. Result: nonsmoothness $0.092,\ 0.042,\ 0.012,\ 0.0001,\ 0.008,\ 0.035,\ 0.081,\ 0.147,\ 0.231$; minimum near the horizon where $\hat\gamma=0$ (about 23 years before the last observation). Interpretation: at a horizon of 100 years the profile is orders of magnitude rougher (0.23 against about 0.0001) than at its minimum.
^ex-ushape
```python
import numpy as np
def nonsmooth(mu):                        # first-difference measure of Eq. 21
    return np.mean(np.diff(mu)**2)
# For tilde-mu = gamma*beta: nonsmooth = gamma**2 * np.mean(np.diff(beta)**2)  -> quadratic in gamma
```

## Connections
[[Girosi King 2007 - Lee-Carter as a Random Walk with Drift]], [[Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators]], [[Forecast Evaluation and Backtesting]].

## See Also
[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]
