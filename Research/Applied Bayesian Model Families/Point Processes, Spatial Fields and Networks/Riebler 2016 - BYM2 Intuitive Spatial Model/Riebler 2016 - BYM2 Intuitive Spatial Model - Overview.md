---
title: "Riebler 2016 - BYM2 Intuitive Spatial Model - Overview"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/overview
  - doc/paper
source: "[[raw/Riebler 2016 - BYM2 An Intuitive Bayesian Spatial Model for Disease Mapping.pdf]]"
source_location: "Whole paper incl. Appendices, pp. 1-24 (arXiv:1601.01180)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Riebler 2016 - BYM2 Intuitive Spatial Model"
doc_type: paper
depends_on:
  - "[[Riebler 2016 - Classical Disease Mapping Models Besag BYM Leroux Dean]]"
used_by:
  - "[[Riebler 2016 - BYM2 Intuitive Spatial Model/_Index|Riebler 2016 - BYM2 Intuitive Spatial Model]]"
aliases:
  - "Riebler et al 2016"
  - "BYM2 paper"
---

# Riebler 2016 - BYM2 Intuitive Spatial Model - Overview

> [!summary]
> Riebler, Sorbye, Simpson and Rue (2016, *Statistical Methods in Medical Research*; arXiv:1601.01180) explain and test the **BYM2** parameterisation of the Besag-York-Mollie disease-mapping model: $b=\tau_b^{-1/2}(\sqrt{1-\phi}\,v+\sqrt\phi\,u^\star)$ with a **scaled** structured component $u^\star$. Then $\tau_b$ is a marginal precision independent of the graph, $\phi$ is the share of variance that is spatial, and penalised-complexity (PC) priors give both interpretable, transferable hyperpriors. Only the scaling/PC part is covered here; for ICAR/BYM basics see [[Spatial Models - BYM]].

## Overview
**Problem.** In BYM the structured and unstructured effects are confounded and the precisions $\tau_u,\tau_v$ live on different scales; Leroux and Dean mixing parameterisations fix the allocation but leave the precision unscaled, so a prior on $\tau_b$ means different things on different maps, and common gamma priors overfit (no mass at the base model).

**Contribution.** A systematic study of BYM2 (Simpson et al. 2017 proposal): scaling the Besag precision so the geometric mean of marginal variances is 1; a sparsity-preserving augmented parameterisation; PC priors for $(\tau_b,\phi)$; simulation on the 366-district Sardinia graph (200 datasets x 9 scenarios) and an IDDM application (619 cases).

### Motivating PyMC examples
<https://redam94.github.io/pymc-challenges/examples.html>: **E18** - Areal models on a graph: ICAR, proper CAR, BYM2 (Scottish lip cancer, 56 districts; graph Laplacian and BYM2 scaling factor, `pm.ICAR`/`pm.CAR`, Moran's I, exceedance maps, PSIS-LOO vs K-fold, spatial confounding).

### Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction | this note |
| 2 Disease mapping (Poisson likelihood, SMR, $\eta_i=\mu+z_i^\top\beta+b_i$) | [[Riebler 2016 - Classical Disease Mapping Models Besag BYM Leroux Dean]] |
| 3.1 Besag, BYM, Leroux, Dean | [[Riebler 2016 - Classical Disease Mapping Models Besag BYM Leroux Dean]] |
| 3.2 Why scaling (Fig. 1, eq. 6) | [[Riebler 2016 - Scaling and the BYM2 Construction]] |
| 3.3-3.4 BYM2, sparse parameterisation | [[Riebler 2016 - Scaling and the BYM2 Construction]] |
| 4 PC priors (eq. 9, Fig. 2) | [[Riebler 2016 - Penalised Complexity Priors for BYM2]] |
| 5.1 Simulation study, Tables 1-2 | [[Riebler 2016 - Simulation Study and Sardinia IDDM Application]] |
| 5.2 Sardinia IDDM, Table 3, Figs. 3-4 | [[Riebler 2016 - Simulation Study and Sardinia IDDM Application]] |
| 6 Discussion | [[Riebler 2016 - Simulation Study and Sardinia IDDM Application]] |
| Appendix A (extra figs/Table 4), B (INLA code), C (PC derivation) | [[Riebler 2016 - Penalised Complexity Priors for BYM2]], [[Riebler 2016 - Simulation Study and Sardinia IDDM Application]] |

## Examples
Worked scaling-factor and PC-prior code in [[Riebler 2016 - Scaling and the BYM2 Construction]] and [[Riebler 2016 - Penalised Complexity Priors for BYM2]].

## Connections
- Relevance to marketing measurement: BYM2 is the principled way to smooth noisy geo-level (DMA, state, county) outcomes or effects over adjacency while keeping an interpretable "how spatial is it" parameter $\phi$; this is useful for geo-experiment readouts and geo-level MMM random effects (analogy; not covered by the paper). See [[Hierarchical Models]] for partial pooling and [[Spatial Models - BYM]].
- Related field-based route: [[Simpson 2016 - Going Off Grid - Overview]] (continuous Matern fields) and [[Hilbert Space Gaussian Processes]].

## See Also
[[Riebler 2016 - BYM2 Intuitive Spatial Model/_Index|Riebler 2016 - BYM2 Intuitive Spatial Model]]
