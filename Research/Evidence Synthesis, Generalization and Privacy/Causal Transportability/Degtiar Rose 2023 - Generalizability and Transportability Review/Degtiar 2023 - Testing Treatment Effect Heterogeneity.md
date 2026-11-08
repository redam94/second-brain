---
title: "Degtiar 2023 - Testing Treatment Effect Heterogeneity"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/concept
  - doc/paper
source: "[[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]]"
source_location: "Sec. 4.3 and closing paragraph of Sec. 4, PDF pp. 10-12"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Degtiar Rose 2023 - Generalizability and Transportability Review"
doc_type: paper
depends_on:
  - "[[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]]"
used_by:
  - "[[Degtiar 2023 - Weighting and Matching Methods]]"
  - "[[Degtiar 2023 - Recommendations, Summary-Level Methods and Comparison Tables]]"
aliases:
  - Treatment effect heterogeneity tests
  - Effect modification tests generalizability
  - What to do when generalizability fails
---

# Degtiar 2023 - Testing Treatment Effect Heterogeneity

> [!summary]
> Population differences matter only through effect modifiers, so the review catalogues tests of whether effects vary: pre-specified subgroup and interaction tests (low power), data-driven subgroup discovery (qualitative-interaction methods, tree and BART variants), and global tests (baseline-risk interaction, Crump et al. test of constant CATE, variance and distribution-shift tests). If generalizability fails and strong ignorability does not hold, Tipton (2013b) offers three paths: change the estimand, keep it and state limitations, or run a different study.

## Overview

"Identified population differences are relevant insofar as they correspond to differences in treatment effect modifiers." The tests below are suitable for observational or RCT data but have mostly been demonstrated in RCTs. Some need a priori subgroups, others discover them; most require **individual-level data**. A subtle point: studies whose enrollees are **homogeneous** in effect modifiers will have difficulty identifying heterogeneity, so these tests are best applied to data *representative of the target population* (Gunter, Zhu and Murphy 2011).

## Main Content

### Pre-specified subgroups

- Test subgroups under- or over-represented in the study, or any other clinically relevant subgroup expected to show heterogeneity.
- Power is limited, particularly when several modifiers are tested individually and multiplicity adjustment is applied.
- **Interaction in a linear model**: test the treatment-by-modifier term; requires linearity and additivity assumptions (Fang 2017; Gabler et al. 2009).
- **Sequential tests** for treatment-covariate interactions (Qian, Chakraborty and Maiti 2019), for randomized or observational data.
- Alternative goals: test whether the CATE is identical across predefined subgroups (Crump et al. 2008; Green and Kern 2012); compare subgroup effects to the average effect (Simon 1982); detect **qualitative interactions** or treatment differences exceeding a clinical threshold (Gail and Simon 1985).

### Data-driven subgroup discovery

| Approach | Idea | Source |
|---|---|---|
| Qualitative-interaction identification | variables for which the optimal treatment differs by subgroup | Gunter, Zhu and Murphy 2011 |
| Magnitude of interaction | estimate size of interaction | Chen et al. 2017; Tian et al. 2014 |
| Tree-based methods (CART, BART variants) | recursively partition covariate space toward homogeneous terminal nodes; useful when heterogeneity is a complex combination of factors | Su et al. 2008, 2009; Lipkovich et al. 2011; Green and Kern 2012; Athey and Imbens 2016 |

### Global tests (many or unknown modifiers)

- Pearl (2015) gives conditions for identifying effect heterogeneity (including heterogeneity due to *unmeasured* modifiers) for randomized trials with binary treatments, situations with no unobserved confounders, and with mediating instruments.
- **Baseline risk as the modifier**: interaction-based tests for differences in baseline risk between study and target control groups (Varadhan, Henderson and Weiss 2016; Weiss, Segal and Varadhan 2012). Avoids multiple testing but needs target outcome data and modeling assumptions.
- A consistent nonparametric test for constant conditional average treatment effects, $\tau_x=\tau\ \forall x\in\mathcal X$ (Crump et al. 2008).
- Others (limited power, based on SATE estimates): equal variances of potential outcomes across arms; constant-shift of treatment/control outcome CDFs (Fang 2017).
- Global tests do not identify *which* subgroups drive heterogeneity; after rejection one can compare individual subgroups.

### When generalizability fails

If assessments show the target is not well represented by the study (strong ignorability fails), Tipton (2013b) recommends:

> [!definition] Three paths forward
> 1. **Change the target population** to one represented by the study: align inclusion/exclusion criteria, outcome timepoints or treatment doses (Hernan et al. 2008; Weisberg, Hayden and Pontes 2009). A **population coverage percentage** then summarizes the overlap between the new and original target-sample propensity scores and describes relevant differences from the original target.
> 2. **Retain the original target** and note the limitations of extrapolated results and the likelihood of remnant bias.
> 3. Acknowledge that **a different study may need to be conducted**.
^def-tipton-three-paths

### Method comparison

| Method class | A priori subgroups? | Power | Needs individual data | Identifies drivers? |
|---|---|---|---|---|
| Interaction term | yes | low | yes | yes (that modifier) |
| Sequential interaction tests | partly | improved | yes | yes |
| Qualitative interaction / tree / BART | no | variable | yes | yes |
| Baseline-risk interaction | no | avoids multiplicity | yes + target outcomes | no |
| Crump et al. constant-CATE test | no | consistent nonparametric | yes | no |

## Examples

> [!example] Python: interaction test as the simplest heterogeneity check (OLS with treatment-by-modifier term)
> ```python
> import numpy as np
> rng = np.random.default_rng(0); n = 4000
> x = rng.normal(0, 1, n); a = rng.integers(0, 2, n)
> y = 1 + .5*x + a*(1.0 + .8*x) + rng.normal(0, 1, n)       # heterogeneous effect: tau(x)=1+.8x
> X = np.c_[np.ones(n), x, a, a*x]; b, res, *_ = np.linalg.lstsq(X, y, rcond=None)
> s2 = ((y - X@b)**2).sum()/(n-4); se = np.sqrt(s2*np.diag(np.linalg.inv(X.T@X)))
> print(round(b[3],3), round(b[3]/se[3],1))                  # interaction ~0.8, t >> 2
> ```
> A significant interaction with an effect modifier that differs between test and rollout markets implies the SATE will not equal the PATE and moves the analysis to the estimators of Sec. 5. A null result in a homogeneous sample is weak evidence, per the review's warning about restricted enrollment.

> [!example] Marketing reading
> Tests of "does the lift depend on market size / digital share?" are the practical route to listing the effect modifiers $X$ needed in B1 ([[Degtiar 2023 - Identifying Assumptions]]). With only ~20 test markets, power for individual interactions is poor; the review's advice (design for heterogeneity, use a representative target) suggests spreading test markets across the modifier range *before* the test.

## Connections

- Pearl's treatment of identifiability of heterogeneity ties to [[Pearl 2014 - Conclusions, Extensions and Limits]] (worst-case assumption that any variable may be a modifier).
- Bayesian treatment of heterogeneity with trees: BART appears in [[Degtiar 2023 - Outcome Regression Methods]]; Bayesian causal inference background in [[Propensity Score in Bayesian CI]].
- Designing geo tests across the modifier range: [[Geo-Experiment Methodology - Overview]].

## See Also

- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]
