---
title: "Index: Izmailov 2021 - Bayesian Neural Network Posteriors"
tags:
  - type/index
  - source/ingested
  - topic/mechanistic-models
  - topic/bayesian-neural-networks
parent: "[[../_Index|Mechanistic and Scientific Models]]"
date_updated: 2026-11-08
concept_count: 6
---

# Izmailov 2021 - Bayesian Neural Network Posteriors

> [!abstract] Routing Summary
> Full capture of Izmailov, Vikram, Hoffman & Wilson (2021), *What Are Bayesian Neural Network Posteriors Really Like?* (ICML; arXiv 2104.14421): full-batch HMC as a gold standard, mixing diagnostics in weight vs function space, in-domain gains and domain-shift failure, cold posteriors, priors, and the fidelity of cheaper approximations. 6 notes.
> - Need the six headline claims or a section map? -> [[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]]
> - Need how HMC was run (trajectory length rule, step size, chains, TPUs)? -> [[Izmailov 2021 - Full-Batch HMC for Neural Networks]]
> - Need function-space $\hat R$, mode connectivity, density visualizations? -> [[Izmailov 2021 - Mixing Diagnostics and Posterior Geometry]]
> - Need UCI/CIFAR/IMDB results, OOD Table 1, or CIFAR-10-C? -> [[Izmailov 2021 - Predictive Performance and Domain Shift]]
> - Need the cold-posterior test, prior scale, non-Gaussian priors, or the architecture-as-function-prior point? -> [[Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors]]
> - Need ensembles/SGMCMC/VI vs HMC (agreement, TV) or the discussion? -> [[Izmailov 2021 - Cheaper Approximations versus HMC]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Bayesian model average | [[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]] | definition | posterior | $p(y\mid x,D)=\int p(y\mid x,w)p(w\mid D)dw$ |
| Trajectory length rule | [[Izmailov 2021 - Full-Batch HMC for Neural Networks]] | definition | prior sd | $\hat\tau=\pi\alpha_{prior}/2$ |
| SGMCMC bias | [[Izmailov 2021 - Full-Batch HMC for Neural Networks]] | definition | MH correction | no MH step, subsampling noise |
| Function-space $\hat R$ | [[Izmailov 2021 - Mixing Diagnostics and Posterior Geometry]] | definition | Gelman-Rubin | 91% / 98% of predictions have $\hat R<1.1$ |
| Strong mode connectivity (finding) | [[Izmailov 2021 - Mixing Diagnostics and Posterior Geometry]] | theorem | Garipov 2018 | HMC uses connecting paths |
| CIFAR-10-C failure | [[Izmailov 2021 - Predictive Performance and Domain Shift]] | example | OOD | HMC worst under shift |
| Tempered posterior | [[Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors]] | definition | Wenzel 2020 | no cold effect without augmentation |
| Function-space prior | [[Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors]] | theorem | architecture | architecture matters more than $p(w)$ |
| Agreement / TV | [[Izmailov 2021 - Cheaper Approximations versus HMC]] | definition | HMC predictive | MFVI worst; ensembles beat SGLD in TV |

## Notes

- [[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]] — CONTAINS: question, six claims, Source Map, motivating examples E29/E11/E15, marketing relevance.
- [[Izmailov 2021 - Full-Batch HMC for Neural Networks]] — CONTAINS: why full batch, model and hardware choices, trajectory rule derivation, step-size and chain ablations, run settings, verified leapfrog count.
- [[Izmailov 2021 - Mixing Diagnostics and Posterior Geometry]] — CONTAINS: $\hat R$ definition, Fig. 2 results, mode-connectivity finding, density cross-sections, marginals, burn-in, function-space diagnostic code.
- [[Izmailov 2021 - Predictive Performance and Domain Shift]] — CONTAINS: UCI, CIFAR, IMDB protocols, OOD Table 1, CIFAR-10-C, interpretation.
- [[Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors]] — CONTAINS: tempered posterior, cold-posterior tests, prior scale, Table 2 qualitative, architecture theorem, verified 1/sqrt(width) GP-limit demo.
- [[Izmailov 2021 - Cheaper Approximations versus HMC]] — CONTAINS: method families, agreement/TV definitions, Table 3 findings, entropy/calibration, discussion, code.

## Sources

[[raw/Izmailov 2021 - What Are Bayesian Neural Network Posteriors Really Like.pdf]].

## See Also

[[HMC and Stan in Practice]], [[Variational Inference - Overview]], [[Chipman 2010 - BART - Overview]].
