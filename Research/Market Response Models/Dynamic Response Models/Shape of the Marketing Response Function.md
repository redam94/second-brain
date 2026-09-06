---
title: "Shape of the Marketing Response Function"
aliases:
  - "Marketing Response Shape"
  - "Concave vs S-shaped Response"
tags:
  - type/concept
  - topic/market-response
  - topic/functional-forms
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 4"
chapter: "4"
status: complete
doc_type: concept
source_location: "Ch. 4, Sec. 4.3, pp. 156-165"
depends_on:
  - "[[Functional Forms in Marketing]]"
  - "[[Carryover Effects and Distributed Lags]]"
used_by:
  - "[[Optimal Marketing Decisions and Forecasting]]"
folder: "Research/Market Response Models/Dynamic Response Models"
date_ingested: 2026-04-08
---

# Shape of the Marketing Response Function

> [!abstract] Summary
> The shape of the response function (concave, convex, S-shaped, or linear) has profound implications for optimal budget allocation, pulsing strategies, and competitive dynamics. This note covers prior knowledge levels, the conditions under which each shape arises, and the budget implications.

## Prior Knowledge Levels

Chapter 4 introduces a taxonomy of prior knowledge that constrains model specification:

> [!definition] Prior Knowledge Levels
> - **Level 0**: Only the information set is known (which variables to include)
> - **Level 1**: Causal ordering is known (which variables affect which)
> - **Level 2**: Functional form and lag structure are fully specified
>
> Most applied work operates at Level 1-2. The choice of functional form is a Level 2 specification that should be grounded in behavioral theory.
> ^def-prior-knowledge

## Concave Response (Diminishing Returns)

> [!theorem] When Response is Concave
> Response is concave when:
> 1. Awareness reaches saturation (most of the target audience is already aware)
> 2. Additional exposures yield diminishing incremental attitude change
> 3. The market is already heavily penetrated
>
> **Budget implication:** Under concave response, the optimal strategy is **continuous (even) spending** — pulsing (concentrating spending) is suboptimal because it wastes money in periods of high spending where marginal returns are low.
>
> Functional forms: power ($0 < \beta_1 < 1$), semilog, modified exponential.
> ^thm-concave

## S-Shaped Response (Convex-Concave)

> [!theorem] When Response is S-Shaped
> Response is S-shaped when:
> 1. There is a **threshold** below which advertising has minimal effect (awareness builds slowly)
> 2. Above the threshold, response accelerates (word-of-mouth amplifies the message)
> 3. Eventually saturation is reached (concave portion)
>
> **Budget implication:** Under S-shaped response, **pulsing** can be optimal — concentrating spending at levels above the threshold in some periods, and spending zero (or the minimum) in other periods.
>
> Functional forms: log-reciprocal, ADBUDG ($\beta_2 > 1$), Gompertz, logistic.
> ^thm-s-shaped

## Convex Response (Increasing Returns)

Convex response (exponential form) implies increasing marginal returns — rare in mature markets but possible in new product introductions where word-of-mouth creates an accelerating adoption process (related to [[Product Adoption and Diffusion Models]] Bass model). Under convex response, it is optimal to concentrate all spending in one period (corner solution).

## Asymmetric and Threshold Effects

> [!definition] Threshold Effect
> A **threshold** level $X^*$ exists below which advertising has essentially zero effect. Above $X^*$, response becomes positive. Threshold models arise from:
> - Awareness building (minimum exposures needed for recall)
> - Media vehicle minimum reach requirements
>
> Estimated via a kinked linear model: $Q = \beta_0 + \beta_1 \max(X - X^*, 0)$
> ^def-threshold

## Hysteresis and Path Dependence

> [!definition] Hysteresis
> **Hysteresis** in marketing means that temporary marketing actions can have permanent effects on sales. A brand that achieves high advertising levels builds consumer goodwill that persists even after spending returns to normal (fast learning/slow forgetting).
>
> Formally: if brand performance is an evolving (unit-root) process, then even temporary shocks have persistent effects. This is operationalized through the multivariate persistence measures in [[Multivariate Persistence and Cointegration]].
>
> Ratchet models (Eq 4.47) capture a simple form of hysteresis: $Q_t = \beta_0 + \beta_1 X_t + \beta_2 \max_{i \leq t}(X_i)$, where the maximum historical advertising level permanently anchors the baseline.
> ^def-hysteresis

## Implications for Pulsing Strategies

| Response Shape | Optimal Strategy | Logic |
|----------------|------------------|-------|
| Concave | Even spending ("maintenance") | Avoid high-marginal-cost periods |
| S-shaped | Pulsing (on/off) | Exceed threshold in active periods |
| Convex | All-or-nothing | Increasing returns reward concentration |
| Linear | Indifferent | All spending levels equally efficient |

## Cross-Links

- Functional form catalogue: [[Functional Forms in Marketing]]
- ADBUDG for budget optimization: [[Optimal Marketing Decisions and Forecasting]]
- Hysteresis in time series: [[Multivariate Persistence and Cointegration]]
- Product adoption S-curves: [[Product Adoption and Diffusion Models]]
- Ratchet models: [[Carryover Effects and Distributed Lags]]
