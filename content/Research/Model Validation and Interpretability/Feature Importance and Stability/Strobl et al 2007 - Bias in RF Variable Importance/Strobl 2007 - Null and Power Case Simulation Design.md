---
title: "Strobl 2007 - Null and Power Case Simulation Design"
tags:
  - source/ingested
  - topic/model-validation
  - topic/feature-importance
  - topic/random-forests
  - topic/simulation
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Strobl et al 2007 - Bias in Random Forest Variable Importance Measures.md]]"
source_location: "Strobl, Boulesteix, Zeileis & Hothorn (2007), BMC Bioinformatics 8:25 — Methods §'Simulation studies' (paras 1-7), Table 1 (predictor variables), Table 2 (response variable); Results §'Power case' (correct-identification monotonicity; Table 4 test-set protocol); Additional file 1 (R code)"
date_ingested: 2026-10-13
folder: "Model Validation and Interpretability/Feature Importance and Stability/Strobl et al 2007 - Bias in RF Variable Importance"
doc_type: paper
depends_on:
  - "[[Strobl 2007 - RF Importance Measures and the cforest Alternative]]"
  - "[[Designing Simulated-Data Experiments]]"
used_by:
  - "[[Strobl 2007 - Null and Power Case Results]]"
  - "[[Strobl 2007 - Split-Selection Bias in CART Trees]]"
  - "[[Strobl 2007 - Bootstrap-Induced Association]]"
aliases:
  - Strobl 2007 Simulation Design
  - Strobl Null Case and Power Case
  - Mixed-Cardinality Predictor Simulation
---

# Strobl 2007 - Null and Power Case Simulation Design

> [!summary]
> One continuous and four categorical predictors with **2, 4, 10 and 20** equiprobable levels, a binary response, **$n=120$**, **1000 replications**. In the **null case** nothing is informative, so a sensible importance measure must treat all five predictors equally. In the **power case** only the **binary** predictor $X_2$ is informative, with strength set by a *relevance* parameter in $\{0.05,0.1,0.15,0.2\}$, so a sensible measure must single out the variable with the *fewest* cutpoints. The design isolates **number of categories / scale of measurement** as the only thing that differs between predictors.

## Overview

The design is a textbook case of using simulation to put a method under a known truth ([[Designing Simulated-Data Experiments]]; [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]]). Its cleverness lies in making the informative variable the *least* favoured by any cardinality artefact: if the method has a bias toward many-category variables, the bias works *against* detecting $X_2$, so the power case is a hard test.

## Main Content

### ADEMP reading of the design

| ADEMP element | Strobl et al. (2007) |
|---|---|
| **Aims** | Do RF importance measures depend on a predictor's scale of measurement / number of categories? Does `cforest` + subsampling remove the dependence? |
| **Data-generating mechanisms** | Tables 1-2 below: null case; power case at 4 relevance levels |
| **Estimands** | Ranking/importance of $X_1,\dots,X_5$ (truth: all equal in null case; $X_2$ alone relevant in power case); test-set misclassification |
| **Methods** | 2 forest algorithms (`randomForest`, `cforest`) × 2 resampling schemes (bootstrap $n$ with replacement; subsample $0.632n$ without) — plus single trees (`rpart`, `ctree`) and $\chi^2$ tests for the mechanism studies |
| **Performance measures** | Mean selection frequency; mean Gini importance; distribution (boxplots) of unscaled and scaled permutation importance; rate of correct identification ($X_2$ has the largest permutation importance); mean test-set misclassification rate |

Monte Carlo standard errors are given for rates (Table 3 caption: $se=\sqrt{r(1-r)/1000}$) and in parentheses for misclassification means (Table 4). See [[Effective Sample Size and Monte Carlo Standard Error]].

### What a sensible measure must do in each case (Methods, §Simulation studies)

> [!definition] Success criteria for an importance measure in the two studies ^def-success-criteria
> - **Null case:** all predictors and the response are sampled independently, so "a sensible variable importance measure should not prefer any one predictor variable over any other."
> - **Power case:** a sensible measure "should be able to distinguish the informative predictor variable from its uninformative competitors, **and even more so with increasing degree of dependence**." Separation of $X_2$ from the noise variables should therefore **increase monotonically** with the *relevance* parameter.
>
> The results confirm this monotonicity for the correct-identification rate: it "increases with the degree of dependence between $X_2$ and the response" (Results, power case), for every method in Table 3 ([[Strobl 2007 - Null and Power Case Results#^tab-3]]). What differs between methods is the *level* of the curve, not its direction.

### Table 1 — predictor variables

> [!definition] Predictor distributions (Table 1) ^def-predictors
> Predictors are sampled **independently**:
>
> | Variable | Distribution | Scale | Distinct binary splits (CART) |
> |---|---|---|---|
> | $X_1$ | $N(0,1)$ | continuous | up to $n-1=119$ |
> | $X_2$ | $M(2)=B(0.5)$ | nominal, 2 levels | 1 |
> | $X_3$ | $M(4)$ | nominal, 4 levels | 7 |
> | $X_4$ | $M(10)$ | nominal, 10 levels | 511 |
> | $X_5$ | $M(20)$ | nominal, 20 levels | 524,287 |
>
> $N(0,1)$ is the standard normal; $M(k)$ is the multinomial distribution with values in $\{0,\dots,k-1\}$ and equal probabilities (discrete uniform); $B(p)$ is the Bernoulli distribution with success probability $p$, so $M(2)$ equals $B(0.5)$.
>
> The last column is a vault addition: an unordered $k$-level factor admits $2^{k-1}-1$ binary partitions; the paper itself only states that a four-category variable "provides seven cutpoints" and that the count "grows exponentially" with the number of categories.

### Table 2 — response variable

> [!definition] Response distributions (Table 2) ^def-response
> - **Null case:** $Y\sim B(0.5)$, independent of all predictors.
> - **Power case:** $Y\mid X_2=1\sim B(0.5-\textit{relevance})$, $\;Y\mid X_2=2\sim B(0.5+\textit{relevance})$, with $\textit{relevance}\in\{0.05,\,0.1,\,0.15,\,0.2\}$.
>
> (The table writes the two levels of $X_2$ as 1 and 2, whereas Table 1 codes $M(2)$ on $\{0,1\}$; the intent — one level lowers, the other raises $P(Y=1)$ — is unambiguous.)

> [!example] Example: effect size implied by the relevance parameter ^ex-effect-size
> At relevance $0.2$, $P(Y=1)$ is $0.3$ in one group and $0.7$ in the other, a 40-point difference. With $n=120$ and $X_2$ balanced (~60 per group), the Bayes error is $0.5\cdot0.3+0.5\cdot0.3=0.30$. At relevance $0.05$ the difference is 10 points and the Bayes error $0.45$. The misclassification rates in [[Strobl 2007 - Null and Power Case Results|Table 4]] (0.40 to 0.49) sit above these floors, as expected for forests that also split on four noise variables. (Bayes-error calculation is a vault addition.)

### Protocol details

1. **Sample size** $n=120$ for all simulation studies.
2. **Replications:** 1000 simulation runs per setting; reported values are means or distributions over runs.
3. **Forests:** `randomForest` (Liaw & Wiener's R port of Breiman's reference implementation) and `cforest` (package `party`); all calls and important options are documented in the paper's Additional file 1 (R source code).
4. **Resampling:** each forest grown (a) on bootstrap samples of size $n$ with replacement, (b) on subsamples of size $0.632n$ without replacement.
5. **Gini importance** is computed for `randomForest` only.
6. **Prediction accuracy (power case):** in each run all methods are applied to the **same simulated test set**, generated from the same data-generating process as the learning set.
7. **Mechanism studies** reuse the null-case design: single `rpart` and `ctree` trees for split-selection bias (Fig. 10), and per-variable $\chi^2$ tests on original vs bootstrap samples for $X_2,\dots,X_5$ (Fig. 11).

## Examples

> [!example] Example: porting the design to a marketing-feature audit ^ex-placebo-design
> **Setup.** Before trusting a driver ranking from a tree model of a weekly KPI (52-156 rows), simulate a placebo: keep the real feature matrix (spend columns, holiday flag, promotion type, region code) but replace the KPI by an independent draw (the null case), then by a KPI that depends only on the binary holiday flag at a chosen effect size (the power case).
>
> **Procedure.** Refit the exact production pipeline 200-1000 times; record each feature's importance and how often the holiday flag ranks first.
>
> **Interpretation.** If the placebo run ranks the region code first most of the time, the production ranking says more about the region code's cardinality than about its effect. This is the paper's design, applied to the analyst's real covariate structure rather than to independent synthetic predictors.

## Connections

- Placebo / null-case simulation as a validation tool: [[Designing Simulated-Data Experiments]], [[Morris White Crowther 2019 - Simulation Studies (ADEMP) - Overview]], [[Zhang Vaver 2017 - Aggregate Marketing System Simulator - Overview]] (simulated ground truth for marketing models).
- The power case is a power analysis for a *ranking* rather than a test: [[Power Analysis and Sample Size]].
- Same design style, extended to **correlated** predictors: [[Strobl et al 2008 - Conditional Variable Importance - Overview]].

## See Also
- [[Strobl et al 2007 - Bias in RF Variable Importance - Overview]]
- [[Strobl 2007 - Null and Power Case Results]] — what the design produced
- [[Strobl 2007 - RF Importance Measures and the cforest Alternative]] — the measures and methods under test
