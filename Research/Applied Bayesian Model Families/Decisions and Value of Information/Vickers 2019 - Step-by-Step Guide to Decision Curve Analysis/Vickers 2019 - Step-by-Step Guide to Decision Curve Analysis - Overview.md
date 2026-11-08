---
title: "Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/overview
  - doc/paper
source: "[[raw/Vickers Van Calster Steyerberg 2019 - A Simple Step-by-Step Guide to Interpreting Decision Curve Analysis.pdf]]"
source_location: "Whole commentary, pp. 1-8 (Diagn Progn Res 3:18)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis"
doc_type: paper
depends_on:
  - "[[Decision Analysis]]"
used_by:
  - "[[Vickers 2019 - Net Benefit and Threshold Probability]]"
  - "[[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]]"
  - "[[Vickers 2019 - Ten Questions and Limits of Decision Curves]]"
aliases:
  - Vickers Van Calster Steyerberg 2019
  - Decision curve analysis guide
---

# Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview

> [!summary]
> Vickers, Van Calster and Steyerberg (2019, *Diagnostic and Prognostic Research* 3:18, open access CC BY 4.0) explain decision curve analysis (DCA), introduced by Vickers and Elkin (2006), by relabelling its axes: y is **benefit** and x is **preference**. A model or test is worth using if it has the highest net benefit across the range of clinically reasonable preferences. Key takeaway: net benefit is in units of true positives per patient, with false positives converted by the odds of the threshold probability.

## Overview

**Problem.** DCA is widely cited (over 1000 citations by May 2019) and endorsed by JAMA, BMJ, Annals of Internal Medicine, JCO and PLoS Medicine editorials, yet widely misunderstood; the paper reports that a well-respected epidemiologist said he had found only a couple of people who could explain what decision curves mean.

**Contribution.** A didactic five-step reading of one decision curve (a hypothetical prostate-biopsy study) plus answers to ten common questions. It deliberately does not teach how to compute curves ("readers are referred to ... Vickers and Elkin [1] ... and www.decisioncurveanalysis.org").

**Key results.**
- Net benefit $=\text{sensitivity}\times\text{prevalence}-(1-\text{specificity})\times(1-\text{prevalence})\times w$, with $w$ the odds at the threshold probability.
- A threshold of 10% means "missing a high-grade cancer is 9 times worse than doing an unnecessary biopsy" and a number-needed-to-test of 10.
- A net benefit of 0.07 means "7 true positives for every 100 patients".
- Do not pick a threshold from the curve; fix the reasonable range first, then compare strategies over it.

## Motivating PyMC examples

From <https://redam94.github.io/pymc-challenges/examples.html>:
- **E90 - Call it today or wait? Hospital thresholds, nowcasts and decision curves.** A nowcast is turned into a call-or-wait rule at hospital capacity thresholds, and strategies (call today, wait for more data, treat-all, treat-none) are compared with decision curves. The threshold probability plays the role of the harm/benefit exchange rate in this paper.
- **E91** and **E87** use the same logic of pricing a decision rule against the do-nothing and do-everything strategies.

## Main Content

### Source Map

| Paper section | Content | Covered in |
|---|---|---|
| Abstract, Introduction (pp. 1-2) | Aim, net benefit definition, citation context | this note and [[Vickers 2019 - Net Benefit and Threshold Probability]] |
| Example setup (p. 2) | Prostate biopsy, prevalence 10%, test (40%/90%), model AUC 0.79; Fig. 1 | [[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]] |
| Step 1 Benefit is good (p. 3) | Strategies: model, test, all, none; "intervention" defined | [[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]] |
| Step 2 Preference (p. 3-4) | "Worried about disease" to "worried about biopsy" axis | same |
| Step 3 Threshold probability (p. 4) | Odds, number-needed-to-test, Fig. 2, plausible range up to 20% | [[Vickers 2019 - Net Benefit and Threshold Probability]] |
| Step 4 Net benefit (p. 4) | Net profit analogy; units are true positives | [[Vickers 2019 - Net Benefit and Threshold Probability]] |
| Step 5 Interventions avoided (p. 4-5) | Net reduction in unnecessary interventions; Fig. 3 | [[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]] |
| Questions 1-10 (pp. 5-7) | Threshold unknown, treatment effect, size of difference, CIs, AUC vs NB, all/none, replacing CEA, choosing thresholds, clinic use, individual thresholds | [[Vickers 2019 - Ten Questions and Limits of Decision Curves]] |
| Conclusion, Abbreviations, declarations | PubMed counts 311 vs 95 (2017) | [[Vickers 2019 - Ten Questions and Limits of Decision Curves]] |

## Examples

See the verified numbers for the paper's setup in [[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]].

## Connections

- Relevance to marketing measurement: a churn or conversion model that triggers an expensive intervention (a discount, a call) is a threshold decision; "treat all" and "treat none" are the always-offer and never-offer policies, and net benefit puts a lift model on the same scale as a budget decision.
- Links: [[Decision Analysis]], [[From Inference to Decision]]. DCA is decision analysis with one parameter (the threshold range); EVPI/EVPPI add parameter uncertainty ([[Heath 2015 - Review of Expected Value of Information Methods - Overview]]).

## See Also
- [[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis/_Index|Index for this source]]
- [[Value of Information Concept Note - EVPI, EVPPI and EVSI]]
