---
title: "Simpson 2016 - Convergence Theory"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/theorem
  - doc/paper
source: "[[raw/Simpson 2016 - Going Off Grid LGCP Inference.pdf]]"
source_location: "Sec. 6 and Appendix A.1-A.5, pp. 8, 16-21"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Simpson 2016 - Going Off Grid LGCP Inference"
doc_type: paper
depends_on:
  - "[[Simpson 2016 - Off-Grid Poisson-Form Likelihood]]"
  - "[[Simpson 2016 - Matern SPDE and GMRF Representation]]"
used_by:
aliases:
  - "LGCP convergence Hellinger"
  - "lattice O(1/p) convergence"
---

# Simpson 2016 - Convergence Theory

> [!summary]
> Two approximations are analysed: the quadrature in the likelihood (Thm 1: Hellinger error $O(p^{-k})$) and the finite-element field (Thm 2: posterior-expectation error almost $O(h^{1})$). The classical lattice-counts approximation converges only at $O(p^{-1})$ (Cor. A1) while the off-grid likelihood on the same lattice would be $O(p^{-2})$ (Remark A2); with Karhunen-Loeve fields arbitrarily high order is possible (Cor. A2).

## Overview
Posterior distributions are compared in Hellinger distance, following the Bayesian-inverse-problems framework of Stuart (2010), Cotter et al. (2010) and Dashti & Stuart (2011).

## Main Content

> [!theorem] Theorem 1 (quadrature error)
> Assume $Z(\cdot)$ has almost surely $k$ square-integrable derivatives, and the $p$-point integration scheme in eq. 3 has deterministic error of order $p^{-k}$. Then the Hellinger distance between the posteriors from the true and approximate likelihoods is $O(p^{-k})$.

^thm-quadrature-error

> [!theorem] Theorem 2 (SPDE approximation)
> Let $\Omega$ be a convex polygon in $\mathbb R^2$, $h$ the maximum mesh edge length, $Z$ solving eq. 5 with $\alpha=2$, $G$ uniformly Lipschitz. Then the error in the posterior expectation $\mathbb E\{G(Z)\mid y\}$ due to the SPDE (finite-element) approximation is $O(h^{1-\epsilon})$ for any $\epsilon>0$.

^thm-spde-weak-convergence

Appendix structure:
- **A.1 Likelihood approximation** (Thm A3): general bound for fixed Gaussian field on a Lipschitz domain: $|\Phi(Z)-\Phi^p(Z)|\le C\|Y\|\psi(p)\|Z\|_{H^\gamma}$, then Hellinger bound via Thm 2.4 of Cotter et al. (2010).
- **Corollary A1** (lattice): for $\alpha\ge2$ the $(p+1)\times(p+1)$ lattice approximation converges in Hellinger distance at rate $O(p^{-1})$. Proof idea: midpoint rule integral is $O(p^{-\gamma})$, $d/2<\gamma\le2$, but approximating $Z(s_k)$ by the cell centroid value costs $|Z(s_k)-Z(\tilde s_{ij})|\le Cp^{-1}\|Z\|_{H^{1+d/2}}$ by Taylor and Sobolev embedding, dominating.
- **Remark A2**: with eq. 3 on the same lattice the rate is $O(p^{-2})$ for smooth fields.
- **A.2-A.4**: extension of Dashti & Stuart (2011) Thm 2.6 to finite-dimensional approximations (Thm A4) and proof of Thm 2 via finite-element results (Thm A5).
- **A.5 Higher order**: truncated Karhunen-Loeve expansion of $(\kappa^2-\Delta)^{-\alpha/2}$ eigenfunctions with tensor Gaussian quadrature; **Corollary A2**: error $e_G\le CN^{-t}$ for all $t<\alpha-d/2$ (arbitrarily high order for smooth fields).

Caveat: results hold for fixed hyperparameters; effect of approximating $\kappa,\tau$ is open.

## Examples
Conceptual: if binning costs $O(p^{-1})$, halving the error needs doubling $p$ (4x cells in 2-D), versus 2x cells... for $O(p^{-2})$ halving error needs $\sqrt2p$ (2x cells). Numerics are not tabulated in the paper.

## Connections
Why HSGP-style models (spectral truncation) are efficient: Cor. A2 is the Karhunen-Loeve/spectral analogue ([[Hilbert Space Gaussian Processes]]).

## See Also
[[Simpson 2016 - Going Off Grid - Overview]]
