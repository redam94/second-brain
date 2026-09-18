---
title: "Approximations Based on Joint and Conditional Posterior Modes"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/bayesian-workflow
  - type/concept
  - doc/textbook
source: "[[raw/Gelman Vehtari McElreath 2026 - Bayesian Workflow (book).pdf]]"
source_location: "Ch. 13.1, pp. 240-241"
date_ingested: 2026-08-18
folder: "Bayesian Statistics/Workflow/Computational Workflow"
doc_type: textbook
depends_on:
  - "[[Approximate Algorithms and Approximate Models]]"
  - "[[The Typical Set and the Log Posterior Density]]"
used_by:
  - "[[Modeling Ideas to Address Computing Problems]]"
  - "[[Variational Inference and Pathfinder]]"
aliases:
  - "INLA"
  - "TMB"
  - "L-BFGS"
  - "Nested Laplace"
  - "Pareto k diagnostic"
---

# Approximations Based on Joint and Conditional Posterior Modes

> [!summary]
> When the posterior is close to normal, a **normal approximation at the mode** with covariance from the
> second derivatives of the log density can be enough — and it comes with a **checkable diagnostic**: draw
> from the fitted normal, form the ratio of target to approximate density, and read the **Pareto $\hat{k}$**.
> If $\hat{k} < 0.7$, the same ratios can be used as importance weights to *improve* the approximation. The
> more powerful idea is **conditional** rather than joint modes: for hierarchical models the local parameters
> are often near-normal given the hyperparameters, which is the basis of **INLA** and **TMB**.

## Overview

> [!definition] When a modal approximation suffices (Ch. 13.1, p. 240)
> "**When sample size is large and the likelihood is highly informative compared to the number of model
> parameters, the posterior distribution is likely to be close to normal, and a modal approximation can be
> sufficiently accurate. For hierarchical models, the requirement is that there be many observations — an
> informative likelihood — for each group-specific local parameter.**
>
> **If the posterior is very narrow, integration over the posterior should not greatly affect the predictive
> distribution, and the modal point estimate can be used to make predictions.**"
>
> **The optimizer:** "**Posterior modes — that is, local maxima of the target function — can be obtained
> using efficient optimization methods; Stan uses the L-BFGS algorithm**" (Nocedal and Wright 2006).
>
> **A second, cheaper use:** "**Optimization and modal point estimates can also be used to quickly test model
> code implementation before running MCMC.**" Demonstrated in Ch. 27.
^def-when-modal-works

Note the tension with [[The Typical Set and the Log Posterior Density]], where "**the posterior mode may not
be typical**" and the mode of a 100-dimensional normal sits far outside the 99% typical set. Both are true:
**the mode is a bad summary of a high-dimensional posterior, but a normal fitted at the mode can still be a
good approximation to it** — because the approximation carries the curvature, not just the location.

## Main Content

### The Laplace approximation

> [!definition] Normal at the joint mode (Tierney and Kadane 1986)
> "**The second derivatives of the log posterior density can be used to form a normal approximation at the
> mode so as to provide uncertainty quantification. If the posterior is close to normal, this approximation
> can be sufficient, and there is no need for more costly computations.**
>
> **This method originated in the era before convenient simulation-based approximation, but it can still be
> useful to speed computation for high-dimensional posteriors that are otherwise well behaved**" (Rasmussen
> and Williams 2006; Rue, Martino, and Chopin 2009a; Margossian, Vehtari, et al. 2020a).
^def-laplace

> [!important] How to check it — and then improve it
> "**The closeness of the approximation can be assessed by:**
> 1. **drawing from the fitted multivariate normal distribution**,
> 2. **computing the ratio of target density and approximate density given those draws**, and
> 3. **using the Pareto $\hat{k}$ diagnostic** (Vehtari, Simpson, et al. 2024) **to analyze the distribution
>    of those ratios.**
>
> **If the Pareto $\hat{k}$ is below 0.7, we can use the ratios as importance weights to improve the
> approximation.**"
>
> This is the same $\hat{k} < 0.7$ threshold that governs
> [[Cross Validation Checking|PSIS-LOO]] and [[Influence of Likelihood and Prior|power-scaling]] — and for
> the same reason: **all three are importance-sampling corrections, and $\hat{k}$ measures whether the
> weights have finite enough variance for the correction to be trustworthy.**
>
> Note the two-for-one structure: the diagnostic and the improvement come from the *same* computation. If
> the ratios are well behaved you get a corrected posterior for free; if they are not, you know the
> approximation failed.

### Conditional modes: the INLA idea

> [!warning] Where joint modes fail
> "**Mode-based approximations will not work for hierarchical models, mixture models, or other distributions
> where the distribution is highly skewed.**"

> [!definition] Approximate integration of local parameters (Ch. 13.1, p. 240)
> "**For many hierarchical models, the conditional posterior of local parameters given the hyperparameters is
> close to normal. Often a normal prior is used for the local parameters, and then the local posterior is
> close to normal, either because of normal prior and weak likelihood or because of strong likelihood.**
>
> **In such cases, the normal approximation centered at the mode can be used to integrate over the local
> posteriors to approximate the marginal posterior density for the higher-level parameters.**"
>
> **The software this underlies:**
> | Method / package | Domain |
> |---|---|
> | **INLA** (Rue, Martino, and Chopin 2009a) | integrated nested Laplace approximation |
> | **TMB** (Kristensen et al. 2016) | template model builder |
> | **GPstuff** (Vanhatalo et al. 2013), **GPML** (Rasmussen and Nickisch 2010) | Gaussian process models |
>
> **The non-Bayesian counterpart:** "**The corresponding computation in non-Bayesian inference is restricted
> maximum likelihood (REML), for example in the R package `lme4`** (Pinheiro and Bates 2000; Bates et al.
> 2015). **The package `blme`** (Dorie et al. 2024) **includes prior distributions so that the algorithm
> approximates the posterior mode.**"
^def-nested-laplace

The structural insight worth carrying: **the difficulty in a hierarchical model is the *joint* geometry (the
funnel), not the conditional geometry.** Given $\sigma_0$, the $\mu_k$ are perfectly well behaved. So
integrating out the local parameters conditionally and doing the hard work only on the low-dimensional
hyperparameter space is the same strategic move as the
[[Modeling Ideas to Address Computing Problems#Remedy 2 — Marginalization|marginalization]] remedy — INLA is
that remedy made automatic and approximate.

## Examples

> [!example] Exercise 13.4 — the full modal-approximation workflow (Ch. 13.7, p. 247)
> Model: $y_j \sim \text{binomial}(n_j, \theta_j)$ with $\theta_j = \text{logit}^{-1}(\alpha + \beta x_j)$,
> $j = 1,\dots,J$, priors $\alpha \sim t_4(0,2)$ and $\beta \sim t_4(0,1)$. Take $J = 10$,
> $x_j \sim \text{uniform}(0,1)$, $n_j \sim \text{Poisson}_+(5)$.
>
> **(a)** Sample a dataset from the model.
> **(b)** Estimate $\alpha,\beta$ in Stan; graph data, fit, and uncertainty together. "**Did your posterior
> 50% interval for $\alpha$ contain its true value? How about $\beta$?**"
> **(c)** "**Approximate the posterior density for $(\alpha,\beta)$ by a normal centered at the posterior
> mode with covariance matrix fit to the curvature at the mode.**"
> **(d)** "**Evaluate the accuracy of the approximation and use Pareto-smoothed importance sampling to
> improve it.**"
>
> Parts (c)-(d) are exactly the check-and-correct procedure above, on a problem small enough to see.

> [!example] Exercise 13.1(e)-(f) — deriving the Laplace approximation for a hierarchical model
> For the hierarchical model $\tau \sim p(\tau)$, $\theta_i | \tau \sim \text{normal}(0,\tau)$,
> $y_i \sim p(y|\theta_i)$:
> - **(e)** When $p(y|\theta)$ is **not** normal, "**we no longer have an analytical expression for
>   $p(\theta|y,\tau)$ but instead can resort to a Laplace approximation: a normal which matches the mode of
>   $p(\theta|y,\tau)$ and the curvature at the mode. Find the mean and covariance matrix of the Laplace
>   approximation: these will in general depend on $y$ and $\tau$.**"
> - **(f)** "**Based on the Laplace approximation, find an approximation for the marginal density
>   $p(y|\tau)$.**"
>
> Parts (c)-(d) of the same exercise establish the *exact* version for a normal likelihood — so the exercise
> walks the reader from exact marginalization to nested Laplace in four steps.

## Connections

- The mode/typical-set tension is resolved by noticing that Laplace uses **curvature**, which is what makes
  it an approximation to the distribution rather than a point summary — the objection in
  [[Point Estimates and Uncertainties]] is to the *bare* mode.
- Nested Laplace is automated [[Modeling Ideas to Address Computing Problems#Remedy 2 — Marginalization]],
  and Margossian, Vehtari, et al. (2020b) show that coupling it with HMC "can, depending on the case, be
  more effective than reparameterization."
- The Pareto $\hat{k}$ check makes this the most *auditable* of the approximations in Ch. 13 — contrast
  [[Variational Inference and Pathfinder]], where "**in many cases, it is unclear how well $q^*$
  approximates $p$.**"

## See Also
- [[Approximate Algorithms and Approximate Models]] — the chapter overview and the "exact algorithm for an approximate model" framing
- [[Variational Inference and Pathfinder]] — optimization-based approximation that does *not* fit to the mode
- [[The Typical Set and the Log Posterior Density]] — why the mode alone is not a good summary
- [[Approximation Methods]] — BDA3 background on normal approximations
