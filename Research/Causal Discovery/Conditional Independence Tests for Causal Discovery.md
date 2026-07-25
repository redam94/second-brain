---
title: "Conditional Independence Tests for Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "[[raw/survey-PC-algorithm-constraint-based-causal-discovery.md]]"
source_location: "Spirtes et al. (2000) Ch. 5; Spirtes (2010) §2–3"
date_ingested: 2026-07-25
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "CI tests"
  - "conditional independence testing"
  - "Fisher Z test causal discovery"
  - "partial correlation test"
---

# Conditional Independence Tests for Causal Discovery

> [!summary]
> Constraint-based causal discovery algorithms — most importantly the [[PC Algorithm]] —
> operate by testing **conditional independence** (CI) statements of the form
> $X \perp Y \mid \mathbf{Z}$ and building a skeleton from the results. The choice of
> CI test determines which distributional assumptions are made and how sensitive the
> algorithm is to sample size. For Gaussian data the **Fisher $Z$ test** (partial
> correlation) is standard; discrete data uses the $G^2$ test; non-parametric settings
> use kernel-based tests (KCIT). The significance level $\alpha$ is the single most
> important tuning parameter: smaller $\alpha$ yields sparser, more conservative skeletons.

## Overview

The [[PC Algorithm]] and its relatives reduce the causal structure learning problem to
a sequence of conditional independence tests. The correctness guarantee of these algorithms
(consistency as $n \to \infty$) requires the underlying CI test to be **consistent** —
meaning it correctly accepts and rejects $H_0: X \perp Y \mid \mathbf{Z}$ as $n \to \infty$.
In finite samples, every CI test makes both type-I errors (spurious edges retained) and
type-II errors (true edges removed).

## Main Content

### The generic CI testing problem

> [!definition] Definition: Conditional Independence Test
> Given $n$ i.i.d. observations of $(X, Y, \mathbf{Z})$, a conditional independence test
> evaluates:
> $$H_0: X \perp Y \mid \mathbf{Z} \quad \text{vs} \quad H_1: X \not\perp Y \mid \mathbf{Z}$$
> at significance level $\alpha$. The PC algorithm **removes** edge $(X, Y)$ if $H_0$ is
> **not rejected** (i.e., accepted independence). Therefore:
> - **Type-I error** (false positive independence): removes a true edge → sparse, under-connected graph
> - **Type-II error** (false positive dependence): retains a spurious edge → dense, over-connected graph
^def-ci-test

### 1. Fisher $Z$ test (Gaussian data)

The most widely used CI test for continuous data under the Gaussian assumption.

> [!theorem] Fisher $Z$ Test for Partial Correlation
> Let $\hat{\rho}_{XY|\mathbf{Z}}$ be the **partial correlation** between $X$ and $Y$
> given $\mathbf{Z}$, estimated from $n$ observations. Under $H_0: X \perp Y \mid \mathbf{Z}$
> (which for Gaussian data is equivalent to $\rho_{XY|\mathbf{Z}} = 0$):
>
> $$Z = \frac{1}{2} \ln\!\left(\frac{1 + \hat{\rho}_{XY|\mathbf{Z}}}{1 - \hat{\rho}_{XY|\mathbf{Z}}}\right)$$
>
> $$T = \sqrt{n - |\mathbf{Z}| - 3} \cdot Z \xrightarrow{d} \mathcal{N}(0, 1) \quad \text{under } H_0$$
>
> Reject $H_0$ at level $\alpha$ if $|T| > z_{\alpha/2}$. The partial correlation is
> computed from the **precision matrix** $\hat{\Omega} = \hat{\Sigma}^{-1}$:
> $$\hat{\rho}_{XY|\mathbf{Z}} = -\frac{\hat{\omega}_{XY}}{\sqrt{\hat{\omega}_{XX} \hat{\omega}_{YY}}}$$
^thm-fisher-z

**Conditions:** Valid asymptotically under Gaussianity. Sensitive to non-normality,
especially in the tails. The statistic $T$ degrades when $|\mathbf{Z}|$ is large relative
to $n$ (near-singular conditioning).

**Computational cost:** $O(d^2)$ to invert $\hat{\Sigma}$ once; subsequent partial correlations
in $O(1)$ given the precision matrix (or $O(|\mathbf{Z}|^3)$ for each new conditioning set
subset). This makes Fisher $Z$ very fast for large $d$ and $n$.

### 2. $G^2$ test (discrete data)

For discrete random variables, the natural CI test is based on the **log-likelihood ratio**
(G-test), which is equivalent to the mutual information test:

> [!theorem] $G^2$ Conditional Independence Test
> For discrete $X \in \mathcal{X}$, $Y \in \mathcal{Y}$, $\mathbf{Z}$:
> $$G^2(X, Y \mid \mathbf{Z}) = 2n \sum_{x,y,\mathbf{z}} \hat{P}(x, y, \mathbf{z}) \ln\frac{\hat{P}(x,y|\mathbf{z})}{\hat{P}(x|\mathbf{z})\hat{P}(y|\mathbf{z})}$$
>
> Under $H_0: X \perp Y \mid \mathbf{Z}$, this statistic is asymptotically $\chi^2$ with
> $(|\mathcal{X}|-1)(|\mathcal{Y}|-1)\prod_{z}|\mathcal{Z}_z|$ degrees of freedom.
^thm-g2

**Issue:** Requires large cells (expected count $\geq 5$ per cell). With large $|\mathbf{Z}|$,
the table is sparse and the approximation fails. This is why PC on discrete data is limited
to relatively small conditioning sets in practice.

### 3. Kernel-based tests (non-parametric)

When the Gaussian assumption is untenable (non-linear relationships, heavy tails,
multi-modality), **kernel conditional independence tests** provide a distribution-free
alternative.

> [!definition] Kernel Conditional Independence Test (KCIT)
> **Kernel CI Test (KCIT, Zhang et al. 2012):** Maps $(X, Y, \mathbf{Z})$ into a reproducing
> kernel Hilbert space. Under $H_0: X \perp Y \mid \mathbf{Z}$, a test statistic based on
> the **conditional cross-covariance operator** in the RKHS follows an asymptotic
> distribution under the null.
>
> The statistic is computed as the **partial distance correlation** or via a randomisation
> test (permutation of residuals after regressing out $\mathbf{Z}$).
^def-kcit

**Advantages:** No distributional assumptions; applies to non-linear dependencies.  
**Disadvantages:** $O(n^3)$ computation (kernel matrix inversion); slow for large $n$.

**Practical alternatives:**
- **RCIT** (Strobl et al. 2019): random Fourier feature approximation of KCIT, $O(n)$.
- **CMIknn** (Runge 2018): nearest-neighbour-based, useful for time-series applications.

### 4. The role of $\alpha$ in the PC algorithm

The significance level $\alpha$ is the primary tuning parameter of the PC algorithm.
Its effect is **asymmetric**:

| $\alpha$ | Effect on skeleton | Resulting error |
|----------|--------------------|-----------------|
| Small (e.g. $10^{-4}$) | Many edges retained | Dense graph; over-connected skeleton |
| Large (e.g. $0.1$) | Many edges removed | Sparse graph; under-connected skeleton |

> [!note] The $\alpha$ tradeoff
> There is no universally correct $\alpha$. In practice:
> - Causal discovery papers use $\alpha \in [0.01, 0.05]$ as default.
> - With large $n$, smaller $\alpha$ is appropriate (tests have power to detect weak dependencies).
> - With small $n$, larger $\alpha$ avoids over-pruning but risks spurious edges.
> - The number of tests performed in PC is $O(d^{k+2})$ where $k$ = max conditioning set size;
>   **multiple testing corrections** (Bonferroni, FDR) are sometimes applied but are
>   controversial — they change the estimand (sparse vs. FDR-controlled skeleton).

### 5. Multiple testing challenge

In the PC algorithm on $d$ variables with max skeleton degree $k$, the number of CI tests
performed is $O\binom{d}{2}\binom{d-2}{k}$. For $d=50$, $k=3$, this is on the order of
$10^5$ tests. Running all at level $\alpha=0.05$ gives an expected number of false positives
of roughly $0.05 \times 10^5 = 5{,}000$ spurious edge retentions.

**Strategies:**
1. **No correction** (default in `pcalg`): accept some false positives; rely on faithfulness
   for asymptotic correctness.
2. **Bonferroni correction**: $\alpha_{\text{per-test}} = \alpha / m$ where $m$ = number of
   tests. Very conservative; removes many true edges.
3. **FDR control**: e.g. Benjamini-Hochberg at the skeleton phase. Used in some variants.
4. **Adaptive $\alpha$**: reduce $\alpha$ as conditioning set size increases (large $k$ →
   fewer, more uncertain tests).

## Connections

- **PC algorithm**: uses CI tests as its atomic operation — see [[PC Algorithm]] for
  how the skeleton and orientation phases depend on CI test outcomes.
- **Faithfulness**: the PC algorithm's correctness requires faithfulness. CI tests cannot
  detect that faithfulness holds; they can only find independences. Near-faithfulness
  (weak but non-zero dependencies) is hard to distinguish from independence in small $n$.
- **Causal sufficiency**: if hidden variables exist, conditional independences in the
  observed data may be spurious. The **FCI algorithm** accounts for this.
- **Linear SEM / NOTEARS**: the [[DAG Structure Learning Problem]] uses a linear SEM where
  Gaussian noise means Fisher $Z$ CI tests are correctly specified. For non-Gaussian noise
  (NOTEARS works with Exp, Gumbel), Fisher $Z$ may be misspecified.

## See Also
- [[PC Algorithm]] — the primary consumer of CI tests in causal discovery
- [[Markov Equivalence Classes and CPDAGs]] — what CI tests are used to recover
- [[DAG Structure Learning Problem]] — the score-based alternative to CI-based methods
- [[GES - Greedy Equivalence Search]] — does not use CI tests; uses a decomposable score instead
- [[Approximate Bayesian Computation for ABMs]] — a related non-standard inference approach (moment-based)
