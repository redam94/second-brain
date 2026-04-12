---
title: "Index: Research Methodology"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-04-11
concept_count: 13
---

# Research Methodology

> [!abstract] Routing Summary
> This folder covers statistical methodology, the replication crisis, causal inference challenges, experimental design, and longitudinal methods. Contains 11 notes plus an Experimental Design subfolder (3 notes).
> - Need the forking paths / p-hacking argument? -> [[Garden of Forking Paths]]
> - Need sources of analytic flexibility? -> [[Researcher Degrees of Freedom]]
> - Need Bayesian solutions to multiplicity? -> [[Forking Paths and Bayesian Approaches]]
> - Need the full case against classical multiple comparisons corrections? -> [[Multiple Comparisons - Bayesian Perspective]]
> - Need why observational ad measurement fails? -> [[Activity Bias in Advertising]]
> - Need power analysis, multiple testing, or survival? -> [[Experimental Design/_Index|Experimental Design]]
> - Need overview of within- vs between-persons distinction and causal inference? -> [[Within-Between Persons Distinction - Overview]]
> - Need when fixed-effects / within-persons designs help for causal claims? -> [[Within-Between Persons Causal Inference]]
> - Need the fixed-effects model (assumptions, DAG, limitations)? -> [[Fixed-Effects Model]]
> - Need cross-lagged panel model or dynamic panel model? -> [[Cross-Lagged and Dynamic Panel Models]]
> - Need how to define estimands in longitudinal research? -> [[Estimands in Longitudinal Research]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Multiple comparisons without explicit p-hacking | [[Garden of Forking Paths]] | concept | [[The Experimental Ideal]], [[Research Questions in Econometrics]] | Data-contingent analysis invalidates p-values even without p-hacking |
| Sources of analytic flexibility inflating false positives | [[Researcher Degrees of Freedom]] | concept | [[Garden of Forking Paths]], [[The Experimental Ideal]], [[Omitted Variables Bias]] | Every analytic choice is a hidden comparison |
| Bayesian/hierarchical solutions to multiplicity | [[Forking Paths and Bayesian Approaches]] | concept | [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Multiple Testing Corrections]] | Hierarchical models naturally regularize multiple comparisons |
| Multilevel models as structural multiple comparisons solution | [[Multiple Comparisons - Bayesian Perspective]] | overview | [[Multiple Testing Corrections]], [[Hierarchical Models]], [[Garden of Forking Paths]] | Partial pooling replaces classical corrections; adapts to variance ratio |
| Observational methods overestimate ad effects | [[Activity Bias in Advertising]] | concept | [[Conditional Independence Assumption]], [[The Selection Problem]], [[The Experimental Ideal]], [[Omitted Variables Bias]] | Activity bias causes 10-1000x overestimation |
| Why regression and matching fail for ads | [[Observational vs Experimental Methods in Advertising]] | concept | [[Activity Bias in Advertising]], [[The Selection Problem]], [[Conditional Independence Assumption]], [[Regression and the CEF]], [[Instrumental Variables]] | No observational method recovers true ad effect |
| Within/between-persons and causal inference | [[Within-Between Persons Distinction - Overview]] | overview | [[Potential Outcomes Framework]], [[The Selection Problem]] | Within/between distinction informative but not decisive; start from estimands |
| When within-persons data helps for causal inference | [[Within-Between Persons Causal Inference]] | concept | [[Potential Outcomes Framework]], [[The Selection Problem]] | Between-persons (RCT) recovers ATE; within-persons eliminates time-invariant confounders but not time-varying |
| Fixed-effects model | [[Fixed-Effects Model]] | concept | [[Directed Acyclic Graphs]], [[Within-Between Persons Causal Inference]] | Controls time-invariant confounders; assumes no lagged dynamics, no time-varying confounders |
| Cross-lagged and dynamic panel models | [[Cross-Lagged and Dynamic Panel Models]] | concept | [[Fixed-Effects Model]], [[Directed Acyclic Graphs]] | CLPM targets lagged reciprocal effects; DPM adds time-invariant confounding control; both assume no contemporaneous effects |
| Estimands in longitudinal research | [[Estimands in Longitudinal Research]] | concept | [[Potential Outcomes Framework]], [[Causal Estimands]] | Define estimand before model; psychological constructs are "fat-handed"; consistency violations common |

## Sub-topics

- [[Experimental Design/_Index|Experimental Design]] — Power analysis, multiple testing corrections, survival analysis (3 notes)

## Notes
- [[Garden of Forking Paths]] — CONTAINS: Multiple comparisons as implicit forking, data-contingent analysis, why p-values are invalid when analysis is flexible
- [[Researcher Degrees of Freedom]] — CONTAINS: Sources of analytic flexibility, exclusion criteria, variable transformations, model specification choices
- [[Forking Paths and Bayesian Approaches]] — CONTAINS: Bayesian solutions to multiplicity, hierarchical regularization, partial pooling as natural correction
- [[Activity Bias in Advertising]] — CONTAINS: Three experiments showing observational methods fail, 10-1000x overestimation, selection bias in ad measurement
- [[Observational vs Experimental Methods in Advertising]] — CONTAINS: Regression controls and matching failing, case studies from Lewis/Rao/Reiley experiments
- [[Multiple Comparisons - Bayesian Perspective]] — CONTAINS: Argument against classical corrections, IHDP multi-site example, state test scores, 8 schools simulation, fishing for significance, subgroup effects, multiple outcomes
- [[Within-Between Persons Distinction - Overview]] — CONTAINS: 3 main claims (between-persons can inform ATE; within-persons not sufficient; within-persons can be helpful), 3 longitudinal models table, central recommendation to start from estimands
- [[Within-Between Persons Causal Inference]] — CONTAINS: potential outcomes proof that between-persons RCT recovers ATE; time-varying confounders problem in FE; 3 reasons within-persons is still helpful; confounding at each level table
- [[Fixed-Effects Model]] — CONTAINS: FE causal DAG (Box 1), what FE controls/doesn't control table, 3 causal assumptions for identification, 5 limitations (lagged dynamics, time-varying confounders, heterogeneous slopes, reciprocal dynamics, consistency)
- [[Cross-Lagged and Dynamic Panel Models]] — CONTAINS: CLPM definition + Granger causality, CLPM bias from stable traits (Box 2), DPM/RI-CLPM definition (Box 3), comparison table (FE vs CLPM vs DPM), shared assumption of no contemporaneous effects, time lag misspecification
- [[Estimands in Longitudinal Research]] — CONTAINS: theoretical estimand definition, recommended 5-step workflow (estimand → assumptions → plausibility → model → interpretation), consistency challenge for psychological constructs (Box 4), fat-handed treatments, causal web problem

## Sources

- [[raw/p_hacking.pdf]] — "The Garden of Forking Paths" (Gelman & Loken, 2013)
- [[raw/ssrn-2080235.pdf]] — "Here, There, and Everywhere" (Lewis, Rao, & Reiley, 2011)
- [[raw/multiple2f.pdf]] — "Why we (usually) don't have to worry about multiple comparisons" (Gelman, Hill & Yajima, 2009)
- [[raw/rohrer-murayama-2023.pdf]] — "These Are Not the Effects You Are Looking For" (Rohrer & Murayama, 2023, AMPPS 6(1))

## See Also

- [[Research/Bayesian Statistics/_Index|Bayesian Statistics]] — Bayesian alternatives to p-value-based inference
- [[The Experimental Ideal]] — Why randomized experiments are the benchmark
- [[The Selection Problem]] — The fundamental challenge of causal inference
- [[Research/Econometrics/_Index|Econometrics]] — Panel data and identification strategies
