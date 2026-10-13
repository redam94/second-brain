---
title: "Stability Selection for Gaussian Graphical Models and Computational Cost"
tags:
  - source/ingested
  - topic/model-validation
  - topic/variable-selection
  - topic/graphical-models
  - type/example
  - type/concept
  - doc/paper
source: "[[raw/Meinshausen Buhlmann 2010 - Stability Selection.pdf]]"
source_location: "Meinshausen & Bühlmann (2010), arXiv:0809.2932v2: §2.5 Example II Graphical modelling, Fig. 2 (p. 9), Fig. 3 (p. 10); §2.6 Computational requirements (p. 10)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Meinshausen Buhlmann 2010 - Stability Selection"
doc_type: paper
depends_on:
  - "[[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]]"
  - "[[Stability Selection PFER Bound (Theorem 1) and Its Proof]]"
used_by:
  - "[[Stability Selection - Discussion, Limitations and Practice]]"
aliases:
  - Stability Selection for Graphical Lasso
  - Stability Selection Computational Cost
---

# Stability Selection for Gaussian Graphical Models and Computational Cost

> [!summary]
> Applied to the graphical Lasso on 160 genes (12720 possible edges) with pointwise control at $E(V)\le30$, stability selection gives an edge set that "varies remarkably little" across a range of $\lambda$. The raw graphical-Lasso graph, by contrast, grows quickly as $\lambda$ falls. When every gene is permuted independently, so that the true graph is empty, stability selection selects very few or no edges while the graphical Lasso still selects many. On cost: 100 half-sample fits are about 25 full-data fits for the Lasso when $p>n$, roughly 3 times 10-fold CV (8.1 fits).
^summary-ss-stability-selection-for-gaussian-graphic

## Overview

Stability selection is generic across structure estimators (see [[Stability Paths and the Stable-Variable Set]]). This note covers the paper's second worked example, unsupervised edge selection in a Gaussian graphical model, and the computational accounting in §2.6.

## Main Content

### Setup (§2.5, p. 9)

Non-zero entries of $\Sigma^{-1}$ are edges, equivalently non-zero partial correlations (conditional dependence) between pairs of variables (Lauritzen 1996). $\ell_1$-penalised approaches are popular for computational efficiency (Meinshausen & Bühlmann 2006; Yuan & Lin 2007; Friedman et al. 2008; Banerjee & El Ghaoui 2008; Bickel & Levina 2008; Rothman et al. 2008). The estimator is the graphical Lasso, eq. (4) ([[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso#^def-ss-glasso|definition]]), with
$$\hat S^\lambda=\{(j,k):(\hat\Sigma^{-1})^\lambda_{jk}\ne0\}.$$

> [!example] Example II - Graphical Lasso on riboflavin genes (§2.5, Fig. 2, pp. 9)
> **Data.** 160 randomly selected genes from the riboflavin data of §2.2, without the response. $d=160$, so there are $\binom{160}{2}=12720$ possible edges.
> **Display.** Genes are ordered by hierarchical clustering and drawn as nodes on a circle.
> **Fig. 2 top row.** Graphical-Lasso graphs at $\lambda=0.46,0.448,0.436,0.424,0.412,0.4$. Edge counts grow as $\lambda$ falls.
> **Fig. 2 bottom row.** Pointwise stability selection: for each $\lambda$, $\pi_{thr}$ is chosen so that $E(V)\le30$, i.e. fewer than 30 wrong edges expected among 12720.
> **Result.** "The set $\hat S^{stable}$ varies remarkably little for the majority of the path." The choice of $q$ (implied by $\lambda$) "does not seem to be critical", as in regression.
^ex-ss-glasso-real

> [!example] Example II (null) - Independently permuted genes (§2.5, Fig. 3, p. 10)
> **Construction.** Each gene's expression values are permuted with a **different** permutation. This destroys all dependence, so the true graph is **empty**.
> **Fig. 3 top row.** Graphical Lasso at $\lambda=0.065,0.063,0.061,0.059,0.057,0.055$: many spurious edges, a "much poorer selection".
> **Fig. 3 bottom row.** Stability selection selects "just very few edges or none at all (as it should)". Only a few errors are made, consistent with the error control.
> **Interpretation.** Under the global null the guarantee behaves as advertised. This is a cheap sanity check that carries over to any structure learner (see [[Designing Simulated-Data Experiments]]).
^ex-ss-glasso-null

### Figs 2-3 - panel-by-panel readings (pp. 9-10)

The paper reports no edge counts for these figures. Below are readings by eye from the rendered pages. Where edges are too dense to count, that is stated rather than inventing a number. The 160 nodes are on an ellipse in hierarchical-clustering order, so clustered genes are adjacent and dense bundles show up as fans of lines converging on one arc.

**Fig. 2 (real data, p. 9), $\lambda=0.46,0.448,0.436,0.424,0.412,0.4$ left to right.**

| Row | $\lambda=0.46$ | 0.448 | 0.436 | 0.424 | 0.412 | 0.4 |
|---|---|---|---|---|---|---|
| Graphical Lasso | Already many edges (well over a hundred; not countable). Mostly horizontal bundles across the lower half plus fans into the upper-right arc | Visibly denser | Denser | Denser; upper half filling in | Lower half nearly solid black | Densest: most of the interior is black and individual edges cannot be told apart |
| Stability selection ($E(V)\le30$ pointwise) | Several dozen edges (order 50-100, not exactly countable). Lower-half horizontal bundles plus fans to the right/lower-right arc | Same skeleton, slightly more edges | Same skeleton; the most edges of the row | Same skeleton | Same skeleton | Same skeleton, slightly sparser again |

Reading:
- Along the graphical-Lasso row, the edge count rises steeply over a narrow $\lambda$ range ($0.46\to0.40$, a change of about 13%). The selected graph depends heavily on the exact $\lambda$.
- In the stability-selection row, the *same* main bundles (two horizontal bands in the lower half and a fan converging on the lower-right arc) appear in all six panels. Panel-to-panel differences are a handful of peripheral edges. This is what the text means by "varies remarkably little".
- Each stability panel is guaranteed only $E(V)\le30$, so up to about 30 of its several dozen edges could be false in expectation. The guarantee is loose relative to the graph size.

**Fig. 3 (independently permuted genes, true graph empty, p. 10), $\lambda=0.065,0.063,0.061,0.059,0.057,0.055$.**

The $\lambda$ values are about an order of magnitude smaller than in Fig. 2. Once the dependence is destroyed, the graphical Lasso must be run much closer to $\lambda=0$ before it selects anything comparable.

| Row | $\lambda=0.065$ | 0.063 | 0.061 | 0.059 | 0.057 | 0.055 |
|---|---|---|---|---|---|---|
| Graphical Lasso (all edges false) | Hundreds of edges spread over the whole ellipse (not countable) | Denser | Denser | Very dense | Nearly solid | Solid black: essentially uncountable |
| Stability selection (all edges false) | **1** edge | **2** edges | **3** edges | **1** edge | **0** edges | **0** edges |

Reading:
- Every graphical-Lasso edge in Fig. 3 is a false positive. Spurious edges are spread uniformly, with no clustered structure, which is consistent with independent permutations.
- Stability selection makes 0-3 errors per panel, mean $\approx1.2$ over the six panels. That is far below the pointwise budget $E(V)\le30$, which illustrates how conservative the bound is under the global null.
- The same short chord (between the upper-left and upper-right arcs) appears in the first four stability panels ($\lambda=0.065$-0.059). One spurious pair keeps a high selection probability across neighbouring $\lambda$ values, so errors are *correlated along the path*, not independent per panel.

The two permutation designs differ. In §2.2 a **common** permutation keeps the noise genes' correlation structure (realistic correlated nulls). In §2.5 **independent** permutations create a fully null graph.

### Computational requirements (§2.6, p. 10)

> [!definition] Cost accounting for stability selection with the Lasso (§2.6)
> - Subsamples: "Evaluating selection probabilities over 100 subsamples seems sufficient in practice."
> - Lasso complexity is $O(np\min\{n,p\})$ (Efron et al. 2004). For $p>n$ this is $O(n^2p)$, so a path on $n/2$ samples costs $1/4$ of a full fit.
> - **Stability selection:** $100\times\frac14=25$ full-fit equivalents.
> - **10-fold CV:** $10\times0.9^2\approx8.1$ full-fit equivalents.
> - Hence stability selection is "roughly three times more expensive than 10-fold CV".
> - If cost were **linear** in $n$ (e.g. Lasso with $p<n$), the ratio rises to roughly **5.5** ($100\times\frac12=50$ vs $10\times0.9=9$).
> - **Timing:** with $p=1000$, $n=100$ and 100 subsamples, about **10 seconds** on a 2.2 GHz processor using the coordinate-descent implementation of Friedman et al. (2007).
^def-ss-cost

| Procedure | Fits | Size per fit | Cost factor (quadratic in $n$) | Cost factor (linear in $n$) |
|---|---|---|---|---|
| Single full fit | 1 | $n$ | 1 | 1 |
| 10-fold CV | 10 | $0.9n$ | 8.1 | 9 |
| Stability selection (100 subsamples) | 100 | $n/2$ | 25 | 50 |
| Ratio SS / CV | | | ≈ 3 | ≈ 5.5 |

The authors judge this "often" worthwhile given the benefits. Subsample fits are independent, so the work is embarrassingly parallel. This is an observation, not a claim from the paper.

## Examples

> [!example] Marketing analogue: stable channel-interaction graph
> **Setup:** 30 weekly series (channel spends, search volume, site visits, sales) over 156 weeks. A graphical Lasso estimates which series are conditionally dependent.
> **Steps:** There are $p=\binom{30}2=435$ possible edges. Pointwise control at $E(V)\le5$ means choosing $\pi_{thr}$ for the chosen $\lambda$ so that $q^2/((2\pi_{thr}-1)435)\le5$. Then repeat with each series permuted independently. A trustworthy pipeline should return a near-empty graph.
> **Caveat:** Weekly data are autocorrelated and non-stationary, so i.i.d. subsampling overstates the effective sample size. Use block subsampling or difference the series first (not from the paper; see [[Granger 2003 - Spurious Regression and Cointegration - Overview]] and [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]]).
^example-ss-marketing-analogue-stable-channel

## Connections

- An independent-permutation null is a simple form of simulation-based method validation ([[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Simulation Studies for Evaluating Statistical Methods (ADEMP)]]).
- Graph-structure learning for dependence among many series: [[Estimation and Structure Selection for Vines]].

## See Also
- [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]]
- [[Stability Selection PFER Bound (Theorem 1) and Its Proof]] - pointwise control
- [[Stability Selection Setup - Structure Estimation with Lasso and Graphical Lasso]]
