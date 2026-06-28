---
title: Pair-Copula Constructions
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Aas 2016 - Pair-Copula Constructions for Financial Applications.pdf]]"
source_location: "Sec. 2, Eqs. (1)-(4), pp. 2-4"
date_ingested: 2026-06-28
folder: "Econometrics/Dependence Modeling/Vine Copulas"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-vines, D-vines, and Regular Vines]]"
  - "[[The Simplifying Assumption]]"
  - "[[Estimation and Structure Selection for Vines]]"
aliases:
  - PCC
  - Pair-copula construction
  - R-vine density
  - PCC factorization
---

# Pair-Copula Constructions

> [!summary]
> A pair-copula construction (PCC) decomposes a $d$-dimensional density into the product of the $d$ marginal densities and $d(d-1)/2$ **bivariate (pair) copula densities**, each evaluated at **conditional distribution functions** of pairs of variables given a conditioning set. The conditional margins that serve as the pair-copula arguments are computed by a **recursive partial-derivative formula**, and — for a regular vine — the needed conditional copulae always appear in earlier trees, so they are available without extra work.

## Overview

By Sklar's theorem a joint density factors into margins times a copula density. The PCC goes further and factors the **copula density itself** into bivariate pieces. Joe (1996) observed that any multivariate density can be written using only bivariate copulae and conditional distributions; the **regular vine** organizes which pairs and which conditioning sets appear. The arguments of the pair-copulae are **conditional distributions** in every tree except the first, where they are the univariate margins.

## Main Content

> [!definition] The R-vine density factorization (Eq. 1)
> Let $\mathbf{X}=(X_1,\dots,X_d)$ follow an R-vine distribution with trees $T_1,\dots,T_{d-1}$, edge sets $E_i$, and for each edge $e$ a *conditioned* pair $\{j(e),k(e)\}$ and *conditioning set* $D(e)$ (with $\mathbf{x}_{D(e)}$ the corresponding subvector). The joint density is
> $$
> f(x_1,\dots,x_d)=\left[\prod_{k=1}^{d} f_k(x_k)\right]\times\left[\prod_{i=1}^{d-1}\;\prod_{e\in E_i} c_{j(e),k(e)\mid D(e)}\!\Big(F\big(x_{j(e)}\mid \mathbf{x}_{D(e)}\big),\,F\big(x_{k(e)}\mid \mathbf{x}_{D(e)}\big)\Big)\right].
> $$
> The right factor is a product of exactly $d(d-1)/2$ bivariate copula densities and is called the **R-vine copula**. Conditioning sets are empty in $T_1$, contain one variable in $T_2$, two in $T_3$, and so on. ^rvine-density

> [!definition] Free choice of pair-copulae
> The key property: **all** copulae in the decomposition are bivariate and may belong to **different families** (Gaussian, $t$, Clayton, Gumbel, …) with their own parameters. There are **no restrictions** on which copula types can be combined — the resulting multivariate structure is guaranteed to be a valid copula regardless. This is what makes PCCs able to characterize highly heterogeneous, asymmetric, tail-dependent multivariate behaviour. ^free-choice

> [!definition] Recursive conditional-distribution formula (Eq. 2)
> The conditional CDFs that serve as pair-copula arguments are obtained recursively (Joe 1996). For an arbitrary component $v_j$ of the conditioning vector $\mathbf{v}$, with $\mathbf{v}_{-j}$ denoting $\mathbf{v}$ excluding $v_j$:
> $$
> F(x\mid \mathbf{v})=\frac{\partial\, C_{x v_j\mid \mathbf{v}_{-j}}\big(F(x\mid \mathbf{v}_{-j}),\,F(v_j\mid \mathbf{v}_{-j})\big)}{\partial\, F(v_j\mid \mathbf{v}_{-j})},
> $$
> where $C_{x v_j\mid \mathbf{v}_{-j}}$ is a bivariate copula. The single-conditioning special case $F(x\mid v)=\partial C_{xv}(F(x),F(v))/\partial F(v)$ is the familiar **h-function**. By construction of an R-vine, the copula $C_{x v_j\mid \mathbf{v}_{-j}}$ appears in a **preceding tree**, so the conditional margins are available **without extra computation**. ^h-function

> [!definition] R-vine matrix and density via $M$ (Eqs. 3-4)
> To store the index structure efficiently, Morales-Napoles (2011) uses a lower-triangular $d\times d$ **R-vine matrix** $M=(m_{i,j})$ whose diagonal entries are the first-tree nodes; each row from the bottom up encodes a tree. The conditioned set of a node is read from a diagonal entry and the column entry of the current row; the conditioning set from the column entries below. The density can then be written compactly as
> $$
> f(x_1,\dots,x_d)=\left[\prod_{k=1}^{d} f_k(x_k)\right]\times\left[\prod_{j=d-1}^{1}\;\prod_{i=d}^{j+1} c_{m_{j,j},m_{i,j}\mid m_{i+1,j},\dots,m_{d,j}}\right],
> $$
> with pair-copula arguments $F(x_{m_{j,j}}\mid x_{m_{i+1,j}},\dots,x_{m_{d,j}})$ and $F(x_{m_{i,j}}\mid x_{m_{i+1,j}},\dots,x_{m_{d,j}})$. Copula types and parameters are stored in companion matrices shaped like $M$. ^rvine-matrix

## Examples

> [!example] A 4-dimensional D-vine decomposition
> Take variables $1\!-\!2\!-\!3\!-\!4$ in a D-vine (path) order. The three trees are
> - $T_1$: edges $12,\;23,\;34$ (raw margins),
> - $T_2$: edges $13\mid2,\;24\mid3$,
> - $T_3$: edge $14\mid23$.
>
> The density factorizes ($d(d-1)/2=6$ pair-copulae) as
> $$
> f(x_1,x_2,x_3,x_4)=f_1 f_2 f_3 f_4 \times c_{12}\,c_{23}\,c_{34}\times c_{13\mid2}\big\{F(x_1\mid x_2),F(x_3\mid x_2)\big\}\,c_{24\mid3}\big\{F(x_2\mid x_3),F(x_4\mid x_3)\big\}\times c_{14\mid23}\big\{F(x_1\mid x_2,x_3),F(x_4\mid x_2,x_3)\big\}.
> $$
> The conditional margins are built by the recursion (Eq. 2), e.g. $F(x_1\mid x_2)=\partial C_{12}(F_1,F_2)/\partial F_2$, and $F(x_1\mid x_2,x_3)=\partial C_{13\mid2}(F(x_1\mid x_2),F(x_3\mid x_2))/\partial F(x_3\mid x_2)$ — each using a copula from a previous tree.

> [!example] A 3-dimensional construction (both vine types coincide)
> For $d=3$ every R-vine is simultaneously a C-vine and a D-vine. With order $1\!-\!2\!-\!3$:
> $$
> f(x_1,x_2,x_3)=f_1 f_2 f_3\times c_{12}\,c_{23}\times c_{13\mid2}\big\{F(x_1\mid x_2),F(x_3\mid x_2)\big\}.
> $$
> Three pair-copulae ($3\cdot2/2=3$) reconstruct the full trivariate dependence.

## Connections

- [[Vine Copulas - Overview]] — the big-picture motivation and place among high-dimensional copulae.
- [[C-vines, D-vines, and Regular Vines]] — how the choice of trees specializes this general factorization.
- [[The Simplifying Assumption]] — the assumption that lets each $c_{\cdot\cdot\mid D}$ ignore the conditioning *value*.
- [[Estimation and Structure Selection for Vines]] — fitting the families and parameters in this product.
- [[Copula Estimation]] — estimation of the bivariate building blocks.

## See Also

- [[Factor Copulas - Overview]] — contrast: a latent-factor rather than pairwise copula factorization.
- [[Research/Econometrics/Dependence Modeling/_Index|Dependence Modeling]]
