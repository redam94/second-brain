---
title: "Code Prompt Aspects Analysis: What Makes Code Prompts Effective for Causal Reasoning"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/large-language-models
  - type/concept
  - doc/paper
source: "[[raw/Liu et al. - 2025 - Eliciting and Improving the Causal Reasoning Abilities of Large Language Models with Conditional Sta.pdf]]"
source_location: "§6, pp. 483–486"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on:
  - "[[Code Prompts for Causal Structure]]"
  - "[[Code vs Text Prompt Evaluation]]"
used_by:
  - "[[Fine-tuning on Conditional Statements]]"
aliases:
  - code prompt intervention study
  - what makes code prompts work
---

# Code Prompt Aspects Analysis: What Makes Code Prompts Effective for Causal Reasoning

> [!summary]
> Section 6 of Liu et al. runs a systematic intervention study on four aspects of code prompts — information, structure, format, and language — to isolate what drives performance gains. The finding: **programming structure (conditional statements) is the most critical factor**, causing a ~10% BLEU / ~6% BERTScore drop when removed. Information and format perturbations have smaller effects. Models are robust to language (Python vs. Java/C) and format (function vs. class vs. print), but extremely sensitive to the conditional control flow structure.

## Overview

After establishing that code prompts outperform text prompts (§5), Section 6 asks *why*. The analysis decomposes code prompts along four dimensions using controlled interventions on LLaMA-2 and Codex.

## Main Content

### Four Intervention Dimensions

> [!definition] Four Aspects of Code Prompts
>
> | Aspect | Perturbation | What It Tests |
> |--------|-------------|---------------|
> | **Information** | *No Instruction*: remove task description; *Function Name Perturbation*: replace `premise()`, `hypothesis()` with `functionA()`, `functionB()` | Whether task instructions and semantic function names contribute beyond the code structure |
> | **Structure** | *Sequential Structure*: convert `if hypothesis(): ending()` to `premise(); hypothesis(); ending()` (no conditional); *Disruption*: randomly swap function positions in `main()` | Whether the conditional control flow itself is the key element |
> | **Format** | *Class*: wrap functions in a class `__init__` method; *Print*: replace comment bodies with `print('...')` | Whether the syntactic format (function vs. class vs. print) matters |
> | **Language** | *Java*: translate Python to Java; *C*: translate Python to C (auto-translated by Codex) | Whether Python-specific patterns drive the gains vs. general code syntax |
^def-four-aspects

### 6.2 Intervention Results (Table 8)

**Abductive reasoning** (LLaMA-2 baseline: BLEU 6.1 / BERTScore 59.2; Codex baseline: 13.7 / 64.9):

| Aspect | Perturbation | LLaMA-2 BLEU | Codex BLEU | Key change |
|--------|-------------|-------------|-----------|-----------|
| Information | No Instruction | 6.2 | 12.1 | Small drop; task instruction matters modestly |
| Information | Function Name Perturb | 6.6 | 15.1 | Codex *improves* — function names may add noise |
| **Structure** | **Sequential** | **5.0** | **9.6** | **↓10% Codex BLEU — largest single drop** |
| **Structure** | **Disruption** | **4.9** | **7.9** | **↓42% Codex BLEU — catastrophic loss** |
| Format | Class | 5.6 | 16.0 | Codex improves slightly |
| Format | Print | 6.3 | 13.8 | Roughly similar |
| Language | Java | 6.6 | **16.5** | Codex best result — Java conditional syntax is effective |
| Language | C | 5.8 | 15.5 | Similar improvement |

**Counterfactual reasoning** (LLaMA-2 baseline: BLEU 33.8 / BERTScore 72.7; Codex baseline: 66.8 / 82.5):

| Aspect | Perturbation | LLaMA-2 BLEU | Codex BLEU |
|--------|-------------|-------------|-----------|
| Structure | Sequential | 21.8 | 43.4 | ↓35% Codex |
| Structure | Disruption | 3.9 | 16.0 | ↓76% Codex — near-total collapse |
| Format | Print | **38.5** | **73.3** | Codex improves |
| Language | Java | 41.9 | 71.1 | Near-equivalent |

### Key Findings

> [!theorem] Finding: Programming Structure is the Critical Factor
> Changing the conditional structure to a sequential structure causes an average performance drop of **~10% BLEU** and **~6% BERTScore** on abductive reasoning. The *Disruption* intervention (scrambling function positions by swapping 2 characters) causes drops of **~17% BLEU on average** — demonstrating extreme sensitivity to the conditional ordering.
>
> This establishes that it is not the code format, programming language, or task description that drives code prompt effectiveness — it is the **causal control flow encoded in `if`/`elif` statements**.
^finding-structure-critical

**Information**: Models do not heavily rely on task instructions. Even without function names, Codex can reason from conditional structure alone. LLaMA-2 suffers more from function name removal (weaker code understanding → relies on semantic names as clues).

**Format**: Models are relatively robust to format changes. Java and C conditional syntax achieves similar or better results than Python for Codex — suggesting the benefit is from conditional logic in *any* programming language, not Python-specific.

**Language**: Java/C code prompts achieve similar or better performance than Python for Codex. This rules out Python-specific training data as the explanation and points to conditional logic as the universal mechanism.

### Interpretation

The results paint a consistent picture:
- LLMs are highly sensitive to *structural* changes (conditional flow) but robust to *surface* changes (format, language, function names).
- This aligns with the hypothesis that code prompts work because they **encode causal structure explicitly** — the `if`/`elif` syntax represents conditional causation in a way that is both syntactically unambiguous and semantically meaningful to code-trained LLMs.
- General-purpose LLMs (LLaMA-2) benefit less because they are less trained on code and may rely more on semantic function names.

## Connections

- The finding that structure matters more than language connects to the [[Code Prompts for Causal Structure]] design — the DAG-to-code mapping works across languages.
- The sensitivity to *disruption* (swapping 2 characters) parallels the sensitivity of causal DAGs to edge additions/deletions shown in [[Summary Causal DAGs]] — small structural changes can change all downstream inferences.
- This informs [[Fine-tuning on Conditional Statements]] — training should focus on conditional statement patterns, not just general code.

## See Also
- [[Code Prompts for Causal Structure]] — the prompt methodology analyzed here
- [[Code vs Text Prompt Evaluation]] — overall evaluation results
- [[Fine-tuning on Conditional Statements]] — using this finding for training
