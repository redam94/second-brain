---
title: "PSM Algorithms and Matching Estimators"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - topic/propensity-score
  - topic/matching
  - type/concept
  - doc/paper
source: "[[raw/Caliendo Kopeinig 2008 - Practical Guidance for PSM]]"
source_location: "Journal of Economic Surveys 22(1): 31–72 (2008), §2–§4"
date_ingested: 2026-06-30
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Propensity Score Matching - Overview]]"
  - "[[Causal Estimands]]"
used_by:
  - "[[Covariate Balance and Overlap Diagnostics]]"
  - "[[Frequentist Causal Estimation]]"
aliases:
  - nearest neighbor matching
  - caliper matching
  - kernel matching
  - Mahalanobis distance matching
  - MatchIt
---

# PSM Algorithms and Matching Estimators

> [!summary]
> Once propensity scores are estimated, a matching algorithm uses them to construct the counterfactual outcome for each treated unit by selecting or weighting similar control units. The main algorithms are: nearest-neighbor matching (NNM), caliper matching, kernel/radius matching, and Mahalanobis distance matching. Algorithms differ in their bias–variance trade-off and computational cost. After matching, the ATT estimator is the average treated–matched-control outcome difference, optionally bias-corrected (Abadie & Imbens 2006).

## Overview

Given propensity scores $\hat{e}(X_i)$ from a logit model, a matching algorithm constructs $J(i)$ — the set of control units matched to each treated unit $i$. The choice of algorithm determines the bias–variance trade-off of the resulting ATT estimator.

The generic ATT estimator after matching is:

$$\hat{\tau}_{ATT} = \frac{1}{N_1} \sum_{i: D_i=1} \left[ Y_i - \hat{Y}_{0i} \right], \quad \hat{Y}_{0i} = \sum_{j \in J(i)} w_{ij} Y_j$$

where $w_{ij}$ are the algorithm-specific weights assigned to matched control units $j$.

## Algorithm 1: Nearest-Neighbor Matching (NNM)

> [!definition] Definition: Nearest-Neighbor Matching
> For each treated unit $i$, find the control unit $j^*(i)$ that minimizes the propensity score distance:
> $$j^*(i) = \arg\min_{j: D_j=0} |\hat{e}(X_i) - \hat{e}(X_j)|$$
> The matched control provides the counterfactual: $\hat{Y}_{0i} = Y_{j^*(i)}$.
^def-nnm

**Key choices:**

| Choice | Options | Trade-off |
|--------|---------|-----------|
| k (controls per treated) | 1:1, 2:1, k:1 | Higher k reduces variance, increases bias |
| With / without replacement | With (default); without | With replacement: better matches; without: each control used once |
| Greedy / optimal | Greedy (sequential); optimal (global minimization) | Optimal is better but computationally expensive |
| Order of processing | Random; by PS distance | Random ordering preferred for greedy |

**Bias–variance trade-off with k:**
- $k=1$: best matches, highest variance (few controls used)
- $k>1$: slightly worse matches, lower variance

In practice, 1:1 or 2:1 NNM is standard. The **Abadie–Imbens (2006) bias correction** (see below) removes the additional bias from imperfect matches.

## Algorithm 2: Caliper Matching

> [!definition] Definition: Caliper Matching
> NNM with an added constraint: only match units if the propensity score distance is within a **caliper** $c$:
> $$J(i) = \{j^*(i)\} \text{ only if } |\hat{e}(X_i) - \hat{e}(X_j^*(i))| \leq c$$
> Treated units for whom no control falls within the caliper are **discarded** (excluded from the estimator).
^def-caliper

> [!definition] Definition: Caliper Width (Cochran–Rubin Rule)
> The standard caliper width recommended by Cochran & Rubin (1973) and Austin (2011):
> $$c = 0.2 \times \hat{\sigma}_{\text{logit}(e)}$$
> where $\hat{\sigma}_{\text{logit}(e)}$ is the sample standard deviation of the **logit of the estimated propensity score** in the full sample.
^def-caliper-width

**Rationale:** The logit scale spreads out the propensity score distribution and prevents poor matches near the extremes. A caliper of 0.2σ has been shown empirically to remove >90% of bias (Austin 2011).

**Key trade-off:** The caliper prevents bad matches (reducing bias) at the cost of excluding treated units with no good control match (reducing the target population and potentially ATE coverage).

## Algorithm 3: Kernel and Radius Matching

> [!definition] Definition: Kernel Matching
> Use a **weighted average** of all control units as the counterfactual for each treated unit $i$:
> $$\hat{Y}_{0i} = \frac{\sum_{j: D_j=0} K\!\left(\frac{\hat{e}(X_i) - \hat{e}(X_j)}{h}\right) Y_j}{\sum_{j: D_j=0} K\!\left(\frac{\hat{e}(X_i) - \hat{e}(X_j)}{h}\right)}$$
> where $K(\cdot)$ is a kernel function (Gaussian, Epanechnikov, uniform) and $h$ is the bandwidth.
^def-kernel

**Radius matching** is the discrete analogue: use the simple average of all controls within a radius $r$ of $\hat{e}(X_i)$.

**Advantages over NNM:**
- Exploits more information from the control group (lower variance)
- Does not discard any treated unit
- Bandwidth $h$ controls smoothness (larger $h$ = more controls, lower variance, higher bias)

**Disadvantage:** Uses control units that may be poor matches (high bias if bandwidth is too large); bandwidth selection is non-trivial.

## Algorithm 4: Mahalanobis Distance Matching

> [!definition] Definition: Mahalanobis Distance Matching
> Match on the **full covariate vector** $X$ using the Mahalanobis distance:
> $$d(X_i, X_j) = \sqrt{(X_i - X_j)^\top \hat{\Sigma}^{-1} (X_i - X_j)}$$
> where $\hat{\Sigma}$ is the sample covariance matrix of $X$.
^def-mahalanobis

Mahalanobis matching bypasses the propensity score and matches directly on $X$. It handles the correlation structure among covariates and gives equal "weight" to each standardized covariate.

**Combined approach:** Mahalanobis matching within a propensity score caliper — the two methods are complementary:
- **Caliper** prevents gross PS mismatches (protects overlap)
- **Mahalanobis** optimizes covariate-level balance within the caliper

This combined approach is recommended when the number of covariates is small (≤10) and all are important.

## Replacement and Estimand Considerations

**With replacement:** Each control unit can be used as a match for multiple treated units.
- Pro: Produces better matches (lower bias)
- Con: Matched controls have unequal weights → requires weighted variance estimation; and reduces effective sample size

**Without replacement:** Each control unit matched at most once; greedy sequential matching.
- Pro: Simpler inference
- Con: Match quality degrades as the set of available controls is exhausted

**For ATE (vs ATT):**
- ATE requires matching treated units to controls AND control units to treated units (bilateral matching)
- ATT only requires matching treated to controls
- Most PSM implementations default to ATT

## Abadie–Imbens Bias-Corrected Estimator

Standard NNM has a bias of order $O(N^{-1/d_{\min}})$ where $d_{\min}$ is the dimension of the matching space. Abadie & Imbens (2006) propose a bias correction:

> [!definition] Definition: Abadie–Imbens Bias-Corrected ATT Estimator
> $$\hat{\tau}_{ATT}^{BC} = \frac{1}{N_1} \sum_{i: D_i=1} \left[ Y_i - Y_{j(i)} - \underbrace{\left(\hat{\mu}_0(X_i) - \hat{\mu}_0(X_{j(i)})\right)}_{\text{regression bias correction}} \right]$$
> where $\hat{\mu}_0(x) = E[Y_0 \mid X = x]$ is an outcome regression fit on the control group, and $j(i)$ is the matched control unit.
^def-bc-estimator

The correction removes the $O(N^{-1/d_{\min}})$ leading bias term, leaving a $\sqrt{N}$-consistent estimator.

## Algorithm Comparison

| Algorithm | Bias | Variance | Discards units | Bandwidth/caliper needed |
|-----------|------|----------|----------------|-------------------------|
| NN (1:1, no caliper) | Medium | High | No | No |
| NN + caliper (0.2σ) | Low | High | Possibly | Caliper $c$ |
| k:1 NNM | Higher (k > 1) | Lower | No | No |
| Kernel | Higher | Low | No | Bandwidth $h$ |
| Radius | Medium | Medium | Possibly | Radius $r$ |
| Mahalanobis | Low | High | No | No |
| Mahalanobis + PS caliper | Very low | Medium | Possibly | Caliper $c$ |

**Practical recommendation (Caliendo & Kopeinig 2008):** Use 1:1 NNM with a 0.2σ caliper as the baseline. Report additional algorithms as robustness checks. Always apply the Abadie–Imbens bias correction for inference.

## Software

| Package | Language | Key methods |
|---------|----------|-------------|
| `MatchIt` | R | NN, caliper, kernel, Mahalanobis, optimal; integrates with `cobalt` for balance |
| `WeightIt` | R | IPW, entropy balancing, CBPS; no matching |
| `cobalt` | R | Balance tables, Love plots; works with MatchIt/WeightIt output |
| `optmatch` | R | Optimal full matching |
| `pysmatch` | Python | Basic NNM + PS estimation |
| `causalml` | Python | Uplift modeling + matching |

Typical `MatchIt` workflow:

```r
library(MatchIt)
library(cobalt)

# Step 1: Estimate PS and match
m.out <- matchit(
  treatment ~ age + income + health + education,  # PS formula
  data = mydata,
  method = "nearest",   # NN matching
  distance = "logit",   # logit PS
  ratio = 1,            # 1:1 matching
  caliper = 0.2,        # 0.2σ caliper (in logit PS units)
  std.caliper = TRUE    # caliper is in SD units
)

# Step 2: Check balance
summary(m.out)
love.plot(m.out, threshold = 0.1)  # Love plot from cobalt

# Step 3: Extract matched data
m.data <- match.data(m.out)

# Step 4: Estimate ATT (Abadie-Imbens BC via lm_robust)
library(estimatr)
fit <- lm_robust(outcome ~ treatment, data = m.data, weights = weights)
```

## See Also

- [[Propensity Score Matching - Overview]] — the propensity score theorem and balancing property
- [[Covariate Balance and Overlap Diagnostics]] — SMD, love plots, PS overlap, and trimming
- [[Frequentist Causal Estimation]] — IPW and doubly-robust estimators as alternatives to matching
- [[Bayesian Propensity Score Weighting]] — Bayesian extension of IPW
