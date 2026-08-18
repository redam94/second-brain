---
title: "Prior Predictive Checking"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5.9, pp. 89-93 (Figures 5.5, 5.6, 5.7, 5.8)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Modeled and Unmodeled Data]]"
  - "[[Prior Distributions]]"
  - "[[Generative and Partially Generative Models]]"
used_by:
  - "[[Posterior Predictive Checking]]"
  - "[[Joint Priors and Covariance Matrices]]"
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[Models for Regression Coefficients - Student Grades]]"
aliases:
  - "Prior predictive check"
  - "Prior predictive simulation"
  - "Weak priors in high dimensions"
---

# Prior Predictive Checking

> [!summary]
> Simulate from the prior, push through the data model, and look at the implied datasets. The
> section's central demonstration is a **three-way comparison of $\text{normal}(0,0.5)$,
> $\text{normal}(0,5)$, and $\text{normal}(0,50)$ priors on the same logistic regression**, showing
> that the widest prior on $(a,b)$ produces the *narrowest* range of realistic data — almost every
> simulated exam item shows perfect discrimination. The companion result (Figure 5.8) is that **weak
> independent priors become strong as dimension grows**: with 15 predictors, a $\text{normal}(0,1)$
> prior on each coefficient concentrates the predictive probability at 0 and 1.

## Overview

> [!definition] What a prior predictive check is (Box 1980; Gabry, Simpson, et al. 2019)
> "Prior predictive checks are a way to assess the **pre-data implications** of a generative model.
> **Because parameter distributions interact with the data model to produce implied predictions, it can
> be difficult to intuit the consequences of prior choices.**"
>
> "Prior predictive simulations can be useful in the model-building process because **it is easy to try
> alternative priors and data models and re-run the simulations.**"
^def-prior-predictive-check

The mechanics — which variables to fix and which to simulate, in which order — are in
[[Modeled and Unmodeled Data]].

> [!important] There is no one right visualization
> "**There is no single correct way to visualize and explore prior predictive simulations. But simple
> scatterplots are often useful and a good place to begin.**"

## Main Content

### Worked example: three priors for a logistic regression

> [!example] Prior predictive scatterplots (Figure 5.5, Ch. 5.9, pp. 90-91)
> **The model.** $\Pr(y_i = 1) = \text{logit}^{-1}(a + bx_i)$, from
> [[Multiple-Choice Exam - A Full Workflow Walkthrough]]: $y_i = 1$ if student $i$ answered a
> particular exam question correctly, $x_i$ the student's standardized exam score (mean 0, sd 1).
>
> **How the simulation is set up, step by step:**
> 1. **Simulate $a, b$ from the prior** — "because these two variables have **no causal parents** — they
>    don't depend upon other variables in the model."
> 2. **Decide $n$ and the predictor values $x_1,\dots,x_n$.** These are unmodeled data; **there is no
>    generative model for $x$.** Here the check uses **the observed $x$ values for the 32 students** from
>    the Chapter 4 dataset. (Alternatively "you might need to simulate the $x$ values using some model,
>    even if it is just $x \sim \text{normal}(0,1)$.")
> 3. **Simulate $y_i$, $i=1,\dots,n$** from the logistic regression.
>
> **Display 10 independent simulations** — "which for this problem can be thought of as **10 possible
> outcomes** or as **one set of simulated outcomes for 10 different items** drawn from the model. **This
> dual interpretation is a special case of a general equivalence of prior and population
> distributions.**"
>
> | Prior on $a, b$ | What the simulated data look like | Verdict |
> |---|---|---|
> | $\text{normal}(0, 0.5)$ | percentage correct always close to **50%**, correlation between $x$ and $y$ close to **zero** | **Too strong.** "We would like the model to also fit items for which the proportion of correct answers is closer to 0 and 1, and items where $x$ is a strong predictor" |
> | $\text{normal}(0, 5)$ | a range of possibilities — some items where nearly all students are correct, some with a mix; sometimes better students do better, sometimes worse | **Weakly informative.** "It allows a broad range of possibilities and **does not use existing prior information** (notably, that better students will typically be more likely to get any given question correct)" |
> | $\text{normal}(0, 50)$ | **nearly every simulated item shows perfect or near-perfect discrimination** — a threshold above which students get the item correct and below which they don't | **Weak in $(a,b)$-space but strong in $y$-space.** "Not realistic for actual exams" |
>
> **The crucial nuance about the widest prior.** "**If the data are strong enough, this overly-broad
> prior will not create any problems** — realistic models are included in this prior and will ultimately
> prevail in the posterior — **but there is a concern that for sparse data this prior can cause problems
> in computation and inference. In particular, for those items that do happen to show complete
> separation ($y=1$ for $x$ above some threshold and $y=0$ below it), the posterior will be dominated by
> extreme values, leading to an inappropriate certainty** about the model for that item."
>
> This is exactly the failure that broke Model 1 in
> [[Multiple-Choice Exam - A Full Workflow Walkthrough#Model 1]] — the prior predictive check
> *predicts* it in advance.

### Other worked checks

> [!example] Gaussian process priors (Figure 5.6, Ch. 5.9, p. 92)
> Prior predictive draws from a GP with **squared exponential covariance function** under different
> values of the **amplitude parameter $\tau$** and the **length scale parameter $l$** (from BDA3).
>
> "This sort of simulation and graphical comparison is **useful when working with any model and
> essential when setting up unfamiliar or complicated models.**" See
> [[Hilbert Space Gaussian Processes]] and [[Hilbert Space Gaussian Processes]].

> [!example] Simple linear regression on the temperature data (Figure 5.7, Ch. 5.9, p. 92)
> Possible regression lines $a + bx$ for the Kilpisjärvi summer temperature data of
> [[Choosing an Initial Model]], under two priors, with the time scale **centered so $x = 0$ at the
> middle of the data range**:
>
> | Prior | Implied lines | $y$-axis range |
> |---|---|---|
> | $a, b \sim \text{normal}(0, 100)$ (proper but very weak) | wildly implausible temperature trajectories | $\pm 10{,}000$ |
> | $a \sim \text{normal}(0, 10)$, $b \sim \text{normal}(0, 1/3)$ | plausible | $\pm 20$ |
>
> **The reasoning behind the informative prior:** $a \sim \text{normal}(0,10)$ "assumes that temperature
> is **equally likely to increase or decrease** and that it is **unlikely that it would change more than
> 10 degrees in 100 years**"; $b \sim \text{normal}(0, 1/3)$ so that "**yearly variation in summer
> temperatures is likely to be less than 3 degrees.**"
>
> "**Reasonable priors on $\sigma$ will have little effect on the inferences for the regression
> lines.**"
>
> Note the two-order-of-magnitude difference in the $y$-axis: this is what "weak priors are not weak"
> looks like on a graph.

### Weak priors become strong as dimension increases

> [!warning] The dimension effect (Figure 5.8, Ch. 5.9, p. 93)
> **Setup.** Logistic regression models with **2, 4, or 15 binary predictors.** In each case the
> coefficients get **independent $\text{normal}(0,1)$ priors**. For each model, simulate the coefficient
> vector $\theta$ from the prior and compute the logistic regression **predictive probability.**
>
> **Result.**
> - With **few predictors**, the prior predictive distribution of the probability is **spread out**,
>   "indicating that the model is compatible with a wide range of regimes of data."
> - With **15 predictors**, it becomes **concentrated near 0 or 1** — "indicating that **weak priors on
>   the individual coefficients of the model imply a strong prior on this particular predictive
>   quantity.**"
>
> "**If we wanted a more moderate prior predictive distribution, the prior on the coefficients would need
> to be strongly concentrated near zero.**"
>
> > "This is a general phenomenon in regression models where **as the number of predictors increases, we
> > need stronger priors on model coefficients (or enough data) if we want to push the model away from
> > extreme predictions.**"
^wrn-dimension-effect

> [!important] The recommended remedy — priors on outcomes, not parameters
> "**A useful approach is to consider priors on outcomes and then derive a corresponding joint prior on
> parameters**" (Piironen and Vehtari 2017b; Zhang, Naughton, et al. 2022; Aguilar and Bürkner 2023;
> Yanchenko, Bondell, and Reich 2025).
>
> "More generally, **joint priors allow us to control the overall complexity of larger parameter sets,
> which helps generate more sensible prior predictions that would be hard or impossible to achieve with
> independent priors.**"
>
> This is the [[Joint Priors and Covariance Matrices#The piranha principle|piranha principle]] arriving
> from the predictive side. The concrete families — regularized horseshoe, R2D2, ARR2 — are in
> [[Global-Local Shrinkage Priors]]; the case study is
> [[Models for Regression Coefficients - Student Grades]]. The same phenomenon for *explained variance*
> is demonstrated there.

### Two further uses

> [!important] Prior predictive simulation as an elicitation tool
> "Another benefit of prior predictive simulations is that they can be used to **elicit expert prior
> knowledge on the measurable quantities of interest, which is easier than eliciting information on model
> parameters that are not observable**" (O'Hagan et al. 2006). "Priors on observables can then be
> translated to priors on parameters" (Hartmann et al. 2020; Manderson and Goudie 2023; Silva et al.
> 2023).

> [!important] The thought-experiment version
> "**Even when we skip computational prior predictive checking, it might still be useful to think about
> how the priors we have chosen would affect a hypothetical simulated dataset.** This means thinking
> through the prior predictive simulation and **trying to guess how it would turn out, but without
> performing it. Even this thought experiment can reveal previously unrealized aspects of the joint prior
> and data model.**"

## Connections

- Prior predictive checking is the **"Model structure"** branch of
  [[From Inference to Data Analysis to Workflow|Figure 2.1]] (box 5.9), and its verdict routes to either
  "Model is provisionally accepted" or "Model contradicts domain knowledge."
- It requires a **proper prior** and a **full data model** — the two things
  [[Generative and Partially Generative Models]] warns you may not have.
- Structurally it is the prior-side twin of [[Posterior Predictive Checking]]: same simulate-and-compare
  logic, applied before conditioning on data rather than after.
- The complete pipeline check that combines both directions is
  [[Simulation-Based Calibration - Overview]].

## See Also
- [[Modeled and Unmodeled Data]] — the ordering the simulation must follow
- [[Prior Distributions]] — the informativity ladder these checks make visible
- [[Joint Priors and Covariance Matrices]] — the fix for the dimension effect
- [[Choosing and Building Models]] — the 2020 paper's treatment of prior predictive checking
