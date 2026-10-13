---
title: Lewis Rao 2015 - Table III Power and Experiment Size Multipliers
tags:
  - source/ingested
  - topic/market-response
  - topic/advertising
  - topic/ad-experiments
  - topic/power-analysis
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Lewis Rao 2015 - The Unfavorable Economics of Measuring the Returns to Advertising.pdf]]"
source_location: "§III.C pp. 1961-1965, Table III p. 1962, fns. 17-20"
date_ingested: 2026-10-13
folder: "Market Response Models/User-Level Ad Experiments"
doc_type: paper
depends_on:
  - "[[Lewis Rao 2015 - Table II Estimation Protocol, Windows and ROI Standard Errors]]"
  - "[[Power Analysis and Sample Size]]"
used_by:
  - "[[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]]"
  - "[[Lewis Rao 2015 - Market Implications, Persuasion Games and Conclusion]]"
aliases:
  - Lewis Rao Table III
  - Statistical power of the 25 advertising experiments
  - E[t]=3 adequate-power standard
---

# Lewis Rao 2015 - Table III Power and Experiment Size Multipliers

> [!summary]
> Table III asks how many times larger (in new, independent users) each of the 25 experiments would need to be for adequate power, defined as an expected $t$ of 3 (91% power, one-sided 5% test), under four hypothesis pairs of shrinking ROI difference: 100, 50, 10 and 5 points. Ten experiments were adequately powered to tell whether the ads did anything; only 3 could separate 0% from +50% ROI (median multiplier 9 pooled, 2.5 retail, 49.6 finance); none could separate 0% from +10% (retail median 62, finance 1,241); 0% vs +5% needs 247 / 4,964 times, so that population size and budget are binding. A 5% *annualized* target would be 676 times harder again.
^lr-table3-summary

## Overview

The multipliers turn ROI standard errors into "the financial commitment necessary to generate reliable feedback regarding ROI" (p. 1961), and they generalize the results to firms or media where larger experiments are possible. They are computed by scaling $N$ rather than duration, which avoids modelling within-person serial correlation of purchases and the impact function of longer exposure.

## Main Content

> [!definition] Definition: Expected t and experiment multiplier (§III.C, Table III notes a-b)
> For a hypothesis pair $H_0:\text{ROI}=r_0$ vs $H_a:\text{ROI}=r_a$, with experiment $j$'s ROI standard error $s_j$,
> $$E[t]_j=\frac{r_a-r_0}{s_j},\qquad \text{Multiplier}_j=\left(\frac{3}{E[t]_j}\right)^2 .$$
> $E[t]=3$ gives 91% power for a one-sided 5% test ($\Phi(3-1.645)=0.91$). Because $s_j\propto1/\sqrt N$, scaling $N$ by $k$ scales $E[t]$ by $\sqrt k$.
^def-lr-multiplier

> [!theorem] Remark: Adding weeks vs adding people (p. 1961, fn. 17)
> If purchases were independent across weeks and the ad effect linear, adding a person-week by lengthening the campaign (same spend per week) would be as effective as adding a person. With large positive (negative) serial correlation, adding weeks is much less (more) effective than adding people. Campaigns are short in practice partly because firms rotate creatives so ads do not go stale; concentrated tests are another route (§IV.C).
^thm-lr-weeks-vs-people

### Table III (p. 1962)

Hypothesis sets: **(3)-(4) "Ads did anything?"** $H_0$: ROI $=-100\%$, $H_a$: $0\%$ (ΔROI 100%); **(5)-(6) "Highly profitable?"** $0\%$ vs $50\%$; **(7)-(8) "Strong performer?"** $0\%$ vs $10\%$; **(9)-(10) "Maximized profits?"** $0\%$ vs $5\%$.

| Expt. | s.e. ROI (%) | E[t] Δ100 | N× Δ100 | E[t] Δ50 | N× Δ50 | E[t] Δ10 | N× Δ10 | E[t] Δ5 | N× Δ5 |
|---|---|---|---|---|---|---|---|---|---|
| 1.1 | 61 | 1.64 | 3.3 | 0.82 | 13.4 | 0.16 | 335 | 0.08 | 1,338 |
| 1.2 | 193 | 0.52 | 33.5 | 0.26 | 133.8 | 0.05 | 3,345 | 0.03 | 13,382 |
| 1.3 | 84 | 1.19 | 6.3 | 0.60 | 25.2 | 0.12 | 631 | 0.06 | 2,524 |
| 1.4 | 134 | 0.75 | 16.2 | 0.37 | 64.7 | 0.07 | 6,939 | 0.02 | 27,756 |
| 1.5 | 278 | 0.36 | 69.4 | 0.37 | 277.6 | 0.07 | 425 | 0.07 | 1,700 |
| 1.6 | 84 | 1.20 | 6.3 | 0.60 | 25.2 | 0.12 | 629 | 0.06 | 2,515 |
| 2.1 | 24 | 4.12 | 0.5 | 2.06 | 2.1 | 0.41 | 53 | 0.21 | 212 |
| 2.2 | 25 | 3.99 | 0.6 | 2.00 | 2.3 | 0.40 | 57 | 0.20 | 226 |
| 2.3 | 23 | 4.33 | 0.5 | 2.17 | 1.9 | 0.43 | 48 | 0.22 | 192 |
| 3.1 | 52 | 1.92 | 2.4 | 0.96 | 9.7 | 0.19 | 243 | 0.10 | 972 |
| 3.2 | 34 | 2.96 | 1.0 | 1.48 | 4.1 | 0.30 | 103 | 0.15 | 411 |
| 3.3 | 22 | 4.50 | 0.4 | 2.25 | 1.8 | 0.45 | 44 | 0.23 | 177 |
| 3.4 | 26 | 3.82 | 0.6 | 1.91 | 2.5 | 0.38 | 62 | 0.19 | 247 |
| 3.5 | 21 | 4.73 | 0.4 | 2.36 | 1.6 | 0.47 | 40 | 0.24 | 161 |
| 3.6 | 25 | 3.98 | 0.6 | 1.99 | 2.3 | 0.40 | 57 | 0.20 | 227 |
| 3.7 | 9 | 11.32 | 0.1 | 5.66 | 0.3 | 1.13 | 7 | 0.57 | 28 |
| 4.1 | 10 | 10.45 | 0.1 | 5.22 | 0.3 | 1.04 | 8 | 0.52 | 33 |
| 5.1 | 57 | 1.76 | 2.9 | 0.88 | 11.6 | 0.18 | 291 | 0.09 | 1,165 |
| 5.2 | 15 | 6.90 | 0.2 | 3.45 | 0.8 | 0.69 | 19 | 0.34 | 76 |
| **Retail mean** | 62 | 3.71 | 7.6 | 1.86 | 30.6 | 0.37 | 765 | 0.19 | 3,058 |
| **Retail median** | 26 | 3.82 | 0.6 | 1.91 | 2.5 | 0.38 | 62 | 0.19 | 247 |
| 6.1 | 138 | 0.73 | 17.1 | 0.36 | 68.3 | 0.07 | 1,707 | 0.04 | 6,828 |
| 6.2 | 137 | 0.73 | 17.0 | 0.36 | 67.9 | 0.07 | 1,697 | 0.04 | 6,790 |
| 6.3 | 93 | 1.07 | 7.8 | 0.54 | 31.4 | 0.11 | 785 | 0.05 | 3,139 |
| 6.4 | 93 | 1.08 | 7.7 | 0.54 | 30.9 | 0.11 | 77 | 0.05 | 3,094 |
| 7.1 | 47 | 2.13 | 2.0 | 1.06 | 8.0 | 0.21 | 199 | 0.11 | 795 |
| 7.2 | 233 | 0.43 | 48.7 | 0.21 | 195.0 | 0.04 | 4,874 | 0.02 | 19,496 |
| **Finance mean** | 123 | 1.03 | 16.7 | 0.51 | 66.9 | 0.10 | 1,673 | 0.05 | 6,690 |
| **Finance median** | 115 | 0.90 | 12.4 | 0.45 | 49.6 | 0.09 | 1,241 | 0.04 | 4,964 |

Transcription notes (my recomputation from column 2, not in the paper): row 1.5's Δ50 $E[t]$ should be about 0.18 (consistent with its multiplier 277.6), and the Δ10/Δ5 entries of rows 1.4 and 1.5 do not match their own standard errors (recomputed: 1.4 ≈ 1,616 and 6,466; 1.5 ≈ 6,955 and 27,820), suggesting the printed 1.4/1.5 entries are partly transposed, mirroring the transposed s.d./mean ratios in Table I. Row 6.4's Δ10 multiplier "77" should be about 778 (typo).

### Results by hypothesis set (pp. 1963-1964)

> [!example] Example: "Did the ads do anything?" (ΔROI 100%)
> This is the primary hypothesis in most of the ad-effectiveness literature (Bagwell 2007; field-experiment examples include navy recruiting, split-cable TV, packaged foods and online ads, fn. 18). The text reports nine experiments with $E[t]<1.65$, meaning the most likely outcome was failing to reject total loss even though the ad was profitable (fn. 19: with $E[t]<1.65$, more than half the time $t$ falls below the critical value by symmetry); ten with $E[t]>3$; and six moderately underpowered. (Counting the printed column gives 11 below 1.65 and 4 in between; the "ten above 3" count matches.)
^ex-lr-delta100

> [!example] Example: "Highly profitable?" (0% vs +50%)
> Equivalently, rejecting a −25% loss in favour of +25% gain. 12 experiments had $E[t]<1$ (severely underpowered), 4 had $E[t]\in[1,2]$, 5 had $E[t]\in[2,3]$ (power 50-90%), and only **3** had $E[t]>3$. (Counting the printed column (5) does not reproduce the text's split exactly. Below 1 there are **13**: 8 retail (1.1-1.6, 3.1, 5.1) and 5 finance (6.1-6.4, 7.2). In $[1,2)$ there are 4: 3.2 = 1.48, 3.4 = 1.91, 3.6 = 1.99, 7.1 = 1.06. In $[2,3]$ there are 5: 2.2 = 2.00, 2.1 = 2.06, 2.3 = 2.17, 3.3 = 2.25, 3.5 = 2.36. Above 3 there are 3: 3.7, 4.1, 5.2. The printed rows sum to 25, but the text's counts 12 + 4 + 5 + 3 sum to only **24**, so the text undercounts the severely underpowered group by one. Row 1.5's printed 0.37 is itself suspect (it should be about 0.18; see the transcription notes above), but it is below 1 either way. The "three above 3" and "seven in $[1.9,3]$" counts both match the table.) Seven more could reach the mark by growing about 2.5 times (those with $E[t]\in[1.9,3]$) or by better design. The median campaign would have to be **nine times larger** (pooled). Most powerful: firm 5's second campaign (\$180,000, 457,968 people, highest per-person spend \$0.39, tripling spend versus its earlier campaign as Figure II shows) and firm 4's campaign (\$90,000, 1,075,828 people, fourth-highest per-person spend and second-lowest sales s.d.).
^ex-lr-delta50

> [!example] Example: "Strong performer?" (0% vs +10%)
> Every experiment is severely underpowered: the text reports $E[t]<0.5$ for 21 of 25 (p. 1964). The printed column (7) gives **22**: only 3.7 (1.13), 4.1 (1.04) and 5.2 (0.69) are at or above 0.5, and the next largest is 3.5 at 0.47. This is a one-campaign discrepancy, and it does not change the conclusion. Even the most powerful would need to be **7 times** larger. The median retail experiment would need to be **61 times larger** (text; table median 62), with nine exceeding 100; financial firms' median multiplier is a "woeful" **1,241**. In reality the 10% ROI goal would itself have to be estimated.
^ex-lr-delta10

> [!example] Example: "Maximized profits?" (0% vs +5%)
> Multipliers of 247 (retail median) and 4,964 (finance median): "the total U.S. population and the advertiser's annual advertising budget are binding constraints in most cases". These standards are those of textbooks, MBA teaching and ordinary investment decisions. Because the ROI is earned over about two weeks, 5% corresponds to an annualized ROI of over 100%; targeting a 5% *annualized* ROI means detecting 1/26 of the effect, $26^2=676$ times harder (fn. 20).
^ex-lr-delta5

### Analogies (pp. 1964-1965)

- **Drug discovery.** A few drugs (e.g. atorvastatin) are hits and most never reach trials; firms hold diversified portfolios, but ex post profit measurement is straightforward. Advertisers diversify creatives and campaign styles, which guards against a "dud" but not against operating at an unprofitable point on $\beta(c)$, because ex post measurement is so hard.
- **Management consulting, capacity expansion, mergers** also have uncertain returns; Bloom et al. (2013) ran the first RCT of consulting and found a positive effect without precise ROI. The difference is that advertising is replete with metrics that give "a deceptive quantitative veneer".
- Consequently, observational methods claiming much better efficiency than these RCTs (conditional on sample size) "should be viewed with skepticism" (p. 1965).

## Examples

> [!example] Example: Recomputing the "seven times larger" claim from row 3.7
> Row 3.7 has the smallest ROI standard error in the study, 9% (printed, rounded). For the 0% vs +10% test, $E[t]=10/9\approx1.11$ (printed 1.13, computed from the unrounded s.e.), so the multiplier is $(3/1.13)^2\approx7.0$, the printed 7. This is the basis of the text's statement that "even the most powerful experiment would have to be seven times larger" (p. 1964). Row 3.7 had about 497,000 assigned users (Table I), so a well-powered version needs roughly 3.5 million. (Arithmetic from Tables I and III.)
^ex-lr-row37-multiplier

## Connections
- [[Power Analysis and Sample Size]] — the multiplier is the inverse-square law of sample size and detectable effect.
- [[Riley et al 2020 - Sample Size for Prediction Models - Overview]] — a different field's formal sample-size criteria; both show sample sizes far beyond common practice.
- [[Lewis Rao 2015 - The Advertiser's Problem and Marginal ROI]] — the 5-point test approximates a marginal-ROI question.
- [[Geo-Experiment Design and Power Analysis]] — the multipliers are a lower bound when only geo randomization is available (§IV.B).
- [[Hierarchical Models]] and [[Bayesian Estimation and Priors for MMM]] — pooling across many campaigns as the realistic way to learn the average; see the evolving-prior caveat in [[Lewis Rao 2015 - Robustness, Scale, Targeting and Measurement Technology]].

## See Also
- [[Lewis Rao 2015 - Unfavorable Economics of Ad Measurement - Overview]]
- [[The Unfavorable Economics of Ad Experiments - Power and Signal-to-Noise]] — condensed version of this table.
