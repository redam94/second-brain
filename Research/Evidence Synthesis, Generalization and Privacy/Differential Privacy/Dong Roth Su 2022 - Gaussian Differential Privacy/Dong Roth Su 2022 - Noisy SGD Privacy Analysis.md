---
title: "Dong Roth Su 2022 - Noisy SGD Privacy Analysis"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Dong Roth Su 2022 - Gaussian Differential Privacy.pdf]]"
source_location: "Sec. 5: Algorithm 1, Theorems 5.1-5.2, Lemmas 5.3, 5.5, Corollaries 5.4, 5.6, Figure 7; Appendix G, pp. 24-28 and 79-86"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dong Roth Su 2022 - Gaussian Differential Privacy"
doc_type: paper
depends_on:
  - "[[Dong Roth Su 2022 - Privacy Amplification by Subsampling]]"
  - "[[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]]"
  - "[[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]]"
used_by:
  - "[[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]]"
aliases:
  - NoisySGD GDP analysis
  - GDP bound for DP-SGD
  - f-DP privacy of SGD
---

# Dong Roth Su 2022 - Noisy SGD Privacy Analysis

> [!summary]
> Noisy SGD with clipping $C$, batch size $m$ out of $n$, noise multiplier $\sigma$ and $T$ steps is $C_{m/n}(G_{\sigma^{-1}})^{\otimes T}$-DP (Theorem 5.1), and asymptotically $\mu$-GDP with $\mu=\sqrt2\,c\sqrt{e^{\sigma^{-2}}\Phi(1.5/\sigma)+3\Phi(-0.5/\sigma)-2}$ when $m\sqrt T/n\to c$ (Corollary 5.4). On MNIST, the GDP trade-offs improve on the $(\varepsilon,\delta)$ guarantee derived from the moments accountant.

## Overview

SGD is the benchmark for private optimization because its privacy depends on tight composition **and** amplification by subsampling. Bassily-Smith-Thakurta gave the first asymptotically optimal analysis but with meaningless bounds for realistic datasets, motivating divergence-based relaxations. Those lack subsampling amplification, so Abadi et al. developed the moments accountant, a tool tailored to subsampling followed by Gaussian noise. Here the general $f$-DP tools give a simple and improved analysis.

## Main Content

> [!definition] Algorithm 1: NoisySGD
> **Input:** dataset $S=(x_1,\dots,x_n)$, loss $\mathcal L(\theta,x)$. **Parameters:** initial $\theta_0$, learning rates $\eta_t$, batch size $m$, horizon $T$, noise scale $\sigma$, gradient norm bound $C$.
> For $t=1,\dots,T$: (3) *Subsampling*: take a uniformly random $I_t\subseteq\{1..n\}$ of size $m$ ($\text{Sample}_m$). For $i\in I_t$: (5) $v_t^{(i)}\leftarrow\nabla_\theta\mathcal L(\theta_t,x_i)$; (6) clip $\bar v_t^{(i)}\leftarrow v_t^{(i)}/\max\{1,\|v_t^{(i)}\|_2/C\}$; (7) *Average, perturb and descend*: $\theta_{t+1}\leftarrow\theta_t-\eta_t\Big(\frac1m\sum_{i\in I_t}\bar v_t^{(i)}+\mathcal N\big(0,\tfrac{4\sigma^2C^2}{m^2}I\big)\Big)$, with $I$ the identity matrix. **Output:** $\theta_T$.
^def-noisysgd

Note the noise convention: replace-one neighbors change one clipped gradient by up to $2C$ in $\ell_2$, so the average has sensitivity $2C/m$, and noise standard deviation $\sigma\cdot2C/m$ gives a $1/\sigma$-GDP step. This differs from Abadi et al.'s add/remove convention (sensitivity $C$ on the sum, noise $\sigma C$), so the same nominal $\sigma$ is not directly interchangeable between the two papers.

**Step 1: one iteration.** Let $M:X^m\times V\to V$ run lines 4-7 and $\widetilde M=M\circ\text{Sample}_m$ run lines 3-7. Since one of the $m$ points affects only one $v^{(i)}$, the sensitivity of $\frac1m\sum\bar v^{(i)}$ is at most $2C/m$ and, by Theorem 2.7, $M$ is $\sigma^{-1}$-GDP (the descent step is deterministic post-processing).

> [!theorem] Theorem 5.1
> Algorithm 1 is $C_{m/n}\big(G_{\sigma^{-1}}\big)^{\otimes T}$-DP. (The mechanism does not release the subsampled indices.)
^thm-noisysgd

*Proof.* $\widetilde M$ is $C_{m/n}(G_{\sigma^{-1}})$-DP by Theorem 4.2; the trajectory $(\theta_1,\dots,\theta_T)$ is the $T$-fold composition of $\widetilde M$ so Theorem 3.2 gives the tensor power. The moments accountant applied to this problem is basically equivalent to directly computing $C_{m/n}(G_{\sigma^{-1}})^{\otimes T}$, which is numerically cumbersome; the CLTs give an analytic approximation that becomes nearly exact as $T$ grows.

> [!theorem] Theorem 5.2 (CLT for subsampled mechanisms)
> Suppose $f$ is a symmetric trade-off function with $f(0)=1$ and $\int_0^1(|f'(x)|-1)_+^4dx<\infty$, and $p\sqrt T\to p_0>0$ as $T\to\infty$. Then uniformly,
> $$C_p(f)^{\otimes T}\ \longrightarrow\ G_{p_0\sqrt{2\chi^2_+(f)}},\qquad\chi^2_+(f)=\int_0^1\big(|f'(x)|-1\big)_+^2dx,$$
> with $a_+=\max\{a,0\}$.
^thm-clt-subsampled

The correct scaling between sampling ratio and iterations is $p\sim1/\sqrt T$.

> [!theorem] Lemma 5.3 and Corollary 5.4 (asymptotic GDP for NoisySGD)
> $\chi^2_+(G_\mu)=e^{\mu^2}\Phi(3\mu/2)+3\Phi(-\mu/2)-2$. Hence if $m\sqrt T/n\to c$, NoisySGD is asymptotically $\mu$-GDP with
> $$\mu=\sqrt2\,c\cdot\sqrt{e^{\sigma^{-2}}\,\Phi(1.5\,\sigma^{-1})+3\,\Phi(-0.5\,\sigma^{-1})-2}.$$
^thm-noisysgd-asymptotic

With epochs $E=Tm/n$, the assumption is $Em/n\to c^2$. Deep learning typically has small $Em/n$: AlexNet uses $m=128$, $E\approx90$, $n\approx1.2\times10^6$, so $Em/n=0.0096<0.01$.

> [!theorem] Lemma 5.5 and Corollary 5.6 (Berry-Esseen bound for NoisySGD)
> Let $Z(x)=\log\big(p\,e^{\mu x-\mu^2/2}+1-p\big)$ and $\varphi$ the standard normal density, $p=m/n$, $\mu=\sigma^{-1}$. Then $\text{kl}(C_p(G_\mu))=p\int_{\mu/2}^\infty Z(x)\big(\varphi(x-\mu)-\varphi(x)\big)dx$, with $\kappa_2$ and $\bar\kappa_3$ given by analogous integrals (Lemma 5.5). With
> $$\tilde\mu=\frac{2\sqrt T\,\text{kl}(C_p(G_\mu))}{\sqrt{\kappa_2(C_p(G_\mu))-\text{kl}^2(C_p(G_\mu))}},\qquad\gamma=\frac{0.56}{\sqrt T}\cdot\frac{\bar\kappa_3(C_p(G_\mu))}{\big(\kappa_2(C_p(G_\mu))-\text{kl}^2(C_p(G_\mu))\big)^{3/2}},$$
> NoisySGD is $f$-DP with $f(\alpha)=\max\{G_{\tilde\mu}(\alpha+\gamma)-\gamma,\ 0\}$.
^thm-noisysgd-berry-esseen

This gives sharp, computer-evaluable (not closed-form) guarantees. $G_{\tilde\mu}$ is set to 0 on $(1,\infty)$ so $f$ is defined for $\alpha>1-\gamma$.

### Figure 7: MNIST comparison

All three runs use Algorithm 1 on the whole MNIST dataset, $n=60{,}000$, batch size $m=256$; learning rates $\eta_t=0.25,0.15,0.25$ and clipping $C=1.5,1.0,1.5$ respectively; moments-accountant values from the tensorflow/privacy library at $\delta=10^{-5}$.

| Run | Accuracy | Epochs | $\sigma$ | GDP by CLT (Cor. 5.4) | $(\varepsilon,10^{-5})$ by moments accountant |
|---|---|---|---|---|---|
| A | 95.0% | 15 | 1.3 | 0.285-GDP | $\varepsilon=1.19$ |
| B | 96.6% | 60 | 1.1 | 0.737-GDP | $\varepsilon=3.01$ |
| C | 97.0% | 45 | 0.7 | 1.554-GDP | $\varepsilon=7.1$ |

Reading note: the text extraction of the figure scrambled the panel order; the pairing above was checked against the rendered figure (each panel title, red GDP legend and blue MA legend) and against a recomputation of Corollary 5.4 with $T=En/m$ and $c=m\sqrt T/n$: $(E,\sigma)=(15,1.3)\to0.2847$, $(60,1.1)\to0.7374$, $(45,0.7)\to1.5536$. In each panel the blue dashed curve is the piecewise-linear $f_{\varepsilon,\delta}$ implied by the single moments-accountant pair, and the red GDP curve lies above it (visibly so in panels B and C).

## Examples

> [!example] Converting the GDP bounds to $(\varepsilon,\delta)$ for comparison
> Setup: use Corollary 2.13 on the three $\mu$'s above at $\delta=10^{-5}$.
> Solution (recomputed): $0.285\to\varepsilon=1.07$ (vs 1.19 from the moments accountant); $0.737\to3.09$ (vs 3.01); $1.554\to7.35$ (vs 7.1) (using the unrounded $\mu$ from Corollary 5.4; the rounded printed $\mu$ values give 3.08 and 7.36).
> Interpretation: at the single point $\delta=10^{-5}$ the two analyses are numerically close, with the GDP-implied $\varepsilon$ smaller in the first run and about 3% larger in the other two. This is expected because Corollary 5.4 is asymptotic, not a certified bound, while the moments accountant gives a rigorous $(\varepsilon,\delta)$ bound. The paper's claim is about the **whole trade-off curve** (Figure 7 plots both on type I/II axes): the red GDP curve sits far above the piecewise-linear curve of the single $(\varepsilon,\delta)$ pair, because one $(\varepsilon,\delta)$ pair is only one corner of the guarantee. Use Corollary 5.6 for a certified f-DP bound with explicit error $\gamma$.
^ex-fig7-eps

```python
import numpy as np
from scipy.stats import norm
from scipy.optimize import brentq

def gdp_eps(mu, delta):
    f = lambda e: norm.cdf(-e/mu + mu/2) - np.exp(e)*norm.cdf(-e/mu - mu/2) - delta
    return brentq(f, 0, 100)

def cor_5_4_mu(m, n, epochs, sigma):
    T = epochs * n / m
    c = m * np.sqrt(T) / n
    inner = np.exp(sigma**-2) * norm.cdf(1.5/sigma) + 3*norm.cdf(-0.5/sigma) - 2
    return np.sqrt(2) * c * np.sqrt(inner)

for E, s in ((15, 1.3), (60, 1.1), (45, 0.7)):
    mu = cor_5_4_mu(256, 60_000, E, s)
    print(E, s, round(mu, 3), round(gdp_eps(mu, 1e-5), 2))
# 0.285 1.07 | 0.737 3.09 | 1.554 7.35
```

## Connections

- The DP-SGD algorithm being analyzed: [[Abadi 2016 - DP-SGD Algorithm and Implementation]]; the accountant it improves on: [[Abadi 2016 - Moments Accountant Theorems and Proofs]]; MNIST numbers: [[Abadi 2016 - MNIST and CIFAR-10 Experiments]].
- Gaussian mechanism and GDP definition: [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]].
- Marketing relevance (inference): any model trained iteratively on user-level data with batch subsampling and Gaussian noise (e.g. conversion models) has an $f$-DP guarantee computable from $(m,n,\sigma,T)$; for a marketing-measurement vendor the sufficient statistics to report are $m/n$, $\sigma$, $T$ and clipping $C$.

## See Also

- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]
- [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]]
