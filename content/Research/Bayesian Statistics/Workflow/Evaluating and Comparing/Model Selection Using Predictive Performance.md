---
title: "Model Selection Using Predictive Performance"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/theorem
  - type/example
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 9.4, pp. 162-167 (Eq. 9.1-9.5)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Cross Validation Checking]]"
  - "[[Overfitting and Information Criteria]]"
  - "[[Posterior Predictive Checking]]"
used_by:
  - "[[Model Selection and Overfitting]]"
  - "[[Stacking and Predictive Model Averaging]]"
  - "[[LOO Model Checking and Comparison - Roaches]]"
aliases:
  - "elpd"
  - "elpd_loo"
  - "Expected log predictive density"
  - "Three scenarios for the normal approximation"
---

# Model Selection Using Predictive Performance

> [!summary]
> The quantitative machinery for comparing models: the **expected log predictive density (elpd)**
> estimated by LOO-CV, its **standard error**, and a **normal approximation** to the difference that
> yields "the probability that one model is better." The section's most useful content is the list of
> **three scenarios in which that normal approximation is not calibrated** — very similar predictions,
> model misspecification, and small $n$ — worked through on **three real datasets**, each chosen to
> exhibit one of them. The recurring practical judgment: when the difference is small, **say there is no
> practical difference rather than reaching for the probability.**

## Overview

> [!important] Predictive checking already *is* model selection (Ch. 9.4, pp. 162-163)
> "**If predictive checking reveals problems with a model, and then we build and keep a new model which
> performs better in the predictive checking, we have done model selection.**
>
> Even though posterior predictive checking is using the data twice, **it can be safe to discard models
> which show clear discrepancies between predictions and data. Trusting a model that does not show
> discrepancies is harder.** As discussed in [[Cross Validation Checking|Section 8.3]], **cross validation
> predictive checking can detect smaller discrepancies, and so it is often superior to or should be used
> in comparison with ordinary posterior predictive checks.**"
>
> Note the asymmetry, which recurs throughout: **a failed check is much more informative than a passed
> one.**

## Main Content

### The elpd machinery

> [!definition] LOO-CV predictive density and elpd (Eq. 9.1-9.2, Ch. 9.4, p. 163)
> For observation $y_i$ under model $M_k$ with parameters $\theta_k$:
> $$
> p_{M_k}(y_i \mid y_{-i}) = \int p_{M_k}(y_i \mid \theta_k)\, p_{M_k}(\theta_k \mid y_{-i})\, d\theta_k \tag{9.1}
> $$
> where $y_{-i}$ denotes all observations except $y_i$ (conditioning on predictors $x$ suppressed).
>
> Using $y_i$ as a proxy for future data from the same distribution:
> $$
> \widehat{\text{elpd}}_{\text{LOO}}(M_k \mid y) = \sum_{i=1}^n \log p_{M_k}(y_i \mid y_{-i}) \tag{9.2}
> $$
>
> **Why cross validation at all:** "**Ideally we would compare the predictive distribution from the model
> to future data. When that is not yet available, we can use cross validation, which uses existing data as
> proxy for future data, to provide almost unbiased estimates of the expected predictive performance**"
> (Vehtari and Ojanen 2012).
^def-elpd

> [!definition] Comparing two models, with uncertainty (Eq. 9.3-9.5)
> $$
> \widehat{\text{elpd}}_{\text{LOO}}(M_a, M_b \mid y) = \sum_{i=1}^n \log p_{M_a}(y_i|y_{-i}) - \sum_{i=1}^n \log p_{M_b}(y_i|y_{-i}) \tag{9.3}
> $$
>
> "and associated uncertainty due to **having only $n$ proxy observations.** If we model the future data
> distribution with a **flat Dirichlet process**, for which the mean and variance of the posterior are
> available analytically, then we can use the following normal approximation" (Sivula et al. 2025):
> $$
> p\big(\text{elpd}(M_a, M_b|y)\big) = \text{normal}\!\left(\widehat{\text{elpd}}_{\text{LOO}}(M_a,M_b|y),\ \widehat{\text{SE}}_{\text{LOO}}(M_a,M_b|y)\right) \tag{9.4}
> $$
> where the standard error is the **sample standard error of the pointwise differences**:
> $$
> \widehat{\text{SE}}_{\text{LOO}}(M_a,M_b|y) = \sqrt{\frac{n}{n-1}\sum_{i=1}^n \left(\widehat{\text{elpd}}_{\text{LOO},i}(M_a,M_b|y) - \frac{1}{n}\sum_{j=1}^n \widehat{\text{elpd}}_{\text{LOO},j}(M_a,M_b|y)\right)^2} \tag{9.5}
> $$
>
> "**When this normal approximation is well calibrated, it can be used to compute the probability that one
> model is better than the other in average predictive performance.**"
^def-elpd-difference

> [!warning] Three scenarios where the normal approximation fails (Sivula et al. 2025)
> The approximation "**is well calibrated, if**
> 1. **the models are not too similar (with an absolute difference greater than 4)**,
> 2. **the models are reasonably well specified with no outliers**, and
> 3. **the sample size is not too small ($n > 100$ in this case).**"
>
> The three worked examples below are chosen deliberately: **"We cover all three scenarios that can affect
> the calibration of the normal approximation: very similar predictions, model misspecification, and small
> sample size."**
^wrn-three-scenarios

**Computation.** MCMC with 4 chains, 1000 warmup and 1000 sampling iterations; LOO-CV via the `loo`
package using **fast PSIS-LOO** (Vehtari, Gelman, and Gabry 2017).

### Example 1 — Primate milk (small $n$, small differences)

> [!example] Masking, collinearity, and 17 primates (McElreath 2020; Ch. 9.4, pp. 164-165)
> **The question**, in McElreath's words: "*A popular hypothesis has it that primates with larger brains
> produce more energetic milk, so that brains can grow quickly … The question here is to what extent
> energy content of milk, measured here by kilocalories, is related to the percent of the brain mass that
> is neocortex … We'll end up needing female body mass as well, to see the **masking** that hides the
> relationships among the variables.*"
>
> **The data.** 17 primate species. Target: energy content of milk (kcal/g). Predictors: percent of brain
> mass that is neocortex, and $\log$(female body mass). "**The predictor and target are centered and
> scaled to have unit variance.**"
>
> **The models** (`rstanarm`, $\text{normal}(0,1)$ priors on coefficients, $\text{exponential}(1)$ on the
> residual scale):
> $$
> M_1: \text{kcal} \sim \text{normal}(\alpha,\sigma) \qquad M_2: \ +\ \beta_1\cdot\text{neocortex}
> $$
> $$
> M_3: \ +\ \beta_2 \cdot \log(\text{mass}) \qquad M_4: \ +\ \beta_1\cdot\text{neocortex} + \beta_2\cdot\log(\text{mass})
> $$
>
> | Model | $\widehat{\text{elpd}}_{\text{LOO}}(M_k, M_1)$ | $\widehat{\text{SE}}_{\text{LOO}}$ | $p(\text{elpd} > 0)$ |
> |---|---|---|---|
> | $M_1$ | – | – | – |
> | $M_2$ | $-0.6$ | 0.6 | 0.16 |
> | $M_3$ | $0.3$ | 1.2 | 0.60 |
> | $M_4$ | $\mathbf{4.2}$ | 2.4 | 0.96 |
>
> **Reading the table under the three scenarios.**
> - Scenario 2 (misspecification) is fine: "**Based on model checking and the distribution of pointwise
>   $\log p_{M_k}(y_i|y_{-i})$, the models seem to be reasonably specified.**"
> - For $M_2$ and $M_3$: differences are tiny (Scenario 1) **and** $n = 17$ (Scenario 3), so
>   "**we may assume $\widehat{\text{SE}}$ to be underestimated and the error distribution to be more
>   skewed than normal. However, since $\widehat{\text{elpd}}$ is small, we can state that there is no
>   practical or statistical difference in the predictive performance.**"
> - For $M_4$: "**This difference (4.2) is big enough that we are fine with respect to Scenario 1, but the
>   number of observations is small (Scenario 3).**"
>
> **The conservative correction:** "**If we multiply $\widehat{\text{SE}}$ by 2, following the heuristic
> based on the limit of equations in Bengio and Grandvalet (2004) to make a more conservative estimate,
> the probability that model $M_4$ has better predictive performance is bigger than 0.81. Considering we
> have only 17 observations, this is good. Collecting more data is, however, recommended.**"
>
> **The masking explained.** Under $M_4$, the 95% central posterior intervals for $\beta_1$ and $\beta_2$
> are $(1.1, 3.7)$ and $(-0.12, -0.04)$ — "**which indicates that the data have information about the
> parameters. The predictors neocortex and $\log$(mass) are collinear, which causes correlation in the
> posterior of the coefficients, which could make the marginal posteriors overlap zero, even if the joint
> posterior does not. If so, looking at the predictive performance is useful. In this case, neither
> predictor alone is enough, and the useful predictive information is along the second principal component
> of their joint distribution, which explains why the models that include only one of the predictors are
> no better than the intercept-only model.**"
>
> **This is the whole point of the example:** two individually useless predictors that are jointly
> informative. Neither marginal posterior nor single-predictor elpd would find it.

> [!important] Predictive comparison carries more uncertainty than the posterior
> "**As the predictive distribution includes the aleatoric uncertainty (modeled by the data model), there
> is often more uncertainty in the predictive performance model comparison than in the posterior
> distribution**" (Wang and Gelman 2015). "**In simple models, we can also look at the posterior for the
> quantities of interest.**"

### Example 2 — Sleep study (outliers, then a fix)

> [!example] Chronic sleep restriction (Belenky et al. 2003; Ch. 9.4, p. 165)
> **The data.** From the `lme4` package: average reaction times (ms) for **18 subjects** with sleep
> restricted to 3 hours per night for **7 consecutive nights** (days 0 and 1 were adaptation and training,
> removed). Analyzed in detail in [[Prior Specification for Regression Models - Sleep Study]] (Ch. 17).
>
> **The models** (`brms`, default priors — uniform on the `Days` coefficient; half-normal on varying-effect
> scales; LKJ on the correlation):
> $$
> M_1:\ \text{Reaction} \sim \text{Days} \qquad M_2:\ \text{Reaction} \sim \text{Days} + (1 \mid \text{Subject})
> $$
> $$
> M_3:\ \text{Reaction} \sim \text{Days} + (\text{Days} \mid \text{Subject})
> $$
>
> **The rationale for comparing anyway:** "**Based on the study design, $M_3$ is the appropriate model for
> the analysis. But even when we know the target model by design, comparing models is useful for assessing
> how much information the data has about the varying intercepts and slopes.**"
>
> **A computational note:** "**For a few LOO-folds with the Pareto $\hat{k}$ diagnostic exceeding 0.7 we
> re-ran MCMC with `reloo=TRUE` in brms.**"
>
> | Model | $\widehat{\text{elpd}}_{\text{LOO}}(M_k, M_3)$ | $\widehat{\text{SE}}$ | $p(\text{elpd}(M_3, M_k) > 0)$ |
> |---|---|---|---|
> | $M_3$ | – | – | – |
> | $M_2$ | $-12.7$ | 9.8 | 0.90 |
> | $M_1$ | $-77.8$ | 20.9 | 0.9999 |
>
> **The catch (Scenario 2):** "**Model checking reveals that two observations are clear outliers with
> respect to these models, making the normal approximation likely to be poorly calibrated.**"
>
> **The fix — switch to $t$ data models** ($M_{1t}, M_{2t}, M_{3t}$). "Based on model checking, there is no
> obvious model misspecification."
>
> **First check the data model itself:**
> | Model | $\widehat{\text{elpd}}(M_3, M_{3t})$ | $\widehat{\text{SE}}$ | $p(\text{elpd}(M_{3t}, M_3) > 0)$ |
> |---|---|---|---|
> | $M_{3t}$ | – | – | – |
> | $M_3$ | $-41.7$ | 13.4 | 0.999 |
>
> "**Although in this comparison $M_3$ is misspecified, the better specified model $M_{3t}$ shows much
> better predictive performance, and as we can expect $\widehat{\text{SE}}$ to be inflated, the actual
> probability that $M_{3t}$ is better than $M_3$ is likely to be bigger than 0.999.**"
>
> **Then compare within the $t$ family:**
> | Model | $\widehat{\text{elpd}}(M_{kt}, M_{3t})$ | $\widehat{\text{SE}}$ | $p > 0$ |
> |---|---|---|---|
> | $M_{2t}$ | $-45.4$ | 8.5 | 1.0 |
> | $M_{1t}$ | $-119.1$ | 15.9 | 1.0 |
>
> "**The models appear sufficiently well specified, the number of observations is bigger than 100, and the
> differences are not small, so we can assume that the normal approximation is well calibrated.**"
>
> **The substantive coda — a comparison that does *not* change the conclusion, and why it still matters:**
> "**In this case, the effect of days with sleep constrained to 3 hours is so big that the main conclusion
> stays the same with all the models. Still, for example, $M_{3t}$ does indicate higher variation between
> subjects than model $M_3$. As $M_{3t}$ passes the model checking and has higher predictive performance,
> we should continue looking at the posterior of model $M_{3t}$.**"

### Example 3 — Roaches (huge differences, then a tiny one)

> [!example] Pest management in urban apartments (Gelman and Hill 2007 §8.3; Ch. 9.4, pp. 166-167)
> **The experiment:** "treatment and control were applied to **160 and 104 apartments**, respectively, and
> the outcome $y_i$ in each apartment was **the number of roaches caught in a set of traps. Different
> apartments had traps for different numbers of days.**"
>
> **The latent regression:**
> ```r
> y ~ sqrt_roach1 + treatment + senior + offset(log(exposure2))
> ```
> with `sqrt_roach1` the square root of pre-treatment roach count, `senior` an indicator for buildings
> restricted to elderly residents, and the **offset** the log number of trap-days.
>
> **The models:** $M_1$ Poisson, $M_2$ negative binomial, $M_3$ zero-inflated negative binomial ("the zero
> inflation is modeled using **the same latent formula, with its own parameters**"). All coefficients get
> $\text{normal}(0,1)$; the negative binomial shape parameter gets the brms default
> **inverse-gamma$(0.4, 0.3)$** (Vehtari 2024).
>
> **Two different PSIS-LOO repairs, chosen per model:** `reloo=TRUE` for the Poisson (re-run MCMC for all
> folds with $\hat{k} > 0.7$), **`moment_match=TRUE`** for the negative binomial models (moment matching,
> Paananen et al. 2021).
>
> | Model | $\widehat{\text{elpd}}(M_k, M_3)$ | $\widehat{\text{SE}}$ | $p(\text{elpd}(M_3, M_k)>0)$ |
> |---|---|---|---|
> | $M_3$ (ZINB) | – | – | – |
> | $M_2$ (NB) | $-23.0$ | 6.9 | 0.9996 |
> | $M_1$ (Poisson) | $\mathbf{-4633.2}$ | 684.9 | 1.0 |
>
> "**Based on model checking, the Poisson model is underdispersed, which indicates Scenario 2, but the
> difference is so big that we can be certain that the zero-inflated negative binomial model is better.**"
>
> **Then a fourth model, and the opposite verdict.** "**As we used an ad hoc square-root transformation of
> pre-treatment number of roaches, we also fitted a model $M_4$ replacing the linear square root … with a
> spline.**"
>
> | Model | $\widehat{\text{elpd}}(M_k, M_4)$ | $\widehat{\text{SE}}$ | $p > 0$ |
> |---|---|---|---|
> | $M_3$ | $-2.4$ | 3.0 | 0.79 |
>
> "**Model $M_4$ (with spline) seems to be slightly better, but now the difference is so small that the
> normal approximation is likely to be not perfectly calibrated. As the difference is small, we can proceed
> with either model.**" Discussed further in [[LOO Model Checking and Comparison - Roaches]] (Ch. 24).
>
> **Note the discipline across all three examples:** the authors never treat a probability near 0.8 as a
> decision. When the difference is small they say **"no practical difference"** and move on.

### Other cross validation variants

> [!definition] Choosing the CV scheme (Ch. 9.4, p. 167)
> | Situation | Scheme | Reference |
> |---|---|---|
> | Default | **LOO with PSIS** — avoids refitting per point | Vehtari, Gelman, and Gabry 2017 |
> | **"PSIS-LOO fails as diagnosed by many high Pareto $\hat{k}$ values"** | **$K$-fold-CV with re-running MCMC for each fold** — "a robust alternative" | — |
> | Predictive performance for **new groups** in a hierarchical model | **leave-one-group-out** | Merkle, Furr, and Rabe-Hesketh 2019 |
> | **Time series** | **leave-future-out**; but "**in model comparison $h$-block-CV with joint log score is more efficient**" | Bürkner, Gabry, and Vehtari 2020; Cooper, Simpson, et al. 2025 |
> | **Spatial models** | $h$-block-CV with joint log score | Cooper, Vehtari, and Forbes 2025 |
^def-cv-variants

## Connections

- The three scenarios are, in effect, a *severity* analysis of the comparison itself — the same skeptical
  posture [[Posterior Predictive Checking]] applies to model fit, applied to the model-comparison tool.
- The primate-milk masking result is why [[Comparing Models Visually]] insists on plotting the quantity of
  interest across models rather than reading coefficients.
- Whether a difference is large enough to select on is the subject of [[Model Selection and Overfitting]];
  when it is not, [[Stacking and Predictive Model Averaging]] is the alternative.

## See Also
- [[Cross Validation Checking]] — LOO as a calibration check rather than a comparison
- [[Overfitting and Information Criteria]] — BDA3 background on elpd, WAIC, and LOO
- [[Model Selection and Overfitting]] — the double-dipping risk in selecting on elpd
- [[LOO Model Checking and Comparison - Roaches]] — the roaches example in full
