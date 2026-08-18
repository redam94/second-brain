---
title: "Four Modeling Scenarios"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 2.3-2.5, pp. 22-24"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Foundations"
doc_type: textbook
depends_on:
  - "[[From Inference to Data Analysis to Workflow]]"
  - "[[Varieties of Bayesian Theory]]"
used_by:
  - "[[Fit Fast, Fail Fast]]"
  - "[[Designing Simulated-Data Experiments]]"
  - "[[Modeling as Software Development]]"
  - "[[Simulated-Data Experimentation as Virtual Replication]]"
aliases:
  - "Ladder of modeling scenarios"
  - "Scenario 1 2 3 4"
  - "Psychological struggles"
---

# Four Modeling Scenarios

> [!summary]
> A four-rung ladder from cleanest to most problematic, which replaces the unanswerable question "is
> my model true?" with the actionable question "which scenario am I in right now?" The key practical
> claim: **data analysis typically starts at scenario 3 (bad model) and works up to scenario 2 (good
> enough model), while dipping into scenario 4 (programming error) constantly and scenario 1 (fit to
> simulated data) deliberately.** The chapter closes with an unusual and important section on the
> psychology of iterative analysis.

## Overview

The ladder is a statement about **the model as written**; computing challenges are a separate axis.

> [!definition] The four scenarios (Ch. 2.3, p. 22)
> 1. **The statistical model being fit includes the process that generated the data.** Difficulties
>    can still arise even in this cleanest case, from weakly informative observed data or
>    computational problems.
> 2. **The class of models does not contain the "true model"** (to the extent it makes sense to speak
>    of such a thing), "but it is still good in the sense of being able to reproduce important aspects
>    of the data and give reasonable inferences."
> 3. **The fitted model is bad** — missing or poorly characterizing some important aspect of the data
>    or the underlying process.
> 4. **There is a conceptual or programming error** so that the coded model does not correspond to the
>    statistical model the user was trying to fit.
^def-four-scenarios

## Main Content

### Where each scenario actually occurs

| Scenario | When you are in it | What to do |
|---|---|---|
| **1 — model contains the truth** | "almost never applies to real data" but is the *defining condition* of simulated-data experimentation | The only setting in which you can validate computation against known truth: [[Designing Simulated-Data Experiments]], [[Simulating an Underlying Process, Data Collection, and Inference]], [[Simulated-Data Experimentation as Virtual Replication]] |
| **2 — good enough model** | "where we would like to end up, after successfully evaluating a model's fit to data" | Evaluate with [[Posterior Predictive Checking]] and [[Cross Validation Checking]] |
| **3 — bad model** | "often a necessary part of data analysis" — both because we fumble through many attempts, and because we *want* simpler alternatives to compare against | [[Topology of Models]]; the comparison itself is the point |
| **4 — programming error** | "comes up all the time" | Recognize it sooner rather than later — the **"fit fast, fail fast"** principle, [[Fit Fast, Fail Fast]] |

> [!important] The trajectory, not the destination
> "In data analysis we typically start with scenario 3 (bad model) and would like to work our way up
> to scenario 2 (good model), occasionally dipping into scenario 4 (programming error) and scenario 1
> (model fit to simulated data and thus known to be correct)."
>
> Note the asymmetry: scenario 1 is not a destination but a *diagnostic detour* you deliberately take.

### Why you cannot start at scenario 2

Two reasons, both structural rather than about skill:

1. **Don't bite off more than you can chew.** "When we try to write down the desired final model all
   at once, there are typically so many parts that can go wrong that it can be difficult to fit the
   model in the first place. Even if it is possible to get a posterior, **it can be hard to know how
   much to trust it.**" Building up from simpler models can also mean *simplifying the data* — ignoring
   hierarchical structure, or discarding data points that don't fit well, with the explicit intention
   of including them later when the model is ready.
2. **We often don't know what we want until we get close.** Writing the final model would not be
   possible even if we could fit it immediately. This can come from unfamiliarity with the theory and
   context, "but just as often it reflects **the dynamic nature of the processes that we are trying to
   analyze.**"

> [!example] Two illustrations of reason 2 (Ch. 2.3, p. 23)
> - **Polling.** Every election is unique. A polling expert develops tools through experience, but
>   applying them in any new context is complex and dynamic.
> - **A designed experiment.** After the planned analysis, diagnostics indicate strong heterogeneity
>   in an unanticipated direction — say, across lab technicians. "You could throw out your data due to
>   a bad analysis plan. But **iterative model building can be a superior choice.**"

### How the scenarios change your response to a fit

> [!important] Reading the fitting behavior as evidence about which scenario you are in
> - **When a fit runs to convergence:** check the procedure with simulated data to make sure it can
>   recover parameters (to the stated accuracy) when the model lines up with the true data-generating
>   process — i.e. verify scenario 1 works before trusting scenario 2. Then check fit to data, hoping
>   you are closer to scenario 2 than 3.
> - **When the fitting algorithm is slow to converge:** investigate immediately, because "it is likely
>   that we are in **scenario 3 or 4**." See [[What to Do About Convergence Problems]].
>
> **The temptation to resist:** "It can be tempting to take a hopeful approach and assume you are
> already in scenario 2 and that all that is needed are some tweaks to the settings of the fitting
> algorithm, but in our experience **it is better to be active in looking for problems, building the
> scaffolding necessary to uncover errors** and ultimately build confidence in your inferences."

**The hardest case to diagnose:** "the worst models can have identification problems which makes them
difficult to fit and can make iterative algorithms take a long time before drifting off to infinity or
converging to some unreasonable value." This is exactly the failure demonstrated in
[[Multiple-Choice Exam - A Full Workflow Walkthrough]] and catalogued in
[[Failure Modes and Steps Forward]].

The operating stance that follows: **treat all models as provisional and all inferences as conditional
on assumptions**, work to understand fitted models and compare them, and "spend a minimal amount of
time waiting for bad models (and, worse, misprogrammed models) to run."

### Psychological struggles

This section is unusual in a statistics textbook and the authors treat it as a genuine workflow
concern, not a pep talk.

> [!important] The core problem (Ch. 2.4, p. 23)
> "A core problem in statistical workflow is **the management of expectations and the feeling that
> progress is being made.**"

- **Expect the rough reality.** "Going into a data analysis, you should expect this rough reality,
  instead of the fantastical immaculate and logical analyses too often presented in publications and
  reports. **Each of those analyses was similarly iterative and looping in its original form before
  being rationalized and rewritten for publication.**"
- **Iteration is learning, not failure.** You may be learning about the model, the data, the
  computation, or their interaction. "Sometimes the things you learn or realize might feel obvious in
  retrospect, which can make it feel like it was an embarrassing mistake. Experience tends to reduce
  some of these, but **that noticing and learning in analysis is the mark of a good data analyst, not
  a bad one.**"
- **A design criterion for workflow tools.** "Each step in a workflow should be clearly associated
  with diagnostics and examples. As an analyst, you should expect to often feel confused but **never
  completely lost. Resolving problems should not depend on unfathomable inspiration.**" Research
  software development "resembles stumbling uphill more than a smooth ascent."
- **Aim at understanding, not at a result.** "Iterative workflow is about obtaining a greater
  understanding. It is not about reaching a particular conclusion or finding a particular result." Key
  insights should be **documented with associated diagnostics and examples** so that you and the
  reader can see how and why decisions were made.

> "We've made all of the mistakes we discuss, and we want to help you recognize them and recover
> gracefully."

## Examples

> [!example] Exercise 2.4 — clustering and the safe-looking analysis (Ch. 2.5, p. 24)
> **Setup.** Two treatments applied to cell cultures, six cultures per dish, five dishes per treatment
> in a simple unpaired design. Two analyses are considered:
> - **(i)** $n = 30$ per treatment, assuming no within-dish dependence, so all 30 observations are
>   independent data points.
> - **(ii)** $n = 5$ per treatment, using each dish's mean of six outcomes and modeling the 5 dishes
>   as independent.
>
> The estimated treatment effect is **identical** under both — it is the difference of averages. The
> only difference is whether the measurements are treated as clustered.
>
> **The researcher's reasoning.** Method (i) gives much smaller standard errors (30 vs. 5
> observations). Method (ii) "seems like the safer approach as it should work even if there are
> within-dish correlations or dish effects." The cultures are far enough apart not to interact and
> there is no reason to suspect dish effects — but the data *are* clustered, so dish effects are
> possible, and the dishes themselves are reasonably taken as independent.
>
> **Why this is the right exercise for this chapter.** It is [[There Is No Safe Haven]] in miniature:
> the "safe" clustered analysis throws away information, the "efficient" unclustered analysis assumes
> away a real possibility, and the resolution — part (b) asks you to *write a Bayesian model* — is a
> hierarchical model that estimates the dish-level variance rather than setting it to 0 or $\infty$.
> Compare the no-pooling/complete-pooling framing in
> [[Why Bayes - Benefits, Costs, and Borders#Bayesian modeling as hierarchical modeling]].

> [!example] Exercises 2.1-2.3 — auditing workflows (Ch. 2.5, p. 24)
> - **2.1** Take a published applied Bayesian analysis and identify which steps of Figure 2.1 were
>   explicitly performed; which were done *implicitly*?
> - **2.2** Reflect on your formal statistics education: how does this workflow align or contrast with
>   how you were taught?
> - **2.3** Write down your own workflow for a particular project you have worked on — from problem
>   formulation through design, collection, mathematical modeling, analysis, diagnostics, validation,
>   conclusions.

## Connections

- The ladder makes [[Designing Simulated-Data Experiments]] structurally necessary rather than
  optional: scenario 1 is the *only* rung where truth is known, so it is the only rung on which
  computation can be validated.
- Scenario 4 is the target of [[Fit Fast, Fail Fast]] and [[Modeling as Software Development]].
- The M-open commitment of [[Varieties of Bayesian Theory]] is what makes scenario 1 a fiction for
  real data and scenario 2 the realistic goal.
- "Psychological struggles" reappears operationally in [[Iterative Model Improvement]] — when to stop.

## See Also
- [[From Inference to Data Analysis to Workflow]] — Figure 2.1, in which these scenarios are the
  implicit states
- [[Multiple-Choice Exam - A Full Workflow Walkthrough]] — an analysis that visibly passes through all
  four scenarios
- [[Simulated-Data Experimentation as Virtual Replication]] — scenario 1 as a research tool in its own right
