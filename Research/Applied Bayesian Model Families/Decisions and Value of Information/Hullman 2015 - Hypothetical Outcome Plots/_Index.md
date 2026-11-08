---
title: "Index: Hullman 2015 - Hypothetical Outcome Plots"
tags:
  - type/index
  - source/ingested
  - topic/decision-analysis
parent: "[[../_Index|Decisions and Value of Information]]"
date_updated: 2026-11-08
concept_count: 6
---

# Hullman 2015 - Hypothetical Outcome Plots

> [!abstract] Routing Summary
> Fully captures Hullman, Resnick and Adar (2015), *Hypothetical Outcome Plots Outperform Error Bars and Violin Plots for Inferences about Reliability of Variable Ordering* (PLoS ONE 10(11): e0142444): the HOP idea, the 288-participant experiment, Tables 1-4, hypotheses H1-H4, limitations, and the analytic precision bound. 6 notes.
> - Need the paper on one page or the section map? -> [[Hullman 2015 - Hypothetical Outcome Plots - Overview]]
> - Need what a HOP is and the related work? -> [[Hullman 2015 - HOP Method and Related Work]]
> - Need the study design, Tables 1-3 or hypotheses? -> [[Hullman 2015 - Study Design and Distribution Tables]]
> - Need Table 4 and the test results? -> [[Hullman 2015 - Results and Mean Absolute Error]]
> - Need limitations or viewer strategies? -> [[Hullman 2015 - Discussion and Limitations]]
> - Need standard errors from $n$ frames or frame-rate guidance? -> [[Hullman 2015 - Precision of Inference from HOPs]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| HOP | [[Hullman 2015 - HOP Method and Related Work]] | definition | draws from a distribution | one draw per frame, animated |
| Hypotheses H1-H4 | [[Hullman 2015 - Study Design and Distribution Tables]] | definition | study design | HOPs win for joint questions |
| Tables 1-3 | [[Hullman 2015 - Study Design and Distribution Tables]] | example | normal draws | Pr(B>A) 59%, 76%, 96%, 85%; three-way 66% |
| Table 4 MAE | [[Hullman 2015 - Results and Mean Absolute Error]] | example | tables 1-3 | bivariate MAE 0.09-0.13 vs 0.35-0.63 |
| Limitations | [[Hullman 2015 - Discussion and Limitations]] | definition | results | seven limits |
| Mean and probability precision | [[Hullman 2015 - Precision of Inference from HOPs]] | theorem | CLT | $\sigma/\sqrt n$; $\sqrt{p(1-p)/n}$ |

## Notes

- [[Hullman 2015 - Hypothetical Outcome Plots - Overview]] — CONTAINS: aim, contribution, key results, motivating E16/E90, Source Map.
- [[Hullman 2015 - HOP Method and Related Work]] — CONTAINS: Def. HOP, pros/cons, related work, code.
- [[Hullman 2015 - Study Design and Distribution Tables]] — CONTAINS: apparatus, tasks, Tables 1-3, subjects and power, H1-H4.
- [[Hullman 2015 - Results and Mean Absolute Error]] — CONTAINS: Table 4 in full, hypothesis outcomes, time on task.
- [[Hullman 2015 - Discussion and Limitations]] — CONTAINS: interpretation, strategies, limitations 1-7.
- [[Hullman 2015 - Precision of Inference from HOPs]] — CONTAINS: Sec. 6.2 theorems, frame rate, verified numbers.

## Sources
- [[raw/Hullman Resnick Adar 2015 - Hypothetical Outcome Plots Outperform Error Bars and Violin Plots.pdf]] — PLoS ONE (CC BY), 25 pages.

## See Also
- [[Kay 2016 - When-ish is My Bus - Overview]], [[Value of Information Concept Note - Showing Uncertainty and Choosing a Display]].
