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
doc_type: overview
source_location: "full book, pp. 3-425"
depends_on: []
used_by:
  - "[[Response Models for Marketing Management]]"
  - "[[Markets Data and Sales Drivers]]"
folder: "Research/Market Response Models/Introduction"
date_ingested: 2026-04-08
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

## Cross-Links by Chapter

### Introduction (Ch. 1–2)
- [[Response Models for Marketing Management]] — management tasks, planning cycle, model framework (Ch. 1)
- [[Markets Data and Sales Drivers]] — data sources, variable types, measurement issues (Ch. 2)

### Static Response Models (Ch. 3)
- [[Functional Forms in Marketing]] — 10 functional forms with full LaTeX + elasticities (Ch. 3)
- [[Market Share Models]] — MCI and MNL market share models (Ch. 3)
- [[Aggregation of Relations]] — temporal and cross-sectional aggregation bias (Ch. 3)
- [[Design of Static Response Models]] — variable specification, lagged effects, competitive structure (Ch. 3)

### Dynamic Response Models (Ch. 4)
- [[Carryover Effects and Distributed Lags]] — Koyck, ADL, PDL, geometric lag structures (Ch. 4)
- [[Reaction Functions and Competitive Dynamics]] — competitive response, Nash equilibria (Ch. 4)
- [[Shape of the Marketing Response Function]] — S-shape, hysteresis, supersaturation (Ch. 4)
- [[Design of Dynamic Response Models]] — lag selection, partial adjustment, error correction (Ch. 4)

### Estimation and Testing (Ch. 5)
- [[Parameter Estimation in Market Response]] — OLS, GLS, SUR, 2SLS, Bayes HB estimation (Ch. 5)
- [[Model Testing and Specification]] — RESET, specification errors, multicollinearity (Ch. 5)
- [[Flexible Functional Forms]] — translog, Box-Cox, AIDs flexible forms (Ch. 5)
- [[Model Selection and Exploratory Analysis]] — information criteria, cross-validation, exploratory tools (Ch. 5)

### Time Series Analysis (Ch. 6–7)
- [[Single Marketing Time Series]] — ARIMA identification, estimation, and diagnostics (Ch. 6)
- [[Transfer Function Model]] — transfer function models for input-output time series (Ch. 7)
- [[Multivariate Persistence and Cointegration]] — VAR, cointegration, ECM, Granger causality (Ch. 7)
- [[Empirical Causal Ordering]] — Granger causality in marketing systems (Ch. 7)

### Empirical Findings and Applications (Ch. 8–10)
- [[Marketing Generalizations Overview]] — meta-analysis criteria, null hypothesis values (Ch. 8)
- [[Advertising and Promotion Effects]] — advertising elasticity ≈ 0.10, duration 6–9 months (Ch. 8)
- [[Price and Distribution Effects]] — price elasticity ≈ −2.5, distribution effects (Ch. 8)
- [[Optimal Marketing Decisions and Forecasting]] — Dorfman-Steiner theorem, budget allocation (Ch. 9)
- [[Implementation of Market Response Models]] — organizational adoption, software, reporting (Ch. 10)

### Related Methods (Cross-Domain)
- [[The Experimental Ideal]], [[Differences-in-Differences]] — causal inference counterparts
- [[Bayesian Workflow - Overview]] — Bayesian estimation approach to the same models
