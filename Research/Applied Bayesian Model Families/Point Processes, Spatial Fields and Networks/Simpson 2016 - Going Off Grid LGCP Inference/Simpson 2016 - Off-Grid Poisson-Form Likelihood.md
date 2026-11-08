---
title: "Simpson 2016 - Off-Grid Poisson-Form Likelihood"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/theorem
  - doc/paper
source: "[[raw/Simpson 2016 - Going Off Grid LGCP Inference.pdf]]"
source_location: "Sec. 4, pp. 4-6, eq. 2-4"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Simpson 2016 - Going Off Grid LGCP Inference"
doc_type: paper
depends_on:
  - "[[Simpson 2016 - LGCP Likelihood and the Lattice Approximation]]"
used_by:
  - "[[Simpson 2016 - Convergence Theory]]"
  - "[[Simpson 2016 - Examples BCI Sampling Effort and Ocean]]"
aliases:
  - "off-grid LGCP likelihood"
  - "pseudo-Poisson likelihood for LGCP"
---

# Simpson 2016 - Off-Grid Poisson-Form Likelihood

> [!summary]
> With a finite basis $Z(s)=\sum_{j}z_j\phi_j(s)$, the LGCP log-likelihood becomes $C-\tilde\alpha^\top\exp(A_1z)+\mathbf 1^\top A_2z$: the sum over points is *exact* and only the integral needs a $p$-node quadrature. This is the log-likelihood of $N+p$ independent Poisson variables with pseudo-observations, so it fits standard latent-Gaussian machinery (INLA).

## Overview
The key idea is to separate (i) the Gaussian field model and (ii) the likelihood approximation.

## Main Content

> [!definition] Finite-dimensional field (eq. 2)
> $Z(s)=\sum_{i=1}^nz_i\phi_i(s)$, $z$ multivariate Gaussian, $\{\phi_i\}$ linearly independent deterministic basis functions. Special cases: process convolution (Higdon 1998), predictive processes (Banerjee et al. 2008) and fixed-rank kriging (Cressie & Johannesson 2008) with correlated weights, and SPDE models (Lindgren et al. 2011) with compactly supported piecewise-linear $\phi_i$.

^def-finite-dim-field

> [!theorem] Poisson-form likelihood (eq. 3-4)
> For a quadrature rule $\int_\Omega f\approx\sum_{i=1}^p\tilde\alpha_if(\tilde s_i)$,
> $$\log\pi(y\mid z)\approx C-\tilde\alpha^\top\exp(A_1z)+\mathbf 1^\top A_2z,\quad [A_1]_{ij}=\phi_j(\tilde s_i),\ [A_2]_{ij}=\phi_j(s_i).$$
> Define $\log\eta=(z^\top A_1^\top,z^\top A_2^\top)^\top$, $\alpha=(\tilde\alpha^\top,0_N^\top)^\top$ and pseudo-observations $y=(0_p^\top,1_N^\top)^\top$. Then $\pi(y\mid z)\approx C\prod_{i=1}^{N+p}\eta_i^{y_i}e^{-\alpha_i\eta_i}$: $N+p$ conditionally independent Poisson variables with means $\alpha_i\eta_i$.

^thm-poisson-form-likelihood

*Why.* The term $\sum_iZ(s_i)=\mathbf 1^\top A_2z$ is exact because $Z$ is continuous; the integral $\int e^Z$ is replaced by a weighted sum of $e^{Z(\tilde s_i)}$. Weight-zero pseudo-points give $\eta_i^{1}$ factors (the $\prod\lambda(s_i)$ term). Related to Baddeley & Turner (2000), who used one point per cell for pseudo-likelihoods; here the integration scheme is designed carefully (Thm 1: error governed by quadrature order).

Integration scheme on a triangular mesh: dual-cell midpoint rule (nodes, weights $\tilde\alpha_i=|V_i|$ the dual cell volumes; second order on a regular grid, first order on irregular meshes), or Gaussian rules per triangle.

## Examples

> [!example] Numerical check of eq. 3 on a 1-D LGCP
> Setup: domain $[0,1]$, piecewise-linear hat basis on $n$ nodes, quadrature = trapezoid with $p=200$ nodes. The code shows that the exact data term plus quadrature integral reproduces the Poisson-form likelihood.

```python
import numpy as np
rng = np.random.default_rng(0)
n = 15; nodes = np.linspace(0, 1, n); z = rng.normal(0, 1, n).cumsum() * 0.3
phi = lambda s: np.maximum(0, 1 - np.abs(s[:, None] - nodes[None, :]) * (n - 1))   # hat functions
Z = lambda s: phi(s) @ z
pts = np.sort(rng.uniform(0, 1, 12))                 # observed points
sq = np.linspace(0, 1, 200); w = np.full(200, 1 / 199); w[[0, -1]] /= 2   # trapezoid
A1, A2 = phi(sq), phi(pts)
ll_direct = -(w * np.exp(Z(sq))).sum() + Z(pts).sum()
eta = np.concatenate([np.exp(A1 @ z), np.exp(A2 @ z)]); alpha = np.concatenate([w, np.zeros(len(pts))])
y = np.concatenate([np.zeros(len(sq)), np.ones(len(pts))])
ll_pois = (y * np.log(eta) - alpha * eta).sum()
print(ll_direct, ll_pois)   # identical
```
In PyMC: pass pseudo-data to `pm.Poisson(mu=alpha*eta, observed=y)`, equivalent to `pm.Potential` with the explicit form.

## Connections
- [[Simpson 2016 - Matern SPDE and GMRF Representation]] supplies $\phi_i$, $Q$.
- [[Simpson 2016 - Convergence Theory]] gives Hellinger rates.
- The same trick (point evaluation matrix + quadrature matrix) is how HSGP LGCPs avoid gridding ([[Hilbert Space Gaussian Processes]]).

## See Also
[[Simpson 2016 - Going Off Grid - Overview]]
