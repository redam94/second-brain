---
title: "Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview"
tags:
  - source/ingested
  - topic/meta-analysis
  - type/overview
  - doc/paper
source: "[[raw/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package.pdf]]"
source_location: "Whole paper, J. Stat. Softw. 36(3), pp. 1-48"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Meta-Analysis/Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package"
doc_type: paper
depends_on:
  - "[[Hierarchical Models]]"
used_by:
  - "[[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]]"
  - "[[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]]"
  - "[[Viechtbauer 2010 - Effect Size Measures and escalc]]"
  - "[[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]]"
  - "[[Viechtbauer 2010 - BCG Vaccine Worked Example]]"
  - "[[Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots]]"
  - "[[Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis]]"
  - "[[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]]"
  - "[[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]]"
aliases:
  - metafor package paper
  - Viechtbauer metafor JSS 2010
---

# Viechtbauer 2010 - Conducting Meta-Analyses in R with the metafor Package - Overview

> [!summary]
> Viechtbauer (2010) describes the `metafor` R package, which fits fixed-, random- and mixed-effects meta-analysis models (including meta-regression with continuous and categorical moderators) as special cases of the heteroscedastic linear mixed model with known sampling variances. The paper walks through effect-size computation, seven $\tau^2$ estimators, Wald/Knapp-Hartung/likelihood-ratio/permutation inference, diagnostics, publication-bias tools and a 13-study BCG vaccine example whose random-effects estimate is $\hat\mu=-0.7145$ (relative risk 0.49, 95% CI 0.34 to 0.70) with $I^2=92.22\%$.

## Overview

**Research question.** Existing R packages (`meta`, `rmeta`) offered only limited moderator analysis and a single heterogeneity estimator (DerSimonian-Laird). How can a general-purpose package let analysts fit the full family of fixed, random and mixed (meta-regression) models, test and diagnose them, and probe publication bias, all from one interface?

**Contribution.** A package (v1.4-0 at publication) whose core function `rma.uni()` fits
$y_i=\theta_i+e_i$, $\theta_i=\beta_0+\sum_j\beta_jx_{ij}+u_i$ in two steps: estimate $\tau^2$ (HS, HE, DL, SJ, ML, REML or EB), then weighted least squares with $w_i=1/(v_i+\hat\tau^2)$. Around it sit `escalc()` (effect sizes), `forest/funnel/radial/qqnorm`, `influence/leave1out/cumul`, `ranktest/regtest/trimfill`, `anova` (LRT), `permutest` and `blup`.

**Key results (BCG data, log relative risk).**
- Random effects (REML): $\hat\mu=-0.7145$, SE 0.1798; $\hat\tau^2=0.3132$; $Q(12)=152.23$; $I^2=92.22\%$; $H^2=12.86$.
- Meta-regression on absolute latitude: $\hat\beta=-0.0280$ per degree ($p=0.006$); residual $\hat\tau^2=0.1108$ (65% of heterogeneity explained with latitude and year).
- Knapp-Hartung and permutation tests are more conservative and have nearer-nominal Type I error.

**Why it matters here.** The metafor model is the frequentist counterpart of the Bayesian normal-normal hierarchical model in [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]], and its Knapp-Hartung option is the HKSJ method evaluated in [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]].

## Main Content

### Source Map

| Paper section (pages) | Content | Covered in |
|---|---|---|
| 1 Introduction (pp. 1-3) | Definition of meta-analysis, software landscape, scope | this note; [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]] |
| 2.1 Random-effects model (p. 3) | Eq. (1)-(2) | [[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]] |
| 2.2 Mixed-effects model (pp. 3-4) | Eq. (3) | [[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]] |
| 2.3 Fixed vs random/mixed (pp. 4-5) | Eq. (4)-(5), conditional vs unconditional inference | [[Viechtbauer 2010 - Fixed, Random and Mixed-Effects Models]] |
| 2.4 Model fitting (p. 5) | Two-step fitting, estimator list, Wald tests, Q-test, BLUPs | [[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]] |
| 3.1 Calculating outcome measures (pp. 6-10) | `escalc()`, 2x2, MD/SMD, correlations, proportions, zero cells | [[Viechtbauer 2010 - Effect Size Measures and escalc]] |
| 3.2 Example (pp. 9-11) | BCG data, `dat.bcg`, formula interface | [[Viechtbauer 2010 - BCG Vaccine Worked Example]]; [[Viechtbauer 2010 - Effect Size Measures and escalc]] |
| 3.3 Fitting models (pp. 11-13) | `rma.uni()` arguments, `mods`, `btt`, `knha` | [[Viechtbauer 2010 - Fitting Models with rma, Moderators and Knapp-Hartung]] |
| 3.4 Example: RE, mixed, categorical, KH (pp. 13-21) | Figs. 1-2, outputs | [[Viechtbauer 2010 - BCG Vaccine Worked Example]] |
| 3.5 Fitted/predicted values, residuals (pp. 21-23) | Table 1, `predict`, `rstudent` | [[Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots]] |
| 3.5 Influence, leave-one-out (pp. 23-26) | Fig. 3 | [[Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots]] |
| 3.5 Plots: forest, funnel, radial, Q-Q (pp. 26-29) | Figs. 4-7 | [[Viechtbauer 2010 - Residuals, Influence Diagnostics and Plots]] |
| 3.5 Funnel asymmetry tests, trim and fill (pp. 29-32) | Fig. 8 | [[Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis]] |
| 3.5 Cumulative meta-analysis (pp. 32-33) | Fig. 9 | [[Viechtbauer 2010 - Publication Bias, Trim-and-Fill and Cumulative Meta-Analysis]] |
| 3.5 Fit statistics, LRT (pp. 33-34) | `fitstats`, `anova` | [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]] |
| 3.5 Permutation tests (pp. 34-37) | Fig. 10 | [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]] |
| 3.5 BLUPs (pp. 37-38) | Fig. 11 | [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]] |
| 3.6 Technical details (pp. 38-40) | Fisher scoring, truncation, assumptions | [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]]; [[Viechtbauer 2010 - tau2 Estimators, Q-Test and Heterogeneity Statistics]] |
| 4 Validation (p. 40) | Cross-software checks | [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]] |
| 5 Comparison of packages (pp. 40-42) | Table 2 | [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]] |
| 6 Conclusions (p. 42) | Mantel-Haenszel, Peto, independence caveat | [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]] |
| References (pp. 43-48) | about 70 citations | [[Viechtbauer 2010 - Technical Details, Validation and Package Comparison]] (key-reference map) |

### Headline numbers

| Analysis (BCG, log RR) | Estimate | Source |
|---|---|---|
| RE model, REML | $\hat\mu=-0.7145$ (95% CI -1.0669, -0.3622); RR 0.49 (0.34, 0.70) | Sec. 3.4 |
| $\hat\tau^2$ (SE) | 0.3132 (0.1664); $\hat\tau=0.5597$ | Sec. 3.4 |
| $I^2$, $H^2$ | 92.22%, 12.86 | Sec. 3.4 |
| Q test | $Q(12)=152.2330$, $p<.0001$ | Sec. 3.4 |
| Mixed: latitude + year | $\hat\beta_{\text{ablat}}=-0.0280$, residual $\hat\tau^2=0.1108$, $Q_M(2)=12.2043$ | Sec. 3.4 |
| LRT for latitude | $\text{LRT}=9.96$, $p=0.0016$, 87.73% of $\tau^2$ explained | Sec. 3.5 |
| Trim and fill (FE) | 4 missing studies, FE estimate -0.2910 | Sec. 3.5 |

## Examples

The full BCG analysis, with independent Python reproduction of $\hat\tau^2_{\text{REML}}$, $\hat\mu$, $I^2$, $H^2$, BLUPs and the Knapp-Hartung meta-regression, is in [[Viechtbauer 2010 - BCG Vaccine Worked Example]].

## Connections

- Relevance to marketing measurement: a meta-analysis of $k$ geo or lift experiments is exactly this model. Let $y_i$ be study $i$'s estimated incremental ROAS (or log lift) with standard error $\sqrt{v_i}$; $\mu$ is the average true effect across the population of tests the brand could have run, and $\tau^2$ is how much true incrementality varies by channel, campaign or market. Moderators (channel, season, spend level) give a meta-regression. Compare with [[Geo-Experiment Methodology - Overview]] and [[Marketing Generalizations Overview]].
- The two-stage random-effects model is a frequentist special case of [[Hierarchical Models]] with partial pooling (see BLUP shrinkage in [[Viechtbauer 2010 - LRT, Permutation Tests, BLUPs and Model Fit]] and [[Partial Pooling as Multiple Comparisons Correction]]).
- Publication-bias and small-study diagnostics connect to [[Researcher Degrees of Freedom]] and [[Ioannidis 2005 - Why Most Published Findings Are False - Overview]].

## See Also

- [[Roever 2020 - Bayesian Random-Effects Meta-Analysis with bayesmeta - Overview]]
- [[IntHout 2014 - HKSJ vs DerSimonian-Laird Random-Effects Meta-Analysis - Overview]]
