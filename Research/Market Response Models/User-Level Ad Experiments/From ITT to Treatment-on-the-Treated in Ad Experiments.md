---
title: From ITT to Treatment-on-the-Treated in Ad Experiments
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/instrumental-variables
  - topic/causal-inference
  - type/method
  - doc/paper
source:
  - "[[raw/Gordon et al 2019 - A Comparison of Approaches to Advertising Measurement.pdf]]"
  - "[[raw/Gordon Moakler Zettelmeyer 2023 - Close Enough Non-Experimental Ad Measurement.pdf]]"
  - "[[raw/Johnson Lewis Reiley 2017 - When Less Is More Data and Power in Advertising Experiments.pdf]]"
  - "[[raw/Johnson Lewis Nubbemeyer 2017 - Ghost Ads.pdf]]"
source_location: "Gordon et al. 2019 §2.3, §3.1-3.3 eq. (1)-(8), §7.1 Tables 3-4, fn. 10, 20; Gordon, Moakler & Zettelmeyer 2023 §4.1 eq. (1)-(4); Johnson, Lewis & Reiley 2017 §5, Table 2, fn. 2; Johnson, Lewis & Nubbemeyer §2.1, §4"
date_ingested: 2026-09-18
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Intent-to-Treat, PSA and Ghost Ad Designs]]"
  - "[[Local Average Treatment Effects]]"
  - "[[Instrumental Variables]]"
  - "[[Instrumental Variables and Principal Stratification]]"
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Conversion Lift Studies on Ad Platforms]]"
  - "[[Experimental Benchmarks for Observational Ad Measurement]]"
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
aliases:
  - ITT to ATT Scaling
  - Treatment on the Treated in Advertising
  - One-Sided Noncompliance in Ad Experiments
  - Incremental Lift
  - ATT Lift
---

# From ITT to Treatment-on-the-Treated in Ad Experiments

> [!summary]
> In an ad holdout, assignment $Z$ is random and exposure $W$ is not. Because held-out users are *never* exposed, noncompliance is **one-sided**: the population splits into compliers (would be exposed if eligible) and never-takers, with no always-takers or defiers. Under an exclusion restriction — assignment affects outcomes only through exposure, plausible because users do not know their arm — the effect on exposed users is the intent-to-treat effect divided by the exposure rate, $\text{ATT}=\text{ITT}_Y/\pi_{co}$. This is the Wald / 2SLS estimator with $Z$ as the instrument, and here the [[Local Average Treatment Effects|LATE]] *is* the ATT. **Lift** re-expresses the ATT relative to the exposed users' *counterfactual* conversion rate. The scaling changes the point estimate, not the $t$-statistic: precision gains come only from designs that identify the control arm's would-be-exposed users.

## Overview

Gordon, Zettelmeyer, Bhargava & Chapsky (2019, §3) give the cleanest statement of the estimands, in the Imbens-Rubin potential-outcomes notation also used in [[Potential Outcomes Framework]]. Each study has users $i=1,\dots,N$, random assignment $Z_i\in\{0,1\}$, potential exposure $W_i(Z_i)\in\{0,1\}$, covariates $X_i$, and potential outcomes $Y_i(Z_i,W_i(Z_i))\in\{0,1\}$ (converted or not). The defining feature of a holdout is
$$
W_i(0)=0\quad\text{for all } i ,
$$
"compliance is perfect for users in the control group, who are never shown campaign ads. However, compliance is one-sided in the test group, where exposure (receipt of treatment) is an endogenous outcome that depends on factors related to the user, platform, and advertisers" (§2.3). Three user groups are observed: control-unexposed, test-unexposed, test-exposed.

Why exposure is endogenous even inside a randomized test arm (§2.3):

- **User-induced** — [[Activity Bias in Advertising|activity bias]]: you must be online to be exposed, and being online predicts online conversion.
- **Targeting-induced** — the delivery system up-weights bids for users it predicts will convert; optimizing for clicks can even produce *negative* selection on purchases ("clicky users").
- **Competition-induced** — winning an auction depends on rivals' bids; rivals selling complements who win impressions can leave the *unexposed* pool enriched with likely buyers.

Randomization neutralizes all three for the $Z$ contrast because the same bid-weighting is applied to both arms; "for members of the control group, the focal ad is replaced 'at the last moment' by the runner up."

## Main Content

> [!definition] Assumptions ^def-assumptions
> 1. **SUTVA** — one version of treatment; no interference between users. Supported on Facebook by single-user login (no accidental exposure of controls) and by users not knowing their arm; ad-sharing from test to control users would make estimates *conservative*.
> 2. **Random assignment** — $Z_i\perp\{Y_i(z,w),W_i(z)\}$. Supports an ITT analysis on its own.
> 3. **Exclusion restriction** — $Y_i(0,w)=Y_i(1,w)$ for $w\in\{0,1\}$: "assignment affects a user's outcome only through receipt of the treatment. Because users are unaware of their assignment status, only exposure should affect outcomes." Required only for the ATT.

> [!definition] ITT and ATT ^def-itt-att
> $$
> \text{ITT}_Y=E[Y(1,W(1))-Y(0,W(0))],
> $$
> $$
> \text{ATT}=E[Y(1,W(1))-Y(0,W(0))\mid W(1)=1].
> $$
> The ITT "should be interpreted as conditional on the platform's ad-optimization system" (fn. 10) — the "entire treatment" includes who the delivery engine chose to reach. The ATT "is inherently conditional on the set of users who end up being exposed", so it is not comparable across campaigns with different targeting.

> [!theorem] ITT-to-ATT scaling under one-sided noncompliance (Gordon et al. 2019 eq. 5-7) ^thm-itt-att
> Under assumptions 1-3,
> $$
> \tau\equiv\text{ATT}=\frac{\text{ITT}_Y}{\text{ITT}_W}=\frac{E[Y(1,W(1))]-E[Y(0,W(0))]}{E[W(1)]-E[W(0)]}=\frac{\text{ITT}_Y}{\pi_{co}},
> $$
> where $\pi_{co}=E[W(1)]$ is the share of compliers, since $E[W(0)]=0$.
>
> *Derivation.* Write the ITT as a mixture over compliers and never-takers,
> $$
> \text{ITT}_Y=\text{ITT}_{Y,co}\,\pi_{co}+\text{ITT}_{Y,nc}\,(1-\pi_{co}).
> $$
> For never-takers $W(1)=W(0)=0$, so by exclusion $\text{ITT}_{Y,nc}=E[Y(1,0)-Y(0,0)]=0$. Hence $\text{ITT}_{Y,co}=\text{ITT}_Y/\pi_{co}$. "Scaling $\text{ITT}_Y$ by the inverse of $\pi_{co}$ 'undilutes' the ITT effect." Imbens & Angrist call this quantity the LATE; "if the sample contains no 'always-takers' and no 'defiers,' which is true in our experimental design with one-sided non-compliance, the LATE is equal to the ATT."

In practice the ATT and its standard error come from **two-stage least squares** of $Y$ on $W$ with $Z$ as the instrument (Gordon, Moakler & Zettelmeyer §4.1). Johnson, Lewis & Reiley call the same thing the *indirect TOT estimator* and note it "is numerically equivalent to computing a local average treatment effect by using the random assignment as an instrument for treatment" (fn. 2). The first stage is as strong as an instrument gets — $\pi_{co}$ is typically 0.3-0.8 and estimated from millions of users — so weak-instrument concerns do not arise; the difficulty is entirely the noisy reduced form.

> [!definition] Lift ^def-lift
> $$
> \tau_\ell=\frac{\tau}{E[Y\mid Z=1,W^{obs}=1]-\tau},
> $$
> the incremental conversion rate among treated users as a percentage of "the estimated conversion rate of the treated group if they had not actually been treated" (Gordon et al. 2019 eq. 8). The denominator is not the control mean: exposed users are selected, so their counterfactual baseline differs from the arm-wide control rate. Lift normalizes across advertisers and outcomes but "differences between methods can seem large when the treated group's baseline conversion rate is small". Confidence intervals are obtained by bootstrap because lift is a ratio.

### What the scaling does and does not buy

> [!theorem] Scaling does not improve precision; identifying the counterfactual treated does ^thm-precision
> Since $\pi_{co}$ is estimated almost without error, $\widehat{\text{ATT}}\approx\widehat{\text{ITT}}/\pi_{co}$ and $\text{se}(\widehat{\text{ATT}})\approx\text{se}(\widehat{\text{ITT}})/\pi_{co}$: the $t$-statistic is unchanged. With $N$ users per arm and common outcome variance $\sigma^2$,
> $$
> \text{se}_{\text{indirect}}=\frac{\sigma}{\pi_{co}}\sqrt{\frac{2}{N}}\qquad\text{vs}\qquad\text{se}_{\text{direct}}=\sigma\sqrt{\frac{2}{\pi_{co}N}},
> $$
> where the *direct* estimator compares treated users with *identified* counterfactual-treated controls (placebo- or ghost-tagged). The variance ratio is $1/\pi_{co}$. For $\pi_{co}=0.554$ this predicts a 25.6% smaller standard error, matching the 25% Johnson, Lewis & Reiley measure; for the 3% exposure rates of on-the-fly ITT tests it is a 33-fold variance penalty. Johnson, Lewis & Nubbemeyer's empirical ITT-to-PGA variance ratios of 5.9-17.1 additionally reflect pruning of pre-exposure outcomes.

So there are two distinct estimators of the same ATT:

| | Indirect (Wald / 2SLS) | Direct (control-ad or ghost-ad tagged) |
|---|---|---|
| Needs | Assignment, exposure in test arm | A symmetric exposure flag in **both** arms |
| Sample | Everyone eligible | Flagged users only; post-first-exposure outcomes |
| Bias risk | Exclusion restriction only | Asymmetric tagging (PSA under optimization; PGA under-prediction) |
| Precision | Baseline | Variance reduced by about $\pi_{co}$, more with outcome pruning |
| Used by | Meta Conversion Lift; geo tests | Yahoo! PSA tests; Google predicted ghost ads |

### Interpretation cautions

- **The ATT is local to the delivery system.** Compliers are whoever the auction, pacing and targeting model chose to reach at that budget. "If campaign length and budget were increased, additional unexposed users might become exposed" (Gordon, Moakler & Zettelmeyer fn. 8). Extrapolating an ATT to a larger budget assumes marginal compliers respond like average ones — usually optimistic, since delivery systems reach the most responsive users first.
- **It is conditional on everything else running**, "such as marketing activities the advertiser conducts in other channels (e.g., search, TV) and its competitors' activities" (2019 §2.2).
- **Short windows give conservative totals.** Conversions after the measurement window are missed (2019 fn. 19); see [[Delayed Feedback Model for Conversion Prediction]] for the censoring structure, and [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] for why long windows hurt power.
- **"Non-compliers" did not choose.** Unlike a drug trial, unexposed users "did not fail to comply as a result of their own deliberate decisions"; exposure results from user activity, the auction and the platform jointly (2023 §1). The never-taker/complier language is formal, not behavioural.
- **ITT or ATT for decisions?** Total incremental conversions are identical either way: $\text{ITT}\times N_{\text{eligible}}=\text{ATT}\times N_{\text{exposed}}$. ITT answers "what did launching this campaign at this audience buy?"; ATT answers "what is an exposure worth?" and is the quantity observational methods try to estimate, which is why Gordon et al. benchmark on it ([[Experimental Benchmarks for Observational Ad Measurement]]).

## Examples

**Study 4 of Gordon et al. (2019), a retail checkout outcome** (Tables 3-4, fn. 20), 25.6M users, 70/30 split:

| Quantity | Value |
|---|---|
| Control conversion rate | 0.033% |
| Test conversion rate | 0.045% |
| ITT | 0.012 pp (ITT lift 37.7%, CI [27.2%, 49.1%]) |
| Share of test users exposed, $\pi_{co}$ | 37% |
| ATT $=0.012/0.37$ | 0.033 pp |
| Exposed-in-test conversion rate | 0.079% |
| Counterfactual rate of exposed $=0.079-0.033$ | 0.046% |
| ATT lift | 72.8%, CI [49%, 103%] |
| Unexposed-in-test conversion rate | 0.025% |

The counterfactual rate for exposed users (0.046%) follows from the identifying assumption that unexposed test users would have converted at the same rate in control: $0.033\%=0.37\,c+0.63\times0.025\%$ gives $c\approx0.046\%$. Exposed users' baseline is nearly double the unexposed users' — the selection that makes the naive exposed/unexposed comparison report a lift of 316%.

```python
import numpy as np   # y, z, w are user-level numpy arrays

def lift_from_holdout(y, z, w):
    itt = y[z == 1].mean() - y[z == 0].mean()
    pi_co = w[z == 1].mean()                 # w is 0 for all z == 0 by design
    att = itt / pi_co                        # == 2SLS coefficient on w, instrument z
    base_exposed = y[(z == 1) & (w == 1)].mean() - att
    return dict(itt=itt, pi_co=pi_co, att=att, lift=att / base_exposed)

# bootstrap users (not conversions) for the lift interval
```

## Connections

- [[Local Average Treatment Effects]] — general LATE theorem; this note is its one-sided special case where LATE = ATT.
- [[Instrumental Variables]] — $Z$ is a textbook instrument: randomly assigned, excluded, and with a very strong first stage.
- [[Instrumental Variables and Principal Stratification]] — compliers/never-takers as principal strata; monotonicity holds by construction because $W(0)=0$.
- [[Intent-to-Treat, PSA and Ghost Ad Designs]] and [[Predicted Ghost Ads and Ghost Bids Mechanics]] — designs that enable the *direct* estimator; PGA LATE is the Wald ratio inside the predicted-exposed stratum.
- [[Conversion Lift Studies on Ad Platforms]] — where the indirect estimator is productised.
- [[Activity Bias in Advertising]] and [[The Selection Problem]] — why conditioning on exposure without an instrument fails.
- [[User-Level Ad Experiments - Overview]].

## See Also

- [[Potential Outcomes Framework]] — notation.
- [[The Experimental Ideal]] — ITT as the always-valid randomized contrast.
- [[Geo-Experiment Design and Power Analysis]] — geo tests estimate an ITT-type effect per dollar (incremental ROAS) and never attempt the ATT.
- [[Bayesian Estimation and Priors for MMM]] and [[Q - Using Experiment Results as Priors in a Bayesian MMM]] — converting ITT/ATT into incremental outcomes per dollar for model calibration.
- [[Type S and Type M Errors]] — dividing a noisy ITT by a small $\pi_{co}$ magnifies exaggeration in absolute terms.
