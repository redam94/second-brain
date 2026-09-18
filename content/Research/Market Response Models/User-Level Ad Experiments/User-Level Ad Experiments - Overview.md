---
title: User-Level Ad Experiments - Overview
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/causal-inference
  - type/overview
  - doc/paper
source:
  - "[[raw/Johnson Lewis Nubbemeyer 2017 - Ghost Ads.pdf]]"
  - "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
  - "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
  - "[[raw/Gordon Moakler Zettelmeyer 2023 - Close Enough Non-Experimental Ad Measurement.pdf]]"
  - "[[raw/Lin Misra 2022 - The Identity Fragmentation Bias.pdf]]"
  - "[[raw/Johnson Lewis Reiley 2017 - When Less Is More Data and Power in Advertising Experiments.pdf]]"
  - "[[raw/Lewis Rao Reiley 2013 - Measuring the Effects of Advertising The Digital Frontier.pdf]]"
  - "[[raw/Barajas Bhamidipati Shanahan 2021 - Online Advertising Incrementality Testing Tutorial.pdf]]"
source_location: "Johnson, Lewis & Nubbemeyer (working-paper version, Feb 2016) §1-4; Lewis & Rao 2015 §I-III; Gordon et al. 2019 §1-3; Gordon, Moakler & Zettelmeyer 2023 §1-2; Lin & Misra 2022 §1; Johnson, Lewis & Reiley 2017 §3, 5; Lewis, Rao & Reiley 2013 §7-8"
date_ingested: 2026-09-18
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[The Experimental Ideal]]"
  - "[[The Selection Problem]]"
  - "[[Activity Bias in Advertising]]"
  - "[[Observational vs Experimental Methods in Advertising]]"
  - "[[Local Average Treatment Effects]]"
used_by:
  - "[[Intent-to-Treat, PSA and Ghost Ad Designs]]"
  - "[[Predicted Ghost Ads and Ghost Bids Mechanics]]"
  - "[[From ITT to Treatment-on-the-Treated in Ad Experiments]]"
  - "[[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]"
  - "[[Conversion Lift Studies on Ad Platforms]]"
  - "[[Experimental Benchmarks for Observational Ad Measurement]]"
  - "[[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]]"
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
aliases:
  - User-Level Advertising Experiments
  - Incrementality Testing
  - Ad Holdout Experiments
  - User-Randomized Ad Experiments
---

# User-Level Ad Experiments - Overview

> [!summary]
> A **user-level ad experiment** randomizes *individual identifiers* (cookies, device IDs, logged-in accounts) into a group that is **eligible** for a campaign and a **holdout** that is not, and reads the causal ("incremental") effect of the campaign off the difference in outcomes. Three facts shape the whole methodology. (1) Assignment is random but **exposure is not**: only some eligible users are reached, so every design is an experiment with **one-sided noncompliance**, and the designs differ in how they find the control group's *would-have-been-exposed* users — not at all ([[Intent-to-Treat, PSA and Ghost Ad Designs|ITT]]), with placebo ads (PSA), or with logged counterfactual auction wins ([[Predicted Ghost Ads and Ghost Bids Mechanics|ghost ads / ghost bids]]). (2) Ad effects are tiny relative to the noise in individual sales — Lewis & Rao's calibrated campaign has an $R^2$ of $0.0000054$ — so [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise|power, not bias, is the binding constraint]]. (3) The same tiny signal means [[Experimental Benchmarks for Observational Ad Measurement|observational substitutes fail]] even with thousands of features and DML, while [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests|identity fragmentation]] erodes the user-level unit itself and pushes practitioners back toward [[Geo-Experiment Methodology - Overview|geo experiments]].

## Overview

The vault already covers *why* observational ad measurement fails ([[Activity Bias in Advertising]], [[Observational vs Experimental Methods in Advertising]]), the generic statistics of online A/B tests ([[Online Experimentation - Overview]]) and the geo-level alternative ([[Geo-Experiment Methodology - Overview]]). This cluster fills the gap in between: how individual-randomized *advertising* experiments are actually designed, analysed and interpreted, and where they stop working.

An ad experiment differs from a product A/B test in one structural way. In a product test the experimenter controls the treatment: every user assigned to B gets B. In an ad test, "whether a treatment user is treated depends on both the ad platform's ad delivery decisions and the user's browsing decisions" (Johnson, Lewis & Nubbemeyer §2). The platform's auction, pacing, targeting model and competing bidders decide whether the focal ad ever renders. Exposure is therefore a *post-assignment, endogenous* variable, and the comparison "exposed vs unexposed" is exactly the selection-contaminated comparison described in [[The Selection Problem]].

> [!definition] The ideal ad experiment ^def-ideal-ad-experiment
> Users are randomly assigned to a **treatment (test) group** that is eligible to see the focal campaign and a **control (holdout) group** that is not. Within each arm there is a latent split into users who **would be exposed** if eligible and users who would not. Randomization makes the *distribution of types* identical across arms (the experiment's "symmetry"). The estimand of managerial interest is usually the **treatment-on-the-treated (TOT/ATT)**: the mean outcome of treated users minus the mean outcome of the control arm's *counterfactual treated* users (Johnson, Lewis & Nubbemeyer §2, Fig. 1). The practical problem is that the counterfactual treated are not observed in the control arm without extra machinery.

The cluster is organised around that problem:

| Question | Note |
|---|---|
| What are the design families and what does each cost? | [[Intent-to-Treat, PSA and Ghost Ad Designs]] |
| How do ghost ads, predicted ghost ads and ghost bids work inside the auction? | [[Predicted Ghost Ads and Ghost Bids Mechanics]] |
| How do I get from the ITT contrast to the effect on exposed users? | [[From ITT to Treatment-on-the-Treated in Ad Experiments]] |
| Why are even million-user tests underpowered, and what helps? | [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] |
| How do walled-garden lift products implement all this? | [[Conversion Lift Studies on Ad Platforms]] |
| How far do PSM / regression / DML get from the RCT answer? | [[Experimental Benchmarks for Observational Ad Measurement]] |
| What breaks when one person is many identifiers? | [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]] |
| User-level or geo-level for this measurement problem? | [[User-Level vs Geo-Level Experiments - When to Use Which]] |

## Main Content

### The three structural facts

> [!theorem] Fact 1 — every ad holdout is an encouragement design ^fact-noncompliance
> Let $Z_i\in\{0,1\}$ be random assignment and $W_i(Z_i)\in\{0,1\}$ exposure. A properly implemented holdout has $W_i(0)=0$ for all $i$ (control users never see the campaign) while $W_i(1)\in\{0,1\}$ is endogenous. This is **one-sided noncompliance**: there are no always-takers and no defiers, so the [[Local Average Treatment Effects|LATE]] equals the ATT and
> $$
> \text{ATT}=\frac{\text{ITT}_Y}{\pi_{co}},\qquad \pi_{co}=E[W(1)]
> $$
> (Gordon et al. 2019 eq. 5-7). Exposure shares are often modest — 37% in Gordon et al.'s Study 4, 55% in Johnson, Lewis & Reiley's Yahoo! retailer test, and as low as "3% or less" when eligibility is determined on the fly (Johnson, Lewis & Nubbemeyer §2.1) — which is why the choice between analysing everyone (ITT) and analysing only the would-be-exposed matters so much for precision. See [[From ITT to Treatment-on-the-Treated in Ad Experiments]].

> [!theorem] Fact 2 — the signal-to-noise ratio is extraordinarily low ^fact-snr
> In Lewis & Rao's 25 Yahoo! display experiments the standard deviation of individual sales is about **10 times the mean** over a campaign window, per-person spend is \$0.02-\$0.39, and a campaign that earns a healthy 25% ROI must shift mean sales by \$0.35 against a standard deviation of \$75. The implied regression $R^2$ of sales on exposure is
> $$
> R^2=\tfrac14\left(\frac{\$0.35}{\$75}\right)^2\approx 5.4\times10^{-6},
> $$
> and the median retailer experiment has a standard error on ROI of 26 percentage points — a 95% interval more than 100 points wide (Lewis & Rao §II.B, §III.B). See [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]].

> [!theorem] Fact 3 — the same low signal makes observational methods fragile ^fact-obs-fragile
> With an $R^2$ of order $10^{-6}$ for the true effect, "an omitted variable, misspecified functional form, or slight amount of intertemporal correlation between ad exposure and shopping generating $R^2$ on the order of 0.0001 is a full order of magnitude larger than the true treatment effect" (Lewis & Rao §II.B). Gordon et al. (2019, 2023) confirm this empirically against 15 and then 663 Facebook RCTs: neither propensity-score methods nor double machine learning with >5,000 features recover the experimental lift. See [[Experimental Benchmarks for Observational Ad Measurement]].

### A short history of the design space

1. **Hold-out / ITT tests.** Randomize an eligible list, compare everyone. Valid, cheap, and the only option when the platform cannot log counterfactual exposure — but diluted by unexposed users. Geo experiments and search "blackout" tests are ITT designs with a region as the unit (Johnson, Lewis & Nubbemeyer §1.1).
2. **PSA / placebo tests.** Serve the control arm a neutral ad (charity, house ad, unrelated advertiser) configured identically to the focal campaign; the placebo impressions tag the counterfactual treated. Johnson, Lewis & Reiley (2017) show the pay-off: pruning unexposed users and pre-exposure outcomes removed 52% of in-campaign sales and cut standard errors by 31%, "equivalent to increasing our sample to 5.3 million users", whereas 236 covariates including two years of purchase history bought only 5%. But placebos cost as much as the real ads and *break* when the platform optimizes delivery per creative.
3. **Ghost ads and predicted ghost ads.** The platform logs, for control users, the auctions the focal ad *would have won*, and serves the runner-up. Free control groups, the correct competitive baseline, and robustness to performance optimization (first impression only on user-optimized platforms). See [[Predicted Ghost Ads and Ghost Bids Mechanics]].
4. **Platform lift products.** Facebook/Meta Conversion Lift, Google's predicted-ghost-ad based lift studies, and DSP "ghost bidding" productise designs 1-3 behind a button. See [[Conversion Lift Studies on Ad Platforms]].
5. **Privacy-era retreat.** Cookie loss, IDFA opt-in and cross-device behaviour fragment the unit of randomization; Lin & Misra show the resulting bias cannot even be signed in general. Aggregation to coarse groups — in the limit, geos — is the assumption-light fix. See [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]] and [[User-Level vs Geo-Level Experiments - When to Use Which]].

### Relevance to marketing measurement and applied work

For someone building [[Bayesian Media Mix Modeling - Overview|Bayesian media mix models]] and running geo tests, user-level experiments matter in four ways:

- **They are the highest-quality calibration signal a channel can have.** A conversion-lift ATT or ITT, converted to incremental conversions per dollar, is exactly the kind of external evidence that can be encoded as an informative prior or likelihood term on a channel coefficient ([[Bayesian Estimation and Priors for MMM]], [[Q - Using Experiment Results as Priors in a Bayesian MMM]]). But the estimand is *conditional on the platform's delivery system, the targeted audience, the other media running at the time, and a short outcome window* (Gordon et al. 2019 §2.2, fn. 10) — it is a local, short-run, platform-tracked quantity, not the long-run total effect an MMM coefficient with [[Carryover (Adstock) Functional Forms|adstock]] represents.
- **Their uncertainty is large and must be propagated.** Lewis & Rao's median ROI standard error of 26 points, and the [[Type S and Type M Errors|exaggeration factor]] that afflicts significant results from underpowered tests (their fn. 12), argue for feeding the *full* lift posterior into the MMM rather than a point estimate.
- **They discipline attribution and platform-reported numbers.** Gordon et al.'s naive exposed-vs-unexposed lifts of 100-4,000% against RCT lifts of 1-70% quantify how wrong last-touch or exposure-based attribution can be, which is the usual source of inflated priors.
- **They define where geo tests are the better tool**: offline sales that cannot be joined to an ID, cross-device journeys, channels with no holdout product, and spillovers across users. See [[User-Level vs Geo-Level Experiments - When to Use Which]].

> [!example] Source not ingested ^not-ingested
> Johnson, G. (2023), "Inferno: A Guide to Field Experiments in Online Display Advertising," *Journal of Economics & Management Strategy* 32, 469-490 (SSRN 3581396) is the natural survey companion to this cluster — its abstract lists statistical power, compliance, identity fragmentation, experimental spillovers and incrementality optimization as the core challenges. Neither the SSRN nor the Wiley copy could be downloaded at ingest time, so nothing in these notes is drawn from it beyond that abstract-level description; it is cited by Gordon, Moakler & Zettelmeyer (as "Johnson 2022") for the point that RCTs "can also be technically difficult or even impossible to implement on many ad platforms." Likewise Barajas & Bhamidipati (2021, WWW) on double-blind ghost-bidding designs was not available; only the authors' KDD-2021 tutorial outline is in `raw/`.

## Examples

**Reading a lift report end to end.** A retailer runs a two-week prospecting campaign with a 70/30 test/holdout split on a platform that reports an ITT design. The report says: control conversion rate 0.033%, test conversion rate 0.045%, 37% of test users exposed (these are Gordon et al. 2019's Study 4 numbers, Tables 3-4).

1. **ITT** $=0.045\%-0.033\%=0.012$ percentage points. This is the effect of *making users eligible*, averaged over everyone in the targeted audience.
2. **ATT** $=0.012/0.37\approx0.033$ points: the effect on users who actually saw ads.
3. **Counterfactual baseline of the exposed** $=0.079\%-0.033\%=0.046\%$, noticeably above the 0.033% control mean — exposed users are positively selected even *within* the targeted audience.
4. **Lift** $=0.033/0.046\approx 73\%$ with a bootstrap 95% interval of [49%, 103%].
5. The naive exposed-vs-unexposed comparison inside the test arm gives a "lift" of **316%** — more than four times the truth (Gordon et al. 2019 §7.2).

For an MMM prior, steps 1-2 convert to incremental conversions by multiplying the ATT by the number of exposed users (or the ITT by the number of eligible users — the two products are identical), and dividing by spend gives incremental conversions per dollar with an interval inherited from step 4.

## Connections

- [[Intent-to-Treat, PSA and Ghost Ad Designs]] — the design families and their cost/validity trade-offs.
- [[Predicted Ghost Ads and Ghost Bids Mechanics]] — auction-level implementation and the PGA-LATE estimator.
- [[From ITT to Treatment-on-the-Treated in Ad Experiments]] — one-sided noncompliance, IV scaling, lift.
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] — Lewis & Rao's power economics; what improves precision.
- [[Conversion Lift Studies on Ad Platforms]] — Facebook/Meta Conversion Lift, the opportunity set, what the number means.
- [[Experimental Benchmarks for Observational Ad Measurement]] — LaLonde-style benchmarks for PSM, regression, IPWRA, DML.
- [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]] — Lin & Misra's bias decomposition and fixes.
- [[User-Level vs Geo-Level Experiments - When to Use Which]] — applied decision note.
- [[Activity Bias in Advertising]] and [[Observational vs Experimental Methods in Advertising]] — the earlier Lewis-Rao-Reiley evidence that motivates experiments in the first place.
- [[Potential Outcomes Framework]], [[The Experimental Ideal]], [[The Selection Problem]] — the causal-inference foundations.

## See Also

- [[Online Experimentation - Overview]] — generic A/B-testing statistics; [[CUPED and Regression-Adjusted Variance Reduction]], [[Sample Ratio Mismatch and Trustworthiness Checks]], [[Always-Valid p-values and the mSPRT]] apply directly to lift tests.
- [[Geo-Experiment Methodology - Overview]], [[Geo-Experiment Design and Power Analysis]], [[Time-Based Regression Estimator for Geo Experiments]], [[SDID for Geo Experiments and Marketing Panels]] — the geo-level alternative.
- [[Instrumental Variables]] and [[Instrumental Variables and Principal Stratification]] — the identification theory behind ITT-to-ATT scaling.
- [[Power Analysis and Sample Size]] and [[Type S and Type M Errors]] — design-stage tools the power note relies on.
- [[Advertising and Promotion Effects]] — econometric evidence on advertising response that these experiments complement.
- [[Multi-Armed Bandits and Thompson Sampling - Overview]] — the "explore-exploit tests" Johnson, Lewis & Nubbemeyer anticipate once control groups are free.
