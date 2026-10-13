---
title: "Granger 2003 - Nobel Lecture on Cointegration"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/cointegration
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "Nobel Lecture, 8 Dec 2003, pp. 360–366; quoted p. 363"
citation: "Granger, C. W. J. (2003). Time series analysis, cointegration, and applications. Nobel Lecture, December 8, 2003. Stockholm: The Nobel Foundation, pp. 360–366."
date_ingested: 2026-10-13
folder: "Model Validation/Time Series Validation"
doc_type: paper
depends_on:
  - "[[Granger and Newbold 1974 - Spurious Regressions]]"
  - "[[Yule 1926 - Nonsense Correlations Between Time Series]]"
used_by:
  - "[[Multivariate Persistence and Cointegration]]"
  - "[[Bergmeir et al 2018 - Cross-Validation for Time Series]]"
aliases:
  - "Granger 2003"
  - "Granger Nobel Lecture"
  - "Time series analysis, cointegration, and applications"
---

# Granger 2003 - Nobel Lecture on Cointegration

> [!summary]
> In his Nobel lecture Granger recounts how the discovery that standard regression software "finds" relationships between unrelated trending series led, via the spurious-regression work with Newbold, to the concept of cointegration: integrated series can share a genuine long-run equilibrium, and only then is a regression in levels meaningful. For validation of time-series models, it marks the line between level relationships that are real and those that are artefacts of trends.

## Overview

Granger, C. W. J. (2003). *Time series analysis, cointegration, and applications*. Nobel Lecture, Stockholm, 8 December 2003, pp. 360–366. Granger shared the 2003 Sveriges Riksbank Prize in Economic Sciences with Robert Engle; Granger's half recognised methods for analysing economic time series with common trends (cointegration).

**Context.** The lecture is a personal, largely non-technical account of the development of time-series econometrics: the prevalence of integrated (unit-root) series in economics, the spurious-regression problem, the debate (notably with David Hendry) over whether differencing throws away long-run information, and how the cointegration concept reconciles modelling in levels with modelling in differences.

## Main Content

### Integrated series and the spurious-regression problem

A series is **integrated of order $d$**, $I(d)$, if it must be differenced $d$ times to become stationary. Many economic and business series (prices, sales levels, GDP) behave like $I(1)$. Regressing one $I(1)$ series on another unrelated one gives spurious significance ([[Granger and Newbold 1974 - Spurious Regressions]]). Granger recalls that this simulation result is what made the standard regression package look as if it "found" relationships.

### Cointegration

> [!definition] Cointegration (Engle–Granger)
> Two $I(1)$ series $x_t$ and $y_t$ are **cointegrated** if there exists a constant $A$ such that
> $$z_t = y_t - A x_t$$
> is $I(0)$ (stationary). The series then share a common stochastic trend and $y_t = A x_t$ is a long-run equilibrium ("attractor"); $z_t$ measures the deviation from it.

^def-cointegration

> [!theorem] Granger representation theorem (Engle & Granger 1987)
> If $x_t, y_t$ are $I(1)$ and cointegrated, they have an **error-correction** representation in which changes respond to the lagged equilibrium error, e.g.
> $$\Delta y_t = \rho_1 z_{t-1} + \text{lagged } \Delta x_t, \Delta y_t \text{ terms} + \varepsilon_t,$$
> with at least one adjustment coefficient non-zero. Conversely, an error-correction model generates cointegrated series.

^thm-granger-representation

**Consequences.** If series are cointegrated, a regression in levels is meaningful (and its coefficient estimator is super-consistent) and a model purely in differences is misspecified because it omits $z_{t-1}$. If they are not cointegrated, the level regression is spurious and differences are appropriate. Testing for cointegration (e.g. Engle–Granger residual unit-root test, Johansen) decides between the two.

The lecture also touches on applications and extensions (e.g. long-memory and non-linear generalisations) and on Granger's broader view that models should be judged by their forecasting performance.

## Key Passages

> "the standard regression computer package would very often appear to "find" a relationship whereas in fact there was none." — Granger (2003), Nobel Lecture, p. 363

## Implications for Model Validation

- **Test before interpreting level relationships.** A driver model of weekly KPI levels should establish whether target and drivers are $I(1)$ and, if so, whether they are cointegrated; otherwise reported importance may be spurious.
- **Errors should be stationary.** A valid level model has stationary residuals; trending or highly persistent residuals are the classic spurious-regression signature.
- **Short and long run differ.** Error-correction structure separates immediate responses from equilibrium adjustment — useful for distinguishing short-term media effects from long-run baselines.
- **Forecast-based judgment.** Consistent with [[Breiman 2001 - Statistical Modeling The Two Cultures]], genuine relationships should improve out-of-time forecasts relative to a naive or univariate benchmark.

## Connections

- Builds on [[Yule 1926 - Nonsense Correlations Between Time Series]] and [[Granger and Newbold 1974 - Spurious Regressions]].
- Vault treatment of persistence, cointegration and VECMs in marketing: [[Multivariate Persistence and Cointegration]], [[Single Marketing Time Series]].
- Granger causality (temporal precedence) is covered in [[Empirical Causal Ordering]].
- Structural time-series alternative for trending data: [[Bayesian Structural Time-Series Model]].

## See Also

- [[Granger and Newbold 1974 - Spurious Regressions]] — the problem cointegration answers
- [[Multivariate Persistence and Cointegration]] — cointegration and error correction in marketing data
- [[Empirical Causal Ordering]] — Granger causality tests
- [[Bergmeir et al 2018 - Cross-Validation for Time Series]] — evaluating time-series predictors out of sample
- [[Breiman 2001 - Statistical Modeling The Two Cultures]] — predictive accuracy as the yardstick
