---
title: "Efficient MCMC"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/hmc
  - topic/stan
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Computation"
aliases:
  - "Hamiltonian Monte Carlo"
  - "HMC"
  - "Stan"
  - "NUTS"
doc_type: concept
source_location: "BDA3 Ch.12, pp. 293-310"
depends_on:
  - "[[MCMC Basics]]"
  - "[[Introduction to Bayesian Computation]]"
  - "[[raw/BDA3.pdf]]"
used_by:
  - "[[HMC and Stan in Practice]]"
  - "[[Approximation Methods]]"
  - "[[Computational Troubleshooting]]"
  - "[[Fitting and Validating Computation]]"
  - "[[Nonparametric Models Overview]]"
---

# Efficient MCMC

> [!summary]
> Chapter 12 of BDA3 covers advanced MCMC methods, especially Hamiltonian Monte Carlo (HMC), which uses gradient information to make large, efficient moves through parameter space. Stan implements HMC for general models.

## Improving Gibbs and Metropolis

- **Reparameterization**: transform to reduce posterior correlations (e.g., centering/non-centering in hierarchical models)
- **Auxiliary variables / data augmentation**: add latent variables to simplify conditionals (e.g., $t$ distribution as normal-inverse-$\chi^2$ mixture)
- **Parameter expansion**: adding redundant parameters can break dependence and improve mixing
- **Adaptive Metropolis**: tune the jumping distribution during warmup, then fix for inference

## Hamiltonian Monte Carlo (HMC)

Treats sampling as simulating Hamiltonian dynamics with position $\theta$ and momentum $\phi$:

$$H(\theta, \phi) = -\log p(\theta \mid y) + \frac{1}{2}\phi^T M^{-1} \phi$$

Key properties:
- Uses **gradient** $\nabla \log p(\theta \mid y)$ to guide proposals — far more efficient than random walks
- Proposals travel far in parameter space while maintaining high acceptance rates
- Scales much better to high dimensions than random-walk Metropolis
- **NUTS** (No-U-Turn Sampler): automatically tunes the trajectory length

## Stan

Stan is the modern platform for Bayesian inference:
- Implements NUTS (adaptive HMC)
- Requires differentiable log-posteriors (automatic differentiation)
- Models specified in a declarative language
- Interfaces: RStan, PyStan, CmdStan

## See Also

- [[MCMC Basics]] — the foundational algorithms
- [[Approximation Methods]] — alternatives when MCMC is too slow
- [[Computational Troubleshooting]] — diagnosing and fixing HMC issues
