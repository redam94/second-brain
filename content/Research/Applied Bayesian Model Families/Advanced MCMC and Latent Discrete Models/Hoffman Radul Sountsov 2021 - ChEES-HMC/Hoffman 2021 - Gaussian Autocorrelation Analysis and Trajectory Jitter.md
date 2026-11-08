---
title: "Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/theorem
  - doc/paper
source: "[[raw/Hoffman Radul Sountsov 2021 - Adaptive-MCMC Scheme for Setting Trajectory Lengths in HMC.pdf]]"
source_location: "Sec. 2 intro and 2.1, pp. 2-4; Figure 2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Radul Sountsov 2021 - ChEES-HMC"
doc_type: paper
depends_on:
  - "[[Hoffman 2021 - HMC Background and the GPU Problem for NUTS]]"
used_by:
  - "[[Hoffman 2021 - ChEES Criterion and Algorithm 1]]"
  - "[[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]]"
aliases:
  - "Jittered HMC autocorrelation on Gaussians"
  - "Why jitter trajectory length"
---

# Hoffman 2021 - Gaussian Autocorrelation Analysis and Trajectory Jitter

> [!summary]
> For HMC on a Gaussian with exact dynamics, first-order autocorrelation is $\cos(t/\sigma_d)$, which cannot be small in all directions for any fixed $t$. Uniform jitter $t\sim U(0,T)$ turns cosines into sincs. The second-moment autocorrelation is $\tfrac12+\tfrac12\,\text{sinc}(2T/\sigma_d)$, minimised near $T\approx 2.25\sigma_d$; using $T=2.25\,\sigma_{\max}$ bounds the worst-case first- and second-moment autocorrelations at 0.346 and 0.564.

## Overview

The paper builds intuition on a $D$-dimensional zero-mean Gaussian with diagonal covariance $\Sigma_{dd}=\sigma_d^2$, assuming $\epsilon$ is small enough that leapfrog $\approx$ exact Hamiltonian dynamics. This case matters because "a sampler can hardly be called general-purpose if it fails on multivariate Gaussians" and, via the Bayesian central limit theorem, approximately Gaussian posteriors are common.

## Main Content

> [!definition] Phase-space representation (eq. 2)
> For dimension $d$ define the magnitude-angle pair by $a_d^2=\sigma_d^{-2}\theta_d^2+r_d^2$ and $\phi_d=\tan^{-1}\!\big(\theta_d/(\sigma_d r_d)\big)$, so $r_d=a_d\cos\phi_d$ and $\theta_d=a_d\sigma_d\sin\phi_d$. After trajectory length $t=\epsilon L$ the state is $r_d'=a_d\cos(\phi_d+t/\sigma_d)$, $\theta_d'=a_d\sigma_d\sin(\phi_d+t/\sigma_d)$. This solves Hamilton's equations: each coordinate rotates in phase space with angular frequency $1/\sigma_d$.
^def-phase-rotation

At equilibrium $a_d^2\sim\text{Exponential}(\text{rate }1/2)$ (i.e. $\mathbb E[a_d^2]=2$), $\phi_d\sim\text{Uniform}(0,2\pi)$, independent.

> [!theorem] First-order autocorrelation of fixed-length HMC (eq. 3)
> $\sigma_d^{-2}\,\mathbb E[\theta_d\theta_d']=\mathbb E[a_d^2\sin\phi_d\sin(\phi_d+t/\sigma_d)]=\cos(t/\sigma_d)$.
> *Proof sketch.* $\sin\phi\sin(\phi+\delta)=\tfrac12[\cos\delta-\cos(2\phi+\delta)]$, $\mathbb E[a_d^2]=2$, and $\mathbb E[\cos(2\phi_d+\delta)]=0$ for uniform $\phi_d$.
^thm-cosine-autocorr

**Consequence (resonance).** With many dimensions there is almost surely some $d$ with $t/\sigma_d\bmod 2\pi\approx 0$, so there is no $t$ that gives low autocorrelation in every direction (Neal 2011, sec. 3.2: this can interfere with ergodicity unless the trajectory length is randomised).

> [!theorem] Jittered first-moment autocorrelation (eq. 4)
> If $t\sim\text{Uniform}(0,T)$, the autocorrelation is $\frac1T\int_0^T\cos(t/\sigma_d)\,dt=\dfrac{\sin(T/\sigma_d)}{T/\sigma_d}$, which tends to 0 as $T/\sigma_d\to\infty$. Its minimum is about $-0.22$ at $T\approx4.5\sigma_d$. If $T=4.5\sigma_{\max}$ then $\max_d\ \sin(T/\sigma_d)/(T/\sigma_d)\le0.129$.
^thm-sinc-autocorr

A chain with $T=4.5\sigma_{\max}$ is anti-correlated, good for first moments. But for nonlinear functionals, e.g. posterior variance, one needs the autocorrelation of $\theta_d^2$ (mean $\sigma^2$, variance $2\sigma^4$ at equilibrium).

> [!theorem] Second-moment autocorrelation (eqs 5-6)
> Fixed $t$: $\dfrac{1}{2\sigma_d^4}\mathbb E[((\theta_d')^2-\sigma_d^2)(\theta_d^2-\sigma_d^2)]=\tfrac12\big(1+\cos(2t/\sigma_d)\big)$.
> Uniform jitter on $(0,T)$: $\tfrac12+\tfrac12\,\dfrac{\sin(2T/\sigma_d)}{2T/\sigma_d}$.
> This no longer goes to 0 but to $\tfrac12$, and it decays twice as fast, with a minimum at $T\approx2.25\sigma_d$. Taking $T:=2.25\sigma_{\max}$ gives worst-case first-moment autocorrelation $\le0.346$ (eq. 4) and worst-case second-moment autocorrelation $\le0.564$ (eq. 6).
^thm-second-moment-autocorr

> [!example] Numerical check of the constants
> The minimum of $\sin x/x$ is $-0.2172$ at $x\approx4.493$; the minimum of $\tfrac12+\tfrac12\sin(2x)/(2x)$ is $0.391$ at $x\approx2.247$; $\sin(2.25)/2.25=0.3458$; and the largest positive value of $\sin y/y$ beyond $y=4.5$ is $0.128$ (at $y\approx7.725$), giving $\tfrac12+\tfrac12(0.128)=0.564$. These reproduce the paper's 0.129, 0.346 and 0.564 up to rounding.
^ex-constants

> [!example] Figure 2 interpretation
> Ten log-spaced scales $\sigma$. Top row: first moment, bottom row: second moment. Left: fixed $t$ (cosines with different periods; the worst-case black line is always near 1 somewhere). Right: jittered $T$ (sincs converging to a constant). Second moments raise the minimum achievable autocorrelation from $-1$ to $0$ (fixed $t$) and from about $-0.22$ to about $0.39$ (jittered).
^ex-figure2

**Design lessons the paper draws.**
1. To get low-variance estimators of many expectations at different posterior scales, **jitter** trajectory lengths and use a maximum length of the order of the largest posterior scale.
2. For small-scale dimensions ($\sigma_d\ll\sigma_{\max}$) the second-moment autocorrelation is at least about $0.5$ whatever you do, so use the shortest, cheapest $T$ that gets there: $T=2.25\sigma_{\max}$.
3. Maximising plain ESJD yields trajectories up to twice as long as optimal, because ESJD is fooled by anti-correlated samples that help means but hurt variances. Maximising ESJD of the *centred and squared* parameters gives the shorter, efficient length. This is the origin of ChEES.

```python
import numpy as np
x = np.linspace(1e-3, 30, 300000)
sinc = np.sin(x)/x                      # jittered first-moment autocorrelation, x = T/sigma
second = 0.5 + 0.5*np.sin(2*x)/(2*x)    # jittered second-moment autocorrelation
print(x[sinc.argmin()], sinc.min())     # ~4.49, -0.217
print(x[second.argmin()], second.min()) # ~2.25, 0.391
```

## Examples

Sampling a $D=100$ Gaussian whose eigenvalues span five orders of magnitude (the paper's ill-conditioned Gaussian target) exhibits exactly this resonance problem: fixed-$L$ HMC is "disastrous" with too little jitter ([[Hoffman 2021 - Jitter Ablations, Discussion and Many-Chain Practice]]).

## Connections

[[Hoffman 2021 - HMC Background and the GPU Problem for NUTS]] sets up leapfrog; [[Hoffman 2021 - ChEES Criterion and Algorithm 1]] turns the "squared, centred ESJD" idea into an adaptive algorithm. Related vault note: [[Efficient MCMC]].

## See Also
[[Hoffman 2021 - ChEES-HMC - Overview]], [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]]
