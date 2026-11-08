---
title: "Dehghani 2021 - Community Bias and the GLUE Example"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Dehghani 2021 - The Benchmark Lottery.pdf]]"
source_location: "Sec. 4 and 4.1, pp. 10-11"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Dehghani 2021 - The Benchmark Lottery"
doc_type: paper
depends_on:
  - "[[Dehghani 2021 - Task Selection Bias Case Studies]]"
used_by:
  - "[[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]]"
aliases:
  - Community bias
  - GLUE community bias example
---

# Dehghani 2021 - Community Bias and the GLUE Example

> [!summary]
> Community bias is the higher-level process by which reviewers and readers decide which benchmarks are acceptable, so that "gamemasters" and the community jointly create the lottery. It pushes researchers toward safe, canonical tasks, makes broken benchmarks hard to fix, and favours incremental work. GLUE is the example: seven of its eight tasks are sequence-pair matching tasks, which favours architectures with built-in cross-attention.

## Overview

Even if task selection were random, it would create arbitrary selection pressures. The paper argues the community makes this stronger: "the community determines which benchmarks are acceptable for measuring progress on particular problems," implicitly, with "no hard rules." There can be "no task selection bias if there is no one to act upon it."

## Main Content

> [!definition] Community bias
> The community-level process that moderates task selection: reviewers ask for results on "must-have" benchmarks (e.g., "the method was not evaluated on X or Y dataset" or "not SOTA on dataset Z"), researchers gravitate to safe choices, and achieving state of the art on task Y is deemed less meaningful than on task X without explicit reasoning. It is the people-perspective on the lottery.
^def-community-bias

Consequences stated:
1. **Safe-choice drift.** Most new pretrained language models (ALBERT, RoBERTa, ELECTRA, XLNet) evaluate on GLUE even if alternatives exist.
2. **Hard to fix broken benchmarks.** Once well established, reviewers ask for results "regardless of suitability and/or appropriateness."
3. **Errors in canonical benchmarks.** Errors are likely small but matter in close calls. Northcutt et al. (2021) found label errors in the test sets of 10 widely used computer-vision, language and audio datasets (for example **6% of ImageNet validation examples**) and showed that correcting them changes model ranking, especially between models of similar performance. SNLI contains annotation artefacts: the correct label can often be inferred from the hypothesis alone (Gururangan et al., 2018) although it was treated as mandatory for NLI work.
4. **Incrementalism.** "Research is becoming too incremental and biased toward the common expectations," since a completely new approach struggles initially against established, carefully tuned models.

### GLUE example (Sec. 4.1)

- GLUE is "an aggregation of 8 datasets that have been previously proposed." Footnote 4: the authors manually checked papers proposing ideas to improve pretrained LMs with more than 500 citations; all used GLUE for evaluation (BERT, ALBERT, RoBERTa, XLNet, ELECTRA and others).
- **Seven out of eight** GLUE tasks are *matching* tasks requiring modelling of relationships between two or more sequences. This formulation "favors a certain class of models (e.g., Transformers which has this baked-in cross attention in the encoder)", conflating an advantage in problem formulation and input setting with the ability of an encoder to learn text representations.
- Cross-attention setups can be infeasible at scale (Guo et al., 2019; Seo et al., 2018).
- Counterfactual: had GLUE's tasks been swapped for other plausible and practical tasks, development of alternatives such as **pretrained ConvNets in NLP** (Tay et al., 2021) might have been encouraged.

## Examples

> [!example] Community-bias check for an internal model-comparison process
> **Setup.** A measurement team always compares candidate MMMs on the same three back-test windows because "that is what the dashboard shows."
> **Diagnosis.** The windows, not the models, determine which structural choices (e.g., seasonality handling) are rewarded; reviewers who ask "did you test on window X?" lock the choice in.
> **Mitigation drawn from the paper.** Document the windows' provenance ([[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]]), rotate or add windows ([[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]), and require a stated reason for any "must-test" request.
^ex-internal-community-bias

## Connections

- Reviewer-facing remedies, including "not being SOTA" as an invalid rejection reason, are in [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]] and the checklist in [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]].
- The ACIC organisers, who came "from diverse fields and are accustomed to different types of data structures and norms," explicitly argue this diversity reduces the chance the testbed favours one method class: [[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]].

## See Also

- [[Dehghani 2021 - The Benchmark Lottery - Overview]]
- [[Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting]]
