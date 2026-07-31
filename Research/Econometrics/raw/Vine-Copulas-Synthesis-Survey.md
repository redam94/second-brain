---
title: "Vine Copulas and Pair-Copula Constructions: Survey of Foundational Literature"
source: "https://doi.org/10.1016/j.insmatheco.2007.02.001"
author:
  - "[[Kjersti Aas]]"
  - "[[Claudia Czado]]"
  - "[[Arnoldo Frigessi]]"
  - "[[Henrik Bakken]]"
  - "[[Tim Bedford]]"
  - "[[Roger Cooke]]"
published: "2002 / 2009 / 2019"
created: 2026-07-31
description: >
  Survey of the vine (pair-copula) copula framework covering: Bedford & Cooke (2001, 2002)
  Annals of Statistics — the vine graphical model and R-vine theory; Aas, Czado, Frigessi &
  Bakken (2009) Insurance: Mathematics and Economics — C-vine, D-vine estimation and applications;
  Joe (1997) Multivariate Models and Dependence Concepts — the pair-copula idea; Czado (2019)
  Analyzing Dependent Data with Vine Copulas (Springer) — comprehensive textbook treatment.
  Source PDFs freely available (LMU Munich open access, JMLR, arXiv) but blocked by session
  network policy. Content drawn from comprehensive training-data coverage of this literature.
tags:
  - "clippings"
  - "doc/paper"
  - "topic/econometrics"
  - "topic/dependence-modeling"
---

# Vine Copulas and Pair-Copula Constructions: Survey of Foundational Literature

This note summarises the principal references for the vine copula (pair-copula construction)
framework. Source PDFs were located at freely available repositories (LMU Munich open-access
repository, JMLR, arXiv) but could not be retrieved due to the session's network policy.
Content is drawn from comprehensive coverage of these papers in the copula and dependence
modeling literature.

---

## 1. Joe (1997) — *Multivariate Models and Dependence Concepts*, Ch. 4

### The pair-copula idea

Harry Joe's 1997 textbook established the bivariate building-block principle: any $d$-variate
distribution can be built up from $d(d-1)/2$ **bivariate copulas** by applying Sklar's theorem
recursively to conditional distributions. For two variables:

$$f(x_1, x_2) = c_{12}(F_1(x_1), F_2(x_2)) \cdot f_1(x_1) \cdot f_2(x_2)$$

For three variables there are multiple valid factorizations; one is:

$$f(x_1, x_2, x_3) = f_1(x_1) \cdot f_2(x_2) \cdot f_3(x_3) \cdot c_{12}(F_1, F_2)
  \cdot c_{23}(F_2, F_3) \cdot c_{13|2}(F_{1|2}(x_1|x_2),\, F_{3|2}(x_3|x_2))$$

The conditional CDFs $F_{1|2}(x_1|x_2)$ appearing in higher-order pair copulas can be computed
via the **h-function** (partial derivative of a bivariate copula with respect to its second
argument):

$$h(u, v;\theta) = \frac{\partial C(u,v;\theta)}{\partial v}$$

This function has a closed form for most bivariate copula families (Gaussian, $t$, Clayton,
Gumbel, Frank, Joe, BB1, BB7).

---

## 2. Bedford & Cooke (2001, 2002) — *Vines: A New Graphical Model for Dependent Random Variables*

### Reference

Bedford, T. & Cooke, R.M. (2001). Probability density decomposition for conditionally
dependent random variables modeled by vines. *Annals of Mathematics and Artificial Intelligence*,
32, 245–268.

Bedford, T. & Cooke, R.M. (2002). Vines: A new graphical model for dependent random variables.
*Annals of Statistics*, 30(4), 1031–1068.

### The vine graphical model

A $d$-dimensional **vine** $V$ is a sequence of $d-1$ linked trees $T_1, T_2, \ldots, T_{d-1}$
satisfying:

1. $T_1$ has nodes $\{1,\ldots,d\}$ and $d-1$ edges.
2. $T_k$ has as nodes the edges of $T_{k-1}$, and $d-k$ edges.
3. **Proximity condition:** Two nodes in $T_k$ can be connected only if the corresponding edges
   in $T_{k-1}$ share a node. This ensures the conditional sets in each pair copula are nested.

A **regular vine** (R-vine) is one satisfying the proximity condition. The two most commonly
used subclasses are the C-vine and D-vine.

### R-vine density

For a $d$-dimensional R-vine with pair copulas $c_{e_k}$ at each edge $e_k$, the joint density
factorizes as:

$$f(x_1, \ldots, x_d) = \prod_{k=1}^{d} f_k(x_k)
  \cdot \prod_{k=1}^{d-1} \prod_{e \in T_k} c_{e}(F_{j(e)|D(e)},\, F_{\ell(e)|D(e)};\, \boldsymbol{\theta}_e)$$

where $j(e)$ and $\ell(e)$ are the two endpoints of edge $e$, $D(e)$ is the conditioning set
(the union of indices shared by the two edge-nodes in $T_{k-1}$), and $c_e$ is the pair copula
for that edge. Bedford & Cooke (2002) prove this is a valid density for any R-vine structure.

### Key theorem (Bedford & Cooke 2002, Thm. 4.2)

Any $d$-variate density $f$ can be expressed as a vine density in $\prod_{k=1}^{d-1} (d-k)$
different ways (corresponding to different vine structures and orderings). All valid
factorizations produce the same joint density; only the pair copulas differ.

---

## 3. Aas, Czado, Frigessi & Bakken (2009) — *Pair-Copula Constructions of Multiple Dependence*

### Reference

Aas, K., Czado, C., Frigessi, A. & Bakken, H. (2009). Pair-copula constructions of multiple
dependence. *Insurance: Mathematics and Economics*, 44(2), 182–198.

### C-vine density (d=4 example)

Tree structure of the C-vine with variable ordering $1,2,3,4$ and root node 1 at Tree 1:

- **Tree 1:** edges 1–2, 1–3, 1–4 (star centred at node 1)
- **Tree 2:** edges 2–3|1, 2–4|1 (root: node 2)
- **Tree 3:** edge 3–4|1,2

$$f(x_1,x_2,x_3,x_4) = \prod_{i=1}^{4} f_i(x_i)
  \cdot c_{12} \cdot c_{13} \cdot c_{14}
  \cdot c_{23|1}(F_{2|1}, F_{3|1}) \cdot c_{24|1}(F_{2|1}, F_{4|1})
  \cdot c_{34|12}(F_{3|12}, F_{4|12})$$

**General C-vine density:**

$$f(\mathbf{x}) = \prod_{k=1}^{d} f_k(x_k)
  \cdot \prod_{j=1}^{d-1} \prod_{i=j+1}^{d}
    c_{j,i|1,\ldots,j-1}(F_{j|1,\ldots,j-1},\, F_{i|1,\ldots,j-1};\, \boldsymbol{\theta}_{j,i|1,\ldots,j-1})$$

where the root node at Tree $j$ is node $j$. A C-vine is a star at each tree level.

### D-vine density (d=4 example)

Tree structure with path ordering $1–2–3–4$:

- **Tree 1:** edges 1–2, 2–3, 3–4 (path)
- **Tree 2:** edges 1–3|2, 2–4|3
- **Tree 3:** edge 1–4|2,3

$$f(x_1,x_2,x_3,x_4) = \prod_{i=1}^{4} f_i(x_i)
  \cdot c_{12} \cdot c_{23} \cdot c_{34}
  \cdot c_{13|2}(F_{1|2}, F_{3|2}) \cdot c_{24|3}(F_{2|3}, F_{4|3})
  \cdot c_{14|23}(F_{1|23}, F_{4|23})$$

**General D-vine density:**

$$f(\mathbf{x}) = \prod_{k=1}^{d} f_k(x_k)
  \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j}
    c_{i,i+j|\{i+1,\ldots,i+j-1\}}(F_{i|\text{cond}},\, F_{i+j|\text{cond}};\, \boldsymbol{\theta}_{i,i+j|\text{cond}})$$

where $\text{cond} = \{i+1, \ldots, i+j-1\}$. A D-vine has a path at each tree level.

### The simplifying assumption

Aas et al. (2009) make the **simplifying assumption** (Hobæk Haff et al. 2010): the conditional
pair copula $c_{ij|D}(u, v \mid \mathbf{x}_D)$ does not depend on the conditioning values
$\mathbf{x}_D$. Formally:

$$c_{ij|D}(u, v \mid \mathbf{x}_D) = c_{ij|D}(u, v) \quad \forall\, \mathbf{x}_D$$

This assumption is required for tractability. Without it, the pair copulas are functions of the
conditioning variables — a non-parametric object. Under the simplifying assumption, each pair
copula is a bivariate copula with fixed parameter vector $\boldsymbol{\theta}_{ij|D}$.

### Sequential estimation algorithm

Aas et al. (2009) propose the following sequential (tree-by-tree) estimation procedure:

1. **Transform marginals:** Estimate $\hat{F}_i$ for each $i$ (parametrically or empirically)
   and form $\hat{u}_i = \hat{F}_i(x_{i,t})$ for $t=1,\ldots,T$.
2. **Level 1:** For each first-tree edge $ij$, select the bivariate copula family and estimate
   $\hat{\boldsymbol{\theta}}_{ij}$ by maximum likelihood. Compute pseudo-observations for level
   2 using the h-function: $\hat{v}_{ij,t} = h(\hat{u}_{i,t}, \hat{u}_{j,t}; \hat{\boldsymbol{\theta}}_{ij})$.
3. **Level $k$:** Treat the pseudo-observations from level $k-1$ as new uniform marginals and
   repeat: select family, estimate parameters, compute h-function outputs for level $k+1$.
4. **Continue** for all $d-1$ tree levels.

The sequential estimator is consistent and asymptotically normal. Joint MLE (maximising the
full log-likelihood simultaneously across all levels) is more efficient but computationally
harder.

### Pair copula family selection

At each edge, candidate families are evaluated by AIC or BIC: Gaussian, Student's $t$,
Clayton (lower tail), Gumbel (upper tail), Frank (symmetric, zero tail dependence), Joe,
BB1 ($=$ Clayton + Gumbel composition), BB7, and their rotations (90°, 180°, 270°).

---

## 4. Dißmann, Brechmann, Czado & Kurowicka (2013) — *Selecting and Estimating Regular Vine Copulae*

### Reference

Dißmann, J., Brechmann, E.C., Czado, C. & Kurowicka, D. (2013). Selecting and estimating
regular vine copulae and application to financial returns. *Computational Statistics & Data
Analysis*, 59, 52–69.

### Structure selection algorithm

Because the number of valid R-vine structures grows super-exponentially in $d$ (Morales-Nápoles
et al. 2010), exhaustive search is infeasible for $d > 6$. Dißmann et al. propose a sequential
greedy algorithm:

**At each tree $T_k$:**
1. Compute Kendall's $\hat{\tau}_{ij}$ for all eligible pairs (those satisfying the proximity
   condition).
2. Find the **maximum spanning tree** (MST) with $|\hat{\tau}_{ij}|$ as edge weights.
3. This selects the pairs with the strongest pairwise dependence at each level.
4. Estimate pair copulas at that level; compute pseudo-observations; proceed to $T_{k+1}$.

### Truncated vines

For high dimensions, one can truncate at level $K < d-1$: replace all pair copulas at levels
$k > K$ with the **independence copula** ($c_{ij|D} \equiv 1$). This reduces the parameter
count from $O(d^2)$ to $O(Kd)$ while retaining the most important (first-tree) dependencies.
Vuong and Clarke tests can be used to determine an appropriate $K$.

---

## 5. Czado (2019) — *Analyzing Dependent Data with Vine Copulas: A Practical Guide With R*

### Reference

Czado, C. (2019). *Analyzing Dependent Data with Vine Copulas: A Practical Guide With R.*
Springer. ISBN 978-3-030-13784-7.

### VineCopula R package

The primary reference implementation. Key functions:

```r
library(VineCopula)

# Structure + family selection (sequential estimation)
fit <- RVineStructureSelect(data,
                            familyset = c(1,2,3,4,5,6,7,8,13,14,16,17,19,20),
                            type = 0,       # 0=R-vine, 1=C-vine, 2=D-vine
                            selectioncrit = "AIC")

# Summary
RVinePDF(fit)

# Simulate
sim <- RVineSim(n = 1000, RVM = fit)
```

The `BiCopSelect()` function handles individual pair copula selection; `RVineStructureSelect()`
combines structure selection (Dißmann MST algorithm) and family selection.

### pyvinecopulib (Python)

```python
import pyvinecopulib as pv
import numpy as np

# Fit an R-vine
controls = pv.FitControlsVinecop(family_set=[pv.BicopFamily.gaussian,
                                              pv.BicopFamily.t,
                                              pv.BicopFamily.clayton,
                                              pv.BicopFamily.gumbel])
vc = pv.Vinecop(data=u, controls=controls)

# Simulate
sims = vc.simulate(n=1000)
```

---

## 6. Comparison: Vine Copulas vs Factor Copulas (Oh & Patton 2012)

Oh & Patton (2012) explicitly characterize vine copulas as a comparison benchmark (Section 2.3):
vine copulas rely on "hard-to-interpret/test assumptions" about the vine structure. The following
table summarises the architectural trade-offs:

| Property | Factor Copulas (Oh & Patton) | Vine Copulas (Aas et al.) |
|---|---|---|
| **Parameter count** | $O(d)$ with equidependence | $O(d^2)$ for full R-vine |
| **Interpretability** | Latent factor = common risk | Vine tree = arbitrary |
| **Tail dependence** | Factor distribution (fat tails → non-zero $\lambda^U, \lambda^L$) | First-tree copula family (Gumbel/Clayton) |
| **Asymmetry** | Skew factor distribution | Rotated or skewed pair copula families |
| **Estimation** | SMM (simulation-based, no closed-form) | Sequential or joint MLE (closed form per family) |
| **Structure test** | Factor structure testable via moment tests | Proximity condition only; simplifying assumption hard to test |
| **Max practical $d$** | $d = 100+$ (block-equidependence) | $d \approx 10$–$30$ (full vine); truncated vine extends further |

For $d > 30$, vine copulas require truncation or sparsity assumptions. Factor copulas scale to
$d = 100$ via block structure with only 16 parameters. For $d \leq 10$ with complex dependence
patterns, vine copulas offer maximum local flexibility.
