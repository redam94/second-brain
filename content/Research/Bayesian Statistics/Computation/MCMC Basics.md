---
title: "MCMC Basics"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/mcmc
  - topic/gibbs-sampler
  - topic/metropolis-hastings
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Computation"
aliases:
  - "Gibbs sampler"
  - "Metropolis-Hastings"
  - "Markov chain Monte Carlo"
doc_type: concept
source_location: "BDA3 Ch.11, pp. 275-292"
depends_on:
  - "[[Introduction to Bayesian Computation]]"
  - "[[Probability and Bayesian Inference]]"
  - "[[Hierarchical Models]]"
  - "[[raw/BDA3.pdf]]"
used_by:
  - "[[Efficient MCMC]]"
  - "[[HMC and Stan in Practice]]"
  - "[[Fitting and Validating Computation]]"
  - "[[Computational Troubleshooting]]"
  - "[[Bayesian Workflow - Overview]]"
  - "[[Bayesian Linear Regression]]"
---

# MCMC Basics

> [!summary]
> Chapter 11 of BDA3 introduces Markov chain Monte Carlo — the workhorse of Bayesian computation. MCMC constructs a Markov chain whose stationary distribution is the posterior, enabling sampling from complex, high-dimensional posteriors.

## Gibbs Sampler

Iteratively sample each parameter from its **full conditional** distribution:

$$\theta_j^{(t+1)} \sim p(\theta_j \mid \theta_{-j}^{(t)}, y)$$

- Requires known conditional distributions (often available for conjugate models)
- Each step updates one parameter block, cycling through all blocks
- Can be slow when parameters are highly correlated

## Metropolis-Hastings Algorithm

More general: propose a move $\theta^* \sim J(\theta^* \mid \theta^{(t)})$ and accept with probability:

$$\min\!\left(1,\; \frac{p(\theta^* \mid y)\, J(\theta^{(t)} \mid \theta^*)}{p(\theta^{(t)} \mid y)\, J(\theta^* \mid \theta^{(t)})}\right)$$

- **Random walk Metropolis**: $J(\theta^* \mid \theta) = N(\theta, c^2 \Sigma)$ — simple but can be slow in high dimensions
- Optimal acceptance rate: ~0.44 in 1D, ~0.23 in high dimensions

## Convergence Diagnostics

- **$\hat{R}$ statistic**: compare between-chain and within-chain variance across $m$ parallel chains. $\hat{R} < 1.1$ indicates approximate convergence
- **Effective sample size** $n_{\text{eff}}$: accounts for autocorrelation in the chain
- Run multiple chains from dispersed starting points
- Discard warmup/burn-in iterations

## See Also

- [[Introduction to Bayesian Computation]] — simpler methods for easier problems
- [[Efficient MCMC]] — HMC and NUTS, the modern standard
- [[Computational Troubleshooting]] — when MCMC goes wrong
- [[Fitting and Validating Computation]] — workflow context: how long to run, fake-data checks
- [[Bayesian Workflow - Overview]] — MCMC as one step in the full iterative cycle
- [[Hierarchical Models]] — the primary use case where MCMC is indispensable
