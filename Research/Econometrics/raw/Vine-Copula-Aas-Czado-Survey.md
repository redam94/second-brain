---
title: "Vine Copulas and Pair Copula Constructions: Survey"
source: "https://doi.org/10.1016/j.insmatheco.2007.02.001"
author:
  - "[[Kjersti Aas]]"
  - "[[Claudia Czado]]"
  - "[[Arnoldo Frigessi]]"
  - "[[Henrik Bakken]]"
  - "[[Tim Bedford]]"
  - "[[Roger Cooke]]"
published: "2009 / 2001 / 2002"
created: 2026-07-02
description: >
  Survey of vine copulas (pair copula constructions) covering: Aas, Czado, Frigessi & Bakken (2009) Insurance: Mathematics and Economics — C-vines, D-vines, sequential estimation via h-functions; Bedford & Cooke (2001, 2002) Annals of Mathematics and Artificial Intelligence / Annals of Statistics — regular vine graphical framework; Joe (1996) — original pair copula idea. Source PDFs unavailable programmatically (paywalled, network policy); content drawn from comprehensive training-knowledge coverage of this literature. Complementary to Oh & Patton (2012) factor copulas already in vault.
tags:
  - "clippings"
  - "doc/paper"
  - "topic/econometrics"
  - "topic/dependence-modeling"
---

# Vine Copulas and Pair Copula Constructions: Survey

This note summarises the principal references for the vine copula / pair copula construction (PCC) literature. Source PDFs are paywalled or otherwise unavailable programmatically; content is drawn from comprehensive knowledge of these papers and the subsequent literature.

---

## 1. Joe (1996) — The Original Pair Copula Idea

**Reference:** Joe, H. (1996). "Families of m-variate distributions with given margins and m(m-1)/2 bivariate dependence parameters." In L. Rüschendorf & B. Schweizer (eds.), *Distributions with Fixed Marginals and Related Topics*, IMS Lecture Notes–Monograph Series 28, pp. 120–141.

Joe (1996) observed that an $m$-variate distribution can be parameterised by its $m$ marginals plus $m(m-1)/2$ **bivariate dependence parameters** — the minimum sufficient set in the case where higher-order dependence is absorbed into pairwise copulas. The paper showed that any joint density can be decomposed as a product of conditional bivariate densities applied to conditional marginals, and that this decomposition is not unique: many different products yield the same joint density. This non-uniqueness is resolved by specifying a graphical structure (a vine) that fixes *which* pairs are conditioned on *which* sets.

---

## 2. Bedford & Cooke (2001, 2002) — The Regular Vine Framework

**References:**
- Bedford, T. & Cooke, R.M. (2001). "Probability density decomposition for conditionally dependent random variables modeled by vines." *Annals of Mathematics and Artificial Intelligence* 32, 245–268.
- Bedford, T. & Cooke, R.M. (2002). "Vines — A new graphical model for dependent random variables." *Annals of Statistics* 30(4), 1031–1068.

### 2.1 The Vine Structure

A **vine** $V$ on $d$ variables is a sequence of $d-1$ trees $T_1, T_2, \ldots, T_{d-1}$ satisfying:

1. **$T_1$** has $d$ nodes (one per variable) and $d-1$ edges.
2. **$T_j$** ($j \geq 2$) has as its node set the edge set $E_{j-1}$ of $T_{j-1}$, and $|E_j| = d-j$ edges.
3. **Proximity condition:** Two nodes of $T_{j+1}$ are connected by an edge only if the corresponding edges in $T_j$ share a common node.

The vine assigns to each edge $e = (a,b;D) \in E_j$ a **pair copula** $C_{ab|D}$ for the pair $(a,b)$ conditioned on the set $D$ of variables shared between the two constituent edges of $T_j$. The conditioning set $D$ has exactly $j-1$ elements in tree $T_j$.

A **regular vine (R-vine)** is a vine satisfying the additional **proximity condition** imposed across trees, ensuring that the conditioning set of each pair grows by exactly one element per tree level. Every C-vine and D-vine is an R-vine; the converse does not hold.

### 2.2 The Pair Copula Density Decomposition

For a $d$-dimensional continuous random vector $\mathbf{X}$ with joint density $f$, marginal densities $f_k$, and marginal CDFs $F_k$:

$$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k) \cdot \prod_{j=1}^{d-1} \prod_{e=(a,b;D) \in E_j} c_{ab|D}\!\left(F(x_a \mid \mathbf{x}_D),\, F(x_b \mid \mathbf{x}_D)\,;\, \boldsymbol{\theta}_{ab|D}\right)$$

where $c_{ab|D}$ is the **pair copula density** for the bivariate copula $C_{ab|D}$, and $F(x_a \mid \mathbf{x}_D)$ is the conditional CDF of $x_a$ given $\mathbf{x}_D$. Bedford & Cooke (2002) proved that every joint density has such a decomposition for any R-vine, but that the decomposition is generally **not unique** across vine structures — different vines imply different conditional pair copulas, even for the same joint distribution.

### 2.3 The Simplifying Assumption

The conditional pair copulas $C_{ab|D}$ are in general **functions of $\mathbf{x}_D$**, not just constants parameterised by $\boldsymbol{\theta}_{ab|D}$. The **simplifying assumption** (widely used in practice, beginning with Joe 1996 and formalised by Haff et al. 2010) drops this dependence:

$$C_{ab|D}(\cdot, \cdot \mid \mathbf{x}_D) = C_{ab|D}(\cdot, \cdot) \quad \text{for all } \mathbf{x}_D$$

Under the simplifying assumption, each pair copula is just a bivariate copula with fixed parameters $\boldsymbol{\theta}_{ab|D}$, independent of the conditioning values. This makes the model computationally tractable and enables tree-by-tree sequential estimation. The assumption may be violated in practice, particularly when the relationship between $a$ and $b$ truly changes across levels of $D$.

---

## 3. Aas, Czado, Frigessi & Bakken (2009) — C-Vines, D-Vines, and Sequential Estimation

**Reference:** Aas, K., Czado, C., Frigessi, A. & Bakken, H. (2009). "Pair-copula constructions of multiple dependence." *Insurance: Mathematics and Economics* 44, 182–198.

### 3.1 The Two Canonical Vine Families

Aas et al. (2009) focus on two special cases of regular vines that are computationally tractable and widely used:

**C-Vine (Canonical Vine):** In every tree $T_j$, one node — the *root* node $r_j$ — has the maximum degree $d-j$, connected to all other $d-j$ nodes. Tree $T_1$ is a **star** centred on root $r_1$. Tree $T_2$ is a star centred on the pair $(r_1, r_2)$ conditioned on $r_1$, and so on.

The $d(d-1)/2$ pair copulas in a C-vine are:
$$\{c_{r_1, i} : i \neq r_1\} \;\cup\; \{c_{r_2, i|r_1} : i \neq r_1, r_2\} \;\cup\; \cdots \;\cup\; \{c_{r_{d-1}, r_d | r_1, \ldots, r_{d-2}}\}$$

The C-vine is natural when there is a single "hub" variable $r_1$ that mediates most of the dependence (e.g., a market index).

**D-Vine (Drawable Vine):** In every tree, no node has degree greater than 2 — all trees are **paths** (chains). With variables labelled $1, \ldots, d$:

- $T_1$: path $1 – 2 – 3 – \cdots – d$, giving pair copulas $\{c_{12}, c_{23}, \ldots, c_{d-1,d}\}$.
- $T_2$: path $1|2 – 2|3 – \cdots$, giving $\{c_{1,3|2}, c_{2,4|3}, \ldots, c_{d-2,d|d-1}\}$.
- $T_j$: pair copulas $\{c_{i, i+j | i+1, \ldots, i+j-1} : i = 1, \ldots, d-j\}$.

The D-vine is natural for **time-series data** where observations at consecutive lags have the most direct dependence (e.g., AR-type processes, financial returns at successive time points).

### 3.2 The h-Function

The key computational primitive for sequential estimation is the **h-function** (Aas et al. 2009, Eq. (6)):

$$h(x \mid v; \boldsymbol{\theta}) \equiv F(x \mid v) = \frac{\partial C_{xv}(F(x), F(v); \boldsymbol{\theta})}{\partial F(v)}$$

This maps $F(v) \in [0,1]$ to $F(x|v) \in [0,1]$ using the partial derivative of the bivariate copula with respect to its second argument. Aas et al. (2009, Table 1) give closed-form h-functions for common copula families:

| Copula | $h(x|v;\boldsymbol{\theta})$ |
|--------|------------------------------|
| Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(x) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
| Student's $t$($\rho$, $\nu$) | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(x) - \rho\,t_\nu^{-1}(v)}{\sqrt{\dfrac{(\nu + t_\nu^{-1}(v)^2)(1-\rho^2)}{\nu+1}}}\right)$ |
| Clayton($\theta$) | $(1 + \theta v^{-\theta}(x^{-\theta} - 1))^{-1-1/\theta}$ |
| Gumbel($\theta$) | closed form involving log–power terms |
| Frank($\theta$) | closed form involving exponential terms |

### 3.3 Sequential Estimation Algorithm (D-Vine, $d = 3$ Example)

For a D-vine with $d=3$ and ordering $1-2-3$:

**Tree $T_1$** (unconditional bivariate copulas):
1. Fit $c_{12}$ to the pseudo-observations $(u_1^i, u_2^i)_{i=1}^n$ where $u_k^i = \hat{F}_k(x_k^i)$ (rank-based).
2. Fit $c_{23}$ to the pseudo-observations $(u_2^i, u_3^i)_{i=1}^n$.

**Tree $T_2$** (conditional bivariate copula):
3. Compute the pseudo-observations required for $c_{1,3|2}$:
   - $\hat{u}_{1|2}^i = h(u_1^i \mid u_2^i; \hat{\boldsymbol{\theta}}_{12})$
   - $\hat{u}_{3|2}^i = h(u_3^i \mid u_2^i; \hat{\boldsymbol{\theta}}_{23})$
4. Fit $c_{1,3|2}$ to the pseudo-observations $(\hat{u}_{1|2}^i, \hat{u}_{3|2}^i)_{i=1}^n$.

The log-likelihood of the full model is the sum of the three bivariate copula log-likelihoods. Sequential (tree-by-tree) maximisation is consistent and often close to the full MLE; joint MLE is also available but computationally more intensive.

For general $d$, the recursion generalises: $F(x_a \mid \mathbf{x}_D) = h(F(x_a \mid \mathbf{x}_{D \setminus \{v\}}) \mid F(x_v \mid \mathbf{x}_{D \setminus \{v\}}); \boldsymbol{\theta}_{a,v|D\setminus\{v\}})$ for any $v \in D$, using the pair copula at the appropriate tree level.

### 3.4 Model Selection

Since the vine structure determines *which* pairs are modelled unconditionally vs conditionally, **structure selection** is an important model-choice problem. Common strategies:

1. **Kendall's $\tau$ ordering** (Aas et al. 2009): Arrange variables so that the pair with the highest absolute $\tau$ is in $T_1$; continue greedily. For D-vines: order variables to maximise the sum of adjacent Kendall's $\tau$s in the path.
2. **Dißmann's algorithm** (Dißmann et al. 2013): Selects the tree-by-tree maximum spanning tree (MST) on the absolute Kendall's $\tau$ values as a heuristic for R-vine structure selection. Widely used in the `VineCopula` R package.
3. **Information criteria (AIC/BIC)**: Used to select both the bivariate copula family at each edge and the vine structure.

---

## 4. Czado (2019) — Vine Copulas in Practice

**Reference:** Czado, C. (2019). *Analyzing Dependent Data with Vine Copulas: A Practical Guide with R*. Springer Lecture Notes in Statistics.

Czado (2019) provides a pedagogical treatment of vine copulas for practitioners. Key additions beyond Aas et al. (2009):

- **Bayesian vine copula estimation** via Markov chain Monte Carlo over the space of vine structures and pair copula parameters. The reversible-jump MCMC sampler of Gruber & Czado (2015) is the standard approach.
- **Truncated vines**: Simplify the model by setting all pair copulas in trees $T_j$ for $j > m$ to the independence copula. Choosing $m$ via cross-validation balances flexibility and parsimony; this is the vine analogue of sparsity regularisation.
- **Time-varying vine copulas** (Patton 2006 extended): Allow pair copula parameters to evolve over time via GAS (generalised autoregressive score) dynamics.
- **Software**: The `VineCopula` package (Nagler et al.) and `rvinecopulib` (Nagler & Czado) in R; `pyvinecopulib` in Python. These implement structure selection (Dißmann MST), sequential MLE, full MLE, and Bayesian estimation.

---

## Key Notation Summary

| Symbol | Meaning |
|--------|---------|
| $d$ | Number of variables |
| $T_j = (N_j, E_j)$ | $j$-th tree in the vine; $j = 1, \ldots, d-1$ |
| $e = (a, b; D)$ | Edge in $T_j$: pair $(a,b)$ conditioned on set $D$ with $|D|=j-1$ |
| $C_{ab\|D}$ | Pair copula for $(a,b)$ given $D$ (bivariate) |
| $c_{ab\|D}$ | Corresponding pair copula density |
| $h(x\|v;\boldsymbol{\theta})$ | h-function: $= \partial C_{xv}(F(x), F(v))/\partial F(v)$ |
| $F(x_a \mid \mathbf{x}_D)$ | Conditional CDF of $x_a$ given $\mathbf{x}_D$ |
| $u_k^i = \hat{F}_k(x_k^i)$ | Empirical rank-based pseudo-observation for variable $k$, observation $i$ |

---

## Connection to Oh & Patton (2012) Factor Copulas

The Oh & Patton (2012) paper (already in vault as `raw/Oh-Patton-2012-Factor-Copulas.pdf`) explicitly contrasts factor copulas with vine copulas:

> "...vine copulas (Aas et al. 2009; hard-to-interpret/test assumptions)" — Oh & Patton (2012), §2

The contrast is:
- **Vine copulas**: maximum pair-specific flexibility, $O(d^2)$ parameters, sequential estimation feasible for $d \leq 20-30$, but assumption-laden conditioning hierarchy.
- **Factor copulas**: parsimonious common-factor structure, $O(1)$–$O(d)$ parameters (equidependence → flexible loadings), simulation-based estimation scales to $d = 100$.

The vault's [[Copula Architecture Comparison]] note synthesises this comparison.
