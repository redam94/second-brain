---
title: "Index: Agent-Based Modeling"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-04-10
---

# Agent-Based Modeling

> [!abstract] Routing Summary
> This topic covers agent-based modeling theory, consumer behavior models, social dynamics, calibration/validation methods, and applications. Contains 5 sub-topics and 29 total concept notes derived from 3 papers.
> - For ABM theory (definitions, emergence, heterogeneity, decision rules) -> [[Foundations/_Index|Foundations]]
> - For consumer ABM models (Karakaya utility model, CUBES behavioral model) -> [[Consumer Behavior/_Index|Consumer Behavior]]
> - For social interaction mechanisms (WOM, networks, diffusion, market dynamics) -> [[Social Dynamics/_Index|Social Dynamics]]
> - For calibration and validation (GA calibration, experimental design, validation) -> [[Calibration and Validation/_Index|Calibration and Validation]]
> - For ABM application domains (marketing, flows, finance, organizations, risk) -> [[Applications/_Index|Applications]]

## Sub-topics
- [[Foundations/_Index|Foundations]] — COVERS: ABM methodology and principles, emergent phenomena, heterogeneity, ABM vs equation-based modeling, agent decision rules and bounded rationality
- [[Consumer Behavior/_Index|Consumer Behavior]] — COVERS: Karakaya 4-component utility model, logit purchase decisions, CUBES behavioral attitudes (mistrust, opportunism, conditioning, innovativeness, imitation), behavioral primitives with threshold activation
- [[Social Dynamics/_Index|Social Dynamics]] — COVERS: WOM mechanisms (positive/negative), opinion leaders (exogenous vs emergent), social network formation, product adoption/diffusion models, network topology effects, market share equilibrium and lock-in
- [[Calibration and Validation/_Index|Calibration and Validation]] — COVERS: ABM calibration overview, GA calibration with chromosome encoding, Result-Analysis Module fitness evaluation, experimental design with parameter sensitivity, validation challenges and plausibility standard
- [[Applications/_Index|Applications]] — COVERS: marketing strategy (4Ps under WOM), flow simulation (evacuation, traffic), financial market simulation, organizational simulation, operational risk modeling

## Key Concept Dependencies

```
ABM Methodology -> Emergent Phenomena -> ABM vs Equations
       |                    |
       v                    v
Heterogeneity        Decision Rules
       |                    |
       v                    v
Consumer Models      Social Dynamics
       |                    |
       v                    v
Calibration <------> Validation
       |
       v
  Applications
```

## Source Papers

| Paper | Authors | Year | Focus | Notes Produced |
|-------|---------|------|-------|---------------|
| [[raw/abm_word_of_mouth.pdf]] | Bonabeau | 2002 | ABM methodology, applications, adoption model | Foundations + Applications + Social Dynamics |
| [[raw/abm_consumer.pdf]] | Karakaya, Badur & Aytekin | 2011 | Marketing strategies with WOM | Consumer Behavior (Karakaya) + Social Dynamics |
| [[raw/abm_human_behaviour.pdf]] | Ben Said, Bouron & Drogoul | 2002 | CUBES consumer behavior simulator | Consumer Behavior (CUBES) + Calibration |

## Recent Ingestion Log

| Date | Files | Notes Created | Notes Updated |
|------|-------|---------------|---------------|
| 2026-04-10 | 3 PDFs (abm_consumer, abm_human_behaviour, abm_word_of_mouth) | 29 concept notes, 16 index files | — |
