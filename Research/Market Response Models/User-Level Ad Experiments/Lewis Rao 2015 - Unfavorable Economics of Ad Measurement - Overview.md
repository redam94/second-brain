---
title: Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/power-analysis
  - type/overview
  - doc/paper
source: "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
source_location: "QJE 130(4), Nov 2015, pp. 1941-1973 (all sections, Tables I-III, Figures I-II, fns. 1-28)"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Power Analysis and Sample Size]]"
  - "[[The Experimental Ideal]]"
  - "[[User-Level Ad Experiments - Overview]]"
used_by:
  - "[[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]]"
  - "[[Experimental Benchmarks for Observational Ad Measurement]]"
  - "[[User-Level vs Geo-Level Experiments - When to Use Which]]"
  - "[[Lewis Rao 2015 - Reference List and Cited Literature]]"
aliases:
  - Lewis Rao 2015 Overview
  - On the Near Impossibility of Measuring the Returns to Advertising
  - Lewis and Rao QJE 2015 paper map
---

# Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview

> [!summary]
> Lewis & Rao (QJE 2015; earlier circulated as "On the Near Impossibility of Measuring the Returns to Advertising") use 25 randomized display-ad experiments run on Yahoo! between 2007 and 2011 (19 retail campaigns, 6 financial-services campaigns, \$2.8M of spend) to show that **even perfectly randomized, million-user experiments measure advertising ROI imprecisely**. Individual sales have a standard-deviation-to-mean ratio near 10 (about 30 for account sign-ups), so a profitable campaign explains an $R^2$ of about $5\times10^{-6}$ of sales variance. The median retail ROI standard error is 26% (CI over 100 points wide); the median campaign would need to be 9 times larger to separate 0% from +50% ROI and 62 times larger (retail) to separate 0% from +10%. The same arithmetic implies that observational estimators face selection biases many times the causal effect.
^lr-overview-summary

## Overview

### Research question and contribution

**Question.** Does advertising move purchases by as much as prices and margins imply, and *can an individual advertiser even find out*? US firms spend roughly \$500 per person per year on ads (the paper cites Coen 2008 and Kantar Media 2012 for this figure). At typical margins that requires a causal effect of \$1,500-2,200 in annual sales per person (\$3,500-5,500 per household) to break even (§I, p. 1941). The authors frame this as an old open question, citing Abraham & Lodish (1990): does advertising change purchasing as much as prevailing ad prices and firms' gross margins imply? Digital media, where exposure and purchases can be measured and randomized for each person, suggested that RCTs would finally settle it. The paper's answer is that RCTs are real progress but even very large ones measure returns imprecisely (pp. 1941-1942).

## Main Content

### Positive thesis and the "strong claim" (Abstract, §I)

The paper is pessimistic about precision but not about experiments. Two sentences fix its stance:

- **RCTs are progress anyway (Abstract, p. 1941).** "Despite these unfavorable economics, randomized control trials represent progress by injecting new, unbiased information into the market." The abstract adds that the inference problems the field experiments expose also show that selection bias, which comes from the targeted nature of advertising, is "a crippling concern for widely employed observational methods". So the RCT is noisy but unbiased, while the observational alternative is precise-looking but biased. The paper's case for experiments rests on that contrast; see [[Lewis Rao 2015 - Market Implications, Persuasion Games and Conclusion]] for how §V develops it.
- **The strong claim (§I, p. 1944).** The authors call their headline "the admittedly strong claim that most advertisers do not, and indeed some cannot, know the effectiveness of their advertising spend". Because the claim is strong, they say it is "paramount to further substantiate our data and methods" and give four supports. (1) The retail and financial firms are representative of the firms that make up most ad spending in revenue base, margins and product types. (2) Holding spend fixed, a longer evaluation window would typically not improve power. (3) They used all available data, such as pre-campaign sales, to control for chance treatment-control differences. (4) The experiment-size multipliers calibrate the financial commitment needed for truly informative RCTs, so readers can judge whether the findings apply to a given firm or market segment (pp. 1944-1945). The four supports are worked out in [[Lewis Rao 2015 - Table I Summary of the 25 Yahoo Display Experiments]], [[Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors]] and [[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]].

Read together, "do not" is an empirical statement about current practice. "Some cannot" is the impossibility claim: for small advertisers, and for low per-person spend, no affordable experiment reaches informative precision (§IV.B; [[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]]).
^lr-positive-thesis

### Publication details (front matter)

| Item | Detail | Location |
|---|---|---|
| Authors and affiliations | Randall A. Lewis (Google) and Justin M. Rao (Microsoft Research) | title p. 1941; affiliations p. 1971 |
| Former employer | The authors thank engineers, sales people and product managers at Yahoo!, Inc., "our former employer". All 25 experiments ran on Yahoo! | title footnote *, p. 1941 |
| Acknowledgements | Special thanks to David Reiley "for his contributions to this work". Feedback from Ned Augenblick, Arun Chandrasekhar, Sharad Goel, Garrett Johnson, Clara Lewis, R. Preston McAfee, Markus Möbius, Lars Lefgren, Michael Schwarz and Ken Wilbur | title footnote *, p. 1941 |
| Disclaimer | "The work represents our views alone." | title footnote *, p. 1941 |
| Earlier title | Circulated as "On the Near Impossibility of Measuring the Returns to Advertising" | title footnote *, p. 1941 |
| JEL codes | L10 (market structure, firm strategy and performance: general), M37 (advertising), C93 (field experiments) | end of abstract, p. 1941 |
| Citation | *Quarterly Journal of Economics* 130(4) (2015), 1941-1973, doi:10.1093/qje/qjv023; Advance Access July 6, 2015 | p. 1941 |
| Supplement | Online Appendix at QJE online (not included in the raw PDF) | p. 1971 |

**Contribution.**
1. A minimal decision model of campaign evaluation (cost per user $c$, concave sales response $\beta(c)$, margin $m$) and a closed-form link between the impact-to-standard-deviation ratio, $R^2$ and the $t$-statistic (§II). → [[Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI]], [[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]]
2. Unusually rich data: individual-level online + in-store sales and firm-supplied gross margins for 25 RCTs (§III.A, Table I). → [[Lewis Rao 2015 - Table I Summary of the 25 Yahoo Display Experiments]]
3. Realized precision of each experiment and the levers that did/did not help (evaluation windows, covariates, filtering, binarization; Table II, Figure II). → [[Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors]]
4. "Experiment multipliers": how many times larger each RCT must be for adequate power under four increasingly demanding hypothesis pairs (Table III). → [[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]]
5. Robustness to other categories and media, scale, targeting/concentration, technology trends (§IV) and market-level implications including strategic misreporting inside the firm (§V). → [[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]], [[Lewis Rao 2015 - Market Implications, Persuasion Games and Conclusion]]

### Key findings (numbers)

| Quantity | Value | Location |
|---|---|---|
| Experiments / spend | 25 (19 retail, 6 brokerage) / \$2.8M | Abstract, §I |
| Cost per exposed user | \$0.02-0.39 (text: \$0.02-0.35 in §I), most close to \$0.10 | §I p. 1942, Table II col. 8 |
| Media equivalent of that spend | 20-60 "premium" display ads, or about 7-10 prime-time TV commercials, per exposed user (fn. 1: online prices are more spread out because targeting is finer, so exposures per dollar vary more) | §I p. 1942 |
| Sample needed to tell 100% ROI apart from ROI > 0% | "single-digit millions of person-weeks" at typical digital ad intensity | §I p. 1942 |
| Size of an informative experiment | "can easily require more than 10 million person-weeks" | Abstract p. 1941 |
| Size of the experiments actually run | each > 500,000 unique users; most > 1,000,000 | §I p. 1943 |
| Sales s.d./mean (retail) | median 9.9, range 3.1-22.6 | Table I col. 10 |
| Sign-up s.d./mean (brokerage) | median 29.8, all > 24 | Table I Panel B |
| $R^2$ of a +25% ROI campaign | 0.0000054 | eq. (8) |
| Median s.e. of ROI | retail 26.1% (mean 61.8%); brokerage 115% | Table II col. 10 |
| Experiments with $E[t]>3$ for "did ads do anything?" | 10 of 25 | Table III |
| Experiments with $E[t]>3$ for 0% vs +50% | 3 of 25 | Table III |
| Median multiplier, 0% vs +10% ROI | retail 62 (text says 61), brokerage 1,241 | Table III |
| Median multiplier, 0% vs +5% ROI | retail 247, brokerage 4,964 | Table III |
| Selection-to-causal ratio in a simple targeting example | about 30 | fn. 5 |

> [!note] Person-weeks as the unit of sample size
> The paper counts sample size in **person-weeks**: one person observed for one week of a campaign. The abstract's "more than 10 million person-weeks" and §I's "single-digit millions of person-weeks" both refer to this unit. The multipliers in Table III assume the advertiser can add new, independent person-weeks (§I p. 1943). Adding weeks is only as good as adding people when purchases are independent across weeks; see [[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]].
^note-lr-person-weeks

### Source Map

Every section, equation, table, figure and substantive footnote of the paper, with the note that captures it.

| Source part | Content | Note |
|---|---|---|
| Abstract, §I Introduction (pp. 1941-1946) | Motivation, \$500/person, 25 RCTs, CV of 10, 26%/115% ROI s.e., 9x and 62x multipliers, $R^2$ of 0.0000054, selection 30x, caveats, four implications; positive thesis ("injecting new, unbiased information") and the "admittedly strong claim" with its four supports (see Positive thesis section) | this note; [[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]]; [[Lewis Rao 2015 - Market Implications, Persuasion Games and Conclusion]] |
| Front matter: title footnote * (earlier title, Reiley acknowledgement, former Yahoo! employees, views alone), JEL codes, affiliations (p. 1971) | | this note, Publication details |
| fn. 1 (price spread of online ads), fn. 2 (intermediate metrics such as clicks) | | [[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]] (fn. 1 in the cost-of-display paragraph; fn. 2 under "Intermediate metrics"); fn. 1's media equivalence also in this note's Key findings |
| fn. 3 (higher dose vs diminishing returns) | | [[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]] |
| fn. 4 ($R^2$ arithmetic), fn. 5 (selection effect 30x), fn. 6 (TV digitization, geo tests are ITT) | | [[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]]; [[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]] |
| §II.A Definitions and Model; Figure I (The Advertiser's Problem); fn. 7 (concavity) | campaign, $c$, $\beta(c)$, $m$, ROI, $c^*$, $c_h$, regions | [[Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI]] |
| §II.B Calibrating the Model; eqs. (1)-(8); fns. 8-12 | cost of display, three components of sales volatility, estimator, $R^2$ and $t$ derivations, representative campaign, power at 2M and 200k users, observational-bias implication, comScore 300% example | [[Lewis Rao 2015 - Impact-to-SD Ratio Derivation and Calibrated Campaign]] |
| §III preamble | why point estimates are not reported | [[Lewis Rao 2015 - Table I Summary of the 25 Yahoo Display Experiments]] |
| §III.A Overview and Data; Table I (incl. table notes a and b); fns. 13-14 | 25 campaigns, assignment vs exposure counts as unique user identifiers, PSA (charity) controls, sales moments | [[Lewis Rao 2015 - Table I Summary of the 25 Yahoo Display Experiments]] |
| §III.B Estimating Returns; Table II; Figure II; fns. 15-16 | window proposition, covariates, binarization trade-off, ROI s.e., dose-precision curve (Figure II markers checked against Table II; retailer-3 row 3.7 not plotted) | [[Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors]] |
| §III.C Power and Experiment Counterfactuals; Table III; fns. 17-20 | $E[t]$, multipliers, counts per hypothesis set (text-vs-table count discrepancies flagged for the 50- and 10-point tests), 676x annualization, drug-portfolio and consulting analogies | [[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]] |
| §III.D Optimizing Expenditure with an ROI Target; fns. 21-23 | marginal profit, Var of marginal ROI, creative comparisons | [[Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI]] |
| §IV.A Sales Volatility; fn. 24 | autos 20:1, where results do not apply | [[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]] |
| §IV.B Scale; fns. 25-26; Online Appendix "Super Bowl Impossibility Theorem" | tens of millions of dollars; evolving priors; eBay paid search; "even this sort of commitment would not be enough" caveat | [[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]] |
| §IV.C Audience and Expenditure Intensity | top-$M$ targeting condition, concentrated tests | [[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]] |
| §IV.D Advances in Data Collection and Methods | experimentation-as-a-service, free control groups, addressable TV | [[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]] |
| §V Discussion and Conclusion; fns. 27-28; Online Appendix Table II | weak selective pressure, persuasion game (Shin 1994), scale economies for publishers, vitamin E RCT, "quantitative veneer" | [[Lewis Rao 2015 - Market Implications, Persuasion Games and Conclusion]] |
| References (pp. 1972-1973; 31 works); fn. 18 field-experiment examples | full catalogue with where each work is cited | [[Lewis Rao 2015 - Reference List and Cited Literature]] |
| Online Appendix (not in the raw PDF) | Super Bowl theorem, targeting derivation, cross-firm ad spend table | described from the main text only |

Earlier synthesis of this paper together with Lewis-Rao-Reiley (2013/2015), Johnson-Lewis-Reiley (2017) and Gordon-Moakler-Zettelmeyer (2023): [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]].

## Examples

> [!example] Example: What the paper's opening numbers imply about margins
> US firms spend about \$500 per person per year on advertising, and the paper says breaking even requires causally moving \$1,500-2,200 of annual sales per person (p. 1941). Those two numbers together imply gross margins of about $500/2{,}200\approx23\%$ to $500/1{,}500\approx33\%$, in line with the 15-50% retail margins in Table II. Spread across the many campaigns a person sees in a year, each one's share of that required effect is small relative to person-level sales noise (s.d. about ten times the mean), which is why each campaign's $R^2$ is tiny. (My inference from the stated figures; the paper does not state the implied margin.)
^ex-lr-opening-margins

## Connections

- [[Power Analysis and Sample Size]] and [[Type S and Type M Errors]] — the generic machinery; this paper supplies the advertising-specific effect sizes.
- [[Blake Nosko Tadelis 2015 - Paid Search Effectiveness - Overview]] — the one large-scale experiment the authors cite as changing an advertiser's strategy.
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — the aggregate-data counterpart: if user-level RCTs are this noisy, weekly MMM regressions on 52-156 rows face an even smaller signal-to-noise ratio.
- [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]] — low power plus selective reporting; Lewis & Rao withhold point estimates partly for this reason.
- [[Experimental Benchmarks for Observational Ad Measurement]] and [[Observational vs Experimental Methods in Advertising]] — empirical follow-ups on the observational-bias implication.

## See Also
- [[User-Level Ad Experiments - Overview]] — cluster overview.
- [[Lewis Rao 2015 - Reference List and Cited Literature]] — every cited work and where the paper uses it.
- [[Intent-to-Treat, PSA and Ghost Ad Designs]] — design responses to the power problem.
- [[Geo-Experiment Design and Power Analysis]] — the geo alternative, which the authors call "significantly more expensive" (fn. 6, §IV.D).
- [[Blake 2015 - Discussion, Limitations and Lessons for Marketing Measurement]] — mutually referential critiques
