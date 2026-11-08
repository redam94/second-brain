---
title: "Izmailov 2021 - Cheaper Approximations versus HMC"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bayesian-neural-networks
  - type/concept
  - doc/paper
source: "[[raw/Izmailov 2021 - What Are Bayesian Neural Network Posteriors Really Like.pdf]]"
source_location: "Sec. 3, 9, 10 and Table 3, Fig. 10, pp. 2-3, 8-9"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Izmailov 2021 - Bayesian Neural Network Posteriors"
doc_type: paper
depends_on:
  - "[[Izmailov 2021 - Predictive Performance and Domain Shift]]"
used_by:
  - "[[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]]"
aliases:
  - deep ensembles as approximate Bayes
  - fidelity of approximate BNN inference
  - BNN discussion and practical advice
---

# Izmailov 2021 - Cheaper Approximations versus HMC

> [!summary]
> Using HMC's predictive distribution as ground truth, deep ensembles (50 models) and SG-MCMC variants give good accuracy and calibration but distinct predictive distributions; mean-field VI is the worst approximation; and deep ensembles, usually called non-Bayesian, are a *higher-fidelity* approximation to the BMA than standard SGLD or VI. Higher fidelity to HMC also meant lower robustness to covariate shift.

## Overview

Section 9 asks how faithful scalable methods are, measured against the HMC predictive distribution $\hat p$ on CIFAR-10 and CIFAR-10-C. Section 3 surveys the methods; Section 10 draws practical conclusions.

## Main Content

### Method families (Sec. 3)

| Family | Examples named in the paper | Known limitation |
|---|---|---|
| Stochastic VI | Blundell et al. 2015; Kingma et al. 2015; Louizos & Welling 2017 | unimodal Gaussian approximations of a multimodal posterior |
| Dropout | Gal & Ghahramani 2016 | - |
| Laplace | MacKay 1992; Ritter et al. 2018; Daxberger et al. 2020 | local, single mode |
| SGD-trajectory methods | SWAG (Maddox et al. 2019), SGLD-type sampling | approximate |
| SG-MCMC | Welling & Teh 2011; Zhang et al. 2020b (cyclical) | biased: no MH correction, subsampling noise |
| Deep ensembles | Lakshminarayanan et al. 2017; Fort et al. 2019 | represent modes only, though with a Bayesian interpretation (Wilson & Izmailov 2020) |

### Fidelity metrics (Sec. 9.1)

> [!definition] Agreement and total variation against HMC
> For HMC predictive $\hat p$ and another method's $p$ on $n$ test points:
> $$\text{agreement}=\frac1n\sum_{i=1}^n\mathbb I\big[\arg\max_j\hat p(j\mid x_i)=\arg\max_jp(j\mid x_i)\big],\qquad \text{TV}=\frac1n\sum_{i=1}^n\tfrac12\sum_j\big|\hat p(j\mid x_i)-p(j\mid x_i)\big|.$$
> Agreement (higher is better) measures matching of top-1 predictions; TV (lower is better) measures the distance between predictive probabilities across classes. As a reference, HMC's own value is computed as one chain vs the ensemble of the other two.
^def-agreement-tv

### Findings (Table 3, Fig. 10)

Compared on ResNet-20-FRN: deep ensemble of 50; SGLD; SGHMC with cyclical learning rate (SGHMC-CLR) and its preconditioned version (SGHMC-CLR-Prec); MFVI; three runs each.
1. MFVI gives the **worst** approximation of the HMC predictive distribution.
2. Deep ensembles significantly outperform MFVI, and beat both SGLD and SGHMC in TV on CIFAR-10 and in agreement on CIFAR-10-C. The authors read this as support for the argument that deep ensembles, while not typically characterized as Bayesian, "provide a higher fidelity approximation to a Bayesian model average" than conventional approximate-inference methods.
3. Advanced SG-MCMC (SGHMC-CLR, -Prec) best fit the HMC predictive distribution without improving accuracy, and are also less robust to CIFAR-10-C corruptions: higher fidelity to the Bayesian answer can mean lower robustness.
4. Overall absolute agreement with HMC is not high for any method. Individual numeric entries are in Table 3 of the paper and are not reproduced here.

**Fig. 10 (entropy, calibration).** SGD, deep ensembles and MFVI are more confident than HMC; SGLD is slightly under-confident relative to HMC and SGHMC-CLR-Prec slightly over-confident. All methods except SGD are conservative (confidence below accuracy); SGD is very over-confident (Guo et al. 2017). Deep ensembles and MFVI are the best calibrated; SGLD and SGHMC-CLR-Prec match HMC's entropy distribution best.

### Discussion and advice (Sec. 10)

- BNNs improve over SGD in many settings in accuracy and uncertainty calibration; the best results on most problems were from BNNs.
- HMC is impractical for most realistic cases; the authors hope for accurate scalable approximations. Practical convergence advice: long trajectories and multiple long chains; available diagnostics can still miss unvisited regions.
- Orthodoxy challenged: standard Gaussian priors are *not* shown to be poor; cold posteriors are not a general phenomenon; deep ensembles are closer to Bayes than VI; higher-fidelity Bayes may be less robust to covariate shift.

## Examples

**Computing agreement and TV from two predictive arrays.**
```python
import numpy as np
def agreement_tv(p_hmc, p_other):          # arrays (n, n_classes)
    agree = np.mean(p_hmc.argmax(1) == p_other.argmax(1))
    tv = np.mean(0.5*np.abs(p_hmc - p_other).sum(1))
    return agree, tv
```

## Relevance to marketing measurement

When a team fits a flexible model by ADVI/mean-field and compares against NUTS (see [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]] and [[Variational Inference and Pathfinder]]), this paper is the cautionary precedent: the cheaper approximation can look equally accurate in held-out error yet give a different predictive distribution. For decisions that depend on tails (budget risk), compare predictive distributions, not only RMSE.

## Connections

[[Neural Posterior Estimation (NPE)]] and amortized methods ([[Amortized vs Sequential Inference]]) face the same fidelity question; checking them with SBC and coverage is in [[Benchmarking and Diagnosing SBI (SBC, Coverage, C2ST)]].

## See Also

[[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]], [[Stochastic and Black-Box Variational Inference]].
