---
title: "Simoiu 2017 - Model Checks Robustness and Placebo Tests"
tags:
  - source/ingested
  - topic/applied-latent-models
  - type/concept
  - doc/paper
source: "[[raw/Simoiu 2017 - The Problem of Infra-Marginality in Outcome Tests for Discrimination.pdf]]"
source_location: "Sec. 3.5, pp. 13-17; Figures 7-10"
date_ingested: 2026-11-08
folder: "Applied Bayesian Model Families/Applied Latent Models for Public Questions/Simoiu 2017 - Infra-Marginality and the Threshold Test"
doc_type: paper
depends_on:
  - "[[Simoiu 2017 - Threshold Test Generative Model]]"
  - "[[Simoiu 2017 - North Carolina Traffic Stops and the Three Tests]]"
used_by:
  - "[[Simoiu 2017 - Limitations Extensions and Identification Ridge]]"
  - "[[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]"
aliases:
  - "threshold test robustness"
  - "placebo tests threshold"
  - "posterior predictive threshold test"
---

# Simoiu 2017 - Model Checks Robustness and Placebo Tests

> [!summary]
> Posterior predictive checks recover search rates almost perfectly (RMSE 0.1%) and hit rates well (RMSE 2.9%). The black/Hispanic versus white/Asian threshold gap persists under stop-level threshold heterogeneity ($\sigma$ up to 5 points), when fitting separately by gender, time of day, year and age, when restricting to probable-cause searches, and placebo tests (day of week, season) show no spurious gaps.

## Main Content

> [!definition] Posterior predictive check (Fig. 7)
> For each of 2,500 posterior draws $\theta^*$, compute analytically the model-implied search and hit rates $s^*_{rd},h^*_{rd}$ for each race-department pair, average them, and compare with observed rates. Reported root mean squared prediction error (stop-weighted): 0.1% (search), 2.9% (hit); the largest groups have almost no error.
^def-ppc

> [!definition] Heterogeneous-threshold robustness (Fig. 8)
> Start from the fitted model. For each stop draw a signal from the inferred race-department signal distribution; set a stop-specific threshold $T\sim N(t_{rd},\sigma)$; search iff $p\ge T$; hit with probability $p$. Re-run the threshold test on the synthetic data for $\sigma\in[0,0.05]$. Result: inferred thresholds are stable and the white/Asian vs black/Hispanic gap persists. A five-point change in thresholds is large: lowering the black threshold by five points in each department would more than triple the state-wide black search rate.
^def-heterogeneity

**Omitted-variable bias.** The signal absorbs unobserved covariates, but the threshold could differ systematically by something correlated with race (night stops). Because only policy-relevant factors may legitimately shift a threshold, the authors refit separately on subsets by year, time of day, age and gender (gender for completeness) (Fig. 9): thresholds vary across subsets but blacks and Hispanics always face lower thresholds than whites. Midnight stops (4.7%) are excluded from the time-of-day analysis as likely mis-recorded; ages under 16 or over 105 excluded (0.1%).

**Search-type confound.** Protective frisks need only reasonable suspicion; probationers are also subject to the lower standard; incident-to-arrest searches may be routine. Redefine "search" as probable-cause only and without "other official info" as a trigger: thresholds for blacks and Hispanics are 8% and 21% versus 40% (whites) and 38% (Asians). Levels rise (higher standard) but the gap remains. The suspected offence (cocaine vs marijuana) is not recorded, so a severity confound cannot be tested.

> [!example] Placebo tests (Fig. 10)
> Replace race by day of week, then by season, and refit. Credible intervals overlap broadly, so the model does not hallucinate "discrimination" where none is expected; small variations are plausible (legitimate seasonal or weekday standards). Interpretation: a method that finds gaps for race but not for arbitrary labels has some face validity.
^ex-placebo

## Connections
[[Posterior Predictive Checking]], [[Simulation-Based Calibration - Overview]] (the synthetic-data heterogeneity test is a recovery check), [[Prior Predictive Checking]].

## See Also
[[Simoiu 2017 - Infra-Marginality and the Threshold Test - Overview]]
