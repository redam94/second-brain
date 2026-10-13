---
title: "Riley et al 2020 - Sample Size for Prediction Models"
tags:
  - source/ingested
  - topic/model-validation
  - topic/overfitting
  - topic/sample-size
  - type/concept
  - doc/paper
source: "[[Research/Model Validation/raw/model-validation-references.md]]"
source_location: "BMJ 368, m441 (2020); quoted pp. 2, 3, 6 of 12"
citation: "Riley, R. D., Ensor, J., Snell, K. I. E., Harrell, F. E., Martin, G. P., Reitsma, J. B., Moons, K. G. M., Collins, G. & van Smeden, M. (2020). Calculating the sample size required for developing a clinical prediction model. BMJ, 368, m441."
date_ingested: 2026-10-13
folder: "Model Validation/Overfitting and Analytic Flexibility"
doc_type: paper
depends_on:
  - "[[Power Analysis and Sample Size]]"
  - "[[Model Checking]]"
used_by:
  - "[[Simmons et al 2011 - False-Positive Psychology]]"
  - "[[Ioannidis 2005 - Why Most Published Research Findings Are False]]"
  - "[[Chan and Perry 2017 - Challenges in Media Mix Modeling]]"
  - "[[Meinshausen and Buhlmann 2010 - Stability Selection]]"
  - "[[Morris et al 2019 - Using Simulation Studies to Evaluate Methods]]"
aliases:
  - "Riley 2020"
  - "Riley et al. 2020"
  - "Sample size for prediction models"
  - "Riley sample-size criteria"
---

# Riley et al 2020 - Sample Size for Prediction Models

> [!summary]
> Riley et al. give a principled, closed-form way to decide whether a dataset is large enough to *develop* a prediction model, replacing the "10 events per variable" rule of thumb with criteria that bound overfitting (shrinkage, optimism in $R^2$) and require precise estimation of the baseline. Their central warning for validation: overfitting is governed by the number of candidate predictor parameters *considered*, not the number retained, and flexible machine-learning pipelines consider far more parameters than they appear to.

## Overview

Riley, R. D. et al. (2020). *Calculating the sample size required for developing a clinical prediction model*. **BMJ** 368, m441 (a "Research Methods and Reporting" article building on the same group's 2019 *Statistics in Medicine* papers on binary/time-to-event and continuous outcomes).

**Question.** How many participants (and outcome events) are needed so that a newly developed multivariable prediction model is not badly overfitted and its key quantities are estimated precisely?

**Context.** Prediction models are frequently built on datasets that are too small relative to the number of candidate predictors. The result is models whose *apparent* performance in the development data is optimistic and whose predictions are too extreme (miscalibrated) on new data. The widely used "events per variable ≥ 10" heuristic has no strong theoretical basis and ignores the outcome prevalence and the expected model fit.

## Main Content

### Key quantity: number of predictor parameters $p$

$p$ counts **degrees of freedom of all candidate predictor parameters examined** during development — every category of a categorical variable, every spline term, every interaction screened, every variable that entered a selection procedure — not just the variables that survive into the final equation. Variable selection does not reduce the effective $p$; it typically makes overfitting worse.

### The criteria (binary and time-to-event outcomes)

> [!definition] Riley sample-size criteria (binary / time-to-event outcomes)
> The minimum sample size is the **largest** $n$ required to satisfy all of:
> 1. **Small overfitting** — expected uniform shrinkage factor $S \ge 0.9$ (i.e. predictor effects need ≤ 10% shrinkage):
> $$n \;\ge\; \frac{p}{(S-1)\,\ln\!\left(1 - \dfrac{R^2_{CS}}{S}\right)}$$
> where $R^2_{CS}$ is the anticipated Cox–Snell $R^2$ of the model (taken from prior models or conservatively derived from the outcome prevalence).
> 2. **Small optimism in apparent fit** — the difference between the apparent and the optimism-adjusted Nagelkerke $R^2$ is at most $\delta = 0.05$.
> 3. **Precise estimation of overall risk** — the intercept / overall outcome proportion $\phi$ is estimated within a margin of error of about $\pm 0.05$, e.g. $n \ge \left(\tfrac{1.96}{0.05}\right)^2 \phi(1-\phi)$ for a binary outcome.

^def-riley-criteria

For **continuous outcomes** the analogous criteria are: shrinkage $S \ge 0.9$ (same formula with the anticipated adjusted $R^2$), small optimism in $R^2$, precise estimation of the residual standard deviation, and precise estimation of the mean outcome (intercept). The paper provides worked examples and points to the `pmsampsize` software (Stata/R) implementing the calculations.

### Main messages

- The required $n$ depends jointly on $p$, the anticipated model fit, and the outcome prevalence (or residual variance) — not on a fixed ratio.
- Because apparent performance is optimistic, internal validation (bootstrap optimism correction, or cross-validation of the *entire* modelling pipeline including selection) and shrinkage/penalisation remain necessary even when the criteria are met; penalisation does **not** rescue a dataset that is far too small, because the amount of shrinkage itself is then estimated imprecisely.
- Machine-learning approaches need *more* data than regression for the same nominal set of predictors because they implicitly consider many more parameters (interactions, cut-points).

## Key Passages

> "the amount of model overfitting is dictated by the total number of predictor parameters considered, not just those included in the final model equation" — Riley et al. (2020), p. 2 of 12

> "apparent predictive performance (as observed in the development dataset itself) will be optimistic" — Riley et al. (2020), p. 3 of 12

> "A major cause of this problem is that the number of predictor ("feature") parameters considered by machine learning approaches will usually far exceed that for regression, even when the same set of predictors is considered, particularly because they routinely examine multiple interaction terms and categorise continuous predictors." — Riley et al. (2020), p. 6 of 12

Context from the same theme in the source review (different papers):

> "A typical MMM dataset, consisting of three years of national weekly data is only 156 data points." — Chan & Perry (2017), p. 6

> "Large scale simulation studies show that the model can be estimated well on a large data set, but it may produce biased estimates for the typical sample size of a couple of years of weekly national-level data." — Jin et al. (2017), p. 28

## Implications for Model Validation

- **Count what was considered.** For a model trained on a weekly KPI series, $p$ should include every candidate feature, lag, transformation, interaction and hyperparameter configuration explored — including across a best-of-many model search — not only the features in the deployed model.
- **Small weekly datasets are small.** Two to three years of weekly data per segment gives roughly 100–156 rows; with dozens of candidate features the shrinkage criterion is easily violated, so per-segment models are likely to be overfitted and their feature rankings unstable.
- **Never report apparent fit.** In-sample $R^2$ or training error should be replaced by optimism-corrected or genuinely out-of-sample performance (for time series, see [[Bergmeir et al 2018 - Cross-Validation for Time Series]]).
- **Flexible learners need a sample-size argument.** Before trusting a gradient-boosted or random-forest model on a short panel, compute a Riley-style minimum $n$ under conservative assumptions as a pre-registration check.
- **Pooling helps.** Where per-segment $n$ fails the criteria, hierarchical / pooled models or strong priors (cf. [[Bayesian Media Mix Modeling - Overview]]) reduce the effective number of free parameters.

## Connections

- The "parameters considered, not retained" point is the prediction-model analogue of the multiple-comparisons logic in [[Simmons et al 2011 - False-Positive Psychology]], [[Garden of Forking Paths]] and [[Researcher Degrees of Freedom]].
- [[Ioannidis 2005 - Why Most Published Research Findings Are False]] supplies the base-rate argument for why small, flexible studies produce unreliable positives.
- [[Chan and Perry 2017 - Challenges in Media Mix Modeling]] and [[Bayesian Media Mix Modeling - Overview]] document the same small-$n$ problem for marketing models.
- [[Meinshausen and Buhlmann 2010 - Stability Selection]] addresses the instability of variable selection that small $n$ produces.
- [[Power Analysis and Sample Size]] is the hypothesis-testing counterpart (sample size for detecting effects rather than for developing predictors).

## See Also

- [[Power Analysis and Sample Size]] — sample size for inference rather than prediction
- [[Simmons et al 2011 - False-Positive Psychology]] — flexibility inflates false positives
- [[Ioannidis 2005 - Why Most Published Research Findings Are False]] — small studies and small effects lower PPV
- [[Breiman 2001 - Statistical Modeling The Two Cultures]] — predictive accuracy on held-out data as the criterion
- [[Bergmeir et al 2018 - Cross-Validation for Time Series]] — how to estimate out-of-sample error for time series
- [[Model Checking]] — broader model assessment practice
- [[MMM Model Selection and Application]] — small-sample model selection in media mix models
