---
title: "T-Learner and Minimax Rate"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/treatment-effects
  - topic/machine-learning
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Künzel et al. - 2017 - Metalearners for estimating heterogeneous treatment effects using machine learning.pdf]]"
source_location: "T-Learner section + Theorem 1, pp. 4158-4161"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Treatment Effect Estimation"
doc_type: paper
depends_on:
  - "[[Metalearners for CATE]]"
used_by:
  - "[[X-Learner]]"
  - "[[Metalearner Simulation Results]]"
aliases:
  - two-learner
  - T-RF
  - T-learner
---

# T-Learner and Minimax Rate

> [!summary]
> The T-learner (two-learner) fits separate base learners for the treatment and control response functions, then estimates CATE as their difference. It achieves the minimax optimal rate for CATE estimation under standard smoothness conditions. However, it is suboptimal for unbalanced treatment groups — the smaller group's response function is estimated with higher variance, which propagates into the CATE estimate.

## Definition and Algorithm

> [!definition] Definition: T-Learner
> **Step 1 (first stage):** Fit separate response functions on each arm:
> $$
> \hat{\mu}_0(x) = \mathbb{E}[Y(0) \mid X = x] \quad \text{estimated on control units } \{i: W_i = 0\}
> $$
> $$
> \hat{\mu}_1(x) = \mathbb{E}[Y(1) \mid X = x] \quad \text{estimated on treated units } \{i: W_i = 1\}
> $$
>
> **Step 2:** Estimate CATE as:
> $$
> \hat{\tau}^T(x) = \hat{\mu}_1(x) - \hat{\mu}_0(x)
> $$
^def-t-learner

## Minimax Rate Theorem

> [!theorem] Theorem 1: Minimax Rate of T-Learner (Künzel et al. 2019)
> For a family of superpopulations $\mathcal{P}$ from $S(a_0, a_\tau)$ (where $a_0$ controls base function smoothness and $a_\tau$ controls CATE smoothness), there exist base learners for the T-learner such that:
>
> $$
> \sup_{\mathcal{P} \in S(a_0, a_\tau)} \text{EMSE}(\mathcal{P}, \hat{\tau}^T) \leq C(m^{-a_0} + n^{-a_0})
> $$
>
> where $m$ is the total number of units, $n$ is the number of treated units, and $C$ is a constant.
>
> **Interpretation:** The T-learner rate is limited by the smaller of the two sample sizes ($n$ treated vs. $m-n$ control). When groups are balanced, both converge at rate $N^{-a_0}$, which is minimax optimal if the response functions and CATE have the same smoothness.
>
> **Key limitation:** If the treatment group is much smaller ($n \ll m-n$), the T-learner is limited by $n^{-a_0}$ — it cannot exploit the large control group to improve estimation of the treatment response.
^thm-t-learner-minimax

## When T-Learner Fails

Consider an experiment where:
- Control group: $m - n = 1000$ observations
- Treatment group: $n = 100$ observations
- True CATE: $\tau(x) \approx$ constant

The T-learner fits $\hat{\mu}_1$ on only 100 observations → high variance → the CATE estimate inherits that variance. The large control group provides no benefit.

The X-learner addresses precisely this failure mode — see [[X-Learner]].

## Properties

**Key advantage:**
- Completely separates treatment and control estimation → no interference between groups
- Theorem 1 guarantees minimax optimality when groups are balanced and $a_0 = a_\tau$

**Key weakness:**
- Suboptimal when $n \ll m - n$ (or vice versa): limited by smaller group's sample size
- Cannot exploit cross-group information (unlike X-learner)

## Connections

- Extends [[Metalearners for CATE]] framework
- Limitation motivates [[X-Learner]] design
- Rate result uses [[Metalearners for CATE#def-family]] families $S(a)$

## See Also

- [[Metalearners for CATE]] — framework
- [[S-Learner]] — simpler single-model approach
- [[X-Learner]] — overcomes T-learner's unbalanced group limitation
