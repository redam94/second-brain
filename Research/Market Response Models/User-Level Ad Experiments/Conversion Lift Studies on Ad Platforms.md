---
title: Conversion Lift Studies on Ad Platforms
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/incrementality
  - type/application
  - doc/paper
source:
  - "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
  - "[[raw/Gordon Moakler Zettelmeyer 2023 - Close Enough Non-Experimental Ad Measurement.pdf]]"
  - "[[raw/Johnson Lewis Nubbemeyer 2017 - Ghost Ads.pdf]]"
source_location: "Gordon et al. 2019 §2.1-2.3, Fig. 3, §5 Table 1, §7.1 Tables 3-4; Gordon, Moakler & Zettelmeyer 2023 §1 fn. 1, §2.1-2.3, §3.1-3.2 fn. 13, 16, Fig. 1, §4.2 Figs. 2-6; Johnson, Lewis & Nubbemeyer §4-6"
date_ingested: 2026-09-18
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Intent-to-Treat, PSA and Ghost Ad Designs]]"
  - "[[Predicted Ghost Ads and Ghost Bids Mechanics]]"
  - "[[From ITT to Treatment-on-the-Treated in Ad Experiments]]"
used_by:
  - "[[Experimental Benchmarks for Observational Ad Measurement]]"
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
aliases:
  - Conversion Lift
  - Facebook Conversion Lift
  - Meta Conversion Lift
  - Platform Lift Studies
  - Incrementality Studies on Walled Gardens
  - Opportunity Set
---

# Conversion Lift Studies on Ad Platforms

> [!summary]
> Large ad platforms now sell (or give away) user-randomized holdout experiments as a product. The best-documented is **Facebook/Meta Conversion Lift**, described in Gordon et al. (2019) and Gordon, Moakler & Zettelmeyer (2023): the advertiser's target audience is randomized into test and control; the focal ad *still bids* for control users, and when it wins "the platform ... prevents the focal ad from appearing" and serves the auction's runner-up. Measurement is an **ITT contrast over the "opportunity set"** — targeted users for whom the focal ad entered at least one auction — optionally scaled to an **ATT** by the exposure rate; conversions are captured by pixels for both arms; logged-in identity keeps assignment persistent across devices. Across 1,673 outcome-level RCTs in 663 experiments the median lift was **9%** (29% / 18% / 5% for upper / mid / lower-funnel outcomes), 70% of ATTs were significant, and three quarters were powered to detect a 10% lift. The result is an unbiased estimate of a *narrow* estimand: the short-run effect of that campaign's media on that platform, on platform-tracked conversions, given everything else in market.

## Overview

Gordon, Moakler & Zettelmeyer (§1) list three developments behind the spread of ad RCTs: firms investing in experimentation capability, "several leading advertising platforms [creating] experimentation tools that enable RCTs at no cost to advertisers" (they cite Google, Facebook and Microsoft), and academic use. Yet "RCTs are not always available": advertisers "may operate under internal pressure to forgo a control group to maximize a campaign's reach", and RCTs "can also be technically difficult or even impossible to implement on many ad platforms."

This note documents how a platform lift study is wired, what population it measures, how results look in aggregate, and how to read one for calibration.

## Main Content

### Mechanics of Conversion Lift

> [!algorithm] Facebook Conversion Lift (Gordon et al. 2019 §2.2; Gordon, Moakler & Zettelmeyer §2.2) ^alg-conversion-lift
> 1. **Audience.** The advertiser defines targeting rules (e.g. women 18-54). These "define the relevant set of users in the study."
> 2. **Randomization.** Each targeted user is assigned to test or control "based on a proportion selected by the advertiser, in consultation with Facebook." Assignment is tied to the logged-in user, not a cookie.
> 3. **Auction participation in both arms.** The focal ad enters auctions for test *and* control users; delivery-optimization bid weights are "applied equally to users in the test and control group."
> 4. **Last-moment substitution.** If the focal ad wins for a control user, it is withheld and the second-place ad is served. "The focal ad must remain in the auction until this last step to ensure that the correct second-place ad is shown."
> 5. **Opportunity set.** Users eligible for measurement are those who (a) satisfy the targeting criteria and (b) had the focal ad participate "in at least one auction during the campaign, regardless of the outcome of that auction." All measurement is on this set.
> 6. **Outcomes.** Conversion pixels on the advertiser's pages (checkout, registration, key page view) fire for users in both arms; no click is required.
> 7. **Estimation.** ITT $=$ test conversion rate $-$ control conversion rate; ATT $=$ ITT / share of test users exposed (2SLS with assignment as instrument); **lift** $=$ ATT over the exposed users' counterfactual conversion rate.

**The counterfactual.** Control users see "the full distribution of ads they would have seen if the advertiser's campaign had not run" — the same baseline as [[Intent-to-Treat, PSA and Ghost Ad Designs#^def-ghost-ad|ghost ads]], not a single placebo. This "relies on the auction mechanism's stability to the removal of the focal ad": other advertisers' strategies are assumed fixed in the short run, reasonable because campaigns are unannounced, short, and small relative to the platform (2019 §2.2). It is the auction-level version of the no-interference assumption examined in [[Interference and Marketplace Experiments]].

**Cost.** Free to the advertiser; the platform bears "the difference between what Facebook charges for the highest and second-highest ranked ads for auctions in the control group", small because the bidder pool is deep (2023 §2.2).

**Why optimization does not break it.** As the delivery system learns who converts, some users become more likely to be shown the ad. "The same process occurs for users in the control group: the focal ad will receive more weight in the auction for these users and might win the auction more frequently — except that ... the focal ad is replaced 'at the last moment'" (2019 §2.3). Symmetry is preserved for the *assignment* contrast, which is all ITT needs.

> [!definition] Conversion Lift vs predicted ghost ads ^def-cl-vs-pga
> "While Facebook implements the same counterfactual as Google's Ghost Ads system, the measurement sample used in the two approaches differs." Google restricts to test users who saw the ad and control users *predicted* to have been exposed through a simulated auction, yielding a LATE on predicted-exposed users. Facebook "measures advertising effects using an Intent-to-Treat (ITT) approach ... [and] can convert this effect into an ATT by scaling the ITT estimate by the share of exposed users." Facebook's design "effectively corresponds to the Ghost Bids approach in Johnson et al. (2017a), except it is being implemented directly by the ad platform" (2023 §2.2).

The practical consequence ([[From ITT to Treatment-on-the-Treated in Ad Experiments#^thm-precision|precision theorem]]): an ITT-over-opportunity-set design carries a $1/\pi$ variance penalty relative to a first-impression-tagged design. It is affordable on Meta because exposure rates within the opportunity set are high — a median of 77% in the 2023 sample — and populations are huge (median 7.4M users).

**Identity.** "Facebook's ability to track users via a 'single-user login' across devices and sessions represents a significant measurement advantage over more common cookie-based approaches": assignment is persistent so control users are never inadvertently exposed, and exposures on mobile can be linked to conversions on desktop (2019 §2.1). This is what separates walled-garden lift studies from open-web cookie tests; see [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]]. The platform-side identity is only half the chain, though — the pixel (or SDK, or uploaded offline-conversion file) must still attribute the *outcome* to the same person.

### What lift studies look like in aggregate

**15 studies, Jan-Sep 2015** (Gordon et al. 2019 Table 1, 3-4): 2M-141M users each; test shares 17%-85%; exposure rates 6.6%-81%. Of 14 checkout outcomes, 6 had lifts not significant at 5%. ATT lifts on checkout ranged from -15% to 450%; registration and page-view lifts were far larger (up to 1,517%) because unexposed users rarely find a campaign-specific landing page unaided.

**663 experiments, Nov 2019-Mar 2020** (2023 §3-4), a random sample of US experiments with at least 1M test users and outcomes with at least 5,000 test conversions; 1,673 experiment-outcome RCTs; 7.9 billion user-experiment observations and 38 billion impressions:

| Characteristic | Median |
|---|---|
| Length | 30 days |
| Users (test + control) | 7,372,103 |
| Test share | 90% (10% holdout) |
| Share of test users exposed | 77% |
| Impressions | over 22 million |

| Result | Value |
|---|---|
| ATTs significant at 5% (2SLS s.e.) | 1,170 of 1,673 (70%); 1,160 positive |
| Median ATT, upper / mid / lower funnel | 0.003 / 0.001 / 0.0002 |
| Mean lift / median lift | 52% / 9% |
| Median lift, upper / mid / lower funnel | 29% / 18% / 5% |
| Lifts significant (bootstrap), upper / mid / lower | 75.8% / 73.7% / 59.6% |
| RCTs with 50% ex-ante power for a 10% lift | 75% |
| ... for a 20% lift | 85-90% |
| Median Cohen's $d$, lower / mid / upper | 0.0036 / 0.0127 / 0.0279 |

The median lift of 9% matches Johnson, Lewis & Nubbemeyer's companion meta-study of 432 Google Display Network predicted-ghost-ad experiments (median lift 16% for site visits, 8% for purchases, as cited in 2019 fn. 21). The authors suggest the distributions "can serve as prior distributions that digital advertisers can use for decision making" — with the caveat that advertisers who choose to experiment are self-selected (2023 fn. 5).

**Multi-cell tests.** 75 of 563 experiments contained more than one treatment-control pair ("cells"), used "to test different types of creatives, targeting strategies, bidding strategies". Each cell carries its own holdout, which sidesteps the copy-test bias under optimized delivery described in [[Intent-to-Treat, PSA and Ghost Ad Designs]].

### What the number means — and does not

> [!definition] Estimand of a platform lift study ^def-estimand
> "As with any experiment, this one yields an estimate of the campaign's average treatment effect, conditional on all market conditions — such as marketing activities the advertiser conducts in other channels (e.g., search, TV) and its competitors' activities. ... If advertising effects are nonlinear across media, the experiment measures something akin to the average net effect of the campaign given the distribution of non-Facebook advertising exposures across the sample" (2019 §2.2). The results "do not generalize to media being run on other channels and are not a measure of future ad effects at a different point in time" (2023 §2.2).

Reading checklist:

1. **Which population?** Opportunity set (ITT) or exposed users (ATT)? Total incremental conversions are the same; per-user effects differ by $1/\pi$.
2. **Which outcome and window?** Pixel-tracked online conversions within the study window. Later conversions are missed, so totals are conservative (2019 fn. 19); offline sales appear only if matched back. See [[Delayed Feedback Model for Conversion Prediction]].
3. **Conditional on the delivery system.** The ITT is "conditional on the platform's ad-optimization system" (2019 fn. 10); a different bid strategy or objective is a different treatment.
4. **Only the holdout campaign is withheld.** The advertiser's other campaigns on the same platform continue in both arms, so the estimate is incremental to them (Johnson, Lewis & Nubbemeyer §6 on concurrent campaigns).
5. **Lift inflates when baselines are tiny.** Report absolute incremental conversions and cost per incremental conversion alongside lift.
6. **Trust but verify.** "In November 2020, Facebook disclosed a bug in the experimentation platform that led to incorrect conversion metrics being reported to advertisers for about a year" (2023 fn. 13). Ask for arm sizes and pre-period balance ([[Sample Ratio Mismatch and Trustworthiness Checks]]); the advertiser cannot audit the randomization directly.
7. **Power.** A quarter of these very large studies lacked 50% power for a 10% lift; smaller advertisers will be far worse off ([[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]).

## Examples

**From a lift report to an MMM calibration input.** Suppose a four-week study reports: 5.0M users in the opportunity set, 90/10 split, control conversion rate 1.20%, test 1.26%, 77% of test users exposed, spend \$400,000.

- ITT $=0.06$ pp; ATT $=0.06/0.77=0.078$ pp; exposed users' observed rate, say 1.45%, gives lift $=0.078/(1.45-0.078)\approx5.7\%$ — a typical lower-funnel result.
- Incremental conversions in test $=0.0006\times4.5\text{M}=2{,}700$; cost per incremental conversion $\approx\$148$.
- Standard error of ITT $\approx\sqrt{0.0126(0.9874)/4.5\text{M}+0.012(0.988)/0.5\text{M}}\approx0.0163$ pp, so $t\approx3.7$ and a 95% interval of roughly 1,260 to 4,140 incremental conversions. The 10% holdout dominates the variance: moving to 70/30 at the same total size would cut the standard error by about a third.
- For a [[Bayesian Media Mix Modeling - Overview|Bayesian MMM]], encode "incremental conversions per dollar over these four weeks $\sim\mathcal N(0.00675,\,0.0018^2)$" as a constraint on the channel's contribution in that window ([[Bayesian Estimation and Priors for MMM]], [[Q - Using Experiment Results as Priors in a Bayesian MMM]]), remembering that the MMM coefficient also includes carryover and conversions the pixel cannot see.

## Connections

- [[Intent-to-Treat, PSA and Ghost Ad Designs]] — Conversion Lift is an ITT design with a ghost-ad counterfactual.
- [[Predicted Ghost Ads and Ghost Bids Mechanics]] — Google's alternative measurement sample; ghost bids as the closest analogue.
- [[From ITT to Treatment-on-the-Treated in Ad Experiments]] — the estimands reported.
- [[Experimental Benchmarks for Observational Ad Measurement]] — these RCTs are the ground truth for the Gordon et al. benchmarks.
- [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]] — why logged-in platforms can run these tests and the open web increasingly cannot.
- [[User-Level vs Geo-Level Experiments - When to Use Which]] — when a platform lift study is the right instrument.
- [[User-Level Ad Experiments - Overview]].

## See Also

- [[Online Experimentation - Overview]] — platform lift tools are A/B infrastructure applied to ad eligibility.
- [[Interference and Marketplace Experiments]] — auction stability and budget/competition spillovers.
- [[Geo-Experiment Methodology - Overview]] — the cross-platform, offline-capable complement.
- [[Customer Lifetime Value - Overview]] — valuing incremental conversions beyond the first purchase.
- [[Activity Bias in Advertising]] — the selection that makes platform-reported exposed-vs-unexposed numbers unusable.
