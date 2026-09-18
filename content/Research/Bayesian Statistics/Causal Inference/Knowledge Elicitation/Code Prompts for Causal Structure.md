---
title: "Code Prompts for Causal Structure: Encoding Causal Graphs with Conditional Statements"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/large-language-models
  - type/concept
  - doc/paper
source: "[[raw/Liu et al. - 2025 - Eliciting and Improving the Causal Reasoning Abilities of Large Language Models with Conditional Sta.pdf]]"
source_location: "§4, pp. 474–475"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on:
  - "[[LLM Causal Reasoning Tasks]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[Code vs Text Prompt Evaluation]]"
  - "[[Code Prompt Aspects Analysis]]"
aliases:
  - code prompt design
  - conditional statement prompting
  - Magic-IF prompting
---

# Code Prompts for Causal Structure: Encoding Causal Graphs with Conditional Statements

> [!summary]
> Liu et al. encode causal reasoning tasks as Python programs where events become functions and causal dependencies become `if`/`elif` conditional flows. The `main()` function acts as the causal DAG; the target event function is placed last to exploit autoregressive generation. Two prompt templates are defined — one for abductive reasoning (simple `if`) and one for counterfactual reasoning (`if`/`elif` branch). This design meets two requirements: (1) clearly represents causal relationships, and (2) positions the generation target at the end of the prompt.

## Overview

Code has four properties that make it suitable for representing causal structure:
1. **Structure and Logic** — `if` statements directly express conditional causation: *if* condition holds, *then* consequence follows.
2. **Modularity** — Functions decompose complex events into reusable units.
3. **Control Flow** — `if`/`elif`/`else` and loops handle branching (alternative causal paths) and repetition.
4. **Composition** — Functions can call other functions, enabling multi-step causal chains.

The key insight: **causal relations appear more often and more explicitly in code than in text**. Texts rarely state causal structure explicitly; code `if` statements do so by definition.

## Main Content

### Design Requirements

Two constraints guide the code prompt design:
1. The prompt must **clearly represent the causal relationships** between events.
2. For autoregressive LLMs, the **target output should appear at the end** of the prompt.

Requirement (2) is non-trivial: in abductive reasoning, the target *hypothesis* appears in the middle of the causal chain ($O_P \rightarrow H \rightarrow O_E$), not at the end. The solution: use function definitions — `main()` captures the causal flow, and function definitions follow, with the target function defined last.

### 4.1 Abductive Reasoning Code Prompt

> [!example] Abductive Code Prompt Template
> ```python
> # task: generate a plausible explanatory hypothesis given the
> #       premise and the ending. The hypothesis should be ≤ 20 words.
> def main():
>     premise()
>     if hypothesis():
>         ending()
>
> def premise():
>     # Scott loved his trumpet.
>
> def ending():
>     # Scott's dad bought him a new one for his birthday.
>
> def hypothesis():
>     #  ← MODEL GENERATES HERE
> ```
>
> **Causal encoding**: `if hypothesis(): ending()` explicitly states that the hypothesis causes the ending. `premise()` is called unconditionally — it is always true. The hypothesis function is defined **last**, so the model generates it autoregressively after seeing the full context.
^ex-abductive-prompt

### 4.2 Counterfactual Reasoning Code Prompt

> [!example] Counterfactual Code Prompt Template
> ```python
> # task: generate an ending with three sentences given the premise and
> #       the hypothesis. Each sentence should be ≤ 20 words.
> def main():
>     premise()
>     if hypothesis_1():
>         ending_1()
>     elif hypothesis_2():
>         ending_2()
>
> def premise():
>     # Janice was excited to bring cupcakes for her birthday.
>
> def hypothesis_1():
>     # She worked all day on making the perfect frosting.
>
> def hypothesis_2():
>     # She completely rushed making the frosting.
>
> def ending_1():
>     # Each cupcake was truly a work of art. ...
>
> def ending_2():
>     #  ← MODEL GENERATES HERE
> ```
>
> **Causal encoding**: The `if`/`elif` structure directly represents the branching causal graph — two mutually exclusive hypothesis branches (original context $C$ and counterfactual $C'$) lead to two endings ($E$ and $E'$). The target `ending_2()` is last. The original ending `ending_1()` is fully provided as context, enforcing the preservation constraint.
^ex-counterfactual-prompt

### Mapping to Causal DAGs

The code structure is a direct rendering of the causal DAG:

| DAG element | Code element |
|-------------|-------------|
| Node (event) | `def event_name():` function |
| Directed edge $A \to B$ | `if A(): B()` in `main()` |
| Alternative branch | `if ... elif ...` |
| Target node (to generate) | Last function defined |
| Premise (always true) | Called first, unconditionally |

This correspondence makes code prompts a **natural language for causal graphs** — unlike text, where causal structure must be inferred from surface descriptions.

### Comparison to Text Prompts

An equivalent text prompt for abductive reasoning looks like:
> "There is a causal relation from the hypothesis to the ending, and a possible causal relation from the premise to the ending. Generate a plausible hypothesis..."

The same causal information is present, but:
- The structural relationship is *described* rather than *encoded*
- The model must parse causal claims from language, not from program syntax
- The control flow (which event conditions which) is implicit, not explicit

Section 6 experiments (see [[Code Prompt Aspects Analysis]]) confirm that the conditional *structure* is the most critical element: removing it causes ~10% BLEU drop across models.

## Connections

- The `if hypothesis(): ending()` structure directly encodes a causal DAG edge $H \to E$ — formally equivalent to a directed edge in [[Directed Acyclic Graphs]].
- The `if`/`elif` branching corresponds to the fork/collider structures in Pearl's causal model — see [[Summary Causal DAGs]] for formal treatment.
- The "target function last" design is an instance of causal temporal ordering (causes before effects), analogous to topological ordering in DAGs.

## See Also
- [[LLM Causal Reasoning Tasks]] — the task definitions these prompts serve
- [[Code vs Text Prompt Evaluation]] — empirical comparison of these prompts vs. text
- [[Code Prompt Aspects Analysis]] — which aspects of the code prompt matter most
- [[Fine-tuning on Conditional Statements]] — using conditional statements in training data
- [[NLP Causal Extraction Methods]] — alternative text-based approaches to extracting causal structure; code prompts represent a structured alternative to the NLP extraction pipeline
- [[BN Construction Methods Comparison]] — situates code-prompt-based elicitation within the broader taxonomy of BN construction methods (manual, data-driven, hybrid)
- [[Chain-of-Thought Prompting]] — both structure the model's intermediate reasoning
