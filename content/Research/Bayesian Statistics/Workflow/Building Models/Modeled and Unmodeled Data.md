---
title: "Modeled and Unmodeled Data"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5.8, p. 89"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Generative and Partially Generative Models]]"
  - "[[Specifying the Data Model and the Prior]]"
  - "[[Expressing a Bayesian Model with Probability Distributions]]"
used_by:
  - "[[Prior Predictive Checking]]"
  - "[[The SBC Algorithm]]"
  - "[[Designing Simulated-Data Experiments]]"
aliases:
  - "Five kinds of variable"
  - "Unmodeled parameters"
  - "Order of prior predictive simulation"
---

# Modeled and Unmodeled Data

> [!summary]
> A short but load-bearing section: a **five-way taxonomy** of the variables in a Stan program, and the
> **strict order** in which they must be fixed or simulated to produce a prior predictive draw. The
> key observation is that **Stan itself does not distinguish among these categories** — it only
> separates `data` from `parameters` — so the ordering is knowledge the analyst must supply, and every
> prior-predictive or SBC procedure in the book depends on getting it right.

## Overview

"For a fully generative model, simulation from the joint distribution is direct: simulate parameters
$\theta$ from their prior and simulate data $y|\theta$ from the data model." But as established in
[[A Data Model Is Not Just a Likelihood]], the data distribution is not just the likelihood.

> [!important] The complication
> "**Almost all the models we fit include numbers that must be externally supplied and cannot be
> simulated.** These include **unmodeled data, unmodeled parameters, and parameters with improper prior
> distributions.**"

## Main Content

### The worked example

```stan
data {
  int N;
  vector[N] x, y;
  real mu_a, mu_b;
  real<lower=0> sigma_a, sigma_b;
}
parameters {
  real a, b;
  real<lower=0> sigma_y;
}
model {
  a ~ normal(mu_a, sigma_a);
  b ~ normal(mu_b, sigma_b);
  y ~ normal(a + b*x, sigma_y);
}
```

> [!definition] Five categories of variable (Ch. 5.8, p. 89)
> | # | Category | In this program | Character |
> |---|---|---|---|
> | 1 | **Unmodeled data** | `N`, `x` | must be externally supplied; no generative model |
> | 2 | **Unmodeled parameters** | `mu_a`, `mu_b`, `sigma_a`, `sigma_b` | hyperprior constants passed in as data |
> | 3 | **Parameters with improper priors** | `sigma_y` | declared but never given a `~` statement, so implicitly uniform |
> | 4 | **Modeled parameters** | `a`, `b` | drawn from their prior |
> | 5 | **Modeled data** | `y` | drawn from the data model given the parameters |
>
> > **"The Stan program does not distinguish among all these categories, except for separately declaring
> > `data` and `parameters`."**
>
> Note that categories 1-2 both live in the `data` block though they are conceptually different (one is
> observed data, the other is prior specification), and categories 3-4 both live in `parameters` though
> only category 4 can be simulated.
^def-five-categories

### The required order of simulation

> [!important] Prior predictive simulation must proceed in category order (Ch. 5.8, p. 89)
> "**The generative model requires more structure than is contained in the posterior distribution.** In
> prior predictive simulation, the variables should be specified in the above order:
> 1. **Choose values for the unmodeled data** (`N`, `x`)
> 2. **Choose values for the unmodeled parameters** (`mu_a`, `mu_b`, `sigma_a`, `sigma_b`)
> 3. **Choose values for the parameters with improper priors** (`sigma_y`)
> 4. **Simulate the modeled parameters from their prior distribution** (`a`, `b`)
> 5. **Simulate the modeled data given the simulated parameters** (`y`)"
>
> **The loop structure that follows:** "**By keeping steps 1-3 fixed and repeating steps 4 and 5 many
> times**, you obtain a set of draws from the prior predictive distribution — the joint distribution of
> parameters and data — that represent **a range of possibilities of the generative model conditional on
> the values specified in the first three steps.**"
>
> **Two things to look at, not one:** "The prior predictive simulations can be compared to observed data,
> **and the simulations of the modeled parameters can also be examined to get a better understanding of
> how the model works.**"
^def-prior-predictive-order

> [!warning] Why this ordering is a practical constraint, not a formality
> Steps 1-3 being *fixed across draws* is what makes the prior predictive distribution **conditional**.
> Every prior predictive check in the book therefore answers the question "what does this model imply
> **given this design**?" — not "what data could this model produce in general."
>
> Concretely: in [[Prior Predictive Checking]] the logistic-regression check reuses **the observed
> $x$ values for the 32 students** from Chapter 4 rather than simulating new ones, because there is no
> generative model for $x$. If you *do* want new predictors, "you might need to simulate the $x$ values
> using some model, even if it is just $x \sim \text{normal}(0,1)$" — which is a decision to move $x$
> from category 1 to category 5, i.e. a step **up** the ladder in
> [[Generative and Partially Generative Models#The ladder of generativity]].
>
> The same constraint governs SBC: see [[The SBC Algorithm]], where $N$ and the design must be held
> fixed across all $N_{\text{sim}}$ replications for the rank statistics to be comparable.

## Connections

- Category 3 (improper priors) is exactly the failure mode that makes a model non-generative — see
  [[Prior Distributions#Noninformative priors, and why "flat" is not "weak"]]. Repairing it means
  moving `sigma_y` from category 3 to category 4.
- The distinction between categories 1 and 5 is the $x$-vs-$y$ asymmetry that
  [[Generative and Partially Generative Models]] calls partial generativity, and that
  [[Poststratification]] must repair when generalizing to a new population.
- Category 2 variables passed as data is the coding idiom used throughout
  [[Multiple-Choice Exam - A Full Workflow Walkthrough]] (`mu_mu_a`, `sigma_mu_a`, …), which lets the
  same compiled program be re-run under different hyperpriors for sensitivity analysis.

## See Also
- [[Prior Predictive Checking]] — the procedure this ordering enables
- [[Designing Simulated-Data Experiments]] — the same ordering, used to generate fake data with known truth
- [[Generative and Partially Generative Models]] — the ladder these categories sit on
- [[Expressing a Bayesian Model with Probability Distributions]] — why Stan's blocks don't encode the ordering
