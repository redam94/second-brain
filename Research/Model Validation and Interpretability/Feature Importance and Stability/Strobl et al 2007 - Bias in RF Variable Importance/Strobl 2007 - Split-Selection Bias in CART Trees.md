---
title: "Strobl 2007 - Split-Selection Bias in CART Trees"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/random-forests
  - topic/multiple-testing
  - type/theorem
  - type/concept
  - doc/paper
source: "[[raw/Strobl et al 2007 - Bias in Random Forest Variable Importance Measures.md]]"
source_location: "Strobl, Boulesteix, Zeileis & Hothorn (2007), BMC Bioinformatics 8:25 — §'Sources of variable importance bias' (paras 1-2); §'Variable selection bias in the individual classification trees of a random forest' (all paras), Figure 10"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2007 - Bias in RF Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2007 - RF Importance Measures and the cforest Alternative]]"
  - "[[Multiple Testing Corrections]]"
used_by:
  - "[[Strobl 2007 - Null and Power Case Results]]"
  - "[[Strobl 2007 - Bootstrap-Induced Association]]"
  - "[[Strobl 2007 - Conclusions, Scope and Practical Guidance]]"
aliases:
  - Split-Point Selection Bias
  - Variable Selection Bias in Classification Trees
  - Cutpoint Multiple Testing Bias
  - Strobl 2007 Figure 10
---

# Strobl 2007 - Split-Selection Bias in CART Trees

> [!summary]
> **Source 1 of the importance bias.** CART picks the split variable whose *best* cutpoint maximises the Gini gain. A variable with more possible cutpoints gets more draws at a high value by chance — a hidden **multiple-testing** problem — and for unordered factors the cutpoint count grows exponentially with the number of levels. In the null design, single `rpart` trees select many-category variables far more often (Fig. 10, "highly biased"), while conditional inference trees (`ctree`), which pick the variable with the smallest $p$-value, are unbiased. The bias propagates to **all three** forest importance measures: directly to selection frequency and Gini importance, indirectly to permutation importance through **more trees and positions nearer the root**, which widens its variance.

## Overview

[[Strobl 2007 - Null and Power Case Results]] showed *that* importance depends on cardinality. The paper's §"Sources of variable importance bias" explains *why*, with two mechanisms. This note is the first: what happens inside each tree. The second — bootstrap sampling — is in [[Strobl 2007 - Bootstrap-Induced Association]]. The key comparison is "randomForest function, based on CART trees [18], and cforest function, based on conditional inference trees [29]": in the former "the variable selection in the individual CART trees is biased, so that e.g. variables with more categories are preferred."

## Main Content

### The mechanism

> [!theorem] Mechanism 1: variable selection by maximal criterion is a multiple-comparison procedure ^thm-cutpoint-bias
> **Setting.** At a node, CART computes a split criterion (e.g. Gini gain $\Delta G$) "for all possible cutpoints within the range of that variable"; the variable selected is "the one that produced the highest criterion value overall, i.e. in its best cutpoint."
>
> **Claim (verbatim).** "Obviously variables with more potential cutpoints are more likely to produce a good criterion value by chance, as in a multiple testing situation."
>
> **Illustration in the paper.** A 2-category variable offers one cutpoint; a 4-category variable offers seven, and its best value "is often preferred". Since "the number of cutpoints grows exponentially with the number of categories of unordered categorical predictors", CART-like trees prefer variables with more categories.
>
> **Sketch of why (vault addition).** Under the null, the Gini gain $\Delta G_{j,c}$ at each cutpoint $c$ is a noisy non-negative statistic. Variable $X_j$ is scored by $M_j=\max_{c\in C_j}\Delta G_{j,c}$. For any family of identically distributed statistics, the expected maximum is non-decreasing in the size of the family, so $|C_j|$ — not the $X_j$–$Y$ relationship — drives $M_j$. Counts: an unordered $k$-level factor has $|C_j|=2^{k-1}-1$; a continuous variable has $|C_j|=(\#\text{distinct values})-1$; a binary flag has 1. A continuous variable therefore beats low-cardinality factors too (seen for $X_1$ in Figs 2 and 6).

The paper refers readers to the tree-bias literature in its refs [24, 25, 28, 29, 33-35]. Ref. [29] is the conditional inference tree framework that `ctree` and `cforest` are built on. The saved full text omits the reference list, so the other entries are not identified here. (The CART book is ref. [18], cited separately as the basis of `randomForest`, and the paper's Methods section cites [18,24-28] for CART's known preference for many-category variables.)

### Consequences for each importance measure

> [!theorem] Propagation from trees to forest importances ^thm-propagation
> 1. **Gini importance** is "directly derived from the Gini index split criterion used in the underlying individual classification trees" and therefore "carries forward the same bias" (Figs 2, 6).
> 2. **Selection frequency** is "directly affected" by the per-tree selection bias.
> 3. **Permutation importance** — "less obvious but just as severe". Favoured variables "are selected in more individual classification trees and tend to be situated closer to the root node in each tree." Permuting a variable used in many trees and near the root changes predictions for a large set of observations; permuting one used rarely and near the leaves affects small subsets. Hence "the range of possible changes in prediction accuracy in the random forest, i.e. the deviation of the variable importance measure, is higher for variables that are preferred by the individual trees due to variable selection bias."
>
> This explains the null-case pattern of a mean near zero but variance increasing with cardinality ([[Strobl 2007 - Null and Power Case Results#^res-null-perm|Result N3]]).

### The fix: selection by $p$-value

> [!theorem] Conditional inference trees are unbiased in variable selection ^thm-ctree-unbiased
> In `ctree` "the variable selection is conducted by minimizing the p value of a conditional inference independence test, comparable e.g. to the $\chi^2$ test, that incorporates the number of categories of each variable in the degrees of freedom." Under the null each variable's $p$-value is (approximately) uniform regardless of how many categories it has, so each variable is selected with (approximately) equal probability. Definition: [[Strobl 2007 - RF Importance Measures and the cforest Alternative#^def-ctree]].

> [!example] Figure 10 — Variable selection bias in individual trees ^fig-10
> **Setup.** Null-case design (all five predictors uninformative). Mean selection frequencies over 1000 simulation runs (the caption says "relative selection frequencies") for single trees: `rpart` (CART implementation, ref. [36]) on the left, `ctree` on the right.
>
> **Result.** "We find that the variable selection with the rpart function is highly biased, while for the ctree function it is unbiased." By the mechanism above, `rpart`'s bias runs toward variables with more cutpoints; `ctree` selects the uninformative variables with roughly equal frequency.

> [!example] Example: root-split selection under the null (vault reproduction, not from the paper) ^ex-root-split-reproduction
> **Setup.** Paper's null design: $n=120$, $X_1\sim N(0,1)$, $X_2,\dots,X_5\sim M(2),M(4),M(10),M(20)$, $Y\sim B(0.5)$ independent. For each of 2000 replications, compute every variable's best root-node Gini gain (for factors, by Breiman's ordering of levels by $\bar y$, which finds the optimal binary partition for a binary response) and record which variable wins.
>
> **Result (Python, seed 2).**
>
> | | $X_1$ (cont.) | $X_2$ (2) | $X_3$ (4) | $X_4$ (10) | $X_5$ (20) |
> |---|---|---|---|---|---|
> | Share of runs selected at root | 0.018 | 0.001 | 0.008 | 0.099 | **0.875** |
> | Mean best Gini gain | 0.0187 | 0.0042 | 0.0107 | 0.0275 | 0.0533 |
>
> Under a fair procedure each share would be 0.20. The 20-level noise factor wins the root **87%** of the time; the binary variable almost never. In a forest with `mtry` < 5 the extreme is softened (the 20-level factor is not always a candidate), but the ordering is the same.
>
> **Interpretation.** This is the Fig. 10 left panel at the root. Note that the continuous variable's best gain (119 cutpoints) beats the 4-level factor (7 partitions) but loses to the 10-level factor (511 partitions).

## Examples

> [!example] Example: high-cardinality marketing features ^ex-high-cardinality
> Creative IDs, DMA codes, store numbers, day-of-year or week-of-year factors, and binned spend variables with many bins are all high-cardinality predictors. In a per-segment tree model of a shared aggregate KPI, these will be split on early and often even if they carry no signal, and they will dominate Gini/"split gain" importance charts (the default in many gradient-boosting libraries, which also select splits by maximal gain). Their permutation importance will have inflated variance. Low-cardinality but genuinely causal flags (a holiday or price-promotion indicator) are disadvantaged.

## Connections

- **Same disease, different scale.** Choosing a variable by its best cutpoint is the within-algorithm version of choosing an analysis by its best $p$-value — [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], and across model attempts [[Q - Handling Multiple Comparisons When Selecting From Hundreds of Models]]. The `ctree` remedy — compare $p$-values, which are calibrated for the number of comparisons — is a [[Multiple Testing Corrections|multiplicity adjustment]].
- **Honest vs unbiased trees.** [[Honest Trees and Causal Forests]] separates split selection from leaf estimation (unbiased *effects*); `ctree` separates variable selection from cutpoint search (unbiased *variable choice*). Both are responses to the optimism of greedy split search ([[Model Selection and Overfitting]]).
- **Correlated predictors.** A separate preference for correlated predictors arises even without cardinality differences: [[Strobl et al 2008 - Conditional Variable Importance - Overview]], [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].

## See Also
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]
- [[Strobl 2007 - Bootstrap-Induced Association]] — the second source of bias, visible once this one is removed
- [[Strobl 2007 - Null and Power Case Results]] — where the bias shows up
- [[Permutation Tests and Exact Inference]] — the test family that `ctree` uses for split selection
