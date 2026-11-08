---
title: "Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance"
tags:
  - source/ingested
  - topic/benchmarks
  - type/definition
  - doc/paper
source: "[[raw/Gebru 2021 - Datasheets for Datasets.pdf]]"
source_location: "Secs. 3.4-3.7, pp. 8-10"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Gebru 2021 - Datasheets for Datasets"
doc_type: paper
depends_on:
  - "[[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]]"
used_by:
  - "[[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]]"
  - "[[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]]"
aliases:
  - Datasheet questions preprocessing uses distribution maintenance
---

# Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance

> [!summary]
> The last four lifecycle sections: **Preprocessing/cleaning/labeling** (is the raw data preserved; is the tooling available), **Uses** (what has the dataset been used for; what should it not be used for), **Distribution** (licence, DOI, export controls) and **Maintenance** (who maintains, erratum, update policy, retention, versioning, contributions). These sections turn a static artefact into a governed one.

## Overview

Preprocessing is answered after the work is done; Uses should prompt reflection on foreseeable misuse; Distribution and Maintenance must be answered *before* the dataset is released, internally or externally. As elsewhere, every section ends with *Any other comments?* and inapplicable questions are skipped.

## Main Content

### 3.4 Preprocessing/cleaning/labeling

Intent: tell consumers whether "raw" data has been processed in ways compatible with their task. Example given in the paper: text converted to bag-of-words "is not suitable for tasks involving word order."

> [!definition] Preprocessing questions
> 1. **Was any preprocessing/cleaning/labeling done** (discretization or bucketing, tokenization, part-of-speech tagging, SIFT feature extraction, removal of instances, missing-value handling)? If not, skip the rest of this section.
> 2. **Was the raw data saved** in addition to the processed data (to support unanticipated future uses)? Link.
> 3. **Is the software used to preprocess/clean/label available?** Link.
> 4. Any other comments?
^def-q-preprocessing

### 3.5 Uses

Intent: encourage creators to reflect on tasks for which the dataset should and should not be used, helping consumers avoid risks or harms.

> [!definition] Uses questions
> 1. **Has the dataset been used for any tasks already?** Description.
> 2. **Is there a repository linking to papers or systems that use it?** Link.
> 3. **What (other) tasks could it be used for?**
> 4. **Does the composition, collection or preprocessing affect future uses?** E.g., anything a consumer needs to know to avoid unfair treatment of individuals or groups (stereotyping, quality-of-service issues) or other risks or harms (legal, financial). What could a consumer do to mitigate them?
> 5. **Are there tasks for which the dataset should not be used?**
> 6. Any other comments?
^def-q-uses

### 3.6 Distribution

> [!definition] Distribution questions
> 1. **Distributed to third parties** outside the entity on whose behalf it was created?
> 2. **How distributed** (tarball, API, GitHub)? Does it have a **DOI**?
> 3. **When** will it be distributed?
> 4. **Copyright/IP licence or terms of use**? Link or reproduce terms; any fees.
> 5. **Third-party IP or other restrictions** on data associated with instances? Terms and fees.
> 6. **Export controls or other regulatory restrictions** on the dataset or on individual instances?
> 7. Any other comments?
^def-q-distribution

### 3.7 Maintenance

> [!definition] Maintenance questions
> 1. **Who supports, hosts, maintains** the dataset?
> 2. **How can the owner/curator be contacted** (e.g., email)?
> 3. **Is there an erratum?** Link.
> 4. **Will it be updated** (fix labeling errors, add or delete instances)? How often, by whom, and how communicated (mailing list, GitHub)?
> 5. **Retention limits** for datasets about people (e.g., individuals told data would be deleted after a fixed period)? How enforced.
> 6. **Will older versions continue to be supported?** If not, how is obsolescence communicated?
> 7. **Can others extend, augment, build on or contribute?** Is there a mechanism; will contributions be validated, and how; how are they distributed to consumers?
> 8. Any other comments?
^def-q-maintenance

### Question inventory

| Section | Core prompts | People-only | Stage at which to answer |
|---|---|---|---|
| Motivation | 3 | 0 | after creation |
| Composition | 12 | 3 | after collection |
| Collection process | 6 | 5 | after collection |
| Preprocessing/cleaning/labeling | 3 | 0 | after processing |
| Uses | 5 | 0 | before release |
| Distribution | 6 | 0 | before distribution |
| Maintenance | 7 | 0 | before distribution |
| **Total** (excluding "Any other comments?") | **42** | **8** | |

(Counts are this note's tally of the printed bullets.)

## Examples

> [!example] Using the Uses and Maintenance sections for a versioned benchmark
> **Setup.** A benchmark leaderboard releases v1 and later v2 after finding label errors.
> **Questions engaged.** Uses Q4/Q5 (tasks it should not be used for), Maintenance Q3 (erratum), Q4 (update policy and communication), Q6 (are v1 results still comparable and supported?).
> **Interpretation.** These are the datasheet's hooks for the "renewal" stage of [[Dehghani 2021 - Life of a Benchmark]] and the "living benchmark" recommendation in [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]: without a version policy, scores from different versions silently mix.
^ex-versioned-benchmark

## Connections

- The Pang and Lee datasheet shows concrete answers to every question in this note: [[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]].
- Maintenance Q7 (contributions validated?) matters for community-contributed benchmarks and for shared experiment repositories in marketing.

## See Also

- [[Gebru 2021 - Datasheets for Datasets - Overview]]
- [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]]
- [[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]]
