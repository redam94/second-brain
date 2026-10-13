---
title: "Strobl 2007 - Bootstrap-Induced Association"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/random-forests
  - topic/resampling
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Strobl et al 2007 - Bias in Random Forest Variable Importance Measures.md]]"
source_location: "Strobl, Boulesteix, Zeileis & Hothorn (2007), BMC Bioinformatics 8:25 — end of §'Variable selection bias in the individual classification trees' (paras on residual cforest bias); §'Effects induced by bootstrapping' (all paras), Figure 11"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2007 - Bias in RF Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2007 - Split-Selection Bias in CART Trees]]"
  - "[[Strobl 2007 - RF Importance Measures and the cforest Alternative]]"
  - "[[Permutation Tests and Exact Inference]]"
used_by:
  - "[[Strobl 2007 - Conclusions, Scope and Practical Guidance]]"
aliases:
  - Bootstrap-Induced Spurious Association
  - Effects Induced by Bootstrapping
  - Strobl 2007 Figure 11
  - Bootstrap p-value Shift Under the Null
---

# Strobl 2007 - Bootstrap-Induced Association

> [!summary]
> **Source 2 of the importance bias.** Even with unbiased trees (`cforest`), forests grown on **bootstrap samples drawn with replacement** still favour many-category variables. The paper's explanation, via a simple $\chi^2$ experiment (Fig. 11): under independence, $p$-values computed on the original sample are uniform, but recomputed on a bootstrap sample they **shift toward zero** — "the bootstrap sampling artificially induces an association". Duplicating and omitting observations perturbs contingency-table cell counts, and **smaller cells (more categories) are perturbed more**. The effect **does not vanish as $n$ grows** (bootstrap size grows with $n$), but **disappears with subsampling without replacement**. Hence the prescription: unbiased trees *and* sampling without replacement.

## Overview

The clue (§"Variable selection bias...", closing paras): split-selection bias is stronger in `randomForest`, but `cforest` + bootstrap *still* shows cardinality-dependent selection frequencies (Fig. 1, bottom-left) and permutation-importance variance (Figs 3-4, bottom-left). "Thus, there must be another source of bias, besides the variable selection bias in the individual trees". Comparing left and right columns of Figs 1 and 5 locates it in the resampling scheme. Rather than analyse the full forest, the authors use "a much simpler independence test for the explanation".

## Main Content

> [!example] Figure 11 — Effects induced by bootstrapping ^fig-11
> **Setup.** Null design, categorical predictors $X_2,\dots,X_5$ only (2, 4, 10, 20 levels), binary $Y$, 1000 simulated data sets. In each run, a $\chi^2$ test of independence between each $X_j$ and $Y$ is computed (a) on the original sample, (b) on one bootstrap sample drawn with replacement from it.
>
> **Result.** (a) Left plots: boxplots of $p$-values "range from 0 to 1 with median 0.5 as expected", i.e. uniform. (b) Right plots: the distribution of $p$-values "is shifted towards zero".
>
> **Caption (paraphrased).** Distribution of the $p$ values of $\chi^2$ tests of each categorical variable and the binary response in the null case; left from the original sample, right from the bootstrap sample.

> [!theorem] Mechanism 2: bootstrap resampling manufactures association, more so for many categories ^thm-bootstrap-association
> 1. **Every finite sample deviates slightly from independence**, even when generated under it.
> 2. **Bootstrap sampling with replacement aggravates the deviation**: "the cell counts in the contingency table are affected by observations that are either not included or are doubled or tripled in the bootstrap sample, and therefore the bootsrap sample deviates notably from the null hypothesis – even if the original sample was generated under the null hypothesis." (verbatim, typo in original)
> 3. **More categories ⇒ bigger effect**: larger tables (e.g. $4\times2$ for $X_3$) have smaller absolute cell counts than smaller tables ($2\times2$ for $X_2$), and "excluding or duplicating an observation produces more severe variations from the null hypothesis."
> 4. **Not cured by larger $n$** (verbatim): "This effect is not eliminated if the sample size is increased, because in bootstrap sampling the size $n$ of the original sample and the bootstrap sample size $n$ increase simultaneously. However, if subsamples are drawn without replacement the effect disappears."
> 5. **Link to bootstrap testing theory**: Bickel & Ren point out that bootstrap hypothesis testing fails whenever the distribution of a statistic *in the bootstrap sample*, rather than its distribution *under the null hypothesis*, is used for inference. Tree growing on a bootstrap sample does exactly this when it judges associations.
>
> **Effect on importances.** The apparent association hits both measures available in `cforest`: selection frequency directly, and permutation importance because many-category variables are "selected more often and gain positions closer to the root node" (as in [[Strobl 2007 - Split-Selection Bias in CART Trees#^thm-propagation]]).

> [!theorem] Relative size of the two mechanisms ^thm-relative-size
> In `randomForest`, the bootstrap effect "is mostly superposed by the much stronger effect of variable selection bias" (Figs 1-9, top rows: with vs without replacement look alike). Only when `cforest` removes selection bias are the with/without-replacement differences obvious (bottom rows). **Conclusion** (verbatim): "in order to be able to reliably interpret the variable importance measures of a random forest, the forest must be built from unbiased classification trees, and sampling must be conducted without replacement."

**Proof sketch (vault addition).** Write the Pearson statistic for $X_j$ (with $k$ levels) vs binary $Y$ as $X^2=\sum_{\text{cells}}(O-E)^2/E$, with $X^2\approx\chi^2_{k-1}$ on the original sample under the null. Conditionally on the original sample, bootstrap cell counts are multinomial around the original counts, so the bootstrap deviation $O^*-E^*$ is (original deviation) + (fresh resampling noise of the same order). Both pieces are $O(\sqrt n)$ per cell, so in expectation $X^{2*}\approx$ (original $\chi^2_{k-1}$) + (an independent $\chi^2_{k-1}$-sized term), roughly doubling the statistic while it is still referred to $\chi^2_{k-1}$. The doubling holds for every $n$ — hence no improvement with sample size — and its effect on the $p$-value grows with the degrees of freedom: $P(\chi^2_{d}>2d)=0.157,\;0.112,\;0.035,\;0.006$ for $d=1,3,9,19$. A subsample of size $m<n$ without replacement has finite-population-corrected noise and no duplicated observations, and its $p$-values stay approximately uniform.

> [!example] Example: reproducing Figure 11 at two sample sizes (vault reproduction, not from the paper) ^ex-fig11-reproduction
> **Setup.** 1000 runs; $X_j\sim M(k)$ for $k\in\{2,4,10,20\}$, $Y\sim B(0.5)$ independent; Pearson $\chi^2$ test (no continuity correction) on the original sample, on one bootstrap sample of size $n$, and on one subsample of size $0.632n$ without replacement. Entries: median $p$-value / share of $p<0.05$.
>
> | $n$ | $k$ | original | bootstrap | subsample |
> |---|---|---|---|---|
> | 120 | 2 | 0.50 / 0.05 | 0.34 / 0.16 | 0.50 / 0.05 |
> | 120 | 4 | 0.49 / 0.05 | 0.20 / 0.26 | 0.51 / 0.04 |
> | 120 | 10 | 0.48 / 0.04 | 0.06 / 0.48 | 0.49 / 0.04 |
> | 120 | 20 | 0.47 / 0.03 | **0.02 / 0.67** | 0.45 / 0.02 |
> | 1200 | 2 | 0.50 / 0.04 | 0.38 / 0.14 | 0.52 / 0.05 |
> | 1200 | 4 | 0.51 / 0.05 | 0.20 / 0.26 | 0.49 / 0.04 |
> | 1200 | 10 | 0.52 / 0.05 | 0.05 / 0.50 | 0.50 / 0.04 |
> | 1200 | 20 | 0.52 / 0.05 | **0.01 / 0.73** | 0.51 / 0.04 |
>
> **Interpretation.** A bootstrap sample makes a pure-noise 20-level factor look "significant" at 5% in about two thirds of runs; tenfold more data does not help. Subsampling without replacement keeps the null calibrated. This confirms all three claims of the mechanism: shift toward zero, gradient in $k$, and invariance to $n$.

## Examples

> [!example] Example: bootstrapped feature screening in marketing pipelines ^ex-bootstrap-screening
> **Setup.** An analyst bootstraps weekly data (156 rows) to get "stability" of a feature-screening step that keeps any feature whose association test with the KPI has $p<0.05$, then counts how often each feature is kept.
>
> **Problem.** The bootstrap inflates apparent association for every feature, most for high-cardinality ones (a 20-level region code has ~8 weeks per level). The "stability" count rewards cardinality.
>
> **Fix.** Use subsamples without replacement (e.g. $\lfloor n/2\rfloor$ as in stability selection), or test with a proper null (permute $Y$ within the resample). For time-ordered data, resample in blocks — and note that bootstrapping weekly time series has its own dependence problems ([[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]).

## Connections

- **When the bootstrap fails.** The bootstrap approximates the *sampling distribution* of a statistic, not its *null distribution*; using the former to judge association is the error. Compare [[Permutation Tests and Exact Inference]] (resampling that enforces the null) and [[SDID Inference - Bootstrap, Jackknife and Placebo]] (placebo/permutation alternatives to the bootstrap).
- **Subsampling as the standard fix.** Stability selection ([[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]), and forest inference theory ([[Asymptotic Normality and Inference for Forests]], [[Generalized Random Forests - Local Moment Equations]]) also grow trees on subsamples without replacement.
- **Sample splitting.** Drawing disjoint data for selection vs evaluation is a related discipline: [[Cross-Fitting and Sample Splitting]], [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]].

## See Also
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]
- [[Strobl 2007 - Split-Selection Bias in CART Trees]] — the stronger, first mechanism
- [[Strobl 2007 - Null and Power Case Results]] — the residual `cforest` + bootstrap bias this explains
- [[Strobl 2007 - Conclusions, Scope and Practical Guidance]] — the resulting recommendations
