---
title: "Specifying the Data Model and the Prior"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5.7, pp. 86-88"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[A Data Model Is Not Just a Likelihood]]"
  - "[[Prior Distributions]]"
  - "[[Relating a Model to Subject-Matter Assumptions]]"
used_by:
  - "[[Modeled and Unmodeled Data]]"
  - "[[Building Up to a Hierarchical Model - Coronavirus Testing]]"
  - "[[Statistical and Scientific Inference]]"
aliases:
  - "Subjectivity of the likelihood"
  - "Gnat of the prior camel of the likelihood"
  - "Two urn problems"
  - "Hypothetical superpopulation"
---

# Specifying the Data Model and the Prior

> [!summary]
> The section's thesis in one line: **"Many writers on statistics strain at the gnat of the prior
> distribution while swallowing the camel of the likelihood."** Two mirror-image urn problems show that
> either component can be the well-founded one, and either can be arbitrary. It closes with a
> genuinely useful reframing: when a model's assumptions are wrong, **you can either say the assumption
> is an approximation, or say your inference applies exactly to a hypothetical superpopulation for which
> it holds.**

## Overview

> [!important] The premise (Ch. 5.7, p. 86)
> "**It's rare that the mathematical assumptions of our models are satisfied. We rarely have true
> probability sampling. We rarely have clean random assignment. And we rarely have direct measurements
> of what we ultimately care about.**"
>
> Worked on one example: "an education experiment will be performed **in schools that permit the study
> to be done, not a random sample of all schools**; the treatment will be **assigned differently in
> different places and can be altered by the teachers on the ground**; and outcome measures such as test
> scores **do not fully capture long-term learning.**"
>
> "A great deal has been written about how to explore and adjust these assumptions. **What is more often
> overlooked are the connections between these assumptions and the assumptions of the prior
> distribution. The subjectivity is linked**, and in multilevel and many other model types, **the
> boundaries between data model and prior blur.**"

## Main Content

### Subjectivity in different parts of the model

> [!important] The gnat and the camel (Ch. 5.7, p. 87)
> "**Many writers on statistics strain at the gnat of the prior distribution while swallowing the camel
> of the likelihood. All those link functions, independence assumptions, and models with constant
> parameters: where did they all come from, exactly? Setting a prior distribution for logistic
> regression is no more 'subjective' than deciding to run a logistic regression in the first place.**"
>
> **The proposed replacement vocabulary** (Gelman and Hennig 2017) — rather than arguing about
> objectivity and subjectivity, speak of specific virtues:
> - transparency
> - consensus
> - impartiality
> - correspondence to observable reality
> - awareness of multiple perspectives
> - awareness of context dependence
> - investigation of stability
>
> "**Focusing on what we want to achieve and how we should communicate is better than using vague
> epistemic terminology.**"

### The two urn problems

> [!example] Urn problem 1 — known likelihood, arbitrary prior (Ch. 5.7, p. 87)
> "Suppose you have an urn with $1000\theta$ black balls and $1000(1-\theta)$ white balls. You **sample
> 10 balls with replacement** and find that $y$ are black, and you want to estimate $\theta$."
>
> **The binomial likelihood is known exactly:**
> $$p(y|\theta) \propto \theta^y (1-\theta)^{10-y}$$
>
> "But **without further background there is no uniquely correct way to specify a prior distribution
> $p(\theta)$.** We could assume $\theta \sim \text{uniform}(0,1)$ as some sort of default choice, but
> **that's all it is: a choice, corresponding to one model among many possibilities.**"
>
> This is the situation textbooks present.

> [!example] Urn problem 2 — known prior, arbitrary likelihood (Ch. 5.7, p. 87)
> "**A random number $\theta$ is drawn from the $\text{uniform}(0,1)$ distribution** and then an urn is
> filled with $1000\theta$ black balls and $1000(1-\theta)$ white balls (rounding to the nearest
> integer). You then take 10 balls with replacement from the urn."
>
> "In this case, **the prior distribution for $\theta$ is known exactly, but the likelihood is
> unspecified.** We could assume the binomial model as some sort of default choice, corresponding to the
> setting in which the balls are fully mixed and sampled at random each time, **but there are many other
> possibilities. How well were the balls mixed? One possible sampling mechanism is that the same ball is
> drawn 10 times in a row.**"
>
> > "Probability and statistics textbooks typically present versions of the first scenario … **but one
> > could just as well consider the second scenario.**" (See Ch. 6 of Jaynes 2003 for more on urns.)

### Real problems have uncertainty in both

> [!warning] Sampling
> "**Surveys of people are not draws from urns.** They are not simple random samples: the probability of
> being reached and of responding varies from person to person. Indeed, **even a model in which each
> person $i$ has a probability $p_i$ of inclusion is only an approximation, because this probability
> will vary over time.**"
>
> "At the same time, **the underlying parameter being estimated** (for example, the proportion of people
> who have shopped at a certain store in the past month) **could be well specified based on prior
> measurements from some other source.**" It is common in market research to use a **triangulation**
> approach — estimating a quantity from several data sources, each with a poorly specified connection to
> the underlying parameter.

> [!warning] Causal inference
> "In a randomized experiment … in the cleanest setting the distribution of the data given $\theta$ and
> various other parameters is essentially known. **In the real world, there can be selection into the
> treatment and control groups, spillover between units, and treatment effects that vary over time.**
>
> Even in the cleanest medical experiment or marketing study, **the people in the study will typically
> not be anything like a random or representative sample from the population to which the intervention
> would be applied**, and inference will depend crucially on **interactions and variation in the
> treatment effect** (Gelman 2015). **In the usual way that such interactions are specified in a model,
> they enter in both the likelihood and prior.**"
>
> See [[Causal Inference as Generalization]] and [[Poststratification]].

> [!warning] Latent-data models
> "The subjective aspects of the likelihood become **even more of an issue with latent-data models.** For
> example, **in toxicology we may be interested in estimating the concentration of a compound within
> internal organs, but data are only recorded on concentrations in blood and exhaled air. In
> psychometrics, test scores are indirect and imperfect measurements of underlying abilities.**"

> [!definition] When is each component well specified? (Ch. 5.7, p. 88)
> - **The data model and likelihood are well specified** in settings with **direct measurements with
>   well-understood patterns of error, random sampling, and effects that do not vary over time or based
>   on background conditions.**
> - **The prior is well specified** in problems where **similar quantities have been estimated before.**
>
> "Whatever model we use for real problems — not ideal urns — will involve assumptions, and **one reason
> we care about multiple models in workflow is to understand the impact of each assumption on our
> inferences.**"
^def-when-well-specified

### The hypothetical-superpopulation reframing

> [!important] Two equivalent ways to state the same limitation (Ch. 5.7, p. 88)
> **Case 1 — a wrong likelihood.** "If we are analyzing a real-world survey with **undercoverage and
> nonresponse**, but we use a simple i.i.d. likelihood function, we can say
> - *either* we are **assuming independent random sampling**,
> - *or* **our inference applies, not to the larger population of interest, but to the hypothetical
>   population of which the observed data could be considered a random sample.**"
>
> **Case 2 — an assumed prior.** "If we assign a prior for a new study using a meta-analysis performed on
> the Cochrane database, we can say
> - *either* our analysis **assumes the true effect size was drawn from this prior distribution**,
> - *or* **our inference is calibrated when averaging over a hypothetical population having the
>   distribution of those Cochrane studies.**"
>
> The reframing is not a rhetorical trick: it converts an unverifiable assumption into a **statement
> about scope of validity**, which is exactly what a reader needs in order to judge whether the result
> transfers to their setting. It is the same move as the "prior as reference set" framing in
> [[Why Bayes - Benefits, Costs, and Borders]] and [[Constructing Priors for Effect Sizes]].

### Multilevel modeling and the boundary between prior and likelihood

> [!example] The 8 schools model, re-partitioned (Ch. 5.7, p. 88)
> The posterior is
> $$p(\theta,\mu,\tau \mid y) \propto \prod_{j=1}^J \text{normal}(\theta_j \mid \mu,\tau)\,\text{normal}(y_j \mid \theta_j, \sigma_j)$$
> with parameters $\theta_1,\dots,\theta_J,\mu,\tau$, modeled data $y$, and unmodeled data $J,\sigma$.
>
> **The prior $p(\theta,\mu,\tau)$ is *partially* generative: $p(\theta|\mu,\tau)$ is generative but
> $p(\mu,\tau)$ is not** (it is uniform and improper).
>
> "One could think of $p(\theta|\mu,\tau)$ as being **part of the likelihood** if we are willing to label
> the school effects $\theta_j$ as '**missing data**' rather than '**parameters**.'"
>
> See [[Relating a Model to Subject-Matter Assumptions]] for the full model.

> [!example] Coronavirus testing: calibration data *as* prior (Ch. 5.7, p. 88)
> The Ch. 19 model includes parameters for **sensitivity** (false-negative rate) and **specificity**
> (false-positive rate) of a test. "These two parameters are given a **weak** prior, which is fine
> because the dataset includes **a set of calibration experiments that provide direct information** on
> those two probabilities."
>
> **The reframing.** Partition $y = (y_1, y_2)$ with $y_1$ the calibration data and $y_2$ the new sample.
> Then
> $$p(\theta \mid y) \propto \underbrace{p(\theta)\,p(y_1 \mid \theta)}_{\text{the "prior"}} \; p(y_2 \mid \theta)$$
> "**taking advantage of the independence of $y_1$ and $y_2$ conditional on the model parameters.**"
>
> **Why bother:** "**we can think of this new 'prior,' $p(\theta)p(y_1|\theta)$, as approximating a
> generative or population distribution in a way that the original $p(\theta)$ could not.**"
>
> Note the resonance with [[Expressing a Bayesian Model with Probability Distributions#The doubled-prior surprise]]:
> because the target is a sum of log terms, *which terms you call "prior" is a labeling choice, not a
> mathematical one.* Full treatment in
> [[Building Up to a Hierarchical Model - Coronavirus Testing]].

## Connections

- The gnat/camel argument is the prior-side complement to
  [[A Data Model Is Not Just a Likelihood#Choosing the data model is a modeling decision too]].
- The two urn problems formalize what [[There Is No Safe Haven]] argues informally: neither component
  has a privileged claim to objectivity.
- The superpopulation reframing is the precise sense in which
  [[Causal Inference as Generalization]] treats all inference as prediction under a specified population.

## See Also
- [[Modeled and Unmodeled Data]] — the five-way variable taxonomy that follows from this blurring
- [[Prior Distributions]] — how to choose the prior once you accept it is not the only subjective part
- [[Relating a Model to Subject-Matter Assumptions]] — assumption-by-assumption auditing in practice
- [[Statistical and Scientific Inference]] — where these scope-of-validity statements get cashed out
