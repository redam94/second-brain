---
title: "Liu 2025 - Overview: Eliciting and Improving Causal Reasoning in LLMs with Conditional Statements"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/large-language-models
  - type/overview
  - doc/paper
source: "[[raw/Liu et al. - 2025 - Eliciting and Improving the Causal Reasoning Abilities of Large Language Models with Conditional Sta.pdf]]"
source_location: "Full paper, pp. 467–494"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on:
  - "[[NLP Causal Extraction Methods]]"
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
used_by:
  - "[[LLM Causal Reasoning Tasks]]"
  - "[[Code Prompts for Causal Structure]]"
  - "[[Fine-tuning on Conditional Statements]]"
aliases:
  - Liu 2025
  - Magic-IF
---

# Liu 2025 — Eliciting and Improving Causal Reasoning in LLMs with Conditional Statements

> [!summary]
> Liu et al. (2025) demonstrate that code prompts using `if`/`elif` conditional statements significantly improve LLM causal reasoning on abductive and counterfactual tasks. Code-LLMs (CodeLLaMA, Codex) outperform same-architecture general-purpose LLMs, the programming *structure* (conditional statements) is the most critical factor, and fine-tuning on a conditional-statement code corpus boosts both code-prompted and text-prompted performance — showing transfer of causal reasoning ability beyond coding skill.

## Overview

Causal reasoning — the ability to identify cause-and-effect relationships, generate plausible hypotheses, and reason about counterfactual scenarios — is critical for human cognition and challenging for LLMs. Existing LLMs handle single cause-effect pairs but struggle with complex causal structures involving multiple events and alternative branches.

This paper exploits a key property of code: **conditional statements** like `if` explicitly represent causal relationships (condition → consequence). The authors ask:
1. Are Code-LLMs better causal reasoners than general-purpose LLMs? (**RQ1**)
2. Do code prompts better describe causal structure than text prompts? (**RQ2**)
3. What aspects of code prompts make them effective? (**RQ3**)
4. How can we improve causal reasoning with code data? (**RQ4**)

## Key Contributions

1. **Code prompt design** — Represent causal reasoning tasks as Python programs where events are functions and causal flow is expressed via `if`/`elif` structures. The `main()` function captures the causal DAG; event functions are defined below (target last, for autoregressive generation).

2. **Empirical finding** — Code-LLMs (CodeLLaMA, Codex) outperform paired general-purpose LLMs (LLaMA-2, GPT-3) on both abductive and counterfactual tasks across zero-shot and one-shot settings. Code prompts outperform text prompts for most models (+5.1% BLEU, +5.3% BERTScore average in zero-shot).

3. **Structural analysis** — Intervention experiments show programming *structure* (the conditional control flow) is the most influential factor: removing it causes ~10% BLEU drop. Information and format perturbations have smaller effects. Models are robust to format and language changes.

4. **Fine-tuning on conditional statements** — Filtering CodeAlpaca-20k for conditional-statement instances and fine-tuning 7B models yields consistent gains on causal reasoning, even when evaluated with text prompts — demonstrating genuine improvement in causal reasoning ability, not just code generation.

## Experimental Setup

- **Datasets**: αNLG (3,561 instances, abductive reasoning, from ROCStories); TimeTravel (1,871 instances, counterfactual reasoning, from ROCStories)
- **Models tested**: LLaMA-2 7B, QWEN1.5 7B, DeepSeek-LLM 7B, Mixtral 8×7B, Gemini, GPT-3; CodeLLaMA 7B, CodeQWEN1.5 7B, Codex
- **Evaluation metrics**: BLEU₄, ROUGE_L, CIDEr (abductive); BLEU₄, ROUGE_L, BERTScore (counterfactual)

## Main Results Summary

| Setting | Code prompt gain over text | Code-LLM gain over paired general-purpose LLM |
|---------|---------------------------|-----------------------------------------------|
| Zero-shot abductive | +CIDEr varies (largest: GPT-3 +19.6%) | +14% BLEU average (CodeLLaMA/Codex vs LLaMA-2/GPT-3) |
| Zero-shot counterfactual | +BLEU varies (largest: Codex +11.7%) | +14% BLEU average |
| One-shot | Consistent gains for most models | Code-LLMs still dominate |

## Connections

- Extends the LLM-causal-inference literature represented in [[NLP Causal Extraction Methods]] and [[LLM Expert Elicitation for Bayesian Networks]] — but focuses on *eliciting* existing LLM causal knowledge via prompt format rather than constructing new causal structures.
- The code-as-causal-graph representation connects to [[Directed Acyclic Graphs]] — functions map to nodes, `if` edges map to directed causal edges.
- The fine-tuning result (gains transfer to text prompts) suggests that conditional statement training improves internal causal representations, relevant to [[Causal Model - Cause Precondition Effect]].

## See Also
- [[LLM Causal Reasoning Tasks]] — formal task definitions (αNLG, TimeTravel)
- [[Code Prompts for Causal Structure]] — how `if` statements encode causal graphs
- [[Code vs Text Prompt Evaluation]] — full evaluation results (Tables 2–6)
- [[Code Prompt Aspects Analysis]] — Section 6 intervention study
- [[Fine-tuning on Conditional Statements]] — Section 7 fine-tuning results
