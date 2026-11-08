---
title: "Margossian 2022 - Stan Workflow and MCMC Diagnostics"
tags:
  - source/ingested
  - topic/mechanistic-models
  - topic/pharmacometrics
  - type/concept
  - doc/paper
source: "[[raw/Margossian 2022 - Bayesian Pharmacometrics with Stan and Torsten.pdf]]"
source_location: "Sec. 1 (Bayesian inference, workflow, setup) and Sec. 2.3-2.5, pp. 2-14; Table 2; Fig. 1"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Mechanistic and Scientific Models/Margossian 2022 - Bayesian Pharmacometrics Stan Torsten"
doc_type: paper
depends_on:
  - "[[Margossian 2022 - Compartment Models and Event Schedules]]"
  - "[[HMC and Stan in Practice]]"
used_by:
  - "[[Margossian 2022 - Posterior Predictive Checks and LOO]]"
aliases:
  - Stan program blocks
  - R-hat and effective sample size
  - Torsten workflow
---

# Margossian 2022 - Stan Workflow and MCMC Diagnostics

> [!summary]
> A Stan program is a recipe for $\log p(D,\theta)$; automatic differentiation supplies its gradient to HMC. Convergence is checked with split $\hat R\approx1$ and effective sample size (the authors consider $n_{\text{eff}}\approx100$ usually sufficient for posterior summaries, since the Monte Carlo variance is then 1% of the posterior variance). The single-patient two-compartment fit passes these checks (Table 2).

## Overview

The paper frames modelling as a *Bayesian workflow*: build, fit, check inference, check the model, revise. This note covers the inference half.

## Main Content

### Bayesian setup and why HMC

Given data $D$ and latent $\theta$, the joint is $p(D,\theta)=p(\theta)\,p(D\mid\theta)$ and inference targets the posterior $p(\theta\mid D)\propto p(D,\theta)$ and derived quantities $p(f(\theta)\mid D)$. The normalizing constant is intractable, so MCMC methods that use only the unnormalized density are used. HMC requires $\log p(D,\theta)$ and $\nabla_\theta\log p(D,\theta)$ many times at fixed $D$ and so needs continuous parameters (discrete parameters require special treatment, not covered). Stan supplies NUTS (adaptive HMC), ADVI, penalized maximum likelihood, and newer prototypes (adjoint-differentiated Laplace approximations, cross-chain warmup, Pathfinder initialization). Divergent-transition detection, split $\hat R$, bulk/tail ESS are automated. NONMEM also supports an HMC sampler but at the time lacked some diagnostics for population models.

### Stan program blocks (Sec. 2.3)

| Block | Role |
|---|---|
| `functions` | user functions, e.g. the ODE right-hand side |
| `data` | fixed inputs: event schedule, observations |
| `parameters` | quantities HMC explores; constraints via `lower`/`upper` are handled by transforming to an unconstrained scale (positive variables on the log scale) |
| `transformed parameters` | derived quantities such as $\hat c$ from the ODE solve |
| `model` | increments `target` with log prior plus log likelihood; `~` statements are shorthand |
| `generated quantities` | simulated predictions, pointwise log-likelihoods, run once per draw |

Truncation at zero of a Half-Normal prior on $\sigma$ follows from declaring $\sigma$ lower-bounded by 0. Fitting is run from R with `cmdstanr`, with `posterior`, `bayesplot`, `loo` for summaries; code in the `torsten_tutorial_1_supplementary` repository.

### Checking inference (Sec. 2.5)

> [!definition] $\hat R$ and effective sample size
> Several chains start at different points. $\hat R$ intuitively compares total variance across all chains with the average within-chain variance; if chains mix, both estimate the posterior variance and $\hat R\to1$ as $n$ grows. Stan uses the improved (rank-normalized, split) $\hat R$ of Vehtari et al. (2020). Under regularity conditions the MCMC estimator $\hat E_f$ satisfies a CLT with variance $\operatorname{Var}(f)/n_{\text{eff}}$, with $n_{\text{eff}}\le n$ because of autocorrelation. Bulk-ESS governs central summaries; tail-ESS governs extreme quantiles.
^def-rhat-ess

Rules of thumb from the authors: $\hat R\approx1.0$; $n_{\text{eff}}\approx100$ usually sufficient in applied work; if $n_{\text{eff}}<100$ for some quantity, lengthen the sampling phase. Even with $\hat R\approx1$ all chains could share a bias, and warmup must be long enough.

**Table 2 (two-compartment fit, 2,000 draws).**

| Parameter | mean | median | sd | q5 | q95 | $\hat R$ | ESS bulk | ESS tail |
|---|---|---|---|---|---|---|---|---|
| CL | 10.0 | 10.0 | 0.378 | 9.39 | 10.6 | 1.00 | 1580 | 1348 |
| Q | 19.8 | 19.5 | 4.00 | 13.8 | 26.8 | 1.00 | 985 | 1235 |
| $V_{cent}$ | 41.2 | 40.8 | 9.71 | 25.6 | 57.7 | 1.00 | 732 | 1120 |
| $V_{peri}$ | 124 | 123 | 18.0 | 97.1 | 155 | 1.00 | 1877 | 1279 |
| $k_a$ | 1.73 | 1.67 | 0.523 | 1.01 | 2.68 | 1.00 | 762 | 1108 |
| $\sigma$ | 0.224 | 0.222 | 0.0244 | 0.187 | 0.269 | 1.01 | 1549 | 1083 |

**Interpretation.** CL is tightly identified (sd 0.378 vs prior sd about 2.5); $V_{cent}$, $Q$ and $k_a$ remain wide relative to the data: with this sampling design the absorption-phase and distribution parameters are weakly identified, and the posterior is informed partly by the prior. The data-generating values are not given in Table 2; CL near 10 matches the prior centre.

## Examples

**Computing $n_{\text{eff}}$ requirements.** The relative Monte Carlo standard error of a posterior mean is $1/\sqrt{n_{\text{eff}}}$ of the posterior sd: at $n_{\text{eff}}=100$ it is 10% of the posterior sd, so error variance is 1% of the posterior variance (the authors' justification).

**PyMC/ArviZ equivalent.**
```python
import arviz as az
az.summary(idata, var_names=["CL","Q","Vc","Vp","ka","sigma"], round_to=3)   # r_hat, ess_bulk, ess_tail
az.plot_trace(idata)
```

## Connections

[[HMC and Stan in Practice]], [[MCMC Basics]], [[Efficient MCMC]], [[Bayesian Workflow - Overview]], [[Izmailov 2021 - Mixing Diagnostics and Posterior Geometry]] (function-space $\hat R$).

## See Also

[[Margossian 2022 - Bayesian Pharmacometrics - Overview]].
