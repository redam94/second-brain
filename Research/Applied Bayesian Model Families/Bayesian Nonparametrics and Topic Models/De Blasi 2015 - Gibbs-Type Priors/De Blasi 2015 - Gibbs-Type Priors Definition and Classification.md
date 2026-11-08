---
title: "De Blasi 2015 - Gibbs-Type Priors Definition and Classification"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/theorem
  - doc/paper
source: "[[raw/De Blasi et al 2015 - Are Gibbs-Type Priors the Most Natural Generalization of the Dirichlet Process.pdf]]"
source_location: "Sec. 2, Sec. 2.1 (Prop. 1, Eqs. 13-17, Remark 2), Appendix (proof of Prop. 1), pp. 7-12, 36-38"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/De Blasi 2015 - Gibbs-Type Priors"
doc_type: paper
depends_on:
  - "[[De Blasi 2015 - EPPF and Predictive Structure]]"
used_by:
  - "[[De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors]]"
  - "[[De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters]]"
aliases:
  - "Gibbs-type prior"
  - "Gibbs-type EPPF"
  - "Proposition 1 classification"
  - "sigma-diversity"
---

# De Blasi 2015 - Gibbs-Type Priors Definition and Classification

> [!summary]
> Classify species sampling models by what the probability of a new value depends on: only $n$ (DP), $n$ and $k$ (Gibbs-type), or $n,k$ and frequencies (everything else). Gibbs-type priors have EPPF $V_{n,k}\prod(1-\sigma)_{n_i-1}$ with weights obeying a forward recursion; $\sigma$ controls reinforcement and the growth rate of $K_n$.

## Main Content

> [!theorem] Predictive classification (Proposition 1)
> For a species sampling model, write $f(\cdot)$ for $P(X_{n+1}=\text{new}\mid X_{1:n})$.
> (i) $f=f(n,\Theta)$ iff $\tilde p$ is a Dirichlet process; (ii) $f=f(n,k,\Theta)$ iff $\tilde p$ is of Gibbs-type; (iii) $f=f(n,k,n_1,\dots,n_k,\Theta)$ otherwise.

^thm-prop-classification

Proof (Appendix): EPPF of product form iff Gibbs-type (Gnedin and Pitman 2005), so (9) depends only on $(n,k)$ iff Gibbs-type. For (i), suppose $(n-\sigma k)V_{n+1,k}/V_{n,k}$ does not depend on $k$, i.e. $V_{n+1,k}/V_{n,k}=c_n/(n-\sigma k)$; with recursion (14) this gives $V_{n+1,k+1}/V_{n,k}=1-c_n$, so the predictive has the form $(1-c_n)P^*+c_n\sum_j\frac{n_j-\sigma}{n-\sigma k}\delta_{X_j^*}$ (Eq. 48). Infinite exchangeability requires $P(X_{n+1}\in A,X_{n+2}\in B\mid\cdot)=P(X_{n+1}\in B,X_{n+2}\in A\mid\cdot)$; with $A$ a new-value set and $B$ containing an old value, equality needs $\frac{c_{n+1}(1-c_n)}{n-k\sigma}=\frac{c_n(1-c_{n+1})}{n+1-(k+1)\sigma}$ for all $k$; the ratio of the $k=1$ and $k=2$ conditions forces $\sigma^2=\sigma$, so $\sigma=0$. For $\sigma=0$ the form (48) characterises the DP (Zabell 1982 / Regazzini 1978 / Lo 1991); Gibbs-type with $\sigma=0$ is the DP or a DP mixed over $\theta$, and the latter does depend on $k$, so only the DP is in (i).

> [!definition] Gibbs-type prior (Eqs. 13-14)
> A species sampling model is of Gibbs-type with $\sigma<1$ if its EPPF is
> $$p_k^{(n)}(n_1,\dots,n_k)=V_{n,k}\prod_{i=1}^k(1-\sigma)_{n_i-1},$$
> with non-negative weights satisfying the forward recursion $V_{n,k}=(n-\sigma k)V_{n+1,k}+V_{n+1,k+1}$, $V_{1,1}=1$.

^def-gibbs-type

**Predictive structure (Eq. 15).** $P(X_{n+1}\in\cdot\mid X_{1:n})=\frac{V_{n+1,k+1}}{V_{n,k}}P^*(\cdot)+\frac{V_{n+1,k}}{V_{n,k}}\sum_{i=1}^k(n_i-\sigma)\delta_{X_i^*}(\cdot)$. Two stages: (1) split mass between "new" and "old" using only $(n,k)$; (2) if old, choose a cluster $\propto n_i-\sigma$. Ratio of probabilities for two clusters is $(n_i-\sigma)/(n_j-\sigma)$: for $\sigma>0$ reinforcement of larger clusters increases with $\sigma$; $\sigma<0$ reverses it.

> [!theorem] Growth rate of $K_n$ ($\sigma$-diversity, Eq. 16)
> With $c_n(\sigma)=1$ for $\sigma<0$, $\log n$ for $\sigma=0$, $n^\sigma$ for $\sigma\in(0,1)$: $K_n/c_n(\sigma)\to S_\sigma$ a.s. For the DP with total mass $\theta$, $S_0=\theta$ (degenerate), i.e. $K_n\sim\theta\log n$. $\sigma<0$ means a finite number of species.

^thm-sigma-diversity

Intuition (PY): a new value (frequency 1) enters the empirical part with mass $\propto1-\sigma$ rather than 1, and the freed mass $\sigma$ is added to the new-value probability, increasing it by a factor $\sigma/(\theta+n+1)$.

**Remark 2.** Mixtures of DPs over the total mass $\theta$ are Gibbs-type (class ii): $P(\text{new})=\int\theta^{k+1}\pi(d\theta)/(\theta)_{n+1}$ depends on $k$. Mixing Gibbs-type priors over a parameter inside $V_{n,k}$ keeps Gibbs-type; mixing over $\sigma$ gives class (iii), though Gibbs conditionally on $\sigma$.

> [!definition] Product partition models (Sec. 2.1)
> $P(\Pi_n=\{S_1,\dots,S_k\})\propto\prod_i\rho(S_i)$ with cohesion $\rho$. If $\rho$ depends only on $|S_i|=n_i$, the partition is exchangeable-sequence-induced iff $\rho(n_i)=(1-\sigma)_{n_i-1}/n_i!$ for $\sigma\in[-\infty,1]$ ($(1-\sigma)_{n_i-1}=1$ at $\sigma=-\infty$; $\sigma=1$ gives singletons). That is exactly the Gibbs-type partition (Gnedin and Pitman 2005).

^def-product-partition

## Examples
> [!example] The same data, different "new species" probabilities
> $n=100$, $k=30$ observed values. DP with $\theta=10$: $P(\text{new})=10/110=0.091$. PY $(\sigma,\theta)=(0.5,10)$: $(10+15)/110=0.227$. Observing a 31st distinct value raises the PY new-value probability in a way the DP cannot: DP is independent of $k$.

^ex-new-probability

## Connections
[[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]] (the $\sigma=0$ case), [[Teh 2010 - Extensions and Reference Map]] (PY mention).

## See Also
[[De Blasi 2015 - Gibbs-Type Priors - Overview]], [[De Blasi 2015 - Subclasses Pitman-Yor NGG and Finite-Species Priors]]
