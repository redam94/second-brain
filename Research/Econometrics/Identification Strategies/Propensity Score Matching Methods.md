---
title: "Propensity Score Matching Methods"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Imbens 2004 - Nonparametric Estimation of Average Treatment Effects.md]]"
source_location: "§5, Review of Economics and Statistics 86(1):4–29"
date_ingested: 2026-07-01
folder: "Econometrics/Identification Strategies"
doc_type: concept
depends_on:
  - "[[Propensity Score Definition and Properties]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Potential Outcomes Framework]]"
  - "[[Rosenbaum and Rubin 1983 - Overview]]"
used_by:
  - "[[Covariate Balance Diagnostics]]"
  - "[[Frequentist Causal Estimation]]"
  - "[[Activity Bias in Advertising]]"
  - "[[Observational vs Experimental Methods in Advertising]]"
aliases:
  - nearest-neighbor matching
  - caliper matching
  - propensity score subclassification
  - coarsened exact matching
  - PSM
  - matching estimator
---

# Propensity Score Matching Methods

> [!summary]
> Propensity score matching creates a comparison group by pairing each treated unit with one or more control units that have similar estimated propensity scores, then estimates the treatment effect from the paired-difference in outcomes. The core methods — nearest-neighbor, caliper, subclassification, and full matching — differ in how strictly matches are required and what to do with unmatched units. All require post-matching balance checks; if balance fails, iterate on the propensity model.

## Overview

After estimating the propensity score $\hat{e}(X)$, matching methods use it to construct a comparison group from observational data. The logic: [[Propensity Score Definition and Properties#^thm-balancing|Theorem 1 (Balancing)]] says that conditioning on $e(X)$ removes the dependence between $T$ and $X$. If we compare treated and control units with the *same* propensity score, we are comparing units that are (in expectation) comparable on all observed covariates.

Matching differs from weighting (IPW): instead of reweighting every unit, matching discards or downweights control units that are too different from treated units. This changes the estimand slightly — matched estimators typically target the **ATT** (average treatment effect on the treated), not the ATE — but produces a cleaner comparison group.

## Nearest-Neighbor Matching

> [!definition] Nearest-Neighbor Matching
> For each treated unit $i$ with propensity score $\hat{e}(X_i)$, find the $M$ control units with the closest propensity scores:
> $$\mathcal{J}_M(i) = \text{argmin}_{j : T_j = 0, |\hat{e}(X_j) - \hat{e}(X_i)| \text{ minimal}} \quad (M \text{ matches})$$
> Estimate ATT as the average of within-pair outcome differences:
> $$\hat\tau^{\text{ATT}}_M = \frac{1}{N_T} \sum_{i: T_i=1} \left[ Y_i - \frac{1}{M}\sum_{j \in \mathcal{J}_M(i)} Y_j \right]$$
^def-nn-matching

**With vs. without replacement:**
- *With replacement:* A control unit can serve as a match for multiple treated units. Reduces bias (better matches) but increases variance (matched controls contribute more).
- *Without replacement:* Each control unit is matched at most once. Reduces variance but can increase bias if there are few suitable controls.

**1:1 vs. 1:K matching:**
- $M=1$ minimizes bias (exact matches), maximizes variance.
- $M > 1$ uses more data but risks including poorer-quality matches. $M = 4$ is a common choice.

**Greedy vs. optimal:**
- *Greedy (sequential):* Match treated units one at a time, each time choosing the nearest available control.
- *Optimal:* Minimize total matching distance across all pairs simultaneously. Computationally heavier but gives better overall balance.

## Caliper Matching

> [!definition] Caliper Matching
> Nearest-neighbor matching with a **tolerance constraint**: only accept a match if the propensity score distance is within a caliper $\delta$:
> $$|logit(\hat{e}(X_j)) - logit(\hat{e}(X_i))| < \delta$$
> Treated units with no control unit within $\delta$ are left **unmatched** and excluded from the estimator.
^def-caliper

**Why caliper on the logit?** Austin (2011) shows that the standard deviation of the logit-transformed propensity score is more stable across datasets than the SD of the propensity score itself. The standard recommendation is:

$$\delta = 0.2 \times \text{SD}(\text{logit}(\hat{e}(X)))$$

This caliper removes ~99% of the bias from a single standard-normal confounder (Austin 2011).

**Tradeoff:** A wider caliper retains more matched pairs (larger effective sample size) but allows worse-quality matches. A narrower caliper improves match quality but may drop many treated units, changing the estimand to the ATT among treated units with sufficient overlap.

**Practical guidance:**
- Always check how many treated units are unmatched; if > 10%, the effective sample may be unrepresentative.
- Report the ATT *with* and *without* caliper restriction to assess sensitivity.

## Subclassification (Stratification)

> [!definition] Subclassification
> Divide the propensity score distribution into $J$ strata (subclasses) $S_1, \ldots, S_J$ where $S_k = \{i : c_{k-1} \le \hat{e}(X_i) < c_k\}$ for cutpoints $c_0 = 0 < c_1 < \cdots < c_J = 1$. Estimate the treatment effect within each stratum, then aggregate:
> $$\hat\tau^{\text{sub}} = \sum_{k=1}^{J} \frac{n_k}{N} \hat\tau_k, \quad \hat\tau_k = \bar{Y}_{T=1, k} - \bar{Y}_{T=0, k}$$
^sec-subclassification

**Cochran (1968) result:** Five equal-probability subclasses (quintiles) removes approximately **90% of the bias** due to a single normally distributed covariate. Subclassification is less precise than matching but simpler and retains all units (no discarding).

**Choosing $J$:** In most applications, 5–10 subclasses are sufficient. More subclasses give better balance but sparser within-stratum samples. Check within-stratum balance diagnostics ([[Covariate Balance Diagnostics]]) to verify adequate balance.

**Connection to propensity score weighting:** Subclassification is a coarse form of IPW — it reweights covariate distributions using discrete propensity score strata rather than continuous weights.

## Full Matching

> [!definition] Full Matching (Rosenbaum 1991)
> An optimal assignment of treated and control units into matched sets, where each set contains either one treated unit and one or more controls, or one control unit and one or more treated units. Full matching minimizes the total within-set propensity score distance subject to the constraint that every unit is in some set.
^def-full-matching

Full matching retains all treated and control units (unlike caliper matching, which may discard some) and is guaranteed to achieve better balance than any fixed-ratio matching scheme. Implemented in R's `optmatch` and `MatchIt` packages.

## Mahalanobis Distance Matching

An alternative to propensity score matching: match directly on the Mahalanobis distance in covariate space:
$$d_M(i,j) = \sqrt{(X_i - X_j)^T S^{-1} (X_i - X_j)}$$
where $S$ is the sample covariance matrix of $X$.

**Comparison with propensity score matching:**
- Mahalanobis distance matches on all covariates simultaneously; it performs well in low dimensions but degrades rapidly as $p$ grows (curse of dimensionality).
- Propensity score matching reduces to one dimension but can miss imbalances in individual covariates when the propensity model is misspecified.
- **Combined approach (Rubin & Thomas 2000):** Match on a linear combination of the Mahalanobis distance and the propensity score; reduces sensitivity to either model alone.

## Coarsened Exact Matching (CEM)

> [!definition] Coarsened Exact Matching (Iacus, King & Porro 2012)
> Coarsen each covariate into bins (coarsen), then exactly match units that fall in the same bin on every covariate. Unmached units are pruned.
^def-cem

CEM is a non-propensity approach that guarantees exact match on the coarsened version of $X$. It has better statistical properties than propensity score matching under model misspecification (it is model-invariant to the outcome model) but is sensitive to the coarsening choice and can discard many units.

## ATT vs. ATE

Matching methods typically estimate the **ATT** (average treatment effect on the treated), not the ATE:
- ATT: $\tau^{\text{ATT}} = E[Y(1) - Y(0) \mid T=1]$
- ATE: $\tau^{\text{ATE}} = E[Y(1) - Y(0)]$

To estimate ATE via matching, one must also match each *control* unit to treated units — a symmetric matching. In many applied settings (e.g., policy evaluation), ATT is the policy-relevant estimand: "what was the effect on those who actually received the treatment?"

## Estimating ATT with Matched Sample

After 1:1 nearest-neighbor matching without replacement:

```python
from sklearn.linear_model import LogisticRegression
import numpy as np, pandas as pd

# 1. Estimate propensity score
X, T, Y = df[covariates], df['treatment'], df['outcome']
ps_model = LogisticRegression(max_iter=1000).fit(X, T)
ps = ps_model.predict_proba(X)[:, 1]

# 2. Nearest-neighbor 1:1 matching without replacement (greedy)
treated_idx = np.where(T == 1)[0]
control_idx = np.where(T == 0)[0]
matches = {}
available = set(control_idx)
for i in treated_idx:
    dists = np.abs(ps[i] - ps[list(available)])
    j = list(available)[np.argmin(dists)]
    matches[i] = j
    available.remove(j)

# 3. Estimate ATT
ate = np.mean([Y.iloc[i] - Y.iloc[j] for i, j in matches.items()])
```

For production use, the `MatchIt` R package and Python's `causalinference` or `econml` packages handle matching with balance diagnostics.

## Common Pitfalls

1. **Checking balance AFTER matching is not optional.** A propensity score model can have excellent predictive accuracy but poor balance (e.g., if the model underfits important nonlinearities). Always run [[Covariate Balance Diagnostics]] and iterate if needed.

2. **Do not use post-matching covariate balance tests ($t$-tests, $\chi^2$ tests) with $p$-values.** These tests are sensitive to sample size, not balance quality. Use standardized mean differences (SMD) instead.

3. **Trimming the propensity score.** If some units have $\hat{e}(X) \approx 0$ or $\hat{e}(X) \approx 1$, IPW weights become extreme and matching quality degrades. Consider trimming the sample to the region of common support before matching.

4. **Regression adjustment after matching.** Even after matching, residual imbalance may remain. Running a regression of $Y$ on $T$ and covariates *within the matched sample* ("double adjustment") further reduces this residual bias.

5. **Standard errors.** Naive standard errors from the matched-pairs analysis understate uncertainty because they ignore variability in the estimated propensity scores. Bootstrap standard errors (re-estimating the propensity score in each bootstrap draw) are preferred.

## Connections

- [[Propensity Score Definition and Properties]] — The balancing and ignorability theorems that justify matching
- [[Covariate Balance Diagnostics]] — Essential: always check balance after matching
- [[Frequentist Causal Estimation]] — IPW and doubly-robust estimators as alternatives to matching
- [[Bayesian Propensity Score Weighting]] — Bayesian treatment of uncertainty in the propensity score
- [[Rosenbaum and Rubin 1983 - Overview]] — The foundational paper

## See Also

- [[Activity Bias in Advertising]] — Why propensity score matching cannot fix activity bias (unconfoundedness violated)
- [[Conditional Independence Assumption]] — The identification assumption all matching methods require
- [[Omitted Variables Bias]] — What remains if unconfoundedness fails despite matching
- [[Nonparametric Causal Inference]] — BART/ML alternative to matching for response-surface estimation
- [[Doubly-Robust Estimands for ATT(g,t)]] — Doubly-robust estimators in the DiD setting use propensity score reweighting in a similar way
