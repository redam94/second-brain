---
title: "Index: Research Methodology"
tags:
  - type/index
  - source/ingested
parent: "[[Research/_Index|Research]]"
date_updated: 2026-09-18
concept_count: 32
---

# Research Methodology

> [!abstract] Routing Summary
> This folder covers statistical methodology, the replication crisis, causal inference challenges, experimental design, and longitudinal methods. Contains 14 notes plus an Experimental Design subfolder (8 notes, including a Delayed and Censored Feedback sub-subfolder) and a Pre-registration and Open Science subfolder (5 notes).
> - Need the forking paths / p-hacking argument? -> [[Garden of Forking Paths]]
> - Need sources of analytic flexibility? -> [[Researcher Degrees of Freedom]]
> - Need Bayesian solutions to multiplicity? -> [[Forking Paths and Bayesian Approaches]]
> - Need how to pre-register, registered reports, pre-analysis plans, or the OSF/AEA ecosystem? -> [[Research/Research Methodology/Pre-registration and Open Science/_Index|Pre-registration and Open Science]]
> - Need the full case against classical multiple comparisons corrections? -> [[Multiple Comparisons - Bayesian Perspective]]
> - Need why observational ad measurement fails? -> [[Activity Bias in Advertising]]
> - Need power analysis, multiple testing, survival, or delayed/censored feedback? -> [[Experimental Design/_Index|Experimental Design]]
> - Need **online experimentation** (CUPED, sequential / always-valid inference, SRM, interference, switchbacks)? -> [[Research/Research Methodology/Experimental Design/Online Experimentation/_Index|Online Experimentation]]
> - Need overview of within- vs between-persons distinction and causal inference? -> [[Within-Between Persons Distinction - Overview]]
> - Need when fixed-effects / within-persons designs help for causal claims? -> [[Within-Between Persons Causal Inference]]
> - Need the fixed-effects model (assumptions, DAG, limitations)? -> [[Fixed-Effects Model]]
> - Need cross-lagged panel model or dynamic panel model? -> [[Cross-Lagged and Dynamic Panel Models]]
> - Need how to define estimands in longitudinal research? -> [[Estimands in Longitudinal Research]]
> - Need the Table 2 Fallacy (misinterpreting nuisance parameter coefficients as causal)? -> [[Table 2 Fallacy]]
> - Need the logic of what regression adjustment actually identifies (vs. does not identify)? -> [[Logic of Regression Adjustment]]
> - Need the simulation proof that confounder coefficients are almost never recoverable? -> [[Nuisance Parameter Bias Simulation]]

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
| Table 2 Fallacy | [[Table 2 Fallacy]] | concept | [[DAGs and Causal Identification]], [[Potential Outcomes Framework]] | Adjustment set identifies one causal path only; confounder coefficients are almost always biased |
| Logic of regression adjustment | [[Logic of Regression Adjustment]] | concept | [[Potential Outcomes Framework]], [[DAGs and Causal Identification]] | Regression adjustment recovers PATE for treatment only; adjustment set is a sacrifice, not a co-effect estimator |
| Nuisance parameter bias (simulation) | [[Nuisance Parameter Bias Simulation]] | example | [[Table 2 Fallacy]], [[Logic of Regression Adjustment]] | 90% CI coverage 0–29% for confounders; bias does not shrink as $n \to \infty$ |

## Sub-topics

- [[Experimental Design/_Index|Experimental Design]] — Power analysis, multiple testing corrections, survival analysis, plus a Delayed and Censored Feedback sub-subfolder on conversion-delay modeling and delayed/censored bandit rewards (4 notes + 4-note sub-subfolder)
- [[Research/Research Methodology/Pre-registration and Open Science/_Index|Pre-registration and Open Science]] — Prediction vs postdiction, pre-registration vs registered reports, pre-analysis plans & the OSF/AsPredicted/AEA ecosystem, limits & objections (5 notes; Nosek et al. 2018)

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
- [[Table 2 Fallacy]] — CONTAINS: definition (Westreich & Greenland 2013), core argument for non-joint identification, theorem on single-path identification, downstream scientific consequences, conditions under which multiple paths can be jointly identified
- [[Logic of Regression Adjustment]] — CONTAINS: potential outcomes setup, PATE definition, what adjustment identifies vs. doesn't, single-path theorem, "adjustment set as sacrifice" framing, strategies for identifying multiple paths
- [[Nuisance Parameter Bias Simulation]] — CONTAINS: DAG DGP with 4 measured confounders + 2 unobserved confounders, R/Python data simulation code, full Stan model, 90% CI coverage table (5 parameters × 2 conditions × 3 sample sizes), error-of-magnitude results, "big data is not a substitute" finding

## Sources

- [[raw/p_hacking.pdf]] — "The Garden of Forking Paths" (Gelman & Loken, 2013)
- [[raw/ssrn-2080235.pdf]] — "Here, There, and Everywhere" (Lewis, Rao, & Reiley, 2011)
- [[raw/multiple2f.pdf]] — "Why we (usually) don't have to worry about multiple comparisons" (Gelman, Hill & Yajima, 2009)
- [[raw/rohrer-murayama-2023.pdf]] — "These Are Not the Effects You Are Looking For" (Rohrer & Murayama, 2023, AMPPS 6(1))
- [[raw/These Are Not the Effects You Are Looking For]] — A. Jordan Nafa (2022), blog post: Table 2 Fallacy, logic of statistical control, mutual adjustment, simulation study with R/Python/Stan demonstrating nuisance parameter bias (2026-06-26)

## See Also

- [[Research/Bayesian Statistics/_Index|Bayesian Statistics]] — Bayesian alternatives to p-value-based inference
- [[The Experimental Ideal]] — Why randomized experiments are the benchmark
- [[The Selection Problem]] — The fundamental challenge of causal inference
- [[Research/Econometrics/_Index|Econometrics]] — Panel data and identification strategies
