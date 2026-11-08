---
title: "Degtiar 2023 - Identifying Assumptions"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/definition
  - doc/paper
source: "[[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]]"
source_location: "Sec. 3 (3.1 Internal validity, 3.2 External validity, 3.3 Transportability), PDF pp. 6-8"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Degtiar Rose 2023 - Generalizability and Transportability Review"
doc_type: paper
depends_on:
  - "[[Degtiar 2023 - Populations, Estimands and External Validity Bias]]"
used_by:
  - "[[Degtiar 2023 - Weighting and Matching Methods]]"
  - "[[Degtiar 2023 - Outcome Regression Methods]]"
  - "[[Degtiar 2023 - Doubly Robust and Combined Methods]]"
aliases:
  - Conditional exchangeability for study selection
  - Positivity of selection
  - Generalizability assumption
  - Strongly ignorable sample selection
---

# Degtiar 2023 - Identifying Assumptions

> [!summary]
> Identifying the PATE needs two parallel sets of assumptions: **internal validity** (conditional treatment exchangeability, positivity of treatment, SUTVA) and **external validity** (conditional exchangeability for study selection $Y^a\perp S\mid X$, positivity of selection, SUTVA for selection). For transportability, positivity changes (the propensity to be in the target must be bounded away from 0 and 1) and the covariates cannot include those that perfectly separate study from target (e.g. geography when transporting between states).

## Overview

"Under the potential outcomes framework, the assumptions below are sufficient to identify the PATE using the observed study data." A corresponding set exists in the structural equation framework (Pearl and Bareinboim 2014; Pearl 2015; Pearl and Bareinboim 2011; Bareinboim and Pearl 2014, 2016; Bareinboim and Tian 2015; Correa, Tian and Bareinboim 2018). Additional assumptions: no missing data or measurement error in outcome, treatment or covariates. Other target parameters (PATT, PCATE) need a similar set.

## Main Content

### 3.1 Internal validity

> [!definition] A1. Conditional treatment exchangeability
> $$Y^a\perp A\mid X,\;S=1\quad\forall a\in\mathcal A$$
> No unmeasured confounding of the treatment-outcome relationship in the study. Satisfied by perfectly randomized trials (no loss to follow-up, informative missingness or censoring) and by observational studies with all confounders measured. Sufficient but not always necessary: for the PATE it can be replaced by the weaker **mean conditional exchangeability of the treatment effect**,
> $$E(Y^1-Y^0\mid X,A,S=1)=E(Y^1-Y^0\mid X,S=1)$$
> (Kern et al. 2016; Dahabreh et al. 2019a).
^def-a1-exchangeability

> [!definition] A2. Positivity of treatment assignment
> $$P(X=x\mid S=1)>0\Rightarrow P(A=a\mid X=x,S=1)>0\ \text{w.p.1 for all }a\in\mathcal A.$$
> Each study subject has a positive probability of each treatment version. With A1 this is called **strongly ignorable treatment assignment** (Varadhan, Henderson and Weiss 2016).
^def-a2-positivity

> [!definition] A3. SUTVA (stable unit treatment value)
> $$A=a\Rightarrow Y=Y^a.$$
> No interference between subjects and treatment-version irrelevance (consistency / well-defined interventions), in study and target populations (Dahabreh et al. 2017; Kallus, Puli and Shalit 2018).
^def-a3-sutva

### 3.2 External validity

> [!definition] B1. Conditional exchangeability for study selection ("generalizability assumption")
> $$Y^a\perp S\mid X\quad\forall a\in\mathcal A.$$
> Also called exchangeability over selection. Outcomes among individuals with the same treatment and covariate values in study and target are the same (Stuart et al. 2011). **All effect modifiers that differ between study and target must therefore be measured.** Satisfied by a random sample from the target, or a non-probability sample in which all effect modifiers are measured. For the PATE it can be weakened to **mean conditional exchangeability of selection**:
> $$E(Y^1-Y^0\mid X,S=1)=E(Y^1-Y^0\mid X)$$
> (Kern et al. 2016; Dahabreh et al. 2019a).
^def-b1-selection-exchangeability

> [!definition] B2. Positivity of selection
> $$P(X=x)>0\Rightarrow P(S=1\mid X=x)>0\ \text{w.p.1}.$$
> Common support for study selection: in every stratum of effect modifiers there is positive probability of being in the study sample (Dahabreh et al. 2017). Can be replaced by smoothing assumptions under a parametric model, e.g. sufficient overlap of the selection-propensity distributions (Westreich et al. 2017; Tipton et al. 2017). All target members are represented by individuals in the study. B1 + B2 together are **strongly ignorable sample selection** given observed covariates (Chan 2017).
^def-b2-selection-positivity

> [!definition] B3. SUTVA for study selection
> $$S=s\ (\text{and }A=a)\Rightarrow Y=Y^a.$$
> No interference between selected and non-selected subjects and treatment-version irrelevance between study and target (Tipton 2013b; Tipton et al. 2017). Requires: no difference in how outcomes are measured or the intervention applied; a common data-generating function for outcomes across study and target (being in the study does not change effects); potential outcomes not a function of the proportion selected. Treatment-version irrelevance can be replaced, for the PATE, by equal *distributions* of treatment versions in study and target (Lesko et al. 2017).
^def-b3-sutva-selection

### 3.3 Transportability modifications

Similar assumptions hold with these changes:
- **Positivity.** For generalizability (study $\subseteq$ target), the selection propensity must be bounded away from 0. For transportability (study not a subset of target), the propensity to be in the *target* population must be bounded away from 0 **and 1** (Tipton 2013b).
- **Covariate set.** For transportability the covariate set $X$ required for B1 "cannot include those that separate the study sample from the target population", e.g. hospital type when transporting from teaching hospitals to community clinics, or geographic location when transporting between states (Tipton 2013b). (If a covariate perfectly predicts membership, positivity fails by construction.)
- **SEM framework.** Pearl and Bareinboim formalize the assumptions for different transport formulas to reweight randomized data (graphical conditions plus formulas for randomized studies: Pearl and Bareinboim 2014; Pearl 2015), observational studies (Pearl and Bareinboim 2011; Pearl 2015; Bareinboim and Tian 2015; Bareinboim and Pearl 2016; Correa and Bareinboim 2017; Correa, Tian and Bareinboim 2018) and combinations of heterogeneous studies (Bareinboim and Pearl 2014, 2016).

### Correspondence table: potential outcomes vs selection diagrams

| Assumption here | Selection-diagram counterpart (Pearl-Bareinboim) |
|---|---|
| B1: $Y^a\perp S\mid X$ | S-admissibility: $(Y\perp S\mid Z,X)$ in $D_{\overline X}$, see [[Pearl 2014 - S-Admissibility and the Graphical Criterion]] |
| B2: positivity of selection | implicit (existence of $P(y\mid do(x),z)$ for every $z$ with $P^*(z)>0$) |
| A1: treatment exchangeability | randomization in $\Pi$ or backdoor admissibility ([[Bareinboim 2016 - SCM Principles and Confounding Bias]]) |
| B3: SUTVA for selection | no $S\to Y$ or $S\to$ outcome-measurement mechanisms in the diagram |
| "Post-treatment variables differ" | requires (3.4)/Eq. 14-type formulas; ignorability language too coarse ([[Bareinboim 2016 - Sample Selection Bias and Recoverability]]) |

(This table is a vault synthesis of the two literatures; the review states the correspondence only in general terms.)

## Examples

> [!example] Checking B1 and B2 in a geo-test rollout
> *Setting:* test in 20 DMAs, rollout to 200 DMAs; effect modifiers believed to be market size, digital share, and baseline brand awareness.
> - **B1** requires all effect modifiers that differ to be measured in both the test and rollout markets. A modifier like "local competitor intensity" that is unmeasured in the rollout breaks B1.
> - **B2** requires every combination of modifier levels in the rollout to have a positive chance of being in the test: if no test market is as large as the 10 biggest rollout DMAs, positivity fails for them; they would need extrapolation, which the estimators cannot justify.
> - **B3** fails if the test was run with different creative or a different measurement window than the rollout.
> - **A1/A2** are satisfied by the randomization of the geo test; if instead the "experiment" was a staggered rollout chosen by planners, A1 is in doubt.

## Connections

- Estimators relying on these assumptions: [[Degtiar 2023 - Weighting and Matching Methods]] (B1, B2 via selection propensity), [[Degtiar 2023 - Outcome Regression Methods]] (B1, correct outcome model), [[Degtiar 2023 - Doubly Robust and Combined Methods]].
- Diagnostics for violations: [[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]] and sensitivity analysis (Sec. 4.2).
- Background: [[Potential Outcomes Framework]], [[Propensity Score Matching - Overview]] (strong ignorability, the A1 + A2 analogue).

## See Also

- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]
