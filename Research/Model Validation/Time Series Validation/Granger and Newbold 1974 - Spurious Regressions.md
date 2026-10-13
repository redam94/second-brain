---
title: "Granger and Newbold 1974 - Spurious Regressions"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/spurious-correlation
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "citation only"
citation: "Granger, C. W. J. & Newbold, P. (1974). Spurious regressions in econometrics. Journal of Econometrics, 2(2), 111–120."
date_ingested: 2026-10-13
folder: "Model Validation/Time Series Validation"
doc_type: paper
depends_on:
  - "[[Yule 1926 - Nonsense Correlations Between Time Series]]"
  - "[[Single Marketing Time Series]]"
used_by:
  - "[[Granger 2003 - Nobel Lecture on Cointegration]]"
  - "[[Multivariate Persistence and Cointegration]]"
  - "[[Bergmeir et al 2018 - Cross-Validation for Time Series]]"
aliases:
  - "Granger & Newbold 1974"
  - "Spurious regressions in econometrics"
  - "Spurious regression"
---

# Granger and Newbold 1974 - Spurious Regressions

> [!summary]
> Granger & Newbold showed by Monte Carlo simulation that regressing one independent random walk on another produces "significant" t-statistics and high $R^2$ most of the time, with the only warning sign being strongly autocorrelated residuals (a low Durbin–Watson statistic). Standard regression output on non-stationary time series therefore routinely "finds" relationships that do not exist — a direct threat to any driver analysis of trending weekly KPIs.

## Overview

Granger, C. W. J. & Newbold, P. (1974). *Spurious regressions in econometrics*. **Journal of Econometrics** 2(2), 111–120.

*Citation only*: written from general knowledge; the source review cites but does not quote it (Granger's own retrospective is quoted in [[Granger 2003 - Nobel Lecture on Cointegration]]).

**Question.** How reliable are conventional regression significance tests and goodness-of-fit statistics when the variables are integrated (non-stationary) time series?

**Context.** Econometric practice of the time often regressed levels of trending macro series and reported high $R^2$ with significant coefficients, sometimes alongside very low Durbin–Watson statistics. The paper revisited [[Yule 1926 - Nonsense Correlations Between Time Series]] in the regression setting.

## Main Content

### Simulation design

Generate two **independent** random walks
$$y_t = y_{t-1} + u_t, \qquad x_t = x_{t-1} + v_t, \qquad u_t, v_t \overset{iid}{\sim} N(0,1),$$
and estimate $y_t = \beta_0 + \beta_1 x_t + e_t$ by OLS. The true $\beta_1 = 0$.

### Findings

- With samples of about 50 observations, the nominal 5% t-test on $\beta_1$ rejected the true null roughly **three-quarters** of the time; the rejection rate rose further as more independent random-walk regressors were added.
- $R^2$ was frequently high, while the Durbin–Watson statistic was very low, reflecting highly autocorrelated residuals.
- Rule of thumb: when $R^2 > DW$, suspect a spurious regression.
- Recommendation: model differenced series (or otherwise account for the residual autocorrelation) and treat level regressions of integrated series with great suspicion.

> [!definition] Spurious regression
> A regression between integrated (unit-root) series that are not cointegrated, in which the error term is itself non-stationary. OLS then yields apparently significant coefficients and high $R^2$ even though the series are unrelated.

^def-spurious-regression

### Asymptotic theory (Phillips 1986)

Phillips later proved the simulation results analytically: in the spurious regression of independent $I(1)$ series, $\hat\beta_1$ does not converge to 0 but to a non-degenerate random variable; the **t-statistic diverges at rate $\sqrt{T}$**, so the rejection rate tends to 1 as the sample grows; $R^2$ has a non-degenerate limiting distribution; and $DW \to 0$. More data makes the problem worse, not better.

## Key Passages

No verbatim passage from Granger & Newbold (1974) is recorded in the source. The related quote from Granger's Nobel lecture:

> "the standard regression computer package would very often appear to "find" a relationship whereas in fact there was none." — Granger (2003), Nobel Lecture, p. 363

## Implications for Model Validation

- **Significance and in-sample fit are uninformative on trending levels.** Coefficient p-values, $R^2$ and feature-importance scores from models of levels of non-stationary series can be entirely spurious.
- **Longer history does not fix it.** The divergence of the t-statistic means that more weeks of data increase false confidence.
- **Diagnostics to require:** unit-root tests on target and drivers, residual autocorrelation (DW, Ljung–Box), and comparison with a differenced or error-correction specification.
- **Tree models are not immune.** Non-linear learners trained on levels can split on any input that shares the trend; out-of-time evaluation and placebo random-walk features expose this.
- **Out-of-sample forecasting helps but must be done in time order** ([[Bergmeir et al 2018 - Cross-Validation for Time Series]]); randomly shuffled folds leak trend information.

## Connections

- Origin of the problem: [[Yule 1926 - Nonsense Correlations Between Time Series]].
- Resolution for genuinely related $I(1)$ series: cointegration, [[Granger 2003 - Nobel Lecture on Cointegration]] and [[Multivariate Persistence and Cointegration]].
- Unit roots in single marketing series: [[Single Marketing Time Series]]; dynamic causality tests: [[Empirical Causal Ordering]].
- Same "plausible but wrong" pattern in observational ad measurement: [[Blake et al 2015 - Paid Search Effectiveness Field Experiment]].

## See Also

- [[Yule 1926 - Nonsense Correlations Between Time Series]] — the correlation version
- [[Granger 2003 - Nobel Lecture on Cointegration]] — Granger's retrospective and cointegration
- [[Multivariate Persistence and Cointegration]] — vault treatment of cointegration and error correction
- [[Single Marketing Time Series]] — unit-root testing
- [[Bergmeir et al 2018 - Cross-Validation for Time Series]] — valid out-of-sample evaluation
