---
title: "Optimal Regime via Dynamic Programming"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/dynamic-treatment-regimes
  - type/theorem
  - doc/paper
source: "[[raw/q- and a- learning.pdf]]"
source_location: "§3 Optimal Treatment Regimes, §4 Midstream Regimes, pp. 645-650"
date_ingested: 2026-06-27
folder: "Bayesian Statistics/Causal Inference/Dynamic Treatment Regimes"
doc_type: paper
depends_on:
  - "[[Dynamic Treatment Regimes Framework]]"
used_by:
  - "[[Q-learning]]"
  - "[[A-learning and Robustness]]"
aliases:
  - Q-functions
  - value functions
  - backward induction
  - dynamic programming optimal regime
---

# Optimal Regime via Dynamic Programming

> [!summary]
> The optimal dynamic treatment regime $d^{\text{opt}}$ is characterized by **backward induction** (dynamic programming). Working from the last decision $K$ to the first, define **Q-functions** $Q_k(\bar s_k, \bar a_k) = \mathbb{E}(\text{value-to-go} \mid \text{history})$ measuring the "quality" of taking treatment $a_k$ now and behaving optimally thereafter, and **value functions** $V_k = \max_{a_k} Q_k$. The optimal rule at each stage maximizes the Q-function: $d_k^{\text{opt}}(\bar s_k, \bar a_{k-1}) = \arg\max_{a_k} Q_k$. Under consistency, sequential randomization, and positivity these observed-data Q-functions coincide with the potential-outcome definitions, so $d^{\text{opt}}$ is **identifiable**. A key result: the optimal rules do **not depend on when a patient presents** (decision 1 vs. "midstream"), so a single rule set $d^{\text{opt}}$ applies to all patients.

## Overview

This note gives the engine shared by [[Q-learning]] and [[A-learning and Robustness]]: the dynamic-programming characterization of $d^{\text{opt}}$. The two methods differ only in *how they estimate the pieces* of this recursion. The recursion is first written in potential outcomes, then shown to equal an observed-data version under the [[Dynamic Treatment Regimes Framework|identification assumptions]].

## Main Content

### Backward induction in potential outcomes

> [!theorem] Optimal regime by backward recursion (§3, Eqs. 5-8)
> At the last decision $K$, for histories $(\bar s_K, \bar a_{K-1}) \in \Gamma_K$:
> $$
> d_K^{(1)\text{opt}}(\bar s_K, \bar a_{K-1}) = \arg\max_{a_K \in \Psi_K} \mathbb{E}\{ Y^{*}(\bar a_{K-1}, a_K) \mid \bar S_K^{*}(\bar a_{K-1}) = \bar s_K \},
> $$
> with value $V_K^{(1)} = \max_{a_K} \mathbb{E}\{ Y^{*} \mid \cdot \}$. Then for $k = K-1, \dots, 1$:
> $$
> d_k^{(1)\text{opt}}(\bar s_k, \bar a_{k-1}) = \arg\max_{a_k \in \Psi_k} \mathbb{E}\bigl[ V_{k+1}^{(1)}\{\bar s_k, S_{k+1}^{*}(\bar a_{k-1}, a_k), \bar a_{k-1}, a_k\} \mid \bar S_k^{*}(\bar a_{k-1}) = \bar s_k \bigr].
> $$
> Each stage chooses the treatment maximizing the expected outcome **assuming optimal behavior at all later stages** — the defining property of dynamic programming. (Section A.1 of the supplement proves this $d^{(1)\text{opt}}$ is optimal in the sense of the regime definition.)
> ^thm-backward-induction

### Observed-data Q- and value functions

> [!definition] Q-functions and value functions (§3, Eqs. 9-14)
> In terms of the **observed** data, define at decision $K$:
> $$
> Q_K(\bar s_K, \bar a_K) = \mathbb{E}(Y \mid \bar S_K = \bar s_K, \bar A_K = \bar a_K),
> \qquad
> V_K(\bar s_K, \bar a_{K-1}) = \max_{a_K \in \Psi_K} Q_K(\bar s_K, \bar a_{K-1}, a_K),
> $$
> and recursively for $k = K-1, \dots, 1$:
> $$
> Q_k(\bar s_k, \bar a_k) = \mathbb{E}\{ V_{k+1}(\bar s_k, S_{k+1}, \bar a_k) \mid \bar S_k = \bar s_k, \bar A_k = \bar a_k \},
> $$
> $$
> d_k^{\text{opt}}(\bar s_k, \bar a_{k-1}) = \arg\max_{a_k \in \Psi_k} Q_k(\bar s_k, \bar a_{k-1}, a_k),
> \qquad
> V_k(\bar s_k, \bar a_{k-1}) = \max_{a_k} Q_k(\bar s_k, \bar a_{k-1}, a_k).
> $$
> $Q_k$ measures the **"quality"** of treatment $a_k$ given the history, then following the optimal regime thereafter; $V_k$ is the **"value"** of a history assuming optimal future decisions.
> ^def-q-v-functions

> [!theorem] Identification: observed-data optimum equals potential-outcome optimum (§3, Eq. 19)
> Under **consistency**, **sequential randomization**, and **positivity**, the conditional distributions of the observed data in (9)–(14) equal those of the potential outcomes in (5)–(8), so
> $$
> d_k^{(1)\text{opt}}(\bar s_k, \bar a_{k-1}) = d_k^{\text{opt}}(\bar s_k, \bar a_{k-1}),
> \qquad
> V_k^{(1)} = V_k,
> \qquad k = 1, \dots, K.
> $$
> Thus an optimal regime in the $\Psi$-specific class $\mathcal{D}$ can be obtained from the **distribution of the observed data**. (The optimum need not be unique — any rule selecting an arg-max treatment is optimal.)
> ^thm-identification

### Midstream regimes: the rule set is presentation-invariant

> [!theorem] Optimal rules do not depend on when a patient presents (§4, Eq. 25)
> A new patient may present "midstream" — immediately prior to decision $\ell > 1$, having received $\ell-1$ treatments under routine practice. One can define an optimal regime $d^{(\ell)\text{opt}}$ starting at decision $\ell$. Under the same assumptions (plus consistency of the presenting covariates), the midstream rules coincide with the original recursion:
> $$
> d_k^{(\ell)\text{opt}}(\bar s_k, \bar a_{k-1}) = d_k^{\text{opt}}(\bar s_k, \bar a_{k-1}), \qquad k = \ell, \dots, K,
> $$
> subsuming the $\ell=1$ case. **Consequence:** the single rule set $d^{\text{opt}} = (d_1^{\text{opt}}, \dots, d_K^{\text{opt}})$ is relevant for *any* patient regardless of when they present — treatment for a midstream patient is $d_\ell^{\text{opt}}$ evaluated at their history (Robins 2004).
> ^thm-midstream
>
> **Caveat:** this presentation-invariance requires the conditioning sets to carry the same information; it relies on the sequential-randomization and consistency assumptions holding for the routine-practice history.

## Connections

- The shared target of [[Q-learning]] (which models the Q-functions directly) and [[A-learning and Robustness]] (which models only the contrast $C_k = Q_k(\cdot, 1) - Q_k(\cdot, 0)$, sufficient for the arg-max).
- Backward induction over Q/value functions is exactly the dynamic-programming / Bellman structure used in reinforcement learning.
- Builds on the estimand and assumptions of the [[Dynamic Treatment Regimes Framework]].

## See Also

- [[Dynamic Treatment Regimes Framework]] — estimand and identification assumptions
- [[Q-learning]] — estimating the Q-functions
- [[A-learning and Robustness]] — estimating only the contrast functions
