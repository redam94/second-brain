---
title: "Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation"
tags:
  - source/ingested
  - topic/model-validation
  - topic/interpretability
  - topic/feature-importance
  - topic/random-forests
  - type/concept
  - doc/paper
source: "[[raw/Strobl et al 2008 - Conditional Variable Importance for Random Forests.md]]"
source_location: "Strobl et al. (2008), BMC Bioinformatics 9:307, §1 Background (all paragraphs); reference numbers resolved against the published reference list (PMC2491635)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2008 - Conditional Variable Importance"
doc_type: paper
depends_on:
  - "[[Spurious Association and Confounds]]"
  - "[[Conditional Independence Assumption]]"
  - "[[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]"
used_by:
  - "[[Strobl 2008 - Correlated Predictor Selection in Tree Ensembles]]"
  - "[[Strobl 2008 - Permutation Importance Null Hypotheses]]"
  - "[[Conditional Permutation Importance (Strobl 2008 Algorithm)]]"
aliases:
  - Strobl 2008 Background
  - Hospital Complication-Mortality Example
  - Marginal vs Conditional Variable Importance
---

# Strobl 2008 - Marginal vs Conditional Importance and Spurious Correlation

> [!summary]
> The Background section (§1) sets up the paper's central distinction. A **marginal** importance measure credits a predictor for any association with the response, including association it borrows from correlated predictors. A **conditional** measure credits only what the predictor adds once the relevant other predictors are known. In observational data "the distinction between the marginal and the conditional effect of a variable is crucial" (§1, para. 3). The section uses a hospital example in which complication rate predicts mortality only until severity of illness is accounted for. It then reviews earlier importance tools (partial dependence plots, Gini importance, permutation-based significance tests, backward elimination) and earlier simulation evidence that random forests prefer correlated predictors.
^summary-background

## Overview

The paper is set in bioinformatics: random-forest importance is used to screen microarray genes, DNA sequence positions and amino-acid properties. In that setting thousands of predictors are correlated through genetic linkage or shared biochemistry. The authors stress that the problem is not specific to genomics. It appears "in any non-experimental scientific study, where the predictor variable settings cannot be manipulated independently by the investigator" (§1, para. 3).

## Main Content

### Why RF importance is attractive (§1, paras. 1-2)

- Random forests predict well even in high-dimensional problems with highly correlated predictors.
- Unlike univariate screening (e.g. Fisher's exact test), RF importance reflects each variable's effect **individually and through interactions**. Lunetta et al. (ref. [2]) found that interacting genetic markers are detected more efficiently by RF. Segal et al. stressed interactions between sequence positions.
- **Motivation for the application.** Trees can find relevant predictors "even in such high dimensional settings involving complex interactions". So the paper studies how different amino-acid *properties* predict peptide binding (§4). Some of these properties had been shown by Xia & Li to be relevant in DNA and protein evolution. The authors say in advance that in this example, "as often in practical problems", many predictor variables are highly correlated (§1, para. 2). See [[Strobl 2008 - Peptide-Binding Application]].
- An importance score can be used to compare predictors "with respect to their impact in predicting the response or even their causal effect". For causal interpretation the paper points to a separate reference listing the assumptions needed and does not pursue it.

### The hospital example (§1, paras. 4-6)

> [!example] Spurious correlation: complications and mortality (§1, citing Silber & Rosenbaum)
> **Observation.** Across hospitals, the complication rate after surgery is correlated with the mortality rate. It is tempting to conclude that mortality depends on, or is caused by, complications.
>
> **Hidden variable.** Severity of illness. Hospitals that treat many serious cases have higher complication rates *and* higher mortality rates.
>
> **Conditioning.** Once only patients with similar severity are compared, mortality is no longer associated with complications.
>
> **Prediction reading.** Once severity is known, complication rate adds little or no information for predicting mortality. The paper's point is that, statistically, "this distinction can only be made by a conditional importance measure" (§1, para. 6).
^ex-hospital

The paper calls this a **spurious correlation** and cites Stigler for a historical example. In DAG terms, severity is a common cause (fork) of both variables. See [[Spurious Association and Confounds]] for the regression version and [[DAGs and Causal Identification]] for the graphical one.

> [!definition] Marginal vs conditional importance (§1, para. 7; formalized in §2.4)
> - **Marginal importance** of $X_j$: the strength of association between $X_j$ and $Y$ *without* holding the other predictors fixed. A predictor correlated with a true driver inherits part of that driver's importance.
> - **Conditional importance** of $X_j$: the association between $X_j$ and $Y$ *given* the other relevant predictors $Z$. It is zero when $Y \perp X_j \mid Z$.
>
> The paper's thesis is that the original RF importance measures "can be considered as measures of marginal importance, even though what is of interest in most applications is the conditional effect of each variable" (§1, para. 7).
^def-marginal-conditional

The paper also notes that correlations can come from small-scale structure (nearby genetic loci) or from large-scale structure (similar patient mix across hospitals). Both affect the original measures.

### The rationale of permutation importance (§1, para. 8)

> [!definition] Permutation accuracy importance: rationale (§1, para. 8)
> The permutation accuracy importance "follows the rationale that a random permutation of the values of the predictor variable is supposed to mimic the absence of the variable from the model." The importance is the difference in prediction accuracy before and after permuting the variable, "i.e. with and without the help of this predictor variable". The formal version is Eq. 1 in §2.3 ([[Strobl 2008 - Permutation Importance Null Hypotheses#^def-vi-tree]]).
^def-perm-rationale

This "mimic the absence" premise is exactly what the paper goes on to qualify. Shuffling $X_j$ removes its link to $Y$, but it also breaks its link to the correlated $Z$. So the permuted data are not simply "the data without $X_j$". The general permutation-importance concept is owned by [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]].

### Terminology (§1, para. 8)

| Term in the paper | Meaning |
|---|---|
| "variable importance" | The general idea of a predictor's impact on predicting the response |
| "permutation importance" | The specific permutation accuracy importance measure (§2.3) |
| "classification trees" | Shorthand for classification *and* regression trees; all results apply to both |
| Gini importance | Impurity-reduction importance; biased by scale and number of categories (Strobl 2007), so not used here |

### Literature reviewed (§1, paras. 7-10)

1. **Partial dependence plots** (Breiman, "Statistical Modeling: The Two Cultures") show how the predicted response changes across the range of one predictor. The paper also points to a related approach for explaining neural-network classifications (Féraud & Clérot 2002, ref. [12]). Partial dependence plots resemble reading coefficients in a linear model. The paper warns that in trees and forests the displayed effect is *not* guaranteed to be conditional on all other variables.
2. **Gini importance** is biased when predictors differ in their number of categories or scale of measurement, because Gini gain is a biased estimator affected by multiple testing. Permutation importance is reliable once the forest is grown on **subsamples without replacement**. See [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]].
3. **Significance and selection built on permutation importance.**
   - Breiman & Cutler proposed a simple significance test, later shown to have poor statistical properties (ref. [16], Strobl & Zeileis 2008, "Danger: High Power!").
   - Diaz-Uriarte & Alvarez de Andrés proposed **backward elimination** for gene selection in large-scale screening studies. The paper's assessment: the approach "has been shown to provide a reasonable selection of genes in many situations" (§1, para. 9). It is freely available in an R package (ref. [18]) that provides several **plots comparing performance on the original data set with performance on a data set with randomly permuted response values**. The permuted-response data mimic the overall null that no predictor is relevant, and so "may serve as a baseline for significance statements". Rodenburg et al. (ref. [19]) follow a similar approach.
4. **Evidence of trouble with correlated predictors.**
   - **Archer & Kimes**: Gini importance can pick out the influential predictor from a correlated set in many settings.
   - **Nicodemus & Shugart** (preliminary): permutation importance is less reliable at this task than other ML methods and depends strongly on `mtry`.
   - The authors' conclusion: random forests prefer correlated predictors, and "any significance test or variable selection scheme constructed from the importance measures" inherits that preference (§1, para. 9).
5. **CARTscans** (Nason et al.) plot the effect of a continuous predictor separately for each level of two *categorical* predictors, which makes it a conditional influence plot. This directly inspired the paper. The limitation is that it works only for categorical conditioning variables. It amounts to a full-factorial cross-tabulation, whereas Strobl et al. condition on the partition learned by the forest.

### The paper's aims (§1, final paras.)

- Explain the mechanisms behind the Archer & Kimes and Nicodemus & Shugart findings.
- Widen the question from "find the one influential predictor in a correlated set" to "compare correlated **and** uncorrelated predictors fairly".
- Provide a general scheme, usable for illustrating effects and for computing importance, that conditions on covariates of **any type**.

## Examples

> [!example] Marketing analogue (illustrative, not from the paper)
> In a driver model for weekly sales, paid-social impressions correlate 0.8 with TV GRPs because both are bought around the same launches. If only TV drives sales, a forest's marginal permutation importance can still rank paid social highly. The importance comes from co-movement with TV, which plays the role of "severity of illness" in the hospital example. A conditional score asks whether paid social helps predict sales among weeks with similar TV weight.
^example-background-2

## Connections

- The same marginal-vs-conditional split reappears in SHAP as interventional versus observational (conditional) value functions. See [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]] and [[Kumar et al 2020 - Problems with Shapley-Value Explanations - Overview]].
- Conditioning on a common cause is the logic of [[Conditional Independence Assumption]] and of the [[Omitted Variables Bias]] formula.
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] promoted RF importance as a tool for interpreting algorithmic models. This paper is an early, careful check on that practice.

## See Also

- [[Strobl et al 2008 - Conditional Variable Importance - Overview]]
- [[Strobl 2008 - Permutation Importance Null Hypotheses]]: the formal version of the marginal/conditional distinction.
- [[Spurious Regression and Nonsense Correlations]]: the time-series form of spurious association.
