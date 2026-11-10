---
title: Vine Copula Estimation and Selection
tags:
  - source/ingested
  - topic/econometrics
  - type/concept
  - method/r
  - doc/paper
source: "Dißmann, Brechmann, Czado & Kurowicka (2013) — Computational Statistics & Data Analysis 59(1), 52–69; arXiv:1202.2002"
source_location: "Dißmann et al. §2-5; Aas et al. (2009) §4-5"
date_ingested: 2026-11-10
folder: "Econometrics/Dependence Modeling"
doc_type: paper
depends_on:
  - "[[Vine Copulas - Overview]]"
  - "[[Pair-Copula Constructions]]"
  - "[[Regular Vine Structures]]"
used_by:
  - "[[Factor Copula Application - S&P 100 and Systemic Risk]]"
aliases:
  - Dissmann algorithm
  - vine copula model selection
  - VineCopula R
  - rvinecopulib
  - maximum spanning tree vine
---

# Vine Copula Estimation and Selection

> [!summary]
> Dißmann et al. (2013) propose a **data-driven sequential algorithm** for selecting an R-vine structure: at each tree level, choose the spanning tree that maximises the sum of absolute pairwise Kendall's $\tau$ values, then select the pair copula family for each edge via AIC/BIC. This greedy algorithm is computationally feasible for moderate $d$ ($d \approx 10$–$50$) and is implemented in the **VineCopula** and **rvinecopulib** R packages. For large $d$, *truncated* vines (setting higher-tree pair copulas to independence) achieve further parsimony.

## Overview

A fully-specified vine copula model requires three layers of choice:
1. **Structure selection**: which R-vine tree sequence $T_1, \ldots, T_{d-1}$ to use.
2. **Family selection**: which bivariate copula family (Gaussian, $t$, Clayton, Gumbel, Frank, Joe, ...) to use for each of the $d(d-1)/2$ pair copulas.
3. **Parameter estimation**: estimating the parameters of each selected pair copula.

Aas et al. (2009) address points 2 and 3 for fixed C-vine and D-vine structures via sequential MLE. Dißmann et al. (2013) address point 1 for general R-vines, completing the full estimation pipeline.

## Main Content

### Structure selection: Dißmann algorithm

> [!definition] Greedy maximum-spanning-tree algorithm (Dißmann et al. 2013)
> **Input:** Pseudo-observations $\hat{u}_{it} = \hat{F}_i(x_{it})$ for $i = 1, \ldots, d$ and $t = 1, \ldots, n$.
>
> **Algorithm:**
>
> *For tree $T_1$:*
> 1. Compute all $\binom{d}{2}$ pairwise empirical Kendall's $\hat{\tau}_{ij}$ from the pseudo-observations.
> 2. Construct a complete graph on $d$ nodes, with edge weights $|\hat{\tau}_{ij}|$.
> 3. Find the **maximum spanning tree** (Prim's or Kruskal's algorithm, $O(d^2 \log d)$).
> 4. The MST edges form $T_1$; each edge $(i,j)$ gets an unconditional pair copula.
>
> *For tree $T_j$ ($j \geq 2$):*
> 1. Compute pseudo-observations for the conditioned pairs using the fitted h-functions from tree $j-1$.
> 2. Build a graph on nodes $N_j = E_{j-1}$ with edges satisfying the proximity condition (share a node in $T_{j-1}$).
> 3. Assign edge weights $|\hat{\tau}|$ for each eligible conditional pair.
> 4. Find the MST subject to the proximity condition; set tree $T_j$ to this MST.
>
> **Rationale:** Placing the strongest dependencies (largest $|\hat\tau|$) in the first trees ensures that residual conditional dependence is weaker in later trees, so truncation at a low tree level loses little information.
^dissmann-algorithm

> [!definition] Pair copula family selection
> After fixing the vine structure, each edge $(i,j|D)$ selects a bivariate copula family and estimates its parameters:
>
> 1. **Candidate families:** Gaussian, Student-$t$, Clayton, Gumbel, Frank, Joe, Clayton-180°, Gumbel-180° (survival copulas), and their BB1/BB6/BB7/BB8 generalisations. The VineCopula R package includes ~40 families.
>
> 2. **Information criteria:**
>    $$\text{AIC} = -2\ell(\hat\theta) + 2p, \qquad \text{BIC} = -2\ell(\hat\theta) + p\log n$$
>    where $p$ is the number of parameters and $\ell(\hat\theta)$ is the maximised log-likelihood of the pair copula. Select the family minimising AIC or BIC.
>
> 3. **Kendall's $\tau$ starting values:** For many families, $\hat\theta$ can be initialised from $\hat\tau_{ij}$ via the $\tau$-to-$\theta$ mapping (closed form for Gaussian, $t$, Archimedean families), speeding up optimisation.
>
> 4. **Tail dependence filter:** Pre-screen for tail-dependent families using the empirical quantile dependence (bottom-left and upper-right quadrant probabilities); if quantile dependence is negligible, restrict to Gaussian/Frank.
^family-selection

> [!definition] Truncation: parsimonious vine models
> For large $d$, fitting all $d(d-1)/2$ pair copulas is infeasible. A **truncated vine at level $m$** sets all pair copulas at trees $m+1, \ldots, d-1$ to the **independence copula** ($c = 1$, $C(u,v) = uv$):
> $$\text{Truncated vine: } f_m(x_1,\ldots,x_d) = \prod_{k=1}^d f_k(x_k) \cdot \prod_{j=1}^{m} \prod_{\text{edges in } T_j} c_{ij|D}(\cdot,\cdot;\hat\theta)$$
> The number of pair copulas drops from $d(d-1)/2$ to $\sum_{j=1}^{m}(d-j) = md - m(m+1)/2$.
>
> **Selecting $m$:** Use the AIC/BIC of the full sequential fit, stopping when the improvement from tree $m+1$ falls below a threshold (Czado 2010). With $m=1$ this is an independence model except for $d-1$ unconditional copulas; with $m=d-1$ it is the full vine.
^truncation

### Full and sequential MLE

> [!definition] Estimation strategies
> | Strategy | Description | Consistency | Efficiency | Computational cost |
> |---|---|---|---|---|
> | **Sequential MLE** (Aas 2009) | Maximise tree-by-tree; plug in estimated conditional CDFs | Yes (fixed $d$, $n\to\infty$) | Moderate | $O(d^2 n)$ |
> | **Full MLE** | Jointly optimise all $d(d-1)/2$ pair copula parameters | Yes | Asymptotically efficient | Expensive; use sequential estimates as starting point |
> | **IFM** (inference for margins) | First estimate marginals, then vine parameters | Yes | Moderate | Two-stage; standard for semi-parametric |
> | **CML** (canonical MLE) | Use empirical CDF ranks (pseudo-observations); maximise copula likelihood only | Yes (non-parametric margins) | Lower efficiency for marginals | Practical for large $d$ |
^estimation-strategies

### R packages

> [!definition] VineCopula and rvinecopulib (R)
> **VineCopula** (Schepsmeier, Stoeber, Brechmann, Graeler, Nagler, Erhardt):
> ```r
> library(VineCopula)
> # Fit R-vine to data matrix u (n × d pseudo-observations)
> RVM <- RVineStructureSelect(u, familyset = NA, type = 0)   # 0 = R-vine
> # type = 1 → C-vine; type = 2 → D-vine
> summary(RVM)                # print vine matrix, families, parameters
> RVineLogLik(u, RVM)         # log-likelihood
> RVineSim(n, RVM)            # simulation
> ```
>
> **rvinecopulib** (Nagler & Vatter — faster, C++ backend):
> ```r
> library(rvinecopulib)
> # Fit vine using Dißmann-like algorithm
> fit <- vinecop(u, family_set = "parametric", tree_crit = "tau")
> print(fit)                  # vine structure, pair copula families, parameters
> simulate(fit, n = 1000)     # simulation
> logLik(fit)                 # log-likelihood
> ```
>
> Both packages implement the Dißmann algorithm for structure selection. **rvinecopulib** is generally faster for $d > 10$ and supports non-parametric (kernel-based) pair copulas.
^r-packages

### Model diagnostics and comparison

> [!definition] Goodness-of-fit and model comparison
> 1. **AIC/BIC comparison:** Compare truncated vines of different levels $m$, C-vine vs D-vine vs R-vine, and vine vs factor copula. The factor copula's block model (Oh & Patton 2017) typically has far fewer parameters for large $d$.
>
> 2. **Rosenblatt transform GoF:** Transform observations to independence using the fitted vine's conditional CDFs; test uniformity of the resulting $[0,1]^d$ sample. Genest, Rémillard & Beaudoin (2009) provide bootstrap p-values.
>
> 3. **Residual tail dependence:** Check whether residual quantile dependence at high trees is negligible (supporting truncation).
>
> 4. **Vuong test:** Compare non-nested copula models (e.g. vine vs factor) using the Vuong (1989) likelihood ratio test for non-nested models:
>    $$V_n = \frac{\frac{1}{\sqrt{n}}\sum_{t=1}^{n} \log(f_1(\mathbf{x}_t;\hat\theta_1)/f_2(\mathbf{x}_t;\hat\theta_2))}{\hat\omega}$$
>    where $\hat\omega^2$ is the sample variance of the log-ratio. Positive $V_n$ favours model 1.
^diagnostics

## Examples

> [!example] Dißmann algorithm on $d=5$ financial returns
> **Data:** Daily log-returns of 5 assets over $n=500$ days.
>
> **Step 1:** Compute $\binom{5}{2}=10$ pairwise Kendall's $\hat\tau$. Suppose the top-3 pairs by $|\hat\tau|$ are $(1,3)=0.42$, $(2,3)=0.38$, $(3,5)=0.35$. The MST selects a spanning tree prioritising these; suppose $T_1$: $1–3–2$, $3–5$, $4–5$ (a path/star hybrid maximising total $|\hat\tau|$).
>
> **Step 2:** For $T_2$, compute conditional Kendall's $\hat\tau$ for all proximity-condition-satisfying pairs (those sharing a node in $T_1$). Select MST again.
>
> **Step 3:** For each edge, fit candidate pair copula families; select by AIC. E.g. edge $(1,3)$ gets a $t$-copula; edge $(2,3)$ gets a Gumbel (upper tail dominant); edge $(4,5)$ gets Gaussian.
>
> **Result:** A 4-tree R-vine with heterogeneous pair copula families, capturing different dependence structures for each pair.

> [!example] Vine vs factor copula for $d=20$ S&P sectors
> **Factor copula (block model):** 2 factors (market + sector), $\sim$5 parameters per sector block. Total ~25 parameters. Tail dependence symmetric if $t$-factor, asymmetric if skew-$t$.
>
> **D-vine (truncated at $m=2$):** $20 + 19 = 39$ pair copulas; heterogeneous families. More flexible but harder to interpret and needs larger $n$ for stable estimation.
>
> **Verdict:** For $d=100$, the factor copula's parsimony is decisive. For $d=10$–$20$ with ample data, a truncated vine may outperform because it allows heterogeneous tail properties across pairs.

## Connections

- [[Regular Vine Structures]] — the vine tree structures this algorithm selects.
- [[Pair-Copula Constructions]] — the PCC density and h-functions this estimation uses.
- [[Vine Copulas - Overview]] — motivation and comparison with factor copulas.
- [[Factor Copulas - Overview]] and [[SMM Estimation of Factor Copulas]] — competing architecture; SMM-based vs MLE-based estimation.
- [[Dependence Measures for Copulas]] — Kendall's $\tau$ is the central moment for vine structure selection.
- [[Factor Copula Application - S&P 100 and Systemic Risk]] — Oh & Patton (2017) results; vine would need $4950/2$ truncated pair copulas vs 16 factor parameters.

## See Also

- [[_Index|Dependence Modeling]] — folder index
- Dißmann, Brechmann, Czado & Kurowicka (2013) arXiv:1202.2002 — the structure-selection paper
- Czado (2019) — *Analyzing Dependent Data with Vine Copulas* (Springer LNS 222) — book-length treatment with R code
