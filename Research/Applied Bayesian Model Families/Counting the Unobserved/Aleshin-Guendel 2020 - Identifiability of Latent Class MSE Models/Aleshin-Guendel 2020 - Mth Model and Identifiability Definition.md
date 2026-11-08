---
title: "Aleshin-Guendel 2020 - Mth Model and Identifiability Definition"
tags:
  - source/ingested
  - topic/population-estimation
  - type/definition
  - doc/paper
source: "[[raw/Aleshin-Guendel 2020 - On the Identifiability of Latent Class Models for Multiple-Systems Estimation.pdf]]"
source_location: "Secs. 1, 2.1-2.3, Eq. 1-3, Definition 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models"
doc_type: paper
depends_on:
  - "[[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]]"
used_by:
  - "[[Aleshin-Guendel 2020 - Mixed-Moments Theorem]]"
aliases:
  - Mth model definition
  - multiple-systems identifiability definition
---

# Aleshin-Guendel 2020 - Mth Model and Identifiability Definition

> [!summary]
> $K$ sources sample a closed population of unknown size $N$; each individual has latent sampling probabilities $\lambda_i\sim Q$ and is included by source $k$ with probability $\lambda_{ik}$ independently given $\lambda_i$. The observed cell counts are multinomial and the likelihood factors into a binomial for $n$ and a conditional multinomial; identifiability means the conditional cell probabilities determine the missing-cell probability.

## Overview

Classical models (Otis et al. 1978): $M_h$ (heterogeneity; same latent probability for every source) and $M_{th}$ (heterogeneity and source effects). $M_h$ can be plausible in ecology where animals can be given equal catchability; in human-population settings sources are convenience samples so $M_{th}$ is needed. Manrique-Vallier (2016) proposed latent class $M_{th}$ models with many classes, now widely used in human-rights work (El Salvador, Sri Lanka, Palembang, Peru, Colombia, Philippines, Kampala, South Sudan). Identifiability of $M_h$ families has literature (Huggins 2001; Link 2003; Holzmann et al. 2006), but not $M_{th}$.

## Main Content

> [!definition] Setup and $M_{th}$ model (Sec. 2.1, Eq. 1)
> $K\ge2$ sources; $H=\{0,1\}^K$ inclusion patterns; $H^*=H\setminus\{0\}^K$ patterns of the $n<N$ individuals sampled at least once; $x_i\in H$ the pattern for individual $i$; $n_h=\sum_{i=1}^{N}I(x_i=h)$ cell counts of a $2^K$ table; $n_{(0,\dots,0)}=N-n$ is unobserved and $N$ is the target.
> $$x_{ik}\mid\lambda_{ik}\overset{ind}{\sim}\text{Bernoulli}(\lambda_{ik}),\qquad (\lambda_{i1},\dots,\lambda_{iK})\overset{iid}{\sim}Q,\;Q\in\mathcal Q,$$
> with $\mathcal Q$ a family of mixing distributions on $(0,1]^K$ (every individual has non-zero probability of being sampled by at least one source). $M_h$ is the sub-model with $\lambda_{i1}=\dots=\lambda_{iK}$.
^def-mth-model

> [!theorem] Likelihood and its decomposition (Eq. 2-3)
> Marginalising over $Q$, the full table is multinomial:
> $$(n_h)_{h\in H}\mid N,\pi_Q\sim\text{Multinomial}(N,\pi_Q),\quad \pi_{Q,h}=E_Q\Big\{\prod_{k=1}^{K}\lambda_k^{h_k}(1-\lambda_k)^{1-h_k}\Big\}.$$
> Equivalently,
> $$n\mid N,\pi_{Q,0}\sim\text{Binomial}(N,1-\pi_{Q,0}),\qquad (n_h)_{h\in H^*}\mid n,\tilde\pi_Q\sim\text{Multinomial}(n,\tilde\pi_Q),$$
> with $\pi_{Q,0}=\pi_{Q,(0,\dots,0)}$ and $\tilde\pi_{Q,h}=\pi_{Q,h}/(1-\pi_{Q,0})$. The second factor is the **conditional likelihood** (Fienberg 1972). To estimate $N$, the conditional probabilities $\tilde\pi_Q$ estimated from observed cells must determine the missing-cell probability $\pi_{Q,0}$.
^thm-mth-likelihood

> [!definition] Definition 1 (identifiability of a mixing family)
> A family $\mathcal Q$ of distributions on $(0,1]^K$ is **identifiable** if, for $Q,R\in\mathcal Q$, $\tilde\pi_Q=\tilde\pi_R$ implies $\pi_{Q,0}=\pi_{R,0}$. (Modified from Link 2003.) If so, $N$ can be consistently estimated within $\mathcal Q$ (Sanathanan 1972).
^def-mth-identifiable

> [!definition] Latent class family $\mathcal Q_J$ (Sec. 2.3)
> $$\mathcal Q_J=\Big\{Q=\sum_{j=1}^{J}\nu_{Q,j}\prod_{k=1}^{K}\delta_{\lambda_{Q,jk}}\;:\;\nu_{Q,j}\ge0,\;\sum_j\nu_{Q,j}=1,\;\lambda_{Q,jk}\in(0,1]^K\Big\}.$$
> Class $j$ has weight $\nu_{Q,j}$ and class-specific sampling probabilities $\lambda_{Q,j\cdot}$; this is a finite mixture of product Bernoullis (Goodman 1974; Haberman 1979). Whether $\mathcal Q_J$ is identified was unknown.
^def-latent-class-family

Parameter count: $J(K+1)-1$ in $\mathcal Q_J$. The conditional probabilities $\tilde\pi_Q$ have $2^K-2$ free dimensions, so identifiability requires at least $J(K+1)-1\le 2^K-2$. The paper shows the true condition is far stricter.

## Examples

> [!example] $K=2$ sources: cell probabilities
> $H=\{00,01,10,11\}$ and $H^*=\{01,10,11\}$, so $\tilde\pi$ has 2 free dimensions, but a 2-class model has $2(2+1)-1=5$ parameters. Counting alone already shows a single 2-class family cannot be identified; the paper's Table 1 gives explicit parameter values ([[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]]).

```python
import itertools, numpy as np
def cell_probs(nu, lam):
    K = len(lam[0]); out = {}
    for h in itertools.product([0, 1], repeat=K):
        out[h] = sum(n*np.prod([l[k] if h[k] else 1-l[k] for k in range(K)]) for n, l in zip(nu, lam))
    return out
def conditional(P):
    p0 = P[(0,)*len(next(iter(P)))]; return p0, {h: v/(1-p0) for h, v in P.items() if any(h)}
```

## Connections

- Link between the missing cell and the dark figure in the log-linear approach: [[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]].
- Binomial-times-multinomial factorisation is the Fienberg (1972) conditional likelihood used in [[Concept - Closed-Population Capture-Recapture and Otis Models]].

## See Also

- [[Aleshin-Guendel 2020 - Mixed-Moments Theorem]]
- [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]]
