---
title: "Dehghani 2021 - Life of a Benchmark"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - doc/paper
source: "[[raw/Dehghani 2021 - The Benchmark Lottery.pdf]]"
source_location: "Sec. 2 and 2.1, pp. 4-5"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dehghani 2021 - The Benchmark Lottery"
doc_type: paper
depends_on:
  - "[[Dehghani 2021 - The Benchmark Lottery - Overview]]"
used_by:
  - "[[Dehghani 2021 - Task Selection Bias Case Studies]]"
  - "[[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]"
aliases:
  - Benchmark life cycle
  - Benchmark maturity and renewal
---

# Dehghani 2021 - Life of a Benchmark

> [!summary]
> Benchmarks pass through inception, gaining traction or fizzling out, an active phase, maturity or degeneration, and renewal. The stage matters because the incentives and statistical validity of results differ: early benchmarks reward new ideas, mature benchmarks reward hill-climbing on the last 0.01% and can no longer separate real gains from variance.

## Overview

Section 2 frames the problem. Measuring progress is hard ("What are the best setup and task to use for evaluation?", "Which metrics are suitable?", "What are the best practices for fair benchmarking?") and "the jury is still out on most of these questions." At no point can superiority of a model on a task be claimed "with full confidence", yet the answer to "Which algorithm is currently the best?" steers a field.

The authors view model development as exploration of a fitness surface in which both the **initial point** and the **fitness function** (the benchmarks) drive the optimum reached. A class of models that gains recognition receives more follow-up research, tuning and adaptation, which is "a valid way of propelling the field further", but it raises the opportunity-cost question of what the same effort could have achieved on a different model class.

## Main Content

> [!definition] Benchmark life cycle (Sec. 2.1)
> | Stage | Description (paper) | Examples given |
> |---|---|---|
> | 1. **Inception** | Proposed implicitly as an example task in a methods paper, or explicitly as a shared task, often with a leaderboard or competition site | SST (implicit, Socher et al. 2013); SQuAD, GLUE, XTREME (explicit) |
> | 2. **Gaining traction or fizzling out** | Early traction and citations drive adoption "similar to how posts become viral"; leaderboards gamify. Fizzling: oversaturation, inconvenient metrics or setups. Sudden traction when an influential paper uses it | Subject-verb agreement (Linzen et al. 2016) popular after use to show RNNs beat Transformers on hierarchical structure |
> | 3. **Active and in-progress** | Many submissions; the bar for improvement is higher; "hot" benchmarks make any state-of-the-art result newsworthy | Long Range Arena |
> | 4. **Maturity, degeneration or deprecation** | Task considered solved (e.g., human parity) or no meaningful progress; attention stops except "the last 0.01% percentage improvement" | SQuAD leaderboard |
> | 5. **Renewal** | Original or independent authors propose variants to fix issues or increase difficulty | SQuAD v2; SNLI to MultiNLI; ImageNet-A/O/C/R; QMNIST replacing MNIST |
^def-benchmark-lifecycle

(The text numbers a "Stage 3" benchmark as active and later calls mature benchmarks "Stage 4", so the numbering above matches the paper's usage.)

> [!definition] Benchmarks as diagnostic tools
> A benchmark is "often proposed as a means to evaluate relative model quality" but "can sometimes also be employed as a diagnostic tool or suite that allows practitioners to peer into the behavior of their models."
^def-benchmark-roles

### Why the stage matters later in the paper

- **Statefulness** (Sec. 5) grows with age: late participants inherit tricks, checkpoints and hyperparameters; see [[Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting]].
- **Statistical testing** (Sec. 7.2) becomes critical at Stage 4, "where the magnitude of model improvements may become comparable to the model variance"; see [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]].
- **Renewal** is the precursor to the "living benchmark" proposal.

## Examples

> [!example] Locating a benchmark on the life cycle
> **Setup.** A public benchmark has 400 citing papers, its top-10 leaderboard entries differ by less than 0.2 points, and the top entries are ensembles.
> **Classification.** Stage 4 (maturity): gains are comparable to run-to-run variance and hill-climbing dominates.
> **Action implied by the paper.** Use it as a sanity check rather than a target; require multiple splits or seeds and significance tests; look for renewal versions.
^ex-lifecycle-location

## Connections

- Datasheet maintenance and version questions map onto stages 4 and 5: [[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]].
- The ACIC competition deliberately avoided a public leaderboard and repeat submissions to stay at stage 1 for each method: [[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]].

## See Also

- [[Dehghani 2021 - The Benchmark Lottery - Overview]]
- [[Dehghani 2021 - Task Selection Bias Case Studies]]
