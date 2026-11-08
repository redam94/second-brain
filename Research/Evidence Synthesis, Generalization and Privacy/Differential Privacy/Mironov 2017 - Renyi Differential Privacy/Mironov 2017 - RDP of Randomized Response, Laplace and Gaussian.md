---
title: "Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Mironov 2017 - Renyi Differential Privacy.pdf]]"
source_location: "Sec. VI (Propositions 5-7, Corollaries 2-3, Table II, Figures 1-2), pp. 6-9"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Mironov 2017 - Renyi Differential Privacy"
doc_type: paper
depends_on:
  - "[[Mironov 2017 - Renyi Divergence and the RDP Definition]]"
  - "[[Mironov 2017 - RDP Properties and Composition]]"
used_by:
  - "[[Mironov 2017 - Discussion, Budget Curves and Open Questions]]"
  - "[[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]]"
aliases:
  - RDP of Gaussian mechanism
  - RDP Laplace mechanism curve
  - RDP randomized response
---

# Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian

> [!summary]
> Section VI computes the RDP budget curves of the three basic mechanisms (Table II): randomized response, Laplace, and Gaussian. The Gaussian curve is a straight line, $\varepsilon(\alpha)=\alpha/(2\sigma^2)$ for unit sensitivity, so composing $n$ Gaussians behaves like one Gaussian with parameter $\sigma/\sqrt n$. Figures 1-2 compare RDP-based composition to naive, advanced $(\varepsilon,\delta)$, and generic bounds.

## Overview

For each mechanism the paper computes $D_\alpha$ between the output distributions on a pair of adjacent inputs, with $f$ a function of sensitivity 1 where relevant. Sensitivity-1 is without loss of generality via rescaling.

## Main Content

### A. Randomized response

For a predicate $f:\mathcal D\mapsto\{0,1\}$, $\text{RR}_p f(D)$ returns $f(D)$ with probability $p$ and $1-f(D)$ with probability $1-p$.

> [!theorem] Proposition 5
> $\text{RR}_p(f)$ satisfies $\Big(\alpha,\ \frac1{\alpha-1}\log\big(p^\alpha(1-p)^{1-\alpha}+(1-p)^\alpha p^{1-\alpha}\big)\Big)$-RDP for $\alpha>1$, and $\big(1,\ (2p-1)\log\frac p{1-p}\big)$-RDP for $\alpha=1$.
^thm-rr-rdp

Direct application of the definition (two-point distributions).

### B. Laplace noise

$\mathcal L_\lambda f(D)=f(D)+\Lambda(0,\lambda)$ with $\Lambda(\mu,\lambda)$ having density $\frac1{2\lambda}\exp(-|x-\mu|/\lambda)$, $f$ of sensitivity 1.

> [!theorem] Proposition 6 and Corollary 2
> For $\alpha\ge1$ and $\lambda>0$:
> $$D_\alpha\big(\Lambda(0,\lambda)\Vert\Lambda(1,\lambda)\big)=\frac1{\alpha-1}\log\Big\{\frac{\alpha}{2\alpha-1}\exp\Big(\frac{\alpha-1}{\lambda}\Big)+\frac{\alpha-1}{2\alpha-1}\exp\Big(\frac{-\alpha}{\lambda}\Big)\Big\}.$$
> Hence the Laplace mechanism $\mathcal L_\lambda f$ is $(\alpha,\cdot)$-RDP with that value. As $\alpha\to\infty$ it tends to $1/\lambda$ (consistent with $1/\lambda$-DP); at $\alpha\to1$ it is $1/\lambda+\exp(-1/\lambda)-1\approx0.5/\lambda^2$ for large $\lambda$.
^thm-laplace-rdp

*Proof.* Split $\int p^\alpha q^{1-\alpha}dx$ over $(-\infty,0]$, $[0,1]$, $[1,\infty)$ with $p=\frac1{2\lambda}e^{-|x|/\lambda}$, $q=\frac1{2\lambda}e^{-|x-1|/\lambda}$, obtaining $\frac12e^{(\alpha-1)/\lambda}+\frac{1}{2(2\alpha-1)}(e^{(\alpha-1)/\lambda}-e^{-\alpha/\lambda})+\frac12e^{-\alpha/\lambda}=\frac{\alpha}{2\alpha-1}e^{(\alpha-1)/\lambda}+\frac{\alpha-1}{2\alpha-1}e^{-\alpha/\lambda}$. Because the mechanism is additive, the divergence depends only on $\alpha$ and $|f(D)-f(D')|$.

### C. Gaussian noise

$\mathcal G_\sigma f(D)=f(D)+\mathcal N(0,\sigma^2)$ for a real-valued $f$ (the text calls $\sigma$ both the standard deviation and the parameter in $\mathcal N(0,\sigma^2)$; the formulas use $\sigma^2$ as the variance).

> [!theorem] Proposition 7 and Corollary 3
> $D_\alpha\big(\mathcal N(0,\sigma^2)\Vert\mathcal N(\mu,\sigma^2)\big)=\alpha\mu^2/(2\sigma^2)$. Therefore, if $f$ has sensitivity 1, $\mathcal G_\sigma f$ satisfies $\big(\alpha,\alpha/(2\sigma^2)\big)$-RDP.
^thm-gaussian-rdp

*Proof.* Complete the square: $\int\frac1{\sigma\sqrt{2\pi}}e^{-\alpha x^2/(2\sigma^2)}e^{-(1-\alpha)(x-\mu)^2/(2\sigma^2)}dx=\exp\big((\alpha^2-\alpha)\mu^2/(2\sigma^2)\big)$; take $\frac1{\alpha-1}\log$.

The budget curve is a straight line (Figure 1). Since curves add under composition, $n$ Gaussians each with parameter $\sigma$ have the RDP curve of a Gaussian with parameter $\sigma/\sqrt n$.

### Table II: RDP parameters of basic mechanisms

| Mechanism | Differential privacy | Renyi differential privacy at order $\alpha$ |
|---|---|---|
| Randomized response | $\log\frac p{1-p}$ | $\alpha>1$: $\frac1{\alpha-1}\log\{p^\alpha(1-p)^{1-\alpha}+(1-p)^\alpha p^{1-\alpha}\}$; $\alpha=1$: $(2p-1)\log\frac p{1-p}$ |
| Laplace mechanism | $1/\lambda$ | $\alpha>1$: $\frac1{\alpha-1}\log\{\frac\alpha{2\alpha-1}\exp(\frac{\alpha-1}\lambda)+\frac{\alpha-1}{2\alpha-1}\exp(-\frac\alpha\lambda)\}$; $\alpha=1$: $1/\lambda+\exp(-1/\lambda)-1=0.5/\lambda^2+O(1/\lambda^3)$ |
| Gaussian mechanism | $\infty$ | $\alpha/(2\sigma^2)$ |

### Figures 1 and 2 (described)

**Figure 1** plots $(\alpha,\varepsilon)$ budget curves: randomized response with $p=0.55,0.6,0.75$; Laplace with $1/\lambda=0.25,0.5,1.0$; Gaussian with $\sigma=4,3,2$. Each panel runs over $\alpha\in[1,10]$ with $y$-axis up to 2.5. Gaussian curves are straight lines (e.g. $\sigma=2$ reaches $10/8=1.25$ at $\alpha=10$); the RR and Laplace curves rise steeply near $\alpha=1$ and then plateau near their pure-DP limits (RR with $p=0.75$ levels off near $\log3\approx1.1$; Laplace with $1/\lambda=1$ near 1).

**Figure 2** compares, for $n=1\ldots250$ self-compositions of RR with $p=51\%$ (top row) and Laplace with $\lambda=20$ (bottom row), four upper bounds (log scale) on the multiplicative increase $\Pr[f(D')\in S]/\Pr[f(D)\in S]$ for baseline mass $10^{-6}$, $10^{-3}$, $0.1$: (i) the naive $n\varepsilon$ bound, (ii) the standard advanced composition with optimal $(\varepsilon,\delta)$, (iii) the generic Proposition 4 bound, (iv) the RDP analysis with optimal $\alpha$ (Proposition 10). Findings: the RDP-specific analysis is tighter than all generic bounds whose only input is the mechanism's DP parameter; however Proposition 4's generic bound is consistently outperformed by the standard $(\varepsilon,\delta)$ advanced composition with optimal $\delta$.

## Examples

> [!example] Verifying the closed forms numerically
> The Laplace closed form was checked against direct numerical integration: for $(\alpha,\lambda)=(2,1)$ both give $0.6191$ and for $(5,2)$ both give $0.3553$ (recomputed for this note). The randomized-response $\alpha\to1$ limit $(2p-1)\log\frac p{1-p}$ at $p=0.75$ is $0.5493$, matching Proposition 5's formula evaluated near $\alpha=1$.
^ex-rdp-numeric-check

```python
import numpy as np

def rdp_rr(alpha, p):
    if alpha == 1: return (2*p - 1) * np.log(p / (1 - p))
    return np.log(p**alpha * (1-p)**(1-alpha) + (1-p)**alpha * p**(1-alpha)) / (alpha - 1)

def rdp_laplace(alpha, lam):             # sensitivity 1, scale lam
    if alpha == 1: return 1/lam + np.exp(-1/lam) - 1
    return np.log(alpha/(2*alpha-1) * np.exp((alpha-1)/lam)
                  + (alpha-1)/(2*alpha-1) * np.exp(-alpha/lam)) / (alpha - 1)

def rdp_gaussian(alpha, sigma):          # sensitivity 1
    return alpha / (2 * sigma**2)

print(rdp_laplace(2, 1.0), rdp_laplace(5, 2.0))        # 0.6191, 0.3553
print(rdp_rr(1, 0.75), rdp_rr(2, 0.75))                # 0.5493, 0.8473
# n-fold Gaussian composition: curves add -> same as sigma/sqrt(n)
n, sigma, a = 25, 4.0, 3.0
print(n * rdp_gaussian(a, sigma), rdp_gaussian(a, sigma / np.sqrt(n)))   # equal
```

> [!example] Releasing a conversion count with Gaussian noise
> Setup (illustrative): a weekly conversion count with each user changing it by at most 1; release it for $n=52$ weeks with Gaussian $\sigma=20$, and the same user is in every week.
> Solution: RDP curve $=52\alpha/(2\cdot400)=0.065\alpha$. Using Proposition 3 with $\delta=10^{-6}$: minimize $0.065\alpha+\ln(10^6)/(\alpha-1)$; $\alpha^*-1\approx\sqrt{13.8/0.065}=14.6$, giving $\varepsilon\approx0.065\cdot15.6+13.8/14.6\approx1.96$.
> Interpretation: the whole year costs $(\approx1.96,10^{-6})$-DP for one user, with no bookkeeping beyond adding numbers. This is a worked illustration, not a paper result.
^ex-weekly-count

## Connections

- Exact hypothesis-testing characterization of the same Gaussian mechanism: [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]]. There $\mu$-GDP implies $(\alpha,\mu^2\alpha/2)$-RDP, consistent with $\mu=1/\sigma$ here.
- Randomized response is the canonical local-DP mechanism; the census paper contrasts local with trusted-curator models in [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]].
- Gaussian algebra background: [[Gaussian Distributions and Algebra]].

## See Also

- [[Mironov 2017 - Renyi Differential Privacy - Overview]]
- [[Mironov 2017 - Discussion, Budget Curves and Open Questions]]
