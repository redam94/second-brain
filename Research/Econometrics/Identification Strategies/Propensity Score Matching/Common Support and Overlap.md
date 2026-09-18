---
title: Common Support and Overlap
tags:
  - source/ingested
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Stuart 2010 - Matching Methods for Causal Inference - A Review.pdf]]"
source_location: "Sections 3.3, 6.2, pp. 11, 16-17"
date_ingested: 2026-06-28
folder: "Econometrics/Identification Strategies/Propensity Score Matching"
doc_type: paper
depends_on:
  - "[[Propensity Score and the Balancing Property]]"
used_by:
  - "[[Propensity Score Matching - Overview]]"
  - "[[Matching Methods and Distance Measures]]"
  - "[[DML Estimators for ATE and the Interactive Model]]"
  - "[[Honest Trees and Causal Forests]]"
aliases:
  - Common Support
  - Overlap
  - Region of Common Support
  - Trimming
  - Positivity
---

# Common Support and Overlap

> [!summary]
> **Common support** is the region where the propensity-score (and covariate) distributions of the treated and control groups overlap. The positivity component of strong ignorability, $0 < P(T=1\mid X) < 1$, requires it. Without overlap, an effect can only be obtained by **extrapolation**. A key advantage of matching is that it makes a *lack* of overlap visible — unlike regression/selection models, which silently extrapolate. Analysts restrict to the region of common support, discarding (trimming) units outside the other group's range.

## Overview

Matching methods implicitly assume substantial overlap of the propensity-score distributions. When many controls are very different from all treated units, they are inappropriate comparison points for the ATT. Different matching structures handle overlap differently: **nearest-neighbor with calipers automatically uses only units in (or near) the region of common support**, whereas **subclassification and weighting use all individuals regardless of overlap** — so with those it can be beneficial to *explicitly* restrict to the common-support region.

## Main Content

> [!definition] Region of common support ^def-common-support
> The **region of common support** is the range of propensity-score values (or, more generally, the covariate region) represented in **both** the treated and control groups. Effects can be reliably estimated only within it; outside it, estimation requires extrapolation rather than interpolation. This is the empirical counterpart of the **positivity / overlap** assumption $0 < P(T=1\mid X) < 1$.

> [!definition] Methods for assessing / enforcing common support ^def-trimming
> 1. **Propensity-score trimming:** discard individuals with propensity-score values outside the range of the other group.
> 2. **Convex hull (King and Zeng, 2006):** examine the multidimensional covariate space to identify where comparisons require interpolation vs. extrapolation.
> Defining the discard rule using **one or two key covariates** (rather than the propensity score itself) aids interpretation of *who* is excluded. Calipers in nearest-neighbor matching enforce overlap implicitly.

> [!warning] Common support constrains the estimand ^warn-estimand
> Lack of overlap may make the **ATE** impossible to estimate reliably — e.g., if some controls lie outside the range of treated units, $Y(1)$ for those controls is unidentified without heavy extrapolation. For the **ATT**, discarding *controls* outside the treated range is fine (even beneficial), but discarding *treated* units changes the group to which the results apply (Crump et al., 2009). Examining common support thus informs the choice between ATT and ATE.

> [!definition] Matching surfaces non-overlap that regression hides ^def-vs-regression
> Traditional regression models do not examine the joint distribution of predictors (in particular treatment vs. covariates), so they extrapolate into regions with no support without warning. Matching makes it explicit when the treatment effect cannot be separated from other group differences — a well-specified, highly-interacted outcome regression would reveal the same imbalance, but such models are rarely fit in practice. Selection and regression models perform poorly under insufficient overlap precisely because they do not check it.

## Examples

Region-of-common-support trimming on the propensity-score distribution plot (Stuart and Green, 2008): unmatched control units cluster at low propensity-score values entirely outside the treated units' range; these are discarded so that comparisons rest on interpolation. In the "look forward" guidance, step 3 explicitly directs analysts to *examine the common support and its implications for the estimand* — asking whether there is enough overlap to estimate the ATE, or whether the ATT can be estimated more reliably.

## Connections

- The empirical face of the positivity condition in [[Propensity Score and the Balancing Property]].
- Calipers and weighting handle overlap differently — see [[Matching Methods and Distance Measures]].
- Visualized via the propensity-score distribution plot in [[Covariate Balance Diagnostics]].
- Step 3 of the workflow in [[Propensity Score Matching - Overview]].
- Insufficient overlap is where regression-based fixes for [[Omitted Variables Bias]] and [[The Selection Problem]] fail; the design-based alternative [[Synthetic Control]] faces an analogous support/convex-hull requirement.

## See Also

- [[Propensity Score Matching - Overview]]
- [[Matching Methods and Distance Measures]]
- [[Covariate Balance Diagnostics]]
- [[_Index]]
