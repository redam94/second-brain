---
title: "Dynamic Treatment Regimes: Framework and Optimal Regimes"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/dynamic-treatment-regimes
  - topic/personalized-medicine
  - type/concept
  - doc/paper
source: "[[raw/q- and a- learning.pdf]]"
source_location: "§§2–4, pp. 641–648"
date_ingested: 2026-09-27
folder: "Bayesian Statistics/Causal Inference/Dynamic Treatment Regimes"
doc_type: concept
depends_on:
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Q-Learning and A-Learning]]"
  - "[[Schulte 2014 - Overview]]"
aliases:
  - dynamic treatment regime
  - DTR
  - optimal treatment regime
---

# Dynamic Treatment Regimes: Framework and Optimal Regimes

> [!summary]
> A dynamic treatment regime (DTR) is a set of sequential decision rules that map patient history at each decision point to a treatment recommendation. The optimal DTR $d^{\text{opt}}$ maximizes the expected outcome under the potential outcomes framework, subject to consistency, sequential randomization, and positivity. The optimal regime is characterized via Q-functions and backward induction.

## Overview

**Static** treatment rules assign the same treatment to everyone. **Dynamic** treatment regimes personalize treatment based on evolving patient characteristics:

- Patient $\omega$ presents at $K$ prespecified decision points
- At decision $k$: history $S_k$ (baseline + accrued covariates) is observed, treatment $A_k \in \mathcal{A}_k$ is assigned
- Final outcome $Y$ is measured after all $K$ decisions

## Framework and Assumptions

> [!definition] Definition: Dynamic Treatment Regime (Schulte et al. 2014, §2)
> A DTR $d = (d_1, \ldots, d_K)$ consists of rules $d_k(s_k^-, \bar{a}_{k-1}) \in \mathcal{A}_k$, mapping the patient's cumulative history $(s_k^-, \bar{a}_{k-1}) = (S_1, A_1, \ldots, A_{k-1}, S_k)$ to a treatment choice at decision $k$.
^dtr-def

**Three key assumptions** (analogous to those in standard potential outcomes):

> [!definition] Definition: Sequential Randomization Assumption (§2)
> For $k = 1, \ldots, K$:
> $$A_k \perp W^* \mid \bar{S}_k^- = \bar{s}_k^-, \bar{A}_{k-1} = \bar{a}_{k-1}$$
> where $W^* = \{S_2^*(\bar{a}_1), \ldots, Y^*(\bar{a}_K) \text{ for all } \bar{a}_K\}$ are the potential outcomes. No unmeasured confounders influence treatment at any stage.
^sequential-randomization

1. **Consistency**: $S_k^*(\bar{A}_{k-1}) = S_k$, $Y^*(\bar{A}_K) = Y$ — observed values equal potential values under received treatments
2. **Sequential randomization** (no unmeasured confounding): $A_k \perp W^* \mid \bar{S}_k^-, \bar{A}_{k-1}$
3. **Positivity**: $\text{pr}(A_k = a_k \mid S_k = s_k, \bar{A}_{k-1} = \bar{a}_{k-1}) > 0$ for all feasible histories

## Optimal Regime via Q-Functions

> [!definition] Definition: Q-Functions (§3, eq. 9–14)
> The Q-function at stage $k$ is the expected outcome under the optimal future decisions, given history:
> $$Q_K(s_K^-, \bar{a}_K) = E(Y \mid \bar{S}_K^- = s_K^-, \bar{A}_K = \bar{a}_K)$$
> For $k < K$, recursively:
> $$Q_k(s_k^-, \bar{a}_k) = E\!\left[V_{k+1}(s_{k+1}^-, \bar{a}_k) \mid \bar{S}_k^- = s_k^-, \bar{A}_k = \bar{a}_k\right]$$
> where $V_k(s_k^-, \bar{a}_{k-1}) = \max_{a_k \in \mathcal{A}_k} Q_k(s_k^-, \bar{a}_{k-1}, a_k)$.
^q-function-def

> [!theorem] Theorem: Optimal Regime via Backward Induction (§3, eq. 9–14, 19)
> Under consistency, sequential randomization, and positivity, the optimal rule at each stage is:
> $$d_k^{\text{opt}}(s_k^-, \bar{a}_{k-1}) = \arg\max_{a_k \in \mathcal{A}_k} Q_k(s_k^-, \bar{a}_{k-1}, a_k)$$
> The regime $d^{(1)\text{opt}} = (d_1^{\text{opt}}, \ldots, d_K^{\text{opt}})$ is identifiable from observed data under the three assumptions.
^backward-induction

## Midstream Treatment Regimes

An important practical extension (§4): a new patient may present **midstream** at decision $\ell > 1$, having received treatments $\bar{A}_{\ell-1}^{(P)}$ in routine care.

> [!theorem] Theorem: Midstream Optimality (§4, eq. 25)
> Under the consistency assumption on the existing patient's history $S_k^{(P)} = S_k^*(\bar{A}_{k-1}^{(P)})$, the optimal regime for a midstream patient is:
> $$d_k^{(\ell)\text{opt}}(s_k^-, \bar{a}_{k-1}) = d_k^{\text{opt}}(s_k^-, \bar{a}_{k-1}), \quad V_k^{(\ell)} = V_k$$
> The same rules $d^{\text{opt}}$ from Section 3 apply regardless of when the patient first presents — a significant practical simplification.
^midstream-theorem

## Connections

- The Q-functions above are analogous to value functions in **reinforcement learning** and **dynamic programming**
- The sequential randomization assumption is the multi-stage version of the ignorability/unconfoundedness assumption in [[Potential Outcomes Framework]]

## See Also

- [[Q-Learning and A-Learning]] — how to estimate $d^{\text{opt}}$ from data
- [[Time-Varying Treatments and G-computation]] — G-computation approach to time-varying treatments
- [[Potential Outcomes Framework]] — foundational assumptions
- [[Schulte 2014 - Overview]] — paper overview
