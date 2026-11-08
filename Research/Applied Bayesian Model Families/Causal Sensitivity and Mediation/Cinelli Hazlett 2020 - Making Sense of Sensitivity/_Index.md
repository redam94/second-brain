---
title: "Index: Cinelli Hazlett 2020 - Making Sense of Sensitivity"
tags:
  - type/index
  - source/ingested
  - topic/causal-sensitivity
parent: "[[../_Index|Causal Sensitivity and Mediation]]"
date_updated: 2026-11-08
concept_count: 10
---

# Cinelli Hazlett 2020 - Making Sense of Sensitivity

> [!abstract] Routing Summary
> This folder fully captures Cinelli & Hazlett (2020), *Making Sense of Sensitivity: Extending Omitted Variable Bias* (JRSS-B): the partial-$R^2$ form of the OVB identity, the robustness value $RV_q$, the extreme-scenario $R^2_{Y\sim D|X}$, formal bounds from observed covariates, multiple/non-linear confounders, the Darfur application, the failure of informal benchmarking, and a vault synthesis (planted confounders, Bayesian sketch). It contains 9 notes plus this index, covering all tables, figures and supplement derivations.
> - Need the paper on one page, headline numbers or the section-to-note map? → [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]]
> - Need the classical OVB, impact times imbalance, or raw-coefficient contour plots? → [[Cinelli Hazlett 2020 - Traditional OVB and Sensitivity Contours]]
> - Need the partial-$R^2$ bias, SE and relative-bias formulas with proof? → [[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]]
> - Need the robustness value, RV with significance, or the extreme-scenario statistic? → [[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]]
> - Need to bound a confounder as '$k$ times as strong as' an observed covariate? → [[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]]
> - Need multiple or non-linear confounders? → [[Cinelli Hazlett 2020 - Multiple and Nonlinear Confounders]]
> - Need the Darfur numbers, Table 1 or contour reading? → [[Cinelli Hazlett 2020 - Darfur Application and Reporting]]
> - Need why informal benchmarks fail, or comparisons with E-value, Oster and Frank? → [[Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods]]
> - Need a planted-confounder check or a PyMC prior over confounder strength? → [[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Impact times imbalance | Cinelli Hazlett 2020 - Traditional OVB and Sensitivity Contours | definition | [[Omitted Variables Bias]] | $\hat\tau_{res}=\hat\tau+\hat\gamma\hat\delta$ |
| OVB in partial $R^2$ | Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas | theorem | impact times imbalance | bias $=\sqrt{R^2_YR^2_D/(1-R^2_D)}\sqrt{df}\,\text{se}$ |
| Relative bias / bias factor | Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas | theorem | OVB in partial $R^2$ | $BF/|f_{Y\sim D|X}|$ |
| Robustness value | Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios | definition | relative bias | $RV_q=\tfrac12(\sqrt{f_q^4+4f_q^2}-f_q^2)$ |
| Extreme scenario | Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios | theorem | relative bias | $R^2_{D\sim Z|X}\ge R^2_{Y\sim D|X}$ with $R^2_{Y\sim Z|D,X}=1$ |
| Formal bounds $k_D,k_Y$ | Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates | theorem | partial $R^2$ bias | $R^2_{D\sim Z|X}=k_Df^2$, $R^2_{Y\sim Z|D,X}\le\eta^2f^2$ |
| Multiple confounders | Cinelli Hazlett 2020 - Multiple and Nonlinear Confounders | theorem | partial $R^2$ bias | single-confounder formulas are upper bounds |
| Darfur reporting table | Cinelli Hazlett 2020 - Darfur Application and Reporting | example | RV, bounds | RV 13.9%, $RV_\alpha$ 7.6%, $R^2_{Y\sim D|X}$ 2.2% |
| Informal benchmark failure | Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods | concept | bounds | 0.30 vs $-0.008$ in the Fig. 4 simulation |
| Planted confounder check | Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch | example | all formulas | formula equals actual bias to 15 digits |

## Notes

- [[Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview]] — CONTAINS: research question, contributions, headline numbers, full Source Map (every section, table, figure, supplement part → note), PyMC example links.
- [[Cinelli Hazlett 2020 - Traditional OVB and Sensitivity Contours]] — CONTAINS: Sec. 1-3: Def. OVB (FWL), imbalance vs impact, Fig. 1 contours, `Center` example, shortcomings of raw coefficients, Python grid.
- [[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]] — CONTAINS: Eqs. 7-17: Thm OVB in partial $R^2$ + proof, SE formula, relative bias and bias factor, VRF/VIF decomposition, equivalent parameterisations, worked 1x-3x Female example, Python.
- [[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]] — CONTAINS: Eqs. 18-20, 34-48: $RV_q$, $RV_{q,\alpha}$ derivations, caveat conditions, extreme-scenario theorem, Table 2 bias-factor excerpt, Frank impact counterexample, Python.
- [[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]] — CONTAINS: Eqs. 21-22, 49-84: $k_D,k_Y$, tight bounds with $\eta$, simulation verification, total/partial/conditional-on-$D$ variants, feasibility, Python.
- [[Cinelli Hazlett 2020 - Multiple and Nonlinear Confounders]] — CONTAINS: Eqs. 23-24: composite $Z^*$ theorem, df correction, non-linear and misspecification cases, Python check.
- [[Cinelli Hazlett 2020 - Darfur Application and Reporting]] — CONTAINS: Sec. 2, 5: model (1)-(2), Table 1, Fig. 2 contour points, Fig. 3 extreme scenarios, Python.
- [[Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods]] — CONTAINS: Sec. 6, Supp. C: collider mechanism, Fig. 4/5 reproduction, Frank, E-value, Hosman, Oster, principled-argument caveats.
- [[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]] — CONTAINS: vault synthesis: planting procedure, exact check, PyMC prior over $(R^2_Y,R^2_D)$, marketing reading.

## Sources
- [[raw/Cinelli Hazlett 2020 - Making Sense of Sensitivity.pdf]] — Cinelli C, Hazlett C (2020), JRSS-B 82(1): 39-67; 41 pp. incl. supplement. Sole source.

## See Also
- [[Imai 2010 - Causal Mediation Analysis - Overview]], [[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]], [[Rosenman 2020 - Combining Observational and Experimental Datasets - Overview]] — siblings in this cluster.
- [[Omitted Variables Bias]], [[Sensitivity Analysis in Observational Studies]], [[Logic of Regression Adjustment]], [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]].
