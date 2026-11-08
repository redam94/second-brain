---
title: "Index: Wang 2018 - GLUE"
tags:
  - type/index
  - source/ingested
  - topic/benchmarks
  - doc/paper
parent: "[[../_Index|Benchmark Development]]"
date_updated: 2026-11-08
concept_count: 14
---

# Wang 2018 - GLUE

> [!abstract] Routing Summary
> This folder fully captures Wang, Singh, Michael, Hill, Levy and Bowman (2018/2019), *GLUE: A Multi-Task Benchmark and Analysis Platform for Natural Language Understanding* (ICLR 2019 version, arXiv 1804.07461v3): the nine-task suite and selection criteria, the macro-average scoring protocol and private-test platform, the 1,100-example diagnostic dataset, the baselines with Table 4 (test), Table 5 (diagnostic) and Table 6 (dev) reproduced, and the appendices. It contains 7 notes (paper is 20 pages).
> - Need the paper on one page, headline results, or the section-to-note map? -> [[Wang 2018 - GLUE - Overview]]
> - Need the nine tasks, Table 1 statistics, QNLI/WNLI recasting, or why these tasks? -> [[Wang 2018 - Task Suite and Selection Criteria]]
> - Need how the GLUE score is computed, MCC, private test labels, submission limits? -> [[Wang 2018 - Evaluation Protocol and Scoring]]
> - Need the diagnostic phenomena taxonomy, annotation process, R3, human baseline, Appendix E definitions? -> [[Wang 2018 - Diagnostic Dataset]]
> - Need baseline architectures, training, Table 4, multi-task vs single-task findings? -> [[Wang 2018 - Baselines and Benchmark Results]]
> - Need Table 5, analysis of logic failures, downward monotonicity, conclusion? -> [[Wang 2018 - Diagnostic Results and Analysis]]
> - Need Table 6 dev results, training-detail reconciliation, website details? -> [[Wang 2018 - Appendices and Implementation Details]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Nine-task suite (Table 1) | [[Wang 2018 - Task Suite and Selection Criteria]] | concept | existing datasets | 634 to 393k training examples |
| CoLA, SST-2, MRPC, QQP, STS-B, MNLI, QNLI, RTE, WNLI | [[Wang 2018 - Task Suite and Selection Criteria]] | definition | Table 1 | QNLI/WNLI are recasts |
| GLUE score | [[Wang 2018 - Evaluation Protocol and Scoring]] | definition | task metrics | unweighted macro-average |
| Matthews correlation | [[Wang 2018 - Evaluation Protocol and Scoring]] | definition | confusion matrix | 0 = guessing |
| Diagnostic example | [[Wang 2018 - Diagnostic Dataset]] | definition | NLI | 1,100 examples, 42/35/23% E/N/C |
| Artifact audit | [[Wang 2018 - Diagnostic Dataset]] | definition | fastText hypothesis-only | 32.7% and 36.4% |
| R3 correlation | [[Wang 2018 - Diagnostic Dataset]] | definition | Gorodkin 2004 | human 0.80, kappa 0.73 |
| Baselines | [[Wang 2018 - Baselines and Benchmark Results]] | concept | BiLSTM, ELMo, CoVe | best 70.0 |
| Multi-task gain | [[Wang 2018 - Baselines and Benchmark Results]] | example | Table 4 | 66.5 to 70.0 for Attn+ELMo |
| Diagnostic results | [[Wang 2018 - Diagnostic Results and Analysis]] | example | Table 5 | best overall 28 |
| Monotonicity failure | [[Wang 2018 - Diagnostic Results and Analysis]] | example | Table 5 | wrong-direction subsequence heuristic |
| Dev-test gap | [[Wang 2018 - Appendices and Implementation Details]] | example | Table 6 | RTE dev 78.4 vs test 59.2 (GenSen) |
| Training reconciliation | [[Wang 2018 - Appendices and Implementation Details]] | concept | Sec. 5, App. B | LR 1e-4 vs 1e-3 discrepancy |

## Notes

- [[Wang 2018 - GLUE - Overview]] — CONTAINS: research question, four contributions, key-results table, full Source Map, GLUE-score example.
- [[Wang 2018 - Task Suite and Selection Criteria]] — CONTAINS: selection rationale (vs SentEval, decaNLP), Table 1, definitions of all nine tasks, QNLI construction, WNLI quirks, MCC code.
- [[Wang 2018 - Evaluation Protocol and Scoring]] — CONTAINS: GLUE-score definition, MCC definition, platform mechanics, scoring caveats, reproduction of two leaderboard averages with code.
- [[Wang 2018 - Diagnostic Dataset]] — CONTAINS: taxonomy (Table 2), annotation process, Table 3 examples, R_K formula and code, artifact audit, human baseline, Appendix E definitions with examples, Table 7.
- [[Wang 2018 - Baselines and Benchmark Results]] — CONTAINS: architectures, attention equations, training, Table 4 in full, six findings, multi-task paired comparison.
- [[Wang 2018 - Diagnostic Results and Analysis]] — CONTAINS: Table 5 in full, coarse and fine-grained findings, conclusion, negative-R3 reading.
- [[Wang 2018 - Appendices and Implementation Details]] — CONTAINS: training-detail reconciliation, Table 6 in full, dev-versus-test observations, website details, dev-test gap code.

## Sources

- Wang, A., Singh, A., Michael, J., Hill, F., Levy, O., and Bowman, S. R. (2019). GLUE: A Multi-Task Benchmark and Analysis Platform for Natural Language Understanding. ICLR 2019; arXiv:1804.07461. Wang 2018 - GLUE

## See Also

- [[Research/Evidence Synthesis, Generalization and Privacy/Benchmark Development/Deng 2009 - ImageNet/_Index|Index: Deng 2009 - ImageNet]]
- [[Research/Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models/_Index|Index: Liang 2022 - Holistic Evaluation of Language Models]]
- [[Experimental Benchmarks for Observational Ad Measurement]]
