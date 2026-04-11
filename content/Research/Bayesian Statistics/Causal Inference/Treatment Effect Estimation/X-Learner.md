---
title: "X-Learner"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/treatment-effects
  - topic/machine-learning
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Künzel et al. - 2017 - Metalearners for estimating heterogeneous treatment effects using machine learning.pdf]]"
source_location: "X-Learner section + Theorem 2, pp. 4158-4162"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Treatment Effect Estimation"
doc_type: paper
depends_on:
  - "[[T-Learner and Minimax Rate]]"
  - "[[Metalearners for CATE]]"
used_by:
  - "[[Metalearner Simulation Results]]"
aliases:
  - X-learner
  - cross learner
  - X-RF
---

# X-Learner

> [!summary]
> The X-learner is a two-stage metalearner that **imputes** individual treatment effects (ITEs) by cross-applying fitted response functions, then regresses the imputed ITEs on covariates. It is particularly powerful when treatment and control groups are unbalanced, as it can exploit the large group to improve estimation in the small group. It achieves a minimax optimal rate that adapts to both CATE smoothness and response function smoothness.

## Overview

The X-learner solves the key failure mode of the T-learner: when treatment groups are unbalanced, one response function is estimated precisely and the other poorly — but the T-learner cannot cross-use information.

The X-learner *crosses* the group information in Stage 2: it uses the well-estimated control model to impute counterfactuals for treated units, and vice versa.

## Algorithm

> [!definition] Definition: X-Learner (Three Steps)
>
> **Stage 1 — Estimate response functions (same as T-learner):**
> $$\hat{\mu}_0(x) \text{ estimated on control units}; \quad \hat{\mu}_1(x) \text{ estimated on treated units}$$
>
> **Stage 2 — Impute individual treatment effects:**
>
> For treated units $i \in \{W_i = 1\}$:
> $$\tilde{D}_i^1 := Y_i^1 - \hat{\mu}_0(X_i^1)$$
> (observed treated outcome minus *imputed* control outcome using $\hat{\mu}_0$)
>
> For control units $i \in \{W_i = 0\}$:
> $$\tilde{D}_i^0 := \hat{\mu}_1(X_i^0) - Y_i^0$$
> (imputed treatment outcome using $\hat{\mu}_1$ minus observed control outcome)
>
> **Stage 2 — Regress imputed ITEs:**
> $$\hat{\tau}_1(x) = \mathbb{E}[\tilde{D}^1 \mid X = x] \quad \text{(regress on treated units)}$$
> $$\hat{\tau}_0(x) = \mathbb{E}[\tilde{D}^0 \mid X = x] \quad \text{(regress on control units)}$$
>
> **Stage 3 — Combine with propensity score weights:**
> $$\hat{\tau}^X(x) = g(x)\hat{\tau}_0(x) + (1 - g(x))\hat{\tau}_1(x)$$
>
> where $g(x) \in [0,1]$ is a weighting function, often set to the propensity score $g(x) = e(x) = P(W=1 \mid X=x)$.
^def-x-learner

## Intuition

The X-learner uses the large group (say, control with many observations) to improve estimation for the small group (treatment):
- $\hat{\mu}_0$ is estimated precisely from many control observations
- This precise $\hat{\mu}_0$ is *cross-applied* to treated units to impute their counterfactual
- The imputed ITE $\tilde{D}_i^1$ is then a cleaner signal for regressing the CATE on $X_i$

In the second stage, $\hat{\tau}_1$ is estimated from treated units with imputed ITEs — these have reduced variance because $\hat{\mu}_0$ is very accurate.

## Minimax Rate Theorem

> [!theorem] Theorem 2: Minimax Optimality of X-Learner
> Assume we observe $n_0$ control and $n_1$ treated units, with $n_0 \gg n_1$ (unbalanced design). For families $\mathcal{P} \in S(a_0, a_\tau)$ satisfying Conditions 1-6 (Lipschitz continuity, bounded propensity score, bounded moments):
>
> $$\sup_{\mathcal{P} \in \mathcal{F}} \text{EMSE}(\mathcal{P}, \hat{\tau}^X) \leq C_\tau \left(m^{-a_\tau} + n^{-a_0}\right)$$
>
> where $m$ is the total sample size and $n = \min(n_0, n_1)$ is the smaller group size.
>
> **Key insight:** The X-learner rate is $\min(m^{-a_\tau}, n^{-a_0})$. If $a_\tau > a_0$ (CATE is smoother than the response functions), the X-learner can achieve $m^{-a_\tau}$ — the full-data rate — rather than being bottlenecked by the small group.
>
> **Contrast with T-learner:** T-learner is bounded by $n^{-a_0}$ regardless. X-learner additionally exploits $m^{-a_\tau}$ when the CATE function is smooth.
^thm-x-learner

## Conditions for X-Learner Advantage

The X-learner outperforms T-learner when:
1. **Unbalanced groups**: One arm has far more observations than the other
2. **Smooth CATE**: $a_\tau > a_0$ — treatment effect is simpler than the response functions
3. **Large control group**: Can impute good counterfactuals for treated units

When the CATE is constant (or near-zero), the X-learner advantage is largest because $a_\tau \to \infty$ (constant is infinitely smooth).

## Propensity Score as Weight

The weighting function $g(x)$ balances $\hat{\tau}_0$ and $\hat{\tau}_1$. Using $g(x) = e(x) = P(W=1\mid X=x)$:
- When $e(x)$ is small (few treated units), weight is put on $\hat{\tau}_0$ (estimated from the larger control group)
- When $e(x)$ is large (many treated), weight is put on $\hat{\tau}_1$

This ensures that the better-estimated CATE component dominates.

## Connections

- Extends [[T-Learner and Minimax Rate]] by adding Stage 2 imputation
- Uses propensity score $e(x)$ — see [[Propensity Score in Bayesian CI]] for Bayesian treatment
- Applied to [[Metalearner Simulation Results]] real experiments
- Software: **hte** R library implements X-, T-, S-learner with confidence intervals

## See Also

- [[Metalearners for CATE]] — general framework
- [[T-Learner and Minimax Rate]] — foundation that X-learner improves on
- [[S-Learner]] — simpler alternative
- [[Metalearner Simulation Results]] — empirical performance
