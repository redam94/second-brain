---
title: "Gebru 2021 - Datasheets for Datasets - Overview"
tags:
  - source/ingested
  - topic/benchmarks
  - type/overview
  - doc/paper
source: "[[raw/Gebru 2021 - Datasheets for Datasets.pdf]]"
source_location: "Whole paper, arXiv:1803.09010v8, pp. 1-18 (Commun. ACM 64(12), 2021)"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Gebru 2021 - Datasheets for Datasets"
doc_type: paper
depends_on:
  - "[[Gebru 2021 - Motivation, Objectives and Development Process]]"
used_by:
  - "[[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]]"
  - "[[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]]"
  - "[[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]]"
  - "[[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]]"
aliases:
  - Datasheets for Datasets
  - Gebru et al datasheets
---

# Gebru 2021 - Datasheets for Datasets - Overview

> [!summary]
> Gebru, Morgenstern, Vecchione, Vaughan, Wallach, Daumé III and Crawford propose that every dataset ship with a **datasheet**, modelled on electronics component datasheets, that documents its motivation, composition, collection process, preprocessing, uses, distribution and maintenance. The contribution is a reviewed question set (about 50 prompts) organised along the dataset lifecycle plus a worked example for the Pang and Lee movie-review polarity data. The takeaway for benchmark builders is that a benchmark is a dataset plus a set of claims about what it measures, and the datasheet is the minimum disclosure that lets a consumer judge those claims.

## Overview

**Research question.** Data characteristics shape model behaviour, yet "there is currently no standardized process for documenting machine learning datasets." Mismatch between a dataset and a deployment context, or hidden societal bias in a dataset, can cause harm in criminal justice, hiring, infrastructure and finance, and can cost revenue or reputation elsewhere.

**Contribution.**
1. An analogy to electronics datasheets (operating characteristics, test results, recommended usage) applied to datasets.
2. A question set grouped by the dataset lifecycle: *motivation, composition, collection process, preprocessing/cleaning/labeling, uses, distribution, maintenance*.
3. A workflow: which questions to read before collecting, which to answer after, and which before distribution.
4. A two-year development process with feedback from dozens of researchers, two industry product teams and lawyers.
5. An appendix datasheet (4 figures) for Pang and Lee's *Movie Review Polarity* dataset.

**Key results.** (This is a framework paper; there are no theorems or tables of estimates.)
- Two stakeholder groups: **creators** (reflect on creation, distribution, maintenance, assumptions, harms) and **consumers** (informed selection, avoid misuse).
- Datasheets are explicitly **not automated**: automation "run[s] counter to our objective of encouraging dataset creators to carefully reflect."
- Questions are **not prescriptive**; they vary by domain and organisation, and inapplicable ones are skipped.
- Datasheets do not solve bias or harm; they impose real overhead; and dynamic datasets are awkward.

## Main Content

### Source Map

| Paper section | Pages | Content | Covered in |
|---|---|---|---|
| 1 Introduction | 1-2 | Motivation, electronics analogy, World Economic Forum recommendation | [[Gebru 2021 - Motivation, Objectives and Development Process]] |
| 1.1 Objectives | 2-3 | Creators vs consumers, wider audiences, reproducibility, non-prescriptive, non-automated | [[Gebru 2021 - Motivation, Objectives and Development Process]] |
| 2 Development Process | 3-4 | Two-year process, test datasheets (LFW, Pang and Lee), product teams, lawyers, changes made | [[Gebru 2021 - Motivation, Objectives and Development Process]] |
| 3 Questions and Workflow (intro) | 4 | Seven lifecycle stages, skip rule | [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]] |
| 3.1 Motivation | 4 | 3 prompts + comments | [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]] |
| 3.2 Composition | 5-6 | 12 core + 3 people-only prompts | [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]] |
| 3.3 Collection Process | 6-8 | 6 core + 5 people-only prompts | [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]] |
| 3.4 Preprocessing/cleaning/labeling | 8 | 3 prompts + comments | [[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]] |
| 3.5 Uses | 8-9 | 5 prompts | [[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]] |
| 3.6 Distribution | 9 | 6 prompts | [[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]] |
| 3.7 Maintenance | 9-10 | 7 prompts | [[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]] |
| 4 Impact and Challenges | 10-11 | Adoption (Microsoft, Google, IBM, Data Nutrition Project, PAI), challenges | [[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]] |
| Acknowledgments, References [1]-[26] | 11-13 | Citation list | [[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]] (citation notes) |
| Appendix, Figs. 1-4 (datasheet for Pang and Lee) | 14-18 | Full worked datasheet | [[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]] |

> [!definition] Datasheet for a dataset
> A structured document accompanying a dataset that answers questions about its **motivation, composition, collection process, preprocessing/cleaning/labeling, uses, distribution and maintenance**, written by reflecting on (not auto-generating) the dataset's lifecycle, for the benefit of both dataset creators and dataset consumers.
^def-datasheet

## Examples

The worked example in the paper is the *Movie Review Polarity* datasheet; see [[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]]. A marketing-measurement analogue is sketched in [[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]].

## Connections

- **Benchmark validity.** [[Dehghani 2021 - The Benchmark Lottery - Overview]] cites Gebru et al. as a checklist for benchmark creation (motivation, composition, collection, recommended uses). A datasheet answers "what is this benchmark a sample of, and for what is it valid?", which is the question task-selection bias exposes.
- **Experimental benchmarks for ads.** Experiment-derived benchmark datasets such as those in [[Experimental Benchmarks for Observational Ad Measurement]] have exactly the composition and collection issues the datasheet probes (who was randomized, what was logged, what is missing).
- **Simulation benchmarks.** [[Dorie 2019 - ACIC 2016 Causal Inference Competition - Overview]] shows the synthetic counterpart: a competition whose released code and knob table play the role of a datasheet for a family of DGPs.

## See Also

- [[Gebru 2021 - Motivation, Objectives and Development Process]]
- [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]]
- [[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]]
- [[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]]
- [[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]]
- [[Researcher Degrees of Freedom]]
