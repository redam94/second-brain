---
title: "De Blasi 2015 - EPPF and Predictive Structure"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/definition
  - doc/paper
source: "[[raw/De Blasi et al 2015 - Are Gibbs-Type Priors the Most Natural Generalization of the Dirichlet Process.pdf]]"
source_location: "Sec. 1.1-1.2 (Eqs. 1-12), pp. 2-7"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/De Blasi 2015 - Gibbs-Type Priors"
doc_type: paper
depends_on:
  - "[[De Blasi 2015 - Gibbs-Type Priors - Overview]]"
  - "[[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]]"
used_by:
  - "[[De Blasi 2015 - Gibbs-Type Priors Definition and Classification]]"
  - "[[De Blasi 2015 - Species Sampling and Unseen Species Prediction]]"
aliases:
  - "EPPF"
  - "exchangeable partition probability function"
  - "species sampling model"
  - "prediction rule"
---

# De Blasi 2015 - EPPF and Predictive Structure

> [!summary]
> An exchangeable sequence has a de Finetti measure $Q$ on random probability measures $\tilde p$. If $\tilde p$ is discrete, samples have ties and induce a random partition whose law is the exchangeable partition probability function (EPPF). The EPPF determines the predictive distribution by ratios; DP and PY have closed-form EPPFs.

## Main Content
**Exchangeability.** $(X_n)$ is exchangeable iff there exists $Q$ on $\mathbb P_X$ with $X_i\mid\tilde p\overset{iid}{\sim}\tilde p$, $\tilde p\sim Q$ (Eq. 1). Parametric if $Q$ lives on a finite-dimensional subspace; nonparametric if its support is infinite-dimensional. The one-step predictive equals the posterior mean $P(X_{n+1}\in\cdot\mid X_{1:n})=\int p(\cdot)Q(dp\mid X_{1:n})$ (Eq. 2).

> [!definition] Species sampling model (Pitman; terminology adopted from the paper's reference [60])
> A discrete random probability measure $\tilde p=\sum_{j\ge1}\tilde p_j\delta_{Z_j}$ (Eq. 3) with $\tilde p_j\ge0$, $\sum_j\tilde p_j=1$ a.s., $Z_j\overset{iid}{\sim}P^*$ diffuse, independent of the weights. With $\xi_n$ such that $P(\xi_n=j\mid\tilde p)=\tilde p_j$, $X_i=Z_{\xi_i}$: observations are species labels, and $P(\xi_i=\xi_j)>0$.

^def-species-sampling

> [!definition] EPPF (Eq. 5) and addition rule (Eq. 6)
> A sample of size $n$ with $K_n=k$ distinct values $X_1^*,\dots,X_k^*$ and frequencies $n_1,\dots,n_k$ has probability
> $$p_k^{(n)}(n_1,\dots,n_k)=\int_{\mathbb X^k}E\big(\tilde p^{n_1}(dx_1)\cdots\tilde p^{n_k}(dx_k)\big).$$
> It satisfies $p_k^{(n)}(n_1,\dots,n_k)=p_{k+1}^{(n+1)}(n_1,\dots,n_k,1)+\sum_{j=1}^kp_k^{(n+1)}(n_1,\dots,n_j+1,\dots,n_k)$.

^def-eppf

> [!theorem] Closed-form EPPFs and predictive distributions (Eqs. 7-11)
> Dirichlet process (parameters $\theta>0,P^*$): $p_k^{(n)}(n_1,\dots,n_k)=\dfrac{\theta^k}{(\theta)_n}\prod_{i=1}^k(n_i-1)!$, with $(\theta)_n=\theta(\theta+1)\cdots(\theta+n-1)$.
> Pitman-Yor ($\sigma\in[0,1),\theta>-\sigma$, or $\sigma<0$ with $\theta=m|\sigma|$, $m\in\mathbb N$): $p_k^{(n)}=\dfrac{\prod_{i=1}^{k-1}(\theta+i\sigma)}{(\theta+1)_{n-1}}\prod_{i=1}^k(1-\sigma)_{n_i-1}$.
> Generic: $P(X_{n+1}=\text{new}\mid X_{1:n})=\dfrac{p_{k+1}^{(n+1)}(n_1,\dots,n_k,1)}{p_k^{(n)}(n_1,\dots,n_k)}$ and
> $$P(X_{n+1}\in\cdot\mid X_{1:n})=\frac{p_{k+1}^{(n+1)}(n_1,..,n_k,1)}{p_k^{(n)}(n_1,..,n_k)}P^*(\cdot)+\sum_{j=1}^k\frac{p_k^{(n+1)}(n_1,..,n_j+1,..,n_k)}{p_k^{(n)}(n_1,..,n_k)}\delta_{X_j^*}(\cdot).$$
> PY: $P(\text{new})=\frac{\theta+\sigma k}{\theta+n}$ and $P(X_{n+1}\in\cdot\mid X_{1:n})=\frac{\theta+\sigma k}{\theta+n}P^*+\frac1{\theta+n}\sum_{j=1}^k(n_j-\sigma)\delta_{X_j^*}$; $\sigma=0$ recovers the DP/CRP.

^thm-eppf-closed-forms

The addition rule guarantees the predictive probabilities sum to one.

**Applications (1.2).** *Species sampling*: with an observed sample of labels one may want the number of new distinct species in an additional sample of size $m$, the number of species with a given frequency or below a threshold, and the probability that the next draw has a species of frequency $\ell$. *Mixtures*: $Y_i\mid X_i\sim f(\cdot\mid X_i)$, $X_i\mid\tilde p\sim\tilde p$, $\tilde p\sim Q$ (Eq. 12); with $\tilde p$ a DP this is Lo's DP mixture; $K_n$ in the latent $X$'s is the number of clusters.

## Examples
> [!example] Numerically verify the PY EPPF sums to one
> For $n=5$, $\sigma=0.4$, $\theta=1.3$: summing the EPPF over all 52 set partitions of $[5]$ gives 1 (brute-force check, as in E30).

^ex-eppf-sums-to-one

```python
import numpy as np
from scipy.special import gammaln
def lrise(x, m): return gammaln(x + m) - gammaln(x)       # log (x)_m

def log_eppf_py(sizes, sigma, theta):
    k, n = len(sizes), sum(sizes)
    return (np.log(theta + sigma*np.arange(1, k)).sum() - lrise(theta + 1, n - 1)
            + sum(lrise(1 - sigma, s - 1) for s in sizes))

def partitions(n):
    def rec(i, blocks):
        if i == n: yield [len(b) for b in blocks]; return
        for b in blocks:
            b.append(i); yield from rec(i + 1, blocks); b.pop()
        blocks.append([i]); yield from rec(i + 1, blocks); blocks.pop()
    yield from rec(0, [])

print(sum(np.exp(log_eppf_py(p, 0.4, 1.3)) for p in partitions(5)))   # 1.0000000000000009
```

## PyMC-style sketch (untested; the E30 "no latent assignments" idea)
```python
import pymc as pm, pytensor.tensor as pt
# Mi[i-1] = number of species seen exactly i times; n = sum(i*Mi), k = sum(Mi)
with pm.Model():
    sigma = pm.Beta("sigma", 1, 1)                     # discount in [0,1)
    theta = pm.Gamma("theta", 2, 0.1)                  # concentration > -sigma
    lrise = lambda x, m: pt.gammaln(x + m) - pt.gammaln(x)
    i = pt.arange(1, k)                                # product over i = 1..k-1
    logp = (pt.log(theta + sigma * i).sum() - lrise(theta + 1, n - 1)
            + (Mi * lrise(1 - sigma, np.arange(Mi.size))).sum())   # (1-sigma)_{i-1}
    pm.Potential("eppf", logp)                         # NUTS on (sigma, theta) only
```

## Connections
[[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]] (DP case with proof of the number of clusters); IBP derivation by limits: [[Griffiths 2011 - Infinite Mixtures and the CRP Review]].

## See Also
[[De Blasi 2015 - Gibbs-Type Priors - Overview]]
