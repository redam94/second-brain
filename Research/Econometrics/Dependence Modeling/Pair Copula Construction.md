---
title: "Pair Copula Construction"
tags:
  - source/ingested
  - topic/econometrics
  - type/theorem
  - doc/paper
source: "[[raw/Aas-et-al-2009-Vine-Copula-Survey.md]]"
source_location: "Bedford & Cooke (2002), Annals of Statistics 30(4): 1031–1068, §3–4"
date_ingested: 2026-08-27
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Sequential Estimation for Vine Copulas]]"
aliases:
  - Bedford Cooke 2002
  - R-vine
  - Regular vine
  - PCC density factorization
---

# Pair Copula Construction

> [!summary]
> Bedford & Cooke (2002) prove that the joint density of any continuous random vector can be factored into a product of $\binom{n}{2}$ bivariate copula densities and $n$ marginal densities, organized by a graphical structure called a **regular vine (R-vine)**. Each edge in the vine corresponds to one bivariate copula, and the conditioning set of that copula is read off the vine's tree structure. The factorization is exact (no approximation); the **simplifying assumption** — that conditional copulas do not depend on the value of the conditioning set — is a tractable but approximate additional restriction.

## Overview

A multivariate density has $\binom{n}{2}$ pairs. Classical multivariate copulas (Gaussian, $t$, Archimedean) constrain all pairs to the same parametric family. The pair copula construction (PCC) removes this constraint: each of the $\binom{n}{2}$ pairs gets its own copula, chosen independently.

The challenge is organizing these copulas consistently so their product equals a valid joint density. Bedford & Cooke (2002) solve this with the **vine** graphical model.

## Main Content

### From two to three variables

The chain rule for densities gives, for $(X_1, X_2, X_3)$:

$$f(x_1, x_2, x_3) = f_3(x_3)\cdot f_{2|3}(x_2|x_3)\cdot f_{1|23}(x_1|x_2,x_3)$$

Using Sklar's theorem to factor each conditional density:

$$f_{2|3}(x_2|x_3) = c_{23}(F_2(x_2), F_3(x_3))\cdot f_2(x_2)$$

$$f_{1|23}(x_1|x_2,x_3) = c_{12|3}(F_{1|3}(x_1|x_3), F_{2|3}(x_2|x_3))\cdot f_{1|3}(x_1|x_3)$$

Substituting and simplifying:

$$\boxed{f(x_1,x_2,x_3) = f_1(x_1)\,f_2(x_2)\,f_3(x_3)\cdot c_{12}(F_1,F_2)\cdot c_{23}(F_2,F_3)\cdot c_{12|3}(F_{1|3},F_{2|3})}$$

This is **one valid** factorization. Others exist (e.g., rooted at $X_2$ or $X_1$). All are mathematically equivalent.
^pcc-3var

### General R-vine density

> [!theorem] Theorem (Bedford & Cooke 2002, Thm. 4.2): R-vine density factorization
> Let $\mathcal{V} = (T_1, \ldots, T_{n-1})$ be a regular vine on $n$ nodes. Each edge $e \in E_j$ (edges of tree $T_j$) has a conditioned set $\{a_e, b_e\}$ and a conditioning set $D_e$. Under the **simplifying assumption** (Assumption A below), the joint density is:
>
> $$f(x_1, \ldots, x_n) = \prod_{k=1}^{n} f_k(x_k) \cdot \prod_{j=1}^{n-1}\prod_{e \in E_j} c_{a_e,b_e|D_e}\!\left(F_{a_e|D_e}(x_{a_e}|\mathbf{x}_{D_e}),\; F_{b_e|D_e}(x_{b_e}|\mathbf{x}_{D_e})\right)$$
>
> where the product is over all $\binom{n}{2}$ edges in the vine ($|E_1|+\cdots+|E_{n-1}| = n-1 + n-2 + \cdots + 1 = \binom{n}{2}$).
^thm-rvine-density

> [!definition] Assumption A (Simplifying assumption)
> For every edge $e$ with conditioning set $D_e$, the conditional copula $c_{a_e, b_e | D_e}(u, v \mid \mathbf{x}_{D_e})$ does not depend on the specific value $\mathbf{x}_{D_e}$ — only on the conditional CDFs $F_{a_e|D_e}$ and $F_{b_e|D_e}$.
>
> This is a **convenient but approximate** restriction. It is not implied by the vine graph; it is an additional modelling assumption. Stöber, Joe & Czado (2013) develop tests for this assumption. In most applications it is a reasonable approximation.
^simplifying-assumption

### Definition: Regular vine

> [!definition] Regular vine (R-vine)
> A regular vine $\mathcal{V} = (T_1, T_2, \ldots, T_{n-1})$ is a sequence of undirected trees satisfying:
>
> 1. **Tree structure:** $T_1$ has nodes $N_1 = \{1, \ldots, n\}$ and edges $E_1$, with $|E_1| = n-1$. For $j \geq 2$, the node set of $T_j$ is $E_{j-1}$ and $|E_j| = n-j$.
>
> 2. **Proximity condition:** For $j \geq 2$, two nodes in $T_j$ (which are edges in $T_{j-1}$) may be joined by an edge only if they share a common node in $T_{j-1}$.
>
> The proximity condition ensures that the conditioned sets shrink by one at each level and the conditioning sets grow by one, yielding a valid density factorization.
^def-rvine

### Counting R-vine structures

For $n$ variables, the number of distinct R-vine structures is:

$$\frac{n!}{2}\cdot 2^{\binom{n-1}{2}} \quad (n \geq 2)$$

| $n$ | R-vine structures |
|---|---|
| 3 | 3 |
| 4 | 24 |
| 5 | 240 |
| 6 | 3,840 |
| 10 | 26,357,760 |

This explosion motivates restricting to C-vine and D-vine special cases (see [[C-Vine and D-Vine Structures]]).

### Conditional CDFs

> [!definition] Conditional CDF from Sklar's theorem
> For any bivariate copula $C$ with copula density $c$, the conditional CDF of $U_1$ given $U_2 = v$ is:
>
> $$F_{1|2}(u|v) = P(U_1 \leq u \mid U_2 = v) = \frac{\partial C(u,v)}{\partial v}$$
>
> In Aas et al. (2009) this is called the **h-function**: $h(u|v,\boldsymbol{\theta}) = \partial C(u,v;\boldsymbol{\theta})/\partial v$. It is the key computational primitive for sequential vine estimation and simulation (see [[Sequential Estimation for Vine Copulas]]).
^def-h-function

## Connections

- [[Vine Copulas - Overview]] — motivation, comparison with factor copulas.
- [[C-Vine and D-Vine Structures]] — canonical and drawable vines as tractable R-vine special cases.
- [[Sequential Estimation for Vine Copulas]] — estimation and simulation using h-functions.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and Spearman's $\rho$ used in structure selection.
- [[Factor Copulas - Overview]]^why-factor — why factor copulas use a different (simulation-based) structure vs. PCC.

## See Also

- [[../_Index|Econometrics]]
