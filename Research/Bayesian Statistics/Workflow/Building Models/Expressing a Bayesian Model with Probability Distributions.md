---
title: "Expressing a Bayesian Model with Probability Distributions"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 5.3, pp. 69-70"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Computational Tools and Probabilistic Programming]]"
  - "[[Choosing an Initial Model]]"
used_by:
  - "[[A Data Model Is Not Just a Likelihood]]"
  - "[[The Typical Set and the Log Posterior Density]]"
  - "[[Modeled and Unmodeled Data]]"
aliases:
  - "The target function"
  - "target +="
  - "Log posterior density as target"
---

# Expressing a Bayesian Model with Probability Distributions

> [!summary]
> How `~` notation, joint densities, and Stan's `target` relate. The section's payoff is a
> counterintuitive fact that clarifies what Stan actually does: **writing the same distribution
> statement twice does not restate a prior — it squares it.** Each `~` line contributes an additive
> term to the log posterior density, so the model block is not a declaration of a model but a
> *construction* of a target function, "each [line] representing an additional piece of information."

## Overview

The `~` shorthand:

$$y \sim \text{normal}(a + bx, \sigma), \quad a \sim \text{normal}(0,1), \quad b \sim \text{normal}(0,1), \quad \sigma \sim \text{normal}_+(0,1)$$

is read "is distributed as" and stands for the explicit probability statements:

$$p(y \mid a,b,\sigma,x) = \text{normal}(y \mid a + bx, \sigma)$$
$$p(a) = \text{normal}(a \mid 0,1), \quad p(b) = \text{normal}(b \mid 0,1), \quad p(\sigma) = \text{normal}_+(\sigma \mid 0,1)$$

using $\text{normal}(z|\mu,\sigma) = \frac{1}{\sqrt{2\pi}\,\sigma}\exp\!\left(-\tfrac{1}{2}\left(\frac{z-\mu}{\sigma}\right)^2\right)$.
(See Appendix A of BDA3 for the distribution catalogue.)

The full model is the **joint density**, the product of the components:

$$p(y, a, b, \sigma \mid x) = p(y \mid a,b,\sigma,x)\, p(a)\, p(b)\, p(\sigma)$$

> [!important] What the joint model buys you
> "Once we have a full generative model of this kind, we can use it for **different aspects of data
> analysis, from Bayesian updating to model checking and forecasting.** A model for the observable
> variables, the 'data model,' is **one implication** of the full joint model, and **the likelihood is
> just one very important piece of it.**"

## Main Content

### The target function

> [!definition] The unnormalized posterior as target (Ch. 5.3, p. 69)
> When the joint density is considered as a function of the parameters given fixed data $y$, it is
> **proportional to the posterior density.**
>
> "In general, the posterior density **is not a normalized probability density function** — that is, it
> will be positive but will not in general integrate to 1 — **but the proportionality is sufficient for
> many posterior inference algorithms** including the algorithms implemented in Stan."
>
> $$p(\theta|y) \propto p(\theta)\,p(y|\theta) \qquad \Longleftrightarrow \qquad \log p(\theta|y) = \log p(\theta) + \log p(y|\theta) + \text{constant}$$
^def-target

**Stan's mechanism.** Stan "always constructs the target function — in Bayesian terms, the log
posterior density function of the parameter vector — **by adding terms in the model block.**
Equivalently, **each `~` statement corresponds to a multiplicative factor in the unnormalized posterior
density.** This works even if the model is not constructed generatively."

The explicit form of the linear model above:

```stan
target += normal_lpdf(y | a + b*x, sigma);
target += normal_lpdf(a | 0, 1);
target += normal_lpdf(b | 0, 1);
target += normal_lpdf(sigma | 0, 1);
```

### The doubled-prior surprise

> [!warning] Two identical `~` lines do not restate one prior (Ch. 5.3, pp. 69-70)
> ```stan
> theta ~ normal(0, 1);
> theta ~ normal(0, 1);
> ```
> translates to
> $$p(\theta) = \text{normal}(\theta \mid 0,1) \cdot \text{normal}(\theta \mid 0,1)$$
> which is **mathematically equivalent to $\text{normal}(\theta \mid 0, 1/\sqrt{2})$.**
>
> "One might imagine that the above two lines of code would represent a **redundant** expression of a
> $\text{normal}(\theta|0,1)$ prior, but, no, **each line of code corresponds to an additional term in
> the target, or log posterior density. You can think of each line as representing an additional piece
> of information.**"
>
> **Why this matters in practice.** It means a duplicated prior line is a silent bug that *tightens*
> your prior by a factor of $\sqrt{2}$ rather than doing nothing — the kind of error that
> [[Simulation-Based Calibration - Overview|SBC]] and [[Modeling as Software Development|code review]]
> exist to catch. It also means the same mechanism can be used *deliberately*: multiple information
> sources about one parameter are naturally expressed as multiple `~` lines. Compare the
> "calibration data as prior" framing in
> [[Specifying the Data Model and the Prior#Multilevel modeling and the boundary between prior and likelihood]].
^wrn-doubled-prior

> [!important] The point of the section
> "The point of this discussion is not just to introduce the use of Stan for probabilistic programming
> but also to demonstrate **the role of the log posterior density as a target function for inference**
> (point estimation, variational inference, or Monte Carlo simulation) **and the way in which this
> function is built up from separate terms, each corresponding to a different piece of information.**"

This target function is the same object diagnosed geometrically in
[[The Typical Set and the Log Posterior Density]] and reported as `lp__` in every Stan summary — see
[[Bioassay - A First Probabilistic Program]].

## Connections

- The target-as-sum-of-terms view is what makes [[Modeling Ideas to Address Computing Problems]]
  possible: you can add regularizing terms, or drop terms, without rewriting the sampler.
- It is also why a *non-generative* model can still be fit — the target does not care whether the
  factors form a joint distribution. See [[Generative and Partially Generative Models]].
- `lp__` as an inference diagnostic: [[The Typical Set and the Log Posterior Density]].

## See Also
- [[A Data Model Is Not Just a Likelihood]] — why the target's data-model factor is not the whole data model
- [[Computational Tools and Probabilistic Programming]] — what a PPL is and how automatic differentiation
  consumes this target
- [[Probability and Bayesian Inference]] — BDA3 foundations for the notation used here
