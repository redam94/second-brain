---
title: "Hoffman 2021 - ChEES-HMC - Overview"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/overview
  - doc/paper
source: "[[raw/Hoffman Radul Sountsov 2021 - Adaptive-MCMC Scheme for Setting Trajectory Lengths in HMC.pdf]]"
source_location: "Whole paper, pp. 1-9 (AISTATS 2021, PMLR 130)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Radul Sountsov 2021 - ChEES-HMC"
doc_type: paper
depends_on:
  - "[[Efficient MCMC]]"
  - "[[HMC and Stan in Practice]]"
used_by:
  - "[[Hoffman 2021 - HMC Background and the GPU Problem for NUTS]]"
  - "[[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]]"
  - "[[Hoffman 2021 - ChEES Criterion and Algorithm 1]]"
  - "[[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]]"
  - "[[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]]"
aliases:
  - "ChEES-HMC overview"
  - "Hoffman Radul Sountsov 2021"
---

# Hoffman 2021 - ChEES-HMC - Overview

> [!summary]
> Hoffman, Radul & Sountsov (2021), *An Adaptive MCMC Scheme for Setting Trajectory Lengths in Hamiltonian Monte Carlo* (AISTATS, PMLR 130), propose **ChEES-HMC**: plain (non-NUTS) HMC whose maximum trajectory length $T$ is tuned by gradient ascent on the *Change in the Estimator of the Expected Square*, with the same $T$ and a jittered length shared by all chains. It matches or beats NUTS per gradient and, because it has almost no control flow, runs tens to hundreds of chains on a GPU at close to the wall-clock cost of a few. Key takeaway: many cheap synchronous chains plus a good trajectory length beat a smart-but-branchy sampler on accelerators.

## Overview

**Research question.** HMC needs a step size $\epsilon$ and a number of leapfrog steps $L$ (trajectory length $T=\epsilon L$). $\epsilon$ can be tuned by dual averaging toward an acceptance target, but how should $T$ be set? NUTS removes $T$ but its recursive control flow wastes about half its leapfrog steps and vectorises badly across chains on SIMD hardware (GPU/TPU).

**Contribution.**
1. A jittered-HMC analysis on Gaussians showing why jitter is mandatory and why $T\approx 2.25\,\sigma_{\max}$ is the right order ([[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]]).
2. The ChEES criterion and an adaptive-MCMC scheme (Algorithm 1) using Adam on $\log T$, Halton jitter, probability-weighted gradients averaged across chains, and harmonic-mean acceptance step-size tuning ([[Hoffman 2021 - ChEES Criterion and Algorithm 1]]).
3. Experiments on seven targets (ESS per gradient) and a V100-vs-CPU throughput study ([[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]]).
4. Jitter ablations and practical conclusions ([[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]]).

**Headline result.** ChEES-HMC achieves the best ESS/gradient among adaptive algorithms on 5 of 7 targets and is within a factor of two of grid-searched HMC on the other two; on a GPU, 100-chain NUTS takes about four times as long as ChEES-HMC for 1000 iterations and reaches about half its final ESS, so ChEES-HMC reaches NUTS-quality estimates almost an order of magnitude faster.

## Source Map

| Paper section | Content | Note |
|---|---|---|
| Abstract, 1 Introduction and background | HMC, leapfrog, step-size vs $L$, NUTS, SIMD motivation, Figure 1 | [[Hoffman 2021 - HMC Background and the GPU Problem for NUTS]] |
| 2 Tuning HMC to maximize ChEES (intro) | roadmap | [[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]] |
| 2.1 Autocorrelation analysis of the multivariate Gaussian (eqs 2-6, Fig. 2) | exact dynamics, cosine and sinc autocorrelations, $T=2.25\sigma_{\max}$ | [[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]] |
| 2.2 The ChEES criterion (eqs 7-10, Algorithm 1) | criterion, gradient, Adam, Halton, step-size tuning | [[Hoffman 2021 - ChEES Criterion and Algorithm 1]] |
| 3 Experiments, targets (eqs 11-16) | Banana, Gaussian, logistic, probit, sparse logistic, IRT, stochastic volatility | [[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]] |
| 3.1 Effective samples per gradient (Table 1) | ESS/gradient table | [[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]] |
| 3.2 Wallclock time per gradient (Fig. 3) | GPU vs CPU throughput | [[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]] |
| 3.3 Jitter ablations (Fig. 4) | jitter amount, Halton vs uniform | [[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]] |
| 4 Discussion | many short chains workflow | [[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]] |
| References, supplement pointers | NUTS, ESJD, EHMC, Adam, TFP | [[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]] (reference notes) |

## Motivating PyMC examples

From [the PyMC challenges examples page](https://redam94.github.io/pymc-challenges/examples.html):

- **E86** "GPU ensembles: ChEES-HMC and MEADS on a forest of 20,000 cells" (log-Gaussian Cox process, Barro Colorado Island trees, blackjax ChEES and MEADS, GPU vs CPU timing by chains, size and precision).
- **E12** "The inference frontier: when plain NUTS is not enough" (stochastic volatility): the stochastic-volatility target here (eq 16) is the same model family.

## Connections

- Existing vault: [[Efficient MCMC]] (HMC/NUTS foundations), [[HMC and Stan in Practice]], [[The Typical Set and the Log Posterior Density]].
- Sibling notes: [[Hoffman 2022 - MEADS - Overview]] (tuning-free GHMC from the same group; ChEES is its baseline), [[Betancourt 2015 - HMC for Hierarchical Models - Overview]] (the geometry that makes some targets hard).

## Relevance to marketing measurement

Bayesian MMM and geo-experiment models are typically hierarchical with a few hundred to tens of thousands of latent parameters and are re-fit often. When a model is large enough that one NUTS chain is slow but each gradient is cheap and batched, running 64-256 synchronised chains for a short post-warmup window (ESS of a few hundred is "enough" when posterior uncertainty dominates Monte Carlo error, per the paper's discussion) can cut wall-clock substantially. The caveat, from the paper itself, is that adaptation is frozen after warmup and that hard funnel geometry (see Betancourt & Girolami) is not fixed by a better trajectory length.

## See Also
[[Hoffman 2022 - MEADS - Overview]], [[Betancourt 2015 - HMC for Hierarchical Models - Overview]], [[Efficient MCMC]], [[HMC and Stan in Practice]]
