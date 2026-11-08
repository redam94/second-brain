---
title: "Index: Hoffman Radul Sountsov 2021 - ChEES-HMC"
tags:
  - type/index
  - source/ingested
  - topic/advanced-mcmc
parent: "[[../_Index|Advanced MCMC and Latent Discrete Models]]"
date_updated: 2026-11-08
concept_count: 9
---

# Hoffman Radul Sountsov 2021 - ChEES-HMC

> [!abstract] Routing Summary
> This folder fully captures Hoffman, Radul & Sountsov (2021), *An Adaptive MCMC Scheme for Setting Trajectory Lengths in Hamiltonian Monte Carlo* (AISTATS, PMLR 130): jittered HMC analysis on Gaussians, the ChEES criterion, Algorithm 1, the seven-target benchmark (Table 1), GPU throughput study and jitter ablations. 6 notes. Motivating PyMC examples: E86, E12.
> - Need the paper on one page, headline numbers or the section-to-note map? → [[Hoffman 2021 - ChEES-HMC - Overview]]
> - Need leapfrog, why NUTS is slow on GPUs, or Figure 1? → [[Hoffman 2021 - HMC Background and the GPU Problem for NUTS]]
> - Need the cosine/sinc autocorrelation derivation and the $2.25\sigma_{\max}$ rule? → [[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]]
> - Need the ChEES definition, its gradient, Adam/Halton/harmonic-mean details or the numpy sketch? → [[Hoffman 2021 - ChEES Criterion and Algorithm 1]]
> - Need Table 1, the seven target definitions or GPU throughput? → [[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]]
> - Need the jitter ablation, discussion, limitations or references? → [[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Leapfrog, Metropolis correction | [[Hoffman 2021 - HMC Background and the GPU Problem for NUTS]] | definition | — | energy error $O(\epsilon^2)$, steps decoupled from $\epsilon$ |
| Cosine autocorrelation of fixed-$t$ HMC | [[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]] | theorem | [[Hoffman 2021 - HMC Background and the GPU Problem for NUTS]] | $\cos(t/\sigma_d)$, resonance |
| Jittered sinc autocorrelation | [[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]] | theorem | cosine result | min $-0.22$ at $T\approx4.5\sigma$ |
| Second-moment autocorrelation | [[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]] | theorem | sinc result | min near $T\approx2.25\sigma$; bounds 0.346/0.564 |
| ChEES criterion | [[Hoffman 2021 - ChEES Criterion and Algorithm 1]] | definition | [[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]] | ESJD of centred squared norm |
| ChEES gradient wrt $T$ | [[Hoffman 2021 - ChEES Criterion and Algorithm 1]] | theorem | ChEES | Adam on $\log T$, acceptance-weighted |
| Algorithm 1 (ChEES-HMC) | [[Hoffman 2021 - ChEES Criterion and Algorithm 1]] | algorithm | criterion, gradient | shared jitter, Halton, harmonic-mean step size |
| Table 1 ESS/gradient | [[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]] | example | Algorithm 1 | best of adaptive methods on 5 of 7 targets |
| Jitter ablation | [[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]] | theorem | [[Hoffman 2021 - ChEES Criterion and Algorithm 1]] | uniform jitter on $(0,T)$ near optimal |

## Notes

- [[Hoffman 2021 - ChEES-HMC - Overview]] — CONTAINS: research question, contributions, headline result, Source Map, motivating PyMC examples E86 and E12, marketing relevance.
- [[Hoffman 2021 - HMC Background and the GPU Problem for NUTS]] — CONTAINS: Def. augmented HMC and leapfrog; step-size decoupling; why NUTS is unattractive on GPUs; Figure 1 interpretation; numpy leapfrog.
- [[Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter]] — CONTAINS: Def. phase rotation; Thm. cosine autocorrelation; sinc and second-moment theorems; constants check; Figure 2; design lessons.
- [[Hoffman 2021 - ChEES Criterion and Algorithm 1]] — CONTAINS: Def. ChEES; Thm. decomposition and gradient; Algorithm 1 in words; design-choice rationale; tested numpy sketch; blackjax sketch.
- [[Hoffman 2021 - Experiments - ESS per Gradient and GPU Throughput]] — CONTAINS: Seven targets; compared algorithms; Table 1 and ratios; GPU throughput study; Python reproduction.
- [[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]] — CONTAINS: Jitter ablation findings; discussion; many-chain budget example; limitations; reference list.

## Sources
- Hoffman Radul Sountsov 2021 - Adaptive-MCMC Scheme for Setting Trajectory Lengths in HMC — Hoffman MD, Radul A, Sountsov P (2021), AISTATS, PMLR 130, 10 pages (supplement not included in the PDF).

## See Also
- [[Hoffman 2022 - MEADS - Overview]] — successor from the same group.
- [[Betancourt 2015 - HMC for Hierarchical Models - Overview]] — geometry limits.
- [[Efficient MCMC]], [[HMC and Stan in Practice]], [[The Typical Set and the Log Posterior Density]].
