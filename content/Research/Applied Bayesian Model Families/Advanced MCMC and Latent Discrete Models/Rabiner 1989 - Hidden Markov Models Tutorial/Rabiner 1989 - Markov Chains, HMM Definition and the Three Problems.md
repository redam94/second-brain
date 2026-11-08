---
title: "Rabiner 1989 - Markov Chains, HMM Definition and the Three Problems"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/definition
  - doc/paper
source: "[[raw/Rabiner 1989 - A Tutorial on Hidden Markov Models and Selected Applications in Speech Recognition.pdf]]"
source_location: "Sec. I-II, pp. 257-261; eqs 1-11; Figs 1-3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Rabiner 1989 - Hidden Markov Models Tutorial"
doc_type: paper
depends_on:
  - "[[The Kalman Filter]]"
used_by:
  - "[[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]]"
  - "[[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]]"
  - "[[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]]"
aliases:
  - "Markov chain"
  - "HMM definition"
  - "Three problems of HMMs"
---

# Rabiner 1989 - Markov Chains, HMM Definition and the Three Problems

> [!summary]
> A first-order Markov chain has transition matrix $A=\{a_{ij}\}$; an HMM adds a hidden state with emission distribution $B$, so the observation is a probabilistic function of the state. $\lambda=(A,B,\pi)$ fully specifies the model. Three problems follow: evaluate $P(O\mid\lambda)$, find the best state sequence, and fit $\lambda$. The geometric state-duration implied by $a_{ii}$ is $\bar d_i=1/(1-a_{ii})$.

## Overview

The paper restricts to the HMM among signal models (rather than Gaussian processes, Poisson processes or plain Markov processes), with a statistical rather than deterministic signal model. Original theory: Baum and colleagues, late 1960s-early 1970s; applications by Baker (CMU) and Jelinek et al. (IBM); three-problem framing credited to Jack Ferguson (IDA).

## Main Content

> [!definition] Discrete first-order Markov chain (eqs 1-3)
> States $S_1..S_N$; state at time $t$ is $q_t$. First-order: $P[q_t=S_j\mid q_{t-1}=S_i,q_{t-2}=S_k,\dots]=P[q_t=S_j\mid q_{t-1}=S_i]$. Time-homogeneous transition probabilities $a_{ij}=P[q_t=S_j\mid q_{t-1}=S_i]$ with $a_{ij}\ge0$ and $\sum_ja_{ij}=1$. Initial distribution $\pi_i=P[q_1=S_i]$ (eq. 4).
^def-markov-chain

> [!example] Weather Markov chain (eq. 4 example, Fig. 1 text)
> States: 1 rain/snow, 2 cloudy, 3 sunny; $A=\begin{pmatrix}0.4&0.3&0.3\\0.2&0.6&0.2\\0.1&0.1&0.8\end{pmatrix}$. Given sunny on day 1, the probability of the 8-day sequence $O=(S_3,S_3,S_3,S_1,S_1,S_3,S_2,S_3)$ is
> $$
> \pi_3a_{33}a_{33}a_{31}a_{11}a_{13}a_{32}a_{23}=1\cdot0.8\cdot0.8\cdot0.1\cdot0.4\cdot0.3\cdot0.1\cdot0.2=1.536\times10^{-4}.
> $$
> *Solution check:* $0.8\cdot0.8=0.64$; $\times0.1=0.064$; $\times0.4=0.0256$; $\times0.3=0.00768$; $\times0.1=0.000768$; $\times0.2=1.536\times10^{-4}$. Interpretation: an observable Markov model where each state is a physical observation.
^ex-weather-chain

> [!definition] State duration (eqs 5-6)
> $P(O\mid\text{Model},q_1=S_i)=(a_{ii})^{d-1}(1-a_{ii})=p_i(d)$, the probability of exactly $d$ consecutive days in state $i$: an exponential (geometric) duration density. Expected duration $\bar d_i=\sum_{d\ge1}dp_i(d)=\sum d(a_{ii})^{d-1}(1-a_{ii})=\dfrac1{1-a_{ii}}$. Weather example: sunny $1/0.2=5$ days; cloudy $2.5$; rain $1.67$.
^def-state-duration

> [!example] Coin-toss HMMs (Fig. 2)
> A hidden person tosses coins behind a curtain and reports only heads/tails. (a) 1-coin model: 1 parameter ($P(H)$), a degenerate observable Markov model. (b) 2-coin model: states are biased coins with $P(H)=P_1,P_2$ and transition matrix $\{a_{ij}\}$: 4 parameters. (c) 3-coin model: 9 parameters. More states fit better in principle but "practical considerations impose strong limitations" and the model should match the physical process. Urn-and-ball model (Fig. 3): $N$ urns with colour distributions $b_j(k)$; a genie picks urns by a Markov rule and reports ball colours.
^ex-coin-urn

> [!definition] Elements of an HMM (eqs 7-11)
> 1. $N$ hidden states $S=\{S_1..S_N\}$, state at $t$ is $q_t$. 2. $M$ distinct observation symbols $V=\{v_1..v_M\}$. 3. Transition matrix $A=\{a_{ij}\}$, $a_{ij}=P[q_{t+1}=S_j\mid q_t=S_i]$. 4. Emission distribution $B=\{b_j(k)\}$, $b_j(k)=P[v_k\text{ at }t\mid q_t=S_j]$. 5. Initial distribution $\pi_i=P[q_1=S_i]$. Compact notation $\lambda=(A,B,\pi)$. Generative recipe: draw $q_1\sim\pi$; for $t=1..T$ emit $O_t=v_k$ with probability $b_{q_t}(k)$, then move $q_{t+1}\sim a_{q_t,\cdot}$.
^def-hmm

> [!definition] The three basic problems (Sec. II.C)
> **Problem 1 (evaluation):** given $O=O_1..O_T$ and $\lambda$, compute $P(O\mid\lambda)$ (also: score how well a model matches data; model selection). **Problem 2 (decoding):** choose a state sequence $Q=q_1..q_T$ that is optimal in some meaningful sense (there is no unique "correct" sequence except in degenerate models, so the criterion depends on use). **Problem 3 (learning):** adjust $\lambda=(A,B,\pi)$ to maximise $P(O\mid\lambda)$ (training).
^def-three-problems

For isolated-word speech: one $N$-state HMM per vocabulary word, trained by Problem 3 on codebook-index sequences; Problem 2 segments training data into states to understand and refine models; recognition scores each word model by Problem 1 and picks the highest likelihood.

```python
# Sample from an HMM and check the weather example number
import numpy as np
A = np.array([[.4,.3,.3],[.2,.6,.2],[.1,.1,.8]])
seq = [2,2,2,0,0,2,1,2]                      # S3 S3 S3 S1 S1 S3 S2 S3 (0-indexed)
p = 1.0
for a,b in zip(seq[:-1], seq[1:]): p *= A[a,b]
print(p)   # 0.0001536 = 1.536e-4, given day 1 is sunny (pi_3 = 1)
```

## Connections

Next: [[Rabiner 1989 - Problem 1 - Forward and Backward Algorithms]], [[Rabiner 1989 - Problem 2 - State Posteriors and the Viterbi Algorithm]], [[Rabiner 1989 - Problem 3 - Baum-Welch Reestimation]]. Continuous-state counterpart: [[State-Space Models and the Kalman Filter - Overview]].

## See Also
[[Rabiner 1989 - HMM Tutorial - Overview]], [[Model Building with Latent Variables - Animal Movement]]
