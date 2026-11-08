---
title: "Mironov 2017 - From RDP to Approximate DP and Advanced Composition"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Mironov 2017 - Renyi Differential Privacy.pdf]]"
source_location: "Sec. IV (Proposition 3) and Sec. V (Lemma 1, Proposition 4, Corollary 1, Remark 3), pp. 5-7"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Mironov 2017 - Renyi Differential Privacy"
doc_type: paper
depends_on:
  - "[[Mironov 2017 - RDP Properties and Composition]]"
  - "[[Mironov 2017 - Appendix Renyi Divergence Properties]]"
used_by:
  - "[[Mironov 2017 - Discussion, Budget Curves and Open Questions]]"
  - "[[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]]"
aliases:
  - RDP to DP conversion
  - Mironov advanced composition
  - Proposition 3 RDP conversion
---

# Mironov 2017 - From RDP to Approximate DP and Advanced Composition

> [!summary]
> An $(\alpha,\varepsilon)$-RDP mechanism is $\big(\varepsilon+\frac{\log(1/\delta)}{\alpha-1},\delta\big)$-DP for every $0<\delta<1$ (Proposition 3). Combining that with the bound $D_\alpha\le2\alpha\varepsilon^2$ for any $\varepsilon$-DP mechanism (Lemma 1) and additivity gives an advanced composition theorem proved entirely in RDP language: $n$-fold $\varepsilon$-DP composition is $(4\varepsilon\sqrt{2n\log(1/\delta)},\delta)$-DP when $\log(1/\delta)\ge\varepsilon^2n$.

## Overview

Section IV reduces RDP to $(\varepsilon,\delta)$-DP; Section V proves a composition theorem whose structure follows Dwork-Rothblum-Vadhan but is phrased without explicit probability arguments. The first is the route by which almost all RDP accounting is eventually reported.

## Main Content

> [!theorem] Proposition 3 (from RDP to $(\varepsilon,\delta)$-DP)
> If $f$ is an $(\alpha,\varepsilon)$-RDP mechanism, it also satisfies $\big(\varepsilon+\frac{\log(1/\delta)}{\alpha-1},\,\delta\big)$-differential privacy for any $0<\delta<1$.
^thm-rdp-to-dp

*Proof.* Let $\varepsilon'=\varepsilon+\frac1{\alpha-1}\log\frac1\delta$ and write $Q=\Pr[f(D')\in S]$. By Proposition 10 (probability preservation), $\Pr[f(D)\in S]\le(e^\varepsilon Q)^{1-1/\alpha}$. *Case I* ($e^\varepsilon Q>\delta^{\alpha/(\alpha-1)}$): $(e^\varepsilon Q)^{1-1/\alpha}=e^\varepsilon Q\cdot(e^\varepsilon Q)^{-1/\alpha}\le e^\varepsilon Q\,\delta^{-1/(\alpha-1)}=\exp\big(\varepsilon+\tfrac{\log(1/\delta)}{\alpha-1}\big)Q=e^{\varepsilon'}Q$ (the middle step uses $e^\varepsilon Q>\delta^{\alpha/(\alpha-1)}$, i.e. $(e^\varepsilon Q)^{-1/\alpha}<\delta^{-1/(\alpha-1)}$). *Case II* ($e^\varepsilon Q\le\delta^{\alpha/(\alpha-1)}$): $\Pr[f(D)\in S]\le(e^\varepsilon Q)^{1-1/\alpha}\le\delta$. In both cases $\Pr[f(D)\in S]\le\max(e^{\varepsilon'}Q,\delta)$, which is stronger than $(\varepsilon',\delta)$-DP.

Since $\alpha$ is free, one reports $\min_\alpha\{\varepsilon(\alpha)+\log(1/\delta)/(\alpha-1)\}$.

> [!theorem] Lemma 1 (RDP curve of a pure-DP mechanism)
> If $P,Q$ satisfy $D_\infty(P\Vert Q)\le\varepsilon$ and $D_\infty(Q\Vert P)\le\varepsilon$, then for $\alpha\ge1$, $D_\alpha(P\Vert Q)\le2\alpha\varepsilon^2$.
^thm-lemma1

*Proof sketch.* If $\alpha\ge1+1/\varepsilon$: $D_\alpha\le D_\infty=\varepsilon\le(\alpha-1)\varepsilon^2$. If $\alpha<1+1/\varepsilon$: use the inequality $x^{\beta+1}y^{-\beta}+x^{-\beta}y^{\beta+1}\le(1+(\beta\lambda)^2)(x+y)+\beta\lambda(x-y)$ for $x>y>0$, $\lambda=\log(x/y)$, $0\le\beta\le1/\lambda$ (Eq. 2). With $\beta=\alpha-1\le1/\varepsilon$, integrating against $P,Q$ and using nonnegativity of $D_\alpha(Q\Vert P)$ gives $D_\alpha(P\Vert Q)\le2(\alpha-1)\varepsilon^2+\varepsilon\|P-Q\|_1$, and $\|P-Q\|_1\le\min(2,e^\varepsilon-1)\le2\varepsilon^2$. The case $\alpha=1$ follows by continuity. The constant can be improved to $0.5$ with a more involved analysis (Bun-Steinke, Prop. 3.3).

> [!theorem] Proposition 4 (advanced composition, probability form)
> Let $f$ be an adaptive composition of $n$ mechanisms, each $\varepsilon$-DP, and let $D,D'$ be adjacent. For any $S\subset\mathcal R$,
> $$\Pr[f(D)\in S]\le\exp\Big(2\varepsilon\sqrt{n\log\frac{1}{\Pr[f(D')\in S]}}\Big)\cdot\Pr[f(D')\in S].$$
^thm-prop4

*Proof.* Lemma 1 plus Proposition 1 give $D_\alpha(f(D)\Vert f(D'))\le2\alpha n\varepsilon^2$ for all $\alpha\ge1$. Put $Q=\Pr[f(D')\in S]$. Case $\log(1/Q)\ge\varepsilon^2n$: choose $\alpha=\sqrt{\log(1/Q)}/(\varepsilon\sqrt n)\ge1$; Proposition 10 gives $\Pr[f(D)\in S]\le\exp(2(\alpha-1)n\varepsilon^2)Q^{1-1/\alpha}<\exp(2\varepsilon\sqrt{n\log(1/Q)})Q$. Case $\log(1/Q)<\varepsilon^2n$: the right-hand side exceeds 1 trivially.

> [!theorem] Corollary 1 (advanced composition, $(\varepsilon,\delta)$ form)
> Let $f$ be a composition of $n$ $\varepsilon$-DP mechanisms and $0<\delta<1$ with $\log(1/\delta)\ge\varepsilon^2n$. Then $f$ is $(\varepsilon',\delta)$-DP with $\varepsilon'\triangleq4\varepsilon\sqrt{2n\log(1/\delta)}$.
^thm-cor1

*Proof sketch.* Show $\Pr[f(D)\in S]\le\max(e^{\varepsilon'}Q,\delta)$. If $8\log\frac1\delta>\log\frac1Q$, Proposition 4 gives $\exp(2\varepsilon\sqrt{8n\log\frac1\delta})Q=e^{\varepsilon'}Q$. Otherwise ($8\log\frac1\delta\le\log\frac1Q$) use $\log(1/\delta)\ge\varepsilon^2n$ and Proposition 4: $2\varepsilon\sqrt{n\log\frac1Q}\le2\sqrt{\log\frac1\delta\log\frac1Q}\le\frac1{\sqrt2}\log\frac1Q$, so $\Pr[f(D)\in S]\le Q^{1-1/\sqrt2}\le Q^{1/8}\le\delta$.

**Remark 3.** The condition $\log(1/\delta)\ge\varepsilon^2n$ is the "high privacy" regime of advanced composition, where $\varepsilon'<(1+\sqrt2)\log(1/\delta)$. With $\delta<1\%$ this covers $\varepsilon'<11$. If $\log(1/\delta)<\varepsilon^2n$, this and other composition theorems are unlikely to give strong bounds.

## Examples

> [!example] Numbers for advanced composition versus basic composition
> Setup: $n=10{,}000$ mechanisms, each $\varepsilon=0.01$-DP, $\delta=10^{-5}$ (so $\log(1/\delta)=11.51\ge\varepsilon^2n=1$).
> Solution: basic composition gives $n\varepsilon=100$. Corollary 1 gives $\varepsilon'=4(0.01)\sqrt{2\cdot10^4\cdot11.51}=19.2$. The Dwork-Rothblum-Vadhan form $\sqrt{2n\ln(1/\delta')}\varepsilon+n\varepsilon(e^\varepsilon-1)$ gives about $5.8$.
> Interpretation: Corollary 1 is much better than basic composition here but about 3x looser than the standard $(\varepsilon,\delta)$ advanced composition: the constant 4 reflects the generic Lemma 1 constant 2 (the paper notes it can be improved to 0.5), and the paper observes that Proposition 4's bound is "consistently outperformed" by the standard form with optimal $\delta$ (Section VI-D). The RDP value comes from directly using the mechanism's own curve, see [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]]. All numbers are recomputed here.
^ex-adv-comp

```python
import numpy as np

def basic(n, eps):            return n * eps
def drv(n, eps, delta_p):     # Dwork-Rothblum-Vadhan advanced composition
    return np.sqrt(2 * n * np.log(1 / delta_p)) * eps + n * eps * (np.exp(eps) - 1)
def mironov_cor1(n, eps, delta):
    assert np.log(1 / delta) >= eps**2 * n
    return 4 * eps * np.sqrt(2 * n * np.log(1 / delta))

def rdp_to_dp(rdp_curve, delta, alphas=np.linspace(1.01, 300, 30000)):
    """Proposition 3, optimized over alpha. rdp_curve(alpha) -> epsilon."""
    vals = rdp_curve(alphas) + np.log(1 / delta) / (alphas - 1)
    i = int(np.argmin(vals))
    return vals[i], alphas[i]

n, eps, delta = 10_000, 0.01, 1e-5
print(basic(n, eps), drv(n, eps, delta), mironov_cor1(n, eps, delta))   # 100, ~5.8, ~19.2
# 100 compositions of a Gaussian with sigma=4 (sensitivity 1): RDP curve 100*alpha/(2*16)
print(rdp_to_dp(lambda a: 100 * a / 32, 1e-5))                          # ~(15.1, alpha~2.9)
```

## Connections

- Alternative route for the same Gaussian composition: the exact GDP curve gives $\varepsilon\approx13.2$ at $\delta=10^{-5}$ for $\mu=100^{1/2}/4=2.5$ (recomputed), versus 15.1 through Proposition 3; see [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]].
- The same Markov-style conversion is how the moments accountant produces $(\varepsilon,\delta)$: [[Abadi 2016 - Moments Accountant Theorems and Proofs]].
- zCDP to $(\varepsilon,\delta)$ conversion used for the census: [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]].

## See Also

- [[Mironov 2017 - Renyi Differential Privacy - Overview]]
- [[Mironov 2017 - RDP Properties and Composition]]
