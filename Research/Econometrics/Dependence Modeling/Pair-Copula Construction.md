---
title: Pair-Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Synthesis-Survey.md]]"
source_location: "Sec. 2–3; Aas et al. (2009) §2; Czado (2010) §2–3"
date_ingested: 2026-07-29
date_updated: 2026-07-29
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula Estimation and Selection]]"
aliases:
  - h-function
  - conditional copula
  - Rosenblatt transform copula
  - PCC
---

# Pair-Copula Construction

> [!summary]
> The pair-copula construction is built on two primitives: (1) Sklar's bivariate decomposition of any joint density into marginals times a copula density; (2) the **h-function** — the conditional CDF derived from a bivariate copula — which recursively converts joint observations into conditional uniform variables for the next tree. Together these make the vine density formula computable and the sequential estimation algorithm feasible.

## Overview

The vine copula decomposes a $d$-dimensional density into $d(d-1)/2$ bivariate copula densities by repeatedly conditioning. At each step, the conditional CDF of one variable given others is computed via the **h-function** of the pair copula that links them. The h-function is the engine of vine copulas: it is used in density evaluation (forward pass), in sampling (inverse h-function, backward pass), and in sequential estimation (computing pseudo-observations for subsequent trees).

## Main Content

### Bivariate building block

> [!definition] Conditional CDF from a bivariate copula (h-function)
> Let $C_{12}(u_1, u_2; \theta)$ be a bivariate copula with parameter $\theta$. The **h-function** is:
> $$h_{1|2}(u_1, u_2; \theta) \equiv F(X_1 \leq F_1^{-1}(u_1) \mid X_2 = F_2^{-1}(u_2))
> = \frac{\partial C_{12}(u_1, u_2; \theta)}{\partial u_2}$$
> where $u_j = F_j(x_j) \in (0,1)$ are the probability-integral-transform (PIT) values of the marginals.
>
> Symmetrically: $h_{2|1}(u_2, u_1; \theta) = \partial C_{12}(u_1,u_2;\theta)/\partial u_1$.
>
> **Properties:**
> - $h_{1|2}(\cdot, u_2; \theta)$ is a valid CDF on $(0,1)$ for each fixed $u_2$
> - Under the independence copula: $h_{1|2}(u_1, u_2) = u_1$
> - Under the Gaussian copula $C_\rho$: $h_{1|2}(u_1,u_2;\rho) = \Phi\!\left(\dfrac{\Phi^{-1}(u_1)-\rho\Phi^{-1}(u_2)}{\sqrt{1-\rho^2}}\right)$
> - Under Clayton($\theta$): $h_{1|2}(u_1,u_2;\theta) = u_2^{-\theta-1}(u_1^{-\theta}+u_2^{-\theta}-1)^{-1/\theta-1}$
^def-hfunction

> [!definition] Recursion for conditional distributions across trees
> Let $D \subset \{1,\ldots,d\}$ be a conditioning set and $j \notin D$, $k \notin D$. The conditional CDF at tree level $|D|+1$ is obtained via the h-function of the pair copula one tree above:
> $$F(x_j | x_{k}, x_D) = h_{j|k,D}(F(x_j|x_D), F(x_k|x_D);\, \theta_{jk|D})$$
> This is the **simplifying assumption** in computational form: the pair copula $C_{jk|D}$ depends on $D$ only through the conditioning set, not the conditioning values $x_D$. Under this assumption, the right-hand side requires only the conditional CDFs $F(x_j|x_D)$ and $F(x_k|x_D)$, which are themselves computed by h-functions from the previous tree level.
>
> **Consequence:** Starting from observed PIT values $u_j = F_j(x_j)$ at tree 0, every conditional CDF at every subsequent tree level can be computed by a sequence of h-function evaluations.
^def-recursion

### Density formula from the recursion

> [!definition] Pair-copula product density (Aas et al. 2009, Eq. 4)
> The pair-copula construction for d=3 with D-vine ordering (1,2,3) gives:
> $$f(x_1,x_2,x_3) = f_1(x_1)\cdot f_2(x_2)\cdot f_3(x_3)
> \cdot c_{12}(u_1,u_2;\theta_{12})
> \cdot c_{23}(u_2,u_3;\theta_{23})
> \cdot c_{13|2}(h_{1|2}(u_1,u_2;\theta_{12}),\, h_{3|2}(u_3,u_2;\theta_{23});\, \theta_{13|2})$$
> where $u_j = F_j(x_j)$, $h_{1|2}(u_1,u_2)$ is the conditional PIT of $X_1$ given $X_2$, and $h_{3|2}(u_3,u_2)$ is the conditional PIT of $X_3$ given $X_2$.
>
> For general $d$ and a vine structure $V$, the density is the product of all $d(d-1)/2$ pair copula densities over all $d-1$ trees (see [[Vine Copulas - Overview]]^def-pcc).
^def-density

> [!theorem] Existence and uniqueness of the PCC (Aas et al. 2009, Prop. 1)
> For any regular vine $V$ on $d$ variables and any choice of $d(d-1)/2$ bivariate copula families (one per edge), the product formula defines a valid $d$-dimensional density. Under the simplifying assumption, the correspondence between joint distributions and vine copulas is one-to-one (given fixed marginals and vine structure).
^thm-existence

### H-functions for common copula families

| Copula | Parameters | $h_{1|2}(u_1, u_2;\theta)$ |
|--------|-----------|---------------------------|
| Independence | — | $u_1$ |
| Gaussian | $\rho \in (-1,1)$ | $\Phi\!\left(\dfrac{\Phi^{-1}(u_1) - \rho\Phi^{-1}(u_2)}{\sqrt{1-\rho^2}}\right)$ |
| Student $t$ | $\rho,\nu$ | $t_{\nu+1}\!\!\left(\dfrac{t_\nu^{-1}(u_1) - \rho\, t_\nu^{-1}(u_2)}{\sqrt{((\nu+(t_\nu^{-1}(u_2))^2)(1-\rho^2))/(\nu+1)}}\right)$ |
| Clayton | $\theta > 0$ | $u_2^{-\theta-1}(u_1^{-\theta}+u_2^{-\theta}-1)^{-1/\theta-1}$ |
| Gumbel | $\theta \geq 1$ | $C_G(u_1,u_2) \cdot \frac{(-\log u_2)^{\theta-1}}{u_2\cdot(-\log C_G)^{1-1/\theta}\cdot (-\log u_1 \cdot (-\log u_2))^{1-1/\theta}}$ (simplified form) |

## Examples

> [!example] D-vine density for $d=4$ step-by-step (Aas et al. 2009, Example 1)
> **Setup:** Variables $X_1,X_2,X_3,X_4$ in D-vine order. Denote $u_j = F_j(x_j)$.
>
> **Tree 1 pseudo-observations** (after fitting $c_{12},c_{23},c_{34}$):
> - $v_{1|2} = h_{1|2}(u_1, u_2;\hat\theta_{12})$ — conditional PIT of $X_1$ given $X_2$
> - $v_{2|1} = h_{2|1}(u_2, u_1;\hat\theta_{12})$ — conditional PIT of $X_2$ given $X_1$
> - $v_{2|3} = h_{2|3}(u_2, u_3;\hat\theta_{23})$, $v_{3|2} = h_{3|2}(u_3, u_2;\hat\theta_{23})$
> - $v_{3|4} = h_{3|4}(u_3, u_4;\hat\theta_{34})$, $v_{4|3} = h_{4|3}(u_4, u_3;\hat\theta_{34})$
>
> **Tree 2 input pairs:**
> - Edge $\{1,3|2\}$: $(v_{1|2}, v_{3|2})$ — these are the pseudo-uniform arguments for $c_{13|2}$
> - Edge $\{2,4|3\}$: $(v_{2|3}, v_{4|3})$ — arguments for $c_{24|3}$
>
> **Tree 2 pseudo-observations** (after fitting $c_{13|2}, c_{24|3}$):
> - $v_{1|23} = h_{1|3,2}(v_{1|2}, v_{3|2};\hat\theta_{13|2})$
> - $v_{4|23} = h_{4|2,3}(v_{4|3}, v_{2|3};\hat\theta_{24|3})$
>
> **Tree 3:** One pair copula $c_{14|23}$ fitted to $(v_{1|23}, v_{4|23})$.
>
> **Total log-likelihood:**
> $$\ell = \underbrace{\sum_t \log c_{12}(u_{t1},u_{t2}) + \log c_{23}(u_{t2},u_{t3}) + \log c_{34}(u_{t3},u_{t4})}_{T_1}$$
> $$+ \underbrace{\sum_t \log c_{13|2}(v_{t,1|2},v_{t,3|2}) + \log c_{24|3}(v_{t,2|3},v_{t,4|3})}_{T_2}$$
> $$+ \underbrace{\sum_t \log c_{14|23}(v_{t,1|23},v_{t,4|23})}_{T_3}$$
^ex-d4-density

> [!example] Sampling from a D-vine (Rosenblatt transform inverse)
> To simulate $(X_1,\ldots,X_d)$ from a D-vine:
>
> 1. Draw $u_1,\ldots,u_d \sim U(0,1)$ independently.
> 2. Set $x_1 = F_1^{-1}(u_1)$ (already done: $u_1$ is uniform).
> 3. Set $u_2' = h_{2|1}^{-1}(u_2; u_1, \hat\theta_{12})$ — invert h-function numerically (bisection on $[0,1]$); set $x_2 = F_2^{-1}(u_2')$.
> 4. For $x_3$: compute $v_{1|2} = h_{1|2}(u_1, u_2')$; then find $u_3'$ such that $h_{3|2,1}^{-1}$ applied to $u_3$ (via two h-function calls) gives $x_3 = F_3^{-1}(u_3')$.
> 5. Continue recursively: each subsequent variable requires applying a cascade of h-functions and then inverting.
>
> **Computational note:** Inverse h-functions have no closed form for most copula families; one-dimensional numerical inversion is required per variable. The cost is $O(d^2)$ h-function evaluations per sample.
^ex-sampling

## Connections

- [[Vine Copulas - Overview]] — the overarching framework and vine tree definition
- [[C-Vine and D-Vine Structures]] — how the h-function recursion specialises to star (C-vine) and path (D-vine) trees
- [[Vine Copula Estimation and Selection]] — the sequential MLE algorithm that uses these h-function pseudo-observations
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence are functions of the pair copula parameters used here

## See Also

- [[Factor Copula Construction]] — the competing latent-factor construction; compare the h-function recursion with the factor model simulation
- [[Bayesian Copula Estimation]] — Gaussian copula with LKJ prior; the h-function here corresponds to the partial correlation parameterisation
- [[SMM Estimator for Copulas]] — SMM using rank-correlation and quantile moments; vine copulas use sequential MLE instead
- [[../_Index|Dependence Modeling]]
