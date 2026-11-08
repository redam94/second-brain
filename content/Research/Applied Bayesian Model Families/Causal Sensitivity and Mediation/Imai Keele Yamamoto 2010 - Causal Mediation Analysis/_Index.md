---
title: "Index: Imai Keele Yamamoto 2010 - Causal Mediation Analysis"
tags:
  - type/index
  - source/ingested
  - topic/causal-sensitivity
parent: "[[../_Index|Causal Sensitivity and Mediation]]"
date_updated: 2026-11-08
concept_count: 11
---

# Imai Keele Yamamoto 2010 - Causal Mediation Analysis

> [!abstract] Routing Summary
> This folder fully captures Imai, Keele & Yamamoto (2010), *Identification, Inference and Sensitivity Analysis for Causal Mediation Effects* (Statistical Science 25(1): 51-71): natural direct/indirect effects, sequential ignorability and Theorem 1, the Baron-Kenny LSEM interpretation, nonparametric estimation, the $\rho$ sensitivity analysis (Theorem 4, Corollary 1) and the media-framing application. It contains 7 notes plus this index.
> - Need the paper on one page or the section-to-note map? → [[Imai 2010 - Causal Mediation Analysis - Overview]]
> - Need $\delta_i(t)$, ACME, sequential ignorability or Theorem 1 with proof? → [[Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability]]
> - Need how this compares with Pearl, Robins, Petersen, Rubin? → [[Imai 2010 - Identification Compared with Pearl Robins and Principal Strata]]
> - Need Baron-Kenny as a causal estimator, interaction, or estimators and variances? → [[Imai 2010 - LSEM Baron-Kenny Interaction and Estimation]]
> - Need the $\rho$ sensitivity analysis, Theorem 4, Corollary 1, $R^2$ forms or nonparametric bounds? → [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]]
> - Need Tables 1-3, Figs. 1-2 or the Monte Carlo study? → [[Imai 2010 - Media Framing Application and Simulation]]
> - Need a Bayesian PyMC sketch for marketing halo effects (E35) or the paper's limitations? → [[Imai 2010 - Bayesian Mediation Sketch for Halo Effects]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| ACME / natural direct effect | Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability | definition | [[Potential Outcomes Framework]] | $\tau=\delta(t)+\zeta(1-t)$ |
| Sequential ignorability | Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability | definition | randomised $T$ + ignorable $M|T,X$ | no post-treatment confounders allowed |
| Theorem 1 | Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability | theorem | Asm. 1 | ACME nonparametrically identified |
| Identification comparison | Imai 2010 - Identification Compared with Pearl Robins and Principal Strata | concept | Thm 1 | trade-off: post-treatment confounders vs no-interaction |
| Theorem 2 (LSEM) | Imai 2010 - LSEM Baron-Kenny Interaction and Estimation | theorem | Thm 1 | ACME $=\beta_2\gamma$ |
| Assumption 2 | Imai 2010 - LSEM Baron-Kenny Interaction and Estimation | definition | Thm 2 | $\bar\delta(1)=\bar\delta(0)$ |
| Theorem 3 | Imai 2010 - LSEM Baron-Kenny Interaction and Estimation | theorem | Eq. 18 | asymptotic variance of NP estimator |
| Theorem 4 | Imai 2010 - Sensitivity Analysis with Error Correlation Rho | theorem | Thm 2 | $\bar\delta=\beta_2\frac{\sigma_1}{\sigma_2}\{\tilde\rho-\rho\sqrt{(1-\tilde\rho^2)/(1-\rho^2)}\}$ |
| Corollary 1 | Imai 2010 - Sensitivity Analysis with Error Correlation Rho | theorem | Thm 4 | $\rho\in(-1,1)$, ACME $\in(-\infty,\infty)$ |
| Media framing results | Imai 2010 - Media Framing Application and Simulation | example | Thms 2,4 | ACME $-0.51$; sign holds unless $\rho<-0.68$ |
| Bayesian halo sketch | Imai 2010 - Bayesian Mediation Sketch for Halo Effects | example | Eq. 20 | counterfactual propagation from posterior draws |

## Notes

- [[Imai 2010 - Causal Mediation Analysis - Overview]] — CONTAINS: research question, contributions, Source Map, E35 link, worked example.
- [[Imai 2010 - Potential Outcomes Mediation Effects and Sequential Ignorability]] — CONTAINS: Def. ACME/NDE/total; Asm. 1; Thm 1 and Appendix A proof; discrete-$M$ formula; binary example; Python.
- [[Imai 2010 - Identification Compared with Pearl Robins and Principal Strata]] — CONTAINS: Sec. 3.3 table: Pearl (6)-(7), FRCISTG (8)-(9), Petersen (10), Hafeman, Rubin principal strata, Sobel.
- [[Imai 2010 - LSEM Baron-Kenny Interaction and Estimation]] — CONTAINS: Eqs. 11-20: BK model, Thm 2 + proof, Asm. 2, interaction model, Delta/Goodman variances, NP estimators, Thm 3, Python.
- [[Imai 2010 - Sensitivity Analysis with Error Correlation Rho]] — CONTAINS: Eq. 24, Thm 4 + proof, Cor. 1, Appendix C, $R^2$ interpretation, nonparametric bounds (Eq. 29), simulation check, Python.
- [[Imai 2010 - Media Framing Application and Simulation]] — CONTAINS: Sec. 2, 4.3, 6: Tables 1-3, Figs. 1-2, Monte Carlo design and Table 2, Python.
- [[Imai 2010 - Bayesian Mediation Sketch for Halo Effects]] — CONTAINS: Sec. 7 limitations; mapping to Meta-search halo; PyMC NB sketch; Bayesian sensitivity.

## Sources
- Imai Keele Yamamoto 2010 - Identification Inference and Sensitivity Analysis for Causal Mediation — Imai K, Keele L, Yamamoto T (2010), Stat. Sci. 25(1): 51-71, arXiv:1011.1079; 21 pp. Sole source. (Substituted for the suggested Imai-Keele-Tingley 2010 Psych. Methods paper, which has no stable open copy found.)

## See Also
- [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]] — OVB-style sensitivity for regression.
- [[Instrumental Variables and Principal Stratification]], [[Potential Outcomes Framework]], [[DAGs and Causal Identification]], [[Sensitivity Analysis in Observational Studies]].
