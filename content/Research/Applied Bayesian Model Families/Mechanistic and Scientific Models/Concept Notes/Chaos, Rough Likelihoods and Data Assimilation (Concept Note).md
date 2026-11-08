---
title: "Chaos, Rough Likelihoods and Data Assimilation (Concept Note)"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/chaotic-dynamics
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source; primary literature Wood 2010 (Nature 466:1102-1104), already ingested in the vault as [[Synthetic Likelihood - Overview]]"
source_location: "Synthesis note"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Concept Notes"
doc_type: concept
depends_on:
  - "[[Chaos and Phase-Insensitive Statistics]]"
  - "[[Synthetic Likelihood Construction]]"
used_by:
  - "[[Likelihoods Built on Differential Equations (Concept Note)]]"
aliases:
  - chaotic dynamics inference
  - multiple shooting
  - data assimilation
  - Lyapunov exponent likelihood
---

# Chaos, Rough Likelihoods and Data Assimilation (Concept Note)

> [!summary]
> Concept note, no raw source (the vault already holds Wood 2010 and its synthetic-likelihood notes; this note links them to the PyMC examples E46 and E47). In a chaotic system a tiny parameter change moves the simulated trajectory far from the data after a few Lyapunov times, so the *trajectory-matching likelihood is rough with many local optima*. Three fixes: compare phase-insensitive summary statistics (synthetic likelihood), shorten the horizon (multiple shooting / data assimilation), or model process noise so the state is re-anchored to data.

## Overview

For a state $x_{t+1}=F(x_t;\theta)$ with largest Lyapunov exponent $\lambda>0$, two trajectories started $\epsilon$ apart separate like $\epsilon e^{\lambda t}$. A deterministic likelihood $\prod_t p(y_t\mid x_t(\theta,x_0))$ over a long series therefore depends on $\theta$ and $x_0$ in a fractal way; gradients are huge or meaningless and HMC/optimizers find local optima everywhere. Wood (2010) demonstrated this on the chaotic Ricker map and Nicholson's blowflies ([[Nicholson's Blowfly Application]]).

## Main Content

> [!definition] Ricker map with observation noise (Wood 2010 benchmark)
> $N_{t+1}=r\,N_t\,e^{-N_t+e_t}$, $e_t\sim N(0,\sigma_e^2)$ (process noise); $y_t\sim\text{Poisson}(\phi N_t)$ (observation). For $\log r$ above about 2.69 the noise-free map is chaotic. With $\sigma_e=0$, the likelihood in $(r,\phi)$ has a razor-edged surface; with process noise it is well defined but intractable (latent $N_t$), so use particle methods or likelihood-free approaches.
^def-ricker-benchmark

| Strategy | Idea | Where it appears | Trade-off |
|---|---|---|---|
| Synthetic likelihood | Compute summary statistics $s(y)$ insensitive to phase (autocovariances, quantiles, regression coefficients of the nonlinear dynamics); model $s\mid\theta\sim N(\mu_\theta,\Sigma_\theta)$ from simulations | [[Synthetic Likelihood - Overview]], [[Chaos and Phase-Insensitive Statistics]] | Statistics lose information; Gaussianity of $s$ must be checked |
| Neural simulation-based inference | Learn posterior/likelihood/ratio from simulations | [[Neural Simulation-Based Inference - Overview]] | Needs many simulations; coverage must be checked |
| Multiple shooting | Split $[0,T]$ into windows with free initial states $x_{0,k}$ and add continuity penalties/constraints | Standard in ODE parameter estimation (Bock 1981); Bayesian versions treat window starts as parameters | More parameters, but each window's likelihood is smooth |
| Data assimilation (state-space) | Filter/smooth the latent state with process noise: EnKF, particle filters, 4D-Var | Weather forecasting: Lorenz-63 in E47; see [[State-Space Models and the Kalman Filter - Overview]] | Needs a process-noise model; linear-Gaussian only for the Kalman filter |
| Particle MCMC | Unbiased likelihood estimate from a particle filter inside Metropolis-Hastings (Andrieu, Doucet & Holenstein 2010) | Nonlinear state-space models | Cost, variance of the estimate must be controlled |

### Why process noise rescues the likelihood

With $x_{t+1}=F(x_t)+\eta_t$ the state is re-anchored each step by the data and the likelihood is a product of one-step-ahead predictive densities; prediction error does not accumulate exponentially, so the surface is smooth in $\theta$. The price is that the *dynamics* are no longer deterministic: you are fitting a stochastic model, and parameter meaning changes accordingly.

### Control and prediction (E46, E47 themes)

Prediction horizon is limited by $1/\lambda$ regardless of inference quality (a few Lyapunov times), so posterior predictive intervals must widen with lead time; "regime control" in Lorenz-63 means nudging the system between its two lobes using the posterior over the current state, which is a decision problem on top of assimilation ([[Decision Analysis]]).

## Examples

**Lyapunov exponent of the Ricker map and the rough likelihood (NumPy; runs).**
```python
import numpy as np
def ricker_traj(logr, N0=1.0, T=60):
    r = np.exp(logr); N = np.empty(T); N[0] = N0
    for t in range(T-1): N[t+1] = r*N[t]*np.exp(-N[t])
    return N
def lyap(logr, T=2000):
    r = np.exp(logr); N = 0.5; s = 0.0
    for _ in range(T):
        s += np.log(abs(1 - N)) + logr - N           # log|d/dN of N' = r N e^{-N}| = log|r e^{-N}(1-N)|
        N = r*N*np.exp(-N)
    return s/T
for lr in (2.0, 3.8, 4.0): print(lr, round(lyap(lr), 3))      # about -0.002, 0.545, 0.508 (verified): near zero or negative -> stable; positive -> chaos
# Trajectory-matching "likelihood" in log r after 60 steps:
y = ricker_traj(3.8); grid = np.linspace(3.79, 3.81, 9)
print(np.round([np.sum((ricker_traj(g) - y)**2) for g in grid], 1))   # [2775 1310 2234 1666 0 3453 2895 3200 3592] (verified): wild, non-monotone around the truth
```
The squared-error profile near the true value is erratic rather than a smooth bowl.

## Relevance to marketing measurement

Real marketing series are not chaotic in this strict sense, but any model with strong nonlinear feedback (competitive response, saturation with delayed adstock) can produce rough likelihood surfaces; the remedy is the same: short-horizon one-step-ahead prediction (state-space form) over long-horizon trajectory matching. See [[Linear-Gaussian State-Space Models]] and [[Marginal Likelihood via the Kalman Filter]].

## Connections

[[Chen 2018 - Scope, Limitations and Statistical Use]] (adjoint reconstruction error grows with $e^{\lambda t}$ in chaotic systems), [[ODE Filters and Smoothers]], [[Challenge of Multimodality - Differential Equation for Planetary Motion]].

## See Also

[[Likelihoods Built on Differential Equations (Concept Note)]], [[Neural Likelihood Estimation and Sequential Neural Likelihood]].
