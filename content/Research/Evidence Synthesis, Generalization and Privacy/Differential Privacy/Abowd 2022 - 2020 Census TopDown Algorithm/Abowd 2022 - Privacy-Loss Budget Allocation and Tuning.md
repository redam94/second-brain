---
title: "Abowd 2022 - Privacy-Loss Budget Allocation and Tuning"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/example
  - doc/paper
source: "[[raw/Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm.pdf]]"
source_location: "Sec. 8.1-8.2 (Tables 3-8), pp. 29-34"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm"
doc_type: paper
depends_on:
  - "[[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]]"
  - "[[Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline]]"
used_by:
  - "[[Abowd 2022 - Utility Experiments]]"
aliases:
  - census rho allocation tables
  - TDA production settings rho 2.63
  - census budget tuning procedure
---

# Abowd 2022 - Privacy-Loss Budget Allocation and Tuning

> [!summary]
> TDA was tuned on 2010 data (never on the 2020 data it protects) through demonstration data products. The final pre-production release used $\rho=1.095$ ($1.05$ persons, $0.045$ housing units); production used $\rho=2.63$ ($2.56$ persons, $0.07$ housing units). Production shifted person budget away from blocks (519/1024 down to 165/4099) onto custom block groups and tracts, enabled by spine optimization. Budgets were found by level-by-level binary search against the $\pm5$-percentage-point redistricting criterion.

## Overview

Section 8 explains how the global budget and its allocation across levels and queries were set (iteratively, because post-processing errors are data-dependent and have no closed form), and records the numerical allocations for the April 2021 demonstration data and the production run.

## Main Content

### Why tune on 2010 data

It is not possible to tune a formally private system by directly using the confidential data it protects: the tuning parameters (budget allocations, query strategies) would leak information. So TDA was not tuned on the 2020 Census Edited File. Starting October 2019 the Bureau released demonstration data products from 2010 data (privacy-protected microdata files, PPMF, produced from the Microdata Detail File, MDF), each representing the then-current DAS. Quality assurance of the 2020 MDF is "a difficult conceptual task"; it received human review for unusual or unacceptable errors compared to the CEF, which does not strictly adhere to the tenets of formal privacy (no such errors were flagged for production), highlighting the need for formally private QA.

### Demonstration product history

> [!definition] Releases and budgets
> | Release | Mechanism | Global budget |
> |---|---|---|
> | October 2019, May 2020 | discrete geometric, pure DP ($\delta=0$) | $\varepsilon=6$ ($\varepsilon$-allocation: 4 persons, 2 housing units) |
> | September 2020, November 2020 | discrete Gaussian, zCDP | $\rho=0.1885$ |
> | April 2021 (final pre-production) | discrete Gaussian, zCDP | $\rho=1.095$ (1.05 persons, 0.045 housing units; $\varepsilon=11.14$) and $\rho=0.1885$ (0.185 persons, 0.0035 housing units; $\varepsilon=4.36$) |
> | Production (June 2021) | discrete Gaussian, zCDP | $\rho=2.63$ (2.56 persons, 0.07 housing units) |
>
> When $\rho$ is re-expressed as $\varepsilon$ the conversion is evaluated at $\delta=10^{-10}$; a more accurate zCDP conversion sums person and housing-unit $\rho$ first, then converts.
^def-release-history

### The tuning procedure (April 2021)

Experiments from December 2020 to early April 2021 estimated the minimum global budget, and its allocation to queries, needed for fitness-for-use in redistricting (Wright and Irimata 2021). Criterion: for at least 95% of geographic units, the largest of the selected CENRACE x HISPANIC populations (the major groups in OMB Statistical Policy Directive 15) as a percentage of total population must not change by more than $\pm5$ percentage points relative to its enumerated percentage. Because of the cost of many independent runs, geographic variability was used to evaluate the 95% criterion (run-to-run consistency was observed to be high).

TDA's error distributions are data-dependent in a way that cannot be written in closed form and depends on confidential values, so fitting was iterative rather than via ex ante zCDP properties. Six candidate query strategies were built from two dimensions: (a) measurements closely following the publication specification for redistricting data versus collapsing/excluding marginals to exploit dependence among queries; (b) per-query budgets set (i) proportional to the square of query cardinality, (ii) inversely proportional to it, or (iii) uniform. Passes were ordered heuristically with large-budget queries isolated in their own passes; strategies with almost all budget on DETAILED (proportional to squared cardinality) optimized all queries in one pass. Inverse-square strategies were quickly ruled out as noncompetitive. For the other four, the search went level by level from the top:

1. By binary search, for each level find the approximate $\rho$ on that level's queries that satisfies the criterion with **all other levels at infinite budget**.
2. Set US and state to their single-level fitted $\rho$, others infinite; scale US and state up proportionally until the criterion holds.
3. Fix the county budget at its single-level fit, and scale US, state and county up together until the criterion holds.
4. Continue down the hierarchy until every level has a $\rho$.

This led to the initial identification of total $\rho=1.095$. Because the criterion involves off-spine entities, every experimental run processed data down to the block level, which is why tuning took several months. The April 2021 product used the L2 and L1 multi-pass components: the US level used one pass for both phases with all queries in Table 4; state, county, tract and block group levels used two passes each (first pass: the TOTAL query as both the noisy estimate and constraint; second: the remaining queries); the block level used one pass with all queries.

### Table 3: per-level $\rho$ proportions, April 2021

| Geographic level | Persons | Housing units |
|---|---|---|
| US | 51/1024 | 1/1024 |
| State | 153/1024 | 1/1024 |
| County | 78/1024 | 18/1024 |
| Tract | 51/1024 | 75/1024 |
| Custom block group | 172/1024 | 906/1024 |
| Block | 519/1024 | 23/1024 |

For persons, block-level queries received about half the budget; for housing units, block-group queries received the predominant share (906/1024).

### Table 4: per-query $\rho$ proportions within level, persons, April 2021

| Query (cells) | US | State | County | Tract | CBG | Block |
|---|---|---|---|---|---|---|
| TOTAL (1) | n/a | 678/1024 (*) | 342/1024 | 1/1024 | 572/1024 | 1/1024 |
| CENRACE (63) | 2/1024 | 1/1024 | 1/1024 | 2/1024 | 1/1024 | 2/1024 |
| HISPANIC (2) | 1/1024 | 1/1024 | 1/1024 | 1/1024 | 1/1024 | 1/1024 |
| VOTINGAGE (2) | 1/1024 | 1/1024 | 1/1024 | 1/1024 | 1/1024 | 1/1024 |
| HHINSTLEVELS (3) | 1/1024 | 1/1024 | 1/1024 | 1/1024 | 1/1024 | 1/1024 |
| HHGQ (8) | 1/1024 | 1/1024 | 1/1024 | 1/1024 | 1/1024 | 1/1024 |
| HISPANICxCENRACE (126) | 5/1024 | 2/1024 | 3/1024 | 5/1024 | 3/1024 | 5/1024 |
| VOTINGAGExCENRACE (126) | 5/1024 | 2/1024 | 3/1024 | 5/1024 | 3/1024 | 5/1024 |
| VOTINGAGExHISPANIC (4) | 1/1024 | 1/1024 | 1/1024 | 1/1024 | 1/1024 | 1/1024 |
| VOTINGAGExHISPANICxCENRACE (252) | 17/1024 | 6/1024 | 11/1024 | 17/1024 | 8/1024 | 17/1024 |
| HHGQxVOTINGAGExHISPANICxCENRACE = DETAILED (2,016) | 990/1024 | 330/1024 | 659/1024 | 989/1024 | 432/1024 | 989/1024 |

(*) The TOTAL query is held invariant at the state level; the allocation shown there is for the total population of all AIAN tribal areas in the state and of the remainder of the state (36 states with AIAN areas); the US-level TOTAL cell is blank. Table 5 (housing units): Occupancy Status (2 cells) has proportion 1 at every level. The TOTAL query for counties represents $\frac{342}{1024}\times\frac{78}{1024}\approx2.5\%$ of the person budget.

### Production settings (8.2)

Total $\rho=2.63$: $\rho=2.56$ persons, $\rho=0.07$ housing units, "considerable increases from the larger of the April 2021 settings". The key change for persons was a **shift of allocation away from the block level onto custom block group and tract level**, which allowed location-confidentiality protection (controlled mainly by the block allocation) to improve while meeting even tighter accuracy targets for HISPANIC x CENRACE at tract and block-group level. This relied on the efficiency gain from spine optimization. Estimation strategy and pass orderings were the same as April 2021.

### Table 6: per-level $\rho$ proportions, production

| Geographic level | Persons | Housing units |
|---|---|---|
| US | 104/4099 | 1/205 |
| State | 1440/4099 | 1/205 |
| County | 447/4099 | 7/82 |
| Tract | 687/4099 | 364/1025 |
| Custom block group | 1256/4099 | 1759/4100 |
| Block | 165/4099 | 99/820 |

### Table 7: per-query $\rho$ proportions within level, persons, production

| Query (cells) | US | State | County | Tract | CBG | Block |
|---|---|---|---|---|---|---|
| TOTAL (1) | n/a | 3773/4097 | 3126/4097 | 1567/4102 | 1705/4099 | 5/4097 |
| CENRACE (63) | 52/4097 | 6/4097 | 10/4097 | 4/2051 | 3/4099 | 9/4097 |
| HISPANIC (2) | 26/4097 | 6/4097 | 10/4097 | 5/4102 | 3/4099 | 5/4097 |
| VOTINGAGE (2) | 26/4097 | 6/4097 | 10/4097 | 5/4102 | 3/4099 | 5/4097 |
| HHINSTLEVELS (3) | 26/4097 | 6/4097 | 10/4097 | 5/4102 | 3/4099 | 5/4097 |
| HHGQ (8) | 26/4097 | 6/4097 | 10/4097 | 5/4102 | 3/4099 | 5/4097 |
| HISPANICxCENRACE (126) | 130/4097 | 12/4097 | 28/4097 | 1933/4102 | 1055/4099 | 21/4097 |
| VOTINGAGExCENRACE (126) | 130/4097 | 12/4097 | 28/4097 | 10/2051 | 9/4099 | 21/4097 |
| VOTINGAGExHISPANIC (4) | 26/4097 | 6/4097 | 10/4097 | 5/4102 | 3/4099 | 5/4097 |
| VOTINGAGExHISPANICxCENRACE (252) | 26/241 | 2/241 | 101/4097 | 67/4102 | 24/4099 | 71/4097 |
| DETAILED (2,016) | 189/241 | 230/4097 | 754/4097 | 241/2051 | 1288/4099 | 3945/4097 |

Table 8 (housing units): Occupancy Status (2 cells) has proportion 1 at every level. Normalization check (this note): the printed within-level proportions are only approximately normalized. In Table 7 the US column sums to exactly 1 while the other columns sum to between 0.9976 and 0.9993; in Table 4 the US column sums to 1024/1024 and the other columns to 1023/1024 as printed, consistent with rounding of the published fractions. The per-level proportions in Tables 3 and 6 sum to exactly 1 for both persons and housing units.

## Examples

> [!example] From shares to a concrete $\rho$ and $\sigma^2$
> Setup: production persons, tract-level HISPANICxCENRACE (126 cells), group share $\frac{687}{4099}$ and within-level share $\frac{1933}{4102}$, persons budget 2.56.
> Solution: $\rho_g=2.56\times0.1676\times0.4712=0.2022$, so $\sigma^2=1/\rho_g\approx4.95$ per cell (noise standard deviation about 2.2 people).
> Compare April 2021 tract HISPANICxCENRACE: $1.05\times\frac{51}{1024}\times\frac5{1024}=2.55\times10^{-4}$, i.e. $\sigma^2\approx3{,}900$.
> Interpretation: the production shift of budget to HISPANICxCENRACE at the tract level cuts per-cell variance roughly 800-fold, paid for by the higher total budget and the drop in block-level share. Recomputed by this note.
^ex-tract-variance

```python
person_apr = dict(zip("US state county tract CBG block".split(), [51,153,78,51,172,519]))
print(sum(person_apr.values()))   # 1024

# production tract HISPANICxCENRACE
rho_g = 2.56 * (687/4099) * (1933/4102)
print(rho_g, 1/rho_g, (1/rho_g) ** 0.5)       # ~0.2022, ~4.95, ~2.2
# April 2021 tract HISPANICxCENRACE
rho_a = 1.05 * (51/1024) * (5/1024)
print(rho_a, 1/rho_a)                          # ~2.55e-4, ~3.9e3
```

## Connections

- Budget search procedure vs privacy cost of hyperparameter tuning: [[Abadi 2016 - Hyperparameter Tuning and Privacy Cost of Search]].
- $\rho\to(\varepsilon,\delta)$ and GDP equivalents: [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]] and [[Dong Roth Su 2022 - Gaussian Differential Privacy Definition and Gaussian Mechanism]].
- Allocating a scarce measurement budget across levels to meet accuracy targets is a design problem akin to allocating spend across geographies: [[Geo-Experiment Design and Power Analysis]].

## See Also

- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]
- [[Abowd 2022 - Utility Experiments]]
