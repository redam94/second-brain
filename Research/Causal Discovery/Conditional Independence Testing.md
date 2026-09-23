---
title: "Conditional Independence Testing"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/spirtes2000-CPS-and-PC-algorithm.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) §3; Kalisch & Bühlmann (2007)"
date_ingested: 2026-09-23
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "CI test"
  - "partial correlation test"
  - "Fisher Z test conditional independence"
  - "kernel conditional independence test"
---

# Conditional Independence Testing

> [!summary]
> Constraint-based causal discovery (especially the [[PC Algorithm]]) requires a reliable
> test for **conditional independence** $X \perp Y \mid S$. The choice of test is the main
> tuning decision and the main source of finite-sample errors. Three families cover the
> most common settings: **partial correlation / Fisher's Z** (continuous Gaussian data),
> **conditional chi-squared / G-test** (discrete data), and **kernel-based tests** (KCIT,
> HSIC) for non-parametric continuous settings. All tests share the same interface to the
> PC algorithm: accept or reject $H_0: X \perp Y \mid S$ at level $\alpha$, storing
> $\text{sep}(X,Y) = S$ on acceptance.

## Overview

The skeleton-learning phase of the PC algorithm makes one decision per tested pair
$(X_i, X_j, S)$: are $X_i$ and $X_j$ conditionally independent given $S$? Every wrong
decision propagates: a false removal deletes a true edge from the skeleton (and may
mis-orient nearby v-structures); a false retention keeps a spurious edge. The choice of
test family, sample-size calibration of $\alpha$, and the order in which conditioning sets
are tried all affect the final CPDAG.

## Main Content

### Gaussian partial correlation: Fisher's Z test

The workhorse for continuous, approximately Gaussian data.

> [!definition] Definition: Partial Correlation
> Let $\mathbf{X}$ be a $d$-variate Gaussian vector. The **partial correlation** of
> $X_i$ and $X_j$ given $S = \{X_{k_1}, \ldots, X_{k_s}\}$ is
> $$\rho_{ij \cdot S} = -\frac{[\Sigma^{-1}_{ij \cdot S}]_{ij}}
>       {\sqrt{[\Sigma^{-1}_{ij \cdot S}]_{ii}\, [\Sigma^{-1}_{ij \cdot S}]_{jj}}},$$
> where $\Sigma_{ij \cdot S}$ is the covariance sub-matrix of $(X_i, X_j)$ conditioning
> on (i.e.\ marginalizing out the effect of) $S$.
>
> **Key fact**: $X_i \perp X_j \mid S \iff \rho_{ij \cdot S} = 0$ in any multivariate Gaussian.
^def-partial-corr

> [!definition] Algorithm: Fisher's Z Test (Spirtes et al. 2000; Kalisch & Bühlmann, 2007)
> Let $\hat{\rho}_{ij \cdot S}$ be the sample partial correlation (from the inverse of the
> sample covariance sub-matrix, or equivalently from OLS residuals).
>
> Define the **Fisher Z transform**:
> $$Z_{ij \cdot S} = \frac{1}{2} \ln\!\frac{1 + \hat{\rho}_{ij \cdot S}}{1 - \hat{\rho}_{ij \cdot S}} = \mathrm{arctanh}(\hat{\rho}_{ij \cdot S}).$$
>
> Under $H_0: \rho_{ij \cdot S} = 0$ and normality, $Z_{ij \cdot S} \overset{d}{\to} \mathcal{N}(0, 1/(n - |S| - 3))$ for large $n$.
>
> **Test statistic**: $T = \sqrt{n - |S| - 3}\,|Z_{ij \cdot S}|$.
>
> **Decision**: reject $H_0$ (retain edge) iff $T > z_{\alpha/2}$ (two-sided $z$-test at level $\alpha$).
> Accept $H_0$ (remove edge, store $\text{sep}(i,j) = S$) iff $T \le z_{\alpha/2}$.
^def-fishers-z

> [!note] Practical notes on Fisher's Z
> - **Effective samples**: $n - |S| - 3$ decreases with conditioning-set size. For large $|S|$
>   the test has very little power — avoid large conditioning sets (another reason PC should
>   run on sparse skeletons).
> - **Non-Gaussianity**: the test is based on partial correlation, a linear measure. It correctly
>   detects **linear** conditional independence but can fail for non-linear dependencies. In that
>   case use kernel tests.
> - **Implementation**: `gaussCItest` in `pcalg` R package; `fisherz` in `causal-learn` Python.

### Discrete data: conditional G-test / chi-squared test

> [!definition] Algorithm: Conditional G-test
> For discrete variables $X_i, X_j$ with joint conditioning set $S$:
>
> For each configuration $s$ of $S$, compute the conditional $2 \times k$ contingency table
> of $(X_i, X_j) \mid S = s$. The **conditional G-statistic** is:
> $$G^2 = 2 \sum_s n_s \sum_{a, b} \hat{p}(a, b \mid s) \ln \frac{\hat{p}(a, b \mid s)}{\hat{p}(a \mid s)\hat{p}(b \mid s)},$$
> where $n_s$ is the count of observations with $S = s$.
>
> Under $H_0: X_i \perp X_j \mid S$, $G^2 \overset{d}{\to} \chi^2_{(r_i - 1)(r_j - 1) \cdot |\mathcal{S}|}$
> where $r_i, r_j$ are the numbers of categories of $X_i, X_j$ and $|\mathcal{S}| = \prod_{k \in S} r_k$.
>
> Sparsity caveat: with many levels, cell counts can be 0 — requiring smoothing or
> collapsing of categories.
^def-g-test

### Non-parametric: Kernel Conditional Independence Test (KCIT)

> [!definition] Kernel Conditional Independence Test (Zhang et al., 2012)
> The **KCIT** tests $X \perp Y \mid Z$ non-parametrically by:
> 1. Mapping $(X, Y, Z)$ to reproducing kernel Hilbert spaces via kernels $k_X, k_Y, k_Z$.
> 2. Computing a kernel-based statistic that measures the residual dependence of $X$ and $Y$
>    after regressing out $Z$ in RKHS.
> 3. Comparing to the asymptotic null distribution (approximated by a weighted chi-squared).
>
> **When to use**: non-linear, non-Gaussian continuous data. More computationally expensive
> than Fisher's Z ($O(n^3)$ naive, $O(n^2)$ with approximations).
>
> **Implementation**: `KCI` in `causal-learn` Python; `RCIT` (randomized version, $O(n)$)
> for large $n$.
^def-kcit

### The role of $\alpha$ and multiple testing

PC makes $O(d^2 q^q)$ CI tests, where $d$ is the number of variables and $q$ is the
max degree. **Multiple testing inflation** is a real concern:

- With $d = 20$ and $\alpha = 0.05$, approximately $0.05 \times \binom{20}{2} \approx 10$
  false edge removals are expected even under the global null.
- Bonferroni or BH correction can be applied, but conservative corrections over-retain edges.
- The standard practice is to choose $\alpha$ based on $n$ and domain knowledge, and to
  validate the resulting skeleton against known relationships.

> [!note] BIC-equivalent $\alpha$ (high-dimensional)
> For Gaussian data, Kalisch & Bühlmann (2007) show that using $\alpha = \Phi(-\sqrt{\log n})$
> in Fisher's Z — where $\Phi$ is the standard normal CDF — is asymptotically equivalent to
> BIC model selection. This gives a principled data-adaptive threshold for the PC algorithm
> in high-dimensional settings.

### Separation sets and v-structure orientation

The CI test not only decides edge membership but also produces the **separation set**
$\text{sep}(X_i, X_j)$ — the conditioning set $S$ that made $X_i$ and $X_j$ independent.
This set is used in Phase 2 of PC to orient v-structures:

$$X_i \to X_k \leftarrow X_j \quad \text{iff} \quad X_k \notin \text{sep}(X_i, X_j).$$

The quality of the separation sets depends on whether the **first** $S$ that passes the
test is the *correct* d-separating set. In high-dimensional sparse graphs this is usually
the case; in dense graphs with near-zero partial correlations it can fail.

## Connections

- **Used in**: [[PC Algorithm]] (Phase 1 skeleton learning and Phase 2 v-structure orientation)
- **Faithfulness link**: a CI test works reliably as a proxy for d-separation only under
  the faithfulness assumption — see [[Markov Equivalence and CPDAGs#^def-faithfulness]].
- **Contrast with score functions**: [[Greedy Equivalence Search]] avoids CI testing entirely,
  using BIC or BDeu scores instead. This bypasses multiple testing but requires parametric
  score assumptions.
- **Connection to regression**: the partial correlation $\rho_{ij \cdot S} = 0$ iff both the
  OLS regression of $X_i$ on $(X_j, S)$ and of $X_j$ on $(X_i, S)$ have zero coefficient on
  the other variable. So `lm()` residuals can implement the test.

## See Also
- [[PC Algorithm]] — the algorithm that calls these tests
- [[Markov Equivalence and CPDAGs]] — why separation sets determine v-structures
- [[Greedy Equivalence Search]] — score-based approach that avoids CI testing
- [[DAG Structure Learning Problem]] — general structure learning setup
