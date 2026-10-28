---
title: Vine Copula Estimation and Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - method/r
  - doc/paper
source: "[[raw/dissmann2013-selecting-regular-vine-copulas.md]]"
source_location: "Secs. 3–5, pp. 55–67"
date_ingested: 2026-10-28
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[R-Vine Matrices and Truncated Vines]]"
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Pair-Copula Construction]]"
used_by: []
aliases:
  - Dissmann algorithm
  - VineCopula R package
  - vine structure selection
  - sequential vine MLE
---

# Vine Copula Estimation and Selection

> [!summary]
> Fitting a vine copula requires two interleaved selections: (1) the **vine structure** (which R-vine matrix to use), and (2) the **copula family** for each of the $\binom{d}{2}$ pair-copulas. Aas et al. (2009) propose sequential MLE: estimate pair-copulas tree-by-tree, conditioning on already-estimated parameters. Dissmann et al. (2013) add the **Dissmann greedy algorithm**: select the vine structure tree-by-tree using maximum spanning trees on empirical Kendall's τ, then select families by AIC or BIC. Implemented in the VineCopula R package and pyvinecopulib (Python).

## Overview

Given data $\mathbf{x} = (x^{(1)}, \ldots, x^{(n)})$ from a $d$-dimensional vine copula with unknown structure $\mathcal{V}$, parameter vector $\boldsymbol{\theta}$, and families $\mathcal{F}$, the estimation problem has three components:

| Component | What to choose | Method |
|-----------|---------------|--------|
| **Vine structure** | Which R-vine matrix $M$ | Dissmann greedy algorithm (max spanning tree) |
| **Copula families** | Which parametric family for each pair-copula | AIC / BIC among candidate families |
| **Copula parameters** | $\theta_{ij\|D}$ for each pair-copula | Sequential MLE or joint MLE |

In practice, all three steps are performed simultaneously in a tree-by-tree sweep.

## Main Content

### Step 1: Transform Marginals to Uniform Scale

> [!definition] Pseudo-Observations
> Before fitting the vine, transform the $d$ marginal series to $[0,1]$ by ranking:
> $$\hat{u}_{t,k} = \frac{1}{n+1}\,\text{rank}(x_t^{(k)}) \quad \text{for } k = 1, \ldots, d,\; t = 1, \ldots, n.$$
>
> This is the **probability integral transform** using the empirical CDF. The result $\hat{\mathbf{U}} = \{\hat{u}_{t,k}\}$ is the data on uniform margins — the input to all subsequent copula estimation steps.
>
> Alternatively, fit parametric marginals (e.g., GARCH-filtered returns) and apply the fitted CDF to get $\hat{u}_{t,k} = \hat{F}_k(x_t^{(k)})$. See [[Factor Copula Application - S&P 100 and Systemic Risk]] for the GARCH-filtering approach.
^pseudo-observations

### Step 2: Vine Structure Selection (Dissmann Algorithm)

> [!definition] Dissmann Greedy Algorithm
> **Input:** Pseudo-observations $\hat{\mathbf{U}} \in [0,1]^{n \times d}$.
>
> **For tree $T_1$:**
> 1. Compute the $d \times d$ matrix of pairwise empirical Kendall's τ: $\hat{\tau}_{ij}$ for all $(i,j)$ pairs.
> 2. Construct a **complete weighted graph** $G_1$ with nodes $\{1, \ldots, d\}$ and edge weights $|\hat{\tau}_{ij}|$.
> 3. Find the **maximum spanning tree** of $G_1$ (e.g., Prim's or Kruskal's algorithm). This gives the edge set $E_1$ of tree $T_1$ — the $d-1$ pairs with strongest pairwise dependence.
>
> **For tree $T_j$ (given $T_1, \ldots, T_{j-1}$):**
> 1. The nodes of $T_j$ are the edges $E_{j-1}$.
> 2. Two nodes in $T_j$ can be connected only if they satisfy the **proximity condition** (share a common element in $T_{j-1}$).
> 3. Compute partial Kendall's τ for each eligible pair: $\hat{\tau}_{ij|D}$ using h-function-transformed data from steps $T_1, \ldots, T_{j-1}$.
> 4. Maximum spanning tree on eligible edges, weighted by $|\hat{\tau}_{ij|D}|$.
>
> **Output:** A complete R-vine matrix $M$ and the corresponding conditioning sets.
>
> **Rationale:** Putting the strongest pairwise dependences in early trees ensures that the most important structure is captured even if truncation is applied.
^dissmann-algorithm

### Step 3: Copula Family Selection

> [!definition] Family Selection by AIC / BIC
> For each edge $e$ in the vine (from tree-by-tree selection):
> 1. **Compute the arguments**: $\hat{u}_{e,1}^{(t)}$ and $\hat{u}_{e,2}^{(t)}$ from the h-function recursion on already-estimated trees.
> 2. **Candidate families**: fit each of a candidate set (e.g., Gaussian, Student-$t$, Clayton, Gumbel, Frank, Joe, BB1, BB7, and their 180°-rotations for lower/upper tail alternatives).
> 3. **Select by AIC** (or BIC for sparser models):
>    $$\text{AIC}_{\mathcal{F}} = -2\ell(\hat{\theta}_{\mathcal{F}}) + 2|\mathcal{F}|$$
>    where $\ell$ is the log-likelihood of the pair-copula for family $\mathcal{F}$ with MLE parameter $\hat{\theta}_{\mathcal{F}}$.
> 4. **Independence test**: if the independence copula achieves lower AIC than all alternatives, set $c_{ij|D} \equiv 1$ (automatic truncation of that edge).
^family-selection

### Step 4: Sequential MLE vs. Joint MLE

> [!definition] Sequential Maximum Likelihood (Aas et al. 2009)
> **Sequential MLE** estimates each pair-copula tree-by-tree, conditioning on already-fitted parameters:
>
> **Tree $T_1$:** For each edge $(i,j) \in E_1$, maximize
> $$\hat{\theta}_{ij} = \arg\max_{\theta} \sum_{t=1}^n \log c_{ij}(\hat{u}_{t,i}, \hat{u}_{t,j}; \theta).$$
>
> **Tree $T_2$:** Compute h-function-transformed values
> $$v_{t,ij|k} = h(\hat{u}_{t,i} | \hat{u}_{t,k}; \hat{\theta}_{ik}), \quad w_{t,ij|k} = h(\hat{u}_{t,j} | \hat{u}_{t,k}; \hat{\theta}_{jk}),$$
> and maximize $\sum_t \log c_{ij|k}(v_{t,ij|k}, w_{t,ij|k}; \theta)$.
>
> **Subsequent trees:** Continue recursively, feeding h-function outputs from earlier trees as inputs.
>
> **Properties:** Consistent and $\sqrt{n}$-asymptotically normal (treating earlier estimates as fixed). Not fully efficient relative to joint MLE but computationally tractable for large $d$. The efficiency loss is small in practice.
>
> **Joint MLE:** Maximize the full likelihood simultaneously over all pair-copula parameters. Computationally expensive for $d > 5$; generally not performed in applications.
^sequential-mle

### Software

> [!definition] VineCopula R Package (Schepsmeier et al.)
> The **VineCopula** R package (CRAN) implements the full Dissmann workflow:
> - `RVineStructureSelect()`: greedy structure selection (Dissmann algorithm)
> - `RVineCopSelect()`: copula family selection by AIC/BIC
> - `RVineLogLik()`, `RVineMLE()`: log-likelihood and joint MLE
> - `RVineSimulate()`: simulation via h-function inversion
> - `RVinePIT()`, `RVineGofTest()`: probability integral transform and goodness of fit
>
> Objects: `RVineMatrix` stores the vine matrix $M$, family matrix (integer codes), and parameter matrices.
>
> **Python equivalent:** `pyvinecopulib` provides similar functionality with faster C++ backend; `vinecopula` (statsmodels-adjacent) provides basic vine fitting.
^vinecop-software

### Goodness of Fit

After estimation, assess model fit via:
- **Rosenblatt transform**: apply the fitted vine CDF sequentially to transform data to iid uniform. Test uniformity of the result.
- **White information matrix test**: tests whether the information matrix equality holds (detects model misspecification).
- **Vuong–Clarke test**: compare two nested or non-nested vine models.

## Practical Guidance

1. **Large $d$**: Apply truncation at level $K$ = 3–5. Use `trunc.lvl` in `RVineStructureSelect()`.
2. **Time series**: Pre-filter each marginal with GARCH; apply vine copula to standardized residuals (see [[Factor Copula Application - S&P 100 and Systemic Risk]]).
3. **High dependence**: Start with Student-$t$ copula as the default family (captures tail dependence symmetrically); add Gumbel/Clayton rotations for asymmetric tail behaviour.
4. **Model selection**: BIC generally selects sparser models than AIC; prefer BIC in moderate samples ($n < 500$).

## Connections

- [[R-Vine Matrices and Truncated Vines]] — the vine matrix $M$ is the output of the Dissmann structure selection step.
- [[Pair-Copula Construction]] — sequential MLE evaluates the h-function recursion at each tree level.
- [[C-Vine and D-Vine Structures]] — special-case structures that can be selected by restricting the spanning-tree search.
- [[Dependence Measures for Copulas]] — Kendall's τ is both the tree-selection criterion and a robustness check after estimation.
- [[SMM Estimation of Factor Copulas]] — the competing SMM estimator for factor copulas; vine copulas use likelihood instead of moment matching.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — GARCH-filtered marginals, then a factor copula; the vine alternative would use the same GARCH filter but substitute a vine for the factor copula.

## See Also

- [[Vine Copulas - Overview]] — introductory framework.
- [[../_Index|Econometrics]]
