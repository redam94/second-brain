---
title: "Dehghani 2021 - The Benchmark Lottery - Overview"
tags:
  - source/ingested
  - topic/benchmarks
  - type/overview
  - doc/paper
source: "[[raw/Dehghani 2021 - The Benchmark Lottery.pdf]]"
source_location: "Whole paper, arXiv:2107.07002v1, pp. 1-34 (NeurIPS 2021 Datasets and Benchmarks)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dehghani 2021 - The Benchmark Lottery"
doc_type: paper
depends_on:
  - "[[Dehghani 2021 - Life of a Benchmark]]"
used_by:
  - "[[Dehghani 2021 - Task Selection Bias Case Studies]]"
  - "[[Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting]]"
  - "[[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]"
aliases:
  - Benchmark Lottery
  - Dehghani benchmark lottery
---

# Dehghani 2021 - The Benchmark Lottery - Overview

> [!summary]
> Dehghani, Tay, Gritsenko, Zhao, Houlsby, Diaz, Metzler and Vinyals argue that many factors other than algorithmic superiority determine which method looks best on ML benchmarks. They show empirically that rankings change substantially when the subset of tasks changes (**task selection bias**), argue that the research community reinforces this (**community bias**), that benchmarks are **stateful** because each submission builds on earlier test-set exposure, and that communities without canonical benchmarks can **rig the lottery**. They close with guidelines, statistical-testing advice, living benchmarks and a reviewer checklist.

## Overview

**Central claim.** "For a method to emerge successful, it has to first win the benchmark lottery": align with the community-accepted suite, at the right moment, with the right tricks. The lottery metaphor extends Hooker's *hardware lottery*.

**Evidence.** Leaderboard data re-analysed for SuperGLUE (55+ models, 8 tasks), VTAB (32 models, 19 tasks), Long Range Arena (11 models, 5 tasks in the analysed table) and RL Unplugged (Atari, 46 games; DM Control, 9 tasks; 7 baselines). Plus literature case studies: GLUE, recommender-system and ALE evaluation inconsistencies.

**Key results.**
- Among the 70 four-of-eight SuperGLUE task subsets, there are 6 distinct Top-1 models; for Top-3 or Top-5 "almost 60 out of 70" subset rankings disagree.
- VTAB: 12 different winners across 19 single-task rankings; 20 different winners among size-2 task subsets; mean Kendall correlation of single-task rankings with the full score about 0.60.
- RL Unplugged: average rank correlation of single-task with aggregate about 0.49 (Atari) and 0.54 (DM Control); mean and median aggregates disagree.
- In the adaptive-analysis regime, once the number of model queries $i \gg N$ (test set size), test results no longer indicate model quality (Dwork et al., Blum and Hardt).

## Main Content

### Source Map

| Paper section | Pages | Content | Covered in |
|---|---|---|---|
| Abstract, 1 Introduction | 1-4 | Lottery concept, contributions, roadmap | This note |
| 2 Background | 4 | Evaluation questions, hardware lottery link, model dev as fitness-surface optimisation | [[Dehghani 2021 - Life of a Benchmark]] |
| 2.1 Life of a benchmark | 5 | Inception, traction, active, maturity, renewal | [[Dehghani 2021 - Life of a Benchmark]] |
| 3 Task selection bias, Fig. 1 | 6 | SuperGLUE disagreement | [[Dehghani 2021 - Task Selection Bias Case Studies]] |
| 3.1.2 VTAB, Fig. 2 | 7 | 19 tasks, 3 categories, 32 models | [[Dehghani 2021 - Task Selection Bias Case Studies]] |
| 3.1.3 LRA, Table 1 | 7-8 | Top-3 by task subset | [[Dehghani 2021 - Task Selection Bias Case Studies]] |
| 3.1.4 RL Unplugged, Fig. 3 | 8-9 | Atari/DM Control rank correlations | [[Dehghani 2021 - Task Selection Bias Case Studies]] |
| 3.2 Score and rank aggregation | 9-10 | Mean, macro-average, geometric mean, average rank, robust rank, elimination | [[Dehghani 2021 - Score and Rank Aggregation and Human Evaluation Bias]] |
| 3.3 Human evaluation bias | 10 | Annotator subset effects | [[Dehghani 2021 - Score and Rank Aggregation and Human Evaluation Bias]] |
| 4, 4.1 Community bias, GLUE | 10-11 | Reviewer-driven task choice, label errors, annotation artefacts | [[Dehghani 2021 - Community Bias and the GLUE Example]] |
| 5 Benchmarks are stateful | 11-13 | Adaptive data analysis, boosting attack, tricks | [[Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting]] |
| 6, 6.1, 6.2 Rigging the lottery | 13-14 | RecSys, ALE inconsistencies | [[Dehghani 2021 - Rigging the Lottery - RecSys and ALE]] |
| 7.1 Guidelines | 14-17 | Building blocks, creation/usage/reviewer guidelines | [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]] |
| 7.2 Statistical testing | 17-18 | Random-sample view, multiple splits, Wilcoxon, Dror et al. | [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]] |
| 7.3 Living benchmarks, 8 Epilogue | 18-19 | Creeping overfitting, GEM, Dynabench | [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]] |
| References | 19-28 | Citation list | Cited inline in the notes above |
| Appendix A-C | 29-30 | SuperGLUE rank heatmap, per-task correlation, Table 2 | [[Dehghani 2021 - Task Selection Bias Case Studies]] |
| Appendix D | 31 | VTAB disagreement | [[Dehghani 2021 - Task Selection Bias Case Studies]] |
| Appendix E, Table 3 | 32 | LRA all subsets | [[Dehghani 2021 - Task Selection Bias Case Studies]] |
| Appendix F, Table 4 | 33 | RecSys datasets | [[Dehghani 2021 - Rigging the Lottery - RecSys and ALE]] |
| Appendix G | 34 | Reviewer checklist | [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]] |

> [!definition] Benchmark lottery
> The overall fragility of the ML benchmarking process: "many factors, other than fundamental algorithmic superiority, may lead to a method being perceived as superior." The factors treated are task selection bias, community bias, statefulness and rigging.
^def-benchmark-lottery

> [!definition] Four mechanisms of the lottery
> | Mechanism | Paper section | One-line statement |
> |---|---|---|
> | Task selection bias | 3 | Relative performance depends strongly on which tasks are included |
> | Community bias | 4 | The community decides, implicitly, which benchmarks are acceptable, amplifying task selection |
> | Statefulness | 5 | Each new method is built on knowledge of earlier test-set results and tricks |
> | Rigging | 6 | Without canonical setups, researchers can fit the benchmark to the model |
^def-lottery-mechanisms

## Examples

See [[Dehghani 2021 - Task Selection Bias Case Studies]] for numerical examples, and the Python simulations in that note and in [[Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting]].

## Connections

- **Documentation remedy.** [[Gebru 2021 - Datasheets for Datasets - Overview]] is cited as a creation checklist.
- **Synthetic-benchmark counterpart.** [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]] is a benchmark designed to avoid several lottery mechanisms (broad method set, separate designers, no leaderboard feedback, public code).
- **Statistical foundations.** The adaptive-reuse argument is the benchmark version of [[Researcher Degrees of Freedom]] and the [[Garden of Forking Paths]]; multiplicity is discussed in [[Multiple Testing Corrections]].
- **Marketing measurement.** Model-selection on a single holdout, or on a fixed set of past experiments, is exposed to the same lottery; see [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]].

## See Also

- [[Dehghani 2021 - Life of a Benchmark]]
- [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]
- [[Experimental Benchmarks for Observational Ad Measurement]]
