---
title: Out-of-Sample Validation for Time-Series Models
tags:
  - source/ingested
  - topic/model-validation
  - topic/time-series
  - topic/forecasting
  - type/concept
  - type/synthesis
  - doc/synthesis
source: "[[raw/Bergmeir Hyndman Koo 2018 - A Note on the Validity of Cross-Validation for Evaluating Autoregressive Time Series Prediction.pdf]]"
source_location: "Synthesis. Bergmeir, Hyndman & Koo (2018) §§2-7; time-ordered evaluation from the vault's probabilistic-forecasting cluster (Forecast Evaluation and Backtesting); spurious-regression mechanism from Granger (2003); simulation-study conventions from Morris, White & Crowther (2019). All simulations (trending drivers seed 7; nested selection bias seed 2026; blocked CV with gaps vs rolling origin vs seasonal naive seed 13) the rolling-origin probabilistic backtest scored with CRPS/pinball loss (seed 31) and the 8-channel random-ranking example are the vault's own (run 2026-10-13); permutation-test logic follows the vault's randomization-inference notes."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Time Series Validation/Bergmeir Hyndman Koo 2018 - CV for Time Series"
doc_type: synthesis
depends_on:
  - "[[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]"
  - "[[Forecast Evaluation and Backtesting]]"
  - "[[Spurious Regression and Nonsense Correlations]]"
  - "[[Cross Validation Checking]]"
used_by:
  - "[[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]]"
aliases:
  - Time-series validation toolbox
  - Forward-chaining cross-validation
  - Blocked cross-validation for time series
  - Nested time-series cross-validation
  - Null baselines for time-series models
  - Random-ranking null baseline
  - Selection-on-holdout bias
---

# Out-of-Sample Validation for Time-Series Models

> [!summary]
> How to tell whether a model of time-ordered data (a forecaster, a KPI-driver regression, a media-mix model) predicts anything, without fooling yourself.
> - **Purely autoregressive forecasters with white residuals:** ordinary K-fold CV on lag-embedded rows is valid and more precise than a single holdout (Bergmeir, Hyndman & Koo 2018).
> - **Everything else:** use **time-ordered** schemes, i.e. rolling-origin / forward-chaining evaluation or blocked CV with gaps.
> - **Keep tuning honest** with **nested** inner/outer windows, so the score used to report performance was never used to choose the model.
> - **Always compare against null baselines:** naive and seasonal-naive forecasts, a block-shuffled or phantom-regressor target, and random rankings. A model that does not beat them has no demonstrated skill, whatever its in-sample fit.
^summary

## Overview

Ordinary validation assumes exchangeable rows. Time-ordered data breaks this in three ways:
- **dependence:** neighbouring rows share information;
- **non-stationarity:** the relationship drifts;
- **leakage:** features computed from windows that include test-period values.

How much each matters depends on the model. [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview|Bergmeir et al.]] show that for purely autoregressive models only dependence *in the residuals* matters. [[Spurious Regression and Nonsense Correlations]] shows how badly things go when persistent exogenous regressors are evaluated as if rows were exchangeable. This note collects the schemes, the tuning protocol and the null baselines into one toolbox, and points to the vault notes with the formal details.

## Main Content

### 1. Choosing the split

> [!definition] Evaluation schemes for time-ordered data
> Notation: $T$ observations, forecast horizon $h$, origin $o$ (last training time).
> - **Fixed-origin holdout (OOS):** train on $1{:}o$, test on $o+1{:}T$. One estimate, high variance (Bergmeir et al.: MAPAE ≈ 0.16 vs CV ≈ 0.09 for AR data).
> - **Rolling-origin / forward-chaining (expanding window):** for $o=o_0,o_0+s,\dots$, train on $1{:}o$ and test on $o+1{:}o+h$. Average over origins. Mimics real deployment. See [[Forecast Evaluation and Backtesting]] (alias Rolling-Origin Evaluation).
> - **Sliding window:** like rolling origin, but train on $o-w+1{:}o$. Use it when old data are no longer representative (structural change).
> - **Blocked K-fold with gaps:** split time into $K$ contiguous blocks and use each as a test block. Drop $g$ observations on each side of the test block, with $g\ge$ the longest lag or carryover window (the hv-block idea, Racine 2000, cited in Bergmeir et al.). This uses more data than forward chaining, but trains on the future, so it is suitable only under stationarity.
> - **Lag-embedded random K-fold:** valid for purely autoregressive models with white residuals; see [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]].
> - **h-block / non-dependent CV:** drops neighbours of every scattered test point. Wasteful and pessimistic in Bergmeir et al.'s simulations ([[Bergmeir 2018 - Monte Carlo Results for AR and MLP Forecasters]]).
^def-schemes

| Model / data situation | Recommended scheme | Why |
|---|---|---|
| Lag-only forecaster (AR, GBM/NN on lags, global models), residuals white | Lag-embedded K-fold CV + Ljung-Box check | Theorem 1; best precision |
| Lag-only forecaster, residuals autocorrelated | Fix the model (add lags/seasonality), else rolling origin | CV is optimistic under underfitting |
| Regression on exogenous, persistent series (KPI drivers, MMM) | Rolling origin (expanding) | Shuffling interpolates shared trends |
| Suspected structural change / regime shifts | Sliding-window rolling origin | Old data misrepresent the present |
| Very short series (52-156 weekly rows) | Rolling origin with small steps, plus naive baselines | Few origins, so report uncertainty across origins |
| Many related series (panel, geos, SKUs) | Rolling origin on time × all series, or leave-series-out for cold start | Matches deployment ([[Local vs Global Forecasting Models]]) |

The schemes are compared numerically, against the true future error, in [[#^ex-blocked-gap-sim]] (random vs blocked K-fold with gaps 0/4/8 vs rolling origin, for a low-capacity and a flexible model) and [[#^ex-trending-sim]] (trending exogenous drivers).

### 2. Leakage control

- **Backward-looking features only.** Every feature at time $t$ must be computable from data at or before the forecast origin: moving averages, carryover or adstock transforms of the KPI, target encodings, scalers and imputation statistics. Fit these transforms inside each training window.
- **Gaps for carryover.** If the model uses a media carryover with half-life of several weeks ([[Carryover (Adstock) Functional Forms]]), test blocks inherit effects from training-period spend. Blocked CV needs gaps at least as long as the effective carryover.
- **Horizon-consistent inputs.** For an $h$-step forecast, exogenous inputs must be either known in advance (planned spend, calendar) or themselves forecast. Using realised future values of uncontrolled drivers flatters the model.

### 3. Nested validation: keeping selection honest

> [!algorithm] Nested rolling-origin evaluation
> 1. **Outer loop (assessment):** origins $o_1<o_2<\dots<o_R$. For each $o_r$, the outer training window is $1{:}o_r$ and the outer test window is $o_r+1{:}o_r+h$.
> 2. **Inner loop (selection):** within $1{:}o_r$ only, run a time-ordered scheme (rolling origin, or lag-embedded K-fold if Theorem 1 applies) to choose hyperparameters, features, lag order or adstock shape.
> 3. **Refit and score:** refit the selected configuration on $1{:}o_r$ and score it on the outer test window.
> 4. **Report:** the distribution of outer scores across origins. Never report the inner-loop minimum.
^alg-nested

Why it matters: picking the best of $M$ configurations by their holdout score makes the winning score optimistically biased (the winner's curse), and the bias grows with $M$ and with the noise in each score.

> [!definition] Selection-on-holdout optimism
> Let $\hat S_m$ be the holdout score (e.g. RMSE) of configuration $m=1,\dots,M$ and $S_m$ its true expected error on future data. The reported winner is $\hat m=\arg\min_m\hat S_m$. Its **optimism** is
> $$
> \mathrm{Opt}_M=E\bigl[S_{\hat m}-\hat S_{\hat m}\bigr]\ \ge 0 ,
> $$
> which is zero for $M=1$ (a pre-specified model) and grows with $M$. If all $M$ configurations are equally good ($S_m\equiv S$) and $\hat S_m=S+\sigma_s Z_m$ with independent standard normal $Z_m$, then $\mathrm{Opt}_M=\sigma_s\,E[-\min_m Z_m]$, the expected maximum of $M$ standard normals: $1.54\sigma_s$ at $M=10$ and $2.25\sigma_s$ at $M=50$, growing like $\sqrt{2\ln M}$ as $M\to\infty$ (extreme-value asymptotics, which overstate it at small $M$). Overlapping configurations have correlated scores, which makes the growth slower. The nested protocol removes $\mathrm{Opt}_M$ from the *reported* score because the outer test window is never seen by the selection step.
^def-selection-optimism

> [!example] Simulation: how far the inner-loop minimum is biased (vault simulation, run 2026-10-13)
> **Setup** (seed 2026, $R=400$ replications):
> - DGP: weekly KPI $y_t=0.6y_{t-1}+2\sin(2\pi t/52)+\varepsilon_t$, $\varepsilon_t\sim N(0,1)$, $T=156$.
> - A pool of 30 candidate "drivers", all independent white noise (**no** true signal).
> - Each configuration = OLS on intercept, $y_{t-1}$, $\sin$, $\cos$ plus a random 3-driver subset of the pool; $M$ configurations per replication.
> - **Part A (single holdout reused for selection and reporting):** train weeks 1-104, holdout weeks 105-130 (choose the winner and report its holdout RMSE), "future" weeks 131-156 (refit the winner on 1-130 and score it).
> - **Part B (nested rolling origin, $M=50$):** outer origins at weeks 104, 117, 130, 143 with $h=13$; inside each outer training window, the inner loop scores every configuration at two inner origins ($o-26$, $o-13$, $h=13$) and picks the minimum.
>
> ```python
> import numpy as np
> rng = np.random.default_rng(2026)
> T, D = 156, 30
> def make():
>     t = np.arange(T + 52); y = np.zeros(T + 52); e = rng.standard_normal(T + 52)
>     for i in range(1, T + 52):
>         y[i] = 0.6 * y[i-1] + 2 * np.sin(2 * np.pi * t[i] / 52) + e[i]
>     return t, y, rng.standard_normal((T + 52, D))     # drivers unrelated to y
> def design(t, y, Z, cols):
>     lag = np.r_[np.nan, y[:-1]]
>     return np.column_stack([np.ones(len(y)), lag, np.sin(2*np.pi*t/52), np.cos(2*np.pi*t/52), Z[:, cols]])
> def rmse_fit(X, y, tr, te):
>     b = np.linalg.lstsq(X[tr], y[tr], rcond=None)[0]; return np.sqrt(np.mean((y[te] - X[te] @ b) ** 2))
> def configs(M): return [rng.choice(D, 3, replace=False) for _ in range(M)]
> R = 400
> for M in [1, 10, 50, 200]:                             # Part A
>     hold, fut = [], []
>     for _ in range(R):
>         t, y, Z = make(); Xs = [design(t, y, Z, c) for c in configs(M)]
>         hs = [rmse_fit(X, y, np.arange(1, 104), np.arange(104, 130)) for X in Xs]
>         w = int(np.argmin(hs)); hold.append(hs[w])
>         fut.append(rmse_fit(Xs[w], y, np.arange(1, 130), np.arange(130, 156)))
>     d = np.array(fut) - np.array(hold)
>     print(M, np.mean(hold), np.mean(fut), d.mean(), d.std() / np.sqrt(R))
> M, inner_min, outer = 50, [], []                      # Part B: nested
> for _ in range(R):
>     t, y, Z = make(); Xs = [design(t, y, Z, c) for c in configs(M)]; im, os_ = [], []
>     for o in [104, 117, 130, 143]:
>         inner = [np.mean([rmse_fit(X, y, np.arange(1, oi), np.arange(oi, oi + 13)) for oi in (o - 26, o - 13)]) for X in Xs]
>         w = int(np.argmin(inner)); im.append(inner[w])
>         os_.append(rmse_fit(Xs[w], y, np.arange(1, o), np.arange(o, o + 13)))
>     inner_min.append(np.mean(im)); outer.append(np.mean(os_))
> print(np.mean(inner_min), np.mean(outer))
> base = []                                             # reference: no candidate drivers
> for _ in range(R):
>     t, y, Z = make(); X = design(t, y, Z, [])
>     base.append(np.mean([rmse_fit(X, y, np.arange(1, o), np.arange(o, o + 13)) for o in [104, 117, 130, 143]]))
> print(np.mean(base))
> ```
>
> **Part A output** (single holdout used for both selection and reporting):
>
> | $M$ configurations | Reported (holdout-min) RMSE | Winner's future RMSE | Optimism | MC SE |
> |---|---|---|---|---|
> | 1 | 1.030 | 1.027 | −0.003 | 0.010 |
> | 10 | 0.981 | 1.034 | 0.053 | 0.010 |
> | 50 | 0.963 | 1.033 | 0.069 | 0.011 |
> | 200 | 0.963 | 1.039 | 0.076 | 0.010 |
>
> **Part B output** ($M=50$, nested): inner-loop minimum 0.957, outer score 1.027, gap 0.070 (MC SE 0.004). For reference, the base model with **no** candidate drivers has an outer score of 1.010.
>
> **Interpretation.**
> 1. **With one pre-specified model there is no optimism** (−0.003, within MC noise). Once the holdout chooses among 10 or more, the reported score is about 5-7% too good, even though *none* of the candidate drivers carries signal.
> 2. **The bias saturates** between $M=50$ and $M=200$ because configurations drawn from a 30-driver pool overlap and their scores are correlated; the $\sqrt{2\ln M}$ rate in [[#^def-selection-optimism]] is for independent scores.
> 3. **The inner-loop minimum is as biased as a reused holdout** (0.957 vs 1.027). Reporting it would claim a ~7% improvement that does not exist.
> 4. **The outer score is honest and tells the truth:** 1.027 is *worse* than the 1.010 of the driver-free base model, so the selection step added only noise. Only the nested design reveals this.
^ex-nested-bias-sim

This is the time-series face of [[Researcher Degrees of Freedom]] and the [[Garden of Forking Paths]]. The sunspot example in [[Bergmeir 2018 - Sunspot Example with Ljung-Box Residual Filter]] selects from 1,560 configurations but reports the winner's error on an untouched out-set, which is the minimal version of this protocol. See also [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]] and [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]].

### 4. Null baselines

A score means nothing without a reference. Four nulls cover the common failure modes:

> [!definition] Null baselines for time-series model validation
> - **Naive (random walk):** $\hat y_{o+k}=y_o$. Beats most models on persistent series. Its in-sample one-step MAE is the denominator of MASE ([[Forecast Evaluation and Backtesting]]).
> - **Seasonal naive:** $\hat y_{o+k}=y_{o+k-m}$ with season length $m$ (52 for weekly data), valid for $k\le m$ (for $k>m$ use $y_{o+k-m\lceil k/m\rceil}$). The standard reference for seasonal series; the seasonal MASE scales errors by its in-sample MAE $\frac{1}{o-m}\sum_{t=m+1}^{o}|y_t-y_{t-m}|$. It needs at least one full season ($o>m$) of history before the first origin. Worked numerically in [[#^ex-blocked-gap-sim]].
> - **Phantom-regressor / block-shuffled null:** rerun the *entire pipeline* with the exogenous regressors replaced by independent series that share their persistence (simulated random walks, or the real regressors block-permuted in time), or with the target block-shuffled. If the real model does not beat the phantom distribution, the regressors carry no demonstrable predictive signal. **Caution:** block-shuffling a persistent target creates artificial jumps at block boundaries, which makes the null too easy to beat. Prefer nulls that preserve the target's dependence and move the regressors instead.
> - **Random ranking:** for models used to *rank* (channels, segments, drivers by importance), compare the ranking's out-of-sample hit rate or rank correlation with the distribution under random permutations of the ranking. Procedure, formulas and a worked example in [[#^alg-random-ranking]].
^def-null-baselines

#### The random-ranking null in detail

Many time-series models are judged by a *ranking* rather than a point forecast: which channels have the largest effect, which segments will grow fastest, which drivers matter most. The question is whether the model's ordering agrees with an out-of-sample reference ordering (a later period, a holdout, or experimentally measured lifts) more than a random ordering would. Under the null "the model's ranking carries no information about the reference ranking", all $K!$ orderings are equally likely, so the null distribution is exact and needs no modelling assumptions ([[Permutation Tests and Exact Inference]]).

> [!algorithm] Random-ranking permutation baseline
> **Inputs:** model ranks $r_1,\dots,r_K$ of $K$ units (1 = largest predicted effect); reference ranks $s_1,\dots,s_K$ measured **out of sample** (later period or experiments, never the data used to fit the model).
> 1. **Pick the statistic before looking** (pre-registration, [[Researcher Degrees of Freedom]]):
>    - Spearman rank correlation $\rho=1-\dfrac{6\sum_{i=1}^K d_i^2}{K(K^2-1)}$ with $d_i=r_i-s_i$ (no ties); or
>    - top-$k$ hit count $H_k=\lvert\{i:r_i\le k\}\cap\{i:s_i\le k\}\rvert$, for decisions that act only on the top $k$ (e.g. which channels get extra budget).
> 2. **Null distribution.** Permute the model ranks uniformly at random: $r^{(b)}=\pi_b(r)$.
>    - **Exact** for $K\le 9$ ($K!\le 362{,}880$): enumerate all permutations.
>    - **Monte Carlo** otherwise: $B$ random permutations ($B=9{,}999$ is a common choice).
> 3. **p-value** (one-sided, "better than random"): exact $p=\#\{\pi:\ T(\pi(r))\ge T_{\text{obs}}\}/K!$; Monte Carlo $p=\bigl(1+\#\{b:\ T^{(b)}\ge T_{\text{obs}}\}\bigr)/(B+1)$, which counts the observed ranking as one draw and is never zero.
> 4. **Closed forms under the null** (no simulation needed):
>    - Spearman: $E\rho=0$, $\operatorname{Var}\rho=1/(K-1)$; for $K\gtrsim 10$, $\rho\sqrt{K-1}\approx N(0,1)$.
>    - Top-$k$ hits: $H_k\sim\text{Hypergeometric}(K,k,k)$, so $E H_k=k^2/K$ and $P(H_k\ge x)=\sum_{j\ge x}\binom{k}{j}\binom{K-k}{k-j}\big/\binom{K}{k}$.
> 5. **Several origins or periods.** With rankings at origins $r=1,\dots,R$, average the statistic across origins and permute *independently within each origin*; the p-value compares the observed average with the permutation distribution of the average. Do not pool units across origins into one big ranking, since that mixes level differences between periods into the ranks.
> 6. **Report** the statistic, its null mean, and the p-value side by side; a ranking that is not clearly better than random should not drive allocation.
^alg-random-ranking

> [!example] Worked example: 8 channels ranked by a model, checked against experiments (vault computation, 2026-10-13)
> A model ranks $K=8$ channels A-H by estimated incremental effect (A = 1st, ..., H = 8th). A later round of geo experiments measures lifts of 4.1, 2.0, 3.3, 0.4, 1.2, 1.9, −0.3, 0.8 (same channel order).
>
> | Channel | A | B | C | D | E | F | G | H |
> |---|---|---|---|---|---|---|---|---|
> | Model rank $r_i$ | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |
> | Measured lift | 4.1 | 2.0 | 3.3 | 0.4 | 1.2 | 1.9 | −0.3 | 0.8 |
> | Reference rank $s_i$ | 1 | 3 | 2 | 7 | 5 | 4 | 8 | 6 |
> | $d_i^2$ | 0 | 1 | 1 | 9 | 0 | 4 | 1 | 4 |
>
> - **Spearman:** $\sum d_i^2=20$, so $\rho=1-\dfrac{6\cdot20}{8\cdot63}=1-\dfrac{120}{504}=0.762$.
> - **Exact permutation p-value:** enumerating all $8!=40{,}320$ orderings, 1.84% have $\rho\ge0.762$, so $p=0.018$. A Monte Carlo run with $B=9{,}999$ (seed 11) gives $p=0.0186$. The enumerated null has mean 0 and variance $0.1429=1/7$, matching the closed form.
> - **Top-3 hits:** the model's top 3 {A, B, C} equals the experiment's top 3, so $H_3=3$ against a null mean of $9/8=1.125$; $P(H_3\ge3)=\binom33\binom50/\binom83=1/56=0.018$.
> - **Reading:** the ranking beats random at about the 2% level on both statistics. With only 8 units, though, one adjacent swap moves $\rho$ by $6\cdot2/504\approx0.024$ and the p-value noticeably, so a single period is weak evidence; repeat over several experiment rounds (step 5).
>
> ```python
> import numpy as np, itertools
> r = np.arange(1, 9); lift = np.array([4.1, 2.0, 3.3, 0.4, 1.2, 1.9, -0.3, 0.8])
> s = (-lift).argsort().argsort() + 1                     # reference ranks
> rho = lambda a, b: 1 - 6 * ((a - b) ** 2).sum() / (8 * 63)
> obs = rho(r, s)                                         # 0.762
> null = np.array([rho(np.array(p), s) for p in itertools.permutations(r)])
> print(obs, np.mean(null >= obs - 1e-12))                # exact p = 0.0184
> ```
^ex-random-ranking

### 5. Reporting

- **Report per-origin scores, not just the mean.** With few origins the uncertainty is large. Show the spread or a paired comparison against the baseline at each origin.
- **Use scale-free metrics across series** (MASE, relative scores aggregated by geometric mean), and proper scores for probabilistic forecasts ([[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]], [[Probabilistic Forecasting - Overview]]).
- **Score a probabilistic backtest per origin and horizon.** For origins $T\in\mathcal O$ and horizons $h=1,\dots,H$, with predictive CDF $F_{T,h}$ issued at $T$ for $y_{T+h}$:
$$
\overline{S}_h=\frac{1}{|\mathcal O|}\sum_{T\in\mathcal O}S\bigl(F_{T,h},y_{T+h}\bigr),\qquad \text{skill}=1-\frac{\sum_{T,h}S(F^{\text{model}}_{T,h},y_{T+h})}{\sum_{T,h}S(F^{\text{base}}_{T,h},y_{T+h})},
$$
  where $S$ is CRPS (Gaussian closed form in [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]]) or the quantile-grid approximation $\operatorname{WQL}=\tfrac{2}{|\mathcal A|}\sum_{\alpha\in\mathcal A}\rho_\alpha\bigl(y-F^{-1}(\alpha)\bigr)$ with pinball loss $\rho_\alpha(u)=\max(\alpha u,(\alpha-1)u)$. Skill $>0$ means the model beats the baseline (seasonal naive). See the [[#^ex-rolling-probabilistic|worked rolling-origin probabilistic backtest]] below.
- **Report coverage** of predictive intervals over the rolling origins: $\widehat{\text{cov}}_{80}=\frac{1}{|\mathcal O|H}\sum_{T,h}\mathbf 1\{F^{-1}_{T,h}(0.1)\le y_{T+h}\le F^{-1}_{T,h}(0.9)\}$, compared with the nominal 0.80. Scores and coverage are complementary: a sharp but overconfident model can win on CRPS and still undercover. For distribution-free intervals see [[Conformal Prediction - Overview]]; standard conformal guarantees assume exchangeability, which time series violate.
- When comparing validation schemes by simulation, report Monte Carlo SEs ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]).

## Examples

> [!example] Simulation: random K-fold vs rolling origin vs null baselines on trending drivers
> **Setup** (vault simulation, run 2026-10-13, seed 7, 500 replications):
> - Target: a weekly KPI simulated as a random walk, $T=156$.
> - Drivers: three "drivers" simulated as independent random walks. There is **no true relationship**.
> - Model: OLS on the drivers.
> - Schemes: (a) random 5-fold CV; (b) expanding-window rolling origin from week 78, refit every 4 weeks, horizon 4; (c) a naive last-value forecast under the same rolling origins; (d) a phantom-driver null (fresh independent random walks); (e) a block-shuffled target (13-week blocks).
>
> ```python
> import numpy as np
> rng = np.random.default_rng(7)
>
> def ols(X, y):
>     A = np.column_stack([np.ones(len(X)), X]); return np.linalg.lstsq(A, y, rcond=None)[0]
> def pred(X, b):
>     return np.column_stack([np.ones(len(X)), X]) @ b
>
> def random_kfold(X, y, k=5):
>     idx = rng.permutation(len(y)); err = []
>     for f in np.array_split(idx, k):
>         tr = np.setdiff1d(idx, f)
>         err.append((y[f] - pred(X[f], ols(X[tr], y[tr]))) ** 2)
>     return np.sqrt(np.concatenate(err).mean())
>
> def rolling_origin(X, y, first=78, step=4, h=4):
>     err = []                                   # expanding window, refit every 4 weeks
>     for o in range(first, len(y) - h + 1, step):
>         err.append((y[o:o+h] - pred(X[o:o+h], ols(X[:o], y[:o]))) ** 2)
>     return np.sqrt(np.concatenate(err).mean())
>
> def naive_rolling(y, first=78, step=4, h=4):
>     err = [(y[o:o+h] - y[o-1]) ** 2 for o in range(first, len(y) - h + 1, step)]
>     return np.sqrt(np.concatenate(err).mean())
>
> def block_shuffle(y, L=13):
>     blocks = [y[i:i+L] for i in range(0, len(y), L)]
>     return np.concatenate([blocks[i] for i in rng.permutation(len(blocks))])
>
> n, R, res = 156, 500, []
> for _ in range(R):
>     y  = np.cumsum(rng.standard_normal(n))           # weekly KPI: random walk
>     X  = np.cumsum(rng.standard_normal((n, 3)), 0)   # 3 drivers, independent of y
>     Xp = np.cumsum(rng.standard_normal((n, 3)), 0)   # phantom drivers (null)
>     res.append([random_kfold(X, y), rolling_origin(X, y), naive_rolling(y),
>                 random_kfold(Xp, y), rolling_origin(Xp, y),
>                 random_kfold(X, block_shuffle(y))])
> res = np.array(res)
> labels = ["random 5-fold CV, real drivers", "rolling origin, real drivers",
>           "rolling origin, naive last value", "random 5-fold CV, phantom drivers",
>           "rolling origin, phantom drivers", "random 5-fold CV, block-shuffled target"]
> for l, m in zip(labels, res.mean(0)):
>     print(f"{l:42s} mean RMSE {m:.2f}")
> print("P(real drivers beat phantom, random K-fold):", np.mean(res[:, 0] < res[:, 3]))
> print("P(driver model beats naive, rolling origin):", np.mean(res[:, 1] < res[:, 2]))
> ```
>
> **Output:**
>
> | Scheme | Mean RMSE |
> |---|---|
> | random 5-fold CV, real drivers | 3.18 |
> | rolling origin, real drivers | 4.10 |
> | rolling origin, naive last value | **1.58** |
> | random 5-fold CV, phantom drivers | 3.12 |
> | rolling origin, phantom drivers | 4.00 |
> | random 5-fold CV, block-shuffled target | 4.54 |
>
> - P(real drivers beat phantom drivers under random K-fold) = 0.47.
> - P(driver model beats naive under rolling origin) = 0.002.
>
> **Interpretation.**
> 1. **Random K-fold is optimistic** (3.18 vs 4.10). Shuffled folds let the regression interpolate the shared stochastic trend between neighbouring weeks. This model is outside Theorem 1: exogenous $I(1)$ regressors and autocorrelated residuals.
> 2. **The naive baseline wins by a wide margin** (1.58), in 99.8% of replications. Without it, a validation RMSE of 3.18 might be reported as "the model's accuracy".
> 3. **The phantom-driver null exposes the absence of signal.** The real drivers do no better than independent random walks (0.47 ≈ coin flip) under either scheme.
> 4. **The block-shuffled-target null is misleading here.** It scores 4.54, so the real model "beats the null", but only because shuffling 13-week blocks of a random walk creates level jumps that no regression can fit. For persistent targets, move the regressors (phantom null), not the target.
^ex-trending-sim

> [!example] Simulation: blocked CV with gaps, rolling origin and seasonal naive against the true future error (vault simulation, run 2026-10-13)
> **Setup** (seed 13, $R=1{,}000$ replications):
> - DGP (stationary, seasonal, with carryover): $y_t=10+3\sin(2\pi t/52)+0.5\,a_t+u_t$, where $a_t=m_t+0.7a_{t-1}$ is the adstock of weekly spend $m_t\sim\text{Gamma}(2,1)$ and $u_t=0.8u_{t-1}+e_t$, $e_t\sim N(0,1)$, is a slow-moving unexplained baseline. $T=156$ weeks observed, then 13 more weeks as the future.
> - **Truth:** refit on all 156 weeks and compute the RMSE on weeks 157-169 (the error the deployed model actually makes).
> - Model 1, **low capacity:** OLS on intercept, $a_t$, $\sin$, $\cos$ (no time index).
> - Model 2, **flexible:** 5-nearest-neighbour regression on standardised [week index, $a_t$, $\sin$, $\cos$], a stand-in for tree or kNN models given a time feature.
> - Estimators on the 156 observed weeks: random 5-fold CV; blocked 5-fold CV (contiguous ~31-week blocks) with gaps $g=0,4,8$ weeks dropped from training on each side of the test block; rolling origin at weeks 104, 117, 130, 143 with $h=13$.
> - Baselines under the same rolling origins: seasonal naive ($m=52$) and naive last value.
>
> ```python
> import numpy as np
> rng = np.random.default_rng(13); T, H = 156, 13
> def adstock(x, lam=0.7):
>     a = np.zeros_like(x)
>     for i in range(len(x)): a[i] = x[i] + (lam * a[i-1] if i else 0)
>     return a
> def make():
>     n = T + H; t = np.arange(n); m = rng.gamma(2.0, 1.0, n)
>     u = np.zeros(n); e = rng.standard_normal(n)
>     for i in range(1, n): u[i] = 0.8 * u[i-1] + e[i]
>     return t, m, 10 + 3 * np.sin(2*np.pi*t/52) + 0.5 * adstock(m) + u
> def X_ols(t, m): return np.column_stack([np.ones(len(t)), adstock(m), np.sin(2*np.pi*t/52), np.cos(2*np.pi*t/52)])
> def ols(F, y, tr, te): return F[te] @ np.linalg.lstsq(F[tr], y[tr], rcond=None)[0]
> def F_knn(t, m):
>     F = np.column_stack([t/13.0, adstock(m), 2*np.sin(2*np.pi*t/52), 2*np.cos(2*np.pi*t/52)])
>     return (F - F[:T].mean(0)) / F[:T].std(0)
> def knn(F, y, tr, te, k=5):
>     d = ((F[te][:, None, :] - F[tr][None, :, :]) ** 2).sum(-1)
>     return y[tr][np.argsort(d, 1)[:, :k]].mean(1)
> rm = lambda a: np.sqrt(np.mean(np.concatenate(a) ** 2))
> def random_k(f, F, y, k=5):
>     idx = rng.permutation(T); return rm([y[g] - f(F, y, np.setdiff1d(idx, g), g) for g in np.array_split(idx, k)])
> def blocked(f, F, y, k=5, gap=0):
>     idx = np.arange(T)
>     return rm([y[g] - f(F, y, idx[(idx < g[0]-gap) | (idx > g[-1]+gap)], g) for g in np.array_split(idx, k)])
> def rolling(f, F, y): return rm([y[o:o+H] - f(F, y, np.arange(o), np.arange(o, o+H)) for o in range(104, T-H+1, 13)])
> def snaive(y): return rm([y[o:o+H] - y[o-52:o-52+H] for o in range(104, T-H+1, 13)])
> R, res, base = 1000, {"ols": [], "knn": []}, []
> for _ in range(R):
>     t, m, y = make()
>     for name, f, F in [("ols", ols, X_ols(t, m)), ("knn", knn, F_knn(t, m))]:
>         truth = np.sqrt(np.mean((y[T:] - f(F, y, np.arange(T), np.arange(T, T+H))) ** 2))
>         res[name].append([truth, random_k(f, F, y), blocked(f, F, y, gap=0),
>                           blocked(f, F, y, gap=4), blocked(f, F, y, gap=8), rolling(f, F, y)])
>     base.append([snaive(y), np.sqrt(np.mean((y[T:] - y[T-52:T-52+H]) ** 2))])
> for name in res: print(name, np.array(res[name]).mean(0).round(3))
> print("seasonal naive (rolling, truth):", np.array(base).mean(0).round(3))
> ```
> (The naive-last-value rows and the win-rate tallies come from the same loop with `y[o-1]` as the forecast and pairwise comparisons of the stored columns.)
>
> **Output** (mean RMSE over 1,000 replications; MC SE in parentheses):
>
> | Estimator | OLS (low capacity) | kNN with time index (flexible) |
> |---|---|---|
> | **Truth:** refit on 156 weeks, next 13 weeks | **1.662** (0.020) | **2.073** (0.024) |
> | Random 5-fold CV | 1.540 (0.006) | 1.270 (0.003) |
> | Blocked 5-fold, gap 0 | 1.771 (0.009) | 2.063 (0.010) |
> | Blocked 5-fold, gap 4 | 1.796 (0.009) | 2.130 (0.011) |
> | Blocked 5-fold, gap 8 | 1.805 (0.009) | 2.146 (0.012) |
> | Rolling origin, $h=13$ | 1.742 (0.012) | 2.046 (0.013) |
>
> | Baseline | Rolling-origin estimate | Truth (next 13 weeks) |
> |---|---|---|
> | Seasonal naive ($m=52$) | 2.668 | 2.601 |
> | Naive last value | 2.923 | 3.034 |
>
> - Share of replications in which the model beats seasonal naive: OLS 98.1% (rolling origin) vs 89.1% (truth); kNN 96.2% vs 78.6%.
> - Random 5-fold ranks kNN ahead of OLS in **97.6%** of replications; on the true future error kNN is better in only **26.2%**.
>
> **Interpretation.**
> 1. **Random K-fold is badly optimistic for the flexible model** (1.27 vs a true 2.07, −39%). With the week index as a feature, shuffled folds let kNN copy the slow baseline $u_t$ from adjacent weeks, which a forecast cannot do. For the low-capacity OLS the optimism is mild (−7%). **Random K-fold would therefore choose the wrong model** almost every time.
> 2. **Blocked K-fold removes almost all of the optimism.** Here gap 0 already lands near the truth (2.06 vs 2.07); gaps of 4-8 weeks add 0.03-0.08, a slightly conservative correction. Gaps matter more when dependence is longer than this DGP's (adstock decay 0.7 and baseline persistence 0.8 give effective memory of roughly 2-5 weeks), or when features are built from windows that straddle the test block.
> 3. **Blocked CV is mildly pessimistic for OLS** (1.77-1.81 vs 1.66) because each fold trains on only ~4/5 of the data and must interpolate a whole missing season block; rolling origin (1.74) is closest overall, but with only 4 origins its per-replication spread is larger.
> 4. **Seasonal naive is a meaningful bar.** Both models beat it on average, but kNN fails to in about one future window in five. Rolling origin judged both models a little *more* favourably against seasonal naive than the truth did, so report the per-origin win rate rather than a single average.
^ex-blocked-gap-sim

> [!example] A validation plan for a weekly KPI-driver model (52-156 rows)
> 1. **Pre-specify** the candidate set (feature sets, adstock families, penalty grid) and the outer evaluation: expanding window from week 78, 4-week steps, horizons 1-4.
> 2. **Inner selection** at each origin uses only the training window: a nested rolling origin, or a blocked K-fold with gaps covering the carryover window.
> 3. **Baselines at each origin:** naive, seasonal naive, and the same pipeline with phantom media series (20+ draws).
> 4. **Report:** per-origin MASE versus seasonal naive, the share of origins where the model beats each baseline, and interval coverage.
> 5. **Decision:** if the model does not beat seasonal naive and the phantom null, predictive validation does not support its driver attributions. Causal validation through experiments is still required either way; see [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] for why observational fit can mislead about ad effects.
^ex-validation-plan

> [!example] Simulation: rolling-origin probabilistic backtest scored with CRPS and pinball loss
> **Setup** (vault's own, seed 31). A weekly KPI with 156 rows (3 years): $y_t=100+8\sin(2\pi t/52)+3e_t$ with AR(1) noise $e_t=0.6e_{t-1}+\varepsilon_t$, $\varepsilon_t\sim N(0,1)$.
> - **Outer scheme:** expanding window, origins $T_0=104,108,\dots,152$ (13 origins, step 4), horizons $h=1..4$, so 52 scored forecasts per model.
> - **Model:** Fourier seasonality (one harmonic) plus AR(1) residual, refit at each origin. Gaussian predictive with $h$-step variance $\sigma^2\sum_{k<h}\phi^{2k}$.
> - **Baseline:** seasonal naive $\hat y_{T+h}=y_{T+h-52}$, with Gaussian spread equal to the in-sample SD of the 52-week differences.
>
> **Results**
>
> | Model | mean CRPS | WQL (5 quantiles) | MAE | 80% coverage |
> |---|---|---|---|---|
> | Seasonal naive | 2.733 | 2.669 | 3.967 | 0.865 |
> | Fourier + AR(1) | 1.966 | 1.938 | 2.782 | 0.731 |
>
> - **Skill:** CRPS skill vs seasonal naive is 0.281. The model wins at 10 of 13 origins. The mean per-origin CRPS difference is 0.767 with SE 0.353 across origins, so the win is clear but not overwhelming. With 13 origins the per-origin spread matters as much as the mean.
> - **By horizon** (mean CRPS, seasonal naive vs model): h=1 2.599 vs 1.925; h=2 2.628 vs 2.442; h=3 2.688 vs 1.375; h=4 3.017 vs 2.121. These are non-monotone because each horizon has only 13 forecasts.
> - **Calibration:** the model undercovers (0.731 vs nominal 0.80) because it ignores parameter uncertainty. The baseline overcovers (0.865). A CRPS ranking alone would hide this, which is why coverage is reported next to the score.
> - WQL over $\{0.1,0.25,0.5,0.75,0.9\}$ tracks CRPS closely (1.938 vs 1.966), as the identity $\operatorname{CRPS}=2\int_0^1\rho_\alpha\,d\alpha$ predicts.
>
> ```python
> import numpy as np
> from scipy.stats import norm
> rng=np.random.default_rng(31)
> T=156; t=np.arange(T)
> # weekly KPI: annual seasonality + AR(1) noise
> e=np.zeros(T); eps=rng.normal(0,1,T)
> for i in range(1,T): e[i]=0.6*e[i-1]+eps[i]
> y=100+8*np.sin(2*np.pi*t/52)+3*e
> def crps_g(mu,s,x):
>     z=(x-mu)/s; return s*(z*(2*norm.cdf(z)-1)+2*norm.pdf(z)-1/np.sqrt(np.pi))
> def pinball(q,x,a): return np.maximum(a*(x-q),(a-1)*(x-q))
> qs=np.array([.1,.25,.5,.75,.9])
> H=4; origins=range(104,T-H+1,4)
> res={'snaive':[], 'ar':[]}
> for T0 in origins:
>     tr=y[:T0]
>     # seasonal naive with Gaussian residual scale from in-sample seasonal diffs
>     r=tr[52:]-tr[:-52]; s_sn=r.std(ddof=1)
>     # AR(1) on deseasonalised (Fourier) data
>     X=np.c_[np.ones(T0),np.sin(2*np.pi*t[:T0]/52),np.cos(2*np.pi*t[:T0]/52)]
>     b=np.linalg.lstsq(X,tr,rcond=None)[0]; u=tr-X@b
>     phi=(u[1:]@u[:-1])/(u[:-1]@u[:-1]); sig=np.std(u[1:]-phi*u[:-1],ddof=1)
>     for h in range(1,H+1):
>         x=y[T0+h-1]
>         mu_sn=y[T0+h-1-52]; s1=s_sn
>         Xf=np.array([1,np.sin(2*np.pi*(T0+h-1)/52),np.cos(2*np.pi*(T0+h-1)/52)])
>         mu_ar=Xf@b+phi**h*u[-1]; s2=sig*np.sqrt(sum(phi**(2*k) for k in range(h)))
>         for name,mu,s in [('snaive',mu_sn,s1),('ar',mu_ar,s2)]:
>             qv=mu+s*norm.ppf(qs)
>             res[name].append(dict(o=T0,h=h,crps=crps_g(mu,s,x),wql=2*np.mean(pinball(qv,x,qs)),
>                 cov=(mu+s*norm.ppf(.1)<=x<=mu+s*norm.ppf(.9)),ae=abs(x-mu)))
> n=len(list(origins))
> for k,v in res.items():
>     c=np.array([d['crps'] for d in v]); w=np.array([d['wql'] for d in v]); cv=np.mean([d['cov'] for d in v])
>     print(k,'n=',len(v),'CRPS %.3f WQL(5q) %.3f cov80 %.3f MAE %.3f'%(c.mean(),w.mean(),cv,np.mean([d['ae'] for d in v])))
> # per-origin paired skill
> oc=sorted(set(d['o'] for d in res['ar']))
> po=[(np.mean([d['crps'] for d in res['snaive'] if d['o']==o]),np.mean([d['crps'] for d in res['ar'] if d['o']==o])) for o in oc]
> po=np.array(po); diff=po[:,0]-po[:,1]
> print('origins',len(oc),oc[0],oc[-1],'AR wins',int((diff>0).sum()),'mean diff %.3f se %.3f'%(diff.mean(),diff.std(ddof=1)/np.sqrt(len(diff))))
> print('skill 1-CRPS_ar/CRPS_sn %.3f'%(1-po[:,1].mean()/po[:,0].mean()))
> for h in range(1,5):
>     print(h,'%.3f %.3f'%(np.mean([d['crps'] for d in res['snaive'] if d['h']==h]),np.mean([d['crps'] for d in res['ar'] if d['h']==h])), np.mean([d['cov'] for d in res['ar'] if d['h']==h]))
> ```
^ex-rolling-probabilistic

## Connections

- **Theory of when shuffling is fine:** [[Bergmeir 2018 - Theorem 1 Validity of K-Fold CV for Autoregressive Models]], [[Bergmeir 2018 - Conclusions, Decision Rule and Scope Limits]].
- **Time-ordered evaluation, MASE and aggregation in forecasting practice:** [[Forecast Evaluation and Backtesting]], [[Probabilistic Forecasting - Overview]], [[DeepAR and Global Autoregressive Neural Forecasters]], [[Hierarchical Forecast Reconciliation (MinT)]], [[Local vs Global Forecasting Models]], [[Time-Series Foundation Models (Chronos)]] (zero-shot forecasters are scored on a held-out tail with WQL and MASE; a rolling origin with nested selection applies equally to them). Scores for probabilistic backtests: [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]].
- **Why trending regressors mislead:** [[Spurious Regression and Nonsense Correlations]], [[Multivariate Persistence and Cointegration]], [[Granger 2003 - Spurious Regression and Cointegration - Overview]].
- **Exchangeable-data counterparts:** [[Cross Validation Checking]], [[Model Selection Using Predictive Performance]], [[Model Selection and Overfitting]]; and [[Cross-Fitting and Sample Splitting]] for causal ML, where folds serve orthogonalisation rather than evaluation.
- **When exchangeability fails more generally:** [[Q - Exchangeability and What Replaces It When It Fails]].
- **Media-mix-specific validation:** [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]], [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] (simulate ground truth to test the validation scheme itself), [[MMM Model Selection and Application]], [[Bayesian Media Mix Modeling - Overview]].
- **Sample-size realism for prediction models:** [[Riley et al 2020 - Sample Size for Prediction Models - Overview]].
- **Permutation nulls and selection bias:** [[Permutation Tests and Exact Inference]], [[Multiple Comparisons - Bayesian Perspective]], [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] (regressional Goodhart is the same winner's-curse mechanism).
- **Forking paths and false discoveries:** [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- **Governance:** back-testing and outcomes analysis in [[SR 11-7 - Model Risk Management Guidance - Overview]] and TEVV in [[NIST AI RMF 1.0 - Overview]].

## See Also

- [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]: the source paper.
- [[Forecast Evaluation and Backtesting]]: rolling origin, MASE, WQL, aggregation.
- [[Designing Simulated-Data Experiments]]: testing a validation scheme on simulated ground truth.
- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]: reporting such simulations.
