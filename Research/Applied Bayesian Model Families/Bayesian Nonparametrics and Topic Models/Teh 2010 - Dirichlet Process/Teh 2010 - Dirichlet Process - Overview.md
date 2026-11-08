---
title: "Teh 2010 - Dirichlet Process - Overview"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/overview
  - doc/paper
source: "[[raw/Teh 2010 - Dirichlet Process.pdf]]"
source_location: "Whole entry, pp. 1-13"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Teh 2010 - Dirichlet Process"
doc_type: paper
depends_on:
  - "[[Nonparametric Models Overview]]"
  - "[[Monsters and Mixtures]]"
used_by:
  - "[[Teh 2010 - DP Definition and Posterior Conjugacy]]"
  - "[[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]]"
  - "[[Teh 2010 - Stick-Breaking Construction]]"
  - "[[Teh 2010 - DP Mixture Models and Applications]]"
  - "[[Teh 2010 - Extensions and Reference Map]]"
aliases:
  - "Teh Dirichlet Process Encyclopedia Entry"
---

# Teh 2010 - Dirichlet Process - Overview

> [!summary]
> Teh's Encyclopedia of Machine Learning entry defines the Dirichlet process (DP) as a distribution over distributions with Dirichlet-distributed finite-dimensional marginals, then derives its conjugate posterior, the Blackwell-MacQueen urn, the Chinese restaurant process (CRP), the stick-breaking construction and the DP mixture. Key takeaway: one object, four equivalent views, and the prior number of clusters grows only like $\alpha\log n$.

## Overview
**Research question.** How can a Bayesian place a prior on an unknown distribution $F$ (or on the number of mixture components) without fixing a finite parameterisation, while keeping the posterior tractable?

**Contribution.** A compact, self-contained exposition of the DP: definition via partitions, posterior conjugacy, predictive urn, induced random partition (CRP), Sethuraman stick-breaking, and use as the mixing measure of an infinite mixture model.

**Key results.**
- $G\sim\text{DP}(\alpha,H)$ iff $(G(A_1),\dots,G(A_r))\sim\text{Dir}(\alpha H(A_1),\dots,\alpha H(A_r))$ for every finite measurable partition.
- Posterior is again a DP with concentration $\alpha+n$ and base $\frac{\alpha H+\sum_i\delta_{\theta_i}}{\alpha+n}$.
- Prior number of clusters: $\mathbb E[m\mid n]=\alpha(\psi(\alpha+n)-\psi(\alpha))\approx\alpha\log(1+n/\alpha)$.
- Draws are discrete with probability one, even if $H$ is smooth.

## Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| Definition; Motivation and Background | 1-2 | [[Teh 2010 - DP Definition and Posterior Conjugacy]] |
| Theory: finite mixture with $K\to\infty$ (Eq. 1) | 2-3 | [[Teh 2010 - DP Mixture Models and Applications]] (finite-to-infinite limit) and [[Teh 2010 - DP Definition and Posterior Conjugacy]] |
| Theory: Dirichlet Process (Eq. 2), existence | 3-4 | [[Teh 2010 - DP Definition and Posterior Conjugacy]] |
| Posterior Distribution (Eqs. 3-4) | 4-5 | [[Teh 2010 - DP Definition and Posterior Conjugacy]] |
| Predictive Distribution and Blackwell-MacQueen Urn (Eqs. 5-9) | 5-6 | [[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]] |
| Clustering, Partitions and CRP (Eqs. 10-12) | 6-8 | [[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]] |
| Stick-breaking Construction (Eq. 13) | 8 | [[Teh 2010 - Stick-Breaking Construction]] |
| Applications: model validation, density estimation (Eq. 14) | 9 | [[Teh 2010 - DP Mixture Models and Applications]] |
| DP Mixture Models (Eqs. 15-16) | 9-10 | [[Teh 2010 - DP Mixture Models and Applications]] |
| Generalizations and Extensions; Future Directions | 10-11 | [[Teh 2010 - Extensions and Reference Map]] |
| Cross References; Recommended Reading; refs [1]-[18] | 11-13 | [[Teh 2010 - Extensions and Reference Map]] |

## Motivating PyMC examples
Examples from [the PyMC challenges example list](https://redam94.github.io/pymc-challenges/examples.html) that use these methods:
- **E26** Bayesian nonparametrics: Dirichlet process mixtures (enzyme activity of 245 people; PBC bilirubin slopes; `pm.StickBreakingWeights` + `pm.NormalMixture`, truncation check, co-clustering, sensitivity to $\alpha$).
- **E30** Exchangeable partitions: Polya urns, CRP, Pitman-Yor and unseen species (see [[De Blasi 2015 - Gibbs-Type Priors - Overview]]).
- **E75** Image segmentation with an unknown number of regions (see [[Concept - DP Mixtures for Image Segmentation]]).

## Relevance to marketing measurement
DP mixtures give a data-driven number of customer or market segments without refitting for $K=2,3,\dots$; the same machinery underlies nonparametric random effects (for example geo or campaign effects that are clumpy rather than Gaussian). Treat the posterior over $K$ with care: it is sensitive to $\alpha$ and to the kernel family (see [[Teh 2010 - DP Mixture Models and Applications]]).

## Connections
- Vault background: [[Nonparametric Models Overview]], [[Monsters and Mixtures]], [[Hierarchical Models]].
- Next step on partitions beyond the DP: [[De Blasi 2015 - EPPF and Predictive Structure]].

## See Also
[[Bayesian Nonparametrics and Topic Models/Teh 2010 - Dirichlet Process/_Index|Teh 2010 index]]
