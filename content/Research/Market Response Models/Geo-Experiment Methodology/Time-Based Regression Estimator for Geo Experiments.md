---
title: Time-Based Regression Estimator for Geo Experiments
tags:
  - source/ingested
  - topic/market-response
  - topic/geo-experiments
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Kerman Wang Vaver 2017 - Time-Based Regression Geo Experiments.pdf]]"
source_location: "Kerman, Wang & Vaver 2017 §1-3.5, 9.1-9.2 (Introduction, Structure, TBR model, Causal/iROAS analysis, Appendix posterior derivations)"
date_ingested: 2026-07-03
folder: "Market Response Models/Geo-Experiment Methodology"
doc_type: paper
depends_on:
  - "[[Geo-Experiment Methodology - Overview]]"
  - "[[Geo-Experiment Design and Power Analysis]]"
  - "[[Bayesian Structural Time-Series Model]]"
used_by:
  - "[[TBR Design Sensitivity and the Stationarity Assumption]]"
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
aliases:
  - Time-Based Regression
  - TBR
  - TBR model
  - Matched Markets
  - iROAS estimator
---

# Time-Based Regression Estimator for Geo Experiments

> [!summary]
> **Time-Based Regression (TBR)**, from Kerman, Wang & Vaver (2017), analyzes a geo experiment by aggregating all treatment geos into one time series $y_t$ and all control geos into one time series $x_t$, fitting a simple regression of $y_t$ on $x_t$ during the pretest period, and using that fitted relationship to predict the **counterfactual** treatment-group time series during the test period. The difference between observed and counterfactual, cumulated over time, is the posterior distribution of the **incremental causal effect** $\Delta(t)$; dividing cumulative incremental response by cumulative incremental cost gives the **incremental ROAS (iROAS)**. Because TBR only ever needs two aggregate series, it works even with a single treatment geo and a single control geo — a "matched market test" — and it underlies Google's open-source **Matched Markets** / `GeoexperimentsResearch` package.

## Overview

TBR was built to "fill the gap" left by [[Geo-Experiment Design and Power Analysis|Geo-Based Regression (GBR)]]: GBR draws its statistical power from replication *across geos*, so it is inapplicable when only a few geos are available (smaller countries, subregions of a larger country, or a deliberately convenient matched-market test comparing one control region to one test region). TBR instead draws power from replication *across time* in the pretest period, so its precision degrades gracefully as the geo count shrinks rather than becoming undefined.

TBR shares the same underlying experimental structure as GBR — geos partitioned into treatment/control, a **pretest** period (unmodified baseline campaigns in every geo), an **intervention** period (treatment geos' campaigns modified, causing a spend change and hopefully a response change), and a **cooldown** period (campaigns reset, but lagged effects like offline sales may still accrue) — but it aggregates the *data* differently. Where GBR collapses each geo's time series down to two numbers (pretest total, test total) across many geos, TBR collapses across *geos* at every time point, producing one treatment series and one control series over the whole time span (daily or weekly).

TBR is explicitly framed as a simplified, closed-form cousin of Brodersen et al.'s (2015) [[Bayesian Structural Time-Series Model|Causal Impact]]: both predict a counterfactual time series from a pretest-trained model and read off the difference from the observed series, but Causal Impact's flexible state-space model (local level/trend/seasonal components, spike-and-slab covariate selection over many possible controls) is replaced here by a single static linear regression on one control aggregate — appropriate when there is one clean control series and no need to *select* among candidate covariates.

## Main Content

### The TBR pretest model

> [!definition] TBR regression model (Kerman, Wang & Vaver 2017, Eq. 1)
> Let $y_t$ and $x_t$ be the aggregated treatment- and control-group response time series, respectively. During the pretest period,
> $$
> y_t = \alpha + \beta x_t + \epsilon_t, \qquad t \text{ in pretest period}
> $$
> where $\epsilon_t$ are independent Normal errors with standard deviation $\sigma$. The control series is assumed to be a **sufficient predictor** for the treatment series' behavior across the pretest, intervention, and cooldown periods — i.e., the relationship $(\alpha,\beta,\sigma)$ is assumed **stable** absent the ad intervention (equivalently, the residuals are stationary in the absence of the experiment-related marketing change). See [[TBR Design Sensitivity and the Stationarity Assumption]] for the full statement, robustness checks, and what happens when this fails.
^def-tbr-model

The model is fit on pretest data using a **noninformative prior** on $(\alpha,\beta,\log\sigma)$ (Gelman et al. 2013): conditional on $\sigma$, the posterior of $(\alpha,\beta)$ is Normal with mean $VX'y$ and covariance $\sigma^2 V$, $V=(X'X)^{-1}$ — identical in form to the classical OLS point estimate and covariance. Integrating out $\sigma$ gives a scaled/shifted bivariate $t$-distribution for $(\alpha,\beta)$ with $n-2$ degrees of freedom, $n$ = number of pretest time points.

### Counterfactual prediction and the cumulative causal effect

> [!definition] Counterfactual and pointwise causal effect (Eqs. following §3.2)
> For each time $t$ in the test period, the **potential outcome** (counterfactual) is
> $$
> y_t^* = \alpha + \beta x_t + \epsilon_t^*, \qquad t \text{ in test period}
> $$
> Its posterior predictive distribution (again a shifted/scaled $t$-distribution) folds in *both* the estimation uncertainty in $(\alpha,\beta,\sigma)$ and the prediction uncertainty of a new, unobserved error $\epsilon_t^*$. The **pointwise causal effect** is
> $$
> \phi_t = y_t - y_t^*, \qquad t \text{ in test period}
> $$
> Since $y_t^*$ has a posterior distribution and $y_t$ is fixed and observed, $\phi_t$ inherits a posterior distribution too.
^def-tbr-counterfactual

> [!definition] Cumulative causal effect $\Delta(t)$ (Eq. following §3.2)
> $$
> \Delta(t) = \sum_{t'=1}^{t} \phi_{t'}
> $$
> summed from the first day of the intervention period. $\Delta(t)$'s posterior is again a shifted/scaled $t$-distribution — its exact scale is derived without simulation in the Appendix (below).
^def-tbr-cumulative-effect

### Incremental ROAS (iROAS)

> [!definition] iROAS (Kerman, Wang & Vaver 2017, §3.4)
> $$
> \mathrm{iROAS}(t) = \Delta_{\text{resp}}(t) / \Delta_{\text{cost}}(t)
> $$
> the ratio of the cumulative causal effect on the response metric to the cumulative causal effect on marketing cost, at time $t$ in the test period. Both $\Delta_{\text{resp}}$ and $\Delta_{\text{cost}}$ are estimated via TBR Causal Effect Analysis (fit separately, once on the response metric and once on the cost/spend metric); the ratio's posterior is estimated by simulating $N$ (e.g. 10,000) draws from each of the two $t$-distributions and dividing. Point estimates throughout are taken as **posterior medians**.
^def-iroas

As a special case, if the cost metric is exactly zero during the pretest period (the media channel is used for the first time as the marketing intervention), the counterfactual cost is zero with complete certainty, so $\Delta_{\text{cost}}(t)$ is simply the observed cumulative test-period spend — a known constant — and $\mathrm{iROAS}(t)$'s posterior is *exactly* a scaled/shifted $t$-distribution (no simulation needed).

### Appendix: closed-form posterior scale

The Appendix (§9.1–9.2) derives $\mathrm{Var}(\Delta(T)\mid\sigma)$ in closed form,
$$
\mathrm{Var}(\Delta(T)\mid\sigma) = T^2\mathrm{Var}(\alpha) + \mathrm{Var}(\beta)\Big(\sum_t x_t\Big)^2 + 2T\,\mathrm{Cov}(\alpha,\beta)\Big(\sum_t x_t\Big) + T\sigma^2,
$$
which, after integrating over $\sigma$, gives the $t$-distribution scale $Ts\left(v_\alpha + 2\bar x_T v_{\alpha,\beta} + v_\beta \bar x_T^2 + 1/T\right)^{1/2}$ (with $s$ the classical residual-SD point estimate and $v_\alpha, v_\beta, v_{\alpha,\beta}$ entries of the unscaled covariance matrix $V$). Dividing by the cumulative cost $\bar c T$ gives the mean and scale of $\mathrm{iROAS}(T)$'s posterior directly — this closed form is what [[TBR Design Sensitivity and the Stationarity Assumption]] uses to derive how each design choice (pretest length, test length, spend intensity, geo volume) moves the precision of iROAS.

### Why TBR degrades gracefully to very few geos

TBR's estimation only ever consumes **two aggregate time series** — $y_t$ (however many treatment geos are summed into it) and $x_t$ (however many control geos). Unlike GBR, whose variance formula (Eq. 4 of [[Geo-Experiment Design and Power Analysis]]) has $N$ geos entering as replicates, nothing in the TBR model or its fitting procedure requires $N>2$: a single treatment geo regressed against a single control geo is a perfectly well-posed instance of Eq. 1. This is exactly the **matched market test** configuration, and it is the reason TBR underlies Google's open-source **Matched Markets** tool.

## Examples

> [!example] 210-DMA Paid Search revenue experiment (Kerman, Wang & Vaver 2017 §3.3, 3.5)
> All 210 U.S. DMAs were randomly split into treatment/control. Paid Search campaigns were modified in all treatment geos starting April 1 (intervention period) and reset to baseline on April 29 (start of a 1-week cooldown), with an 8-week pretest period. TBR fit to daily **revenue** produced a counterfactual $y_t^*$ that tracked the observed pretest series closely; from the intervention start, the pointwise differences $\phi_t$ became consistently positive, and the cumulative effect $\Delta_{\text{revenue}}(t)$ rose through the end of the intervention period and then flattened — visually diagnosing that the lagged effect had fully died out by the end of the chosen cooldown window. The same analysis on **cost** showed incremental spend rising sharply during the intervention and (as expected) not continuing to accumulate into the cooldown. Combining the two gave a stable cumulative $\mathrm{iROAS}(t)$ estimate — noisy in the first days of the intervention, then converging to a final value with a visibly narrowing posterior band.

## Connections

- **Simplifies** [[Bayesian Structural Time-Series Model|Causal Impact]] (Brodersen et al. 2015): same "train counterfactual on pretest, extrapolate, difference" logic, but with a single static linear regression on one control aggregate instead of a full local-level/trend/seasonal state-space model with covariate selection.
- **Complements** [[Geo-Experiment Design and Power Analysis|GBR]]: same experimental structure (geos, pretest/intervention/cooldown), different statistical engine and different source of power (time replication vs. geo replication) — see the comparison table in [[Geo-Experiment Methodology - Overview]].
- **Feeds into** [[TBR Design Sensitivity and the Stationarity Assumption]], which covers the Monte-Carlo design/power procedure built on this model, the bias/coverage simulation results, and the conditions under which the stability assumption in [[#^def-tbr-model|the pretest model]] fails.
- **Answers the "read-out" step** of [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] with a much simpler model than the full BSTS/CausalImpact machinery that Q&A note invokes.

## See Also
- [[Geo-Experiment Methodology - Overview]] — the topic overview and GBR/TBR comparison table
- [[Geo-Experiment Design and Power Analysis]] — the GBR model and its variance/power analysis
- [[TBR Design Sensitivity and the Stationarity Assumption]] — TBR's design process, bias/coverage evaluation, and the stationarity assumption in depth
- [[Bayesian Structural Time-Series Model]] — the more flexible Bayesian state-space counterfactual model TBR simplifies
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] — the Bayesian EIG framing this estimator is the frequentist counterpart of
- [[SDID for Geo Experiments and Marketing Panels]] — TBR placed in the DiD/SC/SDID taxonomy
- [[Switchback Experiment Design and Analysis]] — model-based versus design-based inference over time
