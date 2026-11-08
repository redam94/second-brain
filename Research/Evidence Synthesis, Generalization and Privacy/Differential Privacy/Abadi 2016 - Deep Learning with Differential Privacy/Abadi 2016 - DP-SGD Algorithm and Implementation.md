---
title: "Abadi 2016 - DP-SGD Algorithm and Implementation"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/concept
  - doc/paper
source: "[[raw/Abadi 2016 - Deep Learning with Differential Privacy.pdf]]"
source_location: "Sec. 2.2, Sec. 3.1 (Algorithm 1) and Sec. 4 (Figure 1), pp. 3-6"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abadi 2016 - Deep Learning with Differential Privacy"
doc_type: paper
depends_on:
  - "[[Abadi 2016 - DP Background and Gaussian Mechanism]]"
used_by:
  - "[[Abadi 2016 - Moments Accountant Theorems and Proofs]]"
  - "[[Abadi 2016 - MNIST and CIFAR-10 Experiments]]"
  - "[[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]]"
aliases:
  - DP-SGD
  - Differentially private SGD Algorithm 1
  - per-example gradient clipping
---

# Abadi 2016 - DP-SGD Algorithm and Implementation

> [!summary]
> DP-SGD replaces the SGD minibatch gradient with a clipped, noised lot gradient: each example's gradient is clipped to $\ell_2$ norm $C$, the clipped gradients are summed over a lot sampled with probability $q=L/N$ per example, Gaussian noise $\mathcal N(0,\sigma^2C^2I)$ is added, the result is divided by $L$, and a normal descent step is taken. The implementation adds a sanitizer, a privacy accountant, per-example gradients, DP PCA and public pretrained convolutional layers.

## Overview

Section 2.2 recalls deep learning basics; Section 3.1 gives the algorithm and its design choices; Section 4 describes the TensorFlow implementation. The privacy analysis of the algorithm is in [[Abadi 2016 - Moments Accountant Theorems and Proofs]].

## Main Content

### Setup (Sec. 2.2)

Loss on parameters $\theta$ is the average over training examples $\{x_1,\dots,x_N\}$: $\mathcal L(\theta)=\frac1N\sum_i\mathcal L(\theta,x_i)$. Mini-batch SGD forms a batch $B$ of random examples, computes $g_B=\frac1{|B|}\sum_{x\in B}\nabla_\theta\mathcal L(\theta,x)$ as an estimate of $\nabla_\theta\mathcal L(\theta)$, and steps along $-g_B$. The implementation sits on TensorFlow, which automates gradient graphs and batching.

### Why gradients, not final parameters (Sec. 3.1)

One could treat training as a black box and noise the final parameters, but without a tight characterization of how parameters depend on the data, worst-case noise would destroy utility. Instead the influence of data is controlled **inside** the SGD computation (as in earlier work), with a refined accounting.

> [!definition] Algorithm 1: Differentially private SGD (outline)
> **Input:** examples $\{x_1,\dots,x_N\}$, loss $\mathcal L(\theta)=\frac1N\sum_i\mathcal L(\theta,x_i)$. **Parameters:** learning rate $\eta_t$, noise scale $\sigma$, group (lot) size $L$, gradient norm bound $C$. Initialize $\theta_0$ randomly.
> For $t\in[T]$:
> 1. Take a random sample $L_t$ with sampling probability $L/N$.
> 2. *Compute gradient*: for each $i\in L_t$, $g_t(x_i)\leftarrow\nabla_{\theta_t}\mathcal L(\theta_t,x_i)$.
> 3. *Clip gradient*: $\bar g_t(x_i)\leftarrow g_t(x_i)/\max\!\big(1,\ \|g_t(x_i)\|_2/C\big)$.
> 4. *Add noise*: $\tilde g_t\leftarrow\frac1L\Big(\sum_i\bar g_t(x_i)+\mathcal N(0,\sigma^2C^2I)\Big)$.
> 5. *Descent*: $\theta_{t+1}\leftarrow\theta_t-\eta_t\tilde g_t$.
> **Output:** $\theta_T$ and the overall privacy cost $(\varepsilon,\delta)$ from a privacy accountant.
^def-dpsgd

**Components of the design.**
- **Norm clipping.** There is no a priori bound on gradient size, so each gradient $g$ is replaced by $g/\max(1,\|g\|_2/C)$. If $\|g\|_2\le C$ it is unchanged; otherwise it is scaled to norm $C$. Clipping is also a common non-privacy ingredient of deep-net SGD, though there it usually suffices to clip after averaging.
- **Per-layer and time-dependent parameters.** Each layer can have its own $C$ and $\sigma$, and these may vary with $t$. The experiments use constant settings.
- **Lots vs batches.** A *lot* is the group over which noise is added; a *batch* is the computational grouping. Memory is limited by the batch, so several batches are combined into a lot. In practice lots are formed by random permutation and partitioning; for analysis each example is included independently with probability $q=L/N$. One epoch is $N/L$ lots in expectation.
- **Privacy accounting.** The accountant accumulates the cost of every access to the training data. Because each step uses multiple layers, the cost of all of them is accumulated.

**Why noise scale $\sigma C$ on the sum.** Swapping a single example changes the clipped sum by at most $C$ in $\ell_2$ (add/remove adjacency), so the sum has sensitivity $C$ and the Gaussian noise has standard deviation $\sigma C$, matching the Gaussian mechanism of [[Abadi 2016 - DP Background and Gaussian Mechanism]] with noise multiplier $\sigma$.

### Implementation (Sec. 4)

The code (Apache 2.0, github.com/tensorflow/models) has two components: a **sanitizer** that clips per-example gradient norms and adds noise to the batch gradient, and a **privacy_accountant** that tracks spending. Figure 1 gives the `DPSGD_Optimizer.Minimize` (accumulate privacy spending first, compute per-example gradients, sanitize, apply) and `DPTrain` (train while `within_limit(eps, delta)`) code.

- **Per-example gradients.** TensorFlow batches gradient computation, so the paper implements a `per_example_gradient` operator (Goodfellow) with only modest slowdown. It supports losses where each $x_i$ is singly connected to $\mathcal L$, which handles most hidden layers but not convolutional layers.
- **Accountant.** Implements the moments accountant that additively accumulates the log moments $\alpha(\lambda)$ of the privacy loss. $\alpha(\lambda)$ can come from an asymptotic bound, a closed form, or numerical integration; the first option recovers advanced composition. Here numerical integration is used for $E_1,E_2$ (Eqs. 3-4), over $\lambda\le32$, which suffices for the parameters of interest. At any time $(\varepsilon,\delta)$ can be queried via Theorem 2.2. To avoid the attacks of Rogers et al. on adaptively chosen privacy parameters, the number of iterations and the privacy parameters are fixed ahead of time; a general accountant must distinguish a privacy *odometer* from a privacy *filter*.
- **Differentially private PCA.** Follows Dwork et al. (Analyze Gauss): sample training examples, normalize each to unit $\ell_2$ norm as rows of $A$, add Gaussian noise to $A^TA$, take principal directions of the noisy covariance, and project each input before the network. PCA costs privacy but improves accuracy and cuts training time (784 to 60 dimensions gives about 10x reduction in MNIST training time).
- **Convolutional layers.** Per-example gradients are hard for shared-parameter layers in TensorFlow, so the paper learns convolutional layers on a **public** dataset (GoogLeNet/AlexNet features, word2vec, GloVe are the suggested analogues) and treats them as fixed, following Jarrett et al.

## Examples

> [!example] Noise magnitude in the MNIST setting
> Setup: lot size $L=600$, clip $C=4$ per layer, $\sigma=4$ (the medium setting).
> Solution: the noise added to the lot sum has per-coordinate standard deviation $\sigma C=16$; after dividing by $L$ it is $16/600\approx0.027$ per coordinate. A single clipped example contributes at most $C/L=4/600\approx0.0067$ in $\ell_2$ to the averaged gradient.
> Interpretation: per coordinate the noise is larger than one example's maximal contribution, which is intended; the signal is the sum over $L$ examples across many coordinates and steps. These are recomputed from the paper's stated hyperparameters.
^ex-dpsgd-noise

```python
import numpy as np

def dp_sgd_step(theta, X, y, grad_fn, q, C, sigma, lr, rng):
    """One DP-SGD step with Poisson sampling.
    grad_fn(theta, x, y) -> per-example gradient (1-D array)."""
    N = len(X)
    mask = rng.random(N) < q                 # lot: each example w.p. q = L/N
    idx = np.flatnonzero(mask)
    L = q * N                                # expected lot size, as in Algorithm 1
    total = np.zeros_like(theta)
    for i in idx:
        g = grad_fn(theta, X[i], y[i])
        g = g / max(1.0, np.linalg.norm(g) / C)   # clip to l2 norm <= C
        total += g
    total += rng.normal(0.0, sigma * C, size=theta.shape)  # N(0, sigma^2 C^2 I)
    return theta - lr * total / L

# logistic-regression gradient for a demo
def grad_logreg(theta, x, y):
    p = 1.0 / (1.0 + np.exp(-x @ theta))
    return (p - y) * x

rng = np.random.default_rng(0)
X = rng.normal(size=(2000, 5)); true = np.array([1., -1., .5, 0., 2.])
y = (X @ true + rng.normal(size=2000) > 0).astype(float)
theta = np.zeros(5)
for t in range(300):
    theta = dp_sgd_step(theta, X, y, grad_logreg, q=0.05, C=1.0, sigma=1.0, lr=0.5, rng=rng)
print(np.round(theta, 2))
```

The snippet implements Algorithm 1; it does not account for privacy (see [[Abadi 2016 - Moments Accountant Theorems and Proofs]] for the accounting).

## Connections

- The same algorithm, with sampling without replacement of fixed size $m$ and replace-one adjacency, is analyzed as "NoisySGD" in [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]].
- Per-step mechanism: [[Abadi 2016 - DP Background and Gaussian Mechanism]]; total cost: [[Abadi 2016 - Moments Accountant Theorems and Proofs]].
- Tuning of $L$, $C$, $\sigma$, learning rate: [[Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search]].
- Stochastic-gradient background elsewhere in the vault: [[Unified SGD BOED - Overview]] (a different use of SGD).

## See Also

- [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]]
- [[Abadi 2016 - MNIST and CIFAR-10 Experiments]]
