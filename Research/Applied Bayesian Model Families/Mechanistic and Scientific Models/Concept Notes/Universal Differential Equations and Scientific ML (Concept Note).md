---
title: "Universal Differential Equations and Scientific ML (Concept Note)"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/neural-odes
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (literature: Rackauckas et al. 2020, arXiv 2001.04385; Chen et al. 2018; Dandekar et al. 2020 on Bayesian neural ODEs)"
source_location: "Synthesis note"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Concept Notes"
doc_type: concept
depends_on:
  - "[[Chen 2018 - Neural ODEs - Overview]]"
  - "[[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]]"
used_by:
  - "[[Likelihoods Built on Differential Equations (Concept Note)]]"
aliases:
  - UDE
  - universal differential equations
  - scientific machine learning
  - neural network inside an ODE
---

# Universal Differential Equations and Scientific ML (Concept Note)

> [!summary]
> Concept note, no raw source (the 55-page Rackauckas et al. 2020 paper was not ingested). A **universal differential equation** keeps the known mechanistic structure of an ODE and replaces only the unknown terms by a neural network: $\dot u=f_{\text{known}}(u;\theta)+\text{NN}_w(u)$. Fit with adjoint gradients; a Bayesian version puts a prior over $w$ and samples. Key statistical issues: weight non-identifiability (diagnose in function space), the prior over the learned function, and whether the network "rediscovers" mass-action terms.

## Overview

Rackauckas et al. (2020, arXiv:2001.04385) define UDEs as differential equations with universal approximators embedded in the right-hand side, covering neural ODEs as a special case (everything unknown) and classical mechanistic models (nothing unknown). Their programme: train via differentiable ODE solvers, then optionally recover interpretable terms from the learned network by sparse regression (SINDy-type). The Lotka-Volterra predator-prey model is the standard teaching case, and the vault's example E11 applies it to Hudson's Bay lynx-hare pelts.

## Main Content

> [!definition] Universal differential equation (UDE)
> $$\frac{du}{dt}=f\big(u,t;\ \theta,\ \text{NN}_w\big),\qquad \text{e.g. }\ \dot x=\alpha x-\text{NN}_{w,1}(x,y),\ \ \dot y=-\delta y+\text{NN}_{w,2}(x,y),$$
> where $\theta$ are mechanistic parameters and $\text{NN}_w$ is a neural network with weights $w$ standing in for the unknown interaction (the Lotka-Volterra predation term $\beta xy$).
^def-ude

### Bayesian treatment: what changes

| Issue | Statement | Practical rule |
|---|---|---|
| Prior over functions | The prior on $w$ plus the architecture induces a prior on the missing term; vague weight priors are not vague in function space ([[Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors]]) | Prior-predictive plot of the learned term and of trajectories; scale final-layer weights by $1/\sqrt{\text{width}}$ |
| Non-identified weights | Permutation/sign symmetries make weight-space $\hat R$ meaningless ([[Izmailov 2021 - Mixing Diagnostics and Posterior Geometry]]) | Compute $\hat R$/ESS on $\text{NN}_w(u)$ on a grid and on trajectories |
| Identifiability of mechanism vs network | A flexible NN can absorb the known terms; $\theta$ becomes unidentified | Constrain the NN (small width, bounded output, shrinkage prior) or fit $\theta$ first; report posterior of the *whole* right-hand side |
| Inference algorithm | NUTS with adjoint/VJP gradients ([[Chen 2018 - Adjoint Sensitivity Method]]); or ADVI/Pathfinder as exploration; compare to NUTS | Mean-field VI is the poorest predictive approximation in the BNN benchmark ([[Izmailov 2021 - Cheaper Approximations versus HMC]]) |
| Extrapolation | Trained only on observed states $(x,y)$; the term is unconstrained elsewhere | Posterior uncertainty of the learned term should widen outside the data; check it does |
| Did the network rediscover mass action? | Compare $\text{NN}_w(x,y)$ against candidate forms ($\beta xy$) with a posterior over the difference | A posterior-predictive comparison of mechanistic vs UDE models (PSIS-LOO or leave-future-out) |

**Physics vs flexibility.** The more of the structure you fix, the more data-efficient and extrapolatable the model; the more you free, the better the fit in-sample and the weaker the guarantee out of sample. A UDE is a dial between the two.

## Examples

**Lotka-Volterra UDE forward model (SciPy, untrained network; runs).**
```python
import numpy as np
from scipy.integrate import solve_ivp
rng = np.random.default_rng(0)
H = 8
W1, b1 = rng.normal(0, 1, (H, 2)), rng.normal(0, 1, H)
W2 = rng.normal(0, 1/np.sqrt(H), (2, H))                 # 1/sqrt(width) output scaling
nn = lambda x, y: W2 @ np.tanh(W1 @ np.array([x, y]) + b1)
alpha, delta = 0.5, 0.4
# UDE right-hand side: the unknown interaction terms are replaced by the NN
def rhs(t, z):
    x, y = z; n = nn(x, y)
    return [alpha*x - n[0], -delta*y + n[1]]
sol = solve_ivp(rhs, [0, 20], [1.0, 0.5], t_eval=np.linspace(0, 20, 5)); print(sol.y.round(2))
```
This random-weight draw is arbitrary and diverges (x reaches about 7,600 by t = 20 and y turns negative), which is exactly what a prior predictive check on a UDE should reveal: weight priors that look innocuous can imply unphysical dynamics, so constrain the network (bounded or positive outputs) and check trajectories before fitting. Training (not shown): minimize the negative log-likelihood of observed counts under $\text{NN}_w$, using `jax.grad` through `diffrax`; a Bayesian version wraps this in NUTS with a prior on $w$.

**PyMC sketch (untested).** Weights as `pm.Normal` with `dims`, the ODE solve as a JAX function wrapped by `pytensor.wrap_jax` or a whole-model JAX model run with nutpie/NumPyro; inspect `az.rhat` of the trajectory, not of $w$.

## Relevance to marketing measurement

Replacing an assumed saturation curve (e.g. Hill) with a monotone neural term inside an otherwise parametric adstock-carryover model is the UDE idea. Monotonicity and boundedness must be built into the architecture; without them, extrapolation to new spend is unreliable ([[Izmailov 2021 - Predictive Performance and Domain Shift]]).

## Connections

[[Likelihoods Built on Differential Equations (Concept Note)]], [[Chen 2018 - Scope, Limitations and Statistical Use]], [[Gaussian Process Regression]] (a GP prior on the unknown term is the nonparametric alternative), [[Neural Simulation-Based Inference - Overview]], [[Variational Inference and Pathfinder]].

## See Also

[[Chen 2018 - Latent ODE Time-Series Model]], [[Chipman 2010 - BART - Overview]].
