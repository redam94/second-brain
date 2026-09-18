---
title: Matching Methods and Distance Measures
tags:
  - source/ingested
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Stuart 2010 - Matching Methods for Causal Inference - A Review.pdf]]"
source_location: "Sections 2.2, 3, pp. 5-11"
date_ingested: 2026-06-28
folder: "Econometrics/Identification Strategies/Propensity Score Matching"
doc_type: paper
depends_on:
  - "[[Propensity Score and the Balancing Property]]"
used_by:
  - "[[Propensity Score Matching - Overview]]"
  - "[[Covariate Balance Diagnostics]]"
aliases:
  - Distance Measures
  - Nearest Neighbor Matching
  - Mahalanobis Matching
  - Full Matching
  - Optimal Matching
---

# Matching Methods and Distance Measures

> [!summary]
> Matching has two ingredients: a **distance measure** $D_{ij}$ defining how "close" two individuals are, and a **matching structure** that uses those distances to form matched groups. Stuart catalogs four affinely-invariant distances (exact, Mahalanobis, propensity-score, caliper / Mahalanobis-within-caliper) and a spectrum of structures (k:1 nearest neighbor, greedy vs. optimal, with/without replacement, subclassification, full matching, weighting) that differ in how many individuals remain and what weights they receive.

## Overview

After choosing covariates, the **distance** $D_{ij}$ between individuals $i$ and $j$ quantifies similarity. All four measures below are **affinely invariant** (matches are unchanged under affine transformations of the data). The matching structure then trades off **bias vs. variance** and which estimand (ATT vs. ATE) is supported. Methods can be thought of as assigning weights between 0 and 1: nearest-neighbor effectively gives weights of 0 or 1; subclassification, full matching, and weighting form a continuum (weighting is the limit of subclassification as subclasses → ∞, full matching in between).

## Main Content

> [!definition] Distance measures ^def-distances
> Four affinely-invariant distances between individuals $i$ and $j$:
> 1. **Exact:** $D_{ij} = 0$ if $X_i = X_j$, and $D_{ij}=\infty$ if $X_i \neq X_j$.
> 2. **Mahalanobis:** $D_{ij} = (X_i - X_j)' \Sigma^{-1} (X_i - X_j)$, where $\Sigma$ is the covariance matrix of $X$ in the full control group (for the ATT) or in the pooled groups (for the ATE).
> 3. **Propensity score:** $D_{ij} = |e_i - e_j|$.
> 4. **Linear propensity score:** $D_{ij} = |\text{logit}(e_i) - \text{logit}(e_j)|$.
>
> Exact and Mahalanobis distances break down when $X$ is high-dimensional (exact leaves many unmatched; Mahalanobis treats all interactions as equally important and works best with < 8 mostly-continuous, normal covariates). Coarsened exact matching (CEM) relaxes exactness by matching on binned ranges.

> [!definition] Caliper and Mahalanobis-within-caliper matching ^def-caliper
> A **caliper** $c$ forbids matches whose propensity scores differ by more than $c$ (typically 0.2-0.25 SD of the linear propensity score). **Mahalanobis matching within propensity-score calipers** combines both — match on Mahalanobis distance of "key covariates" $Z$ only among pairs inside the caliper:
> $$ D_{ij} = \begin{cases} (Z_i - Z_j)' \Sigma^{-1} (Z_i - Z_j), & \text{if } |\text{logit}(e_i) - \text{logit}(e_j)| \le c, \\ \infty, & \text{if } |\text{logit}(e_i) - \text{logit}(e_j)| > c. \end{cases} $$
> This yields samples well matched on the propensity score *and* particularly well matched on the key continuous covariates $Z$ (e.g., baseline test scores).

> [!definition] k:1 nearest neighbor matching ^def-nn
> For each treated individual $i$, select the control(s) with smallest distance from $i$. **1:1** is simplest and nearly always estimates the **ATT** (discarding unmatched controls). The apparent loss of power from discarding controls is usually minimal: precision is driven by the smaller group size, and similar groups reduce extrapolation. **Ratio (k:1)** matching uses more controls per treated unit — reducing variance but increasing bias (2nd/3rd-closest matches are farther). **Variable-ratio** matching lets the ratio vary across treated units (related to full matching).

> [!definition] Greedy vs. optimal matching ^def-optimal
> **Greedy** nearest-neighbor matches treated units one at a time; the result can depend on order. **Optimal** matching minimizes a *global* distance across all matched sets, avoiding order-dependence. Gu and Rosenbaum (1993): optimal matching does not generally produce better-balanced groups than greedy, but does better at assigning controls to treated units — so greedy suffices for well-matched *groups*, optimal is preferable for well-matched *pairs*. Greedy performs poorly under intense competition for controls.

> [!definition] With vs. without replacement ^def-replacement
> **With replacement:** a control can match multiple treated units — reduces bias (good controls reused) and is helpful when few comparable controls exist; order of matching then doesn't matter, but inference is more complex (matched controls are not independent; use **frequency weights** equal to the number of times each control is used, and monitor reuse).  **Without replacement:** each control used at most once.

> [!definition] Subclassification, full matching, and weighting ^def-subclass-full-weight
> These use **all** individuals (vs. discarding in nearest-neighbor).
> - **Subclassification:** form groups (e.g., quintiles) of the propensity-score distribution; estimate effects within subclasses and aggregate. **5-10 subclasses** typically remove ≥ 90% of the bias due to the propensity score; estimates ATE or ATT depending on aggregation weights.
> - **Full matching:** an optimal, automatic form of subclassification — each matched set has ≥ 1 treated and ≥ 1 control; minimizes the average within-set treated-control distance. Estimates ATE or ATT.
> - **Weighting (IPTW):** use the propensity score directly as inverse-probability-of-treatment weights, $w_i = \dfrac{T_i}{\hat e_i} + \dfrac{1 - T_i}{1 - \hat e_i}$, weighting each group up to the full sample (Horvitz-Thompson logic). **Weighting by the odds**, $w_i = T_i + (1-T_i)\dfrac{\hat e_i}{1-\hat e_i}$, targets the ATT. Extreme weights (scores near 0/1) inflate variance; **weight trimming** caps weights, and **doubly-robust** methods combine weighting with outcome modeling.

## Examples

Hansen (2004), SAT-coaching study: the original treated/control groups differed by **1.1 SD** on the propensity score, but **full matching** produced matched sets differing by only **0.01-0.02 SD** — retaining all controls while achieving near-optimal balance.

With-replacement frequency weights: if one treated unit is matched to 3 controls, each of those controls receives weight **1/3**; a control matched to a single treated unit gets weight **1**.

## Connections

- Operationalizes the [[Propensity Score and the Balancing Property]] (the distances rely on $e(X)$).
- Step 2 of the pipeline in [[Propensity Score Matching - Overview]].
- Every method must be checked with [[Covariate Balance Diagnostics]] and respect [[Common Support and Overlap]] (calipers automatically enforce overlap; weighting/subclassification do not).
- The IPTW weighting use links to [[Bayesian Inverse Probability Weighting]], [[Bayesian Inverse Probability Weighting]], and [[Frequentist Causal Estimation]].

## See Also

- [[Propensity Score Matching - Overview]]
- [[Common Support and Overlap]]
- [[Covariate Balance Diagnostics]]
- [[_Index]]
