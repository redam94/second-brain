---
title: "Teh 2010 - DP Mixture Models and Applications"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/concept
  - doc/paper
source: "[[raw/Teh 2010 - Dirichlet Process.pdf]]"
source_location: "Applications and DP Mixture Models (Eqs. 14-16), pp. 9-10; finite limit Eq. 1, pp. 2-3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Teh 2010 - Dirichlet Process"
doc_type: paper
depends_on:
  - "[[Teh 2010 - Stick-Breaking Construction]]"
  - "[[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]]"
used_by:
  - "[[Concept - DP Mixtures for Image Segmentation]]"
  - "[[Concept - Label Switching and Label-Invariant Summaries]]"
aliases:
  - "DP mixture model"
  - "infinite mixture model"
  - "Dirichlet process mixture"
---

# Teh 2010 - DP Mixture Models and Applications

> [!summary]
> The DP mixture $x_i\mid\theta_i\sim F(\theta_i)$, $\theta_i\mid G\sim G$, $G\sim\text{DP}(\alpha,H)$ is an infinite mixture model: the number of used components is inferred, grows like $\alpha\log n$, and the DP also serves for model validation (a nonparametric relaxation around a parametric base) and density estimation (kernel-smoothed DP draws).

## Overview
Teh gives three applications: (1) Bayesian model validation, (2) density estimation, (3) clustering via DP mixtures. The mixture representation of Eq. 15 and its stick-breaking form (Eq. 16) are the core of what practitioners fit.

## Main Content

> [!definition] Finite model whose limit is the DP mixture (Teh Eq. 1)
> $$
> \pi\mid\alpha\sim\text{Dir}(\tfrac\alpha K,\dots,\tfrac\alpha K),\ \theta_k^*\mid H\sim H,\ z_i\mid\pi\sim\text{Mult}(\pi),\ x_i\mid z_i\sim F(\theta^*_{z_i}).
> $$
> For large $K$ the number of components used by $n$ items is approximately $O(\alpha\log n)$ independent of $K$, so the model is well defined as $K\to\infty$ (an "infinite mixture").

^def-finite-dirichlet-mixture

> [!definition] DP mixture model (Teh Eqs. 15-16)
> $$
> x_i\mid\theta_i\sim F(\theta_i),\ \theta_i\mid G\sim G,\ G\mid\alpha,H\sim\text{DP}(\alpha,H);
> $$
> equivalently $\pi\sim\text{GEM}(\alpha)$, $\theta_k^*\sim H$, $z_i\mid\pi\sim\text{Mult}(\pi)$, $x_i\mid z_i,\theta^*\sim F(\theta^*_{z_i})$, with $G=\sum_k\pi_k\delta_{\theta_k^*}$ and $\theta_i=\theta^*_{z_i}$.

^def-dp-mixture

**Applications.**
- *Model validation*: use the parametric model as the DP base measure $H$; if the parametric model fits as well as the DP-relaxed one, there is evidence for validity. The DP supplies a broad comparison class.
- *Density estimation*: $p(x)=\int f(x\mid\theta)G(\theta)\,d\theta$ (Eq. 14) smooths the discrete $G$; this is exactly the DP mixture when $F$ has density $f$.
- *Clustering*: the posterior over $z$ (or the CRP partition) gives clusters; the number of clusters is a posterior quantity. This replaces model averaging over $K$ in a finite mixture.

**Inference.** Teh points to Neal (2000) for MCMC (collapsed Gibbs over the CRP, Algorithms 1-8), and mentions split-merge and auxiliary-variable samplers, sequential Monte Carlo, expectation propagation and variational methods. In PyMC practice, collapsed samplers are not available and NUTS operates on a truncated stick-breaking model (see below).

## Examples
> [!example] Practical checklist for a truncated DP mixture (the E26 / E75 workflow)
> 1. Choose truncation $K$; check posterior leftover mass $\prod_k(1-\beta_k)$ and whether the last components are used (a binding truncation means increase $K$).
> 2. Prior on $\alpha$ (Gamma): the implied prior on the number of clusters is $\alpha(\psi(\alpha+n)-\psi(\alpha))$; simulate it before fitting.
> 3. Do not interpret component labels; they are exchangeable under the prior. Use co-clustering matrices $C_{ij}=P(z_i=z_j\mid\text{data})$ and a point partition (Binder or VI loss) - see [[Concept - Label Switching and Label-Invariant Summaries]].
> 4. Sensitivity: refit with $\alpha$ priors shifted by an order of magnitude and compare posterior $K$ and density estimates. The number of clusters is the least robust output.

^ex-dpm-checklist

## Relevance to marketing measurement
Customer heterogeneity (basket values, response elasticities) is often multimodal; DP mixture random effects are a flexible alternative to a Gaussian prior in a hierarchical model ([[Hierarchical Models]]). They are not a substitute for identification: clusters are descriptive and the inferred $K$ should not be read as a causal number of segments.

## Connections
Vault: [[Monsters and Mixtures]] (finite-mixture pathologies), [[Nonparametric Models Overview]], [[MCMC Basics]], [[Posterior Predictive Checking]] (PPC for density fit). Generalised priors on $K$ (flatter than the DP): [[De Blasi 2015 - Mixture Models and the Prior on the Number of Clusters]].

## See Also
[[Teh 2010 - Stick-Breaking Construction]], [[Teh 2010 - Extensions and Reference Map]]
