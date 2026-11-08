---
title: "Index: Greenacre 2023 - Aitchison CoDA 40 Years On"
tags:
  - type/index
  - source/ingested
  - topic/distributional-regression
parent: "[[../_Index|Distributional and Constrained Outcomes]]"
date_updated: 2026-11-08
concept_count: 5
---

# Greenacre 2023 - Aitchison CoDA 40 Years On

> [!abstract] Routing Summary
> Captures Greenacre, Grunsky, Bacon-Shone, Erb and Quinn (2023), *Aitchison's Compositional Data Analysis 40 Years On: A Reappraisal* (Statistical Science): simplex, closure, coherence, ALR/CLR/ILR, log-contrasts, the Tellus geochemistry example, correspondence analysis, wide data, zeros and quasi-coherence. 5 notes plus overview. Motivating PyMC example: E70.
> - Need the one-page summary and source map? -> [[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]]
> - Need closure, the simplex, coherence, dominance, distributional equivalence? -> [[Greenacre 2023 - Simplex, Closure and Core CoDA Properties]]
> - Need ALR / CLR / ILR / log-contrast definitions and the variation matrix? -> [[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]]
> - Need the Tellus numbers, ALR reference selection, CA with Box-Cox power? -> [[Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis]]
> - Need wide data, zeros, SLR amalgamation, incoherence measures? -> [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]]
> - Need PyMC logistic-normal / Dirichlet / Dirichlet-multinomial? -> [[Greenacre 2023 - Compositional Outcome Models in PyMC]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Simplex, closure, scale invariance | [[Greenacre 2023 - Simplex, Closure and Core CoDA Properties]] | definition | - | only ratios matter; $d=D-1$ |
| Subcompositional coherence | [[Greenacre 2023 - Simplex, Closure and Core CoDA Properties]] | definition | closure | La-Y correlation 0.479 vs -0.344 |
| LR, ALR, CLR, ILR | [[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]] | definition | coherence | CLR isometric; ALR coherent |
| Variation matrix | [[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]] | theorem | LR | covariances from $\tau_{jk}$ |
| FINDALR reference choice | [[Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis]] | example | ALR | Al: Procrustes 0.990 |
| CA and Box-Cox power | [[Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis]] | concept | CLR | optimal power 0.5 |
| Incoherence / anisometry | [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]] | definition | subcompositions | stress, Procrustes |
| Summed logratio | [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]] | definition | amalgamation | zero-friendly |
| Compositional likelihoods | [[Greenacre 2023 - Compositional Outcome Models in PyMC]] | concept | ALR | logistic-normal, Dirichlet, DM |

## Notes

- [[Greenacre 2023 - Aitchison CoDA 40 Years On - Overview]] — CONTAINS: question, thesis, motivating example E70, source map.
- [[Greenacre 2023 - Simplex, Closure and Core CoDA Properties]] — CONTAINS: Def. simplex, scale invariance, coherence, dominance, distributional equivalence; correlation paradox; Tellus zeros.
- [[Greenacre 2023 - Logratios ALR CLR ILR and Log-Contrasts]] — CONTAINS: Defs. LR, ALR, CLR, log-contrast, ILR; variation matrix theorem; comparison table; numpy.
- [[Greenacre 2023 - Tellus Application, Variable Selection and Correspondence Analysis]] — CONTAINS: data description; weighting; FINDALR; CA/Box-Cox; quasi-coherence; LR selection table.
- [[Greenacre 2023 - Wide Data, Zeros and Quasi-Coherence]] — CONTAINS: genomics, incoherence measures, SLR, zero discussion, conclusion.
- [[Greenacre 2023 - Compositional Outcome Models in PyMC]] — CONTAINS: logistic-normal with LKJ, Dirichlet, DM sketches; Jacobian for LOO.

## Sources

- Greenacre 2023 - Aitchison's Compositional Data Analysis 40 Years On — Greenacre M, Grunsky E, Bacon-Shone J, Erb I, Quinn T (2023), Statistical Science; arXiv:2201.05197v3 (30 pp.).

## See Also

- [[Tsagris 2018 - Dirichlet Regression with Zeros - Overview]], [[Generalized Linear Models]], [[Hierarchical Models]]
