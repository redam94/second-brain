---
title: "Index: Hoff 2002 - Latent Space Approaches to Social Network Analysis"
tags:
  - type/index
  - source/ingested
  - topic/spatial-point-processes
parent: "[[../_Index|Point Processes, Spatial Fields and Networks]]"
date_updated: 2026-11-08
concept_count: 6
---

# Hoff 2002 - Latent Space Approaches to Social Network Analysis

> [!abstract] Routing Summary
> Full capture of Hoff, Raftery and Handcock (2002), *Latent space approaches to social network analysis* (JASA 97(460):1090-1098), plus a concept note on stochastic block models and network posterior predictive checks (folder `Network Outcome Models Concept Notes`).
> - Need the paper on one page, PyMC example E21, section map? -> [[Hoff 2002 - Latent Space Models Overview]]
> - Need the distance and projection model definitions, $d_k$ representability? -> [[Hoff 2002 - Distance and Projection Models]]
> - Need the likelihood, non-concavity, Procrustes MCMC? -> [[Hoff 2002 - Likelihood Estimation and Procrustes MCMC]]
> - Need the monk, Florentine, classroom results and tables? -> [[Hoff 2002 - Monks Florentine Families and Classroom Examples]]
> - Need discussion, extensions, SBM/MDS contrast? -> [[Hoff 2002 - Discussion Extensions and Stochastic Blockmodel Contrast]]
> - Need SBM / mixed-membership / degree-corrected / network PPCs? -> [[Network Outcome Models - Stochastic Block Models and Network Checks]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Latent distance / projection model | [[Hoff 2002 - Distance and Projection Models]] | definition | none | $\text{logit}\,p=\alpha+\beta^\top x-|z_i-z_j|$ |
| Procrustes MCMC | [[Hoff 2002 - Likelihood Estimation and Procrustes MCMC]] | theorem | distance model | positions identified up to rigid motion |
| Examples | [[Hoff 2002 - Monks Florentine Families and Classroom Examples]] | example | estimation | monks: -66.02 (34 par.) vs SBM -82.12 (37) |
| Discussion | [[Hoff 2002 - Discussion Extensions and Stochastic Blockmodel Contrast]] | concept | examples | clustered priors, dyad dependence |
| SBM and checks | [[Network Outcome Models - Stochastic Block Models and Network Checks]] | concept | none | $P(y_{ij}=1)=\pi_i^\top B\pi_j$ |

## Notes

- [[Hoff 2002 - Latent Space Models Overview]] — CONTAINS: question, contributions, E21 link, Source Map.
- [[Hoff 2002 - Distance and Projection Models]] — CONTAINS: eq. 1-3, $d_k$ representability, projection model, simulation and PyMC sketch.
- [[Hoff 2002 - Likelihood Estimation and Procrustes MCMC]] — CONTAINS: eq. 4, concavity statement, Procrustes definition and MCMC procedure, code.
- [[Hoff 2002 - Monks Florentine Families and Classroom Examples]] — CONTAINS: Tables 1-2, Figs. 1-5 narrative, reciprocity checks.
- [[Hoff 2002 - Discussion Extensions and Stochastic Blockmodel Contrast]] — CONTAINS: advantages, extensions, MDS contrast.
- [[Network Outcome Models - Stochastic Block Models and Network Checks]] — CONTAINS: SBM, MMSBM, DC-SBM, PPCs; concept note.

## Sources
Hoff 2002 - Latent Space Approaches to Social Network Analysis (scanned author-site copy; read page by page).

## See Also
[[Social Network Models]] | [[Research/Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes/_Index|Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes]]
