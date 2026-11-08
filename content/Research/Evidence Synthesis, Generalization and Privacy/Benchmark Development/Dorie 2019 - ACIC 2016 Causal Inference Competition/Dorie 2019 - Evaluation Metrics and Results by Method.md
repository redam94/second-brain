---
title: "Dorie 2019 - Evaluation Metrics and Results by Method"
tags:
  - source/ingested
  - topic/benchmarks
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Dorie 2019 - Automated versus Do-It-Yourself Methods for Causal Inference.pdf]]"
source_location: "Sec. 6 (pp. 18-22), Figs. 1-3; Appendix A.3, Figs. 4-5 (pp. 34-35)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dorie 2019 - ACIC 2016 Causal Inference Competition"
doc_type: paper
depends_on:
  - "[[Dorie 2019 - Submitted Methods and Taxonomy]]"
used_by:
  - "[[Dorie 2019 - Predicting Performance and Variance Decomposition]]"
  - "[[Dorie 2019 - Discussion, Lessons and Marketing Measurement Relevance]]"
aliases:
  - ACIC 2016 results
  - ACIC RMSE bias coverage results
  - PEHE results ACIC
---

# Dorie 2019 - Evaluation Metrics and Results by Method

> [!summary]
> Performance was judged by RMSE and bias for the SATT, interval coverage and length, PEHE for individual effects, and computation time. On the 20 DIY data sets the two DR w/GBM+MDIA submissions had the best bias and RMSE; across 7,700 black-box data sets BART, SL+TMLE, calCause and h2o stood out, most methods had absolute bias and RMSE at or below about 0.05 SD, but original submissions covered poorly and several simple augmentations (TMLE, propensity-score covariates, symmetric intervals) repaired coverage.

## Overview

All DIY and black-box submissions were run on the 20 DIY data sets; black-box and post-competition methods were also run on all 7,700 black-box data sets. Figures 1-5 are plots; this note records the numbers and orderings the text states. Exact plotted values for bias, RMSE and coverage per method are not tabulated in the paper, so none are invented here.

## Main Content

### Metrics (Sec. 6)

> [!definition] Performance measures
> Let $\hat\tau_r$ be a method's estimate and $\tau_r=\text{SATT}_r$ the estimand for data set $r$, $r=1,\dots,R$.
> - **Bias:** $\frac1R\sum_r(\hat\tau_r-\tau_r)$, with the interquartile range of biases across the 77 settings x 100 replications shown for black-box methods.
> - **RMSE:** $\sqrt{\frac1R\sum_r(\hat\tau_r-\tau_r)^2}$.
> - **Coverage:** percentage of data sets in which the reported interval covers the true SATT (nominal 95%); **average interval length** reported alongside because of the coverage/length trade-off.
> - **PEHE** (Precision in Estimation of Heterogeneous Effects; Hill 2011): within a data set, the root-mean-squared distance between estimated individual treatment effects and true individual differences in potential outcomes, $\sqrt{\frac1n\sum_i\{\hat\tau(x_i)-(Y_i(1)-Y_i(0))\}^2}$; averaged across data sets. Only methods that output individual-level effects have it.
> - **Computation time:** system time of the spawned process (black box only). Median time within each setting, then arithmetic mean across settings.
> - **Oracle** benchmark: using the true conditional average treatment effect on the treated as the estimate.
^def-acic-metrics

Because the DIY competition had only 20 data sets, coverage and PEHE would be "too imprecise to be useful" and are in the appendix (A.3).

### 6.1 DIY data sets (Fig. 1)

The authors are "reluctant to draw strong conclusions" from 20 data sets. Based on bias and RMSE, strongest across all methods: the two **DR w/GBM+MDIA** submissions; next the top black-box performers. The DIY methods that rank next best all rely on flexible fitting of the assignment mechanism, the response surface, or both.

### 6.2 Black-box data sets (Figs. 2-3)

> [!theorem] Empirical findings (Sec. 6.2, stated in the paper)
> 1. **Bias and RMSE.** Among original submissions four stand out: BART, SL+TMLE, calCause, h2o. The next group: Tree Strat, BalanceBoost, Adjusted Tree Strat, LASSO+CBPS. Most methods had absolute bias and RMSE at or below about $0.05$ SD of the outcome, "very low relative to traditional measures of effect sizes" (Cohen 1962). Post-deadline methods performed particularly well, except SL+TMLE Joint, which likely failed because many library methods could not fit non-parallel response surfaces and so could not estimate heterogeneous effects.
> 2. **Negative average bias for every method:** because the treatment effect distribution has positive mean and most methods shrink toward zero.
> 3. **Adding BART** to SL+TMLE improved it but did not beat standalone BART. Three BART augmentations helped slightly (BART+TMLE, BART MChains, BART Xval); BART IPTW did not.
> 4. **Coverage and length (Fig. 3).** All originally submitted methods were somewhat disappointing. The last nine methods had coverage below 75%. CBPS and h2o Ensemble had average interval lengths of 0.78 and 6.1.
> 5. **Coverage repairs.** BART: about 82% average coverage; BART+TMLE: nearly nominal at about a 50% increase in interval length (still slightly shorter than the other top performers). BART on PScore: a little over 90% with no increase in length. MBART SymInt: similar increase with small length increase. SL+TMLE with BART in the library: coverage from about 83% to about 92% with no noticeable length increase.
> 6. **PEHE.** Only a subset of methods output individual effects; BART methods and calCause were noticeably better than the others (the two other contenders were simple linear models).
> 7. **Computation.** h2o: 24.8 seconds; BART: 29.4 seconds (h2o often failed and needed restarts and offloads work to background processes, so its time is unreliable). Methods using cross-validation, including all Super Learner submissions, took substantially longer, many 10 to 15 minutes; three were noticeably more expensive: calCause (27.7 min), SuperLearner (46.9 min), SL+TMLE Joint (46.8 min). Run times are rough because the cluster was shared.
^thm-acic-results

### Appendix A.3: DIY coverage, interval length and PEHE (Figs. 4-5)

Fig. 4 plots coverage (ordered by decreasing coverage) and average interval length for all DIY and original black-box methods on the 20 DIY data sets; points outside the plotting region (very poor coverage or very large intervals) are drawn at the edge. Fig. 5 plots PEHE for the methods that supplied individual-level effects; the methods labelled on the axis are Weighted GP, BART, calCause, MHE Algorithm, Linear Model and Regression Trees. The paper gives no tabulated values for these two figures and draws no conclusion from them beyond the main-text caution about 20 data sets.

### Summary by method family

| Family | Methods | Pattern in results |
|---|---|---|
| Flexible response surface only | BART and variants, calCause, Weighted GP | Top bias/RMSE; coverage mediocre until adjusted |
| Ensembles with assignment + response | SL+TMLE, h2o | Top bias/RMSE; SL+TMLE 83% coverage (92% with BART) |
| Flexible assignment only | Tree Strat, Adj. Tree Strat, BalanceBoost | Second tier |
| Linear and standard econometric | Linear Model, MHE Algorithm, `teffects` | Toward the high-RMSE end of the method ordering in Fig. 2 and the low-coverage end of Fig. 3 (as read from the plots; the paper states only that the last nine methods in the coverage ordering were below 75%) |
| DIY best | DR w/GBM+MDIA 1 and 2 | Best on the 20 DIY data sets |

(Family column is the note author's grouping of the paper's descriptions.)

## Examples

> [!example] Choosing among BART variants using the reported results
> **Goal.** An analyst wants SATT estimates with honest 95% intervals.
> **Reading.** Plain BART: excellent bias and RMSE but about 82% coverage. BART+TMLE: nearly nominal coverage with intervals about 50% longer (still shorter than other top methods). BART on PScore: coverage a little over 90% at the same length. The choice is a trade-off between nominal coverage and precision.
> **Interpretation.** The paper offers no general rule for optimising coverage ("we don't feel like we have strong advice"), so verify coverage in a simulation that resembles the target problem ([[Dorie 2019 - Toy ACIC-Style Simulation in Python]]).
^ex-bart-variant-choice

## Connections

- Metric choice and report-everything practice vs the single-score problem: [[Dehghani 2021 - Score and Rank Aggregation and Human Evaluation Bias]].
- Contrast with benchmark lottery findings: ACIC finds little method-by-setting interaction ([[Dorie 2019 - Predicting Performance and Variance Decomposition]]), so the winner is stable, unlike SuperGLUE and VTAB ([[Dehghani 2021 - Task Selection Bias Case Studies]]).
- Bayesian nonparametric outcome models for causal effects: [[Nonparametric Causal Inference]].

## See Also

- [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]]
- [[Dorie 2019 - Predicting Performance and Variance Decomposition]]
