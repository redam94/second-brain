---
title: Pair Copula Constructions
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Aas-Czado-Survey.md]]"
source_location: "Secs. 2–4"
date_ingested: 2026-08-11
date_updated: 2026-08-11
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Architectures]]"
  - "[[Vine vs Factor Copula Comparison]]"
aliases:
  - PCC
  - pair copula
  - h-function
  - vine copula density
---

# Pair Copula Constructions

> [!summary]
> A pair copula construction (PCC) expresses any $N$-dimensional density as a product of $N$ marginal densities and $N(N-1)/2$ **bivariate copula densities** applied to recursively computed conditional CDFs. The recursion uses **h-functions** (partial derivatives of bivariate copulas) to pass from one tree level to the next. Sequential MLE estimates one bivariate copula at a time, tree by tree. Any bivariate copula family can appear at any edge, giving the model maximum heterogeneous flexibility.

## Overview

The chain rule of probability decomposes any joint density into a sequence of conditionals:
$$f(x_1, \ldots, x_N) = f_N(x_N) \cdot f(x_{N-1}|x_N) \cdots f(x_1|x_2,\ldots,x_N)$$

Each conditional $f(x_i | x_j, \mathbf{v})$ can itself be written using a bivariate copula:
$$f(x_i | x_j, \mathbf{v}) = c_{ij|\mathbf{v}}\!\bigl(F(x_i|\mathbf{v}), F(x_j|\mathbf{v})\bigr) \cdot f(x_i|\mathbf{v})$$

This telescoping substitution converts the joint density into a product of bivariate copula densities plus marginal densities (Joe 1996). The vine graph (see [[C-Vine and D-Vine Architectures]]) organises *which* bivariate copula is applied at each step.

## Main Content

### The Density Factorisation

> [!theorem] PCC density factorisation (Aas et al. 2009, Proposition 1)
> For any ordering of variables $(x_1, \ldots, x_N)$ and any assignment of a pair copula $c_{ij|\mathbf{v}}$ to each edge $(i,j|\mathbf{v})$ of a regular vine $\mathcal{V}$, the joint density is:
> $$f(x_1,\ldots,x_N) = \left[\prod_{k=1}^{N} f_k(x_k)\right] \cdot \prod_{j=1}^{N-1}\prod_{i=1}^{N-j} c_{j,j+i|1,\ldots,j-1}\!\bigl(F(x_j|x_1,\ldots,x_{j-1}),\; F(x_{j+i}|x_1,\ldots,x_{j-1})\bigr)$$
> (notation specialised to D-vine ordering; analogous expressions hold for C-vine and general R-vine).
>
> The factorisation is **not unique**: different vine orderings / structures yield different but equally valid decompositions of the same joint density. The choice of vine structure is part of the model specification.
^thm-pcc-factorisation

### H-Functions

> [!definition] H-function (conditional CDF)
> Let $C_{uv}(u, v; \boldsymbol{\theta})$ be a bivariate copula with parameter $\boldsymbol{\theta}$. Define the **h-function**:
> $$h(u | v; \boldsymbol{\theta}) \equiv \frac{\partial C_{uv}(u, v; \boldsymbol{\theta})}{\partial v}$$
> This is the conditional CDF of $U|V=v$ when $(U,V) \sim C_{uv}$. It maps $[0,1]^2 \to [0,1]$ and is itself uniform on $[0,1]$ for each fixed $v$.
>
> **Role in vine estimation**: the pseudo-observations at Tree $k+1$ are obtained by applying h-functions from Tree $k$:
> $$u_{j,k+1} = h\!\bigl(u_{j,k} \mid u_{\text{neighbour},k};\; \hat{\boldsymbol{\theta}}_{e}\bigr)$$
> where $\hat{\boldsymbol{\theta}}_e$ is the fitted parameter from the pair copula at edge $e$ in Tree $k$.
^def-hfunction

> [!definition] H-functions for standard copula families
> | Copula | $C(u,v;\theta)$ | $h(u|v;\theta) = \partial C/\partial v$ |
> |---|---|---|
> | Gaussian($\rho$) | $\Phi_2(\Phi^{-1}(u), \Phi^{-1}(v);\rho)$ | $\Phi\!\bigl((\Phi^{-1}(u)-\rho\Phi^{-1}(v))/\sqrt{1-\rho^2}\bigr)$ |
> | Student $t(\rho,\nu)$ | $t_2(t_\nu^{-1}(u), t_\nu^{-1}(v);\rho,\nu)$ | $t_{\nu+1}\!\bigl((t_\nu^{-1}(u)-\rho t_\nu^{-1}(v))\sqrt{(\nu+1)/(\nu+(t_\nu^{-1}(v))^2(1-\rho^2))}\bigr)$ |
> | Clayton($\theta>0$) | $(u^{-\theta}+v^{-\theta}-1)^{-1/\theta}$ | $v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta-1}$ |
> | Gumbel($\theta\geq 1$) | $\exp\{-((-\log u)^\theta+(-\log v)^\theta)^{1/\theta}\}$ | $C(u,v;\theta)\cdot(-\log v)^{\theta-1}((-\log u)^\theta+(-\log v)^\theta)^{1/\theta-1}/v$ |
>
> For each family the h-function is analytic and fast to evaluate — a key reason vine copulas are computationally feasible.
^def-hfunctions-table

### Sequential Maximum Likelihood Estimation

> [!definition] Sequential MLE for D-vine (Aas et al. 2009, Algorithm 1)
> **Inputs**: pseudo-uniform observations $(u_{1,i}, u_{2,i}, \ldots, u_{N,i})_{i=1}^T$ (obtained by applying the probability integral transform to each marginal).
>
> **Step 1 — Tree 1**: For each adjacent pair $(j, j+1)$ in the D-vine:
> 1. Estimate $\hat{\boldsymbol{\theta}}_{j,j+1}$ by maximizing the bivariate log-likelihood $\sum_i \log c_{j,j+1}(u_{j,i}, u_{j+1,i};\boldsymbol{\theta})$.
> 2. Compute pseudo-obs for Tree 2: $u_{j,j+1|j+1,i} = h(u_{j,i} | u_{j+1,i}; \hat{\boldsymbol{\theta}}_{j,j+1})$ and $u_{j+1,j|j,i} = h(u_{j+1,i} | u_{j,i}; \hat{\boldsymbol{\theta}}_{j,j+1})$.
>
> **Step 2 — Tree 2**: For each two-step pair $(j, j+2 | j+1)$:
> 1. Inputs: $u_{j,j+1|j+1,i}$ and $u_{j+2,j+1|j+1,i}$ from Step 1.
> 2. Estimate $\hat{\boldsymbol{\theta}}_{j,j+2|j+1}$ by bivariate MLE.
> 3. Apply h-functions to obtain pseudo-obs for Tree 3.
>
> **Repeat** for Trees 3 through $N-1$.
>
> **Copula family selection**: at each edge, apply AIC/BIC over candidate families $\{$Gaussian, $t$, Clayton, Gumbel, Frank, BB1, BB7, survival variants$\}$. The independence copula ($c \equiv 1$) is included as a candidate — if selected, the edge is **pruned** (zero dependence conditional on earlier levels).
^def-sequential-mle

### Bivariate Copula Families for Pair Copulas

> [!definition] Standard pair copula families (Aas et al. 2009, Table 1)
> | Family | Parameters | Lower tail $\lambda^L$ | Upper tail $\lambda^U$ | Notes |
> |---|---|---|---|---|
> | Gaussian | $\rho \in (-1,1)$ | 0 | 0 | Zero tail dependence |
> | Student $t$ | $\rho, \nu > 2$ | $2\,t_{\nu+1}(-\sqrt{(\nu+1)(1-\rho)/(1+\rho)})$ | $= \lambda^L$ | Symmetric tail dependence |
> | Clayton | $\theta > 0$ | $2^{-1/\theta}$ | 0 | Lower tail only |
> | Gumbel | $\theta \geq 1$ | 0 | $2 - 2^{1/\theta}$ | Upper tail only |
> | Frank | $\theta \in \mathbb{R}$ | 0 | 0 | No tail; allows negative dependence |
> | BB1 (Clayton-Gumbel) | $\theta > 0, \delta \geq 1$ | $2^{-1/(\theta\delta)}$ | $2 - 2^{1/\delta}$ | Both tails |
> | BB7 (Joe-Clayton) | $\theta \geq 1, \delta > 0$ | $2^{-1/\delta}$ | $2 - 2^{1/\theta}$ | Both tails |
> | Survival Clayton | $\theta > 0$ | 0 | $2^{-1/\theta}$ | Upper tail only (rotated Clayton) |
> | Survival Gumbel | $\theta \geq 1$ | $2 - 2^{1/\theta}$ | 0 | Lower tail only (rotated Gumbel) |
>
> The vine's flexibility comes from assigning **different families to different edges**: e.g., Clayton (lower tail) for the stock-bond relationship during crashes, Gumbel (upper tail) for two equity sectors that boom together, Gaussian for conditionally independent pairs.
^def-pair-copula-families

## Examples

> [!example] Three-variable PCC (Aas et al. 2009, Example 1)
> **Setup**: $(x_1, x_2, x_3)$ with a D-vine ordering $1 \text{---} 2 \text{---} 3$.
>
> **Tree 1 pair copulas**: $c_{12}$ and $c_{23}$.
>
> **Tree 2 conditional pair copula**: $c_{13|2}$.
>
> **Joint density**:
> $$f(x_1,x_2,x_3) = f_1(x_1)\,f_2(x_2)\,f_3(x_3)\cdot c_{12}(F_1(x_1),F_2(x_2))\cdot c_{23}(F_2(x_2),F_3(x_3))\cdot c_{13|2}(F(x_1|x_2),F(x_3|x_2))$$
>
> where $F(x_1|x_2) = h(F_1(x_1)|F_2(x_2);\boldsymbol{\theta}_{12})$ is the h-function from the $c_{12}$ pair copula.
>
> **Interpretation**: $c_{12}$ models the direct 1–2 dependency; $c_{23}$ models the direct 2–3 dependency; $c_{13|2}$ models the *residual* 1–3 dependency after accounting for the mediating variable $x_2$.

## Connections

- [[Vine Copulas - Overview]] — motivation, the vine tree structure, and comparison with other architectures.
- [[C-Vine and D-Vine Architectures]] — which pairs $(i,j|\mathbf{v})$ appear in the two standard vine types.
- [[Vine vs Factor Copula Comparison]] — how the PCC density factorisation differs from the factor copula's latent-variable construction.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, Spearman's $\rho$, and quantile dependence can be computed from the pair copulas analytically for simple structures or by simulation.
- [[Copula Estimation]] — bivariate copula estimation; each edge in the vine uses the same bivariate MLE machinery.

## See Also

- [[SMM Estimation of Factor Copulas]] — the contrast: factor copula uses rank-based SMM because its density is unavailable; vine copula uses tree-by-tree MLE because its density is a product of tractable bivariate densities.
- [[../_Index|Econometrics]]
