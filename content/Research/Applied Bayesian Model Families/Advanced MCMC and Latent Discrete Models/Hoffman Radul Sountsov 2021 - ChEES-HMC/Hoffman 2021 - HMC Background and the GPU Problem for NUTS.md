---
title: "Hoffman 2021 - HMC Background and the GPU Problem for NUTS"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/concept
  - doc/paper
source: "[[raw/Hoffman Radul Sountsov 2021 - Adaptive-MCMC Scheme for Setting Trajectory Lengths in HMC.pdf]]"
source_location: "Sec. 1, pp. 1-3 and Figure 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Radul Sountsov 2021 - ChEES-HMC"
doc_type: paper
depends_on:
  - "[[Efficient MCMC]]"
used_by:
  - "[[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]]"
  - "[[Hoffman 2021 - ChEES Criterion and Algorithm 1]]"
aliases:
  - "HMC leapfrog and trajectory length"
  - "NUTS on GPU problem"
---

# Hoffman 2021 - HMC Background and the GPU Problem for NUTS

> [!summary]
> Reviews HMC (momentum augmentation, leapfrog, Metropolis correction), why step size can be tuned independently of the number of steps, why expected squared jumped distance motivates NUTS, and why NUTS is slow on SIMD hardware. The motivating Figure 1 shows 100-chain ChEES-HMC reaching NUTS-quality estimates almost an order of magnitude faster.

## Overview

The target is $p(\theta)\propto e^{\mathcal L(\theta)}$ on $\theta\in\mathbb R^D$, known up to a constant. A mass matrix can always be absorbed by a linear change of variables, so the paper assumes an identity mass matrix.

## Main Content

> [!definition] Augmented HMC model and Hamiltonian
> Add momentum $r\in\mathbb R^D$ with $r\sim\mathcal N(0,I)$, so $p(\theta,r)\propto\exp\{\mathcal L(\theta)-\tfrac12\|r\|^2\}$. The Hamiltonian is $H=-\mathcal L(\theta)+\tfrac12\|r\|^2$ (potential plus kinetic energy). Hamilton's equations: $\dot\theta=r$, $\dot r=\nabla\mathcal L(\theta)$.
^def-hmc-augmented

> [!definition] Leapfrog integrator
> One leapfrog update with step size $\epsilon$ is
> $$
> r\leftarrow r+\tfrac{\epsilon}{2}\nabla\mathcal L(\theta);\quad \theta\leftarrow\theta+\epsilon r;\quad r\leftarrow r+\tfrac{\epsilon}{2}\nabla\mathcal L(\theta).
> $$
> $\text{leapfrog}_{\epsilon,L}(\theta,r)$ denotes $L$ such updates. It is reversible and volume preserving, so with $(\theta',-r')=\text{leapfrog}_{\epsilon,L}(\theta,r)$ the pair $(\theta',r')$ is a Metropolis proposal accepted with probability $\alpha=\min\{1,p(\theta',r')/p(\theta,r)\}$ (paper eq. 1 and the text following it). Momenta are then refreshed $r\sim\mathcal N(0,I)$, a valid Gibbs move.
^def-leapfrog

> [!theorem] Step size and number of steps decouple (empirical/geometric fact used by the paper)
> Over long trajectories the energy error is $O(\epsilon^2)$, so $\epsilon$ must be small enough for a reasonable acceptance rate. Because the leapfrog is symplectic, the energy change does not depend strongly on $L$ (Hairer et al. 2006), so $\epsilon$ can be tuned to a high-but-not-too-high acceptance rate using standard adaptive-MCMC heuristics, independently of the trajectory length $T=\epsilon L$.
^thm-step-size-decoupling

**Tuning $L$ is harder.** Pasarica and Gelman (2010) observe that maximising expected squared jumped distance (ESJD) $\mathbb E[\|\theta'-\theta\|^2]$ minimises the variance-weighted sum over dimensions of first-order autocorrelations. That motivates NUTS (Hoffman and Gelman 2014): integrate until a "U-turn" (increasing $L$ would reduce the distance from the proposal to the start).

**Why NUTS is unattractive on GPUs.**
- It needs about half of its leapfrog steps just to satisfy detailed balance (Wu et al. 2018), and often takes more leapfrog steps than a well-tuned HMC.
- It is a recursive, control-flow-heavy algorithm and each chain may use a different number of leapfrog steps per iteration, so batched implementations need padding and masks (Radul et al. 2020; Lao and Dillon 2019; Phan and Pradhan 2019).
- A simple synchronous HMC with $T$ set well can therefore produce low-bias, low-variance estimates in much less wall-clock time on the same hardware, **but only if** someone sets $L$. ChEES-HMC is the proposal for doing that automatically.

> [!example] Figure 1 (motivating result)
> Target: the centred 13th regression coefficient $\tau\beta_{13}\lambda_{13}$ of the German-credit **sparse logistic regression** (section 3). Statistic: probability that its magnitude is below 0.01. All algorithms run 1000 iterations with adaptation frozen after 500; estimates use the second half of the chain.
> - On a Pascal Titan X, 100 NUTS chains take less than twice the time of 4 NUTS chains, so 100-chain NUTS beats 4-chain NUTS.
> - But NUTS takes about four times as long as ChEES-HMC for 1000 iterations with 100 chains, and finishes with an ESS about half that of ChEES-HMC. Altogether ChEES-HMC reaches NUTS-quality estimates almost an order of magnitude faster.
^ex-figure1

```python
# Minimal leapfrog + Metropolis step for a batch of chains (numpy, tested)
import numpy as np
def leapfrog(theta, r, eps, n, gradL):
    r = r + 0.5*eps*gradL(theta)
    for i in range(n):
        theta = theta + eps*r
        r = r + (eps if i < n-1 else 0.5*eps)*gradL(theta)
    return theta, r
# theta, r have shape (n_chains, D): all chains advance in lockstep, one gradient call per step.
```

## Examples

The batching idea is the whole point: `gradL(theta)` is called once per leapfrog step for *all* chains, so on a GPU the cost is nearly flat in the number of chains until the device saturates ([[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]]).

## Connections

Foundations are in [[Efficient MCMC]] and [[HMC and Stan in Practice]]; the geometry of $\mathcal L$ (typical set) is discussed in [[The Typical Set and the Log Posterior Density]]. The trajectory-length tuning is derived in [[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]] and [[Hoffman 2021 - ChEES Criterion and Algorithm 1]].

## See Also
[[Hoffman 2021 - ChEES-HMC - Overview]], [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]]
