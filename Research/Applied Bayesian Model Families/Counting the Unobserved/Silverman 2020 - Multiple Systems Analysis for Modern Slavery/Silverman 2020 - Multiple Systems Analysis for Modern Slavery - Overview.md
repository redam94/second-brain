---
title: "Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview"
tags:
  - source/ingested
  - topic/population-estimation
  - type/overview
  - doc/paper
source: "[[raw/Silverman 2020 - Multiple Systems Analysis for the Quantification of Modern Slavery.pdf]]"
source_location: "Entire paper (arXiv:1902.06078v3; JRSS-A 183(3): 691-736)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Silverman 2020 - Multiple Systems Analysis for Modern Slavery"
doc_type: paper
depends_on:
  - "[[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]]"
used_by:
  - "[[Silverman 2020 - Data Sets for Multiple Systems Estimation]]"
  - "[[Silverman 2020 - Frequentist Model Selection Results]]"
  - "[[Silverman 2020 - Existence, Identifiability and Empty Overlaps]]"
  - "[[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]]"
  - "[[Silverman 2020 - Bayesian-Threshold Method]]"
  - "[[Silverman 2020 - Bayesian-Threshold Results and Conclusions]]"
aliases:
  - Silverman modern slavery MSE overview
  - Model fitting in Multiple Systems Analysis for Modern Slavery
---

# Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview

> [!summary]
> Silverman (JRSS-A 2020; arXiv 1902.06078 "Model fitting in Multiple Systems Analysis for the quantification of Modern Slavery: Classical and Bayesian approaches") reviews how multiple systems estimation (MSE) of the "dark figure" depends on how list interactions are modelled. On four real data sets all existing methods show instabilities, so he proposes a Bayesian/thresholding approach (Gaussian prior on interactions, then drop weak ones) that is stable and robust on these examples.

## Overview

**Origin.** The UK Government's 2014 estimate of 10,000 to 13,000 "potential victims of human trafficking" (basis for the Modern Slavery Act 2015) was built by Silverman from six lists with a stepwise AIC log-linear model (Silverman 2014; Bales et al. 2015). Later work showed that a small fraction of the possible models give very different answers.

**Question.** How stable and robust are frequentist model selection, graphical-model Bayesian model averaging (Madigan-York), and Dirichlet-process latent-class (LCMCR) estimators on real, sparse, non-overlapping modern-slavery lists, where no ground truth exists?

**Findings.**
- UK six lists: main-effects 12.2k (95% CI 11.0-13.6k); stepwise AIC 5%: 11.4k; stepwise AIC 0.1%: 14.2k.
- Netherlands: merging the two smallest lists moves the stepwise estimate from 60.3k to 146.0k (more than doubles).
- Madigan-York on UK five lists is bimodal (median 23.0k); DP mixtures give median 23.0k on six lists, 12.0k on four lists.
- Bayesian/threshold method with prior variance 1 and threshold 2 gives UK about 12.3k (80% interval 11.5k-13.5k) and is stable under list merging.

## Motivating PyMC examples

From <https://redam94.github.io/pymc-challenges/examples.html>:
- **E109** - "Counting the uncounted: how many victims did every list miss?" (Kosovo capture histories, UK 2013 modern-slavery lists, Netherlands, New Orleans; Lincoln-Petersen and dependence bias, Poisson log-linear models of an incomplete $2^K$ table, regularised vs plain horseshoe, prior-family and main-effect-prior sensitivity, latent-class MSE with classes summed out and label switching).

## Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction | this note |
| 2 The data sets (Tables 1-4: UK, Netherlands, New Orleans, Kosovo) | [[Silverman 2020 - Data Sets for Multiple Systems Estimation]] |
| 3 Models and methods (Poisson log-linear, Eq. 1) | [[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]] |
| 4.1 Stepwise; 4.2 information criteria; 4.3 further examples (Tables 5-6, Figs. 1-4) | [[Silverman 2020 - Frequentist Model Selection Results]] |
| 4.4 Identifiability and existence of estimates | [[Silverman 2020 - Existence, Identifiability and Empty Overlaps]] |
| 5.1 Graphical models (Table 7, Figs. 5-6); 5.2 Dirichlet process mixtures (Table 8) | [[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]] |
| 6.1 Defining the prior and thresholding; 6.2 Implementation issues | [[Silverman 2020 - Bayesian-Threshold Method]] and [[Silverman 2020 - Existence, Identifiability and Empty Overlaps]] |
| 6.3 Results (Tables 9-14); 6.4 Choosing the threshold (Table 15); 7 Conclusions | [[Silverman 2020 - Bayesian-Threshold Results and Conclusions]] |
| References (Cormack 1989, 1992; Madigan and York 1997; Manrique-Vallier 2016; Chan et al. 2019 ...) | folder index (Sources section) |

## Connections

- Latent-class MSE and its identifiability: [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]], [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]].
- Interaction shrinkage is a global-local-shrinkage question: [[Horseshoe and Regularized Horseshoe Priors]], [[Global-Local Shrinkage Priors]].
- Ecological roots: [[Concept - Closed-Population Capture-Recapture and Otis Models]].
- Capture-recapture with heterogeneity connects to [[Hierarchical Models]].

## See Also

- [[Barker 2018 - Reliability of N-Mixture Models - Overview]]
- [[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]]
