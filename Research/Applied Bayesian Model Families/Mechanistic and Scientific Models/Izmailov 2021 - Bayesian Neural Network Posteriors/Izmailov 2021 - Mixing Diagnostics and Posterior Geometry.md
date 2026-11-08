---
title: "Izmailov 2021 - Mixing Diagnostics and Posterior Geometry"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bayesian-neural-networks
  - type/theorem
  - doc/paper
source: "[[raw/Izmailov 2021 - What Are Bayesian Neural Network Posteriors Really Like.pdf]]"
source_location: "Sec. 5, pp. 4-5; Appendices B-E; Figs. 2-4, 11-12"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Izmailov 2021 - Bayesian Neural Network Posteriors"
doc_type: paper
depends_on:
  - "[[Izmailov 2021 - Full-Batch HMC for Neural Networks]]"
used_by:
  - "[[Izmailov 2021 - Predictive Performance and Domain Shift]]"
  - "[[Universal Differential Equations and Scientific ML (Concept Note)]]"
aliases:
  - function-space R-hat
  - BNN posterior geometry
  - mode connectivity and HMC
---

# Izmailov 2021 - Mixing Diagnostics and Posterior Geometry

> [!summary]
> Applying $\hat R$ to *both* weights and test-set predictions shows HMC mixes well in **function space** (about 91% of CIFAR-10 and 98% of IMDB predictive probabilities have $\hat R<1.1$) while some weight-space directions do not mix. Hence a single chain can represent the predictive distribution even though weights are not identified. This is the quantitative basis for 'diagnose a neural-network posterior in function space'.

## Overview

A weight distribution plus an architecture $f(x,w)$ induces a distribution over functions. Predictions depend on functions, not weights, so the paper checks mixing in both spaces (Sec. 5), visualizes cross-sections of the log-posterior (5.2), and checks convergence as a function of burn-in (5.3).

## Main Content

> [!definition] Potential scale reduction $\hat R$ (Gelman et al. 1992; Appendix B)
> For a scalar function $\psi$ of the chain state, with $M$ chains of $N$ iterations and $\psi_{mn}=\psi(\theta_{mn})$: $\hat R$ is the square root of an estimate of the stationary variance (combining between-chain variance $B$ and average within-chain variance $W$) divided by $W$. If chains are stuck in isolated regions, between-chain variance exceeds within-chain variance and $\hat R>1$; sampling-variability corrections ($\tfrac1M$, $\tfrac1{MN}$ terms) vanish as $N$ grows. Because $\psi$ is arbitrary, it can be computed for every weight and for every predicted softmax probability.
^def-rhat-function-space

**Results (Fig. 2).** Using the TensorFlow Probability implementation:

| Space | CIFAR-10 / ResNet-20-FRN | IMDB / CNN-LSTM |
|---|---|---|
| Function (test softmax) | bulk near 1; about 91% with $\hat R<1.1$ | about 98% with $\hat R<1.1$ (only 2% above) |
| Weight | most small, but enough parameters with very large $\hat R$ to show the chains sample different distributions in weight space | same pattern |

> [!theorem] Empirical finding: stronger mode connectivity (Sec. 5.1, a claim from experiments, not a proved theorem)
> A single HMC chain is extremely unlikely to jump between isolated modes yet produces predictions with high functional diversity. Combined with prior work on mode connectivity (Garipov et al. 2018; Draxler et al. 2018: high-density paths exist between modes), the evidence suggests that "not only do mode-connecting paths exist between functionally diverse modes, but also at least some of these paths can be leveraged by Monte Carlo methods to efficiently explore the posterior."
^thm-mode-connectivity-hmc

**Density visualizations (5.2, Fig. 3, App. D Fig. 12).** In the plane spanned by three HMC samples (iterations 1, 51, 101 after burn-in) the samples fall in seemingly isolated modes of a 2-D cross-section, i.e. a single chain explores a non-convex, multi-modal region rather than one Gaussian-like mode; popular approximations (variational, Laplace) are Gaussian-like in a single mode and would miss it. Samples from three *independent* chains give regular, more symmetric surfaces than within-chain, so chains do not mix perfectly in weight space. On IMDB the CNN-LSTM has far more parameters than data points, so the posterior log-density panels are dominated by the prior (panels nearly indistinguishable), though the likelihood still pulls the typical set; on ResNet-20 the likelihood matters more.

**Marginals (App. C, Fig. 11).** Most weights' posterior standard deviations are close to the prior scale; few are much larger. This supports the trajectory rule $\hat\tau=\pi\alpha_{\text{prior}}/2$ of [[Izmailov 2021 - Full-Batch HMC for Neural Networks]]: the prior sets the scale.

**Convergence vs burn-in (5.3, Fig. 4).** Stationarity of BMA and per-sample performance after discarding $n_{bi}$ initial samples: IMDB shows no trend (10 iterations suffice); CIFAR-10 shows a slowly rising trend that saturates near 50 iterations, the burn-in used in main experiments.

**Synthetic check (App. E).** On a synthetic regression problem, two independent HMC chains give very similar predictions, confirming mixing in prediction space.

## Examples

**Function-space $\hat R$ in practice (ArviZ sketch).** For a PyMC BNN, compute $\hat R$ on the posterior of $\mu(x_{\text{grid}})$ not on weights:
```python
import arviz as az, numpy as np
# idata: posterior with chains; mu_grid(draw) = network output on a fixed grid
mu = np.stack([forward(X_grid, w) for w in weight_draws_per_chain])   # (chain, draw, n_grid)
rhat_fn = az.rhat(az.convert_to_dataset({"mu": mu}))["mu"].values
print(np.mean(rhat_fn < 1.1))        # share of grid points that look converged
```
Pseudo-code; `forward` and `weight_draws_per_chain` are user-supplied.

**Why this matters for E11 (neural network inside an ODE).** Permutation and sign symmetries of hidden units make weight $\hat R$ large even when the learned vector field is identical across chains; report $\hat R$ on trajectories or on the learned right-hand side evaluated on a grid.

## Connections

- Standard convergence diagnostics (bulk/tail ESS, rank-normalized $\hat R$) are covered in [[HMC and Stan in Practice]] and [[MCMC Basics]]; the multimodality problem in a differential-equation model is worked in [[Challenge of Multimodality - Differential Equation for Planetary Motion]].
- Non-identified parameters but identified predictions parallels [[Posterior Predictive Checking]] logic: judge the model on observables.

## See Also

[[Izmailov 2021 - Bayesian Neural Network Posteriors - Overview]].
