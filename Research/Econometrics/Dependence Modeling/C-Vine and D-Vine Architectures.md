---
title: C-Vine and D-Vine Architectures
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Aas-Czado-Survey.md]]"
source_location: "Secs. 3"
date_ingested: 2026-08-11
date_updated: 2026-08-11
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair Copula Constructions]]"
used_by:
  - "[[Vine vs Factor Copula Comparison]]"
aliases:
  - C-vine
  - D-vine
  - canonical vine
  - drawable vine
  - vine tree structure
---

# C-Vine and D-Vine Architectures

> [!summary]
> The **C-vine** (canonical vine) uses a **star structure** at each tree level: a single root variable is paired unconditionally with all others in Tree 1, and the process repeats for each remaining level. The **D-vine** (drawable vine) uses a **path structure**: only adjacent pairs appear in Tree 1, and each subsequent tree adds one lag of conditioning. C-vines are natural when one variable drives overall dependence; D-vines are natural for ordered data (time series, spatial sequences). Both are special cases of the general **regular vine (R-vine)** (Bedford & Cooke 2002).

## Overview

An $N$-dimensional regular vine consists of $N-1$ tree levels, with $N-k$ edges in Tree $k$, for a total of $N(N-1)/2$ pair copulas. The key modelling choice — besides which bivariate copula family to use at each edge — is the **tree structure**: which pairs of variables are modelled directly at Tree 1, and which are modelled conditional on intermediate variables at later trees.

The two standard structures are defined by their Tree 1 topology:

- **C-vine**: Tree 1 is a **star** (one central hub node connected to all others).
- **D-vine**: Tree 1 is a **path** (a Hamiltonian path through all variables).

All other trees at later levels are uniquely determined by the proximity condition (see [[Vine Copulas - Overview]]).

## Main Content

### C-Vine (Canonical Vine)

> [!definition] C-vine structure
> An $N$-dimensional **C-vine** is defined by a sequence of root nodes $(j_1, j_2, \ldots, j_{N-1})$, where $j_k \in \{1,\ldots,N\} \setminus \{j_1,\ldots,j_{k-1}\}$. The pair copulas are:
>
> **Tree 1**: $c_{j_1,k}$ for all $k \neq j_1$ — the root $j_1$ is paired with every other variable.
> $$\text{Tree 1 edges: } (j_1, j_2),\; (j_1, j_3),\; \ldots,\; (j_1, j_N) \quad (N-1 \text{ pairs})$$
>
> **Tree 2**: conditional on $x_{j_1}$, root $j_2$ is paired with every remaining variable:
> $$\text{Tree 2 edges: } (j_2, j_3|j_1),\; (j_2, j_4|j_1),\; \ldots,\; (j_2, j_N|j_1) \quad (N-2 \text{ pairs})$$
>
> **Tree $k$**: conditional on $\{x_{j_1}, \ldots, x_{j_{k-1}}\}$, root $j_k$ is paired with every remaining variable — $(N-k)$ pairs.
>
> **Total**: $(N-1)+(N-2)+\cdots+1 = N(N-1)/2$ pair copulas, as required.
^def-cvine

> [!definition] C-vine joint density
> The $N$-dimensional C-vine density is:
> $$f(x_1,\ldots,x_N) = \prod_{k=1}^{N} f_k(x_k) \cdot \prod_{j=1}^{N-1}\prod_{i=j+1}^{N} c_{j,i|1,\ldots,j-1}\!\bigl(F(x_j|x_1,\ldots,x_{j-1}),\; F(x_i|x_1,\ldots,x_{j-1})\bigr)$$
> where the first argument in the inner product is the conditional CDF of the root variable $x_j$ (given the previous roots $x_1,\ldots,x_{j-1}$), computed using h-functions from the previous tree level.
^def-cvine-density

> [!definition] C-vine economic interpretation
> A C-vine with root ordering $(j_1, j_2, \ldots)$ concentrates the most direct pair-wise modelling on the root variables. In practice:
> - $j_1$ is chosen to be the variable with the **highest average pairwise dependence** (e.g., Kendall's $\tau$ summed over all pairs) — it captures the "key driver" of cross-sectional dependence.
> - The C-vine is the vine analogue of a **one-factor model**: $j_1$ plays the role of the common factor $Z$ in the factor copula, except that it is a directly observed variable and each pair $(j_1, k)$ can have its own copula family and parameters.
> - After conditioning on $j_1$, $j_2$ is the next most connected variable, and so on.
^def-cvine-interpretation

### D-Vine (Drawable Vine)

> [!definition] D-vine structure
> An $N$-dimensional **D-vine** with ordering $(1, 2, \ldots, N)$ has:
>
> **Tree 1** (adjacent pairs): $(1,2),\; (2,3),\; (3,4),\; \ldots,\; (N-1, N)$ — $N-1$ pairs.
>
> **Tree 2** (two-step, one conditioning variable): $(1,3|2),\; (2,4|3),\; \ldots,\; (N-2,N|N-1)$ — $N-2$ pairs.
>
> **Tree $k$** ($k$-step, $k-1$ conditioning variables): $(i, i+k | i+1, \ldots, i+k-1)$ for $i = 1, \ldots, N-k$ — $N-k$ pairs.
>
> **Total**: $(N-1) + (N-2) + \cdots + 1 = N(N-1)/2$ pair copulas.
^def-dvine

> [!definition] D-vine joint density
> The $N$-dimensional D-vine density is:
> $$f(x_1,\ldots,x_N) = \prod_{k=1}^{N} f_k(x_k) \cdot \prod_{j=1}^{N-1}\prod_{i=1}^{N-j} c_{i,i+j|i+1,\ldots,i+j-1}\!\bigl(F(x_i|x_{i+1},\ldots,x_{i+j-1}),\; F(x_{i+j}|x_{i+1},\ldots,x_{i+j-1})\bigr)$$
^def-dvine-density

> [!definition] D-vine for time series
> A D-vine with variable ordering corresponding to time $(x_1, x_2, \ldots, x_N)$ is the natural copula model for **stationary time series** with Markov-like structure:
> - Tree 1 pair copulas $c_{t,t+1}$ model the **lag-1** dependence.
> - Tree 2 pair copulas $c_{t,t+2|t+1}$ model the **conditional lag-2** dependence given the intermediate observation.
> - Truncating at Tree $k$ corresponds to a **$k$th-order copula Markov model**: $(x_t \perp\!\!\!\perp x_{t+k+j} \mid x_{t+1},\ldots,x_{t+k})$ for all $j \geq 1$.
>
> This is the copula-world analogue of an ARMA model's Markov structure, but without requiring Gaussianity or linearity — each lag copula can have its own tail behaviour.
^def-dvine-timeseries

### Structural Comparison

> [!definition] C-vine vs. D-vine summary
>
> | Property | C-vine | D-vine |
> |---|---|---|
> | Tree 1 topology | Star (one hub, all spokes) | Path (Hamiltonian chain) |
> | Number of edges per tree | $N-1,\, N-2,\ldots$ (same as D-vine) | $N-1,\, N-2,\ldots$ (same as C-vine) |
> | Most direct pairs | Root to all others | All adjacent pairs |
> | Root variable selection | Choose variable with highest average dependence | Choose ordering that maximises tree-1 pair dependences |
> | Natural for | One-variable-drives-all settings (market index, key driver) | Ordered/sequential data (time series, spatial chains) |
> | Analogy | One-factor latent model (root ↔ factor) | ARMA / Markov chain |
> | Conditional structure | All Tree 2+ pairs conditional on the root | All Tree 2+ pairs conditional on the path neighbours |
^def-comparison-table

### General R-Vines

Beyond C-vines and D-vines, the full **regular vine (R-vine)** class allows any tree structure satisfying the proximity condition. R-vines can express dependence structures that neither star nor path captures:

- **Mixed structures**: part of the tree is star-shaped, part is path-shaped.
- **Block structures**: groups of variables internally connected by sub-vines, with cross-group conditioning.
- **Sparse/truncated vines**: trees beyond level $k$ are set to independence, reducing the number of active pair copulas.

In practice, R-vine structure selection is a combinatorial optimisation problem: the number of possible R-vine structures on $N$ variables grows superexponentially. Heuristic algorithms (Dißmann et al. 2013) greedily maximise the sum of absolute Kendall's $\tau$ at each tree level, which corresponds to selecting the most dependent pairs first.

## Examples

> [!example] Four-variable C-vine (root $x_1$)
> **Tree 1**: $(1,2),\, (1,3),\, (1,4)$ — $x_1$ paired unconditionally with everyone else.
>
> **Tree 2** (conditional on $x_1$): $(2,3|1),\, (2,4|1)$ — $x_2$ acts as root after conditioning.
>
> **Tree 3** (conditional on $x_1, x_2$): $(3,4|1,2)$ — one pair copula.
>
> **Pseudo-obs for Tree 2**: $v_{21} = h(u_2|u_1;\hat{\theta}_{12})$, $v_{31} = h(u_3|u_1;\hat{\theta}_{13})$, $v_{41} = h(u_4|u_1;\hat{\theta}_{14})$; then Tree 2 pair copulas are fitted to $(v_{21},v_{31})$, $(v_{21},v_{41})$.

> [!example] Four-variable D-vine
> **Tree 1**: $(1,2),\, (2,3),\, (3,4)$.
>
> **Tree 2**: $(1,3|2),\, (2,4|3)$.
>
> **Tree 3**: $(1,4|2,3)$.
>
> **Comparison with C-vine**: the D-vine models (1,3) and (2,4) *conditional* on the middle variable, whereas the C-vine models them *conditional only on the root*. The two models have the same number of parameters but encode different conditional independence assumptions.

## Connections

- [[Vine Copulas - Overview]] — the general vine framework, motivation, and notation.
- [[Pair Copula Constructions]] — the mathematical decomposition underlying both C-vines and D-vines; h-function recursion.
- [[Vine vs Factor Copula Comparison]] — how the C-vine (star structure) and D-vine (path structure) contrast with the factor copula's latent-variable approach.
- [[Factor Copulas - Overview]] — the alternative architecture; C-vine root plays the role of the common factor $Z$, but as an observed variable.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is used to select the tree structure in both C-vine and D-vine estimation (pair with highest $\tau$ enters Tree 1 first).

## See Also

- [[Multi-Factor and Block Dependence Structures]] — the factor copula analogue of vine block structures.
- [[SMM Estimation of Factor Copulas]] — estimation method for the alternative factor-copula architecture.
- [[../_Index|Econometrics]]
