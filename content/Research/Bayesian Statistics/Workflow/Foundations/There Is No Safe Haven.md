---
title: "There Is No Safe Haven"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 1.3-1.5, pp. 9-15"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Foundations"
doc_type: textbook
depends_on:
  - "[[Why Bayes - Benefits, Costs, and Borders]]"
  - "[[Varieties of Bayesian Theory]]"
used_by:
  - "[[Prior Distributions]]"
  - "[[Statistical and Scientific Inference]]"
  - "[[Choosing an Initial Model]]"
aliases:
  - "No safe haven"
  - "Convincing evidence"
  - "Chesterton's fence in statistics"
---

# There Is No Safe Haven

> [!summary]
> There is no set of statistical choices that is universally defensible. The chapter dismantles the
> idea that unregularized/unbiased estimation is a "conservative" default: **conservatism is not a
> property of a method but of what the method is compared to**. It then asks the reflexive question
> — how do statisticians themselves decide which methods to believe in? — and answers with a list of
> nine heuristic sources of evidence, none of which suffices alone.

## Overview

You must choose a statistical approach, and then there are decisions within any method: model,
constraint or regularization procedure, variables used in prediction, data coding, missing data, and
what data to include at all. None of these has a safe default.

**The omitted-variable trap.** If you stick to unbiased methods such as least squares, you restrict
the number of variables you can include — so you suffer omitted-variable bias instead. *"The
practitioner who uses unregularized regression has already essentially made a compromise with the
devil by restricting the number of predictors in the model to a 'manageable' level."*

## Main Content

### Why an unbiased estimate is not a safe haven

In a clean randomized experiment $\bar{y}_{\text{treated}} - \bar{y}_{\text{control}}$ is unbiased for
the average treatment effect, which looks like a satisfactory place to stop.

> [!important] The unbiasedness trap (Ch. 1.3, p. 10)
> **The unbiased estimate is only useful if its standard error is small enough.** On a scale where
> 0.1 is a large effect (a 10% increase in test scores, sales, or survival), an estimate of
> $0.3 \pm 0.4$ **dramatically overstates the real uncertainty on the high end** — it treats effects
> of 1.0 as plausible when they are not.
>
> To shrink that standard error you need more information (priors, regression predictors) or more
> data. But **gathering more data typically expands the scope of the problem** — pooling years or
> scenarios — and once you have enough data to estimate the effect precisely, *you are no longer
> targeting the same average effect*. You get "an unbiased estimate of a blurred-out average, which
> does not directly address your questions."

This is the core argument of the chapter: precision and relevance trade off against each other, and
unbiasedness does not exempt you from the trade.

### Worked example: weak data and a strong prior (sex ratio and attractiveness)

> [!example] Beauty and sex ratio (Ch. 1.3, pp. 10-11, Fig. 1.1)
> **Setup.** A survey of ~3000 Americans assessed adolescents' attractiveness on a five-point scale;
> years later their children's sexes were recorded. Attractiveness is treated as a numerical predictor
> $x \in \{-2,\dots,2\}$ and the percentage of girl births $y$ is regressed on it with only
> **five data points** (one per category):
> $$
> y_i = a + b x_i + \text{error}_i, \quad i = 1,\dots,5
> $$
>
> **Flat-prior fit.** Least squares gives $y = 49.4 + 1.5x$, with the slope's standard error
> $\text{se}(b) = 1.4$ — highly uncertain.
>
> **Constructing the informative prior.** Historical data from many countries show the percentage of
> girl births is remarkably stable at roughly **48.5% to 49%**, except under extreme conditions such
> as famine. So:
> - *Intercept* $a$ (with $x$ centered at 0, this is the percentage of girls for parents of average
>   beauty): $a \sim \text{normal}(48.8,\, 0.5)$.
> - *Slope* $b$: $b \sim \text{normal}(0,\, 0.2)$. Because $x$ has range 4, this says we expect any
>   population difference between the highest and lowest attractiveness categories to be **no more
>   than 0.8 percentage points**.
>
> Prior independence of $a$ and $b$ is warranted **because the predictor is centered**, so $a$ is
> interpretable as the rate among average people and $b$ as the gradient.
>
> **Result.** The posterior for $b$ has mean **0.02** with sd **0.20**: "the data here supply very
> little information compared to the prior."
>
> **Interpretation.** Maximum likelihood looks safe and conventional but yields a noisy estimate that
> "will perform poorly if used routinely with problems of this size." The Bayesian estimate is more
> stable and sensible — **yet still leaves information on the table** and could be improved by a
> stronger prior, at the cost of making the analysis applicable to a narrower range of problems.
> There is no option here that is free of a judgment call.

Note the technique, which recurs throughout the book: **the prior is justified by projecting it onto
an observable scale** (percentage points of girl births) rather than argued for on the parameter
scale. The same move drives the priors in
[[Multiple-Choice Exam - A Full Workflow Walkthrough]] and [[Prior Distributions]].

### The purported "conservatism" of non-Bayesian approaches

Is the informative prior above conservative? *"When coming up with it, we thought so"* — the prior
uncertainties were deliberately set wider than actual knowledge warranted. But:

> [!important] Conservatism is relational, not intrinsic (Ch. 1.3, p. 12)
> **From the standpoint of prediction, a narrower prior is more conservative**, in the sense of
> yielding lower average prediction errors across a realistic mix of problems. By that standard the
> weak prior is not conservative, and the flat prior is even less so.
>
> The most conservative prediction of all is $b = 0$; the next most conservative is a strong prior
> centered at zero with a very narrow range.
>
> **"A procedure is not itself conservative or non-conservative; rather, conservatism is a property
> of what the method is being compared to."** Least squares is conservative *as a purely data-based
> curve-fitting procedure*; strong-prior Bayes is conservative *relative to a default assumption that
> effects are likely to be small*.

Starting from the prior and using data to gain efficiency is the **opposite** of the statistician's
habit of modeling data first with minimal external information. Which is better depends on the data
structure — and hierarchical approaches that fit priors from data offer a third path.

### Chesterton's fence and maximum likelihood

The chapter quotes Chesterton (1929) on not clearing away a fence until you understand why it was
erected, then applies the principle to maximum likelihood — a method "first developed over two hundred
years ago, codified over a hundred years ago, and still in use today."

**Virtues of MLE that a Bayesian replacement should try to preserve:**
- general — applicable and rapidly/stably computable across a wide range of problems;
- asymptotically efficient under certain conditions;
- familiar and widely understood;
- interpretable as a *data summary* as well as a parameter estimate.

Where something must be given up — with a prior, Bayesian inferences are not purely data summaries —
be aware of the tradeoff. And Bayesian methods add a lot: **"paradoxically, the apparently more
complicated Bayesian apparatus can be more computationally stable than maximum likelihood"** — most
clearly with complete separation in logistic regression, but also in subtler settings such as
hierarchical models.

### Convincing evidence: how we actually choose methods

> [!important] The reflexive question (Ch. 1.4, p. 13)
> "Did Fisher decide to use maximum likelihood because he evaluated its performance and the method had
> a high likelihood? Did Neyman decide to accept a hypothesis testing framework because it was not
> rejected at a 5% level? Did Jeffreys use probability calculations to determine there were high
> posterior odds of Bayesian inference being correct? Did Tukey perform a multiple comparisons
> analysis to evaluate the effectiveness of his multiple comparisons procedure? Did Rubin use matching
> and regression to analyze the efficacy of the potential-outcome framework? Did Efron bootstrap
> existing analyses to demonstrate the empirical effectiveness of resampling? **No, no, no, no, no,
> no, and no.**"
>
> We use statistical methods to make decisions in applied work, but not when deciding what approach
> to follow in the first place.

**Nine sources of evidence for believing in a statistical method:**

| # | Source | Example given |
|---|---|---|
| 1 | Mathematical theory | coherence of inference, asymptotic convergence |
| 2 | Computer simulations | approximate coverage of intervals under deviations from the model |
| 3 | Solutions to toy problems | partial pooling vs. complete/no pooling in simple hierarchical models |
| 4 | Improved performance on benchmarks | the Boston housing data |
| 5 | Cross validation and external validation | education, business, election forecasting |
| 6 | Success as recognized in a field of application | a method used and respected by biologists or economists |
| 7 | Success in the marketplace of software or textbooks | willingness to pay signals value |
| 8 | Survival in scientific debate | applied to a real problem where people care about the answer |
| 9 | Face validity | whether the method seems reasonable — a minimum requirement |

> [!warning] None is sufficient alone
> "Theory and simulations are only as good as their assumptions; results from toy problems and
> benchmarks don't necessarily generalize; cross validation and external validation can work for some
> sorts of predictions but not others; and subject-matter experts and paying customers can be fooled."
>
> **The imperfection of each is exactly why all of them matter**: "We can't know for sure, so it makes
> sense to have many ways of knowing." These sources routinely conflict — a popular method with
> questionable properties, an approach that simulates well without theory, a method that works in some
> fields but not others — and *"one of the tasks of the workflow as described in this book is to help
> you settle on and evaluate a model that is appropriate for your goals."*

**Off-label use.** A further concern: a method approved for one class of problems gets used in another.
We must consider how to choose methods for ourselves, for colleagues of differing technical skill, and
for communities of users who are not full-time quantitative analysts.

## Examples

> [!example] Exercise 1.3 — the generic workflow exercise set (Ch. 1.5, pp. 14-15)
> The book flags this exercise as applicable to *any* example in the book, and it doubles as a
> checklist of workflow operations:
> - **(a) Sensitivity to data** — perturb a measurement to be increasingly extreme; plot inferential
>   summaries vs. the input value.
> - **(b) Sensitivity to the prior** — re-fit under different prior scales; plot summaries vs. scale.
>   See [[Influence of Likelihood and Prior]].
> - **(c) Posterior predictive checking** — graph the data, simulate replicated datasets from the
>   posterior predictive, plot and compare. See [[Posterior Predictive Checking]].
> - **(d) Prior predictive checking** — same but simulating from the prior predictive. See
>   [[Prior Predictive Checking]].
> - **(e) Scaling and computation** — refit with fewer (subsampled) or more (model-simulated)
>   observations; assess stability and compute time vs. $n$. Sparse data are harder, especially with
>   weak priors.
> - **(f) Fake-data experimentation** — simulate from known parameters, refit, check recovery. See
>   [[Designing Simulated-Data Experiments]].
> - **(g) Propagation of uncertainty** — use posterior draws for latent variables, future data, causal
>   effects, decision recommendations.
> - **(h) Model expansion** — add hierarchy, dependence, extra data, flexible functional form, or
>   latent structure; fix what breaks. See [[Model Expansion - Predictive Consistency and Coherence]].
> - **(i) Predictively consistent priors** — increase the number of predictors/dimensions and require
>   the model to scale appropriately. **"Flat or weakly informative priors won't do that."**
> - **(j) Predictive model evaluation and averaging** — compare several models by LOO-CV and stack them.
> - **(k) Approximate computing** — attack a hard problem with variational inference, expectation
>   propagation, or amortized inference, then assess accuracy against full Bayes or known-truth
>   simulations. See [[Approximate Algorithms and Approximate Models]].

## Connections

- This chapter is the *negative* argument that pairs with [[Why Bayes - Benefits, Costs, and Borders]]:
  Bayes is not defended as safe, because nothing is safe.
- "Conservatism is relational" is the conceptual root of the prior-scale discussion in
  [[Prior Distributions]] and of prior sensitivity analysis in [[Influence of Likelihood and Prior]].
- The nine sources of evidence reappear as the epistemology of [[Statistical and Scientific Inference]].

## See Also
- [[Varieties of Bayesian Theory]] — the M-open stance that makes "no safe haven" unavoidable
- [[Four Modeling Scenarios]] — the practical ladder for models known to be imperfect
- [[Partial Pooling as Multiple Comparisons Correction]] — the toy-problem evidence (source 3) in detail
- [[Forking Paths and Bayesian Approaches]] — researcher degrees of freedom as the flip side of "no safe haven"
