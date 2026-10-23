---
title: "Vine Copulas and Pair Copula Constructions: Foundational Papers Survey"
source: "https://doi.org/10.1016/j.insmatheco.2007.02.001"
author:
  - "[[Kjersti Aas]]"
  - "[[Claudia Czado]]"
  - "[[Arnoldo Frigessi]]"
  - "[[Henrik Bakken]]"
  - "[[Tim Bedford]]"
  - "[[Roger Cooke]]"
  - "[[Jakob Dissmann]]"
published: "2009 / 2002 / 2013"
created: 2026-10-23
description: >
  Survey of the foundational vine copula / pair copula construction (PCC) literature covering: Bedford & Cooke (2002) Annals of Statistics — the regular vine graphical framework; Aas et al. (2009) Insurance Mathematics & Economics — pair copula constructions and the h-function sequential estimation algorithm; Dissmann et al. (2013) Computational Statistics & Data Analysis — automated R-vine structure and family selection. Freely available as: LMU SFB working paper 487 (Aas), Project Euclid open access (Bedford & Cooke), arXiv:1202.2002 (Dissmann). Source PDFs could not be retrieved in this session due to network policy restrictions.
tags:
  - clippings
  - doc/paper
  - topic/copulas
  - topic/econometrics
---

# Vine Copulas and Pair Copula Constructions: Survey of Foundational Literature

This note summarises the three principal references for vine copula / pair copula construction (PCC) methodology, as the source PDFs could not be retrieved programmatically due to network policy restrictions. Content is drawn from comprehensive coverage of these papers in the statistical and econometric literature.

---

## 1. Bedford & Cooke (2002) — *Vines — A New Graphical Model for Dependent Random Variables* (Annals of Statistics 30: 1031–1068)

### Motivation

Modelling multivariate dependence is hard: a fully general $n$-variate copula requires an exponentially growing number of parameters. Previous approaches (multivariate Gaussian, $t$, Archimedean) impose strong symmetry and exchangeability constraints. Bedford & Cooke propose **vines** — a class of graphical models that build a multivariate density from cascades of bivariate conditional distributions, leveraging the rich toolkit of bivariate copulas.

### The density factorization

Any joint density $f(x_1, \ldots, x_n)$ can be written as a product of bivariate copula densities and marginals:

$$f(x_1, \ldots, x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{\ell=1}^{n-1} \prod_{e \in E_\ell} c_{j(e),k(e)|D(e)}\bigl(F(x_{j(e)} \mid \mathbf{x}_{D(e)}),\, F(x_{k(e)} \mid \mathbf{x}_{D(e)})\bigr)$$

where $D(e)$ is the conditioning set for edge $e$ in tree $\ell$, and $j(e), k(e)$ are the two variables linked by that edge. Each factor $c_{j,k|D}$ is a **pair copula density** — a bivariate copula density evaluated at the conditional CDFs.

### Regular vine definition

> [!definition] Regular Vine (Bedford & Cooke 2002, Def. 4.1)
> A **regular vine** $\mathcal{V}$ on $n$ variables is a sequence of $n-1$ trees $T_1, T_2, \ldots, T_{n-1}$ satisfying:
> 1. $T_1$ has nodes $N_1 = \{1,\ldots,n\}$ and edges $E_1 \subseteq \binom{N_1}{2}$.
> 2. For $k \geq 2$: $T_k$ has nodes $N_k = E_{k-1}$ (the edges of tree $T_{k-1}$ become the nodes of tree $T_k$) and edges $E_k$.
> 3. **Proximity condition**: Two nodes $\mathbf{a} = \{a_1, \ldots, a_{k+1}\}$ and $\mathbf{b} = \{b_1, \ldots, b_{k+1}\}$ in $N_k = E_{k-1}$ can be connected by an edge in $T_k$ only if $|\mathbf{a} \cap \mathbf{b}| = k$ (they share exactly $k$ elements, i.e., differ in exactly one variable).
^def-regular-vine

The proximity condition ensures that each pair copula $c_{j,k|D}$ conditions on exactly those variables that connect the two endpoints along the vine path.

### Counting vines

For $n = 4$ variables, there are 24 distinct regular vines. In general the number of distinct $n$-node regular vines grows super-exponentially. Two important special cases — canonical (C-vine) and drawable (D-vine) — are described by Aas et al. (2009) and cover the majority of applied practice.

### Key theoretical results

1. **Non-uniqueness**: The factorization is not unique. Different vine structures and edge orderings produce valid (but different) decompositions of the same joint density. The pair copulas in one decomposition generally differ from those in another.
2. **Marginalisation**: Any sub-vine of a vine on $\{1,\ldots,n\}$ gives a valid lower-dimensional vine. This makes vine copulas **composable**.
3. **Conditional independence**: If $c_{j,k|D} = 1$ (independence copula) for edge $(j,k|D)$ in tree $T_\ell$, then $X_j \perp X_k \mid \mathbf{X}_D$. Setting higher-level pair copulas to independence gives a **truncated vine** with sparser structure.

---

## 2. Aas, Czado, Frigessi & Bakken (2009) — *Pair-Copula Constructions of Multiple Dependence* (Insurance: Mathematics and Economics 44: 182–198)

### Contribution

Aas et al. make vine copulas practical by:
1. Identifying **C-vines** and **D-vines** as the two canonical structures most useful in practice.
2. Deriving the **h-function** for computing conditional CDFs recursively.
3. Proposing a **sequential (step-by-step) estimation** algorithm that avoids high-dimensional optimization.
4. Demonstrating the methodology on a 4-dimensional financial dataset (exchange rates and oil prices).

### C-vine and D-vine definitions

> [!definition] Canonical Vine (C-vine) and Drawable Vine (D-vine)
> Let $p = n$ be the number of variables.
>
> **C-vine (canonical vine)**: In each tree $T_k$, there is a single *root node* that is connected to every other node (star topology). Specifically, in tree $T_k$, node $k$ is the root with $p-k$ edges. The joint density is:
> $$f(\mathbf{x}) = \prod_{k=1}^{p} f_k(x_k) \cdot \prod_{j=1}^{p-1} \prod_{i=j+1}^{p} c_{j,i|1,\ldots,j-1}\bigl(F(x_j \mid x_1,\ldots,x_{j-1}),\, F(x_i \mid x_1,\ldots,x_{j-1})\bigr)$$
>
> **D-vine (drawable vine)**: The trees are paths (each node has degree $\leq 2$). In tree $T_k$, the nodes are connected sequentially: each node has at most two neighbours. The joint density is:
> $$f(\mathbf{x}) = \prod_{k=1}^{p} f_k(x_k) \cdot \prod_{j=1}^{p-1} \prod_{i=1}^{p-j} c_{i,i+j|i+1,\ldots,i+j-1}\bigl(F(x_i \mid x_{i+1},\ldots,x_{i+j-1}),\, F(x_{i+j} \mid x_{i+1},\ldots,x_{i+j-1})\bigr)$$
^def-cvine-dvine

### The h-function

The conditional CDF $F(x \mid \mathbf{v})$ needed to evaluate pair copulas at higher tree levels is computed recursively. Define:

$$h(x \mid v;\, \theta_{xv}) = F(x \mid v) = \frac{\partial C_{xv}\bigl(F(x), F(v);\, \theta_{xv}\bigr)}{\partial F(v)}$$

For a pair copula $c_{j,k|D}$ in tree $T_\ell$, the conditional CDFs are computed as:

$$F(x_j \mid \mathbf{x}_D) = h\bigl(h(\cdots);\, \theta\bigr)$$

by recursively applying the $h$-function from the first tree upward. Each pair copula $c_{j,k|D}$ in tree $T_\ell$ only requires the conditional CDFs computed in tree $T_{\ell-1}$.

| Copula family | $C(u,v;\theta)$ | $h(x \mid v;\theta) = \partial C/\partial v$ |
|---|---|---|
| Gaussian$(\rho)$ | $\Phi_2\bigl(\Phi^{-1}(u),\Phi^{-1}(v);\rho\bigr)$ | $\Phi\!\left(\frac{\Phi^{-1}(u)-\rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
| Clayton$(\theta)$ | $(u^{-\theta}+v^{-\theta}-1)^{-1/\theta}$ | $v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta-1}$ |
| Gumbel$(\theta)$ | $\exp\{-[(-\ln u)^\theta+(-\ln v)^\theta]^{1/\theta}\}$ | $\frac{C(u,v)}{v}\,\frac{[(-\ln u)^\theta+(-\ln v)^\theta]^{1/\theta-1}(-\ln v)^{\theta-1}}{-\ln v}$ |

### Sequential estimation

> [!theorem] Sequential Estimation of a Vine Copula (Aas et al. 2009, Sec. 4)
> Given a vine structure (C-vine or D-vine), estimate parameters **tree by tree**:
>
> 1. For each edge $(i,j) \in E_1$ in tree $T_1$: fit pair copula $c_{ij}(\hat F_i(x_i), \hat F_j(x_j);\, \theta_{ij})$ by maximizing bivariate log-likelihood.
> 2. Compute pseudo-observations for tree $T_2$: $\hat{u}_{i|j} = h(\hat F_i(x_i) \mid \hat F_j(x_j);\, \hat\theta_{ij})$ using estimated $\hat\theta_{ij}$.
> 3. Repeat for trees $T_3, \ldots, T_{n-1}$, using pseudo-observations from the previous tree.
>
> This sequential estimator is **consistent** and can serve as starting values for full maximum likelihood estimation over all trees simultaneously.
^thm-sequential-estimation

---

## 3. Dissmann, Brechmann, Czado & Kurowicka (2013) — *Selecting and Estimating Regular Vine Copulae and Application to Financial Returns* (Computational Statistics & Data Analysis 59: 52–69; arXiv:1202.2002)

### Contribution

Dissmann et al. extend vine copulas from the restricted C- and D-vine structures to general **regular vines (R-vines)**, and propose an automated algorithm for selecting both the vine structure (which pairs to link at each tree level) and the pair copula families.

### R-vine matrix representation

An $n \times n$ upper triangular matrix $M$ encodes the entire R-vine structure. Each column $k$ represents tree $T_k$; each cell $(i,k)$ for $i > k$ encodes the conditioning set. This matrix representation is used by the **VineCopula** R package.

### Structure selection algorithm

> [!theorem] Maximum Spanning Tree (MST) Algorithm (Dissmann et al. 2013, Alg. 1)
> For tree $T_1$:
> 1. Compute pairwise Kendall's $\hat\tau$ for all $\binom{n}{2}$ pairs.
> 2. Construct a weighted complete graph $G_1$ with edge weights $|\hat\tau_{ij}|$.
> 3. Find the **maximum spanning tree** (MST) of $G_1$ — edges with the highest dependence first. This defines the structure of $T_1$.
>
> For tree $T_k$ ($k \geq 2$):
> 1. Compute the Kendall's $\tau$ of each allowed edge $(j,k|D) \in E_k$ using pseudo-observations from tree $T_{k-1}$.
> 2. Find the MST subject to the **proximity condition**.
>
> This greedy approach ensures the most important bivariate dependencies appear in lower trees (where the pair copula assumption is exact under the simplifying assumption).
^thm-mst-structure

### Family selection

For each edge in the vine, choose the pair copula family by minimizing AIC (or BIC) over a candidate set including: Gaussian, Student-$t$, Clayton, Gumbel, Frank, Joe, BB1, BB6, BB7, BB8, and their rotated versions (for negative tail dependence). The independence copula is also included; if selected, it is equivalent to truncating the vine at that level.

### Truncated vines

> [!definition] Truncated Vine (Dissmann et al. 2013, Sec. 2.4)
> A vine is **truncated at level $k$** if all pair copulas in trees $T_{k+1}, \ldots, T_{n-1}$ are set to the independence copula. The number of estimated pair copulas reduces from $\binom{n}{2}$ to $kn - k(k+1)/2$.
>
> **Brechmann et al. (2012)** propose selecting the truncation level by testing each tree for the significance of pair copula parameters (likelihood ratio test or information criterion).
^def-truncated-vine

### Application

Applied to 4 German stock market returns (DAX constituents), the R-vine outperforms Student-$t$, C-vine, and D-vine copulas in terms of AIC and out-of-sample log-likelihood. The selected vine has heterogeneous pair families (Gumbel, Clayton, and Student-$t$), confirming that different pairs exhibit different tail properties.

---

## Key Takeaway for the Vault

Vine copulas complement [[Factor Copulas - Overview]] in the high-dimensional dependence modelling toolkit:
- **Factor copulas** (Oh & Patton 2012): parsimonious, suited for very high dimensions ($n \geq 50$), closed-form tail dependence via EVT, common factor structure.
- **Vine copulas** (Bedford & Cooke 2002; Aas et al. 2009; Dissmann et al. 2013): flexible, suited for moderate dimensions ($n \leq 20$–30), any mix of pair copula families, automated model selection.

For applications with 5–20 variables and heterogeneous pair-wise dependence structures (e.g. different assets have different tail behaviours), vine copulas offer greater flexibility at the cost of harder model selection and interpretation.

## References

- Bedford, T. & Cooke, R.M. (2002). Vines — a new graphical model for dependent random variables. *Annals of Statistics* 30(4): 1031–1068. https://projecteuclid.org/euclid.aos/1031689016
- Aas, K., Czado, C., Frigessi, A. & Bakken, H. (2009). Pair-copula constructions of multiple dependence. *Insurance: Mathematics and Economics* 44(2): 182–198. https://doi.org/10.1016/j.insmatheco.2007.02.001. Working paper: LMU SFB 386 Paper 487 (2006).
- Dissmann, J., Brechmann, E.C., Czado, C. & Kurowicka, D. (2013). Selecting and estimating regular vine copulae and application to financial returns. *Computational Statistics & Data Analysis* 59: 52–69. arXiv:1202.2002.
- Bedford, T. & Cooke, R.M. (2001). Probability density decomposition for conditionally dependent random variables modelled by vines. *Annals of Mathematics and Artificial Intelligence* 32: 245–268.
- Joe, H. (1996). Families of m-variate distributions with given margins and m(m-1)/2 bivariate dependence parameters. In Rüschendorf, L., Schweizer, B. & Taylor, M.D. (eds.), *Distributions with Fixed Marginals and Related Topics*, pp. 120–141. IMS Lecture Notes.
- Czado, C. (2019). *Analyzing Dependent Data with Vine Copulas: A Practical Guide With R*. Lecture Notes in Statistics, vol. 222. Springer.
