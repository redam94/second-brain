---
title: "Divide-and-Conquer Algorithms"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 13.4, pp. 243-244"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Approximate Algorithms and Approximate Models]]"
  - "[[Cross Validation Checking]]"
  - "[[Hierarchical Models]]"
used_by:
  - "[[Fitting Simpler Models for Computational Purposes]]"
  - "[[Big Data Need Big Models]]"
aliases:
  - "Sequential computation"
  - "Posterior updating"
  - "Particle filtering"
  - "Federated learning"
  - "Parallel computation over data subsets"
---

# Divide-and-Conquer Algorithms

> [!summary]
> Two related problems: **data arriving over time** (how to update a posterior without refitting) and
> **data too large to fit at once** (how to split it up). For updating, the simplest device is
> **Pareto-smoothed importance sampling** — weight each existing draw by $p(y_2|\theta^s)$ — which works
> "**if the new dataset is much less informative than the original**," and whose failure is **visible as a
> high $\hat{k}$ warning.** The elegant fallback for hierarchical models: **only the global parameters need
> to be passed forward**, which can be a low-dimensional problem even when the full posterior is not.

## Overview

### Sequential computation

> [!definition] The posterior updating problem (Ch. 13.4, p. 243)
> "**Data often come in sequentially, and other times we will fit a model to data, and then new data arrive.
> In either case we have a problem of posterior updating. The most direct computational approach is to fit
> the model to the old and new data all at once, but this can be slow.**"
>
> Label the original data $y_1$ and the new data $y_2$. Given draws $\theta^s$ from
> $p(\theta|y_1) \propto p(\theta)p(y_1|\theta)$, the goal is draws from
> $$
> p(\theta \mid y_1, y_2) \propto p(\theta)\, p(y_1|\theta)\, p(y_2|\theta)
> $$
>
> **The assumption, and what to do if it fails:** "**we assume the model specification is rich enough that we
> can consider $y_1$ and $y_2$ as independent given the parameters; if not, the model should be expanded so
> that $\theta$ includes any shared aspects of the data, and we can use the independent factorization.**"
^def-posterior-updating

> [!definition] Method 1 — Pareto-smoothed importance sampling
> "**The simplest approach is Pareto-smoothed importance sampling** (Vehtari, Simpson, et al. 2024) **giving
> each simulation draw $\theta^s$ a weight of $p(y_2|\theta^s)$.**
>
> **This should work well if the new dataset is much less informative than the original data, for example if
> you have fit a model to 10,000 data points and are updating it based on 100 more.**"
>
> **A real application:** "**This approach was used by Bürkner, Gabry, and Vehtari (2020) for time series
> models to update the posterior after each new observation in time.**" — i.e. leave-future-out cross
> validation, see [[Model Selection Using Predictive Performance#Other cross validation variants]].
^def-is-updating

> [!warning] When the new data are informative
> "**When the information content in the new data becomes larger, updating the posterior is more of a
> challenge because there can be poor overlap of the initial posterior $p(\theta|y_1)$ and the new likelihood
> $p(y_2|\theta)$.**
>
> **Problems of overlap can occur because of systematic differences between the old and new data not captured
> by the model (that is, model violation) or simply from random chance.**
>
> **In any case this should show up as highly-variable importance weights which will result in a warning of
> high $\hat{k}$ from the Pareto smoothing.**"
>
> Two things worth noting. First, the diagnostic is **free** — the same $\hat{k}$ that governs
> [[Cross Validation Checking|PSIS-LOO]]. Second, a high $\hat{k}$ here is **substantively informative**: it
> may mean the new data conflict with the model, which is a finding rather than a computational nuisance.
>
> **The next step up:** "**One direction to go from here is particle filtering, an approach to simulation
> that combines importance sampling and Markov chain simulation.**"

> [!definition] Method 2 — approximate the old posterior parametrically and use it as a prior
> "**Another approach that can be useful is to approximate the set of posterior simulations $\theta^s$
> parametrically (for example using a multivariate normal distribution after transforming any bounded
> parameters to the unconstrained scale) and using this as a prior when fitting the model to data $y_2$
> alone.**
>
> **It might seem too hopeful to assume the intermediate posterior is normal, but this can work, especially
> for hierarchical models where only a subset of parameters is shared between the two datasets.**"
>
> **The hierarchical decomposition that makes it work.** With global parameters $\phi$ and local parameters
> $\xi_1, \xi_2$:
> $$
> p(\theta \mid y_1, y_2) \propto p(\phi)\, p(\xi_1|\phi)\, p(y_1|\phi,\xi_1)\, p(\xi_2|\phi)\, p(y_2|\phi,\xi_2)
> $$
>
> > "**In that case, the only piece of information that needs to be conveyed from the intermediate posterior
> > to the final computation are the simulations of $\phi$, which could be a relatively low-dimensional
> > problem.**"
>
> This is the sequential-computation counterpart of the marginalization strategy in
> [[Modeling Ideas to Address Computing Problems#Remedy 2 — Marginalization]]: **the hierarchy localizes
> what has to be shared.** The local parameters $\xi_1$ never need to travel.
^def-parametric-prior-updating

### Parallel computation

> [!definition] Partition, fit, combine (Ch. 13.4, p. 244)
> "**To scale the computation for bigger data, computation can be parallelized by partitioning the data into
> $K$ subsets, separately fitting the model to each subset, and then combining the $K$ inferences into a
> single approximate posterior distribution.**"
>
> **The obstacle:** "**There is no generally appropriate way to partition the data efficiently for such a
> procedure, as the efficiency of the computation can depend on structures of the data and model such as
> clustering, time series, and spatial dependence.**"
>
> **The cheap version, for early workflow:** "**it is possible to get quick results by performing inference
> independently for each subset and then using a simple meta-analysis to combine summary statistics from the
> separate inferences.**"
>
> **When that is not enough:** "**For more elaborate models, such a purely parallel approach can be
> insufficient, and it can be necessary to share information between the parts.**" Vehtari, Gelman, Sivula,
> et al. (2020) and Guo, Greengard, et al. (2023) "**review several divide-and-conquer or federated learning
> algorithms that use parallel computation with occasional communication sharing information between the
> processes.**"
^def-parallel-partitioning

Note the connection to [[Constructing Priors for Effect Sizes|meta-analysis as hierarchical modeling]]: the
"quick results" version is literally a meta-analysis of $K$ subset fits, which means it is a **hierarchical
model with the between-subset variance estimated from the subsets** — and therefore not merely a
computational shortcut but a slightly different model.

## Connections

- Sequential updating with importance weights is the same machinery as leave-future-out cross validation in
  [[Model Selection Using Predictive Performance]] and as power-scaling in
  [[Influence of Likelihood and Prior]] — three uses of one reweighting device, all monitored by $\hat{k}$.
- "Divide but not conquer" — fitting to a subset and stopping there — is listed among the model
  simplifications in [[Fitting Simpler Models for Computational Purposes]].
- The motivation is [[Big Data Need Big Models]]: bigger data need bigger models, and bigger models need
  computation that scales.

## See Also
- [[Approximate Algorithms and Approximate Models]] — the chapter frame
- [[Fitting Simpler Models for Computational Purposes]] — the other way to make a fit affordable
- [[Cross Validation Checking]] — where the Pareto $\hat{k}$ diagnostic comes from
- [[Bayesian Structural Time-Series Model]] — a setting where sequential updating is natural
