---
title: "Sampling Problems with Latent Variables - No Vehicles in the Park"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/stan
  - method/lme4
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 29, pp. 449-461 (Figures 29.1-29.5)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[What to Do About Convergence Problems]]"
  - "[[Failure Modes and Steps Forward]]"
  - "[[Chains, Iterations, and Effective Sample Size]]"
  - "[[Modeling Ideas to Address Computing Problems]]"
  - "[[Approximate Algorithms and Approximate Models]]"
used_by:
  - "[[Statistical Modeling as Software Development]]"
aliases:
  - No Vehicles in the Park
  - Vehicles in the Park case study
  - Centered vs non-centered parameterization example
  - Sum-to-zero constraint case study
  - Item-response model case study
---

# Sampling Problems with Latent Variables: No Vehicles in the Park

> [!summary]
> A "statistically simple but computationally not simple" item-response model — 51,953 yes/no responses from 2,409 people to 27 questions about whether something violates a park's "No vehicles" rule. Two distinct lessons: (1) **understanding a fitted model** takes real work (an intercept of $\text{logit}^{-1}(-2.42)=0.08$ against a raw mean of 0.24 is not a bug but Jensen's inequality on the logit scale), and (2) **the non-centered parameterization is not always right** — here the item likelihoods are strong, so centered wins, and the actual fix is a `sum_to_zero_vector` constraint on the competing intercepts.

## Overview

The data come from a post by Luu (2024) pointing to an online quiz by Turner (2024), adapted from Hart (1958) (see also Schlag 1999). The quiz preamble:

> Every question is about a hypothetical park. The park has a rule: "No vehicles in the park." Your job is to determine if this rule has been violated. You might know of some rule in your jurisdiction which overrides local rules, and allows certain classes of vehicles. Please disregard these rules; the park isn't necessarily in your jurisdiction. Or perhaps your religion allows certain rules to be overridden. Again, please answer the question of whether the rule is violated (not whether the violation should be allowed).

27 scenarios follow, e.g. "Geoffrey wheels his wheelchair through the park. Does this violate the rule?" Turner shared 51,953 responses from 2,409 people. Each row: respondent index, item index, indicator for male-sounding name, indicator for white-sounding name, and the binary outcome (1 = "Yes, this violates the rule").

Response completeness: about two-thirds of respondents answered all 27 questions ("they are rule-followers!"), most others answered between 7 and 26 items, and one person answered only 2.

## Main Content

### The model

$$
\Pr(y_i = 1) = \text{logit}^{-1}\left(\alpha + X_i \beta + a_{j[i]} + b_{k[i]}\right)
$$

- $i = 1, \ldots, 51{,}953$ indexes responses
- $\alpha$ is the global intercept, $\beta$ the predictor coefficients
- $X$ is $51{,}953 \times 3$: male-sounding-name indicator, white-sounding-name indicator, and the number of responses given by person $j[i]$
- $a_j$ = respondent-specific intercept ("some respondents are more likely to answer Yes")
- $b_k$ = item-specific intercept ("some items are more likely to elicit Yes")
- $j[i]$ indexes person, $k[i]$ indexes item

### Fast first fit with `lme4`

Consistent with [[Fit Fast, Fail Fast]], start with approximate marginal maximum likelihood:

```r
data_park <- data.frame(y, respondent, item, male_name, white_name, n_responses_full)
fit_lme4 <- glmer(y ~ (1 | item) + (1 | respondent) + male_name + white_name +
                  n_responses_full, family = binomial(link="logit"), data = data_park)
display(fit_lme4)
```

```
                 coef.est coef.se
(Intercept)      -1.50    0.46
male_name         0.07    0.03
white_name        0.08    0.03
n_responses_full -0.03    0.01
Error terms:
 Groups     Name        Std.Dev.
 respondent (Intercept) 1.92
 item       (Intercept) 2.31
 Residual               1.00
number of obs: 51953, groups: respondent, 2409; item, 27
```

### Recoding so that zero is a meaningful baseline

The intercept $-1.50$ corresponds to all predictors zero — but `n_responses_full` is *never* zero; it usually equals 27. Rather than evaluating $\text{logit}^{-1}(-1.50 - 0.03 \cdot 27)$ by hand, recode the predictor as **number of items skipped**:

```r
n_skipped <- K - n_responses
n_skipped_full <- n_skipped[respondent]
fit_lme4 <- glmer(y ~ (1 | item) + (1 | respondent) + male_name + white_name +
                  n_skipped_full, family=binomial(link="logit"), data=data_park)
```

```
                coef.est coef.se
(Intercept)     -2.42    0.45
male_name        0.07    0.03
white_name       0.08    0.03
n_skipped_full   0.03    0.01
```

The intercept is now directly interpretable: for an average respondent and average item, with a female nonwhite name and a respondent who answered all 27 questions, $\Pr(\text{Yes}) = \text{logit}^{-1}(-2.42) = 0.08$.

> [!tip] Center or recode predictors so the intercept means something
> The variance parameters are unchanged (1.92, 2.31) — only the intercept's *interpretation* moved. This is the cheapest possible workflow step and it is what makes the next puzzle visible at all.

### The intercept puzzle: mean of the probability ≠ probability of the mean

> [!example] Why $\text{logit}^{-1}(\hat\alpha) = 0.08$ but $\overline{y} = 0.24$
> **The surprise:** the fitted baseline probability is 0.08 but the raw mean of $y$ is 0.24.
>
> **Check 1 — restrict to the actual baseline cells:**
> ```r
> > mean(y[male_name==0 & white_name==0 & n_skipped_full==0])
> [1] 0.22
> > sum(male_name==0 & white_name==0 & n_skipped_full==0)
> [1] 10748
> ```
> Not an empty category — 10,748 observations, mean 0.22, still nowhere near 0.08.
>
> **Check 2 — predicted probability for an average case:**
> ```r
> > invlogit(-2.42 + 0.07*mean(male_name) + 0.08*mean(white_name) +
>            0.03*mean(n_skipped_full))
> [1] 0.09
> ```
> Also far from the raw mean.
>
> **Check 3 — average the predicted probabilities instead:**
> ```r
> > mean(predict(fit_lme4, type="response"))
> [1] 0.23
> ```
> **Resolution:** it is the **extreme nonlinearity of the logistic transformation** when the average-case probability is near 0 (0.09 here) and the variance on the logit scale is large (respondent sd 1.92, item sd 2.31). At the low end the probability is bounded by zero, so **the mean probability is much larger than the probability of the mean.** Nothing is wrong with the fit.

> [!tip] When in doubt, check with fake data
> The authors verify the whole story by simulating from the fitted model and refitting — see [[Designing Simulated-Data Experiments]]:
> ```r
> a_respondent_sim <- rnorm(J, 0, sqrt(VarCorr(fit_lme4)$respondent))
> a_item_sim       <- rnorm(K, 0, sqrt(VarCorr(fit_lme4)$item))
> b_sim <- fixef(fit_lme4)
> X <- cbind(1, male_name, white_name, n_skipped_full)
> p_sim <- invlogit(a_respondent_sim[respondent] + a_item_sim[item] + X %*% b_sim)
> y_sim <- rbinom(N, 1, p_sim)
> data_sim <- data.frame(data, y_sim)
> fit_lme4_sim <- glmer(y_sim ~ (1 | item) + (1 | respondent) + male_name +
>                       white_name + n_responses_full, family=binomial, data=data_sim)
> ```
> Recovered: intercept $-1.88$ (se 0.53), `male_name` 0.06, `white_name` 0.12, `n_responses_full` $-0.04$, respondent sd 1.87, item sd 2.65. **All within a standard error of the original** — the fit behaves as it should, including the large intercept standard error.

### Reading the item and respondent parameters

The 27 estimated item effects:

```
              kite  paper_airplane             iss          toycar      ice_skates
             -3.17           -2.79           -2.78           -1.59           -1.49
           toyboat       parachute           plane       surfboard          skates
             -1.25           -1.24           -1.02           -0.97           -0.74
skateboard_carried    wheelchair         stroller          travois            sled
             -0.59           -0.51           -0.50           -0.05           -0.04
             rccar           horse      quadcopter      skateboard      wagon_kids
              0.02            0.30            0.49            0.61            1.04
             wagon         rowboat            bike        memorial       ambulance
              1.15            1.34            1.99            2.01            3.01
            police             car
              3.23            7.61
```

The distribution is far from normal: almost everybody says the private car violates the rule, most say the same of the police car and ambulance, and virtually nobody objects to the kite, the paper airplane, or the space station passing overhead. Raw Yes rates run from 2% (kite) to 99% (car) — the authors are surprised these are not 0% and 100%, and suggest some respondents were not taking the survey seriously (Figures 29.1a,b plot the coefficients against the raw proportion, and against the logit of the raw proportion).

> [!tip] When you *don't* need the item-response model — and why you fit it anyway
> "For the purpose of estimating these parameters we didn't really need the item-response model, but that's because **the data are balanced**: people were given the items randomly. In general with this sort of rating problem, it's important to fit this sort of model to account for **systematic differences in who rates which items**" (cf. [[Poststratification]] and Ch. 16).

Respondent parameters (Figure 29.2, estimate vs. proportion of Yes responses):
- **38 people answered Yes to every item** (the rule always applies) and **10 answered only No** (the rule never applies) — invisible in the plot from overplotting, recovered with `sum(respondent_avg==1)` and `sum(respondent_avg==0)`.
- Large variation across people, matching the large estimated respondent sd.
- Scatter around the trend comes mostly from **variation in how many items each person answered**: the fewer items answered, the more that intercept is partially pooled toward the distribution's mean (zero).

Interpreting the coefficient table:
- **`male_name` = 0.07** — people are slightly more likely to say a person with a male name is violating the rule. **This is legitimately a causal effect**, since the names were assigned at random: it shifts $\Pr(\text{Yes})$ from 0.24 (the data mean) to $\text{logit}^{-1}(\text{logit}(0.24)+0.07) = 0.253$.
- **`white_name` = 0.08** — likewise about a 1.5 percentage point increase.
- **`n_skipped_full` = 0.03** — not small: 10 skipped questions vs. none moves $\Pr(\text{Yes})$ from 0.24 to $\text{logit}^{-1}(\text{logit}(0.24)+0.03\cdot 10) = 0.30$. **Caveat offered by the authors:** the questions came in two groups and the average Yes rate differs between them, so this could be an artifact.
- **Variance components** — sds near 2 on the logit scale are *big*. Roughly two-thirds of respondent intercepts lie in $(-1.92, 1.92)$ and two-thirds of item intercepts in $(-2.31, 2.31)$. Starting from 0.24, $\pm 2$ on the logit scale spans $\text{logit}^{-1}(\text{logit}(0.24)-2) = 0.04$ to $\text{logit}^{-1}(\text{logit}(0.24)+2) = 0.70$.

### Why go Bayesian at all

`lme4` "doesn't work so well" in general: it can yield **degenerate estimates for varying-intercept, varying-slope models**, and has the usual point-estimation problems — **understating uncertainty** and **producing noisy estimates**. So the default preference is full Bayes via Stan, even when slower.

**But it fails immediately here.** `rstanarm`/`brms` with the same formula run **100–400 times slower than `lme4`**, and the convergence diagnostics show the chains did not mix. To diagnose, the authors write the model directly in Stan.

### Centered vs. non-centered: the setup

For a simple varying-intercept model `x + (1 | group)` with measurements $i$ and groups $j[i]$:

> [!definition] Centered parameterization
> $$
> y_i \sim \text{normal}(a_{j[i]} + X_i\beta,\ \sigma_y), \quad i = 1,\ldots,n
> $$
> $$
> a_j \sim \text{normal}(\mu, \sigma_a), \quad j = 1,\ldots,J
> $$
> Works fine when $\sigma_a$ is **well estimated** with a relatively narrow posterior. Runs into trouble when the posterior for $\sigma_a$ is wide and **the likelihood for each group is weak** (the funnel of Section 12.3).
^def-centered

> [!definition] Non-centered parameterization
> $$
> y_i \sim \text{normal}(\mu + \sigma_a \xi_{j[i]} + X_i\beta,\ \sigma_y), \quad i = 1,\ldots,n
> $$
> $$
> \xi_j \sim \text{normal}(0,1), \quad j = 1,\ldots,J
> $$
> **Mathematically the same model**, parameterized in terms of $(\sigma_a, \xi)$ rather than $(\sigma_a, a = \mu + \sigma_a \xi)$. This fixes the funnel geometry — **but fails in the opposite scenario, when the likelihood for each group is strong.**
^def-noncentered

> [!warning] Why non-centered is the *default* in rstanarm and brms
> "As Bayesian methods are most useful when there is uncertainty, and hierarchical models are most useful when there is a need to borrow information across the groups, this alternative parameterization is the default." That reasoning is sound on average — and wrong for this dataset, where each of 27 items has thousands of observations.

### Attempt 1 — non-centered, no constraint

```stan
data {
  int<lower=0> N, J, K, L;
  array[N] int<lower=0, upper=1> y;
  array[N] int<lower=1, upper=J> respondent;
  array[N] int<lower=1, upper=K> item;
  matrix[N, L] X;
}
parameters {
  real a;
  vector[L] b;
  real<lower=0> sigma_respondent, sigma_item;
  vector<multiplier=sigma_respondent>[J] a_respondent;
  vector<multiplier=sigma_item>[K] a_item;
}
model {
  a_respondent ~ normal(0, sigma_respondent);
  a_item ~ normal(0, sigma_item);
  b ~ normal(0, 1);
  {sigma_respondent, sigma_item} ~ normal(0, 3);
  y ~ bernoulli_logit_glm(X, a + a_respondent[respondent] + a_item[item], b);
}
```

Two implementation notes: `bernoulli_logit_glm(X, alpha, b)` is equivalent to `bernoulli_logit(X*b + alpha)` but more efficient; `<multiplier=...>` in the declaration is how Stan expresses the non-centered parameterization without an explicit latent vector. Priors are weak and results are insensitive to their details.

**Experimentation trick:** run only 200 warmup and 200 sampling iterations while trying parameterizations.

```
 variable                mean    median    sd    mad     q5      q95    rhat ess_bulk ess_tail
 lp__             -1.5e+04  -1.5e+04  50.36  53.19  -1.5e+04 -1.5e+04  1.05      97      321
 a                -2.8e+00  -2.7e+00   0.43   0.38  -3.5e+00 -2.1e+00  1.09      49       68
 b[1]              7.0e-02   7.0e-02   0.03   0.03   2.0e-02  1.2e-01  1.00    1401      524
 b[2]              9.0e-02   8.0e-02   0.03   0.03   3.0e-02  1.4e-01  1.00    2322      613
 b[3]              4.0e-02   4.0e-02   0.01   0.01   3.0e-02  5.0e-02  1.01     323      389
 b[4]              1.0e-02   1.0e-02   0.00   0.00   1.0e-02  2.0e-02  1.00     802      676
 sigma_respondent  1.9e+00   1.9e+00   0.04   0.04   1.9e+00  2.0e+00  1.04     182      392
 sigma_item        2.5e+00   2.4e+00   0.35   0.34   2.0e+00  3.1e+00  1.04     132      323
```

**Diagnostic reasoning, step by step** (a model for [[What to Do About Convergence Problems]]):
1. High $\hat{R}$ and low ESS, **but no divergence warnings** ⇒ unlikely to be a funnel-shaped posterior.
2. **No max-treedepth warnings** ⇒ not the usual signature of high posterior correlations either.
3. ESS lowest for `a` ⇒ look at its traceplot (Figure 29.3a): clear high autocorrelation. With 51,953 observations we would expect the posterior for `a` to be *narrow*, yet its posterior sd is 0.4.

> [!warning] The culprit: additive aliasing of three intercepts
> ```stan
> y ~ bernoulli_logit_glm(X, a + a_respondent[respondent] + a_item[item], b);
> ```
> **`a`, `a_respondent`, and `a_item` all shift the same total intercept.** If `a` increases and all of `a_respondent` or `a_item` decrease correspondingly, the likelihood is unchanged. **These parameters are not identified individually.** Figure 29.3b shows the strong negative correlation between `a` and `sum(a_item)`.

Per-parameter diagnostics localize it further:
```
variable          mean  median   sd   mad     q5    q95  rhat ess_bulk ess_tail
a_respondent[1]  -0.41  -0.43  1.74  1.89  -3.29   2.41  1.00     2322      558
a_respondent[2]  -0.37  -0.33  0.67  0.68  -1.53   0.63  1.01     2322      562
a_respondent[3]   1.33   1.34  0.52  0.54   0.49   2.17  1.00     1738      590
a_respondent[4]  -0.59  -0.56  1.10  1.14  -2.44   1.04  1.01     1651      668
a_item[1]         8.56   8.52  0.49  0.44   7.81   9.42  1.08       66       93
a_item[2]         3.34   3.28  0.43  0.36   2.70   4.11  1.10       48       70
a_item[3]        -0.70  -0.74  0.44  0.39  -1.37   0.06  1.09       49       75
a_item[4]        -0.99  -1.04  0.44  0.37  -1.64  -0.18  1.09       50       67
```
ESS is fine for `a_respondent` but terrible for `a_item`. **Reason:** each `a_respondent` depends on far fewer observations, so its genuine uncertainty **swamps** the autocorrelation induced by the aliasing; the 27 items each have thousands of observations, so the aliasing dominates.

### Attempt 2 — `sum_to_zero_vector`

> [!tip] Removing additive aliasing with a sum-to-zero constraint
> Constrain `a_respondent` and `a_item` each to sum to zero, using Stan's `sum_to_zero_vector`. Benefits: potentially faster sampling, **reduced posterior dependence**, and **better interpretability of the marginal posteriors**. Cost — an acknowledged awkwardness: with the effects constrained to sum to zero, **extra mathematical effort is required to make inferences for new items and new respondents.**

`sum_to_zero_vector` does not accept a `multiplier` argument, so the non-centered parameterization must be written out explicitly via latent `z` vectors:

```stan
parameters {
  real a;
  vector[L] b;
  real<lower=0> sigma_respondent, sigma_item;
  sum_to_zero_vector[J] z_respondent;
  sum_to_zero_vector[K] z_item;
}
transformed parameters {
  vector[J] a_respondent = z_respondent * sigma_respondent;
  vector[K] a_item = z_item * sigma_item;
}
model {
  z_respondent ~ std_normal();
  z_item ~ std_normal();
  b ~ normal(0, 1);
  {sigma_respondent, sigma_item} ~ normal(0, 3);
  y ~ bernoulli_logit_glm(X, a + a_respondent[respondent] + a_item[item], b);
}
```

```
 variable          mean   median   sd   mad     q5      q95   rhat ess_bulk ess_tail
a                -2.6e+00 -2.6e+00 0.06 0.07 -2.7e+00 -2.5e+00 1.01     581      450
b[1]              7.0e-02  7.0e-02 0.03 0.03  2.0e-02  1.2e-01 1.00     962      581
b[2]              8.0e-02  8.0e-02 0.03 0.03  3.0e-02  1.4e-01 1.00    1213      426
b[3]              4.0e-02  4.0e-02 0.01 0.01  3.0e-02  4.0e-02 1.01     314      387
b[4]              1.0e-02  1.0e-02 0.00 0.00  1.0e-02  2.0e-02 1.00     880      734
sigma_respondent  1.9e+00  1.9e+00 0.04 0.04  1.9e+00  2.0e+00 1.01     279      450
sigma_item        2.5e+00  2.4e+00 0.37 0.37  1.9e+00  3.1e+00 1.14      28       74
```

`a`'s posterior sd drops from 0.43 to **0.06** — sensible for 52,000 observations. (Note the unconstrained Bayesian sd of 0.43–0.45 *matched* `lme4`'s `coef.se` of 0.46; both were reporting the aliased quantity.) But `sigma_item` now has $\hat{R} = 1.14$ and ESS 28.

> [!warning] Looking for the funnel in the wrong coordinates
> The standard funnel check is a scatterplot of a varying effect against its scale parameter. Figure 29.4a plots `a_item[1]` vs. `sigma_item` — **no funnel visible.** That plot is misleading: **the sampling was actually done in `z_respondent` and `z_item`.** The diagnostics confirm it — `z_item[1]`, `z_item[2]`, `z_item[3]` have $\hat R \approx 1.11$–$1.14$ and ESS 29–33. Figure 29.4b plots `z_item[1]` against **`log(sigma_item)`** — since `sigma_item` is constrained positive, sampling happens in log space and the diagnostic plot should use log space too — and shows strong correlation.
>
> **Diagnose in the coordinates the sampler actually uses.** The first model hid the latent parameter inside `<multiplier=...>`; the explicit `z_item` version made the problem detectable.

**The general fact this exposes:** when the non-centered parameterization is used **but the likelihood contribution is strong**, you get strong dependence between the latent $z$ and $\sigma$. Here there are a large number of observations per item, so **centered is the better choice.**

### Attempt 3 — centered parameterization

Both `a_respondent` and `a_item` switch to centered. (Further experiments, not shown in the book, indicate little difference between parameterizations for `a_respondent`, so the simpler form is used for both.)

```stan
parameters {
  real a;
  vector[L] b;
  real<lower=0> sigma_respondent, sigma_item;
  sum_to_zero_vector[J] a_respondent;
  sum_to_zero_vector[K] a_item;
}
model {
  a_respondent ~ normal(0, sigma_respondent);
  a_item ~ normal(0, sigma_item);
  b ~ normal(0, 1);
  {sigma_respondent, sigma_item} ~ normal(0, 3);
  y ~ bernoulli_logit_glm(X, a + a_respondent[respondent] + a_item[item], b);
}
```

```
 variable          mean   median   sd   mad     q5      q95   rhat ess_bulk ess_tail
a                -2.6e+00 -2.6e+00 0.06 0.06 -2.7e+00 -2.5e+00 1.01     742      628
b[1]              7.0e-02  7.0e-02 0.03 0.03  2.0e-02  1.2e-01 1.01    1634      285
b[2]              8.0e-02  8.0e-02 0.03 0.03  3.0e-02  1.4e-01 1.01    1560      607
b[3]              4.0e-02  4.0e-02 0.01 0.01  3.0e-02  4.0e-02 1.00     480      648
b[4]              1.0e-02  1.0e-02 0.00 0.00  1.0e-02  2.0e-02 1.01     911      638
sigma_respondent  1.9e+00  1.9e+00 0.04 0.04  1.9e+00  2.0e+00 1.01     439      672
sigma_item        2.4e+00  2.4e+00 0.33 0.30  2.0e+00  3.0e+00 1.00    1905      578
```

`sigma_item`: $\hat R$ 1.14 → 1.00, ESS 28 → **1905**. Sampling time also drops.

### Attempt 4 — centering the predictors

```stan
transformed data {
  matrix[N, L] X_c;
  for (l in 1:L) {
    X_c[, l] = X[, l] - mean(X[, l]);
  }
}
model {
  y ~ bernoulli_logit_glm(X_c, a + a_respondent[respondent] + a_item[item], b);
}
```

Sampling time drops again and ESS rise further. Final cost: **only 20× slower than `lme4`**, down from 100–400×.

> [!tip] Most of the time is warmup
> Further investigation shows most of the remaining time is spent in warmup iterations. With sampler tuning it could be brought to ~5× `lme4`, but the authors decline: the time spent experimenting would exceed the savings. Refitting with the **default number of iterations — five times more than in the tuning fit — increases total sampling time by only 50%**, because with longer adaptation the algorithm runs more efficiently and post-warmup sampling goes faster. The expectation is that future Stan versions will make adaptation efficient enough that hand tuning is unnecessary.

### Comparison to `lme4` (Figure 29.5)

Comparing point estimates (conditional mode for `lme4`, posterior mean for Bayes) and 90% intervals (normal approximation vs. central posterior interval) for `a_item` and `a_respondent`: **not much difference.** Fully Bayesian inference from Stan gives slightly wider ranges, from averaging over uncertainty in `sigma_item` and `sigma_respondent` — `lme4` also marginalizes over the latent values when estimating the varying-intercept standard deviations. **For most purposes the `lme4` result would be fine and computationally faster** at this data size.

## Examples

> [!example] How to choose the parameterization *before* the chains fail
> **Preliminary diagnostic:** compute the posterior for the varying coefficient of **each group separately**, then compare the **within-group posterior variance** to the **between-group variance of the posterior means**.
>
> | Observation | Diagnosis | Choice |
> |---|---|---|
> | Within-group variance $\ll$ between-group variance | Strong likelihood per group | **Centered** |
> | Within-group variances not small relative to between; or per-group computation fails from too few observations or separability | Weak likelihood per group | **Non-centered** |
> | Some groups strong, some weak | Mixed | **Mix the two parameterizations across groups** |
>
> Gorinova, Moore, and Hoffman (2020) propose automating this per-group choice. Honest admission from the authors: "In practice, we often just try one parameterization, and if we see convergence problems we switch to the other—but it's awkward."

Other tricks catalogued in §29.5:

- **More informative prior on the hierarchical scale parameter.** When the likelihood carries little information, a tighter prior on $\sigma_a$ **shortens the funnel** and improves posterior shape. Caveats: *there is no generic prior that always solves the problem*, and you must be careful not to rule out regions of parameter space you actually want in the posterior.
- **Marginal posterior mode of the group-level variance.** For big data, an alternative to full Bayes — **and this is what `lme4` does**. The *joint* mode will not work: **it has a pole at $(\sigma_a = 0,\ a = \mu)$**, a well-known problem discussed in Chapter 5 of *Bayesian Data Analysis*. The marginal mode of $\sigma_a$ works fine in this example, but for harder problems marginal-mode inference **can be unstable**: degenerate estimates especially with varying slopes as well as intercepts, and noisy estimates even off the boundary. **Zero-avoiding priors** (Chung et al. 2013, 2014) address this at the cost of complicating the model. "Indeed, one reason we wrote Stan in the first place was that `lme4` was giving us problems when our models started to get complicated."
- **Better samplers are coming.** New HMC implementations locally adapt to funnel-like geometries (Bou-Rabee et al. 2025). But **even with such algorithms, sampling is faster if the problem is transformed so the posterior is closer to multivariate normal.**

## Connections

The chapter's own summary of the lesson: even fitting a **simple model to clean data** produced computational challenges — first in *interpreting* the fitted parameters, then in *fitting* with HMC. Whenever you adjust for many factors or estimate a large number of latent parameters from sparse data (here at most 27 responses per participant), you are in multilevel-model territory. **Switching parameterizations helps but is not always enough.** Here the sum-to-zero constraint did the real work, and the general message is that **adding strong priors or other structure often makes a model fittable**. And **it always makes sense to try fitting the model to simulated data.**

Cross-cutting threads:
- The three-way additive aliasing here is the same failure mode as the double-intercept bug in [[Model Building - Time-Series Decomposition for Birthdays]] and the aliasing discussion in [[Failure Modes and Steps Forward]].
- The centered-beats-non-centered verdict matches the birthdays case study, where the regularized horseshoe also sampled better centered — two independent instances against the "always non-center" folklore.
- Interpreting a raw-mean/fitted-baseline discrepancy through nonlinearity rather than treating it as a bug is the kind of model-understanding work described in [[Visualizing High-Dimensional Inference]].
- The diagnostic sequence — check divergences, check treedepth, check per-parameter ESS, then read the model code for structural non-identifiability — is the practical form of [[What to Do About Convergence Problems]].

Exercises (§29.7) extend the model with **question order** as a predictor (fit, compare with LOO, compare inferences), ask the reader to take the survey themselves and reproduce Luu's claims that "27% of people find themselves in agreement with significantly more than 1% of other users" and "the median user agrees with 0.16% of other users" (including deciding how to handle missing data), and then to go beyond the chapter's analysis with posterior predictive checks and model improvement.

## See Also
- [[What to Do About Convergence Problems]] — the general diagnostic ladder this case study walks
- [[Failure Modes and Steps Forward]] — aliasing and non-identifiability as named failure modes
- [[Chains, Iterations, and Effective Sample Size]] — reading $\hat{R}$ and ESS tables like the ones above
- [[Modeling Ideas to Address Computing Problems]] — constraints and priors as computational fixes
- [[Fit Fast, Fail Fast]] — the `lme4` first pass and the 200-iteration experimentation loop
- [[Approximate Algorithms and Approximate Models]] — where marginal-mode inference like `lme4` sits
- [[Designing Simulated-Data Experiments]] — the simulate-and-refit check of the intercept puzzle
- [[Model Building - Time-Series Decomposition for Birthdays]] — a second case where centered beat non-centered and an intercept aliased
- [[Building Up to a Hierarchical Model - Coronavirus Testing]] — hierarchical structure introduced for a different reason
- [[Statistical Modeling as Software Development]] — the incremental Stan-program refactoring pattern used here
