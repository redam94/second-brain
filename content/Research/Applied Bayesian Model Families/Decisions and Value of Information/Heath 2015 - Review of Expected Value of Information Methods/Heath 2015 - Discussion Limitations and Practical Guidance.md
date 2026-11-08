---
title: "Heath 2015 - Discussion Limitations and Practical Guidance"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/concept
  - doc/paper
source: "[[raw/Heath Manolopoulou Baio 2015 - A Review of Methods for the Analysis of the Expected Value of Information.pdf]]"
source_location: "Sec. 5 and References, pp. 8-12"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Heath 2015 - Review of Expected Value of Information Methods"
doc_type: paper
depends_on:
  - "[[Heath 2015 - Influenza Vaccine Case Study and Table 1]]"
used_by:
  - "[[Value of Information Concept Note - EVPI, EVPPI and EVSI]]"
aliases:
  - EVPPI practical guidance
---

# Heath 2015 - Discussion Limitations and Practical Guidance

> [!summary]
> The authors conclude that the four new methods agree with the nested-MC benchmark with similar standard errors and runtimes, so choice should rest on simplicity. Regression methods win because the single-parameter methods need expert tuning and cannot do multi-parameter EVPPI; the GAM is best for one parameter, the GP for large subsets.

## Overview

Section 5 compares the methods on three practical axes (tuning, dimension, cost), notes the $N^3$ GP cost, and recommends black-box use through software. It is also the only place where the paper states what it does not establish.

## Main Content

**Decision guide (derived from Sec. 5).**

| Situation | Recommended method | Why (paper) |
|---|---|---|
| One parameter, any PSA size | GAM regression | "negligible computational effort" and no extra input |
| 2-5 parameters, some interaction knowledge | GAM | user must specify the interaction structure |
| $\ge6$ parameters or unknown interactions | GP regression | GAM "mathematically unstable"; GP "the only feasible option" |
| Very large PSA sample | GP with caution or geostatistical extension | cost $\propto N^3$; smaller $N$ is faster but less accurate |
| Benchmark / validation of a new method | Two-step MC | direct from the definition, treated as "true" |

**Limitations and caveats.**
- Single-parameter methods "largely superseded": they need correct $M$ or number of decision changes, and a naive BCEA call can "grossly over/under-estimate".
- Evidence is a single case study (28 parameters, two options, one $k$), compared via one dataset; no simulation study across model shapes.
- The nested-MC benchmark itself carried large MC error (inner loop under-sampled).
- Accuracy should be reported to 1-2 decimals.
- VoI is unbounded and hard to interpret; the paper does not solve this.

**Key references** (selected from the 33): Ades, Lu and Claxton (2004) EVSI, *Med Decis Making* 24:207-227; Brennan et al. (2007) partial EVPI via MC, *Med Decis Making* 27:448-470; Coyle and Oakley (2008) review of EVPPI methods, *Eur J Health Econ* 9:251-259 (the earlier review this paper extends); Strong and Oakley (2013), *Med Decis Making* 33:755-766; Strong, Oakley and Brennan (2014) non-parametric regression EVPPI, *Med Decis Making* 34:311-326; Sadatsafavi et al. (2013) single-parameter EVPPI, *Value in Health* 16:438-448; Madan et al. (2014) efficient EVPPI strategies, *Med Decis Making*; Wilson (2015) practical guide to VoI, *PharmacoEconomics* 33:105-121; Baio (2012) *Bayesian Methods in Health Economics*; BCEA package.

## Examples

Operational checklist for applying the paper to a Bayesian decision model: (1) save the joint posterior draws; (2) compute $NB_t(\theta^s)$ per option; (3) overall EVPI from the draws; (4) regress per parameter group; (5) compare EVPPI to EVPI; (6) check sensitivity to the willingness-to-pay or budget parameter $k$; (7) treat results as approximate.

## Connections
- The decision-curve idea ([[Vickers 2019 - Step-by-Step Guide to Decision Curve Analysis - Overview]]) is the net-benefit calculation without the uncertainty layer; EVPPI adds the uncertainty layer.
- EVSI (value of a specific future sample), not covered by this paper, is in [[Value of Information Concept Note - EVPI, EVPPI and EVSI]].

## See Also
- [[Heath 2015 - Review of Expected Value of Information Methods - Overview]]
- [[Decision Analysis]]
