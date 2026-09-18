---
title: Variance-Based Sensitivity and Sobol Indices
tags:
  - source/ingested
  - topic/agent-based-modeling
  - type/definition
  - doc/paper
source: "[[raw/Review of Global Sensitivity Analysis Methods 2024.pdf]]"
source_location: "Sec. 1.1-1.1.1 (Variance based methods / Sobol), pp. 2-3"
date_ingested: 2026-06-28
folder: "Agent-Based Modeling/Calibration and Validation/Sensitivity Analysis"
doc_type: paper
depends_on:
  - "[[Global Sensitivity Analysis - Overview]]"
used_by:
  - "[[Sampling and Estimation for Sobol Indices]]"
  - "[[Morris Elementary Effects Screening]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Choosing a Simulation-Based Inference Method for ABM Calibration]]"
aliases:
  - Sobol Indices
  - Sobol Sensitivity Indices
  - ANOVA Variance Decomposition
  - First-order and Total-effect Indices
  - HDMR
---

# Variance-Based Sensitivity and Sobol Indices

> [!summary]
> **Sobol's method** decomposes the output variance $V(Y)$ into contributions from individual factors and their interactions (the **ANOVA / HDMR / Sobol-Hoeffding decomposition**), assuming inputs are **independent and uncorrelated**. The **first-order index** $S_i = V_i / V(Y)$ measures the variance attributable to $X_i$ *alone*; the **total-effect index** $S_{Ti}$ sums all terms involving $X_i$, capturing its main effect plus every interaction. The gap $S_{Ti} - S_i$ quantifies how much of a factor's influence operates through interactions, and $\sum_i S_i = 1$ exactly for a purely additive model.

## Overview

Variance-based methods rest on the assumption (Saltelli et al.) "that variance is sufficient to describe the output uncertainty." The rationale: examine the variance of the conditional expected output given a factor. Sobol's method "relies on decomposition of the model output variance under the assumption that inputs are independent and uncorrelated." See [[Global Sensitivity Analysis - Overview]].

## Main Content

> [!definition] ANOVA / Sobol variance decomposition ^anova-decomposition
> For $Y=f(X_1,\dots,X_p)$ with independent inputs, the total variance decomposes into orthogonal terms of increasing order:
> $$
> V(Y) = \sum_{i=1}^{p} V_i \;+\; \sum_{1 \le i < j \le p} V_{ij} \;+\; \dots \;+\; V_{1,2,\dots,p}
> $$
> where the **partial (first-order) variance** of factor $X_i$ is
> $$
> V_i = V\big(\mathbb{E}(Y \mid X_i)\big)
> $$
> and the **second-order interaction variance** of $X_i, X_j$ is
> $$
> V_{ij} = V\big(\mathbb{E}(Y \mid X_i, X_j)\big) - V_i - V_j .
> $$
> $V_i$ is the expected reduction in output variance if $X_i$ were fixed; $V_{ij}$ is the additional joint effect beyond the two main effects.

> [!definition] First-order (main effect) Sobol index ^first-order-index
> $$
> S_i = \frac{V_i}{V(Y)} = \frac{V\big(\mathbb{E}(Y\mid X_i)\big)}{V(Y)}
> $$
> $S_i \in [0,1]$ is the **fraction of output variance caused by factor $X_i$ acting alone** (its main effect, averaged over all other factors). Used for **factor prioritization**: a large $S_i$ means determining $X_i$ more precisely most reduces output uncertainty. The analogous **second-order index** is $S_{ij} = V_{ij}/V(Y)$, the share due to the $X_i$–$X_j$ interaction.

> [!definition] Total-effect (total-order) Sobol index ^total-effect-index
> $$
> S_{Ti} = \sum_{k \in \#i} S_k
> $$
> the sum over **all** index combinations $k$ that contain $i$ (its main effect plus every interaction it participates in). Equivalently $S_{Ti} = 1 - S_{\sim i}$, the share of variance left when *all factors except* $X_i$ are fixed. Used for **factor fixing**: $S_{Ti} \approx 0 \Rightarrow X_i$ can be frozen anywhere in its range with negligible effect on $Y$.

> [!theorem] Interaction detection and budget identities ^interaction-identities
> Two diagnostic relations follow directly:
> - $\sum_{i=1}^{p} S_i \le 1$, with **equality iff the model is purely additive** (no interactions). A deficit $1-\sum_i S_i$ measures total interaction strength.
> - $S_{Ti} \ge S_i$ always; the gap $S_{Ti}-S_i$ is the portion of $X_i$'s effect mediated by **interactions** with other factors. $S_{Ti}=S_i$ means $X_i$ acts additively.
> - $\sum_i S_{Ti} \ge 1$, with equality iff additive (interactions are counted once per participating factor, so they are double/multiply counted in the total-effect sum).

The paper notes Sobol "assesses the impact of each input parameter, both in isolation and in conjunction with other parameters," yielding first-, second-, total-, and higher-order indices. In the MNIST case study the **Sobol $S_T$** index was among the most reliable importance measures.

## Examples

Suppose a 3-parameter ABM gives $S_1=0.40,\ S_2=0.20,\ S_3=0.05$ and $S_{T1}=0.45,\ S_{T2}=0.50,\ S_{T3}=0.35$.

- $\sum S_i = 0.65 < 1$ → **35% of output variance comes from interactions** (non-additive model).
- $X_1$: $S_{T1}-S_1 = 0.05$ → mostly acts alone; it is the dominant *main* driver.
- $X_3$: $S_3=0.05$ but $S_{T3}=0.35$ → **almost all of $X_3$'s influence is through interactions**. A local OAT scan holding others fixed would wrongly conclude $X_3$ is unimportant (see [[Local vs Global Sensitivity Analysis]]).
- $X_2$ has the **largest total effect** ($S_{T2}=0.50$) despite a modest main effect — a key interacting factor that must not be fixed.

## Connections

- [[Global Sensitivity Analysis - Overview]] — places variance-based methods among the four GSA families.
- [[Sampling and Estimation for Sobol Indices]] — how $V_i$, $S_{Ti}$ are estimated (Saltelli Monte-Carlo, FAST spectral).
- [[Morris Elementary Effects Screening]] — cheap screening; Morris $\mu^*$ correlates with $S_{Ti}$ for ranking.
- [[Local vs Global Sensitivity Analysis]] — total-effect indices are exactly what OAT cannot capture.
- [[Uncertainty Quantification for ABM Calibration]] — variance decomposition complements output UQ.

## See Also

- [[History Matching for ABMs]]; [[Approximate Bayesian Computation for ABMs]] — $S_{Ti}$ guides which parameters to keep active.
- Sobol (2001), "Global sensitivity indices for nonlinear mathematical models and their Monte Carlo estimates."
- Saltelli et al. (2010), "Variance based sensitivity analysis of model output: design and estimator for the total sensitivity index."
