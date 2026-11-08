---
title: "Chen 2018 - Adjoint Sensitivity Method"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/neural-odes
  - type/theorem
  - doc/paper
source: "[[raw/Chen 2018 - Neural Ordinary Differential Equations.pdf]]"
source_location: "Sec. 2 pp. 2-3; Appendices B-D pp. 15-18"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chen 2018 - Neural ODEs"
doc_type: paper
depends_on:
  - "[[Chen 2018 - Neural ODEs - Overview]]"
used_by:
  - "[[Chen 2018 - ODE-Nets for Supervised Learning]]"
  - "[[Likelihoods Built on Differential Equations (Concept Note)]]"
aliases:
  - adjoint method
  - continuous backpropagation
  - ODE vector-Jacobian product
---

# Chen 2018 - Adjoint Sensitivity Method

> [!summary]
> To differentiate a scalar loss of an ODE solution, define the adjoint $a(t)=\partial L/\partial z(t)$. It obeys $\dot a=-a^\top\partial f/\partial z$, solved *backwards* in time together with $z(t)$ and a running integral for $\partial L/\partial\theta$. One augmented ODE call returns $\partial L/\partial z(t_0)$ and $\partial L/\partial\theta$ with $O(1)$ memory in depth, using only vector-Jacobian products (VJPs) of $f$. This is the machinery behind custom differentiable ODE Ops in probabilistic programming.

## Overview

Backpropagating through each solver step is possible but stores the whole forward trajectory and propagates numerical error through the solver's internals. The adjoint method (Pontryagin et al. 1962) instead treats the solver as a black box. The paper's contribution is to present it in the language of reverse-mode autodiff, with a generic VJP interface so an ODE solve composes with any other differentiable component.

## Main Content

Setting: a loss of the terminal state of an initial value problem

$$L\big(z(t_1)\big)=L\Big(z(t_0)+\int_{t_0}^{t_1} f(z(t),t,\theta)\,dt\Big)=L\big(\text{ODESolve}(z(t_0),f,t_0,t_1,\theta)\big).\tag{3}$$

> [!definition] Adjoint state
> $a(t)\equiv \partial L/\partial z(t)$ (the instantaneous analogue of the backpropagated gradient at a hidden layer).
^def-adjoint-state

> [!theorem] Adjoint ODE and parameter gradient (eqs. 4-5)
> Let $z$ solve $dz/dt=f(z(t),t,\theta)$. Then
> $$\frac{da(t)}{dt}=-a(t)^{\!\top}\frac{\partial f(z(t),t,\theta)}{\partial z},\qquad \frac{dL}{d\theta}=-\int_{t_1}^{t_0}a(t)^{\!\top}\frac{\partial f(z(t),t,\theta)}{\partial\theta}\,dt.$$
> Starting from $a(t_1)=\partial L/\partial z(t_1)$ and solving backward to $t_0$ gives $\partial L/\partial z(t_0)$.
^thm-adjoint

*Proof sketch (Appendix B.1).* Over a short time step $\varepsilon$, $z(t+\varepsilon)=T_\varepsilon(z(t))=z(t)+\varepsilon f(z(t),t,\theta)+O(\varepsilon^2)$. The chain rule (as in layer-wise backprop) gives $a(t)=a(t+\varepsilon)\,\partial T_\varepsilon/\partial z(t)=a(t+\varepsilon)\big(I+\varepsilon\,\partial f/\partial z\big)+O(\varepsilon^2)$. Hence
$$\frac{da}{dt}=\lim_{\varepsilon\to0^+}\frac{a(t+\varepsilon)-a(t)}{\varepsilon}=-a(t)\frac{\partial f}{\partial z}.$$

*Parameters and times (B.2).* Treat $\theta$ and $t$ as extra states with $\dot\theta=0$, $\dot t=1$, giving an augmented state $[z,\theta,t]$ whose Jacobian has zero rows for $\theta,t$. Applying the adjoint equation to the augmented system gives $a_\theta(t_0)=dL/d\theta=-\int_{t_1}^{t_0}a^\top\,\partial f/\partial\theta\,dt$ with $a_\theta(t_1)=0$, and similarly $dL/dt_0$, $dL/dt_1$ (eq. 52 and Algorithm 2 in Appendix C: $dL/dt_1=a(t_1)^\top f(z(t_1),t_1,\theta)$, and $dL/dt_0=a_t(t_0)=a_t(t_1)-\int_{t_1}^{t_0}a^\top\,\partial f/\partial t\,dt$ with initialization $a_t(t_1)=-dL/dt_1$).

> [!algorithm] Algorithm 1: reverse-mode derivative of an ODE initial value problem
> Input: $\theta,t_0,t_1$, final state $z(t_1)$, $\partial L/\partial z(t_1)$.
> 1. Initial augmented state $s_0=[z(t_1),\ \partial L/\partial z(t_1),\ 0_{|\theta|}]$.
> 2. Dynamics $\text{aug}([z,a,\cdot],t,\theta)=[\,f(z,t,\theta),\ -a^\top\partial f/\partial z,\ -a^\top\partial f/\partial\theta\,]$ (two VJPs by autodiff).
> 3. $[z(t_0),\ \partial L/\partial z(t_0),\ \partial L/\partial\theta]=\text{ODESolve}(s_0,\text{aug},t_1,t_0,\theta)$.
^alg-adjoint

**Multiple observation times.** If the loss depends on intermediate states $z(t_i)$ (as in any time-series likelihood), split the backward solve into one solve per interval and, at each observation time, **add** $\partial L/\partial z(t_i)$ to the adjoint (Fig. 2). Without this jump the gradient of an ODE-based likelihood is wrong.

**Properties.** The state $z(t)$ is not stored: it is recomputed backwards along with $a$. All three integrals ($z,a,\partial L/\partial\theta$) are computed in a single solver call. Cost scales linearly in the state dimension. This extends Stapor et al. 2018 sec. 2.4.2. Contrast with forward sensitivity analysis (used by Stan's ODE interface, per the paper): quadratic-time in the number of variables, whereas adjoint is linear.

**Caveat on exactness.** Recomputing $z(t)$ backward can diverge from the forward trajectory (reconstruction error), and for chaotic or stiff dynamics this can make adjoint gradients unreliable; checkpointing (store some forward states) fixes it. See [[Chen 2018 - Scope, Limitations and Statistical Use]].

## Examples

**Worked example: scalar decay.** $\dot z=-\theta z$, $z(0)=z_0=2$, $T=1.5$, $\theta=0.7$, $L=\tfrac12(z(T)-y)^2$ with $y=0.3$.
- Analytic: $z(T)=z_0e^{-\theta T}$, $\partial L/\partial\theta=(z(T)-y)(-T z(T))=-0.41979$, $\partial L/\partial z_0=(z(T)-y)e^{-\theta T}=0.13993$.
- Adjoint: $f=-\theta z$, $\partial f/\partial z=-\theta$, $\partial f/\partial\theta=-z$. Solve $[\dot z,\dot a,\dot g]=[-\theta z,\ \theta a,\ a z]$ backward from $[z(T),\ z(T)-y,\ 0]$ to $0$; the third component ends at $\partial L/\partial\theta$.

```python
import numpy as np
from scipy.integrate import solve_ivp
theta, z0, T, y = 0.7, 2.0, 1.5, 0.3
f      = lambda z, th: -th*z
dfdz   = lambda z, th: -th
dfdth  = lambda z, th: -z
zT = solve_ivp(lambda t,z: f(z,theta), [0,T], [z0], rtol=1e-10, atol=1e-12).y[0,-1]
aug = lambda t,s: [f(s[0],theta), -s[1]*dfdz(s[0],theta), -s[1]*dfdth(s[0],theta)]
sol = solve_ivp(aug, [T,0], [zT, zT-y, 0.0], rtol=1e-10, atol=1e-12)
z0_rec, dL_dz0, dL_dtheta = sol.y[:, -1]
print(z0_rec, dL_dz0, dL_dtheta)   # 2.0, 0.139931..., -0.419794...
```
Output matches the analytic values to about $10^{-10}$ (verified when writing this note).

**Mapping to PyMC/PyTensor (E09).** A custom Op needs `perform` (forward solve) and `grad`, which receives the upstream gradient $\partial L/\partial\text{output}$ and must return $\partial L/\partial\text{inputs}$. That is the adjoint seed $a(t_1)$; `jax.vjp(solve, theta)` supplies the pullback so no hand-derived sensitivity ODE is needed. Pseudocode (untested):
```python
import jax
def make_op(solve_jax):             # solve_jax(theta) -> predicted trajectory
    out, pullback = jax.vjp(solve_jax, theta0)
    # forward: out; backward: pullback(upstream) -> d logp / d theta
```

## Connections

- The likelihood-level use (ODE solution as the mean of a Gaussian observation model): [[Likelihoods Built on Differential Equations (Concept Note)]].
- For chaotic dynamics gradients explode and the likelihood surface is rough; see [[Chaos and Phase-Insensitive Statistics]] and [[Chaos, Rough Likelihoods and Data Assimilation (Concept Note)]].
- HMC needs these gradients: [[HMC and Stan in Practice]]; the planetary-motion multimodality example: [[Challenge of Multimodality - Differential Equation for Planetary Motion]].

## See Also

[[Chen 2018 - Neural ODEs - Overview]], [[ODE Filters and Smoothers]] (solver uncertainty as inference), [[Automatic Differentiation Variational Inference (ADVI)]].
