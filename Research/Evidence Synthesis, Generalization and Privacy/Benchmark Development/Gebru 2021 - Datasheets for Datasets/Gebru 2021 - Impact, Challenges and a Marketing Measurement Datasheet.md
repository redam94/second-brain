---
title: "Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - doc/paper
source: "[[raw/Gebru 2021 - Datasheets for Datasets.pdf]]"
source_location: "Sec. 4 (pp. 10-11), Acknowledgments and References (pp. 11-13); marketing section is an application by the note author"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Gebru 2021 - Datasheets for Datasets"
doc_type: paper
depends_on:
  - "[[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]]"
  - "[[Gebru 2021 - Questions II - Preprocessing, Uses, Distribution and Maintenance]]"
  - "[[Gebru 2021 - Example Datasheet for the Movie Review Polarity Dataset]]"
used_by:
  - "[[Gebru 2021 - Datasheets for Datasets - Overview]]"
aliases:
  - Datasheet adoption and limits
  - Datasheet for a marketing measurement dataset
---

# Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet

> [!summary]
> Since the March 2018 draft, datasheets have been adopted in academic dataset releases and piloted at Microsoft, Google and IBM, and have inspired model cards, data cards, factsheets and the Dataset Nutrition Label. The paper is candid about limits: creators cannot foresee every use, demographic labels are often unavailable for privacy reasons, dynamic datasets are awkward, and the process costs time and needs incentive changes. This note also sketches how the question set maps to a marketing measurement dataset.

## Overview

Section 4 reports adoption and open problems; it contains no new method. The marketing section below is an application, labelled as such, and uses only the question set from the paper.

## Main Content

### Impact to date (Sec. 4)

| Actor | Adoption (as stated) |
|---|---|
| Academic researchers | Released datasets with datasheets (refs [7], [10], [23], [26]: GICoref, QuAC, Cerema AWP, RecipeQA) |
| Microsoft, Google, IBM | Piloting datasheets internally within product teams |
| Google | Model cards for ML models; a **data card** (lightweight datasheet) released with Open Images |
| IBM | **Factsheets** for AI services, including whether datasets have datasheets |
| Data Nutrition Project | Incorporated some datasheet questions into its Dataset Nutrition Label (2nd generation) |
| Partnership on AI | Industry-wide documentation guidance (ABOUT ML) building on datasheets, model cards and factsheets |

### Challenges and limits

> [!definition] Limits of datasheets (as stated by the authors)
> 1. **Adaptation burden.** Creators must modify questions and workflow to fit existing organisational infrastructure.
> 2. **Dynamic datasets.** The question set "may pose problems"; for datasets that change only infrequently, accompany each update with an updated datasheet.
> 3. **Not a complete solution** to unwanted bias, risks or harms: creators cannot anticipate every use, and identifying bias often needs demographic labels that may be unavailable owing to data protection and privacy.
> 4. **Need for domain expertise** (anthropology, sociology, science and technology studies) for datasets about people; "complex and contextual social, historical, and geographical factors" shape respectful collection.
> 5. **Overhead and incentives.** A datasheet reduces one-off questions but always takes time; infrastructure, workflows and incentives need to change. Benefit: creators can distinguish themselves as prioritising transparency and accountability.
^def-datasheet-limits

Conclusion of the paper: the benefits to the ML community outweigh the costs.

### References in the paper (26 items)

Reference list [1]-[26] contains: risk-assessment and facial-recognition applications [1], [13], [24]; Bender and Friedman data statements [2]; DataHub and database provenance [3], [8]; embedding and classification bias [4], [5], [12], [19]; the Pang and Lee polarity paper [22]; Labeled Faces in the Wild [16]; Open Images [17]; model cards [20]; IBM factsheets [14]; the Dataset Nutrition Label [9]; the WEF white paper [25]; Holstein et al. on practitioner fairness needs [15]; datasets with datasheets [6], [7], [10], [23], [26]; and miscellaneous news and infrastructure references [11], [18], [21].

## Examples

> [!example] Application (note author): a datasheet for a geo-experiment results archive
> **Setup.** A measurement team keeps a library of past geo-lift tests used to calibrate a marketing mix model (MMM) prior. The library is effectively an internal benchmark. These are suggested answers using the paper's questions; they are not from the paper.
>
> | Lifecycle section | Question (from the paper) | Marketing-measurement answer to record |
> |---|---|---|
> | Motivation | Purpose; specific task in mind? | Calibrate channel-ROI priors; not intended for budget attribution to individual creatives |
> | Composition | Sample of a larger set? Representative? | Tests were run where a team chose to test; skewed to large, mature channels and favourable geos |
> | Composition | Label/target? Errors, noise? | Lift estimate with interval; noise from geo count and duration; some tests failed pre-checks |
> | Composition | Recommended splits? | Hold out the most recent tests for validation, not random |
> | Collection | Mechanism; how validated? | Matched-market design, synthetic control, pre-period fit; validated by placebo tests |
> | Collection | Timeframe | Dates, seasonality, promotions, any concurrent campaigns |
> | Collection | Individuals: consent/identifiability | Aggregate geo data; check small-geo re-identification and platform terms |
> | Preprocessing | Raw saved? Software available? | Keep raw geo-by-day panels and the analysis code per test |
> | Uses | Should not be used for | Extrapolating to channels or spend ranges never tested |
> | Distribution | Licence/restrictions | Platform or partner data terms; internal-only |
> | Maintenance | Update policy; versions | New tests appended quarterly; superseded estimates flagged; owner named |
>
> **Interpretation.** The "sample of a larger set" and "should not be used for" rows operationalise the transportability problem: which situations does the archive actually represent? See [[Experimental Benchmarks for Observational Ad Measurement]] for experiment-versus-observational comparisons and [[Gordon et al 2019 - Facebook RCTs vs Observational Ad Measurement - Overview]] for study-level heterogeneity.
^ex-geo-archive-datasheet

## Connections

- Dehghani et al. propose datasheets as one of several documents for benchmark creation: [[Dehghani 2021 - Guidelines, Statistical Testing and Living Benchmarks]].
- Dorie et al. release simulation code on GitHub so anyone can re-evaluate; that is the synthetic-data analogue of a datasheet's reproducibility objective: [[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]].

## See Also

- [[Gebru 2021 - Datasheets for Datasets - Overview]]
- [[Gebru 2021 - Motivation, Objectives and Development Process]]
