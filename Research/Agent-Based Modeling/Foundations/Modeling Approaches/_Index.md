---
title: "Index: Modeling Approaches"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Foundations]]"
date_updated: 2026-04-10
concept_count: 2
doc_type: index
folder: "Research/Agent-Based Modeling/Foundations/Modeling Approaches"
source: ""
date_ingested: "N/A"
depends_on: []
used_by: []
source_location: "N/A"
---

# Modeling Approaches

> [!abstract] Routing Summary
> This folder covers how ABM compares to other modeling paradigms and how agent decision-making is formalized. Contains 2 notes.
> - Need ABM vs differential equations comparison? -> [[ABM vs Equation-Based Modeling]]
> - Need to understand how agents make decisions? -> [[Agent Decision Rules and Bounded Rationality]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| ABM vs equations | [[ABM vs Equation-Based Modeling]] | concept | [[ABM Methodology and Principles]], [[Emergent Phenomena in ABM]] | ABM and DEs diverge when network topology matters |
| Decision rules | [[Agent Decision Rules and Bounded Rationality]] | concept | [[ABM Methodology and Principles]] | Three architectures: threshold, utility+logit, probability |

## Notes

- [[ABM vs Equation-Based Modeling]] — CONTAINS: product adoption value function $V(\rho)$, system dynamics formulation, mean-field vs local information, topology divergence result, comparison table
- [[Agent Decision Rules and Bounded Rationality]] — CONTAINS: threshold-based rules (CUBES), utility+logit rules (Karakaya), probability rules (Bonabeau), bounded rationality features comparison, role of stochasticity

## Sources
- [[raw/abm_word_of_mouth.pdf]] — Formal ABM vs DE comparison (Bonabeau 2002)
- [[raw/abm_consumer.pdf]] — Logit decision model (Karakaya et al. 2011)
- [[raw/abm_human_behaviour.pdf]] — Threshold decision model (Ben Said et al. 2002)

## See Also
- [[../Core Concepts/_Index|Core Concepts]] — foundational definitions these approaches build on
