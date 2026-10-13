---
title: "Riley 2020 - Beyond the 10 Events-per-Variable Rule"
tags:
  - source/ingested
  - topic/model-validation
  - topic/overfitting
  - topic/sample-size
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Riley et al 2020 - Calculating the Sample Size Required for Developing a Clinical Prediction Model.pdf]]"
source_location: "BMJ 2020;368:m441, p. 1 (standfirst, Summary points, introduction), pp. 1-2 (introduction: development dataset), p. 2 ('Moving beyond the 10 events per variable rule of thumb')"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Riley et al 2020 - Sample Size for Prediction Models"
doc_type: paper
depends_on:
  - "[[Riley et al 2020 - Sample Size for Prediction Models - Overview]]"
  - "[[Model Selection and Overfitting]]"
used_by:
  - "[[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]]"
  - "[[Riley 2020 - References, Supplements and Back Matter]]"
  - "[[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]"
aliases:
  - 10 EPV rule
  - 10 events per variable
  - Events per candidate predictor parameter
  - EPP (events per predictor parameter)
  - Riley 2020 motivation
---

# Riley 2020 - Beyond the 10 Events-per-Variable Rule

> [!summary]
> The widely used **10 events per variable (10 EPV)** rule is a blanket heuristic from 1990s simulations that studied coefficient bias, not prediction accuracy. Riley et al. rename it **events per candidate predictor parameter (EPP)**: "variable" undercounts because categorical, non-linear and interaction terms need several $\beta$s, and "candidate" matters because overfitting depends on every parameter *considered*. The EPP actually needed is context-specific (below 10 up to 50 have been proposed). It depends on $n$, the outcome proportion and the anticipated model fit. That motivates the tailored four-step procedure.
^summary

## Overview

### Standfirst: the motivating problem (p. 1)

The standfirst under the title frames the whole paper. Clinical prediction models aim to predict outcomes in individuals to inform diagnosis or prognosis. **Hundreds of prediction models are published in the medical literature each year**, yet many are developed on a dataset that is **too small for the total number of participants or outcome events**. This "leads to inaccurate predictions and consequently incorrect healthcare decisions for some individuals" (verbatim, p. 1 standfirst). The article's stated aim is guidance on calculating the sample size needed to develop a model. The causal chain is: undersized development data, then overfitted or imprecise model, then wrong individual predictions, then wrong decisions. The four-step procedure is built to break that chain.

### Introduction

The paper opens (p. 1) by placing prediction models in clinical practice: diagnostic models (outcome present now) and prognostic models (outcome in the future). Examples are the Wells score, QRISK and the Nottingham prognostic index. Most are regression equations: linear for continuous outcomes (e.g. a pain score), logistic for binary outcomes (e.g. pre-eclampsia), proportional hazards for time-to-event outcomes (e.g. VTE recurrence). Predictors are measured "at the intended moment of prediction". The introduction then points to **supplementary material S1** for examples of regression (prediction) equations. S1 is not in the ingested PDF. Box 1 cites the same supplement for criterion C1 (continuous-outcome intercept). See [[Riley 2020 - References, Supplements and Back Matter#Supplementary materials S1-S6: what each is cited for|the supplement map]]. A **development dataset** holds observed predictor values and outcomes from a sample of the target population. Its size "must be large enough to develop a prediction model equation that is reliable when applied to new individuals in the target population" (p. 2). Blanket rules of thumb have caused confusion.

## Main Content

### Summary points

The boxed Summary points (p. 1) contain **nine** bullets, paraphrased here in order:
1. Patients and healthcare professionals need clinical prediction models that accurately guide healthcare decisions.
2. Larger sample sizes lead to more robust models.
3. Data should be of sufficient quality and **representative** of the target population and settings of application.
4. It is better to use all available data for development (**avoid data splitting**) and to use resampling (e.g. bootstrapping) for internal validation.
5. For binary or time-to-event outcomes, a well-known rule of thumb is at least **10 events per predictor parameter**.
6. The actual required size is **context specific**. It depends on events relative to candidate predictor parameters, and also on total participants, the outcome proportion (incidence) and the model's expected predictive performance.
7. The authors propose using that information to **tailor** the sample size to the setting, aiming to **minimise overfitting** while **targeting precise estimates** of key parameters.
8. The proposal is a **four-step procedure** that applies to **continuous, binary or time-to-event** outcomes.
9. The **`pmsampsize`** package in **Stata or R** implements the procedure.

### Effective sample size

> [!definition] Definition: Effective sample size by outcome type (p. 2)
> - **Continuous outcome:** the total number of participants $n$.
> - **Binary outcome:** roughly $\min(\#\text{events}, \#\text{non-events})$.
> - **Time-to-event outcome:** roughly the total number of events.
^def-eff-n

### From EPV to EPP

> [!definition] Definition: Events per candidate predictor parameter, EPP (p. 2)
> $$
> \text{EPP} = \frac{\text{number of outcome events}}{P},
> $$
> where $P$ is the number of **candidate predictor parameters**: every $\beta$ term considered for inclusion, not every predictor and not only the final model's terms.
> - A categorical predictor with $k$ categories contributes $k-1$ parameters (e.g. tumour grade I/II/III gives 2).
> - A non-linear effect of a continuous predictor (age, blood pressure) contributes 2 or more (spline or polynomial terms).
> - Interactions add further parameters.
>
> The paper's rationale (verbatim, p. 2): "the amount of model overfitting is dictated by the total number of predictor parameters considered, not just those included in the final model equation."
^def-epp

The "10 EPV" label is therefore misleading twice. *Variable* undercounts parameters. Counting only *retained* variables ignores the selection step, which is itself a source of overfitting (the same logic as [[Researcher Degrees of Freedom]]).

### History and debate (p. 2)

- The rule is popular for its simplicity and is used to justify sample sizes in papers, grant applications and protocols, "including by ourselves previously".
- The prominent support came from **1990s simulation studies** (Peduzzi, Concato et al., refs 19-21). These looked at **bias and precision of predictor effect estimates**, not the accuracy of **risk predictions**.
- Counter-proposals range from **below 10** to **15, 20 or even 50** EPP (refs 10, 22-26).
- The inconsistency arises because the needed EPP depends on (a) events relative to candidate parameters, (b) total participants, (c) the outcome proportion, and (d) expected predictive performance (refs 13-17). Sample-size calculations for randomised trials are likewise tailored to the setting.
- Continuous outcomes have their own rule of thumb, **two participants per predictor** (Austin & Steyerberg, ref 27). It has the same weaknesses.

> [!theorem] Claim: EPP alone does not determine adequacy (p. 2, with Figs 2-3)
> For fixed $P$, the required $n$, and hence the required EPP, moves with outcome prevalence and anticipated $R^2_{cs}$. Fig. 3 shows the same $P=20$, $R^2_{cs}=0.1$ calculation needing EPP **8.5** at prevalence 0.1 and **25.5** at prevalence 0.3, because max($R^2_{cs}$) differs. No single EPP threshold can be right across settings.
^claim-epp-context

## Examples

> [!example] Counting candidate parameters (illustrative, applying the p. 2 rules)
> Candidate predictors: age (restricted cubic spline, 3 knots, so 2 parameters), sex (1), a 4-level region (3), a biomarker (linear, 1), and an age × sex interaction (1 per age term, so 2). $P = 2+1+3+1+2 = 9$, although only 5 "variables" are involved. With 90 events, EPV $=18$ but EPP $=10$.
^example-1

> [!example] Marketing-analytics illustration (not from the paper)
> A weekly media model with 104 rows considers 8 channels, each with a coefficient, an adstock decay and a saturation half-point (24 parameters), plus 6 seasonal Fourier terms, trend, 4 controls and a holiday dummy. That gives $P\approx 36$ *before* any specification search. Every alternative adstock form or lag tried adds to the effective candidate count. A "10 rows per variable" heuristic would count the 8 channels and wrongly conclude that the data are ample.
^example-2

## Connections

- The rule's failure is a concrete case of the general point in [[Model Selection and Overfitting]]: complexity has to be judged against information content, not raw row counts.
- Counting candidate rather than selected parameters mirrors how the [[Garden of Forking Paths]] counts analyses that *could* have been run.
- The binary-outcome effective-sample-size idea parallels effective sample size in MCMC only loosely (information content vs nominal count).

## See Also

- [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] — the criteria that replace EPP
- [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]] — EPP values implied by the tailored procedure
- [[Power Analysis and Sample Size]] — classical sample-size planning for hypothesis tests
- [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]] — flexibility in analysis inflates false findings
