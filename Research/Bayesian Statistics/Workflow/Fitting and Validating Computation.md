---
title: "Fitting and Validating Computation"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/BayesWorkflow.pdf]]"
date_ingested: 2026-04-08
folder: "Bayesian Statistics/Workflow"
doc_type: concept
source_location: "Bayesian Workflow paper"
depends_on:
  - "[[Choosing and Building Models]]"
  - "[[MCMC Basics]]"
  - "[[Efficient MCMC]]"
  - "[[Bayesian Workflow - Overview]]"
  - "[[raw/BayesWorkflow.pdf]]"
used_by:
  - "[[Computational Troubleshooting]]"
  - "[[Evaluating Fitted Models]]"
  - "[[Modeling as Software Development]]"
  - "[[Power Analysis and Sample Size]]"
---

# Fitting and Validating Computation

> [!summary]
> Sections 3--4 of Gelman et al. (2020) cover how to fit Bayesian models using MCMC (particularly HMC), validate that the computation is correct, and use simulated data to diagnose problems before touching real data. Key tools include convergence diagnostics, fake-data simulation, and simulation-based calibration (SBC).

## Fitting a Model (Section 3)

### Initial Values, Adaptation, and Warmup

MCMC algorithms (especially HMC as implemented in Stan) operate in stages:

1. **Warmup** -- moves chains from arbitrary initial values toward the typical set of the posterior; also tunes sampler parameters (e.g., step size, mass matrix)
2. **Sampling** -- draws from the posterior after chains have mixed

Warmup serves dual purposes: (a) reducing bias from initial values, and (b) providing information for tuning parameters. See [[MCMC Basics]] and [[Efficient MCMC]].

### How Long to Run

Run until $\hat{R} < 1.01$ for all parameters and effective sample sizes are sufficient for the quantities of interest. However, during early model exploration, running fewer iterations (e.g., 200 instead of 2000) can quickly reveal major issues like coding errors -- analogous to avoiding premature optimization in software.

### Approximate Algorithms and Approximate Models

There is a tradeoff between speed and accuracy. Early in the workflow, approximate methods ([[Approximation Methods|variational inference, Laplace approximation]], INLA, penalized ML) can help explore model space quickly. Near the end, accurate MCMC is needed for fine-scale posterior features.

### Fit Fast, Fail Fast

A key goal is for bad models to **fail quickly** rather than consuming resources on near-perfect inference for a model we will ultimately discard. If fitting to different data subsets yields wildly different estimates, the model is likely inappropriate.

## Validating Computation with Constructed Data (Section 4)

### Fake-Data Simulation

Simulate data from the model with known parameter values $\theta^*$, then fit the model and check:

1. **Data informativeness** -- can the data constrain the parameters beyond the prior?
2. **Parameter recovery** -- are the true $\theta^*$ values recovered within posterior intervals?
3. **Behavior across parameter space** -- how does the posterior change in different regions?

> [!tip] Why Fake Data First?
> Real data confound modeling issues with computational issues. Simulated data isolate the computation: if the model cannot recover known truth from its own fake data, it will certainly fail on real data.

### Simulation-Based Calibration (SBC)

SBC (Cook et al., 2006; Talts et al., 2020) is a more comprehensive approach than single-point fake-data checks:

1. Draw $\theta \sim p(\theta)$ from the prior
2. Simulate $y \sim p(y|\theta)$
3. Fit the model to obtain $p(\theta|y)$
4. Check that the posterior is calibrated relative to the prior-generated truth

Repeating this many times, if the algorithm is correct, the rank statistics of the true parameter within the posterior samples should be uniform. SBC can detect both computational errors and model specification issues.

### Experimentation with Constructed Data

Fitting models to data simulated under *different* assumptions (e.g., $t$-distributed errors when the model assumes normal) lets us study robustness and understand bias under misspecification.

## See Also

- [[Choosing and Building Models]] — prior predictive checks and model specification before fitting
- [[Computational Troubleshooting]] — diagnosing and fixing sampler failures
- [[MCMC Basics]] — theory behind warmup, chains, and convergence
- [[Efficient MCMC]] — HMC, NUTS, and tuning strategies
- [[Model Checking]] — posterior predictive checks after fitting
- [[Approximation Methods]] — variational inference and Laplace approximation as fast alternatives
- [[Simulation-Based Calibration - Overview]] — the full SBC procedure and its implementation details
- [[Interpreting SBC Histograms]] — how to read rank-statistic histograms from SBC runs
