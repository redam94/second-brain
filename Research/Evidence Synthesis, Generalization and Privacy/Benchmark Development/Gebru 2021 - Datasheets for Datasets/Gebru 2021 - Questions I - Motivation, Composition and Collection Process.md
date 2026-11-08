---
title: "Gebru 2021 - Questions I - Motivation, Composition and Collection Process"
tags:
  - source/ingested
  - topic/benchmarks
  - type/definition
  - doc/paper
source: "[[raw/Gebru 2021 - Datasheets for Datasets.pdf]]"
source_location: "Sec. 3 intro and Secs. 3.1-3.3, pp. 4-8"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Gebru 2021 - Datasheets for Datasets"
doc_type: paper
depends_on:
  - "[[Gebru 2021 - Motivation, Objectives and Development Process]]"
used_by:
  - "[[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]]"
  - "[[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]]"
  - "[[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]]"
aliases:
  - Datasheet questions motivation composition collection
---

# Gebru 2021 - Questions I - Motivation, Composition and Collection Process

> [!summary]
> The first three of seven lifecycle sections of the datasheet: **Motivation** (why the dataset exists and who paid), **Composition** (what an instance is, sampling, labels, splits, noise, confidentiality, subpopulations) and **Collection Process** (how data was acquired, by whom, when, with what ethical review and consent). Composition and Collection should be read before collecting and answered after collection is complete.

## Overview

Section 3 organises the questions to "roughly match the key stages of the dataset lifecycle: motivation, composition, collection process, preprocessing/cleaning/labeling, uses, distribution, and maintenance." Questions that do not apply "should be skipped"; creators are urged to "answer as many questions as possible rather than skipping the datasheet creation process entirely." Each section ends with *Any other comments?*. Questions that apply only to datasets relating to people come last in Composition and Collection; take "a broad interpretation" (any dataset containing text written by people relates to people).

> [!definition] Datasheet workflow (when to answer)
> | Section | Read | Answer |
> |---|---|---|
> | Motivation | at design time | after creation |
> | Composition | **before** any data collection | once collection is complete |
> | Collection Process | **before** any collection, to flag issues | once collection is complete |
> | Preprocessing/cleaning/labeling | before any such step | once done |
> | Uses | during reflection | before release |
> | Distribution | before distribution (internal or external) | prior to distribution |
> | Maintenance | before distribution | prior to distribution |
^def-datasheet-workflow

## Main Content

### 3.1 Motivation (3 prompts + comments)

Intent: make creators "clearly articulate their reasons for creating the dataset and ... promote transparency about funding interests", relevant for research datasets.

> [!definition] Motivation questions
> 1. **For what purpose was the dataset created?** Was there a specific task in mind? A specific gap to fill?
> 2. **Who created the dataset** (team, research group) and on behalf of which entity (company, institution, organization)?
> 3. **Who funded the creation?** If a grant exists: grantor, grant name and number.
> 4. Any other comments?
^def-q-motivation

### 3.2 Composition (12 core prompts + 3 people-only)

Mostly informs consumers' fitness-for-task decisions; some questions elicit GDPR-type compliance information.

> [!definition] Composition questions
> 1. **What do the instances represent** (documents, photos, people, countries)? Multiple instance types (movies, users, ratings; nodes and edges)?
> 2. **How many instances** in total (per type)?
> 3. **All possible instances or a sample** (not necessarily random)? If a sample: what is the larger set; is the sample representative (e.g., geographic coverage); how was representativeness validated; if not representative, why not (e.g., diversity, withheld instances)?
> 4. **What data does each instance consist of**: raw (unprocessed text/images) or features?
> 5. **Is there a label or target** per instance?
> 6. **Is information missing** from individual instances, and why (not counting intentional removals; redacted text may count)?
> 7. **Are relationships between instances explicit** (ratings, social links)?
> 8. **Recommended data splits** (train/dev/test), with rationale?
> 9. **Errors, sources of noise, redundancies?**
> 10. **Self-contained or reliant on external resources** (websites, tweets, other datasets)? If external: (a) guarantees they exist and remain constant; (b) official archival versions including the external resources as of creation; (c) restrictions (licenses, fees).
> 11. **Confidential data** (legal privilege, doctor-patient confidentiality, non-public communications)?
> 12. **Offensive, insulting, threatening or anxiety-inducing content** if viewed directly?
>
> *If the dataset does not relate to people, skip the rest.*
>
> 13. **Does it identify subpopulations** (age, gender)? How identified; what distributions?
> 14. **Can individuals be identified**, directly or in combination with other data?
> 15. **Sensitive data** (race/ethnic origin, sexual orientation, religion, political opinion, union membership, location, financial or health data, biometric/genetic data, government IDs such as SSNs, criminal history)?
> 16. Any other comments?
^def-q-composition

(The paper uses bullets, not numbers; numbering here is for reference only. Items 3 and 10 are the multi-part questions most relevant to benchmark validity.)

### 3.3 Collection Process (6 core prompts + 5 people-only)

Dual goals: tell consumers about quality and provenance, and "help researchers and practitioners to create alternative datasets with similar characteristics."

> [!definition] Collection-process questions
> 1. **How was data for each instance acquired?** Directly observable (raw text, ratings), reported by subjects (surveys), or inferred/derived (part-of-speech tags, model-based guesses of age or language)? If reported or derived, was it validated, and how?
> 2. **What mechanisms or procedures** (sensors, manual curation, software, APIs)? How were they validated?
> 3. **Sampling strategy** if a sample (deterministic; probabilistic with stated probabilities)?
> 4. **Who was involved** (students, crowdworkers, contractors) and how were they compensated (e.g., crowdworker pay)?
> 5. **Over what timeframe?** Does it match the creation timeframe of the underlying data (e.g., a recent crawl of old news)?
> 6. **Ethical review** (e.g., IRB)? Outcomes and supporting documentation.
>
> *If the dataset does not relate to people, skip the rest.*
>
> 7. **Collected directly from individuals or via third parties** (websites)?
> 8. **Notification**: were individuals notified? How (screenshots, exact language)?
> 9. **Consent**: did individuals consent to collection and use? How requested; exact language.
> 10. **Revocation**: a mechanism to revoke consent later or for certain uses?
> 11. **Impact analysis** (e.g., a data protection impact analysis) on data subjects: outcomes and documentation.
> 12. Any other comments?
^def-q-collection

## Examples

> [!example] Applying "Is the sample representative?" to a benchmark
> **Setup.** A benchmark claims to measure general language understanding but consists of 8 previously published datasets.
> **Question 3 (Composition).** The larger set is "all language-understanding tasks practitioners care about." The sample is a convenience selection of prior shared tasks. A truthful answer says it is not a random sample, was chosen for availability and format uniformity, and has not been validated against a deployment distribution.
> **Interpretation.** That honest answer is the seed of the *task selection bias* analysed in [[Dehghani 2021 - Task Selection Bias Case Studies]]: the datasheet makes the sampling frame explicit, so consumers can ask whether their task lies inside it.
^ex-representativeness

## Connections

- Composition Q3 and Q8 (recommended splits) are the datasheet counterpart of Dehghani et al.'s demand for **multiple fixed splits** in benchmark design ([[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]]).
- Collection Q3 (sampling strategy) corresponds to selection into experiments in [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]], where who is randomized determines what generalises.
- Composition Q6 (missingness) and Q9 (noise) parallel the label-error evidence in [[Dehghani 2021 - Community Bias and the GLUE Example]].

## See Also

- [[Gebru 2021 - Datasheets for Datasets - Overview]]
- [[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]]
- [[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]]
