---
title: Horseshoe and Regularized Horseshoe Priors
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/overview
  - doc/paper
source: "[[raw/Piironen Vehtari 2017 - Regularized Horseshoe.pdf]]"
source_location: "Whole paper (Secs. 1–4), EJS 2017"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Regression Models/Shrinkage Priors"
doc_type: paper
depends_on:
  - "[[Global-Local Shrinkage Priors]]"
  - "[[The Horseshoe Prior]]"
  - "[[Choosing the Global Scale and Effective Nonzeros]]"
  - "[[Regularized Horseshoe (Finnish Horseshoe)]]"
  - "[[Bayesian Linear Regression]]"
used_by: []
aliases:
  - Finnish Horseshoe
  - Piironen Vehtari Horseshoe
  - Regularized Horseshoe Overview
  - Sparsity Information and Regularization
---

# Horseshoe and Regularized Horseshoe Priors

> [!summary]
> Piironen & Vehtari (2017) fix two long-standing problems with the horseshoe prior for sparse Bayesian regression: (1) there was no principled way to set the global shrinkage scale $\tau$, and (2) the horseshoe leaves large coefficients completely unregularized, which is harmful under weak likelihoods (e.g. separable logistic regression). Their solutions are the **effective number of nonzeros** $m_\text{eff}$ that turns prior beliefs about sparsity ($p_0$) into a concrete prior for $\tau$, and the **regularized (Finnish) horseshoe**, which adds a Student-$t$ slab of scale $c$ to softly cap the largest coefficients.

## Overview

This is the hub note for an Obsidian cluster on global-local shrinkage priors. The paper is an extension of Piironen & Vehtari (2017a) and targets regression/classification with many predictors $\boldsymbol\beta = (\beta_1,\dots,\beta_D)$ of which only a few are expected to be nonzero.

The four companion notes break the contribution into pieces:

- [[Global-Local Shrinkage Priors]] — the scale-mixture-of-Gaussians framework, the shrinkage factor $\kappa_j$, and where ridge/lasso/horseshoe sit in $\kappa$-space.
- [[The Horseshoe Prior]] — the Carvalho–Polson–Scott horseshoe with half-Cauchy local scales and the characteristic $\text{Beta}(\tfrac12,\tfrac12)$ "horseshoe" density on $\kappa_j$.
- [[Choosing the Global Scale and Effective Nonzeros]] — $m_\text{eff}$ and the $\tau_0$ prior-guess formula.
- [[Regularized Horseshoe (Finnish Horseshoe)]] — the slab scale $c$, the regularized local scale $\tilde\lambda_j$, and why it behaves like a continuous spike-and-slab.

The two main theoretical advances are summarized below; details live in the companion notes.

## Main Content

The model is the standard linear Gaussian regression with a horseshoe prior on the coefficients.

> [!definition] Horseshoe prior for linear regression
> For $y_i = \boldsymbol\beta^\mathsf{T}\mathbf{x}_i + \varepsilon_i$, $\varepsilon_i \sim \mathrm{N}(0,\sigma^2)$, the horseshoe prior is the global-local scale mixture
> $$\beta_j \mid \lambda_j, \tau \sim \mathrm{N}\!\left(0,\ \tau^2\lambda_j^2\right), \qquad \lambda_j \sim \mathrm{C}^{+}(0,1), \quad j=1,\dots,D,$$
> where $\tau$ is the **global** scale (pulls all coefficients toward 0) and the half-Cauchy **local** scales $\lambda_j$ have heavy tails that let some $\beta_j$ escape the shrinkage. An intercept $\beta_0$ gets a relatively flat prior (no reason to shrink it). ^hs-def

> [!theorem] Shrinkage factor
> Assuming uncorrelated predictors with $\mathrm{Var}(x_j)=s_j^2$ (so $\mathbf{X}^\mathsf{T}\mathbf{X}\approx n\,\mathrm{diag}(s_1^2,\dots,s_D^2)$), the posterior mean satisfies $\bar\beta_j = (1-\kappa_j)\hat\beta_j$ where $\hat\beta_j$ is the MLE and
> $$\kappa_j = \frac{1}{1 + n\sigma^{-2}\tau^2 s_j^2 \lambda_j^2}$$
> is the **shrinkage factor**: $\kappa_j=1$ is complete shrinkage to zero, $\kappa_j=0$ is no shrinkage. As $\tau\to 0$, $\bar{\boldsymbol\beta}\to 0$; as $\tau\to\infty$, $\bar{\boldsymbol\beta}\to\hat{\boldsymbol\beta}$. ^shrinkage-factor

> [!definition] Regularized (Finnish) horseshoe
> Replace the local scale by a slab-truncated version:
> $$\beta_j \mid \lambda_j, \tau, c \sim \mathrm{N}\!\left(0,\ \tau^2\tilde\lambda_j^2\right), \qquad \tilde\lambda_j^2 = \frac{c^2\lambda_j^2}{c^2 + \tau^2\lambda_j^2}, \qquad \lambda_j \sim \mathrm{C}^{+}(0,1).$$
> When $\tau^2\lambda_j^2 \ll c^2$ (small coefficient) $\tilde\lambda_j^2\to\lambda_j^2$ and we recover the original horseshoe; when $\tau^2\lambda_j^2 \gg c^2$ (large coefficient) $\tilde\lambda_j^2\to c^2/\tau^2$ so the prior approaches $\mathrm{N}(0,c^2)$ — a Gaussian slab of width $c$ that "soft-truncates" the heavy Cauchy tails. Letting $c\to\infty$ recovers the unregularized horseshoe. ^reg-hs-def

> [!theorem] Prior guess for the global scale
> If $p_0$ is the prior guess for the number of relevant predictors out of $D$, set the global scale so that the prior mean of $m_\text{eff}$ equals $p_0$:
> $$\tau_0 = \frac{p_0}{D - p_0}\,\frac{\sigma}{\sqrt{n}}.$$
> $\tau$ must scale as $\sigma/\sqrt{n}$ to keep prior beliefs about $m_\text{eff}$ consistent — which is exactly why the default $\tau\sim\mathrm{C}^{+}(0,1)$ is a dubious choice (it ignores $\sigma$ and $n$ and puts far too much mass on large $\tau$). ^tau0

The paper also shows the regularized horseshoe is the **continuous counterpart of the spike-and-slab prior with a finite slab width**, whereas the original horseshoe corresponds to spike-and-slab with an infinitely wide slab. See [[Spike-and-Slab Prior for Covariate Selection]].

## Examples

- **Setting $\tau_0$:** With $D=1000$ predictors, $n=200$ observations, $\sigma\approx 1$, and a prior guess $p_0=5$ relevant variables: $\tau_0 = \frac{5}{995}\cdot\frac{1}{\sqrt{200}} \approx 3.6\times 10^{-4}$. This is far from the scale 1 used by the naive $\mathrm{C}^{+}(0,1)$ default.
- **Logistic regression / separation:** When data are separable the likelihood is flat, the MLE diverges, and the Cauchy-tailed horseshoe lets the largest $\beta_j\to\infty$, making posterior means vanish. The slab scale $c$ (e.g. via $c^2\sim\text{Inv-Gamma}$ giving a Student-$t_\nu(0,s^2)$ slab) caps this. For binary classification a workable plug-in is $\tilde\sigma^2 = 1/(\mu(1-\mu))$, e.g. $\mu=0.5\Rightarrow\tilde\sigma^2=4$.

## Connections

- Generalizes the **horseshoe** ([[The Horseshoe Prior]]) within the **global-local** family ([[Global-Local Shrinkage Priors]]).
- The $\tau$ problem and its $m_\text{eff}$ solution are in [[Choosing the Global Scale and Effective Nonzeros]].
- The slab regularization is in [[Regularized Horseshoe (Finnish Horseshoe)]].
- Builds on [[Bayesian Linear Regression]]; competes with [[Spike-and-Slab Prior for Covariate Selection]].
- Connected to model-size control and the bias–variance view in [[Overfitting and Information Criteria]].

## See Also
- [[Global-Local Shrinkage Priors]] — the framework these priors belong to
- [[The Horseshoe Prior]] — the base prior being fixed
- [[Choosing the Global Scale and Effective Nonzeros]] — how to set $\tau$
- [[Regularized Horseshoe (Finnish Horseshoe)]] — the slab fix
- [[Spike-and-Slab Prior for Covariate Selection]] — the discrete-mixture counterpart
- [[Bayesian Linear Regression]] — the underlying regression model
