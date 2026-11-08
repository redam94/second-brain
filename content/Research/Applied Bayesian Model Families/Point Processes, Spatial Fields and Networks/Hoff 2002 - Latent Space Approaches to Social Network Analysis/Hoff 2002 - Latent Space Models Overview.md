---
title: "Hoff 2002 - Latent Space Models Overview"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/overview
  - doc/paper
source: "[[raw/Hoff 2002 - Latent Space Approaches to Social Network Analysis.pdf]]"
source_location: "Whole paper, JASA 97(460):1090-1098"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Hoff 2002 - Latent Space Approaches to Social Network Analysis"
doc_type: paper
depends_on:
  - "[[Hoff 2002 - Distance and Projection Models]]"
used_by:
  - "[[Research/Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Hoff 2002 - Latent Space Approaches to Social Network Analysis/_Index|Hoff 2002 - Latent Space Approaches to Social Network Analysis]]"
aliases:
  - "Hoff Raftery Handcock 2002"
  - "latent space model overview"
---

# Hoff 2002 - Latent Space Models Overview

> [!summary]
> Hoff, Raftery and Handcock (JASA 2002) model a network $Y$ by giving each actor a latent position $z_i$ in a low-dimensional Euclidean "social space" and letting tie probability depend on distance, conditionally independent given positions: $\text{logit}\,P(y_{ij}=1)=\alpha+\beta^\top x_{ij}-|z_i-z_j|$. The latent geometry automatically yields reciprocity and transitivity, supports MLE or MCMC with Procrustes post-processing, and quantifies uncertainty in positions. It fits three classic datasets better than the stochastic blockmodel.

## Overview
**Question.** How can network data (an $n\times n$ sociomatrix) be modelled so that transitivity and clustering are explained by unobserved characteristics, avoiding the degeneracy and instability of exponential random graph ($p^*$) models and the rigid groups of stochastic blockmodels?

**Contributions.** (i) Distance and projection (directional, activity-weighted) models; (ii) estimation: logistic likelihood, MLE via MDS start, Bayesian MCMC with Procrustes alignment; (iii) analyses of 18 monks, 16 Florentine families, 27 classmates; (iv) comparison with the Wang-Wong stochastic blockmodel; (v) extensions (dyad dependence $\gamma$, covariates, MDS contrast).

### Motivating PyMC examples
<https://redam94.github.io/pymc-challenges/examples.html>: **E21** - Network data as the outcome: latent-space and stochastic block models (Lazega lawyers, 71 actors, 2,485 dyads; dyad logistic vs sociality random effects, Hoff latent space + Procrustes, mixed-membership SBM, network PPCs: degree, transitivity, shared partners, geodesics).

### Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction (random graphs, $p_1$, $p^*$, SBM) | [[Hoff 2002 - Distance and Projection Models]] |
| 2.1 Distance models (eq. 1-3, $d_k$ representability) | [[Hoff 2002 - Distance and Projection Models]] |
| 2.2 Projection models | [[Hoff 2002 - Distance and Projection Models]] |
| 3 Estimation (eq. 4, Procrustes MCMC) | [[Hoff 2002 - Likelihood Estimation and Procrustes MCMC]] |
| 4.1 Monk data, Table 1, Figs. 1-2 | [[Hoff 2002 - Monks Florentine Families and Classroom Examples]] |
| 4.2 Florentine families, Figs. 3-4 | [[Hoff 2002 - Monks Florentine Families and Classroom Examples]] |
| 4.3 Classroom, Table 2, Fig. 5 | [[Hoff 2002 - Monks Florentine Families and Classroom Examples]] |
| 5 Discussion (extensions, MDS) | [[Hoff 2002 - Discussion Extensions and Stochastic Blockmodel Contrast]] |
| SBM background (Wang-Wong, Nowicki-Snijders) | [[Hoff 2002 - Discussion Extensions and Stochastic Blockmodel Contrast]], [[Network Outcome Models - Stochastic Block Models and Network Checks]] |

## Examples
See [[Hoff 2002 - Likelihood Estimation and Procrustes MCMC]] (code) and [[Hoff 2002 - Monks Florentine Families and Classroom Examples]].

## Connections
- Relevance to marketing measurement: networks as outcomes appear in referral/co-purchase graphs, creator-brand affiliation, and customer similarity; a latent space gives interpretable "positions" and uncertainty for segmentation. The paper itself concerns social networks only.
- Existing vault: [[Social Network Models]] (basic network modelling in PyMC), [[Reinhart 2018 - Crime, Epidemic and Network Applications]] (events on networks).

## See Also
[[Research/Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Hoff 2002 - Latent Space Approaches to Social Network Analysis/_Index|Hoff 2002 - Latent Space Approaches to Social Network Analysis]]
