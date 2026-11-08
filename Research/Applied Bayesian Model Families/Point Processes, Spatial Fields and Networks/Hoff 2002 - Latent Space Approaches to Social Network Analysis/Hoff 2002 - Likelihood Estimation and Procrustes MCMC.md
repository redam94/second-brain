---
title: "Hoff 2002 - Likelihood Estimation and Procrustes MCMC"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/theorem
  - doc/paper
source: "[[raw/Hoff 2002 - Latent Space Approaches to Social Network Analysis.pdf]]"
source_location: "Sec. 3, pp. 1092-1093, eq. 4-5"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Hoff 2002 - Latent Space Approaches to Social Network Analysis"
doc_type: paper
depends_on:
  - "[[Hoff 2002 - Distance and Projection Models]]"
used_by:
  - "[[Hoff 2002 - Monks Florentine Families and Classroom Examples]]"
aliases:
  - "Procrustes MCMC for latent positions"
  - "latent space likelihood"
---

# Hoff 2002 - Likelihood Estimation and Procrustes MCMC

> [!summary]
> The log-likelihood $\sum_{i\ne j}\{\eta_{ij}y_{ij}-\log(1+e^{\eta_{ij}})\}$ is concave in $\eta$ but not in $(\alpha,Z)$, so MLE needs a good start (MDS on path-length distances). Positions are identified only up to rotation, reflection and translation; inference is on Procrustes-aligned configurations $Z^*=Z_0Z'(ZZ_0'Z_0Z')^{-1/2}Z$ in a Metropolis-Hastings chain.

## Overview
Unlike $p^*$ models, the conditional-independence likelihood is a product of Bernoullis, so ML and Bayes are practical.

## Main Content

> [!definition] Log-likelihood (eq. 4)
> $\log P(Y\mid\eta)=\sum_{i\neq j}\{\eta_{ij}y_{ij}-\log(1+e^{\eta_{ij}})\}$, with $\eta$ a function of $(\alpha,\beta,Z)$.

^def-latent-loglik

> [!theorem] Concavity and non-identifiability
> (a) The log-likelihood is strictly concave in $\eta$. For the semiparametric model $\eta=\alpha\mathbf 1\mathbf 1^\top-D$ with $D$ constrained to be a symmetric positive matrix satisfying the triangle inequality, the parameter space $\{\alpha,D\}$ is convex and $\eta$ is affine, so there is a unique maximiser (but $\alpha$ is confounded with $D$). (b) For the distance or projection model $\eta(\alpha,Z)$ is **not** affine, so the log-likelihood is not generally concave in $\{\alpha,Z\}$. (c) For any $k\times n$ latent matrix $Z$, $\log P(Y\mid Z,\alpha)=\log P(Y\mid Z^*,\alpha)$ for $Z^*$ equivalent to $Z$ under reflection, rotation or translation (distance model); the projection model is invariant under rotation and reflection only.

^thm-latent-nonconcave

Resolution: work with the equivalence class $[Z]$ (a *configuration*) and a Procrustes representative.

> [!definition] Procrustes transformation
> For a reference $Z_0$ and positions $Z$, $Z^*=\arg\min_{TZ}\text{tr}\,(Z_0-TZ)'(Z_0-TZ)$ over rotations/reflections $T$; for centred matrices $Z^*=Z_0Z'(ZZ_0'Z_0Z')^{-1/2}Z$ (Sibson 1979). Take $Z_0=\hat Z$ (the MLE centred at the origin).

^def-procrustes

> [!theorem] Sampling procedure (Sec. 3)
> 1. Find an MLE $\hat Z$ centred at origin by direct maximisation (start from classical MDS of ad hoc dissimilarities, e.g. Euclidean distance between rows/columns of $Y$ or average directed geodesic length).
> 2. Using $Z_0=\hat Z$ as starting value, run a Markov chain: (a) sample a proposal $\tilde Z\sim J(\cdot\mid Z_k)$, symmetric; (b) accept $Z_{k+1}=\tilde Z$ with probability $\min\{1,\ p(Y\mid\tilde Z,\alpha_k,\beta_k,X)\pi(\tilde Z)\,/\,[p(Y\mid Z_k,\alpha_k,\beta_k,X)\pi(Z_k)]\}$, else $Z_{k+1}=Z_k$; (c) store $\tilde Z_{k+1}$, the Procrustes transform of $Z_{k+1}$ toward $\hat Z$ (the paper prints the minimand with index $k-1$, apparently a typo).
> 3. Update $\alpha$ and $\beta$ with a Metropolis-Hastings algorithm.
> For the projection model, only the alignment changes: $T$ ranges over rotations and reflections only (no translation).

^thm-procrustes-mcmc

Priors in the paper: diffuse independent $N(0,100^2)$ on $\alpha$ and the components of $Z$ (monk data); exponential with mean 2 for $\alpha$ in the Florentine example to keep predicted probabilities from reaching 0/1.

## Examples

> [!example] Rotation invariance and Procrustes alignment (numerical check)
> Setup: 12 actors in 2-D with $\alpha=2$; rotate and translate $Z$; the log-likelihood is unchanged (-82.899 both) and Procrustes alignment to the original recovers it with maximum error $\sim10^{-15}$.

```python
import numpy as np
def loglik(Z, alpha, Y):
    D = np.linalg.norm(Z[:, None] - Z[None], axis=2); eta = alpha - D
    m = ~np.eye(len(Z), dtype=bool); return np.sum(Y[m]*eta[m] - np.log1p(np.exp(eta[m])))
def procrustes(Z, Z0):                       # align Z to Z0 over orthogonal T (after centring)
    Zc, Z0c = Z - Z.mean(0), Z0 - Z0.mean(0)
    U, s, Vt = np.linalg.svd(Z0c.T @ Zc); return Zc @ (Vt.T @ U.T)
```
Use in PyMC: post-process draws of `Z` with `procrustes(draw, Z_ref)` before summarising or plotting (E21: "Hoff latent space + Procrustes").

## Connections
Positions' posterior is plotted per actor in [[Hoff 2002 - Monks Florentine Families and Classroom Examples]]. Related identification issue: label switching in mixtures and SBMs ([[Network Outcome Models - Stochastic Block Models and Network Checks]]).

## See Also
[[Hoff 2002 - Latent Space Models Overview]]
