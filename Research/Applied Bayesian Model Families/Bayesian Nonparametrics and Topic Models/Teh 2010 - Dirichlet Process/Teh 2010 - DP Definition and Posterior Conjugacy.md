---
title: "Teh 2010 - DP Definition and Posterior Conjugacy"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/definition
  - doc/paper
source: "[[raw/Teh 2010 - Dirichlet Process.pdf]]"
source_location: "Definition, Motivation, Theory (Eqs. 1-4), pp. 1-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Teh 2010 - Dirichlet Process"
doc_type: paper
depends_on:
  - "[[Teh 2010 - Dirichlet Process - Overview]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]]"
  - "[[Teh 2010 - Stick-Breaking Construction]]"
aliases:
  - "Dirichlet process definition"
  - "DP posterior conjugacy"
---

# Teh 2010 - DP Definition and Posterior Conjugacy

> [!summary]
> A DP is a random probability measure $G$ whose masses on any finite partition are Dirichlet. It has mean $H$, an inverse-variance parameter $\alpha$, is discrete almost surely, has weak support on all distributions when $H$ has full support, and is conjugate: the posterior is a DP with updated parameters.

## Overview
Parametric Bayesian modelling restricts the unknown $F$ to a family and invites over- or under-fitting. Placing a prior on $F$ itself with wide support needs tractable posteriors; the DP (Ferguson 1973) provides this. Teh motivates it by the $K\to\infty$ limit of a finite Dirichlet mixture (Eq. 1).

## Main Content

> [!definition] Dirichlet process
> Let $H$ be a distribution on $\Theta$ and $\alpha>0$. A random distribution $G$ is **Dirichlet process distributed**, $G\sim\text{DP}(\alpha,H)$, if for every finite measurable partition $A_1,\dots,A_r$ of $\Theta$
> $$(G(A_1),\dots,G(A_r))\sim\text{Dir}(\alpha H(A_1),\dots,\alpha H(A_r)).$$
> $H$ is the **base distribution**, $\alpha$ the **concentration** (strength, mass) parameter.

^def-dirichlet-process

> [!theorem] Moments and limits
> For measurable $A$: $\mathbb E[G(A)]=H(A)$ and $\mathbb V[G(A)]=\dfrac{H(A)(1-H(A))}{\alpha+1}$. As $\alpha\to\infty$, $G(A)\to H(A)$ for all $A$ (weak convergence), but $G\not\to H$ in a stronger sense because $G$ is discrete a.s. even for smooth $H$.

^thm-dp-moments

Proof sketch: the marginal of one component of $\text{Dir}(a_1,\dots,a_r)$ is $\text{Beta}(a_i,\sum_{j\ne i}a_j)$; with $a_1=\alpha H(A)$, $a_2=\alpha(1-H(A))$ the Beta mean is $H(A)$ and variance $H(1-H)/(\alpha+1)$.

> [!theorem] Posterior conjugacy
> Let $G\sim\text{DP}(\alpha,H)$ and $\theta_1,\dots,\theta_n\mid G\overset{iid}{\sim}G$. Then
> $$G\mid\theta_{1:n}\sim\text{DP}\Big(\alpha+n,\ \frac{\alpha}{\alpha+n}H+\frac{n}{\alpha+n}\frac{\sum_{i=1}^n\delta_{\theta_i}}{n}\Big).$$

^thm-dp-posterior

Proof sketch (Teh): with $n_k=\#\{i:\theta_i\in A_k\}$, Dirichlet-multinomial conjugacy gives $(G(A_k))_k\mid\theta_{1:n}\sim\text{Dir}(\alpha H(A_k)+n_k)$ for every partition, which is the DP finite-dimensional law with measure $\alpha H+\sum_i\delta_{\theta_i}$.

Interpretation: the posterior base is a weighted average of the prior $H$ (weight $\propto\alpha$) and the empirical distribution (weight $\propto n$), so $\alpha$ is a prior sample size. $\alpha\to0$ gives a non-informative limit (predictive is the empirical distribution); $n\gg\alpha$ gives consistency.

**Support and existence.** If the topological support of $H$ is all of $\Theta$, any distribution is a weak limit of DP draws. Existence: Ferguson used Kolmogorov consistency and a gamma-process normalisation; Blackwell-MacQueen used the urn plus de Finetti (see [[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]]); Sethuraman gave a direct stick-breaking construction without regularity conditions ([[Teh 2010 - Stick-Breaking Construction]]).

## Examples
> [!example] Variance of a DP mass
> Take $H=\text{N}(0,1)$, $A=(0,\infty)$ so $H(A)=\tfrac12$. For $\alpha=1$: $\mathbb V[G(A)]=\tfrac14/2=0.125$; for $\alpha=10$: $0.25/11\approx0.0227$. Larger $\alpha$ pins $G(A)$ near $\tfrac12$.

^ex-dp-variance

```python
import numpy as np
for a in (1, 10, 100):
    print(a, 0.25 / (a + 1))   # Var[G(A)] with H(A)=1/2
```

## Connections
Section 2 of the paper ties to [[Hierarchical Models]] (the DP replaces a parametric random-effects distribution) and to [[Nonparametric Models Overview]].

## See Also
[[Teh 2010 - Dirichlet Process - Overview]], [[Teh 2010 - DP Mixture Models and Applications]]
