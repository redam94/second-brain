---
title: "Index: Knowledge Elicitation for Causal Models"
tags:
  - type/index
  - source/ingested
parent: "[[../Causal Inference/_Index|Bayesian Causal Inference]]"
date_updated: 2026-04-10
concept_count: 9
---

# Knowledge Elicitation for Causal Models

> [!abstract] Routing Summary
> This folder covers methods for eliciting and constructing causal knowledge from human experts or LLMs. Contains 9 notes from two papers (Yamashita 2020 and Shaposhnyk 2025).
> - Need the interactive GUI-based workshop method for disaster scenarios? → [[Yamashita 2020 - Overview]]
> - Need the three-element causal model (cause, precondition, effect)? → [[Causal Model - Cause Precondition Effect]]
> - Need NLP methods for extracting causal relations from text? → [[NLP Causal Extraction Methods]]
> - Need LLM-based expert elicitation for Bayesian networks? → [[LLM Expert Elicitation for Bayesian Networks]]
> - Need comparison of LLM vs BIC vs human expert BN construction? → [[BN Construction Methods Comparison]]
> - Need entropy as a BN quality metric? → [[Entropy-Based BN Evaluation]]
> - Need a worked BN decision support application? → [[LLM-BN Decision Support Application]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Cause-precondition-effect model | [[Causal Model - Cause Precondition Effect]] | definition | — | Enables indirect causality via preconditions; maps 4 FRAM aspects to precondition |
| Interactive workshop method | [[Interactive Knowledge Elicitation Method]] | concept | [[Causal Model - Cause Precondition Effect]] | 20 events, 15 preconditions elicited from 2 participants |
| NLP causal extraction | [[NLP Causal Extraction Methods]] | concept | [[Causal Model - Cause Precondition Effect]] | Method A: 46/100; Method B: 63/100; combined: 87/100 |
| Dual-LLM elicitation | [[LLM Expert Elicitation for Bayesian Networks]] | concept | [[BN Construction Methods Comparison]] | 10/12 LLM relationships confirmed; lower entropy than BIC |
| BN construction methods | [[BN Construction Methods Comparison]] | concept | — | LLM-BN: mean entropy 1.42 vs BIC 1.48 vs Expert 1.48 |
| BN entropy evaluation | [[Entropy-Based BN Evaluation]] | definition | [[BN Construction Methods Comparison]] | $H(X_i) = -\sum P(x_i)\log P(x_i)$; lower = more structured |
| BN decision support | [[LLM-BN Decision Support Application]] | example | [[LLM Expert Elicitation for Bayesian Networks]] | P(High stress \| poor sleep, nurse) = 41.56% |

## Notes

- [[Yamashita 2020 - Overview]] — CONTAINS: paper overview, 10-page HCII 2020 conference paper; NLP+GUI knowledge elicitation for disaster scenarios
- [[Causal Model - Cause Precondition Effect]] — CONTAINS: definitions of cause, precondition, effect; comparison to FRAM; countermeasure elicitation strategy; worked example (blackout/medical equipment)
- [[Interactive Knowledge Elicitation Method]] — CONTAINS: 4-phase workshop procedure; GUI design; preliminary experiment results (20 events, 15 preconditions)
- [[NLP Causal Extraction Methods]] — CONTAINS: Method A (clue expressions, 5 sentence patterns); Method B (sentence decomposition); Word2Vec deduplication; verification results (46/63/87)
- [[Shaposhnyk 2025 - Overview]] — CONTAINS: paper overview, arXiv 2025; LLM as proxy expert for BN construction
- [[LLM Expert Elicitation for Bayesian Networks]] — CONTAINS: dual-LLM architecture (GPT-4o + Claude); prompt templates; identified confounders; SEM-validated BN III structure
- [[BN Construction Methods Comparison]] — CONTAINS: BN I (human expert), BN II (BIC/MIIC), BN III (LLM) structures; SEM validation results; entropy comparison table
- [[Entropy-Based BN Evaluation]] — CONTAINS: Shannon entropy definition for BN nodes; full descriptive statistics table (LLM/BIC/Expert); interpretation
- [[LLM-BN Decision Support Application]] — CONTAINS: CPT construction; Bayes formula inference; worked nurse/doctor stress examples

## Sources

- [[raw/Yamashita et al. - 2020 - Interactive Method to Elicit Local Causal Knowledge for Creating a Huge Causal Network.pdf]] — Yamashita, Kanno & Furuta. HCII 2020. Interactive causal knowledge elicitation for disaster scenarios.
- [[raw/Shaposhnyk et al. - 2025 - Can LLMs Assist Expert Elicitation for Probabilistic Causal Modeling.pdf]] — Shaposhnyk, Zahorska & Yanushkevich. arXiv 2025. LLM-based BN expert elicitation.

## Cross-Cutting Theme

Both papers address the same fundamental challenge — **how to obtain causal structure when formal domain expertise is unavailable** — using complementary approaches:
- Yamashita: human-in-the-loop with NLP assistance (semi-automated)
- Shaposhnyk: fully automated via LLMs acting as domain experts

## See Also

- [[Causal Estimands]] — what causal quantities these networks are meant to represent
- [[Bayesian Outcome Models]] — Bayesian inference once a causal structure is established
- [[General Structure of Bayesian CI]] — formal Bayesian treatment of causal inference
