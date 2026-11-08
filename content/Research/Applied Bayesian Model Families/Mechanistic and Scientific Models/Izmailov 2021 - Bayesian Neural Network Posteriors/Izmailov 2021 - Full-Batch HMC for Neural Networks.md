---
title: "Izmailov 2021 - Full-Batch HMC for Neural Networks"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bayesian-neural-networks
  - type/definition
  - doc/paper
source: "[[raw/Izmailov 2021 - What Are Bayesian Neural Network Posteriors Really Like.pdf]]"
source_location: "Sec. 2 and 4, pp. 2-4; Appendix A; Fig. 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Izmailov 2021 - Bayesian Neural Network Posteriors"
doc_type: paper
depends_on:
  - "[[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]]"
  - "[[HMC and Stan in Practice]]"
used_by:
  - "[[Izmailov 2021 - Mixing Diagnostics and Posterior Geometry]]"
aliases:
  - full-batch HMC
  - HMC trajectory length rule for BNNs
  - Bayesian model average
---

# Izmailov 2021 - Full-Batch HMC for Neural Networks

> [!summary]
> The paper's sampler is plain HMC on the full-data log-posterior, parallelized over 512 TPUv3 devices, with no data augmentation, smooth (Swish) activations and filter-response normalization so that the likelihood is a legitimate function of the weights. Trajectory length is set by $\hat\tau=\pi\alpha_{\text{prior}}/2$, step sizes around $10^{-5}$ give high acceptance, and a single long chain is almost as good as several.

## Overview

A BNN's predictions are the Bayesian model average (BMA) $p(y\mid x,\mathcal D)=\int p(y\mid x,w)p(w\mid\mathcal D)dw$ (eq. 1), approximated as $\frac1M\sum_{i=1}^Mp(y\mid x,w_i)$ with $w_i\sim p(w\mid\mathcal D)$. HMC (Neal et al. 2011) produces asymptotically exact samples given the unnormalized density $p(\mathcal D\mid w)p(w)$ and its gradient. The authors do not recommend HMC for practice; they use it as the most precise instrument available to study the BNN posterior.

## Main Content

### Why full-batch

> [!definition] Stochastic-gradient MCMC bias
> SGMCMC (SGLD, SGHMC) is fundamentally biased because (1) it omits the Metropolis-Hastings correction and (2) subsampling noise perturbs the stationary distribution; Betancourt (2015) argues HMC is incompatible with data subsampling. Random data augmentation likewise makes the log-density stochastic, with no clean interpretation as a valid likelihood (Wenzel et al. 2020), so the main evaluations use **no data augmentation**.
^def-sgmcmc-bias

### Model and implementation choices

| Choice | Value | Reason |
|---|---|---|
| Architectures | ResNet-20-FRN (CIFAR), CNN-LSTM (IMDB, from Wenzel et al.) | follows Wenzel et al. 2020 |
| Normalization | Filter response normalization instead of batch norm | batch norm couples training examples, obscuring the likelihood |
| Activations | Swish/SiLU, not ReLU | smooth posterior surface improves HMC acceptance without hurting accuracy |
| Hardware | 512 TPUv3, SPMD: data sharded, each device keeps a synchronized chain copy, full-batch gradients via collectives; JAX code released | full-batch gradient |
| Data | CIFAR-10/100 (a 40,960-point subset so the data shards evenly), IMDB; UCI regression | - |
| Cost | A CIFAR-10 HMC run equals over 60 million epochs of SGD training | not a practical recipe |

### Hyperparameters

> [!definition] Trajectory length rule (eq. 2)
> $$
> \hat\tau=\frac{\pi\,\alpha_{\text{prior}}}{2},
> $$
> where $\alpha_{\text{prior}}$ is the prior standard deviation of the weights. For a spherical Gaussian target $N(0,\alpha^2I)$ the Hamiltonian is a set of independent harmonic oscillators with period $2\pi\alpha$, so $\tau=\pi\alpha/2$ is a quarter-turn that swaps position and momentum; HMC with small step size then yields exact samples. The authors argue the prior sets the posterior scale in large BNNs (checked empirically in Appendix C).
^def-hmc-trajectory-length

- **Trajectory length ablation (Fig. 1a):** accuracy and log-likelihood improve with longer $\tau$; $\hat\tau$ performs well on accuracy, log-likelihood and ECE for CIFAR-10 and IMDB. "Despite the expense, when applying HMC to BNNs it is actually helpful to use tens of thousands of gradient evaluations per iteration" (up to $10^5$ leapfrog steps; earlier work used fewer than 100).
- **Step size $\Delta$ (ResNet-20-FRN, CIFAR-10, 50 iterations, MH correction ignored):** $\Delta=1,5,10,50\times10^{-5}$ gave mean accept probabilities of 72.2%, 46.3%, 22.2%, 12.5% and BMA log-likelihoods of $-0.331,-0.3406,-0.3407,-0.895$. Smaller steps cost proportionally more gradients because leapfrog steps $=\tau/\Delta$.
- **Number of chains (Fig. 1b):** at fixed compute, 2 or 3 chains are only slightly better than 1, so HMC is "relatively unobstructed by energy barriers" (see [[Izmailov 2021 - Mixing Diagnostics and Posterior Geometry]]).
- **Main runs:** CIFAR: 3 chains, step size $10^{-5}$, prior variance $1/5$, 70,248 leapfrog steps per sample, first 50 samples discarded as burn-in; IMDB: step $10^{-5}$, 3 chains, 50 burn-in then 400 samples per chain (1,200 total). UCI: single chain, 10 burn-in and 90 samples.

## Examples

**Applying the trajectory rule.** Prior $w\sim N(0,\alpha^2)$ with prior variance $1/5$ gives $\alpha=\sqrt{0.2}=0.447$, so $\hat\tau=\pi(0.447)/2\approx0.70$. With step $\Delta=10^{-5}$ that is about $7\times10^{4}$ leapfrog steps, consistent with the reported 70,248.

```python
import numpy as np
alpha = np.sqrt(1/5); tau_hat = np.pi*alpha/2; step = 1e-5
print(round(tau_hat,3), int(tau_hat/step))     # 0.702  70248
```
(The calculation reproduces the paper's number of leapfrog steps; checked when writing this note.)

**HMC on a small network in PyMC (sketch, untested).**
```python
with pm.Model() as bnn:
    W1 = pm.Normal("W1", 0, 1/np.sqrt(n_in),  shape=(n_in, H))
    W2 = pm.Normal("W2", 0, 1/np.sqrt(H),     shape=(H, 1))     # 1/sqrt(width) scaling
    mu = pt.dot(pt.tanh(pt.dot(X, W1)), W2).ravel()
    pm.Normal("y", mu, pm.HalfNormal("s", 1), observed=y)
    idata = pm.sample(target_accept=0.9)           # NUTS; diagnose in function space
```

## Connections

- NUTS in PyMC/Stan adapts $\tau$ automatically; the quarter-period rule is the analytic target the adaptation approaches for Gaussian-dominated posteriors. See [[HMC and Stan in Practice]], [[Efficient MCMC]], [[MCMC Basics]].
- The planetary-motion multimodality case in [[Challenge of Multimodality - Differential Equation for Planetary Motion]] shows the same issue (symmetries and multiple modes) for ODE models.

## See Also

[[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]], [[Izmailov 2021 - Cheaper Approximations versus HMC]].
