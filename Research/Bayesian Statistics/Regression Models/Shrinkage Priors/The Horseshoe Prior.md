---
title: The Horseshoe Prior
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/definition
  - doc/paper
source: "[[raw/Piironen Vehtari 2017 - Regularized Horseshoe.pdf]]"
source_location: "Secs. 2.1–2.2, pp. 3–7"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Regression Models/Shrinkage Priors"
doc_type: paper
depends_on:
  - "[[Global-Local Shrinkage Priors]]"
  - "[[Bayesian Linear Regression]]"
used_by:
  - "[[Regularized Horseshoe (Finnish Horseshoe)]]"
  - "[[Choosing the Global Scale and Effective Nonzeros]]"
  - "[[Horseshoe and Regularized Horseshoe Priors]]"
aliases:
  - Horseshoe
  - Carvalho-Polson-Scott Prior
  - Half-Cauchy Local Scales
  - Original Horseshoe
---

# The Horseshoe Prior

> [!summary]
> The horseshoe prior (Carvalho, Polson & Scott, 2009/2010) is the global-local shrinkage prior with **half-Cauchy local scales** $\lambda_j\sim\mathrm{C}^{+}(0,1)$. Its name comes from the $\text{Beta}(\tfrac12,\tfrac12)$, horseshoe-shaped density it induces on the shrinkage factor $\kappa_j$: mass piles up at $\kappa=0$ (signals untouched) and $\kappa=1$ (noise crushed). The heavy Cauchy tails give tail-robustness — strong signals are barely shrunk — which is usually an asset but becomes a liability under weak likelihoods.

## Overview

The horseshoe is the most prominent member of the [[Global-Local Shrinkage Priors]] family and the starting point for the [[Regularized Horseshoe (Finnish Horseshoe)]]. It has shown performance comparable to the gold-standard [[Spike-and-Slab Prior for Covariate Selection]] across many examples while remaining a simple continuous prior that samples in Stan. This note covers its definition, the horseshoe-shaped $\kappa$ density, tail-robustness, and the connection to spike-and-slab.

## Main Content

> [!definition] Horseshoe prior
> For the linear Gaussian regression $y_i = \boldsymbol\beta^\mathsf{T}\mathbf{x}_i + \varepsilon_i$, $\varepsilon_i\sim\mathrm{N}(0,\sigma^2)$:
> $$\beta_j \mid \lambda_j, \tau \sim \mathrm{N}\!\left(0,\ \tau^2\lambda_j^2\right), \qquad \lambda_j \sim \mathrm{C}^{+}(0,1), \quad j=1,\dots,D.$$
> The global scale $\tau$ pulls all coefficients toward zero; the thick half-Cauchy tails of $\lambda_j$ allow some coefficients to escape. Large $\tau$ gives diffuse priors with little shrinkage; $\tau\to0$ shrinks all $\beta_j$ to zero. An intercept $\beta_0$, if present, gets a flat prior. ^hs-def

> [!theorem] Horseshoe-shaped density on $\kappa_j$
> With $\lambda_j\sim\mathrm{C}^{+}(0,1)$, the shrinkage factor $\kappa_j = \big(1 + n\sigma^{-2}\tau^2 s_j^2\lambda_j^2\big)^{-1}$ follows, at fixed $\tau,\sigma$,
> $$p(\kappa_j \mid \tau,\sigma) = \frac{1}{\pi}\,\frac{a_j}{(a_j^2-1)\kappa_j + 1}\,\frac{1}{\sqrt{\kappa_j}\sqrt{1-\kappa_j}}, \qquad a_j = \tau\sigma^{-1}\sqrt{n}\,s_j.$$
> For $a_j=1$ this is exactly $\text{Beta}(\tfrac12,\tfrac12)$, the symmetric U-shaped "horseshoe" with unbounded density at both $\kappa_j=0$ and $\kappa_j=1$. A priori we therefore expect both relevant variables ($\kappa_j\approx0$, no shrinkage) and irrelevant variables ($\kappa_j\approx1$, complete shrinkage). ^horseshoe-density

**Tail-robustness.** Because the half-Cauchy local scale has Cauchy tails, the marginal prior on a large $\beta_j$ has heavy tails too. The shrinkage factor satisfies $\kappa_j\to0$ for large signals, so $\bar\beta_j\to\hat\beta_j$ — strong coefficients are essentially **not shrunk**. Carvalho–Polson–Scott view this as a key strength: signals are not over-shrunk. The downside (motivating the [[Regularized Horseshoe (Finnish Horseshoe)]]) is that there is no way to regularize the largest coefficients: under a weak/flat likelihood (separable logistic regression), the heavy tails let $|\beta_j|\to\infty$ and posterior means can vanish, sharing the pathologies of the Cauchy prior.

> [!definition] Relation to spike-and-slab
> Writing the spike-and-slab with $\varepsilon=0$ as $\beta_j\mid\lambda_j,c\sim\mathrm{N}(0,c^2\lambda_j^2)$, $\lambda_j\sim\text{Ber}(\pi)$, the shrinkage factor takes only two values: $\kappa_j = \big(1+n\sigma^{-2}s_j^2 c^2\big)^{-1}$ (slab, prob. $\pi$) and $\kappa_j=1$ (spike, prob. $1-\pi$). Letting $c\to\infty$ puts all mass at $\kappa=0$ and $\kappa=1$ — the discrete analogue of the horseshoe's continuous U-shape. This is why the two priors perform similarly. ^spike-slab-link

## Examples

- **$\text{Beta}(\tfrac12,\tfrac12)$ intuition:** the density $\propto \kappa^{-1/2}(1-\kappa)^{-1/2}$ is the arcsine distribution; almost all prior mass is near the two endpoints, encoding "each coefficient is either clearly in or clearly out."
- **Default-$\tau$ pitfall:** the popular default $\tau\sim\mathrm{C}^{+}(0,1)$ ignores that $a_j$ depends on $n$ and $\sigma$; it implies an implausibly large effective model size unless $\tau$ is strongly identified by data (see [[Choosing the Global Scale and Effective Nonzeros]]).

## Connections

- A specific instance of [[Global-Local Shrinkage Priors]] (half-Cauchy local scales).
- Extended to fix tail problems by the [[Regularized Horseshoe (Finnish Horseshoe)]].
- Its $\tau$ is set via $m_\text{eff}$ in [[Choosing the Global Scale and Effective Nonzeros]].
- The continuous analogue of [[Spike-and-Slab Prior for Covariate Selection]].
- Prior on regression coefficients of [[Bayesian Linear Regression]]; the shared global $\tau$ mirrors [[Hierarchical Linear Models]] and the multiplicity control of [[Partial Pooling as Multiple Comparisons Correction]].

## See Also
- [[Global-Local Shrinkage Priors]] — the parent framework
- [[Regularized Horseshoe (Finnish Horseshoe)]] — the slab-regularized fix
- [[Choosing the Global Scale and Effective Nonzeros]] — setting $\tau$
- [[Spike-and-Slab Prior for Covariate Selection]] — the discrete gold standard
- [[Horseshoe and Regularized Horseshoe Priors]] — overview hub
- [[Partial Pooling as Multiple Comparisons Correction]] — shrinkage as multiplicity control
