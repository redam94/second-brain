---
title: Lewis Rao 2015 - Table I Summary of the 25 Yahoo Display Experiments
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - type/example
  - doc/paper
source: "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
source_location: "§III preamble p. 1952; §III.A pp. 1952-1955, Table I p. 1953, fns. 1-2, 13-14"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]"
  - "[[Intent-to-Treat, PSA and Ghost Ad Designs]]"
used_by:
  - "[[Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors]]"
  - "[[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]]"
aliases:
  - Lewis Rao Table I
  - 25 Yahoo display advertising field experiments
---

# Lewis Rao 2015 - Table I Summary of the 25 Yahoo Display Experiments

> [!summary]
> Table I describes the 25 RCTs: 19 campaigns from 5 large retailers (outcome = in-store + online sales) and 6 from 2 financial-services firms (outcome = new online brokerage accounts), run 2007-2011. Median campaign: 10 days (retail), 42 days (finance), 14 days pooled; median cost \$81K retail / \$75K finance; most reached over a million users. Retail control-group sales per person had median mean \$8.48 and median s.d. \$70.20, a median s.d./mean ratio of 9.9 (above 7 in all but two); brokerage sign-ups had a median base rate of 0.0011 and s.d./mean of 29.8 (all above 24).
^lr-table1-summary

## Overview

Each experiment exogenously varied exposure by randomly holding out a set of targeted users from an advertiser's online display ad (p. 1942). Advertiser identities are confidential ("most likely familiar to North American readers"); experiments are named *Advertiser.Experiment*. Many come from earlier Yahoo! Labs papers: Lewis & Reiley (2014); Reiley, Lewis & Schreiner (2012); Johnson, Lewis & Reiley (2015); Reiley, Rao & Lewis (2011) (fn. 13).

### Why point estimates are withheld (§III preamble, p. 1952)
The paper reports only the *uncertainty* of each estimate, not the estimated returns, for three reasons:
1. The firms are representative of a typical advertising *dollar*, but there is no evidence they are representative of typical *effectiveness*.
2. Imprecise means can mislead because of the exaggeration factor of low-powered tests (Gelman & Carlin 2013; [[Type S and Type M Errors]]).
3. Confidentiality agreements prevent sharing all point estimates, so reporting only some would invite selection concerns.

This is a published example of guarding against the selective-reporting mechanism in [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].

### Design notes (p. 1954)
- **Assignment vs exposed** (cols. 4-7): not all users assigned to treatment or control visited the publisher and were served an ad. In some experiments the control group was shown a **charity ad** (a PSA placebo, so the "treated control" is known); in others control users were simply held out and the exact size of the would-be-exposed control is unknown (Lewis & Schreiner 2010). See [[Intent-to-Treat, PSA and Ghost Ad Designs]].
- **Unit of the counts (Table I note a, p. 1953).** Every count in Table I is a number of **unique user identifiers**, either assigned to the experiment or exposed by the advertiser's campaign. The paper does not say which kind of identifier it used. In general, identifier counts can differ from counts of people when one person carries several IDs (a general caveat, not one the paper raises; see [[Identity Fragmentation and the Privacy-Era Limits of User-Level Tests]]).
- Panel B assignment is given as a percentage of all Yahoo! users eligible for an experiment that randomized "on the fly" (footnote b).
- Retail revenue is sales of physical goods (dollars); brokerage revenue is from monetizing users who open an online trading account.
- Sales per customer vary with firm popularity, campaign length and targeting (more targeted campaigns have higher baseline sales).
- Longer campaigns have slightly lower s.d./mean ratios. If weekly sales were independent, the ratio would follow $\text{CV}_{\text{weekly}}/\sqrt T$ (fn. 14); over quarters or years individual sales are correlated, which is also why past sales are a useful control. Extra weeks help only if spend per person per week is not diluted.

## Main Content

### Table I, Panel A: Retailers, in-store + online sales (p. 1953)

| Expt. | Days | Cost (\$K) | Assigned test | Assigned control | Exposed test | Exposed control | Mean sales (\$, control) | s.d. sales (\$) | s.d./mean |
|---|---|---|---|---|---|---|---|---|---|
| 1.1 | 14 | 129 | 1,257,756 | 300,000 | 814,052 | — | 9.49 | 94.28 | 9.9 |
| 1.2 | 10 | 40 | 1,257,756 | 300,000 | 686,878 | — | 10.50 | 111.15 | 10.6 |
| 1.3 | 10 | 68 | 1,257,756 | 300,000 | 801,174 | — | 4.86 | 69.98 | 14.4 |
| 1.4 | 105 | 260 | 957,706 | 300,000 | 764,235 | 238,904 | 125.74 | 490.28 | 9.7 |
| 1.5 | 7 | 81 | 2,535,491 | 300,000 | 1,159,100 | — | 11.47 | 111.37 | 3.9 |
| 1.6 | 14 | 150 | 2,175,855 | 1,087,924 | 1,212,042 | 604,789 | 17.62 | 132.15 | 7.5 |
| 2.1 | 35 | 192 | 3,145,790 | 3,146,420 | 2,229,959 | — | 30.77 | 147.37 | 4.8 |
| 2.2 | 35 | 19 | 3,146,347 | 3,146,420 | 2,258,672 | — | 30.77 | 147.37 | 4.8 |
| 2.3 | 35 | 19 | 3,145,996 | 3,146,420 | 2,245,196 | — | 30.77 | 147.37 | 4.8 |
| 3.1 | 3 | 10 | 281,802 | 161,163 | 281,802 | 161,163 | 1.27 | 18.46 | 14.6 |
| 3.2 | 4 | 17 | 483,015 | 277,751 | 424,380 | — | 1.08 | 14.73 | 13.7 |
| 3.3 | 2 | 26 | 292,459 | 169,024 | 292,459 | 169,024 | 1.89 | 18.89 | 10.0 |
| 3.4 | 3 | 18 | 311,566 | 179,709 | 311,566 | 179,709 | 1.29 | 16.27 | 12.6 |
| 3.5 | 3 | 18 | 259,903 | 452,983 | 259,903 | — | 1.75 | 18.60 | 10.6 |
| 3.6 | 4 | 27 | 355,474 | 204,034 | 355,474 | 204,034 | 2.64 | 21.60 | 8.2 |
| 3.7 | 2 | 34 | 314,318 | 182,223 | 314,318 | 182,223 | 0.59 | 9.77 | 16.6 |
| 4.1 | 18 | 90 | 1,075,828 | 1,075,827 | 693,459 | — | 0.56 | 12.65 | 22.6 |
| 5.1 | 41 | 180 | 2,321,606 | 244,432 | 1,583,991 | — | 54.77 | 170.41 | 3.1 |
| 5.2 | 32 | 180 | 600,058 | 3,555,971 | 457,968 | — | 8.48 | 70.20 | 8.3 |
| **Mean** | 19.8 | 100 | 1,325,078 | 975,279 | 902,454 | — | 18.23 | 95.94 | 10.0 |
| **Median** | 10.0 | 81 | 1,075,828 | 300,000 | 693,459 | — | 8.48 | 70.20 | 9.9 |

Transcription notes: the printed mean of column 9 is \$95.94 while the text (p. 1955) says \$95.54. Recomputing col. 9 / col. 8 gives 3.9 for experiment 1.4 and 9.7 for 1.5, the reverse of the printed 9.7 and 3.9, so the two printed ratios appear transposed (all other rows recompute correctly). Printed column 10 also has five retail rows below 7 (3.9, 4.8 three times, 3.1), whereas the text (p. 1955) says the ratio "exceeds 7 for all but two experiments"; the medians (9.9) agree. Also, 3.1 has 442,965 assigned users in total, below the "more than 500,000" stated on p. 1943. The text gives the retail median cost as \$85,000 versus the table's \$81K.

### Table I, Panel B: Financial services, new online account sign-ups (p. 1953)

| Expt. | Days | Cost (\$K) | Assigned test | Assigned control | Exposed | New accounts | Mean new acct. (test) | s.d. new acct. | s.d./mean |
|---|---|---|---|---|---|---|---|---|---|
| 6.1 | 42 | 50 | 12% | 52% | 794,332 | 867 | 0.0011 | 0.0330 | 30.3 |
| 6.2 | 42 | 50 | 12% | 52% | 748,730 | 762 | 0.0010 | 0.0319 | 31.3 |
| 6.3 | 42 | 75 | 12% | 52% | 1,080,250 | 1,254 | 0.0012 | 0.0341 | 29.3 |
| 6.4 | 42 | 75 | 12% | 52% | 1,101,638 | 1,304 | 0.0012 | 0.0344 | 29.0 |
| 7.1 | 42 | 613 | 90% | 10% | 17,943,572 | 10,263 | 0.0006 | 0.0239 | 41.8 |
| 7.2 | 36 | 86 | 8,125,910 | 8,125,909 | 793,042 | 1,090 | 0.0014 | 0.0331 | 24.1 |
| **Mean** | 41.0 | 158 | — | — | 3,743,594 | 2,590 | 0.0011 | 0.0317 | 31.0 |
| **Median** | 42.0 | 75 | — | — | 937,291 | 1,172 | 0.0011 | 0.0331 | 29.8 |

Sign-up s.d. is the Bernoulli s.d. $\sqrt{p(1-p)}\approx\sqrt p$, so s.d./mean $\approx1/\sqrt p$: a base rate of 0.0011 gives about 30. These high ratios "reflect the all-or-nothing nature of acquiring a long-term customer" (p. 1955).

### Text summary statistics (pp. 1954-1955)
- Duration: 2-105 days; medians 10 (retail), 42 (finance), 14 (pooled), "consistent with standard industry practice".
- Cost: \$9,964 to \$612,693; total over \$2.8M. The paper later converts to cost per exposed user, the meaningful "dose" measure.
- Reach: median campaign over 1 million individuals; every campaign had hundreds of thousands in both cells; each experiment had more than 500,000 unique users (p. 1943). A limitation is that trial size was chosen by the advertisers, which the multipliers of [[Lewis Rao 2015 - Table III Power and Experiment Size Multipliers]] are designed to overcome.

## Examples

> [!example] Example: How noisy is a retailer's two-week sales series?
> Experiment 3.7 had control mean sales of \$0.59 and s.d. \$9.77 over two days. A campaign that lifts sales by 10% shifts the mean by \$0.059, $d=0.006$; with about 314k treated and 182k control users, $t\approx0.006/\sqrt{1/314{,}318+1/182{,}223}\approx2.1$ before covariates. Even a 10% lift is only borderline detectable in one of the "cleaner" experiments. (Back-of-envelope using Table I values.)
^ex-lr-table1-noise

## Connections
- [[Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors]] — the estimation results for these same 25 rows.
- [[Intent-to-Treat, PSA and Ghost Ad Designs]] — PSA controls (the charity ads) and the assigned-vs-exposed gap.
- [[Customer Lifetime Value - Overview]] — Panel B values each account at a uniform lifetime value.
- [[Activity Bias in Advertising]] — from the same Yahoo! experiment program.

## See Also
- [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]
