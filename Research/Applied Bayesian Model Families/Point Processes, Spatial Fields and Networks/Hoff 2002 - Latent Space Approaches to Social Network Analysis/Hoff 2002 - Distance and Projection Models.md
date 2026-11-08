---
title: "Hoff 2002 - Distance and Projection Models"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/definition
  - doc/paper
source: "[[raw/Hoff 2002 - Latent Space Approaches to Social Network Analysis.pdf]]"
source_location: "Sec. 1-2, pp. 1090-1092, eq. 1-3"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Hoff 2002 - Latent Space Approaches to Social Network Analysis"
doc_type: paper
depends_on:
used_by:
  - "[[Hoff 2002 - Likelihood Estimation and Procrustes MCMC]]"
aliases:
  - "latent distance model"
  - "latent position model"
  - "projection model"
---

# Hoff 2002 - Distance and Projection Models

> [!summary]
> Given latent positions $z_i\in\mathbb R^k$, ties are conditionally independent with log-odds $\alpha+\beta^\top x_{ij}-|z_i-z_j|$ (distance model). Reciprocity and transitivity follow from the triangle inequality. A projection model uses unit vectors $v_i$ and activity $a_i$ to allow asymmetry: log-odds $\alpha+\beta^\top x_{ij}+z_i^\top z_j/|z_j|$.

## Overview
Background: $p_1$ (Holland & Leinhardt 1981) assumes dyad independence; $p^*$/ERGMs (Frank & Strauss 1986) suffer degeneracy (Handcock 2000, Snijders 2002); the stochastic blockmodel (Wang & Wong 1987) needs known groups; Nowicki & Snijders (2001) use latent classes. The latent-space view says ties become likelier when actors' unobserved characteristics are close.

## Main Content

> [!definition] Conditional independence latent position model
> $Y$ is the $n\times n$ sociomatrix, $x_{ij}$ pair covariates, $\theta$ parameters, $Z=(z_1,\dots,z_n)$ latent positions:
> $$P(Y\mid Z,X,\theta)=\prod_{i\neq j}P(y_{ij}\mid z_i,z_j,x_{ij},\theta).$$

^def-latent-position-model

> [!definition] Distance model (eq. 1)
> $$\eta_{ij}=\text{log odds}(y_{ij}=1\mid z_i,z_j,x_{ij},\alpha,\beta)=\alpha+\beta^\top x_{ij}-|z_i-z_j|.$$
> Interpretation: for $j$ and $k$ equidistant from $i$ the odds ratio of $i\to j$ vs $i\to k$ is $\exp\{\beta^\top(x_{ij}-x_{ik})\}$. Distances could be any set satisfying the triangle inequality; Euclidean in low dimension is chosen for parsimony and interpretability. Reciprocity and transitivity: if $i\to j$ and $j\to k$ then $d_{ij},d_{jk}$ are probably small, so $d_{ji}$ (reciprocity) and $d_{ik}$ (transitivity) are small.

^def-distance-model

> [!definition] Uncovariate parameterisation and $d_k$-representability (eq. 2-3)
> For undirected ties with no covariates, $\text{logodds}(y_{ij}=1\mid d_{ij},\alpha)=\alpha(1-d_{ij})$. A set of distances *represents* $Y$ if $d_{ij}>1$ whenever $y_{ij}=0$ and $d_{ij}<1$ whenever $y_{ij}=1$; as $\alpha\to\infty$ the data probability tends to 1. A network is $d_k$ representable if there are $z_i\in\mathbb R^k$ with these distance properties, i.e. $i\sim j$ iff $i,j$ lie within $k$-dimensional unit balls centred at each other.

^def-dk-representable

Examples of low-dimensional representability: an $n$-star is trivially $d_{2}$ representable (periphery on two opposite sides of the hub); an $n$-chain $1\sim2\sim\dots\sim n$ is $d_2$ representable for every $n$ (equidistant positions on a spiral/line segment). Model complexity: $[nk]$ position parameters versus $n(n-1)$ data.

> [!definition] Projection model (Sec. 2.2)
> To allow $p(i\to j)\ne p(j\to i)$, give each actor an unit-length $k$-vector $v_i$ and activity $a_i>0$, $z_i=a_iv_i$ ($v_i^\top v_j>0$, $=0$, $<0$ means the characteristics point in the same, orthogonal, opposite direction). Then
> $$\text{logodds}(y_{ij}=1\mid z_i,z_j,x_{ij},\alpha,\beta)=\alpha+\beta^\top x_{ij}+\frac{z_i^\top z_j}{|z_j|}.$$
> The term is the signed magnitude of the projection of $z_i$ on the direction of $z_j$. Variant: acceptance rates via $z_i^\top z_j/|z_i|$.

^def-projection-model

## Examples

> [!example] Simulate from a latent distance model and check transitivity
> Setup: 30 actors, $z_i\sim N(0,I_2)$, $\alpha=2$; compare transitive triad count to an Erdos-Renyi graph with the same density.

```python
import numpy as np
rng = np.random.default_rng(1); n = 30; Z = rng.normal(size=(n, 2)); alpha = 2.0
D = np.linalg.norm(Z[:, None] - Z[None], axis=2); p = 1/(1 + np.exp(-(alpha - D)))
A = (rng.uniform(size=(n, n)) < np.triu(p, 1)); A = (A | A.T).astype(int)
tri = np.trace(np.linalg.matrix_power(A, 3))/6
dens = A.sum()/(n*(n-1)); ER = (rng.uniform(size=(n, n)) < dens); ER = np.triu(ER, 1); ER = (ER | ER.T).astype(int)
print("triangles latent:", tri, " ER:", np.trace(np.linalg.matrix_power(ER, 3))/6)
```

PyMC sketch of the distance model (untested):
```python
import pymc as pm, pytensor.tensor as pt
with pm.Model():
    alpha = pm.Normal("alpha", 0, 3); Z = pm.Normal("Z", 0, 1, shape=(n, 2))
    D = pt.sqrt(((Z[:, None, :] - Z[None, :, :])**2).sum(-1) + 1e-9)
    eta = alpha - D
    pm.Bernoulli("y", logit_p=eta[iu], observed=y[iu])    # iu: i<j indices for undirected
```
Remember positions are only identified up to rotation/reflection/translation (see estimation note).

## Connections
[[Hoff 2002 - Likelihood Estimation and Procrustes MCMC]] handles non-identifiability. For ICAR/graph smoothing the contrast is [[Riebler 2016 - Scaling and the BYM2 Construction]]; basic network GLMs: [[Social Network Models]].

## See Also
[[Hoff 2002 - Latent Space Models Overview]]
