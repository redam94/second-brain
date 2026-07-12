---
title: "Market Share Models"
aliases:
  - "MCI Model"
  - "MNL Market Share"
  - "Multinomial Logit Share"
tags:
  - source/ingested
  - type/concept
  - topic/market-response
  - topic/market-share
  - topic/discrete-choice
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_ingested: 2026-04-11
date_updated: 2026-06-15
folder: "Market Response Models/Static Response Models"
source: "Hanssens, Parsons & Schultz (2001) Ch. 3"
chapter: "3"
status: complete
doc_type: concept
source_location: "Ch. 3, pp. 94-128"
depends_on:
  - "[[Functional Forms in Marketing]]"
  - "[[Markets Data and Sales Drivers]]"
used_by:
  - "[[Design of Static Response Models]]"
  - "[[Parameter Estimation in Market Response]]"
  - "[[Reaction Functions and Competitive Dynamics]]"
  - "[[Price and Distribution Effects]]"
  - "[[Optimal Marketing Decisions and Forecasting]]"
---

# Market Share Models

> [!abstract] Summary
> Market share models specify competitive share directly as a function of brand-level marketing variables, ensuring shares sum to one across brands. The two primary forms are the Multiplicative Competitive Interaction (MCI) model and the Multinomial Logit (MNL) model. Both derive from attraction theory.

## Attraction Theory Framework

> [!definition] Attraction-Based Market Share
> Brand $i$'s market share is the ratio of its attraction $A_i$ to total category attraction:
>
> $$MS_i = \frac{A_i}{\sum_{j=1}^{B} A_j}$$
>
> Attraction $A_i$ is a function of brand $i$'s marketing mix. This formulation guarantees $\sum_i MS_i = 1$ and $0 < MS_i < 1$.
> ^def-attraction

## MCI Model (Multiplicative Competitive Interaction)

> [!definition] MCI
> The **MCI model** specifies attraction multiplicatively:
>
> $$MS_i = \frac{\prod_k X_{ik}^{\beta_k}}{\sum_{j=1}^{B} \prod_k X_{jk}^{\beta_k}}$$
>
> where $X_{ik}$ is brand $i$'s level of marketing variable $k$, and $\beta_k$ is the common response parameter for variable $k$.
>
> **Log-centering transformation** makes MCI linear:
> $$\ln\!\left(\frac{MS_i}{\bar{MS}}\right) = \sum_k \beta_k \ln\!\left(\frac{X_{ik}}{\bar{X}_k}\right) + \epsilon_i$$
>
> where bars denote geometric means. This can be estimated by OLS.
>
> **Own-share elasticity:** $\eta_{ii} = \beta_k(1 - MS_i)$
> **Cross-share elasticity:** $\eta_{ij} = -\beta_k \cdot MS_j$
> ^def-mci

## MNL Model (Multinomial Logit)

> [!definition] MNL Market Share
> The **MNL model** uses additive utility (log-attraction = linear in marketing variables):
>
> $$MS_i = \frac{\exp\!\left(\sum_k \beta_k X_{ik}\right)}{\sum_{j=1}^{B} \exp\!\left(\sum_k \beta_k X_{jk}\right)}$$
>
> This is equivalent to assuming consumers choose brands by utility maximization with logistically distributed errors (McFadden 1974). Related to [[Logit Purchase Decision Model]].
>
> **Own-share elasticity:** $\eta_{ii} = \beta_k X_{ik}(1 - MS_i)$
> **Cross-share elasticity:** $\eta_{ij} = -\beta_k X_{ik} \cdot MS_j$
> ^def-mnl

## IIA Property and its Marketing Implications

> [!theorem] Independence of Irrelevant Alternatives (IIA)
> Both MCI and MNL satisfy the **IIA property**: the ratio $MS_i / MS_j$ depends only on brands $i$ and $j$'s attributes, not on any other brand $k$. Formally:
>
> $$\frac{MS_i}{MS_j} = \frac{A_i}{A_j}$$
>
> **Implication:** Proportional draw — a new brand takes share from all existing brands proportionally to their current shares. This is violated in practice when new brands compete more closely with some brands than others (e.g., a private label competes mainly with lower-priced national brands).
>
> Relaxations: nested logit, random coefficients logit (BLP), and probit models.
> ^thm-iia

## Differential Effects and the Heterogeneous MCI

When response parameters vary across brands ($\beta_{ik}$ instead of $\beta_k$), the model cannot be identified without restrictions. One solution is the **differential effects MCI**, which allows brand-specific intercepts plus common slope coefficients.

## Estimation via Log-Centering

For a market with $B$ brands, the MCI system is identified from $B-1$ equations (one is redundant). The log-centering approach:

1. Compute geometric mean share $\bar{MS}$ and geometric mean of each variable $\bar{X}_k$
2. Regress $\ln(MS_i / \bar{MS})$ on $\ln(X_{ik} / \bar{X}_k)$ for $i = 1, \ldots, B-1$
3. OLS yields consistent estimates under homoscedastic errors

For correlated errors across brands, SUR (Seemingly Unrelated Regressions) is more efficient — see [[Parameter Estimation in Market Response]].

## Decomposition: Primary Demand vs. Selective Demand

A brand's total sales elasticity decomposes as:

$$\eta_{\text{total},k} = \eta_{\text{primary},k} + \eta_{\text{share},k} \cdot MS_i$$

The **Schultz-Wittink framework** uses brand-level, category-level, and cross-brand equations jointly to identify how much of a brand's sales effect is primary demand expansion vs. share-stealing — see [[Marketing Generalizations Overview]].

## Cross-Links

- Foundational functional forms: [[Functional Forms in Marketing]]
- Estimation: [[Parameter Estimation in Market Response]]
- Discrete choice foundation: [[Logit Purchase Decision Model]]
- Empirical share elasticities: [[Price and Distribution Effects]]
- Econometric discrete choice parallel: [[Discrete Choice Models]] (MNL in market share = logit in discrete choice)
- IIA relaxation with heterogeneous preferences: heterogeneous MCI connects to latent segment models covered in [[Monsters and Mixtures]] and [[Hierarchical Models]]
