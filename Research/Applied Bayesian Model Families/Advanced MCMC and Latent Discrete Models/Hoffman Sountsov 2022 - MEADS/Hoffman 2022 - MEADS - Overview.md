---
title: "Hoffman 2022 - MEADS - Overview"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/overview
  - doc/paper
source: "[[raw/Hoffman Sountsov 2022 - Tuning-Free Generalized Hamiltonian Monte Carlo.pdf]]"
source_location: "Whole paper incl. appendices, pp. 1-15 (AISTATS 2022, PMLR 151)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Sountsov 2022 - MEADS"
doc_type: paper
depends_on:
  - "[[Efficient MCMC]]"
  - "[[Hoffman 2021 - ChEES-HMC - Overview]]"
used_by:
  - "[[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]]"
  - "[[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]]"
  - "[[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]]"
  - "[[Hoffman 2022 - MEADS - Experiments and Ablations]]"
  - "[[Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof]]"
aliases:
  - "MEADS overview"
  - "Hoffman Sountsov 2022"
  - "Tuning-free GHMC"
---

# Hoffman 2022 - MEADS - Overview

> [!summary]
> Hoffman & Sountsov (2022), *Tuning-Free Generalized Hamiltonian Monte Carlo* (AISTATS, PMLR 151), propose **MEADS** (Maximum-Eigenvalue Adaptation of Damping and Step-size): an ensemble-chain adaptation (ECA) scheme that sets every tunable parameter of generalised HMC (step size, damping, slice drift, diagonal preconditioner) each iteration from cross-chain statistics, without perturbing the stationary distribution and therefore without any "freeze after warmup". On eight Inference Gym targets it is competitive with NUTS and ChEES-HMC in gradients-to-low-bias, and designed to run 100+ chains on an accelerator.

## Overview

**Research question.** Generalised HMC (GHMC; Horowitz 1991) partially refreshes momentum every iteration, takes as little as one leapfrog step per iteration and relates to underdamped Langevin dynamics, but nobody knew how to tune it automatically: acceptance-rate and squared-jumped-distance heuristics do not transfer because progress is spread over many iterations.

**Contributions.**
1. A recipe for **parallelisable ensemble-chain adaptation**: update many chains at once, each using parameters computed from other chains, while preserving the correct stationary distribution ([[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]]).
2. Heuristics for step size, damping and slice drift for GHMC with Neal's (2020) persistent slice scheme, plus ECA preconditioning ([[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]]).
3. A largest-eigenvalue estimator from noisy low-rank estimates: $\text{tr}(\Sigma^2)/\text{tr}(\Sigma)$.
4. Empirical comparison with ChEES-HMC and NUTS ([[Hoffman 2022 - MEADS - Experiments and Ablations]]).

**Key results.** MEADS needs fewer gradients than NUTS to reach low bias on most targets (for example sparse logistic regression: 510 vs 2616 gradients to squared bias $\le0.01$), is comparable with ChEES-HMC, and its performance is insensitive to its three user-facing constants.

## Source Map

| Paper section | Content | Note |
|---|---|---|
| Abstract, 1 Introduction | GHMC motivation, contributions | this note, [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]] |
| 2.1 Hamiltonian Monte Carlo | leapfrog, per-dimension step size | [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]] |
| 2.2 Generalized HMC (eqs 1-2, Algorithm 1) | partial momentum refresh, Langevin limit, rejection cost, persistent-MH slice scheme | [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]] |
| 2.3 Ensemble-chain adaptation (eq 3, Fig. 1) | invariance of product distribution | [[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]] |
| 3 Parallelizable ECA (Figs 1-2) | K-fold scheme | [[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]] |
| 4.1 Diagonal preconditioning, 4.2 Step size (eq 4) | scaling, $\epsilon\le2/\sqrt{\lambda_{\max}}$, gradient outer product | [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]] |
| 4.3 Damping factor and slice drift (eqs 5-6) | $\gamma$, $\alpha$, $\delta=\alpha/2$ | same |
| 4.4 Estimating largest eigenvalues (eq 7, Algorithm 2) | ratio estimator | same |
| Algorithm 3 | MEADS | same |
| 5 Efficiency experiments (Tables 1-2, Fig. 3, eq 8) | targets, bias, grads/ESS | [[Hoffman 2022 - MEADS - Experiments and Ablations]] |
| 6 Discussion | extensions | [[Hoffman 2022 - MEADS - Experiments and Ablations]] |
| Appendix A Ablations | multiplier, slowdown, folds | [[Hoffman 2022 - MEADS - Experiments and Ablations]] |
| Appendix B Bias plots | transient bias | [[Hoffman 2022 - MEADS - Experiments and Ablations]] |
| Appendix C Eigenvalue estimator | four spectra, asymptote | [[Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation]] |
| Appendix D Hogwild dangers | XOR example | [[Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof]] |
| Appendix E Proof of eq 4 | Hessian = outer product of gradients | [[Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof]] |

## Motivating PyMC examples

From [the PyMC challenges examples page](https://redam94.github.io/pymc-challenges/examples.html): **E86** "GPU ensembles: ChEES-HMC and MEADS on a forest of 20,000 cells" (log-Gaussian Cox process, blackjax ChEES and MEADS, GPU vs CPU timing by chains, size and precision, float32 checks). **E12** "The inference frontier" uses the same family of hard high-dimensional targets, including stochastic volatility.

## Connections

- Predecessor: [[Hoffman 2021 - ChEES-HMC - Overview]] (the baseline), whose adapted $T$ is replaced here by damping adaptation.
- Existing vault: [[Efficient MCMC]], [[HMC and Stan in Practice]], [[The Typical Set and the Log Posterior Density]].
- Geometry that defeats both: [[Betancourt 2015 - HMC for Hierarchical Models - Overview]].

## Relevance to marketing measurement

MEADS-style ensemble samplers matter when a model has to be refit repeatedly on accelerators (e.g. nightly Bayesian MMM refreshes, or many geo-level models fitted in parallel): the algorithm needs no warmup-freeze logic and no hand-tuned trajectory length. The limit the paper itself acknowledges: it assumes many chains are cheap to run, and its guarantees are about stationarity, not about hard funnel geometry.

## See Also
[[Hoffman 2021 - ChEES-HMC - Overview]], [[Betancourt 2015 - HMC for Hierarchical Models - Overview]], [[Efficient MCMC]]
