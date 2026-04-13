---
title: "Computational Troubleshooting"
aliases:
  - "MCMC Troubleshooting"
  - "Folk Theorem of Statistical Computing"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/BayesWorkflow.pdf]]"
date_ingested: 2026-04-08
date_updated: 2026-04-13
folder: "Bayesian Statistics/Workflow"
doc_type: concept
source_location: "Bayesian Workflow paper"
depends_on:
  - "[[Fitting and Validating Computation]]"
  - "[[MCMC Basics]]"
  - "[[Efficient MCMC]]"
  - "[[Hierarchical Models]]"
  - "[[raw/BayesWorkflow.pdf]]"
used_by:
  - "[[Evaluating Fitted Models]]"
  - "[[HMC and Stan in Practice]]"
  - "[[Q - Common Pitfalls in Statistical Modeling]]"
---

> [!summary]
> Section 5 of Gelman et al. (2020) addresses what to do when MCMC computation goes wrong. The central insight is the **folk theorem of statistical computing**: when you have computational problems, often the real issue is with your model, not the algorithm. Strategies include simplification, reparameterization, marginalization, adding prior information, and adding data.

## The Folk Theorem of Statistical Computing

> [!quote] Folk Theorem
> When you have computational problems, often there is a problem with your model (Yao, Vehtari, and Gelman, 2020).

Many cases of poor convergence correspond to regions of parameter space that are not of substantive interest or indicate a nonsensical model. The first instinct should **not** be to throw more computational resources at the problem, but to check whether the model contains some substantive pathology.

## Starting Simple and Complex, Meeting in the Middle

When a complex model fails to fit, debug by moving from **two directions**:

- **Top-down**: gradually simplify the poorly-performing model until something works
- **Bottom-up**: start from a simple, well-understood model and add features until the problem appears

If the model has multiple components (e.g., a differential equation and a linear predictor), perform "unit tests" by fitting each component separately using simulated data.

## Getting a Handle on Slow Models

For models that take a long time to fit (e.g., multilevel models with many varying intercepts):

- Simulate fake data and fit that first
- Start with a **smaller model** and build up incrementally
- Run fewer iterations (e.g., 200) during exploration
- Add moderately informative priors on variance parameters
- Fit on a **subset of the data** first

## Monitoring Intermediate Quantities

Save and plot intermediate quantities using tools like `bayesplot` or `ArviZ`. Visualizations reveal more than streams of numbers -- for example, plotting predictions from stuck chains can explain why the sampler is not mixing.

## Stacking Poorly Mixing Chains

When chains are slow to mix but remain in generally reasonable ranges, **stacking** can combine simulations using cross-validation weights (Yao, Vehtari, and Gelman, 2020). This approximately discards chains stuck in low-probability modes and is useful during model exploration.

## Multimodality and Difficult Geometry

Four common types of posterior geometry problems (see [[Monsters and Mixtures]] for mixture model construction that commonly exhibits these pathologies):

| Type | Example | Solution |
|------|---------|----------|
| One dominant mode, others near-zero | Planetary motion model | Judicious initial values; informative priors |
| Symmetric modes | Label switching in mixtures | Constrain to identify one mode |
| Distinct substantive modes | Gene regulation models | Stacking; strong mixture priors |
| Unstable tail | Heavy-tailed posteriors | Initialize near the mass; reparameterize |

## Reparameterization

HMC works best when the posterior geometry is smooth and well-conditioned. [[Hierarchical Models]] often exhibit **funnel pathologies** when group-level variance approaches zero. Reparameterization following the non-centered parameterization (Meng and van Dyk, 2001; Betancourt and Girolami, 2015) can resolve this. See [[Efficient MCMC]] and [[HMC and Stan in Practice]] for Stan-specific implementation guidance.

## Marginalization

When difficult geometry arises from parameter interactions (e.g., the funnel between group-level scale $\phi$ and individual means $\theta$), we can marginalize:

$$p(\phi|y) = \int_\theta p(\phi, \theta|y)\,d\theta$$

This is especially effective for Gaussian process models and latent Gaussian models.

## Adding Prior Information

The **ladder of abstraction** for computational problems:

1. Poor mixing of MCMC
2. Difficult geometry as the mathematical explanation
3. Weakly informative data as the statistical explanation
4. **Substantive prior information** as the solution

Adding reasonable priors increases log-concavity of the posterior, leading to faster mixing. This is not a bias-efficiency tradeoff -- model fitting genuinely improves when the prior regularizes an otherwise ill-conditioned problem.

## Related Notes

- [[Bayesian Workflow - Overview]] — the overall workflow this step fits within
- [[Fitting and Validating Computation]] | [[Evaluating Fitted Models]]
- [[MCMC Basics]] | [[Efficient MCMC]] | [[HMC and Stan in Practice]] | [[Hierarchical Models]]
- [[Choosing and Building Models]] — model simplification is the first response to computational failures
