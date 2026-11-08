---
title: "Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation"
tags:
  - source/ingested
  - topic/population-estimation
  - type/concept
  - doc/paper
source: "Concept note, no raw source (literature: Manrique-Vallier 2016 Biometrics 72(4): 1246-1254, not obtainable as open PDF here; Aleshin-Guendel 2020; Silverman 2020)"
source_location: "n/a (synthesis; model details of LCMCR from memory and the cited papers, verify against the paper before relying on prior specifics)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/Concept Notes - Counting the Unobserved (no raw source)"
doc_type: concept
depends_on:
  - "[[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]]"
  - "[[Concept - Marginalising Latent Discrete Counts for HMC]]"
used_by:
  - "[[Concept - Unseen Species and Latent Class Links]]"
aliases:
  - LCMCR
  - Dirichlet process mixture capture-recapture
  - latent class multiple systems estimation
---

# Concept - Latent Class and Dirichlet Process Models for Multiple Systems Estimation

> [!summary]
> LCMCR (Manrique-Vallier 2016) models the $2^K$ list-inclusion table as a mixture of product-Bernoulli latent classes with a truncated Dirichlet-process (stick-breaking) weight prior, and treats the unseen individuals by data augmentation. It gives flexible heterogeneity without picking list interactions, but Aleshin-Guendel (2020) shows its families are non-identifiable when the number of classes exceeds $K/2$, and Silverman (2020) shows unstable results on the UK and Netherlands data.

## Overview

The log-linear family ([[Silverman 2020 - Poisson Log-Linear Model for Multiple Lists]]) models dependence between lists with explicit interaction terms, which become unwieldy and sparse for many lists. The latent-class approach instead assumes dependence arises from unobserved heterogeneity: given an individual's latent class, lists include them independently ($M_{th}$; [[Aleshin-Guendel 2020 - Mth Model and Identifiability Definition]]).

## Main Content

> [!definition] Latent class capture-recapture model
> Each individual $i=1..N$ has class $c_i\sim\text{Categorical}(\nu_1..\nu_J)$ and inclusion indicators $x_{ik}\mid c_i=j\sim\text{Bernoulli}(\lambda_{jk})$ independently over lists $k=1..K$. The observed cells are those with some $x_{ik}=1$; $N$ includes $N-n$ unseen individuals with $x_i=0$.
> Marginal cell probability: $\pi_h=\sum_j\nu_j\prod_k\lambda_{jk}^{h_k}(1-\lambda_{jk})^{1-h_k}$; the missing cell is $\pi_0=\sum_j\nu_j\prod_k(1-\lambda_{jk})$.
^def-lcm-capture-recapture

> [!definition] Dirichlet-process version (LCMCR; details to verify)
> Replace finite $J$ by a stick-breaking prior: $\nu_j=v_j\prod_{l<j}(1-v_l)$, $v_j\sim\text{Beta}(1,\alpha)$, truncated at $J^*$ classes, with a hyperprior on the concentration $\alpha$ and Beta priors on $\lambda_{jk}$; the population size has a prior of the form $p(N)\propto1/N$ (improper) or a bounded alternative, and inference is by Gibbs sampling with data augmentation of the unobserved individuals (as I recall; confirm exact hyperparameters against the paper and the R package LCMCR). Reported summary: posterior of $N$, including the uncertainty from the augmented zero-pattern count.
^def-lcmcr-dp

> [!theorem] Identification bound (from Aleshin-Guendel 2020)
> With $J^*$ distinct classes and $K$ lists, the family is identified iff $2J^*\le K$. The LCMCR default $J^*=5$ requires $K\ge10$; the recommended $J^*=K$ never is. Practical reading: with $K\le9$ lists the posterior for $N$ is partly set by the prior over class structure and the truncation level.
^thm-lcm-identification-bound

**Computation.** In a probabilistic-programming implementation, classes are summed out per cell using `logsumexp` rather than sampled ([[Concept - Marginalising Latent Discrete Counts for HMC]]); the unseen cell contributes the term $\pi_0$ through $n\sim\text{Binomial}(N,1-\pi_0)$ combined with a prior on $N$. Label switching is handled by ordering constraints, and the cell-level likelihood avoids per-individual class indicators when counts are aggregated (a $2^K$ table has at most $2^K-1$ distinct patterns).

**Diagnostics.** (a) Vary $J^*$ below and above $K/2$ and compare posterior intervals for $N$ (stability). (b) Merge two small lists and re-estimate: a good estimator should not move much (this exposed Netherlands instability in [[Silverman 2020 - Madigan-York and Dirichlet Process Benchmarks]]). (c) Prior-versus-posterior comparison for $N$.

## Examples

> [!example] PyMC-style sketch (untested): finite latent class MSE on a table
> ```python
> import numpy as np, pymc as pm, pytensor.tensor as pt, itertools
> K, J = 4, 2                                   # keep 2J <= K for identification
> H = np.array([h for h in itertools.product([0,1], repeat=K) if any(h)])
> counts = np.array([...])                      # observed cell counts, one per row of H
> n = counts.sum()
> with pm.Model() as lcm:
>     nu = pm.Dirichlet("nu", np.ones(J))
>     lam = pm.Beta("lam", 1, 1, shape=(J, K))
>     # log cell probabilities per class: (J, 2^K-1)
>     logc = (H[None] * pt.log(lam)[:, None] + (1-H[None]) * pt.log1p(-lam)[:, None]).sum(-1)
>     logpi = pm.math.logsumexp(pt.log(nu)[:, None] + logc, axis=0)
>     log_pi0 = pm.math.logsumexp(pt.log(nu) + pt.log1p(-lam).sum(1))
>     # conditional multinomial likelihood of observed cells, then add N | n via a prior on N
>     pm.Potential("cells", pt.sum(counts * (logpi - pt.log1p(-pt.exp(log_pi0)))))
>     pm.Deterministic("dark_per_observed", pt.exp(log_pi0) / (1 - pt.exp(log_pi0)))
> ```
> Posterior draws of $\pi_0$ give $N=n/(1-\pi_0)$ (point) and, with a Negative-Binomial predictive for the unseen count, a full interval. Not tested; check with simulated data where the truth is known.

> [!example] Relevance to marketing measurement
> Latent class models for overlapping audiences (heavy vs light users) mirror the $M_{th}$ idea: dependence between data sources is explained by unobserved segments rather than pairwise interaction terms. The identification warning transfers directly: with only a few sources you cannot support many latent segments.

## Connections

- Nonparametric priors: [[Nonparametric Models Overview]].
- Heterogeneity as a hierarchical model: [[Hierarchical Models]].
- Why identifiability matters here: [[Aleshin-Guendel 2020 - Latent Class Identifiability Theorem and LCMCR]].

## See Also

- [[Concept - Closed-Population Capture-Recapture and Otis Models]]
- [[Concept - Unseen Species and Latent Class Links]]
