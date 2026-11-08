---
title: "Dehghani 2021 - Score and Rank Aggregation and Human Evaluation Bias"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Dehghani 2021 - The Benchmark Lottery.pdf]]"
source_location: "Secs. 3.2-3.3, pp. 9-10"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dehghani 2021 - The Benchmark Lottery"
doc_type: paper
depends_on:
  - "[[Dehghani 2021 - Task Selection Bias Case Studies]]"
used_by:
  - "[[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]"
aliases:
  - Benchmark score aggregation
  - Rank aggregation for benchmarks
  - Annotation bias
---

# Dehghani 2021 - Score and Rank Aggregation and Human Evaluation Bias

> [!summary]
> Reporting one aggregate score hides how tasks differ in difficulty, headroom, size, class count and distribution shift, and tasks that share inputs are over-weighted. The paper lists alternatives (macro-average, geometric mean, average rank, robust average rank, elimination ranking) and notes that the `and` operator of an average favours well-rounded models. Separately, which annotators score a model can change rankings.

## Overview

Having shown that task subsets change winners ([[Dehghani 2021 - Task Selection Bias Case Studies]]), Section 3.2 asks how aggregation itself matters, and Section 3.3 adds a within-task source of the same problem: **human evaluation bias**.

## Main Content

### Why aggregation is hard (Sec. 3.2)

"One of the main difficulties for aggregating scores of multiple tasks is the lack of a clear mechanism for incorporating the difficulty of tasks." Facets of difficulty named:
- training-set size per task;
- number of prediction classes (hence the random-baseline score);
- distribution shift between pretraining and downstream data;
- different performance ranges across tasks;
- over-representation of a domain by several tasks (Balduzzi et al., 2018).

Concrete case: in VTAB several tasks reuse the same inputs, so those domains are up-weighted. CLEVR-Count and CLEVR-Dist use the same data for different tasks; given the negative correlation of CLEVR-Dist with the mean score, this up-weighting makes the aggregate noisier.

The introduction adds that taking the mean ("the `and` operator") is an inductive bias favouring well-rounded models: a model poor at any bundled task "may be set up for failure," unfairly assuming what practitioners want.

> [!definition] Aggregation alternatives listed in the paper
> Let $s_{mt}$ be the score of model $m$ on task $t$, $T$ tasks, $r_{mt}$ the rank of $m$ on $t$.
>
> | Rule | Definition | Property noted |
> |---|---|---|
> | Arithmetic mean | $\bar s_m = \frac1T\sum_t s_{mt}$ | Bounded scores limit range and implicitly up-weight tasks with more headroom; sensitive to outlier tasks (Atari, Atlantis) |
> | Macro-average | Average within task groups, then across groups (Zhai et al., 2019) | Offsets domain up-weighting |
> | Geometric mean | $\left(\prod_t s_{mt}\right)^{1/T}$ | Addresses the headroom problem of arithmetic means on bounded scales |
> | Median (human-normalised) | median of $s_{mt}/h_t$ across $t$ | Robust to a few huge-score games; standard in Atari |
> | Average rank | $\frac1T\sum_t r_{mt}$ | Ignores absolute differences (Dwork et al., 2001; Tabrizi et al., 2015) |
> | Robust average rank | Bin accuracy into 1% buckets; methods in a bucket share a rank; then average ranks | Reduces rank flips from noise (Hao and Ryan, 2016) |
> | Elimination ranking | Iteratively eliminate the worst; equivalent to exhaustive-ballot voting | Rank-based social-choice rule |
^def-aggregation-rules

### Human evaluation bias (Sec. 3.3)

For natural-language generation, human evaluation consistency varies with annotator expertise, cognitive bias and inherent ambiguity. Selecting a subset of annotators can change model comparisons (Schoch et al., 2020; van der Lee et al., 2019; Amidei et al., 2018, 2020). This is "annotation bias" and "also contribute[s] to the benchmark lottery."

## Examples

> [!example] Mean versus rank aggregation can disagree
> **Setup.** Two models on three tasks with scores (A: 0.90, 0.60, 0.55) and (B: 0.80, 0.70, 0.70) where the third task has less headroom.
> **Mean.** A = 0.683, B = 0.733, so B wins. **Ranks per task.** A: 1, 2, 2 (average 1.67); B: 2, 1, 1 (average 1.33), B wins.
> Now change task 1 to (A: 0.99, B: 0.60). Mean A = 0.713, B = 0.667, A wins; average rank A = 1.67, B = 1.33 still B. The mean is driven by one large gap, the rank rule is not.
> **Interpretation.** Whether "best" means largest total gain or most frequent winner is a design decision that should be stated and justified; this is why the paper recommends reporting disaggregated scores.
^ex-mean-vs-rank

```python
import numpy as np
from scipy.stats import rankdata, gmean
S = np.array([[0.99, 0.60, 0.55],   # model A
              [0.60, 0.70, 0.70]])  # model B
print("mean :", S.mean(1))
print("gmean:", gmean(S, axis=1))
print("avg rank (1=best):", np.mean([rankdata(-S[:, t]) for t in range(S.shape[1])], axis=0))
```

## Connections

- Score aggregation is also the central issue for composite marketing KPIs and for averaging validation error across holdout geos or channels; see [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]].
- The ACIC competition reports RMSE, bias, coverage, interval length, PEHE and run time separately rather than collapsing them: [[Dorie 2019 - Evaluation Metrics and Results by Method]].

## See Also

- [[Dehghani 2021 - The Benchmark Lottery - Overview]]
- [[Dehghani 2021 - Community Bias and the GLUE Example]]
