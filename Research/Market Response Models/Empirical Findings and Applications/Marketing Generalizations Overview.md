---
title: "Marketing Generalizations Overview"
aliases:
  - "Empirical Marketing Generalizations"
  - "Meta-Analysis Marketing"
tags:
  - type/concept
  - topic/market-response
  - topic/empirical-findings
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_ingested: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 8"
chapter: "8"
status: complete
doc_type: concept
source_location: "Ch. 8, pp. 319-327"
depends_on:
  - "[[Parameter Estimation in Market Response]]"
  - "[[Markets Data and Sales Drivers]]"
used_by:
  - "[[Advertising and Promotion Effects]]"
  - "[[Price and Distribution Effects]]"
---

# Marketing Generalizations Overview

> [!abstract] Summary
> Chapter 8 synthesizes empirical findings into marketing generalizations — regularities in market response relationships that hold across multiple studies and conditions. Covers the criteria for a good generalization, three methods for discovering them (informal observation, literature review, meta-analysis), and the cautionary note about measurement error.

## What is an Empirical Marketing Generalization?

> [!definition] Marketing Generalization
> A **marketing generalization** is an approximate, quantitative summary of market response regularities that:
> 1. Is based on repeated empirical evidence across multiple studies or datasets
> 2. Has sufficient **scope** to be meaningful across conditions
> 3. Is stated with **precision** (quantitative range, not just direction)
> 4. Is **parsimonious** (simple formulation)
> 5. Is **useful** for practitioners
> 6. Has a **theoretical link** (explains the mechanism, not just the pattern)
>
> The measurement-error caveat (Morrison & Silva-Risso 1995): Observed value = True Score + Error (Eq 8.11), so generalizations should ideally be based on latent true scores.
> ^def-generalization

## Three Methods for Discovering Generalizations

### 1. Informal Observation

An experienced researcher identifies patterns across studies they know well. Qualitative; subject to availability bias and selective recall.

### 2. Literature Review

**Narrative review**: synthesize all relevant studies at face value. Breaks down with as few as 7 studies (information processing limits).

**Voting method**: count positive-significant, negative-significant, and null results across studies. More systematic but misses effect-size information.

### 3. Meta-Analysis

> [!definition] Meta-Analysis
> Statistical analysis of effect sizes (elasticities) across studies. Key features:
> - Dependent variable must be dimensionless (elasticities satisfy this)
> - Can estimate mean elasticity and its variance across studies
> - Can identify systematic moderators (brand size, product category, data frequency)
>
> Marketing meta-analyses: Aaker & Carman (1982) on advertising; Assmus, Farley & Lehmann (1984) on advertising; Tellis (1988) on price; Sethuraman, Srinivasan & Kim (1999) on price cross-effects.
>
> Caveat: model structures may generalize even when parameters do not.
> ^def-meta-analysis

## Key Null Hypothesis Values for Marketing Models

Based on meta-analytic findings, recommended null hypothesis starting values (prior means) for future models:

| Parameter | Recommended Null | Source |
|-----------|-----------------|--------|
| Short-run advertising elasticity | 0.10–0.22 | Assmus et al. (1984), Sethuraman & Tellis (1991) |
| Price own-elasticity | −2.5 | Tellis (1988) |
| Advertising retention rate $\lambda$ (monthly, raw) | 0.43–0.50 | Clarke (1976), Assmus et al. (1984) |
| Advertising retention rate (adjusted for aggregation) | 0.69–0.775 | Leone (1995) |

## Schultz-Wittink Decomposition

> [!definition] Primary vs. Selective Demand
> A brand's sales effect can be decomposed into:
> - **Primary demand effect**: brand advertising grows the total category (industry sales elasticity > 0)
> - **Selective demand effect**: brand advertising takes market share from rivals (market share elasticity > 0)
>
> Table 8-2: six cases based on the combination of market share elasticity, primary demand elasticity, and rival sales cross-elasticity sign:
> - Case I: Primary demand only (Cereals: primary elasticity 0.029)
> - Case III: Competitive only (Cigars: market share 0.076, rival cross-elasticity −0.079)
> - Case IV: Both primary and primary sales (Deodorants)
> ^def-primary-selective

## The Measurement Error Warning

Because all elasticity estimates contain sampling error, the search for generalizations must account for the $O = T + E$ framework (Eq 8.11-8.12):

$$\text{Measured Elasticity} = \text{True Elasticity} + \text{Error}$$

Meta-analytic means are biased if studies systematically use the same misspecified model. Good practice: weight studies by sample size and correct for known biases (temporal aggregation, endogeneity).

## Cross-Links

- Advertising empirical findings: [[Advertising and Promotion Effects]]
- Price and distribution findings: [[Price and Distribution Effects]]
- Optimal decisions: [[Optimal Marketing Decisions and Forecasting]]
- Carryover and aggregation: [[Carryover Effects and Distributed Lags]]
- Research methodology: [[Power Analysis and Sample Size]], [[Multiple Testing Corrections]]
