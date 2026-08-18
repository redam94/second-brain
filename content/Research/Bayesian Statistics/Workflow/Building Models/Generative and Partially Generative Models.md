---
title: "Generative and Partially Generative Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5.5, pp. 72-75"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[A Data Model Is Not Just a Likelihood]]"
  - "[[Why Bayes - Benefits, Costs, and Borders]]"
used_by:
  - "[[Prior Predictive Checking]]"
  - "[[Modeled and Unmodeled Data]]"
  - "[[Causal Inference as Generalization]]"
  - "[[Statistical and Scientific Inference]]"
aliases:
  - "Ladder of generativity"
  - "Partially generative models"
  - "Binomial vs negative binomial likelihood"
  - "Piranha of generative equivalence"
---

# Generative and Partially Generative Models

> [!summary]
> **Bayesian inference does not require a generative model — Bayesian data analysis does.** The
> section builds a four-rung ladder from "no model at all" to "fully generative $p(y,\theta,x)$",
> shows that workflow moves up and down it, and closes with the sobering converse: **multiple
> generative models routinely produce the same statistical estimator**, so a good fit is not evidence
> for a mechanism. It also covers how to choose predictors and why scale transformations belong in
> model building rather than in preprocessing.

## Overview

> [!definition] The subtle point (Ch. 5.5, p. 72)
> "Fully Bayesian data analysis requires a generative model — that is, a joint probability distribution
> for all the data and parameters. **The point is subtle: Bayesian inference does not actually require
> the generative model; all it needs from the data is the likelihood, and different generative models
> can have the same likelihood.** But Bayesian data analysis requires the generative model to be able
> to perform **predictive simulation and model checking**, and Bayesian workflow considers a series of
> generative models."
^def-generative-requirement

> [!example] Binomial vs. negative binomial — same likelihood, different generative model
> With $y \sim \text{binomial}(n,\theta)$, $n$ and $y$ observed, inference about $\theta$ is
> **identical** whether the data were sampled with fixed $n$ (binomial sampling) or sampled until a
> specified number of successes occurred (negative binomial sampling): "the two likelihoods are
> equivalent … because they differ only by a multiplicative factor that depends on $y$ and $n$ but not
> $\theta$."
>
> **But full Bayesian data analysis does care:** "the binomial model yields replications with a fixed
> value of $n$ and the negative binomial model yields replications with a fixed value of $y$. **Prior
> and posterior predictive checks will look different under these two different generative models.**"
>
> This is the cleanest possible demonstration that model checking, not inference, is what forces you
> to commit to a generative story.

### Common places where the data model is not fully generative

| Case | Why it's fine | When it isn't |
|---|---|---|
| **Ordinary regression** — model $y$ given $x$, no model for $x$ | "This can be fine" | Bayesian imputation for **missing $x$ not missing completely at random**; predicting under new $x$ |
| **Survival data with censoring** — censoring process unmodeled | Fine for inference | Predictive checks require conditioning on observed predictors **or** extending the model to sample new predictor values |
| **Improper priors** | — | "Bayesian models that use improper priors are **not fully generative** … it would not be possible to sample from the prior predictive distribution." Improper priors can also break posterior sampling — see [[Failure Modes and Steps Forward]] |
| **Deterministic experimental design for $x$** | No stochastic generative process exists | "**Tasks like forecasting or causal inference could still require the invention of a generative model for $x$**, because hypothetical scenarios may not be similarly controlled experiments" |

> [!important] Improper priors as placeholders
> "When we do use improper priors, we think of them as being **placeholders or steps along the road to
> a full Bayesian model** with a proper joint distribution over parameters and data."

### Generative thinking reveals identification limits

"Beyond assistance with model checking and prediction, thinking in terms of generative models **can
help illuminate the limitations of what can be learned from the observations.** For example, we might
want to model a temporal process with a complicated autocorrelation structure. **But if our actual
data are spaced far apart in time, we might not be able to distinguish this model from a simpler
process with nearly independent errors.**"

> [!example] Election forecasting: model vs. poll aggregation (Ch. 5.5, p. 73)
> The 2020 U.S. presidential model (Morris, Gelman, and Heidemanns 2020) uses state and national polls,
> partially pooling toward a "fundamentals" forecast from political and economic conditions, and
> includes a **stochastic process for latent time trends** in state and national opinion.
>
> It is "superficially similar to poll aggregations such as described by Katz (2016), which also
> summarize uncertainty by random simulations."
>
> **The difference:** "**our model could be run forward to generate polling data; it is not just a data
> analysis procedure but also provides a probabilistic model for public opinion** at the national and
> state levels."

## Main Content

### The ladder of generativity

> [!definition] From least to most generative (Ch. 5.5, p. 73)
> 1. **Completely non-generative methods** — defined simply as data summaries, with **no model for the
>    data at all.**
> 2. **Classical statistical models** — characterized by $p(y;\theta)$ for data given parameters, **but
>    with no probability distribution for $\theta$.**
> 3. **The Bayesian models we usually fit** — generative on $y$ and $\theta$ but including additional
>    **unmodeled data $x$** such as sample sizes, design settings, and hyperparameters:
>    $$
>    p(y, \theta \mid x)
>    $$
> 4. **A completely generative model** $p(y, \theta, x)$ — **with no data $x$.**
^def-generativity-ladder

> [!important] Workflow moves in both directions
> "In statistical workflow we can move up and down this ladder, for example
> - starting with an **unmodeled data-reduction algorithm and then formulating it as a probability
>   model**, or
> - starting with the inference from a probability model, **considering it as a data-based estimate**,
>   and tweaking it in some way to improve performance.
>
> In Bayesian workflow we can **move data in and out of the model**, for example taking an unmodeled
> predictor $x$ and allowing it to have measurement error, so that the model then includes a new level
> of latent data (Clayton 1992; Richardson and Gilks 1993)."

### All models are only partially generative

> [!warning] The Gaussian argument (Ch. 5.5, p. 73)
> "There is a sense in which **all statistical models are only partially generative.** This is because
> a statistical summary cannot contain all information about the processes that generated observations.
>
> A trivial example is any model that uses a Gaussian data model. **A huge family of mechanisms, all
> of which approximately sum together small deviations, will produce in expectation a Gaussian
> distribution. It is not usually possible to distinguish among these processes using only the
> distribution of outcomes.** This same principle applies to any other distribution, because
> statistical distributions retain only partial information about their generative processes."

> [!important] Reversing the arrow: which generative models are consistent with this inference?
> "We usually think of one or more generative models being primary and inference and prediction flowing
> forward from them. However sometimes **the inference is primary**, in the sense that we encounter it
> first. In that case we can ask, **which generative models are consistent with the statistical
> inference?**
>
> **Arguments that some generative model is correct, because it fits the data, are commonplace. However
> these arguments are neither persuasive nor logical.** Effective inference about *some* aspects of the
> data model are possible without getting every mechanism right. But effective inference about other
> aspects remains clouded by the multitude of ways that common statistical distributions arise."

> [!example] Collective memory — serial vs. parallel decay (Frank 2019; Ch. 5.5, p. 73)
> **The phenomenon:** the distribution of ages of recalled events, inventions, and the like. "Many items
> decay quickly, but some number remain in memory much longer."
>
> **The proposed mechanism:** a system of **two differential equations**, one describing fast decay and
> storage, the other the subsequent slow decay of stored items. "Authors have argued that the fit of
> these **serial** equations to data is good enough to support belief in a serial process."
>
> **Why the argument fails:** "these equations **cannot be recovered from the pattern**, since
> alternative sets of differential equations produce the same aggregate pattern. For example, **a set of
> parallel, rather than serial, decay processes can produce exactly the same frequency
> distribution.**"
>
> > **"This kind of problem, in which multiple generative models lead to essentially the same
> > statistical estimator, is the rule, not the exception."**

> [!important] The two-sided conclusion (Ch. 5.5, p. 74)
> "While generative data models are necessary for many aspects of Bayesian data analysis and especially
> Bayesian workflow, **usually the data alone are not capable of distinguishing among scientifically
> plausible generative models. But on the upside, this also implies that effective inferential models,
> and workflows, needn't know every aspect of the true generative model.**"

### Choosing predictors

"The choice of predictors is difficult, because **more than one principle is involved**, and not
everything can be decided on the basis of abstract statistical criteria."

> [!definition] Three principles governing predictor choice (Ch. 5.5, p. 74)
> **1. Causal identification recommends an adjustment set.** But this requires a generative model *in
> addition to* the data model, "which will often be **simpler** than the full generative model. This is
> because **not all variables are always necessary for causal identification of a specific hypothetical
> intervention, even if they are part of the full theory of the phenomenon.**"
>
> > *The apparent conflict with Bayes, resolved:* "This aspect of adjustment sets can appear to be in
> > conflict with the Bayesian approach, which mandates that we condition on all available information.
> > **But in practice some information is irrelevant, or nearly irrelevant, and has no impact on
> > results. When this is decidable in advance, from the logic of causal inference, the reduction in
> > data model complexity saves time in programming, debugging, running, and summary.**"
>
> **2. Efficiency, separate from identification.**
> - A variable that **influences the outcome but shares no causes with the treatment** is not needed for
>   identification, **but including it improves precision.**
> - A variable that **influences the treatment but not the outcome** will typically **reduce precision**
>   of the treatment estimate when included.
>
> **3. Functional relationships matter.** "Simple additive models are very powerful. But some
> relationships demand a more nuanced treatment. **Adding constraints, like monotonicity, can be as
> useful as relaxing constraints**, depending upon the scientific context. For example, **a model of
> child growth should not usually allow for individuals to become shorter over time.** Continuous
> variables such as age or income can interact in highly nonlinear ways."
>
> "These problems remain **whether we are interested in causal inference or raw prediction and
> description.**"
^def-predictor-choice

See [[Canonical Causal DAGs]] and [[Causal Estimands]] for the identification machinery, and
[[Causal Inference as Generalization]] for how this book frames the whole question.

### Scale transformations

> [!important] Why scale-free parameters (Ch. 5.5, p. 74)
> "We like our parameters to be interpretable … This leads to wanting them **on natural scales and
> modeling them as independent, if possible**, or with a generative dependence structure, as this
> facilitates the use of informative priors.
>
> For modeling, however, **it is often more useful to separate out the scale so that the unknown
> parameters are scale-free. The most basic reason is that the measurement scales are arbitrary human
> inventions. When included in a model, this can mask fundamental relationships.**"

> [!example] Weight and height — the parameters that vanish (Ch. 5.5, pp. 74-75)
> If a person were a perfect cylinder,
> $$
> w = k\pi r^2 h = k \pi p^2 h^3
> $$
> where $w$ is weight (kg), $h$ height (cm), $r = ph$ the radius as a proportion $p$ of height, and $k$
> the person's density. Two unknowns, $k$ and $p$; fit with a suitable distribution for $w$ (lognormal
> is appropriate — see Ch. 16 of McElreath 2020 for code).
>
> **But divide height by the mean height in the population, and weight likewise.** Both are now
> dimensionless with mean 1. Since a person of average height is expected to have average weight,
> $$
> 1 = k\pi p^2 \cdot 1^3 \quad \Longrightarrow \quad k\pi p^2 = 1
> $$
>
> **So instead of estimating $k$ and $p$, we just predict that transformed weight is the cube of
> transformed height. No parameters are required** — "because the parameters in this example serve to
> relate the measurement scales to one another. **The geometry is universal.**"

> [!example] Pharmacology and toxicology — scaling for hierarchical modeling (Weber et al. 2018)
> **The pharmacology case.** A parameter expected to be near 50 on the measurement scale: set up the
> model on $\log(\theta/50)$, so that **0 corresponds to 50 on the original scale** and a difference of
> 0.1 on the log scale corresponds to roughly a 10% change.
>
> **Why this is not merely cosmetic:** "it also **sets up the parameters in a way that readies them for
> effective hierarchical modeling.** As we build larger models — incorporating data from additional
> groups of patients or additional drugs — it will make sense to allow parameters to vary by group, and
> **partial pooling can be more effective on scale-free parameters.**"
>
> **The toxicology case.** A model required each person's **liver volume**. "Rather than fitting a
> hierarchical model to these volumes directly, we modeled each person's liver as **a proportion of body
> mass**; we would expect these scale-free factors to **vary less across people**, and so the fitted
> model can do **more partial pooling** compared to modeling absolute volumes."
>
> > **"The scaling transformation is a decomposition that facilitates effective hierarchical
> > modeling."**

**Practical recipes.** Put parameters roughly on unit scale via logarithmic or logit transformations,
or by standardizing (subtract a center, divide by a scale). "If the center and scale are themselves
computed from the data, as we do for default priors in regression coefficients in `rstanarm`, we can
consider this as **an approximation to a hierarchical model in which the center and scale are
hyperparameters that are estimated from the data.**" (See
[[Prior Distributions#Prior distributions that depend on data]].)

**Centering aids interpretation.** "When fitting a linear time trend to yearly data, the intercept is
the prediction at year 0, which would be quite the extrapolation if the data range from 1950 through
2020. In such an example, it could make sense to recode as decades relative to a base year, for example
using $(\text{year} - 2000)/10$."

More complicated transformations serve the same purpose — Riebler et al. (2018) for spatial correlation
models, Simpson et al. (2017) more generally.

## Connections

- The ladder here explains why [[Prior Predictive Checking]] and
  [[Simulation-Based Calibration - Overview]] are *unavailable* at rungs 1-2 and *partial* at rung 3:
  the unmodeled $x$ must be fixed by hand in every simulation.
- The "multiple generative models, one estimator" result is the modeling counterpart of the
  identification failures diagnosed computationally in
  [[Sampling Problems with Latent Variables - No Vehicles in the Park]] and
  [[Challenge of Multimodality - Differential Equation for Planetary Motion]].
- Scale transformations are the prerequisite for the informativity ladder in [[Prior Distributions]],
  which assumes "parameters are roughly on unit scale."

## See Also
- [[A Data Model Is Not Just a Likelihood]] — the technical basis for the inference/analysis distinction
- [[Modeled and Unmodeled Data]] — the five-way taxonomy of variables in a Stan program
- [[Why Bayes - Benefits, Costs, and Borders]] — the forward/backward symmetry this section qualifies
- [[Causal Inference as Generalization]] — predictor choice from the causal side
