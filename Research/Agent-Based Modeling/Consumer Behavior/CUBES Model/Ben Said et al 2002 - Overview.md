---
title: "Ben Said et al 2002 - Overview"
tags:
  - source/ingested
  - topic/agent-based-modeling
  - topic/consumer-behavior
  - type/overview
  - doc/paper
source: "[[raw/abm_human_behaviour.pdf]]"
source_location: "Full paper, pp. 184-190"
date_ingested: 2026-04-10
folder: "Agent-Based Modeling/Consumer Behavior/CUBES Model"
doc_type: paper
depends_on:
  - "[[ABM Methodology and Principles]]"
used_by:
  - "[[Market Share Equilibrium and Lock-In]]"
aliases:
  - Ben Said 2002
  - CUBES paper
  - CUstomer BEhavior Simulator
---

# Ben Said et al 2002 - Overview

> [!summary]
> This paper presents CUBES (CUstomer BEhavior Simulator), a multi-agent simulation platform for modeling consumer behavior in competing markets. The model is built on behavioral attitudes (mistrust, opportunism, conditioning, innovativeness, imitation) activated through behavioral primitives with threshold mechanisms. A genetic algorithm calibrates agent populations to match real market data. Key results show emergent market phenomena including brand lock-in and cyclic market share competition.

## Overview

**Citation:** Ben Said, L., Bouron, T., & Drogoul, A. (2002). Agent-based Interaction Analysis of Consumer Behavior. *Proceedings of AAMAS '02*, Bologna, Italy, pp. 184-190.

**Research question:** Can a consumer behavioral model based on psychological primitives (imitation, conditioning, innovativeness) reproduce realistic market evolutions including emergent collective phenomena?

**Approach:** Multi-agent simulation using the Swarm engine with several thousand consumer agents interacting in a virtual market with competing brands. Genetic algorithms calibrate agent characteristics to match observed market data.

### Two Key Originalities

1. **Simultaneous individual and collective levels**: Concepts (opinion leaders, innovation) are treated both as individual properties and as emergent collective phenomena
2. **Generic behavioral functions**: Consumer cognitive functions are derived from generic behavioral components related to interaction, not narrowly defined as reasoning and data processing

## Main Content

### Model Architecture

CUBES consists of:
- **Consumer agents**: Each with a socio-demographic profile (age, education, profession, social class) and behavioral attitudes
- **Brand agents**: Fixed number of competing brands with marketing strategies
- **Virtual market**: The environment where agents interact

The simulation flow follows: Brands emit stimuli (promotions, innovations, recommendations) -> Consumers perceive stimuli through behavioral primitives -> Attitudes and opinions update -> Purchase decisions occur -> Market shares evolve.

See [[CUBES Simulator Architecture]] for detailed system design.

### Core Behavioral Framework

Consumer behavior is driven by five **behavioral attitudes (BA)**:
1. **Mistrust** — skepticism toward stimuli
2. **Opportunism** — responsiveness to deals
3. **Conditioning** — habit formation from repeated exposure
4. **Innovativeness** — openness to new products
5. **Imitation** — tendency to follow others' choices

These attitudes are activated through **behavioral primitives (BP)** — threshold-based response mechanisms that filter and weight external stimuli. See [[Behavioral Attitudes in CUBES]] and [[Behavioral Primitives and Thresholds]] for formal specification.

### Social Processes

Two social processes drive attitude dynamics:
1. **Imitation process** — agents copy behaviors of connected agents
2. **Conditioning process** — repeated exposure to stimuli reinforces attitudes

These are distinct from direct information transfer — they operate through behavioral attitude modification. See [[Imitation and Conditioning Processes]].

### Calibration via Genetic Algorithm

Agent population characteristics are calibrated using GA to match real market data. The GA evolves chromosomes encoding behavioral and socio-economic characteristics, evaluated by a Result-Analysis Module that compares simulated diffusion curves and market shares to observed data. See [[Genetic Algorithm Calibration for ABM]] and [[GA Fitness Evaluation and the RAM]].

### Key Results

1. **Behavioral attitude convergence**: Young populations (15-25) show unstable oscillation in attitudes; older populations (45-65) converge and stabilize after ~15 steps
2. **Brand lock-in**: A dominant brand (70% initial share) maintains dominance beyond 90 time steps despite competitor efforts — an emergent phenomenon
3. **Cyclic competition**: With initially equal market shares, brands cyclically trade customers — reproducing real market share dynamics

## Connections

- CUBES implements the [[ABM Methodology and Principles]] framework with a focus on psychological realism
- The behavioral attitude framework connects to [[Agent Decision Rules and Bounded Rationality]] — CUBES uses threshold-based rules
- Market share results connect to [[Market Share Equilibrium and Lock-In]]
- The GA calibration approach connects to [[Genetic Algorithm Calibration for ABM]]

## See Also
- [[CUBES Simulator Architecture]] — system design details
- [[Behavioral Attitudes in CUBES]] — the five behavioral attitudes
- [[Behavioral Primitives and Thresholds]] — the BP activation mechanism
- [[Genetic Algorithm Calibration for ABM]] — population calibration
