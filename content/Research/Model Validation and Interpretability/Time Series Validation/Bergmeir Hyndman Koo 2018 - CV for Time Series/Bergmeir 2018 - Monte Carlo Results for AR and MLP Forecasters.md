---
title: "Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters"
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/simulation-studies
  - type/example
  - type/theorem
  - doc/paper
source: "[[raw/Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction.pdf]]"
source_location: "§5 Results and Discussion, pp. 10-11: §5.1 linear model fitting p. 11, §5.2 MLP model fitting p. 11; Table 1 (linear AR) and Table 2 (neural networks), p. 12"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Bergmeir Hyndman Koo 2018 - CV for Time Series"
doc_type: paper
depends_on:
  - "[[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]]"
  - "[[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]"
used_by:
  - "[[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]]"
  - "[[Out-of-Sample Validation for Time-Series Models]]"
aliases:
  - Bergmeir 2018 Table 1
  - Bergmeir 2018 Table 2
  - CV vs OOS Monte Carlo results
---

# Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters

> [!summary]
> Tables 1-2 of [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview|Bergmeir, Hyndman & Koo]] report how far each evaluation procedure's error estimate lands from the true future error.
> - **AR(3) and MA(1) data:** 5-fold CV and LOOCV are the most precise (RMSE-MAPAE ≈ 0.09-0.11 vs OOS ≈ 0.16-0.19 for linear models), with bias comparable to OOS.
> - **Non-dependent CV** is badly *pessimistic* (positive MPAE). It explodes to MAPAE 6.1-10.2 for AR(5) because its models are fitted on a sliver of data.
> - **Seasonal counterexample:** every candidate underfits, CV's precision edge nearly vanishes, and CV becomes strongly *optimistic*. RMSE-MPAE for the linear AR models (Table 1) is −43.5 to −95.2 for 5-fold CV and −44.1 to −100.7 for LOOCV, against −25.6 to −42.4 for OOS. For the MLPs (Table 2) it is −37.9 to −62.5 for 5-fold CV, −38.0 to −82.2 for LOOCV and −17.9 to −33.2 for OOS.
>
> MLPs confirm the pattern. The one-lag MLP fails everywhere.
^summary

## Overview

Rows are fitted models (number of lags) within each procedure. Columns are MAPAE (precision; lower is better) and MPAE (bias; near 0 is better, negative means optimistic) for the RMSE and MAE versions of PE. Definitions are in [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]]. The numbers below are transcribed from p. 12. Series length is 200 in all experiments. DGP "AR(12)" in the tables is the seasonal AR of Experiment 3.

## Main Content

### §5.1 Linear models: narrative (p. 11)

- **Experiment 1 (AR(3)).** For RMSE, "the 5-fold CV and LOOCV procedures achieve values around 0.09 for MAPAE, whereas the OOS procedure has higher values around 0.16, so that the CV procedures achieve more precise error estimates". nonDepCV "performs considerably worse, which is due to the fact that the fitted models are less accurate as they are fitted with less data". On MPAE, LOOCV has "consistently low-biased estimates with absolute values smaller than 0.003", while OOS and 5-fold CV reach up to 0.01 and 0.007, "comparable to each other". The MAE results are similar.
- **Experiment 2 (MA(1)).** MAPAE is similar to Experiment 1: CV is more precise than OOS. On MPAE, "OOS now slightly outperforms the CV procedures with absolute values between 0.003 and 0.01". 5-fold CV and LOOCV lie between 0.008-0.013 and 0.005-0.011 respectively. nonDepCV "again is not competitive".
- **Experiment 3 (seasonal AR).** "Where all models are heavily misspecified, we see that the advantage of the CV procedures w.r.t. MAPAE has nearly vanished, and the CV estimates are more biased than the estimates obtained with the OOS procedure."

### §5.2 MLP models: narrative (p. 11)

- **Overall.** The MLP results "essentially confirm the findings for the linear models".
- **One-lag MLP.** With only one lag, "the model fitting procedure has difficulties and the resulting models are not competitive, yielding high values of both MAPAE and MPAE throughout all model selection procedures and experiments".
- **Experiments 1-2.** CV gives lower MAPAE and comparable MPAE relative to OOS.
- **Experiment 3.** "The advantages of the CV procedures for MAPAE have mainly vanished and the disadvantages of high bias prevail."

### Table 1: fitted model linear AR, series length 200 (p. 12)

| DGP | Procedure | Model | RMSE MAPAE | RMSE MPAE | MAE MAPAE | MAE MPAE |
|---|---|---|---|---|---|---|
| AR(3) | 5-fold CV | AR(1) | 0.098 | −0.000 | 0.084 | −0.004 |
| AR(3) | 5-fold CV | AR(2) | 0.089 | 0.004 | 0.078 | 0.000 |
| AR(3) | 5-fold CV | AR(3) | 0.090 | 0.006 | 0.077 | 0.001 |
| AR(3) | 5-fold CV | AR(4) | 0.092 | 0.006 | 0.078 | 0.001 |
| AR(3) | 5-fold CV | AR(5) | 0.094 | 0.007 | 0.080 | 0.001 |
| AR(3) | LOOCV | AR(1) | 0.098 | −0.002 | 0.084 | −0.005 |
| AR(3) | LOOCV | AR(2) | 0.089 | 0.002 | 0.077 | −0.002 |
| AR(3) | LOOCV | AR(3) | 0.090 | 0.002 | 0.077 | −0.002 |
| AR(3) | LOOCV | AR(4) | 0.091 | 0.001 | 0.078 | −0.003 |
| AR(3) | LOOCV | AR(5) | 0.093 | 0.001 | 0.079 | −0.003 |
| AR(3) | nonDepCV | AR(1) | 0.423 | 0.411 | 0.283 | 0.271 |
| AR(3) | nonDepCV | AR(2) | 0.510 | 0.505 | 0.341 | 0.336 |
| AR(3) | nonDepCV | AR(3) | 0.630 | 0.628 | 0.419 | 0.418 |
| AR(3) | nonDepCV | AR(4) | 1.014 | 1.014 | 0.620 | 0.619 |
| AR(3) | nonDepCV | AR(5) | 6.137 | 6.137 | 2.580 | 2.580 |
| AR(3) | OOS | AR(1) | 0.170 | −0.010 | 0.143 | −0.002 |
| AR(3) | OOS | AR(2) | 0.157 | −0.004 | 0.134 | 0.002 |
| AR(3) | OOS | AR(3) | 0.158 | −0.002 | 0.135 | 0.003 |
| AR(3) | OOS | AR(4) | 0.160 | −0.002 | 0.136 | 0.003 |
| AR(3) | OOS | AR(5) | 0.163 | −0.001 | 0.139 | 0.003 |
| MA(1) | 5-fold CV | AR(1) | 0.113 | 0.013 | 0.096 | 0.007 |
| MA(1) | 5-fold CV | AR(2) | 0.106 | 0.008 | 0.090 | 0.003 |
| MA(1) | 5-fold CV | AR(3) | 0.102 | 0.012 | 0.087 | 0.007 |
| MA(1) | 5-fold CV | AR(4) | 0.100 | 0.009 | 0.085 | 0.005 |
| MA(1) | 5-fold CV | AR(5) | 0.100 | 0.012 | 0.085 | 0.006 |
| MA(1) | LOOCV | AR(1) | 0.113 | 0.011 | 0.096 | 0.005 |
| MA(1) | LOOCV | AR(2) | 0.105 | 0.005 | 0.090 | 0.001 |
| MA(1) | LOOCV | AR(3) | 0.101 | 0.009 | 0.086 | 0.004 |
| MA(1) | LOOCV | AR(4) | 0.099 | 0.005 | 0.084 | 0.001 |
| MA(1) | LOOCV | AR(5) | 0.098 | 0.007 | 0.084 | 0.002 |
| MA(1) | nonDepCV | AR(1) | 0.264 | 0.244 | 0.201 | 0.179 |
| MA(1) | nonDepCV | AR(2) | 0.359 | 0.352 | 0.266 | 0.258 |
| MA(1) | nonDepCV | AR(3) | 0.482 | 0.480 | 0.343 | 0.340 |
| MA(1) | nonDepCV | AR(4) | 0.862 | 0.861 | 0.545 | 0.543 |
| MA(1) | nonDepCV | AR(5) | 10.225 | 10.224 | 4.038 | 4.037 |
| MA(1) | OOS | AR(1) | 0.192 | −0.010 | 0.161 | −0.002 |
| MA(1) | OOS | AR(2) | 0.181 | −0.006 | 0.153 | −0.001 |
| MA(1) | OOS | AR(3) | 0.173 | −0.003 | 0.145 | 0.003 |
| MA(1) | OOS | AR(4) | 0.171 | −0.003 | 0.144 | 0.004 |
| MA(1) | OOS | AR(5) | 0.171 | −0.005 | 0.143 | 0.001 |
| AR(12) | 5-fold CV | AR(1) | 150.890 | −43.549 | 128.103 | −41.810 |
| AR(12) | 5-fold CV | AR(2) | 154.210 | −50.193 | 129.217 | −46.432 |
| AR(12) | 5-fold CV | AR(3) | 158.004 | −59.821 | 132.424 | −54.444 |
| AR(12) | 5-fold CV | AR(4) | 166.364 | −80.904 | 139.967 | −71.794 |
| AR(12) | 5-fold CV | AR(5) | 172.824 | −95.194 | 145.233 | −83.965 |
| AR(12) | LOOCV | AR(1) | 150.661 | −44.063 | 127.822 | −42.250 |
| AR(12) | LOOCV | AR(2) | 154.152 | −52.161 | 129.122 | −47.950 |
| AR(12) | LOOCV | AR(3) | 157.858 | −62.983 | 132.123 | −56.868 |
| AR(12) | LOOCV | AR(4) | 166.496 | −84.866 | 139.968 | −74.659 |
| AR(12) | LOOCV | AR(5) | 173.410 | −100.682 | 145.731 | −88.044 |
| AR(12) | nonDepCV | AR(1) | 206.934 | 126.776 | 159.916 | 84.506 |
| AR(12) | nonDepCV | AR(2) | 245.753 | 187.501 | 181.995 | 126.540 |
| AR(12) | nonDepCV | AR(3) | 332.597 | 292.792 | 223.966 | 184.539 |
| AR(12) | nonDepCV | AR(4) | 690.263 | 664.060 | 382.009 | 354.904 |
| AR(12) | nonDepCV | AR(5) | 8101.953 | 8090.237 | 3090.719 | 3077.161 |
| AR(12) | OOS | AR(1) | 157.690 | −25.556 | 135.948 | −16.516 |
| AR(12) | OOS | AR(2) | 161.896 | −28.484 | 138.869 | −18.247 |
| AR(12) | OOS | AR(3) | 165.107 | −34.500 | 140.313 | −22.344 |
| AR(12) | OOS | AR(4) | 171.390 | −40.088 | 145.932 | −25.820 |
| AR(12) | OOS | AR(5) | 177.577 | −42.417 | 152.985 | −28.486 |
^tbl-1

### Table 2: fitted model neural networks (MLP), series length 200 (p. 12)

"# Lags" here is the number of lagged inputs to the MLP, written AR($k$) in the source.

| DGP | Procedure | Lags | RMSE MAPAE | RMSE MPAE | MAE MAPAE | MAE MPAE |
|---|---|---|---|---|---|---|
| AR(3) | 5-fold CV | 1 | 0.769 | −0.724 | 0.665 | −0.632 |
| AR(3) | 5-fold CV | 2 | 0.151 | 0.027 | 0.107 | 0.009 |
| AR(3) | 5-fold CV | 3 | 0.195 | 0.040 | 0.133 | 0.017 |
| AR(3) | 5-fold CV | 4 | 0.207 | 0.057 | 0.135 | 0.028 |
| AR(3) | 5-fold CV | 5 | 0.258 | 0.075 | 0.159 | 0.040 |
| AR(3) | LOOCV | 1 | 0.769 | −0.727 | 0.663 | −0.632 |
| AR(3) | LOOCV | 2 | 0.152 | 0.009 | 0.109 | −0.005 |
| AR(3) | LOOCV | 3 | 0.170 | 0.028 | 0.118 | 0.005 |
| AR(3) | LOOCV | 4 | 0.201 | 0.033 | 0.129 | 0.012 |
| AR(3) | LOOCV | 5 | 0.205 | 0.018 | 0.135 | −0.004 |
| AR(3) | nonDepCV | 1 | 0.580 | −0.109 | 0.505 | −0.207 |
| AR(3) | nonDepCV | 2 | 0.844 | 0.838 | 0.606 | 0.605 |
| AR(3) | nonDepCV | 3 | 0.885 | 0.862 | 0.659 | 0.643 |
| AR(3) | nonDepCV | 4 | 0.842 | 0.826 | 0.643 | 0.639 |
| AR(3) | nonDepCV | 5 | 0.771 | 0.750 | 0.603 | 0.597 |
| AR(3) | OOS | 1 | 0.818 | −0.729 | 0.693 | −0.619 |
| AR(3) | OOS | 2 | 0.232 | 0.008 | 0.180 | 0.013 |
| AR(3) | OOS | 3 | 0.262 | 0.011 | 0.198 | 0.016 |
| AR(3) | OOS | 4 | 0.295 | 0.002 | 0.215 | 0.013 |
| AR(3) | OOS | 5 | 0.326 | 0.013 | 0.240 | 0.024 |
| MA(1) | 5-fold CV | 1 | 0.289 | −0.253 | 0.252 | −0.228 |
| MA(1) | 5-fold CV | 2 | 0.159 | 0.027 | 0.114 | 0.012 |
| MA(1) | 5-fold CV | 3 | 0.182 | 0.068 | 0.125 | 0.043 |
| MA(1) | 5-fold CV | 4 | 0.187 | 0.061 | 0.127 | 0.038 |
| MA(1) | 5-fold CV | 5 | 0.204 | 0.065 | 0.132 | 0.040 |
| MA(1) | LOOCV | 1 | 0.296 | −0.265 | 0.258 | −0.237 |
| MA(1) | LOOCV | 2 | 0.157 | 0.012 | 0.115 | 0.002 |
| MA(1) | LOOCV | 3 | 0.178 | 0.019 | 0.122 | 0.007 |
| MA(1) | LOOCV | 4 | 0.185 | 0.030 | 0.124 | 0.017 |
| MA(1) | LOOCV | 5 | 0.176 | 0.000 | 0.120 | −0.012 |
| MA(1) | nonDepCV | 1 | 0.352 | 0.215 | 0.256 | 0.107 |
| MA(1) | nonDepCV | 2 | 0.712 | 0.704 | 0.533 | 0.531 |
| MA(1) | nonDepCV | 3 | 0.761 | 0.755 | 0.589 | 0.587 |
| MA(1) | nonDepCV | 4 | 0.727 | 0.719 | 0.578 | 0.575 |
| MA(1) | nonDepCV | 5 | 0.659 | 0.649 | 0.534 | 0.532 |
| MA(1) | OOS | 1 | 0.368 | −0.285 | 0.305 | −0.239 |
| MA(1) | OOS | 2 | 0.247 | 0.005 | 0.191 | 0.013 |
| MA(1) | OOS | 3 | 0.267 | 0.015 | 0.198 | 0.021 |
| MA(1) | OOS | 4 | 0.276 | 0.006 | 0.206 | 0.016 |
| MA(1) | OOS | 5 | 0.284 | 0.042 | 0.217 | 0.047 |
| AR(12) | 5-fold CV | 1 | 154.137 | −37.919 | 130.981 | −37.587 |
| AR(12) | 5-fold CV | 2 | 157.743 | −49.764 | 132.260 | −45.950 |
| AR(12) | 5-fold CV | 3 | 152.300 | −38.585 | 127.494 | −38.171 |
| AR(12) | 5-fold CV | 4 | 155.298 | −55.475 | 130.786 | −51.674 |
| AR(12) | 5-fold CV | 5 | 158.104 | −62.537 | 132.781 | −58.896 |
| AR(12) | LOOCV | 1 | 153.873 | −38.041 | 130.153 | −37.107 |
| AR(12) | LOOCV | 2 | 162.565 | −63.654 | 135.013 | −56.950 |
| AR(12) | LOOCV | 3 | 169.791 | −82.204 | 140.290 | −70.038 |
| AR(12) | LOOCV | 4 | 163.306 | −69.063 | 136.467 | −61.480 |
| AR(12) | LOOCV | 5 | 164.931 | −79.233 | 136.795 | −70.160 |
| AR(12) | nonDepCV | 1 | 195.267 | 103.594 | 156.112 | 68.756 |
| AR(12) | nonDepCV | 2 | 195.145 | 96.722 | 155.378 | 64.679 |
| AR(12) | nonDepCV | 3 | 204.659 | 125.448 | 158.247 | 84.718 |
| AR(12) | nonDepCV | 4 | 208.368 | 136.821 | 162.852 | 96.170 |
| AR(12) | nonDepCV | 5 | 205.205 | 125.914 | 162.812 | 89.028 |
| AR(12) | OOS | 1 | 159.824 | −23.745 | 137.788 | −15.963 |
| AR(12) | OOS | 2 | 163.665 | −33.175 | 139.471 | −21.946 |
| AR(12) | OOS | 3 | 168.314 | −17.899 | 141.165 | −9.545 |
| AR(12) | OOS | 4 | 173.594 | −28.360 | 144.881 | −17.344 |
| AR(12) | OOS | 5 | 179.041 | −29.841 | 150.671 | −18.436 |
^tbl-2

### Reading the tables

> [!theorem] Empirical regularities (synthesised from Tables 1-2)
> 1. **Precision advantage of CV when residuals are white.** For linear AR fits, 5-fold CV/OOS RMSE-MAPAE ratios are about 0.57-0.58 on AR(3) data (e.g. 0.090 vs 0.158 for AR(3)) and about 0.59 on MA(1) data (e.g. 0.100 vs 0.171 for AR(4)).
> 2. **Overfitting is harmless for CV's accuracy.** Going from AR(3) to AR(5) on AR(3) data raises 5-fold MAPAE only from 0.090 to 0.094.
> 3. **Non-dependent CV is pessimistic and unstable.** In Table 1, MPAE ≈ MAPAE (all positive) means it overestimates error in nearly every trial. In Table 2 the pattern holds from 2 lags up; the one-lag MLP row is the exception (MPAE −0.109 on AR(3) data). The blow-up with model order (6.137, 10.225 and 8,101.953 for AR(5)) reflects AR(5) models fitted on very few surviving rows; see [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]].
> 4. **Underfitting turns CV optimistic, increasingly so with more lags.** In the seasonal experiment, 5-fold CV MPAE runs −43.5 → −95.2 from AR(1) to AR(5), and OOS −25.6 → −42.4. A plausible reading (the vault's, not the paper's): more lags let the model exploit correlated neighbouring rows more, without capturing the lag-12 structure.
> 5. **Underfitting erases the precision edge.** In the seasonal experiment, 5-fold CV RMSE-MAPAE is 150.9-172.8 vs OOS 157.7-177.6. Lag by lag, CV is only 2.7-4.7% lower (AR(1) 4.3%, AR(2) 4.7%, AR(3) 4.3%, AR(4) 2.9%, AR(5) 2.7%; computed from Table 1). For MAE-MAPAE the gap is 4.1-7.0%. Compare the AR(3) experiment, where CV's MAPAE is about 43% below OOS (0.090 vs 0.158 for the AR(3) model).
> 6. **One-lag MLPs fail under every procedure** (on AR(3) data RMSE-MPAE ≈ −0.72 to −0.73 for 5-fold CV, LOOCV and OOS; nonDepCV has MAPAE 0.580), which is a model failure, not an evaluation failure.
> 7. **MAE behaves like RMSE**, so the squared-error theory appears to carry over empirically.
^res-regularities

## Examples

> [!example] What the numbers mean for model selection
> **Setup:** suppose the true future RMSE of every candidate is about 1.0 and you choose among AR(1)-AR(5) by their estimated error.
>
> **Noise in each estimate:** an OOS estimate is off by about 0.16 on average, a 5-fold CV estimate by about 0.09.
>
> **Consequence:** with five candidates whose true errors differ by a few hundredths, OOS's noise is large relative to those differences, so it will often pick a worse model by chance. Selection on a noisy holdout is also *optimistically biased* for the winner, the "winner's curse". Lower MAPAE therefore translates directly into better selection and smaller selection bias. See [[Model Selection and Overfitting]] and [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]].
^ex-selection-meaning

## Connections

- [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]: Experiments 1-2 satisfy (or nearly satisfy) A1-A3. Experiment 3 violates A1 and hence A3.
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]: the paper reports no Monte Carlo SEs. With 1,000 trials the large gaps are clearly beyond noise, but the second-decimal MPAE differences in Exp. 1-2 may not be.
- [[Forecast Evaluation and Backtesting]]: the single tail block (OOS) is the high-variance baseline that rolling origin improves on.

## See Also

- [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]]: design and a runnable miniature.
- [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]]: the real-data counterpart.
- [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]]: what to do with these results.
