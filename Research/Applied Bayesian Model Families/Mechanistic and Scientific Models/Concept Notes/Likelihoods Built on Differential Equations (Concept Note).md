---
title: "Likelihoods Built on Differential Equations (Concept Note)"
tags:
  - source/ingested
  - topic/mechanistic-models
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source; builds on [[raw/Chen 2018 - Neural Ordinary Differential Equations.pdf]] and [[raw/Margossian 2022 - Bayesian Pharmacometrics with Stan and Torsten.pdf]]"
source_location: "Synthesis note"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Concept Notes"
doc_type: concept
depends_on:
  - "[[Chen 2018 - Adjoint Sensitivity Method]]"
  - "[[Margossian 2022 - Nonlinear PKPD and ODE Solvers]]"
used_by:
  - "[[Chaos, Rough Likelihoods and Data Assimilation (Concept Note)]]"
  - "[[Universal Differential Equations and Scientific ML (Concept Note)]]"
aliases:
  - ODE PDE likelihood
  - mechanistic model as regression function
  - custom Op with gradient
---

# Likelihoods Built on Differential Equations (Concept Note)

> [!summary]
> Concept note, no raw source. A mechanistic model enters Bayesian inference as the *regression function*: $y_i\sim p\big(\cdot\mid g(t_i;\theta)\big)$ where $g$ is the solution of an ODE/PDE. Everything reusable is the same four steps: solve, map to observables, add a measurement model, differentiate. The costs are solver error, gradients (forward sensitivities or adjoint VJPs), constraints that keep the solver well-posed, and identifiability.

## Overview

The pattern recurs across the PyMC examples: cosmology (E08, an integral inside the model), lynx-hare Lotka-Volterra (E09, E11), gravitational waves (E10), thermal plate heat equation (E51), reaction-diffusion (E50), neuron conductance models (E54), traction force microscopy (E60), pattern formation (E61), PK/PD (E64). The domain science differs; the inference template does not.

## Main Content

> [!definition] ODE-likelihood template
> State $u(t;\theta,u_0)$ solves $\dot u=f(u,t;\theta)$. Observable $\hat y(t)=h(u(t))$ (e.g., concentration $=u_{cent}/V$). Data $y_i\sim p(y\mid \hat y(t_i),\phi)$ with measurement parameters $\phi$ (noise scale, error model). Posterior $p(\theta,u_0,\phi\mid y)\propto p(\theta,u_0,\phi)\prod_ip(y_i\mid\hat y(t_i),\phi)$.
^def-ode-likelihood-template

| Design choice | Options | Consequence |
|---|---|---|
| Closed form vs numerical | Linear systems: matrix exponential ([[Margossian 2022 - Compartment Models and Event Schedules]]); nonlinear: RK45/Rosenbrock/implicit | Closed forms give exact gradients; numerical solvers need tolerance control |
| Gradient | Forward sensitivity (Stan; cost grows with parameters x states); adjoint/VJP (cost linear, constant memory) ([[Chen 2018 - Adjoint Sensitivity Method]]) | Pick adjoint when parameters are many (networks) |
| Observation model | Additive normal; lognormal for positive concentrations; Poisson/NegBin for counts; compound-Poisson for clone counts ([[Luria-Delbruck and Telegraph Models as Compound Count Likelihoods (Concept Note)]]) | Misspecified noise is the usual cause of poor PPCs |
| PDEs | Method of lines (discretize space, solve ODE system); finite volume for steady states | Discretization error is part of the likelihood; refine the grid until the log-likelihood stabilizes |
| Process noise | None (deterministic trajectory) vs SDE/state-space | Deterministic models over-attribute residuals to observation noise ([[Jump-Diffusion and Stochastic Differential Equation Models (Concept Note)]]) |
| Solver uncertainty | Ignore vs model it ([[ODE Filters and Smoothers]], [[Solving ODEs as Inference]]) | Matters when tolerances are loose or the solver is the bottleneck |

### Custom Ops with gradients (PyMC/PyTensor view)

A PyTensor `Op` has `perform` (forward) and `grad`. For an ODE, `perform` calls the solver; `grad` receives the upstream gradient $\partial\ell/\partial\hat y$ and must return $\partial\ell/\partial\theta$. That is the adjoint seed. `jax.vjp(solve, theta)` returns the pullback directly, which is exactly Algorithm 1 of the neural-ODE paper evaluated by autodiff; `pytensor.wrap_jax` or a hand-written Op wraps it; whole-model JAX (nutpie/NumPyro) avoids the bridge. Untested sketch:
```python
import jax, jax.numpy as jnp
from diffrax import diffeqsolve, ODETerm, Tsit5, SaveAt   # JAX ODE solver
def solve(theta, ts):
    term = ODETerm(lambda t, u, th: th[0]*u*(1-u/th[1]))
    return diffeqsolve(term, Tsit5(), 0., ts[-1], 0.1, 0.5, args=theta, saveat=SaveAt(ts=ts)).ys
def loglik(theta, ts, y): return -0.5*jnp.sum((y - solve(theta, ts))**2)
grad_loglik = jax.grad(loglik)        # reverse-mode through the solver (or adjoint via diffrax)
```

### Pitfalls

1. **Identifiability.** Many ODE parameter sets give near-identical trajectories (ridges); report posterior correlations and use informative priors from the science (see [[Margossian 2022 - Population Two-Compartment Model]] for the flip-flop constraint).
2. **Multimodality.** Starting values matter; symmetric or periodic structure creates modes ([[Challenge of Multimodality - Differential Equation for Planetary Motion]]).
3. **Stiffness.** Explicit solvers fail or crawl; choose implicit solvers.
4. **Constraints during warmup.** Bound states away from singularities (e.g., $E_{drug}=\min(\alpha\hat c,1)$) so wild draws do not crash the solver.
5. **Initial conditions** are often parameters, sometimes known only with error.

## Examples

**Logistic growth with lognormal noise (full example, SciPy; runs).**
```python
import numpy as np
from scipy.integrate import solve_ivp
from scipy.optimize import minimize
rng = np.random.default_rng(0)
r_true, K_true, u0, sig = 0.5, 100., 5., 0.1
ts = np.linspace(0, 12, 15)
def sol(r, K): return solve_ivp(lambda t,u: r*u*(1-u/K), [0, 12], [u0], t_eval=ts, rtol=1e-8).y[0]
y = sol(r_true, K_true)*np.exp(sig*rng.normal(size=ts.size))
nll = lambda p: np.sum((np.log(y)-np.log(sol(np.exp(p[0]), np.exp(p[1]))))**2)/(2*sig**2)
fit = minimize(nll, np.log([0.3, 80.]), method="Nelder-Mead"); print(np.exp(fit.x))   # [0.527 87.7]: r recovered, K only loosely identified (true 0.5, 100)
```

Interpretation: the carrying capacity $K$ is poorly identified when the series ends before saturation, a classic ridge between $r$ and $K$ (the same issue appears in surplus-production models, [[Surplus-Production State-Space Models for Fisheries (Concept Note)]]).

## Relevance to marketing measurement

Adstock-with-saturation MMMs are simple dynamical systems; treating them as ODE/difference-equation likelihoods with partially pooled geo parameters is the same template ([[Margossian 2022 - Bayesian Pharmacometrics - Overview]]).

## Connections

[[Chen 2018 - Neural ODEs - Overview]], [[HMC and Stan in Practice]], [[Linear-Gaussian State-Space Models]], [[Chaos and Phase-Insensitive Statistics]].

## See Also

[[Surplus-Production State-Space Models for Fisheries (Concept Note)]], [[Neural Simulation-Based Inference - Overview]] (when the likelihood is intractable).
