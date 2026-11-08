---
title: "Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview"
tags:
  - source/ingested
  - topic/causal-sensitivity
  - type/overview
  - doc/paper
source: "[[raw/Cinelli Hazlett 2020 - Making Sense of Sensitivity.pdf]]"
source_location: "Whole paper, pp. 1-41 (main text pp. 1-22, supplement pp. 23-41)"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Causal Sensitivity and Mediation/Cinelli Hazlett 2020 - Making Sense of Sensitivity"
doc_type: paper
depends_on:
  - "[[Omitted Variables Bias]]"
  - "[[Sensitivity Analysis in Observational Studies]]"
used_by:
  - "[[Cinelli Hazlett 2020 - Traditional OVB and Sensitivity Contours]]"
  - "[[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]]"
aliases:
  - Making Sense of Sensitivity
  - sensemakr paper
  - Cinelli and Hazlett 2020
---

# Cinelli Hazlett 2020 - Making Sense of Sensitivity - Overview

> [!summary]
> Cinelli & Hazlett (JRSS-B 2020) extend the classical omitted-variable-bias (OVB) formula into a sensitivity toolkit for OLS that needs no model of the confounder or of treatment assignment. Two partial-$R^2$ numbers, the **robustness value** $RV_q$ and the **extreme-scenario** $R^2_{Y\sim D|X}$, summarise how strong unobserved confounding must be to change a conclusion; a formal **bounding** procedure benchmarks that strength against observed covariates and replaces the misleading "informal benchmarks" used earlier. The key takeaway: robustness is an identification question, so it depends on the treatment-outcome partial $R^2$, not on sample size.

## Overview

**Research question.** If a regression estimate $\hat\tau_{res}$ of the effect of $D$ on $Y$ (controlling for $X$) would be causal under "no unobserved confounding", how strong would an omitted confounder (or group of confounders, possibly acting non-linearly) have to be, in association with *both* $D$ and $Y$, to change the research conclusion? And how can an analyst judge whether such a confounder is plausible?

**Contributions.**
1. Re-express the OVB in **partial $R^2$** parameters $R^2_{Y\sim Z|D,X}$ and $R^2_{D\sim Z|X}$ - scale-free, valid for any number of confounders, and extendable to standard errors and $t$-values.
2. Two reporting quantities computable from a regression table (estimate's $t$ and $df$): $RV_q$ (and $RV_{q,\alpha}$) and $R^2_{Y\sim D|X}$.
3. Graphics: contour plots of estimates and $t$-values; extreme-scenario curves.
4. **Formal bounds** "confounder at most $k$ times as strong as observed covariate $X_j$" - tight, and in three flavours (total $R^2$, partial $R^2$ given $X_{-j}$, partial $R^2$ given $X_{-j}$ and $D$).
5. Show **informal benchmarking** (Frank 2000; Imbens 2003; Hosman et al. 2010; Carnegie et al. 2016; etc.) can be wrong even with perfect knowledge of the confounder's relative strength (collider bias through $D$, plus $R^2$ vs Cohen's $f^2$ scale). Compare to the E-value and to Oster (2017).

**Running example.** Hazlett (2019): effect of being directly harmed in violence in Darfur on pro-peace attitudes ($\hat\tau_{res}=0.097$, $t=4.18$, $df=783$, $RV=13.9\%$).

## Main Content

### Headline numbers (Darfur, Table 1)

| Treatment | Est. | SE | $t$ | $R^2_{Y\sim D|X}$ | $RV$ | $RV_{\alpha=0.05}$ |
|---|---|---|---|---|---|---|
| Directly Harmed | 0.097 | 0.023 | 4.18 | 2.2% | 13.9% | 7.6% |

Bound for a confounder "as strong as Female": $R^2_{Y\sim Z|D,X}=12\%$, $R^2_{D\sim Z|X}=1\%$.

### Source Map

| Paper section | Content | Note |
|---|---|---|
| Abstract, Sec. 1 (pp. 1-3) | motivation, underuse of sensitivity analysis, contributions | this note |
| Sec. 2 (pp. 3-4) | Darfur running example, models (1)-(2) | [[Cinelli Hazlett 2020 - Darfur Application and Reporting]] |
| Sec. 3.1-3.2 (pp. 4-6) | OVB via Frisch-Waugh-Lovell, "impact times imbalance" | [[Cinelli Hazlett 2020 - Traditional OVB and Sensitivity Contours]] |
| Sec. 3.3, Fig. 1 (pp. 6-8) | bivariate contours, limitations of raw-coefficient parameterisation | [[Cinelli Hazlett 2020 - Traditional OVB and Sensitivity Contours]] |
| Sec. 4.1-4.2, Eqs. 7-17 | partial-$R^2$ bias, SE, relative bias, VRF/VIF | [[Cinelli Hazlett 2020 - Partial R2 Parameterization and Bias Formulas]] |
| Sec. 4.3, Eqs. 18-20 | $RV_q$, $RV_{q,\alpha}$, $R^2_{Y\sim D|X}$ | [[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]] |
| Sec. 4.4, Eqs. 21-22 | bounds via observed covariates | [[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]] |
| Sec. 4.5, Eqs. 23-24 | multiple / non-linear confounders | [[Cinelli Hazlett 2020 - Multiple and Nonlinear Confounders]] |
| Sec. 5.1-5.3, Table 1, Figs. 2-3 | minimal reporting, contours of estimate and $t$, extreme scenarios | [[Cinelli Hazlett 2020 - Darfur Application and Reporting]] |
| Sec. 6.1 | obstacles; Frank's impact thresholds, E-value | [[Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods]] |
| Sec. 6.2, Fig. 4 | informal benchmarking failure | [[Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods]] |
| Sec. 6.3 | Hosman et al. $t$-value parameterisation; Oster (2017) $\delta$ | [[Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods]] |
| Sec. 6.4 | sensitivity analysis as principled argument; caveats | [[Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods]] |
| Supp. A (A.1-A.5) | derivations of Eqs. 28-48; $RV$ algebra; impact thresholds for non-zero nulls | [[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]] |
| Supp. B (B.1-B.2) | derivation of bounds, Eqs. 49-84 | [[Cinelli Hazlett 2020 - Bounding Confounder Strength with Observed Covariates]] |
| Supp. C, Fig. 5 | numerical examples of informal-benchmark failure | [[Cinelli Hazlett 2020 - Informal Benchmarking Pitfalls and Related Methods]] |
| Supp. D, Table 2 | bias factor table | [[Cinelli Hazlett 2020 - Robustness Value and Extreme Scenarios]] |
| (not in paper) | planted-confounder check, PyMC sketch, marketing use | [[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]] |

## Motivating PyMC examples

From the PyMC challenges gallery (https://redam94.github.io/pymc-challenges/examples.html):
- **E107** "What a hidden confounder can do: sensitivity analysis on the job-training benchmark" (NSW/LaLonde; partial-$R^2$ OVB checked by planting confounders of exact strength; robustness values; balance after propensity matching).
- **E102** "Which way does the bias go? Hidden targeting, reach and the sign of a propensity estimate" (a hidden real feature as confounder; bias vs overlap).
- **E101** "Propensity scores in a brand lift study, graded by the experiment inside it".

## Examples

See [[Cinelli Hazlett 2020 - Darfur Application and Reporting]] for the worked Darfur numbers and [[Cinelli Hazlett 2020 - Planted Confounders and Bayesian Sketch]] for a simulation in which the bias formula is reproduced to machine precision.

## Connections

- Generalises the intuition in [[Omitted Variables Bias]] and [[Logic of Regression Adjustment]].
- Complements the Bayesian view in [[Sensitivity Analysis in Observational Studies]] and the experiment-graded sensitivity in [[Gordon et al 2019 - Sensitivity to Unobservables and Bias-Reduction Ratio]].
- Bayesian counterpart with a full posterior over a sensitivity parameter: [[Franks 2019 - Flexible Sensitivity Analysis Without Observable Implications - Overview]].
- Confounding in marketing: [[Observational vs Experimental Methods in Advertising]], [[Experimental Benchmarks for Observational Ad Measurement]].

## See Also

[[Potential Outcomes Framework]], [[DAGs and Causal Identification]], [[Propensity Score in Bayesian CI]]
