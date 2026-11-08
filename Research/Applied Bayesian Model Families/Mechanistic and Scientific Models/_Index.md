---
title: "Index: Mechanistic and Scientific Models"
tags:
  - type/index
  - source/ingested
  - topic/mechanistic-models
parent: "[[../_Index|Applied Bayesian Model Families]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 33
---

# Mechanistic and Scientific Models

> [!abstract] Routing Summary
> This cluster covers scientific models inside Bayesian inference: ODE/PDE likelihoods with adjoint gradients, chaos and data assimilation, neural and universal differential equations, Bayesian neural networks, BART, population pharmacokinetics, jump-diffusions, fisheries and compound-count biology models. It has 5 sub-folders and 33 notes, written to cover the methods used in the PyMC worked examples E08-E11, E15, E29, E46-E55, E60, E61, E64, E114, E115 ([examples page](https://redam94.github.io/pymc-challenges/examples.html)).
> Start from a source overview:
> - Chen 2018: [[Chen 2018 - Neural ODEs - Overview]]
> - Chipman 2010: [[Chipman 2010 - BART - Overview]]
> - Izmailov 2021: [[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]]
> - Margossian 2022: [[Margossian 2022 - Bayesian Pharmacometrics - Overview]]
^routing-summary

## Sub-topics

- [[Chen 2018 - Neural ODEs/_Index|Chen 2018 - Neural ODEs]] (6 notes) — COVERS: Chen, Rubanova, Bettencourt & Duvenaud (NeurIPS 2018) replace a stack of discrete layers $h_{t+1}=h_t+f(h_t,\theta_t)$ with an ODE $dh/dt=f(h,t,\theta)$ whose right-hand side is a neural net and whose output is a black-box ODE solver. The enabling result is the **adjoint sensitivity method** as reverse-mode autodiff: gradients of any scalar loss with respect to the initial state, parameters and…
- [[Chipman 2010 - BART/_Index|Chipman 2010 - BART]] (7 notes) — COVERS: Chipman, George & McCulloch (2010, *Annals of Applied Statistics* 4(1):266-298) define BART: a sum of $m$ regression trees, each held to be a *weak learner* by a regularization prior, fitted by a Gibbs-style "Bayesian backfitting" MCMC. The result is a Bayesian nonparametric regression with full posterior draws of the function $f(x)=E(Y\mid x)$, pointwise intervals, partial dependence, model-free…
- [[Concept Notes/_Index|Concept Notes]] (8 notes) — COVERS: Concept notes: [[Chaos, Rough Likelihoods and Data Assimilation (Concept Note)]], [[Dose-Response with Weather Covariates in Long-Term Field Trials (Concept Note)]], [[Jump-Diffusion and Stochastic Differential Equation Models (Concept Note)]], [[Likelihoods Built on Differential Equations (Concept Note)]], [[Luria-Delbruck and Telegraph Models as Compound Count Likelihoods (Concept Note)]], [[Population PK Dosing Decisions from the Posterior (Concept Note)]], [[Surplus-Production State-Space Models for Fisheries (Concept Note)]], [[Universal Differential Equations and Scientific ML (Concept Note)]]
- [[Izmailov 2021 - Bayesian Neural Network Posteriors/_Index|Izmailov 2021 - Bayesian Neural Network Posteriors]] (6 notes) — COVERS: Izmailov, Vikram, Hoffman & Wilson (ICML 2021) run **full-batch HMC** on modern networks (ResNet-20-FRN on CIFAR, CNN-LSTM on IMDB) across hundreds of TPUs to get near-exact BNN posteriors, then use them as ground truth. Findings: BNNs beat SGD and deep ensembles in-domain, one long chain suffices, no cold-posterior effect without data augmentation, performance is insensitive to prior scale, but…
- [[Margossian 2022 - Bayesian Pharmacometrics Stan Torsten/_Index|Margossian 2022 - Bayesian Pharmacometrics Stan Torsten]] (6 notes) — COVERS: Margossian, Zhang & Gillespie (CPT: Pharmacometrics & Systems Pharmacology, 2022; arXiv 2109.10184, "Part I") is a worked tutorial on a full Bayesian workflow for pharmacokinetic/pharmacodynamic (PK/PD) models: a two-compartment oral-dose model, a hierarchical **population** model with allometric scaling, and a nonlinear Friberg-Karlsson PK/PD ODE system, in Stan with the Torsten extension.…

## Motivating PyMC examples

E08-E11, E15, E29, E46-E55, E60, E61, E64, E114, E115 — see the [worked examples page](https://redam94.github.io/pymc-challenges/examples.html); each source Overview lists the examples it supports.

## Sources

- [[raw/Chen 2018 - Neural Ordinary Differential Equations.pdf]]
- [[raw/Chipman 2010 - BART Bayesian Additive Regression Trees.pdf]]
- [[raw/Izmailov 2021 - What Are Bayesian Neural Network Posteriors Really Like.pdf]]
- [[raw/Margossian 2022 - Bayesian Pharmacometrics with Stan and Torsten.pdf]]

## See Also

- [[../_Index|Applied Bayesian Model Families]] — sibling clusters
