---
title: "Markets Data and Sales Drivers"
aliases:
  - "MRM Data"
  - "Scanner Data Marketing"
  - "Marketing Mix Variables"
tags:
  - type/concept
  - topic/market-response
  - topic/data
  - source/hanssens-parsons-schultz-2001
date_created: 2026-04-11
date_updated: 2026-04-11
source: "Hanssens, Parsons & Schultz (2001) Ch. 2"
chapter: "2"
status: complete
---

# Markets Data and Sales Drivers

> [!abstract] Summary
> Chapter 2 covers the empirical raw material for market response models: data sources (scanner, warehouse, panels, mail), measurement of marketing variables (stock variables, relative indices, GRPs), aggregation choices (brand/category, store/market/national, weekly/monthly), and response measures (sales, market share, baseline).

## Data Sources

> [!definition] Scanner Data
> **Scanner data** are transaction records collected at point-of-sale (POS) terminals. Universal Product Codes (UPCs) track exact brand, size, price, and quantity sold. Scanner data exist at the store-week level and are aggregated by syndicators (IRI, Nielsen) to market-week panels.
>
> Advantages: high frequency, objective, captures price and promotion exactly.
> Limitations: no household demographics, stockpiling behavior unobservable at aggregate level.
> ^def-scanner

| Source | Unit | Typical Use |
|--------|------|-------------|
| Store scanner (IRI/Nielsen) | Store × week | Retail sales, price, promotion |
| Warehouse withdrawals | Warehouse × week | Manufacturer shipments |
| Consumer panels (BehaviorScan) | Household × trip | Purchase incidence, brand switching |
| Mail panels | Household × month | Attitudes, awareness |
| Advertising monitoring (BAR/LNA) | Brand × week × medium | GRPs, share of voice |

## Key Variable Types

### Stock Variables

> [!definition] Stock Variable (Advertising Goodwill)
> An **advertising goodwill stock** $G_t$ accumulates past advertising with geometric decay:
>
> $$G_t = A_t + \lambda G_{t-1}, \quad 0 < \lambda < 1$$
>
> where $\lambda$ is the **retention rate** (carryover parameter) and $A_t$ is current advertising spend. The stock formulation is equivalent to the Koyck distributed lag — see [[Carryover Effects and Distributed Lags]].
> ^def-stock

### Relative Variables

> [!definition] Relative Index Variables
> Three standard relative measures for competitive context:
>
> - **RIX** (Relative Income Index): brand price relative to category average
> - **RCX** (Relative Communication Index): brand advertising share relative to competitors
> - **RBX** (Relative Brand Index): composite brand equity measure
>
> Using relative variables reduces collinearity and captures competitive parity effects.
> ^def-relative-vars

### GRPs (Gross Rating Points)

> [!definition] GRPs
> **Gross Rating Points** = reach × frequency. One GRP = 1% of the target audience exposed once. GRPs are the standard currency for advertising media planning and are used as the advertising input $A_t$ in many response models.
>
> $$\text{GRP} = \text{Reach} \times \text{Average Frequency}$$
> ^def-grp

## Baseline Volume

> [!definition] Baseline Sales
> **Baseline volume** is the sales level that would occur without any promotional activity, typically estimated from a regression of sales on time trend and seasonal dummies with promotion periods excluded or treated as outliers. Incremental volume = total sales − baseline.
> ^def-baseline

Baseline decomposition is essential for ROI calculation of trade promotions (which typically show large total lift but much of it is displacement of baseline volume).

## Market Share

$$MS_t = \frac{Q_t}{Q_{T,t}}$$

where $Q_{T,t}$ = total category sales. Market share is bounded in $[0,1]$, motivating the logit/MCI share models in [[Market Share Models]].

## Aggregation

### Temporal Aggregation

Aggregating weekly data to monthly or annual data **biases carryover estimates**. Clarke (1976) showed estimated retention rates can be 20-50× longer in annual vs. monthly data — see [[Carryover Effects and Distributed Lags]] for recovery procedures.

### Cross-Sectional Aggregation

| Level | Pros | Cons |
|-------|------|------|
| Store | Most disaggregated, rich variation | Difficult to match to advertising |
| Market (DMA) | Standard AC Nielsen unit | Loses store-level heterogeneity |
| National | Matches national spending data | Masks regional variation |

### Brand vs. Category

MRMs can be estimated at brand level (selective demand) or category level (primary demand). The **Schultz-Wittink decomposition** separates a brand's sales effect into:
- Primary demand (grows category)
- Selective demand (takes share from competitors)

## Cross-Links

- Functional forms for response models: [[Functional Forms in Marketing]]
- Carryover and goodwill stock: [[Carryover Effects and Distributed Lags]]
- Market share models: [[Market Share Models]]
- Empirical advertising findings: [[Advertising and Promotion Effects]]
- Aggregation bias: [[Carryover Effects and Distributed Lags]]
