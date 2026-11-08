---
title: "Index: Liang 2022 - Holistic Evaluation of Language Models"
tags:
  - type/index
  - source/ingested
  - topic/benchmarks
  - doc/paper
parent: "[[../_Index|Benchmark Development]]"
date_updated: 2026-11-08
concept_count: 20
---

# Liang 2022 - Holistic Evaluation of Language Models (HELM)

> [!abstract] Routing Summary
> This folder captures Liang et al. (2022/2023), *Holistic Evaluation of Language Models* (arXiv 2211.09110; TMLR 08/2023; 162 pages): the scenario/metric taxonomy, 16 core scenarios, the seven metrics with formal definitions, 7 targeted evaluations, the 30 models and 5-shot adaptation, all 25 top-level findings, the meta-analysis and prompting ablations, missing pieces and limitations. Appendices are summarized at section level. It contains 10 notes.
> - Need the paper on one page, headline numbers, or the section-to-note map? -> [[Liang 2022 - HELM - Overview]]
> - Need scenario/adaptation/metric primitives, the task/domain/language taxonomy, selection principles, desiderata taxonomy? -> [[Liang 2022 - Holistic Evaluation Framework and Taxonomy]]
> - Need the 16 core scenarios and why each dataset was chosen? -> [[Liang 2022 - Core Scenarios and Dataset Selection]]
> - Need formal definitions of ECE, selective classification, worst-case robustness, fairness, bias TVD, toxicity, efficiency? -> [[Liang 2022 - The Seven Metrics]]
> - Need language, knowledge, reasoning, memorization, disinformation, bias, toxicity evaluations? -> [[Liang 2022 - Targeted Evaluations]]
> - Need the 30 models (Table 5), contamination, or the 5-shot prompting design? -> [[Liang 2022 - Models and Adaptation via Prompting]]
> - Need findings 1-13 (core scenarios)? -> [[Liang 2022 - Findings 1 to 13 Core Scenarios]]
> - Need findings 14-25 (targeted, prompting, scale)? -> [[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]]
> - Need inter-metric correlations, win rates, seed variance, prompt ablations? -> [[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]]
> - Need related work, what is missing, limitations, conclusion? -> [[Liang 2022 - Related Work, Missing Pieces and Limitations]]
> - Need a map of the appendices? -> [[Liang 2022 - Appendix Guide]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Scenario, adaptation, metric, run | [[Liang 2022 - Holistic Evaluation Framework and Taxonomy]] | definition | none | runs are (scenario, adaptation, metric) triples |
| Task/domain/language taxonomy, 3 W's | [[Liang 2022 - Holistic Evaluation Framework and Taxonomy]] | concept | ACL 2022 tracks | cover axes independently |
| Desiderata taxonomy | [[Liang 2022 - Holistic Evaluation Framework and Taxonomy]] | concept | Table 2-3 | black-box measurable subset selected |
| 16 core scenarios | [[Liang 2022 - Core Scenarios and Dataset Selection]] | concept | taxonomy | 9 QA, 2 IR, 2 summarization, sentiment, toxicity, RAFT |
| Accuracy metrics | [[Liang 2022 - The Seven Metrics]] | definition | scenarios | scenario-specific |
| ECE, selective classification | [[Liang 2022 - The Seven Metrics]] | definition | top probability | 10 uniform-mass bins |
| Worst-case robustness | [[Liang 2022 - The Seven Metrics]] | definition | transformations | Robustness <= Accuracy |
| Demographic representation, stereotypical associations | [[Liang 2022 - The Seven Metrics]] | definition | word lists | TVD to uniform |
| Training and inference efficiency | [[Liang 2022 - The Seven Metrics]] | definition | energy, runtime | PUE 1.1 |
| Targeted evaluations | [[Liang 2022 - Targeted Evaluations]] | concept | metrics | 7 evaluations, 26 scenarios |
| Models and adaptation | [[Liang 2022 - Models and Adaptation via Prompting]] | concept | none | 30 models, 5-shot, 3 seeds |
| Findings 1-13 | [[Liang 2022 - Findings 1 to 13 Core Scenarios]] | theorem | core results | instruction tuning wins |
| Findings 14-25 | [[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]] | theorem | targeted results | 79.1% vs 30.2% adaptation swing |
| Head-to-head win rate | [[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]] | definition | Fig. 26 | text-davinci-002 above 90% |
| Missing pieces by axis | [[Liang 2022 - Related Work, Missing Pieces and Limitations]] | concept | five axes | scenarios, metrics, evaluations, models, adaptation |
| Appendix map | [[Liang 2022 - Appendix Guide]] | concept | all | emissions worked examples |

## Notes

- [[Liang 2022 - HELM - Overview]] — CONTAINS: three elements of holistic evaluation, headline numbers, contributions, Source Map of all sections and appendices, vector-versus-matrix example.
- [[Liang 2022 - Holistic Evaluation Framework and Taxonomy]] — CONTAINS: primitives (Defs.), task table from ACL tracks, 3 W's domains, languages, selection principles, desiderata taxonomy (Tables 2-3), scenario-metric matrix (Table 4), coverage-count example.
- [[Liang 2022 - Core Scenarios and Dataset Selection]] — CONTAINS: 16-scenario inventory, problem settings for QA, IR (pointwise re-ranking), summarization, sentiment, toxicity, RAFT, selection rationales, MRR code.
- [[Liang 2022 - The Seven Metrics]] — CONTAINS: accuracy-metric table, NDCG, ECE (population and binned), selective classification, worst-case robustness, counterfactual fairness, bias TVD definitions, toxicity, efficiency formulas, ECE/TVD/robustness code.
- [[Liang 2022 - Targeted Evaluations]] — CONTAINS: language modeling and BLiMP, WikiFact construction, reasoning primitives and realistic tasks, memorization setup, disinformation tasks and human evaluation, BBQ, RealToxicityPrompts and BOLD.
- [[Liang 2022 - Models and Adaptation via Prompting]] — CONTAINS: Table 5 (30 models), access categories, caveats (versioning, technical issues, contamination, fairness), prompting design, separate vs joint scoring.
- [[Liang 2022 - Findings 1 to 13 Core Scenarios]] — CONTAINS: findings 1-13 verbatim numbers, summary table, robustness-drop example.
- [[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]] — CONTAINS: findings 14-25 with numbers, summary table, adaptation-swing example.
- [[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]] — CONTAINS: inter-metric correlations, win-rate definition, scale threshold, time and access trends, seed variance, shots, prompt formatting, win-rate example and code.
- [[Liang 2022 - Related Work, Missing Pieces and Limitations]] — CONTAINS: benchmark lineage, five-axis missing list, limitations, validity and reliability, Strathern's Law, conclusion, design checklist.
- [[Liang 2022 - Appendix Guide]] — CONTAINS: appendix-to-note map, emissions estimates for five models with code, default adaptation policies.

## Sources

- Liang, P., Bommasani, R., Lee, T., Tsipras, D., Soylu, D., et al. (2023). Holistic Evaluation of Language Models. Transactions on Machine Learning Research; arXiv:2211.09110. [[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]

## See Also

- [[Deng 2009 - ImageNet/_Index|Index: Deng 2009 - ImageNet]]
- [[Wang 2018 - GLUE/_Index|Index: Wang 2018 - GLUE]]
- [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]]
- [[Experimental Benchmarks for Observational Ad Measurement]]
