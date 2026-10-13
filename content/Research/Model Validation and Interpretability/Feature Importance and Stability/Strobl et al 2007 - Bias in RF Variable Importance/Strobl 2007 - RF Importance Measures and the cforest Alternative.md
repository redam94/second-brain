---
title: "Strobl 2007 - RF Importance Measures and the cforest Alternative"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/random-forests
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Strobl et al 2007 - Bias in Random Forest Variable Importance Measures.md]]"
source_location: "Strobl, Boulesteix, Zeileis & Hothorn (2007), BMC Bioinformatics 8:25 — Background (all paragraphs); Methods intro; Methods §'Random forest variable importance measures'; Methods §'Simulation studies' paragraphs 1-3 (randomForest vs cforest, bootstrap vs 0.632 subsampling); §'Variable selection bias in the individual classification trees' para. on conditional inference trees"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2007 - Bias in RF Variable Importance"
doc_type: paper
depends_on:
  - "[[Permutation Tests and Exact Inference]]"
  - "[[Honest Trees and Causal Forests]]"
used_by:
  - "[[Strobl 2007 - Null and Power Case Simulation Design]]"
  - "[[Strobl 2007 - Null and Power Case Results]]"
  - "[[Strobl 2007 - Split-Selection Bias in CART Trees]]"
  - "[[Strobl 2007 - Bootstrap-Induced Association]]"
aliases:
  - Strobl 2007 Gini Importance Definition
  - Strobl 2007 Selection Frequency Importance
  - cforest Conditional Inference Forest
  - Conditional Inference Trees (ctree)
  - Subagging with 0.632 Subsamples
---

# Strobl 2007 - RF Importance Measures and the cforest Alternative

> [!summary]
> The paper's setup: random forests are used both to **predict** and to **select variables** in "small $n$ large $p$" problems, and three importance measures come with Breiman's forest — **selection frequency**, **Gini importance**, **permutation (accuracy) importance**. The proposed alternative is `cforest` (R package `party`), a forest of **conditional inference trees** that choose split variables by the **minimum $p$-value of a permutation-based independence test** instead of by maximal Gini gain, combined with **subsampling without replacement** (subsample size $0.632n$) instead of the bootstrap. This note holds every definition the rest of the note set uses.

## Overview

**Motivation (Background).** In genomics and genetic epidemiology the task is twofold: build a diagnostic predictor of a categorical response (e.g. disease status) and "reliably identify relevant predictors from a large set of candidate variables" (Background, para. 1). Logistic regression is unsuitable for small-$n$/large-$p$ data; random forests handle nonlinearity and high-order interactions and come with importance scores, which made them popular. The applications survey (paras 4-6) and the roadmap (paras 8-10) are set out in full in the table below.

**Scope claim (Background, para. 7).** Breiman's importance measures, built on CART trees, are "a sensible means for variable selection in many of these applications" but "not reliable in situations where potential predictor variables vary in their scale of measurement or their number of categories". The typical trigger: genetic and environmental variables considered together, or same-type variables that differ in the number of categories *observed in the sample*.

### Background, paragraph by paragraph

The Background has **10 paragraphs**. Paragraphs 1-6 motivate the problem, paragraph 7 states the scope claim (above), and paragraphs 8-10 give the paper's roadmap.

| Para | Content (paraphrased unless quoted) |
|---|---|
| 1 | Bioinformatics, statistical genomics and genetic epidemiology need to predict a categorical response (e.g. disease status, properties of a molecule) from many predictors. The aim is twofold: build a diagnostic tool and "reliably identify relevant predictors from a large set of candidate variables". The statistical challenge is "small *n* large *p*": hundreds or thousands of genes or markers $X_1,\dots,X_p$ for comparatively few subjects or tissue types. |
| 2 | Traditional models from clinical case-control studies, such as logistic regression, are not suitable for small-$n$/large-$p$ problems (refs [1,2]). The nonlinear, nonparametric random forest [3] has been proposed for prediction and variable selection, and it supplies importance measures. |
| 3 | Over the previous five years RF became "a major data analysis tool" that performs well against many standard methods [2,4]. Its popularity rests on two things: it handles nonlinear problems with complex high-order interactions, and it produces an importance measure for every predictor. |
| 4 | **Association studies and microarrays.** Lunetta et al. [5] and Bureau et al. [1] detect SNP-SNP interactions in case-control data by computing an RF importance measure for each polymorphism. Díaz-Uriarte and Alvarez de Andrés [4] compare RF with other classifiers on gene-expression data and propose a new RF-based gene-selection method for microarray sample classification. Refs [6-8] give further microarray applications. |
| 5 | **Phenotype from sequence** (an area where many interactions are possible). Segal et al. [9] predict the replication capacity of viruses such as HIV-1 from reverse-transcriptase and protease amino-acid sequence. Cummings and Segal [10] link rifampin resistance in *Mycobacterium tuberculosis* to a few amino-acid positions in *rpoB*. Cummings and Myers [11] predict C-to-U edited sites in plant mitochondrial RNA from flanking sequence and a few continuous parameters. |
| 6 | RF was shown to **outperform six other methods** at predicting protein interactions from biological features such as gene expression, gene ontology (GO) features and sequence data [12]. Other fields: QSAR modelling [13,14], NMR spectroscopy [15], landscape epidemiology [16] and medicine in general [17]. |
| 7 | Scope claim (see above). |
| 8 | **Roadmap: illustrations.** Simulation studies show that selecting variables with the original RF importance "bears the risk that suboptimal predictor variables are artificially preferred in such scenarios" ([[Strobl 2007 - Null and Power Case Results]]). |
| 9 | **Roadmap: sources.** A separate section explains the two statistical sources of the deficiency: biased variable selection in the individual classification trees, and effects induced by bootstrap sampling with replacement ([[Strobl 2007 - Split-Selection Bias in CART Trees]], [[Strobl 2007 - Bootstrap-Induced Association]]). |
| 10 | **Roadmap: solution.** An alternative random forest whose importance measure "can be employed to reliably select relevant predictor variables in any data set" is compared with the original in simulation and illustrated by re-analysing the C-to-U editing data of [11], which had been analysed with the original method ([[Strobl 2007 - C-to-U RNA Editing Application]]). |

**The analogue in marketing analytics.** A per-segment tree model of a weekly KPI that mixes continuous spend, a binary holiday flag, a 4-level promotion type and a 20-level region or creative-ID factor is exactly the heterogeneous-predictor situation the paper warns about.

## Main Content

### Random forests (Methods intro)

> [!definition] Random forest as used in the paper (Methods, intro paragraphs) ^def-random-forest
> Given a learning sample of size $n$ with predictors $X_1,\dots,X_p$ and categorical response $Y$:
> 1. Draw $T$ resamples from the original sample (bootstrap samples in Breiman's original method).
> 2. Fit an **unpruned** classification tree to each resample.
> 3. At each split, search for the splitting variable only among a **small random subset** of the predictors (`mtry`), which sidesteps the small-$n$/large-$p$ problem.
> 4. Predict the response for a new case by **majority vote** (or average) over the $T$ trees.
>
> The ensemble improves on single trees because it averages away their instability under small changes in the learning sample. The cost is interpretability: in a single tree a variable's influence "directly corresponds to its position in the tree", in a forest it does not, so separate importance measures are needed.

The paper restricts attention to **classification** (Methods, para. 1); regression forests are not studied.

### The three importance measures (Methods §"Random forest variable importance measures")

> [!definition] Selection frequency ^def-selection-frequency
> The number of times variable $X_j$ is chosen as a splitting variable, counted over all splits of all trees in the ensemble. The paper calls it a "naive" measure and the most basic of the three.

> [!definition] Gini importance ^def-gini-importance
> A (weighted) mean, over trees, of the improvement in the splitting criterion produced by each variable; in classification forests the criterion is the **Gini gain**. With standard CART notation (not spelled out in the paper): for a node $\tau$ with class proportions $\hat p_k(\tau)$,
> $$
> G(\tau)=1-\sum_k \hat p_k(\tau)^2 \quad(\text{binary } Y:\ G(\tau)=2\hat p(\tau)\{1-\hat p(\tau)\}),
> $$
> a split of $\tau$ into $\tau_L,\tau_R$ with $n_L+n_R=n_\tau$ has Gini gain
> $$
> \Delta G=G(\tau)-\tfrac{n_L}{n_\tau}G(\tau_L)-\tfrac{n_R}{n_\tau}G(\tau_R),
> $$
> and the Gini importance of $X_j$ sums the (node-size-weighted) $\Delta G$ of every split on $X_j$, averaged over the $T$ trees. Because it re-uses the *same* criterion that chose the split, it inherits any bias of the split search ([[Strobl 2007 - Split-Selection Bias in CART Trees]]).

> [!definition] Permutation (accuracy) importance ^def-permutation-importance
> Rationale (Methods, verbatim): "By randomly permuting the predictor variable $X_j$, its original association with the response $Y$ is broken." If $X_j$ was associated with $Y$, prediction accuracy "decreases substantially" when the permuted $X_j$ and the unpermuted other predictors are used to predict. Importance is the **difference in prediction accuracy (number of observations classified correctly) before and after permuting $X_j$**.
>
> In the per-tree, out-of-bag form used by `randomForest` and `cforest` (formalised in the follow-up paper, see [[Strobl et al 2008 - Conditional Variable Importance - Overview]]), with $\bar{\mathcal B}^{(t)}$ the out-of-bag observations of tree $t$, $\hat y_i^{(t)}$ the tree's prediction and $\hat y^{(t)}_{i,\pi_j}$ its prediction after permuting $X_j$ within $\bar{\mathcal B}^{(t)}$:
> $$
> VI^{(t)}(X_j)=\frac{\sum_{i\in\bar{\mathcal B}^{(t)}}I(y_i=\hat y_i^{(t)})-\sum_{i\in\bar{\mathcal B}^{(t)}}I(y_i=\hat y^{(t)}_{i,\pi_j})}{|\bar{\mathcal B}^{(t)}|},\qquad VI(X_j)=\frac1T\sum_{t=1}^{T}VI^{(t)}(X_j).
> $$
> - **Unscaled** importance: $VI(X_j)$ itself.
> - **Scaled** importance: $VI(X_j)$ divided by its standard error, $z_j=VI(X_j)/(\hat\sigma_j/\sqrt T)$ with $\hat\sigma_j$ the across-tree standard deviation. This is the **default output of `randomForest`**.
>
> General treatment of permute-and-predict importance and its extrapolation problem: [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].

**Why permutation importance was considered the "most advanced" (Methods).** Unlike univariate screening (e.g. Fisher's exact test per marker), it captures a variable's effect "individually as well as in multivariate interactions with other predictor variables"; Lunetta et al. found interacting genetic markers are detected more efficiently this way.

> [!note] Scaled importance depends on the number of trees (Results, null case) ^note-scaled-ntree
> The paper reports (citing the supplementary material of Díaz-Uriarte & Alvarez de Andrés) that `randomForest`'s scaled importance depends on the number of trees grown, and that in `cforest` this is not the case, and therefore recommends **not interpreting its magnitude**. The mechanism follows from the definition above: the denominator $\hat\sigma_j/\sqrt T$ shrinks like $1/\sqrt T$, so $z_j$ grows roughly like $\sqrt T$ for any variable whose mean importance is not zero. (This derivation is a vault addition, not stated in the paper.)

### The alternative: `cforest` built from conditional inference trees

> [!definition] Conditional inference tree (`ctree`) split selection (paper §"Variable selection bias in the individual classification trees"; framework of Hothorn, Hornik & Zeileis 2006, ref. [29]) ^def-ctree
> At each node:
> 1. For each candidate $X_j$, test the global null hypothesis of independence between $X_j$ and $Y$ with a conditional (permutation) inference test — "comparable e.g. to the $\chi^2$ test, that incorporates the number of categories of each variable in the degrees of freedom" (verbatim, paper).
> 2. Select the variable with the **minimum $p$-value**. Because a $p$-value is already calibrated for the number of categories (degrees of freedom), a variable with more categories or more cutpoints does not gain an advantage under the null.
> 3. Only then search for the best cutpoint *within* the selected variable.
> 4. Stopping also relies on the conditional-inference tests (paper, Conclusion: "split decisions and stopping rely on time-consuming conditional inference").
>
> *Framework detail (from ref. [29], not reproduced in this paper):* the test statistic is a linear statistic $\mathbf T_j=\mathrm{vec}\big(\sum_i g_j(X_{ji})h(Y_i)^\top\big)$, standardised by its conditional mean and covariance under permutations of $Y$, summarised as a quadratic form that is asymptotically $\chi^2$ with degrees of freedom equal to the rank of the covariance; $p$-values are multiplicity-adjusted across variables (e.g. Bonferroni) and splitting stops when the minimum adjusted $p$-value exceeds a threshold $\alpha$.

The key design principle is **separating variable selection from cutpoint search**. CART does both at once by maximising $\Delta G$ over all (variable, cutpoint) pairs, which is a multiple-comparison problem whose size differs by variable. [[Honest Trees and Causal Forests]] uses a different separation — split selection vs. leaf estimation — aimed at valid inference on leaf effects rather than unbiased variable choice.

> [!definition] `cforest` ^def-cforest
> A random forest (R package `party`, implemented by T. Hothorn — Authors' contributions) whose base learners are conditional inference trees rather than CART trees. It provides selection frequency and permutation importance (there is no Gini importance, since no Gini criterion is used; Methods §"Simulation studies", para. 3). The importance function is `varimp`.

### Two resampling schemes

> [!definition] Bootstrap vs. 0.632 subsampling (Methods §"Simulation studies", paras 3-4) ^def-resampling-schemes
> Every forest in the paper is grown in two ways:
> - **Bootstrap sampling with replacement**: resamples of size $n$ drawn with replacement, as in Breiman's original method ("bagging" = bootstrap aggregating).
> - **Subsampling without replacement**: subsamples of size $0.632\,n$, chosen because a bootstrap sample contains on average a fraction $1-(1-1/n)^n\to1-e^{-1}\approx0.632$ of the distinct original observations. Bühlmann & Yu call this "subagging" (subsample aggregating). Other fractions are possible (Friedman & Hall suggest 0.5), and Politis, Romano & Wolf show subsampling is valid under weaker assumptions than the bootstrap, including cases where the bootstrap fails.
>
> Crossing {`randomForest`, `cforest`} × {with, without replacement} gives the **four methods** compared throughout ([[Strobl 2007 - Null and Power Case Results]]).

Subsampling without replacement is also the resampling scheme of [[Meinshausen Buhlmann 2010 - Stability Selection - Overview|stability selection]], though with a different fraction: subsamples of size $\lfloor n/2\rfloor$ rather than $0.632n$.

## Examples

> [!example] Example: what each measure would report for a weekly media model ^ex-three-measures
> **Setup.** A random forest predicts whether a week is an above-median sales week ($n=156$ weeks) from TV spend (continuous), a holiday flag (binary), promotion type (4 levels) and DMA cluster (20 levels).
>
> **Reading the three measures.**
> 1. *Selection frequency* counts how often each variable is the split variable. Under CART splitting, the DMA factor and TV spend are chosen more often even with no signal ([[Strobl 2007 - Split-Selection Bias in CART Trees]]).
> 2. *Gini importance* sums Gini gains of those splits, so it double-counts the advantage: more selections, and each selection was the best of many cutpoints.
> 3. *Permutation importance* re-scores held-out weeks with one variable shuffled. It has no systematic upward bias for noise variables but a larger variance for the favoured ones ([[Strobl 2007 - Null and Power Case Results]]).
>
> **Interpretation.** The order of reliability in the paper is permutation > selection frequency > Gini, and even permutation importance needs unbiased trees and subsampling to be trustworthy.

## Connections

- Permutation importance borrows the logic of the permutation test ([[Permutation Tests and Exact Inference]], [[Fisher Randomization Test and the Sharp Null]]) but uses it descriptively, without a null distribution; the conditional inference tree uses permutation tests *formally* for split selection.
- The forest's resampling step connects to [[Asymptotic Normality and Inference for Forests]] (forests built on subsamples for valid inference) and [[Generalized Random Forests - Local Moment Equations]], which also grow trees on subsamples without replacement.
- Explanation methods that replace permutation importance: [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]] (Shapley/SHAP), [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]].

## See Also
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]] — paper overview and section map
- [[Strobl 2007 - Null and Power Case Simulation Design]] — the experiment these definitions feed
- [[Strobl 2007 - Split-Selection Bias in CART Trees]] — why Gini-based selection is biased and `ctree` is not
- [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — conditional permutation importance for correlated predictors
