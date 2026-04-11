---
title: "Index: Research Methodology"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-04-09
concept_count: 8
---

# Research Methodology

> [!abstract] Routing Summary
> This folder covers statistical methodology, the replication crisis, causal inference challenges, and experimental design. Contains 7 notes plus an Experimental Design subfolder (3 notes).
> - Need the forking paths / p-hacking argument? -> [[Garden of Forking Paths]]
> - Need sources of analytic flexibility? -> [[Researcher Degrees of Freedom]]
> - Need Bayesian solutions to multiplicity? -> [[Forking Paths and Bayesian Approaches]]
> - Need the full case against classical multiple comparisons corrections? -> [[Multiple Comparisons - Bayesian Perspective]]
> - Need why observational ad measurement fails? -> [[Activity Bias in Advertising]]
> - Need power analysis, multiple testing, or survival? -> [[Experimental Design/_Index|Experimental Design]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Multiple comparisons without explicit p-hacking | [[Garden of Forking Paths]] | concept | [[The Experimental Ideal]], [[Research Questions in Econometrics]] | Data-contingent analysis invalidates p-values even without p-hacking |
| Sources of analytic flexibility inflating false positives | [[Researcher Degrees of Freedom]] | concept | [[Garden of Forking Paths]], [[The Experimental Ideal]], [[Omitted Variables Bias]] | Every analytic choice is a hidden comparison |
| Bayesian/hierarchical solutions to multiplicity | [[Forking Paths and Bayesian Approaches]] | concept | [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Multiple Testing Corrections]] | Hierarchical models naturally regularize multiple comparisons |
| Multilevel models as structural multiple comparisons solution | [[Multiple Comparisons - Bayesian Perspective]] | overview | [[Multiple Testing Corrections]], [[Hierarchical Models]], [[Garden of Forking Paths]] | Partial pooling replaces classical corrections; adapts to variance ratio |
| Observational methods overestimate ad effects | [[Activity Bias in Advertising]] | concept | [[Conditional Independence Assumption]], [[The Selection Problem]], [[The Experimental Ideal]], [[Omitted Variables Bias]] | Activity bias causes 10-1000x overestimation |
| Why regression and matching fail for ads | [[Observational vs Experimental Methods in Advertising]] | concept | [[Activity Bias in Advertising]], [[The Selection Problem]], [[Conditional Independence Assumption]], [[Regression and the CEF]], [[Instrumental Variables]] | No observational method recovers true ad effect |

## Sub-topics

- [[Experimental Design/_Index|Experimental Design]] — Power analysis, multiple testing corrections, survival analysis (3 notes)

## Notes
- [[Garden of Forking Paths]] — CONTAINS: Multiple comparisons as implicit forking, data-contingent analysis, why p-values are invalid when analysis is flexible
- [[Researcher Degrees of Freedom]] — CONTAINS: Sources of analytic flexibility, exclusion criteria, variable transformations, model specification choices
- [[Forking Paths and Bayesian Approaches]] — CONTAINS: Bayesian solutions to multiplicity, hierarchical regularization, partial pooling as natural correction
- [[Activity Bias in Advertising]] — CONTAINS: Three experiments showing observational methods fail, 10-1000x overestimation, selection bias in ad measurement
- [[Observational vs Experimental Methods in Advertising]] — CONTAINS: Regression controls and matching failing, case studies from Lewis/Rao/Reiley experiments
- [[Multiple Comparisons - Bayesian Perspective]] — CONTAINS: Argument against classical corrections, IHDP multi-site example, state test scores, 8 schools simulation, fishing for significance, subgroup effects, multiple outcomes

## Sources

- [[raw/p_hacking.pdf]] — "The Garden of Forking Paths" (Gelman & Loken, 2013)
- [[raw/ssrn-2080235.pdf]] — "Here, There, and Everywhere" (Lewis, Rao, & Reiley, 2011)
- [[raw/multiple2f.pdf]] — "Why we (usually) don't have to worry about multiple comparisons" (Gelman, Hill & Yajima, 2009)

## See Also

- [[Bayesian Statistics/_Index|Bayesian Statistics]] — Bayesian alternatives to p-value-based inference
- [[The Experimental Ideal]] — Why randomized experiments are the benchmark
- [[The Selection Problem]] — The fundamental challenge of causal inference
