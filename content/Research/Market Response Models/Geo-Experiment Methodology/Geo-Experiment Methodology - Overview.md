---
title: Geo-Experiment Methodology - Overview
tags:
  - source/ingested
  - topic/market-response
  - topic/geo-experiments
  - type/overview
  - doc/paper
source:
  - "[[raw/Vaver Koehler 2011 - Measuring Ad Effectiveness Using Geo Experiments.pdf]]"
  - "[[raw/Kerman Wang Vaver 2017 - Time-Based Regression Geo Experiments.pdf]]"
source_location: "Vaver & Koehler 2011 §1-2, 6; Kerman, Wang & Vaver 2017 §1-2"
date_ingested: 2026-07-03
folder: "Market Response Models/Geo-Experiment Methodology"
doc_type: paper
depends_on:
  - "[[Bayesian Media Mix Modeling - Overview]]"
  - "[[Differences-in-Differences]]"
  - "[[Synthetic Control]]"
used_by:
  - "[[Geo-Experiment Design and Power Analysis]]"
  - "[[Time-Based Regression Estimator for Geo Experiments]]"
  - "[[TBR Design Sensitivity and the Stationarity Assumption]]"
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
aliases:
  - Geo Experiments
  - Matched Market Testing
  - Geo-Based Measurement
  - GeoLift-adjacent methodology
---

# Geo-Experiment Methodology - Overview

> [!summary]
> A **geo experiment** partitions a market into non-overlapping geographic regions ("geos"), randomly (or in small samples, deliberately "matched") assigns them to treatment/control, perturbs ad spend in the treatment geos, and estimates the incremental effect on a response metric from the resulting geo-level (or aggregate) time series. Two Google papers give the classical, non-Bayesian-experimental-design methodology for exactly the geo-holdout design problem posed in [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]: **Vaver & Koehler (2011)** supply the *design* — randomization, spend perturbation, and a power/sample-size calculation via **Geo-Based Regression (GBR)** — and **Kerman, Wang & Vaver (2017)** supply an alternative *estimator*, **Time-Based Regression (TBR)**, which works even with very few geos (down to one treatment/one control — a "matched market test") and underlies Google's open-source **Matched Markets** tool.

## Overview

Advertisers need to know the *incremental* impact of ad spend — what would have happened without it — not just correlational metrics like clicks or cost-per-click. Observational methods (no control group) are cheap but require strong modeling assumptions; user-level randomized experiments (traffic/cookie experiments) are rigorous but can't see behavior downstream of the initial exposure. **Geo experiments** split the difference: they retain the rigor of a randomized (or matched) control group while working at an aggregated, privacy-friendly geographic level ([[Geo-Experiment Design and Power Analysis]] §1-2).

Both papers share the same experimental *structure* — geos, a **pretest period** (baseline, no campaign differences), and a **test period** split into an **intervention** (campaign actually modified) and **cooldown** (campaign reset, but lagged effects like offline sales may still accrue) — but they analyze it with two different statistical models:

| | **GBR** (Vaver & Koehler 2011) | **TBR** (Kerman, Wang & Vaver 2017) |
|---|---|---|
| Data used | Two aggregates per geo: pretest total, test total | Full time series, aggregated across geos into one treatment series $y_t$ and one control series $x_t$ |
| Model | Cross-sectional regression across geos: $y_{i,1}=\beta_0+\beta_1 y_{i,0}+\beta_2\delta_i+\epsilon_i$ | Time-series regression of treatment on control in the pretest, extrapolated as a counterfactual |
| Statistical power comes from | Number of geos $N$ | Number of pretest time points $n$ |
| Minimum geos | Needs many geos (tens+) for power | Works with as few as **2 geos** (1 treatment, 1 control) — a matched-market test |
| Output | ROAS point estimate + CI from OLS/WLS | Full posterior *time series* of the counterfactual and the cumulative incremental effect $\Delta(t)$ |

See [[Geo-Experiment Design and Power Analysis]] for the GBR design/estimation details and [[Time-Based Regression Estimator for Geo Experiments]] for the TBR model. [[TBR Design Sensitivity and the Stationarity Assumption]] covers the design process, bias/coverage evaluation, and the stationarity condition under which TBR is unbiased.

## Main Content

### Why two papers, not one

GBR draws its statistical power from *replication across geos*: more geos means a tighter confidence interval on the ROAS coefficient $\beta_2$, in the same way replication tightens any regression estimate. This makes GBR inapplicable when only a handful of geos are available — e.g. smaller countries, subregions of a large country, or a **matched market test** that deliberately compares one control region against one test region for convenience and cost reasons (Kerman, Wang & Vaver 2017 §1). TBR was built to "fill this gap": it draws power from replication *across time* in the pretest period instead of across geos, so it degrades gracefully to $N=2$.

> [!definition] The two design levers a geo experiment controls
> A geo experiment's design is fully specified by: (1) which geos are assigned to treatment vs. control (randomized, optionally stratified/paired by size), (2) the **ad spend differential** injected in the treatment geos (its sign, magnitude, and duration), and (3) the length of the pretest, intervention, and cooldown periods. Both GBR and TBR share this design space; they differ only in how the resulting time series are analyzed. This is the same design vector $\xi=(a_g, m, \Delta_g, [t_0,t_1])$ used in [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]], stripped of the Bayesian/MMM prior — GBR and TBR are the **classical, frequentist counterparts** of that Bayesian design problem: same $\xi$, but the "likelihood" is a simple linear/time-series regression rather than a full MMM, and the design is chosen to hit a target confidence-interval half-width rather than to maximize expected information gain.
^def-design-levers

### Relationship to the Bayesian geo-holdout design problem

[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] frames a geo-holdout as a design $\xi$ against an MMM posterior and reads out the causal effect with [[Bayesian Structural Time-Series Model|BSTS/CausalImpact]]. These two papers are the direct ancestors of that framing:

- The **design vector** $\xi$ in that note is exactly the "which geos, which channel(s), how much, how long" question that [[Geo-Experiment Design and Power Analysis|Vaver & Koehler's design section]] answers with a closed-form variance formula and a simulation-based power analysis, rather than an EIG search.
- The **read-out** step in that note ("a counterfactual-prediction model... exactly the BSTS/CausalImpact machinery") is precisely what TBR does with a much simpler model: TBR is "an analogous time-based regression approach" to Brodersen et al.'s (2015) [[Bayesian Structural Time-Series Model|Causal Impact]] state-space model, trading CausalImpact's flexibility (local level/trend/seasonal state-space components, spike-and-slab covariate selection) for a single static regression of treatment sales on control sales — sufficient when there is one clean control aggregate and no need to *select* covariates.
- Neither paper optimizes a Bayesian EIG objective; instead they use **frequentist/simulation-based power analysis** (Vaver & Koehler's variance formula, extended by Kerman, Wang & Vaver into a Monte-Carlo "pseudo-geo-experiment" procedure) to size the experiment to a target confidence-interval half-width. This is the classical design methodology the Q&A's Gaps section flagged as missing from the vault.

### GeoLift and synthetic control: a third branch

A third family of geo-experiment estimators — not ingested into this vault as a standalone source, but referenced here for context — replaces TBR's regression-on-control-aggregate with a **synthetic control**: Meta's open-source **GeoLift** tool builds an *Augmented* Synthetic Control Method (ASCM) counterfactual for the treatment geo(s) as a weighted combination of untreated geos (ridge-regularized to handle many candidate donors), rather than a single-control-aggregate regression. This solves the *same* geo-experiment design problem — pick treatment/control geos, perturb spend, predict the counterfactual — but swaps the estimator:

| Method | Counterfactual construction | Vault reference |
|---|---|---|
| GBR ([[Geo-Experiment Design and Power Analysis]]) | Cross-sectional regression across many geos | This folder |
| TBR / **Matched Markets** ([[Time-Based Regression Estimator for Geo Experiments]]) | Time-series regression of treatment aggregate on control aggregate | This folder |
| GeoLift (Meta, not ingested) | **Augmented Synthetic Control** — weighted combination of donor geos | [[Synthetic Control]], [[Generalized Synthetic Control Method]], [[Abadie 2021 - Overview]], [[Xu 2016 - Overview]] |
| CausalImpact (Brodersen et al. 2015) | Bayesian structural time-series (local level/trend + regression on controls) | [[Bayesian Structural Time-Series Model]], [[Brodersen 2015 - Overview]] |

The vault's existing [[Synthetic Control]] note (and its extensions in [[Xu 2016 - Overview]], [[Abadie 2021 - Overview]], [[Generalized Synthetic Control Method]]) covers the ASCM machinery GeoLift builds on; TBR's regression-on-a-single-control-series is a much simpler, closed-form special case that does not need donor-pool weight optimization — appropriate exactly when there are too few control geos to construct a meaningful synthetic control, which is the matched-market regime TBR targets.

## Examples

> [!example] When to use which estimator
> - **Many geos (tens to hundreds), want a single ROAS number**: GBR (Vaver & Koehler) — e.g. the 210-DMA paid-search click experiment in [[Geo-Experiment Design and Power Analysis]].
> - **Few geos, or a single matched market pair, want a full time-series readout and cumulative iROAS curve**: TBR ([[Time-Based Regression Estimator for Geo Experiments]]) — Google's open-source **Matched Markets** tool implements exactly this.
> - **Many donor geos available, want to guard against a control-aggregate that doesn't track the treatment geo well**: GeoLift-style Augmented Synthetic Control ([[Synthetic Control]]).
> - **Want the effect folded back into an MMM posterior to shrink interaction-term uncertainty**: neither classical estimator directly; use the Bayesian EIG framing in [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]].

## Connections

- **Fills the gap** named in [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]'s Gaps section: "No vault note on geo-experiment methodology specifically (matched-market design, GeoLift, time-based regression)." This folder supplies the matched-market design and time-based-regression pieces; GeoLift's ASCM machinery is covered by the existing synthetic-control notes.
- **Feeds** [[Bayesian Media Mix Modeling - Overview]] measurement programs: a geo experiment's iROAS estimate is exactly the kind of ground truth used to calibrate or validate an MMM's channel coefficients.
- **Contrasts with** [[Differences-in-Differences]] and [[Synthetic Control]] in its unit of randomization (geos, not individuals) and in using *time* (TBR) or *cross-section* (GBR) as the source of statistical replication rather than a matched comparison group alone.

## See Also
- [[Geo-Experiment Design and Power Analysis]] — GBR model, spend-differential construction, variance formula, simulation-based power analysis
- [[Time-Based Regression Estimator for Geo Experiments]] — the TBR/Matched Markets model and its posterior causal-effect and iROAS estimates
- [[TBR Design Sensitivity and the Stationarity Assumption]] — design scaling laws, bias/coverage evaluation, and when TBR's unbiasedness assumption fails
- [[Bayesian Structural Time-Series Model]] — the more flexible Bayesian state-space counterfactual model TBR simplifies
- [[Synthetic Control]] · [[Abadie 2021 - Overview]] · [[Xu 2016 - Overview]] — the donor-weighting alternative to time-based regression (basis of GeoLift)
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] — the Bayesian EIG framing this classical methodology is the frequentist counterpart of
