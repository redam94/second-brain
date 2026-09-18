---
title: "Approximation Methods"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/variational-inference
  - topic/laplace-approximation
  - topic/expectation-propagation
  - type/concept
  - doc/textbook
source: "[[raw/BDA3.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Computation"
aliases:
  - "Variational inference"
  - "Laplace approximation"
  - "Expectation propagation"
doc_type: concept
source_location: "BDA3 Ch.13, pp. 311-349"
depends_on:
  - "[[Asymptotics and Frequentist Connections]]"
  - "[[Efficient MCMC]]"
  - "[[Probability and Bayesian Inference]]"
  - "[[raw/BDA3.pdf]]"
used_by:
  - "[[HMC and Stan in Practice]]"
  - "[[Factor Analysis and PPCA]]"
  - "[[BDA3 - Overview]]"
  - "[[Variational Inference - Overview]]"
---

# Approximation Methods

> [!summary]
> Chapter 13 of BDA3 covers deterministic approximations to the posterior — faster alternatives to MCMC that trade exactness for speed. Useful for large datasets or rapid iteration.

## Laplace Approximation

Approximate the posterior with a Gaussian centered at the mode:

$$p(\theta \mid y) \approx N\!\left(\hat{\theta},\; \left[-\nabla^2 \log p(\theta \mid y)\big|_{\hat{\theta}}\right]^{-1}\right)$$

- Fast: only requires optimization + Hessian computation
- Exact in the limit as $n \to \infty$ (see [[Asymptotics and Frequentist Connections]])
- Fails for multimodal, skewed, or bounded posteriors
- Foundation for INLA (Integrated Nested Laplace Approximation)

## Variational Inference (VI)

Approximate $p(\theta \mid y)$ with a simpler distribution $q(\theta)$ by minimizing KL divergence:

$$q^* = \arg\min_{q \in \mathcal{Q}} \; \text{KL}(q \| p(\theta \mid y))$$

- **Mean-field VI**: factorizes $q(\theta) = \prod_j q_j(\theta_j)$ — fast but ignores posterior correlations
- **ADVI** (Automatic Differentiation VI): transforms to unconstrained space and uses gradient-based optimization
- Much faster than MCMC, useful for exploratory analysis and large datasets
- Tends to underestimate posterior variance

## Expectation Propagation (EP)

- Iteratively refines a global approximation by matching moments to each data point's contribution
- More accurate than mean-field VI for some problems
- Can be viewed as minimizing a reversed KL divergence

## When to Use What

| Method | Speed | Accuracy | Best for |
|--------|-------|----------|----------|
| MCMC/HMC | Slow | Exact (asymptotically) | Final inference |
| Laplace | Fast | Good if unimodal | Quick checks, INLA |
| VI | Fast | Approximate | Large data, exploration |
| EP | Medium | Good | Sparse/GP models |

## See Also

- [[Efficient MCMC]] — the exact alternative
- [[Fitting and Validating Computation]] — validating that approximations are adequate
- [[Variational Inference - Overview]] — full treatment of variational inference
