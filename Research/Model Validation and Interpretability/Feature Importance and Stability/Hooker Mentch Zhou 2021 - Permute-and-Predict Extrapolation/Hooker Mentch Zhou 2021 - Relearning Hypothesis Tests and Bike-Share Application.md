---
title: "Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - type/example
  - type/concept
  - doc/paper
source: "[[raw/Hooker Mentch Zhou 2021 - Unrestricted Permutation Forces Extrapolation.pdf]]"
source_location: "Hooker, Mentch & Zhou (2021), arXiv:1905.03151v2, §5.1 'Ordering vs. Testing: A Further Word of Caution' pp. 14-16 (Fig. 8, p. 15); §5.2 'Real World Data: Bike Sharing' p. 16 (Fig. 9, p. 17)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation"
doc_type: paper
depends_on:
  - "[[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]]"
  - "[[Permutation Tests and Exact Inference]]"
used_by:
  - "[[Hooker Mentch Zhou 2021 - Partial Dependence Alternatives and Conclusions]]"
aliases:
  - Ordering vs Testing in Variable Importance
  - Permute-and-relearn test size inflation
  - Bike-sharing OOB vs relearn importance
---

# Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application

> [!summary]
> **§5.1:** refitting fixes importance **rankings**, but it is not enough for **hypothesis tests** of importance if the muted features are replaced by unconditional **permutations**. In a simulation with $q$ pure-noise features, each correlated 0.7 with one of 10 real features (so the noise is independent of $y$ given the real features), a permute-and-relearn test rejects the null **far above the nominal 5%**, increasingly so as $q$ grows. Replacements drawn from the **true conditional** distribution, or Model-X **knockoffs**, keep rejections near 5%. **§5.2:** on hourly bike-share data, out-of-bag permutation importance ranks `temp` highly while permute-and-relearn ranks it low. Screening on OOB importance might keep `temp` and drop `yr`.
^summary-hmz-testing-bikeshare

## Overview

The two subsections cover two distinct uses of importance. One is **ordering**, where features are ranked or screened. The other is **testing**: is feature set $x_2$ predictively significant? §5.1 shows that a method can be good enough for the first and not for the second. §5.2 shows that the choice of measure changes conclusions on real data.

## Main Content

### Tests for variable importance (§5.1, pp. 14-15)

Formal importance tests for random forests began with Mentch & Hooker (2016). Coleman et al. (2019) gave a scalable nonparametric alternative, and Williamson et al. (2020) a model-agnostic one. These tests take an importance measure as given and ask whether a feature set matters more than chance would allow.

> [!definition] Definition: Generic importance null hypothesis (§5.1, p. 14)
> Partition the features into $(x_1,x_2)$. Test
> $$H_0:\ \mathrm{Error}[RF(x_1,x_2)]=\mathrm{Error}[RF(x_1,x_2^*)]$$
> on an **external test set**. $RF(x_1,x_2)$ is a forest fit on the original features. $RF(x_1,x_2^*)$ is a forest fit with $x_2$ **dropped or replaced** by a non-important randomized substitute: a permutation, or a draw conditional on $x_1$. These correspond to the importance measures $\mathrm{VI}^D,\mathrm{VI}^{\pi L},\mathrm{VI}^{CL}$.
> If $x_2$ matters, $\mathrm{Error}[RF(x_1,x_2^*)]>\mathrm{Error}[RF(x_1,x_2)]$ and $H_0$ is rejected.
^def-importance-null

Mentch & Zhou (2020) showed that **how** $x_2^*$ is built matters a lot: permute-and-relearn can declare $x_2$ significant even when it is **conditionally independent** of $y$ given $x_1$.

### Simulation design (§5.1, p. 15)

> [!example] Example: Noise-feature test simulation (§5.1, Fig. 8)
> - **Signal model**: the same linear model as eq. (2), $y_i=x_{i1}+\dots+x_{i5}+0x_{i6}+0.5x_{i7}+0.8x_{i8}+1.2x_{i9}+1.5x_{i10}+\epsilon_i$.
> - **Features**: $x\sim N(0,\Sigma)$ with $\Sigma_{ij}=\rho^{|i-j|}$ (an AR(1)-type correlation; the value of $\rho$ is not stated in the text).
> - **Noise**: $\epsilon_i\sim N(0,\sigma^2)$, with $\sigma$ set to give a target **SNR**. Figure legend values: 0.05, 0.25, 0.71, 2.07.
> - **Extra noise features**: $q$ of them, each standard normal and correlated at **0.7** with one of the 10 originals chosen uniformly at random. Given the 10 originals they are independent of $y$, so $H_0$ is **true**. $q$ ranges over roughly 0-250 (Fig. 8 x-axis).
> - **Test**: the procedure of Williamson et al. (2020), applied to **bagging** and to **random forests**, with $x_2$ = the $q$ noise features; $\alpha=0.05$.
> - **Substitutes $x_2^*$**:
>   1. random **permutation** of $x_2$ (permute-and-relearn);
>   2. draws from the **true conditional** distribution (known in simulation);
>   3. **Model-X knockoffs** (Candès et al. 2018): second-order multivariate Gaussian knockoffs, approximate semidefinite-program construction, R package `knockoff`.
> - **Replication**: 100 runs per setting combination. The reported rate is the proportion of runs that reject $H_0$.
^ex-noise-test-sim

**Figure 8** (p. 15; y-axis "Probability of Rejection"): empirical rejection probability vs number of extra noise features $q$, by SNR and model (bagging, RF). Panels: left = permutation, middle = MX knockoffs, right = true conditional. The authors call this last panel "Truth", for the true conditional distribution.

| Substitute | Rejection rate under a true $H_0$ | Reading |
|---|---|---|
| Permutation (permute-and-relearn) | **Well above 0.05** in many settings, rising with $q$ and with SNR. Approximate readings at $q=250$: SNR 2.07 ≈ **0.7**, SNR 0.71 ≈ 0.4-0.5, SNR 0.25 ≈ 0.25-0.3, SNR 0.05 ≈ 0.05-0.1, with RF (dotted) usually above bagging (solid) | Permuting breaks the noise features' correlation with real features as well as with $y$ |
| Model-X knockoffs | About 0.05 | An estimated conditional law is enough here |
| True conditional | Very near 0.05 | The reference |

**Figure 8, full transcription.** Values were read from the rendered plot points (p. 15, 400 dpi) and are approximate to about ±0.01-0.02. Panel titles: "Permute−and−Relearn", "Knockoff", "Truth". Y-axis label in all panels: **"Probability of Rejection"** (0 to about 0.75). X-axis: "# of Extra Noise Features (q)". A dashed horizontal reference line marks 0.05. Legends: SNR ∈ {0.05, 0.25, 0.71, 2.07}; Model: Bagging (solid), RF (dotted). The grid of $q$ is dense below 50 (about every 5: roughly 5, 10, ..., 45) and then 50, 100, 150, 200, 250.

*Left panel, permute-and-relearn (rejection rate under a true $H_0$).*

| SNR | Model | $q\le45$ (range) | $q=50$ | 100 | 150 | 200 | 250 |
|---|---|---|---|---|---|---|---|
| 2.07 | Bagging | 0.03-0.24 | 0.23 | 0.38 | 0.43 | 0.58 | **0.70** |
| 2.07 | RF | 0.04-0.20 | 0.32 | 0.45 | 0.57 | 0.70 | **0.71** |
| 0.71 | Bagging | 0.03-0.22 | 0.11 | 0.24 | 0.34 | 0.36 | 0.41 |
| 0.71 | RF | 0.03-0.19 | 0.16 | 0.34 | 0.43 | 0.53 | 0.48 |
| 0.25 | Bagging | 0.02-0.15 | 0.15 | 0.14 | 0.20 | 0.18 | 0.26 |
| 0.25 | RF | 0.02-0.12 | 0.15 | 0.13 | 0.20 | 0.18 | 0.32 |
| 0.05 | Bagging | 0.01-0.09 | 0.07 | 0.10 | 0.10 | 0.07 | 0.09 |
| 0.05 | RF | 0.02-0.08 | 0.07 | 0.04 | 0.09 | 0.11 | 0.09 |

Where the curves first leave the nominal level: for SNR 2.07 the RF curve already reaches about **0.16-0.20 at $q\approx15$-20**; for SNR 0.71 and 2.07 every curve is above 0.10 from $q=50$ on (except bagging at SNR 0.71, 0.11 at $q=50$, then 0.24); for SNR 0.25 the rates sit at about 0.13-0.20 from $q=50$ to 200 and rise to 0.26-0.32 at 250; for SNR 0.05 they stay at about 0.04-0.11, close to nominal. RF is above bagging at SNR 0.71 and 2.07 for most $q\ge50$; at SNR 0.25 and 0.05 the two are nearly identical.

*Middle panel, Model-X knockoffs, and right panel, true conditional.*

| Substitute | All 8 curves, $q\le45$ | All 8 curves, $q\ge50$ | Notable points |
|---|---|---|---|
| Knockoff | 0.01-0.11 | 0.01-0.10 | Max about 0.10 (SNR 0.25 bagging, $q=50$); max at $q=200$ about 0.09 (SNR 2.07 RF); min about 0.01 (SNR 0.71 bagging, $q=250$) |
| Truth | 0.00-0.12 | 0.02-0.09 | Max about 0.12 (SNR 2.07 bagging, $q\approx15$); 0.08 (SNR 0.05 bagging, $q=150$); 0.09 (SNR 2.07 RF, $q=200$) |

*Monte Carlo context (vault calculation, not in the paper).* With 100 replications per setting, the Monte Carlo standard error of an estimated rejection rate whose true value is 0.05 is $\sqrt{0.05\times0.95/100}\approx0.022$. The knockoff and truth ranges of about 0.01-0.12 are therefore consistent with a true size of 0.05 (about ±2.5 SE at the extremes, across many settings). The permute-and-relearn values of 0.3-0.7 are 10-30 SE above nominal. See [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] for Monte Carlo SE of rejection rates.

**Mechanism.** Permuting $x_2$ breaks its relationship with the response **and** its correlation with the other features. The authors stress that this is **not** specific to this test or hypothesis. Any test of conditional independence that compares model performance after dropping or permuting a subset of features has the same problem. Replacements that preserve the between-feature dependence do not appear to.

> [!theorem] Claim: Ordering is not testing (§5.1, p. 16)
> Relearning after permuting fixes many of the ranking problems of permute-and-predict, but "relearning alone does not fully resolve the issues associated with permutation-based variable importance." For valid tests, replacements must preserve the joint feature distribution: conditional draws or knockoffs. Mentch & Zhou (2020) give an extended discussion.
^claim-ordering-vs-testing

### Bike-sharing application (§5.2, pp. 16-17)

> [!example] Example: hourly bike-share importance ranks (§5.2, Fig. 9)
> - **Data**: hourly bike-share data of Fanaee-T & Gama (2013), from the UCI repository.
> - **Target**: log number of rentals per hour. **Features**: 14. **Model**: `randomForest` in R.
> - **Measures**: (a) the default **OOB permutation** importance; (b) $\mathrm{VI}^{\pi L}_j$, which permutes feature $j$ and **refits** before measuring the change in accuracy. (b) was chosen because it reuses the same learner and keeps the feature dimension.
> - **Fig. 9** (p. 17): a scatter of OOB rank (x-axis) against permute-and-relearn rank (y-axis), ranked from least to most important.
> - **Result**: many features get similar ranks, but there are notable disagreements. `temp` looks important under OOB and "quite unimportant otherwise". A screen based on OOB importance "might have selected this rather than `yr`", which could harm later analysis.
^ex-bike-share

**Figure 9, transcribed.** Ranks were read off the plotted label positions (1 = least important, 14 = most), so treat them as approximate. The figure title is "BikeShare Feature Importance Comparison", and a 45° line marks agreement.

| Feature | OOB rank (x) | $\mathrm{VI}^{\pi L}$ rank (y) | Gap |
|---|---|---|---|
| registered | 14 | 14 | 0 |
| hr | 13 | 12 | −1 |
| casual | 12 | 13 | +1 |
| atemp | 11 | 5 | **−6** |
| temp | 10 | 1 | **−9** |
| hum | 9 | 7 | −2 |
| workingday | 8 | 10 | +2 |
| season | 7 | 8 | +1 |
| yr | 6 | 11 | **+5** |
| mnth | 5 | 4 | −1 |
| weekday | 4 | 9 | **+5** |
| windspeed | 3 | 6 | +3 |
| weathersit | 2 | 2 | 0 |
| holiday | 1 | 3 | +2 |

**Reading.** `temp` and `atemp` (feels-like temperature) are almost collinear. Under OOB permute-and-predict both rank high (10 and 11). Under permute-and-relearn, each one's information is still available through the other, so both fall (to 1 and 5). This is the compensation effect of [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures#^def-compensation|Theorem 3]] on real data. A further point the paper does not make: `registered` and `casual` are the two components of the total rental count, so including them as features leaks the target. That explains why they top both rankings.

## Examples

> [!example] Example: testing a block of derived marketing features (generic illustration)
> An analyst adds 40 engineered features (lags and rolling means of existing spend series) to a forest that predicts weekly conversions, then tests whether the block adds predictive value by permuting it and refitting. The lags are strongly correlated with the raw spend columns. Per §5.1, the test can reject even when the block adds nothing beyond the raw series. Generating the block **conditionally** on the raw features (for example with knockoffs) keeps the test near its nominal size.
^ex-derived-feature-block

## Connections

- False rejections from a mis-specified null are a form of false discovery: [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], [[Researcher Degrees of Freedom]].
- Classical permutation tests are valid when the permutation respects the null's exchangeability. Here it does not: [[Permutation Tests and Exact Inference]].
- Checking a test's actual size by simulation is the ADEMP "performance measure" step: [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].
- Screening by unstable importances: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].
- Time-indexed data like the bike-share series need time-aware validation: [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]].

## See Also
- [[Hooker Mentch Zhou 2021 - Conditional and Relearning Importance Measures]] — definitions of the measures being tested
- [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]
