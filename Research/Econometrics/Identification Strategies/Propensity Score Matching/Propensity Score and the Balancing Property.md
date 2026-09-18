---
title: Propensity Score and the Balancing Property
tags:
  - source/ingested
  - topic/causal-inference
  - type/theorem
  - doc/paper
source: "[[raw/Stuart 2010 - Matching Methods for Causal Inference - A Review.pdf]]"
source_location: "Sections 1.2, 2.2, pp. 3-7"
date_ingested: 2026-06-28
folder: "Econometrics/Identification Strategies/Propensity Score Matching"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Conditional Independence Assumption]]"
used_by:
  - "[[Propensity Score Matching - Overview]]"
  - "[[Matching Methods and Distance Measures]]"
  - "[[Covariate Balance Diagnostics]]"
  - "[[Common Support and Overlap]]"
  - "[[Conformal Inference for Counterfactuals and ITEs]]"
  - "[[Q - The Common Structure of Doubly-Robust Estimators]]"
aliases:
  - Propensity Score
  - Rosenbaum-Rubin Theorem
  - Balancing Score
  - Strong Ignorability
---

# Propensity Score and the Balancing Property

> [!summary]
> The **propensity score** $e_i(X_i) = P(T_i = 1 \mid X_i)$ is the probability of receiving treatment given the observed covariates. Rosenbaum and Rubin (1983) proved two key properties: it is a **balancing score** (conditional on the propensity score, the distribution of $X$ is the same in treated and control groups), and under **strong ignorability** it is sufficient to remove all bias from observed covariates — so matching/conditioning on the scalar propensity score is equivalent to conditioning on the full covariate vector.

## Overview

The fundamental problem of causal inference is that for each individual only one of the potential outcomes $Y_i(1)$, $Y_i(0)$ is observed. In a randomized experiment, assignment is independent of potential outcomes by design. In an observational study we must **posit** an assignment mechanism; the key assumption is **strong ignorability** (Rosenbaum and Rubin, 1983). The propensity score collapses a high-dimensional matching problem (Chapin's curse of dimensionality) into a one-dimensional one while preserving the ability to balance covariates.

## Main Content

> [!definition] Propensity score ^def-propensity
> The propensity score for individual $i$ is the probability of receiving the treatment given the observed covariates:
> $$ e_i(X_i) = P(T_i = 1 \mid X_i). $$
> In practice the true score is unknown outside randomized experiments and must be **estimated**, most commonly by logistic regression, or by nonparametric methods such as boosted CART / generalized boosted models (gbm).

> [!theorem] Strong ignorability of treatment assignment ^thm-ignorability
> Treatment assignment is **strongly ignorable** given covariates $X$ if:
> 1. **Unconfoundedness / "no hidden bias":** $T \perp (Y(0), Y(1)) \mid X$, and
> 2. **Positivity / overlap:** $0 < P(T=1\mid X) < 1$ for all $X$.
>
> The first component is also called "ignorable," "no hidden bias," or "unconfounded." It is more plausible than it first sounds: matching/controlling for the observed covariates also controls for unobserved covariates **insofar as they are correlated with observed ones**, so the only unobserved covariates of concern are those unrelated to the observed ones. Sensitivity analysis assesses departures (see [[Covariate Balance Diagnostics]]).

> [!theorem] Balancing property of the propensity score (Rosenbaum-Rubin 1983) ^thm-balancing
> The propensity score is a **balancing score**: at each value of the propensity score, the distribution of the covariates $X$ that define it is the same in the treated and control groups,
> $$ X \perp T \mid e(X). $$
> Thus grouping individuals with similar propensity scores replicates a **mini-randomized experiment** with respect to the observed covariates.

> [!theorem] Ignorability given the propensity score ^thm-ps-ignorability
> If treatment assignment is strongly ignorable given $X$, then it is **also ignorable given the propensity score** $e(X)$. Consequently, the difference in mean outcomes between treated and control individuals at a particular propensity-score value is an **unbiased estimate** of the treatment effect at that value. This justifies matching/conditioning on the scalar propensity score rather than on the full multivariate $X$.

> [!definition] Variable selection for the propensity model ^def-variable-selection
> Include **all variables related to both treatment assignment and the outcome**; researchers should be *liberal* in including potential confounders, since excluding a confounder is costly in bias while including an irrelevant variable costs only a small variance increase (in small samples, prioritize variables related to the outcome). The diagnostic target is **covariate balance**, not the logistic-regression coefficients — so standard model-fit statistics (c-statistic, stepwise selection, collinearity concerns) do **not** apply. **Never** include a variable that may have been affected by the treatment. Misestimating the propensity score matters less than misspecifying the outcome model, because the score is only a tool to obtain balance.

> [!definition] Linear propensity score ^def-linear-ps
> Matching is often done on the **linear** (logit) propensity score $\text{logit}(e_i) = \log\!\big(e_i/(1-e_i)\big)$ rather than $e_i$ itself; Rosenbaum and Rubin (1985) and others found this particularly effective at reducing bias (the logit is closer to normally distributed, improving the affinely-invariant distance behavior).

## Examples

Variance ratio guideline for calipers: if the variance of the linear propensity score in the treated group is **twice** that of the controls, a caliper of **0.2 SD** of the linear propensity score removes about **98%** of the bias of a normally distributed covariate (Rosenbaum and Rubin, 1985). When the treated-group variance is much larger, smaller calipers are needed; a default of **0.25 SD** of the linear propensity score is generally suggested.

## Connections

- Foundational layer for [[Propensity Score Matching - Overview]].
- The unconfoundedness component is exactly the [[Conditional Independence Assumption]]; defined over the [[Potential Outcomes Framework]].
- The positivity component motivates [[Common Support and Overlap]].
- The balancing property is what is *checked* in [[Covariate Balance Diagnostics]] and *exploited* in [[Matching Methods and Distance Measures]].
- Matching on observed confounders addresses [[Omitted Variables Bias]] and [[The Selection Problem]] only to the extent ignorability holds.
- The same score underlies weighting estimators: [[Bayesian Inverse Probability Weighting]], [[Bayesian Inverse Probability Weighting]], [[Frequentist Causal Estimation]].

## See Also

- [[Propensity Score Matching - Overview]]
- [[Matching Methods and Distance Measures]]
- [[Common Support and Overlap]]
- [[_Index]]
- [[Conformal Prediction Under Covariate Shift]] — same propensity-odds weights
