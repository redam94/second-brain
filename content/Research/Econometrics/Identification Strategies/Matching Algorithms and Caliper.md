---
title: "Matching Algorithms and Caliper"
aliases:
  - nearest-neighbour matching
  - caliper matching
  - optimal matching
  - full matching
  - propensity score caliper
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/PSM-Rosenbaum-Rubin-Stuart-Survey.md]]"
source_location: "Rosenbaum & Rubin (1985); Stuart (2010) §3"
date_ingested: 2026-06-28
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Propensity Score Matching - Overview]]"
used_by:
  - "[[Covariate Balance and Matching Diagnostics]]"
---

# Matching Algorithms and Caliper

> [!summary]
> After estimating the propensity score, multiple algorithms can form matched pairs or subclasses. The core decision is greedy vs. optimal and whether to impose a caliper. Rosenbaum & Rubin (1985) recommend caliper width $\delta = 0.25\,\sigma_{\text{logit PS}}$ (refined to $0.2\,\sigma$ by Austin 2011) to prevent large mismatches. All algorithms trade off match quality (balance) against sample retention (how many treated units are kept). Balance, not $p$-values, is the arbiter of matching quality.

## Overview

Once the propensity score $\hat{e}(X)$ is estimated (see [[Propensity Score Matching - Overview]]), the matching step constructs a control group that is comparable to the treated group in its propensity-score distribution. Different algorithms make different trade-offs between:

- **Match quality** (how similar matched pairs are)
- **Sample retention** (how many units are kept)
- **Computational cost** (greedy = fast; optimal = slower)

The **distance metric** is typically the absolute difference in logit propensity scores:

$$
d(i, j) = |\text{logit}\,\hat{e}(X_i) - \text{logit}\,\hat{e}(X_j)|
$$

Working on the logit scale rather than the probability scale spreads out units near 0 and 1, improving numerical stability and match quality.

## Nearest Neighbour Matching (Greedy)

> [!definition] Definition: Nearest Neighbour Matching
> For each treated unit $i$, find the control unit $j$ minimising $d(i, j)$. Process treated units in a fixed order (random or by PS value). Once a control is used, it may or may not be re-used (with or without replacement).
^def-nn-matching

**With replacement**: control units can be matched to multiple treated units. Better match quality; effective sample size for controls is reduced. Standard errors must use bootstrap.

**Without replacement**: each control used at most once. Larger matched sample; more variance in match quality. Faster to compute.

**Order sensitivity**: greedy matching gives different results depending on the order in which treated units are processed. Sorting by propensity score (ascending or descending) tends to improve results by processing the most extreme units first.

> [!warning] Greedy ≠ Optimal
> Nearest-neighbour (greedy) matching minimises each individual match distance but may not minimise the *total* distance across all matched pairs. Consider: two treated units A and B; two controls C and D; $d(A,C)=1$, $d(A,D)=5$, $d(B,C)=1.5$, $d(B,D)=1.5$. Greedy (processing A first) gives pairs (A,C) and (B,D) with total distance $1+1.5=2.5$. Optimal matching gives pairs (A,D) and (B,C) — total $5+1.5=6.5$. Here greedy wins; in general the trade-off is not guaranteed.

## Caliper Matching

> [!definition] Definition: Caliper Matching (Rosenbaum & Rubin 1985)
> Nearest-neighbour matching with the additional constraint that a match is only accepted if the distance is within caliper $\delta$:
> $$
> d(i, j) \leq \delta
> $$
> Treated units for which no control falls within $\delta$ are **excluded** from the matched sample.
^def-caliper-matching

A caliper prevents the worst-quality matches at the cost of potentially dropping some treated units. Whether to prioritise sample size or match quality is a design choice that should be driven by the estimand.

> [!definition] Definition: Caliper Width Rule (Rosenbaum & Rubin 1985; Austin 2011)
> Set the caliper in logit-PS units to:
> $$
> \delta = c \cdot \sigma_{\text{logit}}
> $$
> where $\sigma_{\text{logit}}$ is the **standard deviation of the logit propensity score in the full pre-matched sample** and $c$ is a constant.
>
> - Rosenbaum & Rubin (1985): $c = 0.25$
> - Austin (2011, *Pharmaceutical Statistics*): $c = 0.2$ — preferred in current practice
^def-caliper-width

**Intuition:** $\sigma_{\text{logit}}$ scales the caliper to the spread of the PS distribution in the data, so the same $c$ value produces tighter calipers when units are clustered and looser calipers when they are more dispersed.

## Optimal Matching

> [!definition] Definition: Optimal Matching (Rosenbaum 1989)
> Form matched pairs to minimise the **total** matched distance across all pairs simultaneously:
> $$
> \min_{\text{matching}} \sum_{\text{pairs }(i,j)} d(i,j)
> $$
> This is a minimum-weight bipartite matching problem, solved in polynomial time by the Hungarian algorithm or network flow methods.
^def-optimal-matching

Optimal matching avoids the order-sensitivity of greedy approaches and finds the globally best set of pairs. However:
- It is slower (though `optmatch` in R makes it practical)
- It does not guarantee all treated units are matched (some may be excluded if no control is within reach)

**R implementation:** `optmatch` package; called via `MatchIt` with `method = "optimal"`.

## 1:k Matching and Full Matching

**1:k matching**: Each treated unit is matched to $k > 1$ controls. Increases effective control sample size, reducing variance at the cost of some balance quality (the $k$-th match is further away than the first). Common choices: $k = 2, 3, 5$.

> [!definition] Definition: Full Matching (Rosenbaum 1991; Rubin 1991)
> Partition all units (treated and control) into **subclasses** such that each subclass contains at least one treated unit and at least one control unit, and the within-subclass PS variation is minimised. Optimal full matching minimises the within-subclass total distance.
>
> All units are used; the matched-sample estimator applies a weight to each unit proportional to the inverse of the subclass composition.
^def-full-matching

Full matching is the most statistically efficient design (achieves the minimum bias for a given sample) but is more complex to implement and explain. Optimal via `optmatch`; called via `MatchIt(method = "full")`.

## Subclassification

> [!definition] Definition: Subclassification (Cochran 1968, extended by Rosenbaum & Rubin 1983)
> Divide the propensity score distribution into $K$ strata (typically $K=5$ quintiles). Within each stratum, compare mean outcomes between treatment and control. The overall ATT is a weighted average of within-stratum estimates.
^def-subclassification

Subclassification reduces bias from the continuous PS to bias from discrete strata. Cochran (1968) showed that 5 subclasses on the PS removes roughly 90% of the confounding bias. Finer subclassification (10–20 strata) approaches the efficiency of matching. Less precise than pair matching but uses all data.

## Mahalanobis Distance Matching

When $X$ is low-dimensional (2–5 variables), matching directly on the covariate space using **Mahalanobis distance** can outperform PS matching:

$$
d_M(i,j) = \sqrt{(X_i - X_j)^\top \hat{\Sigma}^{-1} (X_i - X_j)}
$$

where $\hat{\Sigma}$ is the pooled sample covariance. As $\dim(X)$ grows, Mahalanobis distance becomes unreliable (Abadie & Imbens 2006, §3.3). A hybrid approach — Mahalanobis matching within a PS caliper — can combine advantages.

## Common Support: Trimming

When treated units exist outside the propensity-score support of the control distribution (or vice versa), matching cannot identify causal effects for those units. Two approaches:

1. **Discard** treated units with $\hat{e}(X_i) > \max_j \hat{e}(X_j)$ for $T_j=0$ — narrows the estimand to the overlap region
2. **Trim** at a threshold (e.g., exclude units with $\hat{e} < 0.05$ or $> 0.95$)

This is not a failure of the method — it is an honest acknowledgement that extrapolation is impossible. The estimand should be stated as the ATT among matched (overlap-region) treated units.

## Software: MatchIt (R)

The `MatchIt` package (Ho, Imai, King & Stuart 2011; updated by Greifer & Stuart 2021) provides a unified interface:

```r
library(MatchIt)

# Nearest neighbour with caliper 0.2 SD
m.out <- matchit(
  T ~ X1 + X2 + X3,
  data = df,
  method = "nearest",
  distance = "logit",
  caliper = 0.2,          # 0.2 SD of logit PS
  ratio = 1,              # 1:1 matching
  replace = FALSE
)

# Optimal matching
m.out2 <- matchit(
  T ~ X1 + X2 + X3,
  data = df,
  method = "optimal",
  distance = "logit"
)

# Full matching
m.out3 <- matchit(
  T ~ X1 + X2 + X3,
  data = df,
  method = "full",
  distance = "logit"
)

summary(m.out)   # balance table
```

After matching, assess balance using `cobalt` — see [[Covariate Balance and Matching Diagnostics]].

## Choosing an Algorithm

| Situation | Recommended method |
|-----------|--------------------|
| Large sample, fast turnaround | NN greedy without replacement |
| Risk of poor matches due to low overlap | NN with caliper $\delta = 0.2\,\sigma_{\text{logit}}$ |
| Optimal match quality, moderate $N$ | Optimal matching |
| Want to use all control units | Full matching |
| Few key confounders ($\leq 5$) | Mahalanobis distance or hybrid |
| Want largest possible effective sample | Subclassification (5–10 strata) |

> [!note] Iteration is Normal
> The right choice of method and caliper is determined empirically by the resulting balance. Match → check balance → adjust method/caliper → rematch until balance is satisfactory. See [[Covariate Balance and Matching Diagnostics]].

## Connections

- [[Propensity Score Matching - Overview]] — the framework and assumptions
- [[Covariate Balance and Matching Diagnostics]] — how to evaluate whether the chosen algorithm achieved balance
- [[Frequentist Causal Estimation]] — IPW as an alternative to matching; DR estimators that combine both
- [[Conditional Independence Assumption]] — the identifying assumption that matching is designed to satisfy; caliper width and common-support trimming choices should be motivated by where this assumption is most plausible

## See Also

- [[Synthetic Control]] — an alternative matching-like approach for aggregate-level data using convex-combination weights
- [[Bayesian Propensity Score Weighting]] — Bayesian extension of weighting (not matching)
- [[Sensitivity Analysis in Observational Studies]] — after confirming balance via matching diagnostics, Rosenbaum bounds quantify robustness of the matched-sample estimate to unmeasured confounding
- [[Nonparametric Causal Inference]] — BART-based methods (BART-BCF) as a nonparametric alternative to matching; avoids the caliper/algorithm selection problem by learning the response surface directly
