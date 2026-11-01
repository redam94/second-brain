---
title: "Conditional Independence Testing in PC"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/kalisch2007-PC-algorithm-source.md]]"
source_location: "Kalisch & Bühlmann (2007) §2.1; Spirtes, Glymour & Scheines (2000) §5.4"
date_ingested: 2026-11-01
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[PC Algorithm]]"
  - "[[CPDAG and Markov Equivalence Classes]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "Fisher Z test causal discovery"
  - "CI test structure learning"
  - "Conditional independence test"
---

# Conditional Independence Testing in PC

> [!summary]
> The [[PC Algorithm]] delegates all empirical work to a **conditional independence (CI) test**:
> a statistical test for $H_0: X_i \perp\!\!\!\perp X_j \mid X_S$. The most common choice for
> continuous Gaussian data is **Fisher's Z test** (based on partial correlations). For
> non-Gaussian or non-linear data, kernel-based tests (HSIC) or distance correlations provide
> model-free alternatives. The choice of CI test and significance level $\alpha$ is the main
> tuning knob of the PC algorithm and determines both its power and false-discovery rate in
> edge recovery.

## Overview

All constraint-based structure learning methods — PC, FCI, RFCI — reduce to a sequence of CI
tests. The **skeleton discovery phase** of PC tests $H_0: X_i \perp\!\!\!\perp X_j \mid X_S$ for
increasingly large conditioning sets $S$. A failure to reject retains the edge $i - j$; a
rejection removes it. The statistical difficulty is the **multiple testing burden**: in a $d$-node
graph, the skeleton phase conducts $O(d^2 \cdot 2^q)$ tests in the worst case (bounded by
$q$ = max degree in practice), making family-wise error rate control important in high dimensions.

## Main Content

### Fisher's Z test (Gaussian data)

For multivariate Gaussian data, the CI relation $X_i \perp\!\!\!\perp X_j \mid X_S$ is equivalent to
**zero partial correlation**: $\rho_{ij \cdot S} = 0$.

> [!definition] Definition: Partial correlation (Gaussian CI)
> The **partial correlation** of $X_i$ and $X_j$ given $X_S$ is the correlation between the
> residuals of regressing $X_i$ on $X_S$ and regressing $X_j$ on $X_S$:
> $$\rho_{ij \cdot S} = \text{Corr}\!\left(X_i - \hat{X}_i^{(S)},\; X_j - \hat{X}_j^{(S)}\right)$$
> where $\hat{X}_i^{(S)} = \mathbb{E}[X_i \mid X_S]$.
> Under a multivariate Gaussian, $\rho_{ij \cdot S} = 0 \iff X_i \perp\!\!\!\perp X_j \mid X_S$.
^def-partial-correlation

The sample partial correlation $\hat{\rho}_{ij \cdot S}$ can be computed from the sample
correlation matrix $\hat{R}$ using the matrix inverse / recursive formula.

> [!definition] Definition: Fisher's Z statistic
> Let $\hat{\rho}_{ij \cdot S}$ be the sample partial correlation of $X_i$ and $X_j$ given $X_S$,
> based on $n$ observations. The **Fisher Z transformation** is:
> $$Z_{ij \cdot S} = \frac{1}{2}\log\frac{1 + \hat{\rho}_{ij \cdot S}}{1 - \hat{\rho}_{ij \cdot S}} = \text{artanh}(\hat{\rho}_{ij \cdot S}).$$
> Under $H_0: \rho_{ij \cdot S} = 0$, the test statistic
> $\sqrt{n - |S| - 3}\; |Z_{ij \cdot S}|$
> is asymptotically $\mathcal{N}(0, 1)$.
>
> **Reject $H_0$ (retain edge $i-j$)** if $\sqrt{n - |S| - 3}\;|Z_{ij \cdot S}| > z_{1-\alpha/2}$.
^def-fishers-z

> [!example] Example: Fisher's Z test for $n = 200$, $|S| = 2$, $\hat{\rho} = 0.12$
>
> Test statistic: $\sqrt{200 - 2 - 3} \cdot |\text{artanh}(0.12)| = \sqrt{195} \cdot 0.1203 \approx 1.68$.
> At $\alpha = 0.05$, critical value $z_{0.975} = 1.96$. Fail to reject $H_0$ → remove edge.
>
> Note: with $n = 100$ and the same correlation, the statistic would be $\approx 1.19$, also
> below the critical value. Larger samples are needed to detect weak associations.

### Computation via the correlation matrix inverse

For Gaussian data, partial correlations can be computed efficiently from the **precision matrix**
$\mathbf{\Omega} = \boldsymbol{\Sigma}^{-1}$ (sample: $\hat{\mathbf{\Omega}} = \hat{\boldsymbol{\Sigma}}^{-1}$):

$$\rho_{ij \cdot V \setminus \{i,j\}} = -\frac{\omega_{ij}}{\sqrt{\omega_{ii}\,\omega_{jj}}}$$

This is the **partial correlation given all other variables**, corresponding to the full
conditioning set $S = V \setminus \{i, j\}$. For smaller conditioning sets, use the sub-matrix
formula:

$$\hat{\rho}_{ij \cdot S} = -\frac{[\hat{\boldsymbol{\Sigma}}_{S \cup \{i,j\}}^{-1}]_{ij}}{\sqrt{[\hat{\boldsymbol{\Sigma}}_{S \cup \{i,j\}}^{-1}]_{ii}\;[\hat{\boldsymbol{\Sigma}}_{S \cup \{i,j\}}^{-1}]_{jj}}}$$

In `pcalg`, the `gaussCItest` function uses this formula, taking a precomputed correlation
matrix as sufficient statistic.

### Multiple testing and significance level

Since PC conducts many CI tests, **false edge removals** (type I errors) and **false edge
retentions** (type II errors) both affect structure recovery:
- Setting $\alpha$ too small: insufficiently powered tests retain edges → dense, incorrect skeleton
- Setting $\alpha$ too large: over-permissive tests remove true edges → sparse, incorrect skeleton

For high-dimensional consistency (Kalisch & Bühlmann 2007), the optimal significance level
decreases with $n$: $\alpha_n = 2(1 - \Phi(n^{1/4})) \approx 2e^{-\sqrt{n}/2}$ (a very small
level that nonetheless admits consistent testing because the Fisher Z statistic grows as $\sqrt{n}$).

In practice: $\alpha \in [0.01, 0.05]$ is typical for moderate-dimensional problems.

### Kernel-based CI tests (non-Gaussian / non-linear)

For non-Gaussian or non-linearly related variables, partial-correlation-based tests are invalid.
Kernel-based conditional independence tests provide a model-free alternative:

> [!definition] Definition: HSIC-based CI test (Gretton et al. 2008; Zhang et al. 2012)
> The **Kernel-based Conditional Independence Test (KCI)** tests $H_0: X_i \perp\!\!\!\perp X_j \mid X_S$
> using the **conditional Hilbert-Schmidt Independence Criterion** — a measure of association in
> a reproducing kernel Hilbert space (RKHS). The test statistic is:
> $$\text{KCI}_{ij \cdot S} = \frac{1}{n^2}\langle K_{\tilde{X}_i}, K_{\tilde{X}_j} \rangle_F$$
> where $K_{\tilde{X}_i}$ is the centered residual kernel matrix after "partialling out" $X_S$
> via kernel regression.
>
> The null distribution is obtained by permutation or bootstrap.
^def-kci

**Practical note:** KCI is more powerful than Fisher Z for non-linear dependencies but is
$O(n^3)$ per test (kernel matrix operations), making it slow for large $n$. For moderate $n$
(hundreds), it is practical; for large $n$, approximations (random Fourier features) are used.

### Discrete CI tests

For discrete (categorical) variables, the standard CI test is the **G-test** ($G^2$) or the
**chi-squared test** ($\chi^2$):

$$G^2 = 2 \sum_{x_i, x_j, x_S} n(x_i, x_j, x_S) \log\frac{n(x_i, x_j, x_S)\,n(x_S)}{n(x_i, x_S)\,n(x_j, x_S)}$$

Under $H_0$, $G^2 \sim \chi^2_{df}$ with $df = (|\text{Val}(X_i)|-1)(|\text{Val}(X_j)|-1)\prod_{s \in S}|\text{Val}(X_s)|$.

In `bnlearn` (R), the `pc.stable()` function uses $G^2$ by default for discrete data.

## Connections

- **PC algorithm structure**: CI tests are the workhorse of the [[PC Algorithm]]; the skeleton
  output and $\text{sep}$ sets feed directly into Phase II (v-structure orientation)
- **High-dimensional theory**: Kalisch & Bühlmann (2007) prove that Fisher's Z tests with
  level $\alpha_n \to 0$ yield consistent skeleton and CPDAG recovery — see [[PC Algorithm]]
- **Faithfulness requirement**: CI testing can only succeed when the distribution is faithful to
  the true DAG; accidental cancellations that create spurious CIs fool CI tests
- **Comparison to GES**: [[GES - Greedy Equivalence Search]] avoids CI testing entirely by
  using a score function; GES tends to be more robust to the multiple testing problem

## See Also
- [[PC Algorithm]] — the algorithm that uses these CI tests
- [[CPDAG and Markov Equivalence Classes]] — what the CI tests are recovering
- [[GES - Greedy Equivalence Search]] — score-based alternative that avoids CI tests
- [[V-Structures and Meek Orientation Rules]] — how sep sets are used to orient v-structures
