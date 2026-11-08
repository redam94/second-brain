---
title: "Kay 2016 - Discussion and Design Implications"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/paper
source: "[[raw/Kay Kola Hullman Munson 2016 - When (ish) is My Bus.pdf]]"
source_location: "Discussion, Conclusion, pp. 9-10"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Kay 2016 - When-ish is My Bus"
doc_type: paper
depends_on:
  - "[[Kay 2016 - Experiment Beta Regression and Results]]"
used_by:
  - "[[Kay 2016 - When-ish is My Bus - Overview]]"
aliases:
  - Subitizing and discrete outcome plots
  - Glanceability false precision tradeoff
---

# Kay 2016 - Discussion and Design Implications

> [!summary]
> Discrete outcomes work best in small numbers: with about 20 dots, vertical stacks rarely exceed 5, so people subitize instead of counting. Beyond that, discrete plots collapse into continuous ones. Open trade-offs: glanceability vs false precision, precision vs visual appeal, and a minority who dislike uncertainty information.

## Overview

The paper's discussion draws design guidance, notes respondent attitudes, and lists what was not tested (field use, behaviour, interactivity).

## Main Content

> [!theorem] Design recommendation (subitizing)
> Prefer discrete-outcome plots with few enough outcomes to exploit subitizing, the ability to recognise rather than count groups of fewer than about 5 items (Sec. Discussion). The authors recommend low-density dotplots (lower variance, higher confidence) or density plots (only slightly higher variance, more visually appealing) for space-constrained displays.
^thm-subitizing

**Attitudes.** In the second survey most respondents liked the idea of representing uncertainty (better decisions, less anxiety when the app disagrees with what they see). A minority said point predictions suffice; these tended to find the point prediction accurate. An additional minority did not want uncertainty information; several compared interpreting probabilities to statistics courses, and five feared accepting responsibility for decisions ("you're more likely to be unhappy than if you missed the bus and can just blame the app").

**Trade-offs.** Precision vs glanceability: more commenters felt overwhelmed than not, and the majority doubted they could use the plots while walking to the stop; but results show people understood them. Visual appeal vs estimation: dotplots 1.15 times more precise but rated less appealing (unknown whether from unfamiliarity or visual busyness).

**Limitations and future work (stated).** Field studies to assess acceptability and behaviour (people may count only when they want precision); interactivity such as a prototyped "risk slider" that moves the point estimate to a chosen risk threshold; effect of estimation precision on actual behavioural measures; learning over time; fitted models were Box-Cox $t$ on two weeks of Seattle data (a single city).

## Examples

"Risk slider" idea expressed as a quantile function: choose miss tolerance $\alpha$; display $Q(1-\alpha)$ as the leave-by time. $\alpha=0.05$ gives the 95% one-sided time; for a casual meeting use $\alpha=0.25$.

## Connections
- The false-precision problem is general: a lone ROI point estimate in an MMM report invites the same misuse; place the point estimate on the distribution.
- Decision-curve parallel: user-chosen $\alpha$ plays the role of the threshold probability in [[Vickers 2019 - Net Benefit and Threshold Probability]].

## See Also
- [[Kay 2016 - When-ish is My Bus - Overview]]
