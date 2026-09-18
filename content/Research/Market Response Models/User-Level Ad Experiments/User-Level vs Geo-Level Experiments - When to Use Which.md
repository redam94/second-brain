---
title: User-Level vs Geo-Level Experiments - When to Use Which
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/geo-experiments
  - topic/experimental-design
  - type/application
  - doc/paper
source:
  - "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
  - "[[raw/Johnson Lewis Nubbemeyer 2017 - Ghost Ads.pdf]]"
  - "[[raw/Lin Misra 2022 - The Identity Fragmentation Bias.pdf]]"
  - "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
  - "[[raw/Gordon Moakler Zettelmeyer 2023 - Close Enough Non-Experimental Ad Measurement.pdf]]"
  - "[[raw/Johnson Lewis Reiley 2017 - When Less Is More Data and Power in Advertising Experiments.pdf]]"
source_location: "Synthesis note. Lewis & Rao 2015 §I fn. 6, §IV.B-D; Johnson, Lewis & Nubbemeyer §1.1, §2.1, §5.3, §6; Lin & Misra 2022 §4.2-4.3; Gordon et al. 2019 §1 (on Blake, Nosko & Tadelis), §2.2, §3.1; Gordon, Moakler & Zettelmeyer 2023 §1, §2.2, §7.1; Johnson, Lewis & Reiley 2017 §3, §5, App. A.2"
date_ingested: 2026-09-18
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[User-Level Ad Experiments - Overview]]"
  - "[[Geo-Experiment Methodology - Overview]]"
  - "[[Geo-Experiment Design and Power Analysis]]"
  - "[[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]"
  - "[[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]]"
  - "[[From ITT to Treatment-on-the-Treated in Ad Experiments]]"
  - "[[Conversion Lift Studies on Ad Platforms]]"
used_by:
  - "[[User-Level Ad Experiments - Overview]]"
aliases:
  - User-Level vs Geo Experiments
  - Choosing an Incrementality Test Design
  - Conversion Lift vs Geo Lift
  - Incrementality Test Decision Guide
---

# User-Level vs Geo-Level Experiments - When to Use Which

> [!summary]
> User-level and geo-level experiments answer the same question — what would sales have been without this advertising? — with opposite strengths. A **user-level test** randomizes millions of units, can prune unexposed users and pre-exposure outcomes ([[Predicted Ghost Ads and Ghost Bids Mechanics|ghost ads]]), and is by far the more *statistically efficient* design — **when** the platform offers a holdout, identity is stable, and outcomes can be joined to the randomized ID. A **geo test** randomizes tens to hundreds of regions and is an ITT design that "cannot eliminate the noise from purchases among those whom the advertiser is unable to reach" (Lewis & Rao), so it needs large spend changes and long pre-periods — **but** it is immune to [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests|identity fragmentation]], sees all sales in all channels, works on any geo-targetable medium, absorbs within-region spillovers, and is auditable by the advertiser. Rule of thumb: *user-level for within-platform, online-outcome, tactical questions; geo-level for cross-channel, offline-outcome, budget-level questions and for calibrating an MMM.*

## Overview

This note synthesises the rest of the cluster with the vault's geo material ([[Geo-Experiment Methodology - Overview]], [[Geo-Experiment Design and Power Analysis]], [[Time-Based Regression Estimator for Geo Experiments]], [[SDID for Geo Experiments and Marketing Panels]]). The sources frame geo randomization as the fallback: "ITT is compatible with geographic- rather than user-level randomization when the latter is infeasible" (Johnson, Lewis & Nubbemeyer §1.1); "for other media, geo-randomized advertising experiments are typically the state of the art" (Lewis & Rao fn. 6). Lin & Misra supply the counter-argument: once identities fragment, aggregation to geography is the only assumption-free fix. Both are right, and the decision depends on a handful of checkable conditions.

## Main Content

### Side-by-side

| Dimension | User-level (holdout / PSA / ghost ads / conversion lift) | Geo-level (GBR / TBR / synthetic control / SDID) |
|---|---|---|
| Unit and count | Cookie, device or login; $10^5$-$10^8$ | DMA, city, postcode cluster; $10^1$-$10^2$ |
| Assignment | Simple randomization by the platform | Randomized or matched; small samples need blocking |
| Estimand | ITT on the targeted audience; ATT on exposed users; *that campaign, that platform, tracked conversions, short window* | ITT on a region's whole population; incremental sales per incremental dollar; *all channels, all sales* |
| Noise removal | Drop unexposed users and pre-exposure outcomes (variance $\div$ 6-17 in Johnson, Lewis & Nubbemeyer) | Not possible; rely on pre-period modelling (TBR, SDID weights) |
| Power driver | Users, dose, control share, exposure rate | Geos, pre-period length, size of spend change, geo heterogeneity |
| Identity requirement | Stable ID linking assignment, exposure *and* outcome | None beyond residence of the buyer or store |
| Outcomes visible | What the pixel, SDK or matched file sees | Any geo-coded outcome: store sales, calls, app installs, brand search |
| Interference | Cross-device contamination; household sharing; auction and budget spillovers between arms | Commuting and border leakage; national media; supply spillovers shared across geos |
| Media covered | Addressable digital with a holdout product | Anything geo-targetable: TV, radio, OOH, search, social, retail media |
| Cost | Often free on the platform; opportunity cost of holdout is small | Opportunity cost of dark or heavy-up regions; analyst time; weeks of duration |
| Auditability | Randomization, exposure and often outcomes sit inside the platform | Advertiser owns assignment and outcome data |
| Role in MMM | Tight, *narrow* prior on a platform's short-run tracked effect | Wider, *broad* prior on a channel's total incremental ROAS |

### Six diagnostic questions

> [!algorithm] Choosing the design ^alg-choose
> 1. **Is there a user-level holdout at all?** If the medium is not addressable (linear TV, OOH, radio), if the platform offers no holdout product, or if RCTs are "technically difficult or even impossible to implement" there (Gordon, Moakler & Zettelmeyer §1) → **geo**. Do not substitute an observational user-level model: see [[Experimental Benchmarks for Observational Ad Measurement]].
> 2. **Can the outcome be joined to the randomized identifier?** Online conversions on a logged-in platform: yes. In-store sales: only with a database match — Johnson, Lewis & Reiley needed a third party to match 3.1M Yahoo! users to retailer records, the retailer attributed "more than 90%" of purchases to an individual, and most of the measured effect was *in store*. If the join is weak or biased → **geo**.
> 3. **Is identity stable across the purchase journey?** Logged-in walled garden: yes. Open-web cookies or device IDs with cross-device journeys: no — the bias is not even signed ([[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests#^thm-bias-decomposition|Lin & Misra's decomposition]]). If fragmented: run user-level as **ITT only**, randomized symmetrically across fragment types and scaled by fragments per person, or aggregate → **geo**.
> 4. **Is the question within one platform or across the media plan?** A lift study is "conditional on all market conditions" and does "not generalize to media being run on other channels" (Gordon et al. 2019 §2.2; 2023 §2.2). Creative, audience, bid strategy, frequency: **user-level** (multi-cell). Channel budget, cross-channel synergy, halo on brand search or retail partners: **geo**.
> 5. **Do treatment effects spill across users?** Household sharing, word of mouth, marketplace or inventory effects that move control users' outcomes violate SUTVA at the user level; regions internalize most of it ([[Interference and Marketplace Experiments]]). If spillovers are plausible and material → **geo**, with attention to border leakage.
> 6. **Is either design powered?** Run the numbers for both (next section) and pick the one with a usable interval. Often neither is for fine ROI distinctions, in which case combine evidence in a hierarchical or MMM framework instead of over-reading one test.

### Power, compared honestly

**User level.** With $N$ users per arm, outcome s.d. $\sigma$, exposure share $\pi$ and ATT $\delta$, an ITT analysis has $E[t]=\sqrt{N/2}\,\pi\delta/\sigma$, a ghost-ad analysis $E[t]=\sqrt{\pi N/2}\,\delta/\sigma$ ([[From ITT to Treatment-on-the-Treated in Ad Experiments#^thm-precision|precision theorem]]). At Lewis & Rao's calibration ($\delta/\sigma\approx0.005$) one needs on the order of a million *exposed* users per arm for $E[t]\approx3$ against zero effect. Large advertisers on large platforms clear this; Gordon, Moakler & Zettelmeyer still find a quarter of 7-million-user studies lacked 50% power for a 10% lift.

**Geo level.** A geo test is an ITT experiment on *everyone in the region, reached or not*. Lewis & Rao (fn. 6, §IV.D): such experiments "are significantly more expensive because they cannot eliminate the noise from purchases among those whom the advertiser is unable to reach." Aggregation helps — a region's sales are far less volatile relative to their mean than one person's — but the effective number of independent units collapses from millions to dozens, and region-level shocks are correlated over time. Power comes from (i) many geos, (ii) long, predictive pre-periods exploited by [[Time-Based Regression Estimator for Geo Experiments|TBR]], [[Counterfactual Impact Estimation|BSTS]] or [[SDID for Geo Experiments and Marketing Panels|SDID]] (roughly twice as precise as DiD even under randomization), and (iii) **large spend changes** — go-dark or heavy-up designs — the geo analogue of Lewis & Rao's "larger dose, better power", with the same external-validity cost under diminishing returns. See [[Geo-Experiment Design and Power Analysis]] for the pre-test CI half-width calculation and [[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]] for estimator choice.

**Shared caveats.** Short windows maximise power and understate total effects ([[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise#^thm-windows|window theorem]]); geo tests add a cooldown period for the same reason. Significant results from marginally powered tests are exaggerated ([[Type S and Type M Errors]]). Sequential looks need [[Always-Valid p-values and the mSPRT|always-valid inference]] in both designs.

### Interference runs in different directions

- **User-level.** (a) *Identity contamination* — one person in both arms — attenuates under symmetry and is unsigned otherwise. (b) *Household and social sharing* — conservative if test users share ads with controls (Gordon et al. 2019 fn. 9). (c) *Auction and budget effects* — the ghost-ad counterfactual assumes rivals' bids do not respond to the focal ad's removal; concurrent campaigns from the same advertiser can back-fill withheld impressions in control (Johnson, Lewis & Nubbemeyer §6); and with a fixed budget, impressions withheld from control users may be re-spent on test users, so the tested dose can differ from business as usual (a practitioner caveat, not from the cited papers).
- **Geo-level.** (a) *Geographic leakage* — commuters, cross-border shopping, imprecise geo-targeting — biases toward zero. (b) *National channels* cannot be varied by region. (c) *Competitive response* by region is possible in long tests. Within-region person-to-person spillovers are *included* in the estimand, which is what a budget decision wants.

### What each calibrates in an MMM

> [!definition] Matching experiment estimands to MMM quantities ^def-mmm-calibration
> A [[Bayesian Media Mix Modeling - Overview|Bayesian MMM]] channel coefficient represents the *total* effect of the channel's spend on *all* sales in a period, including [[Carryover (Adstock) Functional Forms|carryover]], at the observed spend level and mix.
> - A **geo test** estimates incremental total sales per incremental dollar for a specific spend change over the test plus cooldown window: nearly the same object. It maps to a prior or likelihood term on the channel's marginal ROAS over that window, after adjusting for the fraction of carryover falling outside the window.
> - A **user-level lift test** estimates incremental *tracked* conversions among the *targeted audience* within the *study window*, for *one campaign*, holding all other media fixed. Mapping it to the MMM requires (i) scaling tracked to total conversions, (ii) assuming untested campaigns on the platform perform similarly, (iii) a carryover extrapolation, and (iv) acknowledging that the ATT is an *average* over delivered impressions while budget decisions need the *marginal* effect (Lewis & Rao §III.D).
>
> Each step adds uncertainty that belongs in the prior's variance ([[Bayesian Estimation and Priors for MMM]]; [[Q - Using Experiment Results as Priors in a Bayesian MMM]]). When both exist for a channel they are complementary: the lift test pins the short-run tracked component tightly; the geo test bounds the total.

### Hybrid designs

- **Stratified aggregation** (Lin & Misra §4.3): analyse a user-randomized test at zipcode × demographic-cell level — between user and geo in both robustness and power.
- **Geo-randomized platform holdouts**: assign regions, implement the holdout through platform geo-targeting, and read outcomes from the advertiser's own geo-coded sales — keeping the platform's delivery optimization and the advertiser's auditability.
- **RCT-trained proxy models** (Gordon, Moakler & Zettelmeyer §7.1): run lift tests on a subset of campaigns and learn a campaign-level mapping from cheap metrics (e.g. last-click conversions) to incremental lift, extending experimental evidence to untested campaigns.
- **Always-on small holdouts** ("monitoring tests", Johnson, Lewis & Nubbemeyer §7) pooled through [[Hierarchical Models|hierarchical models]] across campaigns — the practical answer to Lewis & Rao's per-campaign power problem.

## Examples

**Three measurement briefs.**

1. *"Is our Meta prospecting campaign incremental for online orders?"* Logged-in platform, pixel-tracked outcome, within-platform question, 6M reachable users. → **Conversion Lift**, multi-cell if comparing audiences. Holdout nearer 20-30% than the default 10% (a third lower standard error at equal size; see [[Conversion Lift Studies on Ad Platforms]]). Report ITT, ATT, absolute incremental orders and cost per incremental order; feed the interval into the MMM as a *tracked-online* constraint.
2. *"What does connected-TV plus YouTube do for store sales of a grocery brand?"* Outcome is offline with no person-level join; exposure is household- and device-fragmented; the question spans two platforms. → **Geo test** with matched-market or randomized DMAs, heavy-up rather than go-dark if the retailer objects to dark regions, 8-12 weeks plus cooldown, analysed with TBR or SDID. Questions 2, 3 and 4 all point to geo; a user-level lift study would measure only the tracked sliver.
3. *"Does open-web retargeting through a DSP work?"* Cookie/device IDs; heavy cross-device shopping; retargeted users have high baseline conversion (where observational methods are worst, Gordon, Moakler & Zettelmeyer §6). → If the DSP supports **ghost bids**, run a user-level ITT with symmetric randomization and read it as a noisy quantity of uncertain sign-bias under fragmentation; otherwise use a **geo holdout** of the retargeting line. Never exposed-vs-unexposed attribution: Johnson, Lewis & Nubbemeyer found a real +10.8% sales effect for retargeting, whereas exposed-vs-unexposed comparisons in Gordon et al.'s studies routinely imply lifts of several hundred percent.

```python
import numpy as np

def user_level_t(n_per_arm, pi, d, ghost=True):
    """d = ATT / sd of the individual outcome (Cohen's d among exposed)."""
    return np.sqrt(pi * n_per_arm / 2) * d if ghost else np.sqrt(n_per_arm / 2) * pi * d

def geo_t(n_geos_per_arm, lift_pct, cv_geo_residual):
    """cv_geo_residual = residual sd of a geo's test-period sales / mean, after pre-period adjustment."""
    return np.sqrt(n_geos_per_arm / 2) * lift_pct / cv_geo_residual

print(user_level_t(2_000_000, 0.5, 0.005, ghost=True))    # 3.5
print(user_level_t(2_000_000, 0.5, 0.005, ghost=False))   # 2.5
print(geo_t(40, 0.03, 0.04))                              # 3.4: needs a 3% total-sales lift and 4% residual noise
```

The geo line makes the trade-off concrete: a 3% lift in *total* regional sales is a very large advertising effect, achievable only with a big spend differential, and a 4% residual coefficient of variation requires a good pre-period model. The same campaign measured at user level needs a standardized effect of 0.005 among two million users per arm — demanding, but routine on a large platform.

## Connections

- [[User-Level Ad Experiments - Overview]] and every note in this cluster — the user-level column of the table.
- [[Geo-Experiment Methodology - Overview]], [[Geo-Experiment Design and Power Analysis]], [[Time-Based Regression Estimator for Geo Experiments]], [[TBR Design Sensitivity and the Stationarity Assumption]], [[SDID for Geo Experiments and Marketing Panels]] — the geo column.
- [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]] — diagnostic question 3.
- [[Interference and Marketplace Experiments]] — diagnostic question 5.
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] and [[Power Analysis and Sample Size]] — diagnostic question 6.
- [[Bayesian Media Mix Modeling - Overview]] and [[Bayesian Estimation and Priors for MMM]] — what the results calibrate.
- [[Experimental Benchmarks for Observational Ad Measurement]] — why "neither is feasible, so use attribution" is not an option.

## See Also

- [[Q - Using Experiment Results as Priors in a Bayesian MMM]] and [[Q - Comparing Geo-Test Estimators from TBR to Synthetic DiD]] — companion Q&A notes.
- [[Q - Encoding a Geo-Holdout as a Bayesian Experimental Design and Computing Its EIG]] and [[Q - BED vs Bayesian Optimization vs Bandits for Media Experimentation]] — choosing *which* experiment to run next.
- [[Q - Carryover Dynamics and the Timing of Sequential Media Experiments]] — windows and cooldowns.
- [[Switchback Experiment Design and Analysis]] — time-randomized alternative when neither users nor geos can be split.
- [[Synthetic Control]], [[Differences-in-Differences]], [[SDID vs DiD vs Synthetic Control]] — estimators for the geo side.
- [[Online Experimentation - Overview]] — shared statistical infrastructure.
