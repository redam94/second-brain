---
title: Data-Averaged Posterior Self-Consistency
tags:
  - source/ingested
  - topic/bayesian-statistics
  - type/theorem
  - doc/paper
source: "[[raw/1804.06788-Talts-SBC.pdf]]"
source_location: "Sec. 2-3, pp. 2-4 (Eq. 1)"
date_ingested: 2026-06-17
folder: "Bayesian Statistics/Workflow"
doc_type: paper
depends_on: []
used_by:
  - "[[Simulation-Based Calibration - Overview]]"
  - "[[Rank Statistics and Uniformity]]"
  - "[[The SBC Algorithm]]"
  - "[[Q - Does Peeking Matter for a Bayesian]]"
  - "[[Q - Four Meanings of Calibration]]"
aliases:
  - Data-Averaged Posterior
  - Self-Consistency of the Bayesian Joint Distribution
---

# Data-Averaged Posterior Self-Consistency

> [!summary]
> The foundational identity behind SBC: for *any* model, the average of the exact posterior over data generated from the Bayesian joint distribution equals the prior. Equivalently, the **data-averaged posterior** equals the prior distribution. Any discrepancy between a *computed* data-averaged posterior and the prior signals an error — inaccurate posterior computation or a mis-implemented model.

## Overview

The most direct way to validate a computed posterior would be to compare computed expectations to exact ones — but exact posterior expectations are known only for the simplest models, which have atypical structure. So we need a validation criterion that does not require any known property of the true posterior. The Bayesian joint distribution provides exactly such a self-consistency condition: integrating exact posteriors over data drawn from the joint distribution recovers the prior, regardless of the model's structure.

## Main Content

> [!theorem] Self-consistency of the data-averaged posterior (Eq. 1)
> Let the Bayesian joint distribution be $\pi(y,\theta) = \pi(y \mid \theta)\,\pi(\theta)$, where $\pi(\theta)$ is the prior and $\pi(y \mid \theta)$ the likelihood (data-generating process). Draw a ground truth from the prior, $\tilde\theta \sim \pi(\theta)$, and data from the corresponding process, $\tilde y \sim \pi(y \mid \tilde\theta)$. Then integrating the exact posterior $\pi(\theta \mid \tilde y)$ over the joint distribution returns the prior:
> $$
> \pi(\theta) = \int \mathrm{d}\tilde y \, \mathrm{d}\tilde\theta \; \pi(\theta \mid \tilde y)\,\pi(\tilde y \mid \tilde\theta)\,\pi(\tilde\theta).
> $$
> Equivalently, for *any* model the average of any exact posterior expectation, with respect to data generated from the Bayesian joint distribution, reduces to the corresponding prior expectation.
> ^thm-self-consistency

**Notation.**
- $\theta$ — model parameters (possibly multidimensional); $y$ — measurements/data.
- $\pi(\theta)$ — prior; $\pi(y \mid \theta)$ — likelihood; $\pi(y,\theta)$ — joint.
- $\tilde\theta$ — a ground-truth parameter draw from the prior; $\tilde y$ — a dataset simulated from the likelihood at $\tilde\theta$.
- $\pi(\theta \mid \tilde y)$ — the *exact* posterior given $\tilde y$.
- The inner factor $\pi(\tilde y \mid \tilde\theta)\,\pi(\tilde\theta)$ is the joint density of the simulated $(\tilde\theta, \tilde y)$ pair; integrating it against the exact posterior marginalizes the data and recovers the prior over $\theta$.

**Why it holds (sketch).** $\int \mathrm{d}\tilde\theta\, \pi(\tilde y \mid \tilde\theta)\pi(\tilde\theta) = \pi(\tilde y)$ is the prior predictive (marginal) density of the data; then $\int \mathrm{d}\tilde y\, \pi(\theta \mid \tilde y)\,\pi(\tilde y) = \int \mathrm{d}\tilde y\, \pi(\theta, \tilde y) = \pi(\theta)$. The exact posterior and the marginal data density "cancel" back to the prior. The identity is a tautology for the *exact* posterior — which is precisely what makes any observed deviation diagnostic of computational error.

> [!definition] Data-averaged posterior
> The **data-averaged posterior** is the left-marginalized object $\int \mathrm{d}\tilde y\,\mathrm{d}\tilde\theta\; \pi(\theta \mid \tilde y)\,\pi(\tilde y \mid \tilde\theta)\,\pi(\tilde\theta)$ computed using the algorithm under test. Under exact computation it equals the prior $\pi(\theta)$. A *computed* data-averaged posterior that is over-dispersed, under-dispersed, or shifted relative to the prior reveals the corresponding error in the inference (see [[Interpreting SBC Histograms]], Figs. 5-7).
> ^def-dap

This consistency between the data-averaged posterior and the prior is not novel — it was exploited by Geweke (2004) (via a Gibbs sampler on the joint distribution) and Cook, Gelman & Rubin (2006) (via posterior CDF values). SBC replaces those artifact-prone comparisons with a rank-statistic test (see [[Rank Statistics and Uniformity]]).

## Examples

> [!example] Reading the identity as a validation target
> **Setup:** Run any algorithm over many $(\tilde\theta, \tilde y)$ pairs drawn from the joint distribution and aggregate the computed posteriors.
> **Result (exact case):** The aggregated (data-averaged) posterior is indistinguishable from the prior.
> **Interpretation:** This holds for *every* model with no need to know any true posterior expectation. It gives a generic, model-agnostic validation target — the basis on which SBC, Geweke, and Cook-Gelman-Rubin all rest.
> ^ex-target

## Connections

- **Used by:** [[Simulation-Based Calibration - Overview]] (motivation); [[Rank Statistics and Uniformity]] (the rank test is the practical embodiment of this identity); [[The SBC Algorithm]] (sampling $\tilde\theta\sim\pi(\theta)$ then $\tilde y\sim\pi(y\mid\tilde\theta)$ realizes the joint draw).
- **Interpretation:** Deviations of the *computed* data-averaged posterior from the prior map to histogram shapes in [[Interpreting SBC Histograms]].
- **Lineage:** Geweke (2004), Cook, Gelman & Rubin (2006).

## See Also

- [[Simulation-Based Calibration - Overview]]
- [[Rank Statistics and Uniformity]]
- [[The SBC Algorithm]]
- [[Interpreting SBC Histograms]]
- [[BDA3 - Overview]]
