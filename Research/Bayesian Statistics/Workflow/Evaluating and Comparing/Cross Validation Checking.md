---
title: "Cross Validation Checking"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 8.3, pp. 147-148 (Figure 8.9)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Posterior Predictive Checking]]"
  - "[[Overfitting and Information Criteria]]"
used_by:
  - "[[Influence of Individual Data Points]]"
  - "[[Model Selection and Overfitting]]"
  - "[[LOO Model Checking and Comparison - Roaches]]"
  - "[[Diagnosing Variational Inference (PSIS k-hat and VSBC)]]"
  - "[[Forecast Evaluation and Backtesting]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - Four Meanings of Calibration]]"
aliases:
  - "LOO-CV"
  - "LOO-PIT"
  - "Leave-one-out cross validation"
  - "PSIS-LOO"
  - "POT uniformity test"
---

# Cross Validation Checking

> [!summary]
> Posterior predictive checking uses the same data twice, which can make a flexible model look either
> better or worse than it is. The section's demonstration is a case where the naive check **falsely
> reports miscalibration**: the PIT-ECDF for a hierarchical beta-binomial model is S-shaped (apparently
> over-dispersed predictions), but the **LOO-PIT-ECDF is clean** — the S was an artifact of fitting and
> checking on the same observations. The warning runs both ways: **a clean PIT-ECDF is not evidence of
> calibration until cross validation is checked**, because double-use bias can cancel a real
> miscalibration.

## Overview

> [!definition] Why cross-validate a *check* (Ch. 8.3, p. 147)
> "Posterior predictive checking is a flexible tool for revealing model misfit, **but as it uses the same
> data for model fitting and misfit evaluation, it can be overly optimistic or misleading. That is, a
> miscalibrated model can still produce reasonable predictions because of overfitting.**
>
> In **cross validation**, part of the data is left out, the model is fit to the remaining data, and
> predictive performance is checked on the left-out data. **This improves predictive checking diagnostics,
> especially for overparameterized models with more parameters than observations** (Tesso and Vehtari
> 2026). In **leave-one-out (LOO)** cross validation, only one observation is left out at a time."
^def-cv-checking

## Main Content

### The demonstration: a false alarm from double-used data

> [!example] Nabiximols — PIT vs. LOO-PIT (Figure 8.9, Ch. 8.3, pp. 147-148)
> **The data and model** (Ch. 18): 1-4 count observations for **128 people**; a **hierarchical
> beta-binomial model with a varying intercept for each person.** "**The combination of the
> beta-binomial mixture and the varying intercepts makes the model very flexible and potentially prone to
> overfitting.**"
>
> **(a) Ordinary PIT-ECDF.** The curve is **S-shaped, with too many PIT values near 0.5**, and the POT
> uniformity test gives $p^{\text{POT}}_{\text{unif}} = 0.000$ at $\alpha = 0.01$ — apparently decisive
> evidence of miscalibration.
>
> **The naive reading would be:** "**too wide a predictive distribution.**"
>
> **The correct reading:** "**the S shape is due to using the same observations for fitting and checking a
> flexible model, and the centers of the predictive distributions are too close to the observations.**"
> That is, "**the observations tend to be closer to the mean prediction than expected if the model were
> calibrated. In this case, this is an artifact caused by using the same observations for fitting the
> model and checking the model.**"
>
> **(b) LOO-PIT-ECDF.** PIT values computed using leave-one-out predictive distributions:
> $p^{\text{POT}}_{\text{unif}} = 0.28$. "**The artifact is removed, as in cross validation the
> observation used for checking is not used for fitting the model.** In this case, LOO-PIT values have a
> distribution which is close to uniform, and **the beta-binomial model is well calibrated.**"
^ex-loo-pit-artifact

> [!warning] The error runs in both directions
> "**Here posterior PIT checking would falsely claim miscalibration. But posterior PIT checking can also
> overlook miscalibration, if the bias from the double use of the data balances out the miscalibration.
> So a clean PIT-ECDF plot alone should not be read as solid evidence of calibration, until cross
> validation is checked.**"
>
> **When the difference matters:** "**The difference between posterior PIT and LOO-PIT is bigger when
> model complexity is high compared to the number of observations.** In the earlier Kilpisjärvi
> temperature example (Figure 8.6), **[the] model has only two parameters and many observations and
> posterior PIT was sufficient.**"
>
> The practical rule: **effective parameters relative to $n$** determines whether you can skip the
> cross-validated version. A two-parameter regression on 62 observations — fine. A varying-intercept
> mixture on 128 people with 1-4 observations each — not fine.

### The POT uniformity test

> [!definition] Why an ordinary uniformity test won't do (Tesso and Vehtari 2026)
> "**As cross validation induces dependence between LOO-PIT values, we use the pointwise order tests
> (POT) uniformity test, which works also in the case of dependence.**
>
> POT **compares the ECDF to distributions of ordered statistics and combines these tests using truncated
> Cauchy aggregation** (Liu and Xie 2020; Chen, Xu, and Gao 2025)."
>
> **The plots use Shapley values** (Shapley 1953) "**to emphasize the parts of ECDF that explain most of
> the discrepancy from uniformity**" — the thicker segments of the curve in Figure 8.9a mark where the
> non-uniformity is concentrated.
^def-pot-test

### Making it affordable

> [!important] Importance sampling removes the need to refit
> "**Cross validation can be computationally expensive. But efficient approximations to leave-one-out
> cross validation using importance sampling can facilitate practical use, by removing the need to re-fit
> the model when each data point is left out**" (Vehtari, Gelman, and Gabry 2017; Paananen et al. 2021).
>
> This is **PSIS-LOO**, implemented in the `loo` R package. The reliability of the approximation is
> monitored by the **Pareto $\hat{k}$ diagnostic** — see
> [[Influence of Individual Data Points]] and [[Influence of Likelihood and Prior]], where
> $\hat{k} < 0.7$ is the stated threshold for trusting the importance-sampling approximation.
>
> "The case studies in Part 4 of this book include several additional examples of LOO-PIT-ECDF plots for
> model checking."

## Connections

- LOO-PIT is [[Posterior Predictive Checking#The probability integral transformation|the PIT]] computed
  from a predictive distribution that has not seen the point being checked — the checking analogue of
  the fitting/evaluation separation that [[Overfitting and Information Criteria]] formalizes.
- The same LOO machinery serves three distinct purposes in this book: **checking calibration** (here),
  **finding influential points** ([[Influence of Individual Data Points]]), and **comparing models**
  ([[Model Selection and Overfitting]]).
- Which cross-validation scheme to use — leave-one-out, leave-one-unit-out, leave-one-group-out — depends
  on the replication scenario you care about; see
  [[Influence of Individual Data Points#Influence for correlated data]] and
  [[Simulation to Express Uncertainty#The three replication scenarios in a hierarchical model]].

## See Also
- [[Posterior Predictive Checking]] — the check this one corrects
- [[Influence of Individual Data Points]] — pointwise LOO as a diagnostic for observations
- [[Model Selection and Overfitting]] — LOO as a model-comparison criterion
- [[Overfitting and Information Criteria]] — BDA3 background on WAIC and LOO
- [[Diagnosing Variational Inference (PSIS k-hat and VSBC)]] — same PSIS machinery and 0.7 k-hat threshold
- [[Forecast Evaluation and Backtesting]] — time-ordered counterpart to LOO
