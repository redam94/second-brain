---
title: "Bayesian Gaussian Graphical Models - G-Wishart and Neighbourhood Selection"
tags:
  - source/ingested
  - topic/spatial-point-processes
  - type/concept
  - doc/concept-note
source: "Concept note, no raw source (literature cited in body)"
source_location: "Concept note; literature: Dawid & Lauritzen 1993; Roverato 2002; Atay-Kayis & Massam 2005; Wang & Li 2012; Mohammadi & Wit 2015; Meinshausen & Buhlmann 2006; Carvalho et al. 2010; Li et al. 2019"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Point Processes, Spatial Fields and Networks/Structure Learning and Phylogenetics Concept Notes"
doc_type: paper
depends_on:
  - "[[Li 2019 - Graphical Horseshoe Model and Gibbs Sampler]]"
used_by:
  - "[[Li 2019 - Graphical Horseshoe Estimator - Overview]]"
aliases:
  - "G-Wishart prior"
  - "Bayesian Gaussian graphical models"
  - "neighbourhood selection horseshoe"
---

# Bayesian Gaussian Graphical Models - G-Wishart and Neighbourhood Selection

> [!summary]
> Concept note (no raw source). In a Gaussian graphical model the graph $G$ encodes zeros of the precision matrix $\Omega$. Bayesian options: (i) a G-Wishart prior on $\Omega$ constrained to $G$ with a prior over graphs (exact but with an intractable normalising constant for non-decomposable $G$); (ii) continuous shrinkage on $\Omega$ (graphical horseshoe/lasso; no explicit graph); (iii) neighbourhood selection, regressing each node on the others and combining edges with AND/OR rules. Used in PyMC example E19 (Sachs phosphoproteins).

## Overview
Example list: <https://redam94.github.io/pymc-challenges/examples.html>, **E19** (marginal vs partial correlation, `LKJCholeskyCov`, why a horseshoe on the precision matrix leaves the PD cone, Bayesian neighbourhood selection with node-wise horseshoe, AND/OR rules). Companion source: [[Li 2019 - Graphical Horseshoe Estimator - Overview]].

## Main Content

> [!definition] Gaussian graphical model (GGM)
> $y\sim N(0,\Omega^{-1})$ with $G=(V,E)$ where $(i,j)\notin E\iff\omega_{ij}=0\iff y_i\perp y_j\mid y_{V\setminus\{i,j\}}$. Partial correlation $\rho_{ij\cdot\text{rest}}=-\omega_{ij}/\sqrt{\omega_{ii}\omega_{jj}}$, in general different from the marginal correlation $\Sigma_{ij}/\sqrt{\Sigma_{ii}\Sigma_{jj}}$ (two variables can be marginally correlated through a third and conditionally independent).

^def-ggm

> [!definition] G-Wishart prior (Dawid & Lauritzen 1993; Roverato 2002)
> For graph $G$ let $\mathcal P_G$ be the cone of PD matrices with $\omega_{ij}=0$ for non-edges. $\Omega\sim W_G(\delta,D)$ has density $\propto|\Omega|^{(\delta-2)/2}\exp\{-\tfrac12\text{tr}(D\Omega)\}\mathbb 1_{\Omega\in\mathcal P_G}$; the normalising constant $I_G(\delta,D)$ is closed-form for decomposable $G$ and requires Monte Carlo (Atay-Kayis & Massam 2005) or approximations for non-decomposable $G$. Conjugacy: posterior is $W_G(\delta+n,D+S)$. Combined with a graph prior $\pi(G)$ (e.g. i.i.d. Bernoulli edge inclusion), the graph posterior is $\pi(G\mid Y)\propto\pi(G)\,I_G(\delta+n,D+S)/I_G(\delta,D)$; samplers: reversible-jump (Dobra et al. 2011), birth-death MCMC (Mohammadi & Wit 2015), exchange/double-Metropolis for constants (Wang & Li 2012, Lenkoski 2013 direct sampler).

^def-g-wishart

> [!definition] Neighbourhood selection (Meinshausen & Buhlmann 2006)
> Regress $y_i$ on $y_{-i}$ for each $i$: $y_i=\sum_{j\ne i}b_{ij}y_j+\epsilon_i$, with $b_{ij}=-\omega_{ij}/\omega_{ii}$. Estimate each neighbourhood by lasso (or a Bayesian shrinkage prior such as the horseshoe), then **AND** rule: edge iff both $b_{ij}\neq0$ and $b_{ji}\neq0$; **OR** rule: either. The Bayesian variant selects with credible intervals. Neighbourhood regressions are not jointly a valid precision matrix (not symmetric/PD) but give a consistent graph under sparsity.

^def-neighbourhood-selection

Why a horseshoe directly on $\Omega$ is awkward in a generic PPL: independent priors on entries do not enforce $\Omega\succ0$; the graphical horseshoe handles it by column-wise conditionals that preserve PD ([[Li 2019 - Graphical Horseshoe Model and Gibbs Sampler]]). LKJ priors on correlation matrices give a PD matrix by construction but no sparsity, so use them for marginal-correlation models and post-hoc partial correlations.

## Examples

> [!example] Marginal vs partial correlation (3 variables, worked)
> $\Omega=\begin{pmatrix}2&-1&0\\-1&2.5&0.8\\0&0.8&1.5\end{pmatrix}$ gives partial correlations $\rho_{12}=0.447$, $\rho_{13}=0$, $\rho_{23}=-0.413$ but marginal correlations $0.491$, $-0.227$, $-0.462$: variables 1 and 3 are marginally negatively correlated (via variable 2) though conditionally independent.

```python
import numpy as np
Om = np.array([[2, -1, 0], [-1, 2.5, 0.8], [0, 0.8, 1.5]]); d = np.sqrt(np.diag(Om))
pc = -Om/np.outer(d, d); np.fill_diagonal(pc, 1); Sig = np.linalg.inv(Om)
mc = Sig/np.sqrt(np.outer(np.diag(Sig), np.diag(Sig))); print(np.round(pc, 3), np.round(mc, 3))
```

PyMC sketch (untested), node-wise horseshoe with AND rule on posterior inclusion:
```python
import pymc as pm
def neighbourhood(Y, i, tau0=0.05):
    X = np.delete(Y, i, axis=1)
    with pm.Model():
        tau = pm.HalfStudentT("tau", 2, tau0); lam = pm.HalfCauchy("lam", 1, shape=X.shape[1])
        b = pm.Normal("b", 0, tau*lam, shape=X.shape[1]); s = pm.HalfNormal("s", 1)
        pm.Normal("y", X @ b, s, observed=Y[:, i]); return pm.sample(1000, tune=1000, progressbar=False)
# edge (i,j) kept (AND) if the 50%/90% interval of b_ij in node i's fit AND of b_ji in node j's fit exclude 0
```
Uncertainty note: use edge inclusion probabilities across draws rather than a single graph; compare with graphical-lasso stability selection ([[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]]).

## Connections
- [[Joint Priors and Covariance Matrices]] (LKJ and Cholesky parameterisations).
- Directed counterpart (causal graph, not just conditional independence): [[Bayesian Causal Discovery - BGe Score, Interventions and Sachs Data]].
- Marketing measurement: conditional dependence among channels or KPIs after controlling for the rest; sparse precision matrices as priors for correlated channel effects (analogy).

## See Also
[[Li 2019 - Graphical Horseshoe Estimator/_Index|Li 2019 - Graphical Horseshoe Estimator]]
