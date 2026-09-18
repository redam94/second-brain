---
title: Hierarchical Forecast Reconciliation (MinT)
tags:
  - source/ingested
  - topic/forecasting
  - topic/time-series
  - topic/hierarchical-forecasting
  - type/method
  - doc/paper
source: "[[raw/Wickramasuriya 2019 - Optimal Forecast Reconciliation MinT.pdf]]"
source_location: "Monash Working Paper 22/17 (published JASA 2019, 114(526):804-819): Sec. 1 (pp. 2-4), Sec. 2.1-2.4 (pp. 4-12), Sec. 3 (pp. 12-19), Sec. 4 (pp. 19-21), App. A (pp. 25-27), Table 8 (p. 42)"
date_ingested: 2026-09-18
folder: "Machine Learning and AI/Probabilistic Forecasting"
doc_type: paper
depends_on:
  - "[[Probabilistic Forecasting - Overview]]"
  - "[[Single Marketing Time Series]]"
used_by:
  - "[[Forecast Evaluation and Backtesting]]"
aliases:
  - MinT
  - MinT Reconciliation
  - Minimum Trace Reconciliation
  - Forecast Reconciliation
  - Hierarchical Time Series Forecasting
  - Grouped Time Series
  - Coherent Forecasts
  - Wickramasuriya Athanasopoulos Hyndman 2019
---

# Hierarchical Forecast Reconciliation (MinT)

> [!summary]
> Collections of time series with aggregation constraints (product or geographic hierarchies, or crossed "grouped" structures) need **coherent** forecasts: aggregates must equal the sum of their components. **Reconciliation** forecasts *every* series at *every* level independently (the **base forecasts** $\hat y$), then linearly projects them onto the coherent subspace, $\tilde y=SP\hat y$. Wickramasuriya, Athanasopoulos & Hyndman show (i) the covariance needed by the earlier GLS approach of Hyndman et al. (2011) is **not identifiable**; (ii) the reconciled error covariance is $SPW_hP^\top S^\top$ where $W_h$ is the covariance of *base forecast errors* (Lemma 1); (iii) minimising its **trace** subject to unbiasedness gives the closed form $P=(S^\top W_h^{-1}S)^{-1}S^\top W_h^{-1}$ (Theorem 1), with a cheaper equivalent form; and (iv) the result is never worse than the base forecasts in $W_h^{-1}$-weighted loss. With a **shrinkage** estimate of $W_h$ — MinT(Shrink) — it dominates bottom-up, OLS and WLS in simulations and on 555 Australian tourism series.

## Overview

A retailer forecasts total sales, sales by country, region, store, and also by product group; "the cross-product of these two hierarchies often results in a very large collection, comprising millions of individual time series" (Sec. 1). Three traditional strategies exist:

- **Bottom-up**: forecast only the most disaggregated series and add up. It "ignores relationships between series, and performs particularly poorly on highly disaggregated data which tend to have a low signal-to-noise ratio."
- **Top-down**: forecast the total and split by proportions. Hyndman et al. (2011) showed any top-down method is **biased** even when base forecasts are unbiased.
- **Independent forecasts at all levels**: uses the best model per level, but the results do not add up.

Reconciliation keeps the third strategy and repairs its incoherence — and, because each level sees a different signal-to-noise trade-off, the repair is also a **forecast combination** that improves accuracy at all levels.

## Main Content

> [!definition] Summing matrix, base and reconciled forecasts (Sec. 2.1) ^def-summing-matrix
> Let $y_t\in\mathbb R^m$ stack all series and $b_t\in\mathbb R^n$ the bottom-level series. Then
>
> $$
> y_t=S\,b_t,
> $$
>
> with $S\in\mathbb R^{m\times n}$ the **summing matrix**, one row per series. For a two-level tree (Total → A, B; A → AA, AB, AC; B → BA, BB), $m=8$, $n=5$ and
>
> $$
> S=\begin{bmatrix}1&1&1&1&1\\1&1&1&0&0\\0&0&0&1&1\\ &&I_5&&\end{bmatrix}.
> $$
>
> Let $\hat y_T(h)$ be $h$-step **base forecasts** from any method. Every linear reconciliation method has the form
>
> $$
> \tilde y_T(h)=S\,P\,\hat y_T(h),\qquad P\in\mathbb R^{n\times m}:
> $$
>
> $P$ maps base forecasts to bottom-level forecasts, and $S$ sums them up. Bottom-up is $P=[\,0_{n\times(m-n)}\ \ I_n\,]$; top-down is $P=[\,p\ \ 0_{n\times(m-1)}\,]$ for proportions $p$.

> [!theorem] Unbiasedness condition ^thm-unbiased
> If the base forecasts are unbiased, $\mathbb E[\hat y_T(h)\mid\mathcal I_T]=S\beta_T(h)$, the reconciled forecasts are unbiased **iff** $SPS=S$, equivalently $PS=I_n$ (Sec. 2.1). Top-down violates this.

**Why the 2011 GLS approach fails (Sec. 2.2).** Hyndman et al. modelled $\hat y_T(h)=S\beta_T(h)+\varepsilon_h$ with coherency-error covariance $\Sigma_h$, giving $P=(S^\top\Sigma_h^\dagger S)^{-1}S^\top\Sigma_h^\dagger$. But the residuals are $(I_m-SP)\hat y$, and $I_m-SP$ is idempotent with rank $m-n<m$, so $\Sigma_h$ **cannot be identified**. They fell back to OLS, $P=(S^\top S)^{-1}S^\top$.

> [!theorem] Lemma 1 — covariance of reconciled forecast errors ^thm-mint-lemma1
> For any $P$ with $SPS=S$,
>
> $$
> \operatorname{Var}\bigl[y_{t+h}-\tilde y_t(h)\mid\mathcal I_t\bigr]=S\,P\,W_h\,P^\top S^\top,
> \qquad W_h=\mathbb E\bigl[\hat e_t(h)\hat e_t(h)^\top\mid\mathcal I_t\bigr],
> $$
>
> where $\hat e_t(h)=y_{t+h}-\hat y_t(h)$ are the **base forecast errors**. *Proof sketch* (App. A.1): $\tilde e=SP\hat e+(I-SP)y_{t+h}$ and $(I-SP)S=0$. Under Gaussian errors this yields prediction intervals for *any* unbiased reconciliation method.

> [!theorem] Theorem 1 — MinT reconciliation ^thm-mint
> Let $W_h$ be positive definite. The $P$ that minimises $\operatorname{tr}[SPW_hP^\top S^\top]$ subject to $SPS=S$ is
>
> $$
> P=(S^\top W_h^{-1}S)^{-1}S^\top W_h^{-1},
> $$
>
> or equivalently
>
> $$
> P=J-JW_hU\,(U^\top W_hU)^{-1}U^\top,
> $$
>
> where $S^\top=[\,C^\top\ \ I_n\,]$, $J=[\,0_{n\times m^*}\ \ I_n\,]$, $U^\top=[\,I_{m^*}\ \ -C\,]$ and $m^*=m-n$ is the number of aggregate series. The second form inverts a single $m^*\times m^*$ matrix rather than an $n\times n$ and an $m\times m$ one, which is what makes MinT scale.

The reconciled forecasts are therefore the **GLS projection of $\hat y$ onto the coherent subspace** $\{\check y:U^\top\check y=0\}$ in the metric $W_h^{-1}$:

$$
\tilde y_T(h)=\arg\min_{\check y:\,U^\top\check y=0}\ \bigl[\hat y_T(h)-\check y\bigr]^\top W_h^{-1}\bigl[\hat y_T(h)-\check y\bigr]
=\hat y-W_hU(U^\top W_hU)^{-1}U^\top\hat y .
$$

> [!theorem] Reconciliation never hurts (Sec. 2.3) ^thm-mint-pythagoras
> By the generalised Pythagorean inequality for this projection, for every coherent realisation $y_{T+h}$,
>
> $$
> [y_{T+h}-\hat y]^\top W_h^{-1}[y_{T+h}-\hat y]\ \ge\ [y_{T+h}-\tilde y]^\top W_h^{-1}[y_{T+h}-\tilde y].
> $$
>
> MinT forecasts are "at least as good as the incoherent base forecasts." The authors conclude that "applying forecast reconciliation should always be preferred, and approaches that use limited information such as bottom-up or top-down should be avoided" (Sec. 5).

Under the "error-additivity" assumption $\hat e=S\hat a$ (so $W_h=SV_hS^\top$ is singular), *every* unbiased $P$ attains the same variance; the Moore–Penrose inverse in the first form gives OLS and in the second gives bottom-up — explaining why both earlier methods appeared "optimal."

### Estimating $W_h$ (Sec. 2.4)

| Label | $W_h\propto$ | Assumption / use |
|---|---|---|
| **OLS** | $I$ | Uncorrelated, equal-variance errors at *all* levels — impossible in a hierarchy |
| **WLS$_v$** | $\operatorname{diag}(\hat W_1)$ | Variance scaling by in-sample one-step residual variances |
| **WLS$_s$** | $\Lambda=\operatorname{diag}(S\mathbf 1)$ | Structural scaling: variance ∝ number of bottom series aggregated; needs no residuals (e.g. judgmental forecasts) |
| **MinT(Sample)** | $\hat W_1=\frac1T\sum_t\hat e_t(1)\hat e_t(1)^\top$ | Full sample covariance; poor or singular when $m\gtrsim T$ |
| **MinT(Shrink)** | $\lambda_D\hat W_{1,D}+(1-\lambda_D)\hat W_1$ | Schäfer–Strimmer shrinkage of off-diagonals toward zero, $\hat\lambda_D=\sum_{i\ne j}\widehat{\operatorname{Var}}(\hat r_{ij})/\sum_{i\ne j}\hat r_{ij}^2$ |

All use one-step in-sample residuals and assume $W_h=k_hW_1$; the constant $k_h$ cancels in point forecasts but matters for intervals (left to later work).

### Evidence

- **Simulations (Sec. 3).** With two bottom series and error correlation $-0.8$, MinT(Shrink) cuts top-level one-step RMSE by ≈30% versus base. Across designs (correlated ARIMA hierarchies forecast with deliberately misspecified ETS; seasonal series; a 2,047-series five-level hierarchy) "MinT(Shrink) consistently shows the largest improvements"; gains are largest under **model misspecification**, and bottom-up often fails to improve on base forecasts.
- **Australian domestic tourism (Sec. 4, Table 8).** 555 monthly series (a geographic hierarchy of 7 states → 27 zones → 76 regions, crossed with 4 purposes of travel), 1998-2016. **Rolling-window** evaluation: 96-month training window, 1-12-step forecasts, rolled forward one month at a time (132 one-step … 121 twelve-step forecasts per series). With ARIMA base forecasts, average RMSE over $h=1$-$12$ changes relative to base by:

| Level | BU | OLS | WLS$_v$ | MinT(Shrink) |
|---|---|---|---|---|
| Australia (total) | +22.2% | −1.3% | +3.1% | +0.5% |
| States | +7.0% | −4.1% | −4.6% | **−6.4%** |
| Zones | +1.8% | −3.5% | −5.6% | **−7.0%** |
| Regions | +0.5% | −2.1% | −4.7% | **−5.6%** |
| Australia by purpose | +7.2% | −4.2% | −8.0% | **−12.4%** |

  Bottom-up is worst because fewer than 50% of bottom-level models even detect seasonality; reconciliation "bring[s] informative signals from the higher levels of aggregation to the lower levels and vice versa." It also "implicitly models spatial autocorrelations."

## Examples

**Three-series hierarchy, by hand.** Total $=A+B$, so $S=\begin{bmatrix}1&1\\1&0\\0&1\end{bmatrix}$, $U^\top=[1,-1,-1]$. Base forecasts $\hat y=(100,60,50)$ are incoherent: $U^\top\hat y=-10$.

- *OLS* ($W=I$): $\tilde y=\hat y+\tfrac{10}{3}(1,-1,-1)=(103.3,\,56.7,\,46.7)$ — the discrepancy is split equally.
- *WLS* with $W=\operatorname{diag}(4,1,5)$: $W U=(4,-1,-5)$, $U^\top WU=10$, so $\tilde y=\hat y+(4,-1,-5)=(104,\,59,\,45)$ — the noisiest forecast ($B$) absorbs most of the adjustment, the most precise ($A$) barely moves. By Lemma 1 the total error variance falls from $\operatorname{tr}W=10$ to $\operatorname{tr}[SPWP^\top S^\top]=5.8$.
- *Full MinT* with positive covariance between Total and $B$ errors, $W=\begin{bmatrix}4&1&2\\1&1&0\\2&0&5\end{bmatrix}$: $\tilde y=(102.5,\,60,\,42.5)$; trace $7.5$ vs $10$.

```python
import numpy as np
def mint(S, yhat, W):
    Wi = np.linalg.inv(W)
    P = np.linalg.solve(S.T @ Wi @ S, S.T @ Wi)   # (S'W^-1 S)^-1 S'W^-1
    return S @ P @ yhat, S @ P @ W @ P.T @ S.T     # reconciled mean, error covariance
def shrink_cov(E):                                 # E: (T, m) one-step residuals
    W = E.T @ E / len(E); D = np.diag(np.diag(W))
    Z = E / E.std(0); R = Z.T @ Z / len(E)
    varR = ((Z[:, :, None] * Z[:, None, :] - R) ** 2).sum(0) / (len(E) * (len(E) - 1))
    off = ~np.eye(len(W), dtype=bool)
    lam = np.clip(varR[off].sum() / (R[off] ** 2).sum(), 0, 1)
    return lam * D + (1 - lam) * W
```

**Marketing use.** Geo-level sales forecasts (DMA → region → national) used for budgeting or as [[Counterfactual Impact Estimation|counterfactual baselines]] should agree with the national forecast finance already uses; MinT delivers that agreement while *improving* the noisy geo-level forecasts with national-level trend and seasonal signal.

## Connections

- [[Probabilistic Forecasting - Overview]] — coherence as the structural requirement of forecasting at scale.
- [[Local vs Global Forecasting Models]] — reconciliation is a *post-hoc* way to share information across series, complementary to sharing parameters.
- [[Forecast Evaluation and Backtesting]] — the rolling-window design of Sec. 4 is the template for evaluating reconciliation.
- [[Hierarchical Models]] — a different sense of "hierarchical": partial pooling of *parameters* through a prior, vs MinT's pooling of *forecasts* through linear aggregation constraints. Both shrink noisy low-level estimates toward better-determined aggregates.
- [[Empirical Bayes Interpretation of Shrinkage]] — the shrinkage covariance estimator that makes MinT feasible when $m>T$.
- [[Multivariate Persistence and Cointegration]] — modelling cross-series dynamics directly (VAR); MinT instead exploits cross-series *error* correlation after univariate forecasting.

## See Also

- [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]] — the energy score evaluates joint coherent *probabilistic* forecasts; Lemma 1 supplies the Gaussian covariance.
- [[Single Marketing Time Series]] — the ARIMA/ETS base forecasters.
- [[DeepAR and Global Autoregressive Neural Forecasters]] — the DeepAR paper cites Hyndman et al. (2011) as the way to leverage hierarchical structure; base forecasts from any global model can be reconciled.
- [[Geo-Experiment Methodology - Overview]] — geo panels are natural hierarchies.
