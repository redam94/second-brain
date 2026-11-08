---
title: "Index: Concept Notes - Counting the Unobserved"
tags:
  - type/index
  - source/ingested
  - topic/population-estimation
parent: "[[../_Index|Counting the Unobserved]]"
date_updated: 2026-11-08
concept_count: 4
---

# Concept Notes - Counting the Unobserved

> [!abstract] Routing Summary
> Synthesis notes (no raw source) filling topics where the primary paper was not legally obtainable or that cut across papers. Four notes.
> - Lincoln-Petersen, Chapman, Otis models, dependence bias? -> [[Concept - Closed-Population Capture-Recapture and Otis Models]]
> - Summing out presence, abundance, class for NUTS? -> [[Concept - Marginalising Latent Discrete Counts for HMC]]
> - LCMCR and latent class MSE (concept; Manrique-Vallier 2016 not obtained)? -> [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]]
> - Unseen species (E30) and latent class raters (E69) bridges? -> [[Concept - Unseen Species and Latent Class Links]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Lincoln-Petersen / Chapman | [[Concept - Closed-Population Capture-Recapture and Otis Models]] | definition | - | $\hat N=n_1n_2/m$ |
| Otis models, Chao bound | [[Concept - Closed-Population Capture-Recapture and Otis Models]] | definition | - | $M_h$ non-identifiable |
| Log-space marginalisation | [[Concept - Marginalising Latent Discrete Counts for HMC]] | definition | likelihoods | logsumexp over support |
| Truncation check | [[Concept - Marginalising Latent Discrete Counts for HMC]] | theorem | N-mixture | tail $P(\text{Pois}>N_{max})$ |
| LCMCR | [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]] | definition | $M_{th}$ | needs $2J\le K$ |
| Chao1, Good-Turing | [[Concept - Unseen Species and Latent Class Links]] | definition | capture-recapture | $S\ge S_{obs}+f_1^2/(2f_2)$ |

## Notes

- [[Concept - Closed-Population Capture-Recapture and Otis Models]] — CONTAINS: LP, Chapman, dependence bias, Otis table, Chao bound, Python.
- [[Concept - Marginalising Latent Discrete Counts for HMC]] — CONTAINS: marginalisation table, truncation check, recovery of latents, numpy and PyMC sketches.
- [[Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation]] — CONTAINS: model, DP prior, identification bound, diagnostics, PyMC sketch.
- [[Concept - Unseen Species and Latent Class Links]] — CONTAINS: unseen-species estimators, raters vs MSE comparison, counting check.

## Sources
- None (concept notes). Literature referenced: Otis et al. 1978; Seber 1982; Chapman 1951; Chao 1984, 1987; Link 2003; Fienberg 1972; Manrique-Vallier 2016; Dawid and Skene 1979; Hui and Walter 1980; Goodman 1974.

## See Also
- [[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]], [[Barker 2018 - Reliability of N-Mixture Models - Overview]], [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]].
