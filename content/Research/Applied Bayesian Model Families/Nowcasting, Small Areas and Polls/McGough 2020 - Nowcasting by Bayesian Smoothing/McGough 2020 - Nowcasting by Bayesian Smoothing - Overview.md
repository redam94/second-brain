---
title: "McGough 2020 - Nowcasting by Bayesian Smoothing - Overview"
tags:
  - source/ingested
  - topic/nowcasting
  - type/overview
  - doc/paper
source: "[[raw/McGough 2020 - Nowcasting by Bayesian Smoothing.pdf]]"
source_location: "Whole paper, pp. 1-20"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/McGough 2020 - Nowcasting by Bayesian Smoothing"
doc_type: paper
depends_on:
  - "[[Linear-Gaussian State-Space Models]]"
  - "[[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]"
used_by:
  - "[[McGough 2020 - Reporting Triangle and Chain-Ladder Setup]]"
  - "[[McGough 2020 - NobBS Model and Priors]]"
  - "[[McGough 2020 - Evaluation Design and Results]]"
  - "[[McGough 2020 - Delay Dynamics, Moving Windows and Limitations]]"
aliases:
  - "NobBS overview"
---

# McGough 2020 - Nowcasting by Bayesian Smoothing - Overview

> [!summary]
> McGough, Johansson, Lipsitch & Menzies (2020, *PLoS Comput Biol* 16(4): e1007735) propose **NobBS**, a Bayesian log-linear chain-ladder nowcast whose weekly "true signal" follows a first-order (geometric) random walk and whose delay distribution has a Dirichlet prior. Linking cases across weeks makes nowcasts smoother and more robust than a pure delay-hazard model when the reporting delay drifts over time.

## Overview

**Research question.** Reported counts are right-truncated: events that occurred recently are only partly reported. How should we estimate the eventual total $N_t$ for the current week, with honest uncertainty, in settings where the share reported at delay 0 ranges from 4% (dengue, Puerto Rico) to >80% (US influenza-like illness)?

**Contribution.** (1) A simple model $\log\lambda_{t,d}=\alpha_t+\log\beta_d$ with $\alpha_t$ a random walk, i.e. an autocorrelated epidemic curve; (2) an R package (`NobBS`); (3) a benchmark against the Hoehle & an der Heiden (2014) reverse-time discrete hazard approach ("HH"), scored by the logarithmic score on 989 weeks of dengue and 170 weeks of ILI; (4) a simulation where the delay probability varies with incidence; (5) a moving-window sensitivity study.

**Key result.** Over the weeks both methods could predict, NobBS cut dengue rRMSE from 1.24 to 0.464 and roughly doubled the average log score (0.274 vs 0.161); for ILI the HH point estimate was slightly better (rRMSE 0.062 vs 0.074) but HH's intervals were too narrow (0% coverage vs 100%), so the NobBS average score was 0.218 vs 0.017.

## Motivating PyMC examples

The reporting-triangle nowcast in the PyMC example set is [E38](https://redam94.github.io/pymc-challenges/examples.html) ("Real-time epidemic tracking: is it growing right now? Nowcasting + a renewal-equation R") and [E90](https://redam94.github.io/pymc-challenges/examples.html) ("Call it today or wait? Hospital thresholds, nowcasts and decision curves"), both German COVID-19 hospitalisation triangles. Their delay-hazard parameterisation is the HH-style alternative to NobBS's multiplicative form; both are covered in [[McGough 2020 - Reporting Triangle and Chain-Ladder Setup]] and [[Nowcasting Concepts - Delay Hazard Models and the Renewal Equation]] (concept note, no raw source).

## Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| Abstract, Author summary, Introduction | 1-3 | this note; [[McGough 2020 - Reporting Triangle and Chain-Ladder Setup]] |
| Results: dengue and ILI performance (Figs 1-2, Tables 1-2) | 3-8 | [[McGough 2020 - Evaluation Design and Results]] |
| Results: reporting delays; time-varying delays; simulated ILI | 8-9 | [[McGough 2020 - Delay Dynamics, Moving Windows and Limitations]] |
| Results: performance by year (Table 3); moving windows | 9-10 | [[McGough 2020 - Evaluation Design and Results]]; [[McGough 2020 - Delay Dynamics, Moving Windows and Limitations]] |
| Discussion | 10-13 | [[McGough 2020 - Delay Dynamics, Moving Windows and Limitations]] |
| Methods: surveillance data, reporting triangle | 13 | [[McGough 2020 - Reporting Triangle and Chain-Ladder Setup]] |
| Methods: Bayesian nowcast model, priors, package | 13-16 | [[McGough 2020 - NobBS Model and Priors]] |
| Methods: HH comparator, metrics, log score, simulation | 16-18 | [[McGough 2020 - Evaluation Design and Results]] |
| Supporting information (S1-S6 tables, S1-S8 figs) | 18 | listed only; not reproduced |

## Connections

State-space view: the random-walk $\alpha_t$ is a local-level model observed through delay-thinned counts; see [[Linear-Gaussian State-Space Models]] and [[Bayesian Structural Time-Series Model]]. The log score is covered in [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]. Right truncation is a survival-analysis idea ([[Survival Analysis]]). Downstream use of nowcasts to estimate $R_t$: [[Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias]].

## Relevance to marketing measurement

Conversions, offline sales and survey responses also arrive with reporting lag (attribution windows, delayed store feeds). The same reporting-triangle thinking applies to "latest-week" dashboards in MMM and incrementality monitoring: the most recent weeks are systematically under-counted and should be nowcast, not read at face value.

## See Also
[[McGough 2020 - NobBS Model and Priors]] · [[Hierarchical Models]]
