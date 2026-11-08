---
title: "Index: Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta"
tags:
  - type/index
  - source/ingested
  - topic/meta-analysis
parent: "[[../_Index|Meta-Analysis]]"
date_updated: 2026-11-08
concept_count: 9
---

# Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta

> [!abstract] Routing Summary
> This folder fully captures Röver (2020), *Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package* (J. Stat. Softw. 93(6); arXiv:1711.08683): the normal-normal hierarchical model, priors for the effect and heterogeneity, closed-form marginal likelihood and conditional posteriors, the DIRECT normal-mixture computation, prediction, shrinkage, credible intervals, posterior predictive $p$-values, the REML connection and the pediatric liver transplant example. 9 notes; all printed example numbers were recomputed independently in Python.
> - Need the paper on one page, headline numbers, or the section-to-note map? -> [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]
> - Need why Bayesian for few studies, Bayesian vs frequentist, or the software landscape? -> [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]]
> - Need the NNHM definition and likelihood? -> [[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]]
> - Need $\tau$ priors (half-normal, Jeffreys, uniform shrinkage...), unit-information priors, the uniform-prior conservatism theorem, or prior predictive checks? -> [[Roever 2020 - Priors for the Effect and Heterogeneity]]
> - Need the marginal likelihood, conditional normal posterior of $\mu$, and the mixture factorisation (with derivation)? -> [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]]
> - Need prediction for a new study, shrinkage formulas, or credible-interval types? -> [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]]
> - Need posterior predictive $p$-values or the link to REML? -> [[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]]
> - Need the DIRECT algorithm, the divergence formula or the PIT calibration check? -> [[Roever 2020 - DIRECT Algorithm Implementation and Calibration]]
> - Need the six-study IL-2RA example with every printed number? -> [[Roever 2020 - Pediatric Liver Transplant Worked Example]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Why Bayesian with small $k$ | [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]] | concept | none | Cochrane median 3 studies; 57% zero $\hat\tau$ |
| NNHM | [[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]] | definition | [[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]] | $y_i\sim N(\mu,\sigma_i^2+\tau^2)$ |
| Unit information prior | [[Roever 2020 - Priors for the Effect and Heterogeneity]] | definition | NNHM | log-OR: $N(0,4^2)$ |
| $\tau$ prior classes (Table 1) | [[Roever 2020 - Priors for the Effect and Heterogeneity]] | definition | NNHM | four classes; Jeffreys proper for $k\ge2$ |
| Uniform-prior conservatism | [[Roever 2020 - Priors for the Effect and Heterogeneity]] | theorem | monotone priors | $F_p\ge F_1$ |
| Marginal likelihood of $\tau$ | [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]] | theorem | NNHM | Eq. 16-18, 22 |
| Conditional posterior of $\mu$ | [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]] | theorem | marginal likelihood | normal with $\hat\mu(\tau),\hat\sigma(\tau)$ |
| Posterior as normal mixture | [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]] | theorem | conditional posterior | $\int N(\mu\mid\tau)p(\tau\mid y)d\tau$ |
| Predictive distribution | [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]] | theorem | mixture | variance $\hat\sigma^2+\tau^2$ |
| Shrinkage estimates | [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]] | theorem | mixture | precision-weighted pull to $\hat\mu(\tau)$ |
| Shortest/HPD intervals | [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]] | definition | posterior | default in bayesmeta |
| Posterior predictive $p$ | [[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]] | definition | posterior | $p=0.01$ for $\mu\ge0$ (2 studies) |
| REML as conditional posterior | [[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]] | theorem | uniform $\mu$ prior | identical mean and SE |
| DIRECT algorithm | [[Roever 2020 - DIRECT Algorithm Implementation and Calibration]] | concept | mixture | 17 components for $\delta=1\%$ |
| PIT calibration | [[Roever 2020 - DIRECT Algorithm Implementation and Calibration]] | theorem | prior-generated data | uniform PIT |
| IL-2RA example | [[Roever 2020 - Pediatric Liver Transplant Worked Example]] | example | all | $\mu$ median -1.57 [-2.23, -0.93] |

## Notes

- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]] — CONTAINS: question, contribution, headline numbers, full Source Map including appendices.
- [[Roever 2020 - Overview and Motivation of Bayesian Meta-Analysis]] — CONTAINS: Sec. 1 and Sec. 4: small-$k$ evidence, frequentist plug-in critique, Bayesian advantages, software landscape, interval semantics.
- [[Roever 2020 - Normal-Normal Hierarchical Model and Likelihood]] — CONTAINS: Eq. 1-3 and 13-14, definitions, Python log-likelihood.
- [[Roever 2020 - Priors for the Effect and Heterogeneity]] — CONTAINS: priors for $\mu$; unit information (App. A.1); informative, proper and improper $\tau$ priors (Eq. 4-12); Table 1; uniform-prior conservatism theorem (App. A.2); prior predictive table; code.
- [[Roever 2020 - Marginal Likelihood and Conditional Posteriors]] — CONTAINS: Eq. 15-26 with derivation (App. A.3), normal-prior version, factorisation theorem, grid code.
- [[Roever 2020 - Prediction, Shrinkage and Credible Intervals]] — CONTAINS: Eq. 27-29, interval types, transplant shrinkage numbers.
- [[Roever 2020 - Posterior Predictive Checks and Frequentist Connection]] — CONTAINS: REML link example, posterior predictive $p$-value procedure, two-study results (Fig. 6-7), code.
- [[Roever 2020 - DIRECT Algorithm Implementation and Calibration]] — CONTAINS: internals, divergence formula, PIT calibration protocol (Fig. 8), code.
- [[Roever 2020 - Pediatric Liver Transplant Worked Example]] — CONTAINS: Tables 2-3, `bayesmeta` calls and outputs, posterior queries, risk difference, shrinkage, prior variations, Python reproduction.

## Sources

- Röver C (2020). Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package. *Journal of Statistical Software* 93(6). PDF (arXiv v2): Roever 2020 - Bayesian Random-Effects Meta-Analysis Using the bayesmeta R Package

## See Also

- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]], [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
- [[Hierarchical Models]], [[Constructing Priors for Effect Sizes]], [[Posterior Sampling and Summarization]]
