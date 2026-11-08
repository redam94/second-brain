---
title: "Stochastic Volatility and the Inference Frontier"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/concept
  - doc/concept
source: "concept note, no raw source"
source_location: "Concept note, no raw source (Kim, Shephard and Chib 1998 as used in Hoffman 2021 eq. 16 and Hoffman 2022 Table 1; Betancourt and Girolami 2015; Yao et al. 2018; Zhang et al. 2022)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Concept Notes - Discrete Latents and Inference Frontier"
doc_type: concept
depends_on:
  - "[[Betancourt 2015 - Hierarchical Geometry and the Funnel]]"
  - "[[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]]"
used_by:
  - "[[Hoffman 2022 - MEADS - Experiments and Ablations]]"
aliases:
  - "Inference frontier"
  - "Latent volatility sampling"
  - "When plain NUTS is not enough"
---

# Stochastic Volatility and the Inference Frontier

> [!summary]
> Stochastic volatility (SV) has one latent log-volatility per time step plus a few global parameters: a funnel-prone, high-dimensional state-space model that appears as a stress target in both the ChEES and MEADS papers. "The inference frontier" is the regime where plain NUTS struggles (funnel geometry, strong posterior coupling, large $T$) and one must choose among reparameterisation, adapted NUTS, many-chain GPU samplers, or approximate inference, and judge trust with diagnostics such as Pareto $\hat k$ when no reference posterior exists. This is a concept note with no raw source.

## Overview

**Motivating PyMC example:** **E12** "The inference frontier: when plain NUTS is not enough" (S&P 500 latent volatility; reference posterior; low-rank and normalizing-flow adapted NUTS; Laplace / ADVI / Pathfinder; Pareto $\hat k$ as a trust diagnostic), at [the examples page](https://redam94.github.io/pymc-challenges/examples.html).

## Main Content

> [!definition] Stochastic volatility model (Kim, Shephard and Chib 1998, as written in the ChEES paper, eq. 16)
> $\sigma\sim\text{HalfCauchy}(0,2)$, $\mu\sim\text{Exponential}(1)$, $\tfrac{\phi+1}2\sim\text{Beta}(20,1.5)$, $z_n\sim\mathcal N(0,1)$,
> $h_1=\mu+\dfrac{\sigma z_1}{\sqrt{1-\phi^2}}$, $h_{n>1}=\mu+\sigma z_n+\phi(h_{n-1}-\mu)$, $y_n\sim\mathcal N(0,e^{h_n/2})$.
> Three top-level parameters $(\sigma,\mu,\phi)$ and $N$ per-step latents, here $N=3000$ so $D=3003$ (ChEES, synthetic data drawn from the prior), and $D=2519$ for the MEADS Inference Gym target `VectorizedStochasticVolatilityLogSP500` (log S&P 500 returns). The ChEES paper samples the innovations $z_n$ (a **non-centred** parameterisation: $h$ is a deterministic function of $(\mu,\phi,\sigma,z)$), not $h$ itself; the MEADS paper does not spell out the parameterisation of its Inference Gym target.
^def-sv-model

**Why it is hard.** (1) *Funnel:* $\sigma$ scales every innovation, so when $\sigma$ is small the $h$-path is tightly determined by $\mu,\phi$ (high density, small volume) and when large it is loose ([[Betancourt 2015 - Hierarchical Geometry and the Funnel]]); a centred sampler on $h_n$ shows the same divergences as an eight-schools centred model. (2) *Weak data per latent:* each $y_n$ carries information about $h_n$ only via $|y_n|$ and with noise $\chi^2_1$-like, so the likelihood is weak and non-centring wins ([[Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation]]). (3) *Dimension and coupling:* the path $h_{1:N}$ is a stiff autoregression ($\phi\approx0.95-0.99$), giving long correlation length scales and, plausibly, an ill-conditioned posterior (a general expectation, not a figure from the papers).

> [!example] Benchmarks from the vault sources (stochastic volatility rows)
> | Source | Target / metric | NUTS | ChEES | MEADS | Other |
> |---|---|---|---|---|---|
> | Hoffman 2021 Table 1 | ESS per gradient ($D=3003$) | 6.95e-4 | **1.94e-3** | - | grid HMC 1.71e-3; EHMC 8.08e-5; ESJD-HMC 1.16e-3 |
> | Hoffman 2022 Table 2 | gradients to bias$^2\le0.01$ ($D=2519$) | 4073 | 2980 | **2760** | |
> | Hoffman 2022 Table 2 | grads/ESS | **146** | 180 | 315 | |
> Reading: many-chain, trajectory-tuned HMC (ChEES) is 2.8x better than NUTS per gradient on SV, and MEADS/ChEES converge in about 30% fewer gradients than NUTS, while NUTS has the best asymptotic grads/ESS. For the 2022 SV target the "very low bias" statistic was unavailable because bias could not be estimated at this dimension. See [[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]], [[Hoffman 2022 - MEADS - Experiments and Ablations]].
^ex-sv-benchmarks

> [!theorem] Options along the frontier (concept-level, no new quantitative claims)
> 1. **Reparameterise** (non-centre innovations; whiten; use a Kronecker or state-space structure) before touching the sampler.
> 2. **Better NUTS adaptation:** dense or low-rank mass matrices; normalizing-flow preconditioning (NeuTra, Hoffman et al. 2019, cited in the ChEES paper).
> 3. **Many-chain accelerators:** ChEES-HMC, MEADS ([[Hoffman 2021 - ChEES-HMC - Overview]], [[Hoffman 2022 - MEADS - Overview]]) when per-gradient cost is low and parallelism is cheap (E86).
> 4. **Approximate inference:** Laplace, ADVI (Kucukelbir et al. 2017), Pathfinder (Zhang et al. 2022), fast but with unknown error.
> 5. **Trust diagnostics without a reference:** Pareto $\hat k$ of the importance ratios $p/q$ for an approximation $q$ (Yao et al. 2018; Vehtari et al. 2017, PSIS): $\hat k<0.5$ good, $0.5\le\hat k<0.7$ usable with caution, $\hat k\ge0.7$ unreliable (the thresholds commonly quoted by those authors). With a reference posterior (long NUTS run), compare marginals directly.
^thm-frontier-options

```python
import numpy as np
rng = np.random.default_rng(5)
mu, phi, sig, n = -1.0, 0.95, 0.2, 500
h = np.zeros(n); h[0] = mu + sig/np.sqrt(1-phi**2)*rng.normal()
for k in range(1, n): h[k] = mu + phi*(h[k-1]-mu) + sig*rng.normal()
y = np.exp(h/2)*rng.normal(size=n)
print(h.std(), sig/np.sqrt(1-phi**2))   # stationary sd of h: 0.64 vs 0.64 (tested)
```

## Examples (PyMC-style)

Non-centred SV (*untested sketch*; mirrors ChEES eq. 16, with the recursion via `scan`):
```python
import pymc as pm, pytensor, pytensor.tensor as pt
with pm.Model() as sv:
    sigma = pm.HalfCauchy("sigma", 2.0); mu = pm.Exponential("mu", 1.0)
    phi_raw = pm.Beta("phi_raw", 20, 1.5); phi = pm.Deterministic("phi", 2*phi_raw - 1)
    z = pm.Normal("z", 0, 1, shape=N)
    def step(z_t, h_prev, mu, phi, sigma): return mu + sigma*z_t + phi*(h_prev - mu)
    h1 = mu + sigma*z[0]/pt.sqrt(1 - phi**2)
    hrest, _ = pytensor.scan(step, sequences=z[1:], outputs_info=h1, non_sequences=[mu, phi, sigma])
    h = pm.Deterministic("h", pt.concatenate([h1[None], hrest]))
    pm.Normal("y", 0, pt.exp(h/2), observed=y)
```

## Relevance to marketing measurement

Time-varying scale models (volatile sales, demand shocks, time-varying coefficient and variance in MMM) share SV's structure: a long latent time series with a global scale. The same advice applies: non-centre, check divergences, and when you must use approximations, quantify trust with Pareto $\hat k$ or a reference run on a subsample. Related: [[State-Space Models and the Kalman Filter - Overview]].

## Connections

[[Efficient MCMC]], [[The Typical Set and the Log Posterior Density]], [[Betancourt 2015 - HMC for Hierarchical Models - Overview]], [[Hoffman 2022 - MEADS - Overview]].

## See Also
[[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]], [[The Kalman Filter]]

## References (cited, not ingested)
Kim, S., Shephard, N. and Chib, S. (1998) *Stochastic volatility: likelihood inference and comparison with ARCH models*, Rev. Econ. Studies 65(3):361-393; Yao, Vehtari, Simpson and Gelman (2018) *Yes, but did it work?*, ICML; Vehtari, Gelman and Gabry (2017) PSIS-LOO; Kucukelbir et al. (2017) ADVI, JMLR; Zhang, Carpenter, Gelman and Vehtari (2022) Pathfinder, JMLR; Hoffman et al. (2019) NeuTra-lizing bad geometry in HMC.
