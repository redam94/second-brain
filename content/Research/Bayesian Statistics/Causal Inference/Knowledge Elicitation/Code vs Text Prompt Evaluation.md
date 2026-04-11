---
title: "Code vs Text Prompt Evaluation: LLM Causal Reasoning Benchmarks"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/large-language-models
  - type/example
  - doc/paper
source: "[[raw/Liu et al. - 2025 - Eliciting and Improving the Causal Reasoning Abilities of Large Language Models with Conditional Sta.pdf]]"
source_location: "§5, pp. 475–483"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on:
  - "[[Code Prompts for Causal Structure]]"
  - "[[LLM Causal Reasoning Tasks]]"
used_by:
  - "[[Code Prompt Aspects Analysis]]"
  - "[[Fine-tuning on Conditional Statements]]"
aliases:
  - code prompt results
  - LLM causal reasoning benchmark
---

# Code vs Text Prompt Evaluation: LLM Causal Reasoning Benchmarks

> [!summary]
> Across zero-shot and one-shot settings on abductive (αNLG) and counterfactual (TimeTravel) tasks, code prompts outperform text prompts for most models (+5.1% BLEU, +5.3% BERTScore average in zero-shot). Code-LLMs (CodeLLaMA, Codex) consistently outperform same-architecture general-purpose LLMs (LLaMA-2, GPT-3) by ~14% BLEU. The alignment tax is observed for GPT-3/Codex: fine-tuning with instructions may weaken code-derived causal abilities.

## Overview

Section 5 answers RQ1 (Code-LLMs vs. general-purpose LLMs?) and RQ2 (code prompts vs. text prompts?). Experiments use automatic metrics and a human pairwise evaluation (100 examples, inter-rater reliability 0.63).

## Main Content

### Experimental Setup

**Datasets**: αNLG (3,561 instances) for abductive; TimeTravel (1,871 instances) for counterfactual.

**Models**:

| Type | Models |
|------|--------|
| General-purpose (open) | LLaMA-2 7B, QWEN1.5 7B, DeepSeek-LLM 7B, Mixtral 8×7B |
| General-purpose (closed) | Gemini-Pro, GPT-3 (text-davinci-002) |
| Code (open) | CodeLLaMA 7B (= LLaMA-2 + code fine-tune), CodeQWEN1.5 7B |
| Code (closed) | Codex (code-davinci-002) |

Three **paired comparisons** share architecture, differ only in training corpus: ⟨LLaMA-2, CodeLLaMA⟩, ⟨QWEN1.5, CodeQWEN1.5⟩, ⟨GPT-3, Codex⟩.

**Baselines**: DELOREAN, COLD, DIFFUSION (abductive); CGMH, EduCAT, DELOREAN, COLD (counterfactual).

### Zero-Shot Results

> [!example] Key Numerical Results (Zero-Shot)
>
> **Abductive reasoning (Table 2)**:
>
> | Model | Prompt | BLEU₄ | ROUGE_L | CIDEr | BERTScore |
> |-------|--------|-------|---------|-------|-----------|
> | LLaMA-2 | Text | 4.8 | 28.7 | 44.0 | 58.0 |
> | LLaMA-2 | Code | 6.1 (+1.3) | 30.5 (+1.8) | 50.3 (+6.3) | 59.2 (+1.2) |
> | CodeLLaMA | Text | 5.6 | 31.0 | 49.9 | 59.8 |
> | CodeLLaMA | Code | 6.2 (+0.6) | 31.7 (+0.7) | 55.4 (+5.5) | 60.1 (+0.3) |
> | Codex | Text | 11.7 | 37.5 | 78.5 | 62.5 |
> | **Codex** | **Code** | **13.7** (+2.0) | **39.6** (+2.1) | **81.8** (+3.3) | **64.9** (+2.4) |
> | Gemini | Code | 13.5 (+6.9) | 38.1 (+8.1) | 80.8 (+28.2) | **64.2** (+5.4) |
>
> **Counterfactual reasoning (Table 3)**:
>
> | Model | Prompt | BLEU₄ | ROUGE_L | BERTScore |
> |-------|--------|-------|---------|-----------|
> | LLaMA-2 | Text | 18.7 | 33.2 | 63.3 |
> | LLaMA-2 | Code | 33.8 (+15.1) | 51.5 (+18.3) | 72.7 (+9.4) |
> | CodeLLaMA | Text | 57.2 | 62.8 | 79.1 |
> | CodeLLaMA | Code | 59.7 (+2.5) | 63.9 (+1.1) | 79.7 (+0.6) |
> | **Codex** | **Code** | **66.8** (+11.7) | **70.0** (+8.7) | **82.5** (+4.7) |
^ex-zero-shot-results

**Findings**:
- Code prompts outperform text prompts for **all Code-LLMs** and **most general-purpose LLMs** (exceptions: DeepSeek-LLM and QWEN1.5 on one abductive metric, GPT-3 on counterfactual).
- Average gain: +5.1% BLEU, +5.3% BERTScore in zero-shot.
- Codex outperforms GPT-3 despite same base architecture — but this gap is *smaller* after instruction tuning for GPT-3 (alignment tax).
- **Alignment tax**: GPT-3's instruction fine-tuning may weaken the code-derived causal reasoning ability present in Codex.

### Code-LLM vs General-Purpose LLM (RQ1)

Paired comparisons confirm Code-LLMs are better causal reasoners:
- CodeLLaMA and Codex outperform LLaMA-2 and GPT-3 on both tasks in **both prompt formats** (~14% BLEU average gain).
- CodeQWEN1.5 is inferior to QWEN1.5 on *abductive* reasoning but much better on *counterfactual* reasoning — CodeQWEN1.5 handles the more complex branching structure better.

### Format Perturbations (Table 4)

Adding syntactically valid code elements to prompts improves performance:
- Adding `return` statement: improves counterfactual consistently; mixed on abductive.
- Adding `pass` statement: similar pattern.
- Making prompts syntactically valid Python generally helps, especially for counterfactual (+~5% BERTScore for CodeLLaMA with `return`).

### One-Shot Results (Table 5)

All models improve in the one-shot setting vs. zero-shot. Code-LLMs still outperform general-purpose LLMs. Code prompts remain better than text prompts for most models. The advantage is robust across settings.

### Human Evaluation (Table 6)

Pairwise comparison on 100 test examples (3 PhD annotators, inter-rater 0.63):

| Comparison | Code wins | Tie | Text wins |
|-----------|-----------|-----|-----------|
| Codex code vs GPT-3 text (abductive, coherence) | 40% | 38% | 22% |
| Codex code vs GPT-3 text (counterfactual, preservation) | 47.5% | 39.5% | 13% |
| Mixtral code vs Mixtral text (abductive, coherence) | 31.5% | 47.5% | 21% |
| Mixtral code vs Mixtral text (counterfactual, preservation) | 51% | 38.5% | 10.5% |

Code prompts help models generate outputs more coherent with context and better at preserving original endings under counterfactual conditions.

## Connections

- The alignment tax finding connects to broader debates about [[LLM Expert Elicitation for Bayesian Networks]] — instruction fine-tuning can suppress reasoning capabilities present in base models.
- Results on branching counterfactual tasks relate to [[Potential Outcomes Framework]] — the `if`/`elif` structure models mutually exclusive treatment arms.

## See Also
- [[Code Prompts for Causal Structure]] — the prompt methodology being evaluated
- [[Code Prompt Aspects Analysis]] — decomposing which aspects drive the gains
- [[Fine-tuning on Conditional Statements]] — improving causal reasoning through training
