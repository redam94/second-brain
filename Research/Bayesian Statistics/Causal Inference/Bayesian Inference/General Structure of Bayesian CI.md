---
title: General Structure of Bayesian Causal Inference
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/causal-inference
  - type/concept
  - doc/paper
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§3, pp. 5–8"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Bayesian Inference"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Causal Estimands]]"
used_by:
  - "[[Bayesian Outcome Models]]"
  - "[[Propensity Score in Bayesian CI]]"
aliases:
  - Bayesian causal inference structure
  - Bayesian factorization causal
---

# General Structure of Bayesian Causal Inference

> [!summary]
> Bayesian causal inference treats the missing potential outcomes as parameters to be imputed. The full-data likelihood factorizes into three components: the assignment mechanism, the outcome model, and the covariate model. Under ignorability and prior independence (Assumption 3.2), inference for causal estimands depends only on the outcome model — but the propensity score model and design stage remain essential for valid inference.

## Overview

Because causal inference involves missing potential outcomes, it is inherently a **missing data problem**. The Bayesian paradigm naturally handles missing data through imputation from the posterior predictive distribution — making it particularly well-suited for causal inference.

This section (§3 of [[Li et al 2022 - Overview|Li et al. 2022]]) reviews the general Bayesian framework first outlined by Rubin (1978) and Li, Ding, Mealli (2022).

## Setup

For each unit $i$, four quantities are associated: $\{Y_i(0), Y_i(1), Z_i, X_i\}$, where $Z_i = (Z_1, \ldots, Z_N)^T$ and $Y_i(1-Z_i)$ is **missing**.

Bayesian inference views all these quantities as random variables and specifies a model for them. Under the Bayesian model, the random variables for each unit are **i.i.d.** governed by a parameter $\theta = (\theta_Z, \theta_Y, \theta_X)$.

## Full-Data Likelihood Factorization

> [!definition] Definition: Full-Data Likelihood Factorization
> The joint distribution of the full data (observed and missing) for each unit $i$ factorizes as:
> $$\Pr(Z_i \mid Y_i(0), Y_i(1), X_i; \theta) = \Pr(Y_i(0), Y_i(1) \mid X_i; \theta_Y) \cdot \Pr(Z_i \mid X_i; \theta_Z)$$
> (under ignorability, the assignment mechanism further reduces to $\Pr(Z_i \mid X_i; \theta_Z)$, the propensity score model)
^def-factorization

The three terms represent:
1. **Assignment mechanism model**: $\Pr(Z_i \mid X_i; \theta_Z)$ — the propensity score model
2. **Potential outcome model**: $\Pr(Y_i(0), Y_i(1) \mid X_i; \theta_Y)$ — the outcome model
3. **Covariate model**: $\Pr(X_i; \theta_X)$ — usually replaced by the empirical distribution $\hat{F}_X$

## Prior Independence Assumption

> [!definition] Assumption 3.2 — Prior Independence
> The parameters for the assignment mechanism $\theta_Z$, outcome $\theta_Y$, and covariates $\theta_X$ are **a priori distinct and independent**:
> $$p(\theta_Z, \theta_Y, \theta_X) = p(\theta_Z) \cdot p(\theta_Y) \cdot p(\theta_X)$$
^def-prior-independence

This assumption is:
- **Unique to Bayesian causal inference** — imposed primarily for computational convenience
- **Potentially problematic in high dimensions** — can act as a strongly informative prior (*prior dogmatism*), because independent priors on $\theta_Z$ and $\theta_Y$ implicitly constrain the marginal distributions of outcomes in each treatment group

> [!warning] Prior Dogmatism
> In high dimensions, prior independence (Assumption 3.2) effectively acts as a strongly informative prior as $p$ increases. This is the Bayesian analogue of *regularization-induced confounding* (§4). Knowing *why* this happens is crucial for designing priors that avoid it.
^warn-prior-dogmatism

## Ignorability of the Propensity Score

Under Assumptions 2.1 (ignorability) and 3.2 (prior independence), the observed-data likelihood based on the factorization becomes:
$$\prod_{i: Z_i=1} \Pr(Y_i(1) \mid X_i; \theta_Y) \cdot \prod_{i: Z_i=0} \Pr(Y_i(0) \mid X_i; \theta_Y)$$

**Key result**: the propensity score model $\Pr(Z_i \mid X_i; \theta_Z)$ is **ignorable** — it does not appear in the likelihood for causal estimands $\tau^S$, $\tau^P$, or $\tau(x)$.

The same ignorability argument applies to:
- The covariate model $\Pr(X_i; \theta_X)$ (in most settings)
- Estimands that depend only on $\theta_Y$: SATE, PATE, CATE, MATE

**Exception**: the SATE involves both observed and missing potential outcomes $\{Y_i(0), Y_i(1)\}_{i=1}^N$, requiring imputation via the outcome model and data augmentation.

## Posterior Inference for Causal Effects

> [!example] Example 3.1 — Covariate Adjustment in a Randomized Experiment
> Model potential outcomes as bivariate normal for each unit:
> $$\begin{pmatrix} Y_i(1) \\ Y_i(0) \end{pmatrix} \Bigg| (X_i, \mu_1, \beta_0, \sigma_0^2, \sigma_1^2) \sim \mathcal{N}\left( \begin{pmatrix} \beta_1' X_i \\ \beta_0' X_i \end{pmatrix}, \begin{pmatrix} \sigma_1^2 & \rho\sigma_1\sigma_0 \\ \rho\sigma_1\sigma_0 & \sigma_0^2 \end{pmatrix} \right)$$
>
> - **PATE**: $\tau^P = (\beta_1 - \beta_0)'\mathbb{E}(X_i)$ — depends only on $\theta_X$ and $\theta_Y$ (not on $\rho$)
> - **SATE**: $\tau^S = (\beta_1 - \beta_0)'\bar{X}$ — also independent of $\rho$
> - **MATE**: $\tau^M = (\beta_1 - \beta_0)'\bar{X}$ — same as SATE here
>
> For the SATE, posterior inference requires specifying $\rho$ (association between potential outcomes). The posterior distribution of $\tau^S$ would be sensitive to the prior on $\rho$.
^ex-31

**Bayesian inference for the SATE** is more complex because it depends on $Y_i(0)$ and $Y_i(1)$ jointly, involving both observed and missing quantities. The most common sampling strategy is **data augmentation**: iteratively simulate $\theta$ from its posterior given data and impute $Y_i^{\text{mis}}$, then derive the posterior for any estimand.

## Identifiability in the Bayesian Framework

In Bayesian inference, identifiability has a different character than in the Frequentist paradigm:

- A parameter is **identified** if any two distinct values give different distributions of the observed data
- Under the Bayesian paradigm, even non-identified parameters (like $\rho$ above) have posterior distributions — because the prior provides information
- Gustafson (2015) proposed: a parameter is *weakly/partially identifiable* if a large region of its posterior is flat, or its posterior depends crucially on the prior even with large samples

This blurring of identifiability motivates **transparent parametrization**: separate identifiable from non-identifiable parameters, treating the latter as sensitivity parameters (see [[Sensitivity Analysis in Observational Studies]]).

## Bayesian Bootstrap

An alternative general-purpose approach: the **Bayesian bootstrap** (Rubin, 1981). It simulates the posterior distribution of any parameter under a non-parametric Dirichlet process prior. It can incorporate IPW and doubly-robust estimators as M-estimation problems into Bayesian inference. However, it doesn't capitalize on the main strength of Bayesian inference (versatile priors + unified framework).

## Connections

- [[Bayesian Outcome Models]] — specifying $\Pr(Y_i(0), Y_i(1) \mid X_i; \theta_Y)$ in detail
- [[Propensity Score in Bayesian CI]] — why the propensity score drops from the likelihood but still matters
- [[Potential Outcomes Framework]] — ignorability assumptions that enable this factorization
- [[Causal Estimands]] — SATE vs. PATE vs. MATE distinctions in posterior inference

## See Also
- [[Sensitivity Analysis in Observational Studies]] — transparent parametrization for non-identified parameters
- [[Bayesian Propensity Score Weighting]] — practical Bayesian IPW approaches (Liao-Zigler, Heiss method)
