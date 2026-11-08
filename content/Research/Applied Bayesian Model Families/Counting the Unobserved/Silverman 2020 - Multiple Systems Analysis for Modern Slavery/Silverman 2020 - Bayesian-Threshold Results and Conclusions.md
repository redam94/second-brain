---
title: "Silverman 2020 - Bayesian-Threshold Results and Conclusions"
tags:
  - source/ingested
  - topic/population-estimation
  - type/example
  - doc/paper
source: "[[raw/Silverman 2020 - Multiple Systems Analysis for the Quantification of Modern Slavery.pdf]]"
source_location: "Sec. 6.3, 6.4, 7; Tables 9-15"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Silverman 2020 - Multiple Systems Analysis for Modern Slavery"
doc_type: paper
depends_on:
  - "[[Silverman 2020 - Bayesian-Threshold Method]]"
  - "[[Silverman 2020 - Frequentist Model Selection Results]]"
used_by:
  - "[[Concept - Unseen Species and Latent Class Links]]"
aliases:
  - Bayesian threshold MSE results
  - Silverman conclusions on MSE
---

# Silverman 2020 - Bayesian-Threshold Results and Conclusions

> [!summary]
> Across priors (uniform, variance 10, 1, 0.1) and thresholds (0, 2, 5) the method gives stable answers once any thresholding is applied: UK about 12.2-12.3k (thousands of victims; 80% interval about 11.5-13.5k), Netherlands 47-73k depending on setting, New Orleans about 1.1k (main effects), Kosovo about 14.0-14.4k. Without thresholding, intervals widen sharply. Conclusion: variance 1, threshold 2 is a reasonable default, but MSE is not a panacea.

## Overview

Quantiles are of the posterior of the **total** population (observed plus dark figure), in thousands.

## Main Content

**Table 9 (UK six lists).**

| Prior | Threshold | 2.5% | 10% | 50% | 90% | 97.5% |
|---|---|---|---|---|---|---|
| Main effects only | | 11.0 | 11.4 | 12.2 | 13.1 | 13.6 |
| Uniform | 0 | 6.2 | 7.5 | 10.9 | 15.3 | 18.4 |
| Variance 10 | 0 | 7.0 | 8.5 | 10.3 | 15.4 | 20.4 |
| Variance 1 | 0 | 8.5 | 9.3 | 13.0 | 15.5 | 17.1 |
| Variance 0.1 | 0 | 10.2 | 10.3 | 11.9 | 13.5 | 14.3 |
| Uniform | 2 | 10.7 | 11.2 | 12.2 | 13.6 | 14.4 |
| Variance 10 | 2 | 10.9 | 11.4 | 12.3 | 13.5 | 14.3 |
| Variance 1 | 2 | 10.9 | 11.3 | 12.3 | 13.6 | 14.4 |
| Variance 0.1 | 2 | 10.8 | 11.2 | 12.0 | 13.0 | 13.3 |
| Uniform | 5 | 10.9 | 11.2 | 12.1 | 13.0 | 13.6 |
| Variance 10 | 5 | 11.1 | 11.5 | 12.3 | 13.1 | 13.8 |
| Variance 1 | 5 | 11.4 | 11.9 | 12.7 | 13.8 | 14.2 |
| Variance 0.1 | 5 | 11.1 | 11.5 | 12.3 | 13.1 | 13.8 |

Without thresholding (threshold 0) "the posterior credible intervals are much larger, but the central estimate is similar". Threshold 2 suggests about 12.3k, 80% interval about 11.5-13.5k, 95% about 11-14k, roughly a thousand above the fixed-model interval, plausibly because model averaging acknowledges the second model group (BIC cloud). Uniform prior is fastest; variance 1 gives much the same.

**Table 10 (UK five lists) selected rows.** Main effects 12.0 / 12.5 / 13.5 / 14.6 / 15.3; variance 1, threshold 0: 9.4 / 10.8 / 13.8 / 19.1 / 23.0; variance 1, threshold 2: 11.7 / 12.1 / 13.2 / 14.3 / 15.1; variance 1, threshold 5: 12.6 / 13.1 / 14.1 / 15.3 / 16.0.

**Table 11 (UK four lists, GP omitted) selected rows.** Main effects 9.5 / 9.9 / 10.7 / 11.6 / 12.1; variance 1, threshold 2: 10.4 / 10.9 / 11.8 / 12.9 / 13.7; variance 1, threshold 5: identical to main effects (9.5 / 9.9 / 10.7 / 11.6 / 12.1).

**Table 12 (Netherlands six lists).**

| Prior | Threshold | 2.5% | 10% | 50% | 90% | 97.5% |
|---|---|---|---|---|---|---|
| Main effects only | | 48.7 | 49.9 | 52.6 | 55.9 | 57.9 |
| Uniform | 0 | 31.0 | 36.0 | 50.9 | 65.3 | 72.4 |
| Variance 1 | 0 | 46.5 | 52.0 | 69.3 | 74.5 | 81.5 |
| Uniform | 2 | 42.4 | 44.4 | 47.6 | 52.2 | 54.7 |
| Variance 1 | 2 | 60.6 | 64.0 | 73.0 | 85.6 | 93.0 |
| Variance 0.1 | 2 | 56.9 | 59.2 | 66.2 | 74.1 | 78.7 |
| Uniform | 5 | 51.3 | 52.9 | 56.1 | 59.1 | 60.9 |
| Variance 1 | 5 | 54.6 | 56.2 | 59.4 | 62.9 | 65.2 |

The variance 1, threshold 2 case is the exception (5 of 15 interactions thresholded out only). On the five-list version results are slightly lower for thresholds 0 and 2, slightly higher for threshold 5; variance 1 threshold 2 is about 70% of the six-list result. Reducing the threshold to 4.5 gives results similar to threshold 2.

**Table 13 (New Orleans, five lists).** Main effects 0.7 / 0.8 / 1.1 / 1.5 / 1.9; uniform, threshold 0: 0.4 / 0.8 / 4.1 / 17.4 / 38.7; variance 1, threshold 2: 0.7 / 0.8 / 1.1 / 1.5 / 1.9 (identical to main effects, all interactions thresholded out); **uniform, threshold 2 or 5:** 0.6 / 0.6 / 0.8 / 1.2 / 1.3, different because three of ten interactions are exactly $-\infty$ and remain in the fit.

**Table 14 (Kosovo).** Main effects 7.2 / 7.2 / 7.4 / 7.6 / 7.7; interaction models (uniform or variance 10 or 1) give medians 14.0-14.4 at any threshold; variance 0.1: median 12.1. Thresholding has "little or no effect, even at a threshold of 5" because the interactions are strong.

**Table 15 (interactions surviving variance 1, threshold 2).**

| Data | Interactions |
|---|---|
| UK six lists | LA:NG, LA:PF, NG:GP, PF:GP, PF:NCA, GO:GP |
| UK five lists | LA:NG, LA:PFNCA, NG:GP, PFNCA:GP |
| Netherlands (10 of 15) | I:K, I:Z, K:O, K:P, K:R, K:Z, O:P, O:Z, P:R, P:Z |
| New Orleans | none at either threshold |

At threshold 5 the method picks out only LA:NG for the UK data and O:Z for the Netherlands (same after merging); for Kosovo all but one interaction survive.

> [!theorem] Conclusions (Sec. 7, paraphrased)
> 1. Ignoring interactions is the most stable approach but is inadequate for Kosovo and ignores plausible dependence in slavery data.
> 2. Bayesian/threshold with prior variance 1 and $\tau=2$ is a candidate standard: stable when small lists are combined; removes implausible secondary estimates; adapts between Kosovo-like (strong dependence) and New Orleans-like (none) data. A higher threshold is useful for pinpointing where dependence is clear.
> 3. Modern-slavery data are sparse, with many non-overlapping lists and small populations; methods must handle that. Ecological MSE can be designed for independence and large captures; human-rights contexts cannot.
> 4. "Multiple systems estimation is not a panacea, but part of the quest for better information and understanding."
> Open questions: covariates and segmentation; comparing two time points or regions; fuzzy matching of cases across lists.
^thm-silverman-conclusions

## Examples

> [!example] Reading the UK posterior as a decision input
> The headline 10,000-13,000 came from a model-conditional interval. The Bayesian/threshold analysis gives a posterior median near 12.3k with 95% interval about 11-14k, so the original figure was reasonable but its upper end was optimistic about model uncertainty. Reporting a model-averaged interval is the Bayesian analogue of widening a forecast for specification risk.

## Connections

- Sparse-list regularisation vs plain horseshoe is explored in PyMC E109: [[Horseshoe and Regularized Horseshoe Priors]].
- Relation to ecological abundance problems: [[Concept - Closed-Population Capture-Recapture and Otis Models]].

## See Also

- [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]
- [[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]]
