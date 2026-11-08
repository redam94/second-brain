---
title: "Abadi 2016 - Moments Accountant Theorems and Proofs"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Abadi 2016 - Deep Learning with Differential Privacy.pdf]]"
source_location: "Sec. 3.2 (Theorems 1-2, Eqs. 1-4), Appendices A-C, pp. 4-5 and 11-13"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abadi 2016 - Deep Learning with Differential Privacy"
doc_type: paper
depends_on:
  - "[[Abadi 2016 - DP-SGD Algorithm and Implementation]]"
  - "[[Abadi 2016 - DP Background and Gaussian Mechanism]]"
used_by:
  - "[[Abadi 2016 - MNIST and CIFAR-10 Experiments]]"
  - "[[Mironov 2017 - Renyi Divergence and the RDP Definition]]"
  - "[[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]]"
aliases:
  - moments accountant
  - Abadi Theorem 1
  - log-moment composition
---

# Abadi 2016 - Moments Accountant Theorems and Proofs

> [!summary]
> The moments accountant tracks the log moment-generating function $\alpha_{\mathcal M}(\lambda)$ of the privacy-loss random variable. These log moments **add** under adaptive composition (Theorem 2.1) and convert to $(\varepsilon,\delta)$ by Markov's inequality (Theorem 2.2). For the subsampled Gaussian mechanism, $\alpha(\lambda)\lesssim q^2\lambda(\lambda+1)/((1-q)\sigma^2)$, giving $\sigma\ge c_2\,q\sqrt{T\log(1/\delta)}/\varepsilon$ (Theorem 1), saving a $\sqrt{\log(1/\delta)}$ factor in $\varepsilon$ and a $Tq$ factor in $\delta$ versus strong composition.

## Overview

Strong composition is loose and ignores the noise distribution. The moments accountant keeps more information (higher moments of the privacy loss) so that composition stays tight. Concrete comparison: $L=0.01N,\ \sigma=4,\ \delta=10^{-5},\ T=10{,}000$ gives $\varepsilon\approx1.26$ (accountant) versus $\varepsilon\approx9.34$ (strong composition). With strong composition, Algorithm 1 would need $\sigma=\Omega\big(q\sqrt{T\log(1/\delta)\log(T/\delta)}/\varepsilon\big)$, so the accountant saves a $\sqrt{\log(T/\delta)}$ factor in the noise scale.

## Main Content

> [!definition] Privacy loss and its log moments
> For neighboring $d,d'\in\mathcal D^n$, mechanism $\mathcal M$, auxiliary input $\text{aux}$ and outcome $o\in\mathcal R$, the **privacy loss at $o$** is
> $$
> c(o;\mathcal M,\text{aux},d,d')\triangleq\log\frac{\Pr[\mathcal M(\text{aux},d)=o]}{\Pr[\mathcal M(\text{aux},d')=o]}.\tag{1}
> $$
> Adaptive composition is modeled by letting $\text{aux}$ for the $k$-th mechanism be the outputs of the previous ones. The $\lambda$-th **log moment** is
> $$
> \alpha_{\mathcal M}(\lambda;\text{aux},d,d')\triangleq\log\mathbb E_{o\sim\mathcal M(\text{aux},d)}\big[\exp(\lambda\,c(o;\mathcal M,\text{aux},d,d'))\big],\tag{2}
> $$
> and $\alpha_{\mathcal M}(\lambda)\triangleq\max_{\text{aux},d,d'}\alpha_{\mathcal M}(\lambda;\text{aux},d,d')$.
^def-moments-accountant

That $\mathcal M$ is $(\varepsilon,\delta)$-DP is equivalent to a tail bound on its privacy-loss random variable. Composing directly from the tail bound is loose, but the moments compose linearly.

> [!theorem] Theorem 2 (composability and tail bound)
> Let $\alpha_{\mathcal M}(\lambda)$ be as above.
> 1. **Composability.** If $\mathcal M$ is an adaptive sequence $\mathcal M_1,\dots,\mathcal M_k$ with $\mathcal M_i:\prod_{j<i}\mathcal R_j\times\mathcal D\to\mathcal R_i$, then for any $\lambda$, $\alpha_{\mathcal M}(\lambda)\le\sum_{i=1}^k\alpha_{\mathcal M_i}(\lambda)$.
> 2. **Tail bound.** For any $\varepsilon>0$, $\mathcal M$ is $(\varepsilon,\delta)$-DP for $\delta=\min_\lambda\exp\big(\alpha_{\mathcal M}(\lambda)-\lambda\varepsilon\big)$.
^thm-moments-composition

*Proof sketch (Appendix A).* (1) The log privacy loss of a composite is a sum $c(o_{1:k})=\sum_ic(o_i;\mathcal M_i,o_{1:i-1},d,d')$. Exponentiating, using independence of noise across mechanisms conditional on past outputs, the expectation factorizes: $\mathbb E[e^{\lambda c(o_{1:k})}]=\prod_i\mathbb E_{o_i}[e^{\lambda c(o_i)}]=\prod_i\exp(\alpha_{\mathcal M_i}(\lambda;o_{1:i-1},d,d'))\le\exp(\sum_i\alpha_{\mathcal M_i}(\lambda))$. In particular the theorem holds when each mechanism is chosen from the public outputs of earlier ones. (2) Markov: let $B=\{o:c(o)\ge\varepsilon\}$; for any $S$, $\Pr[\mathcal M(d)\in S]\le e^{\varepsilon}\Pr[\mathcal M(d')\in S\cap B^c]+\Pr[\mathcal M(d)\in B]$, and $\Pr_{o\sim\mathcal M(d)}[c(o)\ge\varepsilon]\le\mathbb E[e^{\lambda c(o)}]/e^{\lambda\varepsilon}\le\exp(\alpha-\lambda\varepsilon)$. The proof gives a tail bound on the privacy loss, which is stronger than DP at that $(\varepsilon,\delta)$.

> [!definition] Moments of the sampled Gaussian (Eqs. 3-4)
> Let $\mu_0$ be the pdf of $\mathcal N(0,\sigma^2)$, $\mu_1$ the pdf of $\mathcal N(1,\sigma^2)$, and $\mu=(1-q)\mu_0+q\mu_1$. For one step of Algorithm 1 (a Gaussian mechanism applied to a lot sampled with probability $q$),
> $$
> \alpha(\lambda)=\log\max(E_1,E_2),\quad E_1=\mathbb E_{z\sim\mu_0}\Big[\big(\mu_0(z)/\mu(z)\big)^{\lambda}\Big],\quad E_2=\mathbb E_{z\sim\mu}\Big[\big(\mu(z)/\mu_0(z)\big)^{\lambda}\Big].
> $$
> The implementation integrates numerically. An asymptotic bound is $\alpha(\lambda)\le q^2\lambda(\lambda+1)/\big((1-q)\sigma^2\big)+O(q^3/\sigma^3)$.
^def-sampled-gaussian-moments

> [!theorem] Lemma 3 (moments bound for the sampled Gaussian)
> Suppose $f:\mathcal D\to\mathbb R^p$ with $\|f(\cdot)\|_2\le1$. Let $\sigma\ge1$ and $J$ a sample from $[n]$ where each $i$ is chosen independently with probability $q<\frac1{16\sigma}$. Then for any positive integer $\lambda\le\sigma^2\ln\frac1{q\sigma}$, the mechanism $\mathcal M(d)=\sum_{i\in J}f(d_i)+\mathcal N(0,\sigma^2I)$ satisfies
> $$
> \alpha_{\mathcal M}(\lambda)\le\frac{q^2\lambda(\lambda+1)}{(1-q)\sigma^2}+O(q^3\lambda^3/\sigma^3).
> $$
^thm-lemma3

*Proof sketch (Appendix B).* Fix $d'$ and $d=d'\cup\{d_n\}$; WLOG $f(d_n)=e_1$ and the other included terms sum to 0, so only the first coordinate differs: a one-dimensional problem with $\mathcal M(d')\sim\mu_0$ and $\mathcal M(d)\sim\mu$. One must show $\mathbb E_{z\sim\mu}[(\mu(z)/\mu_0(z))^\lambda]\le\alpha$ and $\mathbb E_{z\sim\mu_0}[(\mu_0(z)/\mu(z))^\lambda]\le\alpha$. Expand binomially in $(\mu-\mu_0)/\mu$, using $\mu_0-\mu=q(\mu_0-\mu_1)$, $\mu\ge(1-q)\mu_0$, and $\mathbb E_{\mu_0}[|z|^t]\le\sigma^t(t-1)!!$. The $t=0,1$ terms contribute 1 and 0, the $t=2$ term gives $q^2\lambda(\lambda+1)/((1-q)\sigma^2)$ (using $\mathbb E[(\mu_0-\mu_1)^2/\mu_0^2]=e^{1/\sigma^2}-1$), and terms with $t>3$ decay geometrically so the expansion is dominated by $t=3$, which is $O(q^3\lambda^3/\sigma^3)$.

> [!theorem] Theorem 1 (main result)
> There exist constants $c_1,c_2$ such that, given sampling probability $q=L/N$ and number of steps $T$, for any $\varepsilon<c_1q^2T$ Algorithm 1 is $(\varepsilon,\delta)$-differentially private for any $\delta>0$ if
> $$
> \sigma\ge c_2\,\frac{q\sqrt{T\log(1/\delta)}}{\varepsilon}.
> $$
^thm-abadi-1

*Proof sketch.* By Theorem 2.1 and Lemma 3 the log moment of the algorithm is $\alpha(\lambda)\le Tq^2\lambda^2/\sigma^2$. By Theorem 2.2 it suffices that $Tq^2\lambda^2/\sigma^2\le\lambda\varepsilon/2$ and $\exp(-\lambda\varepsilon/2)\le\delta$, plus the Lemma 3 requirement $\lambda\le\sigma^2\log(1/(q\sigma))$. Taking $\lambda=2\log(1/\delta)/\varepsilon$ makes the second condition hold with equality; the first then needs $\sigma^2\ge4Tq^2\log(1/\delta)/\varepsilon^2$. (This explicit $c_2=2$ is this note's reconstruction of the proof; the paper states only that suitable constants exist.) The requirement on $\lambda$ yields the range $\varepsilon<c_1q^2T$.

> [!theorem] Lemma C.1 (DP implies a moment bound)
> If $\mathcal M$ is $\varepsilon$-differentially private then for any $\lambda>0$, $\alpha_\lambda\le\lambda\varepsilon(e^\varepsilon-1)+\lambda^2\varepsilon^2e^{2\varepsilon}/2$.
^thm-lemma-c1

*Proof sketch.* Let $Z=c(\mathcal M(d))$. DP gives $|Z|\le\varepsilon$ and $\mu=\mathbb E[Z]\le\varepsilon(e^\varepsilon-1)$, so $|Z-\mu|\le\varepsilon e^\varepsilon$. By convexity of $\exp(\lambda x)$ on the bounded range, linear interpolation gives $\mathbb E[e^{\lambda Z}]\le e^{\lambda\mu}\exp(\lambda^2\varepsilon^2e^{2\varepsilon}/2)$. Together with Theorem 2 this yields a composition theorem for DP mechanisms roughly equivalent to unrolling the strong composition proof; the accountant's power is that bounding the moments **directly** is stronger than going through DP and then Lemma C.1.

### Numerical check of the paper's headline numbers

```python
import numpy as np
from scipy.special import gammaln, logsumexp

def log_E2(lam, q, sigma):
    """log E2 = log E_{z~mu}[(mu/mu0)^lam] for integer lam, via
    E_{mu0}[((1-q)+q*mu1/mu0)^(lam+1)] and E_{mu0}[(mu1/mu0)^k] = exp(k(k-1)/(2 sigma^2))."""
    a = lam + 1
    k = np.arange(a + 1)
    logC = gammaln(a + 1) - gammaln(k + 1) - gammaln(a - k + 1)
    terms = logC + (a - k) * np.log1p(-q) + k * np.log(q) + (k * k - k) / (2 * sigma**2)
    return logsumexp(terms)

def eps_moments_accountant(q, sigma, T, delta, max_lambda=64):
    best = (np.inf, None)
    for lam in range(1, max_lambda + 1):
        alpha_total = T * log_E2(lam, q, sigma)       # Theorem 2.1: moments add
        eps = (alpha_total + np.log(1 / delta)) / lam  # Theorem 2.2: delta = exp(alpha - lam*eps)
        best = min(best, (eps, lam))
    return best

print(eps_moments_accountant(0.01, 4, 10_000, 1e-5))   # about (1.26, 19): matches the paper's 1.26
print(eps_moments_accountant(0.01, 4, 40_000, 1e-5))   # about (2.58, 9) vs the paper's 2.55
```

This script uses $E_2$ only (the paper takes $\max(E_1,E_2)$) and reproduces $\varepsilon\approx1.26$ for 100 epochs; for 400 epochs it returns about 2.58 against the printed 2.55, a small difference whose cause (numerics or $\lambda$ grid) was not investigated. The strong-composition numbers $9.34$ and $24.22$ are quoted from the paper, not recomputed.

## Examples

> [!example] Reading Theorem 1 with real numbers
> Setup: $q=0.01$, $T=10{,}000$, $\delta=10^{-5}$.
> Solution: the bound's functional form says $\sigma\propto q\sqrt{T\log(1/\delta)}/\varepsilon=0.01\sqrt{10^4\times11.5}/\varepsilon\approx3.4/\varepsilon$. With $\sigma=4$ the implied $\varepsilon$ is of order 1, in line with the computed 1.26.
> Interpretation: noise must grow like $\sqrt{T}$ and shrink with the sampling ratio $q$; training longer or sampling larger lots costs privacy. The constant $c_2$ is not given in the paper, so this is an order-of-magnitude reading.
^ex-theorem1

## Connections

- The accountant is the Renyi-divergence curve in disguise: $\alpha_{\mathcal M}(\lambda)=\lambda D_{\lambda+1}$ in Mironov's notation; see [[Mironov 2017 - Renyi Divergence and the RDP Definition]] and the conversion [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]].
- Later work shows the $(\varepsilon,\delta)$ summary loses information: [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]].
- Moment-generating function intuition: compare with log-moment tools in [[The ELBO and KL Divergence Minimization]] (the $\lambda\to0$ limit relates to KL).

## See Also

- [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]]
- [[Abadi 2016 - DP-SGD Algorithm and Implementation]]
- [[Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search]]
