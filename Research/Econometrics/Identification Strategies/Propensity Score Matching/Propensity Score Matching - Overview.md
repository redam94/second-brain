---
title: Propensity Score Matching - Overview
tags:
  - source/ingested
  - topic/causal-inference
  - type/overview
  - doc/paper
source: "[[raw/Stuart 2010 - Matching Methods for Causal Inference - A Review.pdf]]"
source_location: "Sections 1-2, pp. 1-7"
date_ingested: 2026-06-28
folder: "Econometrics/Identification Strategies/Propensity Score Matching"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Propensity Score and the Balancing Property]]"
used_by:
  - "[[Matching Methods and Distance Measures]]"
  - "[[Covariate Balance Diagnostics]]"
  - "[[Common Support and Overlap]]"
aliases:
  - PSM
  - Matching Methods
  - Propensity Score Matching
---

# Propensity Score Matching - Overview

> [!summary]
> Matching methods aim to replicate a randomized experiment from observational data by selecting treated and control subjects with **similar covariate distributions**, thereby reducing bias due to the covariates. Stuart (2010) reviews the Rosenbaum-Rubin propensity-score framework, organizing matching into four steps — defining closeness (a distance measure), implementing a matching method, diagnosing covariate balance, and only then estimating the treatment effect. A central tenet is the separation of **design** (steps 1-3, done without the outcomes) from **analysis** (step 4).

## Overview

Randomized experiments guarantee that treated and control groups differ only randomly on all covariates, observed and unobserved. In nonexperimental studies the assignment mechanism is unknown, so matching tries to reconstruct balanced groups for the **observed** covariates. Stuart defines "matching" broadly as *any method that aims to equate (or "balance") the distribution of covariates in the treated and control groups*.

Two settings:
1. **Outcomes not yet collected** — matching selects a subset of controls for follow-up (cost-driven; the original setting of the method).
2. **Outcomes already available** — matching reduces bias before estimating the effect.

A defining feature: the **outcome is never used in the matching process**, even when available. This precludes (even the appearance of) selecting a sample that produces a desired result, and lets one match repeatedly and pick the best-balanced sample — exactly as a particular randomization may be rejected in experimental design.

Matching is **complementary to**, not in competition with, regression adjustment; the two work best in combination ("double robustness"). Matching's advantages: it makes the quality of the comparison transparent, it highlights regions of poor covariate overlap (where regression/selection models extrapolate badly), and it has straightforward diagnostics.

## Main Content

> [!definition] Design vs. analysis stages ^design-analysis
> Any study estimating an effect has two stages: **(1) Design** — using only background information (covariates, treatment indicator), the nonexperimental study is structured to mimic a randomized experiment; **(2) Analysis** — comparing outcomes of the matched treated and controls. Stages 1-3 of matching are "design"; only step 4 is "analysis." The outcome values must not enter the design stage.

> [!definition] The four steps of matching ^four-steps
> 1. **Defining "closeness"** — the distance measure used to decide whether one individual is a good match for another (which covariates to include + how to combine them).
> 2. **Implementing a matching method** given that distance (nearest neighbor, subclassification, full matching, weighting).
> 3. **Assessing balance** of the resulting matched samples; iterate steps 1-2 until well-matched samples result.
> 4. **Analysis of the outcome** and estimation of the treatment effect, given the matching from step 3.

> [!definition] Estimands: ATT and ATE ^estimands
> With response surfaces $R_1(x) = E(Y(1)\mid X=x)$ and $R_0(x) = E(Y(0)\mid X=x)$, the conditional effect is $\tau(x) = R_1(x) - R_0(x)$. The two common estimands are the **Average Treatment effect on the Treated (ATT)** — the effect for those in the treatment group — and the **Average Treatment Effect (ATE)** — the effect over all individuals. The choice drives both the distance measure (e.g., which $\Sigma$ for Mahalanobis) and the matching method, and depends on substantive interest and data availability (e.g., whether there is overlap to support the ATE).

> [!definition] Four uses of the propensity score ^four-uses
> Once estimated, the propensity score is used in four ways: **(1) matching** (nearest-neighbor / caliper); **(2) stratification / subclassification** (grouping by propensity-score quantiles); **(3) weighting** (inverse-probability-of-treatment weighting, IPTW, and weighting by the odds); **(4) covariate adjustment** (including the propensity score as a regressor). Weighting is the limiting case of subclassification as the number of subclasses goes to infinity, with full matching in between.

## Examples

Chapin (1947): with pools of 671 treated and 523 controls, requiring **exact** matches on just six categorical covariates yielded only 23 matched pairs. The 1983 introduction of the propensity score solved this curse of dimensionality — it summarizes all covariates into a **single scalar**, so matched sets with similar covariate distributions can be built **without** requiring close or exact matches on every individual variable.

A worked pipeline: estimate $\hat e_i$ by logistic regression of treatment on covariates → match each treated unit to its nearest control on the linear propensity score within a caliper → check standardized mean differences and variance ratios → if balanced, run a (possibly regression-adjusted) outcome model on the matched sample; if not, revise the propensity model and re-match.

## Connections

- Built on the [[Potential Outcomes Framework]] (Rubin causal model) and the strong-ignorability assumption — see [[Conditional Independence Assumption]].
- The theoretical engine is the [[Propensity Score and the Balancing Property]].
- Concrete matching algorithms and distances: [[Matching Methods and Distance Measures]].
- Quality control: [[Covariate Balance Diagnostics]] and [[Common Support and Overlap]].
- Frequentist estimation context: [[Frequentist Causal Estimation]]; the weighting use connects to [[Bayesian Inverse Probability Weighting]] and [[Bayesian Propensity Score Weighting]].
- Addresses [[The Selection Problem]] and [[Omitted Variables Bias]] for *observed* confounders; an alternative observational-design strategy is [[Synthetic Control]].

## See Also

- [[Propensity Score and the Balancing Property]]
- [[Matching Methods and Distance Measures]]
- [[Covariate Balance Diagnostics]]
- [[Common Support and Overlap]]
- [[_Index]]
