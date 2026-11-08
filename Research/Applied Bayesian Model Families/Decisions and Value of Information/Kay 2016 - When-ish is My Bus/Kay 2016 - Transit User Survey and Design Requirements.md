---
title: "Kay 2016 - Transit User Survey and Design Requirements"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/paper
source: "[[raw/Kay Kola Hullman Munson 2016 - When (ish) is My Bus.pdf]]"
source_location: "Background, Survey, Design Requirements, pp. 2-4"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Kay 2016 - When-ish is My Bus"
doc_type: paper
depends_on:
  - "[[Kay 2016 - When-ish is My Bus - Overview]]"
used_by:
  - "[[Kay 2016 - Quantile Dotplot Construction]]"
aliases:
  - Transit uncertainty design requirements
  - OneBusAway survey
---

# Kay 2016 - Transit User Survey and Design Requirements

> [!summary]
> From literature and a survey of 172 OneBusAway users the authors derive five design elements: keep a point estimate, add a probabilistic arrival estimate, add arrival status probability, expose or model data freshness, and keep uncertainty *intrinsic* to the encoding so users can apply their own risk tolerance. The top unmet needs were status probability, prediction variance and schedule frequency.

## Overview

The requirements phase combines background reasoning with a survey (recruited through social media and department lists) asking how often people try to answer nine questions with the app (7-point scale) and how helpful additional types of information would be (5-point scale), plus open-ended items on worst experiences.

## Main Content

**Background claims.**
- *Trust.* Displaying uncertainty can improve trust and decisions: weight-scale uncertainty (Kay et al.), electric-vehicle range gradient plot reducing range anxiety (Jung et al.), and Joslyn and LeClerc's road-salting study where people given probabilistic information made better decisions than those told the cost-benefit optimum, because occasional "unnecessary" precautions erode trust in a bare recommendation.
- *Extrinsic vs intrinsic.* Error bars are extrinsic annotations, prone to misreading (confusion over SD/SE/CI; overlapping-CI heuristics), and underweighted. A density plot makes the mode intrinsic. The authors argue uncertainty should be intrinsic and should let users apply situation-dependent risk tolerance (a one-sided 95% interval corresponds to being late 1 time in 20, but risk tolerance varies).
- *Prediction vs confidence interval.* A prediction interval covers a given share of future instances; a confidence interval describes the precision of an inferred parameter. For an individual's bus, the prediction interval is what matters.
- *Continuous vs discrete.* Density encodes pdf as height, violin as width, gradient as opacity (weaker encoding). CDF plots are unfamiliar and make the mean hard to read. Discrete outcomes (natural frequencies; icon arrays; Hullman et al.'s animated hypothetical outcome plots) help but need space or time; HOPs bring a time-precision trade-off.

**Top-5 goals (survey):** when to leave; wait time if I leave now; time to next bus after missing one; schedule risk (get to a meeting on time); schedule opportunity (enough time to do something before the bus). **Top-3 unmet needs:** *status probability* (chance the displayed arrival status is correct; common worst experience: "perpetually 9 minutes away", or "departed" when it had not), *prediction variance* (chance the predicted arrival changes unexpectedly), *schedule frequency*.

> [!definition] Design requirements (five elements)
> 1. **Point estimate of time to arrival** for glanceability; people want it even with probabilities.
> 2. **Probabilistic estimate of time to arrival**, avoiding false precision and allowing risk tolerance.
> 3. **Probabilistic estimate of arrival status** (e.g. chance the bus has already arrived).
> 4. **Data freshness** shown or, better, folded into the model.
> 5. Schedule frequency is left to a separate trip-planner interface.
^def-design-requirements

**Design decisions (iterative design with 24 informal testers).** Two layouts: bus-timeline (one row per bus) and route-timeline (one row per route; helps frequency and opportunity). Point and probabilistic estimates coincide spatially (a point estimate on the right edge, Fig. 3, was rejected: it invites ignoring uncertainty); annotated timelines ("departed", "now", "on the way") give status probability "for free"; "when to leave" stays implicit; freshness is left to the model; timelines are synchronised across rows (relative axes make buses of different variance look alike).

## Examples

Susan's coffee: predicted arrival 5 minutes, plausible range 1 to 9, she orders coffee and the bus arrives in 2. A display showing that arrivals earlier than 5 minutes are also probable would have let her weigh the risk.

## Connections
- The "false precision / glanceability" tension recurs in dashboards for MMM outputs; the intrinsic-uncertainty principle argues for showing the distribution where the point estimate sits.

## See Also
- [[Kay 2016 - When-ish is My Bus - Overview]]
