---
title: "Index: Dehghani 2021 - The Benchmark Lottery"
tags:
  - type/index
  - source/ingested
  - topic/benchmarks
parent: "[[../_Index|Benchmark Development]]"
date_updated: 2026-11-08
concept_count: 9
---

# Dehghani 2021 - The Benchmark Lottery

> [!abstract] Routing Summary
> This folder fully captures Dehghani et al. (2021), *The Benchmark Lottery* (arXiv:2107.07002; NeurIPS Datasets and Benchmarks): task selection bias with its SuperGLUE, VTAB, Long Range Arena and RL Unplugged case studies, score aggregation, community bias (GLUE), benchmark statefulness and adaptive overfitting, rigging the lottery (recommender systems, ALE), the recommendations (guidelines, statistical testing, living benchmarks) and the Appendix G reviewer checklist. It contains 9 notes.
> - Need the paper on one page or the section-to-note map? -> [[Dehghani 2021 - The Benchmark Lottery - Overview]]
> - Need the benchmark life cycle (inception to renewal)? -> [[Dehghani 2021 - Life of a Benchmark]]
> - Need the numbers: how many distinct winners per task subset, rank correlations, Tables 1-3? -> [[Dehghani 2021 - Task Selection Bias Case Studies]]
> - Need aggregation rules (mean, geometric mean, average rank, robust rank) or annotator bias? -> [[Dehghani 2021 - Score and Rank Aggregation and Human Evaluation Bias]]
> - Need community bias, GLUE as example, label errors in benchmarks? -> [[Dehghani 2021 - Community Bias and the GLUE Example]]
> - Need test-set reuse, the boosting attack, adaptive data analysis? -> [[Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting]]
> - Need RecSys and ALE evaluation inconsistencies or Table 4? -> [[Dehghani 2021 - Rigging the Lottery - RecSys and ALE]]
> - Need building blocks, significance-testing advice, living benchmarks? -> [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]
> - Need the reviewer checklist or the marketing-measurement mapping? -> [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Benchmark lottery; four mechanisms | [[Dehghani 2021 - The Benchmark Lottery - Overview]] | overview | none | non-algorithmic factors decide perceived winners |
| Benchmark life cycle | [[Dehghani 2021 - Life of a Benchmark]] | concept | Overview | five stages, maturity makes variance comparable to gains |
| Task selection bias | [[Dehghani 2021 - Task Selection Bias Case Studies]] | theorem | Life cycle | 6 Top-1 winners among 70 SuperGLUE 4-task subsets; 20 winners among VTAB task pairs |
| Aggregation rules | [[Dehghani 2021 - Score and Rank Aggregation and Human Evaluation Bias]] | definition | Task selection bias | mean favours well-rounded models; alternatives listed |
| Community bias | [[Dehghani 2021 - Community Bias and the GLUE Example]] | concept | Task selection bias | 7 of 8 GLUE tasks are matching tasks |
| Statefulness and adaptive reuse | [[Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting]] | theorem | Community bias | boosting attack gains $\Omega(\sqrt{i/N})$ |
| Rigging the lottery | [[Dehghani 2021 - Rigging the Lottery - RecSys and ALE]] | concept | Statefulness | metric and protocol choice reverse rankings |
| Guidelines and statistical testing | [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]] | definition | all mechanisms | multiple fixed splits; Wilcoxon vs per-dataset tests with correction |
| Reviewer checklist | [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]] | concept | Guidelines | nine checklist items; marketing mapping |

## Notes

- [[Dehghani 2021 - The Benchmark Lottery - Overview]] — CONTAINS: central claim, evidence, key numbers, full Source Map, definitions of the lottery and its four mechanisms.
- [[Dehghani 2021 - Life of a Benchmark]] — CONTAINS: five-stage life cycle with examples; benchmark roles; why stage matters.
- [[Dehghani 2021 - Task Selection Bias Case Studies]] — CONTAINS: SuperGLUE (Fig. 1, Table 2), VTAB (Fig. 2, Fig. 6), LRA (Tables 1 and 3), RL Unplugged (Fig. 3); effect-size summary; Python ranking-instability simulation.
- [[Dehghani 2021 - Score and Rank Aggregation and Human Evaluation Bias]] — CONTAINS: difficulty facets; aggregation rules table; annotation bias; mean-vs-rank example and code.
- [[Dehghani 2021 - Community Bias and the GLUE Example]] — CONTAINS: community bias definition; label errors (6% of ImageNet validation), SNLI artefacts; GLUE matching-task analysis.
- [[Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting]] — CONTAINS: adaptive-reuse statement; counter-evidence table; tricks accumulation; boosting-attack simulation.
- [[Dehghani 2021 - Rigging the Lottery - RecSys and ALE]] — CONTAINS: recommender inconsistencies; Table 4 datasets; ALE divergence table; metric-reversal example.
- [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]] — CONTAINS: building blocks; creation, usage and reviewer guidelines; random-sample view of results; test choice; living benchmarks; epilogue; code.
- [[Dehghani 2021 - Reviewer Checklist and Marketing Measurement Applications]] — CONTAINS: Appendix G checklist (nine items); mechanism mapping; marketing-measurement mapping and MMM example.

## Sources
- [[raw/Dehghani 2021 - The Benchmark Lottery.pdf]] — Dehghani M, Tay Y, Gritsenko AA, Zhao Z, Houlsby N, Diaz F, Metzler D, Vinyals O (2021), arXiv:2107.07002v1 (34 pages), the sole source. Cited external works (Blum and Hardt, Dwork et al., Recht et al., Bouthillier et al., Demšar, Dror et al.) are citation-only.

## See Also
- [[Gebru 2021 - Datasheets for Datasets - Overview]] — documentation checklist cited by this paper.
- [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]] — a benchmark designed against several lottery mechanisms.
- [[Researcher Degrees of Freedom]], [[Garden of Forking Paths]], [[Multiple Testing Corrections]] — statistical parallels.
