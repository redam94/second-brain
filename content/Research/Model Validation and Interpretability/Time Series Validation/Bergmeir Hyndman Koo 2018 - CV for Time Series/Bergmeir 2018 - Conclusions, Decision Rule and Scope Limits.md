---
title: "Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/forecasting
  - type/concept
  - doc/paper
source: "[[raw/Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction.pdf]]"
source_location: "§7 Conclusions, pp. 14-15; §1 p. 2 (overfit/underfit framing); §3 pp. 6-7 (violations); §4.4 p. 9 (generality); References p. 18. The section on exogenous-regressor models is the vault's extension, not the paper's."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Bergmeir Hyndman Koo 2018 - CV for Time Series"
doc_type: paper
depends_on:
  - "[[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]"
  - "[[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]]"
  - "[[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]]"
used_by:
  - "[[Out-of-Sample Validation for Time-Series Models]]"
aliases:
  - When is K-fold CV valid for time series
  - Bergmeir CV decision rule
---

# Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits

> [!summary]
> [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview|Bergmeir, Hyndman & Koo]] conclude that **standard K-fold CV is the better choice than OOS evaluation for purely autoregressive forecasters whose residuals are uncorrelated**. This holds even when the lag structure is not exactly right, as long as the model fits the data well. CV should be avoided only when models **underfit** and leave heavily correlated errors, which makes it underestimate error; a Ljung-Box test on the CV residuals detects that case. The theorem does **not** cover models with exogenous, persistent regressors (typical driver and media-mix regressions). For those, time-ordered evaluation remains necessary.
^summary

## Overview

§7 (pp. 14-15) summarises three claims:
1. **Theory.** "A normal K-fold cross-validation procedure can be used if the residuals of our model are uncorrelated, which is especially the case if the model nests an appropriate model".
2. **Simulation.** "Even if the lag structure is not correct, as long as the data are fitted well by the model, cross-validation without any modification is a better choice than OOS evaluation".
3. **Real data.** The findings can be used in practice, as the sunspot example shows.

The closing caveat, quoted in full (§7, p. 15):

> "Cross-validation can adequately control overfitting in this application, and only if the models underfit the data and lead to heavily correlated errors, are the cross-validation procedures to be avoided as in such a case they may yield a systematic underestimation of the error. However, this case can be easily detected by checking the residuals for serial correlation, e.g., using the Ljung-Box test."

## Main Content

### Decision rule distilled from the paper

> [!algorithm] Choosing an evaluation scheme for a forecaster (vault distillation of §§2-7)
> 1. **Check the model class.** Are all predictors lags of the target, plus deterministic functions of the time index such as calendar dummies or Fourier terms? If not, go to step 5.
> 2. **Embed and cross-validate.** Build the lag-embedded matrix ([[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]]) and run ordinary K-fold CV over its rows. Prefer K-fold or LOOCV to a single tail block; do not use h-block / non-dependent CV as a default.
> 3. **Check residual whiteness.** Pool the out-of-fold residuals in time order and run Ljung-Box with enough lags to cover seasonality ([[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]]). Discard or enlarge configurations that fail: more lags, seasonal lags, more flexible $g$.
> 4. **Select and confirm.** Select by CV error among white-residual configurations, then confirm on a final time-ordered holdout, because selection makes the winner's CV score optimistic.
> 5. **Otherwise use time-ordered schemes.** For exogenous regressors, or residuals that cannot be whitened, use rolling-origin / forward-chaining evaluation with nested tuning and null baselines ([[Out-of-Sample Validation for Time-Series Models]]).
^alg-decision-rule

### Limitations acknowledged or implied by the paper

| Limitation | Where | Comment |
|---|---|---|
| Assumes **stationary, ergodic** processes (A1) | §3, p. 5 | Trending or unit-root series must be differenced or detrended first. Non-stationarity was one of the original worries (§1) and is not resolved by the theorem. |
| Assumes **no misspecification** (A1) | §3, p. 6 | Empirically the result holds approximately for good approximations (MA(1) experiment) but fails for gross underfit. |
| **One-step-ahead** ($h=1$) only | §2, p. 3; §4.4, p. 9 | For multi-step direct forecasting, the error $y_{t+h}-\hat y_{t+h\mid t}$ is MA($h-1$) even for a correct model, so A3 fails by construction. Some row-gap or blocking is then needed (vault inference). |
| Proof for **LOOCV**; K-fold stated as "straightforward" | §3, p. 4 | No separate K-fold proof. |
| **Squared-error loss** in the theory | §4.2, p. 8 | RMSE follows by monotonicity. MAE is supported only empirically. |
| **No Monte Carlo SEs** reported | Tables 1-2 | Large effects are clearly real. Second-decimal bias differences may be within noise. |
| Only **linear AR and a small MLP** tested | §4.4, p. 9 | The authors argue other learners would not change the results, but this is not shown. |
| **Single real-data example**, out-set gap 2.247 vs 2.281 | §6 | Illustrative, not evidence of superiority. |

### Outside the theorem: models with exogenous, persistent regressors (vault extension)

The theorem is about purely autoregressive models. It says nothing about regressions with **exogenous, persistent regressors**, the typical marketing mix or KPI-driver model in which weekly sales are regressed on media, price, distribution and macro series. Three things break the conditions there:

- **Shared trends.** Exogenous regressors can be trending or $I(1)$. A shuffled fold then lets the model interpolate a shared trend from neighbouring weeks, which is the [[Spurious Regression and Nonsense Correlations|spurious regression]] mechanism ([[Granger 2003 - Spurious Regression and Cointegration - Overview]]).
- **Correlated residuals.** Residuals of such models are often autocorrelated (omitted dynamics, slow-moving baselines), violating A3.
- **Leaky features.** Many pipelines include lagged or smoothed **target-derived features**: moving averages, carryover transforms of the KPI ([[Carryover (Adstock) Functional Forms]] applied to the target rather than to media), and target encodings. Their windows straddle fold boundaries and leak test information.

For these settings use time-ordered schemes: see [[Out-of-Sample Validation for Time-Series Models]] and [[Forecast Evaluation and Backtesting]]. Practitioner accounts of media-mix validation make the same point: [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]].

### Related literature cited by the paper (reference map, p. 18)

| Reference | Role in the paper |
|---|---|
| Stone (1974); Arlot & Celisse (2010); Hastie et al. (2009) | Standard CV background |
| Budka & Gabrys (2013); Borra & Di Ciaccio (2010); Moreno-Torres et al. (2012) | Ongoing CV research (density-preserving sampling, prediction-error comparison, partition-induced dataset shift) |
| Bergmeir & Benítez (2012) | Earlier empirical study of CV for time-series predictors; source of the MLP grid |
| Bergmeir, Costantini & Benítez (2014) | CV for directional forecast evaluation; template for the Monte Carlo design |
| Opsomer, Wang & Yang (2001) | CV underestimates kernel bandwidth under correlated errors |
| Györfi et al. (1989); Burman & Nolan (1992); Burman, Chow & Nolan (1994); McQuarrie & Tsai (1998); Racine (2000); Kunst (2008) | CV variants for dependent data: bias correction, h-block, hv-block, seasonal parametric bootstrap |
| Andrews (1987) | Uniform LLN / consistency conditions for A2 |
| Mokkadem (1988) | Mixing properties of ARMA processes (strong mixing under A1) |
| Hyndman et al. (2008) | Exponential smoothing: an example of a "fully iterative" model that favours OOS |
| Ljung & Box (1978) | Residual autocorrelation test used in §6 |
| Brockwell & Davis (1991); Tong (1993) | Datasets (USAccDeaths, sunspots) and the SETAR benchmark |
| R Core Team (2014) | Software: all experiments run in R (§4, p. 7); `Box.test` used in §6 |

The list on p. 18 has **22 entries**, and every one appears in the table above (3 + 3 + 1 + 1 + 1 + 6 + 1 + 1 + 1 + 1 + 2 + 1 = 22). All are citation only and not in the vault; they are described, not quoted.

## Examples

> [!example] Applying the rule to two weekly marketing models
> **Model A: weekly demand forecaster built from lags of the KPI only.** Gradient-boosted trees on lags 1-52 plus calendar dummies, 156 weeks.
> - Step 1: lag-only model. ✓
> - Step 2: 5-fold CV on the 104 embedded rows ($156-52$).
> - Step 3: Ljung-Box at 26 lags on the pooled residuals passes.
> - Verdict: use CV for tuning, then confirm on the last 13 weeks.
>
> **Model B: driver model of a KPI on media, price and macro series.** Ridge regression on 6 media series, price, and a consumer-confidence index, 104 weeks.
> - Step 1 fails: there are exogenous persistent regressors.
> - Use rolling-origin evaluation from week 78 in 4-week steps, tune the ridge penalty within each training window (nested), and compare against seasonal-naive and "last-year-same-week" baselines.
> - If the driver model does not beat the naive baselines out of sample, the attribution it implies is not supported by predictive evidence.
^ex-apply-rule

## Connections

- [[Model Selection and Overfitting]]: the overfit/underfit asymmetry in the context of predictive model selection.
- [[Researcher Degrees of Freedom]]: choosing an evaluation scheme after seeing results is itself a forking path. Fix the rule in advance.
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]: predictive validation as the yardstick for algorithmic models, which this paper makes legitimate for autoregressive ML forecasters.
- [[SR 11-7 - Model Risk Management Guidance - Overview]]: outcomes analysis and back-testing as part of model validation.

## See Also

- [[Out-of-Sample Validation for Time-Series Models]]: the full toolbox.
- [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]: the conditions.
- [[Spurious Regression and Nonsense Correlations]]: why trending regressors break shuffled CV.
