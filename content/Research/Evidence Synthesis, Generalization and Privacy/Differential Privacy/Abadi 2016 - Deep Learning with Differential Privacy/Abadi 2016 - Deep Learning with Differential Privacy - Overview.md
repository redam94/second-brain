---
title: "Abadi 2016 - Deep Learning with Differential Privacy - Overview"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/overview
  - doc/paper
source: "[[raw/Abadi 2016 - Deep Learning with Differential Privacy.pdf]]"
source_location: "Whole paper, CCS 2016 full version (arXiv 1607.00133v2), pp. 1-14"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abadi 2016 - Deep Learning with Differential Privacy"
doc_type: paper
depends_on:
  - "[[Abadi 2016 - DP Background and Gaussian Mechanism]]"
  - "[[Abadi 2016 - DP-SGD Algorithm and Implementation]]"
  - "[[Abadi 2016 - Moments Accountant Theorems and Proofs]]"
used_by:
  - "[[Mironov 2017 - Renyi Differential Privacy - Overview]]"
  - "[[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]"
aliases:
  - Abadi et al 2016 overview
  - DP-SGD paper overview
---

# Abadi 2016 - Deep Learning with Differential Privacy - Overview

> [!summary]
> Abadi, Chu, Goodfellow, McMahan, Mironov, Talwar and Zhang (CCS 2016) show how to train non-convex, multi-layer neural networks with a differential privacy (DP) guarantee in the "single-digit" $\varepsilon$ regime. The recipe is DP-SGD (clip each per-example gradient in $\ell_2$, add Gaussian noise to the lot gradient) plus the **moments accountant**, which tracks log-moments of the privacy loss and gives far tighter totals than strong composition: $\varepsilon\approx1.26$ instead of $9.34$ for 100 epochs at $q=0.01,\ \sigma=4,\ \delta=10^{-5}$. Results: MNIST 97% at $(8,10^{-5})$-DP and CIFAR-10 73% at $(8,10^{-5})$-DP.

## Overview

**Research question.** Can deep networks (non-convex objective, many layers, up to millions of parameters) be trained on sensitive, possibly crowdsourced data under a modest total privacy budget, at manageable cost in software complexity, training time and model quality? Prior work either handled convex models with few parameters or complex networks with a very large privacy loss.

**Contributions (Section 1).**
1. A refined privacy analysis: tracking higher moments of the privacy-loss random variable (the moments accountant) gives much tighter overall $\varepsilon$, both asymptotically (Theorem 1) and empirically (Figure 2).
2. Efficiency techniques: per-example gradient computation, splitting lots into smaller batches for memory, and differentially private PCA at the input layer.
3. A TensorFlow implementation evaluated on MNIST and CIFAR-10.

**Threat model.** The adversary knows the training mechanism, sees the model parameters, and may control some or all of the rest of the training data. Protection is for one record.

**Headline numbers (all $\delta=10^{-5}$ unless stated).**

| Setting | Result |
|---|---|
| Moments accountant vs strong composition, $q=0.01,\sigma=4$, 100 epochs | $\varepsilon=1.26$ vs $9.34$ |
| Same, 400 epochs | $\varepsilon=2.55$ vs $24.22$ |
| MNIST test accuracy | 90% at $\varepsilon=0.5$, 95% at $\varepsilon=2$, 97% at $\varepsilon=8$ |
| MNIST non-private baseline | 98.30% (about 100 epochs) |
| CIFAR-10 accuracy | 67% ($\varepsilon=2$), 70% ($\varepsilon=4$), 73% ($\varepsilon=8$) |
| CIFAR-10 non-private baseline (pretrained convolutions) | about 80% |

## Main Content

### Source Map

| Paper section | Content | Covered in |
|---|---|---|
| Abstract, 1 Introduction | motivation, contributions, threat model | this note; [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]] |
| 2.1 Differential Privacy (Def. 1, Gaussian mechanism, composition, accountant) | background | [[Abadi 2016 - DP Background and Gaussian Mechanism]] |
| 2.2 Deep Learning | loss, minibatch SGD, TensorFlow | [[Abadi 2016 - DP-SGD Algorithm and Implementation]] |
| 3.1 Differentially Private SGD (Algorithm 1; clipping; per-layer; lots; accounting) | algorithm | [[Abadi 2016 - DP-SGD Algorithm and Implementation]] |
| 3.2 The Moments Accountant (Theorem 1, Theorem 2, Eqs. 1-4, Lemma 3 statement) | accounting theory | [[Abadi 2016 - Moments Accountant Theorems and Proofs]] |
| 3.3 Hyperparameter Tuning | tuning guidance, cost of search | [[Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search]] |
| 4 Implementation (Figure 1 code, sanitizer, accountant, DP PCA, convolutional layers) | system | [[Abadi 2016 - DP-SGD Algorithm and Implementation]] |
| 5.1 Applying the Moments Accountant (Figure 2) | numerical comparison | [[Abadi 2016 - MNIST and CIFAR-10 Experiments]] |
| 5.2 MNIST (Figures 3, 4, 5) | experiments | [[Abadi 2016 - MNIST and CIFAR-10 Experiments]] |
| 5.3 CIFAR (Figure 6) | experiments | [[Abadi 2016 - MNIST and CIFAR-10 Experiments]] |
| 6 Related Work, 7 Conclusions | context, future work | [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]] |
| Appendix A (proof of Theorem 2) | composability and tail bound | [[Abadi 2016 - Moments Accountant Theorems and Proofs]] |
| Appendix B (proof of Lemma 3, Theorem 1) | Gaussian + sampling moments | [[Abadi 2016 - Moments Accountant Theorems and Proofs]] |
| Appendix C (Lemma C.1) | DP implies moment bound | [[Abadi 2016 - Moments Accountant Theorems and Proofs]] |
| Appendix D (Theorem D.1, Gupta et al.) | hyperparameter search cost | [[Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search]] |

### Idea in one paragraph

DP-SGD bounds each example's influence by clipping its gradient norm to $C$, then adds $\mathcal N(0,\sigma^2C^2I)$ to the summed gradient of a randomly sampled lot. Each step is a subsampled Gaussian mechanism. The moments accountant computes $\alpha(\lambda)$ for each step by numerical integration, adds the values over $T$ steps (they compose linearly), and converts to $(\varepsilon,\delta)$ with a Markov-inequality tail bound, optimizing over $\lambda$. This is the same object later named a Renyi DP curve ([[Mironov 2017 - Renyi Differential Privacy - Overview]]) and later refined by hypothesis-testing analysis ([[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]).

## Examples

> [!example] Why the accountant matters
> Fix $q=0.01$ (lot is 1% of data), $\sigma=4$, $\delta=10^{-5}$. After $E=100$ epochs ($T=E/q=10{,}000$ steps) the moments accountant gives $\varepsilon\approx1.26$, strong composition $9.34$. At $E=400$ epochs the accountant still gives $\varepsilon\approx2.55$, whereas strong composition gives $24.22$. So $(2.55,10^{-5})$-DP is certified where earlier techniques certified only $(24.22,10^{-5})$.
^ex-abadi-headline

## Connections

- Moments accountant $\to$ Renyi DP: [[Mironov 2017 - Renyi Divergence and the RDP Definition]] (Mironov is a co-author; the paper itself cites RDP as closely related).
- Dong, Roth and Su reanalyze this exact algorithm with f-DP and show a tighter trade-off than the $(\varepsilon,\delta)$ guarantee derived from the moments accountant: [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]].
- Overfitting angle: the paper observes that DP training has a small train/test gap, consistent with the generalization property of DP; see [[Overfitting and Information Criteria]].
- Marketing relevance: [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]].

## See Also

- [[Abadi 2016 - MNIST and CIFAR-10 Experiments]]
- [[Abadi 2016 - Moments Accountant Theorems and Proofs]]
- [[Mironov 2017 - Renyi Differential Privacy - Overview]]
- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]] (a deployed non-ML DP system for contrast)
