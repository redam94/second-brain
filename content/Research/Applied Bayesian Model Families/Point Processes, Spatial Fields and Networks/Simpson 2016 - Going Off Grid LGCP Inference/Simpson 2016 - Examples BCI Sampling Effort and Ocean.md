---
title: "Simpson 2016 - Examples BCI Sampling Effort and Ocean"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/example
  - doc/paper
source: "[[raw/Simpson 2016 - Going Off Grid LGCP Inference.pdf]]"
source_location: "Sec. 7-8, pp. 8-14, Figs. 2-8"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Simpson 2016 - Going Off Grid LGCP Inference"
doc_type: paper
depends_on:
  - "[[Simpson 2016 - Off-Grid Poisson-Form Likelihood]]"
used_by:
aliases:
  - "Barro Colorado Island LGCP"
  - "LGCP with sampling effort"
  - "ocean point process"
---

# Simpson 2016 - Examples BCI Sampling Effort and Ocean

> [!summary]
> Three INLA/R-INLA case studies: (1) 4,294 *Protium tenuifolium* trees on Barro Colorado Island with a soil-phosphorus covariate (SPDE vs lattice, both about 25 s); (2) simulated LGCP with an unsampled hole handled by $\lambda(s)=S(s)e^{Z(s)}$ and a coarsened mesh (37 s to 24 s); (3) 913-point LGCP on the world's oceans with Neumann boundaries.

## Overview
All use $\alpha=2$, independent $N(0,100)$ priors on $\log\kappa,\log\tau$ unless stated.

## Main Content

### 7.2 Rainforest (BCI) vs lattice
50 ha plot, 319 species; 4,294 *Protium tenuifolium*. Latent field $Z(s)=\mu+\beta P(s)+x(s)$, $P$ = soil phosphorus on an interpolated grid, $x$ an approximately intrinsic SPDE field with $\kappa=0.0014$ (range far larger than the domain), vague prior on $\log\tau$ (variance 1000). Lattice comparison: intrinsic 2nd-order CAR, $\tau\sim\text{Ga}(1,10^{-5})$. **Both took about 25 s**; posterior mean spatial effects (Fig. 3) are centred at the same location; differences attributed to different priors and precisions. Posterior of the phosphorus effect: Fig. 2(b). (Same BCI plot as PyMC E86.)

### 7.3 Variable sampling effort
> [!definition] Sampling effort model (Chakraborty et al. 2011)
> $\lambda(s)=S(s)\exp\{Z(s)\}$, $S$ known effort; here $S=0$ in an unsampled rectangle and 1 elsewhere, so the hole drops out of the integral in eq. 1.

^def-sampling-effort

Simulation: LGCP on $[-1,1]^2$, points removed in $[-0.5,0.4]\times[-0.1,0.4]$. Posterior means from full vs censored data agree outside the hole (Fig. 5). Regular lattice mesh 4,225 nodes vs irregular coarsened mesh 3,850 nodes: marginals extremely similar; time **37 s vs 24 s (35% reduction by coarsening 11% of the mesh)** on a 2.2 GHz i7 laptop. Keep nodes inside the hole and grade mesh size smoothly.

### 7.4 Ocean point process
Non-convex, multiply connected region on a sphere; Neumann conditions roughly double variance near coasts (justified for freak-wave risk, defined relative to expected wave height). 913 simulated points; posterior mean reproduces large-scale features (Fig. 7); posterior sd is higher near coasts and high-curvature coastlines (Gulf of Carpentaria, North Sea; Fig. 8a); exceedance map $\Pr\{\log\lambda(s)>5.5\mid y\}$ (Fig. 8b) via `inla.pmarginal` (joint maps: `excursions`).

### 8 Discussion
Method works with kernel/predictive-process/fixed-rank bases, but their non-local bases make $A_i$ dense. Open: boundary models, theory for hyperparameters and for basis choice (Stein 2014); non-Gaussian fields (Laplace/Levy-driven; Poisson-driven shot-noise Cox processes).

## Examples

> [!example] Exposure/sampling-effort offset in PyMC
> Untested: `pm.Poisson("y", mu=A*S*pm.math.exp(mu+f), observed=y)` with `S` = 0 in unobserved cells (they then contribute no likelihood but the GP still interpolates).

Marketing analogue: `S` = ad impressions or store-hours exposure when mapping event intensity over geography (coverage gaps). Analogy only.

## Connections
[[Simpson 2016 - Off-Grid Poisson-Form Likelihood]]; E86 uses the same BCI plot with a Kronecker HSGP and GPU samplers (see [[Hilbert Space Gaussian Processes]]).

## See Also
[[Simpson 2016 - Going Off Grid - Overview]]
