---
title: "Gebru 2021 - Motivation, Objectives and Development Process"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - doc/paper
source: "[[raw/Gebru 2021 - Datasheets for Datasets.pdf]]"
source_location: "Secs. 1, 1.1 and 2, pp. 1-4"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Gebru 2021 - Datasheets for Datasets"
doc_type: paper
depends_on:
  - "[[Gebru 2021 - Datasheets for Datasets - Overview]]"
used_by:
  - "[[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]]"
  - "[[Gebru 2021 - Impact, Challenges and a Marketing Measurement Datasheet]]"
aliases:
  - Datasheets objectives and development
  - Datasheets stakeholder groups
---

# Gebru 2021 - Motivation, Objectives and Development Process

> [!summary]
> Models inherit the characteristics of their training and evaluation data, and there is no standard for documenting datasets. The authors adopt the electronics-industry datasheet as a model, name two stakeholder groups (creators and consumers) with different objectives, and describe a roughly two-year iterative process (example datasheets, product-team pilots, public draft, legal review) that shaped the final question set.

## Overview

Sections 1, 1.1 and 2 argue why a documentation standard is needed, what it should achieve, and how the question set was refined. The development narrative matters because it explains *design choices in the questions* (no yes/no phrasing, lifecycle grouping, factual rather than legal-judgment questions).

## Main Content

### Motivation (Sec. 1)

- Every ML model is trained and evaluated on data, "quite often in the form of static datasets". A model "is unlikely to perform well in the wild if its deployment context does not match its training or evaluation datasets, or if these datasets reflect unwanted societal biases."
- High-stakes settings cited: criminal justice, hiring, critical infrastructure, finance. In other domains, mismatch "may lead to loss of revenue or public relations setbacks."
- Models can reproduce or amplify biases in training data (word embeddings, commercial gender classification, a recruiting tool).
- The World Economic Forum suggests all entities document the provenance, creation and use of ML datasets to avoid discriminatory outcomes.
- Data provenance is well studied in databases, "rarely discussed in the machine learning community"; documenting dataset creation and use has received less.

> [!definition] The electronics analogy
> In electronics, "every component, no matter how simple or complex, is accompanied with a datasheet describing its operating characteristics, test results, recommended usage, and other information." By analogy every dataset should have a datasheet documenting "its motivation, composition, collection process, recommended uses, and so on."
^def-datasheet-analogy

Claimed benefits: transparency and accountability; mitigation of unwanted societal bias; reproducibility; better dataset selection for a task.

### Objectives (Sec. 1.1)

| Stakeholder | Primary objective |
|---|---|
| Dataset **creators** | Careful reflection on creating, distributing and maintaining the dataset, including assumptions, potential risks or harms, and implications of use |
| Dataset **consumers** | Information to make informed decisions about using the dataset and avoid unintentional misuse |
| Others (policy makers, consumer advocates, investigative journalists, data subjects, people affected by downstream models) | Transparency and accountability |
| Secondary objective | **Reproducibility**: people without dataset access can use the datasheet to build alternative datasets with similar characteristics |

> [!definition] Design principles of the questions
> 1. **Not prescriptive.** Datasheets "will necessarily vary depending on factors such as the domain or existing organizational infrastructure and workflows" (academic public release vs internal product dataset). Bender and Friedman's *data statements* for language data can be folded in.
> 2. **Not automated.** Automated documentation "run[s] counter to our objective of encouraging dataset creators to carefully reflect on the process of creating, distributing, and maintaining a dataset."
> 3. **Creators may differ from authors of the datasheet.** The example datasheets were written by the authors from public documentation (footnote 1), so some answers are "Unknown to the authors of the datasheet."
^def-datasheet-principles

### Development process (Sec. 2)

Timeline: roughly two years, many feedback rounds.

1. Authors drafted an initial question set from their own experience of dataset characteristics, unintentional misuse and societal bias.
2. **Tested** by writing example datasheets for *Labeled Faces in the Wild* and Pang and Lee's polarity dataset, chosen because their creators provided exemplary documentation. Gaps, redundancies and unclear wording were found.
3. Questions were distributed to **product teams in two major US technology companies**, with the authors helping some teams write datasheets and observing where questions failed.
4. A draft was circulated on social media and arXiv (posted 23 March 2018); dozens of researchers, practitioners and policy makers commented.
5. A **team of lawyers** reviewed the questions.

Changes made as a result:

| Change | Reason |
|---|---|
| Added and removed questions; refined content; reordered to match lifecycle stages | Gaps and redundancy found in example datasheets |
| Reworded to discourage yes/no answers | Product-team experience |
| Added a **Uses** section | Product-team experience |
| Deleted the **Legal and Ethical Considerations** section; integrated those questions into the relevant lifecycle stages | Product teams were more likely to answer them when attached to the stage they belong to |
| Removed questions asking explicitly about regulatory compliance; added factual questions that elicit compliance-relevant information | Lawyers: avoid forcing creators into legal judgments |

## Examples

**Why lifecycle placement matters (illustration of the consent example).** A question such as "Did the individuals consent to the collection and use of their data?" lives in *Collection Process* rather than in a separate legal section, so a team reading the collection questions before gathering data sees the consent requirement while it can still change the process. This is the intended effect: datasheets "even alter this process in response to their reflection."

## Connections

- The creator/consumer split mirrors benchmark builders vs benchmark users in [[Dehghani 2021 - Life of a Benchmark]].
- The reproducibility objective echoes the "published code as an antidote to the file drawer" argument in [[Dorie 2019 - Motivation and Shortcomings of Method Comparisons]].
- Reflection-over-automation is a design stance comparable to preregistration practices in [[Researcher Degrees of Freedom]].

## See Also

- [[Gebru 2021 - Datasheets for Datasets - Overview]]
- [[Gebru 2021 - Questions I - Motivation, Composition and Collection Process]]
