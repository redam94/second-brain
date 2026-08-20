---
title: "Pair-Copula Constructions of Multiple Dependence"
source: "https://doi.org/10.1016/j.insmatheco.2007.02.001"
author:
  - "[[Kjersti Aas]]"
  - "[[Claudia Czado]]"
  - "[[Arnoldo Frigessi]]"
  - "[[Henrik Bakken]]"
published: "2009"
journal: "Insurance: Mathematics and Economics, 44(2): 182–198"
created: 2026-08-20
description: >
  Foundation paper for vine (pair-copula) constructions of multivariate dependence.
  Extends Joe (1996) and Bedford & Cooke (2001, 2002) by providing a systematic
  framework for D-vine and C-vine models, deriving the h-function recursion for
  sequential estimation, and demonstrating the approach on financial return data.
  See also Bedford & Cooke (2002) — Annals of Statistics 30(4): 1031–1068
  (doi:10.1214/aos/1031689016) — for the graphical vine framework.
tags:
  - "clippings"
  - "doc/paper"
  - "topic/econometrics"
  - "topic/copula"
---

# Pair-Copula Constructions of Multiple Dependence

This note summarises the foundational vine copula paper (Aas, Czado, Frigessi & Bakken 2009)
and the companion graphical theory paper (Bedford & Cooke 2002), as the source PDFs could
not be retrieved programmatically due to network policy. Content is drawn from comprehensive
coverage of these papers in the dependence-modelling literature.

---

## Background and Motivation

The fundamental problem in high-dimensional dependence modelling is the **curse of
dimensionality**: standard parametric multivariate copulas (Normal, $t$, Archimedean)
impose strong parametric restrictions that become untenable as $n$ grows.

- **Gaussian copula**: zero tail dependence (crashes independent in the limit), symmetric
  treatment of booms and crashes, a single correlation matrix (equicorrelation) or $n(n-1)/2$
  free parameters with no structure.
- **$t$-copula**: non-zero tail dependence but forced symmetry and one global degrees-of-freedom
  parameter.
- **Archimedean copulas** (Clayton, Gumbel, Frank): exchangeable — every pair has the same
  bivariate copula — which is too restrictive even for $n=3$.
- **Factor copulas** (Oh & Patton 2012): parsimonious but limited in pairwise flexibility; the
  simplifying factor structure may mis-specify complex dependence patterns.

The **pair-copula construction** (PCC) or **vine copula** decomposes any multivariate density
into $\binom{n}{2}$ *bivariate* copulas (pair copulas) applied sequentially to conditional
distributions. This allows: (i) a different copula family for every pair; (ii) non-zero and
asymmetric tail dependence; (iii) full likelihood-based estimation via the **h-function**
recursion; (iv) a natural model-selection hierarchy (tree by tree).

---

## 1. Bivariate Pair Copulas: Building Blocks

A **bivariate copula** $C_{ij}$ is a distribution on $[0,1]^2$ with uniform margins,
linking the CDFs of $(X_i, X_j)$ via Sklar's theorem. The copula **density** is:

$$c_{ij}(u_i, u_j) = \frac{\partial^2 C_{ij}(u_i, u_j)}{\partial u_i \, \partial u_j}$$

Common bivariate copula families used as pair copulas:

| Family | Tail dependence | Symmetry | Parameters |
|--------|----------------|----------|-----------|
| Gaussian | Zero | Symmetric | $\rho \in (-1,1)$ |
| Student-$t$ | Upper = lower | Symmetric | $\rho$, $\nu > 2$ |
| Clayton | Lower only | Asymmetric | $\delta > 0$ |
| Gumbel | Upper only | Asymmetric | $\delta \geq 1$ |
| Frank | Zero | Symmetric | $\kappa \in \mathbb{R} \setminus \{0\}$ |
| BB1 (Clayton-Gumbel) | Both | Asymmetric | $\delta > 0$, $\theta \geq 1$ |

A vine copula model selects one family for each of the $\binom{n}{2}$ pair copulas
in the vine, fitting the model to the data.

---

## 2. The Pair-Copula Factorisation Theorem

**Theorem (Joe 1996; Aas et al. 2009, Prop. 1 generalized):** Any $n$-dimensional density
$f(x_1, \dots, x_n)$ can be decomposed as:

$$f(x_1, \dots, x_n) = \prod_{k=1}^{n} f_k(x_k) \times \prod_{\text{pair copulas}} c_{e(j),e(k)|D(e)}$$

where the product over pair copulas extends over all $\binom{n}{2}$ edges $e$ of a **vine**
$\mathcal{V}$, and each pair copula $c_{e(j),e(k)|D(e)}$ is evaluated at the conditional
CDFs $F(x_{e(j)} \mid \mathbf{x}_{D(e)})$ and $F(x_{e(k)} \mid \mathbf{x}_{D(e)})$.

### $n = 3$ example (D-vine ordering: 1–2–3)

$$f(x_1, x_2, x_3) = f_1(x_1) \cdot f_2(x_2) \cdot f_3(x_3)$$
$$\times \; c_{12}\!\bigl(F_1(x_1),\, F_2(x_2)\bigr) \cdot c_{23}\!\bigl(F_2(x_2),\, F_3(x_3)\bigr)$$
$$\times \; c_{13|2}\!\bigl(F_{1|2}(x_1 \mid x_2),\, F_{3|2}(x_3 \mid x_2)\bigr)$$

The three pair copulas: $c_{12}$ (unconditional), $c_{23}$ (unconditional), and
$c_{13|2}$ (conditional on $x_2$).

### General structure

For $n$ variables there are $n-1$ trees $T_1, T_2, \dots, T_{n-1}$. Tree $T_1$ contributes
$n-1$ unconditional pair copulas; tree $T_j$ contributes $n-j$ pair copulas conditioned on
$j-1$ variables. Total: $\sum_{j=1}^{n-1}(n-j) = \binom{n}{2}$ pair copulas.

---

## 3. The h-Function: Computing Conditional CDFs

To evaluate a pair copula at tree $T_2$ and above, one needs the **conditional CDF**
$F(x_i \mid x_j)$ as an input. This is computed from the bivariate copula fitted in $T_1$
via the **h-function** (also called the conditional distribution function):

$$h(u \mid v, \boldsymbol{\theta}) = F(x \mid v) = \frac{\partial C_{uv}(u, v; \boldsymbol{\theta})}{\partial v}$$

where $u = F_i(x_i)$ and $v = F_j(x_j)$ are uniform scores, and $C_{uv}$ is the copula
with parameter(s) $\boldsymbol{\theta}$.

For example, for the **Gaussian copula** with correlation $\rho$:

$$h(u \mid v, \rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho \Phi^{-1}(v)}{\sqrt{1 - \rho^2}}\right)$$

The h-function is applied recursively: to evaluate the $j$-th tree, one applies the
h-functions from all $j-1$ earlier trees to the data.

---

## 4. The Simplifying Assumption

In general, the conditional pair copula $c_{ij|D}$ may depend on the *values* of the
conditioning variables $\mathbf{d}$, not just on the fact that we condition on $D$:

$$c_{ij|D}\bigl(F(x_i \mid \mathbf{d}),\, F(x_j \mid \mathbf{d})\bigr; \boldsymbol{\theta}_{ij|D}(\mathbf{d}))$$

The **simplifying assumption** (Hobæk Haff et al. 2010; Joe 2014) sets
$\boldsymbol{\theta}_{ij|D}(\mathbf{d}) \equiv \boldsymbol{\theta}_{ij|D}$ (constant in $\mathbf{d}$).
This makes the vine model tractable: the conditional copulas can be estimated from the
pseudo-observations produced by the h-function recursion.

The simplifying assumption is exact when the vine is truncated at tree $T_1$ (all higher
pair copulas are independence copulas) and when the true model is multivariate Gaussian
or $t$. In other settings it is an approximation whose quality depends on the strength of
higher-order conditional dependence.

Aas et al. (2009) invoke the simplifying assumption throughout; it is the standard
assumption in applied vine copula modelling and is typically reasonable unless conditioning
variables have strong nonlinear relationships with the pair dependence.

---

## 5. Vine Graphical Structures (Bedford & Cooke 2002)

Bedford & Cooke (2002) formalise the vine as a graphical object:

> **Definition (Regular Vine):** A **vine** $\mathcal{V}$ on $n$ variables is a set of nested
> trees $\{T_1, T_2, \dots, T_{n-1}\}$ satisfying:
> 1. $T_1$ has nodes $N_1 = \{1, \dots, n\}$ and edges $E_1$.
> 2. For $j \geq 2$: $T_j$ has nodes $N_j = E_{j-1}$ (the edges of the previous tree),
>    with edges $E_j \subseteq \{\{a, b\} : a, b \in N_j,\, |a \cap b| = j-1\}$
>    (**proximity condition**: two edges in $T_{j-1}$ can be connected in $T_j$ only if
>    they share exactly $j-1$ elements).
> 3. A vine is **regular** if $T_j$ spans all nodes of $N_j$ and each tree has $n-j$ edges.

The $\binom{n}{2}$ pair copulas correspond to the $\binom{n}{2}$ edges across all trees.
Each edge $e = \{a, b\}$ in tree $T_j$ has a **conditioning set** $D(e) = a \cap b$
(shared elements) and a **conditioned set** $\{e(a), e(b)\} = (a \cup b) \setminus (a \cap b)$
(the two distinct elements). The associated pair copula is $c_{e(a),e(b)|D(e)}$.

---

## 6. C-vine and D-vine: Special Cases

### C-vine (Canonical Vine)

In a C-vine, every tree $T_j$ is a **star graph** with a single "root" node connected to
all others. The root at each level is chosen to be the variable with highest average
dependence with the remaining variables (largest sum of absolute Kendall's $\tau$).

For $n = 4$, C-vine with root variable ordering $(1, 2, 3, 4)$:

| Tree | Pair copulas | Conditioning set |
|------|-------------|-----------------|
| $T_1$ | $c_{12}$, $c_{13}$, $c_{14}$ | $\emptyset$ |
| $T_2$ | $c_{23\|1}$, $c_{24\|1}$ | $\{1\}$ |
| $T_3$ | $c_{34\|12}$ | $\{1,2\}$ |

**When to use:** When one variable (the root) dominates the dependence structure and
acts as a "hub." Example: market index as the common driver in a portfolio.

### D-vine (Drawable Vine)

In a D-vine, every tree $T_j$ is a **path graph** (each node connected to at most 2 others).
The variable ordering within the path is chosen to place highly dependent pairs adjacent.

For $n = 4$, D-vine with ordering $(1, 2, 3, 4)$:

| Tree | Pair copulas | Conditioning set |
|------|-------------|-----------------|
| $T_1$ | $c_{12}$, $c_{23}$, $c_{34}$ | $\emptyset$ |
| $T_2$ | $c_{13\|2}$, $c_{24\|3}$ | $\{2\}$, $\{3\}$ |
| $T_3$ | $c_{14\|23}$ | $\{2,3\}$ |

**When to use:** When there is a natural sequential ordering or when dependence
"chains" through the ordering (each variable most dependent on its neighbors).
Common in time-series contexts.

### General R-vine

Any vine not constrained to be a C-vine or D-vine is a **regular vine** (R-vine). Modern
software (`vinecopulib`, `VineCopula`) selects R-vine structures automatically using
maximum spanning tree algorithms on Kendall's $\tau$ statistics.

---

## 7. Sequential Estimation Algorithm (Aas et al. 2009)

**Step 0:** Estimate marginals $\hat{F}_i$ (parametric or empirical); compute
pseudo-uniform scores $\hat{u}_{ij} = \hat{F}_i(x_{ij})$ for $i = 1,\dots,n$, $j = 1,\dots,T$.

**Step 1 (Tree $T_1$):** For each edge $(i,k) \in E_1$, fit the pair copula
$c_{ik}(\hat{u}_{ij}, \hat{u}_{kj})$ by maximum likelihood; obtain $\hat{\boldsymbol{\theta}}_{ik}$.

**Step 2 (h-function transform):** Compute conditional pseudo-observations for tree $T_2$:
$$v_{ij|k} = h(\hat{u}_{ij} \mid \hat{u}_{kj}; \hat{\boldsymbol{\theta}}_{ik}) = \hat{F}(x_{ij} \mid x_{kj})$$

**Step $j$ (Tree $T_j$, $j = 2,\dots,n-1$):** For each edge in $T_j$ with conditioned set
$(a, b)$ and conditioning set $D$, fit $c_{ab|D}(v_{a|D}, v_{b|D})$ by MLE; update the
pseudo-observations using the h-function.

**Properties:**
- Consistent under the simplifying assumption (Hobæk Haff 2013).
- Computationally fast: $\binom{n}{2}$ separate bivariate MLE problems.
- Statistically inefficient (ignores parameter uncertainty from earlier trees).
- Full joint MLE is efficient but requires the full vine density gradient; standard for
  $n \leq 20$ with modern optimizers.

---

## 8. Vine Copula vs. Factor Copula: A Comparison

| Aspect | Vine Copula (Aas et al. 2009) | Factor Copula (Oh & Patton 2012) |
|--------|------------------------------|----------------------------------|
| Model structure | Product of $\binom{n}{2}$ pair copulas | Latent factor model |
| Parameters | $\binom{n}{2}$ pairs × (1–3 params each) | $O(n)$ (loadings + distribution params) |
| Scalability | Challenging for $n > 30$ | Designed for $n > 50$ |
| Closed-form density | Yes (under simplifying assumption) | No (except Gaussian) |
| Tail dependence | Pairwise: any asymmetry per pair | Global: driven by factor distribution |
| Estimation | Sequential/joint MLE | SMM via rank statistics |
| Structural assumption | Vine structure + simplifying assumption | Factor model structure |
| Model selection | Tree-by-tree AIC/BIC + family selection | Simulation-based |
| Interpretability | High (each pair copula = one relationship) | Moderate (factor = latent common driver) |

The vine copula was explicitly cited in Oh & Patton (2012) as an alternative for moderate
dimensions that is "hard to interpret and test at high dimensions" — motivating their factor
approach for $N = 100$.

---

## References

- Aas, K., Czado, C., Frigessi, A. & Bakken, H. (2009). Pair-copula constructions of
  multiple dependence. *Insurance: Mathematics and Economics* 44(2): 182–198.
  https://doi.org/10.1016/j.insmatheco.2007.02.001
- Bedford, T. & Cooke, R.M. (2002). Vines—a new graphical model for dependent random
  variables. *Annals of Statistics* 30(4): 1031–1068. https://doi.org/10.1214/aos/1031689016
- Bedford, T. & Cooke, R.M. (2001). Probability density decomposition for conditionally
  dependent random variables modeled by vines. *Annals of Mathematics and Artificial
  Intelligence* 32: 245–268.
- Joe, H. (1996). Families of $m$-variate distributions with given margins and
  $m(m-1)/2$ bivariate dependence parameters. In L. Rüschendorf, B. Schweizer & M.D. Taylor
  (eds), *Distributions with Fixed Marginals and Related Topics*, pp. 120–141. IMS.
- Hobæk Haff, I., Aas, K. & Frigessi, A. (2010). On the simplified pair-copula construction—
  simply useful or too simplistic? *Journal of Multivariate Analysis* 101(5): 1296–1310.
- Czado, C. (2019). *Analyzing Dependent Data with Vine Copulas: A Practical Guide with R*.
  Lecture Notes in Statistics 222. Springer.
- Nagler, T. & Czado, C. (2016). Evading the curse of dimensionality in nonparametric
  density estimation with simplified vine copulas. *Journal of Multivariate Analysis*
  151: 69–89.
