---
title: "Stacking and Predictive Model Averaging"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 9.6, pp. 169-170"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Model Selection Using Predictive Performance]]"
  - "[[Model Selection and Overfitting]]"
  - "[[Varieties of Bayesian Theory]]"
used_by:
  - "[[Model Expansion - Predictive Consistency and Coherence]]"
  - "[[Models for Regression Coefficients - Student Grades]]"
aliases:
  - "Stacking"
  - "Bayesian model averaging"
  - "Bayes factors instability"
  - "projpred"
---

# Stacking and Predictive Model Averaging

> [!summary]
> Why the book prefers **stacking** over Bayesian model averaging by marginal likelihood, with a
> devastatingly concrete argument: **changing the prior from $\text{normal}(0,10)$ to
> $\text{normal}(0,100)$ divides the marginal likelihood by roughly $10^k$ while leaving all predictions
> essentially unchanged.** Stacking is reframed as **pointwise model selection** — "when the first model
> outperforms the second 20% of the time, the stacking weights will be close to 0.2 and 0.8" — which makes
> it a **diagnostic of heterogeneity** and thus a step toward a better hierarchical model rather than an
> end in itself. For variable selection specifically, **projection predictive selection** avoids the
> overfitting that searching a large model space usually causes.

## Overview

> [!definition] When to select, when to combine (Ch. 9.6, p. 169)
> "**When performing model comparison, if one of the models is much better than the others, we can safely
> select that model**" (McLatchie and Vehtari 2024).
>
> "**If there is non-negligible uncertainty in the comparison** (Sivula et al. 2025; McLatchie and Vehtari
> 2024), **we should not simply choose the single model with the best cross validation results, as this
> would discard all the uncertainty from the cross validation process. Instead, we can maintain this
> information and either**
> - **do multiverse analysis for the models with similar good performance** (Riha et al. 2024), or
> - **use stacking to combine inferences using a weighting that is set up to minimize cross validation
>   error**" (Yao, Vehtari, Simpson, et al. 2018a).
^def-when-to-stack

## Main Content

### Why not Bayes factors

> [!warning] The $10^k$ argument (Ch. 9.6, p. 169)
> "**We have found stacking to perform better than traditional Bayesian model averaging in many
> examples** (Yao, Vehtari, Simpson, et al. 2018a). **Model averaging using marginal likelihoods (like
> Bayes factors) can depend strongly on aspects of the model that have minimal effect on predictions.**
>
> For example, **for a model that is well informed by the data and whose parameters are on unit scale,
> changing the prior on parameters from $\text{normal}(0, 10)$ to $\text{normal}(0, 100)$ will divide the
> marginal likelihood by roughly $10^k$ (for a model with $k$ parameters) while keeping all predictions
> essentially the same.**"
>
> **And misspecification makes it worse:** "**In the case of model misspecification, model weights based on
> marginal likelihoods can be highly unstable even if the computation is perfect**" (Oelrich et al. 2020).
>
> The two objections are distinct and both fatal for the book's purposes: the first says Bayes factors are
> **sensitive to something predictions don't care about**; the second says they are **unstable in exactly
> the [[Varieties of Bayesian Theory|M-open]] setting the book operates in.**
^wrn-bayes-factor-sensitivity

**Two further advantages of stacking:** "**stacking takes into account the joint predictions and works well
when there are a large number of similar but weak models in the candidate model list.**"

### Stacking as pointwise model selection

> [!definition] What stacking weights actually mean (Ch. 9.6, p. 169)
> "**In concept, stacking can be viewed as pointwise model selection. When there are two models and the
> first model outperforms the second model 20% of the time, the stacking weights will be close to 0.2 and
> 0.8.**"
>
> **The consequence that makes stacking a diagnostic:**
> > "**In light of this, stacking fills a gap between independent-error oriented machine learning validation
> > and the grouped structure of modern big data. Model stacking is therefore also an indicator of
> > heterogeneity of model fitting, and this suggests we can further improve the aggregated model with a
> > hierarchical model, so that the stacking is a step toward model improvement rather than an end to
> > itself.**"
>
> If model $A$ wins on some observations and model $B$ on others, **that pattern is information about a
> missing grouping variable.** Nonzero stacking weights on both are a signal to go build a model that
> contains the distinction — the same logic as the grouped posterior predictive check in
> [[Posterior Predictive Checking]] (Figure 8.5d).
^def-stacking-pointwise

### What not to average

> [!important] Scaffolds (Ch. 9.6, p. 169)
> "**In Bayesian workflow, we will fit many models that we will not be interested in including in any
> average; such 'scaffolds' include**
> - **models that are deliberately overly simple (included just for comparison to the models of
>   interest)**,
> - **models constructed for purely experimental purposes**,
> - **as well as models that have major flaws or even coding errors.**
>
> **But even after these mistakes or deliberate oversimplifications have been removed, there might be
> several models over which to average when making predictions.**"
>
> **The authors' own practice, stated honestly:** "**In our own applied work we have not generally had many
> occasions to perform this sort of model averaging, as we prefer continuous model expansion in which the
> final model bridges between alternatives** … **but there will be settings where users will reasonably want
> to make predictions averaging over competing Bayesian models**" (Montgomery and Nyhan 2010; Yao, Pirš,
> et al. 2022).
>
> The preference for [[Model Expansion - Predictive Consistency and Coherence|continuous expansion]] over
> averaging is consistent: **averaging treats models as discrete alternatives, expansion treats them as
> ends of a continuum.**

### Variable selection

> [!definition] The problem, and why naive selection overfits
> "**There are many problems, for example in linear regression with several potentially relevant predictors,
> where many candidate models are available, all of which can be described as special cases of a single
> expanded model. If the number of candidate models is large, we are often interested in finding a
> comparably smaller model that has the same predictive performance as our expanded model. This leads to
> the problem of predictor (variable) selection.**
>
> **If we have many models making similar predictions, selecting one of these models based on minimizing
> cross validation error can lead to overfitting and suboptimal model choices**" (Piironen and Vehtari
> 2017a).
>
> **Two remedies:**
> 1. "**Estimating the magnitude of potential overfit and … stopping the selection process early**"
>    (McLatchie and Vehtari 2024).
> 2. **Projection predictive variable selection.**
^def-variable-selection-overfit

> [!important] Projection predictive selection, and why it escapes the problem
> "**Projection predictive variable selection … has been shown to be stable and reliable in finding smaller
> models with good predictive performance**" (Piironen and Vehtari 2017a; Piironen, Paasiniemi, and Vehtari
> 2020; Pavone et al. 2023; McLatchie, Rögnvaldsson, et al. 2025).
>
> > "**While searching through a big model space is usually associated with the danger of overfitting, the
> > projection predictive approach avoids this problem by examining only the projected submodels based on
> > the expanded model's predictions and not fitting each model independently to the data.**"
>
> That is the whole trick: **the submodels are never fit to the data at all.** They are fit to the
> *reference model's predictions*, so the data are used exactly once — in fitting the reference model.
>
> **Beyond variable selection:** projection predictive selection can also be used
> - "**for structure selection in generalized additive multilevel models**" (Catalina, Bürkner, and Vehtari
>   2022);
> - "**for creating simpler explanations for complex nonparametric models**" (Afrabandpey et al. 2020).
>
> Implemented in **`projpred`**; demonstrated in
> [[Models for Regression Coefficients - Student Grades]] (Ch. 28).

## Connections

- The Bayes-factor objection is a direct consequence of the [[Varieties of Bayesian Theory|M-open]] stance:
  marginal likelihoods answer "which model is true," a question the book declines to ask.
- Stacking-as-heterogeneity-diagnostic makes this section part of the *model improvement* loop rather than
  the *model selection* endpoint — the same move as
  [[Comparing Models Visually#Multiverse analysis|multiverse analysis]].
- Projection predictive selection is the answer to the "embed in a larger model" recommendation of
  [[Model Selection and Overfitting#Post-selection inference]]: fit the big model, then project down.

## See Also
- [[Model Selection Using Predictive Performance]] — the elpd differences stacking weights are built from
- [[Model Selection and Overfitting]] — when selection is safe and when it is not
- [[Model Expansion - Predictive Consistency and Coherence]] — the preferred alternative to averaging
- [[Global-Local Shrinkage Priors]] — the continuous alternative to discrete variable selection
