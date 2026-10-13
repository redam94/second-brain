---
title: "Strobl 2007 - C-to-U RNA Editing Application"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/random-forests
  - type/application
  - type/example
  - doc/paper
source: "[[raw/Strobl et al 2007 - Bias in Random Forest Variable Importance Measures.md]]"
source_location: "Strobl, Boulesteix, Zeileis & Hothorn (2007), BMC Bioinformatics 8:25 — Results §'Application to C-to-U conversion data' (all paras), Figure 9, Table 5; Conclusion (computation times); Additional file 1 (R code)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2007 - Bias in RF Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2007 - RF Importance Measures and the cforest Alternative]]"
  - "[[Strobl 2007 - Null and Power Case Results]]"
used_by:
  - "[[Strobl 2007 - Conclusions, Scope and Practical Guidance]]"
aliases:
  - Strobl 2007 C-to-U Conversion Data
  - Strobl 2007 Table 5
  - Arabidopsis RNA Editing Random Forest Reanalysis
---

# Strobl 2007 - C-to-U RNA Editing Application

> [!summary]
> Re-analysis of Cummings & Myers' *Arabidopsis thaliana* RNA-editing data: **876** sites, binary response (edited / not edited), **43** predictors — 40 flanking nucleotides (positions −20…20, 4 categories each), codon position (4 categories), and two continuous folding-energy variables. Scaled permutation importances from all four methods broadly agree with the original Gini-based analysis, but `randomForest` produces **more "noise"**; `cforest` separates relevant from irrelevant predictors more sharply. Over **100 random 2:1 learning/test splits**, `cforest` without replacement has the lowest mean misclassification (**0.2788** vs **0.2896** for default `randomForest`; Table 5). The section also gives the paper's advice to **repeat importance computations with several random seeds**.

## Overview

The application is a real mixed-scale problem — many 4-level factors plus two continuous variables — in which the earlier analysis had used Gini importance. It tests whether the simulation findings matter for real data and whether the `cforest` remedy costs predictive accuracy (it does not).

## Main Content

### Data

**Origin of the data.** Cummings and Myers [11] proposed using information from the sequence regions flanking the sites of interest to predict editing in **three species**, *Arabidopsis thaliana*, *Brassica napus* and *Oryza sativa*, with random forests. Strobl et al. re-analyse **only the *Arabidopsis thaliana* data**, which "can be loaded from the journal's homepage" (Application, para. 1).

> [!definition] C-to-U conversion data (Cummings & Myers, ref. [11]) ^def-ctou-data
> RNA editing modifies RNA relative to its DNA template; cytidine-to-uridine (C-to-U) conversion is common in plant mitochondria and its mechanism is largely unknown, though neighbouring nucleotides are thought to matter. For each of **876** observations:
> - **Response:** whether the site of interest is edited (binary).
> - **Predictors (43):**
>   - the 40 nucleotides at positions −20 to 20 relative to the edited site (4 categories each; the site itself excluded),
>   - the codon position (`cp`, 4 categories),
>   - the estimated folding energy (`fe`, continuous),
>   - the difference in estimated folding energy between pre-edited and edited sequences (`dfe`, continuous).
>
> (The Conclusion's computation-time paragraph refers to "44 predictor variables"; the Application section and Fig. 9 enumerate 43. The discrepancy is in the source.)

### Variable importance (Figure 9)

> [!example] Figure 9 — Scaled permutation importance for the C-to-U data ^fig-9
> **Layout.** 2×2 bar charts: top row `randomForest`, bottom `cforest`; left column bootstrap with replacement, right column subsampling without replacement. Bars for positions −20…20, then `cp`, `fe`, `dfe`.
>
> **Findings.** The (scaled) importances "largely reflect the results of [11] based on the Gini importance measure", but differ slightly across the four methods. `randomForest` "seems to produce more 'noise'" than `cforest`: "the contrast of amplitudes between irrelevant and relevant predictors is more pronounced when the cforest function is used."
>
> **Why the agreement is plausible.** 41 of 43 predictors share the same cardinality (4 levels), which by the paper's own scope argument is the case where cardinality bias is limited; the remaining risk is concentrated in the two continuous variables.

> [!note] Repeat permutation importance over seeds ^note-repeat-seeds
> Permutation importance for a variable "can vary between two computations, because each computation is based on a different random permutation of the variable." Therefore (verbatim): "before interpreting random forest permutation importance values, the analysis should be repeated (with several different random seeds) to test the stability of the results."

### Prediction accuracy (Table 5)

> [!algorithm] Split-sample validation protocol (Application section) ^alg-split-sample
> 1. Randomly split the 876 observations into learning and test sets with size ratio **2:1**.
> 2. Grow each of the four forests on the learning set.
> 3. Predict the test set and record the misclassification rate.
> 4. Repeat steps 1-3 **100 times**; report the mean misclassification rate and its standard error.

> [!theorem] Table 5 — Mean misclassification rates, C-to-U data (SE in parentheses) ^tab-5
>
> | Method | Replacement | Mean misclassification |
> |---|---|---|
> | randomForest | true | 0.2896 (0.0022) |
> | randomForest | false | 0.2879 (0.0026) |
> | cforest | true | 0.2807 (0.0024) |
> | cforest | false | **0.2788** (0.0025) |
>
> "Again we find a slight superiority of the cforest function, especially when sampling is conducted without replacement." Differences from the accuracies reported by Cummings & Myers are attributed to their different, unreported validation scheme.

> [!example] Example: is the Table 5 gain meaningful? ^ex-tab5-significance
> Difference default `randomForest` − `cforest` without replacement: $0.2896-0.2788=0.0108$. Treating the two means as independent, $se\approx\sqrt{0.0022^2+0.0025^2}=0.0033$, so $z\approx3.2$. In fact the methods share the same 100 splits, so a paired comparison would likely be tighter (positively correlated errors), but the paper reports only unpaired SEs. A one-percentage-point gain (about 3.7% relative error reduction) is modest — consistent with the paper's "slight superiority" — and comes *with* better-behaved importances, so there is no accuracy trade-off. (Calculation is a vault addition.)

### Computation time (Conclusion)

For this data set (supplementary file): `cforest` with bootstrap ~**8.38 s**, `cforest` with subsampling ~**4.82 s**; `randomForest` ~**0.24 s** with and **0.18 s** without replacement. `cforest` is slower because "split decisions and stopping rely on time-consuming conditional inference"; subsampling is cheaper because each tree sees fewer observations.

## Examples

> [!example] Example: the same audit on a marketing data set ^ex-marketing-audit
> A customer-level response model mixes dozens of same-cardinality one-hot or 4-level survey items with two continuous variables (tenure, spend). As in the C-to-U data, the bias risk sits mostly with the continuous variables and with any item whose category count differs. Running both forest types and both resampling schemes, plotting all four importance profiles side by side (as in Fig. 9), and repeating with several seeds shows which conclusions are robust to the method — a form of [[Cross Validation Checking]] applied to explanations.

## Connections

- Reporting importances across several defensible pipelines is a multiverse-style robustness check: [[Garden of Forking Paths]], [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
- Repeated split-sample validation is a simple form of resampling-based model assessment: [[Model Selection and Overfitting]], [[Cross Validation Checking]].

## See Also
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]
- [[Strobl 2007 - Null and Power Case Results]] — simulated counterpart of Table 5 (Table 4)
- [[Strobl 2007 - Conclusions, Scope and Practical Guidance]]
