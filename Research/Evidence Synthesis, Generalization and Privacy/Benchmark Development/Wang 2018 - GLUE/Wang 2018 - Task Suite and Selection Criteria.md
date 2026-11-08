---
title: "Wang 2018 - Task Suite and Selection Criteria"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/definition
  - doc/paper
source: "[[raw/Wang 2018 - GLUE.pdf]]"
source_location: "Sec. 1-3, Table 1, Appendix A, pp. 1-5, 13"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Wang 2018 - GLUE"
doc_type: paper
depends_on:
  - "[[Wang 2018 - GLUE - Overview]]"
used_by:
  - "[[Wang 2018 - Evaluation Protocol and Scoring]]"
  - "[[Wang 2018 - Baselines and Benchmark Results]]"
aliases:
  - GLUE tasks
  - GLUE task selection
  - CoLA SST-2 MRPC QQP STS-B MNLI QNLI RTE WNLI
---

# Wang 2018 - Task Suite and Selection Criteria

> [!summary]
> GLUE comprises nine English tasks: single-sentence (CoLA, SST-2), similarity and paraphrase (MRPC, QQP, STS-B), and inference (MNLI, QNLI, RTE, WNLI). Selection criteria: existing community-accepted datasets; diversity of genres, sizes and difficulty; inclusion of data-scarce tasks so that cross-task knowledge sharing is rewarded; tasks cast as sentence or sentence-pair problems so any model type can compete; private test labels where possible. QNLI and WNLI are *recasts* of QA and coreference problems into NLI form.

## Overview

The suite is designed so that "good performance should require a model to share substantial knowledge (e.g., trained parameters) across all tasks, while still maintaining some task-specific components." A model with no pre-training or outside knowledge can be trained per task, but the authors expect the data-scarce tasks to make that uncompetitive.

## Main Content

### Selection rationale (Sec. 1-3)

- **Reuse of established data.** All datasets pre-exist; none was created from scratch.
- **Diversity**: genres (news, fiction, Wikipedia, social Q&A, transcribed speech, movie reviews), sizes (634 to 393k training examples), difficulty.
- **Rewarding transfer**: small tasks (RTE 2.5k, WNLI 634, MRPC 3.7k, CoLA 8.5k) are included deliberately.
- **Model-agnostic format**: all tasks are single-sentence or sentence-pair classification except STS-B (regression), so models need not be sentence-to-vector encoders. This contrasts with **SentEval**, which only evaluates sentence-to-vector encoders and includes many sentiment-like tasks (MR, SST, CR, SUBJ) and tasks nearly solved (MPQA, TREC), "so close to being solved that evaluation on them is relatively uninformative". GLUE aims to be "both diverse and difficult."
- **decaNLP** (McCann et al. 2018) recasts ten tasks as question answering with automatic transformations; GLUE sees this as more ambitious but less immediately practical and lacks a leaderboard and error-analysis toolkit.
- **Fairness safeguards**: four datasets have privately-held test labels, and users must submit to gluebenchmark.com to be scored.

### Table 1: tasks and statistics

| Corpus | Train | Test | Task | Metric | Domain |
|---|---|---|---|---|---|
| CoLA | 8.5k | 1k | acceptability | Matthews corr. | misc. |
| SST-2 | 67k | 1.8k | sentiment | acc. | movie reviews |
| MRPC | 3.7k | 1.7k | paraphrase | acc./F1 | news |
| STS-B | 7k | 1.4k | sentence similarity | Pearson/Spearman | misc. |
| QQP | 364k | 391k | paraphrase | acc./F1 | social QA questions |
| MNLI | 393k | 20k | NLI | matched acc./mismatched acc. | misc. |
| QNLI | 105k | 5.4k | QA/NLI | acc. | Wikipedia |
| RTE | 2.5k | 3k | NLI | acc. | news, Wikipedia |
| WNLI | 634 | 146 | coreference/NLI | acc. | fiction books |

All tasks are 2-class classification except MNLI (3 classes) and STS-B (regression, scores 1 to 5). Unless noted, tasks are balanced and evaluated on accuracy.

### Task by task

> [!definition] CoLA (Corpus of Linguistic Acceptability)
> English sentences from linguistic-theory books and articles labeled grammatical or not. Metric: **Matthews correlation coefficient** (MCC), which handles unbalanced binary classes and ranges from $-1$ to $1$ with $0$ = uninformed guessing. Standard test set with private labels from the authors; one number reported on the combined in-domain and out-of-domain sections. ^def-cola

> [!definition] SST-2 (Stanford Sentiment Treebank)
> Movie-review sentences; predict sentiment, two-way (positive/negative) split, sentence-level labels only. ^def-sst2

> [!definition] MRPC (Microsoft Research Paraphrase Corpus)
> Sentence pairs from online news with human labels of semantic equivalence. 68% positive, so report both accuracy and F1. ^def-mrpc

> [!definition] QQP (Quora Question Pairs)
> Question pairs from Quora; predict semantic equivalence. 63% negative; report accuracy and F1. Standard test set with private labels from the authors; the test label distribution differs from the training distribution. ^def-qqp

> [!definition] STS-B (Semantic Textual Similarity Benchmark)
> Sentence pairs from news headlines, video and image captions, and NLI data, each human-scored for similarity from 1 to 5. Regression; evaluate with Pearson and Spearman correlations. ^def-stsb

> [!definition] MNLI (Multi-Genre NLI)
> Crowdsourced premise-hypothesis pairs labeled entailment, contradiction or neutral; premises from ten sources including transcribed speech, fiction, government reports. Test labels private; evaluate on *matched* (in-domain) and *mismatched* (cross-domain) sections. The authors recommend SNLI (550k examples) as auxiliary training data. ^def-mnli

> [!definition] QNLI (Question-answering NLI)
> Recast of SQuAD. Each question is paired with each sentence of its context paragraph (after filtering low lexical-overlap pairs); the label is whether the sentence contains the answer. This drops the need to pick the exact answer span and also drops the assumptions that the answer is present and that lexical overlap is a reliable cue. An earlier release had an artifact making the task easier than described; an updated release fixed it. **Appendix A construction:** to balance the data, take all pairs where the most similar sentence to the question (by CBoW GloVe similarity) was *not* the answer, plus an equal number of cases where the correct sentence was the most similar but a distractor was a close second. ^def-qnli

> [!definition] RTE (Recognizing Textual Entailment)
> Union of RTE1, RTE2, RTE3 and RTE5 (RTE4 is not public; RTE6 and RTE7 do not fit the standard NLI task), news and Wikipedia text. All converted to two classes: for three-class sources, neutral and contradiction are collapsed into "not entailment". ^def-rte

> [!definition] WNLI (Winograd NLI)
> Recast of the Winograd Schema Challenge: replace the ambiguous pronoun by each candidate referent; predict whether the substituted sentence is entailed by the original. Test examples come from fiction books and were shared privately by the original authors. Test is imbalanced (65% "not entailment"); the training set is balanced. The *dev* set is adversarial: hypotheses are sometimes shared between train and dev, so memorizing the training set predicts the wrong dev label. Because of the conversion, a model's WNLI score does not correspond systematically to its score on the unconverted problem (same caveat for QNLI). ^def-wnli

## Examples

> [!example] Why the macro-average makes tiny tasks matter
> WNLI has 146 test examples and RTE 3k, but each gets weight $1/9$ in the final average. The 65.1% score every baseline shows on WNLI is the majority-class rate; no baseline beats it, so WNLI adds a constant 7.2 points $(65.1/9)$ to every average. Differences between models therefore come from the other eight tasks. ^ex-wnli-constant

```python
# Matthews correlation coefficient for a binary confusion matrix
import math
def mcc(tp, tn, fp, fn):
    d = math.sqrt((tp+fp)*(tp+fn)*(tn+fp)*(tn+fn))
    return (tp*tn - fp*fn)/d if d else 0.0

print(mcc(80, 10, 20, 10))   # accuracy 0.75 but MCC is only about 0.26 on this skewed confusion matrix
print(mcc(50, 40, 10, 0))    # accuracy 0.90, MCC about 0.82
```

## Connections

- The reuse-existing-data approach contrasts with the from-scratch construction of [[Deng 2009 - Construction Pipeline and AMT Quality Control]].
- The recasting of QA and coreference into NLI is the same "reduce many tasks to one interface" idea that [[Liang 2022 - Holistic Evaluation Framework and Taxonomy]] formalizes as the text-to-text abstraction.
- MCC and F1 versus accuracy under class imbalance parallels precision/recall care in conversion-modeling evaluation.

**Relevance to marketing measurement.** The selection-criteria list (diverse, difficult, includes data-poor cases, model-agnostic input format, withheld labels) is a ready checklist for assembling a benchmark of causal-effect estimators across heterogeneous campaigns.

## See Also

- [[Wang 2018 - GLUE - Overview]]
- [[Wang 2018 - Evaluation Protocol and Scoring]]
- [[Wang 2018 - Diagnostic Dataset]]
