---
title: "Abowd 2022 - Utility Experiments"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/example
  - doc/paper
source: "[[raw/Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm.pdf]]"
source_location: "Sec. 8.3 (Figures 2-5) and Sec. 9 (Tables 9-13), pp. 34-44"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm"
doc_type: paper
depends_on:
  - "[[Abowd 2022 - Least Squares and Rounder Estimators]]"
  - "[[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]"
used_by:
  - "[[Abowd 2022 - Conclusion, Limitations and Marketing Relevance]]"
aliases:
  - census TDA accuracy results
  - TDA error tables baseline inc_rho l2_onepass
  - census DP bias non-negativity
---

# Abowd 2022 - Utility Experiments

> [!summary]
> At production settings the redistricting criterion is met for places and off-spine entities with populations of 200-249 (target was 500) and for block groups with 450-499. Block-level total-population mean absolute error is 4.8 persons; county-level is 1.75, trivial against 2010 coverage-error simulations (county MAE 117 to 964) but comparable at the block level (1.5 to 5.4). Experiments on 2010 data show a 10% increase in $\rho$ reduces error only about 3%, multi-pass L2 estimation consistently beats one pass, and non-negativity induces positive bias in small blocks and negative bias in large ones.

## Overview

Section 8.3 summarizes accuracy over the demonstration releases; Section 9 reports four runs of TDA on 2010 redistricting data, person-level only, to isolate the marginal effects of randomness, a larger $\rho$ and the multi-pass estimator. All errors compare to the 2010 CEF.

## Main Content

### Accuracy over time (8.3)

At production settings, for Census-designated places and target off-spine entities (including those in AIAN and non-AIAN branches), the $\pm5$-percentage-point target is met at least 95% of the time in the population interval 200-249 (the original target was 500); for block groups the target is met in the interval 450-499. The data are reliable for Congressional, state legislative districts and all 73 redistricting use cases supplied by the Department of Justice Voting Section (many low-population legislative areas). For specific plans, majority-minority districts near the 50% threshold differ by only a handful of persons and are as likely to flip over as under. Voting Rights Act Section 2 analysis is unchanged for the vast majority of Congressional, state legislative and DoJ-provided plans. Detailed metrics are in Wright and Irimata (2021) and the Bureau's demonstration-data documentation.

**Figures 2-5** plot mean absolute error (MAE, the $L_1$ error averaged over geographic units for a single realization of TDA) by demonstration-data vintage: Figure 2, county total population among the least populous counties (population under 1,000); Figure 3, total population for federal American Indian reservations / off-reservation trust lands; Figure 4, total population among all incorporated places; Figure 5, tract HISPANIC x race-alone populations. (Plot values are not transcribed here.) Improvements over time came from algorithm changes, tuning and increased budgets: November 2020 vs April 2021 at $\rho=0.1885$ isolate algorithmic improvements at the same budget; April 2021 at $\rho=0.1885$ vs $\rho=1.095$ isolate the budget effect. Not every query improves with each algorithmic change: MAE of total population for all incorporated places *rose* between November 2020 and April 2021 at $\rho=0.1885$, returning to its November 2020 value at $\rho=1.095$. Algorithmic improvements trade among many metrics for a fixed budget, whereas raising the budget with the same algorithm improved accuracy across many metrics.

### Experimental design (Sec. 9)

Four independent TDA runs on 2010 redistricting data (persons only), with production settings as the baseline: **baseline1** (the June 8, 2021 PPMF exactly as published), **baseline2** (fresh randomness, otherwise identical), **inc_rho** ($\rho$ increased by 10% to 2.81 from 2.56) and **l2_onepass** (the multi-pass L2 component removed at state, county, tract and block-group levels, using a single L2 pass). The absolute error of a query is $\sum_{i=1}^m|\hat\theta_i-\theta_i|$ over its $m$ levels ($m=1$ for TOTAL, 2 VOTINGAGE, 63 CENRACE, 2,016 DETAILED), averaged over the geographic level.

### Table 9: absolute error, TOTAL, VOTINGAGE and HISPANIC queries (averaged across geographic units)

| Level | Query | baseline1 | baseline2 | inc_rho | l2_onepass |
|---|---|---|---|---|---|
| US | TOTAL | 0.00 | 0.00 | 0.00 | 0.00 |
| State | TOTAL | 0.00 | 0.00 | 0.00 | 0.00 |
| County | TOTAL | 1.75 | 1.75 | 1.71 | 1.73 |
| Tract | TOTAL | 1.94 | 1.93 | 1.84 | 1.88 |
| Block Group | TOTAL | 16.00 | 16.01 | 15.42 | 15.99 |
| Block | TOTAL | 4.85 | 4.85 | 4.69 | 4.85 |
| US | VOTINGAGE | 70.00 | 92.00 | 64.00 | 112.00 |
| State | VOTINGAGE | 29.69 | 25.57 | 24.08 | 27.14 |
| County | VOTINGAGE | 19.67 | 19.82 | 19.04 | 19.62 |
| Tract | VOTINGAGE | 15.00 | 15.10 | 14.47 | 15.10 |
| Block Group | VOTINGAGE | 21.35 | 21.40 | 20.57 | 21.34 |
| Block | VOTINGAGE | 6.23 | 6.23 | 6.01 | 6.23 |
| US | HISPANIC | 28.00 | 24.00 | 18.00 | 14.00 |
| State | HISPANIC | 24.24 | 28.00 | 27.25 | 27.02 |
| County | HISPANIC | 20.29 | 20.81 | 19.48 | 20.13 |
| Tract | HISPANIC | 8.11 | 8.12 | 7.81 | 8.06 |
| Block Group | HISPANIC | 20.24 | 20.27 | 19.56 | 20.21 |
| Block | HISPANIC | 5.82 | 5.82 | 5.63 | 5.82 |

### Table 10: absolute error, CENRACE, HISPANICxCENRACE and DETAILED queries

| Level | Query | baseline1 | baseline2 | inc_rho | l2_onepass |
|---|---|---|---|---|---|
| US | CENRACE | 698.00 | 842.00 | 666.00 | 666.00 |
| State | CENRACE | 393.45 | 392.55 | 384.75 | 399.76 |
| County | CENRACE | 126.42 | 126.45 | 122.00 | 127.25 |
| Tract | CENRACE | 35.04 | 35.02 | 33.83 | 35.04 |
| Block Group | CENRACE | 41.36 | 41.39 | 40.17 | 41.39 |
| Block | CENRACE | 8.04 | 8.05 | 7.80 | 8.04 |
| US | HISPANICxCENRACE | 882.00 | 1054.00 | 930.00 | 890.00 |
| State | HISPANICxCENRACE | 562.00 | 558.31 | 552.75 | 563.53 |
| County | HISPANICxCENRACE | 164.59 | 164.69 | 159.38 | 165.03 |
| Tract | HISPANICxCENRACE | 43.64 | 43.65 | 42.15 | 43.67 |
| Block Group | HISPANICxCENRACE | 49.48 | 49.50 | 48.03 | 49.45 |
| Block | HISPANICxCENRACE | 8.94 | 8.94 | 8.67 | 8.94 |
| US | DETAILED | 4456.00 | 4332.00 | 4176.00 | 4212.00 |
| State | DETAILED | 1568.27 | 1573.18 | 1507.14 | 1572.35 |
| County | DETAILED | 294.45 | 293.71 | 284.47 | 294.50 |
| Tract | DETAILED | 95.33 | 95.29 | 91.96 | 95.29 |
| Block Group | DETAILED | 70.18 | 70.18 | 68.03 | 70.14 |
| Block | DETAILED | 10.93 | 10.93 | 10.59 | 10.93 |

DETAILED $=$ HHGQ x VOTINGAGE x HISPANIC x CENRACE. Reading: US and state values for TOTAL are exactly 0 because they are invariant; errors tend to fall moving from US to blocks, largely because queries become sparse at lower levels; baseline1 and baseline2 agree closely, especially at low levels where many units are averaged (single-run averages are adequate for this purpose but are **not** a substitute for run-to-run variability in an individual geography, as error distributions differ across units); the 10% higher $\rho$ gives a noticeable but small improvement (roughly 3% less error); multi-pass beats one pass consistently across many queries (US-level values are noisy single draws and need not follow the pattern).

### Tables 11-12: signed-error distributions of TOTAL (selected rows)

County level (Table 11), by CEF population group (number of counties in parentheses), mean absolute error $L_1$ and selected quantiles (paper's "quartile" label means quantile $q(x)$), baseline1 / baseline2 / inc_rho / l2_onepass:

| County population | mean $L_1$ | $q(0.025)$ | median | $q(0.975)$ |
|---|---|---|---|---|
| 0 to 1,000 (35) | 1.314 / 0.943 / 1.314 / 1.343 | -3 / -2 / -3 / -3 | 0 / 0 / 1 / 0 | 3 / 3 / 3 / 4 |
| 1,001 to 9,999 (663) | 1.611 / 1.528 / 1.596 / 1.558 | -4 / -4 / -4 / -4 | 0 / 0 / 0 / 0 | 4 / 5 / 4 / 4 |
| 10k to 99,999 (1,867) | 1.77 / 1.819 / 1.736 / 1.774 | -4 / -4 / -4 / -4 | 0 / 0 / 0 / 0 | 5 / 5 / 4 / 4 |
| 100k to 999,999 (539) | 1.883 / 1.818 / 1.753 / 1.761 | -5 / -5 / -4 / -5 | 0 / 0 / 0 / 0 | 4 / 5 / 4 / 4 |
| 1,000k+ (39) | 2.026 / 1.923 / 2.256 / 2.333 | -9 / -10 / -7 / -9 | -1 / -1 / 0 / -2 | 4 / 4 / 7 / 4 |

County errors are fairly symmetric around zero except for the largest counties, which have a slightly larger chance of negative error but small relative to the county population.

Block level (Table 12), baseline1 only for brevity (all four runs are within a few percent for the means; inc_rho consistently lowest):

| Block CEF population (blocks) | mean $L_1$ (b1) | $q(0.025)$ | median | $q(0.975)$ | $q(0.995)$ |
|---|---|---|---|---|---|
| 0 (191,175) | 2.746 | 0 | 2 | 11 | 17 |
| 1 to 9 (1,823,665) | 3.332 | -5 | 1 | 12 | 17 |
| 10 to 99 (3,666,266) | 4.824 | -12 | 0 | 13 | 19 |
| 100 to 999 (707,291) | 9.153 | -30 | -5 | 13 | 20 |
| 1,000+ (9,805) | 27.124 | -71 | -26 | 7 | 18 |

Blocks with small populations are on average slightly overestimated and blocks with larger populations slightly underestimated: directly tied to the non-negativity requirement and far more pronounced at the block level because so many blocks have very small totals. (Table 11/12 values were transcribed from a text extraction of the printed tables; the bin labels and counts were matched to rows by the table structure, so cross-check against the PDF when exact figures matter.)

### Table 13: signed count error in total population by Blau-index quintile

The Blau index measures group heterogeneity over eight race-ethnicity levels (Hispanic, and non-Hispanic: White alone, Black alone, AIAN alone, Asian alone, NHPI alone, Some Other Race alone, Two or More Races), quintiles from the 2010 CEF (larger = more heterogeneous). Errors by Blau quintile were "one of the main motivations for developing the multi-pass estimators".

| Level | Quintile | baseline1 | baseline2 | inc_rho | l2_onepass |
|---|---|---|---|---|---|
| County | 1 | 0.17 | 0.14 | 0.14 | 0.39 |
| County | 2 | 0.01 | 0.06 | -0.09 | 0.04 |
| County | 3 | 0.01 | -0.01 | -0.13 | -0.04 |
| County | 4 | -0.04 | -0.04 | 0.11 | -0.11 |
| County | 5 | -0.14 | -0.15 | -0.03 | -0.28 |
| Tract | 1 | 0.07 | 0.07 | 0.11 | 0.34 |
| Tract | 2 | 0.03 | 0.03 | 0.02 | 0.08 |
| Tract | 3 | -0.02 | -0.02 | -0.01 | -0.02 |
| Tract | 4 | -0.05 | -0.04 | -0.07 | -0.13 |
| Tract | 5 | -0.04 | -0.04 | -0.05 | -0.26 |
| Block Group | 1 | 1.69 | 1.70 | 1.66 | 1.81 |
| Block Group | 2 | 1.55 | 1.55 | 1.53 | 1.65 |
| Block Group | 3 | 0.69 | 0.69 | 0.62 | 0.67 |
| Block Group | 4 | -0.90 | -0.90 | -0.77 | -0.89 |
| Block Group | 5 | -2.91 | -2.91 | -2.92 | -3.10 |
| Block | 1 and 2 | 1.55 | 1.55 | 1.50 | 1.55 |
| Block | 3 | -0.22 | -0.22 | -0.21 | -0.21 |
| Block | 4 | -1.07 | -1.07 | -1.05 | -1.07 |
| Block | 5 | -1.67 | -1.67 | -1.62 | -1.67 |

The improvement of the two baselines over l2_onepass at county, tract and block group is evident: the first pass of the multi-pass estimator locks in the total population estimate and is less prone to non-negativity side effects. The error values associated with the increased budget are small around the production value of $\rho$.

### Comparison with other sources of census uncertainty (Sec. 9 end)

At the block level, mean absolute error of total population is 4.8 persons and 90% of blocks with housing units or GQ have errors between -11 and 10; in blocks with total population above 3,250, MAE is 22.3 and 90% of errors lie in $[-80,3]$. For 2010 simulations (GQ excluded): Schafer ("natural variability over repeated realizations of the census") block MAE 1.5 persons, 90% in $[-4,4]$; for blocks of 1,000+ persons MAE 14, 90% in $[-31,30]$; Bell (coverage error vs dual-system estimate) block MAE 5.4, 90% in $[-11,12]$. So at block level the DAS uncertainty is comparable to operational, measurement and coverage uncertainty. At county level DAS MAE is 1.75 (90% in $[-4,4]$) versus 117 (90% in $[-248,230]$) for Schafer and 964 (90% in $[-1841,2048]$) for Bell: DAS uncertainty is trivial. The explanation: DAS controls disclosure-limitation error at all levels, whereas operational, measurement and coverage errors accumulate as population grows.

## Examples

> [!example] Reading the $\rho$ increase
> Setup: baseline $\rho=2.56$ versus inc_rho $\rho=2.81$ (+10%).
> Solution: Table 9 county TOTAL: 1.75 vs 1.71 (-2.3%); tract TOTAL 1.94 vs 1.84 (-5.2%); block group 16.00 vs 15.42 (-3.6%); block 4.85 vs 4.69 (-3.3%); Table 10 block DETAILED 10.93 vs 10.59 (-3.1%).
> Interpretation: if error scales like noise standard deviation, which scales as $\rho^{-1/2}$, a 10% larger $\rho$ would cut it by about $1-1.1^{-1/2}=4.7\%$; the observed 2-5% is in that neighbourhood, consistent with noise-dominated error. This scaling is the note's reasoning, not the paper's; post-processing error is not exactly proportional to noise scale. Percentages computed from the printed tables.
^ex-rho-increase

```python
import numpy as np
b = {"county TOTAL": (1.75, 1.71), "tract TOTAL": (1.94, 1.84), "block group TOTAL": (16.00, 15.42),
     "block TOTAL": (4.85, 4.69), "block DETAILED": (10.93, 10.59)}
for k, (base, inc) in b.items():
    print(k, round(100 * (inc / base - 1), 1))
print(100 * (1 / np.sqrt(1.1) - 1))     # about -4.7: sqrt(rho) scaling benchmark
```

## Connections

- Positive bias in small cells and negative bias in large ones come from the non-negativity constraint in [[Abowd 2022 - Least Squares and Rounder Estimators]] and not from the DP noise itself.
- Comparison of DP noise to other sampling and coverage error is the same logic as comparing measurement noise to sampling variance in experiment design: [[Power Analysis and Sample Size]].
- Error that is data-dependent and not available in closed form echoes post-selection issues: [[Overfitting and Information Criteria]].

## See Also

- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]
- [[Abowd 2022 - Conclusion, Limitations and Marketing Relevance]]
