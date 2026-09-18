---
title: Forecast Evaluation and Backtesting
tags:
  - source/ingested
  - topic/forecasting
  - topic/time-series
  - topic/model-evaluation
  - topic/machine-learning
  - type/method
  - doc/paper
source:
  - "[[raw/Ansari 2024 - Chronos Learning the Language of Time Series.pdf]]"
  - "[[raw/Salinas 2017 - DeepAR Probabilistic Forecasting with Autoregressive Recurrent Networks.pdf]]"
  - "[[raw/Wickramasuriya 2019 - Optimal Forecast Reconciliation MinT.pdf]]"
  - "[[raw/Gneiting Raftery 2007 - Strictly Proper Scoring Rules Prediction and Estimation.pdf]]"
source_location: "Ansari et al. 2024 Secs. 5.1, 5.4 (pp. 8-10), App. D (pp. 34-35); Salinas et al. 2017 Sec. 4 (pp. 6-8), Supplement 'Error metrics' and 'Experiment details' (pp. 9-10); Wickramasuriya et al. 2019 Sec. 3 (pp. 12-19), Sec. 4 (pp. 19-21); Gneiting & Raftery 2007 Secs. 2.3, 7 (pp. 362, 372-373)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Probabilistic Forecasting"
doc_type: paper
depends_on:
  - "[[Probabilistic Forecasting - Overview]]"
  - "[[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]"
  - "[[Cross Validation Checking]]"
used_by:
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - Four Meanings of Calibration]]"
  - "[[Q - Optimizing Media Spend on CLV with Delayed Feedback]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - Backtesting
  - Rolling-Origin Evaluation
  - Time Series Cross-Validation
  - MASE
  - Mean Absolute Scaled Error
  - Weighted Quantile Loss
  - WQL
  - rho-risk
  - Forecast Accuracy Metrics
---

# Forecast Evaluation and Backtesting

> [!summary]
> Evaluating forecasters needs three design choices, each illustrated by the evaluation sections of the cluster's papers. **(1) The split**: data must be divided *in time* — a single held-out tail (Chronos: last $H$ points), or better a **rolling origin** (MinT: 96-month window rolled forward monthly; DeepAR: rolling windows without retraining). **(2) The metric**: a **scale-free point metric** — MASE, the MAE divided by the in-sample seasonal-naive MAE — and a **proper probabilistic metric** — the pinball loss aggregated as $\rho$-risk (DeepAR) or weighted quantile loss, WQL (Chronos), a discrete approximation to CRPS — plus **coverage/calibration** curves. **(3) The aggregation**: across series, horizons and datasets — normalise by a baseline and combine datasets by **geometric mean**. Skipping any of these (random K-fold splits, scale-dependent averages, improper scores, arithmetic means of ratios) gives misleading rankings.

## Overview

Ordinary cross-validation assumes exchangeable observations; [[Cross Validation Checking|LOO-CV]] leaves out one point and conditions on all the others, *including future ones*. For forecasting, that leaks information: the quantity of interest is $p(y_{T+h}\mid y_{1:T})$, so the evaluation must only ever condition on the past. Gneiting & Raftery (Sec. 7.1) give the theoretical anchor: for ordered data the log marginal likelihood factorises **prequentially**,

$$
\log P(X\mid H_k)=\sum_{t=1}^{n}\log P(X_t\mid X^{t-1},H_k),
$$

a sum of one-step-ahead out-of-sample log scores. A rolling-origin backtest is this sum with (a) any horizon $h$, (b) any [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)|proper score]] in place of the log score, and (c) a burn-in so the first forecasts have enough history.

## Main Content

### 1. Splitting in time

> [!definition] Fixed-origin holdout ^def-fixed-origin
> Hold out the last $H$ observations of every series; fit on the rest; forecast once. Chronos: "we used the last $H\in\mathbb N^+$ observations of each time series as a held-out test set" with task-specific $H$ (Sec. 5.1). DeepAR: `parts` trains on the first 42 months and tests on the remaining 8. Cheap, but one origin per series — high variance and sensitive to what happened in that particular window; acceptable when there are thousands of series to average over.

> [!algorithm] Rolling-origin (rolling-window) evaluation ^alg-rolling-origin
> 1. Choose the first origin $T_0$ (minimum training length), horizon $H$, step $\Delta$.
> 2. For origins $T=T_0,T_0+\Delta,\dots$: fit (or just condition) on data up to $T$; forecast $T+1,\dots,T+H$; store forecasts by horizon $h$.
> 3. Score each $(T,h)$ pair; average within horizon, then across series.
>
> Variants: **sliding window** (fixed training length — MinT uses the last 96 months each time) vs **expanding window** (all data up to $T$); **refit every origin** (MinT refits ARIMA/ETS at each origin) vs **fit once, re-condition** (DeepAR: "we do not retrain our model for each window, but use a single model trained on the data before the first prediction window").

MinT's tourism study (Sec. 4) is the template: 555 monthly series, 1- to 12-step forecasts, origin rolled one month at a time through November 2016, giving "132 1-step-ahead, 131 2-step-ahead, down to 121 12-step-ahead forecasts for each of the 555 series," reported **by horizon** ($h=1,2,3,6,12$ and averages 1-6, 1-12) and **by aggregation level**. Its simulations (Sec. 3) add two useful habits: repeat the whole experiment (200-1,000 replications), and deliberately evaluate under **misspecification** (ETS fitted to ARIMA-generated data) "to emulate what happens in practice."

> [!warning] Leakage and tuning
> - **Hyper-parameters** must be tuned inside the training period. DeepAR splits the pre-forecast data 90/10 and picks the configuration with the best validation negative log-likelihood, and candidly notes the limitation: "a better procedure would be to fit parameters and evaluate negative log-likelihood not only on different windows but also on non-overlapping time intervals."
> - **Global models** see many series: a test window of series $i$ must not overlap in calendar time with training windows of series $j$ if cross-series shocks exist. Split on the *time axis*, not the series axis.
> - **Pretrained models**: a benchmark dataset may be in the pretraining corpus. Chronos separates in-domain from zero-shot benchmarks and notes (footnote 5) that strictly the zero-shot series should *start after* the pretraining data ends.

### 2. Metrics

> [!definition] MASE — mean absolute scaled error (Chronos App. D; Hyndman & Koehler 2006) ^def-mase
> With context length $C$, horizon $H$ and seasonal period $S$,
>
> $$
> \operatorname{MASE}(\hat x_i,x_i)=\frac{C-S}{H}\,\frac{\sum_{t=C+1}^{C+H}|\hat x_{i,t}-x_{i,t}|}{\sum_{t=1}^{C-S}|x_{i,t}-x_{i,t+S}|},
> $$
>
> i.e. out-of-sample MAE divided by the in-sample MAE of the seasonal-naive forecast. It is **scale-free** ("the denominator scales proportionally to $x_i$"), so it can be averaged across series; $\operatorname{MASE}<1$ means better than in-sample seasonal naive. Probabilistic forecasters are scored at their **median**, the optimal point forecast under absolute error.

> [!definition] Quantile loss, $\rho$-risk and WQL ^def-wql
> For level $\alpha$, predicted quantile $q$ and outcome $x$ the pinball loss is
>
> $$
> \operatorname{QL}_\alpha(q,x)=\begin{cases}\alpha(x-q), & x>q\\(1-\alpha)(q-x), & \text{otherwise.}\end{cases}
> $$
>
> **Chronos (App. D)** aggregates over series $i$ and time steps $t$, normalising by total absolute actuals, then averages over $K=9$ levels $\{0.1,\dots,0.9\}$:
>
> $$
> \operatorname{WQL}_\alpha=\frac{2\sum_{i,t}\operatorname{QL}_\alpha\bigl(q^{(\alpha)}_{i,t},x_{i,t}\bigr)}{\sum_{i,t}|x_{i,t}|},\qquad \operatorname{WQL}=\frac1K\sum_{j=1}^{K}\operatorname{WQL}_{\alpha_j}.
> $$
>
> **DeepAR (Supplement)** applies the same doubled pinball loss to the *sum over a span*: $Z_i(L,S)=\sum_{t=t_0+L}^{t_0+L+S}z_{i,t}$, with $\hat Z_i^\rho$ obtained by summing each sample path over the span and taking the empirical $\rho$-quantile; the **$\rho$-risk** is $\sum_iL_\rho(Z_i,\hat Z_i^\rho)/\sum_iZ_i$.
>
> WQL "approximates (a weighted average of) the continuous ranked probability score"; many papers use the names interchangeably. Unlike MASE it is **scale-dependent**: large series dominate.

Other metrics in the papers: **ND** $=\sum|z-\hat z|/\sum|z|$ and **NRMSE** (RMSE over mean absolute actual) for DeepAR's point accuracy; **RMSE** by level and horizon as % change relative to base forecasts for MinT; the **interval score** and **CRPS** of Gneiting & Raftery for intervals and full distributions.

> [!definition] Coverage / calibration curve (DeepAR Sec. 4.2) ^def-coverage
> $\operatorname{Coverage}(p)$ is the fraction of series (or series-time pairs) whose true value lies below the predicted $p$-th percentile. Perfect calibration gives $\operatorname{Coverage}(p)=p$, the diagonal. It should be checked for **multi-step aggregates** as well as marginals: DeepAR's shuffled-sample experiment shows marginals can be perfectly calibrated while 9-step sums are not.

Calibration curves diagnose *what* is wrong (over- or under-dispersion); proper scores rank forecasters. Report both — Gneiting & Raftery's bilinear-process example shows three intervals with ≈95% coverage but very different quality.

### 3. Aggregation

> [!algorithm] Relative scores and geometric mean (Chronos Sec. 5.4) ^alg-geomean
> 1. For each dataset $d$ and model $m$, compute the metric $s_{m,d}$.
> 2. Divide by a baseline's score: $r_{m,d}=s_{m,d}/s_{\text{SeasonalNaive},d}$.
> 3. Aggregate with the **geometric mean**: $\bar r_m=\bigl(\prod_dr_{m,d}\bigr)^{1/D}$.
> 4. Models that fail or time out on a dataset get $r=1$. All tasks are weighted equally.
>
> Rationale (Fleming & Wallace 1986): the arithmetic mean of normalised scores "can yield misleading conclusions," while the geometric mean is the only meaningful aggregate of ratios and its **model ordering is invariant to the choice of baseline**. Average rank is reported as a robustness check.

DeepAR likewise normalises each risk by the "strongest previously published method." Gneiting & Raftery add two cautions (Sec. 2.3): scores are "directly comparable [only] if they refer to exactly the same set of forecast situations," and ratio-type **skill scores** $(S^{\text{fcst}}-S^{\text{ref}})/(S^{\text{opt}}-S^{\text{ref}})$ are generally *improper* even when the underlying score is proper — fine for reporting, not as a training or selection objective on small samples.

### Checklist

| Step | Do | Avoid |
|---|---|---|
| Split | time-ordered; multiple origins; burn-in | shuffled K-fold; tuning on the test tail |
| Baselines | Naive, Seasonal Naive, a local ETS/ARIMA | comparing only among deep models |
| Point metric | MASE (or RMSSE), by horizon | MAPE with zeros; raw MAE averaged across scales |
| Distribution metric | WQL/CRPS, log score, interval score | coverage alone; width alone; improper scores |
| Calibration | coverage curve / PIT, including span sums | checking only one nominal level |
| Aggregation | relative to baseline, geometric mean, ranks | arithmetic mean of ratios |
| Uncertainty | replicate (seeds, origins); report spread | single-run league tables |

## Examples

**Backtesting a counterfactual forecaster for a geo test.** Before trusting a [[Counterfactual Impact Estimation|BSTS counterfactual]] (or a [[Time-Based Regression Estimator for Geo Experiments|TBR]] baseline), run placebo backtests on pre-period data: for each of $K$ pseudo-intervention dates, fit on data before the date, forecast the next $H$ weeks *cumulatively*, and record (i) the MASE of the median path, (ii) the WQL, and (iii) whether the 90% interval for the **cumulative sum** covers the truth. Cumulative-sum coverage near 90% is the evidence that the eventual effect interval is credible; marginal weekly coverage is not sufficient (DeepAR's shuffling result).

```python
import numpy as np
def mase(y_hist, y_true, y_med, S=52):
    scale = np.mean(np.abs(y_hist[S:] - y_hist[:-S]))
    return np.mean(np.abs(y_true - y_med)) / scale
def wql(y_true, q_pred, levels):                 # q_pred: (K, N, H), y_true: (N, H)
    out = []
    for a, q in zip(levels, q_pred):
        ql = np.where(y_true > q, a * (y_true - q), (1 - a) * (q - y_true))
        out.append(2 * ql.sum() / np.abs(y_true).sum())
    return np.mean(out)
def rolling_origins(T, T0, H, step=1):
    return [(slice(0, t), slice(t, t + H)) for t in range(T0, T - H + 1, step)]
def agg_relative(scores, baseline):              # dict model -> array over datasets
    return {m: np.exp(np.mean(np.log(s / scores[baseline]))) for m, s in scores.items()}
```

**Reading Chronos's headline numbers.** "Agg. relative WQL 0.645" (Chronos-T5 Large, Benchmark II) means: on a geometric-mean basis over 27 unseen datasets its weighted quantile loss is 35.5% lower than Seasonal Naive's. Because WQL is scale-dependent *within* a dataset, that per-dataset number is dominated by the larger series; MASE (0.823) weights series equally — the two can and do rank models differently (the vocabulary-size ablation improves MASE while WQL deteriorates).

## Connections

- [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] — why pinball loss/CRPS/log score are legitimate targets and coverage alone is not.
- [[DeepAR and Global Autoregressive Neural Forecasters]] — $\rho$-risk on spans, calibration curves, rolling evaluation without retraining.
- [[Time-Series Foundation Models (Chronos)]] — WQL + MASE, geometric-mean aggregation, in-domain vs zero-shot protocol.
- [[Hierarchical Forecast Reconciliation (MinT)]] — rolling-window design, reporting by level and horizon, evaluation under misspecification.
- [[Cross Validation Checking]] — LOO-CV/LOO-PIT for exchangeable data; rolling origin is the time-ordered counterpart (leave-future-out).
- [[Model Comparison]] and [[Overfitting and Information Criteria]] — expected log predictive density; BIC as an asymptotic prequential log score (Gneiting & Raftery Sec. 7.1).
- [[Local vs Global Forecasting Models]] — the comparison this machinery is meant to adjudicate.

## See Also

- [[Conformal Prediction - Overview]] — uses backtest residuals as calibration scores to repair coverage.
- [[Posterior Predictive Checking]] — in-sample analogue of calibration checks.
- [[Optimal Marketing Decisions and Forecasting]] — forecast accuracy in a decision context; the right $\rho$ in $\rho$-risk is set by the cost ratio of over- vs under-forecasting.
- [[Quantile Regression]] — direct estimation of the quantiles being scored.
- [[Probabilistic Forecasting - Overview]] — cluster entry point.
