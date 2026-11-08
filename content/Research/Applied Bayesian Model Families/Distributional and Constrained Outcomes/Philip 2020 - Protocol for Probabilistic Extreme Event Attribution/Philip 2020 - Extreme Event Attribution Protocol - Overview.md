---
title: "Philip 2020 - Extreme Event Attribution Protocol - Overview"
tags:
  - source/ingested
  - topic/distributional-regression
  - type/overview
  - doc/paper
source: "[[raw/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution.pdf]]"
source_location: "Entire paper, Adv. Stat. Clim. Meteorol. Oceanogr. 6, 177-203 (2020), 27 pp."
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Distributional and Constrained Outcomes/Philip 2020 - Protocol for Probabilistic Extreme Event Attribution"
doc_type: paper
depends_on: []
used_by:
  - "[[Philip 2020 - Probability Framing, Event Definition and Return Periods]]"
  - "[[Philip 2020 - Extreme Value Distributions for Attribution]]"
  - "[[Philip 2020 - Trend Models and Natural Variability]]"
  - "[[Philip 2020 - Model Evaluation, Multi-Model Attribution and Hazard Synthesis]]"
  - "[[Philip 2020 - Vulnerability, Exposure and Communication]]"
  - "[[Philip 2020 - Bayesian GEV Attribution in PyMC]]"
aliases:
  - World Weather Attribution protocol
  - Philip et al 2020
  - eight-step attribution protocol
---

# Philip 2020 - Extreme Event Attribution Protocol - Overview

> [!summary]
> Philip et al. (2020) document the eight-step World Weather Attribution (WWA) protocol: analysis trigger, event definition, observed probability and trend, model evaluation, multi-method multi-model attribution, hazard synthesis, vulnerability/exposure, communication. The statistical core is extreme-value distributions (GEV, GPD, Gumbel, Gaussian, gamma) whose location/scale shifts with smoothed global mean temperature, giving a probability ratio $PR=p_1/p_0$ and an intensity change $\Delta I$.

## Overview

**Question.** How should one attribute an extreme event to climate change in a standardised, comparable, quickly executable way?

**Contribution.** A reproducible protocol built from ~two dozen rapid and slow studies (hot, cold, wet, dry, stormy extremes), emphasising probability-based (not storyline) framing, model evaluation before use, multi-model synthesis with uncertainty inflation, and explicit separate treatment of vulnerability and exposure.

**Key result.** Examples with numbers: Peru 2013 cold wave return period 17 y (95% CI 7-75) and $PR=0.08$ (0.02-0.21) for the normal shift fit; southern Louisiana August 2016 rain return period about 500 y (360-1400), $PR=2.8$ (1.7-3.8), intensity +17% (10-21%); De Bilt 2018 heat around 300 y (>30 y) and "formally impossible" in 1900 so $PR=\infty$ (they prefer "extremely unlikely").

## Motivating PyMC examples

**E37** "Extreme-event attribution: how much did warming load the dice for the 2021 Pacific Northwest heatwave?" (NOAA GHCN-Daily annual maxima at Sea-Tac and Portland; NASA GISTEMP) - block maxima and the GEV (`pymc_extras.GenExtreme` checked against scipy), a geophysical shape prior, a reparameterisation removing support-wall divergences, non-stationary GEV on GMST - at <https://redam94.github.io/pymc-challenges/examples.html>. See [[Philip 2020 - Bayesian GEV Attribution in PyMC]]. E113 (log-Pearson III flood frequency) is in [[Concept Notes - Log-Pearson III Flood Frequency and Historic Floods]].

## Main Content — Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| Abstract, 1 Introduction (probability vs storyline; framings) | 177-179 | [[Philip 2020 - Probability Framing, Event Definition and Return Periods]] |
| 2 Step 1: Analysis trigger | 179-180 | [[Philip 2020 - Probability Framing, Event Definition and Return Periods]] |
| 3 Step 2: Event definition (goal, variable, area) | 180-182 | [[Philip 2020 - Probability Framing, Event Definition and Return Periods]] |
| 4 Step 3: Observed probability and trend (4.1 data; 4.2 GEV, GPD, Gumbel, Gaussian, gamma; 4.3 shift/scale fit; 4.4 natural variability) | 182-190 | [[Philip 2020 - Extreme Value Distributions for Attribution]], [[Philip 2020 - Trend Models and Natural Variability]] |
| 5 Step 4: Model evaluation | 190-192 | [[Philip 2020 - Model Evaluation, Multi-Model Attribution and Hazard Synthesis]] |
| 6 Step 5: Multi-method multi-model attribution (fixed vs transient forcing) | 192-193 | [[Philip 2020 - Model Evaluation, Multi-Model Attribution and Hazard Synthesis]] |
| 7 Step 6: Hazard synthesis | 193-195 | [[Philip 2020 - Model Evaluation, Multi-Model Attribution and Hazard Synthesis]] |
| 8 Step 7: Vulnerability and exposure | 195-196 | [[Philip 2020 - Vulnerability, Exposure and Communication]] |
| 9 Step 8: Communication | 196-198 | [[Philip 2020 - Vulnerability, Exposure and Communication]] |
| 10 Conclusions; data and acknowledgements | 198 | [[Philip 2020 - Vulnerability, Exposure and Communication]] |
| (concept translation to Bayesian GEV) | - | [[Philip 2020 - Bayesian GEV Attribution in PyMC]] |

## Relevance to marketing measurement

"Probability ratio under a counterfactual" is the same logic as incrementality: $P(\text{outcome}\mid\text{campaign})/P(\text{outcome}\mid\text{no campaign})$ for a tail event (a stock-out, a viral spike, a fraud surge). The protocol's pre-registered event definition, refusal to tune the event to the answer, and model-evaluation gate are directly transferable to measurement governance. See [[Decision Analysis]].

## Connections

[[Hierarchical Models]] (pooling stations/models), [[Sensitivity Analysis in Observational Studies]] (robustness to the counterfactual).

## See Also

[[Concept Notes - Log-Pearson III Flood Frequency and Historic Floods]]
