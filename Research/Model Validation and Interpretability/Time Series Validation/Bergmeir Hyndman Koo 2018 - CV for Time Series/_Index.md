---
title: "Index: Bergmeir Hyndman Koo 2018 - CV for Time Series"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
  - topic/time-series
parent: "[[../_Index|Time Series Validation]]"
date_updated: 2026-10-13
concept_count: 9
---

# Bergmeir Hyndman Koo 2018 - CV for Time Series

> [!abstract] Routing Summary
> This folder covers when cross-validation is valid for time-series prediction, based on Bergmeir, Hyndman & Koo (2018, CSDA 120:70-83), plus a synthesis note on out-of-sample validation for time-ordered models. It has 9 notes: theorem, proof, Monte Carlo design and full tables, real-data example, decision rule, and a validation toolbox.
> - Need the paper's claim, key numbers and section map? → [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]
> - Need the lag-embedding construction, or why h-block / non-dependent CV wastes data? → [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]]
> - Need the formal statement (assumptions A1-A3, Theorem 1)? → [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]
> - Need the proof (Lemma 1, Burkholder, martingale argument)? → [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]]
> - Need the simulation design, MAPAE/MPAE definitions, or runnable replication code? → [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]]
> - Need the numbers (Tables 1-2, CV vs OOS vs nonDepCV)? → [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]]
> - Need the Ljung-Box residual filter workflow and Table 3? → [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]]
> - Need a practical rule, the limitations, or why driver/MMM regressions are out of scope? → [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]]
> - Need rolling-origin, blocked or nested schemes, or null baselines (naive, seasonal naive, phantom regressors, random ranking)? → [[Out-of-Sample Validation for Time-Series Models]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Lag-embedded K-fold CV | [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]] | definition / algorithm | [[Cross Validation Checking]] | Leave whole rows $[y_{t-p},\dots,y_t]$ out, not raw values |
| Non-dependent (h-block) CV | [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]] | definition | — | Drops neighbours of test rows; ~18 of 108 training rows survive in a typical 5-fold, $p=5$ setting |
| Assumptions A1-A3 | [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]] | definition | [[Single Marketing Time Series]] | Stationary ergodic correct AR($p$); consistent LOO estimator; MDS errors |
| Theorem 1 | [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]] | theorem | A1-A3 | $\widehat{\mathrm{PE}}\xrightarrow{p}\mathrm{PE}$ |
| Lemma 1 | [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]] | theorem / proof | Theorem 1 setup | Off-diagonal error cross-products vanish (4th-moment bound $cn^4$) |
| MAPAE / MPAE | [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]] | definition | [[Designing Simulated-Data Experiments]] | Precision and bias of an error estimate vs realised future error |
| CV vs OOS precision | [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]] | empirical result | Tables 1-2 | RMSE-MAPAE ≈ 0.09 (CV) vs ≈ 0.16 (OOS) on AR(3) data |
| Underfitting failure | [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]] | empirical result | A3 violated | Seasonal DGP: linear-AR RMSE-MPAE −43.5 to −95.2 (5-fold), −44.1 to −100.7 (LOOCV) vs OOS −25.6 to −42.4 |
| Ljung-Box admissibility filter | [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]] | algorithm | [[Model Testing and Specification]] | 763/1,560 configs pass; CV pick RMSE 2.247 vs OOS pick 2.281 |
| Decision rule | [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]] | algorithm | Theorem 1 | Lag-only and white residuals → K-fold; otherwise time-ordered |
| Rolling origin / blocked / nested CV | [[Out-of-Sample Validation for Time-Series Models]] | synthesis | [[Forecast Evaluation and Backtesting]] | Nested outer/inner windows remove selection-on-holdout bias (inner min 0.957 vs honest outer 1.027); random K-fold understates a flexible model's error by 39%, blocked CV does not; rolling-origin CRPS backtest: skill 0.281 vs seasonal naive, model undercovers (0.731 vs 0.80) |
| Null baselines | [[Out-of-Sample Validation for Time-Series Models]] | synthesis | [[Spurious Regression and Nonsense Correlations]] | Naive beats a spurious driver model in 99.8% of simulated runs; random-ranking permutation test (8 channels: ρ = 0.76, exact p = 0.018) |

## Notes

- [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]. CONTAINS: research question, contribution, key findings, full Source Map (every section, figure, table → note).
- [[Bergmeir 2018 - Lag-Embedded K-Fold CV vs h-Block CV]]. CONTAINS: §1 motivation (why OOS dominates; Opsomer et al. failure); §2 naive CV, bias correction, h-block / non-dependent CV definitions; eq. (1) pure AR($p$); eq. (2) embedding matrix; fold notation $J_k$, $J_k^-$; row-wise CV algorithm; Figure 1 with row-by-row panel table (20 rows; 16/4/0, 12/4/4, 2/4/14); data-loss arithmetic example.
- [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]]. CONTAINS: eq. (3); $Q(\theta)$, $q(\hat\theta)$, PE, $\widehat{\mathrm{PE}}$, $Q_{-t}$; Assumptions A1 (with strong-mixing (a)-(b)), A2 (with sufficient conditions (i)-(iii)), A3 (i)-(iii); Theorem 1 eq. (4) with proof sketch; violation discussion (paper's discrete-error counterexample vs vault-inferred heteroskedastic/heavy-tailed cases; "OLS estimator of φ" slip flagged); "standard AR(p)" remark; scope (splines, NNs); overfit/underfit table; worked underfitting example.
- [[Bergmeir 2018 - Proof of Theorem 1 and Lemma 1]]. CONTAINS: eq. (A.1)-(A.7); Burman-Nolan condition (A.4); Lemma 1 statement and proof (A.6.1.1-A.6.1.3, A.6.2, Burkholder's inequality); why leaving whole rows out matters; flagged source notation slips (A.6.1.1 index/tilde switches, (A.7) $\varepsilon$ vs $\tilde\varepsilon$, $t=1$ start, factor 2) and reconciliation of the printed $cn^4$ bound with the $O(n^2)$ MDS rate.
- [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]]. CONTAINS: §4.1 in-set/out-set protocol; eq. (5)-(7); MAPAE, MPAE; Figure 2; §4.3 procedures table (OOS 20% fraction marked as inferred from §6); §4.4 AR and MLP settings; §4.5 DGP table; Figure 3; runnable Python replication with output and MC SEs; marketing adaptation.
- [[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]]. CONTAINS: §5.1-5.2 narratives; Table 1 (60 rows) and Table 2 (60 rows) in full; seven empirical regularities; model-selection interpretation.
- [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]]. CONTAINS: sunspot data and Tong transform; splits (86 out-set, 203 in-set, 40 OOS); Figure 4; Tong's AIC lag 9 / SETAR(11); 1,560-config grid; Ljung-Box filter algorithm (20 lags, df 0; significance level not stated in the paper); Ljung-Box statistic; Table 3; weekly-KPI adaptation.
- [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]]. CONTAINS: §7 conclusions (quoted); five-step decision rule; limitations table; exogenous-regressor scope extension; reference map of all 22 references on p. 18 (incl. R Core Team 2014); two worked marketing applications.
- [[Out-of-Sample Validation for Time-Series Models]]. CONTAINS: evaluation-scheme definitions (fixed origin, rolling origin, sliding window, blocked with gaps, lag-embedded, h-block); scheme-choice table; leakage rules; nested rolling-origin algorithm; null-baseline definitions (naive, seasonal naive with seasonal-MASE scaling, phantom regressor, block-shuffle caveat, random ranking); selection-on-holdout optimism definition; random-ranking permutation algorithm (Spearman, top-$k$ hypergeometric, exact and Monte Carlo p-values, multi-origin pooling) with 8-channel worked example; reporting checklist; runnable simulations: trending drivers, nested-CV selection bias (M = 1-200), blocked CV with gaps 0/4/8 vs rolling origin vs seasonal naive for OLS and kNN; validation plan for a weekly KPI-driver model; probabilistic-backtest formulas (per-horizon mean score, CRPS skill vs baseline, WQL, interval coverage) with a runnable rolling-origin example (13 origins × 4 horizons; CRPS 1.966 vs seasonal naive 2.733, skill 0.281, coverage 0.731 vs 0.80).

## Sources

- [[raw/Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction.pdf]]: author preprint (July 23, 2017, 18 pp.) of Bergmeir, Hyndman & Koo (2018), *Computational Statistics & Data Analysis* 120:70-83.

## See Also

- [[Spurious Regression and Nonsense Correlations]]: sibling note in Time Series Validation; why trending regressors break shuffled CV.
- [[Granger 2003 - Spurious Regression and Cointegration - Overview]]
- [[Forecast Evaluation and Backtesting]]: rolling origin, MASE, WQL.
- [[Cross Validation Checking]]: LOO-CV for exchangeable data.
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]: performance measures for simulation studies.
