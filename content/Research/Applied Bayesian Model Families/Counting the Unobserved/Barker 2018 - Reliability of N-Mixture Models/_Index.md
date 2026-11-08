---
title: "Index: Barker 2018 - Reliability of N-Mixture Models"
tags:
  - type/index
  - source/ingested
  - topic/population-estimation
parent: "[[../_Index|Counting the Unobserved]]"
date_updated: 2026-11-08
concept_count: 4
---

# Barker 2018 - Reliability of N-Mixture Models

> [!abstract] Routing Summary
> Full capture of Barker, Schofield, Link and Sauer (2018), *Biometrics* 74(1): 369-377, used as the open-access source for the N-mixture topic (Royle 2004 had no legal open PDF reachable). 4 notes.
> - Need the paper on one page or the source map? -> [[Barker 2018 - Reliability of N-Mixture Models - Overview]]
> - Need the N-mixture definition, the $L_1L_2L_3$ decomposition, or the multivariate Poisson? -> [[Barker 2018 - N-Mixture Model and the Capture-Recapture View]]
> - Need why $N$ is not identified under Poisson, or the 82/59/41% discrimination results? -> [[Barker 2018 - Poisson Alternative and Model Discrimination]]
> - Need Poisson regression for relative abundance, the flycatcher Table 2, or the conclusions? -> [[Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| N-mixture model | [[Barker 2018 - N-Mixture Model and the Capture-Recapture View]] | definition | - | Binomial counts, Poisson $N_i$ |
| Likelihood decomposition Mt, M0 | [[Barker 2018 - N-Mixture Model and the Capture-Recapture View]] | theorem | capture-recapture | $L_1$ (lost) dominates $L_2L_3$ |
| Poisson nonidentifiability | [[Barker 2018 - Poisson Alternative and Model Discrimination]] | theorem | Eq. 4 | only $\lambda=Np$ estimable |
| DPLN counterexample and Table 1 | [[Barker 2018 - Poisson Alternative and Model Discrimination]] | example | moments | competing model chosen/tied 82%, 59%, 41% |
| Relative abundance Poisson model | [[Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion]] | definition | partial likelihood | $\alpha_p,\alpha_N$ confounded; $\beta_N$ estimable |
| Flycatcher Table 2 | [[Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion]] | example | models | site effects agree across 4 fits |

## Notes

- [[Barker 2018 - Reliability of N-Mixture Models - Overview]] — CONTAINS: summary, swap rationale for Royle 2004, source map.
- [[Barker 2018 - N-Mixture Model and the Capture-Recapture View]] — CONTAINS: model, limitations, Eq. 1, 2, 5, Fig. 1, thinning check.
- [[Barker 2018 - Poisson Alternative and Model Discrimination]] — CONTAINS: Eq. 3, 4, 6, DPLN model, Table 1, scenario results, covariance identification.
- [[Barker 2018 - Relative Abundance, Alder Flycatcher Example and Discussion]] — CONTAINS: Eq. 7-10, flycatcher models and Table 2, discussion, Python.

## Sources
- Barker 2018 - On the Reliability of N-Mixture Models for Count Data — Biometrics 74(1): 369-377, 9 pp.

## See Also
- [[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]], [[Concept - Closed-Population Capture-Recapture and Otis Models]], [[Concept - Marginalising Latent Discrete Counts for HMC]].
