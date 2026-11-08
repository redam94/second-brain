---
title: "Simpson 2016 - LGCP Likelihood and the Lattice Approximation"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/definition
  - doc/paper
source: "[[raw/Simpson 2016 - Going Off Grid LGCP Inference.pdf]]"
source_location: "Sec. 1-3, pp. 2-4"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Simpson 2016 - Going Off Grid LGCP Inference"
doc_type: paper
depends_on:
used_by:
  - "[[Simpson 2016 - Off-Grid Poisson-Form Likelihood]]"
  - "[[Simpson 2016 - Going Off Grid - Overview]]"
aliases:
  - "Poisson process likelihood"
  - "log-Gaussian Cox process"
  - "gridded LGCP likelihood"
---

# Simpson 2016 - LGCP Likelihood and the Lattice Approximation

> [!summary]
> An inhomogeneous Poisson process has likelihood $\exp\{|\Omega|-\int\lambda\}\prod\lambda(s_i)$; an LGCP puts $\log\lambda=Z$, a Gaussian random field. The classical fit bins points into lattice cells with independent Poisson counts, which is a valid GLMM but wasteful because the grid must be fine enough to resolve *point locations*, not just the field.

## Overview
Point data arise in ecology, biology and economics; MCMC for Cox processes is hard to tune, so INLA on a lattice (Illian et al. 2012) became popular. Simpson et al. argue the lattice plays two roles and the second is unnatural.

## Main Content

> [!definition] Inhomogeneous Poisson process likelihood (eq. 1)
> On bounded $\Omega\subset\mathbb R^2$ with intensity surface $\lambda(s)$, $N(D)\sim\text{Poisson}(\Lambda(D))$, $\Lambda(D)=\int_D\lambda(s)ds$, and for a pattern $Y=\{s_i\}$
> $$
> \pi(Y\mid\lambda)=\exp\Big\{|\Omega|-\int_\Omega\lambda(s)\,ds\Big\}\prod_{s_i\in Y}\lambda(s_i).
> $$

^def-ipp-likelihood

> [!definition] Log-Gaussian Cox process (LGCP)
> A Cox (doubly stochastic Poisson) process with $\log\lambda(s)=Z(s)$, $Z$ a Gaussian random field; conditional on $Z$ it is an inhomogeneous Poisson process. It models aggregation caused by observed or unobserved environmental variation and is a latent Gaussian model, so INLA applies. Log-likelihood given $Z$: $|\Omega|-\int_\Omega e^{Z(s)}ds+\sum_{i=1}^NZ(s_i)$.

^def-lgcp

> [!definition] Lattice (counts-in-cells) approximation
> Partition $\Omega$ into cells $s_{ij}$; counts $N_{ij}\sim\text{Po}(\Lambda_{ij})$ independent given $Z$, with $\Lambda_{ij}=\int_{s_{ij}}\lambda\approx|s_{ij}|\exp(z_{ij})$. This is a GLMM and converges as cell size $\to0$ (Waagepetersen 2004; Corollary A1).

^def-lattice-approx

Why wasteful: (a) a dense covariance for $z$ limits lattice size; block-Toeplitz tricks (Moller et al. 1998) break under second-order approximations (manifold MCMC, INLA); (b) CAR models are fast but need regular lattices and are hard to make resolution-consistent on irregular ones; (c) binning is the *dominant* error (Corollary A1 gives only $O(p^{-1})$), so the grid must be much finer than the field needs; (d) no local refinement: unsampled regions (Sec. 7.3) cost as much as sampled ones.

## Examples

> [!example] Gridded LGCP likelihood as used in PyMC practice
> The gridded likelihood is exactly what E07/E86-style PyMC models use with a Hilbert-space GP: counts per cell $y_c\sim\text{Poisson}(A_c\exp(f_c))$.

Untested PyMC 5 sketch (2-D HSGP via `pm.gp.HSGP`):
```python
import numpy as np, pymc as pm
# y: counts per grid cell (n_cells,), X: cell centres (n_cells, 2), A: cell areas
with pm.Model():
    mu = pm.Normal("mu", 0, 2)
    ell = pm.Gamma("ell", 3, 3 / 0.2); eta = pm.Exponential("eta", 1)
    cov = eta**2 * pm.gp.cov.Matern32(2, ls=ell)
    gp = pm.gp.HSGP(m=[20, 20], c=1.5, cov_func=cov)
    f = gp.prior("f", X=X)
    pm.Poisson("y", mu=A * pm.math.exp(mu + f), observed=y)   # counts-in-cells
```
Pitfall (E07): exp-link makes tails heavy; use tight priors on $\eta$ ("taming priors behind an exp link"). Read [[Hilbert Space Gaussian Processes]] for the basis details.

## Connections
[[Simpson 2016 - Off-Grid Poisson-Form Likelihood]] removes the binning; [[Simpson 2016 - Convergence Theory]] quantifies the error.

## See Also
[[Simpson 2016 - Going Off Grid - Overview]]
