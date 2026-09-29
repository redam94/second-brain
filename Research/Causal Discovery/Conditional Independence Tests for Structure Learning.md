---
title: "Conditional Independence Tests for Structure Learning"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/colombo-maathuis-2014-PC-SOURCE.txt]]"
source_location: "Colombo & Maathuis (2014) §2.1; Spirtes, Glymour & Scheines (2000) Ch. 5"
date_ingested: 2026-09-29
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "Fisher's z-test causal discovery"
  - "conditional independence test CI test"
  - "partial correlation test"
---

# Conditional Independence Tests for Structure Learning

> [!summary]
> Constraint-based causal discovery algorithms (PC, FCI) need a **conditional independence
> (CI) oracle** that decides, given a significance level $\alpha$, whether $X_i \perp\!\!\!\perp X_j \mid
> \mathbf{Z}$ in the data. In practice, three families of tests cover most settings:
> **Fisher's z-test** (Gaussian / partial correlation), **G²/χ² tests** (discrete), and
> **kernel-based tests** (non-Gaussian continuous). The choice of significance level $\alpha$
> acts as the primary sparsity tuning parameter: larger $\alpha$ → denser graphs.

## Overview

The **faithfulness assumption** says that the true independence structure is faithfully
reflected in the distribution. Constraint-based algorithms read off this structure via
statistical tests. Because the number of tests can be large (up to $O(2^d)$ in the worst
case, though exponential only in the max degree under sparsity), fast and reliable CI tests
are critical. The significance level $\alpha$ is a hyperparameter: it controls the
bias-variance tradeoff for the graph (more edges vs. sparser graph).

## Main Content

### Fisher's z-test (Gaussian data)

The most widely used CI test for continuous data assumes multivariate Gaussianity, where
conditional independence is equivalent to zero partial correlation.

> [!definition] Definition: Partial Correlation
> For variables $X_i$, $X_j$ and conditioning set $\mathbf{Z}$, the **partial correlation**
> $\rho_{ij \cdot \mathbf{Z}}$ is the correlation between the residuals of regressing $X_i$
> on $\mathbf{Z}$ and the residuals of regressing $X_j$ on $\mathbf{Z}$.
>
> Under multivariate normality: $X_i \perp\!\!\!\perp X_j \mid \mathbf{Z}$ if and only if
> $\rho_{ij \cdot \mathbf{Z}} = 0$.
^def-partial-correlation

> [!theorem] Theorem: Fisher's z-Test (Fisher 1924)
> Let $\hat{\rho}_{ij \cdot \mathbf{Z}}$ be the sample partial correlation based on $n$
> observations. The **Fisher z-transformation** gives an asymptotically standard-normal
> statistic:
>
> $$z_{ij \cdot \mathbf{Z}} = \frac{\sqrt{n - |\mathbf{Z}| - 3}}{2} \log\frac{1 + \hat{\rho}_{ij \cdot \mathbf{Z}}}{1 - \hat{\rho}_{ij \cdot \mathbf{Z}}} \;\xrightarrow{d}\; \mathcal{N}(0, 1) \text{ under } H_0: \rho_{ij \cdot \mathbf{Z}} = 0.$$
>
> **Decision rule**: reject $H_0$ (declare edge present) if $|z_{ij \cdot \mathbf{Z}}| > \Phi^{-1}(1 - \alpha/2)$.
> Otherwise accept $X_i \perp\!\!\!\perp X_j \mid \mathbf{Z}$ (remove edge).
>
> **Complexity**: $O(|\mathbf{Z}|^3)$ per test via partial covariance inverse, achievable via
> conditioning on the precision matrix $\Theta = \Sigma^{-1}$: $\rho_{ij \cdot V\setminus\{i,j\}}
> = -\theta_{ij}/\sqrt{\theta_{ii}\theta_{jj}}$.
^thm-fishers-z

### G² and χ² tests (discrete data)

For discrete variables with finite state spaces, CI tests use log-likelihood ratio (G²) or
Pearson's chi-squared (χ²) statistics on contingency tables.

> [!definition] Definition: G² Statistic for CI Testing
> For discrete $X_i$, $X_j$ with states $x$, $y$ and conditioning set $\mathbf{Z}$ with
> states $\mathbf{z}$, the **G² statistic** for $H_0: X_i \perp\!\!\!\perp X_j \mid \mathbf{Z}$ is:
>
> $$G^2 = 2 \sum_{\mathbf{z}} \sum_{x, y} n_{xy\mathbf{z}} \log \frac{n_{xy\mathbf{z}} \cdot n_{\mathbf{z}}}{n_{x\mathbf{z}} \cdot n_{y\mathbf{z}}}$$
>
> Under $H_0$, $G^2 \xrightarrow{d} \chi^2_{(r_i - 1)(r_j - 1) \cdot r_\mathbf{Z}}$ where $r_k$
> is the number of states of variable $k$.
>
> **Limitation**: sparse cells (many state combinations, few observations) inflate type I
> errors. Rule of thumb: at least 5 observations per cell. Conditioning sets $|\mathbf{Z}| \geq 3$
> quickly become unreliable without large $n$.
^def-g2-test

### Kernel-based tests (non-Gaussian continuous)

For non-Gaussian continuous data (the most realistic setting), kernel-based CI tests offer
non-parametric alternatives at higher computational cost.

> [!definition] Definition: Kernel Conditional Independence Test (KCI)
> The **Kernel CI Test** (Zhang et al. 2012) tests $H_0: X_i \perp\!\!\!\perp X_j \mid \mathbf{Z}$ by:
> 1. Computing the centralized RKHS cross-covariance operator $\hat{V}_{ij|\mathbf{Z}}$ using
>    a kernel (typically RBF/Gaussian).
> 2. Computing the Hilbert-Schmidt norm $\lVert \hat{V}_{ij|\mathbf{Z}} \rVert_{HS}^2$ as test statistic.
> 3. Comparing to a permutation null or Gamma approximation.
>
> **Advantage**: consistent for any dependency structure, not just linear/Gaussian.
> **Cost**: $O(n^3)$ per test — prohibitive for large $n$. Nyström approximations reduce to
> $O(n m^2)$ for $m$ inducing points.
^def-kci

### Significance level as sparsity control

> [!note] The α–Sparsity Tradeoff
> In the PC algorithm, the significance level $\alpha$ plays the role of a **regularisation parameter**:
>
> | $\alpha$ small (e.g. 0.001) | $\alpha$ large (e.g. 0.1) |
> |---|---|
> | Hard to reject $H_0$: declare independence | Easy to reject $H_0$: declare dependence |
> | Sparse graph, fewer false edges | Dense graph, more edges retained |
> | Risk: missing true edges (underfitting) | Risk: spurious edges (overfitting) |
>
> Unlike model-selection criteria (BIC, AIC), $\alpha$ does not automatically adapt to
> sample size — practitioners must choose it or tune it via cross-validation. Typical values
> in practice: $\alpha \in \{0.01, 0.05\}$.

### Multiple testing

Running CI tests for all pairs and conditioning sets induces a multiple testing problem.
The PC algorithm does **not** apply a Bonferroni correction; it relies on consistency
(correct discovery in the large-sample limit) rather than finite-sample error control.
For inference, [[Multiple Testing Corrections]] methods (Bonferroni, BH-FDR) can be applied
to the CI tests, but doing so while maintaining the sequential structure of the algorithm
is non-trivial.

## Connections

- **PC Algorithm**: uses CI tests to build the skeleton (remove edges where CI test accepts
  $H_0$). See [[PC Algorithm]].
- **NOTEARS**: avoids CI tests entirely — replaces the combinatorial search with a continuous
  optimization. See [[NOTEARS - Overview]].
- **Faithfulness**: CI tests are valid only if the true distribution is faithful to the graph.
  Violations inflate false-positive rates.
- **Gaussian assumption**: Fisher's z-test is standard in pcalg (R) and causal-learn (Python)
  for continuous data; KCI tests are available in causal-learn for non-Gaussian settings.

## See Also
- [[PC Algorithm]] — uses these tests in its skeleton-learning phase
- [[Markov Equivalence and CPDAGs]] — faithfulness assumption grounding
- [[Multiple Testing Corrections]] — controlling error rates across many tests
- [[DAG Structure Learning Problem]] — broader framing of structure learning
