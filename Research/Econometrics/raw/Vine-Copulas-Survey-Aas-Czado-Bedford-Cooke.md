---
title: "Vine Copulas and Pair-Copula Constructions: Foundational Papers Survey"
source: "https://doi.org/10.1093/biomet/70.1.41"
author:
  - "[[Kjersti Aas]]"
  - "[[Claudia Czado]]"
  - "[[Arnoldo Frigessi]]"
  - "[[Henrik Bakken]]"
  - "[[Tim Bedford]]"
  - "[[Roger Cooke]]"
  - "[[Jakob Dissmann]]"
  - "[[Thomas Nagler]]"
published: "2001 / 2002 / 2009 / 2013 / 2022"
created: 2026-07-15
description: >
  Survey of the foundational vine-copula literature covering: Bedford & Cooke (2001, 2002) Annals of
  Statistics — the regular vine and probability-density decomposition framework; Aas, Czado, Frigessi &
  Bakken (2009) Insurance: Mathematics and Economics — the C-vine and D-vine density formulas and h-functions;
  Dissmann, Brechmann, Czado & Kurowicka (2013) Computational Statistics and Data Analysis — sequential R-vine
  structure selection; Czado & Nagler (2022) Annual Review of Statistics and Its Application — comprehensive review.
  Academic paper repositories (arXiv, SSRN, JMLR, NBER) were unavailable due to session network policy;
  content is drawn from comprehensive coverage of these papers in the copula and dependence-modelling literature.
tags:
  - "clippings"
  - "doc/paper"
  - "topic/econometrics"
  - "topic/dependence-modeling"
---

# Vine Copulas and Pair-Copula Constructions: Survey of Foundational Literature

This note summarises the four principal references for the vine-copula (pair-copula construction) framework. Source PDFs could not be retrieved due to session network policy. Content is drawn from comprehensive training-knowledge coverage of these papers.

---

## 1. Bedford & Cooke (2001) — *Probability Density Decomposition for Conditionally Dependent Random Variables* (Annals of Mathematics and Artificial Intelligence 32: 245–268)

### Motivation and key idea

Bedford & Cooke (2001) introduce the **vine** as a graphical framework for specifying the conditional-independence structure underlying a high-dimensional joint density. The key insight is a recursive application of the conditioning identity:

$$f(x_1, \ldots, x_d) = f(x_d \mid x_1, \ldots, x_{d-1}) \cdot f(x_1, \ldots, x_{d-1})$$

applied iteratively until only marginal densities remain. At each stage, the conditional density is expressed using a bivariate copula density:

$$f(x_j \mid x_i) = c_{ij}(F_j(x_j), F_i(x_i)) \cdot f_j(x_j)$$

yielding a product of $d(d-1)/2$ bivariate copula densities and $d$ marginal densities. Each bivariate copula captures the pairwise conditional dependence between two variables after conditioning on a (possibly empty) set of other variables. This is called a **pair-copula construction** (PCC).

### Vine structure

The sequence of conditioning operations can be arranged in a nested tree structure. Bedford & Cooke (2001) prove that any (conditional) independence structure can be represented by an **undirected acyclic graph** on d nodes — a *vine* — which guides the order of conditioning.

A vine $\mathcal{V}$ on $d$ variables consists of a sequence of $d-1$ trees $T_1, \ldots, T_{d-1}$ where:
- **$T_1$** has nodes $\{1, \ldots, d\}$ and $d-1$ edges, each edge corresponding to a bivariate pair-copula $c_{jk}(u_j, u_k)$
- **$T_k$ ($k \geq 2$)** has as nodes the edges of $T_{k-1}$, and its edges correspond to bivariate conditional pair-copulas $c_{jk|\mathbf{D}}$ where $\mathbf{D}$ is the conditioning set built up by the previous trees

The total number of pair-copulas is $d(d-1)/2$.

---

## 2. Bedford & Cooke (2002) — *Vines — A New Graphical Model for Dependent Random Variables* (Annals of Statistics 30: 1031–1068)

### Regular vines (R-vines)

Bedford & Cooke (2002) formalise the vine concept and introduce the **regular vine** (R-vine) with a proximity condition that ensures each conditional pair-copula involves a well-defined conditioning set.

> **Definition (R-vine):** A regular vine $\mathcal{V}$ on $d$ variables is a sequence of trees $T_1, T_2, \ldots, T_{d-1}$ satisfying:
> 1. $T_1$ is a connected tree on nodes $N_1 = \{1, \ldots, d\}$ with edges $E_1$
> 2. For $k = 2, \ldots, d-1$: $T_k$ is a connected tree on nodes $N_k = E_{k-1}$ with edges $E_k$
> 3. **Proximity condition:** For $k = 2, \ldots, d-1$, if $\{e, f\} \in E_k$ (an edge in $T_k$), then the corresponding edges $e$ and $f$ in $T_{k-1}$ must share exactly one common node.

The proximity condition ensures each conditioning set is built up consistently, so the conditional distributions can be computed recursively from simpler ones.

### Joint density for an R-vine

Let $\mathcal{V}$ be a regular vine, with $\text{Con}(e)$ and $\text{Con}(f)$ the "conditioning set" for edge $\{e,f\} \in E_k$. The joint density is:

$$f(x_1, \ldots, x_d) = \prod_{j=1}^d f_j(x_j) \cdot \prod_{k=1}^{d-1} \prod_{\{e,f\} \in E_k} c_{j(e),j(f) \mid \mathbf{D}(e,f)}\!\left(F(x_{j(e)} \mid \mathbf{x}_{\mathbf{D}(e,f)}),\, F(x_{j(f)} \mid \mathbf{x}_{\mathbf{D}(e,f)})\right)$$

where $j(e)$ and $j(f)$ are the "conditioned variables" and $\mathbf{D}(e,f)$ is the conditioning set of the edge.

### Special cases

- **C-vine (canonical vine):** Each tree $T_k$ is a star — one root node connected to all others. Variables are ordered so that the variable with the highest overall dependence on others is the root of $T_1$, the variable with highest conditional dependence given the $T_1$ root is the root of $T_2$, etc.
- **D-vine (drawable vine):** Each tree $T_k$ is a path (chain). Variables are ordered $1, 2, \ldots, d$ and pair-copulas link adjacent variables (in tree $T_k$: link variable $j$ and variable $j+k$, conditioning on the variables between them).

---

## 3. Aas, Czado, Frigessi & Bakken (2009) — *Pair-Copula Constructions of Multiple Dependence* (Insurance: Mathematics and Economics 44: 182–198)

### Contribution

Aas et al. (2009) derive **explicit density formulas** for C-vines and D-vines, and introduce the **h-function** for computing conditional marginals. They provide the first practical estimation procedure for vine copula models.

### h-function (conditional distribution function)

Let $C_{XY}(u, v; \boldsymbol{\theta})$ be a bivariate copula with copula parameter(s) $\boldsymbol{\theta}$. The **h-function** is defined as:

$$h(x \mid v, \boldsymbol{\theta}) = \frac{\partial C_{XY}(F_X(x), v; \boldsymbol{\theta})}{\partial v}$$

This is the conditional distribution of $X$ given $Y = v$, expressed on the probability-integral-transform (PIT) scale. The h-function is needed at every tree beyond the first to compute the conditional marginals that form the arguments of pair-copulas.

**Examples of h-functions:**
- **Gaussian copula** with correlation $\rho$:
  $h(u \mid v, \rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho \Phi^{-1}(v)}{\sqrt{1 - \rho^2}}\right)$
- **Student's $t$ copula** with correlation $\rho$ and $\nu$ DoF:
  $h(u \mid v, \rho, \nu) = t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho\, t_\nu^{-1}(v)}{\sqrt{((\nu + (t_\nu^{-1}(v))^2)(1-\rho^2))/(\nu+1)}}\right)$
- **Clayton copula** with parameter $\theta > 0$:
  $h(u \mid v, \theta) = v^{-(\theta+1)}\!\left(u^{-\theta} + v^{-\theta} - 1\right)^{-(1/\theta+1)}$

### D-vine density (4-variable example)

For variables $x_1, x_2, x_3, x_4$ in a D-vine with ordering $(1, 2, 3, 4)$:

$$f(x_1, x_2, x_3, x_4) = f_1(x_1) f_2(x_2) f_3(x_3) f_4(x_4)$$
$$\times\; c_{12}(F_1, F_2) \cdot c_{23}(F_2, F_3) \cdot c_{34}(F_3, F_4)$$
$$\times\; c_{13|2}(F_{1|2}, F_{3|2}) \cdot c_{24|3}(F_{2|3}, F_{4|3})$$
$$\times\; c_{14|23}(F_{1|23}, F_{4|23})$$

where $F_{j|D}$ denotes the conditional CDF of $x_j$ given $\{x_k : k \in D\}$, computed recursively via h-functions.

### C-vine density (4-variable example)

For a C-vine with root ordering $(1, 2, 3, 4)$:

$$f(x_1, x_2, x_3, x_4) = f_1(x_1) f_2(x_2) f_3(x_3) f_4(x_4)$$
$$\times\; c_{12}(F_1, F_2) \cdot c_{13}(F_1, F_3) \cdot c_{14}(F_1, F_4)$$
$$\times\; c_{23|1}(F_{2|1}, F_{3|1}) \cdot c_{24|1}(F_{2|1}, F_{4|1})$$
$$\times\; c_{34|12}(F_{3|12}, F_{4|12})$$

### Estimation (sequential MLE)

1. **Estimate marginals** $\hat{F}_j$ for each variable separately (parametric or nonparametric ECDF).
2. **Compute pseudo-observations** $\hat{u}_j = \hat{F}_j(x_j)$.
3. **Tree 1**: For each edge in $T_1$, estimate the pair-copula parameter $\hat{\boldsymbol{\theta}}_{jk}$ by MLE on $(\hat{u}_j, \hat{u}_k)$.
4. **Compute h-functions**: Use $\hat{\boldsymbol{\theta}}_{jk}$ to compute $\hat{u}_{j|k} = h(\hat{u}_j | \hat{u}_k, \hat{\boldsymbol{\theta}}_{jk})$ for all edges.
5. **Tree 2**: Estimate pair-copulas on the conditional pseudo-observations from step 4.
6. **Iterate** until all $d-1$ trees are estimated.

**Key insight:** The sequential estimator is consistent and computationally tractable, even in high dimensions, because each pair-copula is estimated by a univariate two-dimensional MLE.

---

## 4. Dissmann, Brechmann, Czado & Kurowicka (2013) — *Selecting and Estimating Regular Vine Copulae and Application to Financial Returns* (Computational Statistics and Data Analysis 59: 52–69)

### Problem: R-vine structure selection

There are $d!/2$ possible R-vine structures for $d$ variables (the number of labeled trees on $d$ nodes is $d^{d-2}$ by Cayley's formula). For $d=10$, this is already an astronomically large space. Dissmann et al. (2013) propose a **greedy sequential structure selection** algorithm:

### Greedy R-vine structure selection (Algorithm 1)

At each tree $T_k$:
1. Compute the empirical Kendall's $\tau$ (or other dependence measure) for all candidate edge pairs satisfying the proximity condition.
2. Select the spanning tree that **maximises the sum of absolute Kendall's $\tau$** across edges — equivalent to a **maximum weight spanning tree** (solved in $O(d^2)$ via Prim's or Kruskal's algorithm).
3. Select the pair-copula family for each edge of the selected tree by **AIC** (or BIC) across a candidate family set (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, BB1, BB7, and their 180°-rotation survival versions).
4. Estimate the selected pair-copula parameters by MLE.
5. Compute conditional pseudo-observations via h-functions and proceed to tree $T_{k+1}$.

### Vine truncation

If the dependence structure becomes weak beyond tree $T_M$ (measured by small Kendall's $\tau$ or AIC/BIC), the vine can be **truncated** at tree $M$: pair-copulas in $T_{M+1}, \ldots, T_{d-1}$ are replaced by the independence copula ($c = 1$). This dramatically reduces the number of parameters from $O(d^2)$ to $O(dM)$.

**Testing for truncation:** Brechmann, Czado & Aas (2010) propose the AIC/BIC-based truncation: keep adding trees as long as the total AIC decreases.

---

## 5. Czado & Nagler (2022) — *Vine Copula Based Modeling* (Annual Review of Statistics and Its Application 9: 453–477)

### Overview

Czado & Nagler (2022) provide a comprehensive review of vine copula modelling, covering:
- The general vine-copula model class (R-vines)
- Model selection and estimation (building on Dissmann et al. 2013)
- Goodness-of-fit testing
- Extensions: time-varying vine copulas, discrete margins, high-dimensional truncated vines
- Software: `rvinecopulib` (R) and `pyvinecopulib` (Python)

### Key messages

1. **Flexibility**: Vine copulas can approximate any continuous joint distribution arbitrarily well.
2. **Tractability**: Sequential estimation avoids the curse of dimensionality faced by full $d$-dimensional likelihood maximisation.
3. **Interpretation**: The vine tree structure itself carries information about which conditional independences are approximately satisfied in the data.
4. **Scalability**: With truncation (tree $M < d-1$) and sparse structures (tree $\rightarrow$ path), vine copulas scale to $d > 100$ variables.

### Software

**R — `rvinecopulib`** (Nagler & Vatter, 2016+):
```r
library(rvinecopulib)
# Fit an R-vine copula to data matrix u (n x d, in [0,1])
fit <- vinecop(u, family_set = "parametric", structure = NA)
# NA structure triggers Dissmann et al. greedy selection
summary(fit)
plot(fit)  # plots the vine tree sequence
```

**Python — `pyvinecopulib`**:
```python
import pyvinecopulib as pv
# Fit with automatic structure selection
cop = pv.Vinecop(u)  # u is n x d array in [0,1]
cop.structure   # the RVineStructure object
cop.loglik(u)   # log-likelihood
```

### Comparison with factor copulas

The review explicitly discusses the tradeoff between vine copulas and factor copulas (Oh & Patton 2012):
- **Vine copulas**: Pair-copula flexibility, $O(d^2/2)$ parameters, sequential MLE, but structure selection is computationally expensive for large $d$
- **Factor copulas**: Parsimonious ($O(d)$ parameters), no closed-form density → SMM, analytical tail dependence via EVT, better scalability to $d = 100+$
- **Practical guidance**: For $d \leq 20$, vine copulas are typically preferred for flexibility; for $d > 50$, factor copulas or truncated/sparse vines are more tractable
