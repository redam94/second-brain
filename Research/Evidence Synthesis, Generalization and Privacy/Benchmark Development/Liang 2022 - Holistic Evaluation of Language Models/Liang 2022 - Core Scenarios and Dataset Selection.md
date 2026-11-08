---
title: "Liang 2022 - Core Scenarios and Dataset Selection"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - doc/paper
source: "[[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]"
source_location: "Sec. 3.3-3.8, Figs. 11-16, Appendix B pointer, pp. 19-25"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models"
doc_type: paper
depends_on:
  - "[[Liang 2022 - Holistic Evaluation Framework and Taxonomy]]"
used_by:
  - "[[Liang 2022 - The Seven Metrics]]"
  - "[[Liang 2022 - Findings 1 to 13 Core Scenarios]]"
aliases:
  - HELM 16 core scenarios
  - HELM datasets
---

# Liang 2022 - Core Scenarios and Dataset Selection

> [!summary]
> The 16 core scenarios are: 9 question answering (NaturalQuestions open-book and closed-book, NarrativeQA, QuAC, HellaSwag, OpenBookQA, TruthfulQA, MMLU, BoolQ), 2 information retrieval (MS MARCO regular and TREC), 2 summarization (CNN/DailyMail, XSUM), 1 sentiment (IMDB), 1 toxicity detection (CivilComments) and 1 miscellaneous text classification (RAFT). Datasets were chosen for domain coverage, skill coverage, availability of metadata or contrast sets needed for other metrics, and (for summarization) faithfulness research.

## Overview

Each task has a "problem setting" (how the task is posed to a text-to-text model) and a "datasets and selection process" rationale. Three recurring selection criteria: domain coverage, coverage of component skills, and enabling downstream metrics (contrast sets for equivariance robustness; demographic metadata for performance disparities).

## Main Content

### Scenario inventory

| Task | Scenario | Why selected |
|---|---|---|
| Question answering | NaturalQuestions (open-book), NaturalQuestions (closed-book), NarrativeQA, QuAC | Domain coverage: Google search queries with Wikipedia annotations (both open and closed-book variants); books and movie scripts (reading comprehension); conversational, context-dependent questions |
| | HellaSwag | Commonsense inference, adversarially filtered wrong answers |
| | OpenBookQA | Basic science facts, open-book exam style |
| | TruthfulQA | Truthfulness: questions aligned with human misconceptions (law, medicine, finance, politics), adversarially generated with davinci (175B) |
| | MMLU | Meta-benchmark of 57 constituent tasks, broad knowledge-intensive coverage |
| | BoolQ | Binary yes/no questions generated like NaturalQuestions; has a contrast set (Gardner et al. 2020) for robustness equivariance |
| Information retrieval | MS MARCO (regular), MS MARCO (TREC) | Passage ranking; largest public set of relevance judgments; regular track has over 500,000 training queries with sparse judgments (about one positive per query); TREC 2019 Deep Learning track has 43 queries with over 9,000 rigorously annotated query-passage pairs; both retrieve from 9M web passages |
| Summarization | CNN/DailyMail, XSUM | Most-studied for faithfulness; CNN/DailyMail has largely extractive references, XSUM largely abstractive |
| Sentiment | IMDB | Only one sentiment dataset implemented for engineering reasons; has a contrast set; reviews scored at most 4 are negative and at least 7 positive |
| Toxicity detection | CivilComments (from WILDS) | Metadata on the demographic groups mentioned, enabling disparity measurement; comments from 50 English-language news sites, 2015-2017 |
| Miscellaneous text classification | RAFT (11 ecologically valid tasks) | Long tail of non-standard classification use cases; 11 subsets such as ADE, Banking77 (77 classes), NeurIPS impact statements, Overruling, Semiconductor, SystematicReview, TAI (transformative AI research), ToS (unfair terms of service), TweetEvalHate, OneStopEnglish (adult reading level), TweetComplaints |

(Scenario count: 9 QA + 2 IR + 2 summarization + IMDB + CivilComments + RAFT = 16.)

### Problem settings

- **Question answering.** Given a question ("Where was the painter of the Mona Lisa born?"), predict the answer ("Italy"). Variants: open-book (extra context such as a Wikipedia page is provided) or multiple-choice (options given). QA spans language understanding, knowledge and reasoning.
- **Information retrieval (passage ranking).** Given query $q$ and corpus $C$ (with $|C|>10$M), output the top-$k$ passages in decreasing relevance. HELM studies *re-ranking* of the top-$k$ passages $M(q)$ returned by an efficient retriever (for example BM25), and does so **pointwise**: for each passage $c_i$ the model is asked "Does the passage answer the query?" and the probability of Yes ranks $c_i$ higher. This requires many LM calls per query and calibrated probabilities, which is why IR differs from all the other tasks.
- **Summarization.** Document in, abstractive summary out (unstructured sequence-to-sequence); evaluate against human reference with ROUGE-2 and BERTScore for overall quality, reference-free metrics for **faithfulness** (Laban et al. 2022, Fabbri et al. 2022) and **extractiveness** (Grusky et al. 2018). Rationale: summarization systems that extract less tend to be less faithful; neural models hallucinate. The authors note both datasets have been criticized and broader change is needed (Gehrmann et al. 2022b; Reiter 2022).
- **Sentiment analysis.** Predict Positive or Negative; example: "Caddyshack II does NO justice for the caddysack. thin plot ... movie should have been destroyed when the script was written." gives Negative.
- **Toxicity detection.** Binary: prompt "Question: Is the passage above toxic?" The paper stresses stakes (content moderation failures contributed to serious human-rights violations; LM performance is weaker in non-dominant languages) and critiques of the task (reductive, lacking context, annotator-dependent construct; Sap et al. 2019, Gordon et al. 2022).
- **Miscellaneous text classification.** Classification with task-specific instructions (for example classify a banking customer query into one of 77 categories).

### Selection rationale in one list

1. Prioritize domain coverage of inputs (search queries, stories, dialogue, news, reviews, comments).
2. Cover component skills (commonsense, reasoning, truthfulness, knowledge).
3. Prefer datasets enabling other metrics (contrast sets, demographic metadata).
4. Accept engineering-resource limits openly (for example one sentiment dataset), and invite extensions (summarization beyond news; sentiment from deployed domains).

## Examples

> [!example] Pointwise re-ranking probability
> For query $q$ and passages $c_1..c_k$, HELM prompts the LM: (schematically) the passage $c_i$ and the query $q$ followed by "Does the passage answer the query?" and uses $s_i=\Pr(\text{Yes})$ (a log-probability from the completion). Ranking by $s_i$ descending gives the re-ranked list; with $k=30$ this needs 30 LM requests per query. Quality is measured with MRR and NDCG. If the model puts 0.9 on a non-relevant passage and 0.6 on the relevant one, MRR is $1/2$ when the relevant passage is ranked second. ^ex-pointwise-rerank

```python
import numpy as np

def mrr(scores, rel):
    order = np.argsort(-np.asarray(scores))
    for rank, i in enumerate(order, 1):
        if rel[i]:
            return 1.0/rank
    return 0.0

print(mrr([0.9, 0.6, 0.1], [0, 1, 0]))   # 0.5
```

## Connections

- GLUE selected tasks to be diverse and difficult and recast QA into NLI ([[Wang 2018 - Task Suite and Selection Criteria]]); HELM keeps tasks native but wraps them in a common text-to-text interface.
- RAFT, CivilComments and IMDB selection show a recurring tactic: choose datasets because they carry the *auxiliary structure* needed for extra metrics.
- Calibrated probabilities for ranking tie to [[Proper Scoring Rules (CRPS, Log Score, Pinball Loss)]].

**Relevance to marketing measurement.** The IR pointwise setup (score each candidate independently, then sort) is the same pattern as scoring each creative or audience with a model and ranking by predicted lift; its requirement for calibrated scores is why calibration appears among the seven metrics.

## See Also

- [[Liang 2022 - HELM - Overview]]
- [[Liang 2022 - The Seven Metrics]]
- [[Liang 2022 - Targeted Evaluations]]
