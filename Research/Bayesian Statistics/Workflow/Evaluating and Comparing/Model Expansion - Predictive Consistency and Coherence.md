---
title: "Model Expansion - Predictive Consistency and Coherence"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 9.7-9.8, pp. 170-174"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Topology of Models]]"
  - "[[Stacking and Predictive Model Averaging]]"
  - "[[Joint Priors and Covariance Matrices]]"
used_by:
  - "[[Statistical and Scientific Inference]]"
  - "[[Models for Regression Coefficients - Student Grades]]"
  - "[[Model Building - Time-Series Decomposition for Birthdays]]"
aliases:
  - "Continuous model expansion"
  - "Predictively consistent priors"
  - "Against parsimony"
  - "Sieve of models"
---

# Model Expansion — Predictive Consistency and Coherence

> [!summary]
> Four ideas about how to grow a model. **Continuous expansion**: rather than choosing between $A$ and
> $B$, fit $\lambda A + (1-\lambda)B$. **Incremental construction**: add one feature at a time, expanding
> the synthetic-data simulation in parallel. **Predictive consistency**: use priors that keep the *prior
> predictive distribution* stable as the model grows — the R2D2 family keeps the marginal prior on $R^2$
> fixed as predictors are added. And an explicit argument **against parsimony**, endorsing Neal's rule:
> when a simple model beats a complex one, **"define a different complex model that captures whatever
> aspect of the problem led to the simple model performing well."**

## Overview

> [!definition] Continuous model expansion (Ch. 9.7, p. 170)
> "**If the data could be explained by model A or model B, rather than choosing between these alternative
> explanations, or performing discrete model expansion in which either A or B is true, we prefer to imagine
> a family of models,**
> $$\lambda A + (1-\lambda) B$$
> **that includes both.**"
^def-continuous-expansion

> [!example] Proximity vs. directional voting (Gelman 1994; Ch. 9.7, p. 170)
> In multiparty elections, political scientists consider two competing accounts:
> - **The proximity model** — "a voter will prefer the political party whose ideology and issue positions
>   are **closest** to that of the voter." Mathematically: **minimizes distance** between voter and party.
> - **The directional model** — "a voter prefers the party that **most strongly supports** the voter's
>   ideology and issue positions." Mathematically: **maximizes the dot product** of voter and party
>   positions relative to the origin.
>
> **"Rather than choosing between the models or supposing that some voters use proximity and others use
> direction, we prefer a model in which each voter cares about both, which could be expressed through a
> utility function that includes both these measures, with the relative weighting of proximity and
> direction depending on the voter.**"
>
> Note that this rejects **two** discrete framings, not one: not "which model is right," and not "a mixture
> over voters." The third option — **each voter weighting both, with the weight varying** — is a
> hierarchical continuous expansion.

## Main Content

### Building from simpler components

> [!important] Expansion with parallel simulation (Ch. 9.7, p. 170)
> "**If we know the eventual target model, or we think we know it, then correctly and reliably constructing
> the model benefits from beginning with a simple submodel which can then be expanded one feature at a
> time, with synthetic data simulation being expanded in parallel in order to test each new feature.**"
>
> **The side branches are not detours:** "**Building the target is often not a direct process. The
> incremental steps of model expansion can lead to side branches that explore alternative parameterizations
> and algorithms. These branches can take over the analysis, because they teach us about our models and
> sometimes help us discover better implementations that could have been missed, had we bitten off more than
> we could chew by trying to start with the full model.**"

> [!example] Incremental construction of a multilevel model (Ch. 9.7, pp. 170-171)
> **The setting.** A sample of students from multiple schools; the goal is to model trends and variation in
> school performance over several years. "**There are repeated measures on the units of student, classroom,
> school, and possibly teacher as well.** Partial pooling is a standard and useful approach for this kind of
> sample."
>
> **The difficulty.** "**Attempting to construct multilevel priors for all of these levels at once is
> difficult, even for the most experienced probabilistic programmers. And unique features of the sample
> might bring priors from previous projects into conflict with the data model.**"
>
> **The recipe.** "**By constructing an initial model with no pooling and then adding one level at a time,
> it is not only easier to get the code right, but it is also easier to appreciate the impact of each level
> on model performance. This eventually helps us interpret the results.**"
>
> The same three-fold payoff as in
> [[Multiple-Choice Exam - A Full Workflow Walkthrough#The eight-step learning ledger]]: correctness,
> understanding, and interpretation.

### Predictively consistent priors

> [!definition] Predictive consistency (Ch. 9.7, p. 171)
> "**If we have prior information about the likely values of the future observations, we should try to use
> priors that keep the prior predictive distribution similar when the model is expanded. We call such priors
> predictively consistent.**"
>
> **The canonical family: R2D2-type priors** (Zhang, Naughton, et al. 2022; Aguilar and Bürkner 2023; Kohns
> et al. 2025; Yanchenko, Bondell, and Reich 2025; Aguilar, Kohns, et al. 2025), which **"keeps the marginal
> prior distribution on $R^2$ similar when more predictors are added."**
>
> **Other examples:** the **regularized horseshoe** (Carvalho, Polson, and Scott 2009, 2010; Piironen and
> Vehtari 2017b) and **ARR2** (Kohns et al. 2025).
^def-predictive-consistency

This is the direct fix for the problem measured in
[[Influence of Likelihood and Prior#Weak priors on parameters, strong priors on predictions]] (Figure 8.13):
independent weak priors on 26 coefficients imply a prior favoring high $R^2$, and that implied prior
*changes* as predictors are added — so the "same" prior means something different in each model of a
sequence. **Predictive consistency is what makes a model sequence comparable.**

### Against parsimony

> [!important] The argument (Ch. 9.7, p. 171)
> "**There are good scientific reasons to expand models, to make them less simple. 'Parsimony' — the desire
> to explain using fewer parameters — makes more sense in some applications than others. In social science
> and many areas of engineering, if you can approximate reality with just a few parameters, fine. If you
> can use more parameters to fold in more information, that's even better.**
>
> **In general, and in statistics specifically, parsimony is not always a good thing.**"
>
> **Neal (1996), quoted in full:**
> > "**Sometimes a simple model will outperform a more complex model … Nevertheless, I believe that
> > deliberately limiting the complexity of the model is not fruitful when the problem is evidently complex.
> > Instead, if a simple model is found that outperforms some particular complex model, the appropriate
> > response is to define a different complex model that captures whatever aspect of the problem led to the
> > simple model performing well.**"
>
> **The ideal this points toward:**
> > "**Ideally, our models would be ever-expanding flowers that have within them the capacity to handle
> > small data sets (in which case, inferences would be pulled toward prior knowledge) or large data sets
> > (in which case, the model will automatically unfold to allow the data to reveal more about the
> > phenomenon under study). A single model could have a huge number of parameters, most of which would
> > barely be activated if sample size is not large.**"
^imp-against-parsimony

> [!warning] Why we don't do that
> "**In practice, our estimation procedures can easily lose control of large models when fit to small
> datasets. So we start with simple models that we understand, and then we complexify them as needed.**"
>
> **Two formalizations offered:**
> - "**This has sometimes been formalized as a 'sieve' of models**" (Grenander 1981) — a nested sequence of
>   model classes whose complexity grows with $n$.
> - "**It is also related to Cantor's diagonal argument from set theory: given any finite class of models,
>   there will be a dataset for which these models don't fit, thus requiring model expansion.**"
>
> The Cantor analogy is the sharpest statement of the [[Varieties of Bayesian Theory|M-open]] position in
> the book: **no finite model list can be adequate, as a matter of cardinality.**

## Examples

> [!example] Exercises 9.3-9.4 — the order of expansion matters (Ch. 9.8, p. 172)
> Using the multilevel logistic regression of Lei, Gelman, and Ghitza (2017) — vote preference given income
> (5-point), age (4 groups), ethnicity (4 groups), and state, with state-level average income and previous
> Republican vote:
>
> **Exercise 9.3 — path A:**
> (a) non-hierarchical logistic regression of vote on income (coded $-2,\dots,2$), then add the two
> state-level predictors; (b) allow individual income to **interact** with the state-level predictors and add
> indicators for the separate income categories; (c) add **varying intercepts** by state, then **varying
> slopes**; (d) add the remaining varying coefficients from the published model; (e) **graph the estimated
> income-voting pattern within Mississippi, Ohio, and Connecticut, and how it changes as terms are added.**
>
> **Exercise 9.4 — path B:** the same start and the same endpoint, "**but taking a different path, this time
> first putting in the multilevel structure with varying intercepts and then varying slopes, and only after
> that including the state-level predictors and their interactions.**"
> > **"Which of the two sequences of model expansion makes more sense for this problem?"**
>
> The pairing is the pedagogy: the topology of
> [[Topology of Models]] is a *partial* order, so there is more than one route from the simple model to the
> complex one — and the routes are not equally informative.

> [!example] Exercises 9.5-9.7 — one- vs. two-compartment pharmacokinetics (Ch. 9.8, pp. 172-173)
> **The data.** A patient orally receives 1200 mg at $t=0$; blood concentration (mg/L) is measured at 12
> times over 8 hours:
> $$y = (3.79, 5.80, 12.79, 15.52, 9.98, 18.65, 13.21, 13.91, 8.16, 4.81, 4.59, 2.23)$$
> $$t = (0.083, 0.167, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 4, 6, 8)$$
>
> **The one-compartment model (Ex. 9.5):**
> $$u_{\text{gut}}'(t) = -k_a u_{\text{gut}}(t), \qquad u_{\text{cent}}'(t) = k_a u_{\text{gut}}(t) - \frac{CL}{V_{\text{cent}}} u_{\text{cent}}(t)$$
> with $u_{\text{gut}}(0) = 1200$, $u_{\text{cent}}(0)=0$; concentration
> $c(t) = u_{\text{cent}}(t)/V_{\text{cent}}$; measurement model
> $y(t) \sim \text{lognormal}(\log c(t), \sigma)$.
>
> **Priors from other patients:**
> $$CL \sim \text{lognormal}(\log 10,\, 0.25), \quad V_{\text{cent}} \sim \text{lognormal}(\log 35,\, 0.25)$$
> $$k_a \sim \text{lognormal}(\log 2.5,\, 1), \quad \sigma \sim \text{normal}_+(0,1)$$
>
> **The two-compartment model (Ex. 9.6)** adds a peripheral compartment into which the drug diffuses slowly,
> introducing $Q$ (intercompartmental clearance, L/hour) and $V_{\text{peri}}$, with
> $Q \sim \text{lognormal}(\log 15, 0.5)$ and $V_{\text{peri}} \sim \text{lognormal}(\log 105, 0.5)$.
>
> **Exercise 9.7 — the punchline.** (a) Compare the two by approximate LOO-CV with `loo`. (b)
> > "**The one-compartment model can be considered as a special case of the two-compartment model with a
> > very strong prior. Explain, and discuss the possibility of an intermediate model for this problem.**"
>
> This is **continuous model expansion in a mechanistic setting**: the discrete "one vs. two compartments"
> question dissolves into a prior scale on $Q$, exactly as
> [[Topology of Models#The full definition, and the continuous dimension|priors bridging between models]]
> describes.

## Connections

- Continuous expansion is the reason the book prefers expansion to
  [[Stacking and Predictive Model Averaging|averaging]]: $\lambda A + (1-\lambda)B$ *is* a model, fit once,
  with $\lambda$ estimated — rather than two models weighted after the fact.
- Predictive consistency is what makes a sequence of models in
  [[Comparing Models Visually|Figure 9.1]] honest: without it, the "same" prior is silently different at
  each step.
- The against-parsimony argument is the modeling counterpart of
  [[Big Data Need Big Models]]'s claim that more data demand more model.

## See Also
- [[Topology of Models]] — the space expansion moves through
- [[Joint Priors and Covariance Matrices]] — the R2D2 and horseshoe families in detail
- [[Influence of Likelihood and Prior]] — the $R^2$ demonstration that motivates predictive consistency
- [[Iterative Model Improvement]] — the 2020 paper's treatment of model expansion
