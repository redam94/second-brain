---
title: "Barker 2018 - Reliability of N-Mixture Models - Overview"
tags:
  - source/ingested
  - topic/population-estimation
  - type/overview
  - doc/paper
source: "[[raw/Barker 2018 - On the Reliability of N-Mixture Models for Count Data.pdf]]"
source_location: "Entire paper, Biometrics 74: 369-377"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Barker 2018 - Reliability of N-Mixture Models"
doc_type: paper
depends_on:
  - "[[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]]"
used_by:
  - "[[Barker 2018 - N-Mixture Model and the Capture-Recapture View]]"
  - "[[Barker 2018 - Poisson Alternative and Model Discrimination]]"
  - "[[Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion]]"
aliases:
  - N-mixture reliability overview
  - Barker Schofield Link Sauer 2018
---

# Barker 2018 - Reliability of N-Mixture Models - Overview

> [!summary]
> Barker, Schofield, Link and Sauer (2018, *Biometrics* 74(1): 369-377) argue that N-mixture models, which estimate abundance $N$ and detection $p$ from repeated unmarked counts, rest on an identifiability that comes from the binomial and constant-$p$ assumptions, not from the data. Plausible alternatives in which $N$ is non-identifiable or does not exist fit practically as well. Reliable inference from counts alone is limited to **relative abundance**.

## Overview

**Why this paper stands in for Royle (2004).** Royle's original N-mixture paper (Biometrics 60: 108-115) had no legal open PDF reachable here; this paper restates the model, explains where its identification comes from, and is the most cited critique of it. It is therefore used as the source for the N-mixture topic. Royle's paper remains a follow-on ingest.

**The model.** Replicate counts $n_{ij}\mid N_i\sim\text{Binomial}(N_i,p)$ at sites $i=1..I$ and visits $j=1..J$, with $N_i\sim\text{Poisson}(\nu)$ or a heavier-parameterised alternative.

**Contributions.**
1. A capture-recapture view: counts are incomplete data of a latent multinomial; not marking animals discards the dominant term of the likelihood.
2. A counterexample: Poisson sampling with replacement (or a double-Poisson-lognormal count model) has the same first two moments, makes $N$ non-identifiable, and is hard to tell apart by AIC.
3. A recommendation: fit Poisson regression (with covariates and random effects) for relative abundance; collect auxiliary data (recaptures) if absolute abundance is needed.

**Key numbers.** In the simulations the competing double Poisson-lognormal model was preferred or within 1 AIC unit in 82% / 59% / 41% of data sets simulated under the N-mixture model (scenarios A/B/C, $E[n]=3,9,15$).

## Motivating PyMC examples

From <https://redam94.github.io/pymc-challenges/examples.html>:
- **E28** - "Imperfect detection: occupancy, N-mixture, capture-recapture" (Swiss breeding-bird mallard counts; N-mixture truncation check, Poisson vs NegBin). The example's identifiability caveats are exactly this paper's.

## Source Map

| Paper section | Covered in |
|---|---|
| Summary; 1 Introduction; 1.1 N-mixture model; 1.2 structure | this note; [[Barker 2018 - N-Mixture Model and the Capture-Recapture View]] |
| 2 A capture-recapture perspective (Eq. 1-2, Fig. 1) | [[Barker 2018 - N-Mixture Model and the Capture-Recapture View]] |
| 2.1 N-mixtures and the multivariate Poisson (Eq. 5-6) | [[Barker 2018 - N-Mixture Model and the Capture-Recapture View]] |
| 3 Binomial vs Poisson models (Eq. 3-4) | [[Barker 2018 - Poisson Alternative and Model Discrimination]] |
| 3.1 Can we discriminate among models? (Table 1, Fig. 2) | [[Barker 2018 - Poisson Alternative and Model Discrimination]] |
| 4 Relative abundance: Poisson models (Eq. 7-10) | [[Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion]] |
| 4.1 Alder flycatcher example (Table 2, Fig. 3) | [[Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion]] |
| 5 Discussion; 6 Supplementary materials; References | [[Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion]] |

## Connections

- Roots in the occupancy model: [[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]].
- Capture-recapture models M0, Mt, Mtbh: [[Concept - Closed-Population Capture-Recapture and Otis Models]].
- Overdispersion and zero-inflation alternatives: [[Monsters and Mixtures]]. Random-effect Poisson as partial pooling: [[Hierarchical Models]].
- Identification-by-prior-structure problems also appear in [[Aleshin-Guendel 2020 - Identifiability of Latent Class MSE Models - Overview]].

## See Also

- [[Concept - Marginalising Latent Discrete Counts for HMC]]
- [[SBC Case Studies]] (a calibration check would flag the weak identification)
