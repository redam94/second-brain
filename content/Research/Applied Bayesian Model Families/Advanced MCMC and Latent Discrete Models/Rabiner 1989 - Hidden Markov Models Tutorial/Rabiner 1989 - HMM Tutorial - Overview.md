---
title: "Rabiner 1989 - HMM Tutorial - Overview"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/overview
  - doc/paper
source: "[[raw/Rabiner 1989 - A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition.pdf]]"
source_location: "Whole paper, Proc. IEEE 77(2), pp. 257-286 (30 pdf pages)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Rabiner 1989 - Hidden Markov Models Tutorial"
doc_type: paper
depends_on:
  - "[[Model Building with Latent Variables - Animal Movement]]"
  - "[[The Kalman Filter]]"
used_by:
  - "[[Rabiner 1989 - Markov Chains, HMM Definition and the Three Problems]]"
  - "[[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]]"
  - "[[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]]"
  - "[[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]]"
  - "[[Rabiner 1989 - HMM Types, Continuous Densities and State Duration]]"
  - "[[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]]"
  - "[[Rabiner 1989 - Speech Recognition Applications and Results]]"
  - "[[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]]"
aliases:
  - "Rabiner HMM tutorial overview"
  - "Rabiner 1989"
---

# Rabiner 1989 - HMM Tutorial - Overview

> [!summary]
> Rabiner (1989), *A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition* (Proc. IEEE 77(2):257-286), is the standard exposition of the HMM and its three problems: evaluation (forward-backward), decoding (posterior argmax and Viterbi) and learning (Baum-Welch EM). It also covers model types (ergodic, left-right), continuous densities, explicit state duration, scaling, multiple sequences, initialisation, and speech-recognition applications. For Bayesian work, it supplies the exact likelihood recursion that PyMC/Stan marginalise over, and the Viterbi and posterior decoders applied per posterior draw.

## Overview

**Research question.** How can a signal be modelled as a probabilistic function of an unobserved Markov chain, and how can the three practical problems (likelihood, best state sequence, parameter fitting) be solved efficiently?

**Contributions.** A self-contained derivation of discrete Markov chains and HMMs, the forward-backward procedure ($O(N^2T)$ vs $O(TN^T)$ enumeration), the Viterbi algorithm, Baum-Welch reestimation as EM, practical issues (scaling, multiple observation sequences, initial estimates, insufficient training data, model choice), extensions (continuous mixtures, autoregressive HMMs, null transitions, parameter tying, explicit durations, ML/MMI/MDI criteria) and three speech applications with error-rate tables.

**Key result for this vault.** Evaluation by forward recursion cost: with $N=5$, $T=100$ the direct sum needs about $10^{72}$ operations while the forward procedure needs about 3000, "a savings of about 69 orders of magnitude".

## Source Map

| Paper section | Content | Note |
|---|---|---|
| I Introduction | signal models, three problems, organisation | this note, [[Rabiner 1989 - Markov Chains, HMM Definition and the Three Problems]] |
| II Discrete Markov processes (eqs 1-6, Figs 1-3) | chain, weather example, duration density, coin and urn models | [[Rabiner 1989 - Markov Chains, HMM Definition and the Three Problems]] |
| II.A-II.C Elements of an HMM, three problems (eqs 7-11) | $\lambda=(A,B,\pi)$ | same |
| III.A Solution to Problem 1 (eqs 12-25, Figs 4-5) | forward, backward | [[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]] |
| III.B Solution to Problem 2 (eqs 26-35) | $\gamma$, Viterbi | [[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]] |
| III.C Solution to Problem 3 (eqs 36-44, Fig. 6) | $\xi$, Baum-Welch, EM | [[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]] |
| IV Types of HMMs (eqs 45-83, Figs 7-9) | ergodic, left-right, mixtures, AR, null, tying, duration | [[Rabiner 1989 - HMM Types, Continuous Densities and State Duration]] |
| IV.E-F Optimisation criteria, comparison (eqs 84-89) | ML, MMI, MDI, distance | same |
| V Implementation issues (eqs 90-113, Fig. 10) | scaling, multiple sequences, initial estimates, insufficient data, model choice | [[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]] |
| VI Speech recognisers (eqs 114-119, Figs 11-20, Table 1) | isolated word, LPC, VQ, k-means | [[Rabiner 1989 - Speech Recognition Applications and Results]] |
| VII Connected words (eqs 120-125, Figs 21-23, Table 2) | level building | same |
| VIII Large vocabulary, limitations, IX Summary, references | | same |

## Motivating PyMC examples

From [the examples page](https://redam94.github.io/pymc-challenges/examples.html):
- **E24** Hidden Markov models (USGS M7+ earthquake counts 1900-2024; elk GPS tracks): forward algorithm in `pytensor.scan` vs `pymc_extras` `DiscreteMarkovChain` + `marginalize`, label switching and ordering, forward-backward and Viterbi per draw, dwell times, pseudo-residuals, integrated LOO.
- **E48** Bayesian NHMM for Lorenz-84 regimes (nonhomogeneous HMM with seasonal softmax transitions).
- **E59** kinesin stepping (hypoexponential dwells, 2-phase lattice HMM forward algorithm).
- **E57** single-particle tracking (diffusion-state mixtures, GPB1 switching HMM).
Bayesian extensions of this source are covered in [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]] (concept note, no raw source).

## Connections

Existing vault: [[Model Building with Latent Variables - Animal Movement]] (movement HMMs), [[The Kalman Filter]] and [[Marginal Likelihood via the Kalman Filter]] (the continuous-state analogue of the forward recursion), [[State-Space Models and the Kalman Filter - Overview]]. Discrete latents and marginalisation: [[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]].

## Relevance to marketing measurement

HMMs model customer or market regimes: engagement states with Markov transitions, promotion regimes, dormant/active customers, and time-varying channel effectiveness with discrete regimes. The forward algorithm gives exact marginal likelihoods for gradient-based Bayesian fitting; Viterbi/posterior decoding labels the regime history; explicit duration (Sec. IV.D) matters for campaigns whose regimes are not geometric. Non-homogeneous extensions let covariates (seasonality, spend) drive transitions.

## See Also
[[Model Building with Latent Variables - Animal Movement]], [[The Kalman Filter]], [[Marginalising Discrete Latents - Why NUTS Cannot Sample Discrete Parameters]]
