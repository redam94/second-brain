---
title: Pair Copula Construction and Regular Vines
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - type/theorem
  - doc/paper
source: "[[raw/SOURCES-vine-copulas.md]]"
source_location: "Bedford & Cooke (2002), §2–4; Czado & Nagler (2022), §2"
date_ingested: 2026-08-01
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-vines and D-vines]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - pair copula construction
  - PCC
  - regular vine
  - R-vine
  - vine density decomposition
---

# Pair Copula Construction and Regular Vines

> [!summary]
> Bedford & Cooke (2001, 2002) provide the formal graphical framework for vine copulas. A **regular vine** (R-vine) organises the $n(n-1)/2$ bivariate (pair) copulas needed to specify a general $n$-dimensional copula into a sequence of $n-1$ trees, each tree determining which conditional pairs appear at that level. The **pair copula construction (PCC) density theorem** shows that any such vine gives a valid joint density as a product of marginal densities and pair-copula densities evaluated at conditional distribution functions.

## Overview

For $n=3$ variables, the chain rule gives multiple valid density decompositions — for example:
$$f(x_1,x_2,x_3) = f_1(x_1)\,f_{2|1}(x_2|x_1)\,f_{3|12}(x_3|x_1,x_2)$$
Each conditional density can itself be written using a bivariate copula:
$$f_{2|1}(x_2|x_1) = c_{12}(F_1(x_1),F_2(x_2))\,f_2(x_2)$$
$$f_{3|12}(x_3|x_1,x_2) = c_{3,1|2}(F(x_3|x_2), F(x_1|x_2))\,f_{3|2}(x_3|x_2)$$

This is the **pair copula construction**: express each factor as a product of a pair copula and a lower-dimensional conditional density, until only marginal densities remain. The vine graphical model tracks which decomposition is being used, preventing combinatorial confusion as $n$ grows.

## Main Content

### Regular Vine Structure

> [!definition] Regular vine (R-vine) — Bedford & Cooke (2002)
> A **regular vine** $\mathcal{V}$ on $n$ variables is a sequence of nested trees $T_1, T_2, \ldots, T_{n-1}$ satisfying:
> 1. **$T_1$** has node set $N_1 = \{1,2,\ldots,n\}$ (the $n$ variables) and edge set $E_1 \subset \binom{N_1}{2}$.
> 2. **$T_j$** for $j \geq 2$ has node set $N_j = E_{j-1}$ (the *edges* of the preceding tree become nodes) and edge set $E_j$.
> 3. **Proximity condition** (the vine constraint): two nodes $a$ and $b$ in $T_j$ can only be adjacent (share an edge in $E_j$) if, as edges of $T_{j-1}$, they share exactly one common node. This ensures conditional sets grow in a structured way.
>
> For each edge $e = \{a, b\} \in E_j$:
> - The **conditioned set** $\{a(e), b(e)\}$ consists of the symmetric difference: elements in $a$ or $b$ but not both.
> - The **conditioning set** $D(e)$ is the intersection: $a \cap b$ (the node shared in $T_{j-1}$).
>
> A vine on $n$ variables has $n-1$ trees and $n(n-1)/2$ edges in total — one per pair-copula.
^def-rvine

> [!theorem] PCC Density Factorization — Bedford & Cooke (2002), Theorem 4
> Let $(X_1,\ldots,X_n)$ be a random vector with joint density $f$, marginals $f_k$, and marginal CDFs $F_k$. For any regular vine $\mathcal{V}$ with associated pair copula densities $\{c_{a(e),b(e)|D(e)}: e \in E_j, j=1,\ldots,n-1\}$, the joint density factors as:
>
> $$\boxed{f(x_1,\ldots,x_n) = \left(\prod_{k=1}^n f_k(x_k)\right) \cdot \prod_{j=1}^{n-1}\prod_{e \in E_j} c_{a(e),b(e)|D(e)}\!\left(F(x_{a(e)}|{\bf x}_{D(e)}),\, F(x_{b(e)}|{\bf x}_{D(e)})\right)}$$
>
> where $F(x_k|{\bf x}_D)$ denotes the conditional CDF of $X_k$ given $\mathbf{X}_D = {\bf x}_D$.
>
> **Significance:** The joint density is fully specified by (i) univariate marginal densities, and (ii) one bivariate copula density per vine edge, evaluated at conditional CDFs. Any combination of marginals and pair copulas gives a valid joint density.
>
> **Constraint:** There are $(n-1)!$ different pair-copula constructions for $n$ variables (different orderings of conditioning). Not all yield the same model — the vine structure determines which construction is used, and different vines give different models.
^thm-pcc-density

### The Simplifying Assumption

> [!definition] Simplified vine copula (standard assumption)
> In tree $T_j$ ($j \geq 2$), the edge pair-copula $c_{a(e),b(e)|D(e)}$ conditions on $|D(e)| = j-1$ variables. In principle, this bivariate copula could itself depend on the *values* ${\bf x}_{D(e)}$ — not just the marginal ranks $F(x_{a(e)}|{\bf x}_{D(e)})$ and $F(x_{b(e)}|{\bf x}_{D(e)})$. The **simplifying assumption** (Hobæk Haff et al. 2010; Stöber et al. 2013) states:
>
> $$c_{a(e),b(e)|D(e)}(u,v \mid {\bf x}_{D(e)}) = c_{a(e),b(e)|D(e)}(u,v) \quad \forall\, {\bf x}_{D(e)}$$
>
> That is, the conditioning pair-copula is the **same function of the conditional ranks regardless of the conditioning values**. Almost all applied vine copula work uses this assumption for tractability. It is testable (Acar et al. 2012) and can be relaxed with non-parametric or additive pair-copula models, at substantial computational cost.
^def-simplifying

### Counting Parameters

> [!definition] Number of pair-copulas and parameters
> An $n$-dimensional vine copula with the simplifying assumption requires:
> - **$n(n-1)/2$ pair-copulas** in total (one per vine edge, summed over $n-1$ trees).
> - **$1$–$3$ parameters** per pair-copula (depending on the bivariate family: 1 for Gaussian/Frank, 2 for $t$, 3 for some rotated families).
> - **Possible independence copula** at any edge: $c(u,v) = 1$ for all $(u,v)$, i.e., no dependence at that conditioning level.
>
> **Truncated vine:** If pair-copulas in trees $T_{k+1}, \ldots, T_{n-1}$ are set to independence copulas, the vine is truncated at level $k$. For $k=1$, only $n-1$ pair-copulas are estimated (a spanning tree). Truncation drastically reduces parameters when higher-order conditional dependences are weak.
>
> **Scale comparison:** For $n=10$: 45 pair-copulas. For $n=30$: 435. For $n=100$: 4950 — this is why factor copulas (16 params for the S&P 100 block model) dominate in very high dimensions.
^def-counting

## Examples

> [!example] 3-variable PCC and vine structure
> **Setup:** Variables $(X_1, X_2, X_3)$. Two valid pair copula constructions:
>
> **Construction 1:** $f = f_1 f_2 f_3 \cdot c_{12}(F_1,F_2) \cdot c_{23}(F_2,F_3) \cdot c_{13|2}(F(x_1|x_2), F(x_3|x_2))$
>
> **Construction 2:** $f = f_1 f_2 f_3 \cdot c_{12}(F_1,F_2) \cdot c_{13}(F_1,F_3) \cdot c_{23|1}(F(x_2|x_1), F(x_3|x_1))$
>
> **Vine graph:** Construction 1 corresponds to a D-vine $1 - 2 - 3$ (path). Construction 2 corresponds to a C-vine $2 \leftarrow 1 \rightarrow 3$ (star rooted at node 1). Both factorisations are valid representations of different model structures — choosing between them is part of model selection.
>
> **Interpretation:** In Construction 1, $c_{13|2}$ captures the residual dependence between $X_1$ and $X_3$ after accounting for their common association with $X_2$. If $X_2$ is a market index and $X_1, X_3$ are individual stocks, the conditional pair-copula often approaches independence — the "serial" D-vine structure captures this naturally.

## Connections

- [[Vine Copulas - Overview]] — motivation, scale comparison with factor copulas.
- [[C-vines and D-vines]] — the two special vine families (star trees vs. path trees) with explicit density formulas and h-function recursions.
- [[Vine Copula Estimation and Model Selection]] — how to estimate the $n(n-1)/2$ pair-copulas (h-functions, sequential MLE, Dissmann structure selection).
- [[Factor Copula Construction]] — the competing model: latent factor $X_i = \beta_i Z + \varepsilon_i$, one copula for all pairs.
- [[Directed Acyclic Graphs]] — vines are graphical models; the vine tree sequence is a sequence of undirected graphs (spanning trees), distinct from DAGs but related in that both use graph structure to express conditional independence.

## See Also

- [[../_Index|Dependence Modeling]]
