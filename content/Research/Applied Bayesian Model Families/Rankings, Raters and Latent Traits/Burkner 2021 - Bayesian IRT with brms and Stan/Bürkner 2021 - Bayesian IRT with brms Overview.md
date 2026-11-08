---
title: "Bürkner 2021 - Bayesian IRT with brms Overview"
tags:
  - source/ingested
  - topic/latent-traits
  - type/overview
  - doc/paper
source: "[[raw/Burkner 2021 - Bayesian Item Response Modeling in R with brms and Stan.pdf]]"
source_location: "Full paper, JSS 100(5), arXiv:1905.09501v3, pp. 1-54"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Rankings, Raters and Latent Traits/Burkner 2021 - Bayesian IRT with brms and Stan"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
  - "[[HMC and Stan in Practice]]"
  - "[[Confirmatory Factor Analysis and SEM]]"
used_by:
  - "[[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]]"
  - "[[Item Response Theory Norms and You Are Here Placement (Concept Note)]]"
aliases:
  - Bayesian Item Response Modeling in R with brms and Stan
  - brms IRT framework
---

# Bürkner 2021 - Bayesian IRT with brms Overview

> [!summary]
> Bürkner shows that a wide range of item response theory (IRT) models are multilevel (distributional, optionally non-linear) regressions: 1PL/Rasch, 2PL, 3PL, graded response, partial credit, count, response-time and drift-diffusion models, with covariates, differential item functioning (DIF), hierarchical priors and LOO/Bayes-factor comparison, all fitted by Stan HMC through the brms formula interface. Key practical lessons: use partial pooling on persons and items, fix $\sigma_\theta=1$ in 2PL to identify the scale, constrain discrimination positive via $\exp(\log\alpha)$, and compare simple vs complex IRT models with LOO.

## Overview

**Citation.** Bürkner, P.-C. (2021), *Bayesian item response modeling in R with brms and Stan*, Journal of Statistical Software 100(5): 1-54 (open access). arXiv:1905.09501v3.

**Contributions.** Extends De Boeck et al. (2011) (IRT as generalized linear mixed models for binary data) to (a) 40+ response distributions, (b) non-linear IRT (2PL, 3PL), (c) distributional IRT in which all distribution parameters depend on person and item properties. New brms features: nested non-linear and distributional formulas, response-time families, discrimination parameter `disc` for ordinal models, `constant()` priors.

## Motivating PyMC examples

See <https://redam94.github.io/pymc-challenges/examples.html>: **E116** (Is my toddler on track? First words, item response theory and "you are here": a 2PL IRT model of 680 vocabulary items for 9,537 CDI checklists, with norms by age). The 2PL, hierarchical priors and identification discussion here map directly; marginalising the latent ability with quadrature is covered in [[Item Response Theory Norms and You Are Here Placement (Concept Note)]].

## Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction | this note |
| 2.1 Response distributions (Bernoulli, categorical, cumulative/GRM, adjacent-category/PCM, Poisson/RPCM, Beta, Dirichlet, exgaussian, Wiener) | [[Bürkner 2021 - Response Families and Distributional IRT]] |
| 2.2 Predicting distributional parameters (Rasch, 2PL, 3PL) | [[Bürkner 2021 - IRT Model Classes 1PL 2PL and Extensions]] |
| 2.3 Item and person covariates | [[Bürkner 2021 - Covariates and Differential Item Functioning]] |
| 2.4 Differential item functioning | [[Bürkner 2021 - Covariates and Differential Item Functioning]] |
| 2.5 Priors on person/item parameters; 2.6 Identification | [[Bürkner 2021 - Priors Hierarchical Pooling and Identification]] |
| 3 Specification in brms (family, formula, prior, Stan code); 4 Estimation and post-processing | [[Bürkner 2021 - brms Specification Stan Code and Post-Processing]] |
| 5.1 Binary models (VerbAgg: 1PL, 2PL, covariates, DIF, 3PL) | [[Bürkner 2021 - Worked Examples Binary Models VerbAgg]] |
| 5.2 Ordinal models; 5.3 Response-time models | [[Bürkner 2021 - Worked Examples Ordinal and Response-Time Models]] |
| 6 Comparison of R packages; 7 Conclusion | [[Bürkner 2021 - Worked Examples Ordinal and Response-Time Models]] (package comparison section) |

## Main Content

IRT view: observation $n$ has response $y_n\sim D(\psi_{1n},\dots,\psi_{Kn})$; each distributional parameter $\psi_{kn}=f_k(\theta_{k,p_n},\xi_{k,i_n})$ depends on person ($\theta$) and item ($\xi$) parameters. The linear logit case is Rasch/1PL: $\psi=\text{logistic}(\theta_p+\xi_i)$ with $\xi_i$ item easiness (brms uses easiness; classical Rasch writes $\theta_p-\xi_i$ with difficulty).

## Examples

The VerbAgg analysis (316 persons, 24 items, 7,584 responses): [[Bürkner 2021 - Worked Examples Binary Models VerbAgg]].

## Relevance to marketing measurement

IRT underlies survey scale development (brand-health items, satisfaction batteries), respondent scoring, and the percentile placement of a person within a norm group (see the concept note). The Rasch/2PL structure is the "multiplicative ability x item" analogue of a two-way fixed/random effects model; DIF analysis tests measurement invariance across markets or demographics (cf. [[Confirmatory Factor Analysis and SEM]] for the factor-analytic view).

## Connections

- Annotation models are IRT-like: [[Paun 2018 - Comparing Bayesian Models of Annotation - Overview]].
- Hierarchical Bayes: [[Hierarchical Models]]; Stan/HMC: [[HMC and Stan in Practice]]; LOO: [[Posterior Predictive Checking]].

## See Also

[[Factor Analysis and PPCA]]
