---
title: "Index: Gostic 2020 - Practical Considerations for Measuring Rt"
tags:
  - type/index
  - source/ingested
  - topic/nowcasting
parent: "[[../_Index|Nowcasting, Small Areas and Polls]]"
date_updated: 2026-11-08
concept_count: 4
---

# Gostic 2020 - Practical Considerations for Measuring Rt

> [!abstract] Routing Summary
> Full capture of Gostic et al. (2020), PLoS Comput Biol 16(12): e1008409, used as the open substitute for Cori et al. (2013). 5 notes.
> - Need the paper on a page and section map? -> [[Gostic 2020 - Practical Considerations for Measuring Rt - Overview]]
> - Need $R_t$ definitions, Cori posterior, Wallinga-Teunis, Bettencourt-Ribeiro? -> [[Gostic 2020 - Instantaneous vs Case Reproductive Number and the Three Estimators]]
> - Need the renewal equation, generation vs serial interval, bias? -> [[Gostic 2020 - Generation Interval and the Renewal Equation]]
> - Need delays, deconvolution, right truncation? -> [[Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias]]
> - Need ascertainment, smoothing windows, recommendations? -> [[Gostic 2020 - Observation Process, Smoothing Windows and Recommendations]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Instantaneous vs case $R_t$ | [[Gostic 2020 - Instantaneous vs Case Reproductive Number and the Three Estimators]] | definition | renewal equation | case $R_t$ leads by about one mean GI |
| Generation-interval bias | [[Gostic 2020 - Generation Interval and the Renewal Equation]] | theorem | renewal equation | bias grows away from $R_t=1$ |
| Delay and truncation | [[Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias]] | concept | forward delay | backward convolution over-smooths |
| Smoothing window | [[Gostic 2020 - Observation Process, Smoothing Windows and Recommendations]] | concept | Cori estimator | report at midpoint |

## Notes
- [[Gostic 2020 - Practical Considerations for Measuring Rt - Overview]] — CONTAINS: summary, substitution note, Source Map.
- [[Gostic 2020 - Instantaneous vs Case Reproductive Number and the Three Estimators]] — CONTAINS: definitions, Cori posterior, worked numbers, Python.
- [[Gostic 2020 - Generation Interval and the Renewal Equation]] — CONTAINS: intrinsic vs observed GI, serial interval, bias.
- [[Gostic 2020 - Rt Estimation Pipeline and Right-Truncation Bias]] — CONTAINS: forward delay, shift/convolve/deconvolve table, truncation.
- [[Gostic 2020 - Observation Process, Smoothing Windows and Recommendations]] — CONTAINS: ascertainment, window rule, recommendations.

## Sources
- [[raw/Gostic 2020 - Practical Considerations for Measuring the Effective Reproductive Number Rt.pdf]]

## See Also
[[McGough 2020 - Nowcasting by Bayesian Smoothing - Overview]]
