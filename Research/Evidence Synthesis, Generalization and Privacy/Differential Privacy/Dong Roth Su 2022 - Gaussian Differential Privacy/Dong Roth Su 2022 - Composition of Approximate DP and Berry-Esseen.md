---
title: "Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Dong Roth Su 2022 - Gaussian Differential Privacy.pdf]]"
source_location: "Sec. 3.3, Eqs. (11)-(13), Theorems 3.6-3.7, Figure 5; Appendices D-E, pp. 18-20 and 50-73"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dong Roth Su 2022 - Gaussian Differential Privacy"
doc_type: paper
depends_on:
  - "[[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]]"
used_by:
  - "[[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]]"
aliases:
  - composing epsilon-delta DP via CLT
  - beating Berry-Esseen privacy
  - f_eps_delta tensor decomposition
---

# Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen

> [!summary]
> $(\varepsilon,\delta)$-DP is $f_{\varepsilon,\delta}=f_{\varepsilon,0}\otimes f_{0,\delta}$, so the $\varepsilon$-part and the $\delta$-part compose separately: $\delta$'s combine as $1-\prod(1-\delta_i)$ and the $\varepsilon$-part converges to GDP. Theorem 3.6 gives the limit $G_\mu\otimes f_{0,1-e^{-\delta}}$, i.e. testing $\mathcal N(0,1)\times U[0,1]$ against $\mathcal N(\mu,1)\times U[1-e^{-\delta},2-e^{-\delta}]$. Theorem 3.7 gives an $O(1/n)$ approximation error, beating the classical $O(1/\sqrt n)$ Berry-Esseen rate.

## Overview

The CLTs of Section 3.2 need $\kappa_3<\infty$ and so exclude $f_{\varepsilon,\delta}$ with $\delta>0$ (where $f(0)<1$). Section 3.3 handles $(\varepsilon,\delta)$-DP by splitting off the $\delta$ part.

## Main Content

> [!theorem] Decomposition of $f_{\varepsilon,\delta}$ (Eqs. 11-13)
> $$f_{\varepsilon,\delta}=f_{\varepsilon,0}\otimes f_{0,\delta}.\tag{11}$$
> $$f_{0,\delta_1}\otimes f_{0,\delta_2}=f_{0,\,1-(1-\delta_1)(1-\delta_2)},\tag{12}$$
> so $f_{0,\delta_1}\otimes\cdots\otimes f_{0,\delta_n}=f_{0,1-(1-\delta_1)\cdots(1-\delta_n)}$. The function $f_{0,\delta}$ is the trade-off function of shifted uniforms: $f_{0,\delta}=T(U[0,1],U[\delta,1+\delta])$. In general tensoring with $f_{0,\delta}$ rescales the graph of $f$ toward the origin by $1-\delta$:
> $$f\otimes f_{0,\delta}(\alpha)=\begin{cases}(1-\delta)\,f\!\big(\tfrac\alpha{1-\delta}\big),&0\le\alpha\le1-\delta,\\0,&1-\delta\le\alpha\le1.\end{cases}\tag{13}$$
> ($f\otimes f_{0,\delta}$ is symmetric if $f$ is; (11) and (12) follow from (13).)
^thm-fed-decomposition

> [!theorem] Theorem 3.6 (CLT for $(\varepsilon,\delta)$-DP)
> Let $(\varepsilon_{ni},\delta_{ni})$ be a triangular array with $\sum_i\varepsilon_{ni}^2\to\mu^2$, $\max_i\varepsilon_{ni}\to0$, $\sum_i\delta_{ni}\to\delta$, $\max_i\delta_{ni}\to0$ for constants $\mu,\delta\ge0$. Then uniformly on $[0,1]$,
> $$f_{\varepsilon_{n1},\delta_{n1}}\otimes\cdots\otimes f_{\varepsilon_{nn},\delta_{nn}}\ \longrightarrow\ G_\mu\otimes f_{0,\,1-e^{-\delta}}.$$
^thm-clt-eps-delta

Meaning: distinguishing neighbors from the composed output is at least as hard as distinguishing $\mathcal N(0,1)\times U[0,1]$ from $\mathcal N(\mu,1)\times U[1-e^{-\delta},2-e^{-\delta}]$ (for small $\delta$, $e^{-\delta}\approx1-\delta$ so the uniform shift is about $\delta$). This gives a global approximation of the tensor product in $O(n)$ time with a closed form, whereas Murtagh-Vadhan showed finding the smallest $\varepsilon$ with $f_{\varepsilon,\delta}\le f_{\varepsilon_1,\delta_1}\otimes\cdots\otimes f_{\varepsilon_n,\delta_n}$ is #P-hard for any $\delta$ (equivalently, evaluating the conjugate at any point), with an FPTAS in $O(n^3)$ for a single $\delta$.

Theorem 3.6 is silent on the error for moderate $n$. Theorem 3.4 gives a non-asymptotic normal approximation with error $\gamma=O(1/\sqrt n)$ under mild conditions (Corollary D.7), which is too coarse for tight guarantees ($1/\sqrt{50}\approx0.14$ at $n=50$).

> [!theorem] Theorem 3.7 (beating Berry-Esseen)
> Fix $\mu>0$ and set $\varepsilon=\mu/\sqrt n$. There is a constant $c>0$ depending only on $\mu$ such that for all $n\ge1$ and $c/n\le\alpha\le1-c/n$,
> $$G_\mu\Big(\alpha+\frac cn\Big)-\frac cn\ \le\ f_{\varepsilon,0}^{\otimes n}(\alpha)\ \le\ G_\mu\Big(\alpha-\frac cn\Big)+\frac cn.$$
^thm-beating-be

Simulations suggest $c\approx0.1$ for $\mu=1$: with $n=10$ the difference between $G_1$ and $f_{\varepsilon,0}^{\otimes10}$ is below 0.013 pointwise. Numerical evidence suggests the same $O(1/n)$ rate in the inhomogeneous case when the $\varepsilon_i$ are roughly the same size; a proof is open. It extends to $\delta\ne0$ through decomposition (11).

*Proof idea (Appendix E).* Kairouz-Oh-Viswanath showed $f_{\varepsilon,0}^{\otimes n}=T\big(B(n,p_\varepsilon),B(n,q_\varepsilon)\big)$ with $p_\varepsilon=\frac1{1+e^\varepsilon}$, $q_\varepsilon=\frac{e^\varepsilon}{1+e^\varepsilon}$ and $B(n,p)$ binomial. Directly approximating these binomials cannot beat $1/\sqrt n$ because Berry-Esseen is rate-optimal for binomials; the proof instead exploits a **smoothing effect** that comes for free in testing, analogous to the continuity correction for normal approximations to binomial probabilities.

## Examples

> [!example] Figure 5: ten compositions of $(1/\sqrt{10},0)$-DP
> Setup: $n=10$ mechanisms, each $\varepsilon_0=1/\sqrt{10}$-DP, so $\mu=\sqrt{n}\varepsilon_0=1$.
> Solution: the exact composition is the binomial testing problem above. At $\delta=0.001$ the smallest $\varepsilon$ with exact composition $(\varepsilon,\delta)$-DP is $2.89$ (the paper's dashed curve; recomputed here as $2.8897$). The GDP curve $G_1$ gives $\varepsilon=3.14$ at the same $\delta$ (recomputed). The paper reports that the CLT curve is "almost perfect" against the exact trade-off while the tightest single $(\varepsilon,\delta)$ approximation is visibly looser.
> Interpretation: the CLT approximation is not a one-sided bound (at this $\delta$ the exact $\varepsilon$ is slightly below the GDP-implied one); it is an accurate approximation of the whole curve, which a single $(\varepsilon,\delta)$ pair cannot be.
^ex-fig5

```python
import numpy as np
from scipy import stats
from scipy.stats import norm
from scipy.optimize import brentq

def exact_delta(eps0, n, eps):
    """delta(eps) of f_{eps0,0}^{(x)n} via the binomial representation (Kairouz-Oh-Viswanath)."""
    p = np.exp(eps0) / (1 + np.exp(eps0)); q = 1 - p
    k = np.arange(n + 1)
    P, Q = stats.binom.pmf(k, n, p), stats.binom.pmf(k, n, q)
    return np.sum(np.maximum(P - np.exp(eps) * Q, 0.0))

def gdp_delta(mu, eps):
    return norm.cdf(-eps / mu + mu / 2) - np.exp(eps) * norm.cdf(-eps / mu - mu / 2)

n, eps0, d = 10, 1 / np.sqrt(10), 1e-3
print(brentq(lambda e: exact_delta(eps0, n, e) - d, 0, 10))        # about 2.89 (exact)
print(brentq(lambda e: gdp_delta(1.0, e) - d, 0, 10))              # about 3.14 (CLT / G_1)
```

> [!example] Combining $\delta$ parts
> Setup: 100 mechanisms each $(\varepsilon_i,\delta_i)=(0.05,10^{-7})$.
> Solution: $\mu=\sqrt{100\cdot0.0025}=0.5$; $\sum\delta_i=10^{-5}$ so the uniform part is $f_{0,1-e^{-10^{-5}}}\approx f_{0,10^{-5}}$. By (13) the result is $G_{0.5}$ scaled toward the origin by $1-10^{-5}$, practically $G_{0.5}$.
> Interpretation: when $\delta$'s are tiny relative to the $\varepsilon$ part, the $\varepsilon$ composition dominates and the whole guarantee is summarized by $\mu=0.5$ plus a negligible shift. (Illustrative arithmetic; Theorem 3.6 is asymptotic.)
^ex-delta-combine

## Connections

- Advanced composition via Renyi: [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]]; the $O(1/\sqrt n)$ Berry-Esseen rate in this paper's terms is what Theorem 3.7 improves.
- Subsampled version used for SGD: [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]].
- The #P-hardness context: Murtagh-Vadhan is discussed in [[Mironov 2017 - Renyi Divergence and the RDP Definition]].

## See Also

- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]
- [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]]
