---
title: "Index: Abowd 2022 - 2020 Census TopDown Algorithm"
tags:
  - type/index
  - source/ingested
  - topic/differential-privacy
parent: "[[../_Index|Differential Privacy]]"
date_updated: 2026-11-08
concept_count: 10
---

# Abowd 2022 - 2020 Census TopDown Algorithm

> [!abstract] Routing Summary
> This folder fully captures Abowd et al. (2022), *The 2020 Census Disclosure Avoidance System TopDown Algorithm* (Harvard Data Science Review, special issue 2; arXiv 2204.08986): why the Census Bureau adopted differential privacy and zCDP, the policy constraints (microdata, invariants, edit constraints), the discrete Gaussian mechanism and query structure, the TopDown algorithm with its zCDP accounting proof (Theorem 2), the constrained least-squares and rounder estimators, geography spines and computing, the production budget allocations (Tables 3-8), the utility experiments (Tables 9-13) and the conclusion. It contains 10 notes covering every section, table and appendix.
> - Need the paper on one page, key facts, or the section-to-note map? -> [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]]
> - Need why DP, Defs. 1-2, zCDP vs $(\varepsilon,\delta)$, trusted vs untrusted curator, or $\rho\to\varepsilon$? -> [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]]
> - Need microdata/consistency requirements, invariants, edit constraints, the redistricting schema, or sources of census uncertainty? -> [[Abowd 2022 - Policy Constraints, Invariants and the Redistricting Schema]]
> - Need the discrete Gaussian, Theorem 1, the contingency-table notation, the optimization problem, or query groups? -> [[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]]
> - Need the TopDown algorithm (Table 1), $\sigma^2=\psi^2/(c\,d)$, or Theorem 2 with its proof? -> [[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]]
> - Need the weighted least squares, rounder, multi-pass estimators (Eqs. 7.1-7.7), or total unimodularity? -> [[Abowd 2022 - Least Squares and Rounder Estimators]]
> - Need the AIAN spine, custom block groups, Table 2, the computing environment, or the block-by-block baseline (Appendix A)? -> [[Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline]]
> - Need how the privacy-loss budget was set and allocated (Tables 3-8, tuning procedure)? -> [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]]
> - Need accuracy results, Tables 9-13, bias by population size, or comparisons with coverage-error simulations? -> [[Abowd 2022 - Utility Experiments]]
> - Need the release timeline, limitations, or marketing-measurement lessons? -> [[Abowd 2022 - Conclusion, Limitations and Marketing Relevance]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Approximate DP; zCDP | [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]] | definition | none | $D_\alpha\le\rho\alpha$; $\varepsilon=\rho+2\sqrt{\rho\log(1/\delta)}$ |
| Trusted vs untrusted curator | [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]] | concept | DP | central DP is more efficient |
| Invariants; edit constraints; structural zeros | [[Abowd 2022 - Policy Constraints, Invariants and the Redistricting Schema]] | definition | schema | invariants = infinite privacy loss for those counts |
| Redistricting detailed query | [[Abowd 2022 - Policy Constraints, Invariants and the Redistricting Schema]] | definition | schema | 2,016 cells; 11,879,679,168 with blocks |
| Discrete Gaussian mechanism (Thm 1) | [[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]] | theorem | zCDP | $\rho$-zCDP if rescaled $L_2$ sens $\le\sqrt{2\rho}$ |
| Marginal query group | [[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]] | definition | binary exhaustive queries | $L_2$ sensitivity $\le\sqrt2$ |
| TDA optimization problem | [[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]] | definition | queries, constraints | minimize $\sum\rho_i$ s.t. accuracy targets |
| TopDown Algorithm | [[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]] | concept | queries, estimators | measure then estimate top-down |
| Theorem 2 (TDA is zCDP) | [[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]] | theorem | Thm 1 | $\rho=1/\psi^2$ with $\sigma^2=\psi^2/(cd)$ |
| Weighted non-negative least squares; multi-pass | [[Abowd 2022 - Least Squares and Rounder Estimators]] | concept | measurements | inverse-variance weights best |
| Controlled rounder; TUM | [[Abowd 2022 - Least Squares and Rounder Estimators]] | concept | least squares | tractable under total unimodularity |
| AIAN spine; optimized spine; custom block groups | [[Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline]] | concept | geography | shorter off-spine distance |
| Block-by-block algorithm | [[Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline]] | example | none | national variance 5,892,698 vs 6 |
| $\rho$ allocation tables | [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]] | example | TDA | production $\rho=2.63$ |
| Level-by-level tuning | [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]] | concept | $\pm5$pp criterion | initial $\rho=1.095$ |
| Four-run experiments | [[Abowd 2022 - Utility Experiments]] | example | production settings | +10% $\rho$ gives about 3% less error |
| Timeline and limitations | [[Abowd 2022 - Conclusion, Limitations and Marketing Relevance]] | concept | all | released 2021-08-12 |

## Notes

- [[Abowd 2022 - 2020 Census TopDown Algorithm - Overview]] — CONTAINS: problem, key facts table, full Source Map including appendices, picture of the algorithm, block-vs-TDA example.
- [[Abowd 2022 - Why Differential Privacy, zCDP and Curator Models]] — CONTAINS: vulnerabilities of traditional methods, three DP properties, Defs. 1-2, bounded neighbors, why zCDP, $\rho$ curve, curator models, $\rho\to\varepsilon$ examples with Python.
- [[Abowd 2022 - Policy Constraints, Invariants and the Redistricting Schema]] — CONTAINS: microdata and consistency requirements, bias consequences, invariants (full list), edit constraints, uncertainty sources, schema, detailed query, cell-count example.
- [[Abowd 2022 - Discrete Gaussian, Queries and the Optimization Problem]] — CONTAINS: Defs. 3-4, Theorem 1, notation, constraints, problem statement, utility criterion, query groups, $\sigma^2$ examples, Python.
- [[Abowd 2022 - The TopDown Algorithm and Privacy Accounting Proof]] — CONTAINS: Table 1, measurement/estimation phases, $c_{ij},d_{ijk},\psi$, Theorem 2 with proof, budget bookkeeping, Python.
- [[Abowd 2022 - Least Squares and Rounder Estimators]] — CONTAINS: Eqs. 7.1-7.7, bias and non-monotonicity problems, multi-pass fixes, TUM, toy two-child example with Python.
- [[Abowd 2022 - Geography Spines, Computing Environment and Block-by-Block Baseline]] — CONTAINS: AIAN spine, optimized spine, Table 2, computing stack, randomness and exact sampling, Appendix A with the 5,892,698 vs 6 example.
- [[Abowd 2022 - Privacy-Loss Budget Allocation and Tuning]] — CONTAINS: release history, tuning procedure, Tables 3-8 reproduced, normalization check, tract-variance example.
- [[Abowd 2022 - Utility Experiments]] — CONTAINS: accuracy over time, experiment design, Tables 9-13, comparison with coverage-error simulations, $\rho$-increase calculation.
- [[Abowd 2022 - Conclusion, Limitations and Marketing Relevance]] — CONTAINS: timeline, seven limitations, eight marketing-measurement mappings, level-dilution example.

## Sources
- Abowd 2022 - 2020 Census Disclosure Avoidance TopDown Algorithm — Abowd JM et al. (2022), Harvard Data Science Review special issue 2, arXiv 2204.08986v1, 55 pages; the sole source for all notes.

## See Also
- [[Mironov 2017 - Renyi Differential Privacy - Overview]] — Renyi family containing zCDP.
- [[Dong Roth Su 2022 - Gaussian Differential Privacy - Overview]] — f-DP view of the Gaussian mechanism.
- [[Abadi 2016 - Deep Learning with Differential Privacy - Overview]] — DP for model training.
- [[Hierarchical Forecast Reconciliation (MinT)]], [[Hierarchical Models]] — hierarchical estimation context.
