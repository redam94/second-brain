---
title: "Chipman 2010 - Sum-of-Trees Model and Regularization Prior"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bart
  - type/definition
  - doc/paper
source: "[[raw/Chipman 2010 - BART Bayesian Additive Regression Trees.pdf]]"
source_location: "Sec. 2, pp. 269-274"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chipman 2010 - BART"
doc_type: paper
depends_on:
  - "[[Chipman 2010 - BART - Overview]]"
  - "[[Prior Predictive Checking]]"
used_by:
  - "[[Chipman 2010 - Backfitting MCMC and Posterior Inference]]"
  - "[[Chipman 2010 - Probit BART for Classification]]"
aliases:
  - BART prior
  - BART regularization prior
---

# Chipman 2010 - Sum-of-Trees Model and Regularization Prior

> [!summary]
> BART models $E(Y\mid x)$ as a sum of $m$ small trees and places an independent prior on each tree's *structure* and *leaf values* that forces every tree to be a weak learner. Three data-calibrated knobs ($\alpha,\beta$ for tree depth; $k$ for leaf shrinkage; $\nu,q$ for noise) plus $m$ define the whole prior; the defaults are $(\alpha,\beta)=(0.95,2)$, $k=2$, $(\nu,q)=(3,0.90)$, $m=200$.

## Overview

A single regression tree is a piecewise-constant function. A sum of many trees is an additive model with *multivariate* components: trees using one variable are main effects, trees splitting on several variables are interactions of varying order. The model is heavily over-parametrized ("overcomplete basis"), so the prior, not the likelihood, does most of the regularizing. This is the sense in which BART is a **prior over functions**.

## Main Content

### Single tree and sum of trees

> [!definition] Binary regression tree $(T,M)$
> $T$ is a binary tree with interior decision rules $\{x_i\le c\}$ vs $\{x_i>c\}$ and $b$ terminal nodes; $M=\{\mu_1,\dots,\mu_b\}$ are the terminal-node (leaf) parameters. $g(x;T,M)$ returns the $\mu_i$ of the terminal node that $x$ reaches. The single-tree model is $Y=g(x;T,M)+\varepsilon$, $\varepsilon\sim N(0,\sigma^2)$ (eq. 3).
^def-bart-tree

> [!definition] Sum-of-trees model
> $$Y=\sum_{j=1}^{m} g(x;T_j,M_j)+\varepsilon,\qquad \varepsilon\sim N(0,\sigma^{2}).\tag{4}$$
> Each $\mu_{ij}$ is only a part of $E(Y\mid x)$. A tree depending on one variable is a main effect; on several variables, an interaction. If every tree uses one variable the model is an additive function of step functions.
^def-bart-sum-of-trees

### Prior factorization

> [!definition] Independence and symmetry (eqs. 5-6)
> $$p\big((T_1,M_1),\dots,(T_m,M_m),\sigma\big)=\Big[\prod_j p(M_j\mid T_j)\,p(T_j)\Big]p(\sigma),\quad p(M_j\mid T_j)=\prod_i p(\mu_{ij}\mid T_j).$$
> All $p(T_j)$ share one form and all $p(\mu_{ij}\mid T_j)$ share one form, taken from the Bayesian CART prior of Chipman-George-McCulloch (1998, "CGM98").
^def-bart-prior-factorization

### Tree prior $p(T_j)$

> [!definition] Depth-penalized tree prior
> (i) A node at depth $d=0,1,2,\dots$ is nonterminal with probability
> $$\alpha(1+d)^{-\beta},\qquad \alpha\in(0,1),\ \beta\in[0,\infty).\tag{7}$$
> (ii) The splitting variable at an interior node is uniform over available variables. (iii) The splitting value is uniform over the discrete set of available split points (invariant to monotone transformations of the predictor; the authors note this is not strictly coherent).
^def-bart-tree-prior

With $\alpha=0.95,\beta=2$ the prior puts probability $0.05, 0.55, 0.28, 0.09, 0.03$ on trees with $1,2,3,4,\ge5$ terminal nodes: shallow trees dominate, but data can still grow large trees (a single-tree $m=1$ fit placed substantial posterior mass on size-17 trees in one simulated example).

```python
# Reproduce the 0.05 / 0.55 / 0.28 / 0.09 / 0.03 terminal-node probabilities
import numpy as np
from functools import lru_cache
a, b, MAXN = 0.95, 2.0, 8
p_split = lambda d: a * (1 + d) ** (-b)

@lru_cache(None)
def n_leaf_dist(d):
    ps = p_split(d)
    out = np.zeros(MAXN + 1); out[1] = 1 - ps          # stays a leaf
    if d > 12:                                          # truncate recursion
        return tuple(out)
    c = np.array(n_leaf_dist(d + 1))
    out += ps * np.convolve(c, c)[: MAXN + 1]           # splits into two independent subtrees
    return tuple(out)

pr = n_leaf_dist(0)
print(np.round(pr[1:5], 2), round(1 - sum(pr[1:5]), 2))  # [0.05 0.55 0.28 0.09] 0.03
```

### Leaf prior $p(\mu_{ij}\mid T_j)$

> [!definition] Conjugate leaf prior and its calibration
> $\mu_{ij}\sim N(\mu_\mu,\sigma_\mu^2)$, conjugate so that $\mu_{ij}$ can be integrated out. Because the $\mu_{ij}$ are a priori i.i.d., the induced prior on $E(Y\mid x)$ is $N(m\mu_\mu,\,m\sigma_\mu^2)$. Choose $\mu_\mu,\sigma_\mu$ so that this prior covers $(y_{\min},y_{\max})$:
> $$m\mu_\mu-k\sqrt m\,\sigma_\mu=y_{\min},\qquad m\mu_\mu+k\sqrt m\,\sigma_\mu=y_{\max}.$$
> Practically: rescale $y$ to $[-0.5,0.5]$, set $\mu_\mu=0$ and
> $$\mu_{ij}\sim N(0,\sigma_\mu^2),\quad \sigma_\mu=\frac{0.5}{k\sqrt m}.\tag{8}$$
> Default $k=2$ (about 95% prior probability that $E(Y\mid x)\in(y_{\min},y_{\max})$); $k\in[1,3]$ works well. Larger $k$ or larger $m$ means tighter shrinkage.
^def-bart-leaf-prior

The $1/\sqrt m$ scaling is the key: as $m$ grows, each tree's contribution shrinks, so the total prior variance of $f(x)$ stays fixed. This is the exact analogue of the learning-rate shrinkage in gradient boosting (Friedman 2001), and it is the same $1/\sqrt{\text{width}}$ argument that gives a Gaussian-process limit for wide neural networks (see [[Izmailov 2021 - Priors, Prior Predictive and Cold Posteriors]]). No predictor rescaling is needed because splits are invariant to monotone transforms (unlike neural nets).

### Noise prior $p(\sigma)$

> [!definition] Scaled inverse chi-square prior on $\sigma^2$
> $\sigma^2\sim\nu\lambda/\chi^2_\nu$. Choose $\nu\in[3,10]$ for shape, then $\lambda$ so that $P(\sigma<\hat\sigma)=q$ for a rough overestimate $\hat\sigma$ (either the sample SD of $Y$, "naive", or the residual SD of a least-squares fit, "linear model").
^def-bart-sigma-prior

Named settings (Fig. 1, $\hat\sigma=2$): conservative $(\nu,q)=(10,0.75)$, default $(3,0.90)$, aggressive $(3,0.99)$. Avoid $\nu<3$ (too much mass on tiny $\sigma$ causes overfitting). Authors admit the data-calibration sacrifices strict Bayesian coherence but intend only to keep the prior from conflicting with the data.

### Number of trees $m$

Rather than a prior on $m$ or cross-validation, the authors recommend starting at $m=200$ and checking one or two other values. Predictive accuracy improves sharply as $m$ rises from 1, plateaus, then degrades very slowly; so for prediction one only needs to avoid $m$ too small. For variable selection a *small* $m$ (10-50) is preferred (see [[Chipman 2010 - Backfitting MCMC and Posterior Inference]]).

### Hyperparameter summary

| Symbol | Role | Default | Range explored |
|---|---|---|---|
| $m$ | number of trees | 200 | 50, 200 (CV); 10-200 (selection) |
| $(\alpha,\beta)$ | tree depth penalty | (0.95, 2) | fixed |
| $k$ | leaf shrinkage, $\sigma_\mu=0.5/(k\sqrt m)$ | 2 | 1, 2, 3, 5 |
| $(\nu,q)$ | noise prior | (3, 0.90) | (3,0.90), (3,0.99), (10,0.75) |

## Examples

**Prior on the regression function.** With $m=200,k=2$ and $y$ rescaled to $[-0.5,0.5]$: $\sigma_\mu=0.5/(2\sqrt{200})\approx0.0177$, and the induced prior on $f(x)$ is $N(0,\,200\cdot0.0177^2)=N(0,0.0625)$, SD 0.25 = half-range over $k=2$. Each individual leaf is nearly negligible.

**PyMC sketch (pymc-bart, untested here).**
```python
import pymc as pm, pymc_bart as pmb
with pm.Model() as m:
    mu = pmb.BART("mu", X=X, Y=y, m=200)            # sum of 200 weak trees
    sigma = pm.HalfNormal("sigma", y.std())
    pm.Normal("y", mu=mu, sigma=sigma, observed=y)
    idata = pm.sample()                              # PGBART for trees, NUTS for sigma
```
Mark: untested sketch; `pymc-bart` uses PGBART rather than the MH moves of this paper.

## Connections

- Prior calibration to the observed $y$ range is a form of data-informed prior; compare [[Prior Predictive Checking]] and [[Constructing Priors for Effect Sizes]].
- Shrinkage-of-many-small-components is the same philosophy as [[Global-Local Shrinkage Priors]].

## See Also

[[Chipman 2010 - BART - Overview]], [[Chipman 2010 - Backfitting MCMC and Posterior Inference]], [[Gaussian Process Regression]].
