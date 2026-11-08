---
title: "Griffiths 2011 - The Indian Buffet Process and Its Properties"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/theorem
  - doc/paper
source: "[[raw/Griffiths Ghahramani 2011 - The Indian Buffet Process An Introduction and Review.pdf]]"
source_location: "Secs. 4.4-4.6 (Eqs. 15-16, Figs 5-6), pp. 1198-1202"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Griffiths 2011 - The Indian Buffet Process"
doc_type: paper
depends_on:
  - "[[Griffiths 2011 - Equivalence Classes and the Infinite Limit]]"
used_by:
  - "[[Griffiths 2011 - Gibbs Sampling and the Linear-Gaussian Model]]"
  - "[[Griffiths 2011 - Applications of the IBP]]"
aliases:
  - "Indian buffet process"
  - "IBP"
  - "exchangeable IBP"
---

# Griffiths 2011 - The Indian Buffet Process and Its Properties

> [!summary]
> The IBP is the sequential process: customer 1 takes $\text{Poisson}(\alpha)$ dishes; customer $i$ takes each previously sampled dish $k$ with probability $m_k/i$ and then $\text{Poisson}(\alpha/i)$ new dishes. The induced law on lof-classes is the infinite beta-Bernoulli limit; $K_+\sim\text{Poisson}(\alpha H_N)$, each row has $\text{Poisson}(\alpha)$ ones, and the matrix stays sparse.

## Main Content

> [!definition] Indian buffet process
> $N$ customers enter in order. Customer 1 samples $\text{Poisson}(\alpha)$ dishes. Customer $i$ moves along the dishes already sampled by $m_k>0$ earlier customers and takes dish $k$ with probability $m_k/i$; then tries $\text{Poisson}(\alpha/i)$ new dishes. $z_{ik}=1$ iff customer $i$ took dish $k$.

^def-ibp

> [!theorem] Probability of a generated matrix (Eq. 15)
> With $K_1^{(i)}$ the number of new dishes of customer $i$,
> $$P(Z)=\frac{\alpha^{K_+}}{\prod_{i=1}^NK_1^{(i)}!}\exp\{-\alpha H_N\}\prod_{k=1}^{K_+}\frac{(N-m_k)!(m_k-1)!}{N!}.$$
> Customers are not exchangeable under $P(Z)$ because the labelling $K_1^{(i)}$ depends on order. But $\prod_{i=1}^NK_1^{(i)}!\big/\prod_{h=1}^{2^N-1}K_h!$ generated matrices map to the same left-ordered form, and multiplying gives the exchangeable class probability $P([Z])$ of Eq. 14.

^thm-ibp-prob

**Exchangeable IBP.** A variant that is directly exchangeable: customer $i$ makes one decision per set of dishes with the same history $h$, taking $\text{Binomial}(m_h/i,K_h)$ of the $K_h$ dishes from the left, then $\text{Poisson}(\alpha/i)$ new dishes; the result is in left-ordered form with probability $P([Z])$.

**Poisson representation (4.5).** Collections of feature histories correspond to vectors $K=(K_1,\dots,K_{2^N-1})$. Setting $K_h\sim\text{Poisson}\big(\alpha\frac{(m_h-1)!(N-m_h)!}{N!}\big)$ independently reproduces Eq. 14, using $\sum_h\frac{(m_h-1)!(N-m_h)!}{N!}=\sum_{j=1}^N\binom Nj\frac{(j-1)!(N-j)!}{N!}=H_N$ (Eq. 16).

> [!theorem] Properties (4.6)
> (i) $K_+\sim\text{Poisson}(\alpha H_N)$ (sum of independent Poissons; equivalently sum of $\text{Poisson}(\alpha/i)$ new-dish counts). (ii) Each object possesses $\text{Poisson}(\alpha)$ features (by exchangeability, reduce to customer 1). (iii) $E[\mathbf 1^TZ\mathbf 1]=N\alpha$, so $Z$ remains sparse; this equals the $K\to\infty$ limit of Eq. 11.

^thm-ibp-properties

## Examples
> [!example] Expected number of features
> $\alpha=10,N=20$: $E[K_+]=10\cdot H_{20}=35.98$. A 500-draw simulation of the sequential process gave mean $K_+=36.2$. The paper's Figure 6 draw with $\alpha=10$: the first customer tried 17 dishes, the second took 7 of those and 3 new, the third took 3 shared, 5 from customer 1 only and 2 new.

^ex-ibp-expected-features

```python
import numpy as np
rng = np.random.default_rng(0)

def ibp(N, alpha):
    counts, rows = [], []
    for i in range(1, N + 1):
        row = [k for k, m in enumerate(counts) if rng.random() < m / i]
        new = rng.poisson(alpha / i)
        row += list(range(len(counts), len(counts) + new))
        counts += [0] * new
        for k in row: counts[k] += 1
        rows.append(row)
    Z = np.zeros((N, len(counts)), int)
    for i, r in enumerate(rows): Z[i, r] = 1
    return Z

Ks = [ibp(20, 10.0).shape[1] for _ in range(500)]
print(np.mean(Ks), 10 * sum(1 / j for j in range(1, 21)))   # ~36.2 vs 35.98
```

## Connections
Row-wise Poisson($\alpha$) is why $\alpha$ both sets sparsity and dimensionality; the two-parameter IBP separates them ([[Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process]]).

## See Also
[[Griffiths 2011 - The Indian Buffet Process - Overview]]
