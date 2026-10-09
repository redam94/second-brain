---
title: "Vine Copula Estimation and Selection"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/concept
  - doc/paper
  - method/r
source: "[[raw/vine-copula-sources.md]]"
source_location: "Aas et al. (2009) §3-4; Dißmann et al. (2013) §2-3; Brechmann & Schepsmeier (2013)"
date_ingested: 2026-10-09
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[C-vine and D-vine Structures]]"
  - "[[Dependence Measures for Copulas]]"
used_by:
  - "[[Copula Architecture Comparison]]"
  - "[[Factor Copula Application - S&P 100 and Systemic Risk]]"
aliases:
  - vine copula MLE
  - h-function copula
  - Dissmann structure selection
  - vine structure selection
---

# Vine Copula Estimation and Selection

> [!summary]
> Vine copula estimation proceeds in two stages: (1) **structure selection** — choosing which R-vine tree sequence to use, typically via a greedy maximum-spanning-tree algorithm on Kendall's $\tau$ (Dißmann et al. 2013); (2) **parameter estimation** — fitting the bivariate copula at each edge by sequential or joint maximum likelihood. The key computational primitive is the **h-function**, the conditional CDF derived from a bivariate copula, which propagates pseudo-observations from one tree to the next.

## Overview

Estimation of a vine copula faces two nested choices:
1. **Structure**: which R-vine? (Which trees $T_1,\ldots,T_{n-1}$?)
2. **Families and parameters**: which bivariate copula family (Normal, $t$, Clayton, Gumbel, …) and what parameter values for each edge?

Aas et al. (2009) addressed estimation for C- and D-vines with a known structure. Dißmann et al. (2013) extended this to general R-vines with a greedy structure-selection algorithm. The R packages **CDVine** (Brechmann & Schepsmeier 2013) and its successor **VineCopula** implement both.

## Main Content

### The h-function

> [!definition] h-function (conditional CDF from a bivariate copula)
> For a bivariate copula $C_{UV}(u,v;\theta)$ with parameter $\theta$, the **h-function** is the conditional CDF of $U$ given $V = v$:
> $$
> h(u \mid v;\, \theta) \;=\; \Pr(U \le u \mid V = v) \;=\; \frac{\partial C(u,v;\theta)}{\partial v}
> $$
> The **inverse h-function** $h^{-1}$ solves for $u$ given $h(u|v;\theta) = p$.
>
> **Role in vine estimation:** Starting from pseudo-observations $(u_1,\ldots,u_n)$ at tree $T_1$, the h-function propagates transformed observations to each successive tree:
> - Input to pair copula $c_{a,b|D}$ at tree $T_j$: the vectors $h(\,\cdot\, | u_D; c_{aD'})$ and $h(\,\cdot\, | u_D; c_{bD'})$ where $D'$ is the relevant subset of $D$.
> - This propagation is applied recursively; each tree receives h-function outputs from the previous tree.
>
> **Closed forms for common families:**
>
> | Family | $C(u,v;\theta)$ | $h(u|v;\theta) = \partial C/\partial v$ |
> |--------|----------------|----------------------------------------|
> | Normal($\rho$) | $\Phi_2(\Phi^{-1}(u),\Phi^{-1}(v);\rho)$ | $\Phi\!\left(\frac{\Phi^{-1}(u)-\rho\,\Phi^{-1}(v)}{\sqrt{1-\rho^2}}\right)$ |
> | $t(\rho,\nu)$ | $t_{2,\nu}(t_\nu^{-1}(u), t_\nu^{-1}(v); \rho)$ | $t_{\nu+1}\!\left(\frac{t_\nu^{-1}(u)-\rho\,t_\nu^{-1}(v)}{\sqrt{(\nu+(t_\nu^{-1}(v))^2)(1-\rho^2)/(\nu+1)}}\right)$ |
> | Clayton($\theta$) | $(u^{-\theta}+v^{-\theta}-1)^{-1/\theta}$ | $v^{-\theta-1}(u^{-\theta}+v^{-\theta}-1)^{-1/\theta-1}$ |
> | Gumbel($\theta$) | $\exp\!\left(-\left((-\ln u)^\theta+(-\ln v)^\theta\right)^{1/\theta}\right)$ | $C(u,v)/v \cdot \frac{(-\ln v)^{\theta-1}}{((-\ln u)^\theta+(-\ln v)^\theta)^{1-1/\theta}}$ |
^def-hfunc

---

### Sequential Maximum Likelihood Estimation

> [!definition] Sequential MLE for vine copulas (Aas et al. 2009)
> Given a fixed vine structure, **sequential MLE** estimates pair copulas tree by tree, from $T_1$ upward:
>
> **Step 0.** Fit univariate marginals $\hat{F}_i$ (parametric or empirical). Compute pseudo-observations $\hat{u}_i = \hat{F}_i(x_i)$ (or use empirical ranks: $\hat{u}_{it} = \text{rank}(x_{it})/(n+1)$).
>
> **Step 1 ($T_1$).** For each edge $(a,b) \in E_1$: maximize $\ell_{ab}(\theta) = \sum_t \log c_{ab}(\hat{u}_{at}, \hat{u}_{bt}; \theta)$ over $\theta$ within the chosen family. Compute $v_{ab,t} = h(\hat{u}_{at}|\hat{u}_{bt};\hat{\theta}_{ab})$ for all $t$; these become the "pseudo-observations" for $T_2$.
>
> **Step $j$ ($T_j$, $j \ge 2$).** For each edge $(a,b|D) \in E_j$: the pseudo-observations are h-function outputs computed at step $j-1$. Maximize $\ell_{ab|D}(\theta) = \sum_t \log c_{ab|D}(v_{aD,t}, v_{bD,t}; \theta)$. Compute h-function outputs $v_{(a,b|D),t}$ for use at step $j+1$.
>
> **Properties:** Sequential MLE is **consistent** and **asymptotically normal** under standard regularity conditions (Joe 2005). It is **not fully efficient** relative to joint MLE (which maximises the full joint log-likelihood simultaneously), but is vastly faster and provides good starting values for joint MLE.
^def-seq-mle

> [!definition] Joint MLE
> **Joint MLE** maximises the full vine log-likelihood simultaneously over all pair-copula parameters:
> $$\hat{\boldsymbol{\theta}} = \arg\max_{\boldsymbol{\theta}} \sum_{t=1}^T \log f(\mathbf{x}_t; \boldsymbol{\theta}, \mathcal{V})$$
> where $f$ is the vine density evaluated using h-function recursions. The gradient is computed by differentiating through the h-function chain; automatic differentiation (as used in Stan/PyMC) simplifies this.
>
> Joint MLE is **fully efficient** but computationally expensive for large $n$. The standard workflow uses sequential MLE as initialisation and then refines with joint MLE when the dimension is moderate ($n \le 20$).
^def-joint-mle

---

### Bivariate Copula Family Selection

> [!definition] AIC-based family selection (per edge)
> For each edge, a candidate set of bivariate copula families is evaluated and the family with lowest AIC is selected:
> $$
> \text{AIC}_k = -2\,\hat{\ell}_k + 2\,p_k
> $$
> where $\hat{\ell}_k$ is the maximised log-likelihood for family $k$ and $p_k$ is the parameter count.
>
> **Standard candidate families** (Czado 2019, Ch. 3):
>
> | Family | $p_k$ | Tail dependence | Note |
> |--------|--------|-----------------|------|
> | Normal (Gaussian) | 1 | None | Symmetric, no tail dep. |
> | $t$ (Student) | 2 | Symmetric $\tau^U = \tau^L$ | Heavy-tailed both sides |
> | Clayton | 1 | Lower only | Good for left-tail risk |
> | Gumbel | 1 | Upper only | Good for right-tail co-movement |
> | Frank | 1 | None | Symmetric, mid-range dep. |
> | Joe | 1 | Upper only | Stronger upper tail than Gumbel |
> | Independence | 0 | None | For vine truncation |
> | 90°/270° rotations | 1 | Upper/lower only | Clayton/Joe with reversed tail |
>
> BIC is also used as a more parsimonious alternative. The Vuong test can compare non-nested families; the Clarke test provides a formal likelihood-ratio approach (Czado 2019, Ch. 8).
^def-family-selection

---

### Structure Selection

> [!definition] Dißmann et al. (2013) greedy structure-selection algorithm
> Since the number of distinct R-vines grows super-exponentially in $n$, exhaustive structure search is infeasible for $n > 5$. Dißmann et al. (2013) propose a greedy algorithm that builds the vine tree by tree, each time maximising the sum of absolute (conditional) Kendall's $\tau$ over the chosen edges.
>
> **Algorithm:**
> 1. Compute $|\hat{\tau}_{ij}|$ for all variable pairs $(i,j)$. Build complete graph $K_n$ with weights $|\hat{\tau}_{ij}|$.
> 2. **$T_1$:** Find the maximum-weight spanning tree of $K_n$ (Prim's or Kruskal's algorithm). This captures the $n-1$ strongest marginal pairwise dependencies.
> 3. **Fit $T_1$ pair copulas:** For each edge $(a,b) \in E_1$, select family and estimate parameters (Step 1 above). Compute all h-function outputs.
> 4. **$T_2$:** Build the **proximity graph** on $E_1$ (nodes = edges of $T_1$; edge between two $T_1$-edges iff they share a node). Weight each candidate $T_2$-edge by $|\hat{\tau}^{\text{cond}}_{ab|D}|$ computed from h-function pseudo-observations. Find maximum-weight spanning tree subject to the proximity condition.
> 5. **Repeat** for $T_3,\ldots,T_{n-1}$.
>
> **Guarantees:** The greedy solution is generally not globally optimal, but in practice yields structures with high likelihood. The choice of $|\hat{\tau}|$ as the selection criterion is motivated by Genest & Favre (2007) — rank-based statistics are consistent for most bivariate copula families without specifying the family first.
^def-dissmann

> [!definition] Vine truncation
> For large $n$, all pair copulas at trees $T_p, T_{p+1}, \ldots, T_{n-1}$ (above truncation level $p$) are replaced by the **independence copula** $C(u,v) = uv$. This reduces the parameter count from $O(n^2/2)$ to $O(pn)$ and is justified when higher-tree conditional dependencies are negligible. Typical choices: $p = 1$ (first tree only) or $p = 2$. Formal truncation-level selection by AIC/BIC is discussed in Czado (2019, Ch. 7).
^def-truncation

## Examples

> [!example] D-vine estimation on financial returns (Brechmann & Schepsmeier 2013)
> **Setup:** Daily log-returns on $n = 5$ US financial sector stocks; $T = 520$ observations. Empirical CDF pseudo-observations; default AIC family selection from \{Normal, $t$, Clayton, Gumbel, Frank, Joe, 90°, 270° rotations\}.
>
> **Step 1 ($T_1$ structure):** Compute $|\hat{\tau}|$ for all 10 pairs; select the ordering that forms the highest-weight path (Kruskal on path constraint). Suppose ordering selected: Bank1 — Bank2 — Bank3 — InsurCo — BrokerDlr.
>
> **Step 1 (family selection):** Edge Bank1–Bank2: $\hat{\tau} = 0.48$; $t$-copula wins by AIC ($\hat{\rho} = 0.70, \hat{\nu} = 4.2$). Edge Bank2–Bank3: Gumbel wins ($\hat{\theta} = 1.9$). And so on.
>
> **Step 2 ($T_2$):** Compute h-function pseudo-observations. Select path for $T_2$; fit 3 more pair copulas. Several edges select Independence copula (low conditional $|\hat{\tau}|$).
>
> **Result:** 10 total edges; 6 non-independence pair copulas at levels 1-2; 4 independence copulas at levels 3-4 (effective truncation at $p = 2$).
>
> **Interpretation:** The D-vine ordering shows Bank1 and BrokerDlr are least directly dependent; their relationship is mediated through Bank2-Bank3-InsurCo. The $t$-copula at the first tree edges implies symmetric tail co-crashes across the sector.

## Connections

- [[Vine Copulas - Overview]] — the pair-copula construction and R-vine definition that this estimation procedure instantiates.
- [[C-vine and D-vine Structures]] — the density formulas that define what h-function recursions are needed.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ and quantile dependence are used as structure-selection weights and goodness-of-fit diagnostics.
- [[Copula Architecture Comparison]] — vine estimation by sequential/joint MLE vs. factor-copula estimation by rank-based SMM.
- [[SMM Estimation of Factor Copulas]] — the rank-based SMM approach for factor copulas; contrasted here with MLE-based vine estimation.
- [[Tail Dependence in Factor Copulas]] — tail-dependence properties of the factor copula; vine copulas inherit tail dependence from the bivariate pair copulas (e.g., $t$ gives symmetric, Clayton gives lower, Gumbel gives upper tail dependence).

## See Also
- **VineCopula R package** (successor to CDVine; Nagler et al. 2023) — implements Dißmann et al. structure selection, sequential MLE, joint MLE, and goodness-of-fit tests.
- **pyvinecopulib Python package** — Python interface to the VineCopula C++ library; supports R-vine structure selection and estimation with automatic differentiation.
