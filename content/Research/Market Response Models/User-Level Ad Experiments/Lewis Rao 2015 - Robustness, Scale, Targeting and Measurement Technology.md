---
title: Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - type/concept
  - doc/paper
source: "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
source_location: "§I pp. 1944-1945 (caveats, fns. 3, 6); §IV.A-D pp. 1966-1969, fns. 24-26; Online Appendix (Super Bowl Impossibility Theorem, targeting derivation; described only)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]]"
  - "[[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]]"
used_by:
  - "[[Lewis Rao 2015 - Market Implications, Persuasion Games and Conclusion]]"
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
aliases:
  - Super Bowl Impossibility Theorem
  - Lewis-Rao targeting condition for top-M experiments
  - Concentrated advertising tests
---

# Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology

> [!summary]
> Section IV asks where the pessimistic result does and does not generalize. Sales of durables, subscriptions and big-ticket goods are *more* volatile than the study's retailers (US autos: s.d./mean about 20 for a month window), while new products, direct-response TV and firms that get nearly all customers through ads (e.g. via sponsored search) may escape it. Informative RCTs cost tens of millions of dollars; repeated \$500K experiments can pin down the global average but an evolving prior barely helps judge one campaign. Targeting the most responsive $M$ users raises power only if the effect decays slowly in $M$, and concentrated or targeted tests trade variance for extrapolation bias. Technology (experimentation as a service, free control groups, addressable TV) should improve the economics; geo tests remain "significantly more expensive" because they are intent-to-treat.
^lr-robustness-summary

## Overview

The authors anticipate the objection that 25 Yahoo! experiments are special. Section IV (plus caveats in §I) addresses category volatility, scale, audience and intensity, and technological change.

## Main Content

### Scope caveats (§I, pp. 1944-1945)
The paper states its results in dollars per person of ad spend so that they transfer to other media through ad prices. The authors argue:
1. the firms are representative in revenue base, margins and product types of the firms that make up the majority of ad spending;
2. lengthening the window at fixed spend would typically not improve power (see [[Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors]]);
3. they used all available covariates (e.g. pre-campaign sales);
4. the multipliers let readers calibrate the result to specific firms.

Results are **unlikely** to hold for firms or products with low baseline sales volatility, firms that receive nearly all customers from advertising, and products with limited baseline awareness. The outlook is better for higher per-person spend, but "diminishing returns may imply that precisely when one can measure the returns, an economically unfavorable result is more likely to occur" (p. 1945). Media with high per-person cost (catalogs by mail) face the analogous problem of finding a sample for which spend is expected to be profitable, less so for large firms committed to experimentation. Fn. 3: running a higher "dose" eases inference but may attenuate measured ROI through diminishing returns.

### IV.A Sales volatility (pp. 1966-1967)

Heavily advertised categories such as high-end durables, subscription services (credit cards), voting (Broockman & Green 2014) and infrequent big-ticket purchases (vacations) appear *more* volatile than retailers selling sweaters and dress shirts, and about as volatile as the all-or-nothing brokerage sign-ups.

> [!example] Example: US automakers (p. 1966-1967, fn. 24)
> Assumptions: a car purchased every five years, 15% market share, average price \$29,793 (2011 median, NADA data). For a month-long window, a person buys this brand with probability $p\approx\tfrac1{60}\times0.15=0.0025$, so sales are price × Bernoulli($p$) with s.d./mean $\approx\sqrt{(1-p)/p}\approx20$. The paper reports a standard-deviation-to-mean ratio of **20:1**, larger than nearly every firm studied. (The Bernoulli reconstruction is mine; the paper gives only assumptions and result.)
^ex-lr-automakers

Exceptions: new products, direct-response TV, firms reliant on advertising for most customers (e.g. sponsored search). But per Kantar AdSpender and industry sources, large public advertisers using standard formats account for the vast majority of ad spend.

### IV.B Scale (pp. 1967-1968)

- The multipliers estimate the cost of pushing confidence intervals to informative widths. They are a **lower bound** when geo randomization is the only available technology.
- The implied cost is typically **tens of millions of dollars**, sometimes far more. Very large firms have such budgets, and over time precise estimates are possible in principle: repeated \$500,000 experiments would let some firms learn the average impact of global spend.
- Such commitment is rare; the notable exception is Blake, Nosko & Tadelis (2014) at eBay, a temporal-and-geographic randomization involving tens of millions of dollars, "easily the largest to end up in published work", which shifted the firm's strategy (fn. 26). See [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]].
- **Even that may not be enough.** The paragraph ends on a caveat (p. 1967): "For some large advertisers, even this sort of commitment would not be enough and smaller firms may be unable to afford it." My reading: repeated \$500K programmes fail at both ends. For some large advertisers the required precision is still out of reach (the paper gives no further detail here), and smaller firms cannot fund such a programme at all. This is the scale side of the "some cannot know" claim in [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]].

> [!theorem] Remark: Evolving priors help the average, not the campaign (fn. 25)
> Evaluating campaigns with an evolving prior seems attractive, but because each campaign's signal is weak, the Bayesian update "would essentially return the prior". It is a promising way to learn the global average effect, not to evaluate any single campaign.
^thm-lr-evolving-prior

This is the shrinkage logic of [[Hierarchical Models]]: when the per-campaign likelihood is flat relative to the prior, campaign-level posteriors collapse to the population mean, which is what MMM practitioners should expect when they use lift tests as priors ([[Bayesian Estimation and Priors for MMM]]).

> [!theorem] "Super Bowl Impossibility Theorem" (Online Appendix; described in §IV.B, pp. 1967-1968)
> A thought experiment about the largest-reach US ad venue: even if every 30-second TV commercial could be randomized at the individual level, it is nearly impossible for a firm to be **large enough to afford the ad** yet **small enough to reliably detect meaningful differences in ROI**. (The formal statement is in the Online Appendix, which is not part of the raw file.)
^thm-lr-super-bowl

### IV.C Audience and expenditure intensity (p. 1968)

> [!theorem] Targeting condition for a top-$M$ experiment (§IV.C; derivation in Online Appendix)
> Suppose the firm can order the $N$ potential targets by expected impact (without knowing individual effects) and experiments on the first $M$. The $t$-statistic on advertising impact is **increasing in $M$** if the targeting effect decays more slowly than $\dfrac{\Delta\mu(M)}{2\sqrt{2M}}$. Whether targeting helps or hurts inference is therefore empirical.
>
> **The printed symbol.** Checked against the page image of p. 1968: the journal prints $\Delta\mu(M)$ (a capital delta followed by $\mu(M)$) over $2\sqrt{2M}$. It is not a text-extraction error. The main text does not define $\Delta\mu(M)$; the derivation is in the Online Appendix, which is not in the raw file. The natural reading is the treatment-minus-control difference in mean outcomes among the top $M$ users, i.e. the average ad effect in the tested group.
>
> **Reconstruction (my derivation, not the paper's).** Split the top $M$ users into two arms of $M/2$ with common outcome s.d. $\sigma$. Then $t(M)=\Delta\mu(M)\big/\big(\sigma\sqrt{4/M}\big)\propto\sqrt{M/2}\;\Delta\mu(M)$. Differentiating,
> $$
> \frac{d}{dM}\Big[\sqrt{M/2}\,\Delta\mu(M)\Big]=\underbrace{\frac{\Delta\mu(M)}{2\sqrt{2M}}}_{\text{gain from more users}}+\underbrace{\sqrt{M/2}\;\Delta\mu'(M)}_{\text{loss from weaker targets}}.
> $$
> The first term is exactly the printed expression. So the printed condition compares the sample-size gain with the "decay" term $\sqrt{M/2}\,|\Delta\mu'(M)|$, which is the drop in the average effect put on the same $\sqrt{M/2}$ scale. Dividing both terms by $\sqrt{M/2}$ gives the equivalent form $-\Delta\mu'(M)<\Delta\mu(M)/(2M)$. Write $\delta(M)$ for the effect on the $M$-th (marginal) user. Then $\Delta\mu'(M)=(\delta(M)-\Delta\mu(M))/M$, so the condition is also $\delta(M)>\tfrac12\Delta\mu(M)$: **widening the test improves power as long as the next user's effect is more than half the current average effect.** The printed form and the simplified form agree once "decay" is read on the $t$-statistic scale. Because the appendix is unavailable, this reconciliation is an interpretation, not a quotation.
^thm-lr-targeting-M

Some firms facing hopeless trade-offs on the full target population may test only the most likely responders. Because those users cost more to reach, a **targeted test** is a natural analogue of a **concentrated test** (higher per-person spend). Both reduce variance by introducing bias when extrapolating: to the broader user base (targeting) or to less intense spend (concentration).

### IV.D Advances in data collection and methods (pp. 1968-1969)

- First-generation experiments were "high-touch" collaborations between firms and publishers. Newer options: experimentation as a service and computational advertising software interfacing with real-time display and search exchanges, both able to move the industry beyond off-the-shelf geo randomization.
- Ad-serving infrastructure with **large, free control groups** (no publisher participation needed) would cut costs and could incorporate pre-experiment matching (Deng et al. 2013). See [[Predicted Ghost Ads and Ghost Bids Mechanics]].
- Early cable experiments needed custom infrastructure (Lodish et al. 1995); major providers were reportedly developing personalized delivery. Online TV (YouTube, Hulu) and devices (smart TVs, Xbox, Roku) can link into digital ad serving.
- Without this, high-touch **geo-randomized** experiments remain state of the art and are "significantly more expensive because they cannot econometrically eliminate the noise from purchases among those whom the advertiser is unable to reach" (p. 1969; also fn. 6), i.e. they are intent-to-treat. See [[From ITT to Treatment-on-the-Treated in Ad Experiments]].
- As experiments get cheaper and broader, measurement economics will improve; the paper documents the hard baseline, and emerging technology "has the potential to disrupt the market".

## Examples

> [!example] Example: Why an evolving prior "would essentially return the prior" (fn. 25; illustrative numbers)
> Suppose a firm's prior on a new campaign's ROI has s.d. 10 points (from many past campaigns), and the experiment's ROI standard error is the retail median from Table II, 26 points. With normal prior and likelihood, the weight on the new data is $0.10^2/(0.10^2+0.26^2)=0.01/0.0776\approx0.13$. An experimental estimate 30 points above the prior mean moves the posterior by only about 4 points. The prior dominates, which is exactly the paper's point: pooling learns the average over campaigns, not the return on any one of them. (My numbers, not the paper's.)
^ex-lr-evolving-prior-weight

## Connections
- [[User-Level vs Geo-Level Experiments - When to Use Which]] — the ITT cost of geo tests.
- [[Geo-Experiment Design and Power Analysis]] — geo power depends on number of geos and pre-period, not users.
- [[Conversion Lift Studies on Ad Platforms]] — the "experimentation as a service" the authors anticipated.
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] — simulation as a way to study measurement when real experiments are this expensive.
- [[Shape (Saturation) Effects]] — diminishing returns behind the concentration bias.

## See Also
- [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]
- [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]] — later headwinds against the optimistic technology forecast.
- [[Blake 2015 - ROI Derivation from Experimental Log-Sales Effects]] — ROI interval illustrating the scale point
