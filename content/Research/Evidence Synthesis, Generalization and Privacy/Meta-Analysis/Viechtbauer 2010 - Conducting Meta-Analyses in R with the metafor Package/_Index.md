---
title: "Index: Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package"
tags:
  - type/index
  - source/ingested
  - topic/meta-analysis
parent: "[[../_Index|Meta-Analysis]]"
date_updated: 2026-11-08
concept_count: 10
---

# Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package

> [!abstract] Routing Summary
> This folder fully captures Viechtbauer (2010), *Conducting Meta-Analyses in R with the metafor Package* (J. Stat. Softw. 36(3)): fixed, random and mixed-effects meta-analysis models, $\tau^2$ estimators, the Q-test, $I^2$/$H^2$, meta-regression, Knapp-Hartung, likelihood-ratio and permutation tests, diagnostics, funnel/forest/radial/Q-Q plots, trim and fill, cumulative meta-analysis, BLUPs and the 13-study BCG vaccine example. It also gives formal statements of DerSimonian-Laird (1986) and Higgins-Thompson (2002). 10 notes.
> - Need the paper on one page, headline BCG numbers, or the section-to-note map? -> [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]]
> - Need the model equations (random, mixed, fixed targets) and the conditional versus unconditional inference distinction? -> [[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]]
> - Need DerSimonian-Laird, Cochran's Q, I-squared, H-squared, the seven $\tau^2$ estimators, truncation and Fisher scoring? -> [[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]
> - Need effect-size formulas (RR, OR, RD, SMD, Fisher z, logit...) and zero-cell handling? -> [[Viechtbauer 2010 - Effect Size Measures and escalc]]
> - Need `rma()` syntax, moderators, omnibus test, categorical coding, Knapp-Hartung? -> [[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]]
> - Need the full BCG analysis with tables and a Python reproduction? -> [[Viechtbauer 2010 - BCG Vaccine Worked Example]]
> - Need residuals, Cook's distance, leave-one-out, forest/funnel/radial/Q-Q plots, or Table 1 (API map)? -> [[Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots]]
> - Need publication-bias tests, trim and fill, or cumulative meta-analysis? -> [[Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis]]
> - Need LRT, permutation tests, BLUP shrinkage or fit statistics? -> [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]]
> - Need assumptions and caveats, validation, the package comparison (Table 2), Mantel-Haenszel/Peto, or the reference map? -> [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Observed-effect model $y_i=\theta_i+e_i$ | [[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]] | definition | [[Hierarchical Models]] | known $v_i$, normal errors |
| Random- and mixed-effects models | [[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]] | definition | observed-effect model | $\theta_i=\mu+u_i$ / meta-regression |
| Fixed vs random inference | [[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]] | theorem | models | FE is conditional, not homogeneity |
| Cochran's Q | [[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]] | definition | FE weights | $Q\sim\chi^2_{k-1}$ under $\tau^2=0$ |
| DerSimonian-Laird estimator | [[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]] | theorem | Q | $(Q-(k-1))/(\sum w-\sum w^2/\sum w)$ |
| $H^2$, $I^2$ | [[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]] | definition | $\tau^2$ | BCG 92.22%, 12.86 |
| Outcome measures | [[Viechtbauer 2010 - Effect Size Measures and escalc]] | concept | none | RR, OR, RD, SMD, ZCOR, PLO... |
| `rma.uni`, omnibus test | [[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]] | definition | models | $Q_M$, `btt` |
| Knapp-Hartung | [[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]] | definition | `rma.uni` | $s^2(X^\top WX)^{-1}$, $t_{k-p}$ |
| BCG example | [[Viechtbauer 2010 - BCG Vaccine Worked Example]] | example | all above | RR 0.49; latitude explains 65-88% |
| Residuals, influence | [[Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots]] | concept | BCG | studies 7, 13 outliers; 4 influential |
| Asymmetry tests, trim and fill | [[Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis]] | definition | funnel plot | 4 missing studies; effect stays significant |
| Cumulative meta-analysis | [[Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis]] | definition | RE model | drift reflects latitude |
| LRT for moderators | [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]] | theorem | ML fits | LRT 9.96, $p=0.0016$ |
| Permutation test | [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]] | definition | Wald tests | $p=0.0015$ exact (RE) |
| BLUP shrinkage | [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]] | definition | RE model | $\lambda_iy_i+(1-\lambda_i)\hat\mu$ |
| Model assumptions | [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]] | theorem | all | known $v_i$, plug-in $\tau^2$, normality, independence |

## Notes

- [[Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview]] — CONTAINS: research question, contribution, headline BCG numbers, full Source Map (all sections, Tables 1-2, Figures 1-11 -> notes).
- [[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]] — CONTAINS: Eq. (1)-(5); definitions of the three models; theorem on conditional vs unconditional inference; BCG interpretation.
- [[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]] — CONTAINS: estimator table (HS, HE, DL, SJ, ML, REML, EB); Cochran's Q; DL theorem with proof of $E[Q]$; Higgins-Thompson $H^2$, $I^2$; Fisher scoring and truncation; BCG check; Python.
- [[Viechtbauer 2010 - Effect Size Measures and escalc]] — CONTAINS: all `escalc` measures with formulas, zero-cell options, formula interface, trial-1 hand computation.
- [[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]] — CONTAINS: `rma.uni` signature, moderator specification, omnibus test, categorical coding, Knapp-Hartung definition and verified example, Python meta-regression.
- [[Viechtbauer 2010 - BCG Vaccine Worked Example]] — CONTAINS: 13-study data table, RE and mixed model outputs, predictions by latitude, categorical moderator, KH, Type I simulation, Python reproduction.
- [[Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots]] — CONTAINS: Table 1 (function map), standardized residuals, influence measures, leave-one-out table, forest/funnel/radial/Q-Q plots.
- [[Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis]] — CONTAINS: rank/regression asymmetry tests, trim and fill, cumulative forest plot, copas pointer, BCG results.
- [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]] — CONTAINS: fit statistics, LRT theorem and BCG example, permutation test definition and results, BLUP definition and values, exact sign-permutation Python.
- [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]] — CONTAINS: introduction context, four assumptions, validation, Table 2 comparison, Mantel-Haenszel/Peto, reference map.

## Sources

- Viechtbauer W (2010). Conducting Meta-Analyses in R with the metafor Package. *Journal of Statistical Software* 36(3), 1-48. PDF: Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package

## See Also

- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]], [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
- [[Hierarchical Models]], [[Partial Pooling as Multiple Comparisons Correction]]
