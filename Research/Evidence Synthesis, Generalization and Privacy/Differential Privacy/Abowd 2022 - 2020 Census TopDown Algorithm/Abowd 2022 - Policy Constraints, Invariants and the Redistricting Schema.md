---
title: "Abowd 2022 - Policy Constraints, Invariants and the Redistricting Schema"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/concept
  - doc/paper
source: "[[raw/Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm.pdf]]"
source_location: "Sec. 3 (policy and practical constraints), Sec. 4 (sources of uncertainty), Sec. 5 (redistricting data, schema, invariants, edit constraints), pp. 7-15"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm"
doc_type: paper
depends_on:
  - "[[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]]"
used_by:
  - "[[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]]"
  - "[[Abowd 2022 - Least Squares and Rounder Estimators]]"
aliases:
  - census invariants and edit constraints
  - census redistricting schema
  - microdata requirement census DP
---

# Abowd 2022 - Policy Constraints, Invariants and the Redistricting Schema

> [!summary]
> Production DP for the census had to output **non-negative integer microdata** that tabulates consistently, honor **invariants** (state populations; housing units and occupied group quarters per block) that bypass the DP mechanism, respect **edit constraints and structural zeros**, and serve competing use cases (redistricting vs population estimates). These requirements, not the DP noise, are what make post-processing the hardest part and induce bias. The redistricting schema defines 2,016 person cells per geography and 5,892,698 blocks.

## Overview

Section 3 lists constraints that shaped the design; Section 4 situates disclosure-avoidance uncertainty among other sources of census error; Section 5 defines the redistricting data product (schema, invariants, edit constraints).

## Main Content

### Section 3: policy and practical constraints

- **Microdata requirement.** The tabulation system takes person or housing-unit records, so TDA must output a record-level image whose tabulation gives the protected answers. This forces the output to be **non-negative and integral** (no negative or fractional persons). Systems that change zero counts to non-zero and enforce non-negativity (suppression, swapping) have systematic bias. Two ways to meet it: have the DP mechanism output conforming data directly (e.g. the exponential mechanism of McSherry-Talwar, infeasible here because it needs to enumerate outputs that satisfy microdata, invariant, edit and structural-zero requirements, and the requirements changed several times), or **post-process** noisy measurements using preexisting operations-research machinery (total unimodularity). TDA does the latter.
- **Consequences of non-negativity.** If a confidential count is 0 and the output must be $\ge0$, the estimator is positively biased (true for post-processing and the exponential mechanism; the noisy measurements themselves from the discrete Gaussian are unbiased). Tabulation from microdata makes the errors data-dependent. Controlling algorithmic bias and data-dependent error, properties due to post-processing and not to the DP mechanism, is "the hardest implementation challenge for TDA". Inference methods that use the noisy measurements directly (posterior sampling; Seeman et al.) showed promise but are computationally limited at census scale.
- **Internal consistency.** A count is identical across tables and equals sums/differences of other tables; a natural consequence of tabulating all statistics from one record-level dataset with constant non-negative weights (all unity).
- **Invariants, edit constraints and structural zeros.** *Invariants* are counts that bypass the DP mechanism and are reported exactly. *Edit constraints / structural zeros* are rules fixed by subject-matter experts and applied when creating the Census Edited File (CEF), e.g. a mother must be at least some number of years older than her oldest natural child. The privacy loss associated with invariants is not quantifiable in the standard DP literature; the paper's accounting **ignores any contributions from the invariants**, and defers the privacy semantics with invariants to separate work.
- **Multidimensional utility.** Apportionment is the most important use, but census data feed hundreds of applications. The design allocates "a scarce resource (the finite information content of the confidential data)" between competing accuracy measures and respondent privacy loss. *Redistricting* needs accuracy for geographies not yet defined at disclosure-avoidance time, on 252 categories (voting age by race by ethnicity), improved primarily by allocating privacy loss to the lowest geographic levels (block groups, blocks) and most detailed race/ethnicity summaries. *Population estimates* need annual populations for about 85,000 geographic areas and about 2,000 statistics (sex by single-year age by major race/ethnicity) in counties and municipios, improved by allocating to aggregated geographies (counties, tracts) and favoring age detail over race/ethnicity detail.

### Section 4: sources of uncertainty

Disclosure-avoidance noise is not the only uncertainty. Historical methods (suppression, blank-and-replace, swapping, partial synthesis) also create uncertainty, but the Bureau did not quantify it; swapping parameters are secret, whereas for DP the mechanism's randomness parameters are public and quantifiable: TDA is "inference-valid" (its uncertainty can be quantified and used to guide inference, though this can be non-trivial). Census taking itself is random: post-enumeration surveys show under- and over-coverage, items are missing or erroneous, and the CEF is a completed-data set from single-imputation missing-data models (Rubin 1974, 1976). The CEF is the accuracy benchmark for DAS output; for context the paper compares to small-scale simulations of operational, measurement and coverage errors for the 2010 Census (Bell and Schafer, 2022).

### Section 5: redistricting data (P.L. 94-171) summary file

**Tabulation geographic hierarchy.** The primitive unit is the census **block**. The "spine" is US, states (including DC), counties, tracts, block groups, blocks (Puerto Rico: PR, municipios, tracts, block groups, blocks); each lower entity nests in exactly one higher entity. Other geographies (Congressional districts, ZIP Code tabulation areas, places) are *off-spine*.

**Schema (5.1).** Tables: P1 Race; P2 Hispanic or Latino by race; P3 race for 18+; P4 Hispanic or Latino by race for 18+; P5 group quarters (GQ) population by major GQ type; H1 occupancy status, each down to the block level.

> [!definition] Detailed query for persons
> The attributes with mutually exclusive levels: (1) Block, 5,892,698 levels (2020 blocks with at least one housing unit or occupied GQ); (2) household or GQ type, 8 levels; (3) voting age, 2 levels; (4) Hispanic/Latino origin, 2 levels; (5) census race, 63 levels ($2^6-1$: every non-empty combination of six race categories). Excluding block: $8\times2\times2\times63=2{,}016$ cells; including block: $11{,}879{,}679{,}168$ cells.
> Housing units: block (5,892,698) times occupancy status (occupied/vacant, 2 levels) $=11{,}785{,}396$ cells.
^def-census-detailed-query

**Invariants (5.2).** Mathematically an invariant is equivalent to designating infinite privacy loss for the tabulation. Invariants challenge the implementation because they can force post-processing to solve computationally infeasible problems, so policymakers specified them only for a Constitutional mandate or an operational constraint. *Constitutional*: apportionment from the "actual Enumeration" requires only that House seat allocation be invariant, but DSEP set the populations of the 50 states, DC and Puerto Rico invariant as the most transparent and practical approach (aggregation is the only disclosure avoidance applied to state populations). *Operational*: the Master Address File (MAF) is maintained via the Local Update of Census Addresses (LUCA) program, which publishes counts of housing units and GQ types per block, and GQ facilities are updated with public information on prisons, nursing homes, dormitories and barracks. So the Bureau treats the count of addresses on a block, their designation as housing units or GQ, and the GQ type as public information.

> [!definition] Complete list of invariants in TDA
> (1) Total population for each state, DC and Puerto Rico; (2) the count of housing units in each block, but not the population living in them; (3) the count and type of occupied group quarters in each block, but not the population living in them.
^def-census-invariants

A prison or other GQ is labelled correctly in tabulations if labelled correctly in the confidential data, but the number and characteristics of its residents are protected. Vacant housing units are enumerated; vacant GQ are not, hence TDA treats housing units and *occupied* GQ as invariant.

**Edit constraints and structural zeros (5.3).** They define the *sample space* of the census a priori (before data collection); invariants are statistics collected in the data that bypass confidentiality protection by policy. The two are mathematically indistinguishable in the constraint set but conceptually distinct: edit constraints are public design features; invariants are collected information. Complete edit specs are not public; the redistricting TDA contains only a few, the most important: (1) for race, "none of the above" is a structural zero ($2^6-1$ allowable combinations); (2) there are no unoccupied group quarters (they are removed from the MAF universe used in the CEF). Interaction: if an occupied GQ facility of a type exists in a geography, at least one person must be assigned to it in post-processing; for housing units there is no such lower bound (occupancy is not invariant), but the number of householders cannot exceed the number of housing units. Otherwise TDA treats person and housing-unit data separately, so occupancy status is protected without reference to person data. Joining housing-unit and person data makes the query sensitivity (household composition) equal to the maximum household size, not one; such join queries will be handled in the Detailed-DHC release by mechanisms that do not post-process to microdata. Consequently dividing P1 household population by H1 occupied units is reliable for populous geographies but not for sparsely populated ones.

## Examples

> [!example] Counting the sample space
> Setup: persons per block cross 8 household/GQ types, 2 voting-age levels, 2 Hispanic levels and 63 race combinations.
> Solution: $8\cdot2\cdot2\cdot63=2016$ cells per block; times 5,892,698 blocks $=11{,}879{,}679{,}168$ (matches the paper's $c$). Race alone: 63 combinations because $2^6-1=63$ (the "none of the above" structural zero removes one of $2^6=64$).
> Interpretation: the contingency table is enormous but extremely sparse at the block level, which is why non-negativity bias bites hardest on blocks (Section 9).
^ex-census-cells

```python
print(8 * 2 * 2 * 63, 8 * 2 * 2 * 63 * 5_892_698, 2 * 5_892_698)   # 2016  11879679168  11785396
print(2**6 - 1)                                                      # 63 race combinations
```

## Connections

- The microdata/consistency requirement is why the paper uses post-processing optimization: [[Abowd 2022 - Least Squares and Rounder Estimators]].
- Invariants as infinite privacy loss: compare the $\delta\to1$ extreme and "complete breach" discussion in [[Mironov 2017 - Renyi Divergence and the RDP Definition]].
- Measurement-design analogy: hierarchical aggregates with consistency constraints, see [[Hierarchical Forecast Reconciliation (MinT)]].

## See Also

- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]
- [[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]]
