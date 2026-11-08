---
title: "Hullman 2015 - Results and Mean Absolute Error"
tags:
  - source/ingested
  - topic/decision-analysis
  - type/example
  - doc/paper
source: "[[raw/Hullman Resnick Adar 2015 - Hypothetical Outcome Plots Outperform Error Bars and Violin Plots.pdf]]"
source_location: "Sec. 5, Table 4, Figs 4-8, pp. 12-17"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Decisions and Value of Information/Hullman 2015 - Hypothetical Outcome Plots"
doc_type: paper
depends_on:
  - "[[Hullman 2015 - Study Design and Distribution Tables]]"
used_by:
  - "[[Hullman 2015 - Discussion and Limitations]]"
aliases:
  - HOP experiment results
  - Table 4 mean absolute error
---

# Hullman 2015 - Results and Mean Absolute Error

> [!summary]
> Table 4 gives mean absolute error (MAE) by task and display. H1 supported (HOPs worse for the mean at high $\sigma$: 9.6 vs 4.2 violin and 2.1 error bar); H2 got little support (violin best on only one task); H3 and H4 strongly supported (bivariate MAE 0.09-0.13 for HOPs vs 0.35-0.63 for violin and error bars; trivariate 0.14 vs 0.37 and 0.36).

## Overview

Time on task was similar (HOPs mean 523 s, median 544; error bars 479, violin 481 mean; medians 451; $F(2,285)=2.02$, $p>0.1$). Order and time on page had no effect and added at most 1% to $R^2$, so models omit them. Tests are ANOVA with adjusted pairwise comparisons; a star marks a treatment significantly different from at least one other ($p_{\text{adj}}<0.001$).

## Main Content

**Table 4 - Mean absolute error** (units: ppm for $\mu_A$, probability for the rest).

| Row | Type | $\sigma$ / task parameter | Question | Correct | HOPs | Violin | Error bar |
|---|---|---|---|---|---|---|---|
| 1 | 1,2 | low | $\mu_A$ | N/A | 3.7 | 3.8 | 7.8 |
| 2 | 3,4 | high | $\mu_A$ | N/A | 9.6* | 4.2 | 2.1 |
| 3 | 1 | low, $\lvert\mu-k_1\rvert$ low | $\Pr(A>k_1)$ | .05 | 0.14 | 0.35* | 0.21 |
| 4 | 2 | low, high | $\Pr(A>k_1)$ | 0 | 0.06 | 0.06 | 0.09 |
| 5 | 3 | high, low | $\Pr(A>k_1)$ | .39 | 0.13 | 0.10 | 0.11 |
| 6 | 4 | high, high | $\Pr(A>k_1)$ | .12 | 0.14 | 0.11 | 0.14 |
| 7 | 1,2 | low | $\Pr(k_2\le A\le k_3)$ | N/A | 0.20 | 0.19 | 0.29* |
| 8 | 3,4 | high | $\Pr(k_2\le A\le k_3)$ | N/A | 0.17* | 0.14 | 0.13 |
| 9 | 5 | $\mu_a-\mu_b=5$, $\sigma=15$ | $\Pr(B>A)$ | .59 | 0.11* | 0.37 | 0.38 |
| 10 | 6 | 10, 10 | $\Pr(B>A)$ | .76 | 0.13* | 0.35 | 0.42 |
| 11 | 7 | 5, 2 | $\Pr(B>A)$ | .96 | 0.09* | 0.45 | 0.54 |
| 12 | 8 | 5, 15 (corr .95) | $\Pr(B>A)$ | .85 | 0.10* | 0.63 | 0.60 |
| 13 | 9 | three variables | $\Pr(B>A\text{ and }B>C)$ | .66 | 0.14* | 0.37 | 0.36 |

(Rows 3-6 use the paper's printed layout; the "Correct" column is the probability for the red dot above $\mu$. Row 2: the star marks HOPs as significantly worse, $F(2,573)=32$, $p<0.001$.)

**Hypothesis outcomes.**
- *H1 (mean).* Supported: at high $\sigma$ HOPs are significantly worse than both others ($p_{\text{adj}}<0.001$); at low $\sigma$ no significant difference, though after removing an outlier the error-bar MAE was lowest (1.9, $F(2,571)=10.7$, $p<0.001$).
- *H2 (one-variable CDF).* "Little support": violin was best on only one task. In row 3 violins were significantly worse; in row 7 error bars were worse than violin and HOPs ($F(2,573)=15$); in row 8 HOPs were worse ($F(2,573)=15$, $p<0.01$).
- *H3 (bivariate).* Strong support: all three independent-variable plots and the correlated one, $F(2,573)=73,57,84,220$ for rows 9-12 as printed (the text lists rows 9-11), all $p_{\text{adj}}<0.001$. Static plots never had MAE below 0.35; on row 9 (truth 59%) static-plot answers centred around 95% and 23%, many below 50% although $\mu_B>\mu_A$. The authors suspect substitution of a simpler question such as the mean difference.
- *H4 (trivariate).* Strong support: $F(2,573)=43$, $p<0.001$.

**Figures 4-8** show stimuli (violin versions) and per-display MAE with 95% intervals; the numeric content matches Table 4.

## Examples

Interpretation of row 12: error bars and violin plots show identical marginals for distributions 5 and 8, so they cannot distinguish a 59% from an 85% answer; HOPs show that B is nearly always above A in the same frame and therefore achieve 0.10 MAE versus 0.60-0.63.

## Connections
- E16's "why a band is not a set of curves" has the same logic: marginal bands lose joint information; draws keep it.
- Marketing: probability that incrementality of channel A exceeds channel B requires the joint posterior; marginal credible intervals mislead exactly as in rows 9-12.

## See Also
- [[Hullman 2015 - Hypothetical Outcome Plots - Overview]], [[Hullman 2015 - Discussion and Limitations]]
