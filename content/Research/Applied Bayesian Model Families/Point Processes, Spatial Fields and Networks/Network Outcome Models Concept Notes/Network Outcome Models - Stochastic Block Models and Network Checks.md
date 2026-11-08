---
title: "Network Outcome Models - Stochastic Block Models and Network Checks"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (literature cited in body)"
source_location: "Concept note; literature: Holland, Laskey & Leinhardt 1983; Wang & Wong 1987; Nowicki & Snijders 2001; Airoldi et al. 2008; Karrer & Newman 2011"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Network Outcome Models Concept Notes"
doc_type: paper
depends_on:
  - "[[Hoff 2002 - Distance and Projection Models]]"
used_by:
  - "[[Hoff 2002 - Latent Space Models Overview]]"
aliases:
  - "stochastic block model"
  - "mixed-membership SBM"
  - "degree-corrected SBM"
  - "network posterior predictive checks"
---

# Network Outcome Models - Stochastic Block Models and Network Checks

> [!summary]
> Concept note (no raw source). Stochastic block models (SBMs) give each node a latent role and let tie probability depend only on the pair of roles; mixed-membership and degree-corrected variants relax hard roles and degree homogeneity. Marginalising roles avoids discrete sampling in PyMC; network posterior predictive checks (degree, transitivity, shared partners, geodesics) show what each model misses. Complements the latent-space model of [[Hoff 2002 - Latent Space Models Overview]].

## Overview
Used in PyMC example **E21** (Lazega lawyers; mixed-membership SBM with marginalised roles, degree-corrected or not, co-clustering matrix, network PPCs). Example list: <https://redam94.github.io/pymc-challenges/examples.html>.

## Main Content

> [!definition] Stochastic block model (Holland, Laskey & Leinhardt 1983; Nowicki & Snijders 2001)
> Nodes $i=1..n$ have latent classes $c_i\sim\text{Categorical}(\pi)$ over $K$ groups; for a directed binary network $y_{ij}\mid c_i,c_j\sim\text{Bernoulli}(B_{c_ic_j})$ independently, $B\in[0,1]^{K\times K}$ the block matrix.

^def-sbm

> [!definition] Mixed-membership SBM (Airoldi et al. 2008)
> Each node has membership vector $\pi_i\sim\text{Dirichlet}(\alpha)$; for each ordered pair draw sender role $s_{ij}\sim\pi_i$ and receiver role $r_{ij}\sim\pi_j$; $y_{ij}\sim\text{Bernoulli}(B_{s_{ij}r_{ij}})$. Marginalising roles gives $P(y_{ij}=1)=\pi_i^\top B\pi_j$.

^def-mmsbm

> [!definition] Degree-corrected SBM (Karrer & Newman 2011)
> Poisson-edge version: $A_{ij}\sim\text{Poisson}(\theta_i\theta_j\omega_{c_ic_j})$ with node propensity $\theta_i$, absorbing heterogeneous degrees that a plain SBM would assign to extra blocks.

^def-dcsbm

Marginalising roles: for the classical SBM, $P(y_{ij}=1)$ conditioned on $c$ is block-constant; a node's likelihood contribution is $\sum_k\pi_k\prod_jB_{k c_j}^{y_{ij}}(1-B_{kc_j})^{1-y_{ij}}$ only when other labels are known, so exact marginalisation is not available; the mixed-membership form is tractable because pairs are independent given $(\pi_i,\pi_j)$: $\pi_i^\top B\pi_j$. Identification: label switching (use ordered/identifiable constraints on $B$'s diagonal), and the co-clustering matrix $C_{ij}=\pi_i^\top\pi_j$ (a posterior summary invariant to relabeling).

Network posterior predictive checks: simulate $y^{\text{rep}}$ from the posterior and compare statistics: degree distribution, global transitivity, edgewise shared partners, geodesic distance distribution. A latent-space model captures transitivity; a plain SBM typically misses degree heterogeneity (a motivation for degree correction); a dyad logistic with sociality random effects $\log\text{odds}(y_{ij})=\alpha+s_i+r_j$ captures degree but not triads.

## Examples

> [!example] Mixed-membership tie probability, tiny check
> $K=2$, $B=\begin{pmatrix}0.8&0.05\\0.05&0.6\end{pmatrix}$; nodes $\pi_1=(0.9,0.1)$, $\pi_2=(0.1,0.9)$ give $P(y_{12}=1)=\pi_1^\top B\pi_2=0.9\cdot0.1\cdot0.8+0.9\cdot0.9\cdot0.05+0.1\cdot0.1\cdot0.05+0.1\cdot0.9\cdot0.6=0.072+0.0405+0.0005+0.054=0.167$.

```python
import numpy as np
B = np.array([[.8, .05], [.05, .6]]); p1 = np.array([.9, .1]); p2 = np.array([.1, .9]); print(p1 @ B @ p2)   # 0.167
```

PyMC sketch (untested):
```python
import pymc as pm
with pm.Model():
    pi = pm.Dirichlet("pi", a=np.ones(K)*0.5, shape=(n, K))
    B = pm.Beta("B", 1, 1, shape=(K, K))
    P = pm.math.dot(pi, pm.math.dot(B, pi.T))
    pm.Bernoulli("y", p=P[iu], observed=y[iu])
```

## Connections
[[Social Network Models]] (basic network models); [[Hoff 2002 - Monks Florentine Families and Classroom Examples]] (SBM vs latent space log-likelihoods); marketing: roles = customer segments in referral graphs.

## See Also
[[Research/Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Hoff 2002 - Latent Space Approaches to Social Network Analysis/_Index|Hoff 2002 - Latent Space Approaches to Social Network Analysis]]
