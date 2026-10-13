---
title: "Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/forecasting
  - type/example
  - doc/paper
source: "[[raw/Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction.pdf]]"
source_location: "§6 Real-world Data Example, pp. 11-14: data and transform p. 11; splits p. 13; Figure 4 p. 13; Tong (1993) background and hyper-parameter grid p. 13; Ljung-Box procedure p. 14; Table 3 and discussion p. 14"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Bergmeir Hyndman Koo 2018 - CV for Time Series"
doc_type: paper
depends_on:
  - "[[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]]"
  - "[[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]"
  - "[[Model Testing and Specification]]"
used_by:
  - "[[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]]"
  - "[[Out-of-Sample Validation for Time-Series Models]]"
aliases:
  - Bergmeir 2018 sunspot example
  - Ljung-Box filter on CV residuals
  - CV residual whiteness check
---

# Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter

> [!summary]
> Section 6 of [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview|Bergmeir, Hyndman & Koo]] turns Theorem 1 into a workflow on the yearly sunspot series (289 values):
> 1. Grid-search 1,560 MLP configurations.
> 2. Pool each configuration's 5-fold-CV out-of-fold predictions into a residual series.
> 3. Keep only configurations whose residuals pass a **Ljung-Box test** (20 lags, df = 0). 763 pass.
> 4. Pick the configuration with the lowest CV RMSE.
>
> CV picks $p=7$, 3 hidden units, decay 0.1, with **out-set RMSE 2.247**. The OOS-selected model ($p=3$, 9 hidden units, no decay) scores 2.281. The CV choice looks more sensible and is slightly better.
^summary

## Overview

The Monte Carlo study showed that CV *estimates* error well. This section shows how to use CV for *model selection* in practice, with the residual check that guards Theorem 1's key assumption (A3, serially uncorrelated errors). The authors deliberately use a model with many hyperparameters, because "we are not primarily interested in model performance but we want to evaluate the model selection procedures" (p. 13).

## Main Content

### Data (pp. 11-13)

- **Series.** Yearly sunspot numbers, 1700-1988, 289 observations (Tong 1993; R `sunspot.year`).
- **Transform.** Following Tong (1993):
$$
y_t=2\bigl(1+x_t\bigr)^{0.5}-1,
$$
  where $x_t$ is the original series and $y_t$ the transformed one (a square-root-type variance-stabilising transform).
- **Splits** (same proportions as the Monte Carlo):
  - out-set = last 30% = **86 values** (30% of 289 = 86.7, so 86);
  - in-set = the remaining 289 − 86 = **203 values** (1700-1902). The paper does not print this number; it follows from the split;
  - 5-fold CV on the in-set;
  - OOS evaluation on the last 20% of the in-set = **40 values** (20% of 203 = 40.6, so 40). The OOS training part is therefore the first 163 in-set values.

> [!example] Figure 4: preprocessed yearly sunspot series (p. 13)
> - **Top panel:** the transformed series from 1700 to about 1990, oscillating between roughly 0 and 25 with the ~11-year solar cycle and varying amplitude.
> - **Bottom panels (lags 0-25):** the ACF oscillates with a period of about 11 years (peaks near lags 10-11 and 21, troughs near 5 and 16). The PACF is large and positive at lag 1 (about 0.8), strongly negative at lag 2 (about −0.6), with smaller values outside the confidence band around lags 6-9. This structure motivates long lag windows.
^fig-4

### Prior knowledge and model family (p. 13)

- **Earlier fits.** Tong (1993) reports that AIC picks a linear AR lag order of 9, and that nonlinear methods outperform linear ones on this series. In particular he fits a self-exciting threshold AR (SETAR) model of order 11.
- **Model family.** The authors therefore use the MLP from the Monte Carlo.
- **Hyperparameter grid** (also used in Bergmeir & Benítez 2012):
  - size $\in\{3,4,5,\dots,15\}$ (13 values);
  - decay $\in\{0,\,0.00316,\,0.0147,\,0.05,\,0.075,\,0.1\}$ (6 values);
  - maximal lag order $p\in\{1,2,3,\dots,20\}$ (20 values).
- **Total:** $13\times6\times20=1{,}560$ configurations. The selection procedures are 5-fold CV and OOS.

### The residual-whiteness filter (p. 14)

> [!algorithm] CV with a Ljung-Box admissibility filter (§6, p. 14)
> For each of the 1,560 configurations:
> 1. Run 5-fold CV on the embedded in-set. "The cross-validation gives us a genuine out-of-sample prediction for each data point."
> 2. Assemble the out-of-fold predictions across all folds into a **residual series** in time order.
> 3. Apply the **Ljung-Box test** (Ljung & Box 1978; R `Box.test`) with **20 lags** and **degrees of freedom 0**. df = 0 because these are out-of-sample predictions, with no fitted parameters to subtract. The 20 lags capture remaining autocorrelation beyond the order-11 models used in the literature.
> 4. Keep configurations that **pass** the test (no significant residual autocorrelation). Here **763** of 1,560 pass. **The paper does not state the significance level** used to decide pass/fail (p. 14). The R default reports only a p-value, so the cut-off was the authors' choice; 5% is the conventional value but is an assumption, not something the paper says.
> 5. Among survivors, select the configuration with the minimum CV RMSE. For comparison, also select the configuration with the minimum OOS RMSE.
> 6. Refit each selected configuration on the full in-set and report its RMSE on the 86-value out-set.
^alg-ljung-box-filter

> [!definition] Ljung-Box statistic (standard definition; not written out in the paper)
> For residuals $e_1,\dots,e_N$ with sample autocorrelations $\hat\rho_k$,
> $$
> Q_{\mathrm{LB}}=N(N+2)\sum_{k=1}^{L}\frac{\hat\rho_k^2}{N-k}\ \overset{H_0}{\sim}\ \chi^2_{L-\mathrm{df}},
> $$
> where $H_0$ says the residuals are uncorrelated up to lag $L$. The paper uses $L=20$ and $\mathrm{df}=0$.
^def-ljung-box

### Results (Table 3, p. 14)

| Selection procedure | $p$ (lags) | size (hidden units) | decay | RMSE on out-set |
|---|---|---|---|---|
| 5-fold CV | 7 | 3 | 0.1 | **2.247** |
| OOS | 3 | 9 | 0 | 2.281 |
^tbl-3

- **CV choice.** "A model configuration that has a reasonable lag structure and is with only 3 hidden units not overfitting" (p. 14).
- **OOS choice.** It "uses less lags and more hidden units, which seems to be an inferior choice". Both "perform similar on the out-set".
- **OOS ignored the filter.** The OOS-selected configuration has the best OOS error "not only among configurations that pass the Ljung-Box test, but among all the configurations" (p. 14). The OOS criterion picked it with or without the whiteness filter.

## Examples

> [!example] The same workflow for a lag-only weekly KPI forecaster
> **Setup:** a gradient-boosted forecaster of weekly demand with inputs = lags 1-$p$ of demand plus week-of-year dummies. Grid over $p\in\{4,8,13,26,52\}$, tree depth and learning rate.
>
> **Procedure:**
> 1. For each configuration run 5-fold CV on the lag-embedded rows and keep the out-of-fold predictions.
> 2. Sort the residuals by week and run Ljung-Box with $L\approx2\times$ the seasonal period, or at least 20 lags, and df = 0.
> 3. Drop configurations that fail. With $p=4$ or $p=8$ the annual seasonality is not captured and residual autocorrelation at lag 52 should flag them.
> 4. Choose the lowest CV error among survivors, then confirm on a final time-ordered holdout.
>
> **Interpretation:** the filter enforces Theorem 1's A3 empirically. Without it, the underfitting low-$p$ configurations get optimistic CV scores, as in the seasonal experiment of [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]].
>
> **Caveat:** assuming a 5% level (the paper does not report the level it used), with 1,560 configurations up to about 78 white-residual configurations (5% of 1,560, if all were white) would be falsely rejected and some autocorrelated ones would slip through. The filter is a screen, not a guarantee.
^ex-weekly-kpi-workflow

## Connections

- [[Model Testing and Specification]] and [[Single Marketing Time Series]]: residual autocorrelation diagnostics in marketing time-series models.
- [[Researcher Degrees of Freedom]] and [[Garden of Forking Paths]]: a 1,560-configuration grid is a large garden of forking paths. Selecting the minimum CV error among 763 survivors makes the winner's CV score optimistic, which is why the paper scores the winner on a separate out-set. See also [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]].
- [[DeepAR and Global Autoregressive Neural Forecasters]]: neural autoregressive forecasters at scale.

## See Also

- [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]]: the general rule distilled from this example.
- [[Out-of-Sample Validation for Time-Series Models]]: nested inner/outer validation to keep selection honest.
