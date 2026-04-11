---
title: Operational Risk Modeling with ABM
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/risk-management
  - type/concept
  - doc/paper
source: "[[raw/abm_word_of_mouth.pdf]]"
source_location: "pp. 7285"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Applications/Risk"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
  - "[[Emergent Phenomena in ABM]]"
used_by: []
aliases:
  - Operational risk ABM
  - Risk simulation
  - Basel II ABM
---

# Operational Risk Modeling with ABM

> [!summary]
> Bonabeau (2002) describes ABM applications in operational risk management, where traditional statistical approaches fail because risk events are rare, interdependent, and arise from complex interactions between human behavior and organizational processes. ABM enables bottom-up simulation of risk scenarios that can produce fat-tailed loss distributions matching observed operational risk data.

## Overview

Operational risk — the risk of loss from failed internal processes, people, systems, or external events — became a major focus after Basel II required banks to quantify and hold capital against operational risks. ABM offers an alternative to historical data analysis and scenario modeling by simulating the interactions that produce risk events.

## Main Content

### Why ABM for Operational Risk

Traditional operational risk modeling faces challenges:
- **Rare events**: Operational risk losses are infrequent but can be catastrophic
- **Interdependencies**: Risk events are not independent — one failure can cascade through interconnected processes
- **Human factors**: Operational risk often involves human error, fraud, or failure to perform in a timely manner
- **Fat tails**: Loss distributions have heavier tails than standard parametric distributions predict

> [!important] ABM Advantage for Risk
> ABM provides "a bottom-up enterprise simulation" that can be used to "construct the interactions of the bank to be computerized in some other way, for example by its dealers, lending officers, or other staff executing their authority or conducting business in an unethical or risky manner" (Bonabeau 2002).

### The SCGAM Approach

Bonabeau describes an ABM approach to operational risk based on the **Society of Generative Agent Models (SGAM)** approach:

1. **Bottom-up construction**: Model the organization as a collection of agents (employees, systems, processes)
2. **Interaction rules**: Define how agents interact, including normal operations and failure modes
3. **Scenario generation**: Run simulations to generate a distribution of outcomes
4. **Loss distribution**: The simulated loss distribution can exhibit fat tails and correlations that emerge from the interaction structure
5. **Capital calculation**: Use the simulated distribution for Basel II capital requirements

### ABM vs Traditional Risk Models

| Feature | Traditional | ABM |
|---------|------------|-----|
| Data requirement | Historical loss data | Process knowledge + behavioral rules |
| Correlations | Assumed or estimated | Emerge from interactions |
| Rare events | Extrapolated from data | Generated from scenarios |
| Fat tails | Parametric fit | Emergent from cascading failures |
| Process changes | Requires new data | Can be simulated immediately |

### Examples of Operational Risk Events Suited to ABM

Bonabeau lists examples of large operational losses:
- Daiwa, Sumitomo, Barings, Kidder Peabody
- Orange County, Jardine Fleming
- Common Fund, Yamaichi
- These involved complex interactions between individual actors, organizational processes, and system failures

## Connections

- Operational risk modeling exemplifies [[Emergent Phenomena in ABM]] — cascading failures as emergence
- Organizational structure modeling connects to [[Organizational Simulation]]
- This is one of four application areas alongside [[Flow Simulation Applications]], [[Market and Financial Simulation]], and [[Organizational Simulation]]

## See Also
- [[ABM Methodology and Principles]] — the paradigm underlying risk simulation
- [[Organizational Simulation]] — related organizational modeling
- [[Emergent Phenomena in ABM]] — cascading failures as emergent phenomena
