---
title: "Strobl 2007 - Conclusions, Scope and Practical Guidance"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/random-forests
  - type/concept
  - doc/paper
source: "[[raw/Strobl et al 2007 - Bias in Random Forest Variable Importance Measures.md]]"
source_location: "Strobl, Boulesteix, Zeileis & Hothorn (2007), BMC Bioinformatics 8:25 — Conclusion (all paras); Results null case (scaled importance caveat); Application (seed repetition); end of §'Effects induced by bootstrapping'; Authors' contributions; Supplementary material (Additional file 1); Acknowledgements; Contributor Information"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2007 - Bias in RF Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2007 - Null and Power Case Results]]"
  - "[[Strobl 2007 - Split-Selection Bias in CART Trees]]"
  - "[[Strobl 2007 - Bootstrap-Induced Association]]"
  - "[[Strobl 2007 - C-to-U RNA Editing Application]]"
used_by:
  - "[[Strobl et al 2008 - Conditional Variable Importance - Overview]]"
  - "[[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]"
aliases:
  - Strobl 2007 Recommendations
  - When Random Forest Importance Is Unreliable
  - Strobl 2007 Variable Importance Bias
---

# Strobl 2007 - Conclusions, Scope and Practical Guidance

> [!summary]
> Random-forest importance from Breiman's method is **unreliable whenever predictors differ in scale of measurement or number of categories**, because of split-selection bias in CART trees and bootstrap-induced association. It is **not** affected when all predictors are continuous or all share the same number of categories. The remedy: **`cforest` (unbiased conditional inference trees) with subsampling without replacement**, which is also faster than `cforest` with the bootstrap. Supporting rules: prefer permutation over Gini importance; do not interpret the magnitude of `randomForest`'s scaled importance; repeat over seeds. The paper ends by pointing to formal inference for variable importance (van der Laan) as future work.

## Overview

The paper's practical claim is narrow and conditional, which is its strength: it says exactly when the bias appears, what causes it, and what removes it. This note collects the Conclusion and every recommendation scattered through the paper, plus limitations and later developments.

## Main Content

### Why random forests became popular (Conclusion, paras 1-2)

The Conclusion opens by restating the method's reach. Random forests are "a powerful statistical tool" applied to problems as varied as **large-scale association studies for complex genetic diseases**, **prediction of phenotypes from amino-acid or DNA sequences**, **QSAR modelling** and **clinical medicine** (para. 1). Two features account for their popularity in bioinformatics and related fields, where the main challenge is to find a subset of relevant predictors among very many candidates (para. 2):

1. the ability to handle critical **"small *n* large *p*"** data sets, and
2. the **variable importance measures** they provide for variable selection.

The second feature is the one the paper puts in question. The popularity argument thus sets up the principle that follows: a widely used importance measure must measure importance and nothing else.

### Principle

> [!definition] What a variable-importance measure must satisfy for selection (Conclusion) ^def-vi-requirement
> "when a method is used for variable selection, rather than prediction only, it is particularly important that the value and interpretation of the variable importance measure actually depict the importance of the variable, and are not affected by any other characteristics." Number of categories and scale of measurement "are no direct indicators of the true importance of the variable", so they must not influence the score — "otherwise the results of a study could easily be distorted when an irrelevant variable with many categories is included in the study design."

### Scope

> [!theorem] Scope statement: when the bias does and does not arise (Conclusion) ^thm-scope
> **Not affected:** "As long as, e.g., only continuous predictor variables, as in most gene expression studies, or only variables with the same number of categories are considered in the sample, variable selection with random forest variable importance measures is not affected by our findings."
>
> **Affected:** continuous variables combined with categorical ones (e.g. folding energy with neighbouring nucleotides), or categorical predictors whose number of categories *present in the sample* differs (e.g. amino-acid sequence data). There "variable selection with random forest variable importance measures is unreliable and may even be misleading."
>
> **A common real-world trigger:** "informations on clinical and environmental variables are often gathered by means of questionnaires, where the number of categories can vary between questions." Neither the designed number of categories nor the number actually observed in a sample indicates relevance.

Two practical qualifications (vault additions):
1. The number of categories *present in the sample* can differ even for same-type variables (rare levels absent in small samples), so "same number of categories" must be checked on the data, not the codebook.
2. An all-continuous set avoids this particular bias but not the separate problem of **correlated** predictors, which inflates marginal permutation importance ([[Strobl et al 2008 - Conditional Variable Importance - Overview]], [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]]). Continuous variables with different numbers of distinct values (e.g. a spend series with many zero weeks) also differ in cutpoint count.

### Recommendations

> [!algorithm] Strobl et al. (2007) checklist for reliable random-forest importance ^alg-checklist
> 1. **Use unbiased trees.** Build the forest from conditional inference trees (`cforest`), not CART/Gini trees, whenever predictors differ in scale or cardinality ([[Strobl 2007 - Split-Selection Bias in CART Trees]]).
> 2. **Sample without replacement.** Grow trees on subsamples (the paper uses $0.632n$) rather than bootstrap samples ([[Strobl 2007 - Bootstrap-Induced Association]]). Verbatim: "in order to be able to reliably interpret the variable importance measures of a random forest, the forest must be built from unbiased classification trees, and sampling must be conducted without replacement."
> 3. **Do not use Gini importance** for selection with mixed predictors — it is the most strongly biased measure and failed to find the informative variable ([[Strobl 2007 - Null and Power Case Results]]).
> 4. **Do not interpret the magnitude of `randomForest`'s scaled importance**, which depends on the number of trees ("we suggest not to interpret the magnitude of the scaled variable importance of the randomForest function").
> 5. **Repeat with several random seeds** before interpreting permutation importances ([[Strobl 2007 - C-to-U RNA Editing Application]]).
> 6. **Avoid `randomForest`** when predictors vary in scale or cardinality: "the randomForest function should not be used when the potential predictor variables vary in their scale of measurement or their number of categories."

### Cost

`cforest` is more expensive because "split decisions and stopping rely on time-consuming conditional inference". C-to-U data timings (supplement): `cforest` 8.38 s (bootstrap) vs 4.82 s (subsampling); `randomForest` 0.24 s / 0.18 s. Since subsampling is both the unbiased and the faster `cforest` option, "the faster version without replacement should be preferred anyway."

### Stated aim and future work

The aim was "to explore the limits of the empirical measures of variable importance provided for random forests, to understand the underlying mechanisms and to use that understanding to guarantee unbiased and reliable variable selection in random forests." Future work, inspired by van der Laan's fundamental definition of variable importance with a statistical inference framework for estimating and testing it, aims at "further means of statistical inference, that can be used to guide the decision on which and how many predictor variables to select in a certain problem."

### Limitations (vault assessment)

- **Classification only**, binary response, $n=120$, five independent predictors, one informative variable with a main effect only. Regression forests, interactions, correlated predictors and large $n$ are not simulated (though the bootstrap mechanism is argued to be $n$-invariant).
- **Ranking-based success metric** (top-1 identification) — no evaluation of thresholds for how many variables to select, which the authors flag as future work.
- **Tied to 2007 implementations.** Defaults of `randomForest`/`party` and of modern libraries differ; the mechanisms, not the specific numbers, are what transfer.
- **No statement about causal relevance.** Even unbiased permutation importance measures predictive reliance of a fitted model, not causal effect ([[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]]).

### What came next (context)

- **Correlated predictors and conditional importance**: [[Strobl et al 2008 - Conditional Variable Importance - Overview]] — the same group's follow-up, permuting within strata of correlated covariates.
- **Extrapolation under permute-and-predict**: [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].
- **Importance across many good models**: [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
- **Shapley-based alternatives and their own problems**: [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]], [[Dillon et al - SHAP and Causal Insights - Overview]].
- **Stable selection via subsampling**: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]].

### Paper metadata

- **Authors' contributions:** C. Strobl observed the bias, ran the simulations, studied its sources and drafted the paper; A.-L. Boulesteix, A. Zeileis and T. Hothorn contributed to design, theory and writing; T. Hothorn implemented `cforest`, `ctree` and `varimp`; A.-L. Boulesteix analysed the C-to-U data.
- **Supplement:** Additional file 1 — R source code with all function calls and options for `randomForest` and `cforest` used in the simulations and application.
- **Funding:** DFG collaborative research centre 386 "Statistical Analysis of Discrete Structures" (CS); DFG grant HO 3242/1-3 (TH).
- **Acknowledgements (thanks):** the authors thank Thomas Augustin, Friedrich Leisch and Gerhard Tutz "for fruitful discussions and for supporting our interest in this field of research", and Peter Bühlmann, an anonymous referee and a semi-anonymous referee for helpful suggestions.
- **Contributor information:** the source lists a contact email for each of the four authors: Carolin Strobl (Department of Statistics, LMU Munich domain), Anne-Laure Boulesteix (TU Munich domain), and Achim Zeileis and Torsten Hothorn (both R-project addresses). The saved full text gives no further affiliation details, and the addresses are not reproduced here.
- **History:** received 18 Sep 2006, accepted 25 Jan 2007.

## Examples

> [!example] Example: applying the checklist to a driver-importance report ^ex-driver-report-audit
> **Setup.** A team reports "top drivers of weekly sales" from a gradient-boosted model's default gain importance, using 104 weeks, continuous spend by channel, a holiday flag, a 5-level promotion factor and a 52-level week-of-year factor.
>
> **Audit.**
> 1. Gain importance is a Gini-type measure → biased toward week-of-year (52 levels) and continuous spend. Replace with permutation importance on held-out weeks.
> 2. Week-of-year has ~2 rows per level → bootstrap-based stability numbers will inflate it; use subsamples (or time-blocked splits).
> 3. Run a placebo (KPI replaced by noise, [[Strobl 2007 - Null and Power Case Simulation Design]]) to see which features rank high for no reason.
> 4. Repeat over seeds and report intervals, not a single bar chart.
> 5. Do not read the result causally; for budget decisions use experiments or a structural model.
>
> **Interpretation.** Choosing among model fits or features by total importance mass, rather than by held-out accuracy and placebo checks, rewards exactly the artefacts this paper identifies.

## Connections

- Governance framing — importance outputs used for decisions need independent effective challenge: [[SR 11-7 - Model Risk Management Guidance - Overview]], [[NIST AI RMF 1.0 - Overview]].
- Hidden multiplicity and selective reporting: [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].

## See Also
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]
- [[Strobl 2007 - RF Importance Measures and the cforest Alternative]]
- [[Strobl 2007 - Bootstrap-Induced Association]]
