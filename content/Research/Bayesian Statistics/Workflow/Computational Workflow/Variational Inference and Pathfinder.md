---
title: "Variational Inference and Pathfinder"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 13.2, pp. 241-242 (Eq. 13.1-13.2)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Approximate Algorithms and Approximate Models]]"
  - "[[Approximations Based on Joint and Conditional Posterior Modes]]"
  - "[[Initial Values, Adaptation, and Warmup]]"
used_by:
  - "[[Failure Modes and Steps Forward]]"
  - "[[What to Do About Convergence Problems]]"
  - "[[Model Building - Time-Series Decomposition for Birthdays]]"
aliases:
  - "VI"
  - "ADVI"
  - "Pathfinder"
  - "Multi-Pathfinder"
  - "Mean-field"
  - "Reverse KL divergence"
---

# Variational Inference and Pathfinder

> [!summary]
> Variational inference replaces integration with optimization: find the closest member of a tractable
> family $\mathcal{Q}$ to the target. Two design choices — **the family and the divergence** — determine
> everything, and both are hard. The book's honest assessment is that **VI's accuracy is difficult to
> trust in high dimensions**, and even a global minimizer remains misspecified. But **Pathfinder** is
> singled out as genuinely useful precisely because it does not try to be accurate: it uses L-BFGS to walk
> toward the mode and picks the **best normal approximation along the optimization path**, giving fast
> initialization for HMC and, run in parallel from many starts, a way to **find modes and weight their
> relative mass.**

## Overview

> [!definition] The variational problem (Eq. 13.1, Ch. 13.2, p. 241)
> $$
> q^* = \operatorname*{argmin}_{q \in \mathcal{Q}} D(q \| p)
> $$
>
> "**The two main design choices of VI are the family $\mathcal{Q}$ of approximations and the divergence $D$
> … These choices need to balance inferential accuracy and computational cost, and finding a good balance is
> challenging.**"
>
> **What VI is for:** "**VIs are useful as rough posterior approximations and can be used to supply starting
> values for Hamiltonian Monte Carlo and other simulation-based algorithms. Variational approximations can
> also be useful as quick inference in early phases of workflow, in the end if the specific variational
> approximation and inference has been carefully tested to reach the desired inference accuracy for the
> quantities of interest, or for approximate computation for large models such as neural nets with highly
> multimodal posteriors that cannot be covered well by existing simulation algorithms**" (Carpenter 2026).
^def-variational-problem

### The family $\mathcal{Q}$

> [!definition] Tractable families and the richness tradeoff
> "**By tractable, we mean that certain operations can be easily computed: for example, calculating
> expectation values and drawing samples. The most commonly used family of approximations is the family of
> normals**", minimized over the mean and covariance matrix by deterministic or stochastic optimization.
>
> **Richer families:** "**a nonlinear neural network transformation of the normal, also known as a
> transformation flow** (Agrawal, Sheldon, and Domke 2021) **or a distribution constructed using a basis
> expansion**" (Cai, Modi, Margossian, et al. 2024).
>
> **The tradeoff:** "**the richer the family of approximations, the more challenging the optimization in
> (13.1) becomes.**"

### The divergence $D$

> [!definition] Reverse KL, and why it is the default (Eq. 13.2)
> $$
> \text{KL}(q\|p) = \int \big(\log q(z) - \log p(z)\big)\, q(z)\, dz
> $$
> "**which can be minimized with respect to $q$, even if $p$ is only known up to a normalizing constant**" —
> the property that makes it usable at all.
>
> **The contrast with modal methods:** "**In contrast to methods described in Section 13.1, VI does not
> explicitly fit to the mode; rather, it minimizes an average difference in log density.**"
>
> **Alternatives, with their tradeoffs:**
> - **Score-based divergences** — "**which compare gradients of log densities rather than log densities,
>   possess attractive optimization properties**" (Cai, Modi, Pillaud-Vivien, et al. 2024; Cai, Modi,
>   Margossian, et al. 2024).
> - **$\alpha$-divergences** — "**can yield better solutions than minimizers of $\text{KL}(q\|p)$ for certain
>   inferential tasks but can be much harder to minimize**" (Dhaka, Catalina, Welandawe, et al. 2021; Geffner
>   and Domke 2021; Daudel, Douc, and Roueff 2023).
>
> **And the deeper problem:** "**which divergence works best depends on the inferential task at hand.
> Different tasks can sometimes compete, with an accurate estimate of one quantity implying a poor estimate
> of another, a tradeoff known to arise for different measures of uncertainty**" (Margossian, Pillaud-Vivien,
> and Saul 2025).
^def-kl-divergence

## Main Content

### Two practical challenges

> [!warning] Optimization error and approximation error (Ch. 13.2, p. 241)
> "**First, we may not be able to exactly solve the optimization problem and find a minimizer of
> $D(q\|p)$.**
>
> **Second, even if we do obtain a global minimizer of $D(q\|p)$, the approximation remains misspecified,
> meaning $q^* \ne p$, especially if $\mathcal{Q}$ is a constrained family of approximations, such as the
> family of normals.**
>
> **A misspecified approximation can, in some limited settings, still recover statistical properties of $p$
> such as its mean** (MacKay 2003; Margossian and Saul 2025), **even while misestimating other quantities
> such as its variance. In many cases, it is unclear how well $q^*$ approximates $p$**" (Yao, Vehtari,
> Simpson, et al. 2018b).
>
> The exercise set of [[Approximate Algorithms and Approximate Models]] makes the variance claim exact:
> mean-field VI on a multivariate normal recovers **conditional** variances exactly but **underestimates
> marginal variances and entropy.**
^wrn-vi-two-challenges

> [!important] Is VI really "faster than MCMC"?
> "**VI is often presented as a fast alternative to MCMC. Arguably, the optimization problem for VI can be
> relatively straightforward to solve when the variational family $\mathcal{Q}$ is constrained, compared to
> achieving convergence with MCMC.**
>
> **This comparison is not entirely fair, since MCMC can achieve higher precision than VI when both
> algorithms converge** (Figure 13.1). **Moreover, it is challenging to get similar accuracy and trust in
> convergence for VI, compared to MCMC, in high dimensions**" (Dhaka, Catalina, Andersen, et al. 2020;
> Dhaka, Catalina, Welandawe, et al. 2021).
>
> **Where it genuinely wins:** "**VI is used to fit deep learning models to big data, a setting where MCMC
> struggles to handle challenging posteriors and where VI's fast approximation provides useful, if
> imperfect, inference, as measured by the performance of the trained model.**"

### ADVI

> [!definition] Automatic differentiation variational inference (Kucukelbir et al. 2017)
> Stan's implementation. "**ADVI minimizes reverse Kullback-Leibler divergences (13.2) over the family of
> normals, either with a diagonal covariance matrix ('mean-field' assumption) or a dense covariance
> matrix.**"
>
> **The reported successful use case, with its conditions:** "**Some modelers have reported they have
> successfully used Stan's ADVI when there has been a need for repeated inference with similar big data
> sets, and where ADVI's expected accuracy for the particular class of models has been first assessed using
> simulation experiments.**"
>
> Note the two conditions: **repeated inference on similar data** (so the assessment amortizes) and
> **accuracy pre-assessed by simulation** (so the approximation is not taken on faith). Both are necessary.

### Pathfinder

> [!definition] What Pathfinder does (Zhang, Carpenter, et al. 2022)
> "**Pathfinder is a variational algorithm that uses the fast deterministic quasi-Newton L-BFGS optimization
> algorithm and chooses the best approximate normal distribution along the optimization path according to the
> stochastic Kullback-Leibler divergence estimate.**
>
> **The goal is not to get the best possible variational fit but rather to get a fast and useful
> approximation.**"
>
> **Where the randomness comes from:** "**Individual Pathfinder paths depend on the initial values, and the
> use of stochastic Kullback-Leibler estimates also induces randomness in the normal approximations along
> the path.**"
>
> **Multi-Pathfinder:** "**Running many Pathfinders in parallel is fast, and multi-Pathfinder uses many
> normal approximations as a mixture importance sampling proposal distribution from which we can obtain
> approximate posterior draws.**"
^def-pathfinder

> [!important] The three uses of Pathfinder, all endorsed in this book
> 1. **Sanity check.** "**Quickly checking that the model code produced posterior is somewhat sensible.**"
> 2. **Initialization.** "**Obtaining Markov chain initial values that are closer to the typical set.**" See
>    [[Initial Values, Adaptation, and Warmup]], where slow transit to the typical set is one of the three
>    named initialization failures.
> 3. **Mode finding and weighting.** "**If the posterior is multimodal, Pathfinder can be used to find many
>    modes and to assess the relative mass in each mode using importance sampling.**"
>
> Use 3 is developed in [[Failure Modes and Steps Forward#Failure 6 — Multimodality]]: "**Instead of running
> a large number of costly Markov chains, we can run the much faster Pathfinder algorithm from different
> initial values to help find more modes, and then start fewer Markov chains based on the found modes.
> Pathfinder can also discard modes that have negligible posterior mass so that further computation is
> focused where it matters.**"
>
> §27.4 demonstrates "**the use of Pathfinder to obtain quick initial results for testing and to initialize
> slower MCMC sampling**" — [[Model Building - Time-Series Decomposition for Birthdays]].

> [!important] Why Pathfinder is the VI the book actually recommends
> The key design decision is stated plainly: **"The goal is not to get the best possible variational fit."**
>
> That sidesteps both of the warnings above. Because Pathfinder is used to *initialize* and to *locate*
> rather than to *infer*, the misspecification of the normal family and the difficulty of trusting VI
> convergence in high dimensions stop mattering — **the MCMC that follows does the inference.** Contrast
> ADVI, whose recommended use requires a prior simulation study precisely because it *is* being asked to
> produce the answer.

## Connections

- Pathfinder-as-initializer is the practical resolution of
  [[Fit Fast, Fail Fast#Discovering computational challenges by experimenting|"use reasonable starting
  points"]] — it automates what the book otherwise asks you to do by hand.
- The optimization/mode contrast with [[Approximations Based on Joint and Conditional Posterior Modes]] is
  substantive: Laplace fits *at* the mode with local curvature; VI minimizes an *average* discrepancy and
  can end up elsewhere.
- Unlike the Laplace approximation, VI has no equally clean self-check; the diagnostics that exist are
  cited in [[Approximate Algorithms and Approximate Models#Approximate inference is itself iterative]].

## See Also
- [[Approximate Algorithms and Approximate Models]] — the chapter frame, and the exercises quantifying VI's variance underestimation
- [[Initial Values, Adaptation, and Warmup]] — the problem Pathfinder solves best
- [[Failure Modes and Steps Forward]] — Pathfinder for multimodality
- [[Simulation-Based and Amortized Inference]] — the other optimization-and-neural-network family
- [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]] — how to check whether a variational fit can be trusted
- [[Automatic Differentiation Variational Inference (ADVI)]] — the ADVI algorithm in detail
- [[Normalizing Flows as Conditional Density Estimators]] — same flow architecture, opposite KL direction
- [[Simulation-Based Calibration - Overview]] — SBC/VSBC is how an approximate (variational) posterior is validated
