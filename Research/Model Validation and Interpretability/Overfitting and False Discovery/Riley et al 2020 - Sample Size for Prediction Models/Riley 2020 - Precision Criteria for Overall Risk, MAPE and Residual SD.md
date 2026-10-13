---
title: "Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD"
tags:
  - source/ingested
  - topic/model-validation
  - topic/sample-size
  - topic/prediction-models
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Riley et al 2020 - Calculating the Sample Size Required for Developing a Clinical Prediction Model.pdf]]"
source_location: "BMJ 2020;368:m441, p. 2 (Step 1), pp. 2-3 (Step 2), Fig 1 (p. 9), Fig 2 (p. 10); supplementary S2-S3 referenced but not in PDF"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Overfitting and False Discovery/Riley et al 2020 - Sample Size for Prediction Models"
doc_type: paper
depends_on:
  - "[[Riley et al 2020 - Sample Size for Prediction Models - Overview]]"
  - "[[Riley 2020 - Beyond the 10 Events-per-Variable Rule]]"
  - "[[Power Analysis and Sample Size]]"
used_by:
  - "[[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]]"
aliases:
  - Riley Step 1 overall risk precision
  - Riley Step 2 mean absolute prediction error
  - van Smeden MAPE sample size formula
  - 234+P residual SD rule
  - Criterion B1
  - Criterion B2
---

# Riley 2020 - Precision Criteria for Overall Risk, MAPE and Residual SD

> [!summary]
> Steps 1 and 2 of Riley et al.'s procedure are **precision** criteria. **Step 1** sizes the study so the null-model intercept (overall risk or mean) is estimated within a margin $\delta \le 0.05$: $n = (1.96/\delta)^2\hat\phi(1-\hat\phi)$ for binary outcomes (385 at $\phi=0.5$), and person-years $T$ under an exponential model for survival (2366 person-years for a 10-year risk of 0.632 at rate 0.10). **Step 2** sizes it so predictions are accurate across the range. For binary outcomes it uses van Smeden's simulation-derived $\ln(\text{MAPE}) = -0.508 - 0.544\ln n + 0.259\ln\phi + 0.504\ln P$ (461 participants for $\phi=0.3$, $P=10$, MAPE 0.05). For continuous outcomes it needs $n = 234 + P$ for a residual SD within 10%.
^summary

## Overview

A model that cannot even reproduce average risk in the target population is miscalibrated-in-the-large, whatever its discrimination. Step 1 is the floor. Step 2 asks for more: the whole set of individual predictions should be close to the truth on average. Both are *precision* targets, as opposed to the *overfitting* targets of Steps 3-4 ([[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]]).

## Main Content

### Step 1: precise overall outcome risk or mean (p. 2, Fig 1)

The intercept must be precise so the model predicts the mean outcome (continuous) or overall proportion (binary, time-to-event) accurately. A simple target is the intercept of the **null model** (no predictors). The recommended margin of error is $\le 0.05$.

> [!theorem] Criterion B1: binary outcome (Fig 1, p. 9)
> The approximate 95% CI for the overall proportion $\phi$ is $\hat\phi \pm 1.96\sqrt{\hat\phi(1-\hat\phi)/n}$. The absolute margin of error is $\delta = 1.96\sqrt{\hat\phi(1-\hat\phi)/n}$. Solving for $n$:
> $$n = \left(\frac{1.96}{\delta}\right)^2 \hat\phi\,(1-\hat\phi).$$
> **Worked values** ($\delta = 0.05$): $\phi=0.5$ gives $n = (1.96/0.05)^2 \times 0.25 = 384.2$, so **385** participants (about $385\times0.5 = 193$ with the outcome), targeting CI 0.45-0.55. $\phi=0.1$ gives **139** and $\phi=0.2$ gives **246** (p. 2).
^fig1-binary

> [!theorem] Criterion T1: time-to-event outcome (Fig 1, p. 9)
> Assume an exponential survival model (constant event rate $\lambda$). The cumulative incidence at time $t$ is $F(t) = 1-\exp(-\hat\lambda t)$, with $\hat\lambda$ = events per person-year. The variance of $\hat\lambda$ is $\hat\lambda/T$, where $T$ = total person-years of follow-up. The approximate 95% CI for $F(t)$ is
> $$1-\exp\!\left(-\left(\hat\lambda \pm 1.96\sqrt{\hat\lambda/T}\right)t\right).$$
> Prespecify the anticipated $\lambda$ and the key time point $t$, then choose $T$ so that both CI bounds lie within (say) 0.05 of $F(t)$.
>
> **Worked value:** $t = 10$ years, $\lambda = 0.10$, so $F(10) = 1-e^{-1} = 0.632$. With $T = 2366$ person-years: $1-\exp(-(0.10 \pm 1.96\sqrt{0.10/2366})\times 10) = 0.582$ to $0.676$. Both bounds are within 0.05 of 0.632 (verified numerically: 0.5821 and 0.6761).
^fig1-tte

> [!note] Continuous outcome (criterion C1)
> The anticipated mean and variance of the outcome, plus the anticipated percentage of variation explained, must be prespecified. The Step 1 text (p. 2) sends readers to supplementary S2 for details; Box 1 (p. 4) points C1 to "supplementary material 1" instead. Neither supplement is in the PDF.
^note-1

### Step 2: small mean error across all individuals (pp. 2-3, Fig 2)

> [!definition] Definition: Mean absolute prediction error, MAPE (Fig 2, p. 10)
> The average absolute difference between the model's estimated outcome probabilities and the true probabilities, over individuals in the intended setting. It is the average error one is willing to allow.
^definition-1

> [!theorem] Criterion B2: van Smeden MAPE formula (Fig 2, p. 10)
> From simulation across many scenarios, van Smeden et al. (2019) found that the main drivers of a model's mean predictive accuracy are $P$, $n$ and $\phi$. Their fitted approximation is
> $$\ln(\text{MAPE}) = -0.508 - 0.544\ln(n) + 0.259\ln(\phi) + 0.504\ln(P).$$
> Rearranged for a target MAPE:
> $$n = \exp\!\left(\frac{-0.508 + 0.259\ln\phi + 0.504\ln P - \ln(\text{MAPE})}{0.544}\right).$$
> **Conditions:** $\phi \le 0.5$ (if the proportion exceeds 0.5, use $\phi = 1 - $ proportion); $P \le 30$. The formula was originally derived for $\le 12$ parameters and later updated by simulation to $\le 30$. Recommended MAPE $\le 0.050$, lower when wrong decisions are costly.
>
> **Worked values:** $\phi=0.30$, $P=10$, MAPE 0.050 gives $n = 460.9$, so **461** participants (about 138 events, EPP **13.8**). MAPE 0.04 gives **695** (about 209 events, EPP **20.8**).
^fig2-mape

Reading the coefficients: MAPE falls as $n^{-0.544}$, roughly the $1/\sqrt n$ of parametric estimation. It rises as $P^{0.504}$, roughly $\sqrt P$. So holding MAPE fixed requires $n$ to grow about linearly in $P$ ($0.504/0.544 \approx 0.93$). That is why an "events per parameter" idea is not absurd, but the constant depends on $\phi$.

Software: the interactive Shiny tool `BeyondEPV` (mvansmeden.shinyapps.io/BeyondEPV) implements B2. It is *not* in `pmsampsize`. Work to extend it to $P > 30$ and to time-to-event outcomes was ongoing at publication.

> [!theorem] Criterion C2: continuous outcome residual SD (p. 3; supplementary S3)
> Accurate predictions across the range require the **residual standard deviation** to be estimated precisely. To target a multiplicative error below 10% in the estimated residual SD:
> $$n = 234 + P.$$
^res-sd

*Reconstruction (not in the PDF; S3 holds the authors' derivation):* the 234 matches an exact chi-square CI for a variance. With $\nu = n-P-1$ residual degrees of freedom, the upper 95% bound for $\sigma$ relative to $\hat\sigma$ is $\sqrt{\nu/\chi^2_{0.025,\nu}}$. Requiring this to be $\le 1.1$ (a multiplicative error under 10%) gives $\nu \ge 233$ (checked numerically with `scipy.stats.chi2`), so $n = \nu + P + 1 = 234 + P$. The cruder normal approximation $1.96/\sqrt{2\nu} \le 0.1$ gives only $\nu \gtrsim 192$, because the chi-square bounds are asymmetric. That this reconstruction reproduces 234 exactly is a consistency check, not a quotation of S3.

## Examples

> [!example] Step 1 and 2 numbers verified (python)
> ```python
> import math
> z = 1.96
> n_B1 = lambda phi, d=0.05: z**2*phi*(1-phi)/d**2
> print([math.ceil(n_B1(p)) for p in (0.5, 0.1, 0.2, 0.05)])   # [385, 139, 246, 73]
> n_B2 = lambda phi, P, m=0.05: math.exp((-0.508+0.259*math.log(phi)+0.504*math.log(P)-math.log(m))/0.544)
> print(round(n_B2(0.3, 10), 1), round(n_B2(0.3, 10, 0.04), 1))  # 460.9 694.6
> lam, t, T = 0.10, 10, 2366
> ci = [1-math.exp(-(lam+s*z*math.sqrt(lam/T))*t) for s in (-1, 1)]  # [0.582, 0.676]
> ```
^example-1

> [!example] Marketing-analytics illustration (not from the paper)
> For a churn or conversion propensity model with base rate 0.05 and 25 candidate parameters, B1 needs only 73 rows. B2 at MAPE 0.05 needs $\exp((-0.508+0.259\ln 0.05+0.504\ln 25+3.0)/0.544) \approx 459$. Neither is the binding constraint. The shrinkage criterion usually is (see [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples#^ex1|Example 1]]).
^example-2

## Connections

- Step 1 is the sample-size version of **calibration-in-the-large**. Fixing it alone is also all that intercept-only model updating needs ([[Riley 2020 - Extensions - Subgroups, Variable Selection, ML and Model Updating#Model updating]]). For the several meanings of "calibration" in the vault, see [[Q - Four Meanings of Calibration]].
- The van Smeden formula is a **meta-model fitted to simulation output**, so the generalisation caveats in [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] and [[Designing Simulated-Data Experiments]] apply: it is valid only inside the simulated scenario range.
- Margin-of-error planning, rather than power planning, mirrors [[Power Analysis and Sample Size]].

## See Also

- [[Riley 2020 - Shrinkage and Optimism Criteria for Overfitting]] — Steps 3-4
- [[Riley 2020 - Four-Step Procedure, pmsampsize and Worked Examples]] — how B1/B2 combine with B3/B4
- [[Forecast Evaluation and Backtesting]] — measuring realised prediction error out of sample
