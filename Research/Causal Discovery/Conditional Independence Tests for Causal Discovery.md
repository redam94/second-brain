---
title: "Conditional Independence Tests for Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/kalisch2007-PC.txt]]"
source_location: "Kalisch & Bühlmann (2007) §2; Spirtes et al. (2000) Ch. 5"
date_ingested: 2026-09-05
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "CI test"
  - "conditional independence test"
  - "Fisher z-test causal discovery"
  - "partial correlation test"
  - "kernel CI test"
---

# Conditional Independence Tests for Causal Discovery

> [!summary]
> **Constraint-based** causal discovery algorithms (PC, FCI, RFCI) reduce structure learning
> to a series of **conditional independence (CI) tests**: given a conditioning set $S$, test
> whether $X_i \perp X_j \mid X_S$ in the population distribution. The most common test is
> **Fisher's z-test** for Gaussian data (based on partial correlations), but χ²/G-tests for
> discrete data and **kernel CI tests** (KCI) for nonparametric settings are also standard.
> The correctness of PC and related algorithms depends entirely on these tests being
> **consistent** — the algorithm's correctness guarantees are oracle-conditional-independence
> results adapted to finite samples via the chosen test's asymptotic properties.

## Overview

The key primitive of constraint-based causal discovery is: *given observations of variables
$X_1, \ldots, X_d$ and a candidate conditioning set $S \subset \{1,\ldots,d\} \setminus \{i,j\}$,
determine whether $X_i \perp X_j \mid X_S$ holds in the joint distribution $\mathbb{P}$.* The
answer drives the skeleton discovery phase of [[PC Algorithm]]: reject the edge $(i, j)$ if and
only if some $S$ makes $X_i$ and $X_j$ conditionally independent.

Different distributional assumptions call for different tests. This note covers the three
main families used in practice.

## Main Content

### Setup

> [!definition] Definition: Conditional Independence (CI)
> Random variables $X_i$ and $X_j$ are **conditionally independent given $X_S$**, written
> $X_i \perp\!\!\!\perp X_j \mid X_S$, if for all measurable sets $A$, $B$, $C$:
> $$\mathbb{P}(X_i \in A,\, X_j \in B \mid X_S \in C) = \mathbb{P}(X_i \in A \mid X_S \in C)\,\mathbb{P}(X_j \in B \mid X_S \in C).$$
> Equivalently, the conditional distribution of $X_i$ given $X_S$ does not depend on $X_j$,
> and vice versa.
^def-ci

The **faithfulness assumption** links CI in the distribution to d-separation in the DAG
(see [[Directed Acyclic Graphs]]): under faithfulness, $X_i \perp X_j \mid X_S$ in the
distribution if and only if $X_i$ and $X_j$ are d-separated by $S$ in the true DAG.
This makes CI tests a reliable probe of the graph's structure.

### Gaussian Data: Partial Correlation and Fisher's z-test

For **multivariate Gaussian** data (or linear SEM with Gaussian noise), conditional
independence is equivalent to **zero partial correlation**.

> [!definition] Definition: Partial Correlation $\rho_{ij \mid S}$
> Given a random vector $(X_1, \ldots, X_d) \sim \mathcal{N}(\mu, \Sigma)$, the
> **partial correlation** of $X_i$ and $X_j$ conditioning on $X_S$ is the correlation
> between the residuals of regressing $X_i$ on $X_S$ and regressing $X_j$ on $X_S$:
> $$\rho_{ij \mid S} = -\frac{[\Sigma^{-1}_{(S \cup \{i,j\})}]_{ij}}
>                          {\sqrt{[\Sigma^{-1}_{(S \cup \{i,j\})}]_{ii}\,[\Sigma^{-1}_{(S\cup\{i,j\})}]_{jj}}},$$
> where $\Sigma^{-1}_{(S \cup \{i,j\})}$ is the precision submatrix on $\{i\} \cup \{j\} \cup S$.
>
> **Key fact:** For multivariate Gaussian, $X_i \perp X_j \mid X_S \iff \rho_{ij \mid S} = 0$.
^def-partial-corr

> [!theorem] Fisher's z-test for Conditional Independence (Fisher, 1924; Kalisch & Bühlmann, 2007)
> Let $\hat{\rho}_{ij \mid S}$ be the sample partial correlation computed from $n$ observations.
> Define the **Fisher z-transform**:
> $$z_{ij \mid S} = \frac{1}{2}\ln\!\left(\frac{1 + \hat{\rho}_{ij \mid S}}{1 - \hat{\rho}_{ij \mid S}}\right) = \mathrm{arctanh}(\hat{\rho}_{ij \mid S}).$$
> Under $H_0: \rho_{ij \mid S} = 0$ (i.e., $X_i \perp X_j \mid X_S$) and multivariate Gaussianity:
> $$\sqrt{n - |S| - 3}\;z_{ij \mid S} \xrightarrow{d} \mathcal{N}(0, 1).$$
> **Decision rule:** Reject $H_0$ (retain edge $(i,j)$) at level $\alpha$ if
> $$\left|\sqrt{n - |S| - 3}\;z_{ij \mid S}\right| > z_{\alpha/2},$$
> where $z_{\alpha/2}$ is the $(1-\alpha/2)$ quantile of the standard normal.
> Accept $H_0$ (remove edge $(i,j)$, record $\mathrm{sep}(i,j)=S$) otherwise.
^thm-fisher-z

**Practical note:** The sample partial correlation $\hat{\rho}_{ij|S}$ can be computed efficiently
from the **sample covariance matrix** $\hat{\Sigma}$ by inverting the submatrix
$\hat{\Sigma}_{S \cup \{i,j\}}$ — no separate regression is needed for each pair.

**Significance level $\alpha$:** Typically set to $\alpha = 0.01$ or $\alpha = 0.05$.
Kalisch & Bühlmann (2007) note that for consistency in the high-dimensional limit,
$\alpha$ must approach $0$ at a suitable rate with $n$, e.g., $\alpha = 1/n$.

### Discrete Data: G-test and χ²-test

For **categorical** variables, conditional independence is tested via the **G-test** (log-likelihood
ratio) or Pearson **χ²-test** on conditional contingency tables.

> [!definition] G-test for CI (discrete data)
> Let $X_i$, $X_j$ be discrete with $r_i$ and $r_j$ levels respectively, and $X_S$ be a
> discrete conditioning set. For each cell $\mathbf{s}$ of $X_S$, form the contingency
> table of $(X_i, X_j)$ given $X_S = \mathbf{s}$.
>
> The **G-statistic** is:
> $$G = 2 \sum_{\mathbf{s}} \sum_{a, b} n_{ab|\mathbf{s}} \ln\!\left(\frac{n_{ab|\mathbf{s}} \, n_{++|\mathbf{s}}}{n_{a+|\mathbf{s}} \, n_{+b|\mathbf{s}}}\right),$$
> where $n_{ab|\mathbf{s}}$ is the count of $(X_i=a, X_j=b, X_S=\mathbf{s})$.
>
> Under $H_0$, $G \sim \chi^2_\nu$ with degrees of freedom
> $\nu = (r_i - 1)(r_j - 1)\prod_{k \in S} r_k$.
^def-gtest

**Limitation:** For large $|S|$, the number of cells in the conditional table grows exponentially
in $|S|$, requiring many observations per cell for valid asymptotics. This sparsity problem
limits the size of conditioning sets in practice — a key bottleneck for PC on discrete data.

### Nonparametric: Kernel Conditional Independence Test (KCI)

For non-Gaussian continuous data or data with complex nonlinear dependencies, the
**Kernel CI Test (KCI)** (Zhang et al., 2012) is the standard nonparametric approach.

> [!definition] KCI: Kernel Conditional Independence Test (Zhang et al., 2012)
> KCI tests $X_i \perp X_j \mid X_S$ by measuring the **conditional cross-covariance
> operator** in a reproducing kernel Hilbert space (RKHS).
>
> **Key idea:** Regress out $X_S$ from both $X_i$ and $X_j$ using kernel ridge regression,
> obtain residuals $\tilde{X}_i$ and $\tilde{X}_j$, then test whether these residuals are
> independent using a kernel-based HSIC (Hilbert–Schmidt Independence Criterion).
>
> Under $H_0$: KCI statistic $\to 0$ at rate $1/\sqrt{n}$.
> The null distribution is approximated by a **Gamma distribution** or by permutation.
^def-kci

**Trade-offs:** KCI makes no distributional assumptions and detects any form of conditional
dependence, but is **computationally expensive** ($O(n^3)$ due to kernel matrix inversion) and
requires tuning of kernel bandwidth. For Gaussian data, Fisher's z-test is strictly preferred.

## Summary of Test Selection

| Data type | Recommended test | Null distribution | Conditioning set cost |
|-----------|-----------------|-------------------|----------------------|
| Gaussian (or linear SEM) | Fisher's z-test | $\mathcal{N}(0,1)$ | Constant: partial corr. from $\hat{\Sigma}^{-1}$ |
| Discrete/categorical | G-test or χ² | $\chi^2_\nu$ | Grows exp. in $|S|$; sparsity risk |
| Nonparametric (non-Gaussian continuous) | KCI | Gamma / permutation | $O(n^3)$ per test |

## Connections

- **PC Algorithm**: CI tests are the core subroutine of [[PC Algorithm]]. Skeleton discovery
  tests all pairs $(i,j)$ with conditioning sets of increasing size.
- **Faithfulness**: the correctness of CI-test-based algorithms requires the faithfulness
  assumption (see [[DAG Structure Learning Problem]]).
- **Finite-sample validity**: Fisher's z-test is consistent for the PC algorithm under the
  high-dimensional asymptotics of Kalisch & Bühlmann (2007) when $n \gg |S|$ and $\alpha \to 0$.
- **GES**: does *not* use CI tests — it uses a **score function** instead; see [[Greedy Equivalence Search]].

## See Also
- [[PC Algorithm]] — the algorithm that uses CI tests to build the skeleton
- [[Markov Equivalence Classes and CPDAGs]] — what the CI test results imply
- [[Directed Acyclic Graphs]] — d-separation and faithfulness
- [[Greedy Equivalence Search]] — the score-based alternative that avoids CI testing
