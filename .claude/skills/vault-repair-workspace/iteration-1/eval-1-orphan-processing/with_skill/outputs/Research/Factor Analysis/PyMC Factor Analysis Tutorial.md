---
title: "PyMC Factor Analysis Tutorial"
tags:
  - source/ingested
  - topic/bayesian-statistics
  - topic/dimensionality-reduction
  - type/example
  - doc/tutorial
  - method/pymc
  - method/factor-analysis
source: "[[raw/Factor analysis]]"
source_location: "Full tutorial"
date_ingested: 2026-04-09
folder: "Research/Factor Analysis"
doc_type: tutorial
depends_on:
  - "[[Factor Analysis Model]]"
  - "[[Identifiability in Factor Models]]"
  - "[[Amortized Inference for Factor Analysis]]"
  - "[[Post-hoc Factor Score Recovery]]"
used_by: []
aliases:
  - Factor analysis PyMC example
  - PPCA tutorial
---

# PyMC Factor Analysis Tutorial

> [!summary]
> A complete walkthrough of implementing factor analysis / probabilistic PCA in PyMC, progressing from a naive (non-identified) model through constrained parametrization to amortized inference with minibatch ADVI. Demonstrates simulated data generation, model fitting, convergence diagnostics, post-hoc factor score recovery, and reconstruction quality assessment.

## Overview

This tutorial implements the [[Factor Analysis Model]] in PyMC, demonstrating three progressively better approaches:
1. **Naive model** -- suffers from non-identifiability (see [[Identifiability in Factor Models]])
2. **Constrained model** -- lower-triangular $W$ with positive increasing diagonal
3. **Amortized model** -- marginalizes $F$ for scalability (see [[Amortized Inference for Factor Analysis]])

Source: [PyMC Factor Analysis Case Study](https://www.pymc.io/projects/examples/en/latest/case_studies/factor_analysis.html)

## Step 1: Simulated Data Generation

Generate data with $N=250$ observations, $d=10$ observed dimensions, and $k_{\text{true}}=4$ latent factors:

```python
import arviz.preview as az
import numpy as np
import pymc as pm
import pytensor.tensor as pt
import scipy as sp
import seaborn as sns
import xarray as xr

from matplotlib import pyplot as plt
from numpy.random import default_rng
from xarray_einstats import linalg
from xarray_einstats.stats import XrContinuousRV

RANDOM_SEED = 31415
rng = default_rng(RANDOM_SEED)

n = 250
k_true = 4
d = 10

err_sd = 2
M = rng.binomial(1, 0.25, size=(k_true, n))
Q = np.hstack(
    [rng.exponential(2 * k_true - k, size=(d, 1)) for k in range(k_true)]
) * rng.binomial(1, 0.75, size=(d, k_true))
Y = np.round(1000 * Q @ M + rng.standard_normal(size=(d, n)) * err_sd) / 1000
```

The data is generated via $Y = QM + \epsilon$ where $M$ is a binary latent matrix (not Gaussian -- deliberately deviating from the model's assumptions) and $\epsilon$ is Gaussian noise. The covariance $QQ^\top$ is low-rank, which is visible in the correlation heatmap.

## Step 2: Naive Model (Non-Identified)

```python
k = 2
coords = {
    "latent_columns": np.arange(k),
    "rows": np.arange(n),
    "observed_columns": np.arange(d),
}

with pm.Model(coords=coords) as PPCA:
    W = pm.Normal("W", dims=("observed_columns", "latent_columns"))
    F = pm.Normal("F", dims=("latent_columns", "rows"))
    sigma = pm.HalfNormal("sigma", 1.0)
    X = pm.Normal("X", mu=W @ F, sigma=sigma, observed=Y,
                  dims=("observed_columns", "rows"))
    trace = pm.sample(tune=2000, random_seed=rng)
```

This produces convergence warnings ($\hat{R} > 1.01$, low ESS) due to [[Identifiability in Factor Models|non-identifiability]].

## Step 3: Constrained Model (Identified)

Using the constrained $W$ from [[Identifiability in Factor Models]]:

```python
with pm.Model(coords=coords) as PPCA_identified:
    W = makeW(d, k, ("observed_columns", "latent_columns"))
    F = pm.Normal("F", dims=("latent_columns", "rows"))
    sigma = pm.HalfNormal("sigma", 1.0)
    X = pm.Normal("X", mu=W @ F, sigma=sigma, observed=Y,
                  dims=("observed_columns", "rows"))
    trace = pm.sample(tune=2000, random_seed=rng, target_accept=0.9)
```

Chains now agree on posterior means; convergence improves substantially.

## Step 4: Amortized Model

Marginalizing $F$ per [[Amortized Inference for Factor Analysis]]:

```python
with pm.Model(coords=coords) as PPCA_amortized:
    W = makeW(d, k, ("observed_columns", "latent_columns"))
    sigma = pm.HalfNormal("sigma", 1.0)
    cov = W @ W.T + sigma**2 * pt.eye(d)
    X = pm.MvNormal("X", 0.0, cov=cov, observed=Y.T,
                    dims=("rows", "observed_columns"))
    trace_amortized = pm.sample(tune=30, draws=100, random_seed=rng)
```

## Step 5: Minibatch ADVI

```python
with pm.Model(coords=coords) as PPCA_amortized_batched:
    W = makeW(d, k, ("observed_columns", "latent_columns"))
    Y_mb = pm.Minibatch(Y.T, batch_size=50)
    sigma = pm.HalfNormal("sigma", 1.0)
    cov = W @ W.T + sigma**2 * pt.eye(d)
    X = pm.MvNormal("X", 0.0, cov=cov, observed=Y_mb)
    trace_vi = pm.fit(n=50000, method="fullrank_advi", obj_n_mc=1).sample()
```

## Step 6: Post-hoc Factor Recovery and Reconstruction

After fitting, recover $F$ using the conjugate posterior (see [[Post-hoc Factor Score Recovery]]) and assess reconstruction quality by comparing $\hat{X} = WF$ against original data.

> [!example] Example: Results Comparison
> Comparing MCMC (explicit $F$), MCMC (amortized), and FullRank ADVI (amortized) posteriors for a single entry $W_{3,1}$: all three methods produce similar posterior distributions, with MCMC approaches agreeing closely and ADVI slightly offset. Even with $k=2$ (half the true rank), the model captures substantial variation in $Y$.

## Connections

- This tutorial demonstrates the full pipeline from [[Factor Analysis Model]] through [[Identifiability in Factor Models]] to [[Amortized Inference for Factor Analysis]]
- The minibatch ADVI approach uses techniques from [[Approximation Methods]]
- The factor score recovery uses Bayesian conjugate updating (see [[Post-hoc Factor Score Recovery]])

## See Also
- [[Factor Analysis Model]] -- Theory behind the model
- [[Identifiability in Factor Models]] -- Why the naive model fails
- [[Amortized Inference for Factor Analysis]] -- Marginalizing $F$ for scalability
- [[Post-hoc Factor Score Recovery]] -- Recovering $F$ after amortized fitting
- [[Confirmatory Factor Analysis and SEM]] -- Related: CFA with structural equations
- [[raw/Factor analysis]] -- Original source with all plots and outputs
