---
title: "Silverman 2020 - Bayesian-Threshold Method"
tags:
  - source/ingested
  - topic/population-estimation
  - type/definition
  - doc/paper
source: "[[raw/Silverman 2020 - Multiple Systems Analysis for the Quantification of Modern Slavery.pdf]]"
source_location: "Sec. 6.1-6.2"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Silverman 2020 - Multiple Systems Analysis for Modern Slavery"
doc_type: paper
depends_on:
  - "[[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]]"
  - "[[Silverman 2020 - Existence, Identifiability and Empty Overlaps]]"
used_by:
  - "[[Silverman 2020 - Bayesian-Threshold Results and Conclusions]]"
aliases:
  - Bayesian thresholding MSE
  - Gaussian prior on interactions with thresholding
---

# Silverman 2020 - Bayesian-Threshold Method

> [!summary]
> Put flat priors on the intercept and main effects and $N(0,1/\lambda)$ priors on pairwise interactions, run MCMC (`MCMCpoisson`, MCMCpack), drop interactions whose |posterior mean| / posterior SD falls below a threshold $\tau$, and refit. Recommended defaults: variance 1 ($\lambda=1$) and $\tau=2$.

## Overview

Idea: allow the prior to shrink interactions toward zero without constraining the intercept or main effects (which determine list sizes and the dark figure). A true spike-and-slab prior (atom at zero plus a continuous part) is the ideal; thresholding approximates it (Johnstone and Silverman 2004) and standard MCMC software cannot do the mixed prior, so exact implementation is "a topic for future research".

## Main Content

> [!definition] Bayesian/threshold algorithm
> Model: Poisson log-linear (Eq. 1) of [[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]].
> **Step 1 (prior).** $\mu,\alpha_i,\beta_{ij}$ independent; $\mu$ and $\alpha_i$ have improper uniform priors on $(-\infty,\infty)$; $\beta_{ij}\sim N(0,1/\lambda)$, $\lambda\ge0$ ($\lambda=0$ means improper uniform). Fit by MCMC.
> **Step 2 (threshold).** Constrain to zero every $\beta_{ij}$ for which |posterior mean| / posterior SD does not exceed $\tau$, then rerun the MCMC with those interactions omitted. $\tau=0$ means no thresholding.
> Tuning: $\exp\beta_{ij}$ is the factor by which a case is more or less likely to be on both $i$ and $j$ than under independence, so $\beta_{ij}$ far outside $\pm1$ is implausible; prior variance $1/\lambda$ with $\lambda$ in 1 to 10 suggested. Liberal threshold $\tau=2$ (include interactions not clearly spurious); parsimonious $\tau=5$ (admittedly arbitrary).
^def-bayes-threshold

**Implementation (Sec. 6.2).**
- `MCMCpoisson` does not handle a mixture of improper-uniform and finite-variance priors; if $\lambda>0$, `MCMCfit` in `modslavmse` gives the intercept and main effects a large finite variance $10^4$.
- With $\lambda=0$ (improper) and empty overlaps, the interaction posterior is an atom at $-\infty$ and those cells must be removed ([[Silverman 2020 - Existence, Identifiability and Empty Overlaps]]; routine `removeemptyoverlaps`).
- With a proper prior the empty-overlap problem disappears because the posterior is proper; improper uniform is computationally fastest.
- The total population estimate is posterior draws of $e^{\mu}$ plus observed cases (quantiles reported include observed data).

## Examples

> [!example] Sketch in PyMC (untested)
> A Bayesian log-linear MSE with Gaussian interaction prior; the thresholding step is applied post hoc from the first fit.
> ```python
> import numpy as np, pymc as pm, itertools
> K = 4
> cells = [h for h in itertools.product([0,1], repeat=K) if any(h)]
> H = np.array(cells)                       # (2^K-1, K)
> pairs = list(itertools.combinations(range(K), 2))
> P = np.stack([H[:, i]*H[:, j] for i, j in pairs], 1)   # pair indicators
> y = np.array([...])                       # observed counts, same order as cells
> with pm.Model() as m:
>     mu = pm.Flat("mu"); alpha = pm.Flat("alpha", shape=K)
>     beta = pm.Normal("beta", 0, 1.0, shape=len(pairs))  # variance 1, Silverman default
>     log_lam = mu + H @ alpha + P @ beta
>     pm.Poisson("y", pm.math.exp(log_lam), observed=y)
>     pm.Deterministic("dark", pm.math.exp(mu))
>     idata = pm.sample()
> # threshold: keep pairs with |mean|/sd > 2, refit with only those columns
> ```
> The same model with a regularised horseshoe on `beta` replaces hard thresholding with continuous shrinkage; see [[Horseshoe and Regularized Horseshoe Priors]].
^ex-bayes-threshold-pymc

> [!example] Relevance to marketing measurement
> Pairwise "interaction" terms among overlapping data sources (panels, CRM lists, ad-server logs) are the analogue of list dependence. Shrinking weak interactions while leaving main effects unpenalised mirrors a standard MMM practice: do not shrink the quantities the decision depends on (baseline and main effects), do regularise the long tail of possible interactions.

## Connections

- Spike-and-slab and horseshoe alternatives: [[Global-Local Shrinkage Priors]], [[Horseshoe and Regularized Horseshoe Priors]].
- Prior predictive checks of $\beta_{ij}$ scale: [[Prior Predictive Checking]].

## See Also

- [[Silverman 2020 - Bayesian-Threshold Results and Conclusions]]
- [[Silverman 2020 - Multiple Systems Analysis for Modern Slavery - Overview]]
