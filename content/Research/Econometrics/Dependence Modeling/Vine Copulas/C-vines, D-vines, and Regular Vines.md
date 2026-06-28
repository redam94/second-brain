---
title: C-vines, D-vines, and Regular Vines
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Aas 2016 - Pair-Copula Constructions for Financial Applications.pdf]]"
source_location: "Secs. 2, 2.2, Eqs. (5)-(6), Figs. 1-3, pp. 2-6"
date_ingested: 2026-06-28
folder: "Econometrics/Dependence Modeling/Vine Copulas"
doc_type: paper
depends_on:
  - "[[Pair-Copula Constructions]]"
used_by:
  - "[[Estimation and Structure Selection for Vines]]"
aliases:
  - C-vine
  - D-vine
  - Canonical vine
  - Drawable vine
  - Regular vine
  - R-vine
---

# C-vines, D-vines, and Regular Vines

> [!summary]
> A **regular vine (R-vine)** is a nested sequence of $d-1$ trees in which the edges of one tree become the nodes of the next, subject to a proximity condition; each edge carries a pair-copula. Two graphically simple special cases dominate financial applications: the **C-vine (canonical vine)** — each tree has one pivotal node connected to all others (star shape), good when one variable governs the system — and the **D-vine (drawable vine)** — each node touches at most two edges (a path/line), good when variables have a natural ordering.

## Overview

Bedford and Cooke introduced regular vines as a graphical model for choosing *which* pair-copulae appear in a [[Pair-Copula Constructions|PCC]]. The C-vine and D-vine are the two structures originally used in finance (Kurowicka & Cooke 2006); a general R-vine is anything in between.

## Main Content

> [!theorem] Regular vine definition (Bedford-Cooke; Def. 4.4 of Kurowicka-Cooke 2006)
> An R-vine $\mathcal{V}$ on $d$ variables is a set of trees $T_1,\dots,T_{d-1}$ with node sets $N_i$ and edge sets $E_i$ satisfying:
> 1. **Tree $T_1$** has nodes $N_1=\{1,\dots,d\}$ and edges $E_1$.
> 2. For $i=2,\dots,d-1$, the nodes of $T_i$ are the **edges of $T_{i-1}$**: $N_i=E_{i-1}$.
> 3. **Proximity condition:** if two edges of $T_i$ are joined as nodes by an edge in $T_{i+1}$, they must **share a common node** in $T_i$.
>
> Each edge $e\in E_i$ is associated with a bivariate copula $C_{j(e),k(e)\mid D(e)}$; $\{j(e),k(e)\}$ are the conditioned nodes, $D(e)$ the conditioning set, and $\{j(e),k(e),D(e)\}$ the constraint set. There are $d(d-1)/2$ edges (pair-copulae) in total. ^rvine-def

> [!definition] C-vine (canonical vine)
> In a **C-vine**, each tree $T_j$ has a **unique pivotal node connected to $n-j$ edges** (a star). One variable is the "root" of tree 1 and conditions everything; the next variable roots tree 2, and so on. The $n$-dimensional C-vine density is
> $$
> \prod_{k=1}^{n} f(x_k)\;\prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{j,j+i\mid 1,\dots,j-1}\big\{F(x_j\mid x_1,\dots,x_{j-1}),\,F(x_{j+i}\mid x_1,\dots,x_{j-1})\big\}.
> $$
> **Use it when** a particular variable is known to govern interactions in the dataset; place that key variable at the root (e.g. a market index driving individual stocks). ^cvine

> [!definition] D-vine (drawable vine)
> In a **D-vine**, **no node in any tree is connected to more than two edges** — each tree is a path/line. Variables sit in a sequence and only "neighbouring" conditioned pairs are linked. The $n$-dimensional D-vine density is
> $$
> \prod_{k=1}^{n} f(x_k)\;\prod_{j=1}^{n-1}\prod_{i=1}^{n-j} c_{i,i+j\mid i+1,\dots,i+j-1}\big\{F(x_i\mid x_{i+1},\dots,x_{i+j-1}),\,F(x_{i+j}\mid x_{i+1},\dots,x_{i+j-1})\big\},
> $$
> where index $j$ identifies the tree and $i$ runs over the edges in each tree. **Use it when** variables have a natural linear ordering (e.g. a time/serial order, or a maturity ladder) and no single dominant variable exists. ^dvine

> [!definition] When each structure is appropriate
> - **C-vine** — one pivotal/key variable; star trees; conditioning sets grow $\{1\},\{1,2\},\dots$
> - **D-vine** — natural ordering, no dominant variable; path trees; conditioning sets are the variables "between" the conditioned pair.
> - **General R-vine** — neither star nor path; the most flexible structure, selected by [[Estimation and Structure Selection for Vines|Dißmann's algorithm]]. For $d=3$ all three coincide. ^when-each

## Examples

> [!example] 5-dimensional D-vine (Fig. 2)
> Trees: $T_1$ edges $52,23,34,41$; $T_2$ edges $53\mid2,24\mid3,31\mid4$; $T_3$ edges $54\mid23,21\mid34$; $T_4$ edge $51\mid234$. Density:
> $$
> \begin{aligned}
> f(x_1,\dots,x_5)=\;&f_1 f_2 f_3 f_4 f_5\\
> &\cdot\, c_{52}\{F_5,F_2\}\,c_{23}\{F_2,F_3\}\,c_{34}\{F_3,F_4\}\,c_{41}\{F_4,F_1\}\\
> &\cdot\, c_{53\mid2}\{F(x_5\mid x_2),F(x_3\mid x_2)\}\,c_{24\mid3}\{F(x_2\mid x_3),F(x_4\mid x_3)\}\,c_{31\mid4}\{F(x_3\mid x_4),F(x_1\mid x_4)\}\\
> &\cdot\, c_{54\mid23}\{F(x_5\mid x_2,x_3),F(x_4\mid x_2,x_3)\}\,c_{21\mid34}\{F(x_2\mid x_3,x_4),F(x_1\mid x_3,x_4)\}\\
> &\cdot\, c_{51\mid234}\{F(x_5\mid x_2,x_3,x_4),F(x_1\mid x_2,x_3,x_4)\}.
> \end{aligned}
> $$

> [!example] 5-dimensional C-vine with Variable 1 at the root (Fig. 3)
> Trees: $T_1$ edges $12,13,14,15$ (variable 1 pivotal); $T_2$ edges $23\mid1,24\mid1,25\mid1$; $T_3$ edges $34\mid12,35\mid12$; $T_4$ edge $45\mid123$. Density:
> $$
> \begin{aligned}
> f(x_1,\dots,x_5)=\;&f_1 f_2 f_3 f_4 f_5\\
> &\cdot\, c_{12}\{F_1,F_2\}\,c_{13}\{F_1,F_3\}\,c_{14}\{F_1,F_4\}\,c_{15}\{F_1,F_5\}\\
> &\cdot\, c_{23\mid1}\{F(x_2\mid x_1),F(x_3\mid x_1)\}\,c_{24\mid1}\{F(x_2\mid x_1),F(x_4\mid x_1)\}\,c_{25\mid1}\{F(x_2\mid x_1),F(x_5\mid x_1)\}\\
> &\cdot\, c_{34\mid12}\{F(x_3\mid x_1,x_2),F(x_4\mid x_1,x_2)\}\,c_{35\mid12}\{F(x_3\mid x_1,x_2),F(x_5\mid x_1,x_2)\}\\
> &\cdot\, c_{45\mid123}\{F(x_4\mid x_1,x_2,x_3),F(x_5\mid x_1,x_2,x_3)\}.
> \end{aligned}
> $$
> Here Variable 1 (e.g. a market factor) is conditioned on in every higher tree.

## Connections

- [[Pair-Copula Constructions]] — the general R-vine density these structures specialize.
- [[Vine Copulas - Overview]] — where C/D/R-vines sit among high-dimensional copulae.
- [[Estimation and Structure Selection for Vines]] — choosing among the $2^{\binom{d-2}{2}-1}d!$ possible R-vines.
- [[The Simplifying Assumption]] — applies to the conditional pair-copulae in every higher tree.

## See Also

- [[Factor Copulas - Overview]] — a C-vine rooted at a market variable parallels a one-factor model in spirit.
- [[Research/Econometrics/Dependence Modeling/_Index|Dependence Modeling]]
