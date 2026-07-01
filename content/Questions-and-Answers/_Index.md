---
title: "Index: Questions and Answers"
tags:
  - type/index
date_updated: 2026-07-01
question_count: 9
---

# Questions and Answers

> [!abstract] Routing Summary
> Answered questions from the vault knowledge base. Each answer is cross-linked
> to its source notes and related concepts.
> Browse by topic below or search for keywords.

## By Topic

### Marketing Measurement / Adaptive Experimentation
- [[Q - Continuous Learning in Media Measurement with Interaction Effects]] — A measure→decide→experiment→update loop: a Bayesian MMM/GP surrogate, shrinkage (horseshoe/partial pooling) to carry many interactions cheaply, and EIG-driven adaptive design (BED/DAD) to test only the interactions that matter — dissolving the full-factorial "cell explosion"
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] — Encode a geo-test as a design vector $\xi$ (geos × channels × magnitude × window); the MMM is the likelihood; compute targeted EIG by nested/variational Monte Carlo over the MMM posterior and optimize by stochastic-gradient ascent
- [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] — Same Bayesian surrogate, three objectives: learn (BED/EIG) → optimize (BO/acquisition) → earn-while-learning (bandit/regret); which to use for measurement vs allocation vs always-on tactics
- [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] — Adstock delays outcomes: size read-out windows to the carryover tail, insert washouts (or model residual adstock) to avoid contamination, treat carryover as a Kalman-filtered latent state, and make adaptive scheduling delay-aware

### Econometrics / Simulation-Based Estimation
- [[Q - Using SMM to Calibrate Agent Based Models]] — How to apply SMM to ABM calibration: moment selection, common random numbers, two-step W, standard errors, and comparison to genetic algorithm approaches

### Causal Inference / Identification
- [[Q - Uncovering Causal Estimates from Non-Experimental Data]] — Nine strategies (CIA, DAGs, IV, DiD, RD, Synthetic Control, metalearners, BSTS, sensitivity analysis) with assumptions and estimands

### Research Methodology / Multiple Comparisons
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] -- Classical corrections vs. Bayesian alternatives (partial pooling, regularizing priors, projection predictive selection) for model search

### Statistical Modeling / General
- [[Q - Common Pitfalls in Statistical Modeling]] -- Eight major pitfall categories: confounding, forking paths, overfitting, missing data, golem misuse, neglecting model checks, computational issues, Type S/M errors

### Bayesian vs. Frequentist Statistics
- [[Q - Differences Between Frequentist and Bayesian Statistics]] -- Core philosophical divide (probability as frequency vs. belief), confidence vs. credible intervals, priors, hierarchical models, model comparison

## Recent Questions

| Question | Date | Key Sources |
|----------|------|-------------|
| [[Q - Continuous Learning in Media Measurement with Interaction Effects]] | 2026-07-01 | [[Bayesian Media Mix Modeling - Overview]], [[Sequential and Adaptive BED]], [[Expected Information Gain]], [[Horseshoe and Regularized Horseshoe Priors]], [[Bayesian Optimisation]] |
| [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] | 2026-07-01 | [[Expected Information Gain]], [[Nested Estimation and Nested Monte Carlo]], [[Bayesian Media Mix Modeling - Overview]], [[Bayesian Structural Time-Series Model]] |
| [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] | 2026-07-01 | [[Bayesian Optimisation]], [[Acquisition Functions]], [[The Global Optimisation Problem]], [[Q- and A-learning - Overview]] |
| [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] | 2026-07-01 | [[Carryover (Adstock) Functional Forms]], [[ROAS, mROAS, and Optimal Media Mix]], [[Linear-Gaussian State-Space Models]], [[Bayesian Structural Time-Series Model]] |
| [[Q - Using SMM to Calibrate Agent Based Models]] | 2026-04-11 | [[Method of Simulated Moments]], [[ABM Calibration Overview]], [[Genetic Algorithm Calibration for ABM]], [[SMM Weighting Matrix and Inference]] |
| [[Q - Uncovering Causal Estimates from Non-Experimental Data]] | 2026-04-10 | [[The Selection Problem]], [[Instrumental Variables]], [[Differences-in-Differences]], [[Synthetic Control]] |
| [[Q - Differences Between Frequentist and Bayesian Statistics]] | 2026-04-09 | [[Probability and Bayesian Inference]], [[Asymptotics and Frequentist Connections]], [[Hierarchical Models]] |
| [[Q - Common Pitfalls in Statistical Modeling]] | 2026-04-09 | [[Spurious Association and Confounds]], [[Garden of Forking Paths]], [[Overfitting and Information Criteria]], [[Model Checking]] |
| [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] | 2026-04-09 | [[Multiple Comparisons - Bayesian Perspective]], [[Garden of Forking Paths]], [[Partial Pooling as Multiple Comparisons Correction]] |

## All Questions

- [[Q - Continuous Learning in Media Measurement with Interaction Effects]] — Model interactions with a continuous surrogate + shrinkage rather than a full factorial; use expected-information-gain adaptive design (and amortized DAD policies / Bayesian-optimization acquisitions) to spend scarce experiments only on decision-relevant interactions
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] — Design $\xi$ = geos × channels × magnitude × window; MMM as likelihood/simulator; targeted EIG via NMC/variational estimators; gradient ascent over designs; BSTS read-out
- [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] — Learn → BED (EIG), optimize → BO (acquisition), earn-while-learning → bandit (regret); one surrogate, three objectives; compose them (periodic BED/BO + continuous bandit)
- [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] — Delayed outcomes from adstock: window to the carryover tail, washout/model overlap, carryover-as-latent-state (Kalman/BSTS), delay-aware adaptive scheduling
- [[Q - Using SMM to Calibrate Agent Based Models]] — Choose ABM parameters to minimize weighted distance between observed and simulated macro moments; enables formal standard errors and specification testing via J-test
- [[Q - Uncovering Causal Estimates from Non-Experimental Data]] — Nine identification strategies: CIA/matching, DAGs, IV, DiD, RD, synthetic control, metalearners, BSTS, sensitivity analysis
- [[Q - Differences Between Frequentist and Bayesian Statistics]] -- Probability as frequency vs. belief; confidence vs. credible intervals; priors; partial pooling; WAIC vs. AIC; when each framework excels
- [[Q - Common Pitfalls in Statistical Modeling]] -- Eight pitfall categories with remedies: confounding, forking paths, overfitting, missing data, golem misuse, model checking, computational issues, Type S/M errors
- [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] -- Stop selecting by significance; use regularizing priors, projection predictive selection, or multilevel models with partial pooling
