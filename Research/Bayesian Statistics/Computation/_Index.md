---
title: "Index: Computation"
tags:
  - type/index
  - source/ingested
parent: "[[Bayesian Statistics/_Index|Bayesian Statistics]]"
date_updated: 2026-09-18
concept_count: 21
---

# Computation

> [!abstract] Routing Summary
> This folder covers computational methods for Bayesian inference from BDA3 Part III and Statistical Rethinking Chapter 8. Contains 5 notes.
> - Need rejection/importance sampling basics? -> [[Introduction to Bayesian Computation]]
> - Need Gibbs sampler or Metropolis-Hastings? -> [[MCMC Basics]]
> - Need HMC, NUTS, or Stan? -> [[Efficient MCMC]] or [[HMC and Stan in Practice]]
> - Need variational inference or Laplace approximation? -> [[Approximation Methods]]
> - Need a **full treatment of variational inference** (ELBO, CAVI, black-box VI, ADVI, VAEs, normalizing flows, PSIS k-hat / VSBC diagnostics)? -> [[Variational Inference/_Index|Variational Inference]]
> - Need **neural simulation-based inference** (NPE / NLE / NRE, conditional normalizing flows, amortized vs sequential, SBI benchmarking, ABM calibration)? -> [[Neural Simulation-Based Inference/_Index|Neural Simulation-Based Inference]]

## Sub-topics

| Sub-topic | Notes | Covers |
|-----------|-------|--------|
| [[Variational Inference/_Index\|Variational Inference]] | 8 | ELBO and KL minimization, mean-field CAVI, stochastic / black-box VI, ADVI, reparameterization trick and VAEs, normalizing-flow posteriors, diagnosing VI with PSIS $\hat k$ and VSBC — Blei 2017, Ranganath 2014, Kucukelbir 2017, Kingma & Welling 2013, Rezende & Mohamed 2015, Yao 2018 |
| [[Neural Simulation-Based Inference/_Index\|Neural Simulation-Based Inference]] | 8 | Neural posterior / likelihood / ratio estimation, sequential neural likelihood, conditional normalizing flows, amortized vs sequential inference, benchmarking and diagnostics (SBC, coverage, C2ST), neural SBI for economic ABMs — Cranmer 2020, Papamakarios 2016/2019, Hermans 2020, Lueckmann 2021, Dyer 2022 |

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
