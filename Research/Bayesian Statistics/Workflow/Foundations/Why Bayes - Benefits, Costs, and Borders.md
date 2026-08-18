---
title: "Why Bayes - Benefits, Costs, and Borders"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 1.1, pp. 3-7"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Foundations"
doc_type: textbook
depends_on:
  - "[[Probability and Bayesian Inference]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Varieties of Bayesian Theory]]"
  - "[[From Inference to Data Analysis to Workflow]]"
  - "[[Generative and Partially Generative Models]]"
aliases:
  - "Why Bayes?"
  - "On the borders of Bayes"
---

# Why Bayes — Benefits, Costs, and Borders

> [!summary]
> The case for Bayes in this book is not philosophical but operational: because a Bayesian model
> specifies the joint distribution $p(y, \theta) = p(\theta)p(y|\theta)$, it can be run **forward**
> ($\theta \to y$, simulation) as well as **backward** ($y \to \theta$, inference). That symmetry is
> what makes prior predictive checking, posterior predictive checking, fake-data experimentation, and
> simulation-based calibration possible at all — the entire workflow of this book is built on it.
> The chapter is equally frank about the borders: real models are almost never fully generative, and
> Bayesian practice always leaves information on the table.

## Overview

A classical model is characterized by $p(y|\theta)$ alone; the goal is to estimate $\theta$ and its
uncertainty given $y$. A Bayesian model additionally specifies $p(\theta)$, the prior, which turns the
pair into a **generative model**: first draw $\theta \sim p(\theta)$, then draw $y \sim p(y|\theta)$.

> [!definition] The symmetry that makes workflow possible (Ch. 1.1, p. 3)
> The model defines a joint distribution $p(y, \theta)$ and can be **defined before either $y$ or
> $\theta$ is known**.
> - If $y$ is observed, compute $p(\theta|y)$ — **backward inference**.
> - If $\theta$ is observed (or drawn from the prior), compute/simulate $p(y|\theta)$ — **forward
>   simulation**, i.e. generative modeling.
>
> A single model is therefore applicable in different contexts depending on which variables are
> observed. Every checking technique in this book — [[Prior Predictive Checking]],
> [[Posterior Predictive Checking]], [[Designing Simulated-Data Experiments]],
> [[Simulation-Based Calibration - Overview|SBC]] — is an application of the forward direction.
^def-generative-symmetry

## Main Content

### Five practical benefits

1. **Latent parameters and model expansion.** Complexity can be added incrementally within one
   estimation framework. Even when the question of interest is a scalar, latent parameters make the
   model more realistic — e.g. the item-response model of [[Multiple-Choice Exam - A Full Workflow Walkthrough]]
   has a parameter for every rater and every item, plus structural parameters governing them.
2. **Seamless integration of multiple information sources.** The U.S. presidential election forecast
   combines national polls, state polls, past state results, and an economic-conditions model in one
   joint distribution.
3. **Uncertainty as a probability distribution, pipeable into decision analysis.** See
   [[From Inference to Decision]] and the classification-competition case study.
4. **Informative priors stabilize inference,** yielding posteriors more reasonable than point
   estimates from local data alone.
5. **Posterior predictive checking becomes available** — comparing observed data to replicated
   datasets from the generative model. In a workflow context this is the step that both critiques the
   model and proposes its expansions.

A sixth, counterintuitive benefit: **some models are just easier to fit using Bayes.** The common
complaint is that Bayes is more expensive than optimization, but when data are sparse or models
complex, optimization is unstable. Zero estimates of variance parameters destroy non-Bayesian
multilevel estimates; complex physics likelihood surfaces are hard to navigate (see the planetary
motion case study). Prior information is a regularizer that makes the "more complicated" Bayesian
apparatus *more* numerically stable — most starkly with complete separation in logistic regression.

### The costs

- **You must specify a full probability distribution** over all known and unknown quantities. The
  authors frame this as a cost that doubles as a benefit: it forces explicitness. But because
  inference then depends on the whole joint model, it becomes important to fit multiple models and
  assess sensitivity — which is precisely why workflow is needed.
- **Computation.** Posterior summaries generally come from random simulation requiring sophisticated
  algorithms (see [[Computational Tools and Probabilistic Programming]]).

### On the borders of Bayes

These are the places where the axioms do not resolve the problem and "creativity, compromise, and
exploration" are required.

| Border issue | The problem | Where the book addresses it |
|---|---|---|
| **Sparsity and complexity** | With informative data all methods agree; with sparse data or complex models, modeling details drive conclusions. *"In low information or high complexity scenarios, workflow is a necessity."* | [[Prior Distributions]] |
| **Default methods vs. targeted models** | Ideally build from substantive understanding; in practice we start from defaults (linear, log/logit, binomial/normal) and add complexity gradually | Golf putting case study |
| **Frequency properties** | Any Bayesian method yields a non-Bayesian method: treat the posterior as a function of data and evaluate its sampling properties | [[Statistical and Scientific Inference]] |
| **Computational approximations** | Simulation is sometimes too slow, so we substitute a normal approximation or variational estimate and *treat the result as if it were a posterior* — which makes checking the fit essential | [[Approximate Algorithms and Approximate Models]] |
| **Unmodeled data** | Models are typically **not fully generative** | see below |
| **Excluded information** | Every model is a compromise: linearity we know is false, additivity we know fails, predictors treated as known though measured with noise | [[Choosing an Initial Model]] |

> [!definition] Unmodeled data (Ch. 1.1, p. 5)
> In $y_i \sim \text{normal}(a + bx_i, \sigma)$ with prior $p(a,b,\sigma)$, we typically do **not**
> model the sample size $n$ or the predictors $x_i$ as random. No generative model has been specified
> for $n$ or $x$, so **in any simulation they must be set ahead of time**.
>
> This matters operationally: it is why every fake-data experiment in this book begins by fixing $n$
> and $x$ before drawing parameters. Expanding the model to include $p(n)$ and $p(x)$ is possible and
> occasionally useful — e.g. if larger samples are associated with smaller effects, $n$ and $b$ should
> be negatively correlated a priori; treating $x$ as random helps assess out-of-distribution behavior.
>
> Even unmodeled data require a predictive specification: LOO-CV (§8.3) corresponds to a hypothetical
> population of size $n$ with $x_i$ from the same distribution, and poststratification (§7.1) requires
> a distribution of $x$ for the target population.
^def-unmodeled-data

> [!warning] Why not jump straight to the larger model?
> Beyond effort and compute: adding parameters makes classical estimates noisier and classical
> intervals wider. Under regularization or Bayes this immediate cost is not incurred — **but only at
> the price of a strong regularizer or informative prior.** One reason we use simpler models is
> precisely to avoid having to figure out what prior and data model to use. *"Behind any fitted model
> are the shadows of all the more complicated models that could — and if sufficient time, resources,
> and data were available, would — be fit."*

### Bayesian interpretation of non-Bayesian methods

The habit of saying "maximum likelihood is just Bayes with a flat prior," "fixed effects are random
effects with group variance set to infinity," "lasso is just regression with an exponential prior" is
useful for insight but can mislead.

> [!example] Why "lasso is just an exponential prior" breaks down (Ch. 1.1, p. 6)
> The lasso estimate can be viewed as an approximate posterior mode under independent exponential
> priors on the coefficients. But **lasso is intended for moderate- and high-dimensional problems**,
> and in such problems the mode is not a good posterior summary because of **concentration of
> measure**. So in high dimensions, "a penalty is just a log prior density" stops being accurate or
> useful.
>
> **Interpretation:** This does not make lasso bad, nor a Bayesian version necessarily better — some
> of lasso's desirable computational and applied properties arise *directly* from it being a mode
> rather than a full posterior. See [[Global-Local Shrinkage Priors]] and
> [[The Horseshoe Prior]] for the genuinely Bayesian alternatives.

The useful direction of the analogy: when estimates are problematically noisy and replications fail,
recognizing that simple means, differences, and least squares correspond to flat-prior Bayes tells you
what to do. **When the estimate is too large to believe, that implies inference can be improved by
incorporating prior information.**

### Bayesian modeling as hierarchical modeling

Bayesian thinking leads naturally to hierarchy. For exam scores from students in many schools,
$y_i = a_{j[i]} + b x_i + \text{error}_i$, the model $a_j \sim \text{normal}(\mu_a, \sigma_a)$
contains both extremes as special cases:

$$\sigma_a = \infty \;\Rightarrow\; \text{no pooling}, \qquad \sigma_a = 0 \;\Rightarrow\; \text{complete pooling}$$

with intermediate $\sigma_a$ giving **partial pooling**. More generally the prior and data
distributions form a hierarchy where $p(y|\theta)$ is an "urn" from which data are sampled — a
different urn for each $\theta$ — and $p(\theta)$ is "a room full of urns."

> [!important] The prior as a reference set
> *"The prior distribution represents a reference set of problems to which a method might be
> applied."* In a hierarchical model, aspects of that room are **estimated** by gathering data
> corresponding to multiple $\theta$ drawn from it. This reframing — prior as reference set rather
> than as belief — recurs throughout [[Prior Distributions]].

The framework guides how the model is built but does not supply the details. The normal distribution
is one modeling choice among many, and things become more open-ended with multivariate hierarchical
models (both $a$ and $b$ varying by school) or continuous curves. For the details you need to
**visualize and simulate from the model**, and the right choice depends on substantive goals.

## Connections

- This note supplies the *why* behind the machinery; [[From Inference to Data Analysis to Workflow]]
  supplies the *what*, and [[Four Modeling Scenarios]] the *when*.
- The generative symmetry above is what makes [[Generative and Partially Generative Models]] a
  first-class workflow concern rather than a philosophical aside.
- The "unmodeled data" border is the reason [[Poststratification]] and
  [[Cross Validation Checking]] each need an explicit specification of the predictor distribution.
- Contrast with the 2020 paper's treatment in [[Bayesian Workflow - Overview]], which motivates
  workflow but does not develop the borders-of-Bayes catalogue.

## See Also
- [[Varieties of Bayesian Theory]] — the M-open stance that follows from these borders
- [[There Is No Safe Haven]] — the companion argument that no default choice escapes these tradeoffs
- [[BDA3 - Overview]] — Chapter 1 of BDA3 covers the foundations of probability referenced here
- [[Statistical Rethinking - Overview]] — McElreath's parallel treatment of generative modeling
