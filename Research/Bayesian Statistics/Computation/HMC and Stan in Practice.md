---
title: "HMC and Stan in Practice"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/mcmc
  - topic/hmc
  - topic/stan
  - type/tutorial
  - doc/textbook
source: "[[raw/StatRethink-Bayes.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Computation"
aliases:
  - "Hamiltonian Monte Carlo"
  - "Stan"
  - "map2stan"
  - "NUTS"
doc_type: tutorial
source_location: "Statistical Rethinking Ch.8, pp. 241-265"
depends_on:
  - "[[MCMC Basics]]"
  - "[[Efficient MCMC]]"
  - "[[Garden of Forking Data]]"
used_by:
  - "[[Statistical Rethinking - Overview]]"
date_updated: 2026-08-24
---

# HMC and Stan in Practice

> [!summary]
> Chapter 8 of Statistical Rethinking introduces Markov chain Monte Carlo through the King Markov parable, then covers Hamiltonian Monte Carlo (HMC) as implemented in Stan. The `map2stan` function translates `map`-style model definitions directly to Stan code, bridging the book's earlier quadratic approximation with full MCMC.

## Good King Markov

A parable introducing the Metropolis algorithm: a king visits islands in proportion to their population by flipping a coin to decide whether to move to the neighboring island or stay. Over time, the fraction of time spent on each island converges to the population proportions — sampling from the target distribution without knowing the normalizing constant.

## From Metropolis to Hamiltonian Monte Carlo

| Algorithm | Metaphor | Efficiency |
|-----------|----------|------------|
| Metropolis | Random walk among islands | Low — random proposals waste many steps |
| Gibbs (adaptive proposals) | Conjugate tricks | Medium — requires conjugate structure |
| **HMC** | Frictionless physics simulation | High — exploits gradient information to make long, directed jumps |

HMC treats the posterior surface as a landscape and simulates a particle sliding across it. The particle's momentum carries it to distant, high-probability regions efficiently.

**NUTS** (No-U-Turn Sampler) automates the tuning of HMC's trajectory length — it's the default algorithm in Stan.

## Using `map2stan`

The `rethinking` package's `map2stan` function takes the same model formula syntax as `map` but fits via Stan:

```r
m8.1 <- map2stan(
    alist(
        y ~ dnorm(mu, sigma),
        mu <- a + b*x,
        a ~ dnorm(0, 10),
        b ~ dnorm(0, 1),
        sigma ~ dcauchy(0, 2)
    ),
    data=d
)
```

## Diagnosing Your Markov Chain

Key diagnostics:
- **Trace plots**: chains should look like "hairy caterpillars" — well-mixed, stationary
- **$\hat{R}$ (R-hat)**: ratio of between-chain to within-chain variance; should be $\approx 1.00$
- **$n_{\text{eff}}$ (effective sample size)**: accounts for autocorrelation; want $n_{\text{eff}} > 200$ for reliable intervals
- **Divergent transitions**: indicate the sampler hit a region of extreme curvature — reparameterize the model

> [!warning] Divergent Transitions
> Never ignore divergent transitions. They indicate the posterior geometry is pathological. Common fix: use a non-centered parameterization for hierarchical models (see [[Efficient MCMC]]).

## See Also

- [[MCMC Basics]] — BDA3's formal treatment of MCMC theory (Ch 11)
- [[Efficient MCMC]] — BDA3's treatment of HMC and efficient computation (Ch 12)
- [[Computational Troubleshooting]] — Bayesian Workflow paper's diagnostic approach
- [[Approximation Methods]] — when you don't need full MCMC (ADVI, Laplace)
- [[SBC Case Studies]] — SBC reveals that HMC/NUTS passes while ADVI fails for even simple regressions
- [[Simulation-Based Calibration - Overview]] — rank-statistic uniformity test for validating NUTS convergence
- [[Statistical Rethinking - Overview]]
