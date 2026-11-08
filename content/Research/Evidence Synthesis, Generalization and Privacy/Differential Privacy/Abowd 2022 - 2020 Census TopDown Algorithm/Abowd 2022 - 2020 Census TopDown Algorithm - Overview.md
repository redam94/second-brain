---
title: "Abowd 2022 - 2020 Census TopDown Algorithm - Overview"
tags:
  - source/ingested
  - topic/differential-privacy
  - type/overview
  - doc/paper
source: "[[raw/Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm.pdf]]"
source_location: "Whole paper, Harvard Data Science Review special issue 2 (arXiv 2204.08986v1), pp. 1-55"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Differential Privacy/Abowd 2022 - 2020 Census TopDown Algorithm"
doc_type: paper
depends_on:
  - "[[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]]"
  - "[[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]]"
used_by:
  - "[[Abadi 2016 - Deep Learning with Differential Privacy - Overview]]"
aliases:
  - Census TopDown Algorithm overview
  - 2020 Census DAS overview
  - TDA paper overview
---

# Abowd 2022 - 2020 Census TopDown Algorithm - Overview

> [!summary]
> The U.S. Census Bureau's TopDown Algorithm (TDA) produces privacy-protected microdata for the 2020 Census Redistricting Data (P.L. 94-171) Summary File. It takes noisy **discrete-Gaussian measurements** of marginal queries at every level of the geographic hierarchy (US, state, county, tract, block group, block), accounts for privacy with **zero-concentrated DP**, and then **post-processes top-down** with non-negative weighted least squares plus controlled rounding to produce consistent, non-negative integer microdata subject to invariants. Production used a total privacy-loss budget $\rho=2.63$ ($2.56$ persons, $0.07$ housing units).

## Overview

**Problem.** Decennial census data apportion the House, allocate at least \$675 billion of federal funds each year, and redistrict every legislative body, yet respondent confidentiality is legally mandated. Traditional methods (swapping, suppression, aggregation) are vulnerable to reconstruction attacks given modern computing and abundant auxiliary data. The Bureau adopted formal privacy and had to meet hard operational requirements: microdata output (non-negative integer counts), internal consistency, invariants, edit constraints, and accuracy for use cases defined only after release (redistricting).

**What the paper does.** Describes the DP mechanisms, the optimization-based post-processing, the privacy-loss accounting, the tuning and testing history, and utility experiments on 2010 data.

**Key facts.**

| Item | Value |
|---|---|
| Privacy framework | $\rho$-zCDP, converted to $(\varepsilon,\delta)$ by the Bun-Steinke conversion at $\delta=10^{-10}$ for communication |
| Noise | multivariate discrete Gaussian (exact sampling; Canonne-Kamath-Steinke) |
| Geographic spine | US, state, county, tract, block group, block (+ AIAN spine, custom block groups) |
| Person detailed query | 2,016 cells without geography; 11,879,679,168 with geography |
| Housing-unit detailed query | 11,785,396 cells (occupancy by block) |
| Invariants | state populations; housing units per block; occupied group quarters (count and type) per block |
| Production budget | $\rho=2.63$: persons 2.56, housing units 0.07 |
| Final pre-production demo (Apr 2021) | $\rho=1.095$ ($\varepsilon=11.14$) and $\rho=0.1885$ ($\varepsilon=4.36$) |
| Utility target | largest race/ethnicity share within $\pm5$ percentage points of the enumerated share at least 95% of the time |

## Main Content

### Source Map

| Paper section | Content | Covered in |
|---|---|---|
| Abstract, 1 Introduction | scope, roadmap | this note |
| 2 Differential Privacy: what and why (2.1 definitions, Defs. 1-2, Fig. 1; 2.2 curator models) | rationale, zCDP, curator models | [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]] |
| 3 Policy and practical constraints | microdata, consistency, invariants, multi-use accuracy | [[Abowd 2022 - Policy Constraints, Invariants and the Redistricting Schema]] |
| 4 Sources of uncertainty | disclosure avoidance vs census error | [[Abowd 2022 - Policy Constraints, Invariants and the Redistricting Schema]] |
| 5 Redistricting data (5.1 schema, 5.2 invariants, 5.3 edit constraints) | tables P1-P5, H1, detailed queries | [[Abowd 2022 - Policy Constraints, Invariants and the Redistricting Schema]] |
| 6.1 Discrete Gaussian (Defs. 3-4, Theorem 1) | mechanism | [[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]] |
| 6.2 Notation; 6.3 Problem statement and utility; 6.4 Queries | contingency-table formalism, optimization problem | [[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]] |
| 6.5 The TopDown Algorithm (Table 1) | algorithm | [[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]] |
| 7.1 Basic estimators (Eqs. 7.1-7.4) | least squares and rounder | [[Abowd 2022 - Least Squares and Rounder Estimators]] |
| 7.2 Multi-pass least squares (7.5-7.6); 7.3 Multi-query multi-pass rounder (7.7) | improvements | [[Abowd 2022 - Least Squares and Rounder Estimators]] |
| 7.4 AIAN spine; 7.5 Optimized spine (Table 2); 7.6 Computing | geography and system | [[Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline]] |
| 8.1 Tuning and demonstration products (Tables 3-5); 8.2 Production settings (Tables 6-8) | budget allocation | [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]] |
| 8.3 Accuracy over time (Figures 2-5) | accuracy history | [[Abowd 2022 - Utility Experiments]] |
| 9 Utility experiments (Tables 9-13) | marginal effects | [[Abowd 2022 - Utility Experiments]] |
| 10 Conclusion | timeline, public process | [[Abowd 2022 - Conclusion, Limitations and Marketing Relevance]] |
| Appendix A Block-by-block algorithm (Table 14; A.1 comparison) | baseline | [[Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline]] |
| Appendix B TDA satisfies $(\varepsilon,\delta)$-DP (Theorem 2) | privacy proof | [[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]] |

### The idea in one picture

Measure marginals at each geographic level with independent noise. Then estimate from the top: fit the US, fix it, fit the states given the US, fix them, and so on down to blocks. Each fit is an inverse-variance-weighted least-squares problem with non-negativity, invariant and aggregation constraints, followed by a controlled rounding to integers. Post-processing costs no privacy; the total privacy loss is the sum of the $\rho$ spent across levels because every level touches the same individual.

## Examples

> [!example] Why not just measure blocks?
> Appendix A.1: with only total population, no invariants and negative estimates allowed, taking block-level Gaussian measurements with variance $\sigma^2=1$ for each of $5{,}892{,}698$ blocks at total budget $\rho=\tfrac12$ makes the national total's variance $5{,}892{,}698$, an unacceptable MSE. Splitting $\rho=\tfrac12$ into six equal levels gives variance $\sigma^2=6$ per measurement at every level, so the national total is vastly better and most other levels are better too (except blocks and block groups with fewer than six blocks).
^ex-block-vs-tda

## Connections

- DP-SGD is the machine-learning counterpart (model training) of this count-release system: [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]].
- zCDP is the linear-RDP-curve member of the Renyi family: [[Mironov 2017 - Renyi Differential Privacy - Overview]]; GDP equivalents of a zCDP budget: [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]].
- Hierarchy-consistent least squares in forecasting: [[Hierarchical Forecast Reconciliation (MinT)]].
- Marketing relevance: [[Abowd 2022 - Conclusion, Limitations and Marketing Relevance]].

## See Also

- [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]
- [[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]]
