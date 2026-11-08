---
title: "Dong Roth Su 2022 - Privacy Amplification by Subsampling"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Dong Roth Su 2022 - Gaussian Differential Privacy.pdf]]"
source_location: "Sec. 4: Definition 4.1, Theorem 4.2, Eq. (14), Corollary 4.3, Lemma 4.4, Proposition 4.5, Figure 6; Appendix F, pp. 20-24 and 73-79"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dong Roth Su 2022 - Gaussian Differential Privacy"
doc_type: paper
depends_on:
  - "[[Dong Roth Su 2022 - Post-Processing, Blackwell, Primal-Dual and Group Privacy]]"
  - "[[Dong Roth Su 2022 - Trade-off Functions and f-DP]]"
used_by:
  - "[[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]]"
aliases:
  - f-DP subsampling theorem
  - p-sampling operator C_p
  - privacy amplification by subsampling f-DP
---

# Dong Roth Su 2022 - Privacy Amplification by Subsampling

> [!summary]
> If $M$ is $f$-DP on datasets of size $m$, then running $M$ on a uniformly random $m$-subset of an $n$-dataset is $C_p(f)$-DP with $p=m/n$ and $C_p(f)=\min\{f_p,f_p^{-1}\}^{**}$, $f_p=pf+(1-p)\text{Id}$. For $(\varepsilon,\delta)$-DP this is strictly stronger than the classical $(\log(1-p+pe^\varepsilon),p\delta)$ bound. The theorem is proved by converting to $(\varepsilon,\delta)$ guarantees, applying the classical result, and converting back.

## Overview

Subsampling before a private mechanism amplifies privacy: a person not in the subsample enjoys perfect privacy, which happens with probability $1-p$. This was formalized for $(\varepsilon,\delta)$-DP by Kasiviswanathan et al. It fails for concentrated DP (CDP, zCDP), which motivated truncated CDP at the cost of complexity, and for Renyi DP it holds in a complex form (Wang-Balle-Kasiviswanathan). $f$-DP admits a simple, general statement.

## Main Content

**Setup.** For $1\le m\le n$ and a dataset $S$ of $n$ individuals, $\text{Sample}_m(S)$ is a uniformly random $m$-subset. For $M$ defined on $X^m$, the **subsampled mechanism** is $M\circ\text{Sample}_m$ (the intermediate subset is not released, which distinguishes it from composition).

> [!definition] Definition 4.1 ($p$-sampling operator)
> For $0\le p\le1$ write $f_p=pf+(1-p)\text{Id}$, where $\text{Id}(x)=1-x$. The **$p$-sampling operator** is
> $$
> C_p(f)\triangleq\min\{f_p,\ f_p^{-1}\}^{**},
> $$
> where $f_p^{-1}$ is the inverse defined in (4) and $h^{**}$ is the biconjugate (the greatest convex lower bound of $h$).
^def-p-sampling-operator

$C_p$ is a two-step transformation: **symmetrization** (min of $f_p$ and its inverse) and **convexification** (biconjugate). $C_p(f)$ is a symmetric trade-off function and $C_p(f)\le\min\{f_p,f_p^{-1}\}\le f_p$.

> [!theorem] Theorem 4.2 (subsampling)
> If $M$ is $f$-DP on $X^m$, then the subsampled mechanism $M\circ\text{Sample}_m$ is $C_p(f)$-DP on $X^n$, where the sampling ratio is $p=m/n$.
^thm-subsampling

**Properties of $C_p$ (qualitative amplification).**
1. For $0\le p\le q\le1$ and $f$ symmetric: $f=C_1(f)\le C_q(f)\le C_p(f)\le C_0(f)=\text{Id}$. As the sampling ratio falls from 1 to 0, privacy interpolates monotonically from $f$ to perfect privacy.
2. If $f\ge g$ then $C_p(f)\ge C_p(g)$ (more private stays more private).
3. $C_p(\text{Id})=\text{Id}$.

> [!theorem] Closed form (Eq. 14)
> For symmetric $f$, let $x^*$ be the unique fixed point $f(x^*)=x^*$. Then
> $$
> C_p(f)(x)=\begin{cases}f_p(x),&x\in[0,x^*],\\ x^*+f_p(x^*)-x,&x\in[x^*,f_p(x^*)],\\ f_p^{-1}(x),&x\in[f_p(x^*),1].\end{cases}
> $$
> (Proof in Appendix F.) The middle segment is the line of slope $-1$ joining the two curves, which is what the convexification produces.
^thm-cp-closed-form

> [!theorem] Corollary 4.3 (amplification for $(\varepsilon,\delta)$-DP)
> If $M$ is $(\varepsilon,\delta)$-DP on $X^m$ then $M\circ\text{Sample}_m$ is $C_p(f_{\varepsilon,\delta})$-DP on $X^n$, where
> $$
> C_p(f_{\varepsilon,\delta})(\alpha)=\max\Big\{f_{\varepsilon',\delta'}(\alpha),\ 1-p\delta-p\frac{e^\varepsilon-1}{e^\varepsilon+1}-\alpha\Big\},\qquad\varepsilon'=\log(1-p+pe^{\varepsilon}),\ \delta'=p\delta,\ p=\tfrac mn.
> $$
^thm-cp-eps-delta

> [!theorem] Lemma 4.4 (classical, Ullman)
> If $M$ is $(\varepsilon,\delta)$-DP then $M\circ\text{Sample}_m$ is $(\varepsilon',\delta')$-DP with $\varepsilon',\delta'$ as above, i.e. $f_{\varepsilon',\delta'}$-DP. Corollary 4.3 improves on it since $C_p(f_{\varepsilon,\delta})\ge f_{\varepsilon',\delta'}$ by (15).
^thm-ullman-subsampling

The improvement cannot be expressed in the $(\varepsilon,\delta)$ framework, and the loss from forcing the subsampled guarantee into $(\varepsilon',\delta')$ form compounds under composition. The paper states that the theorem holds for any subsampling scheme for which Lemma 4.4 holds, including independent coin flips per record.

### Proof of Theorem 4.2 (Sec. 4.2)

1. By Proposition 2.12, $M$ is $(\varepsilon,\delta(\varepsilon))$-DP for all $\varepsilon\ge0$ with $\delta(\varepsilon)=1+f^*(-e^\varepsilon)$.
2. By Lemma 4.4, $M\circ\text{Sample}_m$ satisfies, for each $\varepsilon\ge0$, $(\varepsilon',\delta')$-DP with $\varepsilon'=\log(1-p+pe^\varepsilon)$, $\delta'=p\,(1+f^*(-e^\varepsilon))$.
3. Eliminating $\varepsilon$ gives $\delta'=1+f_p^*(-e^{\varepsilon'})$ (Eq. 16, proved in Appendix F).
4. $f_p$ is asymmetric, so Proposition 2.12 cannot be applied directly; the paper extends it. Proposition 4.5 (special case of Proposition F.2): for a generic trade-off function $g$ let $\bar x=\inf\{x:g'(x)=-1\}$. If $g(\bar x)\ge\bar x$ and $M$ is $(\varepsilon,1+g^*(-e^\varepsilon))$-DP for all $\varepsilon\ge0$, then $M$ is $\min\{g,g^{-1}\}^{**}$-DP.
5. The condition holds for $g=f_p$: with $x^*$ the fixed point of $f$, $f'(x^*)=-1$ by symmetry about the $45^\circ$ line, so $f_p'(x^*)=-1$ and $\bar x\le x^*$; then $f_p(\bar x)\ge f_p(x^*)\ge f(x^*)=x^*\ge\bar x$ because $f_p$ is decreasing and $f_p\ge f$.

Tightness: the bound is tight if $f=0$ (the original mechanism is blatantly non-private), shown in Appendix F (Discussion, Sec. 6).

## Examples

> [!example] Figure 6 (right): $\varepsilon=3,\delta=0.1,p=0.2$
> Setup: an $(3,0.1)$-DP mechanism applied to a 20% subsample.
> Solution: $\varepsilon'=\log(0.8+0.2e^3)=1.572$, $\delta'=0.02$. At type I level $\alpha=0.3$: the classical bound gives $f_{\varepsilon',\delta'}(0.3)=\max\{0,0.98-4.816(0.3),0.2076\times0.68\}=0.141$, whereas Corollary 4.3 gives $\max\{0.141,\ 0.799-0.3\}=0.499$. The smallest guaranteed sum of type I and II errors is $0.799$ with Corollary 4.3, $0.337$ with the classical bound, and $0.086$ with no subsampling (all recomputed).
> Interpretation: the paper's remark that the improvement is "the shaded triangle" between $C_p(f_{\varepsilon,\delta})$ and $f_{\varepsilon',\delta'}$ corresponds to a much higher guaranteed floor on the attacker's total error. (The paper's text describes this as the minimal error sum "can be significantly lower than the prediction of Lemma 4.4"; since $C_p\ge f_{\varepsilon',\delta'}$ the guaranteed minimum is higher, so "lower" here is best read as a wording slip about the attacker's *advantage* being lower. This is this note's reading.)
^ex-fig6

```python
import numpy as np

def f_eps_delta(a, eps, delta):
    return max(0.0, 1 - delta - np.exp(eps) * a, np.exp(-eps) * (1 - delta - a))

def Cp_eps_delta(a, eps, delta, p):      # Corollary 4.3
    e0, d0 = np.log(1 - p + p * np.exp(eps)), p * delta
    line = 1 - p * delta - p * (np.exp(eps) - 1) / (np.exp(eps) + 1) - a
    return max(f_eps_delta(a, e0, d0), line)

eps, delta, p = 3.0, 0.1, 0.2
grid = np.linspace(0, 1, 2001)
print(np.log(1 - p + p * np.exp(eps)), p * delta)                          # 1.572, 0.02
print(min(a + Cp_eps_delta(a, eps, delta, p) for a in grid))               # 0.799 (Cor. 4.3)
print(min(a + f_eps_delta(a, np.log(1 - p + p * np.exp(eps)), p * delta) for a in grid))  # 0.337 (Lemma 4.4)
print(min(a + f_eps_delta(a, eps, delta) for a in grid))                   # 0.086 (no subsampling)
```

## Connections

- Used to analyze noisy SGD, where every step is a subsampled Gaussian mechanism: [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]]. The moments accountant had to bypass the missing amplification statement for divergence-based notions: [[Abadi 2016 - Moments Accountant Theorems and Proofs]].
- Experiments/surveys that sample users (e.g. sampled user panels for lift studies) are subsampled mechanisms; whether DP amplification applies depends on the sampling being secret and independent of the data; see [[Conversion Lift Studies on Ad Platforms]]. This is a mapping, not a claim of the paper.

## See Also

- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]
- [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]]
