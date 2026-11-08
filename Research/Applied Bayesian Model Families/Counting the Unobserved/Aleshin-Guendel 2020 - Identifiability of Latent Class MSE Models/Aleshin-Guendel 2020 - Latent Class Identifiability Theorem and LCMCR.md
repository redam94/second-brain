---
title: "Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR"
tags:
  - source/ingested
  - topic/population-estimation
  - type/theorem
  - doc/paper
source: "[[raw/Aleshin-Guendel 2020 - On the Identifiability of Latent Class Models for Multiple-Systems Estimation.pdf]]"
source_location: "Sec. 4.1-4.2, Theorem 2, Table 1, Appendices 1-2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models"
doc_type: paper
depends_on:
  - "[[Aleshin-Guendel 2020 - Mixed-Moments Theorem]]"
used_by:
  - "[[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]]"
aliases:
  - 2J <= K identifiability
  - LCMCR nonidentifiable
---

# Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR

> [!summary]
> Theorem 2: with distinct class profiles, $\mathcal Q_J$ is identifiable if and only if $2J\le K$. For $K=2$ sources a two-class model is not identifiable, and the paper gives two models with the same observed-cell probabilities but missing-cell probabilities 0.316 vs 0.219. Manrique-Vallier's suggested $J^*=K$ and the LCMCR default $J^*=5$ are non-identifiable unless $K\ge10$.

## Overview

Restrict to $\mathcal Q_J$ with distinct class sampling probabilities ($\lambda_{Q,j\cdot}\ne\lambda_{Q,j'\cdot}$ for $j\ne j'$). Loosening this restriction can only make the conditions on $J$ stricter, so the conclusions stand for families that violate it.

## Main Content

> [!theorem] Theorem 2
> $\mathcal Q_J$ is identifiable if and only if $2J\le K$.
^thm-aleshin-theorem2

*Proof sketch, if direction ($2J\le K$).* Take $Q,R\in\mathcal Q_J$ with $\mathbf m_Q=A\mathbf m_R$ (Theorem 1). Then for all $h\in H^*$
$$\sum_{j}\nu_{Q,j}\prod_k\lambda_{Q,jk}^{h_k}-A\sum_j\nu_{R,j}\prod_k\lambda_{R,jk}^{h_k}=0.$$
Let $I_Q$ be classes of $Q$ whose profile does not appear among $R$'s, $I_R$ the converse, $m=|I_Q|=|I_R|$. After cancelling shared profiles the system becomes $\Lambda\mathbf y=0$ where the columns of $\Lambda$ are the monomial vectors $\big(\prod_k x_k^{h_k}\big)_{h\in H^*}$ for the $J+m\le 2J\le K$ distinct profiles. Appendix 1 shows $\Lambda$ has full column rank (induction on $K$, using a generalised Vandermonde-type matrix with distinct entries in each coordinate), so $\mathbf y=0$. Three cases follow: $m=0$ (profiles match, $\nu_{Q,j}=A\nu_{R,j'}$, summing weights gives $A=1$); $0<m<J$ (unmatched classes have zero weight, again $A=1$); $m=J$ (all weights zero, contradiction). So $A=1$ and $\pi_{Q,0}=\pi_{R,0}$.

*Only-if direction ($2J>K$).* Construct explicit $Q,R\in\mathcal Q_J$ with $\mathbf m_Q=A\mathbf m_R$, $A\ne1$ (modified from Tahmasebi et al. 2018). Take weights and profiles
$$\nu_{Q,j}=\frac{\binom{2J}{2j}}{2^{2J-1}-1},\quad \nu_{R,j}=\frac{\binom{2J}{2j-1}}{2^{2J-1}},\quad \lambda_{Q,jk}=\alpha\,(2j),\quad\lambda_{R,jk}=\alpha\,(2j-1),$$
for $0<\alpha<1/(2J)$ and all $k$. Appendix 2 proves $m_{Q,h}=A\,m_{R,h}$ for all $h\in H^*$ with $A=2^{2J-1}/(2^{2J-1}-1)\ne1$, using the function $h(x)=(1-e^{\alpha x})^{2J}=\sum_{i=0}^{2J}\binom{2J}{i}(-1)^ie^{\alpha ix}$: differentiating the series $t$ times at 0 and the closed form (zero for $t<2J$, and $K<2J$) equates alternating sums of $(\alpha i)^t$ over even and odd $i$, which are the moment vectors of $Q$ and $R$.

**Parameter counting versus identification.** $J(K+1)-1\le2^K-2$ is necessary but far weaker: e.g. $K=10$ allows $J\le 93$ by counting but only $J\le5$ by Theorem 2.

> [!example] Table 1 reproduced and verified ($K=2$, $J=2$)
> | Model | $\nu_1$ | $\nu_2$ | $\lambda_{11}$ | $\lambda_{12}$ | $\lambda_{21}$ | $\lambda_{22}$ |
> |---|---|---|---|---|---|---|
> | $Q$ | 0.5 | 0.5 | 0.2475 | 0.2475 | 0.7425 | 0.7425 |
> | $R$ | 0.8571429 | 0.1428571 | 0.495 | 0.495 | 0.99 | 0.99 |
>
> Under both, $\tilde\pi_{(0,1)}=0.276$, $\tilde\pi_{(1,0)}=0.276$, $\tilde\pi_{(1,1)}=0.448$, yet $\pi_{Q,0}=0.316$ and $\pi_{R,0}=0.219$ (recomputed by the snippet below). With observed $n$ individuals, $\hat N=n/(1-\pi_0)$ gives $1.46n$ under $Q$ versus $1.28n$ under $R$: identical data, 14% apart in total population. Posterior uncertainty about $N$ is "not washed out as more data are collected" (Linero 2017).
^ex-aleshin-table1

```python
import itertools, numpy as np
def cell_probs(nu, lam):
    K = len(lam[0]); out = {}
    for h in itertools.product([0, 1], repeat=K):
        out[h] = sum(n*np.prod([l[k] if h[k] else 1-l[k] for k in range(K)]) for n, l in zip(nu, lam))
    return out
Q = cell_probs([.5, .5], [[.2475]*2, [.7425]*2]); R = cell_probs([.8571429, .1428571], [[.495]*2, [.99]*2])
for P in (Q, R):
    p0 = P[(0, 0)]; print(round(p0, 3), [round(P[h]/(1-p0), 3) for h in [(0,1), (1,0), (1,1)]])
# 0.316 [0.276, 0.276, 0.448]   and   0.219 [0.276, 0.276, 0.448]
```

### Implications for LCMCR (Sec. 4.2)
- Manrique-Vallier (2016) uses $\mathcal Q_\infty=\cup_J\mathcal Q_J$ in theory and $\mathcal Q_{J^*}$ in practice, suggesting $J^*=K$, which is always non-identifiable (since $2K>K$). The R package LCMCR default is $J^*=5$: identifiable only if $K\ge10$ sources.
- Extensions (Manrique-Vallier et al. 2019; Kang, Gile and Price 2020) share the problem.
- Published applications: El Salvador (Sadinle 2018), Sri Lanka, Palembang, Peru (Manrique-Vallier, Ball and Sulmont 2019), Colombia, Philippines (Ball et al. 2019, $J^*=5$ in strata with fewer than 10 sources), Kampala (Doshi et al. 2019, $K=3$, $J^*=10$), South Sudan. The paper could find the number of classes used in only two, and both were non-identifiable; with fewer than 10 sources and the default setting none of the other families were identified.
- Fienberg's warning that MSE "relies on the untestable assumption that the model that describes the observed counts also applies to the unobserved ones" is worse here: with a non-identifiable family multiple models describe the observed counts.
- "Moving forward... it is imperative that families of models used for multiple-systems estimation in such sensitive contexts are known to be identified."

> [!remark] Practical reading
> Non-identifiability in a Bayesian fit shows up as prior-dominated posteriors for $N$: more data do not narrow the interval in the non-identified direction. This is why LCMCR results can be driven by the Dirichlet-process concentration prior and truncation $J^*$ ([[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]]). Check by simulating from a multi-class truth and fitting with $J^*$ above and below $K/2$.

## Connections

- Parameter-versus-degrees-of-freedom counting for latent class diagnostic models (E69): [[Concept - Unseen Species and Latent Class Links]].
- Related identifiability contrast in N-mixtures: [[Barker 2018 - Reliability of N-Mixture Models - Overview]].

## See Also

- [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]]
- [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]]
