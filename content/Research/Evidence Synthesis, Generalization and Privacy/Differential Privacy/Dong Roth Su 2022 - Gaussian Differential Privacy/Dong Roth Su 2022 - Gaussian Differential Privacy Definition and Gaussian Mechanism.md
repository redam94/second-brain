---
title: "Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/definition
  - doc/paper
source: "[[raw/Dong Roth Su 2022 - Gaussian Differential Privacy.pdf]]"
source_location: "Sec. 2.2, Definition 2.6, Theorem 2.7, Eqs. (6)-(7), Figure 3 (right), pp. 8-9"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dong Roth Su 2022 - Gaussian Differential Privacy"
doc_type: paper
depends_on:
  - "[[Dong Roth Su 2022 - Trade-off Functions and f-DP]]"
used_by:
  - "[[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]]"
  - "[[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]]"
aliases:
  - Gaussian differential privacy
  - mu-GDP
  - GDP Gaussian mechanism
---

# Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism

> [!summary]
> $\mu$-GDP is $f$-DP with $f=G_\mu=T(\mathcal N(0,1),\mathcal N(\mu,1))$, $G_\mu(\alpha)=\Phi(\Phi^{-1}(1-\alpha)-\mu)$. It is one real parameter, interpretable ($\mu\le0.5$ reasonably private; $\mu\ge6$ almost nothing promised), and **exactly** characterizes the Gaussian mechanism: adding $\mathcal N(0,\text{sens}(\theta)^2/\mu^2)$ noise to a statistic is $\mu$-GDP, and the bound is pointwise tight.

## Overview

GDP is the privacy analogue of the Gaussian distribution among probability distributions: the central limit theorems of Section 3 show that $f$-DP converges to GDP under composition ([[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]]). It also precisely describes the most fundamental DP building block, Gaussian noise addition.

## Main Content

> [!definition] Gaussian trade-off function
> $$
> G_\mu\triangleq T\big(\mathcal N(0,1),\mathcal N(\mu,1)\big),\qquad G_\mu(\alpha)=\Phi\big(\Phi^{-1}(1-\alpha)-\mu\big),\quad\mu\ge0,
> $$
> where $\Phi$ is the standard normal CDF. $G_\mu$ is decreasing in $\mu$: $G_\mu\le G_{\mu'}$ if $\mu\ge\mu'$. (Eq. 6 is proved in Appendix A via the Neyman-Pearson test: reject when the single observation exceeds a threshold.)
^def-gaussian-tradeoff

> [!definition] Definition 2.6 ($\mu$-GDP)
> A mechanism $M$ satisfies **$\mu$-Gaussian differential privacy** if it is $G_\mu$-DP: $T(M(S),M(S'))\ge G_\mu$ for all neighboring $S,S'$.
^def-mu-gdp

Interpretation: telling neighbors apart from the output is at least as hard as telling $\mathcal N(0,1)$ from $\mathcal N(\mu,1)$ from one draw. The right panel of Figure 3 plots $G_{0.5},G_1,G_3,G_6$: $\mu=0.5$ is reasonably private, $\mu=1$ borderline, $\mu=3$ basically non-private (an adversary can hold type I and type II errors simultaneously at about 0.07), and for $\mu=6$ both errors can be as small as 0.001.

> [!theorem] Theorem 2.7 (Gaussian mechanism)
> For a statistic $\theta$ with sensitivity $\text{sens}(\theta)=\sup_{S,S'\text{ neighbors}}|\theta(S)-\theta(S')|$, the Gaussian mechanism $M(S)=\theta(S)+\xi$ with $\xi\sim\mathcal N(0,\text{sens}(\theta)^2/\mu^2)$ is $\mu$-GDP.
^thm-gaussian-mechanism-gdp

*Proof.* $M(S),M(S')$ are normal with means $\theta(S),\theta(S')$ and common variance $\sigma^2=\text{sens}(\theta)^2/\mu^2$, so $T(M(S),M(S'))=T(\mathcal N(\theta(S),\sigma^2),\mathcal N(\theta(S'),\sigma^2))=G_{|\theta(S)-\theta(S')|/\sigma}\ge G_\mu$ because $|\theta(S)-\theta(S')|/\sigma\le\text{sens}(\theta)/\sigma=\mu$.

**Tightness.** GDP gives the tightest possible bound for the Gaussian mechanism:
$$
G_\mu(\alpha)=\inf_{\text{neighboring }S,S'}T\big(M(S),M(S')\big)(\alpha),
$$
with the infimum (asymptotically) achieved at neighbors with $|\theta(S)-\theta(S')|=\text{sens}(\theta)$ irrespective of $\alpha$. The right-hand side need not be convex in general (so not a trade-off function), but for the Gaussian this works because of log-concavity of the Gaussian (Proposition A.3).

The parameterization is such that the noise multiplier is $\sigma_{\text{mult}}=1/\mu$ (noise standard deviation = sensitivity $\times\ 1/\mu$).

> [!theorem] Relation to $(\varepsilon,\delta)$ and Renyi DP
> $\mu$-GDP is equivalent to the collection of $(\varepsilon,\delta(\varepsilon))$-DP guarantees with $\delta(\varepsilon)=\Phi(-\varepsilon/\mu+\mu/2)-e^{\varepsilon}\Phi(-\varepsilon/\mu-\mu/2)$ for all $\varepsilon\ge0$ (Corollary 2.13, see [[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]]), and implies $(\alpha,\mu^2\alpha/2)$-RDP for all $\alpha>1$ (Corollary B.6, see [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]]). With zCDP, $\rho=\mu^2/2$ (a direct reading of $\alpha\mu^2/2=\rho\alpha$).
^thm-gdp-relations

## Examples

> [!example] Choosing noise for a target GDP level
> Setup: release a count with sensitivity 1 (one person changes it by at most 1) with $\mu=0.5$.
> Solution: noise standard deviation $=1/0.5=2$. From Corollary 2.13: $\delta(\varepsilon=1)=\Phi(-2+0.25)-e\,\Phi(-2-0.25)=0.00683$, so the release is $(1,0.0068)$-DP; at $\delta=10^{-5}$ the implied $\varepsilon\approx1.99$ (recomputed).
> Interpretation: a single parameter $\mu$ conveys the entire family of $(\varepsilon,\delta)$ guarantees. The Gaussian mechanism with $\sigma=2$ is thus "reasonably private" in the paper's terminology.
^ex-gdp-noise

```python
import numpy as np
from scipy.stats import norm
from scipy.optimize import brentq

def G(mu, alpha):                       # Gaussian trade-off function
    return norm.cdf(norm.ppf(1 - alpha) - mu)

def gdp_delta(mu, eps):                 # Corollary 2.13
    return norm.cdf(-eps / mu + mu / 2) - np.exp(eps) * norm.cdf(-eps / mu - mu / 2)

def gdp_eps(mu, delta):                 # smallest eps with delta(eps) = delta
    return brentq(lambda e: gdp_delta(mu, e) - delta, 0, 100)

print(G(1.0, 0.05))                     # 0.7405: type II error at 5% type I error
print(gdp_delta(0.5, 1.0), gdp_eps(0.5, 1e-5))   # 0.00683, about 1.99
for mu in (0.5, 1, 3, 6):               # equal-error point alpha = beta: Phi(-mu/2)
    print(mu, norm.cdf(-mu / 2))        # 0.401, 0.309, 0.067, 0.00135
```

## Connections

- Gaussian mechanism in $(\varepsilon,\delta)$ language: [[Abadi 2016 - DP Background and Gaussian Mechanism]]; in RDP language: [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]] (there the same noise gives $\alpha/(2\sigma^2)$, matching $\mu=1/\sigma$).
- zCDP and the discrete Gaussian used by the census: [[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]].
- Gaussian algebra background: [[Gaussian Distributions and Algebra]].

## See Also

- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]
- [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]]
