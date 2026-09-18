---
title: HM-ABC Calibration Framework
tags:
  - source/ingested
  - topic/agent-based-modeling
  - type/overview
  - doc/paper
source: "[[Agent-Based Modeling/raw/calibration_ABM.pdf]]"
source_location: "Abstract, Sections 1–3, pp. 1–6"
date_ingested: 2026-04-11
date_updated: 2026-07-06
folder: "Agent-Based Modeling/Calibration and Validation/Calibration Methods"
doc_type: paper
depends_on:
  - "[[ABM Calibration Overview]]"
  - "[[ABM Methodology and Principles]]"
used_by:
  - "[[History Matching for ABMs]]"
  - "[[Approximate Bayesian Computation for ABMs]]"
  - "[[Uncertainty Quantification for ABM Calibration]]"
  - "[[ABM Calibration Case Studies]]"
aliases:
  - HM+ABC Framework
  - McCulloch 2022 calibration
---

# HM-ABC Calibration Framework

> [!summary]
> McCulloch et al. (2022) present a novel calibration framework for ABMs combining History Matching (HM) with Approximate Bayesian Computation (ABC). HM first prunes the parameter space to a non-implausible region by iteratively eliminating parameter sets that cannot plausibly reproduce observations; ABC then provides a full posterior distribution over that region. The combined approach requires far fewer model runs than ABC alone while providing honest uncertainty-quantified posteriors.

## Overview

Agent-based models are notoriously difficult to calibrate due to stochasticity, high dimensionality, and computational cost. Existing approaches — point estimation (simulated annealing, genetic algorithms) or distributional estimation (ABC alone) — either discard uncertainty or require prohibitively many model runs.

This paper, published in *JASSS* 25(2) 2022, introduces a two-stage framework:
1. **History Matching (HM)**: Sequentially eliminate implausible parameter regions in waves, using an implausibility score that accounts for all uncertainty sources.
2. **Approximate Bayesian Computation (ABC)**: Sample from the non-implausible space found by HM as an informed prior, yielding a full posterior distribution.

The framework is validated on three examples of increasing complexity: SugarScape (toy), territorial birds (compared to alternatives), and RISC Scottish cattle farms (real-world policy application).

## The Four-Step Pipeline

> [!theorem] Framework: HM followed by ABC
> 1. **Define the parameter space** — set plausible ranges for each parameter, informed by domain knowledge or physical constraints
> 2. **Quantify all uncertainties** — measure model discrepancy $V^r_m$, ensemble variance $V^r_s$, and observation uncertainty $V_o$
> 3. **Run HM on the parameter space** — iteratively eliminate implausible regions; retain only the non-implausible space
> 4. **Run ABC using the HM results as a uniform prior** — set $\varepsilon = 3(V_o + V^r_s + V^r_m)$ as initial threshold; posterior samples quantify the probability of each parameter set given the observations
>
> **Key result**: The combined approach is more efficient than ABC alone (3,185 runs vs. 11,000+) and provides a posterior distribution more concentrated around the true parameters.
^framework-pipeline

## Why HM Before ABC?

| Approach | Output | Pros | Cons |
|----------|--------|------|------|
| GA / simulated annealing | Point estimate | Few model runs | No uncertainty quantification |
| ABC alone | Full posterior | Honest uncertainty | Wastes runs on implausible regions |
| HM alone | Non-implausible region (binary) | Efficient, explicit uncertainty | No posterior probabilities |
| **HM + ABC** | **Full posterior over non-implausible space** | **Efficient + honest UQ** | Slightly narrower CIs than ABC alone |

HM focuses the search; ABC quantifies the full posterior within the focused space. HM is also advantageous because it takes the uncertainties of the model and observation into account while searching, enabling a decision about plausibility from a single model run rather than an ensemble.

## Computational Efficiency

From the birds case study (Section 5.1):
- HM+ABC: **3,185 total model runs**
- ABC alone (Thiele et al. 2014): **11,000+ runs** for comparable precision
- Simulated annealing: 256 runs (but no posterior)
- Evolutionary algorithms: 290 runs (but no posterior)

Trade-off: HM+ABC produces slightly narrower 95% CIs than ABC alone (more precise but less conservative). True parameter contained within 95% CI ~90% of the time vs. ~92% for ABC alone.

## Code Availability

> Source code available at `https://github.com/Urban-Analytics/uncertainty`

## Connections
- Extends [[ABM Calibration Overview]] with a UQ-based approach complementing [[Genetic Algorithm Calibration for ABM]]
- HM methodology draws from climate modeling literature (Craig et al. 1997)
- ABC connects to Bayesian posterior estimation: see [[Approximate Bayesian Computation for ABMs]]
- Three uncertainty sources detailed in [[Uncertainty Quantification for ABM Calibration]]

## See Also
- [[History Matching for ABMs]] — the HM step in detail
- [[Approximate Bayesian Computation for ABMs]] — the ABC step in detail
- [[Uncertainty Quantification for ABM Calibration]] — the three uncertainty sources
- [[ABM Calibration Case Studies]] — validation on SugarScape, birds, RISC
- [[Method of Simulated Moments]] — econometric simulation-based estimation; moment-matching from ABM output is closely analogous to SMM (the `used_by` field of that note flags this connection explicitly)
- [[Neural SBI for Agent-Based and Economic Models]] — a neural alternative to the ABC stage
