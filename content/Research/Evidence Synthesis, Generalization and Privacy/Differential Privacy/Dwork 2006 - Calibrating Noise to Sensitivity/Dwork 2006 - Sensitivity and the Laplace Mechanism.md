---
title: "Dwork 2006 - Sensitivity and the Laplace Mechanism"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Dwork 2006 - Calibrating Noise to Sensitivity in Private Data Analysis.pdf]]"
source_location: "Sec. 3 and 3.1: Def. 3.1, Example 4, Def. 3.2, Prop. 3.3, Thm. 3.4, pp. 31-33"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork 2006 - Calibrating Noise to Sensitivity"
doc_type: paper
depends_on:
  - "[[Dwork 2006 - Differential Privacy Definition and Basic Examples]]"
  - "[[Dwork 2006 - Postprocessing, Composition and Group Privacy]]"
used_by:
  - "[[Dwork 2006 - Low-Sensitivity Functions and Applications]]"
  - "[[Dwork 2006 - Sensitivity in General Metric Spaces]]"
aliases:
  - Laplace mechanism (DMNS 2006 proof)
  - L1 sensitivity (DMNS 2006)
  - Adaptive Laplace mechanism theorem
---

# Dwork 2006 - Sensitivity and the Laplace Mechanism

> [!summary]
> Define the $\ell_1$ sensitivity $S(f)=\sup_{x,x'\text{ neighbours}}\|f(x)-f(x')\|_1$. Adding i.i.d. $\mathrm{Lap}(S(f)/\varepsilon)$ noise to each coordinate of $f(x)$ is $\varepsilon$-DP (Prop. 3.3), and the guarantee extends to adaptively chosen queries when the server refuses to answer once the joint sensitivity of the query sequence exceeds a threshold $T$ (Thm. 3.4). Noise scale depends only on $S(f)/\varepsilon$, not on $n$ or the output dimension.

## Overview

Sec. 3 presents "the most basic tool for constructing differentially private mechanisms": formally define sensitivity of functions, prove that Laplace noise with expected magnitude $S(f)/\varepsilon$ ensures $\varepsilon$-DP, extend to vector-valued and adaptively chosen queries. The paper's phrase: "this analysis shows how a 'privacy budget' $\varepsilon$ can be spent by a sequence of queries."

## Main Content

> [!definition] Definition 3.1 - $\ell_1$ sensitivity (p. 31)
> The $\ell_1$ sensitivity of $f:D^*\to\mathbb{R}^d$ is the smallest $S(f)$ such that for all neighbouring $x,x'$: $\|f(x)-f(x')\|_1\le S(f)$. With neighbours defined by symmetric difference of size one, $S(f)=\sup_{x,x':d_\triangle(x,x')=1}\|f(x)-f(x')\|_1$. By the triangle inequality sensitivity is a Lipschitz condition: $\frac{\|f(x)-f(x')\|_1}{d_{\triangle}(x,x')}\le S(f)$ for all $x,x'$.
^def-l1-sensitivity

If neighbours are defined via Hamming distance instead, all results "can be easily modified"; one can also define sensitivity for any metric on the output space (Sec. 3.3). Note $S(f)$ "is a quantity inherent in $f$; it is not chosen by policy and is independent of the database" (p. 18).

> [!example] Example 4 - sums, counts, histograms (pp. 31-32)
> **Sums.** $\mathrm{SUM}_v(x)=\sum_{i=1}^{|x|}v(x_i)$ with $v:D\to\mathbb{R}^d$ and $\|v(x)\|_1\le\gamma$ for all $x\in D$ has $S(\mathrm{SUM}_v)\le\gamma$.
> **Count.** Taking $v\equiv1$: $\mathrm{COUNT}(x)=|x|$ has $S(\mathrm{COUNT})=1$.
> **Histogram.** Partition $D$ into disjoint regions $B_1,\dots,B_d$; $\mathrm{HIST}(x)=(|x\cap B_1|,\dots,|x\cap B_d|)=\sum_i v(x_i)$ with $v(x)$ a one-hot vector of dimension $d$. $\|v(x)\|_1=1$ so $S(\mathrm{HIST})=1$: neighbouring databases differ in exactly one count (one bin gains or loses a point).
^ex-sum-count-hist

> [!definition] Definition 3.2 - Laplace distribution, $d$-dimensional (p. 32)
> $\mathrm{Lap}(\lambda)$ on $\mathbb{R}$ has density $p(y)=\frac{1}{2\lambda}e^{-|y|/\lambda}$, mean $0$, standard deviation $\lambda\sqrt2$. $\mathrm{Lap}(\lambda)^d$ is a product of $d$ i.i.d. $\mathrm{Lap}(\lambda)$. For $y,y'\in\mathbb{R}^d$ the densities satisfy
> $$
> \frac{p(y)}{p(y')}\le\exp\left(\|y-y'\|_1/\lambda\right).\tag{4}
> $$
> (The printed text writes $\lambda$ where it should write $1/\lambda$ in the exponent; the proofs below use the correct form.)
^def-laplace-d

> [!theorem] Proposition 3.3 - Laplace mechanism, non-adaptive version (p. 32)
> For all $f:D^*\to\mathbb{R}^d$, the mechanism $\mathcal{M}_f(x)=f(x)+(Y_1,\dots,Y_d)$ with $Y_i$ i.i.d. $\mathrm{Lap}(S(f)/\varepsilon)$ is **$\varepsilon$-differentially private**.
^thm-laplace-mechanism

> [!proof]- Proof (p. 32)
> Let $p[\mathcal{M}(x)=z]$ be the density at $z$. For neighbours $x,x'$, Eq. (4) with $\lambda=S(f)/\varepsilon$ gives
> $$
> \frac{p[\mathcal{M}_f(x)=z]}{p[\mathcal{M}_f(x')=z]}\le\exp\left(\frac{\varepsilon\|f(x)-f(x')\|_1}{S_{L1}(f)}\right)\le\exp(\varepsilon).\tag{5}
> $$
> For measurable $Z\subseteq\mathbb{R}^d$, $\Pr[\mathcal{M}_f(x)\in Z]=\int_{z\in Z}p[\mathcal{M}_f(x)=z]\,dz\le e^{\varepsilon}\int_{z\in Z}p[\mathcal{M}_f(x')=z]\,dz=e^{\varepsilon}\Pr[\mathcal{M}_f(x')\in Z]$.

### Adaptivity

Proposition 3.3 is a special case of a more general, possibly adaptive process. An adaptive querying strategy $\mathcal{A}$ issues $k$ queries $f_i:\mathbb{N}^{|D|}\to\mathbb{R}$, where $f_i$ is determined by earlier answers $a_1,\dots,a_{i-1}$ and the analyst's coins $r$. The view is $v=(r,a_1,\dots,a_k)$; for a view $v$ define $f^v:\mathbb{N}^{D}\to\mathbb{R}^k$ with $i$-th coordinate $f_i^v$. The server either (a) answers $a_i=f_i^v(x)+\mathrm{Lap}(\lambda)$ for fixed $\lambda$, or (b) refuses ($a_i=\perp$). It refuses once the joint sensitivity $S(f_1^v,\dots,f_i^v)$ exceeds a threshold $T$. This decision depends only on the queries, "independent of the data set", so it is "not disclosive, since it can be computed by the user submitting the queries".

> [!theorem] Theorem 3.4 - Laplace mechanism, adaptive version (p. 33)
> Consider an arbitrary adaptive query strategy with query function $f^v(x):\mathbb{N}^{|D|}\to\mathbb{R}^k$ parameterised by a view $v=(r,a_1,\dots,a_k)$. The mechanism that answers $a_i=f_i^v(x)+\mathrm{Lap}(T/\varepsilon)$ as long as $S(f^v)\le T$ is $\varepsilon$-differentially private.
^thm-laplace-adaptive

> [!proof]- Proof (p. 33)
> For neighbours $x,x'$, the chain rule gives
> $$
> \frac{p[(r,\mathcal{M}(x))=(r,a_1,\dots,a_k)]}{p[(r,\mathcal{M}(x'))=(r,a_1,\dots,a_k)]}=\prod_{i\le k}\frac{p[\mathcal{M}(x)_i=a_i\mid r,a_1,\dots,a_{i-1}]}{p[\mathcal{M}(x')_i=a_i\mid r,a_1,\dots,a_{i-1}]}.
> $$
> Fixing $r$ and the first $i-1$ answers fixes the values $f_i^v(x),f_i^v(x')$, so each conditional is either $\mathrm{Lap}(\lambda)$ with $\lambda=T/\varepsilon$ centred at $f_i^v(\cdot)$, or the constant $\perp$. Hence the product is at most $\prod_i\exp(|f_i^v(x)-f_i^v(x')|/\lambda)=\exp(\|f^v(x)-f^v(x')\|_1/\lambda)\le\exp(S_{L1}(f^v)/\lambda)\le e^{\varepsilon}$.

This is a "more nuanced version of composition" than Lemma 2.6: budgeting on the *joint sensitivity* rather than summing $\varepsilon_i$. For $k$ counting queries the joint sensitivity can be as large as $k$ (each person may affect every count), recovering the $\varepsilon/k$-per-query accounting; for disjoint (histogram) queries it stays $1$.

## Examples

**Accuracy (derived, not stated in this paper).** Since $\Pr[|Y|\ge t\lambda]=e^{-t}$ for $Y\sim\mathrm{Lap}(\lambda)$, a single released coordinate is within $\frac{S(f)}{\varepsilon}\ln(1/\beta)$ of the truth with probability $1-\beta$; a union bound over $d$ coordinates gives $\|f(x)-\mathcal{M}_f(x)\|_\infty\le\frac{S(f)}{\varepsilon}\ln(d/\beta)$ (the textbook statement, [[Dwork Roth 2014 - Laplace Mechanism]]).

**Empirical check of the density-ratio bound (own code).**

```python
import numpy as np
rng = np.random.default_rng(0)
eps, S = 0.5, 1.0                       # count query, sensitivity 1
lam = S / eps
lap_pdf = lambda y, mu: np.exp(-np.abs(y - mu) / lam) / (2 * lam)
f_x, f_xp = 100.0, 101.0                # neighbouring databases: counts differ by 1
z = np.linspace(80, 120, 4001)
ratio = lap_pdf(z, f_x) / lap_pdf(z, f_xp)
print(ratio.max(), np.exp(eps))         # max density ratio equals e^eps (attained far in the tail)
```

The maximum ratio is $e^{\varepsilon}$ (attained for $z\le f(x)$), so the bound in Eq. (5) is tight for counts.

## Connections

- **Marketing measurement.** To release $K$ campaign-level conversion counts with each user contributing to at most one campaign (a histogram), noise scale is $1/\varepsilon$ per cell regardless of $K$. If a user can convert in several campaigns, sensitivity is the maximum number of cells touched (or clipped contribution), and noise scale grows linearly in that. This is why privacy-preserving measurement APIs cap per-user contributions: the cap *is* the sensitivity bound.
- Known noise law enables **debiasing and likelihood modelling**: $\tilde y_k=y_k+\mathrm{Lap}(S/\varepsilon)$ is an additive measurement-error model with a known error distribution, easy to place inside a Bayesian model ([[Bayesian Estimation and Priors for MMM]]).

## See Also

- [[Dwork 2006 - Low-Sensitivity Functions and Applications]]
- [[Dwork 2006 - Sensitivity in General Metric Spaces]]
- [[Dwork Roth 2014 - Laplace Mechanism]]
- [[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]] (Lemma 2.6 part 3 restates this proposition)
