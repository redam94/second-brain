---
title: Pair Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - doc/paper
source: "[[raw/VineCopula-R-Package-README.md]]"
source_location: "Aas, Czado, Frigessi & Bakken (2009) Sec. 2–3"
date_ingested: 2026-09-18
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Regular Vine C-vine and D-vine Structures]]"
used_by:
  - "[[Vine Copula Estimation and Model Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - h-function
  - conditional copula density
  - vine density recursion
---

# Pair Copula Construction

> [!summary]
> The pair-copula construction (PCC) evaluates a $d$-dimensional vine copula density by combining $d(d-1)/2$ bivariate copula densities using a **h-function recursion** that propagates conditional uniform pseudo-observations through the vine trees. The **h-function** $h(u|v;\theta) = \partial C(u,v;\theta)/\partial v$ is the conditional CDF of one copula argument given the other, and it is the key computational primitive for both density evaluation and sequential estimation.

## Overview

A vine copula density is a product of univariate marginal densities and bivariate copula densities. Computing this product requires evaluating each bivariate copula at appropriate **conditional** pseudo-observations: the conditional CDFs $F(x_i | x_{\mathbf{D}(e)})$ for each edge $e$ in the vine. The h-function provides these conditional CDFs recursively from the bivariate copulas already estimated at lower tree levels.

This construction is what makes vine copulas computationally tractable despite involving conditional distributions: conditional pseudo-observations are computed tree by tree, working upward from $T_1$, without ever needing a full conditional multivariate density.

## Main Content

> [!definition] The Vine Density Formula (D-vine case)
> For a $d$-dimensional D-vine with variable ordering $(1,2,\dots,d)$, the joint density is:
>
> $$f(x_1,\dots,x_d) = \left[\prod_{k=1}^d f_k(x_k)\right] \cdot \prod_{j=1}^{d-1} \prod_{i=1}^{d-j} c_{i,i+j|i+1,\dots,i+j-1}\!\bigl(F(x_i|x_{i+1},\dots,x_{i+j-1}),\; F(x_{i+j}|x_{i+1},\dots,x_{i+j-1})\bigr)$$
>
> where:
> - Level $j=1$: $c_{i,i+1}(F_i(x_i), F_{i+1}(x_{i+1}))$ — unconditional pair copulas evaluated at the marginal CDFs.
> - Level $j=2$: $c_{i,i+2|i+1}(F(x_i|x_{i+1}),\, F(x_{i+2}|x_{i+1}))$ — once-conditional pair copulas.
> - The conditional CDFs $F(x_i|x_{i+1},\dots)$ are computed by the h-function recursion below.
>
> An analogous formula holds for C-vines and general R-vines (the indices change but the product structure is identical).
^vine-density-formula

> [!definition] H-function
> For a bivariate copula $C(u_1,u_2;\theta)$ with density $c$, the **h-function** (Aas et al. 2009, Eq. 10) is:
>
> $$h(u_1|u_2;\theta) := \frac{\partial C(u_1,u_2;\theta)}{\partial u_2} = \Pr(U_1 \leq u_1 \mid U_2 = u_2)$$
>
> This is the **conditional CDF** of $U_1$ given $U_2 = u_2$; the output is again a uniform $[0,1]$ random variable (when $u_1 \sim U[0,1]$). Closed-form h-functions exist for all standard parametric copula families:
>
> | Copula | $h(u_1|u_2;\theta)$ |
> |--------|---------------------|
> | Gaussian($\rho$) | $\Phi\!\left(\frac{\Phi^{-1}(u_1) - \rho\,\Phi^{-1}(u_2)}{\sqrt{1-\rho^2}}\right)$ |
> | $t(\rho,\nu)$ | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u_1) - \rho\,t_\nu^{-1}(u_2)}{\sqrt{(1-\rho^2)(\nu + (t_\nu^{-1}(u_2))^2)/(\nu+1)}}\right)$ |
> | Clayton($\theta$) | $u_2^{-\theta-1}(u_1^{-\theta} + u_2^{-\theta} - 1)^{-1-1/\theta}$ |
> | Gumbel($\theta$) | $C(u_1,u_2)\, u_2^{-1}\, [-\ln u_2]^{\theta-1}\,[-\ln u_1 - \ln u_2]^{1/\theta-1}\,\theta^{-1}$ |
^h-function-definition

> [!definition] H-function Recursion for Conditional Pseudo-Observations
> The key computational loop for D-vines (Aas et al. 2009, Algorithm 1):
>
> **Input:** observed pseudo-observations $\{u_{t,i} = F_i(x_{t,i})\}_{t=1,\dots,T;\; i=1,\dots,d}$.
>
> **For tree level $j = 1, 2, \dots, d-1$:**
> For each edge $(i, i+j | i+1,\dots,i+j-1)$:
> 1. Retrieve the "left" pseudo-observation: $v_{i}^{(j)} := F(x_i|x_{i+1},\dots,x_{i+j-1})$ (computed in level $j-1$).
> 2. Retrieve the "right" pseudo-observation: $v_{i+j}^{(j)} := F(x_{i+j}|x_{i+1},\dots,x_{i+j-1})$ (computed in level $j-1$).
> 3. Evaluate the pair-copula density: $c_{i,i+j|\cdots}(v_i^{(j)}, v_{i+j}^{(j)};\hat{\theta}_{i,i+j|\cdots})$.
> 4. Compute next-level pseudo-observations:
>    $$v_{i}^{(j+1)} = h\!\left(v_i^{(j)} \mid v_{i+1}^{(j)};\, \hat\theta_{i,i+1|\cdots}\right), \quad v_{i+j}^{(j+1)} = h\!\left(v_{i+j}^{(j)}\mid v_{i+j-1}^{(j)};\,\hat\theta_{i+j-1,i+j|\cdots}\right)$$
>
> **Output:** the product $\prod_j \prod_i c_{i,i+j|\cdots}(v_i^{(j)}, v_{i+j}^{(j)})$ gives the vine copula density contribution; marginal density terms add to the log-likelihood.
^h-function-recursion

> [!definition] Inverse H-function (Conditional Sampling)
> The inverse h-function $h^{-1}(p|u_2;\theta) := C_{1|2}^{-1}(p|u_2;\theta)$ inverts the conditional CDF. It is used for **simulation** (Rosenblatt transform, Alg. 2 in Aas et al. 2009):
>
> 1. Draw $d$ independent $U[0,1]$ variables $w_1,\dots,w_d$.
> 2. Set $u_1 = w_1$.
> 3. For $i = 2,\dots,d$: apply successive $h^{-1}$ operations using the vine structure to transform $w_i$ into a dependent $u_i$.
>
> The result $(u_1,\dots,u_d)$ is a draw from the vine copula with unit marginals. Applying the marginal quantile functions $F_i^{-1}$ gives a draw from the full joint distribution.
^h-inv-function

## Examples

> [!example] Trivariate D-vine: full density computation
> **Setup:** $(X_1, X_2, X_3)$ with Gaussian$(0.7)$ pair copula for $(1,2)$, Clayton$(2.0)$ for $(2,3)$, and $t(\rho=0.4, \nu=5)$ for $(1,3|2)$.
>
> **Data point:** $u_1=0.8, u_2=0.3, u_3=0.6$ (after marginal transformation).
>
> **Level $j=1$ copula densities:**
> $c_{12}(0.8, 0.3) = $ Gaussian pdf, $\rho=0.7$; $c_{23}(0.3, 0.6) = $ Clayton pdf, $\theta=2$.
>
> **H-function transforms for level $j=2$:**
> $v_1^{(2)} = h_{\text{Gaussian}}(0.8 \mid 0.3; 0.7)$, $v_3^{(2)} = h_{\text{Clayton}}(0.6 \mid 0.3; 2.0)$.
>
> **Level $j=2$ conditional copula density:**
> $c_{13|2}(v_1^{(2)}, v_3^{(2)}) = $ Student-$t$ pdf at the transformed pseudo-observations.
>
> **Total log-density:** $\log f_1+\log f_2+\log f_3+\log c_{12}+\log c_{23}+\log c_{13|2}$.

## Connections

- [[Regular Vine C-vine and D-vine Structures]] — the tree structure that determines which h-functions are applied and in which order.
- [[Vine Copula Estimation and Model Selection]] — the sequential MLE uses this same h-function recursion to propagate pseudo-observations to the next tree level.
- [[Vine Copulas - Overview]] — the motivation and the simplifying assumption that makes the h-function recursion sufficient.
- [[Tail Dependence in Factor Copulas]] — contrast: factor copulas derive tail dependence analytically via EVT; vine copulas achieve it by choosing pair copulas with non-zero tail dependence (e.g., $t$ or Clayton).

## See Also

- [[raw/VineCopula-R-Package-README.md]] — `BiCopHfunc`, `BiCopHinv` implement all closed-form h-functions; `RVineSim` uses the h-inverse recursion.
- [[../_Index|Econometrics]]
