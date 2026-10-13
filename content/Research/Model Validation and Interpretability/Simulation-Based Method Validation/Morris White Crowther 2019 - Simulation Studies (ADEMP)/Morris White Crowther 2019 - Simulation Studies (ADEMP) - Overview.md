---
title: "Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview"
tags:
  - source/ingested
  - topic/model-validation
  - topic/simulation
  - topic/research-methodology
  - type/overview
  - doc/paper
source: "[[raw/Morris White Crowther 2019 - Using Simulation Studies to Evaluate Statistical Methods.pdf]]"
source_location: "Morris, White & Crowther (2019), 'Using simulation studies to evaluate statistical methods', Tutorial in Biostatistics, Statistics in Medicine 38(11):2074-2102; arXiv:1712.03198v3 (5 Dec 2018), 33 pp. — all sections §1-§8, Tables 1-8, Figures 1-6, Eq. 1-2, Appendix A (Fig. A1-A3, Table A1). Page numbers in this note set are those of the arXiv preprint."
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)"
doc_type: paper
depends_on:
  - "[[Designing Simulated-Data Experiments]]"
  - "[[Effective Sample Size and Monte Carlo Standard Error]]"
used_by:
  - "[[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]]"
  - "[[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]]"
  - "[[Simulation-Based Calibration - Overview]]"
aliases:
  - Simulation Studies for Evaluating Statistical Methods (ADEMP)
  - ADEMP
  - Morris White Crowther 2019
  - Using simulation studies to evaluate statistical methods
  - Morris et al 2019 simulation tutorial
---

# Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview

> [!summary]
> Morris, White & Crowther (2019) treat a simulation study as **an empirical experiment** and give it a planning and reporting template, **ADEMP**: **A**ims, **D**ata-generating mechanisms, **E**stimands (or other targets), **M**ethods, **P**erformance measures. The core technical contribution is **Table 6**: bias, empirical SE, relative precision, MSE, average model SE, relative error in model SE, coverage, **bias-eliminated coverage** (new) and rejection rates, each with its **Monte Carlo standard error**, plus **Eq. 1** for choosing the number of repetitions $n_{\text{sim}}$. A review of 100 simulation studies in *Statistics in Medicine* Vol. 34 found that **93 did not mention Monte Carlo SEs** and only **4 of 87 justified $n_{\text{sim}}$**. The paper also gives coding rules (seed once, store states, use streams), new graphics (**zip plot**, **lollipop plot**), a fully worked survival example, and a case for protocols, public code and author consortia. It is the reference standard for checking whether any modelling procedure — an MMM, a feature-importance method, a forecasting pipeline — recovers what it claims to.
^summary-ademp-overview

## Overview

**Research question.** How should statisticians design, execute, analyse and report simulation studies that evaluate statistical methods, and how well does current practice do?

**Contribution** (Abstract; §1, p.2):
1. The **ADEMP** structured approach to planning and reporting.
2. Coherent terminology (DGM vs data-generating model; estimand vs target; empirical vs model SE; the four datasets).
3. Coding guidance on random numbers, streams and building up code.
4. A critical discussion of performance measures **with Monte Carlo SEs** for each.
5. Guidance on tables and graphs, including **new** graphics: the zip plot and the lollipop plot.
6. A **review of practice** (100 articles, Vol. 34, 2015) that grounds each recommendation.

**Key findings and recommendations.**
- "simulation studies are empirical experiments, meaning performance measures are themselves estimated, and estimates of performance are thus subject to error" (§3.5, p.9). Report a Monte Carlo SE for every performance estimate.
- Choose $n_{\text{sim}}$ by inverting the MCSE formula for the key measure (1,900 for 95% coverage ± 0.5 pp; 1,600 for MCSE(bias) < 0.005 when $\text{SD}(\hat\theta)\le0.2$).
- Read measures jointly: MSE and coverage comparisons depend on $n_{\text{obs}}$ when methods are biased (Figure 1), and adequate coverage can hide bias offset by an over-estimated SE (worked example).
- Prefer factorial DGMs; when infeasible, check interactions only where main effects exist, predict-and-check, or use a fractional factorial design.
- Write a protocol before coding, release code, and run "late-phase" comparisons with rival method authors.

> [!definition] ADEMP in one box (§3, pp.4-9; Table 1, p.3)
> 1. **Aims** — the estimator properties of interest (bias/consistency, valid variance estimation, coverage, efficiency); proof-of-concept vs stretch/break.
> 2. **Data-generating mechanisms** — parametric vs resampling; which factors to vary and how (factorial / partly / one-at-a-time).
> 3. **Estimands / targets** — $\theta$, or a null hypothesis, model, prediction or design (Table 3).
> 4. **Methods** — serious contenders that target the same estimand; non-convergence handling defines the method.
> 5. **Performance measures** — each with a Monte Carlo SE; $n_{\text{sim}}$ chosen for adequate precision.
^def-ademp

> [!theorem] Repetitions needed for a target Monte Carlo SE (§5.3, Eq. 1, p.18; §7.1, p.21)
> $$
> n_{\text{sim}}=\frac{E(\text{Coverage})\times(1-E(\text{Coverage}))}{(\text{Monte Carlo SE}_{\text{req}})^2}
> $$
> 95% coverage with required SE 0.5 pp gives $95\times5/0.5^2=1{,}900$; the worst case (50%) gives 10,000. For bias, $n_{\text{sim}}=\text{Var}(\hat\theta)/\text{MCSE}_{\text{req}}^2$ with a conservative pilot variance. Full treatment: [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^thm-nsim-coverage|Eq. 1]] and [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^thm-nsim-bias|the bias version]].
^thm-nsim

## Source Map

Every section, table, figure and equation of the source, and the note that holds it.

| Source element | Pages | Note |
|---|---|---|
| Abstract | 1 | [[Morris et al 2019 - Motivation and Review of Simulation Practice]] |
| §1 Introduction (definition, five uses with cited examples [1-3], scope, contributions) | 1-2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice]] |
| §1 background literature (lament list [4]-[8]; general books [6], [9], [10]; rigour articles [1], [4], [5], [8], [11]-[16]) | 2 | [[Morris et al 2019 - Motivation and Review of Simulation Practice#^ref-background-literature]] |
| Table 1 Key steps and decisions | 3 | [[Morris et al 2019 - Motivation and Review of Simulation Practice#^tbl-key-steps]]; streams citation [17] in [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams#^def-rng-streams]] |
| §2 Review of *Statistics in Medicine* Vol. 34 (design) | 3-4 | [[Morris et al 2019 - Motivation and Review of Simulation Practice#^ex-review-design]] |
| Table 2 Notation | 4 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods#^def-notation]] |
| §3 intro (ADEMP acronym) | 4 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]] |
| §3.1 Aims (four estimator properties incl. Kenward & Roger [18]; aim-by-example table [19-22]; proof-of-concept vs break) | 4-5 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods#^def-estimator-properties]] |
| §3.2 Data-generating mechanisms (out-of-scope statement and Ripley/Morgan pointer [6], [9]; factorial design, three fallbacks, four pitfalls with Graves [24] and Senn [25], review results) | 5-6 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods#^alg-nonfactorial-fallbacks]], [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods#^warn-dgm-pitfalls]] |
| §3.3 Estimands and other targets | 6-7 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods#^def-estimand-target]] |
| Table 3 Targets and performance measures | 7 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods#^tbl-targets]] |
| §3.4 Methods (contenders, preliminary-test procedures [31,32], unimplemented methods [33,34], marginal vs conditional, non-convergence) | 7-8 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods#^def-pure-vs-procedure]] |
| §3.5 Performance measures (overview; misleading names) | 8-9 | [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]], [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] |
| Table 4 Performance measures used in the review | 9 | [[Morris et al 2019 - Motivation and Review of Simulation Practice#^tbl-review-measures]] |
| Table 5 Datasets of a simulation study | 9 | [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams#^def-four-datasets]] |
| §4.1 Seeds and states (pseudocode; Stata overlap example) | 10-11 | [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams#^alg-seed-once]], [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams#^ex-overlapping-seeds]] |
| §4.1.1 Stream random numbers (circle figure; seed-reset test) | 11-12 | [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams#^def-rng-streams]] |
| §4.2 Start small and build up code | 12 | [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams#^alg-build-up]] |
| §4.3 Different software packages | 12-13 | [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams#^def-same-data]] |
| §5 intro; §5.1 Checking estimates data (missingness; five plots) | 13-14 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^def-missing-estimates]], [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^alg-exploratory-plots]] |
| §5.2 Performance measures and Monte Carlo SEs | 14-17 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] |
| Table 6 Definitions, estimates and Monte Carlo SEs | 15 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^thm-table6]] |
| Randomisation vs confidence validity | 15 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^def-coverage-validity]] |
| Figure 1 Bias, EmpSE, root MSE, coverage vs $n_{\text{obs}}$ | 16 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^ex-figure1]] |
| Sources of under/over-coverage; bias-eliminated coverage; rejection rates | 16 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^thm-coverage-sources]], [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^def-bias-eliminated-coverage]] |
| Conditional performance (Kimani [48], Carreras [49], Efron & Hastie [50]); Table 7 | 16-17 | [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^ex-table7]] |
| §5.3 Sample size for simulation studies (review justifications [26,52-54], model justifications [55,56]); Eq. 1 | 17-18 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^thm-nsim-coverage]] |
| §5.4 Remarks on analysis (benchmarks, estimating $\theta$, meta-models) | 18-19 | [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^alg-estimate-theta]], [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^def-meta-model]] |
| §6.1 Methods section | 19 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]] |
| §6.2 Presentation of results (tables, graphs, nested-loop plot; layout examples [60-65]) | 19-20 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots#^def-table-rules]], [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots#^def-nested-loop-plot]] |
| §7.1 Design of example; Eq. 2; Figure 2; $n_{\text{sim}}$ = 1,600 | 20-21 | [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox#^ex-ademp-spec]], [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox#^ex-nsim-1600]] |
| §7.2 Exploration; Figures 3-4 | 21-22 | [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]]; Figure 3 axes in [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox#^ex-figure3-axes]] |
| Figure 5 Zip plot | 23 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots#^def-zip-plot]], [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots#^ex-figure5]] |
| §7.3 Analysis; Table 8 | 23-24 | [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox#^tbl-table8]] |
| Figure 6 Lollipop plot (incl. the §7.3 "methods across the two columns" slip) | 25 | [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots#^def-lollipop-plot]] |
| §7.4 Conclusions of example | 24 | [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]] |
| §8 Concluding remarks | 24-26 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]] |
| §8.1 Future directions (protocols, consortia, code) | 26 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits#^def-three-remedies]] |
| §8.2 Final remark | 26-27 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]] |
| Conflicts of interest; acknowledgements | 27 | [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]] |
| References [1]-[76] (full citations, citation pages, curated further reading) | 27-30 | [[Morris et al 2019 - Full Reference List and Further Reading#^ref-full-list]], [[Morris et al 2019 - Full Reference List and Further Reading#^def-further-reading]] |
| Appendix A; Figure A1 reviewer agreement (per-variable counts table) | 30 | [[Morris et al 2019 - Motivation and Review of Simulation Practice]] |
| Table A1 Software | 31 | [[Morris et al 2019 - Motivation and Review of Simulation Practice]] |
| Figure A2 DGM summaries | 32 | [[Morris et al 2019 - Motivation and Review of Simulation Practice]] |
| Figure A3 Estimands and methods | 33 | [[Morris et al 2019 - Motivation and Review of Simulation Practice]] |
| *(application, not in source)* ADEMP for marketing models | — | [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] |

## Main Content

### Reading order

1. [[Morris et al 2019 - Motivation and Review of Simulation Practice]] — why, and the evidence of poor practice.
2. [[Morris et al 2019 - ADEMP Planning of Aims, DGMs, Estimands and Methods]] — planning.
3. [[Morris et al 2019 - Coding Simulations with Seeds, RNG States and Streams]] — execution.
4. [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks]] — first checks, $n_{\text{sim}}$, analysis remarks.
5. [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors]] — Table 6 and its interpretation.
6. [[Morris et al 2019 - Reporting, Tables and Zip and Lollipop Plots]] — presentation and the reporting checklist.
7. [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]] — everything at once.
8. [[Morris et al 2019 - Protocols, Code Release, Consortia and Limits]] — discussion.
9. [[Morris et al 2019 - Full Reference List and Further Reading]] — all 76 references and a reading list.
10. [[Morris et al 2019 - Applying ADEMP to Marketing-Model Validation]] — application.

### Concept dependencies

ADEMP planning → coding → estimates checks → performance measures (+MCSE) → $n_{\text{sim}}$ → reporting. The worked example depends on all of them; the marketing application depends on the worked example as a template.

## Examples

> [!example] The worked example in one line (§7, Table 8, p.24)
> A misspecified exponential PH model, on data with $\gamma=1.5$, is biased by 0.049 (~10% of $\theta=-0.5$) but still shows 96.0% coverage because its model SE overestimates the empirical SE by 11.5%. Coverage alone would have passed it. See [[Morris et al 2019 - Worked Example Exponential vs Weibull vs Cox]].
^ex-worked-example-one-line

## Connections

- **Bayesian-workflow analogues.** [[Designing Simulated-Data Experiments]] (parameter recovery on a fake dataset), [[Simulation-Based Calibration - Overview]] / [[The SBC Algorithm]] (prior-averaged calibration), [[Data-Averaged Posterior Self-Consistency]], and [[Simulated-Data Experimentation as Virtual Replication]]. Morris et al. evaluate *frequentist* properties at fixed $\theta$ "even if the methods are Bayesian" (§1, p.2); SBC draws $\theta$ from the prior each repetition — DGM pitfall 2. Side-by-side comparisons: [[Morris et al 2019 - Performance Measures and Monte Carlo Standard Errors#^imp-vs-single-fake-data|single fake-data fit vs Table 6]] and [[Morris et al 2019 - Estimates Data Checks, n_sim Choice and Analysis Remarks#^imp-single-run-vs-nsim|one run vs a planned n_sim]].
- **Monte Carlo error.** [[Effective Sample Size and Monte Carlo Standard Error]] (within one MCMC fit) and [[How Many Digits to Report]].
- **Marketing measurement.** [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] (a DGM for media mix data) and [[Chan Perry 2017 - Challenges in Media Mix Modeling - Overview]] (simulation-based evaluation of MMMs). Existing simulation studies in the vault: [[MMM Model Selection and Application]], [[TBR Design Sensitivity and the Stationarity Assumption]], [[Nuisance Parameter Bias Simulation]], [[Metalearner Simulation Results]].
- **Simulation studies elsewhere in this cluster.** [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]], [[Strobl et al 2008 - Conditional Variable Importance - Overview]], [[Hooker Mentch Zhou 2021 - Permute-and-Predict Extrapolation - Overview]], [[Fisher Rudin Dominici 2019 - Model Class Reliance - Overview]], [[Meinshausen Buhlmann 2010 - Stability Selection - Overview]], [[Janzing et al 2020 - Feature Relevance as a Causal Problem - Overview]], [[Dillon et al - SHAP and Causal Insights - Overview]] each rest on simulation evidence that can be read against ADEMP.
- **Forking paths in methods research.** [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Simmons Nelson Simonsohn 2011 - False-Positive Psychology - Overview]], [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].
- **Prediction and time-series targets.** [[Riley et al 2020 - Sample Size for Prediction Models - Overview]], [[Bergmeir Hyndman Koo 2018 - CV for Time Series - Overview]], [[Forecast Evaluation and Backtesting]], [[Granger 2003 - Spurious Regression and Cointegration - Overview]] (a classic simulation-based finding).
- **Governance.** [[SR 11-7 - Model Risk Management Guidance - Overview]], [[NIST AI RMF 1.0 - Overview]].

## See Also

- [[Research/Model Validation and Interpretability/Simulation-Based Method Validation/Morris White Crowther 2019 - Simulation Studies (ADEMP)/_Index|Index of this note set]]
- [[Designing Simulated-Data Experiments]] — fake-data checks in the Bayesian workflow
- [[Breiman 2001 - Statistical Modeling The Two Cultures - Overview]] — the predictive-accuracy culture that simulation studies of algorithms serve
- [[Strobl 2007 - Null and Power Case Simulation Design]] — ADEMP reading of a classic method-comparison simulation
- [[Strobl 2008 - Digitized Figure Data for Selection Rates and Importance]] — simulation reported only as figures, without n or Monte Carlo SE
- [[Hooker Mentch Zhou 2021 - Relearning Hypothesis Tests and Bike-Share Application]] — rejection-rate performance measure with Monte Carlo SE
- [[Ioannidis 2005 - Table 4 PPV by Study Design]] — ADEMP-framed replication of Table 4
- [[Breiman 2001 - Discussion by Cox, Efron, Hoadley and Parzen and Rejoinder]] — Efron: honest simulation comparisons are hard
- [[Granger 2003 - Spurious Regression Monte Carlo in Python]] — ADEMP-structured simulation with Monte Carlo SEs
- [[Bergmeir 2018 - Monte Carlo Design and MAPAE-MPAE Metrics]] — simulation whose estimand is future prediction error
- [[AMSS MMM Evaluation - Simple Scenario and Lagged-Effects Study]] — worked ADEMP example in marketing
- [[SR 11-7 - Applying Model Risk Management to Marketing Analytics]] — known-truth simulation as a compensating control
- [[NIST AI RMF - MEASURE Function]] — validity demonstration and evaluation of TEVV metrics
- [[Jin 2017 MMM - Simulation Design, Signal Strength and Priors]] — fully reported DGM in a marketing simulation
