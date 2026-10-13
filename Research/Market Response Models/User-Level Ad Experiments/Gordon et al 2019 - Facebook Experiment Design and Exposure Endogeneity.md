---
title: Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity
tags:
  - source/ingested
  - topic/market-response
  - topic/ad-experiments
  - topic/causal-inference
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
source_location: "Gordon, Zettelmeyer, Bhargava & Chapsky (working paper 12 Apr 2018; Marketing Science 38(2) 2019) §1 pp. 1-3 incl. fn. 1-3; §2.1-2.3 pp. 4-10 incl. Figs. 1-3, fn. 5-8"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Activity Bias in Advertising]]"
  - "[[The Selection Problem]]"
used_by:
  - "[[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]]"
  - "[[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics]]"
  - "[[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]]"
aliases:
  - Gordon 2019 Experiment Design
  - Three Sources of Exposure Endogeneity
  - User, Targeting and Competition-Induced Endogeneity
---

# Gordon et al 2019 - Facebook Experiment Design and Exposure Endogeneity

> [!summary]
> Sections 1-2 of Gordon, Zettelmeyer, Bhargava & Chapsky (2019). The paper sets up its comparison by describing how a 2015 Facebook "conversion lift" test works: pixel-measured conversions, single-login identity, random assignment of the targeted audience, and a control condition in which the focal ad is replaced "at the last moment" by the auction runner-up. Inside the test group, exposure is endogenous for three reasons: **user-induced** (activity bias), **targeting-induced** (the delivery optimizer up-weights likely converters) and **competition-induced** (rival bids). The RCT uses the random assignment $Z$ to get around these. Observational methods have to model them away using covariates.

^summary-gordon-et-al-2019-facebook-experiment-de

## Overview

The paper asks whether "the variation in data typically available in the advertising industry enables observational methods to recover the causal effects of online advertising" (§1). To answer it they need an experimental benchmark that is correct by construction and an observational problem that looks like what advertisers actually face. Section 2 supplies both. Its main point is that the reasons exposure is non-random in the test group (§2.3) are built into how the ad system works. They are not accidents of a particular campaign. For the potential-outcomes formalization see [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]]. For the platform product more generally see [[Conversion Lift Studies on Ad Platforms]].

## Main Content

### Motivation (§1)

- **Two measurement difficulties.** Individual outcomes are volatile relative to per-customer ad spend, so advertising explains very little outcome variance (Lewis & Reiley 2014; Lewis & Rao 2015; see [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]). And "even small amounts of advertising endogeneity (e.g., likely buyers are more likely to be exposed to the ad) can severely bias causal estimates" (§1, p. 1).
- **Why RCTs are rare.** Few campaigns use them (Lavrakas 2010). The reasons given are technical difficulty inside ad-targeting engines and a common view that experiments are "expensive and often unnecessary relative to alternative methods" (Gluck 2011). Advertisers and leading measurement vendors therefore rely on observational methods (§1, p. 1).
- **What should make observational methods work here** (§1, p. 2):
  1. an unusually rich set of user-level, user-time-level and user-time-campaign-level covariates;
  2. very large samples (2M-140M users per campaign), which give both power and the ability to balance covariates;
  3. **user-level rather than cookie-level** measurement, so covariates, treatment and outcome are recorded on the same unit. Footnote 3 lists the two problems cookie data cause: control users "may inadvertently be simultaneously assigned to the treatment group", and cross-device exposure "may not be fully captured". Facebook's mandatory login avoids both. The footnote's last sentence gives a precedent for logged-in identity: "Lewis and Reiley (2014) also used a sample of logged-in users to match the retailer's existing customers to their Yahoo! profiles" (§1, fn. 3, p. 2). So the earlier Yahoo! retail RCT had already used logged-in identities to link advertiser customer records to platform users, a precedent for the user-level measurement used here. See [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]].
- **Quasi-random variation in exposure** has at least three sources (§1): variation in when users visit, Facebook's **pacing** of delivery over the campaign window, and bids from **unrelated advertisers**. All three add randomness to auction outcomes. Section 6.1 treats them in detail; see [[Gordon et al 2019 - Propensity Estimation, Bootstrap Inference and Balance Diagnostics]].
- **The identification requirement.** "For an observational model to recover the causal effect, the data must sufficiently control for the endogenous variation without absorbing too much of the exogenous variation" (§1, p. 2).

### Advertising on Facebook (§2.1)

> [!definition] Conversion outcome and conversion pixel (§2.1, fn. 6-7)
> The study only covers **direct-response** campaigns. Brand-building campaigns measured by surveys are excluded (fn. 6). A *conversion outcome* is recorded by a Facebook-provided code snippet (a "conversion pixel" or "Facebook pixel"; fn. 7 treats the two as equivalent) placed on an advertiser web page. Where the pixel sits determines the outcome:
> - **checkout** — a pixel on the checkout-confirmation page, so it measures purchase;
> - **registration** — a pixel on the registration-confirmation page;
> - **page view** — a pixel on a landing page of interest.
>
> Pixels record conversions for users in **both** test and control, and they do not require the user to click the ad.

^def-g19-pixel

- **Single-user login.** Assignment stays the same throughout the campaign. Control users are never shown the ad by mistake. All exposures and conversions on any device are tied to the person, which matters because users "are frequently exposed to advertising on a mobile device but might subsequently convert on a tablet or computer" (§2.1, p. 5).
- **Placements (Figure 1).** On desktop, ads appear as tiles in the News Feed ("native advertising" mixed with organic content) and in a smaller right-hand column. On mobile only the News Feed exists. The rate of News Feed ads "is carefully managed at the site level, independent of any ad experiment" (p. 5).
- **Campaign = a set of creatives (Figure 2).** The illustration uses a fictitious advertiser, "Jasper's Market", with three display ads that share one message. **The paper estimates the effect of the whole campaign, not of individual ads.**
- **The auction.** Each impression is decided by "a modified version of a second-price auction such that the winning bidder pays only the minimum amount necessary to have won the auction". Ranking also depends on factors other than the bid (fn. 8).
- Facebook calls these tests "conversion lift" tests and offered them free to qualifying advertisers (fn. 5).

### Experimental implementation (§2.2)

> [!algorithm] Control-ad determination in a Facebook conversion-lift test (§2.2, Fig. 3)
> 1. The advertiser sets **targeting rules** (e.g. "all women between 18 and 54"). These rules define the study population.
> 2. Each targeted user is randomly assigned to **test** or **control** in a proportion the advertiser picks with Facebook.
> 3. In the test group the focal campaign competes in auctions as usual. A test user is **exposed** only if the campaign wins at least one impression for them, which depends on things like whether they visit at all.
> 4. In the control group the focal campaign **still competes**. When it would have won (Fig. 3a, "Step 1: Determine that a user in the control would have been served the focal ad"), the platform suppresses it and serves **the auction's second-place ad** (Fig. 3b, "Step 2: Serve the next ad in the auction"). In the paper's example the control user sees an ad for a "Waterford Lux Resorts".
> 5. This produces three observed groups: **control-unexposed**, **test-unexposed** and **test-exposed**.

^alg-g19-control-ad

- **Counterfactual of interest.** The control condition should show "the ads that would have been served if the advertiser's campaign had not been run on Facebook". Control users therefore see the *whole distribution* of runner-up ads, not one placebo (§2.2, p. 6-8). For PSA and ghost-ad designs see [[Intent-to-Treat, PSA and Ghost Ad Designs]].
- **Stability assumption.** "This approach relies on the auction mechanism's stability to the removal of the focal ad": the runner-up is assumed to be the same whether or not the focal advertiser takes part. That holds if rivals do not react within the campaign. The paper argues this is reasonable because campaigns are not announced in advance, run for short periods, and are hard for rivals to see at Facebook's scale (p. 8).
- **Scope of the estimand.** The experiment estimates the campaign's average effect "conditional on all market conditions", including the advertiser's other channels (search, TV) and competitors' activity. It "may not generalize to similar future campaigns if market conditions change". If effects are nonlinear across media, it measures "something akin to the average net effect of the campaign given the distribution of non-Facebook advertising exposures across the sample" (p. 8). The same caveat applies to experiment-based priors in [[Bayesian Estimation and Priors for MMM]].

### Determinants of exposure (§2.3)

Compliance is **perfect in control**, since control users are never shown the ad, and **one-sided in test**, where exposure is an endogenous outcome. The resulting selection bias between exposed and unexposed test users comes from three mechanisms.

> [!definition] User-induced endogeneity — "activity bias" (§2.3, p. 8)
> A user can only be exposed by visiting Facebook during the campaign. If the conversion is itself an online action, exposed users convert more often "merely because they happened to be online during the campaign". The paper's example is a vacationing target user who skips Facebook and also does less online shopping. So "the conversion rate of the unexposed group provides a biased estimate of the conversion rate of the exposed group had it not been exposed." The term comes from Lewis, Rao & Reiley (2011); see [[Activity Bias in Advertising]].

^def-g19-user-endog

> [!definition] Targeting-induced endogeneity (§2.3, p. 9)
> Targeting criteria are fixed at launch, but the **delivery system** learns during the campaign which users are most likely to meet its objective (impressions, click-through rate or purchase). It then up-weights or down-weights bids for different user types, so the chance of exposure, conditional on the advertiser's bid, varies across users. Comparing exposed with unexposed users therefore usually **overstates** effectiveness. The bias can go the other way: if the campaign optimizes for clicks while the advertiser tracks purchases, "clicky users" may be *less* likely to buy.
>
> **This does not break the experiment.** Bid re-weighting applies equally to test and control users. In control the focal ad also gets extra weight and may win more often, but it is "replaced 'at the last moment' by the runner up and is thus never shown". The control group "remains a valid counterfactual ... even under ad-targeting optimization" (p. 9).

^def-g19-target-endog

> [!definition] Competition-induced endogeneity (§2.3, p. 9)
> An ad is delivered only if it beats competing bids, so exposure falls on users the advertiser values highly, usually those more likely to convert. Other advertisers' choices can also create selection. Example: if a rival bids high on 18-54-year-old women who are also mothers, mothers become *less* likely to see the focal ad. The bias can be downward too. If firms selling **complementary** products target the same users, win impressions and generate conversions, the unexposed users may be *more* likely to buy the focal product.

^def-g19-comp-endog

**How each approach handles this (end of §2.3).** The RCT uses random assignment together with exposure status. The observational methods "discard the randomized control group" and must rely on "treatment status and observables in the test group" alone.

## Examples

> [!example] Why exposed-vs-unexposed lift is inflated even with perfect identity (§2.3 applied to Study 4)
> **Setup.** In Study 4 (retail, checkout outcome) 37% of the test group was exposed. Exposed users are older, more female, more often married and more mobile-heavy than unexposed users (Table 5, [[Gordon et al 2019 - Observational Lift Estimates by Study and Method]]).
> **Mechanisms at work.** Activity bias: exposed users visit more, and online checkout is an online activity. Targeting: an optimizer aiming at purchases favors likely buyers. Competition: whichever segments rivals outbid end up unexposed.
> **Result.** The exposed-vs-unexposed lift is 316% against an RCT ATT lift of 73% (§7.2). All three mechanisms feed into that gap. The RCT is unaffected because the same optimizer and the same rivals act on the control arm.

^exa-g19-facebook-experiment-1

## Connections

- The three mechanisms are the advertising version of the generic decomposition in [[The Selection Problem]]: an observed difference equals the treatment effect plus selection bias.
- Targeting-induced endogeneity is the same confounding problem faced by aggregate models whose spend follows demand; see [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]].
- The click-optimization example, where the delivery system optimizes a proxy (clicks) different from the goal (purchases), is a Goodhart-type divergence; see [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].
- The runner-up control design is the platform-side version of ghost ads: [[Predicted Ghost Ads and Ghost Bids Mechanics]].
- The earlier search-ad benchmark with geo-level randomization is discussed in [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]].

## See Also

- [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]] — source map for the whole paper.
- [[Gordon et al 2019 - RCT Estimands, Unconfoundedness and Six Observational Estimators]] — the formal notation built on this design.
- [[Conversion Lift Studies on Ad Platforms]] — the product as a measurement tool across several sources.
- [[User-Level vs Geo-Level Experiments - When to Use Which]] — when this design is available and when to use geo tests instead.
