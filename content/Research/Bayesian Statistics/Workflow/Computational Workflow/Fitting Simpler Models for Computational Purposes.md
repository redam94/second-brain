---
title: "Fitting Simpler Models for Computational Purposes"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 13.5, pp. 244-245"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Approximate Algorithms and Approximate Models]]"
  - "[[Modeling Ideas to Address Computing Problems]]"
  - "[[Fit Fast, Fail Fast]]"
used_by:
  - "[[Comparing Models Visually]]"
  - "[[Debugging a Model - World Cup Football]]"
aliases:
  - "Model simplification"
  - "Pinning parameters"
  - "Bring the model to the computation"
---

# Fitting Simpler Models for Computational Purposes

> [!summary]
> **"If you can't bring the computation to the model, sometimes you can bring the model to the
> computation."** Eight ways to simplify — from swapping in a normal distribution to pinning
> hyperparameters to fitting on a data subset — each of which is a deliberate, temporary weakening of the
> model in exchange for a fit. The section is unusual in devoting equal space to **why each simplification
> can backfire**: restricting functional forms can make the data *harder* to fit; strong priors help when
> data agree with them and cause multimodality when they don't; pre-processing removes "**the guiderails
> supplied by the now-removed intermediate data.**"

## Overview

> [!definition] Eight simplifications (Ch. 13.5, pp. 244-245)
> **1. Use a normal model even when the variable is bounded or discrete.**
> "**Computation can be much faster for the normal distribution, and the difference in posterior inference
> for quantities of interest can be small**" — see Chapters 18 and 23. This is the "start normal, check
> later" advice of [[A Data Model Is Not Just a Likelihood#When a wrong data model still works]].
>
> **2. Remove components of the model.**
> "Taking away a nonlinear term that is making a model hard to fit; or changing a varying-intercept,
> varying-slope regression $y_i = a_{j[i]} + b_{j[i]}x_i + \text{error}_i$ **to a simpler model where only the
> intercept varies**, $y_i = a_{j[i]} + bx_i + \text{error}_i$; **or simplifying a measurement-error model by
> considering some latent parameters to be measured exactly.**"
>
> **3. Pin parameters to fixed values.**
> "**The above examples can be considered special cases of this approach, where certain parameters or
> hyperparameters have been pinned to zero. But it can also work to pin a hyperparameter to some pre-chosen
> nonzero value. For example, pre-setting the group-level variance in a hierarchical model removes a possible
> funnel problem in computation.**"
>
> **4. Constrain parameters to avoid difficult regions.**
> "**Restricting variance components in a mixture model to fall within some fixed ratio, bounding group-level
> variance parameters away from zero, or bounding coefficients to a reasonable range. These can be considered
> as approximations to fully informative prior distributions, or, in settings where no such prior information
> is available, they correspond to restrictions of the model being fit.**"
>
> **5. Use strong priors as soft constraints.**
> "**If these priors represent a model you want to fit, this is just Bayesian inference. The idea here is to
> tighten the prior for computational reasons, thus knowingly fitting a model that is more restrictive than
> you might like in order to attain more stable computations.** For example, using $\theta \sim
> \text{normal}(0, 0.1)$ **is more flexible than pinning $\theta$ to zero, while still constraining the model
> in a way that could avoid some difficult geometry.**"
>
> **6. Pre-process the data.**
> "**Replacing a large number of related regression predictors by a combined score obtained by averaging
> scaled predictors or a more formal procedure such as factor analysis, or replacing a multivariate outcome
> by some sort of total score. In either case, the pre-processing reduces the dimensionality of the model and
> can make the remaining parameters more clearly identified from data.**"
>
> **7. Change the functional form to enable closed-form computation.**
> "**Either of the entire posterior distribution or, more usually, certain posterior conditional
> distributions, so that certain parameters or latent variables can be analytically integrated out, yielding
> a lower-dimensional posterior.** In the era before routine use of posterior simulation, the usual Bayesian
> practice was to use conjugate models … **With modern probabilistic programming languages we can put
> together models in whatever way we want and there is no restriction to conjugacy, but when computation
> becomes challenging it can make sense to use these classes of distributions, while recognizing that they
> reduce our modeling flexibility.**"
>
> **8. Fit the model to a subset of the data.**
> "**This is related to the divide-and-conquer algorithms mentioned in 13.4, but in this case we are
> suggesting just the 'divide' part and not the 'conquer.' Using only some of the data is inefficient but can
> reduce the size of a problem enough that quick inferences can then be used as a starting point for further
> investigation.**"
^def-eight-simplifications

## Main Content

### Simplification as understanding, not just as speed

> [!important] The dual value (Ch. 13.5, p. 245)
> "**Beyond their value in computational workflow, simplified models can be useful in their own right as
> steps in our understanding of more complicated models. And after fitting a simplified model with success,
> this can motivate the effort to go back and loosen its restrictions to aim for something closer to the
> original model you wanted to fit.**"
>
> Which is [[Comparing Models Visually|reason 1 for fitting multiple models]] and the "meeting in the middle"
> debugging strategy of
> [[Modeling Ideas to Address Computing Problems#Debugging strategy 2 — meet in the middle]] — the
> simplifications you make for computational reasons are the same ones you would make for understanding.

### When each simplification backfires

> [!warning] Four ways simplification makes things worse (Ch. 13.5, p. 245)
> "**But simplifications do not always work.**
>
> **1. Restricted functional forms can fit the data worse, which makes computation harder.**
> "**Restricting the family of functional forms in a model can make it more difficult to fit the data, which
> in turn can make computation more challenging. When there is no choice of parameters that fits the data
> well, algorithms can find it challenging to attain the best fit among the class of models that remain and
> can have difficulty moving between options.**" — the Death Star ellipse of
> [[Fit Fast, Fail Fast]] (Figure 12.1).
>
> **2. Constraints and strong priors cut both ways.**
> "**Parameter constraints or strong priors can speed computation when the data are consistent with these
> constraints but can cause multimodality and other computational challenges when there is conflict between
> prior and likelihood.**" — see [[Tail Behavior and Prior-Likelihood Conflict]].
>
> **3. Pre-processing removes intermediate guiderails.**
> "**Pre-processing data makes a problem simpler but can make it more difficult for iterative algorithms to
> find good solutions without the guiderails supplied by the now-removed intermediate data.**"
>
> **4. Subsetting weakens the likelihood.**
> "**Fitting to a subset of data should allow computation to go faster at each step, but then there is less
> information in the likelihood, so the posterior distribution is less constrained, and there are more ways
> that the computation can get lost in parameter space.**"
^wrn-simplification-backfires

Point 4 is the one most likely to surprise. It is the same result as
[[Modeling Ideas to Address Computing Problems#Remedy 4 — Adding data]] (Figure 12.15) read backwards:
**more data straighten out the geometry**, so removing data can create the funnel you were trying to
escape.

> [!important] The stated scope of the advice
> "**Our claim is not that model approximations should not be tried; rather, we are saying that altering the
> model is one set of strategies to be tried when you [can't] immediately fit the model you would like to
> fit.**"

### The honest bookkeeping requirement

Simplifications 3, 4, and 5 all amount to **adding information the data did not supply**. The warning
attached to zero-avoiding priors in
[[Modeling Ideas to Address Computing Problems#Remedy 3 — Adding prior information]] applies with equal
force here:

> "**If we use a restrictive prior to speed computation, we should make it clear that this is information
> being added to the model or make prior sensitivity analysis to check whether the added information changes
> substantially the conclusions for the quantities of interest.**"

The tool for that check is [[Influence of Likelihood and Prior|power-scaling sensitivity analysis]], which
tells you directly whether a computationally-motivated tightening is doing inferential work.

## Connections

- Every item on the list is a move **downward** in the
  [[Topology of Models|topology of models]] — which means the simplified fit is not discarded work but a
  legitimate node to compare against, as in [[Comparing Models Visually|Figure 9.1]].
- Simplifications 1 and 7 are exactly the "**normal model even if $y$ is discrete**" and "**analytically
  integrate out**" cases discussed as *modeling* decisions in
  [[A Data Model Is Not Just a Likelihood]] — the same operations, arrived at from computational rather than
  statistical motives.
- The whole section is [[Fit Fast, Fail Fast]] carried to its conclusion: if a fast fit is not available for
  this model, change the model until one is.

## See Also
- [[Approximate Algorithms and Approximate Models]] — approximating the algorithm rather than the model
- [[Modeling Ideas to Address Computing Problems]] — the folk theorem and reparameterization
- [[Divide-and-Conquer Algorithms]] — the "conquer" half of simplification 8
- [[Debugging a Model - World Cup Football]] — a case study comparing continuous and discrete data models
