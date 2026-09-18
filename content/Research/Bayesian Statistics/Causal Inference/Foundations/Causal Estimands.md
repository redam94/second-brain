---
title: Causal Estimands
tags:
  - source/ingested
  - topic/causal-inference
  - type/definition
  - doc/paper
source: "[[raw/Li et al. - 2022 - Bayesian causal inference a critical review.pdf]]"
source_location: "§2, pp. 2–3"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Foundations"
doc_type: paper
depends_on:
  - "[[Potential Outcomes Framework]]"
used_by:
  - "[[Frequentist Causal Estimation]]"
  - "[[General Structure of Bayesian CI]]"
  - "[[Dynamic Treatment Regimes Framework]]"
  - "[[DML Estimators for ATE and the Interactive Model]]"
  - "[[Q - Which Heterogeneous Treatment Effect Method Answers Which Question]]"
aliases:
  - treatment effect
  - ATE
  - CATE
  - ITE
  - SATE
  - PATE
  - MATE
---

# Causal Estimands

> [!summary]
> Causal estimands are the target quantities in causal inference — specific comparisons of potential outcomes that answer "what is the effect of the treatment?" The main estimands differ by what population they average over and whether they condition on covariates. The choice of estimand is a scientific question, not a statistical one.

## Overview

Causal effects are defined as **contrasts of potential outcomes** under different treatment conditions for the same unit. Since only one potential outcome is ever observed per unit, causal effects are fundamentally about counterfactuals. The choice of estimand should be driven by the scientific question at hand.

## Individual Treatment Effect (ITE)

> [!definition] Definition: Individual Treatment Effect (ITE)
> For unit $i$, the individual treatment effect is:
> $$
> \tau_i \equiv Y_i(1) - Y_i(0)
> $$
> the difference in potential outcomes under treatment vs. control for the *same* unit.
^def-ite

The ITE is never directly observable (fundamental problem of causal inference). Population-level estimands average over ITEs in various ways.

## Sample Average Treatment Effect (SATE)

> [!definition] Definition: Sample Average Treatment Effect (SATE)
> The average ITE over the observed sample of $N$ units:
> $$
> \tau^S \equiv N^{-1} \sum_{i=1}^{N} \tau_i = N^{-1} \sum_{i=1}^{N} [Y_i(1) - Y_i(0)]
> $$
^def-sate

The SATE is a function of potential outcomes of the *specific sample*. It is non-random given the sample, though it involves missing potential outcomes.

## Conditional Average Treatment Effect (CATE)

> [!definition] Definition: Conditional Average Treatment Effect (CATE)
> The average treatment effect for all units with covariate value $X_i = x$:
> $$
> \tau(x) \equiv \mathbb{E}[Y_i(1) - Y_i(0) \mid X_i = x] = \mu_1(x) - \mu_0(x)
> $$
> where $\mu_z(x) \equiv \mathbb{E}[Y_i(z) \mid X_i = x]$ for $z = 0, 1$.
^def-cate

The CATE captures **treatment effect heterogeneity** — how the average effect varies across covariate subgroups. Estimating $\tau(x)$ as a function of $x$ is a central goal in modern causal inference.

## Population Average Treatment Effect (PATE)

> [!definition] Definition: Population Average Treatment Effect (PATE)
> Averaging the CATE (or ITE) over a target population $F(x; \theta_X)$:
> $$
> \tau^P \equiv \mathbb{E}[Y_i(1) - Y_i(0)] = \mathbb{E}[\tau(X_i)]
> $$
^def-pate

- The PATE is a function of the **distribution** of potential outcomes in a population.
- In observational studies where the target population is the population from which the sample is drawn, PATE is typically the estimand of interest.
- In randomized experiments, SATE is often the primary estimand.

> [!warning] SATE vs. PATE distinction
> Both ITE and CATE are important for characterizing treatment effect heterogeneity, but they are obviously different. They are sometimes conflated in the literature.
>
> - **SATE** = average of ITEs over the *specific sample*
> - **PATE** = average of ITEs over the *population distribution*

## Mixed Average Treatment Effect (MATE)

> [!definition] Definition: Mixed Average Treatment Effect (MATE)
> Replace the population distribution $F(x; \theta_X)$ in the PATE with the *empirical distribution* $\hat{F}_X$ of covariates in the sample:
> $$
> \tau^M \equiv (\beta_1 - \beta_0)'\bar{X} = N^{-1} \sum_{i=1}^{N} \tau(X_i; \theta_Y)
> $$
> where $\tau(x; \theta_Y) = \tau(x)$ evaluated at parameter $\theta_Y$.
^def-mate

- The MATE is a convenient approximation to the PATE: it conditions on the observed $X$ values rather than integrating over the population distribution.
- Most Bayesian causal inference in practice focuses on the MATE (rather than PATE or SATE).
- The distinction: PATE has the largest uncertainty; SATE has the smallest; MATE is in between.

## Summary Table

| Estimand | Formula | Population | Key feature |
|----------|---------|-----------|-------------|
| ITE | $Y_i(1) - Y_i(0)$ | Unit $i$ | Never observed; target of imputation |
| SATE | $N^{-1}\sum_i \tau_i$ | Sample | Non-random given sample |
| CATE | $\mu_1(x) - \mu_0(x)$ | Subgroup $X=x$ | Captures heterogeneity |
| PATE | $\mathbb{E}[\tau(X_i)]$ | Population | Requires population distribution |
| MATE | $N^{-1}\sum_i \tau(X_i;\theta_Y)$ | Sample (empirical $X$) | Most used in Bayesian CI |

## Principal Causal Effects

In complex assignment mechanisms (e.g., instrumental variables), one may define **stratum-specific** effects:

> [!definition] Definition: Principal Causal Effects
> For compliance stratum $U_i \in \{\text{co, at, nt, df}\}$ (compliers, always-takers, never-takers, defiers), the stratum-specific effect is:
> $$
> \tau_u \equiv \mathbb{E}[Y_i(1) - Y_i(0) \mid U_i = u]
> $$
> These are called *principal causal effects*.
^def-principal-effects

See [[Instrumental Variables and Principal Stratification]] for the full IV/compliance framework.

## Connections

- [[Potential Outcomes Framework]] — the setup that defines these estimands
- [[General Structure of Bayesian CI]] — Bayesian inference for these estimands via posterior imputation
- [[Frequentist Causal Estimation]] — frequentist estimators targeting PATE/SATE/CATE
- [[Bayesian Outcome Models]] — outcome model $\mu_z(x)$ used to estimate CATE

## See Also
- [[Instrumental Variables and Principal Stratification]] — principal causal effects for IV settings
- [[Time-Varying Treatments and G-computation]] — marginal structural model estimands for sequential treatments
