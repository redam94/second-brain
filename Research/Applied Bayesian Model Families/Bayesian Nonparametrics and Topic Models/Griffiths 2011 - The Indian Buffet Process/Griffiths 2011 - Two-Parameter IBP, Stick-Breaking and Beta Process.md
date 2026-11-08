---
title: "Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/paper
source: "[[raw/Griffiths Ghahramani 2011 - The Indian Buffet Process An Introduction and Review.pdf]]"
source_location: "Sec. 7 (7.1-7.4, Fig. 10), pp. 1214-1220"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Griffiths 2011 - The Indian Buffet Process"
doc_type: paper
depends_on:
  - "[[Griffiths 2011 - The Indian Buffet Process and Its Properties]]"
  - "[[Teh 2010 - Stick-Breaking Construction]]"
used_by:
  - "[[Griffiths 2011 - The Indian Buffet Process - Overview]]"
aliases:
  - "two-parameter Indian buffet process"
  - "beta process IBP"
  - "Markov IBP"
---

# Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process

> [!summary]
> The one-parameter IBP couples sparsity and dimensionality through $\alpha$. The two-parameter IBP (Ghahramani et al. 2007) introduces $\beta$ to decouple them; the IBP also has a stick-breaking form (Teh et al. 2007) and a de Finetti measure, the beta process (Thibaux and Jordan 2007); and exchangeability can be relaxed (Markov and phylogenetic IBPs).

## Main Content

> [!definition] Two-parameter IBP (7.1)
> Finite model $\pi_k\mid\alpha,\beta\sim\text{Beta}(\frac{\alpha\beta}{K},\beta)$. Sequentially: customer 1 samples $\text{Poisson}(\alpha)$ dishes; customer $i$ takes dish $k$ with probability $m_k/(\beta+i-1)$ and tries $\text{Poisson}\big(\frac{\alpha\beta}{\beta+i-1}\big)$ new dishes.

^def-two-param-ibp

Expected features per object stays $\alpha$; $K_+\sim\text{Poisson}\big(\alpha\sum_{i=1}^N\frac{\beta}{\beta+i-1}\big)$. Small $\beta$: features shared by all objects (extreme: $K_+\approx\alpha$); large $\beta$: object-specific features (extreme: $K_+\to N\alpha$). For finite $\beta$ growth is $\alpha\beta\ln N$, preceded by linear growth when $N<\beta$. Fig. 10 shows draws with $\alpha=10$ and $\beta=0.2,1,5$.

> [!theorem] Stick-breaking for the IBP (7.2)
> Sort the feature probabilities $\pi_k$ from largest to smallest. Then the sorted sequence has the law of the cumulative products of $\text{Beta}(\alpha,1)$ breaks of the DP stick (Teh, Gorur and Ghahramani 2007): $\pi_{(1)}=\nu_1$, $\pi_{(k)}=\prod_{l\le k}\nu_l$ with $\nu_l\sim\text{Beta}(\alpha,1)$. This supports slice sampling and the variational algorithm of Doshi-Velez et al.

^thm-ibp-stick-breaking

**Beta process (7.3).** de Finetti representation: the IBP law equals independent Bernoulli draws from a latent measure given by the beta process (Hjort 1990; Thibaux and Jordan 2007), just as the CRP arises from the DP. Consequences: natural two-parameter analogues, hierarchical IBPs for correlated feature use across data sets, and a power-law variant via stable processes (Teh and Gorur 2010).

**Relaxing exchangeability (7.4).** Column correlations: a secondary process on features (Doshi-Velez and Ghahramani 2009b). Row dependence in time: **Markov IBP** (Van Gael et al. 2009), each column follows a Markov chain with transition parameters given beta priors, enabling infinite factorial HMMs with slice sampling. Row dependence by a tree: **phylogenetic IBP** (Miller et al. 2008), original IBP recovered by a star tree.

## Examples
> [!example] Effect of $\beta$ on dimensionality
> $\alpha=10$, $N=100$, $E[K_+]=\alpha\sum_{i=1}^{N}\frac{\beta}{\beta+i-1}$. $\beta=0.2$: $\approx19.8$ (features widely shared); $\beta=1$: $10H_{100}\approx51.9$; $\beta=5$: $\approx157.2$ (more object-specific features). Average features per object remains 10 in all three cases.

^ex-two-param-beta

## Connections
The DP side of the stick-breaking story: [[Teh 2010 - Stick-Breaking Construction]]. Pitman-Yor discount as a *different* decoupling of cluster-count growth: [[De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors]]. Variational inference background: [[Variational Inference - Overview]].

## See Also
[[Griffiths 2011 - The Indian Buffet Process - Overview]]
