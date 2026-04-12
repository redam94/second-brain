---
title: "Introduction to Bayesian Computation"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/computation
  - topic/importance-sampling
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Computation"
aliases:
  - "Importance sampling"
  - "Rejection sampling"
doc_type: concept
source_location: "BDA3 Ch.10, pp. 261-274"
depends_on:
  - "[[Probability and Bayesian Inference]]"
  - "[[Multiparameter Models]]"
  - "[[raw/BDA3.pdf]]"
used_by:
  - "[[MCMC Basics]]"
  - "[[Efficient MCMC]]"
  - "[[BDA3 - Overview]]"
---

# Introduction to Bayesian Computation

> [!summary]
> Chapter 10 of BDA3 introduces the fundamental computational methods for Bayesian inference: numerical integration, direct simulation, and importance sampling. These are building blocks for the MCMC methods in Chapters 11-12.

## Key Methods

### Direct Simulation and Rejection Sampling
- Draw from $g(\theta)$ and accept with probability proportional to $p(\theta \mid y) / M g(\theta)$
- Simple but inefficient in high dimensions — most draws are rejected

### Importance Sampling
Draw from an approximating distribution $g(\theta)$ and reweight:

$$
\text{E}[h(\theta) \mid y] \approx \frac{\sum_{s=1}^S h(\theta^s) w(\theta^s)}{\sum_{s=1}^S w(\theta^s)}, \quad w(\theta^s) = \frac{q(\theta^s \mid y)}{g(\theta^s)}
$$

**Effective sample size** measures the quality of the approximation:

$$
S_{\text{eff}} = \frac{1}{\sum_{s=1}^S (\tilde{w}(\theta^s))^2}
$$

> [!warning]
> Importance sampling fails when $g$ has thinner tails than the target — a few extreme weights dominate. Pareto-smoothed IS (PSIS) addresses this.

## How Many Draws Are Needed?

- $S = 100$ independent draws typically suffice for posterior means (Monte Carlo error $\approx s_\theta / \sqrt{S}$)
- Extreme quantiles and rare-event probabilities need $S = 1000$+
- The factor $\sqrt{1 + 1/S}$ shows that Monte Carlo error is negligible relative to posterior uncertainty even at moderate $S$

## Computing Environments

- **BUGS**: pioneered general-purpose Bayesian computing via Gibbs sampling
- **Stan**: modern platform using [[Efficient MCMC|Hamiltonian Monte Carlo]], more efficient for complex models
- **PyMC**: Python-based alternative

## See Also

- [[MCMC Basics]] — iterative simulation for complex posteriors
- [[Efficient MCMC]] — HMC and Stan
- [[Fitting and Validating Computation]] — workflow for validating computation
