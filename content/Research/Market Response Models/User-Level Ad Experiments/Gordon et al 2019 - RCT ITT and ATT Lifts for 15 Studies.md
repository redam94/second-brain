---
title: Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies
tags:
  - source/ingested
  - topic/market-response
  - topic/ad-experiments
  - topic/causal-inference
  - type/example
  - doc/paper
source: "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
source_location: "Gordon, Zettelmeyer, Bhargava & Chapsky (2018 WP / Marketing Science 38(2) 2019) §7 intro, §7.1 pp. 30-32, Fig. 7, Table 3 (p. 31), Table 4 (p. 32), fn. 19-22"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]]"
  - "[[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check]]"
  - "[[From ITT to Treatment-on-the-Treated in Ad Experiments]]"
used_by:
  - "[[Gordon et al 2019 - Observational Lift Estimates by Study and Method]]"
  - "[[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]]"
aliases:
  - Gordon 2019 Table 3
  - Gordon 2019 Table 4
  - Facebook 2015 Conversion Lift Results
---

# Gordon et al 2019 - RCT ITT and ATT Lifts for 15 Studies

> [!summary]
> The experimental ground truth in Gordon et al. (2019), §7.1. For all 22 study-outcome pairs the paper reports the control and test conversion rates, the ITT and ITT lift (Table 3), and the exposure share, the exposed and unexposed test-group rates, the ATT and the **ATT lift** with bootstrap 95% CIs (Table 4). Checkout ATT lifts run from -15% to 450%. Six of 14 checkout lifts are not significant at 5%. Registration and page-view lifts are much larger (up to 1,517%) because campaign-specific landing pages are hard to reach without the ad. Study 4 is the worked example: ITT lift 38%, exposure 37%, ATT lift 73% [49%, 103%].

^summary-gordon-et-al-2019-rct-itt-and-att-lifts

## Overview

Conversion rates are masked: "all conversion rates have been scaled by a random constant, masking levels but allowing comparisons across studies" (§7). Lifts are ratios and are not affected by the masking. These ATT lifts are the benchmark "gold standard for the truth" that every observational estimate in [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]] is compared against.

## Main Content

### Study 4 in detail (§7.1, Fig. 7)

> [!example] Study 4 — from ITT to ATT lift (§7.1, Fig. 7, fn. 19-20)
> **Setup.** An omnichannel retailer ran a two-week campaign in the first half of 2015. 25.5M users were split 70% test / 30% control. Ads ran in mobile and desktop News Feeds in the US. The pixel was on the checkout-confirmation page, so the outcome is an online purchase during the study or "up to several weeks after the study ended". Conversions caused by the ads after that window are missed, so the experiment is **conservative** (fn. 19).
> **Fig. 7 / Table 3.** Test conversion rate 0.045%, control 0.033%, ITT = 0.012%, ITT lift = 38% (37.7%, CI [27.2%, 49.1%]).
> **ATT.** ITT / exposure share = 0.012% / 37% = **0.033%**.
> **ATT lift.** The exposed group converts at 0.079%, so its counterfactual rate is 0.079% - 0.033% = 0.046%. ATT lift = 0.033/0.046 = **73%** (72.8%), 95% bootstrap CI **[49%, 103%]**.
> **Identifying step (fn. 20).** We do not know which control users would have been exposed. The assumption is that unexposed test users (0.025%) convert at the same rate they would have in control. Since control overall is 0.033% with 37% would-be-exposed, the exposed group's counterfactual rate works out to **0.046%**.

^ex-g19-study4

#### What Figure 7 shows ("Results from RCT", p. 30)

Figure 7 is a schematic 2 × 2 diagram, not a bar chart. It lays out the ITT-to-ATT decomposition for Study 4.

- **Columns.** On the left, "**Test** (Eligible to be exposed)". On the right, "**Control** (Unexposed)".
- **Rows.** The top row is "Exposed", labelled **37%** in the left margin. The bottom row is "Unexposed", labelled **63%**. These are the shares of the test group.
- **Cells.** All rates are masked conversion rates.

| | Test | Control |
|---|---|---|
| Exposed / would-be-exposed (37%) | **0.079%** (solid red) | **0.046%** (faded pink: inferred, not observed) |
| Unexposed / would-not-be-exposed (63%) | **0.025%** (solid red) | **0.025%** (faded pink: inferred) |
| **Column total** (below the box) | **0.045%** | **0.033%** |

- **Row divider.** In the test column the line between exposed and unexposed is solid, because exposure is observed. In the control column it is **dotted**, because the split is counterfactual. Arrows on the right label the two control cells "Users who would have been exposed if they had been in the test group" and "Users who would not have been exposed if they had been in the test group".
- **Lift markers.** A hexagonal "**ATT Lift 73%**" marker sits between the two top-row cells (0.079% vs 0.046%). An "**ITT Lift 38%**" marker sits between the two column totals (0.045% vs 0.033%).
- **Implied arithmetic** (fn. 20). The control column's split is solved from 0.033% = 0.37 × $x$ + 0.63 × 0.025%, which gives $x\approx$ 0.046%. The equal 0.025% in the bottom row *is* the identifying assumption: unexposed test users convert as they would have in control. The test-column total checks out: 0.37 × 0.079% + 0.63 × 0.025% ≈ 0.045%.
- The figure therefore restates eqs. (2)-(8) of [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]] visually. The observational methods compare the two **test** cells (0.079% vs a reweighted 0.025%). The RCT compares the top-row cells across columns.

^ex-g19-fig7

### Table 3 — ITT lift for all studies and outcomes (p. 31)

| Study | Outcome | Control conv. | Test conv. | RCT ITT | ITT lift | 95% CI |
|---|---|---|---|---|---|---|
| S1 | Checkout | 0.105% | 0.131% | 0.027% | 25.3% | [13.8%, 37.9%] |
| S2 | Checkout | 0.033% | 0.033% | 0.000% | 1.0% | [-3.5%, 5.7%] |
| S3 | Checkout | 0.203% | 0.217% | 0.014% | 6.9% | [1.2%, 13.0%] |
| S4 | Checkout | 0.033% | 0.045% | 0.012% | 37.7% | [27.2%, 49.1%] |
| S5 | Checkout | 0.009% | 0.022% | 0.013% | 153.2% | [127.0%, 182.4%] |
| S7 | Checkout | 0.247% | 0.251% | 0.004% | 1.5% | [-0.2%, 3.3%] |
| S8 | Checkout | 0.047% | 0.047% | -0.001% | -1.2% | [-9.2%, 7.6%] |
| S9 | Checkout | 0.184% | 0.187% | 0.003% | 1.7% | [0.0%, 3.5%] |
| S10 | Checkout | 0.113% | 0.115% | 0.002% | 1.5% | [-9.1%, 13.2%] |
| S11 | Checkout | 0.261% | 0.277% | 0.016% | 6.2% | [3.3%, 9.3%] |
| S12 | Checkout | 5.487% | 5.547% | 0.059% | 1.1% | [0.1%, 2.1%] |
| S13 | Checkout | 0.282% | 0.272% | -0.010% | -3.5% | [-10.1%, 3.5%] |
| S14 | Checkout | 0.027% | 0.036% | 0.009% | 34.3% | [25.1%, 44.1%] |
| S15 | Checkout | 1.385% | 1.413% | 0.028% | 2.0% | [0.4%, 3.7%] |
| S1 | Registration | 0.078% | 0.570% | 0.492% | 630.1% | [568.3%, 697.6%] |
| S5 | Registration | 0.078% | 0.341% | 0.264% | 339.9% | [325.2%, 355.2%] |
| S8 | Registration | 0.010% | 0.012% | 0.003% | 26.5% | [5.8%, 51.1%] |
| S10 | Registration | 0.363% | 0.385% | 0.022% | 6.0% | [-0.2%, 12.6%] |
| S14 | Registration | 0.165% | 0.304% | 0.139% | 84.5% | [79.5%, 89.7%] |
| S2 | Page View | 0.011% | 0.123% | 0.111% | 994.0% | [917.7%, 1076.1%] |
| S5 | Page View | 0.084% | 0.275% | 0.191% | 227.7% | [216.8%, 239.0%] |
| S6 | Page View | 0.356% | 0.397% | 0.042% | 11.7% | [10.8%, 12.5%] |

In the original, bold marks significance at 5%. The bold is lost in extraction, so read significance from whether the CI excludes 0. Study 6 has no checkout outcome.

### Table 4 — ATT lift for all studies and outcomes (p. 32)

| Study | Outcome | % exposed | Conv. exposed (test) | Conv. unexposed (test) | RCT ATT | ATT lift | 95% CI |
|---|---|---|---|---|---|---|---|
| S1 | Checkout | 76% | 0.151% | 0.069% | 0.035% | 30.0% | [16%, 46%] |
| S2 | Checkout | 48% | 0.054% | 0.014% | 0.001% | 1.3% | [-5%, 8%] |
| S3 | Checkout | 66% | 0.260% | 0.131% | 0.021% | 8.8% | [1.1%, 17%] |
| S4 | Checkout | 37% | 0.079% | 0.025% | 0.033% | 72.8% | [49%, 103%] |
| S5 | Checkout | 30% | 0.055% | 0.008% | 0.045% | 449.6% | [306%, 761%] |
| S7 | Checkout | 51% | 0.284% | 0.217% | 0.007% | 2.7% | [-0.3%, 6%] |
| S8 | Checkout | 26% | 0.069% | 0.039% | -0.002% | -2.9% | [-21%, 23%] |
| S9 | Checkout | 6.6% | 2.105% | 0.052% | 0.049% | 2.4% | [-0.1%, 5%] |
| S10 | Checkout | 65% | 0.127% | 0.092% | 0.003% | 2.0% | [-11%, 20%] |
| S11 | Checkout | 42% | 0.488% | 0.124% | 0.039% | 8.6% | [5%, 13%] |
| S12 | Checkout | 77% | 6.403% | 2.810% | 0.078% | 1.2% | [0.2%, 2%] |
| S13 | Checkout | 30% | 0.187% | 0.309% | -0.033% | -15.1% | [-35%, 20%] |
| S14 | Checkout | 35% | 0.068% | 0.019% | 0.026% | 62.0% | [43%, 86%] |
| S15 | Checkout | 81% | 1.470% | 1.175% | 0.034% | 2.4% | [0.4%, 5%] |
| S1 | Registration | 76% | 0.725% | 0.064% | 0.643% | 781.4% | [694%, 890%] |
| S5 | Registration | 30% | 0.993% | 0.068% | 0.893% | 893.1% | [797%, 1010%] |
| S8 | Registration | 26% | 0.025% | 0.008% | 0.010% | 63.2% | [11%, 176%] |
| S10 | Registration | 65% | 0.423% | 0.313% | 0.033% | 8.6% | [0%, 19%] |
| S14 | Registration | 35% | 0.642% | 0.119% | 0.393% | 158.1% | [145%, 173%] |
| S2 | Page View | 48% | 0.249% | 0.007% | 0.233% | 1517.1% | [1357%, 1733%] |
| S5 | Page View | 30% | 0.753% | 0.075% | 0.647% | 608.8% | [541%, 692%] |
| S6 | Page View | 61% | 0.557% | 0.152% | 0.069% | 14.0% | [13%, 15%] |

### Patterns the paper draws from Tables 3-4 (§7.1)

1. **Variation.** Exposure share ranges from 6.6% (S9) to 81% (S15), and ATT lift varies widely.
2. **Weak checkout effects.** "Of the 14 studies with a checkout conversion, six failed to produce statistically significant lifts at the 5% significance level (although two were significant at a 10% level)." From the CIs, the six are S2, S7, S8, S9, S10, S13. S7 and S9 have lower bounds just below 0, and the text calls S9 significant at 10% (§7.2).
3. **Upper-funnel outcomes have bigger lifts**, for two reasons. Registration and page view are easier to trigger because they cost nothing. And specific registration and landing pages are tied to the campaign, so unexposed users "may not know how to get to the page". Checkout pages need no such knowledge. Footnote 21 cites Johnson, Lewis & Nubbemeyer's (2017b) meta-study of 432 Google Display Network experiments, with median lifts of **16% for site visits vs 8% for purchases**.
4. **Why lifts are not infinite** (fn. 22). Registration and landing pages are often **shared across several campaigns**, so control users can reach them through a different campaign.
5. **Large lifts on rare outcomes.** S5 checkout has a 0.009% control rate and a 450% ATT lift with a wide CI [306%, 761%]. As §3.3 warns, lift exaggerates differences when baselines are small.

## Examples

> [!example] Reading S9 — when the exposed group is extremely selected
> S9 exposes only **6.6%** of the test group. Exposed users convert at 2.105% and unexposed at 0.052%, about a 40-fold gap, yet the ATT lift is only 2.4%. Almost all of the gap is selection: the optimizer concentrated a small delivery on users who were going to buy anyway. That is the setting where the naive comparison shows its worst bias (EU lift 4,074%; [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]]).

^exa-g19-rct-itt-and-att-lift-1

> [!example] Generic use as an experiment-informed prior
> For a channel's prior in an aggregate media model, the right summary of a test like this is the ATT (or ITT × eligible users) converted to incremental conversions per unit spend, with its bootstrap interval. Do not use the exposed-vs-unexposed rate gap. Remember the estimand is short-run, on-platform and conditional on the delivery system ([[Bayesian Estimation and Priors for MMM]]).

^exa-g19-rct-itt-and-att-lift-2

## Connections

- ITT vs ATT precision, and why Study 4's ITT CI is tighter in relative terms than its ATT CI: [[From ITT to Treatment-on-the-Treated in Ad Experiments]].
- Signal-to-noise: S2, S7, S10 and S13 show how a wide CI around a 1-3% lift goes with 2M-86M users. See [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] and [[Power Analysis and Sample Size]].
- Cross-study comparison with the larger 2023 sample (median lift 9%; 29/18/5% upper/mid/lower funnel): [[Conversion Lift Studies on Ad Platforms]].

## See Also

- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]
- [[Gordon et al 2019 - Study Sample, Covariate Sets and Randomization Check]] — Table 1 sizes and splits.
- [[User-Level Ad Experiments - Overview]] — reads Study 4 as an end-to-end lift report.
