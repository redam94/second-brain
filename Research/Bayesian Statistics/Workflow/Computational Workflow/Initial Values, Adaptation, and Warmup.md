---
title: "Initial Values, Adaptation, and Warmup"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - method/stan
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 11.2-11.3, pp. 195-196"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[The Typical Set and the Log Posterior Density]]"
  - "[[Prior Distributions]]"
used_by:
  - "[[Chains, Iterations, and Effective Sample Size]]"
  - "[[Failure Modes and Steps Forward]]"
  - "[[Variational Inference and Pathfinder]]"
  - "[[Challenge of Multimodality - Differential Equation for Planetary Motion]]"
aliases:
  - "Stan initialization"
  - "uniform(-2,2)"
  - "Warmup"
  - "Pathfinder initialization"
---

# Initial Values, Adaptation, and Warmup

> [!summary]
> Where to start an iterative algorithm and how long to spend getting oriented. Stan's default draws
> initial values from **$\text{uniform}(-2,2)$ on the unconstrained scale** — which the authors reframe
> as "**a very crude previous model**," not a prior, resting on the assumption that parameters are roughly
> on unit scale. Three case studies in the book show the default failing in three distinct ways —
> **numerical overflow**, **slow transit to the typical set**, and **chains stuck in negligible modes** —
> with three distinct fixes: reparameterize, initialize with **Pathfinder**, and choose starting values
> from physical reasoning.

## Overview

> [!important] Initial values as part of the workflow (Ch. 11.2, p. 195)
> "**The first step of any iterative algorithm is to decide where to start, which we can place within our
> larger workflow by considering initial values to represent some sort of summary of an earlier fitted
> model.**
>
> **The starting points of an algorithm are not supposed to matter in the asymptotic limit, but they can
> make a difference in practice, in the positive sense of starting in a reasonable place or in the negative
> sense of getting stuck in low-probability, ill-behaved areas of the posterior distribution that the
> algorithm can have difficulty in escaping.**"

### Stan's default initialization

> [!definition] What `uniform(-2,2)` actually means (Ch. 11.2, p. 195)
> "**In its current default setting, Stan initializes with parameters independently drawn from the
> $\text{uniform}(-2,2)$ distribution on the unconstrained scale.**"
>
> For a model declaring
> ```stan
> real a;
> real<lower=0> b;
> real<lower=0, upper=1> c;
> simplex[4] d;
> ```
> "**the initial values will be drawn independently for $a$, $\log b$, $\text{logit } c$, and the three
> unconstrained scalar parameters corresponding to Stan's simplex transformation.**" (See the Constraint
> Transforms section of the Stan Reference Manual for the full rules.)
>
> **Adjusting it:** `init=0.1` in `cmdstanr` draws from $\text{uniform}(-0.1, 0.1)$; initial values can also
> be supplied for each chain directly.
^def-stan-init

> [!important] The initialization distribution is *not* a prior
> "**A distribution from which initial values are drawn can be thought of as a very crude previous model
> (not a 'prior' in the Bayesian sense as it does not enter into the log posterior density or target
> function in any way), with a default assumption that the parameters are roughly on unit scale (see
> Section 5.6) so that the algorithm, when started with parameters near zero, can reach the rest of the
> distribution.**
>
> **Even if that approximation is far from perfect, it can provide starting points within or close to an
> area of high posterior mass**" (Zhang, Carpenter, et al. 2022).
>
> Note the dependence on the unit-scale convention of
> [[Prior Distributions#The five levels of informativity]] — the same convention that makes
> $\text{normal}(0,1)$ meaningfully "weakly informative" makes $\text{uniform}(-2,2)$ a sensible default
> start. **Violate the scale convention and both break together.**

## Main Content

### Three failure modes, three fixes

> [!example] When the default initialization is not enough (Ch. 11.2-11.3, pp. 195-196)
> | Failure | Chapter | What goes wrong | The fix |
> |---|---|---|---|
> | **Numerical overflow** | §12.3 | "**due to limitations of floating point representations, initial values can lead to log densities or gradients that cannot be represented with floating point arithmetic, leading to numerically infinite or not defined values, which makes the MCMC algorithm unable to proceed**" | "**By reparameterizing the model … the default initialization provides numerically good values and sampling works well**" |
> | **Slow transit to the typical set** | Ch. 27 (birthdays) | "**initial values far from the typical set lead to slow transition toward the typical set and high initial bias, affecting also adaptation which further deteriorates the sampling efficiency**" | "**adaptive initialization with the Pathfinder algorithm** (Zhang, Carpenter, et al. 2022) **improves the MCMC adaptation and sampling**" |
> | **Stuck in a negligible mode** | Ch. 30 (planetary motion) | "**depending on the initial values, Markov chains can get stuck in minor modes that have essentially zero posterior mass**" | "**we were able to choose better initial values by considering feasible values for the physical system**" |
>
> **The general recommendation for hard geometries:** "**when the posterior distribution has widely separated
> modes or is otherwise difficult to traverse, poorly-situated initial values can cause problems** … **one
> way to obtain good starting points for HMC is to first run a variational algorithm to get near the typical
> set**" — [[Variational Inference and Pathfinder]].
^ex-init-failures

Note that the three fixes correspond to three *different* diagnoses: the first is a **model
parameterization** problem, the second a **starting point** problem, and the third a **posterior geometry**
problem. The initialization is where all three become visible.

### Adaptation and warmup

> [!definition] What warmup does (Ch. 11.3, p. 196)
> "**Many modern inference engines include some adaptation phase to tune the algorithm parameters to improve
> later sampling efficiency by using information from the early iterations. To reduce computational bias due
> to dependence on the initial values, adaptation and finite sampling time, some part of the early iterations
> after the warmup are also discarded.**"
>
> **The three jobs of the warmup stage:**
> 1. "**reach the typical set**";
> 2. "**adapt the tuning parameters of the algorithm**";
> 3. "**reduce the influence of initial values as expressed in the transient stage of the chains before they
>    have mixed within the target distribution.**"
^def-warmup

> [!important] Why adaptation is needed at all
> "**MCMC methods are most efficient when the target is close to a unit scale independent normal
> distribution. It is common to use part of the initial iterations to learn the posterior scales and possibly
> also correlations to transform the posterior to be easier to sample.**"
>
> This is the same geometric target as the reparameterization advice of
> [[Modeling Ideas to Address Computing Problems]] — **adaptation does automatically what
> reparameterization does by hand**, but only for global scale and correlation, not for funnel-type
> geometry that varies across the space.

> [!warning] The tradeoff on warmup length
> "**Sometimes we might want to shorten the time used in this process, but reducing the number of iterations
> used for warmup can deteriorate the later sampling efficiency.**
>
> In the case studies we have mostly used **the default Stan warmup length which has been made to be long
> enough to work reasonably well in many test cases.** In Chapter 27 we illustrate the use of **shorter
> warmups and shorter MCMC runs in early phases of model exploration, with longer warmup and sampling
> periods used when computing final results.**"
>
> The staged strategy — cheap runs while exploring, expensive runs for the final answer — is the same
> economy argued for in [[Chains, Iterations, and Effective Sample Size#How long to run]] and
> [[Fit Fast, Fail Fast]].

> [!important] When defaults suffice
> "**Assuming the support of the posterior distribution is simply connected, and we run MCMC long enough, then
> any initial value is fine. Often, the transient phase moving from the initial values to or near the typical
> set is fast, and the default initial values are just fine. Other times, more careful choice of initial
> values is needed.**"
>
> Note the condition: **simply connected support.** Widely separated modes violate it, which is exactly the
> Chapter 30 failure above.

## Connections

- Initialization is where the geometry of [[The Typical Set and the Log Posterior Density]] first bites:
  starting "far from the mode" is unavoidable in high dimensions, and the transient path passes through the
  typical set.
- Divergences and non-convergence traced to initialization are catalogued in
  [[Failure Modes and Steps Forward]]; the reparameterization repairs are in
  [[Modeling Ideas to Address Computing Problems]].
- Pathfinder-as-initializer is the practically most important use of variational inference in this book —
  see [[Variational Inference and Pathfinder]].

## See Also
- [[The Typical Set and the Log Posterior Density]] — what warmup is trying to reach
- [[Chains, Iterations, and Effective Sample Size]] — how long to run after warmup
- [[Challenge of Multimodality - Differential Equation for Planetary Motion]] — initialization from physical reasoning
- [[Model Building - Time-Series Decomposition for Birthdays]] — short warmups during exploration
