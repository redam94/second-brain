---
title: "Dwork Roth 2014 - Basic Composition and Divergence Tools"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/textbook
source: "[[raw/Dwork 2014 - The Algorithmic Foundations of Differential Privacy.pdf]]"
source_location: "Sec. 3.1 Useful probabilistic tools (pp. 28-29); Sec. 3.5 Composition theorems, Thm. 3.14-3.16, Cor. 3.15 (pp. 41-43); Sec. 3.5.1 Composition technicalities, Def. 3.5-3.6, Remark 3.2, Lemmas 3.17-3.19 (pp. 43-48)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dwork Roth 2014 - Algorithmic Foundations of Differential Privacy Ch 1-3"
doc_type: textbook
depends_on:
  - "[[Dwork Roth 2014 - Post-Processing, Group Privacy and What DP Promises]]"
used_by:
  - "[[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]]"
  - "[[Dwork Roth 2014 - Sparse Vector Technique]]"
aliases:
  - Basic composition theorem (Dwork Roth)
  - Max divergence and approximate max divergence
  - Concentration inequalities for differential privacy
  - Lemma 3.17 approximate max-divergence characterisation
---

# Dwork Roth 2014 - Basic Composition and Divergence Tools

> [!summary]
> Simple composition: running an $(\varepsilon_1,\delta_1)$-DP and an $(\varepsilon_2,\delta_2)$-DP algorithm yields $(\varepsilon_1+\varepsilon_2,\delta_1+\delta_2)$-DP (Thm. 3.14-3.16). To prove sharper bounds the book rephrases DP via **max-divergence** $D_\infty$ and its $\delta$-approximate version (Remark 3.2), proves their coupling characterisation (Lemma 3.17), bounds KL by $\varepsilon(e^{\varepsilon}-1)$ (Lemma 3.18), and states Azuma's inequality (Lemma 3.19) for the next note's advanced composition. Chapter 3.1 collects the Chernoff, Azuma and Stirling bounds.

## Overview

"The combination of two differentially private algorithms [should] be differentially private itself... Of course the parameters $\varepsilon$ and $\delta$ will necessarily degrade": repeatedly computing the same statistic with an $\varepsilon$-DP Laplace mechanism lets the average converge to the truth, so the guarantee must weaken with repeated use. "It is a strength of differential privacy that composition is 'automatic,' in that the bounds obtained hold without any special effort by the database curator."

## Main Content

### Probabilistic tools (Sec. 3.1, pp. 28-29)

> [!theorem] Theorem 3.1 - Additive Chernoff bound
> $X_1,\dots,X_m$ independent with $0\le X_i\le1$; $S=\frac1m\sum X_i$, $\mu=\mathbb{E}[S]$. Then $\Pr[S>\mu+\varepsilon]\le e^{-2m\varepsilon^2}$ and $\Pr[S<\mu-\varepsilon]\le e^{-2m\varepsilon^2}$.
^thm-chernoff-additive

> [!theorem] Theorem 3.2 - Multiplicative Chernoff bound
> Same setting. $\Pr[S>(1+\varepsilon)\mu]\le e^{-m\mu\varepsilon^2/3}$ and $\Pr[S<(1-\varepsilon)\mu]\le e^{-m\mu\varepsilon^2/2}$.
^thm-chernoff-multiplicative

> [!theorem] Theorem 3.3 - Azuma's inequality
> Let $f$ be a function of $m$ random variables $X_1,\dots,X_m$, $X_i$ taking values in $A_i$, $\mathbb{E}[f]$ bounded. Let $c_i$ be the maximum effect of $X_i$ on $f$: for all $a_i,a_i'\in A_i$, $\mathbb{E}[f\mid X_1,\dots,X_{i-1},X_i=a_i]-\mathbb{E}[f\mid X_1,\dots,X_{i-1},X_i=a_i']\le c_i$. Then $\Pr[f(X_1,\dots,X_m)\ge\mathbb{E}[f]+t]\le\exp\!\big(-\frac{2t^2}{\sum_ic_i^2}\big)$.
^thm-azuma

> [!theorem] Theorem 3.4 - Stirling's approximation
> $\sqrt{2n\pi}(n/e)^ne^{1/(12n+1)}<n!<\sqrt{2n\pi}(n/e)^ne^{1/(12n)}$.
^thm-stirling

### Basic composition (Sec. 3.5, pp. 41-43)

> [!theorem] Theorem 3.14 - Composition of two $\varepsilon$-DP algorithms (p. 42)
> Let $\mathcal{M}_1:\mathbb{N}^{|\mathcal{X}|}\to R_1$ be $\varepsilon_1$-DP and $\mathcal{M}_2:\mathbb{N}^{|\mathcal{X}|}\to R_2$ be $\varepsilon_2$-DP. Then $\mathcal{M}_{1,2}(x)=(\mathcal{M}_1(x),\mathcal{M}_2(x))$ is $(\varepsilon_1+\varepsilon_2)$-differentially private.
^thm-composition-two

> [!proof]- Proof (p. 42)
> Fix $x,y$ with $\|x-y\|_1\le1$ and $(r_1,r_2)\in R_1\times R_2$. By independence of the two mechanisms' coins,
> $$\frac{\Pr[\mathcal{M}_{1,2}(x)=(r_1,r_2)]}{\Pr[\mathcal{M}_{1,2}(y)=(r_1,r_2)]}=\frac{\Pr[\mathcal{M}_1(x)=r_1]}{\Pr[\mathcal{M}_1(y)=r_1]}\cdot\frac{\Pr[\mathcal{M}_2(x)=r_2]}{\Pr[\mathcal{M}_2(y)=r_2]}\le e^{\varepsilon_1}e^{\varepsilon_2}=e^{\varepsilon_1+\varepsilon_2}.$$
> By symmetry the ratio is at least $e^{-(\varepsilon_1+\varepsilon_2)}$.

> [!theorem] Corollary 3.15 (p. 43)
> If $\mathcal{M}_i$ is $(\varepsilon_i,0)$-DP for $i\in[k]$, then $\mathcal{M}_{[k]}(x)=(\mathcal{M}_1(x),\dots,\mathcal{M}_k(x))$ is $(\sum_{i=1}^k\varepsilon_i,0)$-DP.
^cor-composition-k

> [!theorem] Theorem 3.16 - Basic composition for $(\varepsilon,\delta)$ (p. 43)
> If $\mathcal{M}_i$ is $(\varepsilon_i,\delta_i)$-DP for $i\in[k]$, then $\mathcal{M}_{[k]}$ is $\big(\sum_{i=1}^k\varepsilon_i,\ \sum_{i=1}^k\delta_i\big)$-differentially private. (Proof in Appendix B, due to Dwork and Lei; outside this capture.)
^thm-basic-composition

### Divergences (Sec. 3.5.1, pp. 43-48)

> [!definition] Definition 3.5 - KL-divergence (p. 43)
> $D(Y\|Z)=\mathbb{E}_{y\sim Y}\!\big[\ln\frac{\Pr[Y=y]}{\Pr[Z=y]}\big]$ (a fraction with zero denominator is infinite). $D\ge0$ with equality iff $Y,Z$ are identically distributed; $D$ is not symmetric, does not satisfy the triangle inequality, and can be infinite when $\mathrm{Supp}(Y)\not\subseteq\mathrm{Supp}(Z)$.
^def-kl

> [!definition] Definition 3.6 - Max divergence and $\delta$-approximate max divergence (pp. 43-44)
> $$D_\infty(Y\|Z)=\max_{S\subseteq\mathrm{Supp}(Y)}\ln\frac{\Pr[Y\in S]}{\Pr[Z\in S]},\qquad D_\infty^{\delta}(Y\|Z)=\max_{S\subseteq\mathrm{Supp}(Y):\Pr[Y\in S]\ge\delta}\ln\frac{\Pr[Y\in S]-\delta}{\Pr[Z\in S]}.$$
^def-max-divergence

> [!remark] Remark 3.2 (p. 44)
> $\mathcal{M}$ is $\varepsilon$-DP iff for every two neighbours $x,y$: $D_\infty(\mathcal{M}(x)\|\mathcal{M}(y))\le\varepsilon$ and $D_\infty(\mathcal{M}(y)\|\mathcal{M}(x))\le\varepsilon$. $\mathcal{M}$ is $(\varepsilon,\delta)$-DP iff $D^\delta_\infty(\mathcal{M}(x)\|\mathcal{M}(y))\le\varepsilon$ and $D^\delta_\infty(\mathcal{M}(y)\|\mathcal{M}(x))\le\varepsilon$.
^rem-dp-as-divergence

The **statistical distance** is $\Delta(Y,Z)=\max_S|\Pr[Y\in S]-\Pr[Z\in S]|$; $Y,Z$ are *$\delta$-close* if $\Delta(Y,Z)\le\delta$.

> [!theorem] Lemma 3.17 - Approximate max-divergence via coupling (pp. 44-47)
> 1. $D_\infty^\delta(Y\|Z)\le\varepsilon$ iff there exists a random variable $Y'$ with $\Delta(Y,Y')\le\delta$ and $D_\infty(Y'\|Z)\le\varepsilon$.
> 2. Both $D_\infty^\delta(Y\|Z)\le\varepsilon$ and $D_\infty^\delta(Z\|Y)\le\varepsilon$ iff there exist $Y',Z'$ with $\Delta(Y,Y')\le\delta/(e^{\varepsilon}+1)$, $\Delta(Z,Z')\le\delta/(e^{\varepsilon}+1)$ and $D_\infty(Y'\|Z')\le\varepsilon$.
^lem-approx-divergence

> [!proof]- Proof sketch (pp. 44-47)
> *Part 1, ($\Leftarrow$).* For every $S$: $\Pr[Y\in S]\le\Pr[Y'\in S]+\delta\le e^{\varepsilon}\Pr[Z\in S]+\delta$. *($\Rightarrow$).* Let $S=\{y:\Pr[Y=y]>e^{\varepsilon}\Pr[Z=y]\}$; then $\sum_{y\in S}(\Pr[Y=y]-e^{\varepsilon}\Pr[Z=y])\le\delta$. Lower the mass of $Y$ on $S$ down to $e^{\varepsilon}\Pr[Z=y]$ and raise it on $T=\{y:\Pr[Y=y]<\Pr[Z=y]\}$ (there is enough room since total mass removed is at most the mass available in $T$) while keeping $\Pr[Y'=y]\le\Pr[Z=y]$ there; then $D_\infty(Y'\|Z)\le\varepsilon$ and $\Delta(Y,Y')\le\delta$.
> *Part 2, ($\Leftarrow$).* $\Pr[Y\in S]\le\Pr[Y'\in S]+\frac{\delta}{e^{\varepsilon}+1}\le e^{\varepsilon}\Pr[Z'\in S]+\frac{\delta}{e^{\varepsilon}+1}\le e^{\varepsilon}\Pr[Z\in S]+\frac{e^{\varepsilon}\delta}{e^{\varepsilon}+1}+\frac{\delta}{e^{\varepsilon}+1}=e^{\varepsilon}\Pr[Z\in S]+\delta$. *($\Rightarrow$).* On $S=\{y:\Pr[Y=y]>e^{\varepsilon}\Pr[Z=y]\}$ move both distributions toward each other: set $\Pr[Y'=y]=e^{\varepsilon}\Pr[Z'=y]=\frac{e^{\varepsilon}}{1+e^{\varepsilon}}(\Pr[Y=y]+\Pr[Z=y])$, which lies in $[e^{\varepsilon}\Pr[Z=y],\Pr[Y=y]]$; the mass moved on each side totals $\alpha=\frac{\Pr[Y\in S]-e^{\varepsilon}\Pr[Z\in S]}{e^{\varepsilon}+1}\le\frac{\delta}{e^{\varepsilon}+1}$. Do the same on $S'=\{y:\Pr[Z=y]>e^{\varepsilon}\Pr[Y=y]\}$ with total $\alpha'$; if $\alpha\ne\alpha'$ the leftover $\beta=|\alpha-\alpha'|$ of normalisation is fixed by shifting mass on points where $\Pr[Y'=y]<\Pr[Z'=y]$, keeping $D_\infty(Y'\|Z')\le\varepsilon$ and $\Delta\le\alpha$.

> [!theorem] Lemma 3.18 - KL bound from max-divergence (p. 47)
> If $D_\infty(Y\|Z)\le\varepsilon$ and $D_\infty(Z\|Y)\le\varepsilon$ then $D(Y\|Z)\le\varepsilon(e^{\varepsilon}-1)$.
^lem-kl-bound

> [!proof]- Proof (p. 47)
> $D(Y\|Z)\le D(Y\|Z)+D(Z\|Y)$ since both are nonnegative (log-sum inequality). That sum equals $\sum_y[\Pr[Y=y]-\Pr[Z=y]]\ln\frac{\Pr[Y=y]}{\Pr[Z=y]}\le\sum_y|\Pr[Y=y]-\Pr[Z=y]|\,\varepsilon=\varepsilon\sum_y(\max-\min)\le\varepsilon(e^{\varepsilon}-1)\sum_y\min\{\Pr[Y=y],\Pr[Z=y]\}\le\varepsilon(e^{\varepsilon}-1)$, using $\max\le e^{\varepsilon}\min$ and $\sum\min\le1$. The identity used is $D(Y\|Z)+D(Z\|Y)=\sum_y(\Pr[Y=y]-\Pr[Z=y])\ln\frac{\Pr[Y=y]}{\Pr[Z=y]}$, each term of which is at most $|\Pr[Y=y]-\Pr[Z=y]|\,\varepsilon$ because $|\ln(\Pr[Y=y]/\Pr[Z=y])|\le\varepsilon$.

> [!theorem] Lemma 3.19 - Azuma's inequality for martingale-difference sums (pp. 47-48)
> Let $C_1,\dots,C_k$ be real-valued random variables with $\Pr[|C_i|\le\alpha]=1$ and, for every $(c_1,\dots,c_{i-1})\in\mathrm{Supp}(C_1,\dots,C_{i-1})$, $\mathbb{E}[C_i\mid C_1=c_1,\dots,C_{i-1}=c_{i-1}]\le\beta$. Then for every $z>0$:
> $$\Pr\Big[\sum_{i=1}^kC_i>k\beta+z\sqrt k\cdot\alpha\Big]\le e^{-z^2/2}.$$
^lem-azuma-dp

## Examples

**Two-hospital composition and budget split (derived).** A lab runs three analyses on the same cohort with $(0.2,10^{-6})$, $(0.3,0)$ and $(0.5,2\times10^{-6})$: by Thm. 3.16 the total is $(1.0,3\times10^{-6})$. If the total budget is $\varepsilon=1$ and there are 10 equally important reports, each can use $\varepsilon=0.1$ under basic composition.

```python
import numpy as np
rng = np.random.default_rng(0)
# Why composition must degrade: averaging k repeated eps-DP Laplace answers of one count converges to the truth
true, eps = 100.0, 0.5
for k in (1, 10, 100, 1000):
    ans = true + rng.laplace(0, 1/eps, size=k)
    print(k, abs(ans.mean() - true).round(3), "total eps (basic) =", k*eps)
# Max-divergence of two Laplace outputs for a count with sensitivity 1 equals eps
z = np.linspace(80, 120, 100001)
lp = lambda mu: np.exp(-eps*np.abs(z-mu))*eps/2
print(np.log(lp(100)/lp(101)).max(), eps)      # D_inf = eps
```

## Connections

- **Marketing measurement.** Basic composition is the accounting rule for "privacy budget" across weekly reports: a total budget $\varepsilon_{\text{total}}$ over $T$ releases means $\varepsilon_{\text{total}}/T$ each unless advanced composition is used. Because repeated releases of the same time series average away the noise, a reporting cadence is a privacy decision as well as an analytic one.
- Max-divergence is the likelihood-ratio language for the hypothesis-testing view of DP in [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]].

## See Also

- [[Dwork Roth 2014 - Advanced Composition and the Gaussian Mechanism]]
- [[Dwork Roth 2014 - Sparse Vector Technique]]
- [[Dwork 2006 - Postprocessing, Composition and Group Privacy]] (adaptive $\varepsilon$-DP composition with a budget)
