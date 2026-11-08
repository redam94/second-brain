---
title: "Linzer 2013 - 2008 Application and Results"
tags:
  - source/ingested
  - topic/nowcasting
  - type/example
  - doc/paper
source: "[[raw/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections in the States.pdf]]"
source_location: "Sec. 4 (4.1-4.5) and Sec. 5, Figs 1-8, pp. 128-134"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections"
doc_type: paper
depends_on:
  - "[[Linzer 2013 - Reverse Random-Walk Model and Priors]]"
  - "[[Linzer 2013 - Forecast Computation and Electoral College Simulation]]"
used_by:
  - "[[Linzer 2013 - Extensions - House Effects, Correlated Errors and Election-Night Updating (Concept Note)]]"
aliases:
  - "2008 election forecast results"
---

# Linzer 2013 - 2008 Application and Results

> [!summary]
> The model was re-run nine times through the 2008 campaign (16, 14, ..., 2 weeks out, and Election Day) on 1731 state polls, with two different fundamentals priors. Polls steadily cut the state-level error; by Election Day the MAD was 1.4% and only Indiana was called wrongly, with a 95% electoral-vote range of 338-387 around the actual 365.

## Overview
Sections 4.1-4.5 and 5: data, structural priors, updating, uncertainty calibration, campaign dynamics and discussion.

## Main Content

**Data (4.1).** 1731 public state polls (Pollster.com), 150+ firms; the seven most active (Rasmussen, SurveyUSA, Quinnipiac, Research 2000, Zogby, American Research Group, PPP) produced 64%; median poll 600 respondents; 91% expressed a major-party preference. More than half of polls fell in the last two months. Florida and Ohio each 113 polls, Pennsylvania 101, North Carolina 85; fewer than 10 in Hawaii, Delaware, Maryland, Vermont, Idaho, Nebraska.

**Structural priors (4.2).**

| Prior | Construction | Baseline error | $\tau_i$ |
|---|---|---|---|
| Time-for-Change, early (up to 6 months out) | national share from change in Q1 GDP, March approval; 56.8% Obama predicted (actual 53.7%); state $h_i$ = Kerry 2004 share + 8%, +6% home-state adjustments | MAD 3.4% | 10 |
| Time-for-Change, late (about 10 weeks out) | Q2 GDP growth, June approval, party-terms dummy; 54.3%; +5.5% shift | MAD 2.6% | 20 |
| Normal vote | $h_i$ = mean Democratic share of 1992-2004 | bias -1.8%, MAD 4.2% | 10 |

Time-for-Change fitted on 15 previous elections. Home-state adjustment of 6% (Holbrook 1991; Campbell 1992; Lock & Gelman 2010) for Hawaii and Texas (+) and Arizona and Massachusetts (-).

**Updating (4.3).** Polls in the final 6 months, first forecast with 4 months to go; $W=3$-day windows for $\beta$.

> [!theorem] Result summary
> - Polls reduce the MAD of state forecasts monotonically; largest gains in the last 6 weeks, but even 4-month-old polls cut the early Time-for-Change MAD by 0.3% and normal-vote MAD by 1%. By Election Day both priors give MAD 1.4%, with 27 states within 1% of the outcome.
> - Winners: Time-for-Change alone mispredicted 7 states early and 4 late (Arkansas, Indiana, Missouri, North Carolina); normal vote 9; the poll model on Election Day only Indiana (Obama's vote lay within its 90% HPD).
> - Election Day 90% intervals: Florida 50.1-51.9% (actual 51.4%); Indiana 48.4-50.5%. Florida HPD half-width fell from 3.5% to 2.6% between 2 months and 1 month out; Indiana 3.6% to 2.8%.
> - Electoral College: with 2 months left within 6 votes of the final outcome; Election Day 95% range 338-387 versus actual 365; normal-vote prior gave 87% win probability two months out and >99% on Election Day (311-378). Lock & Gelman (2010) had 250-450 from a single set of 9-month-old polls. ^thm-linzer-2008

**Calibration (4.4).** With $\tau=10$ early and 20 late, 90% intervals contained the outcome in 80-90% of states in the final two weeks, despite house effects; coverage fell for $\tau_i>20$ and is worse under the normal-vote prior. Missed intervals concentrate in sparsely polled (hence uncompetitive) states. Swing states (10-90%) shrank during the campaign; large states Florida, Ohio, Virginia were near-certain a month out; Missouri, Montana, North Carolina, Indiana were identifiable early.

**Trends (4.5).** Opinion moved far less than polls: Wyoming's $\hat\pi_{ij}$ ranged 4.6% over six months, Alaska 10%; 98% of daily changes <0.5%; poll variance was 3-5 times that of $\hat\pi_{ij}$. Most movement was national ($\hat\delta_j<0$ for most of the campaign), evening out about 4 weeks before the election, after which states diverged. Notable $\delta_j$ moves coincide with campaign events (e.g. the Palin pick and Republican convention).

**Discussion (5).** Forecast at the state level; forecasts can be stable; treat reports of daily opinion changes of more than a few tenths of a percent with suspicion; the biggest gains arrive 1-2 months out because early polls are noisy.

## Examples

> [!example] Reading calibration
> If 90% intervals cover the truth in 80% of 50 states, the empirical coverage is 40 states vs the nominal 45; the shortfall of 5 states is the cost of ignoring house effects and non-sampling error, which the paper accepts for sparsely polled states. Fitting a house-effect term, or inflating variance, targets this (see the concept note). ^ex-coverage

## Connections
Interval calibration echoes simulation-based checks in [[Bayesian Workflow - Overview]].

## See Also
[[Linzer 2013 - Dynamic Bayesian Forecasting of Presidential Elections - Overview]]
