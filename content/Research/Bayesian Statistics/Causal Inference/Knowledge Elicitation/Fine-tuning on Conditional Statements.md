---
title: "Fine-tuning on Conditional Statements: Improving LLM Causal Reasoning via Code Training"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/large-language-models
  - type/concept
  - doc/paper
source: "[[raw/Liu et al. - 2025 - Eliciting and Improving the Causal Reasoning Abilities of Large Language Models with Conditional Sta.pdf]]"
source_location: "§7, pp. 487–490"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on:
  - "[[Code Prompt Aspects Analysis]]"
  - "[[Code vs Text Prompt Evaluation]]"
used_by: []
aliases:
  - conditional statement fine-tuning
  - CodeAlpaca causal fine-tuning
---

# Fine-tuning on Conditional Statements: Improving LLM Causal Reasoning via Code Training

> [!summary]
> Section 7 shows that fine-tuning 7B models (LLaMA-2, QWEN1.5, DeepSeek-LLM) on a ~4,000-instance corpus of conditional-statement code (filtered from CodeAlpaca-20k) improves causal reasoning on both abductive and counterfactual tasks — and crucially, the gains transfer to text-prompted evaluation. This demonstrates that exposure to conditional statement code genuinely improves internal causal reasoning ability, not just code generation fluency. Performance scales consistently with training data fraction (largest gain in first 20%).

## Overview

Section 6 established that the conditional structure is the key factor in code prompt effectiveness. Section 7 tests whether *training* on conditional statement code can improve causal reasoning. The hypothesis: if LLMs learn the conditional structure from training data, their causal reasoning should improve when prompted with either code or text.

## Main Content

### Data Collection

**Source**: CodeAlpaca-20k (Chaudhary 2023) — 20,000 instruction-following examples in the Code Alpaca style (Wang et al. 2023a), covering code generation and editing tasks.

**Filtering**: ChatGPT (gpt-3.5-turbo-1106) is used to identify instances containing conditional statements:
> *"Does the following code contain conditional statements? Conditional statements are programming language commands for handling decisions, for example: if-then(-else) and switch statements."*

ChatGPT identifies 96% of 100 manually-checked instances correctly. Misses: 3 one-sided `if` statements (without `else`); hallucinates 1.

**Result**: 4,085 instances with conditional statements. Format: `### Instruction: [...] ### Input: [...] ### Output: [code]`.

### Training Setup

| Parameter | Value |
|-----------|-------|
| Models | LLaMA-2 7B, QWEN1.5 7B, DeepSeek-LLM 7B |
| Epochs | 1 |
| Batch size | 128 |
| Learning rate | 2e-5, warmup 0.03 |
| Max length | 512 tokens |
| Optimizer | AdamW |
| Baseline | Uniform sample from CodeAlpaca-20k (same size, no conditional filter) |

### Results (Table 10)

> [!example] Fine-tuning Gains (vs. pre-fine-tuning baseline)
>
> **Abductive reasoning**:
>
> | Model | Prompt | BLEU gain | BERTScore gain |
> |-------|--------|-----------|----------------|
> | LLaMA-2 | Text | +1.9 | +1.7 |
> | LLaMA-2 | Code | +0.7 | +1.0 |
> | QWEN1.5 | Text | +3.0 | +2.2 |
> | DeepSeek-LLM | Text | +0.6 | +0.4 |
>
> **Counterfactual reasoning**:
>
> | Model | Prompt | BLEU gain | BERTScore gain |
> |-------|--------|-----------|----------------|
> | LLaMA-2 | Text | +29.7 | +12.0 |
> | LLaMA-2 | Code | +35.7 | +11.2 |
> | QWEN1.5 | Text | +52.4 | +68.1 |
> | QWEN1.5 | Code | +38.1 | +15.7 |
> | DeepSeek-LLM | Code | +14.8 | +7.0 |
^ex-finetuning-gains

**Key observations**:
- Gains are consistent across all three models on both tasks.
- **Text prompt gains are larger than or equal to code prompt gains** in many cases (e.g., QWEN1.5 counterfactual: +52.4 BLEU text vs. +38.1 code). This demonstrates that training on conditional statements does not just improve code generation — it genuinely improves causal reasoning, which transfers to natural language.
- Counterfactual gains are much larger than abductive gains, likely because the branching `if`/`elif` structure is more directly relevant to counterfactual scenarios.

### Training Data Fraction Analysis (Figure 5)

Fine-tuning on conditional statements consistently outperforms uniform CodeAlpaca fine-tuning across all data fractions. Key finding:

> The **largest performance enhancement** is observed from 0% to 20% of training data (less than ~800 instances). Beyond that, gains continue but at a slower rate.

This means models can acquire meaningful causal reasoning improvements with very small amounts of conditional statement training data — important for low-resource scenarios.

### Controlled Baseline

A **uniform sample** from CodeAlpaca-20k (without the conditional filter, same size = 4,085 instances) also provides gains, but smaller than the conditional-filtered corpus. This shows:
1. General code training helps causal reasoning somewhat.
2. **Conditional statements specifically** provide additional causal reasoning improvement beyond general code training.

The conditional statement corpus likely improves understanding of both code prompts (direct) and text prompts (via better internal causal representations).

## Connections

- The result that text-prompt performance improves after code training connects to [[Code Prompt Aspects Analysis]] — the conditional structure encodes causal knowledge that generalizes beyond the code format.
- The transfer to text prompts is analogous to how training on structured causal data (e.g., DAG-based generation) can improve general causal inference — see [[Summary Causal DAGs]] for analogous structure-to-reasoning transfer.
- The data efficiency (20% of data = most of the gain) is relevant to [[LLM Expert Elicitation for Bayesian Networks]] — small structured datasets can efficiently improve targeted capabilities.

## See Also
- [[Code Prompt Aspects Analysis]] — motivation for using conditional statements specifically
- [[Code vs Text Prompt Evaluation]] — baseline performance before fine-tuning
- [[Liu 2025 - Overview]] — full paper overview
- [[In-Context Learning and Few-Shot Prompting]] — fine-tuning versus prompting
- [[RLHF and Instruction Tuning]] — small targeted fine-tunes vs preference-based post-training
- [[LLM Causal Reasoning Tasks]] — the abductive and counterfactual benchmarks on which the fine-tuned models are evaluated
