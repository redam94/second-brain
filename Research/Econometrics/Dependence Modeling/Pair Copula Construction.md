---
title: "Pair Copula Construction"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/definition
  - doc/paper
source: "[[raw/Aas-2009-Pair-Copula-Constructions-stub.md]]"
source_location: "Aas et al. (2009), Secs. 2–4, pp. 2–12"
date_ingested: 2026-10-13
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[R-Vine and Structure Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - pair copula
  - PCC density
  - C-vine density
  - D-vine density
  - conditional distribution function vine
---

# Pair Copula Construction

> [!summary]
> A pair-copula construction (PCC) decomposes an $n$-dimensional density into $n$ marginals and $\binom{n}{2}$ bivariate copula densities (pair copulas). Each pair copula acts on two conditional CDF values, computed via the **h-function** recursion introduced by Aas et al. (2009). C-vines (star structure per tree) and D-vines (path structure per tree) are the two canonical tree arrangements; the general case is the R-vine (see [[R-Vine and Structure Selection]]). Maximum-likelihood estimation proceeds sequentially, using pseudo-observations constructed from the h-function.

## Overview

The key insight of the pair-copula construction (PCC) is that any multivariate density can be written as a product of marginals times bivariate copulas — provided that the bivariate copulas act not just on raw variables but on **conditional CDF** values. The conditioning structure is determined by the vine tree sequence. This note derives the density formulas for C-vines and D-vines explicitly and defines the h-function used to compute the conditional CDFs needed for both density evaluation and sequential ML estimation.

## Main Content

### Key building block: the h-function

> [!definition] The h-function (Aas et al. 2009)
> Let $C_{XY}$ be the bivariate copula for $(X, Y)$ with joint CDF $C_{XY}(u, v)$ where $u = F_X(x)$, $v = F_Y(y)$. The **h-function** is the conditional CDF of $X$ given $Y = y$, expressed in the copula scale:
> $$h(u \mid v;\, \boldsymbol{\theta}) = \frac{\partial C_{XY}(u, v;\, \boldsymbol{\theta})}{\partial v} = F_{X|Y}\bigl(F_X^{-1}(u) \mid F_Y^{-1}(v)\bigr)$$
> This is the key computational primitive: $h(F_X(x) \mid F_Y(y))$ gives the conditional CDF of $X$ given $Y=y$, computed entirely in the copula domain. For conditional CDF $F(x_i | x_j)$, use $h(F_i(x_i) \mid F_j(x_j); \boldsymbol{\theta}_{ij})$. The h-function is computable in closed form for all standard parametric copula families (Gaussian, $t$, Clayton, Gumbel, Frank, Joe).
^def-h-function

> [!example] h-function for the Gaussian copula
> For the bivariate Gaussian copula with correlation $\rho$:
> $$h(u \mid v;\, \rho) = \Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$$
> where $\Phi$ is the standard normal CDF. This is simply the normal CDF of the standardized residual after partialling out $v$'s contribution via correlation $\rho$.

### C-vine density

> [!definition] C-vine density (n variables)
> Order variables $1, 2, \ldots, n$. Define the root order: variable $j_k$ is the root of tree $T_k$. For a **C-vine** with $X_1$ as root of $T_1$, $X_2$ (conditional on $X_1$) as root of $T_2$, etc., the joint density is:
> $$f(x_1, \ldots, x_n) = \prod_{k=1}^n f_k(x_k) \cdot \prod_{j=1}^{n-1} \prod_{i=j+1}^{n} c_{j,i|\,1,\ldots,j-1}\!\bigl(F(x_j | x_1,\ldots,x_{j-1}),\, F(x_i | x_1,\ldots,x_{j-1})\bigr)$$
> where the pair copula $c_{j,i|1:\,j-1}$ is evaluated at the **conditional CDFs** of $X_j$ and $X_i$ given $X_1,\ldots,X_{j-1}$. These conditional CDFs are computed recursively via the h-function.
>
> **For $n=4$ and root order $(X_1, X_2, X_3)$:**
> $$f = f_1 f_2 f_3 f_4 \cdot \underbrace{c_{12} c_{13} c_{14}}_{T_1} \cdot \underbrace{c_{23|1} c_{24|1}}_{T_2} \cdot \underbrace{c_{34|12}}_{T_3}$$
> where arguments are: $c_{12}(F_1, F_2)$; $c_{13}(F_1, F_3)$; $c_{14}(F_1, F_4)$; $c_{23|1}(h(F_2|F_1), h(F_3|F_1))$; $c_{24|1}(h(F_2|F_1), h(F_4|F_1))$; $c_{34|12}(h(F_3|F_1,F_2), h(F_4|F_1,F_2))$.
^def-cvine

### D-vine density

> [!definition] D-vine density (n variables)
> Order variables along a path: $1 - 2 - 3 - \cdots - n$. The joint density is:
> $$f(x_1, \ldots, x_n) = \prod_{k=1}^n f_k(x_k) \cdot \prod_{j=1}^{n-1} \prod_{i=1}^{n-j} c_{i,i+j|\,i+1,\ldots,i+j-1}\!\bigl(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\, F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\bigr)$$
> Tree $T_1$ links consecutive pairs: $c_{12}, c_{23}, \ldots, c_{n-1,n}$. Tree $T_2$ links pairs separated by one: $c_{13|2}, c_{24|3}, \ldots$. Each tree links pairs separated by one more step, conditioned on everything in between.
>
> **For $n=4$:**
> $$f = f_1 f_2 f_3 f_4 \cdot \underbrace{c_{12} c_{23} c_{34}}_{T_1} \cdot \underbrace{c_{13|2} c_{24|3}}_{T_2} \cdot \underbrace{c_{14|23}}_{T_3}$$
^def-dvine

### Sequential h-function recursion

> [!definition] Recursive conditional CDF computation
> To evaluate the D-vine density at tree $T_j$, one needs the conditional CDFs $F(x_i|x_{i+1}, \ldots, x_{i+j-1})$ and $F(x_{i+j}|x_{i+1}, \ldots, x_{i+j-1})$. These are computed recursively:
>
> Starting from observed values, for a D-vine with conditioning set $\mathbf{d}$:
> $$F(x_i | x_{i+1}, \ldots, x_{i+j-1}) = h\bigl(F(x_i|x_{i+1},\ldots,x_{i+j-2})\,\big|\, F(x_{i+j-1}|x_{i+1},\ldots,x_{i+j-2});\;\boldsymbol{\theta}_{i,i+j-1|i+1:\,i+j-2}\bigr)$$
>
> The recursion uses previously computed conditional CDFs as inputs to the h-function of the pair copula at the previous tree level. This is the key computational primitive that makes sequential ML estimation feasible.
^def-recursion

### ML Estimation

> [!definition] Sequential ML estimation (Aas et al. 2009)
> Because the log-likelihood separates across trees (given the simplifying assumption), estimation proceeds tree-by-tree:
>
> **Tree $T_1$:** Estimate pair-copula parameters $\hat{\boldsymbol{\theta}}_{ij}$ for each edge $(i,j)$ from observed pseudo-observations $(F_i(x_i), F_j(x_j))$ using standard bivariate ML. Compute h-function outputs: $\hat{u}_{i|j} = h(\hat{F}_i | \hat{F}_j; \hat{\boldsymbol{\theta}}_{ij})$ for each edge.
>
> **Tree $T_k$ ($k \geq 2$):** Use the outputs from tree $T_{k-1}$ as pseudo-observations. Estimate pair-copula parameters for the new conditional pairs. Compute h-functions again as inputs for tree $T_{k+1}$.
>
> The full likelihood decomposes as:
> $$\ell(\boldsymbol{\theta}) = \sum_{k=1}^{n-1} \sum_{\text{edges at }T_k} \ell_{e,k}(\boldsymbol{\theta}_e)$$
> Sequential estimation fixes earlier tree parameters before estimating later ones — this is efficient but ignores across-tree parameter uncertainty. Full joint ML is available by treating the entire decomposition as one likelihood.
^def-estimation

## Examples

> [!example] Fitting a trivariate t-copula vine (Aas et al. 2009)
> **Setup:** Three financial log-returns $(X_1, X_2, X_3)$ with Student's $t$ margins. Fit a D-vine with order $X_1$-$X_2$-$X_3$.
>
> **Step 1:** Fit bivariate $t$-copulas to the pairs $(X_1, X_2)$ and $(X_2, X_3)$ → parameters $(\rho_{12}, \nu_{12})$, $(\rho_{23}, \nu_{23})$. Compute: $u_{1|2} = h(F_1(x_1)|F_2(x_2); \rho_{12}, \nu_{12})$ and $u_{3|2} = h(F_3(x_3)|F_2(x_2); \rho_{23}, \nu_{23})$.
>
> **Step 2:** Fit a bivariate copula (any family!) to the pseudo-pairs $(u_{1|2}, u_{3|2})$ to obtain $c_{13|2}$.
>
> **Key flexibility:** The pair copula $c_{13|2}$ need not be the same family as $c_{12}$ or $c_{23}$ — the vine uses a *different* copula family at each tree level if the data suggest it. A Gaussian copula for the conditional pair is common even when the marginal pairs are $t$-distributed.

## Connections

- [[Vine Copulas - Overview]] — motivation, history, and C-vine vs D-vine intuition.
- [[R-Vine and Structure Selection]] — the general R-vine density and structure selection via spanning trees.
- [[Copula Architecture Comparison]] — factor copulas vs. vine copulas: degrees of freedom, scalability, interpretability.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence as model diagnostics.
- [[SMM Estimation of Factor Copulas]] — estimation of the competing factor copula class (compare: factor copula uses SMM; vine copula uses ML).

## See Also

- [[Factor Copula Construction]] — the latent-variable alternative that requires fewer parameter choices.
- [[Copula Estimation]] — Bayesian bivariate Gaussian copula; vine ML estimation is the frequentist analog for multivariate data.
- [[Econometrics/Dependence Modeling/_Index|Dependence Modeling]]
