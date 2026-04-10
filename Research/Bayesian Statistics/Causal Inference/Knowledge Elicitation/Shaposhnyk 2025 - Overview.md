---
title: "Shaposhnyk 2025 - Overview"
tags:
  - source/ingested
  - topic/causal-inference
  - topic/knowledge-elicitation
  - topic/bayesian-networks
  - topic/llm
  - type/overview
  - doc/paper
source: "[[raw/Shaposhnyk et al. - 2025 - Can LLMs Assist Expert Elicitation for Probabilistic Causal Modeling.pdf]]"
source_location: "pp. 1-10"
date_ingested: 2026-04-10
folder: "Bayesian Statistics/Causal Inference/Knowledge Elicitation"
doc_type: paper
depends_on: []
used_by:
  - "[[LLM Expert Elicitation for Bayesian Networks]]"
  - "[[BN Construction Methods Comparison]]"
  - "[[Entropy-Based BN Evaluation]]"
  - "[[LLM-BN Decision Support Application]]"
aliases:
  - Shaposhnyk 2025
  - Can LLMs assist expert elicitation
---

# Shaposhnyk 2025 - Overview

> [!summary]
> Shaposhnyk, Zahorska & Yanushkevich (2025) investigate whether LLMs (GPT-4o + Claude) can replace or augment human expert elicitation for constructing Bayesian networks. On the *Sleep Health and Lifestyle* dataset, LLM-generated BNs achieve lower entropy (more structured, less uncertain) than both BIC-based statistical methods and human expert-constructed BNs, and exhibit fewer logical inconsistencies.

## Research Question and Contribution

**Problem:** Constructing probabilistic causal graph models (Bayesian networks) typically requires time-consuming human expert elicitation. Statistical/data-driven methods (BIC, PC algorithm, MIIC) can automate structure learning but lack domain knowledge and produce logically inconsistent relationships.

**Contribution:**
1. A **dual-LLM expert elicitation framework**: one LLM (GPT-4o) proposes causal relationships; a second LLM (Claude) verifies and identifies confounders/inconsistencies
2. Comparison of three BN construction strategies: human expert, information criteria (BIC/MIIC), and LLM
3. Entropy-based evaluation showing LLM-BNs are more structured and consistent
4. Case study demonstrating LLM-BN for health decision support

**Published:** arXiv:2504.10397v1 [cs.AI], 14 April 2025

## Paper Structure

| Section | Content |
|---------|---------|
| §1 Introduction | Motivation; LLM as expert elicitation proxy |
| §2 Related Work | BN learning methods; LLM-based causal discovery |
| §3 Problem Formulation | Research question; contributions |
| §4 Methodology | Data selection, BN construction, expert elicitation via LLM |
| §5 Causal Modeling | Three BN structures compared (human, BIC, LLM); SEM validation; entropy |
| §6 BN for Decision Support | CPT construction; case studies on sleep/stress |
| §7 Conclusion | Summary; limitations (hallucination, small dataset) |

## Key Results

- **LLM-BNs**: Lowest mean entropy (1.42), lowest min entropy (0.89) — most structured
- **BIC-BNs**: Mean entropy 1.48 — more uncertain, more logical inconsistencies (e.g., reversed causal directions)
- **Human expert BNs**: Mean entropy 1.48, median slightly lower (1.21) — suggesting expert networks are more structured in some nodes but not uniformly
- 10 out of 12 LLM-proposed relationships confirmed by second LLM, providing high confidence in the deduced structure
- SEM validation: all LLM-BN relationships statistically significant except Physical_Activity → Quality_of_Sleep

## Limitations

- Dataset is small (400 rows × 13 columns) — some relationships may not be well-represented
- LLMs prone to hallucination; mitigated by dual-LLM cross-checking
- Bidirectional dependencies (Sleep Duration ↔ Stress Level, Heart Rate ↔ Stress Level) require manual direction resolution
- Contextual constraints, hallucinated dependencies, and training data biases may affect LLM-generated structures

## See Also

- [[LLM Expert Elicitation for Bayesian Networks]] — dual-LLM methodology
- [[BN Construction Methods Comparison]] — human vs BIC vs LLM comparison
- [[Entropy-Based BN Evaluation]] — entropy metric
- [[LLM-BN Decision Support Application]] — health decision support case study
- [[Yamashita 2020 - Overview]] — complementary approach: interactive human elicitation
