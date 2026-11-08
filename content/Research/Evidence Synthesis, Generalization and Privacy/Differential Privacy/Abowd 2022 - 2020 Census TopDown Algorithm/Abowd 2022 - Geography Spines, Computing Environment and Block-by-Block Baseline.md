---
title: "Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/concept
  - doc/paper
source: "[[raw/Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm.pdf]]"
source_location: "Sec. 7.4-7.6 (Table 2) and Appendix A (Table 14, A.1), pp. 26-29 and 45-47"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm"
doc_type: paper
depends_on:
  - "[[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]]"
used_by:
  - "[[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]"
aliases:
  - AIAN spine
  - optimized spine custom block groups
  - block-by-block algorithm
  - census DAS computing environment
---

# Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline

> [!summary]
> Off-spine geographies (places, minor civil divisions, tribal areas) accumulate independent noise from every on-spine piece needed to build them. TDA mitigates this with an **AIAN spine** (splitting each state into tribal-area and remaining parts), an **optimized spine** with custom block groups and bypassed single-child parents, running on AWS EMR/Spark with Gurobi. Appendix A shows why the simple **block-by-block** algorithm is inferior for aggregates (national total variance 5,892,698 vs 6 under a six-level split).

## Overview

Section 7.4-7.5 improve accuracy for legally defined geographies far from the standard tabulation spine; 7.6 describes the computing environment. Appendix A defines the baseline algorithm and a stylized comparison.

## Main Content

### AIAN spine (7.4)

American Indian and Alaska Native (AIAN) areas tend to be far off the standard spine (the Navajo Nation spans subsets of many counties in New Mexico, Arizona and Utah). The **AIAN spine** subdivides each state having AIAN areas into two entities: the union of legally defined AIAN areas in the state and the remaining portion; counties, tracts and block groups are subdivided as needed to nest fully in either branch. Blocks are not subdivided because AIAN areas are composed of whole blocks. Count of states with AIAN areas on the spine: 36 in 2010, 37 in 2020; these act as state equivalents, so 87 (2010) and 88 (2020) state-equivalent geographies. Subtle effect: in states with AIAN areas the hierarchy branches at the state level, so AIAN and non-AIAN total populations are solved with privacy-loss budget and only their sum is invariant; in states without AIAN areas total population is invariant and no split is estimated. (SDTSAs and TDSAs were not used.)

### Optimized spine (7.5)

*Off-spine distance* is the minimum number of on-spine entities added or subtracted to define an off-spine entity; accuracy falls with this distance because independent DP noise accumulates over components. Two reconfigurations:
1. **Custom block groups**: re-grouping blocks so targeted off-spine entities are closer to the spine and GQ facilities of each type are isolated from housing-unit-only areas (improving accuracy for both GQ and surrounding blocks). Created by a greedy algorithm that minimizes off-spine distance for targeted off-spine entities (major sub-county governmental entities: minor civil divisions in strong-MCD states, otherwise incorporated and census-designated places, each split into AIAN and balance). Custom block groups are an implementation detail for TDA; the official tabulation block groups are used for all reported statistics. Custom tract groups were not implemented for redistricting data.
2. **Bypassing single-child parents**: when a parent's fan-out is one, its measurements must equal the child's, so extra budget used on the child after estimating the parent is wasted. The parent and child are collapsed into one node using the combined budget, taking DP measurements once.

> [!definition] Table 2: geographic entity counts after spine optimization
> | Entity | 2010 | 2020 |
> |---|---|---|
> | States with AIAN areas on the spine (count) | 36 | 37 |
> | Entities, state level | 87 | 88 |
> | Entities, county level | 3,488 | 3,496 |
> | Entities, tract level | 73,180 | 84,589 |
> | Tabulation block groups | 217,740 | 239,780 |
> | Custom block groups | 402,020 | 409,548 |
> | Tabulation blocks | 11,078,297 | 8,132,968 |
> | Tabulation blocks with occupied GQs | 112,956 | 126,723 |
> | Tabulation blocks with housing units $>0$ | 6,379,963 | 5,879,049 |
> | Tabulation blocks with potential positive population | 6,398,202 | 5,892,698 |
>
> Rhode Island has an AIAN area in 2020 but is not on the AIAN spine because that area has no housing units or occupied GQs (so zero a priori probability of positive population). Counts at county, tract and block-group levels differ from tabulation counts because the AIAN spine subdivides geographies.
^def-table2

### Computing environment (7.6)

DAS is written in Python 3.7 with Gurobi 9.1 for numerical optimization, run on AWS EMR 6.2 with Apache Spark 3.0.1 on clusters of r5.24xlarge VMs (96 cores, 768 GiB RAM): one EMR master and 8-30 workers, Spark in client mode, typically 24 cores per executor, 256 GiB driver memory, 64 GiB executor memory and 128 GiB memory overhead. The **DAS framework** (22 Python files, 2,814 lines plus 1,125 lines of unit tests) is a generic batch-processing system with configuration-defined *reader*, *engine*, *validator* and *writer* modules, so behaviour is determined entirely by the configuration file (the same framework supports experimentation and production). The **TDA** within it is 461 Python files (78,428 lines of program plus 11,513 lines of unit tests), 10 readers, 20 writers and multiple engines (one of each per run). Provenance: the framework determines the Python files needed and saves a "DAS Certificate" (XML and PDF) plus an archive of the complete source code run; all run data and metadata are archived in S3 with vintage tags.

All DP mechanisms need randomness: about **90 TB of random bytes** are estimated for the person and housing-unit tables, generated using the Intel RDRAND instruction mixed with bits from `/dev/urandom` (Garfinkel and Leclerc). Using the exact sampling algorithm of Canonne et al. for the discrete Gaussian and **rational** privacy-loss budgets avoids the floating-point random-number vulnerabilities noted by Mironov (2012).

### Appendix A: the block-by-block algorithm

> [!definition] Block-by-block algorithm (Table 14)
> **Measurement phase**: using the total $\rho$ budget, take DP noisy measurements $\tilde M_\gamma$ for each block node. **Estimation phase**: for each block, (a) a non-negative solution $\tilde x_\gamma$ from $\tilde M_\gamma$ and constraints; (b) a non-negative integer solution $\hat x_\gamma$ by controlled rounding. Higher-level estimates are aggregates of the block-level estimates. Because blocks are disjoint, the entire $\rho$ is applied to each block's measurements (e.g. $\rho=1$ for every block still totals $\rho=1$), with an appropriate sensitivity adjustment because the total record count is fixed.
^def-block-by-block

Two limitations: (1) accuracy above the block level is hard to control because aggregates are sums of independent block errors (squared error at least the sum of the block-level variances; non-negativity adds bias, especially for the sparsest block histograms), e.g. tuning national race-ethnicity totals would require extremely tight block estimates across 5,892,698 inhabited blocks; (2) constraints at higher levels cannot be enforced without also enforcing them at the block and intermediate levels (state-level invariants would force block, group, tract and county totals invariant).

## Examples

> [!example] A.1: block-by-block versus TDA-inspired variance for national total
> Setup: only attribute is total population; no invariants; negative estimates allowed; total $\rho=\tfrac12$; continuous Gaussian mechanism.
> Block-by-block: variance $\sigma^2=1$ per block ($\rho=\frac{1}{2\sigma^2}=\frac12$), 5,892,698 blocks; national total is unbiased with variance $5{,}892{,}698$.
> TDA-inspired: split $\rho=\tfrac12$ into six equal parts $\tfrac1{12}$ for US, state, county, tract, block group and block: variance $\sigma^2=\frac1{2\cdot(1/12)}=6$ per measurement at each level, so the national total (measured directly at the US level) has variance 6.
> Interpretation: the TDA-inspired approach is a "huge" MSE improvement nationally, and also better than block-by-block at every level except blocks and block groups with fewer than six blocks, even without borrowing strength across levels. The paper reports early TDA experiments on public 1940 Census data in which TDA was more accurate even at the lowest geography (enumeration district). Numbers recomputed here.
^ex-appendix-a1

```python
n_blocks = 5_892_698
rho = 0.5
var_block = 1 / (2 * rho)                 # per-block variance when each block gets full rho = 1/2
print(n_blocks * var_block)               # national variance under block-by-block: 5,892,698
var_tda = 1 / (2 * (rho / 6))             # rho split equally over six levels
print(var_tda)                            # 6.0 at every level, including the national total
```

## Connections

- Aggregating independently noised cells is the same variance-accumulation problem as aggregating many geo or segment-level estimates; see [[Geo-Experiment Methodology - Overview]] for geography-level aggregation in marketing experiments (an analogy, not a claim of the paper).
- Hierarchical structure with consistency constraints: [[Hierarchical Forecast Reconciliation (MinT)]].
- Floating-point DP implementation attacks are a distinct risk from the privacy proof; the guarantee in [[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]] assumes exact sampling.

## See Also

- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]
- [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]
