---
title: "Chen 2018 - ODE-Nets for Supervised Learning"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/neural-odes
  - type/example
  - doc/paper
source: "[[raw/Chen 2018 - Neural Ordinary Differential Equations.pdf]]"
source_location: "Sec. 1 and Sec. 3, pp. 1-4; Table 1; Fig. 3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chen 2018 - Neural ODEs"
doc_type: paper
depends_on:
  - "[[Chen 2018 - Adjoint Sensitivity Method]]"
used_by:
  - "[[Chen 2018 - Scope, Limitations and Statistical Use]]"
aliases:
  - neural ODE classifier
  - continuous-depth residual networks
---

# Chen 2018 - ODE-Nets for Supervised Learning

> [!summary]
> A residual network is an Euler discretization of an ODE; replacing six residual blocks by one ODE solve gives an ODE-Net that matches ResNet accuracy on MNIST (0.42% vs 0.41% error) with 0.22M vs 0.60M parameters and constant memory in depth. The solver tolerance becomes a dial trading accuracy against function evaluations, and 'depth' becomes the (adaptive) number of function evaluations.

## Overview

The introduction observes that $h_{t+1}=h_t+f(h_t,\theta_t)$ (eq. 1) is an Euler step of $dh/dt=f(h(t),t,\theta)$ (eq. 2). Letting depth go to a continuum and handing the integration to an adaptive solver yields four claimed benefits: (i) memory efficiency (no stored activations), (ii) adaptive computation (120+ years of solver theory, error monitoring), (iii) cheaper normalizing flows ([[Chen 2018 - Continuous Normalizing Flows]]), (iv) continuous-time sequence models ([[Chen 2018 - Latent ODE Time-Series Model]]).

## Main Content

**Setup (Sec. 3).** Implicit Adams method from LSODE/VODE via `scipy.integrate`, with the adjoint implemented in Python `autograd`; hidden-state dynamics and derivatives evaluated on GPU with TensorFlow. Architecture: a small ResNet that downsamples the input twice and then applies 6 standard residual blocks; ODE-Net replaces those blocks with one ODESolve module; **RK-Net** has the same architecture but backpropagates directly through a Runge-Kutta integrator.

**Table 1 (MNIST, from LeCun et al. 1998 for the MLP).**

| Model | Test error | # Params | Memory | Time |
|---|---|---|---|---|
| 1-layer MLP | 1.60% | 0.24 M | - | - |
| ResNet | 0.41% | 0.60 M | $O(L)$ | $O(L)$ |
| RK-Net | 0.47% | 0.22 M | $O(\tilde L)$ | $O(\tilde L)$ |
| ODE-Net | 0.42% | 0.22 M | $O(1)$ | $O(\tilde L)$ |

$L$ is the number of ResNet layers; $\tilde L$ is the number of function evaluations the solver requests in one forward pass (an implicit number of layers). **Interpretation:** accuracy is comparable, but only the adjoint-trained ODE-Net has constant memory in depth. The paper's parameter-efficiency comparison is modest; the acknowledgements thank a reader for pointing out an unsupported parameter-efficiency claim in earlier versions, so do not over-read the 0.22M vs 0.60M gap.

**Error control (Fig. 3a-b).** Solver tolerance controls output error; forward time is proportional to number of function evaluations (NFE), so tolerance gives a speed-accuracy trade-off, and one could train with high accuracy and test with lower.

**Backward vs forward cost (Fig. 3c, corrected).** Median ratio of backward to forward NFE is about 0.8 for tolerances $10^{-5}$ to $10^{-1}$; the adjoint can thus be both memory-efficient and slightly cheaper than directly backpropagating through the integrator, which must backprop through every forward function evaluation. (Earlier versions said the ratio was about 0.5; corrected in v6.)

**Depth (Fig. 3d).** 'Depth' is ill-defined; NFE is the analogue, and it *increases during training*, presumably adapting to growing model complexity (the learned dynamics become harder to integrate).

## Examples

**Euler step as a one-layer residual block.**
```python
import numpy as np
def f(h, t, W): return np.tanh(W @ h)            # toy dynamics network
def resnet(h, Ws):                               # discrete depth L
    for W in Ws: h = h + f(h, None, W)
    return h
def odenet_euler(h, W, T=6.0, n=6):              # same map with step size T/n and shared W
    dt = T / n
    for _ in range(n): h = h + dt * f(h, None, W)
    return h
```
An adaptive solver (RK45 etc.) replaces the fixed loop and picks `n` per input.

## Connections

- Gradient-based inference over network parameters in this setting needs the adjoint; a Bayesian treatment of the weights (priors, HMC vs VI) is the subject of [[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]].
- Putting a network inside a known mechanistic ODE (rather than replacing the whole model) is the universal-differential-equation idea: [[Universal Differential Equations and Scientific ML (Concept Note)]].

## See Also

[[Chen 2018 - Neural ODEs - Overview]], [[Chen 2018 - Adjoint Sensitivity Method]], [[Neural Scaling Laws]].
