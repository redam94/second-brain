---
title: "Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Wasserman 2010 - A Statistical Framework for Differential Privacy.pdf]]"
source_location: "Sec. 5 Exponential Mechanism incl. Lemma 5.1, Def. 5.2, Thm. 5.3, 5.1 KS distance (Thm. 5.4), 5.2 The mean (pp. 13-15); Proofs 9.8-9.10 (pp. 28-32)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Wasserman Zhou 2010 - A Statistical Framework for Differential Privacy"
doc_type: paper
depends_on:
  - "[[Wasserman Zhou 2010 - Setup, Data Release Mechanisms and Differential Privacy]]"
  - "[[Wasserman Zhou 2010 - Informative Mechanisms and the Impossibility Theorem]]"
used_by:
  - "[[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]]"
  - "[[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]]"
aliases:
  - Small ball probability bound for the exponential mechanism
  - Theorem 5.3 Wasserman Zhou
  - Exponential mechanism KS rate n^{-1/3}
---

# Wasserman Zhou 2010 - Exponential Mechanism and Small Ball Probabilities

> [!summary]
> For an exponential mechanism whose loss is $\rho(\hat F_x,\hat F_z)$, accuracy is controlled by a **small ball probability** $R(k,\epsilon)=P^k(\rho(F,\hat G)\le\epsilon)$, the chance that an i.i.d. sample of size $k$ from $P$ has empirical cdf within $\epsilon$ of $F$ (Thm. 5.3). Choosing $k$ is delicate: too large breaks privacy-accuracy, too small breaks accuracy. For the KS distance the mechanism achieves $\rho(F,\hat F_Z)=O_P(n^{-1/3})$ with $k_n\asymp n^{2/3}$ (Thm. 5.4), slower than the non-private $n^{-1/2}$. This is the first link the authors know between DP and small ball probabilities.

## Overview

The paper establishes three facts about exponential mechanisms (p. 13): (1) choosing the released size $k$ is delicate ("Taking $k$ too large compromises privacy. Taking $k$ too small compromises accuracy"); (2) accuracy can be bounded by a simple formula containing a small ball probability, a well-studied object in probability theory; (3) the formula applies to the KS distance, the mean, and Sobolev-class density estimation, and in each case gives the choice of $k$ and the convergence rate. Because of Thm. 3.2 some assumption on $P$ is needed; here $P$ has a *bounded density* $p$ (weaker than Lipschitz).

## Main Content

The exponential mechanism (2) is used with $\xi(x,z)=\rho(\hat F_x,\hat F_z)$:
$$g_x(z)=\exp\!\Big(-\frac{\alpha\rho(\hat F_x,\hat F_z)}{2\Delta_{n,k}}\Big),\quad h(z\mid x)=\frac{g_x(z)}{\int_{[0,1]^{rk}}g_x(s)\,ds},\quad\Delta\equiv\Delta_{n,k}=\sup_{\substack{x,y\in\mathcal{X}^n\\ \delta(x,y)=1}}\sup_{z\in\mathcal{X}^k}|\rho(\hat F_x,\hat F_z)-\rho(\hat F_y,\hat F_z)|.\tag{9}$$

> [!theorem] Lemma 5.1 (p. 14)
> For the KS distance, $\Delta_{n,k}\le1/n$.
^lem-wz-ks-sensitivity

> [!proof]- Proof (Sec. 9.9, p. 30)
> By the triangle inequality, for all $z\in\mathcal{X}^k$ and all $x,y\in\mathcal{X}^n$: $|\rho(\hat F_x,\hat F_z)-\rho(\hat F_y,\hat F_z)|\le\rho(\hat F_x,\hat F_y)$. Changing one entry of $x$ changes $\hat F_x(t)$ by at most $1/n$ at every $t$, so $\sup_t|\hat F_x(t)-\hat F_y(t)|=1/n$.

(This framework is used in Blum et al. 2008.) For the rest of the section $Z=(Z_1,\dots,Z_k)$ is drawn from an exponential mechanism $Q_n$.

> [!definition] Definition 5.2 - small ball probability (p. 14)
> Let $F$ be the cdf of $P$ and $\hat G$ the empirical cdf of a sample of size $k$ from $P$. Then
> $$R(k,\epsilon)=P^k\big(\rho(F,\hat G)\le\epsilon\big)$$
> is called the **small ball probability** associated with $\rho$.
^def-wz-small-ball

> [!theorem] Theorem 5.3 - accuracy of the exponential mechanism (p. 14)
> Assume $P$ has a bounded density $p$ and that there is $\epsilon_n\to0$ with
> $$\mathbb{P}\Big(\rho(F,\hat F_X)>\frac{\epsilon_n}{16}\Big)=O\Big(\frac1{n^c}\Big)\tag{10}$$
> for some $c>1$. Further suppose $\rho$ satisfies the triangle inequality. Let $Z=(Z_1,\dots,Z_k)$ be drawn from $g_x(z)$ in (9). Then
> $$\mathbb{P}\big(\rho(F,\hat F_Z)>\epsilon_n\big)\le\frac{(\sup_xp(x))^k\exp\!\big(-\frac{3\alpha\epsilon_n}{16\Delta}\big)}{R(k,\epsilon_n/2)}+O\Big(\frac1{n^c}\Big).\tag{11}$$
> If $k=k_n$ can be chosen so the right-hand side tends to $0$, the mechanism is consistent.
^thm-wz-exponential-accuracy

> [!proof]- Proof (Sec. 9.8, pp. 28-30)
> Let $B_\epsilon=\{u\in\mathcal{X}^k:\rho(F,\hat F_u)\le\epsilon\}$ and $A_n=\{\rho(\hat F_X,F)\le\epsilon_n/16\}$, so $\mathbb{P}(A_n^c)=O(n^{-c})$ and $\mathbb{P}(\rho(F,\hat F_Z)>\epsilon_n)\le\mathbb{P}(\rho(F,\hat F_Z)>\epsilon_n,A_n)+O(n^{-c})$. Work on $A_n$.
> *Upper bound on the bad mass.* Triangle inequality: $\rho(\hat F_u,\hat F_X)\ge\rho(\hat F_u,F)-\rho(\hat F_X,F)$, so on $B_\epsilon^c$ (where $\rho(\hat F_u,F)>\epsilon$): $\int_{B_\epsilon^c}g_X(u)du\le\exp\!\big(\frac{\alpha\rho(\hat F_X,F)}{2\Delta}\big)\exp\!\big(-\frac{\alpha\epsilon}{2\Delta}\big)$ (the volume of the cube is 1).
> *Lower bound on the good mass.* $\rho(\hat F_u,\hat F_X)\le\rho(\hat F_u,F)+\rho(F,\hat F_X)$, so on $B_{\epsilon/2}$: $\int_{B_{\epsilon/2}}g_X(u)du\ge\exp\!\big(-\frac{\alpha\rho(F,\hat F_X)}{2\Delta}\big)\exp\!\big(-\frac{\alpha\epsilon}{4\Delta}\big)\mathrm{Vol}(B_{\epsilon/2})$. Multiply and divide by $\prod_ip(u_i)$ and bound $\prod p(u_i)\le(\sup p)^k$: $\mathrm{Vol}(B_{\epsilon/2})\ge\frac1{(\sup p)^k}\int_{B_{\epsilon/2}}\prod_ip(u_i)du=\frac{R(k,\epsilon/2)}{(\sup p)^k}$ (an i.i.d. draw from $p$ lies in $B_{\epsilon/2}$ with probability $R(k,\epsilon/2)$).
> *Combine.* The ratio of the two is at most $\frac{(\sup p)^k}{R(k,\epsilon/2)}\exp\!\big(\frac{\alpha\rho(\hat F_X,F)}{\Delta}-\frac{\alpha\epsilon}{4\Delta}\big)$. On $A_n$, $\rho(\hat F_X,F)\le\epsilon_n/16$, so the exponent is at most $\frac{\alpha\epsilon_n}{16\Delta}-\frac{\alpha\epsilon_n}{4\Delta}=-\frac{3\alpha\epsilon_n}{16\Delta}$, giving (11).

### 5.1 The KS distance

> [!theorem] Theorem 5.4 (p. 15)
> Suppose $P$ has a bounded density $p$ and let $B:=\log\sup_xp(x)>0$. Let $Z$ be drawn from $g_x(z)$ in (9) with $\rho$ the KS distance. By requiring
> $$k_n\asymp\Big(\frac{3\alpha}{B}\Big)^{2/3}n^{2/3},$$
> we have, for $\epsilon_n=2\big(\frac{B}{3\alpha}\big)^{1/3}n^{-1/3}$,
> $$\rho(F,\hat F_Z)=O_P(\epsilon_n).\tag{12}$$
^thm-wz-exponential-ks

So after sanitisation the rate is $n^{-1/3}$, slower than the non-private $n^{-1/2}$; "it is an open question whether this rate can be improved."

> [!proof]- Proof outline (Sec. 9.10, pp. 30-32)
> *(i) Condition (10).* The VC dimension of orthants $(-\infty,x_1]\times\dots\times(-\infty,x_r]$ is $r$, so $P\big(\sup_t|\hat F_X(t)-F(t)|>\epsilon_n/16\big)\le8n^r\exp\!\big(-n(\epsilon_n/16)^2/32\big)$. With $\epsilon_n\asymp n^{-1/3}$, $n\epsilon_n^2\asymp n^{1/3}$, so this is $\exp\{-c\,n^{1/3}+r\log n\}=O(n^{-c})$ for every $c$, and (10) holds.
> *(ii) Small ball probability.* $\sqrt k(\hat F_k-F)$ is approximated by a Brownian bridge $\mathbb{B}_k$ on $[0,1]^r$ (Csorgo and Revesz 1975): $\sup_t\big|\sqrt k(\hat F_k-F)(t)-\mathbb{B}_k(t)\big|=O\big((\log k)^{3/2}k^{-\gamma}\big)$ almost surely with $\gamma=1/(2(r+1))$, which is $o(1)$. The Brownian-sheet small ball estimate (Li and Shao 2001, Thm. 9.1 in the paper, stated for $r\ge3$): for $0<\epsilon\le1$, $\log P\big(\sup_{t\in[0,1]^r}|X_t|\le\epsilon\big)\ge-C_r\epsilon^{-2}\log^{2r-1}(1/\epsilon)$, and the same bound holds for a Brownian bridge. Applying it with radius $\sqrt k\epsilon/4$: $\log R(k,\epsilon/2)\ge-C_1\,\big|\log(\sqrt k\epsilon/4)\big|^{2r-1}\big/(k\epsilon^2)$. In the regime $\sqrt{k_n}\epsilon_n\asymp1$ (so $k_n\epsilon_n^2\asymp1$) the right side is a constant, so $R(k_n,\epsilon_n/2)$ is bounded away from zero.
> *(iii) Plug into (11).* With $\Delta\le1/n$ (Lemma 5.1) and $(\sup p)^k=e^{Bk}$, the first term of (11) is at most $\exp\{Bk_n-3\alpha n\epsilon_n/16\}\cdot O(1)$. For $k_n=\frac1{16}(3\alpha/B)^{2/3}n^{2/3}$ and $\epsilon_n=2(B/3\alpha)^{1/3}n^{-1/3}$: $Bk_n=\frac1{16}(3\alpha)^{2/3}B^{1/3}n^{2/3}$ while $3\alpha n\epsilon_n/16=\frac1{8}(3\alpha)^{2/3}B^{1/3}n^{2/3}=2Bk_n$. The exponent is therefore $-Bk_n=-c\,n^{2/3}$ and the bound tends to $0$. Remark 9.2: any $k_n=C_4\big((3\alpha/B)n\big)^{2/3}$ with $C_4\ge1/16$ (and $\epsilon_n$ rescaled correspondingly) works with different constants, and in all cases $\sqrt{k_n}\epsilon_n\asymp1$.

The key balance: privacy-weighted loss $\alpha n\epsilon_n$ must beat the entropy cost $Bk_n$ of specifying $k$ points, and the small ball probability must not decay: $k_n\epsilon_n^2\asymp1$ gives $\epsilon_n\asymp k_n^{-1/2}$, and $\alpha n\epsilon_n\gtrsim k_n$ gives $k_n\lesssim\alpha n\epsilon_n$; solving yields $k_n\asymp n^{2/3}$, $\epsilon_n\asymp n^{-1/3}$.

### 5.2 The mean

Take $\rho(F,\hat F_Z)=\|\mu-\bar Z\|^2$ with $\mu=\int x\,dP(x)$ and $\bar Z$ the sample mean of $Z$. Then $\Delta\le r/n$ and $h(u\mid x)\approx e^{-n\|\bar X-\bar Z\|^2/(2\alpha)}$, so (approximately) $Z_1,\dots,Z_k\sim N(\bar X,k\alpha/n)$. It suffices to take $k=1$: then $\bar Z=\bar X+O_P(1/\sqrt n)$, so $\bar Z$ converges at the same rate as $\bar X$. "This is not surprising: preserving a single piece of information requires a database of size $k=1$."

## Examples

**KS constants (own computation).** $n=10^4$, $\alpha=1$, density bound $\sup p=e$ ($B=1$): $k_n\asymp(3)^{2/3}n^{2/3}\approx2.08\times464\approx966$ released points; $\epsilon_n=2(1/3)^{1/3}n^{-1/3}\approx0.064$ versus the non-private rate scale $n^{-1/2}=0.01$. Doubling the privacy budget ($\alpha=2$) raises $k_n$ by a factor $2^{2/3}=1.59$ and lowers $\epsilon_n$ by $2^{-1/3}=0.79$.

```python
import math
def ks_exponential_mechanism_design(n, alpha, B):
    k = (3*alpha/B)**(2/3) * n**(2/3)
    eps = 2*(B/(3*alpha))**(1/3) * n**(-1/3)
    return k, eps
print(ks_exponential_mechanism_design(10_000, 1.0, 1.0))   # about (966, 0.064)
print(ks_exponential_mechanism_design(10_000, 2.0, 1.0))
```

## Connections

- **Marketing measurement.** The exponential mechanism releases *structured objects* (a whole synthetic dataset, a selected model) rather than noisy numbers. The slower rate $n^{-1/3}$ illustrates the price of generality: methods that release a reusable synthetic dataset pay more statistical accuracy than methods that release noisy sufficient statistics. For measurement practice, prefer releasing the specific aggregates (counts, sums, covariance) the analysis needs; use synthetic-data releases when exploratory flexibility is essential ([[Dwork 2006 - Interactive versus Non-Interactive Separation Results]] shows why).
- Small ball probabilities are a general tool for how many samples a mechanism can afford to release; for $k$ points to be informative they must be able to reproduce the truth within $\epsilon$ with non-negligible probability.

## See Also

- [[Wasserman Zhou 2010 - Orthogonal Series Density Estimation]]
- [[Wasserman Zhou 2010 - Rate Tables, Simulation and Open Questions]]
- [[Dwork Roth 2014 - Report Noisy Max and the Exponential Mechanism]] (generic utility analysis, $O(\frac{\Delta u}{\varepsilon}\ln|R|)$)
