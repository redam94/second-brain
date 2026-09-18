---
title: Frequentist Causal Estimation
tags:
  - source/ingested
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§2, pp. 3–5"
date_ingested: 2026-04-10
date_updated: 2026-08-03
folder: "Bayesian Statistics/Causal Inference/Foundations"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Causal Estimands]]"
used_by:
  - "[[General Structure of Bayesian CI]]"
  - "[[Propensity Score in Bayesian CI]]"
  - "[[Q - Uncovering Causal Estimates from Non-Experimental Data]]"
  - "[[Propensity Score Matching - Overview]]"
  - "[[Causal Machine Learning - Overview]]"
  - "[[DML Estimators for ATE and the Interactive Model]]"
aliases:
  - IPW estimator
  - doubly robust estimator
  - outcome modeling causal
---

# Frequentist Causal Estimation

> [!summary]
> Three main Frequentist estimator classes exist under the potential outcomes framework: outcome modeling (regression), inverse probability weighting (IPW), and doubly-robust (DR) estimators. Each exploits the ignorability assumption differently. DR estimators are consistent if *either* the propensity score model or the outcome model is correctly specified — but not necessarily both.

## Overview

Under the [[Potential Outcomes Framework#^def-ignorability|ignorability assumption]], the CATE and PATE are identified from observed data. Frequentist causal estimation operationalizes this identification through three estimator families, reviewed here as context for the Bayesian approach in [[General Structure of Bayesian CI]].

The key identification result: under ignorability,
$$
\mu_z(x) = \mathbb{E}[Y_i(z) \mid X_i = x] = \mathbb{E}[Y_i \mid Z_i = z, X_i = x]
$$

so causal means equal observable conditional means. See [[Potential Outcomes Framework#^eq-identification]].

## Outcome Modeling (Regression Estimator)

The simplest approach: specify an outcome model $\mu_z(x) = \mathbb{E}[Y \mid Z=z, X=x]$, estimate it from data, then impute missing potential outcomes.

The outcome-model PATE estimator:
$$
\hat{\tau}^{\text{reg}} = N^{-1} \sum_{i=1}^{N} [\hat{\mu}_1(X_i) - \hat{\mu}_0(X_i)]
$$

- Consistent for $\tau^P$ if the outcome model is correctly specified.
- In poor overlap regions, estimates rely on extrapolation — sensitive to model misspecification.
- A misspecified linear outcome model still gives a consistent estimate in randomized experiments, but not in observational studies.

## Inverse Probability Weighting (IPW)

Uses the **propensity score** $e(x) = \Pr(Z_i = 1 \mid X_i = x)$ to reweight units.

> [!definition] Definition: IPW Estimator
> $$
> \hat{\tau}^{\text{IPW}} = N^{-1} \sum_{i=1}^{N} \left[ \frac{Z_i Y_i}{e(X_i)} - \frac{(1-Z_i)Y_i}{1 - e(X_i)} \right]
> $$
^def-ipw

- Consistent if the propensity score model is correctly specified.
- The propensity score is a **balancing score**: conditioning on $e(X_i)$ balances the multivariate distribution of $X$ between treatment groups.
- When $e(X_i)$ is unknown (observational data), it must be estimated, e.g. via logistic regression.

**Hájek (normalized) IPW**:
$$
\hat{\tau}^{\text{Hájek}} = \frac{\sum_{i=1}^{N} Z_i Y_i / e(X_i)}{\sum_{i=1}^{N} Z_i / e(X_i)} - \frac{\sum_{i=1}^{N} (1-Z_i) Y_i / (1-e(X_i))}{\sum_{i=1}^{N} (1-Z_i) / (1-e(X_i))}
$$

The Hájek estimator normalizes weights to sum to 1, reducing variance.

## Doubly-Robust (DR) Estimator

Combines outcome modeling and IPW for robustness.

> [!definition] Definition: Doubly-Robust (DR) Estimator
> $$
> \hat{\tau}^{\text{DR}} = \hat{\tau}^{\text{reg}} + N^{-1} \sum_{i=1}^{N} \left[ \frac{Z_i R_i}{e(X_i)} - \frac{(1-Z_i) R_i}{1 - e(X_i)} \right]
> $$
> where $R_i = Y_i - \hat{\mu}_{Z_i}(X_i)$ is the residual from the outcome model.
^def-dr

> [!theorem] Theorem: Double Robustness
> $\hat{\tau}^{\text{DR}}$ is consistent for $\tau^P$ if *either*:
> - the propensity score model $e(x)$ is correctly specified, **or**
> - the outcome model $\mu_z(x)$ is correctly specified
> (but not necessarily both).
^thm-double-robustness

The DR estimator is "doubly robust" because the bias of $\hat{\tau}^{\text{reg}}$ is a product of the residuals of the propensity score model and outcome model — if either residual is zero (correct specification), the bias vanishes.

## Matching and Weighting Methods

**Matching** methods find pairs of treated and control units with similar covariates (e.g., based on propensity score or Mahalanobis distance) and estimate $\tau^P$ by the difference in average outcomes between matched groups.

**Weighting** methods assign weight $w_i$ to each unit so the weighted covariate distribution is balanced, then compute a weighted difference in outcomes. IPW is the canonical weighting method; the Hájek estimator is its normalized version.

These can be viewed as non-parametric versions of $\hat{\tau}^{\text{IPW}}$, $\hat{\tau}^{\text{reg}}$, and $\hat{\tau}^{\text{DR}}$ based on nearest-neighbor regressions.

## Connections to Bayesian Causal Inference

The Bayesian approach (see [[General Structure of Bayesian CI]]) treats causal inference as a **missing data problem**: impute the missing potential outcomes from the posterior predictive distribution, then compute any estimand. This automatically yields uncertainty quantification for any causal functional.

The propensity score — central to Frequentist approaches — has a nuanced role in Bayesian inference:
- Under ignorability, the propensity score *drops out* of the likelihood for causal estimands (§3 of the paper)
- Yet it is essential for ensuring **overlap and balance** in the design stage
- See [[Propensity Score in Bayesian CI]] for the three strategies to incorporate it

## See Also
- [[Propensity Score in Bayesian CI]] — Bayesian strategies using the propensity score
- [[Bayesian Inverse Probability Weighting]] — Bayesian IPW via the Liao-Zigler approach (Heiss blog)
- [[Metalearners for CATE]] — the DR-learner applies doubly-robust logic to conditional treatment effect estimation
- [[Sensitivity Analysis in Observational Studies]] — what happens when unconfoundedness fails
- [[Propensity Score Matching - Overview]] — the matching strategy that uses $\hat{e}(X)$ to form pairs rather than weighting
- [[DML Estimators for ATE and the Interactive Model]] — the doubly-robust estimator with ML nuisance functions
