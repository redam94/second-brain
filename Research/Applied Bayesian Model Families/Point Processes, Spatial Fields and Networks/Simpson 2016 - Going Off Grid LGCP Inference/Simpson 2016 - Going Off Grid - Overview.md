---
title: "Simpson 2016 - Going Off Grid - Overview"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/overview
  - doc/paper
source: "[[raw/Simpson 2016 - Going Off Grid LGCP Inference.pdf]]"
source_location: "Whole paper incl. Appendix, pp. 1-22 (Biometrika 2016, arXiv v3)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Simpson 2016 - Going Off Grid LGCP Inference"
doc_type: paper
depends_on:
  - "[[Simpson 2016 - LGCP Likelihood and the Lattice Approximation]]"
used_by:
  - "[[Simpson 2016 - Going Off Grid LGCP Inference/_Index|Simpson 2016 - Going Off Grid LGCP Inference]]"
aliases:
  - "Going off grid"
  - "Simpson Illian Lindgren Sorbye Rue 2016"
---

# Simpson 2016 - Going Off Grid - Overview

> [!summary]
> Simpson, Illian, Lindgren, Sorbye and Rue (Biometrika 2016) show how to fit log-Gaussian Cox processes (LGCPs) without binning points to a fine lattice: represent the latent field with a finite basis $Z(s)=\sum_iz_i\phi_i(s)$ (SPDE/Matern on a triangulation), approximate only the intensity integral by a quadrature rule, and obtain an exact-in-the-points Poisson-form likelihood. A lattice of $p\times p$ cells converges only at $O(p^{-1})$ because of point binning, whereas the off-grid scheme can converge at high order.

## Overview
**Question.** How can LGCPs (Moller, Syversveen & Waagepetersen 1998) be fitted on awkward domains (holes, coastlines, a sphere) without wasting computation on a fine lattice?

**Contributions.** (i) Likelihood approximation (eq. 3-4) separating field specification from likelihood approximation; (ii) Hellinger-convergence theory (Thm 1, A3, Cor. A1) and weak convergence of the SPDE posterior (Thm 2); (iii) examples: BCI rainforest, variable sampling effort, ocean point process; (iv) INLA implementation (R-INLA).

### Motivating PyMC examples
Example list: <https://redam94.github.io/pymc-challenges/examples.html>
- **E07** - Geo-temporal: induced earthquakes in Oklahoma (LGCP, 2-D HSGP, space-time interaction, exp link, hold-out forecast).
- **E86** - GPU ensembles: ChEES-HMC and MEADS on 20,000 cells, Barro Colorado Island *Beilschmiedia pendula* (3,604 trees; LGCP with four latent fields on a Kronecker HSGP basis, spatially varying effects). The same BCI plot is Simpson's Sec. 7.2 case study.
- **E79** - CMB field-level inference (Gaussian random fields; see [[Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference]]).
- **E89** - Where should the next air monitors go? (Matern GP, kriging-style conditionals; same concept note).

### Source Map

| Paper section | Covered in |
|---|---|
| Summary, 1 Introduction | this note; [[Simpson 2016 - LGCP Likelihood and the Lattice Approximation]] |
| 2 Log-Gaussian Cox processes (eq. 1) | [[Simpson 2016 - LGCP Likelihood and the Lattice Approximation]] |
| 3 Computation on fine lattices is wasteful | [[Simpson 2016 - LGCP Likelihood and the Lattice Approximation]] |
| 4 Finite-dimensional field, eq. 2-4 | [[Simpson 2016 - Off-Grid Poisson-Form Likelihood]] |
| 5 SPDE and Markov random fields, eq. 5-6, Fig. 1 dual mesh | [[Simpson 2016 - Matern SPDE and GMRF Representation]] |
| 6 Convergence, Thm 1-2 | [[Simpson 2016 - Convergence Theory]] |
| 7.1-7.4 Examples, Figs. 2-8 | [[Simpson 2016 - Examples BCI Sampling Effort and Ocean]] |
| 8 Discussion | [[Simpson 2016 - Examples BCI Sampling Effort and Ocean]] |
| Appendix A.1-A.5 (Thm A3-A5, Cor. A1-A2) | [[Simpson 2016 - Convergence Theory]] |

## Examples
Worked in [[Simpson 2016 - Examples BCI Sampling Effort and Ocean]] and [[Simpson 2016 - Off-Grid Poisson-Form Likelihood]].

## Connections
- Relevance to marketing measurement: LGCPs are a natural geo-event model (store visits, outages, app events) when you need intensity surfaces rather than aggregated geo counts; "sampling effort" $S(s)$ plays the role of exposure or offset. The idea that only the integral needs quadrature carries over to any Poisson likelihood with a latent smooth function (e.g. continuous-time seasonality in MMM).
- Existing vault: [[Hilbert Space Gaussian Processes]] (the basis route used in PyMC E07/E86), [[Gaussian Process Regression]], [[Spatial Models - BYM]], [[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview]] (contrast: history-dependent intensity).

## See Also
[[Simpson 2016 - Going Off Grid LGCP Inference/_Index|Simpson 2016 - Going Off Grid LGCP Inference]]
