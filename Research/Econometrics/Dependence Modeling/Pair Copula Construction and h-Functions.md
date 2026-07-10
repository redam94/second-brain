---
title: Pair Copula Construction and h-Functions
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copula-Synthesis-Survey.md]]"
source_location: "Aas et al. (2009) §2–3; Czado & Nagler (2022) §2.2"
date_ingested: 2026-07-10
date_updated: 2026-07-10
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Dependence Measures for Copulas]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Regular Vine Copulae and Structure Selection]]"
aliases:
  - PCC
  - h-function
  - conditional CDF copula
  - pair copula construction
---

# Pair Copula Construction and h-Functions

> [!summary]
> A vine copula density is a product of bivariate copula densities. Computing the *conditional* pair copulas at higher tree levels requires conditional CDFs $F(x_i|\mathbf{x}_D)$. These are computed recursively via **h-functions** — partial derivatives of bivariate copulas. Sequential MLE estimates pair copulas tree-by-tree, propagating h-function pseudo-observations upward.

## Overview

The pair copula construction (PCC) decomposes the joint density into marginal densities and bivariate copula densities. Unconditional pairs (tree $T_1$) are straightforward. Conditional pairs (trees $T_2, T_3, \ldots$) require computing the conditional CDFs $F(x_i|x_j)$, $F(x_i|x_j, x_k)$, etc. — the inputs to the higher-tree pair copulas. These are the **h-functions** (also called conditional distribution functions or Rosenblatt transforms in this context). The recursive computation of h-functions is the central algorithmic machinery of vine copula estimation.

## Main Content

> [!definition] The h-function
> For a bivariate copula $C_{ij}(u_i, u_j;\,\boldsymbol{\theta})$ with $u_i = F_i(x_i)$, $u_j = F_j(x_j)$, the **h-function** (conditional CDF of $X_i$ given $X_j = x_j$) is:
> $$h(u_i \mid u_j;\,\boldsymbol{\theta}) = F(x_i \mid x_j) = \frac{\partial C_{ij}(u_i, u_j;\,\boldsymbol{\theta})}{\partial u_j}$$
> This is the partial derivative of the bivariate copula with respect to its second argument. For standard bivariate copula families, $h$ is available in closed form:
>
> | Copula $C_{ij}$ | $h(u_i|u_j;\,\theta)$ |
> |---|---|
> | Normal($\rho$) | $\Phi\!\left(\dfrac{\Phi^{-1}(u_i) - \rho\,\Phi^{-1}(u_j)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t$($\rho,\nu$) | $t_{\nu+1}\!\left(\dfrac{t_\nu^{-1}(u_i)-\rho\,t_\nu^{-1}(u_j)}{\sqrt{\frac{(1-\rho^2)(\nu+t_\nu^{-1}(u_j)^2)}{\nu+1}}}\right)$ |
> | Clayton($\theta$) | $u_j^{-\theta-1}\left(u_i^{-\theta}+u_j^{-\theta}-1\right)^{-1-1/\theta}$ |
>
> Note: $h(u_i|u_j)$ and $h(u_j|u_i)$ are distinct (the derivative with respect to the *other* argument) — both are needed for recursive computation.
^def-hfun

> [!definition] Recursive computation of conditional pseudo-observations
> In a vine copula, the pseudo-observations for higher-tree pair copulas are computed recursively using h-functions. For the D-vine ordering $x_1\!-\!x_2\!-\!\cdots\!-\!x_d$:
>
> **Tree $T_1$** (unconditional pairs): use raw pseudo-observations $v_{i,i+1} = F_i(x_i)$.
>
> **Tree $T_2$ upward** (conditional pairs): the pseudo-observations entering edge $(i, i+j \mid i+1, \ldots, i+j-1)$ in tree $T_j$ are:
> $$v_{i|i+1,\ldots,i+j-1} = h(v_{i|i+1,\ldots,i+j-2} \mid v_{i+j-1|i+1,\ldots,i+j-2};\;\hat{\boldsymbol{\theta}}_{i,i+j-1|i+1,\ldots,i+j-2})$$
> In other words, each new pseudo-observation is an h-function of two pseudo-observations from the previous tree.
>
> This recursion propagates *up* the vine trees: estimating each new tree requires the h-function outputs from the tree below it.
^def-recursion

> [!definition] Sequential MLE estimation
> Under the simplifying assumption, vine copulas are estimated tree-by-tree:
> 1. **Marginals**: Fit $F_i$ to each margin (parametric, or empirically via ranks $u_i = r_i/(n+1)$).
> 2. **Tree $T_1$**: For each edge $(i,j)\in E_1$, maximise the log-likelihood $\sum_t \log c_{ij}(u_{i,t}, u_{j,t};\,\boldsymbol{\theta}_{ij})$ to get $\hat{\boldsymbol{\theta}}_{ij}$. Select copula family by AIC or BIC.
> 3. **Propagate**: Compute pseudo-observations for $T_2$ using $\hat{\boldsymbol{\theta}}_{ij}$ from $T_1$ edges: $\hat{v}_{i|j,t} = h(u_{i,t}|u_{j,t};\,\hat{\boldsymbol{\theta}}_{ij})$.
> 4. **Tree $T_2$**: Estimate pair copulas on the propagated pseudo-observations; select families.
> 5. Repeat for $T_3, \ldots, T_{d-1}$.
>
> This sequential MLE is **consistent** for each pair copula (under correct specification) and **fast** — it decomposes a $d(d-1)/2$-parameter optimisation into $d-1$ small-scale MLE problems, each in 1–3 parameters.
>
> **Efficiency loss**: Because each tree's estimation ignores uncertainty in the h-function pseudo-observations from lower trees, sequential MLE is not fully efficient. Full joint MLE refines the sequential estimate by joint optimisation over all $d(d-1)/2$ pair copulas simultaneously, but requires numerical likelihood evaluation at each iteration.
^def-seqmle

> [!definition] Available pair copula families
> Each edge in the vine can take a different bivariate copula family. Standard libraries (VineCopula R; pyvinecopulib Python) include:
>
> | Family | Parameter | Tail dep. | Asymmetry |
> |---|---|---|---|
> | Gaussian | $\rho \in (-1,1)$ | None | Symmetric |
> | Student-$t$ | $\rho, \nu > 0$ | $\tau^U = \tau^L > 0$ | Symmetric |
> | Clayton | $\theta > 0$ | Lower only | Lower |
> | Gumbel | $\theta \geq 1$ | Upper only | Upper |
> | Frank | $\theta \neq 0$ | None | Symmetric |
> | Joe | $\theta \geq 1$ | Upper only | Upper |
> | BB1 | $\theta > 0, \delta \geq 1$ | Both | Both |
> | BB7 | $\theta \geq 1, \delta > 0$ | Both | Both |
> | Independence | — | None | — |
>
> Mixed family selection — Clayton at one edge, Gumbel at another — is a key strength of vine copulas over factor copulas (which impose a single factor distribution).
^def-families

## Examples

> [!example] h-function computation for the Gaussian copula
> **Setup:** Bivariate Gaussian copula with $\rho = 0.6$. Observed pseudo-observations $u_1 = 0.3$, $u_2 = 0.7$ (uniform margins via probability integral transform).
>
> **Compute $h(u_1|u_2;\,\rho=0.6)$:**
> $$h(0.3 \mid 0.7;\, 0.6) = \Phi\!\left(\frac{\Phi^{-1}(0.3) - 0.6\cdot\Phi^{-1}(0.7)}{\sqrt{1 - 0.6^2}}\right)$$
> $$= \Phi\!\left(\frac{-0.524 - 0.6 \times 0.524}{\sqrt{0.64}}\right) = \Phi\!\left(\frac{-0.838}{0.8}\right) = \Phi(-1.048) \approx 0.148$$
>
> **Interpretation:** Given that $X_2$ is at its 70th percentile ($u_2 = 0.7$), the conditional distribution of $X_1$ places only 14.8% probability below its 30th percentile — less than the unconditional 30%, reflecting the positive dependence ($\rho = 0.6$).
>
> **Use in vine:** $0.148$ becomes the pseudo-observation for the tree-2 pair copula that includes $X_1$ in its conditioning set.

> [!example] Sequential MLE: 4-variable D-vine
> **Setup:** 4 financial time series $(X_1, X_2, X_3, X_4)$, D-vine ordering 1-2-3-4. T=500 observations, 4-1=3 trees, 6=4·3/2 pair copulas.
>
> **Tree 1** (3 pair copulas): estimate $c_{12}$, $c_{23}$, $c_{34}$ by AIC selection over 10 bivariate families. Suppose we select: $c_{12}=$ Clayton(1.2), $c_{23}=$ Student-t(0.4, 6), $c_{34}=$ Gumbel(1.8).
>
> **Propagate to T2**: compute 4 h-function outputs — $h(u_1|u_2)$, $h(u_2|u_1)$, $h(u_2|u_3)$, $h(u_3|u_2)$, $h(u_3|u_4)$, $h(u_4|u_3)$ — using the fitted T1 parameters.
>
> **Tree 2** (2 pair copulas): estimate $c_{13|2}$ on $(h(u_1|u_2), h(u_3|u_2))$ and $c_{24|3}$ on $(h(u_2|u_3), h(u_4|u_3))$.
>
> **Propagate to T3**: compute $h(h(u_1|u_2)|h(u_3|u_2))$ and similarly.
>
> **Tree 3** (1 pair copula): estimate $c_{14|23}$ on the T3 pseudo-observations.
>
> **Total parameters**: 6 pair copulas × 1–3 parameters each; total 6–18 parameters for 4 variables, vs. 6 free correlations in a Gaussian copula with the same pair structure. But the vine captures asymmetric and tail dependence that Gaussian cannot.

## Connections

- [[Vine Copulas - Overview]] — the big picture, motivation, vine types.
- [[C-Vine and D-Vine Structures]] — explicit density formulas where the h-function recursion is made concrete.
- [[Regular Vine Copulae and Structure Selection]] — how h-functions propagate in R-vines; proximity condition governs which pseudo-observations feed which pair copulas.
- [[SMM Estimation of Factor Copulas]] — contrast: factor copulas use simulated moments (no h-functions); vine copulas use h-function-based sequential MLE.
- [[Dependence Measures for Copulas]] — Kendall's τ is the dependence summary used for tree structure selection and as an aggregate check of fit.

## See Also

- [[Factor Copula Construction]] — latent-variable copula construction: use this when d is large and a common factor structure is plausible.
- [[../_Index|Econometrics]]
