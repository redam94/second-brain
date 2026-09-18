---
title: "Index: Experimental Design"
tags:
  - type/index
  - source/ingested
parent: "[[Research/Research Methodology/_Index|Research Methodology]]"
date_updated: 2026-09-18
concept_count: 16
---

# Experimental Design

> [!abstract] Routing Summary
> This folder covers tools for designing, powering, and analyzing experiments. Contains 4 notes plus a Delayed and Censored Feedback subfolder (4 notes).
> - Need sample size formulas? -> [[Power Analysis and Sample Size]]
> - Need Bonferroni, FDR, or q-values? -> [[Multiple Testing Corrections]]
> - Need Kaplan-Meier or Cox regression? -> [[Survival Analysis]]
> - Need Type S (sign) or Type M (magnitude) errors? -> [[Type S and Type M Errors]]
> - Need conversion-delay modeling or bandit regret under delayed/censored rewards? -> [[Research/Research Methodology/Experimental Design/Delayed and Censored Feedback/_Index|Delayed and Censored Feedback]]
> - Need **online A/B testing statistics** (CUPED, peeking, always-valid p-values / mSPRT, confidence sequences, SRM, marketplace interference, switchbacks)? -> [[Research/Research Methodology/Experimental Design/Online Experimentation/_Index|Online Experimentation]]

## Sub-topics

- [[Research/Research Methodology/Experimental Design/Delayed and Censored Feedback/_Index|Delayed and Censored Feedback]] — COVERS: Chapelle (2014)'s joint classifier + hazard-based delay model for ad conversion prediction (right-censoring of not-yet-converted examples), and Vernade, Cappé & Perchet (2017)'s stochastic bandit model with delayed and censored rewards, its DelayedUCB/DelayedKLUCB algorithms, and regret bounds. Extends this folder's [[Survival Analysis|survival/censoring]] concepts into the online sequential-decision setting. *(4 notes.)*
- [[Research/Research Methodology/Experimental Design/Online Experimentation/_Index|Online Experimentation]] — COVERS: the online controlled experiment framework and its failure modes, CUPED variance reduction (Deng et al. 2013), the peeking problem, always-valid p-values and the mSPRT (Johari et al.), confidence sequences (Howard et al. 2021), sample ratio mismatch and trustworthiness checks, interference in two-sided marketplaces, and switchback design and analysis (Bojinov et al.) (8 notes, added 2026-09-18)

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Sample size formulas, effect sizes, practical guidelines | [[Power Analysis and Sample Size]] | concept | [[The Experimental Ideal]], [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]] | Power = P(reject H0 given H1 true); aim for 80%+ |
| Bonferroni (FWER), Benjamini-Hochberg (FDR), q-values | [[Multiple Testing Corrections]] | concept | [[Garden of Forking Paths]], [[Researcher Degrees of Freedom]], [[Power Analysis and Sample Size]] | FDR control is usually more appropriate than FWER |
| Type S (sign) and Type M (magnitude) errors | [[Type S and Type M Errors]] | concept | [[Multiple Testing Corrections]], [[Power Analysis and Sample Size]], [[Multiple Comparisons - Bayesian Perspective]] | Sign and magnitude errors matter more than Type 1 in social science |
| Kaplan-Meier, log-rank test, Cox proportional hazards | [[Survival Analysis]] | overview | [[The Experimental Ideal]], [[Regression and the CEF]], [[Power Analysis and Sample Size]] | Censoring requires specialized time-to-event methods |

## Notes
- [[Power Analysis and Sample Size]] — CONTAINS: Sample size formulas, effect size conventions, power curves, practical guidelines for experiments
- [[Multiple Testing Corrections]] — CONTAINS: Bonferroni correction (FWER), Benjamini-Hochberg (FDR), q-values, when to use each method
- [[Type S and Type M Errors]] — CONTAINS: Sign errors, magnitude errors, exaggeration ratio, why large estimates from small samples are misleading, connection to underpowered studies
- [[Survival Analysis]] — CONTAINS: Kaplan-Meier estimator, log-rank test, Cox proportional hazards regression, censoring mechanisms

## Sources

- [Sample size estimation and power analysis (PMC3409926)](https://pmc.ncbi.nlm.nih.gov/articles/PMC3409926/)
- [How does multiple testing correction work? (PMC2907892)](https://pmc.ncbi.nlm.nih.gov/articles/PMC2907892/)
- [Survival Analysis and Interpretation of Time-to-Event Data (PMC6110618)](https://pmc.ncbi.nlm.nih.gov/articles/PMC6110618/)
- [[../raw/Chapelle 2014 - Modeling Delayed Feedback in Display Advertising.pdf]] — Chapelle (KDD 2014), "Modeling Delayed Feedback in Display Advertising"
- [[../raw/Vernade Cappe Perchet 2017 - Stochastic Bandit Models for Delayed Conversions.pdf]] — Vernade, Cappé & Perchet (2017), "Stochastic Bandit Models for Delayed Conversions", arXiv:1706.09186

## See Also

- [[The Experimental Ideal]] — Why experiments are the gold standard for causal inference
- [[Garden of Forking Paths]] — Why multiple testing is a pervasive problem
- [[Hierarchical Models]] — Bayesian structural alternative to multiple testing corrections
