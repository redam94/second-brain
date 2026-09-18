---
title: Predicted Ghost Ads and Ghost Bids Mechanics
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/instrumental-variables
  - type/method
  - doc/paper
source:
  - "[[raw/Johnson Lewis Nubbemeyer 2017 - Ghost Ads.pdf]]"
  - "[[raw/Gordon Moakler Zettelmeyer 2023 - Close Enough Non-Experimental Ad Measurement.pdf]]"
  - "[[raw/Barajas Bhamidipati Shanahan 2021 - Online Advertising Incrementality Testing Tutorial.pdf]]"
source_location: "Johnson, Lewis & Nubbemeyer (working paper, Feb 2016) §4 eq. (1), §5.1-5.3, §6, Tables 2-3, Fig. 6; Gordon, Moakler & Zettelmeyer 2023 §2.2; Barajas, Bhamidipati & Shanahan 2021 tutorial outline Parts 2-3"
date_ingested: 2026-09-18
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Intent-to-Treat, PSA and Ghost Ad Designs]]"
  - "[[Local Average Treatment Effects]]"
  - "[[Instrumental Variables]]"
used_by:
  - "[[From ITT to Treatment-on-the-Treated in Ad Experiments]]"
  - "[[Conversion Lift Studies on Ad Platforms]]"
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
aliases:
  - Predicted Ghost Ads
  - PGA LATE
  - Ghost Bids
  - Ghost Bidding
  - Ghost Events
  - Auction Isolation
---

# Predicted Ghost Ads and Ghost Bids Mechanics

> [!summary]
> A pure ghost ad requires the platform to *know* when it would have shown the focal ad to a control user. Display platforms do not fully control rendering — a publisher can reject the ad after the platform selects it — so naive ghost tags would over-count counterfactual exposures in the control arm and break symmetry. **Predicted ghost ads (PGA)** fix this by running a **simulated first-round auction that includes the focal ad for both arms**, logging a PGA impression whenever the focal ad wins the simulation, and only then running the real auction (with the focal ad removed for control users). The PGA flag is a pre-treatment, symmetric *predictor* of exposure; the effect on predicted-exposed users is a **LATE** obtained by dividing the experimental difference among PGA users by the exposure rate given prediction (99.9% in the paper's application). More general **ghost events** — *ghost bids* (the advertiser bid in one of the user's auctions), *ghost cookied* (the advertiser has a cookie for the user) — trade power for robustness and are what a DSP or an advertiser without auction control can implement.

## Overview

Johnson, Lewis & Nubbemeyer (§4) explain why the clean idea of [[Intent-to-Treat, PSA and Ghost Ad Designs#^def-ghost-ad|ghost ads]] is hard to ship. Display ad platforms are "a network of interlocking demand- and supply-side platforms with imperfect information and incomplete integration", and each impression must be allocated "within a tenth of a second". After the platform selects an ad:

- the publisher may have a secret reserve price the bid does not clear;
- the publisher may block certain advertisers;
- the creative may be technically incompatible (e.g. Flash rejected).

In each case the impression is back-filled with another ad. For treatment users the platform sees which focal ads actually rendered; for control users it cannot see which ghost ads *would* have rendered. Tagging "platform wanted to serve" in control but "actually served" in treatment would compare different populations.

## Main Content

> [!algorithm] Predicted ghost ad two-stage auction (JLN §4, Fig. 6) ^alg-pga
> For every ad opportunity of every user in the experiment, *regardless of arm*:
> 1. **Simulated auction.** Run the ad-selection auction with the focal (treatment) ad included in the candidate set. If the focal ad wins, write a **predicted ghost ad impression** to a log. This step is identical for treatment and control users, so $PGA_i$ is a function of pre-treatment information only.
> 2. **Real auction.** Run the real auction. For treatment users the focal ad participates normally; for control users the focal ad is excluded, so the next-best ad is sent to the publisher.
> 3. **Rendering.** The publisher renders or rejects. Actual focal-ad exposure $X_i$ is observed for treatment users.
> 4. **Analysis.** Restrict to users with at least one PGA impression; optionally drop outcomes before each user's *first* PGA impression; compute the estimator below.
>
> "Whereas ghost ads only tag control users, predicted ghost ads tag both treatment and control users."

> [!definition] PGA-LATE estimator (JLN eq. 1) ^def-pga-late
> With $T$ the treatment-assignment indicator, $PGA$ predicted ghost ad exposure and $X$ actual exposure,
> $$
> \text{PGA LATE}=\frac{E[y\mid PGA=1,T=1]-E[y\mid PGA=1,T=0]}{\Pr[X=1\mid PGA=1,T=1]}.
> $$
> "The PGA LATE estimator rescales the experimental difference among predicted exposed users by the probability a user receives a treatment ad conditional on predicted exposure." With a continuous prediction $PGA\in[0,1]$ the same quantity can be estimated by an instrumental-variable regression (fn. 8).

This is the Wald / [[Local Average Treatment Effects|LATE]] estimator of [[From ITT to Treatment-on-the-Treated in Ad Experiments]] applied *within the stratum $PGA=1$*. Conditioning on $PGA$ is legitimate because it is determined before and independently of assignment; conditioning on actual exposure $X$ is not, because $X$ is only defined for the treatment arm. A common mistake (fn. 7) is to compare *exposed* treatment users with *predicted-exposed* control users: if the simulator over-predicts by 10% one ends up "comparing 1,000 treatment users to 1,100 control users" — a selection bias that a [[Sample Ratio Mismatch and Trustworthiness Checks|sample-ratio check]] would flag immediately.

> [!theorem] When PGA LATE equals the TOT ^thm-pga-tot
> Two kinds of prediction error matter differently.
> - **Over-prediction** ($PGA=1$ but the focal ad does not render) only dilutes: it is handled by the denominator. In the application $\Pr[X=1\mid PGA=1,T=1]=99.9\%$.
> - **Under-prediction** (the focal ad renders for a user never flagged) means some treated users lie outside the analysed stratum. "If no underprediction occurs, then the PGA LATE estimator captures the effect of the ads on all exposed users and provides an unbiased estimate of the average effect of treatment on the treated." In the application 3.2% of treated users were unpredicted, but they saw 1.5 ads on average versus 20.2 for predicted-exposed users, who received 99.8% of the campaign's impressions — so PGA LATE "well approximate[s] TOT".

### Sources of under-prediction and the fixes

Under-prediction arose mainly from **overlapping PGA experiments**. If a user is in both a Louboutin and an IKEA experiment, IKEA may win the simulated auction (so no Louboutin PGA is logged); but if the user is an IKEA *control* and a Louboutin *treatment*, the real auction excludes IKEA and Louboutin can win. Two remedies (§4):

- **Auction isolation** — run a *separate* simulated auction per overlapping PGA campaign, eliminating cross-campaign externalities while keeping full power.
- **Ghost events** — fall back to a coarser symmetric flag that is *necessary but not sufficient* for exposure, in the spirit of "exposure logging" in Bakshy, Eckles & Bernstein (2014).

> [!definition] Ghost events, ghost bids, ghost cookied ^def-ghost-events
> A **ghost event** is any logged activity, recorded identically in both arms, that is a necessary condition for experimental exposure. Examples in decreasing order of power:
> - *all predicted ghost ads* — the user received a PGA for **any** experiment in the system;
> - **ghost bids** — "the advertiser bids in any of the user's auctions";
> - **ghost cookied** — "all users for whom the advertiser has a cookie".
>
> The corresponding LATE estimators remain unbiased and symmetric but are "less powerful because [they include] more unexposed users": the exposure rate in the denominator falls and the $1/\pi$ variance penalty rises.

Ghost bids are the version available to a buyer who does *not* run the exchange. A demand-side platform can decide, for a held-out user, to compute the bid it would have submitted, log it, and not submit it; it cannot know whether that bid would have won. Gordon, Moakler & Zettelmeyer (§2.2) note that Facebook's Conversion Lift "effectively corresponds to the Ghost Bids approach in Johnson et al. (2017a), except it is being implemented directly by the ad platform": the measured population is every targeted user for whom the focal ad *participated in at least one auction*, and the analysis is ITT on that set. See [[Conversion Lift Studies on Ad Platforms]]. Barajas, Bhamidipati & Shanahan's tutorial outline likewise files "ghost bidding as intention to treat experiment" under DSP practice and flags that placebo designs are "subject to targeting bias: not blind to serving engine", motivating *double-blind* designs in which the serving and scoring systems cannot condition on arm.

### Empirical validation (JLN §5)

"Sportsing Inc.", an online sports/outdoors retailer, ran a transaction-optimized dynamic **retargeting** campaign on the Google Display Network — a third-generation, user-optimized setting where PSAs are invalid. Two weeks, 70/30 split, 9 million impressions, \$30,500, 566,377 predicted-exposed users (396,793 / 169,584).

- **Symmetry checks (Table 2).** Treatment share among PGA users 70.06% ($p=0.34$). First-PGA-impression characteristics balanced: publisher site $p=0.49$, creative format $p=0.68$, predicted CTR $p=0.47$, predicted conversion rate $p=0.10$, predicted cost per impression $p=0.10$, CPC $p=0.38$. Pre-period and pre-first-exposure outcomes balanced ($p$ between 0.11 and 0.92). *Averages over all impressions* differ with $p=0.00$ — expected, because purchasers drop out of retargeting and the ad-induced purchasers exist only in the treatment arm. "A lack of difference between subsequent treatment and control impressions might be symptomatic of an ineffective (retargeting) campaign."
- **Effects (Table 3, post-first-PGA outcomes).** Site visitors +26.6% ($t=40.4$), site visits +17.2% ($t=13.3$), transactors +12.1% ($t=5.9$), transactions +12.0% ($t=5.4$), sales +10.8% (\$109,693, s.e. \$31,799, $t=3.45$).
- **ITT comparison.** ITT sales difference \$265,165 (s.e. \$131,540, $t=2.02$). Hausman tests do not reject equality of ITT and PGA LATE ($p$ from 0.21 to 0.61); the **relative variance of ITT is 5.9 to 17.1** across outcomes — "experiments using only ITT estimates would need to be an order of magnitude larger".

### Implementation hazards (JLN §6)

- **Perfect symmetry is an engineering property, not a statistical one.** Every ad-server code release can break it; the pipeline needs continuous monitoring. The Google implementation took three years and logged over 100 million PGAs a day.
- **Combinatorial auctions.** One slot may be won by one display ad or several text ads; the PGA system must log multiple winners and cover every impression on the page.
- **Concurrent campaigns by the same advertiser.** If a second campaign back-fills the withheld impressions in control, or learns from the test campaign's performance, control users become always-takers with *lower* intensity; PGA LATE then measures the test campaign net of that interference. Fix: one campaign at a time, or disjoint audiences.
- **Copy tests.** Three arms (A, B, shared control with ghost ads for each) let the optimizer deliver each creative to its own best audience while reusing one control group.
- **Viewability.** Logging the *predicted displaced ad* (simulate with and without the focal ad) allows symmetric conditioning on viewable impressions.
- **Cookie churn** attenuates effects — see [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]].

## Examples

**Computing PGA LATE from a log extract.**

```python
import pandas as pd

def pga_late(df, share_treat=0.7):
    """df: one row per user with columns
       T (0/1 assignment), pga (0/1 any predicted ghost ad),
       x (0/1 actually exposed; 0 for all controls), y (post-first-PGA outcome)."""
    d = df[df.pga == 1]
    # sample-ratio check on the analysed stratum
    print("treat share among PGA users:", d["T"].mean(), "expected", share_treat)
    diff = d.loc[d["T"] == 1, "y"].mean() - d.loc[d["T"] == 0, "y"].mean()
    take_up = d.loc[d["T"] == 1, "x"].mean()          # Pr[X=1 | PGA=1, T=1]
    under = df.loc[(df["T"] == 1) & (df.x == 1), "pga"].eq(0).mean()
    print("under-prediction share of treated users:", under)   # want ~0
    return diff / take_up
```

With Table 3's numbers the sales effect is \$0.28 per predicted-exposed user; divided by 0.999 it is unchanged to the cent, and with 3.2% under-prediction concentrated on users seeing 1.5 ads the gap between PGA LATE and the full-campaign TOT is negligible.

## Connections

- [[Intent-to-Treat, PSA and Ghost Ad Designs]] — the design taxonomy this note implements.
- [[From ITT to Treatment-on-the-Treated in Ad Experiments]] — the Wald/LATE logic behind eq. (1).
- [[Local Average Treatment Effects]] and [[Instrumental Variables]] — $T$ instruments $X$ within the $PGA=1$ stratum; the PGA flag is a pre-treatment covariate defining the population, in the language of [[Instrumental Variables and Principal Stratification]].
- [[Conversion Lift Studies on Ad Platforms]] — Meta's ghost-bid-style implementation.
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] — a 6-17 times variance reduction is what turns an uninformative ITT test into a usable one.
- [[User-Level Ad Experiments - Overview]].

## See Also

- [[Sample Ratio Mismatch and Trustworthiness Checks]] — the balance checks in Table 2 are SRM tests on a conditioned sample.
- [[Interference and Marketplace Experiments]] — removing a bidder changes auction outcomes for others; the ghost-ad counterfactual assumes competitors' strategies are fixed in the short run.
- [[Multi-Armed Bandits and Thompson Sampling - Overview]] — free control groups enable explore-exploit testing of campaigns.
- [[User-Level vs Geo-Level Experiments - When to Use Which]].
