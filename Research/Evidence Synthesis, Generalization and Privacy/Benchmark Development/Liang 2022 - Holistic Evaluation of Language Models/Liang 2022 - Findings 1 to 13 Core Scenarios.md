---
title: "Liang 2022 - Findings 1 to 13 Core Scenarios"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]"
source_location: "Sec. 1.2 findings 1-13, Sec. 8.3 pointers (Figs. 24-28), pp. 6-8"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models"
doc_type: paper
depends_on:
  - "[[Liang 2022 - Core Scenarios and Dataset Selection]]"
  - "[[Liang 2022 - The Seven Metrics]]"
  - "[[Liang 2022 - Models and Adaptation via Prompting]]"
used_by:
  - "[[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]]"
  - "[[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]]"
aliases:
  - HELM findings 1-13
  - HELM instruction tuning finding
  - HELM open vs closed gap
---

# Liang 2022 - Findings 1 to 13 Core Scenarios

> [!summary]
> The first 13 of HELM's 25 findings concern the core scenarios and metrics: instruction-tuned models (text-davinci-002, Anthropic-LM v4-s3) lead on accuracy, robustness and fairness; a consistent accuracy gap separates open from non-open models; the accuracy-calibration relationship depends on the scenario; accuracy, robustness and fairness are strongly correlated but with sharp worst-case drops; disparities persist; generative harms are low on average but non-zero; accuracy and efficiency do not trade off strongly; and per-task results (QA, IR, summarization, sentiment, toxicity detection, RAFT) are heterogeneous.

## Overview

The run totals behind these findings: 4,939 runs, 12.2 billion tokens, 17.4 million queries, \$38,001 for commercial APIs and about 19,500 GPU hours. Three framing caveats from Sec. 1.1: (i) models may be better suited to particular prompts and scenarios than the standardized setup allows; (ii) compute used to train models differs greatly (resource-intensive models fare better); (iii) contamination is poorly understood (evidence in Appendix G).

## Main Content

> [!theorem] Finding 1: the benefits of instruction-tuning
> Across the core scenarios, text-davinci-002 performs best on accuracy, robustness and fairness, with Anthropic-LM v4-s3 (52B) in the top 3 for all three, despite being more than 10x smaller than TNLG v2 (530B), the second most accurate and fair. Since text-davinci-002 and Anthropic-LM v4-s3 are the only instruction-tuned models evaluated (beyond smaller OpenAI variants), instruction-tuning appears to provide a broad set of advantages (Fig. 26). ^thm-finding-1

> [!theorem] Finding 2: accuracy vs model access
> Given high accuracy of Anthropic-LM v4-s3 (closed), TNLG v2 (530B) (closed) and text-davinci-002 (limited-access), there is a consistent gap on all core scenarios between open and non-open models (Fig. 28). The gap reflects the snapshot (OPT (175B), BLOOM (176B), GLM (130B) greatly reduced it) and excludes PaLM and Gopher, which are expected to be accurate. Monitoring the gap tracks accessibility and power dynamics. ^thm-finding-2

> [!theorem] Finding 3: calibration
> The relationship between accuracy and calibration depends on scenario and adaptation procedure (Figs. 24-25): for HellaSwag, improving accuracy *worsens* calibration; for OpenBookQA, improving accuracy *improves* calibration. ^thm-finding-3

> [!theorem] Finding 4: robustness and fairness perturbations
> Strong correlations between accuracy, robustness and fairness (robustness and fairness here are worst-case accuracy over perturbations such as typos and dialect alteration), but the most accurate model is not always most robust or fair. Serious drops occur: on NarrativeQA, TNLG v2 (530B) falls from 72.6% standard accuracy (third-most accurate) to 38.9% with robustness perturbations. ^thm-finding-4

> [!theorem] Finding 5: performance disparities
> With demographic metadata, consistent disparities appear for all models. Example: OPT (175B) is the most accurate on TwitterAAE, but its bits-per-byte degrades from 1.506 for White English to 2.114 for African American English (lower is better). ^thm-finding-5

> [!theorem] Finding 6: generative harms
> Biases and toxicity in model generations are largely constant across models and low on average for the core scenarios (Fig. 24). Even low levels can cause non-trivial social harm, hence targeted evaluations. ^thm-finding-6

> [!theorem] Finding 7: accuracy vs efficiency
> No strong trade-off between accuracy and efficiency across all 30 models (Fig. 24). Within a family (for example GPT-3 sizes) larger models are consistently more accurate but cost more to train and infer; only a subset of models across families lies on the accuracy-efficiency Pareto frontier for each scenario. ^thm-finding-7

> [!theorem] Finding 8: question answering
> Across the 9 core QA scenarios results are heterogeneous, but text-davinci-002 is most accurate on all nine; for 6 of 9 there is no open model in the top three (text-davinci-002, Anthropic-LM v4-s3 (52B), TNLG v2 (530B) in descending order). ^thm-finding-8

> [!theorem] Finding 9: information retrieval
> Best models outperform classical retrieval methods and in some settings perform comparably to fine-tuned neural retrievers while trailing the state of the art. The LM-per-passage approach is unorthodox and computationally intensive, included as a proof of concept. ^thm-finding-9

> [!theorem] Finding 10: summarization
> CNN/DailyMail and XSUM, long-standing standards, are such that "automated evaluations on these datasets largely fail to discriminate differences we observed in model quality." ^thm-finding-10

> [!theorem] Finding 11: sentiment analysis
> On IMDB many models are accurate and well calibrated with marginal drops under robustness and fairness perturbations, but the contrast sets of Gardner et al. (2020) reveal clear robustness limitations (for example GLM (130B), one of the most accurate, drops by more than 8%). ^thm-finding-11

> [!theorem] Finding 12: toxicity detection
> On CivilComments most models are not particularly accurate: OPT (175B) is among the most accurate across scenarios but at essentially chance (50.1%) here. Models are similarly accurate on comments mentioning Black and White individuals, but robustness differs greatly: OPT (175B) drops from 51.3% to 8.8% robust accuracy on the Black split versus 50.8% to 24.3% on the White split. ^thm-finding-12

> [!theorem] Finding 13: miscellaneous text classification
> RAFT shows significant heterogeneity of which models do well on which subsets. text-davinci-002 is consistently accurate but very poor on the Systematic Review Inclusion split (40.8%) compared with 97.5% from several models (for example GLM (130B)). ^thm-finding-13

### Summary table

| # | Topic | Headline number |
|---|---|---|
| 1 | Instruction tuning | text-davinci-002 best on accuracy, robustness, fairness |
| 2 | Access gap | open < non-open, consistent |
| 3 | Calibration | HellaSwag: accuracy up, calibration worse; OpenBookQA: both better |
| 4 | Robustness | NarrativeQA 72.6% to 38.9% (TNLG v2 530B) |
| 5 | Disparities | OPT-175B TwitterAAE BPB 1.506 (White) vs 2.114 (AAE) |
| 6 | Generative harms | low and constant on average |
| 7 | Efficiency | no strong accuracy-efficiency trade-off |
| 8 | QA | text-davinci-002 wins all 9 |
| 9 | IR | beats classical, near fine-tuned neural retrievers |
| 10 | Summarization | automated metrics fail to discriminate |
| 11 | Sentiment | contrast sets expose drops above 8% |
| 12 | Toxicity detection | OPT-175B 50.1%; robust accuracy 8.8% (Black split) |
| 13 | RAFT | Systematic Review: 40.8% vs 97.5% |

## Examples

> [!example] Size of the robustness penalty
> Finding 4: TNLG v2 (530B) goes from 72.6% to 38.9% on NarrativeQA, a relative drop of $1-38.9/72.6=46.4\%$ (absolute 33.7 points). Finding 12: OPT (175B)'s Black-split robust accuracy 8.8% vs standard 51.3% is a relative drop of 82.8%, versus 52.2% on the White split ($24.3/50.8$). The asymmetric degradation across groups is the kind of difference that a mean accuracy conceals. ^ex-robustness-drop

```python
def rel_drop(std, rob): return 100*(1 - rob/std)
print(round(rel_drop(72.6, 38.9),1), round(rel_drop(51.3, 8.8),1), round(rel_drop(50.8, 24.3),1))
```

## Connections

- Findings 4 and 5 rely on the worst-case and subgroup definitions in [[Liang 2022 - The Seven Metrics]].
- Finding 10 (metrics that fail to discriminate) is an instance of benchmark saturation and metric validity limits discussed in [[Liang 2022 - Related Work, Missing Pieces and Limitations]].
- Instruction tuning and human feedback (Finding 1): [[RLHF and Instruction Tuning]].

**Relevance to marketing measurement.** Findings 4 and 12 illustrate why aggregate accuracy is insufficient: a method can be strong on average and brittle in a subgroup or under perturbation. In MMM or geo-experiment benchmarking, report subgroup and worst-case error alongside the mean.

## See Also

- [[Liang 2022 - HELM - Overview]]
- [[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]]
