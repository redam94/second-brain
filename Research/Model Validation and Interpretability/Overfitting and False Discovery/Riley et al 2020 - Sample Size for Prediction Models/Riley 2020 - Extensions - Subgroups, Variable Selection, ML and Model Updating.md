---
title: "Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating"
tags:
  - source/ingested
  - topic/model-validation
  - topic/overfitting
  - topic/sample-size
  - topic/machine-learning
  - type/concept
  - doc/paper
source: "[[raw/Riley et al 2020 - Calculating the Sample Size Required for Developing a Clinical Prediction Model.pdf]]"
source_location: "BMJ 2020;368:m441, pp. 5-6 ('Extensions and further topics': key subgroups; existing dataset; variable selection; machine learning; model updating) and p. 6 ('Conclusion')"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Riley et al 2020 - Sample Size for Prediction Models"
doc_type: paper
depends_on:
  - "[[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]"
  - "[[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]]"
used_by:
  - "[[Riley 2020 - References, Supplements and Back Matter]]"
  - "[[Riley et al 2020 - Sample Size for Prediction Models - Overview]]"
aliases:
  - Riley 2020 extensions
  - Machine learning is data hungry (Riley 2020)
  - Sample size for model updating
  - Avoid data splitting (Riley 2020)
---

# Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating

> [!summary]
> Beyond Box 1: (1) accurate predictions in **key subgroups** need precisely estimated predictor effects; precision depends on effect size, predictor variance, collinearity, $n$ and prevalence, and sparse categories risk **separation**. (2) With an **existing dataset**, the criteria show whether it is too small and how many predictors can be considered; data reduction should be done blind to outcome associations, since a "quick look" increases overfitting. (3) **Variable selection / lasso / elastic net** offer no guarantee: penalties are imprecisely estimated and selected subsets are unstable. (4) **Machine learning** may need more than 10 times the EPP of logistic regression and can be unstable even above 200 EPP. (5) **Model updating** that only recalibrates the intercept needs just B1/T1/C1, and constrained updating needs one parameter for the old predictors. **Conclusion:** use more data if possible, keep data representative, **do not split data**; use all of it with bootstrap internal validation. External validation needs its own sample-size approach.
^summary

## Overview

The "Extensions and further topics" section (pp. 5-6) answers what Box 1 does not: what to do when predictions must be accurate within subgroups, when the dataset already exists, when predictors are selected or penalised, when the model is a machine-learning algorithm rather than a regression, and when an existing model is updated rather than built from scratch. The Conclusion (p. 6) then restates the main practical advice. Every subsection treats Box 1 as a minimum: each extension either adds requirements (subgroups, ML) or shows where the requirement can be reduced (constrained updating).

## Main Content

### Accurate predictions in key subgroups

A stricter goal than Box 1 is accurate predictions within subgroups defined by key predictor values or categories (Maxwell et al., ref 48). One route is to estimate key predictor effects precisely.

> [!definition] Determinants of predictor-effect precision (p. 5)
> - **Binary / time-to-event:** effect magnitude; variance of the predictor; its correlation with other predictors; $n$; outcome proportion or rate (refs 49-51; variance-inflation approaches of Hsieh, Schmoor).
> - **Continuous:** $n$; residual variance; correlation with other included predictors; variance of the predictor (refs 48, 52-55).
>
> For important **categorical** predictors, large samples may be needed to avoid **separation** (no events or no non-events in some category) and **sparse-data bias** (Greenland et al., ref 56).
^definition-1

### Existing datasets

> [!algorithm] Using Box 1 when the dataset already exists (p. 5)
> 1. Check whether the dataset is **too small** (e.g. overall risk cannot be estimated precisely). If so, "the collection of further data is required" (p. 5, refs 57-58). *Interpretation, not the paper's text:* the two cited references are about big datasets from e-health records and individual participant data (IPD) meta-analysis (see [[Riley 2020 - References, Supplements and Back Matter#^tab-refs|refs 57-58]]), so those are likely routes, but the paper itself does not name a data source.
> 2. Use the criteria to find **how many predictor parameters** can be considered before overfitting becomes a concern.
> 3. Fit the full model with all candidate predictors and use its **shrinkage estimate** to judge whether to reduce dimension (e.g. principal components).
> 4. Do the data reduction **blind to the estimated predictor effects** in the full model. Otherwise decisions are influenced by a "quick look" at the results, which increases overfitting.
^algorithm-1

### Variable selection and penalisation

- More research is needed on sample size with variable selection, especially **lasso** and **elastic net**, which shrink and select simultaneously and even allow $P > n$ or $P >$ events (high-dimensional settings).
- They give **no guarantee** of solving overfitting in the dataset at hand. Penalty and shrinkage factors are estimated from the development data, and "such estimates will often be hugely imprecise" (p. 6).
- The selected subset may be **highly unstable** (refs 60-63): repeating development on another sample of the same size can select a different subset and miss important predictors, especially when $n$ is small.
- In healthcare the final predictor set matters for cost, time, burden (blood tests, invasiveness) and measurement requirements.

### Machine learning

> [!theorem] Claim: ML is data hungry (p. 6; van der Ploeg et al. 2014, ref 26)
> For individualised risk prediction with binary outcomes, machine-learning methods (random forests, neural networks, deep learning) **could need more than 10 times as many events per predictor** as logistic regression to achieve a small amount of overfitting. They may show **instability and high optimism even with more than 200 EPP**.
>
> **Mechanism:** the number of predictor ("feature") parameters considered by ML usually far exceeds that for regression even with the same predictors, because ML routinely examines many interactions and categorises continuous predictors.
>
> **Conclusion of the section:** ML is "not immune to sample size requirements" and may need truly big data before its advantages (non-linearity, complex interactions) pay off. Most medical datasets suit regression (with penalisation and shrinkage) better, which also gives a transparent equation that eases implementation, validation and graphical display.
^theorem-1

### Model updating

> [!definition] Sample size for model updating (p. 6)
> - **Full re-estimation** of an existing model on a new dataset: apply Box 1 with $P$ = original parameters + new parameters.
> - **Intercept-only recalibration** (calibration-in-the-large; or baseline survival), with other coefficients fixed at existing values: $n$ need only meet **C1, B1 or T1** (precise mean or overall risk).
> - **Constrained updating:** existing effects revised as original values times a common constant, so the old predictors cost **one** parameter, plus any new parameters.
>
> Updating techniques like these reduce the required $n$ compared with re-estimating every parameter without constraint (refs 66-67).
^definition-2

### Conclusion

- Larger samples give more robust models. Box 1 gives the **minimum**. "if larger sample sizes are achievable than our guidance suggests, use it!" (p. 6).
- Data must be of sufficient quality and **representative** of the target population and settings (PROBAST, refs 68-69).
- Careful model building afterwards. Verbatim (p. 6): "we do not recommend data splitting (eg, into model training and testing samples), as this is inefficient and it is better to use all the data for model development, with resampling methods (such as bootstrapping) used for internal validation."
- External information can supplement the development dataset (refs 72-74).
- Sample size for **external validation** of an existing model needs a different approach (refs 75-78).

## Examples

> [!example] Marketing-analytics translation (illustrative, not from the paper)
> - *Per-segment models:* fitting a separate tree model of a shared aggregate KPI for each segment multiplies the candidate parameter count and divides $n$. The ML finding (more than 10x EPP) argues for pooled or hierarchical regression with shrinkage, not per-segment gradient boosting, at weekly-data scale.
> - *Choosing among model fits by an in-sample quantity* (e.g. total attribution mass or in-sample $R^2$) is the "quick look" problem: selection informed by the outcome increases overfitting. Pre-specify reductions, or nest the whole selection inside the resampling loop.
> - *Recalibrating a model to a new period:* if only the base level has shifted, intercept-only updating (B1/C1-sized data) is enough. Re-estimating every channel effect on a few new months is not.
^example-1

## Connections

- Selection instability: [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]. Many near-equivalent subsets and fits: [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]].
- ML vs regression data needs: [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] argues for algorithmic models. This paper adds that their flexibility costs sample size.
- "Quick look" bias and blind data reduction: [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]. Note the tension: the cure for forking paths is often to split the sample, while Riley et al. prefer full-data development plus bootstrap of the *whole* modelling procedure.
- Internal validation by resampling: [[Cross Validation Checking]]. For time-indexed data, [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]] and [[Forecast Evaluation and Backtesting]].
- Bayesian alternatives to lasso-type selection: [[Spike-and-Slab Prior for Covariate Selection]], [[Regularized Horseshoe (Finnish Horseshoe)]].

## See Also

- [[Riley et al 2020 - Sample Size for Prediction Models - Overview]]
- [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]
- [[SR 11-7 - Model Risk Management Guidance - Overview]] — development-data adequacy as part of model risk
