---
title: "Model Building - Time-Series Decomposition for Birthdays"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 27, pp. 417-436 (Figures 27.1-27.16, Eq. 27.1-27.3)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[Fit Fast, Fail Fast]]"
  - "[[Variational Inference and Pathfinder]]"
  - "[[Hilbert Space Gaussian Processes]]"
  - "[[Approximate Algorithms and Approximate Models]]"
used_by:
  - "[[Models for Regression Coefficients - Student Grades]]"
aliases:
  - "Birthdays"
  - "Valentine's Day and Halloween births"
  - "Fast approximate workflow"
---

# Model Building — Time-Series Decomposition for Birthdays

> [!summary]
> Twenty years of U.S. daily birth counts (1969-1988), decomposed by **Hilbert-space-approximated
> Gaussian processes** into a slow trend, an annual cycle, day-of-week effects that grow over time, and
> **366 day-of-year effects**. Two things make this the book's best demonstration of *computational*
> workflow. First, the **fast-approximate ladder** — optimization → Laplace → Pathfinder → short HMC with
> Pathfinder initialization — each rung with its own diagnostic. Second, the **methodological reframing**
> in the opening: rather than testing whether Valentine's Day is significant, estimate all 366 days at
> once, because "**it becomes clear that there are special-day effects for every day of the year, and the
> question is how large these are, not their existence.**"

## Overview

> [!important] The reframing that motivates the whole analysis (Ch. 27.1, p. 417)
> Levy, Chung, and Slade (2011) compared births on Valentine's Day and Halloween with the preceding and
> following weeks, reporting "a 3.6% increase in spontaneous births and a 12.1% increase in cesarean
> births" on Valentine's Day and decreases of 5.3% and 16.9% on Halloween.
>
> > "**In order to study this more systematically we decided to look at all 366 days of the year. This is an
> > illustration of a general principle in statistics that it is often easier to study a particular issue by
> > embedding it in a larger set of questions. Instead of trying to determine whether some particular
> > comparisons are 'statistically significant,' we consider them as part of a larger pattern to be
> > estimated.**"
>
> **A simplification, with its reason:** "**To keep things simple we study total births, as the division of
> natural, cesarean, and induced is difficult to analyze because of selection effects and interactions, for
> example the rate of natural births being lower on a certain day because the birth was more likely to have
> been induced the day before.**"
^imp-embed-in-larger-question

## Main Content

### Exploratory decomposition

> [!example] What the raw series shows, and what plain averages hide (Figures 27.2-27.6, Ch. 27.2)
> The raw series has "**a long-term trend, an annual cycle, and a separation into two clusters, which we guess
> represent weekdays and weekends.**"
>
> **Plain day-of-year averages are contaminated:** "**There is also a weekly fluctuation which can be attributed
> to the fact that the 20-year period of the data does not coincide with a complete cycle of weekdays: some of
> the dates of the year happen to have more weekends and so would be expected to have fewer births.**"
>
> **A simple additive model on the log scale** fixes this:
> ```r
> fit_1 <- stan_glmer(log(births) ~ (1 | day_of_year) + (1 | day_of_week) + (1 | year), data=data)
> ```
> "**fitting the additive model has cleaned up the day-of-year effects, as can be seen for Valentine's Day,
> Leap Day, and April Fool's Day.**" Coefficients are exponentiated for display, "**so that they are
> interpretable on the multiplicative scale.**"
>
> **Split-half comparison** shows "the variation is more pronounced during the second decade, which makes sense
> given the increase of cesarean and scheduled births during this period." (A display note: the year effects
> jump at the midpoint "**because these effects are all estimated relative to the average value of the process,
> which is different for the first and second halves.**")

> [!warning] Three limitations of the additive model (Ch. 27.2, p. 420)
> 1. "**Year effects are a crude way of handling time trends, which are not actually constant within years.**"
> 2. "**The effects for day of week and day of year themselves change over time, presumably in a smooth and
>    roughly monotonic way. Allowing separate effects for the first and second half of the time series is not a
>    good model for these changes.**"
> 3. "**The day-of-year effects are a superposition of a smoothly-varying seasonal pattern and special day
>    effects which are much more localized in time. The day-of-year effects in the additive model do not
>    acknowledge this smoothness, nor do they allow for estimation of special-day effects relative to the
>    seasonal pattern.**"
>
> The target model (Eq. 27.1), sketched in spline form before being rebuilt with GPs:
> $$y_t = g(t|\phi_1) + (1+\alpha t)\,g(\text{day\_of\_year}[t], \phi_2) + (1+\beta t)\,\zeta_{\text{day\_of\_week}[t]} + (1+\gamma t)\,\xi_{\text{day\_of\_year}[t]} + \text{error}_t$$

### Hilbert space Gaussian processes

> [!definition] Why GPs rather than splines, and how the approximation works (Ch. 27.3, pp. 420-421)
> "**In this specific case the difference between using splines or Gaussian processes is likely to be small, but
> we favor certain Gaussian processes here because the hyperparameters related to the length scale and
> magnitude of variation have natural interpretation in this multicomponent model.**"
>
> **The computational problem and its fix:** exact GP computation costs $O(k^3)$ in the number of unique
> predictor values. "**One way to speed the computation when the number of predictors is low is to use a set of
> basis functions that approximates the GP by a linear model. Here we use Hilbert space basis functions. With
> increasing number of basis functions, the approximation error can be made arbitrarily small.**"
>
> $$f(x) \approx \sum_{j=1}^m \phi_j(x)\, w_j(l_f, \sigma_f)\, \beta_j, \qquad \beta_j \sim \text{normal}(0,1)$$
>
> where $\phi_j$ are "**sine and cosine functions with different frequencies and truncated to a predefined
> box**" and $w_j$ are square roots of spectral densities acting as **prior weights**.
>
> **The length scale seen through the weights** — this is the clearest explanation of what a GP length scale
> *does*:
> | Length scale | First eight weights |
> |---|---|
> | **1.0** | $(1.4, 1.1, 0.68, 0.35, 0.15, 0.05, 0.02, 0.00)$ |
> | **0.3** | $(0.86, 0.84, 0.80, 0.76, 0.70, 0.64, 0.57, 0.50)$ |
>
> "**Decreasing weights mean that a priori the more wiggly basis functions will have smaller coefficients, and
> thus less wiggly functions are more probable in the prior.**" With length scale 0.3, "**the weights are
> decreasing more slowly for the more wiggly basis functions.**"
>
> (Solin and Särkkä 2020; Riutort-Mayol et al. 2023.)
^def-hilbert-gp

> [!important] The number of basis functions as an implicit prior
> Starting with $m_1 = 20$: "**The small number of basis functions sets an additional implicit prior, as more
> wiggly functions cannot be expressed. For these data, 20 basis functions should be enough to express the slow
> smooth trend, and it makes the initial experiments faster. It is possible to later examine in more detail
> whether more basis functions are needed, but this particular model expansion can be delayed until other
> components have been added.**"

### The fast-approximate ladder

> [!example] Rung 1 — optimization (Ch. 27.4, pp. 422-423)
> ```r
> opt1 <- model1$optimize(data=standata1, init=0, algorithm="bfgs", jacobian=TRUE)
> ```
> "**Our first birthdays model has only 24 parameters fit to a series of length 7305, and the model structure is
> such that we would expect the posterior distribution to be close to normal (in unconstrained space). We can
> safely use optimization to find a posterior mode to use as a quick initial result to check that the model code
> is computing what we intended, with no NaNs, Infs, or nonsensical results.**"
>
> ```
> intercept  sigma_f1  lengthscale_f1  sigma
>    -0.056       1.1            0.18   0.81
> ```
>
> **Checking the numbers against what standardization implies:** "**We have internally centered and standardized
> time $t$ and target $\log(\text{births})$ to have zero mean and unit standard deviation, thus $\sigma < 1$ is
> sensible. On the other hand, $\sqrt{\sigma_{f_1}^2 + \sigma^2} > 1$, which indicates that the optimization
> result is not perfect.**" And the length scale "**transformed back to days is approximately 380 days, which is
> sensible as the goal was to model the slow trend component with scale larger than a year.**"
>
> **The payoff:** "**the optimization takes less than one second, whereas Stan's HMC sampling with default
> options would have taken several minutes.**"
^ex-optimization-rung

> [!example] Rung 2 — Laplace, with a self-check (Ch. 27.4, p. 424)
> ```r
> lap1 <- model1$laplace(data=standata1, mode=opt1, draws=400)
> ```
> gives posterior uncertainty as well. But: "**As of this writing, the implementation of the Laplace method in
> Stan does not automatically run diagnostics to assess the quality of the normal approximation, but we can do
> this manually by checking the Pareto $k$ diagnostic for the importance sampling weights.**"
> ```r
> ldraws1 |> mutate_variables(lw = lp__ - lp_approx__, w = exp(lw - max(lw))) |>
>   subset_draws(variable="w") |> summarize_draws(pareto_diags, .args=list(tail="right"))
> ```
> ```
>  variable khat min_ss khat_threshold convergence_rate
>  w         1.0    Inf           0.62                0
> ```
> "**Here $\hat{k}$ is larger than 0.7, indicating that importance sampling even with Pareto smoothing is not
> able to provide accurate adjustment. The `min_ss` statistic indicates how many draws would be needed … and in
> this case that number is infinite.**"
>
> **This is the check from [[Approximations Based on Joint and Conditional Posterior Modes]] applied by hand**,
> and it does exactly what that section promises: it tells you the approximation is not good enough, and it
> would have told you how to fix it if it were.

> [!warning] Rung 3 — short MCMC alone finds multimodality (Figure 27.9, Ch. 27.4, p. 425)
> ```r
> fit1 <- model1$sample(data=standata1, iter_warmup=100, iter_sampling=100, chains=4, parallel_chains=4)
> ```
> "**We intentionally use just 1/10th length from the usual recommendation, as rough results are sufficient
> during the iterative modeling process. Running four chains with four core CPUs adds essentially nothing to
> wall clock time while allowing us to monitor mixing of chains and possibly to find multiple modes.**"
> ```
>  variable         mean median   sd   rhat ess_bulk
>  sigma_f1         0.38   0.29 0.20   2.2       5.5
>  lengthscale_f1    1.7    1.7  1.5   1.8       6.2
> ```
> "**the traceplots reveal the multimodality clearly: one of the chains is stuck with a high length scale
> parameter and high residual variance** … **it was easy to figure out that some of the chains got stuck in
> modes corresponding to a constant effect which from our simple data plots we can see is wrong.**"

> [!example] Rung 4 — Pathfinder, then Pathfinder-initialized HMC (Ch. 27.4, pp. 425-426)
> ```r
> pth1 <- model1$pathfinder(data=standata1, init=0.1, num_paths=10, single_path_draws=40,
>                           draws=400, history_size=100, max_lbfgs_iters=100)
> ```
> "**Pathfinder works better than Laplace for hierarchical models because it avoids getting stuck deep in the
> funnel.**" The tuning is explained: increased L-BFGS history size "**for improved accuracy (better matching
> the posterior covariance)**" and limited iterations "**to reduce computation time.**"
>
> Pathfinder also warns: `The Pareto k value of 0.94 is greater than our threshold of 0.7.` "**When Pareto $k$
> is high, the Pareto-smoothed importance sampling algorithm returns fewer distinct draws, and it is useful to
> check that too**" — here `sd > 0`, so there is more than one distinct draw.
>
> **Then initialize HMC from it:**
> ```r
> fit1 <- model1$sample(data=standata1, iter_warmup=100, iter_sampling=100,
>                       chains=4, parallel_chains=4, init=pth1)
> ```
> ```
>  variable         mean median     sd rhat ess_bulk
>  sigma_f1         0.58   0.57  0.11   1.0     215.
>  lengthscale_f1   0.23   0.23  0.039  1.0     209.
>  sigma            0.81   0.81  0.0074 1.0     312.
> ```
> "**With the Pathfinder initialization the results are better** … **Looking at the posterior summaries we see
> that now $\sqrt{\sigma_{f_1}^2 + \sigma^2} \approx 1$ which matches the overall variation of the standardized
> target.**"
>
> **And Figure 27.11 quantifies Pathfinder's limitation:** "**When the normal approximation is poor, Pathfinder
> tends to underestimate the posterior variability, which makes it less useful as the final inference approach,
> but it can still be useful to initialize HMC.**"
^ex-pathfinder-init

> [!important] Which warnings to act on during iteration
> "**In many of the short HMC runs for different models we saw some or many divergences and usually a large
> number of treedepth exceedances.**
>
> **Divergences indicate possible bias and should be eventually investigated carefully, but during the process
> of iterative model building it is possible that the later models are so much better that the possible
> estimation biases for the worse models don't matter.**
>
> **Treedepth exceedances indicate difficult geometry and slow mixing, and sometimes the computation can be
> improved by changing the parameterization or priors, but treedepth exceedance does not indicate bias, so
> there is no need for more careful analysis if the resulting ESS and MCSE values are good for the purpose at
> hand.**"
>
> A rare and useful piece of triage advice: **divergence = possible bias, treedepth = only slowness.**

### The model sequence

> [!definition] Five models, each adding one component (Ch. 27.4, pp. 422-430)
> | # | Model | Variance explained |
> |---|---|---|
> | **1** | $f(t) = \text{intercept} + f_1(t)$ — slow trend, exponentiated-quadratic GP | — |
> | **2** | $+\,f_2(t)$ — **periodic** GP, period 365.25 (Eq. 27.2) | trend 36%, annual 8% |
> | **3** | $+\,\beta_{\text{day\_of\_week}[t]}$ (Eq. 27.3) | day-of-week **44%**, total **89%** |
> | **4** | $\times \exp(g_3(t))$ on the day-of-week term — **effects grow over time** | total **90%** |
> | **5** | $+\,\beta_{\text{day\_of\_year}[t]}$ with a **regularized horseshoe(0, 0.1)** prior | — |
>
> **Model 4's construction is worth noting:** $\exp(g_3(t))\beta_{\text{day\_of\_week}[t]}$ with $g_3$ a third
> GP — "**This last term allows the magnitude of the day-of-week effects to slowly vary over time.**" It is
> visualized by splitting it: $\exp(g_3(0))\beta$ (the effects at the start) and $\exp(g_3(t) - g_3(0))$ (the
> changing importance).
>
> **Model 5's prior:** "**a long-tailed distribution that is concentrated near zero but with a thick tail
> (Piironen and Vehtari 2017b), expressing the assumption that most individual day-of-year effects will be
> small but with occasional large values.**"

> [!warning] Two bugs found by fast iteration
> **The double intercept.** "**The first version of model 2 with the added periodic component turned out to be
> slow. With the default MCMC options the inference would have taken hours, but with the short chains it was
> possible to infer that something has to be wrong.** … **it turns out that the periodic component was
> including another intercept term and with two intercept terms their sum was well identified by the data, but
> individually they were not well identified, and thus the joint posterior distribution was wide, which led to
> very slow mixing.**" (The same aliasing as
> [[Failure Modes and Steps Forward#Failure 3 — Competing parameters and aliasing]].)
>
> **The redundant global intercept.** "**a strong correlation between the intercept and the first basis function
> was noted in the posterior simulations, which led to a suggestion to remove the intercept term, which was no
> longer needed as the data had been centered. The sampling is even faster without the explicit intercept
> term.**"
>
> "**This bad model is not shown here, but the optimization, short MCMC chains, and sampling diagnostic tools
> were crucial for fast experimentation and solving the problem.**"

### The horseshoe, and a parameterization surprise

> [!warning] Model 5 breaks, and the fix is the *opposite* of the usual advice (Ch. 27.4, p. 433)
> "**As before, we first tried to fit this model using optimization, but this time the resulting estimate did
> not make sense — this can happen as the number of parameters in a model becomes larger. We moved to MCMC
> sampling, but this was slow. Without Pathfinder initialization even running short chains of length 200 would
> have taken more than an hour.**"
>
> The chapter **postpones** the horseshoe, substitutes an easier heavy-tailed $t_\nu$ prior, establishes that
> the day-of-year component works, and only then returns to diagnose the horseshoe:
>
> > "**Because it is presented as a scale mixture of normals involving hierarchical prior, it is common practice
> > to use a non-centered parameterization for the regularized horseshoe prior. This parameterization is useful
> > when the information from the likelihood is weak and the prior dominates, and indeed the regularized
> > horseshoe model is often used for problems with fewer observations than unknowns.**
> >
> > **But in the birthday problem, each day-of-year effect is informed by several observations from different
> > years, and the centered parameterization works better.**"
>
> "**In Stan it is easy to switch from the non-centered to the centered parameterization by removing the
> multiplier from one of the parameter declarations.**"
>
> Exactly the caveat given in [[Failure Modes and Steps Forward#The funnel]] — non-centered is better under a
> *weak* likelihood — here encountered in practice, in a model where the default advice is strongest.
^wrn-centered-beats-noncentered

> [!example] The $t_\nu$ prior and what it reveals (Figures 27.14-27.16)
> "**The shape parameter $\nu$ of the $t$ distribution controls the tail thickness, and the posterior is
> concentrated to values close to 0.6, which corresponds to a distribution with thicker tails than Cauchy. As
> the $t$ distribution includes the normal as a special case ($\nu \to \infty$), this is strong indication that
> the normal prior is not appropriate.**"
>
> **The effect on the estimates:** "**All the smaller effects and their posterior intervals have been shrunk
> closer to zero, all the special days still have visible spikes, and some relative effects are now more
> pronounced. On the other hand, the effects for April 1st and Halloween are more uncertain; under the
> posterior distribution, we are only 92% and 83% sure that these days have negative effects.**"
>
> "**Leave-one-out cross validation favors the $t$ prior over the normal, which is not a surprise, as it could
> be assumed that a small number of days have much bigger effects than most.**" LOO does **not** strongly
> distinguish $t_\nu$ from the regularized horseshoe.

> [!important] On overfitting through the model sequence
> "**In this case, each additional model component improved the cross validation predictive performance of the
> models so much that we have no concern about overfitting. Only at the end, the difference between the two
> priors … was that small that by selecting the seemingly better we might overfit. However, when there are only
> two models with similar predictive performance, the amount of overfitting is negligible**" (McLatchie and
> Vehtari 2024).
>
> The condition from [[Model Selection and Overfitting]] — a dominant model, or few models — verified rather
> than assumed.

### Two honest failures of the final model

> [!warning] Overshrinking the 13th, and the ringing problem (Ch. 27.4, p. 433)
> **The 13th:** "**We are modeling the date-of-year effects independently, and the $t$ model shrinks each of
> these almost all the way to zero.** … **The way to fix this in the model is to recognize this possible
> pattern and include a 13th-of-the-month effect and maybe also a Friday-the-13th effect.**"
>
> **The ringing, which is the more interesting failure:** "**The problem with the ringing is more subtle, and it
> comes down to the fact that the baby has to come out sometime.**
>
> **For example, consider Memorial Day: there is a big negative spike on that day but no balancing positive
> values the few days before or after. This fitted model thus implies that 15% of the births that would have
> happened on Memorial Day simply disappear, and similarly on other holidays, for example around Christmas and
> New Year's where there are several days of fewer births without nearly enough positive days to balance
> out.**"
>
> **A model can pass every statistical check and still violate conservation of babies.** The failure is visible
> only through substantive reasoning about the process — the kind of check
> [[Statistical and Scientific Inference]] argues no diagnostic can supply.
^wrn-ringing-problem

## Examples

> [!example] General lessons (Ch. 27.5, pp. 433-434)
> "**We were successful in that we were able to estimate day-of-year effects without needing to pre-specify
> Valentine's Day, Halloween, Christmas, or other such notable dates.**"
>
> **On the computational workflow:** "**The iterative model building process can proceed more efficiently by
> following the fail fast principle. Instead of starting with the best possible inference algorithm, we can use
> faster approximate options and see if our model code fails. Even when switching to HMC, we can start with
> short chains initialized from Pathfinder to check that we get something useful, before spending more time and
> electricity to run the final inference for the chosen model.**
>
> **In this scenario almost all model improvements yielded such big changes that even with the short HMC runs it
> was clear which model was better. Only in the end were there two models for which neither was clearly a
> better fit to data. Beyond all this, there were many versions of the models that had major errors or which
> differed so little from the other models being fit that we did not show them here. Fits using fast
> approximate algorithms helped us fix bad models and skip past unnecessary modifications.**"

> [!example] Exercises 27.1-27.6 (Ch. 27.6, pp. 434-435)
> Each targets one of the acknowledged flaws:
> - **27.1** Check residuals for a 13th-of-the-month and Friday-the-13th effect, then model them.
> - **27.4** "**in real life we would expect a negative interaction: for example, the number of babies born on
>   Christmas, if it falls on a Sunday, should not be as low as predicted based on adding the Christmas and
>   Sunday effects.**"
> - **27.5** "**Replace the spikes for day-of-year effects with ringing functions.**"
> - **27.2** Fit separately to each half — "**The point here is not to use the first half as training data and
>   the second half as test data but rather to see what evidence there is to support fitting a model with two
>   sets of parameters.**"
> - **27.3** Refit to 1/10, 1/100, 1/1000 samples: "**Are there additional computational challenges?**"
> - **27.6** Reproduce everything on 2000-2014 data.

## Connections

- This is the case study [[Fit Fast, Fail Fast]] and
  [[Approximate Algorithms and Approximate Models]] are written for: **four approximation rungs, each with a
  diagnostic, used to iterate through many models cheaply before spending on the final fit.**
- The centered-beats-non-centered result is a genuine qualification of standard practice, and complements
  the ordering-constraint failure in
  [[Model Building with Latent Variables - Animal Movement]] — **two case studies where the textbook
  computational fix was the wrong move.**
- The ringing problem is the clearest example in the book of a model that is statistically adequate and
  scientifically incoherent — see [[Statistical and Scientific Inference]].

## See Also
- [[Variational Inference and Pathfinder]] — Pathfinder as initializer, its main endorsed use
- [[Hilbert Space Gaussian Processes]] — the basis-function approximation
- [[Fit Fast, Fail Fast]] — the principle this chapter operationalizes
- [[Global-Local Shrinkage Priors]] — the regularized horseshoe used for day-of-year effects
