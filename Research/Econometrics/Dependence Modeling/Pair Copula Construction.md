---
title: "Pair Copula Construction"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - topic/dependence
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-PCC-Survey.md]]"
source_location: "Aas et al. (2009) §2; Bedford & Cooke (2002) §3; Czado (2019) Ch. 3–4"
date_ingested: 2026-07-09
date_updated: 2026-07-09
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-vine and D-vine Structures]]"
  - "[[Vine Copula Estimation and Model Selection]]"
aliases:
  - PCC
  - pair copula
  - conditional copula density
  - h-function
  - simplifying assumption vine
  - regular vine
---

# Pair Copula Construction

> [!summary]
> A **pair copula construction (PCC)** decomposes a $d$-dimensional density into $d$ marginal densities and $d(d-1)/2$ bivariate **conditional copula densities** (pair copulas), arranged in a sequence of nested trees called a **regular vine (R-vine)**. The critical computational device is the **h-function**, which recursively computes conditional CDFs. The **simplifying assumption** — that each conditional pair copula does not depend on the conditioning values, only on the conditioning set — makes estimation tractable. Together these ideas make vine copulas a practically usable architecture for moderate dimensions ($d \leq 50$).

## Overview

Sklar's theorem decomposes a bivariate joint density $f(x_1, x_2) = f_1(x_1) f_2(x_2) c_{12}(F_1(x_1), F_2(x_2))$. In higher dimensions, the same idea requires specifying a $d$-variate copula, which is hard to parameterise flexibly. The pair copula construction avoids this by iteratively conditioning:

$$f(x_1, x_2, x_3) = f_1(x_1)\, f_2(x_2)\, f_3(x_3)\, c_{12}(F_1, F_2)\, c_{13}(F_1, F_3)\, c_{23|1}(F_{2|1}, F_{3|1})$$

Each factor is bivariate, and the conditioning variable ($X_1$ here) serves as an intermediary that decomposes the $3$-dimensional dependence into two tree levels. Generalising this to $d$ variables gives a PCC.

## Main Content

### Density Factorization

> [!definition] Definition: Pair Copula Construction (PCC)
> Let $\mathbf{X} = (X_1, \ldots, X_d)$ be a continuous random vector with joint density $f$, marginals $f_1, \ldots, f_d$, and marginal CDFs $F_1, \ldots, F_d$. A **PCC** represents the joint density as:
> $$f(x_1, \ldots, x_d) = \prod_{i=1}^d f_i(x_i) \cdot \prod_{k=1}^{d-1} \prod_{(j,m|D) \in E_k} c_{jm|D}\!\bigl(F_{j|D}(x_j \mid \mathbf{x}_D),\; F_{m|D}(x_m \mid \mathbf{x}_D)\bigr)$$
> where $E_k$ is the edge set of tree $T_k$, each edge $(j, m|D)$ carries a bivariate copula density $c_{jm|D}$, and $\mathbf{x}_D = \{x_\ell : \ell \in D\}$ is the vector of conditioning values.
^pcc-definition

The product over edges contains exactly $\sum_{k=1}^{d-1}(d-k) = d(d-1)/2$ bivariate copula terms.

### The Simplifying Assumption

> [!definition] Definition: Simplifying Assumption (SA)
> A vine copula satisfies the **simplifying assumption** if every conditional pair copula density $c_{jm|D}(\cdot, \cdot; \mathbf{x}_D)$ does not depend on the value of the conditioning vector $\mathbf{x}_D$:
> $$c_{jm|D}(u, v \mid \mathbf{x}_D) \equiv c_{jm|D}(u, v) \quad \text{for all } \mathbf{x}_D$$
^simplifying-assumption

Under SA, each pair copula is fully parameterised by a bivariate family and its parameters, independently of conditioning values. This collapses an infinite-dimensional specification to a finite-parametric one.

**Validity:** The SA is exact when the vine is Gaussian (since conditional Gaussian copulas don't depend on conditioning values) or $t$ (with equal degrees of freedom). It is an approximation for other families. Czado & Nagler (2022) survey evidence that SA holds approximately in many empirical applications, and develop non-parametric tests for SA violations.

### Regular Vine (R-vine)

> [!definition] Definition: Regular Vine
> A **regular vine** $\mathcal{V} = (T_1, T_2, \ldots, T_{d-1})$ on $d$ elements is a sequence of trees satisfying:
>
> 1. $T_1$ has node set $N_1 = \{1, \ldots, d\}$ and edge set $E_1 \subseteq \binom{N_1}{2}$ with $|E_1| = d-1$.
> 2. For $k \geq 2$: $T_k$ has node set $N_k = E_{k-1}$ (the edges of the previous tree become nodes) and edge set $E_k$ with $|E_k| = d-k$.
> 3. **Proximity condition**: for every edge $\{a, b\} \in E_k$ (where $a, b \in E_{k-1}$), the two edges $a$ and $b$ must share exactly one node in $T_{k-1}$.
^r-vine-definition

The proximity condition ensures that the conditioning set $D(e)$ for each edge $e \in E_k$ has exactly $k-1$ elements.

**Total edges:** $\sum_{k=1}^{d-1}(d-k) = \binom{d}{2}$. Each edge carries one pair copula.

**Notation:** for edge $e = \{a, b\} \in E_k$ where $a = (j, D \cup \{m\})$ and $b = (m, D \cup \{j\})$, the associated pair copula is written $c_{jm|D}$ with conditioning set $D = a \cap b$ (intersection of the two node-sets).

### h-Functions (Conditional CDF Recursion)

> [!definition] Definition: h-function
> For a bivariate copula $C_{12}(u, v; \boldsymbol{\theta})$ with density $c_{12}$, the **h-function** is the conditional CDF of $U_2$ given $U_1 = u$:
> $$h(v \mid u; \boldsymbol{\theta}) = \frac{\partial C_{12}(u, v; \boldsymbol{\theta})}{\partial u} = \Pr(U_2 \leq v \mid U_1 = u)$$
> This equals $F_{2|1}(x_2 \mid x_1)$ when $u = F_1(x_1)$, $v = F_2(x_2)$.
^h-function

**Recursive computation of conditional CDFs:**

Given the h-functions for all $T_1$ pair copulas, the conditional CDFs at tree $T_2$ are:
$$F_{j|D\cup\{m\}}(x_j \mid \mathbf{x}_{D\cup\{m\}}) = h\!\bigl(F_{j|D}(x_j|\mathbf{x}_D) \mid F_{m|D}(x_m|\mathbf{x}_D);\; \boldsymbol{\theta}_{jm|D}\bigr)$$

This recursion propagates from $T_1$ upward: h-functions from $T_k$ give conditional CDFs needed for $T_{k+1}$. The h-function is the computational workhorse — each bivariate copula family has a closed-form h-function.

**Examples:**

| Family | $h(v \mid u; \theta)$ |
|--------|----------------------|
| Gaussian $(\rho)$ | $\Phi\!\left(\frac{\Phi^{-1}(v) - \rho\,\Phi^{-1}(u)}{\sqrt{1-\rho^2}}\right)$ |
| Clayton $(\delta)$ | $u^{-\delta-1}(u^{-\delta}+v^{-\delta}-1)^{-1-1/\delta}$ |
| Gumbel $(\delta)$ | $C_G(u,v;\delta)\cdot \frac{(-\log u)^{\delta-1}}{u[(-\log u)^{\delta}+(-\log v)^{\delta}]^{1-1/\delta}}$ |

### Pair Copula Families

The bivariate copula at each edge can be any bivariate family:

> [!definition] Common pair copula families
>
> | Family | Params | $\tau^U$ (upper tail) | $\tau^L$ (lower tail) | Notes |
> |--------|--------|-----------------------|-----------------------|-------|
> | Gaussian | $\rho \in (-1,1)$ | $0$ | $0$ | Benchmark; symmetric |
> | Student-$t(\rho, \nu)$ | $\rho$, $\nu$ | $> 0$ | $= \tau^U$ | Symmetric tails; $\nu \to \infty$ → Gaussian |
> | Clayton $(\delta > 0)$ | $\delta$ | $0$ | $> 0$ | Left-tail clustering |
> | Gumbel $(\delta \geq 1)$ | $\delta$ | $> 0$ | $0$ | Right-tail clustering; max-stable |
> | Frank $(|\delta| > 0)$ | $\delta$ | $0$ | $0$ | Symmetric; no tail dependence |
> | Joe $(\delta \geq 1)$ | $\delta$ | $> 0$ | $0$ | Strong right tail |
> | Survival Clayton | $\delta$ | $> 0$ | $0$ | Rotated Clayton (upper tail) |
>
> **Mixed vine**: different families can be selected at each edge independently — this is what makes vine copulas far more flexible than any single-family multivariate copula.
^pair-families

## Examples

> [!example] Trivariate density decomposition
> For $d=3$, any R-vine has $T_1$ with two edges and $T_2$ with one edge. Labelling $T_1$ edges as $(1,2)$ and $(1,3)$ (C-vine with root 1):
>
> **Step 1:** $T_1$ pair copulas:
> $$c_{12}(F_1(x_1), F_2(x_2)) \quad \text{and} \quad c_{13}(F_1(x_1), F_3(x_3))$$
>
> **Step 2:** Compute $F_{2|1}(x_2|x_1) = h(F_2(x_2)|F_1(x_1); \theta_{12})$ and $F_{3|1}(x_3|x_1) = h(F_3(x_3)|F_1(x_1); \theta_{13})$.
>
> **Step 3:** $T_2$ pair copula:
> $$c_{23|1}(F_{2|1}(x_2|x_1),\; F_{3|1}(x_3|x_1))$$
>
> **Full density:**
> $$f(x_1,x_2,x_3) = f_1 f_2 f_3 \cdot c_{12} \cdot c_{13} \cdot c_{23|1}$$
>
> **Total pair copulas:** 3 = $\binom{3}{2}$. ✓
^trivariate-example

## Connections

- [[Vine Copulas - Overview]] — motivation, history, high-level comparison with alternatives.
- [[C-vine and D-vine Structures]] — the C-vine and D-vine as canonical R-vine special cases, with full $d=4$ tree diagrams.
- [[Vine Copula Estimation and Model Selection]] — how to estimate the pair copula parameters and select the vine structure using h-functions.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$, Spearman's $\rho$, tail dependence coefficients ($\tau^U$, $\tau^L$) used in structure selection.
- [[Tail Dependence in Factor Copulas]] — tail dependence in the rival factor copula architecture; contrast with the pair-specific tail dependence in vine copulas.
- [[Bayesian copula estimation Describing correlated joint distributions]] — contrast: Bayesian Gaussian copula uses a single multivariate Gaussian copula rather than the vine decomposition.

## See Also

- [[Factor Copula Construction]] — the alternative latent-factor approach; closed form only for all-Gaussian; simulation-based otherwise.
- [[Copula Architecture Comparison]] — systematic comparison of copula families across the dimension-flexibility trade-off.
