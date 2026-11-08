---
title: "Banbura 2013 - Partial Models and the Empirical GDP Application"
tags:
  - source/ingested
  - topic/nowcasting
  - type/example
  - doc/paper
source: "[[raw/Banbura Giannone Modugno Reichlin 2013 - Now-casting and the Real-Time Data Flow.pdf]]"
source_location: "Sec. 2.4, Sec. 3 (Table 1, evaluation), Sec. 4 Conclusions"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Nowcasting, Small Areas and Polls/Banbura et al 2013 - Now-casting and the Real-Time Data Flow"
doc_type: paper
depends_on:
  - "[[Banbura 2013 - News Decomposition and Real-Time Vintages]]"
used_by:
  - "[[Banbura 2013 - Sensor Fusion in State-Space Form (Concept Note)]]"
aliases:
  - "bridge equations"
  - "MIDAS nowcasting"
  - "GDP nowcast empirical results"
---

# Banbura 2013 - Partial Models and the Empirical GDP Application

> [!summary]
> Bridge equations aggregate monthly predictors to the target frequency (filling the ragged edge with auxiliary AR/VAR forecasts); MIDAS regressions use predictors at native frequency with parsimonious lag polynomials. Both lack a joint model and hence news. In the real-time US GDP exercise (1995-2010) the factor-model benchmark beat bridge equations, surveys mattered, and daily/weekly variables added little.

## Overview
Partial models regress the target on predictors without a joint model, so the ragged edge needs auxiliary models or separate parameter sets per vintage. They remain common in policy institutions.

## Main Content

> [!definition] Bridge equation
> $y_t^{k_1}=\alpha+\beta(L)\,x_t^{k_1}+e_t$ where $x_t^{k_1}$ is a predictor aggregated to the target frequency; the missing months of the current quarter are forecast with ARMA/VAR models. OLS estimation; forecast combination across many bridge equations; bottom-up (aggregate component nowcasts through national-accounts identities). Giannone-Reichlin-Small's approach is "bridging with factors". ^def-bridge

> [!definition] MIDAS regression
> $y_t^{k_1}=\alpha+\beta\,\Gamma(L,\theta)\,y_{t-h_n,n}+e_t$ with a parsimonious lag polynomial such as the exponential Almon, $\Gamma(L,\theta)=\sum_{m}\gamma(m,\theta)L^m$, $\gamma(m,\theta)=\exp(\theta_1m+\theta_2m^2)/\sum_j\exp(\theta_1j+\theta_2j^2)$ (Ghysels et al. 2003). Ragged edge is handled by re-aligning each series to its latest observation (a different set of coefficients per release pattern). ^def-midas

**Data (Table 1).** 24 series, only GDP quarterly: industrial production, labour market, surveys (e.g. Philadelphia Fed), prices (CPI), housing, trade, consumption; two weekly (initial claims, Bloomberg consumer comfort); daily financial (S&P 500, interest rates, effective exchange rate, oil). Publication delays recorded for January 2011; surveys appear earlier than hard data (negative delays = released before the reference month ends). Only headline series are used; disaggregates add little precision and do not hurt, so variable pre-selection is unnecessary.

**Design.** Benchmark: one-factor daily model with temporally aggregated loadings (EM estimation); alternatives: monthly factor model without weekly/daily data; a small five-hard-indicator monthly factor model (NBER BCDC set: GDP, IP, real disposable income, retail sales, employment); bridge equations (23 separate regressions, AR forecasts for missing months, BIC lags); Survey of Professional Forecasters. Evaluated by RMSFE over 1995-2010, four times per month for four months.

> [!theorem] Findings
> - Accuracy improves as information on the quarter accumulates; the benchmark beats bridge equations and is competitive with the SPF.
> - Surveys improve accuracy at all points; the hard-data-only model is worse.
> - Daily and weekly variables do not significantly improve the GDP nowcast (low-frequency financial components relate to activity, daily fluctuations carry wrong signals). By-product: a daily index of economic activity that explains most of GDP dynamics but little of daily stock-price movement. ^thm-banbura-findings

**Limitations / extensions.** Point nowcasts only; density nowcasts (Aastveit et al. 2011; Marcellino et al. 2012); nowcast combination; bottom-up national-accounts coherence; Liebermann (2012) for other releases; Modugno (2013) for inflation.

## Examples

> [!example] Bridge vs joint model on day 20
> Month 2 of the quarter: industrial production for month 1 only. A bridge equation must forecast months 2 and 3 with an AR, ignoring the survey already released; the joint factor model uses the month-2 survey immediately through the shared factor. ^ex-bridge

## Connections
Similarity to Bayesian structural time series with regressors ([[Bayesian Structural Time-Series Model]]); shrinkage for large VARs links to [[Global-Local Shrinkage Priors]].

## See Also
[[Banbura et al 2013 - Now-casting and the Real-Time Data Flow - Overview]]
