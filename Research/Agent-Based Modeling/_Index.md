---
title: "Index: Agent-Based Modeling"
tags:
  - type/index
  - source/ingested
parent: "[[../_Index|Research]]"
date_updated: 2026-04-11
doc_type: index
folder: "Research/Agent-Based Modeling"
source: ""
date_ingested: "N/A"
depends_on: []
used_by: []
source_location: "N/A"
---

# Agent-Based Modeling

> [!abstract] Routing Summary
> This topic covers agent-based modeling theory, consumer behavior models, social dynamics, calibration/validation methods, and applications. Contains 5 sub-topics and 34 total concept notes derived from 4 papers.
> - For ABM theory (definitions, emergence, heterogeneity, decision rules) -> [[Foundations/_Index|Foundations]]
> - For consumer ABM models (Karakaya utility model, CUBES behavioral model) -> [[Consumer Behavior/_Index|Consumer Behavior]]
> - For social interaction mechanisms (WOM, networks, diffusion, market dynamics) -> [[Social Dynamics/_Index|Social Dynamics]]
> - For calibration and validation (GA, HM+ABC, uncertainty quantification, case studies) -> [[Calibration and Validation/_Index|Calibration and Validation]]
> - For ABM application domains (marketing, flows, finance, organizations, risk) -> [[Applications/_Index|Applications]]

## Sub-topics
- [[Foundations/_Index|Foundations]] — COVERS: ABM methodology and principles, emergent phenomena, heterogeneity, ABM vs equation-based modeling, agent decision rules and bounded rationality
- [[Consumer Behavior/_Index|Consumer Behavior]] — COVERS: Karakaya 4-component utility model, logit purchase decisions, CUBES behavioral attitudes (mistrust, opportunism, conditioning, innovativeness, imitation), behavioral primitives with threshold activation
- [[Social Dynamics/_Index|Social Dynamics]] — COVERS: WOM mechanisms (positive/negative), opinion leaders (exogenous vs emergent), social network formation, product adoption/diffusion models, network topology effects, market share equilibrium and lock-in
- [[Calibration and Validation/_Index|Calibration and Validation]] — COVERS: ABM calibration overview (3 approaches), GA calibration (chromosome encoding, GA operators, convergence), RAM fitness evaluation (macro/micro), HM+ABC framework (implausibility score, wave-based pruning, rejection sampling ABC), uncertainty quantification (model discrepancy $V^r_m$, ensemble variance $V^r_s$, observation uncertainty $V_o$), case studies (SugarScape, territorial birds vs GA/SA/EA, RISC Scottish farms POM), experimental design (LHS, parameter sensitivity), validation (plausibility standard)
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
    /   \
   GA  HM+ABC
        |
   Uncertainty QU
        |
       v
  Applications
```

## Source Papers

| Paper | Authors | Year | Focus | Notes Produced |
|-------|---------|------|-------|---------------|
| [[raw/abm_word_of_mouth.pdf]] | Bonabeau | 2002 | ABM methodology, applications, adoption model | Foundations + Applications + Social Dynamics |
| [[raw/abm_consumer.pdf]] | Karakaya, Badur & Aytekin | 2011 | Marketing strategies with WOM | Consumer Behavior (Karakaya) + Social Dynamics |
| [[raw/abm_human_behaviour.pdf]] | Ben Said, Bouron & Drogoul | 2002 | CUBES consumer behavior simulator | Consumer Behavior (CUBES) + Calibration (GA/RAM) |
| [[raw/calibration_ABM.pdf]] | McCulloch, Ge, Ward, Heppenstall, Polhill & Malleson | 2022 | HM+ABC calibration with uncertainty quantification | Calibration Methods (HM+ABC framework, HM, ABC, UQ, case studies) |

## Recent Ingestion Log

| Date | Files | Notes Created | Notes Updated |
|------|-------|---------------|---------------|
| 2026-04-11 | calibration_ABM.pdf | 5 concept notes (HM+ABC framework, History Matching, ABC, UQ, Case Studies) | Calibration and Validation _Index, Calibration Methods _Index |
| 2026-04-10 | 3 PDFs (abm_consumer, abm_human_behaviour, abm_word_of_mouth) | 29 concept notes, 16 index files | — |
