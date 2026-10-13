---
title: "AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/market-response
  - type/example
  - type/application
  - doc/paper
source: "[[raw/Zhang Vaver 2017 - Introduction to the Aggregate Marketing System Simulator.pdf]]"
source_location: "Zhang & Vaver (2017) §4 p.23; §4.1.1 pp.23-26 (Eqs. 4-5, Figs. 7-9); §4.1.2 pp.26-27 (Figs. 10-12); §4.1.3 pp.27-28 (Table 4); §4.1.4 pp.28-29 (Eq. 6, Fig. 13, Table 5); §4.2.1-4.2.3 pp.29-31 (Table 6, Eq. 7, Table 7, Fig. 14)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Zhang Vaver 2017 - Aggregate Marketing System Simulator"
doc_type: paper
depends_on:
  - "[[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]"
  - "[[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics]]"
  - "[[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]]"
  - "[[AMSS Paid Search Module (Queries, Auction, Organic vs Paid)]]"
  - "[[AMSS Sales Event - Demand Curves, Competition and Post-Purchase Migration]]"
used_by:
  - "[[AMSS Discussion, Limitations and Validation Practice]]"
aliases:
  - AMSS simple scenario
  - AMSS lag experiment
  - AMSS regression MMM bias and MSE
---

# AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study

> [!summary]
> The paper demonstrates AMSS with a deliberately easy two-channel world: TV and paid search, 156 observed weeks,
> 1,000 datasets, known seasonality, no lag, no interactions. It scores a **linear regression MMM** against simulated
> ground-truth ROAS and mROAS. In the easy case regression does reasonably (TV ROAS bias −0.16, MSE 0.15). It then adds
> **one complication**: TV carryover of strength $\alpha=0,\dots,0.5$. A no-lag model's year-4 TV-ROAS MSE rises from
> **0.025 to 1.618**, almost entirely through **negative bias**. A model with three weeks of lagged TV terms cuts it to
> **0.002-0.067**, at the cost of more variance, and its bias still drifts negative as $\alpha$ grows.

## Overview

§4 shows the evaluation workflow, not a recommended MMM (§5, p.31). The design is **one-factor-at-a-time**: start from
an ad system "where basic linear regression performs well," then add a single complicating factor, lag of increasing
strength (§4, p.23). In [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview|ADEMP]] terms:

| ADEMP | §4 choice |
|---|---|
| **A**ims | Does OLS recover TV and search ROAS/mROAS? How does unmodelled carryover degrade it? |
| **D**GM | AMSS simple scenario; then $\alpha\in\{0,0.1,\dots,0.5\}$ lag on favorability |
| **E**stimands | Per-year ROAS and mROAS of TV and search, as ground truth by counterfactual (Table 4, Table 6) |
| **M**ethods | Model 1 (Eq. 6, no lag), Model 2 (Eq. 7, three TV lags) |
| **P**erformance | Bias and MSE over 1,000 datasets; histograms and violin plots of estimates |

## Main Content

### 4.1.1 Simple scenario specification

> [!definition] Simple scenario: simplifying assumptions (§4.1.1, p.23)
> - No lagged effects.
> - No satiation: buyers stay in-market and active.
> - No interaction between the two channels.
> - **Seasonality is made known to the model.** The paper flags this as a simplification (§4.1.4, p.28): "in reality,
>   advertiser knowledge of measures of seasonality, such as the base sales (used here), is imperfect." Real MMMs
>   estimate or proxy seasonality, so the biases reported here are a floor rather than a typical case.
> - Constant competitive pressure.
^def-amss-simple-assumptions

| Component | Setting | Source |
|---|---|---|
| Horizon | 4 years of weekly data = 208 weeks; **year 1 is burn-in**, so years 2-4 (156 weeks) are observed | pp.23, 26 |
| Population | 240 million | p.23 |
| Market rate | 52-week sinusoid centred at 0.42, amplitude 0.175, × AR(1) with mean 1, SD 0.1, autocorrelation 0.3 (Fig. 7) | p.23 |
| Activity natural migration | row-identical $\mathcal Q^{(3)}=Q^{(3)}$ with rows $(0.60,0.30,0.10)$ (Eq. 4): 60% inactive, 30% exploratory, 10% purchase | pp.23-24 |
| Favorability natural migration | row-identical $\mathcal Q^{(4)}=Q^{(4)}$ with rows $(0.03,0.07,0.65,0.20,0.05)$ (Eq. 5) | p.24 |
| Event order | TV, then paid search | p.24 |
| TV audience | 40% of every segment (mass, untargeted) | p.24 |
| TV budget | \$109M, \$95M, \$84M, \$91M for years 1-4; highly variable weekly flighting (Fig. 8) | pp.24-25 |
| TV effect | favorability only, $\mathcal Q^{(tv,4)}$ (see [[AMSS Traditional Media Module (Reach, Frequency, Hill Effect)]]); Hill $\kappa=1.56$, $\zeta=1$ (Fig. 9) | pp.24-25 |
| TV effect size | "strong" (citing Chan & Perry 2017) | p.24 |
| Search audience | ads on queries from 1% / 30% / 40% of inactive / exploratory / purchase | p.25 |
| Search CTR | 0.005 / 0.08 / 0.10; no dependence on favorability | p.25 |
| Search settings | uncapped spend, fixed keywords; bid linear in budget from 0.8 at zero budget; budget increases each year | p.25 |
| Search effect | activity only, $\mathcal Q^{(search,3)}$ rows $(0.05,0.95,0)$, $(0,0.85,0.15)$, $(0,0,1)$; $\psi=(0,0.1,1)$ | p.26 |
| Sales | price \$40; all switchers with average availability; purchase probability by favorability $(0.014,0,0.2,0.3,0.9)$; $\gamma\equiv0.8$, $\omega\equiv0$ | p.26 |

### 4.1.2 Data (Figs. 10-12)

- **1,000 datasets** generated (p.26).
- **Fig. 10:** TV spend is spiky and high-variance. Search spend follows the seasonal market rate.
- **Fig. 11:** query volume, paid impressions and paid clicks all track seasonality and are highly correlated within each
  year. Paid impressions approach query volume as bids, and so SOV, rise each year.
- **Base sales** come from the all-zero-budget counterfactual, averaged over 1,000 runs, and are about **95% of total
  sales**. They are used as the **observed seasonality regressor** $x^{(\text{seas})}$ so that the study can focus on
  other issues (pp.26-27).
- **Fig. 12:** weekly revenue (about \$50-200M) and base sales overlap closely. Media adds a thin layer on top of a
  strongly seasonal base.

### 4.1.3 Ground truth (Table 4)

See [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS#^def-amss-mroas-base]] for the method.

| Year | TV ROAS | TV mROAS | Search ROAS | Search mROAS |
|---|---|---|---|---|
| 2 | 1.79 (0.00) | 0.41 (0.02) | 1.90 (0.00) | 1.94 (0.03) |
| 3 | 2.11 (0.00) | 0.40 (0.02) | 1.85 (0.00) | 1.52 (0.03) |
| 4 | 2.23 (0.00) | 0.47 (0.02) | 1.86 (0.00) | 1.76 (0.08) |

### 4.1.4 Model 1 and results (Eq. 6, Table 5, Fig. 13)

> [!definition] Model 1: regression MMM with seasonal interactions and TV curvature (Eq. 6, p.28)
> $$\begin{aligned}y_t={}&\beta_0+\beta_{tv}x^{(tv)}_t+\beta_{search}x^{(search)}_t+\beta_{seas}x^{(seas)}_t\\&+\beta_{tv,seas}x^{(tv)}_tx^{(seas)}_t+\beta_{search,seas}x^{(search)}_tx^{(seas)}_t\\&+\beta_{tv^{1/2}}\bigl(x^{(tv)}_t\bigr)^{1/2}+\beta_{tv^{1/3}}\bigl(x^{(tv)}_t\bigr)^{1/3}+\epsilon_t,\qquad\epsilon_t\sim N(0,\sigma^2).\end{aligned}$$
> $y_t$ is weekly sales (revenue), $x^{(\cdot)}_t$ is weekly spend, and $x^{(seas)}_t$ is observed base sales. The
> seasonal interactions let media effects scale with market size. The square- and cube-root TV terms approximate
> diminishing returns. The paper calls it "clearly a very simplified representation of the data-generating model, but
> it produces reasonable results" (p.28).
^def-amss-model1

How ROAS and mROAS are extracted from the fitted regression is **not spelled out**. Presumably they come from
counterfactual prediction: set a channel's spend to zero, or scale it by 0.95, within the year and difference the
predicted sales.

**Table 5: bias and MSE over 1,000 datasets (p.29)**

| metric | TV ROAS | TV mROAS | Search ROAS | Search mROAS |
|---|---|---|---|---|
| bias | −0.16 | 0.05 | −0.10 | −0.00 |
| MSE | 0.15 | 0.05 | 0.14 | 0.09 |

**Fig. 13 (p.29):** histograms of the 1,000 estimates with the true value as a vertical line. TV ROAS estimates are
tightly concentrated just *below* the truth. TV mROAS estimates are tight near 0.5. Search ROAS and mROAS estimates are
wider, spread around 1.5-2.0. The paper attributes the small TV bias to "lack of model fit for the nonlinear effect of
television" (p.28).

> [!note] A reading caveat on Table 5 vs Table 7
> At $\alpha=0$, Model 1's **year-4** TV-ROAS MSE is 0.025 (Table 7). Table 5 reports TV-ROAS MSE 0.15 with bias −0.16,
> whose square alone is 0.026. So Table 5 is probably pooled over years 2-4 or defined differently. The paper does not
> say which. Neither table reports **Monte Carlo SEs** of bias or MSE.
^note-amss-reading-caveat-on-table

### 4.2 Lagged-effects study

> [!definition] Lag manipulation (§4.2.1, p.29)
> Natural favorability migration becomes $\mathcal Q^{(4)}=Q^{(4)}_\alpha=(1-\alpha)Q^{(4)}+\alpha I_5$ for
> $\alpha=0.1,\dots,0.5$ (plus the baseline $\alpha=0$). A fraction $\alpha$ of TV-induced favorability shifts persists
> each week ([[AMSS Natural Migration, Satiation and Lagged-Effect Mechanics#^thm-amss-lag-family]]). To hold the
> **total** advertising effect (nearly) constant, TV's maximal matrix is shrunk towards the identity by the same
> $\alpha$: $\mathcal Q^{(tv,4)}_\alpha=(1-\alpha)\mathcal Q^{(tv,4)}+\alpha I_5$. Everything else is as in §4.1.
^def-amss-lag-manipulation

The normalisation reasoning: with persistence $\alpha$, a unit initial shift accumulates
$1+\alpha+\alpha^2+\dots=1/(1-\alpha)$ over time. Scaling the off-diagonal (initial) effect by $(1-\alpha)$ keeps the
long-run total roughly constant. This is our reading of "hold the total advertising effect (nearly) constant." The
paper does not show the algebra.

**Table 6: Year-4 same-year ground truth by lag (p.30)**

| lag $\alpha$ | TV ROAS | TV mROAS | Search ROAS | Search mROAS |
|---|---|---|---|---|
| 0 | 2.23 | 0.47 | 1.86 | 1.76 |
| 0.1 | 2.22 | 0.46 | 1.86 | 1.83 |
| 0.2 | 2.20 | 0.47 | 1.86 | 1.94 |
| 0.3 | 2.18 | 0.49 | 1.86 | 1.78 |
| 0.4 | 2.15 | 0.47 | 1.86 | 1.85 |
| 0.5 | 2.11 | 0.41 | 1.86 | 1.69 |

Same-year TV ROAS falls slightly with $\alpha$, because part of the year's total impact now lands at the start of the
next year (p.30). Search is unaffected because it does not act through favorability. Search mROAS bounces around
(1.69-1.94), within its Monte Carlo noise (margin about 0.08 in Table 4).

> [!definition] Model 2: Model 1 plus distributed TV lags (Eq. 7, p.30)
> $$\begin{aligned}y_t={}&\beta_0+\beta_{tv}x^{(tv)}_t+\textstyle\sum_{j=1}^{3}\beta_{tv,j}x^{(tv)}_{t-j}\\&+\beta_{tv^{1/2}}\bigl(x^{(tv)}_t\bigr)^{1/2}+\textstyle\sum_{j=1}^{3}\beta_{tv^{1/2},j}\bigl(x^{(tv)}_{t-j}\bigr)^{1/2}+\beta_{tv^{1/3}}\bigl(x^{(tv)}_t\bigr)^{1/3}\\&+\beta_{search}x^{(search)}_t+\beta_{seas}x^{(seas)}_t+\beta_{tv,seas}x^{(tv)}_tx^{(seas)}_t+\beta_{search,seas}x^{(search)}_tx^{(seas)}_t .\end{aligned}$$
> That is six added terms: linear and square-root TV spend at lags 1-3. There is an unrestricted
> distributed-lag structure ([[Carryover Effects and Distributed Lags]]) and no parametric adstock.
^def-amss-model2

**Table 7: MSE of Year-4 TV estimates (p.31)**

| lag $\alpha$ | ROAS Model 1 | ROAS Model 2 | mROAS Model 1 | mROAS Model 2 |
|---|---|---|---|---|
| 0 | 0.025 | 0.002 | 0.003 | 0.013 |
| 0.1 | 0.191 | 0.005 | 0.003 | 0.006 |
| 0.2 | 0.470 | 0.010 | 0.023 | 0.001 |
| 0.3 | 0.819 | 0.017 | 0.068 | 0.002 |
| 0.4 | 1.215 | 0.032 | 0.096 | 0.005 |
| 0.5 | 1.618 | 0.067 | 0.097 | 0.005 |

**Fig. 14 (p.31):** violin plots of the **bias** of year-4 TV estimates against $\alpha$. Values below are read off the
plot and are approximate.

| | Model 1 | Model 2 |
|---|---|---|
| ROAS bias | about −0.15 at $\alpha=0$, falling roughly linearly to about −1.25 at $\alpha=0.5$ | about 0 at $\alpha=0$, drifting to about −0.25 at $\alpha=0.5$ |
| mROAS bias | about +0.05 at 0, falling to about −0.3 at $\alpha\ge0.4$ | about +0.1 at 0, falling to about −0.07 at $\alpha\ge0.3$ |

> [!theorem] Lag-study findings (§4.2.3, p.30)
> 1. Model 1's MSE growth "is driven by the bias. As the amount of lag grows, Model 1 increasingly underestimates the
>    impact of television." The model misses TV's effect in later weeks and so attributes less to TV.
> 2. "Model 2 mostly corrects this bias in exchange for somewhat larger variance."
> 3. "The correction is not perfect; the bias still becomes more negative as the lag increases." Three lags truncate a
>    geometric tail of rate $\alpha$. For a normalised geometric impulse with weights $(1-\alpha)\alpha^j$, the share
>    beyond lag 3 is $\alpha^4$, about 6% at $\alpha=0.5$ (our arithmetic). That alone does not explain all of the
>    residual bias.
> 4. "This same set of simulations could be used to evaluate alternative models that might be proposed to more
>    accurately account for lag."
^thm-amss-lag-findings

Other patterns visible in the tables:
- At $\alpha=0$ the flexible Model 2 has **lower** ROAS MSE (0.002 vs 0.025) but **higher** mROAS MSE (0.013 vs 0.003).
  The extra lag terms add variance to the marginal (derivative-like) estimate when there is no lag to capture. The
  winning model **depends on the estimand**.
- Model 1's mROAS MSE grows much more slowly than its ROAS MSE (0.097 at most). Lag mostly mis-states the *level* of
  TV's contribution rather than its *slope*.

## Examples

> [!example] Bias-variance reading of Table 7 at $\alpha=0.5$
> Model 1 ROAS MSE is 1.618 and its Fig. 14 bias is about −1.25, so bias² ≈ 1.56 and variance ≈ 0.06. The error is
> almost pure bias. Model 2 ROAS MSE is 0.067 with bias about −0.25, so bias² ≈ 0.06 and variance is small. Model 2 is
> still mostly bias at this lag, just much less of it. The bias values are approximate, read off Fig. 14.
^ex-amss-bias-variance-reading-table

## Connections

- **Misspecified lag is a first-order threat.** An MMM's ROAS can be off by more than half its true value (a bias of
  about −1.25 on a truth of 2.11) purely from omitted carryover. That is why the Bayesian MMM literature puts adstock in
  the model ([[Carryover (Adstock) Functional Forms]], [[Bayesian Media Mix Modeling - Overview]]).
- **Model choice by fit vs by recovery.** The paper does not report fit statistics. But media is only about 5% of
  sales, so both models presumably fit sales closely. Only the
  ground-truth comparison shows Model 1's failure. In-sample fit, or even out-of-sample forecast accuracy on a series
  dominated by base sales, cannot rank models by ROAS accuracy. See [[Model Selection and Overfitting]],
  [[Forecast Evaluation and Backtesting]] and [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]].
- **Signal-to-noise.** Media is about 5% of sales here, an easy case by the standards of
  [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]. The TV flighting was chosen for strong
  signal. Weaker signal would widen every histogram.
- **Analyst degrees of freedom.** Choosing among Eq. 6-style specifications (which root terms, how many lags, which
  interactions) by in-sample fit is a garden of forking paths. Simulation with known truth is one guard against it
  ([[Researcher Degrees of Freedom]], [[Garden of Forking Paths]]).

## See Also

- [[AMSS Ground Truth - Counterfactual Scenarios and Simulated ROAS]]
- [[AMSS Discussion, Limitations and Validation Practice]]
- [[MMM Model Selection and Application]]
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]
