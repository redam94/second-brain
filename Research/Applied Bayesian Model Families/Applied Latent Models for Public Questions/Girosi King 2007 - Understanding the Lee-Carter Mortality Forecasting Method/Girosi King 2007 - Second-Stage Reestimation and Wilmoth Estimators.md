---
title: "Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/concept
  - doc/paper
source: "[[raw/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method.pdf]]"
source_location: "Sec. 5-6, pp. 26-30; Eqs. 25-27"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method"
doc_type: paper
depends_on:
  - "[[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]]"
  - "[[Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles]]"
used_by:
  - "[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]"
aliases:
  - "Lee-Carter second stage reestimation"
  - "Wilmoth weighted least squares Poisson MLE"
  - "Lee-Carter concluding remarks"
---

# Girosi King 2007 - Second-Stage Reestimation and Wilmoth Estimators

> [!summary]
> Lee and Carter's second stage re-solves $\gamma_t$ so that predicted total deaths equal observed deaths; this has 0, 1 or 2 solutions when the $\hat\beta_a$ differ in sign. Wilmoth's weighted least squares (weights $=$ deaths) is not a valid likelihood because the weight is random. His Poisson maximum-likelihood alternative is statistically sound and handles zero counts; the paper recommends it.

## Main Content

> [!definition] Second-stage reestimation (Eq. 25)
> For each $t$ choose $\hat\gamma_t^*$ to solve $d_t=\sum_ap_{at}\exp(\bar m_a+\hat\beta_a\hat\gamma_t^*)$, with $d_t=\sum_ad_{at}$ and $p_{at}$ the population at risk. Advantage: usable when only total deaths are known, consistent with life tables.
^def-second-stage

> [!theorem] Number of solutions
> If all $\hat\beta_a$ share one sign the right side is a sum of monotone exponentials with range $(0,\infty)$: exactly one solution. If signs differ the right side is a sum of increasing and decreasing exponentials, hence U-shaped with a strictly positive minimum: two solutions if $d_t$ exceeds the minimum, none if below. Sign changes are rare in all-cause mortality but common in cause-specific series, where re-estimation is "ill-advised". Lee and Miller's variant (match life expectancy at birth) has the same property and is not applicable to cause-specific data.
^thm-second-stage

> [!definition] Wilmoth's WLS and Poisson MLE (Eqs. 26-27)
> WLS: $\min_{\alpha,\beta,\gamma}\sum_{a,t}d_{at}(m_{at}-\alpha_a-\gamma_t\beta_a)^2$, which down-weights zero-death cells (they receive weight 0). Wilmoth reads it as a heteroskedastic normal likelihood with variance $\propto1/d_{at}$, which is incorrect because $d_{at}$ is a random variable; valid weights must be exogenous. Also: with unequal weights SVD no longer applies and multiple local optima may arise (even the unweighted problem has $2A$ local extrema on the unit sphere). **Poisson MLE:** $d_{at}\sim\text{Poisson}(p_{at}e^{\mu_{at}})$, $\mu_{at}=\alpha_a+\beta_a\gamma_t$, a standard MLE; Brouhns, Denuit and Vermunt (2002) implement it in LEM.
^def-wilmoth

**Concluding remarks.** The model's real insight: U.S. national log-mortality is nearly linear with highly correlated age groups. Over long periods the model "is guaranteed to violate the observed empirical patterns, and any fixed baseline prediction". Check that your data fit the single-factor structure and that the forecast properties match prior beliefs.

## Examples

> [!example] Two solutions to the second-stage equation
> Setup: two ages with $\hat\beta=(+0.7,-0.7)$, equal populations 1000, $\bar m=(\ln 0.01,\ln 0.01)$, so $d(\gamma)=10(e^{0.7\gamma}+e^{-0.7\gamma})\ge20$. Observed $d_t=25$. Solving $e^{0.7\gamma}+e^{-0.7\gamma}=2.5$ gives $\gamma=\pm0.99$ (two roots); $d_t=15$ gives none.
^ex-two-roots
```python
import numpy as np
from scipy.optimize import brentq
f = lambda g, d: 10*(np.exp(0.7*g)+np.exp(-0.7*g)) - d
print(brentq(f, 0, 5, args=(25,)), brentq(f, -5, 0, args=(25,)))   # about +0.99, -0.99
```

**PyMC-style Poisson/negative-binomial LC (untested).**
```python
with pm.Model():
    alpha = pm.Normal("alpha", -5, 3, shape=A); beta = pm.Dirichlet("beta", np.ones(A))   # sum 1 (Lee-Carter norm)
    drift = pm.Normal("drift", 0, 1); eps = pm.Normal("eps", 0, 0.1, shape=T)
    gamma = pm.Deterministic("gamma", pm.math.cumsum(drift + eps) - pm.math.mean(pm.math.cumsum(drift + eps)))
    mu = pm.math.exp(alpha[:, None] + beta[:, None] * gamma[None, :]) * exposure
    pm.Poisson("d", mu, observed=deaths)       # or NegativeBinomial for overdispersion
```

## Connections
[[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]], [[Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles]], [[Concept Note - Abridged Life Tables Years of Life Lost and the Counterfactual Path]], [[Missing Data Models]] (zero counts).

## See Also
[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]
