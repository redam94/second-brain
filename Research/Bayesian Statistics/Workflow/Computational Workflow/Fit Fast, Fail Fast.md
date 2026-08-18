---
title: "Fit Fast, Fail Fast"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 12.1-12.2, pp. 209-211 (Figures 12.1-12.3)"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Four Modeling Scenarios]]"
  - "[[Initial Values, Adaptation, and Warmup]]"
  - "[[Chains, Iterations, and Effective Sample Size]]"
used_by:
  - "[[Failure Modes and Steps Forward]]"
  - "[[Modeling Ideas to Address Computing Problems]]"
  - "[[Fitting Simpler Models for Computational Purposes]]"
aliases:
  - "Fail fast"
  - "Death Star ellipse"
  - "Starting point dependence"
---

# Fit Fast, Fail Fast

> [!summary]
> A goal that the algorithms literature almost entirely ignores: **"There is a large literature on
> approximate algorithms to fit the desired model fast, but little on algorithms designed to waste as
> little time as possible on the models that we will ultimately abandon."** The illustration is an
> astronomer fitting an ellipse to an orbit that a **Death Star has perturbed** — no ellipse will fit, so
> the best possible outcome is a *quick* failure. The companion demonstration shows how much the
> **starting point** can matter even for a one-parameter logistic regression: R's `glm` returns 0.693,
> 71.9, or $1.5\times 10^{15}$ depending on where it starts.

## Overview

> [!definition] The principle (Ch. 12.1, p. 209)
> "**An intermediate goal in workflow is to be able to fail fast when fitting bad models.** Schlichting
> and Schneider (1983) and Gray (1985) introduced the concept of '**fail fast**' in the context of
> fault-tolerant computing; here we apply the idea to statistical workflow.
>
> **This can be considered as a shortcut that avoids spending a lot of time for nearly perfect inference
> for a bad model.**"
>
> **The gap in the literature:** "**There is a large literature on approximate algorithms to fit the
> desired model fast, but little on algorithms designed to waste as little time as possible on the models
> that we will ultimately abandon. It is important to evaluate methods on this criterion, especially
> because inappropriate and poorly fitting models can often be more difficult to fit.**"
^def-fail-fast

> [!example] The Death Star orbit (Figure 12.1, Ch. 12.1, pp. 209-210)
> **Setup.** "Suppose you are an astronomer several centuries ago fitting ellipses to a planetary orbit
> based on 10 data points measured with error."
>
> **Panel (a) — a well-behaved orbit.** "**Just about any algorithm will fit reasonably well.** For example,
> you could
> - **take various sets of five points and fit the exact ellipse to each, and then take the average**;
> - **fit an ellipse to the first five points, then perturb it slightly to fit the sixth point, then perturb
>   that slightly to fit the seventh**, and so forth;
> - **implement some sort of least squares algorithm.**"
>
> **Panel (b) — after the Death Star.** "**Convergence will be much harder to attain. If you start with the
> ellipse fit to the first five points, it will be difficult to take any set of small perturbations that
> will allow the curve to fit the later points in the series.**
>
> **But, more than that, even if you could obtain a least squares solution, any ellipse would be a terrible
> fit to the data. It's just an inappropriate model. If you fit an ellipse to these data, you should want
> the fit to fail fast so you can quickly move on to something more reasonable.**"
>
> "we are purposely choosing an unrealistic example to create a gross discrepancy between model and data"
> — but the point generalizes: **the models that are hardest to fit are disproportionately the models you
> should not be fitting.**

> [!important] The balance
> "**If there are computational problems in the Bayesian inference, it is often better to investigate the
> reasons quickly than hope that running the inference longer would eventually produce a useful result.
> There is need for balance, and premature optimization of the inference can also be more time-consuming
> than letting reasonable well-behaving computation run a bit longer.**"

## Main Content

### Discovering computational challenges by experimenting

> [!example] How much the starting point matters (Ch. 12.2, pp. 210-211, Figures 12.2-12.3)
> **The model** — a logistic regression with only an intercept, on 10 successes and 5 failures:
> ```r
> y <- rep(c(1,0), c(10,5))
> glm(y ~ 1, family=binomial(link="logit"))
> ```
> "the fit correctly returns a coefficient estimate of **0.693**, which indeed is the maximum likelihood
> estimate, as we can calculate exactly … as it is simply $\text{logit}(10/15)$."
>
> **Varying the start:**
> | Starting value | `glm` result |
> |---|---|
> | `start=0` | correct to several decimal places |
> | `start=2` | correct to several decimal places |
> | **`start=-2`** | **warning, estimate 71.9** |
> | **`start=5`** | **warning, estimate $1.5 \times 10^{15}$** |
>
> **Systematically** — a loop over starting points $(-10, -9.9, \dots, 10)$ shows that "**for a range of
> initial values near zero, the algorithm converges to the correct answer. Outside that range, it can
> produce extreme estimates.**"
>
> **The comparison with Stan's L-BFGS.** The same model in Stan:
> ```stan
> data {
>   int<lower=0> N;
>   array[N] int<lower=0, upper=1> y;
> }
> parameters {
>   real a;
> }
> model {
>   y ~ bernoulli_logit(a);
> }
> ```
> called as `model$optimize(data=list(N=length(y),y=y), init=draws_df(a=start_grid[i]))`.
>
> **Result:** "**Stan's optimizer under its default stopping rule gives the right answer to the third
> decimal place for this example starting from anywhere in the range we have explored.**" Compare the
> vertical axes of Figure 12.2: `glm` reaches $10^{12}$; L-BFGS stays within $(0.690, 0.695)$.
>
> **The fair qualification.** "**If you choose a good enough starting point, the iterative weighted least
> squares algorithm also homes right in to the solution** (Figure 12.3). **The `glm` solution is actually
> precise to additional decimal places, which is just a result of the default tolerance being set to a
> smaller value in that program. Stan's optimizer sets a looser default tolerance because for Bayesian
> inference we do not generally need extremely precise calculation of point estimates.**"
>
> "**We are not making any general claims here about the performance of these two algorithms. We are just
> demonstrating that the starting point can make a difference even in simple examples.**"
^ex-starting-point

> [!important] The recommendation that follows
> "**One of our general recommendations when fitting models using any software is to use reasonable
> starting points. For simple problems, default initial values can be fine, but in more difficult settings
> it is often worth the effort to specify where an algorithm should start.**"
>
> The Pathfinder approach — [[Variational Inference and Pathfinder]] — is demonstrated in
> [[Model Building - Time-Series Decomposition for Birthdays]] (Ch. 27).

> [!important] Why the "just experiment" framing matters
> "**Even for simple computations we can learn a lot by experimenting on the computer.**"
>
> This chapter's whole method is on display in that sentence: rather than reasoning about convergence
> theory, run a grid of starting values and plot the result. It is the same move as
> [[Designing Simulated-Data Experiments]] and [[Simulated-Data Experimentation as Virtual Replication]],
> applied to the *algorithm* rather than to the model or the estimator.

## Connections

- "Fail fast" is the computational expression of [[Four Modeling Scenarios|scenario 4]]: the point of the
  ladder is that programming errors "come up all the time," so the workflow should surface them cheaply.
- It is also why [[Chains, Iterations, and Effective Sample Size#How long to run]] compares long default
  runs to **premature optimization in software engineering**.
- The starting-point sensitivity here is the optimization counterpart of the MCMC initialization failures
  in [[Initial Values, Adaptation, and Warmup]].

## See Also
- [[Failure Modes and Steps Forward]] — the catalogue of what goes wrong and how to recognize it
- [[Modeling Ideas to Address Computing Problems]] — the folk theorem and its remedies
- [[Fitting Simpler Models for Computational Purposes]] — deliberately approximating to move faster
- [[Computational Troubleshooting]] — the 2020 paper's version of this material
