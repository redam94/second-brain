---
title: "Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/theorem
  - doc/paper
source: "[[raw/Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm.pdf]]"
source_location: "Sec. 6.5 (Table 1) and Appendix B (Theorem 2), pp. 20-21 and 47-50"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm"
doc_type: paper
depends_on:
  - "[[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]]"
used_by:
  - "[[Abowd 2022 - Least Squares and Rounder Estimators]]"
  - "[[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]"
aliases:
  - TopDown Algorithm
  - TDA measurement and estimation phases
  - census zCDP budget allocation theorem
---

# Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof

> [!summary]
> TDA has a **measurement phase** (noisy discrete-Gaussian measurements of key queries at every geographic level) and an **estimation phase** (sequential top-down constrained non-negative least squares plus controlled rounding, each level conditioned on the fixed estimate above). Total privacy loss is the sum of the per-level budgets. Theorem 2 (Appendix B): with noise variances $\sigma^2_{ijkl}=\psi^2/(c_{ij}d_{ijk})$ and budget shares $c_{ij},d_{ijk}$ satisfying the stated sum constraints, TDA is $\rho$-zCDP with $\rho=1/\psi^2$.

## Overview

The motivation is to exploit the tree-like geographic hierarchy to get estimates more precise than estimating block-level vectors independently and aggregating (the block-by-block baseline in [[Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline]]), in a scalable manner.

## Main Content

> [!definition] Table 1: the TopDown Algorithm
> **Measurement phase.**
> 1. For each level $i\in\{\text{US, state, county, tract, block group, block}\}$: (a) determine the privacy-loss budget for level $i$; (b) take DP noisy measurements $\tilde M_\gamma$ for all nodes $\gamma$ in level $i$.
>
> **Estimation phase.**
> 1. For the US root $\gamma_0$, estimate $x_{\gamma_0}$ by (a) a non-negative solution $\tilde x_{\gamma_0}$ from the DP measurements $\tilde M_{\gamma_0}$, invariants and edit constraints at the US level; (b) a non-negative integer solution $\hat x_{\gamma_0}$ from $\tilde x_{\gamma_0}$ by controlled rounding.
> 2. For each level $i\in\{\text{state, county, tract, block group, block}\}$ let $P_i$ be the set of distinct parents among its nodes. For each parent $\gamma\in P_i$ estimate the joint contingency vector $x_{\text{children}(\gamma)}$ by (a) a non-negative solution $\tilde x_{\text{children}(\gamma)}$ from $\tilde M_{\text{children}(\gamma)}$, invariants, edit constraints and **aggregate constraints enforcing that the children sum to $\hat x_\gamma$**; (b) a non-negative integer solution $\hat x_{\text{children}(\gamma)}$ by controlled rounding.
^def-tda-table1

**Why two phases.** In the measurement phase, queries at different levels involve the same individuals, so the total privacy loss is the **sum** of losses across levels; the distribution of the global budget across levels and queries is a design choice. The estimation phase is pure post-processing and costs no privacy. In each step the already-estimated higher level is held fixed and becomes an extra constraint on the next subproblem. Two-step solving (continuous least squares, then rounding) is needed because the integer program at full size is intractable. Sequential details are in [[Abowd 2022 - Least Squares and Rounder Estimators]].

### Privacy accounting (Appendix B)

Convert noise variances to $\rho$: let $q_{ijkl}$ be the univariate query for geographic level $i$, node $j$ within the level, marginal query set $k$ within the node, and cell $l$ of that marginal. The query strategy has two parts: which queries are asked and which budget each gets. Early versions were symmetric over levels and nodes; the current strategy lets the set of queries differ by level, but requires that the same queries are asked for every node within a level.

Relative precision of a query is $c_{ij}\times d_{ijk}$ with $c_{ij}\in(0,1]$ the $\rho$ proportion for node $j$ in level $i$ and $d_{ijk}\in(0,1]$ the proportion for the $k$-th query at that node. The goal is a **global scale** $\psi$ such that discrete Gaussian noise with variance
$$
\sigma_{ijkl}^2=\frac{\psi^2}{c_{ij}\,d_{ijk}}
$$
gives $\rho$-zCDP. Structure requirements: (R1) for all $i,j$: $\sum_{k=1}^{K_{ij}}d_{ijk}=1$ (relative split of precision across queries sums to 1); (R2) for every block $j$, summing $c_{ij}$ over the directed path $P(1,Ij)$ from the root (US) down to block $j$ gives 1.

> [!theorem] Theorem 2 (TDA satisfies zCDP)
> The set of queries $\{q_{ijkl}\}$ processed by the discrete Gaussian mechanism with parameters $\sigma^2_{ijkl}=\psi^2/(c_{ij}d_{ijk})$, where (1) all queries are marginals, (2) $c_{ij}\ge0$, $d_{ijk}\ge0$, (3) $\sum_kd_{ijk}=1$ for all $i,j$, (4) $\sum_{ij\in P(1,Ij)}c_{ij}=1$ for all blocks $j$, satisfies $\rho$-zCDP with $\rho=1/\psi^2$.
^thm-tda-zcdp

(Functionally, if $c_{ij}$ or $d_{ijk}$ is 0 the query is not asked.)

*Proof sketch.* By Theorem 1 it suffices to show $\frac1{\psi^2}\sum_i\sum_j\sum_k\sum_l c_{ij}d_{ijk}\big(q_{ijkl}(x)-q_{ijkl}(x')\big)^2\le2\rho$ for neighbors $x\sim x'$ (bounded: one record changes).

- *Case 1: the changed record keeps its block* (so the same node is affected at every level, say $j_i^*$ at level $i$). Only those nodes contribute; since queries are marginals, at most two cells differ in each marginal group (one down by 1, one up by 1), giving $\frac1{\psi^2}\sum_ic_{ij_i^*}\sum_kd_{ij_i^*k}(1^2+(-1)^2)=\frac2{\psi^2}\sum_ic_{ij_i^*}=\frac2{\psi^2}$ using (3) and (4).
- *Case 2: the record changes block.* Let $j_i^*,j_i^{**}$ be the nodes at level $i$ before/after. Because the geography is a tree, there is a level $S$ such that the nodes coincide for all $i\le S$ (including the US). For $i\le S$ the cells change as in Case 1, contributing $\frac2{\psi^2}\sum_{i\le S}c_{ij_i^*}$. For $i>S$ the affected nodes differ, and in each one marginal cell changes by exactly $+1$ or $-1$ (contributing $1^2$ each): $\frac1{\psi^2}\big[\sum_{i>S}c_{ij_i^*}+\sum_{i>S}c_{ij_i^{**}}\big]$. Adding, the total is $\frac1{\psi^2}\big[\sum_{\text{all }i}c_{ij_i^*}+\sum_{\text{all }i}c_{ij_i^{**}}\big]=\frac2{\psi^2}$ by (4) applied to both paths.

In both cases the bound is $2/\psi^2=2\rho$, so $\rho=1/\psi^2$. (The arXiv text of the Case 2 derivation is truncated at the end of the appendix; the final combination above is this note's completion by the same argument and the statement of Theorem 2.)

### Consequences for design

Because the allocation $\{c_{ij}\}$ sums to 1 along every root-to-block path, the global $\rho$ is **independent of the number of nodes** at a level: nodes at the same level are disjoint, so parallel composition applies across them, while sequential composition applies along the path. This is why the "$\rho$ proportions" in Tables 3 and 6 add to one across levels for each of persons and housing units.

## Examples

> [!example] Budget bookkeeping for the April 2021 person allocation
> Setup: person $\rho$ proportions by level (US, state, county, tract, CBG, block) $=(51,153,78,51,172,519)/1024$, global person budget $\rho=1.05$.
> Solution: the proportions sum to $1024/1024=1$ (R2), so the total is $\rho=1.05$ regardless of how many nodes there are. Level budgets: US $0.0523$, state $0.157$, county $0.080$, tract $0.052$, CBG $0.176$, block $0.532$. Within the block level, the DETAILED query gets $989/1024$ of that.
> Interpretation: half of the person budget sits on blocks (location protection and block-level accuracy), as the paper states.
^ex-budget-bookkeeping

```python
import numpy as np

# Table 3 (April 2021) and Table 6 (production): person and housing-unit rho proportions by level
levels = ["US", "state", "county", "tract", "CBG", "block"]
person_apr = np.array([51, 153, 78, 51, 172, 519]) / 1024
housing_apr = np.array([1, 1, 18, 75, 906, 23]) / 1024
person_prod = np.array([104, 1440, 447, 687, 1256, 165]) / 4099
housing_prod = np.array([1/205, 1/205, 7/82, 364/1025, 1759/4100, 99/820])
for name, v in (("person Apr21", person_apr), ("housing Apr21", housing_apr),
                ("person prod", person_prod), ("housing prod", housing_prod)):
    print(name, v.sum())                      # each ~1.0 (requirement R2 at the level scale)

rho_person = 2.56
print(dict(zip(levels, np.round(rho_person * person_prod, 4))))
# noise variance for a query: sigma^2 = 1 / (rho_total * c * d)
c_county, d_total = 447/4099, 3126/4097
print(1 / (rho_person * c_county * d_total))  # ~4.7
```

## Connections

- The discrete Gaussian and the $L_2$-sensitivity $\sqrt2$ premise: [[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]].
- Parallel vs sequential composition is the zCDP version of RDP composition: [[Mironov 2017 - RDP Properties and Composition]]; GDP composition adds in quadrature: [[Dong Roth Su 2022 - Composition Theorem and Central Limit Theorems]] (for GDP, $\mu=\sqrt{2\rho}$ and $\rho$'s add).
- Hierarchical estimation with inverse-variance weights: [[Hierarchical Forecast Reconciliation (MinT)]].

## See Also

- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]
- [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]
