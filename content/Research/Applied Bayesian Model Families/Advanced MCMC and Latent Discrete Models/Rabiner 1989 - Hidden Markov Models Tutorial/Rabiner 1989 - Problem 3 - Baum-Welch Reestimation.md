---
title: "Rabiner 1989 - Problem 3 - Baum-Welch Reestimation"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/theorem
  - doc/paper
source: "[[raw/Rabiner 1989 - A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition.pdf]]"
source_location: "Sec. III.C, pp. 264-266; eqs 36-44; Fig. 6"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Rabiner 1989 - Hidden Markov Models Tutorial"
doc_type: paper
depends_on:
  - "[[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]]"
  - "[[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]]"
used_by:
  - "[[Rabiner 1989 - HMM Types, Continuous Densities and State Duration]]"
  - "[[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]]"
aliases:
  - "Baum-Welch"
  - "HMM EM"
  - "Reestimation formulas"
---

# Rabiner 1989 - Problem 3 - Baum-Welch Reestimation

> [!summary]
> Baum-Welch iteratively reestimates $\lambda=(A,B,\pi)$ from expected counts: $\bar a_{ij}=\sum_t\xi_t(i,j)/\sum_t\gamma_t(i)$, $\bar b_j(k)=\sum_{t:O_t=v_k}\gamma_t(j)/\sum_t\gamma_t(j)$, $\bar\pi_i=\gamma_1(i)$. It is EM with auxiliary function $Q(\lambda,\bar\lambda)$, monotonically increases likelihood and converges to a local maximum only. It automatically preserves the stochastic constraints and any zero entries.

## Overview

"The third, and by far the most difficult, problem of HMMs is to determine a method to adjust the model parameters." No analytic solution exists; one chooses $\lambda$ so $P(O\mid\lambda)$ is locally maximised using Baum-Welch (equivalently EM; Dempster, Laird and Rubin 1977) or gradient techniques.

## Main Content

> [!definition] Transition posterior $\xi$ (eqs 36-38; Fig. 6)
> $\xi_t(i,j)=P(q_t=S_i,q_{t+1}=S_j\mid O,\lambda)=\dfrac{\alpha_t(i)a_{ij}b_j(O_{t+1})\beta_{t+1}(j)}{P(O\mid\lambda)}=\dfrac{\alpha_t(i)a_{ij}b_j(O_{t+1})\beta_{t+1}(j)}{\sum_i\sum_j\alpha_t(i)a_{ij}b_j(O_{t+1})\beta_{t+1}(j)}$, and $\gamma_t(i)=\sum_j\xi_t(i,j)$.
^def-xi

> [!theorem] Expected counts (eqs 39a-b)
> $\sum_{t=1}^{T-1}\gamma_t(i)$ = expected number of transitions from $S_i$ (equivalently visits to $S_i$, excluding $t=T$); $\sum_{t=1}^{T-1}\xi_t(i,j)$ = expected number of transitions from $S_i$ to $S_j$.
^thm-expected-counts

> [!theorem] Baum-Welch reestimation formulas (eqs 40a-c)
> $$
> \bar\pi_i=\gamma_1(i),\qquad\bar a_{ij}=\frac{\sum_{t=1}^{T-1}\xi_t(i,j)}{\sum_{t=1}^{T-1}\gamma_t(i)},\qquad\bar b_j(k)=\frac{\sum_{t:\,O_t=v_k}\gamma_t(j)}{\sum_{t=1}^T\gamma_t(j)}.
> $$
> Baum et al. proved that either (1) the current model $\lambda$ is a critical point of the likelihood ($\bar\lambda=\lambda$), or (2) $P(O\mid\bar\lambda)>P(O\mid\lambda)$. Iterating converges to a critical point, a **maximum-likelihood estimate**; "the forward-backward algorithm leads to local maxima only" and the likelihood surface has many local maxima.
^thm-baum-welch

> [!theorem] EM interpretation (eqs 41-42)
> Baum's auxiliary function $Q(\lambda,\bar\lambda)=\sum_QP(Q\mid O,\lambda)\log P(O,Q\mid\bar\lambda)$ [paper writes $P(Q|O,\lambda)\log[P(O,Q|\bar\lambda)]$]; maximising over $\bar\lambda$ gives $P(O\mid\bar\lambda)\ge P(O\mid\lambda)$ ($\max_{\bar\lambda}Q\Rightarrow$ likelihood increase). E-step = compute $Q$ (the forward-backward counts); M-step = maximise it.
^thm-em

> [!theorem] Constraints and Lagrange characterisation (eqs 43-44)
> The stochastic constraints $\sum_i\bar\pi_i=1$, $\sum_j\bar a_{ij}=1$, $\sum_k\bar b_j(k)=1$ hold automatically at every iteration. Via Lagrange multipliers, $P$ is at a critical point iff $\pi_i=\dfrac{\pi_i\,\partial P/\partial\pi_i}{\sum_k\pi_k\,\partial P/\partial\pi_k}$, $a_{ij}=\dfrac{a_{ij}\,\partial P/\partial a_{ij}}{\sum_ka_{ik}\,\partial P/\partial a_{ik}}$, $b_j(k)=\dfrac{b_j(k)\,\partial P/\partial b_j(k)}{\sum_\ell b_j(\ell)\,\partial P/\partial b_j(\ell)}$; manipulation shows the right-hand sides equal (40a-c), so the reestimates are exactly critical points. Gradient techniques give comparable solutions (ref [14]).
^thm-lagrange

> [!example] Baum-Welch on simulated data (numpy)
> Data: 200 steps from the 2-state Poisson HMM with $A=\begin{pmatrix}.9&.1\\.2&.8\end{pmatrix}$, rates $(1,6)$. 100 EM iterations from a perturbed start returned $\hat A\approx\begin{pmatrix}.95&.05\\.19&.81\end{pmatrix}$, rates $(0.98,5.12)$, log-likelihood $-330.18$ vs $-335.36$ at the true parameters (EM maximises the in-sample likelihood, so it exceeds the truth's value: a reminder that MLE overfits small samples).
> ```python
> def baum_welch(y, N=2, iters=100):          # Poisson emissions; uses forward/backward from the previous note
>     A = np.full((N,N), 1/N) + 0.1*rng.random((N,N)); A /= A.sum(1, keepdims=True)
>     pi = np.ones(N)/N; lam = np.array([y.mean()*0.5, y.mean()*1.5])
>     for _ in range(iters):
>         logB = poisson.logpmf(y[:, None], lam[None, :])
>         la = forward(logB, np.log(A), np.log(pi)); lb = backward(logB, np.log(A)); ll = logsumexp(la[-1])
>         g = np.exp(la + lb - ll)
>         xi = np.exp(la[:-1, :, None] + np.log(A)[None] + (logB[1:] + lb[1:])[:, None, :] - ll)
>         pi = g[0]; A = xi.sum(0)/g[:-1].sum(0)[:, None]; lam = (g*y[:, None]).sum(0)/g.sum(0)
>     return A, pi, lam, ll
> ```
^ex-baum-welch-numpy

**EM vs Bayesian.** Baum-Welch returns a point estimate (local MLE) with no uncertainty, is sensitive to initialisation, can drive states to degenerate solutions, and is invariant to relabelling. A Bayesian treatment instead puts Dirichlet priors on rows of $A$ and priors on emission parameters, marginalises the hidden path with the forward algorithm, and samples (NUTS); the price is label switching, handled by ordering constraints ([[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]]).

## Connections

Initialisation, scaling and multiple sequences are essential for practice: [[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]]. General EM relation to variational inference: [[The ELBO and KL Divergence Minimization]].

## See Also
[[Rabiner 1989 - HMM Tutorial - Overview]], [[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]]
