---
title: Open Challenges and Future Directions
tags:
  - source/ingested
  - topic/bayesian-experimental-design
  - type/concept
  - doc/paper
source: "[[raw/Rainforth et al 2023 - Modern Bayesian Experimental Design.pdf]]"
source_location: "Rainforth 2023 §5"
date_ingested: 2026-06-27
folder: "Bayesian Experimental Design/Modern BED Review"
doc_type: paper
depends_on:
  - "[[Modern Bayesian Experimental Design - Overview]]"
  - "[[From Designs to Policies (Deep Adaptive Design)]]"
used_by:
  - "[[Q - A Map of Sequential Decision Methods from Bandits to RLHF]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
aliases:
  - BED future directions
  - BED open problems
  - Model misspecification in BED
  - BED and active learning
---

# Open Challenges and Future Directions

> [!summary]
> The review's §5 lays out where BED should go next: **(1) Policy-based BAD** is powerful but fledgling — scaling and better architectures/objectives are the frontier. **(2) Linking with related areas** — Bayesian active learning and Bayesian RL are intimately connected to BAD but largely siloed; cross-pollination (e.g. importing active learning's success with high-dimensional data) is promising. **(3) Model misspecification & downstream analysis** — BED is only as good as its model, and is *especially* sensitive to misspecification; under-studied theoretically and empirically. **(4) Models & applications** — implicit-likelihood and richer simulators unlock new domains.

## Overview

Having surveyed the computational revolution (§3) and the policy leap (§4), the review closes by identifying the most important open problems. These are the gaps a researcher entering the field should target.

## Main Content

### 1. Policy-based BAD (§5.1)

[[From Designs to Policies (Deep Adaptive Design)|DAD-style]] policies have sharply improved deployment speed and design quality, but represent a "fledgling" approach with large headroom. The **biggest challenge is scaling** to larger, more complex problems — sensitive to the dimensionality and smoothness of the model and design space and to the experiment length $T$. Advances are needed on **network architectures, objectives, and training mechanisms**; discrete design components remain hard.

### 2. Linking with related areas (§5.2)

> [!example] BED ↔ Bayesian active learning ↔ Bayesian RL
> **Active learning** is an important special case of BAD: adaptively train a model data-efficiently by choosing which inputs to label. The **BALD** score is the per-step EIG of the *model parameters*. Two transfer opportunities: (a) active learning has succeeded with much larger, higher-dimensional datasets (computer vision, NLP) — those techniques could scale BED; (b) conversely, BED's EIG estimators and policy methods could help active learning beyond small-class classification. The review also notes BALD is a *sub-optimal* application of BED for active learning when the real goal is downstream *predictions*, not parameters (prediction-oriented design).
> **Bayesian RL:** BAD is a Bayes-adaptive Markov decision process with the incremental EIG as reward; information-based exploration in RL is analogous. Links exist but are "largely unexplored."
^ex-related-areas

### 3. Model misspecification and downstream analysis (§5.3)

> [!example] BED's Achilles' heel (Rainforth 2023 §5.3)
> BED is **especially sensitive** to misspecification because it uses the model both to fit data *and* to choose new data. When no $\theta^\*$ makes $p(y\mid\theta^\*,\xi)$ match reality, BAD can suffer **catastrophic failure** — getting "stuck" querying uninformative designs and producing poor datasets. An extreme case: in linear regression the EIG of the coefficients is *always maximized at the extremes* of the inputs regardless of prior, so a misspecified linear model never explores the interior of the design space. Mitigation is under-studied (only limited theoretical and empirical work). A related issue: data gathered by BED is often *re-used downstream* for non-Bayesian purposes (empirical risk minimization, model selection) — the **likelihood principle** offers some protection for Bayesian downstream analysis (if not itself misspecified), but practical guarantees beyond inference-in-the-chosen-model are lacking.
^ex-misspecification

### 4. Models and applications (§5.4)

BED's performance is only as good as the underlying model, so **modeling advances are the most important vector**. Two general points:
- **Implicit-likelihood models** ([[The Computational Revolution in EIG Estimation]]) let BED use accurate *simulators* — often easier to build than closed-form likelihoods — spanning quantum logic gates to large-scale climate simulations.
- The computational advances make **richer, more complex models** feasible; practitioners should embrace flexible, accurate models that reflect their beliefs rather than restricting to easy-to-estimate ones, and should consider BED for **larger and more complex problems** than it has historically been used for.

## Connections

- **Caps** the review narrative begun in [[Modern Bayesian Experimental Design - Overview]].
- **Model-dependence caveat** picks up the thread from [[Information-Theoretic Design Objectives]] (BED is only as good as its model).
- **Active-learning and RL links** connect this topic to broader ML; **misspecification** connects to robust/Bayesian-model-checking literatures.

## See Also
- [[From Designs to Policies (Deep Adaptive Design)]] — the policy frontier being scaled
- [[Information-Theoretic Design Objectives]] — the model-dependence caveat
- [[Model Checking]] / [[Model Comparison]] — tools relevant to detecting misspecification
- [[Bayesian Workflow - Overview]] — building and validating the models BED depends on
