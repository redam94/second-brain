---
title: "Topology of Models"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 9.2, pp. 159-160"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Evaluating and Comparing"
doc_type: textbook
depends_on:
  - "[[Big Data Need Big Models]]"
  - "[[Varieties of Bayesian Theory]]"
  - "[[Choosing an Initial Model]]"
used_by:
  - "[[Comparing Models Visually]]"
  - "[[Stacking and Predictive Model Averaging]]"
  - "[[Model Expansion - Predictive Consistency and Coherence]]"
aliases:
  - "Model topology"
  - "Partial ordering of models"
  - "Automatic Statistician"
  - "Navigating not averaging"
---

# Topology of Models

> [!summary]
> A precise reason the book talks about a **topology** rather than a probability space over models:
> **"Our interest here is not in averaging over models but in navigating among them."** Model classes
> come with a natural **partial ordering** — AR(1) is simpler than AR(2) is simpler than ARMA(2,1), but
> AR(1) and MA(1) are not comparable — plus connections between parameters in neighboring models that
> "**talk with each other**" through quantities with meaning outside any single model. Priors add a
> **continuous dimension** that bridges between the discrete nodes.

## Overview

> [!definition] The partial ordering (Ch. 9.2, p. 159)
> "Consider any class of models, for simplicity in some particular restricted domain such as
> **autoregressive moving average (ARMA) models, binary classification trees, or linear regressions with
> some fixed set of input variables.** The models in any of these frameworks can be structured as a
> **partial ordering**:
> - **AR(1) is simpler than AR(2) which is simpler than ARMA(2,1), and MA(1) is also simpler than
>   ARMA(2,1), but AR(1) and MA(1) are not themselves ordered.**
> - **Tree splits form a partial ordering.**
> - **The $2^k$ possibilities of inclusion or exclusion in linear regression can be structured as the
>   corners of a cube.**
>
> "As these examples illustrate, **each of these model frameworks has its own topology or network
> structure as determined by the models in the class and their partial ordering.**"
^def-model-topology

> [!important] Why "topology" rather than "probability space"
> "**We speak of this as a topology of models rather than a probability space because we are not
> necessarily interested in assigning probabilities to the individual models. Our interest here is not in
> averaging over models but in navigating among them, and the topology refers to the connections between
> models and between parameters in neighboring models in the network.**"
>
> This is the [[Varieties of Bayesian Theory|M-open]] commitment made structural: assigning probabilities
> to models presupposes the list is exhaustive. **Navigation does not.**

## Main Content

### Two existing implementations, and what they lack

| System | What it does | Reference |
|---|---|---|
| **The Automatic Statistician** | "**searches through models in specified but open-ended classes** (for example, time series models and linear regression models), **using inference and model criticism to explore the model and data space**" | Hwang, Tong, and Choi 2016; Steinruecken et al. 2019 |
| **Prophet** and similar menu-based packages | "**allow users to put together models** (in this case, for time series forecasting) **from some set of building blocks**" | Taylor and Lethem 2018 |

> [!important] What such packages must add
> "**It is important in such packages not just to be able to build and fit these models but to understand
> each model in comparison to simpler or more complicated variants fit to the same data.**"
>
> "**We believe such algorithms can be better understood and, ultimately, improved, through a more formal
> understanding of the topology of models induced by a statistical modeling language.**"

### Why model space is harder than variable space

> [!warning] Each model is itself a high-dimensional object (Ch. 9.2, pp. 159-160)
> "**Unlike combining variables, where in many cases a simple and often automated additive model is
> enough, here each model itself is a high-dimensional object.** The outputs from different models, as
> probabilistic random variables, can be
> - **added**,
> - **multiplied**,
> - **linearly mixed**,
> - **log linearly mixed**,
> - **pointwisely mixed**,
>
> and so forth, **all of which are within the choice of model topology we need to specify.**"
>
> (Note that "pointwise mixing" is precisely what [[Stacking and Predictive Model Averaging|stacking]]
> does.)
>
> **The combinatorial problem:** "Such a model topology may have **a very large number of combinations,
> which may cause a challenge for humans to investigate. To focus on the most relevant models, we can
> filter out models with bad performance or serious computational issues**" (Riha et al. 2024) — the
> filtered-multiverse approach of [[Comparing Models Visually]].

### Parameters that talk across models

> [!definition] Shared inferential quantities (Ch. 9.2, p. 160)
> "**Each model within a framework has its own internal structure involving parameters that can be
> estimated from data, and the parameters within different models in the network can 'talk with each
> other' in the sense of having a shared, observable meaning outside the confines of the model itself.**"
>
> **Two familiar examples:**
> - **Forecasting** — "an increasingly complicated set of procedures can be used for a particular
>   predictive goal."
> - **Causal inference** — "a treatment effect can be estimated using a series of regressions, **starting
>   from a simple difference and moving to elaborate interaction models adjusting for differences between
>   observed treated and control groups.**"
>
> "**Recall that causal inferences are a special case of predictions involving counterfactuals**"
> (Morgan and Winship 2014) — see [[Causal Inference as Generalization]].
^def-shared-quantities

This is what makes Figure 9.1 in [[Comparing Models Visually]] meaningful: **SATE and PATE mean the same
thing in all four models**, so plotting them side by side is comparing like with like, even though the
models have different parameter vectors.

> [!important] The full definition, and the continuous dimension
> "**The topology of statistical or machine-learning models includes a partial ordering of models, and
> connections between parameters or functions of parameters and data across different models within the
> larger framework.**
>
> **Another twist is that prior distributions add a continuous dimension to the structure, bridging
> between models.**"
>
> The last clause matters more than its brevity suggests. A "model with predictor $x_5$" and a "model
> without $x_5$" are not two discrete nodes but **two ends of a continuum indexed by the prior scale on
> $\beta_5$** — with the prior concentrated at zero at one end. This is the same identity noted in
> [[Big Data Need Big Models#Adding parameters means relaxing a prior]], and it is the reason
> [[Model Expansion - Predictive Consistency and Coherence|continuous model expansion]] is preferred to
> discrete model choice.

## Connections

- The "navigating not averaging" stance is what distinguishes this book's use of
  [[Cross Validation Checking|LOO]] — as a tool for understanding a sequence of models — from its use as
  a selection criterion.
- Prior distributions as a continuous bridge is the formal justification for
  [[Model Expansion - Predictive Consistency and Coherence#Continuous model expansion]]:
  $\lambda A + (1-\lambda) B$ rather than a choice between $A$ and $B$.
- Filtering the topology by performance and computational health is
  [[Comparing Models Visually#Multiverse analysis]].

## See Also
- [[Comparing Models Visually]] — traversing a path through the topology and plotting what changes
- [[Model Selection and Overfitting]] — the risks of picking one node
- [[Stacking and Predictive Model Averaging]] — combining nodes rather than choosing
- [[Iterative Model Improvement]] — the 2020 paper's treatment of the topology idea
