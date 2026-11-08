---
title: "Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Dong Roth Su 2022 - Gaussian Differential Privacy.pdf]]"
source_location: "Sec. 3 intro, 3.1-3.2: Definition 3.1, Theorems 3.2, 3.4, 3.5, Corollary 3.3, Figure 1; Appendices C-D, pp. 13-18 and 47-64"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Dong Roth Su 2022 - Gaussian Differential Privacy"
doc_type: paper
depends_on:
  - "[[Dong Roth Su 2022 - Trade-off Functions and f-DP]]"
  - "[[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]]"
used_by:
  - "[[Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen]]"
  - "[[Dong Roth Su 2022 - Privacy Amplification by Subsampling]]"
  - "[[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]]"
aliases:
  - f-DP composition theorem
  - tensor product of trade-off functions
  - privacy central limit theorem
  - GDP CLT
---

# Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems

> [!summary]
> Adaptive composition of $f_i$-DP mechanisms is $f_1\otimes\cdots\otimes f_n$-DP, where $\otimes$ is the tensor product of trade-off functions (Theorem 3.2), and the bound is tight. For GDP it collapses to $\sqrt{\sum\mu_i^2}$-GDP. Two central limit theorems show that, when each $f_i$ is close to perfect privacy, $f_1\otimes\cdots\otimes f_n$ is approximately $\mu$-GDP with $\mu$ computed from moment functionals of the log-likelihood ratio (Theorems 3.4, 3.5).

## Overview

Composition is the central requirement for modular private algorithm design: an analyst runs a sequence of analyses on the same dataset, each informed by earlier ones. Let $M_1:X\to Y_1$, $M_2:X\times Y_1\to Y_2$ etc. The composed mechanism is $M(S)=(y_1,M_2(S,y_1),\dots)$ with $y_1=M_1(S)$, i.e. the trajectory of a Markov chain.

## Main Content

> [!definition] Definition 3.1 (tensor product)
> For trade-off functions $f=T(P,Q)$ and $g=T(P',Q')$,
> $$
> f\otimes g\triangleq T(P\times P',\ Q\times Q').
> $$
> The $n$-fold product is $f^{\otimes n}$. It is well defined (independent of the representing distributions; Lemma C.2 in Appendix C), and satisfies: (1) $\otimes$ is commutative and associative; (2) if $g_1\ge g_2$ then $f\otimes g_1\ge f\otimes g_2$; (3) $f\otimes\text{Id}=f$ with $\text{Id}(x)=1-x$ (the trade-off function of identical distributions); (4) $(f\otimes g)^{-1}=f^{-1}\otimes g^{-1}$, hence the product of symmetric functions is symmetric. Trade-off functions form a commutative monoid.
^def-tensor-product

> [!theorem] Theorem 3.2 (composition)
> Let $M_i(\cdot,y_1,\dots,y_{i-1})$ be $f_i$-DP for all $y_1\in Y_1,\dots,y_{i-1}\in Y_{i-1}$. Then the $n$-fold composed mechanism $M:X\to Y_1\times\cdots\times Y_n$ is $f_1\otimes\cdots\otimes f_n$-DP.
^thm-fdp-composition

**Tightness.** If the second mechanism ignores the first's output, $T(M(S),M(S'))=T(M_1(S),M_1(S'))\otimes T(M_2(S),M_2(S'))$; choosing neighbors that attain $f_1,f_2$ shows $f_1\otimes f_2$ cannot be improved. By contrast, no single $(\varepsilon,\delta)$ captures the composition of $(\varepsilon,\delta)$-DP mechanisms exactly.

*Proof idea (Appendix C).* The self-contained proof uses only the Neyman-Pearson lemma, not Blackwell's theorem. Key lemma (C.1): if for every input $y$ the conditional testing problem $K_1(y)$ vs $K_1'(y)$ is harder than $K_2(y)$ vs $K_2'(y)$ (i.e. $f_1^y\ge f_2^y$), then the joint testing problems satisfy $f_1\ge f_2$. Lemma C.2: $T(P,Q)\ge T(\tilde P,\tilde Q)\Rightarrow T(P\times P',Q\times Q')\ge T(\tilde P\times P',\tilde Q\times Q')$. Earlier work (Kairouz-Oh-Viswanath) took the testing view with Blackwell as a tool and gave an $(\varepsilon,\delta)$ composition theorem improving Dwork-Rothblum-Vadhan.

> [!theorem] Corollary 3.3 (GDP composition)
> $G_{\mu_1}\otimes\cdots\otimes G_{\mu_n}=G_\mu$ with $\mu=\sqrt{\mu_1^2+\cdots+\mu_n^2}$. Hence the $n$-fold composition of $\mu_i$-GDP mechanisms is $\sqrt{\mu_1^2+\cdots+\mu_n^2}$-GDP.
^thm-gdp-composition

This follows from rotational invariance of Gaussians with identity covariance (proof in Appendix D).

### Central limit theorems (Sec. 3.2)

For a trade-off function $f=T(P,Q)$, define four functionals (all in $[0,+\infty]$; all are 0 for $\text{Id}$):
$$
\text{kl}(f)=-\int_0^1\log|f'(x)|dx,\quad\kappa_2(f)=\int_0^1\log^2|f'(x)|dx,\quad\kappa_3(f)=\int_0^1|\log|f'(x)||^3dx,\quad\bar\kappa_3(f)=\int_0^1\big|\log|f'(x)|+\text{kl}(f)\big|^3dx.
$$
They compute moments of the log-likelihood ratio of $P$ and $Q$; in particular $\text{kl}(f)$ is the KL divergence of $P$ and $Q$. Let $\mathbf{kl}=(\text{kl}(f_1),\dots,\text{kl}(f_n))$ and likewise $\boldsymbol\kappa_2,\boldsymbol{\bar\kappa}_3$.

> [!theorem] Theorem 3.4 (Berry-Esseen-type CLT for $f$-DP)
> Let $f_1,\dots,f_n$ be symmetric trade-off functions with $\kappa_3(f_i)<\infty$. Define
> $$
> \mu=\frac{2\|\mathbf{kl}\|_1}{\sqrt{\|\boldsymbol\kappa_2\|_1-\|\mathbf{kl}\|_2^2}},\qquad\gamma=\frac{0.56\,\|\boldsymbol{\bar\kappa}_3\|_1}{\big(\|\boldsymbol\kappa_2\|_1-\|\mathbf{kl}\|_2^2\big)^{3/2}},
> $$
> and assume $\gamma<\tfrac12$. Then for all $\alpha\in[\gamma,1-\gamma]$,
> $$
> G_\mu(\alpha+\gamma)-\gamma\ \le\ f_1\otimes f_2\otimes\cdots\otimes f_n(\alpha)\ \le\ G_\mu(\alpha-\gamma)+\gamma.
> $$
^thm-clt-berry-esseen

The lower bound says the composition is approximately $\mu$-GDP, the upper bound says how tight that is ($\gamma$). $G_\mu$ is extended to be 1 on $(-\infty,0)$ and 0 on $(1,\infty)$ to drop the range restriction. If all $f_i=f\ne\text{Id}$, then $\mu\sim\sqrt n\to\infty$ (blatant non-privacy); the theorem is useful when each $f_i$ is close to $\text{Id}$ so $\mu$ converges and $\gamma\to0$. The condition $\kappa_3<\infty$ excludes $f_{\varepsilon,\delta}$ with $\delta>0$ (since $f(0)<1$), handled in [[Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen]].

> [!theorem] Theorem 3.5 (asymptotic CLT)
> Let $\{f_{ni}:1\le i\le n\}_{n\ge1}$ be a triangular array of symmetric trade-off functions with, for constants $K\ge0$, $s>0$, as $n\to\infty$: (1) $\sum_i\text{kl}(f_{ni})\to K$; (2) $\max_i\text{kl}(f_{ni})\to0$; (3) $\sum_i\kappa_2(f_{ni})\to s^2$; (4) $\sum_i\kappa_3(f_{ni})\to0$. Then
> $$
> \lim_{n\to\infty}f_{n1}\otimes\cdots\otimes f_{nn}(\alpha)=G_{2K/s}(\alpha)\quad\text{uniformly on }[0,1].
> $$
^thm-clt-asymptotic

So the composition is asymptotically $2K/s$-GDP: GDP is the **only** parameterized family that faithfully represents the effect of composition; neither $\varepsilon$-DP nor $(\varepsilon,\delta)$-DP can be tracked losslessly (the family $f_{\varepsilon,\delta}$ cannot represent the limit). Conditions mirror Lindeberg's: both $\text{kl}$ and $\kappa_2$ should be $O(1/n)$ for most components, and no single mechanism should dominate (condition 2). In all the paper's applications $s=\sqrt{2K}$, so the composition is asymptotically $s$-GDP; proving this in general or finding a counterexample is left open.

## Examples

> [!example] Exact GDP composition
> Setup: three Gaussian mechanisms that are $0.3$-, $0.4$- and $1.2$-GDP.
> Solution: $\mu=\sqrt{0.09+0.16+1.44}=\sqrt{1.69}=1.3$. The total is $1.3$-GDP, i.e. $(\varepsilon,\delta)$ pairs on the curve $\delta(\varepsilon)$ from Corollary 2.13, such as $\varepsilon\approx5.95$ at $\delta=10^{-5}$ (recomputed).
> Interpretation: the Gaussian components add in quadrature; the $1.2$ component dominates ($1.44$ of $1.69$). Contrast with basic $(\varepsilon,\delta)$ composition where all $\varepsilon_i$ add linearly.
^ex-gdp-compose

> [!example] Sanity check of Theorem 3.5 on Gaussians (this note's derivation)
> Take $n$ components each $\frac{\mu}{\sqrt n}$-GDP, $f_{ni}=G_{\mu/\sqrt n}=T(\mathcal N(0,1),\mathcal N(\mu/\sqrt n,1))$. With $m=\mu/\sqrt n$: $\text{kl}=m^2/2$ and $\kappa_2=\mathbb E_P[\log^2(dQ/dP)]=m^2+m^4/4$ (the log-likelihood ratio $mX-m^2/2$ has mean $-m^2/2$ and variance $m^2$). Hence $K=\sum\text{kl}=\mu^2/2$, $s^2=\sum\kappa_2=\mu^2+\mu^4/(4n)\to\mu^2$, and $2K/s\to\mu^2/\mu=\mu$: the CLT reproduces the exact answer from Corollary 3.3, and $s=\sqrt{2K}$ as in the paper's remark.
^ex-clt-gaussian-check

## Connections

- RDP's additive composition is the divergence-level analogue: [[Mironov 2017 - RDP Properties and Composition]]; the moments accountant sums log-moments in the same way: [[Abadi 2016 - Moments Accountant Theorems and Proofs]].
- Dwork-Rothblum-Vadhan advanced composition and its limits: [[Mironov 2017 - From RDP to Approximate DP and Advanced Composition]].
- Applying these CLTs to subsampled SGD: [[Dong Roth Su 2022 - Noisy SGD Privacy Analysis]].
- The statistical analogy: Lindeberg-type conditions and Berry-Esseen bounds; for the broader role of Gaussian approximations see [[Gaussian Distributions and Algebra]].
- Marketing relevance: a measurement partner releasing many reports on the same population can budget total exposure as $\sqrt{\sum\mu_i^2}$ if each release is GDP; see [[Dong Roth Su 2022 - Divergence Conversion, Discussion and Limitations]].

## See Also

- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]]
- [[Dong Roth Su 2022 - Composition of Approximate DP and Berry-Esseen]]
