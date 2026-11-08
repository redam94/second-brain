---
title: "Horseshoe and Regularized Horseshoe Priors"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/regularization
  - topic/regression
  - type/concept
  - doc/paper
source: ""
date_ingested: 2026-11-08
folder: "Bayesian Statistics/Regression Models"
doc_type: concept
source_location: ""
aliases:
  - horseshoe prior
  - regularized horseshoe
  - global-local shrinkage prior
depends_on:
  - "[[Bayesian Linear Regression]]"
used_by: []
---

# Horseshoe and Regularized Horseshoe Priors

> [!summary]
> **Stub note.** The horseshoe prior is a global-local shrinkage prior for sparse Bayesian regression. It places a half-Cauchy prior on each coefficient's local scale, enabling near-zero shrinkage for noise while preserving large signals. The regularized horseshoe adds a soft upper bound on the local scales to improve computation. Referenced from [[Bayesian Linear Regression]].

## See Also

- [[Bayesian Linear Regression]] — context where horseshoe priors are used
