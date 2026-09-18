---
title: "Tail Behavior and Prior-Likelihood Conflict"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - type/example
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5.10, pp. 93-97 (Figures 5.9-5.13)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Prior Distributions]]"
  - "[[Constructing Priors for Effect Sizes]]"
  - "[[There Is No Safe Haven]]"
used_by:
  - "[[Influence of Likelihood and Prior]]"
  - "[[Predictive Model Checking and Comparison - Clinical Trial]]"
  - "[[Global-Local Shrinkage Priors]]"
aliases:
  - "Prior-likelihood conflict"
  - "Normal-Cauchy model"
  - "Bias term model"
  - "Priors under transformation"
---

# Tail Behavior and Prior-Likelihood Conflict

> [!summary]
> What happens when the prior and the data disagree — and why **the normal-normal model hides the
> disagreement entirely.** With $\bar{y} = 10$ against a $\text{normal}(0,1)$ prior, the posterior sits
> at 5.0, "contradicting both prior and likelihood," and **nothing in the posterior signals a
> problem.** Three remedies are compared: a **Cauchy prior** (conflict resolved in favor of the
> likelihood), an explicit **bias term** (conflict resolved in favor of the prior, producing a
> **non-monotonic** posterior mean), and prior-likelihood **conflict diagnostics**. The section also
> shows that a prior can be **unimodal in one parameterization and bimodal in another.**

## Overview

> [!important] Why tails are hard to specify (Ch. 5.10, p. 93)
> "When defining data models and priors, **there is not usually strong information to determine the tail
> shape.** In prior elicitation, domain experts may be able to supply some information about quantiles,
> but **they will rarely have precise information on extreme quantiles and rare events**" (O'Hagan et al.
> 2006).
>
> **The way to understand them:** "**One way to understand the tail properties of a data model and a
> prior is to see how they combine in the posterior distribution.**"
>
> **The tradeoff:** "**Thick tails** correspond to distributions where extreme values can arise with low
> but nontrivial probability, which **allows resolution of prior-likelihood conflict** (O'Hagan 1979).
> On the other hand, **if we always prepare for unexpected data, we lose in statistical efficiency.** An
> alternative is to use **thinner tails as with the normal distribution and use prior-likelihood conflict
> diagnostics**" (Kallioinen et al. 2024 — the `priorsense` package; see
> [[Influence of Likelihood and Prior]]).

## Main Content

### Priors under transformation of parameters

> [!warning] A prior can be unimodal in one parameterization and bimodal in another (Figure 5.9)
> Consider a probability $p$ mapped to the real line by $\phi = \text{logit}(p)$.
> - A **uniform prior on $p$** corresponds to a **unit logistic prior on $\phi$** — "the difference
>   arising from the **Jacobian** of the transformation."
> - Figure 5.9 shows five $\text{logistic}(0,\sigma)$ priors on $\phi$ with
>   $\sigma \in \{0.25, 0.5, 1, 2, 4\}$, each displayed on **both** the logit scale and the probability
>   scale.
> - **The lowest panel, $\phi \sim \text{logistic}(0,4)$**, "on the scale of $\phi$ **appears to be a weak
>   prior** allowing a wide range of parameter values, but **on the scale of $p$ is strongly
>   concentrating the probabilities near 0 and 1**" — i.e. it becomes **bimodal**.
>
> This is the same lesson as the $y=0$ binomial example in
> [[Prior Distributions#Noninformative priors, and why "flat" is not "weak"]] and the
> $\text{normal}(0,50)$ panel of [[Prior Predictive Checking]]: **weakness is a property of the scale you
> look at it on.**
^wrn-transformation

### The normal-normal model hides the conflict

> [!example] The disturbing figure (Figure 5.10, Ch. 5.10, pp. 94-95)
> **Setup.** $N$ independent observations $y_i \sim \text{normal}(\theta,\sigma)$ with prior
> $\theta \sim \text{normal}(0,1)$ — "assuming the problem has been scaled so that there is no strong
> prior reason to expect $\theta$ to be positive or negative and that it is reasonable to expect its
> absolute value to be less than 1."
>
> Take $N = 100$, $\sigma = 10$: "**a large enough sample size that the variance parameter can be
> precisely estimated from data**, and we have set $\sigma$ so that **the prior and data convey equal
> amounts of information**" (since $\sigma/\sqrt{N} = 1$, matching the prior sd).
>
> ```stan
> data { int N; vector[N] y; }
> parameters { real theta; real<lower=0> sigma; }
> model {
>   theta ~ normal(0, 1);
>   y ~ normal(theta, sigma);
> }
> ```
>
> Ignoring the small posterior uncertainty in $\sigma$, the posterior is analytic:
> $$
> \theta \mid y \sim \text{normal}(0.5\,\bar{y},\; 0.71)
> $$
> "which makes sense: prior and data are weighted equally."
>
> | Data | Posterior | Assessment |
> |---|---|---|
> | $\bar{y} = 2$ | $\text{normal}(1.0, 0.71)$ | "This looks fine" |
> | $\bar{y} = 10$ | $\text{normal}(5.0, 0.7)$ | **contradicts both prior and likelihood** |
>
> > **"The awkward thing here is not so much the prior-likelihood conflict — our models are imperfect,
> > and such things happen — but also that this conflict does not show up in the posterior distribution.
> > But it is clear in the graph with prior and likelihood. If one were to use this model without such a
> > check, it would just report the bad result with no warning."**
>
> Note also: "**Computation remains smooth.**" There is no divergence, no $\hat{R}$ warning, no sign of
> trouble in any diagnostic — the failure is invisible to everything in
> [[Chains, Iterations, and Effective Sample Size]]. **Plotting prior and likelihood together is the
> only check that catches it.**

### Remedy 1 — a long-tailed prior

> [!example] The normal-Cauchy model (Figures 5.11-5.12, Ch. 5.10, pp. 95-96)
> "The **Cauchy distribution matches the normal near its center but allows arbitrarily large values.**"
> Implemented by replacing `theta ~ normal(0, 1)` with `theta ~ cauchy(0, 1)`.
>
> | Data | Posterior mean | Posterior sd | Behavior |
> |---|---|---|---|
> | $\bar{y} = 2$ | **1.3** | 0.9 | "a bit less pooling than with the normal prior, but essentially the same as before" |
> | $\bar{y} = 10$ | **9.8** | 1.0 | "the model has weighed the information in the prior and likelihood and **'decided' (using the rules of probability) to favor the data**" |
>
> > **"The increasing flatness of the Cauchy density in the tail implies that, for this model, the less
> > consistent the data are with the prior, the less influence the prior has."**

> [!definition] The shrinkage factor (Figure 5.12, Ch. 5.10, p. 96)
> The proportion by which $\bar{y}$ is shrunk toward the prior mean of 0 to obtain the posterior mean
> $E(\theta|y)$:
>
> - **Normal-normal model with equal prior and likelihood variance: the shrinkage factor is always
>   $0.5$**, regardless of $\bar{y}$ — a horizontal line.
> - **Normal-Cauchy model: shrinkage is close to $0.5$ when $\bar{y}$ is near zero, but declines toward
>   0 as $\bar{y}$ moves away** — "when it is far from zero, the Bayesian inference **engages the flatter
>   part of the Cauchy prior** and the shrinkage approaches zero."
>
> **"The tails of likelihood and prior in the normal-Cauchy model are such that, when there is
> prior-likelihood conflict, the posterior inference favors the likelihood."**
^def-shrinkage-factor

### Remedy 2 — an explicit bias term (when you trust the prior)

> [!example] Adding a bias parameter (Figure 5.13, Ch. 5.10, pp. 96-97)
> **The question this answers:** "**But what if you do have strong prior information and you don't want
> prior-likelihood conflict to be resolved in favor of the likelihood?**" Then "**you need to add an
> additional error term to your model to allow for possible bias.**"
>
> ```stan
> data { int N; vector[N] y; }
> parameters { real theta, bias; real<lower=0> sigma; }
> model {
>   theta ~ normal(0, 1);
>   y ~ normal(theta + bias, sigma);
>   bias ~ cauchy(0, 0.1);
> }
> ```
>
> "The $\text{Cauchy}(0, 0.1)$ prior implies that **the bias is most likely to be small, but there's a
> small probability it could be large, and if so it could be very large.**"
>
> **Results with $N = 100$, $y \sim \text{normal}(\mu, 10)$:**
>
> | Data | $E(\theta|y)$ | $E(\text{bias}|y)$ | sd(bias) | Where the signal went |
> |---|---|---|---|---|
> | $\bar{y} = 2$ | **0.9** | 0.2 | 0.6 | residual $2 - 0.9 - 0.2 = 0.9$ "implicitly attributed to the error term in the likelihood"; close to the $\theta \approx 1$ from the no-bias model |
> | $\bar{y} = 10$ | **0.2** | **9.6** | — | "**Prior-likelihood conflict is avoided by attributing almost all the error to the bias term**" |
>
> > **"Inference for this model with two error terms is counterintuitive. If the data are not too far
> > from zero, posterior inferences are shrunk toward zero, but as the data become more extreme, the
> > model infers that the bias must be large, and the resulting posterior for $\theta$ ends up giving
> > *less* weight to the data. $E(\theta|y)$ is a **non-monotonic function of $\bar{y}$.**"**
>
> **This is a general property, not a quirk:** "This behavior is common with all **heavy-tailed prior
> distributions for coefficients used to encode the assumption that only some coefficients are likely to
> be big**; see §4.1 of Piironen and Vehtari (2017b)." — i.e. the horseshoe family,
> [[The Horseshoe Prior]] and [[Regularized Horseshoe (Finnish Horseshoe)]].
>
> Compare the "add a bias term" fix proposed for assumption 1 of the 8 schools model in
> [[Relating a Model to Subject-Matter Assumptions]].

### Choosing between the remedies

| Remedy | Resolves conflict in favor of | Use when |
|---|---|---|
| **Thick-tailed prior** (Cauchy) | the **likelihood** | you distrust the prior more than the data; extreme values are genuinely possible |
| **Explicit bias term** | the **prior** | you have strong prior information and suspect measurement or design bias |
| **Thin tails + conflict diagnostics** | neither — it *reports* the conflict | you want efficiency and are willing to check (`priorsense`; [[Influence of Likelihood and Prior]]) |

### No safe haven, again

> [!important] Why maximum likelihood is not the escape hatch (Ch. 5.10, p. 97)
> "The challenges of prior-likelihood conflict **do not imply that these problems go away in non-Bayesian
> inference.** In the above example, one could simply use the maximum likelihood estimate $\bar{y}$. **But
> this is unsatisfactory in settings with weak data and strong prior information.**"
>
> The recurring example: the early-childhood intervention with an estimated **42% effect on adult income,
> standard error 20%**. "Even if data issues are set aside and this is taken as an unbiased estimate, **it
> is very noisy, and any realistic expectation for an average treatment effect would be much lower.** A
> reasonable prior might be $\text{normal}(0, 0.1)$."
>
> "**Using raw, unregularized estimates in noisy settings leads to systematic overestimates of treatment
> effects, and these 'exaggeration factors' can be huge**" (Gelman and Carlin 2014; van Zwet and Gelman
> 2022).
>
> **"This is the sort of problem that motivates the use of strong priors, but then we do need to be aware
> of how the resulting inferences can depend on technical aspects of the model such as tail behavior."**
>
> "The case studies in Part 4 illustrate several examples of analyzing prior and likelihood sensitivity."

## Connections

- This section is the reason [[Influence of Likelihood and Prior]] (§8.5) exists as a separate workflow
  step: the normal-normal example proves that **posterior summaries alone cannot reveal conflict.**
- The non-monotonic $E(\theta|y)$ under a bias term is the same mechanism that makes shrinkage priors
  behave well in [[Models for Regression Coefficients - Student Grades]] — large coefficients escape
  shrinkage entirely.
- The transformation result (Figure 5.9) is the prior-side analogue of the reparameterization traps in
  [[Sampling Problems with Latent Variables - No Vehicles in the Park]].

## See Also
- [[Prior Distributions]] — soft constraints and the informativity ladder
- [[Constructing Priors for Effect Sizes]] — where the strong priors that create conflict come from
- [[Influence of Likelihood and Prior]] — power-scaling sensitivity diagnostics
- [[Predictive Model Checking and Comparison - Clinical Trial]] — a case study of prior and data-model sensitivity
