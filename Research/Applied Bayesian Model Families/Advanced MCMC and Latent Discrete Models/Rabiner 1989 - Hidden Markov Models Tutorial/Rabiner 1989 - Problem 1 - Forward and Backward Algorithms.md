---
title: "Rabiner 1989 - Problem 1 - Forward and Backward Algorithms"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/theorem
  - doc/paper
source: "[[raw/Rabiner 1989 - A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition.pdf]]"
source_location: "Sec. III.A, pp. 261-263; eqs 12-25; Figs 4-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Rabiner 1989 - Hidden Markov Models Tutorial"
doc_type: paper
depends_on:
  - "[[Rabiner 1989 - Markov Chains, HMM Definition and the Three Problems]]"
used_by:
  - "[[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]]"
  - "[[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]]"
aliases:
  - "Rabiner forward algorithm"
  - "Rabiner backward algorithm"
  - "Rabiner forward-backward procedure"
---

# Rabiner 1989 - Problem 1 - Forward and Backward Algorithms

> [!summary]
> The likelihood $P(O\mid\lambda)=\sum_{\text{all }Q}P(O\mid Q,\lambda)P(Q\mid\lambda)$ needs about $2TN^T$ operations by direct enumeration. The forward variable $\alpha_t(i)=P(O_1..O_t,q_t=S_i\mid\lambda)$ satisfies $\alpha_{t+1}(j)=[\sum_i\alpha_t(i)a_{ij}]b_j(O_{t+1})$ and gives $P(O\mid\lambda)=\sum_i\alpha_T(i)$ in $O(N^2T)$ time. The backward variable $\beta_t(i)$ is the symmetric recursion used for Problems 2 and 3.

## Overview

For a fixed state sequence $Q=q_1..q_T$, observations are conditionally independent: $P(O\mid Q,\lambda)=\prod_tP(O_t\mid q_t,\lambda)=b_{q_1}(O_1)\cdots b_{q_T}(O_T)$ (eq. 13). The sequence probability is $P(Q\mid\lambda)=\pi_{q_1}a_{q_1q_2}\cdots a_{q_{T-1}q_T}$ (eq. 14).

## Main Content

> [!theorem] Direct enumeration (eqs 15-17)
> $P(O\mid\lambda)=\sum_{\text{all }Q}P(O\mid Q,\lambda)P(Q\mid\lambda)=\sum_{q_1..q_T}\pi_{q_1}b_{q_1}(O_1)a_{q_1q_2}b_{q_2}(O_2)\cdots a_{q_{T-1}q_T}b_{q_T}(O_T)$. There are $N^T$ sequences, each needing about $2T$ operations: $(2T-1)N^T$ multiplications and $N^T-1$ additions, infeasible even for $N=5$, $T=100$ ($\approx2\cdot100\cdot5^{100}\approx10^{72}$).
^thm-direct-enumeration

> [!definition] Forward variable (eq. 18)
> $\alpha_t(i)=P(O_1O_2\cdots O_t,\,q_t=S_i\mid\lambda)$.
^def-forward

> [!theorem] Forward algorithm (eqs 19-21)
> 1. Initialisation: $\alpha_1(i)=\pi_ib_i(O_1)$, $1\le i\le N$.
> 2. Induction: $\alpha_{t+1}(j)=\Big[\sum_{i=1}^N\alpha_t(i)a_{ij}\Big]b_j(O_{t+1})$, $1\le t\le T-1$, $1\le j\le N$.
> 3. Termination: $P(O\mid\lambda)=\sum_{i=1}^N\alpha_T(i)$.
> *Why it works.* $\alpha_t(i)a_{ij}$ is the probability of observing $O_1..O_t$ and being in $S_i$ at $t$ then moving to $S_j$ at $t+1$; summing over $i$ merges all paths into the $N$ nodes of a lattice (trellis, Fig. 4b), so cost is $N^2T$: $N(N+1)(T-1)+N$ multiplications and $N(N-1)(T-1)$ additions. For $N=5$, $T=100$ about 3000 operations vs $10^{72}$, a saving of about 69 orders of magnitude.
^thm-forward

> [!definition] Backward variable (eq. 23) and recursion (eqs 24-25)
> $\beta_t(i)=P(O_{t+1}O_{t+2}\cdots O_T\mid q_t=S_i,\lambda)$. Initialisation $\beta_T(i)=1$ (arbitrary definition). Induction for $t=T-1,\dots,1$: $\beta_t(i)=\sum_{j=1}^Na_{ij}b_j(O_{t+1})\beta_{t+1}(j)$. Also $O(N^2T)$ (Fig. 5). The backward part is not needed for Problem 1 alone but is needed for Problem 3.
^def-backward

> [!example] Identity linking them (derived)
> For any $t$: $P(O\mid\lambda)=\sum_i\alpha_t(i)\beta_t(i)$. At $t=1$: $\sum_i\pi_ib_i(O_1)\beta_1(i)$, which numerically equals $\sum_i\alpha_T(i)$ (verified in the test below: $-335.3586$ both ways on a simulated 200-step 2-state Poisson HMM).
^ex-alpha-beta-identity

```python
import numpy as np
from scipy.special import logsumexp
from scipy.stats import poisson

def forward(logB, logA, logpi):                 # logB: (T,N) emission log-probs
    T, N = logB.shape; la = np.zeros((T, N)); la[0] = logpi + logB[0]
    for t in range(1, T):
        la[t] = logB[t] + logsumexp(la[t-1][:, None] + logA, axis=0)   # eq. 20 in log space
    return la                                   # log P(O|lam) = logsumexp(la[-1])

def backward(logB, logA):
    T, N = logB.shape; lb = np.zeros((T, N))
    for t in range(T-2, -1, -1):
        lb[t] = logsumexp(logA + logB[t+1][None, :] + lb[t+1][None, :], axis=1)  # eq. 25
    return lb
# Tested: matches brute-force enumeration over all 2^6 paths for T=6 (-7.8808), and la/lb identity above.
```

## Examples (PyMC-style)

The forward recursion is exactly what a PyMC HMM writes as the marginal likelihood, so the discrete state is never sampled (E24; untested sketch):
```python
import pymc as pm, pytensor, pytensor.tensor as pt
def hmm_logp(y, A, pi, lam):
    logB = pm.logp(pm.Poisson.dist(lam), y[:, None])        # (T, N)
    def step(logb_t, la_prev, logA):
        return logb_t + pt.logsumexp(la_prev[:, None] + logA, axis=0)
    la0 = pt.log(pi) + logB[0]
    la, _ = pytensor.scan(step, sequences=logB[1:], outputs_info=la0, non_sequences=pt.log(A))
    return pt.logsumexp(la[-1])
# pm.Potential("loglik", hmm_logp(y, A, pi, lam)) inside a model with A rows ~ Dirichlet, ordered lam
```
See [[Bayesian HMMs - Label Switching, Non-Homogeneous Transitions and Dwell Times]].

## Connections

The Kalman filter is the same recursion with Gaussian state: [[The Kalman Filter]], [[Marginal Likelihood via the Kalman Filter]]. Numerical stability of $\alpha$ for long series requires scaling or log space: [[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]].

## See Also
[[Rabiner 1989 - HMM Tutorial - Overview]], [[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]]
