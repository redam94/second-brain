---
title: "The Replication Crisis and Multiple Levels of Variation"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 10.4, pp. 181-183"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Statistical and Scientific Inference]]"
  - "[[Constructing Priors for Effect Sizes]]"
  - "[[From Inference to Decision]]"
used_by:
  - "[[Simulated-Data Experimentation as Virtual Replication]]"
  - "[[Poststratification]]"
aliases:
  - "Replication crisis"
  - "Statistical significance filter"
  - "Type M errors"
  - "Interactions and generalization"
---

# The Replication Crisis and Multiple Levels of Variation

> [!summary]
> The diagnosis: **classical methods "devised to protect against random variation have not done their job,
> instead providing implicit endorsement to claims supported by weak evidence."** The mechanism is the
> **statistical significance filter** applied to small effects measured noisily — selection on significance
> inflates effect sizes, which makes future designs *more* underpowered, which requires *larger* observed
> estimates to publish. The connecting thread to the rest of the book: **"a key problem with many
> nonreplicable literatures is the prominence of causal claims that jump from scenario to scenario without
> recognition of the challenges of estimation of interactions."** No paradigm is immune, Bayes included.

## Overview

> [!important] The diagnosis (Ch. 10.4, pp. 181-182)
> "**The social, behavior, and medical sciences have seen widespread problems in computational
> reproducibility, publication bias, and research waste, showing that classical statistical methods devised
> to protect against random variation have not done their job, instead providing implicit endorsement to
> claims supported by weak evidence**" (Klein, Ratliff, Vianello, et al. 2022; Errington et al. 2021; Song et
> al. 2009; Glasziou and Chalmers 2018).
>
> "**The entire chain of decisions leading up to a result needs the same transparency and logical
> justification as any core statistical algorithm. The way that statistical analysis is incorporated into
> research is not always, nor even often, clearly justified.**"

> [!warning] No paradigm is immune
> "**These two problems arise from similar deficits in knowledge and practice, and no statistical paradigm or
> approach is immune to them. The Bayesian approach to data analysis provides a coherent and flexible way to
> handle uncertainty in data and model parameters, but it is important that models be checked.**
>
> Recent developments in **practical probabilistic programming languages and automatic inference engines such
> as Stan, PyMC3, Pyro, TensorFlow Probability, and Turing.jl have made it easier to specify and fit Bayesian
> models, but this still leaves us with many options regarding constructing, evaluating, and using these
> models**, along with many remaining challenges in computation.
>
> **Using Bayesian inference to solve real-world problems requires not only statistical skills, subject
> matter knowledge, and programming, but also awareness of the decisions made in the process of data
> analysis.**"

## Main Content

### The mechanism

> [!definition] The significance filter and its feedback loop (Ch. 10.4, p. 182)
> "**A standard mode of inference in biological, behavioral, and social science is to establish points of
> agreement using statistical significance. But this approach fails in a world in which measurements are
> noisy, and effects are small: selection on statistical significance leads to effect sizes that can be
> drastically overestimated**" (Gelman and Carlin 2014).
>
> "**The current replication crisis in some areas of science arises in part from the ill effects of null
> hypothesis significance testing being used to study small effects with noisy data** (Gelman 2018c), **and
> various intuitions about measurement and bias are wrong** (Loken and Gelman 2017).
>
> **In such settings, apparent success comes easily, but genuine results require a more serious connection
> between theory, measurement, and data.**"
>
> **The self-reinforcing loop**, spelled out in Exercise 10.2: "within any study, a researcher can have many
> choices of what to analyze, and **what gets reported are estimates that are more than two standard errors
> from zero. This causes a systematic overestimation of effect sizes, and then later researchers are
> overconfident when planning new studies: expecting large effects, they are comfortable with noisy designs
> and measurements, which in turn leads to large standard errors so that estimates must be very large in
> absolute value to be reported, leading to an expectation of future large effects, and so forth.**"
^def-significance-filter

> [!important] The methodological consequence
> "**Given that those appropriate models for data are not known, it is important to move among different
> modeling possibilities in a scientifically principled and transparent way.**"
>
> "**What is needed is a guiding scientific workflow that provides prompts, heuristics, and tools for moving
> among and analyzing the elements of a scientific project. A scientific workflow reduces error and enhances
> impact by**
> - **refining theory**,
> - **logically connecting theory to design and analysis**,
> - **targeting results to scientifically relevant counterfactuals and descriptions**, and
> - **transparently communicating uncertainty and risk.**
>
> **The challenge is to integrate leaps of intuition with measurement and the design of statistical
> models.**"

### The authors' own work along these lines

> [!example] Seven contributions, briefly (Ch. 10.4, p. 182)
> | Work | Contribution |
> |---|---|
> | Smaldino and McElreath (2016) | "**model the process of hypothesis exploration and testing within a research community**" |
> | Minocher et al. (2021) | "**audit computational reproducibility within the scientific literature on social learning**" |
> | Gelman and Carlin (2014); Gelman (2015) | "**examine the roles in the replication crises of different kinds of error within different types of models**" |
> | Weber et al. (2018) | in drug development, "**our research has moved beyond deterministic questions such as, 'Is this new drug different from a competitor?' to quantify the ways that the drugs act differently in the body**" |
> | Vasishth et al. (2018) | seven direct replication attempts in linguistics: "**the published claims are so noisy that even non-significant results are fully compatible with them**" |
> | Gelman and Geurts (2017) | neuropsychology |
> | Gelman, Skardhamar, and Aaltonen (2020) | criminology |
>
> **The large-sample lesson from Vasishth et al.**, worth stating separately: "**We also demonstrate the
> contrast between such small-sample studies and a larger-sample study; the latter generally yields a less
> noisy estimate but also a smaller effect magnitude, which looks less compelling but is more realistic.**"

### The connection to interactions and generalization

> [!important] Why MRP belongs in a chapter about replication (Ch. 10.4, pp. 182-183)
> "**We use multilevel regression and poststratification for generalizing across people, time, and scenarios.
> This work requires the development of priors for these structured models and directly connects to the
> replication crisis in psychology, economics, medicine, and other sciences, as**
>
> > **a key problem with many nonreplicable literatures is the prominence of causal claims that jump from
> > scenario to scenario without recognition of the challenges of estimation of interactions**
>
> (Gelman 2015). **As discussed in Section 7.2, models of treatment effect variation are important when
> considering how to generalize to new people, new time periods, and new scenarios.**"
>
> This is the chapter's tightest link back to the rest of the book. A claim established in one context and
> asserted in another is an **interaction estimate in disguise** — and interactions require far more data
> than main effects. The machinery for handling this honestly is
> [[Poststratification]] and [[Causal Inference as Generalization]]'s SATE/PATE distinction.
^imp-interactions-generalization

## Examples

> [!example] Exercise 10.1 — a subtle problem with signal-to-noise priors (Ch. 10.6, p. 189)
> **(a)** For a new study modeled as a draw from the OSC corpus, with estimate $\hat\theta$ and standard error
> $s$: give the posterior mean and sd for the signal-to-noise ratio **under the flat prior and under the
> van Zwet and Gelman (2022) prior**, for $\hat\theta = 0,\, 0.5s,\, s,\, 2s$.
>
> **(b)** The conceptual catch:
> > "**A slightly disturbing thing about setting a prior on the signal-to-noise ratio is that it implies a
> > prior on the effect itself that is dependent on the precision of measurement and sample size of the new
> > study. Explain what is happening here and why it is a problem and discuss why this could still make
> > sense as a modeling choice. How could the prior be set up so that it is part of a fully generative
> > model?**"
>
> The tension is real: $\theta/s \sim \pi$ means $\theta \sim s\cdot\pi$, so **a larger study implies a
> smaller prior on the effect** — which is backwards as a statement about the world, yet defensible as a
> statement about *the population of studies people choose to run*. See
> [[Constructing Priors for Effect Sizes]].

> [!example] Exercise 10.2 — simulating the significance filter to steady state (Ch. 10.6, p. 190)
> **(a)** "**Construct a simulation study in which there is some population of effects which are studied by
> researchers, each of whom has a goal of 80% power (which would require a signal-to-noise ratio of 2.8),
> and then only the statistically significant estimates are reported, which influences the anticipated effect
> sizes for future studies, and so forth. Run this process to steady state. Display the results and discuss
> what you have learned.**"
>
> **(b)** "**What if all results are reported, not just those that exceed two standard errors, or what if a
> looser or stricter significance threshold, such as 1 or 3 standard errors, is used?**"
>
> Note that this exercise makes the feedback loop the *object of simulation* — a scientific-community-level
> instance of [[Designing Simulated-Data Experiments]].

## Connections

- The significance filter is the systemic version of the individual-study argument in
  [[From Inference to Decision]]: thresholding both **overestimates what passes** and **discards what
  doesn't**.
- "No statistical paradigm is immune" is why the book's answer is workflow rather than a change of
  paradigm — the same conclusion as [[There Is No Safe Haven]].
- The prescription — simulate your estimator before trusting it — is delivered in
  [[Simulated-Data Experimentation as Virtual Replication]].

## See Also
- [[Statistical and Scientific Inference]] — degenerate analyses as another route to unreliable literature
- [[Simulated-Data Experimentation as Virtual Replication]] — the cheap substitute for replication
- [[Constructing Priors for Effect Sizes]] — exaggeration factors quantified
- [[Forking Paths and Bayesian Approaches]] — the researcher-degrees-of-freedom side of the same problem
