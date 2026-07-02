---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/Vine-Copula-Aas-Czado-Survey.md]]"
source_location: "Aas et al. (2009) §2-3, Tables 1-2; Bedford & Cooke (2002) §5"
date_ingested: 2026-07-02
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[Copula Architecture Comparison]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine copula
  - D-vine copula
  - h-function copula
  - sequential vine estimation
---

# C-Vine and D-Vine Structures

> [!summary]
> The **C-vine** (canonical vine) and **D-vine** (drawable vine) are the two most commonly used special cases of regular vines (R-vines), distinguished by the topology of each tree. A C-vine has one *hub node* per tree with maximum degree, making it suited to settings with a single dominant variable (e.g. a market index). A D-vine has a *path topology* in each tree, making it suited to ordered data (time series, spatial sequences). Both admit **sequential estimation** via the **h-function** — a key computational primitive that propagates conditional CDFs through the vine tree-by-tree.

## Overview

Among all R-vines on $d$ variables, there are $d!/2 \cdot (d-1)!/2^{d-2}$ distinct vine structures (for large $d$, a combinatorially vast space). Structure selection — choosing *which* vine to fit — is itself a model selection problem. The **C-vine** and **D-vine** are special cases with simple, interpretable topologies that make structure selection trivial and estimation natural.

## Main Content

> [!definition] C-Vine (Canonical Vine)
> A vine $V$ on variables $\{1, \ldots, d\}$ is a **C-vine** if in each tree $T_j$ there exists exactly one node with the *maximum* degree $d - j$, called the **root** $r_j$ of tree $T_j$, and all other nodes have degree 1. Thus each $T_j$ is a *star* centred on root $r_j$.
>
> With root ordering $r_1, r_2, \ldots, r_{d-1}$, the $d(d-1)/2$ pair copulas are:
> $$\{c_{r_1, i} : i \neq r_1\} \;\cup\; \{c_{r_2, i \mid r_1} : i \notin \{r_1, r_2\}\} \;\cup\; \cdots \;\cup\; \{c_{r_{d-1}, r_d \mid r_1, \ldots, r_{d-2}}\}$$
> Tree $T_j$ contributes $d - j$ pair copulas, all sharing root $r_j$ and conditioning set $\{r_1, \ldots, r_{j-1}\}$.
>
> **Interpretation:** Root $r_1$ is the variable most strongly associated with all others; the C-vine models all other variables as conditionally independent given $r_1, r_2, \ldots$ in sequence. Natural when one variable (e.g. a market index, a common shock) mediates most pairwise dependence.
> ^def-cvine

> [!definition] D-Vine (Drawable Vine)
> A vine $V$ on $d$ variables (labelled $1, \ldots, d$ in the chosen ordering) is a **D-vine** if no node has degree greater than 2 in any tree — every tree $T_j$ is a *path*. The path in $T_1$ connects variables in the chosen order: $1 – 2 – 3 – \cdots – d$.
>
> The $d(d-1)/2$ pair copulas are:
> $$c_{i, i+j \mid i+1, \ldots, i+j-1} \quad \text{for } j = 1, \ldots, d-1 \text{ and } i = 1, \ldots, d-j$$
> Tree $T_1$: $c_{1,2}, c_{2,3}, \ldots, c_{d-1,d}$ (adjacent unconditional pairs).
> Tree $T_2$: $c_{1,3|2}, c_{2,4|3}, \ldots, c_{d-2,d|d-1}$ (pairs skipping one).
> Tree $T_j$: pairs at lag $j$ in the path, conditioned on the $j-1$ intermediate variables.
>
> **Interpretation:** The D-vine is natural for **time-ordered data** where lag-$k$ dependence decreases as $k$ increases, and where the conditioning hierarchy $\{i+1, \ldots, i+j-1\}$ has a natural sequential meaning (e.g. intermediate observations).
> ^def-dvine

### Comparison of tree topologies ($d = 4$)

**C-vine** with root ordering $1, 2, 3, 4$:
- $T_1$: star — node 1 connects to 2, 3, 4. Pair copulas: $c_{12}, c_{13}, c_{14}$.
- $T_2$: star — node $(1,2)$ connects to $(1,3)$ and $(1,4)$. Pair copulas: $c_{23|1}, c_{24|1}$.
- $T_3$: single edge $(1,2)–(2,3|1)$. Pair copula: $c_{34|12}$.

**D-vine** with ordering $1, 2, 3, 4$:
- $T_1$: path $1-2-3-4$. Pair copulas: $c_{12}, c_{23}, c_{34}$.
- $T_2$: path $(1,2)–(2,3)–(3,4)$. Pair copulas: $c_{13|2}, c_{24|3}$.
- $T_3$: single edge. Pair copula: $c_{14|23}$.

Both have the same 6 pair copulas, but model different conditional independence structures.

> [!definition] The h-function (Aas et al. 2009, Eq. 6)
> The **h-function** is the key primitive for propagating conditional CDFs through a vine:
> $$h(x \mid v\,;\,\boldsymbol{\theta}) \equiv F(x \mid v) = \frac{\partial C_{xv}\!\left(F(x),\, F(v)\,;\,\boldsymbol{\theta}\right)}{\partial F(v)}$$
> For pseudo-observations $u = F(x) \in [0,1]$ and $w = F(v) \in [0,1]$, the h-function maps:
> $$h(u \mid w\,;\,\boldsymbol{\theta}) = \frac{\partial C_{xv}(u, w\,;\,\boldsymbol{\theta})}{\partial w}$$
> This is the conditional CDF of $X$ given $V = F^{-1}(w)$, expressed in probability-integral-transform (PIT) space. The h-function must be computed for every edge in every tree to propagate pseudo-observations to the next tree.
> ^def-hfunc

> [!example] h-functions for common bivariate copula families (Aas et al. 2009, Table 1)
>
> **Gaussian copula** with correlation $\rho \in (-1,1)$:
> $$h(u \mid w\,;\,\rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(w)}{\sqrt{1-\rho^2}}\right)$$
>
> **Student's $t$ copula** with correlation $\rho$ and degrees of freedom $\nu > 2$:
> $$h(u \mid w\,;\,\rho,\nu) = t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(w)}{\sqrt{\dfrac{(\nu + [t_\nu^{-1}(w)]^2)(1-\rho^2)}{\nu+1}}}\right)$$
>
> **Clayton copula** with $\theta > 0$ (lower tail dependence):
> $$h(u \mid w\,;\,\theta) = w^{-\theta-1}\!\left(u^{-\theta} + w^{-\theta} - 1\right)^{-1-1/\theta}$$
>
> **Gumbel copula** with $\theta \geq 1$ (upper tail dependence):
> $$h(u \mid w\,;\,\theta) = C_\theta(u,w)\cdot\frac{(-\ln w)^{\theta-1}}{w\,[-\ln u)^\theta + (-\ln w)^\theta]^{1-1/\theta}}$$
> where $C_\theta(u,w) = \exp\!\left(-[(-\ln u)^\theta + (-\ln w)^\theta]^{1/\theta}\right)$.
> ^ex-hfunctions

> [!example] Sequential estimation for a D-vine with $d = 4$
> **Setup:** Variables labelled $1, 2, 3, 4$ in the D-vine path. Observe $n$ i.i.d. realisations; form rank-based pseudo-observations $u_k^i = \hat{F}_k(x_k^i)$.
>
> **Step 1 — Tree $T_1$:**
> - Fit $c_{12}$ to $(u_1, u_2)$; extract parameter $\hat{\theta}_{12}$.
> - Fit $c_{23}$ to $(u_2, u_3)$; extract $\hat{\theta}_{23}$.
> - Fit $c_{34}$ to $(u_3, u_4)$; extract $\hat{\theta}_{34}$.
>
> **Step 2 — Compute $T_2$ pseudo-observations using h-functions:**
> $$\hat{u}_{1|2} = h(u_1 \mid u_2\,;\,\hat{\theta}_{12}), \quad \hat{u}_{3|2} = h(u_3 \mid u_2\,;\,\hat{\theta}_{23})$$
> $$\hat{u}_{2|3} = h(u_2 \mid u_3\,;\,\hat{\theta}_{23}), \quad \hat{u}_{4|3} = h(u_4 \mid u_3\,;\,\hat{\theta}_{34})$$
>
> **Step 3 — Tree $T_2$:**
> - Fit $c_{13|2}$ to $(\hat{u}_{1|2}, \hat{u}_{3|2})$; extract $\hat{\theta}_{13|2}$.
> - Fit $c_{24|3}$ to $(\hat{u}_{2|3}, \hat{u}_{4|3})$; extract $\hat{\theta}_{24|3}$.
>
> **Step 4 — Compute $T_3$ pseudo-observations:**
> $$\hat{u}_{1|23} = h(\hat{u}_{1|2} \mid \hat{u}_{3|2}\,;\,\hat{\theta}_{13|2}), \quad \hat{u}_{4|23} = h(\hat{u}_{4|3} \mid \hat{u}_{2|3}\,;\,\hat{\theta}_{24|3})$$
>
> **Step 5 — Tree $T_3$:**
> - Fit $c_{14|23}$ to $(\hat{u}_{1|23}, \hat{u}_{4|23})$; extract $\hat{\theta}_{14|23}$.
>
> **Total log-likelihood:** Sum of 6 bivariate copula log-likelihoods. This sequential procedure propagates estimation errors forward; joint MLE (maximising the full log-likelihood jointly) is more efficient but computationally heavier.
> ^ex-sequential

### Vine structure selection

The C-vine root ordering $r_1, r_2, \ldots$ is typically chosen by sorting variables in decreasing order of average Kendall's $\tau$ with all others: the most central variable becomes $r_1$. The D-vine variable ordering can be chosen by solving (approximately) a maximum-weight Hamiltonian path problem on the complete graph with Kendall's $\tau$ edge weights — the path that maximises the sum of adjacent $\tau$s. For the general R-vine, **Dißmann et al. (2013)**'s algorithm selects the MST of absolute $\tau$s tree-by-tree.

## Connections

- [[Vine Copulas - Overview]] — the PCC framework, Bedford-Cooke regular vine definition, and the simplifying assumption.
- [[Copula Architecture Comparison]] — C/D-vine vs. factor copulas vs. Normal/Student's $t$ vs. Archimedean.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, quantile dependence, and tail-dependence coefficients used for structure selection and estimation.
- [[SMM Estimation of Factor Copulas]] — the rank-based SMM estimator for factor copulas; contrast with vine copula's sequential maximum-likelihood.
- [[Factor Copula Construction]] — the factor latent-variable approach; pair copulas and factor copulas are the two principal strategies for high-dimensional dependence modelling.

## See Also

- [[Factor Copulas - Overview]] — Oh & Patton (2012): factor copulas designed explicitly for $d \geq 50$ where vine copulas become intractable.
- [[Tail Dependence in Factor Copulas]] — EVT-based tail-dependence analysis for factor copulas; vine copulas can also capture tail dependence by choosing Clayton/Gumbel/Student's $t$ pair copulas.
- [[../_Index|Dependence Modeling]]
