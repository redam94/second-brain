---
title: "Chen 2018 - Neural ODEs - Overview"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/neural-odes
  - type/overview
  - doc/paper
source: "[[raw/Chen 2018 - Neural Ordinary Differential Equations.pdf]]"
source_location: "Whole paper incl. Appendices A-F, pp. 1-19"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chen 2018 - Neural ODEs"
doc_type: paper
depends_on:
  - "[[ODE Filters and Smoothers]]"
  - "[[Normalizing Flows for Variational Inference]]"
used_by:
  - "[[Chen 2018 - Adjoint Sensitivity Method]]"
  - "[[Universal Differential Equations and Scientific ML (Concept Note)]]"
aliases:
  - Neural ODE paper overview
  - Neural Ordinary Differential Equations overview
---

# Chen 2018 - Neural ODEs - Overview

> [!summary]
> Chen, Rubanova, Bettencourt & Duvenaud (NeurIPS 2018) replace a stack of discrete layers $h_{t+1}=h_t+f(h_t,\theta_t)$ with an ODE $dh/dt=f(h,t,\theta)$ whose right-hand side is a neural net and whose output is a black-box ODE solver. The enabling result is the **adjoint sensitivity method** as reverse-mode autodiff: gradients of any scalar loss with respect to the initial state, parameters and times via a second ODE solved backwards, at constant memory. Takeaway for statisticians: this is the standard recipe for putting a differential-equation solver *inside* a model with gradient-based inference.

## Overview

**Research question.** What happens to deep nets when depth becomes continuous, and how can one backpropagate through an ODE solver without differentiating each solver step?

**Contributions.**
1. Adjoint-based reverse-mode derivatives of ODE solutions treating the solver as a black box: cost linear in problem size, low memory, explicit error control ([[Chen 2018 - Adjoint Sensitivity Method]]).
2. ODE-Nets: residual blocks replaced by an ODE solve; MNIST error 0.42% with 0.22M parameters and $O(1)$ memory ([[Chen 2018 - ODE-Nets for Supervised Learning]]).
3. Continuous normalizing flows via the *instantaneous change of variables* theorem: log-density changes by $-\operatorname{tr}(\partial f/\partial z)$ instead of a log-determinant ([[Chen 2018 - Continuous Normalizing Flows]]).
4. A latent-ODE generative model for irregularly sampled time series, with Poisson-process likelihoods ([[Chen 2018 - Latent ODE Time-Series Model]]).
5. Scope, limitations and related work ([[Chen 2018 - Scope, Limitations and Statistical Use]]).

> [!note] Edition note
> The arXiv v6 PDF used here carries a correction: Fig. 3c in earlier versions claimed the backward pass needed about half the function evaluations of the forward pass; this was a logging bug (reported by Vanni et al.), and the corrected median ratio is about 0.8 for tolerances $10^{-5}$ to $10^{-1}$.

## Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction (ResNet as Euler step; benefits) | this note; [[Chen 2018 - Adjoint Sensitivity Method]] |
| 2 Reverse-mode AD of ODE solutions; Alg. 1; eqs. 3-5 | [[Chen 2018 - Adjoint Sensitivity Method]] |
| 3 Supervised learning; Table 1; Fig. 3; depth | [[Chen 2018 - ODE-Nets for Supervised Learning]] |
| 4 Continuous normalizing flows; Theorem 1; eqs. 6-10; Figs. 4-5 | [[Chen 2018 - Continuous Normalizing Flows]] |
| 5 Latent function time-series model; Poisson process; Table 2; Figs. 6-9 | [[Chen 2018 - Latent ODE Time-Series Model]] |
| 6 Scope and limitations (minibatching, uniqueness, tolerances, reconstruction) | [[Chen 2018 - Scope, Limitations and Statistical Use]] |
| 7 Related work; 8 Conclusion | [[Chen 2018 - Scope, Limitations and Statistical Use]] |
| Appendix A Proof of instantaneous change of variables | [[Chen 2018 - Continuous Normalizing Flows]] |
| Appendix B Modern proof of the adjoint method; C full algorithm; D autograd code | [[Chen 2018 - Adjoint Sensitivity Method]] |
| Appendix E latent ODE training; F extra figures | [[Chen 2018 - Latent ODE Time-Series Model]] |

## Motivating PyMC examples

Listed at https://redam94.github.io/pymc-challenges/examples.html :
- **E09 - Your own JAX code, with gradients, inside a model** (Hudson's Bay lynx-hare pelts): hand-written Op plus `jax.vjp`, `pytensor.wrap_jax`, a JAX ODE solver. The vector-Jacobian product at the heart of the adjoint method is exactly what a PyTensor Op's `grad` needs.
- **E11 - Scientific ML: a neural network inside a differential equation** (same data): universal / neural ODEs in JAX, priors over functions, why weight-space $\hat R$ is meaningless; see [[Universal Differential Equations and Scientific ML (Concept Note)]].
- **E46 / E47** (chaotic systems) and **E64** (population PK) use ODE solves inside likelihoods; see [[Likelihoods Built on Differential Equations (Concept Note)]].

## Relevance to marketing measurement

Continuous-time latent dynamics with adaptive solvers are a candidate for irregularly observed state (e.g., brand awareness observed at survey dates); they are heavier than the linear-Gaussian approach in [[State-Space Models and the Kalman Filter - Overview]] and are not identifiable without strong structure. Treat as a research direction, not a standard MMM tool.

## Connections

Probabilistic view of ODE solvers: [[ODE Filters and Smoothers]], [[Solving ODEs as Inference]]. Flows: [[Normalizing Flows for Variational Inference]], [[Normalizing Flows as Conditional Density Estimators]]. Simulation-based inference with neural estimators: [[Neural Simulation-Based Inference - Overview]]. Latent-variable ELBO: [[Variational Inference - Overview]].

## See Also

[[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]] for the Bayesian treatment of the network weights.
