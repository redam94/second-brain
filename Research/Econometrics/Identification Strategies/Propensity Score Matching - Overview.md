---
title: "Propensity Score Matching - Overview"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - topic/propensity-score
  - topic/matching
  - type/concept
  - doc/paper
source: "[[raw/Rosenbaum Rubin 1983 - The Central Role of the Propensity Score]]"
source_location: "Biometrika 70(1): 41–55 (1983)"
date_ingested: 2026-06-30
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Conditional Independence Assumption]]"
  - "[[The Selection Problem]]"
  - "[[Causal Estimands]]"
used_by:
  - "[[PSM Algorithms and Matching Estimators]]"
  - "[[Covariate Balance and Overlap Diagnostics]]"
  - "[[Frequentist Causal Estimation]]"
  - "[[Activity Bias in Advertising]]"
aliases:
  - PSM
  - propensity score methods
  - selection on observables matching
---

# Propensity Score Matching — Overview

> [!summary]
> The propensity score $e(X) = \Pr(D=1 \mid X)$ is the conditional probability of treatment given observed covariates. Rosenbaum & Rubin (1983) show it is a **balancing score**: conditioning on this single scalar eliminates multivariate confounding as effectively as conditioning on the full covariate vector, reducing the dimensionality of the matching problem. Under the [[Conditional Independence Assumption]] (CIA), propensity-score-based methods recover causal effects from observational data. Their fundamental limitation: they cannot correct for selection on *unobservable* confounders.

## Overview

When researchers cannot run an experiment, the [[Conditional Independence Assumption]] (CIA) — that treatment is "as good as randomly assigned" given observed covariates $X$ — is the workhorse identification assumption. But conditioning on a high-dimensional $X$ directly is difficult: with many covariates, there may be no exact matches between treated and control units.

**Propensity score methods** solve the dimensionality problem by reducing $X$ to a single scalar summary:

> [!definition] Definition: Propensity Score
> $$e(X_i) = \Pr(D_i = 1 \mid X_i)$$
> the conditional probability that unit $i$ receives treatment given its observed pre-treatment covariates.
^def-ps

Rosenbaum & Rubin (1983) showed that this scalar carries all the information in $X$ needed for causal identification — the core result that launched decades of applied causal inference.

## The Two Fundamental Theorems

> [!theorem] Theorem 1 (Balancing Property)
> If $e(X)$ is the propensity score, then:
> $$D \perp\!\!\!\perp X \mid e(X)$$
> That is, conditional on $e(X)$, the distribution of covariates $X$ is the same for treated ($D=1$) and control ($D=0$) units.
^thm-balance

**Interpretation:** Among units with the same propensity score, treatment is "locally randomized" with respect to all observed covariates $X$. The balancing property is a mathematical fact — it holds regardless of whether the CIA holds.

> [!theorem] Theorem 2 (Sufficiency for Ignorability)
> If treatment is **strongly ignorable** given $X$:
> 1. $(Y_0, Y_1) \perp\!\!\!\perp D \mid X$ (CIA/unconfoundedness)
> 2. $0 < e(X) < 1$ for all $X$ (overlap)
>
> then treatment is also strongly ignorable given $e(X)$:
> $$(Y_0, Y_1) \perp\!\!\!\perp D \mid e(X)$$
^thm-sufficiency

**Interpretation:** Under CIA, propensity-score conditioning is *sufficient* for causal inference. You only need to compare units with similar $e(X)$, not similar $X$.

> [!corollary] Corollary: Dimension Reduction
> The multivariate covariate vector $X \in \mathbb{R}^k$ can be replaced by the scalar propensity score $e(X) \in (0,1)$ for the purpose of removing confounding under the CIA.
^cor-dimension-reduction

## Estimands: ATE, ATT, ATC

Propensity score methods can target different estimands depending on the research question:

| Estimand | Formula | When appropriate |
|----------|---------|-----------------|
| **ATE** (avg treatment effect) | $\tau = E[Y_1 - Y_0]$ | Policy: how would a randomly selected person respond? |
| **ATT** (avg treatment effect on the treated) | $\tau_{ATT} = E[Y_1 - Y_0 \mid D=1]$ | Evaluate an existing program on its participants |
| **ATC** (avg treatment effect on the controls) | $\tau_{ATC} = E[Y_1 - Y_0 \mid D=0]$ | Assess whether untreated units would benefit |

**Matching estimators** most naturally target the **ATT**: find control units who "look like" the treated units and compare outcomes. ATE estimation requires matching for *both* treatment arms.

## The Subclassification Result

Rosenbaum & Rubin (1983) also showed that coarse subclassification on $e(X)$ effectively removes confounding:

> [!theorem] Subclassification Theorem
> Dividing the sample into $J$ subclasses (strata) based on the propensity score removes a fraction $1 - \frac{1}{J^2}$ of the bias in any linear combination of covariates.
>
> For $J = 5$ equal-spaced strata: removes approximately **90% of bias** from each covariate asymptotically.
^thm-subclassification

This is the theoretical basis for **propensity score stratification** — a simpler alternative to individual-level matching.

## The Matching Estimator (ATT)

The canonical matching estimator for the ATT:

> [!definition] Definition: Matching Estimator for ATT
> $$\hat{\tau}_{ATT}^{match} = \frac{1}{N_1} \sum_{i: D_i=1} \left[ Y_i - \hat{Y}_{0i} \right]$$
> where $\hat{Y}_{0i}$ is the imputed counterfactual for treated unit $i$, obtained from its matched control(s):
> $$\hat{Y}_{0i} = \frac{1}{|J(i)|} \sum_{j \in J(i)} Y_j$$
> and $J(i) = \{j : D_j = 0, j \text{ is matched to } i\}$.
^def-matching-estimator

The different choices of $J(i)$ — nearest neighbor, caliper, kernel — give the different matching algorithms covered in [[PSM Algorithms and Matching Estimators]].

## Propensity Score Estimation

In practice, $e(X)$ is unknown and must be estimated:

1. **Logistic regression**: $\text{logit}(e(X)) = X\beta$ — the standard approach
2. **Probit**: Similar; in large samples the choice barely matters
3. **Machine learning**: LASSO, random forests, boosting for high-dimensional $X$ (but standard balance checks still needed)

> [!warning] The PS Model Need Not Be Correctly Specified
> Unlike outcome regression, the propensity score model is a **design tool** — used to create balance, not to model a structural causal relationship. What matters is **covariate balance after matching**, not model fit. This is why covariate balance checks (see [[Covariate Balance and Overlap Diagnostics]]) are the primary diagnostic.

**Variable selection for the PS model:** Include all pre-treatment covariates that are (a) related to the outcome, (b) related to treatment selection, or (c) both. Exclude post-treatment variables and bad controls.

## The Overlap Condition

The **overlap (common support)** condition $0 < e(X) < 1$ is required for identification. In practice, this means:

- Treated and control units must share a common region of $X$ space
- For units with $e(X)$ near 0 or 1, the counterfactual is estimated by extrapolation, not by comparison to real data
- Units violating common support should be excluded from the analysis (see [[Covariate Balance and Overlap Diagnostics]])

## Why PSM Cannot Fix Activity Bias

[[Activity Bias in Advertising]] provides a canonical example of when PSM *fails* despite satisfying CIA on observables: in advertising studies, causality runs both ways (high sales → more ads → higher measured lift). The confounders driving treatment are the *outcome itself* (or its lagged version) — unobserved by the PSM analyst who only sees the ad impression data.

More generally, PSM fails when:
- **Selection on unobservables**: confounders drive treatment but are not in $X$
- **Simultaneity**: outcome and treatment are jointly determined
- **Anticipation**: units anticipate treatment and adjust behavior before receiving it

In these cases, the CIA $(Y_0, Y_1) \perp D \mid X$ is violated, and no amount of covariate balance can recover the causal effect.

## PSM vs. Other Identification Strategies

| Method | Assumption | When to use |
|--------|-----------|-------------|
| **PSM** | CIA: all confounders observed | Rich observational data with good overlap |
| **DiD** ([[Differences-in-Differences]]) | Parallel trends | Panel data; unobserved time-invariant confounders |
| **IV** ([[Instrumental Variables]]) | Exclusion restriction | Instrument available; selection on unobservables |
| **RD** ([[Regression Discontinuity Designs]]) | Local continuity | Threshold-based treatment assignment |
| **SC** ([[Synthetic Control]]) | Pre-treatment fit | Single treated unit; aggregate data |

## Relationship to IPW and Doubly-Robust Estimators

PSM is one of three uses of the propensity score for causal identification:

1. **Matching**: Use $e(X)$ to find similar units and directly compare outcomes (this note)
2. **Weighting (IPW)**: Reweight observations by $1/e(X)$ and $1/(1-e(X))$ — covered in [[Frequentist Causal Estimation]]
3. **Doubly-robust estimation (AIPW)**: Combine matching/weighting with outcome modeling — covered in [[Frequentist Causal Estimation]]

The Bayesian extension (Liao-Zigler marginalization) is covered in [[Bayesian Propensity Score Weighting]].

## See Also

- [[PSM Algorithms and Matching Estimators]] — implementation details (nearest neighbor, caliper, kernel, Mahalanobis)
- [[Covariate Balance and Overlap Diagnostics]] — balance checks, love plots, overlap plots, trimming
- [[Frequentist Causal Estimation]] — IPW, Hájek, doubly-robust estimators
- [[Bayesian Propensity Score Weighting]] — Liao-Zigler Bayesian IPW
- [[Conditional Independence Assumption]] — the CIA that PSM relies on
- [[The Selection Problem]] — the fundamental problem PSM addresses
- [[Activity Bias in Advertising]] — why PSM fails in advertising studies
- [[Sensitivity Analysis in Observational Studies]] — Rosenbaum bounds for sensitivity to hidden bias
