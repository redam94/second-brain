---
title: Probabilistic Forecasting - Overview
tags:
  - source/ingested
  - topic/forecasting
  - topic/time-series
  - topic/machine-learning
  - type/overview
  - doc/paper
source:
  - "[[raw/Gneiting Raftery 2007 - Strictly Proper Scoring Rules Prediction and Estimation.pdf]]"
  - "[[raw/Salinas 2017 - DeepAR Probabilistic Forecasting with Autoregressive Recurrent Networks.pdf]]"
  - "[[raw/Ansari 2024 - Chronos Learning the Language of Time Series.pdf]]"
  - "[[raw/Wickramasuriya 2019 - Optimal Forecast Reconciliation MinT.pdf]]"
source_location: "Gneiting & Raftery 2007 Sec. 1 (pp. 359-360); Salinas et al. 2017 Secs. 1-3 (pp. 1-5); Ansari et al. 2024 Secs. 1-2, 5.3 (pp. 1-5, 9-10); Wickramasuriya et al. 2019 Sec. 1 (pp. 2-4)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Probabilistic Forecasting"
doc_type: paper
depends_on:
  - "[[Single Marketing Time Series]]"
  - "[[Linear-Gaussian State-Space Models]]"
  - "[[Bayesian Structural Time-Series Model]]"
  - "[[Model Comparison]]"
used_by:
  - "[[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]"
  - "[[DeepAR and Global Autoregressive Neural Forecasters]]"
  - "[[Time-Series Foundation Models (Chronos)]]"
  - "[[Hierarchical Forecast Reconciliation (MinT)]]"
  - "[[Local vs Global Forecasting Models]]"
  - "[[Forecast Evaluation and Backtesting]]"
aliases:
  - Probabilistic Forecasting
  - Modern ML Forecasting
  - Distributional Forecasting
  - Predictive Distribution Forecasting
---

# Probabilistic Forecasting - Overview

> [!summary]
> **Probabilistic forecasting** replaces the point forecast $\hat y_{T+h}$ with a full predictive distribution $F_{T+h}(\cdot \mid y_{1:T})$ over future values. Four papers anchor this cluster. **Gneiting & Raftery (2007)** supply the evaluation theory: a forecast distribution should be judged by a [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)|strictly proper scoring rule]] (log score, CRPS, pinball/interval score), which rewards honesty and measures calibration and sharpness jointly. **Salinas et al. (2017)** introduce [[DeepAR and Global Autoregressive Neural Forecasters|DeepAR]], the prototype *global* model: one autoregressive RNN trained by maximum likelihood across thousands of related series. **Ansari et al. (2024)** push the global idea to its limit with [[Time-Series Foundation Models (Chronos)|Chronos]], a pretrained language-model-style forecaster used zero-shot. **Wickramasuriya, Athanasopoulos & Hyndman (2019)** solve a structural problem that arises at scale: making forecasts at every level of a hierarchy add up, optimally, via [[Hierarchical Forecast Reconciliation (MinT)|MinT reconciliation]].

## Overview

The vault's existing time-series notes are *classical and local*: a model is specified and fitted per series. [[Single Marketing Time Series|ARIMA-type models]], the [[Transfer Function Model]], [[Multivariate Persistence and Cointegration|VAR/cointegration]], [[Linear-Gaussian State-Space Models|state-space models]] filtered by [[The Kalman Filter]], and the [[Bayesian Structural Time-Series Model|BSTS]] with its [[Local Linear Trend and Seasonality|local linear trend and seasonal components]] all belong to the tradition Salinas et al. (Sec. 1, p. 1) describe: "model parameters for each given time series are independently estimated from past observations," with the structure "manually selected to account for different factors, such as autocorrelation structure, trend, seasonality."

Modern ML forecasting changes three things:

1. **The target is a distribution, judged by a proper score.** Gneiting & Raftery (Sec. 1, p. 359) state that "forecasts should be probabilistic in nature, taking the form of probability distributions over future quantities or events," and that the goal is to "maximize the sharpness of the predictive distributions subject to calibration." Scoring rules assess both at once.
2. **The model is global.** Instead of $N$ models for $N$ series, one model with shared parameters $\Theta$ is fitted to all series jointly ([[Local vs Global Forecasting Models]]). Data from related series "allows fitting more complex (and hence potentially more accurate) models without overfitting" (Salinas et al., p. 1) and enables forecasts for cold-start series with little or no history.
3. **The model may be pretrained and never fitted to your data at all.** Chronos categorises forecasters (Sec. 5.3, p. 10) as *local* (parameters per series), *task-specific* (trained per dataset, e.g. DeepAR), and *pretrained* (a single model across all tasks, applied zero-shot).

A fourth ingredient is orthogonal to model class: large collections of series usually carry **aggregation constraints** (SKU → category → total; geo → region → nation). Independently produced forecasts almost never add up; *reconciliation* adjusts them to be **coherent**, and MinT shows this can only help in a precise sense.

## Main Content

> [!definition] Probabilistic forecast ^def-probabilistic-forecast
> Given history $y_{1:T}$ (and covariates $x_{1:T+H}$ known into the future), a probabilistic forecast is a predictive distribution for the future path,
>
> $$
> P\left(y_{T+1:T+H} \mid y_{1:T},\, x_{1:T+H}\right),
> $$
>
> represented as a parametric density, a set of quantiles, or Monte Carlo sample paths. DeepAR (Sec. 3, p. 3) calls $[1, t_0-1]$ the **conditioning range** and $[t_0, T]$ the **prediction range**; Chronos (Sec. 3.1) calls them the **context** ($C$ steps) and **horizon** ($H$ steps).

> [!definition] Calibration and sharpness ^def-calibration-sharpness
> **Calibration** is "the statistical consistency between the distributional forecasts and the observations"; **sharpness** is "the concentration of the predictive distributions and is a property of the forecasts only" (Gneiting & Raftery, Sec. 1, p. 359). The forecaster's goal is maximal sharpness subject to calibration. A climatological (unconditional) forecast is calibrated by construction but not sharp.

> [!definition] Local, task-specific (global), and pretrained forecasters ^def-model-taxonomy
> - **Local**: parameters estimated separately for each series (ARIMA, ETS, Theta, BSTS).
> - **Global / task-specific**: one parameter vector $\Theta$ shared across all series of one dataset, learned from pooled training windows (DeepAR, TFT, N-BEATS, PatchTST).
> - **Pretrained / foundation**: one model trained once on a large multi-domain corpus and applied to unseen datasets without gradient updates (Chronos, Lag-Llama, Moirai).
>
> Source: Ansari et al. 2024, Sec. 5.3, p. 10.

> [!definition] Coherence ^def-coherence
> For a collection of $m$ series with $n$ bottom-level series $b_t$ and summing matrix $S \in \mathbb{R}^{m\times n}$ such that $y_t = S b_t$, a forecast vector $\tilde y$ is **coherent** if it lies in the column space of $S$ — aggregates equal the sum of their children (Wickramasuriya et al., Sec. 2.1).

### How the pieces fit

| Question | Note | Key result |
|---|---|---|
| How do I *score* a predictive distribution? | [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] | $S(Q,Q)\ge S(P,Q)$; log score ↔ KL; CRPS generalises MAE; pinball loss is proper for quantiles |
| How do I train one network on many series? | [[DeepAR and Global Autoregressive Neural Forecasters]] | Autoregressive LSTM emits likelihood parameters; max-likelihood training; ancestral sampling gives joint sample paths |
| Can I skip training entirely? | [[Time-Series Foundation Models (Chronos)]] | Scale + quantise values into 4096 tokens; T5 + cross-entropy; zero-shot WQL 0.645 vs Seasonal Naive 1.0 |
| When is global better than local? | [[Local vs Global Forecasting Models]] | Pooling trades per-series bias for variance; cold start; scale heterogeneity is the main obstacle |
| How do I make forecasts add up? | [[Hierarchical Forecast Reconciliation (MinT)]] | $\tilde y = S(S^\top W_h^{-1}S)^{-1}S^\top W_h^{-1}\hat y$ is the minimum-trace unbiased reconciliation |
| How do I run the horse race honestly? | [[Forecast Evaluation and Backtesting]] | Rolling-origin evaluation; scaled errors (MASE); weighted quantile loss; geometric-mean aggregation |

### Relevance to marketing measurement and applied work

- **Baselines and counterfactuals.** In [[Counterfactual Impact Estimation]] and geo experiments (e.g. the [[Time-Based Regression Estimator for Geo Experiments]]), the causal estimate *is* a forecast error: observed minus predicted-without-treatment. The credibility of the effect interval rests on the calibration of the predictive distribution, which is exactly what proper scoring rules and coverage diagnostics measure in a pre-period backtest.
- **MMM validation.** A [[Bayesian Media Mix Modeling - Overview|Bayesian MMM]] produces a posterior predictive distribution for sales. Holdout CRPS or log score under rolling-origin evaluation is a more honest [[Model Comparison|model comparison]] than in-sample $R^2$, and it is the time-series analogue of the LOO machinery in [[Cross Validation Checking]].
- **Many-geo, many-SKU panels.** Global models are the deep-learning counterpart of partial pooling in [[Hierarchical Models]]: information is shared across geos or products through shared network weights rather than a hyperprior.
- **Planning hierarchies.** Budget and demand plans live on hierarchies (brand → channel → geo). MinT gives coherent numbers at every level with a guarantee of not doing worse than the unreconciled base forecasts.
- **Decision-making.** [[Optimal Marketing Decisions and Forecasting]] treats forecasts as inputs to optimisation; with a predictive distribution the decision can minimise expected loss (the newsvendor/quantile logic behind DeepAR's $\rho$-risk) rather than plug in a point forecast.
- **Caveat.** Global and foundation forecasters are *predictive*, not structural: they do not identify media effects. They complement rather than replace the [[Transfer Function Model]] or BSTS when the goal is attribution.

## Examples

**A minimal end-to-end workflow for a retailer with 5,000 store-SKU weekly series.**

1. *Baselines.* Fit Seasonal Naive and a local ETS/ARIMA per series.
2. *Zero-shot.* Run Chronos on each series' last 512 observations; draw 20 sample paths; read off quantiles $\{0.1,\dots,0.9\}$.
3. *Global.* Train DeepAR with a negative-binomial likelihood and category embeddings on pooled windows.
4. *Backtest.* Rolling-origin evaluation over the last 8 forecast origins; compute MASE (point) and weighted quantile loss (distribution) for each method; aggregate relative to Seasonal Naive by geometric mean.
5. *Reconcile.* Forecast store, category and total series too; apply MinT(Shrink) so the numbers add up.
6. *Calibrate.* Check empirical coverage of 80% intervals; optionally wrap the winner in a conformal layer ([[Conformal Prediction - Overview]]).

```python
# sketch: sample-based CRPS for any forecaster that returns sample paths
import numpy as np
def crps_samples(samples, y):          # samples: (n,), y: scalar
    term1 = np.mean(np.abs(samples - y))
    term2 = 0.5 * np.mean(np.abs(samples[:, None] - samples[None, :]))
    return term1 - term2                # negatively oriented: lower is better
```

## Connections

- [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] — the evaluation theory underlying every comparison in this cluster.
- [[DeepAR and Global Autoregressive Neural Forecasters]] — likelihood-based global RNN; the template for neural probabilistic forecasters.
- [[Time-Series Foundation Models (Chronos)]] — tokenised, pretrained, zero-shot forecasting.
- [[Local vs Global Forecasting Models]] — the statistical trade-off between per-series and pooled models.
- [[Hierarchical Forecast Reconciliation (MinT)]] — coherent forecasts via a GLS-type projection.
- [[Forecast Evaluation and Backtesting]] — rolling origin, MASE, WQL, coverage, aggregation.
- [[Linear-Gaussian State-Space Models]] and [[The Kalman Filter]] — the classical probabilistic forecaster: closed-form Gaussian predictive distributions; DeepAR's benchmark ISSM is an innovations state-space model.
- [[Bayesian Structural Time-Series Model]] — a local Bayesian probabilistic forecaster; the posterior predictive is its forecast distribution.

## See Also

- [[Transformers and LLM Foundations - Overview]] — the T5/GPT architectures Chronos reuses unchanged.
- [[Conformal Prediction - Overview]] — distribution-free calibration of prediction intervals; Chronos (Sec. 6.1) suggests conformal calibration of zero-shot forecasts.
- [[Quantile Regression]] — the pinball loss as an estimation criterion.
- [[Hilbert Space Gaussian Processes]] and [[Model Building - Time-Series Decomposition for Birthdays]] — additive GP decomposition of a time series; the same kernel algebra powers Chronos's KernelSynth generator.
- [[Overfitting and Information Criteria]] — out-of-sample log score as the target of WAIC/LOO.
