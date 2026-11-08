---
title: "Liang 2022 - HELM - Overview"
tags:
  - source/ingested
  - topic/benchmarks
  - type/overview
  - doc/paper
source: "[[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]"
source_location: "Abstract, Sec. 1-12 (pp. 1-84); appendices A-J summarized at section level (pp. 118-162); TMLR 08/2023"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models"
doc_type: paper
depends_on:
  - "[[Liang 2022 - Holistic Evaluation Framework and Taxonomy]]"
  - "[[Liang 2022 - Core Scenarios and Dataset Selection]]"
  - "[[Liang 2022 - The Seven Metrics]]"
  - "[[Liang 2022 - Targeted Evaluations]]"
  - "[[Liang 2022 - Models and Adaptation via Prompting]]"
  - "[[Liang 2022 - Findings 1 to 13 Core Scenarios]]"
  - "[[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]]"
  - "[[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]]"
  - "[[Liang 2022 - Related Work, Missing Pieces and Limitations]]"
  - "[[Liang 2022 - Appendix Guide]]"
used_by: []
aliases:
  - HELM
  - Holistic Evaluation of Language Models
  - HELM overview
---

# Liang 2022 - HELM - Overview

> [!summary]
> HELM (Liang, Bommasani, Lee, Tsipras, Soylu et al., TMLR 2023, arXiv 2211.09110) is a benchmark design for language models built top-down: a taxonomy of scenarios (task, domain, language) and metrics (desiderata), from which it selects 16 core scenarios, each measured on 7 metrics (accuracy, calibration, robustness, fairness, bias, toxicity, efficiency; 98 of 112 pairs, 87.5%), plus 7 targeted evaluations (26 scenarios). It evaluates 30 models under standardized 5-shot prompting, raising average scenario coverage per model from 17.9% to 96.0%, and reports 25 top-level findings. Key lessons: benchmarks encode values; multi-metric reporting exposes tradeoffs; standardization matters because results swing wildly with prompt and adaptation choices.

## Overview

**Research question.** Language models are general-purpose text interfaces with a vast surface of capabilities and risks that is "poorly understood". What does it mean to benchmark them *holistically*, and what do the models look like when measured that way?

**Three elements of holistic evaluation (Sec. 1).**
1. *Broad coverage and recognition of incompleteness*: a top-down taxonomy that also makes explicit what is missing.
2. *Multi-metric measurement*: every desideratum measured for each scenario so metrics beyond accuracy do not become second-class.
3. *Standardization*: the object evaluated is the language model, not a scenario-specific system, so the adaptation strategy must be controlled and all models run on the same scenarios.

**Headline numbers.**

| Quantity | Value |
|---|---|
| Core scenarios | 16 (6 user-facing tasks; English) |
| Metric categories | 7 (accuracy, calibration, robustness, fairness, bias, toxicity, efficiency) |
| (core scenario, metric) pairs measured | 98 of 112 (87.5%) |
| Targeted evaluations | 7, through 26 additional scenarios |
| Scenarios new to mainstream LM evaluation | 21 |
| Models evaluated | 30 (16 families, 12 organizations); 10 open, 17 limited-access, 3 closed |
| Mean share of core scenarios previously evaluated per model | 17.9% before; 96.0% after |
| Runs | 4,939 (model, scenario) runs; 12,169,227,491 tokens; 17,431,479 queries; \$38,001 commercial API cost; about 19,500 GPU hours for open models |
| Adaptation | 5-shot prompting, 3 random in-context-example seeds |
| Top-level findings | 25 |

**Contributions (Sec. 1.3).** (1) Taxonomy of scenarios and metrics. (2) Broad coverage (16 + 26 scenarios). (3) Evaluation of 30 models under standardized conditions. (4) Empirical findings. (5) Interactive results website, released raw prompts and completions, and a modular codebase.

## Main Content

### Source Map

| Paper section | Pages | Covered in |
|---|---|---|
| Abstract, 1 Introduction, 1.1 HELM | 1-5 | This note; [[Liang 2022 - Holistic Evaluation Framework and Taxonomy]] |
| 1.2 Empirical findings (25) | 6-10 | [[Liang 2022 - Findings 1 to 13 Core Scenarios]], [[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]] |
| 1.3 Contributions | 10 | This note |
| 2 Preliminaries (scenarios, adaptation, metrics, roadmap) | 14-15 | [[Liang 2022 - Holistic Evaluation Framework and Taxonomy]] |
| 3 Core scenarios (3.1 taxonomy, 3.2 selection) | 15-19 | [[Liang 2022 - Holistic Evaluation Framework and Taxonomy]] |
| 3.3-3.8 task-by-task dataset selection | 19-25 | [[Liang 2022 - Core Scenarios and Dataset Selection]] |
| 4 General metrics (4.1-4.9) | 25-35 | [[Liang 2022 - The Seven Metrics]] |
| 5 Targeted evaluations (5.1-5.7) | 35-43 | [[Liang 2022 - Targeted Evaluations]] |
| 6 Models | 43-45 | [[Liang 2022 - Models and Adaptation via Prompting]] |
| 7 Adaptation via prompting | 45-47 | [[Liang 2022 - Models and Adaptation via Prompting]] |
| 8 Experiments and results (8.1 meta-analysis, 8.2 prompting analysis) | 47-60 | [[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]] |
| 8.3-8.5 task-specific, targeted, human evaluations | 60-75 | [[Liang 2022 - Findings 1 to 13 Core Scenarios]], [[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]] |
| 9 Related work and discussion | 75-77 | [[Liang 2022 - Related Work, Missing Pieces and Limitations]] |
| 10 What is missing | 77-80 | [[Liang 2022 - Related Work, Missing Pieces and Limitations]] |
| 11 Limitations and future work | 81-83 | [[Liang 2022 - Related Work, Missing Pieces and Limitations]] |
| 12 Conclusion | 83-84 | [[Liang 2022 - Related Work, Missing Pieces and Limitations]] |
| Appendices A-J (after the reference list) | 118-162 | [[Liang 2022 - Appendix Guide]] (section level only) |

(Page numbers are PDF page indices, located by text search; boundaries are approximate to within a page.)

## Examples

> [!example] Score vector versus score matrix
> ImageNet assigns each model *one* number (top-1 accuracy). GLUE assigns a *vector* (nine task accuracies, averaged to one headline score). HELM assigns a *matrix*: for each of 16 scenarios, scores on up to 7 metrics. For one model that is up to $16\times 7=112$ numbers, of which $98$ are defined. See [[Deng 2009 - ImageNet - Overview]] and [[Wang 2018 - GLUE - Overview]] for the two predecessors the paper compares against. ^ex-vector-matrix

## Connections

- **Lineage.** The paper explicitly follows "the precedent set by GLUE and SuperGLUE" ([[Wang 2018 - GLUE - Overview]]) and cites ImageNet as the benchmark that shaped computer vision ([[Deng 2009 - ImageNet - Overview]]).
- **Goodhart.** The authors warn that benchmark validity is critical because of Strathern's Law ("When a measure becomes a target, it ceases to be a good measure"); see [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].
- **LLM evaluation background**: [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]], [[In-Context Learning and Few-Shot Prompting]], [[Neural Scaling Laws]], [[RLHF and Instruction Tuning]].

**Relevance to marketing measurement.** HELM's design recipe applies to evaluating MMM or incrementality methods: enumerate the use cases (scenarios) and the desiderata (accuracy of ROI, interval calibration, robustness to data perturbations, fairness across segments or geographies, compute cost), measure all of them for every scenario, standardize the "adaptation" (priors, tuning budget, data preprocessing), and publish what the benchmark does not cover. See [[Experimental Benchmarks for Observational Ad Measurement]] for an experiment-based ground truth.

## See Also

- [[Research/Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models/_Index|Index: Liang 2022 - Holistic Evaluation of Language Models]]
- [[Wang 2018 - GLUE - Overview]]
- [[Deng 2009 - ImageNet - Overview]]
