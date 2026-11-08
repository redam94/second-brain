---
title: "Index: Benchmark Development"
tags:
  - type/index
  - source/ingested
  - topic/benchmarks
parent: "[[../_Index|Evidence Synthesis, Generalization and Privacy]]"
date_updated: 2026-11-08
doc_type: index
concept_count: 45
---

# Benchmark Development

> [!abstract] Routing Summary
> This topic covers **how benchmarks are built, documented, scored and gamed**, plus what makes method comparisons valid. It includes canonical ML benchmarks (ImageNet, GLUE, HELM), dataset documentation (Datasheets), the validity of benchmark-driven progress (Benchmark Lottery), and simulation-based benchmarking of causal-inference methods (ACIC 2016). There are 6 sub-topics and 45 notes.
> - Need how a large labelled dataset was built and quality-controlled (crowdsourcing, adaptive vote thresholds)? → [[Deng 2009 - ImageNet/_Index|Deng 2009 (ImageNet)]]
> - Need multi-task benchmark design (task selection criteria, private test set, macro-average scoring, diagnostic set)? → [[Wang 2018 - GLUE/_Index|Wang 2018 (GLUE)]]
> - Need holistic, multi-metric evaluation (scenarios × metrics, calibration, robustness, fairness)? → [[Liang 2022 - Holistic Evaluation of Language Models/_Index|Liang 2022 (HELM)]]
> - Need a documentation standard for a dataset (the question set by lifecycle stage)? → [[Gebru 2021 - Datasheets for Datasets/_Index|Gebru 2021 (Datasheets)]]
> - Need why benchmark rankings are fragile (task selection, community bias, adaptive overfitting) and a reviewer checklist? → [[Dehghani 2021 - The Benchmark Lottery/_Index|Dehghani 2021 (Benchmark Lottery)]]
> - Need to benchmark causal-effect estimators with simulated ground truth? → [[Dorie 2019 - ACIC 2016 Causal Inference Competition/_Index|Dorie 2019 (ACIC 2016)]]
^routing-summary

## Sub-topics

- [[Deng 2009 - ImageNet/_Index|Deng 2009 - ImageNet]] (4 notes) — COVERS: the WordNet hierarchy; over-collection then Mechanical Turk verification with confidence-table vote thresholds (99.7% precision); dataset properties versus TinyImage, ESP, LabelMe and Lotus Hill; applications.
- [[Wang 2018 - GLUE/_Index|Wang 2018 - GLUE]] (7 notes) — COVERS: nine tasks and their selection criteria; evaluation protocol and macro-average scoring; the 1,100-example diagnostic set; baselines (best average 70.0) and diagnostic results; implementation details.
- [[Liang 2022 - Holistic Evaluation of Language Models/_Index|Liang 2022 - HELM]] (10 notes) — COVERS: the scenario × metric taxonomy; 16 core scenarios; the seven metrics defined formally; targeted evaluations; 30 models under prompting; all 25 findings; prompting ablations; limitations; appendix guide.
- [[Gebru 2021 - Datasheets for Datasets/_Index|Gebru 2021 - Datasheets for Datasets]] (6 notes) — COVERS: motivation and development process; the full question set from motivation to maintenance; the movie-review example datasheet; impact and challenges; a marketing-measurement datasheet sketch.
- [[Dehghani 2021 - The Benchmark Lottery/_Index|Dehghani 2021 - The Benchmark Lottery]] (9 notes) — COVERS: task-selection-bias case studies (SuperGLUE gives 6 different top models across 70 task subsets); community bias; stateful benchmarks and adaptive overfitting; rigged comparisons (RecSys, ALE); score aggregation; guidelines and statistical testing; a reviewer checklist.
- [[Dorie 2019 - ACIC 2016 Causal Inference Competition/_Index|Dorie 2019 - ACIC 2016]] (9 notes) — COVERS: shortcomings of method comparisons; estimands and ignorability; the simulation knobs (77 settings); submitted methods; metrics and results (flexible response-surface models such as BART win); variance decomposition; a toy Python simulation; marketing relevance.

## Cross-Cutting Concepts

- **Test-set reuse and adaptive overfitting**: [[Wang 2018 - Evaluation Protocol and Scoring]] (private labels, submission cap) and [[Dehghani 2021 - Stateful Benchmarks and Adaptive Overfitting]].
- **Aggregating many tasks into one score**: GLUE's macro-average in [[Wang 2018 - Evaluation Protocol and Scoring]], HELM's multiple metrics in [[Liang 2022 - The Seven Metrics]], and the critique in [[Dehghani 2021 - Score and Rank Aggregation and Human Evaluation Bias]].
- **Ground truth for observational methods**: simulation (Dorie 2019) versus experimental benchmarks for ad measurement ([[Experimental Benchmarks for Observational Ad Measurement]]).

## Sources

- [[raw/Deng 2009 - ImageNet.pdf]]
- [[raw/Wang 2018 - GLUE.pdf]]
- [[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]
- [[raw/Gebru 2021 - Datasheets for Datasets.pdf]]
- [[raw/Dehghani 2021 - The Benchmark Lottery.pdf]]
- [[raw/Dorie 2019 - Automated versus Do-It-Yourself Methods for Causal Inference.pdf]]

## See Also

- [[Experimental Benchmarks for Observational Ad Measurement]] — benchmarking observational ad measurement against RCTs
- [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]] — applied LLM evaluation in the ML cluster
- [[Meta-Analysis/_Index|Meta-Analysis]] — aggregating results across studies, close kin to aggregating results across benchmark tasks
