---
title: "Index: Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis"
tags:
  - type/index
  - source/ingested
  - topic/decision-analysis
parent: "[[../_Index|Decisions and Value of Information]]"
date_updated: 2026-11-08
concept_count: 4
---

# Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis

> [!abstract] Routing Summary
> Fully captures Vickers, Van Calster and Steyerberg (2019), *A simple, step-by-step guide to interpreting decision curve analysis* (Diagn Progn Res 3:18, CC BY 4.0). 4 notes covering the net benefit formula, the five interpretive steps with a verified prostate example, and the ten FAQs.
> - Need the paper on one page or the section-to-note map? -> [[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview]]
> - Need the net benefit formula, threshold odds, or the utility derivation? -> [[Vickers 2019 - Net Benefit and Threshold Probability]]
> - Need the five steps, the prostate biopsy numbers, or runnable code? -> [[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]]
> - Need test harm, why AUC and net benefit differ, or how not to choose a threshold? -> [[Vickers 2019 - Ten Questions and Limits of Decision Curves]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Net benefit | [[Vickers 2019 - Net Benefit and Threshold Probability]] | definition | sensitivity, specificity, prevalence | $NB=\text{sens}\,\pi-(1-\text{spec})(1-\pi)w$ |
| Threshold probability | [[Vickers 2019 - Net Benefit and Threshold Probability]] | definition | utilities | $w=p_t/(1-p_t)$ |
| Utility justification | [[Vickers 2019 - Net Benefit and Threshold Probability]] | theorem | expected utility | $NB$ = rescaled expected utility |
| Treat-all, treat-none | [[Vickers 2019 - Net Benefit and Threshold Probability]] | definition | prevalence | treat-all crosses 0 at $p_t=\pi$ |
| Prostate biopsy curve | [[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]] | example | all of the above | model wins except thresholds below about 2-3% |
| Interventions avoided | [[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]] | example | net benefit | about 40 biopsies avoided per 100 at 10% |
| Test harm / trade-off | [[Vickers 2019 - Ten Questions and Limits of Decision Curves]] | definition | net benefit | subtract $1/N_{\text{perfect}}$ |
| FAQ 1-10 | [[Vickers 2019 - Ten Questions and Limits of Decision Curves]] | concept | all | threshold range first; calibration matters |

## Notes

- [[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview]] — CONTAINS: aim, contributions, motivating PyMC example E90, Source Map.
- [[Vickers 2019 - Net Benefit and Threshold Probability]] — CONTAINS: Def. net benefit, threshold, treat-all/none; utility derivation; net-profit analogy; treatment-effect-in-threshold example.
- [[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]] — CONTAINS: Steps 1-5, Figs 1-3 described, verified NB table, simulated model, Python.
- [[Vickers 2019 - Ten Questions and Limits of Decision Curves]] — CONTAINS: FAQ table, test harm, conclusion, limits.

## Sources
- Vickers Van Calster Steyerberg 2019 - A Simple Step-by-Step Guide to Interpreting Decision Curve Analysis — 8 pages. The original Vickers and Elkin (2006), *Med Decis Making* 26:565-574, is cited but not ingested (no legal open copy retrieved).

## See Also
- [[Heath 2015 - Review of Expected Value of Information Methods - Overview]], [[Decision Analysis]], [[From Inference to Decision]].
