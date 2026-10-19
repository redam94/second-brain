---
title: "Conditional Independence Testing for Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-CPS-reference.md]]"
source_location: "Spirtes et al. 2000, Ch. 3; Kalisch & Bühlmann 2007 §3"
date_ingested: 2026-10-19
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[CPDAG and Markov Equivalence]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "CI test causal discovery"
  - "partial correlation test"
  - "Fisher's Z test causal"
---

# Conditional Independence Testing for Causal Discovery

> [!summary]
> The **PC algorithm** operationalizes the faithfulness assumption via **conditional independence
> (CI) tests**: statistical tests of the null hypothesis $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$
> for various conditioning sets $\mathbf{S}$. The choice of test depends on data type (continuous
> Gaussian, discrete, non-parametric). For Gaussian data, **Fisher's Z-test** on partial
> correlations is the standard; for discrete data, the **G-squared test** (or chi-squared); for
> non-parametric settings, **kernel-based tests** (HSIC, KCIT) apply. The significance level
> $\alpha$ is a crucial tuning parameter: lower $\alpha$ means sparser graphs (fewer edges accepted).

## Overview

CI testing is the computational engine of constraint-based causal discovery. Every edge removal in
Phase I of [[PC Algorithm]] is backed by a CI test that "accepts" the null
$X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$ — so errors in the test propagate directly into the
recovered graph. Understanding the tests, their assumptions, and their failure modes is essential
for applying PC in practice.

**The fundamental challenge:** At conditioning set size $|\mathbf{S}| = k$, we are testing a
*joint* statement about a $(k+2)$-dimensional distribution. With limited $n$, large $k$ makes
tests unreliable. This is why the **sparsity assumption** in Kalisch & Bühlmann (2007) is
critical: it limits the maximum $k$ needed, and thus the maximum conditioning set size in Phase I.

## Main Content

### Gaussian Data: Partial Correlation and Fisher's Z-Test

For multivariate Gaussian data $X \sim \mathcal{N}(\mu, \Sigma)$, the CI structure is
entirely determined by the **partial correlations** $\rho_{ij \mid \mathbf{S}}$.

> [!definition] Definition: Partial Correlation
> The **partial correlation** of $X_i$ and $X_j$ given $\mathbf{S} = \{X_{k_1}, \dots, X_{k_m}\}$
> is the correlation of the residuals of $X_i$ and $X_j$ after linearly regressing out $\mathbf{S}$:
> $$\rho_{ij \mid \mathbf{S}} = \mathrm{Corr}(X_i - \hat{X}_i^{\mathbf{S}},\ X_j - \hat{X}_j^{\mathbf{S}}),$$
> where $\hat{X}_i^{\mathbf{S}} = \mathbb{E}[X_i \mid \mathbf{S}]$ is the linear projection.
>
> For Gaussians: $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$ $\iff$ $\rho_{ij \mid \mathbf{S}} = 0$.
^def-partial-correlation

> [!theorem] Theorem: Fisher's Z-Test (Fisher 1924)
> Given $n$ i.i.d. Gaussian observations, the test statistic for $H_0: \rho_{ij \mid \mathbf{S}} = 0$:
> $$Z_{ij \mid \mathbf{S}} = \frac{\sqrt{n - |\mathbf{S}| - 3}}{2} \ln \frac{1 + \hat\rho_{ij \mid \mathbf{S}}}{1 - \hat\rho_{ij \mid \mathbf{S}}}$$
> is asymptotically $\mathcal{N}(0, 1)$ under $H_0$. Reject $H_0$ (keep the edge) if
> $|Z_{ij \mid \mathbf{S}}| > \Phi^{-1}(1 - \alpha/2)$.
>
> **Effective sample size degrades:** the denominator $n - |\mathbf{S}| - 3$ decreases with
> conditioning set size, so large $|\mathbf{S}|$ requires large $n$ for reliable tests.
^thm-fisher-z

> [!note] Computational shortcut via precision matrix
> For Gaussians, all partial correlations are encoded in the **precision matrix**
> $\Omega = \Sigma^{-1}$: $X_i \perp\!\!\!\perp X_j \mid X_{\mathsf{V} \setminus \{i,j\}}$
> $\iff$ $\Omega_{ij} = 0$. The sample estimate $\hat\Omega = \hat\Sigma^{-1}$ allows computing
> all order-$(d-2)$ partial correlations from a single $O(d^3)$ matrix inversion. For smaller
> conditioning sets, recursive formulas from $\Sigma$ are more efficient.

### Discrete Data: G-Squared and Chi-Squared Tests

For categorical variables $X_i$ taking values in finite sets:

> [!theorem] G-Squared (Likelihood Ratio) Test
> For $X_i$ and $X_j$ with $r$ and $c$ levels, conditioning on $\mathbf{S} = s$ with $N_{ij|s}$
> joint observations:
> $$G^2 = 2 \sum_s \sum_{a,b} N_{ij|s}^{ab} \ln \frac{N_{ij|s}^{ab} N_{|s}}{N_{i|s}^{a} N_{j|s}^{b}}$$
> is asymptotically $\chi^2_{(r-1)(c-1) \cdot |\mathsf{dom}(\mathbf{S})|}$ under
> $H_0: X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$.
>
> **Limitation:** requires sufficient cell counts — sparse contingency tables invalidate the
> asymptotic approximation. With conditioning sets of size $\geq 4$, cell counts quickly fall below 5.
^thm-g-squared

The **chi-squared test** ($\chi^2$ statistic instead of $G^2$) is equivalent in the large-$n$ limit but $G^2$ is generally preferred as it is the proper likelihood ratio.

### Non-Parametric Tests: HSIC and KCIT

For continuous non-Gaussian or mixed data, kernel-based tests are standard:

> [!definition] Definition: HSIC (Hilbert-Schmidt Independence Criterion)
> The **HSIC** measures statistical dependence between $X_i$ and $X_j$ via their cross-covariance
> operator in a **reproducing kernel Hilbert space (RKHS)**:
> $$\text{HSIC}(X_i, X_j) = \mathbb{E}[k(X_i, X_i') k(X_j, X_j')] + \mathbb{E}[k(X_i,X_i')] \mathbb{E}[k(X_j,X_j')] - 2\mathbb{E}[k(X_i,X_i')\mathbb{E}_{X_j'}[k(X_j,X_j')]]$$
> where $k$ is a characteristic kernel (e.g., Gaussian RBF). HSIC $= 0 \iff X_i \perp\!\!\!\perp X_j$.
>
> **KCIT** (Kernel CI Test; Zhang et al. 2012) extends this to the conditional case
> $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$, testing via a regression residual approach in RKHS.
^def-hsic

**Trade-offs:**

| Test | Data type | Assumption | Computation |
|------|-----------|-----------|-------------|
| Fisher's Z | Continuous Gaussian | Linearity, normality | $O(|\mathbf{S}|^3)$ per test |
| G-squared / $\chi^2$ | Discrete | Sufficient cell counts | $O(n \cdot |\mathsf{dom}(\mathbf{S})|)$ |
| HSIC | Continuous non-parametric | Characteristic kernel | $O(n^2)$ or $O(n \log n)$ |
| KCIT | Non-parametric conditional | RKHS regularity | $O(n^3)$ per test |

### Significance Level α as a Tuning Parameter

> [!note] α controls graph sparsity
> The significance level $\alpha$ is a key hyperparameter:
> - **Small $\alpha$** (e.g., 0.001): fewer edges are accepted (edges require stronger evidence of
>   independence to be removed). Result: **denser** graph, fewer false negatives (missed edges),
>   more false positives (spurious edges).
> - **Large $\alpha$** (e.g., 0.05): more edges removed. Result: **sparser** graph.
>
> Unlike in classical hypothesis testing, there is no theoretically correct single $\alpha$:
> the choice reflects a bias-variance trade-off in the structural estimate. In the high-dimensional
> consistent result (Kalisch & Bühlmann 2007), $\alpha_n \to 0$ at rate $o(n^{-1/2})$ is required.

### Multiple Testing Issue

PC performs $O(d^2)$ tests just at level $l=0$, and many more at higher levels. This raises
concerns about false positive edge retention. Standard practice:

1. **Bonferroni correction** is overly conservative (removes too many edges).
2. **No correction** (unadjusted $\alpha$) is the norm for PC — the iterative pruning of conditioning
   sets provides some implicit control, and the consistency result holds without Bonferroni.
3. **FDR-based corrections** (Benjamini-Hochberg) are sometimes applied but rarely in the standard implementation.

## Examples

> [!example] Example: Sachs protein signalling network (Sachs et al. 2005)
> 853 observations of 11 proteins. Using Fisher's Z-test with $\alpha = 0.01$:
> PC-stable recovers a skeleton with ~17 adjacencies (vs. 55 in the complete graph).
> The resulting CPDAG matches ~65% of the directed edges in the known protein network.
> This is the same dataset used in [[NOTEARS Experiments]], where NOTEARS achieves comparable SHD.

## Connections

- **PC algorithm**: CI tests are the computational primitive for Phase I skeleton learning.
  See [[PC Algorithm]].
- **GES**: does *not* use CI tests — uses a score function instead. When the score is BIC for
  Gaussians, GES is equivalent to PC in the large-sample limit. See [[Greedy Equivalence Search (GES)]].
- **Faithfulness**: the validity of CI testing for structure learning depends on faithfulness.
  See [[CPDAG and Markov Equivalence#^def-faithfulness]].
- **Markov blanket learning**: algorithms like IAMB (Incremental Association Markov Blanket)
  use the same CI tests but focus on the local structure around a target variable.

## See Also
- [[PC Algorithm]] — uses these tests in Phase I
- [[CPDAG and Markov Equivalence]] — the faithfulness assumption that links CI to graph structure
- [[Greedy Equivalence Search (GES)]] — score-based alternative that avoids CI testing
- [[DAG Structure Learning Problem]] — broader landscape of causal discovery approaches
