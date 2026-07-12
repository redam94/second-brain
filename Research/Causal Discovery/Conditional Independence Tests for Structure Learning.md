---
title: "Conditional Independence Tests for Structure Learning"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - method/fisher-z
  - doc/paper
source: "[[raw/spirtes-glymour-scheines-2000-PC-algorithm.md]]"
source_location: "Spirtes, Glymour & Scheines (2000) CPS, Ch. 5; Zhang et al. (2011) KCIT; Kalisch & Bühlmann (2007)"
date_ingested: 2026-07-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Constraint-Based Causal Discovery]]"
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "Fisher-Z test causal discovery"
  - "conditional independence test"
  - "CI test structure learning"
  - "kernel conditional independence test"
  - "KCIT"
---

# Conditional Independence Tests for Structure Learning

> [!summary]
> Constraint-based causal discovery (especially the [[PC Algorithm]]) requires testing
> $H_0: X \perp Y \mid \mathbf{Z}$ for many pairs $(X,Y)$ and conditioning sets $\mathbf{Z}$.
> The choice of test determines the statistical assumptions of the discovery procedure: the
> **Fisher-Z test** (partial correlation) for linear Gaussian data; the **$G^2$ / chi-squared test**
> for discrete data; and **kernel-based tests** (KCIT, HSIC) for general non-linear non-Gaussian data.
> Each test involves a tradeoff between distributional assumptions, statistical power, and
> computational cost.

## Overview

The PC algorithm outsources the statistical question — "are $X$ and $Y$ conditionally independent
given $\mathbf{Z}$?" — to an external **CI test**. The algorithm's structure is unchanged
regardless of which test is used; only the assumptions change. This modularity is a major
practical advantage: the same PC skeleton procedure applies to continuous Gaussian data,
count data, binary observations, and non-linear relationships.

**Multiple testing warning:** In $d$-variable discovery, the PC algorithm performs $O(d^{k+2})$
CI tests. Without correction, the probability of at least one false rejection grows with the
number of tests, leading to spurious edges and incorrect v-structures. Standard practice is
to use a **conservative** significance level $\alpha$ (e.g. $\alpha = 0.01$) or to apply
Bonferroni correction across tests.

## Main Content

### Fisher-Z Test (Gaussian / Linear Case)

> [!definition] Definition: Fisher-Z Conditional Independence Test
> **Assumption:** $(X, Y, \mathbf{Z})$ follow a multivariate Gaussian distribution (or linear SEM
> with Gaussian noise), so $X \perp Y \mid \mathbf{Z}$ iff the **partial correlation**
> $\rho_{XY|\mathbf{Z}} = 0$.
>
> **Statistic:** Compute the partial correlation $r_{XY|\mathbf{Z}}$ from the sample covariance
> matrix $\hat{\Sigma}$ via the recursive formula or directly:
> $$r_{XY|\mathbf{Z}} = \frac{\hat{\sigma}_{XY|\mathbf{Z}}}{\sqrt{\hat{\sigma}_{XX|\mathbf{Z}} \hat{\sigma}_{YY|\mathbf{Z}}}}.$$
>
> Apply Fisher's Z-transformation:
> $$Z = \frac{1}{2}\ln\!\left(\frac{1 + r_{XY|\mathbf{Z}}}{1 - r_{XY|\mathbf{Z}}}\right).$$
>
> Under $H_0: \rho_{XY|\mathbf{Z}} = 0$, for $n$ observations and $|\mathbf{Z}| = q$ conditioning
> variables, the test statistic $\sqrt{n - q - 3} \cdot Z$ is approximately $N(0,1)$.
>
> **Reject** $H_0$ (keep the edge) if $|\sqrt{n-q-3} \cdot Z| > z_{1-\alpha/2}$.
^def-fisher-z

> [!note] Partial Correlation via Schur Complement
> For computational efficiency, compute partial correlations from the inverse covariance matrix
> (precision matrix) $\Omega = \hat{\Sigma}^{-1}$:
> $$\rho_{XY|\text{All others}} = -\frac{\omega_{XY}}{\sqrt{\omega_{XX}\omega_{YY}}},$$
> which gives all pairwise partial correlations conditioned on all remaining variables simultaneously.
> For smaller conditioning sets, use the Schur complement.

**Pros:** Very fast — $O(n + q^2)$ per test (fitting a linear regression); well-calibrated under
the Gaussian assumption; easily available in `pcalg::gaussCItest`.

**Cons:** Sensitive to non-Gaussianity and non-linear relationships. In non-Gaussian linear SEMs,
false positives and false negatives can arise from distributional violations. When non-Gaussianity
is present, consider LiNGAM (Shimizu et al. 2006) which uses it to identify the full DAG.

### $G^2$ / Chi-Squared Test (Discrete Data)

> [!definition] Definition: $G^2$ Conditional Independence Test
> **Assumption:** Variables $X, Y, \mathbf{Z}$ are discrete (categorical).
>
> **Null hypothesis:** $X \perp Y \mid \mathbf{Z}$, i.e., $P(X,Y|\mathbf{Z}=\mathbf{z}) = P(X|\mathbf{Z}=\mathbf{z}) P(Y|\mathbf{Z}=\mathbf{z})$ for all $\mathbf{z}$.
>
> **Statistic:** The log-likelihood ratio (G-test) statistic:
> $$G^2 = 2\sum_{\mathbf{z}} \sum_{x,y} n_{xy|\mathbf{z}} \ln\!\left(\frac{n_{xy|\mathbf{z}} \cdot n_{\cdot\cdot|\mathbf{z}}}{n_{x\cdot|\mathbf{z}} \cdot n_{\cdot y|\mathbf{z}}}\right),$$
> where $n_{xy|\mathbf{z}}$ is the cell count for $(X=x, Y=y, \mathbf{Z}=\mathbf{z})$.
>
> Under $H_0$, $G^2$ is asymptotically $\chi^2$ with $(|X|-1)(|Y|-1)\prod_k |\mathbf{Z}_k|$ degrees of freedom.
>
> **Reject** $H_0$ (keep the edge) if $G^2 > \chi^2_{1-\alpha, \text{df}}$.
^def-g2-test

**Pros:** Distribution-free for discrete data; exact under the multinomial model.

**Cons:** Requires large cell counts; for high-cardinality conditioning sets ($|\mathbf{Z}|$ large),
many cells may have zero counts (sparse tables), making the $\chi^2$ approximation poor.
**Practical rule:** Use $G^2$ only when $n / (|X| \cdot |Y| \cdot \prod_k |\mathbf{Z}_k|) \gg 5$.

### Kernel-Based Tests (Non-Linear / Non-Gaussian Data)

> [!definition] Definition: Kernel Conditional Independence Test (KCIT)
> **Assumption:** Variables can be continuous or discrete, with arbitrary joint distribution.
> No parametric form assumed.
>
> **Idea (Zhang et al. 2011):** Reformulate $X \perp Y \mid \mathbf{Z}$ as a measure of
> conditional dependence in a reproducing kernel Hilbert space (RKHS). The **Hilbert-Schmidt
> Independence Criterion** (HSIC) generalises to conditional settings via a **normalised
> cross-covariance operator**. Under $H_0: X \perp Y \mid \mathbf{Z}$, a test statistic based
> on the partial cross-covariance $\text{HSIC}(X,Y|\mathbf{Z})$ is zero.
>
> **Key procedure:**
> 1. Compute residuals $\tilde{X} = X - \hat{E}[X|\mathbf{Z}]$ and $\tilde{Y} = Y - \hat{E}[Y|\mathbf{Z}]$
>    using kernel ridge regression in RKHS.
> 2. Test $\tilde{X} \perp \tilde{Y}$ using a standard (unconditional) HSIC test.
> 3. Calibrate p-value by a gamma approximation or permutation test.
^def-kcit

**Pros:** Fully non-parametric; detects non-linear and non-Gaussian dependencies. Can be combined
with PC to give a **non-parametric PC** that makes only Markov + faithfulness assumptions
(no distributional form).

**Cons:** Computationally expensive — $O(n^3)$ per test (kernel matrix inversion) or $O(n^2)$
with approximation (Nystrom, random features). Not practical for $n > 5000$ without approximations.

### Choosing a CI Test

| Data type | Recommended test | Key assumption | Cost per test |
|-----------|-----------------|---------------|--------------|
| Continuous, linear, Gaussian SEM | Fisher-Z (partial correlation) | Multivariate Gaussian | $O(n + q^2)$ |
| Continuous, non-linear / non-Gaussian | KCIT / HSIC-based | Markov + faithfulness only | $O(n^3)$ |
| Discrete / categorical | $G^2$ or $\chi^2$ | Multinomial, large $n$ per cell | $O(n \cdot |\text{cells}|)$ |
| Mixed (continuous + discrete) | Mixed CIT (Tsagris et al. 2018) | Conditional Gaussian | $O(n)$ |
| Count data (Poisson) | Deviance test from GLM | Poisson / NB | $O(n)$ |

### Calibration and Multiple Testing

When running $O(d^{k+2})$ CI tests:

> [!note] Multiple Testing in Skeleton Discovery
> PC performs many CI tests at the same nominal level $\alpha$. If $m$ tests are conducted and
> each has false-positive rate $\alpha$, the family-wise error rate (FWER) can be $\approx 1 - (1-\alpha)^m$.
> **Conservative settings:** Use $\alpha = 0.01$ or even $\alpha = 0.001$ for large $d$.
> **Bonferroni:** Set $\alpha_{\text{per test}} = \alpha_{\text{family}} / m$, but $m$ is not known
> in advance; approximate with $m \approx d(d-1)/2$.
> **Conservative PC (Ramsey et al. 2012):** Orients a v-structure only if *all* separating sets for
> the pair agree it is a collider, reducing false v-structure discoveries.

## Examples

> [!example] Fisher-Z in Practice (Gaussian linear SEM)
> **Setup:** $d = 5$ variables, $n = 500$ observations, Gaussian errors. Test $X_1 \perp X_3 \mid X_2$.
>
> **Steps:**
> 1. Compute partial correlation $r_{13|2}$ from $\hat{\Sigma}$. Suppose $r_{13|2} = 0.03$.
> 2. Z-transform: $Z = \frac{1}{2}\ln\frac{1.03}{0.97} = 0.030$.
> 3. Test statistic: $\sqrt{500 - 1 - 3} \cdot 0.030 = \sqrt{496} \cdot 0.030 \approx 0.668$.
> 4. Two-sided p-value under $N(0,1)$: $p \approx 0.50$.
> 5. Since $p > 0.05$: **fail to reject** $H_0$ → remove edge $X_1$–$X_3$, record
>    $\text{SepSet}(X_1, X_3) = \{X_2\}$.
^ex-fisher-z

## Connections

- **Used in PC Algorithm Phase 1**: the skeleton loop calls the CI test for each pair at each
  conditioning set size — see [[PC Algorithm#^def-pc-phase1]].
- **Determines the causal assumptions**: Fisher-Z assumes linear Gaussian; KCIT is
  distribution-free. The choice affects what the CPDAG means in practice.
- **Connects to LiNGAM**: if data is linear non-Gaussian, Fisher-Z is still valid for CI testing,
  but ICA-based LiNGAM (Shimizu et al. 2006) gives a unique DAG, not just the CPDAG.
- **Connects to Bayesian structure learning**: Bayesian CI testing (Margaritis 2005, BDe-based tests)
  provides a fully Bayesian alternative to frequentist CI tests in the PC skeleton phase.

## See Also
- [[PC Algorithm]] — uses these tests in Phase 1 (skeleton discovery)
- [[Constraint-Based Causal Discovery]] — where CI tests fit in the general framework
- [[Markov Equivalence and CPDAGs]] — what the tests are ultimately recovering
- [[DAG Structure Learning Problem]] — the formal problem context
- [[NOTEARS - Overview]] — continuous optimization approach that bypasses CI testing
