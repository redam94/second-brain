---
title: "Index: Gebru 2021 - Datasheets for Datasets"
tags:
  - type/index
  - source/ingested
  - topic/benchmarks
parent: "[[../_Index|Benchmark Development]]"
date_updated: 2026-11-08
concept_count: 6
---

# Gebru 2021 - Datasheets for Datasets

> [!abstract] Routing Summary
> This folder fully captures Gebru et al. (2021), *Datasheets for Datasets* (Communications of the ACM 64(12); arXiv:1803.09010v8): the objectives, development process, the complete lifecycle question set (motivation, composition, collection, preprocessing, uses, distribution, maintenance), the worked Movie Review Polarity datasheet, adoption and limits. It contains 6 notes.
> - Need the paper on one page or the section-to-note map? -> [[Gebru 2021 - Datasheets for Datasets - Overview]]
> - Need why datasheets exist, who they serve, or how the questions were developed and revised? -> [[Gebru 2021 - Motivation, Objectives and Development Process]]
> - Need the motivation, composition or collection-process questions (including people-only questions)? -> [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]]
> - Need the preprocessing, uses, distribution or maintenance questions? -> [[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]]
> - Need a completed example datasheet? -> [[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]]
> - Need adoption (model cards, factsheets), limits of datasheets, or a marketing-measurement datasheet sketch? -> [[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---|---|---|---|---|
| Datasheet for a dataset | [[Gebru 2021 - Datasheets for Datasets - Overview]] | overview | none | seven lifecycle sections, about 50 prompts |
| Electronics analogy; stakeholder objectives; design principles | [[Gebru 2021 - Motivation, Objectives and Development Process]] | concept | Overview | not prescriptive, not automated |
| Datasheet workflow (when to answer) | [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]] | definition | Motivation note | read before collecting, answer after |
| Motivation, composition, collection questions | [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]] | definition | Workflow | 3 + 12 (+3) + 6 (+5) prompts |
| Preprocessing, uses, distribution, maintenance questions | [[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]] | definition | Questions I | 3 + 5 + 6 + 7 prompts |
| Pang and Lee datasheet | [[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]] | example | both question notes | "Unknown to the authors" is an acceptable answer |
| Limits of datasheets | [[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]] | concept | all above | overhead, dynamic data, not a complete solution |
| Geo-experiment archive datasheet | [[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]] | example | question set | representativeness and "do not use for" rows |

## Notes

- [[Gebru 2021 - Datasheets for Datasets - Overview]] — CONTAINS: research question, contributions, Source Map for every section and appendix figure, definition of a datasheet, connections to benchmarks.
- [[Gebru 2021 - Motivation, Objectives and Development Process]] — CONTAINS: motivation (Sec. 1), electronics analogy, creator vs consumer objectives, design principles, two-year development process and changes made.
- [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]] — CONTAINS: workflow table; every question of Secs. 3.1-3.3 including people-only questions; representativeness example.
- [[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]] — CONTAINS: every question of Secs. 3.4-3.7; question inventory; versioned-benchmark example.
- [[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]] — CONTAINS: the full answer set of Figs. 1-4 condensed by section; what it demonstrates; consumer-reading example.
- [[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]] — CONTAINS: adoption table (Sec. 4), limits, reference-list overview, geo-experiment archive datasheet application.

## Sources
- [[raw/Gebru 2021 - Datasheets for Datasets.pdf]] — Gebru T, Morgenstern J, Vecchione B, Vaughan JW, Wallach H, Daumé III H, Crawford K (2021), Communications of the ACM 64(12); arXiv:1803.09010v8 (18 pages), the sole source.

## See Also
- [[Dehghani 2021 - The Benchmark Lottery - Overview]] — cites datasheets as a benchmark-creation checklist.
- [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]] — released code as reproducibility artefact.
- [[Experimental Benchmarks for Observational Ad Measurement]] — experimental benchmark datasets in advertising.
