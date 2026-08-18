---
title: "Incremental Development and Testing - Black Cat Adoptions"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 22, pp. 341-352 (Figures 22.1-22.3, Eq. 22.1-22.3)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[A Data Model Is Not Just a Likelihood]]"
  - "[[Designing Simulated-Data Experiments]]"
  - "[[Modeling Ideas to Address Computing Problems]]"
used_by:
  - "[[Missing Data Models]]"
aliases:
  - "AustinCats"
  - "Survival analysis with censoring"
  - "Three ways to code censoring"
  - "Being smart means working smart"
---

# Incremental Development and Testing — Black Cat Adoptions

> [!summary]
> **22,356 cats** from the Austin Animal Center, of which **11,005 are right-censored**. The chapter's
> stated method is incremental construction — "**By starting with a simple, minimal model and adding one
> feature at a time, we have a better chance of knowing which portion of the model code is responsible for
> an error**" — and its substantive contribution is showing **three mathematically equivalent ways to code
> censoring**: marginalize analytically, impute each censored value as a parameter, or reformulate as a
> **Poisson count model**. The demonstration that matters: ignoring censoring turns true waiting times of
> **100 and 50 days into estimates of 25 and 20 days.**

## Overview

> [!important] The method, stated at the top (Ch. 22, p. 341)
> "**Even when we know the final statistical model that we want to use for inference, we should not try to
> write it directly.** … **Large models can and usually do fail in multiple ways, due to a poison salad of
> coding errors, misspecification, and estimation challenges.**
>
> > **Being smart means working smart.**"

> [!important] Why the estimand is stated in waiting times, not rates
> **The conjecture:** "black cats, because they are considered unlucky, are adopted less often."
>
> **The estimand:** "**What is the distribution of waiting times to adoption for black cats, the distribution
> for all other colors, and how do these distributions differ?**"
>
> > "**We express this estimand in terms of waiting times, instead of parameters like rates or probabilities,
> > because time is an observable variable that can be used more easily in model checking, model comparison,
> > and model generalization. We need the parameters to estimate the waiting times, but waiting times are the
> > target.**"
>
> A crisp application of [[Statistical and Scientific Inference|the estimand-first principle]]: choose the
> quantity that is **observable**, because everything downstream — PPCs, LOO, generalization — works on
> observables.
^imp-estimand-in-observables

> [!definition] Where the generative and statistical models come apart (Ch. 22, p. 341)
> "**We often say Bayesian models are generative in that they can be used to simulate observations. And
> that's true. But it isn't always true of every aspect of the model. In the case of censored values, the
> censoring is part of the observation model, but the statistical model doesn't necessarily model
> observation. We can instead marginalize over the unknown censored values.**
>
> **When the generative model and the statistical model differ, this influences workflow by opening up more
> options in how we code the estimator.**
>
> **The mismatch between generative model and statistical model is ordinary in applied statistics. Given a
> specific question (estimand), some portions of the generative model may be ignorable. Recognizing this can
> simplify the coding and improve efficiency of estimation.**"
>
> This is [[A Data Model Is Not Just a Likelihood]]'s censoring discussion turned into a case study — and
> here the mismatch is treated as an **opportunity** (three codings) rather than a hazard.

## Main Content

### Step 1 — simulate, before modeling

> [!example] A recursive simulator, written the long way on purpose (Ch. 22.2, p. 342)
> With a constant daily adoption probability $p_k$ depending on colour $k$, waiting times are geometric:
> $$
> p(d \mid p_k) = p_k (1-p_k)^{d-1} \tag{22.1}
> $$
> "**the cat waits $d-1$ days, so there are $d-1$ failures, each with probability $1-p_k$. And then on the
> happy final day of adoption, the probability is $p_k$.**"
>
> ```r
> cat_adopt <- function(day, prob) {
>   if (runif(1) > prob) {
>     day <- cat_adopt(day+1, prob)   # keep waiting...
>   }
>   day                                # adopted
> }
> ```
>
> **Why not just call `rgeom`:** "**for the simulation, it can be useful to generate synthetic data without
> using the probability expressions, because this provides additional chances to validate our derivations and
> logic. So instead of just simulating from the geometric distribution … we can write a more general
> simulation that is more transparent and easier to adapt to other processes.**"
>
> A genuinely useful discipline: **if the simulator and the likelihood are derived from the same formula, they
> cannot catch each other's errors.**
^ex-simulate-the-mechanism

> [!example] Prior predictive check on the survival scale (Figure 22.1, Ch. 22.3, p. 344)
> With $p \sim \text{beta}(1,10)$ for each colour, sample from the prior and plot **empirical survival
> curves**:
> ```r
> sim_prior <- replicate(n, rbeta(2, 1, 10))
> for (i in 1:n) {
>   days_rep <- sim_cats1(n=1e3, p=sim_prior[,i])
>   xfit <- survfit(Surv(days, adopted) ~ color, data=days_rep)
>   lines(xfit, lwd=2, col=cols)
> }
> ```
> "**These priors are not informative. They allow very slow adoption rates, as well as very fast adoption. And
> since the priors for black and non-black cats are independent, the difference can be very small or very
> large. Probably these priors could be improved with domain knowledge about typical waiting times. If the
> sample were small, more informative priors might be needed.**"
>
> Note the display choice: **the prior is checked on the survival-curve scale**, which is the scale of the
> estimand, not on the parameter scale.

### Step 2 — fit without censoring, knowing it is wrong

> [!definition] The deliberately incomplete first model (Ch. 22.3, p. 343)
> ```stan
> model {
>   p ~ beta(1, 10);
>   for (i in 1:N) {
>     real P = p[color[i]];
>     if (adopted[i]==1) {
>       target += log((1-P)^(days[i]-1) * P);
>     } else {
>       // censored observations
>     }
>   }
> }
> ```
> The empty `else` branch is the point: **the incompleteness is written into the code where it will be filled
> in.**
>
> **Recovery on synthetic data** with true $p = (0.10, 0.15)$: posterior $p[1] = 0.10$, $p[2] = 0.16$. Good.
>
> **On the real data:** $p[1] = 0.02$, $p[2] = 0.03$ — "**Black cats do seem to have a lower probability of
> adoption.**" But: "**we know this model is misspecified, because it ignores the censored (unadopted) cats.**"

> [!important] Two posterior predictive samples sizes, and why (Figure 22.2)
> Survival curves are plotted for simulated samples of **1000 cats** and of **100 cats**, "**to illustrate how
> uncertainty in predictions is a mix of uncertainty in the posterior distribution and uncertainty in the data
> generating process.**"
>
> "**The difference in probabilities of adoption is clear in the plot on the left, with a large population of
> cats. The process variation has a larger influence on the right, where there are only 100 cats.**"
>
> The same epistemic/aleatoric decomposition made explicit in
> [[Predictive Model Checking and Comparison - Clinical Trial]] — here shown by **varying the replicate
> sample size** rather than by removing a noise term.

### Step 3 — censoring, three ways

> [!definition] Coding 1 — marginalize analytically (Eq. 22.2)
> The probability a cat of colour $k$ is **still unadopted** by day $d$:
> $$
> p(d \mid p, k) = (1-p_k)^d
> $$
> ```stan
> if (adopted[i]==1) {
>   target += log((1-P)^(days[i]-1) * P);
> } else {
>   target += log((1-P)^days[i]);
> }
> ```
>
> **Why the censoring process itself is not modeled:** "**Censoring itself isn't usually modeled in a
> statistical model. The reason is that we typically assume that censoring happens for reasons that are
> conditionally independent of the cat and how long it has waited.** … **But when we simulate data, we have
> to include a censoring process just so the data have censored values. This provides another example of how
> the data model and the data-generating model may not be the same.**"
>
> **Why start with constant $p$:** "**The probability $p$ doesn't have to be the same every day. But this
> constant probability model is a good place to start. Even if you knew you would use a variable-probability
> model for ultimate inference, the constant-probability model is the right place to start, so you can
> gradually add model features and ensure that each feature works as intended.**"
^def-censoring-marginalized

> [!warning] What ignoring censoring costs — measured (Ch. 22.3, p. 347)
> Feeding **censored** synthetic data (true $p = (0.01, 0.02)$) to the **no-censoring** model:
>
> | | Correct model | Ignoring censoring |
> |---|---|---|
> | $p[1]$ | 0.01 | **0.04** |
> | $p[2]$ | 0.02 | **0.05** |
> | Implied wait, black | $1/0.01 = $ **100 days** | $1/0.04 = $ **25 days** |
> | Implied wait, other | $1/0.02 = $ **50 days** | $1/0.05 = $ **20 days** |
>
> "**Ignoring censoring exaggerates the estimated rates of adoption.**"
>
> A four-fold error in the estimand, produced by an omission that the first model's diagnostics were entirely
> happy with. This is the case for [[Posterior Predictive Checking|checking against the generative process]]
> rather than against convergence.
^wrn-censoring-bias

> [!definition] Coding 2 — impute each censored value (Ch. 22.3, pp. 348-349)
> "**There is nothing wrong with treating the censored values as ordinary missing values.** … **In effect this
> means adding a parameter for each censored value.** In the sample, there are 11,005 censored observations
> out of 22,356 cats. **So that's a lot of parameters. But don't worry — the number of parameters isn't such an
> obstacle in many cases.**"
>
> **The key trick:** "**use the observed censoring time as a minimum bound for each unknown value**", via
> Stan's vectorized `lower`:
> ```stan
> parameters {
>   vector<lower=0,upper=1>[2] p;
>   vector<lower=days>[N] days_imputed;
> }
> model {
>   for (i in 1:N) {
>     real P = p[color[i]];
>     if (adopted[i]==1) {
>       target += log((1-P)^(days[i]-1) * P);
>       days_imputed[i] ~ normal(days[i], 0.01);   // pin to the observed value
>     } else {
>       target += log((1-P)^(days_imputed[i]-1) * P);
>     }
>   }
> }
> ```
>
> **The conceptual observation embedded in this code:** "**The target update for the imputed values is
> identical to the update for observed values, except the parameter `days_imputed[i]` stands in for an observed
> value. This statement is effectively a prior on the censored value. For the observed values, the same
> probability statement would normally be called a 'likelihood.'**
>
> **This duality is an ordinary feature of Bayesian models — aspects of the model logically precede the sample,
> so whether or not a variable is observed does not change the probability.**"
>
> The same point as [[Specifying the Data Model and the Prior]]: **prior vs. likelihood is a labeling
> distinction, not a mathematical one.**
>
> **The efficient variant.** The pinning trick "**works, but then the model retains many unnecessary
> parameters, which could slow the computation.**" The alternative passes an index vector of censored
> positions:
> ```stan
> data {
>   int N_censored;
>   array[N_censored] int censored;   // locations of censored observations
> }
> parameters {
>   vector<lower=days[censored]>[N_censored] days_imputed;
> }
> ```
> with censored values handled in a separate loop. "**This requires some detailed coding and subsetting — not
> fun code to write and easy code to mess up.**"
^def-censoring-imputed

> [!definition] Coding 3 — reformulate as a Poisson count (Eq. 22.3, Ch. 22.4, pp. 349-350)
> "**Another approach is to use the kind of event, observed adoption or censored, as a binary outcome variable
> … You can think of this as the number of adoptions observed for an individual cat in the observed
> duration.**"
> $$
> y_i \sim \text{Poisson}(\lambda_i d_i)
> $$
> ```stan
> parameters {
>   vector<lower=0>[2] lambda;
> }
> model {
>   lambda ~ exponential(10.0);
>   adopted ~ poisson(lambda[color] .* days);
> }
> ```
> **Four lines, no branching.**
>
> **Why it is exactly equivalent** — two probability facts: "**the geometric distribution is a discrete version
> of the exponential distribution**," and "**the Poisson distribution is intimately related to the exponential
> distribution through the assumption of a constant rate.**"
> $$
> \text{adopted:}\quad \lambda e^{-\lambda d} \quad\text{vs.}\quad \frac{\lambda^1 e^{-\lambda d}}{1!} = \lambda e^{-\lambda d}
> $$
> $$
> \text{censored:}\quad e^{-\lambda d} \quad\text{vs.}\quad \frac{\lambda^0 e^{-\lambda d}}{0!} = e^{-\lambda d}
> $$
>
> "**So the probability expressions really are identical, in the ideal world of mathematics at least. Inside
> the computer, the different versions impose different tradeoffs. And inside a person's head, the different
> versions can be understood and expanded in different ways.**"
>
> **The limitation, stated:** "**In this version of the model, if the probability of adoption is not constant in
> time, then the probability expressions above may no longer be simply equivalent. But if your model permits
> reformulation in this way, it can be an effective way to deal with censoring that is otherwise difficult to
> code or compute.**"
>
> **And a subtlety worth noticing:** "**the model being fit does not include censoring, so it is not the same as
> the generative model** … **it does not contain a model for generating the observed durations $d$. This is
> like the other censoring models in this chapter but perhaps is less clear, because it seems like the
> adoptions follow a Poisson distribution, but only if we ignore the generative model of the $d$ variable.**"
^def-censoring-poisson

## Examples

> [!example] General lessons (Ch. 22.5, pp. 350-351)
> **On the models as scaffolds:** "**A realistic analysis might go on to consider alternative functions for how
> the probability of adoption changes over time and include measured variables such as age** … **In each case,
> a new version of the model should be modified, and a new simulation function written, so that each new
> feature of the model can be tested and understood.**"
>
> **On why imputation is not merely a trick:** "**Sometimes the introduction of a latent variable is
> computationally superior to marginalizing, because it doesn't require using a cumulative distribution
> function to marginalize the unknown values. In this example, the cumulative distribution can be derived from
> the geometric distribution, and it poses no computational problems. But if you used a different distribution
> … the calculation might be more difficult. When the probability of adoption on any particular day is a
> function of many variables and the time spent already waiting, the numerical work required for
> marginalization can be unstable. So the imputation approach is not silly at all.**"
>
> Note that this is the **reverse** of the marginalization advice in
> [[Modeling Ideas to Address Computing Problems#Remedy 2 — Marginalization]] — there, marginalizing fixed a
> funnel; here, imputing avoids an unstable CDF. **Neither direction is universally right.**
>
> **On the value of redundant implementations:** "**If nothing else, successfully expressing the same estimand
> with different probabilistic programs gives us confidence that we understand the data generating model and
> have not made a mistake in coding.**"
>
> This is [[SBC in the Workflow#SBC as software testing|SBC-style software testing]] by another route: two
> independent codings that must agree.

> [!example] Exercises 22.1-22.2 — splitting the sample by time (Ch. 22.6, p. 351)
> - **22.1** Fit separately to the first and second halves of the data (by admission date). **(a)** Compare to
>   the combined fit and use LOO to compare separate vs. combined models. **(b)** "**Use the model fit to the
>   first half of the data to predict the data in the second half, and vice-versa.**"
> - **22.2** "**What happens if the sample size is much smaller? Try dividing the data into $K$ roughly equal
>   pieces, ordering by the dates.**"

## Connections

- The three codings are a worked demonstration of the claim in
  [[A Data Model Is Not Just a Likelihood]] that "**knowing the likelihood component does not tell us what was
  the original data model**" — here the same likelihood is reached from a geometric duration model, an
  imputation model, and a Poisson count model.
- The imputation coding makes the prior/likelihood duality of
  [[Specifying the Data Model and the Prior]] concrete in a single line of Stan.
- The incremental construction method is
  [[Modeling Ideas to Address Computing Problems#Debugging strategy 2 — meet in the middle]] executed from the
  simple end only, because the target model was known in advance.

## See Also
- [[A Data Model Is Not Just a Likelihood]] — censoring as the canonical likelihood/data-model gap
- [[Designing Simulated-Data Experiments]] — the simulate-then-fit discipline used at every step
- [[Missing Data Models]] — imputation as a general strategy
- [[Modeling Ideas to Address Computing Problems]] — marginalization, in the opposite direction
