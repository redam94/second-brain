---
title: "Implementation of Market Response Models"
aliases:
  - "MRM Implementation"
  - "Marketing Science Implementation"
tags:
  - type/concept
  - topic/market-response
  - topic/implementation
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 10"
chapter: "10"
status: complete
doc_type: concept
source_location: "Ch. 10, pp. 407-425"
depends_on:
  - "[[Design of Static Response Models]]"
  - "[[Design of Dynamic Response Models]]"
  - "[[Parameter Estimation in Market Response]]"
  - "[[Optimal Marketing Decisions and Forecasting]]"
used_by: []
---

# Implementation of Market Response Models

> [!abstract] Summary
> Chapter 10 addresses the organizational and practical challenges of implementing market response models in firms. Covers barriers to adoption, the role of managerial judgment, decision support systems, and the conditions under which model-based recommendations are actually acted upon.

## Why Implementation Fails

Market response models are frequently built but not used. Key barriers:

1. **Complexity**: models with many equations or exotic functional forms are distrusted
2. **Data availability**: scanner data may not be linked to advertising or distribution data at the required frequency
3. **Organizational silos**: marketing, sales, and finance departments use different data systems
4. **Credibility**: managers distrust models that contradict their experience
5. **Static models**: models built at one point in time become stale; need adaptive updating

## The Manager-Model Interface

> [!example] Calibration vs. Pure Estimation
> Two paradigms for parameter determination:
>
> - **Pure estimation** (econometric): parameters come entirely from historical data. Credible but backward-looking.
> - **Calibration** (managerial judgment): managers supply key parameter values (e.g., response at zero advertising, saturation level) and the model interpolates. Used in ADBUDG (Little 1970).
> - **Hybrid**: prior beliefs (managerial calibration) combined with data via Bayesian estimation (see [[Parameter Estimation in Market Response]]).
>
> The hybrid approach is most defensible: it uses data where available and expert knowledge where data are sparse.
> ^ex-calibration

## Decision Support Systems (DSS)

Successful implementations embed market response models in decision support systems with three components:

1. **Data module**: automated data feeds from scanner syndicate (IRI/Nielsen), advertising monitoring, and internal shipment data
2. **Model module**: estimated response functions with parameter updates as new data arrive
3. **Interface module**: scenario-planning interface for managers to run "what-if" analyses

Examples: CALLPLAN (sales force allocation), BRANDAID (multi-instrument marketing mix), MEDIAC (media planning).

## Adaptive Estimation

Because markets change (new competitors, category growth, brand life cycle evolution), models should be re-estimated periodically. Two approaches:

- **Rolling window**: re-estimate on the most recent $T$ periods, discarding older data
- **Recursive estimation / Kalman filter**: update parameters continuously as new observations arrive (see time-varying parameters in [[Carryover Effects and Distributed Lags]])

The Kalman filter approach is most appropriate when parameters themselves are time-varying (e.g., advertising elasticity declining with brand maturity).

## Organizational Conditions for Success

Empirical studies of model adoption (Wierenga & Ophuis 1997) find that successful implementations share:

1. **Champion**: a senior manager who believes in and advocates for the model
2. **Participatory development**: model built with input from users, not imposed from outside
3. **Simple outputs**: dashboards with 3-5 key metrics, not multipage statistical reports
4. **Rapid feedback loop**: results visible within one planning cycle
5. **Linkage to decisions**: the model output directly feeds into a specific planning process (budget setting, media allocation)

## Scope and Limits of ETS Models

> [!example] What MRMs Can and Cannot Do
> **Can do:**
> - Quantify short-run and long-run effects of past marketing actions
> - Forecast sales under alternative marketing scenarios
> - Identify optimal budget levels under given market conditions
> - Decompose sales into baseline and incremental components
>
> **Cannot do:**
> - Predict consumer response to genuinely novel products or messages (no historical data)
> - Capture discontinuous structural changes before they occur
> - Replace judgment about market definition and competitive boundaries
> - Guarantee external validity when market conditions shift
> ^ex-scope

## Cross-Links

- Model specification: [[Design of Static Response Models]], [[Design of Dynamic Response Models]]
- Estimation methods: [[Parameter Estimation in Market Response]]
- Optimal decisions: [[Optimal Marketing Decisions and Forecasting]]
- Bayesian updating: [[Bayesian Workflow - Overview]]
- Research methodology: [[Garden of Forking Paths]]
