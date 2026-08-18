---
title: "Designing Simulated-Data Experiments"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 6.3, pp. 108-112 (Figure 6.3)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Building Models"
doc_type: textbook
depends_on:
  - "[[Four Modeling Scenarios]]"
  - "[[Simulation to Express Uncertainty]]"
  - "[[Modeled and Unmodeled Data]]"
used_by:
  - "[[Simulating an Underlying Process, Data Collection, and Inference]]"
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[Simulated-Data Experimentation as Virtual Replication]]"
  - "[[Failure Modes and Steps Forward]]"
aliases:
  - "Fake-data simulation"
  - "Parameter recovery"
  - "Simulated-data experiments"
  - "Upper bound on what can be learned"
---

# Designing Simulated-Data Experiments

> [!summary]
> Why you fit models to data you made up. The argument that makes this non-optional: **latent variables
> are never observed in real data**, so simulated-data experiments are "**arguably the only point where
> we can directly check that our inference on latent variables is reliable.**" The asymmetry to
> remember: **success on simulated data guarantees nothing about real data, but failure on simulated
> data is fatal** — "simulated-data experiments provide an **upper bound** of what can be learned about
> a latent process."

## Overview

> [!important] What convergence diagnostics cannot do (Ch. 6.3, p. 109)
> "The **first** step in validating computation is to check that the model finishes fitting in an
> acceptable time frame and the convergence diagnostics do not present clear concerns. In the context
> of HMC, this is primarily **the absence of divergent transitions, $\hat{R}$ near 1, and sufficient
> effective sample sizes for the central tendency, the tail quantiles, and the energy.**"
>
> > **"However, those diagnostics cannot protect against a probabilistic program that is computed
> > correctly but encodes a different model than the user intended or requires."**
>
> "The main tool we have for ensuring that the statistical computation is done reasonably well is to
> **actually fit the model to some data and check that the fit is good. Real data can be awkward for
> this purpose because modeling issues can collide with computational issues and make it impossible to
> tell if the problem is the computation or the model itself.** To get around this challenge, **we first
> explore models by fitting them to simulated data.**"

This is [[Four Modeling Scenarios|scenario 1]] entered deliberately: the only rung of the ladder where
truth is known.

> [!example] Simulation as a design check — intertemporal choice in psychology
> Ballard, Neal, et al. (2021) and Ballard, Luckman, and Konstantinidis (2023) used parameter-recovery
> simulation to ask whether a given experimental design can identify the parameters of interest:
>
> > "[We] find **generally low correlations between parameters estimated for the same person from the
> > different choice sets.** Moreover, **parameter recovery varies considerably between models and the
> > experimental designs** upon which parameter estimates are based. We conclude that **many parameter
> > estimates reported in previous research are likely unreliable** and provide recommendations on how
> > to enhance the reliability of inter-temporal choice models for measurement purposes."
>
> "**This sort of conclusion is not welcome but is better than taking inferences at face value without
> acknowledging the weaknesses of the data in the context of the model being fit.**"

**A third use, beyond validation and design.** "There are many statistical phenomena, **from shrinkage
to measurement error, that are more easily understood in the context of a known data-generating
process. Simulated-data experiments help us develop and refine our intuitions** and hopefully make more
informed and skeptical inferences about real data."

## Main Content

### The basic procedure and what to check

**The setup:** "choose parameter values that seem reasonable and then simulate a dataset **of the same
size, shape, and structure as the original data.**" Then fit the model and check three things.

> [!definition] Three checks on a simulated-data fit (Ch. 6.3, p. 109)
> **Check 1 — Is the posterior different from the prior?** "For all parameters, we check to see **what
> additional information the observed data provide beyond the prior. If the posterior is very similar to
> the prior, it could signal a problem in design or a bug in model implementation.** For example, **if a
> parameter is declared but not actually used in computation of the model, its posterior will be the
> prior.**"
>
> *(Note this check "isn't strictly computational" — it is about identifiability and about typos.)*
>
> **Check 2 — Do the data-generating values lie in suitable uncertainty intervals?** "Those intervals may
> still be **wide**, if the data are not informative for a parameter, but **should typically concentrate
> on the data-generating values.**"
>
> "**Even a single simulation run can often reveal blatant errors.** For instance, if the code has an
> error in it and fits the wrong model, this will often be clear from a **catastrophic failure of
> parameter recovery.**"
>
> **But single runs are not enough for subtle cases:** "**it is not sufficient to simulate a single
> dataset from the model, compute the associated posterior distribution, and declare that everything
> works well.**" A more elaborate and computationally intensive setup — SBC, Ch. 14 — is needed. "But
> **a few simple checks are just about always worthwhile before investing in elaborate suites of
> simulations.**"
>
> **Check 3 — How does behavior change across the parameter space?** See below.
^def-three-simulation-checks

> [!important] What to do when the check fails
> "If our simulated-data check fails … or if there seem to be model components that are **not gaining
> any information from the data** (Lindley 1956; Goel and DeGroot 1981), we recommend **breaking down
> the model. Go simpler and simpler until we get the model to work. Then, from there, we can try to
> identify the problem**" — illustrated in
> [[Modeling Ideas to Address Computing Problems]] (§12.4).
>
> "**If models are built up from simple to complex, hopefully many of these issues can be caught before
> there is a need to break down a model.**"

### Check 3: a model contains many stories

> [!definition] Behavior varies across the parameter space (Ch. 6.3, p. 110)
> "**In this sense, a statistical model can contain many stories of how the data get generated.**" Four
> examples given:
>
> | Model | Well-behaved regime | Ill-behaved regime |
> |---|---|---|
> | **Sum of declining exponentials** | exponents **well separated** | the two components **close to each other** (§12.4) |
> | **Differential equation models** | — | instability contingent on parameter values (Ch. 30) |
> | **Hierarchical model** | the **"mouth"** of the funnel (between-group variability **high**) | the **"neck"** (between-group variability **low**) |
> | **Gaussian process** | length scale **larger than the minimal resolution of the data and smaller than the range of the data** | length scales **too small or too large** |
>
> "**Rather than thinking of one simulation that can answer all of these questions, we can explore a
> model with a sequence of simulated data experiments. Each experiment should have a clear aim, with the
> simulation designed so that this aim can be met.**"
^def-many-stories

> [!warning] Avoid the grid search
> "By having a clear aim, **we can avoid a broad grid search over all potential values of all parameters
> in the data generating process** in which, for each combination of parameters, a number of simulated
> datasets are drawn, with the model fit with each one. **This sort of comprehensive exploration becomes
> computationally expensive as the parameter space grows large, and it can make sense to perform
> simulation studies in a more focused way.**" (Morris, White, and Crowther 2019 cover the design,
> execution, and analysis of simulation studies in detail.)

> [!important] The two-step procedure: simulate from the posterior
> "Simulated-data experiments can be particularly relevant **in the zone of the parameter space that is
> consistent with the data.** This suggests a two-step procedure:
> 1. **First fit the model to real data**,
> 2. **then draw parameters from the resulting posterior distribution** to use in simulated-data
>    experimentation.
>
> **The statistical properties of such a procedure are unclear, but in practice we have found such
> checks to be helpful** — both for revealing problems with the computation or model, and for providing
> some reassurance when the simulated-data-based inferences do reproduce the assumed parameter value."
>
> This is exactly what was done in
> [[Multiple-Choice Exam - A Full Workflow Walkthrough#Section 4.4]], where $\mu_\beta, \sigma_\alpha,
> \sigma_\beta$ were set to their posterior medians from the real data while $\sigma_\gamma$ was set by
> hand to serve the experiment's aim.

**And then try to break it.** "To carry this idea further, we can try to break our method by coming up
with simulated datasets that cause our procedure to give bad answers. **This sort of
simulation-and-exploration can be the first step in a deeper understanding of an inference method,
which can be valuable even for a practitioner who plans to use this method for just one applied
problem.**"

### The argument from latent variables

> [!important] Why this is not optional (Ch. 6.3, pp. 110-111)
> "Simulated-data experimentation is a crucial component of our workflow because it is, arguably, **the
> only point where we can directly check that our inference on latent variables is reliable. When
> fitting the model to real data, we do not observe the latent variables — if we did, they would not be
> latent.** Hence we can only evaluate how our model fits the **observed** data.
>
> **If our goal is not merely prediction but estimating the latent variables, examining predictions only
> helps us so much. This is especially true of overparameterized models, where wildly different
> parameter values can yield comparable predictions.**"
>
> **The asymmetry, stated precisely:**
> > "**If a model is able to make good inference on data simulated from that very model, this provides no
> > guarantee that its inference on real data will be sensible. But if a model is unable to make good
> > inference on such simulated data, then it's hopeless to expect the model to provide reasonable
> > inference on real data. Simulated-data experiments provide an upper bound of what can be learned
> > about a latent process.**"
>
> The overparameterization point connects to
> [[Generative and Partially Generative Models#All models are only partially generative]] — many
> generative models, one estimator.
^wrn-latent-variable-argument

## Examples

> [!example] Measurement error in $x$ vs. $y$, learned by simulation (Figure 6.3, Ch. 6.3, pp. 111-112)
> **The known result:** in a regression of $y$ on $x$, **independent measurement error on $x$ attenuates
> the coefficient toward zero, but measurement error on $y$ does not** (Frost and Thompson 2000).
>
> **The verbal intuition:**
> - Starting from $y_i = a + bx_i + e_i$, adding independent error to $y$ gives
>   $y_i^* = y_i + \eta_i = a + bx_i + e_i + \eta_i$ — "**as long as $\eta$ is independent of $e$, we can
>   just combine them into a single error term.**"
> - Adding independent error to $x$ "**is spreading out the data on the horizontal axis, which reduces
>   the slope of the regression.**"
> - Either way we change the ordering of the data and reduce the correlation — "**but the effects on the
>   estimated regression slope are different.**"
>
> > **"But that's all words (and some math). It's simpler and clearer to do a simulation."**
>
> ```r
> set.seed(123)
> n <- 1000
> x <- runif(n, 0, 10)
> a <- 0.2
> b <- 0.3
> sigma <- 0.5
> y <- rnorm(n, a + b*x, sigma)
> fake <- data.frame(x,y)
> ```
> ```r
> fit_1 <- lm(y ~ x, data=fake)
> library("arm")
> display(fit_1)
> ```
> ("using the `display()` function in the `arm` package because it gives a slightly more readable output
> than the default summary from R." Check that the estimates are close, relative to their standard
> errors, to $a = 0.2$ and $b = 0.3$.)
>
> ```r
> sigma_y <- 1
> fake$y_star <- rnorm(n, fake$y, sigma_y)
> sigma_x <- 4
> fake$x_star <- rnorm(n, fake$x, sigma_x)
> ```
> ```r
> fit_2 <- lm(y_star ~ x,      data=fake)   # error in y only
> fit_3 <- lm(y      ~ x_star, data=fake)   # error in x only
> fit_4 <- lm(y_star ~ x_star, data=fake)   # error in both
> ```
>
> **Result:** a $2\times2$ grid of fitted lines. "**The slope changes with measurement error in $x$
> (bottom row) but not with measurement error in $y$ (right column).**"
>
> **The graphics lesson attached to it:** "This exercise shows the benefits of clear graphics, including
> little things like **making the dots small, adding the regression lines in red, labeling the individual
> plots, and using a common axis range for all four graphs.**"
>
> **And the pedagogical one:** "**And it was fast: we first did it live in class**, and this is an
> example of how you can explore a statistical issue directly using simulation, **giving a different sort
> of understanding than would come from a textbook and some formulas.**"

## Connections

- The three checks here are the informal precursor of the formal machinery in
  [[Simulation-Based Calibration - Overview]] — which the section explicitly defers to for subtle cases.
- "Behavior varies across the parameter space" is why the funnel and the multimodality case studies
  ([[Sampling Problems with Latent Variables - No Vehicles in the Park]],
  [[Challenge of Multimodality - Differential Equation for Planetary Motion]]) need targeted simulations rather than generic ones.
- Elevated from a debugging tool to a research method in
  [[Simulated-Data Experimentation as Virtual Replication]] (§10.5).

## See Also
- [[Simulating an Underlying Process, Data Collection, and Inference]] — the extended version, with
  treatment assignment and bias correction
- [[Four Modeling Scenarios]] — scenario 1 as the only rung with known truth
- [[Fit Fast, Fail Fast]] — the computational discipline that makes many simulations affordable
- [[Fitting and Validating Computation]] — the 2020 paper's treatment of fake-data simulation
