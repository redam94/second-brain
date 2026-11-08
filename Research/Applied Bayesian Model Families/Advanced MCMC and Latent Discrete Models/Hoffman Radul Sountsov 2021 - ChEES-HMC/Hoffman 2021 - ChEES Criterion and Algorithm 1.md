---
title: "Hoffman 2021 - ChEES Criterion and Algorithm 1"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/definition
  - doc/paper
source: "[[raw/Hoffman Radul Sountsov 2021 - Adaptive-MCMC Scheme for Setting Trajectory Lengths in HMC.pdf]]"
source_location: "Sec. 2.2, pp. 4-6; Algorithm 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Radul Sountsov 2021 - ChEES-HMC"
doc_type: paper
depends_on:
  - "[[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]]"
  - "[[Hoffman 2021 - HMC Background and the GPU Problem for NUTS]]"
used_by:
  - "[[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]]"
  - "[[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]]"
aliases:
  - "ChEES criterion"
  - "ChEES-HMC algorithm"
  - "Change in the Estimator of the Expected Square"
---

# Hoffman 2021 - ChEES Criterion and Algorithm 1

> [!summary]
> The ChEES criterion is $\tfrac14\mathbb E[(\|\theta'-\mathbb E\theta\|^2-\|\theta-\mathbb E\theta\|^2)^2]$: an ESJD of the centred, squared norm. It is shift/rotation invariant, dominated by high-variance directions and focused on second moments. Algorithm 1 ascends its gradient with Adam on $\log T$ using one jittered length per iteration shared by all chains, weights chains by acceptance probability, and tunes step size by dual averaging on the harmonic-mean acceptance probability (target 0.651).

## Overview

Section 2.1 argued for minimising first-order autocorrelation of $((\theta-\mathbb E\theta)^\top v)^2$ with $v$ the highest-variance direction. We cannot know $v$, so ChEES is a heuristic satisfying three desiderata: (i) invariance to shifts and rotations, (ii) insensitivity to low-variance directions, (iii) focus on second-moment estimation.

## Main Content

> [!definition] ChEES (eq. 7)
> With $\theta\sim p$, $r\sim\mathcal N(0,I)$ at equilibrium and $(\theta',r')=\text{leapfrog}_{\epsilon,L}(\theta,r)$:
> $$\text{ChEES}\triangleq\tfrac14\,\mathbb E\Big[\big(\|\theta'-\mathbb E[\theta]\|^2-\|\theta-\mathbb E[\theta]\|^2\big)^2\Big].$$
> Centring gives shift invariance; dependence only on squared norms gives rotation invariance.
^def-chees

> [!theorem] ChEES decomposition (eqs 8-9)
> Take $\mathbb E[\theta]=0$, $\mathbb E[\theta_i\theta_j]=0$ for $i\ne j$, and $\sigma_\cdot^2=\sum_d\sigma_d^2$. Then
> $$\text{ChEES}=\tfrac12\mathbb E[(\|\theta\|^2-\sigma_\cdot^2)^2]-\tfrac12\mathbb E[(\|\theta'\|^2-\sigma_\cdot^2)(\|\theta\|^2-\sigma_\cdot^2)].$$
> The first term is constant in $T$. The second equals $\sum_i(\mathbb E[\theta_i^4]-\sigma_i^4)\,\rho_i+\sum_{i,j\ne i}\mathbb E[((\theta_i')^2-\sigma_i^2)(\theta_j^2-\sigma_j^2)]$ where $\rho_i$ is the first-order autocorrelation of $\theta_i^2$. The cross terms are small if dimensions are approximately independent after rotation. The weights $\mathbb E[\theta_i^4]-\sigma_i^4$ (the variance of $\theta_i^2$) are generally proportional to $\sigma_i^4$, so the criterion **aggressively weights high-variance directions**, as desired.
^thm-chees-decomposition

> [!theorem] Gradient with respect to $T$ (eq. 10)
> $$\frac{d}{dT}\int_0^1\mathbb E_r\!\Big[\tfrac14\big(\|\theta'(uT,\theta,r)-\mathbb E\theta\|^2-\|\theta-\mathbb E\theta\|^2\big)^2\Big]du=\int_0^1u\,\mathbb E_r\!\Big[\big(\|\theta'(uT)-\mathbb E\theta\|^2-\|\theta-\mathbb E\theta\|^2\big)\,(\theta'(uT)-\mathbb E\theta)^\top r'(uT)\Big]du.$$
> *Sketch.* Differentiate $\theta'(uT)$ along Hamilton's equations: $\partial\theta'/\partial t=r'$. The integral over $u$ is the Monte Carlo average over the uniform jitter $t=uT$.
^thm-chees-gradient

### Algorithm 1 (ChEES-HMC) in words

Inputs: unnormalised target, initial states $\theta_0^{(m)}$ for chains $m=1..M$, initial step size $\epsilon_0$, $N$ samples, $N_{\text{warmup}}$, Halton sequence $h_{1:N}$. Initialise $T_0=\epsilon_0$ and moving averages $\bar T=\bar\epsilon=0$.

For $n=1..N$:
1. Draw momenta $r^{(m)}\sim\mathcal N(0,I)$ and pick the jittered length $t_n=h_nT_{n-1}$.
2. Propose $\tilde\theta^{(m)},\tilde r^{(m)}=\text{leapfrog}_{\epsilon_{n-1},\lceil t_n/\epsilon_{n-1}\rceil}(\theta^{(m)}_{n-1},r^{(m)})$.
3. Accept with $\alpha_n^{(m)}=\min\{1,\exp(\mathcal L(\tilde\theta)-\mathcal L(\theta_{n-1}))\,\mathcal N(\tilde r;0,I)/\mathcal N(r;0,I)\}$.
4. If $n<N_{\text{warmup}}$: compute the harmonic-mean acceptance $\bar\alpha=\big((1/M)\sum_m1/\alpha^{(m)}\big)^{-1}$ and update $\epsilon_n$ by dual averaging toward $\bar\alpha=0.651$; estimate means $\hat{\tilde\theta}=\frac1M\sum\tilde\theta^{(m)}$, $\hat\theta=\frac1M\sum\theta_{n-1}^{(m)}$; compute per-chain gradient estimates
   $$\hat g^{(m)}=t_n\big(\|\tilde\theta^{(m)}-\hat{\tilde\theta}\|^2-\|\theta^{(m)}_{n-1}-\hat\theta\|^2\big)(\tilde\theta^{(m)}-\hat{\tilde\theta})^\top\tilde r^{(m)},$$
   combine $\hat g=\sum_m\alpha^{(m)}\hat g^{(m)}/\sum_m\alpha^{(m)}$, update $\log T_n$ with Adam, and set $\bar\epsilon\leftarrow0.9\bar\epsilon+0.1\epsilon_n$, $\bar T\leftarrow0.9\bar T+0.1T_n$.
5. At $n=N_{\text{warmup}}$ freeze $\epsilon_{n:N}=\bar\epsilon$, $T_{n:N}=\bar T$.

> [!definition] Design choices and their rationale
> - **Adam** on $\log T$ because the scale of $\hat g$ is problem dependent: step size $\alpha=0.025$ (not sensitive), $\beta_1=0$ (no momentum), $\beta_2=0.95$.
> - **One shared $t$** for all chains so every chain does the same work per iteration (simpler, faster code on SIMD).
> - **Weight by acceptance probability** so obviously invalid states do not drive $\hat g$.
> - **Estimate $\mathbb E[\theta]$** from the initial and final integrator states across chains.
> - **Harmonic-mean acceptance** prevents a "straggler" chain stuck in a region requiring small steps from being ignored by an arithmetic average; if any chain has tiny $\alpha$ the harmonic mean pulls $\epsilon$ down for all.
> - **Round up** $t$ to an integer multiple of $\epsilon$; adapt $T$ **only during warmup** to avoid bias from hyperparameters depending on recent states.
> - **Halton sequence** (Owen 2017) instead of i.i.d. uniform jitter for more evenly spread lengths. It is determined a priori so the stationary distribution is unaffected.
^def-chees-design

## Examples

> [!example] Numpy sketch of ChEES-HMC on a 3-D Gaussian (tested)
> Target $\mathcal N(0,\text{diag}(1,3,0.3)^2)$, 64 chains, 1500 iterations, 1000 warmup. In three seeds the adapted $T$ ended at about 6.0, 6.2 and 6.5, close to the $2.25\,\sigma_{\max}=6.75$ rule from [[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]] (the match is approximate, not guaranteed; this is an illustration, not the paper's code).
> ```python
> import numpy as np
> def halton(i, b=2):
>     f, r = 1.0, 0.0
>     while i > 0: f /= b; r += f*(i % b); i //= b
>     return r
> # per iteration n, with theta (M,D), eps, T, adam state:
> #   t = halton(n)*T ; L = ceil(t/eps) ; r ~ N(0,I)
> #   th2, r2 = leapfrog(theta, r, eps, L, gradL)
> #   a = min(1, exp(logp(th2)-logp(theta) - .5|r2|^2 + .5|r|^2))
> #   g_m = t*(|th2-mean(th2)|^2 - |theta-mean(theta)|^2) * sum((th2-mean(th2))*r2, -1)
> #   g = sum(a*g_m)/sum(a);  Adam step on log T with lr .025, b1=0, b2=.95
> #   eps via dual averaging on harmonic mean of a (target .651)
> #   accept per chain with prob a;  freeze eps,T at warmup end (use EMAs)
> ```
^ex-chees-numpy

## Examples (PyMC-style)

**Motivating example E86** ([examples page](https://redam94.github.io/pymc-challenges/examples.html)): ChEES-HMC is available in blackjax. *Untested sketch:*
```python
import blackjax, jax, jax.numpy as jnp
# logdensity_fn: a JAX log-density over a flat position vector (e.g. from pymc.sampling.jax or hand-written)
warmup = blackjax.chees_adaptation(logdensity_fn, num_chains=128)
key = jax.random.key(0)
(last_states, parameters), _ = warmup.run(key, initial_positions, step_size=0.1, optim=None, num_steps=500)
kernel = blackjax.dynamic_hmc(logdensity_fn, **parameters).step   # then jax.vmap over chains
```
API names and arguments may differ across blackjax versions; check the installed docs before use.

## Connections

Follows from [[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]]. Results: [[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]]. MEADS, the next step, replaces trajectory-length tuning by tuning damping in generalised HMC: [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]].

## See Also
[[Hoffman 2021 - ChEES-HMC - Overview]], [[Efficient MCMC]]
