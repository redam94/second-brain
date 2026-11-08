---
title: "Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/definition
  - doc/paper
source: "[[raw/Wasserman 2010 - A Statistical Framework for Differential Privacy.pdf]]"
source_location: "Sec. 1 (pp. 1-3), Sec. 2 up to Thm. 2.5 and Lemma 2.6 (pp. 4-7), Proof of Lemma 2.6 (p. 20)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy"
doc_type: paper
depends_on:
  - "[[Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy - Overview]]"
  - "[[Dwork 2006 - Differential Privacy Definition and Basic Examples]]"
used_by:
  - "[[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]]"
  - "[[Wasserman Zhou 2010 - Histogram Release Mechanisms]]"
  - "[[Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities]]"
aliases:
  - Data release mechanism Q_n
  - Sanitized database (Wasserman Zhou)
  - alpha-differential privacy in statistical notation
---

# Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy

> [!summary]
> The paper models disclosure limitation as a **data release mechanism** $Q_n(\cdot\mid X)$, a conditional distribution of a sanitized database $Z=(Z_1,\dots,Z_k)$ given the input database $X=(X_1,\dots,X_n)$. $\alpha$-differential privacy bounds the ratio of $Q_n$ probabilities for databases at Hamming distance 1 by $e^{\alpha}$. Three closure facts (Lemma 2.6) make mechanisms easy to build: postprocessing, i.i.d. resampling from a private density, and Laplace perturbation of a function with finite $\ell_1$ sensitivity.

## Overview

**Goal of the paper (p. 2).** "To explain differential privacy in statistical language, to show how to compare different privacy mechanisms by computing the rate of convergence of distributions and densities based on the released data $Z$, and to study a general privacy method, called the exponential mechanism, due to McSherry and Talwar (2007)." Two disclaimers: the paper does not compare DP to other privacy approaches, and it studies statistical properties only, not computational efficiency.

**Literature context (Sec. 1).** Disclosure limitation methods listed: clustering (Sweeney; Aggarwal et al.), $\ell$-diversity, $t$-closeness, data swapping, matrix masking, cryptographic approaches, data perturbation, distributed-database methods; statistical references include Duncan-Lambert, Reiter. Closely related DP work: Blum-Ligett-Roth (2008, a machine-learning approach that inspired the paper); Smith (2008), who constructs efficient DP point estimators for parametric models with mean squared error $(1+o(1))/(nI(\theta))$ with $I(\theta)$ the Fisher information; Machanavajjhala et al. (2008), privacy for histograms by sampling from a Dirichlet posterior over cell probabilities (compared in the histogram note). Later work noted: Ghosh et al. (2009), Dwork-Lei (2009), Dwork et al. (2009), Feldman et al. (2009).

## Main Content

### Data and mechanism

> [!definition] Setup (pp. 4-5)
> $X_1,\dots,X_n$ are i.i.d. from distribution $P$ with $X_i\in\mathcal{X}\equiv[0,1]^r$ ($r\ge1$; chosen "to avoid unnecessary technicalities", since "it is difficult to extend differential privacy to unbounded domains"). $\mu$ is Lebesgue measure and $p=dP/d\mu$ if it exists. $X=(X_1,\dots,X_n)\in\mathcal{X}^n$ is the **database**. A mechanism outputs a **sanitized database** $Z=(Z_1,\dots,Z_k)\in\mathcal{X}^k$ for public release; $k=k(n)$ may differ from $n$ ("large $k$ can lead to low privacy and high accuracy while small $k$ can lead to high privacy and low accuracy").
^def-wz-setup

> [!definition] Data release mechanism (p. 5)
> A **data release mechanism** $Q_n(\cdot\mid X)$ is a conditional distribution for $Z$ given $X$: $Q_n(B\mid X=x)$ is the probability that the output lies in $B\in\mathcal{B}$ (measurable subsets of $\mathcal{X}^k$) when the input is $x$. The marginal law of $Z$ is $M_n(B)=\int Q_n(B\mid X=x)\,dP^n(x)$, with $P^n$ the $n$-fold product measure.
^def-wz-mechanism

> [!example] Example 2.1 - adding noise (p. 5)
> $Z_i=X_i+\epsilon_i$ with $\epsilon_1,\dots,\epsilon_n$ independent mean-zero draws from a known density $h$. Then $Q_n$ has density $q_n(z_1,\dots,z_n\mid x_1,\dots,x_n)=\prod_{i=1}^nh(z_i-x_i)$.
^ex-wz-additive-noise

> [!definition] Definition 2.2 - Hamming distance (p. 5)
> For databases $X=(X_1,\dots,X_n)$ and $Y=(Y_1,\dots,Y_n)$, $\delta(X,Y)=\#\{i:X_i\ne Y_i\}$.
^def-wz-hamming

> [!definition] Exponential mechanism (pp. 5-6)
> Let $\xi:\mathcal{X}^n\times\mathcal{X}^k\to[0,\infty)$ be any function; each $\xi$ defines a different exponential mechanism. Let
> $$\Delta\equiv\Delta_{n,k}=\sup_{x,y\in\mathcal{X}^n:\ \delta(x,y)=1}\ \sup_{z\in\mathcal{X}^k}|\xi(x,z)-\xi(y,z)|\tag{1}$$
> be the maximum change in $\xi$ caused by altering one entry of $x$. Draw $(Z_1,\dots,Z_k)$ from the density
> $$h(z\mid x)=\frac{\exp\!\big(-\frac{\alpha\,\xi(x,z)}{2\Delta_{n,k}}\big)}{\int_{\mathcal{X}^k}\exp\!\big(-\frac{\alpha\,\xi(x,s)}{2\Delta_{n,k}}\big)ds},\qquad\alpha\ge0.\tag{2}$$
> Then $Q_n$ has density $h(z\mid x)$. Here $\xi$ is a *loss* (small is likely), the negative of the utility in [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]].
^def-wz-exponential-mechanism

> [!definition] Definition 2.3 - $\alpha$-differential privacy (p. 6)
> For $\alpha\ge0$, $Q_n$ satisfies **$\alpha$-differential privacy** if
> $$\sup_{\substack{x,y\in\mathcal{X}^n\\ \delta(x,y)=1}}\ \sup_{B\in\mathcal{B}}\frac{Q_n(B\mid X=x)}{Q_n(B\mid X=y)}\le e^{\alpha},\tag{3}$$
> with the ratio interpreted as $1$ when numerator and denominator are both $0$.
^def-wz-dp

*Why ratios.* "It is crucial to measure closeness by ratios of probabilities since that protects rare cases which have small probability under $Q_n$." If changing one entry cannot change $Q_n(\cdot\mid X=x)$ much, "a single individual cannot guess whether he is in the original database or not". The closer $e^{\alpha}$ is to $1$, the stronger the guarantee, so $\alpha$ is typically close to $0$. (This is the Hamming/replace-one version, so neighbours differ by *replacing* one record, whereas [[Dwork 2006 - Differential Privacy Definition and Basic Examples]] counted add/remove as distance 1 and noted a factor 2 between the two.)

> [!theorem] Theorem 2.5 (McSherry and Talwar 2007, their Theorem 6; p. 7)
> The exponential mechanism satisfies $\alpha$-differential privacy.
^thm-wz-exponential-dp

(The paper cites rather than proves it; the proof is reproduced in [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]], Thm. 3.10.)

### Closure facts

A function $T(X,R)$ of $X$ and an auxiliary random variable $R$ independent of $X$ satisfies DP if for all $B$ and all $x,x'$ with $\delta(x,x')=1$: $P(T(X,R)\in B\mid X=x)\le e^{\alpha}P(T(X,R)\in B\mid X=x')$.

> [!theorem] Lemma 2.6 (p. 7; part 3 is Proposition 1 of Dwork, McSherry, Nissim, Smith 2006)
> 1. If $T(X,R)$ satisfies DP then $U=h(T(X,R))$ satisfies DP for any measurable $h$ (postprocessing).
> 2. Suppose $g$ is a density constructed from a random vector $T(X,R)$ that satisfies DP. Let $Z=(Z_1,\dots,Z_k)$ be $k$ i.i.d. draws from $g$. Then the mechanism $Q_n(B\mid X)=P(Z\in B\mid X)$ satisfies DP **for any $k$**.
> 3. Let $f(x)$ be a function of $x=(x_1,\dots,x_n)$ with $S(f)=\sup_{x,x':\delta(x,x')=1}\|f(x)-f(x')\|_1$ and $\|a\|_1=\sum_j|a_j|$. If $R$ has density $g(r)\propto e^{-\alpha|r|/S(f)}$ then $T(X,R)=f(X)+R$ satisfies DP.
^thm-wz-closure

> [!proof]- Proof of parts 1 and 2 (p. 20)
> *Part 1.* $P(h(T)\in B\mid X=x)=P(T\in h^{-1}(B)\mid X=x)\le e^{\alpha}P(T\in h^{-1}(B)\mid X=x')=e^{\alpha}P(h(T)\in B\mid X=x')$. *Part 2.* $Z$ is independent of $X$ given $T=T(X,R)$ (it is drawn from $g$ built from $T$). With $H$ the law of $T$,
> $$P(Z\in B\mid X=x)=\int P(Z\in B\mid T=t)\,dH(t\mid X=x)=\int P(Z\in B\mid T=t)\frac{dH(t\mid X=x)}{dH(t\mid X=x')}dH(t\mid X=x')\le e^{\alpha}P(Z\in B\mid X=x'),$$
> because the DP of $T$ bounds the Radon-Nikodym derivative by $e^{\alpha}$. *Part 3* is the Laplace mechanism ([[Dwork 2006 - Sensitivity and the Laplace Mechanism]]; the parametrisation here is $g(r)\propto e^{-\alpha|r|/S(f)}$, i.e. $\mathrm{Lap}(S(f)/\alpha)$ with Hamming neighbours).

**Why Lemma 2.6(2) matters.** Once a *density* (histogram estimate, orthogonal-series estimate) is released privately, any number $k$ of synthetic points sampled from it is free. The accuracy-privacy trade-off in $k$ then arises only for mechanisms (like the smoothed histogram) that sample from a density which itself depends on the data without noise.

## Examples

**Additive noise is not automatically private (own illustration).** In Example 2.1 with $h=\mathrm{Lap}(b)$ and $X_i\in[0,1]$, changing one $X_i$ changes $\sum_i|z_i-x_i|$ by at most $1$, so the density ratio is at most $e^{1/b}$, and the mechanism is $\alpha$-DP with $\alpha=1/b$. Releasing all $n$ perturbed records $z_i$ therefore costs $b=1/\alpha$ per record, so the noise standard deviation per record is $\sqrt2/\alpha$ regardless of $n$. For $\alpha=0.1$ the noise sd is $14$, vastly exceeding the data range $[0,1]$: each released record is almost pure noise, though sample averages still concentrate (error $\sqrt2/(\alpha\sqrt n)$).

```python
import numpy as np
rng = np.random.default_rng(0)
n, alpha = 10_000, 0.1
x = rng.beta(10, 10, n)
z = x + rng.laplace(0, 1/alpha, n)          # Example 2.1 with Laplace(1/alpha): alpha-DP for X in [0,1]
print(x.mean(), z.mean(), np.sqrt(2)/(alpha*np.sqrt(n)))   # mean recovered to within ~0.14 (one sd)
```

## Connections

- **Marketing measurement.** Lemma 2.6(2) is the formal reason a platform can hand out many "synthetic" rows (or an analyst can bootstrap from a DP summary) without further privacy cost: the privacy has been spent on the density estimate. Analysts working with released histograms can treat them as data and model the known noise.
- The bounded-domain assumption ($X\in[0,1]^r$) mirrors the practical need to clip spend, revenue or tenure before releasing aggregates ([[Dwork 2006 - Low-Sensitivity Functions and Applications]]).

## See Also

- [[Wasserman Zhou 2010 - Differential Privacy as a Hypothesis-Testing Constraint]]
- [[Wasserman Zhou 2010 - Histogram Release Mechanisms]]
- [[Dwork 2006 - Differential Privacy Definition and Basic Examples]]
