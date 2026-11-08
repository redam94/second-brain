---
title: "Izmailov 2021 - Predictive Performance and Domain Shift"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bayesian-neural-networks
  - type/example
  - doc/paper
source: "[[raw/Izmailov 2021 - What Are Bayesian Neural Network Posteriors Really Like.pdf]]"
source_location: "Sec. 6, pp. 5-7; Table 1; Figs. 5-7; Appendix F"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Izmailov 2021 - Bayesian Neural Network Posteriors"
doc_type: paper
depends_on:
  - "[[Izmailov 2021 - Mixing Diagnostics and Posterior Geometry]]"
used_by:
  - "[[Izmailov 2021 - Cheaper Approximations versus HMC]]"
aliases:
  - BNN in-domain gains and domain shift failure
  - CIFAR-10-C Bayesian neural network
---

# Izmailov 2021 - Predictive Performance and Domain Shift

> [!summary]
> With near-exact HMC, BNNs match or beat SGD, SGLD, mean-field VI and a 50-model deep ensemble in accuracy and log-likelihood on UCI regression, CIFAR-10/100 and IMDB; OOD detection is competitive for near-OOD (CIFAR-100, AUC 0.857) but weaker for far-OOD (SVHN). But under covariate shift (CIFAR-10-C corruptions) the HMC ensemble is the **worst** method, and at high corruption even one SGD network is better.

## Overview

The point is to learn what the *true* Bayesian posterior delivers (Sec. 6), not to advocate HMC. Results hold at posterior temperature 1 (see [[Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors]]).

## Main Content

### 6.1 UCI regression

Five UCI datasets, 20 random 90/10 splits, a one-hidden-layer fully connected net with 50 units and two outputs (predictive mean and standard deviation), Gaussian likelihood. HMC: one chain, 10 burn-in and 90 sampling iterations. Baselines: SGD, SGLD, subspace inference (SI), SWAG, deterministic VI (DVI; SI/SWAG/DVI numbers taken from Izmailov et al. 2019). **Finding (Fig. 5):** HMC typically outperforms the baselines in test RMSE and test log-likelihood, often significantly, and is on par with or better than all others in every experiment.

### 6.2-6.3 CIFAR and IMDB

HMC: 3 chains, step size $10^{-5}$, prior variance $1/5$, 70,248 leapfrog steps per sample; IMDB 1,200 samples. Baselines: SGD single solution; deep ensemble of 50 SGD models; SGLD (single chain with 1000 burn-in epochs and 9000 sampling epochs giving 900 samples, plus 5 independent SGLD chains); MFVI initialized at an SGD solution with an ensemble of 50 samples. **Finding (Fig. 6):** BNNs outperform all baselines on accuracy and log-likelihood on CIFAR-10, CIFAR-100 and IMDB; SGD is worst on ECE, others competitive, MFVI particularly well calibrated on CIFAR-100. The compute is enormous (over 60 million SGD-epoch equivalents on CIFAR-10).

### OOD detection (Table 1)

AUC-ROC for separating in-distribution CIFAR-10 from OOD data using predicted confidence of the HMC ensemble:

| OOD dataset | HMC | Deep ensemble | ODIN | Mahalanobis |
|---|---|---|---|---|
| CIFAR-100 (near-OOD) | 0.857 | 0.853 | 0.858 | 0.882 |
| SVHN (far-OOD) | 0.8814 | 0.8529 | 0.967 | 0.991 |

**Interpretation.** HMC beats deep ensembles on both and is competitive with the specialized ODIN on the harder near-OOD task, but is far behind specialized detectors on the easy far-OOD task.

### Covariate shift (Fig. 7, Appendix F)

> [!example] CIFAR-10-C
> The CIFAR-10 test set is corrupted in 16 ways at intensities 1-5. Methods compared: HMC, SGD, deep ensembles, SGLD, MFVI. **HMC is surprisingly the worst** on accuracy and log-likelihood; deep ensembles and SGLD are consistently more robust, and for high intensities even a single SGD model beats the HMC ensemble. Decreasing the posterior temperature improves BNN robustness to input noise (Sec. 7.1). Appendix F examines why; the paper's conclusion is that higher-fidelity Bayesian inference can suffer more under shift.
^ex-cifar10c

**Interpretation for a modeller.** The Bayesian model average is optimal *under the model*: the prior and architecture. When test inputs leave the data distribution, the posterior over functions is still confident in directions where the likelihood was uninformative about the corruption; averaging over many plausible functions that agree on training data does not make them agree off it. (The mechanism is the paper's empirical finding; the explanation here is editorial.)

## Examples

**Reading the domain-shift result for MMM.** Replace 'corruption intensity' with 'distance of a planned spend level from the historical range'. A flexible model with a well-calibrated in-sample posterior can be badly miscalibrated for scenario planning. Mitigation: hold-out designed to extrapolate (e.g., most recent flights, geo experiments), see [[Posterior Predictive Checking]] and [[Model Selection and Overfitting]].

## Connections

[[Conformal Prediction Under Covariate Shift]] gives distribution-free coverage guarantees under a known shift; [[Hooker Mentch Zhou 2021 - Extrapolation Mechanism in Forests and Neural Nets]] studies extrapolation behavior of nets and forests.

## See Also

[[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]], [[Chipman 2010 - Extensions, Discussion and Practical Use]].
