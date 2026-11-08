---
title: "MacKenzie 2002 - Occupancy Model and Likelihood"
tags:
  - source/ingested
  - topic/population-estimation
  - type/definition
  - doc/paper
source: "[[raw/MacKenzie 2002 - Estimating Site Occupancy Rates When Detection Probabilities Are Less Than One.pdf]]"
source_location: "Methods, pp. 2249-2250"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Counting the Unobserved/MacKenzie et al 2002 - Site Occupancy with Imperfect Detection"
doc_type: paper
depends_on:
  - "[[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]]"
used_by:
  - "[[MacKenzie 2002 - Simulation Study and Maryland Anuran Results]]"
  - "[[MacKenzie 2002 - Extensions, Design Guidance and PyMC Sketch]]"
aliases:
  - single-season occupancy likelihood
  - MacKenzie occupancy likelihood
---

# MacKenzie 2002 - Occupancy Model and Likelihood

> [!summary]
> Sites are closed during $T$ visits; a site is occupied with probability $\psi$ and, if occupied, the species is detected on visit $t$ with probability $p_t$ (never falsely detected). The all-zero history has a two-part probability, "occupied but missed" plus "absent", and this mixture separates $\psi$ from $p$.

## Overview

Notation: $\psi_i$ presence probability at site $i$; $p_{it}$ detection probability at site $i$, occasion $t$, given presence; $N$ surveyed sites; $T$ occasions; $n_t$ sites with a detection at $t$; $n_\cdot$ sites with at least one detection.

> [!definition] Sampling assumptions
> (1) Sites are **closed**: none becomes occupied or abandoned during the survey period. (2) The species is never falsely detected when absent. (3) Detection at a site is independent of detection at other sites. Data per site are a 0/1 vector of detection histories.
^def-occupancy-assumptions

## Main Content

### Analogy to closed-population capture-recapture
Sites play the role of individuals, except that the number of "never captured" sites is observed (the total $N$ is known); what is unknown is the share truly occupied. Applying a classical closed-population model ([[Concept - Closed-Population Capture-Recapture and Otis Models]]) to the detected sites only would estimate the number of occupied sites, but the occupancy formulation also lets $\psi$ depend on covariates.

> [!definition] Site-level likelihood
> For a site with at least one detection (e.g. history 01010):
> $$L_i = \psi_i\,(1-p_{i1})\,p_{i2}\,(1-p_{i3})\,p_{i4}\,(1-p_{i5}).$$
> For a never-detected site (00000):
> $$L_k = \psi_k \prod_{t=1}^{5}(1-p_{kt}) + (1-\psi_k).$$
> The model likelihood is the product over independent sites.
^def-occupancy-site-likelihood

With fully site-specific $\psi_i,p_{it}$ the likelihood is over-parameterised; the probabilities must be constant or modelled through covariates.

> [!theorem] Constant-parameter likelihood (Eq. 1)
> With $\psi$ and $p_t$ constant across sites,
> $$L(\psi,\mathbf p)=\psi^{n_\cdot}\left[\prod_{t=1}^{T}p_t^{\,n_t}(1-p_t)^{\,n_\cdot-n_t}\right]\left[\psi\prod_{t=1}^{T}(1-p_t)+(1-\psi)\right]^{N-n_\cdot}.$$
> Only $(n_1,\dots,n_T,n_\cdot)$ and $N$ are needed, so it can be maximised in a spreadsheet.
^thm-occupancy-eq1

*Why the factorisation holds.* The $n_\cdot$ sites with a detection must be occupied; each contributes $\psi$ times a Bernoulli product over its visits, and collecting visit-wise terms gives $\prod_t p_t^{n_t}(1-p_t)^{n_\cdot-n_t}$. The $N-n_\cdot$ all-zero sites each contribute the mixture term.

### Standard errors
The authors recommend the **nonparametric bootstrap** (resample $N$ sites with replacement, refit, take the SD of estimates; Buckland and Garthwaite 1991) over asymptotic second-derivative variances, because the asymptotic value is a lower bound and may be too small in small samples.

### Covariates (Eq. 2-3)
> [!definition] Logistic covariate models
> For a parameter $\theta\in\{\psi,p\}$ with covariate matrix $X$ and coefficient vector $B$:
> $$\theta=\frac{\exp(XB)}{1+\exp(XB)}.$$
> With covariates on $\psi$, the average presence probability is $\hat\psi=\sum_{i=1}^{N}\hat\psi_i/N$ (Eq. 3). Covariates for $\psi$ must be site-specific and time-constant (closure); covariates for $p$ may be time-varying and site-specific (e.g. temperature).
^def-occupancy-covariates

Contrast with mark-recapture: there, a time-varying individual covariate is observed only when the individual is captured. Here, site covariates can be recorded on every visit whether or not the species is detected. Time-varying covariates that cannot be measured independently of the detection process are not allowed.

### Missing observations
If site $i$ is not sampled on occasion $t$, that occasion contributes no factor. Example: history 10-11 (no sampling at time 3) has likelihood $\psi\,p_1(1-p_2)\,p_4\,p_5$. This works only with the per-site likelihood, not the pooled Eq. 1.

## Examples

> [!example] Worked example: how much does non-detection tell us?
> **Setup.** $\psi=0.5$, $p=0.3$, $T=5$ constant (illustrative, not from the paper).
> **Solution.** $P(00000)=0.5\cdot0.7^5+0.5=0.5840$. By Bayes, $P(\text{occupied}\mid 00000)=0.5\cdot0.7^5/0.5840=0.144$.
> **Interpretation.** After five empty visits a site still has a 14% chance of being occupied; the naive estimator treats this as 0%, which is its source of negative bias.
^ex-occupancy-posterior-nondetection

```python
import numpy as np
from scipy.optimize import minimize

def nll(theta, n_t, n_dot, N):
    psi = 1/(1+np.exp(-theta[0])); p = 1/(1+np.exp(-theta[1:]))
    ll = n_dot*np.log(psi) + np.sum(n_t*np.log(p) + (n_dot-n_t)*np.log1p(-p))
    ll += (N-n_dot)*np.log(psi*np.prod(1-p) + 1-psi)
    return -ll

rng = np.random.default_rng(1)
N, T, psi, p = 200, 5, 0.6, 0.3
z = rng.random(N) < psi
y = (rng.random((N, T)) < p) & z[:, None]
n_t, n_dot = y.sum(0).astype(float), y.any(1).sum()
fit = minimize(nll, np.zeros(1+T), args=(n_t, n_dot, N))
print("psi_hat =", 1/(1+np.exp(-fit.x[0])), " naive =", n_dot/N)
```

## Connections

- The all-zero mixture term is the zero-inflation device in [[Monsters and Mixtures]]; marginalising the binary latent state is the simplest case of [[Concept - Marginalising Latent Discrete Counts for HMC]].
- Site effects with partial pooling extend the model: [[Hierarchical Models]].

## See Also

- [[MacKenzie 2002 - Site Occupancy with Imperfect Detection - Overview]]
- [[MacKenzie 2002 - Simulation Study and Maryland Anuran Results]]
