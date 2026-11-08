---
title: "Girosi King 2007 - Lee-Carter as a Random Walk with Drift"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/theorem
  - doc/paper
source: "[[raw/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method.pdf]]"
source_location: "Sec. 3, pp. 11-16; Eqs. 11-19; Figure 2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Girosi King 2007 - Understanding the Lee-Carter Mortality Forecasting Method"
doc_type: paper
depends_on:
  - "[[Girosi King 2007 - Lee-Carter Model Estimation and Forecasting]]"
used_by:
  - "[[Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles]]"
  - "[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]"
aliases:
  - "Lee-Carter random walk with drift equivalence"
  - "Lee-Carter bias"
  - "multivariate random walk with drift"
---

# Girosi King 2007 - Lee-Carter as a Random Walk with Drift

> [!summary]
> The two-stage Lee-Carter model is a multivariate random walk with drift $m_t=m_{t-1}+\psi+\eta_t$ whose error covariance is the restricted $\Sigma_{LC}=\sigma_{rw}^2\psi\psi'/\|\psi\|^2+2\sigma^2I$. The unrestricted RWD estimator $\hat\psi=(m_T-m_1)/(T-1)$ is unbiased for data from either model; the Lee-Carter estimator is unbiased only if the real covariance is spherical or aligned with the drift.

## Main Content

> [!definition] Multivariate random walk with drift (Eqs. 11-13)
> $m_t=m_{t-1}+\psi+\eta_t$, $\eta_t\sim N(0,\Sigma)$ ($A\times A$, arbitrary), $\psi\in\mathbb R^A$. MLE $\hat\psi=(m_T-m_1)/(T-1)$ with $\text{Var}[\hat\psi]=\Sigma/(T-1)$. Forecast point estimate $m_T+\Delta t\,\hat\psi$: draw a straight line through the first and last points and extrapolate.
^def-rwd

> [!theorem] Lee-Carter is a restricted RWD (Eqs. 14-17)
> The Lee-Carter system $m_t=\bar m+\beta\gamma_t+\epsilon_t$, $\gamma_t=\gamma_{t-1}+\theta+\xi_t$ implies $m_t=m_{t-1}+\theta\beta+(\beta\xi_t+\epsilon_t-\epsilon_{t-1})$. With the normalisation $\theta=\|\psi\|$, $\beta=\psi/\|\psi\|$ one has $\theta\beta=\psi$ and
> $$
> \Sigma_{LC}=\sigma_{rw}^2\frac{\psi\psi'}{\|\psi\|^2}+2\sigma^2 I.
> $$
> So shocks are of only two kinds: age-uncorrelated ($2\sigma^2I$) and perfectly age-correlated ($\beta\xi_t$), with the correlated shock's relative size across ages equal to the relative decline rate $\beta_a$. Lee-Carter is thus a RWD with an uninformative prior on $\psi$ but a point mass on $\Sigma$ given $\psi$: $P(\psi,\Sigma)\propto\delta\big(\Sigma-\sigma_{rw}^2\psi\psi'/\|\psi\|^2-2\sigma^2I\big)$. Also equivalent to a random walk with stochastic drift $\psi_t=\tfrac{\psi}{\|\psi\|}(\|\psi\|+\xi_t)$ of fixed direction (cf. local linear trend).
^thm-lc-rwd

> [!theorem] Bias asymmetry
> (i) Data from Lee-Carter: both the RWD and Lee-Carter estimators of $\psi$ are unbiased; Lee-Carter is more efficient. (ii) Data from RWD with arbitrary $\Sigma$: the RWD estimator is unbiased; Lee-Carter is biased in general. Reason: the difference form $m_t-m_{t-1}=(\gamma_t-\gamma_{t-1})\beta+\epsilon_t-\epsilon_{t-1}$ shows $\hat\beta$ is the leading eigenvector of $C=\frac1T\sum_t(m_t-m_{t-1})(m_t-m_{t-1})'$, and under RWD
> $$
> C=\psi\psi'+\Sigma+Z,\qquad \mathbb E[Z]=0\quad\text{(Eq. 19)}.
> $$
> For $\hat\beta\to\psi/\|\psi\|$ the leading eigenvector of $\psi\psi'+\Sigma$ must be $\psi/\|\psi\|$, which fails unless $\Sigma$ is spherical ($\propto I$) or its first principal component happens to align with the drift.
>
> *Intuition (Fig. 2).* With two ages and noise 20 times larger vertically than horizontally, the principal component is "fooled" into the high-variance direction, so the forecast takes off in the wrong direction.
^thm-bias

**When to prefer which.** Lee-Carter only if one is confident in its covariance structure; RWD for pure forecasting; Lee-Carter as a base for developing new models. Empirically Lee-Carter does not beat RWD in short-term U.S. forecasts (Bell 1997); no evidence for long-term.

## Examples

> [!example] Bias demonstration with non-spherical shocks
> Setup: 2 ages, drift $\psi=(-1,-1)/\sqrt2\cdot0.1$ per year, shock SDs $0.01$ (age 1) and $0.20$ (age 2), $T=60$. Result expected from Eq. 19: leading eigenvector of $\psi\psi'+\Sigma$ is about $(0.12,0.99)$ in absolute value rather than $(1,1)/\sqrt2$; Lee-Carter projects mostly onto age 2. Interpretation: forecasts for age 1 are wrong by a systematic factor, while the RWD estimate remains correct on average.
^ex-bias
```python
import numpy as np
psi = -0.1*np.array([1,1])/np.sqrt(2); Sigma = np.diag([0.01**2, 0.20**2])
C = np.outer(psi, psi) + Sigma
w, V = np.linalg.eigh(C); print(V[:, -1])      # leading eigenvector ~ (0.12, 0.99) up to sign, not (1,1)/sqrt(2)
```

## Connections
[[Girosi King 2007 - Universal Increasing Nonsmoothness of Age Profiles]], [[Factor Analysis and PPCA]], [[Hierarchical Models]] (restriction as a strong prior).

## See Also
[[Girosi King 2007 - Understanding the Lee-Carter Method - Overview]]
