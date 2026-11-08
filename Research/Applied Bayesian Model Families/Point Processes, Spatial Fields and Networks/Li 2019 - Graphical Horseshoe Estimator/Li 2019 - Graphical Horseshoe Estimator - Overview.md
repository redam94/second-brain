---
title: "Li 2019 - Graphical Horseshoe Estimator - Overview"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/overview
  - doc/paper
source: "[[raw/Li 2019 - The Graphical Horseshoe Estimator.pdf]]"
source_location: "Whole paper incl. supplement, pp. 1-38 (arXiv:1707.06661v3; Journal of Multivariate Analysis 2019)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Li 2019 - Graphical Horseshoe Estimator"
doc_type: paper
depends_on:
  - "[[Li 2019 - Graphical Horseshoe Model and Gibbs Sampler]]"
used_by:
  - "[[Li 2019 - Graphical Horseshoe Estimator/_Index|Li 2019 - Graphical Horseshoe Estimator]]"
aliases:
  - "Li Craig Bhadra 2019"
  - "graphical horseshoe overview"
---

# Li 2019 - Graphical Horseshoe Estimator - Overview

> [!summary]
> Li, Craig and Bhadra (2019) place horseshoe priors on the off-diagonal entries of a Gaussian precision matrix $\Omega$ (diagonal flat, $\Omega$ positive definite) and give a full block Gibbs sampler. Theory: a smaller Kullback-Leibler risk upper bound than priors with bounded density at zero when $\Omega_0$ is sparse (Thm 3.2), and a posterior mean within $O(1/|\hat\omega|)$ of least squares for large entries, unlike the Bayesian graphical lasso (Thm 4.1). Simulations ($p\in\{100,200\}$, $n\in\{50,120\}$) show the smallest Stein loss and Frobenius error in most settings, with low false-positive rates.

## Overview
**Question.** Estimate a sparse $p\times p$ precision matrix (Gaussian graphical model, GGM) in high dimension with small error in non-zero entries and good adaptation to sparsity.

**Contribution.** Prior, sampler, KL-risk and bias theory, simulation comparison to graphical lasso (GL), graphical SCAD (GSCAD) and Bayesian graphical lasso (BGL), human gene expression network (CEU, 100 genes, 60 people).

### Motivating PyMC examples
<https://redam94.github.io/pymc-challenges/examples.html>: **E19** - Learning a graph: Bayesian Gaussian graphical models (Sachs et al. 2005 flow cytometry, 11 phosphoproteins; marginal vs partial correlation, `LKJCholeskyCov`, "why a horseshoe on the precision matrix leaves the positive-definite cone", Bayesian neighbourhood selection with a node-wise horseshoe, AND/OR rules). See also [[Bayesian Gaussian Graphical Models - G-Wishart and Neighbourhood Selection]].

### Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction, 1.1 GL, GSCAD, BGL | [[Li 2019 - Graphical Horseshoe Model and Gibbs Sampler]] |
| 2.1 Hierarchical model | [[Li 2019 - Graphical Horseshoe Model and Gibbs Sampler]] |
| 2.2 Block Gibbs sampler, Algorithm 1 | [[Li 2019 - Graphical Horseshoe Model and Gibbs Sampler]] |
| 3 Kullback-Leibler risk bounds, Lemma 3.1, Thm 3.2 | [[Li 2019 - Kullback-Leibler Risk Bound and Bias Theory]] |
| 4 Bias, Thm 4.1 | [[Li 2019 - Kullback-Leibler Risk Bound and Bias Theory]] |
| 5 Simulations, Tables 1-3 | [[Li 2019 - Simulation Study and Gene Expression Application]] |
| 6 Human gene expression | [[Li 2019 - Simulation Study and Gene Expression Application]] |
| 7 Conclusions; Supplement S.1-S.2 (proofs), extra tables | [[Li 2019 - Kullback-Leibler Risk Bound and Bias Theory]], [[Li 2019 - Simulation Study and Gene Expression Application]] |

## Examples
Working Gibbs-sampler code and a small check: [[Li 2019 - Graphical Horseshoe Model and Gibbs Sampler]].

## Connections
- Relevance to marketing measurement: a sparse precision matrix is the right object for conditional dependence among many correlated channels/KPIs (what is related *after* controlling for the others), e.g. residual correlation among channel effects or brand metrics; the horseshoe keeps strong links unshrunk. Analogy only.
- Existing vault: [[Joint Priors and Covariance Matrices]] (LKJ and covariance priors), [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]] and [[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]] (frequentist graphical lasso selection), [[Hierarchical Models]].

## See Also
[[Li 2019 - Graphical Horseshoe Estimator/_Index|Li 2019 - Graphical Horseshoe Estimator]]
