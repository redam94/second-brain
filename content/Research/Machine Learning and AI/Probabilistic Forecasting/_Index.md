---
title: Probabilistic Forecasting - Index
tags:
  - type/index
  - source/ingested
  - topic/forecasting
  - topic/time-series
  - topic/machine-learning
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Probabilistic Forecasting"
parent: "[[Research/Machine Learning and AI/_Index|Machine Learning and AI]]"
---

# Probabilistic Forecasting - Index

> [!abstract] Routing Summary
> Modern probabilistic / ML forecasting, complementing the vault's classical time-series coverage (ARIMA, transfer functions, VAR/cointegration, state-space/Kalman, BSTS). Anchored by four papers: Gneiting & Raftery (2007) on proper scoring rules; Salinas, Flunkert & Gasthaus (2017) on DeepAR; Ansari et al. (2024) on Chronos; Wickramasuriya, Athanasopoulos & Hyndman (2019) on MinT reconciliation.
>
> - Need the big picture / where to start? → [[Probabilistic Forecasting - Overview]]
> - Need to score a predictive distribution, quantile or interval (CRPS, log score, pinball, interval score)? → [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]
> - Need to train one neural model across thousands of series (counts, cold start, sample paths)? → [[DeepAR and Global Autoregressive Neural Forecasters]]
> - Need a zero-shot pretrained forecaster, or to understand tokenised time series? → [[Time-Series Foundation Models (Chronos)]]
> - Need to decide between per-series models, a pooled model, or a foundation model? → [[Local vs Global Forecasting Models]]
> - Need forecasts that add up across a product/geo hierarchy? → [[Hierarchical Forecast Reconciliation (MinT)]]
> - Need to design a backtest (rolling origin, MASE, WQL, coverage, aggregation)? → [[Forecast Evaluation and Backtesting]]
> - Need the MinT closed form? → [[Hierarchical Forecast Reconciliation (MinT)#^thm-mint|Theorem 1 (MinT)]]
> - Need the CRPS definition / Gaussian closed form? → [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)#^def-crps|CRPS]], [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)#^thm-crps-gaussian|Gaussian CRPS]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Probabilistic forecasting framing | [[Probabilistic Forecasting - Overview]] | overview | Single Marketing Time Series; Linear-Gaussian State-Space Models; BSTS; Model Comparison | Forecast = predictive distribution; maximise sharpness subject to calibration; local / task-specific / pretrained taxonomy; coherence |
| Proper scoring rules | [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] | concept | Overview; Model Comparison; Quantile Regression | $S(Q,Q)\ge S(P,Q)$; proper ⇔ convex $G$ (Thm 1); log score ↔ KL/Bayes factor; CRPS $=\mathbb E\lvert X-x\rvert-\tfrac12\mathbb E\lvert X-X'\rvert$; pinball proper for quantiles; interval score; improper scores mislead |
| DeepAR | [[DeepAR and Global Autoregressive Neural Forecasters]] | method | Overview; Proper Scoring Rules | Autoregressive LSTM → likelihood parameters (Gaussian / neg-binomial); max-likelihood over pooled windows; ancestral sample paths; scale $\nu_i$ + weighted sampling; ≈15% better quantile risk |
| Chronos | [[Time-Series Foundation Models (Chronos)]] | method | DeepAR; Transformers and LLM Foundations - Overview | Mean-scale + 4094-bin quantisation; T5 + cross-entropy; TSMixup + KernelSynth; zero-shot agg. rel. WQL 0.645 / MASE 0.823 vs Seasonal Naive 1.0 |
| Local vs global | [[Local vs Global Forecasting Models]] | concept | DeepAR; Chronos; Hierarchical Models | No-pooling vs complete pooling of parameters; variance reduction, cold start; power-law scale obstacle; task-specific > local, pretrained ≈ task-specific |
| MinT reconciliation | [[Hierarchical Forecast Reconciliation (MinT)]] | method | Overview | $\tilde y=S(S^\top W_h^{-1}S)^{-1}S^\top W_h^{-1}\hat y$ minimises trace of reconciled error covariance s.t. $SPS=S$; never worse than base; MinT(Shrink) best empirically |
| Evaluation and backtesting | [[Forecast Evaluation and Backtesting]] | method | Proper Scoring Rules; Cross Validation Checking | Rolling origin; MASE; WQL / $\rho$-risk ≈ CRPS; coverage curves incl. span sums; geometric mean of relative scores; leakage cautions |

## Notes

- [[Probabilistic Forecasting - Overview]] — CONTAINS: definition of probabilistic forecast (conditioning/prediction range, context/horizon), calibration vs sharpness, local/task-specific/pretrained taxonomy, coherence, cluster routing table, relevance to MMM / geo experiments / counterfactual baselines, end-to-end workflow, sample-based CRPS snippet.
- [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] — CONTAINS: proper/strictly proper definition, Theorem 1 (convex characterisation), entropy & divergence, log/quadratic/spherical scores, impropriety of the linear score, CRPS (integral + kernel form, Gaussian closed form), energy score, Theorem 6 quantile scores and pinball loss, interval score, Bayes-factor/prequential/BIC links, random-fold CV, skill-score warning, Pacific Northwest ensemble and bilinear-process case studies, code.
- [[DeepAR and Global Autoregressive Neural Forecasters]] — CONTAINS: model factorisation and LSTM recursion, Gaussian and negative-binomial heads, training objective and windowing, ancestral sampling algorithm, power-law scale handling ($\nu_i$, weighted sampling), features, missing-data treatment, architecture table, Table 1-2 results and ablations, uncertainty-growth and shuffled-sample calibration findings, lead-time quantile example, GluonTS sketch.
- [[Time-Series Foundation Models (Chronos)]] — CONTAINS: mean scaling, uniform quantisation $q/d$, vocabulary and special tokens, cross-entropy objective (regression via classification), zero-shot forecasting algorithm, TSMixup and KernelSynth algorithms, training setup and cost, Benchmark I/II aggregate scores by model size, fine-tuning result, ablations (size, LLM init, augmentation, context, vocabulary), limitations (range overflow, precision, no covariates, leakage), synthetic diagnostics, tokenisation arithmetic, code.
- [[Local vs Global Forecasting Models]] — CONTAINS: formal definitions of local/global/pretrained, five reasons pooling helps, obstacles (power-law scales, heterogeneity bias, likelihood mismatch, covariates, leakage), evidence table from both papers, pooling analogy with hierarchical Bayes, geo-panel decision example.
- [[Hierarchical Forecast Reconciliation (MinT)]] — CONTAINS: summing matrix, $\tilde y=SP\hat y$, bottom-up/top-down as special $P$, unbiasedness $SPS=S$, non-identifiability of the 2011 GLS covariance, Lemma 1, Theorem 1 (both forms), projection interpretation, Pythagorean "never hurts" inequality, five $W_h$ estimators (OLS, WLS$_v$, WLS$_s$, Sample, Shrink), simulation and Australian-tourism results table, hand-worked 3-series example, code.
- [[Forecast Evaluation and Backtesting]] — CONTAINS: prequential justification, fixed-origin vs rolling-origin algorithms (sliding/expanding, refit vs re-condition), leakage and tuning warnings, MASE, pinball/WQL/$\rho$-risk, ND/NRMSE, coverage curves, relative-score geometric-mean aggregation, skill-score caution, checklist table, geo-test placebo backtest example, code.

## External / Cross-Folder Links

- [[Single Marketing Time Series]], [[Transfer Function Model]], [[Multivariate Persistence and Cointegration]] — classical (local) time-series models in Market Response Models.
- [[Linear-Gaussian State-Space Models]], [[The Kalman Filter]], [[Bayesian Structural Time-Series Model]], [[Local Linear Trend and Seasonality]], [[Counterfactual Impact Estimation]] — Bayesian state-space forecasting and counterfactuals.
- [[Hilbert Space Gaussian Processes]], [[Gaussian Process Regression]], [[Model Building - Time-Series Decomposition for Birthdays]] — GP kernels for time series (KernelSynth connection).
- [[Cross Validation Checking]], [[Model Comparison]], [[Overfitting and Information Criteria]], [[Posterior Predictive Checking]] — predictive model assessment.
- [[Hierarchical Models]], [[Empirical Bayes Interpretation of Shrinkage]] — pooling and shrinkage.
- [[Quantile Regression]] — pinball loss as an estimator.
- [[Optimal Marketing Decisions and Forecasting]], [[Bayesian Media Mix Modeling - Overview]], [[Geo-Experiment Methodology - Overview]], [[Time-Based Regression Estimator for Geo Experiments]] — applied marketing context.
- [[Transformers and LLM Foundations - Overview]], [[Conformal Prediction - Overview]] — sibling clusters in Machine Learning and AI.

## Sources

- Gneiting Raftery 2007 - Strictly Proper Scoring Rules Prediction and Estimation — Gneiting, T. & Raftery, A. E. (2007), "Strictly Proper Scoring Rules, Prediction, and Estimation," *Journal of the American Statistical Association* 102(477), 359-378.
- Salinas 2017 - DeepAR Probabilistic Forecasting with Autoregressive Recurrent Networks — Salinas, D., Flunkert, V. & Gasthaus, J. (2017), "DeepAR: Probabilistic Forecasting with Autoregressive Recurrent Networks," arXiv:1704.04110 (v3, 2019; later *International Journal of Forecasting* 2020 with Januschowski).
- Ansari 2024 - Chronos Learning the Language of Time Series — Ansari, A. F. et al. (2024), "Chronos: Learning the Language of Time Series," *Transactions on Machine Learning Research*, arXiv:2403.07815.
- Wickramasuriya 2019 - Optimal Forecast Reconciliation MinT — Wickramasuriya, S. L., Athanasopoulos, G. & Hyndman, R. J. (2019), "Optimal Forecast Reconciliation for Hierarchical and Grouped Time Series Through Trace Minimization," *JASA* 114(526), 804-819 (Monash working paper 22/17 version).
