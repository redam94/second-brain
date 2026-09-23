---
title: "LLM Expert Elicitation for Bayesian Networks"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/knowledge-elicitation
  - topic/bayesian-networks
  - topic/large-language-models
  - type/concept
  - doc/paper
source: "[[raw/Shaposhnyk et al. - 2025 - Can LLMs Assist Expert Elicitation for Probabilistic Causal Modeling.pdf]]"
source_location: "§4.3, §5.3, pp. 4-8"
date_ingested: 2026-04-10
date_updated: 2026-06-29
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on:
  - "[[BN Construction Methods Comparison]]"
  - "[[LLM Causal Reasoning Tasks]]"
  - "[[Interactive Knowledge Elicitation Method]]"
  - "[[Directed Acyclic Graphs]]"
used_by:
  - "[[LLM-BN Decision Support Application]]"
  - "[[Q - When Can LLM Silicon Samples Replace Consumer Data in an ABM]]"
aliases:
  - dual-LLM elicitation
  - LLM causal structure discovery
---

# LLM Expert Elicitation for Bayesian Networks

> [!summary]
> The dual-LLM approach uses two LLMs sequentially: LLM-1 (GPT-4o) proposes causal relationships from domain knowledge, and LLM-2 (Claude) verifies those relationships, identifies confounders, and flags inconsistencies. This multi-expert AI elicitation produces Bayesian network structures with lower entropy and fewer logical inconsistencies than BIC-based or human expert methods.

## Overview

**Motivation:** Traditional expert elicitation is slow and subjective. Statistical structure learning (BIC, MIIC) lacks domain knowledge and produces causally inconsistent graphs. LLMs function as proxies for domain experts, combining broad training knowledge with the ability to reason about causal plausibility.

## Dual-LLM Architecture

```
Data → LLM-1 (GPT-4o): Find causal structure → LLM-2 (Claude): Evaluate relationships
                ↓                                          ↓
        Initial causal graph                  Verified/refined structure → BN III
```

**Step 1 — LLM-1 Causal Discovery Prompt (Table 2):**

The prompt instructs LLM-1 to act as a domain expert and:
- Interpret statistically suggested causal relationships from a domain knowledge perspective
- Assess plausibility in the context of the domain (e.g., sleep health)
- Provide reasoned explanations for why relationships are natural or unexpected

**Step 2 — LLM-2 Verification Prompt (Table 3):**

LLM-2 receives LLM-1's output and is instructed to:
- Assess the plausibility of each proposed relationship
- Identify confounding factors or alternative explanations
- Suggest corrections or additional relationships where appropriate

This two-step design creates a "dual-expert" system: cross-checking reduces hallucination and improves consistency.

## Key Implementation Choices

- **State-of-the-art prompt engineering** applied to improve output quality
- **Sequential application of multiple LLMs**: consistency verified across models; disagreements flagged as potential misinterpretations
- **SEM validation**: final relationships verified using structural equation modeling before inclusion in BN

## Confounders Identified by LLM-2

Variables not in the dataset but identified as likely confounders:
- Psychological well-being (depression may affect sleep duration, stress, and physical activity)
- Work schedule flexibility (affects both stress and sleep patterns)
- Socioeconomic status and income (influences stress and work conditions)

## Bidirectional Dependencies Resolved

LLM analysis identified several bidirectional relationships:
- Sleep Duration ↔ Stress Level
- Heart Rate ↔ Stress Level

Since BNs are DAGs (no cycles), logical reasoning was used to orient edges. Overall, 10 out of 12 LLM-proposed relationships were confirmed by LLM-2, giving high confidence.

## Resulting Causal Structure (BN III)

Key edges in LLM-derived BN (all SEM-significant except where noted):

| Parent → Child | Estimate | p-value |
|----------------|----------|---------|
| Daily_Steps → Stress_Level | 0.5585 | 0 |
| Sleep_Duration → Stress_Level | −0.7539 | 0 |
| Gender → Occupation | −1.3380 | 0.0001 |
| Occupation → Stress_Level | −0.0475 | 0.0008 |
| Stress_Level → Quality_of_Sleep | −0.2180 | 0.0001 |
| Physical_Activity → Quality_of_Sleep | 0.0137 | **0.5989** (not significant) |
| Sleep_Duration → Quality_of_Sleep | 0.5249 | 0 |

## Comparison to Human and BIC Methods

See [[BN Construction Methods Comparison]] for full three-way comparison.

## Connections

- Compare to [[NLP Causal Extraction Methods]] — earlier rule-based approach to automated causal extraction (Yamashita 2020)
- Builds on [[BN Construction Methods Comparison]] for evaluation context
- Applied in [[LLM-BN Decision Support Application]]
- BNs are DAGs — the graph structure produced is a [[Directed Acyclic Graphs|directed acyclic graph]]; d-separation and the back-door criterion apply to these structures
- Bidirectional dependency resolution (Sleep Duration ↔ Stress) uses the same reasoning as [[Canonical Causal DAGs]] (fork vs. pipe identification)
- SEM validation step connects to [[Confirmatory Factor Analysis and SEM]]
- Alternative prompting approach for causal structure: [[Code Prompts for Causal Structure]]

## See Also

- [[Shaposhnyk 2025 - Overview]] — paper context
- [[BN Construction Methods Comparison]] — methodology comparison
- [[Entropy-Based BN Evaluation]] — how BN quality is measured
- [[Directed Acyclic Graphs]] — the mathematical structure underlying all Bayesian networks
- [[Canonical Causal DAGs]] — fork/pipe/collider patterns relevant to edge orientation
- [[LLM Causal Reasoning Tasks]] — evaluation of LLM causal reasoning capabilities
- [[Code Prompts for Causal Structure]] — alternative code-based prompting strategy for BN elicitation
- [[Interactive Knowledge Elicitation Method]] — human-in-the-loop alternative to LLM elicitation
- [[NOTEARS - Overview]] — data-driven continuous-optimisation approach to DAG structure learning; contrasts with LLM-based expert elicitation
- [[DAG Structure Learning Problem]] — the structural challenge that both LLM elicitation and algorithmic discovery address
- [[In-Context Learning and Few-Shot Prompting]] — how the prompted LLMs work
- [[ReAct - Reasoning and Acting Agents]] — both follow a propose-then-verify loop
