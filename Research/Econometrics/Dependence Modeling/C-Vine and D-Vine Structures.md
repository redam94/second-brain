---
title: C-Vine and D-Vine Structures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copula-Synthesis-Survey.md]]"
source_location: "Aas et al. (2009) §2.2–2.3; Bedford & Cooke (2002) §2"
date_ingested: 2026-07-10
date_updated: 2026-07-10
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Construction and h-Functions]]"
used_by:
  - "[[Regular Vine Copulae and Structure Selection]]"
  - "[[Copula Architecture Comparison]]"
aliases:
  - canonical vine
  - drawable vine
  - C-vine
  - D-vine
---

# C-Vine and D-Vine Structures

> [!summary]
> C-vines (canonical vines) and D-vines (drawable vines) are the two classical special cases of regular vines (Bedford & Cooke 2002), each corresponding to a specific tree topology. C-vines use a star structure (one root variable per tree) — suited when one variable drives all others. D-vines use a path structure — suited for ordered sequences like time series or spatial data. Both admit explicit density formulas with $d(d-1)/2$ pair copulas.

## Overview

Bedford & Cooke (2001, 2002) defined **regular vines** as a class of nested trees with a proximity condition. Aas et al. (2009) introduced the practical toolkit (h-functions, sequential estimation) for two natural sub-classes: C-vines and D-vines. Their pair copula interpretation made vines accessible to applied econometricians; the two special structures are still the default starting point before the more general R-vine framework (see [[Regular Vine Copulae and Structure Selection]]) is needed.

## Main Content

> [!definition] D-vine (Drawable Vine)
> A **D-vine** on $d$ variables $x_1, x_2, \ldots, x_d$ has a **path topology** at each tree level. Variables are ordered along a sequence $x_1\!-\!x_2\!-\!\cdots\!-\!x_d$ in tree $T_1$; each tree's edges become the next tree's nodes.
>
> **Tree $T_1$** (path of d-1 edges): $(x_1,x_2)$, $(x_2,x_3)$, ..., $(x_{d-1},x_d)$
> **Tree $T_2$** (path of d-2 edges): $(x_1,x_3|x_2)$, $(x_2,x_4|x_3)$, ..., $(x_{d-2},x_d|x_{d-1})$
> **Tree $T_j$** (path of d-j edges): $(x_i, x_{i+j}|x_{i+1},\ldots,x_{i+j-1})$ for $i=1,\ldots,d-j$
>
> The D-vine density is:
> $$f(x_1,\ldots,x_d) = \prod_{i=1}^d f_i(x_i) \cdot \prod_{j=1}^{d-1}\prod_{i=1}^{d-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\left(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\;F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\right)$$
>
> **Total pair copulas**: $\sum_{j=1}^{d-1}(d-j) = d(d-1)/2$, one per edge in the vine.
^def-dvine

> [!definition] C-vine (Canonical Vine)
> A **C-vine** on $d$ variables has a **star topology** at each tree level. Tree $T_j$ has one root node $x_j$ connected to all remaining non-root variables.
>
> **Tree $T_1$** (star centred on $x_1$): $(x_1,x_2)$, $(x_1,x_3)$, ..., $(x_1,x_d)$
> **Tree $T_2$** (star centred on $x_2|x_1$): $(x_2,x_3|x_1)$, $(x_2,x_4|x_1)$, ..., $(x_2,x_d|x_1)$
> **Tree $T_j$** (star centred on $x_j|x_1,\ldots,x_{j-1}$): pair copulas $(x_j, x_i | x_1,\ldots,x_{j-1})$ for $i=j+1,\ldots,d$
>
> The C-vine density is:
> $$f(x_1,\ldots,x_d) = \prod_{i=1}^d f_i(x_i) \cdot \prod_{j=1}^{d-1}\prod_{i=j+1}^{d} c_{j,i|1,\ldots,j-1}\!\left(F(x_j|x_1,\ldots,x_{j-1}),\;F(x_i|x_1,\ldots,x_{j-1})\right)$$
>
> Each root $x_j$ is linked to all remaining variables after conditioning on the earlier roots $x_1,\ldots,x_{j-1}$. The root ordering is typically chosen to put the variable with the highest *total* Kendall $\tau$-dependence to all others as root $x_1$.
^def-cvine

> [!definition] d=3 comparison of C-vine and D-vine
> For 3 variables, both structures produce the same density (one of two valid D-vine orderings coincides with the C-vine for d=3). For d ≥ 4, C-vine and D-vine factorizations genuinely differ.
>
> **D-vine ordering 1-2-3-4 (d=4)**:
> $T_1$: $(1,2),(2,3),(3,4)$
> $T_2$: $(1,3|2),(2,4|3)$
> $T_3$: $(1,4|2,3)$
>
> **C-vine root sequence 1-2 (d=4, root 1 for T₁, root 2 for T₂)**:
> $T_1$: $(1,2),(1,3),(1,4)$
> $T_2$: $(2,3|1),(2,4|1)$
> $T_3$: $(3,4|1,2)$
>
> The C-vine imposes more pairs involving the root; the D-vine is "balanced" along the path.
^def-comparison-34

> [!definition] Number of vine orderings and the exhaustive search problem
> For $d$ variables:
> - **D-vine**: number of orderings = $d!/2$ (symmetry removes duplicates)
> - **C-vine**: number of root orderings = $d!$
> - **R-vine**: far larger; the total number of labeled R-vine structures on d nodes is $d!\cdot 2^{\binom{d-1}{2}} / d \cdot \prod_{k=1}^{d-2}(d-k)$ (not computable for d > 10)
>
> For d=4: D-vine has 12 orderings; C-vine has 24. Exhaustive search is feasible for small d but not for d > 5–6, motivating the greedy maximum spanning tree selection of Dissmann et al. (2013). See [[Regular Vine Copulae and Structure Selection]].
^def-orderings

> [!definition] When to use C-vine vs D-vine
> | Criterion | C-vine | D-vine |
> |---|---|---|
> | Data structure | One variable drives all others (hub) | Natural ordering along a sequence |
> | Application | Market index vs constituents; central bank rate vs spread | Time series autoregressive structure; spatial gradients |
> | Root selection | Variable with max total $\tau$-dependence | Variable ordering with max sequential $\tau$ |
> | Interpretation | Conditional independence given the root | Conditional independence across non-adjacent lags |
> | Estimation | Roots identified first; h-functions faster | Path structure; each tree has equal contribution |
>
> When neither structure fits well (heterogeneous pair dependencies without a clear hub or ordering), use an R-vine selected by the greedy Dissmann algorithm.
^def-when

## Examples

> [!example] 4-variable D-vine: financial returns
> **Setup:** Daily log-returns on 4 assets $(X_1, X_2, X_3, X_4)$ = equity, bond, gold, commodity. D-vine ordering: equity-bond-gold-commodity (based on sequential $\tau$ maximisation).
>
> **$T_1$ pair copulas** (estimated by AIC):
> - $(X_1,X_2)$: Gaussian($\rho$=0.35) — mild positive correlation, symmetric
> - $(X_2,X_3)$: Frank($\theta$=−0.8) — mild negative, symmetric (flight to gold when bonds up)
> - $(X_3,X_4)$: Gaussian($\rho$=0.20) — mild positive
>
> **$T_2$ pair copulas** (on h-function pseudo-observations):
> - $(X_1,X_3|X_2)$: Independence — once bond is controlled, equity and gold are unrelated
> - $(X_2,X_4|X_3)$: Clayton($\theta$=0.5) — lower tail dependence; bond and commodity both fall in crises after conditioning on gold
>
> **$T_3$ pair copula**: $(X_1,X_4|X_2,X_3)$: Independence — equity and commodity are independent given bond and gold.
>
> **Result:** The D-vine reveals a sparse conditional independence structure: the "full" 4×4 correlation matrix has 6 non-zero correlations, but after conditioning, only 3 remain non-trivial.

> [!example] 4-variable C-vine: exchange rate example (Aas et al. 2009)
> **Setup:** Four exchange rates with DEM as the "hub" variable most correlated with all others. C-vine with DEM as root $x_1$.
>
> **$T_1$**: DEM paired with USD, GBP, JPY (3 pair copulas, all bivariate; DEM is the star centre)
>
> **$T_2$**: USD vs GBP conditional on DEM; USD vs JPY conditional on DEM (star at USD|DEM)
>
> **$T_3$**: GBP vs JPY conditional on DEM and USD
>
> **Interpretation:** The C-vine structure captures the fact that once you condition on DEM (the dominant European rate at the time), remaining dependences are weaker — the star structure is the right model when one variable is the "hub."

## Connections

- [[Vine Copulas - Overview]] — what vine copulas are, position relative to other copula architectures.
- [[Pair Copula Construction and h-Functions]] — the h-function recursion that makes these density formulas computable.
- [[Regular Vine Copulae and Structure Selection]] — the general R-vine that subsumes both; when neither C nor D vine fits, use R-vine.
- [[Copula Architecture Comparison]] — when vine copulas (C/D/R) outperform or underperform factor copulas.
- [[Factor Copula Construction]] — latent factor alternative; compare the equidependence factor copula to the C-vine (C-vine with equidependence = near-equivalent at high d).

## See Also

- [[Dependence Measures for Copulas]] — Kendall $\tau$ used for C-vine root ordering (max total $\tau$) and D-vine sequential ordering.
- [[../_Index|Econometrics]]
