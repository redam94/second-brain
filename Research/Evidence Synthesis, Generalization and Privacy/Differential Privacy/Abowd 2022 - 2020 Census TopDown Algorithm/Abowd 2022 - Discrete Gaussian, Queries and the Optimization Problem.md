---
title: "Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/definition
  - doc/paper
source: "[[raw/Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm.pdf]]"
source_location: "Sec. 6.1-6.4 (Definitions 3-4, Theorem 1, notation, utility criteria, queries), pp. 15-20"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm"
doc_type: paper
depends_on:
  - "[[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]]"
  - "[[Abowd 2022 - Policy Constraints, Invariants and the Redistricting Schema]]"
used_by:
  - "[[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]]"
  - "[[Abowd 2022 - Least Squares and Rounder Estimators]]"
aliases:
  - discrete Gaussian mechanism census
  - TDA problem statement
  - marginal query groups L2 sensitivity
---

# Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem

> [!summary]
> Noisy measurements are $\tilde M=Qx+y$ with $y_j\sim\mathcal N_{\mathbb Z}(0,\sigma_j^2)$ independent (the **discrete Gaussian mechanism**, which satisfies $\rho$-zCDP when the rescaled query has $\ell_2$ sensitivity at most $\sqrt{2\rho}$). Queries are marginal query groups with binary, mutually exclusive and exhaustive rows, so one group has $\ell_2$ sensitivity at most $\sqrt2$ under bounded neighbors. TDA solves: choose queries, their precisions and an estimator so that accuracy targets hold at minimal total $\sum\rho_i$, with output a non-negative integer vector satisfying all constraints.

## Overview

Section 6.1-6.4 sets up the formalism: the mechanism and its privacy theorem, contingency-table notation and geography hierarchy, the constrained estimation problem with its utility criteria, and the structure of the queries.

## Main Content

> [!definition] Definition 3: $L_p$ query sensitivity
> For $p\in\{1,2,\dots\}$ the $L_p$ sensitivity of $q:\mathcal X^n\to\mathbb R^a$ is $\max_{x\sim x'}\big(\sum_{j=1}^a|q_j(x)-q_j(x')|^p\big)^{1/p}$.
^def-lp-sensitivity

> [!definition] Definition 4: discrete Gaussian distribution
> For $\mu,\sigma\in\mathbb R$, $\sigma>0$, the discrete Gaussian $\mathcal N_{\mathbb Z}(\mu,\sigma^2)$ has
> $$P(X=x)=\frac{\exp(-(x-\mu)^2/2\sigma^2)}{\sum_{y\in\mathbb Z}\exp(-(y-\mu)^2/2\sigma^2)},\quad x\in\mathbb Z.$$
^def-discrete-gaussian

> [!theorem] Theorem 1 (multivariate discrete Gaussian mechanism; Canonne-Kamath-Steinke 2021, Thm. 14)
> Let $\sigma_1,\dots,\sigma_a>0$ and $\rho\ge0$. For $q:\mathcal X^n\to\mathbb Z^a$ suppose the rescaled query $q'=(q_1/\sigma_1,\dots,q_a/\sigma_a)$ has $L_2$ sensitivity at most $\sqrt{2\rho}$. Define $M(x)=q(x)+y$ with $y_j\sim\mathcal N_{\mathbb Z}(0,\sigma_j^2)$ independently. Then $M$ satisfies $\rho$-zCDP.
^thm-discrete-gaussian-zcdp

Setting $a=1$ gives the univariate case. The discrete Gaussian replaced the earlier geometric mechanism because of better empirical accuracy; it has smaller tail probabilities than the double-geometric distribution, which provably reduces worst-case errors associated with the microdata requirement (Abowd et al. 2021). Sensitivity matters because noise scale for fixed privacy loss is proportional to it.

### Notation (6.2)

- $n$ records with $k$ characteristics (including geography); sample space $\chi$ of cardinality $c$: $c=11{,}879{,}679{,}168$ persons, $11{,}785{,}396$ housing units. Without geography: $\chi^*$, $c^*=2016$ and $2$.
- **Contingency table (histogram)**: flattened vector $x\in\mathbb Z_{\ge0}^c$. A set of linear queries is a matrix $Q\in\mathbb R^{a\times c}$ and answers are $Qx$. A DP measurement vector is $\tilde M=Qx+y$ with $y$ independent, here $y_j\sim\mathcal N_{\mathbb Z}(0,\sigma_j^2)$. The mapping from $\{\sigma_j^2\}$ to $\rho$ is Theorem 1 (details in Appendix B).
- **Geography**: $\Gamma$ is a directed rooted tree with root $\gamma_0$ (US); $\text{parent}(\gamma)$, $\text{children}(\gamma)$, $\text{leaves}(\gamma)$; a *geographic level* is the set of nodes at fixed distance from the root (US, state, county, tract, block group, block). $x_\gamma$ is the contingency vector for node $\gamma$ (length $c^*$ after dropping geography), $\tilde M_\gamma=Qx_\gamma+y$, and the stacked children vector $x_{\text{children}(\gamma)}$ has length $c^*\times|\text{children}(\gamma)|$.
- Output of TDA: $\hat x_\gamma$ for all $\gamma\in\Gamma$.
- **Constraints** from invariants and edit rules: equalities $C^{\text{eq}}\hat x=c^{\text{eq}}$ and inequalities $C^u\hat x\le c^u$ (lower bounds implemented by negating). Example: state totals are in $c^{\text{eq}}$; if $k$ occupied GQ facilities of a type are in a geographic unit, a lower bound of $k$ on that GQ population enters $c^u$.

### Problem statement and utility criteria (6.3)

The census tabulations are $Ax$ for a query matrix $A$; $Ax$ (the CEF-based reference value, not the unknown "truth" of classical statistics) is the target for disclosure avoidance, and TDA seeks optimal tabular estimates $A\hat x$ relative to $Ax$ for a given privacy-loss budget.

> [!definition] The statistical optimization problem
> Given accuracy targets on $A\hat x$ relative to $Ax$, choose query matrices $Q^*=\{Q_1,\dots,Q_m\}$, budgets $\rho^*=\{\rho_1,\dots,\rho_m\}$ and an estimator $\hat x=g(\tilde M^*,Q^*,\rho^*,C^{\text{eq}},c^{\text{eq}},C^u,c^u)$ that meets the targets with **minimal total budget** $\sum_{i=1}^m\rho_i$, where $\hat x\in\mathbb Z_{\ge0}^d$, $C^{\text{eq}}\hat x=c^{\text{eq}}$ and $C^u\hat x\le c^u$, and $\tilde M^*=(\tilde M_1,\dots,\tilde M_m)$ are the DP measurements. Three design elements: (1) which queries to measure; (2) the accuracy of each measurement; (3) how to combine the measurements into a non-negative integer estimate satisfying all constraints.
^def-tda-optimization

**Utility target.** Redistricting units (voting districts) are drawn after publication but nest in pre-specified political entities (states, counties, places, school districts, tribal areas), so error metrics within those entities control equal-population districts. The tuning criterion: for off-spine geographies with population at least 500, the largest OMB-category race/ethnicity group's share of total population must be within $\pm5$ percentage points of the enumerated share at least 95% of the time (also controls the share of voting-age population). Quantile error statistics by CEF count (absolute and relative errors for total population, voting-age population, number of races, population by OMB race and by ethnicity within race) were used to study interactions between budget allocations, which cannot be done ex ante because errors from the DP mechanism are data-independent but post-processing errors are not. The Bureau tuned to find the **smallest** budget meeting specified goals, using a tight standard for the smallest districts provided by the Department of Justice Voting Section as Section 2 examples; this showed where other accuracy objectives (tract/county) deteriorate, after which other experts laid out their targets.

### Queries (6.4)

Queries are restricted to **binary** matrices. A **marginal query group** is a set of linear queries whose product with $x$ gives a marginal of the data. Budgets ($\rho$) are allocated first to geographic levels and then to marginal query groups within each level. Examples (redistricting): the census-race group (63 counts), voting-age group (2), census race by voting age (126), all dimensions crossed (**detailed query**) and all collapsed (**total query**); also Cartesian products of collapses (e.g. 63 races collapsed to 1/2/3+ races). Queries are built by (a) *recodes* of schema attributes (dropping levels or unioning, mutually exclusive but not necessarily exhaustive) and (b) Kronecker products of recodes.

Marginal groups are exhaustive (never query "18 and older" without "17 and younger") and mutually exclusive in levels. Together with binary rows these give **$L_2$ sensitivity at most $\sqrt2$** per group under bounded neighbors (a changed record moves one count down by 1 and another up by 1). By construction all queries in a group receive the same precision, which may differ between groups and geographies.

## Examples

> [!example] Noise scale from a $\rho$ allocation
> Setup: one marginal query group with $L_2$ sensitivity $\sqrt2$ receives budget $\rho_g$ with noise variance $\sigma^2$ on every cell.
> Solution: Theorem 1 requires $\sqrt2/\sigma\le\sqrt{2\rho_g}$, i.e. $\sigma^2\ge1/\rho_g$. Two concrete cases from the paper's allocations: (i) production persons, county TOTAL query: $\rho_g=2.56\times\frac{447}{4099}\times\frac{3126}{4097}\approx0.213$, so $\sigma^2\approx4.7$; (ii) April 2021 demonstration, persons, county TOTAL: $\rho_g=1.05\times\frac{78}{1024}\times\frac{342}{1024}\approx0.0267$ (the paper notes this is about 2.5% of the person budget), so $\sigma^2\approx37.4$.
> Interpretation: raising the global budget and shifting allocation toward the county and tract levels cut the county-total noise variance roughly eightfold between the demonstration and production settings. Recomputed by this note from the paper's tables; $\sigma^2=1/\rho_g$ uses the Theorem 1 bound with equality.
^ex-sigma-from-rho

```python
import numpy as np

def discrete_gaussian_pmf(sigma, mu=0.0, support=60):
    xs = np.arange(-support, support + 1)
    w = np.exp(-(xs - mu) ** 2 / (2 * sigma ** 2))
    return xs, w / w.sum()

xs, p = discrete_gaussian_pmf(2.0)
print((xs ** 2 * p).sum())          # variance close to sigma^2 = 4 for sigma >= 1
print(p[xs == 0], p[np.abs(xs) >= 6].sum())

# rho -> required variance for an L2-sensitivity-sqrt(2) marginal group
rho_group = 2.56 * (447 / 4099) * (3126 / 4097)   # production persons, county TOTAL
print(rho_group, 1 / rho_group)                    # ~0.213, sigma^2 ~ 4.7
```

(This pmf snippet only illustrates the distribution; it is **not** a secure sampler. The census implementation uses the exact sampling algorithm of Canonne et al. to avoid floating-point vulnerabilities, see [[Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline]].)

## Connections

- The zCDP Gaussian curve: [[Mironov 2017 - RDP of Randomized Response, Laplace and Gaussian]]; GDP version of the same noise: [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]].
- The estimator $g$ is implemented in [[Abowd 2022 - Least Squares and Rounder Estimators]]; the privacy-loss sum over levels in [[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]].
- Optimizing queries and budgets for minimal total budget resembles design of experiments: [[Power Analysis and Sample Size]].

## See Also

- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]
- [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]
