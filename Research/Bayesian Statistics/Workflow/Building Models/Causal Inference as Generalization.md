---
title: "Causal Inference as Generalization"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - topic/causal-inference
  - type/concept
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 7.2, pp. 125-130 (Figures 7.7, 7.8)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Poststratification]]"
  - "[[Potential Outcomes Framework]]"
  - "[[Simulating an Underlying Process, Data Collection, and Inference]]"
used_by:
  - "[[From Inference to Decision]]"
  - "[[Statistical and Scientific Inference]]"
aliases:
  - "SATE and PATE"
  - "Sample average treatment effect"
  - "Population average treatment effect"
  - "Direct and indirect effects"
---

# Causal Inference as Generalization

> [!summary]
> Causal inference is framed here as **two levels of generalization** — sample to population, and
> control to treatment — computed by simulation rather than by formula. The worked example makes the
> distinction vivid: with a treatment effect that varies in $x$ and a sample whose $x$-distribution
> differs from the population's, the **SATE is $-0.96 \pm 0.10$ and the PATE is $-0.60 \pm 0.11$** from
> the very same fit. The cautionary half of the example: adding a quadratic interaction that the data
> cannot pin down leaves the estimates unchanged but **inflates their uncertainty**, because $\beta_6$
> is strongly correlated with both SATE and PATE.

## Overview

> [!definition] Two levels of generalization (Ch. 7.2, p. 125)
> "In the simplest randomized experiments, an average causal effect can be estimated by the mean
> difference between treatment and control groups. **But in general, calculating a causal effect involves
> two levels of generalization: from sample to population and from control to treatment group.**
>
> **That latter step involves specifying one or more hypothetical interventions that are reflected in
> treatment variables. This is different than just computing predictions, because the causal structure of
> the generative model may be needed as well.**"
^def-two-generalizations

### The general simulation procedure

> [!definition] Computing an average causal effect by simulation (Ch. 7.2, p. 126)
> With treatment $z \in \{0,1\}$, pre-treatment predictors $x$ ($N \times K$), outcome $y$, and a target
> population characterized by $\tilde{x}$ ($\tilde{n} \times K$, **which must also be specified**):
>
> 1. **Draw $\theta^s$, $s=1,\dots,S$** from the joint posterior of all model parameters.
> 2. **Fix or simulate pre-treatment predictors $\tilde{x}$** for the new data.
> 3. **For each draw $\theta^s$:**
>    - (a) Compute $E(y|\tilde{x}, \tilde{z}=0, \theta^s)$ and $E(y|\tilde{x}, \tilde{z}=1, \theta^s)$.
>    - (b) The treatment effects for the $\tilde{n}$ new units are the **difference between those
>      vectors.** For an average effect, average over the $\tilde{n}$ units **or poststratify over some
>      assumed distribution of $\tilde{x}$.**
> 4. **The set of these $S$ values is the posterior distribution of the treatment effects.**
^def-causal-simulation-procedure

> [!warning] When the causal model has more structure
> "If the causal model contains more structure, like **post-treatment variables**, then the simulation
> will also contain more structure. **One must simulate all of the downstream (post-treatment) variables
> as well.** And sometimes treatments are applied to more than one variable, or hold some variables
> constant. The details of the correct simulations differ, but **they all follow the logic of a clearly
> specified model of potential outcomes, whatever its structure.**"
>
> **Two failure modes flagged:**
> - **Effects unfolding over time.** Kaminsky et al. (2019) "give examples of simulations used in
>   epidemiology that **do not correctly account for causal structure and as a result can yield incorrect
>   uncertainty intervals that include negative effects, even when the actual treatment effect is always
>   positive.**"
> - **Spillover.** "Similar issues can arise whenever there are **spillover effects from the treatment
>   group to the 'controls.' Simple analyses assume this does not happen, but a more complete workflow
>   involves modeling spillovers, multilevel structure, and other structure that goes beyond the default
>   stable unit treatment value assumption.**"

## Main Content

### Worked example: SATE vs. PATE by regression and poststratification

> [!example] The setup (Ch. 7.2, pp. 126-127, Figure 7.7)
> **The model.** $y_i \sim \text{normal}(b_1 + b_2 x_i + b_3 z_i + b_4 x_i z_i,\ \sigma)$.
>
> **The analytic effects** (available here, but "in general, it is not always possible to estimate average
> treatment effects using a simple formula, **but we can always do it using simulation**"):
> $$E(y|x,z=1) - E(y|x,z=0) = b_3 + b_4 x$$
> $$\text{SATE} = b_3 + b_4 \bar{x}, \qquad \text{PATE} = b_3 + b_4 \bar{\tilde{x}}$$
>
> **Simulating the data** — $N = 200$, with $x$ uniform on $(0,10)$:
> ```r
> N <- 200
> x <- runif(N, 0, 10)
> ```
> **Unbalanced assignment** — "to make things interesting, we set up an imbalance in which people with
> higher values of $x$ are more likely to get the treatment":
> ```r
> z <- rbinom(N, 1, invlogit(x-5))
> ```
> **True parameters and outcome:**
> ```r
> b <- c(0.1, 0.2, -3, 0.4)
> sigma <- 0.5
> y <- rnorm(N, b[1] + b[2]*x + b[3]*z + b[4]*x*z, sigma)
> plot(x, y, pch=ifelse(z==0, 20, 1), bty="l")
> ```
> "**We have set up the example so that the interaction and imbalance are large.**"
>
> **The population, deliberately different from the sample:**
> ```r
> N_pop <- 5000
> x_pop <- rnorm(N_pop, 6, 2)   # purposely choosing a population different from the data
> n_pop <- rep(1, N_pop)
> ```
> "By setting $n_{\text{pop}} = 1$ for all cells, we are assuming they are of equal size in the
> population **or, equivalently, that each of the $N_{\text{pop}}$ rows of the poststratification table
> corresponds to one person.**"

```stan
functions {
  vector Ey(vector b, vector x, vector z) {
    return b[1] + b[2]*x + b[3]*z + b[4]*x.*z;
  }
}
data {
  int<lower=0> N, K;
  vector[N] x, y, z;
  int N_pop;
  vector[N_pop] x_pop, n_pop;
}
parameters {
  vector[K] b;
  real<lower=0> sigma;
}
model {
  y ~ normal(Ey(b, x, z), sigma);
}
generated quantities {
  real SATE = mean(Ey(b, x, rep_vector(1, N)) - Ey(b, x, rep_vector(0, N)));
  real PATE = sum(n_pop .* (Ey(b, x_pop, rep_vector(1, N_pop)) -
                            Ey(b, x_pop, rep_vector(0, N_pop)))) / sum(n_pop);
}
```

> [!important] Where the causal content lives
> "This is a simple linear regression with flat priors on the parameters. **The main focus here is the
> `generated quantities` block**, in which
> 1. the expected outcome under treatment or control is computed **for each data point**,
> 2. these are averaged to get the **SATE**,
> 3. the same is done **for each poststratification cell**,
> 4. and these are averaged, weighting by cell population, to get the **PATE**."
>
> Note that defining `Ey()` as a `functions`-block function is what lets the *same* expression be
> evaluated at $z=0$, $z=1$, on the sample, and on the population without duplication — a small but
> important coding pattern for causal quantities.

**Results:**

```
 variable   mean median   sd  mad     q5   q95 rhat ess_bulk ess_tail
     b[1]   0.01   0.01 0.10 0.09  -0.14  0.17 1.00     1528     2045
     b[2]   0.22   0.22 0.03 0.03   0.18  0.27 1.00     1511     1901
     b[3]  -2.87  -2.87 0.21 0.21  -3.22 -2.52 1.00     1420     2156
     b[4]   0.38   0.38 0.04 0.04   0.32  0.44 1.00     1266     1692
    sigma   0.50   0.50 0.03 0.03   0.46  0.55 1.00     2179     1994
     SATE  -0.96  -0.96 0.10 0.10  -1.12 -0.79 1.00     3372     2644
     PATE  -0.60  -0.61 0.11 0.11  -0.78 -0.43 1.00     3254     2915
```

> [!example] Why SATE and PATE differ (Ch. 7.2, p. 128)
> "The values of $x$ **in the sample** are uniformly distributed between 0 and 10, the treatment effect
> **varies widely in this range** — the interaction between $x$ and $z$ is large — and the average
> difference between the regression lines is about $-1$.
>
> In contrast, the values of $x$ **in the population** are normally distributed with mean 6 and standard
> deviation 2; **here, the average treatment effect happens to be closer to zero.**"
>
> The mechanism is arithmetic: $\text{SATE} = b_3 + b_4\bar{x}$ with $\bar{x} = 5$, versus
> $\text{PATE} = b_3 + b_4 \cdot 6$. **The difference exists only because the effect is heterogeneous;
> with $b_4 = 0$ the two would coincide.**

### The cost of an unnecessary term

> [!example] Adding a quadratic interaction (Figure 7.8, Ch. 7.2, pp. 128-129)
> "Given how the data have been constructed, these extra terms are **unnecessary** — but **in general we
> will not know the true data-generating process, so often we include extra terms in a model, just to see
> what happens.**"
>
> ```stan
> vector Ey(vector b, vector x, vector z) {
>   return b[1] + b[2]*x + b[3]*z + b[4]*x.*z + b[5]*(x^2) + b[6]*(x^2).*z;
> }
> ```
> (and change $K = 4$ to $K = 6$ in the data list).
>
> | Quantity | Original model | With quadratic terms |
> |---|---|---|
> | SATE | $-0.96 \pm 0.10$ | $-1.01 \pm \mathbf{0.14}$ |
> | PATE | $-0.60 \pm 0.11$ | $-0.61 \pm \mathbf{0.13}$ |
> | $b_5$ | — | $0.00 \pm 0.01$ |
> | $b_6$ | — | $-0.01 \pm 0.02$ |
>
> "The estimated effects **are not so different from before, but the posterior standard deviations are
> much bigger.** What happened is that **the quadratic interaction term has a big influence on the
> average treatment effects, and it is difficult to estimate precisely from the data.**" Figure 7.8 shows
> the posterior correlation of $\beta_6$ with both SATE and PATE across the 4000 draws — **near-linear,
> steep, and in the same direction for both.**
>
> **The recommendation:** "**In a real-life setting it might make sense, if such a quadratic term were
> included in the model, to accompany it with a strong prior so that posterior uncertainties would not be
> unduly increased due to the possibility of extreme values of these new coefficients. It is a good idea
> to add additional terms to a model, but often some regularization is needed to supply stability of
> inferences.**"
>
> This is the [[Joint Priors and Covariance Matrices#The piranha principle|piranha principle]] arriving in
> a causal setting: model expansion without regularization buys flexibility at the cost of identifiability.

### The nonlinear case

> [!example] The same machinery with logistic regression (Ch. 7.2, pp. 129-130)
> Four changes to the Stan program:
> ```stan
> vector Ey(vector b, vector x, vector z) {
>   return inv_logit(b[1] + b[2]*x + b[3]*z + b[4]*x.*z);
> }
> ```
> - change `vector[N] y;` to `array[N] int y;`
> - remove the parameter `sigma`
> - change the likelihood from `normal(Ey(b, x, z), sigma)` to `bernoulli(Ey(b, x, z))`
>
> Fit to `y_binary <- ifelse(y>0, 1, 0)`:
> ```
>  variable   mean median   sd  mad     q5    q95 rhat
>      b[3] -20.40 -19.38 7.14 6.61 -33.86 -10.37 1.00
>      b[4]   3.10   2.91 1.42 1.33   1.10   5.73 1.00
>      SATE  -0.42  -0.42 0.02 0.02  -0.46  -0.38 1.00
>      PATE  -0.29  -0.29 0.03 0.03  -0.33  -0.24 1.00
> ```
>
> Note that the **coefficients are wildly uncertain** ($b_3 = -20.4 \pm 7.1$) while the **SATE and PATE
> are precisely estimated** ($\pm 0.02$ and $\pm 0.03$). This is exactly the point of
> [[Poststratification#Average predictive comparisons]] — the predictive comparison, not the coefficient,
> is the interpretable quantity in a nonlinear model.
>
> "Again, **the big difference between the estimated sample and population average effects comes from the
> combination of a treatment interaction and systematic differences between sample and population**, that
> is, differences between the distributions of $x$ and $x_{\text{pop}}$."

### Direct and indirect effects

> [!definition] Computing a direct effect through a mediator (Ch. 7.2, p. 130)
> Suppose treatment $z$ influences $y$ **both directly and through a mediator $u$**, and the goal is the
> **direct** causal effect. "Since $u$ itself can be influenced by $z$, **it must be simulated conditional
> on $z$.**"
>
> 1. **Draw $\theta^s$, $s=1,\dots,S$** from $p(\theta|u,x,z,y)$.
> 2. **Fix or simulate $\tilde{x}$.**
> 3. **For each $\theta^s$, simulate under control:** $\tilde{u}^s \mid \tilde{x}, \tilde{z}=0, \theta^s$,
>    then $\tilde{y}^s \mid \tilde{u}^s, \tilde{x}, \tilde{z}=0, \theta^s$.
> 4. **Set the treatment to $z'$.**
> 5. **Simulate under treatment but holding the mediator at its control value:**
>    $(\tilde{y}')^s \mid \tilde{u}^s, \tilde{x}, \tilde{z}=1, \theta^s$.
> 6. **The direct effect is $(\tilde{y}')^s - \tilde{y}^s$.** Average over the $\tilde{n}$ units within
>    each $s$, then work with the $S$ averages.
>
> **Step 5 is the whole trick:** the mediator is carried over from the *control* simulation, so the
> difference isolates the path that does not run through $u$.
^def-direct-effect

> [!important] More complex generative models require more choices
> "For example, **in a time series the intervention may happen once to some fraction of the population or
> otherwise happen repeatedly to different fractions of the population. This complicates the simulations,
> but the logic of running a separate simulation for each sample $s$ from the posterior remains the
> same.**"

## Examples

> [!example] Exercise 7.1 — the superpopulation as a middle ground
> "If the distribution of the predictors in the population is unknown, we can estimate the SATE. **An
> intermediate approach is to estimate the average effect in a hypothetical superpopulation from which
> the observed data are considered to be a random sample. The point estimate should be the same as for
> the SATE, but it should have higher uncertainty to account for the modeled sampling variation.** One
> way to approximate this superpopulation is by **bootstrapping the values of the predictors in the
> sample.**"
>
> This is the third rung between SATE and PATE, and it connects to the hypothetical-superpopulation
> reframing in [[Specifying the Data Model and the Prior]].

> [!example] Exercise 7.2 — simulating selection bias, type S and type M errors
> A model of selection bias in science: (i) effects $\theta_j$ sampled from a population with mean $\mu$
> and sd $\sigma$; (ii) each estimated by an experiment giving unbiased $\hat\theta_j$ with standard
> error 1; (iii) each summarized by a $z$-score and $p$-value.
> - **(a)** Display the distributions of $z$-scores and $p$-values for several interesting $(\mu,\sigma)$.
> - **(b)** Now suppose **only "statistically significant" results are published.** Compute the **type S
>   error** (probability the estimate has a different sign than the true effect) and **type M error**
>   (average exaggeration factor) for published results, as a function of $\mu$ and $\sigma$.
>
> See [[Constructing Priors for Effect Sizes#The stakes: exaggeration factors]] and
> [[The Replication Crisis and Multiple Levels of Variation]].

## Connections

- The SATE/PATE gap is the *estimation* counterpart of the design lesson in
  [[Simulating an Underlying Process, Data Collection, and Inference]]: heterogeneity plus imbalance is
  what makes adjustment necessary and fragile.
- The `generated quantities` pattern here generalizes the LD50 post-processing in
  [[Bioassay - A First Probabilistic Program]] — causal quantities are derived quantities.
- The mediator procedure is the simulation form of the g-computation logic in
  [[Time-Varying Treatments and G-computation]].

## See Also
- [[Poststratification]] — the sample-to-population half of the generalization
- [[Potential Outcomes Framework]] — the formal framework this simulation implements
- [[Causal Estimands]] — the catalogue of estimands SATE/PATE belong to
- [[From Inference to Decision]] — what to do with the resulting posterior
