---
title: "Chen 2018 - Latent ODE Time-Series Model"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/neural-odes
  - type/definition
  - doc/paper
source: "[[raw/Chen 2018 - Neural Ordinary Differential Equations.pdf]]"
source_location: "Sec. 5, pp. 6-8; Appendices E-F; Table 2; Figs. 6-9"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chen 2018 - Neural ODEs"
doc_type: paper
depends_on:
  - "[[Chen 2018 - Adjoint Sensitivity Method]]"
  - "[[Variational Inference - Overview]]"
used_by:
  - "[[Chen 2018 - Scope, Limitations and Statistical Use]]"
aliases:
  - latent ODE
  - continuous-time generative time series model
---

# Chen 2018 - Latent ODE Time-Series Model

> [!summary]
> Each time series is a latent ODE trajectory: a per-series initial state $z_{t_0}$ drawn from a prior, a *shared* neural-network vector field $f$, and observation noise at arbitrary times. It is trained as a variational autoencoder with an RNN recognition net run backwards in time. On irregularly sampled spirals the latent ODE gets predictive RMSE 0.1642 vs 0.3937 for an RNN with 30 of 100 points observed.

## Overview

RNNs require binned, regularly spaced inputs; irregular sampling, missing data and ill-defined latent variables follow. A latent ODE places dynamics in continuous time, so observation times are just evaluation points, and extrapolation to any time is a solver call.

## Main Content

> [!definition] Latent ODE generative model (eqs. 11-13)
> $$
> z_{t_0}\sim p(z_{t_0}),\qquad z_{t_1},\dots,z_{t_N}=\text{ODESolve}(z_{t_0},f,\theta_f,t_0,\dots,t_N),\qquad x_{t_i}\sim p(x\mid z_{t_i},\theta_x).
> $$
> $f$ is **time-invariant**: $\partial z/\partial t=f(z(t),\theta_f)$ parametrized by a neural net, so the latent trajectory is uniquely determined by $z(t_0)$ and can be extrapolated arbitrarily forwards or backwards in time.
^def-latent-ode

**Training.** As a VAE (Kingma & Welling 2014; Rezende et al. 2014) with sequence-valued observations. The recognition network is an RNN that consumes the data *backwards in time* and outputs $q_\phi(z_0\mid x_1,\dots,x_N)$ (algorithm in Appendix E). The ELBO combines the decoder log-likelihoods of the solver outputs and a KL from $q_\phi$ to $p(z_{t_0})$. Gradients flow through the ODE solver by [[Chen 2018 - Adjoint Sensitivity Method]]. See [[Variational Inference - Overview]] for the ELBO and [[Stochastic and Black-Box Variational Inference]] for the reparameterization used for $z_{t_0}$.

> [!definition] Poisson-process likelihood on observation times
> If the event (observation) rate depends on the latent state, $p(\text{event at } t\mid z(t))=\lambda(z(t))$, then for independent observation times in $[t_{\text{start}},t_{\text{end}}]$ the inhomogeneous Poisson process log-likelihood is
> $$
> \log p(t_1,\dots,t_N\mid t_{\text{start}},t_{\text{end}})=\sum_{i=1}^N\log\lambda(z(t_i))-\int_{t_{\text{start}}}^{t_{\text{end}}}\lambda(z(t))\,dt,
> $$
> with $\lambda(\cdot)$ another neural net. The integral is evaluated in the same ODE call by augmenting the state with $\int\lambda$. This lets the *fact that a measurement was taken* inform the latent state (a patient is more likely to be tested if sick); it can be combined with a data likelihood.
^def-latent-ode-poisson

### Experiments (Sec. 5.1)

**Architecture.** Recognition RNN 25 hidden units; 4-dim latent space; $f$ with one hidden layer of 20 units; decoder one hidden layer of 20 units. Baseline: RNN with 25 hidden units minimizing Gaussian negative log-likelihood; a second RNN additionally receives the time gap to the next observation.

**Data: bi-directional spirals.** 1000 two-dimensional spirals starting at different points, 100 equally spaced time steps each; half clockwise, half counter-clockwise; Gaussian observation noise. To create irregular series, $n\in\{30,50,100\}$ points are sampled without replacement per trajectory. Metric: predictive RMSE on 100 time points extending beyond those used for training.

| # observations (of 100) | 30 | 50 | 100 |
|---|---|---|---|
| RNN | 0.3937 | 0.3202 | 0.1813 |
| Latent ODE | 0.1642 | 0.1502 | 0.1346 |

**Interpretation.** The latent ODE degrades gently with missing data (0.1346 to 0.1642) while the RNN more than doubles its error (0.1813 to 0.3937), because irregular times are native to the model. Latent trajectories (4-D projected onto 2 dims, Fig. 8c) separate into two clusters (clockwise vs counter-clockwise); varying one latent dimension of $z_{t_0}$ switches decoded trajectories smoothly from counter-clockwise to clockwise (Fig. 9). Reconstructions are obtained by sampling the posterior over latent trajectories and decoding.

Poisson-process toy (Fig. 7): the model recovers an intensity $\lambda(t)$ from event times.

## Examples

**Minimal latent-ODE forward pass (NumPy/SciPy, no training).**
```python
import numpy as np
from scipy.integrate import solve_ivp
rng = np.random.default_rng(0)
A = np.array([[0, 1.0], [-1.0, -0.1]])           # stand-in for a trained vector field f(z)
f = lambda t, z: A @ z + 0.1*np.tanh(z)
z0 = rng.normal(size=2)                            # sample from p(z_t0) (or the encoder posterior)
t_obs = np.sort(rng.uniform(0, 5, 8))              # irregular observation times
Z = solve_ivp(f, [0, t_obs[-1]], z0, t_eval=t_obs, rtol=1e-8).y.T
X = Z + 0.05*rng.normal(size=Z.shape)              # x_ti ~ p(x | z_ti): Gaussian noise
```

## Connections

- Compare with the linear-Gaussian latent dynamics in [[Linear-Gaussian State-Space Models]] (discrete time, exact inference) and the stochastic dynamics discussed in [[Jump-Diffusion and Stochastic Differential Equation Models (Concept Note)]].
- The latent ODE is deterministic given $z_{t_0}$; process noise would need an SDE, which breaks the exact-solver simplicity.
- Poisson-process likelihoods for event timing: see [[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview]] and [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]].

## See Also

[[Chen 2018 - Neural ODEs - Overview]], [[Neural Simulation-Based Inference - Overview]].
