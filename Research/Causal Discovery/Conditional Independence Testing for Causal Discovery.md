---
title: "Conditional Independence Testing for Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/PC-GES-Synthesis-Survey.md]]"
source_location: "Part II, §2.4–2.5"
date_ingested: 2026-07-08
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm - Overview]]"
aliases:
  - "CI test causal discovery"
  - "Fisher z-test partial correlation"
  - "conditional independence test PC algorithm"
---

# Conditional Independence Testing for Causal Discovery

> [!summary]
> Constraint-based causal discovery algorithms (foremost the [[PC Algorithm - Overview|PC algorithm]])
> reduce causal structure learning to a sequence of **conditional independence (CI) tests**.
> For Gaussian data the test is exact: compute a partial correlation and apply the
> Fisher $z$-transform. For discrete or non-Gaussian data, $G^2$ and kernel-based tests
> (KCI, RCIT) are used. Multiple testing over $O(d^2)$ pairs is controlled via BH-FDR
> correction; the significance level $\alpha$ directly governs the sparsity–accuracy trade-off.

## Overview

A **conditional independence test** asks: given a dataset $\mathcal{D}$ of $n$ observations,
can we reject the hypothesis that $X \perp\!\!\!\perp Y \mid \mathbf{S}$ for a specified
conditioning set $\mathbf{S}$? In causal discovery, these tests are the atomic operations
from which the skeleton and v-structures of a causal DAG are assembled.

The choice of CI test must match the data distribution: misspecification leads to incorrect
skeleton recovery and, downstream, incorrect causal claims. This note covers the main test
families and their practical trade-offs.

## Main Content

### Gaussian Data: Partial Correlations and Fisher's Z

For multivariate Gaussian data, conditional independence is equivalent to zero partial
correlation. This allows an exact test.

> [!definition] Definition: Partial Correlation
> Given a data matrix $\mathbf{X} \in \mathbb{R}^{n \times d}$, the **partial correlation**
> $\rho_{XY|\mathbf{S}}$ is the correlation between the residuals of $X$ and $Y$ after
> regressing out $\mathbf{S}$:
> $$\hat{\rho}_{XY|\mathbf{S}} = \operatorname{corr}\!\left(\hat{\varepsilon}_{X|\mathbf{S}},\; \hat{\varepsilon}_{Y|\mathbf{S}}\right)$$
> where $\hat{\varepsilon}_{X|\mathbf{S}}$ is the residual of the OLS regression of $X$ on $\mathbf{S}$.
>
> For Gaussian data: $X \perp\!\!\!\perp Y \mid \mathbf{S} \iff \rho_{XY|\mathbf{S}} = 0$.
^def-partial-corr

> [!theorem] Theorem: Fisher Z-Transform CI Test (Fisher, 1924)
> Under the null $H_0: \rho_{XY|\mathbf{S}} = 0$ (i.e., $X \perp\!\!\!\perp Y \mid \mathbf{S}$
> in a Gaussian distribution), the Fisher $z$-statistic
> $$z = \sqrt{n - |\mathbf{S}| - 3} \cdot \operatorname{arctanh}(\hat{\rho}_{XY|\mathbf{S}})$$
> converges to $\mathcal{N}(0,1)$ as $n \to \infty$.
>
> **Reject** $H_0$ at level $\alpha$ iff $|z| > z_{1-\alpha/2}$.
^thm-fisher-z

**Effective sample size.** The term $n - |\mathbf{S}| - 3$ reveals a critical limitation:
as the conditioning set grows, the effective sample size shrinks. For $|\mathbf{S}| = n - 4$,
the test has zero degrees of freedom. In practice, CI tests with large conditioning sets
are unreliable unless $n$ is very large relative to $|\mathbf{S}|$.

> [!note] Implication for PC algorithm
> This is why the PC algorithm tests $|\mathbf{S}| = 0$ first, then $|\mathbf{S}| = 1$, etc.
> By removing edges early (at small $k$), later tests need smaller conditioning sets from a
> sparser graph, preserving test power. In sparse graphs with maximum degree $\delta$,
> no test requires $|\mathbf{S}| > \delta - 1$.

**In `pcalg`:**
```r
suffStat <- list(C = cor(X), n = nrow(X))
gaussCItest(x = 1, y = 2, S = c(3, 4), suffStat = suffStat)
```

### Discrete Data: G² and χ² Tests

For categorical variables, conditional independence is tested using contingency tables
conditional on the levels of $\mathbf{S}$.

> [!definition] Definition: G² (Likelihood Ratio) CI Test
> For discrete variables $X, Y$ (with categories $\mathcal{X}, \mathcal{Y}$) and conditioning
> set $\mathbf{S}$ with joint levels $\mathcal{S}$:
> $$G^2 = 2 \sum_{s \in \mathcal{S}} \sum_{x \in \mathcal{X}} \sum_{y \in \mathcal{Y}} n_{xys} \log\!\frac{n_{xys} n_s}{n_{xs} n_{ys}}$$
> where $n_{xys}$ is the count of $(X=x, Y=y, \mathbf{S}=s)$ in the data.
>
> Under $H_0$, $G^2 \sim \chi^2_{(|\mathcal{X}|-1)(|\mathcal{Y}|-1)|\mathcal{S}|}$ (asymptotically).
^def-g2-test

**Limitation of discrete tests.** The degrees of freedom scale as
$|\mathcal{X}| \cdot |\mathcal{Y}| \cdot |\mathcal{S}|^{|\mathbf{S}|}$. Even binary variables
require $2^{|\mathbf{S}|}$ cells, so very large $n$ is needed for tests with $|\mathbf{S}| \geq 3$.
Sparse cells cause inflated type I error even when asymptotic theory says the test is valid.

### Non-Parametric Tests: KCI and RCIT

When data are non-Gaussian (or the researcher does not want to assume any parametric form),
kernel-based tests are used.

> [!definition] Definition: Kernel Conditional Independence (KCI) Test (Zhang et al., 2012)
> The **KCI test** embeds random variables into a reproducing kernel Hilbert space (RKHS)
> and tests the **Hilbert-Schmidt norm** of the conditional cross-covariance operator
> $C_{XY|\mathbf{S}}$. Under $H_0: X \perp\!\!\!\perp Y \mid \mathbf{S}$:
> $$\|C_{XY|\mathbf{S}}\|_{\mathrm{HS}}^2 \approx 0$$
>
> The test statistic is approximated by an incomplete Cholesky decomposition and a
> Gamma-distribution null approximation. KCI is **consistent** for arbitrary continuous
> distributions and sample sizes $n \to \infty$.
>
> **Limitation:** $O(n^2)$ time and memory — infeasible for large $n$.
^def-kci

**Faster alternatives:**
- **RCIT (Randomized CI Test):** Approximates the RKHS embedding using random Fourier
  features. $O(n)$ after a random projection step.
- **CMIknn:** Nearest-neighbor-based mutual information estimator for multivariate
  conditioning sets.
- **HSIC-based tests:** Test the Hilbert-Schmidt independence criterion; most natural
  for unconditional tests but can be conditioned by reweighting.

### The Multiple Testing Problem in Skeleton Recovery

In the PC algorithm's skeleton phase, the number of CI tests is:
$$\text{# tests} \leq \binom{d}{2} \sum_{k=0}^{\delta} \binom{\delta}{k}$$
where $\delta$ is the maximum adjacency. For sparse graphs this is $O(d^\delta)$, but
in the worst case (dense initial graph) it is $O(d^2 \cdot 2^d)$.

Running many tests at a fixed $\alpha$ inflates the **familywise error rate (FWER)**
and the **false discovery rate (FDR)**. Standard corrections:

| Method | Controls | Conservative? | Preferred when |
|--------|----------|--------------|----------------|
| Bonferroni | FWER | Very | Few tests, small $d$ |
| Holm | FWER | Less than Bonferroni | Moderate $d$ |
| BH (Benjamini-Hochberg) | FDR | Least | Large $d$, correlated tests |

In causal discovery, **BH-FDR** at level $q = 0.05$ or $q = 0.1$ is most common.
The `pcalg` package accepts an `alpha` parameter which is applied per-test; practitioners
should choose $\alpha$ to account for the multiple testing burden.

> [!note] The sparsity–accuracy trade-off
> **Small $\alpha$** (e.g., $\alpha = 0.001$): fewer null hypotheses rejected → fewer edges
> removed → denser estimated skeleton → risk of spurious edges.
>
> **Large $\alpha$** (e.g., $\alpha = 0.1$): more edges removed → sparser skeleton → risk
> of missing true edges → broken causal paths.
>
> There is no universally optimal $\alpha$; it should be treated as a tuning parameter and
> evaluated via simulation or domain knowledge.

### Order-Dependence of PC

A known limitation of the original PC algorithm is **order-dependence**: the set of CI
tests performed, and therefore the output skeleton, can depend on the order in which
variables are presented. The **PC-stable** variant (Colombo & Maathuis, 2014) addresses
this by separating the skeleton adjacency update from the test execution within each
level $k$.

## Connections

- **Used by the PC algorithm.** [[PC Algorithm - Overview]] drives the skeleton recovery
  phase entirely by these tests. The choice of CI test family is the key modelling decision
  in any application of PC.
- **Not needed by GES.** [[GES - Greedy Equivalence Search]] uses score maximization
  (BIC or BDe) and performs no CI tests. This is an advantage when the distribution is
  non-Gaussian but the score can still be computed.
- **Not needed by NOTEARS.** [[NOTEARS Algorithm]] solves a continuous optimization problem
  on the raw data matrix and never tests independence. This makes NOTEARS applicable to very
  high-dimensional settings where CI tests with large conditioning sets are unreliable.
- **Bayesian CI testing.** The partial correlation test is a frequentist procedure; Bayesian
  model comparison approaches (e.g., BF for the hypothesis $\rho = 0$ vs. $\rho \neq 0$)
  exist but are less common in automated structure learning.

## See Also
- [[PC Algorithm - Overview]] — uses these CI tests in its skeleton and v-structure phases
- [[GES - Greedy Equivalence Search]] — the score-based alternative that avoids CI tests
- [[Markov Equivalence and CPDAGs]] — the object being recovered by the CI-test-based approach
- [[DAG Structure Learning Problem]] — full landscape of prior approaches
- [[Spurious Association and Confounds]] — the causal DAG semantics underlying d-separation tests
