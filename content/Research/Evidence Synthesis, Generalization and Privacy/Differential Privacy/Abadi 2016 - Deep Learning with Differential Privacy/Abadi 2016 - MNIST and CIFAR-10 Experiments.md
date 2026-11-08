---
title: "Abadi 2016 - MNIST and CIFAR-10 Experiments"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/example
  - doc/paper
source: "[[raw/Abadi 2016 - Deep Learning with Differential Privacy.pdf]]"
source_location: "Sec. 5.1-5.3 and Figures 2-6, pp. 6-9"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abadi 2016 - Deep Learning with Differential Privacy"
doc_type: paper
depends_on:
  - "[[Abadi 2016 - Moments Accountant Theorems and Proofs]]"
  - "[[Abadi 2016 - DP-SGD Algorithm and Implementation]]"
  - "[[Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search]]"
used_by:
  - "[[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]]"
aliases:
  - Abadi MNIST CIFAR results
  - DP-SGD empirical results
---

# Abadi 2016 - MNIST and CIFAR-10 Experiments

> [!summary]
> The moments accountant certifies $\varepsilon=1.26$ where strong composition gives $9.34$ (100 epochs) and $2.55$ where it gives $24.22$ (400 epochs). With DP-SGD, MNIST reaches 90% / 95% / 97% test accuracy at $\varepsilon=0.5/2/8$ ($\delta=10^{-5}$) against a 98.30% non-private baseline, and CIFAR-10 reaches 67% / 70% / 73% at $\varepsilon=2/4/8$ against about 80% non-private with the same pretrained convolutions. Lot size and noise scale matter most.

## Overview

Section 5 reports (5.1) the accounting comparison, (5.2) MNIST and (5.3) CIFAR-10 results. All use $\delta=10^{-5}$ except where noted. The figures themselves (Figures 2-6) are curves; the numeric values stated in the text are reproduced here.

## Main Content

### 5.1 Moments accountant versus strong composition (Figure 2)

Setting: $q=0.01$, $\sigma=4$, $\delta=10^{-5}$; $\varepsilon$ as a function of epochs $E$ (so $T=E/q$).

| Epochs $E$ | Strong composition $\varepsilon$ | Moments accountant $\varepsilon$ |
|---|---|---|
| 100 | 9.34 | 1.26 |
| 400 | 24.22 | 2.55 |

Using the moments bound the paper achieves $(2.55,10^{-5})$-DP, where earlier techniques give only $(24.22,10^{-5})$. See [[Abadi 2016 - Moments Accountant Theorems and Proofs]] for a script that reproduces the 100-epoch figure.

### 5.2 MNIST

Data: 60,000 train / 10,000 test, $28\times28$ gray images, 10 classes. Model: feed-forward ReLU network with softmax, cross-entropy loss and an optional PCA input layer.

> [!definition] Baseline and private models
> - **Baseline:** 60-dimensional PCA projection, one hidden layer of 1,000 units, lot size 600; **98.30%** accuracy in about 100 epochs.
> - **Private:** same architecture; gradient norm clipped at **4** per layer; noise scales reported as small ($\sigma=2,\sigma_p=4$), medium ($\sigma=4,\sigma_p=7$), large ($\sigma=8,\sigma_p=16$), where $\sigma$ is the training noise and $\sigma_p$ the PCA noise; learning rate 0.1 decreased linearly to 0.052 over 10 epochs then fixed.
^def-mnist-setup

| Privacy $(\varepsilon,\delta)$ | Test accuracy |
|---|---|
| $(0.5,10^{-5})$ | 90% |
| $(2,10^{-5})$ | 95% |
| $(8,10^{-5})$ | 97% |
| $(0.25,10^{-2})$ | 90% (from Figure 4) |

Observations (Figures 3-4):
- Training and test accuracy stay close in private training, consistent with the theoretical argument that DP training generalizes well. In non-private training the gap grows with epochs (overfitting).
- Fixing $\varepsilon$, accuracy depends only weakly on $\delta$; for fixed $\delta$, varying $\varepsilon$ has a large effect.
- One hidden layer with PCA beat a two-layer network on MNIST.

**Effect of the parameters (Figure 5).** Reference values: 60 PCA dims, 1,000 hidden units, lot size 600, clipping 4, learning rate 0.1 decaying to 0.052 in 10 epochs, $\sigma=4$ (training) and $7$ (PCA); each run trains until $(2,10^{-5})$ would be violated, so a larger $\sigma$ allows more epochs.

| Parameter | Finding |
|---|---|
| PCA dimension | fairly stable; best at 60; no PCA reduces accuracy by about 2%; random projection about 92.5% |
| Hidden units | more units do not reduce accuracy (larger networks may tolerate noise better); when few epochs are possible a larger network is better |
| Lot size | large impact; empirically best about $\sqrt N$; small lots allow more epochs, large lots dilute noise |
| Learning rate | stable on $[0.01,0.07]$, peak at 0.05, falls if too large; similar accuracy possible with large rates by lowering noise and training less |
| Clipping bound | too small biases the gradient direction; too large adds more noise ($\sigma C$); practical rule: median of the unclipped gradient norms over training |
| Noise level $\sigma$ | large impact; more noise lowers per-step loss and allows more epochs |

Takeaways: (1) PCA improves accuracy and training speed (about 10x); (2) accuracy is stable over network size; (3) lot size and $\sigma$ dominate through the noise-to-signal ratio and the number of epochs. Decreasing noise during training showed no significant gain in initial experiments.

### 5.3 CIFAR-10

Data: 50,000 train / 10,000 test, $32\times32$ RGB, 10 classes; images cropped to $24\times24$. Architecture (TensorFlow CNN tutorial): two $5\times5$ stride-1 convolutions with ReLU and $2\times2$ max-pool, 64 channels each ($12\times12\times64$ then $6\times6\times64$), flatten, two fully connected layers of 384 units, softmax. Data augmentation: random $24\times24$ patch, random left-right flip, random brightness and contrast distortion, drawn independently each epoch. Non-private, this architecture reaches about 86% in 500 epochs; state of the art is about 96.5%.

*Private setup.* Per-example gradients for shared-parameter convolutions are costly, so CIFAR-100 is treated as a **public** dataset to learn the convolutional layers, the fully connected layers are initialized from that network, and the softmax layer plus either the top or both fully connected layers are trained privately. Retraining only the fully connected layers non-privately for about 250 epochs (batch size 120) gives about **80%**, the non-private baseline. Softmax-layer gradients are roughly twice as large as the other two layers, a ratio kept when trying clipping values between 3 and 10. Lot sizes tried: 600, 2,000, 4,000. Per-epoch time rises from about 40 s to 180 s.

| Privacy $(\varepsilon,10^{-5})$ | Accuracy | Lot size | $\sigma$ | Clipping |
|---|---|---|---|---|
| $\varepsilon=2$ | 67% | 2,000 | 6 | 3 |
| $\varepsilon=4$ | 70% | 4,000 | 6 | 3 |
| $\varepsilon=8$ | 73% | 4,000 | 6 | 3 |

A lot of 600 gave poor results on this dataset. The accuracy drop versus the non-private model is about 7% for CIFAR-10 versus about 1.3% for MNIST; closing this gap is left as an open test.

> [!example] Reading the privacy-accuracy frontier
> Setup: MNIST at $(8,10^{-5})$ yields 97% against a 98.30% baseline, a drop of roughly 1.3 points; CIFAR-10 at $(8,10^{-5})$ yields 73% against about 80%, a drop of about 7 points.
> Interpretation: for the same nominal $\varepsilon$ the utility cost depends strongly on the task. CIFAR-10 is harder, so the clipped, noised gradient is a poorer estimate. The paper itself writes "97% training accuracy" in the conclusion where Section 5.2 reports test accuracy; Section 5.2's wording (test set) is the one consistent with Figure 3.
^ex-frontier

## Connections

- The $(\varepsilon,\delta)$ values quoted here are conversions of the accountant's log moments; Dong, Roth and Su compare their GDP bounds to this accountant on MNIST in [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]].
- Small train/test gap and generalization: [[Overfitting and Information Criteria]].
- Hyperparameter search: [[Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search]].

## See Also

- [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]]
- [[Abadi 2016 - Related Work, Limitations and Marketing Relevance]]
