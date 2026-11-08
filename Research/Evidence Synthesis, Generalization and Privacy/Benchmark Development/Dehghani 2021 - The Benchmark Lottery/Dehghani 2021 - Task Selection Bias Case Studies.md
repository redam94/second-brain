---
title: "Dehghani 2021 - Task Selection Bias Case Studies"
tags:
  - source/ingested
  - topic/benchmarks
  - type/theorem
  - type/example
  - doc/paper
source: "[[raw/Dehghani 2021 - The Benchmark Lottery.pdf]]"
source_location: "Sec. 3.1 (pp. 6-8), Figs. 1-3, Table 1; Appendix A-E (pp. 29-32), Tables 2-3"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dehghani 2021 - The Benchmark Lottery"
doc_type: paper
depends_on:
  - "[[Dehghani 2021 - Life of a Benchmark]]"
used_by:
  - "[[Dehghani 2021 - Score and Rank Aggregation and Human Evaluation Bias]]"
  - "[[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]]"
aliases:
  - Task selection bias
  - Benchmark ranking instability
---

# Dehghani 2021 - Task Selection Bias Case Studies

> [!summary]
> Using leaderboard data from SuperGLUE, VTAB, Long Range Arena and RL Unplugged, the authors recompute aggregate scores on subsets of tasks and show the identity of the top-ranked model changes with the subset. Disagreement between aggregate and single-task rankings is large (Kendall tau of about 0.43 to 0.65 on average in the cases reported), so declaring a winner from one aggregate score is fragile.

## Overview

> [!definition] Task selection bias
> The alignment between the tasks brought forth by the community and successful algorithms; "relative model performance is highly sensitive to the choice of tasks and datasets it is measured on", so the choice of benchmark tasks "constitutes a form of partiality and bias."
^def-task-selection-bias

**Method (common to all cases).** For each subset $S$ of the benchmark's tasks, compute the mean aggregated score of every model on $S$, rank the models, and compare rankings across subsets using (a) the number of distinct Top-$k$ rankings (for $k\in\{1,3,5,10\}$) and (b) Kendall rank correlation between the full-benchmark ranking and subset or single-task rankings.

## Main Content

### SuperGLUE (Sec. 3.1.1, Fig. 1, App. A-C)

- **Models:** over 55 top-performing models studied by Narang et al. (2021): Transformer variants (activation, normalisation, initialisation changes), Evolved Transformers, Synthesizers, Universal Transformer, Switch Transformer, and convolution-based models (lightweight and dynamic convolutions).
- **Tasks (8):** BoolQ, CB, CoPA, MultiRC, ReCoRD, RTE, WiC, WSC.
- **Ranking inconsistency (Fig. 1):** among the **70** ways of selecting 4 out of 8 tasks there are **6** distinct Top-1 models. For Top-3 and Top-5, "almost 60 out of 70" rankings do not agree. Rankings "become highly diverse as the subset of tasks selected from the benchmark is varied."
- **Per-task correlation (App. B, Fig. 5):** average Kendall correlation between the SuperGLUE score and each of the 8 tasks is **0.648**; in 6 of 8 individual tasks a different model wins.
- **Heatmap (App. A, Fig. 4):** the top-ranked model on all tasks does not perform best on other combinations; "no clear and strong pattern."

> [!example] Table 2 (App. C): Top-5 architectures by SuperGLUE task subset
> Tasks: A=BoolQ, B=CB, C=CoPA, D=MultiRC, E=ReCoRD, F=RTE, G=WiC, H=WSC. Models: ten architectures studied.
>
> | Tasks | Top-5 performing models (in order) |
> |---|---|
> | H | Universal, Switch, Adaptive Softmax, Weighted, Vanilla |
> | G | MoE, Switch, Vanilla, Funnel, Universal |
> | A, B | Adaptive Softmax, Vanilla, MoE, Switch, Weighted |
> | A, C | MoE, Switch, Adaptive Softmax, Vanilla, Universal |
> | D, H | Switch, Universal, Adaptive Softmax, MoE, Weighted |
> | B, E, H | Adaptive Softmax, Switch, MoE, Vanilla, Weighted |
> | F, G, H | Switch, MoE, Adaptive Softmax, Universal, Vanilla |
> | A, F, G | MoE, Switch, Vanilla, Adaptive Softmax, Vanilla (as printed; "Vanilla" repeats) |
> | C, F, G, H | Switch, MoE, Adaptive Softmax, Vanilla, Universal |
> | A, C, D, G | MoE, Switch, Adaptive Softmax, Vanilla, Universal |
> | All | Switch, MoE, Adaptive Softmax, Vanilla, Universal |
>
> Models never in any Top-5: Lightweight Conv, Dynamic Conv, Transparent Attention. Funnel and Weighted appear rarely.
^ex-table2-superglue

**Interpretation.** Universal, MoE, Adaptive Softmax and Switch "all take turns to become the best performing model on multiple task configurations", so "with some manipulation of the benchmark configuration, it is easy to endorse and favor the performance of one model over another." Optimistically, "not all models have equal odds": the benchmark suite filters out architectures that are poor everywhere.

### Visual Task Adaptation Benchmark (Sec. 3.1.2, Fig. 2, App. D)

- **Tasks (19)** in three groups: *Natural* (Caltech101, CIFAR100, DTD, Flowers102, Pets, Sun397, SVHN); *Specialized* (Resisc45, EuroSAT, Patch Camelyon, Diabetic Retinopathy); *Structured* (CLEVR counting and depth, dSprites location and orientation, SmallNORB azimuth and elevation, DMLab, KITTI).
- **Models:** 32 representation-learning models (WAE-GAN, VIVI, ResNet-50/101, different pretraining data such as ImageNet-21k vs JFT).
- **Category-level (Fig. 2a):** Kendall correlation of rankings from category combinations with the full VTAB score is imperfect; the structured (ST) category has correlation about **0.7** with the full score. Different subcategories fully disagree on the Top-1 winner.
- **Task-level (Fig. 2b):** mean Kendall correlation of single-task rankings with the aggregate about **0.60**, including tasks with negative correlation.
- **App. D (Fig. 6):** of 19 individual tasks there are **12 different winners**; for subsets of size 2 there are **20 different winners** (20 of 171 combinations), meaning 20 different models are best in different situations.

### Long Range Arena (Sec. 3.1.3, Table 1, App. E Table 3)

LRA ranks eleven efficient Transformers by aggregating across six tasks (ListOps, Long Text Classification, Long Text Retrieval, Pixel-wise Image Classification, and two Pathfinder variants). The analysis uses subsets of the five tasks t1 (Text), t2 (Retrieval), t3 (ListOps), t4 (Image), t5 (Path).

> [!example] Table 3 (App. E, abridged): Top-3 LRA models by task subset
> | Subset | Best | Rank 2 | Rank 3 |
> |---|---|---|---|
> | t1 (Text) | Linear Transformer | Performer | Transformer |
> | t2 (Retrieval) | Sparse Transformer | BigBird | Longformer |
> | t3 (ListOps) | Reformer | Synthesizer | Transformer |
> | t4 (Image) | Sparse Transformer | Performer | Transformer |
> | t5 (Path) | Performer | Linformer | Linear Transformer |
> | t1+t2 | BigBird | Sparse Transformer | Transformer |
> | t1+t3 | Transformer | BigBird | Synthesizer |
> | t1+t2+t3+t4 | Transformer | BigBird | Longformer |
> | t1+t3+t4+t5 | BigBird | Transformer | Longformer |
> | t1+t2+t4+t5 | Sparse Transformer | Performer | BigBird |
> | t2+t3+t4+t5 | BigBird | Transformer | Longformer |
> | t1+...+t5 (LRA score) | BigBird | Transformer | Longformer |
>
> The printed Table 3 lists 25 rows (all single tasks, all pairs, six of the ten triples, all four-task subsets, and the full set); rows shown here are a selection; the main-text Table 1 abbreviates models by letters (B=BigBird, T=Transformer, L=Longformer, S=Sparse, P=Performer, R=Reformer, Z=Synthesizer).
^ex-table3-lra

**Reading.** The identity of each Top-3 member "changes frequently as the subset of evaluation tasks is changed": Transformer wins on t1+t3 and on t3+t4, BigBird on most others, Performer when the Path task is included.

### RL Unplugged (Sec. 3.1.4, Fig. 3)

- **Setting:** offline RL from logged data; domains include Atari 2600 (**46 games**), DM Control Suite (**9 tasks**), Real-World RL and DM Locomotion. **7 baselines** from the ancillary files of Schrittwieser et al. (2021). Offline RL is chosen to sidestep seed variance (Henderson et al., 2018).
- **Rank correlations:** per-task rankings versus the aggregate: average about **0.49** (Atari, median human-normalised score) and **0.54** (DM Control, mean score).
- **Aggregator disagreement:** mean and median do not agree; Atari mean is dominated by a few games (e.g., Atlantis) where agents exceed human scores by orders of magnitude, so median is becoming standard. "Standardizing one over another ... comes at the cost of losing some information."

### Summary table of effect sizes

| Benchmark | Models | Tasks | Headline disagreement |
|---|---|---|---|
| SuperGLUE | 55+ | 8 | 6 distinct Top-1 among 70 four-task subsets; mean tau with single tasks 0.648 |
| VTAB | 32 | 19 | 12 winners over single tasks; 20 winners over pairs; mean tau about 0.60; structured vs full tau about 0.7 |
| LRA | 11 | 5 analysed | Top-3 identity changes in most subsets (Table 3) |
| RL Unplugged | 7 | 46 + 9 | mean tau about 0.49 (Atari) and 0.54 (DM Control) |

## Examples

> [!example] Counting distinct winners, a self-contained simulation (not from the paper)
> **Setup.** Synthetic scores for 55 models on 8 tasks, built as a shared "general ability" factor plus task-specific strengths. Count how many distinct Top-$k$ rankings arise over all task subsets, and the mean Kendall tau between the full score and single tasks.
>
> ```python
> import numpy as np, itertools
> from scipy.stats import kendalltau
> rng = np.random.default_rng(1)
> M, T = 55, 8
> S = 0.6 * rng.normal(size=(M, 1)) + 0.8 * rng.normal(size=(M, T))
> def topk(sel, k):
>     return tuple(np.argsort(-S[:, list(sel)].mean(1))[:k])
> for size in (1, 2, 4, 6, 8):
>     combos = list(itertools.combinations(range(T), size))
>     out = [f"top-{k}: {len({topk(c, k) for c in combos})}/{len(combos)}" for k in (1, 3, 5)]
>     print(f"{size} tasks ->", ", ".join(out))
> print(np.mean([kendalltau(S.mean(1), S[:, t])[0] for t in range(T)]))
> ```
>
> **Output observed (seed 1).** With 4 tasks: 6 distinct Top-1 models in 70 subsets, 41 distinct Top-3 rankings, 69 distinct Top-5 rankings; mean tau of 0.43 for single tasks versus the full mean.
> **Interpretation.** Even with a common-ability factor, modest task-specific variation reproduces the qualitative pattern the paper reports. Synthetic numbers are illustrative only and are not the paper's.
^ex-rank-instability-sim

## Connections

- Aggregator choice (mean, median, geometric mean, rank-based) is the next note: [[Dehghani 2021 - Score and Rank Aggregation and Human Evaluation Bias]].
- The causal-inference competition addresses a similar worry by evaluating each method over 77 settings and 25 metrics and finding method rankings stable: [[Dorie 2019 - Evaluation Metrics and Results by Method]]. Contrast: ACIC reports little method-by-setting interaction, SuperGLUE reports much.
- Model selection by marketing teams on a few holdout geos or tests faces the same sensitivity: [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]].

## See Also

- [[Dehghani 2021 - The Benchmark Lottery - Overview]]
- [[Dehghani 2021 - Community Bias and the GLUE Example]]
