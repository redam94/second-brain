---
title: "Stability Selection Figs 5-6 - Per-Cell Power Readings"
tags:
  - source/ingested
  - topic/model-validation
  - topic/variable-selection
  - topic/simulation-studies
  - type/example
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), arXiv:0809.2932v2: §4 Fig. 5 (p. 17, Lasso regression) and Fig. 6 (p. 18, logistic-Lasso classification and OMP regression); bar heights read from the plots"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Stability Selection Simulation Study - Designs A-G and Results]]"
  - "[[Randomised Lasso and the Irrepresentable Condition]]"
  - "[[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]]"
used_by:
  - "[[Stability Selection - Discussion, Limitations and Practice]]"
aliases:
  - Meinshausen-Buhlmann Fig 5 Readings
  - Meinshausen-Buhlmann Fig 6 Readings
  - Stability Selection Power Tables
---

# Stability Selection Figs 5-6 - Per-Cell Power Readings

> [!summary]
> The paper's main power evidence is two bar charts. Fig. 5 covers Lasso regression. Fig. 6 covers logistic-Lasso classification and OMP regression. The paper gives no numbers for either. This note transcribes **approximate values for every cell**, read off the plots at 400 dpi: bar tops measured by pixel and checked by eye, crosses read by eye. Each cell has three values: the base method (dark red bar), stability selection with subsampling (light grey bar), and stability selection with subsampling plus randomisation (black ×; Lasso $\alpha=0.5$, OMP $\alpha=0.9$). The measure is P(the first $\lceil\gamma s\rceil$ variables are all correct), for $\gamma=0.1$ and $0.4$.
> - **Fig. 5 (Lasso regression).** Stability selection is never visibly below the Lasso. Averaged over the 60 cells in the plot, the readings are Lasso 0.40, SS 0.63 and SS+rand 0.67 at $0.1s$. At $0.4s$ they are 0.20, 0.32 and 0.31.
> - **Fig. 6 (classification and OMP).** The pattern is mostly the same, but with **visible exceptions where the base method wins**. These cells are listed below. The paper's summary sentence does not mention them.
^summary-ss-stability-selection-figs-5-6-per-cell-po

## Overview

**How to read the tables.**
- Values are fractions in [0, 1] and are accurate to about ±0.03.
- Bars that reach the top line are recorded as 1. The pixel reading can show 0.99 for the same full-height bar, so 0.97-1 should be treated as "at the ceiling".
- 0 means no visible bar or cross.
- "SS" is stability selection with subsampling only. "SS+rand" adds randomisation of the base method.
- Column order follows the figure header (see [[Stability Selection Simulation Study - Designs A-G and Results#^def-ss-designs|designs]]). Within each $s$, the left bar pair is the harder noise level: SNR 0.5 (or Bayes error 1/3), then SNR 2 (or Bayes error 1/8).

> [!note] Cell count
> Each panel row of Figs 5-6 shows **60 bar pairs**: 8 each for (A), (B), (C) and (F), 12 each for (D) and (E), and 4 for (G). The caption of Fig. 5 and the text (p. 19) say "64 different settings" / "64 scenarios". The ingester counted 60 plotted cells. The remaining 4 may be settings that were run but not plotted, or the count may be a typo.
^note-ss-60-cells

## Main Content

### Fig. 5 - Lasso regression (p. 17)

Columns: Lasso / SS / SS+randomised Lasso ($\alpha=0.5$), for $\gamma=0.1$ and $\gamma=0.4$.

**(A)**

| Block | $s$ | SNR | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=1000, n=100 | 4 | 0.5 | .93 | .92 | .95 | .44 | .42 | .39 |
| p=1000, n=100 | 4 | 2 | 1 | .99 | 1 | .89 | .91 | .88 |
| p=1000, n=100 | 10 | 0.5 | .45 | .55 | .56 | 0 | 0 | 0 |
| p=1000, n=100 | 10 | 2 | .93 | .97 | .95 | .37 | .38 | .31 |
| p=1000, n=1000 | 20 | 0.5 | 1 | .99 | 1 | .96 | .99 | 1 |
| p=1000, n=1000 | 20 | 2 | 1 | .99 | 1 | 1 | .99 | 1 |
| p=1000, n=1000 | 50 | 0.5 | .88 | .97 | .98 | 0 | .08 | .05 |
| p=1000, n=1000 | 50 | 2 | 1 | .99 | 1 | .98 | .99 | 1 |

**(B)**

| Block | $s$ | SNR | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=1000, n=200 | 4 | 0.5 | .91 | .93 | .94 | .58 | .63 | .60 |
| p=1000, n=200 | 4 | 2 | 1 | .99 | 1 | .95 | .95 | .97 |
| p=1000, n=200 | 10 | 0.5 | .55 | .76 | .77 | 0 | .02 | .02 |
| p=1000, n=200 | 10 | 2 | .87 | .99 | 1 | .24 | .75 | .76 |
| p=1000, n=1000 | 20 | 0.5 | .72 | .94 | .98 | 0 | .31 | .24 |
| p=1000, n=1000 | 20 | 2 | .97 | .99 | 1 | .44 | .99 | 1 |
| p=1000, n=1000 | 50 | 0.5 | 0 | .05 | .10 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 2 | .13 | .85 | .90 | 0 | 0 | 0 |

**(C)**

| Block | $s$ | SNR | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=1000, n=200 | 4 | 0.5 | .17 | .20 | .15 | 0 | .02 | .02 |
| p=1000, n=200 | 4 | 2 | .30 | .51 | .45 | .05 | .10 | .11 |
| p=1000, n=200 | 10 | 0.5 | .05 | .11 | .04 | 0 | 0 | 0 |
| p=1000, n=200 | 10 | 2 | .10 | .24 | .20 | 0 | 0 | 0 |
| p=1000, n=1000 | 20 | 0.5 | 0 | 0 | .05 | 0 | 0 | 0 |
| p=1000, n=1000 | 20 | 2 | 0 | .13 | .13 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 0.5 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |

**(D)**

| Block | $s$ | SNR | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=100, n=200 | 10 | 0.5 | .43 | .91 | .95 | .05 | .24 | .25 |
| p=100, n=200 | 10 | 2 | .62 | 1 | 1 | .30 | .85 | .85 |
| p=100, n=200 | 30 | 0.5 | .29 | .66 | .66 | 0 | 0 | 0 |
| p=100, n=200 | 30 | 2 | .36 | .97 | .97 | .05 | .09 | .09 |
| p=1000, n=200 | 4 | 0.5 | .53 | .78 | .74 | .15 | .28 | .24 |
| p=1000, n=200 | 4 | 2 | .76 | .98 | .99 | .47 | .82 | .77 |
| p=1000, n=200 | 10 | 0.5 | .31 | .80 | .74 | 0 | .03 | .04 |
| p=1000, n=200 | 10 | 2 | .56 | .99 | 1 | .10 | .60 | .48 |
| p=1000, n=1000 | 20 | 0.5 | .36 | .99 | 1 | .07 | .33 | .25 |
| p=1000, n=1000 | 20 | 2 | .39 | 1 | 1 | .36 | .91 | .95 |
| p=1000, n=1000 | 50 | 0.5 | .13 | .76 | .73 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 2 | .14 | .99 | 1 | .01 | .29 | .20 |

**(E)**

| Block | $s$ | SNR | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=200, n=200 | 10 | 0.5 | .18 | .57 | .60 | 0 | 0 | 0 |
| p=200, n=200 | 10 | 2 | .22 | .61 | .94 | 0 | .05 | .21 |
| p=200, n=200 | 30 | 0.5 | 0 | .07 | .05 | 0 | 0 | 0 |
| p=200, n=200 | 30 | 2 | 0 | .07 | .25 | 0 | 0 | 0 |
| p=1000, n=200 | 4 | 0.5 | .35 | .58 | .38 | .01 | .05 | .02 |
| p=1000, n=200 | 4 | 2 | .39 | .80 | .96 | .07 | .43 | .56 |
| p=1000, n=200 | 10 | 0.5 | .09 | .28 | .29 | 0 | 0 | 0 |
| p=1000, n=200 | 10 | 2 | .08 | .56 | .78 | 0 | 0 | .05 |
| p=1000, n=1000 | 20 | 0.5 | .01 | .14 | .51 | 0 | 0 | 0 |
| p=1000, n=1000 | 20 | 2 | .01 | .24 | .95 | 0 | 0 | .05 |
| p=1000, n=1000 | 50 | 0.5 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 2 | 0 | 0 | .09 | 0 | 0 | 0 |

**(F)**

| Block | $s$ | SNR | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=660, n=2587 | 4 | 0.5 | 1 | .99 | 1 | .99 | .99 | 1 |
| p=660, n=2587 | 4 | 2 | 1 | .99 | 1 | 1 | .99 | 1 |
| p=660, n=2587 | 10 | 0.5 | .74 | .99 | 1 | .49 | 1 | 1 |
| p=660, n=2587 | 10 | 2 | .92 | .99 | 1 | .69 | .99 | 1 |
| p=660, n=2587 | 20 | 0.5 | .07 | .98 | 1 | 0 | .31 | .32 |
| p=660, n=2587 | 20 | 2 | .13 | .99 | 1 | 0 | .97 | .99 |
| p=660, n=2587 | 50 | 0.5 | 0 | .02 | .07 | 0 | 0 | 0 |
| p=660, n=2587 | 50 | 2 | 0 | .24 | .68 | 0 | 0 | 0 |

**(G)**

| Block | $s$ | SNR | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=4088, n=115 | 4 | 0.5 | .20 | .31 | .24 | 0 | .02 | .01 |
| p=4088, n=115 | 4 | 2 | .48 | .79 | .71 | .08 | .22 | .16 |
| p=4088, n=115 | 10 | 0.5 | .04 | .06 | .06 | 0 | 0 | 0 |
| p=4088, n=115 | 10 | 2 | .18 | .47 | .47 | 0 | 0 | 0 |

^tbl-ss-fig5-cells

> [!example] What the Fig. 5 numbers show
> - **(A) independent design.** At $0.1s$ every cell has all three methods within about 0.1 of each other. The two near-zero cells are at $0.4s$: ($n=100$, $s=10$, SNR 0.5), where all three are 0, and ($n=1000$, $s=50$, SNR 0.5), where the Lasso is 0 and SS is about 0.08. The earlier summary "about equal and often near 1" holds only for the easier cells.
> - **(B) block design.** The largest gains are at ($n=1000$, $s=50$, SNR 2) for $0.1s$ (Lasso 0.13 against SS 0.85 and SS+rand 0.90) and at ($n=1000$, $s=20$, SNR 2) for $0.4s$ (0.44 against 0.99).
> - **(C) Toeplitz, $\rho=0.99$.** Every cell is at or below 0.51. The $0.4s$ row is essentially 0 everywhere except ($n=200$, $s=4$, SNR 2): 0.05, 0.10, 0.11.
> - **(D) 2-factor model.** SS more than doubles the Lasso in most cells. Example: ($p=1000$, $n=1000$, $s=50$, SNR 2) at $0.1s$ is 0.14 against 0.99.
> - **(E) 10-factor model, many irrepresentable violations.** This is where the randomised version stands out. At $0.1s$ the crosses reach about 0.94-0.96 while the grey bars are 0.24-0.80 and the Lasso is ≤0.39. Example: ($p=1000$, $n=1000$, $s=20$, SNR 2) is Lasso 0.01, SS 0.24, SS+rand 0.95. At $0.4s$ the only clear non-zero cell is ($p=1000$, $n=200$, $s=4$, SNR 2): 0.07, 0.43, 0.56.
> - **(F) motif regression.** Lasso and SS are both about 1 at $s=4$ and $10$. At $s=20$, SS stays near 1 while the Lasso falls to 0.07-0.13. At $s=50$ the Lasso is 0. SS is 0.02 and 0.24, and SS+rand reaches 0.07 and **0.68** (SNR 2).
> - **(G) riboflavin.** The randomised cross is **not** uniformly best here. At ($s=4$, SNR 2), $0.1s$, SS 0.79 is above SS+rand 0.71, and both are well above the Lasso at 0.48. At $0.4s$ all methods are ≤0.22.
^ex-ss-fig5-reading

### Fig. 6 - Logistic-Lasso classification (p. 18, top two rows)

Same layout. The noise level is the Bayes misclassification rate: 1/3 (harder) or 1/8. Columns: Lasso / SS / SS+randomised Lasso ($\alpha=0.5$).

**(A)**

| Block | $s$ | Bayes err | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=1000, n=100 | 4 | 1/3 | .38 | .44 | .49 | .09 | .06 | .07 |
| p=1000, n=100 | 4 | 1/8 | .99 | 1 | 1 | .88 | .94 | .94 |
| p=1000, n=100 | 10 | 1/3 | .20 | .26 | .22 | 0 | 0 | 0 |
| p=1000, n=100 | 10 | 1/8 | .92 | .96 | .93 | .11 | .09 | .10 |
| p=1000, n=1000 | 20 | 1/3 | .95 | .98 | .98 | .26 | .25 | .21 |
| p=1000, n=1000 | 20 | 1/8 | 1 | .99 | 1 | 1 | .49 | .88 |
| p=1000, n=1000 | 50 | 1/3 | .31 | .54 | .51 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 1/8 | 1 | .99 | 1 | .71 | .12 | .13 |

**(B)**

| Block | $s$ | Bayes err | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=1000, n=200 | 4 | 1/3 | .66 | .66 | .68 | .18 | .20 | .18 |
| p=1000, n=200 | 4 | 1/8 | 1 | 1 | 1 | .86 | .96 | .97 |
| p=1000, n=200 | 10 | 1/3 | .28 | .37 | .40 | 0 | 0 | 0 |
| p=1000, n=200 | 10 | 1/8 | .73 | .98 | 1 | .09 | .55 | .57 |
| p=1000, n=1000 | 20 | 1/3 | .28 | .45 | .43 | 0 | 0 | 0 |
| p=1000, n=1000 | 20 | 1/8 | .89 | .99 | .92 | .18 | .03 | .02 |
| p=1000, n=1000 | 50 | 1/3 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 1/8 | .07 | .12 | .10 | 0 | 0 | 0 |

**(C)**

| Block | $s$ | Bayes err | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=1000, n=200 | 4 | 1/3 | .05 | .02 | .03 | 0 | 0 | 0 |
| p=1000, n=200 | 4 | 1/8 | .22 | .47 | .41 | .04 | .10 | .05 |
| p=1000, n=200 | 10 | 1/3 | .04 | .03 | .04 | 0 | 0 | 0 |
| p=1000, n=200 | 10 | 1/8 | .09 | .21 | .22 | 0 | 0 | 0 |
| p=1000, n=1000 | 20 | 1/3 | .02 | .02 | .04 | 0 | 0 | 0 |
| p=1000, n=1000 | 20 | 1/8 | .02 | .02 | .04 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 1/3 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 1/8 | 0 | 0 | 0 | 0 | 0 | 0 |

**(D)**

| Block | $s$ | Bayes err | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=100, n=200 | 10 | 1/3 | .43 | .71 | .71 | .02 | .04 | .05 |
| p=100, n=200 | 10 | 1/8 | .61 | 1 | 1 | .25 | .67 | .64 |
| p=100, n=200 | 30 | 1/3 | .23 | .34 | .34 | 0 | 0 | 0 |
| p=100, n=200 | 30 | 1/8 | .32 | .78 | .84 | 0 | .03 | .03 |
| p=1000, n=200 | 4 | 1/3 | .37 | .48 | .44 | .07 | .07 | .08 |
| p=1000, n=200 | 4 | 1/8 | .73 | .99 | .98 | .37 | .82 | .76 |
| p=1000, n=200 | 10 | 1/3 | .22 | .37 | .38 | 0 | 0 | 0 |
| p=1000, n=200 | 10 | 1/8 | .52 | .99 | .95 | .04 | .29 | .23 |
| p=1000, n=1000 | 20 | 1/3 | .21 | .27 | .27 | 0 | 0 | 0 |
| p=1000, n=1000 | 20 | 1/8 | .31 | .32 | .27 | .19 | .02 | .02 |
| p=1000, n=1000 | 50 | 1/3 | .04 | .03 | .03 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 1/8 | .26 | .09 | .10 | 0 | 0 | 0 |

**(E)**

| Block | $s$ | Bayes err | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=200, n=200 | 10 | 1/3 | .17 | .38 | .39 | 0 | 0 | 0 |
| p=200, n=200 | 10 | 1/8 | .16 | .63 | .81 | 0 | .06 | .09 |
| p=200, n=200 | 30 | 1/3 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=200, n=200 | 30 | 1/8 | .03 | .09 | .17 | 0 | 0 | 0 |
| p=1000, n=200 | 4 | 1/3 | .15 | .20 | .13 | .01 | .01 | .01 |
| p=1000, n=200 | 4 | 1/8 | .39 | .80 | .88 | .02 | .30 | .38 |
| p=1000, n=200 | 10 | 1/3 | .08 | .08 | .07 | 0 | 0 | 0 |
| p=1000, n=200 | 10 | 1/8 | .11 | .37 | .51 | 0 | 0 | .01 |
| p=1000, n=1000 | 20 | 1/3 | .01 | .01 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 20 | 1/8 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 1/3 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 1/8 | 0 | 0 | 0 | 0 | 0 | 0 |

**(F)**

| Block | $s$ | Bayes err | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=660, n=2587 | 4 | 1/3 | .99 | 1 | 1 | .97 | .99 | 1 |
| p=660, n=2587 | 4 | 1/8 | 1 | 1 | 1 | 1 | .99 | 1 |
| p=660, n=2587 | 10 | 1/3 | .73 | 1 | 1 | .15 | .85 | .81 |
| p=660, n=2587 | 10 | 1/8 | .88 | 1 | 1 | .52 | .99 | 1 |
| p=660, n=2587 | 20 | 1/3 | .13 | .80 | .84 | 0 | .07 | .03 |
| p=660, n=2587 | 20 | 1/8 | .26 | 1 | 1 | 0 | .93 | 1 |
| p=660, n=2587 | 50 | 1/3 | 0 | .02 | .04 | 0 | 0 | 0 |
| p=660, n=2587 | 50 | 1/8 | 0 | .10 | .60 | 0 | 0 | 0 |

**(G)**

| Block | $s$ | Bayes err | Lasso 0.1s | SS 0.1s | SS+rand 0.1s | Lasso 0.4s | SS 0.4s | SS+rand 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=4088, n=115 | 4 | 1/3 | .04 | .05 | .07 | 0 | 0 | 0 |
| p=4088, n=115 | 4 | 1/8 | .38 | .60 | .54 | .06 | .20 | .11 |
| p=4088, n=115 | 10 | 1/3 | .03 | .05 | .05 | 0 | 0 | 0 |
| p=4088, n=115 | 10 | 1/8 | .08 | .28 | .25 | 0 | 0 | 0 |

^tbl-ss-fig6-class-cells

> [!example] Classification: where the logistic Lasso beats stability selection
> These are cells where the base method is more than 0.05 above both stability-selection variants:
> - **(A), $n=1000$, $s=20$, Bayes 1/8, $0.4s$:** Lasso about 1.0, SS about 0.49, SS+rand about 0.88.
> - **(A), $n=1000$, $s=50$, Bayes 1/8, $0.4s$:** Lasso about 0.71, SS about 0.12, SS+rand about 0.13.
> - **(B), $n=1000$, $s=20$, Bayes 1/8, $0.4s$:** Lasso 0.18, SS 0.03, SS+rand 0.02.
> - **(D), $p=1000$, $n=1000$, $s=20$, Bayes 1/8, $0.4s$:** 0.19 / 0.02 / 0.02.
> - **(D), $p=1000$, $n=1000$, $s=50$, Bayes 1/8, $0.1s$:** 0.26 / 0.09 / 0.10.
>
> All five are large-$s$, $n=1000$, low-noise cells. The gains elsewhere are large. In (F) at $s=20$, Bayes 1/3, the Lasso is 0.13 against SS 0.80 at $0.1s$, and at $0.4s$ the Lasso is 0 against SS 0.93 (Bayes 1/8). In (E), the randomised cross is again above both bars, e.g. 0.81 against 0.63 and 0.16.
^ex-ss-fig6-class-exceptions

### Fig. 6 - OMP regression (p. 18, bottom two rows)

Same layout as Fig. 5. Columns: OMP / SS (subsampled OMP) / SS+ROMP (randomised OMP, $\alpha=0.9$).

**(A)**

| Block | $s$ | SNR | OMP 0.1s | SS 0.1s | SS+ROMP 0.1s | OMP 0.4s | SS 0.4s | SS+ROMP 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=1000, n=100 | 4 | 0.5 | .90 | .93 | .93 | .52 | .27 | .31 |
| p=1000, n=100 | 4 | 2 | 1 | .99 | 1 | .99 | .98 | 1 |
| p=1000, n=100 | 10 | 0.5 | .33 | .21 | .31 | 0 | 0 | 0 |
| p=1000, n=100 | 10 | 2 | .96 | .96 | .90 | .46 | .13 | .23 |
| p=1000, n=1000 | 20 | 0.5 | 1 | .99 | 1 | .95 | .90 | .97 |
| p=1000, n=1000 | 20 | 2 | 1 | .99 | 1 | 1 | .99 | 1 |
| p=1000, n=1000 | 50 | 0.5 | .88 | .93 | .94 | 0 | 0 | .02 |
| p=1000, n=1000 | 50 | 2 | 1 | .99 | 1 | 1 | .99 | 1 |

**(B)**

| Block | $s$ | SNR | OMP 0.1s | SS 0.1s | SS+ROMP 0.1s | OMP 0.4s | SS 0.4s | SS+ROMP 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=1000, n=200 | 4 | 0.5 | .93 | .99 | 1 | .65 | .63 | .59 |
| p=1000, n=200 | 4 | 2 | 1 | .99 | 1 | .99 | .99 | .97 |
| p=1000, n=200 | 10 | 0.5 | .30 | .45 | .40 | 0 | 0 | .01 |
| p=1000, n=200 | 10 | 2 | .91 | .99 | 1 | .31 | .46 | .40 |
| p=1000, n=1000 | 20 | 0.5 | .72 | .93 | .92 | .04 | .07 | .04 |
| p=1000, n=1000 | 20 | 2 | .98 | .99 | 1 | .91 | .96 | .98 |
| p=1000, n=1000 | 50 | 0.5 | .01 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 2 | .20 | .89 | .84 | 0 | 0 | 0 |

**(C)**

| Block | $s$ | SNR | OMP 0.1s | SS 0.1s | SS+ROMP 0.1s | OMP 0.4s | SS 0.4s | SS+ROMP 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=1000, n=200 | 4 | 0.5 | .14 | .06 | .03 | 0 | 0 | 0 |
| p=1000, n=200 | 4 | 2 | .27 | .28 | .07 | .07 | 0 | 0 |
| p=1000, n=200 | 10 | 0.5 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=200 | 10 | 2 | .01 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 20 | 0.5 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 20 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 0.5 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 2 | 0 | 0 | 0 | 0 | 0 | 0 |

**(D)**

| Block | $s$ | SNR | OMP 0.1s | SS 0.1s | SS+ROMP 0.1s | OMP 0.4s | SS 0.4s | SS+ROMP 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=100, n=200 | 10 | 0.5 | .62 | .81 | .80 | .12 | .07 | .08 |
| p=100, n=200 | 10 | 2 | .76 | 1 | 1 | .57 | .67 | .67 |
| p=100, n=200 | 30 | 0.5 | .12 | .18 | .15 | 0 | 0 | 0 |
| p=100, n=200 | 30 | 2 | .52 | .73 | .72 | .01 | 0 | 0 |
| p=1000, n=200 | 4 | 0.5 | .74 | .76 | .75 | .45 | .40 | .38 |
| p=1000, n=200 | 4 | 2 | .74 | .97 | .98 | .63 | .75 | .72 |
| p=1000, n=200 | 10 | 0.5 | .26 | .36 | .31 | 0 | 0 | 0 |
| p=1000, n=200 | 10 | 2 | .62 | .95 | .90 | .33 | .26 | .31 |
| p=1000, n=1000 | 20 | 0.5 | .50 | .84 | .85 | .06 | .03 | .02 |
| p=1000, n=1000 | 20 | 2 | .71 | .99 | 1 | .61 | .75 | .74 |
| p=1000, n=1000 | 50 | 0.5 | .14 | .18 | .18 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 2 | .42 | .99 | 1 | .08 | .08 | .11 |

**(E)**

| Block | $s$ | SNR | OMP 0.1s | SS 0.1s | SS+ROMP 0.1s | OMP 0.4s | SS 0.4s | SS+ROMP 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=200, n=200 | 10 | 0.5 | .12 | .09 | .14 | 0 | 0 | 0 |
| p=200, n=200 | 10 | 2 | .07 | .55 | .58 | 0 | .03 | .04 |
| p=200, n=200 | 30 | 0.5 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=200, n=200 | 30 | 2 | .04 | .09 | .06 | 0 | 0 | 0 |
| p=1000, n=200 | 4 | 0.5 | .23 | .21 | .20 | .06 | .02 | .02 |
| p=1000, n=200 | 4 | 2 | .53 | .77 | .72 | .19 | .23 | .22 |
| p=1000, n=200 | 10 | 0.5 | .01 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=200 | 10 | 2 | .03 | .19 | .22 | 0 | 0 | .03 |
| p=1000, n=1000 | 20 | 0.5 | 0 | .01 | .06 | 0 | 0 | 0 |
| p=1000, n=1000 | 20 | 2 | 0 | .37 | .66 | 0 | 0 | .01 |
| p=1000, n=1000 | 50 | 0.5 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=1000, n=1000 | 50 | 2 | 0 | .08 | .15 | 0 | 0 | 0 |

**(F)**

| Block | $s$ | SNR | OMP 0.1s | SS 0.1s | SS+ROMP 0.1s | OMP 0.4s | SS 0.4s | SS+ROMP 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=660, n=2587 | 4 | 0.5 | 1 | .99 | 1 | 1 | .99 | 1 |
| p=660, n=2587 | 4 | 2 | 1 | .99 | 1 | 1 | .99 | 1 |
| p=660, n=2587 | 10 | 0.5 | .97 | .99 | 1 | .91 | .89 | .96 |
| p=660, n=2587 | 10 | 2 | 1 | .99 | 1 | 1 | 1 | 1 |
| p=660, n=2587 | 20 | 0.5 | .58 | .96 | .97 | .15 | .14 | .13 |
| p=660, n=2587 | 20 | 2 | .89 | .99 | 1 | .89 | .98 | .99 |
| p=660, n=2587 | 50 | 0.5 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=660, n=2587 | 50 | 2 | .06 | .66 | .67 | 0 | 0 | 0 |

**(G)**

| Block | $s$ | SNR | OMP 0.1s | SS 0.1s | SS+ROMP 0.1s | OMP 0.4s | SS 0.4s | SS+ROMP 0.4s |
|---|---|---|---|---|---|---|---|---|
| p=4088, n=115 | 4 | 0.5 | .30 | 0 | 0 | .02 | 0 | 0 |
| p=4088, n=115 | 4 | 2 | .52 | .30 | .25 | .28 | 0 | .01 |
| p=4088, n=115 | 10 | 0.5 | 0 | 0 | 0 | 0 | 0 | 0 |
| p=4088, n=115 | 10 | 2 | .02 | 0 | 0 | 0 | 0 | 0 |

^tbl-ss-fig6-omp-cells

> [!example] OMP: size of the subsampling and ROMP effects
> - **Gains.**
>   - (B) ($n=1000$, $s=50$, SNR 2), $0.1s$: OMP 0.20 against SS 0.89 and ROMP 0.84.
>   - (D) ($p=1000$, $n=1000$, $s=50$, SNR 2), $0.1s$: 0.42 against 0.99 and 1.
>   - (F) ($s=50$, SNR 2), $0.1s$: 0.06 against 0.66 and 0.67.
>   - (E) ($p=1000$, $n=1000$, $s=20$, SNR 2), $0.1s$: 0 against SS 0.37 and **ROMP 0.66**. This is the clearest cell where added randomisation helps beyond subsampling.
> - **Where ROMP adds little.** In most cells the ROMP cross sits on or just below the grey bar, i.e. within ±0.05. The mild weakness $\alpha=0.9$ changes the greedy path only slightly.
> - **Where OMP beats stability selection.**
>   - (A) ($n=100$, $s=4$, SNR 0.5), $0.4s$: OMP about 0.52 against SS 0.27 and ROMP 0.31.
>   - (A) ($n=100$, $s=10$, SNR 2), $0.4s$: 0.46 against 0.13 and 0.23.
>   - (G) ($s=4$), $0.1s$: OMP 0.30 against 0 (SNR 0.5), and 0.52 against 0.30 and 0.25 (SNR 2).
>   - (G) ($s=4$, SNR 2), $0.4s$: 0.28 against 0 and 0.01.
>   - (C) ($s=4$), $0.1s$ (SNR 0.5): 0.14 against 0.06 and 0.03.
> - **Averages over the 60 cells.** At $0.1s$: OMP 0.43, SS 0.53, ROMP 0.53. At $0.4s$: 0.27, 0.26, 0.27. For OMP the overall advantage of stability selection is much smaller than for the Lasso, and at $0.4s$ it disappears on average.
^ex-ss-fig6-omp-reading

> [!note] Reading against the paper's summary
> The §4 text (p. 20) says that stability selection finds "as many or more correct variables than the underlying method itself in all cases except for scenario (A)". The readings support this for Fig. 5. For Fig. 6 they show exceptions outside (A): classification in (B) and (D), and OMP in (C) and (G). The exceptions are concentrated at $0.4s$ and in the riboflavin design. This is an ingester reading of the plots, not a claim made by the paper.
^note-ss-fig6-vs-text

## Examples

> [!example] Using these tables to set expectations for a driver screen
> Suppose a marketing-mix screen has a design like (E): many candidate drivers loading on a handful of latent factors, such as macro conditions and seasonality. The tables say:
> - Plain Lasso will rarely put even the top 10% of true drivers first without a false one (≤0.39).
> - Subsampling alone helps moderately.
> - Randomised penalties help most.
>
> For a near-orthogonal design like (A), stability selection buys little power. Its value there is the error bound, not the ranking.
^example-ss-using-these-tables-to

## Connections

- The cells where the base method wins (small $n$, OMP, riboflavin) are a reminder that half-sampling costs power. Each fit sees only $n/2$ rows. Compare the sample-size concerns in [[Riley et al 2020 - Sample Size for Prediction Models - Overview]].
- No Monte Carlo standard errors are shown. With 100 repetitions per cell, a proportion near 0.5 has MCSE ≈ 0.05, so differences under about 0.1 between bars are within noise. See [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]].

## See Also
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
- [[Stability Selection Simulation Study - Designs A-G and Results]]
- [[Randomised Orthogonal Matching Pursuit (ROMP) for Stability Selection]]
