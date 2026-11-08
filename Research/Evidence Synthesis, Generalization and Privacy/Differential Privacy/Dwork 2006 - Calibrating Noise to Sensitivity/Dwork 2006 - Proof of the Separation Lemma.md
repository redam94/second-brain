---
title: "Dwork 2006 - Proof of the Separation Lemma"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Dwork 2006 - Calibrating Noise to Sensitivity in Private Data Analysis.pdf]]"
source_location: "Sec. 4.2 Proving the Separation Results and Sec. 4.3 Random Subsets Approximate the Output Distribution (Lemma 4.3, Claim 4.4), pp. 41-44"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork 2006 - Calibrating Noise to Sensitivity"
doc_type: paper
depends_on:
  - "[[Dwork 2006 - Interactive versus Non-Interactive Separation Results]]"
used_by: []
aliases:
  - Lemma 4.3 (DMNS 2006)
  - Hybrid argument for DP separation
  - Pairwise independence variance bound for DP
---

# Dwork 2006 - Proof of the Separation Lemma

> [!summary]
> Both separation results use a **hybrid argument** over $2n$ steps; each step is bounded by Lemma 4.3: if a randomized map $Z$ is $\varepsilon$-DP across *all* pairs of inputs, then for most $r$ the output distribution on the half-space $D_r=\{x:r\odot x=0\}$ is statistically within $O\big((\varepsilon^2/(\alpha2^d))^{1/3}\big)$ of the output on the uniform distribution. The proof estimates $p(z)$ by pairwise-independent subsampling, uses DP to get tiny multiplicative variance (Claim 4.4), then Chebyshev and Markov.

## Overview

**Intuition (p. 41-42).** Given $Z:D\to\{0,1\}^*$, we want $\Pr[Z(D_r)=z]$ to estimate $\Pr[Z(D)=z]$ with multiplicative error much smaller than $1+\varepsilon$; then total variation is small "without having to pay a factor proportional to the domain size". Two facts: (i) for random $r$, $D_r$ consists of $0^d$ plus $2^{d-1}-1$ pairwise-independent points of $\{0,1\}^d$; (ii) $\varepsilon$-DP forces each $\Pr[Z(x)=z]$ into a small multiplicative interval around its mean $\Pr[Z(D)=z]$, so the subsample average has small variance.

**Notation.** $D=\{0,1\}^d$ with uniform random variable $D$; $D_r=\{x:r\odot x=0\}$, $\bar D_r=D\setminus D_r$; "$D_r$" also denotes a uniform random vector from $D_r$. $\mathrm{SD}(\cdot,\cdot)$ is statistical difference (total variation). $p_x(z)=\Pr[Z(x)=z]$; $p(z)=2^{-d}\sum_xp_x(z)=\Pr[Z(D)=z]$. $D_{r,b}=\{x:r\odot x=b\}$ for $b\in\{0,1\}$.

## Main Content

> [!theorem] Lemma 4.3 - random subsets approximate the output distribution (pp. 42-43)
> Let $Z:D\to\{0,1\}^*$ be a randomized map such that for all pairs $x,x'\in D$ and all outputs $z$: $\Pr[Z(x)=z]\le e^{\varepsilon}\Pr[Z(x')=z]$. Let $0<\alpha$. With probability at least $1-\alpha$ over $r\in_R\{0,1\}^d\setminus0^d$,
> $$\mathrm{SD}\big(Z(D_r),Z(D)\big)\le O\!\left(\Big(\frac{\varepsilon^2}{\alpha\cdot2^d}\Big)^{1/3}\right).$$
> Similarly, with probability at least $1-\alpha$, $\mathrm{SD}(Z(\bar D_r),Z(D))\le O\big((\varepsilon^2/(\alpha2^d))^{1/3}\big)$.
^lem-random-subsets

> [!theorem] Claim 4.4 - variance of the subset estimator (p. 44)
> Let $\tilde\varepsilon=e^{\varepsilon}-1$ and $\hat p(z;r,b)=\Pr[Z(D_{r,b})=z]$. Then over uniform $r,b$,
> $$\mathbb{E}[\hat p(z;r,b)]=p(z),\qquad\mathrm{Var}_{r,b}[\hat p(z;r,b)]\le\frac{2\tilde\varepsilon^2p(z)^2}{2^d}.$$
^clm-variance-bound

> [!proof]- Proof of Claim 4.4 (p. 44)
> Let $p^*=\min_xp_x(z)$, $q_x=p_x(z)-p^*$, $\bar q=p(z)-p^*$. Variance of $\hat p$ equals that of $\hat p-p^*=\frac{2}{2^d}\sum_xq_x\chi'(x)$, where $\chi'(x)=1$ if $x\in D_{r,b}$ and $0$ otherwise; its mean is $\bar q=2^{-d}\sum_xq_x$. Then
> $$\mathrm{Var}[\hat p]=\mathbb{E}\Big[\Big(\tfrac{1}{2^d}\sum_xq_x\big(2\chi'(x)-1\big)\Big)^2\Big].$$
> Now $2\chi'(x)-1=(-1)^{r\odot x\oplus b}$ has expectation $0$, and for $x\ne y$ the expectation of $(2\chi'(x)-1)(2\chi'(y)-1)$ is exactly $1/2^d$ (it would be $0$ for unrestricted $r$; the restriction $r\ne0^d$ produces a small correlation of order $2^{-d}$). *Checking this step:* for $x\ne y$ and $w=x\oplus y\ne0$, $\sum_{r\in\{0,1\}^d}(-1)^{r\odot w}=0$, so removing the term $r=0^d$ gives $\mathbb{E}_{r\ne0}[(-1)^{r\odot w}]=-1/(2^d-1)$. The sign is negative rather than the printed $+1/2^d$ (numerically confirmed for $d=10$). Since all $q_x\ge0$ a negative cross term only *lowers* the variance, so the bound below holds either way. Expanding the square:
> $$\mathrm{Var}[\hat p]=\frac{1}{2^{2d}}\sum_xq_x^2+\frac{1}{2^{3d}}\sum_{x\ne y}q_xq_y=\frac{1-2^{-d}}{2^{2d}}\sum_xq_x^2+\frac1{2^d}\Big(\frac1{2^d}\sum_xq_x\Big)^2\le\frac1{2^d}\Big(\max_xq_x^2+\bar q^2\Big).$$
> By the indistinguishability condition $\max_xq_x$ and $\bar q$ are both at most $(e^{\varepsilon}-1)p^*\le\tilde\varepsilon\,p(z)$. Plugging in gives the claim.

> [!proof]- Proof of Lemma 4.3 (pp. 44)
> Call $z$ **$\delta$-good** for $(r,b)$ if $|\hat p(z)-p(z)|\le\delta p(z)$. By Chebyshev and Claim 4.4, for all $z$,
> $$\Pr_{r,b}[z\text{ not }\delta\text{-good}]\le\frac{\mathrm{Var}[\hat p(z)]}{\delta^2p(z)^2}\le\frac{2\tilde\varepsilon^2}{\delta^22^d}.$$
> Draw $z$ from $p(\cdot)$. The expected fraction of non-good $z$ (weighted by $p$) is at most $2\tilde\varepsilon^2/(\delta^22^d)$, so by Markov, with probability at least $1-\alpha$ over $(r,b)$, at most a fraction $\gamma=\frac{2\tilde\varepsilon^2}{\alpha\delta^22^d}$ of the mass is not $\delta$-good. If a $1-\gamma$ fraction of $z$ is $\delta$-good, the statistical difference between $\hat p$ and $p$ is at most $2(\gamma+\delta)$. Balancing $\gamma\approx\delta$ gives $\delta\approx\big(\frac{2\tilde\varepsilon^2}{\alpha2^d}\big)^{1/3}$ (the printed text writes the constant inside the cube root with $\alpha$ in the numerator, which appears to be a typesetting garble; the exponent $1/3$ and the $\varepsilon^{2/3}2^{-d/3}$ scaling are unaffected), total distance at most $4\delta$, and $\tilde\varepsilon<2\varepsilon$ for $\varepsilon\le1$ gives the stated $O\big((\varepsilon^2/(\alpha2^d))^{1/3}\big)$. The bit $b$ is irrelevant: $D_{r,1}=\bar D_r$ swaps the two halves, and $Z(D)$ is the midpoint of $Z(D_r)$ and $Z(\bar D_r)$, so $\mathrm{SD}(Z(D_r),Z(D))=\mathrm{SD}(Z(\bar D_r),Z(D))$. Hence the statement holds over pairs $(r,0)$.

### Proof of Theorem 4.1 (hybrid over $2n$ steps, pp. 42-43)

Distribution 0 is $\mathcal{M}(D_{r_1},\dots,D_{r_n})$; show it is close to $\mathcal{M}(D,\dots,D)$ by hybrids. After fixing $r_1,\dots,r_i$ define the $i$-th hybrid $\mathcal{M}(D_{r_1},\dots,D_{r_i},D,D,\dots,D)$ and the $(i+1)$-st by replacing the next $D$ by $D_{r_{i+1}}$. Consider the randomized map $Z(x)=\mathcal{M}(D_{r_1},\dots,D_{r_i},x,D,\dots,D)$ with the $(i+1)$-th coordinate fixed to $x$. Then $Z(D)$ is the $i$-th hybrid and $Z(D_{r_{i+1}})$ the $(i+1)$-st. Because $\mathcal{M}$ is $\varepsilon$-DP, $\Pr[Z(x)=z]\le e^{\varepsilon}\Pr[Z(x')=z]$ for all $x,x'\in D$, so Lemma 4.3 with failure probability $\frac1{6n}$ per step gives $\mathrm{SD}=\sigma=O\big((n\varepsilon^2/2^d)^{1/3}\big)$. A union bound over $n$ steps: with probability at least $5/6$ every step is within $\sigma$, so $\mathrm{SD}(\mathcal{M}(D_{r_1},\dots,D_{r_n}),\mathcal{M}(D,\dots,D))\le n\sigma$. Repeating from Distribution 1 (using $\bar D_{r_i}$) gives the same bound with probability $5/6$. With probability at least $2/3$ both hold and the distance between Distributions 0 and 1 is at most $2n\sigma=O(n^{4/3}\varepsilon^{2/3}2^{-d/3})$. $\blacksquare$

### Proof of Proposition 4.2

A local scheme gives $\mathcal{M}_Z(x_1,\dots,x_n)=(Z(x_1),\dots,Z(x_n))$ with $\Pr[Z(x)=z]\le e^{\varepsilon}\Pr[Z(x')=z]$ for all $x,x',z$. It suffices that, with probability at least $2/3$ over $r\ne0$, $Z(D_r)$ and $Z(\bar D_r)$ are within $O(\varepsilon^{2/3}2^{-d/3})$ (Lemma 4.3 with $\alpha=1/3$, plus the midpoint argument). A hybrid argument across the $n$ independent coordinates gives difference $O(n\varepsilon^{2/3}2^{-d/3})$. $\blacksquare$

## Examples

**Checking Claim 4.4 numerically on a toy $Z$ (own code).** Take $d=10$, a randomized response $Z$ that outputs a noisy version of $x$ with each bit flipped w.p. $1/(e^{\varepsilon/d}+1)$ (which is $\varepsilon$-DP over all pairs). Estimate the variance of $\hat p(z;r,b)$ over random $(r,b)$ for a fixed $z$ and compare with the bound $2\tilde\varepsilon^2p(z)^2/2^d$.

```python
import numpy as np
rng = np.random.default_rng(4)
d, eps = 10, 1.0
xs = np.array([[(i >> j) & 1 for j in range(d)] for i in range(2**d)])
flip = 1 / (np.exp(eps / d) + 1)                       # per-bit flip prob => eps-DP over all pairs x, x'
z = xs[rng.integers(2**d)]
dist = (xs != z).sum(1)
px = flip**dist * (1 - flip)**(d - dist)               # Pr[Z(x) = z]
p = px.mean()
est = []
for _ in range(20000):
    r = rng.integers(1, 2**d); rv = np.array([(r >> j) & 1 for j in range(d)]); b = rng.integers(2)
    mask = ((xs @ rv) % 2) == b
    est.append(px[mask].mean())
print(np.var(est), 2 * (np.exp(eps) - 1)**2 * p**2 / 2**d)   # empirical variance (~2e-11) is far below the bound (~5e-9)
```

## Connections

- The proof technique (pairwise independence plus bounded multiplicative range implies small variance) is a clean example of how DP constraints convert to concentration. The same idea underlies later lower bounds for non-interactive query release.
- For measurement practitioners the take-away is not the proof but the conclusion: a privately released synopsis built for unknown future queries is expensive in sample size; define the reporting schema first.

## See Also

- [[Dwork 2006 - Interactive versus Non-Interactive Separation Results]]
- [[Dwork 2006 - Calibrating Noise to Sensitivity - Overview]]
- [[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]] (a related impossibility argument for consistency)
