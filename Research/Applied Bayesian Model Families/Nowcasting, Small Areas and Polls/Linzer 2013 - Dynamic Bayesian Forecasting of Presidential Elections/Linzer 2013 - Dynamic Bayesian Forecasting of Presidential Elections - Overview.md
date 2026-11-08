---
title: "Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections - Overview"
tags:
  - source/ingested
  - topic/nowcasting
  - type/overview
  - doc/paper
source: "[[raw/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections in the States.pdf]]"
source_location: "Whole paper, pp. 124-134 (JASA 108(501))"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections"
doc_type: paper
depends_on:
  - "[[Linear-Gaussian State-Space Models]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Linzer 2013 - Reverse Random-Walk Model and Priors]]"
  - "[[Linzer 2013 - Forecast Computation and Electoral College Simulation]]"
  - "[[Linzer 2013 - 2008 Application and Results]]"
  - "[[Linzer 2013 - Extensions - House Effects, Correlated Errors and Election-Night Updating (Concept Note)]]"
aliases:
  - "Linzer election forecasting overview"
---

# Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections - Overview

> [!summary]
> Linzer (2013, *JASA* 108(501): 124-134) unifies structural (fundamentals) election forecasts with state-level trial-heat polls in one dynamic Bayesian model. A historical forecast gives an informative prior for the Election-Day logit vote share in each state; a "reverse" random walk anchored on Election Day carries that prior back through the campaign, so each state's daily opinion is a compromise between polls and fundamentals, and forecasts move gradually from the latter to the former.

## Overview
**Problem.** Structural models use 10-15 past elections, forecast national shares, and cannot update; polls are noisy, uneven across states and days, and only informative near the election.

**Model in one line.** $y_k\sim\text{Binomial}(\pi_{i[k]j[k]},n_k)$, $\pi_{ij}=\text{logit}^{-1}(\beta_{ij}+\delta_j)$, reverse random walks on $\beta_{ij}$ and a national $\delta_j$, prior $\beta_{iJ}\sim N(\text{logit}(h_i),\tau_i^{-1})$ and the identifying restriction $\delta_J\equiv0$.

**Key results.** Applied to 1731 state polls in 2008: state-level mean absolute deviation (MAD) fell from the baseline (Time-for-Change early 3.4%, late 2.6%) to 1.4% on Election Day, 27 states within 1%; only Indiana mispredicted; 95% electoral-vote range 338-387 vs actual 365; the effective advantage appears 1-2 months ahead. Prior precision $\tau_i$ should not exceed 20.

## Motivating PyMC examples
[E40](https://redam94.github.io/pymc-challenges/examples.html) ("Who will win? Dynamic Bayesian poll aggregation and election forecasting", 2016 polls, Linzer reverse random walks from a fundamentals prior), [E94](https://redam94.github.io/pymc-challenges/examples.html) ("Ragged information: polls, fundamentals and money in the US midterms") and [E95](https://redam94.github.io/pymc-challenges/examples.html) ("Election night: updating a frozen forecast as the races are called"). The E40/E94 extensions are in [[Linzer 2013 - Extensions - House Effects, Correlated Errors and Election-Night Updating (Concept Note)]].

## Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| 1 Introduction | 124-125 | this note |
| 2 Background: electoral college, characteristics of trial-heat polls, current approaches | 125-126 | [[Linzer 2013 - Reverse Random-Walk Model and Priors]] (poll error sources) |
| 3 Dynamic Bayesian forecasting model (Eqs 1-3), windowing, MCMC | 126-128 | [[Linzer 2013 - Reverse Random-Walk Model and Priors]] |
| 3 Win probabilities and electoral-vote simulation | 128 | [[Linzer 2013 - Forecast Computation and Electoral College Simulation]] |
| 4.1-4.2 Data and structural forecasts (Time-for-Change, normal vote) | 128-129 | [[Linzer 2013 - 2008 Application and Results]] |
| 4.3-4.4 Updating forecasts, MAD, swing states, sensitivity to $\tau_i$ | 129-132 | [[Linzer 2013 - 2008 Application and Results]] |
| 4.5 Trends in voter preferences; 5 Discussion | 132-133 | [[Linzer 2013 - 2008 Application and Results]] |

## Connections
The latent daily $\beta_{ij}$ is a random-walk state observed through binomial polls; with Gaussian approximation this is a local-level state-space model ([[Linear-Gaussian State-Space Models]], [[The Kalman Filter]], [[The RTS Smoother]]). Pooling across states through $\delta_j$ is a hierarchical structure ([[Hierarchical Models]]).

## Relevance to marketing measurement
Combining an informative structural prior with noisy, unevenly sampled trackers is how one would blend an MMM-derived baseline with brand-tracker waves: the prior governs far-ahead forecasts, data take over as they accrue, and a common national shock separates market-wide movements from market-specific ones.

## See Also
[[Bayesian Structural Time-Series Model]]
