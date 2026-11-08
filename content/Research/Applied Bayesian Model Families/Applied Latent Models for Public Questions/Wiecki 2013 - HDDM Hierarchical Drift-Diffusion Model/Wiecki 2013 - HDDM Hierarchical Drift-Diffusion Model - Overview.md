---
title: "Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model - Overview"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/overview
  - doc/paper
source: "[[raw/Wiecki 2013 - HDDM Hierarchical Bayesian Drift-Diffusion Model in Python.pdf]]"
source_location: "Whole paper, pp. 1-9 (Front. Neuroinform. 7:14)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model"
doc_type: paper
depends_on:
  - "[[Wiecki 2013 - Drift-Diffusion Model and Wiener First-Passage Likelihood]]"
  - "[[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]]"
  - "[[Wiecki 2013 - Parameter Recovery Simulations and Detection Power]]"
used_by: []
aliases:
  - "HDDM paper overview"
  - "Wiecki Sofer Frank 2013"
---

# Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model - Overview

> [!summary]
> Wiecki, Sofer and Frank (2013) present **HDDM**, a Python toolbox that fits the drift-diffusion model (DDM) of two-choice response times by hierarchical Bayesian MCMC (PyMC 2, Cython-compiled Wiener first-passage likelihood). Because subject parameters are shrunk toward a group distribution, the hierarchical fit recovers parameters and detects drift-rate and trial-by-trial brain-covariate effects better than maximum likelihood, the $\chi^2$-quantile method or non-hierarchical Bayes, especially with few trials per subject.

## Overview

**Research question.** Sequential-sampling models explain choices *and* the full response-time (RT) distribution of simple decisions, but classical fitting needs hundreds of trials per condition. Can a hierarchical Bayesian formulation make the DDM usable in cognitive neuroscience, where trials are scarce and the interest is in trial-by-trial links to EEG or fMRI?

**Contribution.** (1) A hierarchical DDM (and linear ballistic accumulator) with informative priors, group-level inter-trial variabilities and an outlier model. (2) A regression interface (`HDDMRegressor`) tying any DDM parameter to trial-wise covariates. (3) Simulation evidence that hierarchical Bayes (HB) beats ML, the $\chi^2$-quantile method and non-hierarchical Bayes (nHB).

**Key result.** HB had the lowest recovery error and highest detection probability in all three simulation experiments; the gain is largest at 20-50 trials per subject and for drift rate and threshold, and a trial-by-trial effect is detected up to about 20 percentage points more often.

### Motivating PyMC examples
- **E71** "Drift diffusion models: how people trade speed for accuracy, and what they should do" (Wagenmakers et al. 2008 lexical decision; Wiener first-passage density in PyTensor) - see [the example gallery](https://redam94.github.io/pymc-challenges/examples.html).
- Related: **E36** (partial pooling over groups, linked via [[Hierarchical Models]]) and **E25** (random effects shared across two likelihoods, see [[Rizopoulos 2016 - JMbayes Joint Models Overview]]).

### Source Map

| Paper section | Location | Note |
|---|---|---|
| Abstract, Introduction (SSMs, why hierarchical Bayes, HDDM features) | pp. 1-2 | this note; [[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]] |
| Methods: Drift diffusion model, Figure 1, Wald/Feller density, full DDM | pp. 2-3 | [[Wiecki 2013 - Drift-Diffusion Model and Wiener First-Passage Likelihood]] |
| Methods: Hierarchical Bayesian estimation, Figure 2, prior list | p. 3 | [[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]] |
| Results: loading data, fitting, convergence ($\hat R$), `depends_on`, posterior tests, DIC | pp. 4-7 | [[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]] |
| Results: regression models (theta on threshold, DBS reversal, Figure 5) | pp. 7-8 | [[Wiecki 2013 - Hierarchical Bayesian Estimation Regression and Model Checking in HDDM]] |
| Simulations: Experiments 1-3 setup | pp. 7-8 | [[Wiecki 2013 - Parameter Recovery Simulations and Detection Power]] |
| Simulations: results, Figures 6-8 | pp. 8-9 | [[Wiecki 2013 - Parameter Recovery Simulations and Detection Power]] |
| Discussion, acknowledgements, references | p. 9-10 | this note, [[Wiecki 2013 - Parameter Recovery Simulations and Detection Power]] |
| Supplement (online only: priors rationale, within-subject effects, outlier model) | not in PDF | not captured (not in raw source) |

## Main Content

The three detail notes follow the paper's order. The theory note derives the Wiener first-passage-time (WFPT) likelihood and explains the speed-accuracy trade-off and the optimal-policy view (background beyond the paper, marked as such). The estimation note lists every prior and the workflow. The simulation note reproduces the three experimental designs and the qualitative results.

## Connections
- Partial pooling logic is the same as [[Hierarchical Models]]; DIC is discussed in [[Model Comparison]]; convergence checks relate to [[MCMC Basics]].
- Counterpart for marketing: response-time and choice data from online experiments (click latency, form completion) can be modelled by an accumulation process; treat as an analogy, not a result of the paper.

## See Also
[[Research/Applied Bayesian Model Families/Applied Latent Models for Public Questions/Wiecki 2013 - HDDM Hierarchical Drift-Diffusion Model/_Index]]
