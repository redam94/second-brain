---
title: "Prior Specification for Regression Models - Sleep Study"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/brms
  - method/priorsense
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 17, pp. 275-292 (Figures 17.1-17.12)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[Prior Distributions]]"
  - "[[Influence of Likelihood and Prior]]"
  - "[[Joint Priors and Covariance Matrices]]"
  - "[[Hierarchical Linear Models]]"
used_by:
  - "[[Predictive Model Checking and Comparison - Clinical Trial]]"
aliases:
  - "sleepstudy"
  - "Sleep deprivation reaction times"
  - "Priors on the log scale"
  - "Quantile matching for priors"
---

# Prior Specification for Regression Models — Sleep Study

> [!summary]
> A prior-specification walkthrough on `lme4`'s **`sleepstudy`** data: 18 people, 7 nights of sleep
> deprivation, reaction times in milliseconds. The most instructive moment is a **failure**: reusing
> carefully chosen priors on a lognormal model produces prior predictive means **off by 300 orders of
> magnitude**, because exponentiation inflates the right tail. The fix — **match quantiles rather than
> transform hyperparameters** — turns $\text{normal}(250, 100)$ into $\text{normal}(5,\ 0.55)$, where the
> sd of 0.55 "**might look small and potentially very informative but can actually be wide on the original
> scale.**" Model checking then finds the real problem was never the priors: **LOO-PIT reveals outliers,
> and a $t$ data model beats the normal by an elpd difference of 38.7 ± 12.5.**

## Overview

> [!important] The purpose of the chapter, stated plainly (Ch. 17, pp. 275-276)
> "**Prior distributions are at the heart of Bayesian statistics** … In addition to the benefit of including
> useful information, **proper priors (those that have finite integrals and do not depend on the data) are
> needed to specify a generative joint model** … **Also, priors that have low probability for ridiculous
> parameter values can improve computational efficiency.**"
>
> **And the honest framing:** "**For most of these models, the posterior will be qualitatively similar across
> a wide range of priors because the data are informative relative to the model complexity. So, for the most
> part, this case study is not set up to demonstrate the importance of priors but rather to explain the
> process of prior specification in a relatively simple scenario in order to prepare readers for situations
> where prior specification is actually essential.**"
>
> **The data.** `sleepstudy` (Belenky et al. 2003): 18 people, <3 hours of sleep per night for 7 consecutive
> nights, average reaction times in ms. Days 0-1 (adaptation and training) are dropped:
> ```r
> sleepstudy <- sleepstudy |> filter(Days >= 2) |> mutate(Days = Days - 2)
> ```
> $N = 144$ observations.

## Main Content

### Step 1 — priors for a simple linear model, reasoned from scale

> [!definition] Understanding the scale of each parameter first (Ch. 17.1, p. 276)
> $$
> y_n \sim \text{normal}(\mu_n, \sigma), \qquad \mu_n = b_0 + b_1 x_n
> $$
> | Parameter | Meaning | Scale |
> |---|---|---|
> | $b_0$ | "**the predicted average response when the predictor is zero**" | **milliseconds** |
> | $b_1$ | "**the average difference in the response, comparing two data points that differ by 1 in the predictor**" | **milliseconds per day** |
> | $\sigma$ | "**how much the individual observations are expected to vary, comparing different data points with the same value as the predictor**" | **milliseconds** |
>
> **The target:** "**weakly informative priors that make extreme values given the parameters' scales highly
> unlikely (for example, ruling out intercept reaction times of 10 seconds or more), while being relatively
> noninformative in the range [of] plausible values (intercept reaction times between 100 and 300
> milliseconds).**"
>
> - **$b_0 \sim \text{normal}(200, 100)$** — "predicts $b_0 \in (100,300)$ with about 68% probability and
>   $b_0 \in (0,400)$ with about 95%." *An acknowledged awkwardness:* "**It is awkward that there is a
>   nonzero probability of a negative intercept, given that reaction times must be positive.**"
> - **$b_1 \sim \text{normal}(0, 20)$** — "it seems unlikely that average reaction times would differ by more
>   than 40 milliseconds per day," giving $b_1 \in (-40,40)$ with ~95% probability.
> - **$\sigma \sim \text{exponential}(1/50)$** — "**we would expect $\sigma$ to be around 50 ms.** The
>   exponential distribution has the property that its standard deviation is equal to the mean, hence this
>   prior encodes substantial uncertainty around the prior mean."
^def-scale-first

> [!important] Should the slope prior encode the expected direction?
> "**We have a prior assumption that sleep deprivation should increase reaction time. Depending on the
> purpose of our model, though, we might be hesitant to encode this direction into the prior for $b_1$, if
> the goal of our inference is to summarize the information in the data alone. In contrast, if our interest is
> prediction and immediate decision making, we may very well want to include such prior information.**
>
> **This illustrates how the model should depend not just on existing knowledge but also on the goals of
> inference.**"
>
> The same tension resolved differently in [[Bioassay - A First Probabilistic Program]] (constraint imposed)
> and [[Multiple-Choice Exam - A Full Workflow Walkthrough]] (constraint declined).

> [!important] Centering the predictor, and why it is more than cosmetic
> "**Regression models often contain predictors where zero is a nonsensical value** … think of IQ values which
> are traditionally scaled to be normally distributed with population mean 100 and sd 15 … **Hence, the
> intercept $b_0$ describing the expected response value when all predictors are zero is often nonsensical as
> well.**"
> $$
> x_n^c = x_n - \bar{x}, \qquad \mu_n = b_0^c + b_1 x_n^c, \qquad b_0 = b_0^c - b_1\bar{x}
> $$
> "**This can make prior specification easier and also increase computational efficiency, an example of the
> folk theorem of statistical computing.**" (`brms` does this by default; `class=Intercept` always refers to
> the centered intercept.)
>
> Note the small adjustment made in consequence: **$b_0^c \sim \text{normal}(250, 100)$** rather than 200,
> "**to account for the assumption that the reaction time will likely be a bit higher on day 3.5 (the mean of
> the `Days` predictor) than on day 0.**"

**Result** (`fit1`): Intercept $268.17 \pm 7.80$, Days $11.34 \pm 1.88$, sigma $51.21 \pm 3.14$.

> [!warning] The priors did not matter here — and the authors say so
> "**The priors don't really matter much for this example, given the simplicity of the linear model (3
> parameters) informed by $N = 144$ observations** … **Had we used the very weak default priors of brms, or
> even entirely flat priors, the posterior would be virtually indistinguishable.**"
>
> **Power-scaling confirms it (Figure 17.3):** the posterior is "**virtually unaffected by small perturbations
> in the prior**" at $\alpha \in \{0.8, 1, 1.25\}$.

> [!example] Making the prior matter — and the tail-shape twist (Figure 17.4, Ch. 17.1, p. 279)
> "**We need to make priors very informative (that is, narrow) in order to affect the posterior here.**"
>
> | Prior on $b_1$ | Posterior mean | 95% interval |
> |---|---|---|
> | $\text{normal}(0, 20)$ (original) | 11.34 | $(7.6, 15.1)$ |
> | **$\text{normal}(0, 1)$** | **3.8** | $(2.0, 5.4)$ — **"much different"**, and highly sensitive under power scaling |
> | **$t_7(0, 1)$** — "close to $\text{normal}(0, 1.2)$" | **9.2** | $(6.6, 11.7)$ — **"similar to what we had originally obtained"** |
>
> **A nearly identical prior scale, a completely different posterior**, because of tail shape. "**Depending on
> the likelihood, the tail behavior of priors can have strong effects on the obtained posterior inference**"
> — [[Tail Behavior and Prior-Likelihood Conflict]].
>
> The general safeguard: "**One safeguard against accidental informativeness is using priors with much
> heavier tails, for example, $t$ priors with small degrees of freedom instead of normal priors, or gamma
> instead of exponential priors. Changing the model can be tricky, though: moving to heavy-tailed priors on
> the coefficients will change the implied prior on $R^2$.**"

### Step 2 — the multilevel structure and the LKJ prior

> [!definition] Splitting the variance budget (Ch. 17.2, p. 280)
> Adding varying intercepts $b_{0j} \sim \text{normal}(b_0, \tau_0)$ requires a prior on $\tau_0$. **The
> device used:** "**we decide to make the simplifying assumption that the variation within and between people
> is the same and thus split the previous $\text{exponential}(1/50)$ prior on $\sigma$ to be divided between
> $\sigma$ and $\tau_0$**" — giving both $\text{exponential}(1/25)$.
>
> A clean and reusable idea: **when adding a variance component, budget the existing prior variance between
> the old and new terms** rather than choosing a new prior from scratch.
>
> **Non-centered by default:** "**When using Hamiltonian Monte Carlo specifically, it is typically (unless the
> likelihood is very informative) preferable to use the non-centered parameterization**":
> $$
> b_{0j} = b_0 + \tau_0 z_{0j}, \qquad z_{0j} \sim \text{normal}(0,1)
> $$
>
> **Effect on inference:** the overall intercept mean barely moves (268 → 268) "**because each person has the
> same number of observations**," but "**the uncertainty in the overall intercept has now increased**": the
> 95% interval goes from $(253, 283)$ to $(246, 289)$.

> [!definition] The two-dimensional case and LKJ in $d$ dimensions (Figure 17.5)
> Adding varying slopes requires a joint prior on $(b_{0j}, b_{1j})$:
> $$
> \Sigma = \text{Diag}(\tau_0,\tau_1)\, C\, \text{Diag}(\tau_0,\tau_1), \qquad C = \begin{pmatrix} 1 & \rho_{12} \\ \rho_{12} & 1\end{pmatrix}
> $$
> with the non-centered form
> $(\tilde{b}_{0j}, \tilde{b}_{1j})^t = \text{Diag}(\tau_0,\tau_1)\, L\, (z_{0j}, z_{1j})^t$ where $C = LL^T$.
>
> **The substantive reason to allow correlation:** "**People who have lower reaction times under a regular
> amount of sleep may also be affected less (or more) by sleep deprivation, which would imply a positive (or
> negative) correlation between people's intercepts and slopes.**"
>
> **The LKJ prior, explained precisely.** "**The expected value in the LKJ distribution is the identity matrix
> for any positive value of $\eta$, which can be interpreted as the shape parameter of a symmetric
> $\text{beta}(\eta + (d-2)/2,\ \eta + (d-2)/2)$ distribution, where $d$ is the dimension.**"
> | $\eta$ | Behavior |
> |---|---|
> | $\eta = 1$ | "**the density is uniform over correlation matrices of the respective dimension**" |
> | $\eta > 1$ | "**the identity matrix is the mode of the prior, with a sharper peak for larger values**" |
> | $\eta \in (0,1)$ | "**U-shaped with a trough at the identity matrix, which leads to higher probabilities for nonzero correlations**" |
>
> **The dimension trap, made visual by Figure 17.5:** "**the LKJ(1) prior implies uniformity only in the
> two-dimensional case and becomes increasingly centered around 0 marginally as the number of dimensions
> increases.** In this context of modeling a distribution of regression coefficients, **increasing the
> dimension of this covariance corresponds to increasing the number of varying coefficients.**"
>
> Exactly the warning in [[Joint Priors and Covariance Matrices#Priors for covariance matrices]] — here shown
> as a plot of the marginal density of $\rho$ for $d = 2, 5, 10$.
^def-lkj-dimension

**Result** (`fit4`): sd(Intercept) 31.72, sd(Days) 7.25, **cor(Intercept, Days) $0.21 \pm 0.30$** with
interval $(-0.38, 0.78)$ — the correlation is essentially unlearned from 18 people. Intercept 267.54,
Days $11.26 \pm 2.03$.

> [!important] Partial pooling made visible (Figure 17.7)
> Comparing per-person coefficients from **18 independent regressions** against the **joint multilevel model**:
> "**The coefficients are partially pooled toward each other through the multilevel prior, with a pooling that
> is stronger the further away from the center the coefficients are.**"

### Step 3 — priors on the log scale, and how they go wrong

> [!warning] The 300-orders-of-magnitude failure (Figure 17.8, Ch. 17.3, p. 285)
> Moving to a **lognormal** model to guarantee positive predictions:
> $$
> y_n \sim \text{lognormal}(\mu_n, \sigma), \qquad \mu_n = b_0 + b_1 x_n
> $$
>
> "**Having put so much thought into the priors on the linear model above, it would be tempting to just reuse
> the same hyperparameters.**" Reusing $b_0 \sim \text{normal}(250,100)$, $b_1 \sim \text{normal}(0,20)$,
> $\sigma \sim \text{exponential}(1/50)$:
>
> > "**Unfortunately, due to all the parameters now being on the log scale, the implications of these priors
> > become completely ridiculous on the original scale** … **The mean prior predictions are off by 300 orders
> > of magnitude compared to the observed data. Such outlying values are common when specifying priors on log
> > scales because the inverse transform (exponential) inflates the right tail of the priors very strongly.**"
>
> The left panel of Figure 17.8 has a $y$-axis running to $10^{305}$.
^wrn-log-scale-priors

> [!definition] Two ways to translate a prior to the log scale (Ch. 17.3, p. 286)
> **Method 1 — log the hyperparameters. Rejected as inexact.** $\text{normal}(250,100)$ becomes about
> $\text{normal}(5.5, 4.6)$. "**This ignores the change in shape due to the nonlinear log transform, and so
> those priors are by no means equivalent. If we wanted to make those priors equivalent, we would have to
> apply a Jacobian adjustment to correct for the change of measure.**" (Simpson et al. 2017 give a prior
> framework that does account for Jacobians in the univariate case; "**most choices of priors will not.**")
>
> **Method 2 — match quantiles. Recommended.** "**This works in principle for all monotonic transformations,
> even nonlinear ones, because quantiles are equivariant with respect to monotonic transformations. We can
> generally match as many quantiles this way as the prior has hyperparameters, that is, two for a normal
> prior.**"
>
> Worked for $b_0$: the 2.5% and 97.5% quantiles of $\text{normal}(250,100)$ are $q_{2.5} \approx 50$ and
> $q_{97.5} \approx 450$, which log to $3.9$ and $6.1$. Then
> $$
> \text{mean} = \frac{6.1+3.9}{2} = 5, \qquad \text{sd} = \frac{6.1-3.9}{4} = 0.55
> $$
>
> > **"This is similar in the mean to our ad hoc $\text{normal}(5.5, 4.6)$ prior, but very different in the
> > standard deviation. A standard deviation of 0.55 might look small and potentially very informative but
> > can actually be wide on the original scale."**
>
> **The final log-scale priors**, after "playing around with these values a bit until the mean prior predictive
> values make sense":
> $$
> b_0 \sim \text{normal}(5,\ 0.55), \qquad b_1 \sim \text{normal}(0,\ 0.2), \qquad \sigma \sim \text{exponential}(3)
> $$
> "**which was admittedly a lot of effort for just three parameters.**"
^def-quantile-matching

**The multilevel lognormal** reuses the variance-splitting device: $\sigma \sim \text{exponential}(3)$ splits
into $\tau_0, \sigma \sim \text{exponential}(6)$; $\tau_1 \sim \text{exponential}(10)$; and "**the correlation
matrix $C$ is scale independent, and so we can continue to use the LKJ(1) prior despite now having a
log-linear predictor.**"

> [!important] The lognormal model barely changes the fit
> "**The predictions on the person-specific regression lines deviate only minimally from those of the linear
> multilevel model** … it seems that, at least for 0 to 9 days of sleep deprivation, **the effect on reaction
> time can roughly be described as linear. Additionally, for the present data we get little benefit from
> ensuring the lower bound of zero in the predictions via the lognormal model since all the data are far away
> from the boundary.**
>
> **If we were to compare the two models in terms of out-of-sample predictions, we will get better performance
> with the lognormal model, but this may not justify the loss in interpretability of regression coefficients
> on the log scale.**"

### Step 4 — model checking finds the real problem

> [!example] LOO-PIT exposes outliers that the priors never addressed (Figures 17.10-17.12, Ch. 17.4)
> **Normal vs. lognormal by LOO:**
> ```
>        elpd_diff se_diff
> fit5         0.0     0.0
> fit4       -10.6     4.1
> ```
> "**the lognormal model has better predictive performance with 99% probability. [But] looking at Figure
> 17.10, we see some observations far in the tails of the predictive distribution, so it seems like the
> lognormal model might also be bad.**"
>
> **The LOO-CV interval plot (Figure 17.11)** — `pp_check(fit4, type="loo_intervals")` — shows "**some of the
> observations are even further away from the LOO-CV intervals than from the in-sample predictive
> intervals.**"
>
> **Switch the data model to $t$:** `fit4t <- update(fit4, family=student())`
> ```
>          Estimate Est.Error l-95% CI u-95% CI
> sigma       12.23      1.72     9.18    15.92
> nu           2.63      0.75     1.55     4.40
> ```
> "**The 95% posterior interval for the degrees of freedom parameter $\nu$ is $(1.6, 4.4)$, indicating strong
> evidence for the residuals to have a much thicker-tailed distribution than the normal.**"
>
> **LOO-PIT ECDF (Figure 17.12)**, via `pp_check(fit4, type="loo_pit_ecdf", method="correlated")`:
> | Model | $p^{\text{POT}}_{\text{unif}}$ | Reading |
> |---|---|---|
> | **normal (`fit4`)** | **0.003** | "**S-shaped, indicating that the predictive distribution is too wide for most of the observations. This is caused by overestimating the residual scale due to a few outliers, which can also be seen in some LOO-PIT values very close to 0 and 1**" |
> | **$t$ (`fit4t`)** | **0.35** | "**good calibration for the whole range of the data**" |
>
> **The elpd comparison:**
> ```
>         elpd_diff se_diff
> fit4t         0.0     0.0
> fit4        -38.7    12.5
> ```
> — "**the $t$ model as the clear winner**," a difference nearly four times that between normal and lognormal.
^ex-loo-pit-finds-outliers

> [!important] The knock-on effect on the variance decomposition
> "**In the normal model, the outliers increase the estimate of residual variation, which subsequently reduces
> the estimated variation between people. Since the $t$ model has a smaller estimate of the residual
> variation, its estimate of the between-person variation is higher.**"
>
> **And this changes what model comparison concludes.** Comparing varying-intercept to
> varying-intercept-and-slope models:
> ```
> normal:  fit4 vs fit3  →  elpd_diff -15.3 (se 9.0)
>      t:  fit4t vs fit3t →  elpd_diff -44.8 (se 8.6)
> ```
> "**the benefit of adding the varying slope is smaller with the normal than with the $t$ model.**" A
> misspecified data model **hid the structure the varying slopes were capturing.**

> [!example] The Jacobian correction for comparing models on different response scales
> Comparing `fit4t` (on `Reaction`) with `fit4lt` (on `log(Reaction)`) requires accounting for
> $|d\log(y)/dy| = 1/y$, whose log is $-\log y$:
> ```r
> loo4lt_with_jacobian <- loo(fit4lt)
> loo4lt_with_jacobian$pointwise[,1] <- loo4lt_with_jacobian$pointwise[,1] - log(sleepstudy$Reaction)
> loo_compare(loo(fit4t), loo4lt_with_jacobian)
> ```
> ```
>          elpd_diff se_diff
> fit4lt         0.0     0.0
> fit4t         -3.7     2.2
> ```
> "**When the ELPD difference is small, $|$elpd_diff$| < 4$, it is likely that the corresponding standard
> error is underestimated and the elpd_diff posterior is skewed** (Sivula et al. 2025) … **But since the ELPD
> difference is this small anyway, there is no practical predictive difference between the models.**"
>
> The $|$elpd_diff$| < 4$ threshold is scenario 1 of
> [[Model Selection Using Predictive Performance#Three scenarios where the normal approximation fails]].

## Examples

> [!example] General lessons (Ch. 17.5, pp. 291-292)
> "**We need to keep several things in mind simultaneously when setting up a model, including the intended
> purposes of priors, scale dependences, multilevel structures, efficient parameterizations, nonlinearities,
> and implications for the prior predictive distribution.**
>
> **In this light, it is unsurprising that many users of Bayesian methods are hesitant to specify their own
> priors and instead rely on very wide priors commonly provided as defaults in software. This may not always
> be something to worry about though. After all, as we have seen above, the data may be very informative
> relative to the model complexity such that most priors will not affect the posterior to any noticeable
> degree.**
>
> > **But we need to be able to diagnose when this is the case, and when we actually need to think about
> > prior specification more carefully.**"

## Connections

- The chapter's arc is quietly instructive about **where effort pays off**: pages of careful prior reasoning
  changed nothing, while a one-line change of data model (`family=student()`) changed the variance
  decomposition and the model comparison.
- Power-scaling (Figures 17.3-17.4) is [[Influence of Likelihood and Prior]] used exactly as prescribed:
  as a **diagnostic for whether the prior work matters**, not as a target to optimize.
- The LKJ dimension effect and the log-scale prior explosion are two instances of the same theme as
  [[Prior Predictive Checking#Weak priors become strong as dimension increases]]: **a prior's meaning depends
  on the scale you view it on.**

## See Also
- [[Prior Distributions]] — the informativity ladder these priors instantiate
- [[Joint Priors and Covariance Matrices]] — LKJ and the Cholesky parameterization
- [[Influence of Likelihood and Prior]] — power-scaling sensitivity
- [[Cross Validation Checking]] — LOO-PIT and the POT uniformity test
- [[Hierarchical Linear Models]] — BDA3 background
