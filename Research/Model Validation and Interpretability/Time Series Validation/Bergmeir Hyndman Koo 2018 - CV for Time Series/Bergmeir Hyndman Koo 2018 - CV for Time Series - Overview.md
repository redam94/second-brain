---
title: "Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/forecasting
  - type/overview
  - doc/paper
source: "[[raw/Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction.pdf]]"
source_location: "Bergmeir, Hyndman & Koo (2018), Computational Statistics & Data Analysis 120:70-83; file is the author preprint dated July 23, 2017 (18 pp.). Whole paper: Abstract p. 1; §1 p. 2; §2 pp. 2-4; §3 pp. 4-7; §4 pp. 7-10; §5 pp. 10-12; §6 pp. 11-14; §7 pp. 14-15; Appendix A pp. 16-18."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Bergmeir Hyndman Koo 2018 - CV for Time Series"
doc_type: paper
depends_on:
  - "[[Cross Validation Checking]]"
  - "[[Single Marketing Time Series]]"
  - "[[Forecast Evaluation and Backtesting]]"
used_by:
  - "[[Out-of-Sample Validation for Time-Series Models]]"
  - "[[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]"
aliases:
  - Bergmeir Hyndman Koo 2018
  - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction
  - Bergmeir 2018 CV paper
---

# Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview

> [!summary]
> **Question:** can ordinary, *unmodified* K-fold cross-validation be used to evaluate time-series forecasters, or must one always fall back on a single out-of-sample (OOS) block at the end of the series? **Answer:** for **purely autoregressive** models (predictors are lags of the target) whose **errors are serially uncorrelated**, standard K-fold CV over the **rows of the lag-embedded matrix** is consistent for the prediction error (Theorem 1). Flexible models that nest the true one satisfy this, so CV controls overfitting well; underfitting models leave autocorrelated residuals and make CV **optimistically biased**, which a Ljung-Box test on the pooled out-of-fold residuals detects. Monte Carlo evidence: CV's error estimates are roughly twice as precise as OOS (MAPAE ≈ 0.09 vs ≈ 0.16 for AR(3) data); h-block "non-dependent" CV is far worse; on a seasonal counterexample CV loses its advantage and is more biased.
^summary

## Overview

**Authors.** Christoph Bergmeir (Faculty of IT, Monash), Rob J Hyndman and Bonsoo Koo (Econometrics & Business Statistics, Monash). Preprint dated July 23, 2017 ("Preprint submitted to Elsevier"); published in *Computational Statistics & Data Analysis* 120 (2018) 70-83. Bergmeir is the corresponding author.

**Keywords** (p. 1): cross-validation, time series, autoregression.

**Funding** (title-page footnote, p. 1): Koo acknowledges the financial assistance of the Australian Research Council Discovery Grant No. DP150104292.

**Research question.** Forecasters habitually evaluate models only on a block withheld from the end of the series. The habit rests on three worries (§1, p. 2): using future data to predict the past, serial correlation, and non-stationarity. A single OOS block wastes data and gives a noisy error estimate, which hurts most on short series. Which of the worries actually matter, and when can the standard procedure be used unchanged?

**Contribution.** The authors describe this as, to their knowledge, the first paper to justify standard K-fold CV in the dependent setting without modification (§1, p. 2). The paper has three parts:
1. **A reframing** (§2). Embed the series into a regression matrix with rows $[y_{t-p},\dots,y_{t-1},y_t]$ and cross-validate over **rows**, not over raw observations. See [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]].
2. **A theorem** (§3, App. A). Leave-one-out (hence K-fold) CV is consistent for the prediction error of a stationary nonlinear AR($p$) model when the errors form a martingale-difference sequence. See [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]] and [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]].
3. **Evidence.** A Monte Carlo study (§4-5) with 3 DGPs × 2 model families × 4 evaluation procedures, and a real-data model-selection exercise on yearly sunspots (§6). See [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]], [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]] and [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]].

**Key findings.**
- Theorem 1: $\widehat{\mathrm{PE}}\xrightarrow{p}\mathrm{PE}$ under A1 (correctly specified, stationary, ergodic nonlinear AR($p$)), A2 (consistent leave-one-out estimator) and A3 (martingale-difference errors with constant conditional variance, a $4+\delta$ moment and a continuous distribution).
- In simulation, 5-fold CV and LOOCV beat OOS on precision (MAPAE) while bias (MPAE) stays comparable, both when the true model is among the candidates (AR(3) DGP) and when it can only be approximated (MA(1) DGP).
- Non-dependent (h-block) CV is "not competitive". It throws away too much training data and badly overestimates error, catastrophically so for AR(5) models.
- When every candidate underfits (seasonal lag-12 DGP, ≤5 lags), CV's precision advantage "has nearly vanished" and it **underestimates** the error more than OOS does.
- Sunspots: after a Ljung-Box filter, 763 of 1,560 MLP configurations remain. CV selects $(p=7,\text{size}=3,\text{decay}=0.1)$ with out-set RMSE 2.247; OOS selects $(p=3,\text{size}=9,\text{decay}=0)$ with 2.281.

**Practical rule** (see [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]]): use standard K-fold CV on embedded rows for purely autoregressive forecasters, test pooled CV residuals for autocorrelation, and fall back to time-ordered evaluation when residuals are correlated or the model has exogenous persistent regressors. The cross-source synthesis is in [[Out-of-Sample Validation for Time-Series Models]].

## Main Content

### Source Map

| Source section | Content | Note |
|---|---|---|
| Title page, p. 1 | Authors, affiliations, corresponding author; footnote: ARC Discovery Grant DP150104292 (Koo); preprint date July 23, 2017 | this note |
| Abstract and Keywords, p. 1 | Claim: K-fold CV valid for purely AR models with uncorrelated errors; keywords: cross-validation, time series, autoregression | this note |
| §1 Introduction, p. 2 | Why practitioners use OOS; known CV failures (Opsomer et al. 2001); dependent-data CV literature; overfit vs underfit framing | [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]] |
| §2 CV for the dependent case, pp. 2-3 | Naive removal of values; Burman-Nolan bias correction; h-block / non-dependent CV; eq. (1) pure AR($p$) model; eq. (2) embedding matrix; $J_k$, $J_k^-$ fold notation; row-wise leave-out | [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]] |
| Figure 1, p. 4 | Train/test/omitted rows for CV, OOS and non-dependent CV (embedding order 4, one fold of 5); row-by-row table: 20 rows per panel, CV 16/4/0, OOS 12/4/4, non-dep 2/4/14 (train/test/omitted; verified against the rendered p. 4 image) | [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]] |
| §3 setup, pp. 4-5 | Eq. (3), objective $Q(\theta)$, estimating equations $q(\hat\theta)$, PE, $\widehat{\mathrm{PE}}$, $\hat\theta_{-t}$, $Q_{-t}$ | [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]] |
| Assumptions A1-A3, pp. 5-6 | Stationary ergodic nonlinear AR($p$); consistency of NLS; MDS errors (i)-(iii); strong-mixing conditions (a)-(b); sufficient conditions (i)-(iii) for A2 | [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]] |
| Theorem 1, eq. (4), p. 6 | $\widehat{\mathrm{PE}}\xrightarrow{p}\mathrm{PE}$ | [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]] |
| §3 discussion, pp. 6-7 | "(3) is a standard AR(p) process" remark (p. 6); discrete-error counterexample to A3; violations of A1/A2/A3, incl. the "OLS estimator of φ" notation slip (p. 7); generality (splines, local polynomials, neural nets) | [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]] |
| Appendix A, eq. (A.1)-(A.5), p. 16 | Decomposition of PE and $\widehat{\mathrm{PE}}$; Burman-Nolan condition (A.4) | [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]] |
| Lemma 1 and proof, eq. (A.6)-(A.7), pp. 17-18 | Fourth-moment bound; split into A.6.1.1-A.6.1.3 and A.6.2; Burkholder's inequality; flagged source slips (index switch to $t=1$, missing tildes, misplaced factor 2, $n^4$ vs $O(n^2)$ bound) | [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]] |
| §4 intro and §4.1 general setup, p. 7 | In-set / out-set, 200 values, 70/30 split; eq. (5) PE as MSE; MAPAE; MPAE | [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]] |
| Figure 2, p. 8 | Training/test/future sets for 5-fold CV, non-dep CV, OOS | [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]] |
| §4.2 error measures, p. 8 | Eq. (6) RMSE, eq. (7) MAE | [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]] |
| §4.3 model-selection procedures, p. 9 | 5-fold CV, LOOCV, nonDepCV, OOS (OOS test fraction of 20% is inferred from §6, not stated in §4) | [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]] |
| §4.4 forecasting algorithms, p. 9 | AR(1)-AR(5); MLP (nnet, BFGS, 5 hidden, decay 0.00316) | [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]] |
| §4.5 DGPs, pp. 9-10 | Exp. 1 AR(3), Exp. 2 MA(1), Exp. 3 seasonal AR (USAccDeaths); 1,000 trials; positivity shift | [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]] |
| Figure 3, p. 10 | USAccDeaths series 1973-78 with ACF/PACF | [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]] |
| §5.1 linear results, p. 11 | Narrative for Exp. 1-3 | [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]] |
| §5.2 MLP results, p. 11 | Narrative; AR(1)-lag MLP fails | [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]] |
| Table 1, p. 12 | Linear AR: MAPAE/MPAE × RMSE/MAE, all 60 rows | [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]] |
| Table 2, p. 12 | MLP: MAPAE/MPAE × RMSE/MAE, all 60 rows | [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]] |
| §6 real-world example, pp. 11-14 | Sunspots 1700-1988 (289 values), transform, splits (out-set 86, in-set 203, OOS test 40), Tong's AIC lag 9 / SETAR(11), grid of 1,560 configs, Ljung-Box filter | [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]] |
| Figure 4, p. 13 | Preprocessed sunspot series with ACF/PACF | [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]] |
| Table 3, p. 14 | CV vs OOS chosen configurations and out-set RMSE | [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]] |
| §7 Conclusions, pp. 14-15 | Summary and Ljung-Box recommendation | [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]] |
| References, p. 18 | 22 references (Andrews 1987 ... Tong 1993, incl. R Core Team 2014; full map in the Conclusions note) | [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]] (related-literature map) |

### Notes in this set

1. [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]]: motivation, embedding, fold notation, non-dependent CV, Figure 1.
2. [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]: formal setup, assumptions A1-A3, Theorem 1, violations, scope.
3. [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]]: Appendix A in full.
4. [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]]: §4 design, Figures 2-3, a runnable miniature replication.
5. [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]]: §5 and Tables 1-2 transcribed in full.
6. [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]]: §6, Figure 4, Table 3.
7. [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]]: §7, decision rule, limits for exogenous-regressor models, related literature.
8. [[Out-of-Sample Validation for Time-Series Models]]: cross-source synthesis of rolling-origin, blocked and nested schemes and null baselines, with three runnable simulations (trending drivers; nested selection bias; blocked CV with gaps vs rolling origin vs seasonal naive) a worked random-ranking permutation test, and a rolling-origin probabilistic backtest scored with CRPS, pinball/WQL and 80% coverage.

## Examples

> [!example] The paper's result in one worked comparison (numbers from Table 1, p. 12)
> **Setup:** a 200-value series from a random stationary AR(3) process; the in-set is the first 140 values and the out-set the last 60. An AR(3) model is fitted and its future RMSE must be estimated from the in-set alone.
> - **5-fold CV on embedded rows:** the estimate misses the realised out-set RMSE by 0.090 on average (MAPAE), with bias +0.006 (MPAE).
> - **OOS (last block of the in-set):** misses by 0.158 on average, with bias −0.002.
> - **Non-dependent CV:** misses by 0.630, almost all of it bias (+0.628), because too few training rows survive.
>
> **Reading:** CV is about 43% more precise than OOS with negligible bias, which is the practical content of Theorem 1. On the seasonal counterexample the same AR(3) gives 5-fold-CV MPAE −59.8 against OOS −34.5, so the residual check of [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]] must come first.
^ex-one-comparison

## Connections

- Extends [[Cross Validation Checking]] (LOO-CV for exchangeable data) to dependent, purely autoregressive data.
- Refines the blanket "never shuffle time series" warning in [[Forecast Evaluation and Backtesting]]. The warning is right outside this theorem's conditions and too strict inside them.
- Trending exogenous regressors fall outside the theorem. See [[Spurious Regression and Nonsense Correlations]] and [[Granger 2003 - Spurious Regression and Cointegration - Overview]].
- Monte Carlo evaluation of estimators: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
- Model selection by held-out error and its optimism: [[Model Selection and Overfitting]], [[Model Selection Using Predictive Performance]], [[Researcher Degrees of Freedom]].
- Purely autoregressive ML forecasters to which the result applies: [[DeepAR and Global Autoregressive Neural Forecasters]], [[Local vs Global Forecasting Models]].

## See Also

- [[Out-of-Sample Validation for Time-Series Models]]: the practical toolbox.
- [[Single Marketing Time Series]]: ARIMA identification, residual whiteness.
- [[Model Testing and Specification]]: residual autocorrelation tests.
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]: predictive accuracy as the arbiter of algorithmic models.
- [[Riley et al 2020 - Sample Size for Prediction Models - Overview]]: how many rows a prediction model needs.
- [[NIST AI RMF - Trustworthy AI Characteristics, Tradeoffs and Validity]] — accuracy paired with representative test sets
