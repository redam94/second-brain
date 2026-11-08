---
title: "Wang 2018 - Baselines and Benchmark Results"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Wang 2018 - GLUE.pdf]]"
source_location: "Sec. 5 Baselines, Sec. 6 Benchmark Results, Table 4, pp. 6-8"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Wang 2018 - GLUE"
doc_type: paper
depends_on:
  - "[[Wang 2018 - Task Suite and Selection Criteria]]"
  - "[[Wang 2018 - Evaluation Protocol and Scoring]]"
used_by:
  - "[[Wang 2018 - Diagnostic Results and Analysis]]"
aliases:
  - GLUE baselines
  - GLUE Table 4
  - GLUE multi-task vs single-task
---

# Wang 2018 - Baselines and Benchmark Results

> [!summary]
> Baselines: a BiLSTM sentence encoder with optional attention, ELMo or CoVe embeddings, trained either single-task or multi-task; and five pre-trained sentence-to-vector encoders (CBoW, Skip-Thought, InferSent, DisSent, GenSen) with task-specific classifiers on top. Multi-task training beats single-task for attention or ELMo models (best: 70.0 vs 66.5), ELMo consistently helps, CoVe has mixed effects, and several tasks (WNLI, RTE, CoLA) remain essentially unsolved. The authors conclude "solving GLUE is beyond the capabilities of current models and methods."

## Overview

The baselines serve two purposes: establish reference scores and test whether the benchmark rewards cross-task sharing, as designed. Models are implemented in AllenNLP; code at nyu-mll/GLUE-baselines (a later version in jsalt18-sentence-repl/jiant).

## Main Content

### Architectures (Sec. 5)

- **Base model.** Two-layer BiLSTM, 1500D per direction, max pooling, 300D GloVe (840B Common Crawl). Single-sentence tasks: encode sentence to vector, classify. Sentence-pair tasks: encode each sentence independently to $u,v$ and pass $[u;v;|u-v|;u*v]$ to the classifier, an MLP with a 512D hidden layer.
- **Attention variant.** Attention (inspired by BiDAF, Seo et al.) between all pairs of words followed by a second BiLSTM with max pooling, so it is no longer sentence-to-vector. Implementation (Appendix B.1): for hidden states $u_1..u_M$ and $v_1..v_N$ compute $H_{ij}=u_i\cdot v_j$; attention weights $\alpha_i=\operatorname{softmax}(H_{i\cdot})$; context $\tilde v_i=\sum_j\alpha_{ij}v_j$; a second BiLSTM with max pooling over $[u_i;\tilde v_i]$ gives $u'$ (and symmetrically $v'$); then $[u';v';|u'-v'|;u'*v']$ goes into the classifier.
- **Pre-training.** *ELMo* (two-layer biLM on the Billion Word Benchmark; contextual embedding = linear combination of hidden states of each layer; used in place of other embeddings). *CoVe* (two-layer BiLSTM encoder trained for English-to-German translation; top-layer hidden state concatenated to GloVe).
- **Training.** BiLSTM encoder and post-attention BiLSTMs shared across tasks, with separate classifiers per task. A task is sampled for each update with probability proportional to its number of training examples (Appendix B.2 also scales each task's loss inversely to its number of examples). Adam, batch size 128, macro-average dev score as validation metric; stop when learning rate falls below $10^{-5}$ or no improvement after 5 validation checks. *Single-task* models are configured identically but share no parameters (and are not tuned per task, so they are not state of the art).
- **Sentence-representation models** (frozen encoders, task-specific classifiers only; SentEval defaults): CBoW (average of GloVe), Skip-Thought (Toronto Book Corpus), InferSent (BiLSTM max-pool trained on MNLI and SNLI), DisSent (predict discourse marker, 8-way, from TBC), GenSen (multi-task seq2seq: MNLI+SNLI, Skip-Thought on TBC, constituency parsing on Billion Word).
- For each model, three runs were trained and the run with best dev macro-average evaluated (for single-task and sentence-representation models, the best run per task).

### Table 4: test-set results (all x100)

| Model | Avg | CoLA | SST-2 | MRPC (acc/F1) | QQP (acc/F1) | STS-B (Pear/Spear) | MNLI (m/mm) | QNLI | RTE | WNLI |
|---|---|---|---|---|---|---|---|---|---|---|
| *Single-task training* | | | | | | | | | | |
| BiLSTM | 63.9 | 15.7 | 85.9 | 69.3/79.4 | 81.7/61.4 | 66.0/62.8 | 70.3/70.8 | 75.7 | 52.8 | 65.1 |
| +ELMo | 66.4 | 35.0 | 90.2 | 69.0/80.8 | 85.7/65.6 | 64.0/60.2 | 72.9/73.4 | 71.7 | 50.1 | 65.1 |
| +CoVe | 64.0 | 14.5 | 88.5 | 73.4/81.4 | 83.3/59.4 | 67.2/64.1 | 64.5/64.8 | 75.4 | 53.5 | 65.1 |
| +Attn | 63.9 | 15.7 | 85.9 | 68.5/80.3 | 83.5/62.9 | 59.3/55.8 | 74.2/73.8 | 77.2 | 51.9 | 65.1 |
| +Attn, ELMo | 66.5 | 35.0 | 90.2 | 68.8/80.2 | 86.5/66.1 | 55.5/52.5 | 76.9/76.7 | 76.7 | 50.4 | 65.1 |
| +Attn, CoVe | 63.2 | 14.5 | 88.5 | 68.6/79.7 | 84.1/60.1 | 57.2/53.6 | 71.6/71.5 | 74.5 | 52.7 | 65.1 |
| *Multi-task training* | | | | | | | | | | |
| BiLSTM | 64.2 | 11.6 | 82.8 | 74.3/81.8 | 84.2/62.5 | 70.3/67.8 | 65.4/66.1 | 74.6 | 57.4 | 65.1 |
| +ELMo | 67.7 | 32.1 | 89.3 | 78.0/84.7 | 82.6/61.1 | 67.2/67.9 | 70.3/67.8 | 75.5 | 57.4 | 65.1 |
| +CoVe | 62.9 | 18.5 | 81.9 | 71.5/78.7 | 84.9/60.6 | 64.4/62.7 | 65.4/65.7 | 70.8 | 52.7 | 65.1 |
| +Attn | 65.6 | 18.6 | 83.0 | 76.2/83.9 | 82.4/60.1 | 72.8/70.5 | 67.6/68.3 | 74.3 | 58.4 | 65.1 |
| +Attn, ELMo | **70.0** | 33.6 | 90.4 | 78.0/84.4 | 84.3/63.1 | 74.2/72.3 | 74.1/74.5 | 79.8 | 58.9 | 65.1 |
| +Attn, CoVe | 63.1 | 8.3 | 80.7 | 71.8/80.0 | 83.4/60.5 | 69.8/68.4 | 68.1/68.6 | 72.9 | 56.0 | 65.1 |
| *Pre-trained sentence representation models* | | | | | | | | | | |
| CBoW | 58.9 | 0.0 | 80.0 | 73.4/81.5 | 79.1/51.4 | 61.2/58.7 | 56.0/56.4 | 72.1 | 54.1 | 65.1 |
| Skip-Thought | 61.3 | 0.0 | 81.8 | 71.7/80.8 | 82.2/56.4 | 71.8/69.7 | 62.9/62.8 | 72.9 | 53.1 | 65.1 |
| InferSent | 63.9 | 4.5 | 85.1 | 74.1/81.2 | 81.7/59.1 | 75.9/75.3 | 66.1/65.7 | 72.7 | 58.0 | 65.1 |
| DisSent | 62.0 | 4.9 | 83.7 | 74.1/81.7 | 82.6/59.5 | 66.1/64.8 | 58.7/59.1 | 73.9 | 56.4 | 65.1 |
| GenSen | 66.2 | 7.7 | 83.1 | 76.6/83.0 | 82.9/59.8 | 79.3/79.2 | 71.4/71.3 | 78.6 | 59.2 | 65.1 |

Note: Table 4 as printed shows the single-task "+Attn" row equal to the BiLSTM row for CoLA and SST-2 (and likewise ELMo rows duplicate each other, CoVe rows duplicate each other); this appears to reflect that those tasks ignore the attention component in the single-task setup (single-sentence tasks have no pair to attend over). WNLI is 65.1 for every row because predictions are replaced by the most-frequent-class baseline.

### Findings from Table 4 (Sec. 6)

1. **Multi-task helps when the model can use it.** Overall scores are better with multi-task training for models with attention or ELMo. Attention generally has negligible or negative aggregate effect in single-task training but helps in multi-task training. For example, +Attn,ELMo: 66.5 single-task vs 70.0 multi-task.
2. **ELMo** gives consistent improvements over GloVe or CoVe, particularly on single-sentence tasks (CoLA 15.7 to 35.0 single-task).
3. **CoVe** has mixed effects.
4. **Sentence-representation models** improve fairly consistently from CBoW to Skip-Thought to InferSent and GenSen. InferSent is competitive with models trained on GLUE; GenSen (66.2) beats all but the two best.
5. **Per-task patterns**: sentence-representation models do far worse on CoLA than models trained directly on it (e.g. 7.7 vs 35.0), but on STS-B directly trained models lag far behind the best encoder (GenSen 79.3/79.2 vs 74.2/72.3 best trained).
6. **No model beats majority-class on WNLI** (65.1); predictions are substituted with the majority baseline. RTE and the aggregate also leave much room.

## Examples

> [!example] Does multi-task training help? A paired comparison
> Compute the multi-task minus single-task difference in macro-average for the models available in both settings: BiLSTM $+0.3$ ($64.2$ vs $63.9$), +ELMo $+1.3$ ($67.7$ vs $66.4$), +CoVe $-1.1$ ($62.9$ vs $64.0$), +Attn $+1.7$ ($65.6$ vs $63.9$), +Attn,ELMo $+3.5$ ($70.0$ vs $66.5$), +Attn,CoVe $-0.1$ ($63.1$ vs $63.2$). Four of the six differences are positive, two are negative, and the benefit concentrates in the models with attention or ELMo. The best of three runs (chosen on dev) is reported for each configuration, so these are single-selection differences without uncertainty estimates, a limitation the paper does not address. ^ex-multitask-gain

```python
single = {"BiLSTM":63.9,"+ELMo":66.4,"+CoVe":64.0,"+Attn":63.9,"+Attn,ELMo":66.5,"+Attn,CoVe":63.2}
multi  = {"BiLSTM":64.2,"+ELMo":67.7,"+CoVe":62.9,"+Attn":65.6,"+Attn,ELMo":70.0,"+Attn,CoVe":63.1}
for k in single: print(f"{k:12s} {multi[k]-single[k]:+.1f}")
```

## Connections

- Single score vs vector of scores vs matrix: GLUE's per-task vector in Table 4 is what [[Liang 2022 - HELM - Overview]] calls a score vector.
- Multi-task sampling proportional to dataset size and the macro-average validation metric echo hierarchical pooling choices in [[Hierarchical Models]].
- Transfer/pre-training results (ELMo) set up the pre-train then fine-tune paradigm summarized in [[Autoregressive Language Modeling and Pretraining]].

**Relevance to marketing measurement.** The paper's "multi-task beats single-task" finding for data-scarce tasks is the empirical counterpart of partial pooling across campaigns or markets (see [[Partial Pooling as Multiple Comparisons Correction]]). The caution about unquantified single-run differences applies equally to comparing MMM variants.

## See Also

- [[Wang 2018 - GLUE - Overview]]
- [[Wang 2018 - Diagnostic Results and Analysis]]
- [[Wang 2018 - Appendices and Implementation Details]]
