---
title: "Index: Knowledge Elicitation for Causal Models"
tags:
  - type/index
  - source/ingested
parent: "[[../Causal Inference/_Index|Bayesian Causal Inference]]"
date_updated: 2026-04-10
concept_count: 15
doc_type: index
---

# Knowledge Elicitation for Causal Models

> [!abstract] Routing Summary
> This folder covers methods for eliciting and constructing causal knowledge from human experts or LLMs, plus LLM causal reasoning methods. Contains 15 notes from four papers (Yamashita 2020, Shaposhnyk 2025, Liu 2025).
> - Need the interactive GUI-based workshop method for disaster scenarios? → [[Yamashita 2020 - Overview]]
> - Need the three-element causal model (cause, precondition, effect)? → [[Causal Model - Cause Precondition Effect]]
> - Need NLP methods for extracting causal relations from text? → [[NLP Causal Extraction Methods]]
> - Need LLM-based expert elicitation for Bayesian networks? → [[LLM Expert Elicitation for Bayesian Networks]]
> - Need comparison of LLM vs BIC vs human expert BN construction? → [[BN Construction Methods Comparison]]
> - Need entropy as a BN quality metric? → [[Entropy-Based BN Evaluation]]
> - Need a worked BN decision support application? → [[LLM-BN Decision Support Application]]
> - Need code prompts to improve LLM causal reasoning (abductive/counterfactual)? → [[Liu 2025 - Overview]]
> - Need task definitions for abductive NLG and counterfactual reasoning? → [[LLM Causal Reasoning Tasks]]
> - Need how `if`/`elif` encodes causal graph structure as code? → [[Code Prompts for Causal Structure]]
> - Need evaluation results comparing code vs text prompts across LLMs? → [[Code vs Text Prompt Evaluation]]
> - Need which aspects of code prompts matter most? → [[Code Prompt Aspects Analysis]]
> - Need fine-tuning on conditional statement corpus? → [[Fine-tuning on Conditional Statements]]

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
| Abductive NLG + Counterfactual reasoning tasks | [[LLM Causal Reasoning Tasks]] | definition | [[Liu 2025 - Overview]] | αNLG: max $P(H\|O_P, O_E)$; TimeTravel: min-edit ending under counterfactual |
| Code prompt causal structure encoding | [[Code Prompts for Causal Structure]] | concept | [[LLM Causal Reasoning Tasks]] | `if hypothesis(): ending()` encodes causal DAG edge $H \to E$ |
| Code vs text prompt evaluation | [[Code vs Text Prompt Evaluation]] | example | [[Code Prompts for Causal Structure]] | Code prompts +5.1% BLEU, +5.3% BERTScore; Code-LLMs +14% BLEU avg over paired general-purpose |
| Code prompt aspects (information/structure/format/language) | [[Code Prompt Aspects Analysis]] | concept | [[Code vs Text Prompt Evaluation]] | Conditional structure is critical: removing it causes ~10% BLEU / ~6% BERTScore drop |
| Fine-tuning on conditional statement corpus | [[Fine-tuning on Conditional Statements]] | concept | [[Code Prompt Aspects Analysis]] | 4,085 CodeAlpaca instances; gains transfer to text prompts; largest gain in first 20% of data |

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
- [[Liu 2025 - Overview]] — CONTAINS: 4 research questions; key contributions (code prompts, Code-LLM advantage, structural analysis, fine-tuning); experimental setup overview; results summary table
- [[LLM Causal Reasoning Tasks]] — CONTAINS: αNLG task definition (abductive, maximize $P(H|O_P,O_E)$); TimeTravel task definition (counterfactual, minimize edit); causal DAG mapping; evaluation metrics
- [[Code Prompts for Causal Structure]] — CONTAINS: 4 code properties for causality; abductive code template; counterfactual `if`/`elif` template; code-to-DAG mapping table; comparison to text prompts
- [[Code vs Text Prompt Evaluation]] — CONTAINS: Tables 2–6; zero-shot + one-shot results; format perturbation results; human evaluation (Table 6); alignment tax discussion
- [[Code Prompt Aspects Analysis]] — CONTAINS: 4 intervention dimensions (information/structure/format/language); Table 8 full results; key finding that conditional structure is critical
- [[Fine-tuning on Conditional Statements]] — CONTAINS: CodeAlpaca-20k filtering procedure; training setup; Table 10 gains; data fraction analysis (Fig. 5); conditional vs uniform baseline comparison

## Sources

- [[raw/Yamashita et al. - 2020 - Interactive Method to Elicit Local Causal Knowledge for Creating a Huge Causal Network.pdf]] — Yamashita, Kanno & Furuta. HCII 2020. Interactive causal knowledge elicitation for disaster scenarios.
- [[raw/Shaposhnyk et al. - 2025 - Can LLMs Assist Expert Elicitation for Probabilistic Causal Modeling.pdf]] — Shaposhnyk, Zahorska & Yanushkevich. arXiv 2025. LLM-based BN expert elicitation.
- [[raw/Liu et al. - 2025 - Eliciting and Improving the Causal Reasoning Abilities of Large Language Models with Conditional Sta.pdf]] — Liu, Yin, Zhang, Zhao & Feng. Computational Linguistics Vol. 51 No. 2 (2025). Code prompts and conditional statements for LLM causal reasoning (abductive + counterfactual tasks).

## Cross-Cutting Theme

These papers address two related challenges around LLMs and causal knowledge:
- Yamashita: human-in-the-loop with NLP assistance (semi-automated structure elicitation)
- Shaposhnyk: fully automated via LLMs acting as domain experts (BN construction)
- Liu: using code prompts with conditional statements to *elicit* and *improve* LLMs' own causal reasoning abilities (abductive + counterfactual)

A unifying thread: **conditional structure** (whether in a Bayesian network or a code `if` statement) is the fundamental representation of causal knowledge, and LLMs can both elicit it and reason with it.

## See Also

- [[Causal Estimands]] — what causal quantities these networks are meant to represent
- [[Bayesian Outcome Models]] — Bayesian inference once a causal structure is established
- [[General Structure of Bayesian CI]] — formal Bayesian treatment of causal inference
- [[Summary Causal DAGs]] — for reducing high-dimensional causal graphs to manageable summaries
