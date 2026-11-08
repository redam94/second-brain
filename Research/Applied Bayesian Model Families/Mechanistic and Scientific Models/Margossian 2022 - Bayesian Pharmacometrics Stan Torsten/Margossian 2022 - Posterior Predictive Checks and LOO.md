---
title: "Margossian 2022 - Posterior Predictive Checks and LOO"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/pharmacometrics
  - type/definition
  - doc/paper
source: "[[raw/Margossian 2022 - Bayesian Pharmacometrics with Stan and Torsten.pdf]]"
source_location: "Sec. 2.6-2.7, pp. 14-16; Figs. 2-4; Sec. 3 remarks on NPDE/PIT, pp. 21-22"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Margossian 2022 - Bayesian Pharmacometrics Stan Torsten"
doc_type: paper
depends_on:
  - "[[Margossian 2022 - Stan Workflow and MCMC Diagnostics]]"
  - "[[Posterior Predictive Checking]]"
used_by:
  - "[[Margossian 2022 - Population Two-Compartment Model]]"
aliases:
  - PK posterior predictive checks
  - PSIS-LOO for PK models
  - NPDE and PIT
---

# Margossian 2022 - Posterior Predictive Checks and LOO

> [!summary]
> After inference is trusted, simulate replicated data from the fitted model (draw $\tilde\theta\sim p(\theta\mid y)$, then $\tilde y\sim p(y\mid\tilde\theta)$) and compare it to observations; compare models by Pareto-smoothed importance sampling leave-one-out (PSIS-LOO). For the simulated patient the two-compartment model beats the one-compartment model out of sample. PPCs reusing the fit data are optimistic; hold out patients where feasible.

## Overview

Both tools live in Stan's `generated quantities` block and cost little relative to sampling.

## Main Content

> [!algorithm] Posterior predictive check (Sec. 2.6)
> 1. Draw parameters from their posterior $\tilde\theta\sim p(\theta\mid y)$. 2. Draw predicted observations from the likelihood given $\tilde\theta$: $\tilde y\sim p(\tilde y\mid\tilde\theta)$. This yields $\tilde y\sim p(\tilde y\mid y)$, carrying both estimation uncertainty and measurement noise. Plot 50% and 90% credible bands from the predictive draws against the observed data (Fig. 2).
^alg-ppc

In the PK model: `lognormal_rng(log(concentrationHat[iObs]), sigma)`.

> [!definition] PSIS-LOO (Sec. 2.7)
> The expected log predictive density for a new point is $\text{elpd}_{\text{loo}}=\sum_{i=1}^n\log p(y_i\mid y_{-i})$. Exact computation needs $n$ refits; Vehtari, Gelman & Gabry (2016) estimate each term with Pareto-smoothed importance sampling from a single fit. The Pareto shape $\hat k$ diagnoses reliability; $\hat k>0.7$ means the estimate should not be trusted. Pointwise $\log p(y_i\mid\theta)$ is computed in `generated quantities` and passed to the `loo` package.
^def-psis-loo

**Application.** One-compartment (`pmx_solve_onecpt`) vs two-compartment (`pmx_solve_twocpt`) fit to the same data: the one-compartment credible bands are wider (Fig. 3); $\text{elpd}_{\text{loo}}$ with its standard deviation and the pairwise difference (Fig. 4) shows the two-compartment model has superior out-of-sample predictive capability, matching the data-generating structure.

**Limits of in-sample PPCs (Sec. 3).** Standard PPCs use the same data for fitting and checking, so they may be over-optimistic for flexible or over-parameterized models; remedies are out-of-sample predictions (fit to a subset of individuals, predict the rest, i.e. cross-validation, often computationally expensive). For heterogeneous designs, **NPDE** (normalized prediction distribution errors, common in the maximum-likelihood context and applicable to Bayesian point predictions) or **PIT** (probability integral transforms) adjust for heterogeneity.

## Examples

**Reading a PPC.** If more than 10% of observations fall outside the 90% band, or misses cluster in the absorption phase (first hour after dose), the structural model (e.g. absorption lag, dose compartment) is suspect rather than the priors.

**PSIS-LOO comparison in ArviZ (sketch).**
```python
import arviz as az
loo1 = az.loo(idata_onecpt, pointwise=True); loo2 = az.loo(idata_twocpt, pointwise=True)
print(az.compare({"one": idata_onecpt, "two": idata_twocpt}))   # elpd_diff, dse; check pareto_k < 0.7
```
Requires `log_likelihood` stored in each `idata`.

## Relevance to marketing measurement

Same checks apply to an MMM: replicate sales given posterior media effects and compare to history, then compare adstock/saturation alternatives by PSIS-LOO; with time series use leave-future-out instead, since LOO ignores temporal order (editorial note). See [[Posterior Predictive Checking]], [[Overfitting and Information Criteria]], [[LOO Model Checking and Comparison - Roaches]].

## Connections

[[Prior Predictive Checking]], [[Model Selection and Overfitting]], [[Margossian 2022 - Stan Workflow and MCMC Diagnostics]].

## See Also

[[Margossian 2022 - Bayesian Pharmacometrics - Overview]].
