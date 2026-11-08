---
title: "Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/concept
  - doc/paper
source: "[[raw/Betancourt Girolami 2015 - Hamiltonian Monte Carlo for Hierarchical Models.pdf]]"
source_location: "Sec. II.A-II.B, pp. 2-4; Figures 3-4"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Betancourt Girolami 2015 - HMC for Hierarchical Models"
doc_type: paper
depends_on:
  - "[[Betancourt 2015 - Hierarchical Geometry and the Funnel]]"
used_by:
  - "[[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]]"
aliases:
  - "Betancourt non-centred reparameterisation"
  - "Centred vs non-centred parameterisation"
---

# Betancourt 2015 - Gibbs, Random-Walk Metropolis and Reparameterisation

> [!summary]
> Random-walk Metropolis and Gibbs explore by transitions tuned to conditional variances, which are much smaller than marginal variances when the target is highly correlated, so they devolve into random walks on hierarchical models (Fig. 3: after 2500 iterations neither chain has explored the marginal of $v$). Parameter expansion and non-centred parameterisation break the dependence between layers but only work when analytic structure exists and the data are weak.

## Overview

Deterministic methods (nested Laplace and related work, refs [3]-[5]) can be powerful in a limited set of models; the paper focuses on stochastic MCMC.

## Main Content

> [!theorem] Why naive samplers fail
> Random-walk Metropolis and Gibbs explore via transitions tuned to the **conditional** variances of the target. In highly correlated targets the conditional variances are much smaller than the marginal variances, so many transitions are needed to cover the distribution and the samplers become random walks. Hierarchical models are highly correlated by construction and the correlations worsen as groups and levels are added.
^thm-naive-failure

> [!example] Figure 3 (funnel, $N=100$)
> (a) Gibbs (Metropolis-within-Gibbs, since $\pi(v\mid\theta)$ has no closed form): chain of $v$ has mean $-0.04$ and standard deviation $1.92$ after 2500 iterations, versus the true $\mathcal N(0,3^2)$. (b) Random-walk Metropolis: mean $2.71$, standard deviation $0.20$. Neither reaches the neck. Global decorrelation (rotation/rescaling) cannot help because the correlations cancel globally.
^ex-figure3-funnel

**Efficient implementations** reduce correlations between layers by exploiting the hierarchy explicitly (natural for Gibbs, since structure is given by conditional independences).

> [!definition] Parameter expansion (refs [7]-[9])
> Separate layers with an auxiliary variable: $\theta_i=\mu+\xi\eta_i$, $\eta_i\sim\mathcal N(0,\sigma_\eta^2)$ with $\tau=|\xi|\sigma_\eta$. Conditioned on $\eta$ the layers are independent and Gibbs mixes well, but the multiplicative auxiliary variable creates strong correlations in the joint that hurt random-walk Metropolis. Requires closed-form expanded conditionals (as any Gibbs sampler does).
^def-parameter-expansion

> [!definition] Non-centred parameterisation (ref [10]; Figure 4)
> Factor the dependence into a deterministic transformation: for the one-way normal apply location and scale reparameterisations
> $$
> y_i\sim\mathcal N(\vartheta_i\tau+\mu,\sigma_i^2),\qquad\vartheta_i\sim\mathcal N(0,1).
> $$
> This exchanges a direct $\phi$-$\theta$ dependence for a $\phi$-$y$ dependence: conditioned on the data, $\vartheta$ and $\phi$ are independent. When the data are not very constraining ($\sigma_i^2$ large) the joint is nearly isotropic and both Metropolis and Gibbs improve.
^def-non-centered

**Limits.** Parameter expansion needs closed-form conditionals; non-centring is mostly applicable where the dependence between layers is a generalised linear model. To avoid constraining the model class, one needs a more sophisticated sampler (HMC).

> [!example] Centred vs non-centred as a function of data strength
> With the one-way normal and constant $\sigma_i=\sigma$: when $\sigma$ is large (data weak) non-centred wins; when data are strong ($\sigma$ small) the centred form can be better, but then partial pooling is of little use anyway (Section III.A.2, Fig. 8, [[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]]).
^ex-cp-ncp-data-strength

## Connections

Non-centring is the first thing to try for a funnel in PyMC/Stan; HMC then handles the remaining geometry. See the Stan-based results in [[Betancourt 2015 - One-Way Normal Experiments and Stan Models]]. Existing vault: [[Hierarchical Models]], [[Monsters and Mixtures]].

## See Also
[[Betancourt 2015 - HMC for Hierarchical Models - Overview]], [[Betancourt 2015 - Hierarchical Geometry and the Funnel]]
