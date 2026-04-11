---
title: "Market Response Models - Overview"
aliases:
  - "MRM Overview"
  - "Hanssens Parsons Schultz"
tags:
  - type/overview
  - topic/market-response
  - topic/econometrics
  - topic/marketing-science
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Market Response Models: Econometric and Time Series Analysis, 2nd Ed."
chapter: "1-10 (full book)"
status: complete
---

# Market Response Models — Overview

> [!abstract] Summary
> A market response model (MRM) is an empirical specification of the quantitative relationship between marketing decision variables and market outcomes (sales, market share). This note provides the book-level overview of Hanssens, Parsons & Schultz (2001), covering the conceptual framework, management applications, and the book's structure across static models, dynamic models, estimation, time-series, and empirical findings.

## What is a Market Response Model?

> [!definition] Market Response Model
> A **market response model** is a mathematical function that maps marketing inputs (advertising, price, distribution, promotion) to market outputs (sales, market share). The canonical form is:
>
> $$Q_t = f(A_t, E_t)$$
>
> where $Q_t$ = unit sales, $A_t$ = marketing effort (advertising, price, promotion, distribution), $E_t$ = environmental factors (competition, macro economy, season).
> ^def-mrm

The decision (spending) rule is modeled symmetrically:

$$A_t = f(P_{t-1}, Q_{t-1})$$

Together these form a **simultaneous system**. The full structural model (Eq 1.1/1.2 in the book) is:

$$Q_t = \gamma_{12} A_t + \beta_{11} Y_t + \beta_{12} N_t + \beta_{13} + u_{1t}$$
$$A_t = \beta_{21} R_{t-1} + u_{2t}$$

where $Y_t$ = income, $N_t$ = competitor advertising, $R_{t-1}$ = lagged sales revenue.

## Four Management Tasks

> [!example] Management Tasks Supported by MRMs
> 1. **Planning** — which marketing instruments to deploy and in what quantity
> 2. **Budgeting** — how much total marketing spending to allocate
> 3. **Forecasting** — predicting future sales under alternative scenarios
> 4. **Controlling** — monitoring actual vs. predicted response; adjusting tactics
> ^ex-mgmt-tasks

The **model-based planning cycle** iterates: Set objectives → Specify model → Estimate parameters → Optimize → Implement → Monitor → Update model.

## Book Structure

| Chapter | Topic | Technical Depth |
|---------|-------|-----------------|
| Ch.1 | Introduction: management tasks, MRM framework | Conceptual |
| Ch.2 | Data: sources, variables, measurement | Moderate |
| Ch.3 | Static response models: functional forms | Deep |
| Ch.4 | Dynamic response models: distributed lags, competitive dynamics | Deep |
| Ch.5 | Estimation and testing | Deep |
| Ch.6 | Single marketing time series (ARIMA) | Deep |
| Ch.7 | Multiple marketing time series (TF, VAR, cointegration) | Deep |
| Ch.8 | Empirical findings: advertising, price, promotion, distribution | Concise |
| Ch.9 | Optimal decisions and forecasting | Concise |
| Ch.10 | Implementation | Concise |

## Key Methodological Distinction

> [!theorem] ETS Approach
> The book's distinguishing commitment is to **Econometric and Time Series (ETS)** analysis — formal statistical methods using observed market data, as opposed to managerial judgment or laboratory experiments. All models are estimated from data; all parameters have statistical uncertainty.
> ^thm-ets

## Cross-Links

- Specific functional forms: [[Functional Forms in Marketing]]
- Dynamic carryover and lag structures: [[Carryover Effects and Distributed Lags]]
- Estimation methods: [[Parameter Estimation in Market Response]]
- ARIMA for single series: [[Single Marketing Time Series]]
- VAR and cointegration: [[Multivariate Persistence and Cointegration]]
- Empirical generalizations: [[Marketing Generalizations Overview]]
- Related causal inference: [[The Experimental Ideal]], [[Differences-in-Differences]]
- Bayesian estimation: [[Bayesian Workflow - Overview]]
