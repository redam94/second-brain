---
title: "Griffiths 2011 - The Indian Buffet Process - Overview"
tags:
  - source/ingested
  - topic/bayesian-nonparametrics
  - type/overview
  - doc/paper
source: "[[raw/Griffiths Ghahramani 2011 - The Indian Buffet Process An Introduction and Review.pdf]]"
source_location: "Whole paper, JMLR 12, pp. 1185-1224"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Bayesian Nonparametrics and Topic Models/Griffiths 2011 - The Indian Buffet Process"
doc_type: paper
depends_on:
  - "[[Teh 2010 - Dirichlet Process - Overview]]"
  - "[[Nonparametric Models Overview]]"
used_by:
  - "[[Griffiths 2011 - Infinite Mixtures and the CRP Review]]"
  - "[[Griffiths 2011 - Latent Feature Models and the Finite Beta-Bernoulli Prior]]"
  - "[[Griffiths 2011 - Equivalence Classes and the Infinite Limit]]"
  - "[[Griffiths 2011 - The Indian Buffet Process and Its Properties]]"
  - "[[Griffiths 2011 - Gibbs Sampling and the Linear-Gaussian Model]]"
  - "[[Griffiths 2011 - Applications of the IBP]]"
  - "[[Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process]]"
aliases:
  - "Indian Buffet Process Introduction and Review"
---

# Griffiths 2011 - The Indian Buffet Process - Overview

> [!summary]
> Griffiths and Ghahramani derive the Indian buffet process (IBP), a distribution over equivalence classes of sparse binary matrices with $N$ rows and unboundedly many columns, as the $K\to\infty$ limit of a beta-Bernoulli feature model. It lets a latent feature model infer how many features are present; the number of used features is $\text{Poisson}(\alpha H_N)$ and each object has $\text{Poisson}(\alpha)$ features.

## Overview
**Research question.** Infinite mixtures (DP/CRP) assign each object to one class. How do we define a prior for *multiple* latent features per object, with an unbounded feature set, exchangeable objects and tractable inference?

**Contribution.** (1) Derive the prior by taking the infinite limit of a finite model; (2) give its sequential culinary description; (3) work out Gibbs sampling in a linear-Gaussian binary-feature model; (4) review applications; (5) present the two-parameter generalisation, stick-breaking and beta-process views, and non-exchangeable variants.

**Key results.** $P([Z])$ in Eq. 14; $K_+\sim\text{Poisson}(\alpha H_N)$; row sums $\sim\text{Poisson}(\alpha)$; $E[\mathbf 1^TZ\mathbf 1]=N\alpha$ (sparse); Gibbs conditional $P(z_{ik}=1\mid z_{-i,k})=m_{-i,k}/N$ and $\text{Poisson}(\alpha/N)$ new features.

## Source Map

| Paper section | Covered in |
|---|---|
| 1 Introduction | this note; [[Griffiths 2011 - Infinite Mixtures and the CRP Review]] |
| 2 Latent class models (2.1 finite, 2.2 infinite, 2.3 CRP, 2.4 Gibbs, 2.5 summary) | [[Griffiths 2011 - Infinite Mixtures and the CRP Review]] |
| 3 Latent feature models | [[Griffiths 2011 - Latent Feature Models and the Finite Beta-Bernoulli Prior]] |
| 4.1 Finite feature model | [[Griffiths 2011 - Latent Feature Models and the Finite Beta-Bernoulli Prior]] |
| 4.2 Equivalence classes; 4.3 Infinite limit | [[Griffiths 2011 - Equivalence Classes and the Infinite Limit]] |
| 4.4 The IBP; 4.5 Collections of histories; 4.6 Properties | [[Griffiths 2011 - The Indian Buffet Process and Its Properties]] |
| 4.7 Inference by Gibbs sampling | [[Griffiths 2011 - Gibbs Sampling and the Linear-Gaussian Model]] |
| 5 Linear-Gaussian example (5.1-5.3, Figs 7-9) | [[Griffiths 2011 - Gibbs Sampling and the Linear-Gaussian Model]] |
| 6 Applications (6.1-6.9) | [[Griffiths 2011 - Applications of the IBP]] |
| 7 Extensions (7.1 two-parameter, 7.2 stick-breaking, 7.3 beta process, 7.4 non-exchangeable) | [[Griffiths 2011 - Two-Parameter IBP, Stick-Breaking and Beta Process]] |
| 8 Conclusions; Appendix A (limit calculation) | [[Griffiths 2011 - Equivalence Classes and the Infinite Limit]]; this note |

## Motivating PyMC examples
- **E31** The Indian buffet process: latent binary features (UCI optdigits, 300 train / 200 test digits; collapsed Gibbs in NumPy checked by brute-force enumeration; noise level vs $\alpha$ drives $K_+$; stuck chains and split-merge; label-free summaries). Link: [PyMC challenges examples](https://redam94.github.io/pymc-challenges/examples.html).
- **E73** touches binary/latent-feature ideas when comparing newer topic models ([[Arora 2012 - Practical Provable Topic Modeling - Overview]]).

## Relevance to marketing measurement
Latent binary features are a natural model for *multi-membership*: a customer can belong to several lifestyle or need states; an ad exposure can have several creative attributes; a household can use several channels. Compared with a DP mixture (one segment per customer) an IBP-style prior lets the number of attributes grow with data. As with any unsupervised structure, features are descriptive, not causal drivers; $K_+$ depends strongly on the noise level $\sigma_X$ and on $\alpha$.

## Connections
[[Nonparametric Models Overview]], [[Factor Analysis and PPCA]] (continuous-feature analogue), [[Social Network Models]] (latent feature link prediction), [[Teh 2010 - Blackwell-MacQueen Urn and Chinese Restaurant Process]] (the CRP analogue).

## See Also
[[Bayesian Nonparametrics and Topic Models/Griffiths 2011 - The Indian Buffet Process/_Index|Griffiths 2011 index]]
