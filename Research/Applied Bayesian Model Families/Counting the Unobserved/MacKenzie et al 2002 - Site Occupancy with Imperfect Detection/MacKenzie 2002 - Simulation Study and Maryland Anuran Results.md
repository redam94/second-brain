---
title: "MacKenzie 2002 - Simulation Study and Maryland Anuran Results"
tags:
  - source/ingested
  - topic/population-estimation
  - type/example
  - doc/paper
source: "[[raw/MacKenzie 2002 - Estimating Site Occupancy Rates When Detection Probabilities Are Less Than One.pdf]]"
source_location: "Simulation study and Field study, pp. 2251-2253, Fig. 1, Table 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/MacKenzie et al 2002 - Site Occupancy with Imperfect Detection"
doc_type: paper
depends_on:
  - "[[MacKenzie 2002 - Occupancy Model and Likelihood]]"
used_by:
  - "[[MacKenzie 2002 - Extensions, Design Guidance and PyMC Sketch]]"
aliases:
  - occupancy simulation and frog data
---

# MacKenzie 2002 - Simulation Study and Maryland Anuran Results

> [!summary]
> A 243-scenario simulation shows $\hat\psi$ is reasonably unbiased when detection per visit is at least 0.3 and there are at least five visits, but unreliable at low $p$ and $T=2$. In the Frogwatch data, correcting for imperfect detection raises American toad occupancy from 0.34 observed to about 0.49, while spring peeper barely changes (0.83 to 0.85).

## Overview

Both parts test the constant-parameter model of [[MacKenzie 2002 - Occupancy Model and Likelihood]] and illustrate covariate extensions.

## Main Content

### Simulation design
> [!definition] Simulation factors
> Five factors: $N\in\{20,40,60\}$; $\psi\in\{0.5,0.7,0.9\}$; $p\in\{0.1,0.3,0.5\}$; $T\in\{2,5,10\}$; missing-observation probability $\in\{0,0.1,0.2\}$. That is $3^5=243$ scenarios, 500 data sets each. Occupancy: draw $y\sim U(0,1)$, site occupied if $y\le\psi$; detection and missingness drawn likewise. The $\psi(\cdot)p(\cdot)$ model was fitted and a 200-draw bootstrap SE recorded. Fig. 1 shows $N=40$, no missing data; full tables are in ESA's Electronic Data Archive (Ecological Archives E083-041-A1).
^def-occupancy-sim-design

### Findings

| Condition | Result |
|---|---|
| $p\ge0.3$, $T\ge5$ | $\hat\psi$ reasonably unbiased in all scenarios |
| $T=2$ | reasonable only when $p\ge0.5$; SE about double that at $T=5$ |
| Low $p$ | $\hat\psi$ over-estimated when true $\psi\in\{0.5,0.7\}$, under-estimated at $\psi=0.9$; in some cases $\hat\psi\to1$ |
| Bootstrap SE | good except at low $p$, where estimates near 1 give a tiny bootstrap SE that **overstates precision** |
| More visits / more sites | better accuracy and precision (little gain from 10 vs 5 visits in some cases) |
| Missing data | robust; SE up about 5% with 10% missing, 11% with 20% missing; bootstrap SEs rise similarly |

### Field study
Data: FrogwatchUSA volunteers (NWF/USGS amphibian programme) recorded calling frogs for 3 minutes after sundown at 32 Maryland wetland sites, 19 Feb-12 Oct 2000. A three-level calling index was truncated to detection/non-detection. To satisfy closure, data were restricted to the window **between first and last detection (exclusive)** for each species; the end dates were excluded because they would bias estimates. Three sites dropped; fewer than 8 of 29 sites were monitored on any day, giving about 90% missing observations. Covariates: air temperature at each visit (for $p$) and habitat (distinct body of water vs swamp/marsh/wet meadow; for $\psi$).

> [!example] Table 1: model comparison by AIC (reproduced)
> | Species / model | $\Delta$AIC | weight $w_i$ | $\hat\psi$ | SE($\hat\psi$) |
> |---|---|---|---|---|
> | **American toad** | | | | |
> | $\psi$(Habitat) $p$(Temperature) | 0.00 | 0.36 | 0.50 | 0.13 |
> | $\psi(\cdot)$ $p$(Temperature) | 0.42 | 0.24 | 0.49 | 0.14 |
> | $\psi$(Habitat) $p(\cdot)$ | 0.49 | 0.22 | 0.49 | 0.12 |
> | $\psi(\cdot)p(\cdot)$ | 0.70 | 0.18 | 0.49 | 0.13 |
> | **Spring peeper** | | | | |
> | $\psi$(Habitat) $p$(Temperature) | 0.00 | 0.85 | 0.84 | 0.07 |
> | $\psi(\cdot)$ $p$(Temperature) | 1.72 | 0.15 | 0.85 | 0.07 |
> | $\psi$(Habitat) $p(\cdot)$ | 40.49 | 0.00 | 0.84 | 0.07 |
> | $\psi(\cdot)p(\cdot)$ | 42.18 | 0.00 | 0.85 | 0.07 |
>
> **Interpretation.** Toads: 29 sites, visited 8.9 times on average (2 to 58); detected at 10 sites (0.34). The four models have near-equal weight, so covariate effects are inconclusive, but all give $\hat\psi\approx0.49$ (CV 27%), 44% above the naive 0.34. Peepers: visited 9.6 times on average (2 to 66); detected at 24 sites (0.83). The $p(\cdot)$ models get zero weight, so temperature matters (the authors suspect partly a tapering calling season); the best model gives lower occupancy for distinct water bodies (0.77) than other habitats (1.00). All models give $\hat\psi$ only marginally above 0.83, which suggests detection was high enough that peepers would probably be found if present.
^ex-occupancy-table1

## Examples

> [!example] Reading the toad result in a marketing frame
> The gap between 0.34 observed and 0.49 corrected is a detection-correction factor of roughly 1.44. An analogous problem in measurement: a channel "reaches" a segment but the tracking pixel only logs a fraction of exposures. Counting logged exposures as reach understates it by an amount only repeated, independent observation opportunities can identify. This is an analogy, not a claim from the paper.

## Connections

- Naive-vs-corrected trend comparisons in PyMC example E28 reproduce this logic with Swiss bird data.
- AIC weights here play the role that WAIC/LOO stacking would play in a Bayesian workflow: [[Stacking and Predictive Model Averaging]].

## See Also

- [[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]]
- [[MacKenzie 2002 - Extensions, Design Guidance and PyMC Sketch]]
