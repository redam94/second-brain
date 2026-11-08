---
title: "Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/concept
  - doc/paper
source: "[[raw/Rabiner 1989 - A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition.pdf]]"
source_location: "Sec. V, pp. 271-275; eqs 90-113; Fig. 10"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Rabiner 1989 - Hidden Markov Models Tutorial"
doc_type: paper
depends_on:
  - "[[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]]"
  - "[[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]]"
used_by:
  - "[[Rabiner 1989 - Speech Recognition Applications and Results]]"
aliases:
  - "HMM scaling"
  - "Scaled forward-backward"
  - "HMM initial estimates"
---

# Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation

> [!summary]
> Forward variables underflow exponentially with $T$, so scale $\alpha_t$ by $c_t=1/\sum_i\alpha_t(i)$; the scale factors cancel exactly in the reestimation formulas and $\log P(O\mid\lambda)=-\sum_t\log c_t$. Multiple observation sequences are handled by summing expected counts, each weighted by $1/P_k$. Good initial emission estimates matter, small-sample estimates need interpolation or floors, and model size is chosen by experience.

## Overview

Section V is explicitly practical ("seat-of-the-pants experience gained from working with HMMs over the last several years") but contains exact derivations for scaling.

## Main Content

> [!theorem] Scaling (eqs 91-103)
> $\alpha_t(i)$ is a sum of terms $\prod a\prod b$ each below 1, so for $t\gtrsim100$ the dynamic range exceeds any machine precision. Define, with $\tilde\alpha_t(i)=\sum_j\hat\alpha_{t-1}(j)a_{ji}b_i(O_t)$ and scale $c_t=1/\sum_i\tilde\alpha_t(i)$ (eq. 91): $\hat\alpha_t(i)=c_t\tilde\alpha_t(i)$. Then $\hat\alpha_t(i)=\Big(\prod_{s\le t}c_s\Big)\alpha_t(i)=C_t\alpha_t(i)$ and $\hat\alpha_t(i)=\alpha_t(i)/\sum_j\alpha_t(j)$. Scaled backward variables use the same factors: $\hat\beta_t(i)=c_t\beta_t(i)$ ($\hat\beta_t=D_t\beta_t$ with $D_t=\prod_{s\ge t}c_s$). In the reestimation of $a_{ij}$ the factor $C_tD_{t+1}=\prod_{s=1}^Tc_s=C_T$ is independent of $t$ and cancels between numerator and denominator, giving the exact unscaled formula in terms of scaled variables (eq. 98). Since $\prod_tc_t\sum_i\alpha_T(i)=1$:
> $$P(O\mid\lambda)=\frac1{\prod_{t=1}^Tc_t},\qquad\log P(O\mid\lambda)=-\sum_{t=1}^T\log c_t.$$
> Scaling can be applied only when needed (set $c_t=1$ at other times). Viterbi needs no scaling if done in logs ($\phi_t$ recursion, eqs 104-105).
^thm-scaling

> [!theorem] Multiple observation sequences (eqs 106-111)
> For left-right models a single sequence cannot train all parameters. With $K$ independent sequences $\mathbf O^{(k)}$, maximise $P(\mathbf O\mid\lambda)=\prod_kP(\mathbf O^{(k)}\mid\lambda)=\prod_kP_k$. Add the per-sequence expected counts:
> $$\bar a_{ij}=\frac{\sum_k\frac1{P_k}\sum_{t=1}^{T_k-1}\alpha_t^k(i)a_{ij}b_j(O^{(k)}_{t+1})\beta^k_{t+1}(j)}{\sum_k\frac1{P_k}\sum_{t=1}^{T_k-1}\alpha^k_t(i)\beta^k_t(i)},\quad\bar b_j(\ell)=\frac{\sum_k\frac1{P_k}\sum_{t:O_t=v_\ell}\alpha^k_t(j)\beta^k_t(j)}{\sum_k\frac1{P_k}\sum_t\alpha^k_t(j)\beta^k_t(j)}.$$
> $\pi_i$ is not reestimated for left-right ($\pi_1=1$). With scaling, the same scale factors cancel in $1/P_k$ (eq. 111). This is the batched analogue of E24's "padded multi-track HMM" (elk tracks as independent sequences with shared parameters).
^thm-multiple-sequences

> [!definition] Initial estimates (Sec. V.C)
> No simple answer for reaching the global maximum. Random (subject to constraints) or uniform initialisation of $\pi$ and $A$ suffices in almost all cases. For $B$, good initial estimates are helpful in the discrete-symbol case and essential in the continuous (mixture) case, obtained by manual segmentation, maximum-likelihood segmentation with averaging, or segmental $k$-means with clustering.
^def-initial-estimates

> [!definition] Insufficient training data (Sec. V.D; eqs 112-113; Fig. 10)
> (1) Enlarge the training set (often impractical); (2) reduce model size (often impossible); (3) **interpolate** with a smaller model $\lambda'$ for which data suffice: $\bar{\bar\lambda}=\epsilon\lambda+(1-\epsilon)\lambda'$ (eq. 112), with $\epsilon$ estimated by deleted interpolation (Jelinek and Mercer 1980) by treating the interpolation as an expanded HMM with a neutral state $\tilde s$ (Fig. 10) and running forward-backward on held-out partitions; (4) **floors:** require $b_j(k)\ge\delta$ (eq. 113a) or $U_{jk}(r,r)\ge\delta$ (113b), with a post-processing step that corrects violations and rescales.
^def-insufficient-data

**Choice of model (Sec. V.E).** No theoretically correct rule: model type (ergodic or left-right), number of states, observation type (discrete or continuous, number of mixtures) are chosen by the physics of the signal and by experiment. A modern Bayesian answer is cross-validation or integrated LOO over the hidden path (E24).

> [!example] Why scaling matters (numpy)
> ```python
> import numpy as np
> rng = np.random.default_rng(0)
> N, T = 3, 2000
> A = np.full((N,N), 1/N); b = rng.random((T,N))*0.2             # tiny emission likelihoods
> alpha = np.ones(N)/N*b[0]; logp = 0.0
> for t in range(1, T):
>     alpha = (alpha @ A)*b[t]
>     c = alpha.sum(); alpha /= c; logp += np.log(c)             # scale c_t^{-1}; logp = -sum log c_t (eq. 103)
> print(logp)   # finite; unscaled alpha would be ~ 0.1^2000 -> underflow to 0.0 in float64
> ```
^ex-scaling

## Connections

Log-space forward algorithms (`logsumexp`) in PyMC/JAX are the modern replacement for explicit scaling: [[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]]. Gradient-based Bayesian fitting avoids Baum-Welch initialisation issues but inherits multimodality as label switching.

## See Also
[[Rabiner 1989 - HMM Tutorial - Overview]], [[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]]
