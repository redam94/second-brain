---
title: "Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/overview
  - doc/paper
source: "[[raw/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes Review.pdf]]"
source_location: "Whole paper, pp. 1-27 (Stat. Sci. 2018 arXiv v2)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes"
doc_type: paper
depends_on:
  - "[[Reinhart 2018 - Hawkes Processes and Conditional Intensity]]"
used_by:
  - "[[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes/_Index|Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes]]"
aliases:
  - "Reinhart 2018 overview"
  - "Self-exciting point process review"
---

# Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes - Overview

> [!summary]
> Reinhart (2018, *Statistical Science*) reviews self-exciting spatio-temporal point processes (Hawkes processes and ETAS-type models): event rates that depend on the history of earlier events, so that events *trigger* further events. The paper unifies estimation (maximum likelihood, EM with branching structure), stochastic declustering, simulation, inference, Bayesian methods and diagnostics, and surveys earthquake, crime, epidemic and network applications. Key takeaway: the **cluster (branching) representation** with latent parent indicators $u_i$ drives EM, declustering, simulation and Bayesian sampling alike.

## Overview

**Research question.** How can we model, fit and check point-process data where events cluster because they cause each other (aftershocks, repeat burglaries, contagion), without aggregating to grid cells (the Modifiable Areal Unit Problem)?

**Contribution.** A synthesis of literature isolated within each application field: a common definition via the conditional intensity, a common likelihood, and a common toolbox.

**Key results (reviewed, not new).**
- Conditional intensity $\lambda(s,t) = \mu(s) + \sum_{i:t_i<t} g(s-s_i,t-t_i)$ ([[Reinhart 2018 - Hawkes Processes and Conditional Intensity]]).
- Log-likelihood $\ell(\Theta)=\sum_i \log\lambda(s_i,t_i) - \iint\lambda$; EM via triggering probabilities $\Pr(u_i=j)=g_{ij}/\lambda_i$ ([[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]]).
- Stochastic declustering (ZOV 2002, FLP, MISD) ([[Reinhart 2018 - Stochastic Declustering]]).
- Simulation by thinning or by the cluster representation; asymptotic vs bootstrap inference; thinning/Voronoi residual diagnostics ([[Reinhart 2018 - Simulation, Inference and Diagnostics]]).
- Applications: ETAS aftershocks ([[Reinhart 2018 - ETAS Earthquake Models and Omori Law]]), crime, epidemics, networks ([[Reinhart 2018 - Crime, Epidemic and Network Applications]]).

## Main Content

### Motivating PyMC examples
Source of the example list: <https://redam94.github.io/pymc-challenges/examples.html>.
- **E65** - Self-exciting point processes: Hawkes and ETAS aftershock forecasting (USGS ComCat, 2019 Ridgecrest sequence; conditional intensity, branching ratio, closed-form compensator, Omori-Utsu, Gutenberg-Richter b-value).
- **E07** - Geo-temporal events: induced earthquakes in Oklahoma (contrast: a log-Gaussian Cox process, which has *no* event-to-event triggering; see [[Simpson 2016 - Going Off Grid - Overview]]).

### Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| 1 Introduction (regression/MAUP, LGCP, cluster processes) | 1-3 | [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]] |
| 2.1 Hawkes processes, Poisson-cluster representation | 3-4 | [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]] |
| 2.2 Spatio-temporal form, $m=\iint g$ | 4-5 | [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]] |
| 2.3 Marks | 5-6 | [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]] |
| 2.4 Log-likelihood, Janossy density, integral approximations | 6-8 | [[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]] |
| 3.1 Maximum likelihood, EM, boundary effects | 9-10 | [[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]] |
| 3.2 Stochastic declustering (Alg. 1-3, MISD) | 11-14 | [[Reinhart 2018 - Stochastic Declustering]] |
| 3.3 Simulation (Alg. 4-5) | 14-16 | [[Reinhart 2018 - Simulation, Inference and Diagnostics]] |
| 3.4 Asymptotics, bootstrap (Alg. 6), partial likelihood | 16-17 | [[Reinhart 2018 - Simulation, Inference and Diagnostics]] |
| 3.5 Bayesian approaches | 17-18 | [[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]] |
| 3.6 Model selection and diagnostics (thinning, super-thinning, Voronoi residuals, Fig. 3) | 18-19 | [[Reinhart 2018 - Simulation, Inference and Diagnostics]] |
| 4.1 Earthquake / ETAS models | 19-22 | [[Reinhart 2018 - ETAS Earthquake Models and Omori Law]] |
| 4.2 Crime forecasting (Mohler) | 22-23 | [[Reinhart 2018 - Crime, Epidemic and Network Applications]] |
| 4.3 Epidemic forecasting (Meyer; Schoenberg) | 23-25 | [[Reinhart 2018 - Crime, Epidemic and Network Applications]] |
| 4.4 Events on social networks | 25-26 | [[Reinhart 2018 - Crime, Epidemic and Network Applications]] |
| 5 Conclusions (interpretation caveat) | 26 | [[Reinhart 2018 - Crime, Epidemic and Network Applications]] |
| Figures 1-3 | 4, 6, 20 | [[Reinhart 2018 - Hawkes Processes and Conditional Intensity]], [[Reinhart 2018 - Simulation, Inference and Diagnostics]] |

## Examples
See the worked branching-ratio and EM sketches in [[Reinhart 2018 - Likelihood, EM and Bayesian Estimation]] and the Ridgecrest-style ETAS PyMC sketch in [[Reinhart 2018 - ETAS Earthquake Models and Omori Law]].

## Connections
- Relevance to marketing measurement: self-excitation is the natural model for *bursty* user-level or event-level data (organic virality, retargeting cascades, repeat purchases, support-ticket storms). A Hawkes background $\mu$ plus triggering $g$ separates *exogenous* demand (what media can move) from *endogenous* word-of-mouth/contagion, which matters when attributing lift. Treat this as an analogy; the paper itself covers seismology, crime, epidemics and networks only.
- Contrasts with the Cox-process route: [[Simpson 2016 - Going Off Grid - Overview]] (random but not history-dependent intensity).
- Conditional-intensity likelihood parallels hazard modelling: [[Survival Analysis]].

## See Also
[[Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes/_Index|Reinhart 2018 - Self-Exciting Spatio-Temporal Point Processes]] | [[Hierarchical Models]] | [[Prior Predictive Checking]]
