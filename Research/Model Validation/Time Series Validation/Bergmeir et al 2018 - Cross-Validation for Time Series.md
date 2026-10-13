---
title: "Bergmeir et al 2018 - Cross-Validation for Time Series"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/cross-validation
  - type/theorem
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "Computational Statistics & Data Analysis 120, 70–83 (2018); author preprint 23 July 2017, quoted p. 2"
citation: "Bergmeir, C., Hyndman, R. J. & Koo, B. (2018). A note on the validity of cross-validation for evaluating autoregressive time series prediction. Computational Statistics & Data Analysis, 120, 70–83."
date_ingested: 2026-10-13
folder: "Model Validation/Time Series Validation"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Statistical Modeling The Two Cultures]]"
  - "[[Granger and Newbold 1974 - Spurious Regressions]]"
  - "[[Single Marketing Time Series]]"
used_by:
  - "[[Chan and Perry 2017 - Challenges in Media Mix Modeling]]"
  - "[[Riley et al 2020 - Sample Size for Prediction Models]]"
  - "[[MMM Model Selection and Application]]"
aliases:
  - "Bergmeir 2018"
  - "Bergmeir, Hyndman & Koo 2018"
  - "Validity of cross-validation for autoregressive time series"
  - "Time series cross-validation"
---

# Bergmeir et al 2018 - Cross-Validation for Time Series

> [!summary]
> Bergmeir, Hyndman & Koo show that ordinary K-fold cross-validation *is* valid for time series — but only for purely autoregressive models whose errors are serially uncorrelated, i.e. models that already capture all the serial dependence. Outside that case (correlated residuals, exogenous regressors, trends, non-stationarity), randomly shuffled folds can mislead and practitioners should use time-ordered out-of-sample evaluation or check residual autocorrelation first.

## Overview

Bergmeir, C., Hyndman, R. J. & Koo, B. (2018). *A note on the validity of cross-validation for evaluating autoregressive time series prediction*. **Computational Statistics & Data Analysis** 120, 70–83 (author preprint 23 July 2017).

**Question.** Time-series forecasters usually avoid standard cross-validation because observations are dependent and random folds put "future" data in the training set. Is that caution always necessary?

**Context.** Out-of-sample (OOS) evaluation — holding out the end of the series — uses data inefficiently, especially for short series. Machine-learning forecasters (neural nets, trees on lagged inputs) commonly use K-fold CV anyway. The paper clarifies when that is justified.

## Main Content

### Setting

A purely autoregressive model of order $p$ is fitted as a regression on the lag embedding: each row is $(y_t;\, y_{t-1},\dots,y_{t-p})$, so the series becomes a set of input–output pairs
$$y_t = g(y_{t-1},\dots,y_{t-p}) + \varepsilon_t .$$
K-fold CV randomly assigns *rows* to folds.

> [!theorem] Validity of K-fold CV for autoregressive models
> If the fitted model is a purely autoregressive model (linear or non-linear in the lags) that is **not underfitted**, so that the errors $\varepsilon_t$ are **serially uncorrelated**, then the rows of the embedded data behave like exchangeable regression observations with uncorrelated errors and standard K-fold cross-validation yields valid (asymptotically unbiased) estimates of prediction error. If the model is misspecified so that the errors are serially correlated, training and test rows are dependent through the errors and K-fold CV underestimates prediction error.

^thm-bergmeir-cv-validity

The practical corollary: **test the CV residuals for serial correlation** (e.g. Ljung–Box); if none remains, K-fold CV is fine; if it does, the model is underfitted (add lags) and the CV estimate is unreliable.

### Monte Carlo results

Comparing 5-fold CV, leave-one-out CV, "non-dependent" CV (removing rows within $p$ lags of each test row) and OOS evaluation on simulated AR processes fitted with linear and non-linear (neural network) autoregressions, the authors find that for well-specified models standard 5-fold CV estimates the true prediction error better than OOS evaluation, because it uses all the data; when models are underfitted, all CV variants become biased.

### Scope

The positive result is **narrow**: it does not cover models with exogenous regressors, trends, structural breaks, or non-stationary series, nor importance measures or model selection performed outside the CV loop. In those settings time-ordered evaluation (rolling-origin / expanding-window backtests) remains the safe default.

## Key Passages

> "Practitioners usually resort to out-of-sample (OOS) evaluation instead, where a section from the end of the series is withheld for evaluation." — Bergmeir, Hyndman & Koo (2018), p. 2

The source review adds: Bergmeir et al.'s positive result (standard K-fold CV is valid) covers only purely autoregressive models with uncorrelated errors.

Related passage from the same theme (Chan & Perry):

> "The scope for meaningful cross-validation of an MMM is typically limited due to small datasets and the time-series nature of the data which doesn't allow for simple random sampling to produce a validation set." — Chan & Perry (2017), fn. 2, pp. 10–11

## Implications for Model Validation

- **Do not cite this paper to justify random K-fold CV for driver models.** Models of weekly KPIs with media, price, macro and seasonal regressors are not pure autoregressions; random folds leak trends and seasonality across folds and overstate accuracy.
- **Default to time-ordered backtests.** Use rolling-origin or expanding-window evaluation, with a gap between training and test periods when lagged/adstocked features span several weeks.
- **Check residual autocorrelation.** Whatever the scheme, serially correlated residuals signal an underfitted (or spurious, see [[Granger and Newbold 1974 - Spurious Regressions]]) model and an optimistic error estimate.
- **Keep the whole pipeline inside the loop.** Feature selection, hyperparameter tuning and best-of-many model choice must be repeated within each training window; otherwise the CV score inherits the selection optimism described in [[Simmons et al 2011 - False-Positive Psychology]].
- **Short series limit everything.** With ~100–156 weekly points ([[Riley et al 2020 - Sample Size for Prediction Models]]), OOS test windows are short and noisy; report uncertainty of backtest metrics and compare against naive/seasonal-naive baselines.

## Connections

- Implements Breiman's held-out-accuracy criterion for dependent data: [[Breiman 2001 - Statistical Modeling The Two Cultures]].
- Residual autocorrelation as the diagnostic links to [[Yule 1926 - Nonsense Correlations Between Time Series]] and [[Granger and Newbold 1974 - Spurious Regressions]].
- Marketing-model context: [[Chan and Perry 2017 - Challenges in Media Mix Modeling]], [[MMM Model Selection and Application]].
- Bayesian predictive checks and comparison: [[Model Checking]], [[Model Comparison]].

## See Also

- [[Breiman 2001 - Statistical Modeling The Two Cultures]] — predictive accuracy on test sets
- [[Granger and Newbold 1974 - Spurious Regressions]] — why autocorrelated residuals matter
- [[Chan and Perry 2017 - Challenges in Media Mix Modeling]] — limits of CV for MMM
- [[Riley et al 2020 - Sample Size for Prediction Models]] — optimism of apparent performance
- [[Single Marketing Time Series]] — AR models and stationarity for marketing series
- [[Bayesian Structural Time-Series Model]] — a time-series model typically validated by forecasting holdouts
