---
title: "Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation"
tags:
  - source/ingested
  - topic/latent-traits
  - type/theorem
  - doc/paper
source: "[[raw/Caron and Doucet 2012 - Efficient Bayesian Inference for Generalized Bradley-Terry Models.pdf]]"
source_location: "Sec. 1-2, pp. 3-6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models"
doc_type: paper
depends_on:
  - "[[Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models - Overview]]"
used_by:
  - "[[Caron 2012 - Home Advantage, Ties and Team Comparisons]]"
  - "[[Caron 2012 - Plackett-Luce Model for Full Rankings]]"
aliases:
  - Bradley-Terry EM and Gibbs
  - BT latent Gamma augmentation
---

# Caron 2012 - Bradley-Terry Likelihood and Latent Exponential Augmentation

> [!summary]
> The Bradley-Terry model $P(i\succ j)=\lambda_i/(\lambda_i+\lambda_j)$ has a Gamma-augmented complete likelihood. Introducing $Z_{ij}$ (the sum of the minimum exponential arrival times over the $n_{ij}$ matches of a pair) gives Hunter's MM update as an EM step and a two-block Gibbs sampler with Gamma conditionals.

## Overview

Zermelo (1929) and Bradley & Terry (1952) model pairwise contests among $K$ elements with positive "skill" $\lambda_l$. With $w_{ij}$ = number of times $i$ beat $j$ and $n_{ij}=w_{ij}+w_{ji}$:

> [!definition] Bradley-Terry log-likelihood
> $$
> \ell(\lambda)=\sum_{i\ne j}w_{ij}\log\lambda_i-\sum_{i<j}n_{ij}\log(\lambda_i+\lambda_j).
> $$
> ^def-bt-loglik

The classical **Thurstonian** augmentation draws $Y_{ki}\sim\text{Exp}(\lambda_i)$ for every match and lets the smaller arrival time win: $P(Y_{ki}<Y_{kj})=\lambda_i/(\lambda_i+\lambda_j)$. Caron & Doucet instead keep only the *aggregated* minima, which reduces the fraction of missing information and so speeds EM and the sampler (Liu 2001).

## Main Content

> [!definition] Latent variables
> For each pair with $n_{ij}>0$, $Z_{ij}=\sum_{k=1}^{n_{ij}}\min(Y_{ki},Y_{kj})$, so
> $$
> p(z\mid D,\lambda)=\prod_{i<j,\,n_{ij}>0}\mathcal G(z_{ij};\,n_{ij},\,\lambda_i+\lambda_j),
> $$
> with $\mathcal G(\alpha,\beta)$ the Gamma law of shape $\alpha$ and inverse scale (rate) $\beta$.
> ^def-bt-latent-z

Complete-data log-likelihood (their Eq. 3):
$$
\ell(\lambda,z)=\sum_{i\ne j}w_{ij}\log\lambda_i-\sum_{i<j}\bigl[(\lambda_i+\lambda_j)z_{ij}-(n_{ij}-1)\log z_{ij}+\log\Gamma(n_{ij})\bigr].
$$

With the conjugate prior $p(\lambda)=\prod_i\mathcal G(\lambda_i;a,b)$ and $w_i=\sum_{j\ne i}w_{ij}$ (wins):

> [!theorem] EM / MM update for MAP
> At iteration $t$,
> $$
> \lambda_i^{(t)}=\frac{a-1+w_i}{\,b+\sum_{j\ne i}\dfrac{n_{ij}}{\lambda_i^{(t-1)}+\lambda_j^{(t-1)}}\,}.
> $$
> For $a=1,b=0$ (flat prior) the MAP equals the ML estimate and this is exactly Hunter's (2004, Eq. 10) minorizing-function update, i.e. the Zermelo iteration.
> ^thm-bt-em-update

*Proof sketch.* The E-step expectation of $Z_{ij}$ is $n_{ij}/(\lambda^*_i+\lambda^*_j)$ (mean of a Gamma). The Q-function is $\sum_i(a-1+w_i)\log\lambda_i-b\lambda_i-\sum_{i<j}(\lambda_i+\lambda_j)\,n_{ij}/(\lambda_i^*+\lambda_j^*)$ plus constants; it separates across $i$ and each term is maximised by the stated ratio.

> [!theorem] Data-augmentation (Gibbs) sampler
> Iterate: (1) $Z_{ij}^{(t)}\sim\mathcal G(n_{ij},\lambda_i^{(t-1)}+\lambda_j^{(t-1)})$ for each pair with $n_{ij}>0$; (2) $\lambda_i^{(t)}\sim\mathcal G\bigl(a+w_i,\;b+\sum_{j>i}Z_{ij}^{(t)}+\sum_{j<i}Z_{ji}^{(t)}\bigr)$.
> ^thm-bt-gibbs

No proposal tuning is needed, and every update is a standard Gamma draw.

## Examples

> [!example] Three-player toy tournament
> **Setup.** Wins: A beat B 6 times, B beat A 2 times; B beat C 5 times, C beat B 3 times; A beat C 4 times, C beat A 4 times. Flat prior ($a=1,b=0$).
> **Solution.** Run the iteration $\lambda_i\leftarrow w_i/\sum_j n_{ij}/(\lambda_i+\lambda_j)$ and normalise. It converges to $\pi\approx(0.455,0.273,0.273)$ (B and C tie: each has 8 wins in 20 games, A has 10).
> **Interpretation.** Only ratios of $\lambda$ are identified (see [[Caron 2012 - Identifiability, Hyperparameters and Further Extensions]]), so report $\pi_i=\lambda_i/\sum\lambda$ or log-ratios.
> ^ex-bt-toy

```python
import numpy as np
w = np.array([[0,6,4],[2,0,5],[4,3,0]], float)   # w[i,j]: i beat j
n = w + w.T
lam = np.ones(3)/3
for _ in range(500):
    denom = (n / (lam[:,None] + lam[None,:] + np.eye(3))).sum(1)
    lam = w.sum(1) / denom
    lam /= lam.sum()
print(lam)
```

PyMC-style sketch (untested; the logit parameterisation $\lambda_i=e^{\beta_i}$ used in E67):

```python
import pymc as pm, numpy as np
with pm.Model():
    beta = pm.Normal("beta", 0, 1, shape=K)
    beta_c = beta - beta.mean()                    # sum-to-zero identification
    pm.Binomial("wins", n=n_ij, p=pm.math.sigmoid(beta_c[i_idx]-beta_c[j_idx]), observed=w_ij)
```

## Connections

- The Bayesian log-skill model with a Gaussian prior on $\beta_i$ is the hierarchical-shrinkage analogue of the Gamma prior here ([[Hierarchical Models]]).
- Identifiability and rescaling: [[Caron 2012 - Identifiability, Hyperparameters and Further Extensions]].
- Dynamic version (skills drifting in time): [[Elo, Glicko and TrueSkill - Dynamic Skill Ratings (Concept Note)]].

## See Also

[[Caron 2012 - Bayesian Inference for Generalized Bradley-Terry Models - Overview]] · [[MCMC Basics]]
