---
title: "Choosing an Initial Model"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5 intro and 5.1, pp. 63-66 (Figure 5.1)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[From Inference to Data Analysis to Workflow]]"
  - "[[Four Modeling Scenarios]]"
used_by:
  - "[[Relating a Model to Subject-Matter Assumptions]]"
  - "[[Prior Distributions]]"
  - "[[Topology of Models]]"
aliases:
  - "Model components as placeholders"
  - "Modular model building"
  - "True model myth"
---

# Choosing an Initial Model

> [!summary]
> Where to begin. Two ideas carry the section: **model components are placeholders** to be replaced
> as needed (normal → long-tailed; linear → spline; exact → measurement-error), which "takes some of
> the pressure off the model-building process"; and the honest starting point for almost any real
> problem is **an existing model from a textbook, case study, or paper** — a statistical analogue of
> a software design pattern.

## Overview

> [!important] The "true model myth"
> Carlin and Moreno-Betancur (2025) criticize "the 'true model myth': **that the task of the
> statistician/data analyst is to build a model that closely approximates the true data generating
> process.**"
>
> The authors agree: "For any applied problem, the data generating process is a **means to some larger
> end**, which might involve some combination of data exploration, prediction, decision making, and
> scientific understanding. With that in mind, we are trying in this book to provide guidance for
> developing generative models **for applied goals**."
>
> This is the practical face of the M-open stance in [[Varieties of Bayesian Theory]].

### The vocabulary of a Bayesian model

> [!definition] Data model, prior, and their aliases (Ch. 5 intro, p. 63)
> The two components are the **data model** $p(y|\theta)$ and the **prior** $p(\theta)$; together they
> allow a generative process and posterior inference $p(\theta|y)$.
>
> **The data model** is also called the *sampling distribution*, the *observation distribution*, or the
> *residual distribution* — corresponding to three different data structures: sampling from a
> population, noisy measurement of a latent process, and residuals from an additive model. The book
> uses "**data model**" as the general term covering all three.
>
> $p(y|\theta)$ *considered as a function of $\theta$* is the **likelihood** — "but it is not correct
> to use these terms as synonyms." **The likelihood is the only part of the data model needed for
> Bayesian inference, but it is not sufficient to specify a generative model for $y$.** See
> [[A Data Model Is Not Just a Likelihood]].
>
> **The prior** is also called the *population distribution* (generating $\theta$ is sampling from a
> hypothetical infinite population with density $p(\theta)$), or the *external distribution* (it
> represents information external to the data). "**Despite its name, the prior distribution does not
> need to be specified based on information that came before the data were observed**, but it is
> 'prior' in the sense that $\theta$ is drawn before $y$ in the generative process."
^def-data-model-prior

> [!important] Where the prior/data-model boundary dissolves
> "The simple division into prior and data models becomes muddied in models with **missing data,
> latent variables, and multilevel structure. When there is confusion, we recommend thinking about the
> full generative model.**"
>
> Worked on the item-response model of [[Multiple-Choice Exam - A Full Workflow Walkthrough]]:
> Eq. (4.9) supplies a distribution for $y$ given $\alpha, \beta, \gamma$; Eq. (4.10) defines those
> vectors' distributions given hyperparameters; Eq. (4.11) specifies the hyperparameters. Data can be
> generated in reverse order. "The vectors $\alpha, \beta, \gamma$ can be considered as **parameters**,
> in which case (4.10) are part of the joint prior distribution, or they can be considered as **latent
> data**, in which case (4.10) are part of the data model — **but for the purpose of Bayesian inference
> and generative modeling, there is no difference.**"
>
> See [[Specifying the Data Model and the Prior]] for the extended argument.

**Expanding the generative process.** If you simulate $\theta \sim p(\theta)$ then $y \sim p(y|x,\theta)$,
this implicitly corresponds to alternative scenarios *with the predictors $x$ unchanged*. To simulate
new $x$ you need a generative model $p(x)$, which can itself have parameters, giving the full model

$$p(y|x,\theta)\, p(\theta)\, p(x|\phi)\, p(\phi)$$

(assuming distinct parameters for $y|x$ and $x$ — an assumption that could also be relaxed).

> [!important] Every statistical model is expandable
> "This can be seen by thinking of probabilistic programming languages, which, **as with natural
> languages, allow for expressions of potentially unlimited length** — and we can understand such
> models by generating from their joint distributions."

## Main Content

### Components as placeholders

> [!definition] The placeholder principle (Ch. 5 intro, p. 64)
> "A Bayesian model is built from components that can often be viewed as **placeholders to be replaced
> as necessary.**"
>
> | Placeholder | Replacement |
> |---|---|
> | normal data model | longer-tailed or mixture distribution |
> | linear latent regression function | nonlinear splines or Gaussian processes |
> | observations treated as exact | measurement-error model |
> | weak prior | stronger prior, once the posterior includes unrealistic values |
>
> **"Thinking of components as placeholders takes some of the pressure off the model-building process,
> because you can always go back and generalize or add information as necessary."**
^def-placeholders

**Why modules rather than whole models.** Considering modules "makes it easier to see connections
between seemingly different models and adapt them to the specific requirements of a given analysis
project. It also gives us **a reliable path for engineering complex models and understanding the
relationships among models along that path.**"

### Where to begin: templates and design patterns

> [!important] The theoretical objection, and why it does not forbid using context
> "Under the theoretical framework of Bayesian inference, all aspects of the model are assumed to have
> been chosen **before any data have been collected.** … If the model itself depends on the data,
> **there is no place to start, and thus there is no joint distribution $p(\theta,y)$.**"
>
> "However **none of this implies that we cannot use information about the constraints on the
> measurements or their scientific relationships.**"

> [!definition] The template/design-pattern approach (Ch. 5.1, p. 64)
> "Unless you are working on an entirely new problem, **the starting point is to adapt what has been
> done before**, using a model from a textbook or case study or published paper that has been applied
> to a similar problem (a strongly related concept in software engineering is **software design
> pattern**)."
>
> **Three benefits:**
> 1. A shortcut to effective data analysis.
> 2. "By looking at the results from the model template we know **in which direction of the model space
>    there are likely to be useful elaborations or simplifications.**"
> 3. Templates save time in model building and computing — **and reduce the cognitive load for the
>    person who needs to understand the results.**
>
> "Shortcuts are important for humans as well as computers, and **shortcuts help explain why the
> typical workflow is iterative.**"

> [!important] In defense of the cookbook
> "Despite the negative connotations of 'cookbook analysis,' we think **templates can be useful as
> starting points and comparison points to more elaborate analyses.**" And a reflexive argument: "if we
> were to try to program a computer to perform data analysis automatically, it would have to work
> through some algorithm to construct models, and **the building blocks of such an algorithm would
> represent templates of a sort.**"
>
> The caveat: "we should recognize that **theories are not static, and the process of development of
> scientific theories is not the same as that of statistical models** (Navarro 2021)."

**Three directions of travel.** Sometimes workflow "starts with a simple model with the aim to add
features later (modeling varying parameters, including measurement errors, correlations, and so
forth)." Other times we "start with a big model and aim to **strip it down**, trying to find something
that is simple and understandable that still captures key features of the data." And "sometimes we even
consider **multiple completely different approaches** to modeling the same data and thus have multiple
starting points to choose from."

## Examples

> [!example] Kilpisjärvi summer temperature (Ch. 5.1, pp. 65-66, Fig. 5.1)
> **Data.** Average summer temperature 1952-2013 at Kilpisjärvi in northwestern Finnish Lapland
> (approximately 69°03'N, 20°50'E) — 62 annual values ranging roughly 7-11°C.
>
> **The starting model:** linear regression
> $$y_i \sim \text{normal}(\mu_i, \sigma), \qquad \mu_i = \alpha + \beta x_i \tag{5.1, 5.2}$$
> where $y_i$ is the summer temperature in one year, $x_i$ the year, $\alpha$ the intercept, $\beta$
> the slope, and $\sigma$ the scale of unexplained variation.
>
> **Three reasons to begin with a linear trend, even knowing it is wrong:**
> 1. **It is often a good approximation.** "An indefinite linear trend is clearly inappropriate to
>    model long-term changes in temperature, over centuries perhaps, but **it could be a reasonable
>    approximation for the 62 years in our data.**"
> 2. **We need it for comparison anyway.** "Any nonlinear trend will usually be compared to a linear
>    one. So we need it anyway."
> 3. **It is a foundation for building complex models.** "It is usually easier to build and debug the
>    simple linear trend first."
>
> **Why the normal data model is defensible here.** $y_i$ is the average over the three summer months.
> "Averages are sums, and sums tend toward normal distributions. Even so, **normality is not
> guaranteed, because there may not be enough elements in the sum.**" Start with it anyway — "both
> because it is plausible and because it is easy to build. **Even if the residuals are not very
> Gaussian, the model can still be useful.**"
>
> **A reframing worth noting:** "Based on the view that **the Gaussian model is a prior for the
> residuals**, we can learn about both the data and the model from the posterior residuals."
>
> This model is expanded in [[Prior Predictive Checking]] (Fig. 5.7) with informative priors on the
> trend.

> [!important] The three reasons in tension
> "The reasons for an initial model may include **theoretical considerations, ease of construction, and
> convention. These reasons may be in conflict with one another.** In that case an initial model that
> is easy to build and debug, and **allows expansion in the direction of theoretical and empirical
> goals**, will often make the most sense."
>
> And the disclaimer that defines the chapter: "That workflow usually begins with **simple models that
> do not end up delivering inferences directly. But they do help us to reliably engineer and understand
> more satisfactory models.**"

## Connections

- The placeholder principle is what makes [[Topology of Models]] navigable: each replaceable component
  is a dimension of the model space.
- Starting from a template is the concrete answer to the "where do we begin?" arrow at the top of
  [[From Inference to Data Analysis to Workflow|Figure 2.1]].
- The dissolution of the prior/data-model boundary is developed in
  [[Specifying the Data Model and the Prior]] and [[Modeled and Unmodeled Data]].

## See Also
- [[Relating a Model to Subject-Matter Assumptions]] — auditing each assumption of a chosen model
- [[Generative and Partially Generative Models]] — the ladder from data summary to fully generative
- [[Model Expansion - Predictive Consistency and Coherence]] — where the placeholders get replaced
- [[Choosing and Building Models]] — the 2020 paper's shorter treatment of the same material
