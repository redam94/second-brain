---
title: Regularized Horseshoe (Finnish Horseshoe)
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/definition
  - doc/paper
source: "[[raw/Piironen Vehtari 2017 - Regularized Horseshoe.pdf]]"
source_location: "Secs. 2.3, 3.4–3.5, App. C, pp. 6–8, 12–15, 28–32"
date_ingested: 2026-06-28
folder: "Bayesian Statistics/Regression Models/Shrinkage Priors"
doc_type: paper
depends_on:
  - "[[The Horseshoe Prior]]"
  - "[[Choosing the Global Scale and Effective Nonzeros]]"
  - "[[Global-Local Shrinkage Priors]]"
used_by:
  - "[[Horseshoe and Regularized Horseshoe Priors]]"
aliases:
  - Regularized Horseshoe
  - Finnish Horseshoe
  - Slab-Regularized Horseshoe
  - Slab Scale
---

# Regularized Horseshoe (Finnish Horseshoe)

> [!summary]
> The regularized horseshoe multiplies each local scale by a soft truncation that caps it at a **slab scale** $c$, via $\tilde\lambda_j^2 = c^2\lambda_j^2/(c^2+\tau^2\lambda_j^2)$. Small coefficients see the original horseshoe; large ones see a Gaussian slab $\mathrm{N}(0,c^2)$, so the heavy Cauchy tails are soft-truncated. This guarantees a minimum amount of regularization even for the strongest signals, curing the horseshoe's failure under weak/flat likelihoods (separable logistic regression) while preserving its sparsity. It is the continuous counterpart of a spike-and-slab with a finite-width slab.

## Overview

The original [[The Horseshoe Prior]] leaves large coefficients unregularized — usually praised, but harmful when the likelihood is weak: under separation in logistic regression the MLE diverges, and the Cauchy-tailed horseshoe lets $|\beta_j|\to\infty$, so posterior means can vanish (the same pathology as the Cauchy prior). The fix borrows the slab idea from [[Spike-and-Slab Prior for Covariate Selection]]: cap the prior variance of the big coefficients at a finite slab scale $c$. This note gives the definition, the regularized shrinkage factor, why it fixes weak-likelihood problems, slab-prior choice, and the practical (Stan/rstanarm) parameterization.

## Main Content

> [!definition] Regularized horseshoe prior
> $$\beta_j \mid \lambda_j, \tau, c \sim \mathrm{N}\!\left(0,\ \tau^2\tilde\lambda_j^2\right), \qquad \tilde\lambda_j^2 = \frac{c^2\lambda_j^2}{c^2 + \tau^2\lambda_j^2}, \qquad \lambda_j \sim \mathrm{C}^{+}(0,1),$$
> with slab scale $c>0$. Limits: when $\tau^2\lambda_j^2\ll c^2$ (small coefficient), $\tilde\lambda_j^2\to\lambda_j^2$ → original horseshoe; when $\tau^2\lambda_j^2\gg c^2$ (large coefficient), $\tilde\lambda_j^2\to c^2/\tau^2$ → prior $\to\mathrm{N}(0,c^2)$. As $c\to\infty$ the original horseshoe is recovered. ^reg-hs-def

> [!theorem] Product-of-factors interpretation
> The conditional prior factorizes as
> $$p(\beta_j\mid\lambda_j,\tau,c) \propto \mathrm{N}\!\left(0,\tau^2\lambda_j^2\right)\,\mathrm{N}\!\left(0,c^2\right) \propto \mathrm{N}\!\left(0,\tau^2\tilde\lambda_j^2\right).$$
> The prior behaves (roughly) as the narrower of the two factors: the horseshoe $\mathrm{N}(0,\tau^2\lambda_j^2)$ shrinks small signals, while the Gaussian slab $\mathrm{N}(0,c^2)$ "soft-truncates" the extreme horseshoe tails, controlling the magnitude of the largest $\beta_j$. ^factorization

> [!theorem] Regularized shrinkage factor and effective model size
> The regularized horseshoe shifts the left mode of the $\kappa_j$ density from $0$ to $b_j=\big(1+n\sigma^{-2}s_j^2 c^2\big)^{-1}$ (the horseshoe on $(0,1)$ becomes one on $(b_j,1)$). The shrinkage factor satisfies $\tilde\kappa_j \approx (1-b_j)\kappa_j + b_j$, so $1-\tilde\kappa_j=(1-b_j)(1-\kappa_j)$. With $s_j^2=1$ and $b=\big(1+n\sigma^{-2}c^2\big)^{-1}$,
> $$\bar m_\text{eff} = (1-b)\,m_\text{eff},$$
> where $m_\text{eff}$ is the original horseshoe's effective nonzeros. Effective complexity is thus always **smaller** than the pure horseshoe's, because even far-from-zero coefficients are still touched by the slab. The $\tau_0$ formula from [[Choosing the Global Scale and Effective Nonzeros]] still applies, with $p_0$ read as the prior guess for the number of coefficients far from zero. ^reg-kappa

> [!definition] Slab prior and exact-horseshoe variant
> Rather than fixing $c$, place a prior on $c^2$:
> $$c^2 \sim \text{Inv-Gamma}(\alpha,\beta), \qquad \alpha=\nu/2,\quad \beta=\nu s^2/2,$$
> which makes the slab a Student-$t_\nu(0,s^2)$ for the far-from-zero coefficients — a good weakly-informative default whose light left tail avoids over-shrinking already-large coefficients. To retain the *exact* horseshoe shape (rather than the close approximation above) one can instead use $\tilde\lambda_j^2 = \dfrac{c^2\lambda_j^2}{\frac{\sigma^2}{n s_j^2} + c^2 + \tau^2\lambda_j^2}$; the simpler form $(2.8)$ is preferred in practice since $\tfrac{\sigma^2}{n s_j^2}$ is usually negligible vs. $c^2$. ^slab-prior

**Why it fixes weak-likelihood / separation problems.** Capping the prior variance at $c^2$ prevents the largest coefficients from running to infinity when the likelihood is flat, so posterior means stay finite and well-behaved — exactly the regime where the original horseshoe (and Cauchy prior) fail. This also supersedes the earlier "hierarchical shrinkage" idea (raising the local degrees of freedom $\nu>1$), which reduces sparsity and is no longer recommended.

**Spike-and-slab connection.** Because the slab gives a finite width $c<\infty$, the regularized horseshoe is the continuous counterpart of a spike-and-slab with a finite slab; the original horseshoe corresponds to an infinitely wide slab. See [[Spike-and-Slab Prior for Covariate Selection]].

**Non-Gaussian models.** For GLMs replace $\sigma^2$ with a pseudo-variance $\tilde\sigma^2$ from a Gaussian (Laplace) approximation to the likelihood. Per-observation $\tilde\sigma_i^2 = -1/L_i''(\bar f_i,\phi)$; a crude single-value plug-in uses the variance function, e.g. binomial-logit $\tilde\sigma^2 = \mu^{-1}(1-\mu)^{-1}$, so $\mu=0.5\Rightarrow\tilde\sigma^2=4$ for balanced binary classification.

## Examples

- **Default slab:** $\nu=4$, $s=2$ gives a Student-$t_4(0,4)$ slab — coefficients far from zero are softly capped around $\pm$ a few units (on standardized scale).
- **Stan parameterization (App. C):** use the non-centered form `beta = z .* lambda_tilde * tau` with `z ~ normal(0,1)`, `lambda ~ student_t(nu_local,0,1)` (nu_local = 1 → half-Cauchy), `tau ~ student_t(nu_global,0,scale_global*sigma)`, `caux ~ inv_gamma(0.5*slab_df, 0.5*slab_df)`, `c = slab_scale*sqrt(caux)`, and `lambda_tilde = sqrt(c^2*lambda^2 ./ (c^2 + tau^2*lambda^2))`. Set `scale_global` $= \tau_0/\sigma = \frac{p_0}{(D-p_0)\sqrt n}$. A heavier non-centered variant (`aux1`/`aux2` decomposition, Peltola et al. 2014) avoids divergences from the funnel-shaped posterior.
- **rstanarm:** `tau0 <- p0/(D-p0)/sqrt(n)` then `prior_coeff <- hs(df=1, global_df=1, global_scale=tau0)` and fit with `stan_glm(..., prior = prior_coeff)` (rstanarm scales by $\sigma$ automatically). For logistic, use `sigma <- 1/sqrt(mean(y)*(1-mean(y)))` as the pseudo-sigma in `tau0`.

## Connections

- Extends [[The Horseshoe Prior]] by adding the slab; lives in [[Global-Local Shrinkage Priors]].
- Reuses the $\tau_0$ calibration of [[Choosing the Global Scale and Effective Nonzeros]] and shrinks its $m_\text{eff}$ by $(1-b)$.
- Continuous, finite-width counterpart of [[Spike-and-Slab Prior for Covariate Selection]].
- Curbing the largest coefficients is a regularization/overfitting control, cf. [[Overfitting and Information Criteria]].

## See Also
- [[The Horseshoe Prior]] — the base prior being regularized
- [[Choosing the Global Scale and Effective Nonzeros]] — $\tau_0$ and $\bar m_\text{eff}=(1-b)m_\text{eff}$
- [[Global-Local Shrinkage Priors]] — the scale-mixture framework
- [[Spike-and-Slab Prior for Covariate Selection]] — finite-slab discrete analogue
- [[Horseshoe and Regularized Horseshoe Priors]] — overview hub
- [[Overfitting and Information Criteria]] — regularization and model complexity
