---
title: ABM Methodology and Principles
tags:
  - source/ingested
  - topic/agent-based-modeling
  - type/concept
  - doc/paper
source: "[[raw/abm_word_of_mouth.pdf]]"
source_location: "pp. 7280-7281"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Foundations/Core Concepts"
doc_type: paper
depends_on: []
used_by:
  - "[[Emergent Phenomena in ABM]]"
  - "[[ABM vs Equation-Based Modeling]]"
  - "[[Heterogeneity in Agent Models]]"
  - "[[Agent Decision Rules and Bounded Rationality]]"
aliases:
  - ABM
  - Agent-Based Modeling
  - Agent-Based Simulation
---

# ABM Methodology and Principles

> [!summary]
> Agent-based modeling (ABM) is a computational simulation methodology where a system is modeled as a collection of autonomous decision-making entities called agents. Each agent individually assesses its situation and makes decisions on the basis of a set of rules, enabling the study of complex systems where macro-level patterns emerge from micro-level interactions.

## Overview

ABM provides a bottom-up approach to modeling complex systems. Rather than specifying system-level equations that describe aggregate behavior, the modeler defines individual agents with their own properties, behaviors, and interaction rules. The system-level dynamics then **emerge** from the interactions among agents and between agents and their environment.

ABM has seen rapid adoption across social sciences, including economics, sociology, anthropology, politics, and business (Bonabeau 2002). The approach is applied in sub-fields of business including finance, organization, supply chain management, and marketing.

## Main Content

> [!definition] Definition: Agent-Based Model (Bonabeau 2002)
> An agent-based model consists of a system of agents and the relationships between them. Even a simple agent-based model can exhibit complex behavior patterns and provide valuable information about the dynamics of the real-world system it emulates.
^def-abm

> [!definition] Definition: Agent (Wooldridge & Jennings 1995, via Ben Said et al. 2002)
> An agent, from a theoretical view of artificial intelligence, is a computer system that is either conceptualized or implemented using the concepts that are more usually applied to humans. Agents in ABM are autonomous decision-making entities with individual heterogeneity and decision rules.
^def-agent

### Core Properties of Agents

Agents in ABM typically possess the following properties:

1. **Autonomy**: Agents operate independently, making their own decisions based on local information
2. **Heterogeneity**: Agents can have differentiated attributes, preferences, and behavioral rules
3. **Interaction**: Agents interact with each other and with their environment, often through defined network structures
4. **Adaptation**: Agents can learn from experience, modify behaviors, and respond to environmental changes
5. **Bounded rationality**: Agents need not be perfectly rational; they can follow heuristic rules or exhibit cognitive limitations

### ABM as a Methodology

> [!definition] Definition: ABM as Computational Social Science (Gilbert 2008, via Karakaya et al. 2011)
> ABM is "a form of computational social science and it enables a researcher to create, analyze and experiment with models composed of agents that interact within an environment." Unlike traditional approaches that focus on collecting data, analyzing it, and inferring conclusions with statistical models, ABM gives the ability to create agents with individual heterogeneity, place them in a desired geographical or topological space, connect them through a network for interaction, and simulate them.
^def-abm-css

### When to Use ABM

According to Bonabeau (2002), ABM is most useful when:

- The **interactions** between agents are complex, nonlinear, or discontinuous
- **Space** matters — agents have spatial positions and local interactions
- The population is **heterogeneous** — agents differ in meaningful ways
- The **topology** of interactions is heterogeneous and complex (e.g., social networks rather than well-mixed populations)
- Agents exhibit complex individual behavior including learning, adaptation, and memory

> [!warning] When ABM May Not Be Appropriate
> ABM is not a universal tool. It is sometimes "not much more than a technology" — the challenge is building models that provide genuine insight rather than just simulating obvious outcomes (Bonabeau 2002). Cases with possible analytical solutions should be selected cautiously, as simulation may cause inappropriate use of resources (Banks 1998, via Karakaya et al. 2011).

## Connections

- ABM contrasts with [[ABM vs Equation-Based Modeling|equation-based approaches]] that use aggregate differential equations
- The power of ABM lies in its ability to model [[Heterogeneity in Agent Models|agent heterogeneity]] and capture [[Emergent Phenomena in ABM|emergent phenomena]]
- Agent decision-making is formalized through [[Agent Decision Rules and Bounded Rationality|decision rules]] that can range from simple heuristics to complex cognitive models

## See Also
- [[Emergent Phenomena in ABM]] — the key benefit that motivates ABM over traditional approaches
- [[ABM vs Equation-Based Modeling]] — formal comparison of ABM and differential equation models
- [[Heterogeneity in Agent Models]] — how individual differences are represented
- [[Agent Decision Rules and Bounded Rationality]] — how agents make decisions
- [[Genetic Algorithm Calibration for ABM]] — how GA is used to calibrate agent populations to match observed market data
