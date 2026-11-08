---
title: "Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview"
tags:
  - source/ingested
  - topic/causal-transportability
  - type/overview
  - doc/paper
source: "[[raw/Bareinboim 2016 - Causal Inference and the Data-Fusion Problem.pdf]]"
source_location: "PNAS 113(27), 7345-7352, whole paper (UCLA TR R-450 reprint, 8 pp.)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Causal Transportability/Bareinboim Pearl 2016 - Causal Inference and Data Fusion"
doc_type: paper
depends_on:
  - "[[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]]"
used_by:
  - "[[Bareinboim 2016 - SCM Principles and Confounding Bias]]"
  - "[[Bareinboim 2016 - Sample Selection Bias and Recoverability]]"
  - "[[Bareinboim 2016 - Transportability and Data Fusion]]"
aliases:
  - Causal inference and the data-fusion problem
  - Bareinboim Pearl PNAS 2016
  - Data fusion in causal inference
---

# Bareinboim Pearl 2016 - Causal Inference and Data Fusion - Overview

> [!summary]
> The paper unifies three classical biases under one structural-causal-model language and one inference method (do-calculus on a graph): **confounding bias** (tasks 1 and 2), **sample selection bias** (task 3) and **transportability / cross-population bias** (task 4). Each "design", defined by the triple *(population, regime, sampling method)* of an available dataset, is a different syntactic form of data, and the strategy is always to transform the target query into an expression estimable from the datasets in hand. The authors claim complete graphical and algorithmic solutions for policy evaluation, transportability and data fusion in nonparametric DAG models.

## Overview

**Question.** Given several heterogeneous datasets (different populations, observational vs experimental regimes, different sampling mechanisms), when and how can a causal effect $P(y\mid do(x))$ in a target population be computed?

**Thesis.** "Not all data are created equal": the *design* of each dataset must be encoded mathematically, and different designs support different inferences. Big data does not replace causal assumptions; it magnifies the need to reason about how data were acquired.

**Contributions.**
1. A four-task taxonomy of generalization problems (Fig. 1).
2. Statement of the two **principles** of causal inference (structural counterfactuals, structural independences) from which the rest follows.
3. Review of identification results: backdoor, front-door, z-identification (auxiliary experiments) with the three do-calculus rules.
4. The **selection-backdoor criterion** (Definition 4, Theorem 1) for recovering causal effects from sampling-biased data, and the clinical-trial generalization pattern (Eq. 14).
5. Transport formulas (Eqs. 15-17), the complete decision procedure for transportability, and an assurance of completeness for multi-source **data fusion** (Summary Results 1-3).

## Main Content

### Source Map

| Paper section | PDF pages | Content | Covered in |
|---|---|---|---|
| Abstract, Introduction: Causal Inference and Big Data, Fig. 1 | 1-2 | tasks 1-4, designs, outline | this note, [[Bareinboim 2016 - SCM Principles and Confounding Bias]] (Fig. 1 table) |
| The Structural Causal Model; Two Principles | 2-3 | $\langle U,V,F\rangle$, Eq. 1 counterfactual, d-separation (Def. 1), Fig. 2A | [[Bareinboim 2016 - SCM Principles and Confounding Bias]] |
| Policy Evaluation and the Problem of Confounding | 3-5 | Eqs. 2-4, Def. 2, rules (Eqs. 5-7), backdoor (Def. 3, Eqs. 8-9), front-door (Eq. 10) | [[Bareinboim 2016 - SCM Principles and Confounding Bias]] |
| Identification Through Auxiliary Experiments | 5-6 | z-identification, Fig. 3, Eqs. 11-12, Summary Result 1 | [[Bareinboim 2016 - SCM Principles and Confounding Bias]] |
| Sample Selection Bias | 6-7 | Fig. 4, Eq. 13, Def. 4 S-backdoor, Theorem 1 | [[Bareinboim 2016 - Sample Selection Bias and Recoverability]] |
| The Generalizability of Clinical Trials | 7 | Fig. 4F, Eq. 14, S-ignorability, Summary Result 2 | [[Bareinboim 2016 - Sample Selection Bias and Recoverability]] |
| Transportability and the Problem of Data Fusion | 7-8 | selection diagrams, Fig. 5, Eqs. 15-17, multi-population fusion, Summary Result 3 | [[Bareinboim 2016 - Transportability and Data Fusion]] |
| Conclusion | 8 | external validity "solved", future work | [[Bareinboim 2016 - Transportability and Data Fusion]] |
| References 1-55 | 8 | bibliography | cited inline |

**Key results at a glance**

| Problem | Data available | Result |
|---|---|---|
| Confounding (task 1) | $P(v)$ | backdoor adjustment $\sum_z P(y\mid x,z)P(z)$; front-door if no backdoor set |
| Auxiliary experiment (task 2) | $P(v)$, $P(v\mid do(z))$ | z-identifiable iff $X$ intercepts all directed $Z\to Y$ paths and $P(y\mid do(x))$ identifiable in $G_{\overline Z}$ |
| Selection bias (task 3) | $P(v\mid S=1)$ (+ population-level $P(z)$) | S-backdoor admissible $Z$: $P(y\mid do(x))=\sum_z P(y\mid x,z,S=1)P(z)$ |
| Transportability (task 4) | $P(v\mid do(x))$ in $\pi$, observational in $\pi^*$ | transport formula via selection diagram; e.g. $\sum_z P(y\mid do(x),z)P^*(z)$ |

## Examples

Three recoverability/transport designs in one table (details in the topic notes):

| Design | Query | Estimand |
|---|---|---|
| Fig. 4B: $X\to S$, no confounding | $P(y\mid do(x))$ | $P(y\mid x,S=1)$ |
| Fig. 4F clinical trial, post-treatment $Z$ | $P(y\mid do(x))$ | $\sum_z P(y\mid do(x),z,S=1)\,P(z\mid x)$ (Eq. 14) |
| Fig. 5C biomarker | $P^*(y\mid do(x))$ | $\sum_z P(y\mid do(x),z)\,P^*(z\mid x)$ (Eq. 17) |

## Connections

- Direct successor and detailed derivations: [[Pearl Bareinboim 2014 - External Validity and Transportability - Overview]].
- Estimator-level counterpart (what to compute once identification is established): [[Degtiar Rose 2023 - Generalizability and Transportability Review - Overview]], which cites this paper as the identifiability-focused review.
- Underlying identification machinery: [[DAGs and Causal Identification]], [[Do-Calculus in Summary Causal DAGs]], [[Directed Acyclic Graphs]].
- Marketing: a measurement stack typically has an observational panel (task 1), geo experiments (tasks 2/4) and platform-biased user data (task 3). The paper's contribution for a practitioner is a *checklist* for which combinations of these answer a given query. Concrete mapping: [[Bareinboim 2016 - Transportability and Data Fusion]] and [[Pearl 2014 - Marketing Application Transporting Geo and Lift Results]].

## See Also

- [[Potential Outcomes Framework]], [[Propensity Score Matching - Overview]], [[Instrumental Variables]]
- Sibling sources in this cluster: [[Dahabreh 2020 - Extending Inferences from a Randomized Trial - Overview]] (identification and doubly robust estimation for trial-to-target inference) and [[Allcott 2015 - Site Selection Bias in Program Evaluation - Overview]] (site selection bias, marketing implications).
