---
title: "Prior Distributions"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5.6, pp. 75-79 and 85-86"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Generative and Partially Generative Models]]"
  - "[[There Is No Safe Haven]]"
  - "[[Choosing an Initial Model]]"
used_by:
  - "[[Constructing Priors for Effect Sizes]]"
  - "[[Joint Priors and Covariance Matrices]]"
  - "[[Prior Predictive Checking]]"
  - "[[Influence of Likelihood and Prior]]"
  - "[[Prior Specification for Regression Models - Sleep Study]]"
aliases:
  - "Weakly informative priors"
  - "Noninformative priors"
  - "Five levels of informativity"
  - "Zero-avoiding prior"
---

# Prior Distributions

> [!summary]
> The longest section in the book (11 pages), and the authors say so — but its headline advice is
> **"don't overthink it": "when analyzing $n$ data points, the prior comes in once and the likelihood
> enters the posterior $n$ times."** The core content is a **five-level scale of informativity**, the
> demonstration that a flat prior can be extremely strong (the $y=0$ binomial example), and a set of
> general principles of which the sharpest is: **prefer soft constraints to hard ones, even when the
> hard constraint is theoretically correct**, because soft constraints let model misspecification show
> itself.

## Overview

### Three benefits of an explicit prior

1. **Transparent inclusion of scientific information about unknowns.** "This can help by preventing
   impossible estimates and speeding convergence to useful ones. For example, if a parameter must be
   positive, it can help to provide this constraint in the prior family."
2. **Flexible and transparent regularization.** "Non-Bayesian approaches often demand regularization as
   well, so **the use of a prior model for regularization is not extra labor** and easily explainable in
   terms of broader scientific goals." Regularization pools all the way to zero or partially
   (shrinkage); in a Bayesian model this corresponds to a prior in which true parameters are small.
   "From a non-Bayesian perspective, shrinkage yields more stable estimates and less variable
   predictions and thus can be justified as **a method for reducing expected out-of-sample prediction
   error.**"
3. **Data models sometimes become priors.** "When data are missing or partially missing, then **a data
   model operates logically like a prior distribution for unobserved data.**" So the ability to reason
   about priors is necessary for understanding the data model too.

> [!important] Elicit on the predictive scale, not the parameter scale
> "When working with problems where subject-matter information is crucial, **prior elicitation can be
> used to transform subject-matter information to distributions, and it can make sense to do this on
> the scale of predictive quantities** — that is, to translate a prior on parameters $\theta$ to a
> prior on predicted values in a hypothetical experiment" (O'Hagan et al. 2006; Mikkola et al. 2024).
>
> This is the technique used throughout the book — see
> [[Bioassay - A First Probabilistic Program]] and
> [[Multiple-Choice Exam - A Full Workflow Walkthrough]] — and the machinery for it is
> [[Prior Predictive Checking]].

### Don't overthink it

> [!important] The prior is usually not the most important part of the model (Ch. 5.6, p. 76)
> "**One way to see this is that, when analyzing $n$ data points, the prior comes in once and the
> likelihood enters the posterior $n$ times.** There are examples where the prior is stronger than the
> data, for example the study of sex ratios in [[There Is No Safe Haven|Section 1.3]], but usually in
> statistics we are interested in problems where **the prior is more of a starting point or a
> constraint rather than the main source of information.**"
>
> The recommended sequencing: "**starting with a simple data model and weak priors** for the
> parameters, and then adding model complexity (nonlinearity, additional predictors, interactions,
> latent variables) **and additional prior information** (hierarchical structures, correlations)."
>
> "For all but the simplest problems, we recommend **experimenting with multiple models, not to fish for
> 'statistical significance' but to understand what can be learned from the data. This should take some
> pressure off when choosing a data model and prior to start the process.** The detailed advice in this
> chapter … **is not implemented all at once, but rather recursively and in light of experiments.**"

## Main Content

### Noninformative priors, and why "flat" is not "weak"

> [!definition] Improper priors (Ch. 5.6, p. 76)
> "A prior distribution is a mathematical model and, as such, **cannot truly be 'noninformative': it
> encodes assumptions.**"
>
> A density $p(\theta)$ is **improper** if it does not correspond to a generative model — for
> continuous parameters, if it does not integrate to 1. On an unbounded space a uniform prior is
> improper: "**it cannot be sampled from, so there is no way to perform prior predictive checks or
> simulation-based calibration checking.** If the parameters are identified by the likelihood, an
> improper prior can still yield a proper posterior, and so the model can be fit to the data, **but its
> performance averaging over the prior cannot be evaluated.**"
>
> In Stan, a uniform prior is the *default*: each `~` or `target +=` statement adds a term to the log
> posterior, "so a **lack** of a term for any particular parameter corresponds implicitly to a uniform
> prior."
^def-improper-prior

> [!warning] The strength of a flat prior depends on the likelihood
> "If the likelihood identifies the parameters well, then the use of a flat prior can be considered as
> a choice to not try to incorporate any additional information. **But if the likelihood admits a wide
> range of parameter values, then the flat prior can actually be very strong. By weighting parameter
> space uniformly, the resulting inference can include extreme values of the parameters.**"
>
> Seen already in [[Multiple-Choice Exam - A Full Workflow Walkthrough#Break #2]] (Figure 4.16).

> [!example] The binomial $y=0$ example — how reparameterization changes everything (Ch. 5.6, pp. 77)
> **Setup:** $y \sim \text{binomial}(n,\theta)$ with $n = 100$ and a uniform prior on $\theta$. The
> posterior is analytic: $\theta|y \sim \text{beta}(y+1,\, n-y+1)$.
>
> | Data | Posterior | Mean | SD | 90% interval | Verdict |
> |---|---|---|---|---|---|
> | $y = 3$ | $\text{beta}(4, 98)$ | 0.04 | 0.02 | $(0.014, 0.075)$ | fine |
> | $y = 0$ | $\text{beta}(1, 101)$ | 0.01 | 0.01 | $(0.001, 0.029)$ | **also fine** — "with 0 successes out of 100 tries, the likelihood pretty much constrains the success probability to be less than 3%" |
>
> **Now reparameterize.** Work with $\phi = \text{logit}(\theta)$ — "a reasonable modeling choice — it
> transforms from the unit interval to the real line, and in this simple case corresponds to a logistic
> regression that includes only a constant term." Put a **uniform prior on $\phi$**. This is improper.
>
> ```stan
> data { int y, n; }
> parameters { real phi; }
> model { y ~ binomial_logit(n, phi); }
> generated quantities { real theta = inv_logit(phi); }
> ```
>
> | Data | Result |
> |---|---|
> | $y = 3$ | posterior mean 0.03, sd 0.017, 90% interval $(0.008, 0.061)$ — "not identical … but the results are **close**, indicating that the choice among these priors is not very important" |
> | $y = 0$ | **the posterior is improper, and Stan does not converge** |
>
> **The mechanism:** "when no successes are observed, the likelihood is consistent with values of
> $\theta$ arbitrarily close to 0, and thus values of $\phi$ arbitrarily low. **When combined with this
> likelihood, the flat prior is very strong in that it includes equal density at arbitrarily negative
> values of $\phi$.**"
>
> **And a proper prior does not save you.** "Indeed, a proper but very broad prior such as
> $\phi \sim \text{normal}(0,100)$ would create similar problems, because so much of its prior mass is
> at extremely low values of $\phi$: the resulting posterior is proper but is **strongly influenced by
> the prior — the 90% posterior interval is $(-193, -72)$ for $\phi$, which maps to a ridiculous
> $(10^{-85}, 10^{-32})$ interval for $\theta$.**"
>
> **The conclusion:** "When data are weak, the choice of prior distribution is important, and this
> represents **an unavoidable difficulty** that, with $y=0$ in this model, the likelihood cannot
> distinguish between various values of $\theta$ near zero, so the inference necessarily depends
> strongly on the prior."
>
> See [[Failure Modes and Steps Forward]] (§12.3) for how the convergence diagnostics behave with an
> improper posterior, and [[Models for Regression Coefficients - Student Grades]] (Ch. 28) for how
> seemingly noninformative priors on regression coefficients become **strongly informative for explained
> variance** as the number of predictors grows.

### The five levels of informativity

> [!definition] A scale of prior informativity (Ch. 5.6, p. 78)
> For a coefficient **on the unit scale** (a change of one unit in the associated variable means a
> change of one standard deviation):
>
> | Level | Example | Character |
> |---|---|---|
> | **1. Flat** | $\text{uniform}(-\infty,\infty)$ | "tries to have no influence on inference, but is **improper and can create problems when data are weak**. A flat prior on some parameters can imply a **strongly informative prior on other quantities**" |
> | **2. Super-vague but proper** | $\text{normal}(0, 10^6)$ | "**not usually recommended.** Although technically proper, the behavior is likely to be similar to a flat improper prior" |
> | **3. Weakly informative** | $\text{normal}(0, 10)$ | "**rules out unrealistic regions of parameter space**" |
> | **4. Weakly informative + regularizing** | $\text{normal}(0, 1)$ | rules out unrealistic regions **and** "induces some **mild regularization** so that large effects are downweighted" |
> | **5. Specific informative** | $\text{normal}(0.4, 0.2)$ | "**must be based upon background information.** Sometimes expressed as a scaling followed by a generic prior: $\theta = 0.4 + 0.2z;\ z \sim \text{normal}(0,1)$" |
>
> **The unit-scale assumption matters.** These numbers assume parameters are roughly on unit scale, "as
> is often done in **education research** (where test scores are standardized so that 0 is the average
> in a defined population and 1 is the sd) or **medicine** (where 0 is zero dose and 1 is a standard
> dose such as 10 mcg/day of cyanocobalamin or 1000 IU/day cholecalciferol)."
^def-informativity-ladder

> [!warning] "Weakly informative" is a property of the question, not just the prior
> "A prior is 'weakly informative' when, **if there's a reasonably large amount of data, the likelihood
> will dominate.** If the data model provides only weak information, though, **this 'weakly informative
> prior' will strongly influence the posterior.** The phrase 'weakly informative' is implicitly **in
> comparison to a default flat prior on the specific parameters.**"
>
> **The concrete illustration:** "it is common to expect realistic effect sizes to be of order of
> magnitude **0.1** on a standardized scale (for example, an educational innovation that might improve
> test scores by 0.1 sd). In that case, a prior of $\text{normal}(0,1)$ could be considered **only
> weakly informative, or in another sense very informative, in a bad way, in that it puts most of its
> mass on parameter values that are unrealistically large in absolute value.**"
>
> > **"If we consider a prior to be 'weak' or 'strong,' this is a property not just of the prior but
> > also of the question being asked."**
>
> "One reason to emphasize workflow is that **these judgments about how informative a prior is can be
> transparently assessed through simulation-aided model design.**" — [[Prior Predictive Checking]].

**Where flat and vague priors are legitimate.** "Flat and super-vague priors can be **convenient
starting points** in the workflow. If the data are highly informative, we save time not overthinking
priors. However, inferences and computation tend to be **more stable with priors that are at least
weakly informative.**"

If there's no direct prior information on the parameter scale, "it is common to have some information
on the scale for the order of magnitude of the **outcomes**, which can be used to make weakly
informative priors" (Gabry, Simpson, et al. 2019; Hartmann et al. 2020).

### General principles

> [!important] What the authors reject: invariance and maximum entropy
> "There is some literature on priors based on **invariance principles**, such as Jeffreys (1946), or
> **variational principles** such as maximizing entropy (Jaynes 1983). For reasons discussed in Section
> 2.8 of BDA3, **we have not found these ideas to be useful for choosing models for new applications**,
> although such mathematical principles **can be helpful in understanding existing procedures and
> models** that have been used in the literature." (Frank 2009 surveys the maximum-entropy/generative
> connections.)

> [!important] Conjugacy is obsolete, but geometry-aware priors are not
> "Traditionally, conjugacy was important for computational reasons. **In Stan, as well as other modern
> probabilistic programming languages, there is not usually any computational reason to use conjugate
> priors.**
>
> There can, however, be a **computational benefit to priors that downweight or exclude areas with
> difficult geometry.** For example, in a hierarchical model, a **lognormal prior for the group-level
> variance parameter effectively rules out a region near zero** and also rules out very high values.
> **This sort of zero-avoiding prior can alleviate some of the difficult funnel behavior that arises
> when the number of groups is small and the group-level variance is not well estimated from data.**"
>
> The funnel itself is diagnosed in [[Failure Modes and Steps Forward]] and treated in
> [[Modeling Ideas to Address Computing Problems]].

> [!definition] Why weakly informative rather than fully informative (Ch. 5.6, p. 85)
> "**Fully informative priors** correspond to the true population distribution of parameters or the
> current expert state of knowledge. This is not always achievable. **But even when it is, there are
> good reasons to avoid fully informative.**
>
> **The reason: the loss in precision by making the prior a bit too weak is less serious than the gain
> in robustness by including parts of parameter space that might be relevant.**
>
> A weakly informative prior should contain enough information to regularize: **the prior rules out
> unreasonable parameter values but is not so strong as to rule out values that might make sense.**
> 'It's been hard for us to formalize this idea, but we still believe it makes sense in a wide variety
> of applied modeling problems.'"
^def-why-weakly-informative

> [!warning] Soft constraints beat hard constraints — three worked cases
> "We don't usually recommend uniform priors, or **hard constraints more generally, unless the bounds
> represent mathematical constraints** (such as scale parameters restricted to be positive, or
> correlations restricted to $[-1,1]$). **Flat priors and hard constraints can be too informative, even
> when they are theoretically correct.**"
>
> **1. An elasticity parameter believed to lie in $[0,1]$.** (Input: level of taxation on a product;
> output: its price; the extremes correspond to none or all of the tax being transferred to the
> consumer.) It seems natural to set $\text{uniform}(0,1)$ — **use $\text{normal}(0.5, 0.5)$ instead.**
> "This puts in a soft constraint but allows the estimate to be outside of the range. **Even if an
> outside-the-range parameter value does not make sense, it could be necessary in the fit: real data
> have peculiarities, and if the fit requires an elasticity of 1.3, then it would be better to add a
> bias term to the model rather than to put a hard restriction that would artificially constrain the
> parameter.**"
>
> **2. A vague prior for a scale parameter.** $\text{uniform}(0,100)$: "the lower bound is no problem
> because it is a mathematical constraint, **but the hard upper bound can create computational problems
> if the parameter is weakly identified by the data.**" Use instead an exponential with expected value
> 10 — i.e. `exponential(0.1)` — or $\text{normal}_+(0,10)$ (implemented in Stan as `normal(0, 10)`
> with a `<lower=0>` constraint in the parameter declaration).
>
> **3. A growth-model slope that "must" be positive.** "A fully informative prior would enforce this
> positive constraint. But **various data processing errors, or mistakes in coding other parts of the
> model, might result in a negative average slope. When this happens, it is like a warning that the
> model is wrong. The fully informative prior might just look like the slope is close to zero,
> preventing us from noticing some mistake in either the data or code or both.**"
>
> This is the same argument that kept the discrimination prior symmetric in
> [[Multiple-Choice Exam - A Full Workflow Walkthrough]] — and it caught three miscoded answers there.
^wrn-soft-constraints

### Documenting an informative prior

"But informative priors are sometimes useful or necessary. **When using informative priors, be explicit
about every choice; write a sentence about each parameter in the model.**"

> [!example] When weak identification demanded a stronger prior (Gelman and Hennig 2017, drug development)
> > "In this case, the issue did not seem to be a lack of fit, or a missing interaction, or unmodeled
> > measurement error … Rather, **the fit appeared to be insufficiently constrained, with the Bayesian
> > fitting algorithm being stuck going through remote regions of parameter space that corresponded to
> > implausible or unphysical parameter values.**
> >
> > In short, the model as written was only **weakly identified** … Our iterative Bayesian computation
> > had poor convergence … and the simulations were going through zones of parameter space that were
> > not consistent with the scientific understanding of our pharmacology colleagues.
> >
> > **To put it another way, our research team had access to prior information that had not been
> > included in the model. So we took the time to specify a more informative prior.**"
>
> **The documentation the authors then wrote** — a model for the kind of note that should accompany any
> informative prior:
> - **$\gamma_1$:** mean of population distribution of $\log(\text{BVA}^{\text{latent}}_j/50)$, centered
>   at 0 because the mean of BVA values in the population should be near 50. Prior sd **0.2**, close to
>   $\log(60/50) = 0.18$, "to indicate that we're pretty sure the mean is between 40 and 60."
> - **$\gamma_2$:** mean of population distribution of $\log(k^{\text{in}}_j/k^{\text{out}}_j)$, centered
>   at **3.7** because we started with $-2.1$ for $k^{\text{in}}$ and $-5.9$ for $k^{\text{out}}$,
>   specified from the disease literature. Sd **0.5** "to represent a certain amount of ignorance: our
>   prior guess for the population mean … could easily be off by a factor of $\exp(0.5) = 1.6$."
> - **$\gamma_3$:** mean of population distribution of $\log(k^{\text{out}}_j)$, centered at $-5.8$ with
>   sd **0.8**, "which is the prior that we were given before, from the time scale of the natural
>   disease progression."
> - **$\gamma_4$:** $\log(E_{\max}^0)$, centered at 0 with sd **2.0** "because that's what we were given
>   earlier."
>
> Note that every single number is traced to either an observable-scale statement or an external source.

## Connections

- The informativity ladder presumes the scale transformations of
  [[Generative and Partially Generative Models#Scale transformations]] have already been applied.
- "Soft constraints reveal misspecification" is the prior-side statement of the
  [[Four Modeling Scenarios|scenario-4 detection]] problem.
- The $y=0$ binomial example is the simplest instance of what [[Influence of Likelihood and Prior]]
  measures systematically with power-scaling sensitivity.
- Prior choice in a real regression setting is worked through in
  [[Prior Specification for Regression Models - Sleep Study]] (Ch. 17).

## See Also
- [[Constructing Priors for Effect Sizes]] — zero-centering, historical priors, and meta-analytic priors
- [[Joint Priors and Covariance Matrices]] — independence, data-dependent priors, LKJ
- [[Prior Predictive Checking]] — how to see what a prior actually implies
- [[Tail Behavior and Prior-Likelihood Conflict]] — what happens when prior and data disagree
- [[Global-Local Shrinkage Priors]] — the regularizing priors this section gestures at
- [[Designing Simulated-Data Experiments]] — fake-data simulation is how a candidate prior's implications are examined
