---
title: "Gostic 2020 - Observation Process, Smoothing Windows and Recommendations"
tags:
  - source/ingested
  - topic/nowcasting
  - type/concept
  - doc/paper
source: "[[raw/Gostic 2020 - Practical Considerations for Measuring the Effective Reproductive Number Rt.pdf]]"
source_location: "Sec. 'Incomplete observation', 'Smoothing', Fig 6, Conclusions, pp. 14-19"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Gostic 2020 - Practical Considerations for Measuring Rt"
doc_type: paper
depends_on:
  - "[[Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias]]"
used_by:
  - "[[Gostic 2020 - Practical Considerations for Measuring Rt - Overview]]"
aliases:
  - "Rt smoothing window"
  - "ascertainment bias in Rt"
---

# Gostic 2020 - Observation Process, Smoothing Windows and Recommendations

> [!summary]
> Constant under-ascertainment leaves $R_t$ point estimates unbiased but intervals too narrow; changing ascertainment biases them. Smoothing windows trade noise for lag: report $R_t$ at the window midpoint and choose the width by leave-future-out log score. The paper recommends Cori for real time and stresses structured surveillance.

## Overview
Covers the last sections: incomplete observation, day-of-week and stochastic reporting noise, window choice, overfitting, and conclusions with bullet recommendations.

## Main Content

> [!theorem] Ascertainment (qualitative result)
> If the fraction of infections observed is constant in time and representative, the $R_t$ ratio estimators are unbiased because the fraction cancels in $I_t/\Lambda_t$; but credible intervals ignore ascertainment uncertainty (false precision). Time-varying testing effort, criteria or hospital capacity are read as changes in $R_t$. Mitigation: model testing effort, flag estimates after changes in data collection, prefer sentinel/structured data. ^thm-ascertainment

> [!definition] Smoothing window and lag
> The Cori window of $w$ days pools data to estimate $R_t$. Reporting $R_t$ on the *last* date of the window (Cori's convention) uses only past data and lags the true value; reporting at the *midpoint* is temporally accurate but sacrifices the final $w/2$ days. Short windows pick up noise; long windows over-smooth real changes (Fig 6). Choose $w$ by short-term predictive accuracy, e.g. leave-future-out validation minimising the one-step-ahead log score or a ranked probability score; time-varying windows possible. ^def-window

**Recommendations (Box-style bullets).** Use Cori for the instantaneous $R_t$; Wallinga-Teunis only retrospectively or for individual covariates; avoid Bettencourt-Ribeiro as-is; specify the intrinsic generation interval carefully; infer infections by deconvolution or a joint forward model; adjust or drop right-truncated days; propagate delay, truncation and ascertainment uncertainty; require daily counts large enough for a small window. Future work: inferring infections under uncertain delays; EpiNow2 extensions; sentinel populations.

## Examples

> [!example] Window midpoint rule
> A 7-day window ending at day 100 has midpoint 97. Reporting at 97 means the latest displayable day is $T-3$, so the estimate for the most recent three days is withheld, but a drop in transmission on day 90 is seen on about day 90-93 rather than 97-100. ^ex-window

## Connections
Marketing: weekly smoothing of response curves and "report-at-end-of-window" dashboards share the lag artifact. Window selection by one-step-ahead log score is the same device as time-series cross-validation ([[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]).

## See Also
[[Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias]]
