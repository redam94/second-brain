---
title: "Chipman 2010 - Probit BART for Classification"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bart
  - type/definition
  - doc/paper
source: "[[raw/Chipman 2010 - BART Bayesian Additive Regression Trees.pdf]]"
source_location: "Sec. 4, pp. 278-280"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chipman 2010 - BART"
doc_type: paper
depends_on:
  - "[[Chipman 2010 - Backfitting MCMC and Posterior Inference]]"
used_by:
  - "[[Chipman 2010 - Drug Discovery Classification and Execution Time]]"
aliases:
  - BART probit
  - BART binary outcomes
---

# Chipman 2010 - Probit BART for Classification

> [!summary]
> For binary $Y$, BART models $P(Y=1\mid x)=\Phi[G(x)]$ with $G(x)=\sum_j g(x;T_j,M_j)$, so $\sigma=1$ is fixed. Albert-Chib latent variables $Z_i\sim N(G(x_i),1)$ turn each Gibbs sweep into a continuous BART update. The leaf prior changes to $\sigma_\mu=3/(k\sqrt m)$, shrinking $p(x)$ toward 0.5.

## Overview

Instead of voting among classification trees (Amit-Geman, Breiman), BART obtains probabilities as a *smooth function of a sum of regression trees*. Only the leaf prior and one extra latent-variable step differ from the continuous case.

## Main Content

> [!definition] BART probit model (eqs. 21-22)
> $$p(x)\equiv P[Y=1\mid x]=\Phi[G(x)],\qquad G(x)=\sum_{j=1}^m g(x;T_j,M_j),$$
> with $\Phi$ the standard normal cdf. The model implicitly sets $\sigma=1$, so the prior is on $(T_j,M_j)$ only: $p((T_1,M_1),\dots,(T_m,M_m))=\prod_j p(T_j)\prod_i p(\mu_{ij}\mid T_j)$ (eq. 23).
^def-bart-probit

> [!definition] Probit leaf prior (eq. 24)
> Taking $(\Phi[-3],\Phi[3])$ as the plausible range of $p(x)$,
> $$\mu_{ij}\sim N(0,\sigma_\mu^2),\qquad \sigma_\mu=\frac{3.0}{k\sqrt m},$$
> where $k$ is such that $G(x)\in(-3,3)$ with high probability. Default $k=2$. This shrinks $G$ toward 0 and $p(x)$ toward 0.5. To shrink toward $p_0$, use $G_c=G(x)+c$ with offset $c=\Phi^{-1}[p_0]$.
^def-bart-probit-prior

> [!algorithm] Albert-Chib augmentation for BART
> Introduce $Z_1,\dots,Z_n$ independent $N(G(x_i),1)$ with $Y_i=1$ iff $Z_i>0$. Then $Z_i\mid y_i=1\sim N(G(x_i),1)$ truncated to $(0,\infty)$ (the paper writes it as $\max\{N,0\}$) and $Z_i\mid y_i=0\sim N(G(x_i),1)$ truncated to $(-\infty,0]$. One Gibbs iteration: draw $Z_i\mid y_i$ for $i=1..n$; then for $j=1..m$ draw $(T_j,M_j)\mid T_{(j)},M_{(j)},z_{1:n}$ exactly as in [[Chipman 2010 - Backfitting MCMC and Posterior Inference]], treating $z$ as the response with $\sigma=1$.
^alg-bart-probit-gibbs

The induced posterior draws $p^*(\cdot)=\Phi[\sum_j g(\cdot;T_j^*,M_j^*)]$ (eq. 25) are used exactly like the $f^*$ draws: posterior mean for predicted probability, quantile intervals, partial dependence, variable usage.

## Examples

**Latent-variable draw (SciPy).**
```python
import numpy as np
from scipy.stats import truncnorm

def draw_z(y, G):
    """Albert-Chib draw: Z_i | y_i, G(x_i)  (unit variance)."""
    lo = np.where(y == 1, -G, -np.inf)     # truncation bounds on standardized scale
    hi = np.where(y == 1, np.inf, -G)
    return G + truncnorm.rvs(lo, hi)
```

**PyMC analogue.** In PyMC one writes `p = pm.math.invlogit(pmb.BART("mu", X, Y))` with a Bernoulli likelihood (logit link) or `pm.math.probit`; the data-augmentation trick is not needed because the sampler is PGBART. Untested sketch.

## Connections

- Classification with a probit link on a flexible latent function is also the setting of Gaussian-process classification; see [[Gaussian Process Regression]].
- Predicted conversion probabilities from a flexible function for propensity or response modelling: [[Nonparametric Causal Inference]].

## See Also

[[Chipman 2010 - BART - Overview]], [[Chipman 2010 - Drug Discovery Classification and Execution Time]], [[Discrete Choice Models]].
