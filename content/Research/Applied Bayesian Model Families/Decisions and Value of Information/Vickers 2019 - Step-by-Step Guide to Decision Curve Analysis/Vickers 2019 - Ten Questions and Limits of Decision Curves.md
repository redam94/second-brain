---
title: "Vickers 2019 - Ten Questions and Limits of Decision Curves"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/paper
source: "[[raw/Vickers Van Calster Steyerberg 2019 - A Simple Step-by-Step Guide to Interpreting Decision Curve Analysis.pdf]]"
source_location: "Common questions 1-10 and Conclusion, pp. 5-7"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis"
doc_type: paper
depends_on:
  - "[[Vickers 2019 - Five-Step Interpretation and Prostate Biopsy Example]]"
  - "[[Vickers 2019 - Net Benefit and Threshold Probability]]"
used_by:
  - "[[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview]]"
aliases:
  - DCA FAQ
  - Decision curve analysis limitations
---

# Vickers 2019 - Ten Questions and Limits of Decision Curves

> [!summary]
> Answers to ten frequent DCA questions: the threshold must come first; treatment effect is implicit in the threshold; any net-benefit gain is worth having in decision theory but test harm and trade-off matter; confidence intervals are not central; AUC and net benefit can disagree because net benefit needs calibration; and a decision curve is a research tool, not a bedside device.

## Overview

The second half of the paper is a question list. Each answer is condensed below with the paper's reasoning, followed by caveats for use outside medicine.

## Main Content

| # | Question | Answer in the paper |
|---|---|---|
| 1 | What if we do not know the threshold? | A threshold is necessary to use any model for decisions; if a 40% predicted risk has no known high/low meaning, the model cannot be used and DCA is redundant. |
| 2 | How is treatment effect taken into account? | Implicitly via the threshold: more effective treatment, lower threshold (heart-attack drug example: 10% relative risk reduction and 1% absolute side-effect risk gives 10%; 20% relative gives 5%). A version exists for models predicting treatment benefit rather than risk. |
| 3 | How much difference is enough? | Classical theory says any improvement counts. But time and trouble of obtaining inputs is ignored. Two remedies: formal **test harm** (reciprocal of the number of patients subjected to the test to find one true case with a perfect test, subtracted from NB) or informal judgement with **test trade-off** (e.g. is it worth calculating the model for 100 patients to prevent 39 biopsies, or 5 biopsies relative to the test). |
| 4 | Confidence intervals or p-values? | Not important in classical decision theory: choose the highest expected utility irrespective of significance (30- vs 35-minute bus routes). CIs may help decide whether more research is needed; methods exist (ref. [7]). |
| 5 | How can a model be harmful if AUC > 0.5? | NB depends on calibration as well as discrimination. Dividing all predicted risks by 10 leaves AUC unchanged but tells a 40%-risk patient he is at 4%, so he declines biopsy. |
| 6 | Why compare with treat-all/none? | They are reasonable policies. Nam et al. found a prostate model had lower NB than biopsying all elevated-risk men because it underestimated risk. |
| 7 | Can DCA substitute for cost-effectiveness analysis? | It needs fewer parameters (only the range of thresholds) but simplifies. If clear (no benefit), it may obviate fuller analysis; if equivocal, do a full decision analysis. |
| 8 | Can the curve choose the best threshold? | No: "This reverses the relationship". Fix a reasonable range first, then check the model wins across it. |
| 9 | How to use it in the clinic? | It does not; like a trial p-value, it evaluates the model, which is then used in shared decision making without looking back at the curve. |
| 10 | Need individual threshold before using a model? | No: if one model is best over the whole reasonable range, use it irrespective of the patient's preference. If best only over part of the range, call it unproven or valid for specific preferences. A formal analysis could elicit thresholds and integrate over their distribution. |

> [!definition] Test harm and test trade-off
> *Test harm* $=1/N_{\text{perfect}}$ where $N_{\text{perfect}}$ is the number of patients one would subject to the model/test, if it were perfect, to find one true case; subtract it from $NB$. *Test trade-off* is the informal version: the number of extra tests accepted per intervention avoided.
^def-test-harm

**Conclusion of the paper.** A PubMed search for "decision analysis" restricted to 2017 gave 311 papers, while "decision curve analysis" gave 95, so DCA is responsible for an important increase in the use of decision analysis. The authors say the confusion "centers on the metric rather than the methodology": "Calculating a decision curve requires only the most trivial math".

**Limits (from the answers, plus this vault's reading).**
- The curve answers "which policy is best on average over the evaluated population", not "what should I do for this person".
- It assumes a single threshold per decision-maker, constant benefit/harm ratio, and calibrated risks; uncertainty about calibration is not propagated unless you add it (that is where VoI enters, see [[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]]).
- No statistical test by design; with small samples the curve is noisy and optimism-biased unless cross-validated.

## Examples

Q8 as a trap in marketing: "the model beats treat-all between 0.3 and 0.4, so we should target at 0.3" is the same reversal; first derive the break-even from margin and offer cost (threshold $=$ cost/(cost+margin) for a simple offer), then check the model wins across plausible values.

## Connections
- [[Decision Analysis]]; calibration relevance: [[Posterior Predictive Checking]].

## See Also
- [[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview]]
