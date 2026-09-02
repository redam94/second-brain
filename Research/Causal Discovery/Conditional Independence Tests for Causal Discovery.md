---
title: "Conditional Independence Tests for Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-sources.md]]"
source_location: "Spirtes et al. (2000), Ch. 5; Kalisch & Bühlmann (2007), JMLR 8"
date_ingested: 2026-09-02
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Conditional Independence Assumption]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - conditional independence test
  - CI test
  - partial correlation test
  - Fisher Z test causal discovery
  - kernel conditional independence test
---

# Conditional Independence Tests for Causal Discovery

> [!summary]
> Constraint-based structure learning (e.g., [[PC Algorithm]]) identifies the skeleton and
> v-structures of a DAG by testing **conditional independence** (CI): does $X \perp Y \mid Z$
> hold in the data? The choice of CI test determines correctness, power, and scalability.
> For Gaussian data the **Fisher Z-test on partial correlations** is standard, exact, and
> $O(n)$ per test. For categorical data, $\chi^2$ tests apply. For non-Gaussian continuous data,
> **kernel-based CI tests** (HSIC, KCI) are consistent but $O(n^2)$–$O(n^3)$. The significance
> threshold $\alpha$ controls the sparsity of the recovered graph: larger $\alpha$ → fewer edges
> (sparser skeleton); smaller $\alpha$ → denser skeleton.

## Overview

CI tests are the core primitive of constraint-based causal discovery. Every call to the PC algorithm,
FCI (which handles latent variables), or any constraint-based variant reduces to a sequence of CI
tests: for each pair $(X_i, X_j)$ and conditioning set $S$, the algorithm asks "is $X_i \perp X_j \mid S$?"
The answer (reject / fail-to-reject) determines whether the edge $X_i - X_j$ survives in the skeleton.

The three main families of CI tests are:
1. **Parametric: Fisher Z** (Gaussian, linear)
2. **Non-parametric: $\chi^2$ / G-test** (categorical / discrete)
3. **Kernel-based: HSIC/KCI** (non-Gaussian continuous)

## Main Content

### Parametric: Fisher Z-test (Gaussian data)

> [!definition] Definition: Partial Correlation
> For jointly Gaussian variables $(X_i, X_j, X_S)$, the **partial correlation** $\rho_{ij|S}$
> is the correlation of $X_i$ and $X_j$ after linearly regressing out $X_S$:
> $$\rho_{ij|S} = \frac{-(\Sigma^{-1}_{S\cup\{i,j\}})_{ij}}{\sqrt{(\Sigma^{-1}_{S\cup\{i,j\}})_{ii} \cdot (\Sigma^{-1}_{S\cup\{i,j\}})_{jj}}},$$
> where $\Sigma_{S\cup\{i,j\}}$ is the marginal covariance of $(X_i, X_j, X_S)$.
> Under Gaussian assumptions, $X_i \perp X_j \mid X_S \iff \rho_{ij|S} = 0$.
^def-partial-corr

> [!theorem] Fisher Z-test for Conditional Independence
> Given $n$ i.i.d. Gaussian observations, let $r_{ij|S}$ be the sample partial correlation.
> The **Fisher Z-transformation**:
> $$Z_{ij|S} = \frac{\sqrt{n - |S| - 3}}{2} \log\frac{1 + r_{ij|S}}{1 - r_{ij|S}}$$
> is approximately standard normal under $H_0: \rho_{ij|S} = 0$.
>
> **Reject** $H_0$ (keep the edge) if $|Z_{ij|S}| > \Phi^{-1}(1 - \alpha/2)$.
> **Fail to reject** $H_0$ (remove edge, record $S$ as separator) if $|Z_{ij|S}| \leq \Phi^{-1}(1 - \alpha/2)$.
>
> **Complexity:** $O(|S|^3)$ for the partial correlation (matrix inversion), $O(1)$ per test
> given the precision matrix. Computing all tests is $O(d^2 \cdot p_{\max} \cdot |S|^3)$ where
> $p_{\max}$ is the maximum conditioning set size.
^thm-fisher-z

**Practical note for high-dimensional data ($d \gg n$):** The sample covariance matrix is
ill-conditioned when $d > n$. Kalisch & Bühlmann (2007) address this by using a skeleton-based
sparse covariance estimate, enabling the PC algorithm to scale to thousands of variables.

### Non-parametric: $\chi^2$ / G-test (categorical data)

For discrete (categorical) variables, conditional independence is tested via:

> [!definition] Definition: $\chi^2$ Test for CI
> For categorical $X_i, X_j, X_S$ with observed counts $n_{ijk}$ (cell $(i,j)$ given $S=k$),
> the **conditional $\chi^2$ test** computes:
> $$\chi^2 = \sum_{k} \sum_{i,j} \frac{(n_{ijk} - \hat{e}_{ijk})^2}{\hat{e}_{ijk}},$$
> where $\hat{e}_{ijk}$ are expected counts under $H_0: X_i \perp X_j \mid X_S = k$.
> The statistic is $\chi^2$-distributed with $(r_i - 1)(r_j - 1) \prod_k r_{s_k}$ degrees of freedom.
>
> **G-test (likelihood ratio):** $G = 2\sum n_{ijk} \log(n_{ijk}/\hat{e}_{ijk})$, asymptotically
> equivalent to $\chi^2$ but performs better in sparse tables.
^def-chisq-test

**Limitation:** Both tests require sufficient cell counts. With many levels or large $|S|$,
cells become sparse and the tests lose power. Maximum $|S|$ is typically 2–4 for categorical data
in practice.

### Kernel-based: HSIC and KCI (non-Gaussian continuous)

When data are continuous but non-Gaussian, partial correlation tests are invalid (the null
hypothesis $\rho_{ij|S} = 0$ is not equivalent to CI unless the joint is Gaussian).

> [!definition] Definition: KCI — Kernel-based Conditional Independence Test (Zhang et al. 2012)
> The **Kernel Conditional Independence (KCI)** test embeds $X_i, X_j, X_S$ in
> **reproducing kernel Hilbert spaces** (RKHSs) via kernel functions $k_i, k_j, k_S$.
> The test statistic is the **conditional cross-covariance operator** norm between
> $X_i$ and $X_j$ given $X_S$ in kernel space. Under $H_0: X_i \perp X_j \mid X_S$,
> the statistic converges in distribution (bootstrap or Gamma approximation).
>
> **Pros:** Consistent for any distribution; handles non-linear dependencies.
> **Cons:** $O(n^3)$ computation and $O(n^2)$ memory due to kernel matrix — impractical for $n > 1{,}000$.
^def-kci

For moderate $n$, approximations include:
- **RCIT** (Random Conditional Independence Test): uses random Fourier features to approximate
  kernel matrices in $O(n)$.
- **CMIknn**: conditional mutual information estimated via $k$-nearest neighbors.

### Choosing $\alpha$ and its effect on graph structure

The significance threshold $\alpha$ controls the sparsity/density tradeoff:

| $\alpha$ | Edge retention | Graph density | Risk |
|----------|---------------|--------------|------|
| Small (0.001) | Aggressive removal | Sparse | Miss true edges (false negatives) |
| Medium (0.01) | Balanced | Moderate | Standard practice |
| Large (0.05) | Conservative removal | Dense | Retain spurious edges (false positives) |

In high-dimensional settings ($d$ large), multiple testing is a concern. With $\binom{d}{2}$
pairs and up to $2^{d-2}$ conditioning sets, the family-wise error rate can blow up. Approaches:
- **Bonferroni correction:** $\alpha/\binom{d}{2}$ per test — very conservative.
- **Stable PC (Colombo & Maathuis 2014):** order-independent version of PC that is consistent
  even without Bonferroni correction when $\alpha = C n^{-a}$ for appropriate $C, a > 0$.

## Connections

- **PC Algorithm:** [[PC Algorithm]] calls CI tests at each step of skeleton learning. The choice
  of test and $\alpha$ is the primary hyperparameter of the PC algorithm.
- **Faithfulness and power:** Low-power CI tests (small $n$ or wrong distribution assumption)
  may miss true dependencies, violating faithfulness empirically even if the true DGP is faithful.
- **Causal sufficiency:** Standard CI tests assume no latent common causes. The FCI algorithm
  (Fast Causal Inference) relaxes this at the cost of outputting a PAG (Partial Ancestral Graph)
  rather than a CPDAG.
- **LiNGAM identification:** Under non-Gaussian noise, the full DAG is identifiable. LiNGAM (2006)
  uses ICA-based independence tests rather than CI tests, bypassing the Markov equivalence ceiling.

## See Also
- [[PC Algorithm]] — uses CI tests to recover the CPDAG
- [[Markov Equivalence Classes and CPDAGs]] — why CI tests can only recover the CPDAG
- [[Conditional Independence Assumption]] — the econometric context for CI
- [[Directed Acyclic Graphs]] — d-separation, back-door criterion, do-calculus
