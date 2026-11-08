---
title: "McGough 2020 - Evaluation Design and Results"
tags:
  - source/ingested
  - topic/nowcasting
  - type/example
  - doc/paper
source: "[[raw/McGough 2020 - Nowcasting by Bayesian Smoothing.pdf]]"
source_location: "Results (Figs 1-2, Tables 1-3), Methods: performance metrics, pp. 3-10, 16-17"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/McGough 2020 - Nowcasting by Bayesian Smoothing"
doc_type: paper
depends_on:
  - "[[McGough 2020 - NobBS Model and Priors]]"
  - "[[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]"
used_by:
  - "[[McGough 2020 - Delay Dynamics, Moving Windows and Limitations]]"
aliases:
  - "NobBS results"
  - "nowcast scoring"
---

# McGough 2020 - Evaluation Design and Results

> [!summary]
> NobBS and the HH reverse-time hazard model were run weekly on dengue (989 weeks) and ILI (170 weeks) with moving windows of 104 and 27 weeks. On dengue NobBS dominated; on ILI HH had slightly better point errors but wildly overconfident intervals. The metric of record is the logarithmic score, reported as its exponential (average probability assigned to the true bin).

## Overview
Because a nowcast is a distribution, the primary metric is the **log score** (see [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]). Point metrics and 95% PI coverage are secondary.

## Main Content

> [!definition] Metrics
> With truth $y_i$ and point estimate $x_i$: $\text{MAE}=\frac1n\sum|y_i-x_i|$, $\text{RMSE}=\sqrt{\frac1n\sum(y_i-x_i)^2}$, $\text{rRMSE}=\sqrt{\frac1n\sum((y_i-x_i)/y_i)^2}$. Change accuracy: $\text{MAE}_\Delta=\frac1{n-1}\sum_{i\ge2}|(x_i-x_{i-1})-(y_i-y_{i-1})|$ and $\text{RMSE}_\Delta$ analogously. Smoothness: lag-1 autocorrelation of nowcasts $\rho_a$ vs of cases $\rho_c$. ^def-metrics

> [!definition] Binned logarithmic score
> The predictive distribution is binned (width 25 cases for dengue, 1000 for ILI); the score is $\ln p_i$ for the bin containing the truth, floored at $-10$ when $p_i\le e^{-10}$. The reported "average score" is $\exp(\overline{\ln p_i})$, the geometric mean probability on the realised bin. Example: truth 115 in bin [100,125) with probability 0.4 gives $\ln0.4=-0.92$. Scores are not comparable across diseases (different bin widths). ^def-log-score

**Table 1 (reproduced).**

| Disease (mean % at $d=0$) | Model | Period | % weeks predicted | Avg score | MAE | RMSE | rRMSE | 95% PI cov. |
|---|---|---|---|---|---|---|---|---|
| Dengue (4%) | NobBS | full | 100% | 0.349 | 16 | 37.6 | 0.600 | 0.87 |
| | NobBS | $\ge1$ case in week 0 | | 0.274 | 21 | 46.6 | 0.464 | 0.85 |
| | HH | full (0 imputed) | 55% | n/a | 32 | 57.4 | 1.14 | n/a |
| | HH | $\ge1$ case in week 0 | | 0.161 | 37 | 68.1 | 1.24 | 0.90 |
| Influenza (82%) | NobBS | full | 100% | 0.218 | 693 | 987.8 | 0.074 | 1.00 |
| | HH | full | 100% | 0.017 | 609 | 916.2 | 0.062 | 0.00 |

**Table 2 (change in weekly incidence, as printed).**

| Series | Model | Period | $\text{MAE}_\Delta$ | $\text{RMSE}_\Delta$ | $\rho_a$ | $\rho_c$ |
|---|---|---|---|---|---|---|
| Dengue | NobBS | full | 17 | 35.8 | 0.876 | 0.958 |
| Dengue | NobBS | $\ge1$ case at $d=0$ | 23 | 45.2 | | |
| Dengue | HH | full | 34 | 64.6 | 0.631 | 0.958 |
| Dengue | HH | $\ge1$ case at $d=0$ | 50 | 88.2 | | |
| ILI | NobBS | full | 669 | 1027.1 | 0.973 | 0.972 |
| ILI | HH | full | 612 | 1004.2 | 0.970 | 0.972 |

(The paper's running text quotes 23 / 35.8 for NobBS and 50 / 64.6 for HH in the subset comparison, which mixes columns of the table; the table above is the PDF text-extraction order and may be mis-aligned by one row.) NobBS nowcasts are far smoother than HH on dengue ($\rho_a$ 0.876 vs 0.631) and track weekly change about twice as well; for ILI the two are similar.

**Table 3 (by year, highlights).** Annual dengue average scores are highest in low-incidence years (NobBS 0.72 in 2000, 0.83 in 2002, 0.77 in 2006) and lowest in 1994 (0.171), 2007 (0.102) and 2010 (0.055); HH is lower every year (e.g. 0.108, 0.066, 0.041). In these three epidemic seasons predictive distributions rarely contained the truth because of large over- or under-estimates.

## Examples

> [!example] Reading the ILI result
> NobBS point RMSE (987.8) is worse than HH (916.2) yet its score is 13 times higher. HH intervals were so narrow that 0% of 170 truths fell inside the 95% PI, so almost all probability mass missed the true bin and the floor of $-10$ applied often. NobBS's wide intervals gave conservative (100%) coverage at 95%, although narrower deciles were better calibrated (S1 Fig). Lesson: judge nowcasts by a proper score, not RMSE alone. ^ex-ili-score

## Connections
Model: [[McGough 2020 - NobBS Model and Priors]]. For why performance drops when delays shift: [[McGough 2020 - Delay Dynamics, Moving Windows and Limitations]]. Calibration culture: [[Bayesian Workflow - Overview]].

## See Also
[[McGough 2020 - Nowcasting by Bayesian Smoothing - Overview]]
