---
title: "Kay 2016 - When-ish is My Bus - Overview"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/overview
  - doc/paper
source: "[[raw/Kay Kola Hullman Munson 2016 - When (ish) is My Bus.pdf]]"
source_location: "Whole paper, CHI 2016, pp. 1-12"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Kay 2016 - When-ish is My Bus"
doc_type: paper
depends_on:
  - "[[Decision Analysis]]"
used_by:
  - "[[Kay 2016 - Quantile Dotplot Construction]]"
  - "[[Kay 2016 - Transit User Survey and Design Requirements]]"
  - "[[Kay 2016 - Experiment Beta Regression and Results]]"
aliases:
  - Kay Kola Hullman Munson 2016
  - When-ish is my bus
---

# Kay 2016 - When-ish is My Bus - Overview

> [!summary]
> Kay, Kola, Hullman and Munson (CHI 2016) design and test uncertainty displays for real-time bus predictions on a phone. They introduce the **quantile dotplot** (a dotplot of evenly spaced quantiles of the predictive distribution), and in a controlled experiment with 541 participants find that a 20-dot version reduces the standard deviation of probability estimates by about 1.15 times relative to a density plot and raises confidence. Takeaway: discrete outcomes help only in small numbers (subitizing).

## Overview

**Problem.** Apps show a point prediction ("5 minutes") although arrival time is uncertain; a user can miss the bus after trusting it. Error bars and densities need statistical training; frequency formats help reasoning (Gigerenzer and Hoffrage), but icon arrays and animation need space or time that a phone lacks.

**Contributions** (Introduction): (1) design requirements from literature and a 172-person survey of OneBusAway users; (2) layouts and discrete-outcome visualisations from iterative design, including quantile dotplots; (3) a large user study comparing static discrete-outcome plots with continuous ones.

**Key result.** Dotplot-20 has SD of estimated $p$ about 0.11 at $p=0.5$ (11 percentage points), 1.15 times lower than density (95% interval 1.04 to 1.26); dotplot-100 performs like density; stripeplot-50 is worst. Mean confidence was 81/100 for dotplot-20 versus 73 for dotplot-100.

## Motivating PyMC examples

From <https://redam94.github.io/pymc-challenges/examples.html>:
- **E16 - Showing uncertainty: one posterior, twenty displays.** Epistemic vs predictive bands, fan charts, spaghetti, animated hypothetical outcome plots, **quantile dotplots**, exceedance curves, caterpillars and ridgelines on the same posterior; this paper supplies the evidence for dotplots and the quantile construction. See also [[Hullman 2015 - Hypothetical Outcome Plots - Overview]] and [[Value of Information Concept Note - Showing Uncertainty and Choosing a Display]].
- **E90 - Call it today or wait?** Communicating a nowcast probability to a decision maker is the same problem with a different threshold.

## Main Content

### Source Map

| Paper section | Content | Covered in |
|---|---|---|
| Abstract, Introduction | Susan's coffee example; 3 contributions | this note |
| Background and Motivation | Trust; extrinsic vs intrinsic; continuous vs discrete outcomes; small screens | [[Kay 2016 - Transit User Survey and Design Requirements]] |
| Survey of Existing Users | 172 OneBusAway users; goals; unmet needs | [[Kay 2016 - Transit User Survey and Design Requirements]] |
| Design Requirements | five elements | [[Kay 2016 - Transit User Survey and Design Requirements]] |
| Design (layouts, rationale, encodings) | Fig. 1 layouts, Fig. 2 quantile dotplot, Fig. 3, Fig. 4 matrix, Fig. 5 four selected plots | [[Kay 2016 - Quantile Dotplot Construction]] |
| Experiment: Method, Participants | four scenarios, beta regression setup, 320+221 participants | [[Kay 2016 - Experiment Beta Regression and Results]] |
| Results, Figs 6-7 | error, bias, variance, confidence, ease and appeal | [[Kay 2016 - Experiment Beta Regression and Results]] |
| Discussion, Conclusion | small numbers, subitizing, trade-offs, limitations | [[Kay 2016 - Discussion and Design Implications]] |

## Examples

Dotplot-20 with a 3-of-20 rule ("we are willing to miss the bus 3/20 times") gives a 85% one-sided prediction interval; see [[Kay 2016 - Quantile Dotplot Construction]].

## Connections
- Relevance to marketing measurement: reporting a lift or ROI posterior to a non-technical stakeholder as 20 quantile dots turns "probability that ROI exceeds the hurdle" into counting ("17 of 20"). The paper's results concern buses, not marketing.
- Decision link: a risk tolerance (miss 1 in 20) is a threshold decision of the same kind as the [[Vickers 2019 - Net Benefit and Threshold Probability]] exchange rate.
- Base: [[Posterior Predictive Checking]] for predictive distributions.

## See Also
- [[Research/Applied Bayesian Model Families/Decisions and Value of Information/Kay 2016 - When-ish is My Bus/_Index|Index for this source]]
