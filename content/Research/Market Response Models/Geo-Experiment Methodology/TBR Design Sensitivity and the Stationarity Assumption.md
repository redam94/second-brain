---
title: TBR Design Sensitivity and the Stationarity Assumption
tags:
  - source/ingested
  - topic/market-response
  - topic/geo-experiments
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Kerman Wang Vaver 2017 - Time-Based Regression Geo Experiments.pdf]]"
source_location: "Kerman, Wang & Vaver 2017 §4-5, 9.3-9.7 (Design Process, Performance Evaluation, Appendix effect-of-parameter derivations, TBR-OR)"
date_ingested: 2026-07-03
folder: "Market Response Models/Geo-Experiment Methodology"
doc_type: paper
depends_on:
  - "[[Time-Based Regression Estimator for Geo Experiments]]"
  - "[[Geo-Experiment Design and Power Analysis]]"
used_by:
  - "[[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]]"
  - "[[Q - A Unified View of Sensitivity to Assumption Violations]]"
  - "[[Q - Budget Allocation Under Power Laws from Chinchilla to Media Mix]]"
  - "[[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]]"
  - "[[Q - Covariate Adjustment for Precision vs Identification]]"
  - "[[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]]"
  - "[[Q - Using Experiment Results as Priors in a Bayesian MMM]]"
aliases:
  - TBR Design Process
  - TBR Stationarity Assumption
  - TBR-OR
  - Pseudo-Geo-Experiment Design
---

# TBR Design Sensitivity and the Stationarity Assumption

> [!summary]
> [[Time-Based Regression Estimator for Geo Experiments|TBR]]'s precision and validity both hinge on one condition: that the linear relationship between the aggregated treatment and control time series is **stable (stationary)** across the pretest, intervention, and cooldown periods, absent the ad intervention itself. This note covers (1) the Monte-Carlo "pseudo-geo-experiment" procedure Kerman, Wang & Vaver (2017) use to predict a TBR experiment's iROAS confidence-interval half-width before running it, (2) the closed-form and simulated sensitivity of that half-width to each design parameter (spend intensity, pretest length, test length, cooldown length, treatment/control geo volume, and geo count), (3) the paper's simulation-based bias/coverage evaluation, and (4) what happens — and the proposed fix, TBR-OR — when the stability assumption breaks under strong trends or seasonality.

## Overview

Design is as important for TBR as it is for [[Geo-Experiment Design and Power Analysis|GBR]]: without a power analysis, an advertiser either overspends on an experiment more precise than the decision requires, or underspends on one too noisy to act on. Because TBR draws its power from **pretest time points** rather than from geo count, its design levers are different from GBR's, even though the design *process* (predict CI half-width from historical data before spending anything) is directly analogous, and reuses GBR's technique of carving historical data into pseudo pretest/test windows.

## Main Content

### Design process: the pseudo-geo-experiment procedure

> [!definition] TBR design/power-analysis procedure (Kerman, Wang & Vaver 2017 §4.1)
> 1. **Assign treatment geos** per the experimental design (optionally stratified by pretest response volume, as in GBR, pairing adjacent geos by size and randomly picking one of each pair for treatment).
> 2. **Fix design parameters**: total experiment length $N_{exp}$ days (pretest + intervention + cooldown) and the total ad-spend change (assumed known without uncertainty).
> 3. **Generate a distribution of CI half-widths** by building a sequence of simulated "pseudo-geo-experiment" data sets from the available historical time series. Indexing available historical dates $t=1,\dots,T$, extract a data set $D_i$ starting at date $t=i$ and running $N_{exp}$ days, **recycling** dates from the start of the series if the window runs past date $T$ (e.g., $D_{T-1}$ uses dates $\{T-1,T,1,2,\dots,N_{exp}-2\}$). This yields $T$ overlapping-but-distinct pseudo-datasets, each analyzed with the standard TBR/iROAS procedure to produce one CI half-width.
> 4. **Obtain an estimate**: take the **median** of the $T$ generated CI half-widths as the predicted half-width for the real, future experiment.
^def-tbr-design-procedure

This is the direct time-series analogue of the pseudo pretest/test-period + circular-shift procedure GBR uses (see [[Geo-Experiment Design and Power Analysis]]) — both convert a single historical data set into many simulated replicate experiments to characterize sampling variability before committing real spend.

### Sensitivity of the iROAS confidence interval to each design parameter

Using the closed-form posterior scale for iROAS derived in the TBR Appendix (see [[Time-Based Regression Estimator for Geo Experiments#Appendix: closed-form posterior scale]]), the paper works out how each design choice moves the CI half-width:

- **Ad-spend intensity** $\bar c$ (spend change per unit time) is the single most influential parameter: multiplying spend intensity by a factor $f$ (holding everything else fixed) **divides the CI half-width by $f$** — doubling spend intensity halves the uncertainty. This follows directly from the iROAS posterior quantile scaling: $\Pr(\Delta_{\text{resp}}/\Delta_{\text{cost}} < u \mid y) = \alpha \iff \Pr(\Delta_{\text{resp}}/(f\Delta_{\text{cost}}) < u/f\mid y) = \alpha$. (Caveat: larger spend intensity risks hitting diminishing marginal returns, and spend cannot increase without bound due to ad-inventory limits.)
- **Pretest period length** $n$: increasing $n$ increases the precision of $(\alpha,\beta,\sigma)$, and the CI half-width of iROAS shrinks at rate $1/\sqrt n$ — but it is **bounded below**: as $n\to\infty$ the width approaches the asymptote $\sigma_0/(\bar c\sqrt T)$ (Eq. 10), where $\sigma_0$ is the true residual SD and $T$ is the test-period length. More pretest data cannot substitute indefinitely for more test-period data or higher spend intensity.
- **Test/intervention period length** $T$: as long as spend intensity stays constant while $T$ grows, the CI half-width's scale approaches the limit in Eq. 11 — increasing test length improves precision with **diminishing returns**, more so for already-long test periods.
- **Cooldown period length**: extending the cooldown while total spend stays fixed **lowers** the average spend intensity $\bar c=C/T$, so (per Eq. 12) the CI half-width actually **grows** with cooldown length — proportional to $\sqrt T$ for large $T$. A cooldown should be only as long as needed to see the cumulative effect flatten (§3.5), not longer.
- **Control- vs. treatment-group volume**: rescaling the *control* aggregate $x_t$ by a factor (e.g., adding/removing control geos) leaves the iROAS posterior scale **unchanged** — none of the terms in the closed-form scale depend on the absolute level of $x_t$ once $(\alpha,\beta,\sigma)$ are refit. Rescaling the *treatment* aggregate $y_t$ by a factor $\kappa_y$ (e.g., halving the number of treatment geos, keeping ad-spend intensity per geo fixed) rescales the residual SD $s$, and hence the iROAS CI half-width, **by the same factor $\kappa_y$** — fewer treatment geos directly widens the interval (though it also proportionally lowers experiment cost).
- **Number of geos** (in either group): does not enter the TBR estimator directly (only the two aggregates matter), but with very few geos there is less protection from randomization against observed/unobserved biases, so the **residual variance** $\sigma$ tends to be worse (higher), indirectly hurting precision. High correlation between the treatment and control aggregates offsets this.

> [!example] Design process: 210-DMA preanalysis (Kerman, Wang & Vaver 2017 §4.3)
> Using the historical data behind the revenue example in [[Time-Based Regression Estimator for Geo Experiments]] (8-week pretest, 4-week intervention, 1-week cooldown, all 210 DMAs split into two groups of 105), the pseudo-geo-experiment procedure predicted a required spend of **\$22,000** for a target iROAS CI precision. Because \$22,000 exceeded a \$20,000 budget, the target precision was relaxed to $0.5\cdot\$22{,}000/\$20{,}000 = 0.55$ by simple rescaling (no re-simulation needed, since CI half-width scales as $1/f$ in spend). The actual four-week experiment spent **\$18,273** and achieved a precision of **0.62** — the predicted-vs-realized cost for a unit CI half-width differed by only **3%** ($\$20{,}000\cdot0.55=\$11{,}000$ predicted vs. $\$18{,}273\cdot0.62\approx\$11{,}329$ realized), validating the design procedure.

### Bias and coverage evaluation

The paper stress-tests TBR by simulating weekly geo-level sales data with controlled noise and correlation. For $N=20$ geos, each geo's baseline volume $m_i$ is drawn lognormal (normalized to sum to 1); the simulated series is $y_{it} = m_i(0.5\,W_t + 0.5\,Z_{it})$, where $W_t$ is a common seasonal component and $Z_{it}$ is geo-specific noise, both mean-1. The cross-geo correlation is $\rho = \mathrm{Cor}(y_{it},y_{jt}) = c_w^2/(c_w^2+c_z^2)$ and the total coefficient of variation is $c^2=c_w^2+c_z^2$; the paper sweeps $\rho\in\{0,0.5,0.8\}$ and $c\in\{0.15,0.25,0.5\}$, 2000 simulated data sets per $(\rho,c)$ combination.

> [!theorem] TBR coverage and bias (Kerman, Wang & Vaver 2017 §5.2, Figures 7-8)
> Across all nine $(\rho,c)$ scenarios and pretest lengths from 4 to 40 time points, the empirical coverage of TBR's 90% and 50% posterior intervals matched their nominal levels closely, **regardless of noise level, correlation, or pretest length**. The posterior **median** point estimate of iROAS was practically unbiased: the ratio of squared bias to mean squared error, averaged over all scenarios, was **0.04% (SD 0.06%)** — i.e., essentially all of the estimator's error is variance, not bias.
^thm-tbr-coverage-bias

### The stationarity assumption, formally

> [!definition] TBR unbiasedness condition (stability/stationarity assumption)
> TBR is unbiased provided the relationship between the aggregated treatment series $y_t$ and control series $x_t$, $y_t = \alpha+\beta x_t+\epsilon_t$, holds with the **same** $(\alpha,\beta)$ and stationary-error structure across the pretest period (where it is *fit*) and the intervention/cooldown period (where it is *extrapolated*), in the counterfactual absence of the ad intervention. Equivalently: whatever process governs how the control aggregate's movements translate into the treatment aggregate's movements must not itself shift between pretest and test — no differential trend, level shift, or seasonal pattern in the treatment/control relationship that is *not* caused by the ad intervention being measured.
^def-tbr-stationarity

This is exactly the assumption invoked when introducing the model in [[Time-Based Regression Estimator for Geo Experiments#^def-tbr-model]]; this note covers what happens when it is stressed or violated.

### When stationarity fails: TBR-OR and sustained trends

The coverage/bias results above hold when the treatment/control relationship truly is a stable linear regression. The paper stress-tests a **violation**: simulated data with sustained **exponential baseline growth** (e.g., +0.5%/week — a proxy for a strong, sustained trend such as a holiday season or sales event that shifts the treatment/control relationship over the course of the experiment). Under this misspecification:

- TBR's point estimates of iROAS become **biased**, converging toward the true value (2.0) only slowly as correlation $\rho$ between treatment and control rises; coverage of the 90% interval drops well below nominal at low $\rho$ (Figures 9-10).
- The paper proposes **TBR-OR** (orthogonal / Deming regression, an error-in-variables model where the covariate $x_t$ is itself modeled as $x_t = x_t' + \eta_t$ with unknown noise variance, using the empirical ratio $\mathrm{Var}(y)/\mathrm{Var}(x)$ from the pretest period to fix the otherwise unidentifiable variance ratio). Under the same sustained-growth simulation, TBR-OR's point estimates are noticeably less biased.
- However, TBR-OR has its **own failure mode**: when the correlation between $y_t$ and $x_t$ is low (roughly $\rho<0.5$), and especially when there is *little or no seasonality* in the data, TBR-OR's slope estimator becomes unstable (the correlation appears in the denominator of the orthogonal-regression slope estimator), producing extremely unreliable predictions — TBR-OR "should not be used at all" in that regime. Its bootstrap confidence intervals were also found to under-cover more severely than TBR's across the correlation sweep.
- **Conclusion**: TBR is the paper's **default** choice for analysis. TBR-OR is reserved for experiments known to span a period of strong, sustained seasonal or trend change (e.g., a holiday season) — precisely the regime where the plain stationarity assumption is most likely to be stressed.

## Examples

> [!example] Diagnosing assumption failure in practice
> §3.5 of the underlying model note gives the practical diagnostic: if the cumulative causal effect $\Delta(t)$ has not visibly flattened by the end of a reasonably chosen cooldown period, this is itself evidence that the stability assumption or the cooldown-length choice needs revisiting — either a genuine long-lived lagged ad effect, an unexpected event that interfered with the experiment, or (per this note) a shifting treatment/control relationship that TBR's static linear form cannot capture.

## Connections

- **Depends on** the model defined in [[Time-Based Regression Estimator for Geo Experiments]]; this note is the design-process, robustness, and assumption-checking companion to that model note, per the split promised in [[Geo-Experiment Methodology - Overview]].
- **Parallels** [[Geo-Experiment Design and Power Analysis]]'s design/power procedure for GBR: both use historical pretest data resampled into pseudo-experiments to predict CI half-width, and both find that increasing "replication" (geos for GBR, pretest time points for TBR) has diminishing, asymptotically bounded returns.
- **Bounds the applicability** of TBR relative to the more flexible [[Bayesian Structural Time-Series Model|Causal Impact/BSTS]] approach: BSTS's local-level/trend/seasonal state-space components exist precisely to absorb the kind of non-stationary treatment/control drift that breaks TBR's stability assumption and motivates TBR-OR as a partial fix.

## See Also
- [[Time-Based Regression Estimator for Geo Experiments]] — the TBR model, counterfactual prediction, and iROAS posterior this note's design/robustness analysis is built on
- [[Geo-Experiment Design and Power Analysis]] — the analogous GBR design/power procedure
- [[Geo-Experiment Methodology - Overview]] — the topic overview and GBR/TBR comparison table
- [[Bayesian Structural Time-Series Model]] — the more flexible model that handles non-stationary treatment/control relationships
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] — the Bayesian EIG framing this classical design methodology is the frequentist counterpart of
