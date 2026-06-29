---
title: Matching Algorithms and Caliper Matching
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/concept
  - doc/paper
  - method/r
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§2, pp. 3–8"
date_ingested: 2026-06-29
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Propensity Score Matching]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Covariate Balance Diagnostics]]"
aliases:
  - nearest neighbor matching
  - caliper matching
  - MatchIt
  - matching estimator
---

# Matching Algorithms and Caliper Matching

> [!summary]
> Given estimated propensity scores, several matching algorithms pair treated units with comparable controls. Nearest-neighbor (NN) matching is greedy and computationally fast; caliper matching enforces a maximum propensity-score distance to prevent poor matches; k:1 matching trades variance reduction against more control units per treated unit. The R package MatchIt implements all major algorithms. After matching, always check covariate balance with [[Covariate Balance Diagnostics]] — the algorithm choice matters less than the resulting balance.

## Overview

Once propensity scores are estimated (see [[Propensity Score Matching#def-propensity-score]]), a matching algorithm selects control units to pair with each treated unit. The goal is a matched sample where the propensity score distributions — and therefore covariate distributions — are balanced across treatment arms, approximating a randomized experiment.

The choice of algorithm involves tradeoffs between:
- **Bias**: How well are covariates balanced?
- **Variance**: How many matched units are used?
- **Computational cost**: Greedy vs. optimal matching

## 1. Nearest-Neighbor (NN) Matching

The most common approach: for each treated unit $i$, find the control unit with the closest propensity score.

> [!definition] Definition: Nearest-Neighbor Matching
> For treated unit $i$, the matched control $j^*(i)$ is:
> $$j^*(i) = \arg\min_{j: T_j=0} |\hat{e}(X_i) - \hat{e}(X_j)|$$
> or equivalently on the **logit scale**:
> $$j^*(i) = \arg\min_{j: T_j=0} |\text{logit}\,\hat{e}(X_i) - \text{logit}\,\hat{e}(X_j)|$$
> The logit scale is preferred because propensity scores near 0 or 1 are compressed, and logit spacing better reflects the informativeness of the distance.
> ^def-nn-matching

**Greedy matching**: Treated units are processed sequentially; each control is matched to the closest treated unit encountered so far. Simple but may leave poor matches for later-processed treated units.

**Optimal matching**: Finds the assignment of controls to treated units that minimizes the total propensity-score distance globally (as a linear assignment problem). Produces better balance than greedy but is $O(N^3)$ — computationally heavier for large samples.

**With vs. without replacement**:
- *Without replacement*: Each control can be matched to at most one treated unit. Reduces sample size in matched dataset, increases variance, but avoids reusing imperfect matches.
- *With replacement*: A control can be matched to multiple treated units. Improves balance (always uses the closest control) at the cost of effective sample size reduction for the control group.

## 2. Caliper Matching

Pure NN matching can create poor matches when there is limited overlap — the nearest control may still be quite distant. Caliper matching imposes a maximum allowable distance.

> [!definition] Definition: Caliper Matching
> A **caliper** $\delta$ is a maximum allowable propensity-score distance. Treated unit $i$ is matched only if there exists a control $j$ with:
> $$|\hat{e}(X_i) - \hat{e}(X_j)| \leq \delta$$
> Units in regions of poor overlap with no match within the caliper are **dropped** from the analysis — restricting to a region of common support where comparisons are credible.
> ^def-caliper

**Standard caliper width** (Cochran & Rubin 1973; Austin 2011):
$$\delta = 0.2 \times \text{SD}(\text{logit}\,\hat{e}(X))$$
This is a rule of thumb: 0.2 standard deviations of the logit propensity score. It is well-calibrated to reduce bias while retaining most treated units in typical applications.

> [!example] Caliper in Practice
> **Setup**: 500 treated units; logit propensity scores have SD = 0.8. Caliper = $0.2 \times 0.8 = 0.16$.
> **Effect**: Treated units with propensity scores in regions with no control unit within 0.16 logit units are excluded — typically units with very high probability of treatment (tail of distribution).
> **Tradeoff**: Excludes perhaps 5–15% of treated units; remaining matches are much cleaner. The ATT estimate applies to the subset with common support, not all treated units.
> ^ex-caliper

## 3. k:1 Matching

Instead of matching each treated unit to a single control, match each treated unit to $k$ controls.

| $k$ | Trade-off |
|-----|-----------|
| 1:1 | Minimum variance in matched controls; maximum balance |
| 2:1 | More control units per treated unit; lower variance for outcome model; slightly worse balance |
| 5:1 | Large matched sample; further variance reduction; balance degrades further |
| Variable | Some treated units matched to 1, others to $k$; useful with unequal local densities |

For $k > 1$, the ATT estimator becomes:
$$\hat{\tau}^{ATT} = \frac{1}{N_1} \sum_{i: T_i=1} \left[Y_i - \frac{1}{k} \sum_{m=1}^{k} Y_{j_m(i)}\right]$$
where $j_1(i), \ldots, j_k(i)$ are the $k$ matched controls for treated unit $i$.

The bias-variance tradeoff for $k$: $k=1$ minimizes bias (best balance) but maximizes variance. Larger $k$ reduces variance at the cost of worse balance (more distant matches). In practice, $k \leq 5$ with caliper is typical.

## 4. Full Matching

Full matching (Rosenbaum 1991; Hansen 2004) creates matched sets containing at least one treated unit and at least one control unit, with no upper limit on set size. It is generally optimal in the sense of minimizing the total within-set propensity-score distance.

Full matching uses all units (no trimming), avoids the k:1 rigidity, and produces the most efficient estimator under the matching paradigm. The ATT estimator requires weights that upweight small sets and downweight large sets.

## 5. Mahalanobis Distance Matching

An alternative to propensity-score matching: use the Mahalanobis distance directly in covariate space:
$$d_M(X_i, X_j) = \sqrt{(X_i - X_j)^T \Sigma^{-1} (X_i - X_j)}$$
where $\Sigma$ is the sample covariate covariance matrix. This is exact matching on the $p$-dimensional covariate space.

Advantage over PSM: directly balances each covariate. Disadvantage: suffers from the curse of dimensionality for large $p$; may perform worse than PSM when $p$ is large. **Hybrid**: match on Mahalanobis distance within propensity score calipers — ensures no unit is matched to a very different propensity score while also balancing individual covariates.

## R Implementation: MatchIt

The R package MatchIt (Ho, Imai, King & Stuart 2011) implements all major matching algorithms via a unified interface.

```r
library(MatchIt)

# 1:1 nearest-neighbor matching with caliper
m.out <- matchit(
  treatment ~ age + income + health + education,
  data = observational_df,
  method = "nearest",      # greedy NN matching
  distance = "logit",      # use logit(PS) as distance
  caliper = 0.2,           # 0.2 SD of logit PS (default interpretation)
  std.caliper = TRUE,      # caliper in SD units (recommeded)
  ratio = 1,               # 1:1 matching
  replace = FALSE          # without replacement
)

# Summary of matching quality
summary(m.out)

# Extract matched data
matched_data <- match.data(m.out)

# Estimate ATT on matched data
library(lmtest); library(sandwich)
fit <- lm(outcome ~ treatment, data = matched_data, weights = weights)
coeftest(fit, vcov. = vcovCL(fit, cluster = ~subclass))
# 'subclass' accounts for matched-pair structure in SE
```

```r
# Full matching
m.full <- matchit(
  treatment ~ age + income + health + education,
  data = observational_df,
  method = "full",         # full matching
  distance = "logit"
)

# Optimal matching (computationally heavier)
m.opt <- matchit(
  treatment ~ age + income + health + education,
  data = observational_df,
  method = "optimal",
  distance = "logit"
)
```

After matching, pass the matched data to [[Covariate Balance Diagnostics]] to verify balance before estimating outcomes.

## Standard Errors for Matched Estimators

After matching, naive OLS standard errors underestimate uncertainty because they ignore the matched-pair structure. Options:
1. **Cluster-robust SEs** on matched pair (subclass) — implemented via `vcovCL` with `cluster = ~subclass`
2. **Bootstrap SEs** that re-run the matching within each bootstrap draw (computationally expensive but asymptotically valid)
3. **Abadie-Imbens SEs** (Abadie & Imbens 2006, 2012): analytically corrected SEs for NN matching that account for the estimation of propensity scores

> [!warning] Matching Uncertainty
> Using the matched sample as if it were a randomized experiment produces overconfident standard errors. Always use SEs that account for matched-pair structure. For Bayesian inference on the matched data, see [[Bayesian Propensity Score Weighting]] for the Liao-Zigler approach that propagates propensity score uncertainty from the treatment model.

## Connections

- [[Propensity Score Matching]] — theory establishing why matching on the PS is valid
- [[Covariate Balance Diagnostics]] — what to check after matching to verify balance
- [[Frequentist Causal Estimation]] — IPW and DR estimators as alternatives to matching

## See Also
- [[Bayesian Propensity Score Weighting]] — Bayesian approach: marginalize over posterior PS uncertainty rather than matching
- [[Nonparametric Causal Inference]] — BART as a non-matching alternative for confounding adjustment
- [[Sensitivity Analysis in Observational Studies]] — sensitivity to unmeasured confounding after matching
