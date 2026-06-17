---
title: Time-Varying Treatments and G-computation
tags:
  - source/ingested
  - topic/causal-inference
  - topic/bayesian-statistics
  - type/concept
  - doc/paper
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§7b, pp. 16–18"
date_ingested: 2026-04-10
date_updated: 2026-06-15
folder: "Bayesian Statistics/Causal Inference/Sensitivity and Complex Mechanisms"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[General Structure of Bayesian CI]]"
  - "[[Bayesian Outcome Models]]"
used_by: []
aliases:
  - g-computation
  - g-formula
  - marginal structural model
  - sequential ignorability
  - longitudinal causal inference
---

# Time-Varying Treatments and G-computation

> [!summary]
> Time-varying treatments involve sequential assignment over $T$ time points, where intermediate confounders are affected by past treatment. Sequential ignorability extends the ignorability assumption to this setting. The g-formula (Robins 1986) identifies the causal effect of a treatment sequence by iterating outcome regression across time. The Bayesian approach applies g-computation: fit a Bayesian model for each component in the g-formula and combine posterior draws.

## Overview

In many real-world scenarios, subjects receive treatments **sequentially** at multiple time points. The challenge: time-varying confounders $L_t$ are affected by both previous treatments and future treatment assignment and outcomes. These settings are called **time-varying**, **sequential**, or **longitudinal** treatments.

Standard ignorability cannot handle this because conditioning on a time-varying confounder $L_t$ simultaneously:
- Removes confounding for the $t$-th treatment
- Opens a collider bias path for earlier treatments

The solution is **sequential ignorability** combined with the **g-formula**.

## Setup

Consider $T$ time points. For unit $i$ ($i=1,\ldots,N$; $t=1,\ldots,T$):
- $L_0$ — baseline time-invariant covariates
- $Z_t$ — binary treatment at time $t$
- $L_t$ — time-varying confounders between $Z_{t-1}$ and $Z_t$ (affected by previous treatments)
- $Y_i$ — final outcome at time $T$

Treatment sequence: $\bar{Z}_t = (Z_1, \ldots, Z_t)$ and $\bar{z}_t = (z_1, \ldots, z_t)$.

**Causal estimand**: the marginal effect comparing two pre-specified treatment sequences $\bar{z}, \bar{z}' \in \{0,1\}^T$:
$$
\tau_{\bar{z}, \bar{z}'} \equiv \mathbb{E}[Y_i(\bar{z}_T)] - \mathbb{E}[Y_i(\bar{z}_T')]
$$

## Sequential Ignorability

> [!definition] Assumption 7.2 — Sequential Ignorability
> For all $t = 1, \ldots, T$:
> $$
> Z_t \perp\!\!\!\perp Y(\bar{z}) \mid \bar{Z}_{t-1}, \bar{L}_{t-1}
> $$
> for all $\bar{z}_t$. That is, given all past treatment and covariate history, the current treatment assignment is independent of future potential outcomes.
^def-sequential-ignorability

Sequential ignorability is the time-varying analogue of the standard ignorability assumption. It requires that at each time point, treatment is as-good-as-random conditional on the entire observed history up to that point.

## The G-Formula

> [!theorem] Theorem: G-Formula (Robins 1986)
> Under sequential ignorability, the marginal mean potential outcome for treatment sequence $\bar{z}_T$ is identified from observed data as:
> $$
> \mathbb{E}[Y_i(\bar{z}_T)] = \sum_{L_0, L_1, \ldots, L_{T-1}} \mathbb{E}[Y \mid \bar{Z}_T = \bar{z}_T, \bar{L}_{T-1}] \cdot \prod_{t=1}^{T} \Pr(L_t \mid \bar{Z}_t = \bar{z}_t, \bar{L}_{t-1}) \cdot \Pr(L_0)
> $$
^thm-g-formula

The g-formula is an extension of the outcome regression identification formula to sequential treatments. It requires:
1. A model for the **final outcome** $\mathbb{E}[Y \mid \bar{Z}_T, \bar{L}_{T-1}]$
2. Models for the **time-varying confounders** $\Pr(L_t \mid \bar{Z}_t, \bar{L}_{t-1})$ at each time point

## Bayesian G-Computation

The Bayesian approach applies **g-computation**: fit Bayesian models for each component in the g-formula, combine posterior draws.

**Algorithm**:
1. Fit a Bayesian outcome model $\Pr(Y \mid \bar{Z}_T, \bar{L}_{T-1}; \theta_Y)$
2. Fit Bayesian confounder models $\Pr(L_t \mid \bar{Z}_t, \bar{L}_{t-1}; \theta_{L_t})$ for each $t$
3. Draw posterior samples $(\theta_Y, \theta_{L_1}, \ldots, \theta_{L_T})$ jointly
4. Compute the g-formula integral by Monte Carlo: simulate $\bar{L}$ from the confounder models under intervention $\bar{z}$, plug into the outcome model, average

> [!example] Example 7.3 — Bayesian G-computation with Two Periods
> **Setup**: $T=2$ time periods. $L_0$: binary baseline covariate. $Z_1$: binary treatment at $t=1$. $L_1$: binary time-varying covariate. $Z_2$: binary treatment at $t=2$. $Y$: binary outcome.
>
> **Estimand**: $\mathbb{E}[Y(z_1, z_2)]$ for any $(z_1, z_2) \in \{0,1\}^2$, via:
> $$
> \mathbb{E}[Y(z_1,z_2)] = \sum_{l_0, l_1} \Pr(Y=1 \mid Z_2=z_2, Z_1=z_1, L_1=l_1, L_0=l_0)
> $$
> $$
> \quad \cdot \Pr(L_1=l_1 \mid Z_1=z_1, L_0=l_0) \cdot \Pr(L_0=l_0)
> $$
>
> **Posterior computation** (with Beta conjugate priors):
> - Sample $\Pr(Y=1 \mid Z_2, Z_1, L_1, L_0)$ from $\text{Beta}(1/2 + \sum \mathbf{1}(\ldots), \ldots)$ (8 Bernoulli cells)
> - Sample $\Pr(L_1=l_1 \mid Z_1=z_1, L_0=l_0)$ similarly (4 Bernoulli cells)
> - Sample $\Pr(L_0=1)$ from $\text{Beta}(1/2 + \sum L_{0i}, 1/2 + \sum (1-L_{0i}))$
>
> Then combine to get posterior of $\mathbb{E}[Y(z_1, z_2)]$ and contrasts.
^ex-73

## Challenges and Extensions

**Scalability**: the g-formula becomes intractable as $T$ and the dimension of $L$ increase — the sum over all history paths requires exponentially many models.

**Marginal Structural Models (MSM)**: A popular alternative (Robins et al. 2000) that models the *marginal* potential outcome distribution rather than the full conditional. The Bayesian version (Saarela et al. 2016) uses the Bayesian bootstrap.

**Dynamic treatment regimes**: A closely related topic — sequences of decision rules that individualize treatment over time based on evolving history. Optimal dynamic treatment regimes require combining **causal inference + decision theory + reinforcement learning**.

> [!note] G-null Paradox
> Robins & Wasserman (2015) showed that unsaturated MSMs might rule out the null hypothesis of zero causal effect *a priori* — a phenomenon called the *g-null paradox*. This is an important limitation of MSMs in practice.

## Comparison: Bayesian vs. Frequentist

| Approach | Method | Key advantage | Limitation |
|----------|--------|---------------|-----------|
| Frequentist | IPW-based MSM | Computationally simpler | Extreme weights; g-null paradox |
| Frequentist | G-computation | Direct; flexible | Requires many models |
| Bayesian | G-computation | Uncertainty propagation across time | Computationally demanding |
| Bayesian | Marginal structural model (Bayesian bootstrap) | Avoids specifying all confounder models | Relies on IPW; extreme weight issues remain |

## Connections

- [[General Structure of Bayesian CI]] — data augmentation and posterior imputation generalized to time-varying settings
- [[Potential Outcomes Framework]] — SUTVA and the multiple potential outcomes $Y_i(\bar{z}_T)$
- [[Bayesian Outcome Models]] — each time-step outcome model in the g-formula
- [[Instrumental Variables and Principal Stratification]] — principal stratification applied to censoring/time-varying settings

## See Also
- [[Sensitivity Analysis in Observational Studies]] — sensitivity to unmeasured confounders in longitudinal settings
- [[Instrumental Variables and Principal Stratification]] — principal stratification as an alternative framework for complex treatment assignments
- [[Estimands in Longitudinal Research]] — the theoretical estimand that sequential treatments must target
- [[Cross-Lagged and Dynamic Panel Models]] — frequentist/structural alternatives for dynamic panel estimation
- [[Bayesian Propensity Score Weighting]] — IPW-based marginal structural models use propensity score weighting at each time step
