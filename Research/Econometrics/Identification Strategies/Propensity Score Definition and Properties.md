---
title: "Propensity Score Definition and Properties"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Rosenbaum Rubin 1983 - The Central Role of the Propensity Score.md]]"
source_location: "§2–3, Biometrika 70(1):41–55"
date_ingested: 2026-07-01
folder: "Econometrics/Identification Strategies"
doc_type: concept
depends_on:
  - "[[Rosenbaum and Rubin 1983 - Overview]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Potential Outcomes Framework]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Propensity Score Matching Methods]]"
  - "[[Covariate Balance Diagnostics]]"
  - "[[Frequentist Causal Estimation]]"
  - "[[Bayesian Propensity Score Weighting]]"
  - "[[Nonparametric Causal Inference]]"
aliases:
  - propensity score
  - balancing score
  - e(x)
  - treatment probability
---

# Propensity Score Definition and Properties

> [!summary]
> The propensity score $e(x) = \Pr(T=1 \mid X=x)$ is the conditional probability of receiving treatment given observed covariates. Its two central properties — (1) treatment assignment is independent of covariates conditional on the propensity score, and (2) under strong ignorability the propensity score alone is sufficient for causal identification — justify reducing all covariate adjustment to this single scalar.

## Overview

In observational studies, treated and control units differ systematically on observed covariates $X$. Directly comparing their outcomes conflates the treatment effect with selection into treatment. The [[Conditional Independence Assumption]] (CIA) says this selection is "as good as random" once we condition on $X$ — but conditioning on a high-dimensional $X$ is statistically difficult and requires parametric extrapolation.

Rosenbaum & Rubin (1983) solved this with the propensity score: a single-dimensional summary of all covariates that is sufficient for removing the observed confounding, without requiring a parametric outcome model.

## Definition

> [!definition] Definition: Propensity Score (Rosenbaum & Rubin 1983)
> For binary treatment $T \in \{0,1\}$ and observed pre-treatment covariates $X$, the **propensity score** is:
> $$e(x) = \Pr(T = 1 \mid X = x)$$
> It is the conditional probability of treatment assignment given the observed covariates.
^def-propensity-score

The propensity score is a function of $X$ that takes values in $(0,1)$. In experiments it is known (e.g., $e(x) = 0.5$ under complete randomization); in observational studies it must be estimated from data.

## Identification Assumptions

Before the propensity score's properties matter, two assumptions must hold:

> [!definition] Assumption 1: Unconfoundedness (Strong Ignorability, Part I)
> $$\bigl(Y(0),\, Y(1)\bigr) \perp T \mid X$$
> Potential outcomes are jointly independent of treatment assignment conditional on observed covariates. Also called **selection on observables**, the **conditional independence assumption**, or **unconfoundedness**.
^def-unconfoundedness

> [!definition] Assumption 2: Overlap (Positivity)
> $$0 < e(x) < 1 \quad \forall x \in \mathcal{X}$$
> Every unit has a positive probability of both treatment and control. Without overlap, the causal effect is not identified for units outside the common support.
^def-overlap

Together, Assumptions 1 and 2 constitute **strong ignorability** (Rosenbaum & Rubin 1983).

**Note on overlap failures:** When $e(x) \approx 0$ or $e(x) \approx 1$ for some covariate values, IPW weights become extreme and estimators are unstable. Trimming (dropping units with $e(x) < c$ or $e(x) > 1-c$) partially addresses this at the cost of changing the estimand from ATE to ATT on the trimmed sample.

## The Two Central Theorems

### Theorem 1: Balancing Property

> [!theorem] Theorem 1 (Rosenbaum & Rubin 1983): Balancing Property
> If $e(X)$ is the propensity score, then:
> $$T \perp X \mid e(X)$$
> Within any stratum where $e(X)$ is constant, the distribution of the covariate vector $X$ is the same for treated ($T=1$) and control ($T=0$) units.
^thm-balancing

**Proof sketch:** For any function $b(X)$ such that $T \perp X \mid b(X)$, $b(X)$ is called a *balancing score*. The propensity score $e(X) = \Pr(T=1 \mid X)$ is a balancing score because, by the definition of conditional independence:
$$\Pr(T=1 \mid X, e(X)) = \Pr(T=1 \mid X) = e(X)$$
so within any stratum $e(X) = c$, we have $\Pr(T=1 \mid X) = c$ for all $X$ in that stratum, making $T$ and $X$ independent conditional on $e(X)$.

**What this means in practice:** If you stratify the data into groups with the same (or similar) propensity score, within each group the treated and control units will have — on average — the same covariate values. The propensity score is the *coarsest* balancing score: it summarizes all the confounding information in $X$ into one number.

### Corollary: Ignorability Sufficiency

> [!theorem] Corollary (Rosenbaum & Rubin 1983): Ignorability Sufficiency
> Under strong ignorability given $X$ — i.e., $(Y(0),Y(1)) \perp T \mid X$ and $0 < e(x) < 1$ — it follows that:
> $$(Y(0),\, Y(1)) \perp T \mid e(X)$$
> Strong ignorability also holds when conditioning only on the scalar propensity score.
^thm-ignorability

**What this means:** Causal effects are identified by conditioning on $e(X)$ alone. You do not need to condition on the full $p$-dimensional $X$. This is the fundamental dimension-reduction result.

**Proof sketch:** By Theorem 1, $T \perp X \mid e(X)$, so $\Pr(T=1 \mid X, e(X)) = \Pr(T=1 \mid e(X))$. Under unconfoundedness, $(Y(0),Y(1)) \perp T \mid X$. The result follows by applying iterated expectations and the law of total probability.

## Estimation of the Propensity Score

Since $e(x)$ is unknown in observational studies, it must be estimated. Common approaches:

| Method | Notes |
|--------|-------|
| **Logistic regression** | Most common. Use all pre-treatment covariates as predictors. Can include interactions and polynomials. Consistent if specification is correct. |
| **Probit** | Essentially equivalent to logistic in most applications |
| **Discriminant analysis** | R&R (1983) original suggestion; less used now |
| **Lasso / elastic net** | Useful for high-dimensional $X$ |
| **Boosted trees (GBM)** | Used in practice (e.g., `twang` R package); can capture nonlinear relationships |
| **Random forests / CBPS** | Covariate Balancing Propensity Score directly optimizes balance |

**Key principle:** The goal of propensity score estimation is **covariate balance**, not goodness-of-fit for the propensity model. A model that achieves good overlap and balance is preferred over a model that merely fits the treatment indicator accurately. If balance checks fail, iterate: add interactions, transformations, or use a more flexible estimator.

## Connection to IPW and Matching

The propensity score underlies both weighting and matching estimators:

- **IPW:** Reweight each unit by $1/e(X_i)$ (treated) or $1/(1-e(X_i))$ (control). The propensity score is the inverse of the weight. See [[Frequentist Causal Estimation#^def-ipw]].

- **Matching:** Find a control unit with $e(X_j) \approx e(X_i)$ for each treated unit $i$. By the balancing property, this creates matched pairs with similar covariates. See [[Propensity Score Matching Methods]].

- **Subclassification:** Divide $[0,1]$ into strata based on estimated propensity scores; compare outcomes within strata. See [[Propensity Score Matching Methods#^sec-subclassification]].

## The Estimated vs. True Propensity Score

An important subtlety: using the *estimated* $\hat{e}(X)$ rather than the true $e(X)$ can actually improve efficiency. Hirano, Imbens & Ridder (2003) show that the semiparametrically efficient IPW estimator uses the estimated (parametric) propensity score — replacing $\hat{e}$ with the true $e$ would increase variance.

Intuitively, the estimated propensity score incorporates sample information about the covariate distribution, which helps. This is analogous to why using a variance estimate from the data (rather than a known variance) improves the $t$-test under some conditions.

## Connections

- [[Rosenbaum and Rubin 1983 - Overview]] — Paper overview and historical context
- [[Propensity Score Matching Methods]] — Practical matching algorithms that use $\hat{e}(X)$
- [[Covariate Balance Diagnostics]] — How to check whether $\hat{e}(X)$ achieves balance
- [[Conditional Independence Assumption]] — The unconfoundedness assumption (Assumption 1 above)
- [[Frequentist Causal Estimation]] — IPW and doubly-robust estimators that use the propensity score
- [[Bayesian Propensity Score Weighting]] — Bayesian treatment of uncertainty in $e(X)$ via Liao-Zigler

## See Also

- [[Activity Bias in Advertising]] — Why propensity score methods fail: activity bias violates unconfoundedness even conditionally on all observable covariates
- [[Omitted Variables Bias]] — The problem that motivates propensity score matching; methods fail if unconfoundedness is wrong
- [[Nonparametric Causal Inference]] — BART as a response-surface alternative that bypasses the propensity score entirely
- [[General Structure of Bayesian CI]] — Bayesian perspective: propensity score drops from the likelihood under ignorability
