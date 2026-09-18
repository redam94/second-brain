---
title: Potential Outcomes Framework
tags:
  - source/ingested
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§2, pp. 2–5"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Foundations"
doc_type: paper
depends_on: []
used_by:
  - "[[Causal Estimands]]"
  - "[[Frequentist Causal Estimation]]"
  - "[[General Structure of Bayesian CI]]"
  - "[[Dynamic Treatment Regimes Framework]]"
  - "[[Q- and A-learning - Overview]]"
  - "[[Event Study Designs and Dynamic Treatment Effects]]"
  - "[[Synthetic Difference-in-Differences - Overview]]"
  - "[[Causal Machine Learning - Overview]]"
  - "[[Honest Trees and Causal Forests]]"
  - "[[Online Experimentation - Overview]]"
  - "[[Switchback Experiment Design and Analysis]]"
  - "[[Interference and Marketplace Experiments]]"
  - "[[Confidence Sequences]]"
  - "[[Conformal Inference for Counterfactuals and ITEs]]"
  - "[[From ITT to Treatment-on-the-Treated in Ad Experiments]]"
  - "[[User-Level Ad Experiments - Overview]]"
  - "[[Intent-to-Treat, PSA and Ghost Ad Designs]]"
aliases:
  - Rubin causal model
  - potential outcomes
  - counterfactual framework
---

# Potential Outcomes Framework

> [!summary]
> The potential outcomes framework (Rubin causal model) defines causal effects as comparisons of counterfactual outcomes under different treatment conditions for the same unit. The key identifying assumptions — SUTVA, ignorability (unconfoundedness + overlap) — determine when causal effects can be estimated from observational data.

## Overview

The potential outcomes framework is the mainstream statistical framework for causal inference, underpinning the Bayesian review by [[Li et al 2022 - Overview|Li et al. (2022)]]. Following the dictum *"no causation without manipulation"*, a cause is a pre-specified treatment or intervention that is at least hypothetically manipulable.

## Setup

Consider $N$ units indexed by $i \in \{1, \ldots, N\}$. Each unit $i$ has:
- $Z_i \in \{0, 1\}$ — binary treatment indicator ($Z_i = 1$ active, $Z_i = 0$ control)
- $X_i$ — vector of $p$ pre-treatment covariates observed before treatment
- $Y_i(1), Y_i(0)$ — **potential outcomes** under treatment and control respectively
- $Y_i^{\text{obs}} = Y_i(Z_i)$ — the **observed** outcome (only one potential outcome is observed)

The **fundamental problem of causal inference**: for each unit, only $Y_i(Z_i)$ is observed; $Y_i(1-Z_i)$ is *missing* (counterfactual).

Let $Z = (Z_1, \ldots, Z_N)^T$, $X = (X_1, \ldots, X_N)^T$.

## Key Assumption: SUTVA

> [!definition] Assumption: Stable Unit Treatment Value Assumption (SUTVA)
> There is:
> **(i)** no different version of a treatment, and
> **(ii)** no interference — unit $i$'s potential outcomes are not affected by other units' treatment assignments.
>
> Under SUTVA, unit $i$ has exactly two potential outcomes: $Y_i(1)$ and $Y_i(0)$.
^def-sutva

SUTVA rules out spillover effects and treatment heterogeneity due to dose or version. Violations occur in settings like infectious disease (interference) or drug dosage (multiple versions).

## Key Assumption: Ignorability

> [!definition] Assumption 2.1 — Ignorability (Li et al. §2)
> The assignment mechanism is **ignorable** if both:
>
> **(a) Unconfoundedness**: $Z_i \perp\!\!\!\perp \{Y_i(0), Y_i(1)\} \mid X_i$, or equivalently $Z_i \perp\!\!\!\perp \{Y_i(0), Y_i(1)\} \mid \{X_i = x_i\}$ for all $x$.
>
> **(b) Overlap**: $0 < e(x) < 1$ for all $x$, where $e(x) = \Pr(Z_i = 1 \mid X_i = x)$ is the **propensity score**.
^def-ignorability

- **Unconfoundedness** (also called *selection on observables* or *no unmeasured confounding*): treatment assignment is as-good-as-random conditional on observed covariates. This is **fundamentally untestable** from observed data.
- **Overlap** (also called *positivity*): every unit has a non-zero probability of receiving either treatment. Ensures the conditional distribution of potential outcomes is identifiable from observed data.

Together, these ensure that:
$$
\mu_z(x) \equiv \mathbb{E}[Y_i(z) \mid X_i = x] = \mathbb{E}[Y_i \mid Z_i = z, X_i = x]
$$

for all $z, x$ — i.e., the potential outcome mean equals the observed conditional mean. ^eq-identification

## The Role of Covariate Overlap and Balance

**Overlap and balance** refers to similarity in the distribution of covariates between the two treatment groups. This is a key concept for design:

- In **randomized experiments**: all covariates are balanced in expectation; simple difference-in-means $\hat{\tau}$ is unbiased for $\tau^S$ and $\tau^P$.
- In **observational studies**: groups are often imbalanced (e.g., sicker patients get more treatment). Direct comparison gives biased causal estimates.
- **Poor overlap**: outcome model estimates rely on extrapolation; sensitive to model misspecification.

> [!important] Design vs. Analysis
> A main effort in causal inference with observational data is the **design stage**: ensuring overlap and balance to mimic a randomized experiment as closely as possible. The design stage does *not* involve the outcome — this contrasts with the **analysis stage**, which uses the outcome to estimate effects.

## Randomized Experiments vs. Observational Studies

| Feature | Randomized Experiment | Observational Study |
|---------|----------------------|---------------------|
| Assignment known? | Yes, controlled | No, must be modeled |
| Ignorability | Holds by design | Holds approximately (best case) |
| Overlap | Usually good | May be poor |
| Confounding | Eliminated by randomization | Present; must adjust |

A/B testing and randomized controlled trials are the gold standard for causal inference precisely because they eliminate confounding via randomization.

## Connections

- [[Causal Estimands]] — formal treatment effect quantities defined under this framework
- [[Frequentist Causal Estimation]] — IPW, outcome modeling, doubly-robust estimators exploit ignorability
- [[General Structure of Bayesian CI]] — Bayesian inference treats missing potential outcomes as parameters to be imputed
- [[Sensitivity Analysis in Observational Studies]] — methods to assess robustness when unconfoundedness may fail

## See Also
- [[Causal Estimands]] — formal definitions of ITE, SATE, CATE, PATE, MATE
- [[Propensity Score in Bayesian CI]] — propensity score $e(x)$ plays central role despite dropping from likelihood
- [[Conformal Inference for Counterfactuals and ITEs]] — distribution-free intervals for counterfactuals
