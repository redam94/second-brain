---
title: "Phylogenetic Regression - Brownian Motion, OU and Pagel Lambda"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (literature cited in body)"
source_location: "Concept note; literature: Felsenstein 1985; Grafen 1989; Hansen 1997; Pagel 1999; Freckleton, Harvey & Pagel 2002; Ho & Ane 2014; Vehtari et al. 2016; Harmon 2019 (Phylogenetic Comparative Methods)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Structure Learning and Phylogenetics Concept Notes"
doc_type: paper
depends_on:
used_by:
  - "[[Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference]]"
aliases:
  - "phylogenetic regression"
  - "PGLS"
  - "Pagel lambda"
  - "OU process on a tree"
---

# Phylogenetic Regression - Brownian Motion, OU and Pagel Lambda

> [!summary]
> Concept note (no raw source). Species are not independent: shared ancestry induces correlation. Phylogenetic generalised least squares (PGLS) models $y=X\beta+\varepsilon$ with $\varepsilon\sim N(0,\sigma^2V)$ where $V$ is built from the tree: Brownian motion (BM) gives $V_{ij}$ = shared root-to-ancestor branch length; Pagel's $\lambda$ scales off-diagonals; Ornstein-Uhlenbeck (OU) gives $V_{ij}\propto e^{-\alpha d_{ij}}$, a Matern-1/2 Gaussian process over patristic distance. Used in PyMC example E23 (Primates301).

## Overview
Example list: <https://redam94.github.io/pymc-challenges/examples.html>, **E23** (covariance from shared branch length, BM / Pagel's $\lambda$ / OU-as-GP regression, the OU ridge and a reparameterisation, conditional LOO from the precision matrix, whitening). Connects to Gaussian-process thinking in [[Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference]] and [[Gaussian Process Regression]].

## Main Content

> [!definition] Brownian-motion covariance on a tree (Felsenstein 1985)
> Trait evolves along branches as BM with rate $\sigma^2$. For tips $i,j$, $\text{Cov}(y_i,y_j)=\sigma^2C_{ij}$, $C_{ij}$ = length of the shared path from the root to the most recent common ancestor of $i$ and $j$; $C_{ii}$ = root-to-tip height. Equivalent to independent contrasts.

^def-bm-tree-covariance

> [!definition] Pagel's $\lambda$ (Pagel 1999)
> $V_\lambda=\lambda C+(1-\lambda)\,\text{diag}(C)$ for $\lambda\in[0,1]$: $\lambda=1$ is BM (full phylogenetic signal), $\lambda=0$ is a star phylogeny (independent species). Off-diagonals are multiplied by $\lambda$; the diagonal is unchanged.

^def-pagel-lambda

> [!definition] Ornstein-Uhlenbeck on a tree (Hansen 1997; Martins & Hansen 1997)
> $dy=-\alpha(y-\theta)dt+\sigma\,dW$ with selection strength $\alpha>0$. With a stationary root, $\text{Cov}(y_i,y_j)=\frac{\sigma^2}{2\alpha}e^{-\alpha d_{ij}}$ with $d_{ij}$ the patristic distance (tree distance between tips) -- an exponential (Matern-1/2) covariance. $\alpha\to0$ recovers BM. Phylogenetic half-life $\ln2/\alpha$.

^def-ou-tree-covariance

> [!theorem] PGLS estimator
> For $y=X\beta+\varepsilon$, $\varepsilon\sim N(0,\sigma^2V)$: $\hat\beta=(X^\top V^{-1}X)^{-1}X^\top V^{-1}y$, $\text{Var}(\hat\beta)=\sigma^2(X^\top V^{-1}X)^{-1}$ (GLS). Whitening: with $V=LL^\top$, regress $L^{-1}y$ on $L^{-1}X$ by OLS.

^thm-pgls

The **OU ridge**: $\alpha$ and $\sigma^2$ trade off (large $\alpha$ with large $\sigma^2$ gives nearly the same covariance as small $\alpha$ with small $\sigma^2$ over the tree's depth), producing a ridge in the posterior. Reparameterise by stationary variance $\sigma^2/2\alpha$ and phylogenetic half-life (or correlation length) to decorrelate (as in E23).

> [!theorem] Conditional (leave-one-out) predictive from the precision matrix
> For $y\sim N(\mu,\Sigma)$ with $Q=\Sigma^{-1}$: $y_i\mid y_{-i}\sim N\big(\mu_i-\frac{[Q(y-\mu)]_i}{Q_{ii}},\ \frac1{Q_{ii}}\big)$ (Sundararajan & Keerthi 2001; Vehtari et al. 2016). This gives exact conditional LOO for phylogenetic GP models without refitting, as long as hyperparameters are held fixed (conditional, not marginal, LOO).

^thm-conditional-loo

## Examples

> [!example] Toy tree, Pagel lambda, GLS intercept, and LOO identity
> Tree $((A{:}1,B{:}1){:}1,(C{:}1.5,D{:}1.5){:}0.5)$ with root-to-tip height 2 gives $C=\begin{pmatrix}2&1&0&0\\1&2&0&0\\0&0&2&0.5\\0&0&0.5&2\end{pmatrix}$. With $y=(1.0,1.2,-0.3,0.1)$ and intercept-only $X$: GLS mean under BM $=0.445$; under $\lambda=0$ equals the sample mean $0.5$. Conditional LOO for species C: precision formula gives mean $0.025$, variance $1.875$, identical to direct conditioning (checked).

```python
import numpy as np
C = np.array([[2, 1, 0, 0], [1, 2, 0, 0], [0, 0, 2, .5], [0, 0, .5, 2]], float)
def pagel(C, lam): M = C*lam; np.fill_diagonal(M, np.diag(C)); return M
y = np.array([1.0, 1.2, -0.3, 0.1]); X = np.ones((4, 1))
def gls(V): Vi = np.linalg.inv(V); return np.linalg.solve(X.T@Vi@X, X.T@Vi@y)
print(gls(C), gls(pagel(C, 0.0)))                       # 0.445, 0.5
Q = np.linalg.inv(C); i = 2; idx = [0, 1, 3]
print(y[i] - (Q@y)[i]/Q[i, i], 1/Q[i, i])               # conditional LOO mean and variance (mu = 0)
```

PyMC sketch (untested), phylogenetic regression with Pagel's $\lambda$ or OU:
```python
import pymc as pm, pytensor.tensor as pt
# C: root-to-MRCA shared length matrix; D: patristic distance matrix; scale so max height = 1
with pm.Model():
    beta = pm.Normal("beta", 0, 1, shape=X.shape[1]); sigma = pm.HalfNormal("sigma", 1)
    lam = pm.Beta("lam", 2, 2)
    V = lam * C + (1 - lam) * pt.diag(pt.diag(C))                 # Pagel lambda
    # OU alternative:  s2_stat = pm.HalfNormal("s2_stat", 1); ell = pm.LogNormal("ell", 0, 1); V = s2_stat/sigma**2 * pt.exp(-D/ell)
    pm.MvNormal("y", mu=X @ beta, cov=sigma**2 * V, observed=y)
```
Practical notes: cache the Cholesky of $V$ for large trees ($n=301$ is fine; Ho & Ane 2014 give $O(n)$ algorithms for BM on trees); standardise branch lengths; with missing trait values, condition via the same MvNormal marginalisation.

Marketing analogue: any hierarchy where entities share ancestry (brands in a portfolio, product taxonomy, store trees) can use a tree-induced covariance as a structured prior instead of exchangeable partial pooling ([[Hierarchical Models]]). Analogy only.

## Connections
[[Hierarchical Models]] (exchangeable pooling is the star-tree special case), [[Joint Priors and Covariance Matrices]].

## See Also
[[Spatial Fields - Gaussian Random Fields, Kriging and Field-Level Inference]]
