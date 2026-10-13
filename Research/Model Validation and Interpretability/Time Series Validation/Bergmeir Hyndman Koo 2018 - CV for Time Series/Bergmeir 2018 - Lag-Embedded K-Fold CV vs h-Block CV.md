---
title: "Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/forecasting
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction.pdf]]"
source_location: "§1 Introduction p. 2; §2 Cross-Validation for the Dependent Case pp. 2-3, eq. (1)-(2); Figure 1 p. 4"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Bergmeir Hyndman Koo 2018 - CV for Time Series"
doc_type: paper
depends_on:
  - "[[Cross Validation Checking]]"
  - "[[Single Marketing Time Series]]"
used_by:
  - "[[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]"
  - "[[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]]"
  - "[[Out-of-Sample Validation for Time-Series Models]]"
aliases:
  - Lag-embedded cross-validation
  - Embedded-matrix K-fold CV
  - Non-dependent cross-validation
  - h-block cross-validation
  - nonDepCV
---

# Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV

> [!summary]
> Section 2 of [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview|Bergmeir, Hyndman & Koo]] contrasts two ways of cross-validating a forecaster. **Naive CV** deletes individual values $y_t$ from the series. **Non-dependent (h-block) CV** also deletes the $h$ neighbours on either side of each test point, which makes training and test sets roughly independent but discards much of the data. The paper's alternative is to embed the series into a lag matrix with rows $[y_{t-p},\dots,y_{t-1},y_t]$ and run **ordinary K-fold CV over whole rows**. If the AR model is correct, the rows are conditionally uncorrelated regression cases, so nothing is lost by dropping them.
^summary

## Overview

### Why practitioners avoid CV for time series (§1, p. 2)

The introduction lists the reasons forecasters use out-of-sample (OOS) evaluation, holding out "a section from the end of the series", instead of CV:

- **Temporal intuition.** "There is often a feeling that we should not be using future data to predict the past" (p. 2).
- **Dependence and non-stationarity.** Serial correlation and possible non-stationarity "make the use of CV appear problematic" (p. 2, citing Bergmeir & Benítez 2012).
- **Tradition and model structure.** In the forecasting literature OOS is the standard, partly because exponential smoothing and ARIMA estimation are "fully iterative in the sense that they start estimation at the beginning of the series" (p. 2).
- **Documented failures.** Opsomer, Wang & Yang (2001) show that standard CV underestimates kernel-regression bandwidths when error autocorrelation is high, so the fit overfits (p. 2).

The cost of OOS is that it gives a single test evaluation where CV gives several, so "the benefits of CV, especially for small datasets, cannot be exploited" (p. 2).

The literature therefore built CV variants for dependent data (p. 2): Györfi et al. (1989), Burman & Nolan (1992), Burman, Chow & Nolan (1994), McQuarrie & Tsai (1998), Racine (2000) and Kunst (2008).

**The paper's position** (p. 2): for purely autoregressive forecasters, including nonlinear and nonparametric ML methods, these problems are "largely irrelevant", and CV "can and should be used without modification". Applicability is drawn between models with uncorrelated errors and heavily misspecified models that do not produce them. In practice CV can detect *overfitting*, because overfitted models still have uncorrelated errors, while *underfitting* "should be tackled beforehand, e.g. by testing residuals for serial correlation" (p. 2).

## Main Content

### Three ways to cross-validate dependent data (§2, pp. 2-3)

Let $\mathbf y=\{y_1,\dots,y_n\}$ be a time series.

> [!definition] Naive K-fold CV on raw observations (§2, p. 2)
> Randomly chosen values are removed from the vector $\mathbf y$ to form each test fold. The paper notes that this removal "invalidates the CV in the dependent setting because of the correlation between errors in the training and test sets" (p. 2).
^def-naive-cv

The literature offers two fixes (p. 2):
- **Bias correction** (Burman & Nolan 1992).
- **h-block CV** (Burman, Chow & Nolan 1994). This is the procedure the authors call **non-dependent CV**.

> [!definition] Non-dependent (h-block) cross-validation (§2, pp. 2-3; §4.3, p. 9)
> For each observation in the test set, the $h$ observations preceding and following it are also left out of training. Only data points that "can be considered to be independent" of the test point are used (p. 3). In the Monte Carlo study (§4.3) it uses the same folds as 5-fold CV, and a row is removed from the training set if its lag distance to some test row is smaller than $p$, the maximal model order ($p=5$ there).
>
> **Limitation:** both bias correction and h-block CV make "inefficient use of the available data" (p. 3).
^def-nondep-cv

### The purely autoregressive model and the embedding

> [!definition] Purely autoregressive model of order $p$ (§2, eq. (1), p. 3)
> $$y_t = g(\mathbf x_t,\theta)+\varepsilon_t,$$
> where
> - $\varepsilon_t$ is a shock or disturbance term;
> - $\theta$ is a parameter vector;
> - $\mathbf x_t\in\mathbb R^p$ contains lagged values of $y_t$;
> - $g(\mathbf x_t,\theta)=E_\theta[y_t\mid\mathbf x_t]$.
>
> $g$ may be linear, nonlinear or nonparametric. It "could be a totally unspecified function of the lagged values of $y_t$ up to $p$th order".
^def-pure-ar

> [!definition] Embedded time series of order $p$, horizon $h=1$ (§2, eq. (2), p. 3)
> The lag order is fixed and the series is embedded into a matrix that feeds a (nonparametric, nonlinear) regression algorithm:
> $$
> \begin{bmatrix}
> y_1 & y_2 & \cdots & y_p & y_{p+1}\\
> \vdots & \vdots & & \vdots & \vdots\\
> y_{t-p} & y_{t-p+1} & \cdots & y_{t-1} & y_t\\
> \vdots & \vdots & & \vdots & \vdots\\
> y_{n-p} & y_{n-p+1} & \cdots & y_{n-1} & y_n
> \end{bmatrix}
> $$
> Each row has the form $[\mathbf x_t',\,y_t]$. The first $p$ columns are predictors and the last column is the target. There are $n-p$ rows.
^def-embedding

> [!algorithm] Lag-embedded K-fold CV (§2, p. 3)
> 1. Embed the series as in eq. (2).
> 2. Partition the row indices into $K$ sets $J=\{J_1,\dots,J_K\}$, for example at random.
> 3. For $k=1,\dots,K$, let $J_k^-=\bigcup_{j\neq k}J_j$. Fit the model on rows $J_k^-$ and predict the targets of rows $J_k$.
> 4. Pool the squared (or absolute) errors over all folds to estimate the prediction error.
>
> The key difference from naive and h-block CV: "Instead of reducing the training set by removing the $h$ observations preceding and following the observation $y_t$ of the test set, we leave out the entire set of rows corresponding to $t\in J_k$ in matrix (2)" (p. 3). The value $y_t$ still appears as a *predictor* in the training rows $t+1,\dots,t+p$. Only its role as a *target* is held out.
^alg-embedded-cv

### Why dropping rows is harmless when the model is right (p. 3)

- **Conditional uncorrelatedness.** Provided (1) holds, "the rows of the matrix (2) are conditionally uncorrelated because $y_t-\hat g(\mathbf x_t,\hat\theta)=\hat\varepsilon_t$ is simply a regression error, and $\{\hat\varepsilon_t\}$ are asymptotically independent and identically distributed (i.i.d.) provided $g$ is estimated appropriately". Omitting rows therefore "will not affect the bias or consistency of the estimates".
- **Unknown hyperparameters.** The true $p$ and other hyperparameters are unknown in practice. But if the model is "sufficiently large and flexible (and therefore liable to be overfitted), errors will be uncorrelated". With correlated errors "the CV procedure will be biased, but this can be relatively easily tackled by testing the residuals for serial correlation".
- **Data efficiency.** The method "leaves the entire row related to the chosen test set out instead of test set components only", so "we lose much less information embedded in the data in this way than in the h-block CV".

### Figure 1 (p. 4)

> [!example] Figure 1: training and test rows for three procedures
> The figure shows three panels of an embedded series with columns $y_{t-3},y_{t-2},y_{t-1},y_t,y_{t+1}$, i.e. embedding order 4. Each panel is one fold of a 5-fold scheme.
> - **Cross-validation:** test rows (orange) are scattered at random. Every other row is training (blue).
> - **OOS evaluation:** the test rows are the final block. The 4 rows immediately before that block are left white (omitted), and all earlier rows are training.
> - **Non-dependent CV:** the same scattered test rows, but the 4 rows before and after each test row are omitted (white). In the drawn example only two training rows survive, out of about 20 rows in total. Because of these dependency considerations, "4 values before and after a test case cannot be used for training".
>
> Caption conclusion: "the non-dependent CV considerably reduces the available training data."
>
> **Row-by-row layout** (Figure 1 is graphical only, with no text layer. The counts were checked against the rendered image of p. 4. Each panel has **20 rows**, numbered top to bottom, and 5 columns headed $y_{t-3}, y_{t-2}, y_{t-1}, y_t, y_{t+1}$, i.e. an order-4 embedding plus the target):
>
> | Panel | Training rows (blue) | Test rows (orange) | Omitted rows (white) | Count train / test / omitted |
> |---|---|---|---|---|
> | Cross-validation | 1-3, 6-15, 17-18, 20 | 4, 5, 16, 19 | none | 16 / 4 / 0 |
> | OOS evaluation | 1-12 | 17-20 (final block) | 13-16 | 12 / 4 / 4 |
> | Non-dependent CV | 10-11 | 4, 5, 16, 19 (same as CV) | 1-3, 6-9, 12-15, 17-18, 20 | 2 / 4 / 14 |
>
> - In every panel **4 of 20 rows** are test rows, i.e. one fold of a 5-fold split.
> - In the non-dependent panel, rows 1-3 are the only 3 rows before test row 4 (the figure starts there), and rows 6-9 and 12-15 are the 4-row bands after test row 5 and before test row 16. Only rows 10-11 are more than 4 rows from every test row.
> - The OOS panel omits exactly the 4 rows ($=$ embedding order) preceding the test block, so no training row shares a lagged value with a test row's target.
^fig-1

## Examples

> [!example] Arithmetic of the data loss (illustration, not from the paper)
> Take $n-p=135$ embedded rows and 5 random folds of 27 test rows. Following §4.3, exclude every training row whose lag distance to a test row is smaller than $p=5$, i.e. within 4 rows on either side.
> - **Embedded K-fold CV:** trains on $135-27=108$ rows in every fold.
> - **h-block CV:** a row survives only if none of its 8 neighbours is a test row. The chance of that is about $0.8^8\approx0.17$. A quick simulation (2,000 random fold draws) gives an average of **17.7 surviving training rows out of 108**. This is why nonDepCV's error estimates in [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters|Table 1]] blow up as the model order grows: an AR(5) with intercept is fitted on fewer than 20 rows.
>
> **Contiguous blocks** (Racine's hv-block design, cited p. 2) lose only about $2p$ rows per fold. Their trade-off is different.
^ex-data-loss

## Connections

- [[Cross Validation Checking]] covers K-fold and LOO-CV for exchangeable data. The embedding turns a dependent series into a regression whose rows are exchangeable enough under the model.
- [[Single Marketing Time Series]] covers AR($p$) models and the lag structure being embedded.
- [[DeepAR and Global Autoregressive Neural Forecasters]] and [[Local vs Global Forecasting Models]] describe ML forecasters trained on exactly this kind of lag window.
- [[Cross-Fitting and Sample Splitting]] uses sample splitting for a different purpose (orthogonal scores), with the same row-level fold mechanics.

## See Also

- [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]: the formal guarantee for this procedure.
- [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]]: how the four procedures are compared.
- [[Out-of-Sample Validation for Time-Series Models]]: blocked, forward-chaining and nested alternatives.
- [[Forecast Evaluation and Backtesting]]: rolling-origin evaluation.
