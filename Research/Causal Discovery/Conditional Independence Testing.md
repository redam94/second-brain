---
title: "Conditional Independence Testing for Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SOURCE-kalisch-buhlmann-2007-PC-highdim.txt]]"
source_location: "Kalisch & Bühlmann (2007) §2; Spirtes et al. (2000) §5.4"
date_ingested: 2026-10-17
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "CI test"
  - "Partial correlation test"
  - "Fisher's Z test"
  - "Conditional independence test causal discovery"
---

# Conditional Independence Testing for Causal Discovery

> [!summary]
> Constraint-based causal discovery algorithms like the PC algorithm require a subroutine
> that tests **conditional independence**: $X \perp\!\!\!\perp Y \mid S$ for variable pairs
> $(X, Y)$ conditioned on subsets $S$. For **Gaussian** data the standard test is the
> **Fisher's Z transformation** of the sample partial correlation — exact under normality
> and consistent in high dimensions under Kalisch & Bühlmann (2007)'s sparsity conditions.
> Non-parametric alternatives (kernel-based, $G$-test for discrete variables) extend the
> framework beyond Gaussianity. The number and size of conditioning sets is what makes
> PC computationally tractable: sparse graphs limit the maximum conditioning set size.

## Overview

Every constraint-based structure-learning algorithm translates the **d-separation**
structure of a DAG into testable conditional independence (CI) statements, then
inverts that map from observed CIs to a DAG (or CPDAG). The CI test is therefore
the engine of the whole approach:

- It must be **consistent**: under the null $H_0: X \perp\!\!\!\perp Y \mid S$, the test
  should not reject too often; under the alternative, it should reject with probability $\to 1$.
- In the PC algorithm specifically, the level $\alpha$ controls the overall sparsity
  of the recovered skeleton: a smaller $\alpha$ produces fewer edges (more conservative).

The choice of CI test also determines which distributional assumptions the algorithm requires.

## Main Content

### Gaussian setting: partial correlation and Fisher's Z

For **multivariate Gaussian** data, the conditional independence $X \perp\!\!\!\perp Y \mid S$
is equivalent to the **partial correlation** being zero.

> [!definition] Definition: Partial Correlation $\rho_{XY \cdot S}$
> The **partial correlation** between $X$ and $Y$ given $S = \{Z_1, \ldots, Z_k\}$
> is the correlation between the residuals of $X$ and $Y$ after linearly regressing
> out $S$. Equivalently, it is the off-diagonal element of the inverse covariance matrix
> (precision matrix) $\Sigma_{[XY \cup S]}^{-1}$ restricted to the $(X, Y)$ position,
> divided by the square root of the diagonal elements.
>
> For multivariate Gaussian $\mathbf{X}$:
> $$X \perp\!\!\!\perp Y \mid S \iff \rho_{XY \cdot S} = 0.$$
^def-partial-corr

> [!theorem] Fisher's Z Test (Fisher 1915; applied by Kalisch & Bühlmann 2007)
> Given $n$ i.i.d. observations, let $\hat{\rho}_{XY \cdot S}$ be the sample partial
> correlation. Define the **Fisher Z-transformation**:
> $$Z_{XY \cdot S} = \frac{1}{2} \log \frac{1 + \hat{\rho}_{XY \cdot S}}{1 - \hat{\rho}_{XY \cdot S}}.$$
> Under the null $H_0: \rho_{XY \cdot S} = 0$ and Gaussianity:
> $$\sqrt{n - |S| - 3} \cdot Z_{XY \cdot S} \xrightarrow{d} \mathcal{N}(0, 1).$$
> The test rejects $H_0$ at level $\alpha$ when $|\sqrt{n - |S| - 3} \cdot Z_{XY \cdot S}| > z_{\alpha/2}$.
>
> **Effective sample size**: the factor $n - |S| - 3$ accounts for the $|S|$ conditioning
> variables. As $|S|$ grows, the test loses power — this is why sparse graphs are easier
> to learn: the maximum conditioning set size is bounded by the maximum in-degree of the true DAG.
^thm-fisher-z

### High-dimensional consistency of Fisher's Z (Kalisch & Bühlmann 2007)

Kalisch & Bühlmann (2007) proved the first consistency result for the PC algorithm in
high dimensions ($d \gg n$):

> [!theorem] High-Dimensional Consistency (Kalisch & Bühlmann 2007, Theorem 1)
> Assume:
> (a) The true DAG $\mathsf{G}^*$ is **faithful** to the distribution of $\mathbf{X}$;
> (b) $\mathbf{X}$ is multivariate Gaussian;
> (c) The maximum degree of $\mathsf{G}^*$ is bounded by $q_n = O(\log n / \log \log n)$;
> (d) The significance level $\alpha_n \to 0$ at an appropriate rate.
>
> Then:
> $$P\bigl(\text{PC with Fisher's Z recovers skeleton and CPDAG of } \mathsf{G}^*\bigr) \to 1$$
> as $n \to \infty$, even when $d = d(n) \to \infty$ as fast as $O(n^a)$ for any $a > 0$.
>
> **Why sparsity matters**: when the true graph is sparse (bounded degree $q_n$), the
> conditioning sets in PC never exceed size $q_n$, and the effective sample size $n - |S| - 3$
> remains large relative to the test's critical value. Dense graphs destroy this guarantee.
^thm-highdim-consistency

> [!note] Calibrating $\alpha$ in practice
> The significance level $\alpha$ plays a dual role in PC: it controls the CI test
> decision, but also indirectly controls graph sparsity. In practice:
> - Small $\alpha$ (e.g. 0.001) → sparse graph, fewer edges, potential false negatives
> - Large $\alpha$ (e.g. 0.1) → denser graph, more edges, potential false positives
> The standard recommendation is $\alpha \in [0.01, 0.05]$ as a starting point.
> The `pcalg` R package exposes `alpha` directly in the `pc()` function.

### Non-Gaussian and non-parametric CI tests

When the Gaussian assumption fails, non-parametric CI tests are needed:

> [!definition] Definition: Kernel Conditional Independence Test (KCI, Zhang et al. 2012)
> The **KCI test** tests $X \perp\!\!\!\perp Y \mid S$ nonparametrically using a kernel
> statistic based on the Hilbert–Schmidt independence criterion (HSIC) applied to the
> residuals after kernel regression of $X$ and $Y$ on $S$. It has Type I error $\to \alpha$
> and Type II error $\to 0$ under mild smoothness conditions on the conditional distributions,
> without assuming Gaussianity or linearity.
>
> Implemented in: `causal-learn` Python package (`kci_test()`); also `CondIndTests` R package.
>
> **Trade-off**: KCI is much more computationally expensive than Fisher's Z
> ($O(n^3)$ naive, $O(n^2)$ with approximations) and performs poorly in very high
> dimensions without additional regularisation.
^def-kci

> [!definition] Definition: G-test for Discrete Data
> For **discrete** variables $X$, $Y$, $Z_1, \ldots, Z_k$, the **G-test** (likelihood ratio
> test of independence in the conditional frequency table) tests $X \perp\!\!\!\perp Y \mid S$
> where $S = \{Z_1,\ldots,Z_k\}$. The statistic is:
> $$G = 2 \sum_{x,y,s} n(x,y,s) \log \frac{n(x,y,s) \cdot n(s)}{n(x,s) \cdot n(y,s)},$$
> which is asymptotically $\chi^2_{(r_X-1)(r_Y-1) r_S}$ under $H_0$ (where $r_X, r_Y, r_S$
> are the numbers of levels). This is the CI test used in TETRAD for discrete data.
^def-gtest

### Computational complexity of CI testing in PC

The computational cost of PC is dominated by CI testing:

> [!definition] Definition: Order-independence issue
> The original PC algorithm is **order-dependent**: the sequence in which edges are
> tested affects which edges are removed. Colombo & Maathuis (2014) showed that
> reordering edges in the skeleton phase can produce different CPDAGs with identical
> data, which is a statistical inconsistency. The **PC-stable** algorithm (their fix)
> avoids this by computing adjacency sets before any edge removals are committed.
>
> In the `pcalg` R package, `pc()` uses the stable version by default.
^def-pc-stable

## Connections

- **PC algorithm**: CI tests are the core subroutine — skeleton discovery proceeds by
  calling CI tests on all pairs $(X, Y)$ for increasing conditioning set sizes $l$.
  See [[PC Algorithm]].
- **GES**: does not use CI tests — instead uses a score function (BIC/BDe) to evaluate
  equivalence classes. This makes GES robust to CI test calibration issues. See
  [[GES - Greedy Equivalence Search]].
- **NOTEARS**: uses neither CI tests nor a CPDAG score — it minimizes a regularized
  least-squares loss. See [[DAG Structure Learning Problem]].
- **Faithfulness assumption**: CI tests can only reliably detect non-zero partial
  correlations; near-zero partial correlations (near-violations of faithfulness) cause
  high false-positive rates. See [[Directed Acyclic Graphs]].

## See Also
- [[PC Algorithm]] — the algorithm that orchestrates these CI tests
- [[Markov Equivalence and CPDAGs]] — why testing CIs recovers a CPDAG
- [[DAG Structure Learning Problem]] — the general problem and comparison of methods
- [[Dependence Measures for Copulas]] — related measures for non-linear dependence
