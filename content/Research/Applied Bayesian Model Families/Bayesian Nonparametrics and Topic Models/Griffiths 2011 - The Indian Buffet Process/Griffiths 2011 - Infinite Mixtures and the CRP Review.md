---
title: "Griffiths 2011 - Infinite Mixtures and the CRP Review"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/paper
source: "[[raw/Griffiths Ghahramani 2011 - The Indian Buffet Process An Introduction and Review.pdf]]"
source_location: "Secs. 1-2 (Eqs. 1-5, Figs 1-2), pp. 1185-1193"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Griffiths 2011 - The Indian Buffet Process"
doc_type: paper
depends_on:
  - "[[Griffiths 2011 - The Indian Buffet Process - Overview]]"
  - "[[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]]"
used_by:
  - "[[Griffiths 2011 - Latent Feature Models and the Finite Beta-Bernoulli Prior]]"
aliases:
  - "infinite limit of Dirichlet-multinomial"
  - "CRP derivation by limit"
---

# Griffiths 2011 - Infinite Mixtures and the CRP Review

> [!summary]
> The CRP can be derived as the $K\to\infty$ limit of a symmetric Dirichlet-multinomial prior on class assignments, after collapsing assignments into partitions (equivalence classes). This is the template the IBP copies for binary features.

## Main Content
**Latent class model.** Object $i$ has class $c_i\in\{1,\dots,K\}$ and properties $x_i\sim p(x\mid c_i)$. With $\theta\mid\alpha\sim\text{Dirichlet}(\tfrac\alpha K,\dots,\tfrac\alpha K)$ and $c_i\mid\theta\sim\text{Discrete}(\theta)$.

> [!theorem] Finite prior on assignments (Eq. 3)
> $$
> P(\mathbf c)=\frac{\prod_{k=1}^K\Gamma(m_k+\frac\alpha K)}{\Gamma(\frac\alpha K)^K}\cdot\frac{\Gamma(\alpha)}{\Gamma(N+\alpha)},\qquad m_k=\sum_i\delta(c_i=k).
> $$
> It is exchangeable but allows at most $K$ classes.

^thm-finite-class-prior

**Equivalence classes.** Because $p(X\mid\mathbf c)$ is invariant to relabelling, work with partitions $[\mathbf c]$ (e.g. $\{1,1,2\}\sim\{2,2,1\}$). With $K=K_0+K_+$ ($K_+$ used classes), the number of assignment vectors in the partition class is $K!/K_0!$.

> [!theorem] Infinite limit gives the CRP partition law (Eq. 5)
> $$
> \lim_{K\to\infty}P([\mathbf c])=\alpha^{K_+}\Big(\prod_{k=1}^{K_+}(m_k-1)!\Big)\frac{\Gamma(\alpha)}{\Gamma(N+\alpha)}.
> $$

^thm-crp-limit

Proof sketch: expand $\Gamma(m_k+\alpha/K)/\Gamma(\alpha/K)=(\alpha/K)\prod_{j=1}^{m_k-1}(j+\alpha/K)$; multiply by $K!/K_0!\approx K^{K_+}$ so the $K^{K_+}$ cancels $(\alpha/K)^{K_+}$, leaving $\alpha^{K_+}\prod(m_k-1)!$.

**Sequential form (Eq. 6, CRP).** Customer $i$ sits at occupied table $k$ with probability $m_k/(i-1+\alpha)$ and at a new table with probability $\alpha/(i-1+\alpha)$. The first customer sits at table 1 with probability one. The CRP is attributed to Pitman and Dubins; Aldous 1985 first described it. Pitman (2002) gives the depth.

**Gibbs sampling (2.4).** $P(c_i=k\mid\mathbf c_{-i},X)\propto p(X\mid\mathbf c)\,P(c_i=k\mid\mathbf c_{-i})$ (Bush and MacEachern 1996; Neal 2000). By exchangeability take $i$ as the last customer. The paper also notes variational methods (Blei and Jordan 2006).

## Examples
> [!example] Three customers
> $N=3$, $\alpha=1$: partition $\{1,2\},\{3\}$ has $K_+=2$, $m=(2,1)$: $P=1^2\cdot1!\,0!\cdot\Gamma(1)/\Gamma(4)=1/6$. Partition $\{1,2,3\}$: $1\cdot2!\cdot\Gamma(1)/\Gamma(4)=2/6=1/3$. Partition $\{1\},\{2\},\{3\}$: $1/6$. Three partitions of type $(2,1)$ sum to $1/2$, plus $1/3$ plus $1/6$ equals $1$.

^ex-crp-three-customers

## Connections
Teh's entry gives the same law with the urn: [[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]]. The EPPF viewpoint: [[De Blasi 2015 - EPPF and Predictive Structure]].

## See Also
[[Griffiths 2011 - The Indian Buffet Process - Overview]], [[Griffiths 2011 - Equivalence Classes and the Infinite Limit]]
