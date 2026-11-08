---
title: "Krause 2008 - GP Model and Posterior Variance"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/definition
  - doc/paper
source: "[[raw/Krause Singh Guestrin 2008 - Near-Optimal Sensor Placements in Gaussian Processes.pdf]]"
source_location: "Sec. 2, pp. 238-241"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes"
doc_type: paper
depends_on:
  - "[[Gaussian Process Regression]]"
used_by:
  - "[[Krause 2008 - Entropy versus Mutual Information Criteria]]"
  - "[[Krause 2008 - Greedy Algorithm and the 1-1 over e Guarantee]]"
aliases:
  - GP posterior variance independent of observations
---

# Krause 2008 - GP Model and Posterior Variance

> [!summary]
> The field is modelled as a GP with mean $M(\cdot)$ and kernel $K(\cdot,\cdot)$; conditioning on sensors at $A$ gives a Gaussian whose mean and variance are Eqs. (1)-(2). The key structural fact is that the posterior variance **does not depend on the observed values**, so placement can be designed before any data arrive.

## Overview

Section 2 motivates a GP over the geometric disk model with the Intel Berkeley deployment: 54 temperature nodes (46 used in experiments), two central areas uninstrumented and therefore showing higher posterior variance (Fig. 2). GPs "generalize Kriging estimators commonly used in geostatistics" (Cressie, 1991).

## Main Content

> [!definition] Gaussian process
> For every finite $A\subseteq V$, $X_A\sim N(\mu_A,\Sigma_{AA})$ with $\mu_u=M(u)$ and $(\Sigma_{AA})_{uv}=K(u,v)$ for a symmetric positive-definite kernel $K$.
^def-gp-krause

> [!theorem] Conditional distribution (Eqs. 1-2)
> Given $X_A=x_A$, the value at $y\in V$ is Gaussian with
> $$\mu_{y\mid A}=\mu_y+\Sigma_{yA}\Sigma_{AA}^{-1}(x_A-\mu_A),\qquad \sigma^2_{y\mid A}=K(y,y)-\Sigma_{yA}\Sigma_{AA}^{-1}\Sigma_{Ay}.$$
> $\sigma^2_{y\mid A}$ does not depend on $x_A$. *Consequence* (stated in Sec. 3.1 and Sec. 10): a sequential closed-loop design is equivalent to an open-loop design when the kernel is known.
^thm-gp-conditional

*Measurement noise.* Sensors observe $Y_i=X_i+\epsilon_i$ with independent noise variance $\sigma^2$; in the formulas that means adding $\sigma^2$ on the diagonal of $\Sigma_{AA}$ for observed locations (Lemma 5 assumes noise variance at least $\sigma^2$). This is the "kriging with known measurement error" setup used in E89.

*Stationarity.* Stationary: $K(u,v)=K_\theta(u-v)$; isotropic: $K_\theta(\|u-v\|_2)$, e.g. exponential $\exp(-|\delta|/\theta)$ or Gaussian $\exp(-\delta^2/\theta^2)$. Real data violate both (Fig. 1b,c: correlations can even be negative). The authors do not assume stationarity: they estimate a nonstationary kernel from an initial deployment by the Nott and Dunsmuir (2002) method, in which the process is locally described by isotropic processes around reference points and an empirical covariance $\Sigma_{AA}$ is available (Fig. 3). Section 9.2 shows nonstationary models give far better prediction.

## Examples

Posterior variance after one noisy sensor at the origin of a unit-variance field with correlation $\rho$ and noise $\sigma^2=0.1$: $\sigma^2_{y\mid A}=1-\rho^2/(1+0.1)$, independent of the reading.

```python
import numpy as np
def post_var(K, A, y, s2):
    """K: prior covariance of the latent field; A: observed indices; noise var s2."""
    if not A: return K[y, y]
    S = K[np.ix_(A, A)] + s2*np.eye(len(A))
    return K[y, y] - K[y, A] @ np.linalg.solve(S, K[A, y])
```

## Connections
- Full GP background: [[Gaussian Process Regression]]. Scaling to large fields: [[Hilbert Space Gaussian Processes]].
- PyMC sketch (untested): `gp = pm.gp.Marginal(cov_func=eta**2 * pm.gp.cov.Matern32(2, ls)); y_ = gp.marginal_likelihood("y", X=Xobs, y=yobs, sigma=sigma_known)` fixes the measurement-error SD at a known value.

## See Also
- [[Krause 2008 - Near-Optimal Sensor Placements in Gaussian Processes - Overview]]
