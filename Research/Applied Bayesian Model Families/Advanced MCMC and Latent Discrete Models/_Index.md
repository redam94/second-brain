---
title: "Index: Advanced MCMC and Latent Discrete Models"
tags:
  - type/index
  - source/ingested
  - topic/advanced-mcmc
parent: "[[../_Index|Applied Bayesian Model Families]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 29
---

# Advanced MCMC and Latent Discrete Models

> [!abstract] Routing Summary
> This cluster covers sampling when plain NUTS struggles: GPU many-chain samplers (ChEES-HMC, MEADS), funnel geometry and non-centring, marginalising discrete latents, hidden Markov models (forward-backward, Viterbi, Baum-Welch, non-homogeneous HMMs) and stochastic volatility. It has 5 sub-folders and 29 notes, written to cover the methods used in the PyMC worked examples E04, E12, E24, E48, E57, E59, E86 ([examples page](https://redam94.github.io/pymc-challenges/examples.html)).
> Start from a source overview:
> - Betancourt Girolami 2015: [[Betancourt 2015 - HMC for Hierarchical Models - Overview]]
> - Hoffman Radul Sountsov 2021: [[Hoffman 2021 - ChEES-HMC - Overview]]
> - Hoffman Sountsov 2022: [[Hoffman 2022 - MEADS - Overview]]
> - Rabiner 1989: [[Rabiner 1989 - HMM Tutorial - Overview]]
^routing-summary

## Sub-topics

- [[Betancourt Girolami 2015 - HMC for Hierarchical Models/_Index|Betancourt Girolami 2015 - HMC for Hierarchical Models]] (6 notes) — COVERS: Betancourt & Girolami (2015, arXiv:1312.0906), *Hamiltonian Monte Carlo for Hierarchical Models*, explain why hierarchical posteriors have funnel geometry whose curvature varies with position, why random-walk Metropolis and Gibbs degrade into random walks on them, and how Euclidean HMC (with non-centred parameterisations and carefully relaxed adaptation) or Riemannian HMC with the SoftAbs metric…
- [[Concept Notes - Discrete Latents and Inference Frontier/_Index|Concept Notes - Discrete Latents and Inference Frontier]] (3 notes) — COVERS: Concept notes: [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]], [[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]], [[Stochastic Volatility and the Inference Frontier]]
- [[Hoffman Radul Sountsov 2021 - ChEES-HMC/_Index|Hoffman Radul Sountsov 2021 - ChEES-HMC]] (6 notes) — COVERS: Hoffman, Radul & Sountsov (2021), *An Adaptive MCMC Scheme for Setting Trajectory Lengths in Hamiltonian Monte Carlo* (AISTATS, PMLR 130), propose **ChEES-HMC**: plain (non-NUTS) HMC whose maximum trajectory length $T$ is tuned by gradient ascent on the *Change in the Estimator of the Expected Square*, with the same $T$ and a jittered length shared by all chains. It matches or beats NUTS per…
- [[Hoffman Sountsov 2022 - MEADS/_Index|Hoffman Sountsov 2022 - MEADS]] (6 notes) — COVERS: Hoffman & Sountsov (2022), *Tuning-Free Generalized Hamiltonian Monte Carlo* (AISTATS, PMLR 151), propose **MEADS** (Maximum-Eigenvalue Adaptation of Damping and Step-size): an ensemble-chain adaptation (ECA) scheme that sets every tunable parameter of generalised HMC (step size, damping, slice drift, diagonal preconditioner) each iteration from cross-chain statistics, without perturbing the…
- [[Rabiner 1989 - Hidden Markov Models Tutorial/_Index|Rabiner 1989 - Hidden Markov Models Tutorial]] (8 notes) — COVERS: Rabiner (1989), *A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition* (Proc. IEEE 77(2):257-286), is the standard exposition of the HMM and its three problems: evaluation (forward-backward), decoding (posterior argmax and Viterbi) and learning (Baum-Welch EM). It also covers model types (ergodic, left-right), continuous densities, explicit state duration, scaling,…

## Motivating PyMC examples

E04, E12, E24, E48, E57, E59, E86 — see the [worked examples page](https://redam94.github.io/pymc-challenges/examples.html); each source Overview lists the examples it supports.

## Sources

- [[raw/Betancourt Girolami 2015 - Hamiltonian Monte Carlo for Hierarchical Models.pdf]]
- [[raw/Hoffman Radul Sountsov 2021 - Adaptive-MCMC Scheme for Setting Trajectory Lengths in HMC.pdf]]
- [[raw/Hoffman Sountsov 2022 - Tuning-Free Generalized Hamiltonian Monte Carlo.pdf]]
- [[raw/Rabiner 1989 - A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition.pdf]]

## See Also

- [[../_Index|Applied Bayesian Model Families]] — sibling clusters
