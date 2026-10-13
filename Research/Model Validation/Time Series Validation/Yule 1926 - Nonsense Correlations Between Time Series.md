---
title: "Yule 1926 - Nonsense Correlations Between Time Series"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/spurious-correlation
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "citation only"
citation: "Yule, G. U. (1926). Why do we sometimes get nonsense-correlations between time-series? A study in sampling and the nature of time-series. Journal of the Royal Statistical Society, 89(1), 1–63."
date_ingested: 2026-10-13
folder: "Model Validation/Time Series Validation"
doc_type: paper
depends_on:
  - "[[Single Marketing Time Series]]"
used_by:
  - "[[Granger and Newbold 1974 - Spurious Regressions]]"
  - "[[Granger 2003 - Nobel Lecture on Cointegration]]"
  - "[[Bergmeir et al 2018 - Cross-Validation for Time Series]]"
aliases:
  - "Yule 1926"
  - "Nonsense correlations"
  - "Nonsense-correlations between time-series"
---

# Yule 1926 - Nonsense Correlations Between Time Series

> [!summary]
> Yule showed that two causally unrelated time series can display very high sample correlations simply because each is smooth or trending, and that the usual sampling theory for the correlation coefficient — which assumes independent observations — badly understates how often large correlations arise. It is the original statement of the spurious-correlation problem that any model of weekly or monthly business series must guard against.

## Overview

Yule, G. U. (1926). *Why do we sometimes get nonsense-correlations between time-series? A study in sampling and the nature of time-series*. Presidential address, **Journal of the Royal Statistical Society** 89(1), 1–63.

*Citation only*: this note is written from general knowledge of the paper; the source review cites it but quotes no passage.

**Question.** Why do pairs of time series with no plausible causal connection frequently show correlations near $\pm 1$?

**Context.** Yule's motivating example was the strong correlation (about 0.95) between the proportion of Church of England marriages and standardised mortality in England and Wales over 1866–1911 — a "nonsense correlation" since neither plausibly causes the other. He rejected the explanation of a lurking common cause in general and instead located the problem in the *serial dependence* of the series themselves.

## Main Content

- **Sampling argument.** The standard error of $r$ derived for independent pairs does not apply when successive observations are strongly dependent. A short stretch of two smooth series covers only a fraction of a "cycle", so their sample correlation is driven by whether they happen to move in the same or opposite direction over that window.
- **Experimental demonstration.** Using constructed series (sums of random numbers), Yule compared the distribution of $r$ between independent series of different types:
  - independent *random* series → $r$ concentrated around 0;
  - independent series whose *first differences* are random (random walks, "conjunct" series) → $r$ widely dispersed, large values common;
  - independent series whose *second differences* are random → distribution of $r$ U-shaped, piling up near $\pm 1$.
- **Conclusion.** The smoother/more integrated the series, the more likely a large but meaningless correlation. High correlation between levels of trending series is weak evidence of a relationship.

> [!definition] Nonsense (spurious) correlation
> A large sample correlation between two time series that are generated independently, arising because strong serial dependence (trends, unit roots, smooth cycles) reduces the effective number of independent observations far below the nominal sample size.

^def-nonsense-correlation

## Key Passages

No verbatim passage from Yule (1926) is recorded in the source. The source review states: spurious correlation between unrelated autocorrelated series has been known since Yule (1926) and Granger & Newbold (1974).

## Implications for Model Validation

- **Levels of trending KPIs correlate by default.** Weekly sales, traffic, spend and macro indicators often share trends and seasonality; feature importance or correlation computed on levels will credit whichever inputs happen to share the trend.
- **Effective sample size is smaller than the row count.** 156 autocorrelated weekly observations carry much less independent information than 156 i.i.d. rows, compounding small-sample overfitting ([[Riley et al 2020 - Sample Size for Prediction Models]]).
- **Check stationarity and residual autocorrelation.** Difference or detrend where appropriate, test for unit roots, and inspect residual autocorrelation before interpreting coefficients.
- **Use placebo series.** Fitting the model with randomly generated autocorrelated "fake" drivers shows how much importance pure smoothness can earn.

## Connections

- Formalised for regression by [[Granger and Newbold 1974 - Spurious Regressions]]; the constructive resolution is cointegration ([[Granger 2003 - Nobel Lecture on Cointegration]], [[Multivariate Persistence and Cointegration]]).
- Explains why validation folds for time series must respect ordering ([[Bergmeir et al 2018 - Cross-Validation for Time Series]]).
- Background on univariate persistence: [[Single Marketing Time Series]].

## See Also

- [[Granger and Newbold 1974 - Spurious Regressions]] — regression version of the problem
- [[Granger 2003 - Nobel Lecture on Cointegration]] — when level relationships are genuine
- [[Multivariate Persistence and Cointegration]] — vault note on cointegration in marketing
- [[Single Marketing Time Series]] — unit roots and persistence in a single series
- [[Empirical Causal Ordering]] — Granger causality, a dynamic alternative to level correlation
