---
title: Intent-to-Treat, PSA and Ghost Ad Designs
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/experimental-design
  - type/concept
  - doc/paper
source:
  - "[[raw/Johnson Lewis Nubbemeyer 2017 - Ghost Ads.pdf]]"
  - "[[raw/Johnson Lewis Reiley 2017 - When Less Is More Data and Power in Advertising Experiments.pdf]]"
  - "[[raw/Lewis Rao Reiley 2013 - Measuring the Effects of Advertising The Digital Frontier.pdf]]"
source_location: "Johnson, Lewis & Nubbemeyer (working paper, Feb 2016) §1.1, §2-3, Table 1, Figs. 1-5; Johnson, Lewis & Reiley 2017 §3-5, Table 2; Lewis, Rao & Reiley 2013 §8"
date_ingested: 2026-09-18
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[User-Level Ad Experiments - Overview]]"
  - "[[The Experimental Ideal]]"
  - "[[The Selection Problem]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Predicted Ghost Ads and Ghost Bids Mechanics]]"
  - "[[From ITT to Treatment-on-the-Treated in Ad Experiments]]"
  - "[[Conversion Lift Studies on Ad Platforms]]"
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
aliases:
  - PSA Tests
  - Placebo Ad Experiments
  - Public Service Announcement Control
  - Ghost Ads
  - Holdout Test Designs for Advertising
---

# Intent-to-Treat, PSA and Ghost Ad Designs

> [!summary]
> All user-level ad experiments share the same randomization — eligible vs held out — and differ in how they locate the control arm's **counterfactual treated** users. **Intent-to-treat (ITT)** does not try: it compares everyone, stays valid under any delivery system, and pays for it with noise from unexposed users. **PSA / placebo** designs serve the control arm a neutral ad through an identically configured campaign, so placebo impressions tag the counterfactual treated — but placebos cost as much as the real ads and become *invalid* once the platform optimizes delivery per creative. **Ghost ads** have the platform log the auctions the focal ad would have won for control users and serve whatever would have run instead: free, the right competitive baseline, and valid on action-optimized platforms (and for the first impression on user-optimized ones). Johnson, Lewis & Nubbemeyer's Table 1 is the one-line summary: PSAs work only on reach-based platforms; ghost ads work on all three generations.

## Overview

Setting (Johnson, Lewis & Nubbemeyer §2): an advertiser, users identified by a cookie or login, and an ad platform that matches ads to impression opportunities. Users are randomized into a treatment group *eligible* for the focal campaign and a control group that is *ineligible*. A treatment user is **treated** if actually exposed. Exposure depends on "both the ad platform's ad delivery decisions and the user's browsing decisions": the user cannot avoid a specific ad but determines how many opportunities she generates.

The paper's Figure 1 draws the ideal: both arms contain the same mix of user types among the would-be-exposed and the would-not-be-exposed, so differencing *treated* against *counterfactual treated* gives the [[From ITT to Treatment-on-the-Treated in Ad Experiments|treatment-on-the-treated]] effect. "In practice, while we can always split the treatment group into users who have and have not seen the ad, we do not observe the equivalent subgroups within the control group." The three designs are three answers to that missing-label problem.

## Main Content

### Design 1 — Intent-to-treat (holdout without control ads)

> [!definition] ITT design ^def-itt-design
> Compare mean outcomes of the *entire* treatment group with the *entire* control group, ignoring exposure. Requires only random assignment and SUTVA; needs no placebo inventory and no cooperation from the ad server beyond suppressing the campaign for held-out users.

Decompose the ITT contrast into (i) the experimental difference among would-be-treated users — the TOT — and (ii) the experimental difference among never-treated users. "Logically, the latter difference should be zero, but the empirical difference contributes noise that weakens precision" (§2.1). With equal outcome variance $\sigma^2$, $N$ users per arm and exposure share $\pi$, the TOT implied by ITT has standard error $\sigma\sqrt{2/N}/\pi$, against $\sigma\sqrt{2/(\pi N)}$ for a direct comparison of the $\pi N$ treated users in each arm: a variance penalty of $1/\pi$.

The penalty is severe when eligibility is decided "on the fly". Without a pre-defined eligible list the only valid population is *all users online during the campaign*, and the treated share "can be very small (e.g., 3% or less)". Advertisers can randomize their own targeting lists, but look-alike / broad-match expansion can leak treatment ads to control users, creating always-takers; the experiment is then still analysable as a [[Local Average Treatment Effects|LATE]] but loses its clean interpretation (fn. 3).

ITT is the design of necessity for search-ad "blackouts" and for geographic randomization (Blake, Nosko & Tadelis; Kalyanam et al.) — the link to [[Geo-Experiment Methodology - Overview|geo experiments]], which are ITT designs whose unit is a region. "High spend does not guarantee significant Intent-to-Treat results" (§1.1).

### Design 2 — PSA / placebo control ads

> [!definition] PSA design ^def-psa-design
> Book a second campaign — a public service announcement, a blank ad, a house ad, or an unrelated advertiser's ad — with *identical* configuration (quantity, dates, targeting, bid, budget) and deliver it to the control group. A control user who receives a PSA impression is flagged as counterfactual treated. The TOT estimator compares focal-ad-exposed treatment users with PSA-exposed control users.

Two precision gains (§2.2):

1. **Prune unexposed users**, who contribute only noise.
2. **Prune pre-exposure outcomes.** Outcomes before a user's first experimental impression cannot be affected; with symmetric delivery the first-impression date is observed in both arms, so those outcomes can be dropped.

Johnson, Lewis & Reiley (2017) quantify both on a 3.1M-user Yahoo!/retailer test (55% exposed; Full, Half and Control arms; control ads for Yahoo! Search). The indirect (ITT-scaled) TOT was \$0.67 (s.e. \$0.32). Restricting to exposed users cut standard errors by 25%; dropping pre-first-exposure purchases cut another 8%. In total 52.4% of in-campaign purchases were discarded and confidence intervals shrank 31% — "less data means more precise estimates". By contrast 236 covariates (demographics, RFM segments, two years of sales) reached $R^2=0.09$ and improved precision by only 5%. The experiment "would have to be 10% larger without covariates or 71% larger without control ads".

Two drawbacks (§2.2):

- **Cost.** Someone pays for the placebo inventory, and that cost "does not fall with scale". It also distorts design: of Lewis & Rao's 25 Yahoo! experiments only 8 used PSAs, and the average control share was a third although a 50/50 split maximizes precision; one advertiser in Hoban & Bucklin wanted under 2% in control. Lewis, Rao & Reiley (2013, §8) note a 90/10 split has the same power as 10/90, so with free controls an advertiser "could run 9 of the latter for the cost of 1 of the former".
- **Invalidity under optimized delivery** — below.

### Design 3 — Ghost ads

> [!definition] Ghost ad ^def-ghost-ad
> A **ghost ad impression** is a log entry flagging an occasion on which the ad platform *would have served* the focal ad to a control-group user. The user instead sees "whatever ads the ad platform chooses to deliver when the treatment ad is absent". Ghost ads "make the experimental ads visible to the ad platform and experimenter but invisible to the control group users" (§1, §3).

Advantages over PSAs:

- **No inventory or coordination cost**, so control groups can be large and experimentation can be automated.
- **The right baseline.** When the focal advertiser leaves the auction, other advertisers — possibly direct competitors — take the slot. If advertising plays a *defensive* role, a PSA baseline (chosen to be orthogonal to the advertiser) "will understate the total effect of the ads relative to Ghost Ad estimates". The ghost-ad counterfactual is "what happens if it does not advertise, not the artificial comparison with a sea turtle rescue PSA".
- **Robustness to delivery optimization.**

### Why PSAs break: three generations of ad platform

> [!theorem] Validity of control-ad approaches by platform generation (Johnson, Lewis & Nubbemeyer Table 1) ^thm-platform-generations
> | Generation | Platform | Buying model | PSA valid? | Ghost ad valid? |
> |---|---|---|---|---|
> | 1 | Reach-based | CPM | Yes | Yes |
> | 2 | Action-optimized | CPC, CPA | **No** | Yes |
> | 3 | User-optimized | Retargeting | **No** | Yes — **first ad only** |

- **Reach-based** (§3.1). Delivery ignores response feedback, so identically configured focal, PSA and ghost campaigns are delivered symmetrically. Treatment effects can still change later browsing (a click takes the user off the publisher), making *subsequent* exposure counts endogenous, but the authors find this negligible in practice and it cannot affect the *first* impression.
- **Action-optimized** (§3.2). The platform weights bids by predicted click/conversion probability learned per creative. "People who are interested in Louboutin shoes are likely quite different from those interested in rescuing sea turtles": the system learns to send shoe ads to fashion-site visitors and turtle ads to nature-site visitors. PSA-exposed control users are then a *different population* from focal-exposed treatment users, and the TOT comparison "will conflate the causal ad effect with the user-type selection bias" (Fig. 3). This matters because two thirds of display spend used performance optimization (IAB 2014). Ghost ads are unaffected: the same model scores the same focal ad for both arms. Google's DCM workaround — tricking the optimizer into treating both creatives as one — restores symmetry but measures the effect on a blend of "shoe-lovers and nature-lovers" and keeps the PSA cost (fn. 5).
- **User-optimized** (§3.3). Delivery now reacts to the individual's in-campaign behaviour (retargeting intensifies after a site visit, stops after a purchase). Users whom the ad *caused* to act receive different subsequent delivery, and "any implementation of the Ghost Ad methodology cannot know which users would have responded". But "each user's first experimental ad will be identical regardless of treatment or control assignment because the ad server has not yet treated or withheld any treatment". The first ghost impression suffices to identify the counterfactual treated and to prune pre-exposure outcomes. What is lost is dose-response: "a simple comparison of treatment users with control users having the same frequency of experimental ads will be biased."

### Validation checks a control-ad design must pass

From both papers' validation sections: (i) treatment share among *flagged-exposed* users equals the design share (JLN: 70.06% vs 70%, binomial $p=0.34$ — the ad-experiment analogue of a [[Sample Ratio Mismatch and Trustworthiness Checks|sample-ratio-mismatch test]], but run *on the exposed subsample*); (ii) balance on user characteristics and pre-period outcomes; (iii) balance on characteristics of the **first** experimental impression (site, format, predicted CTR/CVR, cost); (iv) equality of the distribution of total experimental impressions (reach-based platforms only — on user-optimized platforms a *difference* in later impressions is expected and is even a sign the campaign works). Johnson, Lewis & Reiley report that such checks "have often helped us to uncover execution errors such as incorrect matching of sales to advertising data, failure to create identical targeting between treatment and control ads, or unexpected selection bias generated by an advertising auction."

## Examples

**Costing the three designs for one campaign** (Johnson, Lewis & Nubbemeyer §5.3). The "Sportsing" retargeting test spent \$30,500 on a 70/30 treatment/control split and got $t=3.45$ on sales with ghost ads.

| Design | What changes | Cost for the same power |
|---|---|---|
| PSA test, 70/30 | Buy placebo inventory for the 30% control | about \$45,000 (+43%) |
| Ghost ads, 70/30 | As run | \$30,500 |
| Ghost ads, 30/70 | Power depends on $p(1-p)$, which is unchanged; treat fewer users | saves 58% of budget |
| Ghost ads, concentrated 6/94 | Double per-user spend; if the effect scales with spend, solve $2\delta\sqrt{Np(1-p)}=\delta\sqrt{N(0.3)(0.7)}$ giving $p\approx5.6\%$ | about \$5,000 (-83%) |
| ITT only | No exposure flags; variance 6-17 times larger (Table 3) | roughly an order of magnitude more users |

The concentrated design is an "accelerated failure test": it assumes no wear-out from doubling frequency, trading external validity at normal intensity for power — the same bias-variance trade Lewis & Rao discuss.

```python
# power is proportional to sqrt(N p (1-p)) * effect; equal power <=> equal product
import numpy as np
from scipy.optimize import brentq
base = 0.7 * 0.3
p = brentq(lambda p: 4 * p * (1 - p) - base, 1e-6, 0.5)   # effect doubles -> factor 2**2
print(round(p, 3))            # 0.056
print(round(30500 * (p / 0.7) * 2))   # ~4,900 dollars
```

## Connections

- [[User-Level Ad Experiments - Overview]] — where these designs sit in the cluster.
- [[Predicted Ghost Ads and Ghost Bids Mechanics]] — how ghost ads are implemented when the platform does not control rendering.
- [[From ITT to Treatment-on-the-Treated in Ad Experiments]] — estimators attached to each design.
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] — why the $1/\pi$ variance penalty is decisive.
- [[Conversion Lift Studies on Ad Platforms]] — Meta's product is an ITT design with a ghost-ad-style counterfactual.
- [[The Experimental Ideal]] and [[The Selection Problem]] — PSA failure under optimization is selection bias re-entering a randomized design through a post-treatment subset.
- [[Activity Bias in Advertising]] — the browsing-driven component of exposure that all three designs neutralize.

## See Also

- [[CUPED and Regression-Adjusted Variance Reduction]] — covariate adjustment; in ad tests it helps far less than pruning (5% vs 31%).
- [[Sample Ratio Mismatch and Trustworthiness Checks]] — generic randomization diagnostics.
- [[Geo-Experiment Design and Power Analysis]] — the ITT design with regions as units.
- [[Instrumental Variables and Principal Stratification]] — "counterfactual treated" are the compliers stratum.
- [[User-Level vs Geo-Level Experiments - When to Use Which]] — design selection in practice.
