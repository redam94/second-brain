---
title: "A Data Model Is Not Just a Likelihood"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5.4, pp. 70-72"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Expressing a Bayesian Model with Probability Distributions]]"
  - "[[Choosing an Initial Model]]"
used_by:
  - "[[Generative and Partially Generative Models]]"
  - "[[Prior Predictive Checking]]"
  - "[[Incremental Development and Testing - Black Cat Adoptions]]"
aliases:
  - "Likelihood vs data model"
  - "Censoring and the likelihood"
  - "Zero-inflated Poisson likelihood"
---

# A Data Model Is Not Just a "Likelihood"

> [!summary]
> The same expression $p(y|\theta)$ serves two different roles — as a distribution over data, and as a
> function of parameters — and conflating them costs you the ability to do workflow. **The likelihood
> is all Bayesian *inference* needs; the data model is what Bayesian *data analysis* needs.** Two
> worked cases show the gap concretely: analytically integrating out censored observations, and coding
> a zero-inflated Poisson, both of which produce a likelihood **from which the original data model
> cannot be recovered.**

## Overview

> [!definition] The distinction (Ch. 5.4, p. 70)
> With data fixed and attention on $p(\theta|y) \propto p(\theta)p(y|\theta)$, the function $p(y|\theta)$
> "is sometimes formulated as a function of $\theta$, the '**likelihood**' of $\theta$ conditional on
> $y$." But "the same mathematical expression $p(y|\theta)$ is also used to denote the **data model**
> conditional on parameters."
>
> "**This duality has led to a sloppy use of the term 'likelihood' to denote both, but this is not
> correct: the function considered as a distribution of the data is different than when used as part
> of a distribution of parameters.**"
>
> **The diagnostic example:** "many discrete-data models (for example, binary or count data) have
> **continuous** likelihoods when considered as functions of the parameters."
^def-likelihood-vs-data-model

> [!important] Where the data model — not the likelihood — is required
> Generative data models are needed for:
> - [[Prior Predictive Checking]] (§5.9)
> - [[Simulation-Based Calibration - Overview|Simulation-based calibration checking]] (Ch. 14)
> - [[Simulating an Underlying Process, Data Collection, and Inference|Experimenting using simulation]] (§6.4)
> - [[Posterior Predictive Checking]] (§8.2)
> - [[Point Estimates and Uncertainties|Making useful model predictions]] (Ch. 7)
>
> "For some of these, we also need to be able to express the posterior distribution and **sample (or,
> in some cases, analytically integrate) over it.**"

## Main Content

### Where the boundary blurs: latent and censored data

"In simple models, the data model is easy to distinguish from the prior. But with **hierarchical and
missing data models there is no sharp division between parameters and data**, as a model can have
latent data that are not observed but are still given a generative model."

> [!example] Partial censoring (Ch. 5.4, pp. 70-71)
> Observations $y_{\text{obs}}$ plus censored observations $y_{\text{cens}}$ known only to exceed a
> threshold $U$:
> $$y_{\text{obs},n} \sim \text{normal}(\mu,\sigma), \quad n = 1,\dots,N$$
> $$y_{\text{cens},m} \sim \text{normal}(\mu,\sigma),\ y_{\text{cens}} > U, \quad m = 1,\dots,M$$
> $$\mu \sim \text{normal}(0,10), \qquad \sigma \sim \text{normal}_+(0,10)$$
>
> Here $y_{\text{cens}}$ gets **the same generative data model** as $y_{\text{obs}}$, and $U$ has no
> model at all.
>
> > **"If we define the model before the data are observed, then it is not possible to say in a model
> > like this where the data model ends and the prior begins. It depends upon which observations are
> > censored, once the data arrive."**
>
> "**Measurement error models also have this property, so this isn't an unusual circumstance.**"

> [!warning] How a computational shortcut destroys the data model
> One *could* sample $y_{\text{cens}}$ with MCMC alongside the parameters. But it is common to
> analytically integrate it out:
> $$\int_U^\infty \text{normal}(y_{\text{cens},m}\mid\mu,\sigma)\, dy_{\text{cens},m} = \Pr(y_{\text{cens},m} > U \mid \mu,\sigma)$$
> giving the posterior
> $$\propto \left(\prod_{n=1}^N \text{normal}(y_{\text{obs},n}\mid\mu,\sigma)\right)\!\left(\prod_{m=1}^M \Pr(y_{\text{cens},m}>U\mid\mu,\sigma)\right)\text{normal}(\mu\mid 0,10)\,\text{normal}(\sigma\mid 0,10)$$
> under $\sigma > 0$.
>
> > **"Knowing the likelihood component $\Pr(y_{\text{cens},m}>U|\mu,\sigma)$ does not tell us what was
> > the original data model for $y_{\text{cens},m}$."**
>
> Different data models integrate to the same likelihood factor. See
> [[Incremental Development and Testing - Black Cat Adoptions]] (Ch. 22) for a case study working
> through several ways of handling censoring in a survival model.

### Where language limitations force you to write the likelihood

> [!example] Zero-inflated Poisson (Ch. 5.4, p. 71)
> **The data model** — each $y_i$ has probability $\lambda$ of being zero, and probability $1-\lambda$
> of coming from a Poisson:
> $$y_i = 0 \quad\text{with probability } \lambda$$
> $$y_i \sim \text{Poisson}(a + bx_i) \quad\text{with probability } 1-\lambda$$
>
> **Stan does not (yet) support mixture modeling using `~`**, so the corresponding likelihood must be
> written directly — **and it looks different from the data model**:
> $$p(y_i \mid a,b,\lambda) = \begin{cases} \lambda + (1-\lambda)\,\text{Poisson}(y_i \mid a+bx_i) & \text{if } y_i = 0 \\ (1-\lambda)\,\text{Poisson}(y_i \mid a+bx_i) & \text{if } y_i > 0 \end{cases}$$
>
> Note the $\lambda + (1-\lambda)\cdot$ structure at $y_i = 0$: the zero could have come from *either*
> component, so both paths contribute.
>
> **The lesson:** "Even if the computation happens to be easier by writing the likelihood directly,
> **it is useful for communication to present the original data model**, and in any case **the data
> model is needed for various predictive checking approaches and making actual predictions.**"
>
> The zero-inflated negative binomial in [[LOO Model Checking and Comparison - Roaches]] (Ch. 24)
> exercises exactly this structure.

### Choosing the data model is a modeling decision too

> [!important] The overlooked half of model specification (Ch. 5.4, p. 71)
> "In treatments of Bayesian statistics, **the data model is often assumed known, and there is much
> discussion of the choice of prior. In real problems, though, the data model needs to be chosen too**:
> the researcher must decide
> - what information to consider as 'data' to be modeled,
> - which predictors to include,
> - how the predictors will be included in the model,
> - and choices of **parameterization and functional form.**
>
> These choices are found also in non-Bayesian modeling, but aspects of them are different, because
> distributions and parameters may have different interpretations in Bayesian models."
>
> This is the same point [[There Is No Safe Haven]] makes about subjectivity, and it is developed
> further in [[Specifying the Data Model and the Prior]]: *"Many writers on statistics strain at the
> gnat of the prior distribution while swallowing the camel of the likelihood."*

### When a wrong data model still works

> [!important] Similar likelihoods, similar posteriors
> "It also often happens that **different data models have very similar likelihoods.** In such a case,
> a model can be **clearly wrong but still give inferences that are not much different** from what
> would be obtained from a better data model.
>
> For example, **even if $y$ is discrete, it is possible that the likelihood from a normal model is not
> much different than a likelihood from a proper discrete-data model**, and then there would not be much
> difference in posterior either."
>
> **The workflow implication:** "This partially explains why **it can be useful to start with a
> faster-to-compute normal model for the first results and later in the workflow check whether using a
> more realistic data model changes the conclusions.**"
>
> Demonstrated concretely in [[Debugging a Model - World Cup Football]] §23.5, where a continuous
> score-differential model is compared against a discrete-data model.

## Connections

- This section is the technical basis for [[Generative and Partially Generative Models]]: the reason a
  model can be "partially generative" is precisely that inference needs only the likelihood.
- The censoring and mixture examples both illustrate the same failure: a valid target function that
  cannot be run **forward**, which disables every checking method in
  [[From Inference to Data Analysis to Workflow|Figure 2.1]]'s "Model structure" and "Correctness of
  computation" branches.
- The "start normal, check later" advice is operationalized as
  [[Fit Fast, Fail Fast]] and [[Fitting Simpler Models for Computational Purposes]].

## See Also
- [[Expressing a Bayesian Model with Probability Distributions]] — how the target is assembled from factors
- [[Prior Predictive Checking]] — the first check that requires the full data model
- [[Missing Data Models]] — where the prior/data-model boundary blurs for another reason
- [[Monsters and Mixtures]] — McElreath's treatment of zero-inflated and mixture models
