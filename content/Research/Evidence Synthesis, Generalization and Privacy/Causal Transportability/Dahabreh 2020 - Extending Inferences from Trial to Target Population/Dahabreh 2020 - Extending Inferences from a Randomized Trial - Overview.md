---
title: "Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/overview
  - doc/paper
source: "[[raw/Dahabreh 2020 - Extending Inferences from a Randomized Trial to a New Target Population.pdf]]"
source_location: "Whole paper, pp. 1-17"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Dahabreh 2020 - Extending Inferences from Trial to Target Population"
doc_type: paper
depends_on:
  - "[[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]]"
used_by:
  - "[[Dahabreh 2020 - Identifiability Conditions and Identification]]"
  - "[[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]"
aliases:
  - "Extending inferences from a randomized trial overview"
  - "Dahabreh Robertson Steingrimsson Stuart Hernan 2020"
---

# Dahabreh 2020 - Extending Inferences from a Randomized Trial to a New Target Population

> [!summary]
> Dahabreh, Robertson, Steingrimsson, Stuart and Hernán (2020, *Statistics in Medicine* 39(14), a tutorial; arXiv:1805.00550v3) show how to estimate the average treatment effect in a target population of trial *non-participants* using trial outcome data plus only baseline covariates from the target sample. They compare outcome-model (OM), inverse-odds-weighting (IOW) and three doubly robust (DR) estimators, and recommend DR with normalized weights.

## Overview

**Research question.** Randomized-trial participants differ from the patients (or markets, or customers) a decision-maker cares about, and if those differences involve effect modifiers then $E[Y^a-Y^{a'}\mid S=1]\neq E[Y^a-Y^{a'}\mid S=0]$. Instead of an informal "is this trial relevant?" judgement, the paper gives formal estimators.

**Contribution.**
1. A clean statement of *generalizability* (target within the trial-eligible population) versus *transportability* (target includes the trial-ineligible).
2. Identification of $E[Y^a\mid S=0]$ under five conditions (consistency, two exchangeabilities, two positivities).
3. Three estimator families: outcome modelling (eq. 1), inverse-odds weighting (eqs. 2-3), and three doubly robust estimators (eqs. 4-6).
4. A simulation study (36 scenarios, 100,000 runs each) and a re-analysis of the Coronary Artery Surgery Study (CASS).
5. Practical guidance: sensitivity analysis, covariate selection, positivity diagnostic, weight inspection.

**Key result.** With correctly specified models, every adjusted estimator is approximately unbiased, but the trial-only estimator is badly biased for the target when an effect modifier drives selection (bias 0.66-0.89 in the reported scenarios). OM and DR have the smallest variance; IOW is far noisier, and *normalized* weights (IOW2, DR2, DR3) are much better behaved than unnormalized ones.

> [!note] Scope of the captured text
> The arXiv v3 PDF (21 pages) contains the main tutorial and references only. The paper repeatedly cites an Appendix (non-nested designs, formal DR asymptotics, full simulation tables, R code, covariate balance after weighting) that is **not** in this file; those items are noted as "not in the PDF" rather than reconstructed from memory.

## Main Content

### Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| Abstract, 1 Background | 1-2 | this note, [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]] |
| 2.1 Basic concepts and terminology | 2-3 | [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]] |
| 2.2 Study designs (nested, non-nested) | 3 | [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]] |
| 3 Data and causal quantities (Table 1) | 3-5 | [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]] |
| 4.1 Identifiability conditions (1)-(5) | 5-6 | [[Dahabreh 2020 - Identifiability Conditions and Identification]] |
| 4.2 Identification | 6 | [[Dahabreh 2020 - Identifiability Conditions and Identification]] |
| 5.1 Outcome modelling (eq. 1) | 6-7 | [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]] |
| 5.2 Participation modelling and weighting (eqs. 2-3) | 7-8 | [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]] |
| 5.3 Doubly robust estimators (eqs. 4-6) | 8 | [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]] |
| 5.4 Inference (sandwich, bootstrap) | 9 | [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]] |
| 6 Simulation (6.1 data, 6.2 results, Tables 2-3, 6.3 code) | 9-11 | [[Dahabreh 2020 - Simulation Study of Estimators]] |
| 7 CASS analyses (Tables 4-5, Figure 1) | 11-13 | [[Dahabreh 2020 - CASS Coronary Surgery Application]] |
| 8.1-8.4 Practical issues | 14-16 | [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]] |
| 9 Discussion | 16-17 | [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]] |
| References [1]-[71] | 18-21 | cited where relevant; not transcribed |
| Appendix (cited, absent from PDF) | - | not captured |

### Headline numbers
- Simulation: $n_{RCT}=200$, $n=2000$, strong selection and effect modification: trial-only bias $0.7656$; OM $0.0000$; DR2 $0.0003$ (Table 2, first row).
- CASS 10-year mortality risk difference, surgery minus medical, non-participants: trial-only $-3.0\%$ (95% CI $-8.7,2.7$); OM $-1.3\%$; IOW2 $-1.9\%$; DR2 $-1.4\%$ — all similar because covariate distributions of participants and non-participants were similar.

## Examples
- Worked example of the DR estimator on simulated data: [[Dahabreh 2020 - Simulation Study of Estimators]].
- Full applied example: [[Dahabreh 2020 - CASS Coronary Surgery Application]].

## Relevance to marketing measurement
A geo or lift experiment is a "trial": the randomized markets or users are $S=1$, the markets where budget will be re-allocated are $S=0$. The question "does a lift test in 20 DMAs tell me the incrementality in the other 190?" is a transportability problem. The paper's recipe needs only baseline covariates (market size, category penetration, media mix, demographics) for the target, which is exactly what is usually available for non-tested markets. The identification condition $E[Y^a\mid X,S=1]=E[Y^a\mid X,S=0]$ then says: *after conditioning on the covariates, tested and untested markets have the same potential-outcome mean*. Compare [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]], where this fails empirically at the site level.

## Connections
- Weighting machinery parallels [[Bayesian Inverse Probability Weighting]] and the doubly robust logic in [[Doubly-Robust Estimands for ATT(g,t)]].
- Randomization inside the trial is the "experimental ideal" of [[The Experimental Ideal]]; this paper handles what happens *outside* the trial.
- Applied ad-measurement context: [[Geo-Experiment Methodology - Overview]], [[Conversion Lift Studies on Ad Platforms]], [[Observational vs Experimental Methods in Advertising]].

## See Also
- [[Dahabreh 2020 - Trial Participation Process, Designs and Estimands]]
- [[Dahabreh 2020 - Identifiability Conditions and Identification]]
- [[Dahabreh 2020 - Outcome Model, Inverse Odds Weighting and Doubly Robust Estimators]]
- [[Dahabreh 2020 - Simulation Study of Estimators]]
- [[Dahabreh 2020 - CASS Coronary Surgery Application]]
- [[Dahabreh 2020 - Practical Issues, Diagnostics and Discussion]]
