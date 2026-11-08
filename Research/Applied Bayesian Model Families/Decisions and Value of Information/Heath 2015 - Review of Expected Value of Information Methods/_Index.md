---
title: "Index: Heath 2015 - Review of Expected Value of Information Methods"
tags:
  - type/index
  - source/ingested
  - topic/decision-analysis
parent: "[[../_Index|Decisions and Value of Information]]"
date_updated: 2026-11-08
concept_count: 7
---

# Heath 2015 - Review of Expected Value of Information Methods

> [!abstract] Routing Summary
> Fully captures Heath, Manolopoulou and Baio (2015), *A Review of Methods for the Analysis of the Expected Value of Information* (arXiv:1507.02513): the EVPI/EVPPI definitions, nested Monte Carlo, the single-parameter and regression estimators, and the 28-parameter influenza-vaccine comparison with Table 1 transcribed. 7 notes.
> - Need the paper on one page or the section-to-note map? -> [[Heath 2015 - Review of Expected Value of Information Methods - Overview]]
> - Need net benefit, EVPI or the EVPPI formula (Eq. 1)? -> [[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]]
> - Need nested Monte Carlo, unit loss integral, or the linear-nuisance shortcut? -> [[Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations]]
> - Need the Strong-Oakley or Sadatsafavi single-parameter algorithms? -> [[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]]
> - Need EVPPI by GAM or Gaussian-process regression, or runnable code? -> [[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]]
> - Need Table 1, Figures 1-2, run times, or the vaccine model? -> [[Heath 2015 - Influenza Vaccine Case Study and Table 1]]
> - Need which method to pick, limitations, or key references? -> [[Heath 2015 - Discussion Limitations and Practical Guidance]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Net benefit; known-distribution net benefit | [[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]] | definition | [[Decision Analysis]] | $nb_t=ke_t-c_t$ |
| EVPPI (Eq. 1); EVPI | [[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]] | definition | net benefit | $\mathbb{E}_\phi[\max_t\mathbb{E}_{\psi\mid\phi}NB_t]-\max_t\mathbb{E}NB_t$ |
| Two-step Monte Carlo | [[Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations]] | definition | EVPPI | benchmark; about 55 min per parameter |
| Linear-nuisance approximation | [[Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations]] | definition | EVPPI | needs linearity and independence |
| Strong-Oakley blocking | [[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]] | definition | sorted PSA draws | EVPPI $\approx0$ for small $M$, $\to$ EVPI for large $M$ |
| Sadatsafavi segmentation | [[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]] | definition | sorted PSA draws | asymptotically unbiased at the true number of decision changes |
| Regression EVPPI | [[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]] | theorem | EVPPI | $\frac1S\sum\max_t\hat g_t-\max_t\frac1S\sum\hat g_t$ |
| Vaccine case study | [[Heath 2015 - Influenza Vaccine Case Study and Table 1]] | example | all estimators | all methods agree; $\beta_1,\omega_1$ top |
| Practical guidance | [[Heath 2015 - Discussion Limitations and Practical Guidance]] | concept | case study | GAM for 1 parameter, GP for $\ge6$ |

## Notes

- [[Heath 2015 - Review of Expected Value of Information Methods - Overview]] — CONTAINS: research question, contributions, key results, motivating PyMC examples (E87, E89, E90), Source Map.
- [[Heath 2015 - Net Benefit, EVPI and EVPPI Definitions]] — CONTAINS: Def. net benefit, known-distribution net benefit, $\phi/\psi$ split, EVPPI Eq. (1), EVPI; ordering theorem with proof sketch; worked two-option example.
- [[Heath 2015 - Nested Monte Carlo and Restrictive EVPPI Approximations]] — CONTAINS: two-step MC, numerical integration, unit loss, linear-nuisance and re-parametrisation.
- [[Heath 2015 - Single-Parameter EVPPI Strong-Oakley and Sadatsafavi]] — CONTAINS: both algorithms step by step, bias-controlled $M$, cumulative-sum visual tool, code sketch.
- [[Heath 2015 - Regression-Based EVPPI (GAM and Gaussian Process)]] — CONTAINS: regression model, five-step estimator, SAVI/BCEA, verified Python example, PyMC sketch.
- [[Heath 2015 - Influenza Vaccine Case Study and Table 1]] — CONTAINS: model, settings, full Table 1 (28 parameters x 5 methods), Figures 1-2, run times.
- [[Heath 2015 - Discussion Limitations and Practical Guidance]] — CONTAINS: decision guide, limitations, key references, checklist.

## Sources
- [[raw/Heath Manolopoulou Baio 2015 - A Review of Methods for the Analysis of the Expected Value of Information.pdf]] — arXiv:1507.02513v1 (9 Jul 2015), 13 PDF pages.

## See Also
- [[Value of Information Concept Note - EVPI, EVPPI and EVSI]] — EVSI and the price-of-information view (concept note).
- [[Decision Analysis]], [[From Inference to Decision]], [[Expected Information Gain]].
