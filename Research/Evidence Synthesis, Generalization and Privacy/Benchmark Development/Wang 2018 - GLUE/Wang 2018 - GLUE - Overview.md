---
title: "Wang 2018 - GLUE - Overview"
tags:
  - source/ingested
  - topic/benchmarks
  - type/overview
  - doc/paper
source: "[[raw/Wang 2018 - GLUE.pdf]]"
source_location: "Abstract, Sec. 1-7, Appendices A-E, ICLR 2019 version (arXiv 1804.07461v3), pp. 1-20"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Wang 2018 - GLUE"
doc_type: paper
depends_on:
  - "[[Wang 2018 - Task Suite and Selection Criteria]]"
  - "[[Wang 2018 - Evaluation Protocol and Scoring]]"
  - "[[Wang 2018 - Diagnostic Dataset]]"
  - "[[Wang 2018 - Baselines and Benchmark Results]]"
  - "[[Wang 2018 - Diagnostic Results and Analysis]]"
  - "[[Wang 2018 - Appendices and Implementation Details]]"
used_by:
  - "[[Liang 2022 - HELM - Overview]]"
aliases:
  - GLUE benchmark overview
  - General Language Understanding Evaluation
---

# Wang 2018 - GLUE - Overview

> [!summary]
> GLUE (Wang, Singh, Michael, Hill, Levy and Bowman; ICLR 2019) is a benchmark and online platform for evaluating general natural language understanding: nine English sentence or sentence-pair tasks drawn from existing datasets, scored by a macro-average, with four tasks using privately-held test labels and a hand-built 1,100-example diagnostic set tagged with linguistic phenomena. Baselines show that multi-task training with ELMo and attention scores best (70.0 average) yet low in absolute terms, and the diagnostic set shows models fail on logic.

## Overview

**Research question.** Human language understanding is general; most NLU models are task-specific and struggle out of domain. How do we measure, and encourage, models that *share* linguistic knowledge across tasks, genres and dataset sizes?

**Contribution (four items in the paper).**
1. A suite of nine sentence or sentence-pair NLU tasks built on established datasets, chosen for diversity of genre, size and difficulty ([[Wang 2018 - Task Suite and Selection Criteria]]).
2. An online evaluation platform and leaderboard based mainly on privately-held test data; model-agnostic, so any method producing predictions for all nine tasks can compete ([[Wang 2018 - Evaluation Protocol and Scoring]]).
3. An expert-constructed diagnostic dataset ([[Wang 2018 - Diagnostic Dataset]]).
4. Baselines for major sentence-representation approaches ([[Wang 2018 - Baselines and Benchmark Results]], [[Wang 2018 - Diagnostic Results and Analysis]]).

**Design philosophy.** None of the tasks was created for GLUE: "we rely on pre-existing datasets because they have been implicitly agreed upon by the NLP community as challenging and interesting." The benchmark rewards parameter sharing by including data-scarce tasks (RTE has 2.5k, WNLI 634 training examples), so that independently trained single-task models are uncompetitive.

**Key results.**

| Finding | Value |
|---|---|
| Best baseline average (test) | 70.0 (multi-task BiLSTM + attention + ELMo) |
| Best single-task-trained average | 66.5 (BiLSTM + attention + ELMo) |
| Best pre-trained sentence encoder average | 66.2 (GenSen) |
| WNLI | no model beats the majority-class rate 65.1 |
| Diagnostic set best overall R3 | 28 (single-task BiLSTM + attention + ELMo) vs human 80 |
| Hypothesis-only fastText on diagnostic | 32.7% (SNLI) and 36.4% (MNLI) — near chance, so no annotation artifact |

## Main Content

### Source Map

| Paper section | Covered in |
|---|---|
| Abstract, 1 Introduction (Table 1) | This note; [[Wang 2018 - Task Suite and Selection Criteria]] |
| 2 Related Work (SentEval, decaNLP, multi-task learning) | [[Wang 2018 - Task Suite and Selection Criteria]] |
| 3 Tasks (3.1 single-sentence, 3.2 similarity and paraphrase, 3.3 inference) | [[Wang 2018 - Task Suite and Selection Criteria]] |
| 3.4 Evaluation | [[Wang 2018 - Evaluation Protocol and Scoring]] |
| 4 Diagnostic Dataset (Tables 2-3, annotation, evaluation, intended use) | [[Wang 2018 - Diagnostic Dataset]] |
| 5 Baselines (architecture, pre-training, training, sentence-representation models) | [[Wang 2018 - Baselines and Benchmark Results]] |
| 6 Benchmark Results (Table 4) | [[Wang 2018 - Baselines and Benchmark Results]] |
| 7 Analysis (Table 5) and Conclusion | [[Wang 2018 - Diagnostic Results and Analysis]] |
| Appendix A (QNLI construction) | [[Wang 2018 - Task Suite and Selection Criteria]] |
| Appendix B (attention, training, sentence models) | [[Wang 2018 - Appendices and Implementation Details]] |
| Appendix C (Table 6 dev results) | [[Wang 2018 - Appendices and Implementation Details]] |
| Appendix D (website) | [[Wang 2018 - Appendices and Implementation Details]] |
| Appendix E (Table 7, diagnostic categories) | [[Wang 2018 - Diagnostic Dataset]], [[Wang 2018 - Appendices and Implementation Details]] |
| References | not reproduced |

## Examples

> [!example] The GLUE score in one line
> For a model with per-task scores, take the unweighted mean of metrics within each multi-metric task, then the unweighted mean over the nine tasks. Check (Table 4, multi-task BiLSTM+Attn+ELMo): CoLA 33.6, SST-2 90.4, MRPC (78.0+84.4)/2=81.2, QQP (84.3+63.1)/2=73.7, STS-B (74.2+72.3)/2=73.25, MNLI (74.1+74.5)/2=74.3, QNLI 79.8, RTE 58.9, WNLI 65.1; mean $=70.0$. ^ex-glue-score

## Connections

- The paper is the NLP analogue of [[Deng 2009 - ImageNet - Overview]]: a shared, community-agreed target. GLUE differs by being a *suite* with a vector of scores, a private test set, and a platform.
- [[Liang 2022 - HELM - Overview]] explicitly follows "the precedent set by GLUE and SuperGLUE" and argues benchmarks like GLUE assign a score *vector*, whereas HELM assigns a score *matrix* across scenarios and metrics.
- The private test labels and two-submissions-per-day limit are anti-overfitting devices; see [[Researcher Degrees of Freedom]] and [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]] for the underlying selection and Goodhart problems.
- For LLM-era evaluation practice see [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]].

**Relevance to marketing measurement.** Two ideas port directly. (1) *Private test labels*: a benchmark of attribution or MMM methods needs held-out ground truth (experiments) that modelers cannot tune against, matching [[Experimental Benchmarks for Observational Ad Measurement]]. (2) *Macro-averaging across heterogeneous tasks* is a design choice with consequences: it weights a tiny noisy task (WNLI, 146 test examples) equally with a large one, so a single unweighted summary can hide where a method fails.

## See Also

- [[Wang 2018 - GLUE/_Index|Index: Wang 2018 - GLUE]]
- [[Deng 2009 - ImageNet - Overview]]
- [[Liang 2022 - HELM - Overview]]
