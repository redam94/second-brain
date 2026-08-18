---
title: "Bioassay - A First Probabilistic Program"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/stan
  - method/brms
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 3.5-3.6, pp. 28-35 (Figures 3.1, 3.2)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Foundations"
doc_type: textbook
depends_on:
  - "[[Computational Tools and Probabilistic Programming]]"
  - "[[Generalized Linear Models]]"
  - "[[Probability and Bayesian Inference]]"
used_by:
  - "[[Multiple-Choice Exam - A Full Workflow Walkthrough]]"
  - "[[Prior Distributions]]"
  - "[[From Inference to Decision]]"
aliases:
  - "Bioassay example"
  - "Rat toxin logistic regression"
  - "LD50"
---

# Bioassay — A First Probabilistic Program

> [!summary]
> The smallest complete end-to-end example in the book: four data points, twenty rats, one logistic
> regression. It demonstrates the full loop — write Stan, compile in **pedantic mode**, read the
> warnings, reason out a weakly informative prior *by projecting it onto the probability scale*,
> refit, check $\hat{R}$ and ESS, plot posterior draws, and post-process to a derived quantity
> (**LD50**) that answers a regulatory decision problem. The example is from Racine-Poon et al. (1986),
> also in BDA3 §2.8.

## Overview

Twenty rats received four doses of a toxin, five rats per dose. The data:

| Dose $x_j$ (log g/ml) | # rats $n_j$ | # deaths $y_j$ |
|---|---|---|
| $-0.86$ | 5 | 0 |
| $-0.30$ | 5 | 1 |
| $-0.05$ | 5 | 3 |
| $0.73$ | 5 | 5 |

> [!definition] The model (Eq. 3.1, Ch. 3.5, p. 28)
> Independent binomial data with logistic probability of death linear in dose:
> $$y_j \sim \text{binomial}\!\left(n_j,\; \text{logit}^{-1}(a + b x_j)\right), \quad j = 1, \dots, J = 4$$
> where $x$ is measured in log g/ml.
^def-bioassay-model

## Main Content

### Step 1 — The first draft Stan program

```r
library(cmdstanr)
df_bioassay <- read.csv("bioassay.csv")
bioassay_data <- with(df_bioassay,
                      list(J=nrow(df_bioassay), x=dose, n=batch_size, y=deaths))
```

```stan
data {
  int J;
  vector[J] x;
  array[J] int n, y;
}
parameters {
  real a, b;
}
model {
  y ~ binomial(n, inv_logit(a + b*x));
}
```

"The core of a Stan program is typically in its `data`, `parameters`, and `model` blocks." The benefit
of the distribution statement (`~`) is that **the model looks similar to the mathematical expression
(3.1)**.

### Step 2 — Hardening the program (fail fast)

> [!important] Two improvements and why each matters
> ```stan
> data {
>   int<lower=0> J;
>   vector[J] x;
>   array[J] int<lower=0> n;
>   array[J] int<lower=0, upper=n> y;
> }
> parameters {
>   real a, b;
> }
> model {
>   y ~ binomial_logit(n, a + b*x);
> }
> ```
> 1. **Bounds** on $J$, $n$, and $y$ serve **two purposes**: they *document* the input restrictions,
>    and they *check* them, letting you know early if your data don't match expectations. "We generally
>    want to write code that **fails fast**." See [[Fit Fast, Fail Fast]].
> 2. **`binomial_logit()`** combines the distribution and the link function and internally uses a
>    **numerically more stable** computation than composing `binomial` with `inv_logit`.

### Step 3 — Compile in pedantic mode and read the warnings

```r
mod0 <- cmdstan_model("bioassay0.stan", pedantic=TRUE)
```

The model compiles but warns:

```
Warning: The parameter b has no priors. This means either no prior is
    provided, or the prior(s) depend on data variables. ...
Warning: The parameter a has no priors. ...
```

> [!warning] Why "no prior" is a real problem even when the posterior is proper
> Not defining a prior corresponds to a **uniform prior, which is improper for unbounded parameters**
> like $(a,b)$. With this particular data the posterior happens to be proper, **but**:
> - an improper prior can lead to computational problems (demonstrated in
>   [[Failure Modes and Steps Forward]]);
> - **[[Prior Predictive Checking]] and [[Simulation-Based Calibration - Overview|SBC]] require proper
>   priors even when the posterior would be proper** — you cannot draw from an improper prior;
> - beyond stability, "even a weakly informative prior can be useful in steering inferences away from
>   unreasonable areas of parameter space."

### Step 4 — Reasoning out a weakly informative prior

This is the methodological heart of the example: **the prior is chosen by projecting candidate
parameter values onto the probability of death**, not by contemplating the log-odds scale directly.

> [!example] Deriving the prior on the slope $b$ (Ch. 3.5, p. 30)
> **What would $b = 1$ mean?** A difference of 1 in log dose corresponds to a difference of 1 in the
> logistic probability of death. Comparing two doses differing by a factor of $e \approx 2.7$, the
> probability of death shifts from $\text{logit}^{-1}(-0.5) = 0.38$ to $\text{logit}^{-1}(0.5) = 0.62$.
> **Given that this is a toxin, such a large slope seems plausible.**
>
> **What would $b = 10$ mean?** Comparing doses differing by a factor of 2.7, the probability shifts
> from $\text{logit}^{-1}(-5) = 0.01$ to $\text{logit}^{-1}(5) = 0.99$. "Without any specific knowledge
> of the toxin involved, we would judge this to be **on the edge of plausibility**."
>
> **Conclusion:** $b \sim \text{normal}(0, 5)$ — "a soft constraint mostly constraining $b$ to be less
> than 10 in absolute value."
>
> **Then a hard constraint.** The very fact that it is a toxin suggests death probability *increases*
> with dose, so $b > 0$, making the prior **half-normal**.

> [!warning] The authors' general stance on hard constraints
> "In general, **we rarely recommend such hard constraints** for parameters, because it is easier to
> detect model misspecification or data coding errors when we use soft constraints. But such hard
> constraints are not conceptually different from, for example, the hard constraint of assuming a
> linear relationship, and the validity of such constraints can be assessed in model checking."
>
> Here positivity is justified twice over: it is natural for a toxin, **and it makes the posterior for
> LD50 well defined** (since LD50 $= -a/b$ is undefined at $b = 0$).
>
> Contrast with [[Multiple-Choice Exam - A Full Workflow Walkthrough]], where the authors deliberately
> *decline* to constrain the discrimination parameter positive, precisely so that negative
> discrimination can be detected as a data-coding error.

> [!example] Deriving the prior on the intercept $a$ (Ch. 3.5, p. 30)
> The doses are on a log scale that includes $x = 0$ (i.e. 1 g/ml), near the middle of the data, so
> $a$ is the log odds of death at a mid-range dose. With only 20 rats, it is reasonable that this
> probability is not too close to 0 or 1.
>
> $a \sim \text{normal}(0,5)$ implies the probability of death at $x=0$ lies between
> $\text{logit}^{-1}(-10) = 4.5 \times 10^{-5}$ and $\text{logit}^{-1}(10) = 1 - 4.5 \times 10^{-5}$.
> "This seems like a **weak** prior here, as it places a lot of probability on extreme log odds values."
> In other contexts where probabilities near 0 or 1 are much less plausible, a narrower
> $\text{normal}(0,2)$ would be better.

```stan
parameters {
  real a;
  real<lower=0> b;
}
model {
  {a, b} ~ normal(0, 5);
  y ~ binomial_logit(n, a + b*x);
}
```

### Step 5 — Fit and check the computation

```r
mod1 <- cmdstan_model("bioassay1.stan", pedantic=TRUE)
fit1 <- mod1$sample(data=bioassay_data, refresh=0)
print(fit1)
```

```
 variable  mean median   sd  mad     q5   q95 rhat ess_bulk ess_tail
     lp__ -5.85  -5.57 0.91 0.68  -7.69 -4.96 1.00     1982     2764
        a  0.64   0.59 0.76 0.76  -0.54  1.97 1.00     1851     1722
        b  6.50   6.19 2.52 2.42   2.97 11.22 1.00     1799     2201
```

> [!important] The convergence thresholds used throughout the book (Ch. 3.5, p. 31)
> "Our **first** job is to check that the posterior draws are a good representation of the true
> posterior distribution."
> - $\hat{R}$ (`rhat`) **below 1.01** (Vehtari, Gelman, Simpson, et al. 2021);
> - **`ess_bulk` and `ess_tail` above 400** (same reference).
>
> `lp__` is the unnormalized log posterior density $p(\theta)p(y|\theta)$ — the **target function**
> computed from the `model` block. See [[The Typical Set and the Log Posterior Density]].
>
> These thresholds recur in [[Chains, Iterations, and Effective Sample Size]]. Note the slightly
> different threshold quoted later in Ch. 4 (ESS > 100 as a minimum for satisfaction) — 400 is the
> recommendation, 100 the floor.

### Step 6 — Project the posterior onto the outcome scale

"After fitting a model, we care not just about inference for the parameters but also about **how its
predictions align with data.** We want to inspect the posterior after it is projected onto the
probability of the outcome."

```r
draws1 <- fit1$draws(format="df")
with(df_bioassay,
  plot(dose, deaths/batch_size, xlab="Dose", ylab="Pr (death)", pch=19, cex=1.5, bty="l"))
invlogit <- plogis
for (s in sample(nrow(draws1), 20)) {
  curve(invlogit(draws1$a[s] + draws1$b[s] * x), col="red", lwd=0.5, add=TRUE)
}
curve(invlogit(mean(draws1$a) + mean(draws1$b) * x), col="blue", lwd=2, add=TRUE)
```

The ggplot2 equivalent (a **spaghetti plot** of 20 draws):

```r
draws1 |>
  resample_draws(ndraws=20) |>
  expand_grid(x=seq(-1, 1, length=100)) |>
  mutate(y = plogis(a + b*x)) |>
  ggplot() +
  geom_point(data=df_bioassay, aes(x=dose, y=deaths/batch_size), size=3) +
  geom_line(aes(x=x, y=y, group = .draw), alpha=.5, color="red") +
  geom_function(fun = \(x) plogis(mean(draws1$a) + mean(draws1$b)*x),
                color="blue", linewidth=1) +
  labs(x="Dose log(g/ml)", y="Pr(death)")
```

### Step 7 — Derived quantities and the decision

> [!definition] LD50 (Ch. 3.5, p. 32)
> The **lethal dose 50%** is the dose at which the probability of death is 50%. Solving
> $\text{logit}^{-1}(a + bx) = 0.5$:
> $$x_{\text{LD50}} = -\frac{a}{b}$$
>
> "In addition to the model parameters and predictions of data, the goals of inference can include
> other quantities that can be expressed as functions of parameters, observed and latent data, and
> predicted values. We can easily obtain posterior draws for derived quantities by **post-processing
> the parameter draws.**"
^def-ld50

```r
draws1 |>
  mutate_variables(LD50 = -a/b) |>
  subset_draws(variable="LD50") |>
  summarize_draws()
```

```
variable    mean  median    sd   mad     q5    q95 rhat ess_bulk ess_tail
LD50     -0.0826 -0.0912 0.131 0.115 -0.277  0.146 1.00    2678.    2447.
```

Base R equivalent, plus the transformation to regulatory units:

```r
draws1$LD50_log_g_ml <- -draws1$a/draws1$b
draws1$LD50_mg_ml <- 1000*exp(draws1$LD50_log_g_ml)
```

`mutate_variables()` is preferred because it uses the same syntax for other types of draws objects,
not only data frames.

> [!example] The decision (Figure 3.2, Ch. 3.5, p. 33)
> The 1983 Swiss poison regulation defines hazardousness categories for chemicals orally given to rats
> based on LD50 in mg/ml, with category boundaries near 500, 1000, and 2000 mg/ml (Categories 3, 4, 5).
> A **quantile dot plot** of the posterior LD50 against these boundaries shows the posterior falls
> squarely within Category 4.
>
> **Conclusion:** "From the fitted model, we can confidently classify the tested toxin to Category 4"
> — and therefore **no further experiments are needed.**
>
> **The forward-looking remark:** "If there were much uncertainty as to which category a toxin would
> belong, it would be possible to **design a future experiment to maximize the expected information
> gain**." This is the bridge to [[Bayesian Experimental Design/Foundations/_Index|Bayesian experimental design]]
> and to [[From Inference to Decision]].

### Step 8 — The same model in brms

```r
bfit1 <- brm(
  deaths | trials(batch_size) ~ dose, family=binomial(link="logit"),
  prior = c(
    prior(normal(0,5), class=Intercept),
    prior(normal(0,5), lb=0, class=b)),
  data=df_bioassay)
```

```
          Estimate Est.Error l-95% CI u-95% CI Rhat Bulk_ESS Tail_ESS
Intercept     0.61      0.79    -0.88     2.17 1.00     2355     2338
dose          6.37      2.58     2.27    12.42 1.00     2390     1657
```

> [!important] Why the brms ESS is higher — centering removes posterior correlation
> `~ dose` implicitly includes an intercept (equivalently `~ 1 + dose`). **brms centers the predictor
> values by default**, "which removes the posterior correlation between the intercept and the other
> coefficients, thus making the computation more efficient." Technically brms sets the prior on the
> intercept *after* centering all other predictors around zero, so the intercept corresponds to the
> prediction when other predictors are at their data averages.
>
> "The bulk and tail effective sample sizes are now slightly bigger due to the predictor removing
> those posterior correlations." This is the same trick applied by hand in
> [[Multiple-Choice Exam - A Full Workflow Walkthrough]] via the standardized predictor $x^{adj}$.

Quick plots: `plot(conditional_effects(bfit1))` for posterior mean and intervals, or
`plot(conditional_effects(bfit1, spaghetti=TRUE, ndraws=20))`. "Often quick plotting functions let you
do something useful quickly but **lack in flexibility**." (20 draws is enough for a readable spaghetti
plot but *not* enough for a good posterior mean estimate.)

## Examples

> [!example] Lessons the authors draw (Ch. 3.5, p. 34)
> 1. It's not hard to write a Stan program from scratch and fit it to data; adding a prior to an
>    already-programmed model is straightforward.
> 2. **The prior is typically easier to specify if the predictors are centered**, so the intercept is
>    framed as an expected value for some intermediate case.
> 3. **The natural next step, deliberately omitted here, is to check by fitting to simulated data.**
>    "A model can fit to observed data but fail in similar examples, even for data that have been
>    generated from the model being fit." See [[Designing Simulated-Data Experiments]].
> 4. **You can set up a reasonable weakly informative prior even when no direct quantitative prior
>    information is available** — by projecting onto an interpretable scale, as done above.

> [!example] Exercise 3.1 — the random allocation game (Ch. 3.6, p. 34)
> **Setup.** To study honesty, participants privately roll a six-sided die; a 4, 5, or 6 wins a cash
> prize. The experimenter cannot verify the roll and participants know this. Individual honesty is
> unknowable, but **in aggregate the proportion of prize claims is informative** — if everyone claims
> the prize, many are lying.
>
> **(a)** 171 participants play; 111 claim the prize. Compute the posterior for the proportion who are
> honest (would obey the die roll).
> **(b)** Compute the **posterior predictive distribution** for how many of the next 10 participants
> claim the prize — "your answer should be a distribution."
>
> *Note the structure:* under honesty the claim rate is $1/2$; the observed rate is $111/171 = 0.649$.
> The model is a mixture of honest and dishonest respondents, which makes this a miniature version of
> the identification issues in [[Multiple-Choice Exam - A Full Workflow Walkthrough]].

> [!example] Exercises 3.2-3.5 — the escalation ladder (Ch. 3.6, pp. 34-35)
> - **3.2** Fit the honesty model in Stan *and* one other PPL with identical priors, and compare both
>   to a **grid approximation** at $p = 0, 0.01, \dots, 1$. **"Are the differences between your three
>   posterior inferences consistent with Monte Carlo error?"**
> - **3.3** Repeat the full Section 3.5 template on a new problem: write the model, express in Stan,
>   compile pedantically, add weakly informative priors, sample, check convergence, print and graph,
>   post-process for derived quantities.
> - **3.4** Simulate new data from your model at specified parameter values, refit, and assess accuracy
>   against the assumed truth.
> - **3.5** **Expand the model until it breaks.** Add complexity in model or data structure until you
>   hit difficulties in coding, fitting, or summarizing; discuss and resolve; then add more complexity
>   to break it again. "This will be a motivation to learn some of the tools described in the rest of
>   this book." Compare the explicit breaking exercise in
>   [[Multiple-Choice Exam - A Full Workflow Walkthrough#Breaking the model]].

## Connections

- The prior-by-projection technique here is the concrete instance of the general advice in
  [[Prior Distributions]] and the "no safe haven" argument of [[There Is No Safe Haven]].
- LD50 as a post-processed derived quantity generalizes to [[Point Estimates and Uncertainties]].
- The regulatory-category decision is the simplest instance of [[From Inference to Decision]].
- The deliberately omitted fake-data check is supplied in
  [[Multiple-Choice Exam - A Full Workflow Walkthrough]], the next chapter.

## See Also
- [[Computational Tools and Probabilistic Programming]] — the toolchain this example exercises
- [[Generalized Linear Models]] — logistic/binomial regression background
- [[Single-Parameter Models]] — BDA3's treatment of the binomial model
- [[Multiple-Choice Exam - A Full Workflow Walkthrough]] — the same machinery on a problem large
  enough to break
