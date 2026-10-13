---
title: "Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/simulation-studies
  - type/definition
  - type/example
  - doc/paper
source: "[[raw/Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction.pdf]]"
source_location: "§4 Monte Carlo Experimental Study, pp. 7-10: §4.1 general setup and eq. (5), MAPAE, MPAE (pp. 7-8); Figure 2 p. 8; §4.2 error measures eq. (6)-(7) p. 8; §4.3 model selection procedures p. 9; §4.4 forecasting algorithms p. 9; §4.5 data generating processes pp. 9-10; Figure 3 p. 10"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Bergmeir Hyndman Koo 2018 - CV for Time Series"
doc_type: paper
depends_on:
  - "[[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]]"
  - "[[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]"
  - "[[Designing Simulated-Data Experiments]]"
used_by:
  - "[[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]]"
  - "[[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]]"
aliases:
  - MAPAE
  - Mean absolute predictive accuracy error
  - MPAE (mean predictive accuracy error)
  - In-set out-set evaluation design
---

# Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics

> [!summary]
> Section 4 of [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview|Bergmeir, Hyndman & Koo]] tests whether an evaluation procedure's error estimate $\widehat{\mathrm{PE}}$, computed on the first 70% of a series (the **in-set**), matches the error PE that the refitted model actually makes on the last 30% (the **out-set**). Four procedures are compared: 5-fold CV, LOOCV, non-dependent CV and OOS. Two model families are used: AR(1)-AR(5) and a small MLP with 1-5 lags. There are three DGPs: random AR(3), random MA(1), and a seasonal AR fitted to US accidental deaths, which is a deliberate counterexample. Each experiment has 1,000 trials. **MAPAE** (mean absolute gap) measures precision and **MPAE** (mean signed gap) measures bias. The design is a clean template for simulation studies of validation schemes, and a runnable miniature is included.
^summary

## Overview

The question is not "which model forecasts best?" but "which **evaluation procedure** best predicts how a model will do on unseen future data?". In ADEMP terms ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]):
- **Estimand:** the out-set error PE.
- **Methods:** the four procedures.
- **Performance measures:** MAPAE and MPAE.

Experiments were run in R (R Core Team 2014) and follow the design of Bergmeir, Costantini & Benítez (2014).

## Main Content

### §4.1 General setup (pp. 7-8)

> [!algorithm] In-set / out-set evaluation protocol (§4.1, p. 7; Figure 2)
> For each simulated series of length 200:
> 1. **Split** into an in-set (first 70%, 140 observations), "available to the forecaster", and an out-set (last 60 observations), "considered the unknown future".
> 2. **Estimate:** partition the in-set according to the procedure under study, build and evaluate models, and compute $\widehat{\mathrm{PE}}$.
> 3. **Truth:** refit the model on *all* in-set data and evaluate it on the out-set. This error is the "true" PE.
> 4. **Score:** record $\widehat{\mathrm{PE}}_j-\mathrm{PE}_j$ for series $j$. Aggregate over $m$ series into MAPAE and MPAE.
^alg-inset-outset

> [!definition] Out-set prediction error (§4.1, eq. (5), p. 7)
> $$\mathrm{PE}(\hat\theta,\tilde{\mathbf x})=\frac1n\sum_{t=1}^{n}\{y_{T+t}-g(\mathbf x_{T+t},\hat\theta)\}^2,$$
> where $T$ is the end of the in-set and $\{y_{T+t},\mathbf x_{T+t}\}$, $t=1,\dots,n$, is the out-set. Here $n$ denotes the out-set length.
^def-outset-pe

> [!definition] MAPAE and MPAE (§4.1, pp. 7-8)
> Over $m$ series in the Monte Carlo study:
> $$\mathrm{MAPAE}=\frac1m\sum_{j=1}^{m}\Bigl|\widehat{\mathrm{PE}}_j(\hat\theta_{-t},\mathbf x_t)-\mathrm{PE}_j(\hat\theta,\tilde{\mathbf x})\Bigr|,\qquad
> \mathrm{MPAE}=\frac1m\sum_{j=1}^{m}\Bigl(\widehat{\mathrm{PE}}_j(\hat\theta_{-t},\mathbf x_t)-\mathrm{PE}_j(\hat\theta,\tilde{\mathbf x})\Bigr).$$
> - **MAPAE** ("mean absolute predictive accuracy error") is an MAE of the error estimate and measures the size of the gap, i.e. precision.
> - **MPAE** ("mean of the predictive accuracy error") detects bias. Negative values mean the procedure *underestimates* future error, i.e. it is optimistic.
^def-mapae

> [!example] Figure 2: training and test sets in the experiments (p. 8)
> Four groups of dot strips along the time axis:
> 1. **5-fold CV:** five strips, one per fold. In each, orange test points are scattered across the in-set and all other points are blue training points.
> 2. **5-fold non-dependent CV:** five strips with the same test points, but gaps (no dot) around each test point, so the remaining blue runs are short.
> 3. **OOS:** the orange test block is the end of the in-set.
> 4. **Retraining and evaluation:** the whole in-set (blue) is used for training, and the green out-set is the "new, unknown data".
^fig-2

### §4.2 Error measures (p. 8)

> [!definition] RMSE and MAE versions of PE (eq. (6)-(7), p. 8)
> $$\mathrm{PE}_{\mathrm{RMSE}}(\hat\theta,\tilde{\mathbf x})=\sqrt{\frac1n\sum_{t=1}^{n}\{y_{T+t}-g(\mathbf x_{T+t},\hat\theta)\}^2},\qquad
> \mathrm{PE}_{\mathrm{MAE}}(\hat\theta,\tilde{\mathbf x})=\frac1n\sum_{t=1}^{n}\bigl|y_{T+t}-g(\mathbf x_{T+t},\hat\theta)\bigr| .$$
> - **RMSE** is used instead of MSE because it is on the data's scale. Since the square root is a bijection on $[0,\infty)$, "the developed theory holds also for the RMSE".
> - **MAE** is added to explore whether the findings extend beyond the squared-error theory.
^def-error-measures

### §4.3 Model selection procedures (p. 9)

| Procedure | Definition (paraphrased from §4.3) |
|---|---|
| **5-fold CV** | Normal 5-fold CV. Rows of the embedded series are randomly assigned to folds. |
| **LOOCV** | Like 5-fold CV, but the number of folds equals the number of embedded rows (one row per fold). |
| **nonDepCV** | Same folds as 5-fold CV, but training rows within lag distance $<p$ of a test row are removed, with $p=5$ the maximal model order. |
| **OOS** | Classical out-of-sample evaluation on a block at the end of the series. *Test fraction inferred, not stated in §4:* the last 20% of the in-set. §4 never gives the OOS test size; the figure comes from §6 (p. 13): "Following the configuration of our Monte Carlo experiments, we use 30% of the data as out-set, perform 5-fold CV, and perform OOS evaluation accordingly with 20% of the in-set data." |

### §4.4 Forecasting algorithms (p. 9)

- **Horizon:** one-step-ahead prediction throughout.
- **Linear:** autoregressions AR(1) to AR(5).
- **Nonlinear:** a standard multi-layer perceptron from R's `nnet` package, fitted by BFGS, with **5 hidden units** and **weight decay 0.00316**, using up to 5 lags.
- **Why these suffice:** simple methods are enough to show CV works. Extending to support vector regression or random forests would not change the results much, because "irrespective of models and methods used for forecasting, our approach is concerned with the residuals" (p. 9), which have universal features such as zero mean and zero correlation between errors.

### §4.5 Data-generating processes (pp. 9-10)

Three experiments with 1,000 Monte Carlo trials each. The **stochastic design** of Bergmeir et al. (2014) draws new DGP coefficients for every trial, to "explore larger areas of the parameter space and achieve more general results" (p. 9).

| Experiment | DGP | Purpose |
|---|---|---|
| 1 | Stationary **AR(3)**, random coefficients | The true model, or close relatives, is among the candidates. |
| 2 | Invertible **MA(1)**, random coefficients | The true model is *not* among the candidates, but an MA process can be approximated by an AR with many lags, and in practice "a relatively low number of AR lags is sufficient" (pp. 9-10). |
| 3 | **Seasonal AR** with a significant lag 12 (seasonal lag 1), parameters fitted to the monthly US accidental-deaths series 1973-1978 (Brockwell & Davis 1991; R dataset `USAccDeaths`) | **Counterexample.** No candidate uses more than 5 lags, so none can fit the data well. CV is expected to break. |

All series are made positive by subtracting the minimum and adding 1 (p. 10).

> [!example] Figure 3: USAccDeaths and its correlogram (p. 10)
> - **Top panel:** monthly accidental deaths in the USA, 1973-1978, ranging from about 7,000 to about 11,300, with a strong annual cycle (summer peaks).
> - **Bottom panels (lags up to 24):** the ACF oscillates with large positive spikes at lags 12 and 24 and negative values around lag 6 and 18. The PACF has a large spike at lag 1 (about 0.7) and further spikes outside the band near lags 11-13. No AR model with at most 5 lags can represent this lag-12 dependence. Caption: "The ACF and PACF plots clearly show the monthly seasonality in the data."
^fig-3

## Examples

> [!example] Miniature replication of the Monte Carlo (vault illustration, Python)
> **Setup.** This simplifies the paper in three ways: fixed rather than random coefficients, OLS AR models with an intercept, and only 5-fold CV vs OOS.
> - **AR(3) DGP:** $y_t=0.5y_{t-1}-0.3y_{t-2}+0.2y_{t-3}+\varepsilon_t$, fitted with an AR(3) (correct) and an AR(5) (overfit).
> - **Seasonal DGP:** $y_t=0.2y_{t-1}+0.7y_{t-12}+\varepsilon_t$, fitted with an AR(3) (underfit).
> - **Design:** length 200, in-set 140, out-set 60, 1,000 trials. The error measure is RMSE.
>
> ```python
> import numpy as np
>
> def embed(y, p):
>     """Rows [y_{t-p},...,y_{t-1}, y_t] as in the embedded matrix (2)."""
>     return np.column_stack([y[i:len(y) - p + i] for i in range(p + 1)])
>
> def fit(M):
>     A = np.column_stack([np.ones(len(M)), M[:, :-1]])
>     return np.linalg.lstsq(A, M[:, -1], rcond=None)[0]
>
> def rmse(M, b):
>     A = np.column_stack([np.ones(len(M)), M[:, :-1]])
>     return np.sqrt(np.mean((M[:, -1] - A @ b) ** 2))
>
> def simulate(phi, n=200, burn=200, rng=None):
>     k = len(phi); y = np.zeros(n + burn)
>     for t in range(k, n + burn):
>         y[t] = sum(phi[j] * y[t - j - 1] for j in range(k)) + rng.standard_normal()
>     return y[burn:]
>
> def one_trial(phi, p, rng):
>     y = simulate(phi, rng=rng)
>     ins, out = y[:140], y[140 - p:]                  # 70% in-set, 30% out-set
>     Mi, Mo = embed(ins, p), embed(out, p)
>     true_pe = rmse(Mo, fit(Mi))                      # "true" error on the unseen future
>     folds = np.array_split(rng.permutation(len(Mi)), 5)
>     se = np.concatenate([(Mi[f, -1] - np.column_stack([np.ones(len(f)), Mi[f, :-1]])
>                           @ fit(np.delete(Mi, f, axis=0))) ** 2 for f in folds])
>     cv_pe = np.sqrt(se.mean())                       # standard 5-fold CV on embedded rows
>     cut = int(0.8 * len(Mi))
>     oos_pe = rmse(Mi[cut:], fit(Mi[:cut]))           # last 20% of the in-set (fraction inferred from §6)
>     return cv_pe - true_pe, oos_pe - true_pe
>
> rng = np.random.default_rng(1)
> cases = {"AR(3) DGP, AR(3) model": ([0.5, -0.3, 0.2], 3),
>          "AR(3) DGP, AR(5) model (overfit)": ([0.5, -0.3, 0.2], 5),
>          "seasonal AR(12) DGP, AR(3) model (underfit)": ([0.2] + [0] * 10 + [0.7], 3)}
> for name, (phi, p) in cases.items():
>     d = np.array([one_trial(phi, p, rng) for _ in range(1000)])
>     print(f"{name:45s} MAPAE cv={np.mean(np.abs(d[:,0])):.3f} oos={np.mean(np.abs(d[:,1])):.3f} | "
>           f"MPAE cv={d[:,0].mean():+.3f} oos={d[:,1].mean():+.3f}")
> ```
>
> **Output** (re-run 2026-10-13, seed 1):
>
> | Case | MAPAE CV | MAPAE OOS | MPAE CV | MPAE OOS |
> |---|---|---|---|---|
> | AR(3) data, AR(3) model | 0.092 | 0.142 | +0.008 | +0.001 |
> | AR(3) data, AR(5) model (overfit) | 0.093 | 0.139 | +0.009 | −0.001 |
> | seasonal data, AR(3) model (underfit) | 0.209 | 0.233 | −0.067 | −0.027 |
>
> **Interpretation.** This reproduces the pattern of [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters|Table 1]].
> - **Correct or overfit models:** K-fold CV estimates future RMSE about a third more precisely than the single OOS block, with negligible bias. The MAPAE values (0.09 CV vs 0.14 OOS) are close to the paper's 0.09 vs 0.16.
> - **Underfit model:** the precision advantage almost disappears, and CV becomes noticeably **optimistic** (negative MPAE, more than twice OOS's bias).
> - **Monte Carlo uncertainty:** with 1,000 trials the MC standard errors are $\mathrm{sd}/\sqrt{1000}\approx0.002$-$0.006$ for MAPAE and $0.004$-$0.009$ for MPAE (computed from the same run). The CV-OOS precision gap in the first two rows (about 0.05) is therefore far outside MC noise. See [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] on reporting MC SEs, which the paper does not do.
^ex-replication

> [!example] Adapting the design to a marketing pipeline
> To check a validation scheme for a weekly KPI forecaster (52-156 rows):
> 1. Simulate series from a DGP fitted to the real KPI, including its seasonality, trend and promotions.
> 2. Hold out the last 30% as the "future".
> 3. Compute each candidate procedure's error estimate on the first 70%: random K-fold on lag rows, blocked K-fold, rolling origin.
> 4. Score the procedures by MAPAE and MPAE against the realised future error.
>
> Include a deliberately underfitting candidate, as Experiment 3 does, to see which procedure flags it. See [[Designing Simulated-Data Experiments]] and [[Out-of-Sample Validation for Time-Series Models]].
^ex-marketing-adaptation

## Connections

- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]: MAPAE and MPAE are the "precision" and "bias" performance measures of a simulation study whose estimand is future error.
- [[Designing Simulated-Data Experiments]]: general principles for this kind of study.
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]: a marketing-specific simulator that could supply DGPs for the same design.
- [[Forecast Evaluation and Backtesting]]: RMSE, MAE and scale-free alternatives (MASE).

## See Also

- [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]]: the numbers.
- [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]]: definitions of the procedures.
