---
title: "Vine Copula Estimation and Selection"
tags:
  - source/ingested
  - topic/econometrics
  - topic/copulas
  - type/concept
  - method/r
  - doc/paper
source: "Aas, Czado, Frigessi & Bakken (2009) — 'Pair-copula constructions of multiple dependence'; Dißmann, Brechmann, Czado & Kurowicka (2013) — 'Selecting and estimating regular vine copulae and application to financial returns'"
source_location: "Aas et al. Secs. 4–5, pp. 189–196; Dißmann et al. Computational Statistics & Data Analysis 59:52–69 (PDFs unavailable — network policy blocks download)"
date_ingested: 2026-10-31
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[C-Vines and D-Vines]]"
  - "[[Pair Copula Construction]]"
used_by: []
aliases:
  - vine copula MLE
  - sequential vine estimation
  - vine structure selection
  - VineCopula R package
  - pyvinecopulib
  - truncated vine
---

# Vine Copula Estimation and Selection

> [!summary]
> Vine copula estimation proceeds **tree by tree** via sequential maximum likelihood: fit all bivariate copulas in $T_1$ using raw probability-integral-transform (PIT) data, compute $h$-function pseudo-observations for $T_2$, fit those, and repeat. **Structure selection** uses a greedy maximum-spanning-tree algorithm (maximise $|\hat{\tau}|$ at each level). **Family selection** chooses among Normal, $t$, Clayton, Gumbel, Frank, etc. by AIC/BIC at each edge. **Truncation** reduces computation in high dimensions by setting higher-tree pair copulas to independence. Software: VineCopula (R), pyvinecopulib (Python).

## Overview

A vine copula model requires two types of choices: (i) the **vine structure** — which tree topology and which variables go where — and (ii) the **pair copula families and parameters** — a bivariate copula for each of the $n(n-1)/2$ edges. Both are selected from data.

Aas et al. (2009) proposed **sequential MLE** as the tractable estimation algorithm. Dißmann et al. (2013) extended this with a greedy **maximum spanning tree (MST)** algorithm for automated structure selection, making vine copulas practical in moderate dimensions ($n \lesssim 20$). For very high dimensions ($n > 50$), **truncated vines** reduce computation by ignoring higher-order conditional dependence.

## Main Content

> [!definition] Sequential maximum likelihood estimation
> Given observations $(y_1^{(t)}, \dots, y_n^{(t)})_{t=1}^T$ with estimated marginals $\hat{F}_i$:
>
> **Step 1 — PIT:** Compute $\hat{u}_i^{(t)} = \hat{F}_i(y_i^{(t)})$ (probability-integral transforms, approximately uniform).
>
> **For each tree $T_k$ in sequence ($k=1,\dots,n-1$):**
>
> - Given pseudo-observations $(v^{(t)}_{j(e)|D(e)}, v^{(t)}_{k(e)|D(e)})_{t=1}^T$ for each edge $e \in \mathcal{E}_k$ (raw PITs for $k=1$; $h$-function values for $k>1$):
>   - Select pair copula family $\hat{c}_{j(e),k(e)|D(e)}$ by AIC (see below).
>   - Fit parameters by MLE: $\hat{\theta}_e = \arg\max_\theta \sum_t \log c_{j(e),k(e)|D(e)}\!\bigl(v^{(t)}_{j(e)|D},\, v^{(t)}_{k(e)|D};\, \theta\bigr)$.
>
> - Compute $h$-function pseudo-observations for tree $T_{k+1}$: for each edge in $\mathcal{E}_k$ and each observation $t$,
>   $$v^{(t)}_{j(e)|D(e)\cup\{k(e)\}} = h\!\bigl(v^{(t)}_{j(e)|D(e)}\;\big|\; v^{(t)}_{k(e)|D(e)};\; \hat{\theta}_e\bigr)$$
>
> **Output:** $\hat{n}(n-1)/2$ pair copula parameters (and families). Fitting complexity: $O(n^2)$ bivariate fits, each on $T$ observations.
^def-seq-mle

> [!definition] Full maximum likelihood
> Full (joint) MLE optimises the complete log-likelihood over all parameters simultaneously:
> $$\hat{\boldsymbol{\theta}} = \arg\max_{\boldsymbol{\theta}} \sum_{t=1}^T \log f(\mathbf{y}^{(t)};\boldsymbol{\theta})$$
> where $f$ is the vine density from [[Pair Copula Construction]]. This requires evaluating the entire $h$-function recursion at each iteration of the optimiser.
>
> **Advantage:** accounts for correlations between parameter estimates across tree levels — asymptotically more efficient than sequential MLE.
>
> **Disadvantage:** $O(n^2)$ parameters jointly optimised — computationally expensive for $n \geq 10$. The sequential MLE provides excellent starting values.
^def-full-mle

> [!definition] Pair copula family selection
> At each edge $e$, the pair copula family is selected by fitting several candidate families and choosing by **AIC** (or BIC):
> $$\text{AIC}_f = -2\ell_f(\hat{\theta}_e) + 2p_f$$
> where $\ell_f$ is the maximised log-likelihood under family $f$ and $p_f$ is the number of parameters. Standard candidates:
>
> | Family | Parameters | Tail dependence | Symmetry |
> |---|---|---|---|
> | Independence | 0 | None | Symmetric |
> | Gaussian | 1 ($\rho$) | None | Symmetric |
> | Student-$t$ | 2 ($\rho$, $\nu$) | Both tails equal | Symmetric |
> | Clayton | 1 ($\theta$) | Lower tail only | Asymmetric |
> | Gumbel | 1 ($\theta$) | Upper tail only | Asymmetric |
> | Frank | 1 ($\theta$) | None | Symmetric |
> | Joe | 1 ($\theta$) | Upper tail only | Asymmetric |
> | BB1 / BB7 | 2 | Both tails | Asymmetric |
>
> Rotated versions (90°, 180°, 270°) extend Clayton/Gumbel/Joe to other quadrant dependencies.
^def-family-sel

> [!definition] Vine structure selection — maximum spanning tree (Dißmann et al. 2013)
> Structure selection proceeds greedily, tree by tree:
>
> **For $T_1$:** Compute all $\binom{n}{2}$ pairwise empirical Kendall's $\hat{\tau}_{ij}$. Form a complete weighted graph with edge weight $|\hat{\tau}_{ij}|$. Select the **maximum spanning tree** (Prim's or Kruskal's algorithm). This ensures the strongest pairwise dependencies appear in the first tree (unconditioned).
>
> **For $T_k$ ($k \geq 2$):** Compute Kendall's $\hat{\tau}$ on the $h$-function pseudo-observations for each candidate edge (satisfying the proximity condition). Select the maximum spanning tree among all proximity-satisfying edges.
>
> **Justification:** Strong unconditional dependence should be captured in lower trees; higher trees deal with weaker conditional dependence. The MST heuristic approximately maximises total explained dependence.
^def-mst

> [!definition] Truncated vines
> For large $n$, set all pair copulas in trees $T_{m+1}, \dots, T_{n-1}$ to **independence** ($c = 1$). A truncated vine at level $m$ has only:
> $$\sum_{k=1}^m (n-k) = mn - m(m+1)/2 \text{ non-trivial pair copulas}$$
> versus $n(n-1)/2$ for the full vine.
>
> **Selection of $m$:** Use the Vuong (1989) test to compare the full vine against successively simpler truncations; stop at the level where additional trees no longer significantly improve fit.
>
> **Interpretation:** Truncation at $m$ assumes that conditional independence holds for conditioning sets of size $> m{-}1$ — a Markov property on the vine tree sequence.
^def-truncation

> [!definition] Dimension comparison: vine vs factor copulas
> | | Vine (D/C/R-vine) | Factor copula (Oh & Patton 2012) |
> |---|---|---|
> | Parameters to fit | $n(n-1)/2$ bivariate fits | 3–8 distributional params |
> | Max tractable dim | ~20 (full MLE), ~100 (truncated, sequential) | 100+ |
> | Estimation method | Sequential / full MLE | SMM (simulation-based) |
> | Software | VineCopula (R), pyvinecopulib | Custom simulation code |
> | Key strength | Flexible pair-specific families | Parsimony + large-$n$ scalability |
>
> For the S&P 100 (100 assets), Oh & Patton found vine copulas "hard-to-interpret/test" and switched to the factor approach. For dimension $n \leq 20$ with heterogeneous pairwise dependence, vine copulas are typically preferred.
^def-dim-comparison

## Examples

> [!example] Sequential MLE for a three-variable D-vine
> **Data:** $(y_1^{(t)}, y_2^{(t)}, y_3^{(t)})_{t=1}^{250}$, AR(1)-GARCH marginals fitted and standardised.
>
> **Step 1:** Compute PITs $\hat{u}_i^{(t)} = \hat{F}_i(y_i^{(t)})$.
>
> **$T_1$ estimation:**
> - Fit $c_{12}$ to $(\hat{u}_1, \hat{u}_2)$: select $t$-copula (AIC best). Get $\hat{\rho}_{12}$, $\hat{\nu}_{12}$.
> - Fit $c_{23}$ to $(\hat{u}_2, \hat{u}_3)$: select Clayton (lower tail). Get $\hat{\theta}_{23}$.
>
> **Pseudo-observations for $T_2$:**
> $\hat{v}_{1|2}^{(t)} = h(\hat{u}_1^{(t)} | \hat{u}_2^{(t)};\, \hat{\rho}_{12}, \hat{\nu}_{12})$ (Student-$t$ $h$-function).
> $\hat{v}_{3|2}^{(t)} = h(\hat{u}_3^{(t)} | \hat{u}_2^{(t)};\, \hat{\theta}_{23})$ (Clayton $h$-function).
>
> **$T_2$ estimation:**
> - Fit $c_{13|2}$ to $(\hat{v}_{1|2}, \hat{v}_{3|2})$: select Gaussian (AIC). Get $\hat{\rho}_{13|2}$.
>
> **Result:** 3 pair copulas with different families capturing different dependence features.

## Connections

- [[C-Vines and D-Vines]] — the vine structures being estimated.
- [[Pair Copula Construction]] — the $h$-function used to generate pseudo-observations for higher tree levels.
- [[SMM Estimation of Factor Copulas]] — contrast: factor copula estimation via SMM with rank-based moments rather than tree-by-tree MLE.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ used in the MST structure selection step.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — high-dimensional empirical study that benchmarked factor vs vine approaches.

## See Also

- **VineCopula** R package (Schepsmeier, Stöber, Brechmann, Czado et al.) — implements sequential MLE, MST selection, all standard families, simulation, goodness-of-fit tests.
- **pyvinecopulib** Python package (Nagler & Vatter, wraps vinecopulib C++) — fast C++ backend, Python interface for vine estimation and simulation.
- [[../_Index|Econometrics]]
