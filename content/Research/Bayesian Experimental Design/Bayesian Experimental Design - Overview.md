---
title: Bayesian Experimental Design - Overview
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/overview
  - doc/paper
source: "[[raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]]"
source_location: "Synthesis of Foster 2019, Foster 2020, Rainforth 2023"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design"
doc_type: paper
depends_on:
  - "[[Expected Information Gain]]"
used_by:
  - "[[Variational BOED - Overview]]"
  - "[[Unified SGD BOED - Overview]]"
  - "[[Modern Bayesian Experimental Design - Overview]]"
aliases:
  - BED Overview
  - BOED Overview
  - Bayesian Optimal Experimental Design Overview
---

# Bayesian Experimental Design - Overview

> [!summary]
> **Bayesian experimental design (BED / BOED)** chooses experiment designs $\xi$ that maximize the **expected information gain (EIG)** about latent variables $\theta$ — the expected reduction in posterior entropy, equivalently the mutual information $\mathrm{MI}_\xi(\theta; y)$. The central obstacle is that the EIG is a *doubly-intractable nested expectation*: this overview maps how three papers progressively solve it — fast **variational EIG estimators** (Foster et al. 2019), a **unified stochastic-gradient** scheme that jointly optimizes estimator and design (Foster et al. 2020), and a **review** of the resulting "computational revolution" up to policy-based adaptive design (Rainforth et al. 2023).

## Overview

When experimentation is costly, slow, or dangerous, we want to choose the design that teaches us the most. BED formalizes "the most" information-theoretically: build a Bayesian model — prior $p(\theta)$ and likelihood/simulator $p(y \mid \theta, \xi)$ — and pick the design $\xi^\* = \arg\max_\xi \mathrm{EIG}(\xi)$. This is a principled, model-based alternative to classical (frequentist) design criteria based on the Fisher information matrix.

The framework dates to **Lindley (1956)** and **Chaloner & Verdinelli (1995)**. Its modern resurgence is driven by machine-learning tools — amortized variational inference, stochastic gradients, and neural networks — that finally make the EIG cheap enough to optimize in high dimensions and in real time. These three ingested papers (all from the Oxford / Rainforth group) are the methodological core of that resurgence.

## Main Content

### The four ingested sources

| Source | Role | Key contribution |
|--------|------|------------------|
| **Lindley (1956)** — *On a Measure of the Information…* (Ann. Math. Stat.) | foundation | Defines the average information of an experiment (= EIG); non-negativity, additivity, the design rule; determinant criterion → [[Lindley's Information Measure]] |
| **Foster et al. 2019** — *Variational BOED* (NeurIPS) | estimation | Four fast variational EIG estimators with $\mathcal{O}(T^{-1/2})$ convergence, vs $\mathcal{O}(T^{-1/3})$ for nested Monte Carlo |
| **Foster et al. 2020** — *Unified SGD BOED* (AISTATS) | estimation **+** optimization | Replaces the two-stage (estimate-then-optimize) procedure with a single stochastic-gradient ascent on a variational lower bound; introduces the **ACE** and **PCE** bounds |
| **Rainforth et al. 2023** — *Modern BED* (Statistical Science) | review | Synthesizes nested estimation, debiasing (MLMC), variational bounds, gradient optimization, and **policy-based** adaptive design (DAD) |

### The central problem the field solves

The EIG ([[Expected Information Gain]]) cannot be evaluated directly because both the marginal likelihood $p(y\mid\xi)$ and the posterior $p(\theta\mid y,\xi)$ are intractable — a *double intractability* requiring [[Nested Estimation and Nested Monte Carlo|nested estimation]]. The progression across the three papers is:

1. **Make estimation fast** — replace per-outcome nested Monte Carlo with amortized variational approximations that share information across outcomes ([[Variational BOED - Overview]]).
2. **Fuse estimation and optimization** — make the variational bound differentiable in *both* the variational and design parameters, so one SGD loop does everything ([[Unified SGD BOED - Overview]]).
3. **Scale to adaptive, real-time, implicit-model settings** — debiasing schemes, implicit-likelihood estimators, and amortized **design policies** ([[Modern Bayesian Experimental Design - Overview]]).

### Folder map

- **[[Foundations/_Index|Foundations]]** — the shared conceptual core: [[Lindley's Information Measure]], [[Expected Information Gain]], [[Nested Estimation and Nested Monte Carlo]], [[Sequential and Adaptive BED]].
- **[[Research/Bayesian Experimental Design/Variational EIG Estimators/_Index|Variational EIG Estimators]]** — Foster 2019: the posterior, marginal, VNMC, and implicit-likelihood estimators.
- **[[Research/Bayesian Experimental Design/Gradient-Based Unified BOED/_Index|Gradient-Based Unified BOED]]** — Foster 2020: BA, ACE, PCE, likelihood-free ACE, and high-dimensional applications.
- **[[Research/Bayesian Experimental Design/Modern BED Review/_Index|Modern BED Review]]** — Rainforth 2023: objectives, the computational revolution, optimization, policies, and open challenges.

## Connections

- **Generalizes / formalizes** classical experimental design (Fisher information, alphabetic A/D/E-optimality) within a coherent Bayesian decision-theoretic framework — see [[Information-Theoretic Design Objectives]].
- **Special cases** include Bayesian **active learning** (BALD), Bayesian optimization, and adaptive design optimization in cognitive science.
- **Builds on** mutual-information estimation from representation learning (InfoNCE, MINE, Barber–Agakov) — the variational EIG bounds are MI bounds repurposed for design.
- **Contrasts with** frequentist [[Research/Research Methodology/Experimental Design/_Index|experimental design]] (power analysis, Type S/M errors) which fixes a design before data and reasons about long-run error rates rather than information.

## See Also
- [[Expected Information Gain]] — the objective every method optimizes
- [[Decision Analysis]] — EIG as the expected utility of an experiment under a KL/log-score utility
- [[Approximation Methods]] — variational inference, the engine behind fast EIG estimation
- [[Research/Research Methodology/Experimental Design/_Index|Experimental Design (frequentist)]] — the classical counterpart
