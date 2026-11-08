---
title: "Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/concept
  - doc/paper
source: "[[raw/Hoffman Radul Sountsov 2021 - Adaptive-MCMC Scheme for Setting Trajectory Lengths in HMC.pdf]]"
source_location: "Sec. 3.3, 4 and References, pp. 8-9; Figure 4"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Radul Sountsov 2021 - ChEES-HMC"
doc_type: paper
depends_on:
  - "[[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]]"
  - "[[Hoffman 2021 - ChEES Criterion and Algorithm 1]]"
used_by:
aliases:
  - "ChEES jitter ablation"
  - "Many chains short run workflow"
---

# Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice

> [!summary]
> Uniform jitter between 0 and $T$ is always close to optimal; less jitter is often worse and "disastrous" on the Gaussian. Halton jitter reduces variability of the adapted $T$. The discussion recommends running tens of chains for a few post-warmup iterations when only a few hundred effective samples are needed. This note also records the reference list and limitations.

## Overview

Section 3.3 scales the Halton sequence between $(1-\alpha)T$ and $T$ for $\alpha\in\{0,0.25,0.5,0.75,1\}$ (Figure 4, where red circles and blue triangles mark ESS for first and second moments) and replaces Halton by pseudo-random uniform numbers. Section 4 summarises.

## Main Content

> [!theorem] Jitter ablation findings (Sec. 3.3)
> 1. Jittering uniformly in $(0,T)$ is always close to optimal; smaller jitter ranges are often worse.
> 2. As predicted by the cosine analysis, too little jitter on the Gaussian is disastrous, and inadequate jitter also hurts logistic, probit and sparse-logistic regression. On other models jitter has little effect on ESS/gradient.
> 3. Conclusion: jitter the number of leapfrog steps uniformly between 1 and $T/\epsilon$ for robustness against resonances at little cost.
> 4. Halton sequences consistently reduce the variability of the trajectory length ChEES chooses compared with uniform random draws; step-size tuning varies little either way.
^thm-jitter-ablation

**Discussion points (Sec. 4).**
- ChEES-HMC is competitive with NUTS per gradient and "really shines" with many parallel chains on a GPU because it lacks control-flow overhead.
- On a GPU, tens of chains cost about as much wall-clock as a few CPU chains. Since an ESS of a few hundred often suffices (Monte Carlo error small relative to posterior uncertainty), one may run about 50 chains for a few iterations past warmup (Hoffman and Ma 2020), far fewer iterations than CPU workflows use.

> [!example] Back-of-envelope budget for a many-chain run
> Target ESS 400 per quantity. With 128 chains and an integrated autocorrelation time of about 10 draws, each chain needs about $400/128\times10\approx32$ post-warmup draws. If one gradient batch for 128 chains costs about the same as 4 CPU chains (the paper's observation up to roughly 50-100 chains), the cost is dominated by warmup. This is an illustration of the paper's argument, not a result from the paper.

### Limitations and cautions

- Adaptation is frozen after warmup (to avoid bias); a poorly chosen warmup is not corrected later. MEADS removes this limitation via ensemble-chain adaptation ([[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]]).
- The heuristic is derived for near-Gaussian shapes; funnels need reparameterisation regardless ([[Betancourt 2015 - Hierarchical Geometry and the Funnel]]).
- Shared step size across chains: stragglers handled with the harmonic mean rather than per-chain step sizes.
- Supplement (not reproduced in the main paper) holds additional plots; this vault note covers the main text.

### Reference list (as cited)

Key references: Neal (2011) *MCMC using Hamiltonian dynamics*; Hoffman and Gelman (2014) NUTS; Pasarica and Gelman (2010) ESJD; Andrieu and Thoms (2008) adaptive MCMC tutorial; Wu, Stoehr and Robert (2018) empirical HMC; Lao and Dillon (2019) unrolled NUTS; Lao et al. (2020) `tfp.mcmc`; Radul et al. (2020) auto-batching control-intensive programs; Kingma and Ba (2015) Adam; Owen (2017) randomised Halton; Kim, Shephard and Chib (1998) stochastic volatility; Hoffman et al. (2019) NeuTra; Hoffman and Ma (2020) black-box VI as distilled Langevin; Hairer, Lubich and Wanner (2006) geometric integration; Carpenter et al. (2017) Stan; Salvatier et al. (2016) PyMC3.

## Examples (PyMC-style)

For E86, a GPU many-chain run in PyMC/JAX typically looks like the following *untested* sketch (blackjax adapters need a JAX log-density, e.g. via `pymc.sampling.jax.get_jaxified_logp`):
```python
import pymc as pm, jax, blackjax
from pymc.sampling.jax import get_jaxified_logp
with model: logp = get_jaxified_logp(model)      # takes a list of unconstrained arrays
# flatten to a single vector logdensity_fn, then use blackjax.chees_adaptation (see ChEES note)
```

## Connections

Ties back to [[Hoffman 2021 - ChEES Criterion and Algorithm 1]] and [[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]]. Practical MCMC context: [[Efficient MCMC]], [[HMC and Stan in Practice]].

## See Also
[[Hoffman 2021 - ChEES-HMC - Overview]], [[Hoffman 2022 - MEADS - Overview]]
