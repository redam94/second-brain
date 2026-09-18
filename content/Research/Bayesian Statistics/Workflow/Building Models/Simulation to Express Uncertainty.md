---
title: "Simulation to Express Uncertainty"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 6.1, pp. 103-106 (Figure 6.1)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Modeled and Unmodeled Data]]"
  - "[[Posterior Sampling and Summarization]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Point Estimates and Uncertainties]]"
  - "[[Posterior Predictive Checking]]"
  - "[[Poststratification]]"
  - "[[Q - Exchangeability and What Replaces It When It Fails]]"
aliases:
  - "Simulate first summarize last"
  - "Propagating uncertainty"
  - "Three replication scenarios"
  - "generated quantities block"
---

# Simulation to Express Uncertainty

> [!summary]
> The operating rule: **"simulate first and summarize last."** The expectation of a function is not the
> function of the expectation, so every downstream quantity should be computed **for each posterior
> draw** and collapsed only at the very end. The section's most useful structural content is the
> **three replication scenarios** available in a hierarchical model — new data from existing groups,
> from new groups in the existing population, or from a new population — which turn out to be the
> same distinction that separates posterior predictive from prior predictive checking.

## Overview

Simulation serves two purposes in this book:
1. **Expressing inferences** — posterior simulations summarize estimates and uncertainties for
   parameters and predictive quantities.
2. **Exploring models through experimentation** — see [[Designing Simulated-Data Experiments]].

> [!important] The premature-summary mistake (Ch. 6.1, p. 103)
> "Unless we want predictions and generalizations to be **overconfident**, everything we want to do with
> a model should propagate the uncertainty in the parameters as captured by posterior simulations."
>
> **Three stacked sources of uncertainty:** the parameters; the generative model's additional
> uncertainty about **latent variables and predictions**; and "yet another source … from variation in
> **unmodeled parameters including regression predictors.**"
>
> > **"A common mistake in statistical workflow is to prematurely summarize uncertainty. The expectation
> > of a function and the function of an expectation are not usually the same, so simulate first and
> > summarize last. We do not want to simulate observations from only the posterior mean, because this
> > neglects posterior uncertainty. Instead we want to simulate observations for many posterior draws.
> > Only at the end, when there is no more simulation to do, should we produce a mean or set of
> > quantiles or some other summary."**

**How it looks in code:** "Because most Bayesian workflows produce draws from the posterior
distribution, simulation usually involves **looping over these draws** (or performing the equivalent
vectorized computation) and performing calculations and further simulations for each."

## Main Content

### Propagating uncertainty through arbitrary functions

Given posterior draws $\theta^s$, $s = 1,\dots,S$ from $p(\theta|x,y)$:

- The central 80% interval for $\theta_1$ is $(\theta_1^{(0.1S)},\, \theta_1^{(0.9S)})$ — the order
  statistics of the $S$ draws.
- **For any function $h$**, the 80% interval is $(h(\theta)^{(0.1S)},\, h(\theta)^{(0.9S)})$, "with the
  order statistics computed based on the $S$ simulations of $h(\theta)$."

> [!example] Why the ratio $a/b$ cannot be assembled from marginals (Ch. 6.1, p. 104)
> ```r
> a <- 50; b <- 2; sigma <- 10
> N <- 100
> x <- runif(N, 0, 10)
> y <- rnorm(N, a + b*x, sigma)
> fake <- list(N=N, x=x, y=y)
> linear <- cmdstan_model("linear.stan")
> fit <- linear$sample(data=fake)
> sims <- as_draws_rvars(fit$draws())
> ```
> ```r
> print(quantile(sims$a, c(0.1, 0.9)))
> print(quantile(sims$b, c(0.1, 0.9)))
> print(quantile(sims$a/sims$b, c(0.1, 0.9)))
> ```
> **Resulting 80% intervals:** $a$: $(47.6, 52.3)$; $b$: $(1.5, 2.3)$; **$a/b$: $(20.6, 34.8)$.**
>
> "There is no particular reason we would be interested in $a/b$; we compute its posterior interval here
> just to demonstrate how directly it can be done using simulation. **There would be no way of getting
> it from the separate inferences for $a$ and $b$.**
>
> For example, **it is not valid to compute the ratio of the means of $a$ and $b$ and treat that as the
> posterior mean of their ratio. The parameters are typically correlated, and only in rare circumstances
> will this invalid procedure yield the right result.** Maybe you think this is obvious, **but in our
> experience even experienced modelers make this mistake. So if nothing else, be wary of it in others'
> work.**"

### Predictions via the `generated quantities` block

Two routes to a predictive draw. In R, treating the draws as random variables:

```r
x_tilde <- 20
sims$y_tilde <- rvar_rng(rnorm, 1, mean = sims$a + sims$b * x_tilde, sd = sims$sigma)
print(quantile(sims$y_tilde, c(0.1, 0.9)))
```

Or — "**perhaps clearer**" — inside the Stan program:

```stan
data {
  int N;
  vector[N] x;
  vector[N] y;
  int N_tilde;
  vector[N_tilde] x_tilde;
}
parameters {
  real a, b;
  real<lower=0> sigma;
}
model {
  y ~ normal(a + b*x, sigma);
}
generated quantities {
  array[N_tilde] real y_tilde = normal_rng(a + b*x_tilde, sigma);
}
```

```r
linear_with_pred <- cmdstan_model("linear_with_pred.stan")
fake_2 <- list(N=N, x=x, y=y, N_tilde=1, x_tilde=20)
fit_2 <- linear_with_pred$sample(data=fake_2)
sims_2 <- as_draws_rvars(fit_2$draws())
print(quantile(sims_2$y_tilde, c(0.1, 0.9)))
```

Vectorizing to 100 new points:

```r
N_tilde <- 100
x_tilde <- seq(-20, 20, length=N_tilde)
fake_3 <- list(N=N, x=x, y=y, N_tilde=N_tilde, x_tilde=x_tilde)
fit_3 <- linear_with_pred$sample(data=fake_3)
sims_3 <- as_draws_rvars(fit_3$draws())
```

> [!example] Reading Figure 6.1 — two panels that differ in two ways
> **Panel (a)** shows the data with 50 posterior draws of the regression line $y = a + bx$.
> **Panel (b)** shows 80% predictive intervals for $\tilde{y}$ across $\tilde{x} \in [-20, 20]$.
>
> **Difference 1 — width.** "The uncertainty in the position of the fitted regression line is **much
> less** than the uncertainty in the predictions, which makes sense, given that the model has a nonzero
> error term."
>
> **Difference 2 — $x$-axis range.** "**The range of the plot on the left is determined by the data,
> whereas the plot on the right displays predictions, and so its range is determined by the values of
> $\tilde{x}$ for which we have decided to make predictions.**"
>
> The deliberate extrapolation: "**We often use models to make predictions outside the range of data —
> if nothing else, we make decisions about the future based on data from the past, so we are necessarily
> extrapolating over time.**"
>
> A note on the graph: "The slight lack of smoothness of the line comes because the intervals are
> computed using **a finite number of simulation draws**." (See [[Chains, Iterations, and Effective Sample Size]]
> on how many draws are needed for stable quantiles.)

### The three replication scenarios in a hierarchical model

> [!definition] Three ways to simulate new data from the 8 schools model (Ch. 6.1, p. 106)
> The model has modeled data $y$, unmodeled data $\sigma_1,\dots,\sigma_8$, local parameters
> $\theta_1,\dots,\theta_8$, and hyperparameters $\mu,\tau$. $S$ posterior draws form an $S \times 10$
> matrix.
>
> **1. New data from the existing schools** ("posterior predictive simulation")
> For each draw, $\tilde{y}_j \sim \text{normal}(\theta_j, \sigma_j)$, $j = 1,\dots,8$.
>
> **2. New data from new schools sampled from the existing population** ("partial predictive simulation")
> Choose $\tilde{J}$; draw $\tilde\theta_j \sim \text{normal}(\mu,\tau)$; then
> $\tilde{y}_j \sim \text{normal}(\tilde\theta_j, \tilde\sigma_j)$.
> **This requires choosing values for the unmodeled data $\tilde\sigma_j$** — "or else to expand the
> specification so that the $\sigma_j$'s are given a model from which they could be sampled."
>
> **3. New data from new schools sampled from a new population** ("prior predictive simulation")
> First sample $\tilde\mu, \tilde\tau$ from their prior; then $\tilde{J}$, then $\tilde\theta_j$, then
> $\tilde\sigma_j$, then $\tilde{y}_j$.
> **"For the 8 schools model as defined in Section 5.2, this simulation fails at the very first step
> because $\tilde\mu, \tilde\tau$ had been given an improper prior distribution"** — so the model would
> have to be extended with a proper hyperprior.
>
> > **"None of the three above simulation protocols is 'right' or 'wrong'; rather, they correspond to
> > three different scenarios … Really, though, they are all posterior predictive simulations, just
> > corresponding to different scenarios of hypothetical replication."**
^def-three-replications

This is the same insight as the "10 outcomes or 10 items" dual reading in
[[Prior Predictive Checking]] — and it is the reason [[Cross Validation Checking]] must state which
replication it targets.

> [!important] Predictive simulation forces you to supply unmodeled data
> "For a regression model $p(y|\theta,x)$, you will need to supply $\tilde{x}$ to make predictions.
> **Where will these $\tilde{x}$ values come from?**
> - You might **have an idea ahead of time** about which predictor values you are interested in;
> - you could **embed $x$ in a generative model**;
> - or you could **bootstrap** — sampling $\tilde{x}$ from the observed $x$ values — "which corresponds
>   to some implicit model for that distribution."
>
> See [[Modeled and Unmodeled Data]] and [[Poststratification]].

> [!important] More structure means more replication scenarios
> "**In general, the more structure a model has, the more different ways it can be used to simulate new
> data.** For example, in a **time-series cross-sectional analysis of data from 30 countries over 20
> years**, you can simulate new data for
> - country-years already in your dataset,
> - **new years with existing countries**,
> - **new countries in existing years**, and
> - **new countries in new years.**"
>
> Each corresponds to a different generalization question, and to a different cross-validation scheme —
> see [[Cross Validation Checking]].

## Connections

- "Simulate first, summarize last" is the operational content of the "avoid premature collapsing of the
  wave function" advice in [[Point Estimates and Uncertainties]].
- The three replication scenarios are what distinguish [[Prior Predictive Checking]] from
  [[Posterior Predictive Checking]] — they are endpoints of a single spectrum.
- Scenario 3's failure on an improper prior is another instance of the generativity test in
  [[Joint Priors and Covariance Matrices#Prior distributions that depend on data]].

## See Also
- [[Point Estimates and Uncertainties]] — how to collapse the draws once you finally must
- [[Posterior Sampling and Summarization]] — BDA3 background on simulation-based summaries
- [[Designing Simulated-Data Experiments]] — simulation used for experimentation rather than summary
- [[Point Estimates and Uncertainties]] — using the draws for prediction and generalization
