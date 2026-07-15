---
title: Regular Vine Copulas and R-Vine Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - type/theorem
  - doc/paper
source: "[[raw/Vine-Copulas-Survey-Aas-Czado-Bedford-Cooke.md]]"
source_location: "Bedford & Cooke (2002); Dissmann et al. (2013); Czado & Nagler (2022)"
date_ingested: 2026-07-15
date_updated: 2026-07-15
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[C-Vine and D-Vine Structures]]"
used_by:
  - "[[Copula Architecture Comparison]]"
aliases:
  - R-vine
  - regular vine
  - Dissmann et al 2013
  - Bedford Cooke 2002
  - R-vine structure selection
---

# Regular Vine Copulas and R-Vine Selection

> [!summary]
> A **regular vine** (R-vine) is the most general vine structure: any sequence of nested trees satisfying the **proximity condition**. C-vines and D-vines are special cases. Dissmann et al. (2013) propose a **greedy sequential structure selection** algorithm that constructs the R-vine tree by tree, at each step choosing the maximum-weight spanning tree maximising the sum of absolute Kendall's $\tau$. Pair-copula families are selected by AIC/BIC per edge. The result is a scalable, data-driven vine structure that goes beyond the restrictive C- and D-vine special cases.

## Overview

C-vines and D-vines (see [[C-Vine and D-Vine Structures]]) are simple and interpretable but impose restrictive topologies. A C-vine forces one "hub" variable per tree; a D-vine forces a path ordering. For real data, the optimal dependence structure may be neither. Bedford & Cooke (2002) introduced the **regular vine** (R-vine) as the most general valid vine structure, and Dissmann et al. (2013) provided the first computationally tractable algorithm for selecting an R-vine structure from data.

## Main Content

### R-Vine Definition

> [!definition] Regular vine (Bedford & Cooke 2002)
> A **regular vine** $\mathcal{V}$ on $d$ variables is a sequence of trees $T_1, T_2, \ldots, T_{d-1}$ satisfying:
>
> **(V1)** $T_1$ is a connected tree with nodes $N_1 = \{1, \ldots, d\}$ and edges $E_1$.
>
> **(V2)** For $k = 2, \ldots, d-1$: $T_k$ is a connected tree with nodes $N_k = E_{k-1}$ (the edges of the previous tree) and edges $E_k \subseteq \binom{N_k}{2}$.
>
> **(V3) Proximity condition:** For $k \geq 2$, if $\{e, f\} \in E_k$, then the edges $e$ and $f$ in $T_{k-1}$ share exactly one common node.
>
> The proximity condition (V3) ensures that the conditioning set $\mathbf{D}(e,f)$ for edge $\{e,f\}$ in $T_k$ is well-defined as the symmetric difference of the two edge-as-node labels: $\mathbf{D}(e,f) = e \;\triangle\; f \setminus \{j(e), j(f)\}$.
^def-rvine

> [!definition] R-vine joint density
> Let $C(e) = \{a(e), b(e)\}$ be the "conditioned set" of edge $e$ in $T_k$ (the two variables not in the conditioning set), and $D(e)$ the conditioning set. The joint density is:
>
> $$f(x_1, \ldots, x_d) = \prod_{j=1}^{d} f_j(x_j) \cdot \prod_{k=1}^{d-1} \prod_{e \in E_k} c_{a(e),b(e)|D(e)}\!\left(F(x_{a(e)} \mid \mathbf{x}_{D(e)}),\; F(x_{b(e)} \mid \mathbf{x}_{D(e)})\right)$$
>
> C-vines and D-vines satisfy (V1)–(V3) with specific tree topologies; the R-vine allows any valid topology.
^def-rvine-density

> [!theorem] Count of regular vines (Bedford & Cooke 2002)
> The number of distinct R-vine structures on $d$ variables is:
> $$|\mathcal{V}_d| = \frac{d!}{2} \cdot \left(\frac{d-2}{2}\right)! \cdot 2^{\binom{d-2}{2}}$$
> Wait — the exact count is complex (it involves a product formula over labeled trees). More practically: the number of labeled trees on $d$ nodes is $d^{d-2}$ (Cayley's formula), so the number of $T_1$ structures alone is $d^{d-2}/2$ (undirected); for $d=10$ this is already $10^8/2 = 5\times 10^7$. Exact enumeration is infeasible for $d \geq 5$; greedy search is the standard approach.
^thm-count

---

### Greedy R-Vine Structure Selection (Dissmann et al. 2013)

> [!definition] Sequential structure selection algorithm
> **Input:** Pseudo-observations $\hat{\mathbf{u}} \in [0,1]^{n \times d}$ (probability-integral-transformed data).
>
> **For each tree $T_k$, $k = 1, \ldots, d-1$:**
>
> 1. **Compute dependence weights:** For all candidate edges satisfying the proximity condition (V3), compute the empirical absolute Kendall's $\tau$:
>    $$\hat{\tau}_{jk|\mathbf{D}} = |\hat{\tau}(\hat{u}_{j|\mathbf{D}},\, \hat{u}_{k|\mathbf{D}})|$$
>    where $\hat{u}_{j|\mathbf{D}}$ are the conditional pseudo-observations from the previous tree.
>
> 2. **Maximum spanning tree:** Select the tree $T_k^* = \arg\max_{T} \sum_{e \in T} \hat{\tau}_{a(e),b(e)|D(e)}$ via Prim's or Kruskal's algorithm ($O(d^2)$ per tree).
>
> 3. **Pair-copula family selection:** For each edge $e \in T_k^*$, select the family from a candidate set $\mathcal{F}$ (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, BB1, BB7, rotated versions) by **minimum AIC** (or BIC):
>    $$\hat{F}_e = \arg\min_{F \in \mathcal{F}} \text{AIC}(F;\, \hat{u}_{a(e)|\mathbf{D}}, \hat{u}_{b(e)|\mathbf{D}})$$
>
> 4. **Pair-copula parameter estimation:** Estimate $\hat{\boldsymbol{\theta}}_e$ by MLE for the selected family.
>
> 5. **Conditional pseudo-observations:** Compute $\hat{u}_{j|D \cup \{k\}} = h(\hat{u}_{j|D} \mid \hat{u}_{k|D},\; \hat{\boldsymbol{\theta}}_e)$ for all edges in $T_k^*$ for use in tree $T_{k+1}$.
>
> **Output:** The fitted R-vine $(\hat{\mathcal{V}}, \hat{\mathcal{F}}, \hat{\boldsymbol{\Theta}})$ — the structure, the family per pair-copula, and the estimated parameters.
^def-selection

> [!theorem] Properties of the greedy selector
> (Dissmann et al. 2013, Theorem 1)
> The maximum-spanning-tree selector is **consistent** in the following sense: if the true vine copula has independent pair-copulas for non-adjacent variables in some tree $T_k$, the estimated structure will recover this independence structure as $n \to \infty$. The key condition is that Kendall's $\tau = 0$ if and only if independence (satisfied for all elliptical and Archimedean copulas).
>
> **Finite-sample performance:** In simulation studies with $d=5, 10, 20$ and various vine structures, the greedy selector recovers the correct tree structure with probability $> 0.9$ for $n \geq 500$.
^thm-consistency

---

### Vine Truncation

> [!definition] Truncated R-vine
> A vine is **truncated at tree $M$** if all pair-copulas in trees $T_{M+1}, \ldots, T_{d-1}$ are replaced by the **independence copula** ($c = 1$). The truncated vine has only $\sum_{k=1}^{M}(d-k)$ non-trivial pair-copulas, reducing the total parameters dramatically.
>
> **Truncation criterion (Brechmann et al. 2010):** Add tree $T_{k+1}$ only if it decreases the total AIC of the vine:
> $$\text{AIC}(T_1 \cup \cdots \cup T_{k+1}) < \text{AIC}(T_1 \cup \cdots \cup T_k) + \text{AIC}(\text{all-independence}) $$
> In practice: if the best pair-copula at tree $T_{k+1}$ for every edge is the independence copula (or close to it), truncate.
>
> **Parameter reduction:** A truncated vine at $M = 1$ (only adjacent pairs, no higher-order conditioning) has $d-1$ pair-copulas. A truncated vine at $M = 2$ has $2d-3$. For $d=20$ and $M=3$: $17+16+15 = 48$ pair-copulas vs. $20 \times 19 / 2 = 190$ for the full vine.
^def-truncation

---

### Goodness-of-Fit and Inference

> [!definition] Full vine log-likelihood
> Given estimated parameters $\hat{\boldsymbol{\Theta}}$ and structure $\hat{\mathcal{V}}$, the log-likelihood is:
>
> $$\log L(\hat{\boldsymbol{\Theta}}; \mathbf{u}) = \sum_{i=1}^n \sum_{k=1}^{d-1} \sum_{e \in E_k} \log c_{a(e),b(e)|D(e)}\!\left(\hat{u}^{(i)}_{a(e)|D(e)},\; \hat{u}^{(i)}_{b(e)|D(e)};\; \hat{\boldsymbol{\theta}}_e\right)$$
>
> This is computed in $O(n \cdot d^2)$ after all conditional pseudo-observations are available.
^def-loglik

> [!definition] Independence test for truncation
> For each edge $e$ at tree $T_k$, test $H_0: c_e = \text{independence}$ using the Vuong test or a likelihood ratio test against the chosen parametric family. If $H_0$ is not rejected at the $\alpha$ level for all edges in $T_k$, truncate at $M = k-1$.
^def-independence-test

---

### Software and Implementation

> [!example] rvinecopulib (R) workflow
> ```r
> library(rvinecopulib)
>
> # u: n x d matrix of pseudo-observations in [0,1]
>
> # Automatic R-vine structure selection (Dissmann et al. 2013)
> fit <- vinecop(u, family_set = "parametric", trunc_lvl = Inf)
> # trunc_lvl = Inf: no truncation; trunc_lvl = 2: truncate at tree 2
>
> # Summary: shows tree structures and pair-copula families
> summary(fit)
>
> # Plot the vine tree sequence (T1, T2, ..., Td-1)
> plot(fit, tree = 1)  # tree T1
> plot(fit, tree = 2)  # tree T2
>
> # Log-likelihood
> logLik(fit)
>
> # Simulation from the fitted vine
> sim <- rvinecop(n = 1000, fit)
>
> # Conditional simulation (D-vine only, for forecasting)
> library(CDVineCopulaConditional)
> ```

> [!example] pyvinecopulib (Python) workflow
> ```python
> import pyvinecopulib as pv
> import numpy as np
>
> # u: (n, d) array, each column in [0, 1]
> # Fit with automatic structure selection
> cop = pv.Vinecop(u, controls=pv.FitControlsVinecop(trunc_lvl=None))
>
> # Access structure
> print(cop.structure)       # RVineStructure object
> print(cop.pair_copulas)    # list of BiCop objects per tree
>
> # Log-likelihood
> cop.loglik(u)
>
> # Simulate
> sim = cop.simulate(n=1000)
> ```

## Connections

- [[Vine Copulas - Overview]] — the PCC idea and density factorization that R-vines implement.
- [[C-Vine and D-Vine Structures]] — the special cases of R-vines with star and path topology.
- [[Copula Architecture Comparison]] — R-vine vs. factor copulas: scalability, parameter count, tail dependence.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used as the edge weight for structure selection.
- [[SMM Estimation of Factor Copulas]] — the alternative estimation approach when no closed-form likelihood is available (factor copulas use SMM; vine copulas use sequential MLE).

## See Also

- Dissmann, Brechmann, Czado & Kurowicka (2013), "Selecting and estimating regular vine copulae and application to financial returns," *Computational Statistics and Data Analysis* 59: 52–69
- [[../_Index|Econometrics]]
