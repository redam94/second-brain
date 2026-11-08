---
title: "Dwork 2006 - Low-Sensitivity Functions and Applications"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/example
  - doc/paper
source: "[[raw/Dwork 2006 - Calibrating Noise to Sensitivity in Private Data Analysis.pdf]]"
source_location: "Sec. 3.2 Some Useful Insensitive Functions, incl. Lemma 3.5, pp. 34-36"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork 2006 - Calibrating Noise to Sensitivity"
doc_type: paper
depends_on:
  - "[[Dwork 2006 - Sensitivity and the Laplace Mechanism]]"
used_by:
  - "[[Dwork 2006 - Sensitivity in General Metric Spaces]]"
aliases:
  - Insensitive functions (DMNS 2006)
  - Private mean and covariance (DMNS 2006)
  - Low sample complexity implies low sensitivity
---

# Dwork 2006 - Low-Sensitivity Functions and Applications

> [!summary]
> Four families of functions have small $\ell_1$ sensitivity independent of output dimension: disjoint analyses (histograms, contingency tables), distance from a property, mean and covariance (via a $3\varepsilon$-DP ratio-of-sums mechanism), and functions approximable from a random subsample (Lemma 3.5: $S(f)\le2\sigma$). The resulting noise is $O(1)$ where Blum et al. (2005) needed $\sqrt d$ or $d$ times more.

## Overview

"In many cases, the sensitivity-based approach presented here permits the introduction of far less distortion than suggested by previous frameworks (Blum et al. 2005), while ensuring a cleaner notion of privacy." Each item below computes $S(f)$ and then invokes [[Dwork 2006 - Sensitivity and the Laplace Mechanism|Prop. 3.3]].

## Main Content

### Disjoint analyses (p. 34)

Let $D$ be partitioned into $d$ regions $B_1,\dots,B_d$ and $f=(f_1,\dots,f_d)$ where $f(x)_i$ depends only on $x\cap B_i$. If $x'$ is a neighbour obtained by adding or removing one entry, then $f(x)_i\ne f(x')_i$ for at most one $i$, so

> [!theorem] Sensitivity of disjoint analyses
> $S(f)\le\max_i S(f_i)$, independent of the output dimension $d$.
^thm-disjoint-sensitivity

For a histogram ($f_i=$ count, $S=1$) apply the Laplace mechanism with $\lambda=1/\varepsilon$ to each count independently. In Blum et al. (2005) the noise has expected magnitude $\Theta(\sqrt d/\varepsilon)$, a significant factor "in applications where the number of regions $d$ exceeds the number $n$ of data points - which is often the case with contingency tables".

### Distance from a property (p. 34)

> [!definition] Distance from a property
> A *property* is a subset $S\subseteq D^*$. The distance $f_S(x)$ is the cardinality of the symmetric difference between $x$ and its nearest point $x'\in S$, that is, the minimum number of insertions and removals that bring $x$ into $S$. Example: how many points must be changed for a clustering of at least a given quality to exist. For any $S$, $f_S$ has sensitivity at most $1$.
^def-distance-from-property

(One edit to $x$ changes the distance to $S$ by at most one, by the triangle inequality.)

### Mean and covariance (pp. 34-35)

> [!example] Example - differentially private mean and covariance
> **Setup.** $v:D\to\mathbb{R}^d$ maps rows to column vectors with $\gamma=\max_{x\in D}\|v(x)\|_1$. Define $\mu(x)=\frac1{|x|}\sum_i v(x_i)$ and $C(x)=\frac1{|x|}\sum_i v(x_i)v(x_i)^{T}-\mu\mu^{T}$.
>
> **Sensitivities.** $\mathrm{COUNT}$ has $S=1$; $\mathrm{SUM}_v$ has $S\le\gamma$; viewing $v(x)v(x)^T$ as a $d^2$-vector, $\|v(x)v(x)^T\|_1\le\gamma^2$, so $S(\mathrm{SUM}_{vv^T})\le\gamma^2$.
>
> **Mechanism $\mathcal{M}(x)$** (with $\mathrm{Lap}(b)^m$ a vector of $m$ i.i.d. draws):
> 1. $\tilde n=\mathrm{COUNT}(x)+\mathrm{Lap}(1/\varepsilon)$
> 2. $\tilde s=\mathrm{SUM}_v(x)+\mathrm{Lap}(\gamma/\varepsilon)^{d}$
> 3. $\tilde c=\mathrm{SUM}_{vv^T}(x)+\mathrm{Lap}(\gamma^2/\varepsilon)^{d^2}$
> 4. Output $\tilde\mu=\tilde s/\tilde n$ and $\tilde C=\tilde c/\tilde n-\tilde s\tilde s^T/\tilde n^2$.
>
> **Privacy.** The three noisy releases are each $\varepsilon$-DP, so the mechanism is **$3\varepsilon$-DP** by composition; the outputs are post-processing.
>
> **Improvement.** Blum et al. add noise proportional to $\sqrt{\#\text{queries}}$: $\gamma\sqrt d$ in each of $d$ coordinates of $\mathrm{SUM}_v$ and $\gamma^2d$ in each of $d^2$ coordinates of $\mathrm{SUM}_{vv^T}$. Treating coordinates jointly improves the noise by factors of $\sqrt d$ and $d$ respectively, "while also providing a stronger privacy guarantee".
^ex-private-mean-covariance

### Functions with low sample complexity (pp. 35-36)

> [!theorem] Lemma 3.5 - sampling implies low sensitivity (p. 35)
> Let $f:D^*\to\mathbb{R}^d$. Suppose there is a randomized algorithm $A$ such that for every dataset $x$: (1) $A$ operates on a subsample $\tilde x$ of $x$ in which each element of $x$ appears with probability at most $\alpha$; and (2) $\|A(x)-f(x)\|_1\le\sigma$ with probability at least $\beta>\frac{1+\alpha}{2}$. Then $S(f)\le2\sigma$.
^thm-sample-complexity-sensitivity

> [!proof]- Proof (p. 36)
> For $i\in[|x|]$ let $A(x)_{-i}$ be the output distribution conditioned on $x_i$ being excluded from the subsample. By conditional probability, the probability that $A(x)_{-i}$ is within $\sigma$ of $f(x)$ exceeds $(\beta-\alpha)/(1-\alpha)\ge\frac12$. Let $x'=x\setminus\{x_i\}$; $A(x)_{-i}$ and $A(x')_{-i}$ have the same distribution. By the union bound some point $p$ in the support of $A(x)_{-i}$ is within $\sigma$ of both $f(x)$ and $f(x')$, hence $\|f(x)-f(x')\|_1\le\|f(x)-p\|_1+\|p-f(x')\|_1\le2\sigma$.

The converse fails: not all low-sensitivity functions can be approximated from a small sample. Counterexample (stated for Hamming distance, extends to set difference): $D=GF(2^{\lceil\log n\rceil})$ and $f(x)=$ Hamming distance from $x$ to the nearest codeword of a Reed-Solomon code of dimension $k=n(1-o(1))$. One learns nothing about $f(x)$ from fewer than $k$ positions (a random Reed-Solomon codeword looks like a Shamir secret sharing, so any $k$ positions look uniform), yet $f$ has sensitivity 1.

## Examples

**Private mean and covariance on simulated 2-d data (own code).**

```python
import numpy as np
rng = np.random.default_rng(2)
n, d, eps, gamma = 5000, 2, 0.5, 1.0                # rows clipped so ||v||_1 <= gamma
v = np.clip(rng.normal([0.2, -0.1], 0.2, size=(n, d)), -0.5, 0.5)   # ||v||_1 <= 1
n_t = n + rng.laplace(0, 1/eps)
s_t = v.sum(0) + rng.laplace(0, gamma/eps, size=d)
c_t = (v[:, :, None] * v[:, None, :]).sum(0) + rng.laplace(0, gamma**2/eps, size=(d, d))
mu_t = s_t / n_t
C_t = c_t / n_t - np.outer(s_t, s_t) / n_t**2
print(mu_t, v.mean(0)); print(C_t, np.cov(v.T, bias=True))     # total privacy cost 3*eps = 1.5
```

At $n=5000$ the noise on $\tilde s$ ($\mathrm{sd}\approx\sqrt2\gamma/\varepsilon\approx2.8$ on a sum of magnitude about $10^3$) is a few thousandths of the signal.

## Connections

- **Clipping is the practical sensitivity bound.** The $\gamma$ in the mean/covariance mechanism is a bound on each row; in practice rows are clipped to enforce it. The same logic governs DP spend or revenue summaries: clip per-user spend at $\gamma$ and the sum has sensitivity $\gamma$.
- **Covariance release feeds regression.** Releasing $\mathrm{SUM}_v$ and $\mathrm{SUM}_{vv^T}$ privately and then solving normal equations is post-processing; this is the sufficient-statistics route to private linear models used in marketing-mix style regressions.

## See Also

- [[Dwork 2006 - Sensitivity and the Laplace Mechanism]]
- [[Dwork 2006 - Sensitivity in General Metric Spaces]]
- [[Dwork Roth 2014 - Laplace Mechanism]] (counting and histogram queries, first-names example)
- [[Wasserman Zhou 2010 - Histogram Release Mechanisms]] (histogram release, statistical rates)
