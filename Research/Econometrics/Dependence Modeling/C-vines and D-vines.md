---
title: C-vines and D-vines
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/SOURCES-vine-copulas.md]]"
source_location: "Aas et al. (2009), §2; Bedford & Cooke (2002), §5"
date_ingested: 2026-08-01
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction and Regular Vines]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
  - star vine
  - path vine
---

# C-vines and D-vines

> [!summary]
> C-vines (canonical vines) and D-vines (drawable vines) are the two most common special cases of regular vines, introduced by Bedford & Cooke (2002) and made computationally practical by Aas et al. (2009). A **C-vine** has star-shaped trees (one root node connected to all others at each level) and is natural when one variable dominates the dependence structure. A **D-vine** has path-shaped trees (a chain of nodes) and is natural for ordered variables (e.g. time series or geographic locations). Both have explicit density formulas and permit sequential MLE via the h-function.

## Overview

The density factorization of [[Pair Copula Construction and Regular Vines]] applies to any regular vine, but the general R-vine structure requires solving a combinatorial model selection problem over $(n-1)!/2$ possible vine structures. C-vines and D-vines fix the tree topology, reducing model selection to (i) ordering the variables (which is the root at each level, or which is the sequence in the path) and (ii) choosing the bivariate copula family at each edge. This makes them the standard workhorses of applied vine copula analysis, and the basis for the `CDVine` R package.

## Main Content

### C-vine (Canonical Vine)

> [!definition] C-vine structure
> In a **C-vine** on $n$ variables (ordered $1, 2, \ldots, n$), each tree $T_j$ is a **star**: there is one central node connected to all $n-j$ remaining nodes.
>
> - **Tree $T_1$:** Node $j=1$ is the root, connected to nodes $2, 3, \ldots, n$. Edges: $(1,2), (1,3), \ldots, (1,n)$ — these are $n-1$ unconditional pair-copulas.
> - **Tree $T_2$:** The root is now the edge $(1,2)$ from $T_1$. The conditioning set is $D = \{1\}$. Edges in $T_2$: $(1,3|2), (1,4|2), \ldots$ — wait, more precisely: the nodes of $T_2$ are the edges of $T_1$. The root of $T_2$ corresponds to the root edge $(1,2)$ in $T_1$. Then $T_2$ connects $(1,2)$ to $(1,3), (1,4), \ldots$ — by the proximity condition, edges in $T_2$ connect two nodes that share node $1$ in $T_1$. So $T_2$ has edges: $(2,3|1), (2,4|1), \ldots, (2,n|1)$, rooted at the variable at position $j=2$.
> - **General pattern:** Tree $T_j$ is rooted at variable $j$; its edges are $(j, j+i | 1, \ldots, j-1)$ for $i = 1, \ldots, n-j$.
^def-cvine

> [!theorem] C-vine density formula (Aas et al. 2009)
> For a C-vine with ordering $(1, 2, \ldots, n)$, the joint density is:
>
> $$\boxed{f(x_1,\ldots,x_n) = \prod_{k=1}^n f_k(x_k) \cdot \prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{j,\,j+i\mid 1,\ldots,j-1}\!\!\left(F(x_j\mid x_1,\ldots,x_{j-1}),\; F(x_{j+i}\mid x_1,\ldots,x_{j-1})\right)}$$
>
> **Outer product ($j$):** tree index, $j=1$ is the unconditional tree.
> **Inner product ($i$):** edges in tree $T_j$, i.e. pair-copulas in the $j$-th tree.
> **Notation:** $c_{j,j+i|1,\ldots,j-1}$ is the bivariate copula density for the pair $(X_j, X_{j+i})$ conditioned on $(X_1,\ldots,X_{j-1})$, evaluated at the conditional CDFs $F(x_j|x_1,\ldots,x_{j-1})$ and $F(x_{j+i}|x_1,\ldots,x_{j-1})$.
^thm-cvine-density

> [!definition] When to use a C-vine
> A C-vine is natural when **one variable dominates the dependence structure** — all other variables are primarily related to each other through their relationship with the root variable. Examples:
> - A **market index** vs. individual stocks: all stocks share a common market factor; given the index, stocks may be roughly conditionally independent. Root = index.
> - A **key macroeconomic variable** (GDP growth, exchange rate) that drives all others.
>
> Model selection for C-vines reduces to choosing the ordering of variables (which is the root at level 1, root at level 2, etc.). A heuristic: place the variable with the highest sum of pairwise Kendall's $\tau$ values at the root of $T_1$.
^def-cvine-use

---

### D-vine (Drawable Vine)

> [!definition] D-vine structure
> In a **D-vine** on $n$ variables (ordered $1, 2, \ldots, n$), each tree $T_j$ is a **path**: the nodes form a simple chain with no branching.
>
> - **Tree $T_1$:** A path $1 - 2 - 3 - \cdots - n$. Edges: $(1,2), (2,3), \ldots, (n-1,n)$ — these are $n-1$ unconditional pair-copulas between *adjacent* variables in the ordering.
> - **Tree $T_2$:** Nodes are the edges of $T_1$: $(1,2), (2,3), \ldots, (n-1,n)$. Connected in a path by proximity (sharing a common node from $T_1$): edges are $(1,3|2), (2,4|3), \ldots$ — pair-copulas between variables two steps apart in the original ordering, conditioned on the variable between them.
> - **General pattern:** Tree $T_j$ contains pair-copulas between variables $j$ steps apart in the ordering: $(i, i+j \mid i+1, \ldots, i+j-1)$ for $i=1,\ldots,n-j$.
^def-dvine

> [!theorem] D-vine density formula (Aas et al. 2009)
> For a D-vine with ordering $(1, 2, \ldots, n)$, the joint density is:
>
> $$\boxed{f(x_1,\ldots,x_n) = \prod_{k=1}^n f_k(x_k) \cdot \prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{i,\,i+j\mid i+1,\ldots,i+j-1}\!\!\left(F(x_i\mid x_{i+1},\ldots,x_{i+j-1}),\; F(x_{i+j}\mid x_{i+1},\ldots,x_{i+j-1})\right)}$$
>
> **Outer product ($j$):** "lag" index — $j=1$ pairs adjacent variables unconditionally, $j=2$ pairs variables two steps apart conditional on the one between them, etc.
> **Inner product ($i$):** which adjacent pair at that lag.
> **Conditioning set:** $\{i+1, \ldots, i+j-1\}$ — the $j-1$ variables "between" $i$ and $i+j$ in the ordering.
^thm-dvine-density

> [!definition] When to use a D-vine
> A D-vine is natural when variables have a **natural ordering** — temporal, spatial, or derived from a dimension reduction. Examples:
> - **Time series:** $X_1, \ldots, X_n$ are measurements at successive time points; lag-$j$ conditional dependence between $X_i$ and $X_{i+j}$ given the intervening observations mirrors serial correlation.
> - **Spatial data:** Variables ordered by geographic location; nearby variables are more strongly dependent.
> - **Quantile regression:** The D-vine copula is used in D-vine quantile regression (Kraus & Czado 2017) where the response is linked to covariates through a sequence of pair-copulas.
>
> Model selection reduces to choosing the variable ordering (permutation). A heuristic: order variables by maximum spanning tree of the Kendall's $\tau$ matrix, traversing the tree as a Hamiltonian path.
^def-dvine-use

---

### h-function: Conditional Distributions for Recursive Computation

> [!definition] h-function (Aas et al. 2009)
> Computing the conditional CDFs $F(x_k | x_D)$ required in the vine density formulas proceeds recursively using the **h-function** (also called the "conditional distribution function of a bivariate copula"):
>
> $$h(u \mid v;\, \theta) \;=\; F(X_k \leq x_k \mid X_j = x_j) \;=\; \frac{\partial C_{kj}(F_k(x_k),\, F_j(x_j);\, \theta)}{\partial F_j(x_j)}$$
>
> where $C_{kj}$ is the bivariate copula for the pair $(X_k, X_j)$ with parameter $\theta$, and $u = F_k(x_k)$, $v = F_j(x_j)$ are the marginal probability-integral-transform (PIT) values.
>
> **Closed forms for common copulas:**
>
> | Copula | $h(u|v;\theta)$ |
> |---|---|
> | Gaussian($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u)-\rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student's $t$($\rho,\nu$) | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{(1-\rho^2)(\nu+(t_\nu^{-1}(v))^2)/(\nu+1)}}\right)$ |
> | Clayton($\theta$) | $(u^{-\theta}+v^{-\theta}-1)^{-1-1/\theta}\cdot v^{-\theta-1}$ |
> | Gumbel($\theta$) | $C(u,v;\theta)/v \cdot \frac{(-\ln v)^{\theta-1}}{(-\ln u)^\theta+(-\ln v)^\theta}^{(\theta-1)/\theta}$  *(see code implementations for exact form)* |
>
> The h-function allows sequential computation: once all pair-copulas in tree $T_1$ are estimated, the h-function provides pseudo-observations $\hat{F}(x_i|x_j)$ for tree $T_2$, and so on up the vine.
^def-hfunction

> [!definition] Inverse h-function for simulation
> The **inverse h-function** $h^{-1}(v | w;\theta)$ solves $h(u|w;\theta) = v$ for $u$, i.e. the quantile function of $X_k$ given $X_j = x_j$. It enables vine copula simulation:
> 1. Draw $u_1, \ldots, u_n \sim \text{Uniform}(0,1)$ independently.
> 2. Set $x_1 = u_1$.
> 3. For $k = 2, \ldots, n$: apply inverse h-functions recursively to map the independent uniforms through the vine structure, respecting the conditioning.
> This inversion is available in closed form for the same families listed above.
^def-hinverse

## Examples

> [!example] 3-variable C-vine and D-vine (explicit)
> **Variables:** $X_1$ = S&P 500 returns, $X_2$ = Apple returns, $X_3$ = Microsoft returns.
>
> **C-vine rooted at $X_1$:**
> - $T_1$: $(X_1, X_2)$ and $(X_1, X_3)$ — both modelled with Clayton (lower tail dependence for crash risk).
> - $T_2$: $(X_2, X_3 | X_1)$ — conditional on the market index, use Gaussian (nearly independent residuals).
> - Density: $f_1 f_2 f_3 \cdot c_{12}(F_1,F_2) \cdot c_{13}(F_1,F_3) \cdot c_{23|1}(F(x_2|x_1),F(x_3|x_1))$
>
> **D-vine with ordering $X_1 - X_2 - X_3$:**
> - $T_1$: $(X_1,X_2)$ and $(X_2,X_3)$ — adjacent pair copulas.
> - $T_2$: $(X_1, X_3 | X_2)$ — conditional on Apple, what's left?
> - Density: $f_1 f_2 f_3 \cdot c_{12}(F_1,F_2) \cdot c_{23}(F_2,F_3) \cdot c_{13|2}(F(x_1|x_2),F(x_3|x_2))$
>
> **Result:** The C-vine assigns the market index a hub role; the D-vine treats Apple as the intermediary. Both give valid models but different economic interpretations. Model selection (see [[Vine Copula Estimation and Model Selection]]) would typically prefer the C-vine for these equity returns.

## Connections

- [[Vine Copulas - Overview]] — motivation and comparison with factor copulas.
- [[Pair Copula Construction and Regular Vines]] — the general R-vine framework from which C- and D-vines are special cases.
- [[Vine Copula Estimation and Model Selection]] — sequential MLE using h-functions, and the Dissmann algorithm for R-vine structure selection (which may select C- or D-vine as a special case).
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used to select variable ordering for C- and D-vines.
- [[Factor Copulas - Overview]] — the high-dimensional alternative that avoids the ordering choice problem by using a latent factor structure.

## See Also

- [[../_Index|Dependence Modeling]]
