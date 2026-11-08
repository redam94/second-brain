---
title: "Simpson 2016 - Matern SPDE and GMRF Representation"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/definition
  - doc/paper
source: "[[raw/Simpson 2016 - Going Off Grid LGCP Inference.pdf]]"
source_location: "Sec. 5, pp. 6-8, eq. 5-6, Fig. 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Simpson 2016 - Going Off Grid LGCP Inference"
doc_type: paper
depends_on:
  - "[[Simpson 2016 - Off-Grid Poisson-Form Likelihood]]"
used_by:
  - "[[Simpson 2016 - Convergence Theory]]"
  - "[[Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference]]"
aliases:
  - "Matern SPDE"
  - "Lindgren SPDE approach"
  - "Whittle SPDE"
---

# Simpson 2016 - Matern SPDE and GMRF Representation

> [!summary]
> Matern Gaussian fields with $\nu+d/2$ integer are stationary solutions of $\tau(\kappa^2-\Delta)^{\alpha/2}Z=W$. A finite-element discretisation on a triangulation gives sparse precision matrices (a Gaussian Markov random field); for $\alpha=2$ the weights satisfy $(\kappa^2C+G-B)z\sim N(0,C)$. Neumann boundary conditions ($B=0$) inflate variance near the boundary.

## Overview
The SPDE approach (Lindgren, Rue & Lindstrom 2011) provides the basis $\phi_i$ and joint law of $z$ used in the off-grid likelihood. It reproduces classical CAR models on a regular lattice (Whittle 1954, 1963: second-order CAR converges to Matern with $\nu=1$).

## Main Content

> [!definition] Matern covariance (Sec. 5)
> For $h\ge0$,
> $$
> c(h)=\frac{1}{\Gamma(\nu+d/2)(4\pi)^{d/2}\,2^{\nu-1}\,\kappa^{2\nu}\tau^2}\,(\kappa h)^{\nu}K_\nu(\kappa h),
> $$
> $K_\nu$ the modified Bessel function of the second kind, $\nu>0$ smoothness, $\kappa>0$ inverse range, $\tau$ scale; the normalisation is chosen to match the SPDE (5). Equivalently $c(h)=\sigma^2\frac{2^{1-\nu}}{\Gamma(\nu)}(\kappa h)^\nu K_\nu(\kappa h)$ with marginal variance $\sigma^2=\Gamma(\nu)/\{\Gamma(\nu+d/2)(4\pi)^{d/2}\kappa^{2\nu}\tau^2\}$.

^def-matern-covariance

> [!definition] SPDE representation (eq. 5)
> $\tau(\kappa^2-\Delta)^{\alpha/2}Z(s)=W(s)$, with $\alpha=\nu+d/2$ (the printed text says $\alpha=\nu-d/2$, apparently a typo; the consistent relation is $\nu=\alpha-d/2$), $\Delta=\sum_i\partial^2/\partial s_i^2$, $W$ spatial white noise.

^def-spde

> [!theorem] Finite-element weights for $\alpha=2$ (eq. 6)
> Piecewise linear $\phi_i$ on a triangular mesh: $(\kappa^2C+G-B)z\sim N(0,C)$, with sparse $C_{ii}=\int_\Omega\phi_i$ (diagonal, lumped), $G_{ij}=\int_\Omega\nabla\phi_i\cdot\nabla\phi_j$, $B_{ij}=\int_{\partial\Omega}\phi_i\,\partial_n\phi_j$. The matrix $\kappa^2C+G$ is sparse, so $z$ is a GMRF (for $\alpha=2$ the precision is $Q=(\kappa^2C+G)C^{-1}(\kappa^2C+G)$, still sparse); computation scales with sparsity not with $n^3$.

^thm-spde-fem

Details:
- Boundary: set $B=0$ (Neumann, no flux); this approximately **doubles the variance** near the boundary (Lindgren et al. 2011, Thm 1). Dirichlet conditions (fixed value) *reduce* it. Boundary modelling in point-process work is barely studied (Wood et al. 2008 for smoothing).
- Meshing: regular triangulation, refined where points are dense; coarser in unsampled regions but with gradual size transition, and keep nodes inside holes so the field behaves.
- Extensions: non-stationary, anisotropic, multivariate, spatio-temporal (Cameletti 2013; Fuglstad 2015).
- Priors: independent $N(0,100)$ on $\log\kappa,\log\tau$ in all examples.

## Examples

> [!example] Matern correlation values
> $\nu=1/2$ gives the exponential kernel $e^{-\kappa h}$; $\nu=3/2$: $(1+\kappa h)e^{-\kappa h}$ (many software packages instead use $\sqrt{2\nu}\,h/\ell$).

```python
import numpy as np
from scipy.special import kv, gamma
def matern(h, nu, kappa, sigma2=1.0):
    h = np.maximum(h, 1e-12); x = kappa*h
    return sigma2*(2**(1-nu)/gamma(nu))*x**nu*kv(nu, x)
h = np.array([0.1, 1., 3.]); print(matern(h, .5, 1.), np.exp(-h))              # nu=1/2 equals exponential
print(matern(h, 1.5, 1.), (1+h)*np.exp(-h))                                   
```
(Both pairs agree: with $x=\kappa h$ the Matern-3/2 correlation is $(1+x)e^{-x}$.)

## Connections
- Link to HSGP: both are finite-basis GPs; HSGP uses Laplacian eigenfunctions with spectral weights ([[Hilbert Space Gaussian Processes]]).
- General GRF background: [[Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference]]; GMRF/ICAR relation: [[Spatial Models - BYM]].

## See Also
[[Simpson 2016 - Going Off Grid - Overview]]
