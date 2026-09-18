---
title: SDID for Geo Experiments and Marketing Panels
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/geo-experiments
  - topic/market-response
  - topic/panel-data
  - type/application
  - doc/paper
source: "[[raw/Arkhangelsky 2021 - Synthetic Difference in Differences.pdf]]"
source_location: "§2.2 (Prop 99, Table 1, Fig. 1), pp. 8-11; §3.1-3.2 (placebo studies, Tables 2-3), pp. 12-18; §5 (Table 4; placebo inference), pp. 28-31; Appendix §8 (staggered adoption)"
date_ingested: 2026-09-18
folder: "Econometrics/Identification Strategies/Synthetic Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Synthetic Difference-in-Differences - Overview]]"
  - "[[SDID Estimator - Unit and Time Weights]]"
  - "[[SDID vs DiD vs Synthetic Control]]"
  - "[[SDID Inference - Bootstrap, Jackknife and Placebo]]"
  - "[[Geo-Experiment Methodology - Overview]]"
used_by: []
aliases:
  - SDID geo lift
  - SDID for marketing measurement
  - Synthetic DiD geo experiments
  - SDID matched market test
---

# SDID for Geo Experiments and Marketing Panels

> [!summary]
> An applied reading of Arkhangelsky et al. (2021) for marketing measurement. A geo test *is* a block-assignment panel: geos $\times$ weeks, a handful of treated geos, a short treated window. The paper's two placebo studies map onto the two regimes practitioners face — **many treated geos with a DiD-like design** (CPS study) and **one or few treated markets with a long history** (Prop 99 / Penn World Table). The evidence supports three claims relevant to geo lift: (1) when treated markets are *not* randomly chosen, TWFE DiD is biased and SDID largely is not; (2) even when they *are* randomised, SDID is roughly twice as precise as DiD because it soaks up predictable variation; (3) with a single treated market the only available SDID standard error is the placebo one, which assumes all geos are equally noisy — an assumption that needs care when DMAs differ by orders of magnitude. **The mapping to marketing is this note's interpretation; the numbers are the paper's.**

## Overview

The vault's geo-experiment notes describe Google's two estimators: [[Geo-Experiment Design and Power Analysis|GBR]], a cross-sectional regression over many randomised geos, and [[Time-Based Regression Estimator for Geo Experiments|TBR]], a time-series regression of the aggregated treatment series on the aggregated control series that works with as few as one geo per arm. [[Counterfactual Impact Estimation|CausalImpact]] generalises TBR to a Bayesian structural time-series with multiple control series. In the taxonomy of [[SDID vs DiD vs Synthetic Control]]:

| Marketing estimator | Closest panel estimator | What it leans on |
|---|---|---|
| Pre/post DiD on geo means; TWFE lift regression | DiD | additive geo + week effects (parallel trends) |
| GBR (test-period response on pre-period response + spend delta) | DiD with a lagged-outcome control | cross-geo regression, randomisation |
| TBR (aggregate treatment on aggregate control) | SC with **one** donor series, intercept and free slope | a *stable* linear relation between the two aggregates |
| CausalImpact / BSTS with many control geos | SC / "vertical regression" with a time-series prior | control series predict the treated series |
| GeoLift-style augmented SC | augmented SC $\approx$ SDID (§6, eq. 6.1) | unit weights + outcome model |
| **SDID** | — | unit weights *and* time weights *and* two-way fixed effects |

SDID contributes two things the TBR/SC family lacks: **time weights** (which pre-period weeks should serve as the baseline?) and **unit fixed effects with an intercept in the weight problem** (so donors need only match trends, not levels).

## Main Content

> [!definition] A geo test as an SDID panel ^def-sdid-geo-panel
> Rows $i$ = geos (DMAs, regions, stores); columns $t$ = weeks (or days); $Y_{it}$ = response (sales, conversions, site visits — often per-capita or logged); $W_{it}=1$ for treated geos during the campaign window. $N_{co}$ = untreated geos, $T_{pre}$ = pretest weeks, $T_{post}$ = test (+ cooldown) weeks. The estimand $\tau$ (eq. 4.2) is the average per-geo-week lift over the treated cells; total incremental response is $\tau\cdot N_{tr}T_{post}$ (after undoing any per-capita scaling), and
> $$
> \text{iROAS} = \frac{\hat\tau\cdot N_{tr}T_{post}}{\text{incremental spend}}
> $$
> Theorem 1's regime — $N_{co},T_{pre}$ large, treated block small — describes "a few test markets, 100+ control DMAs, a year of weekly history, 4–8 test weeks" well.

> [!example] Lesson 1 — non-random market selection biases DiD (CPS study) ^ex-sdid-geo-selection
> In the CPS design, $N=50$ states, $T=40$, and placebo treatment is assigned with probability depending on each state's fixed effect $\alpha_i$ and interactive loading $M_i$ (fit to real minimum-wage adoption; $R^2$ of 15–30%). True effect is zero. Result (Table 2): DiD RMSE 0.049 with bias 0.021; SDID RMSE 0.028 with bias 0.010. Figure 2's left panel shows the DiD error distribution "visibly off-center."
>
> **Marketing reading.** Pilot markets are usually picked for a reason — high penetration, a strong sales team, a retailer partnership, recent growth. Those reasons are precisely "latent unit factors correlated with assignment." A TWFE lift read in that setting inherits a first-order bias that no clustering of standard errors will fix.

> [!example] Lesson 2 — randomisation does not make DiD efficient ^ex-sdid-geo-precision
> Under *completely random* assignment in the same CPS design all estimators are unbiased, yet RMSE is 0.024 for SDID versus 0.044 for DiD (Table 2, "Random" row); on Penn World Table data 0.037 vs 0.129 (Table 3). The authors: DiD's noise "can be substantially reduced by using an estimator like SDID that can exploit predictable variation by matching on pre-exposure trends."
>
> **Marketing reading.** In a properly randomised geo experiment the choice of *analysis* estimator is a power decision. Halving RMSE is equivalent to roughly quadrupling the number of treated geo-weeks — or to detecting a lift half the size at the same spend. This is the same motivation as GBR's pre-period covariate and TBR's regression on the control series, pursued more aggressively.

> [!example] Lesson 3 — the single-test-market case (Prop 99) ^ex-sdid-geo-single
> California vs 38 donor states, 19 pre-years, 12 post-years: DiD $-27.3\ (17.7)$, SC $-19.6\ (9.9)$, SDID $-15.6\ (8.4)$. SC's counterfactual is essentially five states (Utah 0.396, Montana 0.232, Nevada 0.204, Connecticut 0.104, New Hampshire 0.045); SDID spreads weight over about 30 states and its time weights use only 1986–88. In the simulations with $N_{tr}=1$, RMSE is 0.063 (SDID) vs 0.072 (SC) vs 0.126 (DiD).
>
> **Marketing reading.** A "matched-market test" with one treated DMA is an SC problem. SDID's more dispersed donor weights reduce dependence on any single control market (a control DMA hit by a competitor promotion, a weather event, a stock-out) — Figure 1 shows no state with high influence under SDID, while New Hampshire is highly influential under both DiD and SC. The time weights' focus on the most recent pre-period is sensible when the market has drifted (new distribution, pricing changes) and older history is a poor baseline.

### Practical checklist

1. **Scale the outcome.** SDID is invariant to additive geo shifts, not multiplicative ones. With DMAs spanning orders of magnitude, use per-capita or log outcomes so that an *additive* geo effect is plausible — and so that the placebo method's homoskedasticity assumption is less absurd. (The paper's applications use per-capita packs and log wages/GDP.)
2. **Pre-period length.** The theory needs $T_{pre}\to\infty$ at the rate of $N_{co}$ (Assumption 2). With 8 pretest weeks and 150 control DMAs the time-weight regression is badly under-determined; use a long weekly history (the [[TBR Design Sensitivity and the Stationarity Assumption|TBR design guidance]] on pretest length applies a fortiori).
3. **Seasonality.** Shared seasonality is a time fixed effect $\beta_t$ and is differenced out. *Geo-specific* seasonality (ski markets vs beach markets) is an interactive factor; unit weights handle it by picking donors with the same seasonal loading, and time weights help by choosing pre-weeks that resemble the test window — a data-driven version of "use the same weeks last year."
4. **Inference.** Many treated geos ($N_{tr}\gtrsim 10$): bootstrap or jackknife. One or a few: placebo only. If geos were **randomised**, the placebo reassignment has a genuine design-based interpretation ([[Randomization Inference - Overview]]); if hand-picked, the paper warns it must be read "via a more qualitative lens."
5. **Covariates** (price, distribution, weather): residualise $Y_{it}$ on $X_{it}$ first (fn. 4).
6. **Staggered rollouts** (campaign waves by region): run SDID per adoption cohort against never-treated geos and average by treated-cell share (Appendix §8); compare with [[Group-Time Average Treatment Effects|Callaway–Sant'Anna $ATT(g,t)$]].
7. **Carryover.** $\tau$ averages over the chosen post window. Include cooldown weeks in $T_{post}$ if adstock is expected ([[Carryover Effects and Distributed Lags]]); for the week-by-week profile use an [[Event Study Designs and Dynamic Treatment Effects|event-study]] presentation.
8. **Spillovers.** SDID assumes controls are unaffected (SUTVA). Media bleed across DMA borders or national halo contaminates donors; exclude adjacent geos from the donor pool.
9. **Report diagnostics.** Plot treated vs synthetic trajectories (should be *parallel*, not overlapping), the unit weights, and the time weights. If conclusions depend on parallel trends holding after reweighting, add a [[Honest DiD - Sensitivity to Parallel Trends Violations|breakdown analysis]].

### When *not* to prefer SDID

- **Short panels / few controls** — asymptotics fail; a designed experiment analysed with GBR or a [[Bayesian Difference in Differences|Bayesian DiD]] with informative priors may be more honest.
- **Pure-noise panels** — if there is little systematic heterogeneity, "the unequal weighting of units and time periods may worsen the precision" relative to DiD (§1, p. 4; "Only noise" row of Table 2: 0.016 vs 0.014).
- **You need a posterior** for downstream decision analysis or to calibrate a media mix model prior — [[Counterfactual Impact Estimation|BSTS]] gives one directly; SDID gives a point estimate and a Gaussian interval (which can still be used as a likelihood summary for MMM calibration).
- **A large share of geos treated** — Assumption 2 requires the treated block to be small relative to controls; a 50/50 national split is outside the theory (though the "Resample" rows of Table 4 with 10% treated show good coverage).

## Examples

A geo-lift read with `synthdid`, including the recommended scaling and inference choice:

```r
library(synthdid); library(dplyr)

panel <- geo_weekly %>%                       # columns: dma, week, sales, pop, treated (0/1 by cell)
  mutate(y = log(sales / pop)) %>%
  select(dma, week, y, treated) %>% as.data.frame()

s   <- panel.matrices(panel)                  # Y, N0, T0 (block design; balanced panel required)
est <- synthdid_estimate(s$Y, s$N0, s$T0)
did <- did_estimate(s$Y, s$N0, s$T0)          # same API, for comparison
sc  <- sc_estimate(s$Y, s$N0, s$T0)

n_tr   <- nrow(s$Y) - s$N0
method <- if (n_tr == 1) "placebo" else "bootstrap"
se     <- sqrt(vcov(est, method = method))

c(lift_pct = 100 * (exp(est) - 1),
  lo = 100 * (exp(est - 1.96 * se) - 1),
  hi = 100 * (exp(est + 1.96 * se) - 1))

synthdid_units_plot(est)                      # which control DMAs carry the weight
plot(est, overlay = 1)                        # overlay synthetic on treated to inspect parallelism
```

(The package API shown is from the authors' `synthdid` repository cited in the paper's title footnote; the data frame is illustrative.)

## Connections

- [[Geo-Experiment Methodology - Overview]] — the experimental-design context; SDID is an *analysis* estimator that can replace or complement GBR/TBR.
- [[Time-Based Regression Estimator for Geo Experiments]] — single-donor, time-series analogue; its stability assumption is the time-series version of "unit weights generalise to the post-period."
- [[TBR Design Sensitivity and the Stationarity Assumption]] — pre-period length and stability diagnostics carry over.
- [[Counterfactual Impact Estimation]], [[Bayesian Structural Time-Series Model]], [[CausalImpact Empirical Application]] — the Bayesian counterfactual-forecast alternative.
- [[Synthetic Control]], [[Synthetic Control Requirements]] — donor-pool hygiene (no spillovers, no idiosyncratic shocks) applies unchanged.
- [[Bayesian Media Mix Modeling - Overview]] — lift estimates as calibration targets/priors for MMM.

## See Also

- [[SDID Inference - Bootstrap, Jackknife and Placebo]]
- [[Power Analysis and Sample Size]]
- [[Pre-Trend Testing and Its Pitfalls]]
- [[Differences-in-Differences]]
