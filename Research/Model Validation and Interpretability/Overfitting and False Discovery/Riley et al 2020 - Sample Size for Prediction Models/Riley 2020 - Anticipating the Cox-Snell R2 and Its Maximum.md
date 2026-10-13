---
title: "Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum"
tags:
  - source/ingested
  - topic/model-validation
  - topic/sample-size
  - topic/prediction-models
  - type/definition
  - type/concept
  - doc/paper
source: "[[raw/Riley et al 2020 - Calculating the Sample Size Required for Developing a Clinical Prediction Model.pdf]]"
source_location: "BMJ 2020;368:m441, p. 3 (R2cs, signal:noise, max(R2cs) values), p. 4 (Nagelkerke R2), Fig 4 (p. 11); supplementary S5 referenced but not in PDF"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Riley et al 2020 - Sample Size for Prediction Models"
doc_type: paper
depends_on:
  - "[[Riley et al 2020 - Sample Size for Prediction Models - Overview]]"
used_by:
  - "[[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]]"
  - "[[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]"
aliases:
  - Cox-Snell R2 for sample size
  - max(R2cs)
  - Maximum Cox-Snell R-squared
  - Nagelkerke R2 (Riley 2020)
  - Choosing anticipated R2cs
---

# Riley 2020 - Anticipating the Cox-Snell R2 and Its Maximum

> [!summary]
> The shrinkage and optimism criteria need one hard-to-know input: the anticipated **Cox-Snell $R^2_{cs}$** of the new model, which measures signal:noise. For continuous outcomes it is the ordinary $R^2 \in [0,1]$. For binary and survival outcomes it is capped at **max($R^2_{cs}$)**, which depends on the outcome proportion: 0.75, 0.74, 0.71, 0.63, 0.48, 0.33 and 0.11 at prevalence 0.5, 0.4, 0.3, 0.2, 0.1, 0.05 and 0.01. Nagelkerke's $R^2 = R^2_{cs}/\max(R^2_{cs})$ rescales it to $[0,1]$. Fig 4 gives three ways to choose $R^2_{cs}$: (1) take it from existing models in the same setting; (2) convert from reported C statistic, LR statistic, Royston's D or other pseudo-$R^2$s, adjusting for optimism; (3) default to $R^2_{Nagelkerke} = 0.15$, i.e. $R^2_{cs} = 0.15\max(R^2_{cs})$, or 0.5 when "direct" mechanistic predictors are present.
^summary

## Overview

Every overfitting-based sample size depends on how much signal the model is expected to find. Anticipating $R^2_{cs}$ plays the role that anticipating an effect size plays in a trial power calculation (p. 3): external evidence and expert opinion are needed, and when unsure the choice should be **conservative** (smaller $R^2_{cs}$, hence larger $n$).

## Main Content

> [!definition] Definition: Cox-Snell $R^2$ (p. 3; Cox & Snell 1989)
> $R^2_{cs}$ is a generalised coefficient of determination. Standard form (not printed in the PDF):
> $$R^2_{cs} = 1 - \exp\!\left(-\frac{\text{LR}}{n}\right) = 1 - \left(\frac{L_0}{L_{\text{model}}}\right)^{2/n},$$
> with $L_0$ the null-model likelihood and LR the likelihood-ratio $\chi^2$. For linear regression with normal errors it equals the usual $R^2$, the proportion of outcome variance explained. It reflects the **signal:noise ratio**: near 1 means patterns are easy to detect and more parameters can be estimated; near 0 means overfitting is likely and fewer parameters can be estimated reliably.
^def-r2cs

> [!definition] Definition: max($R^2_{cs}$) and Nagelkerke $R^2$ (pp. 3-4)
> For binary and time-to-event outcomes $R^2_{cs}$ is bounded by $\max(R^2_{cs}) = 1 - L_0^{2/n}$, attained by a perfect model. It depends on the outcome proportion or rate and is often much less than 1. For continuous outcomes the maximum is 1.
>
> Nagelkerke's $R^2$ rescales: $R^2_{Nagelkerke} = R^2_{cs}/\max(R^2_{cs}) \in [0,1]$, called "a fundamental overall measure of model fit" (p. 4).
^def-nagelkerke

> [!theorem] max($R^2_{cs}$) for logistic regression (p. 3; derivation in supplementary S5)
> | outcome proportion $\phi$ | 0.5 | 0.4 | 0.3 | 0.2 | 0.1 | 0.05 | 0.01 |
> |---|---|---|---|---|---|---|---|
> | max($R^2_{cs}$) | 0.75 | 0.74 | 0.71 | 0.63 | 0.48 | 0.33 | 0.11 |
>
> **Reconstruction (S5 not in the PDF).** For a binary outcome, $\ln L_0 = n[\phi\ln\phi + (1-\phi)\ln(1-\phi)]$, so
> $$\max(R^2_{cs}) = 1 - \left[\phi^{\phi}(1-\phi)^{1-\phi}\right]^2.$$
> This reproduces the table: 0.750, 0.740, 0.705, 0.632, 0.478, 0.328, 0.106.
>
> **Consequence:** "the anticipated R2cs might be small, even for a model with potentially good performance" (p. 3). At a prevalence of 0.05, an excellent model still has $R^2_{cs} \le 0.33$.
^tab-maxr2

### Fig 4: how to choose the anticipated $R^2_{cs}$ (p. 11)

> [!algorithm] Choosing $R^2_{cs}$ before data collection (Fig 4)
> 1. **Use values reported directly for existing models.** Look for $R^2_{cs}$ reported (or requestable) for prediction models in the same or similar population, outcome and time point. Sources: systematic reviews of prediction models (ref 36) and model registries (e.g. Tufts PACE, ref 37). When the new model updates or extends an existing model in the same setting with similar outcome proportion, the existing model's $R^2_{cs}$ is a **conservative** value for the new one.
> 2. **Derive from other reported performance measures.** Riley et al. 2019 (Part II) show how to recover $R^2_{cs}$ from the likelihood-ratio statistic, the **C statistic (AUC)**, **Royston's D**, or other pseudo-$R^2$s: Nagelkerke's, McFadden's, O'Quigley's, Royston's, and Royston & Sauerbrei's. If the value comes from a *development* study, **adjust it for optimism** first to get an honest estimate.
> 3. **No existing information: default.** Assume $R^2_{Nagelkerke} = 0.15$, i.e. $R^2_{cs} = 0.15\times\max(R^2_{cs})$ (Fig 4: "such that 15% of the total variance is explained"). Medical diagnosis and prognosis are generally **low signal:noise**, with $R^2_{Nagelkerke}$ commonly 0.1-0.2. **Exception:** with "direct" (mechanistic) predictors, such as the baseline version of the outcome (smoking status at baseline to predict smoking at one year) or direct process measures (physiological function in intensive care to predict death within 48 h), use $R^2_{Nagelkerke} = 0.5$, i.e. $R^2_{cs} = 0.5\max(R^2_{cs})$.
^fig4

## Examples

> [!example] Applying the default (Example 1, p. 4-5)
> Pre-eclampsia, $\phi = 0.05$, so $\max(R^2_{cs}) = 0.33$. Assume conservatively 15% of variability explained: $R^2_{cs} = 0.15\times0.33 \approx 0.05$.
^example-1

> [!example] Using a reported adjusted value (Example 2, p. 5)
> Recurrent VTE model: C statistic 0.69, adjusted $R^2_{cs} = 0.051$, "corresponding to 8% of the total variation". This value is used directly as the conservative anticipated $R^2_{cs}$.
^example-2

> [!example] Verified max($R^2_{cs}$) (python)
> ```python
> import math
> maxR2 = lambda p: 1 - math.exp(2*(p*math.log(p) + (1-p)*math.log(1-p)))
> print([round(maxR2(p), 2) for p in (.5, .4, .3, .2, .1, .05, .01)])
> # [0.75, 0.74, 0.71, 0.63, 0.48, 0.33, 0.11]
> ```
^example-3

> [!example] Marketing-analytics illustration (not from the paper)
> For a conversion model with base rate 0.02, $\max(R^2_{cs}) \approx 0.18$. A "decent" model at $R^2_{Nagelkerke}=0.15$ has $R^2_{cs} \approx 0.027$. With 40 candidate features, B3 then needs $n \approx 40/(0.1\times -\ln(1-0.027/0.9)) \approx 13{,}300$ users, about 266 conversions (EPP 6.6). The low base rate keeps the event count modest, but the low signal pushes $n$ up. For a weekly aggregate-KPI regression (continuous), the anticipated $R^2$ should be an **out-of-sample** figure from comparable past models, adjusted for optimism, not the in-sample fit that trend and seasonality inflate.
^example-4

## Connections

- Choosing $R^2_{cs}$ from previous models is a prior-elicitation step, comparable to setting effect-size priors and checking them with [[Prior Predictive Checking]].
- Optimism-adjusting a reported $R^2$ is the same correction as in [[Overfitting and Information Criteria]].
- A conservative choice of $R^2_{cs}$ is like planning on a pessimistic effect size in [[Power Analysis and Sample Size]] to guard against [[Type S and Type M Errors]].

## See Also

- [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] — where $R^2_{cs}$ and max($R^2_{cs}$) enter
- [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]
