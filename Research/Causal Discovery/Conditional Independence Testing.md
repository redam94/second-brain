---
title: "Conditional Independence Testing"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Anderson (1984); Fisher (1924); Zhang et al. (2012) KCI"
source_location: "Multiple; see individual test citations below"
date_ingested: 2026-09-24
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[PC Algorithm]]"
  - "[[Causal Structure Learning - Method Comparison]]"
aliases:
  - "CI test"
  - "conditional independence test"
  - "Fisher Z-test"
  - "partial correlation test"
  - "kernel CI test"
  - "KCI"
---

# Conditional Independence Testing

> [!summary]
> The **PC algorithm** and other constraint-based structure-learning methods reduce to a
> sequence of **conditional independence (CI) tests**: given data, decide whether
> $X \perp\!\!\!\perp Y \mid \mathbf{Z}$ for each candidate edge $(X, Y)$ and conditioning
> set $\mathbf{Z}$. The right test depends on data type and distributional assumptions.
> For **Gaussian data**, the **Fisher Z-test** on partial correlations is the standard.
> For **discrete data**, the $G^2$ log-likelihood test or Pearson chi-square applies.
> For **nonlinear/non-parametric** settings, **kernel-based CI tests** (KCI) offer
> distribution-free power at $O(n^3)$ cost.

## Overview

A CI test is a hypothesis test:
$$H_0: X \perp\!\!\!\perp Y \mid \mathbf{Z} \qquad \text{vs.} \qquad H_1: X \not\perp\!\!\!\perp Y \mid \mathbf{Z}.$$
The PC algorithm calls this test for every candidate edge $(X_i, X_j)$ conditional on
increasing-size subsets $\mathbf{Z} \subseteq \operatorname{adj}(X_i)$. Type I error (false
rejection of $H_0$) causes a spurious edge *removal*; Type II error (failing to reject $H_0$)
causes a spurious edge *retention*. PC's structural accuracy is directly bounded by these
error rates across all the tests it performs.

## Main Content

### Fisher Z-Test (Gaussian Data)

The most widely used CI test, based on the **partial correlation coefficient** $r_{XY|Z}$.

> [!definition] Definition: Partial Correlation
> The **partial correlation** $\rho_{XY|\mathbf{Z}}$ is the correlation between the residuals
> of $X$ and $Y$ after regressing both on $\mathbf{Z}$. For Gaussian data:
> $$\rho_{XY|\mathbf{Z}} = 0 \iff X \perp\!\!\!\perp Y \mid \mathbf{Z}.$$
> The sample partial correlation $r_{XY|\mathbf{Z}}$ can be computed recursively:
> $$r_{XY|\mathbf{Z}} = \frac{r_{XY|\mathbf{Z}\setminus\{Z_k\}} - r_{XZ_k|\mathbf{Z}\setminus\{Z_k\}} \cdot r_{YZ_k|\mathbf{Z}\setminus\{Z_k\}}}{\sqrt{(1-r_{XZ_k|\mathbf{Z}\setminus\{Z_k\}}^2)(1-r_{YZ_k|\mathbf{Z}\setminus\{Z_k\}}^2)}}.$$
^def-partial-corr

> [!definition] Definition: Fisher Z-Test (Fisher 1924)
> Given $n$ observations and conditioning set $\mathbf{Z}$ with $|\mathbf{Z}| = q$:
>
> **Test statistic:**
> $$Z_{XY|\mathbf{Z}} = \frac{\sqrt{n - q - 3}}{2} \ln\!\frac{1 + r_{XY|\mathbf{Z}}}{1 - r_{XY|\mathbf{Z}}} = \sqrt{n-q-3} \cdot \mathrm{artanh}(r_{XY|\mathbf{Z}}).$$
>
> **Under $H_0$** (and Gaussian): $Z_{XY|\mathbf{Z}} \approx \mathcal{N}(0,1)$ for $n - q - 3 \geq 10$.
>
> **Decision:** Reject $H_0$ (edge present) if $|Z_{XY|\mathbf{Z}}| > z_{\alpha/2}$; otherwise
> accept $H_0$ (remove edge).
^def-fisher-z

> [!note] Practical Considerations
> - The effective sample size shrinks with $|Z|$: with $n=100$ and $|Z|=8$, only $n-q-3 = 89$
>   effective observations remain, reducing power.
> - Stability near $r = \pm 1$: the Fisher Z-transform maps $[-1,1] \to [-\infty,\infty]$ with
>   bounded derivative except near $\pm 1$.
> - Implementation: `pcalg::gaussCItest` in R; `causal-learn` Python package.

### $G^2$ Test (Discrete Data)

> [!definition] Definition: $G^2$ Conditional Independence Test
> For discrete variables $X$, $Y$, $\mathbf{Z}$, the **$G^2$ statistic** (log-likelihood ratio):
> $$G^2 = 2 \sum_{x, y, \mathbf{z}} n_{xy\mathbf{z}} \ln\frac{n_{xy\mathbf{z}} \cdot n_{\mathbf{z}}}{n_{x\mathbf{z}} \cdot n_{y\mathbf{z}}},$$
> where $n_{xy\mathbf{z}}$ is the count of observations with $X=x$, $Y=y$, $\mathbf{Z}=\mathbf{z}$.
>
> **Under $H_0$:** $G^2 \sim \chi^2_{(r_X-1)(r_Y-1)r_{\mathbf{Z}}}$ where $r_V$ = number of
> categories of $V$.
>
> **Decision:** Reject $H_0$ if $G^2 > \chi^2_{(r_X-1)(r_Y-1)r_{\mathbf{Z}}, 1-\alpha}$.
>
> Pearson's $X^2$ (chi-square) statistic is an asymptotically equivalent alternative.
^def-g2-test

> [!warning] Sparse Cell Counts
> The chi-square approximation requires expected cell counts $\geq 5$. With large $|\mathbf{Z}|$,
> the contingency table becomes sparse, inflating Type I error. Use Fisher's exact test
> or collapse categories when $n$ is small relative to $r_X \cdot r_Y \cdot r_\mathbf{Z}$.

### Kernel Conditional Independence Test (Non-parametric)

For non-Gaussian, nonlinear relationships, kernel-based tests detect CI without parametric
assumptions.

> [!definition] Definition: Kernel CI Test — KCI (Zhang et al. 2012)
> The **Kernel Conditional Independence (KCI)** test uses the **kernel embedding** of
> conditional distributions in a **reproducing kernel Hilbert space (RKHS)**.
>
> For kernels $k_X$, $k_Y$, $k_Z$ on the respective spaces, construct the **centralized
> cross-covariance operator** $\hat{V}_{(YX|Z)}$ from the data. Under $H_0: X \perp\!\!\!\perp Y \mid Z$,
> the test statistic $\hat{T}_{KCI} = n \cdot \mathrm{tr}(\hat{V}_{(YX|Z)}^2)$ is distributed
> as a weighted sum of chi-squared random variables.
>
> **Decision:** Reject $H_0$ if $\hat{T}_{KCI}$ exceeds the $(1-\alpha)$-quantile of the
> null distribution (estimated by bootstrap or Gamma approximation).
^def-kci

> [!note] KCI Tradeoffs
> - **Power**: Detects nonlinear dependencies that Fisher Z misses.
> - **Cost**: $O(n^3)$ kernel matrix operations — infeasible for $n > 5000$.
> - **Choice of kernel**: Gaussian kernel $k(x,x') = \exp(-\|x-x'\|^2/(2h^2))$ is standard;
>   bandwidth $h$ set by median heuristic.
> - **Implementation**: `causal-learn` (Python), `CondIndTests` (R).

### Comparison of CI Tests

| Test | Data type | Assumption | Complexity | Notes |
|------|-----------|-----------|-----------|-------|
| Fisher Z | Continuous (Gaussian) | Multivariate Gaussian | $O(d^2 n)$ partial corr. | Standard for PC with Gaussian data |
| $G^2$ / $X^2$ | Discrete | Multinomial, large $n$ | $O(n r_X r_Y r_\mathbf{Z})$ | Requires adequate cell counts |
| KCI | Continuous (any) | None (distribution-free) | $O(n^3)$ | Best power, expensive |
| HSIC-based | Continuous/mixed | None | $O(n^2)$ to $O(n^3)$ | Intermediate option |
| Regression F-test | Continuous | Linear associations | $O(n d^2)$ | Generalizes Fisher Z to nonlinear via basis functions |

## Examples

> [!example] Example: Fisher Z-Test in Practice
> **Data:** $n = 200$ observations, $d = 5$ variables, Gaussian. Test
> $X_1 \perp\!\!\!\perp X_3 \mid X_2$ at $\alpha = 0.05$.
>
> **Step 1:** Compute partial correlation:
> $r_{X_1 X_3 | X_2} = \frac{r_{X_1 X_3} - r_{X_1 X_2} r_{X_2 X_3}}{\sqrt{(1-r_{X_1 X_2}^2)(1-r_{X_2 X_3}^2)}} = \frac{0.12 - (0.6)(0.5)}{\sqrt{(0.64)(0.75)}} = \frac{-0.18}{0.693} \approx -0.260.$
>
> **Step 2:** Fisher Z-transform:
> $Z_{13|2} = \sqrt{200 - 1 - 3} \cdot \mathrm{artanh}(-0.260) = \sqrt{196} \cdot (-0.266) = 14 \cdot (-0.266) \approx -3.72.$
>
> **Step 3:** Compare to $z_{0.025} = 1.96$: $|{-3.72}| > 1.96$, so **reject $H_0$**: the edge
> $X_1 - X_3$ is retained in the skeleton (CI not supported).
>
> If instead $r_{X_1 X_3|X_2} = 0.01$, then $Z \approx 0.14 < 1.96$: the edge is removed.

## Connections

- **PC algorithm**: entirely driven by these CI tests; every edge decision is one test call
  — see [[PC Algorithm]].
- **Score-based methods (GES, NOTEARS)**: do not use CI tests; instead optimize a score
  function — see [[GES - Greedy Equivalence Search]], [[NOTEARS - Overview]].
- **Multiple testing**: PC performs $O(d^2 2^q)$ tests total; standard significance levels
  $\alpha$ do not account for multiplicity. Bonferroni correction is conservative; adaptive
  thresholds (Kalisch & Bühlmann 2007) or FDR control are alternatives.
- **Kernel methods in Bayesian statistics**: RKHS embeddings relate to Gaussian process
  covariance functions — see [[Hilbert Space Gaussian Processes]].

## See Also
- [[PC Algorithm]] — uses these CI tests in the skeleton-discovery phase
- [[DAG Structure Learning Problem]] — the structure learning problem CI tests serve
- [[Markov Equivalence Classes and CPDAGs]] — what the tests collectively identify
