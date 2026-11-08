---
title: "Gostic 2020 - Practical Considerations for Measuring Rt - Overview"
tags:
  - source/ingested
  - topic/nowcasting
  - type/overview
  - doc/paper
source: "[[raw/Gostic 2020 - Practical Considerations for Measuring the Effective Reproductive Number Rt.pdf]]"
source_location: "Whole paper, pp. 1-21"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Gostic 2020 - Practical Considerations for Measuring Rt"
doc_type: paper
depends_on:
  - "[[Linear-Gaussian State-Space Models]]"
used_by:
  - "[[Gostic 2020 - Instantaneous vs Case Reproductive Number and the Three Estimators]]"
  - "[[Gostic 2020 - Generation Interval and the Renewal Equation]]"
  - "[[Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias]]"
  - "[[Gostic 2020 - Observation Process, Smoothing Windows and Recommendations]]"
aliases:
  - "Gostic Rt review"
---

# Gostic 2020 - Practical Considerations for Measuring Rt - Overview

> [!summary]
> Gostic et al. (2020, *PLoS Comput Biol* 16(12): e1008409) is a methods Perspective on estimating the effective reproductive number $R_t$ from surveillance data. Using synthetic SEIR data it recommends the Cori et al. (2013) instantaneous-$R_t$ estimator for real-time use and shows that the dominant errors come from the generation-interval specification, delays between infection and observation, right truncation, ascertainment and smoothing windows.

## Overview
**Why this source.** The primary reference for the renewal-equation $R_t$ model, Cori, Ferguson, Fraser & Cauchemez (2013, *Am J Epidemiol* 178(9):1505-12), is paywalled at the publisher and its mirrors block scripted download, so this open-access (CC0) Perspective, which re-derives and stress-tests the Cori estimator, is used as the substitute. Formulae for the Cori posterior are given from the original paper's well-known result and marked as such.

**Key result.** (i) Cori et al. accurately tracks the *instantaneous* $R_t$, even through abrupt changes; Wallinga-Teunis estimates the *case* (cohort) $R_t$, which leads $R_t$ by about one mean generation interval (about 8 days in the synthetic SEIR) and is biased low at the end of a truncated series; Bettencourt-Ribeiro is biased because it implicitly assumes an exponential generation interval. (ii) Naive lag fixes (backward convolution, shifting) blur or lag $R_t$; deconvolution or a forward observation model in the estimation is better. (iii) Intervals ignore ascertainment, delay and truncation uncertainty.

## Motivating PyMC examples
[E38](https://redam94.github.io/pymc-challenges/examples.html) (renewal-equation $R_t$ "as a triangular solve" on a nowcast, plus the spurious "wave is ending" from truncated data) and [E90](https://redam94.github.io/pymc-challenges/examples.html) (hospital thresholds and nowcasts). See [[Nowcasting Concepts - Delay Hazard Models and the Renewal Equation]].

## Source Map

| Paper section | Covered in |
|---|---|
| Abstract, Introduction, synthetic data design | this note; [[Gostic 2020 - Instantaneous vs Case Reproductive Number and the Three Estimators]] |
| Instantaneous vs case $R_t$; Cori, Bettencourt-Ribeiro, Wallinga-Teunis (Figs 1-2, S1-S2) | [[Gostic 2020 - Instantaneous vs Case Reproductive Number and the Three Estimators]] |
| Generation interval, renewal equation, serial interval (Fig 3) | [[Gostic 2020 - Generation Interval and the Renewal Equation]] |
| Delays to observation: shift, convolve, deconvolve (Figs 4-5, S3) | [[Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias]] |
| Right truncation | [[Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias]] |
| Incomplete observation; smoothing windows (Fig 6); Conclusions | [[Gostic 2020 - Observation Process, Smoothing Windows and Recommendations]] |

## Connections
Pairs with [[McGough 2020 - Nowcasting by Bayesian Smoothing - Overview]] (nowcast the incidence, then compute $R_t$) and the state-space notes [[Linear-Gaussian State-Space Models]] (a latent infection series with forward delays is a state-space model).

## Relevance to marketing measurement
The renewal idea (new events = current "infectiousness" times a time-varying rate) parallels adstock-style carry-over: today's response is a convolution of past exposure with a lag kernel. The warning that backward convolution blurs peaks and that deconvolution or a forward model is needed applies to inferring when a campaign's effect began.

## See Also
[[Bayesian Structural Time-Series Model]] · [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]
