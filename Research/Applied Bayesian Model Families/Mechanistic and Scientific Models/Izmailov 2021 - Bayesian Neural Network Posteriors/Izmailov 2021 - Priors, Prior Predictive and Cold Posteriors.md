---
title: "Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bayesian-neural-networks
  - type/theorem
  - doc/paper
source: "[[raw/Izmailov 2021 - What Are Bayesian Neural Network Posteriors Really Like.pdf]]"
source_location: "Sec. 7-8, pp. 7-8; Fig. 8-9; Table 2; Appendix G"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Izmailov 2021 - Bayesian Neural Network Posteriors"
doc_type: paper
depends_on:
  - "[[Izmailov 2021 - Full-Batch HMC for Neural Networks]]"
  - "[[Prior Predictive Checking]]"
used_by:
  - "[[Izmailov 2021 - Cheaper Approximations versus HMC]]"
  - "[[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]]"
aliases:
  - cold posterior effect
  - priors over functions for neural networks
  - weight priors and architecture
---

# Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors

> [!summary]
> Two claims. (1) At temperature $T=1$ the BNN posterior is already near-optimal; the 'cold posterior effect' reported by Wenzel et al. (2020) disappears when data augmentation is turned off, so the paper identifies augmentation as its key cause. (2) BMA performance is flat across a wide range of Gaussian prior scales and similar for mixture-of-Gaussian and logistic priors; what matters is the **architecture**, which together with $p(w)$ defines the prior over functions.

## Overview

The Bayesian literature on neural nets has worried that vague Gaussian priors $N(0,\alpha^2I)$ are 'bad' (Wenzel et al. 2020; Tran et al. 2020 propose GP-inspired priors; Fortuin et al. 2021 explore alternatives). Wilson & Izmailov (2020) argue vague Gaussian priors in weight space induce useful function-space priors. This note records the paper's experiments on both questions.

## Main Content

### Cold posteriors (Sec. 7)

> [!definition] Tempered posterior
> $$p_T(w\mid\mathcal D)\propto\big(p(\mathcal D\mid w)\,p(w)\big)^{1/T}$$
> (the paper writes the temperature on the full posterior; at $T=1$ this is the Bayes posterior, $T<1$ is a *cold* posterior sharper than Bayes, $T>1$ is *warm*).
^def-tempered-posterior

**Wenzel et al. (2020)** claim BNNs need $T<1$ and that $T=1$ is worse than a single SGD model, illustrated with ResNet-20 on CIFAR-10 and CNN-LSTM on IMDB.

**Tests in this paper.**
- IMDB, CNN-LSTM, $T\in\{0.03,0.1,0.3,1,3,10\}$ (single chain, 40 samples after 10 burn-in; step sizes $3\cdot10^{-7}$ to $5\cdot10^{-5}$ chosen to keep acceptance near 100%; prior variance 1/50 to cut leapfrog steps; float64 needed at low temperature). **Result (Fig. 8):** for log-likelihood and accuracy $T=1$ is optimal; for ECE colder posteriors give a slight gain; at $T=1$ BNN beats the SGD baseline and a deep ensemble of 10 on all three metrics.
- CIFAR-10 / ResNet-20: it is apparent from Wenzel et al.'s own Appendix K, Fig. 28 that results at $T=1$ are near-optimal once data augmentation is off and batch norm is replaced by FRN. Using Wenzel et al.'s code, the authors find data augmentation is the key factor driving the effect; batch norm has little influence. Without augmentation, no cold-posterior effect.
- Decreasing temperature does improve robustness to input noise (CIFAR-10-C), see [[Izmailov 2021 - Predictive Performance and Domain Shift]].

> [!note] Interpretation (paper's reasoning)
> Data augmentation effectively increases the observed data, so it should raise posterior contraction; naively applying it without adjusting the likelihood is a misspecified model, and lowering $T$ can compensate. Wilson & Izmailov (2020) add that tempering is not necessarily at odds with Bayesian principles. The authors leave a full treatment to future work.

### Priors (Sec. 8)

**8.1 Gaussian prior scale (Fig. 9).** Priors $N(0,\alpha^2I)$, varying $\alpha^2$, with short chains (40 samples, so absolute numbers are worse than Sec. 6). Too small a prior variance over-regularizes and hurts; too large hurts little. Across all scales the BNN beats SGD with the same architecture. *Why robust to large variance?* A large weight variance is a prior belief that the true classifier is confident; because networks can fit the training data, the likelihood does not overrule it and the posterior concentrates on confident classifiers, and past a point more variance saturates the output probabilities. An ensemble of overconfident experts can still be calibrated (App. Fig. 16 shows test points with component-probabilities near 0 and 1).

**8.2 Non-Gaussian priors (Table 2; IMDB, 80 samples from one chain each).** Logistic prior and a two-component zero-mean mixture of Gaussians (MoG) vs Gaussian: the heavier-tailed logistic prior is slightly better; MoG and Gaussian are similar. (Exact entries are in Table 2 of the paper; qualitative ordering as stated by the authors.)

> [!theorem] Architecture matters more than the weight prior (Sec. 8.3, paper's conclusion)
> The prior that matters is the **prior over functions** $p(f(x))$ induced by $p(w)$ and the architecture $f(x,w)$. A vague prior over parameters is not necessarily vague in function space. The details of $p(w)$ have only a minor effect, while the architecture clearly matters.
^thm-architecture-function-prior

## Examples

**Why $1/\sqrt{\text{width}}$ scaling gives a GP limit (Neal 1996; background, not in the paper).** For $f(x)=\sum_{h=1}^H v_h\,\phi(w_hx+b_h)$ with $v_h\sim N(0,\sigma_v^2/H)$, the central limit theorem makes $f(x)$ Gaussian as $H\to\infty$ with a fixed covariance kernel, so the function-space prior does not blow up with width. Verified numerically:

```python
import numpy as np
from scipy.stats import kurtosis
rng = np.random.default_rng(1); x = np.linspace(-2, 2, 5)
def draw(H, n=4000):
    w, b = rng.normal(size=(n,H)), rng.normal(size=(n,H))
    v = rng.normal(size=(n,H)) / np.sqrt(H)
    return (v[:,:,None] * np.tanh(w[:,:,None]*x + b[:,:,None])).sum(1)
for H in (1, 10, 1000):
    f = draw(H)
    print(H, np.round(f.var(0)[:3], 3), np.round(kurtosis(f[:, 2]), 2))
# variance stays ~0.65/0.50/0.38 for all H; excess kurtosis 1.66 -> 0.27 -> -0.17 (about 0, Gaussian)
```

**Prior predictive check for a PyMC BNN.** Draw weights from the prior, push a grid of $x$ through the network, and plot 50 functions; adjust $\alpha$ (or 1/sqrt width) until the functions have plausible amplitude and wiggliness. This is the practical way to set priors in function space; see [[Prior Predictive Checking]].

## Connections

- BART's priors ($\sigma_\mu=0.5/(k\sqrt m)$, depth penalty) are a deliberately designed function-space prior: [[Chipman 2010 - Sum-of-Trees Model and Regularization Prior]].
- The Gaussian-process view of infinite-width nets: [[Gaussian Process Regression]], [[Hilbert Space Gaussian Processes]].
- Likelihood vs prior influence and misspecification: [[Influence of Likelihood and Prior]], [[Tail Behavior and Prior-Likelihood Conflict]].

## See Also

[[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]].
