---
title: "Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/theorem
  - doc/paper
source: "[[raw/Rabiner 1989 - A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition.pdf]]"
source_location: "Sec. III.B, pp. 263-264; eqs 26-35"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Rabiner 1989 - Hidden Markov Models Tutorial"
doc_type: paper
depends_on:
  - "[[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]]"
used_by:
  - "[[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]]"
aliases:
  - "Viterbi algorithm"
  - "State posterior gamma"
  - "Posterior decoding"
---

# Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm

> [!summary]
> Two decoders answer Problem 2. Posterior (marginal) decoding picks $q_t=\arg\max_i\gamma_t(i)$ with $\gamma_t(i)=\alpha_t(i)\beta_t(i)/P(O\mid\lambda)$, maximising the expected number of correct states but possibly producing impossible sequences. Viterbi dynamic programming finds the single best path maximising $P(Q,O\mid\lambda)$ with $\delta_{t+1}(j)=[\max_i\delta_t(i)a_{ij}]b_j(O_{t+1})$ plus backpointers.

## Overview

"There are several possible ways of solving Problem 2": the difficulty is the optimality criterion. Different criteria give different state sequences.

## Main Content

> [!definition] State posterior $\gamma$ (eqs 26-28)
> $\gamma_t(i)=P(q_t=S_i\mid O,\lambda)=\dfrac{\alpha_t(i)\beta_t(i)}{P(O\mid\lambda)}=\dfrac{\alpha_t(i)\beta_t(i)}{\sum_{i=1}^N\alpha_t(i)\beta_t(i)}$ with $\sum_i\gamma_t(i)=1$. $\alpha_t$ accounts for $O_1..O_t$ and state $S_i$ at $t$; $\beta_t$ for $O_{t+1}..O_T$ given state $S_i$.
^def-gamma

> [!theorem] Individually most likely states (eq. 29)
> $q_t=\arg\max_{1\le i\le N}\gamma_t(i)$ maximises the expected number of correctly decoded individual states. *Caveat (paper):* it ignores the probability of sequences of states; if some $a_{ij}=0$ the resulting sequence may not even be a valid path. Alternatives: maximise expected correct pairs $(q_t,q_{t+1})$ or triples.
^thm-posterior-decoding

> [!theorem] Viterbi algorithm (eqs 30-35)
> Define $\delta_t(i)=\max_{q_1..q_{t-1}}P[q_1..q_{t-1},q_t=i,O_1..O_t\mid\lambda]$ (eq. 30), the best score along a single path ending in state $i$. Induction: $\delta_{t+1}(j)=[\max_i\delta_t(i)a_{ij}]\,b_j(O_{t+1})$ (eq. 31).
> 1. Initialisation: $\delta_1(i)=\pi_ib_i(O_1)$, $\psi_1(i)=0$.
> 2. Recursion ($2\le t\le T$, $1\le j\le N$): $\delta_t(j)=\max_i[\delta_{t-1}(i)a_{ij}]b_j(O_t)$, $\psi_t(j)=\arg\max_i[\delta_{t-1}(i)a_{ij}]$.
> 3. Termination: $P^*=\max_i\delta_T(i)$, $q_T^*=\arg\max_i\delta_T(i)$.
> 4. Backtracking: $q_t^*=\psi_{t+1}(q_{t+1}^*)$, $t=T-1,\dots,1$.
> It equals the forward calculation with $\max$ replacing $\sum$ plus backtracking; same lattice. In logs (eqs 104-105): $\phi_t(j)=\max_i[\phi_{t-1}(i)+\log a_{ij}]+\log b_j(O_t)$, no scaling needed, and $\log a_{ij}$, $\log b_j(O_t)$ can be precomputed.
^thm-viterbi

> [!example] Why the two decoders differ (illustration)
> Posterior decoding can return a sequence containing a zero-probability transition (the paper's caveat), whereas Viterbi never does, because Viterbi maximises the joint path probability. Constructing such a case needs at least three states: with two states and $a_{12}=0$, state 1 can only be followed by state 1, so $\gamma_{t+1}(1)\ge\gamma_t(1)$ and the decoded pair $(S_1,S_2)$ cannot occur. In the simulated 2-state Poisson HMM (200 steps, rates 1 and 6, $A=\begin{pmatrix}.9&.1\\.2&.8\end{pmatrix}$) Viterbi was 99.5% accurate and posterior decoding 99.0%: close here because states are well separated.
^ex-decoders

```python
import numpy as np
def viterbi(logB, logA, logpi):
    T, N = logB.shape; d = np.zeros((T, N)); psi = np.zeros((T, N), int); d[0] = logpi + logB[0]
    for t in range(1, T):
        s = d[t-1][:, None] + logA; psi[t] = s.argmax(0); d[t] = s.max(0) + logB[t]   # eqs 33a-b in logs
    q = np.zeros(T, int); q[-1] = d[-1].argmax()
    for t in range(T-2, -1, -1): q[t] = psi[t+1][q[t+1]]                              # eq. 35
    return q, d[-1].max()
# posterior decoding: gamma = exp(la + lb - logsumexp(la[-1])); q = gamma.argmax(1)
```

## Examples (PyMC-style)

E24 runs forward-backward and Viterbi **per posterior draw** to get regime probabilities and a decoded path with uncertainty (the Viterbi path varies across draws of $(A,B)$; posterior state probabilities average over them). Untested sketch: for each draw $s$ in `idata.posterior`, compute `la, lb` from the sampled $A^{(s)},\lambda^{(s)}$ as above, then average $\gamma^{(s)}$ across draws.

## Connections

Used in Problem 3 as the segmentation step in segmental $k$-means ([[Rabiner 1989 - Implementation Issues - Scaling, Multiple Sequences and Initialisation]]). Movement-state decoding: [[Model Building with Latent Variables - Animal Movement]].

## See Also
[[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]], [[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]]
