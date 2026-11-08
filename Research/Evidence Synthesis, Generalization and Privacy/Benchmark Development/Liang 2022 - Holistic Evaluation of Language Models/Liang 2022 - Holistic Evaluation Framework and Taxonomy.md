---
title: "Liang 2022 - Holistic Evaluation Framework and Taxonomy"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]"
source_location: "Sec. 1.1, 2 (2.1-2.4), 3.1-3.2, 4.1-4.2, Tables 1-4, Figs. 2-10, pp. 3-4, 14-19, 25-26"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models"
doc_type: paper
depends_on:
  - "[[Liang 2022 - HELM - Overview]]"
used_by:
  - "[[Liang 2022 - Core Scenarios and Dataset Selection]]"
  - "[[Liang 2022 - The Seven Metrics]]"
  - "[[Liang 2022 - Models and Adaptation via Prompting]]"
aliases:
  - HELM taxonomy
  - HELM scenarios metrics adaptation
  - HELM design principles
---

# Liang 2022 - Holistic Evaluation Framework and Taxonomy

> [!summary]
> HELM defines three primitives, a scenario (what we want the model to do), an adaptation procedure (how the model is turned into a system), and metrics (what we want from it), and runs are (scenario, adaptation, metric) triples. Scenarios are taxonomized as (task, domain, language) with domain split into the "3 W's" (what, when, who); metrics are taxonomized by the access needed to measure each desideratum. Selection from the taxonomy follows explicit principles (coverage, minimality, user-facing tasks, feasibility; blackbox-measurable desiderata) and the gap between taxonomy and selection documents what is missing.

## Overview

HELM works at two levels: an *abstract taxonomy* that defines the design space of LM evaluation, and a *concrete set* of scenarios and metrics selected for coverage (for example different English varieties), value (user-facing applications) and feasibility (limited engineering resources). Stating the taxonomy "makes explicit both our priorities in benchmark design and the limitations in the benchmark at present."

## Main Content

### Primitives (Sec. 2)

> [!definition] Scenario
> A scenario instantiates a desired use case. It is operationalized as a list of *instances* divided into a training set and one or more test sets. Each instance has (i) an *input* (a string) and (ii) a list of *references*, each a string annotated with properties relevant to evaluation (for example "correct" or "acceptable"). Example: an MMLU (subject = anatomy) multiple-choice item with question "Which of the following terms describes the body's ability to maintain its normal state?" and references Anabolism, Catabolism, Tolerance, Homeostasis [correct]. ^def-helm-scenario

> [!definition] Adaptation
> The procedure transforming a language model plus training instances into a system that predicts on new instances (prompting, lightweight fine-tuning, fine-tuning); HELM uses prompting. A *language model* is a black box mapping a prompt (string) and decoding parameters (for example temperature) to a completion (string) and log probabilities of the prompt and completion; no access to activations or training data is assumed. The text-to-text abstraction keeps HELM agnostic to retrieval-augmented, search-using or preference-trained models. ^def-helm-adaptation

> [!definition] Metric
> A function over completions and log probabilities that operationalizes a desideratum. For the running example the paper lists: exact match 0.571, ECE (10-bin) 0.221, exact match (robustness) 0.551, exact match (fairness) 0.524, inference runtime 0.147, and so on. ^def-helm-metric

> [!definition] Run
> A run is a (scenario, adaptation method, metric) triple; evaluating a model is specifying a series of runs. The roadmap states that both the space and the decisions made within it should be explicit. ^def-helm-run

### Scenario taxonomy (Sec. 3.1, Fig. 8)

A scenario is a triple $(\text{task},\ \text{domain},\ \text{language})$.

- **Tasks.** Hard to derive from first principles, so compiled from the ACL 2022 tracks (Table 1): Computational Social Science and Cultural Analytics; Dialogue and Interactive Systems; Discourse and Pragmatics; Ethics and NLP; Generation; Information Extraction; Information Retrieval and Text Mining; Interpretability and Analysis; Language Grounding to Vision/Robotics; Linguistic Theories, Cognitive Modeling, Psycholinguistics; Machine Learning for NLP; Machine Translation and Multilinguality; NLP Applications; Phonology, Morphology and Word Segmentation; Question Answering; Resources and Evaluation; Semantics: Lexical; Semantics: Sentence-level, Textual Inference; Sentiment Analysis, Stylistic Analysis, Argument Mining; Speech and Multimodality; Summarization; Syntax. Each is expanded into canonical tasks (for example Question Answering: question answering and reading comprehension; Information Retrieval: passage retrieval; Ethics: toxicity and hate speech detection, misinformation detection). The authors flag subjectivity in "canonical", intra-task structure (all QA as one "task"), and that deployments (OpenAI, Cohere, AI21 Labs) introduce use cases beyond the NLP canon, some fundamentally new, so the space of tasks cannot be fully conceived in advance.
- **Domains** are decomposed by the **3 W's**: *What* (genre: Wikipedia, social media, news, scientific papers, fiction), *When* (time period: 1980s, pre-Internet, present day), *Who* (demographic group that generated the data or is described: Black/White, men/women, children/elderly). Not included: where (country) and how (typed, handwritten, transcribed speech or sign). A dataset is assumed to have a single domain based on its inputs.
- **Languages.** Over 6,000 languages exist but NLP centers on a few; HELM evaluates English only (with BLOOM evaluated only for English) and focuses on coverage of English varieties and dialects. Example: more than 65 million speakers of Fula but few NLP resources.

Examples of scenarios in the taxonomy: (question answering, (clinical notes, doctors, now), English) and (toxicity detection, (tweets, Egypt, Internet-era), Arabic).

### Scenario selection principles (Sec. 3.2)

Three overarching principles: (i) **coverage** of the space, (ii) **minimality** of the selected set, (iii) prioritizing **user-facing** tasks; plus feasibility. Rather than covering every (task, domain) pair, HELM covers tasks, domains and languages *independently*, which risks missing interactions (for example toxicity detection on text by marginalized authors) but is practical.

- *Tasks*: filter out infeasible tasks (multimodal, machine translation) for unimodal English models; keep user-facing ones: question answering, information retrieval, summarization, sentiment analysis, toxicity detection, plus miscellaneous text classification to touch the long tail. Excluded as not user-facing: natural language inference, NER, POS tagging, parsing, information extraction; interactive dialogue is deferred to companion work.
- *Domains and languages*: because domain enumeration is harder than task enumeration (a Cartesian product of three W taxonomies is possible but not attempted), domain coverage is pursued during dataset selection; English varieties (African American English, Englishes of ten countries) are covered via targeted language-modeling evaluations.

### Desiderata taxonomy and metric selection (Sec. 4.1-4.2, Tables 2-3)

Desiderata were enumerated by taking all AI conference call-for-paper areas (not only NLP; Table 2 maps venues to desiderata such as accuracy, bias, calibration, causality, creativity, fairness, interpretability, legality, memory efficiency, privacy, robustness, security, toxicity, training and inference efficiency, transparency, user experience). Table 3 taxonomizes them by *what is needed to measure them*:

| Requirement for measurement | Examples |
|---|---|
| Satisfies HELM's conditions: no assumption on model construction, only black-box access, no assumption on broader system | accuracy, uncertainty/calibration, robustness, fairness, bias, toxicity, inference efficiency |
| Requires knowledge of how the model was created | causality, environmental impact, linguistic plausibility, memory efficiency, participatory design, privacy, sample efficiency, training efficiency, theoretical guarantees |
| Requires more than black-box access | credibility/provenance, explainability |
| Requires knowledge about the broader system | maintainability, reliability, security, transparency |
| Requires knowledge about the broader social context | accessibility, accountability, creativity, emotional intelligence, legality, morality, oversight |

(Row-to-label alignment was reconstructed from PDF text extraction, where the table body is separated from its row labels, and the lists are not exhaustive of Table 2; check against Table 3 in the PDF before relying on a specific cell.) Selected: the seven black-box-measurable ones, plus training efficiency and environmental impact (information partially available from papers), some legality via memorization and copyright, some credibility via disinformation, and sample efficiency in the sense of in-context examples.

### Multi-metric coverage (Table 4)

For 16 core scenarios $\times$ 7 metric categories $=112$ pairs, 98 are measured (87.5%). Of the 14 unmeasured pairs, most are not well-defined (for example toxicity of completions when the adaptation involves no generation), and the rest are skipped because of validity concerns (for example robustness or fairness perturbations for long-form summarization generation).

## Examples

> [!example] Counting the design space
> Suppose a hypothetical benchmark designer takes $T=5$ tasks, $D=3$ domains and $L=1$ language. Full coverage of scenario triples would need $T\cdot D\cdot L = 15$ scenarios, each with 7 metrics $=105$ cells. HELM's choice to cover tasks, domains and languages independently needs only the tasks (and ensure each domain and language appears at least once among their datasets): here $\max(T,D,L)=5$ scenarios could suffice, at the price of never observing task-by-domain interactions. The tradeoff is exactly the one named in Sec. 3.2. ^ex-coverage-count

```python
import itertools
tasks   = ["QA","IR","Summ","Sent","Tox"]
domains = ["news","wiki","social"]
langs   = ["en"]
full = list(itertools.product(tasks, domains, langs))
print(len(full), "full scenarios;", len(full)*7, "task-domain-metric cells")
# independent coverage: pair each task with a domain round-robin
indep = [(t, domains[i % len(domains)], "en") for i, t in enumerate(tasks)]
print(len(indep), "independently-covering scenarios")
```

## Connections

- **GLUE** reduced tasks to one sentence-pair interface and a score vector ([[Wang 2018 - Task Suite and Selection Criteria]]); HELM generalizes via text-to-text plus a taxonomy that reports what is missing.
- Construct validity: HELM invokes measurement modeling (validity and reliability), a theme also behind [[Deng 2009 - Dataset Properties and Comparison with Other Datasets]] (audit the dataset on measurable properties).
- Few-shot adaptation: [[In-Context Learning and Few-Shot Prompting]].

**Relevance to marketing measurement.** The taxonomy is directly reusable for scoping a measurement benchmark: *scenario* = (decision, channel/market/time window, region); *desiderata* = bias and RMSE of lift/ROI, credible-interval calibration, robustness to data perturbations (missing days, outliers), subgroup fairness across geos, and compute cost. The explicit "what is missing" ledger guards against implying generality that the benchmark does not have.

## See Also

- [[Liang 2022 - HELM - Overview]]
- [[Liang 2022 - Core Scenarios and Dataset Selection]]
- [[Liang 2022 - The Seven Metrics]]
