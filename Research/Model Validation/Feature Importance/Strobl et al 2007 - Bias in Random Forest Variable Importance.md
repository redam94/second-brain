---
title: "Strobl et al 2007 - Bias in Random Forest Variable Importance"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/random-forests
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "BMC Bioinformatics 8, 25 (2007); §Conclusion"
citation: "Strobl, C., Boulesteix, A.-L., Zeileis, A. & Hothorn, T. (2007). Bias in random forest variable importance measures: Illustrations, sources and a solution. BMC Bioinformatics, 8, 25."
date_ingested: 2026-10-13
folder: "Model Validation/Feature Importance"
doc_type: paper
depends_on:
  - "[[Breiman 2001 - Statistical Modeling The Two Cultures]]"
used_by:
  - "[[Strobl et al 2008 - Conditional Variable Importance]]"
  - "[[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]]"
  - "[[Fisher et al 2019 - Model Class Reliance]]"
aliases:
  - "Strobl 2007"
  - "Bias in random forest variable importance measures"
  - "Gini importance bias"
---

# Strobl et al 2007 - Bias in Random Forest Variable Importance

> [!summary]
> Strobl, Boulesteix, Zeileis & Hothorn show that the standard random-forest importance measures are **biased in favour of predictors with many possible split points** (continuous variables, categorical variables with many levels), so an uninformative variable can rank above an informative one purely because of its measurement scale. For model validation, this means a raw tree-ensemble importance ranking is not evidence of relevance unless the predictor types are comparable or an unbiased procedure is used.

## Overview

*Strobl, C., Boulesteix, A.-L., Zeileis, A. & Hothorn, T. (2007). BMC Bioinformatics 8, 25.*

Random forests (Breiman 2001) are popular in high-dimensional applied work partly because they report "variable importance" scores that are used to screen and rank predictors. The paper asks whether these scores are trustworthy when predictors differ in their scale of measurement or number of categories — the usual situation in real data, which mix binary flags, multi-level categoricals and continuous measurements.

## Main Content

### The two importance measures

> [!definition] Gini importance and permutation importance
> For a forest of $T$ trees:
> - **Gini (mean decrease in impurity) importance** of $X_j$ sums, over every node $\nu$ that splits on $X_j$, the weighted impurity decrease, averaged over trees:
> $$\mathrm{VI}^{\text{Gini}}_j = \frac{1}{T}\sum_{t=1}^{T}\ \sum_{\nu \in t:\ \text{split on } X_j} p(\nu)\,\Delta i(\nu).$$
> - **Permutation (mean decrease in accuracy) importance** compares each tree's out-of-bag (OOB) error before and after randomly permuting $X_j$ in the OOB sample:
> $$\mathrm{VI}^{\text{perm}}_j = \frac{1}{T}\sum_{t=1}^{T}\Big(\mathrm{err}^{\text{OOB}}_t\big(\tilde{X}_j\big) - \mathrm{err}^{\text{OOB}}_t\Big).$$
^def-rf-importance

### Sources of bias

1. **Split-selection bias in the trees.** Exhaustive search over cut-points (CART-style, Gini criterion) gives a variable with more candidate cut-points more chances to produce a large impurity decrease *by chance*. Variables with many categories or continuous values are therefore selected more often, even when uninformative, and accumulate Gini importance. This is a multiple-comparisons effect inside each split.
2. **Bootstrap sampling with replacement.** Even with an unbiased split criterion, drawing bootstrap samples *with replacement* induces a preference for variables with many categories, which also leaks into the permutation importance.

### Simulation evidence

The authors simulate predictors with different numbers of categories (a continuous variable and categorical variables with increasing numbers of levels) and a response that is either independent of all predictors (null case) or depends on a single low-cardinality predictor (power case). In the null case, Gini importance and selection frequencies are clearly higher for high-cardinality predictors; in the power case the truly informative variable can be outranked by uninformative many-level ones. Permutation importance is less biased in mean but its **variance** grows with the number of categories, so single-run rankings remain unreliable.

### The proposed solution

> [!definition] Unbiased forest construction
> Build the forest from **conditional inference trees** (Hothorn, Hornik & Zeileis 2006), whose splits are chosen by permutation-test $p$-values (removing the cut-point multiplicity bias), and draw learning samples by **subsampling without replacement** instead of bootstrapping. Use **permutation importance** rather than Gini importance. Implemented as `cforest` in the R package `party`.
^def-unbiased-cforest

They illustrate the difference on a bioinformatics application (predicting RNA editing sites from amino-acid properties), where standard and unbiased forests produce visibly different rankings.

### Scope of the finding

The bias concerns predictors of *different types*. When all predictors are continuous (comparable numbers of split points), the paper notes that selection via importance is unaffected by these particular findings. That does not protect against the separate problem of **correlated** predictors, addressed in [[Strobl et al 2008 - Conditional Variable Importance]].

## Key Passages

> "variable selection with random forest variable importance measures is not affected by our findings" — Strobl et al. (2007), §Conclusion (scope: when only continuous predictors are used)

## Implications for Model Validation

- A tree-ensemble importance ranking that mixes binary flags, categorical encodings and continuous drivers should not be read at face value; a variable can rank high because it has many split points.
- Prefer permutation-based importance over impurity (Gini/"gain") importance when the ranking is reported downstream; tree-boosting "gain" importance inherits the same cut-point multiplicity problem.
- Report the variability of importance across seeds/resamples, not a single run — permutation importance variance depends on predictor cardinality.
- Even an unbiased marginal measure still credits proxies of influential variables; validation should go on to conditional or model-class methods ([[Strobl et al 2008 - Conditional Variable Importance]], [[Fisher et al 2019 - Model Class Reliance]]).

## Connections

- The random forest itself and its importance scores come from [[Breiman 2001 - Statistical Modeling The Two Cultures]], which also notes the instability of variable-importance conclusions.
- The split-selection bias is a within-tree analogue of [[Multiple Testing Corrections]] and the [[Garden of Forking Paths]]: searching many cut-points inflates the best apparent improvement.
- Follow-up on correlated predictors: [[Strobl et al 2008 - Conditional Variable Importance]]; general critique of permutation: [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]].

## See Also

- [[Strobl et al 2008 - Conditional Variable Importance]] — same group's fix for correlated predictors
- [[Hooker et al 2021 - Unrestricted Permutation Forces Extrapolation]] — why permute-and-predict misleads under dependence
- [[Meinshausen and Buhlmann 2010 - Stability Selection]] — resampling-based stability of selected variables
- [[Fisher et al 2019 - Model Class Reliance]] — importance across all good models rather than one fitted forest
- [[Researcher Degrees of Freedom]] — selection among many options as a source of spurious signal
