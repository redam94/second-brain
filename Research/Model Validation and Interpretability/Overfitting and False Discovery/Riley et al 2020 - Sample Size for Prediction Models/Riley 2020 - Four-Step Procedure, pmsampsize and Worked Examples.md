---
title: "Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples"
tags:
  - source/ingested
  - topic/model-validation
  - topic/sample-size
  - topic/prediction-models
  - type/example
  - method/pmsampsize
  - doc/paper
source: "[[raw/Riley et al 2020 - Calculating the Sample Size Required for Developing a Clinical Prediction Model.pdf]]"
source_location: "BMJ 2020;368:m441, p. 2 (four-step framing), p. 4 (Recommendations and software; Box 1), pp. 4-5 (Applied examples 1-3)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Riley et al 2020 - Sample Size for Prediction Models"
doc_type: paper
depends_on:
  - "[[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD]]"
  - "[[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]]"
  - "[[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]]"
used_by:
  - "[[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]]"
aliases:
  - Riley Box 1
  - pmsampsize
  - pmsampsize worked examples
  - B1-B4 T1-T3 C1-C4 criteria
  - Pre-eclampsia sample size example
---

# Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples

> [!summary]
> **Box 1** turns the four steps into checklists: **B1-B4** for binary outcomes (overall-risk precision, MAPE, shrinkage 0.9, optimism 0.05), **T1-T3** for time-to-event outcomes (no MAPE criterion), and **C1-C4** for continuous outcomes (intercept, residual variance, shrinkage, optimism). The required $n$ is the **maximum** across criteria. `pmsampsize` (Stata/R) computes everything except B2 (BeyondEPV app). Worked examples: **pre-eclampsia** (binary, $P=30$, $\phi=0.05$, $R^2_{cs}=0.05$) needs **5249** women (263 events, EPP 8.75), driven by B3, or 3500 with $P=20$. **Recurrent VTE** (survival, $P=30$, rate 0.065, $R^2_{cs}=0.051$) needs **5143** (692 events, EPP 23.1), driven by T2, or 3429 with $P=20$. **Fat-free mass** (continuous, $P=20$, $R^2=0.9$) needs **254**, driven by residual-SD precision.
^summary

## Overview

The authors combine van Smeden et al. and Riley et al. into "a four step procedure. Each step leads to a sample size calculation, and ultimately the largest sample size identified is the one required" (p. 2). Box 1 is the operational form.

## Main Content

> [!algorithm] Box 1: Recommendations for calculating the sample size for developing a clinical prediction model (p. 4)
> **Aim:** be at least large enough to minimise overfitting and to target sufficiently precise predictions.
>
> **Binary outcomes**, ensure $n$ is enough to:
> - **B1** estimate the overall outcome proportion with sufficient precision (Fig 1)
> - **B2** target a small mean absolute prediction error (Fig 2, if $P \le 30$)
> - **B3** target a shrinkage factor of 0.9 (Fig 3)
> - **B4** target small optimism of 0.05 in the apparent $R^2_{Nagelkerke}$ (Fig 5)
>
> **Time-to-event outcomes**, ensure $n$ is enough to:
> - **T1** estimate the overall outcome proportion precisely at one or more key time points (Fig 1)
> - **T2** target a shrinkage factor of 0.9 (Fig 3)
> - **T3** target small optimism of 0.05 in the apparent $R^2_{Nagelkerke}$ (Fig 5)
>
> **Continuous outcomes**, ensure $n$ is enough to:
> - **C1** estimate the model intercept precisely (supplementary S1 per Box 1; Step 1 text cites S2)
> - **C2** estimate the residual variance with sufficient precision (supplementary S2 per Box 1; Step 2 text cites S3: $n = 234 + P$)
> - **C3** target a shrinkage factor of 0.9 (Fig 3 / S4)
> - **C4** target small optimism of 0.05 in the apparent $R^2_{Nagelkerke}$ (Fig 5 / S6)
>
> **Inputs:** anticipated overall outcome risk or mean outcome value in the target population; number of candidate predictor parameters $P$; anticipated model fit $R^2_{cs}$. **When uncertain, be conservative**: take the values (e.g. the smallest $R^2_{cs}$) that give larger $n$.
>
> **Existing dataset:** the same calculations show whether $n$ suffices to estimate overall risk or the mean, and **how many predictor parameters** can be considered before overfitting becomes a concern.
>
> **Final step:** $n_{\text{required}} = \max(\text{all criteria})$.
^box1

Note: Box 1 and the main text differ slightly in which supplement each continuous criterion points to (S1/S2 in Box 1, S2/S3 in the text). The content of the criteria is unaffected.

### Software

- **`pmsampsize`** for Stata (`ssc install pmsampsize`) and R, led by J. Ensor. It covers every Box 1 criterion except **B2**. Syntax pattern assembled from the three calls printed in the examples: `pmsampsize, type(b|s|c) rsquared() parameters() [prevalence() | rate() timepoint() meanfup() | intercept() sd()]`.
- **BeyondEPV** Shiny app (mvansmeden.shinyapps.io/BeyondEPV) for B2.
- Most useful before prospective data collection, and also when an existing dataset is fixed, to decide how many predictors can be considered.

### Example 1: binary outcome, pre-eclampsia (pp. 4-5)

> [!example] Example 1: Pre-eclampsia (North et al. 2011 model; BMJ pp. 4-5)
> **Context.** The existing model predicts pre-eclampsia from clinical predictors at 15 weeks' gestation (vaginal bleeding, age, previous miscarriage, family history, smoking, alcohol). It has 13 predictor parameters and C statistic 0.71. A new model would add biomarkers and ultrasound measurements.
>
> **Inputs.** Outcome proportion 0.05; $P = 30$ (assumed for illustration); $\max(R^2_{cs}) = 0.33$; assume conservatively 15% of variability explained, so $R^2_{cs} = 0.15\times0.33 = 0.05$.
>
> **Command.** `pmsampsize, type(b) rsquared(0.05) parameters(30) prevalence(0.05)`
>
> **Result.** At least **5249 women**, **263 events**, **EPP 8.75**, driven by **B3** (expected shrinkage 10%).
>
> **B2 separately** (Fig 2 formula): **544** women for MAPE $\le 0.05$, much lower than 5249.
>
> **Other criteria (computed on ingest, not printed in the paper):** B1 $=(1.96/0.05)^2(0.05)(0.95) \approx 73$. B4 uses $S = 0.05/(0.05 + 0.05\times0.33) = 0.752$, giving $n \approx 1758$. So the ordering is B3 (5249) > B4 > B2 (544) > B1 (73).
>
> **If 5249 is impractical**, cut the candidate predictors (e.g. using evidence from systematic reviews of prognostic factors). With $P = 20$, all four criteria need at least **3500 women and 175 events** (still EPP 8.75).
^ex1

EPP stays at 8.75 when $P$ drops because B3's $n$ is exactly proportional to $P$ for fixed $R^2_{cs}$ and $S$, so $n\phi/P$ is invariant. Here the tailored EPP is *below* 10. The rule of thumb is not always conservative.

### Example 2: time-to-event outcome, recurrent VTE (p. 5)

> [!example] Example 2: Recurrent venous thromboembolism (Ensor et al. 2016 model; BMJ p. 5)
> **Context.** Many prognostic models predict recurrence after stopping treatment for a first VTE. Ensor et al.'s model uses age, sex, site of first clot, D-dimer, and the lag from treatment cessation to D-dimer measurement (often about 30 days). C statistic 0.69; adjusted $R^2_{cs} = 0.051$ (8% of total variation). A new model would add predictors.
>
> **Inputs** (all based on Ensor et al.): key time point 2 years; $P = 30$; mean follow-up 2.07 years; event rate 0.065 (65 recurrences per 1000 person-years); conservative $R^2_{cs} = 0.051$.
>
> **Command.** `pmsampsize, type(s) rsquared(0.051) parameters(30) rate(0.065) timepoint(2) meanfup(2.07)`
>
> **Result.** At least **5143 participants**, **692 events**, **EPP 23.1**, "considerably more than 10 EPP". It is driven by **T2** (shrinkage of only 10%) given only 8% of variation explained. With $P = 20$: **3429** (still EPP 23.1).
>
> **Check on ingest:** $30/[(0.9-1)\ln(1-0.051/0.9)] = 5142.7$; events $= 5143 \times 2.07 \times 0.065 \approx 692$. T1 alone (margin 0.05 around $F(2)=0.122$) needs only about 326 person-years, roughly 158 participants at 2.07 years' mean follow-up.
^ex2

### Example 3: continuous outcome, fat-free mass (p. 5)

> [!example] Example 3: Fat-free mass in children (Hudda et al. 2019 model; BMJ p. 5)
> **Context.** The model predicts fat-free mass in children aged 4-15 from height, weight, age, sex and ethnicity (10 predictor parameters). It is used to estimate current fat mass (weight minus predicted fat-free mass). External validation $R^2_{cs} = 0.90$. Suppose it must be updated in 10 years (population changes) with 10 more parameters, so $P = 20$.
>
> **Inputs.** $R^2_{cs} = 0.90$; $P = 20$; mean fat-free mass 26.7 kg, SD 8.7 kg (from Hudda et al.).
>
> **Command.** `pmsampsize, type(c) rsquared(0.9) parameters(20) intercept(26.7) sd(8.7)`
>
> **Result.** At least **254 participants**, 12.7 per predictor parameter. This is driven by precise estimation of the residual SD ($234 + 20 = 254$). Only **68** participants are needed to minimise overfitting.
>
> **Labelling inconsistency in the source:** the text says the 254 is "criterion C3" and the 68 is "criteria C1 and C2". Under Box 1's own labels, residual-variance precision is **C2** and shrinkage/optimism are **C3/C4**. The arithmetic ($234 + P$) identifies the binding criterion as residual SD precision (Box 1 C2).
^ex3

## Examples

> [!example] Reproducing the binary and survival results (python)
> ```python
> import math
> def n_B3(P, R2, S=0.9): return P / ((S-1)*math.log(1-R2/S))
> print(math.ceil(n_B3(30, 0.05)), math.ceil(n_B3(20, 0.05)))     # 5249 3500
> print(math.ceil(n_B3(30, 0.051)), math.ceil(n_B3(20, 0.051)))   # 5143 3429
> print(5249*0.05/30, 5143*2.07*0.065/30)                          # 8.75, ~23.1
> ```
^example-1

> [!example] Using Box 1 on an existing dataset (marketing illustration, not from the paper)
> A team has 156 weekly observations of a continuous KPI and wants to know how many candidate parameters to allow. Out-of-sample $R^2$ from similar past models is about 0.6. Box 1 run in reverse: C2 ($234 + P$) already exceeds 156 for any $P$, so the residual SD, and therefore prediction intervals, will be imprecise. Read with the Fig 3 shrinkage expression as a rough guide (exact continuous formula in S4), $S = 0.9$ allows only about $P \approx 156\times0.1\times-\ln(1-0.6/0.9) \approx 17$ parameters. That is the budget for *all* channel, carryover, saturation, seasonality and control parameters *and* the specification search. Reducing autocorrelated rows to an effective count would shrink it further.
^example-2

## Connections

- The "take the maximum over criteria" rule matches multi-objective trial design: each criterion protects a different failure mode (miscalibration-in-the-large, average error, overfitting, optimistic reporting).
- Example 1's B3 dominance shows that **overfitting, not precision of the mean, is usually the binding constraint**. Reducing $P$ through prior evidence is a pre-specification discipline, the opposite of the data-driven selection criticised in [[Researcher Degrees of Freedom]] and [[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]].
- Comparable planning arithmetic for experiments: [[Power Analysis and Sample Size]].

## See Also

- [[Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD]]
- [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]]
- [[Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum]]
- [[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating]] — what to do when the computed $n$ is out of reach
