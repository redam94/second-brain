---
title: Instrumental Variables and Principal Stratification
tags:
  - source/ingested
  - topic/causal-inference
  - topic/bayesian-statistics
  - type/concept
  - doc/paper
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§7a, pp. 14–16"
date_ingested: 2026-04-10
date_updated: 2026-08-10
folder: "Bayesian Statistics/Causal Inference/Sensitivity and Complex Mechanisms"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
  - "[[Causal Estimands]]"
  - "[[General Structure of Bayesian CI]]"
used_by: []
aliases:
  - IV causal inference
  - instrumental variable
  - CACE
  - complier average causal effect
  - local average treatment effect
  - principal stratification
---

# Instrumental Variables and Principal Stratification

> [!summary]
> Instrumental variables (IV) are used when unconfoundedness is untenable — they provide an exogenous source of variation in treatment assignment. The IV estimand is the Complier Average Causal Effect (CACE), identified under monotonicity and exclusion restriction. Bayesian IV inference treats the unobserved compliance stratum as a latent variable to be imputed via data augmentation.

## Overview

IV methods address settings where **unconfoundedness fails** — unmeasured confounders exist and sensitivity analysis is insufficient. An instrument $Z_i$ provides exogenous variation in treatment to identify causal effects for a subpopulation.

IV methods are one of the most important techniques for causal inference in economics and social sciences. The Bayesian framework naturally extends to this setting (§7 of [[Li et al 2022 - Overview|Li et al. 2022]]), treating the IV problem as a **mixture model** with latent compliance strata.

## IV Setup

Let:
- $Z_i \in \{0, 1\}$ — randomly assigned instrument (e.g., randomization to receive an encouragement)
- $W_i = W_i(Z_i)$ — actual treatment received ($W_i = 1$ treated, $W_i = 0$ control)
- $Y_i = Y_i(W_i(Z_i))$ — observed outcome
- $W_i(1), W_i(0)$ — potential treatments under instrument values

When $Z_i \neq W_i$, **non-compliance** occurs. Four compliance types are defined by the potential treatment pair $(W_i(1), W_i(0))$:

> [!definition] Definition: Compliance Types (Principal Strata)
> | Type | $W_i(1)$ | $W_i(0)$ | Description |
> |------|---------|---------|-------------|
> | Compliers (co) | 1 | 0 | Follow the instrument |
> | Always-takers (at) | 1 | 1 | Always take treatment |
> | Never-takers (nt) | 0 | 0 | Never take treatment |
> | Defiers (df) | 0 | 1 | Do the opposite |
>
> The **compliance stratum** $U_i \in \{\text{co, at, nt, df}\}$ is a **pre-treatment characteristic** of unit $i$ — comparisons of $Y_i(1)$ and $Y_i(0)$ within each stratum are valid causal effects (principal causal effects).
^def-compliance-types

## IV Assumptions

> [!definition] Assumption: IV Validity (Angrist, Imbens & Rubin 1996)
> A valid instrument $Z_i$ satisfies:
> **(i) Randomization**: $Z_i$ is randomly assigned
> **(ii) Exclusion restriction**: $Z_i$ affects the outcome *only through* its effect on $W_i$ (the instrument has no direct effect on $Y$)
> **(iii) Monotonicity**: $W_i(1) \geq W_i(0)$ for all $i$ (no defiers)
^def-iv-assumptions

Under monotonicity, only compliers, always-takers, and never-takers exist ($U_i \in \{\text{co, at, nt}\}$).

## The Complier Average Causal Effect (CACE)

> [!definition] Definition: Complier Average Causal Effect (CACE)
> The average treatment effect for **compliers** only:
> $$
> \tau_{\text{co}} \equiv \mathbb{E}[Y_i(1) - Y_i(0) \mid U_i = \text{co}]
> $$
> Under monotonicity, this equals:
> $$
> \tau_{\text{co}} = \frac{\mathbb{E}[Y_i \mid Z_i = 1] - \mathbb{E}[Y_i \mid Z_i = 0]}{\mathbb{E}[W_i \mid Z_i = 1] - \mathbb{E}[W_i \mid Z_i = 0]}
> $$
> which is exactly the probability limit of the [[Frequentist Causal Estimation|two-stage least squares (2SLS) estimator]].
^def-cace

Also called the **Local Average Treatment Effect (LATE)** in the Frequentist literature (Imbens & Angrist 1994).

**Interpretation**: CACE is the intention-to-treat effect divided by the compliance rate. It measures the effect of the assignment on the outcome for the subpopulation that actually complies with the assignment.

## Bayesian IV Inference

Bayesian IV inference (first outlined by Imbens & Rubin 1997) treats the unobserved compliance stratum $U_i$ as a **latent variable** to be imputed.

For each unit $i$, six quantities are now associated: $\{Y_i^{\text{obs}}, W_i^{\text{obs}}, Z_i, W_i(0), W_i(1), X_i\}$, where:
- $Y_i^{\text{obs}} = Y_i(Z_i)$ — observed outcome
- $W_i^{\text{obs}} = W_i(Z_i)$ — observed treatment
- $Y_i^{\text{mis}} = Y_i(1-Z_i)$ — missing outcome
- $W_i^{\text{mis}} = W_i(1-Z_i)$ — missing treatment

The full-data joint distribution is:
$$
\Pr(\theta) \prod_{i=1}^{N} \Pr(Y_i(0), Y_i(1) \mid U_i, X_i; \theta_Y) \cdot \Pr(U_i \mid X_i; \theta_U) \cdot \Pr(Z_i = 1 \mid X_i; \theta_Z)
$$

Under unconfoundedness, $\theta_Z$ is ignorable.

**Two models to specify**:
1. **Compliance model**: $\Pr(U_i \mid X_i; \theta_U)$ — e.g., multinomial logistic regression for $U_i$
2. **Outcome model**: $\Pr(Y_i(1), Y_i(0) \mid U_i, X_i; \theta_Y)$ — e.g., generalized linear model for $Y_i(z)$ given $U_i, X_i$

## Example 7.1 — Bayesian IV with One-Sided Non-Compliance

> [!example] Example 7.1 — IV with One-Sided Non-Compliance
> **Setup**: Randomized experiment with binary outcome $Y$, where control units ($Z_i=0$) have no access to treatment — no always-takers.
>
> **Result**: Only two strata: $U_i \in \{\text{co, nt}\}$. Assume $\pi_{\text{co,1}} = \Pr(Z_i = 1 \mid U_i = \text{co}) = \pi_{\text{nt,1}}$ (randomization), and simple conjugate priors.
>
> **Posterior sampling (Gibbs)**:
> - Sample $\pi_{\text{co}}$ from $\text{Beta}(1/2 + \sum \mathbf{1}(U_i=\text{co}), 1/2 + \sum \mathbf{1}(U_i=\text{nt}))$
> - Sample $p_{\text{co,1}}$ from $\text{Beta}(1/2 + \sum \mathbf{1}(U_i=\text{co}, Y_i=1), 1/2 + \sum \mathbf{1}(U_i=\text{co}, Y_i=0))$ — similarly for $p_{\text{co,0}}, p_{\text{nt,0}}$
> - Impute $U_i$ for $Z_i=1$ units using probability proportional to $\pi_{\text{co}} \cdot p_{\text{co,1}}^{Y_i}(1-p_{\text{co,1}})^{1-Y_i}$ vs. $\pi_{\text{nt}} \cdot p_{\text{nt,0}}^{Y_i}(1-p_{\text{nt,0}})^{1-Y_i}$
>
> The CACE posterior: $\tau_{\text{co}} = p_{\text{co,1}} - p_{\text{co,0}}$.
^ex-71

## Principal Stratification (Generalization)

The IV setup is a special case of **principal stratification** (Frangakis & Rubin 2002): a unified framework for causal inference with post-treatment confounded variables.

A **post-treatment variable** $S_i$ lies in the causal pathway between treatment and outcome. Its potential values $(S_i(0), S_i(1))$ define **principal strata** — subsets of units with the same pair of potential intermediate values. Within each stratum, comparisons of $Y_i(1)$ and $Y_i(0)$ are valid causal effects.

**Key insight**: $U_i = (W_i(0), W_i(1))$ in the IV setting is a pre-treatment characteristic, making comparisons within compliance strata valid causal comparisons. This is the fundamental reason the CACE has a clear causal interpretation.

**Applications beyond IV**:
- Censoring by death (survival endpoints)
- Surrogate endpoints
- Regression discontinuity designs
- Time-varying treatments
- Many clever natural experiments

## Connections to Frequentist IV

The Bayesian IV approach is closely related to the 2SLS estimator: the CACE equals the probability limit of 2SLS. However:
- 2SLS is derived from the structural equation model framework
- The potential outcomes framework makes 2SLS correspond to a causal effect only for a few special cases (Angrist et al. 1996)
- The Bayesian mixture model approach is more general and handles complex CATE estimands naturally

## Connections

- [[Causal Estimands#^def-principal-effects]] — principal causal effects definition
- [[General Structure of Bayesian CI]] — data augmentation for latent variables
- [[Potential Outcomes Framework]] — SUTVA and the role of randomization in IV

## See Also
- [[Time-Varying Treatments and G-computation]] — sequential treatment extension
- [[Sensitivity Analysis in Observational Studies]] — alternative when IV is unavailable
- [[Frequentist Causal Estimation]] — 2SLS as the frequentist counterpart; doubly-robust estimators for IV settings
- [[Metalearners for CATE]] — CACE is a LATE; CATE metalearners generalize beyond the complier subgroup
