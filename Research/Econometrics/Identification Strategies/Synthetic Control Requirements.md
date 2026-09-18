---
title: "Synthetic Control Requirements"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - topic/synthetic-control
  - type/concept
  - doc/paper
source: "[[raw/Abadie 2021 - Using Synthetic Controls.pdf]]"
source_location: "Abadie (2021), Sections 4–6, pp. 405–413"
date_ingested: 2026-04-10
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Synthetic Control]]"
  - "[[Synthetic Control Bias Theory]]"
  - "[[The Selection Problem]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Synthetic Control Inference and Diagnostics]]"
  - "[[Differences-in-Differences]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - "synthetic control feasibility"
  - "synthetic control assumptions"
  - "when to use synthetic control"
---

# Synthetic Control Requirements

> [!summary]
> Synthetic controls are appropriate tools for causal inference only when specific contextual and data requirements are met. Abadie (2021) identifies five **contextual requirements** and three **data requirements** that researchers should verify before applying the method. When these conditions fail, the article describes how to adapt the design or why the method should be avoided entirely.

## Overview

The interpretability of synthetic controls is their greatest strength — the counterfactual is explicit, sparse, and subject to domain scrutiny. But this transparency also reveals failures that are hidden in regression-based methods. A poorly fitted synthetic control, visible in the pre-treatment period, signals that the counterfactual is not credible. The requirements in this note describe the conditions under which the synthetic control can produce credible estimates.

## Why Use Synthetic Controls? (Advantages over Regression)

Before the requirements, it is useful to understand what synthetic controls offer:

| Property | Synthetic Control | Linear Regression |
|----------|------------------|-------------------|
| Extrapolation | Precluded (convex combination) | Allowed (unconstrained weights) |
| Transparency | Explicit: named donor units + weights | Opaque: dense, often negative weights |
| Sparsity | Yes — bounded by $k$ predictors | No |
| Pre-analysis plan | Weights registerable pre-outcomes | Cannot preregister |
| Specification search safeguard | Yes — weights fixed before outcomes | No |
| Inference | Permutation (exact, small $J$) | Asymptotic |

The **safeguard against specification searches** is important: because synthetic control weights are computed from pre-intervention data only, all design decisions (donor pool, predictors) can be made and locked in before post-treatment outcomes are observed. This mimics the pre-analysis plan of a randomized trial.

## Contextual Requirements

### 1. Size of Effect and Volatility

> [!warning] Requirement 1: Effect Must Be Large Relative to Outcome Volatility
> Synthetic control inference detects effects that are *extreme* relative to the distribution of placebo effects. If the **true treatment effect is small** or the **outcome variable is highly volatile**, the effect will be indistinguishable from the placebo distribution.
>
> The relevant quantity is $|\tau_{1t}| / \text{SD}(\varepsilon_{jt})$ — the signal-to-noise ratio. High volatility from unit-specific transitory shocks $\varepsilon_{jt}$ cannot be eliminated by synthetic control matching (only the common-factor component $\lambda_t \mu_j$ is controlled).
^req-effect-size

**Practical implication**: When substantial volatility is present in the outcome, Abadie (2021) suggests removing it via filtering (e.g., seasonal adjustment, HP filter) from both the treated unit and donor pool before estimation.

### 2. Availability of a Comparison Group

> [!warning] Requirement 2: Suitable Donor Pool Must Exist
> The donor pool must contain units that:
> - Were **not affected by the intervention** (not exposed to treatment, and not subject to spillovers from the treated unit)
> - Have **similar characteristics** to the treated unit on the predictors $\mathbf{Z}_j$ and $\boldsymbol{\mu}_j$
> - Did not adopt **similar interventions** during the study period
>
> Units with idiosyncratic shocks idiosyncratic to the treated unit should be excluded. Units from a different structural regime than the treated unit should be excluded.
^req-comparison-group

Contaminating the donor pool with units affected by spillovers from the treatment biases the synthetic control. For example, if the intervention benefits neighboring regions, those regions should be excluded from the donor pool (otherwise the synthetic control would underestimate the counterfactual, overstating the treatment effect).

### 3. No Anticipation

> [!definition] Definition: No Anticipation Assumption
> The potential outcomes $Y_{jt}^N$ and $Y_{jt}^I$ in the setting of subsection 3.1 are defined only in terms of the treatment status for unit $j$ at time $t$. This is the **stable unit treatment value assumption (SUTVA)** applied to time: the outcome is invariant to the history of treatment status and there are no anticipation effects.
>
> **Violation**: If economic agents anticipate the intervention and adjust behavior before $T_0$, the pre-treatment data contain anticipation effects. The synthetic control would then attribute some of the treatment effect to the pre-treatment period.
^def-no-anticipation

**Remedy**: If anticipation is present, **backdate** the intervention date to a period before anticipation effects can plausibly occur (see [[Synthetic Control Inference and Diagnostics#^def-backdating]]). Note that backdating does not mechanically bias the estimator — the synthetic control will simply show the treatment effect starting from the backdated date, with the actual effect materializing after the formal intervention date.

### 4. No Interference (SUTVA)

> [!definition] Definition: No Interference (SUTVA)
> Unit $j$'s outcome $Y_{jt}$ depends only on unit $j$'s own treatment status, not on the treatment status of other units:
> $$Y_{jt} = (1-D_{jt}) Y_{jt}^N + D_{jt} Y_{jt}^I$$
> where $D_{jt} \in \{0,1\}$ is unit $j$'s treatment indicator. Equivalently, there are no **spillover effects** from treated to untreated units.
^def-no-interference

**Violation and remedy**: If spillover effects are plausible (e.g., neighboring regions benefit from or are harmed by the intervention), exclude potentially affected units from the donor pool. This creates a tension with Requirement 2 (needing a large, representative donor pool).

When spillovers are expected but cannot be excluded, the synthetic control estimate provides a **lower bound** on the treatment effect magnitude (if the spillover benefits the donor units, the synthetic counterfactual is inflated, understating the true effect).

### 5. Convex Hull Condition

> [!warning] Requirement 5: Treated Unit Must Be Inside (or Near) the Convex Hull
> The [[Synthetic Control Bias Theory#^thm-sparsity|sparsity theorem]] shows that synthetic controls are projections of $\mathbf{X}_1$ onto the convex hull of $\mathbf{X}_0$. When $\mathbf{X}_1$ is **far outside** the convex hull, the synthetic control must average over donors whose characteristics are substantially different from the treated unit.
>
> **Consequence**: Interpolation biases from large $\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}^*$ discrepancies can dominate the estimate. Abadie, Diamond, and Hainmueller (2010, 2015) advise **against using synthetic controls** when $\mathbf{X}_1 \not\approx \mathbf{X}_0 \mathbf{W}^*$.
^req-convex-hull

**Practical check**: Compute $\mathbf{X}_1 - \mathbf{X}_0 \mathbf{W}^*$ (the discrepancy between the treated unit's predictors and the synthetic control's predictors). Table 1 in Abadie (2021) illustrates this for the German reunification example: West Germany's predictors are closely matched by the synthetic control across all six predictors, validating the approach.

## Data Requirements

### 1. Aggregate Data on Predictors and Outcomes

The synthetic control method requires data on both the **outcome variable** and **predictors** $\mathbf{Z}_j$ for both the treated unit and all donor units. These are often aggregate statistics (state-level, country-level) reported by government agencies, multilateral organizations, or private entities.

When micro-data exist, they can be aggregated. For example, Card (1990) uses CPS micro-data to construct aggregate labor market outcomes for Miami and comparison cities in the Mariel Boatlift study.

### 2. Sufficient Pre-Intervention Information

> [!warning] Data Requirement: Long Pre-Treatment Window
> The [[Synthetic Control Bias Theory#^thm-bias-bound|bias bound]] is inversely proportional to $T_0$. The synthetic control must be able to track the trajectory of the outcome variable for the treated unit over an **extended period** before the intervention.
>
> **Rule of thumb**: The more volatile the outcome (large $\varepsilon_{jt}$), the longer the pre-treatment window needed to achieve a close match. Short pre-treatment windows combined with volatile outcomes are a recipe for spurious results.
^req-pre-intervention

**Structural stability caveat**: A long $T_0$ may span structural breaks that change the data-generating process. When this is a concern, up-weighting the most recent pre-treatment periods via $v_h$ (the V matrix) can alleviate instability concerns.

### 3. Sufficient Post-Intervention Information

A sufficient post-treatment window is needed to:
- Detect effects that **accumulate gradually** over time (e.g., human capital effects, institutional changes)
- Avoid false negatives from effects that take time to materialize
- Permit the placebo distribution to be estimated with reasonable precision

When only short post-treatment windows are available, surrogate outcomes or **leading indicators** of the outcome of interest may be used.

## When NOT to Use Synthetic Controls

Abadie (2021, Section 9) emphasizes that mechanical application without regard for these requirements produces misleading results. Do not use synthetic controls when:

1. The treated unit cannot be approximated by a convex combination of donor units ($\mathbf{X}_1 \gg \mathbf{X}_0 \mathbf{W}^*$)
2. The donor pool has too few suitable units ($J < 5$) for permutation inference to be meaningful
3. The intervention is not aggregate-level (for individual-level data, see [[Differences-in-Differences]] or [[Regression Discontinuity Designs]])
4. The effect is expected to be small relative to outcome volatility and the post-treatment window is short
5. Anticipation effects contaminate the pre-treatment period and backdating is not plausible

## Connections

- **[[Differences-in-Differences]]**: DiD requires parallel trends (a special case of the linear factor model with constant loadings); SC requires convex hull condition instead. Both require no anticipation and no interference.
- **[[The Selection Problem]]**: SC addresses selection on time-varying unobservables (the $\boldsymbol{\mu}_j$ factors) — going beyond what regression and even DiD can handle
- **[[Instrumental Variables]]**: An alternative when the donor pool is inadequate; IV exploits exogenous variation rather than constructing a counterfactual unit
- **[[Synthetic Control Bias Theory]]**: The formal theory underlying Requirements 3, 4, and 5

## See Also

- [[Synthetic Control]] — basic estimator and implementation
- [[Synthetic Control Bias Theory]] — formal theory of the linear factor model and bias bound
- [[Synthetic Control Inference and Diagnostics]] — how to check requirements via backdating and leave-one-out
- [[Abadie 2021 - Overview]] — full paper overview
