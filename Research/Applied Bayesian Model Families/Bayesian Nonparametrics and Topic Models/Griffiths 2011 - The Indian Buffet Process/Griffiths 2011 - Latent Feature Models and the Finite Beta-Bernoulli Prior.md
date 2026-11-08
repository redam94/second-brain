---
title: "Griffiths 2011 - Latent Feature Models and the Finite Beta-Bernoulli Prior"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/definition
  - doc/paper
source: "[[raw/Griffiths Ghahramani 2011 - The Indian Buffet Process An Introduction and Review.pdf]]"
source_location: "Sec. 3 and Sec. 4.1 (Eqs. 8-11, Figs 3-4), pp. 1193-1195"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Griffiths 2011 - The Indian Buffet Process"
doc_type: paper
depends_on:
  - "[[Griffiths 2011 - Infinite Mixtures and the CRP Review]]"
used_by:
  - "[[Griffiths 2011 - Equivalence Classes and the Infinite Limit]]"
aliases:
  - "beta-Bernoulli feature model"
  - "latent feature model Z V decomposition"
---

# Griffiths 2011 - Latent Feature Models and the Finite Beta-Bernoulli Prior

> [!summary]
> A latent feature model represents each object by $F=Z\odot V$, a binary pattern $Z$ times feature values $V$. The IBP is a prior on $Z$ derived from a finite model $\pi_k\sim\text{Beta}(\alpha/K,1)$, $z_{ik}\sim\text{Bernoulli}(\pi_k)$ whose expected number of ones is bounded by $N\alpha$ independent of $K$.

## Main Content
**Latent feature models (Sec. 3).** Object $i$ has latent vector $f_i$; properties $x_i$ are generated from $p(X\mid F)$. With $F=Z\otimes V$ (Hadamard product), $Z$ is a binary $N\times K$ matrix with $z_{ik}=1$ iff object $i$ has feature $k$, and $V$ holds feature values (continuous as in sparse PCA, or discrete). Dense models (PCA, cooperative vector quantisation) set all of $Z$ to 1. The prior is $p(F)=P(Z)p(V)$; focus on $P(Z)$ because it fixes the effective dimensionality. Desiderata: objects exchangeable; tractable inference; method: finite model, then $K\to\infty$.

> [!definition] Finite beta-Bernoulli feature model (Eq. 9)
> $$\pi_k\mid\alpha\sim\text{Beta}(\tfrac\alpha K,1),\qquad z_{ik}\mid\pi_k\sim\text{Bernoulli}(\pi_k),\quad i\le N,\ k\le K,$$
> independently across $i$ and $k$. The choice $r=\alpha/K,\ s=1$ gives $B(\alpha/K,1)=K/\alpha$ and is what makes the $K\to\infty$ limit work (relaxed to $s=\beta$ in the two-parameter IBP).

^def-finite-beta-bernoulli

> [!theorem] Marginal of $Z$ (Eq. 10)
> Integrating out $\pi$ by beta-binomial conjugacy,
> $$P(Z)=\prod_{k=1}^K\frac{\frac\alpha K\,\Gamma(m_k+\frac\alpha K)\Gamma(N-m_k+1)}{\Gamma(N+1+\frac\alpha K)},\qquad m_k=\sum_iz_{ik}.$$
> It is exchangeable in rows (depends only on the column counts $m_k$).

^thm-finite-marginal-z

> [!theorem] Sparsity bound (Eq. 11)
> $E[\mathbf 1^Tz_k]=N\frac{\alpha/K}{1+\alpha/K}$, hence $E[\mathbf 1^TZ\mathbf 1]=\dfrac{N\alpha}{1+\alpha/K}\le N\alpha$ for all $K$, and the limit $K\to\infty$ is $N\alpha$.

^thm-finite-sparsity

Proof: $E[\pi_k]=r/(r+s)=(\alpha/K)/(1+\alpha/K)$; sum over $N$ rows and $K$ columns.

## Examples
> [!example] Expected ones for $N=100,\alpha=5$
> $E[\mathbf 1^TZ\mathbf 1]\to500$, i.e. five features per object on average, regardless of the (arbitrarily large) $K$ - the model is sparse by construction.

^ex-expected-ones

## Connections
Compare to continuous latent factors: [[Factor Analysis and PPCA]]. The CRP-analogue limit argument: [[Griffiths 2011 - Infinite Mixtures and the CRP Review]].

## See Also
[[Griffiths 2011 - The Indian Buffet Process - Overview]]
