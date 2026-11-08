---
title: "Index: Simpson 2016 - Going Off Grid LGCP Inference"
tags:
  - type/index
  - source/ingested
  - topic/spatial-point-processes
parent: "[[../_Index|Point Processes, Spatial Fields and Networks]]"
date_updated: 2026-11-08
concept_count: 5
---

# Simpson 2016 - Going Off Grid LGCP Inference

> [!abstract] Routing Summary
> Full capture of Simpson, Illian, Lindgren, Sorbye and Rue (2016), *Going off grid: Computationally efficient inference for log-Gaussian Cox processes* (Biometrika; arXiv:1111.0641), plus a concept note on Gaussian random fields and kriging (in the cluster folder `Spatial Fields Concept Notes`).
> - Need the paper on one page, motivating PyMC examples E07/E86/E79/E89, section map? -> [[Simpson 2016 - Going Off Grid - Overview]]
> - Need Poisson-process / LGCP likelihood and why lattices are wasteful? -> [[Simpson 2016 - LGCP Likelihood and the Lattice Approximation]]
> - Need the pseudo-Poisson off-grid likelihood (eq. 3-4)? -> [[Simpson 2016 - Off-Grid Poisson-Form Likelihood]]
> - Need Matern/SPDE/GMRF, Neumann boundary? -> [[Simpson 2016 - Matern SPDE and GMRF Representation]]
> - Need convergence rates (Thm 1-2, Cor. A1-A2)? -> [[Simpson 2016 - Convergence Theory]]
> - Need BCI trees, sampling effort, ocean examples? -> [[Simpson 2016 - Examples BCI Sampling Effort and Ocean]]
> - Need kriging / GRF / field-level inference background? -> [[Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| IPP and LGCP likelihood; lattice approximation | [[Simpson 2016 - LGCP Likelihood and the Lattice Approximation]] | definition | none | binning is the dominant lattice error |
| Off-grid Poisson-form likelihood | [[Simpson 2016 - Off-Grid Poisson-Form Likelihood]] | theorem | LGCP | exact point term + quadrature integral |
| Matern SPDE, FEM weights | [[Simpson 2016 - Matern SPDE and GMRF Representation]] | definition | off-grid | $(\kappa^2C+G-B)z\sim N(0,C)$ |
| Convergence | [[Simpson 2016 - Convergence Theory]] | theorem | both | lattice $O(p^{-1})$ vs $O(p^{-2})$ |
| Case studies | [[Simpson 2016 - Examples BCI Sampling Effort and Ocean]] | example | all | 37 s to 24 s with coarsened mesh |
| GRF, kriging, field-level inference | [[Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference]] | concept | SPDE | kriging mean/variance; spectral diagonalisation |

## Notes

- [[Simpson 2016 - Going Off Grid - Overview]] — CONTAINS: question, contributions, motivating examples, Source Map.
- [[Simpson 2016 - LGCP Likelihood and the Lattice Approximation]] — CONTAINS: IPP likelihood, LGCP, lattice GLMM, four criticisms, gridded PyMC HSGP sketch.
- [[Simpson 2016 - Off-Grid Poisson-Form Likelihood]] — CONTAINS: eq. 2-4, quadrature, dual mesh, numerical check code.
- [[Simpson 2016 - Matern SPDE and GMRF Representation]] — CONTAINS: Matern, SPDE, FEM matrices, boundary, meshing.
- [[Simpson 2016 - Convergence Theory]] — CONTAINS: Thm 1-2, A3-A5, Cor. A1-A2, Remark A2.
- [[Simpson 2016 - Examples BCI Sampling Effort and Ocean]] — CONTAINS: Sec. 7 case studies, Sec. 8 discussion.
- [[Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference]] — CONTAINS: concept note, no raw source.

## Sources
[[raw/Simpson 2016 - Going Off Grid LGCP Inference.pdf]] (arXiv:1111.0641v3). LGCP original: Moller, Syversveen & Waagepetersen (1998, Scand. J. Stat.); no legal free copy was retrievable, covered here via Simpson et al.

## See Also
[[Hilbert Space Gaussian Processes]] | [[Gaussian Process Regression]] | [[Spatial Models - BYM]]
