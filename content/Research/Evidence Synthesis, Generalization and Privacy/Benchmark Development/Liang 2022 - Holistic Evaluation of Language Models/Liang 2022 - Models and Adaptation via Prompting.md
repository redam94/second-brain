---
title: "Liang 2022 - Models and Adaptation via Prompting"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - doc/paper
source: "[[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]"
source_location: "Sec. 6 Models (Table 5, Table 6), Sec. 7 Adaptation via prompting (Fig. 23, Table 7), Appendix I and J pointers, pp. 43-47, 157-162"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models"
doc_type: paper
depends_on:
  - "[[Liang 2022 - Holistic Evaluation Framework and Taxonomy]]"
used_by:
  - "[[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]]"
  - "[[Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting]]"
aliases:
  - HELM 30 models
  - HELM 5-shot prompting
  - HELM adaptation
---

# Liang 2022 - Models and Adaptation via Prompting

> [!summary]
> HELM evaluates 30 models from 12 organizations (16 families; 10 open, 17 limited-access, 3 closed) through a single adaptation method, 5-shot prompting with fixed in-context examples per scenario and three random seeds for example selection. Standardization trades off against model-specific suitability: T0++ and T5 were not designed for 5-shot prompting. Known contamination, API versioning and technical failures are documented, and 96.0% of (model, scenario) pairs were completed.

## Overview

Section 6 describes who was evaluated and under which access conditions; Section 7 specifies how every model is adapted. The two together define the "standardized conditions" that give HELM its coverage claim.

## Main Content

### Table 5: the 30 models

| Model | Creator | Params | Context window | Access |
|---|---|---|---|---|
| J1-Jumbo v1 / J1-Grande v1 / J1-Large v1 | AI21 Labs | 178B / 17B / 7.5B | 2047 | limited |
| Anthropic-LM v4-s3 | Anthropic | 52B | 8192 | closed |
| BLOOM | BigScience | 176B | 2048 | open |
| T0++ | BigScience | 11B | 1024 | open |
| Cohere xlarge v20220609 / large v20220720 / medium v20220720 / small v20220720 | Cohere | 52.4B / 13.1B / 6.1B / 410M | 2047 | limited |
| GPT-J / GPT-NeoX | EleutherAI | 6B / 20B | 2048 | open |
| T5 / UL2 | Google | 11B / 20B | 512 | open |
| OPT (66B) / OPT (175B) | Meta | 66B / 175B | 2048 | open |
| TNLG v2 (6.7B) / TNLG v2 (530B) | Microsoft/NVIDIA | 6.7B / 530B | 2047 | closed |
| davinci / curie / babbage / ada | OpenAI | 175B / 6.7B / 1.3B / 350M | 2048 | limited |
| text-davinci-002 / text-curie-001 / text-babbage-001 / text-ada-001 | OpenAI | unknown | 4000 / 2048 / 2048 / 2048 | limited |
| code-davinci-002 / code-cushman-001 | OpenAI (code) | unknown / 12B | 4000 / 2048 | limited |
| GLM | Tsinghua University | 130B | 2048 | open |
| YaLM | Yandex | 100B | 2048 | open |

Costs recorded in the paper: for open models GPU hours (for example BLOOM 4,200, OPT-175B 3,400, GLM 2,100, YaLM 2,200, GPT-NeoX 540); for commercial models dollars (for example J1-Jumbo \$10,926, text-davinci-002 \$9,337, davinci \$8,440); private-model costs covered by providers. Overall: 12,169,227,491 tokens, 17,431,479 queries, \$38,001 for commercial APIs, about 19,500 GPU hours for open models.

**Access categories.** *Open* (weights downloadable: GPT-NeoX, OPT, BLOOM, ...), *limited* (API: davinci, J1-Jumbo, Cohere xlarge), *closed* (owner provided research access: Anthropic-LM v4-s3, TNLG v2). Models not evaluated for lack of access: PaLM, LaMDA, Gopher, RETRO, Chinchilla. Open-model inference ran on the Together Research Computer (pipeline parallelism over RTX 2080 Ti and A100 GPUs; Table 6).

### Caveats on the evaluation (Sec. 6)

- **Live systems.** Commercial models may be updated silently; results are specific to the version and date queried (timestamps released); the evaluation assumes models did not change during the run.
- **Isolated technical issues.** (i) Models that do not return probabilities (T0++, T5, UL2, GLM, YaLM) cannot be evaluated on scenarios requiring them (HellaSwag, MS MARCO regular, The Pile). (ii) J1-Jumbo and J1-Grande had a tokenization error blocking NaturalQuestions (closed-book). (iii) Incorrect temperature-zero probabilities for AI21 models prevent calibration, MS MARCO (regular) and MS MARCO (TREC). These explain evaluating 96.0% rather than 100% of (model, scenario) pairs.
- **Contamination.** Training data is uneven or undisclosed (exceptions: ROOTS for BLOOM; the Pile for GPT-J and GPT-NeoX). With few-shot evaluation, training on the evaluation distribution would compromise validity. Known disclosed contamination is flagged and compiled in Appendix G; the authors urge canaries and proactive disclosure.
- **Fairness of evaluation.** Standardized scenarios, metrics and prompts, but models differ in training resources (partly captured by efficiency metrics) and suitability: T0++ (designed for zero-shot) and T5 (neither in-context learning nor instruction following) are evaluated 5-shot. Recommendation: model developers should declare how their models should be evaluated and the scope of their generality.

### Adaptation via prompting (Sec. 7)

> [!definition] HELM adaptation
> For each scenario the prompt consists of (optional) instructions, up to **5 in-context examples** (fewer if they do not fit the context window), the test instance, and a fixed output format, with decoding parameters (for example temperature 0, max tokens depending on the scenario). Fixed means the **same in-context examples are used for every evaluation instance** (following Perez et al. 2021), rather than resampled per instance as in Brown et al. (2020). Examples are chosen by sampling from the scenario's training set, ensuring class coverage in classification (the most frequent classes are represented first). All experiments are repeated **3 times**, varying only the random in-context example selection, to estimate variance. ^def-helm-adaptation-prompting

- **Prompt formatting.** Mechanistic details (instruction text, input and output prefixes) are treated as *user behavior* rather than optimized per model; the stance is that models should be interoperable, working under generic prompts (Appendix J).
- **Adaptation strategy for multiple choice.** Two classes from prior work: **separate** (Brown et al. 2020; score each choice independently by concatenating with the question and computing its probability, optionally calibrated by the probability of the choice alone) and **joint** (Hendrycks et al. 2021; present all choices with the question and have the LM predict the choice index, like an exam). Figure 7 shows both (temperature 0; max tokens 0 for separate scoring, 1 for joint). Which is more accurate depends on the scenario and model (see [[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]]).
- **Table 7** gives example parameter sets for language modeling, TruthfulQA, and CNN/DailyMail, including number of evaluation instances and runs.
- Results interface: the website exposes quantitative results *and* underlying predictions and exact prompts; all raw prompts and completions are released.

## Examples

> [!example] Separate vs joint scoring of one MMLU item
> Item: "Which of the following terms describes the body's ability to maintain its normal state?" with options Anabolism, Catabolism, Tolerance, Homeostasis. *Separate*: four prompts, each ending in one option string; log-probabilities per option (for example Anabolism $-0.007$, Homeostasis $-0.005$ in the figure) and pick the highest, optionally normalized. *Joint*: one prompt listing A-D with "Answer:" and read the generated letter (the figure shows "D" with log prob $-0.26$). The two give different accuracy profiles per model, e.g. OPT (175B) on HellaSwag drops from 79.1% (separate, 0-shot) to 30.2% (joint, 5-shot). ^ex-separate-joint

```python
import numpy as np

def pick_separate(logps):          # logps: log prob of each option string
    return int(np.argmax(logps))

def pick_joint(letter_logps):      # log prob of generating each option letter
    return int(np.argmax(letter_logps))

print(pick_separate([-0.007, -0.9, -2.1, -0.005]))   # option index 3 (Homeostasis)
print(pick_joint([-3.0, -2.9, -3.1, -0.26]))         # option index 3 (D)
```

## Connections

- The few-shot setup is the framework of [[In-Context Learning and Few-Shot Prompting]]; instruction tuning and human-feedback models are explained in [[RLHF and Instruction Tuning]].
- Open vs closed access echoes policy discussion of research access; see [[Evaluating LLM Systems - Benchmarks, Hallucination and Human Preference]].
- Contamination is the benchmark-level analogue of test-set leakage and the benchmark-overfitting concerns in [[Researcher Degrees of Freedom]].

**Relevance to marketing measurement.** The "adaptation" notion maps to how a measurement method is configured before it is scored (priors, tuning budget, data preparation). HELM's discipline of fixing and reporting adaptation, and repeating over random seeds to expose variance, is the practice needed when comparing MMM vendors or pipelines.

## See Also

- [[Liang 2022 - HELM - Overview]]
- [[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]]
