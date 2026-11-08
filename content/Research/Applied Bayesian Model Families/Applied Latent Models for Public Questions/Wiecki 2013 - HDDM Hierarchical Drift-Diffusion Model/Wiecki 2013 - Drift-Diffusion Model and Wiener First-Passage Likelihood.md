---
title: "Wiecki 2013 - Drift-Diffusion Model and Wiener First-Passage Likelihood"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/theorem
  - doc/paper
source: "[[raw/Wiecki 2013 - HDDM Hierarchical Bayesian Drift-Diffusion Model in Python.pdf]]"
source_location: "Methods, 'Drift diffusion model', pp. 2-3; Figure 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model"
doc_type: paper
depends_on: []
used_by:
  - "[[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]]"
  - "[[Wiecki 2013 - Parameter Recovery Simulations and Detection Power]]"
  - "[[Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model - Overview]]"
aliases:
  - "Wiener first-passage time likelihood"
  - "drift diffusion model"
  - "speed-accuracy trade-off DDM"
---

# Wiecki 2013 - Drift-Diffusion Model and Wiener First-Passage Likelihood

> [!summary]
> The DDM says a decision is noisy accumulation of relative evidence with drift $v$ between two absorbing boundaries separated by $a$, starting at relative bias $z$, plus a non-decision time $t$. The joint density of choice and RT is the first-passage density of Brownian motion with drift, an infinite series (Wald; Feller) that HDDM evaluates with the Navarro-Fuss (2009) approximation. Raising $a$ buys accuracy at the price of slower responses: the speed-accuracy trade-off.

## Overview

Sequential-sampling models (SSMs) are of two classes: **diffusion models** (relative evidence, one accumulator, two boundaries) and **race models** (independent accumulators, first to a boundary wins). HDDM implements the DDM (Ratcliff and Rouder 1998; Ratcliff and McKoon 2008) and the linear ballistic accumulator (LBA, Brown and Heathcote 2008). The paper then focuses on the DDM.

## Main Content

> [!definition] Drift diffusion model (DDM) parameters
> Evidence $X(s)$ starts at $X(0)=za$ and evolves as $dX=v\,ds+\sigma\,dW$ ($\sigma=1$ by convention). The first time $X$ hits $0$ or $a$ is the **decision time**; the observed RT is $x_{\text{obs}}=t_{nd}+x_{\text{dec}}$. Parameters: $v$ **drift rate** (speed of evidence accumulation, i.e. stimulus quality or task ease); $a$ **threshold** (boundary separation, response caution); $z\in(0,1)$ relative **starting point/bias**; $t$ **non-decision time** (encoding plus motor execution). The upper boundary codes one response, the lower the other.
^def-ddm

> [!theorem] Wiener first-passage density (Wald 1947; Feller 1968)
> For the lower boundary, the density of first passage at decision time $x>0$ is
> $$
> f(x\mid v,a,z)=\frac{\pi}{a^{2}}\exp\!\Big(-v a z-\frac{v^{2}x}{2}\Big)\sum_{k=1}^{\infty}k\,\exp\!\Big(-\frac{k^{2}\pi^{2}x}{2a^{2}}\Big)\sin(k\pi z).
> $$
> The upper-boundary density follows by the substitution $v\to -v,\ z\to 1-z$. The two densities integrate to $1$ jointly; the lower one integrates to $P(\text{lower})=\dfrac{e^{-2vaz}-e^{-2va}}{1-e^{-2va}}$.
>
> *Proof sketch.* Solve the Fokker-Planck equation on $(0,a)$ with absorbing boundaries by separation of variables (eigenfunctions $\sin(k\pi y/a)$, decay rates $k^2\pi^2/2a^2$), remove drift through the Girsanov factor $\exp(-v(y-x_0)-v^2x/2)$, and take the flux at the boundary. The series converges quickly for large $x$ but slowly for small $x$.
^thm-wfpt

The printed formula is garbled in text extraction of the PDF; the form above is the standard Feller/Navarro-Fuss one and is verified numerically in the snippet below (the integral over $x$ equals $P(\text{lower})$).

**Numerical evaluation.** The series is infinite, so HDDM uses the approximation of Navarro and Fuss (2009), which switches between a *large-time* series (few terms in the exponential decay) and a *small-time* series (few terms via a theta-function transformation), choosing whichever needs fewer terms for a target error. This is the "small/large-time switch" used in PyTensor in example E71.

> [!definition] Full DDM (inter-trial variability)
> Ratcliff and Rouder's **full DDM** adds trial-to-trial variability: $v_{\text{trial}}\sim N(v,s_v^2)$, non-decision time $t_{\text{trial}}\sim U(t-s_t/2,\,t+s_t/2)$, and starting point $z_{\text{trial}}\sim U(z-s_z/2,\,z+s_z/2)$. Fast errors arise from $s_z$; slow errors from $s_v$. HDDM integrates $s_v$ **analytically** and $s_t,s_z$ **numerically** (Ratcliff and Tuerlinckx 2002).
^def-full-ddm

### The speed-accuracy trade-off

> [!theorem] Speed-accuracy closed forms (standard results, background beyond the paper)
> With $z=\tfrac12$ and unit diffusion, the probability of the upper (correct) response and the mean decision time are
> $$
> P(\text{correct})=\frac{1}{1+e^{-va}},\qquad \mathbb E[T_{\text{dec}}]=\frac{a}{2v}\tanh\!\Big(\frac{va}{2}\Big).
> $$
> Increasing $a$ raises accuracy toward 1 and lengthens decisions roughly linearly in $a$; lowering $a$ gives fast, error-prone responses. A speed-versus-accuracy *instruction* is therefore captured mainly by a change in $a$ with $v$ and $t$ roughly unchanged. These formulas are not stated in the Wiecki paper.
^thm-sat

**Optimal policies (background).** In the 2AFC task with a fixed time cost, the DDM is the continuous-time limit of Wald's sequential probability ratio test (SPRT), which for a given error rate minimizes expected decision time (Wald and Wolfowitz 1948). The "what they should do" part of E71 compares fitted thresholds with the reward-rate-optimal threshold. This optimality is external to Wiecki 2013 and cited here only to place the model.

## Examples

> [!example] Checking the density numerically
> Choose $v=0.8,\ a=1.5,\ z=0.5$. The lower-boundary probability is $0.2315$. Integrating the series (400 terms) over $x\in(10^{-6},60)$ returns $0.231475$, matching the closed form to six digits; the checked run is described below.
^ex-wfpt-check

```python
import numpy as np
from scipy import integrate

def wfpt_lower(x, v, a, z, K=400):
    k = np.arange(1, K + 1)
    s = (k * np.exp(-k**2 * np.pi**2 * x / (2 * a**2)) * np.sin(k * np.pi * z)).sum()
    return (np.pi / a**2) * np.exp(-v * a * z - v**2 * x / 2) * s

v, a, z = 0.8, 1.5, 0.5
p, _ = integrate.quad(wfpt_lower, 1e-6, 60, args=(v, a, z), limit=500, points=[0.05, 0.5, 2])
p_closed = (np.exp(-2*v*a*z) - np.exp(-2*v*a)) / (1 - np.exp(-2*v*a))
print(p, p_closed)   # 0.231475...  0.231475...
```

**PyMC-style sketch (untested pseudocode).** PyMC has no built-in Wiener likelihood; define `logp` with PyTensor (small/large-time switch, NaN-safe) or use `HSSM`.

```python
import pymc as pm, pytensor.tensor as pt
# wfpt_logp(value, v, a, z, t) -> log density of (rt, choice); user-supplied
with pm.Model() as ddm:
    v = pm.Normal("v", 0, 2); a = pm.Gamma("a", 3, 2)
    z = pm.Beta("z", 5, 5);   t = pm.Uniform("t", 0, rt_min)
    pm.CustomDist("y", v, a, z, t, logp=wfpt_logp, observed=np.c_[rt, choice])
```

## Connections
- Hierarchical priors and workflow: [[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]].
- The latent-threshold idea in signal detection is related: [[Simoiu 2017 - Threshold Test Generative Model]].
- Sequential analysis context: [[Survival Analysis]] (first-passage times are hazards of a diffusion).

## See Also
[[Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model - Overview]]
