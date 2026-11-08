---
title: "Degtiar 2023 - Populations, Estimands and External Validity Bias"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/definition
  - doc/paper
source: "[[raw/Degtiar 2023 - A Review of Generalizability and Transportability.pdf]]"
source_location: "Secs. 1-2, PDF pp. 1-6, Figs. 1-3"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Degtiar Rose 2023 - Generalizability and Transportability Review"
doc_type: paper
depends_on:
  - "[[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]"
  - "[[Causal Estimands]]"
used_by:
  - "[[Degtiar 2023 - Identifying Assumptions]]"
  - "[[Degtiar 2023 - Weighting and Matching Methods]]"
aliases:
  - PATE vs SATE
  - External validity bias
  - Target population study population sample
  - Generalizability vs transportability definitions
---

# Degtiar 2023 - Populations, Estimands and External Validity Bias

> [!summary]
> Sets the vocabulary: target, study and analysis populations and samples; generalizability (study $\subseteq$ target) versus transportability (study partly external); internal versus external validity; and the estimand, the **population average treatment effect** $\tau=E(Y^1-Y^0)$ in the target, versus the **sample average treatment effect** $\tau_s$ the study directly estimates. External validity bias is $\tau_s\neq\tau$ caused by different effect-modifier distributions, and decomposes into selection variation, effect heterogeneity and their correlation.

## Overview

"Determining the target population to which the results are intended to generalize is a critical decision." The true causal effect varies with the target population chosen. Unrepresentative samples arise from clinical RCTs to policy research (Bell et al. 2016; Kennedy-Martin et al. 2015; Allcott 2015).

## Main Content

### Populations and samples (Fig. 1)

- **Target sample**: a representative sample of the target population.
- **Study population**: defined by enrollment processes and inclusion/exclusion criteria; may differ from the target population.
- **Study sample**: enrolled participants; may differ from the target sample.
- **Analysis sample / population**: after dropout and missingness; a hypothetical *analysis population* has the analysis sample as a simple random sample.
- For simplicity and consistency with the literature the review says "study sample/population" to include the analysis sample/population.

> [!definition] Generalizability vs transportability
> **Generalizability** addresses the setting where the study population is a subset of the target population of interest. **Transportability** addresses the setting where the study population is (at least partly) external to the target population.
^def-gen-vs-transport

> [!definition] Internal vs external validity
> **Internal validity**: the effect estimate is unbiased for the causal treatment effect in the population from which the sample is a simple random sample (vertical movement from a sample to its population in Fig. 1). **External validity**: how well results generalize to other contexts; that the (internally valid) estimate is unbiased for the causal effect in a different setting such as the target population (lateral movement between populations in Fig. 1). External validity bias has also been called *sample selection bias* (Heckman 1979; Imai, King and Stuart 2008; Moreno-Torres et al. 2012; Bareinboim, Tian and Pearl 2014; Haneuse 2016).
^def-int-ext-validity

### Sources of external validity bias

External validity bias arises from differences between study and target populations in:
1. **subject characteristics**;
2. **setting**, e.g. geography or type of health center;
3. **treatment**, e.g. timing, dosage, staff training;
4. **outcomes**, e.g. length of follow-up or timing of measurements
(Cronbach and Shapiro 1982; Rothwell 2005; Dekkers et al. 2010; Green and Glasgow 2006; Burchett et al. 2011; Attanasio et al. 2003).

Most generalizability and transportability *methods* address only differences in subject characteristics, and hence assume the remaining threats are absent. Under that scope:

> [!theorem] Decomposition of external validity bias (Olsen et al. 2013)
> External validity bias arises solely from (1) variation in the probability of enrollment in the study, (2) heterogeneity in treatment effects, and (3) the correlation between (1) and (2).
^thm-ev-bias-decomposition

Hence: no effect heterogeneity $\Rightarrow$ no external validity bias, however non-representative the sample; no selection variation along effect modifiers $\Rightarrow$ none either.

The review distinguishes **external validity bias** (differences between target and study populations) from **internal validity bias** (differences between treatment groups, e.g. confounding). RCTs are often performed in a non-representative subset of the target population and have imperfect follow-up (external-validity concerns) and may have baseline imbalances (internal-validity bias). Observational studies may suffer unmeasured confounding (internal) but may be more representative of the target (better external validity). Lack of representation in an RCT can lead to external validity bias larger than the internal validity bias of an observational study (Bell et al. 2016).

### Design solutions (briefly reviewed)

"The optimal solution to external validity bias centers on study design." The ideal is random sampling from the target and then random assignment, usually infeasible. Alternatives:

| Design | Idea | Cited |
|---|---|---|
| Purposive sampling | deliberately select individuals for representation or heterogeneity | Shadish, Cook and Campbell 2001; Allcott and Mullainathan 2012 |
| Pragmatic / practical trials | representative of clinical practice | Schwartz and Lellouch 1967; Ford and Norrie 2016 |
| Stratified selection | on effect modifiers or propensity scores for selection | Tipton et al. 2014; Tipton 2013a; Allcott and Mullainathan 2012 |
| Balanced sampling for site selection | representative sites via stratified ranked sampling | Tipton and Peck 2017 |

Methods after data collection (the rest of the review) can be used in lieu of or in addition to design.

### Framework (Fig. 2)

1. **Estimand**: consider study and target populations and the estimand of interest.
2. **Assumptions**: assess validity of assumptions needed by generalizability/transportability approaches.
3. **Evaluating generalizability**: examine whether treatment effect modification exists and whether effect modifiers differ in distribution between study and target.
4. **Methods**: apply methods to address external validity bias.

### Section 2: notation and estimand

For one or more studies assume outcome $Y$, treatment $A\in\{0,1\}$, baseline covariates $X\in\mathbb R^d$. For simplicity $X$ represents **all treatment-effect confounders and effect modifiers that differ between study and target**; each variable in $X$ is both a confounder and an effect modifier. Single-study setting without loss of generality; $S=1$ indicates selection into the study.

| Symbol | Meaning |
|---|---|
| $O_{\text{study}}=\{X,A,Y,S=1\}$ | observational unit for the study sample, with $P_{\text{study}}\in\mathcal M_{\text{study}}$ (a statistical model); $n_s$ realizations indexed by $j$ |
| $O=\{X,A,Y,S\}\sim P\in\mathcal M$ | observational unit for a representative sample from the target population; $n$ realizations indexed by $i$ |
| $S=0$ | target-sample subjects not in the study sample |
| Generalizability | $O_{\text{study}}\in O$ (study subset of target) |
| Transportability | the two are disjoint sets ($O_{\text{study}}\notin O$) |
| $Y^1,Y^0$, $Y^a$ | potential outcomes under treatment, no treatment, and a specific value $a$ |

"Selected" or "sampled" is used for simplicity, although for transportability subjects are not sampled into the study from the target.

> [!definition] Population average treatment effect (PATE)
> $$\tau=E_X\big(E(Y\mid S=1,A=1,X)-E(Y\mid S=1,A=0,X)\big)=E(Y^1-Y^0),\qquad\hat\tau=\frac1n\sum_{i=1}^n(\hat Y_i^1-\hat Y_i^0).$$
> The average outcome had everyone in the *target* been assigned $A=1$ versus $A=0$. The first equality holds under the identifying assumptions of [[Degtiar 2023 - Identifying Assumptions]], and the outer expectation is over the **target** covariate distribution.
^def-pate

> [!definition] Sample average treatment effect (SATE)
> $$\tau_s=E(Y^1-Y^0\mid S=1),\qquad\hat\tau_s=\frac1{n_s}\sum_{j:S_j=1}(\hat Y_j^1-\hat Y_j^0).$$
> What a study directly estimates, since outcomes are observed only in the study sample.
^def-sate

When effect-modifier distributions differ between study and target, $\text{SATE}\neq\text{PATE}$: **external validity bias**. Sampling variability and internal-validity biases can push the SATE further from the truth (Fig. 3); biases may differ in magnitude and make the SATE larger or smaller than the PATE.

> [!definition] Other estimands
> - **PCATE** (population conditional average treatment effect): $\tau_x=E(Y^1-Y^0\mid X)$, used in some estimators.
> - **PATT** (population ATE among the treated): $\tau_1=E(Y^1-Y^0\mid A=1)$.
> The generalizability/transportability considerations of later sections carry over to these and other causal estimands.
^def-pcate-patt

## Examples

> [!example] SATE versus PATE with a single effect modifier
> Let $X$ = market size tier with effects $\tau_x=1.8,1.2,0.7$ for small/medium/large. The test has tier shares $(0.5,0.3,0.2)$, so $\tau_s=1.40$. The target has shares $(0.1,0.3,0.6)$, so $\tau=0.96$. Bias $=\tau_s-\tau=0.44$, driven jointly by a selection imbalance (tiers over-represented in the study) *and* effect heterogeneity (tiers with larger effects were over-selected): the Olsen decomposition. With a constant effect of 1.4 in all tiers, the same selection imbalance would produce zero bias. (Numbers reuse [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]].)

## Connections

- Estimand definitions generalize the standard [[Causal Estimands]] (ATE, ATT, CATE) by adding the population over which the expectation is taken.
- Assumptions that identify $\tau$: [[Degtiar 2023 - Identifying Assumptions]]. How to tell whether bias is likely: [[Degtiar 2023 - Assessing Dissimilarity Between Study and Target]].
- Graphical analogue of "which covariates differ": the placement of $S$-nodes in [[Pearl 2014 - Selection Diagrams and Definition of Transportability]].

## See Also

- [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]]
- [[Potential Outcomes Framework]]
