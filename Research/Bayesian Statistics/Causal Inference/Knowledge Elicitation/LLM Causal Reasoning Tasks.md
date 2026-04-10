---
title: "LLM Causal Reasoning Tasks: Abductive NLG and Counterfactual Reasoning"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/large-language-models
  - type/concept
  - doc/paper
source: "[[raw/Liu et al. - 2025 - Eliciting and Improving the Causal Reasoning Abilities of Large Language Models with Conditional Sta.pdf]]"
source_location: "§3, pp. 473–474"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on:
  - "[[Liu 2025 - Overview]]"
used_by:
  - "[[Code Prompts for Causal Structure]]"
  - "[[Code vs Text Prompt Evaluation]]"
aliases:
  - αNLG task
  - TimeTravel task
  - abductive NLG
  - counterfactual reasoning task
---

# LLM Causal Reasoning Tasks: Abductive NLG and Counterfactual Reasoning

> [!summary]
> Liu et al. study two unsupervised causal reasoning tasks — Abductive NLG (generate a plausible connecting hypothesis given premise and ending) and Counterfactual Reasoning (minimally edit an ending to accommodate a counterfactual event). Both are zero-shot generation problems where models must exploit internal causal structure without task-specific training. The causal relationships in both tasks form DAGs that `if`/`elif` code statements can represent directly.

## Overview

The paper treats both tasks as **unsupervised zero-shot learning**: models receive only a task description and must generate outputs using pre-trained knowledge, without labeled causal examples. This tests the causal reasoning capabilities already present in (or elicitable from) the model.

## Main Content

### 3.1 Abductive Reasoning Task

> [!definition] Abductive Reasoning (αNLG formulation)
> Given a **premise** $O_P$ and an **ending** $O_E$ (observable states), generate a plausible **hypothesis** $H$ that explains how the premise could lead to the ending.
>
> Formally, models must maximize $P(H \mid O_P, O_E)$.
>
> The chronological ordering is $O_P \rightarrow H \rightarrow O_E$: premise happens first, hypothesis connects it to the ending. The task is **non-monotonic** — the ending $O_E$ constrains the hypothesis $H$ even though it occurs after $H$ in time.
^def-abductive-nlg

**Key challenge**: Non-monotonic reasoning — the model must consider not just the premise $O_P$ but also the *future* context $O_E$ when generating $H$. Simple left-to-right prediction fails because the ending must be consistent with the hypothesis.

**Dataset — αNLG**:
- 3,561 test instances from ROCStories (5-sentence crowd-sourced stories)
- Premise = first sentence; Ending = last sentence
- 4.02 plausible hypotheses annotated per instance (crowd-sourced)

### 3.2 Counterfactual Reasoning Task

> [!definition] Counterfactual Reasoning (TimeTravel formulation)
> Given a story with premise $P$, initial context $C$, original ending $E$, and a **counterfactual event** $C'$ (which contradicts $C$), generate a new ending $E'$ that:
> 1. Maximally preserves $E$ (minimal edits)
> 2. Is coherent with the counterfactual context $C'$
>
> Formally, maximize $f(E' \mid P, C, E, C') = P(E' \mid P, C') + \lambda \cdot \text{sim}(E', E)$, where $\lambda$ balances similarity against counterfactual coherence.
^def-counterfactual-reasoning

**Key challenge**: The model must both (a) understand the causal relationships driving the narrative and (b) surgically edit $E$ to accommodate $C'$ while preserving unaffected parts. This requires distinguishing core causal chains from spurious correlations.

**Dataset — TimeTravel**:
- 1,871 test instances, also from ROCStories
- 4-part input: premise $P$, initial context $C$, original ending $E$ (3 sentences), counterfactual event $C'$
- 3 annotated counterfactual endings $E'$ per instance

### Causal Structure in Both Tasks

Both tasks share a common causal DAG structure:

```
Abductive:       O_P → H → O_E

Counterfactual:  P → C → E
                     ↓
                     C' → E'
```

This branching structure (alternative paths from premise) maps directly to `if`/`elif` conditional statements in code — which is the core insight exploited in [[Code Prompts for Causal Structure]].

## Evaluation Metrics

| Task | Metrics |
|------|---------|
| Abductive | BLEU₄, ROUGE_L, CIDEr, BERTScore |
| Counterfactual | BLEU₄, ROUGE_L, BERTScore |

CIDEr is used for abductive reasoning because it amplifies rare/unique words, measuring whether the hypothesis captures specific causal details. BERTScore captures semantic similarity; BLEU/ROUGE capture lexical overlap.

## Connections

- The counterfactual task connects to [[Potential Outcomes Framework]] — $E$ vs. $E'$ are analogous to potential outcomes $Y(0)$ vs. $Y(1)$ under interventions $C$ vs. $C'$.
- The non-monotonic nature of abductive reasoning resembles the backward-induction problem in [[Causal Estimands]] — estimating causes from effects.
- Both tasks' causal graphs can be represented as DAGs — see [[Directed Acyclic Graphs]] and [[Summary Causal DAGs]] for formal treatment.

## See Also
- [[Code Prompts for Causal Structure]] — how these task structures are encoded in code
- [[Liu 2025 - Overview]] — paper overview and results
