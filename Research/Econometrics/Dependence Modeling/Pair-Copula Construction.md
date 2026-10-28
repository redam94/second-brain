---
title: Pair-Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/aas2009-pair-copula-constructions.md]]"
source_location: "Sec. 2, pp. 184–189"
date_ingested: 2026-10-28
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[R-Vine Matrices and Truncated Vines]]"
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - h-function
  - h-function recursion
  - conditional copula
  - pair-copula density
---

# Pair-Copula Construction

> [!summary]
> The pair-copula construction rewrites the joint density by conditioning variables one at a time, producing a factorization into marginal densities and bivariate conditional copulas. The key computational object is the **h-function** $h(x|v)$, which gives the conditional CDF $F(x|v)$ as a partial derivative of a bivariate copula. All conditional distributions in the vine are computed recursively via h-functions, so the entire joint density can be evaluated in $O(d^2)$ bivariate copula calls.

## Overview

Sklar's theorem decomposes a bivariate joint density as
$$f(x_1, x_2) = f_1(x_1) \cdot f_2(x_2) \cdot c_{12}(F_1(x_1), F_2(x_2)).$$
Extending to three variables by iterated conditioning gives three possible orderings. Choosing order $(1, 2, 3)$:
$$f(x_1, x_2, x_3) = f_1 \cdot f_2 \cdot f_3 \cdot c_{12}(F_1, F_2) \cdot c_{13}(F_1, F_3) \cdot c_{23|1}(F(x_2|x_1), F(x_3|x_1)).$$

The last term involves the **conditional pair-copula** $c_{23|1}$, which requires evaluating $F(x_2|x_1)$ and $F(x_3|x_1)$ — the h-functions.

## Main Content

> [!definition] The h-Function
> For a bivariate copula $C_{12}$ with density $c_{12}$, define
> $$h(x \mid v;\, \theta_{12}) \;=\; F(x \mid v) \;=\; \frac{\partial C_{12}(F_1(x),\, F_2(v);\, \theta_{12})}{\partial F_2(v)},$$
> where $\theta_{12}$ are the copula parameters. The h-function outputs a conditional CDF $F(x|v) \in [0,1]$ suitable as an argument to the next bivariate copula in the cascade.
>
> **Key property:** Once computed, $h(x|v)$ is uniform on $[0,1]$ if the copula is correctly specified, so subsequent pair-copulas always receive uniform arguments.
>
> **Notation note:** Aas et al. write $h(x|v, \theta)$ for the forward direction and $h^{-1}(x|v, \theta)$ for simulation (quantile function).
^h-function

> [!definition] h-Function for Common Families
> | Copula family | $h(x \mid v; \theta)$ |
> |---|---|
> | **Gaussian** $C_\rho$ | $\Phi\!\left(\frac{\Phi^{-1}(x) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | **Student-$t$** $C_{\nu,\rho}$ | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(x) - \rho\, t_\nu^{-1}(v)}{\sqrt{\frac{(\nu + t_\nu^{-1}(v)^2)(1-\rho^2)}{\nu+1}}}\right)$ |
> | **Clayton** $C_\theta$ ($\theta>0$) | $(1 + \theta)\,v^{-\theta-1}\,C_\theta(u,v)\,/ \ldots$ (closed form via partial derivative) |
> | **Gumbel** $C_\theta$ | $C_\theta(u,v)\,\frac{(-\ln v)^{\theta-1}}{v\,[(-\ln u)^\theta + (-\ln v)^\theta]^{1-1/\theta}}$ |
^h-function-families

> [!definition] Recursive h-Function Evaluation
> For the conditional distribution $F(x_j | x_{i_1}, \ldots, x_{i_m})$, use the recursion:
> $$F(x_j | x_{i_1}, \ldots, x_{i_m}) = h\!\left(F(x_j | x_{i_1}, \ldots, x_{i_{m-1}})\;\Big|\; F(x_{i_m} | x_{i_1}, \ldots, x_{i_{m-1}});\; \theta_{j, i_m | i_1, \ldots, i_{m-1}}\right)$$
>
> This reduces each new h-function evaluation to previously computed conditional CDFs. The tree structure of the vine specifies exactly which h-functions are needed and in what order.
^h-recursion

### Trivariate Example (Full Derivation)

> [!example] Three-Variable PCC
> **Setup:** Random vector $(X_1, X_2, X_3)$, with continuous marginals $F_1, F_2, F_3$.
>
> **Factorization (D-vine ordering 1–2–3):**
> $$f(x_1, x_2, x_3) = f_1(x_1)\, f_2(x_2)\, f_3(x_3)$$
> $$\times\; c_{12}\!\bigl(F_1(x_1), F_2(x_2)\bigr)$$
> $$\times\; c_{23}\!\bigl(F_2(x_2), F_3(x_3)\bigr)$$
> $$\times\; c_{13|2}\!\left(h(x_1|x_2;\, \theta_{12}),\; h(x_3|x_2;\, \theta_{23});\; \theta_{13|2}\right)$$
>
> where the last line uses the conditional copula for $(X_1, X_3)$ given $X_2$.
>
> **Interpretation:** The three pair-copulas capture: (1) the dependence of variables 1 and 2, (2) the dependence of variables 2 and 3, and (3) the *residual* dependence of 1 and 3 after removing the effect of 2. The conditioning set $\{2\}$ ensures the construction is non-redundant.
>
> **Alternative factorizations:** The same joint density admits $d! = 6$ factorizations, corresponding to different orderings. All valid, but yield different vine structures — the vine structure must be selected.
^trivariate-example

### Simulation from a PCC

Simulate $(X_1, \ldots, X_d)$ from a PCC by inverting the h-functions:
1. Draw $(U_1, \ldots, U_d) \sim \text{Uniform}[0,1]^d$ independently.
2. Set $X_1 = U_1$.
3. For $k = 2, \ldots, d$: compute $X_k$ by sequentially applying $h^{-1}$ functions in reverse tree order.

The inverse h-function $h^{-1}(\cdot | v; \theta)$ can be computed by numerical inversion (bisection) for most copula families; closed-form inverses exist for the Gaussian and some Archimedean copulas.

## Connections

- [[Vine Copulas - Overview]] — the motivating framework; this note provides the computational machinery.
- [[C-Vine and D-Vine Structures]] — specific vine architectures that determine which h-functions are computed.
- [[R-Vine Matrices and Truncated Vines]] — the general R-vine matrix encodes the complete recursive evaluation order.
- [[Vine Copula Estimation and Selection]] — h-functions are the key objects in the sequential MLE log-likelihood.
- [[Dependence Measures for Copulas]] — tail dependence of the assembled joint distribution follows from each pair-copula family's tail behaviour.

## See Also

- [[Copula Estimation]] — Bayesian Gaussian copula: a single bivariate copula rather than a recursive construction.
- [[Factor Copula Construction]] — the alternative: latent-variable construction vs. iterative conditioning.
- [[../_Index|Econometrics]]
