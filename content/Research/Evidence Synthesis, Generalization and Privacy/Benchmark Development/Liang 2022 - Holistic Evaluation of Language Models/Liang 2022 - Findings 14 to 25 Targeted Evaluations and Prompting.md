---
title: "Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting"
tags:
  - source/ingested
  - topic/benchmarks
  - type/concept
  - type/example
  - doc/paper
source: "[[raw/Liang 2022 - Holistic Evaluation of Language Models.pdf]]"
source_location: "Sec. 1.2 findings 14-25, Sec. 8.4-8.5, pp. 8-10"
date_ingested: 2026-11-08
folder: "Evidence Synthesis, Generalization and Privacy/Benchmark Development/Liang 2022 - Holistic Evaluation of Language Models"
doc_type: paper
depends_on:
  - "[[Liang 2022 - Findings 1 to 13 Core Scenarios]]"
  - "[[Liang 2022 - Targeted Evaluations]]"
used_by:
  - "[[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]]"
aliases:
  - HELM findings 14-25
  - HELM multiple choice adaptation sensitivity
  - HELM perplexity vs accuracy
---

# Liang 2022 - Findings 14 to 25 Targeted Evaluations and Prompting

> [!summary]
> Findings 14-20 report the targeted evaluations (language, knowledge, reasoning, memorization, disinformation, bias, toxicity generation); finding 21 states that comprehensive standardized evaluation surfaces results "lying in plain sight" (text-davinci-002 sets a new state of the art on NarrativeQA at 74.4% ROUGE-L); findings 22-23 show extreme prompt and multiple-choice-adaptation sensitivity (accuracy from 79.1% to 30.2% for the same model and scenario); finding 24 shows upstream perplexity predicts downstream accuracy poorly across families; finding 25 shows scale predicts accuracy within a family but a threshold near 50B parameters separates top models.

## Overview

Together with [[Liang 2022 - Findings 1 to 13 Core Scenarios]], these make up the 25 top-level findings of Sec. 1.2.

## Main Content

> [!theorem] Finding 14: linguistic understanding
> Language-modeling trends differ from core-scenario trends: GPT-NeoX (20B), OPT (175B), BLOOM (176B), GPT-J (6B) and OPT (66B) consistently have the lowest bits-per-byte on The Pile, TwitterAAE and ICE. On BLiMP all models perform fairly similarly overall and on each subset (morphology, syntax, semantics, syntax-semantics); the widest spread is on irregular forms, where text-davinci-002 and TNLG v2 (530B), most accurate on the core scenarios, are among the least accurate, perhaps from overgeneralized rules. ^thm-finding-14

> [!theorem] Finding 15: knowledge
> text-davinci-002 is superior on all knowledge-intensive evaluations, with a sizable gap on TruthfulQA (62.0% vs 36.2% for Anthropic-LM v4-s3 (52B)). TNLG v2 (530B) is strong on NaturalQuestions (closed-book) and WikiFact: 38.5% vs 28.7% (NQ closed-book) and 34.3% vs 22.3% (WikiFact) against Anthropic-LM v4-s3, consistent with scale contributing to factual knowledge. ^thm-finding-15

> [!theorem] Finding 16: reasoning
> Code models, especially code-davinci-002, consistently outperform text models, even on synthetic reasoning in natural language. GSM8K: code-davinci-002 52.1%, text-davinci-002 35.0%, no other model above 16%. Synthetic reasoning in natural language: text-davinci-002 65.1% vs next-best text model OPT (175B) 29.4%, code-davinci-002 72.7%. ^thm-finding-16

> [!theorem] Finding 17: memorization of copyrighted or licensed material
> Direct regurgitation of long copyrighted sequences is somewhat uncommon but becomes noticeable for popular books. Regurgitation risk correlates with accuracy: text-davinci-002, davinci (175B) and Anthropic-LM v4-s3 (52B) show the most verbatim regurgitation. ^thm-finding-17

> [!theorem] Finding 18: disinformation
> The largest models (text-davinci-002, Anthropic-LM v4-s3 (52B)) are effective at generating realistic headlines that support a thesis; results are more mixed for text encouraging certain actions (Table 8). ^thm-finding-18

> [!theorem] Finding 19: targeted biases (BBQ)
> text-davinci-002 is the most accurate on BBQ by a wide margin (89.5%); next are T0++ (11B) at 48.4% and TNLG v2 (530B) at 44.9%, the only others above 40%. Only these three most-accurate models have biases in ambiguous contexts aligned with broader social biases; all other models show bias in the other direction. The most accurate models are thus those most concerning for social bias in ambiguous contexts; trends in disambiguated contexts are less clear. ^thm-finding-19

> [!theorem] Finding 20: targeted toxicity generation
> Core-scenario toxicity generation rates were low. All models show much stronger tendencies to generate toxic text for toxic prompts in RealToxicityPrompts than for relatively non-toxic prompts in RealToxicityPrompts and BOLD. Dependence on the detector (Perspective API) and on human judgments from diverse stakeholders is flagged as a key area for future work. ^thm-finding-20

> [!theorem] Finding 21: comprehensiveness
> By evaluating extensively under unified conditions, HELM exposes "findings lying in plain sight": text-davinci-002 reaches 74.4% ROUGE-L on NarrativeQA, a new state of the art to the authors' knowledge, above the QA-specialized UnifiedQA-v2 (67.4% ROUGE-L; Khashabi et al. 2022). ^thm-finding-21

> [!theorem] Finding 22: prompting
> All models are significantly sensitive to prompt formatting, choice of in-context examples and number of in-context examples across all scenarios and metrics (Sec. 8.2). The paper standardizes these dimensions, but current models differ in which prompting decisions would maximize accuracy. ^thm-finding-22

> [!theorem] Finding 23: multiple-choice adaptation method
> Performance is extremely sensitive to how multiple-choice scenarios are adapted: OPT (175B) on HellaSwag reaches 79.1% when each answer is presented in a separate 0-shot prompt (one of the most accurate models) but only 30.2% (almost random) when choices are presented jointly in one 5-shot prompt. The accuracy-maximizing adaptation differs across models even within one scenario (Fig. 33). This is "a fundamental challenge for what it means to standardize language model evaluation in a fair way across models." ^thm-finding-23

> [!theorem] Finding 24: upstream perplexity and downstream accuracy
> Across model families, bits-per-byte on The Pile is a poor predictor of downstream accuracy (Fig. 30), though some models are trained on The Pile (contamination or in-distribution confound). The authors encourage research on intrinsic or upstream surrogates that reliably predict downstream results, including desiderata beyond accuracy. ^thm-finding-24

> [!theorem] Finding 25: trends for model scale
> Within a model family, scale reliably predicts accuracy; across all models, scale is not a good predictor of downstream accuracy for any scenario (Fig. 29). But there is a clear thresholding effect: all models whose head-to-head accuracy win rate is well above chance (greater than 55%) have at least 50B parameters. Of the 10 most accurate, some of the smallest (Anthropic-LM v4-s3 (52B), Cohere xlarge v20220609 (52.4B)) are in the top 5, so scaling may be inefficient compared with other means such as training with human feedback (compare TNLG v2 (530B) and Anthropic-LM v4-s3 (52B)). ^thm-finding-25

### Summary table

| # | Topic | Headline number |
|---|---|---|
| 14 | Language | irregular forms: top core models among the least accurate |
| 15 | Knowledge | TruthfulQA 62.0% vs 36.2%; NQ closed-book 38.5% vs 28.7%; WikiFact 34.3% vs 22.3% |
| 16 | Reasoning | GSM8K code-davinci-002 52.1%, text-davinci-002 35.0%; none other above 16% |
| 17 | Copyright | regurgitation correlates with accuracy |
| 18 | Disinformation | largest models produce realistic supporting headlines |
| 19 | BBQ | text-davinci-002 89.5%; T0++ 48.4%; TNLG v2 44.9% |
| 20 | Toxic generation | strongly prompt-dependent |
| 21 | Comprehensiveness | NarrativeQA 74.4% ROUGE-L new SOTA vs 67.4% |
| 22 | Prompting | sensitive to format, examples, number |
| 23 | MC adaptation | 79.1% vs 30.2% for OPT-175B on HellaSwag |
| 24 | Perplexity | BPB poor predictor of accuracy across families |
| 25 | Scale | threshold: win rate above 55% implies at least 50B |

## Examples

> [!example] A 49-point swing from adaptation alone
> Finding 23: $79.1-30.2=48.9$ percentage points for one model on one dataset, changed only by the prompt protocol. If a leaderboard reported only the joint format, OPT (175B) would look near-random on HellaSwag; under the separate format it is near the top. Any claimed model ranking is therefore conditional on the adaptation protocol. The earlier cited swing for GPT-3-style few-shot prompts ranges from about 30% to 80% (Zhao et al. 2021). ^ex-adaptation-swing

```python
sep, joint = 79.1, 30.2
print(sep - joint)   # 48.9 percentage points
```

## Connections

- Findings 22-23 motivate the standardization element of holistic evaluation ([[Liang 2022 - Holistic Evaluation Framework and Taxonomy]]) and are quantified in [[Liang 2022 - Experiments Meta-Analysis and Prompting Ablations]].
- Finding 25 relates to scaling-law results: [[Neural Scaling Laws]] and [[Compute-Optimal Training (Chinchilla)]].
- Findings 17 (memorization) and 24 (perplexity) bear on pretraining: [[Autoregressive Language Modeling and Pretraining]].

**Relevance to marketing measurement.** Findings 22-24 are a warning against inferring method quality from a proxy or a single protocol: ranking MMM vendors by in-sample fit (an "upstream" proxy) can poorly predict out-of-sample or experiment-calibrated accuracy, and results depend on the tuning protocol. Report sensitivity to protocol alongside the ranking.

## See Also

- [[Liang 2022 - HELM - Overview]]
- [[Liang 2022 - Findings 1 to 13 Core Scenarios]]
- [[Liang 2022 - Targeted Evaluations]]
