---
title: Pair-Copula Construction
tags:
  - source/ingested
  - topic/econometrics
  - type/definition
  - doc/paper
source: "[[raw/Vine-Copulas-Aas-Czado-Survey.md]]"
source_location: "Secs. 4-5 (Aas et al. 2009)"
date_ingested: 2026-08-06
date_updated: 2026-08-06
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
used_by:
  - "[[C-Vine and D-Vine Structures]]"
  - "[[Vine Copula vs Factor Copula]]"
aliases:
  - PCC
  - pair copula construction
  - h-function vine copula
  - IFM vine estimation
  - sequential vine estimation
---

# Pair-Copula Construction

> [!summary]
> The pair-copula construction (PCC) algorithm, operationalized by Aas et al. (2009), turns the Bedford-Cooke vine theory into a practical estimation procedure. The **h-function** propagates conditional CDFs between vine tree levels; **sequential (IFM) estimation** fits one pair-copula at a time, tree by tree; and **copula family selection** at each edge — from Gaussian, Student-$t$, Clayton, Gumbel, Frank — produces a fully heterogeneous high-dimensional model. The entire procedure is implemented in the VineCopula R package and pyvinecopulib Python package.

## Overview

Given a regular vine structure $\mathcal{V} = (T_1, \ldots, T_{n-1})$ and the simplifying assumption, the joint density is a product of pair-copula densities evaluated at transformed pseudo-observations. The central computational challenge is computing these transformations: to fit pair-copulas in tree $T_k$, one needs conditional CDFs $F(x_i | x_{D})$ where $D$ is the conditioning set of tree $k-1$. The **h-function** solves this by expressing the conditional CDF in terms of already-fitted lower-tree pair-copulas.

Aas et al. (2009) showed how to cascade h-functions sequentially and developed the IFM estimator for the PCC. They focused on C-vines and D-vines (see [[C-Vine and D-Vine Structures]]) because these structures admit simpler h-function recursions — the generalization to R-vines was provided by Dißmann et al. (2013).

## Main Content

> [!definition] The h-function (conditional CDF via pair-copula)
> Given a bivariate copula $C_{12}(u_1, u_2; \boldsymbol{\theta})$, define the **h-function**:
> $$h_{1|2}(u_1, u_2; \boldsymbol{\theta}) \;=\; \frac{\partial C_{12}(u_1, u_2; \boldsymbol{\theta})}{\partial u_2}$$
> This is the conditional CDF of $U_1$ given $U_2 = u_2$: $h_{1|2}(u_1|u_2) = F(U_1 \leq u_1 \mid U_2 = u_2)$.
>
> **Role in vine estimation:** If $U_1 = F_1(X_1)$ and $U_2 = F_2(X_2)$, then $h_{1|2}(F_1(x_1), F_2(x_2))$ is the conditional CDF $F(x_1 | x_2)$ under the pair-copula model for $(X_1, X_2)$. Applying this repeatedly through tree levels converts joint observations to **pseudo-observations** for conditional pairs in higher trees.
>
> **Closed-form h-functions for common copulas:**
>
> | Copula | $h_{1|2}(u,v;\boldsymbol{\theta})$ |
> |--------|------------------------------------|
> | Gaussian($\rho$) | $\Phi\!\left(\frac{\Phi^{-1}(u) - \rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | Student-$t$($\rho,\nu$) | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u) - \rho\,t_\nu^{-1}(v)}{\sqrt{(1-\rho^2)(\nu + t_\nu^{-1}(v)^2)/(\nu+1)}}\right)$ |
> | Clayton($\theta$) | $u^{-\theta-1}\left(u^{-\theta} + v^{-\theta} - 1\right)^{-1-1/\theta}$ |
> | Gumbel($\theta$) | $C_\theta(u,v) \cdot v^{-1} \cdot \frac{(-\ln v)^{\theta-1}}{(-\ln u)^\theta + (-\ln v)^\theta}^{(\theta-1)/\theta}$ |
^h-function-def

> [!definition] Sequential (IFM) estimation of a vine copula (Aas et al. 2009)
> Given $n$ variables and $T$ observations:
>
> **Step 0 — Pseudo-observations:**
> Estimate marginals $\hat{F}_k$ (parametric or empirical: $\hat{F}_k(x) = \text{rank}(x)/(T+1)$). Set $u_{t,k}^{(0)} = \hat{F}_k(x_{t,k})$ for all $t,k$.
>
> **Step 1 — Tree $T_1$:**
> For each edge $(a,b)$ in $T_1$: estimate pair-copula $\hat{c}_{ab}$ by maximizing the log-likelihood
> $$\sum_{t=1}^{T} \log c_{ab}\!\left(u_{t,a}^{(0)},\, u_{t,b}^{(0)};\, \boldsymbol{\theta}_{ab}\right)$$
> over the chosen copula family for this edge.
>
> **Step 1 — Compute h-values for $T_2$:**
> For each fitted pair-copula $(a,b)$ in $T_1$, compute forward and backward h-values:
> $$u_{t,a|b}^{(1)} = h_{a|b}\!\left(u_{t,a}^{(0)},\, u_{t,b}^{(0)};\, \hat{\boldsymbol{\theta}}_{ab}\right), \quad u_{t,b|a}^{(1)} = h_{b|a}\!\left(u_{t,b}^{(0)},\, u_{t,a}^{(0)};\, \hat{\boldsymbol{\theta}}_{ab}\right)$$
>
> **Step 2 — Tree $T_2$:**
> For each edge $(a,b|c)$ in $T_2$: the pseudo-observations are $\left(u_{t,a|c}^{(1)},\, u_{t,b|c}^{(1)}\right)$ — the h-values computed in the previous step, using the edge in $T_1$ that connects to $c$. Maximize the log-likelihood over the family for this edge.
>
> **Repeat** for trees $T_3, \ldots, T_{n-1}$, always using h-values from the previous tree level.
>
> **Note:** This is a **sequential** (not joint) estimator. Parameter uncertainty does not propagate between stages. Full ML maximizes the joint log-likelihood simultaneously but requires $O(n^2)$ h-function evaluations per iteration.
^sequential-estimation

> [!definition] Copula family selection at each edge
> At each edge, the analyst selects a bivariate copula family from a candidate set. Each family has different tail properties:
>
> | Family | Tail Dependence | Typical Use |
> |--------|----------------|-------------|
> | Gaussian | None ($\lambda_L = \lambda_U = 0$) | Near-independence or symmetric moderate dependence |
> | Student-$t(\rho,\nu)$ | Symmetric: $\lambda_U = \lambda_L > 0$ (from $\nu$) | Symmetric co-movement with tail risk |
> | Clayton($\theta$) | Lower tail ($\lambda_L > 0$, $\lambda_U = 0$) | Co-crashes only |
> | Gumbel($\theta$) | Upper tail ($\lambda_U > 0$, $\lambda_L = 0$) | Co-booms only |
> | Frank($\theta$) | None | S-shaped dependence, flexible sign |
> | BB1, BB7 | Both tails (asymmetric) | Simultaneous asymmetric tail risk |
> | Rotated variants | Opposite tail from original | E.g. 90°-rotated Clayton: upper-tail only |
>
> Selection is typically by AIC/BIC within each edge's log-likelihood (after IFM Stage $k$), or by a likelihood ratio test against independence ($c = 1$). The **independence copula** ($c_{ab|\boldsymbol{D}} \equiv 1$) is used when the edge is not significant — this implements a **truncated vine** at that tree level.
^family-selection

> [!definition] Tree structure selection (Dißmann et al. 2013)
> For a general R-vine (not pre-specified as C or D), a greedy maximum spanning tree algorithm selects the structure:
>
> 1. Compute $|\hat{\tau}_{ab}|$ (absolute Kendall's $\tau$) for all $\binom{n}{2}$ variable pairs.
> 2. **Select $T_1$** as the **maximum spanning tree** on the complete graph with edge weights $|\hat{\tau}_{ab}|$.
>    This captures the $n-1$ strongest unconditional pairwise dependencies.
> 3. **Compute conditional** $\hat{\tau}$ for all eligible $T_2$ edges: for edge $(a,b|c)$ eligible in $T_2$, compute the empirical Kendall's $\tau$ of the pseudo-observations $\{(u_{t,a|c}, u_{t,b|c})\}$.
> 4. **Select $T_2$** as the maximum spanning tree on eligible edges with weights $|\hat{\tau}_{ab|c}|$.
> 5. Repeat for $T_3, \ldots, T_{n-1}$.
>
> **Rationale:** Modeling the strongest dependences unconditionally (in $T_1$) maximizes likelihood gain per parameter; conditional dependences in higher trees are weaker (closer to zero), making truncation at tree $m$ a natural simplification.
^tree-selection

## Examples

> [!example] Bivariate vine (n=2)
> **Setup:** One pair, one tree $T_1$ with one edge $(1,2)$.
> **Result:** The vine reduces to a single bivariate copula $c_{12}(F_1(x_1), F_2(x_2))$. No h-functions needed.

> [!example] Trivariate C-vine (n=3)
> **Setup:** Variables $X_1, X_2, X_3$. Tree $T_1$: star rooted at $X_1$ — edges $(1,2)$ and $(1,3)$. Tree $T_2$: edge $(2,3|1)$.
>
> **Pair-copulas:**
> - $T_1$: $c_{12}(u_1, u_2)$ and $c_{13}(u_1, u_3)$.
> - $T_2$: $c_{23|1}(h_{2|1}(u_2,u_1),\, h_{3|1}(u_3,u_1))$.
>
> **IFM steps:**
> 1. Fit $c_{12}$ and $c_{13}$ on pseudo-observations $(u_{t,1}, u_{t,2})$ and $(u_{t,1}, u_{t,3})$.
> 2. Compute $v_{t,2|1} = h_{2|1}(u_{t,2}, u_{t,1}; \hat{\boldsymbol{\theta}}_{12})$ and $v_{t,3|1} = h_{3|1}(u_{t,3}, u_{t,1}; \hat{\boldsymbol{\theta}}_{13})$.
> 3. Fit $c_{23|1}$ on pseudo-observations $(v_{t,2|1}, v_{t,3|1})$.
>
> **Joint density:**
> $$f(x_1,x_2,x_3) = f_1 f_2 f_3 \cdot c_{12}(u_1,u_2) \cdot c_{13}(u_1,u_3) \cdot c_{23|1}(h_{2|1}(u_2,u_1),\, h_{3|1}(u_3,u_1))$$

## Connections

- [[Vine Copulas - Overview]] — the conceptual foundation: why PCCs arise, the vine graphical representation, the simplifying assumption.
- [[C-Vine and D-Vine Structures]] — the two special vine types with simplified h-function recursions.
- [[Vine Copula vs Factor Copula]] — comparison of the PCC approach with the latent factor construction.
- [[SMM Estimation of Factor Copulas]] — the SMM alternative to IFM: when no closed-form h-function exists (factor copulas), simulation-based moments replace sequential likelihood estimation.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is both an IFM moment condition and the weight for tree structure selection in Dißmann's algorithm.
- [[Tail Dependence in Factor Copulas]] — the EVT-based tail dependence coefficients; for vine copulas, tail dependence is edge-specific, determined by the pair-copula family at each edge.

## See Also

- [[Copula Estimation]] — Bayesian Gaussian copula estimation via PyMC; the IFM estimator here is the frequentist analogue.
- [[../_Index|Dependence Modeling]]
