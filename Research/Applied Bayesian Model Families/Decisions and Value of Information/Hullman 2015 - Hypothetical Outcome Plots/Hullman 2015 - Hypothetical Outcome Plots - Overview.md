---
title: "Hullman 2015 - Hypothetical Outcome Plots - Overview"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/overview
  - doc/paper
source: "[[raw/Hullman Resnick Adar 2015 - Hypothetical Outcome Plots Outperform Error Bars and Violin Plots.pdf]]"
source_location: "Whole paper, PLoS ONE 10(11):e0142444, pp. 1-25"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Hullman 2015 - Hypothetical Outcome Plots"
doc_type: paper
depends_on:
  - "[[Decision Analysis]]"
used_by:
  - "[[Hullman 2015 - HOP Method and Related Work]]"
  - "[[Hullman 2015 - Study Design and Distribution Tables]]"
  - "[[Hullman 2015 - Results and Mean Absolute Error]]"
  - "[[Hullman 2015 - Precision of Inference from HOPs]]"
aliases:
  - Hullman Resnick Adar 2015
  - Hypothetical outcome plots paper
---

# Hullman 2015 - Hypothetical Outcome Plots - Overview

> [!summary]
> Hullman, Resnick and Adar (PLoS ONE 2015, CC BY) introduce **Hypothetical Outcome Plots (HOPs)**, animations that show one draw per frame from a distribution, and test them against error bars and violin plots on 288 Mechanical Turk participants. For questions about two or three variables (for example Pr(B > A)), HOPs have far lower mean absolute error (about 0.09-0.14 versus 0.35-0.63); for one variable the three are comparable, with HOPs worse only at estimating a mean when variance is high.

## Overview

**Problem.** Error bars are widely misread even by experts. In the opening example (Fig. 1) 96 viewers estimated Pr(B > A) from two error bars where the truth was 75%; over half underestimated by 0.5, many guessing near 0.2-0.25.

**Contribution.** HOPs: (1) draw a sample of hypothetical outcomes; (2) make one plot per draw as a frame of an animation with play/pause/step controls. Viewers think in counts of outcomes instead of abstract probabilities and need no extra marks or encodings. A controlled experiment with nine tasks per subject, and an analytic bound on HOP precision (Sec. 6.2).

**Key results.** HOPs beat violin plots and error bars on all four bivariate tasks and the trivariate task (p_adj < 0.001); similar accuracy for most univariate tasks; worse for the mean at high variance and for the between-thresholds probability at high variance.

## Motivating PyMC examples

From <https://redam94.github.io/pymc-challenges/examples.html>:
- **E16 - Showing uncertainty: one posterior, twenty displays.** Includes "why a band is not a set of curves, spaghetti, animated hypothetical outcome plots": the posterior draws that a HOP animates are the same draws a spaghetti plot overlays, and bivariate joint-draw questions (correlated uncertainty) are the case where HOPs win.
- **E90**: a ranking or comparison of strategies from a joint posterior (probability that one is best) is a HOP-type question.

## Main Content

### Source Map

| Paper section | Content | Covered in |
|---|---|---|
| Abstract, 1 Introduction (pp. 1-4) | Fig. 1 example, definition of HOPs, advantages and drawbacks | [[Hullman 2015 - HOP Method and Related Work]] |
| 2 Related Work | static depictions; multiple draws; line-ups; Cumming's dance of the means | [[Hullman 2015 - HOP Method and Related Work]] |
| 3 Study Methods (3.1-3.5) | apparatus, 1/2/3-variable tasks, Tables 1-3, subjects, power | [[Hullman 2015 - Study Design and Distribution Tables]] |
| 4 Hypotheses | H1-H4 | [[Hullman 2015 - Study Design and Distribution Tables]] |
| 5 Results (5.1-5.4), Table 4, Figs 4-8 | MAE by task and display | [[Hullman 2015 - Results and Mean Absolute Error]] |
| 6 Discussion, 6.1 Limitations | interpretation, strategies, limits | [[Hullman 2015 - Discussion and Limitations]] |
| 6.2 Precision of inference | standard errors from $n$ frames | [[Hullman 2015 - Precision of Inference from HOPs]] |
| 6.3 Frame rates | 400 ms, interactivity | [[Hullman 2015 - Precision of Inference from HOPs]] |

## Examples

For the HOP precision bound: with $p=0.66$ and 25 frames the standard deviation of an estimated probability is 0.094 ($\pm19$ points), and 100 frames halves it ([[Hullman 2015 - Precision of Inference from HOPs]]).

## Connections
- Relevance to marketing measurement: a HOP of channel-ROI posterior draws shows "channel B beats channel A in 13 of 20 frames" and preserves correlation between channel estimates, which marginal intervals hide (distribution 8 in the paper, correlation 0.95).
- Static alternative evaluated later: [[Kay 2016 - Quantile Dotplot Construction]].

## See Also
- [[Hullman 2015 - Hypothetical Outcome Plots/_Index|Index for this source]]
