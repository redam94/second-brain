---
title: Propensity Score Matching
tags:
  - source/ingested
  - topic/causal-inference
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§2, pp. 3–8"
date_ingested: 2026-06-29
folder: "Econometrics/Identification Strategies"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[The Selection Problem]]"
  - "[[Conditional Independence Assumption]]"
used_by:
  - "[[Matching Algorithms and Caliper Matching]]"
  - "[[Covariate Balance Diagnostics]]"
  - "[[Bayesian Propensity Score Weighting]]"
  - "[[Frequentist Causal Estimation]]"
aliases:
  - PSM
  - propensity score matching
  - Rosenbaum Rubin matching
  - selection on observables matching
---

# Propensity Score Matching

> [!summary]
> Propensity score matching (Rosenbaum & Rubin 1983) uses a single scalar summary of all covariates — the probability of treatment given covariates — to balance treated and control groups in observational studies. The key theorem: if unconfoundedness holds given the full covariate vector $X$, it also holds given only the propensity score $e(X)$. This reduces a high-dimensional balancing problem to a one-dimensional matching problem, making it feasible without restrictive parametric assumptions about the outcome.

## Overview

In observational studies, treated and control units differ systematically in their background characteristics — this is [[The Selection Problem]]. To estimate a causal effect, we need to compare units that are similar on all pre-treatment covariates, a strategy called **selection on observables** (see [[Conditional Independence Assumption]]).

Propensity score matching, introduced by Rosenbaum & Rubin (1983), solves the *curse of dimensionality* inherent in this strategy: with $p$ confounders, balancing on all of them requires matching in a $p$-dimensional space, which becomes impossible for large $p$. The propensity score collapses this to a one-dimensional problem.

## The Propensity Score

> [!definition] Definition: Propensity Score
> The **propensity score** is the conditional probability of treatment assignment given observed pre-treatment covariates:
> $$e(X_i) = \Pr(T_i = 1 \mid X_i)$$
> where $T_i \in \{0,1\}$ is the binary treatment indicator and $X_i$ is the vector of pre-treatment covariates.
> ^def-propensity-score

The propensity score is a **balancing score**: units with the same $e(x)$ have the same covariate distribution on average across treatment arms, regardless of the individual covariate values.

## The Central Theorem: Dimensionality Reduction

> [!theorem] Theorem: Propensity Score Sufficiency (Rosenbaum & Rubin 1983, Theorem 1)
> Suppose the **ignorability** (unconfoundedness + overlap) assumption holds:
> $$(Y_i(0), Y_i(1)) \perp\!\!\!\perp T_i \mid X_i, \quad 0 < e(x) < 1 \text{ for all } x$$
> Then unconfoundedness also holds conditional on the propensity score alone:
> $$(Y_i(0), Y_i(1)) \perp\!\!\!\perp T_i \mid e(X_i)$$
> ^thm-ps-sufficiency

**Interpretation**: If the full covariate vector $X$ is sufficient to eliminate confounding, then the single scalar $e(X)$ is also sufficient. Matching, weighting, or stratifying on $e(X)$ produces balanced covariate distributions between treated and control groups.

**Proof sketch**: The key is that $e(X)$ is a **coarser** summary than $X$ — conditioning on $e(X)$ is valid because $(Y(0), Y(1)) \perp T | X$ implies the same relationship when we condition on any function of $X$ that determines the treatment probability.

## Estimation Strategy

Propensity scores are almost never known; in observational studies they must be estimated. The standard approach:

1. **Specify a treatment model**: Typically a logistic regression
   $$\log \frac{e(X_i)}{1 - e(X_i)} = \alpha_0 + \alpha_1 X_{i1} + \cdots + \alpha_p X_{ip}$$
   Include all covariates that affect both the treatment and the outcome — guided by a DAG (see [[DAGs and Causal Identification]]).

2. **Estimate the PS**: Fit the logistic regression; obtain $\hat{e}(X_i) = \hat{\Pr}(T_i = 1 \mid X_i)$.

3. **Match, weight, or stratify** on $\hat{e}(X_i)$ — see [[Matching Algorithms and Caliper Matching]] for details.

4. **Diagnose balance**: Verify that matching successfully balanced covariates — see [[Covariate Balance Diagnostics]].

> [!warning] What to Include in the Treatment Model
> The goal is to include all confounders (causes of both treatment and outcome). Including instruments (causes of treatment only) is harmless but increases variance. Including colliders (caused by both treatment and outcome) is harmful — it can open non-causal paths. Use a DAG ([[DAGs and Causal Identification]]) to guide variable selection.

## Natural Estimand: Average Treatment Effect on the Treated (ATT)

PSM naturally targets the **ATT** rather than the ATE:

$$\tau^{ATT} = \mathbb{E}[Y_i(1) - Y_i(0) \mid T_i = 1]$$

**Why?** Matching finds controls that look like treated units (not vice versa). The matched sample approximates what would have happened to treated units had they not been treated. This is appropriate when:
- The treated group is the policy-relevant population (e.g., program participants)
- There are treated units with no comparable controls (poor overlap region) — they can be dropped from ATT estimation without bias, whereas ATE estimation would require extrapolation

For ATE estimation, inverse probability weighting ([[Frequentist Causal Estimation]]) is more natural.

## The PSM Estimator

After matching each treated unit $i$ to control unit(s) $j$, the ATT estimator is:

> [!definition] Definition: PSM ATT Estimator
> $$\hat{\tau}^{ATT} = \frac{1}{N_1} \sum_{i: T_i = 1} \left[Y_i - \sum_{j: T_j = 0} w_{ij} Y_j\right]$$
> where $N_1 = \sum_i T_i$ is the number of treated units and $w_{ij}$ are matching weights summing to 1 for each treated unit $i$ (the exact form depends on the matching algorithm — see [[Matching Algorithms and Caliper Matching]]).
> ^def-psm-att

In the simplest 1:1 nearest-neighbor case, $w_{ij} = 1$ for the single matched control and $0$ otherwise, so:
$$\hat{\tau}^{ATT} = \frac{1}{N_1} \sum_{i: T_i = 1} [Y_i - Y_{j(i)}]$$

where $j(i)$ is the matched control for treated unit $i$.

## Comparison to IPW and Regression Approaches

| Method | Estimand | Model required | Robustness |
|--------|----------|----------------|------------|
| PSM | ATT (natural) | Treatment model | Sensitive to poor overlap — matched units excluded |
| IPW | ATE or ATT | Treatment model | Sensitive to extreme weights |
| Outcome regression | ATE | Outcome model | Sensitive to extrapolation |
| Doubly-robust (DR) | ATE or ATT | Both models | Consistent if either model correct |

PSM is a **design-stage** method: it pre-processes the data to create a balanced pseudo-experiment, after which any outcome model can be applied to the matched sample. The design stage *does not look at outcomes*, preventing outcome-model hunting.

> [!note] PSM is Not Silver-Bullet
> PSM adjusts only for *observed* confounders. If the [[Conditional Independence Assumption]] fails — i.e., there are unmeasured confounders — PSM is biased. Rosenbaum's sensitivity analysis ([[Sensitivity Analysis in Observational Studies]]) assesses how much unmeasured confounding would change conclusions. See also [[Activity Bias in Advertising]] for a case where PSM is explicitly argued to be insufficient.

## Connections

- [[Conditional Independence Assumption]] — PSM only works if this holds; PSM is one implementation of the CIA strategy
- [[Frequentist Causal Estimation]] — IPW and doubly-robust estimators are alternative frequentist CIA-based methods
- [[Bayesian Propensity Score Weighting]] — Bayesian alternative using Liao-Zigler marginalization
- [[Propensity Score in Bayesian CI]] — How the propensity score enters Bayesian causal inference

## See Also
- [[Matching Algorithms and Caliper Matching]] — NN matching, caliper matching, k:1 matching, MatchIt
- [[Covariate Balance Diagnostics]] — SMDs, love plots, overlap plots, variance ratios
- [[Sensitivity Analysis in Observational Studies]] — what happens when CIA fails
- [[The Experimental Ideal]] — why PSM is a second-best substitute for randomization
- [[Nonparametric Causal Inference]] — BART alternative that adjusts for confounding via the response surface
