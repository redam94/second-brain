---
title: "Chen 2018 - Continuous Normalizing Flows"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/neural-odes
  - type/theorem
  - doc/paper
source: "[[raw/Chen 2018 - Neural Ordinary Differential Equations.pdf]]"
source_location: "Sec. 4, pp. 4-6; Appendix A, pp. 13-15; Figs. 4-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chen 2018 - Neural ODEs"
doc_type: paper
depends_on:
  - "[[Chen 2018 - Adjoint Sensitivity Method]]"
  - "[[Normalizing Flows for Variational Inference]]"
used_by:
  - "[[Chen 2018 - Neural ODEs - Overview]]"
aliases:
  - CNF
  - instantaneous change of variables
---

# Chen 2018 - Continuous Normalizing Flows

> [!summary]
> In continuous time the change-of-variables formula needs only a **trace**, not a determinant: $\partial\log p(z(t))/\partial t=-\operatorname{tr}(\partial f/\partial z)$. This makes wide flow layers cost linear (not cubic) in hidden units, and the flow is automatically invertible by running the ODE backwards. Trained by maximum likelihood, CNFs match or beat discrete planar flows in the paper's small experiments.

## Overview

A discrete flow $z_1=f(z_0)$ has $\log p(z_1)=\log p(z_0)-\log\left|\det\partial f/\partial z_0\right|$ (eq. 6), with determinant cost cubic in dimension or hidden units; the planar flow (Rezende & Mohamed 2015) is $z(t+1)=z(t)+u\,h(w^\top z(t)+b)$ with $\log p(z(t+1))=\log p(z(t))-\log|1+u^\top\partial h/\partial z|$ (eq. 7). For the vault's coverage of discrete flows see [[Normalizing Flows for Variational Inference]].

## Main Content

> [!theorem] Theorem 1 (Instantaneous change of variables)
> Let $z(t)$ be a continuous random variable with density $p(z(t))$ and $dz/dt=f(z(t),t)$, with $f$ uniformly Lipschitz in $z$ and continuous in $t$. Then
> $$\frac{\partial\log p(z(t))}{\partial t}=-\operatorname{tr}\!\Big(\frac{\partial f}{\partial z(t)}\Big).\tag{8}$$
^thm-instantaneous-change-of-variables

*Proof sketch (Appendix A).* Write $z(t+\varepsilon)=T_\varepsilon(z(t))$. Assumptions imply unique solutions (Picard) and bounded $f,T_\varepsilon,\partial T_\varepsilon/\partial z$ (z bounded), allowing exchange of limits. Then
$\partial_t\log p=\lim_{\varepsilon\to0^+}\big[-\log\det\partial_zT_\varepsilon\big]/\varepsilon=-\lim\frac{\partial_\varepsilon\det\partial_zT_\varepsilon}{\det\partial_zT_\varepsilon}$ (L'Hopital), which at $\varepsilon=0$ ($T_0=\mathrm{id}$, determinant 1) equals $-\operatorname{tr}\big(\lim\partial_\varepsilon\partial_zT_\varepsilon\big)=-\operatorname{tr}(\partial f/\partial z)$ using $T_\varepsilon(z)=z+\varepsilon f+O(\varepsilon^2)$ and the derivative of $\det$ at the identity being the trace.

Consequences:
1. **No bijectivity constraint on $f$**: uniqueness of the ODE solution makes the whole map bijective automatically.
2. **Linear cost in hidden units.** Trace is linear, so if $dz/dt=\sum_{n=1}^M f_n(z)$ then $d\log p/dt=\sum_n\operatorname{tr}(\partial f_n/\partial z)$ (eq. 10): cost $O(M)$ rather than $O(M^3)$.
3. **Continuous planar flow** (eq. 9): $dz/dt=u\,h(w^\top z+b)$, $\partial\log p/\partial t=-u^\top\partial h/\partial z$.
4. **Time dependence** (hypernetwork-like) and a gating $dz/dt=\sum_n\sigma_n(t)f_n(z)$, $\sigma_n(t)\in(0,1)$; the result is a continuous normalizing flow (CNF).
5. **Sampling and density together**: solve the combined ODE for $[z(t),\log p(z(t))]$; reverse-time solve costs about the same as forward, which standard NFs cannot do.

### Experiments (Sec. 4.1)

- **Density matching** (minimizing $\mathrm{KL}(q\|p)$ with known target $p$): the CNF trained for 10,000 Adam iterations vs the NF for 500,000 RMSprop iterations. Fig. 4: NF capacity is set by depth $K$; CNF capacity can be raised by width $M$ ($K=2,8,32$ vs $M=2,8,32$), is easier to train, and generally reaches lower loss.
- **Maximum likelihood** density estimation (Two Circles, Two Moons): maximize $E_{p(x)}[\log q(x)]$ with $q$ via Theorem 1, then reverse the CNF to sample. CNF uses 64 hidden units; NF uses 64 stacked one-unit layers. The CNF learns smooth, interpretable transformations (e.g., rotating planar flows to spread particles into circles); the NF is unintuitive and struggles with Two Moons.

## Examples

**Exact check in 1-D.** Take $f(z)=-\lambda z$. Trace $=-\lambda$, so $\partial_t\log p=+\lambda$ and $p_t(z)=p_0(ze^{\lambda t})e^{\lambda t}$: a Gaussian $N(0,s^2)$ contracts to $N(0,s^2e^{-2\lambda t})$, whose log-density at the origin rises at rate $\lambda$.

```python
import numpy as np
from scipy.integrate import solve_ivp
lam, s0, z_start = 0.8, 1.0, 0.5
def rhs(t, y):                       # y = [z, logp]
    z, logp = y
    return [-lam*z, +lam]            # dz/dt = f, dlogp/dt = -tr(df/dz) = +lam
logp0 = -0.5*(z_start/s0)**2 - np.log(s0*np.sqrt(2*np.pi))
T = 1.3
z_T, logp_T = solve_ivp(rhs, [0, T], [z_start, logp0], rtol=1e-10, atol=1e-12).y[:, -1]
s_T = s0*np.exp(-lam*T)
print(logp_T, -0.5*(z_T/s_T)**2 - np.log(s_T*np.sqrt(2*np.pi)))   # equal
```

## Connections

- CNFs are generative building blocks for variational posteriors and for neural conditional density estimators in simulation-based inference: [[Normalizing Flows as Conditional Density Estimators]], [[Neural Posterior Estimation (NPE)]], [[Variational Inference - Overview]].
- Trace estimation for high-dimensional $f$ (Hutchinson) came in follow-up work (FFJORD) and is not in this paper.

## See Also

[[Chen 2018 - Neural ODEs - Overview]], [[Chen 2018 - Latent ODE Time-Series Model]].
