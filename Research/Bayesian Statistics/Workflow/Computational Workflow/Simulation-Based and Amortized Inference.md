---
title: "Simulation-Based and Amortized Inference"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 13.3, pp. 242-243"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Approximate Algorithms and Approximate Models]]"
  - "[[Generative and Partially Generative Models]]"
  - "[[A Data Model Is Not Just a Likelihood]]"
used_by:
  - "[[Posterior Predictive Checking]]"
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[Neural Simulation-Based Inference - Overview]]"
aliases:
  - "ABC"
  - "Approximate Bayesian computation"
  - "SBI"
  - "Amortized Bayesian inference"
  - "Likelihood-free inference"
---

# Simulation-Based and Amortized Inference

> [!summary]
> What to do when **the likelihood has no analytic form** — only the ability to simulate parameter-data
> pairs. The classical answer is **ABC**: draw from the prior, simulate data, keep the draw if the
> simulated data resemble the observed. It works and it does not scale — "**even these more advanced ABC
> algorithms struggle with higher dimensional problems, because the rejection probabilities become too
> high: an example of the curse of dimensionality.**" The modern answer is **neural density estimators** and
> **amortized Bayesian inference**, which pay a large training cost once and then deliver posteriors "**in
> real time as new data come in.**"

## Overview

> [!definition] The setting (Ch. 13.3, p. 242)
> "**Some statistical models do not have an analytically tractable likelihood, such that likelihood-based
> methods, including standard MCMC algorithms, cannot be applied**" (Cranmer, Brehmer, and Louppe 2020).
>
> "**In order to still perform Bayesian inference on such models, we have to resort to simulation-based
> algorithms that merely require the ability to simulate parameter-data pairs from the model.**"
>
> Note what this requires: **a full generative model**, in exactly the sense of
> [[Generative and Partially Generative Models]]. Simulation-based inference is the case where the
> generative model is *all* you have — the mirror image of
> [[A Data Model Is Not Just a Likelihood]], where the likelihood was all that inference needed.
^def-sbi-setting

## Main Content

### Approximate Bayesian computation

> [!definition] The basic ABC rejection sampler (Marin et al. 2012)
> "**The posterior is approximated by:**
> 1. **repeatedly drawing parameters from the prior $p(\theta)$**;
> 2. **for each draw, simulating a dataset $y^{\text{rep}}$ from the data model $p(y|\theta)$**;
> 3. **if the resulting dataset is sufficiently similar to the actually observed dataset $y$, the
>    corresponding parameter vector is retained as a sample from the posterior; otherwise it is rejected.**"
>
> **More advanced versions:**
> - **ABC-MCMC** — likelihood-free MCMC (Marjoram et al. 2003);
> - **ABC-SMC** — sequential Monte Carlo (Beaumont et al. 2009).
^def-abc

> [!warning] The curse of dimensionality
> "**Even these more advanced ABC algorithms struggle with higher dimensional problems, though, because the
> rejection probabilities become too high: an example of the curse of dimensionality.**"
>
> The mechanism is the same geometry as
> [[The Typical Set and the Log Posterior Density]]: in high dimensions, "**sufficiently similar**" defines a
> region that a prior draw essentially never lands in.

### Neural density estimators

> [!definition] Emulating the sampler (Radev, Mertens, et al. 2020)
> "**Neural density estimators … emulate sampling from an intractable distribution via neural networks that
> transform a random input vector of Gaussian noise into a draw from a target probability distribution.**
>
> **Training the neural networks requires only simulations from the statistical model, rendering these
> methods a form of simulation-based inference.**"
>
> **Why they beat ABC, and the condition attached:** "**Due to favorable generalization capabilities of neural
> networks, neural density estimators can be more efficient than ABC methods, at least when the observed data
> are in the typical set of the simulated training data**" (Radev, Schmitt, et al. 2023).
>
> That caveat is the crucial one. The network learns the map from data to posterior **over the region its
> training simulations covered.** If the real data are atypical under the model, the network is
> extrapolating — and unlike MCMC, it will not tell you so.
^def-neural-density-estimator

### Amortized inference

> [!definition] Paying once, inferring many times (Bürkner, Scholz, and Radev 2023)
> "**Amortized inference is an approach for flexibly reusing inferences in order to answer numerous queries
> without recomputation overhead. All of its notions require that some kind of originally costly inference
> becomes available almost instantly after a prepaid and potentially costly training phase.**
>
> **Amortized Bayesian inference (ABI) typically involves**
> 1. "**a training phase where generative neural networks learn to distill relevant information from a fitted
>    probabilistic model**", and
> 2. "**an inference phase where the neural network predictions approximate the model's posterior
>    distribution in real time as new data come in.**"
>
> **Bayesian inference subsequently happens across the whole space that has been amortized over during
> training.**"
^def-amortized-inference

> [!important] The checks still apply — and there are dedicated ones
> "**The predictive model checks described in Chapter 8 also work for ABI. For inference checking we recommend
> the ABI workflow proposed by Li et al. (2026) and calibration checking based on posterior simulations as
> proposed by Säilynoja, Schmitt, et al. (2026).**"
>
> This matters for the same reason as the typical-set caveat above: because the neural network's posterior
> is a *learned function* rather than a computed one, **the usual convergence diagnostics do not exist**, so
> [[Posterior Predictive Checking]] and calibration checking are the only line of defense.
>
> **A recent extension:** "**ABI has its origins in simulation-based inference since the training phase is
> typically done on simulated data. Recently ABI has been extended to use likelihood information during
> training**" (Schmitt et al. 2024; Mishra et al. 2025).

### Where this sits in the workflow

> [!important] What amortization changes about the economics
> The chapter's opening tradeoff ([[Approximate Algorithms and Approximate Models|Figure 13.1]]) plots
> accuracy against computation time **for one fit**. Amortization changes the axis: the cost is paid once,
> across a whole space of datasets, after which each individual inference is essentially free.
>
> That makes ABI structurally suited to settings the rest of this book does *not* address — real-time
> inference, or fitting the same model to thousands of datasets — and structurally unsuited to the
> single-dataset, iterate-on-the-model workflow that Figure 2.1 describes. **You cannot cheaply amortize a
> model you are still changing.**

## Connections

- Both ABC and ABI consume the *generative* half of the model, which is why they belong to the same family
  as [[Prior Predictive Checking]] and [[Simulation-Based Calibration - Overview]] — all four are built
  from repeated draws of $(\theta, y)$ from the joint distribution.
- The absence of standard convergence diagnostics makes the predictive checks of Ch. 8 load-bearing rather
  than supplementary here.
- Contrast with [[Variational Inference and Pathfinder]]: VI approximates *one* posterior by optimization;
  ABI learns a *function* from data to posterior.

## See Also
- [[Approximate Algorithms and Approximate Models]] — the chapter frame
- [[Generative and Partially Generative Models]] — the requirement these methods impose
- [[Simulation-Based Calibration - Overview]] — the same $(\theta,y)$ draws, used to validate rather than to infer
- [[Synthetic Likelihood - Overview]] — a related approach to intractable likelihoods already in the vault
- [[In-Context Learning and Few-Shot Prompting]] — both amortize inference
- [[Neural Simulation-Based Inference - Overview]] — dedicated treatment of neural posterior, likelihood and ratio estimation
