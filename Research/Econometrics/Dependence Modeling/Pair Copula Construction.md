---
title: Pair Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - topic/dependence-modeling
  - type/concept
  - doc/paper
source: "[[raw/Vine-PairCopula-Survey.md]]"
source_location: "Aas et al. (2009), Secs. 2-3, pp. 184-192"
date_ingested: 2026-10-20
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Model Selection]]"
aliases:
  - PCC
  - h-function
  - sequential vine estimation
  - conditional copula CDF
---

# Pair Copula Construction

> [!summary]
> The pair-copula construction (Aas et al. 2009) makes the Bedford-Cooke vine density computable by defining **h-functions** — the partial derivatives of pair copulas — as closed-form recursions for conditional CDFs. The sequential maximum-likelihood algorithm uses these to traverse the vine tree-by-tree, fitting each pair copula on pseudo-observations obtained from the previous level. The key simplifying assumption makes all this tractable.

## Overview

The vine density decomposition theorem ([[Vine Copulas - Overview#^thm-vine-density]]) is exact but requires evaluating conditional CDFs $F_{a|D}$ at every node. For bivariate copulas these can be computed analytically via partial derivatives: the **h-function**. Aas et al. (2009) derive h-functions for every standard parametric family and show how to chain them to reach arbitrarily deep conditioning sets. This machinery converts the abstract vine representation into a concrete numerical algorithm.

## Main Content

> [!definition] Definition: H-function (Aas et al. 2009)
> For a bivariate copula $C_{12}(u_1, u_2; \boldsymbol{\theta})$ the two **h-functions** are:
> $$h_{1|2}(u_1, u_2; \boldsymbol{\theta}) \;=\; \frac{\partial C_{12}(u_1, u_2; \boldsymbol{\theta})}{\partial u_2}$$
> $$h_{2|1}(u_2, u_1; \boldsymbol{\theta}) \;=\; \frac{\partial C_{12}(u_1, u_2; \boldsymbol{\theta})}{\partial u_1}$$
>
> **Interpretation:** $h_{1|2}(u_1, u_2)$ is the conditional CDF of $U_1$ given $U_2 = u_2$, i.e. $P(U_1 \leq u_1 \mid U_2 = u_2)$, for a pair with joint distribution $C_{12}$. It maps $[0,1]^2 \to [0,1]$ and is itself a valid CDF in $u_1$ for each fixed $u_2$.
^def-h-function

> [!example] H-functions for common families
>
> | Family | $h_{1|2}(u_1,u_2;\theta)$ | Tail dep. $\tau^U, \tau^L$ |
> |---|---|---|
> | **Gaussian** | $\Phi\!\left(\frac{\Phi^{-1}(u_1)-\theta\Phi^{-1}(u_2)}{\sqrt{1-\theta^2}}\right)$ | 0, 0 |
> | **Student $t_\nu$** | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u_1)-\theta t_\nu^{-1}(u_2)}{\sqrt{(1-\theta^2)(\nu+(t_\nu^{-1}(u_2))^2)/(\nu+1)}}\right)$ | $>0$, $>0$ (symmetric) |
> | **Clayton** | $u_2^{-\theta-1}\!\left(u_1^{-\theta}+u_2^{-\theta}-1\right)^{-1-1/\theta}$ | 0, $2^{-1/\theta}>0$ |
> | **Gumbel** | $C_{12}\cdot u_2^{-1}(-\ln u_2)^{\theta-1}(-\ln u_1-\ln u_2)^{1/\theta-1}\cdot(-\ln C_{12})^{-1+1/\theta}$ | $2-2^{1/\theta}>0$, 0 |
> | **Frank** | $\frac{(e^{-\theta u_2}-1)(e^{-\theta u_1}-1)}{(e^{-\theta u_1}-1)(e^{-\theta u_2}-1)+(e^{-\theta}-1)}$ | 0, 0 |
>
> Clayton and survival-Clayton pair gives asymmetric lower/upper tail dependence; Gumbel and survival-Gumbel give upper/lower respectively; $t$ gives symmetric tail dependence — the practitioner selects the family that matches the data's tail behaviour.
^example-h-functions

> [!definition] Recursive construction of conditional CDFs
> For a conditioning set $D = \{k\} \cup D'$ (with $D' = D\setminus\{k\}$, possibly empty), the conditional CDF $F_{a|D}$ is computed recursively:
> $$F_{a|D}(x_a \mid \mathbf{x}_D) = h_{a|k;D'}\!\left(F_{a|D'}(x_a \mid \mathbf{x}_{D'}),\; F_{k|D'}(x_k \mid \mathbf{x}_{D'})\right)$$
>
> where $h_{a|k;D'}$ is the h-function of the pair copula $C_{ak|D'}$ on the edge $(a,k|D')$.
>
> **For $|D|=0$:** $F_{a|\emptyset} = F_a(x_a)$ — the marginal CDF.
> **For $|D|=1$, $D=\{k\}$:** $F_{a|\{k\}} = h_{a|k}(F_a, F_k)$ using the T1 pair copula.
> **For $|D|=2$, $D=\{j,k\}$:** computed from the T1 and T2 pair copulas.
>
> This recursive structure is why the vine must be traversed from $T_1$ upward.
^def-recursive-cdf

> [!definition] The Simplifying Assumption (SA)
> The exact conditional copula $C_{ab|D}(\,\cdot\,|\,\mathbf{x}_D)$ depends on the realized conditioning values $\mathbf{x}_D$. The **simplifying assumption** replaces it with a copula $C_{ab|D}$ whose parameters $\boldsymbol{\theta}_{ab|D}$ do **not** depend on $\mathbf{x}_D$:
> $$c_{ab|D}\!\left(F_{a|D},F_{b|D};\boldsymbol{\theta}_{ab|D}\right) \approx c_{ab|D}\!\left(F_{a|D},F_{b|D};\boldsymbol{\theta}_{ab|D}\right)\quad\text{(parameters constant)}$$
>
> Under the SA: pair copulas in deeper trees are genuine bivariate copulas with scalar parameters, not parameter functions of conditioning values.
>
> **When it fails:** The SA is violated if conditional dependence between $X_a$ and $X_b$ genuinely changes with the values of $\mathbf{X}_D$ (e.g. heteroskedastic financial returns conditional on a crisis indicator). Tests exist (Acar, Genest & Neslehova 2012; Spanhel & Kurz 2019).
^def-simplifying-assumption

> [!theorem] Sequential Maximum-Likelihood Estimation (Aas et al. 2009, §4)
> **Algorithm (D-vine, generalises to C-vine/R-vine):**
>
> **Input:** $n$ observations $\mathbf{x}_i = (x_{i1},\ldots,x_{id})$, marginals $\hat F_k$ (estimated nonparametrically by scaled ranks or parametrically).
>
> **Step 0 (pseudo-observations):** $v_{ij}^{(0)} = \hat F_j(x_{ij})$ for $j=1,\ldots,d$; $i=1,\ldots,n$.
>
> **For each tree level $k = 1, \ldots, d-1$:**
> 1. For each edge $e = (a,b|D) \in E_k$: maximise the pair-copula log-likelihood over parameters $\boldsymbol{\theta}_e$:
>    $$\hat{\boldsymbol{\theta}}_e = \arg\max_{\boldsymbol{\theta}} \sum_{i=1}^n \ln c_{ab|D}\!\left(v_{ia|D}^{(k-1)},\,v_{ib|D}^{(k-1)};\,\boldsymbol{\theta}\right)$$
> 2. Compute updated pseudo-observations for the next tree using h-functions:
>    $$v_{ia|b,D}^{(k)} = h_{a|b;D}\!\left(v_{ia|D}^{(k-1)},\,v_{ib|D}^{(k-1)};\,\hat{\boldsymbol{\theta}}_e\right)$$
>
> **Output:** $d(d-1)/2$ fitted pair copulas; full joint density via the decomposition theorem.
>
> **Properties:** Sequential MLE is consistent and asymptotically normal (Hobæk Haff 2013). It is not fully efficient but much faster than joint MLE across all trees.
^thm-sequential-mle

## Examples

> [!example] 4-variable D-vine — full density
> Variables ordered $1-2-3-4$. Total pair copulas: $4\times3/2 = 6$.
>
> **Tree $T_1$ (3 edges, conditioning set $\emptyset$):**
> $c_{12}$, $c_{23}$, $c_{34}$
>
> **Tree $T_2$ (2 edges, $|D|=1$):**
> $c_{13|2}$, $c_{24|3}$
>
> **Tree $T_3$ (1 edge, $|D|=2$):**
> $c_{14|23}$
>
> **Full density:**
> $$f = f_1 f_2 f_3 f_4 \cdot c_{12} c_{23} c_{34} \cdot c_{13|2}\, c_{24|3} \cdot c_{14|23}$$
>
> The pair copula $c_{14|23}$ at $T_3$ captures the residual dependence between $X_1$ and $X_4$ after removing all dependence mediated through $X_2$ and $X_3$. For many financial datasets this is near-independence, making a parsimonious Gaussian copula a reasonable choice at deeper trees.

> [!example] Applying SML — step-by-step for 4-variable D-vine
>
> 1. Compute scaled ranks $v_{ij} = \text{rank}(x_{ij})/(n+1)$ as pseudo-observations.
> 2. **$T_1$:** Fit $c_{12}$ on $(v_{i1},v_{i2})$; $c_{23}$ on $(v_{i2},v_{i3})$; $c_{34}$ on $(v_{i3},v_{i4})$. For each, try Gaussian/Clayton/Gumbel/$t$ and select by AIC.
> 3. **Compute $T_2$ inputs:**
>    - $v_{i1|2} = h_{1|2}(v_{i1},v_{i2};\hat\theta_{12})$; $v_{i3|2} = h_{3|2}(v_{i3},v_{i2};\hat\theta_{23})$
>    - $v_{i2|3} = h_{2|3}(v_{i2},v_{i3};\hat\theta_{23})$; $v_{i4|3} = h_{4|3}(v_{i4},v_{i3};\hat\theta_{34})$
> 4. **$T_2$:** Fit $c_{13|2}$ on $(v_{i1|2}, v_{i3|2})$; $c_{24|3}$ on $(v_{i2|3},v_{i4|3})$.
> 5. **Compute $T_3$ inputs:**
>    - $v_{i1|23} = h_{1|3;2}(v_{i1|2}, v_{i3|2}; \hat\theta_{13|2})$
>    - $v_{i4|23} = h_{4|2;3}(v_{i4|3}, v_{i2|3}; \hat\theta_{24|3})$
> 6. **$T_3$:** Fit $c_{14|23}$ on $(v_{i1|23}, v_{i4|23})$.

## Connections

- [[Vine Copulas - Overview]] — the density decomposition this algorithm evaluates.
- [[C-Vine and D-Vine Structures]] — how the tree structure determines which pairs appear at which conditioning depth, governing the order of h-function computations.
- [[Vine Model Selection]] — the family-selection step (AIC/BIC at each edge) and the tree-structure selection that determines the ordering.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ for each pair copula; the empirical $\hat\tau$ informs family selection (e.g. $\hat\tau > 0$ and heavy lower tail $\Rightarrow$ Clayton; $\hat\tau > 0$ and heavy upper tail $\Rightarrow$ Gumbel).
- [[SMM Estimation of Factor Copulas]] — contrast: factor copulas use SMM on rank statistics; vines use SML on pseudo-observations. Both are semiparametric (marginals estimated separately).

## See Also

- [[Vine Copulas - Overview]] — the big picture and motivation
- [[C-Vine and D-Vine Structures]] — which tree shapes affect estimation order
