---
title: "Betancourt 2015 - Riemannian HMC and the SoftAbs Metric"
tags:
  - source/ingested
  - topic/advanced-mcmc
  - type/definition
  - doc/paper
source: "[[raw/Betancourt Girolami 2015 - Hamiltonian Monte Carlo for Hierarchical Models.pdf]]"
source_location: "Sec. III.B, pp. 6-8; Figures 10-11"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Advanced MCMC and Latent Discrete Models/Betancourt Girolami 2015 - HMC for Hierarchical Models"
doc_type: paper
depends_on:
  - "[[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]]"
used_by:
  - "[[Betancourt 2015 - One-Way Normal Experiments and Stan Models]]"
aliases:
  - "RHMC"
  - "SoftAbs metric"
  - "Riemannian Hamiltonian Monte Carlo"
---

# Betancourt 2015 - Riemannian HMC and the SoftAbs Metric

> [!summary]
> Riemannian HMC lets the momentum covariance depend on position, $\pi(p\mid q)=\mathcal N(0,\Sigma(q))$, adding a $\tfrac12\log|\Sigma(q)|$ term that acts as an energy reservoir, so potential-energy variation is no longer capped at $d/2$. A good metric resembles the Hessian; the SoftAbs transformation makes the Hessian positive definite. With it, trajectories span the entire funnel and give nearly independent transitions.

## Overview

Euclidean HMC fails on hierarchies because of limited density variation and step-size sensitivity ([[Betancourt 2015 - Euclidean HMC Weaknesses - Step Size and Density Variation]]). Riemannian HMC (Girolami and Calderhead 2011, ref [21]) fixes both.

## Main Content

> [!definition] Riemannian HMC
> Allow position-dependent covariance: $\pi(p\mid q)=\mathcal N(p\mid0,\Sigma(q))$ with kinetic energy
> $$T(p,q)=\tfrac12p^\top\Sigma^{-1}(q)p+\tfrac12\log|\Sigma(q)|.$$
> The Hamiltonian now generates dynamics on a Riemannian manifold with metric $\Sigma$. The dynamic metric acts as a local correction to the target; if well chosen it compensates position-dependent correlations, reducing computational burden and sensitivity to step size.
^def-rhmc

> [!theorem] The log-determinant energy reservoir
> The term $\tfrac12\log|\Sigma(q)|$ is nominally the normalisation of the momentum density, but it functions as a reservoir that absorbs and releases energy along the trajectory, allowing much larger variations in potential energy (Fig. 10: $V$ is essentially unconstrained in practice even though $V$ variation is still bounded by $T$ variation, because $T$ now varies greatly).
^thm-log-det-reservoir

**Choosing the metric.** To correct position-dependent geometry, the metric should leave the target locally isotropic, which suggests the Hessian of the target. The Hessian itself is not guaranteed positive definite.

> [!definition] SoftAbs metric (ref [22])
> Apply the SoftAbs transformation to the eigenvalues of the Hessian to obtain a smooth, positive-definite metric; it yields a generic and efficient RHMC implementation. (Footnote 4: the Fisher-Rao metric from information geometry is an alternative regulariser, but it regularises by integrating out exactly the correlations needed for effective corrections in hierarchical models.) The paper does not restate the formula; the standard SoftAbs map (Betancourt 2013, arXiv:1212.4693) replaces each Hessian eigenvalue $\lambda$ by $\lambda\coth(\alpha\lambda)$ with a regularisation constant $\alpha$.
^def-softabs

> [!example] Figure 11: funnel exploration
> RHMC with SoftAbs on the 101-dimensional funnel: trajectories sweep the entire funnel and the chain of $v$ (only 100 iterations plotted, compared with 2500 for Figure 7) has mean $0.42$ and standard deviation $2.76$ against the true $(0,3)$: nearly independent transitions and drastically smaller autocorrelations.
^ex-figure11

> [!example] Why $\lambda\coth(\alpha\lambda)$ is positive definite
> For $\lambda\to\pm\infty$, $\lambda\coth(\alpha\lambda)\to|\lambda|$; at $\lambda\to0$, it tends to $1/\alpha$. Hence every eigenvalue maps to a positive number at least $1/\alpha$, behaving like $|\lambda|$ for large curvature. A numpy check:
> ```python
> import numpy as np
> alpha = 1e6
> soft = lambda lam: lam/np.tanh(alpha*lam)
> print(soft(np.array([-5., -1e-3, 1e-3, 5.])))  # ~[5, 1e-3(approx |l|), 1e-3, 5]; no negatives
> ```
^ex-softabs-check

**Cost.** RHMC needs Hessians (second derivatives) and an implicit integrator in general, so it is considerably more expensive per step; the paper notes that RHMC was not run in the Stan benchmarks because its Stan implementation was still under development. In practice (2020s) Stan/PyMC use Euclidean NUTS with reparameterisation.

## Connections

Contrast with ensemble tuning in [[Hoffman 2022 - MEADS - Overview]], which preconditions with marginal standard deviations only. Position-dependent preconditioning of the same kind appears in normalizing-flow-adapted NUTS (E12, [[Stochastic Volatility and the Inference Frontier]]).

## See Also
[[Betancourt 2015 - HMC for Hierarchical Models - Overview]], [[Efficient MCMC]]
