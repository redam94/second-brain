---
title: "Teh 2010 - Stick-Breaking Construction"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/theorem
  - doc/paper
source: "[[raw/Teh 2010 - Dirichlet Process.pdf]]"
source_location: "Stick-breaking Construction (Eq. 13), p. 8"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Teh 2010 - Dirichlet Process"
doc_type: paper
depends_on:
  - "[[Teh 2010 - DP Definition and Posterior Conjugacy]]"
used_by:
  - "[[Teh 2010 - DP Mixture Models and Applications]]"
  - "[[Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process]]"
aliases:
  - "Sethuraman construction"
  - "GEM distribution"
  - "stick-breaking weights"
---

# Teh 2010 - Stick-Breaking Construction

> [!summary]
> Sethuraman's construction writes $G=\sum_{k\ge1}\pi_k\delta_{\theta_k^*}$ with $\pi_k=\beta_k\prod_{l<k}(1-\beta_l)$, $\beta_k\sim\text{Beta}(1,\alpha)$, $\theta_k^*\sim H$. It is the basis of truncated samplers and variational methods, and the target of the truncation check in practical DP mixtures.

## Main Content

> [!theorem] Stick-breaking representation (Sethuraman 1994; Teh Eq. 13)
> $$\beta_k\overset{iid}{\sim}\text{Beta}(1,\alpha),\quad\theta_k^*\overset{iid}{\sim}H,\quad\pi_k=\beta_k\prod_{l=1}^{k-1}(1-\beta_l),\quad G=\sum_{k=1}^\infty\pi_k\delta_{\theta_k^*}.$$
> Then $G\sim\text{DP}(\alpha,H)$. The law of $\pi$ is $\text{GEM}(\alpha)$ (Griffiths-Engen-McCloskey).

^thm-stick-breaking

Intuition: start with a unit stick, break at $\beta_1$, give the left piece to atom 1, then recursively break the remainder. The advantages over earlier existence proofs: it is direct, needs no regularity on $\Theta$ or $H$, and suggests novel inference.

**Properties used in practice.**
- $\mathbb E[\pi_k]=\frac{1}{1+\alpha}\big(\frac{\alpha}{1+\alpha}\big)^{k-1}$, geometric decay, so weights decrease exponentially. Small $\alpha$ puts most mass on few atoms; large $\alpha$ spreads mass.
- Truncation at $K$ sticks sets $\beta_K=1$; truncation error after $K$ sticks is $\prod_{l\le K}(1-\beta_l)$ with mean $(\alpha/(1+\alpha))^K$ (leftover mass). A truncation is adequate when the leftover mass is negligible, which can be checked a posteriori.
- Ordering by size is only stochastic; atoms are labelled by index, which creates label switching in posteriors ([[Concept - Label Switching and Label-Invariant Summaries]]).

## Examples
> [!example] How many sticks are needed?
> For $\alpha=2$ and a leftover-mass tolerance of $10^{-3}$: $(2/3)^K<10^{-3}\Rightarrow K>17.0$, so $K=18$ sticks. For $\alpha=10$: $(10/11)^K<10^{-3}\Rightarrow K>72.5$, so $K=73$.

^ex-truncation-level

```python
import numpy as np
rng = np.random.default_rng(0)
def gem(alpha, K):
    b = rng.beta(1, alpha, K)
    return b * np.concatenate([[1], np.cumprod(1 - b)[:-1]])
w = gem(2.0, 50)
print(w.sum(), w[:3])          # ~1, then decreasing weights
print(np.ceil(np.log(1e-3) / np.log(2/3)))  # 17 -> use 18
```

## PyMC-style sketch (untested, PyMC 5)
```python
import pymc as pm, pytensor.tensor as pt
K = 20
with pm.Model() as m:
    alpha = pm.Gamma("alpha", 1.0, 1.0)
    w = pm.StickBreakingWeights("w", alpha=alpha, K=K - 1)   # length K, sums to 1
    mu = pm.Normal("mu", 0, 10, shape=K)
    sd = pm.HalfNormal("sd", 5, shape=K)
    pm.NormalMixture("y", w=w, mu=mu, sigma=sd, observed=y)
# diagnostics: leftover mass, label-invariant summaries (co-clustering), not component labels
```

## Connections
DP mixtures and sampling: [[Teh 2010 - DP Mixture Models and Applications]]. The IBP has an analogous stick-breaking form with $\pi_k=\prod_{l\le k}\beta_l$: [[Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process]]. Mean-field VI on the stick-breaking parameterisation: [[Mean-Field Family and Coordinate Ascent VI (CAVI)]].

## See Also
[[Teh 2010 - Dirichlet Process - Overview]]
