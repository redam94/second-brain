---
title: Synthetic Difference-in-Differences - Overview
tags:
  - source/ingested
  - topic/econometrics
  - topic/causal-inference
  - topic/panel-data
  - topic/difference-in-differences
  - topic/synthetic-control
  - type/overview
  - doc/paper
source:
  - "[[raw/Arkhangelsky 2021 - Synthetic Difference in Differences.pdf]]"
  - "[[raw/Roth 2022 - Pretest with Caution.pdf]]"
  - "[[raw/Rambachan Roth 2023 - A More Credible Approach to Parallel Trends.pdf]]"
  - "[[raw/Roth 2023 - Whats Trending in Difference-in-Differences.pdf]]"
source_location: "Arkhangelsky et al. 2021 §1-2, pp. 2-11; Roth 2022 Intro, pp. 305-307; Rambachan & Roth 2023 §1, pp. 2555-2559; Roth et al. 2023 §4.3-4.6"
date_ingested: 2026-09-18
folder: "Econometrics/Identification Strategies/Synthetic Difference-in-Differences"
doc_type: paper
depends_on:
  - "[[Differences-in-Differences]]"
  - "[[Synthetic Control]]"
  - "[[Fixed-Effects Model]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[SDID Estimator - Unit and Time Weights]]"
  - "[[SDID vs DiD vs Synthetic Control]]"
  - "[[SDID Inference - Bootstrap, Jackknife and Placebo]]"
  - "[[SDID for Geo Experiments and Marketing Panels]]"
  - "[[Event Study Designs and Dynamic Treatment Effects]]"
  - "[[Pre-Trend Testing and Its Pitfalls]]"
  - "[[Honest DiD - Sensitivity to Parallel Trends Violations]]"
aliases:
  - SDID
  - SDiD
  - Synthetic DiD
  - Synthetic Difference in Differences
  - Arkhangelsky et al. 2021
---

# Synthetic Difference-in-Differences - Overview

> [!summary]
> **Synthetic Difference-in-Differences (SDID)**, from Arkhangelsky, Athey, Hirshberg, Imbens & Wager (2021, *AER*), is a panel-data estimator that fuses [[Differences-in-Differences|DiD]] and [[Synthetic Control|synthetic control (SC)]]. It fits the ordinary two-way fixed-effects (TWFE) DiD regression, but **weighted** by (i) SC-style **unit weights** $\hat\omega_i$ that make the control group's pre-period trend *parallel* to the treated group's, and (ii) **time weights** $\hat\lambda_t$ that pick out the pre-periods most predictive of the post-period. Like SC it weakens reliance on parallel trends; like DiD it is invariant to additive unit shifts and supports large-panel inference. This cluster also covers the *other* modern response to fragile parallel trends: **event-study designs**, Roth's (2022) critique of **pre-trend testing**, and Rambachan & Roth's (2023) **Honest DiD** sensitivity analysis.

## Overview

Two literatures answer the same question — "what would the treated units have looked like without treatment?" — with different crutches.

- **DiD** assumes *parallel trends*: after removing additive unit and time effects, treated and control units would have moved together. It is typically used with many treated units.
- **SC** assumes a *weighted average of control units* can reproduce the treated unit's pre-period path, and hence its counterfactual post-period path. It is typically used with one (or a few) treated units and a long pre-period.

Arkhangelsky et al. argue that "although the empirical settings where DID and SC methods are typically used differ, the fundamental assumptions that justify both methods are closely related" (§1, p. 2). Their estimator is a single weighted TWFE regression:

$$
(\hat\tau^{sdid}, \hat\mu, \hat\alpha, \hat\beta) = \arg\min_{\tau,\mu,\alpha,\beta} \sum_{i=1}^{N}\sum_{t=1}^{T} \left(Y_{it} - \mu - \alpha_i - \beta_t - W_{it}\tau\right)^2 \hat\omega_i^{sdid}\,\hat\lambda_t^{sdid}
$$

DiD is the same regression with no weights (eq. 1.2); SC is the same regression with unit weights $\hat\omega^{sc}$ but **no unit fixed effects $\alpha_i$ and no time weights** (eq. 1.3). The weights make the regression "local": it emphasises control units whose past resembles the treated units' past, and pre-periods that resemble the post-period. The authors identify two benefits: robustness (bias removal when parallel trends fails in the raw data) and — less obviously — precision, because the weights "implicitly remov[e] systematic (predictable) parts of the outcome" (§1, p. 4).

The second half of this cluster concerns what to do when you stay inside the DiD framework and must *defend* parallel trends. The standard defence is the **event-study plot** with insignificant pre-treatment coefficients. Roth (2022) shows this defence is weak: pre-trend tests have low power, and conditioning on passing them can make bias *worse*. Rambachan & Roth (2023) replace the binary pre-test with a **partial-identification sensitivity analysis** that bounds post-treatment violations of parallel trends by what was observed pre-treatment. Arkhangelsky et al. themselves position SDID against this literature: "Our approach uses past data not only to check whether the trends are parallel, but also to construct the weights to make them parallel" (§6, p. 32).

## Main Content

> [!definition] Setting and estimand ^def-sdid-setting
> Balanced panel, $N$ units, $T$ periods, outcome $Y_{it}$, binary treatment $W_{it}$. **Block assignment**: the first $N_{co}$ units are never treated; the last $N_{tr} = N - N_{co}$ units are treated in periods $t > T_{pre}$, so $W_{it} = \mathbf 1\{i > N_{co},\, t > T_{pre}\}$ and $T_{post} = T - T_{pre}$. The target is the average treatment effect on the treated cells,
> $$
> \tau = \frac{1}{N_{tr}T_{post}} \sum_{i=N_{co}+1}^{N}\ \sum_{t=T_{pre}+1}^{T} \tau_{it}
> $$
> (eq. 4.2). Staggered adoption is handled by applying SDID once per adoption date and averaging (Appendix §8).

> [!definition] The three estimators as one regression family ^def-sdid-family
> | Estimator | Unit weights | Time weights | Unit FE $\alpha_i$ | Time FE $\beta_t$ |
> |---|---|---|---|---|
> | DiD (1.2) | uniform $1/N_{co}$ | uniform $1/T_{pre}$ | yes | yes |
> | SC (1.3) | $\hat\omega^{sc}$ (simplex, no intercept) | none (pre-periods unused in the final contrast) | **no** | yes |
> | DIFP (SC with intercept) | $\hat\omega$ with intercept | uniform | yes | yes |
> | **SDID (1.1)** | $\hat\omega^{sdid}$ (simplex, intercept, ridge) | $\hat\lambda^{sdid}$ (simplex, intercept) | yes | yes |
>
> DIFP is the Doudchenko–Imbens (2016) / Ferman–Pinto (2019) "demeaned SC"; the paper reports it to separate the gains from fixed effects from the gains from time weights.

> [!theorem] Headline results of Arkhangelsky et al. (2021) ^thm-sdid-headline
> 1. **Double robustness** (§4.2): the bias term vanishes if *either* the unit weights balance the latent unit factors *or* the time weights balance the latent time factors — see [[SDID vs DiD vs Synthetic Control#^thm-sdid-double-robust|the bias decomposition]].
> 2. **Asymptotic normality** (Theorem 1): under a latent factor model $Y = L + W\circ\tau + E$ with large $N_{co}$, $T_{pre}$ and a comparatively small treated block, $(\hat\tau^{sdid}-\tau)/V_\tau^{1/2} \Rightarrow \mathcal N(0,1)$ with $V_\tau$ of order $1/(N_{tr}T_{post})$ — see [[SDID Inference - Bootstrap, Jackknife and Placebo]].
> 3. **Empirical dominance** (§3): in placebo simulations calibrated to CPS wage data and Penn World Table GDP, SDID has the lowest or near-lowest RMSE and bias among DiD, SC, DIFP and matrix completion in nearly every design.

### Map of the cluster

| Question | Note |
|---|---|
| How exactly are $\hat\omega$, $\hat\lambda$ and $\zeta$ computed? | [[SDID Estimator - Unit and Time Weights]] |
| Why does weighting + fixed effects beat DiD and SC? What do the simulations show? | [[SDID vs DiD vs Synthetic Control]] |
| How do I get a standard error — especially with one treated unit? | [[SDID Inference - Bootstrap, Jackknife and Placebo]] |
| How does this apply to geo tests and marketing panels? | [[SDID for Geo Experiments and Marketing Panels]] |
| How are dynamic effects $\tau_\ell$ estimated and plotted? | [[Event Study Designs and Dynamic Treatment Effects]] |
| Why is "no significant pre-trend" weak evidence? | [[Pre-Trend Testing and Its Pitfalls]] |
| What replaces the pre-test? | [[Honest DiD - Sensitivity to Parallel Trends Violations]] |

### Relevance to marketing measurement and applied work

Geo experiments and market-level campaign evaluations are *exactly* the data shape SDID was designed for: a modest number of geos ($N \approx 50$–$200$ DMAs), a long weekly pre-period, a small block of treated geo-weeks, and outcomes (sales, conversions) dominated by geo-level scale differences plus shared seasonality — i.e. strong additive fixed effects plus an interactive component. Practical implications:

- **Against plain DiD / TWFE** for geo lift: treated markets are rarely chosen at random (pilots go to large or strategic markets), so assignment correlates with latent factors and DiD is biased; SDID's unit weights repair this, and its CPS placebo study shows it is *more precise than DiD even under random assignment*.
- **Against pure SC / [[Time-Based Regression Estimator for Geo Experiments|TBR]]-style level matching**: geos differ by orders of magnitude in volume; SDID's intercept + unit fixed effects mean the donor pool only has to match *trends*, not levels.
- **Against [[Counterfactual Impact Estimation|CausalImpact]]/BSTS**: SDID is a transparent, convex-weight, frequentist alternative with formal asymptotics; BSTS gives a full posterior and handles a single series more flexibly. Reporting both is a useful robustness pairing.
- **For observational (non-randomised) marketing panels** — staggered product launches, regional price changes, platform rollouts — the event-study / pre-trend / Honest DiD notes supply the defensible reporting standard: plot dynamic effects, report the power of the pre-trend test, and report the breakdown value $\bar M$ at which the lift conclusion fails.

## Examples

**California Proposition 99** (§2, Table 1). 39 states, 1970–2000, California treated from 1989: $T_{pre}=19$, $T_{post}=12$, $N_{co}=38$, $N_{tr}=1$. Estimated effect on per-capita cigarette sales (packs/year), with placebo standard errors:

| | SDID | SC | DID | MC | DIFP |
|---|---|---|---|---|---|
| Estimate | $-15.6$ | $-19.6$ | $-27.3$ | $-20.2$ | $-11.1$ |
| Std. error | $(8.4)$ | $(9.9)$ | $(17.7)$ | $(11.5)$ | $(9.5)$ |

DiD's $-27.3$ "likely overstates the effect" because pre-trends are visibly non-parallel; SDID is both smaller in magnitude and has a standard error less than half of DiD's despite being more flexible — "a result of the local fit of SDID (and SC) being improved by the weighting" (p. 8).

Minimal usage with the authors' R package `synthdid`:

```r
library(synthdid)
data("california_prop99")
setup   <- panel.matrices(california_prop99)      # Y (N x T), N0, T0
tau.hat <- synthdid_estimate(setup$Y, setup$N0, setup$T0)
se      <- sqrt(vcov(tau.hat, method = "placebo")) # N_tr = 1 -> placebo only
plot(tau.hat)                                      # parallel-trends picture + time weights
```

## Connections

- [[Differences-in-Differences]] — the unweighted special case; SDID is "DiD on a reweighted panel."
- [[Synthetic Control]], [[Synthetic Control Bias Theory]], [[Synthetic Control Requirements]] — SDID's unit weights are ADH weights plus an intercept and ridge penalty; the factor-model bias analysis parallels Abadie's.
- [[Generalized Synthetic Control Method]] — the explicit-factor-model alternative (Xu 2017). SDID balances the latent factors *without estimating them* and needs weaker assumptions (no known rank, no strong-factor condition).
- [[Synthetic Control Extensions]] — augmented SC (Ben-Michael, Feller & Rothstein) is nearly equivalent to SDID with a linear outcome model.
- [[Fixed-Effects Model]] — the TWFE regression being weighted.
- [[Difference-in-Differences with Multiple Time Periods - Overview]] — the Callaway–Sant'Anna cluster for staggered adoption; the event-study note links the two.
- [[Bayesian Difference in Differences]] — a Bayesian treatment of the same parallel-trends problem.
- [[Randomization Inference - Overview]] — placebo inference for SDID is a permutation-style procedure.

## See Also

- [[Synthetic Control Inference and Diagnostics]]
- [[Standard Errors and Clustering]]
- [[Geo-Experiment Methodology - Overview]]
- [[Sensitivity Analysis in Observational Studies]]
- [[Group-Time Average Treatment Effects]]
- [[Aggregating Group-Time Effects]]
