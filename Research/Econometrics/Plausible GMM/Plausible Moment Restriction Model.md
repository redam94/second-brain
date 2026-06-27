---
title: "Plausible Moment Restriction Model"
tags:
  - source/ingested
  - topic/econometrics
  - topic/bayesian-statistics
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Plausible GMM - A Quasi-Bayesian Approach]]"
source_location: "§2.1 Plausible Moment Restriction Model (pp. 5-7)"
date_ingested: 2026-06-27
folder: "Econometrics/Plausible GMM"
doc_type: paper
depends_on:
  - "[[Instrumental Variables]]"
  - "[[Method of Simulated Moments]]"
used_by:
  - "[[Quasi-Bayes for Plausible Moment Restrictions]]"
  - "[[Gaussian Local Prior Approximation]]"
  - "[[Plausible GMM - Institutions and GDP Application]]"
aliases:
  - plausibility characteristic
  - non-dogmatic prior over misspecification
  - PGMM model
---

# Plausible Moment Restriction Model

> [!summary]
> The model that underlies [[Plausible GMM - Overview|Plausible GMM]]. A structural model implies $q \ge k$ moment conditions $m(\theta) = \mu$, where the $q$-dimensional **plausibility characteristic** $\mu$ measures how far the moments are from holding exactly. Classical GMM imposes the *dogmatic* prior $\mu_* \equiv 0$ (moments hold exactly). Plausible GMM instead places a proper, non-degenerate prior $\pi(\mu)$ over $\mu_*$, concentrated near $0$, whose spread encodes the researcher's beliefs about possible economic violations. Because $\mu$ is unrestricted up to its prior, $\theta_*$ and $\mu_*$ are not jointly identified.

## Overview

We observe i.i.d. data $\{Z_t\}_{t=1}^{T}$ from an unknown distribution $\mathbb{P}_{\mu_*}$. A posited structural economic model provides a set of moment restrictions indexed by a $q$-dimensional parameter $\mu_* \in \mathcal{M}$, for a $k$-dimensional structural parameter $\theta \in \Theta$ with $q \ge k$.

The conceptual move is to treat the **exactness of the moment conditions** as itself an object of belief: rather than asserting the moments hold exactly, the researcher asserts they *plausibly* hold, and quantifies the plausibility with a prior.

## Main Content

> [!definition] Definition: Moment function and target ($\S$2.1)
> The structural model implies $q \ge k$ moment equations for the $k$-dimensional parameter $\theta$:
> $$
> m(\theta) = \mathbb{E}_{\mathbb{P}_{\mu_*}}\!\left[ g(Z_t, \theta) \right],
> $$
> and there exists a target parameter $\theta_*$ and a vector $\mu_*$ — the **plausibility characteristic** — satisfying
> $$
> m(\theta_*) = \mu_*.
> $$
> $\mu_*$ measures the degree to which the structural moment restrictions fail to hold exactly.
> ^def-moment-target

> [!definition] Definition: Dogmatic vs. plausible prior ($\S$2.1)
> - **Classical / dogmatic GMM:** $\mu_*$ is treated as a known fixed vector, WLOG $\mu_* \equiv 0$. This is equivalent to a dogmatic prior that the moment equations hold exactly — i.e. the model is correctly specified.
> - **Plausible GMM:** the researcher departs from the dogmatic belief by using a proper, non-degenerate prior $\pi(\mu)$ over $\mu_*$. Concentrating $\pi(\mu)$ near $0$ captures the belief that the restrictions are *likely* correct; the spread/shape away from $0$ captures beliefs about economically motivated deviations.
> ^def-dogmatic-vs-plausible

**Why a prior is needed.** With no restrictions on $\mu_*$, it is impossible to update beliefs about $\theta_*$ or $\mathbb{P}_{\mu_*}$ from the structural model: for *any* posited $\theta$ and $\mathbb{P}_\mu$ one can always set $\mu = \mathbb{E}_{\mathbb{P}_\mu}[g(Z_t, \theta)]$ so the structural moment equation is satisfied. The structural restriction adds **no** information if $\mu_*$ is left completely unrestricted. A proper prior over $\mu_*$ is what lets the moments be informative about $\theta_*$ while falling short of imposing the implausible restriction that they hold exactly.

> [!definition] Definition: Roots and the support assumption ($\S$2.1)
> Denote any root of $m(\theta) = \mu$ by $\theta(\mu)$. For the formal results, $\pi(\mu)$ is assumed to place strictly positive mass over a region $\Gamma$ such that a solution $\theta(\mu)$ exists for every $\mu \in \Gamma$.
> - **Just-identified ($q = k$):** essentially trivially satisfied for any prior (Hall & Inoue 2003).
> - **Over-identified ($q > k$):** *not* guaranteed — care is needed when adding moment conditions about which beliefs are weak, unless the researcher uses very diffuse priors.
> ^def-roots-support

### Partial identification by over-parameterization

The pair $(\theta, \mu)$ is over-parameterized: the data identify $m(\theta)$, but splitting it into "structural signal" $\theta$ and "misspecification" $\mu$ requires the prior. Hence $\theta_*$ and $\mu_*$ are **not jointly identified**, and the impact of the prior is *not* asymptotically negligible — this is what makes Plausible GMM a genuine partial-identification problem rather than a standard regular estimation problem.

## Examples

> [!example] Example: IV exclusion restriction made plausible ($\S$2.1)
> **Setup.** Constant-coefficient linear model
> $$
> Y_t = X_t \theta_* + U_t,
> $$
> with $X_t$ endogenous, $\mathbb{E}_{\mathbb{P}_{\mu_*}}[X_t U_t] \ne 0$. We also observe a variable $D_t$ believed (from economic/institutional reasoning) to satisfy the [[Instrumental Variables|exclusion restriction]] $\mathbb{E}_{\mathbb{P}_{\mu_*}}[D_t U_t] = 0$, giving the moment condition that identifies $\theta_*$.
>
> **The worry.** Suppose an unobserved confound $M_t$ covaries with both $Y_t$ and $D_t$: $U_t = M_t + V_t$ with $\mathbb{E}[D_t M_t] = \mu_* \ne 0$ and $\mathbb{E}[D_t V_t] = 0$. Imposing the (false) exact restriction $\mathbb{E}[D_t(Y_t - \theta X_t)] = 0$ and solving yields
> $$
> \theta = \left(\mathbb{E}_{\mathbb{P}_{\mu_*}}[D_t X_t]\right)^{-1}\mathbb{E}_{\mathbb{P}_{\mu_*}}[D_t Y_t] = \theta_* + \left(\mathbb{E}_{\mathbb{P}_{\mu_*}}[D_t X_t]\right)^{-1}\mu_* \;\ne\; \theta_*.
> $$
> The exact-IV estimand is biased by exactly the misspecification term.
>
> **The plausible fix.** Instead impose $\mathbb{E}_{\mathbb{P}_{\mu_*}}[D_t(Y_t - \theta X_t)] = \mu$ with, e.g., $\mu \sim \mathcal{N}(0, \sigma^2)$. The prior mass concentrated at $0$ encodes the belief the instrument is "close to" valid; $\{\mu = 0\}$ (perfect validity) has prior probability zero, reflecting that exact validity is incredibly unlikely. The prior variance $\sigma^2$ controls beliefs about the strength of the unobserved confound while keeping $\mu_*$ technically unbounded. The proper prior gives a concrete description of the moment restriction being *plausibly* — but not certainly — satisfied.
> ^ex-iv-plausible

## Connections

- **Generalizes** the classical moment-condition / [[Method of Simulated Moments|GMM]] model, which is the special case $\mu_* \equiv 0$.
- The plausibility characteristic $\mu$ plays the role of the "sensitivity parameter" in frequentist [[Sensitivity Analysis in Observational Studies|sensitivity analysis]] — but here it carries a *prior* rather than being varied over a fixed set.
- Feeds directly into the inference machinery in [[Quasi-Bayes for Plausible Moment Restrictions]] and the tractable special case in [[Gaussian Local Prior Approximation]].

## See Also

- [[Plausible GMM - Overview]] — where this setup fits in the paper's contribution
- [[Instrumental Variables]] — the exclusion-restriction example in its classical (exact) form
- [[Quasi-Bayes for Plausible Moment Restrictions]] — turning the model into a posterior
