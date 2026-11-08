---
title: "Degtiar 2023 - Outcome Regression Methods"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]]"
source_location: "Sec. 5.2 (5.2.1 one study, 5.2.2 multiple studies), PDF pp. 16-18"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Degtiar Rose 2023 - Generalizability and Transportability Review"
doc_type: paper
depends_on:
  - "[[Degtiar 2023 - Identifying Assumptions]]"
used_by:
  - "[[Degtiar 2023 - Doubly Robust and Combined Methods]]"
  - "[[Degtiar 2023 - Marketing Application Transporting Experiment Results]]"
aliases:
  - Response surface modeling generalizability
  - Standardization outcome regression generalizability
  - Bayesian evidence synthesis generalizability
  - Bias-adjusted meta-analysis
---

# Degtiar 2023 - Outcome Regression Methods

> [!summary]
> Outcome-regression (response-surface) methods fit conditional means in the study, allowing effects to vary with all effect modifiers, and then **marginalize over the target covariate distribution**. They are precise when modifiers strongly predict the outcome, convenient for CATEs, and rely on extrapolation where there is non-overlap, usually without variance inflation. For multiple studies, the review covers Bayesian bias-adjusted meta-analysis (Eddy, Prevost et al., Turner et al., Greenland), joint regression, and hierarchical Bayesian evidence synthesis (Verde).

## Overview

Outcome regressions "have not been as extensively developed for generalizability and transportability compared to propensity-based approaches." They are most effective when effect modifiers strongly predict the outcome and when the outcome is common but selection into the study is rare. They can usually give **better precision** than weighting or matching since they adjust for confounders, effect modifiers and outcome-only predictors. They are simple to implement if an outcome regression for confounding adjustment already exists and accounts for all relevant modifiers. They work with randomized or observational study data but have mostly been used in RCTs.

## Main Content

### 5.2.1 Outcome data from one study

> [!definition] Outcome-regression (standardization) estimator
> Fit $\hat E(Y\mid S=1,A=a,X)$ in the study and predict counterfactual outcomes for the target sample:
> $$\hat E(Y^a)=\frac1n\sum_{i=1}^n\hat E(Y_i\mid S_i=1,A_i=a,X_i).$$
> If the target sample is not a simple random sample of the target population, use a weighted average with sampling weights (Kim et al. 2018).
^def-outcome-regression

- **Risk**: with significant non-overlap, outcome regressions "rely on heavy extrapolation (Kern et al. 2016; Attanasio, Meghir and Szekely 2003), often with no corresponding inflation of the variance to reflect uncertainty in the resulting estimates."
- **OLS**: fit a regression with interactions between treatment and all effect modifiers, then predict for the target (marginalization step) (Flores and Mitnik 2013; Kern et al. 2016; Elliott and Valliant 2017; Dahabreh et al. 2018, 2019a). Dahabreh et al. (2018) proved consistency for the PATE. For RCTs, **separate regressions per arm** are recommended to capture heterogeneity (Dahabreh et al. 2019a), at the cost of not borrowing information across arms, which machine-learning methods that discover heterogeneity can do.
- **BART** (Chipman, George and McCulloch 2007, 2010; Hill 2011; Kern et al. 2016): the most commonly used data-adaptive outcome regression for this purpose. Models the outcome as a sum of trees with linear additive terms and a regularization prior; discovers heterogeneity data-adaptively; credible intervals from the posterior (Hill 2011; Green and Kern 2012). **Weakness**: credible intervals undercover when the target differs substantially from the RCT (Hill 2011).
- **Data availability issue**: when target covariates are not available in the study (or vice versa) but the SATE is thought approximately unbiased for the PATE, SATE credible intervals can be expanded to reflect uncertainty in the target covariate distribution (Hill 2011).

### 5.2.2 Outcome data from multiple studies

Much of the literature concerns **meta-analytic techniques with summary-level study data** and no target covariate information. These bias-adjusted meta-analyses "largely do not explicitly define a target population", rely on investigator judgments of bias per study, via bias functions or Bayesian priors.

| Method | Idea | Note |
|---|---|---|
| Confidence profile method (Eddy 1989) | adjust likelihoods for design-specific internal and external validity biases (investigator-specified), uncertainty via priors | first such approach; chains of evidence |
| 3-level Bayesian hierarchical model (Prevost, Abrams and Jones 2000) | levels: observed evidence; variability between studies; variability between study types (randomized vs observational) | covariates can be added for heterogeneity |
| Bias-adjusted meta-analysis (Turner et al. 2009) | checklist subjectively quantifies internal and external validity bias per study; down-weights by bias | explicit target population |
| Meta-sensitivity (Greenland 2005) | Bayesian bias-parameter model pooling case-control studies | separates misclassification, non-response, unmeasured confounding |
| Indirect treatment comparison (Phillippo et al. 2018) | individual-level study data plus only covariate moments in target | outcome regression across RCTs |
| Joint regression (Kern et al. 2016) | pool individual-level data if the regression is the same across studies | dominated by observational data when it is the majority; weighted by study sizes; can beat IPPW since it uses target outcomes |
| Hierarchical Bayesian evidence synthesis (Verde et al. 2016; Verde 2019) | summary-level RCT data plus individual-level observational data; control event rate assumed similar; bias term for unmeasured confounding in observational outcome regression | only outcome-regression approach identified that empirically adjusts for unobserved confounding for patients poorly represented in RCTs |
| Bounds (Gechter 2015) | bounds on PATE and PCATE transporting from an RCT to a target with outcomes (all untreated) | partial identification |

**Caution on bias averaging** (Kaizar 2011): the hierarchical bias-adjusted meta-analysis estimator "averages across the internal and external validity biases of the studies and therefore is only unbiased when the external validity bias in the RCT exactly 'cancels' the internal validity bias in the observational data."

## Examples

> [!example] Outcome regression on the geo-test toy
> Per-arm OLS in the study of $Y$ on $x$; predictions $\hat m_1(x_t)-\hat m_0(x_t)$ averaged over the target sample. Over 200 replications the estimator is unbiased (mean $0.600$) and has the lowest variance of the four (sd $0.068$), because the model class contains the truth (linear effect modifier). Its failure mode is model misspecification and extrapolation: the study covers $x\sim N(1,1)$ and the target is centred 1.5 sd away, so 45% of the target lies outside the study's 5th-95th selection-score range ([[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]]). Full code: [[Degtiar 2023 - Marketing Application Transporting Experiment Results]].
> ```python
> def ols(X, y):
>     X1 = np.c_[np.ones(len(X)), X]; b = np.linalg.lstsq(X1, y, rcond=None)[0]
>     return lambda Z: np.c_[np.ones(len(Z)), Z] @ b
> m1, m0 = ols(xs[A==1], Y[A==1]), ols(xs[A==0], Y[A==0])
> pate_hat = (m1(xt) - m0(xt)).mean()
> ```

> [!example] Marketing reading
> This is the standard "calibrate the response curve, then predict the new market" pattern: fit a market-level response model on the test (spend $\times$ market covariates), then predict lift at the rollout markets' covariates and planned spend. In a Bayesian MMM the same logic appears as a hierarchical model with market-level covariates ([[Hierarchical Models]]); the review's warning about uncertainty not inflating under extrapolation is the key diagnostic to demand from such predictions.

## Connections

- Doubly robust combination with weights: [[Degtiar 2023 - Doubly Robust and Combined Methods]].
- Bayesian evidence synthesis of heterogeneous studies echoes the "averaging out" critique in [[Bareinboim 2016 - Transportability and Data Fusion]].
- Bayesian causal inference background: [[Propensity Score in Bayesian CI]], [[Nonparametric Causal Inference]].

## See Also

- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]
