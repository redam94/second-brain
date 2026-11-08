---
title: "Dwork Roth 2014 - Laplace Mechanism"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/textbook
source: "[[raw/Dwork 2014 - The Algorithmic Foundations of Differential Privacy.pdf]]"
source_location: "Sec. 3.3 The Laplace mechanism: Def. 3.1-3.3, Thm. 3.6, Examples 3.1-3.3, Fact 3.7, Thm. 3.8, pp. 30-35"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3"
doc_type: textbook
depends_on:
  - "[[Dwork Roth 2014 - Differential Privacy Definition and Model of Computation]]"
  - "[[Dwork Roth 2014 - Randomized Response]]"
used_by:
  - "[[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]]"
  - "[[Dwork Roth 2014 - Sparse Vector Technique]]"
aliases:
  - Laplace mechanism (Dwork Roth Ch 3)
  - l1 sensitivity (Dwork Roth)
  - Counting queries and histogram queries (Dwork Roth)
---

# Dwork Roth 2014 - Laplace Mechanism

> [!summary]
> For numeric queries $f:\mathbb{N}^{|\mathcal{X}|}\to\mathbb{R}^k$, adding independent $\mathrm{Lap}(\Delta f/\varepsilon)$ noise to each coordinate gives $(\varepsilon,0)$-DP (Thm. 3.6), where $\Delta f$ is the $\ell_1$-sensitivity. With probability $1-\delta$ no coordinate is off by more than $\ln(k/\delta)\,\Delta f/\varepsilon$ (Thm. 3.8). Counting and histogram queries have sensitivity $1$, so error is $\approx1/\varepsilon$ independent of database size and, for histograms, of the number of cells.

## Overview

Numeric queries "are one of the most fundamental types of database queries". How accurately they can be answered under DP is governed by their $\ell_1$-sensitivity: "the magnitude by which a single individual's data can change the function $f$ in the worst case, and therefore, intuitively, the uncertainty in the response that we must introduce in order to hide the participation of a single individual."

## Main Content

> [!definition] Definition 3.1 - $\ell_1$-sensitivity (p. 31)
> The $\ell_1$-sensitivity of $f:\mathbb{N}^{|\mathcal{X}|}\to\mathbb{R}^k$ is
> $$
> \Delta f=\max_{x,y\in\mathbb{N}^{|\mathcal{X}|},\ \|x-y\|_1=1}\|f(x)-f(y)\|_1.
> $$
^def-l1-sensitivity-dr

> [!definition] Definition 3.2 - Laplace distribution (p. 31)
> The Laplace distribution (centred at $0$) with scale $b$ has density $\mathrm{Lap}(x\mid b)=\frac1{2b}\exp\!\big(-\frac{|x|}{b}\big)$ and variance $\sigma^2=2b^2$. Write $\mathrm{Lap}(b)$ for the distribution or a random variable $X\sim\mathrm{Lap}(b)$. It is a symmetric version of the exponential distribution.
^def-laplace-dr

> [!definition] Definition 3.3 - Laplace mechanism (p. 32)
> Given $f:\mathbb{N}^{|\mathcal{X}|}\to\mathbb{R}^k$, the Laplace mechanism is $\mathcal{M}_L(x,f(\cdot),\varepsilon)=f(x)+(Y_1,\dots,Y_k)$ with $Y_i$ i.i.d. $\mathrm{Lap}(\Delta f/\varepsilon)$.
^def-laplace-mechanism-dr

> [!theorem] Theorem 3.6 (p. 32)
> The Laplace mechanism preserves $(\varepsilon,0)$-differential privacy.
^thm-laplace-dp-dr

> [!proof]- Proof (p. 32)
> Let $x,y$ with $\|x-y\|_1\le1$ and let $p_x,p_y$ be the densities of $\mathcal{M}_L(x,f,\varepsilon)$ and $\mathcal{M}_L(y,f,\varepsilon)$. At an arbitrary point $z\in\mathbb{R}^k$:
> $$
> \frac{p_x(z)}{p_y(z)}=\prod_{i=1}^k\frac{\exp(-\varepsilon|f(x)_i-z_i|/\Delta f)}{\exp(-\varepsilon|f(y)_i-z_i|/\Delta f)}=\prod_{i=1}^k\exp\!\Big(\frac{\varepsilon(|f(y)_i-z_i|-|f(x)_i-z_i|)}{\Delta f}\Big)\le\prod_{i=1}^k\exp\!\Big(\frac{\varepsilon|f(x)_i-f(y)_i|}{\Delta f}\Big)=\exp\!\Big(\frac{\varepsilon\|f(x)-f(y)\|_1}{\Delta f}\Big)\le\exp(\varepsilon).
> $$
> The first inequality is the triangle inequality, the last is the definition of $\Delta f$. The bound $p_x(z)/p_y(z)\ge\exp(-\varepsilon)$ follows by symmetry.

Footnote (p. 31): Gaussian noise with variance calibrated to $\Delta f\ln(1/\delta)/\varepsilon$ achieves $(\varepsilon,\delta)$-DP (Appendix A), but the Laplace mechanism is cleaner and the two behave similarly under composition (Thm. 3.20).

### Counting, linear and histogram queries

> [!example] Example 3.1 - Counting queries (pp. 32-33)
> **Setup.** "How many elements in the database satisfy Property $P$?" Counting is "an extremely powerful primitive": it captures everything learnable in the statistical queries model and many data-mining tasks. **Sensitivity.** Adding or deleting one individual changes a count by at most $1$, so $\Delta f=1$. **Release.** $(\varepsilon,0)$-DP by adding $\mathrm{Lap}(1/\varepsilon)$; expected distortion $1/\varepsilon$, **independent of database size**. **Many queries.** A fixed arbitrary list of $m$ counting queries has worst-case sensitivity $m$ (one individual may change every count), so noise scaled to $m/\varepsilon$ per answer is needed. Responding to large numbers of arbitrary queries is the **query release problem**.
^ex-counting-queries

> [!example] Example 3.2 - Histogram queries (p. 33)
> When queries are *structurally disjoint*, noise need not scale with the number of queries. The universe is partitioned into cells and the query asks how many elements lie in each. Because cells are disjoint, one element affects exactly one cell by at most $1$, so the histogram has sensitivity $1$ and each count is answered by adding an independent $\mathrm{Lap}(1/\varepsilon)$ draw.
^ex-histogram-queries

> [!definition] Fact 3.7 (p. 33)
> If $Y\sim\mathrm{Lap}(b)$ then $\Pr[|Y|\ge t\cdot b]=\exp(-t)$.
^fact-laplace-tail

> [!theorem] Theorem 3.8 - Accuracy of the Laplace mechanism (p. 34)
> Let $f:\mathbb{N}^{|\mathcal{X}|}\to\mathbb{R}^k$ and $y=\mathcal{M}_L(x,f(\cdot),\varepsilon)$. Then for all $\delta\in(0,1]$:
> $$
> \Pr\!\left[\|f(x)-y\|_\infty\ge\ln\!\Big(\frac k\delta\Big)\cdot\frac{\Delta f}{\varepsilon}\right]\le\delta.
> $$
^thm-laplace-accuracy

> [!proof]- Proof (p. 34)
> $\Pr[\max_i|Y_i|\ge\ln(k/\delta)\Delta f/\varepsilon]\le k\cdot\Pr[|Y_i|\ge\ln(k/\delta)\Delta f/\varepsilon]=k\cdot\delta/k=\delta$, by the union bound and Fact 3.7 with $t=\ln(k/\delta)$, $b=\Delta f/\varepsilon$.

> [!example] Example 3.3 - First names (p. 34)
> **Setup.** Which first names, from 10,000 potential names, were most common among participants of the 2010 census? The query is $f:\mathbb{N}^{|\mathcal{X}|}\to\mathbb{R}^{10000}$, a histogram query, so $\Delta f=1$ (each person has at most one first name). **Solution.** All 10,000 name frequencies can be released simultaneously with $(1,0)$-DP; with probability 95% no estimate is off by more than $\ln(10000/0.05)\approx12.2$. **Interpretation.** "That's pretty low error for a nation of more than 300,000,000 people!"
^ex-first-names

### Differentially private selection

The task in Example 3.3 is *differentially private selection*: the outcome space is discrete and the goal is to output a "best" answer (here, the most populous cell). Example 3.4 and Report Noisy Max (next note) show how to do this at noise cost $1/\varepsilon$ even when the vector of counts has high $\ell_1$-sensitivity: [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]].

## Examples

```python
import numpy as np, math
rng = np.random.default_rng(0)

def laplace_mechanism(f_x, sensitivity, eps, rng=rng):
    f_x = np.atleast_1d(np.asarray(f_x, float))
    return f_x + rng.laplace(0.0, sensitivity / eps, size=f_x.shape)

# Example 3.3: 10,000-cell histogram, eps = 1, Delta f = 1
counts = rng.poisson(30_000, size=10_000)
noisy = laplace_mechanism(counts, 1.0, 1.0)
bound = math.log(10_000 / 0.05) * 1.0 / 1.0
print(np.abs(noisy - counts).max(), bound)       # max error vs ln(k/delta)*Delta/eps = 12.2

# fraction of runs with error beyond the bound should be <= delta = 0.05
bad = np.mean([np.abs(laplace_mechanism(counts, 1, 1) - counts).max() > bound for _ in range(500)])
print(bad)
```

**Reading Theorem 3.8.** The bound has only a $\ln k$ dependence on the number of released counts, so releasing $10^4$ cells at $\varepsilon=1$ costs a maximum error near 12, versus about $10^4$ for $m$-query noise scale $m/\varepsilon$ with a high-sensitivity query set (Example 3.1).

## Connections

- **Marketing measurement.** A report of conversions by campaign (each user converting in at most one campaign, or contributions capped) is a histogram with $\Delta f=1$ (or the cap): per-cell noise of scale $1/\varepsilon$ with a maximum error across $k$ cells near $\ln(k/\delta)/\varepsilon$. For $k=500$ campaign-days at $\varepsilon=1$ and 95% confidence that is about $\ln(500/0.05)\approx9.2$ conversions: negligible for large cells and dominant for cells with fewer than about 50 conversions. Compare with the sampling noise discussion in [[Geo-Experiment Design and Power Analysis]]: DP noise adds a variance term of $2(\Delta f/\varepsilon)^2$ per cell that can be modelled explicitly.
- The union-bound $\ln(k/\delta)$ inflation is the same structure as a Bonferroni correction ([[Multiple Testing Corrections]]).

## See Also

- [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]]
- [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]]
- [[Dwork 2006 - Sensitivity and the Laplace Mechanism]] (original statement and the adaptive version)
- [[Wasserman Zhou 2010 - Histogram Release Mechanisms]] (histograms perturbed with Laplace noise, statistical rates)
