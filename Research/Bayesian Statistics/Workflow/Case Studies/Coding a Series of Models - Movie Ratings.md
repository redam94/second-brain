---
title: "Coding a Series of Models - Movie Ratings"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 16, pp. 263-273 (Figures 16.1-16.5)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Case Studies"
doc_type: textbook
depends_on:
  - "[[Designing Simulated-Data Experiments]]"
  - "[[Multiple-Choice Exam - A Full Workflow Walkthrough]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Prior Specification for Regression Models - Sleep Study]]"
  - "[[Failure Modes and Steps Forward]]"
aliases:
  - "Movie ratings example"
  - "Two movies problem"
  - "Rater effects"
  - "4 stars from 2 ratings vs 100"
---

# Coding a Series of Models — Movie Ratings

> [!summary]
> The book's opening case study, deliberately clean: **all data are simulated**, so every model can be
> checked against known truth. It starts from a concrete question — *two movies both average 4.0 stars,
> one from 2 ratings and one from 100; which do you see?* — and builds through four models to an
> **item-response model with rater effects**, where the payoff is demonstrated directly: when tough raters
> preferentially review crime movies, **raw averages are systematically biased by genre and the
> model-based estimates are not.**

## Overview

> [!important] The framing question (Ch. 16, p. 263)
> "**Both have average online ratings of 4 out of 5 stars, but one is based on 2 ratings and the other is
> based on 100. Which movie should you choose?**"
>
> **The assumptions being made explicit up front:** that you "**would prefer to see the movie that is most
> preferred, on average, by others**"; that every movie has a **"true popularity"** — the average rating if
> everyone in the population rated it; that "**these two movies are aimed at the same target audience, which
> includes you**"; and that each has been "**rated by a random sample of people from this general
> audience.**"
>
> **The four-step plan:**
> 1. **Two movies** — fit a model to get inferences about the true popularity of each.
> 2. **$J$ movies** — embed in a larger problem.
> 3. **Raters** — different people rate different movies, with systematic differences in who rates what.
> 4. **Popularity affecting exposure** — more people see and rate more popular movies.
>
> "**For each step, we set up a model, simulate fake data from that model, and check that we can recover the
> underlying parameters to some level of accuracy.**"

## Main Content

### Model 1 — two movies

> [!definition] The model, and what it deliberately ignores (Ch. 16.1, pp. 263-264)
> $$y_i \sim \text{normal}(\theta_{j[i]},\ \sigma_y), \qquad i = 1,\dots,N$$
> with $\theta_j$ the true popularity of movie $j$.
>
> **The simplifications, stated openly:** "**we're pretending ratings are continuous unbounded numbers
> (rather than integers from 0 through 5) and that the distributions of ratings for the two movies differ
> only in their mean, not their variance. We're not allowing, for example, a polarizing movie that you either
> love or hate.**"
>
> **The priors:** "**We will assume that movies typically get ratings of around three stars**" — so
> $\theta_1, \theta_2 \sim \text{normal}(3,1)$ **constrained to $[0,5]$**, and
> $\sigma_y \sim \text{normal}_+(0, 2.5)$, "**which is weak given this restricted range.**"
>
> ```stan
> data {
>   int N;
>   vector[N] y;
>   array[N] int<lower=1, upper=2> movie;
> }
> parameters {
>   vector<lower=0, upper=5>[2] theta;
>   real<lower=0> sigma_y;
> }
> model {
>   theta ~ normal(3, 1);
>   sigma_y ~ normal(0, 2.5);
>   y ~ normal(theta[movie], sigma_y);
> }
> ```
^def-ratings-model-1

> [!important] Why vectorization matters — three specific reasons (Ch. 16.1, p. 264)
> The last line could equivalently be a loop, or explicit `target +=` statements. "**The vectorization in the
> Stan language makes the code more compact … and also speeds the computation. The savings come because**
> **(a) it compresses the memory representation of the expression graph**;
> **(b) it calls fewer virtual functions when it's propagating partial derivatives in the gradient computation
> through this expression, so there's less pointer chasing on the CPU**; and
> **(c) it can remove duplicate computations such as computing `log(sigma_y)` for each entry in the vector.**"
>
> **Where to optimize, generally:** "**When optimizing Stan code for speed, pretty much all the practical
> gains will be occurring in the transformed parameter block and the model block, first because they are
> involved in the computation of the target function and its gradients, and second because they are computed
> every step within HMC, not just every iteration.**"

> [!example] The answer to the framing question
> **The constructed data.** Movie 1: ratings of 3 and 5 (mean 4.0). Movie 2: ten 2s, twenty 3s, thirty 4s,
> forty 5s (also mean 4.0). "**This set of hypothetical ratings does not follow the assumed normal
> distribution, but that's fine; we can still fit the model.**"
>
> ```
>  variable  mean median   sd  mad    q5   q95 rhat ess_bulk ess_tail
>  theta[1]  3.63   3.65 0.55 0.56  2.70  4.53 1.01     3030     1762
>  theta[2]  3.99   3.99 0.10 0.10  3.82  4.15 1.00     3650     2431
>  sigma_y   1.02   1.02 0.07 0.07  0.91  1.15 1.00     2884     2013
> ```
>
> **The two-rating movie is shrunk from 4.0 to 3.63** — pulled toward the prior mean of 3 — with a 90%
> interval of $(2.7, 4.5)$. The 100-rating movie stays at 3.99 with interval $(3.8, 4.2)$.
>
> **The answer, which is not a single number:** "**It depends on your goals. Movie 2 is a safer bet, with a
> higher estimated quality. But Movie 1 has a small chance of being outstanding, along with a moderate chance
> of being mediocre. You can see Movie 1 if you want to roll the dice.**"

### Model 2 — $J$ movies, and the uncertainty-vs-sample-size check

> [!example] Simulating 40 movies (Figures 16.1-16.2, Ch. 16.2, pp. 265-267)
> ```r
> J <- 40
> N_ratings <- sample(0:100, J, replace=TRUE)   # random exposure per movie
> N <- sum(N_ratings)
> movie <- rep(1:J, N_ratings)
> theta <- rnorm(J, 3.0, 0.5)
> y <- rnorm(N, theta[movie], 2.0)
> ```
> $$\theta_j \sim \text{normal}(3.0,\ 0.5), \qquad z_i \sim \text{normal}(\theta_{j[i]},\ 2.0)$$
>
> **Check 1 — coverage (Figure 16.1).** "**Roughly half the 50% intervals and 95% of the 95% intervals contain
> the true parameter value, which is about what we would expect to see, given that we have simulated data from
> the model we are fitting.**"
>
> **Check 2 — width against sample size (Figure 16.2).** "**The more data we have for any given movie, the
> more precise is our estimate of its underlying popularity.**" The plot of 50%-interval width against number
> of ratings shows the expected decreasing curve.
>
> **Why the curve isn't smooth, and why that's fine:** "**The only reason the points do not completely fall
> along a smooth curve here is that the intervals are computed using simulation** … **if $\theta_1$ has a
> posterior 50% interval of $(3.1, 3.5)$, there is no real reason to amass a huge number of simulations to
> determine that the precise interval is $(3.13, 3.48)$, as this would make no real difference in our
> understanding of $\theta_1$, nor should it seriously affect any decision.**" — the argument of
> [[How Many Digits to Report]].

### Model 3 — the item-response model with rater effects

> [!definition] The problem being solved (Ch. 16.3, p. 267)
> "**Suppose that some people tend to give high ratings and others tend to give low ratings, and the sorts of
> people who give high ratings are more likely to watch romantic comedies, while the tougher judges more
> frequently watch crime movies. Then a simple comparison of average ratings will be unfair to the crime
> movies.**"
>
> The model, for rating $y_i$ of movie $j[i]$ by rater $k[i]$:
> $$y_i \sim \text{normal}(a_{j[i]} - b_{k[i]},\ \sigma_y)$$
> - **$a_j$** = movie **"quality"** — "the average rating that movie $j$ would receive, if it were reviewed by
>   average raters";
> - **$b_k$** = rater **"difficulty"** — "higher values correspond to raters who give tougher judgments of
>   equivalent movies."
>
> **The identification constraint, and why it is needed:** "**When fitting the new model, we constrain the
> $b_k$ to come from a distribution whose average is zero. Some such constraint is necessary because
> otherwise the parameters would not be jointly identified: for example, you could add 100 to each of the
> $a_j$ and 100 to each of the $b_k$ and not change any of the predictions at all.**"
>
> The same **additive aliasing** as
> [[Multiple-Choice Exam - A Full Workflow Walkthrough#Model 7]] and
> [[Failure Modes and Steps Forward#Failure 3]].
^def-ratings-irt

> [!important] The non-centered reparameterization, introduced as good default practice
> The natural form:
> $$a_j \sim \text{normal}(\mu, \sigma_a), \qquad b_k \sim \text{normal}(0, \sigma_b)$$
> is re-expressed **before any computational problem appears**:
> $$y_i \sim \text{normal}(\mu + \sigma_a \alpha_{j[i]} - \sigma_b \beta_{k[i]},\ \sigma_y)$$
> $$\alpha_j \sim \text{normal}(0,1), \qquad \beta_k \sim \text{normal}(0,1)$$
>
> "**This new version, called the non-centered parameterization … is convenient because it separates the
> scaled and unscaled parameters; also it can have certain computational advantages.** The new models are
> equivalent, with the movie quality parameters expressed as $a_j = \mu + \sigma_a \alpha_j$."
>
> ```stan
> transformed parameters {
>   vector[J] a = mu + sigma_a * alpha;
> }
> model {
>   y ~ normal(a[movie] - sigma_b * beta[rater], sigma_y);
>   alpha ~ normal(0, 1);
>   beta ~ normal(0, 1);
>   mu ~ normal(3, 5);
>   sigma_a ~ normal(0, 5);
>   sigma_b ~ normal(0, 5);
>   sigma_y ~ normal(0, 5);
> }
> ```
>
> **Priors deliberately left broad:** "**We start with very broad priors on the hyperparameters … with the
> understanding that we can sharpen these later if the data are weak enough that this seems necessary.**"
> See [[Failure Modes and Steps Forward#The funnel]] for why the reparameterization matters.

> [!example] Balanced data — parameter recovery (Figure 16.3, Ch. 16.3, p. 269)
> $J = 40$ movies, $K = 100$ raters, **everyone rates everything**; true values $\mu = 3$,
> $\sigma_a = \sigma_b = 0.5$, $\sigma_y = 2$.
> ```
>  variable  mean median   sd  mad   q5  q95 rhat ess_bulk ess_tail
>  mu        3.19   3.19 0.11 0.11 3.01 3.36 1.00      774     1383
>  sigma_a   0.54   0.53 0.07 0.07 0.43 0.66 1.00     1136     1977
>  sigma_b   0.52   0.52 0.05 0.05 0.44 0.61 1.00     1633     2268
>  sigma_y   2.03   2.03 0.02 0.02 2.00 2.07 1.00     5901     2950
> ```
> "**The scale parameters are accurately estimated, and the mean level $\mu$ is more difficult to nail down,
> but the true value of 3.0 is within the range of posterior uncertainty.**"
>
> Note the pattern: **$\sigma_y$ has ESS 5901 and $\mu$ only 774.** The global mean is the hardest thing to
> pin down in an item-response model, because it is the quantity most entangled with the identification
> constraint.

### The payoff — unbalanced data

> [!example] Tough raters preferentially reviewing crime movies (Figures 16.4-16.5, Ch. 16.3, pp. 269-272)
> **The design:** movies $1..20$ are romantic comedies, $21..40$ are crime stories.
> ```r
> genre <- rep(c("romantic", "crime"), c(round(J/2), J - round(J/2)))
> prob_of_rated <- ifelse(beta[rater] > 0,
>                         ifelse(genre[movie] == "romantic", 0.2, 0.7),
>                         ifelse(genre[movie] == "romantic", 0.7, 0.2))
> rated <- rbinom(N, 1, prob_of_rated) == 1
> ```
> "**If $\beta_k > 0$, then person $k$ will have a 20% chance of rating each romantic comedy and a 70% chance
> of rating each crime movie. If $\beta_k < 0$, then the probabilities are reversed.** So, in the data, we'll
> expect to see tougher reviews on the crime stories."
>
> **Fit still recovers everything** ($\mu = 3.19$, $\sigma_a = 0.55$, $\sigma_b = 0.61$, $\sigma_y = 2.01$),
> with coverage checks (Figure 16.4) fine for both genres and both rater types. "**Coverage still seems fine,
> which it should be — again, we ran our simulations under the model that we later fit — but it is still
> gratifying to see, as a confirmation that we are not making any obvious mistakes.**"
>
> **The demonstration that matters (Figure 16.5).** Plot the true $a_j = \mu + \sigma_a\alpha_j$ against
> (left) the **raw average** $\bar{y}_j$ and (right) the **posterior median of $a_j$**:
>
> - **Raw averages are biased by genre.** "**The raw averages for the romantic comedies are mostly too high**
>   … **Meanwhile the raw averages for the crime movies are mostly too low.**"
> - **Model-based estimates are not.** "**The model adjusts for these biases, though, and so the model-based
>   estimates … do not have these systematic problems.**"
>
> This is the case study's whole argument in one figure: **the model is not doing anything mysterious — it is
> subtracting an estimated rater effect — but that is exactly what naive averaging cannot do.**
^ex-raw-vs-model-estimates

## Examples

> [!example] General lessons and three extensions (Ch. 16.4, p. 272)
> "**We began with a simple question about comparing two movies and gradually built up a model to include
> increasing levels of complexity. At every step of the way, we understood our model and its inferences
> through fake-data simulation.**"
>
> **Three ways to make it more realistic, listed but not fitted:**
> - **Popularity affecting exposure.** "**More popular movies will be seen by more people and thus should get
>   more ratings. So we might want to extend the model to allow the frequency that a movie is rated to depend
>   on the movie's popularity.**" — i.e. make the *design* generative, a step up the ladder of
>   [[Generative and Partially Generative Models]].
> - **Genre-specific rater preferences.** "**The model could capture this by allowing each person to have a
>   vector of difficulty parameters, one for each genre.**"
> - **Discrete ratings.** "**We could replace the normal distribution for $y_i$ by an ordered logistic model
>   which would give probabilities of each of the discrete responses from 0 through 5.**"

> [!example] Exercises 16.3-16.4 — the value of overlap (Ch. 16.5, p. 272)
> **16.3** Suppose there is **complete lack of overlap**: one subset of people rates only romantic comedies,
> another only crime movies, nobody both.
> **(a)** "**Explain why it is impossible to learn anything about the relative qualities of the two types of
> movie without an informative prior.**"
> **(b)** Simulate from this design, fit with informative priors, discuss.
>
> **16.4** Now introduce **a small number of raters who rate both types.** "**Simulate data from this new
> design and then fit the model, adding information from these overlapping raters one at a time. Make a graph
> with the number of overlapping raters on the $x$-axis demonstrating the inferential benefits coming from
> these new raters. You will have to figure out what to compute and plot on the $y$-axis.**"
>
> The pair is a compact lesson in **identification through design**: without overlap the genre comparison is
> confounded with the rater-pool comparison and no amount of data helps; a handful of bridging raters
> restores it.

> [!example] Exercise 16.5 — feeling thermometers and partisanship
> $J$ respondents rate $K$ politicians 0-100:
> $y_i \sim \text{normal}(\mu + a_{j[i]} + b_{k[i]}, \sigma_y)$, with $a_j$ the respondent's positivity and
> $b_k$ the politician's popularity. "**But this model doesn't account for partisanship.**" Given
> $\text{pid}_j \in \{-1, 0, 1\}$ for Democrat/Independent/Republican: expand the model "**in a sensible
> way**," write it in Stan, simulate, fit, and plot.
>
> The natural answer is an **interaction** between respondent party and politician — which is precisely the
> structure the two-parameter additive model cannot represent.

## Connections

- Structurally this is the same item-response model as
  [[Multiple-Choice Exam - A Full Workflow Walkthrough]], with raters in place of students — but here every
  dataset is simulated, so each claim is verified against known truth rather than argued for.
- The bias-correction result is a small, clean instance of
  [[Poststratification]]: an unrepresentative sample of raters produces a biased average, and the model's
  job is to adjust for the known imbalance.
- Exercise 16.3's no-overlap case is the cleanest example in the book of
  [[Prior Distributions|prior information doing identification work]] rather than regularization.

## See Also
- [[Designing Simulated-Data Experiments]] — the method this case study applies at every step
- [[Multiple-Choice Exam - A Full Workflow Walkthrough]] — the same model class on real data
- [[Failure Modes and Steps Forward]] — aliasing and the non-centered parameterization
- [[Hierarchical Models]] — BDA3 background
