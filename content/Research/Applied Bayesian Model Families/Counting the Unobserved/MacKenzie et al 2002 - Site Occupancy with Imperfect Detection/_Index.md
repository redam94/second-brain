---
title: "Index: MacKenzie et al 2002 - Site Occupancy with Imperfect Detection"
tags:
  - type/index
  - source/ingested
  - topic/population-estimation
parent: "[[../_Index|Counting the Unobserved]]"
date_updated: 2026-11-08
concept_count: 4
---

# MacKenzie et al 2002 - Site Occupancy with Imperfect Detection

> [!abstract] Routing Summary
> Full capture of MacKenzie, Nichols, Lachman, Droege, Royle and Langtimm (2002), *Ecology* 83(8): 2248-2255: the occupancy likelihood with imperfect detection, simulations, the Maryland frog example, and extensions. 4 notes.
> - Need the paper on one page, headline numbers, PyMC example link, or the section-to-note map? -> [[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]]
> - Need the likelihood (Eq. 1), covariates, missing visits, bootstrap SEs? -> [[MacKenzie 2002 - Occupancy Model and Likelihood]]
> - Need the 243-scenario simulation or the toad and peeper results (Table 1)? -> [[MacKenzie 2002 - Simulation Study and Maryland Anuran Results]]
> - Need design rules, caution rule, extensions, or a PyMC marginalised-occupancy sketch? -> [[MacKenzie 2002 - Extensions, Design Guidance and PyMC Sketch]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Sampling assumptions (closure, no false positives) | [[MacKenzie 2002 - Occupancy Model and Likelihood]] | definition | - | sites closed during surveys |
| Occupancy likelihood | [[MacKenzie 2002 - Occupancy Model and Likelihood]] | theorem | assumptions | all-zero history = $\psi\prod(1-p)+1-\psi$ |
| Simulation design and findings | [[MacKenzie 2002 - Simulation Study and Maryland Anuran Results]] | example | likelihood | unbiased if $p\ge0.3$, $T\ge5$ |
| Frog Table 1 | [[MacKenzie 2002 - Simulation Study and Maryland Anuran Results]] | example | likelihood | toad 0.49 vs naive 0.34 |
| Caution rule and design guidance | [[MacKenzie 2002 - Extensions, Design Guidance and PyMC Sketch]] | theorem | simulation | doubt $\hat\psi\approx1$ with $p<0.15$, $T<7$ |

## Notes

- [[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]] — CONTAINS: question, contribution, key results, PyMC E28 link, Source Map.
- [[MacKenzie 2002 - Occupancy Model and Likelihood]] — CONTAINS: assumptions, site-level and pooled likelihood, bootstrap, logistic covariates, missing visits, worked non-detection example, Python MLE.
- [[MacKenzie 2002 - Simulation Study and Maryland Anuran Results]] — CONTAINS: simulation factors and findings table, field data protocol, Table 1 reproduced with interpretation.
- [[MacKenzie 2002 - Extensions, Design Guidance and PyMC Sketch]] — CONTAINS: caution rule, design guidance, robust design, co-occurrence parameter growth, heterogeneity, PyMC sketch.

## Sources
- MacKenzie 2002 - Estimating Site Occupancy Rates When Detection Probabilities Are Less Than One — USGS ARMI copy (8 pp). Ecology 83(8): 2248-2255.

## See Also
- [[Barker 2018 - Reliability of N-Mixture Models - Overview]] — abundance counterpart.
- [[Concept - Marginalising Latent Discrete Counts for HMC]], [[Hierarchical Models]], [[Monsters and Mixtures]].
