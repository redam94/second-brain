---
title: "Multiple-Choice Exam - A Full Workflow Walkthrough"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/example
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 4, pp. 37-60 (Figures 4.1-4.16)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Foundations"
doc_type: textbook
depends_on:
  - "[[Bioassay - A First Probabilistic Program]]"
  - "[[Four Modeling Scenarios]]"
  - "[[Hierarchical Models]]"
  - "[[Generalized Linear Models]]"
used_by:
  - "[[Prior Distributions]]"
  - "[[Designing Simulated-Data Experiments]]"
  - "[[Coding a Series of Models - Movie Ratings]]"
  - "[[Failure Modes and Steps Forward]]"
aliases:
  - "Multiple choice exam example"
  - "Item-response model workflow"
  - "Exam grading example"
---

# Multiple-Choice Exam — A Full Workflow Walkthrough

> [!summary]
> The book's flagship introductory example: **eight successive models** fit to a 24-question, 32-student
> final exam, ending in an item-response model with guessing and discrimination. Along the way it
> exhibits nearly every failure mode the rest of the book catalogues — an improper posterior from
> complete separation, a **data-coding error caught by a posterior predictive plot**, a mixture model
> that becomes unstable on sparse data, additive and multiplicative **aliasing**, and a deliberate
> demonstration of how to **break** the model. The chapter's meta-lesson: "we can learn a lot from a
> simple example if it has some grounding in reality and if we take its details seriously."

## Overview

**The data.** A 24-question final exam written by the authors, taken by 32 students. Each item is
multiple choice with **4 options**, scored 1 (correct) or 0. Total scores range from 12 to 21, average
16. The hardest question was answered correctly by 4 of 32 students; **the easiest by all 32**.

**The applied goal.** "We wanted to check that the individual test questions were doing a good job of
**discriminating** between poorly- and well-performing students."

**Indexing convention used throughout:** $J$ = number of students, $K$ = number of items, $N$ = total
responses (here $JK$, but in general different if not all students take all questions).

## Main Content

### The eight models

| # | Model | What it fixed | What it broke |
|---|---|---|---|
| 1 | Logistic regression per item, flat priors | — | **Non-convergence** on 2 items (complete separation) |
| 2 | Standardized predictor + normal(0,5) priors | Improper posterior; interpretability of $a$ | Revealed *negative discrimination* → data error |
| 3 | Same, after fixing 3 miscoded answer keys | Data coding error | Extreme items still implausible |
| 4 | Add guessing floor at 0.25 | Respects the 4-option structure | Mixture instability; negative-discrimination draws |
| 5 | Multilevel over items | Stabilizes per-item estimates | — |
| 6 | Multilevel with correlated $(a_k, b_k)$ (LKJ) | Allows intercept-slope correlation | Little change in fitted curves |
| 7 | **Item-response model** with latent ability $\alpha_j$, difficulty $\beta_k$ | **Makes the model generative**; removes circularity | Additive aliasing → identified by prior |
| 8 | + discrimination $\gamma_k$ | Restores the original scientific question | Multiplicative aliasing → identified by fixing $E[\gamma]=1$ |

### Model 1 — logistic regression, one item at a time

$$\Pr(y_j = 1) = \text{logit}^{-1}(a + b x_j)$$

where $y_j$ indicates whether student $j$ got a particular item correct and $x_j$ is student $j$'s
**total score on the entire exam** (theoretically 0-24; observed range 11-23).

```stan
data {
  int J;
  array[J] int<lower=0, upper=1> y;
  vector[J] x;
}
parameters {
  real a, b;
}
model {
  y ~ bernoulli_logit(a + b*x);
}
```

> [!warning] The first failure: an improper posterior (Ch. 4.1, p. 38)
> Looping the program over all 24 items **does not work**: for two items, Stan does not converge.
>
> **The mechanism.** All students got these items correct, so the intercept $a$ can be arbitrarily
> large and still fit the data. The unnormalized posterior has infinite integral:
> $$\iint p(y|a,b)\, p(a,b)\, da\, db = \infty$$
> "When applied to this unnormalizable density function, Stan's Hamiltonian Monte Carlo **drifts to
> infinity**."
>
> This is the problem of **complete separation** in binary data (Gelman, Jakulin, et al. 2008; Gelman,
> Hill, and Vehtari 2020, §14.6). See [[Failure Modes and Steps Forward]].
^wrn-separation

### Model 2 — standardize the predictor, then choose a prior

Two problems make a prior on $(a,b)$ hard to think about: the coefficients are on the **log odds
scale**, and $a$ is nominally the log odds of a correct answer when the *total score is zero*, which
is definitionally near-impossible. In Figure 4.2 the posterior mean for $a$ is about $-11$ on the log
odds scale — $1.7 \times 10^{-5}$ on the probability scale.

> [!definition] Standardizing the predictor (Ch. 4.2, p. 39)
> $$x_j^{adj} = \frac{x_j - m}{s}$$
> where $m$ and $s$ are the mean and standard deviation of $x$ in the data. Fitting
> $\Pr(y_j = 1) = \text{logit}^{-1}(a + b x_j^{adj})$:
> - **$a$** = the logit probability that an **average student** gets the item correct;
> - **$b$** = the difference in logit probability comparing a **strong student** (one sd above the
>   mean) to an average student.
^def-standardize

> [!example] Justifying $\text{normal}(0,5)$ by projection (Eq. 4.1, p. 40)
> $$a \sim \text{normal}(0,5), \qquad b \sim \text{normal}(0,5)$$
> - **$a$:** the probability an average student answers correctly lies roughly in
>   $(\text{logit}^{-1}(-5), \text{logit}^{-1}(5)) = (0.007,\, 0.993)$.
> - **$b$:** if an average student has a 50% chance, the prior puts $b$ roughly in $(-5,5)$, implying
>   a strong student's probability is roughly between 0.007 and 0.993.
>
> **Why these are genuinely weak here:** "we would not be assigning exam questions where we would
> expect less than 1% or more than 99% of students to get the right answer, and we do not expect to
> have any questions that so sharply discriminate among students with differing abilities."

> [!important] Why the prior on $b$ is deliberately left symmetric
> "One might argue that the priors are too weak, especially the prior for $b$ which is centered at
> zero. In real life, we should expect most questions to have **positive** discrimination…
> **That said, one reason to fit this sort of model is to detect problems with test questions. We
> would not want to rule out the possibility of negative discrimination.**"
>
> This is the deliberate opposite of the half-normal hard constraint used in
> [[Bioassay - A First Probabilistic Program]] — there positivity was physically justified; here the
> whole point of the analysis is to catch items where it fails.

```stan
data {
  int J;
  array[J] int<lower=0, upper=1> y;
  vector[J] x;
  real mu_a, mu_b;
  real<lower=0> sigma_a, sigma_b;
}
transformed data {
  vector[J] x_adj = (x - mean(x))/sd(x);
}
parameters {
  real a, b;
}
model {
  a ~ normal(mu_a, sigma_a);
  b ~ normal(mu_b, sigma_b);
  y ~ bernoulli_logit(a + b*x_adj);
}
```

**Effect on the fit (Figure 4.3):** the posterior correlation between $a$ and $b$ drops sharply
(because the predictor is now roughly centered), while the fitted curve is essentially unchanged apart
from Monte Carlo variation. The prior has **essentially no impact on the posterior** for this item —
it is doing structural work, not inferential work.

### The data error caught by a plot

> [!example] Figure 4.4 → a coding error in the answer key (Ch. 4.2, p. 42)
> Plotting all 24 fitted curves in one grid, ordered by number of correct answers, revealed:
> - **Item N showed negative discrimination** — stronger students performed *worse*;
> - **Items E and R had approximately zero discrimination.**
>
> "We usually expect exam questions to have positive discrimination, and these results motivate us to
> look at the question wordings to see what was going on: perhaps some of the alternative answers on
> the multiple-choice items were too convincing?"
>
> **The actual cause:** "After looking carefully through the entire exam and its solutions, we
> realized that we had made a mistake when copying the answers on three items: **E, N, and Q**." After
> recoding the answer key and repeating the analysis, Figure 4.5 "looks much better."
>
> > **"We develop incrementally and check posterior predictions (and other aspects of the model) in
> > order to find errors not only in our model, but also in the data."**

Items are renumbered from here on in order of proportion correct: item 1 is hardest, items 23 and 24
were answered correctly by everyone.

**A residual problem even after the fix.** Items G and T (all students correct) still have a
likelihood unbounded toward infinite $a$. The weak prior keeps inference away from extreme values and
permits smooth computation, but "some aspects of the posterior remain implausible here" — some
posterior curves have the probability of a correct answer rapidly going to zero for the *strongest*
students. **"That is the price we pay for fitting a model with a weak prior and sparse data. There is
no way of getting around this problem without including more information in some way."**

### Model 4 — a guessing floor

With 4 options, a student can achieve 25% by guessing alone (Birnbaum 1968). Replace the sampling
statement with:

```stan
y ~ bernoulli(0.25 + 0.75*inv_logit(a + b*x_adj));
```

$$\Pr(y_j = 1) = 0.25 + 0.75\,\text{logit}^{-1}(a + b x_j^{adj})$$

"We like this example because it is easy to understand, easy to write mathematically, and easy to code,
**even though it is not included in standard generalized linear modeling packages.**"

> [!warning] The mixture-model instability (Figure 4.6, Ch. 4.2, p. 43)
> The posterior *median* fits look reasonable and all curves are correctly bounded in $[0.25, 1]$. But
> "a disturbing feature of the posterior simulations … is that now **several of the items show a high
> probability of having negative discrimination.**"
>
> **The mechanism:** "the data are sparse — only 32 students — and, **once we allow for guessing, it is
> unlikely but just possible that the correct answers on a question could have come from pure luck.**
> This is a general problem that arises with mixture models and can also lead to computational
> instability in that the fitting is implicitly averaging over different possible explanations for the
> data."

### Model 5 — multilevel over items

$$a_k \sim \text{normal}(\mu_a, \sigma_a), \qquad b_k \sim \text{normal}(\mu_b, \sigma_b), \quad k=1,\dots,K \tag{4.2}$$

with hyperpriors

$$\mu_a \sim \text{normal}(\mu_{\mu_a}, \sigma_{\mu_a}),\quad \mu_b \sim \text{normal}(\mu_{\mu_b}, \sigma_{\mu_b})$$
$$\sigma_a \sim \text{exponential}(1/\mu_{\sigma_a}),\quad \sigma_b \sim \text{exponential}(1/\mu_{\sigma_b}) \tag{4.3}$$

and settings

$$\mu_{\mu_a}=0,\ \sigma_{\mu_a}=5,\ \mu_{\mu_b}=0,\ \sigma_{\mu_b}=5,\ \mu_{\sigma_a}=5,\ \mu_{\sigma_b}=5 \tag{4.4}$$

> [!important] How the hyperpriors are reasoned about
> - **$\mu_a \sim \text{normal}(0,5)$** roughly constrains the average probability of a correct
>   *unguessed* answer to $(0.007, 0.993)$. "This prior is **much weaker than our actual knowledge**…
>   In practice, though, the population mean of the intercepts is **well identified by the data** in
>   this problem, and so it is not really worth the effort to try to specify its prior more precisely."
> - **$\sigma_a \sim \text{exponential}(1/5)$**, constrained positive with **expectation 5**. If
>   $\sigma_a = 5$, the $a_k$ vary roughly between $-5$ and $5$, i.e. $(0.007, 0.993)$ on the
>   probability scale. "By setting this exponential prior for $\sigma_a$, we are saying that we do not
>   think the probabilities of knowing a correct answer will vary by much more than that."
>
> Note the parameterization: **in this book `exponential(1/m)` has prior mean `m`** — the rate is the
> reciprocal of the intended mean. This convention is used consistently in the case studies.

```stan
data {
  int N;   // number of observations
  int J;   // number of students
  int K;   // number of items on exam
  array[N] int<lower=0, upper=J> student;
  array[N] int<lower=0, upper=K> item;
  array[N] int<lower=0, upper=1> y;
  vector[J] x;
  real mu_mu_a, mu_mu_b;
  real<lower=0> sigma_mu_a, sigma_mu_b, mu_sigma_a, mu_sigma_b;
}
transformed data {
  vector[J] x_adj = (x - mean(x))/sd(x);
}
parameters {
  real mu_a, mu_b;
  real<lower=0> sigma_a, sigma_b;
  vector<offset=mu_a, multiplier=sigma_a>[K] a;
  vector<offset=mu_b, multiplier=sigma_b>[K] b;
}
model {
  a ~ normal(mu_a, sigma_a);
  b ~ normal(mu_b, sigma_b);
  mu_a ~ normal(mu_mu_a, sigma_mu_a);
  mu_b ~ normal(mu_mu_b, sigma_mu_b);
  sigma_a ~ exponential(1/mu_sigma_a);
  sigma_b ~ exponential(1/mu_sigma_b);
  y ~ bernoulli(0.25 + 0.75*inv_logit(a[item] + b[item] .* x_adj[student]));
}
```

> [!important] The `offset`/`multiplier` idiom
> `vector<offset=mu_a, multiplier=sigma_a>[K] a;` declares a **non-centered parameterization
> implicitly** — Stan samples on the standardized scale and transforms. This is the fix for the funnel
> geometry discussed in [[Modeling Ideas to Address Computing Problems]] and
> [[Computational Troubleshooting]], obtained here without rewriting the model.

**Fitted hyperparameters:**

```
 variable mean median   sd  mad   q5  q95 rhat ess_bulk ess_tail
  mu_a    0.84   0.84 0.38 0.35 0.22 1.46 1.00      758     1251
  sigma_a 1.66   1.61 0.36 0.33 1.16 2.35 1.01     1081     1959
  mu_b    1.09   1.08 0.17 0.16 0.82 1.37 1.00     4303     2553
  sigma_b 0.25   0.22 0.19 0.19 0.02 0.61 1.00     1437     1596
```

> [!definition] Reading a Stan summary table (Ch. 4.2, p. 46)
> Stan's default: **4 parallel chains, 1000 warmup + 1000 saved iterations = 4000 draws.**
> - **mean / median** — the posterior median is often used as the point summary.
> - **sd / mad sd** — either can measure posterior uncertainty. The **mad sd** is the median absolute
>   deviation $\times\, 1.48$, which puts it on the same scale as the sd if the distribution is normal.
>   Verify in R: `y <- rnorm(1e6); print(1.48*median(abs(y-median(y))))`.
> - **q5 / q95** — a 90% posterior uncertainty interval.
> - **$\hat{R}$ (`rhat`)** — potential scale reduction, a measure of chain mixing. Near 1 means well mixed.
> - **`ess_bulk` / `ess_tail`** — effective sample sizes for bulk and tail. With independent draws
>   these would approximately equal the number of draws. **"We are usually satisfied if these are
>   greater than 100."**
>
> See [[Chains, Iterations, and Effective Sample Size]] for the full treatment.
^def-stan-summary

> [!example] Translating hyperparameters into substantive statements (Ch. 4.2, pp. 46-47)
> Working from the posterior medians $\mu_a = 0.8$, $\sigma_a = 1.6$, $\mu_b = 1.1$, $\sigma_b = 0.2$,
> and remembering to apply the guessing transformation $0.25 + 0.75p$:
>
> | Quantity | Logit calc | Pr(knows) | Pr(answers correctly) |
> |---|---|---|---|
> | Average student, average item | $\text{logit}^{-1}(0.8)$ | 0.69 | **0.77** |
> | Average student, **hard** item | $\text{logit}^{-1}(0.8-1.6)$ | 0.31 | **0.48** |
> | Average student, **easy** item | $\text{logit}^{-1}(0.8+1.6)$ | 0.92 | **0.94** |
> | **Weak** student, average item | $\text{logit}^{-1}(0.8-1.1)$ | 0.43 | **0.57** |
> | **Strong** student, average item | $\text{logit}^{-1}(0.8+1.1)$ | 0.87 | **0.90** |
>
> The $\sigma_a$ row gives "how much variation in performance can be attributed to variation in the
> difficulties of the items"; the $\mu_b$ row, "how much … to variation in the abilities of the
> students."
>
> **The key finding:** $\sigma_b = 0.2$ implies the items **do not vary much in discrimination** —
> most slopes fall in $1.1 \pm 0.2$. None are estimated negative; none hugely positive. **"The apparent
> large variation in slopes in Figure 4.6 from the model fit separately to each item can be explained
> by small-sample variation and mostly has gone away in Figure 4.7 after fitting the multilevel
> model."** This is partial pooling doing exactly its job — compare
> [[Partial Pooling as Multiple Comparisons Correction]].

### Model 6 — allowing correlation between intercepts and slopes

$$\begin{pmatrix} a_k \\ b_k \end{pmatrix} \sim \text{MVN}\!\left( \begin{pmatrix} \mu_a \\ \mu_b \end{pmatrix}, \begin{pmatrix} \sigma_a^2 & \rho_{ab}\sigma_a\sigma_b \\ \rho_{ab}\sigma_a\sigma_b & \sigma_b^2 \end{pmatrix} \right)$$

> [!important] Why model the correlation matrix rather than the covariance matrix
> "We could parameterize this simply by the correlation $\rho_{ab}$, but **in preparation for
> multivariate models with more than two varying parameters, we preserve generality by modeling the
> correlation matrix.** We break up into a correlation matrix and standard deviation parameters
> because **it is easier to set up a prior on these than on the covariance matrix as a whole.**"

```stan
parameters {
  vector[2] mu_ab;
  vector<lower=0>[2] sigma_ab;
  array[K] vector[2] e_ab;
  corr_matrix[2] Omega_ab;
}
transformed parameters {
  vector[K] a;
  vector[K] b;
  for (k in 1:K) {
    a[k] = mu_ab[1] + sigma_ab[1] * e_ab[k][1];
    b[k] = mu_ab[2] + sigma_ab[2] * e_ab[k][2];
  }
}
model {
  e_ab ~ multi_normal([0,0], Omega_ab);
  mu_ab ~ normal(mu_mu_ab, sigma_mu_ab);
  sigma_ab ~ exponential(1/mu_sigma_ab);
  Omega_ab ~ lkj_corr(1);
  y ~ bernoulli(0.25 + 0.75*inv_logit(a[item] + b[item] .* x_adj[student]));
}
```

> [!definition] The LKJ prior (Lewandowski, Kurowicka, and Joe 2009)
> `lkj_corr(1)` is **uniform on correlation matrices** subject to positive definiteness. Since a Stan
> program implicitly starts with uniform priors — the `model` block augments the target function, so an
> unspecified prior is uniform by default — **specifying LKJ(1) has no effect on the computation.**
> It is included "partly for clarity and partly because for some applications it is convenient to
> assign a weakly informative prior such as **LKJ(2), which regularizes the correlation matrix more
> toward the identity matrix.**"
^def-lkj

**The Cholesky refinement.** The Stan documentation recommends applying the prior to the Cholesky
decomposition for efficiency. "For a $2\times 2$ matrix, this is hardly necessary but we do it here to
demonstrate good Stan coding practice":

```stan
// parameters:
cholesky_factor_corr[2] L_ab;
// model:
L_ab ~ lkj_corr_cholesky(1);
// generated quantities:
generated quantities {
  corr_matrix[2] Omega_ab = multiply_lower_tri_self_transpose(L_ab);
}
```

**Result:** some evidence of correlation between intercepts and slopes (Figure 4.9), but "the estimated
slopes vary so little that the fitted curves … look very similar" — visually indistinguishable from
Figure 4.7. A negative result honestly reported.

### Model 7 — starting over with a fully generative model

> [!warning] The circularity in every model so far (Ch. 4.3, p. 49)
> "The models we have fit so far give an excellent start to exploring the data, but they have a
> **circularity** to them in that **the outcome for each item is predicted from the students' scores on
> all the other items.**"
>
> Cross validation could patch this (predict each item from the sum of the *other* items), "but the
> model would still be **non-generative**." The usual way to generate data from a regression is:
> (1) set or sample $x$; (2) draw hyperparameters from their prior, then parameters given them;
> (3) draw $y$ given parameters. **"But this plan does not work here, because the predictors $x$ are a
> function of $y$; this regression has a likelihood function and we can perform Bayesian inference for
> the parameters given the data, but there is no actual data model."**
>
> This is the concrete payoff of the generative/non-generative distinction in
> [[Why Bayes - Benefits, Costs, and Borders]] and [[Generative and Partially Generative Models]] — and
> the reason the whole model is rebuilt from scratch rather than patched.

> [!definition] The item-response model (Eq. 4.5, Ch. 4.3, p. 49)
> Replace each student's predictor $x_j$ with a **latent ability parameter** $\alpha_j$, and rewrite in
> ability-minus-difficulty rather than slope-intercept form:
> $$\Pr(y_i = 1) = 0.25 + 0.75\,\text{logit}^{-1}\!\left(\alpha_{j[i]} - \beta_{k[i]}\right), \quad i = 1,\dots,N$$
> where $i$ indexes a *try*, $j[i]$ and $k[i]$ are the student and item for that try, $\alpha_j$ is the
> **ability** of student $j$, and $\beta_k$ the **difficulty** of item $k$.
^def-irt

> [!important] Why "long format" indexing $j[i], k[i]$ rather than a matrix $y_{jk}$
> "We prefer the long format because it would also work for **unbalanced data** (in which not all
> students attempt all questions) and represents a more general multilevel structure in which different
> levels can be arbitrarily indexed attributes of the individual data points."
>
> And a broader point: "setting statistical workflow is not just about specifying a probability
> distribution; it also involves **organizing the data and defining latent parameters.** We are
> building a structure connecting data and predictions to a model of the underlying process."

> [!warning] Additive aliasing and how the prior resolves it (Ch. 4.3, p. 50)
> Model (4.5) is **not fully identifiable**: "A constant can be added to all the $\alpha_j$'s and
> subtracted from all the $\beta_k$'s **without changing the data distribution at all.**"
>
> **The simplest fix, rejected:** pin one $\alpha_j$ or one $\beta_k$ to 0. "Interpretation of the
> resulting inference would then be awkward, in that it would **not treat all the students or all the
> items symmetrically.**"
>
> **The fix used:** identify the model through the prior, giving abilities mean zero:
> $$\alpha_j \sim \text{normal}(0, \sigma_\alpha), \quad j = 1,\dots,J \tag{4.6}$$
> which frees the item difficulties to take an unconstrained prior:
> $$\beta_k \sim \text{normal}(\mu_\beta, \sigma_\beta), \quad k = 1,\dots,K \tag{4.7}$$
> now interpretable as **difficulties relative to an average student** in the hypothetical population
> from which the class is drawn.
^wrn-additive-aliasing

Hyperpriors (Eq. 4.8), with $\mu_{\mu_\beta}=0$, $\sigma_{\mu_\beta}=5$, $\mu_{\sigma_\alpha}=5$,
$\mu_{\sigma_\beta}=5$:

$$\mu_\beta \sim \text{normal}(\mu_{\mu_\beta}, \sigma_{\mu_\beta}), \quad \sigma_\alpha \sim \text{exponential}(1/\mu_{\sigma_\alpha}), \quad \sigma_\beta \sim \text{exponential}(1/\mu_{\sigma_\beta})$$

These encode three statements, each phrased **in terms of knowing the correct answer rather than
responding correctly**, because the model also accounts for guessing:
- an average student on an average item has logit probability of *knowing* roughly in $(-5,5)$, i.e.
  probability roughly $(0.01, 0.99)$;
- variation in student abilities could be about 5 on the logit scale;
- variation in item difficulties could be about 5 on the logit scale.

"For example, if your probability of knowing the correct answer is 0.5, then under our model your
probability of answering correctly is $0.25 + 0.75 \cdot 0.5 = 0.625$."

```stan
parameters {
  real mu_beta;
  real<lower=0> sigma_alpha, sigma_beta;
  vector<offset=0, multiplier=sigma_alpha>[J] alpha;
  vector<offset=mu_beta, multiplier=sigma_beta>[K] beta;
}
model {
  alpha ~ normal(0, sigma_alpha);
  beta ~ normal(mu_beta, sigma_beta);
  mu_beta ~ normal(mu_mu_beta, sigma_mu_beta);
  sigma_alpha ~ exponential(1/mu_sigma_alpha);
  sigma_beta ~ exponential(1/mu_sigma_beta);
  y ~ bernoulli(0.25 + 0.75*inv_logit(alpha[student] - beta[item]));
}
```

### Model 8 — adding discrimination

Model 7 assumes **constant discrimination**, "which runs counter to the original goal in analyzing
these data."

> [!definition] Item-response model with discrimination (Eq. 4.9, Ch. 4.3, p. 52)
> $$\Pr(y_i = 1) = 0.25 + 0.75\,\text{logit}^{-1}\!\left(\gamma_{k[i]}\left(\alpha_{j[i]} - \beta_{k[i]}\right)\right)$$
>
> **Reading $\gamma_k$:**
> - $\gamma_k$ **large** → probability of a correct answer depends strongly on ability;
> - $\gamma_k$ **near zero** → probability is approximately the constant
>   $0.25 + 0.75 \cdot 0.5 = 0.625$ regardless of ability;
> - $\gamma_k$ **negative** → higher-ability students are *less* likely to answer correctly.
^def-irt-discrimination

Hierarchical priors (Eq. 4.10):
$$\alpha_j \sim \text{normal}(0, \sigma_\alpha), \quad \beta_k \sim \text{normal}(\mu_\beta, \sigma_\beta), \quad \gamma_k \sim \text{normal}(1, \sigma_\gamma)$$

> [!warning] Multiplicative aliasing (Ch. 4.3, p. 52)
> "The introduction of $\gamma$ into (4.9) introduces a **multiplicative aliasing**: if all the
> $\alpha$'s and $\beta$'s are multiplied by an arbitrary constant, and all the $\gamma$'s are divided
> by that constant, **the data model does not change.**"
>
> **The fix:** setting the mean of the $\gamma$ distribution to the fixed value 1 breaks the invariance
> *and* "allows the components of $\alpha$ and $\beta$ to retain something close to their earlier
> meaning, as the ability and difficulty parameters corresponding to a question of average
> discrimination."
>
> Note the pattern: **additive aliasing fixed by centering $\alpha$ at 0; multiplicative aliasing fixed
> by centering $\gamma$ at 1.** Both resolved through the prior, both preserving symmetry among units.
^wrn-multiplicative-aliasing

> [!important] Why not $\gamma_k \sim \text{lognormal}(0, \sigma_{\log\gamma})$?
> The lognormal is also centered at 1 and has "the added bonus of restricting the $\gamma$'s to be
> positive." **It is rejected deliberately:**
>
> "We do not do this because we want to allow the possibility of negative discrimination. Not only can
> negative discrimination happen, but **allowing it also helps us discover miscoded data or mistakes in
> the model code.**" (As it did — see the answer-key error above.)
>
> Model (4.9) instead provides a **soft constraint**, favoring positive values without enforcing them:
> "If the data are consistent with all the items having positive discrimination, we should end up
> estimating $\sigma_\gamma$ to a low value, which will induce positive estimates for the individual
> $\gamma_k$'s."

Hyperpriors (Eq. 4.11) with $\mu_{\mu_\beta}=0$ and $\sigma_{\mu_\beta}=\mu_{\sigma_\alpha}=\mu_{\sigma_\beta}=5$,
but **$\mu_{\sigma_\gamma} = 0.5$** — "implying that we think it is likely that the majority of items
have discrimination between 0.5 and 1.5. However, the prior decays slowly enough that, if there is
evidence that some of the items do have negative discrimination, the model should be able to find it."

**Result (Figures 4.11-4.12).** $\sigma_\gamma$ is estimated at **0.3**, so discrimination estimates
mostly fall in $(0.7, 1.3)$ — the data are consistent with similar discrimination across items.

> [!example] Reading Figure 4.12 (Ch. 4.3, pp. 53-54)
> The left panel overlays posterior distributions for the 32 abilities $\alpha_j$ (top) and 24
> difficulties $\beta_k$ (bottom), each approximated by a normal centered at the posterior median with
> sd equal to the mad sd. Four readings:
>
> 1. **Most top curves lie right of most bottom curves** → most questions are relatively easy: when
>    $\alpha_j > \beta_k$, $\text{logit}^{-1}(\alpha_j - \beta_k) > 0.5$.
> 2. **Heavy overlap among the ability curves** → "the exam as a whole is **not doing a very good job
>    at discriminating students by ability.** There is even a fair amount of overlap of the posterior
>    distributions of the students with highest and lowest estimated ability!"
> 3. **The difficulty curves are better separated** → we are fairly sure some items really are harder.
>    On the far left, items 23 and 24 (answered correctly by all 32 students): "**Mathematically, these
>    two posterior distributions are identical**, but because of Monte Carlo variation, their posterior
>    simulations are slightly different, and so the curves do not completely overlap." Their posteriors
>    are broad — "with no wrong answers, the data just aren't there to rule out arbitrarily low
>    difficulty levels" — and **"the only reason those two leftmost bottom curves don't go all the way
>    to $-\infty$ is that they are (probabilistically) constrained by their estimated prior
>    distribution as fit by the hierarchical model."**
> 4. **Curves are wider at the extremes and narrower in the middle** → "when a question is answered
>    correctly by all or nearly all the students, or when very few get it correct, then the responses
>    provide **less information** about the item's difficulty."
>
> The right panel plots $(\beta_k, \gamma_k)$ jointly. The model could be expanded to allow a joint
> normal on these — "Given the lack of evidence of variation in the discrimination parameter … **it
> does not seem worth the effort to take this step.**" An explicit decision *not* to expand.

### Section 4.4 — a simulation experiment to understand the model

The claim to be checked: if some items have zero or negative discrimination, model (4.9) should recover
it. "The same simulation code can be quickly repurposed to study model misspecification, to conduct
study design, or simply to validate the inference pipeline under different scenarios."

> [!example] Designing the fake world (Ch. 4.4, p. 54)
> **The design decision.** $\sigma_\gamma = 0.5$ is set *first*, because it is "key to the design of
> this particular experiment, that we want a range of positive discrimination parameters" — and, with
> $\gamma_k \sim \text{normal}(1, 0.5)$, a few items near or below zero.
>
> **Where the other hyperparameters come from — and why not the prior.** "We could draw them all from
> their priors … but given that these hyperpriors are **only weakly informative, this could lead to
> strange datasets.**" Instead $\mu_\beta, \sigma_\alpha, \sigma_\beta$ are set to their **posterior
> median estimates from the real data**: $-0.82$, $0.82$, $1.56$. $J = 32$, $K = 24$ as observed.
>
> **The generative sequence:** draw $J$ abilities, $K$ difficulties, $K$ discriminations from (4.10);
> draw the $JK$ responses from (4.9); fit the model to the simulated data.
>
> **What we are hoping for:** good mixing (low $\hat{R}$), reasonable fit, and successful detection of
> items with negative discrimination.
>
> This is scenario 1 of [[Four Modeling Scenarios]], entered deliberately.

**Result (Figure 4.13):**

```
 variable    mean  median   sd  mad      q5      q95 rhat ess_bulk ess_tail
 lp__     -440.88 -440.33 9.63 9.45 -457.43 -425.83 1.00      646     1257
 mu_beta    -0.55   -0.54 0.45 0.40   -1.30    0.14 1.01      476      446
 sigma_alpha 0.81    0.78 0.27 0.25    0.41    1.29 1.00      822     1081
 sigma_beta  1.60    1.54 0.44 0.40    1.00    2.41 1.01      918      623
 sigma_gamma 0.54    0.53 0.28 0.27    0.09    1.01 1.02      341      654
```

All four true values ($-0.82$, $0.82$, $1.56$, $0.5$) "fall comfortably within their 95% posterior
intervals."

> [!warning] The honest negative finding
> "One concern is that we have constructed the simulation so that a few of the items **should** have
> near-zero discrimination … but **all 24 of the best-fit curves slope upward.** There is a lot of
> posterior uncertainty, as can be seen in the red curves, some of which slope downward. **The
> inference is that some of the items have negative discrimination, but there is not enough information
> to identify which ones.**"

> [!example] Calibration plots and what they reveal (Figure 4.14, Ch. 4.4, p. 56)
> The top row plots simulated true value vs. posterior median for each parameter class; the bottom row
> compares true values to 50% and 95% intervals.
>
> | Parameter | Recovery quality | Reading |
> |---|---|---|
> | **Ability $\alpha_j$** | high but not perfect correlation | "the exam does a reasonable job at identifying the better- and worse-performing students" |
> | **Difficulty $\beta_k$** | even better | "the model does an even better job of determining which are the more and less difficult items" |
> | **Discrimination $\gamma_k$** | **only a very weak correlation** | true values span roughly 0 to 2; **estimates fall in a narrow band between 0.6 and 1.4** |
>
> **But the discrimination inference is not empty:** "if we were to toss from the exam the items with
> lowest estimated discriminations (as they would be expected to provide less information on student
> abilities), **we would indeed be getting rid of items with low true discrimination.**" Rank
> information survives even when the scale does not.
>
> **Coverage.** "Approximately half the 50% intervals and 95% of the 95% intervals contain the true
> values, and, given the posterior median of a parameter, its true value is roughly equally likely to
> be higher or lower" — but **for each set of parameters, the estimates fall in a narrower range than
> the truth.** "This is what happens when data are sparse: there is not much information about each
> student or each item, and so their inferences are **pulled toward their population mean** — 0 for
> $\alpha_j$, $\mu_\beta$ for $\beta_k$, and 1 for $\gamma_k$."
>
> **Scaling up (Figure 4.15).** Repeating with **100 students instead of 32**, all else equal: the
> model now estimates difficulty and discrimination fairly accurately. Student abilities are still
> estimated with some difficulty — reasonable, since the exam still has only 24 questions — but
> **identification of abilities is slightly better, "because the more accurate estimation of $\beta_k$
> and $\gamma_k$ allows the data from each item $k$ to be used more effectively."**

### Section 4.5 — breaking the model

> [!important] The principle
> "We have succeeded in constructing a model that (a) fits the data and (b) gives reasonable
> inferences. **The next step is to explore the limits of applicability of the model and fitting
> procedure by 'breaking' it** — that is, constructing scenarios that result in problems of computation
> or inference. **No model is universally applicable, and a good way to understand how a model works is
> to see where it fails.**"

**Break #1 — remove the regularization.** Fitting logistic regressions separately to each item with a
flat prior gives an improper posterior for the two items everyone answered correctly; HMC drifts to
infinity.

> [!example] Break #2 — the guessing model on well-behaved simulated data (Figure 4.16, Ch. 4.5, p. 58)
> **Setup.** Fit
> $$\Pr(y=1) = 0.25 + 0.75\,\text{logit}^{-1}(a + bx) \tag{4.12}$$
> to $n = 32$ points with $x \sim \text{Uniform}(10,20)$ (roughly the range of real exam scores) and
> **true** $a = -6$, $b = 0.4$. Then a student scoring $x = 15$ is as likely to know the answer as not
> ($-6 + 0.4 \cdot 15 = 0$), with the probability of knowing going to 12% at $x=10$ and 88% at $x=20$ —
> which after guessing means $\Pr(y=1)$ rises from **34% to 91%**. "This is a reasonable range."
>
> **The result with very weak $\text{normal}(0,1000)$ priors:**
> ```
>  variable     mean  median     sd    mad       q5     q95 rhat ess_bulk ess_tail
>  lp__       -16.01  -16.03   2.40   1.75   -19.79  -11.10 1.08       49       40
>  a        -1052.45 -1020.74 807.68 844.71 -2530.89  -17.57 1.15      19       35
>  b           67.57   65.30  51.81  54.26     1.33  162.31 1.15      19       36
> ```
> "The chains are not mixing well, and the inferences make no sense … **and all of this is happening
> with data that were simulated from the model!**"
>
> **The diagnosis, visible only from the graph.** Plotting $E(y|x,\theta_s)$ for 20 posterior draws:
> "several of the fitted curves have **very steep slopes, in effect explaining the data as pure
> guessing for values of $x$ below some threshold and perfect knowledge above it.**"
>
> **The mechanism.** "The probability of the data **does not decline to zero as the parameters approach
> infinity**; thus, when the likelihood is multiplied by a flat prior, the resulting posterior
> distribution is improper. When the likelihood is multiplied by a weak prior, the posterior is
> **insufficiently constrained**, leading here to unreasonable inferences."
>
> **Why the multilevel version survived.** Fit to all 24 items at once there is "enough information to
> more strongly rule out extreme values of $a$ and $b$." But "**in other settings multilevel models can
> themselves be unstable. Just about any model can be broken, and finding these breaking points can be
> a good way of understanding its realm of applicability.**"

## Examples

### General lessons (Section 4.6)

> [!important] The eight-step learning ledger (Ch. 4.6, pp. 59-60)
> 1. **Fitting to a single question** allowed us to interpret and graph the fitted logistic regression
>    and its uncertainty.
> 2. **Looping over all 24 items** revealed a degeneracy with the questions everyone got correct.
> 3. **Standardizing the predictor** allowed a reasonable weakly informative prior to be set.
> 4. **Fitting all 24 items and ordering them informatively** revealed anomalies that sent us back to
>    the data, where we found **three coding errors**.
> 5. **Adding a guessing term** yielded more reasonable estimates but added slope uncertainty — the
>    result of fitting what is essentially a mixture model to sparse data (32 binary points per item).
> 6. **Embedding the coefficients in a multilevel model** yielded more stable estimates and
>    uncertainties.
> 7. **Moving to an item-response model** removed the awkwardness of predicting each outcome from a
>    total score that depends on it. The IRT model **is fully generative** and produces uncertainty
>    estimates for students' relative abilities.
> 8. **We broke the model** by simulating data for which the fitting procedure did not work.
>
> "At each step, we can compare inferences from the model that came before, and **when there are big
> differences we work to understand them and consider the possibility of flaws in each new model
> expansion or bugs in the implementation.**"

**Naming of parameters.** Once past the simplest models, naming conventions matter. A simple regression
$y_i \sim \text{normal}(a + bx_i, \sigma)$ becomes $y_i \sim \text{normal}(a_{j[i]} + b_{j[i]}x_i, \sigma)$
with varying coefficients, then $a_j \sim \text{normal}(\mu_a, \sigma_a)$ — "we are already leaning on
the naming by expressing the mean and standard deviation of the population distribution of $a$ as
$\mu_a, \sigma_a$ rather than in an operator notation such as $E(a)$, $\text{sd}(a)$." Adding hyperpriors
produces the confusing pairs $\mu_{\sigma_a}$ and $\sigma_{\mu_a}$.

> [!warning] The authors' own frustration
> "It is a **weakness of our programming languages, and thus of our current workflow**, that these
> relationships need to be specified using the naming rather than the structure of the parameters."
> And: "Ideally we would like a more general approach that would express the hyperparameters and their
> priors more formally as attributes of the varying parameters, **but we are not there yet, either in
> our symbolic algebra or our code.**" In Stan, names like `mu_mu_a`, `sigma_mu_a`, `mu_sigma_a` are
> "potential sources of typos." See [[Computational Tools and Probabilistic Programming#Notation as a workflow decision]].

**Building up from simple models — two reasons the model should expand with the data.** (i) More data
give resolution to estimate nonlinearity and interactions invisible in a small sample. (ii) Data from
other items and other student groups **necessitate** expansion to let parameters vary by
characteristics. "New data provide additional information as well as **increasing the burden of the
model to fit a broader set of circumstances.**" Even when you could specify the final model now, build
up: for computational confidence, to understand the fit, and "to get a sense of **why the more
complicated model is necessary.**"

> [!important] On the intimidation factor (Ch. 4.6, p. 60)
> "At this point, Bayesian workflow might seem intimidating: so many steps and so much work for such a
> simple problem! In response, we would argue that **this level of effort is required to build trust in
> just about any procedure in statistics and machine learning. The difference is that standard methods
> such as least squares regression have been studied for so long that the scaffolding for
> trust-building has already been done by our predecessors.** For those methods, the bridge has already
> been designed, built, tested, and traversed by millions of users… When designing a new method to work
> on a new problem, we need to build much of that infrastructure ourselves."

### Exercises

> [!example] Chapter 4 exercises (p. 60)
> - **4.1** Redo all analyses with a **probit** rather than logit link (replace $\text{logit}^{-1}$ by
>   the normal CDF throughout). How do results change?
> - **4.2** Repeat §4.4 with **$\sigma_\gamma = 1$**, so that some discriminations should be near zero
>   or negative. Discuss the differences.
> - **4.3** Experiment further — different hyperparameter values, or different numbers of students or
>   items.

## Connections

- This chapter is the compressed version of the whole book; each numbered lesson maps to a later part:
  priors → [[Prior Distributions]]; guessing/mixture instability →
  [[Failure Modes and Steps Forward]]; multilevel stabilization → [[Hierarchical Models]]; the fake-data
  experiment → [[Designing Simulated-Data Experiments]]; the calibration plots →
  [[Simulation-Based Calibration - Overview]]; breaking the model →
  [[Fit Fast, Fail Fast]].
- The **item-response model** reappears with a full model-coding treatment in
  [[Coding a Series of Models - Movie Ratings]] (Ch. 16), where raters replace students.
- The two aliasing problems here are the template for the identification discussion in
  [[Sampling Problems with Latent Variables - No Vehicles in the Park]] (Ch. 29).

## See Also
- [[Bioassay - A First Probabilistic Program]] — the same loop on a problem small enough not to break
- [[Four Modeling Scenarios]] — this chapter visibly traverses all four rungs
- [[Partial Pooling as Multiple Comparisons Correction]] — why Model 5 tamed the apparent slope variation
- [[Hierarchical Models]] — BDA3 background for models 5-8
