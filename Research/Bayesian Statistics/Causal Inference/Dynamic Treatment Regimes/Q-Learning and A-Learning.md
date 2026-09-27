---
title: "Q-Learning and A-Learning for Dynamic Treatment Regimes"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/dynamic-treatment-regimes
  - topic/personalized-medicine
  - type/concept
  - doc/paper
source: "[[raw/q- and a- learning.pdf]]"
source_location: "§§5–6, pp. 648–658"
date_ingested: 2026-09-27
folder: "Bayesian Statistics/Causal Inference/Dynamic Treatment Regimes"
doc_type: concept
depends_on:
  - "[[Dynamic Treatment Regimes Framework]]"
used_by:
  - "[[Schulte 2014 - Overview]]"
aliases:
  - Q-learning DTR
  - A-learning DTR
  - advantage learning
---

# Q-Learning and A-Learning for Dynamic Treatment Regimes

> [!summary]
> Two main approaches estimate the optimal dynamic treatment regime from data. **Q-learning** models the full Q-functions via backward-recursive regression (OLS or WLS) — simple but requires correct specification of all K Q-function models. **A-learning** (advantage/contrast-based) models only the contrast functions $C_k = Q_k(s, \bar{a}, 1) - Q_k(s, \bar{a}, 0)$, achieving double robustness: consistent if either the contrast model or the propensity model is correct.

## Overview

Both methods solve the same problem: estimate the optimal regime $d^{\text{opt}}$ from i.i.d. data $\{(S_{1i}, A_{1i}, \ldots, S_{Ki}, A_{Ki}, Y_i)\}_{i=1}^n$. They differ in what they model and their robustness properties.

## Q-Learning

> [!definition] Definition: Q-Learning Algorithm (§5.1, eqs. 26–28)
> For binary treatment $A_k \in \{0,1\}$ with linear Q-function models $Q_k(s_k, \bar{a}_k; \xi_k)$:
>
> **Step K** (last decision): Regress $Y_i$ on $(S_{Ki}, A_{Ki})$ via OLS/WLS to obtain $\hat{\xi}_K$. Compute pseudo-outcomes $\tilde{V}_{Ki} = \max_{a \in \{0,1\}} Q_K(S_{Ki}, \bar{A}_{(K-1)i}, a; \hat{\xi}_K)$.
>
> **Step k < K**: Regress $\tilde{V}_{(k+1)i}$ on $(S_{ki}, A_{ki})$ to obtain $\hat{\xi}_k$. Compute $\tilde{V}_{ki}$.
>
> The estimated optimal rule at each stage: $\hat{d}_{Q,k}^{\text{opt}}(s_k, \bar{a}_{k-1}) = \arg\max_{a} Q_k(s_k, \bar{a}_{k-1}, a; \hat{\xi}_k)$.
^q-learning-alg

**Key limitation**: if any Q-function model is misspecified, the estimated regime may be inconsistent.

## A-Learning (Contrast-Based)

> [!definition] Definition: Contrast Function (§5.2)
> For binary $A_k \in \{0,1\}$, the **contrast function** is:
> $$C_k(s_k^-, \bar{a}_{k-1}) = Q_k(s_k^-, \bar{a}_{k-1}, 1) - Q_k(s_k^-, \bar{a}_{k-1}, 0)$$
> The optimal decision is $d_k^{\text{opt}} = I\{C_k > 0\}$ — we only need the sign of $C_k$, not the full Q-function.
^contrast-function-def

> [!definition] Definition: A-Learning Estimating Equations (§5.2, eq. 30–31)
> At stage $K$, posit parametric models $C_K(s_K^-, \bar{a}_{K-1}; \psi_K)$ and $h_K(s_K^-, \bar{a}_{K-1}; \beta_K)$ (for the blip/baseline). Let $\pi_K(s_K^-, \bar{a}_{K-1}; \phi_K) = \text{pr}(A_K = 1 \mid S_K = s_K, \bar{A}_{K-1} = \bar{a}_{K-1})$ be the propensity. Solve jointly:
> $$\sum_i \lambda_K(S_{Ki}, \bar{A}_{(K-1)i}; \psi_K) \{A_{Ki} - \pi_K(\cdot;\phi_K)\} \{\tilde{V}_{(K+1)i} - A_{Ki} C_K(\cdot;\psi_K) - h_K(\cdot;\beta_K)\} = 0$$
> and analogous equations for $\beta_K$, $\phi_K$. Proceed recursively for $k = K-1, \ldots, 1$.
^a-learning-estimating-eqs

### Double Robustness

> [!theorem] Theorem: Double Robustness of A-Learning (§5.2)
> The A-learning estimator $\hat{\psi}_k$ is **doubly robust**: it yields a consistent estimator of $\psi_k$ (and hence $d_k^{\text{opt}}$) if **either** the contrast model $C_k(\cdot;\psi_k)$ or the propensity model $\pi_k(\cdot;\phi_k)$ is correctly specified — even if the other is misspecified. Q-learning requires correct specification of all Q-functions.
^double-robustness

## Comparison

| Property | Q-learning | A-learning |
|-----------|-----------|-----------|
| What is modeled | Full Q-functions $Q_k$ | Contrast functions $C_k$ only |
| Robustness | Requires all $Q_k$ correct | Doubly robust (contrast or propensity) |
| Efficiency under correct spec. | More efficient at $K = 1$ | Less efficient (does not use full Q-function) |
| Implementation | Simple backward OLS/WLS | Requires estimating equations; propensity model |
| Treatment options | Any $\mathcal{A}_k$ | Primarily binary; extensions complex |

**Practical guidance** (§5.3, §6):
- When sample size is large and models are carefully specified, Q-learning is often preferred
- When model misspecification is a concern (especially for early stages $k < K$), A-learning is more robust
- The empirical study (§6) shows Q-learning degrades more than A-learning under Q-function misspecification

## Application: STAR*D Depression Study

Section 7 applies both methods to the Sequenced Treatment Alternatives to Relieve Depression (STAR*D) trial with $K = 2$ decision points (antidepressant selection at two stages). Both methods are implemented with linear models for Q-functions and logistic propensity models.

## See Also

- [[Dynamic Treatment Regimes Framework]] — formal setup and Q-function definitions
- [[Schulte 2014 - Overview]] — paper overview
- [[Time-Varying Treatments and G-computation]] — G-computation as an alternative estimation strategy
- [[Metalearners for CATE]] — metalearners (S-, T-, X-learner) for cross-sectional CATE estimation
- [[Bayesian Outcome Models]] — Bayesian approaches to causal estimation
