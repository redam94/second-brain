---
title: "Dynamic Treatment Regimes Framework"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/dynamic-treatment-regimes
  - type/definition
  - doc/paper
source: "[[raw/q- and a- learning.pdf]]"
source_location: "§2 Framework and Assumptions, pp. 642-645"
date_ingested: 2026-06-27
folder: "Bayesian Statistics/Causal Inference/Dynamic Treatment Regimes"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Causal Estimands]]"
used_by:
  - "[[Optimal Regime via Dynamic Programming]]"
  - "[[Q- and A-learning - Overview]]"
aliases:
  - optimal regime definition
  - sequential randomization assumption
  - dynamic treatment regime assumptions
---

# Dynamic Treatment Regimes Framework

> [!summary]
> The conceptual framework for optimal dynamic treatment regimes (DTRs). With $K$ ordered decision points, potential outcomes are defined over all possible treatment **histories** $\bar a_K = (a_1, \dots, a_K)$. A regime $d = (d_1, \dots, d_K)$ assigns, at each decision $k$, a treatment as a function of the realized history $(\bar s_k, \bar a_{k-1})$. The **optimal regime** $d^{\text{opt}}$ maximizes the population mean potential outcome. Estimating it from observed data requires three assumptions: **consistency** (SUTVA), **sequential randomization** (no unmeasured confounders at each decision), and **positivity** (every treatment option in the regime class is represented in the data).

## Overview

To define and estimate an optimal regime we need a careful potential-outcomes setup for *sequential* decisions. Large values of a final outcome $Y$ are preferred; $Y$ may be measured after the $K$th decision or be a function of the whole trajectory. This note states the estimand and the assumptions under which it is identifiable; the methods that estimate it are in [[Optimal Regime via Dynamic Programming]], [[Q-learning]], and [[A-learning and Robustness]].

## Main Content

### Notation

- $K$ ordered decision points $k = 1, \dots, K$; at each, a finite set $\mathcal{A}_k$ of treatment options.
- $S_1$: baseline covariates; $S_k$ ($k\ge2$): covariate information accrued between decisions $k-1$ and $k$.
- $\bar a_k = (a_1, \dots, a_k)$: a treatment history; $\bar S_k = (S_1, \dots, S_k)$.
- $A_k$: the observed (recorded) treatment at decision $k$; $Y$: observed outcome.
- $\Psi_k(\bar s_k, \bar a_{k-1}) \subseteq \mathcal{A}_k$: the set of treatment options *permitted* for a patient with that history (encodes ethical/feasibility/policy restrictions); the regime class $\mathcal{D}$ is **$\Psi$-specific**.

> [!definition] Definition: Potential outcomes for sequential treatments (Robins 1986; §2, Eq. 1)
> The full set of potential outcomes is
> $$
> W^{*} = \Bigl\{ S_2^{*}(a_1),\ S_3^{*}(\bar a_2),\ \dots,\ S_K^{*}(\bar a_{K-1}),\ Y^{*}(\bar a_K)\ \text{for all } \bar a_K \in \bar{\mathcal{A}}_K \Bigr\},
> $$
> where $S_k^{*}(\bar a_{k-1})$ is the covariate value that *would* arise between decisions $k-1$ and $k$ had the patient received history $\bar a_{k-1}$, and $Y^{*}(\bar a_K)$ is the outcome that would result under the full treatment history $\bar a_K$.
> ^def-potential-outcomes

> [!definition] Definition: Dynamic treatment regime and optimal regime (§2-3, Eqs. 3-4)
> A **dynamic treatment regime** $d = (d_1, \dots, d_K)$ is a set of rules where rule $d_k(\bar s_k, \bar a_{k-1}) \in \Psi_k(\bar s_k, \bar a_{k-1})$ maps the realized history to a treatment. Writing $Y^{*}(d)$ for the potential outcome under regime $d$, the regime $d^{\text{opt}} \in \mathcal{D}$ is **optimal** if
> $$
> \mathbb{E}\{Y^{*}(d) \mid S_1 = s_1\} \;\le\; \mathbb{E}\{Y^{*}(d^{\text{opt}}) \mid S_1 = s_1\}
> \quad \text{for all } d \in \mathcal{D} \text{ and all } s_1 \in \mathcal{S}_1.
> $$
> Optimality is **predicated on the chosen class $\mathcal{D}$** (the restrictions $\Psi$); the class is conceived from scientific/policy objectives, not from the available data.
> ^def-optimal-regime

### Identification assumptions

> [!definition] Assumptions for identifying $d^{\text{opt}}$ from observed data (§2)
> 1. **Consistency (SUTVA part 1):** the observed covariates/outcome equal the potential ones under the treatments actually received — $S_k = S_k^{*}(\bar A_{k-1})$ and $Y = Y^{*}(\bar A_K)$.
> 2. **Stable Unit Treatment Value Assumption (Rubin 1978):** a patient's covariates/outcome are unaffected by how treatments are allocated to *other* patients.
> 3. **Sequential randomization / no unmeasured confounders (Robins 1994):** at each decision, the observed treatment is conditionally independent of the future potential outcomes given the history — $A_k \perp\!\!\!\perp W^{*} \mid \bar S_k, \bar A_{k-1}$, $k=1,\dots,K$. Satisfied **by design** in a SMART; **unverifiable** in observational data.
> 4. **Positivity (§3, Eq. 15):** every permitted treatment option occurs with positive probability in the data — $\operatorname{pr}(A_k = a_k \mid \bar S_k = \bar s_k, \bar A_{k-1} = \bar a_{k-1}) > 0$ for histories in $\Gamma_k$ and $a_k \in \Psi_k$.
> ^def-assumptions

**Feasible regimes.** Estimability of $d^{\text{opt}}$ requires the treatment options in $\Psi_k$ to be represented in the data; the largest class so representable is the class of **feasible regimes** $\Psi^{\max}$ (Robins 2004). If $\Psi \not\subseteq \Psi^{\max}$, the class of interest must be revised or new data found.

### Study designs

- **Observational study:** treatment follows routine clinical practice; sequential randomization is an untestable assumption.
- **SMART (Sequential Multiple Assignment Randomized Trial; Lavori & Dawson 2000; Murphy 2005):** participants are *re-randomized* at each decision point (randomization probabilities may depend on history), making sequential randomization hold by design — the gold standard for DTR data.

## Connections

- A sequential extension of the [[Potential Outcomes Framework]]; the estimand generalizes the single-stage average treatment effect ([[Causal Estimands]]).
- The sequential-randomization assumption is the multi-stage analog of unconfoundedness used in [[Time-Varying Treatments and G-computation|g-computation]].
- Provides the estimand that [[Optimal Regime via Dynamic Programming]] characterizes and [[Q-learning]]/[[A-learning and Robustness]] estimate.

## See Also

- [[Q- and A-learning - Overview]] — paper summary
- [[Optimal Regime via Dynamic Programming]] — how $d^{\text{opt}}$ is computed by backward induction
- [[Time-Varying Treatments and G-computation]] — related sequential-treatment identification
