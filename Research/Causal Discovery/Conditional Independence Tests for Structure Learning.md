---
title: "Conditional Independence Tests for Structure Learning"
tags:
  - source/ingested
  - topic/causal-discovery
  - type/concept
  - doc/paper
source: "Spirtes, Glymour & Scheines (2000) §5; Fisher (1924); Strobl et al. (2019) arXiv — PDF unavailable (network policy blocked academic domains)"
source_location: "Spirtes, Glymour & Scheines (2000), Ch. 5; Fisher z-test standard reference"
date_ingested: 2026-09-15
folder: "Causal Discovery"
doc_type: paper
depends_on:
  - "[[DAG Structure Learning Problem]]"
  - "[[Markov Equivalence Classes and CPDAGs]]"
used_by:
  - "[[PC Algorithm]]"
aliases:
  - "CI tests"
  - "conditional independence testing"
  - "Fisher z-test structure learning"
---

# Conditional Independence Tests for Structure Learning

> [!summary]
> Constraint-based causal discovery algorithms (PC, FCI) rely entirely on **conditional
> independence (CI) tests** to determine which edges exist in the skeleton and to identify
> v-structures. The choice of test determines what distributional assumptions are made: Fisher's
> partial-correlation z-test assumes multivariate Gaussian data; chi-square tests handle
> discrete data; kernel-based tests (KCI, HSIC) apply non-parametrically. The significance
> threshold $\alpha$ controls skeleton density — smaller $\alpha$ gives sparser graphs. In
> practice, the number of tests is the main computational bottleneck for the [[PC Algorithm]].

## Overview

The **Markov and Faithfulness assumptions** (see [[DAG Structure Learning Problem]]) guarantee
that the conditional independences implied by the true DAG are exactly the ones that appear in the
joint distribution. CI tests operationalize this: they take a pair of variables $(X, Y)$ and a
conditioning set $\mathbf{S}$ and decide whether $X \perp\!\!\!\perp Y \mid \mathbf{S}$.

Because the PC algorithm tests all pairs at all conditioning set sizes, efficiency is paramount.
**Limiting the size of conditioning sets** (via bounded-degree assumptions) is the main
algorithmic device for tractability.

## Main Content

### The Markov and Faithfulness assumptions

> [!definition] Definition: Causal Markov Condition
> A DAG $\mathcal{G}$ and joint distribution $P$ satisfy the **Causal Markov Condition** if every
> variable $X_i$ is conditionally independent of its non-descendants given its parents:
> $$X_i \perp\!\!\!\perp \mathrm{NonDesc}(X_i) \mid \mathrm{Pa}(X_i).$$
> Equivalently (by d-separation): $P$ encodes all conditional independences entailed by
> $\mathcal{G}$ via d-separation.
^def-markov

> [!definition] Definition: Faithfulness
> The distribution $P$ is **faithful** to DAG $\mathcal{G}$ if every conditional independence in
> $P$ is entailed by $\mathcal{G}$ via d-separation. That is:
> $$X \perp\!\!\!\perp Y \mid \mathbf{S} \text{ in } P \iff X \perp\!\!\!\perp Y \mid \mathbf{S}
> \text{ in } \mathcal{G} \text{ (d-separation)}.$$
> Faithfulness rules out **cancellations** — parameter configurations that accidentally create
> independence not implied by the graph structure. Faithfulness holds generically (for Lebesgue
> almost all parameter values) but can fail at measure-zero parameter settings.
^def-faithfulness

### Gaussian data: Fisher's partial-correlation z-test

For continuous data assumed to be multivariate Gaussian, partial correlation provides a sufficient
statistic for conditional independence.

> [!definition] Definition: Partial Correlation
> For variables $X, Y$ conditioned on set $\mathbf{S}$, the **partial correlation**
> $\rho_{XY \cdot \mathbf{S}}$ is the correlation between the residuals of regressing $X$ on
> $\mathbf{S}$ and regressing $Y$ on $\mathbf{S}$.
> Under multivariate Gaussianity, $X \perp\!\!\!\perp Y \mid \mathbf{S} \iff \rho_{XY\cdot\mathbf{S}} = 0$.
^def-partial-corr

> [!theorem] Fisher's z-Transform Test (Fisher 1924)
> Given $n$ observations, let $\hat\rho$ be the sample partial correlation between $X$ and $Y$
> conditioned on $\mathbf{S}$ (with $|\mathbf{S}| = q$). Define:
> $$z(\hat\rho) = \frac{1}{2}\ln\!\left(\frac{1+\hat\rho}{1-\hat\rho}\right) = \operatorname{arctanh}(\hat\rho).$$
> Under $H_0: \rho_{XY\cdot\mathbf{S}} = 0$ and large $n$:
> $$\sqrt{n - |\mathbf{S}| - 3}\, z(\hat\rho) \;\overset{d}{\longrightarrow}\; \mathcal{N}(0,1).$$
> **Decision rule:** reject independence (keep the edge) if
> $|z(\hat\rho)| > z_{\alpha/2} = \Phi^{-1}(1-\alpha/2)$.
^thm-fishers-z

### Discrete data: chi-square test

> [!definition] Chi-Square Test for Conditional Independence
> For discrete variables $X, Y$ conditioned on $\mathbf{S}$: within each stratum
> $\mathbf{S} = \mathbf{s}$, compute the $G^2$ (or Pearson $\chi^2$) statistic on the
> $|X| \times |Y|$ contingency table. Sum over strata. Under $H_0$, the statistic is
> asymptotically $\chi^2$ with $df = (|X|-1)(|Y|-1)\prod_{S_k \in \mathbf{S}}|S_k|$.
^def-chisq

### Kernel-based tests for non-Gaussian / non-linear settings

> [!definition] Kernel Conditional Independence Test (KCI, Zhang et al. 2012)
> The **Kernel CI test** (KCI) tests $X \perp\!\!\!\perp Y \mid \mathbf{S}$ non-parametrically
> using kernel embeddings of the conditional distributions. It regresses out $\mathbf{S}$ in
> RKHS and tests whether the residuals are independent via HSIC (Hilbert-Schmidt Independence
> Criterion). KCI is consistent for non-linear and non-Gaussian data but is $O(n^3)$ — expensive
> for large $n$.
^def-kci

### Effect of the significance threshold $\alpha$

| $\alpha$ (lower) | Harder to reject $H_0$ | Fewer edges removed → **denser** skeleton |
|---|---|---|
| $\alpha$ (higher) | Easier to reject $H_0$ | More edges removed → **sparser** skeleton |

In practice, $\alpha \in \{0.01, 0.05\}$ is common. Some implementations use $\alpha$ as a
tuning parameter, selecting it by cross-validation or information criteria. A too-small $\alpha$
causes missed edges (false negatives); too-large causes spurious edges (false positives).

### The multiple-testing problem

The PC algorithm performs $O(p^{q+2})$ tests for conditioning sets of size $q$. With $p$ large,
many tests are performed simultaneously. Standard Bonferroni correction at level $\alpha / m$ (for
$m$ tests) becomes very conservative; in practice, structural constraints (each edge is tested at
most once per conditioning set size) reduce the effective number of tests substantially.

## Connections

- **[[PC Algorithm]]**: Each edge removal in the skeleton phase corresponds to one CI test.
  The conditioning set $\hat{\mathbf{S}}_{XY}$ that made $X \perp\!\!\!\perp Y$ is stored
  as the **separation set** `Sep(X,Y)` and used to identify v-structures.
- **[[GES Algorithm]]**: GES does *not* use CI tests — it scores CPDAGs directly. The score
  implicitly captures all conditional independence information.
- **Faithfulness and finite samples**: A CI test rejects at level $\alpha$ — it makes errors.
  Unfaithful distributions and near-zero partial correlations in finite samples both cause
  problems for constraint-based methods that score-based methods handle differently.

## See Also
- [[PC Algorithm]] — the main consumer of these CI tests
- [[Markov Equivalence Classes and CPDAGs]] — why CI tests determine the CPDAG
- [[DAG Structure Learning Problem]] — the broader problem context
- [[Causal Structure Learning - Paradigm Overview]] — contrast with score-based methods
