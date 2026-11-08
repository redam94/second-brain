---
title: "De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/example
  - doc/paper
source: "[[raw/De Blasi et al 2015 - Are Gibbs-Type Priors the Most Natural Generalization of the Dirichlet Process.pdf]]"
source_location: "Sec. 3 (Eqs. 26-27, Figs 1-4, Table 1), pp. 15-21"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/De Blasi 2015 - Gibbs-Type Priors"
doc_type: paper
depends_on:
  - "[[De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors]]"
  - "[[Teh 2010 - DP Mixture Models and Applications]]"
used_by:
  - "[[Concept - DP Mixtures for Image Segmentation]]"
aliases:
  - "prior on number of clusters"
  - "Gibbs-type mixtures"
  - "PY mixture number of components"
---

# De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters

> [!summary]
> In a hierarchical mixture the EPPF is the prior on partitions, hence on $K_n$. The DP gives a sharply peaked prior on $K_n$; PY and NGG with $\sigma\approx0.73$ give flat priors with the same mean, and when the prior mean (25) is far from the truth (2 components) they shift the posterior far more (Table 1).

## Main Content
**Random density** $\tilde f(y)=\int f(y\mid x)\tilde p(dx)$ (Eq. 26). Posterior on the number of components: $P(K_n=k\mid Y_{1:n})\propto\sum_{p_n\in\mathcal P_{[n]}^k}p_k^{(n)}(n_1,\dots,n_k)\prod_{j=1}^k\int\prod_{i\in C_j}f(y_i\mid x_j)P^*(dx_j)$ - the sum over all partitions of $[n]$ into $k$ clusters.

> [!theorem] Prior distribution of $K_n$ (Eq. 27)
> $$P(K_n=k)=\frac{V_{n,k}}{\sigma^k}\,\mathscr C(n,k;\sigma),\qquad\mathscr C(n,k;\sigma)=\frac1{k!}\sum_{i=0}^k(-1)^i\binom ki(-i\sigma)_n,$$
> a generalised factorial coefficient. For the DP ($\sigma\to0$): $P(K_n=k)=\dfrac{\theta^k}{(\theta)_n}|s(n,k)|$ with $s$ the Stirling number of the first kind.

^thm-prior-kn

Role of parameters: for the DP, $\theta$ shifts the location of $K_n$. For PY and NGG, $\theta$ (resp. $\beta$) controls location and $\sigma$ controls the flatness: larger $\sigma$ flattens the prior (Fig. 1, NGG with $n=50$, $\beta=1$, $\sigma=0.2..0.8$).

**Prior elicitation comparison (Fig. 2).** $n=50$, all five priors tuned so that $E(K_{50})=25$:

| Prior | Parameters |
|---|---|
| DP | $\theta=19.233$ |
| PY | $(\sigma,\theta)=(0.25,12.2157)$ |
| PY | $(0.73001,1)$ |
| NGG | $(\sigma,\beta)=(0.25,48.4185)$ |
| NGG | $(0.7353,1)$ |

The DP prior on $K_{50}$ is sharply peaked; larger $\sigma$ gives larger variability.

**Toy example (Fig. 3, Table 1).** $n=50$ draws from an equal mixture of $\text{N}(1,0.2)$ and $\text{N}(10,0.2)$ (two clear groups). Model: $Y_i\mid m_i,v_i\sim\text{N}(m_i,v_i)$, $(m_i,v_i)\mid\tilde p\sim\tilde p$, $P^*(dm,dv)=\text{N}(m\mid\mu,\tau v^{-1})\text{Ga}(v\mid2,1)$, hyperpriors $\mu\sim\text{N}(0,0.001)$, $\tau^{-1}\sim\text{Ga}(1,100)$. Marginal MCMC with acceleration step, 100,000 iterations after 5,000 burn-in. Posterior of $K_{50}$ (selected rows; all figures from Table 1):

| $k$ | DP(19.233) | NGG(0.25,48.4185) | PY(0.25,12.216) | NGG(0.7353,1) | PY(0.73001,1) |
|---|---|---|---|---|---|
| 2 | 0.0011 | 0.0039 | 0.0132 | 0.2143 | 0.4630 |
| 3 | 0.0068 | 0.0209 | 0.0487 | 0.2854 | 0.3015 |
| 4 | 0.0220 | 0.0514 | 0.0979 | 0.2263 | 0.1399 |
| 5 | 0.0484 | 0.0894 | 0.1419 | 0.1360 | 0.0573 |
| 6 | 0.0789 | 0.1229 | 0.1528 | 0.0713 | 0.0225 |
| 7 | 0.1069 | 0.1412 | 0.1506 | 0.0361 | 0.0092 |
| 8 | 0.1257 | 0.1368 | 0.1245 | 0.0163 | 0.0037 |
| 9 | 0.1301 | 0.1187 | 0.0921 | 0.0079 | 0.0016 |
| 10 | 0.1205 | 0.0976 | 0.0659 | 0.0035 | 0.0007 |
| 11 | 0.1031 | 0.0746 | 0.0435 | 0.0017 | 0.0003 |
| 12 | 0.0816 | 0.0516 | 0.0283 | 0.0007 | 0.0002 |
| 13 | 0.0597 | 0.0353 | 0.0170 | 0.0003 | 0.0001 |
| $\ge14$ | 0.1151 | 0.0556 | 0.0237 | 0.0004 | 0.0001 |

($k=1$ has probability 0.0000 in every column.) Interpretation: with a wrong prior guess of 25 clusters, the DP stays stuck around 10 components; PY(0.73) puts 0.463 mass on the true $K=2$ and 0.30 on 3. A stronger reinforcement (larger $\sigma$) allows data to overrule a bad prior on $K_n$. Density estimates (Fig. 4) differ much less than the number of clusters; PY and NGG with $\sigma=0.73$ adhere slightly more closely to the true density. These are structural properties of the models (see also Lijoi, Mena, Prunster 2007).

## Examples
> [!example] Reproduce the prior on $K_{50}$ (flatter with larger $\sigma$)
> A dynamic programme over the PY urn gives the exact prior; all three parameter settings have mean 25.000, with standard deviations 3.26 (DP), 3.79 (PY 0.25) and 8.05 (PY 0.73), and the PY(0.73) mode at 27.

^ex-prior-k-reproduce

```python
import numpy as np
def prior_K(n, sigma, theta):
    p = np.zeros(n + 1); p[1] = 1.0
    for m in range(1, n):
        new = np.zeros(n + 1)
        for k in range(1, m + 1):
            q = (theta + sigma * k) / (theta + m)       # P(new cluster | m items, k clusters)
            new[k + 1] += p[k] * q; new[k] += p[k] * (1 - q)
        p = new
    return p
k = np.arange(51)
for s, t in [(0, 19.233), (0.25, 12.2157), (0.73001, 1)]:
    p = prior_K(50, s, t); mu = (p * k).sum()
    print(s, t, round(mu, 3), round(float((p * (k - mu) ** 2).sum() ** 0.5), 2), int(p.argmax()))
```

## Relevance to marketing measurement
When you cluster customers or geos with a DP mixture, the prior on the number of segments is not neutral: set it by simulation (this note), and consider PY/NGG for a flatter prior on $K$. Report sensitivity of $K$ and of cluster-based conclusions.

## Connections
[[Teh 2010 - DP Mixture Models and Applications]], [[Monsters and Mixtures]], [[Concept - Label Switching and Label-Invariant Summaries]].

## See Also
[[De Blasi 2015 - Gibbs-Type Priors - Overview]]
