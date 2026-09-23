---
title: The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/power-analysis
  - type/concept
  - doc/paper
source:
  - "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
  - "[[raw/Lewis Rao Reiley 2013 - Measuring the Effects of Advertising The Digital Frontier.pdf]]"
  - "[[raw/Johnson Lewis Reiley 2017 - When Less Is More Data and Power in Advertising Experiments.pdf]]"
  - "[[raw/Gordon Moakler Zettelmeyer 2023 - Close Enough Non-Experimental Ad Measurement.pdf]]"
source_location: "Lewis & Rao 2015 (QJE 130(4)) §I, §II.A-B eq. (1)-(8), §III Tables I-III, Fig. II, §III.D, §IV.C-D; Lewis, Rao & Reiley 2013 (NBER w19520) §6 eq. (8), §8 fn. 24; Johnson, Lewis & Reiley 2017 §3, §5; Gordon, Moakler & Zettelmeyer 2023 §4.2 fn. 20, Fig. 6"
date_ingested: 2026-09-18
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[User-Level Ad Experiments - Overview]]"
  - "[[Power Analysis and Sample Size]]"
  - "[[Type S and Type M Errors]]"
  - "[[The Experimental Ideal]]"
used_by:
  - "[[Experimental Benchmarks for Observational Ad Measurement]]"
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
  - "[[Conversion Lift Studies on Ad Platforms]]"
aliases:
  - Unfavorable Economics of Measuring Returns to Advertising
  - Lewis and Rao 2015
  - Statistical Power of Advertising Experiments
  - Impact-to-Standard-Deviation Ratio
  - Experiment Multiplier
---

# The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise

> [!summary]
> Lewis & Rao (2015) analyse 25 large Yahoo! display-ad RCTs (\$2.8M of spend, most reaching over a million users) and show that measuring advertising ROI is hard *even with perfect randomization*. Individual sales have a coefficient of variation near **10**; a campaign costing \$0.14 per person must move mean sales by about \$0.35 against a standard deviation of \$75, an impact-to-standard-deviation ratio of **0.0047** and an $R^2$ of **0.0000054**. The median retailer experiment has a standard error on ROI of **26 percentage points**; to distinguish 0% from 10% ROI the median experiment would need to be **62 times larger**. The same arithmetic implies that any observational bias with an $R^2$ of $10^{-4}$ swamps the true effect. Precision comes from *design* — bigger doses, free and larger control groups, discarding outcomes that cannot be affected — far more than from covariates.

## Overview

The paper's claim is deliberately strong: "most advertisers do not, and indeed some cannot, know the effectiveness of their advertising spend." The argument has three steps: a calibrated model of the advertiser's inference problem (§II), the realized precision of 25 field experiments (§III), and counterfactual sample sizes needed for decision-relevant hypotheses (§III.C).

Economic context: US firms spend about \$500 per person per year on advertising; breaking even requires causally shifting \$1,500-2,200 of annual sales per person. A display campaign of "a few ads per day" for two weeks costs 10-40 cents per person — roughly "2% of a user's advertising 'attention'". The required effect is economically meaningful but statistically minute.

## Main Content

### The calibrated inference problem

> [!definition] Set-up (Lewis & Rao §II) ^def-setup
> A campaign costs $c$ per user and raises sales by $\beta(c)$, a concave function; gross margin is $m$. Then
> $$
> \text{ROI}=\frac{\beta(c)\,m-c}{c}.
> $$
> With sales $y_i$ and randomized exposure $x_i$, estimate $y_i=\beta x_i+\epsilon_i$ with $N$ users per arm and common variance $\hat\sigma^2$:
> $$
> \Delta\bar y=\bar y_E-\bar y_U,\qquad \hat\sigma_{\Delta\bar y}=\sqrt{\tfrac{2}{N}}\,\hat\sigma .
> $$

> [!theorem] $R^2$ and $t$ as functions of the impact-to-standard-deviation ratio (eq. 6-7) ^thm-r2-t
> $$
> R^2=\frac14\left(\frac{\Delta\bar y}{\hat\sigma}\right)^2,\qquad
> t_{\Delta\bar y}=\sqrt{\frac N2}\left(\frac{\Delta\bar y}{\hat\sigma}\right).
> $$
> The ratio $\Delta\bar y/\hat\sigma$ is Cohen's $d$. With covariates the $R^2$ becomes the partial $R^2$ of the treatment.

**Calibration** (a representative experiment, slightly larger than the median): cost \$0.14 per exposed user ("roughly 20-80 display ads or 7-10 TV commercials"), margin 50%, mean sales \$7, standard deviation \$75 over two weeks. A 25% ROI target implies $\beta=\$0.35$ — a 5% sales lift, large in percentage terms. Yet $d=0.35/75=0.0047$, "less than $\tfrac1{40}$ the 'small' effect size of 0.2 outlined in Cohen (1977)", and $R^2=5.4\times10^{-6}$.

- 2,000,000 users split evenly: $E[t]=3.30$ against the null of zero effect (ROI $=-100\%$), about 95% power for a one-sided 5% test.
- 200,000 users: $E[t]=1.04$ — "hopelessly underpowered"; a truly profitable campaign fails to reject zero effect 74% of the time.
- When such a test does reject, "the point estimates conditional on rejecting will be significantly larger than the alternatively hypothesized ROI" — Gelman & Carlin's exaggeration factor, i.e. a [[Type S and Type M Errors|Type M error]] (fn. 12).

Gordon, Moakler & Zettelmeyer report Cohen's $d$ for 1,673 Facebook RCT outcomes: medians of 0.0036 (lower funnel), 0.0127 (mid) and 0.0279 (upper) — the same order of magnitude a decade later (their fn. 20).

### What the 25 experiments delivered

Table I: retailers (in-store plus online sales) and financial-services firms (new accounts). Median campaign 14 days; control-group sales mean \$8.48, s.d. \$70.20; the s.d./mean ratio has median 9.9 and "exceeds 7 for all but two experiments". For brokerages the ratio is about 30 because account sign-ups are rare, all-or-nothing events (median base rate 0.0011).

Table II: using lagged sales, demographics and online behaviour as controls and post-first-exposure filtering where possible,

| | Retailers | Financial services |
|---|---|---|
| Median spend per exposed person | \$0.09 | \$0.06 |
| Median 95% CI half-width, % of sales | 4.4% | 10.7% |
| Median s.e. of ROI | **26%** | **115%** |

The s.e. of ROI is $m\cdot\text{s.e.}(\hat\beta)/c$: e.g. experiment 1.1 has s.e.$(\hat\beta)=\$0.193$, $m=0.5$, $c=\$0.16$, giving 61%. Figure II shows ROI uncertainty falling with per-capita spend: "the larger the dose, the better the power". The most intense campaign (\$0.39 per person, over 80 display ads, 3.5M-person control group, pre-period covariates) still had a 95% interval 60 points wide. Below \$0.05 per person the RCTs "offered uninformative estimates".

> [!theorem] Experiment multipliers (Table III) ^thm-multipliers
> Define adequate power as $E[t]=3$ (91% power, one-sided 5%). An experiment with expected statistic $E[t]$ must be scaled by $(3/E[t])^2$ in independent users. Medians over the 25 experiments:
>
> | Hypotheses | Retail median $E[t]$ | Retail multiplier | Finance multiplier |
> |---|---|---|---|
> | $H_0$: ROI $=-100\%$ vs $H_a$: $0\%$ ("did ads do anything?") | 3.82 | 0.6 | 12.4 |
> | $0\%$ vs $50\%$ ("highly profitable?") | 1.91 | 2.5 | 49.6 |
> | $0\%$ vs $10\%$ ("strong performer?") | 0.38 | 62 | 1,241 |
> | $0\%$ vs $5\%$ ("maximized profits?") | 0.19 | 247 | 4,964 |
>
> Pooled, the median campaign must be 9 times larger to separate 0% from 50% ROI. Only 3 of 25 experiments had $E[t]>3$ for that comparison; every experiment is severely underpowered for a 10-point difference, and "the total U.S. population and the advertiser's annual advertising budget are binding constraints" for 5 points. A 5% two-week ROI annualizes to over 100%; targeting a 5% *annualized* ROI is $26^2=676$ times harder.

**Marginal ROI is worse.** Optimizing spend needs $\beta(c_2)-\beta(c_1)$; the variance of marginal ROI has $\Delta c=c_2-c_1$ in the denominator, so it behaves like a very low-dose experiment, and concavity shrinks the signal further (§III.D). The same applies to creative comparisons: "determining if two 'creatives' are significantly different will only be possible when their performance differs by a relatively wide margin."

### What does and does not improve precision

> [!theorem] Covariates help sub-linearly ^thm-covariates
> Absorbing a share $R^2_{|W}$ of outcome variance reduces the treatment standard error by $1-\sqrt{1-R^2_{|W}}$. Lagged sales were the best predictor, cutting variance by up to 40% — a 23% reduction in standard errors. "To achieve an order-of-magnitude reduction in standard errors, one would have to predict sales with an $R^2_{|W}=0.99$" (§III.B, fn. 16).

Johnson, Lewis & Reiley confirm on a 3.1M-user test: 236 covariates including two years of purchase history gave $R^2=0.09$ and 5% better precision, whereas control-ad-based pruning gave 31%. This is the ad-measurement caveat to [[CUPED and Regression-Adjusted Variance Reduction]]: CUPED's gain depends on pre/post correlation, which is low for infrequent, lumpy retail purchases (better for frequently bought goods).

Levers, roughly in order of pay-off:

1. **Identify the counterfactual treated** (placebo or [[Predicted Ghost Ads and Ghost Bids Mechanics|ghost ads]]) and drop unexposed users and pre-exposure outcomes: variance ratios of 6-17 versus ITT in Johnson, Lewis & Nubbemeyer. Geo tests cannot do this — they "cannot eliminate the noise from purchases among those whom the advertiser is unable to reach, similar to other intent-to-treat experiments" (Lewis & Rao fn. 6, §IV.D).
2. **Free, large control groups.** Power depends on $p(1-p)$, so 90/10 and 10/90 are equally powerful, and the latter costs a ninth as much in media. Concentrating the same impressions on a 10% treatment group multiplies the expected effect by 9 under constant returns — equivalent to "running 81 of the 90%/10% experiments" (Lewis, Rao & Reiley fn. 24).
3. **Higher dose.** Improves power but "advertising at an undesirably high intensity can attenuate the measured ROI due to diminishing returns": a bias-variance trade in *external validity*.
4. **Short outcome windows.** See the next theorem.
5. **Keep the continuous outcome.** Binarizing sales lowered the coefficient of variation by up to 40% but would have lost significance in two published studies because ads moved basket size and frequency (§III.B).
6. **Targeted tests.** Restricting to the $M$ most responsive users raises $t$ only if the targeting effect decays slowly enough; otherwise it buys variance reduction at the cost of extrapolation bias (§IV.C).
7. **Pre-experiment matching / blocking** on lagged sales can substantially raise power (Lewis, Rao & Reiley §8, citing Deng et al. 2013).

> [!theorem] Longer outcome windows usually reduce power (Lewis, Rao & Reiley §6; Lewis & Rao §III.B) ^thm-windows
> With weekly effects $\Delta\bar y_t\ge0$, independent weeks and constant variance, the cumulative statistic over $T$ weeks is
> $$
> t_T=\sqrt{\frac N2}\,\frac{\sum_{t=1}^{T}\Delta\bar y_t}{\sqrt T\,\hat\sigma}.
> $$
> Adding week $T+1$ raises $t$ only if $\sum_{t\le T}\Delta\bar y_t/\sqrt T<\sum_{t\le T+1}\Delta\bar y_t/\sqrt{T+1}$, which to first order requires the new week's effect to exceed **about half the average effect of the preceding weeks**. Example: effects of 5% and 2% in weeks 1-2 require more than 1.75% in week 3. Because ad effects decay, "short windows are optimal from a power perspective", at the cost of downward bias in the total effect.

This is the statistical reason lift studies report short-run effects and why long-run effects reach a [[Bayesian Media Mix Modeling - Overview|media mix model]] through [[Carryover (Adstock) Functional Forms|carryover assumptions]] rather than direct measurement.

### Implications drawn by the authors

- **Observational methods inherit the problem squared.** Selection effects can be "30 times larger than the causal effect" (fn. 5: a 10-cent campaign on a \$30-margin product breaks even converting 1 in 300, while targeting raises baseline purchase probability by 10 points). "Observational methods claiming to do substantially better than the levels of efficiency we report ... should be viewed with skepticism." See [[Experimental Benchmarks for Observational Ad Measurement]].
- **Weak selective pressure on ad budgets**: similar firms spend very different amounts because nobody can tell who is right.
- **Scale advantage for large publishers**, the only ones able to field adequately sized experiments.
- **"A veneer of quantitative certitude"**: abundant metrics conceal how little is known.
- **Informative priors help.** Platforms "could incorporate an informative prior, which would help combat the power concerns" (Lewis, Rao & Reiley §8) — the rationale for hierarchical pooling across tests and for combining lift tests with an MMM ([[Bayesian Estimation and Priors for MMM]]).

## Examples

**Planning a lift test with Lewis-Rao arithmetic.**

```python
import numpy as np
from scipy.stats import norm

def expected_t(delta, sigma, n_per_arm):          # eq. (7)
    return np.sqrt(n_per_arm / 2) * delta / sigma

def roi_se(sigma, n_per_arm, margin, cost):       # se(ROI) = m * se(beta) / c
    return margin * sigma * np.sqrt(2 / n_per_arm) / cost

sigma, margin, cost = 75.0, 0.5, 0.14
delta = (1 + 0.25) * cost / margin                # sales lift needed for 25% ROI -> 0.35
for n in (100_000, 1_000_000, 10_000_000):
    t = expected_t(delta, sigma, n)
    print(n, round(t, 2), "power:", round(1 - norm.cdf(1.645 - t), 2),
          "se(ROI):", round(roi_se(sigma, n, margin, cost), 2),
          "multiplier to E[t]=3:", round((3 / t) ** 2, 1))
# 100k/arm: t=1.04, power 0.27, se(ROI)=1.20
# 1M/arm:   t=3.30, power 0.95, se(ROI)=0.38
# 10M/arm:  t=10.4,             se(ROI)=0.12 -> CI on ROI still about +/- 24 points
```

Even ten million users per arm leave ROI known only to within roughly 24 points — enough to tell a disaster from a success, not to tune budgets at the margin. If only 40% of eligible users are exposed and the test is analysed as ITT, replace $\delta$ by $0.4\,\delta$: $E[t]$ falls by 60% and the required sample rises by $1/0.4^2\approx6$.

## Connections

- [[Power Analysis and Sample Size]] — general machinery; this note supplies advertising-specific effect sizes ($d\approx0.004$-$0.03$).
- [[Type S and Type M Errors]] — the exaggeration factor for significant results from low-power lift tests.
- [[Intent-to-Treat, PSA and Ghost Ad Designs]] and [[Predicted Ghost Ads and Ghost Bids Mechanics]] — design responses that "improve upon the pessimistic outlook" (Johnson, Lewis & Nubbemeyer §5.3).
- [[From ITT to Treatment-on-the-Treated in Ad Experiments]] — the $1/\pi$ variance penalty of ITT.
- [[Experimental Benchmarks for Observational Ad Measurement]] — empirical confirmation that tiny-$R^2$ effects cannot be recovered observationally.
- [[Activity Bias in Advertising]] and [[Observational vs Experimental Methods in Advertising]] — companion Lewis-Rao-Reiley results on bias.
- [[User-Level Ad Experiments - Overview]].

## See Also

- [[CUPED and Regression-Adjusted Variance Reduction]] — where covariate adjustment does pay off.
- [[Always-Valid p-values and the mSPRT]] and [[The Peeking Problem and Optional Stopping]] — sequential monitoring of long-running lift tests.
- [[Geo-Experiment Design and Power Analysis]] — power in the geo setting comes from the number of geos and pre-period length rather than users.
- [[Customer Lifetime Value - Overview]] — the brokerage experiments value each acquired account at a fixed lifetime value; CLV models supply that input and its uncertainty.
- [[Advertising and Promotion Effects]] — elasticity evidence; Johnson, Lewis & Reiley's experimental short-run elasticity is about 0.19 under their advertising-to-sales assumption.
- [[User-Level vs Geo-Level Experiments - When to Use Which]].
