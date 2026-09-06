---
title: "Index: Computation"
tags:
  - type/index
  - source/ingested
parent: "[[Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-04-09
concept_count: 5
doc_type: index
folder: "Research/Bayesian Statistics/Computation"
source: ""
date_ingested: "N/A"
depends_on: []
used_by: []
source_location: "N/A"
---

# Computation

> [!abstract] Routing Summary
> This folder covers computational methods for Bayesian inference from BDA3 Part III and Statistical Rethinking Chapter 8. Contains 5 notes.
> - Need rejection/importance sampling basics? -> [[Introduction to Bayesian Computation]]
> - Need Gibbs sampler or Metropolis-Hastings? -> [[MCMC Basics]]
> - Need HMC, NUTS, or Stan? -> [[Efficient MCMC]] or [[HMC and Stan in Practice]]
> - Need variational inference or Laplace approximation? -> [[Approximation Methods]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Numerical integration, rejection sampling, importance sampling | [[Introduction to Bayesian Computation]] | concept | [[Probability and Bayesian Inference]], [[Multiparameter Models]] | Foundation for all computational methods |
| Gibbs sampler, Metropolis-Hastings, R-hat, n_eff | [[MCMC Basics]] | concept | [[Introduction to Bayesian Computation]], [[Probability and Bayesian Inference]], [[Hierarchical Models]] | Convergence diagnostics with R-hat and n_eff |
| HMC, NUTS, Stan, reparameterization | [[Efficient MCMC]] | concept | [[MCMC Basics]], [[Introduction to Bayesian Computation]] | HMC scales to high dimensions via gradient info |
| Variational inference, Laplace, expectation propagation | [[Approximation Methods]] | concept | [[Asymptotics and Frequentist Connections]], [[Efficient MCMC]], [[Probability and Bayesian Inference]] | Fast approximate posteriors trading accuracy for speed |
| King Markov parable, HMC/NUTS intuition, map2stan | [[HMC and Stan in Practice]] | tutorial | [[MCMC Basics]], [[Efficient MCMC]], [[Garden of Forking Data]] | Practical HMC diagnostics and Stan workflow |

## Notes
- [[Introduction to Bayesian Computation]] — CONTAINS: Numerical integration, rejection sampling, importance sampling, simulation basics
- [[MCMC Basics]] — CONTAINS: Gibbs sampler, Metropolis-Hastings algorithm, convergence diagnostics (R-hat, n_eff), mixing
- [[Efficient MCMC]] — CONTAINS: Hamiltonian Monte Carlo, NUTS algorithm, Stan interface, reparameterization tricks
- [[Approximation Methods]] — CONTAINS: Variational inference (ADVI), Laplace approximation, expectation propagation, accuracy-speed tradeoff
- [[HMC and Stan in Practice]] — CONTAINS: King Markov parable, HMC/NUTS intuition, map2stan interface, practical diagnostics

## Sources

- [[raw/BDA3.pdf]] — Bayesian Data Analysis, 3rd Edition (Gelman et al.), Part III (pp. 259-349)
- [[raw/StatRethink-Bayes.pdf]] — Statistical Rethinking (McElreath, 2015), Chapter 8
