---
title: "Conditional Independence Testing for Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch07a-PC-citation.md]]"
source_location: "Kalisch & Bühlmann 2007, §2–3; Spirtes, Glymour & Scheines 2000, Ch. 5"
date_ingested: 2026-09-21
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "CI test"
  - "conditional independence test"
  - "Fisher Z test"
  - "partial correlation test"
---

# Conditional Independence Testing for Causal Discovery

> [!summary]
> Constraint-based causal discovery (the [[PC Algorithm]], FCI, RFCI) rests on **conditional
> independence (CI) tests**: statistical tests for the hypothesis $X_i \perp\!\!\!\perp X_j \mid S$
> at some significance level $\alpha$. For Gaussian data the standard test uses the **partial
> correlation** and **Fisher's Z transform**; for discrete data the **$\chi^2$ / G-test** applies;
> non-parametric settings use kernel-based methods (HSIC). The significance level $\alpha$ and
> sample size $n$ jointly determine which edges are correctly recovered: liberal $\alpha$
> over-prunes, conservative $\alpha$ under-prunes.

## Overview

The PC algorithm's skeleton phase (and its variants) calls a CI oracle to ask: *are nodes $i$
and $j$ conditionally independent given some set $S$ of other nodes?* In practice the oracle
is a statistical test on the observed data. The choice of test is the **only place the PC
algorithm touches the data** — the algorithmic logic is otherwise purely combinatorial — making
the CI test the critical hyperparameter.

## Main Content

### What CI tests must satisfy

A CI test for PC must:
1. Accept a significance level $\alpha$ and return a binary decision (independent / not).
2. Be **consistent** as $n \to \infty$ (type I and type II error → 0).
3. Be computable for conditioning sets of arbitrary size $|S|$.
4. Ideally be **order-independent** (PC-stable requirement).

### Gaussian data: the partial correlation test

For jointly Gaussian $(X_1, \ldots, X_d)$, conditional independence equals zero partial
correlation:
$$X_i \perp\!\!\!\perp X_j \mid S \iff \rho_{ij \cdot S} = 0,$$
where $\rho_{ij \cdot S}$ is the partial correlation of $X_i$ and $X_j$ given $S$.

> [!definition] Definition: Sample partial correlation (Kalisch & Bühlmann 2007, §2)
> Let $\hat{\Sigma}$ be the sample covariance matrix and $\hat{\Sigma}_{ij \cdot S}$ the
> $(i,j)$ entry of $(\hat{\Sigma}_{[i,j,S],[i,j,S]})^{-1}$ (or via recursive formula).
> The sample partial correlation is:
> $$\hat{\rho}_{ij \cdot S} = -\frac{(\hat{\Sigma}^{-1}_{[S \cup \{i,j\}]})_{ij}}
>   {\sqrt{(\hat{\Sigma}^{-1}_{[S \cup \{i,j\}]})_{ii} \cdot
>          (\hat{\Sigma}^{-1}_{[S \cup \{i,j\}]})_{jj}}}.$$
^def-partial-corr

> [!theorem] Fisher's Z transform test (Kalisch & Bühlmann 2007, §2)
> Define the **Fisher Z-statistic**:
> $$Z_{ij \cdot S} = \frac{\sqrt{n - |S| - 3}}{2}
>   \log\!\left(\frac{1 + \hat{\rho}_{ij \cdot S}}{1 - \hat{\rho}_{ij \cdot S}}\right)
>   = \sqrt{n - |S| - 3} \cdot \mathrm{atanh}(\hat{\rho}_{ij \cdot S}).$$
>
> Under $H_0: \rho_{ij \cdot S} = 0$ (Gaussian assumption), $Z_{ij \cdot S}$ is
> **asymptotically $\mathcal{N}(0,1)$**.
>
> **Decision rule:** reject $H_0$ (keep the edge) at level $\alpha$ iff
> $|Z_{ij \cdot S}| > \Phi^{-1}(1-\alpha/2)$.
^thm-fisherz

The degree-of-freedom correction $n - |S| - 3$ is crucial: larger conditioning sets $|S|$
reduce effective degrees of freedom, making the test less powerful. This is why PC becomes
unreliable when large conditioning sets are required — which happens in dense graphs.

### Discrete data: the $\chi^2$ / G-test

For categorical variables, conditional independence is tested as:
$$X_i \perp\!\!\!\perp X_j \mid S \iff P(X_i, X_j \mid X_S) = P(X_i \mid X_S) \cdot P(X_j \mid X_S).$$

The **G-test** (log-likelihood ratio) statistic:
$$G^2 = 2 \sum_{\text{cells}} \text{(observed)} \cdot \ln\!\frac{\text{observed}}{\text{expected}}$$
is distributed $\chi^2$ with $(r_i - 1)(r_j - 1) \cdot \prod_{k \in S} r_k$ degrees of freedom
under $H_0$, where $r_k$ = number of levels of variable $k$. Cell-count sparsity is a practical
problem: the test is unreliable when many cells have expected count below 5.

### Non-parametric / kernel-based tests

For non-Gaussian continuous data:

- **Kernel-based Conditional Independence (KCI)** (Zhang et al. 2012): uses kernel embeddings
  of conditional distributions in a reproducing kernel Hilbert space. Tests $X \perp Y \mid Z$
  by comparing cross-covariance operators. Computationally expensive ($O(n^3)$) but
  consistent for a broad class of distributions.
- **Permutation tests**: bootstrap the null distribution by permuting $X_i$ within levels of $S$.
  Non-parametric and valid without distributional assumptions; slow.
- **Rank-based tests**: apply Fisher's Z to rank-transformed data (Spearman / Kendall partial
  correlations) — semi-parametric and robust to outliers.

### The significance level $\alpha$ and its effect

The significance level $\alpha$ is the sole tuning knob in the PC algorithm. It controls the
sparsity of the recovered skeleton:

| $\alpha$ regime | Effect | Consequence |
|-----------------|--------|-------------|
| Too small (e.g. $10^{-5}$) | Rarely reject $H_0$ | Over-dense skeleton; extra edges |
| Too large (e.g. $0.5$) | Frequently reject $H_0$ | Over-sparse skeleton; missing edges |
| Calibrated (e.g. $0.01$–$0.05$) | Type I and II errors balanced | Consistent skeleton in large $n$ |

For high-dimensional data, Kalisch & Bühlmann (2007) show consistency requires
$\alpha_n \to 0$ as $n \to \infty$, with the rate depending on the maximum conditioning set
size $q$.

### PC-stable: order-independent testing (Colombo & Maathuis 2014)

The original PC algorithm's output depends on the order in which nodes are processed, because
removing an edge changes the adjacency sets used as candidate conditioning sets at the next
step. **PC-stable** resolves this:

> [!definition] Definition: PC-stable (Colombo & Maathuis 2014)
> At conditioning-set order $l$, PC-stable first **determines all edges to remove** at level $l$
> using the adjacency sets $\mathsf{adj}(\mathcal{G}^{l-1})$ from the *previous* step for all
> pairs — and only then removes all of them simultaneously. The result is order-independent.
^def-pc-stable

PC-stable is the default implementation in the `pcalg` R package and `causal-learn` Python package.

## Connections

- **Skeleton phase of PC**: [[PC Algorithm]] calls this test iteratively with conditioning
  sets of size $0, 1, 2, \ldots$ — see that note for the full algorithm.
- **FCI algorithm**: extends PC to allow latent confounders; uses additional CI tests to
  orient edges into an ancestral graph (PAG).
- **Compared to GES**: [[GES Algorithm]] never performs CI tests; instead it evaluates a
  scoring criterion (BIC/BDeu). GES is preferred when the distributional form is well-specified;
  PC is preferred when the distributional form is unknown but the data are continuous/Gaussian.
- **Faithfulness requirement**: CI tests only correctly find d-separating sets if the
  distribution is faithful to the true DAG — i.e. no cancellation of paths makes two adjacent
  nodes appear independent. Violations cause spurious edge deletions.

## See Also
- [[PC Algorithm]] — uses CI tests to learn the skeleton and orient edges
- [[Markov Equivalence Classes and CPDAGs]] — what the CPDAG represents
- [[GES Algorithm]] — score-based alternative that avoids CI tests
- [[Directed Acyclic Graphs]] — d-separation and faithfulness
