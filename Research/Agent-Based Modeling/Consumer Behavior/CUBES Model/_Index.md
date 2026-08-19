---
title: "Index: CUBES Model"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Consumer Behavior]]"
date_updated: 2026-04-10
concept_count: 5
doc_type: index
---

# CUBES Model

> [!abstract] Routing Summary
> This folder covers the CUBES (CUstomer BEhavior Simulator) from Ben Said et al. (2002), a psychology-driven multi-agent consumer behavior model. Contains 5 notes.
> - Need the paper overview and key results? -> [[Ben Said et al 2002 - Overview]]
> - Need the system architecture? -> [[CUBES Simulator Architecture]]
> - Need the five behavioral attitudes? -> [[Behavioral Attitudes in CUBES]]
> - Need the threshold activation mechanism? -> [[Behavioral Primitives and Thresholds]]
> - Need the social learning processes? -> [[Imitation and Conditioning Processes]]

## Concept Map

| Concept | Note | Type | Depends On | Key Result |
|---------|------|------|-----------|------------|
| Paper overview | [[Ben Said et al 2002 - Overview]] | overview | [[ABM Methodology and Principles]] | GA-calibrated model reproduces real market dynamics |
| System architecture | [[CUBES Simulator Architecture]] | concept | [[ABM Methodology and Principles]] | Two-layer architecture: social dynamics + reactive modulators |
| Behavioral attitudes | [[Behavioral Attitudes in CUBES]] | concept | [[CUBES Simulator Architecture]] | Five attitudes: mistrust, opportunism, conditioning, innovativeness, imitation |
| Behavioral primitives | [[Behavioral Primitives and Thresholds]] | concept | [[Behavioral Attitudes in CUBES]] | Three-threshold activation mechanism for stimulus response |
| Social processes | [[Imitation and Conditioning Processes]] | concept | [[Behavioral Attitudes in CUBES]] | Imitation + conditioning drive attitude evolution |

## Notes

- [[Ben Said et al 2002 - Overview]] — CONTAINS: research question, two key originalities, model architecture summary, key results (lock-in, cyclic competition, attitude convergence)
- [[CUBES Simulator Architecture]] — CONTAINS: Swarm engine, brand agents, consumer agents, simulation flow, perception field, population scale
- [[Behavioral Attitudes in CUBES]] — CONTAINS: five BA definitions, social dynamics vs reactive modulators taxonomy, attitude intensity evolution, age-dependent convergence
- [[Behavioral Primitives and Thresholds]] — CONTAINS: BP definition, state diagram (4 states), threshold personalization, stimulus properties, perception and involvement
- [[Imitation and Conditioning Processes]] — CONTAINS: imitation process (spatial gradient, perception field), conditioning process (reinforcement), process interaction table, information cascades

## Sources
- [[raw/abm_human_behaviour.pdf]] — Ben Said, Bouron & Drogoul (2002)

## See Also
- [[../Karakaya Model/_Index|Karakaya Model]] — alternative consumer behavior ABM
- [[Genetic Algorithm Calibration for ABM]] — how CUBES populations are calibrated
