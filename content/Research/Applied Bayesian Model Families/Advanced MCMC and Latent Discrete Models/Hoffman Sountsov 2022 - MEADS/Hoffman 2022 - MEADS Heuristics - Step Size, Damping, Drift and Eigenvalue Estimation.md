---
title: "Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/definition
  - doc/paper
source: "[[raw/Hoffman Sountsov 2022 - Tuning-Free Generalized Hamiltonian Monte Carlo.pdf]]"
source_location: "Sec. 4 and Algorithms 2-3, pp. 5-7; Appendix C"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Hoffman Sountsov 2022 - MEADS"
doc_type: paper
depends_on:
  - "[[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]]"
  - "[[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]]"
used_by:
  - "[[Hoffman 2022 - MEADS - Experiments and Ablations]]"
aliases:
  - "MEADS algorithm"
  - "Max-eigenvalue adaptation of damping and step size"
  - "tr(Sigma^2)/tr(Sigma) estimator"
---

# Hoffman 2022 - MEADS Heuristics - Step Size, Damping, Drift and Eigenvalue Estimation

> [!summary]
> MEADS sets, from the neighbouring fold: per-dimension scales $\hat\sigma_d$; step size $\epsilon=\min\{1,0.5/\sqrt{\lambda_{\max}(-\bar H)}\}$ with $-\bar H$ estimated by the gradient outer product; damping $\gamma=\max\{1/(t\epsilon),1/\sqrt{\lambda_{\max}(\hat\Sigma)}\}$ and $\alpha=1-e^{-2\epsilon\gamma}$; and slice drift $\delta=\alpha/2$. Largest eigenvalues are estimated by the ratio $\text{tr}(\Sigma^2)/\text{tr}(\Sigma)$, computable in $O(N^2D)$ without an eigendecomposition.

## Overview

GHMC (via persistent slice sampling) has four tunable pieces: diagonal preconditioner, $\epsilon$, $\alpha$, $\delta$. All are derived below from statistics of one fold, used for the neighbouring fold (see [[Hoffman 2022 - Ensemble-Chain Adaptation and Parallelism]]).

## Main Content

### 4.1 Diagonal preconditioning
Estimate marginal standard deviations $\hat\sigma_d$ from a fold's states and multiply the neighbour fold's per-dimension step size by $\hat\sigma_d$. Subsequent formulas use transformed variables and gradients $\bar\theta_d=\theta_d/\hat\sigma_d$, $\bar g_d=\nabla_{\theta_d}\log p(\theta)\,\hat\sigma_d$.

### 4.2 Step size

> [!theorem] Leapfrog stability on Gaussians
> For a quadratic potential $\tfrac12\theta^\top H\theta$ (Gaussian target with covariance $H^{-1}$) leapfrog stability requires $\epsilon\le2/\sqrt{\lambda_{\max}(H)}$ (Leimkuhler and Reich 2004). The accuracy of uncorrected underdamped Langevin MCMC likewise needs $\epsilon\propto1/\sqrt{\lambda_{\max}(-\bar H)}$ (Dalalyan and Riou-Durand 2020).
> MEADS sets $\epsilon:=\tfrac12\dfrac{1}{\sqrt{\lambda_{\max}(-\bar H)}}$, with $\bar H\triangleq\int p(\theta)\nabla^2\log p(\theta)\,d\theta$ the *average* Hessian (the $\tfrac12$ is a safety margin; Appendix A shows low sensitivity).
^thm-step-stability

> [!theorem] Hessian from gradients (eq. 4; proof in Appendix E)
> $-\int p(\theta)\dfrac{\partial^2\log p}{\partial\theta\partial\theta^\top}d\theta=\int p(\theta)\Big(\dfrac{\partial\log p}{\partial\theta}\Big)^{\!\top}\!\dfrac{\partial\log p}{\partial\theta}\,d\theta$, i.e. the expected negative Hessian equals the expected outer product of the score (the Fisher-information identity applied to the log-density), under mild conditions. Hence $-\hat H=\frac1N\sum_n\bar g_{k,n}\bar g_{k,n}^\top$ from the $N$ transformed gradients of fold $k$; no second derivatives needed.
^thm-hessian-gradient-identity

### 4.3 Damping factor and slice drift

> [!definition] Momentum memory and damping
> Ignoring leapfrog half-steps, $m_{t+i}\approx(1-\alpha)^{i/2}m_t+\sum_{j=1}^i\epsilon\nabla\log p(\theta_{t+j})+\sqrt\alpha\,\xi_j$ with $\xi_j\sim\mathcal N(0,I)$ (eq. 5): the influence of $m_t$ decays exponentially in $i$. We want to forget momentum once the chain has had time to traverse the highest-variance direction. On a Gaussian with covariance $\Sigma$ leapfrog needs $O(\lambda_{\max}(\Sigma)/\epsilon)$ steps (in the paper's notation; dimensionally this is the largest scale) to progress along the least-constrained direction, so choose $-\tfrac12\log(1-\alpha)\propto\epsilon/\lambda_{\max}$, i.e. for small $\alpha$
> $$
> \gamma:=1/\lambda_{\max}(\hat\Sigma),\qquad\alpha=1-e^{-2\epsilon\gamma}\quad(\text{eq. 6}).
> $$
> $\hat\Sigma$ is the empirical covariance of the neighbour fold's (preconditioned) states $\bar\theta$. **Note.** Algorithm 3 line 9 implements $\gamma=1/\sqrt{\text{MAX\_EIG}(\bar\theta)}$, i.e. the inverse of the largest *scale* rather than of the largest variance; eq. 6 as typeset omits the square root, so follow Algorithm 3.
^def-damping

> [!definition] Early-iteration damping floor
> For stability enforce $\gamma_t\ge1/(t\epsilon_t)$ early on: if the optimal damping would have the chain forget momentum after more than $t$ steps and fewer than $t$ steps have elapsed, the covariance estimate is not yet trustworthy because chains arrive at the typical set at different rates; those differences must be damped away before a very small damping factor is safe.
^def-damping-floor

> [!definition] Slice drift
> Want $u$ stable long enough to travel far without rejecting, but not slower to mix than $\theta,m$. Set $\delta:=\alpha/2$, giving $u$ a period of $4/\alpha$ steps, after which the decay factor $(1-\alpha)^{2/\alpha}\approx e^{-2}\approx0.14$: the previous period's momentum has mostly been forgotten.
^def-slice-drift

### 4.4 Largest eigenvalue estimation

The largest eigenvalue of an unbiased estimate $\hat\Sigma$ can be a highly biased estimate of $\lambda_{\max}(\Sigma)$ (biased upward for small $N$).

> [!definition] Ratio estimator (eq. 7, Algorithm 2)
> $\text{tr}(\Sigma^2)/\text{tr}(\Sigma)=\sum_d\lambda_d^2/\sum_d\lambda_d$. If all eigenvalues are 0 or $\lambda_{\max}$ this equals $\lambda_{\max}$; it approximates $\lambda_{\max}$ unless there are many "small-but-not-tiny" eigenvalues. For $X\in\mathbb R^{N\times D}$ with rows of covariance $\Sigma$: $S=XX^\top$; $\lambda_\cdot=\text{tr}(S)/N$; $\lambda_\cdot^2=\dfrac{1}{N(N-1)}\sum_{n\ne n'}S_{n,n'}^2$; return $\lambda_\cdot^2/\lambda_\cdot$. It uses $\mathbb E[S_{n,n'}^2]=\mathbb E[x_n^\top x_{n'}x_{n'}^\top x_n]=\text{tr}(\mathbb E[X^\top X]^2)$ for $n\ne n'$ (note $\mathbb E[X^\top X]=N\Sigma$ in the paper's normalisation) and costs $O(N^2D)$, dominated by the $N$ gradient evaluations in practice.
^def-ratio-estimator

### Algorithm 3 (MEADS), in words
Inputs: $K$ folds of $N$ initial states. Initialise $u\sim\text{Uniform}(-1,1)$, $m\sim\mathcal N(0,I)$. For $t=1..T$, for each fold $k\ne t\bmod K$: estimate $\hat\mu,\hat\sigma$ from fold $(k-1)\bmod K$; standardise states and gradients ($\bar\theta,\bar g$); $\epsilon_{t,k}=\min\{1,0.5/\sqrt{\text{max\_eig}(\bar g)}\}$; $\gamma_{t,k}=\max\{1/(t\epsilon_{t,k}),1/\sqrt{\text{max\_eig}(\bar\theta)}\}$; $\alpha_{t,k}=1-e^{-2\epsilon_{t,k}\gamma_{t,k}}$, $\delta_{t,k}=\alpha_{t,k}/2$; run `pers_ghmc` with step sizes $\epsilon_{t,k}\hat\sigma_{t,k}$, damping $\alpha_{t,k}$, drift $\delta_{t,k}$ on fold $k$'s chains.

### Appendix C: behaviour of the estimator
$N\times D$ matrix $X$ with $X_{n,d}\sim\mathcal N(0,\sigma_d)$, $D=100$, four spectra each with $\max\sigma_d^2=1$: identity; log-spaced $\sigma$ from 0.1 to 1; linear-spaced from 0.1 to 1; bimodal ($\sigma_d=0$ for $d\le D/2$, $1$ otherwise). Small $N$ biases both the naive top eigenvalue and the ratio upward but the ratio's bias decays faster. The price is a small asymptotic bias for the log- and linear-spaced spectra: as $N\to\infty$ the ratio converges to $\sum\sigma_d^4/\sum\sigma_d^2$, a bit below $\sigma_{\max}^2$.

> [!example] Asymptotes and a small-sample check (numpy)
> Computed asymptotes: identity 1.000; log-spaced 0.517; linear-spaced 0.606; bimodal 1.000. For the log-spaced spectrum the ratio estimator gave 0.45, 0.53, 0.50, 0.52 at $N=16,64,256,1024$ while the naive top eigenvalue of $X^\top X/N$ gave 3.24, 1.81, 1.22, 1.13 against a true $\lambda_{\max}=1$.
> ```python
> import numpy as np
> def max_eig(X):                 # Algorithm 2; X is (N, D)
>     N = X.shape[0]; S = X @ X.T
>     lam1 = np.trace(S)/N
>     off = S**2; np.fill_diagonal(off, 0.0)
>     return (off.sum()/(N*(N-1))) / lam1
> ```
^ex-eigen-estimator

## Examples (PyMC-style)

Untested sketch for E86 using blackjax's MEADS adaptation (names may differ by version):
```python
import blackjax, jax
warmup = blackjax.meads_adaptation(logdensity_fn, num_chains=128)
(last_states, parameters), _ = warmup.run(jax.random.key(0), initial_positions, num_steps=2000)
# parameters hold per-chain step_size, momentum_inverse_scale, alpha, delta for the GHMC kernel
```

## Connections

[[Hoffman 2022 - MEADS - Experiments and Ablations]] evaluates this recipe; [[Hoffman 2022 - Appendix - Hogwild Counterexample and Hessian Identity Proof]] proves eq. 4. Compare with ChEES's trajectory-length adaptation in [[Hoffman 2021 - ChEES Criterion and Algorithm 1]].

## See Also
[[Hoffman 2022 - MEADS - Overview]], [[Hoffman 2022 - GHMC and Neal Persistent Slice Sampling]]
