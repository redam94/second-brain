---
title: "McGough 2020 - Delay Dynamics, Moving Windows and Limitations"
tags:
  - source/ingested
  - topic/nowcasting
  - type/concept
  - doc/paper
source: "[[raw/McGough 2020 - Nowcasting by Bayesian Smoothing.pdf]]"
source_location: "Results (time-varying delays, windows), Discussion, Methods (simulated ILI), pp. 8-13, 17-18"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/McGough 2020 - Nowcasting by Bayesian Smoothing"
doc_type: paper
depends_on:
  - "[[McGough 2020 - NobBS Model and Priors]]"
  - "[[McGough 2020 - Evaluation Design and Results]]"
used_by:
  - "[[Nowcasting Concepts - Delay Hazard Models and the Renewal Equation]]"
aliases:
  - "nowcast moving window"
  - "time-varying reporting delay"
---

# McGough 2020 - Delay Dynamics, Moving Windows and Limitations

> [!summary]
> Nowcast quality depends on (i) how much is reported at delay 0 and (ii) whether the delay distribution drifts. NobBS is robust to drift because the random walk anchors estimates to recent cases, but it still assumes one $\beta$ per window, and short windows trade better delay tracking for a volatile random-walk variance.

## Overview
Sections covered: "Reporting delays impact nowcast performance", "NobBS improves nowcasting with varying reporting delays", moving-window experiments, Simulated ILI data, and the Discussion.

## Main Content

**Delay-0 share.** Only ~4% of dengue cases were processed in the week of onset, versus >80% for ILI. Point accuracy was higher for ILI, since a large fraction already observed leaves less to predict. Sudden jumps in initial reports from low values (e.g. +16 and +17 cases on 3 Aug 1998 and 16 Aug 2010 after weeks averaging changes of 2.6 and 1.8) caused overestimates corrected the next week.

> [!example] Simulated time-varying delay (ILI)
> Keep the true final ILI counts but draw $\Pr(d=0)\sim U(0.2,0.9)$ in weeks above the mean (14,000 cases) and $U(0,0.65)$ in weeks at or below it ("faster reporting during outbreaks"); remaining cases spread over delays 1-52 with NB(0.9, 0.4). Results (S2/S3 Tables, text): NobBS average score 0.06 vs HH $\approx0$, rRMSE 0.302 vs 0.621. Swapping the uniforms would simulate slower reporting in busy weeks (backfill). ^ex-sim-ili

> [!theorem] Moving-window trade-off (empirical finding)
> A window of $W$ weeks fits $\beta$ and $\tau_\alpha$ on recent data only. Dengue with $W=5$ gave rRMSE 7.381 (steep overestimates in 2007-08, 2010); windows of 12, 27 and 104 weeks gave rRMSE 0.6-0.655 and average score 0.35-0.37. Short windows track $\beta$ better (S8A) but make $\tau_\alpha$ highly variable (S8B), which hurts under extreme time-varying delays. ^finding-window

**Why NobBS beats HH under drift.** HH can model a time-varying delay only through pre-specified change points, which are unknown in real time; its smooth-epidemic option is bundled with that change-point model. NobBS instead conditions on previous weeks' cases. It does *not* model temporal change in $\beta$ itself; extensions: P-spline time-varying delays (ref. 21), covariates in the log-linear predictor (Bastos et al., ref. 16), or the delay-hazard with weekday and drift effects of the PyMC examples (see [[Nowcasting Concepts - Delay Hazard Models and the Renewal Equation]]).

**Limitations.** Delay distribution fixed within window; smoothing prior can lag genuine abrupt change; log-score floor of $-10$ and binning make scores bin-width dependent; only two diseases; ILI delays >6 months excluded; coverage conservative (100%) for ILI at 95%.

## Examples
Practical guidance: prior on $\tau_\alpha$ controls smoothness (Ga(10,0.1) = smoother); Dirichlet $\theta$ strength = pseudo-case count; choose $W$ from data length and desired reactivity; feed nowcasts rather than first-release counts to forecasters (e.g. CDC FluSight).

## Connections
Marketing: attribution windows behave like $\beta_d$; a model that learns $\beta_d$ from fully matured cohorts and corrects the latest weeks avoids reading dashboards that "decline" only because data are immature.

## See Also
[[McGough 2020 - Nowcasting by Bayesian Smoothing - Overview]] · [[McGough 2020 - Evaluation Design and Results]]
