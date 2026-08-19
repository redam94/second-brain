---
title: "Index: Networks and Diffusion"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Social Dynamics]]"
date_updated: 2026-04-10
concept_count: 3
doc_type: index
---

# Networks and Diffusion

> [!abstract] Routing Summary
> This folder covers social network formation and product adoption/diffusion dynamics. Contains 3 notes.
> - Need how consumer networks are formed? -> [[Social Network Formation in Consumer Markets]]
> - Need the product adoption value function and S-curve model? -> [[Product Adoption and Diffusion Models]]
> - Need how network topology changes diffusion patterns? -> [[Network Topology Effects on Diffusion]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Network formation | [[Social Network Formation in Consumer Markets]] | concept | [[Heterogeneity in Agent Models]] | Preference similarity drives connections (homophily) |
| Adoption model | [[Product Adoption and Diffusion Models]] | concept | [[ABM vs Equation-Based Modeling]] | $V(\rho) = \frac{(1+\theta^d)\rho^d}{\rho^d + \theta^d}$ drives S-curve adoption |
| Topology effects | [[Network Topology Effects on Diffusion]] | concept | [[Product Adoption and Diffusion Models]] | Clustered networks produce two-wave adoption invisible to DEs |

## Notes

- [[Social Network Formation in Consumer Markets]] — CONTAINS: preference-distance network (Karakaya), spatial perception fields (CUBES), random vs clustered topologies (Bonabeau), network property effects table
- [[Product Adoption and Diffusion Models]] — CONTAINS: value function $V(\rho)$, adoption S-curve, agent-level transition rule, Rogers diffusion categories
- [[Network Topology Effects on Diffusion]] — CONTAINS: random vs clustered experiment, two-wave adoption pattern, bridging ties as bottleneck, when to use ABM vs equations criterion

## Sources
- [[raw/abm_word_of_mouth.pdf]] — Adoption model and topology experiments
- [[raw/abm_consumer.pdf]] — Preference-based network formation
- [[raw/abm_human_behaviour.pdf]] — Spatial perception fields

## See Also
- [[../Word of Mouth/_Index|Word of Mouth]] — what propagates through these networks
- [[../Market Dynamics/_Index|Market Dynamics]] — market-level outcomes of diffusion
