---
title: "Conditional Independence Tests for Structure Learning"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/SOURCE-Kalisch-Buehlmann2007-PC.md]]"
source_location: "Kalisch & Bühlmann (2007) §2.2; Spirtes et al. (2000) §5.4"
date_ingested: 2026-09-22
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "CI test"
  - "conditional independence testing"
  - "Fisher Z test causal discovery"
  - "partial correlation CI test"
---

# Conditional Independence Tests for Structure Learning

> [!summary]
> The PC algorithm and other constraint-based methods require a **conditional independence
> (CI) oracle** that answers: "Is $X \perp\!\!\!\perp Y \mid S$?" for subsets $S$ of other
> variables. In practice, CI is tested statistically. The three main tests are: **Fisher's
> Z** for Gaussian/linear models (based on partial correlation), **G²/χ²** for discrete
> variables, and the **Kernel CI test (KCI)** for arbitrary distributions. The choice of
> test and significance level $\alpha$ governs the skeleton's false-positive (spurious
> edges) and false-negative (missing edges) rates.

## Overview

CI tests are the fundamental building blocks of constraint-based causal discovery. Every
edge removal in the PC algorithm's skeleton phase rests on a CI test. The accuracy of the
recovered CPDAG therefore depends directly on the power and calibration of the chosen test.

## Main Content

### Fisher's Z Test (Gaussian/Linear)

The most widely used CI test in practice. Requires that the data be jointly Gaussian
(or approximately so), under which conditional independence is equivalent to zero
partial correlation.

> [!definition] Fisher's Z Test
> **Null hypothesis:** $X \perp\!\!\!\perp Y \mid S$ (equivalently $\rho_{XY|S} = 0$)
>
> **Statistic:**
> $$z_{XY|S} = \frac{\sqrt{n - |S| - 3}}{2} \cdot \log\!\left(\frac{1 + \hat\rho_{XY|S}}{1 - \hat\rho_{XY|S}}\right)$$
> where $\hat\rho_{XY|S}$ is the sample partial correlation of $X$ and $Y$ given $S$,
> and $n$ is the sample size.
>
> Under $H_0$, $z_{XY|S} \xrightarrow{d} \mathcal{N}(0,1)$.
>
> **Decision:** Reject $H_0$ (keep edge) if $|z_{XY|S}| > z_{\alpha/2}$; otherwise
> remove edge $X - Y$ and record $\text{Sep}(X,Y) = S$.
^def-fishers-z

**Partial correlation from regression:** The partial correlation $\rho_{XY|S}$ can be
computed via regression of $X$ on $S$ and $Y$ on $S$, taking the correlation of the
residuals. For Gaussian variables this is exactly $\hat\rho_{XY|S}$; for non-Gaussian
it is a linear partial correlation (valid as an approximate test for weak associations).

**Pros:** Fast ($O(|S|^3)$ per test via matrix inversion), well-calibrated, scales to
high dimensions.

**Cons:** Assumes linearity and Gaussianity; fails for discrete or nonlinear relationships.

### G² / χ² Test (Discrete Variables)

For discrete variables with finite state spaces.

> [!definition] G² Likelihood Ratio Test
> **Null hypothesis:** $X \perp\!\!\!\perp Y \mid S$ in a multinomial model
>
> **Statistic:**
> $$G^2 = 2 \sum_{x, y, s} n(x, y, s) \log\!\left(\frac{n(x,y,s) \cdot n(s)}{n(x,s) \cdot n(y,s)}\right)$$
> where $n(\cdot)$ are cell counts in the contingency table.
>
> Under $H_0$, $G^2 \sim \chi^2_{(|X|-1)(|Y|-1)\prod_{z\in S}|z|}$ (degrees of freedom
> equal product of state-space sizes minus 1).
^def-g2-test

**Practical issue:** Cell counts $n(x,y,s)$ become sparse when $|S|$ is large (many
conditioning variables), reducing power. Requires large samples relative to the number
of cells.

### Kernel CI Test (KCI)

For nonlinear, non-Gaussian distributions (Gaussian process-based).

> [!definition] Kernel Conditional Independence Test (Zhang et al., 2012)
> Tests $H_0: X \perp\!\!\!\perp Y \mid S$ in an RKHS framework:
>
> 1. Compute centralized kernel matrices $K_X$, $K_Y$, $K_S$ using a kernel $k$ (e.g., RBF).
> 2. Regress out the effect of $S$ using kernel ridge regression:
>    $\tilde{K}_X = (I - H_S) K_X (I - H_S)$, similarly for $\tilde K_Y$.
> 3. Test statistic: $\text{KCI} = \text{tr}(\tilde K_X \tilde K_Y)$.
> 4. Null distribution via bootstrap or a Gamma approximation.
^def-kci

**Pros:** Nonparametric; valid under any smooth distribution; detects nonlinear dependencies.

**Cons:** $O(n^3)$ per test (kernel matrix operations); computationally infeasible for large $n$.
In practice limited to $n \lesssim 1000$ without approximations.

### Comparing Tests

| Test | Data type | Assumption | Complexity | Notes |
|------|-----------|------------|------------|-------|
| Fisher's Z | Continuous | Gaussian/linear | $O(\|S\|^3)$ | Default choice; fast |
| $G^2 / \chi^2$ | Discrete | Multinomial | $O(\prod\|V\|)$ | Sparse cells at large $\|S\|$ |
| KCI | Any | Smooth distribution | $O(n^3)$ | Nonparametric; slow |
| CMIknn | Any | $k$-NN | $O(n^2)$ | Entropy-based; moderate speed |

### Multiple Testing and Significance Level $\alpha$

In the PC algorithm, the number of CI tests can be large: $O(p^2 q^q)$ for $p$ variables
and maximum degree $q$. With many tests, the false discovery rate matters.

**Effect of $\alpha$:**
- $\alpha$ too small → many edges retained (skeleton too dense; downstream orientation errors)
- $\alpha$ too large → too many edges removed (skeleton too sparse; missing true dependencies)

For high-dimensional settings ($p \gg n$), Kalisch & Bühlmann (2007) recommend decreasing
$\alpha$ with $n$: e.g., $\alpha \sim n^{-1/3}$ achieves consistency.

**FDR control:** For very large $p$, one can apply Benjamini-Hochberg to the $p$-values
from all skeleton tests. However, the tests are not independent (they share variables), so
standard FDR bounds are conservative.

### Software Implementations

- **R `pcalg` package** (Kalisch et al.): `gaussCItest` (Fisher's Z), `disCItest` (G²),
  `kcitest` (KCI). This is the standard reference implementation.
- **Python `causal-learn`** (Zheng et al.): implements PC with Fisher's Z, KCI, and CMIknn.
- **Python `pcalg`** (Miklin): lightweight wrapper.

## Connections

- [[PC Algorithm]] calls the CI test oracle in Phase 1 (skeleton learning) and reads the
  separator sets to orient v-structures in Phase 2.
- [[GES Algorithm]] does not use CI tests — it uses a Bayesian score (BIC/BDeu) instead.
  The two approaches are complementary.
- [[DAG Structure Learning Problem]] surveys all three approaches (constraint-based,
  score-based, hybrid) and their trade-offs.

## See Also
- [[PC Algorithm]] — the algorithm that uses these tests
- [[Markov Equivalence and CPDAGs]] — why CI tests recover the CPDAG
- [[GES Algorithm]] — the score-based alternative (no CI tests)
- [[DAG Structure Learning Problem]] — problem context
