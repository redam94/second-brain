---
title: "Conditional Independence Tests for Causal Discovery"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/causal-structure-learning-sources.md]]"
source_location: "Kalisch & Bühlmann (2007) JMLR §2; Spirtes et al. (2000) §3"
date_ingested: 2026-10-12
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[Markov Equivalence and CPDAGs]]"
  - "[[DAG Structure Learning Problem]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "CI tests"
  - "Fisher z-test"
  - "partial correlation test"
  - "kernel CI test"
---

# Conditional Independence Tests for Causal Discovery

> [!summary]
> **Constraint-based causal discovery** (e.g., [[PC Algorithm]]) uses **conditional
> independence (CI) tests** as the primitive operation: testing $H_0: X \perp Y \mid \mathbf{Z}$
> for various conditioning sets $\mathbf{Z}$. The choice of CI test is critical —
> different tests make different distributional assumptions, have different power
> characteristics, and scale differently with the conditioning set size $|\mathbf{Z}|$.
> For Gaussian data, **Fisher's z-test** (based on partial correlation) is the standard.
> For non-Gaussian or non-linear settings, **kernel-based tests** (KCI, HSIC) and
> **rank-based tests** are preferred.

## Overview

A CI test takes as input $n$ observations of $(X, Y, \mathbf{Z})$ and outputs a
**p-value** for the null $H_0: X \perp Y \mid \mathbf{Z}$. In the PC algorithm:
- If p-value $> \alpha$: fail to reject $H_0$ → **remove edge** $X\!-\!Y$.
- If p-value $\leq \alpha$: reject $H_0$ → **retain edge** $X\!-\!Y$.

The statistical level $\alpha$ controls the trade-off between type-I errors (false
edge removals = false negatives in the skeleton) and type-II errors (false edge
retentions = false positives in the skeleton). For high-dimensional consistency, a
data-adaptive $\alpha_n \to 0$ is used (see [[PC Algorithm#^thm-pc-consistency]]).

## Main Content

### Partial correlation and the Fisher z-test (Gaussian case)

The most widely used CI test in practice assumes a multivariate **Gaussian** distribution.

> [!definition] Partial Correlation
> For $(X, Y, \mathbf{Z})$ jointly Gaussian, define the **partial correlation**
> $\rho_{XY \mid \mathbf{Z}}$ as the correlation between the residuals of regressing
> $X$ on $\mathbf{Z}$ and $Y$ on $\mathbf{Z}$:
> $$\rho_{XY \mid \mathbf{Z}} = \text{Cor}(X - \hat{X}, \; Y - \hat{Y}),$$
> where $\hat{X} = \mathbb{E}[X \mid \mathbf{Z}]$ and $\hat{Y} = \mathbb{E}[Y \mid \mathbf{Z}]$.
>
> Under Gaussianity, $X \perp Y \mid \mathbf{Z} \iff \rho_{XY \mid \mathbf{Z}} = 0$.
^def-partial-corr

> [!definition] Fisher z-transformation and CI test
> Given $n$ observations, compute the **sample partial correlation** $\hat{\rho}_{XY\mid\mathbf{Z}}$.
> Define the **Fisher z-transform**:
> $$\hat{z} = \frac{1}{2}\log\frac{1 + \hat{\rho}}{1 - \hat{\rho}} = \tanh^{-1}(\hat{\rho}).$$
> Under $H_0: \rho_{XY\mid\mathbf{Z}} = 0$, the statistic
> $$T = \sqrt{n - |\mathbf{Z}| - 3}\;\hat{z} \;\xrightarrow{d}\; \mathcal{N}(0, 1).$$
> **Reject** $H_0$ at level $\alpha$ iff $|T| > z_{\alpha/2}$.
^def-fisher-z

> [!note] Practical considerations for partial correlation
> - **Computational cost**: for conditioning set size $|\mathbf{Z}| = k$, computing
>   $\hat{\rho}_{XY\mid\mathbf{Z}}$ from the sample covariance matrix takes $O(k^2 d)$
>   operations if the inverse is updated incrementally.
> - **Sample size requirements**: the asymptotic normal approximation requires
>   $n \gg |\mathbf{Z}| + 3$. For large conditioning sets and small $n$, the test is unreliable.
> - **Violation of Gaussianity**: under non-Gaussian distributions, partial correlation
>   zero does not imply CI (only Gaussians have this property for correlations). Use
>   rank-based or kernel tests instead.

### Rank-based tests (non-Gaussian, linear case)

> [!definition] Rank-based (Spearman / Kendall) Partial Correlation
> Replace the raw data with **ranks** before computing partial correlation.
> Spearman's rank correlation is the Pearson correlation of the ranked data.
> The Fisher z-test is then applied to the rank correlation.
>
> **When to use**: when the data is non-Gaussian but the relationships are still
> **monotone** (rank-preserving). Robust to outliers and heavy tails.
^def-rank-ci

### Kernel-based tests (non-linear, general distributions)

For general non-linear and non-Gaussian settings, **kernel-based CI tests** are used.

> [!definition] Kernel Conditional Independence Test (KCI; Zhang et al., 2012)
> The **KCI test** tests $H_0: X \perp Y \mid \mathbf{Z}$ by:
> 1. Regressing $X$ on $\mathbf{Z}$ and $Y$ on $\mathbf{Z}$ using **kernel ridge regression**,
>    obtaining residuals $\tilde{X}$ and $\tilde{Y}$ in the RKHS.
> 2. Computing a kernel cross-covariance statistic between the residuals.
> 3. Testing under the null with a permutation test or Gamma approximation.
>
> **Advantages**: fully non-parametric, handles non-linear dependencies.
> **Disadvantages**: $O(n^3)$ time (or $O(m^2 n)$ with Nyström approximation for $m \ll n$);
> unreliable for small $n$ with large conditioning sets.
^def-kci

### G-test (discrete data)

> [!definition] G-test / log-likelihood ratio (Spirtes et al., 2000)
> For **discrete** variables with $r_X, r_Y, r_Z$ levels:
> $$G = 2\sum_{x,y,\mathbf{z}} n_{xy\mathbf{z}} \log\frac{n_{xy\mathbf{z}}\, n_{\cdot\cdot\mathbf{z}}}{n_{x\cdot\mathbf{z}}\, n_{\cdot y\mathbf{z}}}$$
> Under $H_0$, $G \xrightarrow{d} \chi^2_{(r_X - 1)(r_Y - 1) r_Z}$.
>
> **Note**: requires sufficient counts $n_{xy\mathbf{z}} > 5$ for each cell — fails for
> large conditioning sets with sparse data.
^def-g-test

### Multiple testing and level choice

Using many CI tests with a fixed level $\alpha$ inflates the family-wise error rate —
many edges may be spuriously removed.

> [!note] Level choice in practice
> Common strategies:
> - **Fixed level**: $\alpha = 0.01$ or $\alpha = 0.05$ — simple but not theoretically justified
>   in high dimensions.
> - **Data-adaptive level**: $\alpha_n = \Phi(-c\sqrt{n/2-2})$ (Kalisch & Bühlmann, 2007) —
>   shrinks toward 0 as $n \to \infty$, ensuring consistency. In practice, this is
>   very conservative (close to 0 for moderate $n$); $\alpha = 0.01$ works better empirically.
> - **Bonferroni correction**: $\alpha / \binom{d}{2}$ — too conservative for large $d$.

## Connections

- **PC algorithm**: uses these tests iteratively, with growing conditioning sets;
  the choice of test fully determines the skeleton — see [[PC Algorithm]].
- **GES score (BIC)**: GES ([[GES Algorithm]]) avoids CI testing entirely by using a score;
  this is more robust to the multiple-testing problem.
- **Faithfulness**: CI tests are reliable only under faithfulness ([[Markov Equivalence and CPDAGs#^def-markov-compat]]). Near-faithfulness violations (very small but non-zero partial correlations) can cause false edge removals.
- **Causal sufficiency**: the tests assume no hidden confounders; latent variables induce
  spurious dependences that CI tests cannot distinguish from direct effects.

## See Also
- [[PC Algorithm]] — uses these CI tests to recover the skeleton
- [[Markov Equivalence and CPDAGs]] — faithfulness and why CI ↔ d-separation
- [[GES Algorithm]] — score-based alternative that avoids CI testing
- [[DAG Structure Learning Problem]] — overview of the structure-learning landscape
