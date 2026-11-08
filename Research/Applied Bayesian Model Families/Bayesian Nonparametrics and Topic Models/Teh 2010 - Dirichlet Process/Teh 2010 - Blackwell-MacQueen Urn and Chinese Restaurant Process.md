---
title: "Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/theorem
  - doc/paper
source: "[[raw/Teh 2010 - Dirichlet Process.pdf]]"
source_location: "Predictive Distribution, Clustering and CRP (Eqs. 5-12), pp. 5-8"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Teh 2010 - Dirichlet Process"
doc_type: paper
depends_on:
  - "[[Teh 2010 - DP Definition and Posterior Conjugacy]]"
used_by:
  - "[[Teh 2010 - DP Mixture Models and Applications]]"
  - "[[De Blasi 2015 - EPPF and Predictive Structure]]"
  - "[[Griffiths 2011 - Infinite Mixtures and the CRP Review]]"
aliases:
  - "Blackwell-MacQueen urn"
  - "Chinese restaurant process"
  - "CRP number of clusters"
---

# Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process

> [!summary]
> Integrating out $G$ gives a Polya-urn predictive rule for $\theta_{n+1}$ and, on the induced partition of $[n]$, the Chinese restaurant process. New-cluster probability at step $i$ is $\alpha/(\alpha+i-1)$, so the expected number of clusters is $\alpha(\psi(\alpha+n)-\psi(\alpha))\sim\alpha\log n$.

## Overview
Because DP posteriors are DPs, the marginal predictive of a new draw is available in closed form. This also gives the clustering behaviour exploited by DP mixture samplers.

## Main Content

> [!theorem] Blackwell-MacQueen predictive (Teh Eqs. 5-6)
> $$\theta_{n+1}\mid\theta_{1:n}\sim\frac{1}{\alpha+n}\Big(\alpha H+\sum_{i=1}^n\delta_{\theta_i}\Big)
> =\frac{1}{\alpha+n}\Big(\alpha H+\sum_{k=1}^m n_k\delta_{\theta_k^*}\Big)$$
> where $\theta_1^*,\dots,\theta_m^*$ are the distinct values and $n_k$ their counts (Eq. 10).

^thm-bm-urn

*Urn metaphor.* Colours are values in $\Theta$. With probability $\alpha/(\alpha+n)$ draw a new colour from $H$, paint a ball and drop it in; with probability $n/(\alpha+n)$ pull a random ball, paint a new ball the same colour and return both. Existence proof: the product $P(\theta_{1:n})=\prod_i P(\theta_i\mid\theta_{1:i-1})$ is infinitely exchangeable (permutation invariance, Eq. 8), so de Finetti (Eq. 9) yields a random $G$, namely the DP.

> [!theorem] Chinese restaurant process
> If $H$ is smooth, ties among $\theta_1,\dots,\theta_n$ induce a random partition of $[n]$. Sequentially, customer $n+1$ joins existing table $k$ with probability $n_k/(\alpha+n)$ and opens a new table with probability $\alpha/(\alpha+n)$. The partition probability is exchangeable.

^thm-crp

*Rich-gets-richer*: large clusters grow faster. Round tables also encode a distribution over permutations (each table a cycle). The law first appeared in population genetics as the Ewens sampling formula (1972); the name CRP is due to Dubins and Pitman.

> [!theorem] Number of clusters (Teh Eqs. 11-12)
> Let $m$ be the number of occupied tables among $n$ customers. New table at step $i$ occurs independently with probability $\alpha/(\alpha+i-1)$, so
> $$\mathbb E[m\mid n]=\sum_{i=1}^n\frac{\alpha}{\alpha+i-1}=\alpha\{\psi(\alpha+n)-\psi(\alpha)\}\approx\alpha\log\!\Big(1+\frac n\alpha\Big),$$
> $$\mathbb V[m\mid n]=\alpha\{\psi(\alpha+n)-\psi(\alpha)\}+\alpha^2\{\psi'(\alpha+n)-\psi'(\alpha)\}\approx\alpha\log\!\Big(1+\frac n\alpha\Big).$$

^thm-crp-num-clusters

Proof: $m=\sum_i\mathbf 1\{\text{new at }i\}$, a sum of independent Bernoullis with $p_i=\alpha/(\alpha+i-1)$; mean and variance follow, and $\sum_i p_i$ is a digamma difference. (The variance expression is $\sum p_i(1-p_i)$.)

## Examples
> [!example] Prior on K for 100 customers
> $\alpha=1,n=100$: $\mathbb E[m]=\psi(101)-\psi(1)=5.19$. $\alpha=5$: $5\{\psi(105)-\psi(5)\}\approx 15.7$. A quick simulation (below) reproduces 5.2 for $\alpha=1$. This is the "implied prior on the number of clusters" examined in E26.

^ex-crp-k-prior

```python
import numpy as np
from scipy.special import digamma
rng = np.random.default_rng(0)

def crp(n, a):
    counts = []
    for _ in range(n):
        p = np.array(counts + [a], float); p /= p.sum()
        k = rng.choice(len(p), p=p)
        counts.append(1) if k == len(counts) else counts.__setitem__(k, counts[k] + 1)
    return counts

a, n = 1.0, 100
print(a * (digamma(a + n) - digamma(a)))              # 5.19
print(np.mean([len(crp(n, a)) for _ in range(300)]))  # ~5.2
```

## PyMC-style sketch (untested)
```python
# CRP prior on K is implicit; with a truncated stick-breaking DP see
# the Stick-Breaking Construction note. To put a prior on alpha:
# alpha = pm.Gamma("alpha", 1.0, 1.0)  # then E[K | n, alpha] = alpha * (digamma(alpha+n)-digamma(alpha))
```

## Connections
EPPF form $p(n_1,\dots,n_k)=\alpha^k\prod(n_j-1)!/(\alpha)_n$ and its two-parameter generalisation: [[De Blasi 2015 - EPPF and Predictive Structure]]. CRP as the exchangeable partition law behind IBP's derivation: [[Griffiths 2011 - Infinite Mixtures and the CRP Review]].

## See Also
[[Teh 2010 - Stick-Breaking Construction]], [[Teh 2010 - Dirichlet Process - Overview]]
