---
title: "IntHout 2014 - Simulation Results and Error Rates"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/theorem
  - doc/paper
source: "[[raw/IntHout 2014 - Hartung-Knapp-Sidik-Jonkman Method for Random Effects Meta-Analysis.pdf]]"
source_location: "Results, pp. 3-5, Table 1 (p. 5), Figure 1 (p. 4); Additional files Fig. S1-S2"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis"
doc_type: paper
depends_on:
  - "[[IntHout 2014 - Simulation Design]]"
used_by:
  - "[[IntHout 2014 - Discussion, Limitations and Recommendations]]"
aliases:
  - DL type I error inflation
  - HKSJ error rates
  - Table 1 min max error rates
---

# IntHout 2014 - Simulation Results and Error Rates

> [!summary]
> HKSJ error rates are closer to the nominal 5% than DL in every simulated scenario. With heterogeneity ($I^2\ge0.25$) and 5 trials, DL's error rate runs 5.7% to 14.7% (equal vs unequal sizes) versus HKSJ 4.7% to 9.9%; with 2 trials DL reaches 30.9% to 33.7% versus HKSJ at most 10.2%. HKSJ error "at most doubled" (one large trial), DL "could be over 30%". With $I^2=0$, DL is conservative (about 3-4%) and HKSJ about 5%.

## Overview

All results concern the true overall effect equal to zero, nominal $\alpha=0.05$, 10,000 series per cell. Figure 1 plots continuous-outcome error rates against $I^2$ for four size configurations (A equal; B one small trial 1/10; C 50-50 small and large, ratio 1:10; D one large trial 10 times larger), with bars for the min and max over group sizes and lines connecting means. Additional files give the RR (Fig. S1) and OR (Fig. S2) analogues.

## Main Content

> [!theorem] Empirical finding 1: DL inflation (continuous outcomes)
> With unequal-sized trials, DL Type I error is substantially inflated even at minimal heterogeneity; with equal sizes, minimal or modest heterogeneity does not inflate much. For $I^2\ge0.25$ DL rates are too large even for series of 20 trials. At $I^2=0$ DL is too low (about 3-4%). For $k=5$ DL ranges from 5.7% (equal sizes) to 14.7% (mixtures). Group sizes themselves do not matter.
^thm-dl-inflation

> [!theorem] Empirical finding 2: HKSJ is nearly nominal
> HKSJ always outperformed DL; its error rate is usually roughly 5%. For equal sizes it is very appropriate; with one small trial it is about right for more than five studies, higher for fewer; it also degrades when the share of small trials rises (config C); with one large trial it can approach double (10%), especially at moderate heterogeneity. With $I^2=0$ it stays about 5%.
^thm-hksj-nominal

> [!definition] Table 1: minimum-maximum error rates (%) by trial-size mixture
> Ranges are over $I^2\in\{0.25,\dots,0.9\}$ (or over $k=2$ to 20 for $I^2=0$) and over group sizes (event rates for binary outcomes).
>
> | Outcome | $I^2$ | $k$ | Equal: DL | Equal: HKSJ | One small: DL | One small: HKSJ | 50-50: DL | 50-50: HKSJ | One large: DL | One large: HKSJ |
> |---|---|---|---|---|---|---|---|---|---|---|
> | Continuous | 0 | 2-20 | 3.4-4.6 | 4.5-6 | 3.4-4.5 | 4.7-5.4 | 3.3-4.1 | 4.6-5.4 | 3.2-4.4 | 4.5-5.7 |
> | | .25-.9 | 2 | 6-25 | 4.7-5.4 | 13.8-30.9 | 6.5-9.2 | 13.8-30.9 | 6.5-9.2 | 13.8-30.9 | 6.5-9.2 |
> | | | 3 | 5.9-17.5 | 4.7-5.6 | 10.8-21.7 | 6-8 | 10.2-20.8 | 5.9-7.7 | 13.7-22.1 | 7.1-10.7 |
> | | | 4 | 5.6-14.2 | 4.5-5.5 | 9-16.8 | 5.6-7 | 11.9-18.4 | 6.6-9.6 | 12.6-17.3 | 5.9-10.5 |
> | | | 5 | 5.7-12.7 | 4.7-5.5 | 8.2-13.6 | 5.5-6.7 | 9.9-14.7 | 5.6-7.9 | 11.6-14.5 | 5.3-9.9 |
> | | | 10 | 5.6-8.8 | 4.8-5.6 | 6.4-8.8 | 5-5.6 | 9-10.3 | 5.4-7.2 | 8.5-10 | 5.3-8.8 |
> | | | 20 | 5.6-6.6 | 4.6-5.3 | 5.8-7.1 | 4.8-5.5 | 7.1-7.8 | 5-6.4 | 6.9-7.8 | 4.9-7.2 |
> | Risk ratio | 0 | 2-20 | 0.9-4.2 | 2.1-6.9 | 2.8-4.1 | 2.7-6.5 | 3.0-4.1 | 2.7-6.8 | 2.7-4.3 | 2.7-5.5 |
> | | .25-.9 | 2 | 2.5-26.3 | 2.8-6.7 | 14.3-33.7 | 6-10.2 | 14.3-33.7 | 6-10.2 | 14.3-33.7 | 6-10.2 |
> | | | 5 | 2.5-12.9 | 3.9-5.7 | 7.9-15 | 5.5-7.2 | 9.8-15.7 | 5.2-7.9 | 11.4-14.2 | 5.2-10.6 |
> | | | 10 | 2.6-8.9 | 2.7-5.4 | 6-9.7 | 3.8-5.7 | 8.6-11 | 4.8-9.1 | 7.3-10.1 | 3.6-8.7 |
> | Odds ratio | 0 | 2-20 | 1.3-4.3 | 2.7-6.1 | 3-4 | 3-6.7 | 3-4 | 3-6.7 | 2.9-4.1 | 3-5.4 |
> | | .25-.9 | 2 | 2.9-25.3 | 3.2-5.9 | 13.7-33.5 | 6.1-9.6 | 13.7-33.5 | 6.1-9.6 | 13.7-33.5 | 6.1-9.6 |
> | | | 5 | 3-12.7 | 3.9-5.3 | 7.9-14.4 | 5.4-6.9 | 9.9-15.8 | 5.3-8.1 | 11.6-14.2 | 5.2-10.5 |
> | | | 10 | 2.9-8.8 | 3.2-5.3 | 5.7-9.6 | 3.9-5.7 | 8.4-11.7 | 4.8-9.3 | 7.4-10.1 | 3.8-8.8 |
^def-table1-error-rates

### Binary outcomes

For RR, results are like the continuous ones but with more variation, depending on group sizes and risks (0.1 to 0.9). At $I^2=0.25$: DL 2.2-15.5%, HKSJ 2.8-10.6%. At $I^2=0.9$: DL 6.4-33.7%, HKSJ 2.7-10.2%. At $I^2=0$: DL 0.9-4.3%, HKSJ 2.1-6.9%. Odds ratios behave similarly (Table 1).

### Reading the table

- The worst DL cells are $k=2$ to 3 with any unequal sizes: 14 to 34%, i.e. two to seven times the nominal rate.
- HKSJ's worst cell is "one large trial" with moderate heterogeneity at small $k$: 10 to 11% for $k=3$ to 5 (continuous), 10.6% (RR, $k=5$).
- HKSJ can be mildly anti-conservative or conservative at $I^2=0$ for binary outcomes (2.1-6.9% RR), because estimated variances and continuity corrections matter.

## Examples

> [!example] Reading off a decision rule
> A portfolio of 5 lift tests, one 10x larger than the rest, with moderate heterogeneity ($I^2$ about 0.5): Table 1 says a nominal 5% DL test is really a 12 to 14% test (continuous, one-large row) and HKSJ is a 5 to 10% test. A "significant" pooled lift at $p=0.04$ under DL is thus weak evidence; the HKSJ $p$-value is the one to report ([[IntHout 2014 - Converting DL Results to HKSJ Worked Examples]]).
^ex-portfolio-decision

```python
# Recompute a Table-1-style cell (continuous outcome) with the generator from the Simulation Design note
import numpy as np
cell = np.mean([one_series([100]*4 + [1000], 0.5) for _ in range(10000)], axis=0)   # -> about (0.15, 0.10)
```

## Connections

- Marketing measurement: error-rate inflation here is the meta-analytic version of the "peeking and multiple looks" problem; see [[Multiple Testing Corrections]] and [[Researcher Degrees of Freedom]]. A pooled-iROAS claim based on DL from a few unequally sized experiments is a false-positive risk for budget decisions.
- The Bayesian alternative, with a prior that keeps $\tau$ away from zero, is [[Roever 2020 - Priors for the Effect and Heterogeneity]].

## See Also

- [[IntHout 2014 - Cochrane Empirical Comparison]]
- [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
