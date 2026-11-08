---
title: "MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview"
tags:
  - source/ingested
  - topic/population-estimation
  - type/overview
  - doc/paper
source: "[[raw/MacKenzie 2002 - Estimating Site Occupancy Rates When Detection Probabilities Are Less Than One.pdf]]"
source_location: "Entire paper, pp. 2248-2255"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/MacKenzie et al 2002 - Site Occupancy with Imperfect Detection"
doc_type: paper
depends_on:
  - "[[MacKenzie 2002 - Occupancy Model and Likelihood]]"
used_by:
  - "[[MacKenzie 2002 - Simulation Study and Maryland Anuran Results]]"
  - "[[MacKenzie 2002 - Extensions, Design Guidance and PyMC Sketch]]"
aliases:
  - MacKenzie occupancy paper overview
---

# MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview

> [!summary]
> MacKenzie, Nichols, Lachman, Droege, Royle and Langtimm (2002, *Ecology* 83(8): 2248-2255) show how to estimate the proportion of sites occupied by a species when it can be present yet go undetected. Repeated visits give detection histories; a two-part likelihood (occupancy $\psi$, detection $p$) recovers $\psi$. Key takeaway: the naive fraction of sites where the species was seen is biased low, and the bias can be corrected only with replicated surveys.

## Overview

**Research question.** Non-detection at a site does not imply absence unless detection probability is 1. How can the fraction of occupied sites be estimated, with covariates and missing visits, from presence/absence surveys?

**Contribution.** A likelihood that parallels a closed-population mark-recapture model with an extra parameter for presence ($\psi$; the PDF text layer renders it as "c"). It is estimable from summary statistics alone, accommodates site covariates for $\psi$ and time-varying covariates for $p$, handles missing visits, and uses a nonparametric bootstrap for standard errors.

**Key results.**
- Simulation (243 scenarios, 500 data sets each): $\hat\psi$ is reasonably unbiased when $p\ge 0.3$ and $T\ge5$; poor with $T=2$ unless $p\ge0.5$; with low $p$, $\hat\psi$ tends to 1 and bootstrap SEs become spuriously small.
- Maryland Frogwatch data (29 sites after truncation): American toad $\hat\psi\approx0.49$ vs naive 0.34 (a 44% increase); spring peeper $\hat\psi\approx0.85$ vs naive 0.83.

**Why it matters here.** This is the base model behind PyMC example E28 and it shares its latent-state structure with N-mixture models ([[Barker 2018 - Reliability of N-Mixture Models - Overview]]) and closed-population capture-recapture ([[Concept - Closed-Population Capture-Recapture and Otis Models]]).

## Motivating PyMC examples

From <https://redam94.github.io/pymc-challenges/examples.html>:
- **E28** - "Imperfect detection: occupancy, N-mixture, capture-recapture" (Swiss breeding-bird survey crossbill and mallard; snowshoe hare capture histories; latent presence / abundance summed out in `pm.CustomDist`, finite-sample occupancy, naive vs corrected trends, visits x prior confounding).

## Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| Abstract, Introduction (monitoring, metapopulations) | 2248-2249 | this note; [[MacKenzie 2002 - Extensions, Design Guidance and PyMC Sketch]] |
| Methods: Notation, Basic sampling situation (closure assumptions) | 2249 | [[MacKenzie 2002 - Occupancy Model and Likelihood]] |
| General likelihood, Eq. 1, bootstrap SE | 2249-2250 | [[MacKenzie 2002 - Occupancy Model and Likelihood]] |
| Extensions: covariates (Eq. 2-3), missing observations | 2250 | [[MacKenzie 2002 - Occupancy Model and Likelihood]] |
| Simulation study, Fig. 1 | 2251-2252 | [[MacKenzie 2002 - Simulation Study and Maryland Anuran Results]] |
| Field study: Maryland anurans, Table 1 | 2252-2253 | [[MacKenzie 2002 - Simulation Study and Maryland Anuran Results]] |
| Discussion: caution rules, design, dynamics, co-occurrence, heterogeneity | 2253-2254 | [[MacKenzie 2002 - Extensions, Design Guidance and PyMC Sketch]] |
| Literature cited, Appendix and Supplement (software, full simulation tables in ESA archive) | 2254-2255 | folder index (Sources section) |

## Connections

- Hierarchical view of the latent state: [[Hierarchical Models]].
- Discrete latent states summed out: [[Concept - Marginalising Latent Discrete Counts for HMC]].
- Zero-inflation analogy: [[Monsters and Mixtures]].

## See Also

- [[MacKenzie 2002 - Occupancy Model and Likelihood]]
- [[Barker 2018 - Reliability of N-Mixture Models - Overview]]
- [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]
