---
title: Global-Local Shrinkage Priors
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/concept
  - doc/paper
source: "[[raw/Piironen Vehtari 2017 - Regularized Horseshoe.pdf]]"
source_location: "Secs. 1, 2.1, pp. 1–5"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Regression Models/Shrinkage Priors"
doc_type: paper
depends_on:
  - "[[Bayesian Linear Regression]]"
used_by:
  - "[[Q - Continuous Learning in Media Measurement with Interaction Effects]]"
  - "[[The Horseshoe Prior]]"
  - "[[Horseshoe and Regularized Horseshoe Priors]]"
  - "[[Choosing the Global Scale and Effective Nonzeros]]"
  - "[[Q - Partial Pooling Across Statistics and ML and When It Hurts]]"
aliases:
  - Global-Local Priors
  - Scale Mixture of Gaussians
  - Continuous Shrinkage Priors
  - Shrinkage Factor
---

# Global-Local Shrinkage Priors

> [!summary]
> Global-local shrinkage priors write each regression coefficient as a zero-mean Gaussian whose variance is a product of a single **global** scale $\tau$ (shrinks everything toward zero) and a **local** scale $\lambda_j$ (lets individual coefficients escape). They are the continuous, easy-to-sample alternative to discrete spike-and-slab priors. Every such prior shares the same **shrinkage factor** $\kappa_j$, whose prior density distinguishes ridge (mass near $\kappa=0$), lasso (peaked interior), and the horseshoe (U-shaped, mass at both 0 and 1).

## Overview

Two prior families dominate sparse Bayesian estimation: discrete two-component **spike-and-slab** priors ([[Spike-and-Slab Prior for Covariate Selection]]), and continuous **shrinkage priors**. The spike-and-slab is intuitive (a delta-spike spike makes it Bayesian model averaging) but its posterior is sensitive to the slab width and inclusion probability, and inference over the $2^D$ model space is expensive (often needing EP or VI). Continuous shrinkage priors are easy to implement, sample with generic tools (Stan), and can match spike-and-slab performance. This note covers the shared scaffolding; specific members are [[The Horseshoe Prior]] and the [[Regularized Horseshoe (Finnish Horseshoe)]].

## Main Content

> [!definition] Global-local scale mixture
> A global-local shrinkage prior on coefficients $\boldsymbol\beta=(\beta_1,\dots,\beta_D)$ of the regression $y_i = \boldsymbol\beta^\mathsf{T}\mathbf{x}_i + \varepsilon_i$, $\varepsilon_i\sim\mathrm{N}(0,\sigma^2)$, is a scale mixture of Gaussians
> $$
> \beta_j \mid \lambda_j, \tau \sim \mathrm{N}\!\left(0,\ \tau^2\lambda_j^2\right), \qquad \lambda_j \sim \pi(\lambda_j), \quad j = 1,\dots,D,
> $$
> where $\tau$ is the **global** scale common to all coefficients and $\lambda_j$ is the **local** scale specific to $\beta_j$. The choice of the local mixing density $\pi(\lambda_j)$ defines the family member. ^gl-def

> [!theorem] The shrinkage factor $\kappa_j$
> With uncorrelated predictors ($\mathbf{X}^\mathsf{T}\mathbf{X}\approx n\,\mathrm{diag}(s_1^2,\dots,s_D^2)$, $s_j^2=\mathrm{Var}(x_j)$), the conditional posterior mean is $\bar\beta_j = (1-\kappa_j)\hat\beta_j$ relative to the MLE $\hat{\boldsymbol\beta}=(\mathbf{X}^\mathsf{T}\mathbf{X})^{-1}\mathbf{X}^\mathsf{T}\mathbf{y}$, where
> $$
> \kappa_j = \frac{1}{1 + n\sigma^{-2}\tau^2 s_j^2 \lambda_j^2} \in [0,1].
> $$
> $\kappa_j=1$ means complete shrinkage to zero, $\kappa_j=0$ means the coefficient is left at its MLE. **This expression holds for any scale-mixture-of-Gaussians prior**, regardless of $\pi(\lambda_j)$ — only the implied prior on $\kappa_j$ differs across priors. ^kappa

> [!definition] Implied prior on $\kappa_j$ (horseshoe)
> For the half-Cauchy choice $\lambda_j\sim\mathrm{C}^{+}(0,1)$, at fixed $\tau,\sigma$ the shrinkage factor follows
> $$
> p(\kappa_j \mid \tau,\sigma) = \frac{1}{\pi}\,\frac{a_j}{(a_j^2-1)\kappa_j + 1}\,\frac{1}{\sqrt{\kappa_j}\sqrt{1-\kappa_j}}, \qquad a_j = \tau\sigma^{-1}\sqrt{n}\,s_j.
> $$
> When $a_j=1$ this reduces to $\text{Beta}(\tfrac12,\tfrac12)$ — the U-shaped "horseshoe" density with spikes at $\kappa=0$ and $\kappa=1$. ^kappa-density

**Where the classics sit in $\kappa$-space.** The shape of $p(\kappa_j)$ is the cleanest way to compare priors:

- **Ridge / Gaussian** ($\lambda_j$ fixed, i.e. a plain $\mathrm{N}(0,\tau^2)$): all coefficients share one variance, so $\kappa_j$ concentrates at a single interior value — uniform shrinkage of every coefficient, no separation of signal from noise.
- **Lasso / Laplace** (double-exponential, $\lambda_j^2\sim\text{Exp}$): a single interior mode for $\kappa_j$; shrinks moderately and cannot simultaneously leave strong signals unshrunk and crush noise.
- **Horseshoe** (half-Cauchy $\lambda_j$): $\text{Beta}(\tfrac12,\tfrac12)$-like U-shape — mass at $\kappa=0$ (relevant, no shrinkage, thanks to heavy Cauchy tails) and at $\kappa=1$ (irrelevant, complete shrinkage). This bimodality is exactly the sparse behavior we want. See [[The Horseshoe Prior]].

Changing $\tau$ (equivalently $a_j$) tilts the U: small $\tau$ (e.g. $a_j=0.1$) pushes mass toward $\kappa=1$ (more coefficients shrunk), large $\tau$ pushes toward $\kappa=0$. Because for fixed $\tau$ the sparsity also depends on dimension $D$, one must reason about all $\kappa_j$ jointly — leading to $m_\text{eff}$ in [[Choosing the Global Scale and Effective Nonzeros]].

## Examples

- **Why scale predictors:** $a_j \propto s_j$, so variables with larger scale $s_j$ are treated as more relevant a priori. Standardize to $s_j^2=1$ unless the raw scales genuinely carry relevance information; alternatively absorb the scale into the local prior, $\lambda_j\sim\mathrm{C}^{+}(0,s_j^{-2})$.
- **Reading the U-shape:** With $a_j=0.1$, $p(\kappa_j)$ piles up near $\kappa_j=1$, so a priori most coefficients are expected to be shrunk to zero — the sparse regime.

## Connections

- The horseshoe and regularized horseshoe are the specific members studied in [[The Horseshoe Prior]] and [[Regularized Horseshoe (Finnish Horseshoe)]].
- Summing $1-\kappa_j$ over coefficients gives the effective model size in [[Choosing the Global Scale and Effective Nonzeros]].
- The discrete counterpart is [[Spike-and-Slab Prior for Covariate Selection]].
- Built on top of [[Bayesian Linear Regression]]; the global scale $\tau$ acts as a hyperparameter analogous to those in [[Hierarchical Linear Models]].

## See Also
- [[The Horseshoe Prior]] — the half-Cauchy member with the U-shaped $\kappa$ density
- [[Regularized Horseshoe (Finnish Horseshoe)]] — adds a slab to the framework
- [[Choosing the Global Scale and Effective Nonzeros]] — aggregating $\kappa_j$ into $m_\text{eff}$
- [[Horseshoe and Regularized Horseshoe Priors]] — overview hub
- [[Spike-and-Slab Prior for Covariate Selection]] — discrete-mixture alternative
- [[Hierarchical Linear Models]] — global $\tau$ as a shared hyperparameter
