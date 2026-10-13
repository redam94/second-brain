---
title: "Index: Morris White Crowther 2019 - Simulation Studies (ADEMP)"
tags:
  - type/index
  - source/ingested
  - topic/model-validation
parent: "[[../_Index|Simulation-Based Method Validation]]"
date_updated: 2026-10-13
concept_count: 11
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "Whole paper (arXiv:1712.03198v3, pp.1-33): §1-§8, Tables 1-8, Figures 1-6, Appendix A; routing index for this note set."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: index
depends_on: []
used_by: []
aliases:
  - Morris White Crowther 2019 ADEMP index
---

# Morris White Crowther 2019 - Simulation Studies (ADEMP)

> [!abstract] Routing Summary
> This folder fully captures Morris, White & Crowther (2019), *Using simulation studies to evaluate statistical methods* (Statistics in Medicine 38(11):2074-2102; arXiv:1712.03198v3, 33 pp.) in 11 notes. The paper treats a simulation study as an empirical experiment, plans it with **ADEMP** (Aims, Data-generating mechanisms, Estimands, Methods, Performance measures), gives every performance measure a **Monte Carlo SE**, derives $n_{\text{sim}}$ from a target MCSE, and documents poor practice in 100 published studies.
> - Need the big picture, section map or the $n_{\text{sim}}$ formula at a glance? → [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]
> - Need the definition and uses of simulation studies, Table 1 checklist, or any review statistic (Table 4, Table A1, Figs A1-A3)? → [[Morris et al 2019 - Motivation and Review of Simulation Practice]]
> - Need how to set aims, design DGMs (factorial, predict-and-check), Senn's four pitfalls, targets (Table 3), marginal vs conditional estimands, or non-convergence handling? → [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]]
> - Need seeds, RNG states, streams, the four datasets (Table 5), or the build-up procedure? → [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams]]
> - Need the Table 6 formulas (bias, EmpSE, MSE, ModSE, coverage, bias-eliminated coverage, power) with MCSEs, Figure 1, or conditional coverage (Table 7)? → [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]]
> - Need missing-estimate checks, exploratory plots, Eq. 1 for $n_{\text{sim}}$, estimating unknown $\theta$, or meta-models? → [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]]
> - Need table design, the zip plot, lollipop plot, nested-loop plot, or a reporting checklist? → [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]]
> - Need the full worked survival example and Table 8? → [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]]
> - Need protocols, code release, author consortia, or the limits of simulation evidence? → [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]]
> - Need the full citation for a bracketed reference [1]-[76], or a reading list on Monte Carlo error, design and data generation? → [[Morris et al 2019 - Full Reference List and Further Reading]]
> - Need an ADEMP protocol for an MMM or a SHAP driver-ranking pipeline? → [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]]
^summary-index

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Simulation study; five uses | [[Morris et al 2019 - Motivation and Review of Simulation Practice]] | definition | — | Evaluate frequentist properties "even if the methods are Bayesian" |
| Review of Vol. 34 | [[Morris et al 2019 - Motivation and Review of Simulation Practice]] | example | — | 93/100 no MCSE; 4/87 justified $n_{\text{sim}}$ |
| ADEMP | [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] | definition | — | Plan and report in A-D-E-M-P order |
| Four estimator properties | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]] | definition | — | Consistency/bias, variance estimation, coverage, efficiency |
| DGM; factorial fallbacks; four pitfalls | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]] | definition | ADEMP | Predict-and-check; simulator vs estimator knowledge |
| Targets (Table 3) | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]] | definition | Estimand | Estimand / null / model / prediction / design |
| Pure vs procedural method | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]] | definition | Methods | Fallback rules are part of the method |
| Four datasets (Table 5) | [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams]] | definition | — | Simulated, estimates, states, performance |
| Seed once, store states | [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams]] | algorithm | — | Avoids overlapping draws |
| RNG streams | [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams]] | definition | Seeds | Safe parallelism within a DGM |
| Table 6 measures + MCSEs | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] | theorem | Notation | e.g. MCSE(bias) $=\text{EmpSE}/\sqrt{n_{\text{sim}}}$ |
| Bias-eliminated coverage | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] | definition | Coverage | Splits bias from interval width |
| Coverage sources; $n_{\text{obs}}$ effect | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] | theorem | Bias, ModSE | Bias-driven under-coverage worsens with $n_{\text{obs}}$ |
| Conditional coverage (Table 7) | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] | example | Coverage | 98.0 / 95.5 / 91.5% by ModSE tertile |
| Missing estimates; exploratory plots | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]] | definition | Estimates data | Non-convergence is the first measure |
| $n_{\text{sim}}$ (Eq. 1) | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]] | theorem | MCSE | 1,900 for 95% ± 0.5 pp; 10,000 worst case |
| Estimating $\theta$; meta-model | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]] | algorithm | DGM | One huge dataset, separate stream |
| Zip plot | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]] | definition | Coverage | CIs ranked by $\lvert z\rvert$ expose hidden bias |
| Lollipop plot; nested-loop plot | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]] | definition | Measures | MCSE shown as parentheses |
| Worked PH example (Table 8) | [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]] | example | All above | Bias 0.049 masked by +11.5% ModSE error |
| Protocols, consortia, code | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]] | concept | ADEMP | "points of light on a landscape" |
| Full references; further reading | [[Morris et al 2019 - Full Reference List and Further Reading]] | reference | — | 76 refs with citation pages; MCSE/design/data-generation reading list |
| Fixed-θ repetitions vs single fake-data fit | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] | concept | Table 6 | One run has no Monte Carlo SE |
| ADEMP for MMM / SHAP pipelines | [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] | example | All above | Selection steps go inside the loop |

## Notes

- [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]] — CONTAINS: research question, contributions, key findings, ADEMP box, $n_{\text{sim}}$ formula (^thm-nsim), full Source Map (every section/table/figure → note), reading order, connections.
- [[Morris et al 2019 - Motivation and Review of Simulation Practice]] — CONTAINS: definition of a simulation study; five uses with cited examples (Feiveson; Rubin; Grieve); Table 1 (key steps checklist); review design (264 articles, 199 with simulation, 100 sampled); every review statistic in one table; Table 4 (performance measures used); Table A1 (software); Fig. A1 agreement (94%) with per-variable W/C counts table; Fig. A2-A3 summaries; §1 background literature table (Ripley, Morgan, Chang; Díaz-Emparanza, simsum, Smith & Marshall, Crowther & Lambert, Holford, O'Kelly).
- [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]] — CONTAINS: Table 2 notation; acronym-order quirk; four estimator properties; aim → example-study table (White 1997; White & Thompson 2005; Hughes et al. 2014; Morris et al. 2014); proof-of-concept vs stretch/break; DGM definition; factorial design and three fallbacks (predict-and-check algorithm); Senn's four pitfalls (with Graves 2018 and Senn 1994 citations and a gloss on pitfall 3); out-of-scope statement and Ripley/Morgan pointer; Kenward & Roger for variance estimation; estimand/target definition; Table 3; marginal vs conditional log-OR example; including contenders; pure vs procedural method; §3.5 overview.
- [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams]] — CONTAINS: Table 5; PRNG states and seeds; seed-once pseudocode; Stata overlapping-draws example; streams and the circle figure; Stata/SAS/R stream syntax; Haramoto et al. jump-ahead basis for streams; seed-reset test; build-up procedure (rnormal SD trap); positive/negative controls; simulate once and export; Python harness sketch.
- [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] — CONTAINS: Table 6 (all nine rows, verified against the PDF); MCSE derivation sketches; bias, relative bias, EmpSE, relative precision warning ($\hat\theta/2$); MSE and Figure 1 (crossover at $n_{\text{obs}}=60$; approximate panel-value table with axis scales); ModSE; randomisation vs confidence validity; sources of under/over-coverage; bias-eliminated coverage; rejection rates; conditional performance (Kimani; Carreras; Efron & Hastie) and Table 7; comparison with a single Bayesian fake-data fit; worked MCSE arithmetic.
- [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]] — CONTAINS: missing estimates as first measure; bimodal-estimates example; five exploratory plots; Eq. 1; the four review justifications of $n_{\text{sim}}$ and the model justifications (§7, Keogh & Morris 2018, Morris et al. 2017); $n_{\text{sim}}$ for bias; $n_{\text{sim}}$ algorithm; continuing from end state; benchmarks (nominal coverage, Cramér-Rao); estimating unknown $\theta$; meta-models and common seeds; one run vs a planned $n_{\text{sim}}$ (Bayesian fake-data comparison).
- [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]] — CONTAINS: §6.1 methods section; table design rules with cited layout examples (He; Chen; Hsu; Alonso; Seaman; White & Royston; Lambert); graphs vs tables; nested-loop plot (768 DGMs); zip plot algorithm and Figure 5; lollipop plot (Figure 6) with the flagged §7.3 'two columns' slip; Figures 3-4 with axis ranges; simsum/rsimsum; consolidated 13-item reporting checklist.
- [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]] — CONTAINS: Eq. 2 PH model; full ADEMP spec; Figure 2; $n_{\text{sim}}=1{,}600$ calculation; §7.2 exploration (with a flagged prose/table inconsistency); Figure 3 panel layout and axis ranges; full Table 8; Figure 6 description; interpretation; §7.4 conclusions.
- [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]] — CONTAINS: two main shortcomings; ADEMP exemplars; charitable vs less charitable explanations; three remedies (protocols, consortia, code); Royston's "points of light"; conflicts of interest; funding grant numbers and acknowledged reviewers; limitations assessment.
- [[Morris et al 2019 - Full Reference List and Further Reading]] — CONTAINS: all 76 references as printed with in-text citation pages and the note covering each; curated further reading by topic (Monte Carlo error, software, design, data generation, RNG streams, protocols, presentation, meta-research).
- [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] — CONTAINS: ADEMP protocol for a Bayesian MMM (36-DGM grid, $n_{\text{sim}}=400$); ADEMP protocol for a SHAP driver-ranking pipeline ($n_{\text{sim}}\approx475$); execution checklist.

## Sources

- [[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]] — Morris TP, White IR, Crowther MJ (2019). Using simulation studies to evaluate statistical methods. *Statistics in Medicine* 38(11):2074-2102. arXiv:1712.03198v3.

## See Also

- [[Designing Simulated-Data Experiments]] — fake-data parameter recovery in the Bayesian workflow
- [[Simulation-Based Calibration - Overview]] — prior-averaged calibration checks
- [[Effective Sample Size and Monte Carlo Standard Error]] — Monte Carlo error within one MCMC fit
- [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] — a DGM for media mix data
- [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] — why MMMs need simulation validation
- [[Garden of Forking Paths]] — why simulation protocols matter
