---
title: "Index: Franks DAmour Feller 2019 - Flexible Sensitivity Analysis Without Observable Implications"
tags:
  - type/index
  - source/ingested
  - topic/causal-sensitivity
parent: "[[../_Index|Causal Sensitivity and Mediation]]"
date_updated: 2026-11-08
concept_count: 10
---

# Franks DAmour Feller 2019 - Flexible Sensitivity Analysis Without Observable Implications

> [!abstract] Routing Summary
> This folder fully captures Franks, D'Amour & Feller (2019/2020), *Flexible sensitivity analysis for observational studies without observable implications* (JASA; arXiv:1809.00399): Tukey's factorization for causal inference, the copula-invariance theorem for marginal contrasts, logistic selection with exponential-family mixtures, calibration by implicit $R^2$, and the NHANES and JTPA applications. It contains 7 notes plus this index.
> - Need the paper on one page or the section-to-note map? → [[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]]
> - Need why identified sensitivity parameters in latent-confounder models are a problem? → [[Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls]]
> - Need Tukey's factorization, Conditions 1-2, Theorem 1 or the copula? → [[Franks 2019 - Tukey Factorization and Marginal Contrast Estimands]]
> - Need the closed-form missing distributions (Props 1-2, Examples 2-4)? → [[Franks 2019 - Logistic Selection with Exponential Family Mixtures]]
> - Need the meaning of the signs of $\gamma_0,\gamma_1$ or Proposition 3? → [[Franks 2019 - Calibrating Sensitivity Parameters]]
> - Need the NHANES or JTPA analyses? → [[Franks 2019 - NHANES and Job Training Applications]]
> - Need limitations or a PyMC sketch for hidden targeting (E102-E103)? → [[Franks 2019 - Discussion Limits and Bayesian Sketch]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Identified vs unidentified sensitivity parameters | Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls | concept | [[Sensitivity Analysis in Observational Studies]] | latent-class model: data identify the parameters |
| Tukey factorization | Franks 2019 - Tukey Factorization and Marginal Contrast Estimands | definition | unidentified selection function | $f^{mis}\propto f^{obs}\cdot f(T=1-t|Y)/f(T=t|Y)$ |
| Condition 1 / 2 | Franks 2019 - Tukey Factorization and Marginal Contrast Estimands | definition | Eq. 3 | integral constraint; outcome overlap |
| Theorem 1 | Franks 2019 - Tukey Factorization and Marginal Contrast Estimands | theorem | Eq. 5 | marginal contrasts invariant to the copula |
| Logistic selection | Franks 2019 - Logistic Selection with Exponential Family Mixtures | definition | Eq. 7 | $\gamma_t$ shifts natural parameter |
| Props 1-2 | Franks 2019 - Logistic Selection with Exponential Family Mixtures | theorem | Eq. 8 | closed-form missing distribution (mixtures) |
| Calibration identity | Franks 2019 - Calibrating Sensitivity Parameters | theorem | implicit $R^2$ | $|\gamma_t|=\sigma_{rt}^{-1}\sqrt{\rho^2/(1-\rho^2)\,(\text{Var}\,m+\pi^2/3)}$ |
| Sign interpretation | Franks 2019 - Calibrating Sensitivity Parameters | concept | Eq. 7 | same-sign: fast ATE change |
| NHANES / JTPA | Franks 2019 - NHANES and Job Training Applications | example | Props 1-3 | ATE $-0.7\to-5.6$ mmHg at $(0.03,0.05)$ |
| Limits, hidden targeting | Franks 2019 - Discussion Limits and Bayesian Sketch | concept | Condition 2 | outcome-overlap and tail-dependence caveats |

## Notes

- [[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]] — CONTAINS: research question, contributions, Source Map, E102/E62/E107 links.
- [[Franks 2019 - Identified Sensitivity Parameters and Latent Confounder Pitfalls]] — CONTAINS: Sec. 2: setup, estimands, Asm. 1, Eq. 1, Example 1/Fig. 1, snooping and refit costs, related methods.
- [[Franks 2019 - Tukey Factorization and Marginal Contrast Estimands]] — CONTAINS: Sec. 3: Eq. 3-6, Conditions 1-2, Def. 1, Thm 1 + proof, Cor. 1.1.
- [[Franks 2019 - Logistic Selection with Exponential Family Mixtures]] — CONTAINS: Sec. 4: Eq. 7-14, Props 1-2, Examples 2-4, sign-convention warning, Gaussian tilt check.
- [[Franks 2019 - Calibrating Sensitivity Parameters]] — CONTAINS: Sec. 5: Examples 5-7, implicit $R^2$, Prop. 3 + proof, numerical check.
- [[Franks 2019 - NHANES and Job Training Applications]] — CONTAINS: Sec. 6, App. B: BART/NHANES, DP-mixture/JTPA, calibration numbers, results.
- [[Franks 2019 - Discussion Limits and Bayesian Sketch]] — CONTAINS: Sec. 7: advantages, limits, extensions; PyMC grid sketch; retargeting sign example.

## Sources
- [[raw/Franks DAmour Feller 2019 - Flexible Sensitivity Analysis Without Observable Implications.pdf]] — Franks AM, D'Amour A, Feller A (2019/2020), JASA, arXiv:1809.00399v3; 38 pp. Sole source. (Substituted for McCandless-Gustafson-Levy 2007, which has no open copy found.)

## See Also
- [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]], [[Imai 2010 - Causal Mediation Analysis - Overview]], [[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]] — cluster siblings.
- [[Unidentified Parameters - Partial Identification and Bayesian Updating]] — why sensitivity parameters stay prior-driven.
- [[Sensitivity Analysis in Observational Studies]], [[Propensity Score in Bayesian CI]], [[Chipman 2010 - BART - Overview]].
