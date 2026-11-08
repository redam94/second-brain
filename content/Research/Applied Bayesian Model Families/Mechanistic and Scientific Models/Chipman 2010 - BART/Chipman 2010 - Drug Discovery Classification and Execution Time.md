---
title: "Chipman 2010 - Drug Discovery Classification and Execution Time"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/bart
  - type/example
  - doc/paper
source: "[[raw/Chipman 2010 - BART Bayesian Additive Regression Trees.pdf]]"
source_location: "Sec. 5.3 and 6, pp. 290-296; Table 5; Figs. 9-12"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Chipman 2010 - BART"
doc_type: paper
depends_on:
  - "[[Chipman 2010 - Probit BART for Classification]]"
used_by:
  - "[[Chipman 2010 - Extensions, Discussion and Practical Use]]"
aliases:
  - BART drug discovery example
  - BART computational cost
---

# Chipman 2010 - Drug Discovery Classification and Execution Time

> [!summary]
> BART probit is applied to a rare-event screening task (542 actives among 29,374 compounds, $p=266$): the top-20 predicted compounds have an 80% hit rate against a 1.85% base rate, AUC is competitive with the best learners, and shrinking $m$ picks out three dominant predictors. Timing experiments show runtime roughly linear in $n$ for short runs (quadratic for long adaptive runs) and nearly independent of $p$.

## Overview

This is the only real-data illustration of the classification extension ([[Chipman 2010 - Probit BART for Classification]]) and the only computing-cost study in the paper.

## Main Content

### 5.3 Drug discovery

**Data.** $p=266$ topological molecular descriptors, $n=29{,}374$ compounds, 542 active (National Cancer Institute data, Feng et al. 2003). Activity $Y=1$ if the compound is active.

**Top-k ranking experiment.** Random split into train and test, each of 14,687 compounds with 271 actives. BART probit with $m=50$, $k=2$ (the $\nu,q$ are meaningless in probit); four independent chains of 250,000 iterations gave essentially identical results. The 20 largest $\hat P[Y=1\mid x]$ in each set were examined with 90% posterior intervals: true positive rate $16/20=80\%$ in both train and test (4 inactives each), versus the base rate $271/14{,}687=1.85\%$. Average interval width is 0.47 (train) vs 0.50 (test).

**AUC comparison (Table 5).** Setup: 271 actives in each of train and test, with the remaining inactives allocated so that train has 1000 compounds and test 28,374; 20 replicates; BART-default $m=200,k=2$ and BART-cv ($k\in\{0.25,0.5,1,2,3\}$, $m\in\{100,200,400,800\}$, 5-fold CV), 10,000 iterations; competitors tuned by 5-fold CV (nnet with skip layer and 0-2 hidden units; random forests with 2% variable sampling added; SVM with $C=2^a,a=-6..0$ and $\gamma=2^b,b=-7..-4$).

| Method | AUC (mean of 20) |
|---|---|
| Random forests | 0.7680 |
| Boosting | 0.7543 |
| BART-cv | 0.7483 |
| Support vector machine | 0.7417 |
| BART (default) | 0.7245 |
| Neural network | 0.7205 |

Standard error of an AUC mean is 0.0040 (ANOVA with replicate block effect). Differences between the three groupings (RF/boosting; BART-cv/SVM; BART default/nnet) are statistically significant but "the practical differences are not appreciable". AUC is the probability that a random positive is ranked above a random negative.

**Variable selection.** All 542 actives plus 542 sampled inactives, four chains of 1,000,000 iterations, probit with $k=2$ and $m=5,10,20$ trees: the same three variables are selected for every $m$; with $1/266\approx0.004$ as the uniform-use baseline, usage of 0.05-0.10 is far above chance. Use is most concentrated at $m=5$.

### 6 Execution time

| Experiment | Finding |
|---|---|
| Time vs $n$ (fix $p=50$, $n=100..10{,}000$), short run (0 burn-in, 2 draws, $m=200$) | Linear in $n$ (residuals and likelihood scan all observations in a node). |
| Same, default run (100 burn-in, 1000 draws, $m=200$) | Quadratic in $n$: adaptive BART grows larger trees at larger $n$. With $m=50$: $n=100$ gave trees of up to 4 leaves, mean 2.52; $n=10{,}000$ gave up to 10 leaves, mean 3.34. |
| Time vs $p$ ($p=10..100$) | Close to independent of $p$, though harder signals may need longer burn-in. |
| Versus RF, gbm, nnet (fixed "typical" tuning; BART minimal: ~1 burn-in, 10 draws, $m=50$) | Same scaling in $n$; minimal BART fastest, default BART slowest; the minimal fit was virtually indistinguishable from the default on Friedman ($n=100,p=10$). |

**Interpretation.** Per-fit cost is comparable to competitors, and since defaults skip cross-validation, end-to-end cost is lower than CV-tuned alternatives (121 fits for BART-cv in the bake-off).

## Examples

**Why an 80% top-20 hit rate matters (lift).** Lift at the top 20 is $0.80/0.0185\approx43\times$. A one-line check:
```python
base = 271/14687; top20 = 16/20
print(round(top20/base, 1))   # ~43.2 lift over random selection
```
Marketing analogue: scoring a very large customer list for rare conversion; the posterior interval width tells you how much of the top-of-list ranking is estimation noise (average 0.47-0.50 here).

## Connections

- Rare-event ranking and AUC vs calibration trade-offs: [[Conformal Prediction - Overview]] for distribution-free coverage if you need guarantees BART intervals do not provide.
- Scaling concerns for large $n$ with tree ensembles: [[Efficient MCMC]].

## See Also

[[Chipman 2010 - BART - Overview]], [[Chipman 2010 - Predictive Bake-Off and Friedman Simulations]].
