---
title: "Rosenbaum and Rubin 1983 - Overview"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/overview
  - doc/paper
source: "[[raw/Rosenbaum Rubin 1983 - The Central Role of the Propensity Score.md]]"
source_location: "Full paper, Biometrika 70(1):41–55"
date_ingested: 2026-07-01
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Conditional Independence Assumption]]"
  - "[[The Selection Problem]]"
  - "[[Potential Outcomes Framework]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Propensity Score Definition and Properties]]"
  - "[[Propensity Score Matching Methods]]"
  - "[[Covariate Balance Diagnostics]]"
  - "[[Frequentist Causal Estimation]]"
  - "[[Bayesian Propensity Score Weighting]]"
aliases:
  - R&R 1983
  - propensity score original paper
  - Rosenbaum Rubin 1983
---

# Rosenbaum and Rubin 1983 — Overview

> [!summary]
> The founding paper of propensity-score-based causal inference. Rosenbaum & Rubin (1983) prove that under strong ignorability, the propensity score $e(x) = \Pr(T=1 \mid X=x)$ acts as a sufficient statistic for the observed covariates: conditioning on $e(X)$ alone removes all observed confounding. This reduces the dimensionality of covariate adjustment from $p$ variables to a single scalar, enabling matching, subclassification, and covariate adjustment without fully parametric assumptions.

## Research Question

Observational studies lack the random treatment assignment that guarantees comparability between treated and control groups in experiments. The question is whether and how one can adjust for observed pre-treatment covariates $X$ without specifying a fully parametric outcome model — in particular, without assuming a linear relationship between $X$ and the outcome.

The core problem: if there are $p$ covariates, exact matching is infeasible in all but the smallest datasets, and stratification on all $p$ variables creates $2^p$ cells. A dimension-reduction device is needed.

## Key Contribution

The propensity score $e(x) = \Pr(T=1 \mid X=x)$ is a **balancing score** — it is the coarsest function of $X$ that still achieves covariate balance. Theorem 1 of the paper proves that within any stratum where $e(X)$ is constant, the distribution of the full covariate vector $X$ is identical for treated and control units. This means that matching or subclassifying on the scalar $e(X)$ achieves the same balance as matching exactly on the full $X$.

The Corollary extends this to causal identification: if treatment assignment is "strongly ignorable" given $X$ (the usual selection-on-observables assumption), then it is also strongly ignorable given only $e(X)$. Causal effects are therefore identified by conditioning on a single scalar.

## Paper Structure

| Section | Content |
|---------|---------|
| §1 Introduction | Observational studies, role of covariates, the dimension-reduction challenge |
| §2 Propensity scores | Definition, Theorem 1 (balancing), Corollary (ignorability sufficiency) |
| §3 Estimating propensity scores | Logistic regression, discriminant analysis, iterative logit |
| §4 Methods using propensity scores | Subclassification (§4.1), matching (§4.2), covariance adjustment (§4.3) |
| §5 Checking balance | Balance assessment within propensity score strata |
| §6 Empirical example | Wisconsin Survey data: father's occupational prestige → son's earnings |

## Main Results

1. **Theorem 1 (Balancing Property):** [[Propensity Score Definition and Properties#^thm-balancing|Theorem 1]]. Within subclasses defined by $e(X)$, treatment and covariates are independent.

2. **Corollary (Ignorability Sufficiency):** Under strong ignorability w.r.t. $X$, strong ignorability holds w.r.t. $e(X)$. See [[Propensity Score Definition and Properties#^thm-ignorability]].

3. **Methods:** Subclassification on quintiles of $\hat{e}(X)$ removes ~90% of bias from a single confounding covariate (Cochran 1968). Nearest-neighbor matching on $\hat{e}(X)$ creates matched pairs with similar propensity scores.

4. **Estimation:** The propensity score must be estimated from data (typically via logistic regression). The estimated $\hat{e}(X)$ is used throughout.

## Empirical Example: Wisconsin Survey

- **Sample:** Wisconsin high school seniors followed up 10 years later
- **Treatment:** Having a father in a highly prestigious occupation (top quartile of Duncan SEI score)
- **Outcome:** Son's occupational earnings and prestige at age 26
- **Covariates:** Academic test score, family income, mother's education, educational/occupational aspirations
- **Method:** Logistic regression propensity score → five subclasses (quintiles)
- **Result:** Subclassification removes most of the initial confounding; direct comparison within strata gives a more credible causal estimate than unadjusted comparison

## Historical Significance

This paper introduced the term "propensity score" and established the theoretical foundation for a large applied literature in statistics, econometrics, epidemiology, and social science. The two theorems are cited in virtually every applied paper using propensity score methods.

The matching framework was extended by Abadie & Imbens (2006, 2011) to prove asymptotic normality and derive bias-corrected estimators. Imbens (2004) provides the unified review of all methods based on the propensity score.

## Connections

- [[Propensity Score Definition and Properties]] — Full formal statement of Theorem 1 and the Corollary
- [[Propensity Score Matching Methods]] — The matching and subclassification methods from §4
- [[Covariate Balance Diagnostics]] — The balance-checking procedures from §5
- [[Conditional Independence Assumption]] — The identification assumption that propensity scores help satisfy
- [[Frequentist Causal Estimation]] — The broader IPW/DR estimator landscape that builds on propensity scores

## See Also

- [[Bayesian Propensity Score Weighting]] — Bayesian extension via Liao-Zigler marginalization
- [[Activity Bias in Advertising]] — Why propensity score methods fail for activity bias (violates CIA)
- [[Nonparametric Causal Inference]] — BART as alternative that bypasses propensity score estimation
- [[Omitted Variables Bias]] — What propensity score methods address (observed confounding), and what they cannot (unobserved confounders)
