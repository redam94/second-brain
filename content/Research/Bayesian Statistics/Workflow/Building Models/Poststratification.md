---
title: "Poststratification"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - method/mrp
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 7 intro and 7.1, pp. 119-125 (Figures 7.1-7.6, Eq. 7.1-7.2)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Simulation to Express Uncertainty]]"
  - "[[Hierarchical Models]]"
  - "[[Modeled and Unmodeled Data]]"
used_by:
  - "[[Causal Inference as Generalization]]"
  - "[[Posterior Predictive Checking]]"
  - "[[Statistical and Scientific Inference]]"
  - "[[Silicon Samples and Algorithmic Fidelity]]"
  - "[[Validity, Bias and Calibration of LLM-Simulated Populations]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
  - "[[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]]"
aliases:
  - "MRP"
  - "Multilevel regression and poststratification"
  - "Average predictive comparison"
  - "Poststratification table"
---

# Poststratification

> [!summary]
> Generalizing from the sample you have to the population you care about. Two ideas: the **average
> predictive comparison** — for a nonlinear model, the "effect" of a predictor must be **averaged over
> the distribution of the other predictors, not evaluated at their mean**, because ceiling and floor
> effects mean the comparison at $E(v)$ can be wildly wrong in either direction — and **MRP**
> (multilevel regression and poststratification), which reframes survey weighting as a *prediction*
> problem so that regularization can fill in sparse cells. Uncertainty propagates for free: the
> poststratification table simply gains $S$ columns, one per posterior draw.

## Overview

> [!important] Being explicit about quantities of interest (Ch. 7 intro, p. 119)
> "Because models can serve more than one purpose, **being explicit about quantities of interest helps
> with model design and criticism. Just as the prior can be understood in the context of the likelihood,
> so can the model be understood in the context of its intended use.**"
>
> **The illustration:** Singer, Van Hoewyk, et al. (1999) and Gelman, Stevens, and Chan (2003a) fit
> models estimating the effects of financial incentives on survey response rates. "**The aspects of these
> models that will be relevant for predicting effects for small incentives in mail surveys are different
> from what is relevant for predictions for large incentives in telephone surveys.**"
>
> A second: BDA3 §7.6 elaborates an example from Rubin (1983) where **the choice of transformation has
> minor effects on inference for the median of a distribution while having large effects on inference
> for the mean.**

> [!definition] The three core tasks of statistics (Gelman, Hill, and Vehtari 2020)
> 1. Generalizing from **sample to population**
> 2. Generalizing from **control to treatment group**
> 3. Generalizing from **observed data to underlying constructs of interest**
>
> In machine learning and causal inference these go by **"domain adaptation"** and **"transportability"**
> (Blitzer, Dredze, and Pereira 2007; Pearl and Bareinboim 2011).
>
> **The tools developed for them:** weighting and poststratification in surveys; matching and regression
> in causal inference; latent variable modeling in psychometrics and econometrics.
>
> **The Bayesian contributions:** hierarchical modeling / partial pooling, "rediscovered in many fields"
> (Henderson 1950; Novick et al. 1972; Gelman and Hill 2007; Finkel and Manning 2009; Daumé 2007);
> regularization enabling large nonparametric models (Hill 2011); multilevel modeling for latent
> variables (Skrondal and Rabe-Hesketh 2004); and connections between transportability and Bayesian
> graph models (Pearl and Bareinboim 2014).
^def-three-core-tasks

## Main Content

### Average predictive comparisons

> [!definition] Average predictive comparison (Ch. 7.1, p. 120)
> Partition the predictors $x = (u, v)$ where $u$ is the **input of interest** and $v$ all the others.
> The quantity "casually called the *effect* of $u$" is more precisely its **average predictive
> comparison**:
> $$
> E(y \mid u^{\text{hi}}, v) - E(y \mid u^{\text{lo}}, v)
> $$
> for contextually relevant values of $u^{\text{hi}}, u^{\text{lo}}, v$.
>
> "In post-processing a regression fit, one might go through the predictors **one at a time, taking
> turns labeling one of the predictors as $u$ and the others as $v$.**"
>
> **With linear regression this is just the coefficient of $u$.** More generally, "the predictive
> comparison of interest **cannot be equated to a single coefficient or model parameter**; it needs to be
> derived from the prediction model by evaluating $E(y|u,v)$ analytically or through simulation."
>
> **Why the choice of $v$ matters** (Gelman and Pardoe 2007): "**non-additivity on the outcome scale
> induces ceiling and floor effects that lead to many parameters interacting to produce predictions.
> This is true even if predictor variables are additive on the latent scale**, as in a logistic regression
> or count model."
^def-average-predictive-comparison

> [!example] Figure 7.1 — the comparison at $E(v)$ fails in both directions
> Two logistic regressions with binary input $u$ and continuous input $v$; vertical ticks on the $x$-axis
> show where the data actually lie.
>
> **Left panel — central value too *large*.** The data $v_i$ are concentrated **near the ends** of the
> predictive range.
> - **Average predictive comparison: 0.03.** "Switching $u$ from 0 to 1 typically has the effect of
>   switching $E(y|u,v)$ from, say, **0.02 to 0.05 or from 0.96 to 0.99**" — the curve is flat where the
>   data are.
> - **Predictive comparison at $E(v)$: 0.24.** At the mean, "switching $u$ from 0 to 1 switches
>   $E(y|u,v)$ from **0.36 to 0.60**" — but **no data point sits there.**
>
> **Right panel — central value too *small*.** Now "the centrally located value of $v$ is already near
> the edge of the curve, at which point a difference in $u$ corresponds to only a small difference in
> $E(y|u,v)$ of only **0.03**. In comparison, the average predictive comparison, averaging over the data
> locations, has the larger value of **0.11**, which appropriately reflects that many of the sample data
> are in the range where a difference in $u$ can correspond to a large difference in $E(y)$."
>
> **The moral:** the direction of the error is not predictable, so there is no safe correction — you must
> average over the actual distribution.

> [!warning] Against setting all predictors to their means
> "It is common for researchers to set all predictor variables to sample or population averages. Then
> the focal variable $u$ can be incremented by one unit … **A drawback of this approach is that any
> realistic predictive context will have more variation in the distributions of the predictor variables —
> nature does not hold variables at their mean values.**"
>
> **The alternative:** "choose **reference distributions** for the other predictor variables $v$. This can
> be done also for the variable of interest $u$. **Since this is a predictive context, we are not
> imagining an intervention that fixes $u$ at any special value for any specific unit in the population.**
> So choosing two distributions for $u$ and comparing the distributions of simulated outcomes, averaging
> over a distribution of $v$, can more closely address the target comparison."
>
> This "can be generalized to produce causal inferences" — [[Causal Inference as Generalization]].

### Stratification, poststratification, and why not to call it weighting

> [!definition] Stratification vs. poststratification (Ch. 7.1, p. 121)
> **Stratification** — partition the population into non-overlapping strata, sample within each, then
> reweight in proportion to stratum size. *Example:* survey Europeans by contracting a separate survey in
> each country, reweighting by known population sizes. It "can make sense for **practical** reasons —
> there is no easy way to conduct a unified continent-wide survey — and also **ensures representativeness
> across strata.**"
>
> **Poststratification** — "the performance of the stratified analysis **even if the original data did not
> come from a stratified sample.**" *Example:* a random-digit telephone poll ends up 60% female / 40% male
> through nonresponse; the population is known to be 52% / 48%.
^def-poststratification

> [!important] Weighting vs. prediction — the same arithmetic, a different frame
> The **weighting** frame gives each woman a weight of $0.52/0.60$ and each man $0.48/0.40$.
>
> The book prefers the **prediction** frame:
> $$
> E(y) = 0.52\, E(y|\text{female}) + 0.48\, E(y|\text{male})
> $$
> and in general
> $$
> E(y \mid \theta) = \frac{\sum_{j=1}^J N_j\, E(y \mid \text{cell } j, \theta)}{\sum_{j=1}^J N_j}
> $$
> with the universe partitioned into $J$ poststratification cells of population size $N_j$.
>
> **Why the reframing earns its keep:** "when the number of poststratification cells is large and the
> data within each cell are sparse, **it is useful to perform some statistical modeling — also called
> regularization or smoothing — to estimate the within-cell population averages** $E(y|\text{cell } j,
> \theta)$. In contrast, **simple weighting would correspond to estimating each cell mean by the average
> value for that cell in the sample, which can be unacceptably noisy**" (Gelman 2007).
>
> **The payoff:** "**By being open to modeling to obtain inference where data are sparse, we are free to
> include more poststratification factors**" — demographics (age, sex, ethnicity, education), geography
> (state, county, urbanization), and study-relevant variables (previous health behavior, political
> affiliation).

> [!definition] MRP (Ch. 7.1, p. 122)
> **Multilevel regression and poststratification** — or more generally *regularized* regression and
> poststratification:
> - **"regression"** = predicting $y$ from $x$;
> - **"multilevel modeling" / regularization** = needed when predictors and their interactions become
>   numerous so that data are **locally sparse**;
> - **"poststratification"** = how population information is included.
>
> "In MRP, we model the relationship between key demographics and the outcome in the **sampled units**,
> and then use this model to make predictions at the **population** level."
>
> **Two challenges arise together:** "**modeling the data and defining the population.**"
^def-mrp

### The poststratification table

The population is summarized as a table with the predictors discretized plus known counts:

| Age group | Education level | Sex | $N_j$ |
|---|---|---|---|
| 18-25 | No college degree | Male | 1662 |
| 18-25 | No college degree | Female | 1283 |
| 18-25 | College degree only | Male | 1282 |
| 18-25 | College degree only | Female | 1932 |
| … | … | … | … |
| 65+ | Postgraduate degree | Female | 741 |

Then a model predicts $y$ from $X$; for binary $y$, model $\Pr(y=1|X,\theta)$ and predict $\hat\theta_j$
for each cell.

> [!definition] The poststratification estimates (Eq. 7.1, 7.2, Ch. 7.1, pp. 124-125)
> **Full population:**
> $$
> \hat\theta = \frac{\sum_{j=1}^J N_j \hat\theta_j}{\sum_{j=1}^J N_j} \tag{7.1}
> $$
> **Subpopulation $A$** (e.g. the 18-25 age group) — apply the same formula to the relevant rows:
> $$
> \hat\theta_A = \frac{\sum_{j \in A} N_j \hat\theta_j}{\sum_{j \in A} N_j} \tag{7.2}
> $$
>
> **A note on granularity:** "If $N_j = 1$ for every cell $j$, then the poststratification table
> represents an **individual-level list of members of the population.** This is occasionally done (for
> example, when at least one $X_k$ is continuous), but for large populations can be computationally
> burdensome."
^def-poststrat-formulas

> [!important] Uncertainty propagates by adding columns
> "**This process automatically supplies uncertainty through the posterior simulations. The procedure is
> natural from a Bayesian approach.** If you have $S$ posterior simulation draws, you will end up with a
> poststratification table with **$S$ new columns** corresponding to inference about the $J$ cells from
> each simulation."
>
> | Age group | Education | Sex | $N_j$ | $\hat\theta_j^1$ | $\hat\theta_j^2$ | … | $\hat\theta_j^S$ |
> |---|---|---|---|---|---|---|---|
> | 18-25 | Less than HS | Male | 1662 | … | … | … | … |
> | … | … | … | … | | | | |
>
> "**Apply (7.1) or (7.2) for each posterior draw $s$**, to obtain a posterior predictive estimate for
> $\theta$. Take the relevant quantiles (for example, 0.05 and 0.95 for 90% uncertainty)."
>
> This is [[Simulation to Express Uncertainty|"simulate first, summarize last"]] applied to a table.

> [!important] Which variables belong in the adjustment set
> "**The adjustment variables required to obtain a good population estimate are not necessarily the full
> set of variables that are related to the outcome.** In general, the adjustment variables required for
> poststratification need to be related to **both the outcome and the probability of being included in
> the sample** through the design or through nonresponse."
>
> Kuh et al. (2024) and Kennedy, Vehtari, and Gelman (2023) "demonstrate how **model validation can
> differ for subpopulation and full-population estimates.**"

> [!warning] The cost of regularization
> "**Multilevel modeling or regularization provides stable estimates for small cells at the cost of
> dependence on the model assumptions. This motivates a robust workflow procedure, paying particular
> interest to posterior predictive checks, and clear communication of the modeling assumptions, including
> those that cannot be validated well from available data.**"

## Examples

> [!example] School vouchers: MRP with a variable the census doesn't ask (Su and Gelman 2023; Figures 7.2-7.3)
> **Goal.** Estimate U.S. public opinion on school vouchers given **income** (5 categories), **ethnicity**
> (4), **religious affiliation** (4), and **state of residence** — from a national survey of ~25,000
> responses.
>
> **The obstacle and the fix.** "**Religion is not asked in the U.S. census.**" So:
> 1. Start with census estimates for the distribution of **income × ethnicity × state**;
> 2. Fit a multilevel regression to the survey to estimate the **conditional distribution of religion
>    given those census variables**;
> 3. Combine to get an estimated poststratification table.
>
> "**This could be improved by accounting for uncertainty in those cell sizes.**" (Note the general
> caution: "even census numbers are imperfect estimates, and the problem becomes more difficult for
> variables that are not in the census.")
>
> **What the figure actually shows.** "The **only place that poststratification was used** here is to make
> the **top row of maps**, which average over ethnicity and religion within each category of income and
> state. The remaining seven rows show the **cell-level posterior means** from the fitted multilevel
> model. **But these maps of cell-level estimates are worth looking at too, as they show patterns that
> are not revealed by the state averages.**"
>
> **The substantive findings:**
> - Vouchers were most popular among **high-income white Catholics and evangelicals** and among
>   **low-income minorities.**
> - "A **positive** correlation between income and support for vouchers among whites of each religious
>   category, but a **negative** correlation among minorities — **except in the south, which makes sense
>   given the history of racially segregated private schools in that region.**"
>
> **Figure 7.3 — the raw cell means.** "These show the same general pattern as the multilevel estimates
> **but are much more variable.** The multilevel model has the appealing property that it provides
> **smooth and reasonable estimates even for the cells with little or no data**; on the other hand, **we
> should be aware that these are just the best estimates given the model, and the model can be wrong.**"

> [!example] Exercise 7.3 — build your own MRP
> Using the poststratification table and state-level predictors from Lopez-Martin, Phillips, and Gelman
> (2012):
> (a) Simulate a survey of 2000 respondents with a binary outcome correlated in some sensible way with
> the demographic and geographic predictors.
> (b) Perform MRP and give estimates for the 50 states.
> (c) Plot MRP vs. raw-data estimates per state (labeled by two-letter abbreviation), and MRP estimate
> and uncertainty vs. number of respondents per state.
> (d) **"Think about how you could simulate a dataset that would break MRP in the sense of MRP giving a
> bad answer."**

## Connections

- Poststratification is the concrete answer to the generalization limits identified in
  [[Relating a Model to Subject-Matter Assumptions]] — "the suburban setting of the study is not
  representative of U.S. high schools."
- The average predictive comparison problem is the same nonlinearity trap as the fitted-curve example in
  [[Point Estimates and Uncertainties]]: $E[h(\theta)] \ne h(E[\theta])$.
- The poststratification table's population $\tilde{x}$ is unmodeled data in the sense of
  [[Modeled and Unmodeled Data]] — which is why the section notes it could itself be estimated.

## See Also
- [[Causal Inference as Generalization]] — the same machinery applied to treatment effects (SATE vs PATE)
- [[Hierarchical Models]] — the regularization that makes sparse cells estimable
- [[Simulation to Express Uncertainty]] — how the $S$ columns get their uncertainty
- [[Bayesian Structural Time-Series Model]] — another setting where sample-to-population generalization
  drives the modeling
- [[Silicon Samples and Algorithmic Fidelity]] — silicon sampling is poststratification over personas
