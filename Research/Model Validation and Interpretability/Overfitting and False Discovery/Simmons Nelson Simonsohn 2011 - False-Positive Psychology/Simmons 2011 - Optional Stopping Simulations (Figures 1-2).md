---
title: "Simmons 2011 - Optional Stopping Simulations (Figures 1-2)"
tags:
  - source/ingested
  - topic/model-validation
  - topic/false-discovery
  - topic/research-methodology
  - topic/sequential-testing
  - topic/simulation
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Simmons Nelson Simonsohn 2011 - False-Positive Psychology.pdf]]"
source_location: "Simmons, Nelson & Simonsohn (2011), pp. 1361-1362: 'A closer look at flexibility in sample size'; Figure 1 (false-positive rate vs testing frequency for minimum n of 10 and 20); Figure 2 (illustrative p-value path, n = 11 to 70 per condition)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Simmons Nelson Simonsohn 2011 - False-Positive Psychology"
doc_type: paper
depends_on:
  - "[[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]"
  - "[[The Peeking Problem and Optional Stopping]]"
used_by:
  - "[[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]"
  - "[[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]]"
aliases:
  - Simmons 2011 Figure 1
  - Simmons 2011 Figure 2
  - Flexibility in sample size simulation
  - Data peeking false-positive rate
---

# Simmons 2011 - Optional Stopping Simulations (Figures 1-2)

> [!summary]
> About 70% of surveyed behavioural scientists admitted to deciding when to stop data collection based on interim tests (John, Loewenstein & Prelec 2011), and many believe this has only a trivial effect. **Figure 1** simulates a researcher who starts with 10 or 20 per cell, retests every 1, 5, 10 or 20 additional observations per cell, and stops at significance or at 50 per cell. The false-positive rate at α = .05 ranges from **22.1%** (minimum 10, test after every observation) down to **10.4%** (minimum 20, test every 20). Every configuration is at least double the nominal rate. **Figure 2** follows one null p-value path from n = 11 to 70 per cell. Read by eye from the figure (approximate values, not given in the text), it dips below .05 in the 20s and later rises well above it, to roughly .6 at its highest. This contradicts the intuition that an effect significant in a small sample "would necessarily be significant with a larger one."
^summary

## Overview

Situation B in [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom|Table 1]] allowed one extra look. This section ("A closer look at flexibility in sample size", p. 1361) generalises to many looks, because interim analysis is the most commonly admitted degree of freedom. The results motivate Requirements 1 (fix the stopping rule ex ante) and 2 (at least 20 per cell) in [[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines]]. The general theory of peeking, including always-valid alternatives, is in [[The Peeking Problem and Optional Stopping]] and [[Always-Valid p-values and the mSPRT]].

## Main Content

### Prevalence and intuition (p. 1361)

- **Prevalence:** "a recent survey of behavioral scientists found that approximately 70% admitted to having done so" (John, Loewenstein & Prelec 2011, then under review; published 2012 in *Psychological Science*).
- **Folk belief:** "many believe this practice exerts no more than a trivial influence on false-positive rates." Figure 1 is presented as "Contradicting this intuition".

### Figure 1 design (p. 1361-1362)

> [!algorithm] Figure 1 simulation: data-dependent stopping
> **Inputs:** minimum per-cell sample $n_0\in\{10,20\}$; testing interval $k\in\{1,5,10,20\}$ additional observations per cell; cap $n_{\max}=50$ per cell; $\alpha=.05$. Data are i.i.d. normal in both cells (null true).
> 1. Collect $n=n_0$ observations per cell and run a two-sample $t$ test.
> 2. If $p\le .05$: stop and report a significant effect.
> 3. Otherwise add $k$ observations per cell, so $n\leftarrow n+k$.
> 4. If $n$ has reached 50 per cell, stop and report a null result. Otherwise return to step 1's test at the new $n$.
>
> **Output:** the proportion of simulated samples that end in "significant".
^alg-fig1

### Figure 1 results (p. 1362)

> [!theorem] Figure 1. Likelihood of obtaining a false-positive result when data collection ends upon obtaining significance (p ≤ .05)
> **Caption (p. 1362):** "Likelihood of obtaining a false-positive result when data collection ends upon obtaining significance (p ≤ .05, highlighted by the dotted line). The figure depicts likelihoods for two minimum sample sizes, as a function of the frequency with which significance tests are performed."
>
> **Figure anatomy (from the PDF text layer):** grouped bar chart. The y-axis is "Percentage of False-Positive Results", with ticks 0, 5, 10, 15, 20, 25. The x-axis is "Number of Additional Per Condition Observations Before Performing Another t Test", with categories 1, 5, 10, 20. The legend title is "Minimum Sample Size", with two series, "n ≥ 10" and "n ≥ 20". Each bar carries a data label. The 5% nominal level is drawn as a dotted line.
>
> **Caveat on series assignment:** the text layer places each pair of data labels under its x category (1: 22.1% / 16.3%; 5: 17.0% / 13.3%; 10: 14.3% / 11.5%; 20: 12.7% / 10.4%). It does not show which label belongs to which legend series. Assigning the higher value in each pair to n ≥ 10 rests on (i) the text's statement that the n ≥ 10, test-every-observation researcher "finds a significant effect 22% of the time" (p. 1362), (ii) the logic that fewer looks give fewer false positives, and (iii) the reproduction below. It is not a direct reading of the legend.
>
> | Additional per-condition observations before another $t$ test | Minimum $n\ge 10$ | Minimum $n\ge 20$ |
> |---|---|---|
> | 1 | 22.1% | 16.3% |
> | 5 | 17.0% | 13.3% |
> | 10 | 14.3% | 11.5% |
> | 20 | 12.7% | 10.4% |
>
> **Headline (p. 1362):** a researcher who starts with 10 per condition and tests after every new per-condition observation "finds a significant effect 22% of the time".
^fig-1

Two regularities:
1. **More frequent looks → more false positives.** Moving from testing every 20 observations to every single observation raises the rate by about 9.4 points at $n_0=10$ and about 5.9 points at $n_0=20$.
2. **A higher minimum $n$ → fewer false positives at every frequency.** This is the empirical basis for Requirement 2's claim that "larger minimum sample sizes can lessen the impact of violating Requirement 1" ([[Simmons 2011 - Six Disclosure Requirements and Four Reviewer Guidelines#^prop-min-n]]).

> [!theorem] Background result: unbounded peeking eventually rejects with probability one
> Under $H_0$ the standardised mean difference $Z_n$ behaves like a normalised random walk. By the law of the iterated logarithm, $\limsup_n |Z_n|/\sqrt{2\log\log n}=1$ almost surely, so $|Z_n|$ exceeds any fixed critical value such as 1.96 infinitely often. A researcher who tests after every observation with no cap will therefore reach $p<.05$ with probability 1. The cap at 50 per cell in Figure 1 is the only reason its rates stay near 10-22%. This result is not stated in the paper. It is the standard reason peeking is unbounded in principle (see [[The Peeking Problem and Optional Stopping]]).
^thm-lil

### Figure 2: one p-value path (p. 1362)

> [!example] Figure 2. Illustrative simulation of p values for a researcher who adds one observation to each of two conditions and runs a $t$ test after each addition (p. 1362)
> **Caption (p. 1362):** "Illustrative simulation of p values obtained by a researcher who continuously adds an observation to each of two conditions, conducting a t test after each addition. The dotted line highlights the conventional significance criterion of p ≤ .05."
>
> **Figure anatomy (from the PDF text layer):** line plot with one marker per sample size. The y-axis is "p Value", with ticks .00, .10, .20, .30, .40, .50, .60, .70. The x-axis is "Sample Size (number of observations in each of two conditions)", with tick labels 11, 16, 21, 26, 31, 36, 41, 46, 51, 56, 61, 66. The text says sampling continues "until the number of per-condition observations reaches 70".
>
> **Setup:** a single simulated null dataset, with a $t$ test after each per-condition addition, from 11 to 70 per condition. The dotted line marks $p\le .05$.
>
> **What the paper states in text:** only the qualitative point quoted below. No p-values from the path are given in the text.
>
> **Shape of the path. ⚠ Every number in this paragraph is an approximate reading by eye of the plotted markers. None can be checked against the PDF text layer, so treat each as roughly ±.02 in $p$ and ±1 in $n$:** $p$ starts around .28 at $n=11$ and sits near .33-.34 for $n=12$-14. It drops to about .17 at $n=15$, then oscillates between roughly .06 and .12 for $n\approx 16$-21 (e.g. about .09 at 16, .12 at 17, .06 at 18, .10-.12 at 19-20, just above .05 at 21). It first goes below .05 at about $n\approx 22$-23 (about .04 and .03). At $n\approx 24$ it bounces back to roughly .05-.06, touching or just exceeding the line. It falls again to its **minimum of about .02 at $n\approx 26$-27** and is about .04 at 28. It is back at or above .05 by $n\approx 29$ and clearly above it (about .08) at 30. So there are **two separate sub-.05 excursions** (about $n=22$-23 and $n=25$-28), split by the near-.05 point at 24. After that the path climbs through .2-.3 in the 30s-40s, reaches about .5 in the mid-50s, peaks near .6 at about $n\approx 66$, and ends near .30 at $n=70$.
>
> **Point (p. 1362):** the example "contradicts the often-espoused yet erroneous intuition that if an effect is significant with a small sample size then it would necessarily be significant with a larger one." A researcher who stopped at the first crossing (around $n\approx 22$) would report an effect that the larger sample does not support. The two excursions also show that a researcher who keeps peeking can hit significance more than once on the same null path.
^fig-2

### Reproduction

Re-running the Figure 1 algorithm (4,000 replications per cell, two-sample $t$ test) gives:

| $k$ | Paper $n_0{=}10$ | Repro $n_0{=}10$ | Paper $n_0{=}20$ | Repro $n_0{=}20$ |
|---|---|---|---|---|
| 1 | 22.1 | 22.1-22.4 | 16.3 | 16.0-16.4 |
| 5 | 17.0 | 16.6-17.8 | 13.3 | 13.2 |
| 10 | 14.3 | 13.9-15.3 | 11.5 | 11.3 |
| 20 | 12.7 | 11.3-11.7 | 10.4 | 8.5 (looks at 20, 40) / 11.2 (adds a final look at 50) |

Ranges come from two runs with different seeds (Monte Carlo SE ≈ 0.5-0.65 pp). Agreement is good except at $k=20$. There the paper's description does not say whether a final test is run at the cap of 50 when the testing grid skips it ($n_0=20$: 20, 40, then 60 > 50). The published 10.4% lies between the two readings. The qualitative pattern reproduces exactly.

## Examples

> [!example] Example: Peeking in an online A/B test or a campaign readout (generic)
> A team checks a conversion-lift dashboard daily during a 4-week test with a fixed maximum duration and stops as soon as the lift is significant. That is Figure 1 with $k$ = one day of traffic. With roughly 20-28 looks the realised Type I error is far above 5%, likely above the 22% in the paper's most aggressive cell, because there are many more looks. Remedies, in Simmons et al.'s terms: fix the duration in advance and report it (Requirement 1), or use a design that is valid under continuous monitoring ([[Always-Valid p-values and the mSPRT]]; Pocock-style group-sequential boundaries, mentioned in the [[Simmons 2011 - Criticisms, Nonsolutions and Concluding Remarks#^nonsol-alpha|alpha-correction discussion]]). For Bayesian readouts see [[Q - Does Peeking Matter for a Bayesian]]. Carryover in media tests complicates sequential designs further: [[Q - How Adstock Breaks Switchback and Sequential Test Assumptions]].
^ex-generic-application

## Connections

- General treatment of peeking, alpha spending and confidence sequences: [[The Peeking Problem and Optional Stopping]], [[Always-Valid p-values and the mSPRT]].
- Why low-$n$ early stops also exaggerate effect sizes: [[Type S and Type M Errors]].
- Planning $n$ in advance: [[Power Analysis and Sample Size]].
- Study 2's hidden peeking "approximately every 10 observations" is a real instance of this simulation: [[Simmons 2011 - Chronological Rejuvenation Demonstration Studies]].

## See Also

- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]]
- [[Simmons 2011 - Table 1 Simulations of Four Researcher Degrees of Freedom]]: Situation B, the single-look case
