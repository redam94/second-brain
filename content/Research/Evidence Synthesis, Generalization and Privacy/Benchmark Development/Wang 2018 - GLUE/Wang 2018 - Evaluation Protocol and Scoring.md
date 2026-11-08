---
title: "Wang 2018 - Evaluation Protocol and Scoring"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Wang 2018 - GLUE.pdf]]"
source_location: "Sec. 3.4 Evaluation, Sec. 3 task metrics, Appendix C and D, pp. 3-5, 13"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Wang 2018 - GLUE"
doc_type: paper
depends_on:
  - "[[Wang 2018 - Task Suite and Selection Criteria]]"
used_by:
  - "[[Wang 2018 - Baselines and Benchmark Results]]"
  - "[[Wang 2018 - Appendices and Implementation Details]]"
aliases:
  - GLUE score
  - GLUE macro-average
  - GLUE leaderboard protocol
---

# Wang 2018 - Evaluation Protocol and Scoring

> [!summary]
> GLUE follows the SemEval/Kaggle model: run a system on the provided test inputs, upload predictions to gluebenchmark.com, and receive per-task scores plus an unweighted macro-average that ranks the leaderboard. Multi-metric tasks are first averaged over their metrics. Private labels for four test sets and a two-submissions-per-day cap protect against overfitting to the test data. The protocol is model-agnostic.

## Overview

Scoring is deliberately simple so that a single number can order submissions, but the paper keeps per-task scores and diagnostic results visible. This note defines the aggregate precisely and records the anti-gaming mechanics.

## Main Content

> [!definition] GLUE score
> Let the tasks be $t=1,\dots,9$. Task $t$ has $m_t$ reported metrics with values $s_{t,1},\dots,s_{t,m_t}$ (e.g. MRPC: accuracy and $F_1$; STS-B: Pearson and Spearman; MNLI: matched and mismatched accuracy; others $m_t=1$). The task score is the unweighted average of its metrics, and the leaderboard score is the unweighted macro-average over tasks:
> $$
> \bar s_t=\frac1{m_t}\sum_{j=1}^{m_t}s_{t,j},\qquad \text{GLUE}=\frac19\sum_{t=1}^{9}\bar s_t.
> $$
> ^def-glue-score

**Per-task metrics** (Table 1): Matthews correlation (CoLA); accuracy (SST-2, QNLI, RTE, WNLI); accuracy and $F_1$ (MRPC, QQP); Pearson and Spearman (STS-B); matched and mismatched accuracy (MNLI).

> [!definition] Matthews correlation coefficient
> For a binary confusion matrix with counts $TP,TN,FP,FN$,
> $$
> \mathrm{MCC}=\frac{TP\cdot TN-FP\cdot FN}{\sqrt{(TP+FP)(TP+FN)(TN+FP)(TN+FN)}}\in[-1,1],
> $$
> with $0$ equal to uninformed guessing; used because CoLA is unbalanced. The diagnostic set uses the three-class generalization $R_3$ (Gorodkin 2004). ^def-mcc

**Platform mechanics.**
- Users run on the provided test data and upload results; the site shows per-task scores and the macro-average that determines leaderboard position, plus fine- and coarse-grained diagnostic results.
- **Private test labels** for four of the datasets (the test sets "that have never been made public in any form") "will be used to ensure that the benchmark is used fairly".
- **Submission limit**: at most two submissions per day "in order to avoid overfitting to the private test data". Because users cannot see test labels, development-set results (Table 6) are the reference for tuning.
- **Tech stack** (Appendix D): React, Redux, TypeScript front end; Google Firebase storage; Google Cloud Functions run the grading script on each submission. The leaderboard has an expanded view per submission with a brief prose description and parameter count.
- **Model-agnostic**: any system able to produce predictions on all nine tasks can be scored; there is no requirement for a vector representation.

### Properties and caveats of the scoring rule

1. *Equal task weights.* A 146-example test (WNLI) counts as much as a 391k-example test (QQP).
2. *Mixed scales.* CoLA's MCC (range $-1$ to $1$, here reported $\times 100$) and accuracy percentages are averaged directly, though their chance levels differ (0 vs about 50).
3. *Averaging correlations and accuracies* treats them as commensurable.
4. *Distribution mismatch* is possible: QQP's test label distribution differs from training; WNLI's test (65% not-entailment) differs from training (balanced) and its dev set is adversarial.

## Examples

> [!example] Reproducing leaderboard averages from Table 4
> Using the test-set table in [[Wang 2018 - Baselines and Benchmark Results]], the GenSen row gives CoLA 7.7, SST-2 83.1, MRPC $(76.6+83.0)/2=79.8$, QQP $(82.9+59.8)/2=71.35$, STS-B $(79.3+79.2)/2=79.25$, MNLI $(71.4+71.3)/2=71.35$, QNLI 78.6, RTE 59.2, WNLI 65.1. Their mean is $66.2$, matching the printed Avg. The CBoW row gives $58.9$ the same way. ^ex-glue-average

```python
import numpy as np

def glue_score(task_scores):
    """task_scores: dict task -> list of metric values (already x100)."""
    per_task = [np.mean(v) for v in task_scores.values()]
    return float(np.mean(per_task))

genSen = {
 "CoLA":[7.7], "SST-2":[83.1], "MRPC":[76.6,83.0], "QQP":[82.9,59.8],
 "STS-B":[79.3,79.2], "MNLI":[71.4,71.3], "QNLI":[78.6], "RTE":[59.2], "WNLI":[65.1]}
print(round(glue_score(genSen), 1))   # 66.2

# sensitivity: what if WNLI were dropped?
print(round(np.mean([np.mean(v) for k,v in genSen.items() if k!="WNLI"]), 1))
```

## Connections

- The private-test-label and submission-cap design is a defense against test-set overfitting; the broader selection problem is analyzed in [[Researcher Degrees of Freedom]] and [[Garden of Forking Paths]].
- Aggregating into one number invites Goodhart effects: see [[Manheim Garrabrant 2018 - Variants of Goodhart's Law - Overview]].
- [[Liang 2022 - Holistic Evaluation Framework and Taxonomy]] moves from this scalar-per-task macro-average to a scenarios-by-metrics matrix and reports head-to-head win rates as an aggregation.

**Relevance to marketing measurement.** When comparing MMM or incrementality methods across many campaigns, a macro-average of a single error metric hides heterogeneity; keep per-campaign results and consider rank-based aggregation. A capped-submissions, withheld-ground-truth setup is also the right protocol for a fair method bake-off, see [[Experimental Benchmarks for Observational Ad Measurement]].

## See Also

- [[Wang 2018 - GLUE - Overview]]
- [[Wang 2018 - Appendices and Implementation Details]]
