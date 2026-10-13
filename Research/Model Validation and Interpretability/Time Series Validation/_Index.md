---
title: "Index: Time Series Validation"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/time-series
parent: "[[../_Index|Model Validation and Interpretability]]"
date_updated: 2026-10-13
concept_count: 16
---

# Time Series Validation

> [!abstract] Routing Summary
> This topic covers how to validate models fitted to time-ordered data without fooling yourself. It has two failure modes. The first is **inference**: regressions between trending (integrated) series give spurious significance. The second is **evaluation**: shuffled cross-validation can understate future error. It contains 2 sub-topics (one per source) and 16 notes: 7 from Granger (2003) and 9 from Bergmeir, Hyndman & Koo (2018), counting one cross-source synthesis note.
> - Need to know whether a levels regression of a KPI on a trending driver is real (spurious regression, $R^2 > DW$, Phillips asymptotics)? → [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]]
> - Need to *demonstrate* spurious regression, or run an Engle-Granger test or ECM in code? → [[Granger 2003 - Spurious Regression Monte Carlo in Python]]
> - Need cointegration, error-correction models, or the Granger representation theorem? → [[Granger 2003 - Cointegration and the Error-Correction Representation]]
> - Need what $I(d)$ / "integrated" means, or an intuitive picture of it? → [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]]
> - Need Granger causality, Toda-Yamamoto, or why cointegration implies causality? → [[Granger 2003 - Granger Causality and Its Link to Cointegration]]
> - Need forecast-evaluation stages or the "usefulness to a decision maker" criterion? → [[Granger 2003 - Forecasting, Decision Science and Aggregation]]
> - Need to know whether ordinary K-fold CV is valid for a time-series forecaster? → [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]] (decision rule) and [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]] (conditions)
> - Need the lag-embedding construction, or why h-block CV wastes data? → [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]]
> - Need the proof of Theorem 1 (Lemma 1, Burkholder, the martingale argument)? → [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]]
> - Need simulation evidence comparing CV, LOOCV, OOS and h-block CV (MAPAE/MPAE, Tables 1-2)? → [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]] and [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]]
> - Need a residual-whiteness gate before trusting CV (Ljung-Box)? → [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]]
> - Need a practical validation plan for a driver or marketing-mix model (rolling origin, blocked CV with gaps, nested tuning, null baselines, CRPS backtests)? → [[Out-of-Sample Validation for Time-Series Models]]
> - Need a per-source overview → [[Granger 2003 - Spurious Regression and Cointegration - Overview]] or [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]

## Sub-topics

- [[Granger 2003 - Spurious Regression and Cointegration/_Index|Granger 2003 - Spurious Regression and Cointegration]]. COVERS: Granger's 2003 Nobel Lecture (pp. 360-366), mapped page by page. Integrated series $I(d)$ and the pearls/magnets pictures. Cointegration $CI(d,b)$, the Granger representation theorem (5 consequences), ECMs with half-lives, and the Engle-Granger two-step test (critical value −3.34 asymptotic, −3.37 finite-T). Spurious regression from Yule (1926) through Granger-Newbold (1974, Tables 1-2 in full) to Phillips (1986): $t = O_p(\sqrt T)$, DW $\to 0$, the $R^2 > DW$ rule, and a 6-step screening algorithm. Granger causality: definition, Toda-Yamamoto, and cointegration ⇒ causality. Forecasting stages, the decision-maker criterion, and aggregation. A seeded Python Monte Carlo with 5 experiments and 3 figures (67-90% false rejections in levels, about 5% in differences). (7 notes, 3 figures.)
- [[Bergmeir Hyndman Koo 2018 - CV for Time Series/_Index|Bergmeir Hyndman Koo 2018 - CV for Time Series]]. COVERS: Bergmeir, Hyndman & Koo (2018, CSDA 120:70-83), mapped section by section. Lag-embedded K-fold CV vs h-block / non-dependent CV (Figure 1). Assumptions A1-A3 and Theorem 1 (CV is consistent for pure AR($p$) models with martingale-difference errors), with the full Appendix A proof and flagged source slips. The Monte Carlo design (MAPAE/MPAE, 3 DGPs × 2 model families × 4 procedures) and Tables 1-2 transcribed in full. CV is about twice as precise as OOS on AR(3) data (MAPAE 0.09 vs 0.16) but optimistically biased when every candidate underfits. The sunspot example with a Ljung-Box filter (763/1,560 configs; RMSE 2.247 vs 2.281). A 5-step decision rule and the scope limits for exogenous regressors. A cross-source synthesis note on rolling-origin, blocked and nested schemes, null baselines, a random-ranking permutation test, and CRPS backtests. (9 notes.)

## Concept Map

| Concept | Note | Source | Type | Key Result |
|---|---|---|---|---|
| Integrated series $I(d)$ | [[Granger 2003 - Econometrics, Integrated Series and the String-of-Pearls Picture]] | Granger | definition | $\Delta^d x_t$ stationary; changes are closer to stationary than levels |
| Spurious regression | [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] | Granger | definition / theorem | Independent random walks "find" relationships; $t$ grows like $\sqrt T$ |
| $R^2 > DW$ flag | [[Granger 2003 - Spurious Regression from Yule to Granger-Newbold]] | Granger | heuristic | Symptom check for levels regressions of trending series |
| Spurious-regression Monte Carlo | [[Granger 2003 - Spurious Regression Monte Carlo in Python]] | Granger | example / code | 67-90% false rejections in levels; 4-6% in differences |
| Cointegration and ECM | [[Granger 2003 - Cointegration and the Error-Correction Representation]] | Granger | theorem / algorithm | Cointegration ⇔ ECM; Engle-Granger residual ADF test |
| Granger causality | [[Granger 2003 - Granger Causality and Its Link to Cointegration]] | Granger | definition / theorem | Cointegration implies causality in at least one direction |
| Decision-maker criterion and forecast stages | [[Granger 2003 - Forecasting, Decision Science and Aggregation]] | Granger | concept / algorithm | Judge models by decision usefulness and by their past forecasts |
| Lag-embedded K-fold CV | [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]] | Bergmeir | algorithm | Leave out whole embedded rows, not raw values |
| h-block (non-dependent) CV | [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]] | Bergmeir | definition | Drops so much training data it overestimates error badly |
| Theorem 1 (A1-A3) | [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]] | Bergmeir | theorem | $\widehat{\mathrm{PE}} \xrightarrow{p} \mathrm{PE}$ for stationary pure AR with MDS errors |
| Lemma 1 | [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]] | Bergmeir | proof | Off-diagonal error cross-products vanish |
| MAPAE / MPAE | [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]] | Bergmeir | definition | Precision and bias of an error estimate vs realised future error |
| CV vs OOS precision; underfitting failure | [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]] | Bergmeir | empirical result | CV ≈ 2× more precise; seasonal DGP makes CV more optimistic than OOS |
| Ljung-Box admissibility filter | [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]] | Bergmeir | algorithm | Keep only configs whose out-of-fold residuals are white |
| CV decision rule | [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]] | Bergmeir | algorithm | Lag-only and white residuals → K-fold; otherwise time-ordered |
| Rolling origin, blocked and nested CV; null baselines | [[Out-of-Sample Validation for Time-Series Models]] | synthesis | algorithm / example | Random K-fold understates a flexible model's error; naive beats a spurious driver model in 99.8% of runs |

## Cross-Cutting Concepts

- **Stationarity is the hinge assumption.** Granger shows that standard regression inference breaks for integrated series ([[Granger 2003 - Spurious Regression from Yule to Granger-Newbold#^thm-phillips|Phillips asymptotics]]). Bergmeir's Theorem 1 *requires* a stationary, ergodic process (A1 in [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]). Both sources therefore agree that trending series must be differenced, detrended or modelled as cointegrated before any standard tool is trusted. See [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]] (limitations table) and [[Granger 2003 - Cointegration and the Error-Correction Representation]].
- **Residual autocorrelation is the shared diagnostic.** Granger uses a low Durbin-Watson statistic ($R^2 > DW$) to flag spurious levels fits. Bergmeir uses a Ljung-Box test on pooled out-of-fold residuals to flag underfitting that biases CV ([[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]]). The test differs; the logic is the same: correlated residuals mean the model's assumptions, and its error estimates, cannot be trusted.
- **Trending exogenous regressors: where the two sources meet.** Bergmeir's theorem covers only purely autoregressive models and is silent on driver or marketing-mix regressions with persistent exogenous inputs. The vault extension in [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]] and [[Out-of-Sample Validation for Time-Series Models]] uses Granger's spurious-regression mechanism to explain why shuffled folds look optimistic there: they let the model interpolate a shared trend from neighbouring weeks. The trending-driver simulation in the synthesis note (random K-fold 3.18 vs true 4.10) is the evaluation counterpart of Granger's inference result ([[Granger 2003 - Spurious Regression Monte Carlo in Python#^ex-sim-exp1|Experiment 1]]).
- **Where they differ in emphasis.** Granger is cautious: his remedy is model form (difference, or fit an ECM) plus time-ordered forecast evaluation. Bergmeir is permissive within limits: ordinary K-fold CV is *better* than a single holdout for pure AR models, so the blanket rule "never shuffle time series" (as in [[Forecast Evaluation and Backtesting]]) is too strict inside the theorem's conditions and correct outside them.
- **More data does not rescue a wrong assumption.** For spurious regression the false-rejection rate *rises* with $T$ (Granger, Phillips). For underfitting forecasters, CV's bias does not vanish with more folds or LOOCV (Bergmeir, Table 1 seasonal DGP). Both are reasons to check specification before reading precision.
- **Simulation as the validation method.** Both sub-topics rely on Monte Carlo evidence: Granger-Newbold's 1974 design reproduced in [[Granger 2003 - Spurious Regression Monte Carlo in Python]] (with an ADEMP table), and Bergmeir's MAPAE/MPAE study in [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]]. Both follow the design principles in [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
- **Decision value and forecast evaluation as the final arbiter.** Granger's decision-maker criterion and forecast stages ([[Granger 2003 - Forecasting, Decision Science and Aggregation#^alg-forecast-stages|forecast stages]]) and Bergmeir's prediction-error target agree that out-of-sample predictive performance, not in-sample significance, is the yardstick. The synthesis note puts this into practice with rolling-origin CRPS backtests and naive / seasonal-naive baselines.

## Sources

- [[raw/Granger 2003 - Time Series Analysis Cointegration and Applications (Nobel Lecture).pdf]]: Granger (2003) Nobel Lecture, *Les Prix Nobel 2003*, pp. 360-366. Citation-only background: Yule (1926), Granger & Newbold (1974), Phillips (1986), Engle & Granger (1987).
- [[raw/Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction.pdf]]: author preprint (July 23, 2017, 18 pp.) of Bergmeir, Hyndman & Koo (2018), *Computational Statistics & Data Analysis* 120:70-83.

## See Also

- [[Single Marketing Time Series]]: stationarity, ARIMA and unit roots in marketing data.
- [[Multivariate Persistence and Cointegration]]: Johansen tests and persistence modelling in marketing notation.
- [[Empirical Causal Ordering]]: Granger causality and impulse responses in marketing VARs.
- [[Model Testing and Specification]]: residual autocorrelation and specification tests.
- [[Forecast Evaluation and Backtesting]]: rolling origin, MASE, WQL and CRPS.
- [[Cross Validation Checking]]: LOO-CV for exchangeable data.
- [[Model Selection and Overfitting]]: selection by held-out error and its optimism.
- [[TBR Design Sensitivity and the Stationarity Assumption]]: stationarity in geo-experiment counterfactuals.
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]: how these failure modes show up in media mix models.
- [[Garden of Forking Paths]]: how flexible analysis inflates false discoveries.
