---
title: "Conditional Independence Testing for Structure Learning"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-PC-algorithm-source.md]]"
source_location: "Kalisch & Bühlmann (2007), §2.2; Spirtes et al. (2000), Ch. 5"
date_ingested: 2026-11-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Directed Acyclic Graphs]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "Fisher z-test causal discovery"
  - "partial correlation test"
  - "kernel CI test"
  - "conditional independence test"
---

# Conditional Independence Testing for Structure Learning

> [!summary]
> The **PC algorithm** and other constraint-based methods reduce DAG structure learning to a
> sequence of *conditional independence (CI) tests*: is $X \perp\!\!\!\perp Y \mid \mathbf{S}$?
> For Gaussian data, Fisher's z-test on partial correlations is the standard choice — it is
> computationally cheap and has well-characterised asymptotic power. For discrete data, the
> $G$-test or $\chi^2$ test applies. For general (non-Gaussian, nonlinear) distributions, kernel
> CI tests (HSIC-based, KCIT, KCI) provide nonparametric alternatives at much higher
> computational cost. The choice of CI test determines the PC algorithm's power in practice.

## Overview

Conditional independence testing is the computational core of the PC algorithm. At each step
of skeleton discovery, the algorithm must test whether $X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$
for various subsets $\mathbf{S}$. The power and size of these tests directly determine:
- **False positives** (Type I): retaining edges that should be absent → too-dense skeleton.
- **False negatives** (Type II): removing edges that should be present → too-sparse skeleton.

Both errors propagate to the orientation stage (wrong v-structures, wrong CPDAG).

## Main Content

### Fisher's Z-Test (Gaussian Linear Case)

> [!definition] Fisher's Z-Test for Partial Correlation
> **Assumption:** $(X_i, X_j, \mathbf{S})$ are jointly Gaussian.
>
> The **partial correlation** $\rho_{ij \mid \mathbf{S}}$ between $X_i$ and $X_j$ given
> $\mathbf{S}$ is the correlation between the residuals of regressing $X_i$ on $\mathbf{S}$
> and $X_j$ on $\mathbf{S}$:
> $$\rho_{ij \mid \mathbf{S}} = \text{Corr}(X_i - \hat{X}_i^{\mathbf{S}},\; X_j - \hat{X}_j^{\mathbf{S}})$$
>
> Under Gaussianity: $X_i \perp\!\!\!\perp X_j \mid \mathbf{S} \iff \rho_{ij \mid \mathbf{S}} = 0$.
>
> **Test statistic (Fisher 1924):**
> $$z_{ij \mid \mathbf{S}} = \frac{1}{2} \log\!\left(\frac{1 + \hat{\rho}_{ij \mid \mathbf{S}}}{1 - \hat{\rho}_{ij \mid \mathbf{S}}}\right)$$
> This is the Fisher z-transformation of the sample partial correlation $\hat{\rho}$.
>
> Under $H_0: \rho_{ij \mid \mathbf{S}} = 0$, as $n \to \infty$:
> $$\sqrt{n - |\mathbf{S}| - 3} \cdot z_{ij \mid \mathbf{S}} \xrightarrow{d} \mathcal{N}(0, 1).$$
>
> **Decision rule:** Reject $H_0$ (retain edge) if
> $|z_{ij \mid \mathbf{S}}| > z_{\alpha/2}$ where $z_{\alpha/2}$ is the $(1-\alpha/2)$ quantile
> of $\mathcal{N}(0,1)$.
>
> **Computational cost:** $O(n)$ for a single test given pre-computed partial correlation.
> For all tests with $|\mathbf{S}| \leq q$: $O(p^{q+2} \cdot n)$ total.

^def-fisher-z-test

### The Significance Level and Consistency

For PC algorithm consistency (Kalisch & Bühlmann 2007), the significance level $\alpha_n$ must
shrink with $n$:
- **Too large $\alpha_n$:** Many Type I errors → too many edges retained → overcomplete graph.
- **Too small $\alpha_n$:** Many Type II errors → too many edges pruned → undercomplete graph.
- **Optimal rate:** $\alpha_n = 1 - \Phi(C\sqrt{\log p})$ for a constant $C$, or equivalently,
  $\alpha_n = O(1/p^2)$ as $p \to \infty$. This is the rate in Kalisch & Bühlmann's Theorem 3.

In practice, $\alpha \in [0.01, 0.05]$ is common for fixed $p$. For high-dimensional data,
$\alpha$ should be chosen adaptively (e.g., via BH-correction for multiple testing — see
[[Multiple Testing Corrections]]).

### Discrete Data: G-Test and Chi-Squared Test

> [!definition] G-Test for Discrete Variables
> For discrete $X_i, X_j$ with conditioning set $\mathbf{S}$:
>
> $$G = 2 \sum_{\mathbf{s}, x_i, x_j} n_{x_i x_j \mathbf{s}} \log\!\frac{n_{x_i x_j \mathbf{s}} \cdot n_{\mathbf{s}}}{n_{x_i \mathbf{s}} \cdot n_{x_j \mathbf{s}}}$$
>
> Under $H_0: X_i \perp\!\!\!\perp X_j \mid \mathbf{S}$:
> $$G \xrightarrow{d} \chi^2_{(r_i - 1)(r_j - 1) \prod_k r_k}$$
> where $r_\ell$ is the number of levels of variable $X_\ell$.
>
> **Limitation:** Sparse cells degrade the $\chi^2$ approximation. For small $n$, exact
> Fisher tests or permutation tests are preferred.

### Kernel CI Tests (Non-Gaussian / Nonlinear)

For non-Gaussian or nonlinear settings, kernel-based CI tests are the standard alternative:

> [!definition] KCIT / KCI Test (Zhang et al. 2012; Strobl et al. 2019)
> The **Kernel Conditional Independence Test (KCIT)** tests $X \perp\!\!\!\perp Y \mid \mathbf{Z}$
> using a kernel-based statistic:
> $$T_{\text{KCIT}} = \frac{1}{n} \text{tr}(\mathbf{R}_{XZ} \mathbf{R}_{YZ})$$
> where $\mathbf{R}_{XZ}$ and $\mathbf{R}_{YZ}$ are kernel matrices of residuals after
> regression in RKHS. Under $H_0$, $T_{\text{KCIT}}$ follows a gamma distribution (approx.)
> whose parameters can be estimated.
>
> **HSIC-based tests:** The Hilbert-Schmidt Independence Criterion (HSIC) is a kernel measure
> of dependence; testing $\text{HSIC}(X, Y) = 0$ tests marginal independence. For *conditional*
> independence one conditions on $\mathbf{Z}$ using projected kernel features.
>
> **Limitations of kernel CI tests:**
> - **Computational cost:** $O(n^3)$ for naive kernel inversion; approximations exist ($O(n^2)$).
> - **Power in high dimensions:** Kernel tests lose power as $|\mathbf{S}|$ grows (curse of
>   dimensionality in the kernel space).
> - For practical use with PC algorithm, kernel CI tests are used only for small $p$
>   (e.g., $p \leq 50$).

### Test Ordering and Multiple Testing

In the PC algorithm, many CI tests are performed: for $p$ variables and maximum degree $q$,
the number of tests is $O(p^{q+2})$. This raises multiple testing concerns:

- **Bonferroni correction:** Use $\alpha' = \alpha / M$ where $M$ is the number of tests.
  Conservative but valid; recommended for small $n/p$.
- **No correction:** In practice, many PC implementations use a fixed $\alpha$ without
  multiple testing correction, accepting that the type-I family-wise error rate is inflated.
  Consistency proofs absorb this via the rate condition on $\alpha_n$.
- **BH procedure:** Benjamini-Hochberg at FDR level $q^*$ can be applied to all $p$-values.
  See [[Multiple Testing Corrections]].

## Connections

- **PC Algorithm** ([[PC Algorithm]]): CI tests are the computational building block of PC
  skeleton discovery — one test per candidate edge per conditioning set size.
- **Directed Acyclic Graphs** ([[Directed Acyclic Graphs]]): The d-separation criterion defines
  exactly which CI relations a DAG implies; CI tests check these relations empirically.
- **Gaussian processes / kernel methods** ([[Hilbert Space Gaussian Processes]]): Kernel CI tests
  are related to GP regression — the RKHS framework is shared.
- **Multiple Testing** ([[Multiple Testing Corrections]]): The large number of CI tests in
  PC calls for consideration of multiple testing adjustments.

## See Also
- [[PC Algorithm]] — uses these CI tests in its skeleton discovery phase
- [[Markov Equivalence and CPDAGs]] — the CI structure that PC exploits
- [[Multiple Testing Corrections]] — relevant for controlling error rates across many tests
- [[Directed Acyclic Graphs]] — d-separation defines the theoretical CI structure
