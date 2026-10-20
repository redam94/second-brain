---
title: "Vine / Pair-Copula Constructions: Survey of Foundational Literature"
source: "https://doi.org/10.1016/j.insmatheco.2007.02.001"
author:
  - "[[Kjersti Aas]]"
  - "[[Claudia Czado]]"
  - "[[Arnoldo Frigessi]]"
  - "[[Henrik Bakken]]"
  - "[[Tim Bedford]]"
  - "[[Roger Cooke]]"
published: "2002 / 2009"
created: 2026-10-20
description: >
  Survey of foundational vine / pair-copula construction (PCC) literature.
  Source PDFs could not be retrieved programmatically due to network policy.
  Content synthesised from: (1) Aas, Czado, Frigessi & Bakken (2009)
  "Pair-copula constructions of multiple dependence", Insurance: Mathematics
  and Economics 44(2): 182-198; (2) Bedford & Cooke (2002) "Vines — A new
  graphical model for dependent random variables", Annals of Statistics
  30(4): 1031-1068; (3) Czado (2019) Analyzing Dependent Data with Vine
  Copulas, Springer Lecture Notes in Statistics 222; plus secondary
  literature and training knowledge.
tags:
  - "clippings"
  - "doc/paper"
  - "topic/econometrics"
  - "topic/dependence-modeling"
---

# Vine / Pair-Copula Constructions: Survey of Foundational Literature

This note summarises the foundational vine/pair-copula construction (PCC)
literature, as the source PDFs could not be retrieved programmatically (network
policy). Content is drawn from comprehensive coverage of these papers in the
dependence-modelling literature.

---

## 1. Bedford & Cooke (2002) — *Vines — A New Graphical Model for Dependent Random Variables* (Annals of Statistics 30(4): 1031–1068)

### Problem addressed

Any multivariate distribution has $d(d-1)/2$ pairwise marginal distributions
and many more higher-order conditional distributions. A principled framework
for specifying a coherent high-dimensional distribution via these lower-dimensional
building blocks was missing.

### The Vine construction

Bedford & Cooke organise pair-copula constructions via a sequence of nested trees
called a **vine** (or regular vine / R-vine). A regular vine $\mathcal{V}$ on $d$
variables is a sequence of $d-1$ trees $T_1, T_2, \ldots, T_{d-1}$ such that:

- $T_1$ has nodes $\{1,\ldots,d\}$ and $d-1$ edges.
- $T_k$ (for $k \geq 2$) has as nodes the **edges** of $T_{k-1}$.
- **Proximity condition**: two nodes of $T_k$ are joined by an edge only if the
  corresponding edges of $T_{k-1}$ share a node.

Each edge $e$ in tree $T_k$ corresponds to a pair copula $c_{a(e),b(e)|D(e)}$
where $a(e), b(e)$ are the conditioned variables and $D(e)$ is the conditioning set.

### Two canonical subclasses

**C-vine (Canonical Vine):** At each tree $T_k$ one node — the "pivot" — is
connected to all other nodes (the tree is a star). The pivot variable conditions
all pairs in subsequent trees. Suitable when one variable dominates the dependence.

**D-vine (Drawable Vine):** At each tree $T_k$ all nodes have degree at most 2
(the tree is a path). Variables are ordered $1, 2, \ldots, d$ along the path.
Suitable when variables follow a natural ordering (spatial, temporal).

### Density decomposition theorem (Bedford & Cooke 2002)

For a regular vine $\mathcal{V}$ the joint density factorises as:

$$f(x_1,\ldots,x_d) = \prod_{k=1}^{d} f_k(x_k)
  \cdot \prod_{k=1}^{d-1} \prod_{e \in T_k}
    c_{a(e),b(e)|D(e)}\!\left(F_{a(e)|D(e)}, F_{b(e)|D(e)}\right)$$

Every product term is either a univariate density or a bivariate pair-copula
evaluated at conditional CDFs. This is an **exact factorisation** — no
approximation is involved.

---

## 2. Aas, Czado, Frigessi & Bakken (2009) — *Pair-copula constructions of multiple dependence* (Insurance: Mathematics and Economics 44(2): 182–198)

### Contribution

Aas et al. make the Bedford-Cooke vine framework practical by:
1. Specifying **parametric pair copulas** from standard families (Gaussian, $t$,
   Clayton, Gumbel, Frank) at each edge.
2. Deriving the **h-function** machinery for computing conditional CDFs
   (needed for tree-by-tree estimation).
3. Proving **sequential maximum-likelihood estimation** (SML): estimate tree
   $T_1$ first, compute conditional CDFs, estimate $T_2$, etc.
4. Comparing C-vines and D-vines on financial and hydrological data.

### The h-function

For a bivariate copula $C_{12}$ the **h-function** computes the conditional CDF
of $U_1$ given $U_2 = u_2$:

$$h_{1|2}(u_1, u_2; \boldsymbol{\theta}) = \frac{\partial C_{12}(u_1, u_2; \boldsymbol{\theta})}{\partial u_2}$$

and $h_{2|1}$ is the analogous function conditioning on $u_1$. These are used
to build the conditional CDFs required at each tree level.

### 3-variable example (D-vine)

For $d=3$ the D-vine orders variables $1-2-3$. The density is:

$$f(x_1,x_2,x_3) = f_1(x_1)\,f_2(x_2)\,f_3(x_3)\cdot
  c_{12}(F_1,F_2)\cdot c_{23}(F_2,F_3)\cdot
  c_{13|2}\!\left(h_{1|2}(F_1,F_2),\,h_{3|2}(F_3,F_2)\right)$$

The pair copula $c_{13|2}$ captures the **residual dependence** between $X_1$
and $X_3$ after removing the effect of $X_2$, evaluated at the conditional CDFs
$F_{1|2}=h_{1|2}$ and $F_{3|2}=h_{3|2}$.

### The simplifying assumption

Exact vine evaluation requires $c_{a,b|D}$ to be conditioned on the realized
values of $\mathbf{x}_D$ — the conditioning variables. The **simplifying
assumption** (SA) replaces this by pair copulas that depend only on the
rank-transformed conditional CDFs, not on the conditioning values directly:

$$c_{a,b|D}(F_{a|D}(\,\cdot\mid\mathbf{x}_D),\,F_{b|D}(\,\cdot\mid\mathbf{x}_D);\boldsymbol{\theta}_{ab|D})
  \approx c_{a,b|D}(F_{a|D},F_{b|D};\boldsymbol{\theta}_{ab|D})$$

Under the SA the parameters $\boldsymbol{\theta}_{ab|D}$ do not depend on
$\mathbf{x}_D$ and can be estimated from the pseudo-observations
$(\hat{F}_{a|D}, \hat{F}_{b|D})$ directly. This assumption is violated in
principle but works well in practice for many financial datasets.

### Sequential maximum-likelihood estimation (Algorithm 1)

```
For k = 1, ..., d-1:
  1. Compute pseudo-observations at tree T_k:
     - For k=1:  v_{i,j} = rank(x_{i,j}) / (n+1)  (scaled ranks)
     - For k>1:  v_{a|D} = h_{a|D}(v_a, v_{conditioning})  (h-functions from k-1)
  2. For each edge e in T_k:
     - Fit pair copula c_{a(e),b(e)|D(e)} by maximum likelihood
       on the pseudo-observations (v_{a(e)|D(e)}, v_{b(e)|D(e)})
     - Record parameters θ_e and selected family
  3. Compute h-function outputs for use at tree T_{k+1}
```

Full MLE (maximising the joint log-likelihood over all trees simultaneously) is
also possible but computationally expensive. SML is consistent and asymptotically
efficient under the SA.

### Number of model parameters

A $d$-dimensional vine has $d(d-1)/2$ bivariate pair copulas, each with its own
family and parameters. Compared to a single $d$-variate parametric copula
(e.g. $d$-variate Gaussian with $d(d-1)/2$ correlation parameters) the vine has
the same number of bivariate "slots" but the **copula families can differ** at
each slot — giving far greater flexibility.

---

## 3. Czado (2019) — *Analyzing Dependent Data with Vine Copulas: A Practical Guide with R* (Springer LNS 222)

### Structure

The book provides the complete workflow: bivariate copula building blocks →
pair-copula constructions → vine model selection → estimation and inference →
goodness-of-fit → applications. Chapter highlights:

- **Ch. 3–4**: Bivariate copulas (Elliptical, Archimedean, extreme-value families;
  tail dependence table matching the one in [[Dependence Measures for Copulas]]).
- **Ch. 5**: Regular vines — the Bedford-Cooke density decomposition theorem.
- **Ch. 6**: C-vines and D-vines as special cases; notation conventions.
- **Ch. 7**: Parameter estimation: SML, full MLE, Bayesian (Min & Czado 2010).
- **Ch. 8**: Model selection — sequential and global algorithms for tree structure
  and copula family selection via AIC/BIC and conditional Kendall's $\tau$.
- **Ch. 10**: Case study: dependence among German DAX stocks.

### Key formulae — Conditional Kendall's tau for tree selection

The empirical conditional Kendall's tau between variables $a$ and $b$ given
conditioning set $D$ is estimated from pseudo-observations:

$$\hat{\tau}_{ab|D} = \frac{2}{n(n-1)}\sum_{i<j}
  \text{sign}\!\left[(v_{ia|D}-v_{ja|D})(v_{ib|D}-v_{jb|D})\right]$$

A common tree-selection heuristic (Dissmann et al. 2013): at each tree level,
build the **maximum spanning tree** with $|\hat{\tau}_{ab|D}|$ as edge weights.
This prioritises the strongest pairwise dependencies at each level.

---

## 4. Comparison: Vine Copulas vs. Factor Copulas (Oh & Patton 2012)

| Property | Vine (C/D/R) | Factor Copula (Oh & Patton) |
|---|---|---|
| **Construction** | Sequential pair copulas on a tree | Latent linear factor $X_i = \beta_i Z + \varepsilon_i$ |
| **Dimensionality** | $d(d-1)/2$ pair copulas | $K$ factor parameters + $d$ loadings |
| **Flexibility** | Each pair copula can have its own family and params | All variables share same factor distribution |
| **Tail dependence** | Can be heterogeneous across pairs | Equi-dependence within blocks (uniform via factor EVT) |
| **Interpretability** | Tree structure; hard to compare across dimensions | Factor = common risk driver; economically interpretable |
| **Estimation** | Sequential MLE or full MLE (feasible up to ~20 dims) | SMM on rank statistics (scales to $d=100$+) |
| **Main reference** | Aas et al. (2009) | Oh & Patton (2012, 2017) |

The factor copula is more parsimonious and scales better; the vine copula
is more flexible and allows heterogeneous dependence.

---

## References

- Bedford, T. & Cooke, R.M. (2002). Vines — A new graphical model for dependent random variables. *Annals of Statistics* 30(4): 1031–1068. https://doi.org/10.1214/aos/1031689016  [Open Access]
- Aas, K., Czado, C., Frigessi, A. & Bakken, H. (2009). Pair-copula constructions of multiple dependence. *Insurance: Mathematics and Economics* 44(2): 182–198. https://doi.org/10.1016/j.insmatheco.2007.02.001  [Working paper: LMU Munich SFB 386, Paper 487]
- Czado, C. (2019). *Analyzing Dependent Data with Vine Copulas: A Practical Guide with R*. Lecture Notes in Statistics 222, Springer. https://doi.org/10.1007/978-3-030-13785-4
- Oh, D.H. & Patton, A.J. (2017). Modelling dependence in high dimensions with factor copulas. *Journal of Business & Economic Statistics* 35(1): 139–154. [Already in vault: [[raw/Oh-Patton-2012-Factor-Copulas.pdf]]]
- Dissmann, J., Brechmann, E.C., Czado, C. & Kurowicka, D. (2013). Selecting and estimating regular vine copulae and application to financial returns. *Computational Statistics & Data Analysis* 59: 52–69.
- Min, A. & Czado, C. (2010). Bayesian inference for multivariate copulas using pair-copula constructions. *Journal of Financial Econometrics* 8(4): 511–546.
