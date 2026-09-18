---
title: "Model Selection and Overfitting"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 9.5, pp. 167-169"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Model Selection Using Predictive Performance]]"
  - "[[Comparing Models Visually]]"
  - "[[Varieties of Bayesian Theory]]"
used_by:
  - "[[Stacking and Predictive Model Averaging]]"
  - "[[Statistical and Scientific Inference]]"
  - "[[The Replication Crisis and Multiple Levels of Variation]]"
  - "[[Q - Sample Splitting and Pre-registration as Cures for Forking Paths]]"
aliases:
  - "Double dipping"
  - "Post-selection inference"
  - "Severe tests vs preregistration"
---

# Model Selection and Overfitting

> [!summary]
> The book's honest confrontation with the central objection to iterative workflow: **the final model
> depends on the data, which "violates the principle of generative modeling."** The defense is
> conditional and precise — **if $M_1$ would have had Bayesian model averaging weight 0, then selecting
> $M_2$ gives exactly the same inference as joint inference over both, so there is no overfitting.** The
> danger is confined to the case of **many models with similar performance**. The chapter's boldest
> claim: **"a model whose assumptions withstood such severe tests is, despite being the result of
> data-dependent iterative workflow, more trustworthy than a preregistered model that has not been tested
> at all."**

## Overview

> [!warning] The objection, stated plainly (Ch. 9.5, p. 167)
> "**A potential issue with the proposed iterative workflow is that model improvement is conditioned on
> discrepancy between the currently considered model and the data, and thus at least some aspects of the
> data are used more than once. This 'double dipping' violates the principle of generative modeling in the
> sense that the final model being fit depends on the data.**
>
> **Even if we use cross validation to avoid double use of data when estimating the predictive performance,
> the act of selecting the model with the best predictive performance leads again to double use of data.**"
>
> Related: **the garden of forking paths** — "the idea that **different models would have been fit had the
> data come out differently**" (Gelman and Loken 2013). See [[Forking Paths and Bayesian Approaches]].
>
> "**We do not advocate selecting blindly the best fit among some such set of models. Instead, we describe
> a process of building to a more complex model taking the time to understand and justify each
> decision.**"
^wrn-double-dipping

## Main Content

### When overfitting is negligible — the model-averaging-weight argument

> [!definition] The condition under which selection is free (Ch. 9.5, pp. 167-168)
> "**If the number of models is small or if the best model is much better than the others, the overfit is
> likely to be negligible** (McLatchie and Vehtari 2024), **and double counting of the data is not a
> problem. If there are many models with similar performance, selecting just one model can lead to
> non-negligible overfitting**, and in such cases **model averaging or multiverse analysis** are needed."
>
> **The argument, in general terms:**
> > "Suppose we fit a model $M_1$, then a posterior predictive check reveals problems with its fit, so we
> > move to an improved $M_2$ … **But had the data been different, we would have been satisfied with
> > $M_1$. The steps of model checking and improvement, while absolutely necessary, represent an aspect of
> > fitting to data that is not captured in the likelihood or the prior.**
> >
> > **However, if the model $M_1$ is by far much worse than $M_2$, and we would always choose the improved
> > model $M_2$, then the outcome is the same as if we had initially considered both $M_1$ and $M_2$, and
> > the Bayesian model averaging weight of $M_2$ would be 1. In this case, there is no overfitting, and the
> > inference after model selection is exactly the same as with the joint inference.**"
>
> **The corollary that matters in practice:** "**It would often be worse to stick with the first bad model
> in fear of overfitting in model selection, especially as the safeness of the model selection can be
> diagnosed**" (McLatchie and Vehtari 2024).
^def-averaging-weight-argument

> [!important] The decision rule this yields
> | Situation | Verdict |
> |---|---|
> | $M_1$ has a **bug** or is in **strong conflict with external information** | "**that model should be discarded anyway**" |
> | Both pass checks, but $M_1$ **would have weight 0** in model averaging | "**it indicates that small changes in the data would not change our opinion about $M_1$, and we can as well drop it. Then it is relatively safe to continue with $M_2$**" |
> | $M_2$'s **estimated predictive performance is clearly better** | choose $M_2$ |
> | **Both would have nonzero weights, or similar predictive performance** | "**we need to be more careful, as then blind selection could lead to overfitting, especially when comparing many models**" |
>
> "Instead of directly integrating over the models, **the goal [of multiverse analysis] is to understand
> the differences and potential reasons for those in inference for the quantity of interest.**"

### A case where the argument does *not* rescue you

> [!example] The 99% Biden forecast (Gelman, Hullman, et al. 2020; Ch. 9.5, p. 168)
> > "**A few weeks after we released our first model of the election cycle for The Economist, we were
> > disturbed at the narrowness of some of its national predictions. In particular, at one point the model
> > gave Biden 99% chance of winning the national vote.** Biden was clearly in the lead, but 99% seemed
> > like too high a probability given the information available at that time. **Seeing this implausible
> > predictive interval motivated us to refactor our model, and we found some bugs in our code and some
> > other places where the model could be improved — including an increase in between-state correlations,
> > which increased uncertainty of national aggregates.** The changes in our model did not have huge
> > effects — not surprisingly given that we had tested our earlier model on 2008, 2012, and 2016 — **but
> > the revision did lower Biden's estimated probability of winning the popular vote to 98%.** This was
> > still a high value, but it was consistent with the polling and what we'd seen of variation in the polls
> > during the campaign."
>
> **Why this is the hard case:** "**The errors we caught were real, but if we had not been aware of these
> particular problematic predictions, we might have never gone back to check. This data-dependence of our
> analysis implies a problem with a fully Bayesian interpretation of the probability statements based on
> the final model.**"
>
> **And model averaging offers no escape:** "**In this case, model averaging would not resolve this
> problem: we would not want to average our final model with its buggy predecessor. We might want to
> average its predictions with those of some improved future model, but we can't do that either, as this
> future model does not yet exist!**"
>
> The same anomaly-in-the-tails problem as the Fivethirtyeight audit in
> [[Visualizing High-Dimensional Inference]] — here found in the authors' own model.

### Post-selection inference, and the alternative to it

> [!important] What the authors take from the post-selection literature (Ch. 9.5, p. 168)
> Taylor and Tibshirani (2015) warn of inference conditional on having "**searched for the strongest
> associations.**"
>
> "**In contrast, our workflow does not involve searching for optimally-fitting models or making hard model
> selection under uncertainty. Rather, we use problems with fitted models to reassess our modeling choices
> and, where possible, include additional information.**
>
> **For our purposes, the main message we take from concerns about post-selection inference** (Berk et al.
> 2013) **is that our final model should account for as much information as possible, and when we might be
> selecting among a large set of possible models, we instead**
> - **embed these in a larger model**,
> - **perform predictive model averaging**, or
> - **use all of the models simultaneously.**
>
> As discussed by Gelman, Hill, and Yajima (2012), **we expect that would work better than trying to
> formally model the process of model checking and expansion.**"
>
> Note the strategic retreat: rather than correcting inference for the selection, **avoid selecting.**
> Embedding in a larger model is [[Model Expansion - Predictive Consistency and Coherence|continuous model
> expansion]]; using all simultaneously is [[Stacking and Predictive Model Averaging|stacking]].

### The severe-tests claim

> [!important] Iterative workflow vs. preregistration (Ch. 9.5, p. 168)
> "**We also believe that our workflow enables practitioners to perform severe tests of many of the
> assumptions that underlie the models being examined** (Mayo 2018). **Our claim is that often a model
> whose assumptions withstood such severe tests is, despite being the result of data-dependent iterative
> workflow, more trustworthy than a preregistered model that has not been tested at all.**"
>
> This is the book's strongest position statement on the preregistration debate, and it is carefully
> hedged — "**often**," and conditional on the tests actually being severe in Mayo's sense (see
> [[Posterior Predictive Checking#Choosing test summaries]]). The claim is not that iteration is free of
> the forking-paths problem, but that **an untested model has a different and possibly worse problem.**
^imp-severe-tests

> [!important] The independent justification
> "**On a slightly different tack, iterative model building is fully justified as a way to understand a
> fixed, complex model. This is an important part of workflow, as it is well known that components in
> complex models can interact in complex ways.** For example, **Hodges and Reich (2010) describe how
> structured model components such as spatial dependence can produce complex interactions from linear
> effects.**"
>
> Under this framing the overfitting objection does not apply at all: **if the final model was fixed in
> advance, fitting the simpler models along the way is pure understanding, not selection.**

## Connections

- The model-averaging-weight argument is the precise sense in which
  [[Comparing Models Visually#Researcher degrees of freedom|the first researcher-degrees-of-freedom
  danger]] is bounded — and the second (mistaking a spread of fitted models for total uncertainty) is
  *not* addressed by it.
- Whether the difference is "much better" is exactly what
  [[Model Selection Using Predictive Performance#Three scenarios where the normal approximation fails|the
  three scenarios]] tell you whether you can judge.
- The retreat to "embed in a larger model" is
  [[Model Expansion - Predictive Consistency and Coherence]]; the retreat to "use all models" is
  [[Stacking and Predictive Model Averaging]].

## See Also
- [[Model Selection Using Predictive Performance]] — the elpd machinery whose selection this section audits
- [[Stacking and Predictive Model Averaging]] — what to do when several models are similarly good
- [[Forking Paths and Bayesian Approaches]] — the multiple-comparisons framing of the same problem
- [[The Replication Crisis and Multiple Levels of Variation]] — the position this section argues against
